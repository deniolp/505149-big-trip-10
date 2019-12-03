import {createElement} from '../utils';

const createCostTemplate = (points) => {
  const totalPrice = points.reduce((acc, item) => {
    acc += item.price;
    return acc;
  }, 0);

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};

export default class TotalCost {
  constructor(points) {
    this._points = points;

    this._element = null;
  }

  _getTemplate() {
    return createCostTemplate(this._points);
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
