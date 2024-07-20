import { cardSelectors } from "../utils/constants.js";
import { cardSettings } from "../utils/constants.js";

// {
//     "isLiked": false,
//     "_id": "64a55f2a91758c001af2a1bd",
//     "name": "The card's name",
//     "link": "https://example.com/image.png",
//     "owner": "e20537ed11237f86bbb20ccb",
//     "createdAt": "2023-07-05T12:16:42.240Z"
// }

export default class CardElement {

    constructor({ name, link, isLiked, id, imageClickManager, onDeleteAPIManager, onLikeAPIManager } ) {
        this.id = id;
        this._cardTemplate = document.querySelector(cardSelectors.template);
        this._cardElement = this._cardTemplate.content.querySelector(".card").cloneNode(true);
        this._cardImage = this._cardElement.querySelector(cardSelectors.image); 
        this._likeButton = this._cardElement.querySelector(cardSelectors.likeButton);
        this._deleteButton = this._cardElement.querySelector(cardSelectors.deleteButton);
        this._titleElement = this._cardElement.querySelector(cardSelectors.cardTitle);

        this._cardUnlikedImage = this._cardElement.querySelector(cardSelectors.unlikedImage);
        this._cardLikedImage = this._cardElement.querySelector(cardSelectors.likedImage);
        
        this._onDeleteAPIManager = onDeleteAPIManager;

        this._onLikeAPIManager = onLikeAPIManager;
        
        this._imageClickManager = imageClickManager;
        this.setTitle(name);
        this.setCardImage(link);
        this.setCardImageAlt(name);
        this._setEventListeners();
        this._setLike(isLiked);
        
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click',() => this.onImageClick());
        this._likeButton.addEventListener('click',() => this.onLikeClick());
        this._deleteButton.addEventListener('click',() => this._onDeleteClick());
    }

    setTitle(title) {
        if(typeof title === 'string') {
            this.titleText = title;
            this._titleElement.textContent = this.titleText;
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

    _setLike(bool) {
        bool ? this.activateLikeButton() : this.deactivateLikeButton();
    }

    onLikeClick() {
        if(this.isLikeActive()) {
            this._onLikeAPIManager(this.id, false)
            .then((result) => { if (result) this.deactivateLikeButton() })
        }  
        else {
            this._onLikeAPIManager(this.id, true)
            .then((result) => { if (result) this.activateLikeButton() })
        } 
    }

    isLikeActive() {
        //this logic implemented before API was implemented.
        //should the server be the authority? or the browser?
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

    remove() {
        this._cardElement.remove();
    }

    _onDeleteClick() {
        this._onDeleteAPIManager(this.id)
        .then(result => {if(result) this.remove();})
    }

    onImageClick() {
        this._imageClickManager();
    }

    getView() {
        return this._cardElement;
    }

}
