import { Link } from 'react-router-dom';
import './BurgerMenu.scss';
import accountImage from '../../images/account-image.svg';

function BurgerMenu() {
  return (
    <div className="burger burger_opened">
      <button className="burger__button" type="button">
        <span className="burger__button-line" />
        <span className="burger__button-line" />
        <span className="burger__button-line" />
      </button>
      <div className="burger__nav-overlay" />
      <nav className="burger__menu_login">
        <ul className="burger__links">
          <li className="burger__link burger__link_mainpage">Главная</li>
          <li className="burger__link burger__link_active">Фильмы</li>
          <li className="burger__link">Сохранённые фильмы</li>
        </ul>
        <Link to="*" className="burger__account-btn">
          <img className="burger__account-img" alt="Иконка кнопки профиль" src={accountImage} />
          <p className="burger__account-btn-text">Аккаунт</p>
        </Link>
      </nav>
    </div>
  );
}

export default BurgerMenu;
