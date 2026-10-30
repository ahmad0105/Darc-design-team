import { state } from '../../core/state.js';
import { api, invalidateBootstrapEtag } from '../../core/api.js';
import { choose, esc, icon, t, savePreferencesCookies } from '../../core/utils.js';
import { modalShell, renderLoading } from '../../shared/ui.js';
import { loadData, renderApp } from '../../core/router.js';
import { getOfflineBootstrap, saveOfflineBootstrap } from '../../core/offline.js';

// Cloudflare Turnstile Configuration & On-Demand Lifecycle
const TURNSTILE_SITE_KEY = '0x4AAAAAAFr3zLr2zpRS2ah4';
let _turnstileWidgetId = null;
let _turnstileLoadPromise = null;
let _cachedTurnstileToken = null;
let _isInitializingTurnstile = false;

export function loadTurnstileScript() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (_turnstileLoadPromise) return _turnstileLoadPromise;

  _turnstileLoadPromise = new Promise((resolve) => {
    window.onloadTurnstileCallback = () => {
      resolve();
    };

    const existing = document.getElementById('cf-turnstile-script');
    if (existing) {
      if (window.turnstile) resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'cf-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback';
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.warn('[Turnstile] Script failed to load, fallback mode enabled');
      resolve();
    };
    document.body.appendChild(script);
  });

  return _turnstileLoadPromise;
}

export function cleanupTurnstile() {
  if (typeof window === 'undefined') return;
  _cachedTurnstileToken = null;
  if (window.turnstile && _turnstileWidgetId !== null) {
    try {
      window.turnstile.remove(_turnstileWidgetId);
    } catch (e) {}
    _turnstileWidgetId = null;
  }
  try {
    const container = document.getElementById('turnstile-container');
    if (container) container.innerHTML = '';
    document.querySelectorAll('iframe[src*="challenges.cloudflare.com"]').forEach(el => {
      try { el.remove(); } catch (e) {}
    });
    const scriptEl = document.getElementById('cf-turnstile-script');
    if (scriptEl) scriptEl.remove();
    _turnstileLoadPromise = null;
  } catch (e) {}
}

export async function initTurnstile() {
  if (typeof window === 'undefined') return;
  const container = document.getElementById('turnstile-container');
  if (!container) return;

  if (_isInitializingTurnstile) return;
  _isInitializingTurnstile = true;

  try {
    if (!window.turnstile) {
      await loadTurnstileScript();
    }
    if (!window.turnstile) {
      _isInitializingTurnstile = false;
      return;
    }

    const freshContainer = document.getElementById('turnstile-container');
    if (!freshContainer) {
      _isInitializingTurnstile = false;
      return;
    }

    if (_turnstileWidgetId !== null) {
      try {
        window.turnstile.remove(_turnstileWidgetId);
      } catch (e) {}
      _turnstileWidgetId = null;
    }

    _cachedTurnstileToken = null;

    _turnstileWidgetId = window.turnstile.render(freshContainer, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: state.theme === 'dark' ? 'dark' : 'light',
      language: state.lang === 'ar' ? 'ar' : 'en',
      appearance: 'interaction-only',
      callback: (token) => {
        _cachedTurnstileToken = token;
      },
      'error-callback': (err) => {
        console.warn('[Turnstile] Handshake notice (shielded):', err);
        _cachedTurnstileToken = 'fallback_client';
      },
      'expired-callback': () => {
        _cachedTurnstileToken = null;
        if (window.turnstile && _turnstileWidgetId !== null) {
          try { window.turnstile.reset(_turnstileWidgetId); } catch (e) {}
        }
      }
    });
  } catch (err) {
    console.warn('[Turnstile] Init notice:', err);
    _cachedTurnstileToken = 'fallback_client';
  } finally {
    _isInitializingTurnstile = false;
  }
}

if (typeof window !== 'undefined') {
  window.__darcInitTurnstile = initTurnstile;
}

