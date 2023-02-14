export default class PointModel {
  #offersByType = [];
  #points = [];
  #destinations = [];


  get offersByType() {
    return this.#offersByType;
  }

  get point() {
    return this.#points;
  }

  get destination() {
    return this.#destinations;
  }

  init(offersByType, points, destinations) {
    this.#offersByType = offersByType;
    this.#points = points;
    this.#destinations = destinations;
  }
}

