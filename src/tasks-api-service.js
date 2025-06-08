import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    console.log(point)
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      date_from:
      point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      date_to: point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      base_price: point.basePrice,
      is_favorite: point.isFavorite,
      destination: point.destination?.id || point.destination,
    };
 
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.destinationSelectHtml;
    delete adaptedPoint.offersEditHtml;
    delete adaptedPoint.allOffersForType;
    delete adaptedPoint.offersHtml;
    delete adaptedPoint.photosTemplate;
 
    console.log('Adapted point:', adaptedPoint.offers);
    return adaptedPoint;
  }
}