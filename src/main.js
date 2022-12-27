import BoardPresenter from './presenter/trip-board-presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({
  filterContainer: filtersContainer,
  contentContainer: tripEventsContainer,
});
boardPresenter.init();
