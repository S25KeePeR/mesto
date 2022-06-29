let container = document.querySelector('.page__container');
let editButton = container.querySelector('.profile__edit-button');
let popupForm = container.querySelector('.popup');
let closePopup = container.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let nameForm = popupForm.querySelector('.popup__input_type_name');
let aboutForm = popupForm.querySelector('.popup__input_type_about');

function popupFormOpenClose() {


  if (popupForm.classList.contains('popup_opened')) {

    popupForm.classList.remove('popup_opened');

  } else {

    nameForm.value = profileName.textContent;
    aboutForm.value = profileAbout.textContent;

    popupForm.classList.add('popup_opened');

  }
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameForm.value;
    profileAbout.textContent = aboutForm.value;

    popupForm.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupFormOpenClose);
closePopup.addEventListener('click', popupFormOpenClose);
