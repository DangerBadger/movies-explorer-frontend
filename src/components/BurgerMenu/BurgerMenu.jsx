import { Link, NavLink } from 'react-router-dom';
import './BurgerMenu.scss';
import accountImage from '../../images/account-image.svg';

function BurgerMenu({ isOpened, onClose, openBurger }) {
  const linkActivator = (navStatus) => (navStatus.isActive
    ? 'burger__link burger__link_active'
    : 'burger__link');

  return (
    <div
      className={isOpened ? 'burger burger_opened' : 'burger'}
      onKeyDown={(evt) => {
        if (evt.key === 'Escape') {
          onClose();
        }
      }}
    >
      <button className="burger__button" type="button" onClick={isOpened ? onClose : openBurger}>
        <span className="burger__button-line" />
        <span className="burger__button-line" />
        <span className="burger__button-line" />
      </button>
      <div
        className="burger__nav-overlay"
        onMouseDown={(evt) => {
          if (evt.currentTarget === evt.target) {
            onClose();
          }
        }}
      />
      <nav className="burger__menu_login">
        <ul className="burger__lines">
          <li className="burger__line burger__line_mainpage">
            <NavLink to="/" className={linkActivator}>Главная</NavLink>
          </li>
          <li className="burger__line">
            <NavLink to="*" className={linkActivator}>Фильмы</NavLink>
          </li>
          <li className="burger__line">
            <NavLink to="*" className={linkActivator}>Сохранённые фильмы</NavLink>
          </li>
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
