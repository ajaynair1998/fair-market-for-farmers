import { api } from './api';

const baseUrl = '/profile';

export const editProfile = (newProfile) => {
  setProfileLocal(newProfile);
  return api.post(baseUrl, newProfile);
};

export const getProfile = () => {
  return api.get(baseUrl).then((res) => res.data);
};

export const setProfileLocal = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const getProfileLocal = () => {
  return JSON.parse(localStorage.getItem('profile'));
};
