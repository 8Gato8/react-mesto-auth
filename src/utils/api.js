export class Api {

  constructor({ baseUrl, headers }) {

    this._baseUrl = baseUrl;
    this._headers = headers;

  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getBackendUserInfo() {

    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  getInitialCards() {

    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
  }

  editUserInfo(newName, newJob) {

    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    })
  }

  postNewCard({ name, link }) {

    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      })
    })
  }

  deleteCard(cardId) {

    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  likeCard(cardId) {

    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  deleteLike(cardId) {

    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  updateAvatar(avatar) {

    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'ca43c8e8-a5c6-4257-ad6d-b3b634fe42f7',
    'Content-Type': 'application/json'
  }
});

export default api;