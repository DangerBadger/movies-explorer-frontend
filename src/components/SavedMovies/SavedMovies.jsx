import { useEffect } from 'react';
import { systemMessages } from '../../utils/constants';

import './SavedMovies.scss';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ServerMessage from '../ServerMessage/ServerMessage';

function SavedMovies({
  saved,
  isLoading,
  moviesList,
  handleSearchMovies,
  isShown,
  error,
  setError,
  toggleMovieSaved,
  category,
}) {
  useEffect(() => {
    setError('');
  });

  return (
    <main className="saved-movies">
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

export default SavedMovies;
