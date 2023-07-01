/* eslint-disable spaced-comment */
import { systemMessages } from '../../utils/constants';

import './Movies.scss';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  saved,
  isLoading,
  handleSearchMovies,
  isShown,
  error,
  moviesList,
  toggleMovieSaved,
  category,
}) {
  return (
    <main className="movies">
      <SearchForm handleSearchMovies={handleSearchMovies} category={category} />
      {
        isLoading
          ? <Preloader />
          : isShown
            ? moviesList.length === 0
              ? <p className="movies__error-message">{systemMessages.EMPTY_RESULT}</p>
              : <MoviesCardList
                  moviesList={moviesList}
                  toggleMovieSaved={toggleMovieSaved}
                  saved={saved}
              />
            : error && <p className="movies__error-message">{error}</p>
      }
    </main>
  );
}

export default Movies;
