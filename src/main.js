import PointModel from './model/points-model.js';
import BoardPresenter from './presenter/trip-board-presenter.js';
import { getOffersByType } from './mock/point.js';
import { getPoints } from './mock/point.js';
import { getDestinations } from './mock/point.js';

const offersByType = getOffersByType();
const points = getPoints();
const destinations = getDestinations();


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const pageBodyContainer = document.querySelector('.page-body__container');

const pointModel = new PointModel();
pointModel.init(offersByType, points, destinations);

const boardPresenter = new BoardPresenter({
  filtersContainer,
  tripEventsContainer,
  pageBodyContainer,
  pointModel
});

boardPresenter.init();
