import Point from '../components/point';
import PointEditing from '../components/point-editing';
import {render, RenderPosition, replace} from '../utils/render';

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(point) {
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

    pointEditComponent.setFavoriteButtonHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {favorite: !point.favorite}));
    });

    pointEditComponent.setSubmitHandler(() => replace(pointComponent, pointEditComponent));

    render(this._container, pointComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
