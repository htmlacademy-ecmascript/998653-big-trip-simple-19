import { render, replace, remove } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripEditFormView from '../view/trip-edit-form-view.js';

export default class PointPresentor {
  #pointListContainer = null;
  #pointViewComponent = null;
  #pointEditFormComponent = null;

  #offersByType = null;
  #point = null;
  #destinations = null;
  #handleDataChange = null;


  constructor({ pointListContainer, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;

  }

  init(offersByType, point, destinations) {
    this.#offersByType = offersByType;
    this.#point = point;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointViewComponent ; //почему не отрисовалис компоненты?
    const prevPointEditComponent = this.#pointEditFormComponent;


    this.#pointViewComponent = new TripPointView({
      offersByType,
      point,
      onEditDownClick: this.#handleEditDownClick,
      onReloadButtonClick: this.#handleReloadButtonClick
    });

    this.#pointEditFormComponent = new TripEditFormView({
      offersByType,
      point,
      destinations,
      onEditUpClick: this.#handleEditUpClick });


    if(prevPointComponent === null || prevPointEditComponent === null) { //почему prevPointComponent - underfind?
      render(this.#pointViewComponent, this.#pointListContainer);
    }

    // проверка на наличие в DOM необходима, чтобы не пытаться заменить то что не было отрисовано
    if(this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointViewComponent, prevPointComponent);
    }

    if(this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditFormComponent, prevPointEditComponent);
    }
  }


  destroy() {
    remove(this.#pointViewComponent);
    remove(this.#pointEditFormComponent);
  }

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Ecs') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm () {
    replace(this.#pointEditFormComponent, this.#pointViewComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);

  }

  #replaceFormToPoint () {
    replace(this.#pointViewComponent,this.#pointEditFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);

  }

  #handleEditUpClick = () => {
    this.#handleDataChange();
    this.#replaceFormToPoint();
  };

  #handleEditDownClick = () => {
    this.#replacePointToForm ();
  };

  #handleReloadButtonClick = () => {
    this.#handleDataChange({...this.#point});
  };
}

