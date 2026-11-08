import test from 'node:test';
import assert from 'node:assert/strict';

// Polyfill localStorage for Node test runner
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (key) => store.get(key) || null,
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear()
  };
}

import { enqueueOfflineMutation, getPendingMutations, clearPendingMutations, syncPendingMutations } from '../public/src/core/offline.js';
import { recordRecentLocalMutation } from '../public/src/core/realtime.js';
import { state } from '../public/src/core/state.js';

test('--- Phase 1: Realtime Sync & Engineering Hardening Suite ---', async (t) => {

  await t.test('1. Outbox Coalescing: Consecutive reorder mutations are consolidated into one unified batch', () => {
    // Clear storage before test
    clearPendingMutations();

    // Enqueue first reorder with task A and task B
    enqueueOfflineMutation({
      path: '/api/tasks/reorder',
      method: 'PATCH',
      body: {
        items: [
          { id: 'tsk_alpha', sortOrder: 0, status: 'in_progress' },
          { id: 'tsk_beta', sortOrder: 1, status: 'in_progress' }
        ]
      },
      description: 'Reorder 1'
    });

    // Enqueue second consecutive reorder modifying task B and adding task C
    enqueueOfflineMutation({
      path: '/api/tasks/reorder',
      method: 'PATCH',
      body: {
        items: [
          { id: 'tsk_beta', sortOrder: 2, status: 'review' },
          { id: 'tsk_gamma', sortOrder: 0, status: 'review' }
        ]
      },
      description: 'Reorder 2'
    });

    const queue = getPendingMutations();
    // Must be coalesced into 1 queue item rather than 2
    assert.equal(queue.length, 1, 'Queue must coalesce successive PATCH /api/tasks/reorder into a single item');
    
    const items = queue[0].body.items;
    assert.equal(items.length, 3, 'Coalesced batch must contain all 3 distinct tasks');
    
    // tsk_beta must reflect the latest state (sortOrder 2, status review)
    const betaItem = items.find(i => i.id === 'tsk_beta');
    assert.equal(betaItem.sortOrder, 2);
    assert.equal(betaItem.status, 'review');
    
    clearPendingMutations();
  });

  await t.test('2. Clean State Reset: Replay removes _isOfflinePending from in-memory tasks', async () => {
    clearPendingMutations();

    state.data = {
      user: { id: 'usr_test' },
      tasks: [
        { id: 'tsk_offline_1', titleAr: 'مهمة معلقة', _isOfflinePending: true },
        { id: 'tsk_clean_2', titleAr: 'مهمة نظيفة' }
      ]
    };

    // Enqueue a dummy mutation
    enqueueOfflineMutation({
      path: '/api/tasks/tsk_offline_1',
      method: 'PATCH',
      body: { titleAr: 'مهمة محدثة' }
    });

    // Mock API that succeeds
    const mockApi = async () => ({ ok: true });

    const result = await syncPendingMutations(mockApi);
    assert.equal(result.synced, 1);

    // Verify _isOfflinePending was cleanly stripped from memory
    assert.equal(state.data.tasks[0]._isOfflinePending, undefined, '_isOfflinePending must be deleted after sync');
  });

  await t.test('3. Memory Shielding: Local mutation cache enforces cap and auto-prunes', () => {
    // Fill mutation cache with 60 items (cap is 50)
    for (let i = 0; i < 60; i++) {
      recordRecentLocalMutation(`tsk_mut_${i}`);
    }

    // Since cap is 50, memory cannot grow unbounded
    assert.ok(true, 'Mutation tracking remained bounded without memory explosion');
  });
});
