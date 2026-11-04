import { createDemoDataset } from './demo.data.js';

// Auto-cleanup interval: Exactly 15 minutes (900,000 ms)
// Automatically purges all demo mutations and restores pristine showcase state
export const DEMO_RESET_INTERVAL_MS = 15 * 60 * 1000;
let _lastResetTime = Date.now();
let _demoStore = createDemoDataset();
let _demoVersion = 1;

export function bumpDemoVersion() {
  _demoVersion++;
  return _demoVersion;
}

export function getDemoVersion() {
  return _demoVersion;
}

export function checkAndAutoReset() {
  const now = Date.now();
  if (now - _lastResetTime >= DEMO_RESET_INTERVAL_MS) {
    _demoStore = createDemoDataset();
    _lastResetTime = now;
    _demoVersion = 1;
    return true;
  }
  return false;
}

export function getDemoPayload() {
  checkAndAutoReset();
  const payload = JSON.parse(JSON.stringify(_demoStore));
  payload.isDemo = true;
  payload.demoExpiresIn = Math.max(0, Math.floor((_lastResetTime + DEMO_RESET_INTERVAL_MS - Date.now()) / 1000));
  return payload;
}

export function resetDemoPayload() {
  _demoStore = createDemoDataset();
  _lastResetTime = Date.now();
  _demoVersion = 1;
  const payload = JSON.parse(JSON.stringify(_demoStore));
  payload.isDemo = true;
  payload.demoExpiresIn = Math.floor(DEMO_RESET_INTERVAL_MS / 1000);
  return payload;
}

export function applyDemoTaskUpdate(taskId, updates) {
  checkAndAutoReset();
  const task = _demoStore.tasks.find(t => t.id === taskId);
  if (task) {
    const cleanUpdates = (updates && typeof updates === 'object' && !Array.isArray(updates)) ? { ...updates } : {};
    delete cleanUpdates.__proto__;
    delete cleanUpdates.constructor;
    delete cleanUpdates.prototype;
    const oldStatus = task.status;
    Object.assign(task, cleanUpdates, { updatedAt: new Date().toISOString() });
    if (cleanUpdates.status) {
      if (task.status === 'done') {
        task.progress = 100;
      } else if (task.status === 'not_started') {
        task.progress = 0;
      } else if (task.status === 'in_progress' && (task.progress === 0 || !task.progress)) {
        task.progress = 50;
      } else if (['review', 'approval'].includes(task.status) && (task.progress || 0) < 80) {
        task.progress = 80;
      }

      // Record simulated audit log for status change
      if (oldStatus !== cleanUpdates.status && Array.isArray(_demoStore.auditLogs)) {
        _demoStore.auditLogs.unshift({
          id: 'aud_demo_' + Math.random().toString(36).substring(2, 8),
          userId: 'usr_demo',
          action: 'status_change',
          entityType: 'task',
          entityId: task.id,
          details: {
            title: task.titleAr || task.titleEn || task.title || 'Demo Task',
            oldStatus,
            newStatus: cleanUpdates.status
          },
          createdAt: new Date().toISOString()
        });
      }
    }
    // Recalculate demo project progress
    const project = _demoStore.projects.find(p => p.id === task.projectId);
    if (project) {
      const pTasks = _demoStore.tasks.filter(t => t.projectId === project.id);
      let totalW = 0, doneW = 0;
      pTasks.forEach(t => {
        const w = Number(t.weight) || 1;
        totalW += w;
        if (t.status === 'done') doneW += w;
      });
      project.progress = totalW > 0 ? Math.round((doneW / totalW) * 100) : project.progress;
    }
    return task;
  }
  return null;
}

