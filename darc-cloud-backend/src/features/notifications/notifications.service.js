export async function createNotification(supabase, { userId, type, content, taskId, projectId }) {
  try {
    const id = 'notif_' + Math.random().toString(36).substr(2, 9);
    await supabase.from('notifications').insert([{
      id, user_id: userId, type, content,
      task_id: taskId || null,
      project_id: projectId || null,
      read: false,
      read_at: null
    }]);
  } catch(e) {
    console.warn('[Notifications] Could not create:', e.message);
  }
}

export function extractMentions(content, users) {
  const mentioned = [];
  const regex = /@(\w+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const handle = match[1].toLowerCase();
    const user = users.find(u =>
      (u.name || '').toLowerCase().replace(/\s/g,'').includes(handle) ||
      (u.id || '').toLowerCase().includes(handle)
    );
    if (user && !mentioned.includes(user.id)) mentioned.push(user.id);
  }
  return mentioned;
}
