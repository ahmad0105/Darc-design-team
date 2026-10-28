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
  return `<div class="modal-backdrop"><div class="modal ${extraClass}" data-modal="${id}"><div class="modal-head"><div><h2>${esc(title)}</h2><p>${esc(subtitle || '')}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${choose('إغلاق', 'Close')}">${icon('close', 15)}</button></div>${body}</div></div>`;
}

export function showToast(message, isError = false) {
  const stack = document.getElementById('toast-root'); if (!stack) return;
  const toast = document.createElement('div'); toast.className = `toast ${isError ? 'error' : ''}`; toast.innerHTML = `${icon(isError ? 'alert' : 'check', 16)}<span>${esc(message)}</span>`; stack.appendChild(toast); setTimeout(() => toast.remove(), 3600);
}

