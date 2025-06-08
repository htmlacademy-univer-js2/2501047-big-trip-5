import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEventDueDateEdit } from '../utils/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  id: null,
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    name: '',
    description: '',
    pictures: []
  },
  isFavorite: false,
  offers: [],
  type: 'flight',
  destinationSelectHtml: '',
  offersEditHtml: ''
};

function createPhotosTemplate(destination) {
  if (!destination.pictures || destination.pictures.length === 0) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map(picture => `
          <img class="event__photo" src="${picture.src}" alt="${picture.description}">
        `).join('')}
      </div>
    </div>
  `;
}

function createDestinationSelectTemplate(currentDestinationName, type, allDestinations) {
  return `
    <label class="event__label" for="event-destination-select">
      ${type}
    </label>
    <select class="event__input event__input--destination" id="event-destination-select" name="event-destination">
      ${allDestinations
        .map(
          (dest) => `
            <option value="${dest.name}" ${
              dest.name === currentDestinationName ? "selected" : ""
            }>${dest.name}</option>
          `
        )
        .join("")}
    </select>
  `;
}

function createEventTypeListTemplate(currentType) {
  const eventTypes = [
    "taxi",
    "bus",
    "train",
    "ship",
    "drive",
    "flight",
    "check-in",
    "sightseeing",
    "restaurant",
  ];
 
  return `
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${eventTypes
      .map(
        (type) => `
              <div class="event__type-item">
                <input id="event-type-${type}-1" class="event__type-input  visually-hidden"
                  type="radio" name="event-type" value="${type}" ${
          currentType === type ? "checked" : ""
        }>
                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">
                  ${type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              </div>
            `
      )
      .join("")}
      </fieldset>
    `;
}

function createViewEditFormTemplate(point) {
  const {
    type,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    destinationSelectHtml,
    offersHtml,
    offersEditHtml = '',
    photosTemplate = '',
    favorite,
  } = point;

  return `
    <li>
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            ${createEventTypeListTemplate(type)}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          ${destinationSelectHtml} 
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDueDateEdit(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDueDateEdit(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn card__btn--edit" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${offersEditHtml}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          ${createPhotosTemplate(destination)}
        </section>
      </section>
    </form>
    </li>
  `;
}

export default class PointEditView extends AbstractStatefulView {
  #handleDataChange = null;
  #handleCancelClick = null;
  #handleDeleteClick = null;
  #offersModel = null;
  #destinationModel = null;
  #datepicker = null;
  #flatpickrFrom;
  #flatpickrTo;


  constructor({point = BLANK_POINT, onDataChange, onCancelClick, onDeleteClick, offersModel, destinationModel}) {
  super();
  this.#offersModel = offersModel;
  this.#destinationModel = destinationModel;
  this._setState(this.#parsePointToState(point));
  this.#handleDataChange = onDataChange;
  this.#handleCancelClick = onCancelClick;
  this.#handleDeleteClick = onDeleteClick;
  
  this._restoreHandlers();
}

#parsePointToState(point) {
  const allDestinations = this.#destinationModel.destinations;
  const destinationName = point.destination?.name || '';
  const allOffersForType = this.#offersModel.getOffersByType(point.type) || [];
  
  return {
    ...point,
    destinationSelectHtml: createDestinationSelectTemplate(
      destinationName,
      point.type,
      allDestinations
    ),
    offersEditHtml: this.#createOffersTemplate(
      allOffersForType,
      point.offers || []
    ),
    destination: point.destination || {
      name: '',
      description: '',
      pictures: []
    }
  };
}

  #dateFromChangeHandler = ([selectedDate]) => {
    this._setState({ dateFrom: selectedDate });

    if (
      this.#flatpickrTo &&
      this._state.dateTo &&
      selectedDate > this._state.dateTo
    ) {
      this._setState({ dateTo: selectedDate });
      this.#flatpickrTo.setDate(selectedDate, false);
    }
  };

  #dateToChangeHandler = ([selectedDate]) => {
    this._setState({ dateTo: selectedDate });
 
    if (
      this.#flatpickrFrom &&
      this._state.dateFrom &&
      selectedDate < this._state.dateFrom
    ) {
      this._setState({ dateFrom: selectedDate });
      this.#flatpickrFrom.setDate(selectedDate, false);
    }
  };
  
  #initFlatpickr() {
    if (this.#flatpickrFrom) {
      this.#flatpickrFrom.destroy();
      this.#flatpickrFrom = null;
    }
    if (this.#flatpickrTo) {
      this.#flatpickrTo.destroy();
      this.#flatpickrTo = null;
    }
 
    this.#flatpickrFrom = flatpickr(
      this.element.querySelector("#event-start-time-1"),
      {
        enableTime: true,
        dateFormat: "d/m/Y H:i",
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      }
    );
 
    this.#flatpickrTo = flatpickr(
      this.element.querySelector("#event-end-time-1"),
      {
        enableTime: true,
        dateFormat: "d/m/Y H:i",
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      }
    );
  }

    removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  #dueDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dueDate: userDate,
    });
  };

  #setDatepicker() {
    if (this._state.isDueDate) {
      this.#datepicker = flatpickr(
        this.element.querySelector('.card__date'),
        {
          dateFormat: 'j F',
          defaultDate: this._state.dueDate,
          onChange: this.#dueDateChangeHandler,
        },
      );
    }
  }

   #saveButtonClickHandler = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    const pointToSave = PointEditView.parseStateToPoint(this._state);
 
    this.#handleDataChange(pointToSave);
  };
 
  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    if (this._state.id === null) {
      this.#handleCancelClick();
    } else {
      const pointToDelete = PointEditView.parseStateToPoint(this._state);
      this.#handleDeleteClick(
        pointToDelete
      );
    }
  };
  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

_restoreHandlers() {
    this.#initFlatpickr();

    const formElement = this.element.querySelector("form");
    if (formElement) {
      formElement.addEventListener("submit", this.#saveButtonClickHandler);
    }

    const priceInput = this.element.querySelector(".event__input--price");
    if (priceInput) {
      priceInput.addEventListener("input", this.#priceInputHandler);
    }

    const destinationInput = this.element.querySelector(".event__input--destination");
    if (destinationInput) {
      destinationInput.addEventListener("change", this.#destinationSelectHandler);
    }

    const eventTypeGroup = this.element.querySelector(".event__type-group");
    if (eventTypeGroup) {
      eventTypeGroup.addEventListener("change", this.#eventTypeChangeHandler);
    }

    const rollupButton = this.element.querySelector(".event__rollup-btn");
    if (rollupButton) {
      rollupButton.addEventListener("click", this.#rollupButtonClickHandler);
    }

    const resetButton = this.element.querySelector(".event__reset-btn");
    if (resetButton) {
      resetButton.addEventListener("click", this.#resetButtonClickHandler);
    }

    // Добавляем обработчик изменений офферов
    const offersContainer = this.element.querySelector(".event__available-offers");
    if (offersContainer) {
      offersContainer.addEventListener("change", this.#offerChangeHandler);
    }
  }

  #offerChangeHandler = (evt) => {
    if (evt.target.classList.contains("event__offer-checkbox")) {
      const offerId = evt.target.dataset.offerId;
      const allOffersForType = this.#offersModel.getOffersByType(this._state.type) || [];
      const changedOffer = allOffersForType.find((o) => o.id === offerId);

      if (!changedOffer) {
        return;
      }

      const currentSelectedOffers = this._state.offers || [];
      let newSelectedOffers;

      if (evt.target.checked) {
        // Добавить оффер, если его еще нет
        if (!currentSelectedOffers.some((o) => o.id === changedOffer.id)) {
          newSelectedOffers = [...currentSelectedOffers, changedOffer];
        } else {
          newSelectedOffers = currentSelectedOffers;
        }
      } else {
        // Удалить оффер
        newSelectedOffers = currentSelectedOffers.filter((o) => o.id !== changedOffer.id);
      }

      // Обновляем состояние с новыми офферами
      this.updateElement({
        offers: newSelectedOffers,
        offersEditHtml: this.#createOffersTemplate(allOffersForType, newSelectedOffers)
      });
    }
  };

  get template() {
    return createViewEditFormTemplate(this._state);
  }

  reset(point) {
    this.updateElement(this.#parsePointToState(point));
  }

    static parsePointToState(point) {
      const state = {...point,};
    return state;
  }

  static parseStateToPoint(state) {
  const point = {...state};
  delete point.destinationSelectHtml;
  delete point.offersEditHtml;
  delete point.allOffersForType;
  
  point.offers = point.offers.map((offer) => offer.id);
  
  if (point.destination) {
    point.destination = point.destination.id;
  }
  
  return point;
}
 
  #priceInputHandler = (evt) => {
    const value = evt.target.value;
    const price = Number(value);
 
    if (!isNaN(price) && price >= 0) {
      this._setState({ basePrice: price });
    }
  };

  #destinationSelectHandler = (evt) => {
    const selectedCity = evt.target.value;
    const destinations = this.#destinationModel.destinations;
    const matchedDestination = destinations.find(
      (d) => d.name === selectedCity
    );
 
    if (matchedDestination) {
      const destinationSelectHtml = createDestinationSelectTemplate(
      matchedDestination.name,
      this._state.type,
      destinations
    );

      this.updateElement({
        destination: matchedDestination,
        destinationSelectHtml,
      });
    }
  };

  

  #eventTypeChangeHandler = (evt) => {
    if (evt.target.name === "event-type") {
      const selectedType = evt.target.value;
      const allOffersForType = this.#offersModel.getOffersByType(selectedType) || [];
      
      // Сохраняем только те офферы, которые доступны для нового типа
      const newSelectedOffers = (this._state.offers || []).filter((offer) =>
        allOffersForType.some((available) => available.id === offer.id)
      );

      const offersEditHtml = this.#createOffersTemplate(allOffersForType, newSelectedOffers);
      const destinationName = this._state.destination?.name || "";
      const allDestinations = this.#destinationModel.destinations;

      const destinationSelectHtml = createDestinationSelectTemplate(
        destinationName,
        selectedType,
        allDestinations
      );

      this.updateElement({
        type: selectedType,
        offers: newSelectedOffers,
        offersEditHtml,
        destinationSelectHtml,
      });
    }
  };

  #createOffersTemplate(allOffersForType, selectedOffers = []) {
    const selectedOfferIds = selectedOffers.map((offer) => offer.id);

    if (!allOffersForType || allOffersForType.length === 0) {
      return "<p>No offers available for this type.</p>";
    }

    return `
      <div class="event__available-offers">
        ${allOffersForType
          .map((offer) => {
            const isChecked = selectedOfferIds.includes(offer.id) ? "checked" : "";
            const sanitizedTitle = offer.title.toLowerCase().replace(/\s+/g, "-");
            const offerInputId = `event-offer-${sanitizedTitle}-${offer.id}`;

            return `
              <div class="event__offer-selector">
                <input class="event__offer-checkbox visually-hidden"
                       id="${offerInputId}"
                       type="checkbox"
                       name="event-offer-${sanitizedTitle}"
                       data-offer-id="${offer.id}"
                       ${isChecked}>
                <label class="event__offer-label" for="${offerInputId}">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </label>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }
}