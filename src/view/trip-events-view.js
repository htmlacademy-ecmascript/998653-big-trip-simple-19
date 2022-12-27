import { createElement } from '../render.js';
function createTripEventsView() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripListView {
  element = null;
  getTemplate() {
    return createTripEventsView();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
