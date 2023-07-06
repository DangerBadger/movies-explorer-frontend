/* eslint-disable spaced-comment */
import { useEffect } from 'react';
import { systemMessages } from '../../utils/constants';

import './Movies.scss';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import ServerMessage from '../ServerMessage/ServerMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  saved,
  isLoading,
  handleSearchMovies,
  isShown,
  error,
  setError,
  moviesList,
  toggleMovieSaved,
  category,
}) {
  useEffect(() => {
    setError('');
  });

  return (
    <main className="movies">
      <SearchForm
        handleSearchMovies={handleSearchMovies}
        category={category}
        isLoading={isLoading}
        isShown={isShown}
      />
      {
        isLoading
          ? <Preloader />
          : isShown
            ? moviesList.length === 0
              ? localStorage.getItem(`found-${category}`) && <ServerMessage error={systemMessages.EMPTY_RESULT} />
              : <MoviesCardList
                  moviesList={moviesList}
                  toggleMovieSaved={toggleMovieSaved}
                  saved={saved}
              />
            : error && <ServerMessage error={error} />
      }
    </main>
  );
}

export default Movies;
