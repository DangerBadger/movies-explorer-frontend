import './SearchForm.scss';

import Magnifier from '../../images/search.svg';

function SearchForm() {
  return (
    <section className="searchForm">
      <form className="searchForm__formContainer">
        <fieldset className="searchForm__fieldset">
          <div className="searchForm__inputContainer">
            <input type="text" className="searchForm__input" />
            <buttom className="searchForm__button">
              <img src={Magnifier} alt="Поиск" className="searchForm__btnImg" />
            </buttom>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
