// hooks/useUrls.js
import { useContext } from 'react';
import { UrlContext } from '../context/UrlContext.jsx';

export function useUrls() {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error('useUrls must be used within a UrlProvider');
  }
  return context;
}
