import ViewSort from '../view/view-sort.js';
import ViewAddForm from '../view/view-add-form.js';
import ViewEvent from '../view/view-event.js';
import TaskEditView from '../view/view-edit-form.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoPointView from '../view/no-point-view.js';

import ViewBoard from '../view/view-board.js';
import ViewEventList from '../view/view-event-list.js';

import {render, replace, remove} from '../framework/render.js';
import {EVENT_COUNT} from "../const.js";

const POINT_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardComponent = new ViewBoard();
  #eventListComponent = new ViewEventList();
  #boardContainer = null;
  #pointModel = null;
  #loadMoreButtonComponent = null;
  #renderedPointCount = POINT_COUNT_PER_STEP;
  #boardPoints = [];
  // #handleLoadMoreButtonClick = null;


  constructor({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoints = structuredClone(this.#pointModel.points);    
    this.#renderBoard();
  }
  #renderPoint({point}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === "Escape") {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener("keydown", escKeyDownHandler);
      }
    };
    const pointComponent = new ViewEvent({
      point,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener("keydown", escKeyDownHandler);
      },
    });
    const pointEditComponent = new TaskEditView({
      point,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener("keydown", escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToCard();
        document.removeEventListener("keydown", escKeyDownHandler);
      },
    });
    
    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }
  #handleLoadMoreButtonClick = () => {
    this.#boardPoints
      .slice(this.#renderedPointCount, this.#renderedPointCount + POINT_COUNT_PER_STEP)
      .forEach((point) => {
        this.#renderPoint({point})
      });

    this.#renderedPointCount += POINT_COUNT_PER_STEP;
    if (this.#renderedPointCount >= this.#boardPoints.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };
  #renderBoard(){
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardPoints.every((point) => point.isArchive)) {
      render(new NoPointView(), this.#boardComponent.element);
      return;
    }

    render(new ViewSort(), this.#boardComponent.element);


    render(this.#eventListComponent, this.#boardComponent.element);

    for (let i = 0; i < Math.min(this.#boardPoints.length, POINT_COUNT_PER_STEP); i++) {
      this.#renderPoint({point:this.#boardPoints[i]})
    }

    if (this.#boardPoints.length > POINT_COUNT_PER_STEP) {
      this.#loadMoreButtonComponent = new LoadMoreButtonView({
        onClick: this.#handleLoadMoreButtonClick
      });
      render(this.#loadMoreButtonComponent, this.#boardComponent.element);
    }
  }
}