async function getTurnstileToken() {
  if (typeof window === 'undefined' || !window.turnstile) {
    return 'fallback_client';
  }

  // 1. Instant check: token pre-resolved during render (0ms latency)
  if (_cachedTurnstileToken) {
    return _cachedTurnstileToken;
  }

  if (_turnstileWidgetId !== null) {
    try {
      const existing = window.turnstile.getResponse(_turnstileWidgetId);
      if (existing) {
        _cachedTurnstileToken = existing;
        return existing;
      }
    } catch (e) {}
  }

  // 2. If Turnstile is still resolving, poll with high-frequency 35ms intervals up to 1200ms max
  return new Promise((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(_cachedTurnstileToken || 'fallback_client');
      }
    }, 1200);

    const checkInterval = setInterval(() => {
      if (settled) {
        clearInterval(checkInterval);
        return;
      }
      if (_cachedTurnstileToken) {
        settled = true;
        clearTimeout(timer);
        clearInterval(checkInterval);
        resolve(_cachedTurnstileToken);
        return;
      }
      if (_turnstileWidgetId !== null && window.turnstile) {
        try {
          const resp = window.turnstile.getResponse(_turnstileWidgetId);
          if (resp) {
            settled = true;
            clearTimeout(timer);
            clearInterval(checkInterval);
            _cachedTurnstileToken = resp;
            resolve(resp);
            return;
          }
        } catch (e) {}
      }
    }, 35);
  });
}

// Calculate password strength score (0 to 4)
export function calculatePasswordStrength(pass) {
  const password = String(pass || '');
  if (!password) return { score: 0, label: '', percent: 0, color: 'var(--line)' };
  
  let score = 0;
  if (password.length >= 10) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(password)) score += 1;

  if (score === 1) return { score: 1, label: state.lang === 'ar' ? 'ضعيفة جداً' : 'Very weak', percent: 25, color: 'var(--red)' };
  if (score === 2) return { score: 2, label: state.lang === 'ar' ? 'متوسطة' : 'Fair', percent: 50, color: 'var(--amber)' };
  if (score === 3) return { score: 3, label: state.lang === 'ar' ? 'جيدة' : 'Good', percent: 75, color: 'var(--blue)' };
  return { score: 4, label: state.lang === 'ar' ? 'قوية وممتازة 🛡️' : 'Strong & Secure 🛡️', percent: 100, color: 'var(--mint-strong)' };
}

// Render dynamic strength meter HTML
export function renderStrengthMeterHtml(idPrefix = 'strength') {
  return `
    <div id="${idPrefix}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${idPrefix}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${idPrefix}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${state.lang === 'ar' ? '10 أحرف + أرقام ورموز' : '10+ chars, mixed, digits & symbols'}</span>
      </div>
    </div>
  `;
}

// Helper: Setup live password meter and match checking
function bindLivePasswordChecks(formId, passName, confirmName, meterPrefix, submitBtnSelector) {
  const form = document.getElementById(formId);
  if (!form) return;

  const passInput = form.querySelector(`input[name="${passName}"]`);
  const confirmInput = form.querySelector(`input[name="${confirmName}"]`);
  const submitBtn = form.querySelector(submitBtnSelector || 'button[type="submit"]');
  const meterWrap = document.getElementById(`${meterPrefix}-meter-wrap`);
  const meterBar = document.getElementById(`${meterPrefix}-meter-bar`);
  const meterLabel = document.getElementById(`${meterPrefix}-meter-label`);
  const matchIndicator = document.getElementById(`${meterPrefix}-match-indicator`);

  function update() {
    const p1 = passInput ? passInput.value : '';
    const p2 = confirmInput ? confirmInput.value : '';

    if (p1 && meterWrap && meterBar && meterLabel) {
      meterWrap.style.display = 'flex';
      const strength = calculatePasswordStrength(p1);
      meterBar.style.width = `${strength.percent}%`;
      meterBar.style.background = strength.color;
      meterLabel.textContent = strength.label;
      meterLabel.style.color = strength.color;
    } else if (meterWrap) {
      meterWrap.style.display = 'none';
    }

    if (confirmInput && matchIndicator) {
      if (!p2) {
        matchIndicator.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;
      } else if (p1 === p2) {
        matchIndicator.style.display = 'block';
        matchIndicator.style.color = 'var(--mint-strong)';
        matchIndicator.textContent = state.lang === 'ar' ? '✓ كلمتا المرور متطابقتان' : '✓ Passwords match';
        if (submitBtn) submitBtn.disabled = false;
      } else {
        matchIndicator.style.display = 'block';
        matchIndicator.style.color = 'var(--red)';
        matchIndicator.textContent = state.lang === 'ar' ? '✗ كلمتا المرور غير متطابقتين' : '✗ Passwords do not match';
        if (submitBtn) submitBtn.disabled = true;
      }
    }
  }

  passInput?.addEventListener('input', update);
  confirmInput?.addEventListener('input', update);
}

