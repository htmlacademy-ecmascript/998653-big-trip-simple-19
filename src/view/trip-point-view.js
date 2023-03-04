import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizePointCurrentDatebyHtml,
  humanizePointCurrentDate,
  humanizePointCurrentTime,
} from '../utils.js';

function createTripPointView(offersByType, points) {
  const { basePrice,dateFrom ,dateTo, city, offers, type } = points;
  const availableOffers = offersByType.find((x) => x.type === type).offers;
  const currentOffers = availableOffers.filter((x) => offers.some((y) => y === x.id));


  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${humanizePointCurrentDatebyHtml(dateFrom)}>${humanizePointCurrentDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime= ${humanizePointCurrentDatebyHtml(dateFrom)}>${humanizePointCurrentTime(dateFrom)}</time>
        —
        <time class="event__end-time" datetime= ${humanizePointCurrentDatebyHtml(dateTo)}>${humanizePointCurrentTime(dateTo)}</time>
      </p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>


    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
       ${currentOffers.length > 0 ? currentOffers.map((offer) => (`<span class="event__offer-title">${offer.title}</span>
       +€&nbsp;
       <span class="event__offer-price">${offer.price}</span>`)).join('') : '<span class="event__offer-title">No additional offers</span>'}
      </li>
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class TripPointView extends AbstractView{
  #point = [];
  #offersByType = [];

  constructor({ offersByType, point }) {
    super();
    this.#point = point;
    this.#offersByType = offersByType;
  }

  get template() {
    return createTripPointView(this.#offersByType, this.#point);
  }
}
