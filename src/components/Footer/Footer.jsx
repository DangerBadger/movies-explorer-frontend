import { Link, useLocation } from 'react-router-dom';

import './Footer.scss';

function Footer() {
  const { pathname } = useLocation();

  return (
    <>
      {
        pathname !== '/signup'
        && pathname !== '/signin'
        && pathname !== '/profile'
        && pathname !== '/*'
        && (
          <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__copyright-container">
              <p className="footer__copyright">
                &copy;
                {new Date().getFullYear()}
              </p>
              <div className="footer__links-container">
                <Link to="https://practicum.yandex.ru/" target="_blank" className="footer__link">Яндекс.Практикум</Link>
                <Link to="https://github.com/" target="_blank" className="footer__link">Github</Link>
              </div>
            </div>
          </footer>
        )
      }
    </>
  );
}

export default Footer;
