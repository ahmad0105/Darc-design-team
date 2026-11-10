import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node test environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (k) => mockStorage.get(k) || null,
  setItem: (k, v) => mockStorage.set(k, String(v)),
  removeItem: (k) => mockStorage.delete(k),
  clear: () => mockStorage.clear()
};

// Import modules under test
const {
  syncPendingMutations,
  recordDeadLetterMutation,
  getDeadLetterMutations,
  clearDeadLetterMutations,
  getPendingMutations,
  clearPendingMutations
} = await import('../public/src/core/offline.js');

const {
  registerActiveBlobUrl,
  revokeAllActiveBlobUrls
} = await import('../public/src/features/documents/doc-viewer.js');

// Helper to safely mock navigator in Node 21+
function mockNavigator(props) {
  try {
    Object.defineProperty(globalThis, 'navigator', {
      value: props,
      configurable: true,
      writable: true
    });
  } catch (_) {
    // If defineProperty fails, mutate existing navigator
    Object.assign(globalThis.navigator, props);
  }
}

test('--- Enterprise Master Resilience & Hardening Test Suite ---', async (t) => {

  await t.test('1. Multi-Tab Concurrency Shield: navigator.locks skips duplicate sync when busy', async () => {
    let lockRequested = false;

    mockNavigator({
      onLine: true,
      locks: {
        request: async (name, opts, callback) => {
          lockRequested = true;
          assert.equal(name, 'darc_offline_sync_lock');
          // Simulate lock unavailable (another tab is actively syncing)
          return await callback(null);
        }
      }
    });

    const dummyApi = async () => ({ ok: true });
    const result = await syncPendingMutations(dummyApi);

    assert.equal(lockRequested, true, 'Web Locks API must be invoked with darc_offline_sync_lock');
    assert.equal(result.locked, true, 'Must return locked: true when another tab holds the lock');
    assert.equal(result.synced, 0, 'No mutations should be replayed by second tab');
  });

  await t.test('2. Multi-Tab Concurrency Shield: Executes sync normally when lock is acquired', async () => {
    clearPendingMutations();
    clearDeadLetterMutations();

    const testItem = {
      id: 'mut_test_lock_1',
      path: '/api/tasks/tsk_test_1',
      method: 'PATCH',
      body: { titleAr: 'مهمة فحص القفل' },
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('darc_offline_mutations_queue', JSON.stringify([testItem]));

    let executedPath = '';
    mockNavigator({
      onLine: true,
      locks: {
        request: async (name, opts, callback) => {
          // Simulate lock granted
          return await callback({ name });
        }
      }
    });

    const mockApi = async (path) => {
      executedPath = path;
      return { ok: true, task: { id: 'tsk_test_1' } };
    };

    const result = await syncPendingMutations(mockApi);
    assert.equal(executedPath, '/api/tasks/tsk_test_1');
    assert.equal(result.synced, 1);
    assert.equal(result.failed, 0);
  });

  await t.test('3. Poison-Pill Resilience: 4xx rejected mutation does NOT block subsequent valid mutations', async () => {
    clearPendingMutations();
    clearDeadLetterMutations();

    const poisonItem = {
      id: 'mut_poison_01',
      path: '/api/tasks/tsk_deleted_by_other',
      method: 'PATCH',
      body: { titleAr: 'مهمة محذوفة' },
      createdAt: new Date().toISOString()
    };

    const validItem = {
      id: 'mut_valid_02',
      path: '/api/tasks/tsk_active_02',
      method: 'PATCH',
      body: { titleAr: 'مهمة صالحة' },
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('darc_offline_mutations_queue', JSON.stringify([poisonItem, validItem]));

    const executedCalls = [];
    const mockApi = async (path) => {
      executedCalls.push(path);
      if (path === '/api/tasks/tsk_deleted_by_other') {
        const err = new Error('Task not found or deleted by collaborator');
        err.status = 404;
        throw err;
      }
      return { ok: true };
    };

    mockNavigator({ onLine: true });

    const result = await syncPendingMutations(mockApi);

    assert.equal(executedCalls.length, 2, 'Both mutations must be processed without aborting loop');
    assert.equal(result.synced, 1, 'Valid mutation must succeed');

    const deadLetters = getDeadLetterMutations();
    assert.equal(deadLetters.length, 1, 'Poison pill must be archived in Dead-Letter Queue');
    assert.equal(deadLetters[0].id, 'mut_poison_01');
    assert.equal(deadLetters[0].status, 404);
  });

  await t.test('4. Dead-Letter Queue Management: Records and caps at 20 entries', () => {
    clearDeadLetterMutations();
    for (let i = 0; i < 25; i++) {
      recordDeadLetterMutation(
        { id: `mut_${i}`, path: `/api/tasks/${i}`, method: 'PATCH' },
        `Error reason ${i}`,
        422
      );
    }

    const items = getDeadLetterMutations();
    assert.equal(items.length, 20, 'Dead-Letter queue must be capped at 20 items');
    assert.equal(items[0].id, 'mut_24', 'Latest failed mutation must be at top (LIFO)');
    clearDeadLetterMutations();
    assert.equal(getDeadLetterMutations().length, 0);
  });

  await t.test('5. Blob URL Memory Hygiene: Registers and revokes object URLs cleanly', () => {
    let revokedUrls = [];
    globalThis.URL = {
      revokeObjectURL: (url) => {
        revokedUrls.push(url);
      }
    };

    registerActiveBlobUrl('blob:https://example.com/asset-1');
    registerActiveBlobUrl('blob:https://example.com/asset-2');
    registerActiveBlobUrl('https://example.com/not-a-blob'); // Should be ignored

    revokeAllActiveBlobUrls();

    assert.equal(revokedUrls.length, 2, 'All registered blob URLs must be revoked');
    assert.ok(revokedUrls.includes('blob:https://example.com/asset-1'));
    assert.ok(revokedUrls.includes('blob:https://example.com/asset-2'));

    // Second call should have nothing to revoke
    revokedUrls = [];
    revokeAllActiveBlobUrls();
    assert.equal(revokedUrls.length, 0);
  });
});
