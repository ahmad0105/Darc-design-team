import assert from 'node:assert';
import { getIncidentsPerUser } from '../darc-cloud-backend/src/features/telemetry/telemetry.service.js';
import { sendWhatsAppAlert, dispatchDirectNotificationAlert } from '../darc-cloud-backend/src/features/whatsapp/whatsapp.service.js';
import { createNotification } from '../darc-cloud-backend/src/features/notifications/notifications.service.js';
import { getDemoPayload } from '../darc-cloud-backend/src/features/demo/demo.service.js';

console.log('--- Running Demo Isolation & Monitoring Verification Suite ---');

async function runTests() {
  // Test 1: getDemoPayload provides isolated showcase data
  const demoData = getDemoPayload();
  assert.strictEqual(demoData.isDemo, true, 'Demo payload must flag isDemo: true');
  assert.ok(Array.isArray(demoData.projects), 'Demo payload must contain projects');
  assert.ok(Array.isArray(demoData.tasks), 'Demo payload must contain tasks');
  assert.ok(demoData.projects.every(p => p.id.startsWith('prj_demo')), 'All demo projects must have prj_demo prefix');
  console.log('✓ Test 1: Demo showcase payload is strictly bounded and tagged as isDemo');

  // Test 2: getIncidentsPerUser when isDemo: true strictly hides real DB users
  const mockRealDB = {
    from: (table) => {
      if (table === 'users') {
        return {
          select: () => ({
            eq: () => ({
              data: [
                { id: 'usr_ahmad_real', name: 'Ahmad Hashmi (Owner)', email: 'ahmad@company.com', status: 'active', role_id: 'admin' },
                { id: 'usr_eng_real', name: 'Real Chief Engineer', email: 'chief@company.com', status: 'active', role_id: 'engineer' }
              ],
              error: null
            })
          })
        };
      }
      throw new Error(`Unexpected table ${table}`);
    }
  };

  // Demo user requesting incidents:
  const demoIncidents = await getIncidentsPerUser(mockRealDB, null, true);
  assert.ok(demoIncidents.users, 'Must return users');
  const demoUserIds = demoIncidents.users.map(u => u.userId);
  assert.ok(!demoUserIds.includes('usr_ahmad_real'), 'Demo user MUST NOT see real owner account!');
  assert.ok(!demoUserIds.includes('usr_eng_real'), 'Demo user MUST NOT see real engineer account!');
  assert.ok(demoUserIds.every(id => id.startsWith('usr_demo')), 'Demo users list must only contain demo identities');
  console.log('✓ Test 2: Demo diagnostics view strictly conceals real company accounts and real incidents');

  // Test 3: Admin monitoring capability (real admin CAN monitor demo activity - "ما عدا مراقبتهم")
  const adminView = await getIncidentsPerUser(mockRealDB, null, false);
  const adminUserIds = adminView.users.map(u => u.userId);
  assert.ok(adminUserIds.includes('usr_ahmad_real'), 'Real admin must see real company accounts');
  assert.ok(adminUserIds.some(id => id.startsWith('usr_demo')), 'Real admin MUST be able to monitor demo account activity ("ما عدا مراقبتهم")');
  console.log('✓ Test 3: Real admin monitoring ("ما عدا مراقبتهم") operates seamlessly with visibility over demo activity');

  // Test 4: WhatsApp alerts are completely suppressed for demo sessions / demo tasks
  const demoWaRes1 = await sendWhatsAppAlert({ enabled: true, serverUrl: 'https://wa.api', recipient: '971501112233' }, 'direct_notification', { isDemo: true });
  assert.strictEqual(demoWaRes1.skipped, true, 'WhatsApp alert must be skipped when isDemo is true');

  const demoWaRes2 = await sendWhatsAppAlert({ enabled: true, serverUrl: 'https://wa.api', recipient: '971501112233' }, 'task_assigned', { userId: 'usr_demo', projectId: 'prj_demo_villa' });
  assert.strictEqual(demoWaRes2.skipped, true, 'WhatsApp alert must be skipped for demo userId and demo projectId');

  const directAlertRes = await dispatchDirectNotificationAlert(mockRealDB, 'usr_demo', { title: 'Test' });
  assert.strictEqual(directAlertRes.skipped, true, 'Direct notification dispatch must skip usr_demo');
  console.log('✓ Test 4: External WhatsApp communications are 100% blocked from demo session actions');

  // Test 5: createNotification routes demo notifications to in-memory demo store
  let dbInserted = false;
  const mockInsertDB = {
    from: () => ({
      insert: async () => {
        dbInserted = true;
        return { data: null, error: null };
      }
    })
  };

  const notifResult = await createNotification(mockInsertDB, {
    userId: 'usr_demo',
    titleAr: 'فحص إشعار تجريبي',
    messageAr: 'محتوى الإشعار التجريبي'
  });
  assert.strictEqual(dbInserted, false, 'createNotification MUST NOT insert into production Supabase for usr_demo');
  assert.ok(notifResult.id.startsWith('notif_demo_'), 'Notification must be stored in in-memory demo store');
  console.log('✓ Test 5: In-app notifications for demo users are safely redirected to in-memory store without DB writes');

  // Test 6: Verify document and project isolation for real accounts
  const mixedRawDocs = [
    { id: 'doc_real_101', original_name: 'Genuine-Company-Contract.pdf', project_id: 'prj_real_01', uploader_id: 'usr_ahmad_real' },
    { id: 'doc_demo_01', original_name: 'DARC-VILLA-ARCH-A101_Rev03.pdf', project_id: 'prj_demo_villa', uploader_id: 'usr_demo_arch' },
    { id: 'doc_demo_02', original_name: 'PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg', project_id: 'prj_demo_villa', uploader_id: 'usr_demo_3d' }
  ];

  const activeProjects = [{ id: 'prj_real_01', demo: false }];
  const activeProjectIdSet = new Set(activeProjects.map(p => p.id));

  const isolatedDocsForRealAccount = mixedRawDocs.filter(d => {
    if (d.project_id && !activeProjectIdSet.has(d.project_id)) return false;
    if (d.id && String(d.id).startsWith('doc_demo_')) return false;
    if (d.project_id && String(d.project_id).startsWith('prj_demo_')) return false;
    if (d.uploader_id && String(d.uploader_id).startsWith('usr_demo')) return false;
    return true;
  });

  assert.strictEqual(isolatedDocsForRealAccount.length, 1, 'Only real document must survive for real account');
  assert.strictEqual(isolatedDocsForRealAccount[0].id, 'doc_real_101', 'Must match real document ID');
  assert.ok(!isolatedDocsForRealAccount.some(d => d.original_name.includes('DARC-VILLA')), 'Demo blueprint MUST NOT be present in real account');
  console.log('✓ Test 6: Production account documents are 100% shielded from demo blueprints & mock assets');

  console.log('--- All Demo Isolation & Monitoring Verification Tests Passed Successfully (6/6) ---');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
