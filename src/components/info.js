import moment from 'moment';

export const createInfoTemplate = (points) => {
  const totalPrice = points.reduce((acc, item) => {
    acc += item.price;
    return acc;
  }, 0);
  const firstDate = `${moment(points[0].start).format(`MMM DD`)}`;
  const latsDate = points[0].start.getMonth() === points[points.length - 1].end.getMonth() ? moment(points[points.length - 1].end).format(`DD`) : moment(points[points.length - 1].end).format(`MMM DD`);
  const firstCity = points[0].location;
  const lastCity = points[points.length - 1].location;

  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${firstCity} &mdash; ... &mdash; ${lastCity}</h1>
  <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${latsDate}</p>
  </div><p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};
