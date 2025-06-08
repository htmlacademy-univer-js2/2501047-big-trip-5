import {render, replace, remove} from '../framework/render.js';
import ViewEvent from '../view/view-event.js';
import PointEditView from '../view/view-edit-form.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const BLANK_POINT_ID_PLACEHOLDER = null;

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;
  #boardPresenterRef = null;
  #offersModel = null;
  #destinationModel = null;

  constructor({pointListContainer, onDataChange, onModeChange, boardPresenterRef, offersModel, destinationModel,}) {
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#boardPresenterRef = boardPresenterRef;
  } 

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new ViewEvent({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      offersModel: this.#offersModel,
      destinationModel: this.#destinationModel,
        onDataChange: this.#handleFormUpdateSubmit,
        onCancelClick: this.#handleCancelEditClick,
        onDeleteClick: this.#handleDeleteClick,
    });

        if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  #handleFormUpdateSubmit = (point) => {
 
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
    };

    #handleCancelEditClick = () => {
    const isNewPoint =
      this.#point.id === BLANK_POINT_ID_PLACEHOLDER || this.#point.id === null;
 
    if (isNewPoint) {
      if (
        this.#boardPresenterRef &&
        typeof this.#boardPresenterRef.handleCancelAddPoint === "function"
      ) {
        this.#boardPresenterRef.handleCancelAddPoint();
      }
      this.destroy();
      return;
    }
 
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToCard();
    };
    #handleDeleteClick = (point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
    };

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

    resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };
}