import moment from 'moment';

import {getPrefix, getDiff} from '../utils/common';
import AbstractComponent from './abstract-component';

const createPointTemplate = (point) => {
  const diffTime = (point.end.getTime() - point.start.getTime());

  return `<li class="trip-events__item">
<div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${point.type.charAt(0).toUpperCase() + point.type.slice(1)} ${getPrefix(point.type)} ${point.location}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime=${point.start}>${moment(point.start).format(`HH:MM`)}</time>
      &mdash;
      <time class="event__end-time" datetime=${point.end}>${moment(point.end).format(`HH:MM`)}</time>
    </p>
    <p class="event__duration">${getDiff(diffTime)}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${point.price}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${point.offers.map((it) => `<li
    class="event__offer">
    <span class="event__offer-title">${it.name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
  </li>`).join(``).trim()}
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`;
};

export default class Point extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  _getTemplate() {
    return createPointTemplate(this._point);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}

