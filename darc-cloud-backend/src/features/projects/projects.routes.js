import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { hasPermission, isProjectVisible } from '../../utils/permissions.js';
import { toCamelCase } from '../../utils/transformers.js';
import { invalidateBootstrapCache } from '../../core/cache.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// Helper to generate next project code safely & efficiently across all projects (active & 30-day trash)
// Enforces Annual Engineering ISO Standard: DARC-YY-### (e.g. DARC-26-001, DARC-26-002)
export async function getNextProjectCode(supabase, targetYear = null) {
  // ReDoS & Injection Protection (CWE-1333): Enforce strictly 2 digits for year
  const rawYear = targetYear ? String(targetYear).replace(/\D/g, '') : '';
  const year = rawYear.length >= 2 ? rawYear.slice(-2) : String(new Date().getFullYear()).slice(-2);
  const { data: allProjects } = await supabase.from('projects').select('code');
  let maxNum = 0;
  let maxDigits = 3;
  if (allProjects && allProjects.length > 0) {
    for (const p of allProjects) {
      if (!p.code) continue;
      const match = String(p.code).trim().match(/^DARC-(\d{2})-(\d+)$/i);
      if (match && match[1] === year) {
        const numStr = match[2];
        if (numStr.length > maxDigits) maxDigits = numStr.length;
        const lastNum = parseInt(numStr, 10);
        if (!isNaN(lastNum) && lastNum > maxNum) maxNum = lastNum;
      }
    }
  }
  return `DARC-${year}-${String(maxNum + 1).padStart(maxDigits, '0')}`;
}

