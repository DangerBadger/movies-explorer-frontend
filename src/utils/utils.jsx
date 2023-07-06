/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable quote-props */
/* eslint-disable import/prefer-default-export */
import { SHORTMOVIE_DURATION } from './constants';

export const apiBeatFimMoviesSettings = {
  beatFilmBaseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

export const mainApiSettings = {
  // baseUrl: 'https://api.movies-explorer.ckg.nomoredomains.monster',
  baseUrl: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

export const getDuration = (time) => {
  let duration;

  if (time / 60 < 1) {
    const lastDigit = time % 10;

    if (lastDigit >= 2 && lastDigit <= 4) {
      duration = `${time} минуты`;
    } if (lastDigit === 1) {
      duration = `${time} минутa`;
    }
    duration = `${time} минут`;
  } else {
    const hours = Math.floor(time / 60);
    const minutes = (time % 60);
    if (minutes === 0) {
      duration = `${hours}ч`;
    } else {
      duration = `${hours}ч ${minutes}м`;
    }
  }
  return duration;
};

export const searchMovies = (filtredList, category) => {
  const regEx = new RegExp(localStorage.getItem(`search${category}`), 'i');

  const resultArr = filtredList.filter((movie) => {
    if (movie.country) {
      movie.country = 'null';
    }
    return regEx.test(movie.nameRU) && (localStorage.getItem(`short${category}`) === 'false' || movie.duration < SHORTMOVIE_DURATION);
  });
  localStorage.setItem(`found-${category}`, JSON.stringify(resultArr));
  return resultArr;
};

export const searchSavedMovies = (list, savedMovies, userId) => {
  if (!list || !savedMovies) {
    return;
  }
  list.forEach((movie) => {
    const savedMovieInstance = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    if (savedMovieInstance) {
      movie.owner = userId;
      movie._id = savedMovieInstance._id;
    }
    return movie;
  });
  return list;
};

export const savedMovieQualifier = (resultList, savedMoviesList, userId) => {
  if (!resultList || !savedMoviesList) {
    return;
  }
  resultList.forEach((movie) => {
    const savedMovie = savedMoviesList.find((savedOne) => savedOne.movieId === movie.id);
    if (savedMovie) {
      movie.owner = userId;
      movie._id = savedMovie._id;
    }
    return movie;
  });
  return resultList;
};

export const movieFormatFixer = (movie) => {
  const keys = ['nameEN', 'director', 'country'];

  keys.map((key) => {
    if (movie[key] === '' || movie[key] === null) {
      movie[key] = 'null';
    }
  });
};
