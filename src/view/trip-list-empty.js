import AbstractView from '../framework/view/abstract-view.js';


function createFirstTripPoint () {
  return (`<section class="trip-events">
            <h2 class="visually-hidden">Trip events</h2>
            <p class="trip-events__msg">Click New Event to create your first point</p>
          </section>`);
}
// эта заглушка, когда нет никаких поинтов
export default class TripListEmpty extends AbstractView{
  #element = null;

  get template () {
    return createFirstTripPoint();
  }
}
