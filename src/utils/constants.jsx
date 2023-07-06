/* eslint-disable import/prefer-default-export */
export const systemMessages = {
  EMPTY_RESULT: 'Ничего не\u00A0найдено',
  REQUEST_ERROR: `Во\u00A0время запроса произошла ошибка.
  Возможно, проблема с\u00A0соединением или сервер недоступен.
  Подождите немного и\u00A0попробуйте ещё раз`,
  EMAIL_CONFLICT: 'Пользователь с\u00A0таким email уже существует',
  REGISTRATION_ERROR: 'При регистрации пользователя произошла ошибка.',
  WRONG_CREDENTIALS: 'Вы\u00A0ввели неправильный логин или пароль.',
  DEFAULT_ERROR: 'На\u00A0сервере произошла ошибка.',
  DATA_UPDATE_SUCCESS: 'Данные успешно изменены',
};

export const SHORTMOVIE_DURATION = 40;

export const CARDS_NUMBER = {
  WIDE: {
    CARDS: 3,
    PAGES: 4,
  },
  MIDDLE: {
    CARDS: 2,
    PAGES: 4,
  },
  NARROW: {
    CARDS: 1,
    PAGES: 5,
  },
};
