const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
}


function enableValidation(config) {

  const formsList = Array.from(document.querySelectorAll(config.formSelector));
  formsList.forEach((formElement) => {

    formElement.addEventListener('submit', (evt) => setFormHandler(evt, config) );
    enableFieldHandler(formElement, config);

  });
}


function setFormHandler(evt, config) {
  evt.preventDefault();
  const form = evt.target;
  const button = form.querySelector(config.submitButtonSelector);

  if (form.checkValidity()) {

    button.classList.toggle(config.inactiveButtonClass);

  }
}


function enableFieldHandler(form, config) {

  const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
  inputsList.forEach(input => {

    input.addEventListener('input', (evt) => setInputHendler(evt, form, config));

  });
}


function setInputHendler(evt, form, config){

  const input = evt.target;
  searchErrorPlace(input);
  showFieldError(input, errorPlace, config);
  setSubmitButtonState(form, config);

}


function searchErrorPlace(input) {

  const inputName = input.getAttribute('name');
  return errorPlace = document.getElementById(`${inputName}-error`);

}


function showFieldError(input, errorPlace, config) {

  if (!input.validity.valid ) {

    showInputError(input, errorPlace, config);

  } else {

    hideInputError(input, errorPlace, config);

  };
}


function showInputError(input, errorPlace, config) {

  input.classList.add(config.inputErrorClass);
  errorPlace.textContent = input.validationMessage;
  errorPlace.classList.add(config.errorClass);

}


function hideInputError(input, errorPlace, config) {

  input.classList.remove(config.inputErrorClass);
  errorPlace.textContent = '';
  errorPlace.classList.remove(config.errorClass);

}


function  setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();
  if (isValid) {

    button.classList.remove(config.inactiveButtonClass);

  } else {

    button.classList.add(config.inactiveButtonClass);

  };
}


function cleanPopup(typePopup) {

  if (typePopup.querySelector(obj.formSelector) !== null) {

    const form = typePopup.querySelector(obj.formSelector);
    const inputsList = Array.from(form.querySelectorAll(obj.inputSelector));
    inputsList.forEach(input => {

      searchErrorPlace(input);
      hideInputError(input, errorPlace, obj);

    });
  };
}


enableValidation(obj);
