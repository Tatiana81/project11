class Card {
    constructor(api, name, link, likes, id, owner, element, bigImage) {
        this.api = api;
        this.name = name;
        this.link = link;
        this.likeNumber = likes;
        this.id = id;
        this.owner = owner;
        this.element = element;
        this.bigImage = bigImage;
    }

    async like(event) {
        event.stopImmediatePropagation();
        let likeIcon = event.target.closest('.place-card__like-icon');
        if (likeIcon.classList.contains('place-card__like-icon_liked')) {
            // (исправлено) Надо исправить: вы обращаетесь в классе к переменной  api объявленной глобально. Передайте переменную в качестве параметров в класс 
            let result = await this.api.deleteLike(event);
            event.target.parentNode.querySelector('p').textContent = result['likes'].length
            likeIcon.classList.remove('place-card__like-icon_liked');
        } else {
            // (исправлено) Надо исправить: вы обращаетесь в классе к переменной  api объявленной глобально.
            // передайте переменную в качестве параметров в класс 
            let result = await this.api.addLike(event);
            event.target.parentNode.querySelector('p').textContent = result['likes'].length
            likeIcon.classList.add('place-card__like-icon_liked');
        }
    }
    remove(event) {
        event.stopImmediatePropagation();
        if (confirm("Вы действительно хотите удалить эту карточку?")) {
            // (исправлено) Надо исправить: вы обращаетесь в классе к переменной placesListElement объявленной глобально.
            // передайте переменную в качестве параметров в класс 
            this.element.removeChild(event.target.parentNode.parentNode);
            // (исправлено) Надо исправить: вы обращаетесь в классе к переменной  api объявленной глобально.
            // передайте переменную в качестве параметров в класс 
            this.api.removeCard(event);
        }
    }

    showBigImage(event) {
        event.stopPropagation();
        // (исправлено) Надо исправить: вы обращаетесь в классе к переменной bigImage объявленной глобально.
        // передайте переменную в качестве параметров в класс 
        this.bigImage.classList.add('popup_is-opened');
        let content = this.bigImage.querySelector('.popup__content');
        content.querySelector('.popup__image').setAttribute("src", event.target.style.backgroundImage.slice(5, -2));
        content.classList.add("popup__big-image");
    }

    create(card) {
        if (!this.likeNumber) this.likeNumber = 0;
        if (card.owner['_id'] === "ba2db38605eee42e2ef8a612" || card.owner == "ba2db38605eee42e2ef8a612") {
            return `<div class="place-card" id='${this.id}'> 
                 <div class="place-card__image" style="background-image: url(${this.link})"> 
                   <button class="place-card__delete-icon"></button>
                 </div>
                 <div class="place-card__description">
                   <h3 class="place-card__name">${this.name}</h3>
                    <div>
                        <button class="place-card__like-icon"></button>
                        <p class="place-card__like-number">${this.likeNumber}</p>
                    </div>
                 </div>
               </div>`;
        } else {
            return `<div class="place-card" id='${this.id}'> 
                 <div class="place-card__image" style="background-image: url(${this.link})"> 
                 </div>
                 <div class="place-card__description">
                   <h3 class="place-card__name">${this.name}</h3>
                    <div>
                        <button class="place-card__like-icon"></button>
                        <p class="place-card__like-number">${this.likeNumber}</p>
                    </div>
                 </div>
               </div>`;
        }
    }
}