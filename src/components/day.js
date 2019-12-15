import AbstractComponent from './abstract-component';

const createDayTemplate = (day) => {
  return `<li class="trip-days__item day">
  <div class="day__info">
    <span class="day__counter">${day ? day.number : `#`}</span>
    <time class="day__date" datetime=${day ? day.number : null}>${day ? day.date : ``}</time>
  </div>
  <ul class="trip-events__list"></ul>
  </li>`;
};

export default class Day extends AbstractComponent {
  constructor(day) {
    super();
    this._day = day;
  }

  _getTemplate() {
    return createDayTemplate(this._day);
  }
}
