import ViewSort from '../view/view-sort.js';
import ViewAddForm from '../view/view-add-form.js';
import ViewEvent from '../view/view-event.js';
import ViewEditForm from '../view/view-edit-form.js';

import ViewBoard from '../view/view-board.js';
import ViewEventList from '../view/view-event-list.js';

import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new ViewBoard();
  eventListComponent = new ViewEventList();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new ViewSort(), this.boardComponent.getElement());
    render(new ViewAddForm(), this.boardComponent.getElement());


    render(this.eventListComponent, this.boardComponent.getElement());
    render(new ViewEditForm(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ViewEvent(), this.eventListComponent.getElement());
    }
  }

}