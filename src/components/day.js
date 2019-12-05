import {createElement} from '../utils';

const createDayTemplate = (day) => {
  return `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${day.number}</span>
    <time class="day__date" datetime=${day.date}>${day.date}</time>
  </div>
  <ul class="trip-events__list"></ul>
  </li>`;
};

export default class Day {
  constructor(day) {
    this._day = day;

    this._element = null;
  }

  _getTemplate() {
    return createDayTemplate(this._day);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
