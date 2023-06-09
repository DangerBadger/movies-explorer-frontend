import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

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

      <Footer />
    </div>
  );
}

export default App;
