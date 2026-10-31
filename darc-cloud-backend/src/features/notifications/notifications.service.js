export async function createNotification(supabase, { userId, type, titleAr, titleEn, messageAr, messageEn, content, taskId, projectId }) {
  try {
    const { default: crypto } = await import('node:crypto');
    const id = 'notif_' + (crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(8).toString('hex'));
    const finalTitleAr = titleAr || (content ? 'إشعار جديد' : 'تحديث جديد');
    const finalTitleEn = titleEn || (content ? 'New Notification' : 'New Update');
    const finalMsgAr = messageAr || content || '';
    const finalMsgEn = messageEn || content || '';

    await supabase.from('notifications').insert([{
      id,
      user_id: userId,
      type: type || 'general',
      title_ar: finalTitleAr,
      title_en: finalTitleEn,
      message_ar: finalMsgAr,
      message_en: finalMsgEn,
      body_ar: finalMsgAr,
      body_en: finalMsgEn,
      content: content || finalMsgAr,
      task_id: taskId || null,
      project_id: projectId || null,
      read: false,
      read_at: null,
      created_at: new Date().toISOString()
    }]);

    // Dispatch WhatsApp alert to the individual user if they have a real phone number configured
    if (userId) {
      import('../whatsapp/whatsapp.service.js').then(({ dispatchDirectNotificationAlert }) => {
        dispatchDirectNotificationAlert(supabase, userId, {
          title: finalTitleAr,
          content: finalMsgAr,
          type: type || 'general',
          taskId,
          projectId
        }).catch(err => console.warn('[WhatsApp Direct Alert]', err.message));
      }).catch(() => {});
    }
  } catch(e) {
    console.warn('[Notifications] Could not create:', e.message);
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
