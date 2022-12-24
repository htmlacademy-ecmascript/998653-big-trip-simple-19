import BoardPresenter from './presenter/trip-board-presenter.js';

const filterContainerTemplate = document.querySelector(
  '.trip-controls__filters'
);
const sortContainerTemplate = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({
  filterContainer: filterContainerTemplate,
  sortContainer: sortContainerTemplate,
});
boardPresenter.init();
