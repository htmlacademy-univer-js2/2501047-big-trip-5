import { UpdateType } from "../const.js";
import { render } from "../framework/render.js";
import ButtonView from "../view/button-view.js";
import ViewAddForm from "../view/view-add-form.js";

export default class ButtonPresenter {
  #buttonContainer = null;
  #formContainer = null;
 
  #buttonComponent = null;
  #formComponent = null;
  #pointModel = null;
  #offersModel = null;
  #destinationModel = null;
 
  constructor({ buttonContainer, formContainer, pointModel, offersModel, destinationModel,}) {
    this.#buttonContainer = buttonContainer;
    this.#formContainer = formContainer;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
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
      offersModel: this.#offersModel,
      destinationModel: this.#destinationModel,
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
  const newPointData = this.#formComponent.getFormData();
  this.#pointModel.addPoint(UpdateType.MINOR, newPointData);
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