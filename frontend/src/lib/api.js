import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});
