import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
    constructor({ modalSelector, onSubmitCallback } ) {
        super({ modalSelector });
        this._onSubmitCallback = onSubmitCallback;
        this._submitButton = this._modalElement.querySelector(".modal__submit-button");
        this._inputFields = this._modalElement.querySelectorAll('.modal__input');
        this._form = this._modalElement.querySelector(".modal__form");
        this._currentProfileName = document.querySelector('.profile__name');
        this._currentProfileDescription = document.querySelector('.profile__description');
    }

    getFormElement() {
        return this._form;
    }

    _reset() {
        this._inputFields.forEach((field) => {
            field.value = "";
        })
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
        this._reset();
        this.close();
    }
    
    setDefaultInputs(defaultsObject) {
        this._inputFields.forEach((field) => {
            if (defaultsObject[field.name]) field.value = defaultsObject[field.name];
        })
    }

    setPlaceholderInputs(defaultsObject) {
        this._inputFields.forEach((field) => {
            if (defaultsObject[field.name]) field.setAttribute('placeholder', defaultsObject[field.name]);
        })
    }

}