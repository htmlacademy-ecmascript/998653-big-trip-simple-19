import AbstractView from '../framework/view/abstract-view.js';

function createTripSortList() {
  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>`;
}

export default class TripSortList extends AbstractView {
  get template () {
    return createTripSortList();
  }
}
