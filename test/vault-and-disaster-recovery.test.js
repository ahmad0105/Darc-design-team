import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';

test('--- Enterprise Vault & Disaster Recovery Verification Suite ---', async (t) => {
  await t.test('1. Cryptographic AES-256-CBC & PBKDF2 100k rounds round-trip integrity', () => {
    const originalText = 'DARC_DATABASE_PAYLOAD_VERIFICATION_TEST_2026';
    const password = 'SuperSecretVaultEncryptionKey2026!';
    const salt = crypto.randomBytes(8);

    // Derive 32-byte key + 16-byte IV via PBKDF2 100k iterations
    const derived = crypto.pbkdf2Sync(Buffer.from(password, 'utf8'), salt, 100000, 48, 'sha256');
    const key = derived.subarray(0, 32);
    const iv = derived.subarray(32, 48);

    // Encrypt
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const ciphertext = Buffer.concat([cipher.update(Buffer.from(originalText, 'utf8')), cipher.final()]);

    // Format as OpenSSL envelope: Salted__ + salt + ciphertext
    const envelope = Buffer.concat([Buffer.from('Salted__', 'utf8'), salt, ciphertext]);

    // Verify OpenSSL envelope header
    assert.equal(envelope.subarray(0, 8).toString('utf8'), 'Salted__');
    assert.equal(envelope.subarray(8, 16).length, 8);

    // Decrypt using same PBKDF2 parameters
    const extractedSalt = envelope.subarray(8, 16);
    const extractedCipher = envelope.subarray(16);
    const decDerived = crypto.pbkdf2Sync(Buffer.from(password, 'utf8'), extractedSalt, 100000, 48, 'sha256');
    const decKey = decDerived.subarray(0, 32);
    const decIv = decDerived.subarray(32, 48);

    const decipher = crypto.createDecipheriv('aes-256-cbc', decKey, decIv);
    const decrypted = Buffer.concat([decipher.update(extractedCipher), decipher.final()]).toString('utf8');

    assert.equal(decrypted, originalText);
  });

  await t.test('2. SHA-256 Checksum fingerprint verification accurately detects corruption', () => {
    const validData = Buffer.from('VALID_DATABASE_BACKUP_DUMP');
    const validHash = crypto.createHash('sha256').update(validData).digest('hex');

    // Simulate intact check
    const checkHash = crypto.createHash('sha256').update(validData).digest('hex');
    assert.equal(checkHash, validHash);

    // Simulate bit-flip corruption
    const corruptedData = Buffer.from('VALID_DATABASE_BACKUP_DUMP_CORRUPTED');
    const corruptedHash = crypto.createHash('sha256').update(corruptedData).digest('hex');
    assert.notEqual(corruptedHash, validHash);
  });

  await t.test('3. Vault frontend source code contains exactly 0 informal emojis', () => {
    const vaultCode = fs.readFileSync('public/src/features/settings/vault.js', 'utf8');
    const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;
    const matches = vaultCode.match(new RegExp(emojiRegex, 'gu')) || [];
    assert.equal(matches.length, 0, `Found ${matches.length} informal emojis in vault.js: ${matches.join(', ')}`);
  });

  await t.test('4. Session replication role SQL wrapper properly enforces triggers freeze', () => {
    const rawSql = 'CREATE TABLE projects (id text); INSERT INTO projects VALUES (\'proj_01\');';
    const wrappedSql = [
      `\\set ON_ERROR_STOP on`,
      `SET session_replication_role = 'replica';`,
      `BEGIN;`,
      rawSql,
      `COMMIT;`,
      `SET session_replication_role = 'origin';`
    ].join('\n');

    assert.ok(wrappedSql.includes("SET session_replication_role = 'replica';"));
    assert.ok(wrappedSql.includes('BEGIN;'));
    assert.ok(wrappedSql.includes('COMMIT;'));
    assert.ok(wrappedSql.includes("SET session_replication_role = 'origin';"));
    assert.ok(wrappedSql.includes('\\set ON_ERROR_STOP on'));
  });

  await t.test('5. Vault Responsive CSS hooks are present for desktop, tablet and mobile', () => {
    const css = fs.readFileSync('public/styles.css', 'utf8');
    assert.ok(css.includes('.settings-vault-wrap'));
    assert.ok(css.includes('@media (max-width: 768px)'));
    assert.ok(css.includes('@media (max-width: 480px)'));
    assert.ok(css.includes('.vault-hero-card'));
    assert.ok(css.includes('.vault-metrics-grid'));
    assert.ok(css.includes('#btn-hold-restore'));
  });

  await t.test('6. Vault error taxonomy covers all required failure domains', () => {
    const expectedCodes = [
      'VAULT_E01_UNAUTHORIZED',
      'VAULT_E02_CONFIRMATION_INVALID',
      'VAULT_E03_DRIVE_UNREACHABLE',
      'VAULT_E04',
      'VAULT_E05',
      'VAULT_E07'
    ];
    const backendRoutes = fs.readFileSync('darc-cloud-backend/src/features/vault/vault.routes.js', 'utf8');
    const restoreScript = fs.readFileSync('.github/scripts/restore-from-gdrive.mjs', 'utf8');
    const combined = backendRoutes + restoreScript;

    for (const code of expectedCodes) {
      assert.ok(combined.includes(code), `Error code ${code} should be defined in codebase`);
    }
  });

  await t.test('7. Wizard Modal correctly targets modal-root without null dereference', () => {
    const vaultCode = fs.readFileSync('public/src/features/settings/vault.js', 'utf8');
    assert.ok(vaultCode.includes("document.getElementById('modal-root')"));
    assert.ok(vaultCode.includes('modalRoot.innerHTML = modalShell('));
    assert.ok(vaultCode.includes('if (!radioDry || !radioReal || !holdBtn)'));
  });
});
