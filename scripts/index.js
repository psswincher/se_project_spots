
//#region initialize cards and render
const initialCards = [
    {name: "5-minute Dungeon", link: "https://vigilantebar.com/wp-content/uploads/2022/08/5-Minute-Dungeon-scaled.jpg"},
    {name: "7 Wonders", link: "https://vigilantebar.com/wp-content/uploads/2020/06/pic860217.jpg"},
    {name: "Abduction", link: "https://vigilantebar.com/wp-content/uploads/2023/08/71Z8QTM8qXL._AC_UF8941000_QL80_.jpg"},
    {name: "Agricola", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Agricola.jpg"},
    {name: "Black Fleet", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Black-Fleet.jpg"},
    {name: "Call to Adventure", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Call-to-Adventure-scaled.jpg"}
]

const cardsList = document.querySelector('.cards__list');
initialCards.forEach(cardData => {
    cardsList.append(getCardElement(cardData));
});

//#endregion

//#region profile modal declarations
const profileModal = document.querySelector('#edit-profile-modal');
const profileName = profileModal.querySelector('#profile-name');
const profileDescription = profileModal.querySelector('#profile-description');
profileModal.addEventListener('click',checkForModalOverlayClick);
document.querySelector('.profile__edit-button').addEventListener('click',onEditProfileClick);
document.querySelector('#profile-modal__close').addEventListener('click',onCloseModalClick);
document.forms['profile-modal__form'].addEventListener('submit',onProfileModalSubmit);
const currentProfileName = document.querySelector('.profile__name');
const currentProfileDescription = document.querySelector('.profile__description');
//#endregion

//#region new post modal declarations
const defaultLinkField = 'Paste a link to the picture';
const defaultCaptionField = 'Type your caption'

const postModal = document.querySelector('#post-modal');
const postLink = postModal.querySelector('#link');
const postCaption = postModal.querySelector('#caption');
postModal.addEventListener('click',checkForModalOverlayClick);
document.querySelector('.profile__add-button').addEventListener('click',onNewPostClick);
document.querySelector('#new-post-modal__close').addEventListener('click',onCloseModalClick);
const cardForm = document.forms['new-post-modal__form']
cardForm.addEventListener('submit',onPostModalSubmit);
//#endregion

//#region preview modal declarations
const previewModal = document.querySelector('#preview-modal');
const previewImage = document.querySelector('.modal__preview-image');
const previewTitle = document.querySelector('#preview-title');
previewModal.addEventListener('click',checkForModalOverlayClick);
document.querySelector('#preview-modal__close').addEventListener('click',onCloseModalClick);
//#endregion

//#region modal handlers
function checkForModalOverlayClick(evt) {
    if(evt.target.classList.contains("modal")) onCloseModalClick(evt);
}

function onCloseModalClick(evt) {
    const modal = evt.target.closest('.modal');
    closeModal(modal);
}

function openModal(modal) {
    addEscapeListener();
    // checkFormFieldInputErrors(modal.querySelector('.modal__form')); //this can check every field on open, but feels bearish
    modal.classList.add('modal_open');
}

function closeModal(modal) {
    removeEscapeListener();
    modal ? modal.classList.remove('modal_open') : document.querySelector('.modal_open').classList.remove('modal_open');
}

function addEscapeListener() {
    document.addEventListener('keydown',onKeyPress);
}

function removeEscapeListener() {
    document.removeEventListener('keydown',onKeyPress);
}

function onKeyPress(evt) {
    evt.key === 'Escape' ? closeModal() : null;
}


//#endregion

//#region edit profile functions
function onEditProfileClick() {
    profileName.setAttribute('value',currentProfileName.textContent)
    profileDescription.setAttribute('value', currentProfileDescription.textContent);
    updateSubmitButtonFromFormValidity(cardForm);
    
    openModal(profileModal); 
    checkFormFieldInputErrors(cardForm);
}

function onProfileModalSubmit(evt) {
    evt.preventDefault();
    const modal = evt.target.closest('.modal');
    resetModalForm(modal);
    currentProfileName.textContent = profileName.value;
    currentProfileDescription.textContent = profileDescription.value;
    closeModal(modal);
}
//#endregion

//#region new post functions

function onNewPostClick(evt) {
    postLink.setAttribute('placeholder',defaultLinkField);
    postCaption.setAttribute('placeholder',defaultCaptionField);
    updateSubmitButtonFromFormValidity(document.forms['profile-modal__form']);
    openModal(postModal);
}

function onPostModalSubmit(evt) {
    evt.preventDefault();
    //const newCard = new CardElement(postCaption.value, postLink.value);
    //newCard.prependCard();
    const newCard = getCardElement({name: postCaption.value, link: postLink.value});
    cardsList.prepend(newCard);
    postCaption.value = "";
    postLink.value = "";
    
    const postModal = evt.target.closest('.modal');
    resetModalForm(postModal);
    closeModal(postModal);
}

//#endregion

//PRIOR implementation of card elements, reserved in case making a class was a bad idea.
function onLikeClick(evt) {
    evt.target.closest('.card')
}

function getCardElement(cardData) {
    const newCard = document.querySelector('#card').content.cloneNode(true); 
    const newCardImage = newCard.querySelector('.card__image'); 
    const newCardLikeButton = newCard.querySelector('.card__like-button');
    const newCardDeleteButton = newCard.querySelector('.card__delete-button');
    newCardImage.setAttribute('src',cardData.link);
    newCardImage.setAttribute('alt',cardData.name);
    newCardImage.addEventListener('click',onCardImageClick);
    newCard.querySelector('.card__title').textContent = cardData.name;
    newCardLikeButton.addEventListener('click',onLikeCardClick);
    newCardDeleteButton.addEventListener('click',onDeleteCardClick);
    return newCard;
}

//handles card image preview
function onCardImageClick(evt) {
    const targetCard = evt.target.closest('.card');
    const cardTitle = targetCard.querySelector('.card__title').textContent
    previewImage.setAttribute('src',targetCard.querySelector('.card__image').src);
    previewImage.setAttribute('alt',cardTitle);
    previewTitle.textContent = cardTitle;
    openModal(previewModal);
}

function onLikeCardClick(evt) {
    //toggles like icon on and off
    const parentCard = evt.target.closest('.card');

    const cardUnlikedImage = parentCard.querySelector('.card__unliked-image');
    const cardLikedImage = parentCard.querySelector('.card__liked-image');

    cardUnlikedImage.classList.contains('card__unliked-image__inactive') ? 
        cardUnlikedImage.classList.remove('card__unliked-image__inactive') : 
        cardUnlikedImage.classList.add('card__unliked-image__inactive');
    
    cardLikedImage.classList.contains('card__liked-image__inactive') ? 
        cardLikedImage.classList.remove('card__liked-image__inactive') : 
        cardLikedImage.classList.add('card__liked-image__inactive');
}

function onDeleteCardClick(evt) {
    evt.target.closest('.card').remove();
}
//#region card functions
// class CardElement {
//     //hello code reviewer! I don't know if this would be the best way to do this, 
//     //but it felt like a very tidy/smooth way to implement.
//     //If this isn't best practice please let me know and I'll revert changes and do it closer to the inital project layout?
//     //Thank you!! 
//     constructor(title, imageLink) {

//         this.cardTemplate = document.querySelector('#card').content.cloneNode(true);
//         this.card = this.cardTemplate;
        
//         this.cardImage = this.cardTemplate.querySelector('.card__image'); 
//         this.likeButton = this.cardTemplate.querySelector('.card__like-button');
//         this.deleteButton = this.cardTemplate.querySelector('.card__delete-button');
//         this.titleElement = this.cardTemplate.querySelector('.card__title');
        
//         this.liked = false;
//         this.cardUnlikedImage = this.cardTemplate.querySelector('.card__unliked-image');
//         this.cardLikedImage = this.cardTemplate.querySelector('.card__liked-image');
        
//         this.setTitle(title);
//         this.setCardImage(imageLink);

//         this.cardImage.addEventListener('click',this.onImageClick.bind(this));
//         this.likeButton.addEventListener('click',this.onLikeClick.bind(this));
//         this.deleteButton.addEventListener('click',this.onDeleteClick.bind(this));

//     }

//     setTitle(title) {
//         if(typeof title === 'string') {
//             this.titleText = title;
//             this.titleElement.textContent = this.titleText;
//         } else {
//             console.log(`New card title is not a string. Unable to set.`);
//         }
//     }

//     setCardImage(imageLink, imageTitle = undefined) {
//         !imageTitle ? this.setTitle(imageTitle) : null;
//         this.cardImage.setAttribute('src', imageLink);
//         this.cardImage.setAttribute('alt', this.titleText);
//     }

//     onLikeClick() {
//         this.isLikeActive() ? this.deactivateLikeButton() : this.activateLikeButton();
//     }

//     isLikeActive() {
//         return !this.cardLikedImage.classList.contains('card__liked-image__inactive');
//     }

//     activateLikeButton() {
//         this.cardLikedImage.classList.remove('card__liked-image__inactive');
//         this.cardUnlikedImage.classList.add('card__unliked-image__inactive');
//     }

//     deactivateLikeButton() {
//         this.cardLikedImage.classList.add('card__liked-image__inactive');
//         this.cardUnlikedImage.classList.remove('card__unliked-image__inactive');
//     }

//     onDeleteClick() {
//         this.card.remove();
//     }

//     onImageClick() {
//         previewImage.setAttribute('src',this.cardImage.src);
//         previewImage.setAttribute('alt',this.titleText);
//         previewTitle.textContent = this.titleText;
//         openModal(previewModal);
//     }

//     appendCard() {
//         cardsList.append(this.card);
//         //note to self: bc the document fragment is emptied once it is added to the dom, this.card must be set to reference the newly added card element in the revised dom
//         this.card = cardsList.children[cardsList.children.length - 1];
//     }

//     prependCard() {
//         cardsList.prepend(this.card);
//         this.card = cardsList.children[0];
//     }
// }

// initialCards.forEach(cardData => {
//     const newCard = new CardElement(cardData.name, cardData.link)
//     newCard.appendCard();
// });

