import { Link } from 'react-router-dom';

import './Logo.scss';

import logo from '../../images/logo.svg';

function Logo() {
  return (
    <Link to="/" className="logo">
      <img className="logo__img" alt="Логотип" src={logo} />
    </Link>
  );
}

export default Logo;
