import './SearchForm.scss';

import Magnifier from '../../images/search.svg';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="searchForm__form-container">
        <fieldset className="search-form__fieldset">
          <div className="search-form__inputContainer">
            <input type="text" placeholder="Фильм" className="search-form__input" />
            <button type="submit" className="search-form__button">
              <img src={Magnifier} alt="Поиск" className="search-form__btn-img" />
            </button>
          </div>
          <div className="search-form__checkbox-container">
            <label className="search-form__switch" htmlFor="checkbox">
              <input type="checkbox" className="search-form__checkbox" id="checkbox" />
              <span className="slider circle" />
            </label>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
