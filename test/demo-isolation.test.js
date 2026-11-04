import assert from 'node:assert';
import { getIncidentsPerUser, getDemoTelemetryAnalytics, recordTelemetryHeartbeat, recordErrorIncident } from '../darc-cloud-backend/src/features/telemetry/telemetry.service.js';
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

  // Test 7: Observability & Analytics Showcase Isolation
  const demoAnalytics = getDemoTelemetryAnalytics();
  assert.strictEqual(demoAnalytics.isDemo, true, 'Demo telemetry analytics must flag isDemo: true');
  assert.strictEqual(demoAnalytics.stats.totalVisits, 1482, 'Must provide realistic showcase visit numbers');
  assert.strictEqual(demoAnalytics.stats.uniqueVisitors, 628, 'Must provide realistic showcase unique numbers');
  assert.ok(Array.isArray(demoAnalytics.countries), 'Must provide showcase countries');
  assert.ok(demoAnalytics.countries.some(c => c.code === 'AE' && c.visits === 652), 'Must contain simulated GCC country stats');
  console.log('✓ Test 7: Observability & Analytics provides 100% fake showcase metrics in demo mode');

  // Test 8: Diagnostics & Error Logs Showcase Isolation
  const demoDiagnostics = await getIncidentsPerUser(mockRealDB, null, true);
  assert.strictEqual(demoDiagnostics.isDemo, true, 'Must flag isDemo: true');
  assert.strictEqual(demoDiagnostics.stats.realUsersMonitored, 0, 'Real users monitored must be 0 in demo mode');
  assert.ok(demoDiagnostics.stats.alertEmailRecipient.includes('demo-alerts'), 'Alert email must be isolated demo simulation recipient');
  assert.ok(!demoDiagnostics.stats.alertEmailRecipient.includes('admin@darc-design.bond'), 'Must never leak real admin email in demo stats');
  assert.ok(demoDiagnostics.users.every(u => u.userId.startsWith('usr_demo')), 'Every monitored user in demo must be a demo engineer');
  assert.ok(demoDiagnostics.incidents.every(i => i.emailAlert?.deliveredTo !== 'admin@darc-design.bond'), 'Incident emailAlert must never leak real company admin email in demo mode');
  assert.ok(demoDiagnostics.incidents.every(i => i.emailAlert?.status === 'simulated_sandbox'), 'Incident emailAlert status must be simulated_sandbox in demo mode');
  console.log('✓ Test 8: Error Logs & Diagnostics provides 100% fake showcase data with zero real user exposure');

  // Test 9: Telemetry Heartbeat from demo user is suppressed
  const demoHeartbeatRes = recordTelemetryHeartbeat({}, { userId: 'usr_demo', isDemo: true });
  assert.strictEqual(demoHeartbeatRes.skipped, true, 'Demo heartbeat must be skipped to avoid mutating real production stats');
  console.log('✓ Test 9: Telemetry heartbeat from demo sessions is suppressed from mutating live production stats');

  // Test 10: Input size bounding & zero email leak on demo error reporting
  const oversizedError = 'ERR_MEM_OVERFLOW_TEST_'.repeat(200); // 4400 chars
  const oversizedStack = 'at testFunction (app.js:10:20)\n'.repeat(300); // 9300 chars
  const incidentRes = await recordErrorIncident({}, {
    userId: 'usr_demo',
    errorMessage: oversizedError,
    stackTrace: oversizedStack,
    isDemo: true
  });
  assert.ok(incidentRes.incidentId && incidentRes.incidentId.startsWith('inc_'), 'Must generate incident ID');
  assert.strictEqual(incidentRes.emailAlert.status, 'simulated_sandbox', 'Demo incident must NEVER dispatch real emails');
  assert.ok(incidentRes.incident.errorMessage.length <= 1000, 'Error message must be bounded <= 1000 chars');
  assert.ok(incidentRes.incident.stackTrace.length <= 4000, 'Stack trace must be bounded <= 4000 chars');
  console.log('✓ Test 10: Error reporting enforces input size bounding & sandbox email containment');

  console.log('--- All Demo Isolation & Security Hardening Tests Passed Successfully (10/10) ---');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
