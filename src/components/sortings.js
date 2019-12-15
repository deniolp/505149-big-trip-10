import AbstractComponent from './abstract-component';

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

const createTripSortingTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <span class="trip-sort__item  trip-sort__item--day"></span>
  <div data-sort-type="${SortType.EVENT}" class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event">
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>
  <div data-sort-type="${SortType.TIME}" class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" checked>
    <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
      Time
    </label>
  </div>
  <div data-sort-type="${SortType.PRICE}" class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price">
      Price
    </label>
  </div>
  <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`;
};

export default class TripSorting extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.TIME;
  }

  _getTemplate() {
    return createTripSortingTemplate();
  }
}
