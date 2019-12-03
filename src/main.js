import {createInfoTemplate} from '../src/components/info';
import {createCostTemplate} from '../src/components/total-cost';
import {createMenuTemplate} from '../src/components/menu';
import {createFiltersTemplate} from '../src/components/filters';
import {createTripSortingTemplate} from '../src/components/sortings';
import {createCardTemplate} from '../src/components/card';
import {createEditCardTemplate} from '../src/components/card-editing';
import {createDaysTemplate} from '../src/components/days';
import {createDayTemplate} from '../src/components/day';
import {render, RenderPosition} from './utils.js';

import filters from "./mock/filter";
import menuItems from "./mock/menu";
import generateCard from "./mock/card";

const CARDS_COUNT = 4;
const points = new Array(CARDS_COUNT).fill(``).map((point) => {
  point = generateCard();
  return point;
});

const infoElement = document.querySelector(`.trip-info`);
const controlsElement = document.querySelector(`.trip-controls`);
const eventsElement = document.querySelector(`.trip-events`);

render(infoElement, createInfoTemplate(points), RenderPosition.AFTERBEGIN);
render(infoElement, createCostTemplate(points), RenderPosition.BEFOREEND);
render(controlsElement, createMenuTemplate(menuItems), RenderPosition.BEFOREEND);
render(controlsElement, createFiltersTemplate(filters), RenderPosition.BEFOREEND);
render(eventsElement, createTripSortingTemplate(), RenderPosition.BEFOREEND);
render(eventsElement, createDaysTemplate(), RenderPosition.BEFOREEND);

const daysElement = eventsElement.querySelector(`.trip-days`);
render(daysElement, createDayTemplate(points[0].start), RenderPosition.BEFOREEND);

const dayElement = eventsElement.querySelector(`.trip-events__list`);
points.forEach((point) => render(dayElement, createCardTemplate(point), RenderPosition.BEFOREEND));
render(dayElement, createEditCardTemplate(points[0]), RenderPosition.AFTERBEGIN);
