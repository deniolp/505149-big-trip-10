import Menu from '../src/components/menu';
import Filters from '../src/components/filters';
import TripController from '../src/controllers/trip-controller';
import {render, RenderPosition} from './utils/render';

import filters from './mock/filter';
import menuItems from './mock/menu';
import PointsModel from './models/points';
import points from './mock/points';

const controlsElement = document.querySelector(`.trip-controls`);
const eventsElement = document.querySelector(`.trip-events`);

render(controlsElement, new Menu(menuItems).getElement(), RenderPosition.BEFOREEND);
render(controlsElement, new Filters(filters).getElement(), RenderPosition.BEFOREEND);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const tripController = new TripController(eventsElement, pointsModel);

tripController.render();
