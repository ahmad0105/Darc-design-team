import test from 'node:test';
import assert from 'node:assert/strict';
import { state } from '../public/src/core/state.js';
import { getColumnKeyForStatus, applyGranularDelta } from '../public/src/core/realtime.js';

test('Universal Realtime Synchronization & Security Hardening Suite', async (t) => {
  await t.test('1. getColumnKeyForStatus canonical kanban mapping for all statuses', () => {
    assert.equal(getColumnKeyForStatus('not_started'), 'not_started');
    assert.equal(getColumnKeyForStatus('in_progress'), 'in_progress');
    // Review column groups review, approval, and blocked
    assert.equal(getColumnKeyForStatus('review'), 'review');
    assert.equal(getColumnKeyForStatus('approval'), 'review');
    assert.equal(getColumnKeyForStatus('blocked'), 'review');
    // Done column
    assert.equal(getColumnKeyForStatus('done'), 'done');
    assert.equal(getColumnKeyForStatus('completed'), 'done');
    // Fallback for null / undefined / unknown
    assert.equal(getColumnKeyForStatus(null), 'not_started');
    assert.equal(getColumnKeyForStatus('unknown_status'), 'not_started');
  });

  await t.test('2. applyGranularDelta BATCH_REORDER updates status, sortOrder, and autoProgress in-memory', () => {
    state.data = {
      user: { id: 'usr_admin', roleId: 'admin' },
      projects: [{ id: 'prj_1', progress: 0, weight: 100 }],
      tasks: [
        { id: 'tsk_1', projectId: 'prj_1', status: 'not_started', progress: 0, sortOrder: 1, weight: 10 }
      ]
    };

    const deltaApplied = applyGranularDelta('tasks', 'BATCH_REORDER', {
      items: [
        { id: 'tsk_1', status: 'done', progress: 100, sortOrder: 0, projectId: 'prj_1' }
      ]
    });

    assert.equal(deltaApplied, true);
    assert.equal(state.data.tasks[0].status, 'done');
    assert.equal(state.data.tasks[0].progress, 100);
    assert.equal(state.data.tasks[0].sortOrder, 0);
  });

  await t.test('3. Multi-Tenant Project Isolation: Non-admin delta is rejected for unassigned projects', () => {
    state.data = {
      user: { id: 'usr_member', roleId: 'project_member' },
      projects: [{ id: 'prj_allowed' }],
      tasks: [
        { id: 'tsk_secret', projectId: 'prj_forbidden', status: 'not_started', sortOrder: 1 }
      ]
    };

    // Non-admin attempts to process reorder for forbidden project
    applyGranularDelta('tasks', 'BATCH_REORDER', {
      items: [
        { id: 'tsk_secret', status: 'done', sortOrder: 0, projectId: 'prj_forbidden' }
      ]
    });

    // Task should NOT have mutated!
    assert.equal(state.data.tasks[0].status, 'not_started');
    assert.equal(state.data.tasks[0].sortOrder, 1);
  });

  await t.test('4. Granular Delta In-Memory Update for Comments and Documents', () => {
    state.data = {
      user: { id: 'usr_admin', roleId: 'admin' },
      comments: [{ id: 'cmt_1', taskId: 'tsk_1', content: 'Old note' }],
      documents: [{ id: 'doc_1', taskId: 'tsk_1', name: 'Plan v1' }]
    };

    // Insert comment
    applyGranularDelta('comments', 'INSERT', { id: 'cmt_2', taskId: 'tsk_1', content: 'New live note' });
    assert.equal(state.data.comments.length, 2);
    assert.equal(state.data.comments[0].content, 'New live note');

    // Update document revision
    applyGranularDelta('documents', 'UPDATE', { id: 'doc_1', name: 'Plan v2 (Rev03)' });
    assert.equal(state.data.documents.find(d => d.id === 'doc_1').name, 'Plan v2 (Rev03)');
  });
});
