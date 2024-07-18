import { cardSelectors } from "../utils/constants.js";
import { cardSettings } from "../utils/constants.js";

export default class CardElement {

    constructor({ title, imageLink, imageClickManager }) {

        this._cardTemplate = document.querySelector(cardSelectors.template);
        this._cardElement = this._cardTemplate.content.querySelector(".card").cloneNode(true);
        this._cardImage = this._cardElement.querySelector(cardSelectors.image); 
        this._likeButton = this._cardElement.querySelector(cardSelectors.likeButton);
        this._deleteButton = this._cardElement.querySelector(cardSelectors.deleteButton);
        this._titleElement = this._cardElement.querySelector(cardSelectors.cardTitle);

        this._cardUnlikedImage = this._cardElement.querySelector(cardSelectors.unlikedImage);
        this._cardLikedImage = this._cardElement.querySelector(cardSelectors.likedImage);
        
        this._onDeleteClick = this._onDeleteClick.bind(this); 

        this._imageClickManager = imageClickManager;

        this.setTitle(title);
        this.setCardImage(imageLink);
        this.setCardImageAlt(title);
        this._setEventListeners();
        
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click',() => this.onImageClick());
        this._likeButton.addEventListener('click',() => this.onLikeClick());
        this._deleteButton.addEventListener('click',() => this._onDeleteClick());
    }

    setTitle(title) {
        if(typeof title === 'string') {
            this.titleText = title;
            this._titleElement.textContent = this._titleText;
        } else {
            console.log(`New card title is not a string. Setting to default.`);
            this.titleText = cardSettings.defaultTitle;
            this._titleElement.textContent = this.titleText;
        }
    }

    setCardImage(imageLink) {
        this.imageLink = imageLink;
        this._cardImage.setAttribute('src', this.imageLink);
    }

    setCardImageAlt(altText) {
        this.imageAltText = altText ? altText : this.titleText; 
        this._cardImage.setAttribute('alt', this.imageAltText);
    }

    onLikeClick() {
        this.isLikeActive() ? this.deactivateLikeButton() : this.activateLikeButton();
    }

    isLikeActive() {
        return !this._cardLikedImage.classList.contains('card__liked-image__inactive');
    }

    activateLikeButton() {
        this._cardLikedImage.classList.remove('card__liked-image__inactive');
        this._cardUnlikedImage.classList.add('card__unliked-image__inactive');
    }

    deactivateLikeButton() {
        this._cardLikedImage.classList.add('card__liked-image__inactive');
        this._cardUnlikedImage.classList.remove('card__unliked-image__inactive');
    }

    _remove() {
        console.log(this._cardElement);
        this._cardElement.remove();
    }

    _onDeleteClick() {
        this._remove();
    }

    onImageClick() {
        this._imageClickManager();
    }

    getView() {
        return this._cardElement;
    }
}
