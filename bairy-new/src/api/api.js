import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // централизованная обработка ошибок
    return Promise.reject(error.response?.data || error);
  }
);

export default api;