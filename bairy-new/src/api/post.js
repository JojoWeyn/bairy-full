import api from './api';

export const postSendMessage = async (formData) => {
  try {
    const response = await api.post('/v1/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    throw error;
  }
};




