/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
import { mainApiSettings } from './utils';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
  }

  _request(endpoint, options) {
    return (fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse));
  }

  getUserInfo() {
    return this._request(
      '/users/me',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
  }

  getSavedMovies() {
    return this._request(
      '/movies',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
  }

  setUserInfo({ name, email }) {
    return this._request(
      '/users/me',
      {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name,
          email,
        }),
      }
    );
  }

  saveNewMovie(movieData) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id,
    } = movieData;
    return this._request(
      '/movies',
      {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          country,
          director,
          duration,
          year,
          description,
          image: `https://api.nomoreparties.co${image.url}`,
          trailerLink,
          nameRU,
          nameEN,
          thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
          movieId: String(id),
        }),
      }
    );
  }

  deleteSavedMovie(movieId) {
    return this._request(
      `/movies/${movieId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
  }
}

const api = new Api(mainApiSettings);

export default api;
