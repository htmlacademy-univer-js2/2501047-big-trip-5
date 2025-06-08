import ButtonPresenter from './presenter/button-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './tasks-api-service.js';
import DestinationsApiService from "./destination-api-service.js";
import OffersApiService from "./offers-api-service.js";

const AUTHORIZATION = 'Basic MTIzOjEyMw==';
const END_POINT = "https://21.objects.htmlacademy.pro/big-trip";

const tripBody = document.querySelector('.page-body');
const filterHeaderElement = tripBody.querySelector('.trip-controls__filters');
const buttonElement = document.querySelector(".trip-main");
const tripEvents = tripBody.querySelector('.trip-events');

const destinationsApiService = new DestinationsApiService(END_POINT, AUTHORIZATION);
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const offersApiService = new OffersApiService(END_POINT, AUTHORIZATION);

const destinationModel = new DestinationModel({ destinationsApiService });
const offersModel = new OffersModel({ offersApiService });
const filterModel = new FilterModel();
const pointModel = new PointModel({pointsApiService, destinationModel, offersModel,});

const boardPresenter = new BoardPresenter({
    boardContainer: tripEvents, 
    pointModel, 
    filterModel,
    offersModel,
    destinationModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterHeaderElement,
  filterModel,
  pointModel,
  offersModel,
  destinationModel,
});

function renderNewButton() {
    const buttonPresenter = new ButtonPresenter({
      buttonContainer: buttonElement,
      formContainer: tripEvents,
      pointModel: pointModel,
      offersModel,
      destinationModel,
    });
    buttonPresenter.init();
  }

boardPresenter.init();
filterPresenter.init();
Promise.all([destinationModel.init(), offersModel.init()])
  .then(() => {
    pointModel.init();
    renderNewButton();
  })
  .catch((err) => {
    console.error("Failed to initialize models", err);
  });