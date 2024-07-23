export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._setFormInputElements();
    this._setFormButtons();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._disableButton();
    this._clearFormInputElements();
  }

  _showInputError = (inputElement) => {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  };

  _checkFieldValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _getErrorElement(inputElement) {
    return document.querySelector(`#${inputElement.id}-input-error`);
  }

  _checkInvalidInput() {
    return this._formInputElements.every((inputElement) => {
      if (inputElement.value.length === 0) {
        return false;
      }
      return inputElement.validity.valid;
    });
  }

  _setFormInputElements() {
    this._formInputElements = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector),
    );
  }

  _clearFormInputElements() {
    this._formInputElements.forEach((inputElement) => {
      inputElement.value = "";
    });
  }

  _setFormButtons() {
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector,
    );
  }

  _toggleSubmitButton() {
    this._checkInvalidInput() ? this._enableButton() : this._disableButton();
  }

  _disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _setEventListeners() {
    this._toggleSubmitButton();

    this._formInputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkFieldValidity(inputElement);
        this._toggleSubmitButton();
      });
    });
  }
}

// export default function enableValidation(settings) {
//   const formsArray = Array.from(document.querySelectorAll(settings.formSelector));
//   const inputFields = getInputFieldsFromForms(formsArray);
//   setAllFieldValidationListeners(inputFields);
// };

// function onFieldInput(event) {
//   validationDebug(event, arguments.callee.name);
//   const inputValidity = checkInputValidity(event);
//   const inputField = event.target;
//   const submitButton = getSubmitButtonFromInputField(inputField);
//   const inputForm = inputField.closest('form');
//   checkFieldInputErrors(inputField, inputValidity);
//   submitButtonStateHandler(submitButton, checkFormInputFieldValidity(inputForm));
// }

// function resetModalForm(modal) {
//   const inputFields = getFormInputFieldsArray(modal.querySelector(settings.formSelector));
//   inputFields.forEach(inputField => resetInputField(inputField));
//   disableSubmitButton(modal.querySelector(settings.submitButtonSelector));
// }

// function resetInputField(inputField) {
//   inputField.textContent = "";
//   deactivateValidationError(inputField);
// }

// function checkFormFieldInputErrors(form) {
//   getFormInputFieldsArray(form).forEach(field => checkFieldInputErrors(field));
// }

// function checkFieldInputErrors(inputField, inputValidity) {
//   inputValidity ? deactivateValidationError(inputField) : activateValidationError(inputField);
// }

// function submitButtonStateHandler(submitButton, stateBool) {
//   stateBool ? enableSubmitButton(submitButton) : disableSubmitButton(submitButton);
// }

// function updateSubmitButtonFromFormValidity(form) {
//   // validationDebug(form, arguments.callee.name);
//   console.log(checkFormInputFieldValidity(form));
//   submitButtonStateHandler(getSubmitButtonFromForm(form), checkFormInputFieldValidity(form));
// }

// function checkFormInputFieldValidity(form) {
//   const inputFieldArray = getFormInputFieldsArray(form);
//   // validationDebug(checkInputFieldValidity(inputFieldArray) && checkInputFieldsFilled(inputFieldArray), arguments.callee.name);
//   if(!checkInputFieldsFilled) {
//     return false;
//   }
//   return checkInputFieldValidity(inputFieldArray);
// }

// function checkInputFieldValidity(inputFieldArray) {
//   return inputFieldArray.every((inputField) => {
//     return inputField.validity.valid;
//   });
// }

// function checkInputFieldsFilled(inputFieldArray) {
//   return inputFieldArray.every((inputField) => {
//     console.log(inputField.value);
//     return !!inputField.value;
//   });
// }

// function getSubmitButtonFromForm(form) {
//   return form[settings.submitButtonName];
// }

// function getSubmitButtonFromInputField(inputField) {
//   validationDebug(inputField.closest(settings.formSelector).id, arguments.callee.name);
//   return document.querySelector(`.${inputField.closest(settings.formSelector).id}-submit-button`);
// }

// function enableSubmitButton(submitButton) {
//   console.log(submitButton);
//   submitButton.classList.remove(settings.inactiveButtonClass);
//   submitButton.disabled = false;
// }

// function disableSubmitButton(submitButton) {
//   submitButton.classList.add(settings.inactiveButtonClass);
//   submitButton.disabled = true;
// }

// function checkInputValidity(event) {
//   validationDebug(`${event.target.validity.valid}`, arguments.callee.name);
//   return event.target.validity.valid;
// }

// function activateValidationError(inputField) {
//   const errorElement = getValidationErrorElement(inputField);
//   const errorValidationMessage = getValidationErrorMessage(inputField);

//   activateErrorFieldStyle(inputField);
//   setErrorElementMessage(errorElement, errorValidationMessage);
//   showErrorElementMessage(errorElement);
// }

// function deactivateValidationError(inputField) {
//   //validationDebug(`${event}`, arguments.callee.name);
//   const errorElement = getValidationErrorElement(inputField);

//   deactivateErrorFieldStyle(inputField);
//   setErrorElementMessage(errorElement, "");
//   hideErrorElementMessage(errorElement);
// }

// function activateErrorFieldStyle(inputField) {
//   inputField.classList.add(settings.inputErrorStyle);
// }

// function deactivateErrorFieldStyle(inputField) {
//   inputField.classList.remove(settings.inputErrorStyle);
// }

