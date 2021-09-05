import { api } from './api';
import Cookies from 'js-cookie';
import { getProfile, getProfileLocal } from './profile';

/**
 * Register user
 * @param {string} username username
 * @param {string} password password
 * @returns Promise with login token
 */
export const signup = (username, password) => {
  return api
    .post('/register/', {
      username,
      password,
    })
    .then((res) => {
      if (res.data.reply.success) {
        return {
          success: res.data.reply.success,
          token: res.data.reply.token.token,
          expires: res.data.reply.token.expires,
        };
      } else {
        return {
          success: res.data.reply.success,
          content: res.data.reply.content,
        };
      }
    });
};

/**
 * Signin user
 * @param {string} username username
 * @param {string} password password
 * @returns Promise with login token
 */
export const signin = (username, password) => {
  return api
    .post('/login', {
      username,
      password,
    })
    .then(async (res) => {
      saveAuth(res.data.authorisation.token);

      const profile = await getProfile();
      localStorage.setItem('profile', JSON.stringify(profile.details));
      console.log('local profile: ', getProfileLocal());

      return res;
    })
    .then((res) => {
      return {
        success: res.data.success,
        token: res.data.authorisation.token,
        expires: res.data.authorisation.expires,
      };
    });
};

export const signout = async () => {
  Cookies.remove('authToken');
};

export const saveAuth = (token) => {
  Cookies.set('authToken', token, {
    expires: 1,
    sameSite: 'Strict',
    secure: true,
  });
};

export const isAuthenticated = () => {
  const authToken = Cookies.get('authToken');

  if (authToken) {
    return authToken;
  }

  return false;
};

export const isAdmin = () => {
  if (!isAuthenticated()) return false;

  if (getProfileLocal().role === 'farmer') return true;

  return false;
};

export const getToken = () => {
  let cookie = Cookies.get('authToken');
  return cookie ? cookie : '';
};
