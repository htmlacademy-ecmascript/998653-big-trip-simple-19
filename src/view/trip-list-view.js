import { createElement } from '../render.js';
function createTripEventsView() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripListView {
  #element = null;

  get template() {
    return createTripEventsView();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
