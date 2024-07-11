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

const cardsRender = initialCards.map(cardData => getCardElement(cardData));
cardsList.append(...cardsRender);
//#endregion

//#region profile modal declarations
const profileModal = document.querySelector('#edit-profile-modal');
const profileName = profileModal.querySelector('#profile-name');
const profileDescription = profileModal.querySelector('#profile-description');
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
document.querySelector('.profile__add-button').addEventListener('click',onNewPostClick);
document.querySelector('#new-post-modal__close').addEventListener('click',onCloseModalClick);
document.forms['new-post-modal__form'].addEventListener('submit',onPostModalSubmit);
//#endregion

//#region preview modal declarations
const previewModal = document.querySelector('#preview-modal');
const previewImage = document.querySelector('.modal__preview-image');
const previewTitle = document.querySelector('#preview-title');
document.querySelector('#preview-modal__close').addEventListener('click',onCloseModalClick);
//#endregion

//#region modal handlers
function onCloseModalClick(evt) {
    let modal = evt.target.closest('.modal');
    closeModal(modal);
}

function openModal(modal) {
    modal.classList.add('modal_open');
}

function closeModal(modal) {
    modal.classList.remove('modal_open');
}
//#endregion

//#region edit profile functions
function onEditProfileClick() {
    profileName.setAttribute('value',currentProfileName.textContent)
    profileDescription.setAttribute('value', currentProfileDescription.textContent);
    openModal(profileModal); 
}

function onProfileModalSubmit(evt) {
    evt.preventDefault();
    currentProfileName.textContent = profileName.value;
    currentProfileDescription.textContent = profileDescription.value;
    closeModal(evt.target.closest('.modal'));
}
//#endregion

//#region new post functions
function onNewPostClick() {
    postLink.setAttribute('placeholder',defaultLinkField);
    postCaption.setAttribute('placeholder',defaultCaptionField);
    openModal(postModal);
}

function onPostModalSubmit(evt) {
    evt.preventDefault();
    //TO DO: error handling in event card link is not a link?
    let newCardRender = getCardElement({name: postCaption.value, link: postLink.value});
    cardsList.prepend(newCardRender);
    postCaption.value = "";
    postLink.value = "";    
    closeModal(evt.target.closest('.modal'));
}
//#endregion


//#region card functions
function getCardElement(cardData) {
    let newCard = document.querySelector('#card').content.cloneNode(true); 
    let newCardImage = newCard.querySelector('.card__image'); 
    let newCardLikeButton = newCard.querySelector('.card__like-button');
    let newCardDeleteButton = newCard.querySelector('.card__delete-button');
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

//#endregion