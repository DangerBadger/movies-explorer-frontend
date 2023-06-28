/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

import './MoviesCardList.scss';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movieCards }) {
  const [cardsNumber, setCardsNumber] = useState(0);
  const [cardsPage, setCardsPage] = useState(1);
  const [shortMovie, setShortMovie] = useState(false);

  const { pathname } = useLocation();

  // Ширина окна
  const updateWinSize = () => window.innerWidth;

  const handleCardsCounter = () => {
    if (updateWinSize() >= 1170) {
      setCardsNumber(3);
      setCardsPage(4);
    } else if (updateWinSize() < 1170 && updateWinSize() >= 739) {
      setCardsNumber(2);
      setCardsPage(4);
    } else {
      setCardsNumber(1);
      setCardsPage(5);
    }
  };

  useEffect(() => {
    handleCardsCounter();
    updateWinSize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        handleCardsCounter();
      }, 1000);
    });

    return () => {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          handleCardsCounter();
        }, 1000);
      });
    };
  }, []);

  const addCardsPage = () => {
    if (updateWinSize() < 739) {
      (setCardsPage(cardsPage + 2));
    } else {
      (setCardsPage(cardsPage + 1));
    }
  };

  return (
    <section className="movieCardList" aria-label="Список фильмов">
      <ul className="movieCardList__cards">
        {pathname === '/movies'
          ? movieCards.slice(0, cardsNumber * cardsPage).map((card) =>
            <li key={card.id} className="movieCardList__card">
              <MoviesCard card={card} />
            </li>)
          : movieCards.map((card) =>
            <li key={card.id} className="movieCardList__card">
              <MoviesCard card={card} />
            </li>)}
      </ul>
      {movieCards.length > cardsNumber * cardsPage && pathname === '/movies'
          && <button type="button" className="movieCardList__moreButton" onClick={addCardsPage}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
