class Popup {
    open(element) {
        element.classList.add('popup_is-opened');
        if (element.id === 'editProfilePopup') {
            // (исправлено) Надо исправить : Не правильно использовать индексы и обращаться по индексу к элементу
            element.querySelector("#profileName").setAttribute('placeholder', document.querySelector('h1').textContent);
            element.querySelector("#profileAbout").setAttribute('placeholder', document.querySelector('p.user-info__job').textContent);
        }
    }
    close(element) {
        element.parentNode.parentNode.classList.remove('popup_is-opened');
    }
}