import AbstractComponent from './abstract-component';

const createCostTemplate = (points) => {
  const totalPrice = points.reduce((acc, item) => {
    acc += item.price;
    return acc;
  }, 0);

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};

export default class TotalCost extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  _getTemplate() {
    return createCostTemplate(this._points);
  }
}
