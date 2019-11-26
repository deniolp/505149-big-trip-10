import {createInfoTemplate} from '../src/components/info';
import {createMenuTemplate} from '../src/components/menu';
import {createFiltersTemplate} from '../src/components/filters';
import {createTripSortingTemplate} from '../src/components/sortings';
import {createCardTemplate} from '../src/components/card';
import {createEditCardTemplate} from '../src/components/card-editing';
import {createDaysTemplate} from '../src/components/days';
import {createDayTemplate} from '../src/components/day';

const CARDS_COUNT = 3;

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const infoElement = document.querySelector(`.trip-info`);
const controlsElement = document.querySelector(`.trip-controls`);
const eventsElement = document.querySelector(`.trip-events`);

render(infoElement, createInfoTemplate(), `afterBegin`);
render(controlsElement, createMenuTemplate());
render(controlsElement, createFiltersTemplate());
render(eventsElement, createTripSortingTemplate());
render(eventsElement, createDaysTemplate());

const daysElement = eventsElement.querySelector(`.trip-days`);
render(daysElement, createDayTemplate());

const dayElement = eventsElement.querySelector(`.trip-events__list`);
render(dayElement, createEditCardTemplate());
new Array(CARDS_COUNT).fill(``).forEach(() => render(dayElement, createCardTemplate()));
