import Modal from "./Modal.js";
import { modalSelectors } from "../utils/constants.js";

export default class ModalWithForm extends Modal {
  constructor({
    modalSelector,
    onSubmitCallback,
    submitText = "Submit",
    loadingSubmitText = "Submitting",
  } = {}) {
    super({ modalSelector });

    this._form = this._modalElement.querySelector(modalSelectors.formSelector);
    this.formName = this._form.getAttribute("name");
    //note: onSubmitCallback must always return a promise.
    this._onSubmitCallback = onSubmitCallback;
    this._submitButton = this._modalElement.querySelector(
      modalSelectors.submitButtonSelector
    );
    this._inputFields = this._modalElement.querySelectorAll(
      modalSelectors.inputSelector
    );
    this._submitText = submitText;
    this._loadingSubmitText = loadingSubmitText;
    this.renderLoading(false);
  }

  close() {
    super.close();
    this._resetInputs();
  }

  getFormElement() {
    return this._form;
  }

  _resetInputs() {
    this._form.reset();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._modalElement.addEventListener("submit", (evt) => this._onSubmit(evt));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputFields.forEach((field) => {
      inputValues[field.name] = field.value;
    });

    return inputValues;
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._onSubmitCallback(this._getInputValues());
  }

  renderLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? this._loadingSubmitText
      : this._submitText;
  }

  setDefaultInputs(defaultsObject) {
    this._inputFields.forEach((field) => {
      if (defaultsObject[field.name]) field.value = defaultsObject[field.name];
    });
  }

  setPlaceholderInputs(defaultsObject) {
    this._inputFields.forEach((field) => {
      if (defaultsObject[field.name])
        field.setAttribute("placeholder", defaultsObject[field.name]);
    });
  }
}
