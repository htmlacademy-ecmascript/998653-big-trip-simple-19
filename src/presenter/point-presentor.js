import { remove, render, replace,} from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripEditFormView from '../view/trip-edit-form-view.js';

export default class PointPresentor {
  #pointListContainer = null;
  #pointViewComponent = null;
  #pointEditFormComponent = null;

  #offersByType = null;
  #point = null;
  #destinations = null;


  constructor({ pointListContainer }) {
    this.#pointListContainer = pointListContainer;
  }

  init(offersByType, point, destinations) {
    this.#offersByType = offersByType;
    this.#point = point;
    this.#destinations = destinations;

    this.#pointViewComponent = new TripPointView({ offersByType, point, onEditDownClick: this.#handleEditDownClick });
    this.#pointEditFormComponent = new TripEditFormView({ offersByType, point, destinations, onEditUpClick: this.#handleEditUpClick });

    // запомним предыдущие компоненты
    const prevPointComponent = this.#pointViewComponent;
    const prevPointEditComponent = this.#pointViewComponent;

    // проверка условия, что компоненты ранее не создавались:
    if(this.#pointViewComponent === null || this.#pointEditFormComponent === null) {
      render(this.#pointViewComponent, this.#pointListContainer);
    }

    // если они ранее создавались - заменяем на новые и удаляем старые
    if(this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointViewComponent, prevPointComponent);
    }

    if(this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditFormComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
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
    this.#replaceFormToPoint();
  };

  #handleEditDownClick = () => {
    this.#replacePointToForm ();
  };
}

