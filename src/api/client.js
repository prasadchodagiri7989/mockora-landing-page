import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/api` : 'http://localhost:5000/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
