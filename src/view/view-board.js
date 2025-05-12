import AbstractView from '../framework/view/abstract-view.js';

function createViewBoard() {
  return '<section class="board container"></section>';
}

export default class ViewBoard extends AbstractView {
  get template() {
    return createViewBoard();
  }
}
