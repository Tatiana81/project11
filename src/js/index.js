const placesListElement = document.querySelector('.places-list');
const inputElements = document.querySelectorAll('.popup__input');
const avatarImage = document.querySelector('.user-info__photo');
const bigImage = document.querySelector('#imagePopup');
const addCardElement = document.querySelector('#newPlacePopup');
const editElement = document.querySelector('#editProfilePopup');
const avatarEditElement = document.querySelector('#avatarPopup');
const buttonAdd = document.querySelector('.user-info__button');
const buttonEdit = document.querySelector('.user-info__button_edit');
const avatarEdit = document.querySelector('.user-info__photo');
const closeButtons = document.querySelectorAll('.popup__close');
const newCardForm = document.forms.new;
const editProfileForm = document.forms.edit;
const avatarEditForm = document.forms.newAvatar;
let cardsInstances = [];
let initialCards = [];
const inputVals = new FormValidator();
const popupWindow = new Popup();
const cardList = new CardList(placesListElement);
/* 
 * (исправлено) Надо исправить: Код разбит на разные файлы, но в отдельных файлах
 * глобальные переменные должны быть скрыты (обернуты в IIFE или просто функцию)
 * Объявлять новые переменные или инициализировать классы лучше в одном из файлов
 * как пример, создайте для этого index.js или script.js
 */
const errors = {
    "tooShort": "Должно быть от 2 до 30 символов",
    "tooLong": "Должно быть от 2 до 30 символов",
    "requiredValue": "Это обязательное поле",
    "linkRequired": "Здесь должна быть ссылка"
};
const formStat = { // дополнительная переменная для контроля состояния полей ввода и управления кнопками форм
    "name": false,
    "place": false,
    "link": false,
    "about": false,
    "linkAvatar": false
};

/* 
 * (исправлено) Надо исправить: Код разбит на разные файлы, но в отдельных файлах
 * глобальные переменные должны быть скрыты (обернуты в IIFE или просто функцию)
 * Объявлять новые переменные или инициализировать классы лучше в одном из файлов
 * как пример, перенесите в  script.js
 */
const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
        authorization: 'bc0f77dc-1dcd-480d-adad-4b989ce5b233',
        'Content-Type': 'application/json'
    }
});
const userInfo = new UserInfo(api);

async function setNameInfo() {
    let resultUserInfo = await api.userInfoSet();
    document.querySelector('.user-info__name').textContent = resultUserInfo.name;
    document.querySelector('.user-info__job').textContent = resultUserInfo.about;
    document.querySelector('.user-info__photo').style.backgroundImage = resultUserInfo.avatar;
}

setNameInfo();

async function initCards() {
    let res = await api.getInitialCards();
    for (let card of res) {
        let newCard = new Card(api, card['name'], card['link'], card['likes'].length,
            card['_id'], card['owner'], placesListElement, bigImage);
        cardList.addCard(newCard);
    }
}

initCards();

newCardForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    event.target.querySelector('button').textContent = "Загрузка...";
    let result = await api.newCardAdd(event);
    let card = new Card(api, newCardForm.elements.place.value, newCardForm.elements.link.value, [],
        result['_id'], "ba2db38605eee42e2ef8a612", placesListElement, bigImage);
    cardList.addCard(card);
    event.target.querySelector('button').textContent = "+";
    popupWindow.close(event.target);
});

inputElements.forEach(function(item) {
    item.addEventListener('input', function(event) {
        inputVals.setEventListeners(event);
    });
});

buttonAdd.addEventListener('click', function() {
    popupWindow.open(addCardElement);
});

avatarEdit.addEventListener('click', function() {
    popupWindow.open(avatarEditElement);
});

buttonEdit.addEventListener('click', function() {
    popupWindow.open(editElement);
});
closeButtons.forEach(function(item) {
    item.addEventListener('click', function() {
        popupWindow.close(item);
    });
});

editProfileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    userInfo.setUserInfo(editProfileForm.elements.name, editProfileForm.elements.about);
    userInfo.updateUserInfo(event);
    event.target.querySelector('button').textContent = "Сохранить";
    popupWindow.close(event.target);
});

avatarEditForm.addEventListener('submit', function(event) {
    event.preventDefault();
    avatarImage.style.backgroundImage = `url("${avatarEditForm.elements.linkAvatar.value}")`;
    popupWindow.close(event.target);
});



// Надо исправить: инициализируя и объявляя класс внутри другого класса вы создаёте жесткую связь между классами
// Если проект будет достаточно большим и сложным, то замена одного класса  прописанного внутри другого класса может быть очень болезненной,
//});