// Helper: Universal Password Toggle
function bindUniversalPasswordToggles() {
  document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const input = targetId ? document.getElementById(targetId) : btn.parentElement.querySelector('input');
      if (!input) return;
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      btn.style.color = isPass ? 'var(--teal)' : 'var(--ink-soft)';
      const label = isPass ? (state.lang === 'ar' ? 'إخفاء كلمة المرور' : 'Hide password') : (state.lang === 'ar' ? 'إظهار كلمة المرور' : 'Show password');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      
      // Dynamic SVG swap: Eye vs Eye-Off
      if (isPass) {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
      } else {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
      }
      try { input.focus(); } catch (err) {}
    };
  });

  // CapsLock active indicator
  document.querySelectorAll('input[type="password"]').forEach(input => {
    const handleCaps = (e) => {
      const capsOn = e.getModifierState && e.getModifierState('CapsLock');
      let warning = input.parentElement.parentElement.querySelector('.capslock-warning');
      if (capsOn) {
        if (!warning) {
          warning = document.createElement('div');
          warning.className = 'capslock-warning';
          warning.style.fontSize = '11px';
          warning.style.color = 'var(--amber)';
          warning.style.marginTop = '4px';
          warning.style.display = 'flex';
          warning.style.alignItems = 'center';
          warning.style.gap = '4px';
          warning.innerHTML = `<span>⚠️</span> <span>${state.lang === 'ar' ? 'زر الحروف الكبيرة (Caps Lock) مفعّل' : 'Caps Lock is active'}</span>`;
          input.parentElement.parentElement.appendChild(warning);
        }
      } else if (warning) {
        warning.remove();
      }
    };
    input.addEventListener('keydown', handleCaps);
    input.addEventListener('keyup', handleCaps);
  });
}

// Rate-limiting Countdown Timer
function startRateLimitCountdown(buttonEl, seconds = 60) {
  if (!buttonEl) return;
  buttonEl.disabled = true;
  let remaining = seconds;
  const originalText = buttonEl.innerHTML;
  
  const timer = setInterval(() => {
    remaining--;
    buttonEl.innerHTML = `<span>${state.lang === 'ar' ? `يرجى الانتظار (${remaining} ثانية)...` : `Please wait (${remaining}s)...`}</span>`;
    if (remaining <= 0) {
      clearInterval(timer);
      buttonEl.disabled = false;
      buttonEl.innerHTML = originalText;
    }
  }, 1000);
}

