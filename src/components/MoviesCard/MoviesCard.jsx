/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-closing-tag-location */
import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';

import './MoviesCard.scss';

import Saved from '../../images/saved.svg';
import Delete from '../../images/delete-card.svg';
import { getDuration } from '../../utils/utils';

function MoviesCard({ card, toggleMovieSaved }) {
  const [isLiked, setIsLiked] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const { pathname } = useLocation();
  const movies = pathname === '/movies';

  const {
    nameRU,
    duration,
    image,
    trailerLink,
    owner,
  } = card;

  useEffect(() => {
    setIsLiked(owner === currentUser._id);
  }, []);

  const toggleSaveBtn = () => {
    setIsLiked(!isLiked);
    toggleMovieSaved(card);
  };

  return (
    <div className="movie-card">
      <div className="movie-card__info-container">
        <p className="movie-card__title">{nameRU}</p>
        <p className="movie-card__duration">{getDuration(duration)}</p>
      </div>
      <Link to={trailerLink} target="_blank" className="movie-card__img-container">
        <img src={movies ? `https://api.nomoreparties.co${image.url}` : image} alt="{nameRU}" className="movie-card__poster" />
      </Link>
      {!movies
        ? <button type="button" onClick={toggleSaveBtn} className="movie-card__save-btn movie-card__save-btn_delete">
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
