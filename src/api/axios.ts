import axios from 'axios';
import {refreshAccessToken} from '../utils/refreshAccessToken'; // adjust the path if needed
import {useAuthStore} from '../zustand/AuthStore';

const axiosInstance = axios.create({
  baseURL: 'https://backend-practice.eurisko.me',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

export const api = axios.create({
  baseURL: 'https://backend-practice.eurisko.me', // replace with your API base URL
});

// Add access token to every request if available
api.interceptors.request.use(config => {
  const {accessToken} = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle 401 errors and refresh token automatically
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
