import AbstractView from '../framework/view/abstract-view.js';

function createTripEventsView() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripListView extends AbstractView{

  get template() {
    return createTripEventsView();
  }
}
