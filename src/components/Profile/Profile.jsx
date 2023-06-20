import { useState } from 'react';

import './Profile.scss';

function Profile({ userInfo }) {
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  return (
    <main className="profile">
      <h2 className="profile__welcome">
        {`Привет, ${userInfo.name}!`}
      </h2>
      <form className="profile__form">
        <label className="profile__label">
          <input
            type="text"
            name="name"
            disabled={isInputDisabled}
            value={userInfo.name || ''}
            className="profile__label"
            placeholder="Изменить имя"
            required
          />
        </label>
        <label className="profile__label">
          <input
            type="email"
            name="email"
            disabled={isInputDisabled}
            value={userInfo.email || ''}
            className="profile__label"
            placeholder="Изменить почту"
            required
          />
        </label>
      </form>
    </main>
  );
}

export default Profile;
