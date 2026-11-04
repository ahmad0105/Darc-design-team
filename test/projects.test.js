import assert from 'node:assert';
import { getNextAvailableProjectCode, checkProjectCodeStatus, getProjectTeamData } from '../public/src/features/projects/projects.js';
import { getNextProjectCode } from '../darc-cloud-backend/src/features/projects/projects.routes.js';
import { state } from '../public/src/core/state.js';

async function runProjectsTestSuite() {
  console.log('--- Running Projects Feature & Code Architecture Verification Suite ---');

  // Test 1: Monotonic Project Code Generation with Gaps
  state.data = {
    projects: [
      { id: 'prj_1', code: 'DARC-001', nameAr: 'مشروع 1' },
      { id: 'prj_2', code: 'DARC-005', nameAr: 'مشروع 5' },
      { id: 'prj_3', code: 'DARC-012', nameAr: 'مشروع 12' }
    ],
    users: [
      { id: 'usr_1', name: 'أحمد الهاشمي', roleId: 'admin' },
      { id: 'usr_2', name: 'سارة الخالدي', roleId: 'architect' },
      { id: 'usr_3', name: 'فهد المطيري', roleId: 'engineer' }
    ],
    tasks: []
  };
  state.trash = [];

  const nextCode1 = getNextAvailableProjectCode();
  assert.strictEqual(nextCode1, 'DARC-013', 'Next code must be MAX(existing numbers) + 1');
  console.log('✓ Test 1: Monotonic project code correctly identifies MAX(number) + 1 despite gaps');

  // Test 2: Code Reservation during 30-Day Trash Retention
  // If a project DARC-015 is moved to trash, next code must NEVER recycle DARC-015 or collide with it
  state.trash = [
    { id: 'prj_trash_1', type: 'project', code: 'DARC-015', nameAr: 'مشروع محذوف في السلة' }
  ];
  const nextCode2 = getNextAvailableProjectCode();
  assert.strictEqual(nextCode2, 'DARC-016', 'Next code must respect projects in 30-day trash and not collide');
  console.log('✓ Test 2: Project code accounts for soft-deleted projects in 30-day trash retention');

  // Test 3: Uniqueness Validation & Conflict Prevention
  // Trying to use DARC-001 (active) -> must fail
  const activeCheck = checkProjectCodeStatus('DARC-001');
  assert.strictEqual(activeCheck.valid, false);
  assert.strictEqual(activeCheck.status, 'error');

  // Trying to use DARC-015 (in trash) -> must fail/warn (reserved for 30-day restoration window)
  const trashCheck = checkProjectCodeStatus('DARC-015');
  assert.strictEqual(trashCheck.valid, false);
  assert.strictEqual(trashCheck.status, 'warning');

  // Valid brand new code -> must pass
  const validCheck = checkProjectCodeStatus('DARC-017');
  assert.strictEqual(validCheck.valid, true);
  assert.strictEqual(validCheck.status, 'success');

  // Existing project keeping its own code in edit mode -> must pass
  const editSelfCheck = checkProjectCodeStatus('DARC-001', 'prj_1');
  assert.strictEqual(editSelfCheck.valid, true);
  console.log('✓ Test 3: Real-time code uniqueness accurately validates against active and trashed projects');

  // Test 4: Project Team Data Sync (Members visible immediately without tasks)
  const newProject = {
    id: 'prj_new',
    code: 'DARC-017',
    nameAr: 'مبنى الأعمال الجديد',
    managerId: 'usr_1',
    memberIds: ['usr_1', 'usr_2', 'usr_3']
  };
  const teamData = getProjectTeamData(newProject);
  assert.strictEqual(teamData.internalMembers.length, 3, 'All 3 assigned members must be present even with 0 tasks');
  assert.ok(teamData.internalMembers.some(m => m.id === 'usr_2'), 'Architect Sarah must be in team');
  assert.ok(teamData.internalMembers.some(m => m.id === 'usr_3'), 'Engineer Fahad must be in team');
  console.log('✓ Test 4: Project team members synchronize immediately without requiring tasks');

  // Test 5: Backend getNextProjectCode scan across all records (No limit 20 truncation)
  const mockSupabase = {
    from: (table) => {
      assert.strictEqual(table, 'projects');
      return {
        select: (fields) => {
          assert.strictEqual(fields, 'code');
          return Promise.resolve({
            data: [
              { code: 'DARC-001' },
              { code: 'DARC-010' },
              { code: 'DARC-045' }, // Old project beyond top 20
              { code: 'DARC-020' }
            ]
          });
        }
      };
    }
  };
  const backendNextCode = await getNextProjectCode(mockSupabase);
  assert.strictEqual(backendNextCode, 'DARC-046', 'Backend must scan all DB rows and return MAX + 1');
  console.log('✓ Test 5: Backend getNextProjectCode scans all DB records reliably');

  console.log('--- All Projects Architecture & Code Integrity Tests Passed Successfully (5/5) ---');
}

runProjectsTestSuite().catch(err => {
  console.error('Projects Test Suite Failed:', err);
  process.exit(1);
});
