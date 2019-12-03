import moment from 'moment';

import {createElement} from '../utils';

const createDayTemplate = (date) => {
  return `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">1</span>
    <time class="day__date" datetime=${moment(date).format(`YYYY-MM-DD`)}>${moment(date).format(`MMM DD`)}</time>
  </div>
  <ul class="trip-events__list"></ul>
  </li>`;
};

export default class Day {
  constructor(date) {
    this._date = date;

    this._element = null;
  }

  _getTemplate() {
    return createDayTemplate(this._date);
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
