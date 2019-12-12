import moment from 'moment';

import AbstractComponent from './abstract-component';

const createInfoTemplate = (points) => {
  const firstDate = `${moment(points[0].start).format(`MMM DD`)}`;
  const latsDate = points[0].start.getMonth() === points[points.length - 1].end.getMonth() ? moment(points[points.length - 1].end).format(`DD`) : moment(points[points.length - 1].end).format(`MMM DD`);
  const firstCity = points[0].location;
  const lastCity = points[points.length - 1].location;

  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${firstCity} &mdash; ... &mdash; ${lastCity}</h1>
  <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${latsDate}</p>
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
