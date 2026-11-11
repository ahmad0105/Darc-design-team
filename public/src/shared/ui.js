import { state } from '../core/state.js';
import { choose, esc, icon } from '../core/utils.js';

// Removes the full-screen splash screen with a quick fade.
// Called once — the very first time the app renders login or the workspace.
let _splashRemoved = false;
export function hideSplashScreen() {
  if (_splashRemoved) return;
  _splashRemoved = true;
  const splash = document.getElementById('darc-splash-screen');
  if (!splash) return;
  splash.style.transition = 'opacity 0.18s ease';
  splash.style.opacity = '0';
  setTimeout(() => { splash.style.display = 'none'; }, 190);
}

export function renderLoading() {
  hideSplashScreen();
  document.getElementById('app').innerHTML = `<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${choose('جاري تجهيز مساحة العمل...', 'Preparing your workspace...')}</span></div></div>`;
}

let isClosingModal = false;
let _closeModalTimer = null;
let _modalHistoryCount = 0;
let _ignoreNextPopState = false;

export function isAnyModalOpen() {
  if (typeof document === 'undefined') return false;
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot && modalRoot.hasChildNodes() && modalRoot.querySelector('.modal')) return true;
  if (document.getElementById('omnisearch-modal')) return true;
  const previewOverlay = document.getElementById('preview-modal-overlay');
  if (previewOverlay && previewOverlay.style.display !== 'none' && previewOverlay.innerHTML.trim() !== '') return true;
  const projectPrintOverlay = document.getElementById('project-report-preview-modal');
  if (projectPrintOverlay && projectPrintOverlay.style.display !== 'none' && projectPrintOverlay.innerHTML.trim() !== '') return true;
  const auditPrintOverlay = document.getElementById('audit-report-preview-modal');
  if (auditPrintOverlay && auditPrintOverlay.style.display !== 'none' && auditPrintOverlay.innerHTML.trim() !== '') return true;
  return false;
}

export function pushModalHistory(id = '') {
  if (typeof window !== 'undefined' && window.history && typeof window.history.pushState === 'function') {
    _modalHistoryCount++;
    try {
      window.history.pushState({ darcModal: id || 'active', count: _modalHistoryCount }, '');
    } catch (e) {}
  }
}

export function handleModalPopState() {
  if (_ignoreNextPopState) {
    _ignoreNextPopState = false;
    return;
  }
  if (isAnyModalOpen() || _modalHistoryCount > 0) {
    _modalHistoryCount = Math.max(0, _modalHistoryCount - 1);
    closeModal(false, true);
  }
}

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('popstate', handleModalPopState);
}

export function closeModal(immediate = false, fromPopstate = false) { 
  if (_closeModalTimer) {
    clearTimeout(_closeModalTimer);
    _closeModalTimer = null;
  }

  // Mobile Back-Button Sync: Pop history state if closed via UI button or backdrop
  if (!fromPopstate && _modalHistoryCount > 0) {
    _modalHistoryCount--;
    _ignoreNextPopState = true;
    if (typeof window !== 'undefined' && window.history && typeof window.history.back === 'function') {
      try {
        window.history.back();
      } catch (e) {}
    }
  }

  const previewOverlay = document.getElementById('preview-modal-overlay');
  if (previewOverlay) {
    previewOverlay.style.display = 'none';
    previewOverlay.innerHTML = '';
  }

  const projectPrintOverlay = document.getElementById('project-report-preview-modal');
  if (projectPrintOverlay) {
    projectPrintOverlay.style.display = 'none';
    projectPrintOverlay.innerHTML = '';
  }

  const auditPrintOverlay = document.getElementById('audit-report-preview-modal');
  if (auditPrintOverlay) {
    auditPrintOverlay.style.display = 'none';
    auditPrintOverlay.innerHTML = '';
  }

  const omnisearchModal = document.getElementById('omnisearch-modal');
  if (omnisearchModal) {
    omnisearchModal.remove();
  }

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot || !modalRoot.hasChildNodes()) {
    document.body.style.overflow = '';
    isClosingModal = false;
    return;
  }

  if (immediate) {
    modalRoot.innerHTML = '';
    document.body.style.overflow = '';
    isClosingModal = false;
    return;
  }

  if (isClosingModal) return;
  isClosingModal = true;

  const backdrop = modalRoot.querySelector('.modal-backdrop');
  const modal = modalRoot.querySelector('.modal');

  if (backdrop && modal) {
    backdrop.classList.add('is-closing');
    modal.classList.add('is-closing');
    _closeModalTimer = setTimeout(() => {
      _closeModalTimer = null;
      modalRoot.innerHTML = '';
      document.body.style.overflow = '';
      isClosingModal = false;
    }, 150);
  } else {
    modalRoot.innerHTML = '';
    document.body.style.overflow = '';
    isClosingModal = false;
  }
}

