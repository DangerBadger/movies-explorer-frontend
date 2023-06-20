import { useState, useEffect } from 'react';

import './SavedMovies.scss';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

// Временный статичный массив фильмов
import savedMoviesArray from '../../utils/beatfilm-saved-movies.json';

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(true);

  const hanleLoader = () => {
    setIsLoading(false);
  };

  // Временное решение для симуляции работы прелоадера
  useEffect(() => {
    setTimeout(hanleLoader, 1500);
  }, []);

  return (
    <main className="saved-movies">
      <SearchForm />
      {
        isLoading
          ? <Preloader />
          : <MoviesCardList moviesArray={savedMoviesArray} />
      }
    </main>
  );
}

export default SavedMovies;
