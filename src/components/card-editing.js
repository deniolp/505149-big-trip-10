import moment from 'moment';

import AbstractComponent from './abstract-component';
import {transfers, activities, locations, offers} from '../mock/card';
import {getPrefix} from '../utils';

const createEditCardTemplate = (card) => {
  return `<form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${card.type.toLowerCase()}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${transfers.map((it) => `<div class="event__type-item">
          <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}">
          <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-1">${it}</label>
        </div>`).join(``).trim()}
      </fieldset>
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${activities.map((it) => `<div class="event__type-item">
        <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}">
        <label class="event__type-label event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-1">${it}</label>
      </div>`).join(``).trim()}
      </fieldset>
    </div>
  </div>
  <div class="event__field-group event__field-group--destination">
    <label class="event__label event__type-output" for="event-destination-1">
    ${card.type} ${getPrefix(card.type)}
    </label>
    <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${card.location} list="destination-list-1">
    <datalist id="destination-list-1">
      ${locations.map((it) => `<option value=${it}></option>`).join(`\n`).trim()}
    </datalist>
  </div>
  <div class="event__field-group event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">
      From
    </label>
    <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${moment(card.start).format(`DD/MM/YY&#160;HH:MM`)}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">
      To
    </label>
    <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${moment(card.end).format(`DD/MM/YY&#160;HH:MM`)}>
  </div>
  <div class="event__field-group event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${card.price}>
  </div>
  <button class="event__save-btn btn btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
  <label class="event__favorite-btn" for="event-favorite-1">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </label>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
<section class="event__details">
  <section class="event__section event__section--offers">
    <h3 class="event__section-title event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map((item) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="event-offer-${item.type}-1" type="checkbox" name="event-offer-${item.type}"${card.offers.some((it) => it.type === item.type) ? ` checked` : ``}>
      <label class="event__offer-label" for="event-offer-${item.type}-1">
        <span class="event__offer-title">${item.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
      </label>
    </div>`).join(`\n`).trim()}
    </div>
  </section>
  <section class="event__section event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${card.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${card.photos.map((it) => `<img class="event__photo" src=${it}" alt="Event photo">`).join(``).trim()}
      </div>
    </div>
  </section>
</section>
</form>`;
};

export default class CardEditing extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  _getTemplate() {
    return createEditCardTemplate(this._card);
  }
}
