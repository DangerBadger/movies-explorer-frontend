import { Link } from 'react-router-dom';
import './Portfolio.scss';
import LinkArrow from '../../images/link-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <div className="portfolio__link-container">
            <Link to="https://github.com/DangerBadger/how-to-learn" target="_blank" className="portfolio__project-link">
              <p className="portfolio__project-link-text">Статичный сайт</p>
              <img alt="Стрелка ссылки" src={LinkArrow} className="portfolio__project-link-arrow" />
            </Link>
            <hr className="portfolio__link-line" />
          </div>
        </li>
        <li className="portfolio__project">
          <div className="portfolio__link-container">
            <Link to="https://github.com/DangerBadger/russian-travel" target="_blank" className="portfolio__project-link">
              <p className="portfolio__project-link-text">Адаптивный сайт</p>
              <img alt="Стрелка ссылки" src={LinkArrow} className="portfolio__project-link-arrow" />
            </Link>
            <hr className="portfolio__link-line" />
          </div>
        </li>
        <li className="portfolio__project">
          <div className="portfolio__link-container">
            <Link to="https://github.com/DangerBadger/react-mesto-api-full-gha" target="_blank" className="portfolio__project-link">
              <p className="portfolio__project-link-text">Одностраничное приложение</p>
              <img alt="Стрелка ссылки" src={LinkArrow} className="portfolio__project-link-arrow" />
            </Link>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
