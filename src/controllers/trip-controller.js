import Info from '../components/info';
import TripSorting, {SortType} from '../components/sortings';
import Point from '../components/point';
import PointEditing from '../components/point-editing';
import NoPoints from '../components/no-points';
import Days from '../components/days';
import Day from '../components/day';
import {render, RenderPosition, replace, remove} from '../utils/render';

const renderPoint = (point, dayElement) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pointComponent = new Point(point);
  const pointEditComponent = new PointEditing(point);

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

    this._tripSortingComponent = new TripSorting();
    this._daysComponent = new Days();
    this._noPointsComponent = new NoPoints();
  }

  render(points) {
    const infoContainer = document.querySelector(`.trip-info`);

    if (points.length) {
      let pointsForRender = [];
      render(infoContainer, new Info(points).getElement(), RenderPosition.AFTERBEGIN);
      render(this._container, this._tripSortingComponent.getElement(), RenderPosition.BEFOREEND);

      this._renderPreparedPoints(groupPointsByDate(points), true);

      this._tripSortingComponent.setSortTypeChangeHandler((sortType) => {
        switch (sortType) {
          case SortType.EVENT:
            remove(this._daysComponent);
            this._renderPreparedPoints(groupPointsByDate(points), true);
            break;
          case SortType.TIME:
            remove(this._daysComponent);
            pointsForRender = points.slice().sort((a, b) => {
              return (a.end - a.start) < (b.end - b.start) ? 1 : -1;
            });
            this._renderPreparedPoints(pointsForRender);
            break;
          case SortType.PRICE:
            remove(this._daysComponent);
            pointsForRender = points.slice().sort((a, b) => b.price - a. price);
            this._renderPreparedPoints(pointsForRender);
            break;
        }
      });
    } else {
      render(this._container, this._noPointsComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  _renderPreparedPoints(points, shouldGroupByDates = false) {
    render(this._container, this._daysComponent.getElement(), RenderPosition.BEFOREEND);
    if (shouldGroupByDates) {
      points.forEach((date) => {
        render(this._daysComponent.getElement(), new Day(date.day).getElement(), RenderPosition.BEFOREEND);
        const dayElement = this._container.querySelector(`.trip-days__item:nth-child(${date.day.number}) .trip-events__list`);
        date.points.forEach((point) => renderPoint(point, dayElement));
      });
    } else {
      render(this._daysComponent.getElement(), new Day(false).getElement(), RenderPosition.BEFOREEND);
      const dayElement = this._container.querySelector(`.trip-events__list`);
      points.forEach((point) => renderPoint(point, dayElement));
    }
  }
}
