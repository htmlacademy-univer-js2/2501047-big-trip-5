import { extend } from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizeEventDueDate,
  humanizeEventTime,
  formatDuration,
} from "../utils.js";

function createViewEvent(point) {
  // console.log(point)
  const {
    type,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    offersHtml,
    favorite,
  } = point;
  console.log(type, destination)
 
  const date = humanizeEventDueDate(dateFrom);
  const timeStart = humanizeEventTime(dateFrom);
  const timeEnd = humanizeEventTime(dateTo);
  return `
    <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
                  </p>
                  <p class="event__duration">${formatDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${offersHtml}
                </ul>
                <button class="event__favorite-btn event__favorite-btn--active" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn card__btn--edit" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
  `;
}

export default class ViewEvent extends AbstractView {
  #point = null;
  #handleEditClick = null;

  constructor({ point, onEditClick }) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.card__btn--edit')
      .addEventListener('click', this.#editClickHandler);
  }
  
  get template() {
    return createViewEvent(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
