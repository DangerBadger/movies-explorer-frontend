/* eslint-disable spaced-comment */
import { useState, useEffect } from 'react';
import { systemMessages } from '../../utils/constants';

import './Movies.scss';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  isLoading,
  handleSearchMovies,
  isShown,
  error,
}) {
  const [movieCards, setMovieCards] = useState(JSON.parse(localStorage.getItem('movies'))); //JSON.parse(localStorage.getItem('movies'))

  return (
    <main className="movies">
      <SearchForm handleSearchMovies={handleSearchMovies} />
      {
        isLoading
          ? <Preloader />
          : isShown
            ? movieCards.length === 0
              ? <p className="movies__error-message">{systemMessages.EMPTY_RESULT}</p>
              : <MoviesCardList movieCards={movieCards} isLoading={isLoading} />
            : error && <p className="movies__error-message">{systemMessages.REAUEST_ERROR}</p>
      }
    </main>
  );
}

export default Movies;
