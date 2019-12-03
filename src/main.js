import {createInfoTemplate} from '../src/components/info';
import {createCostTemplate} from '../src/components/total-cost';
import {createMenuTemplate} from '../src/components/menu';
import {createFiltersTemplate} from '../src/components/filters';
import {createTripSortingTemplate} from '../src/components/sortings';
import {createCardTemplate} from '../src/components/card';
import {createEditCardTemplate} from '../src/components/card-editing';
import {createDaysTemplate} from '../src/components/days';
import {createDayTemplate} from '../src/components/day';

import filters from "./mock/filter";
import menuItems from "./mock/menu";
import generateCard from "./mock/card";

const CARDS_COUNT = 4;

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};
const points = new Array(CARDS_COUNT).fill(``).map((point) => {
  point = generateCard();
  return point;
});

const infoElement = document.querySelector(`.trip-info`);
const controlsElement = document.querySelector(`.trip-controls`);
const eventsElement = document.querySelector(`.trip-events`);

render(infoElement, createInfoTemplate(points), `afterBegin`);
render(infoElement, createCostTemplate(points));
render(controlsElement, createMenuTemplate(menuItems));
render(controlsElement, createFiltersTemplate(filters));
render(eventsElement, createTripSortingTemplate());
render(eventsElement, createDaysTemplate());

const daysElement = eventsElement.querySelector(`.trip-days`);
render(daysElement, createDayTemplate(points[0].start));

const dayElement = eventsElement.querySelector(`.trip-events__list`);
points.forEach((point) => render(dayElement, createCardTemplate(point)));
render(dayElement, createEditCardTemplate(points[0]), `afterBegin`);
