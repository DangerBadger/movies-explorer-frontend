/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';

import CurrentUserContext from '../../context/CurrentUserContext';
import useFormValidation from '../../utils/hooks/useFormValidation';

import './Profile.scss';

import ServerMessage from '../ServerMessage/ServerMessage';

function Profile({
  onUpdate,
  handleSignout,
  error,
  setError,
}) {
  const currentUser = useContext(CurrentUserContext);

  const {
    valuesObj,
    errorMessageObj,
    isValid,
    setIsValid,
    handleChange,
    resetValidation,
  } = useFormValidation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    setIsValid(false);
    setIsBlocked(true);
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
    setIsEdited(false);
  }, [currentUser]);

  useEffect(() => {
    resetValidation();
    setError('');
  }, []);

  useEffect(() => {
    setError('');
  }, [isEdited]);

  const enableInputEdit = () => {
    setIsBlocked(false);
    setError('');
  };

  const disableInputEdit = () => setIsBlocked(true);

  const handleChangeName = (evt) => {
    if (evt.target.value !== currentUser.name) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
    setName(evt.target.value);
    handleChange(evt);
  };

  const handleChangeEmail = (evt) => {
    if (evt.target.value !== currentUser.email) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
    setEmail(evt.target.value);
    handleChange(evt);
  };

  const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    disableInputEdit();
    if (isValid && isEdited) {
      onUpdate({
        name,
        email,
      });
    }
    setIsEdited(false);
    resetValidation();
  };

  return (
    <main className="profile">
      <h2 className="profile__welcome">
        {`Привет, ${currentUser.name}!`}
      </h2>
      <form className="profile__form" onSubmit={handleProfileFormSubmit}>
        <div className="profile__input-outer-container">
          <div className="profile__input-inner-container">
            <label htmlFor="name" className="profile__label">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              minLength={2}
              maxLength={30}
              disabled={isBlocked}
              value={name || ''}
              onChange={handleChangeName}
              className={`profile__input ${errorMessageObj.name && 'profile__input_incorrect'}`}
              placeholder="Изменить имя"
              required
            />
          </div>
          <span className="profile__input-error">{errorMessageObj.name}</span>
        </div>
        <div className="profile__input-outer-container">
          <div className="profile__input-inner-container">
            <label htmlFor="email" className="profile__label">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              disabled={isBlocked}
              value={email || ''}
              onChange={handleChangeEmail}
              className="profile__input"
              placeholder="Изменить почту"
              required
            />
          </div>
          <span className="profile__input-error">{errorMessageObj.email}</span>
        </div>
        <div className="profile__error-box">
          {error && <ServerMessage error={error} />}
        </div>
        {isBlocked
          ? <button className="profile__edit-btn" type="button" onClick={enableInputEdit}>Редактировать</button>
          : isEdited
            ? <button
                className={`profile__edit-btn ${!isValid && 'profile__edit-btn_disabled'}`}
                type="submit"
                disabled={!isValid}
              >
                Сохранить
              </button>
            : <button className="profile__edit-btn" type="button" onClick={disableInputEdit}>Отмена</button>}
      </form>
      <button className="profile__edit-btn profile__edit-btn_logout" type="button" onClick={handleSignout}>Выйти из аккаунта</button>
    </main>
  );
}

export default Profile;
