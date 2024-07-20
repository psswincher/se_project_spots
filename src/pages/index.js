import { validationSettings, modalSelectors, newPostModalPlaceholders, routeData } from "../utils/constants.js";
import CardElement from "../components/CardElement.js";
import "./index.css";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalPreviewImage from "../components/ModalPreviewImage.js";
import Section from "../components/Section.js";
import FormValidator from "../scripts/validation.js";
import Api from "../components/Api.js";
import UserProfile from "../components/UserProfile.js";
import ModalConfirm from "../components/ModalConfirm.js"

const dbApi = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "0ba3486c-b117-4196-b741-be8eda3e197d",
      "Content-Type": "application/json"
    }
  });
  const userConfirmModal = new ModalConfirm({modalSelector: modalSelectors.confirmModalSelector});

  const cardSection = new Section({ 
    renderer: (card) => {
      const newCard = makeNewCard(card);
      cardSection.addItem(newCard);
  }, containerSelector: '.cards__list'});

  dbApi.request(routeData.getCards)
    .then((data) => {
        return new Promise((resolve) => {
            cardSection.setItems(data);
            resolve();
        }); })
    .then((res) => {
        cardSection.renderItems();
    })
    .catch((err) => {
        console.error(`Failed to create initial cards: ${err}`);
    });

const userProfile = new UserProfile;

dbApi.request(routeData.getUserInfo)
.then((data) => {
    return new Promise((resolve) => {
        userProfile.setProfileData({userName: data.name, profileDescription: data.about, imageUrl: data.avatar});
        editProfileForm.setDefaultInputs(userProfile.getUserProfile());
        resolve();
    });    
})
.catch((err) => {
    console.error(`Failed to get user data: ${err}`);
});

const editAvatarForm = new ModalWithForm({modalSelector: modalSelectors.editAvatarSelector,
    onSubmitCallback: (inputValues) => {
        dbApi.request(routeData.updateUserAvatar, { avatar: inputValues['avatar-link'] })
        .then(() => {
            userProfile.setUserImage(inputValues['avatar-link']);
        })
    }
})

const editAvatarFormValidator = new FormValidator(validationSettings, editAvatarForm.getFormElement());
editAvatarFormValidator.enableValidation();
 
const editProfileForm = new ModalWithForm({ modalSelector: modalSelectors.editProfileModal,
    onSubmitCallback: (inputValues) => {
        dbApi.request(routeData.updateUserProfile, { name: inputValues['profile-name'], about: inputValues['profile-description']})
        .then((data) => {
            return new Promise((resolve) => {
                //note: if the api request doesn't resolve, then we shouldn't update user info.
                //Should we alert the user that it didn't go through?
                userProfile.setUserName(inputValues['profile-name']);
                userProfile.setUserDescription(inputValues['profile-description']);
                //TO DO: this seems to clear after submission, rather than update?
                editProfileForm.setDefaultInputs(userProfile.getUserProfile());
                resolve();
            })
        })
        .catch((err) => {
            console.error(`Failed to edit profile: ${err}`);
        });        
        }
    });

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm.getFormElement());
editProfileFormValidator.enableValidation();

const newPostForm = new ModalWithForm({ modalSelector: '#post-modal', onSubmitCallback: (inputValues) => {
        const newPostTitle = inputValues['post-caption'];
        const newPostImageLink = inputValues['post-image-link'];
         dbApi.request(routeData.createCard, { name: newPostTitle, link: newPostImageLink })
        .then((data) => {
            return new Promise((resolve, reject) => {
                if(data) {
                    const newCard = makeNewCard({name: newPostTitle, imageLink: newPostImageLink })
                    cardSection.addItem(newCard);
                    resolve();
                }   
                reject(err);
            });
        }).catch((err) => {
            console.error(`Failed to create new post: ${err}`);
        });
        
    }
});

newPostForm.setPlaceholderInputs(newPostModalPlaceholders);

const newPostFormValidator = new FormValidator(validationSettings, newPostForm.getFormElement());
newPostFormValidator.enableValidation();

const previewImageModal = new ModalPreviewImage({modalSelector: '#preview-modal'});

setPageListeners();

function setPageListeners() {
    document.querySelector('.profile__edit-button').addEventListener('click',onEditProfileClick);
    document.querySelector('.profile__add-button').addEventListener('click',onNewPostClick);
    document.querySelector('.profile__edit-avatar-button').addEventListener('click',onEditAvatarClick);
}

function onEditAvatarClick() {
    console.log("edit avatar clicked");
    editAvatarForm.open();
}

function onEditProfileClick() {
    editProfileForm.open();
}

function onNewPostClick() { 
    newPostForm.open();
}

function makeNewCard({ name, link, isLiked, _id }) {
    let newCard;
    
    const imageClickManager = () => {
        previewImageModal.populatePreview({ imageUrl: newCard.imageLink, imageAlt: newCard.imageAltText, titleText: newCard.titleText });
        previewImageModal.open();
    }

    const onDeleteAPIManager = (id) => {
        //my goal with these was to decouple the api logic from the logic that edits the cards.
        //these theoretically return true only if the api call is successful
        //once successful, the class takes care of the rest
        return new Promise((resolve, reject) =>{
            userConfirmModal.awaitUserChoice()
            .then(choice => {
                if (choice) {
                    dbApi.requestDelete(id)
                        .then(resolve(true))
                        .catch((err) => {
                            console.error(`Card delete request failed ${err}`);
                            reject();
                        });

                } 
            });
        })
    }

    const onLikeAPIManager = (id, bool) => {
        return new Promise((resolve, reject) => {
                dbApi.requestLikeUpdate(id, bool)
                    .then((res) => {
                        resolve(true);
                    })
                    .catch((err) => {
                        console.error(`Card like request failed ${err}`);
                        reject();
                    });
        });
    }
 
    
    newCard = new CardElement({name: name, link: link, isLiked: isLiked, id: _id, 
        imageClickManager: imageClickManager,
        onDeleteAPIManager: onDeleteAPIManager,
        onLikeAPIManager: onLikeAPIManager,
    });

    return newCard.getView();
}