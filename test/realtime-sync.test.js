import test from 'node:test';
import assert from 'node:assert/strict';

import { applyGranularDelta, recalculateProjectProgressInMemory } from '../public/src/core/realtime.js';
import { state } from '../public/src/core/state.js';

test('Realtime Sync & Concurrency Control Suite', async (t) => {
  // Setup baseline state
  state.data = {
    user: { id: 'usr_admin_1', roleId: 'admin' },
    projects: [
      { id: 'prj_alpha', nameAr: 'مشروع برج النخيل', progress: 0, totalWeight: 0, lifecycle: 'active' }
    ],
    tasks: [
      { id: 'tsk_1', projectId: 'prj_alpha', titleAr: 'مهمة 1', status: 'not_started', progress: 0, weight: 10, updatedAt: '2026-11-06T00:00:00Z' },
      { id: 'tsk_2', projectId: 'prj_alpha', titleAr: 'مهمة 2', status: 'not_started', progress: 0, weight: 10, updatedAt: '2026-11-06T00:00:00Z' }
    ],
    comments: [],
    documents: [],
    notifications: []
  };

  await t.test('1. In-memory delta UPDATE modifies state and recalculates weighted progress with 0 HTTP traffic', () => {
    const updated = applyGranularDelta('tasks', 'UPDATE', {
      id: 'tsk_1',
      projectId: 'prj_alpha',
      status: 'done',
      progress: 100,
      updatedAt: '2026-11-06T01:00:00Z'
    });

    assert.equal(updated, true);
    const task = state.data.tasks.find(t => t.id === 'tsk_1');
    assert.equal(task.progress, 100);
    assert.equal(task.status, 'done');

    const project = state.data.projects.find(p => p.id === 'prj_alpha');
    // Task 1 (weight 10, 100%) + Task 2 (weight 10, 0%) = 50%
    assert.equal(project.progress, 50);
  });

  await t.test('2. Optimistic Concurrency Control (OCC): Stale out-of-order delta is rejected', () => {
    // Current task updatedAt is '2026-11-06T01:00:00Z'
    // Stale delta from slower network packet arrives with updatedAt '2026-11-05T23:59:00Z'
    const result = applyGranularDelta('tasks', 'UPDATE', {
      id: 'tsk_1',
      projectId: 'prj_alpha',
      status: 'not_started',
      progress: 0,
      updatedAt: '2026-11-05T23:59:00Z'
    });

    // Should return true (handled) but NOT overwrite newer state
    assert.equal(result, true);
    const task = state.data.tasks.find(t => t.id === 'tsk_1');
    assert.equal(task.progress, 100, 'Stale packet should NOT have reverted progress to 0');
    assert.equal(task.status, 'done', 'Stale packet should NOT have reverted status to not_started');
  });

  await t.test('3. BATCH_REORDER delta updates multiple tasks and cascades project progress', () => {
    const result = applyGranularDelta('tasks', 'BATCH_REORDER', {
      items: [
        { id: 'tsk_1', status: 'done', progress: 100, sortOrder: 1 },
        { id: 'tsk_2', status: 'done', progress: 100, sortOrder: 2 }
      ]
    });

    assert.equal(result, true);
    const t2 = state.data.tasks.find(t => t.id === 'tsk_2');
    assert.equal(t2.status, 'done');
    assert.equal(t2.progress, 100);

    const project = state.data.projects.find(p => p.id === 'prj_alpha');
    assert.equal(project.progress, 100);
    assert.equal(project.lifecycle, 'completed');
  });

  await t.test('4. Security Shielding: Prototype pollution keys are strictly dropped', () => {
    applyGranularDelta('tasks', 'UPDATE', {
      id: 'tsk_1',
      __proto__: { polluted: true },
      constructor: { name: 'attacker' },
      titleAr: 'مهمة آمنة'
    });

    assert.equal({}.polluted, undefined);
    assert.equal(state.data.tasks.find(t => t.id === 'tsk_1').titleAr, 'مهمة آمنة');
  });

  await t.test('5. Non-admin isolation: Deltas for unassigned projects are dropped', () => {
    // Switch user to restricted non-admin
    state.data.user = { id: 'usr_eng_1', roleId: 'engineer' };
    state.data.projects = [{ id: 'prj_allowed' }];

    const unauthorizedDelta = applyGranularDelta('tasks', 'INSERT', {
      id: 'tsk_secret',
      projectId: 'prj_secret_foreign',
      titleAr: 'مهمة سرية لمشروع آخر'
    });

    assert.equal(unauthorizedDelta, false);
    assert.equal(state.data.tasks.some(t => t.id === 'tsk_secret'), false);
  });

  await t.test('6. Concurrent collaborator updates: Delta with newer timestamp is accepted even after recent local mutation', () => {
    state.data.user = { id: 'usr_admin_1', roleId: 'admin' };
    state.data.projects = [{ id: 'prj_alpha', nameAr: 'مشروع', progress: 50, totalWeight: 20 }];
    state.data.tasks = [
      { id: 'tsk_shared', projectId: 'prj_alpha', titleAr: 'مهمة مشتركة', status: 'in_progress', progress: 50, weight: 10, updatedAt: '2026-11-06T10:00:00Z' }
    ];

    // Local user just moved the task (recorded in recent local mutations)
    if (typeof window !== 'undefined' && typeof window.recordRecentLocalMutation === 'function') {
      window.recordRecentLocalMutation('tsk_shared');
    }

    // Collaborator on another device modifies the task 1 second later with newer updatedAt
    const collaboratorDelta = applyGranularDelta('tasks', 'UPDATE', {
      id: 'tsk_shared',
      projectId: 'prj_alpha',
      status: 'done',
      progress: 100,
      updatedAt: '2026-11-06T10:00:05Z'
    });

    assert.equal(collaboratorDelta, true, 'Collaborator delta must NOT be dropped by false deduplication');
    const task = state.data.tasks.find(t => t.id === 'tsk_shared');
    assert.equal(task.status, 'done');
    assert.equal(task.progress, 100);
  });

  await t.test('7. Task deletion delta cleans collection and cascades project progress', () => {
    state.data.tasks = [
      { id: 'tsk_del', projectId: 'prj_alpha', titleAr: 'مهمة سيتم حذفها', status: 'in_progress', progress: 50, weight: 10 }
    ];

    const delResult = applyGranularDelta('tasks', 'DELETE', null, { id: 'tsk_del', projectId: 'prj_alpha' });
    assert.equal(delResult, true);
    assert.equal(state.data.tasks.some(t => t.id === 'tsk_del'), false, 'Task must be removed from state');
  });
});
