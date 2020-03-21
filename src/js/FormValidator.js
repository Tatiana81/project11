class FormValidator {
    checkInputValidity(element, validity) {
        let error = element.nextElementSibling;
        let button = element.parentNode.querySelector('.popup__button');
        if (validity.valueMissing) {
            this.setErrorStyles(element, button, error, errors["requiredValue"]);
            return;
        }
        if (validity.tooShort) {
            this.setErrorStyles(element, button, error, errors["tooShort"]);
            return;
        }
        if (validity.tooLong) {
            this.setErrorStyles(element, button, error, errors["tooLong"]);
            return;
        }
        if (((element.getAttribute("name") === "link") || (element.getAttribute("name") === "linkAvatar")) && validity.patternMismatch) {
            this.setErrorStyles(element, button, error, errors["linkRequired"]);
            return;
        }
        error.textContent = "";
        element.classList.remove('popup__input_error');
        element.classList.add('popup__input_true');
        error.classList.remove('popup__error_true');
        error.classList.add('popup__error_false');
        button.classList.remove('popup__button_error');
        button.classList.add('popup__button_true');
        formStat[element.getAttribute("name")] = true;
    }
    setSubmitButtonState(elem, sw) {
        if (sw) {
            elem.classList.add('popup__button_checked');
            elem.disabled = false;
        }
    }

    setErrorStyles(element, button, error, text) {
        error.classList.add('popup__error');
        element.classList.remove('popup__input_true');
        element.classList.add('popup__input_error');
        error.textContent = text;
        error.classList.remove('popup__error_false');
        error.classList.add('popup__error_true');
        button.classList.remove('popup__button_checked');
        if (element.name === "about" || element.name === "link") {
            button.classList.remove('popup__button_true');
            button.classList.add('popup__button_error');
        };
        button.setAttribute('disabled', 'true');
        formStat[element.getAttribute("name")] = false;
    }

    setEventListeners(event) {
        this.checkInputValidity(event.target, event.target.validity);
        let button = event.target.parentNode.querySelector('.popup__button');
        // здесь используем данные, сохраненные в переменной formStat
        if (event.target.parentNode.getAttribute("name") === "newAvatar" && formStat["linkAvatar"] === true) {
            this.setSubmitButtonState(button, true);
            return;
        }
        if (event.target.parentNode.getAttribute("name") === "edit" && formStat["name"] === true && formStat["about"] === true) {
            this.setSubmitButtonState(button, true);
            return;
        }
        if (event.target.parentNode.getAttribute("name") === "new" && formStat["place"] === true && formStat["link"] === true) {
            this.setSubmitButtonState(button, true);
            return;
        }
    }
}