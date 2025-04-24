import ViewFilter from './view/view-filter.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripBody = document.querySelector('.page-body');
const filterHeaderElement = tripBody.querySelector('.trip-controls__filters');

const tripEvents = tripBody.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: tripEvents});

render(new ViewFilter(), filterHeaderElement);

boardPresenter.init();
