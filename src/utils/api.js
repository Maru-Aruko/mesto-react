class Api {
    constructor({url, headers}) {
        this._url = url;
        this._token = headers;
    }

    //Проверка ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

//Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._token
        })
            .then(this._checkResponse)
    }

//Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._token
        })
            .then(this._checkResponse)
    }

    //Редактирование профиля
    setProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._token,
            body: JSON.stringify({
                name: data["name"],
                about: data["about"]
            })
        })
            .then(this._checkResponse)
    }

    // Добавление новой карточки
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._token,
            body: JSON.stringify({
                name: data["place-name"],
                link: data["place-link"]
            })
        })
            .then(this._checkResponse)
    }

//Удаление карточки
    removeCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._token
        })
            .then(this._checkResponse)
    }

//Постановка лайка
    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._token
        })
            .then(this._checkResponse)
    }

//Снятие лайка
    removeLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._token
        })
            .then(this._checkResponse)
    }

//Обновление аватара пользователя
    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._token,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse)
    }

    //Получаем обновлённые данные карточки
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.addLike(cardId);
        } else {
            return this.removeLike(cardId);
        }
    }
}


export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-45',
    headers: {
        authorization: '361cddb0-0cf4-404e-a741-1847db62073a',
        'Content-Type': 'application/json'
    }
});


