import { render } from '../framework/render.js';
import TripEditFormView from '../view/trip-edit-form-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripListView from '../view/trip-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripListEmpty from '../view/trip-list-empty.js';


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
    this.#pageBodyContainer = pageBodyContainer;
  }

  init() {
    const offersByType = [...this.#pointModel.offersByType];
    const points = [...this.#pointModel.points];
    const destinations = [...this.#pointModel.destinations];


    render(new TripFiltersView(), this.#filtersContainer);


    if(points.length === 0) {
      render(new TripListEmpty(), this.#pageBodyContainer);
    } else {
      render(new TripSortView(), this.#tripEventsContainer);
      render(this.#tripListComponent, this.#tripEventsContainer);

      for (const point of points) {
        this.#renderPoint(offersByType, point, destinations);
      }
    }
    this.#renderPoint(offersByType, points, destinations);
  }


  #renderPoint(offersByType, point, destinations) {

    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Ecs') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };


    const tripPointViewComponent = new TripPointView({offersByType, point, destinations,onEditDownClick: () => {
      replacePointToForm.call(this);
      document.addEventListener('keydown', escKeyDownHandler);
    }});

    const tripEditFormComponent = new TripEditFormView({offersByType, point, destinations,onEditUpClick: () => {
      replaceFormToPoint.call(this);
      document.removeEventListener('keydown', escKeyDownHandler);
    }});

    function replacePointToForm () {
      this.#tripListComponent.element.replaceChild(tripEditFormComponent.element, tripPointViewComponent.element);
    }

    function replaceFormToPoint () {
      this.#tripListComponent.element.replaceChild(tripPointViewComponent.element,tripEditFormComponent.element);
    }

    render(tripPointViewComponent, this.#tripListComponent.element);
  }
}
