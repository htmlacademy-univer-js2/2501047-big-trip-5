import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;

  return `
  <div class="trip-filters__filter">
    <input
        type="radio"
        id="filter__${type}"
        class="trip-filters__filter-input  visually-hidden"
        name="trip-filter"
        ${type === currentFilterType ? "checked" : ""}
        ${count === 0 ? "disabled" : ""}
        value="${type}"
      />
      <label for="filter__${type}" class="trip-filters__filter-label">
        ${type} <span class="filter__${type}-count">${count}</span></label
      >
  </div>`;
}

function createViewFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return `<form class="trip-filters" action="#" method="get">
                      ${filterItemsTemplate}
              </form>`;
}

export default class ViewFilter extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

     this.element.addEventListener("change", this.#filterTypeChangeHandler);
  }
  get template() {
    return createViewFilterTemplate(this.#filters, this.#currentFilter);
  }

    #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
