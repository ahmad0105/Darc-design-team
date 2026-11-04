import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getDisciplineIcon,
  getReportFilteredTasks,
  computeDisciplinesBreakdown,
  computeTeamWorkload,
  renderReports
} from '../public/src/features/reports/reports.js';
import { state } from '../public/src/core/state.js';

test('--- Executive Reports & Zero-Emoji Verification Suite ---', async (t) => {
  // Regex detecting all Unicode Emoji ranges
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/gu;

  await t.test('Test 1: getDisciplineIcon strictly returns clean SVG icons and ZERO emojis', () => {
    const disciplines = [
      'معماري', 'Architectural',
      'كهربائي', 'Electrical',
      'صحي وسباكة', 'Plumbing',
      'ميكانيك وتكييف', 'HVAC',
      'إنشائي', 'Structural',
      'تصميم داخلي وديكور', 'Interior',
      'رندر و3D', '3D Visuals',
      'حساب كميات BOQ', 'Quantity Survey',
      'مكافحة حريق', 'Fire Protection',
      'تخصص عام مجهول', 'General'
    ];

    disciplines.forEach(name => {
      const svg = getDisciplineIcon(name);
      assert.ok(svg.includes('<svg'), `Discipline "${name}" must return SVG markup`);
      assert.ok(!emojiRegex.test(svg), `Discipline "${name}" must contain ZERO emojis`);
    });
    console.log('✓ Test 1: getDisciplineIcon returns 100% clean SVG icons with zero emojis');
  });

  await t.test('Test 2: renderReports generates complete HTML across all 5 perspectives with ZERO emojis', () => {
    // Setup state
    state.lang = 'ar';
    state.data = {
      projects: [
        { id: 'p1', code: 'DARC-26-001', nameAr: 'برج الأفق', nameEn: 'Horizon Tower', lifecycle: 'active', health: 'on_track', progress: 75, startDate: '2026-01-01', dueDate: '2026-12-31' },
        { id: 'p2', code: 'DARC-26-002', nameAr: 'فيلا الياسمين', nameEn: 'Jasmine Villa', lifecycle: 'active', health: 'at_risk', progress: 30, startDate: '2026-02-01', dueDate: '2026-08-31' }
      ],
      tasks: [
        { id: 't1', projectId: 'p1', titleAr: 'مخططات الواجهات', categoryAr: 'معماري', weight: 3, progress: 100, status: 'done', dueDate: '2026-04-01' },
        { id: 't2', projectId: 'p1', titleAr: 'لوحات التوزيع', categoryAr: 'كهربائي', weight: 2, progress: 50, status: 'in_progress', dueDate: '2026-05-01' },
        { id: 't3', projectId: 'p2', titleAr: 'شبكة التغذية', categoryAr: 'صحي وسباكة', weight: 1, progress: 10, status: 'blocked', dueDate: '2026-02-15' } // overdue
      ],
      users: [
        { id: 'u1', name: 'أحمد الهاشمي', role: 'admin', status: 'active', email: 'ahmad@darc.sa' },
        { id: 'u2', name: 'سارة المهندس', role: 'architect', status: 'active', email: 'sara@darc.sa' }
      ],
      documents: [
        { id: 'd1', projectId: 'p1', name: 'Arch_V1.pdf', status: 'approved', size: 2048576, createdAt: '2026-03-01' },
        { id: 'd2', projectId: 'p2', name: 'MEP_Rev02.dwg', status: 'review', size: 5242880, createdAt: '2026-03-10' }
      ]
    };

    const tabs = ['overview', 'disciplines', 'team', 'risks', 'drawings'];
    tabs.forEach(tab => {
      state.reportsTab = tab;
      const html = renderReports();
      assert.ok(html.length > 100, `Tab ${tab} must render content`);
      const emojis = html.match(emojiRegex);
      assert.strictEqual(emojis, null, `Tab ${tab} must contain zero emojis. Found: ${emojis?.join(', ')}`);
    });
    console.log('✓ Test 2: renderReports HTML across all 5 tabs contains ZERO emojis');
  });

  await t.test('Test 3: computeDisciplinesBreakdown calculates accurate weights and completion', () => {
    const tasks = [
      { categoryAr: 'معماري', weight: 2, progress: 100, status: 'done' },
      { categoryAr: 'معماري', weight: 2, progress: 50, status: 'in_progress' },
      { categoryAr: 'إنشائي', weight: 4, progress: 25, status: 'in_progress' }
    ];
    const breakdown = computeDisciplinesBreakdown(tasks);
    assert.strictEqual(breakdown.length, 2);

    const arch = breakdown.find(d => d.name === 'معماري');
    assert.ok(arch);
    assert.strictEqual(arch.total, 2);
    assert.strictEqual(arch.weight, 4);
    assert.strictEqual(arch.done, 1);
    assert.strictEqual(arch.percentage, 75); // (200 + 100) / 4 = 75%

    const struct = breakdown.find(d => d.name === 'إنشائي');
    assert.ok(struct);
    assert.strictEqual(struct.total, 1);
    assert.strictEqual(struct.percentage, 25);
    console.log('✓ Test 3: computeDisciplinesBreakdown calculates mathematical progress accurately');
  });

  await t.test('Test 4: computeTeamWorkload categorizes capacity levels without emojis', () => {
    const users = [
      { id: 'u1', name: 'مهندس 1', status: 'active' },
      { id: 'u2', name: 'مهندس 2', status: 'active' }
    ];
    const tasks = [
      { assigneeId: 'u1', status: 'in_progress', weight: 1, progress: 50 },
      { assigneeId: 'u1', status: 'in_progress', weight: 1, progress: 50 },
      { assigneeId: 'u1', status: 'in_progress', weight: 1, progress: 50 },
      { assigneeId: 'u1', status: 'in_progress', weight: 1, progress: 50 },
      { assigneeId: 'u1', status: 'in_progress', weight: 1, progress: 50 } // 5 active => high load
    ];
    const workload = computeTeamWorkload(tasks, users);
    assert.strictEqual(workload.length, 2);

    const u1Workload = workload.find(w => w.user.id === 'u1');
    assert.strictEqual(u1Workload.active, 5);
    assert.strictEqual(u1Workload.capacity, 'high');
    assert.ok(!emojiRegex.test(u1Workload.capacityLabel));

    const u2Workload = workload.find(w => w.user.id === 'u2');
    assert.strictEqual(u2Workload.active, 0);
    assert.strictEqual(u2Workload.capacity, 'idle');
    assert.ok(!emojiRegex.test(u2Workload.capacityLabel));
    console.log('✓ Test 4: computeTeamWorkload categorizes load cleanly without emojis');
  });

  await t.test('Test 5: Responsive layout classes are properly emitted', () => {
    state.reportsTab = 'overview';
    const html = renderReports();
    assert.ok(html.includes('report-page-head'));
    assert.ok(html.includes('report-toolbar'));
    assert.ok(html.includes('report-tabs'));
    assert.ok(html.includes('report-bar-row'));
    console.log('✓ Test 5: Responsive CSS hooks and classes verified');
  });
});
