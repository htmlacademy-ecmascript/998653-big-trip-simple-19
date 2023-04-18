import { render } from '../framework/render.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripListView from '../view/trip-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripListEmpty from '../view/trip-list-empty.js';
import {Filter} from '../constans.js';
import PointPresentor from '../presenter/point-presentor.js';
import { updateItem } from '../utils.js';

export default class BoardPresenter {
  #tripListComponent = new TripListView();
  #filtersContainer = undefined;
  #tripEventsContainer = undefined;
  #pageBodyContainer = undefined;
  #pointModel = undefined;

  //заведем свойство, в котором презентор будет хранить сыылки на все PointPresentor
  #pointPresentor = new Map(); //коллекция ключ/значение Ключ - значение любых типов

  constructor({ filtersContainer, tripEventsContainer, pointModel, pageBodyContainer }) {
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
    this.#pageBodyContainer = pageBodyContainer;
  }

  init() {
    const offersByType = [...this.#pointModel.offersByType];
    const points = [...this.#pointModel.points];
    const destinations = [...this.#pointModel.destinations];


    render(new TripFiltersView(Filter.Everything), this.#filtersContainer);


    if(points.length === 0) {
      render(new TripListEmpty(), this.#pageBodyContainer);
    } else {
      render(new TripSortView(), this.#tripEventsContainer);
      render(this.#tripListComponent, this.#tripEventsContainer);

      for (const point of points) {
        this.#renderPoint(offersByType, point, destinations);
      }
    }
  }

  //обработчик для обновления точек Как получить обновленную задачу? updatedPoint
  #handlePointChange = (updatedPoint) => {
    this.points = updateItem(this.points, updatedPoint);
    //перезаписываем задачу = заново инициализируем обновленный презентор который ищем по ключу
    this.#pointPresentor.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(offersByType, point, destinations) {
    const pointPresentor = new PointPresentor({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handlePointChange // вызов обработчика - ссылку передаем в свойство
    });
    pointPresentor.init(offersByType, point, destinations);

    //cохраняем отрисованный экземпляр
    this.#pointPresentor.set(point.id, PointPresentor);
  }
 
  //foo для очистки списка задач
  #clearPointList () {
    this.#pointPresentor.forEach((presentor) => presentor.destroy());
    this.#pointPresentor.clear(); //clear() - встроенный метод в мапу
  }
}
