import Point from '../components/point';
import PointEditing from '../components/point-editing';
import {render, RenderPosition, replace} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onModeChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onModeChange = onModeChange;

    this._mode = Mode.DEFAULT;

    this._pointComponent = null;
    this._pointEditComponent = null;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._pointEditComponent.reset();
      this._pointEditComponent.rerender();
      replace(this._pointComponent, this._pointEditComponent);
      this._mode = Mode.DEFAULT;
    }
  }

  render(point) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        document.removeEventListener(`keydown`, onEscKeyDown);
        this.setDefaultView();
      }
    };

    this._pointComponent = new Point(point);
    this._pointEditComponent = new PointEditing(point);

    this._pointComponent.setRollupButtonClickHandler(() => {
      this._onModeChange();
      replace(this._pointEditComponent, this._pointComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
      this._mode = Mode.EDIT;
    });

    this._pointEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {favorite: !point.favorite}));
    });

    this._pointEditComponent.setSubmitHandler((newObj) => {
      this._onDataChange(this, point, newObj);
      replace(this._pointComponent, this._pointEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
      this._mode = Mode.DEFAULT;
    });

    if (oldPointEditComponent && oldPointComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._pointEditComponent, oldPointEditComponent);
    } else {
      render(this._container, this._pointComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
