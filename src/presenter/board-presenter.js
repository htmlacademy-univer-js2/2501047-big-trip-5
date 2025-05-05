import ViewSort from '../view/view-sort.js';
import ViewAddForm from '../view/view-add-form.js';
import ViewEvent from '../view/view-event.js';
import ViewEditForm from '../view/view-edit-form.js';

import ViewBoard from '../view/view-board.js';
import ViewEventList from '../view/view-event-list.js';

import {render} from '../render.js';
import {EVENT_COUNT} from "../const.js";

export default class BoardPresenter {
  boardComponent = new ViewBoard();
  eventListComponent = new ViewEventList();

  constructor({boardContainer, pointModel}) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = structuredClone(this.pointModel.getPoints());    
    render(this.boardComponent, this.boardContainer);
    render(new ViewSort(), this.boardComponent.getElement());
    render(
      new ViewAddForm({point:this.boardPoints[0]}), 
      this.boardComponent.getElement()
    );


    render(this.eventListComponent, this.boardComponent.getElement());
    render(
      new ViewEditForm({point:this.boardPoints[1]}), 
      this.eventListComponent.getElement()
    );

    for (let i = 0; i < EVENT_COUNT; i++) {
      render(
        new ViewEvent({ point: this.boardPoints[i] }),
        this.eventListComponent.getElement()
      );
    }
  }

}
