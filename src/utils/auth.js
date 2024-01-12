/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable arrow-body-style */
import { mainApiSettings } from './utils';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
};

const request = (endpoint, options) => {
  return (fetch(`${mainApiSettings.baseUrl}${endpoint}`, options).then((res) => checkResponse(res)));
};

export const register = (email, password, name) => {
  return request(
    '/signup',
    {
      method: 'POST',
      headers: mainApiSettings.headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }
  );
};

export const authorize = (email, password) => {
  return request(
    '/signin',
    {
      method: 'POST',
      credentials: 'include',
      headers: mainApiSettings.headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }
  );
};

export const signout = () => {
  return request(
    '/signout',
    {
      method: 'POST',
      credentials: 'include',
    }
  );
};

export const checkToken = () => {
  return request(
    '/users/me',
    {
      method: 'GET',
      credentials: 'include',
      headers: mainApiSettings.headers,
    }
  );
};
