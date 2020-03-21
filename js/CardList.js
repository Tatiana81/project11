class CardList {
    constructor(element) {
        this.element = element;
        // Надо исправить : Нельзя вызывать или создавать реализацию в конструторе класса
        // Вызывая реализацию в конструторе класса, при наследовании, вы не сможите вызвать другой метод не вызвав реализацию в конструкторе
        // Если Вам необходимо будет вызвать конструктор родителя при наследовании в одном из классов
        // так же, вы заведомо делаете класс не тестируемым, так как всегда при инициализации будет вызываться конструктор класса

    }

    addCard(card) {
        // (исправлено) Надо исправить: вы обращаетесь в классе к переменной placesListElement объявленной глобально.
        // передайте переменную в качестве параметров в класс 
        this.element.insertAdjacentHTML('beforeend', card.create(card));
        this.render(card);
    }

    render(card) {
        // (исправлено) Надо исправить: вы обращаетесь в классе к переменной placesListElement объявленной глобально.
        // передайте переменную в качестве параметров в класс 
        this.element.addEventListener("click", function(event) {
            if (event.target.classList.contains('place-card__like-icon')) card.like(event)
            else if (event.target.classList.contains('place-card__delete-icon')) card.remove(event)
            else card.showBigImage(event);
        });
    }
}