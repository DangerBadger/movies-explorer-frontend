import { Link } from 'react-router-dom';
import './BurgerMenu.scss';
import accountImage from '../../images/account-image.svg';

function BurgerMenu({ isOpened, onClose, openBurger }) {
  return (
    <div className={isOpened ? 'burger burger_opened' : 'burger'}>
      <button className="burger__button" type="button" onClick={isOpened ? onClose : openBurger}>
        <span className="burger__button-line" />
        <span className="burger__button-line" />
        <span className="burger__button-line" />
      </button>
      <div className="burger__nav-overlay" />
      <nav className="burger__menu_login">
        <ul className="burger__lines">
          <li className="burger__line burger__line_mainpage">
            <Link to="/" className="burger__link">Главная</Link>
          </li>
          <li className="burger__line">
            <Link to="*" className="burger__link burger__link_active">Фильмы</Link>
          </li>
          <li className="burger__line">
            <Link to="*" className="burger__link">Сохранённые фильмы</Link>
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
