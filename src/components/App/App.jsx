/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  movieFormatFixer,
  savedMovieQualifier,
  searchMovies,
  searchSavedMovies,
} from '../../utils/utils';
import { systemMessages } from '../../utils/constants';

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

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'));
  const [currentUser, setCurrentUser] = useState({ _id: '', name: 'Виталий', email: 'pochta@yandex.ru' });
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isCardsShown, setIsCardsShown] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

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

  const toggleMovieSaved = (movie) => {
    const isSaved = movie.owner === currentUser._id;

    if (isSaved) {
      mainApi.deleteSavedMovie(movie._id)
        .then(() => {
          movie.owner = null;
          const updatedSavedMovies = savedMovies.filter((mov) => mov._id !== movie._id);
          const updatedMovies = movies.filter((mov) => {
            if (mov.id === movie.movieId) {
              mov.owner = null;
            }
            return mov;
          });
          setSavedMovies(updatedSavedMovies);
          setMovies(updatedMovies);
          localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
          localStorage.setItem('found-movies', JSON.stringify(updatedMovies));
        })
        .catch((err) => {
          setServerError(err);
        });
    } else {
      movieFormatFixer(movie);
      mainApi.saveNewMovie(movie)
        .then((savedMovie) => {
          movie.owner = currentUser._id;
          movie._id = savedMovie._id;
          const savedMoviesArr = savedMovies.map((i) => i);
          savedMoviesArr.push(savedMovie);
          setSavedMovies(savedMoviesArr);
          localStorage.setItem('savedMovies', JSON.stringify(savedMoviesArr));
        })
        .catch((err) => {
          setServerError(err);
        });
    }
  };

  // Сортировка фильмов по категории
  const sortMovies = (category) => {
    const filtredList = JSON.parse(localStorage.getItem(`${category}`));
    try {
      const list = searchMovies(filtredList, category);
      searchSavedMovies(list, savedMovies, currentUser._id);
      category === 'movies' ? setMovies(list) : setSavedMovies(list);
    } catch (err) {
      setServerError(err);
    }
  };

  // Функция поиска фильмов
  const handleSearchMovies = (category) => {
    setServerError('');
    if (localStorage.getItem('movies')) {
      sortMovies(category);
      return;
    }
    setIsLoading(true);
    moviesApi.getFilms()
      .then((moviesList) => {
        localStorage.setItem('movies', JSON.stringify(moviesList));
        sortMovies(category);
        setIsCardsShown(true);
      })
      .catch((err) => {
        console.warn(err);
        if (err === 'Ошибка 404 Not Found') {
          setServerError(systemMessages.REQUEST_ERROR);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const openBurger = () => {
    setIsBurgerOpened(true);
  };

  // // Запрос на авторизацию
  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if (data._id) {
          localStorage.setItem('jwt', data._id);
          setServerError('');
          setIsLoggedIn(true);
          setIsSuccess(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.warn(err);
        setIsSuccess(false);
        if (err === 'Ошибка 401 Unauthorized') {
          setServerError(systemMessages.WRONG_CREDENTIALS);
        } else {
          setServerError(systemMessages.DEFAULT_ERROR);
        }
      });
  };

  // Запрос на регистрацию
  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then((res) => {
        if (res._id) {
          handleLogin(email, password);
          setIsSuccess(true);
        }
      })
      .catch((err) => {
        console.warn(err);
        setIsSuccess(false);
        if (err === 'Ошибка 409 Conflict') {
          setServerError(systemMessages.EMAIL_CONFLICT);
        } else if (err === 'Ошибка 400 Bad Request') {
          setServerError(systemMessages.REGISTRATION_ERROR);
        } else {
          setServerError(systemMessages.DEFAULT_ERROR);
        }
      });
  };

  // Выход
  const handleSignout = () => {
    localStorage.removeItem('jwt');
    auth.signout();
    setIsLoggedIn(false);
    localStorage.clear();
    setCurrentUser({ _id: '', name: '', meail: '' });
  };

  // Измененние данных пользователя
  const handleUpdateUser = (userInfo) => {
    mainApi.setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.warn(err);
        if (err === 'Ошибка 409 Conflict') {
          setServerError(systemMessages.EMAIL_CONFLICT);
        } else if (err === 'Ошибка 400 Bad Request') {
          setServerError(systemMessages.REGISTRATION_ERROR);
        } else {
          setServerError(systemMessages.DEFAULT_ERROR);
        }
      });
    setCurrentUser(userInfo);
  };

  // Проверка токена
  const tokenCheck = () => {
    const token = localStorage.getItem('jwt');

    if (token) {
      auth.checkToken()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          } else {
            setIsLoggedIn(false);
            handleSignout();
          }
        })
        .catch((err) => console.warn(err));
    }
  };

  // Запрсоы на получение фильмов и данных о пользователе
  const getInitialData = () => {
    setMovies([]);
    Promise.all([mainApi.getSavedMovies(), mainApi.getUserInfo()])
      .then(([initialMiovies, initialUserDara]) => {
        setCurrentUser(initialUserDara);
        localStorage.setItem('savedMovies', JSON.stringify(initialMiovies));
        setSavedMovies(initialMiovies);
        if (localStorage.getItem('found-movies')) {
          const listOfMovies = savedMovieQualifier(JSON.parse(localStorage.getItem('found-movies')), initialMiovies, initialUserDara._id);
          setMovies(listOfMovies);
        }
      })
      .catch((err) => {
        serverError(err);
      });
  };

  // Проверка токена при монтировании
  useEffect(() => {
    tokenCheck();
    if (isLoggedIn) {
      getInitialData();
    }
  }, [isLoggedIn]);

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
          <Route
            path="movies"
            element={
              <ProtectedRoute
                saved={false}
                isLoggedIn={isLoggedIn}
                component={Movies}
                isLoading={isLoading}
                handleSearchMovies={handleSearchMovies}
                isShown={isCardsShown}
                error={serverError}
                moviesList={movies}
                toggleMovieSaved={toggleMovieSaved}
                category="movies"
              />
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute
                saved
                isLoggedIn={isLoggedIn}
                component={SavedMovies}
                isLoading={isLoading}
                handleSearchMovies={handleSearchMovies}
                moviesList={savedMovies}
                isShown={isCardsShown}
                error={serverError}
                toggleMovieSaved={toggleMovieSaved}
                category="savedMovies"
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={Profile}
                onUpdate={handleUpdateUser}
                handleSignout={handleSignout}
                error={serverError}
                setError={setServerError}
              />
            }
          />
          <Route
            path="signup"
            element={
              <Register
                handleRegistration={handleRegistration}
                isSuccess={isSuccess}
                error={serverError}
              />
            }
          />
          <Route
            path="signin"
            element={
              <Login
                handleLogin={handleLogin}
                error={serverError}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
