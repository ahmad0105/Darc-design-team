import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { hasPermission } from '../../utils/permissions.js';
import { toCamelCase } from '../../utils/transformers.js';
import { invalidateBootstrapCache } from '../../core/cache.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// Helper to generate next project code safely & efficiently
async function getNextProjectCode(supabase) {
  const { data: recentProjects } = await supabase.from('projects').select('code').order('created_at', { ascending: false }).limit(20);
  let maxNum = 0;
  if (recentProjects && recentProjects.length > 0) {
    for (const p of recentProjects) {
      if (!p.code) continue;
      const m = p.code.match(/(\d+)/);
      if (m) {
        const num = parseInt(m[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
  }
  return `DARC-${String(maxNum + 1).padStart(3, '0')}`;
}

// POST /api/projects
app.post('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  
  if (!(await hasPermission(supabase, userId, roleId, 'create_projects'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const body = await c.req.json();
  const managerId = body.managerId || userId;
  
  let code = body.code ? body.code.trim() : null;
  if (!code) {
    code = await getNextProjectCode(supabase);
  }

  const projectData = {
    code,
    name_ar: String(body.nameAr || body.name || '').trim(),
    name_en: String(body.nameEn || body.name || '').trim(),
    client_ar: String(body.clientAr || '').trim(),
    client_en: String(body.clientEn || body.clientAr || '').trim(),
    description_ar: String(body.descriptionAr || '').trim(),
    description_en: String(body.descriptionEn || body.descriptionAr || '').trim(),
    lifecycle: ['planning', 'active', 'on_hold', 'completed', 'archived', 'cancelled'].includes(body.lifecycle) ? body.lifecycle : 'planning',
    health: ['on_track', 'at_risk', 'off_track'].includes(body.health) ? body.health : 'on_track',
    start_date: body.startDate || null,
    due_date: body.dueDate || null,
    manager_id: managerId,
    progress_mode: 'weighted',
    demo: false
  };

  if (!projectData.name_ar) return c.json({ error: 'اسم المشروع مطلوب' }, 400);

  const { data: project, error: pErr } = await supabase.from('projects').insert([projectData]).select().single();
  if (pErr) throw pErr;

  // Add members in parallel with audit log
  const members = [{ project_id: project.id, user_id: userId, role_id: 'project_manager' }];
  if (managerId !== userId) {
    members.push({ project_id: project.id, user_id: managerId, role_id: 'project_manager' });
  }
  
  await Promise.all([
    supabase.from('project_members').upsert(members, { onConflict: 'project_id,user_id' }),
    supabase.from('audit_logs').insert([{ user_id: userId, action: 'create', entity_type: 'project', entity_id: project.id, details: { name: project.name_ar } }])
  ]);

  invalidateBootstrapCache();

  return c.json({ project: toCamelCase(project) }, 201);
});

// PATCH /api/projects/:id
app.patch('/:id', async (c) => {
  const projectId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'edit_projects', projectId))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const body = await c.req.json();
  const updates = {};
  
  const fieldMap = { code: 'code', nameAr: 'name_ar', nameEn: 'name_en', clientAr: 'client_ar', clientEn: 'client_en', descriptionAr: 'description_ar', descriptionEn: 'description_en', startDate: 'start_date', dueDate: 'due_date', managerId: 'manager_id', lifecycle: 'lifecycle', health: 'health' };
  
  for (const [camel, snake] of Object.entries(fieldMap)) {
    if (body[camel] !== undefined) {
      let val = body[camel];
      if (['start_date', 'due_date', 'manager_id'].includes(snake)) {
        val = val ? val : null;
      }
      updates[snake] = val;
    }
  }

  updates.updated_at = new Date().toISOString();

  const { data: project, error } = await supabase.from('projects').update(updates).eq('id', projectId).select().single();
  if (error) throw error;

  if (updates.manager_id) {
    await supabase.from('project_members').upsert([{ project_id: projectId, user_id: updates.manager_id, role_id: 'project_manager' }], { onConflict: 'project_id,user_id' });
  }

  supabase.from('audit_logs').insert([{ user_id: userId, action: 'update', entity_type: 'project', entity_id: projectId, details: body }]).then().catch(() => {});

  invalidateBootstrapCache();

  return c.json({ project: toCamelCase(project) });
});

// DELETE /api/projects/:id
app.delete('/:id', async (c) => {
  const projectId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'edit_projects', projectId))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const now = new Date().toISOString();
  const [delRes] = await Promise.all([
    supabase.from('projects').update({ lifecycle: 'cancelled', updated_at: now, deleted_at: now }).eq('id', projectId),
    supabase.from('tasks').update({ deleted_at: now }).eq('project_id', projectId),
    supabase.from('audit_logs').insert([{ user_id: userId, action: 'delete', entity_type: 'project', entity_id: projectId }])
  ]);
  
  if (delRes.error) throw delRes.error;

  invalidateBootstrapCache();

  return c.json({ ok: true });
});

// POST /api/projects/:id/clone
app.post('/:id/clone', async (c) => {
  const originalProjectId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'create_projects'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const body = await c.req.json();
  
  // 1. Fetch original project and generate next code
  const [origRes, code] = await Promise.all([
    supabase.from('projects').select('*').eq('id', originalProjectId).is('deleted_at', null).single(),
    getNextProjectCode(supabase)
  ]);

  const originalProject = origRes.data;
  if (!originalProject || origRes.error) return c.json({ error: 'المشروع غير موجود' }, 404);

  const projectData = {
    ...originalProject,
    id: undefined,
    created_at: undefined,
    updated_at: undefined,
    fts: undefined,
    code,
    name_ar: body.newNameAr || body.nameAr || (originalProject.name_ar + ' (نسخة)'),
    name_en: body.nameEn || (originalProject.name_en + ' (Copy)'),
    due_date: body.dueDate || originalProject.due_date,
    lifecycle: 'planning',
    health: 'on_track'
  };
  
  Object.keys(projectData).forEach(key => projectData[key] === undefined && delete projectData[key]);

  // 2. Insert cloned project
  const { data: clonedProject, error: cErr } = await supabase.from('projects').insert([projectData]).select().single();
  if (cErr) throw cErr;

  const newProjectId = clonedProject.id;

  // 3. Fetch Members & Tasks in PARALLEL
  const [membersRes, tasksRes] = await Promise.all([
    body.cloneMembers ? supabase.from('project_members').select('*').eq('project_id', originalProjectId) : Promise.resolve({ data: [] }),
    body.cloneTasks ? supabase.from('tasks').select('*').eq('project_id', originalProjectId).is('deleted_at', null) : Promise.resolve({ data: [] })
  ]);

  const parallelInserts = [];

  if (membersRes.data && membersRes.data.length > 0) {
    const newMembers = membersRes.data.map(m => ({ project_id: newProjectId, user_id: m.user_id, role_id: m.role_id }));
    parallelInserts.push(supabase.from('project_members').upsert(newMembers, { onConflict: 'project_id,user_id' }));
  }

  if (tasksRes.data && tasksRes.data.length > 0) {
    const clonedTasks = tasksRes.data.map(t => {
      const ct = {
        ...t,
        id: undefined,
        fts: undefined,
        project_id: clonedProject.id,
        created_at: undefined,
        updated_at: undefined,
        status: 'not_started',
        progress: 0,
        assignee_id: null,
        reviewer_id: null,
        start_date: null,
        due_date: null
      };
      Object.keys(ct).forEach(key => ct[key] === undefined && delete ct[key]);
      return ct;
    });
    parallelInserts.push(supabase.from('tasks').insert(clonedTasks));
  }

  parallelInserts.push(
    supabase.from('audit_logs').insert([{ user_id: userId, action: 'create', entity_type: 'project', entity_id: newProjectId, details: { name: clonedProject.name_ar, clonedFrom: originalProjectId } }])
  );

  await Promise.all(parallelInserts);

  invalidateBootstrapCache();

  return c.json({ project: toCamelCase(clonedProject) }, 201);
});

export default app;
