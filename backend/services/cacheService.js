// services/cacheService.js - optional in-memory caching layer
const cache = new Map();

export const cacheService = {
  get(key) {
    const item = cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      cache.delete(key);
      return null;
    }
    return item.value;
  },
  set(key, value, ttlSeconds = 300) {
    cache.set(key, {
      value,
      expiry: Date.now() + ttlSeconds * 1000
    });
  },
  del(key) {
    cache.delete(key);
  },
  flush() {
    cache.clear();
  }
};
