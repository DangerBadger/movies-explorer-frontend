/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import './SearchForm.scss';

import Magnifier from '../../images/search.svg';

import useFormValidation from '../../utils/hooks/useFormValidation';

function SearchForm({
  handleSearchMovies,
  category,
  isLoading,
}) {
  const {
    errorMessageObj,
    setErrorMessageObj,
    handleChange,
    setIsValid,
  } = useFormValidation();

  const [movieName, setMovieName] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);

  useEffect(() => {
    setIsShortMovie(localStorage.getItem(`short${category}`) === 'true');
    setMovieName(localStorage.getItem(`search${category}`) || '');
    setIsValid(true);
  }, []);

  useEffect(() => {
    if (movieName) {
      localStorage.setItem(`short${category}`, isShortMovie.toString());
      localStorage.setItem(`search${category}`, movieName);
      handleSearchMovies(category);
    }
  }, [isShortMovie]);

  const searchMovieHandler = (evt) => {
    setMovieName(evt.target.value);
    handleChange(evt);
  };

  const checkboxHandler = () => setIsShortMovie(!isShortMovie);

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (movieName === '') {
      setErrorMessageObj({ ...errorMessageObj, search: 'Нужно ввести ключевое слово' });
    } else {
      localStorage.setItem(`short${category}`, isShortMovie.toString());
      localStorage.setItem(`search${category}`, movieName);
      handleSearchMovies(category);
    }
  };

  return (
    <section className="search-form" aria-label="Поиск фильма">
      <form className="search-form__form-container" onSubmit={submitHandler}>
        <fieldset className="search-form__fieldset">
          <div className="search-form__input-container">
            <input
              type="text"
              placeholder="Фильм"
              className="search-form__input"
              name="search"
              value={movieName || ''}
              onChange={searchMovieHandler}
            />
            <button type="submit" className="search-form__button" disabled={!!isLoading}>
              <img src={Magnifier} alt="Поиск" className="search-form__btn-img" />
            </button>
          </div>
          <span className="search-form__input-error">{errorMessageObj.search}</span>
          <div className="search-form__checkbox-container">
            <label className="search-form__switch" htmlFor="checkbox">
              <input
                type="checkbox"
                className="search-form__checkbox"
                id="checkbox"
                onChange={checkboxHandler}
                checked={isShortMovie}
              />
              <span className="search-form__slider" />
            </label>
            <p className="search-form__short-films">Короткометражки</p>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
