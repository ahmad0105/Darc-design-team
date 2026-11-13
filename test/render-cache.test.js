import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { RenderCacheEngine } from '../public/src/core/render-cache.js';

describe('RenderCacheEngine — High Efficiency DOM Memoization & Scroll Lifecycle', () => {
  test('1. Invariant: Empty or unmounted container is never skipped', () => {
    const engine = new RenderCacheEngine();
    
    // Virtual container with no children / empty innerHTML
    const emptyContainer = {
      innerHTML: '',
      hasChildNodes: () => false
    };

    const shouldSkip = engine.shouldSkipRender('dashboard', '<div>Content</div>', emptyContainer, false);
    assert.strictEqual(shouldSkip, false, 'Must not skip rendering into an empty container');
  });

  test('2. Populated container with identical view & HTML triggers fast-path skip', () => {
    const engine = new RenderCacheEngine();
    const populatedContainer = {
      innerHTML: '<div>Dashboard Content</div>',
      hasChildNodes: () => true
    };

    // First commit
    engine.commit('dashboard', '<div>Dashboard Content</div>', false);

    // Second check with identical view & HTML
    const shouldSkip = engine.shouldSkipRender('dashboard', '<div>Dashboard Content</div>', populatedContainer, false);
    assert.strictEqual(shouldSkip, true, 'Must skip re-rendering when view and HTML are identical');

    const metrics = engine.getMetrics();
    assert.strictEqual(metrics.bypassedRenders, 1, 'Bypassed renders metric must increment');
    assert.strictEqual(metrics.totalRenders, 1, 'Total renders count must match');
  });

  test('3. HTML mutation or view transition bypasses cache and renders fresh DOM', () => {
    const engine = new RenderCacheEngine();
    const container = {
      innerHTML: '<div>Old Content</div>',
      hasChildNodes: () => true
    };

    engine.commit('tasks', '<div>Old Content</div>', false);

    // HTML changed
    const skipOnHtmlDiff = engine.shouldSkipRender('tasks', '<div>New Content Added</div>', container, false);
    assert.strictEqual(skipOnHtmlDiff, false, 'Must not skip when HTML content is different');

    // View changed
    const skipOnViewDiff = engine.shouldSkipRender('projects', '<div>Old Content</div>', container, false);
    assert.strictEqual(skipOnViewDiff, false, 'Must not skip when view target changes');
  });

  test('4. Force flag strictly overrides memoization', () => {
    const engine = new RenderCacheEngine();
    const container = {
      innerHTML: '<div>Static Content</div>',
      hasChildNodes: () => true
    };

    engine.commit('settings', '<div>Static Content</div>', false);

    const shouldSkip = engine.shouldSkipRender('settings', '<div>Static Content</div>', container, true);
    assert.strictEqual(shouldSkip, false, 'Force flag must guarantee render execution');
  });

  test('5. Invalidation completely resets cache state', () => {
    const engine = new RenderCacheEngine();
    engine.commit('reports', '<div>Report Stats</div>', false);
    
    assert.strictEqual(engine.getMetrics().lastView, 'reports');

    engine.invalidate();
    assert.strictEqual(engine.getMetrics().lastView, null, 'Invalidate must reset lastView to null');

    const container = {
      innerHTML: '<div>Report Stats</div>',
      hasChildNodes: () => true
    };
    const shouldSkip = engine.shouldSkipRender('reports', '<div>Report Stats</div>', container, false);
    assert.strictEqual(shouldSkip, false, 'Must not skip after invalidation');
  });

  test('6. Scroll state capture and restoration preserves coordinates and board position', () => {
    const engine = new RenderCacheEngine();

    const mockBoard = {
      scrollLeft: 420,
      style: { scrollSnapType: '' }
    };

    const mockContainer = {
      scrollTop: 150,
      scrollLeft: 0,
      querySelector: (selector) => {
        if (selector.includes('board')) return mockBoard;
        return null;
      }
    };

    // Capture within same view
    const captured = engine.captureScrollState(mockContainer, true);
    assert.strictEqual(captured.scrollTop, 150);
    assert.strictEqual(captured.boardScrollLeft, 420);

    // Capture on cross-view navigation returns zeroed state
    const crossViewCaptured = engine.captureScrollState(mockContainer, false);
    assert.strictEqual(crossViewCaptured.scrollTop, 0);
    assert.strictEqual(crossViewCaptured.boardScrollLeft, null);

    // Restoration target
    const targetContainer = {
      scrollTop: 0,
      scrollLeft: 0,
      querySelector: (selector) => {
        if (selector.includes('board')) return mockBoard;
        return null;
      }
    };

    engine.restoreScrollState(targetContainer, captured);
    assert.strictEqual(targetContainer.scrollTop, 150);
    assert.strictEqual(mockBoard.scrollLeft, 420);
    assert.strictEqual(mockBoard.style.scrollSnapType, 'none');
  });

  test('7. Telemetry & Efficiency ratio calculated accurately', () => {
    const engine = new RenderCacheEngine();
    const container = { innerHTML: 'content', hasChildNodes: () => true };

    // 1 initial render + 3 bypassed renders
    engine.commit('tasks', 'content', false);
    engine.shouldSkipRender('tasks', 'content', container, false);
    engine.shouldSkipRender('tasks', 'content', container, false);
    engine.shouldSkipRender('tasks', 'content', container, false);

    const metrics = engine.getMetrics();
    assert.strictEqual(metrics.totalRenders, 1);
    assert.strictEqual(metrics.bypassedRenders, 3);
    assert.strictEqual(metrics.efficiencyRatio, 75, 'Efficiency ratio should be 3/4 = 75%');
  });
});
