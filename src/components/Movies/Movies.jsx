import { useState, useEffect } from 'react';

import './Movies.scss';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

// Временный статичный массив фильмов
import moviesArray from '../../utils/beatfilm-movies.json';

function Movies() {
  const [isLoading, setIsLoading] = useState(true);

  const hanleLoader = () => {
    setIsLoading(false);
  };

  // Временное решение для симуляции работы прелоадера
  useEffect(() => {
    setTimeout(hanleLoader, 1500);
  }, []);

  return (
    <main className="movies">
      <SearchForm />
      { isLoading ? <Preloader /> : <MoviesCardList moviesArray={moviesArray} /> }
      <div className="filler" />
    </main>
  );
}

export default Movies;
