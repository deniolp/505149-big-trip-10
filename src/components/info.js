import AbstractComponent from './abstract-component';

const createInfoTemplate = (items) => {
  const firstDate = items[0].day.date;
  const lastDate = items[items.length - 1].day.date;
  const firstCity = items[0].points[0].location;
  const lastDatePoints = items[items.length - 1].points;
  const lastCity = lastDatePoints[lastDatePoints.length - 1].location;

  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${firstCity} &mdash; ... &mdash; ${lastCity}</h1>
  <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
  </div>`;
};

export default class Info extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  _getTemplate() {
    return createInfoTemplate(this._points);
  }
}
