import crypto from 'node:crypto';
import { NOTIFICATION_CATALOG, buildStandardNotification } from './notifications.catalog.js';

export { NOTIFICATION_CATALOG, buildStandardNotification };

export async function createNotification(supabase, entry) {
  try {
    const std = buildStandardNotification(entry);
    const id = 'notif_' + (crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(8).toString('hex'));

    await supabase.from('notifications').insert([{
      id,
      user_id: entry.userId || entry.user_id,
      type: std.type,
      title_ar: std.titleAr,
      title_en: std.titleEn,
      message_ar: std.messageAr,
      message_en: std.messageEn,
      body_ar: std.messageAr,
      body_en: std.messageEn,
      content: std.content,
      task_id: entry.taskId || entry.task_id || null,
      project_id: entry.projectId || entry.project_id || null,
      read: false,
      read_at: null,
      created_at: new Date().toISOString()
    }]);

    // Dispatch WhatsApp alert to the individual user if they have a real phone number configured
    const targetUserId = entry.userId || entry.user_id;
    if (targetUserId) {
      import('../whatsapp/whatsapp.service.js').then(({ dispatchDirectNotificationAlert }) => {
        dispatchDirectNotificationAlert(supabase, targetUserId, {
          title: std.titleAr,
          content: std.messageAr,
          type: std.type,
          taskId: entry.taskId || entry.task_id,
          projectId: entry.projectId || entry.project_id
        }).catch(err => console.warn('[WhatsApp Direct Alert]', err.message));
      }).catch(() => {});
    }
  } catch(e) {
    console.warn('[Notifications] Could not create:', e.message);
  }
}

export async function createBatchNotifications(supabase, entries = []) {
  if (!Array.isArray(entries) || entries.length === 0) return;
  try {
    const rows = entries.map(entry => {
      const std = buildStandardNotification(entry);
      const id = 'notif_' + (crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(8).toString('hex'));
      return {
        id,
        user_id: entry.userId || entry.user_id,
        type: std.type,
        title_ar: std.titleAr,
        title_en: std.titleEn,
        message_ar: std.messageAr,
        message_en: std.messageEn,
        body_ar: std.messageAr,
        body_en: std.messageEn,
        content: std.content,
        task_id: entry.taskId || entry.task_id || null,
        project_id: entry.projectId || entry.project_id || null,
        read: false,
        read_at: null,
        created_at: new Date().toISOString()
      };
    });

    await supabase.from('notifications').insert(rows);

    // Dispatch WhatsApp direct alerts in parallel
    import('../whatsapp/whatsapp.service.js').then(({ dispatchDirectNotificationAlert }) => {
      for (const row of rows) {
        if (row.user_id) {
          dispatchDirectNotificationAlert(supabase, row.user_id, {
            title: row.title_ar,
            content: row.message_ar,
            type: row.type,
            taskId: row.task_id,
            projectId: row.project_id
          }).catch(err => console.warn('[WhatsApp Direct Alert]', err.message));
        }
      }
    }).catch(() => {});
  } catch (err) {
    console.warn('[Notifications] createBatchNotifications error:', err.message);
  }
}

export function extractMentions(content, users) {
  const mentioned = [];
  const regex = /@([\p{L}\p{N}_.\-]+)/gu;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const handle = match[1].toLowerCase();
    const user = (users || []).find(u =>
      (u.name || '').toLowerCase().replace(/\s/g,'').includes(handle) ||
      (u.nameEn || u.name_en || '').toLowerCase().replace(/\s/g,'').includes(handle) ||
      (u.email || '').toLowerCase().split('@')[0] === handle ||
      (u.id || '').toLowerCase() === handle
    );
    if (user && !mentioned.includes(user.id)) mentioned.push(user.id);
  }
  return mentioned;
}
