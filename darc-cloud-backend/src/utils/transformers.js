const JSONB_PASSTHROUGH_KEYS = new Set(['custom_fields', 'permissions', 'details', 'settings']);
const KEY_CAMEL_CACHE = new Map();
const KEY_SNAKE_CACHE = new Map();

function getCamelKey(key) {
  if (key.indexOf('_') === -1) return key;
  let cached = KEY_CAMEL_CACHE.get(key);
  if (!cached) {
    cached = key.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
    KEY_CAMEL_CACHE.set(key, cached);
  }
  return cached;
}

function getSnakeKey(key) {
  let cached = KEY_SNAKE_CACHE.get(key);
  if (!cached) {
    cached = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    KEY_SNAKE_CACHE.set(key, cached);
  }
  return cached;
}

export function toCamelCase(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) {
    const len = obj.length;
    const res = new Array(len);
    for (let i = 0; i < len; i++) res[i] = toCamelCase(obj[i]);
    return res;
  }
  const result = {};
  for (const key of Object.keys(obj)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    const camelKey = getCamelKey(key);
    const val = obj[key];
    if (JSONB_PASSTHROUGH_KEYS.has(key)) {
      result[camelKey] = val;
    } else {
      result[camelKey] = (val !== null && typeof val === 'object') ? toCamelCase(val) : val;
    }
  }
  return result;
}

export function toSnakeCase(obj) {
  if (Array.isArray(obj)) return obj.map(v => toSnakeCase(v));
  if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj);
    const result = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
      const snakeKey = getSnakeKey(key);
      result[snakeKey] = toSnakeCase(obj[key]);
    }
    return result;
  }
  return obj;
}

/**
 * Sanitizes user custom_fields by completely removing sensitive authentication secrets
 * (resetToken, resetExpiresAt, tokenVersion) before sending to any client.
 */
export function sanitizeUserCustomFields(cf) {
  if (!cf || typeof cf !== 'object') return null;
  const safe = { ...cf };
  delete safe.resetToken;
  delete safe.resetExpiresAt;
  delete safe.tokenVersion;
  delete safe.__proto__;
  delete safe.constructor;
  delete safe.prototype;
  return safe;
}

