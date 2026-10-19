// Lightweight, zero-dependency validation & sanitization utilities (Pillar 2: Zero-Trust Security)

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Trims whitespace and strips dangerous script injection patterns.
 */
export function sanitizeString(val) {
  if (typeof val !== 'string') return val;
  let clean = val.trim();
  // Strip raw script tags
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Strip javascript: pseudo-protocols
  clean = clean.replace(/javascript\s*:/gi, '');
  return clean;
}

/**
 * Strips dangerous prototype pollution keys and sanitizes string fields.
 */
export function sanitizeObject(obj, allowedKeys = null) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;

  const result = {};
  const keys = allowedKeys || Object.keys(obj);

  for (const key of keys) {
    if (DANGEROUS_KEYS.has(key)) continue;
    if (obj[key] === undefined) continue;

    const val = obj[key];
    if (typeof val === 'string') {
      result[key] = sanitizeString(val);
    } else if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = sanitizeObject(val);
    } else {
      result[key] = val;
    }
  }

  return result;
}

/**
 * Validates entity ID format.
 */
export function isValidId(id, prefix = '') {
  if (!id || typeof id !== 'string') return false;
  if (prefix && !id.startsWith(prefix)) return false;
  return /^[a-zA-Z0-9_-]{3,64}$/.test(id);
}

/**
 * Validates string length within min and max boundaries.
 */
export function validateLength(val, min = 1, max = 255) {
  if (typeof val !== 'string') return false;
  const len = val.trim().length;
  return len >= min && len <= max;
}

/**
 * Validates that a value is one of allowed enum values.
 */
export function validateEnum(val, allowedArray, defaultValue = null) {
  if (allowedArray.includes(val)) return val;
  return defaultValue;
}

/**
 * Validates standard email address format.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
