import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Executive Icons: public/src codebase has exactly 0 informal emojis', async (t) => {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/gu;
  const violations = [];

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist' && entry.name !== 'assets') {
          scanDirectory(fullPath);
        }
      } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.html'))) {
        // Skip the emoji stripper regular expression itself in ui.js
        if (entry.name === 'ui.js') continue;

        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (emojiRegex.test(line)) {
            const relPath = path.relative(rootDir, fullPath);
            violations.push(`${relPath}:${idx + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }

  scanDirectory(path.join(rootDir, 'public', 'src'));
  
  // Also scan public/index.html
  const indexHtml = fs.readFileSync(path.join(rootDir, 'public', 'index.html'), 'utf8');
  indexHtml.split('\n').forEach((line, idx) => {
    if (emojiRegex.test(line)) {
      violations.push(`public/index.html:${idx + 1}: ${line.trim()}`);
    }
  });

  if (violations.length > 0) {
    assert.fail(`Found ${violations.length} informal emojis in client codebase:\n` + violations.join('\n'));
  }
  assert.equal(violations.length, 0, 'Zero informal emojis found in client-facing code');
});

test('Icon System: utils.js exports icon() and statusDot() and has all core executive icons', async (t) => {
  const utilsCode = fs.readFileSync(path.join(rootDir, 'public', 'src', 'core', 'utils.js'), 'utf8');
  assert.ok(utilsCode.includes('export function icon('), 'utils.js exports icon()');
  assert.ok(utilsCode.includes('export function statusDot('), 'utils.js exports statusDot()');

  const requiredIcons = [
    'grid', 'building', 'checklist', 'layers', 'users', 'chart', 'settings',
    'bell', 'plus', 'search', 'calendar', 'clock', 'alert', 'check', 'close',
    'shield', 'mail', 'edit', 'trash', 'document', 'download', 'printer',
    'refresh', 'link', 'globe', 'zap', 'droplet', 'thermometer', 'flame',
    'archive', 'compass', 'success', 'error', 'warning', 'rocket', 'sun',
    'moon', 'phone', 'signal', 'bug', 'flask', 'inbox', 'pin', 'copy',
    'celebrate', 'chat', 'volume', 'bulb', 'megaphone', 'footprint', 'package',
    'leaf', 'construction'
  ];

  for (const name of requiredIcons) {
    assert.ok(utilsCode.includes(`${name}:`), `ICON_PATHS contains '${name}'`);
  }
});
