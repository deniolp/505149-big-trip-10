import Info from '../components/info';
import TripSorting from '../components/sortings';
import Card from '../components/card';
import CardEditing from '../components/card-editing';
import NoCards from '../components/no-cards';
import Days from '../components/days';
import Day from '../components/day';
import {render, RenderPosition, replace} from '../utils/render';

const renderPoint = (point, dayElement) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pointComponent = new Card(point);
  const pointEditComponent = new CardEditing(point);

  pointComponent.setRollupButtonClickHandler(() => {
    replace(pointEditComponent, pointComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setSubmitHandler(() => replace(pointComponent, pointEditComponent));

  render(dayElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const groupPointsByDate = (items) => {
  const pointDates = Array.from(new Set(items.map((point) => {
    return point.date;
  })));

  return pointDates.map((pointDate, i) => {
    return {
      day: {
        number: i + 1,
        date: pointDate,
      },
      points: items.filter((point) => point.date === pointDate)
    };
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._tripSortingComponent = new TripSorting().getElement();
    this._daysComponent = new Days().getElement();
    this._noCardsComponent = new NoCards().getElement();
  }

  render(points) {
    const infoContainer = document.querySelector(`.trip-info`);

    if (points.length) {
      render(infoContainer, new Info(points).getElement(), RenderPosition.AFTERBEGIN);
      render(this._container, this._tripSortingComponent, RenderPosition.BEFOREEND);
      render(this._container, this._daysComponent, RenderPosition.BEFOREEND);

      const daysElement = this._container.querySelector(`.trip-days`);
      const groupedByDatePoints = groupPointsByDate(points);

      groupedByDatePoints.forEach((date) => {
        render(daysElement, new Day(date.day).getElement(), RenderPosition.BEFOREEND);
        const dayElement = this._container.querySelector(`.trip-days__item:nth-child(${date.day.number}) .trip-events__list`);
        date.points.forEach((point) => renderPoint(point, dayElement));
      });
    } else {
      render(this._container, this._noCardsComponent, RenderPosition.BEFOREEND);
    }
  }
}
