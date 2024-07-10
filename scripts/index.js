const initialCards = [
    {name: "5-minute Dungeon", link: "https://vigilantebar.com/wp-content/uploads/2022/08/5-Minute-Dungeon-scaled.jpg"},
    {name: "7 Wonders", link: "https://vigilantebar.com/wp-content/uploads/2020/06/pic860217.jpg"},
    {name: "Abduction", link: "https://vigilantebar.com/wp-content/uploads/2023/08/71Z8QTM8qXL._AC_UF8941000_QL80_.jpg"},
    {name: "Agricola", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Agricola.jpg"},
    {name: "Black Fleet", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Black-Fleet.jpg"},
    {name: "Call to Adventure", link: "https://vigilantebar.com/wp-content/uploads/2022/08/Call-to-Adventure-scaled.jpg"}
]

const cardsList = document.querySelector('.cards__list')

for (var i = 0; i <initialCards.length; i++) {
    cardsList.append(getCardElement(initialCards[i]));
}

document.querySelector('.profile__edit-button').addEventListener('click',OnEditProfileClick);
document.querySelector('.modal__close-button').addEventListener('click',OnCloseModalClick);
document.querySelector('.modal__submit-button').addEventListener('click',OnProfileModalSubmit);
const currentProfileName = document.querySelector('.profile__name');
const currentProfileDescription = document.querySelector('.profile__description');
    
const profileModal = document.querySelector('#edit-profile-modal');

function OnEditProfileClick() {
    profileModal.querySelector('#name').setAttribute('value',currentProfileName.textContent);
    profileModal.querySelector('#description').setAttribute('value', currentProfileDescription.textContent);
    profileModal.classList.add('modal__open');
}

function OnCloseModalClick(evt) {
    evt.currentTarget.parentElement.parentElement.classList.remove('modal__open');
}

function OnProfileModalSubmit(evt) {
    evt.preventDefault();
    currentProfileName.textContent = profileModal.querySelector('#name').value;
    currentProfileDescription.textContent = profileModal.querySelector('#description').value;
    profileModal.classList.remove('modal__open');
}

function getCardElement(cardData) {
    newCard = document.querySelector('#card').content.cloneNode(true); 
    newCard.querySelector('.card__image').setAttribute('src',cardData.link);
    newCard.querySelector('.card__image').setAttribute('alt',cardData.name);
    newCard.querySelector('.card__title').textContent = cardData.name;

    return newCard;
}