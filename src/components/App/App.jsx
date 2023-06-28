/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { movieFormatFixer } from '../../utils/utils';

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
  const [serverError, setServerError] = useState(''); // ''

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
          localStorage.setItem('search-movies', JSON.stringify(updatedMovies));
        })
        .catch((err) => {
          setServerError(err);
        });
    } else {
      movieFormatFixer(movie); // Проверить нужен ли он тут?
      mainApi.saveNewMovie(movie)
        .then((savedMovie) => {
          movie.owner = currentUser._id;
          movie._id = savedMovie._id;

        })
    }
  };

  mainApi.sendMovie(movie)
  //       .then((newMovie) => {
  //         movie.owner = currentUser._id
  //         movie._id = newMovie.data._id;
  //         const arr = savedMovies.map(i => i)
  //         arr.push(newMovie.data)
  //         setSavedMovies(arr)
  //         localStorage.setItem('savedMovies', JSON.stringify(arr))
  //       })
  //       .catch((err) => {
  //         setError(err)
  //         const timer = setTimeout(() => {
  //           setError(null)
  //           clearTimeout(timer);
  //         }, 5000);
  //       });
  //   }
  // }

  // const handleMoviesLike = (movie) => {
  //   const isSaved = movie.owner === currentUser._id;
  //   if (isSaved) {
  //     mainApi.deleteMovie(movie._id)
  //       .then(() => {
  //         movie.owner = null
  //         const newSavedMovies = savedMovies.filter((m) => (m._id !== movie._id))
  //         const newMovies = movies.filter(m => {
  //           if (m.id === movie.movieId) m.owner = null
  //           return m
  //         })
  //         setSavedMovies(newSavedMovies);
  //         localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies))
  //         setMovies(newMovies)
  //         localStorage.setItem('resultSearch-movies', JSON.stringify(newMovies))
  //       })
  //       .catch((err) => {
  //         setError(err)
  //         const timer = setTimeout(() => {
  //           setError(null)
  //           clearTimeout(timer);
  //         }, 5000);
  //       });
  //   } else {
  //     movieNormalizer(movie);
  //     mainApi.sendMovie(movie)
  //       .then((newMovie) => {
  //         movie.owner = currentUser._id
  //         movie._id = newMovie.data._id;
  //         const arr = savedMovies.map(i => i)
  //         arr.push(newMovie.data)
  //         setSavedMovies(arr)
  //         localStorage.setItem('savedMovies', JSON.stringify(arr))
  //       })
  //       .catch((err) => {
  //         setError(err)
  //         const timer = setTimeout(() => {
  //           setError(null)
  //           clearTimeout(timer);
  //         }, 5000);
  //       });
  //   }
  // }

  // Функция поиска фильмов
  const handleSearchMovies = () => {
    setIsLoading(true);
    moviesApi.getFilms()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
        setIsCardsShown(true); // true
      })
      .catch((err) => {
        console.warn(err);
        setServerError(err);
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
          setCurrentUser(data);
          setIsSuccess(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.warn(err);
        setServerError(err);
        setIsSuccess(false);
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
        setServerError(err);
      });
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
          }
        })
        .catch((err) => console.warn(err));
    }
  };

  // Выход
  const handleSignout = () => {
    localStorage.removeItem('jwt');
    auth.signout();
    setIsLoggedIn(false);
    localStorage.clear();
    setCurrentUser({ name: '', meail: '' });
  };

  // Проверка токена при монтировании
  useEffect(() => {
    tokenCheck();
  }, []);

  // Измененние данных пользователя
  const handleUpdateUser = (userInfo) => {
    mainApi.setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.warn(err));
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
          <Route
            path="movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={Movies}
                isLoading={isLoading}
                handleSearchMovies={handleSearchMovies}
                isShown={isCardsShown}
                error={serverError}
                movieList={movies}
              />
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={SavedMovies}
                moviesList={savedMovies}
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
              />
            }
          />
          <Route path="signup" element={<Register handleRegistration={handleRegistration} isSuccess={isSuccess} />} />
          <Route path="signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
