import './SearchForm.scss';

import Magnifier from '../../images/search.svg';

function SearchForm() {
  const submitHeandler = (evt) => {
    evt.preventDefault();
  };

  return (
    <section className="search-form" aria-label="Поиск фильма">
      <form className="search-form__form-container" onSubmit={submitHeandler}>
        <fieldset className="search-form__fieldset">
          <div className="search-form__input-container">
            <input type="text" placeholder="Фильм" className="search-form__input" required />
            <button type="submit" className="search-form__button">
              <img src={Magnifier} alt="Поиск" className="search-form__btn-img" />
            </button>
          </div>
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
