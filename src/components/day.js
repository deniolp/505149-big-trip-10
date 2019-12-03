import moment from 'moment';

export const createDayTemplate = (date) => {
  return `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">1</span>
    <time class="day__date" datetime=${moment(date).format(`YYYY-MM-DD`)}>${moment(date).format(`MMM DD`)}</time>
  </div>
  <ul class="trip-events__list"></ul>
  </li>`;
};
