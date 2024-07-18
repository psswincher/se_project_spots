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
  }

  export const initialCards = [
    {title: "5-minute Dungeon", imageLink: "https://vigilantebar.com/wp-content/uploads/2022/08/5-Minute-Dungeon-scaled.jpg"},
    {title: "7 Wonders", imageLink: "https://vigilantebar.com/wp-content/uploads/2020/06/pic860217.jpg"},
    {title: "Abduction", imageLink: "https://vigilantebar.com/wp-content/uploads/2023/08/71Z8QTM8qXL._AC_UF8941000_QL80_.jpg"},
    {title: "Agricola", imageLink: "https://vigilantebar.com/wp-content/uploads/2022/08/Agricola.jpg"},
    {title: "Black Fleet", imageLink: "https://vigilantebar.com/wp-content/uploads/2022/08/Black-Fleet.jpg"},
    {title: "Call to Adventure", imageLink: "https://vigilantebar.com/wp-content/uploads/2022/08/Call-to-Adventure-scaled.jpg"}
]

export const cardSelectors = {
  template: '#card',
  image: '.card__image', 
  likeButton: '.card__like-button',
  deleteButton: '.card__delete-button',
  cardTitle: '.card__title',
  unlikedImage: '.card__unliked-image',
  likedImage: '.card__liked-image',
}

export const cardSettings = {
  defaultTitle: "unnamed card",
  defaultImageAlt: "an image"
}

export const modalSelectors = {
  newPostModal: "#post-modal",
  editProfileModal: "#edit-profile-modal",
  openModalClass: "modal_open",
  modalElementClass: "modal",
  modalCloseButton: ".modal__close-button",
  previewModalImage: ".modal__preview-image",
  previewModalTitle: "#preview-title",

}

export const newPostModalPlaceholders = {
  "post-image-link": 'Paste a link to the picture',
  "post-caption": 'Type your caption'
}