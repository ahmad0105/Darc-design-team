export async function logAudit(supabase, { userId, action, entityType, entityId, payload = {} }) {
  try {
    const { default: crypto } = await import('node:crypto');
    const id = 'aud_' + (crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(8).toString('hex'));
    await supabase.from('audit_logs').insert([{
      id, user_id: userId, action, entity_type: entityType, entity_id: entityId, details: payload
    }]);
  } catch (e) {
    console.warn('[Audit] Failed to log:', e.message);
  }
}
