import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../images/logo.svg';
import accountImage from '../../images/account-image.svg';

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <Link to="*" className="header__logo">
        <img className="header__logo-img" alt="Логотип" src={logo} />
      </Link>
      {isLoggedIn
        ? (
          <div className="header__navigation_login">
            <ul className="header__links">
              <li className="header__link">Фильмы</li>
              <li className="header__link">Сохранённые фильмы</li>
            </ul>
            <Link to="*" className="header__account-btn">
              <img className="header__account-img" alt="Иконка кнопки профиль" src={accountImage} />
              <p className="header__account-btn-text">Аккаунт</p>
            </Link>
          </div>
        )
        : (
          <div className="header__navigation_logout">
            <p className="header__registration-link">Регистрация</p>
            <Link to="*" className="header__enter-btn">Войти</Link>
          </div>
        )}
    </header>
  );
}

export default Header;
