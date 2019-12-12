import AbstractComponent from './abstract-component';

const createDaysTemplate = () => `<ul class="trip-days"></ul>`;

export default class Days extends AbstractComponent {
  _getTemplate() {
    return createDaysTemplate();
  }
}
