/* eslint-disable spaced-comment */
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
              ? <ServerMessage error={systemMessages.EMPTY_RESULT} />
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
