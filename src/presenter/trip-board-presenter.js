import TripEditFormView from '../view/trip-edit-form-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripListView from '../view/trip-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  tripListComponent = new TripListView();
  #filtersContainer = undefined;
  #tripEventsContainer = undefined;
  #pointModel = undefined;

  constructor({ filtersContainer, tripEventsContainer, pointModel }) {
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    const offersByType = [...this.#pointModel.getOffersByType()];
    const points = [...this.#pointModel.getPoint()];
    const destinations = [...this.#pointModel.getDestination()];


    render(new TripFiltersView(), this.#filtersContainer);
    render(new TripSortView(), this.#tripEventsContainer);
    render(new TripEditFormView({offersByType, point: points[0], destinations: destinations}), this.#tripEventsContainer);
    render(this.tripListComponent, this.#tripEventsContainer);

    for (let i = 1; i < points.length; i++) {
      render(
        new TripPointView({ point: points[i] }),
        this.tripListComponent.getElement()
      );
    }
  }
}
