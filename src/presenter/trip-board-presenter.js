import TripEditFormView from '../view/trip-edit-form-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripListView from '../view/trip-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import { render } from '../render.js';

// создадим отдельные вьюшки  с помощью класса
export default class BoardPresenter {
  tripListComponent = new TripListView();
  #filtersContainer = undefined;
  #tripEventsContainer = undefined;
  #pointModel = undefined;


  //foo создающая экземпляр класса
  constructor({ filtersContainer, tripEventsContainer, pointModel }) {
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel; // пояснить запись
  }

  //создаем вьюшки = экземпляры компонентов
  init() {
    //создадим свойство .point куда запишем, что вернул метод .getPoint()
    // при помощи spread копируем вернувшмйся массив задач из модели => в презентер

    // переносим данные из модели в презентер??? = новый массив - ОШИБКА_ не могу понять почему)

    const points = [...this.#pointModel.getPoint()]; // в метод .point записали массив из модели? ОБЪЯСНИТЬ))

    render(new TripFiltersView(), this.#filtersContainer);
    render(new TripSortView(), this.#tripEventsContainer);
    render(new TripEditFormView(), this.#tripEventsContainer);
    render(this.tripListComponent, this.#tripEventsContainer);

    //задача  с нулевыми значениями

    for (let i = 0; i < 3; i++) {
      render(
        new TripPointView({ point: points[i] }),
        this.tripListComponent.getElement()
      );
    }
  }
}
