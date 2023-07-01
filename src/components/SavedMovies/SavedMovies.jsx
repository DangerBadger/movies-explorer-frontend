import { systemMessages } from '../../utils/constants';

import './SavedMovies.scss';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  saved,
  isLoading,
  moviesList,
  handleSearchMovies,
  isShown,
  error,
  toggleMovieSaved,
  category,
}) {
  return (
    <main className="saved-movies">
      <SearchForm handleSearchMovies={handleSearchMovies} category={category} />
      {
        isLoading
          ? <Preloader />
          : isShown
            ? moviesList.length === 0
              ? <p className="saved-movies__error-message">{systemMessages.EMPTY_RESULT}</p>
              : <MoviesCardList
                  moviesList={moviesList}
                  toggleMovieSaved={toggleMovieSaved}
                  saved={saved}
              />
            : error && <p className="saved-movies__error-message">{error}</p>
      }
    </main>
  );
}

export default SavedMovies;
