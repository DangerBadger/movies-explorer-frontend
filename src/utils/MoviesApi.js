/* eslint-disable arrow-body-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable quote-props */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-expressions */
import { apiBeatFimMoviesSettings } from './utils';

class MoviesApi {
  constructor({ beatFilmBaseUrl, headers }) {
    this._baseUrl = beatFilmBaseUrl;
    this._headers = headers;
  }

  getFilms() {
    return fetch(this._baseUrl, { method: 'GET', headers: this._headers })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
      });
  }
}

const moviesApi = new MoviesApi(apiBeatFimMoviesSettings);

export default moviesApi;
