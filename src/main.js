import {render} from './framework/render.js';
import ViewFilter from './view/view-filter.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import {generateFilter} from './mock/filter.js';

const tripBody = document.querySelector('.page-body');
const filterHeaderElement = tripBody.querySelector('.trip-controls__filters');

const tripEvents = tripBody.querySelector('.trip-events');

const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const pointModel = new PointModel(destinationModel, offersModel);

const filters = generateFilter(pointModel.points);
const boardPresenter = new BoardPresenter({
    boardContainer: tripEvents, 
    pointModel
});

render(new ViewFilter({filters}), filterHeaderElement);

boardPresenter.init();
