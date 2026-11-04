import { state } from '../core/state.js';
import { choose, esc, icon, avatar, roleName, t, currentViewTitle, isNotificationRead } from '../core/utils.js';
import { getPendingMutations, isOnline } from '../core/offline.js';

export function renderSyncIndicator() {
  const pending = getPendingMutations();
  const count = pending.length;
  const online = isOnline();

  if (!online) {
    return `<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${choose('وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً', 'Offline Mode — all actions stored locally and will auto-sync')}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${choose('أوفلاين', 'Offline')}</span>
      ${count > 0 ? `<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${count}</span>` : ''}
    </button>`;
  }
  if (count > 0) {
    return `<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${choose('انقر للمزامنة الفورية مع السيرفر', 'Click to sync now with server')}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${choose('مزامنة معلقة', 'Pending Sync')}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${count}</span>
    </button>`;
  }
  return `<span class="btn btn-sm btn-ghost online-indicator-pill" style="font-size:11px;font-weight:600;color:var(--teal);border:1px solid rgba(20,184,166,0.2);background:rgba(20,184,166,0.05);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;pointer-events:none;" title="${choose('متصل بالسيرفر — كافة البيانات متزامنة ولحظية', 'Connected to Cloud — fully synced')}">
    <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 5px var(--teal);"></span>
    <span>${choose('متصل', 'Synced')}</span>
  </span>`;
}

export function initSyncIndicatorListener() {
  if (typeof window === 'undefined' || window._darcSyncIndicatorBound) return;
  window._darcSyncIndicatorBound = true;
  const updateIndicator = () => {
    const el = document.getElementById('sync-status-indicator');
    if (el) el.innerHTML = renderSyncIndicator();
  };
  window.addEventListener('darc:queue-change', updateIndicator);
  window.addEventListener('online', updateIndicator);
  window.addEventListener('offline', updateIndicator);
}

export function renderNavbar(customTitle = null) {
  const notifications = state.data?.notifications || [];
  const unread = notifications.filter((notification) => !isNotificationRead(notification)).length;
  const user = state.data?.user || {};
  const title = customTitle || currentViewTitle();

  return `
    <header class="topbar">
      <div class="topbar-left">
        <button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">
          ${icon('menu', 18)}
        </button>
        <div>
          <div class="topbar-kicker">DARC / ${t('workspace')}</div>
          <div class="topbar-title">${esc(title)}</div>
        </div>
      </div>
      <div class="topbar-right">
        <span id="sync-status-indicator">${renderSyncIndicator()}</span>
        <button class="topbar-search-trigger" data-action="open-omnisearch" title="${choose('بحث شامل وسريع', 'Omnisearch')}">
          ${icon('search', 14)}
          <span>${choose('بحث شامل...', 'Search...')}</span>
          <kbd class="shortcut-kbd">${typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl+K'}</kbd>
        </button>
        <button class="icon-button" data-action="open-cheatsheet" title="${choose('دليل اختصارات لوحة المفاتيح (?)', 'Keyboard shortcuts guide (?)')}" style="color:var(--ink-soft);" aria-label="Shortcuts">
          <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
        </button>
        <button class="btn btn-ghost btn-sm topbar-action-btn" data-action="toggle-theme" title="${choose('تبديل المظهر', 'Toggle Theme')}" aria-label="${choose('تبديل المظهر', 'Toggle Theme')}">${state.theme === 'dark' ? '☀️' : '🌙'}</button>
        <button class="btn btn-ghost btn-sm topbar-action-btn" data-action="toggle-lang" title="${choose('تبديل اللغة', 'Toggle Language')}" aria-label="${choose('تبديل اللغة', 'Toggle Language')}"><span class="lang-text">${state.lang === 'ar' ? 'EN' : 'عربي'}</span> ${icon('globe', 14)}</button>
        <button class="icon-button topbar-action-btn" data-action="show-notifications" aria-label="${t('notifications')}">${icon('bell', 17)}${unread ? '<span class="notification-dot"></span>' : ''}</button>
        <div class="topbar-divider"></div>
        <div class="profile-chip" data-action="open-user-profile" title="${esc(choose(user.name, user.nameEn || user.name))}">
          ${avatar(user)}
          <div class="profile-chip-text">
            <strong>${esc(choose(user.name, user.nameEn || user.name))}</strong>
            <span>${esc(roleName(user))}</span>
          </div>
        </div>
      </div>
    </header>
  `;
}

export function updateNavbarTitle(title = null) {
  const titleEl = document.querySelector('.topbar-title');
  if (titleEl) {
    titleEl.textContent = title || currentViewTitle();
  }
}

