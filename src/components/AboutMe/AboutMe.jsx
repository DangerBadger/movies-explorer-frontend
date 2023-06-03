import { Link } from 'react-router-dom';
import './AboutMe.scss';
import Me from '../../images/Me.jpg';
import LinkArrow from '../../images/link-arrow.svg';

import SectionHeader from '../SectionHeader/SectionHeader';

function AbutMe() {
  return (
    <section className="about-me">
      <SectionHeader text="Студент" />
      <div className="about-me__bio-container">
        <div className="about-me__info-container">
          <p className="about-me__name">Кирилл</p>
          <p className="about-me__info">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__bio">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015
            года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link to="https://github.com/DangerBadger" target="_blank" className="about-me__my-git">Github</Link>
        </div>
        <img src={Me} className="about-me__photo" alt="Фото" />
      </div>
      <div className="about-me__portfolio-container">
        <h3 className="about-me__portfolio">Портфолио</h3>
        <ul className="about-me__projects">
          <li className="about-me__project">
            <div className="about-me__link-container">
              <Link to="https://github.com/DangerBadger/how-to-learn" target="_blank" className="about-me__project-link">
                <p className="about-me__project-link-text">Статичный сайт</p>
                <img alt="Стрелка ссылки" src={LinkArrow} className="about-me__project-link-arrow" />
              </Link>
              <hr className="about-me__link-line" />
            </div>
          </li>
          <li className="about-me__project">
            <div className="about-me__link-container">
              <Link to="https://github.com/DangerBadger/russian-travel" target="_blank" className="about-me__project-link">
                <p className="about-me__project-link-text">Адаптивный сайт</p>
                <img alt="Стрелка ссылки" src={LinkArrow} className="about-me__project-link-arrow" />
              </Link>
              <hr className="about-me__link-line" />
            </div>
          </li>
          <li className="about-me__project">
            <div className="about-me__link-container">
              <Link to="https://github.com/DangerBadger/react-mesto-api-full-gha" target="_blank" className="about-me__project-link">
                <p className="about-me__project-link-text">Одностраничное приложение</p>
                <img alt="Стрелка ссылки" src={LinkArrow} className="about-me__project-link-arrow" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AbutMe;
