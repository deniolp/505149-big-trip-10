import AbstractComponent from './abstract-component';

const createMenuTemplate = (menuItems) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menuItems.map((item) => `<a
    class="trip-tabs__btn${item.active ? ` trip-tabs__btn--active` : ``}"
    href="#"
  >
    ${item.name}
  </a>`).join(``).trim()}
</nav>`;
};

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();

    this._menuItems = menuItems;
  }

  _getTemplate() {
    return createMenuTemplate(this._menuItems);
  }
}
