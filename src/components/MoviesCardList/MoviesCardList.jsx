/* eslint-disable implicit-arrow-linebreak */
import { useState, useEffect } from 'react';

import './MoviesCardList.scss';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesArray }) {
  const [cardsNumber, setCardsNumber] = useState(0);
  const [cardsPage, setCardsPage] = useState(1);

  const handleCardsCounter = () => {
    const winSize = window.innerWidth;

    const count = () => {
      if (winSize >= 1169) {
        return 12;
      } if (winSize < 1169 && winSize >= 739) {
        return 8;
      }
      return 5;
    };
    setCardsNumber(count);
  };

  useEffect(() => {
    handleCardsCounter();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleCardsCounter);

    return () => {
      window.removeEventListener('resize', handleCardsCounter);
    };
  }, []);

  const addCardsPage = () => (setCardsPage(cardsPage + 1));

  return (
    <section className="movieCardList">
      <ul className="movieCardList__cards">
        {moviesArray.slice(0, cardsNumber * cardsPage).map((card) =>
          <li key={card.id} className="movieCardList__card">
            <MoviesCard card={card} />
          </li>)}
      </ul>
      {moviesArray.length >= cardsNumber && moviesArray.length > cardsNumber * cardsPage
        && <button type="button" className="movieCardList__moreButton" onClick={addCardsPage}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
