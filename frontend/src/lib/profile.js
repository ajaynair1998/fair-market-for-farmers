import { api } from './api';

const baseUrl = '/profile';

export const editProfile = (newProfile) => {
  return api.post(baseUrl, newProfile);
};

export const getProfile = () => {
  return api.get(baseUrl).then((res) => res.data);
};
