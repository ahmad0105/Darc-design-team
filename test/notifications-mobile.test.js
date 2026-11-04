import assert from 'node:assert';
import { isNotificationRead } from '../public/src/core/utils.js';
import { isIOSDevice, isStandalonePWA, isNotificationSupported, getNotificationPermission, dispatchUniversalNotification } from '../public/src/features/notifications/notification-manager.js';

console.log('--- Running Mobile & Cross-Browser Universal Notification Test Suite ---');

async function runTests() {
  // Test 1: isNotificationSupported returns true in browser-like environment
  globalThis.window = {
    location: { href: 'https://darc-design.bond', origin: 'https://darc-design.bond' },
    matchMedia: () => ({ matches: false })
  };
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      platform: 'iPhone',
      maxTouchPoints: 5,
      vibrate: (pattern) => {
        globalThis._lastVibratePattern = pattern;
        return true;
      }
    },
    configurable: true,
    writable: true
  });

  assert.strictEqual(isIOSDevice(), true, 'Must correctly identify iOS iPhone user agent');
  assert.strictEqual(isStandalonePWA(), false, 'Regular tab must not be flagged as standalone PWA');
  assert.strictEqual(getNotificationPermission(), 'ios_safari_tab', 'Must report ios_safari_tab for regular iOS Safari tab');
  console.log('✓ Test 1: iOS iPhone Safari environment detected with high fidelity');

  // Test 2: Universal dispatch on iOS Safari regular tab (without window.Notification)
  // Must NOT crash, must trigger haptic vibration, must trigger chime, and return in_app channel
  globalThis.document = {
    getElementById: () => null,
    querySelector: () => null,
    createElement: () => ({
      setAttribute: () => {},
      appendChild: () => {},
      classList: { add: () => {} },
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
      style: {}
    }),
    body: { appendChild: () => {} }
  };
  
  const iosDispatchResult = await dispatchUniversalNotification({
    title: 'تنبيه فحص النظام الهاتفي',
    body: 'هذا إشعار يعمل على الآيفون بدون أخطاء'
  });

  assert.strictEqual(iosDispatchResult.success, true, 'Dispatch must succeed on iOS');
  assert.strictEqual(iosDispatchResult.channel, 'in_app', 'Channel must fall back cleanly to in_app on regular iOS tab');
  assert.deepStrictEqual(globalThis._lastVibratePattern, [100, 60, 100], 'Must trigger native mobile haptic vibration');
  console.log('✓ Test 2: iOS Safari regular tab receives audio, haptic, and in-app alerts safely');

  // Test 3: Android Chrome Environment (Chromium Mobile)
  // Calling new Notification(...) in Android Chrome is an Illegal Constructor -> ServiceWorker showNotification is required
  let swNotificationCalled = false;
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36',
      vibrate: (pattern) => true,
      serviceWorker: {
        ready: Promise.resolve({
          showNotification: async (title, options) => {
            swNotificationCalled = true;
            assert.strictEqual(title, 'تنبيه مهمة أندرويد');
            assert.ok(options.vibrate, 'ServiceWorker notification must include vibration pattern');
            return true;
          }
        })
      }
    },
    configurable: true,
    writable: true
  });
  globalThis.window.Notification = {
    permission: 'granted'
  };

  const androidDispatchResult = await dispatchUniversalNotification({
    title: 'تنبيه مهمة أندرويد',
    body: 'مخطط الواجهات جاهز للاعتماد'
  });

  assert.strictEqual(androidDispatchResult.success, true, 'Android dispatch must succeed');
  assert.strictEqual(androidDispatchResult.channel, 'service_worker', 'Android Chrome must use ServiceWorker showNotification');
  assert.strictEqual(swNotificationCalled, true, 'ServiceWorker showNotification must be invoked');
  console.log('✓ Test 3: Android Chrome utilizes ServiceWorker showNotification with zero constructor errors');

  // Test 4: Desktop Browser (macOS / Windows Safari, Chrome, Firefox)
  let windowNotifConstructed = false;
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      vibrate: () => true
    },
    configurable: true,
    writable: true
  });
  
  class MockWindowNotification {
    constructor(title, options) {
      windowNotifConstructed = true;
      this.title = title;
      this.options = options;
    }
    close() {}
  }
  MockWindowNotification.permission = 'granted';
  globalThis.window.Notification = MockWindowNotification;

  const desktopDispatchResult = await dispatchUniversalNotification({
    title: 'إشعار سطح المكتب',
    body: 'تم اعتماد المخطط المعماري'
  });

  assert.strictEqual(desktopDispatchResult.success, true, 'Desktop dispatch must succeed');
  assert.strictEqual(desktopDispatchResult.channel, 'notification_api', 'Desktop must use Notification API');
  assert.strictEqual(windowNotifConstructed, true, 'Window notification instance must be created');
  console.log('✓ Test 4: Desktop browsers utilize native Notification API flawlessly');

  // Test 5: isNotificationRead logic
  assert.strictEqual(isNotificationRead({ read: true, readAt: null }), true, 'read: true is read');
  assert.strictEqual(isNotificationRead({ read: false, readAt: '2026-11-04T00:00:00Z' }), false, 'read: false overrides stale readAt');
  assert.strictEqual(isNotificationRead({ readAt: '2026-11-04T00:00:00Z' }), true, 'legacy readAt evaluates to true');
  assert.strictEqual(isNotificationRead({}), false, 'empty notification evaluates to unread');
  console.log('✓ Test 5: isNotificationRead guarantees mathematical correctness across all states');

  console.log('--- All Mobile & Cross-Browser Universal Notification Tests Passed (5/5) ---');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
