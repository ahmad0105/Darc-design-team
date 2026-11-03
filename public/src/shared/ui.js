import { state } from '../core/state.js';
import { choose, esc, icon } from '../core/utils.js';

export function renderLoading() {
  document.getElementById('app').innerHTML = `<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${choose('جاري تجهيز مساحة العمل...', 'Preparing your workspace...')}</span></div></div>`;
}

let isClosingModal = false;
let _closeModalTimer = null;

export function closeModal(immediate = false) { 
  if (_closeModalTimer) {
    clearTimeout(_closeModalTimer);
    _closeModalTimer = null;
  }

  const previewOverlay = document.getElementById('preview-modal-overlay');
  if (previewOverlay) {
    previewOverlay.style.display = 'none';
    previewOverlay.innerHTML = '';
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
  return `<div class="modal-backdrop ${id ? `backdrop-${id}` : ''}"><div class="modal ${extraClass}" data-modal="${id}"><div class="modal-head"><div><h2>${esc(title)}</h2><p>${esc(subtitle || '')}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${choose('إغلاق', 'Close')}">${icon('close', 15)}</button></div>${body}</div></div>`;
}

/**
 * Unified Toast Notification Engine
 * Supports types: 'success' | 'error' | 'warning' | 'info' | 'upload'
 * Compatible with legacy signature: showToast(message, isError = false)
 */
export function showToast(message, typeOrIsError = 'success') {
  const stack = document.getElementById('toast-root');
  if (!stack || !message) return;

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
  toast.addEventListener('mouseenter', () => {
    if (autoDismissTimer) clearTimeout(autoDismissTimer);
  });
  toast.addEventListener('mouseleave', () => {
    autoDismissTimer = setTimeout(dismiss, 2000);
  });

  stack.appendChild(toast);
}

