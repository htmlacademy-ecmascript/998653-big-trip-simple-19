export default class PointModel {
  #offersByType = [];
  #points = [];
  #destinations = [];


  getOffersByType() {
    return this.#offersByType;
  }

  getPoint() {
    return this.#points;
  }

  getDestination() {
    return this.#destinations;
  }

  init(offersByType, points, destinations) {
    this.#offersByType = offersByType;
    this.#points = points;
    this.#destinations = destinations;
  }
}

