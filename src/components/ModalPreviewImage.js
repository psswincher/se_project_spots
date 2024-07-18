import Modal from './Modal.js';
import { modalSelectors } from '../utils/constants.js';

export default class ModalPreviewImage extends Modal {
    constructor({ modalSelector }) {
        super({ modalSelector }) 
        this._previewImage = document.querySelector(modalSelectors.previewModalImage);
        this._previewTitle = document.querySelector(modalSelectors.previewModalTitle);
        this._previewTitleText = '';
    }

    populatePreview({ imageUrl, imageAlt, titleText }) {
        this._setPreviewTitle(titleText);
        this._setPreviewImage(imageUrl);
        this._setPreviewImageAlt(imageAlt);
    }

    _setPreviewImage(imageUrl) {
        this.imageUrl = imageUrl;
        this._previewImage.setAttribute('src', imageUrl);
    }

    _setPreviewTitle(titleString) {
        this._previewTitleText = titleString;
        this._previewTitle.textContent = this._previewTitleText;
    }

    _setPreviewImageAlt(imageAlt) {
        imageAlt ? 
        this._previewImage.setAttribute('alt',imageAlt) : 
        this._previewImage.setAttribute('alt',this._previewTitleText);
    }

    clear() {
        this.setPreviewImage({imageUrl: '', imageAlt: ''});
        this.setPreviewTitle('');
    }
}