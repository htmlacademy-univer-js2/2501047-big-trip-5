import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import CreateFormView from './view/create-form-view.js';
import EditFormView from './view/edit-form-view.js';
import PointView from './view/point-view.js';

export default class Presenter {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.renderFilters();
    this.renderSort();
    this.renderCreateForm();
    this.renderEditForm();
    this.renderPoints();
  }

  renderFilters() {
    const filtersView = new FiltersView();
    this.container.querySelector('.trip-controls__filters').append(filtersView.getElement());
  }

  renderSort() {
    const sortView = new SortView();
    this.container.querySelector('.trip-events').prepend(sortView.getElement());
  }

  renderCreateForm() {
    const createFormView = new CreateFormView();
    this.container.querySelector('.trip-main').append(createFormView.getElement());
  }

  renderEditForm() {
    const editFormView = new EditFormView();
    this.container.querySelector('.trip-events').prepend(editFormView.getElement());
  }

  renderPoints() {
    const pointView1 = new PointView();
    const pointView2 = new PointView();
    const pointView3 = new PointView();
    this.container.querySelector('.trip-events').append(pointView1.getElement(), pointView2.getElement(), pointView3.getElement());
  }
}
