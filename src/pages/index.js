import { initialCards, validationSettings, modalSelectors, newPostModalPlaceholders, } from "../utils/constants.js";
import CardElement from "../components/CardElement.js";
import "./index.css";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalPreviewImage from "../components/ModalPreviewImage.js";
import Section from "../components/Section.js";
import FormValidator from "../scripts/validation.js";

const currentProfileName = document.querySelector('.profile__name');
const currentProfileDescription = document.querySelector('.profile__description');

const editProfileForm = new ModalWithForm({ modalSelector: '#edit-profile-modal',
    onSubmitCallback: (inputValues) => {
        currentProfileName.textContent = inputValues['profile-name'];
        currentProfileDescription.textContent = inputValues['profile-description'];
    }
 });
editProfileForm.setDefaultInputs(getCurrentProfileInfo());

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm.getFormElement());
editProfileFormValidator.enableValidation();

const newPostForm = new ModalWithForm({ modalSelector: '#post-modal', onSubmitCallback: (inputValues) => {
        const newCard = makeNewCard({title: inputValues['post-title'], imageLink: inputValues['post-image-link'] })
        cardSection.addItem(newCard);
    }
});
newPostForm.setPlaceholderInputs(newPostModalPlaceholders);

const newPostFormValidator = new FormValidator(validationSettings, newPostForm.getFormElement());
newPostFormValidator.enableValidation();

const previewImageModal = new ModalPreviewImage({modalSelector: '#preview-modal'});

const cardSection = new Section({items: initialCards, 
    renderer: (card) => {
      const newCard = makeNewCard(card);
      cardSection.addItem(newCard);
  }, containerSelector: '.cards__list'});

cardSection.renderItems();

setPageListeners();

function setPageListeners() {
    document.querySelector('.profile__edit-button').addEventListener('click',onEditProfileClick);
    document.querySelector('.profile__add-button').addEventListener('click',onNewPostClick);
}

function onEditProfileClick() {
    editProfileForm.open();
}

function onNewPostClick() { 
    newPostForm.open();
}

function makeNewCard({ title, imageLink }) {
    const newCard = new CardElement({title: title, imageLink: imageLink, imageClickManager: () => {
        previewImageModal.populatePreview({ imageUrl: newCard.imageLink, imageAlt: newCard.imageAltText, titleText: newCard.titleText });
        previewImageModal.open();
    }});
    return newCard.getView();
}

function getCurrentProfileInfo() {
    return {"profile-name": currentProfileName.textContent, "profile-description": currentProfileDescription.textContent }
}