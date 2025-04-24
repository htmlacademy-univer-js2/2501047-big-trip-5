// import {render} from './render.js';
// import ViewFilter from './view/view-filter.js';
// import ViewSort from './view/view-sort.js';
// import ViewEditForm from './view/view-edit-form.js';
// import ViewEvent from './view/view-event.js';
// import ViewAddForm from './view/view-add-form.js';

// // const siteMainElement = document.querySelector('.main');
// const tripBody = document.querySelector('.page-body');
// const filterHeaderElement = tripBody.querySelector('.trip-controls__filters');
// const tripEvents = tripBody.querySelector('.trip-events');


// render(new ViewFilter(), filterHeaderElement);
// render(new ViewSort(), tripEvents);
// render(new ViewAddForm(), tripEvents);
// render(new ViewEditForm(), tripEvents);
// render(new ViewEvent(), tripEvents);

import ViewFilter from './view/view-filter.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripBody = document.querySelector('.page-body');
const filterHeaderElement = tripBody.querySelector('.trip-controls__filters');

const tripEvents = tripBody.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: tripEvents});

render(new ViewFilter(), filterHeaderElement);

boardPresenter.init();