import { api } from './api'

export const getOrders = () => {
  return api.get('/transactions/')
    .then(res => res.data);
}