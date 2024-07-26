import Modal from "./Modal.js";
import { modalSelectors } from "../utils/constants.js";

//I built this approach before reading through the recommended way in the project brief.
//I wanted a reusable confirm/cancel modal logic that would
//return the user's input inside any other logic in index.js.

export default class ModalConfirm extends Modal {
  constructor({
    modalSelector,
    confirmText = "Confirm",
    awaitingConfirmText = "Confirming...",
    cancelText = "Cancel",
    onConfirmCallback,
  } = {}) {
    super({ modalSelector });
    this._confirmText = confirmText;
    this._awaitingConfirmText = awaitingConfirmText;
    this._cancelText = cancelText;
    this._modalConfirmButton = this._modalElement.querySelector(
      modalSelectors.modalConfirmButtonSelector
    );
    this._modalCancelButton = this._modalElement.querySelector(
      modalSelectors.modalCancelButtonSelector
    );
    this.clickHandler = this.clickHandler.bind(this);
    this.onConfirmCallback = onConfirmCallback;
    
    this._setConfirmText(this._confirmText);
    this._setCancelText(this._cancelText);

    
    this._modalElement.addEventListener("click", this.clickHandler);
  }

  _setConfirmText(text) {
    this._modalConfirmButton.textContent = text;
  }

  _setCancelText(text) {
    this._modalCancelButton.textContent = text;
  }

  open() {
    super.open();
    this.setToConfirm();
  }

  _onCancelClick() {
    this._modalElement.removeEventListener("click", this.handler);
    this.close();
    return false;
  }

  _onConfirmClick() {
    this._modalElement.removeEventListener("click", this.handler);
    this.close();
    return true;
  }

  renderLoading(isLoading) {
    isLoading ? this._setToConfirming() : this.setToConfirm();
  }

  _setToConfirming() {
    this._modalConfirmButton.textContent = this._awaitingConfirmText;
  }

  setToConfirm() {
    this._modalConfirmButton.textContent = this._confirmText;
  }

  close() {
    super.close();     
  }

  clickHandler(evt) {
      evt.target.classList.contains("modal__button-confirm") ? this.onConfirmCallback(this.callbackData) : this.close();
  }

  awaitUserChoice(callbackData) {
    this.open();
    this.callbackData = callbackData;
    }
  }

