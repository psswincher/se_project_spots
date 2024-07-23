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
    this.awaitUserChoice = this.awaitUserChoice.bind(this);

    this._setConfirmText(this._confirmText);
    this._setCancelText(this._cancelText);
  }

  _setConfirmText(text) {
    console.log(this._modalCinformButton);
    this._modalConfirmButton.textContent = text;
  }

  _setCancelText(text) {
    this._modalCancelButton.textContent = text;
  }

  _onCancelClick() {
    console.log("on cancel clicked");
    this._modalElement.removeEventListener("click", this.handler);
    this.close();
    return false;
  }

  _onConfirmClick() {
    console.log("on confirm clicked");
    this._modalElement.removeEventListener("click", this.handler);
    this.close();
    return true;
  }

  _setToConfirming() {
    this._modalConfirmButton.textContent = this._awaitingConfirmText;
  }

  setToConfirm() {
    this._modalConfirmButton.textContent = this._confirmText;
  }

  awaitUserChoice() {
    this.open();
    const modal = this;
    return new Promise((resolve) => {
      modal._modalElement.addEventListener("click", function clickHandler(evt) {
        if (evt.target.classList.contains("modal__button-confirm")) {
          modal._setToConfirming();
          modal._modalElement.removeEventListener("click", clickHandler);
          resolve(true);
        }
        if (evt.target.classList.contains("modal__button-cancel")) {
          modal._modalElement.removeEventListener("click", clickHandler);
          modal.close();
          resolve(false);
        }
      });
    });
  }
}
