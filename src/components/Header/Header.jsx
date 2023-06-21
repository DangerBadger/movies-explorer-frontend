import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import logo from '../../images/logo.svg';

import Logo from '../Logo/Logo';
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
        && pathname !== '/*'
        && (
          <header className="header header_opened">
            <Logo />
            {isLoggedIn
              ? (
                <BurgerMenu isOpened={isOpened} onClose={onClose} openBurger={openBurger} />
              )
              : (
                <div className="header__menu-logout">
                  <Link to="signup" className="header__registration-link">Регистрация</Link>
                  <Link to="signin" className="header__enter-btn">Войти</Link>
                </div>
              )}
          </header>
        )
      }
    </>
  );
}

export default Header;