// POST /api/projects
app.post('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  
  if (!(await hasPermission(supabase, userId, roleId, 'create_projects'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const body = await c.req.json().catch(() => ({}));
  const cleanFk = (val) => (val && typeof val === 'string' && val.trim().length > 0) ? val.trim() : null;
  const rawManagerId = cleanFk(body.managerId || body.manager_id);
  const managerId = rawManagerId || userId;

  // Support idempotent offline sync with pre-assigned project ID
  const providedId = (body.id && typeof body.id === 'string' && /^prj_[a-zA-Z0-9_-]{6,36}$/.test(body.id)) ? body.id : null;
  if (providedId) {
    const { data: existing } = await supabase.from('projects').select('*').eq('id', providedId).single();
    if (existing) {
      return c.json({ project: toCamelCase(existing), idempotent: true }, 200);
    }
  }
  
  let code = body.code ? String(body.code).trim().toUpperCase() : null;
  if (!code) {
    code = await getNextProjectCode(supabase);
  } else {
    // Check if code is already used in active OR trashed projects (30-day retention lock)
    const { data: existingCode } = await supabase
      .from('projects')
      .select('id, code, name_ar, deleted_at')
      .ilike('code', code)
      .maybeSingle();

    if (existingCode) {
      if (existingCode.deleted_at) {
        return c.json({
          error: `كود المشروع "${code}" محجوز لمشروع سابق في سلة المحذوفات (${existingCode.name_ar}). تظل الأكواد محجوزة طيلة فترة الـ 30 يوماً لتمكين الاستعادة دون تضارب.`
        }, 400);
      } else {
        return c.json({
          error: `كود المشروع "${code}" مستخدم بالفعل لمشروع آخر (${existingCode.name_ar}). يرجى استخدام كود مميز.`
        }, 400);
      }
    }
  }

  const projectData = {
    ...(providedId ? { id: providedId } : {}),
    code,
    name_ar: String(body.nameAr || body.name_ar || body.name || '').trim(),
    name_en: String(body.nameEn || body.name_en || body.name || '').trim(),
    client_ar: String(body.clientAr || body.client_ar || '').trim(),
    client_en: String(body.clientEn || body.client_en || body.clientAr || body.client_ar || '').trim(),
    description_ar: String(body.descriptionAr || body.description_ar || '').trim(),
    description_en: String(body.descriptionEn || body.description_en || body.descriptionAr || body.description_ar || '').trim(),
    lifecycle: ['planning', 'active', 'on_hold', 'completed', 'archived', 'cancelled'].includes(body.lifecycle) ? body.lifecycle : 'planning',
    health: ['on_track', 'at_risk', 'off_track'].includes(body.health) ? body.health : 'on_track',
    start_date: body.startDate || body.start_date || null,
    due_date: body.dueDate || body.due_date || null,
    manager_id: managerId,
    progress_mode: 'weighted',
    demo: false
  };

  if (!projectData.name_ar) return c.json({ error: 'اسم المشروع مطلوب' }, 400);

  const { data: project, error: pErr } = await supabase.from('projects').insert([projectData]).select().single();
  if (pErr) throw pErr;

  // Add creator, manager, and any selected team members in parallel with audit log
  const incomingMemberIds = Array.isArray(body.memberIds) ? body.memberIds : (Array.isArray(body.members) ? body.members : []);
  const members = [{ project_id: project.id, user_id: userId, role_id: 'project_manager' }];
  if (managerId !== userId) {
    members.push({ project_id: project.id, user_id: managerId, role_id: 'project_manager' });
  }
  for (const rawMid of incomingMemberIds) {
    const mid = typeof rawMid === 'string' ? rawMid.trim() : '';
    if (mid && (/^[a-zA-Z0-9_-]{3,64}$/.test(mid) || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(mid)) && !members.some(m => m.user_id === mid)) {
      members.push({ project_id: project.id, user_id: mid, role_id: 'member' });
    }
  }
  
  await Promise.all([
    supabase.from('project_members').upsert(members, { onConflict: 'project_id,user_id' }),
    supabase.from('audit_logs').insert([{ user_id: userId, action: 'create', entity_type: 'project', entity_id: project.id, details: { name: project.name_ar, membersCount: members.length } }])
  ]);

  invalidateBootstrapCache();

  c.set('mutationDelta', {
    table: 'projects',
    action: 'INSERT',
    record: toCamelCase(project)
  });

  return c.json({
    project: {
      ...toCamelCase(project),
      memberIds: incomingMemberIds.length ? incomingMemberIds : members.map(m => m.user_id)
    }
  }, 201);
});

// PATCH /api/projects/:id
app.patch('/:id', async (c) => {
  const projectId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{4,50}$/.test(projectId)) {
    return c.json({ error: 'معرف المشروع غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'edit_projects', projectId))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const body = await c.req.json().catch(() => ({}));
  const updates = {};
  
  const fieldMap = { code: 'code', nameAr: 'name_ar', nameEn: 'name_en', clientAr: 'client_ar', clientEn: 'client_en', descriptionAr: 'description_ar', descriptionEn: 'description_en', startDate: 'start_date', dueDate: 'due_date', managerId: 'manager_id', lifecycle: 'lifecycle', health: 'health' };
  
  for (const [camel, snake] of Object.entries(fieldMap)) {
    const valInBody = body[camel] !== undefined ? body[camel] : body[snake];
    if (valInBody !== undefined) {
      let val = valInBody;
      if (['start_date', 'due_date', 'manager_id'].includes(snake)) {
        val = val ? val : null;
      }
      if (snake === 'lifecycle' && val && !['planning', 'active', 'on_hold', 'completed', 'archived', 'cancelled'].includes(val)) {
        continue;
      }
      if (snake === 'health' && val && !['on_track', 'at_risk', 'off_track'].includes(val)) {
        continue;
      }
      updates[snake] = val;
    }
  }

  updates.updated_at = new Date().toISOString();

  if (updates.code) {
    updates.code = String(updates.code).trim().toUpperCase();
    const { data: conflict } = await supabase
      .from('projects')
      .select('id, code, name_ar, deleted_at')
      .ilike('code', updates.code)
      .neq('id', projectId)
      .maybeSingle();

    if (conflict) {
      if (conflict.deleted_at) {
        return c.json({
          error: `كود المشروع "${updates.code}" محجوز لمشروع سابق في سلة المحذوفات (${conflict.name_ar}). تظل الأكواد محجوزة طيلة فترة الـ 30 يوماً لتمكين الاستعادة دون تضارب.`
        }, 400);
      } else {
        return c.json({
          error: `كود المشروع "${updates.code}" مستخدم بالفعل لمشروع آخر (${conflict.name_ar}). يرجى استخدام كود مميز.`
        }, 400);
      }
    }
  }

  const { data: project, error } = await supabase.from('projects').update(updates).eq('id', projectId).select().single();
  if (error) throw error;

  let effectiveMemberIds = [];
  if (Array.isArray(body.memberIds)) {
    const newMemberIds = body.memberIds
      .map(mid => typeof mid === 'string' ? mid.trim() : '')
      .filter(mid =>
        /^usr_[a-zA-Z0-9_-]{3,64}$/.test(mid) ||
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(mid) ||
        /^[a-zA-Z0-9_-]{3,64}$/.test(mid)
      );
    effectiveMemberIds = newMemberIds;
    const effectiveMgr = updates.manager_id || project.manager_id;
    const memberRows = [];
    if (effectiveMgr) {
      memberRows.push({ project_id: projectId, user_id: effectiveMgr, role_id: 'project_manager' });
    }
    for (const mid of newMemberIds) {
      if (!memberRows.some(m => m.user_id === mid)) {
        memberRows.push({ project_id: projectId, user_id: mid, role_id: 'member' });
      }
    }
    await supabase.from('project_members').delete().eq('project_id', projectId);
    if (memberRows.length > 0) {
      await supabase.from('project_members').upsert(memberRows, { onConflict: 'project_id,user_id' });
    }
  } else if (updates.manager_id) {
    await supabase.from('project_members').upsert([{ project_id: projectId, user_id: updates.manager_id, role_id: 'project_manager' }], { onConflict: 'project_id,user_id' });
  }

  // Sanitize audit details to prevent any sensitive fields from leaking into logs
  const safeAuditDetails = { ...body };
  delete safeAuditDetails.password;
  delete safeAuditDetails.token;
  delete safeAuditDetails.apiKey;
  supabase.from('audit_logs').insert([{ user_id: userId, action: 'update', entity_type: 'project', entity_id: projectId, details: safeAuditDetails }]).then().catch(() => {});

  invalidateBootstrapCache();

  c.set('mutationDelta', {
    table: 'projects',
    action: 'UPDATE',
    record: toCamelCase(project)
  });

  return c.json({
    project: {
      ...toCamelCase(project),
      memberIds: effectiveMemberIds.length ? effectiveMemberIds : undefined
    }
  });
});

// DELETE /api/projects/:id
app.delete('/:id', async (c) => {
  const projectId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{4,50}$/.test(projectId)) {
    return c.json({ error: 'معرف المشروع غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: project } = await supabase.from('projects').select('id, manager_id').eq('id', projectId).single();
  if (!project) return c.json({ error: 'المشروع غير موجود' }, 404);

  const canDelete = (roleId === 'admin') ||
    (await hasPermission(supabase, userId, roleId, 'delete_projects', projectId)) ||
    (await hasPermission(supabase, userId, roleId, 'delete_project', projectId));

  if (!canDelete) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const now = new Date().toISOString();
  const [delRes] = await Promise.all([
    supabase.from('projects').update({ lifecycle: 'cancelled', updated_at: now, deleted_at: now }).eq('id', projectId),
    supabase.from('tasks').update({ deleted_at: now, updated_at: now }).eq('project_id', projectId),
    supabase.from('documents').update({ deleted_at: now, updated_at: now }).eq('project_id', projectId).is('deleted_at', null),
    supabase.from('audit_logs').insert([{ user_id: userId, action: 'delete', entity_type: 'project', entity_id: projectId }])
  ]);
  
  if (delRes.error) throw delRes.error;

  invalidateBootstrapCache();

  c.set('mutationDelta', {
    table: 'projects',
    action: 'DELETE',
    record: { id: projectId }
  });

  return c.json({ ok: true });
});

// POST /api/projects/:id/clone
app.post('/:id/clone', async (c) => {
  const originalProjectId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{4,50}$/.test(originalProjectId)) {
    return c.json({ error: 'معرف المشروع غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'create_projects'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  if (!(await isProjectVisible(supabase, userId, roleId, originalProjectId))) {
    return c.json({ error: 'غير مصرح لك بالوصول إلى هذا المشروع أو نسخه' }, 403);
  }

  const body = await c.req.json().catch(() => ({}));
  
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
        assignee_id: body.keepAssignees ? t.assignee_id : null,
        reviewer_id: body.keepAssignees ? t.reviewer_id : null,
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

  c.set('mutationDelta', {
    table: 'projects',
    action: 'INSERT',
    record: toCamelCase(clonedProject)
  });

  return c.json({ project: toCamelCase(clonedProject) }, 201);
});

export default app;
