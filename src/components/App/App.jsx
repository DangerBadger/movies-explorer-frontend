import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';

import './App.scss';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Виталий', email: 'pochta@yandex.ru' });
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const isPopupOpened = isBurgerOpened;

  const closeAllPopups = () => {
    setIsBurgerOpened(false);
  };

  // Закрытие модалки по esc
  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isPopupOpened) {
      document.addEventListener('keydown', closeByEsc);
    }

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [isPopupOpened]);

  const openBurger = () => {
    setIsBurgerOpened(true);
  };

  const handleRegistration = () => {
    navigate('/signin', { replace: true });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  const handleUpdateUser = (userInfo) => {
    setCurrentUser(userInfo);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">
        <Header
          isLoggedIn={isLoggedIn}
          isOpened={isBurgerOpened}
          onClose={closeAllPopups}
          openBurger={openBurger}
        />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="movies" element={<Movies />} />
          <Route path="saved-movies" element={<SavedMovies />} />
          <Route path="signup" element={<Register handleRegistration={handleRegistration} />} />
          <Route path="signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="profile" element={<Profile onUpdate={handleUpdateUser} handleLogout={handleLogout} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
