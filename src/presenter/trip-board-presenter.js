import TripEditFormView from '../view/edit-form-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripListView from '../view/trip-events-view.js';
import TripSortView from '../view/trip-sort-view.js';
import { render } from '../render.js';

// создадим отдельные вьюшки  с помощью класса
export default class BoardPresenter {
  tripListComponent = new TripListView();

  //foo создающая экземпляр класса
  constructor({ filterContainer, contentContainer }) {
    this.filterContainer = filterContainer;
    this.contentContainer = contentContainer;
  }

  //создаем вьюшки = экземпляры компонентов
  init() {
    render(new TripFiltersView(), this.filterContainer);
    render(new TripSortView(), this.contentContainer);
    render(new TripEditFormView(), this.contentContainer);
    render(this.tripListComponent, this.contentContainer);
    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.tripListComponent.getElement());
    }
  }
}
