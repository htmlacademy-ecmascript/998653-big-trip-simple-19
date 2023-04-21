import AbstractView from '../framework/view/abstract-view.js';
import {Filter, FilterDescription} from '../constans.js';


function createTripFiltersView(checkedFilter) {
  return ` <form class="trip-filters" action="#" method="get">

  ${Object.values(Filter).map((filter) => (`<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === checkedFilter ? 'checked' : '' }>
  <label class="trip-filters__filter-label" for="filter-${filter}">${FilterDescription[filter]}</label>
</div>`)).join('')}

<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export default class TripFiltersView extends AbstractView {
  #points = [];

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripFiltersView(Filter.Everything);
  }
}
