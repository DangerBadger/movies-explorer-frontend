/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable quote-props */
/* eslint-disable import/prefer-default-export */
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
  const lastDigit = time % 10;

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${time} минуты`;
  } if (lastDigit === 1) {
    return `${time} минутa`;
  }
  return `${time} минут`;
};

// export const searchMovies =

// export function movieFilter(moviesList, type) {
//   const regex = new RegExp(localStorage.getItem(`search-${type}`), 'i');

//   const arr = moviesList.filter(function (movie) {
//     if (movie.country) movie.country = 'null'
//     return regex.test(movie.nameRU)
// && (localStorage.getItem(`isShort-${type}`) === 'false'
// || movie.duration < SHORTMOVIES_DURATION);
//   })
//   localStorage.setItem(`resultSearch-${type}`, JSON.stringify(arr))
//   return arr
// }

export const movieFormatFixer = (movie) => {
  const keys = ['nameEN', 'director', 'country'];

  keys.map((key) => {
    if (!!movie[key] === false) {
      movie[key] = 'null';
    }
  });
};
