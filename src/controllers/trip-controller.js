import moment from 'moment';

import Info from '../components/info';
import TripSorting, {SortType} from '../components/sortings';
import NoPoints from '../components/no-points';
import Days from '../components/days';
import Day from '../components/day';
import PointController from '../controllers/point-controller';
import {render, RenderPosition, remove} from '../utils/render';

const groupPointsByDate = (items) => {
  const pointDates = Array.from(new Set(items.slice().sort((a, b) => a.date - b.date).map((point) => {
    return moment(point.date).format(`MMM D`);
  })));

  return pointDates.map((pointDate, i) => {
    return {
      day: {
        number: i + 1,
        date: pointDate,
      },
      points: items.filter((point) => moment(point.date).format(`MMM D`) === pointDate)
    };
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];
    this._pointControllers = [];
    this._tripSortingComponent = new TripSorting();
    this._daysComponent = new Days();
    this._noPointsComponent = new NoPoints();
    this._onDataChange = this._onDataChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
  }

  render(points) {
    this._points = points;
    const infoContainer = document.querySelector(`.trip-info`);

    if (this._points.length) {
      let pointsForRender = [];
      render(infoContainer, new Info(this._points).getElement(), RenderPosition.AFTERBEGIN);
      render(this._container, this._tripSortingComponent.getElement(), RenderPosition.BEFOREEND);

      this._renderPreparedPoints(groupPointsByDate(this._points));

      this._tripSortingComponent.setSortTypeChangeHandler((sortType) => {
        switch (sortType) {
          case SortType.EVENT:
            remove(this._daysComponent);
            this._renderPreparedPoints(groupPointsByDate(this._points));
            break;
          case SortType.TIME:
            remove(this._daysComponent);
            pointsForRender = this._points.slice().sort((a, b) => {
              return (a.end - a.start) < (b.end - b.start) ? 1 : -1;
            });
            this._renderPreparedPoints(pointsForRender, false);
            break;
          case SortType.PRICE:
            remove(this._daysComponent);
            pointsForRender = this._points.slice().sort((a, b) => b.price - a. price);
            this._renderPreparedPoints(pointsForRender, false);
            break;
        }
      });
    } else {
      render(this._container, this._noPointsComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  _onDataChange(controller, oldObject, newObject) {
    const index = this._points.findIndex((object) => object === oldObject);
    if (index === -1) {
      return;
    }
    this._points = [].concat(this._points.slice(0, index), newObject, this._points.slice(index + 1));
    remove(this._daysComponent);
    this._renderPreparedPoints(groupPointsByDate(this._points));
  }

  _onModeChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _renderPreparedPoints(points, shouldGroupByDates = true) {
    render(this._container, this._daysComponent.getElement(), RenderPosition.BEFOREEND);
    if (shouldGroupByDates) {
      points.forEach((date) => {
        render(this._daysComponent.getElement(), new Day(date.day).getElement(), RenderPosition.BEFOREEND);
        const dayElement = this._container.querySelector(`.trip-days__item:nth-child(${date.day.number}) .trip-events__list`);
        date.points.forEach((point) => {
          const pointController = new PointController(dayElement, this._onDataChange, this._onModeChange);
          pointController.render(point);
          this._pointControllers.push(pointController);
        });
      });
    } else {
      render(this._daysComponent.getElement(), new Day(false).getElement(), RenderPosition.BEFOREEND);
      const dayElement = this._container.querySelector(`.trip-events__list`);
      this._pointControllers = points.map((point) => {
        const pointController = new PointController(dayElement, this._onDataChange, this._onModeChange);
        pointController.render(point);
        return pointController;
      });
    }
  }
}
