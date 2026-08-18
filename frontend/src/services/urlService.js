// services/urlService.js - shorten, fetch, delete
import api from './api.js';

export const urlService = {
  async shorten(originalUrl, customCode, title) {
    const res = await api.post('/urls', { originalUrl, customCode, title });
    return res.data;
  },
  async getUrls() {
    const res = await api.get('/urls');
    return res.data;
  },
  async deleteUrl(id) {
    const res = await api.delete(`/urls/${id}`);
    return res.data;
  },
  async getStats(code) {
    const res = await api.get(`/stats/${code}`);
    return res.data;
  }
};
