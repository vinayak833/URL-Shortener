// services/authService.js - register, login
import api from './api.js';

export const authService = {
  async register(name, email, password) {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data;
  },
  async login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
