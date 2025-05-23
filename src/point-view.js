export default class PointView {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const point = document.createElement('div');
    point.innerHTML = `
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" src="img/icons/taxi.png" alt="Event type icon" width="42" height="42">
          </div>
          <h3 class="event__title">Taxi to airport</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
            </p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">30</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            <li class="event__offer">
              <span class="event__offer-title">Order Uber</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">20</span>
            </li>
          </ul>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      `;
    return point;
  }

  getElement() {
    return this.element;
  }
}
