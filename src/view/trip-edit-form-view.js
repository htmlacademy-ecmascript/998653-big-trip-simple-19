import { createElement } from '../render.js';
import { humanizePointCurrentDateTimebyForm, humanizePointCurrentTime} from '../utils.js';
import { PointType, PointTypeDescription} from '../constans.js';


function createTripEditFormView(offersByType, point, destinations) {
  const { basePrice, dateFrom, dateTo, city, offers, type } = point;
  const currentDestination = destinations.find((x) => x.name === city);
  const currentOffers = offersByType.find((x) => x.type === type);
  const availableOffers = currentOffers ? currentOffers.offers : [];


  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
         ${Object.values(PointType).map((pointType) => (`<div class="event__type-item">
         <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${pointType} ${pointType === type ? 'checked' : ''}>
         <label class="event__type-label  event__type-label--${pointType}" for="event-type-taxi-1">${PointTypeDescription[pointType]}</label>
       </div>`)).join('')}

</fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--city">
      <label class="event__label  event__type-output" for="event-city-1">
        ${type}
      </label>
      <input class="event__input  event__input--city" id="event-city-1" type="text" name="event-city" value=${city} list="city-list-1">
      <datalist id="city-list-1">
      ${destinations.map((destination) =>(`<option value=${destination.name}></option>`)).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${humanizePointCurrentDateTimebyForm(dateFrom)}>${humanizePointCurrentTime(dateFrom)}
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${humanizePointCurrentDateTimebyForm(dateTo)}>${humanizePointCurrentTime(dateTo)}
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>

  <section class="event__details">
    ${availableOffers.length > 0 ? (`
    <section class="event__section        event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${availableOffers.map((offer) => (`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox"  name="event-offer-luggage" ${offers.some((offerId) => offer.id === offerId) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offer.title}</span>+€&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`)).join('')}
      </div>
    </section>`) : ''}

    <section class="event__section        event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description"> ${currentDestination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${currentDestination.pictures.map((picture) => (`<img class="event__photo" src= ${picture.src} alt=${picture.description}>`)).join('')}
        </div>
      </div>
    </section>
  </section>
</form>`;
}

export default class TripEditFormView {
  element = null;
  constructor({offersByType, point, destinations }) {
    this.offersByType = offersByType;
    this.point = point;
    this.destinations = destinations;

  }

  getTemplate() {
    return createTripEditFormView(this.offersByType, this.point, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
