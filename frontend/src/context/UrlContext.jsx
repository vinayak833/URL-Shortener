// context/UrlContext.jsx - urls list, CRUD state
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { urlService } from '../services/urlService.js';
import { useAuth } from '../hooks/useAuth.js';

export const UrlContext = createContext(null);

export function UrlProvider({ children }) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchUrls = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await urlService.getUrls();
      if (data.success) {
        setUrls(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load links');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const addUrl = async (originalUrl, customCode, title) => {
    try {
      const data = await urlService.shorten(originalUrl, customCode, title);
      if (data.success) {
        setUrls(prev => [data.data, ...prev]);
        return { success: true, data: data.data };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Error shortening link' };
    }
  };

  const removeUrl = async (id) => {
    try {
      const data = await urlService.deleteUrl(id);
      if (data.success) {
        setUrls(prev => prev.filter(u => u._id !== id));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Error deleting link' };
    }
  };

  return (
    <UrlContext.Provider value={{ urls, loading, error, fetchUrls, addUrl, removeUrl }}>
      {children}
    </UrlContext.Provider>
  );
}
