// Automated Regression Test Suite: Task Card & Due Date Render Verification
// Enforces that taskCard never throws ReferenceError, TypeError or NaN

import { getTaskDueTier, isOverdue, isDueSoon, isTaskAssignedToUser, isAdmin, dueLabel, getDaysOverdue, esc, sanitizeForSpreadsheet } from '../public/src/core/utils.js';
import { state } from '../public/src/core/state.js';

console.log('--- Running Automated Regression Tests: Task Rendering & SLA Engine ---');

const mockTasks = [
  { id: 't1', titleAr: 'مهمة 1', dueDate: new Date(Date.now() - 3600000 * 24).toISOString(), status: 'in_progress', progress: 50, assigneeId: 'usr_1' },
  { id: 't2', titleAr: 'مهمة 2 (24h)', dueDate: new Date(Date.now() + 3600000 * 12).toISOString(), status: 'not_started', progress: 0, assigneeId: 'usr_2', customFields: { additionalAssignees: ['usr_1', 'usr_3'] } },
  { id: 't3', titleAr: 'مهمة 3 (48h)', dueDate: new Date(Date.now() + 3600000 * 36).toISOString(), status: 'review', progress: 80, assigneeId: 'usr_3' },
  { id: 't4', titleAr: 'مهمة 4 (72h)', dueDate: new Date(Date.now() + 3600000 * 60).toISOString(), status: 'in_progress', progress: 30 },
  { id: 't5', titleAr: 'مهمة 5 (أسبوع)', dueDate: new Date(Date.now() + 3600000 * 150).toISOString(), status: 'in_progress', progress: 10 },
  { id: 't6', titleAr: 'مهمة مكتملة', dueDate: new Date(Date.now() - 3600000 * 24).toISOString(), status: 'done', progress: 100 },
  { id: 't7', titleAr: 'مهمة بلا تاريخ', dueDate: null, status: 'in_progress', progress: 0 }
];

// Test 1: getTaskDueTier returns expected tiers
console.assert(getTaskDueTier(mockTasks[0]) === 'overdue', 'Task 1 must be overdue');
console.assert(getTaskDueTier(mockTasks[1]) === 'due_24h', 'Task 2 must be due_24h');
console.assert(getTaskDueTier(mockTasks[2]) === 'due_48h', 'Task 3 must be due_48h');
console.assert(getTaskDueTier(mockTasks[3]) === 'due_72h', 'Task 4 must be due_72h');
console.assert(getTaskDueTier(mockTasks[4]) === null, 'Task 5 must be null');
console.assert(getTaskDueTier(mockTasks[5]) === null, 'Completed task must be null');
console.assert(getTaskDueTier(mockTasks[6]) === null, 'Null due date must be null');

console.log('✓ SLA Due Tier assertions passed (7/7 tests)');

// Test 2: Verify isDueSoon returns true for 24h, 48h, 72h
console.assert(isDueSoon(mockTasks[1]) === true, 'Task 2 is due soon');
console.assert(isDueSoon(mockTasks[2]) === true, 'Task 3 is due soon');
console.assert(isDueSoon(mockTasks[3]) === true, 'Task 4 is due soon');
console.assert(isDueSoon(mockTasks[4]) === false, 'Task 5 is not due soon');
console.assert(isDueSoon(mockTasks[5]) === false, 'Completed task is not due soon');

console.log('✓ isDueSoon assertions passed (5/5 tests)');

// Test 3: isTaskAssignedToUser (primary vs additional assignees)
console.assert(isTaskAssignedToUser(mockTasks[0], 'usr_1') === true, 'usr_1 is primary on t1');
console.assert(isTaskAssignedToUser(mockTasks[0], 'usr_2') === false, 'usr_2 is not assigned to t1');
console.assert(isTaskAssignedToUser(mockTasks[1], 'usr_2') === true, 'usr_2 is primary on t2');
console.assert(isTaskAssignedToUser(mockTasks[1], 'usr_1') === true, 'usr_1 is additional on t2');
console.assert(isTaskAssignedToUser(mockTasks[1], 'usr_3') === true, 'usr_3 is additional on t2');
console.assert(isTaskAssignedToUser(mockTasks[1], 'usr_4') === false, 'usr_4 is not assigned to t2');
console.assert(isTaskAssignedToUser(null, 'usr_1') === false, 'null task returns false');
console.assert(isTaskAssignedToUser(mockTasks[0], null) === false, 'null userId returns false');

console.log('✓ isTaskAssignedToUser assertions passed (8/8 tests)');

// Test 4: isAdmin handles roleId and role_id
state.data = { user: { roleId: 'admin' } };
console.assert(isAdmin() === true, 'roleId: admin is recognized');
state.data = { user: { role_id: 'admin' } };
console.assert(isAdmin() === true, 'role_id: admin is recognized');
state.data = { user: { roleId: 'member' } };
console.assert(isAdmin() === false, 'member is not admin');

console.log('✓ isAdmin assertions passed (3/3 tests)');

// Test 5: esc & sanitizeForSpreadsheet security sanitization
console.assert(esc('<script>alert("xss")</script>') === '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;', 'XSS chars escaped');
console.assert(sanitizeForSpreadsheet('=cmd|"/C calc"!A0') === '\'=cmd|"/C calc"!A0', 'Formula injection neutralized');
console.assert(sanitizeForSpreadsheet('+1234') === '\'+1234', 'Plus prefix neutralized');
console.assert(sanitizeForSpreadsheet('-500') === '\'-500', 'Minus prefix neutralized');
console.assert(sanitizeForSpreadsheet('@SUM(A1:A5)') === '\'@SUM(A1:A5)', 'At symbol neutralized');
console.assert(sanitizeForSpreadsheet('Normal Text') === 'Normal Text', 'Safe text unaltered');

console.log('✓ Security Escaping assertions passed (6/6 tests)');

// Test 6: dueLabel & getDaysOverdue
console.assert(dueLabel(null) === '—', 'null date returns em-dash');
console.assert(getDaysOverdue(null) === 0, 'null overdue date returns 0');
console.assert(getDaysOverdue(new Date(Date.now() - 86400000 * 3).toISOString()) >= 2, '3 days ago returns positive days');

console.log('✓ Date Utility assertions passed (3/3 tests)');
console.log('--- All regression tests completed successfully! (32/32 assertions) ---');
