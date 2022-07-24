// общие
const container = document.querySelector('.page__container');
const cardsContainer = container.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

// Поля и кнопки блока Profile
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const buttonEdit = container.querySelector('.profile__edit-button');
const buttonAdd = container.querySelector('.profile__add-button');

// popup Profile
const popupProfile = container.querySelector('.popup_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfile.querySelector('.popup__input_type_name');
const popupInputAbout = popupProfile.querySelector('.popup__input_type_about');

// popup Add
const popupAdd = container.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupInputPlace = popupAdd.querySelector('.popup__input_type_place');
const popupInputLink = popupAdd.querySelector('.popup__input_type_link');

// popup View
const popupView = container.querySelector('.popup_view');
const popupViewImage = popupView.querySelector('.popup__view-image');
const popupViewTitle = popupView.querySelector('.popup__view-title');

// popup Общие


// Добавление карточек на страницу при загрузке
// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const createCard = (data) => {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;
  cardElement.querySelector('.element__title').textContent = data.name;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__del-button').addEventListener('click', () => {
    cardElement.remove();
  });

  cardElementImage.addEventListener('click', () => {

    popupViewImage.src = data.link;
    popupViewImage.alt = data.name;
    popupViewTitle.textContent = data.name;
    openPopup(popupView);

  });

  return cardElement;

}


const renderCard = (data) => {

  const cardElement = createCard(data);   // Создаем карточку на основе данных
  cardsContainer.prepend(cardElement);  // Помещаем ее в контейнер карточек

}


initialCards.forEach(renderCard);


// Функция открытия popup
const openPopup = (popup) => {

  cleanPopup(popup);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnPressKey);
  popup.addEventListener('click', (evt) => closePopupOnClickOverlay(evt, popup));

  getCurrentCloseButton(popup);
  popupCloseBtn.addEventListener('click', () => closePopup(popup));

}


// Функция закрытия popup
const closePopup = (popup) => {

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnPressKey);
  popup.removeEventListener('click', (evt) => closePopupOnClickOverlay(evt, popup));

  getCurrentCloseButton(popup);
  popupCloseBtn.removeEventListener('click', () => closePopup(popup));

}


const closePopupOnPressKey = (evt) => {

  if (evt.key === 'Escape') {

    const popupOpen = container.querySelector('.popup_opened');
    closePopup(popupOpen);

  }
}


function closePopupOnClickOverlay(evt, popup) {

  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  };

}


function getCurrentCloseButton(popup) {
  return popupCloseBtn = popup.querySelector('.popup__close-btn');
}


// start
// Событие по кнопке buttonEdit
buttonEdit.addEventListener('click', () => {

  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;

});


// Событие по кнопке buttonAdd
buttonAdd.addEventListener('click', () => {

  openPopup(popupAdd);
  popupAddForm.reset();

});


// submit
// Обработка submit в popupProfile
popupProfileForm.addEventListener('submit', function (evt) {


  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;

  closePopup(popupProfile);
});


// Обработка submit в popupAdd
popupAddForm.addEventListener('submit', function (evt) {


  const data = {name: popupInputPlace.value, link: popupInputLink.value};
  renderCard(data);
  closePopup(popupAdd);

});

const objectSettings  = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};


function cleanPopup(popup) {

  if (popup.querySelector(objectSettings.formSelector) !== null) {

    const form = popup.querySelector(objectSettings.formSelector);
    const inputsList = Array.from(form.querySelectorAll(objectSettings.inputSelector));
    inputsList.forEach(input => {

      searchErrorPlace(input);
      hideInputError(input, errorPlace, objectSettings);

    });
  }
}


enableValidation(objectSettings);
