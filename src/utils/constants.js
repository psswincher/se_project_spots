export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorStyle: "modal__input_type_error",
  submitButtonSelector: ".modal__submit-button",
  submitButtonName: "modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: "modal__error_visible",
  debugging: true,
};

export const cardSelectors = {
  template: "#card",
  image: ".card__image",
  likeButton: ".card__like-button",
  deleteButton: ".card__delete-button",
  cardTitle: ".card__title",
  unlikedImage: ".card__unliked-image",
  likedImage: ".card__liked-image",
};

export const cardSettings = {
  defaultTitle: "unnamed card",
  defaultImageAlt: "an image",
};

export const modalSelectors = {
  newPostModal: "#post-modal",
  editProfileModal: "#edit-profile-modal",
  openModalClass: "modal_open",
  modalElementClass: "modal",
  modalCloseButton: ".modal__close-button",
  previewModalImage: ".modal__preview-image",
  previewModalTitle: "#preview-title",
  confirmModalSelector: "#confirm-modal",
  modalConfirmButtonSelector: ".modal__button-confirm",
  modalCancelButtonSelector: ".modal__button-cancel",
  editAvatarSelector: "#edit-avatar-modal",
};

export const newPostModalPlaceholders = {
  "post-image-link": "Paste a link to the picture",
  "post-caption": "Type your caption",
};

export const userProfileSettings = {
  defaultUsername: "Please input name",
  defaultDescription: "Please input description",
  defaultProfileImage:
    "https://www.imdb.com/name/nm1120169/mediaviewer/rm782485249/?ref_=nm_ov_ph",
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
  profileAvatarSelector: ".profile__avatar",
};

export const routeData = {
  getUserInfo: { method: "GET", route: "/users/me" },
  updateUserProfile: { method: "PATCH", route: "/users/me" },
  updateUserAvatar: { method: "PATCH", route: "/users/me/avatar" },
  getCards: { method: "GET", route: "/cards" },
  createCard: { method: "POST", route: "/cards" },
  deleteCardById: { method: "DELETE", route: "/cards/" },
  likeCardUpdateRoute: { method: "PUT", route: "/cards/:cardId/likes" },
  dislikeCardUpdateRoute: { method: "DELETE", route: "/cards/:cardId/likes" },

  likeCardReplaceKey: ":cardId",
};
