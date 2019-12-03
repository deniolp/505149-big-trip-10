import Info from '../src/components/info';
import TotalCost from '../src/components/total-cost';
import Menu from '../src/components/menu';
import Filters from '../src/components/filters';
import TripSorting from '../src/components/sortings';
import Card from '../src/components/card';
import CardEditing from '../src/components/card-editing';
import NoCards from '../src/components/no-cards';
import Days from '../src/components/days';
import Day from '../src/components/day';
import {render, RenderPosition} from './utils.js';

import filters from "./mock/filter";
import menuItems from "./mock/menu";
import generateCard from "./mock/card";

const CARDS_COUNT = 3;
const points = new Array(CARDS_COUNT).fill(``).map((point) => {
  point = generateCard();
  return point;
});

const renderPoint = (point, dayElement) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToCard = () => {
    try {
      return dayElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
    } catch (_error) {
      return () => {};
    }
  };

  const replaceCardToEdit = () => {
    dayElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const pointComponent = new Card(point);
  const pointEditComponent = new CardEditing(point);
  const rollupButton = pointComponent.getElement().querySelector(`.event__rollup-btn`);

  rollupButton.addEventListener(`click`, () => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.getElement().addEventListener(`submit`, replaceEditToCard);

  render(dayElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const infoElement = document.querySelector(`.trip-info`);
const controlsElement = document.querySelector(`.trip-controls`);
const eventsElement = document.querySelector(`.trip-events`);

render(infoElement, new TotalCost(points).getElement(), RenderPosition.BEFOREEND);
render(controlsElement, new Menu(menuItems).getElement(), RenderPosition.BEFOREEND);
render(controlsElement, new Filters(filters).getElement(), RenderPosition.BEFOREEND);

if (points.length) {
  render(infoElement, new Info(points).getElement(), RenderPosition.AFTERBEGIN);
  render(eventsElement, new TripSorting().getElement(), RenderPosition.BEFOREEND);
  render(eventsElement, new Days().getElement(), RenderPosition.BEFOREEND);

  const daysElement = eventsElement.querySelector(`.trip-days`);

  render(daysElement, new Day(points[0].start).getElement(), RenderPosition.BEFOREEND);

  const dayElement = eventsElement.querySelector(`.trip-events__list`);

  points.forEach((point) => renderPoint(point, dayElement));
} else {
  render(eventsElement, new NoCards().getElement(), RenderPosition.BEFOREEND);
}
