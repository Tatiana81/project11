class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            })
            .catch((err) => { console.log(err) });

    }

    newCardAdd(event) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: newCardForm.elements.place.value,
                link: newCardForm.elements.link.value,
                likes: []
            })
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => { return result })
            .catch((err) => { console.log(err) });
    }

    userInfoSet() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => { return result })
            .catch((err) => { console.log(err) })

    }

    updateUserInfo(event) {
        event.target.querySelector('button').textContent = "Загрузка...";
        fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: editProfileForm.elements.name.value,
                about: editProfileForm.elements.about.value
            })
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => { return res; })
            .catch((err) => { console.log(err) })
    }

    deleteLike(event) {
        return fetch(`${this.baseUrl}/cards/like/${event.target.parentNode.parentNode.parentNode.getAttribute('id')}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            })
            .catch((err) => { console.log(err) })
    }

    addLike(event) {
        return fetch(`${this.baseUrl}/cards/like/${event.target.parentNode.parentNode.parentNode.getAttribute('id')}`, {
            method: 'PUT',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            })
            .catch((err) => { console.log(err) })
    }

    removeCard(event) {
        //  (исправлено) Надо исправить: Необходимо вынести такие параметры как url за класс и передавать в качестве параметра при инициализации класса 
        fetch(`${this.baseUrl}/cards/${event.target.parentNode.parentNode.getAttribute('id')}`, {
            method: 'DELETE',
            headers: this.headers
        })
    }
}


/**
  * Здравствуйте.
  * Надо исправить: Название файлов должна быть идентично названию класса Например если класс назвается FormValidator, то файл должен называться FormValidator
  *
   * Все запросы должны быть методами этого класс. Если мы получаем список карточек, то в классе должен быть метод getInitialCards
   * Если профиль пользователя то getUserInfo и так далее
   *  *
   * Самый правильный способ, как пример указан в брифе
   // url лучше передавать при инициализации класса в конструктор
   fetch(`url/cards`,
        {
     headers: {
            // ключ который надо передавать в параметрах
    authorization: param.authorization
          }
        })
    .then(res => {
      if (res.ok) {
     return res.json();
        }
        // если ошибка, переходим в catch
     return Promise.reject(`Ошибка: ${res.status
        }`);
      })
  .then((result) => {
        // обрабатываем результат
        // а точнее возвращает результат работы прямо в тот класс откуда вызывали
      })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
        });


    Просмотрите пожалуйста каждый файл и класс. Так я нашел много переменных объявленных глобально
    * Надо исправить: вы обращаетесь в классе к переменной объявленной глобально,
    * так делать нельзя. Вы можете передать эту переменную в качестве параметров, а потом уже обращаться к ней
    * Стремитесь к тому чтобы класс у вас был самодостаточным, и не зависел от глобальных переменных или классов
    * объявленных глобально, а только от тех данных которые были переданны через параметры
    *
      Надо исправить : Нельзя вызывать или создавать реализацию в конструторе класса
      Вызывая реализацию в конструторе класса, при наследовании, вы не сможите вызвать другой метод не вызвав реализацию в конструкторе
      Если Вам необходимо будет вызвать конструктор родителя при наследовании в одном из классов
     так же, вы заведомо делаете класс не тестируемым, так как всегда при инициализации будет вызываться конструктор класса



    * Класс Api это отдельный класс который ничего не знает о других классах и методах
    * Вы можете только получать данные из этого класса и использовать эти данные.
    * Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
    * скажу что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
    * Который только возвращает данные, а вы можите получить только обращась к этим методам.
    * Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратитьсяк методам.
    * Отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
    * к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.




 Хочу заметить что данные авторизации лучше передать при создании класса API в ввиде объекта

   * Вызывать же методы класса Api лучше из других классов
   *
   * Стоит отметить, что реализации в классе API быть не должно. Точнее прямого взаимодействия. Методы могут вызываться
   * из других классов и возвращать данные, а работа с этими данными должны быть непосредственно в классах создаваемых в 8 спринте
  *
   * работа принимается только при исправлении всех "Надо исправить"
   *
  */

/**
 * Здравствуйте.
 * Вам надо поправить. Вы обращаетесь к глобальным функциям.  setLikeOut setLikeOut setTitle initCards
 * Так делать нельзя, просто возвращайте через return
 *
 */

/**
 * Здравствуйте, всё хорошо. Вы молодцы
 * Работа принимается
 *
 *
 */