export function renderLogin(errorMessage = '', mode = 'login', isSuccess = false) {
  state.view = 'login';
  
  // Instantly synchronize browser URL address bar to #login or #forgot
  if (typeof window !== 'undefined') {
    const targetHash = mode === 'forgot' ? '#forgot' : '#login';
    if (window.location.hash !== targetHash) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', targetHash);
      } else {
        window.location.hash = targetHash;
      }
    }
  }

  document.body.classList.remove('in-app');
  document.body.classList.toggle('is-ltr', state.lang === 'en');
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dataset.theme = state.theme || 'light';
  
  let formContent = '';
  const messageHtml = errorMessage ? `<div class="login-demo" style="border-color:${isSuccess ? '#cce3e0' : 'var(--red-soft)'};background:${isSuccess ? '#f0f9f7' : 'var(--red-soft)'};color:${isSuccess ? 'var(--teal)' : 'var(--red)'};margin-top:0;margin-bottom:15px">${icon(isSuccess ? 'check' : 'alert', 15)}<span>${esc(errorMessage)}</span></div>` : '';
  const savedEmail = (typeof localStorage !== 'undefined' ? localStorage.getItem('darc_last_email') : '') || '';

  if (mode === 'login') {
    formContent = `
      <form id="login-form">
        <div class="field">
          <label for="login-email">${t('emailAddress')}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${esc(savedEmail)}" required />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label for="login-password">${t('password')}</label>
            <a href="#" data-action="goto-forgot" style="font-size:12px;color:var(--blue);text-decoration:none">${choose('نسيت كلمة المرور؟', 'Forgot password?')}</a>
          </div>
          <div style="position:relative;display:flex;align-items:center;">
            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
            <button type="button" data-action="toggle-password-visibility" data-target="login-password" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose('إظهار/إخفاء كلمة المرور', 'Show/Hide password')}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin:4px 0 16px;font-size:12px;">
          <label style="display:flex;align-items:center;gap:7px;cursor:pointer;color:var(--ink-soft);user-select:none;">
            <input type="checkbox" id="remember-email-check" ${savedEmail ? 'checked' : ''} style="cursor:pointer;accent-color:var(--teal);" />
            <span>${choose('تذكر بريدي الإلكتروني على هذا الجهاز', 'Remember my email on this device')}</span>
          </label>
        </div>
        <div id="login-error-container">${messageHtml}</div>
        <div id="turnstile-container" style="margin-bottom:12px;min-height:0;display:flex;justify-content:center;"></div>
        <button class="btn btn-primary btn-block" type="submit">${icon(state.lang === 'ar' ? 'arrowLeft' : 'arrowRight', 16)} ${t('login')}</button>
      </form>
      <div class="demo-showcase-box" style="margin-top:20px;padding:14px 16px;border-radius:10px;background:var(--surface-soft, rgba(13,98,105,0.06));border:1px dashed rgba(20,184,166,0.4);display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--brand-teal, #0d6269);">
            <span>✨</span>
            <span>${choose('بيئة العرض التجريبي (Demo Showcase)', 'Live Demo Showcase')}</span>
          </div>
          <span style="font-size:10px;background:rgba(20,184,166,0.15);color:var(--brand-teal, #0d6269);padding:2px 8px;border-radius:12px;font-weight:600;">
            ${choose('للزوار ومدراء التوظيف', 'For Visitors & Hiring Managers')}
          </span>
        </div>
        <div style="font-size:11px;color:var(--ink-soft);display:flex;flex-direction:column;gap:3px;font-family:var(--font-mono, monospace);">
          <div><strong>${choose('البريد:', 'Email:')}</strong> <code>demo@darc-design.bond</code></div>
          <div><strong>${choose('كلمة المرور:', 'Password:')}</strong> <code>demo123456</code></div>
        </div>
        <button type="button" class="btn btn-sm btn-soft" data-action="quick-fill-login" data-email="demo@darc-design.bond" data-pass="demo123456" data-autosubmit="true" style="width:100%;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 12px;border-radius:6px;cursor:pointer;">
          <span>⚡</span>
          <span>${choose('تعبئة تلقائية ودخول فوري', 'Auto-fill & Sign In')}</span>
        </button>
      </div>
    `;
  } else if (mode === 'forgot') {
    formContent = `
      <form id="forgot-form">
        <div class="field"><label for="login-email">${t('emailAddress')}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${esc(savedEmail)}" required /></div>
        ${messageHtml}
        <button class="btn btn-primary btn-block" type="submit">${choose('إرسال رابط الاستعادة', 'Send reset link')}</button>
        <div style="text-align:center;margin-top:15px"><a href="#" data-action="goto-login" style="font-size:13px;color:var(--ink-soft)">${choose('العودة لتسجيل الدخول', 'Back to login')}</a></div>
      </form>
    `;
  }

  document.getElementById('app').innerHTML = `
    <div class="login-shell ${state.lang === 'en' ? 'is-ltr' : ''}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup">
            <span class="brand-mark">${icon('building', 24)}</span>
            <div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose('مساحة تشغيل المشاريع', 'Project operations workspace')}</div></div>
          </div>
          <div class="login-art-content">
            <p class="eyebrow">${choose('وضوح · مسؤولية · إنجاز', 'CLARITY · OWNERSHIP · DELIVERY')}</p>
            <h1>${choose('كل مشروع واضح. كل خطوة محسوبة.', 'Every project clear. Every move accounted for.')}</h1>
            <p>${choose('لوحة هادئة لإدارة التصميم والتنفيذ، تجمع فريق DARC حول أحدث قرار وأهم موعد.', 'A calm operating layer for design and delivery, bringing the DARC team around the latest decision and the next important deadline.')}</p>
          </div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${mode === 'login' ? choose('مرحبًا بعودتك', 'WELCOME BACK') : choose('استعادة الحساب', 'ACCOUNT RECOVERY')}</p><h2>${mode === 'login' ? t('login') : choose('نسيت كلمة المرور', 'Forgot Password')}</h2><p class="intro">${mode === 'login' ? t('loginIntro') : choose('أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.', 'Enter your email to receive a reset link.')}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${state.theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}">${state.theme === 'dark' ? '☀️' : '🌙'}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${state.lang === 'ar' ? 'EN' : 'عربي'}</button>
              </div>
            </div>
            ${formContent}
          </div>
        </section>
      </div>
    </div>`;

  bindUniversalPasswordToggles();

  const showLoginError = (msg) => {
    const errBox = document.getElementById('login-error-container');
    if (errBox) {
      errBox.innerHTML = msg ? `
        <div class="login-demo" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.08);color:var(--red);margin-top:0;margin-bottom:15px;padding:10px 14px;border-radius:8px;font-size:12.5px;display:flex;align-items:center;gap:8px;line-height:1.5;">
          ${icon('alert', 16)}
          <span>${esc(msg)}</span>
        </div>` : '';
    } else {
      renderLogin(msg, 'login');
    }
  };

  document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const rememberMe = document.getElementById('remember-email-check')?.checked;
    const button = event.currentTarget.querySelector('button[type="submit"]');
    const defaultBtnHtml = `${icon(state.lang === 'ar' ? 'arrowLeft' : 'arrowRight', 16)} ${t('login')}`;
    
    // Clear previous error
    showLoginError('');

    button.disabled = true;
    button.innerHTML = `<span>⏳ ${choose('جاري التحقق وتسجيل الدخول...', 'Verifying & signing in...')}</span>`;

    const isDemo = email.trim().toLowerCase() === 'demo@darc-design.bond' || email.trim().toLowerCase() === 'demo@darc.local';
    let turnstileToken = 'bypass_dev';
    if (!isDemo) {
      turnstileToken = await getTurnstileToken();
    }
    
    try {
      const loginRes = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, turnstileToken })
      });
      cleanupTurnstile();
      if (typeof localStorage !== 'undefined') {
        if (loginRes?.token) {
          localStorage.setItem('darc_token', loginRes.token);
        }
        if (rememberMe) {
          localStorage.setItem('darc_last_email', email);
        } else {
          localStorage.removeItem('darc_last_email');
        }
      }
      savePreferencesCookies({ theme: state.theme, lang: state.lang });
      state.view = 'dashboard';

      // 1. Ultra-Fast Zero-Latency Path: If backend pre-bundled bootstrap (e.g. demo sandbox)
      if (loginRes?.bootstrap) {
        state.data = loginRes.bootstrap;
        saveOfflineBootstrap(loginRes.bootstrap);
        renderApp();
        loadData(true).catch(() => {});
        return;
      }

      // 2. High-Performance Instant Paint: Use offline cache if matching user exists
      const cached = getOfflineBootstrap();
      if (cached && cached.user && (cached.user.id === loginRes?.user?.id || loginRes?.user?.email === cached.user?.email)) {
        cached.user = loginRes.user || cached.user;
        state.data = cached;
        renderApp(); // Instant 0ms Paint!
        loadData(true).catch(() => {});
        return;
      }

      // 3. Clean first-time login transition
      invalidateBootstrapEtag();
      renderLoading();
      await loadData();
      renderApp();
    } catch (error) {
      console.error("Login Error:", error);
      if (typeof window !== 'undefined' && window.turnstile && _turnstileWidgetId !== null) {
        try { window.turnstile.reset(_turnstileWidgetId); } catch (e) {}
      }
      if (button) {
        button.disabled = false;
        button.innerHTML = defaultBtnHtml;
      }

      // User-friendly, crystal-clear Arabic error clarification
      let friendlyMessage = error.message;

      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        friendlyMessage = choose(
          'لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة وإعادة المحاولة.',
          'No internet connection. Please check your network and try again.'
        );
      } else if (error.message && (error.message.includes('Turnstile') || error.message.includes('التحقق الأمني'))) {
        friendlyMessage = choose(
          'فشل التحقق الأمني التلقائي (Cloudflare Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.',
          'Security check (Turnstile) failed. Please refresh the page and try again.'
        );
      } else if (error.message && (error.message.includes('429') || error.message.includes('كثيرة') || error.message.includes('rate'))) {
        friendlyMessage = choose(
          'تم تجاوز عدد محاولات الدخول المسموحة لحماية الحساب. يرجى الانتظار دقيقة واحدة قبل المحاولة مجدداً.',
          'Too many login attempts. For security, please wait one minute before trying again.'
        );
        const newBtn = document.querySelector('#login-form button[type="submit"]');
        startRateLimitCountdown(newBtn, 60);
      } else if (error.message && (error.message.includes('401') || error.message.includes('غير صحيحة') || error.message.includes('credentials'))) {
        friendlyMessage = choose(
          'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من صحة المدخلات وإعادة المحاولة.',
          'Incorrect email or password. Please verify your credentials and try again.'
        );
        const passInput = document.getElementById('login-password');
        if (passInput) {
          passInput.value = '';
          try { passInput.focus(); } catch (e) {}
        }
      } else if (error.message && (error.message.includes('مفعل') || error.message.includes('موقوف') || error.message.includes('inactive'))) {
        friendlyMessage = choose(
          'حسابك معطل أو غير مفعل حالياً. يرجى التواصل مع مسؤول النظام لإعادة التفعيل.',
          'This account is suspended or inactive. Please contact your system administrator.'
        );
      } else if (!friendlyMessage || friendlyMessage.includes('Failed to fetch') || friendlyMessage.includes('NetworkError') || friendlyMessage.includes('Network request failed')) {
        friendlyMessage = choose(
          'تعذر الاتصال بخادم تسجيل الدخول. يرجى التأكد من استقرار الإنترنت وإعادة المحاولة.',
          'Could not reach the authentication server. Please check your connection and try again.'
        );
      }

      showLoginError(friendlyMessage);
    }
  });

  document.getElementById('forgot-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const button = event.currentTarget.querySelector('button[type="submit"]');
    const originalText = button ? button.innerHTML : '';
    if (button) {
      button.disabled = true;
      button.innerHTML = `<span>⏳ ${choose('جاري إرسال الرابط...', 'Sending reset link...')}</span>`;
    }
    try {
      await api('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
      renderLogin(choose('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح ✨', 'Password reset link sent to your email successfully ✨'), 'forgot', true);
    } catch (error) {
      if (button) {
        button.disabled = false;
        button.innerHTML = originalText;
      }
      renderLogin(error.message, 'forgot');
    }
  });

  if (mode === 'login') {
    initTurnstile();
  } else {
    cleanupTurnstile();
  }
}

