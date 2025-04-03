import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with base config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const register = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }
  return api.post('/register', { name, email, password });
};

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const response = await api.post('/login', { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const getProfile = async () => {
  return api.get('/me');
};

export const logout = () => {
  localStorage.removeItem("token");
  return api.post('/logout');
};

// Validate token on app load
export const validateToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  
  try {
    await api.get('/validate');
    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};
