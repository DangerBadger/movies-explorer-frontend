import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../images/logo.svg';

import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({ isLoggedIn }) {
  return (
    <header className="header header_opened">
      <Link to="*" className="header__logo">
        <img className="header__logo-img" alt="Логотип" src={logo} />
      </Link>
      {isLoggedIn
        ? (
          <BurgerMenu />
        )
        : (
          <div className="header__menu_logout">
            <p className="header__registration-link">Регистрация</p>
            <Link to="*" className="header__enter-btn">Войти</Link>
          </div>
        )}
    </header>
  );
}

export default Header;
