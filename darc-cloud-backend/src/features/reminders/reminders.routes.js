import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { isProjectVisible } from '../../utils/permissions.js';
import { toCamelCase } from '../../utils/transformers.js';
import { generateSecureId } from '../../core/security.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// POST /api/reminders — Create a reminder
app.post('/', async (c) => {
  const body = await c.req.json();
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  let task = null;
  let targetUserId = userId;

  if (body.taskId) {
    if (!/^[a-zA-Z0-9_-]{3,64}$/.test(body.taskId)) {
      return c.json({ error: 'معرف المهمة غير صالح' }, 400);
    }
    const { data } = await supabase
      .from('tasks')
      .select('id, project_id, assignee_id, title_ar, title_en, custom_fields')
      .eq('id', body.taskId)
      .single();

    if (!data) {
      return c.json({ error: 'المهمة المحددة غير موجودة' }, 404);
    }

    task = data;
    if (!(await isProjectVisible(supabase, userId, roleId, task.project_id))) {
      return c.json({ error: 'غير مصرح لك بإضافة تذكير لمهمة في هذا المشروع' }, 403);
    }
    if (task.assignee_id) {
      targetUserId = task.assignee_id;
    }
  }

  const id = generateSecureId('rem_');
  let remindAt = null;
  if (body.remindAt) {
    const parsed = new Date(body.remindAt);
    if (!isNaN(parsed.getTime())) {
      remindAt = parsed.toISOString();
    }
  }
  const noteAr = (body.noteAr || (task ? `تذكير بمهمة: ${task.title_ar}` : 'تذكير')).slice(0, 500);
  const noteEn = (body.noteEn || (task ? `Task reminder: ${task.title_en || task.title_ar}` : 'Reminder')).slice(0, 500);

  const { data, error } = await supabase.from('reminders').insert([{
    id,
    user_id: targetUserId,
    task_id: body.taskId || null,
    title_ar: noteAr,
    title_en: noteEn,
    note_ar: noteAr,
    note_en: noteEn,
    remind_at: remindAt,
    created_by: userId,
    is_sent: false,
    sent_at: null
  }]).select().single();

  // Also sync with task custom_fields.reminders array for instant fast UI caching
  if (task && body.taskId && remindAt) {
    try {
      const existingReminders = Array.isArray(task.custom_fields?.reminders) ? task.custom_fields.reminders : [];
      const newEntry = { id, remindAt, noteAr, createdBy: userId, createdAt: new Date().toISOString() };
      const updatedList = [...existingReminders.filter(r => r.id !== id), newEntry];
      const fields = { ...(task.custom_fields || {}), reminders: updatedList };
      await supabase.from('tasks').update({ custom_fields: fields }).eq('id', body.taskId);
    } catch (e) {
      console.warn('[Reminders] Custom fields sync note:', e.message);
    }
  }

  if (error) {
    return c.json({ ok: true, fallback: true, reminder: { id, remindAt, noteAr, taskId: body.taskId } }, 201);
  }

  return c.json({ ok: true, reminder: toCamelCase(data) }, 201);
});

// GET /api/reminders — Get reminders (supports ?taskId=...)
app.get('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const taskId = c.req.query('taskId');
  const supabase = c.get('supabase');

  let query = supabase.from('reminders').select('*');
  if (taskId) {
    if (!/^[a-zA-Z0-9_-]{3,64}$/.test(taskId)) {
      return c.json({ error: 'معرف المهمة غير صالح' }, 400);
    }
    const { data: task } = await supabase.from('tasks').select('id, project_id, custom_fields').eq('id', taskId).single();
    if (!task) return c.json({ reminders: [] });
    if (!(await isProjectVisible(supabase, userId, roleId, task.project_id))) {
      return c.json({ error: 'غير مصرح لك بعرض تذكيرات هذه المهمة.' }, 403);
    }
    query = query.eq('task_id', taskId);
  } else {
    query = query.eq('user_id', userId).is('sent_at', null);
  }

  const { data, error } = await query.order('remind_at', { ascending: true });
  if (error) {
    if (taskId) {
      // Fallback: check task custom_fields
      const { data: task } = await supabase.from('tasks').select('custom_fields').eq('id', taskId).single();
      const list = task?.custom_fields?.reminders || [];
      return c.json({ reminders: list });
    }
    return c.json({ reminders: [] });
  }

  return c.json({ reminders: toCamelCase(data || []) });
});

// DELETE /api/reminders/:id — Delete a reminder
app.delete('/:id', async (c) => {
  const id = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(id)) {
    return c.json({ error: 'معرف التذكير غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: reminder } = await supabase.from('reminders').select('*').eq('id', id).single();
  if (reminder) {
    if (reminder.user_id !== userId && reminder.created_by !== userId && roleId !== 'admin') {
      return c.json({ error: 'غير مصرح بحذف هذا التذكير' }, 403);
    }
    await supabase.from('reminders').delete().eq('id', id);

    // Also remove from task custom_fields if applicable
    if (reminder.task_id) {
      const { data: task } = await supabase.from('tasks').select('custom_fields').eq('id', reminder.task_id).single();
      if (task && Array.isArray(task.custom_fields?.reminders)) {
        const filtered = task.custom_fields.reminders.filter(r => r.id !== id);
        await supabase.from('tasks').update({ custom_fields: { ...task.custom_fields, reminders: filtered } }).eq('id', reminder.task_id);
      }
    }
  }

  return c.json({ ok: true });
});

export default app;