export function createDemoTask(taskData) {
  checkAndAutoReset();
  const newTask = {
    id: 'tsk_demo_' + Math.random().toString(36).substr(2, 6),
    projectId: taskData.projectId || 'prj_demo_villa',
    titleAr: taskData.titleAr || taskData.title || 'مهمة تجريبية جديدة',
    titleEn: taskData.titleEn || taskData.title || 'New Demo Task',
    descriptionAr: taskData.descriptionAr || '',
    descriptionEn: taskData.descriptionEn || '',
    status: taskData.status || 'not_started',
    priority: taskData.priority || 'medium',
    weight: Number(taskData.weight) || 5,
    progress: taskData.status === 'done' ? 100 : (taskData.status === 'in_progress' ? 50 : 0),
    assigneeId: taskData.assigneeId || 'usr_demo_arch',
    reviewerId: 'usr_demo',
    startDate: taskData.startDate || new Date().toISOString().split('T')[0],
    dueDate: taskData.dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  _demoStore.tasks.unshift(newTask);
  return newTask;
}

export function addDemoDocument(docData) {
  checkAndAutoReset();
  const originalName = docData.originalName || docData.compiledName || docData.name || 'DARC-VILLA-ARCH-A101_Rev03.pdf';
  const newDoc = {
    id: 'doc_demo_' + Math.random().toString(36).substr(2, 6),
    projectId: docData.projectId || 'prj_demo_villa',
    taskId: docData.taskId || null,
    uploaderId: 'usr_demo',
    originalName,
    diskFilename: `/assets/${encodeURIComponent(originalName)}`,
    viewLink: `/assets/${encodeURIComponent(originalName)}`,
    driveFileId: 'demo_file_' + Math.random().toString(36).substring(2, 6),
    mimeType: docData.mimeType || 'application/pdf',
    size: Number(docData.size) || 1024 * 512,
    status: 'review',
    createdAt: new Date().toISOString()
  };
  _demoStore.documents.unshift(newDoc);
  return newDoc;
}

export function updateDemoDocument(docId, updates = {}) {
  checkAndAutoReset();
  const doc = _demoStore.documents.find(d => d.id === docId);
  if (doc) {
    if (updates.status) doc.status = updates.status;
    if (updates.originalName) {
      doc.originalName = updates.originalName;
      doc.diskFilename = `/assets/${encodeURIComponent(updates.originalName)}`;
      doc.viewLink = doc.diskFilename;
    }
    doc.updatedAt = new Date().toISOString();
    return doc;
  }
  return null;
}

export function deleteDemoDocument(docId) {
  checkAndAutoReset();
  const idx = _demoStore.documents.findIndex(d => d.id === docId);
  if (idx !== -1) {
    const [doc] = _demoStore.documents.splice(idx, 1);
    const trashed = { ...doc, type: 'document', deletedAt: new Date().toISOString() };
    if (!_demoStore.trash) _demoStore.trash = [];
    _demoStore.trash.unshift(trashed);
    return true;
  }
  return false;
}

export function deleteDemoTask(taskId) {
  checkAndAutoReset();
  const idx = _demoStore.tasks.findIndex(t => t.id === taskId);
  if (idx !== -1) {
    const [task] = _demoStore.tasks.splice(idx, 1);
    const trashed = { ...task, type: 'task', deletedAt: new Date().toISOString() };
    if (!_demoStore.trash) _demoStore.trash = [];
    _demoStore.trash.unshift(trashed);
    return true;
  }
  return false;
}

export function createDemoProject(data = {}) {
  checkAndAutoReset();
  const year = String(new Date().getFullYear()).slice(-2);
  const allCodes = [..._demoStore.projects, ...(_demoStore.trash || [])].map(p => p.code).filter(Boolean);
  let maxNum = 0;
  let maxDigits = 3;
  const yearPattern = new RegExp(`^DARC-${year}-(\\d+)$`, 'i');
  for (const c of allCodes) {
    const match = String(c).trim().match(yearPattern);
    if (match) {
      const numStr = match[1];
      if (numStr.length > maxDigits) maxDigits = numStr.length;
      const num = parseInt(numStr, 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  }
  const defaultCode = `DARC-${year}-${String(maxNum + 1).padStart(maxDigits, '0')}`;
  const code = (data.code && String(data.code).trim().toUpperCase()) || defaultCode;

  const newProject = {
    id: data.id || ('prj_demo_' + Math.random().toString(36).substring(2, 8)),
    code,
    nameAr: data.nameAr || data.name_ar || data.name || 'مشروع هندسي تجريبي جديد',
    nameEn: data.nameEn || data.name_en || 'New Demo Engineering Project',
    clientAr: data.clientAr || data.client_ar || 'مجموعة استثمارية',
    clientEn: data.clientEn || data.client_en || 'Investment Group',
    descriptionAr: data.descriptionAr || data.description_ar || '',
    descriptionEn: data.descriptionEn || data.description_en || '',
    lifecycle: data.lifecycle || 'active',
    health: data.health || 'on_track',
    startDate: data.startDate || data.start_date || new Date().toISOString().split('T')[0],
    dueDate: data.dueDate || data.due_date || new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
    managerId: data.managerId || data.manager_id || 'usr_demo',
    progress: 0,
    progressMode: 'weighted',
    demo: true,
    memberCount: (Array.isArray(data.memberIds) ? data.memberIds.length : 1),
    memberIds: Array.isArray(data.memberIds) ? data.memberIds : ['usr_demo'],
    members: Array.isArray(data.memberIds) ? data.memberIds : ['usr_demo'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  _demoStore.projects.unshift(newProject);
  return newProject;
}

export function updateDemoProject(id, updates = {}) {
  checkAndAutoReset();
  const proj = _demoStore.projects.find(p => p.id === id);
  if (proj) {
    const cleanUpdates = (updates && typeof updates === 'object' && !Array.isArray(updates)) ? { ...updates } : {};
    delete cleanUpdates.__proto__;
    delete cleanUpdates.constructor;
    delete cleanUpdates.prototype;
    Object.assign(proj, cleanUpdates, { updatedAt: new Date().toISOString() });
    return proj;
  }
  return null;
}

export function deleteDemoProject(projectId) {
  checkAndAutoReset();
  const idx = _demoStore.projects.findIndex(p => p.id === projectId);
  if (idx !== -1) {
    const [project] = _demoStore.projects.splice(idx, 1);
    const now = new Date().toISOString();
    const trashed = { ...project, type: 'project', deletedAt: now };
    if (!_demoStore.trash) _demoStore.trash = [];
    _demoStore.trash.unshift(trashed);

    // Also soft-delete associated tasks and documents
    const remainingTasks = [];
    for (const t of _demoStore.tasks) {
      if (t.projectId === projectId) {
        _demoStore.trash.unshift({ ...t, type: 'task', deletedAt: now });
      } else {
        remainingTasks.push(t);
      }
    }
    _demoStore.tasks = remainingTasks;

    const remainingDocs = [];
    for (const d of _demoStore.documents) {
      if (d.projectId === projectId) {
        _demoStore.trash.unshift({ ...d, type: 'document', deletedAt: now });
      } else {
        remainingDocs.push(d);
      }
    }
    _demoStore.documents = remainingDocs;

    return true;
  }
  return false;
}

export function getDemoTrash() {
  checkAndAutoReset();
  if (!_demoStore.trash) _demoStore.trash = [];
  const list = _demoStore.trash;
  return {
    trash: list,
    projects: list.filter(x => x.type === 'project'),
    tasks: list.filter(x => x.type === 'task'),
    documents: list.filter(x => x.type === 'document')
  };
}

export function restoreDemoItem(type, id) {
  checkAndAutoReset();
  if (!_demoStore.trash) _demoStore.trash = [];
  const idx = _demoStore.trash.findIndex(item => item.id === id);
  if (idx === -1) return false;

  const [item] = _demoStore.trash.splice(idx, 1);
  delete item.deletedAt;

  if (type === 'project' || item.type === 'project') {
    delete item.type;
    item.lifecycle = 'active';
    _demoStore.projects.unshift(item);
  } else if (type === 'task' || item.type === 'task') {
    delete item.type;
    _demoStore.tasks.unshift(item);
  } else if (type === 'document' || item.type === 'document') {
    delete item.type;
    _demoStore.documents.unshift(item);
  }
  return true;
}

export function purgeDemoTrashItem(type, id) {
  checkAndAutoReset();
  if (!_demoStore.trash) _demoStore.trash = [];
  const idx = _demoStore.trash.findIndex(item => item.id === id);
  if (idx !== -1) {
    _demoStore.trash.splice(idx, 1);
    return true;
  }
  return false;
}

export function emptyDemoTrash() {
  checkAndAutoReset();
  _demoStore.trash = [];
  return true;
}

export function updateDemoComment(commentId, content) {
  checkAndAutoReset();
  if (!_demoStore.comments) return null;
  const cmt = _demoStore.comments.find(c => c.id === commentId);
  if (cmt) {
    cmt.content = content;
    cmt.updatedAt = new Date().toISOString();
    return cmt;
  }
  return null;
}

export function deleteDemoComment(commentId) {
  checkAndAutoReset();
  if (!_demoStore.comments) return false;
  const idx = _demoStore.comments.findIndex(c => c.id === commentId);
  if (idx !== -1) {
    _demoStore.comments.splice(idx, 1);
    return true;
  }
  return false;
}

export function setDemoNotificationReadStatus(id, isRead = true) {
  checkAndAutoReset();
  if (!_demoStore.notifications) return false;
  const notif = _demoStore.notifications.find(n => n.id === id);
  if (notif) {
    notif.read = Boolean(isRead);
    notif.readAt = isRead ? new Date().toISOString() : null;
    bumpDemoVersion();
    return notif;
  }
  return false;
}

export function markDemoNotificationAsRead(id) {
  return Boolean(setDemoNotificationReadStatus(id, true));
}

export function markAllDemoNotificationsAsRead() {
  checkAndAutoReset();
  if (!_demoStore.notifications) return true;
  const now = new Date().toISOString();
  _demoStore.notifications.forEach(n => {
    n.read = true;
    n.readAt = now;
  });
  bumpDemoVersion();
  return true;
}

export function clearReadDemoNotifications() {
  checkAndAutoReset();
  if (!_demoStore.notifications) return true;
  _demoStore.notifications = _demoStore.notifications.filter(n => !(n.read || n.readAt));
  bumpDemoVersion();
  return true;
}

export function deleteDemoNotification(id) {
  checkAndAutoReset();
  if (!_demoStore.notifications) return false;
  const idx = _demoStore.notifications.findIndex(n => n.id === id);
  if (idx !== -1) {
    _demoStore.notifications.splice(idx, 1);
    bumpDemoVersion();
    return true;
  }
  return false;
}

export function updateDemoCompany(updates = {}) {
  checkAndAutoReset();
  if (!_demoStore.company) _demoStore.company = {};
  if (updates.nameAr) _demoStore.company.nameAr = updates.nameAr;
  if (updates.nameEn) _demoStore.company.nameEn = updates.nameEn;
  if (updates.logoUrl !== undefined) _demoStore.company.logoUrl = updates.logoUrl;
  _demoStore.company.updatedAt = new Date().toISOString();
  return _demoStore.company;
}

export function updateDemoSelfProfile(updates = {}) {
  checkAndAutoReset();
  if (!_demoStore.user) return null;
  if (updates.name) _demoStore.user.name = updates.name;
  if (updates.nameEn) _demoStore.user.nameEn = updates.nameEn;
  if (updates.jobTitleAr) _demoStore.user.jobTitleAr = updates.jobTitleAr;
  if (updates.jobTitleEn) _demoStore.user.jobTitleEn = updates.jobTitleEn;
  if (updates.phone) _demoStore.user.phone = updates.phone;
  return _demoStore.user;
}

export function createDemoUser(userData = {}) {
  checkAndAutoReset();
  if (!_demoStore.users) _demoStore.users = [];
  const newUser = {
    id: userData.id || ('usr_demo_' + Math.random().toString(36).substring(2, 8)),
    name: userData.name || userData.nameAr || 'مهندس تجريبي جديد',
    nameEn: userData.nameEn || 'New Demo Engineer',
    email: userData.email || `engineer_${Math.random().toString(36).substring(2, 6)}@darc.demo`,
    jobTitleAr: userData.jobTitleAr || 'مهندس معماري',
    jobTitleEn: userData.jobTitleEn || 'Architectural Engineer',
    roleId: userData.roleId || 'team_member',
    status: userData.status || 'active',
    avatarColor: userData.avatarColor || '#0d6269',
    avatarUrl: null
  };
  _demoStore.users.push(newUser);
  return newUser;
}

export function updateDemoUser(userId, updates = {}) {
  checkAndAutoReset();
  if (!_demoStore.users) return null;
  const user = _demoStore.users.find(u => u.id === userId);
  if (user) {
    Object.assign(user, updates);
    return user;
  }
  return null;
}

export function createDemoTemplate(tplData = {}) {
  checkAndAutoReset();
  if (!_demoStore.templates) _demoStore.templates = [];
  const newTpl = {
    id: tplData.id || ('tpl_demo_' + Math.random().toString(36).substring(2, 8)),
    code: tplData.code || String(_demoStore.templates.length + 1).padStart(2, '0'),
    nameAr: tplData.nameAr || 'قالب مخرج هندسي جديد',
    nameEn: tplData.nameEn || 'New Engineering Template',
    defaultWeight: Number(tplData.defaultWeight) || 5,
    categoryId: tplData.categoryId || 'architectural'
  };
  _demoStore.templates.push(newTpl);
  return newTpl;
}

export function updateDemoTemplate(tplId, updates = {}) {
  checkAndAutoReset();
  if (!_demoStore.templates) return null;
  const tpl = _demoStore.templates.find(t => t.id === tplId);
  if (tpl) {
    Object.assign(tpl, updates);
    return tpl;
  }
  return null;
}

export function deleteDemoTemplate(tplId) {
  checkAndAutoReset();
  if (!_demoStore.templates) return false;
  const idx = _demoStore.templates.findIndex(t => t.id === tplId);
  if (idx !== -1) {
    _demoStore.templates.splice(idx, 1);
    return true;
  }
  return false;
}

export function createDemoRole(roleData = {}) {
  checkAndAutoReset();
  if (!_demoStore.roles) _demoStore.roles = [];
  const newRole = {
    id: roleData.id || ('role_demo_' + Math.random().toString(36).substring(2, 8)),
    nameAr: roleData.nameAr || 'دور وظيفي جديد',
    nameEn: roleData.nameEn || 'New Role',
    permissions: Array.isArray(roleData.permissions) ? roleData.permissions : ['view_projects'],
    builtIn: false
  };
  _demoStore.roles.push(newRole);
  return newRole;
}

export function updateDemoRole(roleId, updates = {}) {
  checkAndAutoReset();
  if (!_demoStore.roles) return null;
  const role = _demoStore.roles.find(r => r.id === roleId);
  if (role) {
    Object.assign(role, updates);
    return role;
  }
  return null;
}

export function addDemoComment(taskId, content, userId = 'usr_demo') {
  checkAndAutoReset();
  const demoUser = (_demoStore.users || []).find(u => u.id === userId) || {
    id: userId,
    name: 'م. فهد القحطاني',
    nameEn: 'Eng. Fahad Al-Qahtani',
    email: 'fahad.q@darc.demo',
    avatarColor: '#0d6269'
  };
  const newComment = {
    id: 'cmt_demo_' + Math.random().toString(36).substr(2, 6),
    taskId,
    userId,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: demoUser
  };
  if (!_demoStore.comments) _demoStore.comments = [];
  _demoStore.comments.push(newComment);
  return newComment;
}

export function addDemoNotification(entry = {}) {
  checkAndAutoReset();
  if (!_demoStore.notifications) _demoStore.notifications = [];
  const newNotif = {
    id: 'notif_demo_' + Math.random().toString(36).substr(2, 6),
    userId: entry.userId || 'usr_demo',
    type: entry.type || 'general',
    titleAr: entry.titleAr || 'إشعار فحص النظام المباشر 🔔',
    titleEn: entry.titleEn || 'Live System Test Notification 🔔',
    messageAr: entry.messageAr || entry.content || 'هذا إشعار تجريبي مباشر للتأكد من اتصال السيرفر والربط اللحظي بنجاح!',
    messageEn: entry.messageEn || entry.content || 'This live test notification verifies backend dispatch and real-time connectivity!',
    content: entry.messageAr || entry.content || '',
    taskId: entry.taskId || null,
    projectId: entry.projectId || null,
    read: false,
    readAt: null,
    createdAt: new Date().toISOString()
  };
  _demoStore.notifications.unshift(newNotif);
  bumpDemoVersion();
  return newNotif;
}
