import { render, replace, remove } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripEditFormView from '../view/trip-edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresentor {
  #pointListContainer = null;
  #pointViewComponent = null;
  #pointEditFormComponent = null;

  #offersByType = null;
  #point = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  #handleDataChange = null;
  //обработчик смены точки маршрута на форму редактирования = переключение режимов
  #handleModeChange = null;


  constructor({ pointListContainer, onDataChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      return; //зачем нужен return????
    }

    // проверка на наличие в DOM необходима, чтобы не пытаться заменить то что не было отрисовано
    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointViewComponent, prevPointComponent);
    }

    if(this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#mode === Mode.DEFAULT);
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

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this. #replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#pointEditFormComponent, this.#pointViewComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;

  }

  #replaceFormToPoint() {
    replace(this.#pointViewComponent,this.#pointEditFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);

  }

  #handleEditUpClick = () => {
    this.#replaceFormToPoint();
  };

  #handleEditDownClick = () => {
    this.#replacePointToForm ();
  };

  #handleReloadButtonClick = () => {
    this.#handleDataChange({...this.#point});
  };
}

