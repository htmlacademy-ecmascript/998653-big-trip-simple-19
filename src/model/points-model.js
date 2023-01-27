import { getPoints } from '../mock/point.js';

export default class PointModel {
  points = getPoints;

  getPoint() {
    return this.points; // this = текущий объект? Что мы вернули? метод? массив? Или - возвращаем метод, который в любом объекте/классе - будет генерировать массив?
  }
}

// console.log(PointModel);

// export default class PointsModel {
//   _pointStore = [];

//   get points(){
//     return this._pointStore;
//   }

//   init(points) {
//     this._pointStore = points;
//   }
// }
