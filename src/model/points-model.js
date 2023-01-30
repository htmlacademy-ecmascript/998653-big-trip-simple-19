export default class PointModel {
  #points = [];
  #destinations = [];


  getPoint() {
    return this.#points;
  }

  getDestination() {
    return this.#destinations;
  }

  init(points, destinations) {
    this.#points = points;
    this.#destinations = destinations;
  }
}

