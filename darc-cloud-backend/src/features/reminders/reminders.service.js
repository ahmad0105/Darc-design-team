import { createNotification } from '../notifications/notifications.service.js';

export async function processDueReminders(supabase) {
  if (!supabase) return { processed: 0 };
  try {
    const nowIso = new Date().toISOString();
    const { data: dueReminders, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('is_sent', false)
      .not('remind_at', 'is', null)
      .lte('remind_at', nowIso)
      .limit(20);

    if (error || !Array.isArray(dueReminders) || dueReminders.length === 0) {
      return { processed: 0 };
    }

    let count = 0;
    for (const rem of dueReminders) {
      try {
        await createNotification(supabase, {
          userId: rem.user_id,
          type: 'reminder',
          titleAr: '⏰ تذكير بموعد',
          titleEn: '⏰ Due Reminder',
          messageAr: rem.note_ar || rem.title_ar || 'لديك تذكير مجدول حان وقته',
          messageEn: rem.note_en || rem.title_en || 'You have a scheduled reminder due now',
          taskId: rem.task_id || null
        });

        await supabase
          .from('reminders')
          .update({ is_sent: true, sent_at: new Date().toISOString() })
          .eq('id', rem.id);

        count++;
      } catch (err) {
        console.warn(`[Reminders] Failed processing reminder ${rem.id}:`, err.message);
      }
    }
    return { processed: count };
  } catch (err) {
    console.warn('[Reminders] processDueReminders error:', err.message);
    return { processed: 0, error: err.message };
  }
}
