import ViewSort from '../view/view-sort.js';
import ViewAddForm from '../view/view-add-form.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoPointView from '../view/no-point-view.js';

import ViewBoard from '../view/view-board.js';
import ViewEventList from '../view/view-event-list.js';

import {render, RenderPosition, remove} from '../framework/render.js';
import {EVENT_COUNT} from "../const.js";
import PointPresenter from './task-presenter.js';
import {updateItem} from '../utils/common.js';

import {sortDateDown, sortByTimeDown, sortByPriceDown} from '../utils/point.js';
import {SortType} from '../const.js';

const POINT_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #pointListComponent;
  #boardComponent = new ViewBoard();
  #eventListComponent = new ViewEventList();
  #boardContainer = null;
  #pointModel = null;
  #loadMoreButtonComponent = null;
  #renderedPointCount = POINT_COUNT_PER_STEP;
  #boardPoints = [];
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DATE;
  #sourcedBoardPoints = [];


  constructor({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoints = structuredClone(this.#pointModel.points);    
    this.#sourcedBoardPoints = structuredClone(this.#pointModel.points);
    this.#renderBoard();
  }
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
  #handleLoadMoreButtonClick = () => {
    this.#renderPoints(this.#renderedPointCount, this.#renderedPointCount + POINT_COUNT_PER_STEP);
    this.#renderedPointCount += POINT_COUNT_PER_STEP;
    if (this.#renderedPointCount >= this.#boardPoints.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#boardPoints.sort(sortDateDown);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortByTimeDown);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortByPriceDown);
        break;
      default:
        this.#boardPoints = structuredClone(this.#sourcedBoardPoints);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
    };

  #renderSort() {
        this.#sortComponent = new ViewSort({
      onSortTypeChange: this.#handleSortTypeChange
    });
    
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  } 

  #renderPoints(from, to) {
    this.#boardPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent = new LoadMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick
    });

    render(this.#loadMoreButtonComponent, this.#boardComponent.element);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#eventListComponent.element.innerHTML = ""; // если нужно явно очистить DOM
    remove(this.#loadMoreButtonComponent);
  }

  #renderPointList() {
    render(this.#eventListComponent, this.#boardComponent.element);
    this.#renderPoints(0, Math.min(this.#boardPoints.length, POINT_COUNT_PER_STEP));

    if (this.#boardPoints.length > POINT_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardPoints.every((point) => point.isArchive)) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
