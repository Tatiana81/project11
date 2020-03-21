class UserInfo {
    constructor(api) {
        this.name = ''
        this.about = ''
        this.api = api;
    }
    setUserInfo(name, about) {
        this.name = name;
        this.about = about;
    }
    updateUserInfo(event) {
        // (исправлено) Надо исправить: вы обращаетесь в классе к переменной объявленной глобально. 
        // передайте переменную в качестве параметров в класс 
        this.api.updateUserInfo(event);
        document.querySelector('h1').textContent = this.name.value;
        document.querySelector('p.user-info__job').textContent = this.about.value;
    }
}