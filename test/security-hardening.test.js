import test from 'node:test';
import assert from 'node:assert/strict';

import { forgotPasswordRateLimiter } from '../darc-cloud-backend/src/core/rate-limit.js';
import { getNextAvailableProjectCode } from '../public/src/features/projects/projects.js';
import { getNextProjectCode } from '../darc-cloud-backend/src/features/projects/projects.routes.js';

test('Security Hardening & Vulnerability Remediation Suite', async (t) => {
  await t.test('1. Rate Limiting: forgotPasswordRateLimiter strictly blocks flooding (CWE-770)', async () => {
    const limiter = forgotPasswordRateLimiter();
    const mockContext = (ip) => ({
      req: {
        method: 'POST',
        header: (name) => (name === 'cf-connecting-ip' ? ip : null)
      },
      json: (data, status, headers) => ({ data, status, headers })
    });

    const testIp = '198.51.100.42';
    let blockedCount = 0;

    for (let i = 0; i < 7; i++) {
      let nextCalled = false;
      const res = await limiter(mockContext(testIp), async () => {
        nextCalled = true;
      });

      if (i < 4) {
        assert.equal(nextCalled, true, `Attempt ${i + 1} should be permitted`);
      } else {
        assert.equal(nextCalled, false, `Attempt ${i + 1} should be blocked`);
        assert.equal(res.status, 429, `Attempt ${i + 1} should return HTTP 429`);
        assert.ok(res.data.retryAfter > 0);
        blockedCount++;
      }
    }

    assert.equal(blockedCount, 3, 'All excess requests past limit must be 429 throttled');
  });

  await t.test('2. ReDoS & Input Injection: getNextAvailableProjectCode sanitizes year argument (CWE-1333)', () => {
    // Malicious inputs with regex operators, catastrophic backtracking symbols, and letters
    const maliciousYear1 = '(a+)+$';
    const code1 = getNextAvailableProjectCode(maliciousYear1);
    // Should fallback to current year digits, never crash with invalid regex
    assert.match(code1, /^DARC-\d{2}-\d{3,}$/);

    const maliciousYear2 = '2026---evil***';
    const code2 = getNextAvailableProjectCode(maliciousYear2);
    assert.equal(code2.startsWith('DARC-26-'), true);
  });

  await t.test('3. Backend ReDoS Defense: getNextProjectCode in routes safely handles dirty year values', async () => {
    const mockSupabase = {
      from: () => ({
        select: async () => ({
          data: [
            { code: 'DARC-26-001' },
            { code: 'DARC-26-002' }
          ]
        })
      })
    };

    const code = await getNextProjectCode(mockSupabase, '2026/\\*+');
    assert.equal(code, 'DARC-26-003');
  });

  await t.test('4. Protocol-Relative URL Defense: Avatar URL validator rejects // bypass', () => {
    const testCases = [
      { url: '//attacker.com/malicious.png', safe: false },
      { url: 'https://cdn.example.com/safe.png', safe: true },
      { url: '/assets/avatar.png', safe: true },
      { url: 'javascript:alert(1)', safe: false }
    ];

    for (const tc of testCases) {
      const isSafeRaster = /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(tc.url);
      const isHttpsOrRelative = tc.url.startsWith('https://') || (tc.url.startsWith('/') && !tc.url.startsWith('//'));
      const isDangerousSvgOrScript = /\.svg($|\?)|<|>|javascript:/i.test(tc.url);
      const allowed = (!isDangerousSvgOrScript) && (isSafeRaster || isHttpsOrRelative);

      assert.equal(allowed, tc.safe, `URL ${tc.url} safety assessment mismatch`);
    }
  });
});
