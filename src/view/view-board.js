import {createElement} from '../render.js';

function createViewBoard() {
  return '<section class="board container"></section>';
}

export default class ViewBoard {
  getTemplate() {
    return createViewBoard();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}