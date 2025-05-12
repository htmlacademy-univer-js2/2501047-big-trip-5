import AbstractView from '../framework/view/abstract-view.js';

function createViewEventList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ViewEventList extends AbstractView {
  get template() {
    return createViewEventList();
  }
}
