import {createElement} from '../render.js';

function createViewEventList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ViewEventList {
  getTemplate() {
    return createViewEventList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}