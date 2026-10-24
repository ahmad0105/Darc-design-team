import { createDemoDataset } from './demo.data.js';

// In-memory isolated state for demo sessions
let _demoStore = createDemoDataset();

export function getDemoPayload() {
  return JSON.parse(JSON.stringify(_demoStore));
}

export function resetDemoPayload() {
  _demoStore = createDemoDataset();
  return JSON.parse(JSON.stringify(_demoStore));
}

export function applyDemoTaskUpdate(taskId, updates) {
  const task = _demoStore.tasks.find(t => t.id === taskId);
  if (task) {
    Object.assign(task, updates, { updatedAt: new Date().toISOString() });
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
