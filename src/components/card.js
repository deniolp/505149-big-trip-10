import moment from 'moment';

import getPrefix from '../utils';

const addNullToTime = (time) => {
  return time > 9 ? time : `0` + time;
};

const getDiff = (time) => {
  const hours = addNullToTime(new Date(time).getUTCHours());
  const minutes = addNullToTime(new Date(time).getUTCMinutes());
  return `${hours}H ${minutes}M`;
};

export const createCardTemplate = (card) => {
  const diffTime = (card.end.getTime() - card.start.getTime());

  return `<li class="trip-events__item">
<div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${card.type.toLowerCase()}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${card.type} ${getPrefix(card.type)} ${card.location}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime=${card.start}>${moment(card.start).format(`HH:MM`)}</time>
      &mdash;
      <time class="event__end-time" datetime=${card.end}>${moment(card.end).format(`HH:MM`)}</time>
    </p>
    <p class="event__duration">${getDiff(diffTime)}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${card.price}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${card.offers.map((it) => `<li
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
