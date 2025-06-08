import { EVENT_COUNT } from "../const.js";
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
 
export default class PointModel extends Observable{
  #offersModel = null;
  #destinationModel = null;
  #points = [];
  #pointsApiService = null;

  constructor({pointsApiService, destinationModel, offersModel}) {
    super()
    this.#pointsApiService = pointsApiService;

    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

    async init() {
        try {
          const points = await this.#pointsApiService.points;
          this.#points = points.map(this.#adaptToClient);
          this.#points = this.#points.map((point) => this.#createPoint(point))
        } catch(err) {
          this.#points = [];
        }

          this._notify(UpdateType.INIT);
      }

   #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point["base_price"],
      dateFrom:
        point["date_from"] !== null
          ? new Date(point["date_from"])
          : point["date_from"],
      dateTo:
        point["date_to"] !== null
          ? new Date(point["date_to"])
          : point["date_to"],
      isFavorite: point["is_favorite"],
    };
 
    delete adaptedPoint["base_price"];
    delete adaptedPoint["date_from"];
    delete adaptedPoint["date_to"];
    delete adaptedPoint["is_favorite"];
 
    return adaptedPoint;
  }
 
  #createPoint(rawPoint) {
    const destination = rawPoint  != undefined 
      ? this.#destinationModel.getDestinationById(rawPoint.destination)
      : [];
    const allOffersForType = this.#offersModel.getOffersByType(rawPoint.type);
    const offers = rawPoint != undefined ? (allOffersForType ?? []).filter((offer) =>
      rawPoint.offers.includes(offer.id)
    ) : [];

    const offersHtml = this.#createOffersHtml(offers);
    const offersEditHtml = this.#createOffersTemplate(allOffersForType, offers);
    const photosTemplate = this.#createPhotosTemplate(destination);
 
    const rez = {
      ...rawPoint,
      destination,
      allOffersForType,
      offers,
      offersHtml,
      offersEditHtml,
      photosTemplate,
    };

    return rez;
  }
 
  #createOffersHtml(offers) {
    if (!offers || offers.length === 0) return "";
 
    return `
    <ul class="event__selected-offers">
      ${offers
        .map(
          (offer) => `
          <li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>
        `
        )
        .join("")}
    </ul>
  `;
  }
 
#createOffersTemplate(allOffersForType, selectedOffers) {
    const selectedOfferIds = selectedOffers.map((offer) => offer.id);
 
    return `
    <div class="event__available-offers">
      ${allOffersForType
        .map((offer) => {
          const isChecked = selectedOfferIds.includes(offer.id)
            ? "checked"
            : "";
          const sanitizedTitle = offer.title.toLowerCase().replace(/\s+/g, "-");
          const offerId = `event-offer-${sanitizedTitle}-1`;
 
          return `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden"
                   id="${offerId}"
                   type="checkbox"
                   name="event-offer-${sanitizedTitle}"
                   ${isChecked}>
            <label class="event__offer-label" for="${offerId}">
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

  #createPhotosTemplate(destination) {
    const photosHtml = destination.length != 0 ? destination.pictures 
      .map((picture) => {
        return `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
      })
      .join("\n") : "";
 
    return `
<div class="event__photos-container">
  <div class="event__photos-tape">
    ${photosHtml}
  </div>
</div>`.trim();
  }

  addPoint(newPoint) {
    this.#points = [newPoint, ...this.#points];
  }

  get points() {
    return this.#points;
  }

    async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

        try {
      const response = await this.#pointsApiService.updatePoint(update);
      let updatedPoint = this.#adaptToClient(response);
      updatedPoint = this.#createPoint(updatedPoint);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }
}

