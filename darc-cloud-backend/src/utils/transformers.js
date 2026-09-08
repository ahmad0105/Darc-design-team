const JSONB_PASSTHROUGH_KEYS = new Set(['custom_fields', 'permissions', 'details']);

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
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = toSnakeCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}
