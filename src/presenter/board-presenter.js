import ViewSort from '../view/view-sort.js';
import ViewAddForm from '../view/view-add-form.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoPointView from '../view/no-point-view.js';

import ViewBoard from '../view/view-board.js';
import ViewEventList from '../view/view-event-list.js';

import {render, RenderPosition, remove} from '../framework/render.js';
import {EVENT_COUNT} from "../const.js";
import PointPresenter from './task-presenter.js';
import { filter } from '../utils/filter.js';

import {sortDateDown, sortByTimeDown, sortByPriceDown} from '../utils/point.js';
import {SortType, UpdateType, UserAction} from '../const.js';

const POINT_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #pointListComponent;
  #boardComponent = new ViewBoard();
  #eventListComponent = new ViewEventList();
  #boardContainer = null;
  #pointModel = null;
  #loadMoreButtonComponent = null;
  #renderedPointCount = POINT_COUNT_PER_STEP;
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DATE;
  #buttonElement = "";
  #tripEvents = "";
  #filterModel = null;

  constructor({boardContainer, pointModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#tripEvents = document.querySelector('.trip-events');
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      boardPresenterRef: this,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
  #handleLoadMoreButtonClick = () => {
    const pointCount = this.points.length;
    const newRenderedPointCount = Math.min(pointCount, this.#renderedPointCount + POINT_COUNT_PER_STEP);
    const points = this.points.slice(this.#renderedPointCount, newRenderedPointCount);

    this.#renderPoints(points);
    this.#renderedPointCount = newRenderedPointCount;

    if (this.#renderedPointCount >= pointCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
        switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedPointCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
    };

  #renderSort() {
        this.#sortComponent = new ViewSort({
          currentSortType: this.#currentSortType,
          onSortTypeChange: this.#handleSortTypeChange
    });
    
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  } 

  #clearBoard({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointCount = this.points.length;

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    // this.#pointPresenters.clear();
    this.#eventListComponent.element.innerHTML = ""; // если нужно явно очистить DOM

    remove(this.#sortComponent);
    remove(this.#noPointComponent);
    remove(this.#loadMoreButtonComponent);

    if (resetRenderedPointCount) {
      this.#renderedPointCount = POINT_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#renderedPointCount = Math.min(pointCount, this.#renderedPointCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
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
    const pointCount = this.points.length;
    const points = this.points.slice(0, Math.min(pointCount, POINT_COUNT_PER_STEP));

    render(this.#eventListComponent, this.#boardComponent.element);
    this.#renderPoints(points);

    if (pointCount > POINT_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#boardComponent.element);

    // Теперь, когда #renderBoard рендерит доску не только на старте,
    // но и по ходу работы приложения, нужно заменить
    // константу TASK_COUNT_PER_STEP на свойство #renderedTaskCount,
    // чтобы в случае перерисовки сохранить N-показанных карточек
    this.#renderPoints(points.slice(0, Math.min(pointCount, this.#renderedPointCount)));

    if (pointCount > this.#renderedPointCount) {
      this.#renderLoadMoreButton();
    }
  }

  get points() {
    const currentFilterType = this.#filterModel.filter;
    const allPointsFromModel = this.#pointModel.points;
    const filteredPoints = filter[currentFilterType](allPointsFromModel);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredPoints.sort(sortDateDown);
      case SortType.TIME:
        return filteredPoints.sort(sortByTimeDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPriceDown);
    }
    return filteredPoints; 
  }
}
