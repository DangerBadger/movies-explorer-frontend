import { Link } from 'react-router-dom';
import './AboutMe.scss';
import Me from '../../images/Me.jpg';

import SectionHeader from '../SectionHeader/SectionHeader';

function AbutMe() {
  return (
    <section className="about-me">
      <SectionHeader text="Студент" id="student" />
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
    </section>
  );
}

export default AbutMe;
