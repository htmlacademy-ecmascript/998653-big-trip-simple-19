import TripEditFormView from '../view/trip-edit-form-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripListView from '../view/trip-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripListEmpty from '../view/trip-list-empty.js';
import { render } from '../render.js';

export default class BoardPresenter {
  #tripListComponent = new TripListView();
  #filtersContainer = undefined;
  #tripEventsContainer = undefined;
  #pageBodyContainer = undefined;
  #pointModel = undefined;


  constructor({ filtersContainer, tripEventsContainer, pointModel, pageBodyContainer }) {
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
    this.pageBodyContainer = pageBodyContainer;
  }

  init() {
    const offersByType = [...this.#pointModel.offersByType];
    const points = [...this.#pointModel.point];
    const destinations = [...this.#pointModel.destination];


    render(new TripFiltersView(), this.#filtersContainer);


    if(points.length === 0) {
      render(new TripListEmpty, this.#pageBodyContainer);
    } else {
      render(new TripSortView(), this.#tripEventsContainer);
      render(this.#tripListComponent, this.#tripEventsContainer);

      for (let i = 0; i < points.length; i++) {
        // render(
        //   new TripPointView({offersByType, point: points[i] }),
        //   this.#tripListComponent.element);
        this.#renderPoint({offersByType, point: points[i], destinations});
      }
    }
  }


  //реализуем внутренний интерфейс презентора
  #renderPoint(offersByType, points, destinations) {
    const tripPointComponent = new TripPointView ({offersByType, points} );
    const tripEditFormComponent = new TripEditFormView({offersByType, points, destinations});

    const replacePointToForm = () => {
      this.#tripListComponent.element.replaceChild(tripEditFormComponent.element, tripPointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#tripListComponent.element.replaceChild(tripPointComponent.element,tripEditFormComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Ecs') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    tripEditFormComponent.element.querySelector('.event').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
      //обработчик клика по кнопке с изображением «Стрелка вверх», которые будут заменять форму редактирования на точку маршрута. Механизм замены остаётся прежний.???
    });

    render(tripPointComponent, this.#tripListComponent.element);
  }
}