// function showErrorElementMessage(errorElement) {
//   errorElement.classList.add(settings.errorClass);
// }

// function hideErrorElementMessage(errorElement) {
//   errorElement.classList.remove(settings.errorClass);
// }

// function setErrorElementMessage(errorElement, message) {
//   return errorElement && message ? errorElement.textContent = message : false;
// }

// function getValidationErrorElement(inputField) {
//   return document.querySelector(`.${inputField.id}-input-error`);
// }

// function getValidationErrorMessage(inputField) {
//   //validationDebug(`getValidationError: ${event.target.validationMessage}`, arguments.callee.name);
//   return inputField.validationMessage ? inputField.validationMessage : "Unknown validation error";
// }

// function setAllFieldValidationListeners(inputFields) {
//   inputFields.forEach(field => setFieldValidationListeners(field));
// }

// function setFieldValidationListeners(inputField) {
//     inputField.addEventListener('input',onFieldInput);
//     inputField.addEventListener('paste',onFieldInput);
// }

// function getInputFieldsFromForms(formsArray) {
//   let inputFieldsArray = [];
//   formsArray.forEach((form) => getFormInputFieldsArray(form)
//     .forEach(inputField => inputFieldsArray.push(inputField)));
//   return inputFieldsArray;
// }

// function getFormInputFieldsArray(formElement) {
//   return Array.from(formElement.querySelectorAll(settings.inputSelector));
// }

// function validationDebug(logMessage, calledFunc = "unlabeled function") {
//   if(settings.debugging) {
//     if (typeof logMessage === 'object' || Array.isArray(logMessage)) {
//       console.log(`===debug log: ${calledFunc}===`);
//       console.log(logMessage);
//     } else {
//       console.log(`debug log: ${calledFunc} :: ${logMessage}`);
//   }
// }
// }

/*
https://tripleten.com/trainer/web/lesson/7877faef-a054-46d4-bcd5-a460137621ef/task/e127fc8c-3695-4975-aee6-94051d0febe9/

And at last, we are ready to let you in on a little secret. Form fields have another validation attribute called pattern. This attribute allows you to put/ a regular expression directly into a form field.
<input type="text" pattern="^[a-zA-Z]+$">

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.classList.remove("button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Feedback Form</title>
  <link rel="stylesheet" href="https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_normalize.css">
  <link rel="stylesheet" href="https://practicum-content.s3.us-west-1.amazonaws.com/web-code/form-validation/lesson-6/moved_index.css">
</head>

<body class="page">
<div class="page__content">
  <main class="page__section content">
    <h1 class="content__title">
      Feedback Form
    </h1>
    <p class="content__subtitle">
      Fill in the required fields
    </p>
    <form class="form" novalidate>
      <fieldset class="form__set">
        <label class="form__field">
          <input type="email" class="form__input" id="email-input" required minlength="7">
          <span class="form__placeholder email-input-placeholder">
            Email:
          </span>
          <span class="form__input-error email-input-error"></span>
        </label>
        <label class="form__field">
          <input type="password" class="form__input" id="password-input" required minlength="7">
          <span class="form__placeholder password-input-placeholder">
            Password:
          </span>
          <span class="form__input-error password-input-error"></span>
        </label>
        <label class="form__field form__field_type_row">
          <input class="form__checkbox form__input" id="checkbox-input" type="checkbox" checked required>
          <span class="form__checkbox-item"></span>
          <span class="form__text">Consent to the processing of personal data</span>
          <span class="form__input-error checkbox-input-error"></span>
          <span class="form__placeholder checkbox-input-placeholder"></span>
        </label>
        <button type="button" class="form__submit form__button button">
          Next
        </button>
      </fieldset>
      <fieldset class="form__set">
        <button class="text-button form__previous">&larr; Back</button>
        <label class="form__field">
          <input type="text" class="form__input" id="name-input" required minlength="2">
          <span class="form__placeholder name-input-placeholder">
            What is your name??
          </span>
          <span class="form__input-error name-input-error"></span>
        </label>
        <label class="form__field">
          <input type="text" class="form__input" id="happiness-input" required minlength="4">
          <span class="form__placeholder happiness-input-placeholder">
            How are you feeling??
          </span>
          <span class="form__input-error happiness-input-error"></span>
        </label>
        <label class="form__field">
          <input type="text" class="form__input" id="javascript-rating-input" required minlength="5">
          <span class="form__placeholder javascript-rating-input-placeholder">
            Is JavaScript that hard??
          </span>
          <span class="form__input-error javascript-rating-input-error"></span>
        </label>
        <label class="form__field">
          <input type="text" class="form__input" id="suggestion-input" required minlength="5">
          <span class="form__placeholder suggestion-input-placeholder">
            How many interesting questions can one make up??
          </span>
          <span class="form__input-error suggestion-input-error"></span>
        </label>
        <button type="button" class="form__submit form__button button">
          Next
        </button>
      </fieldset>
      <fieldset class="form__set">
        <button class="text-button form__previous">&larr; Back</button>
        <p class="form__paragraph">
          Successfully submitted!
        </p>
        <button type="submit" class="form__submit button">
          That's all, folks!
        </button>
      </fieldset>
    </form>
  </main>
</div>
<script src="https://practicum-content.s3.us-west-1.amazonaws.com/web-code/form-validation/lesson-6/moved_index.js"></script>
<script src="script.js"></script>
</body>
</html>


*/
