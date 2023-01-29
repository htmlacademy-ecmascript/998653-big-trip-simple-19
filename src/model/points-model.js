export default class PointModel {
  #points = [];

  getPoint() {
    return this.#points; // this = текущий объект? Что мы вернули? метод? массив? Или - возвращаем метод, который в любом объекте/классе - будет генерировать массив?
  }

  init(points) {
    this.#points = points;
  }
}


