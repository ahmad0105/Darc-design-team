import { test } from 'node:test';
import assert from 'node:assert';
import {
  generateErrorFingerprint,
  diagnoseAutomatedSolution,
  recordErrorIncident,
  getIncidentsPerUser,
  resolveIncident
} from '../darc-cloud-backend/src/features/telemetry/telemetry.service.js';
import { scrubPII, recordBreadcrumb, getRecentBreadcrumbs } from '../public/src/core/telemetry.js';
import { createErrorHandler } from '../darc-cloud-backend/src/core/errors.js';

test('--- Enterprise APM Error Diagnostics & Incident Center Test Suite ---', async (t) => {

  await t.test('1. Cryptographic Normalized Fingerprint Engine produces deterministic hashes', () => {
    // Two errors from different users, different request IDs, and variable memory addresses
    const err1Type = 'TypeError';
    const err1Msg = 'Cannot read properties of undefined (reading 0x7ffd98b) for req_abc123';
    const err1Stack = 'TypeError: Cannot read properties of undefined\n    at parseFile (app.js:142:15)\n    at Object.run (app.js:20:5)';

    const err2Type = 'TypeError';
    const err2Msg = 'Cannot read properties of undefined (reading 0x11ab44c) for req_xyz789';
    const err2Stack = 'TypeError: Cannot read properties of undefined\n    at parseFile (app.js:999:88)\n    at Object.run (app.js:88:12)';

    const fp1 = generateErrorFingerprint(err1Type, err1Msg, err1Stack);
    const fp2 = generateErrorFingerprint(err2Type, err2Msg, err2Stack);

    assert.strictEqual(fp1, fp2, 'Fingerprint must normalize variable memory addresses, line numbers, and request IDs');
    assert.strictEqual(typeof fp1, 'string', 'Fingerprint must be a string');
    assert.ok(fp1.length >= 8, 'Fingerprint must be at least 8 characters');

    // Different error types must produce distinct fingerprints
    const fp3 = generateErrorFingerprint('NetworkError', 'Failed to fetch', 'Error: Failed to fetch\n    at fetch (app.js:1:1)');
    assert.notStrictEqual(fp1, fp3, 'Different errors must produce distinct fingerprints');
  });

  await t.test('2. Deduplication & Occurrences Aggregation increments counter and tracks affected users', async () => {
    const errorPayload = {
      userId: 'usr_demo_arch',
      errorType: 'WebGLContextLostError',
      errorMessage: 'THREE.WebGLRenderer: Context Lost on section canvas',
      stackTrace: 'Error: WebGL context lost\n    at WebGLViewer.render (viewer.js:40:10)',
      isDemo: true
    };

    const firstReport = await recordErrorIncident({}, errorPayload);
    assert.ok(firstReport.ok, 'First report must succeed');
    assert.ok(firstReport.incidentId, 'Must return incidentId');
    const incidentId = firstReport.incidentId;
    const initialOccurrences = firstReport.incident.occurrences || 1;

    // Second occurrence with another user
    const secondReport = await recordErrorIncident({}, {
      ...errorPayload,
      userId: 'usr_demo_int'
    });

    assert.ok(secondReport.ok, 'Second report must succeed');
    assert.strictEqual(secondReport.deduplicated, true, 'Second report must be deduplicated');
    assert.strictEqual(secondReport.incidentId, incidentId, 'Must link to the same incident record');
    assert.strictEqual(secondReport.incident.occurrences, initialOccurrences + 1, 'Occurrences counter must increment');
    assert.ok(secondReport.incident.affectedUsers.includes('usr_demo_arch'), 'Must retain first user');
    assert.ok(secondReport.incident.affectedUsers.includes('usr_demo_int'), 'Must include second user');
  });

  await t.test('3. Enterprise 20+ Domain Runbook Engine produces domain-specific solutions', () => {
    const webglSolution = diagnoseAutomatedSolution({
      errorType: 'WebGLContextLostError',
      errorMessage: 'THREE.WebGLRenderer: Context Lost'
    });
    assert.ok(webglSolution.includes('WebGL') && webglSolution.includes('LOD'), 'WebGL error must recommend LOD Decimation');

    const occSolution = diagnoseAutomatedSolution({
      errorType: 'ConcurrencyError',
      errorMessage: 'OCC 409 Conflict: Task version mismatch'
    });
    assert.ok(occSolution.includes('Optimistic Concurrency Control 409') || occSolution.includes('409'), 'OCC error must recommend state merge');

    const uploadSolution = diagnoseAutomatedSolution({
      errorType: 'HttpUploadError',
      errorMessage: 'HTTP 413 Payload Too Large on 180MB DWG'
    });
    assert.ok(uploadSolution.includes('413') && uploadSolution.includes('R2'), 'Upload error must recommend chunked multipart upload');

    const quotaSolution = diagnoseAutomatedSolution({
      errorType: 'QuotaExceededError',
      errorMessage: 'LocalStorage quota exceeded'
    });
    assert.ok(quotaSolution.includes('IndexedDB') || quotaSolution.includes('التخزين المؤقت'), 'Quota error must recommend IndexedDB storage');

    const rateLimitSolution = diagnoseAutomatedSolution({
      errorType: 'RateLimitError',
      errorMessage: 'Rate limit 429 exceeded'
    });
    assert.ok(rateLimitSolution.includes('Rate Limit 429') && rateLimitSolution.includes('Exponential Backoff'), 'Rate limit error must recommend exponential backoff');
  });

  await t.test('4. Deterministic OWASP PII Scrubber redacts tokens, cards, and credentials', () => {
    const rawJwt = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.doNotLeakThisSecret';
    const scrubbedJwt = scrubPII(rawJwt);
    assert.ok(!scrubbedJwt.includes('doNotLeakThisSecret'), 'JWT signature must not be leaked');
    assert.ok(scrubbedJwt.includes('[REDACTED_JWT]'), 'JWT must be replaced with [REDACTED_JWT]');

    const rawCard = 'Payment card number: 4532 0150 9988 1234 on checkout';
    const scrubbedCard = scrubPII(rawCard);
    assert.ok(!scrubbedCard.includes('4532 0150 9988 1234'), 'Card number must not be leaked');
    assert.ok(scrubbedCard.includes('[REDACTED_CARD]'), 'Card must be replaced with [REDACTED_CARD]');

    const sensitiveObj = {
      user: 'ahmad',
      password: 'SuperSecretPassword123!',
      nested: {
        token: 'xyz987token',
        apiKey: 'sk_live_123456789'
      }
    };
    const cleanObj = scrubPII(sensitiveObj);
    assert.strictEqual(cleanObj.password, '[REDACTED]', 'Password must be redacted');
    assert.strictEqual(cleanObj.nested.token, '[REDACTED]', 'Token must be redacted');
    assert.strictEqual(cleanObj.nested.apiKey, '[REDACTED]', 'API key must be redacted');
    assert.strictEqual(cleanObj.user, 'ahmad', 'Non-sensitive properties must be preserved');
  });

  await t.test('5. 5D Flight Recorder retains last 25 breadcrumbs with millisecond precision', () => {
    for (let i = 1; i <= 30; i++) {
      recordBreadcrumb('http.request', `GET /api/resource/${i} (200 OK)`);
    }
    const recent = getRecentBreadcrumbs();
    assert.ok(recent.length <= 25, 'Breadcrumbs buffer must be capped at 25 items');
    assert.strictEqual(recent[recent.length - 1].message, 'GET /api/resource/30 (200 OK)', 'Latest breadcrumb must be at the end');
    assert.ok(recent[recent.length - 1].time.includes('.'), 'Time must have millisecond precision');
  });

  await t.test('6. Backend 500 Uncaught Exception Capture intercepts fatal errors', () => {
    const errorHandler = createErrorHandler();
    const fatalError = new Error('Fatal database connection failure');
    fatalError.status = 500;

    let respondedStatus = 0;
    let jsonResponse = null;

    const mockContext = {
      get: (k) => k === 'requestId' ? 'req_test_apm_01' : null,
      req: {
        header: () => null,
        url: 'https://api.darc-design.bond/api/tasks',
        method: 'POST'
      },
      header: () => {},
      json: (data, status) => {
        jsonResponse = data;
        respondedStatus = status;
        return { data, status };
      },
      executionCtx: {
        waitUntil: (promise) => {
          assert.ok(promise && typeof promise.then === 'function', 'waitUntil must receive a promise');
        }
      },
      env: {
        ALERT_EMAIL: 'admin@darc-design.bond'
      }
    };

    errorHandler(fatalError, mockContext);

    assert.strictEqual(respondedStatus, 500, 'Must respond with status 500');
    assert.strictEqual(jsonResponse.code, 'INTERNAL_SERVER_ERROR', 'Must return INTERNAL_SERVER_ERROR code');
    assert.strictEqual(jsonResponse.requestId, 'req_test_apm_01', 'Must echo correlation requestId');
  });

  await t.test('7. Incident Resolution updates both memory and resolution metadata', async () => {
    const testReport = await recordErrorIncident({}, {
      userId: 'usr_demo_arch',
      errorType: 'TransientRenderError',
      errorMessage: 'Render timeout test',
      isDemo: true
    });

    const incId = testReport.incidentId;
    const resolveRes = await resolveIncident(incId, 'Senior Engineer Test');
    assert.ok(resolveRes.ok, 'Resolution must succeed');
    assert.strictEqual(resolveRes.incident.status, 'resolved', 'Status must be resolved');
    assert.strictEqual(resolveRes.incident.resolvedBy, 'Senior Engineer Test', 'Must record resolver');
    assert.ok(resolveRes.incident.resolvedAt, 'Must record resolution timestamp');
  });
});
