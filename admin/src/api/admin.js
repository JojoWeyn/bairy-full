import api from './api';

export const postCreateImage = async (formData) => {
  try {
    const response = await api.post('/v1/admin/image', formData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании фото:', error);
    throw error;
  }
};

export const postUploadImage = async (formData) => {
  try {
    const response = await api.post('/v1/admin/image/upload', formData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке фото:', error);
    throw error;
  }
};

export const postCreateService = async (formData) => {
  try {
    const response = await api.post('/v1/admin/service', formData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании услуги:', error);
    throw error;
  }
};

export const postCreateAccommodation = async (formData) => {
  try {
    const response = await api.post('/v1/admin/accommodation', formData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании размещения:', error);
    throw error;
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await api.delete(`/v1/admin/image/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении изображения:', error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await api.delete(`/v1/admin/service/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении услуги:', error);
    throw error;
  }
};

export const deleteAccommodation = async (id) => {
  try {
    const response = await api.delete(`/v1/admin/accommodation/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении размещения:', error);
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const response = await api.post(`/v1/user/login`, formData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при логине:', error);
    throw error;
  }
}








