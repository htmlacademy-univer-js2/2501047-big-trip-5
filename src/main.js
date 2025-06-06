import ButtonPresenter from './presenter/button-presenter.js';
import {render} from './framework/render.js';
import ViewFilter from './view/view-filter.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import {generateFilter} from './mock/filter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const tripBody = document.querySelector('.page-body');
const filterHeaderElement = tripBody.querySelector('.trip-controls__filters');
const buttonElement = document.querySelector(".trip-main");

const tripEvents = tripBody.querySelector('.trip-events');

const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const pointModel = new PointModel(destinationModel, offersModel);
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
    boardContainer: tripEvents, 
    pointModel, 
    filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterHeaderElement,
  filterModel,
  pointModel,
});

function renderNewButton() {
    const buttonPresenter = new ButtonPresenter({
      buttonContainer: buttonElement,
      formContainer: tripEvents,
      pointModel: pointModel,
    });
    buttonPresenter.init();
  }

renderNewButton();
boardPresenter.init();
filterPresenter.init();