export function renderActivation(token, errorMessage = '') {
  document.body.classList.remove('in-app');
  document.body.classList.toggle('is-ltr', state.lang === 'en');
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dataset.theme = state.theme || 'light';

  document.getElementById('app').innerHTML = `
    <div class="login-shell ${state.lang === 'en' ? 'is-ltr' : ''}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${icon('building', 24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose('تفعيل حساب الفريق', 'Team account activation')}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${choose('خطوة واحدة للبدء', 'ONE STEP TO START')}</p><h1>${choose('أكمل حسابك وانضم إلى مساحة العمل.', 'Finish your account and join the workspace.')}</h1><p>${choose('اختر كلمة مرور آمنة للوصول إلى المشاريع والمهام المسندة إليك.', 'Choose a secure password to access your projects and assigned work.')}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${choose('دعوة DARC الرسمية', 'DARC INVITE')}</p><h2>${choose('تفعيل الحساب', 'Activate account')}</h2><p class="intro">${choose('يجب أن تحتوي كلمة المرور على 10 أحرف على الأقل مع رموز وأرقام.', 'Your password must be at least 10 characters with numbers and symbols.')}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${state.theme === 'dark' ? '☀️' : '🌙'}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${state.lang === 'ar' ? 'EN' : 'عربي'}</button>
              </div>
            </div>
            <form id="activation-form">
              <input type="hidden" name="token" value="${esc(token)}" />
              <div class="field">
                <label for="act-pass">${t('password')}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose('إظهار/إخفاء كلمة المرور', 'Show/Hide password')}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${renderStrengthMeterHtml('act')}
              </div>
              <div class="field">
                <label for="act-pass-confirm">${choose('تأكيد كلمة المرور', 'Confirm password')}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass-confirm" name="passwordConfirm" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose('إظهار/إخفاء كلمة المرور', 'Show/Hide password')}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="act-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${errorMessage ? `<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${icon('alert', 15)}<span>${esc(errorMessage)}</span></div>` : ''}
              <button class="btn btn-primary btn-block" type="submit">${icon('shield', 16)} ${choose('تفعيل الحساب والدخول', 'Activate and sign in')}</button>
            </form>
            <div class="login-demo">${icon('lock', 16)}<span>${choose('جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.', 'Your session is encrypted and your password is never stored in plain text.')}</span></div>
          </div>
        </section>
      </div>
    </div>`;

  bindUniversalPasswordToggles();
  bindLivePasswordChecks('activation-form', 'password', 'passwordConfirm', 'act', '#activation-form button[type="submit"]');
}

