import Point from '../components/point';
import PointEditing from '../components/point-editing';
import {render, RenderPosition, replace} from '../utils/render';

const renderPoint = (point, container) => {
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

  render(container, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

export default class PointController {
  constructor(container) {
    this._container = container;
  }

  render(point) {
    renderPoint(point, this._container);
  }
}
