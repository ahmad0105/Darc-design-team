const SENSITIVE_KEYS = new Set(['password', 'password_hash', 'passwordHash', 'newPassword', 'oldPassword', 'token', 'inviteToken', 'invite_token', 'resetToken', 'turnstileToken', 'secret']);
const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function sanitizeAuditDetails(obj, depth = 0) {
  if (!obj || typeof obj !== 'object' || depth > 4) return obj;
  if (Array.isArray(obj)) return obj.slice(0, 50).map(x => sanitizeAuditDetails(x, depth + 1));

  const clean = {};
  for (const [key, val] of Object.entries(obj)) {
    if (DANGEROUS_KEYS.has(key)) continue;
    if (SENSITIVE_KEYS.has(key)) {
      clean[key] = '[REDACTED]';
    } else if (val !== null && typeof val === 'object') {
      clean[key] = sanitizeAuditDetails(val, depth + 1);
    } else if (typeof val === 'string') {
      clean[key] = val.slice(0, 1000);
    } else {
      clean[key] = val;
    }
  }
  return clean;
}

export async function logAudit(supabase, { userId, action, entityType, entityId, payload = {} }) {
  try {
    const { default: crypto } = await import('node:crypto');
    const id = 'aud_' + (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '').slice(0, 16) : crypto.randomBytes(8).toString('hex'));
    const safePayload = sanitizeAuditDetails(payload);
    await supabase.from('audit_logs').insert([{
      id, user_id: userId, action, entity_type: entityType, entity_id: entityId, details: safePayload
    }]);
  } catch (e) {
    console.warn('[Audit] Failed to log:', e.message);
  }
}
