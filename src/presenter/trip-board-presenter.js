import TripEditFormView from '../view/edit-form-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripListView from '../view/trip-events-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointModel from '../model/points-model.js';
import { render } from '../render.js';

// создадим отдельные вьюшки  с помощью класса
export default class BoardPresenter {
  tripListComponent = new TripListView();

  //foo создающая экземпляр класса
  constructor({ filterContainer, contentContainer, pointModel }) {
    this.filterContainer = filterContainer;
    this.contentContainer = contentContainer;
    this.pointModel = pointModel; // пояснить запись
  }

  //создаем вьюшки = экземпляры компонентов
  init() {
    //создадим свойство .point куда запишем, что вернул метод .getPoint()
    // при помощи spread копируем вернувшмйся массив задач из модели => в презентер

    // переносим данные из модели в презентер??? = новый массив - ОШИБКА_ не могу понять почему)

    this.points = [...this.pointModel.getPoint()]; // в метод .point записали массив из модели? ОБЪЯСНИТЬ))

    render(new TripFiltersView(), this.filterContainer);
    render(new TripSortView(), this.contentContainer);
    render(new TripEditFormView(), this.contentContainer);
    render(this.tripListComponent(), this.contentContainer);

    //задача  с нулевыми значениями

    for (let i = 0; i < 3; i++) {
      render(
        new TripPointView({ poit: this.points[i] }),
        this.tripListComponent.getElement()
      );
    }
  }
}
