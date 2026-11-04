import { choose, esc, icon, t } from '../../core/utils.js';
import { showToast, modalShell, closeModal } from '../../shared/ui.js';
import { playNotificationChime } from '../../core/realtime.js';

/**
 * Universal Mobile & Desktop Notification Engine
 * Compatible with iOS (Safari PWA), Android (Chrome Service Worker), macOS, Windows, Linux, and In-App WebViews
 */

export function isIOSDevice() {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function isStandalonePWA() {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (typeof window.matchMedia === 'function' && window.matchMedia('(display-mode: standalone)').matches) || 
    (typeof navigator !== 'undefined' && navigator.standalone === true) ||
    window.navigator?.standalone === true
  );
}

export function isNotificationSupported() {
  if (typeof window === 'undefined') return false;
  if ('Notification' in window && window.Notification) return true;
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) return true;
  return false;
}

export function getNotificationPermission() {
  if (typeof window === 'undefined') return 'default';
  if ('Notification' in window && window.Notification) {
    return window.Notification.permission;
  }
  // On iOS Safari outside PWA, system notification API is not exposed in regular tabs
  if (isIOSDevice() && !isStandalonePWA()) {
    return 'ios_safari_tab';
  }
  return 'default';
}

/**
 * Request notification permission universally across all mobile and desktop browsers
 */
export async function requestUniversalNotificationPermission() {
  if (typeof window === 'undefined') return { status: 'denied' };

  // 1. iOS Safari regular tab -> guide user to add to home screen for native iOS push
  if (isIOSDevice() && !isStandalonePWA()) {
    showIOSNotificationGuide();
    return { status: 'ios_guide_shown' };
  }

  // 2. Standard Notification API (Desktop, Android Chrome, iOS PWA standalone)
  if ('Notification' in window && window.Notification && typeof window.Notification.requestPermission === 'function') {
    try {
      const permission = await window.Notification.requestPermission();
      return { status: permission };
    } catch (err) {
      console.warn('[Notifications] window.Notification.requestPermission failed:', err);
    }
  }

  // 3. Fallback for environments with Service Worker Push
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && 'pushManager' in reg) {
        return { status: 'granted' };
      }
    } catch (e) {}
  }

  return { status: 'unsupported' };
}

/**
 * Dispatches a native or in-app notification with audio and mobile haptics across ALL devices
 */
export async function dispatchUniversalNotification({
  title = 'DARC Design Team 📐',
  body = '',
  icon = '/favicon.ico',
  badge = '/favicon.ico',
  url = null,
  tag = null,
  data = {}
} = {}) {
  // 1. Harmonic Audio Chime via Web Audio API (0 KB audio file, instant response)
  try {
    playNotificationChime();
  } catch (e) {}

  // 2. Mobile Device Haptic Vibration Feedback
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate([100, 60, 100]);
    } catch (e) {}
  }

  let dispatched = false;
  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '/');
  const notifTag = tag || `darc_notif_${Date.now()}`;

  // 3. Service Worker showNotification (Mandatory for Android Chrome & mobile PWAs)
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && typeof reg.showNotification === 'function') {
        const perm = getNotificationPermission();
        if (perm === 'granted') {
          await reg.showNotification(title, {
            body,
            icon,
            badge,
            tag: notifTag,
            vibrate: [100, 60, 100],
            data: { url: targetUrl, ...data },
            renotify: true
          });
          dispatched = true;
          return { success: true, channel: 'service_worker' };
        }
      }
    } catch (swErr) {
      console.warn('[Notifications] ServiceWorker showNotification failed:', swErr);
    }
  }

  // 4. Native Notification API (Desktop Safari, Chrome, Edge, Firefox)
  if (!dispatched && typeof window !== 'undefined' && 'Notification' in window && window.Notification && window.Notification.permission === 'granted') {
    try {
      const n = new window.Notification(title, {
        body,
        icon,
        badge,
        tag: notifTag,
        renotify: true
      });
      n.onclick = () => {
        window.focus();
        n.close();
        if (targetUrl) window.location.href = targetUrl;
      };
      dispatched = true;
      return { success: true, channel: 'notification_api' };
    } catch (nErr) {
      console.warn('[Notifications] window.Notification constructor failed:', nErr);
    }
  }

  // 5. Universal In-App Fallback (iOS Safari regular tabs, webviews, and permission pending)
  // Ensures every mobile and desktop user receives the notification alert visibly with zero errors
  showToast(`${title}: ${body}`, false);
  return { success: true, channel: 'in_app' };
}

