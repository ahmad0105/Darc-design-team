const JSONB_PASSTHROUGH_KEYS = new Set(['custom_fields', 'permissions', 'details', 'settings']);

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
    const camelKey = key.indexOf('_') === -1 ? key : key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
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
    return Object.keys(obj).reduce((result, key) => {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') return result;
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = toSnakeCase(obj[key]);
      return result;
    }, {});
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

