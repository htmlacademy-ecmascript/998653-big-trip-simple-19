export default class PointModel {
  #offersByType = [];
  #points = [];
  #destinations = [];


  get offersByType() {
    return this.#offersByType;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  init(offersByType, points, destinations) {
    this.#offersByType = offersByType;
    this.#points = points;
    this.#destinations = destinations;
  }
}

