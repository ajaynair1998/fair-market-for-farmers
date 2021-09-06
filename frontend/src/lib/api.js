import axios from 'axios';
import Cookies from 'js-cookie';

// @ts-ignore
console.log('api url: ', process.env.REACT_APP_API_URL);

export const api = axios.create({
  // @ts-ignore
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: Cookies.get('authToken'),
  },
});

// pass auth token with every request
api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = Cookies.get('authToken');

    return config;
  },
  (error) => {
    console.error(error);
  }
);
