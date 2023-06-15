/* eslint-disable react/jsx-closing-tag-location */
import './MoviesCard.scss';

import Saved from '../../images/saved.svg';

function MoviesCard({ card }) {
  const { nameRU, duration, image } = card;

  const getDuration = (time) => {
    const lastDigit = time % 10;

    if (lastDigit === 0 || lastDigit >= 5) {
      return `${time} минут`;
    } if (lastDigit === 1) {
      return `${time} минутa`;
    }
    return `${time} минуты`;
  };

  return (
    <div className="movie-card">
      <span className="movie-card__info-container">
        <p className="movie-card__title">{nameRU}</p>
        <p className="movie-card__duration">{getDuration(duration)}</p>
      </span>
      <div className="movie-card__img-container">
        <img src={`https://api.nomoreparties.co${image.url}`} alt="{nameRU}" className="movie-card__poster" />
      </div>
      {card.id % 2 === 0
        ? <button type="button" className="movie-card__save-btn">Сохранить</button>
        : <button type="button" className="movie-card__save-btn movie-card__save-btn_saved">
          <img src={Saved} alt="Сохранено" className="movie-card__save-btn-img" />
        </button>}
    </div>
  );
}

export default MoviesCard;