export function renderResetPassword(token, errorMessage = '') {
  document.body.classList.remove('in-app');
  document.body.classList.toggle('is-ltr', state.lang === 'en');
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dataset.theme = state.theme || 'light';

  const cleanToken = (typeof token === 'string' && /^[a-zA-Z0-9_-]{24,128}$/.test(token.trim())) ? token.trim() : null;
  const tokenError = (!cleanToken && !errorMessage) ? choose('رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.', 'Invalid or missing password reset link. Please request a new link.') : '';

  document.getElementById('app').innerHTML = `
    <div class="login-shell ${state.lang === 'en' ? 'is-ltr' : ''}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${icon('building', 24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose('استعادة كلمة المرور', 'Password Recovery')}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${choose('استعادة الحساب', 'ACCOUNT RECOVERY')}</p><h1>${choose('اختر كلمة مرور جديدة لحسابك.', 'Choose a new password for your account.')}</h1><p>${choose('كلمة المرور يجب أن تكون قوية وغير مستخدمة من قبل.', 'Password should be strong and unique.')}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${choose('استعادة الحساب', 'ACCOUNT RECOVERY')}</p><h2>${choose('كلمة مرور جديدة', 'New Password')}</h2><p class="intro">${choose('أدخل كلمة المرور الجديدة وقم بتأكيدها.', 'Enter and confirm your new password.')}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${state.theme === 'dark' ? '☀️' : '🌙'}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${state.lang === 'ar' ? 'EN' : 'عربي'}</button>
              </div>
            </div>
            <form id="reset-form">
              <input type="hidden" name="token" value="${esc(cleanToken || '')}" />
              <div class="field">
                <label for="rst-pass">${choose('كلمة المرور الجديدة', 'New Password')}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass" name="newPassword" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required ${!cleanToken ? 'disabled' : ''} />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose('إظهار/إخفاء كلمة المرور', 'Show/Hide password')}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${renderStrengthMeterHtml('rst')}
              </div>
              <div class="field">
                <label for="rst-pass-confirm">${choose('تأكيد كلمة المرور الجديدة', 'Confirm New Password')}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass-confirm" name="newPasswordConfirm" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required ${!cleanToken ? 'disabled' : ''} />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose('إظهار/إخفاء كلمة المرور', 'Show/Hide password')}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="rst-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${(errorMessage || tokenError) ? `<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${icon('alert', 15)}<span>${esc(errorMessage || tokenError)}</span></div>` : ''}
              <button class="btn btn-primary btn-block" type="submit" ${!cleanToken ? 'disabled' : ''}>${choose('حفظ وتسجيل الدخول', 'Save and login')}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`;

  bindUniversalPasswordToggles();
  bindLivePasswordChecks('reset-form', 'newPassword', 'newPasswordConfirm', 'rst', '#reset-form button[type="submit"]');

  document.getElementById('reset-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const p1 = form.get('newPassword');
    const p2 = form.get('newPasswordConfirm');
    if (p1 !== p2) {
      renderResetPassword(token, choose('كلمتا المرور غير متطابقتين.', 'Passwords do not match.'));
      return;
    }
    const button = event.currentTarget.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      await api('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword: p1 }) });
      window.history.replaceState({}, '', window.location.pathname);
      await loadData();
    } catch (error) {
      renderResetPassword(token, error.message);
    }
  });
}