/**
 * Elegant interactive modal guiding iOS users on enabling full push alerts on iPhone & iPad
 */
export function showIOSNotificationGuide() {
  const body = `
    <div style="padding:10px 4px;text-align:center;">
      <div style="width:56px;height:56px;border-radius:18px;background:var(--mint);color:var(--teal);display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px;box-shadow:0 4px 12px rgba(13,98,105,0.15);">
        ${icon('bell', 28)}
      </div>

      <h3 style="font-size:16px;font-weight:700;color:var(--ink);margin:0 0 8px;">
        ${choose('تفعيل الإشعارات الفورية على iPhone و iPad 📱', 'Enable Push Notifications on iPhone & iPad 📱')}
      </h3>
      
      <p style="font-size:12px;color:var(--muted);line-height:1.6;margin:0 0 20px;">
        ${choose(
          'للحصول على إشعارات النظام الفورية عند وصول مهام ومخططات وتنبيهات حتى عندما يكون الهاتف مغلقاً، يتطلب نظام iOS إضافة الموقع إلى الشاشة الرئيسية.',
          'To receive native iOS system alerts even when your phone is locked, Apple iOS requires adding the platform to your Home Screen.'
        )}
      </p>

      <div style="display:flex;flex-direction:column;gap:12px;text-align:start;background:var(--surface-soft);padding:14px;border-radius:12px;border:1px solid var(--line);margin-bottom:20px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">1</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${choose('اضغط على زر المشاركة (Share) في متصفح Safari', 'Tap the Share button in Safari')}</strong>
            <span style="font-size:11px;color:var(--muted);">${choose('الأيقونة المربعة مع السهم المتجه للأعلى [⎋] أسفل شاشة الهاتف.', 'The square icon with an upward arrow [⎋] at the bottom of the screen.')}</span>
          </div>
        </div>

        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">2</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${choose('اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)', 'Select "Add to Home Screen"')}</strong>
            <span style="font-size:11px;color:var(--muted);">${choose('ستجد أيقونة دارك الهندسية [+] ضمن قائمة الخيارات.', 'Look for the DARC icon [+] in the share sheet menu.')}</span>
          </div>
        </div>

        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">3</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${choose('افتح التطبيق من الشاشة الرئيسية واستمتع بالإشعارات', 'Open DARC from Home Screen')}</strong>
            <span style="font-size:11px;color:var(--muted);">${choose('ستظهر لك نافذة السماح بالإشعارات الفورية لنظام iOS مباشرة!', 'An iOS prompt will appear allowing push notifications seamlessly!')}</span>
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
        <button type="button" class="btn btn-primary btn-sm" data-action="close-modal" style="padding:8px 20px;">
          ${choose('فهمت ذلك 👍', 'Got it 👍')}
        </button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="test-in-app-notification" style="color:var(--teal);">
          🔔 ${choose('تجربة التنبيه الصوتي الآن', 'Test Sound Alert')}
        </button>
      </div>
    </div>
  `;

  document.getElementById('modal-root').innerHTML = modalShell(
    choose('إشعارات أجهزة iPhone & iPad', 'iPhone & iPad Notifications'),
    choose('دليل التفعيل السريع لإشعارات نظام Apple', 'Quick setup guide for Apple push alerts'),
    body,
    'ios-notif-guide',
    'modal-ios-notif-guide'
  );
}
