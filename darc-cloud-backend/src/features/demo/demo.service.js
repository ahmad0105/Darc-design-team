import { createDemoDataset } from './demo.data.js';

// Auto-cleanup interval: Exactly 15 minutes (900,000 ms)
// Automatically purges all demo mutations and restores pristine showcase state
export const DEMO_RESET_INTERVAL_MS = 15 * 60 * 1000;
let _lastResetTime = Date.now();
let _demoStore = createDemoDataset();

export function checkAndAutoReset() {
  const now = Date.now();
  if (now - _lastResetTime >= DEMO_RESET_INTERVAL_MS) {
    _demoStore = createDemoDataset();
    _lastResetTime = now;
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
    startDate: taskData.startDate || new Date().toISOString(),
    dueDate: taskData.dueDate || new Date(Date.now() + 14 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  _demoStore.tasks.unshift(newTask);
  return newTask;
}

export function addDemoDocument(docData) {
  checkAndAutoReset();
  const newDoc = {
    id: 'doc_demo_' + Math.random().toString(36).substr(2, 6),
    projectId: docData.projectId || 'prj_demo_villa',
    taskId: docData.taskId || null,
    uploaderId: 'usr_demo',
    originalName: docData.originalName || docData.compiledName || docData.name || 'مخطط معماري تجريبي.pdf',
    diskFilename: 'https://demo-mock-files.darc-design.bond/samples/drawing_sample.pdf',
    mimeType: docData.mimeType || 'application/pdf',
    size: Number(docData.size) || 1024 * 512,
    status: 'review',
    createdAt: new Date().toISOString()
  };
  _demoStore.documents.unshift(newDoc);
  return newDoc;
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
