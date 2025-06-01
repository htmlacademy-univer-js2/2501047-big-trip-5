import { render } from "../framework/render.js";
import ButtonView from "../view/button-view.js";
import ViewAddForm from "../view/view-add-form.js";

export default class ButtonPresenter {
  #buttonContainer = null;
  #formContainer = null;
 
  #buttonComponent = null;
  #formComponent = null;
  #pointModel = null;
 
  constructor({ buttonContainer, formContainer, pointModel,}) {
    this.#buttonContainer = buttonContainer;
    this.#formContainer = formContainer;
    this.#pointModel = pointModel;
  }
 
  init() {
    this.#buttonComponent = new ButtonView();
    render(this.#buttonComponent, this.#buttonContainer);
    this.#buttonComponent.element.addEventListener(
      "click",
      this.#handleNewEventClick
    );
  }
 
  #handleNewEventClick = () => {
    const newPoint = this.#createEmptyPoint();
 
    this.#formComponent = new ViewAddForm({
      point: newPoint,
      onHandleFormSubmit: this.#handleFormSubmit,
      onHandleCancelClick: this.#handleCancelClick,
    });
    render(this.#formComponent, this.#formContainer, "afterbegin");
 
    this.#buttonComponent.element.disabled = true;
  };
 
  #handleCancelClick = () => {
    this.#destroyForm();
  };
 
  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    // Здесь можно добавить сохранение в модель, если будет нужно
    const newPointData = this.#formComponent.getFormData();
    this.#pointModel.addPoint(newPointData);
    this.#destroyForm();
  };
 
  #destroyForm() {
    this.#formComponent.element.remove();
    this.#formComponent.removeElement();
    this.#formComponent = null;
    this.#buttonComponent.element.disabled = false;
  }
 
  #createEmptyPoint() {
    return {
      type: "flight",
      destination: {
        name: "",
        description: "",
        pictures: [],
      },
      dateFrom: new Date(),
      dateTo: new Date(),
      basePrice: 0,
      offers: [],
      offersHtml: "",
      offersEditHtml: "",
      photosTemplate: "",
      favorite: false,
      allOffersForType: [],
    };
  }
}