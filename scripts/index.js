// Контейнеры
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
const popupProfileCloseBtn = popupProfile.querySelector('.popup__close-btn');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfile.querySelector('.popup__input_type_name');
const popupInputAbout = popupProfile.querySelector('.popup__input_type_about');

// popup Add
const popupAdd = container.querySelector('.popup_add');
const popupAddСloseBtn = popupAdd.querySelector('.popup__close-btn');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupInputPlace = popupAdd.querySelector('.popup__input_type_place');
const popupInputLink = popupAdd.querySelector('.popup__input_type_link');

// popup View
const popupView = container.querySelector('.popup_view');
const popupViewСloseBtn = popupView.querySelector('.popup__close-btn');
const popupViewImage = popupView.querySelector('.popup__view-image');
const popupViewTitle = popupView.querySelector('.popup__view-title');


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
  const fileName = data.link.slice(data.link.lastIndexOf('/') + 1);
  const cardElementImage = cardElement.querySelector('.element__image');

  cardElementImage.src = data.link;
  cardElementImage.alt = fileName;
  cardElement.querySelector('.element__title').textContent = data.name;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__del-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  cardElement.querySelector('.element__image').addEventListener('click', () => {
    popupViewImage.src = data.link;
    popupViewImage.alt = fileName;
    popupViewTitle.textContent = data.name;
    openClosePopup(popupView);
  });

  return cardElement;

};

const renderCard = (data) => {

  const cardElement = createCard(data);   // Создаем карточку на основе данных
  cardsContainer.prepend(cardElement);  // Помещаем ее в контейнер карточек

}

initialCards.forEach(renderCard);


// Функция открытия popup
const openPopup = (typePopup) => {
  typePopup.classList.add('popup_opened');
}
// Функция закрытия popup
const closePopup = (typePopup) => {
  typePopup.classList.remove('popup_opened');
}

// Событие по кнопке buttonEdit
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
});

// Событие по кнопке buttonAdd
buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  popupInputPlace.value = '';
  popupInputLink.value ='';
});


// Кнопки закрытия popup
popupProfileCloseBtn.addEventListener('click', () => {
  closePopup(popupProfile);
});
popupAddСloseBtn.addEventListener('click', () => {
  closePopup(popupAdd);
});
popupViewСloseBtn.addEventListener('click', () => {
  closePopup(popupView);
});


// Обработка submit в popupProfile
popupProfileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;

    closePopup(popupProfile);
});


// Обработка submit в popupAdd
popupAddForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const data = {name: popupInputPlace.value, link: popupInputLink.value};
  renderCard(data);
  closePopup(popupAdd);

});




