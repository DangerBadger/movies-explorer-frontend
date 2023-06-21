import { useState, useEffect, useContext } from 'react';

import CurrentUserContext from '../../context/CurrentUserContext';
import useFormValidation from '../../utils/hooks/useFormValidation';

import './Profile.scss';

function Profile({ onUpdate, handleLogout }) {
  const {
    valuesObj,
    setValuesObj,
    errorMessageObj,
    isValid,
    handleChange,
    resetValidation,
  } = useFormValidation({ name: '', email: '' });

  const currentUser = useContext(CurrentUserContext);
  const { name, email } = currentUser;

  const [isBlocked, setIsBlocked] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    resetValidation();
  }, []);

  useEffect(() => {
    if (name && email) {
      setValuesObj({
        name,
        email,
      });
    }
  }, [currentUser]);

  const enableInputEdit = () => setIsBlocked(false);
  const disableInputEdit = () => setIsBlocked(true);

  const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    disableInputEdit();
    if (isValid) {
      onUpdate({
        name: valuesObj.name,
        email: valuesObj.email,
      });
    }
    setIsEdited(false);
  };

  const onChange = (evt) => {
    handleChange(evt);
    setIsEdited(true);
  };

  return (
    <main className="profile">
      <h2 className="profile__welcome">
        {`Привет, ${name}!`}
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
              maxLength={55}
              disabled={isBlocked}
              value={valuesObj.name || ''}
              onChange={onChange}
              className="profile__input"
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
              value={valuesObj.email || ''}
              onChange={onChange}
              className="profile__input"
              placeholder="Изменить почту"
              required
            />
          </div>
          <span className="profile__input-error">{errorMessageObj.email}</span>
        </div>
        {
          isBlocked
            ? <button className="profile__edit-btn" type="button" onClick={enableInputEdit}>Редактировать</button>
            : isEdited
              ? <button className="profile__edit-btn" type="submit">Сохранить</button>
              : <button className="profile__edit-btn" type="button" onClick={disableInputEdit}>Отмена</button>
        }
      </form>
      <button className="profile__edit-btn profile__edit-btn_logout" type="button" onClick={handleLogout}>Выйти из аккаунта</button>
    </main>
  );
}

export default Profile;
