/**
 * API Request Caching and Deduplication Utility
 * Prevents duplicate API calls and caches responses for better performance
 */

const apiCache = new Map();
const pendingRequests = new Map();
const MAX_CACHE_ENTRIES = 80;

const CACHE_DURATIONS = {
  default: 5 * 60 * 1000,
  short: 1 * 60 * 1000,
  long: 30 * 60 * 1000,
  static: 24 * 60 * 60 * 1000,
};

const getCacheKey = (url, options = {}) => {
  const method = options.method || 'GET';
  const body = options.body ? JSON.stringify(options.body) : '';
  return `${method}:${url}:${body}`;
};

const isCacheValid = (cachedItem) => {
  if (!cachedItem) return false;
  return Date.now() < cachedItem.expiresAt;
};

const setLru = (key, value) => {
  if (apiCache.has(key)) apiCache.delete(key);
  apiCache.set(key, value);
  while (apiCache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = apiCache.keys().next().value;
    apiCache.delete(oldestKey);
  }
};

const touchLru = (key) => {
  const item = apiCache.get(key);
  if (!item) return;
  apiCache.delete(key);
  apiCache.set(key, item);
};

/**
 * Cached fetch with request deduplication
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @param {string} cacheType - Cache duration type ('default', 'short', 'long', 'static')
 * @returns {Promise<Response>} - Cached or fresh response
 */
export const cachedFetch = async (url, options = {}, cacheType = 'default') => {
  const method = options.method || 'GET';

  if (method !== 'GET') {
    return fetch(url, options);
  }

  const cacheKey = getCacheKey(url, options);
  const cacheDuration = CACHE_DURATIONS[cacheType] || CACHE_DURATIONS.default;

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const cachedItem = apiCache.get(cacheKey);
  if (isCacheValid(cachedItem)) {
    touchLru(cacheKey);
    return Promise.resolve(cachedItem.response.clone());
  }

  const fetchPromise = fetch(url, options)
    .then(async (response) => {
      if (response.ok) {
        setLru(cacheKey, {
          response: response.clone(),
          expiresAt: Date.now() + cacheDuration,
          timestamp: Date.now(),
        });
      }

      pendingRequests.delete(cacheKey);
      return response;
    })
    .catch((error) => {
      pendingRequests.delete(cacheKey);
      throw error;
    });

  pendingRequests.set(cacheKey, fetchPromise);

  return fetchPromise;
};

const cleanupCache = () => {
  const now = Date.now();
  for (const [key, item] of apiCache.entries()) {
    if (now >= item.expiresAt) {
      apiCache.delete(key);
    }
  }
};

export const clearCache = (url, options = {}) => {
  const cacheKey = getCacheKey(url, options);
  apiCache.delete(cacheKey);
};

export const clearAllCache = () => {
  apiCache.clear();
  pendingRequests.clear();
};

export const prefetchAPI = async (url, options = {}, cacheType = 'default') => {
  return cachedFetch(url, options, cacheType).catch(() => {});
};

if (typeof window !== 'undefined') {
  setInterval(cleanupCache, 5 * 60 * 1000);
}
