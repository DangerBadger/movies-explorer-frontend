import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import logo from '../../images/logo.svg';

import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({
  isLoggedIn,
  isOpened,
  onClose,
  openBurger,
}) {
  const { pathname } = useLocation();

  return (
    <>
      {
        pathname !== '/signup'
        && pathname !== '/signin'
        && pathname !== '/profile'
        && pathname !== '/*'
        && (
          <header className="header header_opened">
            <Link to="/" className="header__logo">
              <img className="header__logo-img" alt="Логотип" src={logo} />
            </Link>
            {isLoggedIn
              ? (
                <BurgerMenu isOpened={isOpened} onClose={onClose} openBurger={openBurger} />
              )
              : (
                <div className="header__menu_logout">
                  <p className="header__registration-link">Регистрация</p>
                  <Link to="*" className="header__enter-btn">Войти</Link>
                </div>
              )}
          </header>
        )
      }
    </>
  );
}

export default Header;
