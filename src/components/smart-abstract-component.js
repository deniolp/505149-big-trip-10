import AbstractComponent from "./abstract-component";

export default class SmartAbstractComponent extends AbstractComponent {

  recoveryListeners() {
    throw new Error(`You should to implement recoveryListeners in child class.`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    oldElement.replaceWith(newElement);
    this.recoveryListeners();
  }
}
