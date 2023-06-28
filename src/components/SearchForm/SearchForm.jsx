import { useState } from 'react';
import './SearchForm.scss';

import Magnifier from '../../images/search.svg';

import useFormValidation from '../../utils/hooks/useFormValidation';

function SearchForm({ handleSearchMovies }) {
  const {
    valuesObj,
    setValuesObj,
    resetValidation,
    errorMessageObj,
    isValid,
    setIsValid,
    handleChange,
  } = useFormValidation();

  const [movieName, setMovieName] = useState('');
  const [isShort, setIsShort] = useState(false);

  const handleSearcMovie = (evt) => {
    setMovieName(evt.target.value);
    handleChange(evt);
  };

  const submitHeandler = (evt) => {
    evt.preventDefault();
    handleSearchMovies();
  };

  return (
    <section className="search-form" aria-label="Поиск фильма">
      <form className="search-form__form-container" onSubmit={submitHeandler}>
        <fieldset className="search-form__fieldset">
          <div className="search-form__input-container">
            <input
              type="text"
              placeholder="Фильм"
              className="search-form__input"
              name="search"
              value={movieName || ''}
              onChange={handleSearcMovie}
              required
            />
            <button type="submit" className="search-form__button">
              <img src={Magnifier} alt="Поиск" className="search-form__btn-img" />
            </button>
          </div>
          <span className="search-form__input-error">{errorMessageObj.search}</span>
          <div className="search-form__checkbox-container">
            <label className="search-form__switch" htmlFor="checkbox">
              <input type="checkbox" className="search-form__checkbox" id="checkbox" />
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
