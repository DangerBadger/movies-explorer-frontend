/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.scss';

import Saved from '../../images/saved.svg';
import Delete from '../../images/delete-card.svg';

function MoviesCard({ card }) {
  const [isLiked, setIsLiked] = useState(false);

  const { pathname } = useLocation();

  const { nameRU, duration, image } = card;

  const toggleSaveBtn = () => {
    setIsLiked(!isLiked);
  };

  const getDuration = (time) => {
    const lastDigit = time % 10;

    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${time} минуты`;
    } if (lastDigit === 1) {
      return `${time} минутa`;
    }
    return `${time} минут`;
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
      {pathname === '/saved-movies'
        ? <button type="button" className="movie-card__save-btn movie-card__save-btn_delete">
          <img src={Delete} alt="Удалить" className="movie-card__delete-btn-img" />
        </button>
        : <button
            type="button"
            onClick={toggleSaveBtn}
            className={`movie-card__save-btn ${isLiked && 'movie-card__save-btn_saved'}`}
        >
          {isLiked
            ? <img src={Saved} alt="Сохранено" className="movie-card__save-btn-img" /> : 'Сохранить'}
        </button>}
    </div>
  );
}

export default MoviesCard;
