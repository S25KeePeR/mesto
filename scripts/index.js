// Контейнеры
const container = document.querySelector('.page__container');
const cardsContainer = container.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

// Поля и кнопки блока Profile
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const editButton = container.querySelector('.profile__edit-button');
const addButton = container.querySelector('.profile__add-button');

// popup Profile
const popupProfile = container.querySelector('.popup_profile');
const popupProfileCloseBtn = popupProfile.querySelector('.popup__close-btn');
const popupInputName = popupProfile.querySelector('.popup__input_type_name');
const popupInputAbout = popupProfile.querySelector('.popup__input_type_about');

// popup Add
const popupAdd = container.querySelector('.popup_add');
const popupAddСloseBtn = popupAdd.querySelector('.popup__close-btn');
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

  cardElement.querySelector('.element__image').src = data.link;
  cardElement.querySelector('.element__image').alt = fileName;
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
    popupOpenClose(popupView);
  });

  return cardElement;

};

const renderCard = (data) => {

  const cardElement = createCard(data);   // Создаем карточку на основе данных
  cardsContainer.prepend(cardElement);  // Помещаем ее в контейнер карточек

}

initialCards.forEach(renderCard);


// Функция открытия и закрытия popup
const popupOpenClose = function (typePopup) {
  typePopup.classList.toggle('popup_opened');
  typePopup.classList.toggle('popup_closed');
}

// Событие по кнопке editButton
editButton.addEventListener('click', () => {
  popupOpenClose(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
});

// Событие по кнопке addButton
addButton.addEventListener('click', () => {
  popupOpenClose(popupAdd);
  popupInputPlace.value = '';
  popupInputLink.value ='';
});


// Кнопки закрытия popup
popupProfileCloseBtn.addEventListener('click', () => {
  popupOpenClose(popupProfile);
});
popupAddСloseBtn.addEventListener('click', () => {
  popupOpenClose(popupAdd);
});
popupViewСloseBtn.addEventListener('click', () => {
  popupOpenClose(popupView);
});


// Обработка submit в popupProfile
popupProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();

    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;

    popupOpenClose(popupProfile);
});


// Обработка submit в popupAdd
popupAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();

  if ( popupInputPlace.value == '' ) {

    alert ( `Пожалуйста заполните поле '${popupInputPlace.placeholder}'` );

  } else if (popupInputLink.value == '') {

    alert ( `Пожалуйста заполните поле '${popupInputLink.placeholder}'` );

  } else {
    if (popupInputLink.value.startsWith('http://') || popupInputLink.value.startsWith('https://')) {

      const data = {name: popupInputPlace.value, link: popupInputLink.value};
      renderCard(data);
      popupOpenClose(popupAdd);

    } else {
      alert ( `В поле '${popupInputLink.placeholder}' введена не ссылка` );
    }
  };


});




