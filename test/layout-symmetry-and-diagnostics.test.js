import test from 'node:test';
import assert from 'node:assert/strict';
import { renderTaskMetaRow, renderTaskBadgesRow, taskCard, verifyBoardSymmetry } from '../public/src/features/tasks/tasks.js';
import { getRealtimeDiagnostics } from '../public/src/core/realtime.js';

test('Board Layout Symmetry & Modular Card Architecture Suite', async (t) => {
  await t.test('1. renderTaskMetaRow generates clean meta row without badge clutter', () => {
    const onlineTask = { id: 'tsk_1', templateId: 'tpl-01', titleAr: 'مخطط معماري', titleEn: 'Architectural Plan' };
    const htmlOnline = renderTaskMetaRow(onlineTask);
    assert.match(htmlOnline, /class="task-card-meta-line"/);
    assert.match(htmlOnline, /class="task-card-code-wrap"/);
    assert.match(htmlOnline, /#01/);
    assert.doesNotMatch(htmlOnline, /badge-offline-pending/);

    const offlineTask = { id: 'tsk_2', templateId: null, titleAr: 'مهمة أوفلاين', _isOfflinePending: true };
    const htmlOffline = renderTaskMetaRow(offlineTask);
    assert.match(htmlOffline, /#CUSTOM/);
    assert.match(htmlOffline, /badge-offline-pending/);
  });

  await t.test('2. renderTaskBadgesRow isolates priority and SLA badges onto row 2', () => {
    const task = { id: 'tsk_1', priority: 'high' };
    const dueBadge = '<span class="overdue-tag">متأخرة</span>';
    const html = renderTaskBadgesRow(task, 2, 1, dueBadge);

    assert.match(html, /class="task-card-badges-line"/);
    assert.match(html, /priority-badge high/);
    assert.match(html, /class="overdue-tag"/);
    assert.match(html, /class="task-card-counters"/);
  });

  await t.test('3. taskCard composes clean <header class="task-card-header">', () => {
    const task = {
      id: 'tsk_3',
      templateId: 'tpl-27',
      titleAr: 'جدول كميات',
      titleEn: 'Quantity Table',
      priority: 'urgent',
      progress: 50,
      dueDate: '2026-11-10T12:00:00Z',
      _isOfflinePending: true
    };
    const cardHtml = taskCard(task);
    assert.match(cardHtml, /<header class="task-card-header">/);
    assert.match(cardHtml, /class="task-card-meta-line"/);
    assert.match(cardHtml, /class="task-card-badges-line"/);
    assert.match(cardHtml, /badge-offline-pending/);
    assert.match(cardHtml, /priority-badge urgent/);
  });

  await t.test('4. verifyBoardSymmetry is an exported layout recovery function', () => {
    assert.equal(typeof verifyBoardSymmetry, 'function');
    // Calling in Node environment (no DOM) returns safely without throw
    assert.doesNotThrow(() => verifyBoardSymmetry());
  });

  await t.test('5. getRealtimeDiagnostics exports comprehensive telemetry state', () => {
    const diag = getRealtimeDiagnostics();
    assert.ok(typeof diag === 'object' && diag !== null);
    assert.ok('connected' in diag);
    assert.ok('hibernating' in diag);
    assert.ok('reconnectAttempts' in diag);
    assert.ok('carrierDrops' in diag);
    assert.ok('messagesReceived' in diag);
    assert.ok('socketReadyState' in diag);
  });
});
