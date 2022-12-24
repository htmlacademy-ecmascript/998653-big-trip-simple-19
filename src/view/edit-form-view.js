import { createElement } from '../render.js';

function editFormTemplate() {
  //return - разметка редактирования формы;
}

export default class EditFormView {
  getTemplate() {
    return editFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
