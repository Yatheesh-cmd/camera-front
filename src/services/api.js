import axios from 'axios';

const API = axios.create({ baseURL: 'https://camera-back.onrender.com/api' });

API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

// Authentication APIs
export const loginApi = (data) => API.post('/auth/login', data);
export const registerApi = (data) => API.post('/auth/register', data);

// Camera APIs
export const allCamerasApi = (category = '') => API.get(`/cameras?category=${category}`);
export const sampleCamerasApi = () => API.get('/cameras/sample');
export const getCameraByIdApi = (id) => API.get(`/cameras/${id}`);
export const addCameraApi = (data) => API.post('/cameras', { ...data, rentalDays: Number(data.rentalDays) });
export const updateCameraApi = (id, data) => API.put(`/cameras/${id}`, { ...data, rentalDays: Number(data.rentalDays) });
export const deleteCameraApi = (id) => API.delete(`/cameras/${id}`);

// Order APIs
export const initiatePaymentApi = (data) => API.post('/orders/initiate-payment', data);
export const verifyPaymentApi = (data) => API.post('/orders/verify-payment', data);
export const getUserOrdersApi = () => API.get('/orders/user');
export const allOrdersApi = () => API.get('/orders');

// Review APIs
export const createReviewApi = (data) => API.post('/reviews', data);
export const getRentalReviewsApi = (rentalId) => API.get(`/reviews/rental/${rentalId}`);
export const allReviewsApi = () => API.get('/reviews');