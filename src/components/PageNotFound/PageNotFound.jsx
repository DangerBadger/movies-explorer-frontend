import { Link, useNavigate } from 'react-router-dom';

import './PageNotFound.scss';

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <h2 className="pageNotFound__number">404</h2>
      <p className="pageNotFound__text">Страница не найдена</p>
      <Link to={-1} className="pageNotFound__link">Назад</Link>
    </div>
  );
}

export default PageNotFound;
