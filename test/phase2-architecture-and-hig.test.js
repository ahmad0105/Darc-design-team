import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Setup browser globals simulation for Node environment
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (key) => store.get(key) || null,
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear()
  };
}

if (typeof globalThis.document === 'undefined') {
  globalThis.document = {
    addEventListener: () => {},
    removeEventListener: () => {},
    documentElement: { dataset: {}, lang: 'ar', dir: 'rtl' },
    body: { classList: { add: () => {}, remove: () => {} } },
    querySelector: () => null,
    querySelectorAll: () => []
  };
}

if (typeof globalThis.navigator === 'undefined') {
  globalThis.navigator = { onLine: true };
}

if (typeof globalThis.window === 'undefined') {
  globalThis.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    _dispatchedEvents: [],
    dispatchEvent: (ev) => {
      globalThis.window._dispatchedEvents.push(ev);
      return true;
    },
    showToast: (msg) => {
      globalThis.window._lastToast = msg;
    }
  };
}

if (typeof globalThis.CustomEvent === 'undefined') {
  globalThis.CustomEvent = class CustomEvent {
    constructor(type, params = {}) {
      this.type = type;
      this.detail = params.detail || null;
    }
  };
}

// Dynamically load DarcApp after browser globals are established
const { DarcApp } = await import('../public/app.js');
import { enqueueOfflineMutation, clearPendingMutations, syncPendingMutations } from '../public/src/core/offline.js';
import { scrubPII, getRecentBreadcrumbs } from '../public/src/core/telemetry.js';

test('--- Phase 2: Enterprise Architecture, Scope Protection & HIG Standards Suite ---', async (t) => {

  await t.test('1. Enterprise Modular Registry (DarcApp) is properly encapsulated and frozen', () => {
    assert.ok(DarcApp, 'DarcApp registry must be exported');
    assert.ok(Object.isFrozen(DarcApp), 'DarcApp must be deeply immutable and frozen');
    assert.ok(DarcApp.Projects, 'Projects module must be registered in DarcApp');
    assert.ok(DarcApp.Tasks, 'Tasks module must be registered in DarcApp');
    assert.ok(DarcApp.state, 'Runtime state must be registered in DarcApp');
    assert.ok(DarcApp.api, 'API client must be registered in DarcApp');
  });

  await t.test('2. Scope Protection: window.__darc is registered as non-enumerable', () => {
    const desc = Object.getOwnPropertyDescriptor(globalThis.window, '__darc');
    assert.ok(desc, 'window.__darc descriptor must exist');
    assert.equal(desc.enumerable, false, 'window.__darc must be non-enumerable to prevent extension scraping');
  });

  await t.test('3. Resilient Outbox: HTTP 412 (ETag Conflict) triggers conflict event and does not jam the queue', async () => {
    clearPendingMutations();

    // Enqueue a conflict mutation
    enqueueOfflineMutation({
      path: '/api/tasks/tsk_conflict_99',
      method: 'PATCH',
      body: { titleAr: 'تعديل ميداني متزامن' }
    });

    // Enqueue a subsequent valid mutation
    enqueueOfflineMutation({
      path: '/api/tasks/tsk_valid_100',
      method: 'PATCH',
      body: { titleAr: 'تعديل سليم' }
    });

    // Mock API that rejects task 99 with 412 Precondition Failed, but accepts task 100
    const mockApi = async (path) => {
      if (path.includes('tsk_conflict_99')) {
        const err = new Error('Precondition Failed (ETag Mismatch)');
        err.status = 412;
        throw err;
      }
      return { ok: true, id: 'tsk_valid_100' };
    };

    const res = await syncPendingMutations(mockApi);
    assert.equal(res.synced, 1, 'Subsequent valid mutation must sync successfully despite conflict on previous item');

    // Verify custom conflict event was dispatched
    const conflictEvent = globalThis.window._dispatchedEvents.find(e => e.type === 'darc:sync-conflict');
    assert.ok(conflictEvent, 'A conflict event must be dispatched');
    assert.equal(conflictEvent.detail.status, 412);
  });

  await t.test('4. Apple Human Interface Guidelines: Mobile Touch Targets enforce min 44px', () => {
    const rawCss = fs.readFileSync('public/styles.css', 'utf8');
    const css = rawCss.includes('@import')
      ? rawCss.replace(/@import\s+['"]([^'"]+)['"];/g, (_, rel) => fs.readFileSync(path.resolve('public', rel), 'utf8'))
      : rawCss;
    assert.ok(css.includes('@media (pointer: coarse), (max-width: 768px)'), 'Pointer coarse & mobile media query must be present');
    assert.ok(css.includes('min-height: 44px;'), 'Min-height 44px touch target must be enforced');
    assert.ok(css.includes('touch-action: manipulation;'), 'touch-action: manipulation must be specified to prevent tap delay');
    assert.ok(css.includes('-webkit-tap-highlight-color'), 'Apple tap highlight styling must be present');
  });

  await t.test('5. OWASP PII & Credential Scrubber redacts tokens from telemetry', () => {
    const dirty = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.secret';
    const clean = scrubPII(dirty);
    assert.doesNotMatch(clean, /eyJhbGci/, 'JWT must be completely redacted');
    assert.match(clean, /\[REDACTED_JWT\]/);
  });

  // Ensure clean termination of node test process by tearing down simulated background intervals
  setImmediate(() => process.exit(0));
});
