import {
  validationSettings,
  modalSelectors,
  newPostModalPlaceholders,
  routeData,
  cardSelectors,
  userProfileSettings,
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

const dbApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0ba3486c-b117-4196-b741-be8eda3e197d",
    "Content-Type": "application/json",
  },
});

const formValidators = {};
enableValidation(validationSettings);

const userConfirmDeleteModal = new ModalConfirm({
  modalSelector: modalSelectors.confirmModalSelector,
  confirmText: "Delete",
  awaitingConfirmText: "Deleting...",
});

const cardSection = new Section({
  containerSelector: `.cards__list`,
  createItem: (data) => {
    return makeNewCard(data);
  },
  initialize: (route) => {
    dbApi
      .getBatchData(route)
      .then((data) => {
        cardSection.createItems(data);
        cardSection.renderItems();
      })
      .catch((err) => console.error(`Error initializing card section: ${err}`));
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
    function makeRequest() {
      return dbApi
        .request(routeData.updateUserAvatar, {
          avatar: inputValues[userProfileSettings.profileInputAvatarLink],
        })
        .then(() => {
          userProfile.setUserImage(
            inputValues[userProfileSettings.profileInputAvatarLink]
          );
        });
    }
    handleSubmit(makeRequest, editAvatarForm);
  },
});

const editProfileForm = new ModalWithForm({
  modalSelector: modalSelectors.editProfileModal,
  onSubmitCallback: (inputValues) => {
    function makeRequest() {
      return dbApi
        .request(routeData.updateUserProfile, {
          name: inputValues[userProfileSettings.profileInputName],
          about: inputValues[userProfileSettings.profileInputDesc],
        })
        .then(() => {
          userProfile.setUserName(
            inputValues[userProfileSettings.profileInputName]
          );
          userProfile.setUserDescription(
            inputValues[userProfileSettings.profileInputDesc]
          );
          editProfileForm.setDefaultInputs(userProfile.getUserProfile());
        });
    }

    handleSubmit(makeRequest, editProfileForm);
  },
});

const newPostForm = new ModalWithForm({
  modalSelector: modalSelectors.newPostModal,
  onSubmitCallback: (inputValues) => {
    function makeRequest() {
      return dbApi
        .request(routeData.createCard, {
          name: inputValues[cardSelectors.cardInputCaption],
          link: inputValues[cardSelectors.cardInputLink],
        })
        .then((res) => {
          formValidators[newPostForm.formName].resetValidation();
          cardSection.createAndRenderItem(res);
        });
    }

    handleSubmit(makeRequest, newPostForm);
  },
});

newPostForm.setPlaceholderInputs(newPostModalPlaceholders);

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
  editProfileForm.setDefaultInputs(userProfile.getUserProfile());
  editProfileForm.open();
}

function onNewPostClick() {
  newPostForm.open();
}

const previewImageModal = new ModalPreviewImage({
  modalSelector: "#preview-modal",
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
    function makeRequest() {
      return deleteConfirmationManager.awaitUserChoice().then((choice) => {
        if (choice) {
          dbApi.requestDelete(id).then(() => {
            deleteConfirmationManager.close();
            newCard.remove();
          });
        }
      });
    }

    handleSubmit(makeRequest, deleteConfirmationManager);
  };

  const onLikeAPIManager = (id, bool) => {
    return new Promise((resolve) => {
      dbApi.requestLikeUpdate(id, bool).then(() => {
        resolve(true);
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

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function handleSubmit(request, modalInstance) {
  modalInstance.renderLoading(true);
  request()
    .then(() => modalInstance.close())
    .catch(console.error)
    .finally(() => modalInstance.renderLoading(false));
}
