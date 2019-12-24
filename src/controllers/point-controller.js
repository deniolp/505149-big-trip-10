import Point from '../components/point';
import PointEditing from '../components/point-editing';
import {render, RenderPosition, replace} from '../utils/render';

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._pointComponent = null;
    this._pointEditComponent = null;
  }

  render(point) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replace(this._pointComponent, this._pointEditComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._pointComponent = new Point(point);
    this._pointEditComponent = new PointEditing(point);

    this._pointComponent.setRollupButtonClickHandler(() => {
      replace(this._pointEditComponent, this._pointComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._pointEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {favorite: !point.favorite}));
    });

    this._pointEditComponent.setSubmitHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point));
      replace(this._pointComponent, this._pointEditComponent);
    });

    if (oldPointEditComponent && oldPointComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._pointEditComponent, oldPointEditComponent);
    } else {
      render(this._container, this._pointComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
