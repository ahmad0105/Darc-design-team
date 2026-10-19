
import { state } from '../../core/state.js';
import { api } from '../../core/api.js';

export function renderLogin(errorMessage = '', mode = 'login', isSuccess = false) {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  
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
          <div style="display:flex;justify-content:space-between">
            <label for="login-password">${t('password')}</label>
            <a href="#" data-action="goto-forgot" style="font-size:12px;color:var(--blue);text-decoration:none">${choose('نسيت كلمة المرور؟', 'Forgot password?')}</a>
          </div>
          <div style="position:relative;display:flex;align-items:center;">
            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
            <button type="button" data-action="toggle-login-password" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose('إظهار/إخفاء كلمة المرور', 'Show/Hide password')}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        ${messageHtml}
        <button class="btn btn-primary btn-block" type="submit">${icon('arrowLeft', 16)} ${t('login')}</button>
      </form>
      <div class="login-demo">${icon('info', 16)}<span>${t('demoHint')}<br>${choose('حساب جهاد: jihad@darc.local / DARC-Jihad-2026!', 'Jihad account: jihad@darc.local / DARC-Jihad-2026!')}</span></div>
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
              <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${state.lang === 'ar' ? 'EN' : 'عربي'}</button>
            </div>
            ${formContent}
          </div>
        </section>
      </div>
    </div>`;

  document.querySelector('[data-action="toggle-login-password"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    const passInput = document.getElementById('login-password');
    if (!passInput) return;
    const isPass = passInput.type === 'password';
    passInput.type = isPass ? 'text' : 'password';
    e.currentTarget.style.color = isPass ? 'var(--teal)' : 'var(--ink-soft)';
  });

  document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const button = event.currentTarget.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML = `<span>${choose('جاري تسجيل الدخول...', 'Signing in...')}</span>`;
    try {
      await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      if (typeof localStorage !== 'undefined') localStorage.setItem('darc_last_email', email);
      await loadData();
    } catch (error) {
      console.error("Login Error:", error);
      renderLogin(error.message, 'login');
    }
  });

  document.getElementById('forgot-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const button = event.currentTarget.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      await api('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email: form.get('email') }) });
      renderLogin(choose('تم إرسال رابط الاستعادة إذا كان البريد مسجلاً.', 'Reset link sent if email is registered.'), 'forgot', true);
    } catch (error) {
      renderLogin(error.message, 'forgot');
    }
  });
}

export function renderActivation(token, errorMessage = '') {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('app').innerHTML = `
    <div class="login-shell ${state.lang === 'en' ? 'is-ltr' : ''}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${icon('building', 24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose('تفعيل حساب الفريق', 'Team account activation')}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${choose('خطوة واحدة للبدء', 'ONE STEP TO START')}</p><h1>${choose('أكمل حسابك وانضم إلى مساحة العمل.', 'Finish your account and join the workspace.')}</h1><p>${choose('اختر كلمة مرور آمنة للوصول إلى المشاريع والمهام المسندة إليك.', 'Choose a secure password to access your projects and assigned work.')}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card"><div class="login-card-inner"><div class="page-head" style="align-items:flex-start;margin-bottom:0"><div><p class="eyebrow">${choose('دعوة DARC', 'DARC INVITE')}</p><h2>${choose('تفعيل الحساب', 'Activate account')}</h2><p class="intro">${choose('يجب أن تحتوي كلمة المرور على 10 أحرف على الأقل.', 'Your password must be at least 10 characters.')}</p></div><button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${state.lang === 'ar' ? 'EN' : 'عربي'}</button></div><form id="activation-form"><input type="hidden" name="token" value="${esc(token)}" /><div class="field"><label>${t('password')}</label><input name="password" type="password" minlength="10" autocomplete="new-password" required /></div><div class="field"><label>${choose('تأكيد كلمة المرور', 'Confirm password')}</label><input name="passwordConfirm" type="password" minlength="10" autocomplete="new-password" required /></div>${errorMessage ? `<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${icon('alert', 15)}<span>${esc(errorMessage)}</span></div>` : ''}<button class="btn btn-primary btn-block" type="submit">${icon('shield', 16)} ${choose('تفعيل والبدء', 'Activate and start')}</button></form><div class="login-demo">${icon('lock', 16)}<span>${choose('جلسة الدخول محمية ولا يتم تخزين كلمة المرور في المتصفح.', 'Your session is protected and your password is never stored in the browser.')}</span></div></div></section>
      </div>
    </div>`;
}

export function renderResetPassword(token, errorMessage = '') {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('app').innerHTML = `
    <div class="login-shell ${state.lang === 'en' ? 'is-ltr' : ''}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${icon('building', 24)}</span><div><div class="brand-name">DARC Design Team</div></div></div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${choose('استعادة الحساب', 'ACCOUNT RECOVERY')}</p><h2>${choose('كلمة مرور جديدة', 'New Password')}</h2></div>
            </div>
            <form id="reset-form">
              <div class="field"><label>${choose('كلمة المرور الجديدة', 'New Password')}</label><input name="newPassword" type="password" minlength="10" required /></div>
              ${errorMessage ? `<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${icon('alert', 15)}<span>${esc(errorMessage)}</span></div>` : ''}
              <button class="btn btn-primary btn-block" type="submit">${choose('حفظ وتسجيل الدخول', 'Save and login')}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`;

  document.getElementById('reset-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const button = event.currentTarget.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      await api('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword: form.get('newPassword') }) });
      window.history.replaceState({}, '', window.location.pathname);
      window.location.reload();
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
        <label>${isPending ? choose('كلمة المرور للبدء', 'Initial password') : choose('كلمة المرور الجديدة', 'New password')}</label>
        <input name="newPassword" type="password" required minlength="10" placeholder="••••••••••" />
        ${!user.email ? `<small class="field-hint" style="color:var(--red);margin-top:8px">${icon('alert', 12)} ${choose('تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.', 'Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.')}</small>` : (!isPending ? `<small class="field-hint">${choose('سيتم طرد المستخدم من جميع أجهزته فوراً.', 'The user will be signed out of all devices immediately.')}</small>` : '')}
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
}