export function modalShell(title, subtitle, body, id = '', extraClass = '') {
  if (_closeModalTimer) {
    clearTimeout(_closeModalTimer);
    _closeModalTimer = null;
  }
  isClosingModal = false;
  document.body.style.overflow = 'hidden';
  pushModalHistory(id);
  return `<div class="modal-backdrop ${id ? `backdrop-${id}` : ''}"><div class="modal ${extraClass}" data-modal="${id}"><div class="modal-head"><div><h2>${esc(title)}</h2><p>${esc(subtitle || '')}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${choose('إغلاق', 'Close')}">${icon('close', 15)}</button></div>${body}</div></div>`;
}

/**
 * Unified Toast Notification Engine
 * Supports types: 'success' | 'error' | 'warning' | 'info' | 'upload'
 * Compatible with legacy signature: showToast(message, isError = false)
 */
export function showToast(message, typeOrIsError = 'success') {
  if (!message) return;
  let stack = document.getElementById('toast-root');
  if (!stack) {
    stack = document.createElement('div');
    stack.id = 'toast-root';
    stack.className = 'toast-stack';
    stack.setAttribute('role', 'region');
    stack.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(stack);
  }

  // Resolve type
  let type = 'success';
  if (typeof typeOrIsError === 'boolean') {
    type = typeOrIsError ? 'error' : 'success';
  } else if (typeof typeOrIsError === 'string' && typeOrIsError) {
    type = typeOrIsError.toLowerCase();
  }

  // Automatic intelligent type detection from message content
  if (type === 'success' || type === 'info') {
    const text = String(message);
    if (/رفع|مخطط|تحميل|تنزيل|ملف|upload|file|document|dwg|pdf/i.test(text)) {
      type = 'upload';
    } else if (/خطأ|فشل|تعذر|مرفوض|غير مصرح|blocked|error|fail|denied|حظر/i.test(text)) {
      type = 'error';
    } else if (/تحذير|انتبه|تنبيه|أوفلاين|offline|warn/i.test(text)) {
      type = 'warning';
    } else if (/إشعار|معلومة|رابط|نسخ|copied|info|bell/i.test(text)) {
      type = 'info';
    }
  }

  // Map icon name
  const iconMap = {
    success: 'check',
    error: 'alert',
    warning: 'alert',
    info: 'bell',
    upload: 'upload'
  };
  const iconName = iconMap[type] || 'check';

  // Strip duplicate leading/trailing emojis from message
  const cleanMessage = String(message)
    .replace(/^[\s\uFEFF\xA0]*[✅🔔🚀⚠️✨✓✕❌📑📊👥🎉]+\s*/u, '')
    .replace(/\s*[✅🔔🚀⚠️✨✓✕❌📑📊👥🎉]+[\s\uFEFF\xA0]*$/u, '')
    .trim();

  // Enforce Max 3 Toasts cap: smooth eviction of oldest active toast (Anti-Screen Flood)
  const activeToasts = Array.from(stack.children || []).filter(el => !el.dataset?.evicting);
  while (activeToasts.length >= 3) {
    const oldest = activeToasts.shift();
    if (!oldest) break;
    oldest.dataset.evicting = 'true';
    if (oldest._dismissTimer) clearTimeout(oldest._dismissTimer);
    oldest.classList.add('toast-exit');
    setTimeout(() => {
      try { oldest.remove(); } catch (e) {}
    }, 120);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} ${type === 'error' ? 'error' : ''}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  toast.innerHTML = `
    <span class="toast-icon-badge ${type}" aria-hidden="true">
      ${icon(iconName, 17)}
    </span>
    <div class="toast-content">
      <span class="toast-text" dir="auto">${esc(cleanMessage)}</span>
    </div>
    <button type="button" class="toast-close" aria-label="${choose('إغلاق', 'Close')}" title="${choose('إغلاق', 'Close')}">
      ${icon('close', 13)}
    </button>
  `;

  let autoDismissTimer = null;
  const dismiss = () => {
    if (autoDismissTimer) clearTimeout(autoDismissTimer);
    toast.classList.add('toast-exit');
    setTimeout(() => {
      try { toast.remove(); } catch (e) {}
    }, 220);
  };

  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });
  }

  autoDismissTimer = setTimeout(dismiss, 4200);
  toast._dismissTimer = autoDismissTimer;
  toast.addEventListener('mouseenter', () => {
    if (autoDismissTimer) clearTimeout(autoDismissTimer);
  });
  toast.addEventListener('mouseleave', () => {
    autoDismissTimer = setTimeout(dismiss, 2000);
    toast._dismissTimer = autoDismissTimer;
  });

  stack.appendChild(toast);
}

