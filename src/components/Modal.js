import { modalSelectors } from "../utils/constants.js";

export default class Modal {
    constructor( { modalSelector } ) {
        this._modalSelector = modalSelector;
        this._modalElement = document.querySelector(modalSelector);
        this._handleEscapeClose = this._handleEscapeClose.bind(this); 
        this._closeButton = this._modalElement.querySelector(modalSelectors.modalCloseButton);

        this._setEventListeners();
    }

    open() {
        this._modalElement.classList.add(modalSelectors.openModalClass);
        this._setEscapeListener(true);
    }

    close() {
        this._modalElement.classList.remove(modalSelectors.openModalClass);
        this._setEscapeListener(false);
    }

    _handleEscapeClose(evt) {
        if(evt.key === 'Escape') {
            this.close(); 
        };
    }

    _setEscapeListener(bool) {
        bool ? document.addEventListener('keydown',this._handleEscapeClose) : document.removeEventListener('keydown',this._handleEscapeClose);
    }

    _setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
        this._modalElement.addEventListener('click',(evt) => this._handleModalOverlayClick(evt));
        
    }

    _handleModalOverlayClick(evt) {
        if(evt.target.classList.contains(modalSelectors.modalElementClass)) this.close();
    }

}