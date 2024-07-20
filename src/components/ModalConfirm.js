import Modal from "./Modal.js"
import { modalSelectors } from "../utils/constants.js";

//I built this approach before reading through the recommended way in the project brief.
//I wanted a reusable confirm/cancel modal logic that would
//return the user's input inside any other logic in index.js. 
 
export default class ModalConfirm extends Modal {
    constructor({ modalSelector })
    {
        super({ modalSelector })
        this._modalConfirmButton = this._modalElement.querySelector(modalSelectors.modalConfirmButtonSelector);
        this._modalCancelButton = this._modalElement.querySelector(modalSelectors.modalCancelButtonSelector);
        this.awaitUserChoice = this.awaitUserChoice.bind(this);
    }

    _setEventListeners() {
      }

    _onCancelClick() {
        console.log("on cancel clicked");
        this._modalElement.removeEventListener('click', this.handler);
        this.close();
        return false;
    }

    _onConfirmClick() {
        console.log("on confirm clicked");
        this._modalElement.removeEventListener('click', this.handler);
        this.close();
        return true;
    }

    awaitUserChoice() {
        this.open();
        const modal = this;
        return new Promise(resolve => {
            modal._modalElement.addEventListener('click', function clickHandler(evt) {
                if (evt.target.classList.contains("modal__button-confirm")) {
                    modal._modalElement.removeEventListener('click', clickHandler);
                    modal.close();
                    resolve(true);
                }
                if (evt.target.classList.contains("modal__button-cancel")) {
                    modal._modalElement.removeEventListener('click', clickHandler);
                    modal.close();
                    resolve(false);
                }  
            });
        })
    }

    
}