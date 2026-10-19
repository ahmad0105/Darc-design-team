import { state } from '../core/state.js';

export function renderLoading() {
  document.getElementById('app').innerHTML = `<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${choose('جاري تجهيز مساحة العمل...', 'Preparing your workspace...')}</span></div></div>`;
}

export function closeModal() { 
  document.getElementById('modal-root').innerHTML = ''; 
  const previewOverlay = document.getElementById('preview-modal-overlay');
  if (previewOverlay) {
    previewOverlay.style.display = 'none';
    previewOverlay.innerHTML = '';
  }
  document.body.style.overflow = '';
}

export function modalShell(title, subtitle, body, id = '', extraClass = '') {
  document.body.style.overflow = 'hidden';
  return `<div class="modal-backdrop"><div class="modal ${extraClass}" data-modal="${id}"><div class="modal-head"><div><h2>${esc(title)}</h2><p>${esc(subtitle || '')}</p></div><button class="modal-close" type="button" data-action="close-modal">${icon('close', 15)}</button></div>${body}</div></div>`;
}

export function showToast(message, isError = false) {
  const stack = document.getElementById('toast-root'); if (!stack) return;
  const toast = document.createElement('div'); toast.className = `toast ${isError ? 'error' : ''}`; toast.innerHTML = `${icon(isError ? 'alert' : 'check', 16)}<span>${esc(message)}</span>`; stack.appendChild(toast); setTimeout(() => toast.remove(), 3600);
}

