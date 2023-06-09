import './AboutProject.scss';

import SectionHeader from '../SectionHeader/SectionHeader';

function AboutProject() {
  return (
    <section className="about-project">
      <SectionHeader text="О проекте" id="project" />
      <div className="about-project__text-container">
        <div className="about-project__info-container">
          <h3 className="about-project__subheader">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__info-container">
          <h3 className="about-project__subheader">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__info">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__scheme-container">
        <span className="about-project__week about-project__week_green">1 неделя</span>
        <span className="about-project__week">4 недели</span>
        <span className="about-project__theme">Back-end</span>
        <span className="about-project__theme">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;
