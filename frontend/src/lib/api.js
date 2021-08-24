import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: Cookies.get('authToken'),
  },
});
