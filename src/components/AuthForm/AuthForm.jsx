/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-unused-expressions */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../utils/hooks/useFormValidation';

import './AuthForm.scss';

import ServerMessage from '../ServerMessage/ServerMessage';
import Logo from '../Logo/Logo';

function AuthForm({
  isRegisterForm,
  handleLogin,
  handleRegistration,
  isSuccess,
  error,
  setError,
}) {
  const {
    valuesObj,
    errorMessageObj,
    isValid,
    handleChange,
    resetValidation,
  } = useFormValidation({ name: '', email: '', password: '' });

  useEffect(() => {
    resetValidation();
    setError('');
  }, []);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      isRegisterForm
        ? handleRegistration(valuesObj.email, valuesObj.password, valuesObj.name)
        : handleLogin(valuesObj.email, valuesObj.password);
      if (isSuccess) {
        resetValidation();
      }
    }
  };

  return (
    <main className="auth-form">
      <Logo />
      <h2 className="auth-form__welcome">{isRegisterForm ? 'Добро пожаловать!' : 'Рады видеть!'}</h2>
      <form className="auth-form__form" onSubmit={handleFormSubmit}>
        <fieldset className="auth-form__fieldset">
          {
            isRegisterForm
            && (
              <>
                <label htmlFor="name" className="auth-form__label">Имя</label>
                <input
                  type="text"
                  className={`auth-form__input ${errorMessageObj.name && 'auth-form__input_incorrect'}`}
                  name="name"
                  minLength={2}
                  maxLength={30}
                  id="name"
                  value={valuesObj.name || ''}
                  onChange={handleChange}
                  placeholder="Введите имя"
                  required
                />
                <span className="auth-form__input-error">{errorMessageObj.name}</span>
              </>
            )
          }
          <label htmlFor="email" className="auth-form__label">E-mail</label>
          <input
            type="email"
            className={`auth-form__input ${errorMessageObj.email && 'auth-form__input_incorrect'}`}
            name="email"
            id="email"
            value={valuesObj.email || ''}
            onChange={handleChange}
            placeholder="Введите почту"
            required
          />
          <span className="auth-form__input-error">{errorMessageObj.email}</span>
          <label htmlFor="password" className="auth-form__label">Пароль</label>
          <input
            type="password"
            className={`auth-form__input ${errorMessageObj.password && 'auth-form__input_incorrect'}`}
            name="password"
            id="password"
            minLength="3"
            value={valuesObj.password || ''}
            onChange={handleChange}
            placeholder="Пароль не короче трёх символов"
            required
          />
          <span className="auth-form__input-error">{errorMessageObj.password}</span>
        </fieldset>
        {error && <ServerMessage error={error} />}
        <button className={`auth-form__button ${!isValid && 'auth-form__button_innactive'}`} type="submit" disabled={!isValid}>{isRegisterForm ? 'Зарегистрироваться' : 'Войти'}</button>
      </form>
      <span className="auth-form__auth-container">
        {
          isRegisterForm
            ? (
              <>
                <p className="auth-form__auth-text">Уже зарегистрированы?</p>
                <Link to="/signin" className="auth-form__auth-link">Войти</Link>
              </>
            )
            : (
              <>
                <p className="auth-form__auth-text">Ещё не зарегистрированы?</p>
                <Link to="/signup" className="auth-form__auth-link">Регистрация</Link>
              </>
            )
        }
      </span>
    </main>
  );
}

export default AuthForm;
