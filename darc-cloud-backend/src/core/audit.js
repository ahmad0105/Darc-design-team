export async function logAudit(supabase, { userId, action, entityType, entityId, payload = {} }) {
  try {
    const id = 'aud_' + Math.random().toString(36).substr(2, 12);
    await supabase.from('audit_logs').insert([{
      id, user_id: userId, action, entity_type: entityType, entity_id: entityId, details: payload
    }]);
  } catch (e) {
    console.warn('[Audit] Failed to log:', e.message);
  }
}
