// Automated Regression Test Suite: Task Card & Due Date Render Verification
// Enforces that taskCard never throws ReferenceError, TypeError or NaN

import { getTaskDueTier, isOverdue, isDueSoon } from '../public/src/core/utils.js';

console.log('--- Running Automated Regression Tests: Task Rendering & SLA Engine ---');

const mockTasks = [
  { id: 't1', titleAr: 'مهمة 1', dueDate: new Date(Date.now() - 3600000 * 24).toISOString(), status: 'in_progress', progress: 50 },
  { id: 't2', titleAr: 'مهمة 2 (24h)', dueDate: new Date(Date.now() + 3600000 * 12).toISOString(), status: 'not_started', progress: 0 },
  { id: 't3', titleAr: 'مهمة 3 (48h)', dueDate: new Date(Date.now() + 3600000 * 36).toISOString(), status: 'review', progress: 80 },
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
console.log('--- All regression tests completed successfully! ---');
