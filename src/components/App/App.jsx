import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';

import Main from '../Main/Main';
import Header from '../Header/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const openBurger = () => {
    setIsBurgerOpened(true);
  };

  const closeAllPopups = () => {
    setIsBurgerOpened(false);
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        isOpened={isBurgerOpened}
        onClose={closeAllPopups}
        openBurger={openBurger}
      />

      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
