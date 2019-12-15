import TotalCost from '../src/components/total-cost';
import Menu from '../src/components/menu';
import Filters from '../src/components/filters';
import TripController from '../src/controllers/trip-controller';
import {render, RenderPosition} from './utils/render';

import filters from './mock/filter';
import menuItems from './mock/menu';
import points from './mock/points';

const infoElement = document.querySelector(`.trip-info`);
const controlsElement = document.querySelector(`.trip-controls`);
const eventsElement = document.querySelector(`.trip-events`);

render(infoElement, new TotalCost(points).getElement(), RenderPosition.BEFOREEND);
render(controlsElement, new Menu(menuItems).getElement(), RenderPosition.BEFOREEND);
render(controlsElement, new Filters(filters).getElement(), RenderPosition.BEFOREEND);

const tripController = new TripController(eventsElement);

tripController.render(points);
