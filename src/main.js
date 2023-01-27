import PointModel from './model/points-model.js';
import BoardPresenter from './presenter/trip-board-presenter.js';
import {getPoints} from './mock/point.js';
const points = getPoints();
// eslint-disable-next-line no-console
console.log(points);

const filtersContainer = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
const tripEventsContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({
  filterContainer: filtersContainer,
  contentContainer: tripEventsContainer,
  pointModel: pointModel
});
boardPresenter.init();
