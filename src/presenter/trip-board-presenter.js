//import CreateFormView from '../view/create-form-view.js';
//import EditFormView from '../view/edit-form-view.js';
import FilterView from '../view/filters-view.js';
import TripPointInListView from '../view/trip-point-view.js';
import TripListView from '../view/trip-list-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

// создадим отдельные вьюшки  с помощью класса
export default class BoardPresenter {
  tripListComponent = new TripListView();

  //foo создающая экземпляр класса
  constructor({ filterContainer, sortContainer }) {
    this.filterContainer = filterContainer;
    this.sortContainer = sortContainer;
  }

  //создаем вьюшки = экземпляры компонентов
  init() {
    for (let i = 0; i < 3; i++) {
      render(new TripPointInListView(), this.tripListComponent.getElement()); //почему нет i?
    }
    //render(new CreateFormView(), куда будет отрисавана форма => <section class="trip-events">?)
    //render(new EditFormView() ,куда будет отрисавана форма => <section class="trip-events">?)
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.sortContainer);
    render(this.tripListComponent, this.sortContainer);
  }
}
