import axios from 'axios';
import { getCookie } from "cookies-next/client";

// Create an Axios instance with base URL and default headers
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add request interceptor to include token and store ID headers
instance.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptor for error logging
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // console.error('Response error:', error.response);
    } else if (error.request) {
      // console.error('Request error:', error.request);
    } else {
      // console.error('General error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
