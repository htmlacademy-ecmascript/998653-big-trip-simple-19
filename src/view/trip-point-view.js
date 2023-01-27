/* eslint-disable indent */
import { createElement } from '../render.js';
import {
 humanizePointCurrentDatebyHtml,
 humanizePointCurrentDate,
 humanizePointCurrentTime,
} from '../utils.js';

//отрисовка списка доп опций

function createTripPointView(point) {
 //извлекаем из объекта описания точки ключи, которыми можно сразу воспользоваться
 const { price, start, end, destination, type } = point;

 return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${humanizePointCurrentDatebyHtml(start)}>${humanizePointCurrentDate(start)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime= ${humanizePointCurrentDatebyHtml(start)}>${humanizePointCurrentTime(start)}</time>
        —
        <time class="event__end-time" datetime= ${humanizePointCurrentDatebyHtml(end)}>${humanizePointCurrentTime(end)}</time>
      </p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">Order Uber</span>
        +€&nbsp;
        <span class="event__offer-price">20</span>
      </li>
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class TripPointView {
 element = null;
 //извлекаем объект с описанием задачи с помощью деструктуризации
 constructor({ point }) {
  this.point = point; // ?ЧТО И КУДА ПЕРЕДАЕМ - НЕ ПОНИМАЮ)
 }

 getTemplate() {
  return createTripPointView(this.point);
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
