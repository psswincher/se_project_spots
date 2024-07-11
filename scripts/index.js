const initialCards = [
    {name: "5-minute Dungeon", link: "https://vigilantebar.com/wp-content/uploads/2022/08/5-Minute-Dungeon-scaled.jpg"},
    {name: "7 Wonders", link: "https://vigilantebar.com/wp-content/uploads/2020/06/pic860217.jpg"},
    {name: "Abduction", link: "https://vigilantebar.com/wp-content/uploads/2023/08/71Z8QTM8qXL._AC_UF8941000_QL80_.jpg"},
    {name: "Agricola", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Agricola.jpg"},
    {name: "Black Fleet", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Black-Fleet.jpg"},
    {name: "Call to Adventure", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Call-to-Adventure-scaled.jpg"}
]

const cardsList = document.querySelector('.cards__list')

let cardsRender = initialCards.map(cardData => getCardElement(cardData));
cardsList.append(...cardsRender);

document.querySelector('.profile__edit-button').addEventListener('click',onEditProfileClick);
document.querySelector('.modal__close-button').addEventListener('click',onCloseProfileModalClick);
document.querySelector('.modal__form').addEventListener('submit',onProfileModalSubmit);
const currentProfileName = document.querySelector('.profile__name');
const currentProfileDescription = document.querySelector('.profile__description');
    
const profileModal = document.querySelector('#edit-profile-modal');
const profileName = profileModal.querySelector('#name');
const profileDescription = profileModal.querySelector('#description');

// const templateCard = document.querySelector('#card');

function onEditProfileClick() {
    profileName.setAttribute('value',currentProfileName.textContent)
    profileDescription.setAttribute('value', currentProfileDescription.textContent);
    profileModal.classList.add('modal_open');
}

function onCloseProfileModalClick() {
    closeProfileModal();
}

function closeProfileModal() {
    profileModal.classList.remove('modal_open');
}

function onProfileModalSubmit(evt) {
    evt.preventDefault();
    currentProfileName.textContent = profileName.value;
    currentProfileDescription.textContent = profileDescription.value;
    closeProfileModal();
}

function getCardElement(cardData) {
    let newCard = document.querySelector('#card').content.cloneNode(true); 
    // let newCard = templateCard.content.cloneNode(true);
    let newCardImage = newCard.querySelector('.card__image'); 
    newCardImage.setAttribute('src',cardData.link);
    newCardImage.setAttribute('alt',cardData.name);
    newCard.querySelector('.card__title').textContent = cardData.name;

    return newCard;
}