import api from './api';

export const getImagesGallery = async () => {
  const response = await api.get('/v1/image?category=gallery');
  return response.data;
};

export const getImagesAll = async () => {
  const response = await api.get('/v1/image');
  return response.data;
};

export const getImageBanner = async () => {
  const response = await api.get('/v1/image?category=banner');
  return response.data;
};

export const getService = async () => {
  const response = await api.get('/v1/service');
  return response.data;
};

export const getAccommodation = async () => {
  const response = await api.get('/v1/accommodation');
  return response.data;
};

