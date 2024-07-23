import {
  validationSettings,
  modalSelectors,
  newPostModalPlaceholders,
  routeData,
} from "../utils/constants.js";
import CardElement from "../components/CardElement.js";
import "./index.css";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalPreviewImage from "../components/ModalPreviewImage.js";
import Section from "../components/Section.js";
import FormValidator from "../scripts/validation.js";
import Api from "../components/Api.js";
import UserProfile from "../components/UserProfile.js";
import ModalConfirm from "../components/ModalConfirm.js";
import { v4 as uuidv4 } from "uuid";

const dbApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0ba3486c-b117-4196-b741-be8eda3e197d",
    "Content-Type": "application/json",
  },
});

const cardSection = new Section({
  containerSelector: `.cards__list`,
  createItem: (data) => {
    return makeNewCard(data);
  },
  initialize: (route) => {
    dbApi.getBatchData(route).then((data) => {
      cardSection.createItems(data);
      cardSection.renderItems();
    });
  },
});

cardSection.initialize(routeData.getCards);

const userProfile = new UserProfile({
  initialize: () => {
    dbApi
      .request(routeData.getUserInfo)
      .then((data) => {
        userProfile.setProfileData({
          userName: data.name,
          profileDescription: data.about,
          imageUrl: data.avatar,
        });
        editProfileForm.setDefaultInputs(userProfile.getUserProfile());
      })
      .catch((err) => {
        console.error(`Failed to get user data: ${err}`);
      });
  },
});

userProfile.initialize();

const editAvatarForm = new ModalWithForm({
  modalSelector: modalSelectors.editAvatarSelector,
  onSubmitCallback: (inputValues) => {
    return new Promise((resolve, reject) => {
      dbApi
        .request(routeData.updateUserAvatar, {
          avatar: inputValues["avatar-link"],
        })
        .then(() => {
          userProfile.setUserImage(inputValues["avatar-link"]);
          resolve();
        })
        .catch(() => reject());
    });
  },
});

const editAvatarFormValidator = new FormValidator(
  validationSettings,
  editAvatarForm.getFormElement()
);
editAvatarFormValidator.enableValidation();

const editProfileForm = new ModalWithForm({
  modalSelector: modalSelectors.editProfileModal,
  onSubmitCallback: (inputValues) => {
    return new Promise((resolve, reject) => {
      dbApi
        .request(routeData.updateUserProfile, {
          name: inputValues["profile-name"],
          about: inputValues["profile-description"],
        })
        .then(() => {
          userProfile.setUserName(inputValues["profile-name"]);
          userProfile.setUserDescription(inputValues["profile-description"]);
          editProfileForm.setDefaultInputs(userProfile.getUserProfile());
          resolve();
        })
        .catch((err) => {
          console.error(`Failed to edit profile: ${err}`);
          reject();
        });
    });
  },
});

const editProfileFormValidator = new FormValidator(
  validationSettings,
  editProfileForm.getFormElement()
);
editProfileFormValidator.enableValidation();

const newPostForm = new ModalWithForm({
  modalSelector: "#post-modal",
  onSubmitCallback: (inputValues) => {
    return new Promise((resolve, reject) => {
      const newPostTitle = inputValues["post-caption"];
      const newPostImageLink = inputValues["post-image-link"];
      dbApi
        .request(routeData.createCard, {
          name: newPostTitle,
          link: newPostImageLink,
        })
        .then((data) => {
          cardSection.createAndRenderItem(data);
          resolve();
        })
        .catch((err) => {
          console.error(`Failed to create new post: ${err}`);
          reject();
        });
    });
  },
});

newPostForm.setPlaceholderInputs(newPostModalPlaceholders);

const newPostFormValidator = new FormValidator(
  validationSettings,
  newPostForm.getFormElement()
);
newPostFormValidator.enableValidation();

const previewImageModal = new ModalPreviewImage({
  modalSelector: "#preview-modal",
});

setPageListeners();

function setPageListeners() {
  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", onEditProfileClick);
  document
    .querySelector(".profile__add-button")
    .addEventListener("click", onNewPostClick);
  document
    .querySelector(".profile__edit-avatar-button")
    .addEventListener("click", onEditAvatarClick);
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
const userConfirmDeleteModal = new ModalConfirm({
  modalSelector: modalSelectors.confirmModalSelector,
  confirmText: "Delete",
  awaitingConfirmText: "Deleting...",
});

function makeNewCard({ name, link, isLiked, _id }) {
  let newCard;

  const imageClickManager = () => {
    previewImageModal.populatePreview({
      imageUrl: newCard.imageLink,
      imageAlt: newCard.imageAltText,
      titleText: newCard.titleText,
    });
    previewImageModal.open();
  };

  const onDeleteAPIManager = (deleteConfirmationManager, id) => {
    //my goal with these was to decouple the api logic from the logic that edits the cards.
    //these theoretically return true only if the api call is successful
    //once successful, the class takes care of the rest
    return new Promise((resolve, reject) => {
      deleteConfirmationManager.awaitUserChoice().then((choice) => {
        if (choice) {
          dbApi
            .requestDelete(id)
            .then(() => {
              deleteConfirmationManager.setToConfirm();
              deleteConfirmationManager.close();
              resolve(true);
            })
            .catch((err) => {
              deleteConfirmationManager.setToConfirm();
              console.error(`Card delete request failed ${err}`);
              reject();
            });
        }
      });
    });
  };

  const onLikeAPIManager = (id, bool) => {
    return new Promise((resolve, reject) => {
      dbApi
        .requestLikeUpdate(id, bool)
        .then((res) => {
          resolve(true);
        })
        .catch((err) => {
          console.error(`Card like request failed ${err}`);
          reject();
        });
    });
  };

  newCard = new CardElement({
    name: name,
    link: link,
    isLiked: isLiked,
    id: _id,
    deleteConfirmationManager: userConfirmDeleteModal,
    imageClickManager: imageClickManager,
    onDeleteAPIManager: onDeleteAPIManager,
    onLikeAPIManager: onLikeAPIManager,
  });

  return newCard.getView();
}
