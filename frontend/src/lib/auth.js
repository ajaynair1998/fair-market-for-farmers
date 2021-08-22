import { api } from './api';

export const signup = (username, password) => {
  return api.post('/register/', {
    username,
    password,
  });
};

export const testVar = Math.random();
