import PointModel from './model/points-model.js';
import BoardPresenter from './presenter/trip-board-presenter.js';
import {getPoints} from './mock/point.js';
import { getDestinations } from './mock/point.js';

const points = getPoints();
const destinations = getDestinations();

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
pointModel.init(points);
pointModel.init(destinations); //ПОЧЕМУ АНДЕФАЙНД???

const boardPresenter = new BoardPresenter({
  filtersContainer,
  tripEventsContainer,
  pointModel
});

boardPresenter.init();
boardPresenter.setDestination();
