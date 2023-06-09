import './NavTab.scss';

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__links">
        <li className="navtab__link">
          <a href="#project" className="navtab__anchor">О проекте</a>
        </li>
        <li className="navtab__link">
          <a href="#techs" className="navtab__anchor">Технологии</a>
        </li>
        <li className="navtab__link">
          <a href="#student" className="navtab__anchor">Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
