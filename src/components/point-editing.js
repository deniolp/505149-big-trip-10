import moment from 'moment';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

import SmartAbstractComponent from './smart-abstract-component';
import {transfers, activities, locations, offers} from '../mock/points';
import {getPrefix} from '../utils/common';
import {getRandomDescriprion, getRandomPhoto} from '../mock/points';

const createEditPointTemplate = (point) => {
  const transfersAndActivities = transfers.concat(activities);
  return `<form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${transfersAndActivities.map((it) => `<div class="event__type-item">
          <input id="event-type-${it}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}">
          <label class="event__type-label  event__type-label--${it}" for="event-type-${it}-1">${it.charAt(0).toUpperCase() + it.slice(1)}</label>
        </div>`).join(``).trim()}
      </fieldset>
    </div>
  </div>
  <div class="event__field-group event__field-group--destination">
    <label class="event__label event__type-output" for="event-destination-1">
    ${point.type.charAt(0).toUpperCase() + point.type.slice(1)} ${getPrefix(point.type)}
    </label>
    <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${point.location} list="destination-list-1">
    <datalist id="destination-list-1">
      ${locations.map((it) => `<option value=${it}></option>`).join(`\n`).trim()}
    </datalist>
  </div>
  <div class="event__field-group event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">
      From
    </label>
    <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${moment(point.start).format(`DD/MM/YYYY&#160;HH:mm`)}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">
      To
    </label>
    <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${moment(point.end).format(`DD/MM/YYYY&#160;HH:mm`)}>
  </div>
  <div class="event__field-group event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${point.price}>
  </div>
  <button class="event__save-btn btn btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <input id="event-favorite-1" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite" ${point.favorite ? `checked` : ``}>
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
      <input data-type="${item.type}" data-name="${item.name}" data-price="${item.price}" class="event__offer-checkbox visually-hidden" id="event-offer-${item.type}-1" type="checkbox" name="event-offer-${item.type}" ${point.offers.some((it) => it.type === item.type) ? ` checked` : ``}>
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
    <p class="event__destination-description">${point.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${point.photos.map((it) => `<img class="event__photo" src=${it}" alt="Event photo">`).join(``).trim()}
      </div>
    </div>
  </section>
</section>
</form>`;
};

export default class PointEditing extends SmartAbstractComponent {
  constructor(point) {
    super();

    this._point = Object.assign({}, point);
    this._initialPoint = Object.assign({}, point);
    this._submitHandler = null;
    this._favoriteClickHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._setTransferClickHandlers();
    this._setDestinationChangeHandler();
    this._setOfferClickHandler();
    this._applyFlatpickr();
  }

  _getTemplate() {
    return createEditPointTemplate(this._point);
  }

  _setTransferClickHandlers() {
    const inputs = this.getElement().querySelectorAll(`.event__type-input`);
    inputs.forEach((input) => input.addEventListener(`click`, (evt) => {
      this._point.type = evt.target.value;
      this.rerender();
      this._applyFlatpickr();
    }));
  }

  _setDestinationChangeHandler() {
    const input = this.getElement().querySelector(`.event__input--destination`);
    input.addEventListener(`select`, (evt) => {
      this._point.location = evt.target.value;
      this._point.description = getRandomDescriprion();
      this._point.photos = Array(5).fill(``).map(getRandomPhoto);
      this.rerender();
      this._applyFlatpickr();
    });
  }

  _setOfferClickHandler() {
    const inputs = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    inputs.forEach((input) => input.addEventListener(`click`, () => {
      this._point.offers = Array.from(inputs).map((it) => it.checked && Object.assign({}, it.dataset));
      this.rerender();
      this._applyFlatpickr();
    }));
  }

  _applyFlatpickr() {
    if (this._flatpickrStart && this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
      this._flatpickrEnd = null;
    }

    const startDateElement = this.getElement().querySelector(`#event-start-time-1`);
    const endDateElement = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickrStart = flatpickr(startDateElement, {
      enableTime: true,
      altInput: true,
      altFormat: `d/m/Y H:i`,
      format: `d/m/Y H:i`,
      [`time_24hr`]: true,
      minuteIncrement: 1,
      defaultDate: this._point.start,
      onChange: (selectedDate) => {
        this._point.start = selectedDate[0];
        this._point.date = selectedDate[0];
      },
    });

    this._flatpickrEnd = flatpickr(endDateElement, {
      enableTime: true,
      altInput: true,
      altFormat: `d/m/Y H:i`,
      format: `d/m/Y H:i`,
      [`time_24hr`]: true,
      minuteIncrement: 1,
      defaultDate: this._point.end,
      onChange: (selectedDate) => {
        this._point.end = selectedDate[0];
      },
    });
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      handler(this._point);
    });
  }

  setFavoriteClickHandler(handler) {
    this._favoriteClickHandler = handler;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteClickHandler(this._favoriteClickHandler);
    this._setTransferClickHandlers();
    this._setDestinationChangeHandler();
    this._setOfferClickHandler();
  }

  reset() {
    this._point = Object.assign({}, this._initialPoint);
  }
}
