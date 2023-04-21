import { render, RenderPosition } from '../framework/render.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripListView from '../view/trip-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripListEmpty from '../view/trip-list-empty.js';
import {Filter} from '../constans.js';
import PointPresentor from '../presenter/point-presentor.js';
import { updateItem, sortDateUp } from '../utils.js';
import { SortType } from '../constans.js';

export default class BoardPresenter {
  #filtersContainer = undefined;
  #filtercomponent = undefined;
  #tripEventsContainer = undefined;
  #sortComponent = undefined;
  #tripListComponent = new TripListView();
  #pageBodyContainer = undefined;
  #pointModel = undefined;


  //заведем свойство, в котором презентор будет хранить сыылки на все PointPresentor
  #pointPresentor = new Map(); //коллекция ключ/значение Ключ - значение любых типов

  //переменная для хранения выбранного (текущего) варианта сортировки
  #currentSortType = SortType.DEFAULT;

  //копия всех задач в изначальном порядке
  #soursedBoardPoints = [];

  constructor({ filtersContainer, tripEventsContainer, pointModel, pageBodyContainer }) {
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
    this.#pageBodyContainer = pageBodyContainer;
  }

  init() {
    //скопируем порядок точек при инициализации

    this.#renderFilter();
    this.#renderSort();
    this.#renderPointList();
  }

  #handleModeChange = () => {
    this.#pointPresentor.forEach((presentor) => presentor.resetView());
  };

  //обработчик для обновления точек Как получить обновленную задачу? updatedPoint
  #handlePointChange = (updatedPoint) => {
    this.points = updateItem(this.points, updatedPoint);
    //обновляем копию с исходным порядком точек
    this.sourceBoardPoints = updateItem(this.sourceBoardPoints, updatedPoint);
    //перезаписываем задачу = заново инициализируем обновленный презентор который ищем по ключу
    this.#pointPresentor.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.DAY: this.#soursedBoardPoints.sort(sortDateUp);
        break;
      //чтобы вернуть все как было запишем исходный массив
      default: this.points = [...this.#pointModel.points];
    }
    this.#currentSortType = sortType;
  }


  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === SortType.DEFAULT) {
      return;
    }
    this.#sortPoints(sortType);
    // для сортировки  - сначала нужно удалить - потом заново отрисовать
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderFilter() { //не отрисовались
    this.#filtercomponent = new TripFiltersView(Filter.Everything);
    render(this.#filtercomponent, this.#filtersContainer);
  }

  #renderSort() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointList() {
    const offersByType = [...this.#pointModel.offersByType];
    const points = [...this.#pointModel.points];
    const destinations = [...this.#pointModel.destinations];
    const sourceBoardPoints = [...this.#pointModel.points];

    if(points.length === 0) {
      render(new TripListEmpty(), this.#pageBodyContainer);
    } else {
      render(this.#tripListComponent, this.#tripEventsContainer);

      for (const point of points) {
        this.#renderPoint(offersByType, point, destinations);
      }
    }
  }

  #renderPoint(offersByType, point, destinations) {
    const pointPresentor = new PointPresentor({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handlePointChange, // вызов обработчика - ссылку передаем в свойство
      onModeChange: this.#handleModeChange
    });
    pointPresentor.init(offersByType, point, destinations);
    //cохраняем отрисованный экземпляр
    this.#pointPresentor.set(point.id, PointPresentor);
  }

  //foo для очистки списка задач
  #clearPointList() {
    this.#pointPresentor.forEach((presentor) => presentor.destroy());
    this.#pointPresentor.clear(); //clear() - встроенный метод в мапу
  }
}