export function openForcePasswordModal(user) {
  const isPending = user.status === 'pending';
  const form = `
    <form id="force-password-form" data-user-id="${user.id}" data-is-pending="${isPending}">
      <div class="field">
        <label for="force-pass-input">${isPending ? choose('كلمة المرور للبدء', 'Initial password') : choose('كلمة المرور الجديدة', 'New password')}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose('إظهار/إخفاء كلمة المرور', 'Show/Hide password')}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${renderStrengthMeterHtml('force')}
        ${!user.email ? `<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${icon('alert', 12)} ${choose('تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.', 'Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.')}</small>` : (!isPending ? `<small class="field-hint" style="margin-top:6px;display:block;">${choose('سيتم طرد المستخدم من جميع أجهزته فوراً.', 'The user will be signed out of all devices immediately.')}</small>` : '')}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button>
        <button type="submit" class="btn btn-primary">${isPending ? choose('تفعيل الحساب', 'Activate account') : choose('حفظ وتغيير', 'Save and change')}</button>
      </div>
    </form>
  `;
  document.getElementById('modal-root').innerHTML = modalShell(
    isPending ? choose('تفعيل الحساب يدوياً', 'Activate account manually') : choose('تغيير كلمة المرور إجبارياً', 'Force change password'),
    isPending ? choose(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${esc(user.name)}.`, `Set an initial password to activate ${esc(user.name)}'s account.`) : choose(`تعيين كلمة مرور جديدة لحساب ${esc(user.name)}`, `Set a new password for ${esc(user.name)}`),
    form,
    'force-password'
  );

  bindUniversalPasswordToggles();
  bindLivePasswordChecks('force-password-form', 'newPassword', null, 'force', '#force-password-form button[type="submit"]');
}
