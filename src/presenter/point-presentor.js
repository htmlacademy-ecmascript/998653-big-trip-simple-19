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


  constructor({ pointListContainer }) {
    this.#pointListContainer = pointListContainer;
  }

  init(offersByType, point, destinations) {
    this.#pointViewComponent = new TripPointView({ offersByType,point,onEditDownClick: this.#handleEditDownClick });

    this.#pointEditFormComponent = new TripEditFormView({ offersByType, point, destinations, onEditUpClick: this.#handleEditUpClick });

    render(this.#pointViewComponent, this.#pointListContainer);
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

