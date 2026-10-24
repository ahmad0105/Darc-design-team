const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/api-BW_3cm3S.js","assets/ui-ClLs5DIV.js","assets/offline-B2e_-E_H.js","assets/utils-uec05tg3.js","assets/preload-helper-BLdHbfdN.js"])))=>i.map(i=>d[i]);
import{a as e,i as n,n as r,o as i,r as a,t as o}from"./ui-ClLs5DIV.js";import{a as s,c,i as l,o as u,r as d,u as f}from"./offline-B2e_-E_H.js";import{_ as p,a as m,c as h,d as g,f as _,g as v,h as y,i as b,l as x,m as S,n as C,o as w,p as T,r as E,s as ee,t as te,u as ne,v as re}from"./utils-uec05tg3.js";import{t as D}from"./preload-helper-BLdHbfdN.js";import{i as ie,n as O,t as ae}from"./api-BW_3cm3S.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))r(e);new MutationObserver(e=>{for(let n of e)if(n.type===`childList`)for(let e of n.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&r(e)}).observe(document,{childList:!0,subtree:!0});function n(e){let n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),n.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,n}function r(e){if(e.ep)return;e.ep=!0;let r=n(e);fetch(e.href,r)}})();var oe=i({calculatePasswordStrength:()=>se,openForcePasswordModal:()=>me,renderActivation:()=>fe,renderLogin:()=>k,renderResetPassword:()=>pe,renderStrengthMeterHtml:()=>ce});function se(n){let r=String(n||``);if(!r)return{score:0,label:``,percent:0,color:`var(--line)`};let i=0;return r.length>=10&&(i+=1),/[a-z]/.test(r)&&/[A-Z]/.test(r)&&(i+=1),/\d/.test(r)&&(i+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(r)&&(i+=1),i===1?{score:1,label:e.lang===`ar`?`ضعيفة جداً`:`Very weak`,percent:25,color:`var(--red)`}:i===2?{score:2,label:e.lang===`ar`?`متوسطة`:`Fair`,percent:50,color:`var(--amber)`}:i===3?{score:3,label:e.lang===`ar`?`جيدة`:`Good`,percent:75,color:`var(--blue)`}:{score:4,label:e.lang===`ar`?`قوية وممتازة 🛡️`:`Strong & Secure 🛡️`,percent:100,color:`var(--mint-strong)`}}function ce(n=`strength`){return`
    <div id="${n}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${n}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${n}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${e.lang===`ar`?`10 أحرف + أرقام ورموز`:`10+ chars, mixed, digits & symbols`}</span>
      </div>
    </div>
  `}function le(n,r,i,a,o){let s=document.getElementById(n);if(!s)return;let c=s.querySelector(`input[name="${r}"]`),l=s.querySelector(`input[name="${i}"]`),u=s.querySelector(o||`button[type="submit"]`),d=document.getElementById(`${a}-meter-wrap`),f=document.getElementById(`${a}-meter-bar`),p=document.getElementById(`${a}-meter-label`),m=document.getElementById(`${a}-match-indicator`);function h(){let n=c?c.value:``,r=l?l.value:``;if(n&&d&&f&&p){d.style.display=`flex`;let e=se(n);f.style.width=`${e.percent}%`,f.style.background=e.color,p.textContent=e.label,p.style.color=e.color}else d&&(d.style.display=`none`);l&&m&&(r?n===r?(m.style.display=`block`,m.style.color=`var(--mint-strong)`,m.textContent=e.lang===`ar`?`✓ كلمتا المرور متطابقتان`:`✓ Passwords match`,u&&(u.disabled=!1)):(m.style.display=`block`,m.style.color=`var(--red)`,m.textContent=e.lang===`ar`?`✗ كلمتا المرور غير متطابقتين`:`✗ Passwords do not match`,u&&(u.disabled=!0)):(m.style.display=`none`,u&&(u.disabled=!1)))}c?.addEventListener(`input`,h),l?.addEventListener(`input`,h)}function ue(){document.querySelectorAll(`[data-action="toggle-password-visibility"]`).forEach(n=>{n.onclick=r=>{r.preventDefault();let i=n.getAttribute(`data-target`),a=i?document.getElementById(i):n.parentElement.querySelector(`input`);if(!a)return;let o=a.type===`password`;a.type=o?`text`:`password`,n.style.color=o?`var(--teal)`:`var(--ink-soft)`,n.setAttribute(`aria-label`,o?e.lang===`ar`?`إخفاء كلمة المرور`:`Hide password`:e.lang===`ar`?`إظهار كلمة المرور`:`Show password`)}}),document.querySelectorAll(`input[type="password"]`).forEach(n=>{let r=r=>{let i=r.getModifierState&&r.getModifierState(`CapsLock`),a=n.parentElement.parentElement.querySelector(`.capslock-warning`);i?a||(a=document.createElement(`div`),a.className=`capslock-warning`,a.style.fontSize=`11px`,a.style.color=`var(--amber)`,a.style.marginTop=`4px`,a.style.display=`flex`,a.style.alignItems=`center`,a.style.gap=`4px`,a.innerHTML=`<span>⚠️</span> <span>${e.lang===`ar`?`زر الحروف الكبيرة (Caps Lock) مفعّل`:`Caps Lock is active`}</span>`,n.parentElement.parentElement.appendChild(a)):a&&a.remove()};n.addEventListener(`keydown`,r),n.addEventListener(`keyup`,r)})}function de(n,r=60){if(!n)return;n.disabled=!0;let i=r,a=n.innerHTML,o=setInterval(()=>{i--,n.innerHTML=`<span>${e.lang===`ar`?`يرجى الانتظار (${i} ثانية)...`:`Please wait (${i}s)...`}</span>`,i<=0&&(clearInterval(o),n.disabled=!1,n.innerHTML=a)},1e3)}function k(n=``,r=`login`,i=!1){if(e.view=`login`,typeof window<`u`){let e=r===`forgot`?`#forgot`:`#login`;window.location.hash!==e&&(window.history&&window.history.replaceState?window.history.replaceState(null,``,e):window.location.hash=e)}document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,e.lang===`en`),document.documentElement.lang=e.lang,document.documentElement.dir=e.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=e.theme||`light`;let a=``,o=n?`<div class="login-demo" style="border-color:${i?`#cce3e0`:`var(--red-soft)`};background:${i?`#f0f9f7`:`var(--red-soft)`};color:${i?`var(--teal)`:`var(--red)`};margin-top:0;margin-bottom:15px">${icon(i?`check`:`alert`,15)}<span>${esc(n)}</span></div>`:``,s=(typeof localStorage<`u`?localStorage.getItem(`darc_last_email`):``)||``;r===`login`?a=`
      <form id="login-form">
        <div class="field">
          <label for="login-email">${t(`emailAddress`)}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${esc(s)}" required />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label for="login-password">${t(`password`)}</label>
            <a href="#" data-action="goto-forgot" style="font-size:12px;color:var(--blue);text-decoration:none">${choose(`نسيت كلمة المرور؟`,`Forgot password?`)}</a>
          </div>
          <div style="position:relative;display:flex;align-items:center;">
            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
            <button type="button" data-action="toggle-password-visibility" data-target="login-password" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin:4px 0 16px;font-size:12px;">
          <label style="display:flex;align-items:center;gap:7px;cursor:pointer;color:var(--ink-soft);user-select:none;">
            <input type="checkbox" id="remember-email-check" ${s?`checked`:``} style="cursor:pointer;accent-color:var(--teal);" />
            <span>${choose(`تذكر بريدي الإلكتروني على هذا الجهاز`,`Remember my email on this device`)}</span>
          </label>
        </div>
        ${o}
        <button class="btn btn-primary btn-block" type="submit">${icon(e.lang===`ar`?`arrowLeft`:`arrowRight`,16)} ${t(`login`)}</button>
      </form>
      <div class="login-demo" style="flex-direction:column;gap:10px;padding:14px 16px;">
        <div style="display:flex;align-items:center;gap:8px;font-weight:700;color:var(--teal);font-size:12px;">
          ${icon(`info`,15)}
          <span>${choose(`بيانات الحسابات التجريبية (جاهزة للتجربة):`,`Demo Workspace Accounts (Ready to test):`)}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;width:100%;">
          <div class="demo-acc-card" style="display:flex;align-items:center;justify-content:space-between;background:var(--surface);border:1px solid rgba(27,157,143,0.22);padding:8px 12px;border-radius:10px;gap:8px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:8px;font-size:11px;flex-wrap:wrap;">
              <span class="status-badge done" style="font-size:10px;padding:2px 7px;">${choose(`مدير النظام`,`Admin`)}</span>
              <code dir="ltr" style="font-family:monospace;font-size:11px;font-weight:600;color:var(--ink);unicode-bidi:isolate;">admin@darc.local</code>
              <span style="color:var(--muted);font-size:10px;">/</span>
              <code dir="ltr" style="font-family:monospace;font-size:11px;font-weight:600;color:var(--ink);unicode-bidi:isolate;">DARC-Admin-2026!</code>
            </div>
            <button type="button" class="btn btn-soft btn-xs" data-action="quick-fill-login" data-email="admin@darc.local" data-pass="DARC-Admin-2026!" style="padding:3px 9px;font-size:11px;cursor:pointer;">
              ${choose(`تعبئة سريعة`,`Quick Fill`)}
            </button>
          </div>
          <div class="demo-acc-card" style="display:flex;align-items:center;justify-content:space-between;background:var(--surface);border:1px solid rgba(27,157,143,0.22);padding:8px 12px;border-radius:10px;gap:8px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:8px;font-size:11px;flex-wrap:wrap;">
              <span class="status-badge in_progress" style="font-size:10px;padding:2px 7px;">${choose(`جهاد (مصمم)`,`Jihad (Designer)`)}</span>
              <code dir="ltr" style="font-family:monospace;font-size:11px;font-weight:600;color:var(--ink);unicode-bidi:isolate;">jihad@darc.local</code>
              <span style="color:var(--muted);font-size:10px;">/</span>
              <code dir="ltr" style="font-family:monospace;font-size:11px;font-weight:600;color:var(--ink);unicode-bidi:isolate;">DARC-Jihad-2026!</code>
            </div>
            <button type="button" class="btn btn-soft btn-xs" data-action="quick-fill-login" data-email="jihad@darc.local" data-pass="DARC-Jihad-2026!" style="padding:3px 9px;font-size:11px;cursor:pointer;">
              ${choose(`تعبئة سريعة`,`Quick Fill`)}
            </button>
          </div>
        </div>
      </div>
    `:r===`forgot`&&(a=`
      <form id="forgot-form">
        <div class="field"><label for="login-email">${t(`emailAddress`)}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${esc(s)}" required /></div>
        ${o}
        <button class="btn btn-primary btn-block" type="submit">${choose(`إرسال رابط الاستعادة`,`Send reset link`)}</button>
        <div style="text-align:center;margin-top:15px"><a href="#" data-action="goto-login" style="font-size:13px;color:var(--ink-soft)">${choose(`العودة لتسجيل الدخول`,`Back to login`)}</a></div>
      </form>
    `),document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${e.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup">
            <span class="brand-mark">${icon(`building`,24)}</span>
            <div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose(`مساحة تشغيل المشاريع`,`Project operations workspace`)}</div></div>
          </div>
          <div class="login-art-content">
            <p class="eyebrow">${choose(`وضوح · مسؤولية · إنجاز`,`CLARITY · OWNERSHIP · DELIVERY`)}</p>
            <h1>${choose(`كل مشروع واضح. كل خطوة محسوبة.`,`Every project clear. Every move accounted for.`)}</h1>
            <p>${choose(`لوحة هادئة لإدارة التصميم والتنفيذ، تجمع فريق DARC حول أحدث قرار وأهم موعد.`,`A calm operating layer for design and delivery, bringing the DARC team around the latest decision and the next important deadline.`)}</p>
          </div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${r===`login`?choose(`مرحبًا بعودتك`,`WELCOME BACK`):choose(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h2>${r===`login`?t(`login`):choose(`نسيت كلمة المرور`,`Forgot Password`)}</h2><p class="intro">${r===`login`?t(`loginIntro`):choose(`أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.`,`Enter your email to receive a reset link.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${e.theme===`dark`?`الوضع النهاري`:`الوضع الليلي`}">${e.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${e.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            ${a}
          </div>
        </section>
      </div>
    </div>`,ue(),document.getElementById(`login-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(e.currentTarget),r=String(n.get(`email`)||``).trim(),i=String(n.get(`password`)||``),a=document.getElementById(`remember-email-check`)?.checked,o=e.currentTarget.querySelector(`button[type="submit"]`);o.disabled=!0,o.innerHTML=`<span>${choose(`جاري التحقق وتسجيل الدخول...`,`Verifying & signing in...`)}</span>`;try{let e=await O(`/api/auth/login`,{method:`POST`,body:JSON.stringify({email:r,password:i})});typeof localStorage<`u`&&(e?.token&&localStorage.setItem(`darc_token`,e.token),a?localStorage.setItem(`darc_last_email`,r):localStorage.removeItem(`darc_last_email`)),await loadData()}catch(e){console.error(`Login Error:`,e),e.message&&(e.message.includes(`429`)||e.message.includes(`كثيرة`)||e.message.includes(`rate`))?(k(e.message,`login`),de(document.querySelector(`#login-form button[type="submit"]`),60)):k(e.message,`login`)}}),document.getElementById(`forgot-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(e.currentTarget),r=e.currentTarget.querySelector(`button[type="submit"]`);r.disabled=!0;try{await O(`/api/auth/forgot-password`,{method:`POST`,body:JSON.stringify({email:n.get(`email`)})}),k(choose(`تم إرسال رابط الاستعادة إذا كان البريد مسجلاً.`,`Reset link sent if email is registered.`),`forgot`,!0)}catch(e){k(e.message,`forgot`)}})}function fe(n,r=``){document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,e.lang===`en`),document.documentElement.lang=e.lang,document.documentElement.dir=e.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=e.theme||`light`,document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${e.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${icon(`building`,24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose(`تفعيل حساب الفريق`,`Team account activation`)}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${choose(`خطوة واحدة للبدء`,`ONE STEP TO START`)}</p><h1>${choose(`أكمل حسابك وانضم إلى مساحة العمل.`,`Finish your account and join the workspace.`)}</h1><p>${choose(`اختر كلمة مرور آمنة للوصول إلى المشاريع والمهام المسندة إليك.`,`Choose a secure password to access your projects and assigned work.`)}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${choose(`دعوة DARC الرسمية`,`DARC INVITE`)}</p><h2>${choose(`تفعيل الحساب`,`Activate account`)}</h2><p class="intro">${choose(`يجب أن تحتوي كلمة المرور على 10 أحرف على الأقل مع رموز وأرقام.`,`Your password must be at least 10 characters with numbers and symbols.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${e.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${e.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            <form id="activation-form">
              <input type="hidden" name="token" value="${esc(n)}" />
              <div class="field">
                <label for="act-pass">${t(`password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${ce(`act`)}
              </div>
              <div class="field">
                <label for="act-pass-confirm">${choose(`تأكيد كلمة المرور`,`Confirm password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass-confirm" name="passwordConfirm" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="act-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${r?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${icon(`alert`,15)}<span>${esc(r)}</span></div>`:``}
              <button class="btn btn-primary btn-block" type="submit">${icon(`shield`,16)} ${choose(`تفعيل الحساب والدخول`,`Activate and sign in`)}</button>
            </form>
            <div class="login-demo">${icon(`lock`,16)}<span>${choose(`جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.`,`Your session is encrypted and your password is never stored in plain text.`)}</span></div>
          </div>
        </section>
      </div>
    </div>`,ue(),le(`activation-form`,`password`,`passwordConfirm`,`act`,`#activation-form button[type="submit"]`)}function pe(n,r=``){document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,e.lang===`en`),document.documentElement.lang=e.lang,document.documentElement.dir=e.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=e.theme||`light`,document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${e.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${icon(`building`,24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose(`استعادة كلمة المرور`,`Password Recovery`)}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${choose(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h1>${choose(`اختر كلمة مرور جديدة لحسابك.`,`Choose a new password for your account.`)}</h1><p>${choose(`كلمة المرور يجب أن تكون قوية وغير مستخدمة من قبل.`,`Password should be strong and unique.`)}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${choose(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h2>${choose(`كلمة مرور جديدة`,`New Password`)}</h2><p class="intro">${choose(`أدخل كلمة المرور الجديدة وقم بتأكيدها.`,`Enter and confirm your new password.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${e.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${e.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            <form id="reset-form">
              <div class="field">
                <label for="rst-pass">${choose(`كلمة المرور الجديدة`,`New Password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass" name="newPassword" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${ce(`rst`)}
              </div>
              <div class="field">
                <label for="rst-pass-confirm">${choose(`تأكيد كلمة المرور الجديدة`,`Confirm New Password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass-confirm" name="newPasswordConfirm" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="rst-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${r?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${icon(`alert`,15)}<span>${esc(r)}</span></div>`:``}
              <button class="btn btn-primary btn-block" type="submit">${choose(`حفظ وتسجيل الدخول`,`Save and login`)}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,ue(),le(`reset-form`,`newPassword`,`newPasswordConfirm`,`rst`,`#reset-form button[type="submit"]`),document.getElementById(`reset-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let r=new FormData(e.currentTarget),i=r.get(`newPassword`);if(i!==r.get(`newPasswordConfirm`)){pe(n,choose(`كلمتا المرور غير متطابقتين.`,`Passwords do not match.`));return}let a=e.currentTarget.querySelector(`button[type="submit"]`);a.disabled=!0;try{await O(`/api/auth/reset-password`,{method:`POST`,body:JSON.stringify({token:n,newPassword:i})}),window.history.replaceState({},``,window.location.pathname),await loadData()}catch(e){pe(n,e.message)}})}function me(e){let n=e.status===`pending`,r=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${n}">
      <div class="field">
        <label for="force-pass-input">${n?choose(`كلمة المرور للبدء`,`Initial password`):choose(`كلمة المرور الجديدة`,`New password`)}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${ce(`force`)}
        ${e.email?n?``:`<small class="field-hint" style="margin-top:6px;display:block;">${choose(`سيتم طرد المستخدم من جميع أجهزته فوراً.`,`The user will be signed out of all devices immediately.`)}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${icon(`alert`,12)} ${choose(`تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.`,`Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.`)}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${n?choose(`تفعيل الحساب`,`Activate account`):choose(`حفظ وتغيير`,`Save and change`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(n?choose(`تفعيل الحساب يدوياً`,`Activate account manually`):choose(`تغيير كلمة المرور إجبارياً`,`Force change password`),n?choose(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${esc(e.name)}.`,`Set an initial password to activate ${esc(e.name)}'s account.`):choose(`تعيين كلمة مرور جديدة لحساب ${esc(e.name)}`,`Set a new password for ${esc(e.name)}`),r,`force-password`),ue(),le(`force-password-form`,`newPassword`,null,`force`,`#force-password-form button[type="submit"]`)}var he=i({attentionItem:()=>_e,metricCard:()=>A,projectProgress:()=>ge,pulseChart:()=>be,renderDashboard:()=>xe,renderReports:()=>Se,teamMetrics:()=>ve,teamRow:()=>ye});function A(e,n,r,i,a,o=``){return`<article class="metric-card ${i}"><div class="metric-top"><span class="metric-label">${esc(e)}</span><span class="metric-icon">${icon(a,15)}</span></div><div class="metric-value">${esc(n)}</div><span class="metric-note ${o}">${esc(r)}</span></article>`}function ge(e){let n=e.health===`off_track`?`red`:e.health===`at_risk`?`amber`:``;return`<div class="progress-cell"><div class="progress-meta"><span>${t(`weightedProgress`)}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${n}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function _e(e){let n=isOverdue(e)||e.status===`blocked`?`red`:`amber`,r=isOverdue(e)?choose(`متأخرة`,`Overdue`):e.status===`blocked`?choose(`متوقفة`,`Blocked`):choose(`تستحق قريبًا`,`Due soon`);return`<button class="attention-item" data-action="open-task" data-task-id="${esc(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${n}">${icon(isOverdue(e)||e.status===`blocked`?`alert`:`clock`,14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${esc(choose(e.titleAr,e.titleEn))}</strong><span>${esc(r)} · ${esc(dueLabel(e.dueDate))}</span></span></button>`}function ve(e,n){let r=n.filter(n=>n.assigneeId===e),i=r.reduce((e,n)=>e+Number(n.weight||1),0),a=i?Math.round(r.reduce((e,n)=>e+n.progress*Number(n.weight||1),0)/i):0;return{tasks:r.length,progress:a,overdue:r.filter(isOverdue).length}}function ye(e,n){let r=ve(e.id,n);return`<div class="team-row"><div class="team-member">${avatar(e)}<div class="team-member-copy"><strong>${esc(choose(e.name,e.nameEn||e.name))}</strong><span>${esc(choose(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${r.tasks}</strong> ${t(`tasks`)}</div><div class="team-progress"><div class="progress-meta"><span>${t(`progress`)}</span><strong>${r.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${r.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${esc(e.id)}">${icon(`more`,15)}</button></div>`}function be(){let n=[38,48,45,62,55,72,68],r=e.lang===`ar`?[`أحد`,`اثن`,`ثلث`,`أربع`,`خمس`,`جمع`,`سبت`]:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];return`<div class="pulse">${n.map((e,i)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,e-22)}%"></span><span class="pulse-bar ${i===n.length-1?`current`:``}" style="height:${e}%"></span></div><span>${r[i]}</span></div>`).join(``)}</div>`}function xe(){let n=e.data?.stats||{},r=e.data?.projects||[],i=e.data?.tasks||[],a=e.data?.users||[],o=e.data?.user||{},s=o.name||o.email||choose(`مستخدم`,`User`),c=r.reduce((e,n)=>e+(Number(n.totalWeight)||0),0),l=c?Math.round(r.reduce((e,n)=>e+(Number(n.progress)||0)*(Number(n.totalWeight)||0),0)/c):0,u=[...i].filter(e=>isOverdue(e)||e.status===`blocked`||e.dueDate&&(new Date(`${e.dueDate}T23:59:59`)-new Date)/864e5<=7).sort((e,n)=>new Date(e.dueDate||`9999-12-31`)-new Date(n.dueDate||`9999-12-31`)).slice(0,5),d=a.filter(e=>e.status!==`inactive`),f=n.projectCount??r.length,p=n.myTasks??i.filter(e=>e.assigneeId===o.id).length,m=n.overdueTasks??i.filter(isOverdue).length,h=n.dueSoon??0,_=n.completedTasks??i.filter(e=>e.status===`done`).length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${choose(`لوحة قيادة المشاريع`,`PROJECT COMMAND CENTER`)}</p><h1>${g()}، ${esc(choose(s.replace(/^م\.\s?/,``),o.nameEn||s))}</h1><p>${t(`welcomeText`)}</p></div><div class="welcome-status"><span>${t(`portfolioHealth`)}</span><strong>${l}%</strong><small>${choose(`إنجاز المحفظة الموزون`,`Weighted portfolio progress`)}</small></div></div>
    <div class="metrics-grid">${A(t(`activeProjects`),n.activeProjects||0,choose(`${f} مشاريع إجمالًا`,`${f} projects total`),`teal`,`building`,`up`)}${A(t(`openTasks`),n.openTasks??i.length,choose(`${p} مسندة لك`,`${p} assigned to you`),`blue`,`checklist`)}${A(t(`overdue`),m,choose(`تحتاج تصعيدًا ومتابعة`,`Needs escalation and follow-up`),`red`,m?`alert`:`check`,m?`alert`:``)}${A(t(`dueThisWeek`),h,choose(`موعد قريب`,`Near-term due dates`),`amber`,`clock`)}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`projectProgress`)}</h2><p class="panel-subtitle">${t(`projectProgressSub`)}</p></div>${C(`view_projects`)?`<button class="text-link" data-view="projects">${t(`seeAll`)} ${icon(e.lang===`ar`?`arrowLeft`:`arrow`,12)}</button>`:``}</div><div class="project-list">${r.length?r.slice(0,5).map(projectRow).join(``):`<div class="empty">${icon(`building`,18)}<span>${t(`noProjects`)}</span></div>`}</div></section>${T()||C(`manage_users`)?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`teamProgress`)}</h2><p class="panel-subtitle">${t(`teamProgressSub`)}</p></div><button class="text-link" data-view="team">${t(`seeAll`)} ${icon(e.lang===`ar`?`arrowLeft`:`arrow`,12)}</button></div><div class="team-table">${d.slice(0,6).map(e=>ye(e,i)).join(``)}</div></section>`:``}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`attention`)}</h2><p class="panel-subtitle">${t(`attentionSub`)}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${u.length}</span></div><div class="attention-list">${u.length?u.map(_e).join(``):`<div class="empty">${icon(`check`,18)}<span>${t(`noAttention`)}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`recentPulse`)}</h2><p class="panel-subtitle">${t(`recentPulseSub`)}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${_} ${t(`done`)}</span></div>${be()}</section></div></div>`}function Se(){let{projects:n,tasks:r,users:i}=e.data,a=C(`export_reports`)||T(),o=r.reduce((e,n)=>e+Number(n.weight||1),0),s=o?Math.round(r.reduce((e,n)=>e+n.progress*Number(n.weight||1),0)/o):0,c=new Map;r.forEach(n=>{let r=(e.lang===`ar`?n.categoryAr:n.categoryEn)||choose(n.typeAr||`عام`,n.typeEn||`General`),i=c.get(r)||{weight:0,progress:0};i.weight+=Number(n.weight||1),i.progress+=n.progress*Number(n.weight||1),c.set(r,i)});let l=[...c.entries()].map(([e,n])=>({label:e,progress:n.weight?Math.round(n.progress/n.weight):0})).sort((e,n)=>n.progress-e.progress);return`<div class="page-head"><div><p class="eyebrow">${choose(`قراءة الأداء`,`PERFORMANCE READOUT`)}</p><h1>${t(`reports`)}</h1><p>${choose(`مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.`,`Simple signals that help management see drift before it becomes delay.`)}</p></div><div class="page-actions">${a?`<button class="btn btn-soft" data-action="export-csv">${icon(`document`,15)} ${choose(`تصدير التقرير (Excel)`,`Export Report (Excel)`)}</button>`:``}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`الإنجاز حسب التخصص`,`Progress by discipline`)}</h2><p class="panel-subtitle">${t(`weightedProgress`)}</p></div><span class="status-badge on_track">${s}%</span></div><div class="report-bars">${l.length?l.map(e=>`<div class="report-bar-row"><span>${esc(e.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${e.progress}%"></div></div><strong>${e.progress}%</strong></div>`).join(``):`<div class="empty">${t(`noTasks`)}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`صحة المحفظة`,`Portfolio health`)}</h2><p class="panel-subtitle">${choose(`توزيع حالات المشاريع الحالية.`,`Current project status distribution.`)}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${t(`onTrack`)}</span><strong style="color:var(--mint-strong)">${n.filter(e=>e.health===`on_track`).length}</strong></div><div class="report-stat"><span>${t(`atRisk`)}</span><strong style="color:var(--amber)">${n.filter(e=>e.health===`at_risk`).length}</strong></div><div class="report-stat"><span>${t(`offTrack`)}</span><strong style="color:var(--red)">${n.filter(e=>e.health===`off_track`).length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`teamLoad`)}</h2><p class="panel-subtitle">${choose(`المهام المفتوحة لكل عضو.`,`Open tasks per member.`)}</p></div></div><div class="report-stat-list">${i.slice(0,5).map(e=>{let n=ve(e.id,r);return`<div class="report-stat"><span>${esc(choose(e.name,e.nameEn||e.name))}</span><strong>${n.tasks}</strong></div>`}).join(``)}</div></section></div></div>`}var Ce=i({STATUS_OPTIONS:()=>Ue,buildAssigneeChipsHtml:()=>Le,buildRemindersListHtml:()=>Re,drawTimelineArrows:()=>We,filterTasks:()=>Pe,formatRemindAtDate:()=>Ie,getSavedTaskSort:()=>M,getTaskSortOrder:()=>j,initTaskModalWidgets:()=>Be,openDocumentPreviewModal:()=>He,openTaskModal:()=>ze,renderBoard:()=>Ae,renderCalendar:()=>je,renderTaskAssignees:()=>we,renderTaskComments:()=>Ve,renderTaskDocuments:()=>N,renderTaskSortSelect:()=>Oe,renderTasks:()=>Fe,renderTimeline:()=>Me,renderTimelinePanel:()=>Ne,setSavedTaskSort:()=>De,sortTasks:()=>ke,sortTasksByImportance:()=>Ee,taskCard:()=>Te});function we(n){let r=e.data?.users||[],i=e._userMap||new Map(r.map(e=>[e.id,e])),a=n.assignee||i.get(n.assigneeId),o=(n.customFields?.additionalAssignees||n.customFields?.additional_assignees||[]).map(e=>i.get(e)).filter(Boolean),s=n.customFields?.externalAssignees||n.customFields?.external_assignees||[],c=`<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">`;return a||o.length?(c+=`<div class="avatar-stack" style="display:flex;align-items:center;">`,a&&(c+=`<span title="${esc(choose(a.name,a.nameEn||a.name))}">${avatar(a,`mini-avatar`)}</span>`),o.slice(0,2).forEach(e=>{c+=`<span title="${esc(choose(e.name,e.nameEn||e.name))}" style="margin-inline-start:-8px;">${avatar(e,`mini-avatar`)}</span>`}),o.length>2&&(c+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${o.slice(2).map(e=>choose(e.name,e.nameEn||e.name)).join(`، `)}">+${o.length-2}</span>`),c+=`</div>`,a&&(c+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${esc(choose(a.name,a.nameEn||a.name))}</span>`)):s.length||(c+=`<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>`),s.length&&(s.slice(0,2).forEach(e=>{c+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${esc(e)}">🌐 ${esc(e)} <small style="opacity:0.8">(${choose(`خارجي`,`Ext`)})</small></span>`}),s.length>2&&(c+=`<span style="font-size:10px;color:var(--amber);" title="${s.slice(2).map(esc).join(`، `)}">+${s.length-2}</span>`)),c+=`</div>`,c}function Te(n){let r=isOverdue(n),i=r?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${icon(`alert`,11)} ${t(`overdue`)}</span>`:``,a=e._commentCounts?e._commentCounts[n.id]||0:(e.data?.comments||[]).filter(e=>e.taskId===n.id).length,o=e._docCounts?e._docCounts[n.id]||0:(e.data?.documents||[]).filter(e=>e.taskId===n.id).length,s=n.progress===100?`var(--mint-strong)`:n.progress>=80?`var(--amber)`:n.progress>0?`var(--blue)`:`var(--line)`,c=isAdmin()||can(`edit_tasks`)||n.assigneeId===e.data?.user?.id;return`<article class="task-card ${r?`is-overdue`:``} ${c?``:`not-draggable`}" draggable="${c?`true`:`false`}" data-action="open-task" data-task-id="${esc(n.id)}">
    <div class="task-card-top">
      <span class="task-code">${esc(n.templateId?n.templateId.replace(`tpl-`,`#`):`#CUSTOM`)}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${n._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${choose(`بانتظار المزامنة مع السيرفر`,`Pending cloud sync`)}">⏳ ${choose(`معلقة`,`Pending`)}</span>`:``}
        ${a>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${a} ${choose(`تعليقات`,`comments`)}">💬 ${a}</span>`:``}
        ${o>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${o} ${choose(`مرفقات`,`attachments`)}">📎 ${o}</span>`:``}
        ${i}
        <span class="priority-badge ${esc(n.priority)}">${esc(priorityText(n.priority))}</span>
      </div>
    </div>
    <h4>${esc(choose(n.titleAr,n.titleEn))}</h4>
    ${(()=>{let e=String(choose(n.descriptionAr||n.description,n.descriptionEn||n.description)||``).trim();if(!e)return``;let r=e.length>50?e.substring(0,50).trim()+`...`:e;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${esc(e)}">${esc(r)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${esc(choose(n.categoryAr,n.categoryEn)||``)}</span>
      ${n.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${r?`var(--red)`:`var(--muted)`};">${icon(`calendar`,11)} ${dateLabel(n.dueDate)}</span>`:``}
    </div>
    <div class="task-card-foot">
      ${we(n)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${n.progress===100?`var(--mint-strong)`:`var(--teal)`};">${n.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${n.progress}%;background:${s};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function j(e){if(!e)return 999999;if(typeof e.sortOrder==`number`)return e.sortOrder;if(typeof e.sort_order==`number`)return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder==`number`)return e.customFields.sortOrder;if(typeof e.customFields.sort_order==`number`)return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder==`number`)return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order==`number`)return e.custom_fields.sort_order}return 999999}function Ee(e=[]){let n={urgent:4,high:3,medium:2,low:1},r=Date.now();return[...e].sort((e,i)=>{let a=+(e.status===`blocked`),o=+(i.status===`blocked`);if(a!==o)return o-a;let s=e.dueDate?new Date(`${e.dueDate.split(`T`)[0]}T23:59:59`).getTime():null,c=i.dueDate?new Date(`${i.dueDate.split(`T`)[0]}T23:59:59`).getTime():null,l=s&&s<r&&e.status!==`done`?1:0,u=c&&c<r&&i.status!==`done`?1:0;if(l!==u)return u-l;let d=n[e.priority]||2,f=n[i.priority]||2;if(d!==f)return f-d;if(s&&c){if(s!==c)return s-c}else if(s&&!c)return-1;else if(!s&&c)return 1;let p=j(e),m=j(i);return p===m?(e.titleAr||``).localeCompare(i.titleAr||``,`ar`):p-m})}function M(){return localStorage.getItem(`darc_task_sort_pref`)||`importance`}function De(n){localStorage.setItem(`darc_task_sort_pref`,n),e.taskSortPref=n,e.projectTaskSort=n,e.myTaskSort=n}function Oe(e,n=`sort-project-tasks`){let r=e||M();return`
    <div class="sort-box">
      <span>${choose(`الترتيب:`,`Sort:`)}</span>
      <select class="filter-select select-compact" data-action="${n}">
        <option value="importance" ${r===`importance`?`selected`:``}>${choose(`حسب الأهمية والأولوية (افتراضي)`,`By Importance & Priority (Default)`)}</option>
        <option value="deadline" ${r===`deadline`?`selected`:``}>${choose(`الأقرب استحقاقاً`,`Earliest Deadline`)}</option>
        <option value="custom" ${r===`custom`?`selected`:``}>${choose(`ترتيب مخصص (السحب والإسقاط)`,`Custom (Drag & Drop)`)}</option>
        <option value="alpha" ${r===`alpha`?`selected`:``}>${choose(`أبجدياً`,`Alphabetical`)}</option>
      </select>
    </div>
  `}function ke(e=[],n=M()){return n===`deadline`?[...e].sort((e,n)=>(e.dueDate?new Date(`${e.dueDate.split(`T`)[0]}T23:59:59`).getTime():1/0)-(n.dueDate?new Date(`${n.dueDate.split(`T`)[0]}T23:59:59`).getTime():1/0)):n===`custom`?[...e].sort((e,n)=>j(e)-j(n)):n===`alpha`?[...e].sort((e,n)=>(e.titleAr||``).localeCompare(n.titleAr||``,`ar`)):Ee(e)}function Ae(n,r=M()){let i=e.data?.users||[];e._userMap=new Map(i.map(e=>[e.id,e]));let a={};for(let n of e.data?.comments||[])n.taskId&&(a[n.taskId]=(a[n.taskId]||0)+1);let o={};for(let n of e.data?.documents||[])n.taskId&&(o[n.taskId]=(o[n.taskId]||0)+1);return e._commentCounts=a,e._docCounts=o,`<div class="board">${[{key:`not_started`,dot:``,label:t(`notStarted`)},{key:`in_progress`,dot:`blue`,label:t(`inProgress`)},{key:`review`,dot:`amber`,label:choose(`مراجعة / اعتماد`,`Review / approval`),statuses:[`review`,`approval`,`blocked`]},{key:`done`,dot:`green`,label:t(`done`)}].map(e=>{let i=ke(n.filter(n=>(e.statuses||[e.key]).includes(n.status)),r);return`<section class="board-column" data-status="${e.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${e.dot}"></span>${e.label}</div><span class="board-count">${i.length}</span></div><div class="board-cards">${i.length?i.map(Te).join(``):`<div class="empty" style="min-height:150px;pointer-events:none;">${t(`noTasks`)}</div>`}</div></section>`}).join(``)}</div>`}function je(n,r){let i=e.calendarDate?new Date(e.calendarDate):new Date,a=i.getFullYear(),o=i.getMonth(),s=`${e.lang===`ar`?[`يناير`,`فبراير`,`مارس`,`أبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`][o]:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`][o]} ${a}`,c=e.lang===`ar`?[`الأحد`,`الإثنين`,`الثلاثاء`,`الأربعاء`,`الخميس`,`الجمعة`,`السبت`]:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],l=new Date(a,o,1).getDay(),u=new Date(a,o+1,0).getDate(),d=new Date,f=d.getFullYear()===a&&d.getMonth()===o,p=``;for(let e=0;e<l;e++)p+=`<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>`;for(let e=1;e<=u;e++){let r=f&&d.getDate()===e,i=`${a}-${String(o+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,s=n.filter(e=>{if(!e.dueDate&&!e.startDate)return!1;let n=e.dueDate?e.dueDate.split(`T`)[0]:null,r=e.startDate?e.startDate.split(`T`)[0]:null;return n===i||r===i});p+=`
      <div class="calendar-day ${r?`is-today`:``}" style="min-height:95px;min-width:0;overflow:hidden;background:${r?`var(--mint)`:`var(--surface)`};border:1px solid ${r?`var(--teal)`:`var(--line)`};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${r?`bold`:`600`};color:${r?`var(--teal)`:`var(--ink)`};">
          <span>${e}</span>
          ${r?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${choose(`اليوم`,`Today`)}</span>`:``}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${s.map(e=>{let n=ne(e);return`
              <div data-action="open-task" data-task-id="${esc(e.id)}" style="background:${n.bgColor};border:1px solid ${n.borderColor};border-inline-start:3px solid ${n.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${n.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${esc(choose(e.titleAr,e.titleEn))} — ${n.label}">
                <span style="font-weight:700;">${esc(choose(e.titleAr,e.titleEn))}</span>
              </div>
            `}).join(``)}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${icon(`calendar`,16)} ${s}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${icon(e.lang===`ar`?`arrow`:`arrowLeft`,12)} ${choose(`السابق`,`Prev`)}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${choose(`اليوم`,`Today`)}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${choose(`التالي`,`Next`)} ${icon(e.lang===`ar`?`arrowLeft`:`arrow`,12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${c.map(e=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e}</div>`).join(``)}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${p}
      </div>
    </div>
  `}function Me(n){let r=n.filter(e=>e.startDate&&e.dueDate).sort((e,n)=>new Date(e.startDate)-new Date(n.startDate));if(!r.length)return`<div class="empty" style="min-height:300px">${icon(`calendar`,24)}<span>${choose(`لا توجد مهام مجدولة زمنياً في هذا المشروع.`,`No scheduled tasks in this project.`)}</span></div>`;let i=Math.min(...r.map(e=>new Date(e.startDate).getTime())),a=Math.max(...r.map(e=>new Date(e.dueDate).getTime())),o=2592e5;i-=o,a+=o;let s=Math.max(7,Math.ceil((a-i)/864e5)),c=``;for(let n=0;n<s;n++){let r=new Date(i+n*864e5),a=r.getDay()===5||r.getDay()===6;c+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${a?`var(--surface-soft)`:`transparent`};border-bottom:1px solid var(--line)">${r.getDate()}<br>${r.toLocaleDateString(e.lang===`ar`?`ar-SA`:`en-US`,{month:`short`})}</div>`}let l=r.map((n,r)=>{let a=Math.floor((new Date(n.startDate).getTime()-i)/864e5)+1,o=a+Math.max(1,Math.ceil((new Date(n.dueDate).getTime()-new Date(n.startDate).getTime())/864e5)+1),s=ne(n);return`<div style="display:contents" class="timeline-row" data-task-id="${n.id}" data-row="${r}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${n.id}" style="grid-column: ${a} / ${o}; margin: 8px 4px; background: ${s.color}; border: 1px solid ${s.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${esc(choose(n.titleAr,n.titleEn))} — ${s.label}">
        <span style="font-weight:600;opacity:0.9">${esc(n.templateId?n.templateId.replace(`tpl-`,`#`):`#`)}</span> ${esc(choose(n.titleAr,n.titleEn))}
        ${n.dependencies&&n.dependencies.length?`<span style="float:${e.lang===`ar`?`left`:`right`};opacity:0.8">${icon(`link`,10)}</span>`:``}
      </div>
    </div>`}).join(``);return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${s}, minmax(40px, 1fr)); min-width: ${s*40}px; position: relative;">
      ${c}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function Ne(n,r){let i=e.timelineView||`gantt`;return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${choose(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</h2>
          <p class="panel-subtitle">${choose(`متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.`,`Track task flow and milestone deadlines in your preferred format.`)}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${i===`gantt`?`btn-primary`:`btn-ghost`}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${icon(`clock`,12)} ${choose(`مخطط جانت`,`Gantt Chart`)}
          </button>
          <button class="btn btn-sm ${i===`calendar`?`btn-primary`:`btn-ghost`}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${icon(`calendar`,12)} ${choose(`عرض التقويم`,`Calendar View`)}
          </button>
        </div>
      </div>
      
      ${i===`calendar`?je(n,r):Me(n)}
    </div>
  `}window.__timelineExports={renderTimelinePanel:Ne,renderCalendar:je,renderTimeline:Me};function Pe(n){let r=e.searches.tasks.trim().toLowerCase();return n.filter(n=>{let i=`${n.titleAr} ${n.titleEn} ${n.categoryAr} ${n.categoryEn}`.toLowerCase().includes(r),a=e.taskFilter===`all`||e.taskFilter===`mine`&&n.assigneeId===e.data.user.id||e.taskFilter===`overdue`&&isOverdue(n)||e.taskFilter===`blocked`&&n.status===`blocked`,o=e.taskProjectFilter===`all`||n.projectId===e.taskProjectFilter,s=!e.taskPriorityFilter||e.taskPriorityFilter===`all`||n.priority===e.taskPriorityFilter;return i&&a&&o&&s})}function Fe(){let n=Pe(e.data.tasks),r=[[`all`,t(`all`)],[`mine`,choose(`مسندة لي`,`Assigned to me`)],[`overdue`,t(`overdue`)],[`blocked`,t(`blocked`)]],i=e.myTaskSort||M();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${choose(`حركة التنفيذ`,`EXECUTION`)}</p>
        <h1>${t(`myTasks`)}</h1>
        <p>${choose(`نظّم العمل حسب الحالة، الموعد، والمسؤولية.`,`Organize work by status, deadline, and ownership.`)}</p>
      </div>
      <div class="page-actions">
        ${can(`create_tasks`)?`<button class="btn btn-primary" data-action="new-task">${icon(`plus`,15)} ${t(`addTask`)}</button>`:``}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${r.map(([n,r])=>`
            <button class="segmented-tab ${e.taskFilter===n?`active`:``}" data-action="task-filter" data-filter="${n}" role="tab">
              ${r}
            </button>
          `).join(``)}
        </div>
        <div class="search-box tasks-search-box">
          ${icon(`search`,15)}
          <input data-search="tasks" value="${esc(e.searches.tasks)}" placeholder="${choose(`بحث في المهام...`,`Search tasks...`)}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${choose(`📁 كل المشاريع`,`📁 All Projects`)}</option>
            ${e.data.projects.map(n=>`<option value="${esc(n.id)}" ${e.taskProjectFilter===n.id?`selected`:``}>${esc(choose(n.nameAr,n.nameEn))}</option>`).join(``)}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${choose(`⚡ كل الأولويات`,`⚡ All Priorities`)}</option>
            <option value="urgent" ${e.taskPriorityFilter===`urgent`?`selected`:``}>🔥 ${choose(`عاجلة`,`Urgent`)}</option>
            <option value="high" ${e.taskPriorityFilter===`high`?`selected`:``}>⚡ ${choose(`عالية`,`High`)}</option>
            <option value="medium" ${e.taskPriorityFilter===`medium`?`selected`:``}>🔹 ${choose(`متوسطة`,`Medium`)}</option>
            <option value="low" ${e.taskPriorityFilter===`low`?`selected`:``}>☕ ${choose(`منخفضة`,`Low`)}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${Oe(i,`sort-my-tasks`)}
        </div>
      </div>
    </div>

    ${n.length?Ae(n,i):`<section class="panel"><div class="empty">${icon(`checklist`,18)}<span>${t(`noTasks`)}</span></div></section>`}
  `}function Ie(n){if(!n)return`—`;try{let r=new Date(n);return isNaN(r.getTime())?n:new Intl.DateTimeFormat(e.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(r)}catch{return n}}function Le(n=[],r=[]){let i=e.data?.users||[],a=``;return n.forEach(e=>{let n=i.find(n=>n.id===e)||{name:e,id:e};a+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${avatar(n,`mini-avatar`)}
        <span style="font-weight:500;">${esc(choose(n.name,n.nameEn||n.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${esc(e)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${choose(`إزالة`,`Remove`)}">×</button>
      </span>
    `}),r.forEach(e=>{a+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${esc(e)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${choose(`خارجي`,`Ext`)}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${esc(e)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${choose(`إزالة`,`Remove`)}">×</button>
      </span>
    `}),a}function Re(e=[]){return e.length?e.map((e,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${esc(Ie(e.remindAt))}</strong>
        ${e.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(e.noteAr)}">(${esc(e.noteAr)})</span>`:``}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${esc(e.id||``)}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${choose(`حذف التذكير`,`Delete reminder`)}">
        ${icon(`trash`,13)}
      </button>
    </div>
  `).join(``):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${choose(`لا توجد مواعيد تذكير مجدولة لهذه المهمة`,`No scheduled reminders for this task`)}</div>`}function ze(n=null,r=null,i=null){let a=e.data.templates.find(e=>e.id===(r||n?.templateId)),o=n?.projectId||i||e.activeProjectId||e.data.projects[0]?.id||``,s=Array.isArray(n?.customFields?.additionalAssignees)?n.customFields.additionalAssignees:Array.isArray(n?.customFields?.additional_assignees)?n.customFields.additional_assignees:[],c=Array.isArray(n?.customFields?.externalAssignees)?n.customFields.externalAssignees:Array.isArray(n?.customFields?.external_assignees)?n.customFields.external_assignees:[],l=[];Array.isArray(n?.customFields?.reminders)?l=n.customFields.reminders:n?.remindAt?l=[{id:`rem_`+Math.random().toString(36).substr(2,9),remindAt:n.remindAt,noteAr:``}]:Array.isArray(e.data?.reminders)&&n?.id&&(l=e.data.reminders.filter(e=>e.taskId===n.id));let u=n?.progress===void 0?n?.status===`done`?100:n?.status===`review`||n?.status===`approval`?80:n?.status===`in_progress`?50:0:n.progress,d=s.length>0||c.length>0,f=d?Le(s,c):``,p=Re(l),m=`<form id="task-form" data-task-id="${esc(n?.id||``)}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${esc(n?.typeAr||a?.typeAr||(a?`مخطط`:``))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${esc(n?.typeEn||a?.typeEn||(a?`Drawing`:``))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${esc(JSON.stringify(s))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${esc(JSON.stringify(c))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${esc(JSON.stringify(l))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${choose(`البيانات الأساسية والمكتبة القياسية`,`Basic Details & Standard Library`)}</span>
      </div>

      <div class="field full">
        <label>${choose(`المشروع التابع له`,`Project`)} *</label>
        <select name="projectId" id="task-project-select" required>
          ${e.data.projects.map(e=>`<option value="${esc(e.id)}" ${e.id===o?`selected`:``}>${esc(choose(e.nameAr,e.nameEn))} (${esc(e.code)})</option>`).join(``)}
        </select>
      </div>

      <div class="field full">
        <label>${t(`taskTitle`)} *</label>
        <input name="titleAr" id="task-title-ar" value="${esc(n?.titleAr||a?.nameAr||``)}" placeholder="${choose(`اسم المخرج أو المهمة`,`Deliverable or task name`)}" required />
      </div>
      <div class="field">
        <label>${t(`nameEn`)}</label>
        <input name="titleEn" id="task-title-en" value="${esc(n?.titleEn||a?.nameEn||``)}" placeholder="${choose(`Task / Deliverable Name (EN)`,`Task / Deliverable Name (EN)`)}" />
      </div>
      <div class="field">
        <label>${t(`addFromLibrary`)}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${choose(`مهمة مخصصة`,`Custom task`)}</option>
          ${e.data.templates.map(e=>`<option value="${esc(e.id)}" ${(n?.templateId||r)===e.id?`selected`:``}>${esc(e.code)} — ${esc(choose(e.nameAr,e.nameEn))}</option>`).join(``)}
        </select>
      </div>

      <!-- 👥 القسم 2: المسؤوليات وفريق العمل -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>👥</span> <span>${choose(`المسؤوليات وفريق العمل`,`Ownership & Team`)}</span>
      </div>

      <div class="field full">
        <label>${choose(`المسؤول الرئيسي`,`Primary Assignee`)}</label>
        <select name="assigneeId" id="task-primary-assignee">
          <option value="">${choose(`— بدون تحديد —`,`— Unassigned —`)}</option>
          ${e.data.users.map(r=>`<option value="${esc(r.id)}" ${(n?n.assigneeId===r.id:e.data.user.id===r.id)?`selected`:``}>${esc(choose(r.name,r.nameEn||r.name))}</option>`).join(``)}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${choose(`فريق العمل والمسؤولون المشاركون (داخلي وخارجي)`,`Collaborators & Assignees (Team & External)`)}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose(`اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة`,`Pick team members or type external name`)}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${d?`flex`:`none`};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${f}
        </div>

        <!-- حقل البحث والإضافة السريعة -->
        <div style="position:relative;display:flex;gap:6px;">
          <input type="text" id="assignee-combobox-search" placeholder="${choose(`ابحث عن عضو بالفريق أو اكتب اسماً خارجياً...`,`Search team member or type external name...`)}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          <button type="button" id="btn-add-external-quick" class="btn btn-soft btn-sm" style="display:none;padding:0 12px;white-space:nowrap;font-size:11px;">
            ➕ ${choose(`إضافة كمسؤول خارجي`,`Add external`)}
          </button>
        </div>

        <!-- القائمة المنسدلة للبحث والاختيار -->
        <div id="assignee-combobox-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
        </div>
      </div>

      <!-- ⏱️ القسم 3: الحالة والجدولة والتذكيرات (بدون تبعيات نهائياً) -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>⏱️</span> <span>${choose(`الحالة والجدولة والتذكيرات`,`Status, Scheduling & Reminders`)}</span>
      </div>

      <div class="field">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${t(`status`)}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${u}%)</span>
        </label>
        <select name="status" id="task-status-select">${Ue().map(([e,r])=>`<option value="${e}" ${n?.status===e?`selected`:``}>${r}</option>`).join(``)}</select>
      </div>
      <div class="field">
        <label>${t(`priority`)}</label>
        <select name="priority">${[`low`,`medium`,`high`,`urgent`].map(e=>`<option value="${e}" ${(n?.priority||`medium`)===e?`selected`:``}>${priorityText(e)}</option>`).join(``)}</select>
      </div>
      <div class="field">
        <label>${t(`startDate`)}</label>
        <input type="date" name="startDate" id="task-start-date" value="${esc(n?.startDate||``)}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${t(`dueDate`)}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${esc(n?.dueDate||``)}" min="${esc(n?.startDate||``)}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
      </div>

      <!-- أداة التذكيرات المتعددة التفاعلية -->
      <div class="field full" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;padding:12px;">
        <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            <span>⏰</span> ${choose(`تذكيرات المهمة (إشعار نظام + بريد إلكتروني للمسؤول)`,`Task Reminders (System Notification + Email to Assignee)`)}
          </span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose(`يمكنك إضافة أكثر من موعد تذكير وحذف ما تشاء`,`Add multiple reminders and delete any`)}</span>
        </label>

        <!-- قائمة التذكيرات المضافة (Pre-rendered for zero layout shift) -->
        <div id="task-reminders-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${p}
        </div>

        <!-- صف إضافة تذكير جديد -->
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="datetime-local" id="new-reminder-datetime" style="flex:1;min-width:180px;font-size:12px;padding:6px 10px;" />
          <input type="text" id="new-reminder-note" placeholder="${choose(`ملاحظة التذكير (اختياري)...`,`Reminder note (optional)...`)}" style="flex:1;min-width:150px;font-size:12px;padding:6px 10px;" />
          <button type="button" id="btn-add-reminder" class="btn btn-soft btn-sm" style="white-space:nowrap;padding:7px 12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
            ➕ ${choose(`إضافة تذكير`,`Add Reminder`)}
          </button>
        </div>
      </div>

      <!-- 📝 القسم 4: تفاصيل ومخرجات المهمة -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📝</span> <span>${choose(`تفاصيل ومخرجات المهمة`,`Task Details & Deliverables`)}</span>
      </div>

      <div class="field full">
        <label>${t(`description`)}</label>
        <textarea name="descriptionAr" placeholder="${choose(`ما المطلوب؟ وما معيار الإغلاق؟`,`What is required and what defines completion?`)}">${esc(n?.descriptionAr||``)}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${n&&(can(`delete_tasks`)||isAdmin())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${esc(n.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${choose(`حذف المهمة ونقلها لسلة المهملات`,`Delete task and move to trash`)}">
            ${icon(`trash`,14)} ${choose(`حذف المهمة`,`Delete Task`)}
          </button>
        `:``}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${n?t(`save`):t(`create`)}</button>
      </div>
    </div>
  </form>`,h=m,g=``;n&&(g=`modal-lg`,h=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${choose(`تفاصيل المهمة`,`Task Details`)}</h3>
          ${m}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${choose(`المخططات والملفات`,`Documents & Files`)}
              </h3>
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${icon(`plus`,12)} ${choose(`اختيار ملفات`,`Choose Files`)}
                <input type="file" multiple id="task-upload-input" data-task-id="${n.id}" style="display:none;" />
              </label>
            </div>
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${n.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${icon(`upload`,22)}</span>
                <div style="font-size:12px;font-weight:600;color:var(--ink);">${choose(`اسحب المخططات والملفات وأفلتها هنا، أو اضغط للتصفح`,`Drag & drop files here, or click to browse`)}</div>
                <div style="font-size:10px;color:var(--muted);">${choose(`دعم كامل لملفات CAD و PDF و 3D و الصور حتى 5GB`,`Full support for CAD, PDF, 3D & images up to 5GB`)}</div>
              </div>
              <div id="upload-progress-container" style="display:none;margin-top:12px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);text-align:start;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink);margin-bottom:6px;gap:8px;">
                  <span id="upload-progress-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${choose(`جاري الرفع...`,`Uploading...`)}</span>
                  <strong id="upload-progress-percent" style="color:var(--brand-teal);font-variant-numeric:tabular-nums;flex-shrink:0;">0%</strong>
                </div>
                <div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden;position:relative;">
                  <div id="upload-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, var(--brand-teal), #00c2cb);border-radius:3px;transition:width 0.15s ease;"></div>
                </div>
              </div>
            </div>
            <div id="task-documents-list">${N(n)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${choose(`النقاشات والتعليقات`,`Discussion & Comments`)}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${Ve(n)}</div>
            <form id="task-comment-form" data-task-id="${n.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${choose(`اكتب تعليقاً... (استخدم @ للإشارة)`,`Write a comment... (use @ to mention)`)}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${choose(`إرسال`,`Send`)}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById(`modal-root`).innerHTML=modalShell(n?choose(`تعديل المهمة`,`Edit task`):t(`addTask`),choose(`المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.`,`A task is the unit of execution; link a standard deliverable and add a reminder.`),h,`task`,g),Be(n)}function Be(n){let r=document.getElementById(`modal-root`);if(!r)return;let i=r.querySelector(`#task-status-select`),a=r.querySelector(`#task-auto-progress-badge`);i&&a&&i.addEventListener(`change`,()=>{let e={not_started:0,in_progress:50,review:80,approval:80,done:100}[i.value]??0;a.textContent=`(${e}%)`});let o=r.querySelector(`#task-template-select`);o&&o.addEventListener(`change`,()=>{let n=o.value,i=(e.data?.templates||[]).find(e=>e.id===n);if(i){let e=r.querySelector(`#task-title-ar`),n=r.querySelector(`#task-title-en`),a=r.querySelector(`#task-type-ar`),o=r.querySelector(`#task-type-en`);e&&!e.value&&(e.value=i.nameAr||``),n&&!n.value&&(n.value=i.nameEn||``),a&&(a.value=i.typeAr||`مخطط`),o&&(o.value=i.typeEn||`Drawing`)}});let s=r.querySelector(`#task-additional-assignees-input`),c=r.querySelector(`#task-external-assignees-input`),l=r.querySelector(`#assignees-chips-container`),u=r.querySelector(`#assignee-combobox-search`),d=r.querySelector(`#assignee-combobox-dropdown`),f=r.querySelector(`#btn-add-external-quick`),p=[];try{p=JSON.parse(s?.value||`[]`)}catch{p=[]}let m=[];try{m=JSON.parse(c?.value||`[]`)}catch{m=[]}function h(){s&&(s.value=JSON.stringify(p)),c&&(c.value=JSON.stringify(m))}function g(){l&&(p.length===0&&m.length===0?(l.style.display=`none`,l.innerHTML=``,h()):(l.style.display=`flex`,l.innerHTML=Le(p,m),h()))}function _(n=``){if(!d)return;let i=n.trim().toLowerCase(),a=e.data?.users||[],o=r.querySelector(`#task-primary-assignee`)?.value,s=a.filter(e=>{if(e.id===o)return!1;if(!i)return!0;let n=(e.name||``).toLowerCase(),r=(e.nameEn||``).toLowerCase(),a=(e.email||``).toLowerCase();return n.includes(i)||r.includes(i)||a.includes(i)}),c=``;i&&(c+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${choose(`إضافة مسؤول خارجي:`,`Add external assignee:`)} "${esc(n.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${choose(`إضافة سريعة`,`Quick Add`)}</span>
        </div>
      `),s.length===0&&!i?c+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${choose(`لا يوجد مستخدمين آخرين`,`No other users`)}</div>`:s.forEach(e=>{let n=p.includes(e.id);c+=`
          <div class="combobox-user-row" data-uid="${esc(e.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${esc(e.id)}" ${n?`checked`:``} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${avatar(e,`mini-avatar`)}
              <div>
                <strong style="color:var(--ink);">${esc(choose(e.name,e.nameEn||e.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${esc(choose(e.jobTitleAr,e.jobTitleEn)||e.email||``)}</span>
              </div>
            </div>
            ${n?`<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>`:``}
          </div>
        `}),d.innerHTML=c,d.style.display=`block`}h(),u&&(u.addEventListener(`focus`,()=>{_(u.value)}),u.addEventListener(`input`,()=>{let e=u.value.trim();_(e),f&&(f.style.display=e.length>1?`inline-flex`:`none`)}),u.addEventListener(`keydown`,e=>{if(e.key===`Enter`){e.preventDefault();let n=u.value.trim();n&&(m.includes(n)||(m.push(n),g()),u.value=``,f&&(f.style.display=`none`),d&&(d.style.display=`none`))}})),f&&f.addEventListener(`click`,()=>{let e=u?.value.trim();e&&(m.includes(e)||(m.push(e),g()),u.value=``,f.style.display=`none`,d&&(d.style.display=`none`))}),d&&d.addEventListener(`click`,e=>{if(e.target.closest(`.dropdown-ext-action`)){let e=u?.value.trim();e&&!m.includes(e)&&(m.push(e),g()),u&&(u.value=``),f&&(f.style.display=`none`),d.style.display=`none`;return}let n=e.target.closest(`.combobox-user-row`);if(n){let e=n.dataset.uid;p.includes(e)?p=p.filter(n=>n!==e):p.push(e),g(),_(u?.value||``)}}),l&&l.addEventListener(`click`,e=>{let n=e.target.closest(`.btn-remove-chip-user`);if(n){let e=n.dataset.uid;p=p.filter(n=>n!==e),g(),d&&d.style.display===`block`&&_(u?.value||``);return}let r=e.target.closest(`.btn-remove-chip-ext`);if(r){let e=r.dataset.ext;m=m.filter(n=>n!==e),g()}});let v=r.querySelector(`#task-reminders-input`),y=r.querySelector(`#task-reminders-list`),b=r.querySelector(`#new-reminder-datetime`),x=r.querySelector(`#new-reminder-note`),S=r.querySelector(`#btn-add-reminder`),C=[];try{C=JSON.parse(v?.value||`[]`)}catch{C=[]}Array.isArray(C)||(C=[]);function w(){y&&(v&&(v.value=JSON.stringify(C)),y.innerHTML=Re(C))}S&&S.addEventListener(`click`,()=>{let e=b?.value;if(!e){showToast(choose(`يرجى اختيار تاريخ ووقت التذكير.`,`Please pick a reminder date & time.`),!0);return}let n=x?.value.trim()||``,r={id:`rem_temp_`+Math.random().toString(36).substr(2,9),remindAt:new Date(e).toISOString(),noteAr:n};C.push(r),b&&(b.value=``),x&&(x.value=``),w(),showToast(choose(`تمت إضافة موعد التذكير للقائمة.`,`Reminder added to list.`))}),y&&y.addEventListener(`click`,async e=>{let n=e.target.closest(`.btn-delete-reminder`);if(n){let e=Number(n.dataset.idx),r=n.dataset.remId;!isNaN(e)&&e>=0&&e<C.length&&(C.splice(e,1),w(),r&&!r.startsWith(`rem_temp_`)&&O(`/api/reminders/${r}`,{method:`DELETE`}).catch(()=>{}),showToast(choose(`تم حذف موعد التذكير.`,`Reminder deleted.`)))}}),r.addEventListener(`mousedown`,e=>{d?.contains(e.target)||u?.contains(e.target)||f?.contains(e.target)||(d&&(d.style.display=`none`),f&&(f.style.display=`none`))})}function Ve(n){let r=(e.data.comments||[]).filter(e=>e.taskId===n.id).sort((e,n)=>new Date(e.createdAt)-new Date(n.createdAt));return r.length?`<div style="display:flex;flex-direction:column;gap:12px;">${r.map(r=>{let i=r.user||(e.data?.users||[]).find(e=>e.id===r.userId)||e.data?.user||{name:`DARC Member`,id:``},a=!!(i.id&&e.data?.user?.id&&i.id===e.data.user.id),o=a||typeof isAdmin==`function`&&isAdmin(),s=esc(r.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,`<strong style="color:var(--blue)">@$1</strong>`);return`
      <div class="task-comment-item" data-comment-id="${esc(r.id)}" style="display:flex;gap:10px;flex-direction:${a?`row-reverse`:`row`};">
        ${avatar(i)}
        <div style="display:flex;flex-direction:column;align-items:${a?`flex-end`:`flex-start`};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${esc(choose(i.name,i.nameEn||i.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(r.createdAt,!0)}</span>
            ${o?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${esc(r.id)}" data-task-id="${esc(n.id)}" title="${choose(`تعديل التعليق`,`Edit comment`)}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${icon(`edit`,12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${esc(r.id)}" data-task-id="${esc(n.id)}" title="${choose(`حذف التعليق`,`Delete comment`)}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${icon(`trash`,12)}
                </button>
              </div>
            `:``}
          </div>
          <div id="comment-bubble-${esc(r.id)}" style="background:${a?`var(--blue)`:`var(--surface)`};color:${a?`#fff`:`var(--ink)`};padding:8px 12px;border-radius:12px;font-size:13px;border:${a?`none`:`1px solid var(--border)`};border-top-${a?`right`:`left`}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${s}</div>
        </div>
      </div>
    `}).join(``)}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${icon(`message`,18)}<span style="font-size:12px;">${choose(`لا توجد تعليقات`,`No comments yet`)}</span></div>`}function N(n){let r=e.data.documents.filter(e=>e.taskId===n.id).sort((e,n)=>new Date(n.createdAt)-new Date(e.createdAt));return r.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${r.map(e=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${e.id}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${icon(`document`,14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${esc(e.originalName)}">${esc(e.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${dateLabel(e.createdAt,!0)} · ${esc(e.user?choose(e.user.name,e.user.nameEn||e.user.name):`Team Member`)} · ${e.size>1048576?(e.size/1048576).toFixed(1)+`MB`:Math.round(e.size/1024)+`KB`}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${choose(`نسخ رابط المشاركة`,`Copy share link`)}">${icon(`link`,14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${choose(`معاينة المخطط في نافذة منبثقة`,`Preview in popup modal`)}">${icon(`eye`,14)}</button>
        ${can(`review_tasks`)||can(`approve_tasks`)||can(`upload_documents`)||isAdmin()?`
          <select class="doc-status-select" data-doc-id="${e.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${e.status===`draft`?`selected`:``}>${choose(`مسودة`,`Draft`)}</option>
            ${can(`review_tasks`)||isAdmin()?`<option value="review" ${e.status===`review`?`selected`:``}>${choose(`مراجعة`,`Review`)}</option>`:``}
            ${can(`approve_tasks`)||isAdmin()?`<option value="approved" ${e.status===`approved`?`selected`:``}>${choose(`معتمد`,`Approved`)}</option>`:``}
            <option value="superseded" ${e.status===`superseded`?`selected`:``}>${choose(`ملغى`,`Superseded`)}</option>
          </select>
        `:``}
        ${can(`upload_documents`)||isAdmin()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;" title="${choose(`إعادة تسمية`,`Rename`)}">${icon(`edit`,14)}</button>`:``}
        ${can(`delete_documents`)||isAdmin()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${choose(`حذف`,`Delete`)}">${icon(`trash`,14)}</button>`:``}
      </div>
    </div>
  `).join(``)}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${icon(`document`,18)}<span style="font-size:12px;">${choose(`لا توجد ملفات مرفوعة`,`No documents uploaded`)}</span></div>`}function He(n){let r=(e.data?.documents||[]).find(e=>e.id===n);if(!r)return;let i=r.diskFilename||`/api/documents/${r.id}`;(i.startsWith(`file://`)||i.startsWith(`/`)||!i.startsWith(`http`))&&(i=`/api/documents/${r.id}`);let a=``;if(i.includes(`drive.google.com`)){let e=i.match(/\/d\/([a-zA-Z0-9_-]+)/);e&&e[1]&&(a=e[1])}let o=a?`https://drive.google.com/file/d/${encodeURIComponent(a)}/preview`:i,s=/^(https?:\/\/|\/)/i.test(o)?o:`about:blank`,c=a?`https://drive.google.com/file/d/${encodeURIComponent(a)}/view?usp=drivesdk`:i.startsWith(`http`)?i:`${window.location.origin}${i}`,l=/^(https?:\/\/|\/)/i.test(c)?c:`#`,u=`/api/documents/${encodeURIComponent(r.id)}`,d=/\.(jpe?g|png|gif|webp|svg|heic)$/i.test(r.originalName)||r.mimeType&&r.mimeType.startsWith(`image/`);r.size>1048576?(r.size/1048576).toFixed(1)+``:Math.round((r.size||0)/1024)+``;let f=document.getElementById(`preview-modal-overlay`);f||(f=document.createElement(`div`),f.id=`preview-modal-overlay`,f.style.position=`fixed`,f.style.inset=`0`,f.style.zIndex=`1300`,f.style.background=`rgba(0, 0, 0, 0.75)`,f.style.backdropFilter=`blur(4px)`,f.style.display=`flex`,f.style.alignItems=`center`,f.style.justifyContent=`center`,f.style.padding=`20px`,document.body.appendChild(f)),f.innerHTML=`
    <div style="background:var(--surface);width:95%;max-width:1100px;height:88vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--line);background:var(--surface);">
        <div style="display:flex;align-items:center;gap:10px;overflow:hidden;">
          <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${icon(`document`,16)}</span>
          <div style="overflow:hidden;">
            <h2 style="margin:0;font-size:15px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(r.originalName)}">${esc(r.originalName)}</h2>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" data-action="copy-doc-link" data-doc-id="${esc(r.id)}" style="display:flex;align-items:center;gap:6px;" title="${choose(`نسخ رابط المشاركة`,`Copy share link`)}">
            ${icon(`link`,13)} <span class="hide-mobile">${choose(`نسخ الرابط`,`Copy Link`)}</span>
          </button>
          <a href="${esc(l)}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${choose(`فتح في Google Drive`,`Open in Google Drive`)}">
            ${icon(`globe`,13)} <span class="hide-mobile">${choose(`فتح في Drive`,`Open in Drive`)}</span>
          </a>
          <a href="${esc(u)}" target="_blank" download class="btn btn-primary btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${choose(`تحميل المخطط`,`Download`)}">
            ${icon(`download`,13)} <span class="hide-mobile">${choose(`تحميل`,`Download`)}</span>
          </a>
          <button type="button" class="btn btn-ghost btn-sm" id="close-preview-modal-btn" style="padding:6px;min-width:0;margin-inline-start:4px;" title="${choose(`إغلاق`,`Close`)}">${icon(`close`,18)}</button>
        </div>
      </div>
      <div style="flex:1;position:relative;background:#1a1a1a;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        ${!a&&d?`
          <div style="width:100%;height:100%;overflow:auto;display:flex;align-items:center;justify-content:center;padding:15px;">
            <img src="${esc(s)}" alt="${esc(r.originalName)}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='${esc(u)}';" />
          </div>
        `:`
          <iframe src="${esc(s)}" style="width:100%;height:100%;border:none;background:#fff;" allow="autoplay" loading="lazy"></iframe>
        `}
      </div>
    </div>
  `,f.style.display=`flex`,document.getElementById(`close-preview-modal-btn`)?.addEventListener(`click`,()=>{f.style.display=`none`,f.innerHTML=``}),f.onclick=e=>{e.target===f&&(f.style.display=`none`,f.innerHTML=``)}}function Ue(){return[[`not_started`,t(`notStarted`)],[`in_progress`,t(`inProgress`)],[`review`,t(`review`)],[`approval`,t(`approval`)],[`done`,t(`done`)],[`blocked`,t(`blocked`)],[`canceled`,t(`canceled`)]]}function We(){let n=document.querySelector(`.timeline-container > div`),r=document.querySelector(`.timeline-svg`);if(!n||!r)return;r.innerHTML=``;let i=Array.from(document.querySelectorAll(`.timeline-bar`)),a={},o=n.getBoundingClientRect();i.forEach(e=>{let n=e.getBoundingClientRect();a[e.dataset.taskId]={left:n.left-o.left,right:n.right-o.left,top:n.top-o.top,bottom:n.bottom-o.top,width:n.width,height:n.height,center:n.top-o.top+n.height/2}});let s=``,c=e.lang===`ar`;i.forEach(n=>{let r=n.dataset.taskId,i=(e.data?.tasks||[]).find(e=>e.id===r),o=i?.dependencies||i?.customFields?.dependencies||[];if(!i||!o.length)return;let l=a[r];l&&o.forEach(e=>{let n=a[e];if(!n)return;let r=c?n.left:n.right,i=n.center,o=c?l.right:l.left,u=l.center,d=r+(c?-20:20);s+=`<path d="M ${r} ${i} C ${d} ${i}, ${d} ${u}, ${o} ${u}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),r.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${s}
  `}var Ge=i({buildProjectMemberChipsHtml:()=>nt,exportPortfolioXLS:()=>ot,exportProjectXLS:()=>st,exportXLS:()=>at,getDaysLeftBadge:()=>qe,getProjectTeam:()=>Je,getProjectTeamData:()=>P,openCloneModal:()=>it,openProjectModal:()=>rt,projectCard:()=>Qe,projectRow:()=>Ke,renderProjectCardTeamAvatars:()=>Ze,renderProjectDetail:()=>tt,renderProjectOverviewTab:()=>$e,renderProjectTeamAvatars:()=>Ye,renderProjectTimelineBar:()=>Xe,renderProjects:()=>et});function Ke(n){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${icon(`building`,17)}</span><div class="project-name"><strong>${esc(choose(n.nameAr,n.nameEn))}</strong><span>${esc(n.code)} · ${esc(choose(n.clientAr,n.clientEn))}</span></div></div>${projectProgress(n)}<div class="project-owner">${avatar(n.manager)}<span>${esc(n.manager?choose(n.manager.name,n.manager.nameEn||n.manager.name):`—`)}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${esc(n.id)}" aria-label="${t(`viewDetails`)}">${icon(e.lang===`ar`?`arrowLeft`:`arrow`,14)}</button></div>`}function qe(e){if(!e)return``;let n=new Date(`${e}T23:59:59`),r=Math.ceil((n-new Date)/864e5),i=`var(--mint-strong)`,a=`var(--mint)`,o=``;return r<0?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`متأخر ${Math.abs(r)} يوم`,`${Math.abs(r)}d overdue`)):r===0?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`يستحق اليوم`,`Due today`)):r<=2?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`باقي ${r} يوم`,`${r}d left`)):r<=7?(i=`var(--amber)`,a=`var(--amber-soft)`,o=choose(`باقي ${r} أيام`,`${r}d left`)):(i=`var(--mint-strong)`,a=`var(--mint)`,o=choose(`باقي ${r} يوم`,`${r}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${i};background:${a};border:1px solid currentColor;">${icon(`clock`,11)} ${o}</span>`}function P(n){let r=e.data?.users||[],i=(e.data?.tasks||[]).filter(e=>e.projectId===n.id),a=new Set,o=new Set;return n.managerId&&a.add(n.managerId),i.forEach(e=>{e.assigneeId&&a.add(e.assigneeId),(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).forEach(e=>a.add(e)),(e.customFields?.externalAssignees||e.customFields?.external_assignees||[]).forEach(e=>{e&&typeof e==`string`&&e.trim()&&o.add(e.trim())})}),{internalMembers:Array.from(a).map(e=>r.find(n=>n.id===e)).filter(Boolean),externalMembers:Array.from(o)}}function Je(e){return P(e).internalMembers}function Ye(e,n=4,r=!0,i=[]){if((!e||!e.length)&&(!i||!i.length))return`<span style="font-size:11px;color:var(--muted);">${choose(`لا يوجد فريق محدد`,`No team assigned`)}</span>`;let a=(e||[]).slice(0,n),o=(e||[]).length-n,s=(e||[]).map(e=>choose(e.name,e.nameEn||e.name)).join(`، `),c=`<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">`;return a.forEach(e=>{let n=choose(e.name,e.nameEn||e.name),i=r?`data-action="filter-by-member" data-member-id="${esc(e.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:`style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"`;c+=`
      <span class="team-member-chip" ${i} title="${esc(n)} (${esc(roleName(e))})">
        ${avatar(e,`mini-avatar`)}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${esc(n)}</span>
      </span>
    `}),o>0&&(c+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${esc(s)}">+${o} ${choose(`آخرين`,`more`)}</span>`),i&&i.length>0&&(c+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${esc(i.join(`، `))}">🌐 +${i.length} ${choose(`خارجي`,`ext`)}</span>`),c+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${choose(`فريق العمل الداخلي`,`Internal Team`)} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(e=>`
        <div ${r?`data-action="filter-by-member" data-member-id="${esc(e.id)}" title="${esc(choose(`فلترة مهام `+(e.name||``),`Filter tasks of `+(e.nameEn||e.name||``)))}"`:``} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${r?`cursor:pointer;transition:all 0.15s;`:``}" ${r?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:``}>
          ${avatar(e,`micro-avatar`)}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${esc(choose(e.name,e.nameEn||e.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${esc(roleName(e))}</span>
          </div>
        </div>
      `).join(``)}
    </div>
    
    ${i&&i.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${choose(`الشركاء والمتعاونون الخارجيون`,`External Partners`)} (${i.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${i.map(e=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${esc(e)}</span>
          </div>
        `).join(``)}
      </div>
    `:``}

    ${r?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${choose(`💡 اضغط على أي عضو لفلترة مهامه`,`💡 Click member to filter tasks`)}</div>`:``}
  </div>`,c+=`</div>`,c}function Xe(e){if(!e.dueDate)return``;let n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),r=new Date(`${e.dueDate}T23:59:59`),i=new Date,a=r.getTime()-n.getTime(),o=0;a>0&&(o=Math.min(100,Math.max(0,Math.round((i.getTime()-n.getTime())/a*100))));let s=i>r,c=s?`var(--red)`:o>=80&&!s?`var(--amber)`:`var(--blue)`;return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${icon(`clock`,12)}
          <strong>${choose(`المؤشر الزمني للمشروع`,`Project Schedule Elapsed`)}</strong>: 
          <span style="color:${c};font-weight:bold;">${s?choose(`انتهى موعد التسليم!`,`Deadline passed!`):choose(`مضى ${o}% من الوقت`,`${o}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${dateLabel(e.startDate)} ➔ ${dateLabel(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${o}%;background:${c};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function Ze(e=[],n=[],r=3){let i=e.length+n.length;if(i===0)return`<span style="font-size:11px;color:var(--muted);">—</span>`;let a=e.slice(0,r),o=i-a.length;[...e.map(e=>choose(e.name,e.nameEn||e.name)),...n].join(`، `);let s=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${choose(`عرض فريق العمل`,`View Team`)}">`;return s+=`<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">`,a.forEach((e,n)=>{s+=`
      <div style="margin-inline-start:${n===0?`0`:`-8px`};position:relative;z-index:${10-n};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${avatar(e,`mini-avatar`)}
      </div>
    `}),o>0&&(s+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${o}
      </div>
    `),n&&n.length>0&&o<=0&&(s+=`<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>`),s+=`</div>`,s+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${choose(`فريق العمل`,`Team Members`)}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${i}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(e=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${avatar(e,`micro-avatar`)}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(choose(e.name,e.nameEn||e.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${esc(roleName(e))}</span>
            </div>
          </div>
        `).join(``)}
      </div>
      ${n&&n.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${choose(`الشركاء الخارجيون`,`External Partners`)} (${n.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${n.map(e=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${esc(e)}
              </div>
            `).join(``)}
          </div>
        </div>
      `:``}
    </div>
  `,s+=`</div>`,s}function Qe(n){let{internalMembers:r,externalMembers:i}=P(n),a=n.manager||(e.data?.users||[]).find(e=>e.id===n.managerId),o=qe(n.dueDate),s=choose(n.descriptionAr||n.clientAr,n.descriptionEn||n.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
        <span class="project-card-symbol">${icon(`building`,19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${esc(n.code)}</span>
          <h3 class="project-card-title" title="${esc(choose(n.nameAr,n.nameEn))}">${esc(choose(n.nameAr,n.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${n._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${choose(`بانتظار المزامنة مع السيرفر`,`Pending cloud sync`)}">⏳ ${choose(`معلقة`,`Pending`)}</span>`:``}
        <span class="status-badge ${esc(n.health)}">${esc(statusText(n.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${esc(s||``)}">
      ${s?esc(s):`<span style="color:var(--muted);font-style:italic;">${choose(`لا يوجد وصف مسجل لهذا المشروع`,`No description registered`)}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${avatar(a,`mini-avatar`)}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${t(`manager`)}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(a?choose(a.name,a.nameEn||a.name):`—`)}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${t(`team`)} (${r.length+i.length})</span>
        ${Ze(r,i,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${t(`deadline`)}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${n.dueDate?dateLabel(n.dueDate,!0):`—`}</strong>
          ${o}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${n.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${n.health===`off_track`?`red`:n.health===`at_risk`?`amber`:``}" style="width:${n.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${esc(n.id)}">
      ${t(`viewDetails`)} ${icon(e.lang===`ar`?`arrowLeft`:`arrow`,13)}
    </button>
  </article>`}function $e(n,r,i,a=[]){let o=n.manager||(e.data?.users||[]).find(e=>e.id===n.managerId),s=r.filter(e=>e.status===`done`).length,c=r.filter(e=>e.status===`in_progress`).length,l=r.filter(isOverdue).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${choose(`إجمالي المهام`,`Total Tasks`)}</span>
          <div class="metric-value">${r.length}</div>
          <span class="metric-note up">${s} ${t(`done`)}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${choose(`قيد التنفيذ`,`In Progress`)}</span>
          <div class="metric-value">${c}</div>
          <span class="metric-note">${choose(`عمل جارٍ`,`Active work`)}</span>
        </div>
        <div class="metric-card ${l?`red`:`teal`}" style="padding:14px 18px;">
          <span class="metric-label">${t(`overdue`)}</span>
          <div class="metric-value">${l}</div>
          <span class="metric-note ${l?`alert`:`up`}">${l?choose(`تحتاج تدخلاً عاجلاً`,`Needs urgent action`):choose(`لا يوجد تأخير`,`On track`)}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${choose(`فريق العمل`,`Team Size`)}</span>
          <div class="metric-value">${i.length+(a?.length||0)}</div>
          <span class="metric-note">${choose(`أعضاء مساهمون`,`Active contributors`)}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${Xe(n)}

      <!-- Details Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${icon(`document`,16)}
            ${choose(`نطاق وتفاصيل المشروع`,`Project Scope & Details`)}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${esc(n.descriptionAr||n.descriptionEn||choose(`لا يوجد وصف مسجل لهذا المشروع حالياً.`,`No description available for this project.`))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`client`)}</span>
              <strong style="font-size:13px;color:var(--ink);">${esc(choose(n.clientAr,n.clientEn)||`—`)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`lifecycle`)}</span>
              <strong style="font-size:13px;color:var(--ink);">${esc(statusText(n.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`startDate`)}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(n.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`dueDate`)}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(n.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${icon(`users`,16)}
            ${choose(`القيادة وفريق العمل`,`Leadership & Team`)}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${avatar(o)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${t(`manager`)}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${esc(o?choose(o.name,o.nameEn||o.name):`—`)}</strong>
              <span style="font-size:11px;color:var(--muted);">${esc(o?.email||``)}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${choose(`أعضاء الفريق الداخلي:`,`Internal Team Members:`)}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${i.map(e=>{let n=r.filter(n=>n.assigneeId===e.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${avatar(e,`mini-avatar`)}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${esc(choose(e.name,e.nameEn||e.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${esc(roleName(e))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${n} ${t(`tasks`)}</span>
                </div>
              `}).join(``)}
          </div>

          ${a&&a.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${choose(`الشركاء والمتعاونون الخارجيون:`,`External Partners & Collaborators:`)}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${a.map(e=>{let n=r.filter(n=>(n.customFields?.externalAssignees||n.customFields?.external_assignees||[]).includes(e)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${esc(e)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${choose(`شريك / جهة خارجية`,`External Partner`)}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${n} ${t(`tasks`)}</span>
                  </div>
                `}).join(``)}
            </div>
          `:``}
        </div>
      </div>
    </div>
  `}function et(){let n=e.searches.projects.trim().toLowerCase(),r=e.data.projects.filter(e=>`${e.nameAr} ${e.nameEn} ${e.code} ${e.clientAr}`.toLowerCase().includes(n)),i=e.projectSort||`default`;return i===`alpha-asc`?r.sort((n,r)=>(choose(n.nameAr,n.nameEn)||``).localeCompare(choose(r.nameAr,r.nameEn)||``,e.lang===`ar`?`ar`:`en`)):i===`alpha-desc`?r.sort((n,r)=>(choose(r.nameAr,r.nameEn)||``).localeCompare(choose(n.nameAr,n.nameEn)||``,e.lang===`ar`?`ar`:`en`)):i===`progress-asc`?r.sort((e,n)=>(Number(e.progress)||0)-(Number(n.progress)||0)):i===`progress-desc`&&r.sort((e,n)=>(Number(n.progress)||0)-(Number(e.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${choose(`المحفظة`,`PORTFOLIO`)}</p><h1>${t(`projects`)}</h1><p>${choose(`كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.`,`One view for every project: health, progress, team, and next deadline.`)}</p></div><div class="page-actions">${can(`create_projects`)?`<button class="btn btn-primary" data-action="new-project">${icon(`plus`,15)} ${t(`addProject`)}</button>`:``}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${icon(`search`,15)}<input data-search="projects" value="${esc(e.searches.projects)}" placeholder="${t(`search`)}" /></div><div class="sort-box"><span>${choose(`الترتيب:`,`Sort:`)}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${i==="default"?`selected`:``}>${choose(`الافتراضي`,`Default`)}</option><option value="alpha-asc" ${i===`alpha-asc`?`selected`:``}>${choose(`أبجدياً (أ - ي)`,`Alphabetical (A - Z)`)}</option><option value="alpha-desc" ${i===`alpha-desc`?`selected`:``}>${choose(`أبجدياً (ي - أ)`,`Alphabetical (Z - A)`)}</option><option value="progress-asc" ${i===`progress-asc`?`selected`:``}>${choose(`نسبة الإنجاز (تصاعدي 0% ← 100%)`,`Progress (Low to High)`)}</option><option value="progress-desc" ${i===`progress-desc`?`selected`:``}>${choose(`نسبة الإنجاز (تنازلي 100% ← 0%)`,`Progress (High to Low)`)}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${r.length} ${choose(`مشاريع`,`projects`)}</span></div></div>${r.length?`<div class="project-cards">${r.map(Qe).join(``)}</div>`:`<section class="panel"><div class="empty">${icon(`building`,18)}<span>${t(`noProjects`)}</span></div></section>`}`}function tt(){let n=e.data.projects.find(n=>n.id===e.activeProjectId);if(!n)return e.view=`projects`,et();let r=e.data.tasks.filter(e=>e.projectId===n.id),{internalMembers:i,externalMembers:a}=P(n),o=e.projectTab||`tasks`,s=e.projectMemberFilter||null,c=s?r.filter(e=>e.assigneeId===s||(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).includes(s)):r,l=s?e.data.users.find(e=>e.id===s):null,u=``;if(o===`overview`)u=$e(n,r,i,a);else if(o===`tasks`){let r=e.projectTaskSort||M();u=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${t(`projectTasks`)} ${s?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${choose(`مهام`,`Tasks of`)}: ${esc(choose(l?.name,l?.nameEn||l?.name))})</span>`:``}</h2>
            <p class="panel-subtitle">${choose(`توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.`,`Tasks grouped by current workflow state, automatically sorted.`)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${Oe(r,`sort-project-tasks`)}
            ${s?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${icon(`close`,12)} ${choose(`إلغاء الفلترة`,`Clear filter`)}</button>`:``}
            ${can(`create_tasks`)?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${esc(n.id)}" title="${choose(`اضغط N للإضافة السريعة`,`Press N to add quickly`)}">${icon(`plus`,14)} ${t(`addTask`)} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:``}
          </div>
        </div>
        ${renderBoard(c,r)}
      </div>
    `}else if(o===`timeline`){let{renderTimelinePanel:e}=window.__timelineExports||{};u=e?e(c,n):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</h2></div></div>${renderTimeline(c)}</div>`}else if(o===`drawings`){let i=(e.data.documents||[]).filter(e=>e.projectId===n.id&&!e.deletedAt),a=r.filter(e=>e.typeAr===`مخطط`||e.typeEn===`Drawing`||e.templateId),o=e.docTaskFilter||`all`,s=o===`all`?i:i.filter(e=>e.taskId===o);u=`
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 class="panel-title">${choose(`المخططات والمستندات الهندسية`,`Drawings & Documents`)}</h2>
            <p class="panel-subtitle">${choose(`جميع المخططات والملفات المرفوعة لهذا المشروع مع إمكانية الفلترة حسب المهمة والمعاينة الفورية.`,`All blueprints and files uploaded for this project, with task filtering and instant preview.`)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <!-- Filter by Task dropdown -->
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:12px;color:var(--ink-soft);">${choose(`المهمة:`,`Task:`)}</span>
              <select data-action="filter-project-docs-task" style="padding:6px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font-size:12px;max-width:200px;">
                <option value="all" ${o===`all`?`selected`:``}>${choose(`— جميع المهام —`,`— All Tasks —`)}</option>
                ${r.map(e=>`<option value="${esc(e.id)}" ${o===e.id?`selected`:``}>${esc(choose(e.titleAr,e.titleEn))}</option>`).join(``)}
              </select>
            </div>
            ${can(`create_tasks`)?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${esc(n.id)}">
                ${icon(`plus`,12)} ${choose(`إضافة مخرج / مخطط`,`Add Deliverable / Drawing`)}
              </button>
            `:``}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${icon(`document`,14)} ${choose(`الملفات والمخططات المرفوعة`,`Uploaded Files & Blueprints`)} (${s.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${choose(`اسم المخطط / الملف`,`Blueprint / File Name`)}</th>
                  <th>${t(`tasks`)}</th>
                  <th>${choose(`الحالة`,`Status`)}</th>
                  <th>${choose(`الحجم`,`Size`)}</th>
                  <th>${choose(`تاريخ الرفع`,`Upload Date`)}</th>
                  <th style="text-align:end;">${choose(`الإجراءات`,`Actions`)}</th>
                </tr>
              </thead>
              <tbody>
                ${s.length>0?s.map(e=>{let n=r.find(n=>n.id===e.taskId),i=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round((e.size||0)/1024)+` KB`;return`
                    <tr data-doc-id="${esc(e.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${esc(e.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${icon(`document`,15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(e.originalName)}">
                              ${esc(e.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${esc(e.mimeType||`application/octet-stream`)}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${n?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${esc(n.id)}">${esc(choose(n.titleAr,n.titleEn))}</span>`:`—`}
                      </td>
                      <td>
                        <span class="status-badge ${esc(e.status||`draft`)}" style="font-size:11px;">
                          ${esc(statusText(e.status||`draft`))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${i}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(e.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${esc(e.id)}" style="padding:5px;" title="${choose(`معاينة المخطط`,`Preview`)}">
                            ${icon(`eye`,14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${esc(e.id)}" style="padding:5px;color:var(--teal);" title="${choose(`نسخ الرابط`,`Copy Link`)}">
                            ${icon(`link`,14)}
                          </button>
                          <a href="/api/documents/${esc(e.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${choose(`تحميل`,`Download`)}">
                            ${icon(`download`,14)}
                          </a>
                        </div>
                      </td>
                    </tr>
                  `}).join(``):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${icon(`document`,20)}
                        <span>${choose(`لا توجد ملفات مرفوعة لهذه المهمة أو المشروع حتى الآن.`,`No files uploaded for this task/project yet.`)}</span>
                      </div>
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 2: Drawing Deliverable Tasks Summary -->
        <div>
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${icon(`checklist`,14)} ${choose(`مخرجات المخططات المجدولة`,`Scheduled Drawing Tasks`)} (${a.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${t(`taskTitle`)}</th>
                  <th>${t(`taskType`)}</th>
                  <th>${t(`status`)}</th>
                  <th>${t(`progress`)}</th>
                  <th>${t(`assignee`)}</th>
                </tr>
              </thead>
              <tbody>
                ${a.map(e=>`
                  <tr data-action="open-task" data-task-id="${esc(e.id)}" style="cursor:pointer;" title="${choose(`انقر لعرض وتعديل المهمة ورفع المخططات`,`Click to open task and manage files`)}">
                    <td><span class="table-title">${esc(choose(e.titleAr,e.titleEn))}</span><span class="table-sub">${esc(e.templateId||`CUSTOM`)}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${esc(choose(e.typeAr,e.typeEn)||choose(`مخطط`,`Drawing`))}</span></td>
                    <td><span class="status-badge ${esc(e.status)}">${esc(statusText(e.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${e.status===`done`?`var(--green)`:`var(--blue)`};width:${e.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${e.progress||0}%</span>
                      </div>
                    </td>
                    <td>${e.assignee?esc(choose(e.assignee.name,e.assignee.nameEn||e.assignee.name)):`—`}</td>
                  </tr>
                `).join(``)||`<tr><td colspan="5"><div class="empty">${t(`noTasks`)}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else o===`activity`&&(u=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`activity`)}</h2><p class="panel-subtitle">${choose(`كل تغيير مهم يبقى قابلًا للمراجعة.`,`Every important change remains reviewable.`)}</p></div></div>${renderAuditForProject(n.id)}</div>`);let d=n.manager||(e.data.users||[]).find(e=>e.id===n.managerId),f=qe(n.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${icon(e.lang===`ar`?`arrow`:`arrowLeft`,15)}</button>
        <div>
          <p class="eyebrow">${esc(n.code)} · ${n.demo?t(`sampleData`):t(`active`)}</p>
          <h1>${esc(choose(n.nameAr,n.nameEn))}</h1>
          <p>${esc(choose(n.descriptionAr||n.clientAr,n.descriptionEn||n.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${icon(`user`,12)} 
              <strong>${t(`manager`)}:</strong> ${esc(d?choose(d.name,d.nameEn||d.name):`—`)}
            </span>
            ${n.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${icon(`calendar`,12)} ${dateLabel(n.dueDate,!0)}
                ${f}
              </span>
            `:``}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${icon(`users`,12)}
              <span style="font-size:11px;">${t(`team`)}:</span>
              ${Ye(i,4,!0,a)}
            </span>
            <span class="status-badge ${esc(n.health)}">${esc(statusText(n.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${n.progress}%</strong>
        <span>${t(`weightedProgress`)}</span>
        ${can(`edit_projects`)||can(`create_projects`)||can(`delete_projects`)||can(`view_reports`)||isAdmin()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${icon(`more`,15)} ${choose(`خيارات`,`Options`)}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${e.lang===`ar`?`left:0`:`right:0`};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:180px;padding:5px;margin-top:5px;text-align:start">
              ${can(`edit_projects`)||isAdmin()?`<button class="menu-item" data-action="edit-project" data-project-id="${esc(n.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`edit`,14)} ${t(`edit`)}</button>`:``}
              ${can(`create_projects`)||isAdmin()?`<button class="menu-item" data-action="clone-project" data-project-id="${esc(n.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`document`,14)} ${choose(`استنساخ المشروع`,`Clone Project`)}</button>`:``}
              ${can(`export_reports`)||isAdmin()?`<button class="menu-item" data-action="export-project" data-project-id="${esc(n.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`document`,14)} ${choose(`تصدير التقرير (Excel)`,`Export Report (Excel)`)}</button>`:``}
              ${can(`delete_projects`)||isAdmin()?`<button class="menu-item" data-action="delete-project" data-project-id="${esc(n.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${icon(`trash`,14)} ${choose(`حذف المشروع`,`Delete Project`)}</button>`:``}
            </div>
          </div>
        `:``}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${o===`tasks`?`active`:``}" data-action="project-tab" data-tab="tasks">${t(`tasks`)}</button>
      <button class="detail-tab ${o===`overview`?`active`:``}" data-action="project-tab" data-tab="overview">${choose(`تفاصيل`,`Details`)}</button>
      <button class="detail-tab ${o===`timeline`?`active`:``}" data-action="project-tab" data-tab="timeline">${choose(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</button>
      <button class="detail-tab ${o===`drawings`?`active`:``}" data-action="project-tab" data-tab="drawings">${t(`drawings`)}</button>
      <button class="detail-tab ${o===`activity`?`active`:``}" data-action="project-tab" data-tab="activity">${t(`activity`)}</button>
    </div>
    
    ${u}
  `}function nt(n=[]){let r=e.data?.users||[];return n.map(e=>{let n=r.find(n=>n.id===e)||{name:e,id:e};return`
      <span class="chip-item" data-uid="${esc(e)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${avatar(n,`mini-avatar`)}
        <span style="font-weight:500;">${esc(choose(n.name,n.nameEn||n.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${esc(e)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${choose(`إزالة`,`Remove`)}">×</button>
      </span>
    `}).join(``)}function rt(n=null){let r=n?.code||`DARC-${String((e.data?.projects?.length||0)+1).padStart(3,`0`)}`,i=n?P(n).internalMembers.map(e=>e.id):[],a=i.length>0?i:[e.data?.user?.id].filter(Boolean),o=`
    <form id="project-form" data-project-id="${esc(n?.id||``)}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${esc(JSON.stringify(a))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${icon(`building`,14)} <span>${choose(`البيانات الأساسية للمشروع`,`Core Project Information`)}</span>
        </div>

        <div class="field full">
          <label>${t(`nameAr`)} *</label>
          <input name="nameAr" value="${esc(n?.nameAr||``)}" placeholder="${choose(`مثال: فيلا النخيل — التصميم الداخلي`,`e.g. Al Nakheel Villa — Interior Design`)}" required />
        </div>
        <div class="field">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(n?.nameEn||``)}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${t(`projectCode`)} *</label>
          <input name="code" value="${esc(r)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${t(`client`)}</label>
          <input name="clientAr" value="${esc(n?.clientAr||``)}" placeholder="${choose(`اسم العميل أو الجهة المالكة`,`Client or owning entity`)}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${icon(`calendar`,14)} <span>${choose(`الجدولة والإدارة`,`Management & Schedule`)}</span>
        </div>

        <div class="field full">
          <label>${t(`manager`)}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${choose(`— بدون تحديد —`,`— Unassigned —`)}</option>
            ${e.data.users.map(r=>`<option value="${esc(r.id)}" ${(n?n.managerId===r.id:e.data.user.id===r.id)?`selected`:``}>${esc(choose(r.name,r.nameEn||r.name))}</option>`).join(``)}
          </select>
        </div>
        <div class="field">
          <label>${choose(`أولوية المشروع`,`Project Priority`)}</label>
          <select name="priority">
            <option value="low" ${n?.priority===`low`||n?.customFields?.priority===`low`?`selected`:``}>${choose(`منخفضة`,`Low`)}</option>
            <option value="medium" ${!n||n?.priority===`medium`||n?.customFields?.priority===`medium`||!n?.priority?`selected`:``}>${choose(`متوسطة`,`Medium`)}</option>
            <option value="high" ${n?.priority===`high`||n?.customFields?.priority===`high`?`selected`:``}>${choose(`عالية`,`High`)}</option>
            <option value="urgent" ${n?.priority===`urgent`||n?.customFields?.priority===`urgent`?`selected`:``}>${choose(`حرجة / عاجلة`,`Urgent`)}</option>
          </select>
        </div>
        <div class="field">
          <label>${choose(`حالة المشروع`,`Project Status`)}</label>
          <select name="lifecycle">
            <option value="active" ${!n||n.lifecycle===`active`?`selected`:``}>${choose(`نشط (قيد التنفيذ)`,`Active (In Progress)`)}</option>
            <option value="planning" ${n?.lifecycle===`planning`?`selected`:``}>${choose(`تخطيط`,`Planning`)}</option>
            <option value="on_hold" ${n?.lifecycle===`on_hold`?`selected`:``}>${choose(`معلق / متوقف`,`On Hold`)}</option>
            <option value="completed" ${n?.lifecycle===`completed`?`selected`:``}>${choose(`مكتمل`,`Completed`)}</option>
            <option value="archived" ${n?.lifecycle===`archived`?`selected`:``}>${choose(`مؤرشف`,`Archived`)}</option>
          </select>
        </div>
        <div class="field">
          <label>${t(`startDate`)}</label>
          <input type="date" name="startDate" value="${esc(n?.startDate||``)}" />
        </div>
        <div class="field">
          <label>${t(`dueDate`)}</label>
          <input type="date" name="dueDate" value="${esc(n?.dueDate||``)}" />
        </div>

        <!-- 👥 القسم 3: أعضاء فريق المشروع والمشاركون -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${icon(`users`,14)} <span>${choose(`أعضاء فريق المشروع والمشاركون`,`Project Team Members & Collaborators`)}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose(`اختر من الفريق لإعطائهم حق الوصول للمشروع`,`Select team members who can access this project`)}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${a.length?`flex`:`none`};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${nt(a)}
          </div>

          <!-- حقل البحث والإضافة السريعة -->
          <div style="position:relative;display:flex;gap:6px;">
            <input type="text" id="project-member-search" placeholder="${choose(`ابحث عن عضو لإضافته لفريق المشروع...`,`Search team member to add to project team...`)}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          </div>

          <!-- القائمة المنسدلة للبحث والاختيار -->
          <div id="project-member-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
          </div>
        </div>

        <!-- 📝 القسم 4: نطاق المشروع والملاحظات -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${icon(`document`,14)} <span>${choose(`نطاق المشروع والملاحظات`,`Scope & Notes`)}</span>
        </div>

        <div class="field full">
          <label>${choose(`وصف ونطاق المشروع`,`Project Scope & Description`)}</label>
          <textarea name="descriptionAr" placeholder="${choose(`وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...`,`Brief description of scope, design criteria, and special notes...`)}">${esc(n?.descriptionAr||``)}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${n&&(can(`delete_projects`)||isAdmin())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${esc(n.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${choose(`حذف المشروع ونقله لسلة المهملات`,`Delete project and move to trash`)}">
              ${icon(`trash`,14)} ${choose(`حذف المشروع`,`Delete Project`)}
            </button>
          `:``}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
          <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${n?t(`save`):t(`create`)}</button>
        </div>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(n?choose(`تعديل بيانات المشروع`,`Edit Project`):t(`addProject`),choose(`إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.`,`Manage project details, schedule, and workflow health.`),o,`project`),setTimeout(()=>{let n=document.getElementById(`project-member-search`),r=document.getElementById(`project-member-dropdown`),i=document.getElementById(`project-members-chips-container`),o=document.getElementById(`project-members-input`),s=document.getElementById(`project-manager-select`);if(!n||!r||!i||!o)return;let c=[...a];function l(){i.innerHTML=nt(c),i.style.display=c.length?`flex`:`none`,o.value=JSON.stringify(c),i.querySelectorAll(`.btn-remove-project-member`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation();let r=e.dataset.uid;c=c.filter(e=>e!==r),l()})})}s&&s.addEventListener(`change`,()=>{let e=s.value;e&&!c.includes(e)&&(c.push(e),l())});function u(i=``){let a=i.toLowerCase().trim(),o=(e.data?.users||[]).filter(e=>!c.includes(e.id)&&(!a||e.name&&e.name.toLowerCase().includes(a)||e.nameEn&&e.nameEn.toLowerCase().includes(a)||e.email&&e.email.toLowerCase().includes(a)));o.length?(r.innerHTML=o.map(e=>`
          <div class="project-member-opt" data-uid="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${avatar(e,`mini-avatar`)}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${esc(choose(e.name,e.nameEn||e.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${esc(e.roleId||``)}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${choose(`إضافة`,`Add`)}</span>
          </div>
        `).join(``),r.querySelectorAll(`.project-member-opt`).forEach(e=>{e.addEventListener(`mouseenter`,()=>e.style.background=`var(--surface-soft)`),e.addEventListener(`mouseleave`,()=>e.style.background=`transparent`),e.addEventListener(`click`,()=>{let i=e.dataset.uid;i&&!c.includes(i)&&(c.push(i),l(),n.value=``,r.style.display=`none`)})})):r.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${choose(`لا يوجد أعضاء مطابقون`,`No matching members`)}</div>`,r.style.display=`block`}n.addEventListener(`focus`,()=>u(n.value)),n.addEventListener(`input`,()=>u(n.value)),document.addEventListener(`click`,e=>{!n.contains(e.target)&&!r.contains(e.target)&&(r.style.display=`none`)}),l()},50)}function it(n){let r=`
    <form id="clone-form" data-project-id="${n.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${choose(`أنت على وشك استنساخ المشروع:`,`You are about to clone the project:`)} <strong style="color:var(--ink)">${esc(choose(n.nameAr,n.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${t(`nameAr`)}</label>
          <input name="nameAr" value="${esc(n.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(n.nameEn)} (Copy)" required />
        </div>
      </div>
      
      <div class="field full">
        <label>${choose(`تاريخ التسليم المتوقع`,`Expected Due Date`)}</label>
        <input name="dueDate" type="date" value="${n.dueDate||``}" />
      </div>

      <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:20px;display:flex;flex-direction:column;gap:12px">
        <strong style="font-size:13px">${choose(`إعدادات النسخ المتقدمة`,`Advanced Clone Settings`)}</strong>
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneTasks" checked style="width:16px;height:16px;margin:0">
          ${choose(`نسخ جميع المهام والهيكلة (Tasks)`,`Clone all tasks & structure`)}
        </label>
        
        <div style="padding-${e.lang===`ar`?`right`:`left`}:26px">
          <label style="display:flex;align-items:center;gap:8px;font-weight:400;color:var(--ink-soft);cursor:pointer">
            <input type="checkbox" name="keepAssignees" style="width:14px;height:14px;margin:0">
            ${choose(`الاحتفاظ بالمسند إليهم (Keep Assignees)`,`Keep Task Assignees`)}
          </label>
        </div>
        
        <hr style="border:0;border-top:1px solid var(--border);margin:4px 0" />
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneMembers" checked style="width:16px;height:16px;margin:0">
          ${choose(`استنساخ أعضاء فريق العمل (Team)`,`Clone team members`)}
        </label>
      </div>
      
      <div class="modal-actions" style="margin-top:24px">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${icon(`document`,14)} ${choose(`استنساخ المشروع`,`Clone Project`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(choose(`استنساخ المشروع`,`Clone Project`),choose(`أداة إنشاء قوالب المشاريع السريعة`,`Rapid project templating tool`),r,`clone`);let i=document.getElementById(`clone-form`),a=i.querySelector(`input[name="cloneTasks"]`),o=i.querySelector(`input[name="keepAssignees"]`);a.addEventListener(`change`,e=>{o.disabled=!e.target.checked,e.target.checked||(o.checked=!1)}),i.addEventListener(`submit`,async r=>{r.preventDefault();let a=i.querySelector(`button[type="submit"]`);a.disabled=!0;try{let r={nameAr:i.nameAr.value,nameEn:i.nameEn.value,dueDate:i.dueDate.value,cloneTasks:i.cloneTasks.checked,keepAssignees:i.keepAssignees.checked,cloneMembers:i.cloneMembers.checked},a=await O(`/api/projects/${n.id}/clone`,{method:`POST`,body:JSON.stringify(r)});closeModal(),e.view=`project-detail`,e.activeProjectId=a.project.id,await refreshView(),showToast(choose(`تم استنساخ المشروع بنجاح.`,`Project cloned successfully.`))}catch(e){showToast(e.message,!0),a.disabled=!1}})}function at(n,r){let i=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: Arial, sans-serif; }
        td, th { border: 1px solid #333; padding: 6px; text-align: right; vertical-align: middle; }
        .title { font-size: 18px; font-weight: bold; background: #0d6269; color: #fff; text-align: center; }
        .subtitle { font-size: 14px; font-weight: bold; background: #eef2f2; text-align: center; }
        .meta { font-size: 12px; text-align: center; background: #f9fafa; }
        .header { font-weight: bold; background: #d4e0e0; text-align: center; }
      </style>
    </head>
    <body dir="${e.lang===`ar`?`rtl`:`ltr`}">
      ${r}
    </body>
    </html>
  `,a=new Blob([`﻿`+i],{type:`application/vnd.ms-excel;charset=utf-8;`}),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o,s.download=n+`.xls`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)}function ot(){let n=e.data?.projects||[];if(!n||!n.length){showToast(choose(`لا توجد بيانات لتصديرها.`,`No data to export.`),!0);return}let r=new Date().toLocaleDateString(e.lang===`ar`?`ar-SA`:`en-US`),i=`<table>`;i+=`<tr><td colspan="11" class="title">DARC Design Team</td></tr>`,i+=`<tr><td colspan="11" class="subtitle">${choose(`تقرير حالة مشاريع المحفظة`,`Portfolio Projects Report`)}</td></tr>`,i+=`<tr><td colspan="11" class="meta">${choose(`تاريخ الإصدار:`,`Generated on:`)} ${r}</td></tr>`,i+=`<tr><td colspan="11" style="border:none;"></td></tr>`,i+=`<tr class="header">
    <td>${choose(`كود المشروع`,`Code`)}</td>
    <td>${choose(`اسم المشروع (عربي)`,`Project Name (Ar)`)}</td>
    <td>${choose(`اسم المشروع (إنجليزي)`,`Project Name (En)`)}</td>
    <td>${choose(`العميل`,`Client`)}</td>
    <td>${choose(`مدير المشروع`,`Manager`)}</td>
    <td>${choose(`الحالة`,`Lifecycle`)}</td>
    <td>${choose(`الصحة`,`Health`)}</td>
    <td>${choose(`تاريخ البدء`,`Start Date`)}</td>
    <td>${choose(`تاريخ التسليم`,`Due Date`)}</td>
    <td>${choose(`نسبة الإنجاز`,`Progress %`)}</td>
    <td>${choose(`عدد أعضاء الفريق`,`Team Size`)}</td>
  </tr>`,n.forEach(e=>{let n=e.manager?choose(e.manager.name,e.manager.nameEn||e.manager.name):``;i+=`<tr>
      <td>${esc(e.code)}</td>
      <td>${esc(e.nameAr)}</td>
      <td>${esc(e.nameEn)}</td>
      <td>${esc(choose(e.clientAr,e.clientEn))}</td>
      <td>${esc(n)}</td>
      <td>${esc(statusText(e.lifecycle))}</td>
      <td>${esc(statusText(e.health))}</td>
      <td>${esc(e.startDate||``)}</td>
      <td>${esc(e.dueDate||``)}</td>
      <td>${e.progress||0}%</td>
      <td>${e.memberCount||0}</td>
    </tr>`}),i+=`</table>`,at(`DARC_Portfolio_Report_${new Date().toISOString().split(`T`)[0]}`,i),showToast(choose(`تم بدء تحميل التقرير.`,`Report download started.`)),O(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`report`,details:{title:choose(`تقرير حالة مشاريع المحفظة (Excel)`,`Portfolio Projects Report (Excel)`),count:n.length}})}).catch(()=>{})}function st(n){let r=(e.data?.projects||[]).find(e=>e.id===n);if(!r)return;let i=(e.data?.tasks||[]).filter(e=>e.projectId===n);if(!i.length){showToast(choose(`لا توجد مهام لهذا المشروع لتصديرها.`,`No tasks to export.`),!0);return}let a=new Date().toLocaleDateString(e.lang===`ar`?`ar-SA`:`en-US`),o=`<table>`;o+=`<tr><td colspan="8" class="title">DARC Design Team</td></tr>`,o+=`<tr><td colspan="8" class="subtitle">${choose(`تقرير مهام المشروع:`,`Project Tasks Report:`)} ${esc(choose(r.nameAr,r.nameEn))}</td></tr>`,o+=`<tr><td colspan="8" class="meta">${choose(`تاريخ الإصدار:`,`Generated on:`)} ${a}</td></tr>`,o+=`<tr><td colspan="8" style="border:none;"></td></tr>`,o+=`<tr class="header">
    <td>${choose(`المهمة (عربي)`,`Task (Ar)`)}</td>
    <td>${choose(`المهمة (إنجليزي)`,`Task (En)`)}</td>
    <td>${choose(`القسم`,`Category`)}</td>
    <td>${choose(`المسؤول`,`Assignee`)}</td>
    <td>${choose(`الحالة`,`Status`)}</td>
    <td>${choose(`تاريخ البدء`,`Start Date`)}</td>
    <td>${choose(`تاريخ التسليم`,`Due Date`)}</td>
    <td>${choose(`الإنجاز`,`Progress %`)}</td>
  </tr>`,i.forEach(n=>{let r=(e.data?.users||[]).find(e=>e.id===(n.assigneeId||n.assignee_id)),i=n.assignee?choose(n.assignee.name,n.assignee.nameEn||n.assignee.name):r?choose(r.name,r.nameEn||r.name):``;o+=`<tr>
      <td>${esc(n.titleAr)}</td>
      <td>${esc(n.titleEn)}</td>
      <td>${esc(choose(n.categoryAr,n.categoryEn))}</td>
      <td>${esc(i)}</td>
      <td>${esc(statusText(n.status))}</td>
      <td>${esc(n.startDate||``)}</td>
      <td>${esc(n.dueDate||``)}</td>
      <td>${n.progress||0}%</td>
    </tr>`}),o+=`</table>`,at(`DARC_Project_${r.code}_${new Date().toISOString().split(`T`)[0]}`,o),showToast(choose(`تم بدء تحميل التقرير.`,`Report download started.`)),O(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`project`,entityId:n,details:{title:choose(`تقرير مهام مشروع: ${r.nameAr}`,`Project Tasks Report: ${r.nameEn||r.nameAr}`),taskCount:i.length}})}).catch(()=>{})}var ct=i({TEMPLATE_CATEGORIES:()=>F,openTemplateModal:()=>ut,renderTemplates:()=>lt}),F=[{id:`architectural`,ar:`معماري`,en:`Architectural`,icon:`🏛️`},{id:`electrical`,ar:`كهرباء — إلكتروميكانيك`,en:`Electrical`,icon:`⚡`},{id:`plumbing`,ar:`سباكة — إلكتروميكانيك`,en:`Plumbing`,icon:`💧`},{id:`hvac`,ar:`تكييف — إلكتروميكانيك`,en:`HVAC`,icon:`🌡️`},{id:`fire`,ar:`حريق — إلكتروميكانيك`,en:`Fire Protection`,icon:`🧯`},{id:`low_current`,ar:`تيار خفيف`,en:`Low Current`,icon:`📡`},{id:`sections`,ar:`مقاطع`,en:`Sections`,icon:`✂️`},{id:`detail`,ar:`تفصيلي`,en:`Detailed`,icon:`🔍`},{id:`site`,ar:`موقع عام`,en:`Site Plan`,icon:`🗺️`},{id:`quantity`,ar:`جداول كميات`,en:`Quantity Tables`,icon:`📊`},{id:`documents`,ar:`وثائق وخطابات`,en:`Documents & Letters`,icon:`📄`}];function lt(){let n=e.searches.templates.trim().toLowerCase(),r=[...e.data.templates||[]].sort((e,n)=>(parseInt(e.code,10)||0)-(parseInt(n.code,10)||0)),i=new Map;F.forEach(e=>i.set(e.id,0)),r.forEach(e=>{i.set(e.categoryId,(i.get(e.categoryId)||0)+1)});let a=e.templateCategory||`all`,o=F.map(e=>{if(a!==`all`&&a!==e.id)return null;let i=r.filter(r=>r.categoryId===e.id?!n||`${r.nameAr} ${r.nameEn} ${r.code} ${r.typeAr} ${r.typeEn}`.toLowerCase().includes(n):!1);return i.length?{...e,items:i}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${E(`مخرجات DARC القياسية`,`DARC STANDARD DELIVERABLES`)}</p>
      <h1>${p(`templates`)}</h1>
      <p>${p(`standardLibrarySub`)}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${r.length} ${p(`templatesCount`)}</span>
      ${C(`manage_templates`)?`<button class="btn btn-primary" data-action="new-template" style="margin-${e.lang===`ar`?`right`:`left`}:10px">${_(`plus`,15)} ${E(`إضافة قالب`,`Add Template`)}</button>`:``}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${_(`search`,15)}
        <input data-search="templates" value="${w(e.searches.templates)}" placeholder="${p(`search`)}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${a===`all`?`active`:``}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${p(`all`)}</span>
        <small>${r.length}</small>
      </button>
      ${F.map(e=>`
        <button class="template-category-tab ${a===e.id?`active`:``}" data-action="template-category" data-category="${w(e.id)}">
          <span class="category-icon">${w(e.icon)}</span>
          <span>${w(E(e.ar,e.en))}</span>
          <small>${i.get(e.id)||0}</small>
        </button>
      `).join(``)}
    </aside>
    <div>
      ${o.length?o.map(n=>`
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${w(n.icon)}</span>
            <div>
              <h3>${w(E(n.ar,n.en))}</h3>
              <span>${n.items.length} ${p(`templatesCount`)}</span>
            </div>
          </div>
          <div class="template-grid">
            ${n.items.map(n=>`
              <article class="template-item" style="position:relative;cursor:${C(`manage_templates`)?`pointer`:`default`};" ${C(`manage_templates`)?`data-action="edit-template" data-template-id="${w(n.id)}"`:``}>
                <span class="template-number">${w(n.code)}</span>
                <div class="template-copy">
                  <strong>${w(E(n.nameAr,n.nameEn))}</strong>
                  <span>${w(e.lang===`ar`?n.nameEn:n.nameAr)}</span>
                </div>
                ${C(`manage_templates`)?`<button class="template-action" data-action="edit-template" data-template-id="${w(n.id)}" title="${p(`edit`)}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${e.lang===`ar`?`right`:`left`}:auto">${_(`edit`,14)}</button>`:``}
              </article>
            `).join(``)}
          </div>
        </section>
      `).join(``):`
        <section class="panel">
          <div class="empty">
            ${_(`layers`,18)}
            <span>${p(`noTasks`)}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function ut(e=null){if(!C(`manage_templates`))return a(p(`permissionDenied`),!0);let n=F.map(n=>`<option value="${w(n.id)}" ${e?.categoryId===n.id?`selected`:``}>${w(E(n.ar,n.en))}</option>`).join(``),i=`<form id="template-form" data-template-id="${w(e?.id||``)}">
    <div class="form-grid">
      <div class="field">
        <label>${p(`nameAr`)}</label>
        <input name="nameAr" value="${w(e?.nameAr||``)}" required />
      </div>
      <div class="field">
        <label>${p(`nameEn`)}</label>
        <input name="nameEn" value="${w(e?.nameEn||``)}" required />
      </div>
      <div class="field">
        <label>${E(`الرمز / الكود`,`Code`)}</label>
        <input name="code" value="${w(e?.code||``)}" placeholder="e.g. 01" />
      </div>
      <div class="field">
        <label>${E(`التصنيف`,`Category`)}</label>
        <select name="categoryId" required>${n}</select>
      </div>
      <div class="field">
        <label>${E(`النوع (عربي)`,`Type (Ar)`)}</label>
        <input name="typeAr" value="${w(e?.typeAr||`مخطط`)}" required />
      </div>
      <div class="field">
        <label>${E(`النوع (إنجليزي)`,`Type (En)`)}</label>
        <input name="typeEn" value="${w(e?.typeEn||`Drawing`)}" required />
      </div>
      <div class="field">
        <label>${E(`الوزن الافتراضي`,`Default Weight`)}</label>
        <input name="defaultWeight" type="number" min="1" value="${e?.defaultWeight||1}" required />
      </div>
      <div class="field">
        <label>${E(`المدة الافتراضية (أيام)`,`Default Duration (Days)`)}</label>
        <input name="defaultDuration" type="number" min="1" value="${e?.defaultDuration||5}" required />
      </div>
    </div>
    <div class="modal-actions" style="display:flex;justify-content:space-between;width:100%">
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${w(e.id)}" style="color:var(--red)">${_(`trash`,14)} ${p(`delete`)}</button>`:`<div></div>`}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${p(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${_(`check`,14)} ${p(e?`save`:`create`)}</button>
      </div>
    </div>
  </form>`;document.getElementById(`modal-root`).innerHTML=r(e?E(`تعديل قالب`,`Edit Template`):E(`إضافة قالب جديد`,`Add New Template`),E(`القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.`,`Templates help the team insert tasks quickly with standard criteria.`),i,`template`)}var dt=i({openUploadDrawingModal:()=>pt,renderDocuments:()=>ft});function ft(){let n=e.data?.documents||[],r=e.data?.projects||[],i=e.data?.tasks||[],a=(e.searches?.documents||``).trim().toLowerCase(),o=e.docProjectFilter||`all`,s=e.data?.user?.id,c=T(),l=c||C(`review_tasks`)||C(`approve_tasks`)||C(`edit_tasks`),u=new Set(i.filter(e=>!e.deletedAt).map(e=>e.id)),d=new Set(r.filter(e=>!e.deletedAt).map(e=>e.id)),f=n.filter(e=>!(e.deletedAt||e.taskId&&!u.has(e.taskId)||e.projectId&&!d.has(e.projectId)||o!==`all`&&e.projectId!==o||a&&!(e.originalName||``).toLowerCase().includes(a))).sort((e,n)=>new Date(n.createdAt||0)-new Date(e.createdAt||0)),h=f.reduce((e,n)=>e+(n.size||0),0),g=h>1073741824?(h/1073741824).toFixed(1)+` GB`:h>1048576?(h/1048576).toFixed(1)+` MB`:Math.round(h/1024)+` KB`;return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${E(`مركز المخرجات والمخططات الهندسية`,`DELIVERABLES & BLUEPRINTS CENTER`)}</p>
        <h2>${p(`documents`)}</h2>
        <p class="intro">${E(`إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.`,`Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.`)}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${C(`upload_documents`)||c?`
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${_(`upload`,14)}
            <span>${E(`رفع مخطط / ملف جديد`,`Upload Drawing / File`)}</span>
          </button>
        `:``}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${E(`الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة`,`Go to trash bin to review and restore deleted files and projects`)}">
          ${_(`trash`,14)}
          <span>${E(`سلة المهملات`,`Trash`)}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${f.length} ${E(`مخطط / ملف`,`drawings`)} (${g})
        </span>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="filters-bar" style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;align-items:center;">
      <div class="search-input" style="flex:1;min-width:240px;position:relative;">
        <input 
          type="search" 
          placeholder="${E(`بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...`,`Search by drawing name, code, or format (DWG, PDF, RVT)...`)}" 
          value="${w(e.searches?.documents||``)}" 
          data-action="search-documents" 
          style="width:100%;padding:9px 12px;padding-inline-start:34px;background:var(--surface);border:1px solid var(--line);border-radius:10px;font-size:13px;"
        />
        <span style="position:absolute;inset-inline-start:10px;top:50%;transform:translateY(-50%);color:var(--ink-soft);pointer-events:none;">
          ${_(`search`,15)}
        </span>
      </div>

      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:12px;color:var(--ink-soft);">${E(`المشروع:`,`Project:`)}</span>
        <select data-action="doc-project-filter" style="padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);font-size:12px;min-width:180px;">
          <option value="all" ${o===`all`?`selected`:``}>${E(`— جميع المشاريع —`,`— All Projects —`)}</option>
          ${r.map(e=>`<option value="${w(e.id)}" ${o===e.id?`selected`:``}>${w(e.code)} - ${w(E(e.nameAr,e.nameEn))}</option>`).join(``)}
        </select>
      </div>
    </div>

    <!-- Documents Table -->
    <div class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${E(`المخطط / المخرج الهندسي`,`Drawing / Deliverable`)}</th>
              <th>${p(`projects`)}</th>
              <th>${p(`tasks`)}</th>
              <th>${E(`الإصدار`,`Revision`)}</th>
              <th>${E(`الحالة الهندسية`,`Status`)}</th>
              <th>${E(`الحجم`,`Size`)}</th>
              <th>${E(`تاريخ الرفع`,`Upload Date`)}</th>
              <th style="text-align:end;">${E(`الإجراءات`,`Actions`)}</th>
            </tr>
          </thead>
          <tbody>
            ${f.length>0?f.map(e=>{let n=r.find(n=>n.id===e.projectId),a=i.find(n=>n.id===e.taskId),o=x(e.originalName,e.mimeType),u=ee(e.originalName),d=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round((e.size||0)/1024)+` KB`,f=c||C(`delete_documents`)||e.uploaderId===s;return`
                <tr data-doc-id="${w(e.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${w(e.id)}">
                      <span class="file-format-badge" style="background:${o.bg};color:${o.color};border:1px solid ${o.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${o.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${w(e.originalName)}">
                          ${w(e.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${o.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${n?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${w(n.id)}">${w(n.code)}</span>`:`—`}
                  </td>
                  <td>
                    ${a?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${w(a.id)}">${w(E(a.titleAr,a.titleEn))}</span>`:`<span style="color:var(--muted);font-size:11px;">مخطط عام</span>`}
                  </td>
                  <td>
                    ${u?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${u}
                      </span>
                    `:`<span style="font-size:11px;color:var(--muted);">V1</span>`}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${l?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${w(e.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${e.status===`draft`?`selected`:``}>📝 ${E(`مسودة عمل`,`Draft`)}</option>
                          <option value="review" ${e.status===`review`?`selected`:``}>🔍 ${E(`قيد المراجعة`,`Review`)}</option>
                          <option value="approved" ${e.status===`approved`?`selected`:``}>✅ ${E(`معتمد للتنفيذ`,`Approved`)}</option>
                          <option value="superseded" ${e.status===`superseded`?`selected`:``}>⏳ ${E(`مستبدل بنسخة أحدث`,`Superseded`)}</option>
                        </select>
                      `:`
                        <span class="status-badge ${w(e.status||`draft`)}" style="font-size:11px;">
                          ${w(v(e.status||`draft`))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${d}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${m(e.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${w(e.id)}" style="padding:5px;" title="${E(`معاينة`,`Preview`)}">
                        ${_(`eye`,14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${w(e.id)}" style="padding:5px;color:var(--teal);" title="${E(`نسخ الرابط`,`Copy Link`)}">
                        ${_(`link`,14)}
                      </button>
                      <a href="/api/documents/${w(e.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${E(`تحميل`,`Download`)}">
                        ${_(`download`,14)}
                      </a>
                      ${f?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${w(e.id)}" style="padding:5px;color:var(--red);" title="${E(`نقل لسلة المهملات`,`Move to trash`)}">
                          ${_(`trash`,14)}
                        </button>
                      `:``}
                    </div>
                  </td>
                </tr>
              `}).join(``):`
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${_(`document`,24)}
                    <span>${E(`لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.`,`No drawings or documents found matching the criteria.`)}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function pt(n=null){let i=e.data?.projects||[],a=n||i[0]?.id||``,s=e.data?.tasks?.filter(e=>e.projectId===a&&!e.deletedAt)||[],c=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${E(`المشروع المستهدف *`,`Target Project *`)}</label>
          <select id="drawing-upload-project" class="filter-select" style="width:100%;height:38px;" required>
            ${i.map(e=>`<option value="${w(e.id)}" ${e.id===a?`selected`:``}>${w(e.code)} - ${w(E(e.nameAr,e.nameEn))}</option>`).join(``)}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${E(`المهمة الهندسية (اختياري)`,`Engineering Task (Optional)`)}</label>
          <select id="drawing-upload-task" class="filter-select" style="width:100%;height:38px;">
            <option value="">${E(`— مخطط عام لكامل المشروع —`,`— General Project Drawing —`)}</option>
            ${s.map(e=>`<option value="${w(e.id)}">${w(E(e.titleAr,e.titleEn))}</option>`).join(``)}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${E(`التخصص الهندسي`,`Engineering Discipline`)}</label>
          <select id="drawing-upload-discipline" class="filter-select" style="width:100%;height:38px;">
            <option value="معماري">🏛️ ${E(`معماري (Architectural)`,`Architectural`)}</option>
            <option value="إنشائي">🏗️ ${E(`إنشائي (Structural)`,`Structural`)}</option>
            <option value="كهرباء">⚡ ${E(`كهرباء (Electrical)`,`Electrical`)}</option>
            <option value="ميكانيك وتكييف">🌡️ ${E(`ميكانيك وتكييف (HVAC)`,`HVAC`)}</option>
            <option value="سباكة وصحي">💧 ${E(`سباكة وصحي (Plumbing)`,`Plumbing`)}</option>
            <option value="مخرجات ثلاثية الأبعاد">📐 ${E(`3D / BIM (Revit/SketchUp)`,`3D / BIM`)}</option>
            <option value="عام">📁 ${E(`مستندات عامة ومواصفات`,`General Specs`)}</option>
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${E(`الحالة الهندسية المبدئية`,`Initial Approval Status`)}</label>
          <select id="drawing-upload-status" class="filter-select" style="width:100%;height:38px;">
            <option value="draft">📝 ${E(`مسودة عمل (Draft)`,`Draft`)}</option>
            <option value="review" selected>🔍 ${E(`قيد المراجعة الفنية (Under Review)`,`Under Review`)}</option>
            <option value="approved">✅ ${E(`معتمد للتنفيذ (Approved for Construction)`,`Approved for Construction`)}</option>
          </select>
        </div>
      </div>

      <!-- File Upload Dropzone -->
      <div class="field">
        <label style="font-size:12px;font-weight:700;">${E(`الملفات والمخططات *`,`Drawings & Files *`)}</label>
        <div id="drawing-dropzone" style="border:2px dashed var(--line);border-radius:12px;padding:24px 16px;text-align:center;background:var(--surface);cursor:pointer;transition:border-color 0.2s;">
          <div style="color:var(--teal);margin-bottom:8px;">${_(`upload`,28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${E(`اسحب وأفلت المخططات هنا أو انقر للاختيار`,`Drag & drop drawings here or click to browse`)}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${E(`يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)`,`Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)`)}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${E(`إلغاء`,`Cancel`)}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${_(`upload`,14)} <span>${E(`بدء الرفع المباشر`,`Start Resumable Upload`)}</span>
        </button>
      </div>
    </form>
  `,l=document.getElementById(`modal-root`);if(l){l.innerHTML=r(E(`رفع مخطط أو مخرج هندسي جديد`,`Upload Architectural Deliverable / Drawing`),E(`رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.`,`Upload CAD, BIM, and PDF files with revision numbering and discipline tagging.`),c,`upload-drawing`,`modal-lg`);let n=document.getElementById(`drawing-upload-project`),i=document.getElementById(`drawing-upload-task`);n&&i&&n.addEventListener(`change`,()=>{let r=n.value,a=e.data?.tasks?.filter(e=>e.projectId===r&&!e.deletedAt)||[];i.innerHTML=`<option value="">${E(`— مخطط عام لكامل المشروع —`,`— General Project Drawing —`)}</option>`+a.map(e=>`<option value="${w(e.id)}">${w(E(e.titleAr,e.titleEn))}</option>`).join(``)});let a=document.getElementById(`drawing-dropzone`),s=document.getElementById(`drawing-file-input`),u=document.getElementById(`drawing-selected-files-list`),d=document.getElementById(`start-drawing-upload-btn`),f=[],p=()=>{f.length?(d.disabled=!1,u.innerHTML=f.map((e,n)=>{let r=x(e.name,e.type),i=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round(e.size/1024)+` KB`;return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${r.bg};color:${r.color};border:1px solid ${r.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${r.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${w(e.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${i})</span>
            </div>
            <button type="button" data-file-remove="${n}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(``),u.querySelectorAll(`[data-file-remove]`).forEach(e=>{e.addEventListener(`click`,n=>{let r=parseInt(e.dataset.fileRemove);f.splice(r,1),p()})})):(u.innerHTML=``,d.disabled=!0)};a&&s&&(a.addEventListener(`click`,()=>s.click()),s.addEventListener(`change`,()=>{s.files?.length&&(f=Array.from(s.files),p())}),a.addEventListener(`dragover`,e=>{e.preventDefault(),a.style.borderColor=`var(--teal)`}),a.addEventListener(`dragleave`,()=>{a.style.borderColor=`var(--line)`}),a.addEventListener(`drop`,e=>{e.preventDefault(),a.style.borderColor=`var(--line)`,e.dataTransfer?.files?.length&&(f=Array.from(e.dataTransfer.files),p())}));let m=document.getElementById(`upload-drawing-form`);m&&m.addEventListener(`submit`,async e=>{if(e.preventDefault(),!f.length)return;let r=n.value,a=i.value||null,s=document.getElementById(`drawing-upload-discipline`)?.value||`عام`,c=document.getElementById(`drawing-upload-status`)?.value||`draft`;if(o(),typeof window.uploadDirectFiles==`function`)window.uploadDirectFiles({files:f,projectId:r,taskId:a,discipline:s,status:c});else{let{uploadDirectFiles:e}=await D(async()=>{let{uploadDirectFiles:e}=await Promise.resolve().then(()=>Lt);return{uploadDirectFiles:e}},void 0);e({files:f,projectId:r,taskId:a,discipline:s,status:c})}})}}var mt=i({FULL_PERMISSIONS_CATALOG:()=>xt,openRoleModal:()=>St,openUserModal:()=>Ct,renderAuditForProject:()=>gt,renderSettings:()=>bt,renderTeam:()=>ht,renderUserActivityCell:()=>_t});function ht(){if(!isAdmin()&&!can(`manage_users`))return`<section class="panel"><div class="empty">${icon(`alert`,18)}<span>${choose(`غير مصرح لك بعرض هذه الصفحة.`,`You are not authorized to view this page.`)}</span></div></section>`;let n=e.data?.user?.id,r=(e.data?.users||[]).filter(e=>e.status!==`inactive`);return r=n===`usr_ahmad`?[...r].sort((e,n)=>e.id===`usr_ahmad`?-1:+(n.id===`usr_ahmad`)):r.filter(e=>e.id!==`usr_ahmad`),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${choose(`الأشخاص والمسؤوليات`,`PEOPLE & OWNERSHIP`)}</p>
        <h1>${t(`team`)}</h1>
        <p>${choose(`كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.`,`Every member has a clear role, responsibility, and next action.`)}</p>
      </div>
      <div class="page-actions">
        ${isAdmin()||can(`manage_users`)?`<button class="btn btn-primary" data-action="new-user">${icon(`plus`,15)} ${t(`addMember`)}</button>`:``}
      </div>
    </div>
    <div class="team-grid">
      ${r.map(n=>{let r=teamMetrics(n.id,e.data?.tasks||[]),i=n.id===`usr_ahmad`;return`
          <article class="member-card ${i?`system-developer-card`:``}" style="${i?`border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);`:``}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${avatar(n,`avatar-lg`)}
                <div class="member-card-person-copy">
                  <strong>${esc(choose(n.name,n.nameEn||n.name))}</strong>
                  <span>${esc(choose(n.jobTitleAr||(i?`المبرمج / مدير النظام`:``),n.jobTitleEn||n.jobTitleAr||``))}</span>
                </div>
              </div>
              ${i?`<span class="stealth-dev-badge">${icon(`shield`,12)} ${choose(`مدير ومطور النظام`,`Super Admin & Dev`)}</span>`:canManageAccountPermissions()&&n.id!==e.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${esc(n.id)}">${icon(`more`,15)}</button>`:``}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${n.status===`active`?`done`:`not_started`}">${esc(roleName(n))}</span>
            </div>
            <div class="member-card-stats">
              <span>${t(`progress`)} <strong>${r.progress}%</strong></span>
              <span>${r.tasks} ${t(`tasks`)}</span>
            </div>
            <div class="member-email">${n.email?esc(n.email):t(`noEmail`)}</div>
          </article>
        `}).join(``)}
    </div>
  `}function gt(n){let r=(e.data?.auditLogs||[]).filter(e=>e.details?.projectId===n||e.entityType===`project`&&e.entityId===n);return r.length?`<div class="audit-list">${r.map(e=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${esc(e.user?choose(e.user.name,e.user.nameEn||e.user.name):`DARC`)} · ${esc(e.action)}</strong><span>${esc(e.entityType)} · ${dateLabel(e.createdAt,!0)}</span></div></div>`).join(``)}</div>`:`<div class="empty">${icon(`check`,18)}<span>${choose(`لا توجد تغييرات مسجلة بعد.`,`No changes recorded yet.`)}</span></div>`}function _t(n){let r=n.lastActiveAt||n.customFields?.lastActiveAt,i=n.lastLoginAt||n.customFields?.lastLoginAt;if(!r&&!i)return`<span class="activity-never">${choose(`لم يسجل دخول بعد`,`Never logged in`)}</span>`;let a=Date.now(),o=r?new Date(r).getTime():0,s=n.id===e.data?.user?.id?0:o&&!isNaN(o)?Math.floor((a-o)/6e4):999999,c=s>=0&&s<=5,l=``;if(c)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${choose(`نشط الآن`,`Online`)}</span>`;else if(s<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${choose(`منذ ${s} دقيقة`,`${s}m ago`)}</span>`;else if(s<1440){let e=Math.floor(s/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${choose(`منذ ${e} ساعة`,`${e}h ago`)}</span>`}else o>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(r,!1)}</span>`);let u=i?`<span class="activity-sub" title="${esc(i)}">${choose(`دخول:`,`Login:`)} ${dateLabel(i,!0)}</span>`:``;return`<div class="activity-wrapper">${l}${u}</div>`}function vt(n){if(!n)return{date:`—`,time:`—`};try{let r=new Date(n);return isNaN(r.getTime())?{date:n,time:``}:{date:new Intl.DateTimeFormat(e.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`short`,day:`numeric`}).format(r),time:new Intl.DateTimeFormat(e.lang===`ar`?`ar-SA`:`en-US`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!0}).format(r)}}catch{return{date:n,time:``}}}function yt(e){let n=e.action||``,r=e.entityType||e.entity_type||``,i=e.details||{},a=`badge-neutral`,o=n,s=r;n===`login`?(a=`badge-teal`,o=choose(`تسجيل دخول`,`Sign In`),s=choose(`جلسة نظام`,`System Session`)):n===`create`?(a=`badge-mint`,o=choose(`إنشاء جديد`,`Created`)):n===`update`?(a=`badge-blue`,o=choose(`تعديل بيانات`,`Updated`)):n===`delete`?(a=`badge-red`,o=choose(`نقل للمهملات`,`Moved to Trash`)):n===`status_change`?(a=`badge-amber`,o=choose(`تغيير حالة`,`Status Changed`)):n===`export_report`?(a=`badge-teal`,o=choose(`تصدير تقرير`,`Exported Report`)):n===`restore`?(a=`badge-mint`,o=choose(`استعادة`,`Restored`)):n===`purge`?(a=`badge-danger`,o=choose(`حذف نهائي`,`Purged`)):n===`invite`&&(a=`badge-blue`,o=choose(`دعوة مستخدم`,`Invite Sent`)),r===`task`?s=choose(`مهمة`,`Task`):r===`project`?s=choose(`مشروع`,`Project`):r===`document`?s=choose(`مستند`,`Document`):r===`user`?s=choose(`مستخدم`,`User`):r===`report`?s=choose(`تقرير`,`Report`):r===`role`&&(s=choose(`دور وصلاحيات`,`Role`));let c=`—`;return i.title||i.name?c=`<strong>${esc(i.title||i.name)}</strong>`:n===`status_change`&&(i.oldStatus||i.newStatus)?c=`<span>${esc(statusText(i.oldStatus))} ➔ <strong>${esc(statusText(i.newStatus))}</strong></span>`:e.entityId&&(c=`<code style="font-size:11px;color:var(--muted);">${esc(e.entityId)}</code>`),{badgeClass:a,actionLabel:o,entityLabel:s,detailHtml:c}}function bt(){let n=e.data?.user?.id,r=isAdmin(),i=r||can(`manage_users`)||can(`view_user_activity`),a=[[`profile`,choose(`الملف الشخصي`,`Profile`)],...r||can(`manage_settings`)?[[`company`,t(`company`)]]:[],...r||can(`manage_roles`)?[[`roles`,t(`roles`)]]:[],...i?[[`accounts`,t(`accounts`)]]:[],[`security`,choose(`الأمان`,`Security`)],[`trash`,choose(`سلة المهملات`,`Trash`)],...r||can(`view_audit_logs`)?[[`audit`,t(`audit`)]]:[]];a.some(([n])=>n===e.settingsSection)||(e.settingsSection=`profile`);let o=e.data?.user||{},s=``;if(e.settingsSection===`profile`&&(s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${choose(`الملف الشخصي`,`Profile`)}</h2>
            <p>${choose(`إدارة صورتك الشخصية وبيانات حسابك في النظام.`,`Manage your profile picture and account information.`)}</p>
          </div>
        </div>

        <div class="profile-avatar-card">
          <label for="user-avatar-file-input" class="avatar-upload-trigger" id="profile-avatar-preview" role="button" tabindex="0" title="${choose(`انقر لرفع صورة شخصية جديدة`,`Click to upload a new profile picture`)}">
            <div class="avatar-upload-circle">
              ${o.avatarUrl?`<img src="${esc(o.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(o.avatarColor||``)?o.avatarColor:`#0d6269`};">${esc(initials(o))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(o.avatarColor||``)?o.avatarColor:`#0d6269`};">${esc(initials(o))}</div>`}
              <div class="avatar-upload-overlay">
                ${icon(`upload`,18)}
                <span>${choose(`تغيير`,`Change`)}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${esc(choose(o.name,o.nameEn||o.name))}</h3>
            <p class="profile-user-role">${esc(choose(o.jobTitleAr||``,o.jobTitleEn||o.jobTitleAr||``))} · <span class="status-badge done">${esc(roleName(o))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${icon(`upload`,14)} ${choose(`رفع صورة جديدة`,`Upload new avatar`)}
              </label>
              <span class="upload-hint">${choose(`يدعم JPG, PNG, WebP (حد أقصى 2MB)`,`Supports JPG, PNG, WebP (Max 2MB)`)}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${t(`nameAr`)}</label>
              <input name="name" value="${esc(o.name||``)}" required />
            </div>
            <div class="field">
              <label>${t(`nameEn`)}</label>
              <input name="nameEn" value="${esc(o.nameEn||``)}" />
            </div>
            <div class="field">
              <label>${t(`jobTitle`)} (${choose(`عربي`,`AR`)})</label>
              <input name="jobTitleAr" value="${esc(o.jobTitleAr||``)}" />
            </div>
            <div class="field">
              <label>${t(`jobTitle`)} (${choose(`إنجليزي`,`EN`)})</label>
              <input name="jobTitleEn" value="${esc(o.jobTitleEn||``)}" />
            </div>
            <div class="field full">
              <label>${t(`email`)}</label>
              <input value="${esc(o.email||``)}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${choose(`نظام التقويم المفضل في المنصة`,`Preferred Calendar System`)}</label>
              <select name="calendarSystem" class="input">
                <option value="gregorian" ${h()===`gregorian`?`selected`:``}>${choose(`ميلادي — اليوم / الشهر / السنة (مثال: 07/09/2026)`,`Gregorian — Day / Month / Year (e.g. 07/09/2026)`)}</option>
                <option value="hijri" ${h()===`hijri`?`selected`:``}>${choose(`هجري أم القرى — اليوم / الشهر / السنة (مثال: 25/02/1448 هـ)`,`Hijri Umm al-Qura — Day / Month / Year (e.g. 25/02/1448 AH)`)}</option>
              </select>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${t(`save`)}</button>
          </div>
        </form>
      </section>
    `),e.settingsSection===`company`&&(r||can(`manage_settings`))){let n=e.data?.company||{};s=`
      <section class="setting-section">
        <h2>${t(`company`)}</h2>
        <p>${choose(`هوية مساحة العمل وشعار الشركة واللغة الافتراضية.`,`Workspace identity, company logo, and default language.`)}</p>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${choose(`انقر لرفع وتعديل شعار الشركة`,`Click to upload and change company logo`)}">
            <div class="logo-upload-box">
              ${n.logoUrl?`<img src="${esc(n.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${icon(`building`,24)}</span>`:`<span class="brand-mark">${icon(`building`,24)}</span>`}
              <div class="logo-upload-overlay">
                ${icon(`upload`,16)}
                <span>${choose(`تعديل`,`Edit`)}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${esc(n.name||`DARC Design Team`)}</strong>
            <span class="company-sub">${choose(`العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض`,`Arabic default · English support · Riyadh timezone`)}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${icon(`upload`,14)} ${choose(`رفع وتعديل الشعار`,`Upload & Change Logo`)}
              </label>
              <span class="upload-hint">${choose(`يدعم PNG, SVG, JPG (حد أقصى 2MB)`,`Supports PNG, SVG, JPG (Max 2MB)`)}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company">
          <div class="form-grid">
            <div class="field">
              <label>${t(`nameAr`)}</label>
              <input name="nameAr" value="${esc(n.nameAr||``)}" required />
            </div>
            <div class="field">
              <label>${t(`nameEn`)}</label>
              <input name="nameEn" value="${esc(n.nameEn||``)}" />
            </div>
            <div class="field full">
              <label>${t(`emailStatus`)}</label>
              <input value="${esc(e.data?.emailConfigured?t(`emailConfigured`):t(`emailNotConfigured`))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:15px;">
            <button type="submit" class="btn btn-primary">${t(`save`)}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:12px;">${icon(`info`,16)}<span>${t(`emailInfo`)}</span></div>
      </section>
      <section class="setting-section">
        <h2>${choose(`نموذج الإنجاز`,`Progress model`)}</h2>
        <p>${t(`weightedExplanation`)}</p>
        <div class="report-stat-list">
          <div class="report-stat"><span>${t(`weightedProgress`)}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${t(`simpleProgress`)}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(e.settingsSection===`security`&&(s=`
      <section class="setting-section">
        <h2>${choose(`الأمان`,`Security`)}</h2>
        <p>${choose(`تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.`,`Change your password or sign out from all devices.`)}</p>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${choose(`كلمة المرور الحالية`,`Current password`)}</label><input type="password" name="oldPassword" required /></div>
            <div class="field"><label>${choose(`كلمة المرور الجديدة`,`New password`)}</label><input type="password" name="newPassword" minlength="10" required /></div>
          </div>
          <div class="form-actions" style="margin-top:15px"><button type="submit" class="btn btn-primary">${t(`save`)}</button></div>
        </form>
        <hr style="margin:30px 0;border:0;border-top:1px solid var(--border)">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <h3 style="font-size:14px;margin-bottom:4px">${choose(`تسجيل الخروج من كل الأجهزة`,`Sign out of all devices`)}</h3>
            <p style="color:var(--muted);font-size:13px">${choose(`إنهاء كافة الجلسات النشطة على كل المتصفحات.`,`End all active sessions on all browsers.`)}</p>
          </div>
          <button class="btn btn-danger btn-sm" data-action="logout-all">${choose(`تسجيل خروج للكل`,`Sign out all`)}</button>
        </div>
      </section>
    `),e.settingsSection===`accounts`&&i){let r=isAdmin()||can(`view_user_activity`),i=isAdmin()||can(`manage_users`),a=isAdmin()||can(`manage_existing_account_permissions`)||can(`manage_users`),o=isAdmin(),c=e.data?.users||[];n!==`usr_ahmad`&&(c=c.filter(e=>e.id!==`usr_ahmad`)),s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t(`accounts`)}</h2>
            <p>${choose(`الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.`,`Current accounts and each member’s access. Add, edit, or deactivate them here.`)}</p>
          </div>
          ${i?`<button class="btn btn-primary btn-sm" data-action="new-user">${icon(`plus`,14)} ${t(`addMember`)}</button>`:``}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t(`team`)}</th>
                <th>${t(`role`)}</th>
                <th>${t(`email`)}</th>
                <th>${t(`accountStatus`)}</th>
                ${r?`<th>${choose(`آخر ظهور ونشاط`,`Last Seen & Activity`)}</th>`:``}
                ${a?`<th></th>`:``}
              </tr>
            </thead>
            <tbody>
              ${c.map(n=>{let i=n.id===`usr_ahmad`;return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${avatar(n)}
                        <div class="team-member-copy">
                          <strong>${esc(choose(n.name,n.nameEn||n.name))}</strong>
                          <span>${esc(choose(n.jobTitleAr||(i?`المبرمج / مدير النظام`:``),n.jobTitleEn||n.jobTitleAr||``))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${i?`<span class="stealth-dev-badge">${icon(`shield`,12)} ${choose(`مدير ومطور النظام`,`Super Admin & Dev`)}</span>`:esc(roleName(n))}
                    </td>
                    <td>${n.email?esc(n.email):`<span style="color:var(--muted)">${t(`noEmail`)}</span>`}</td>
                    <td>
                      <span class="status-badge ${n.status===`active`?`done`:`not_started`}">${n.status===`active`?t(`activeAccount`):t(`pendingAccount`)}</span>
                    </td>
                    ${r?`
                      <td>
                        ${_t(n)}
                      </td>
                    `:``}
                    ${a?`
                      <td>
                        <div class="role-actions">
                          ${i?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(n.id)}">${t(`edit`)}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(n.id)}">${t(`edit`)}</button>
                            ${n.id===e.data?.user?.id?``:`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${esc(n.id)}" title="${n.status===`pending`?choose(`تفعيل الحساب يدوياً`,`Activate manually`):choose(`تغيير كلمة المرور`,`Change password`)}">${icon(n.status===`pending`?`check`:`settings`,13)}</button>
                              ${o?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${esc(n.id)}" title="دخول كـ هذا الحساب">${icon(`user`,13)}</button>`:``}
                            `}
                            ${n.id!==e.data?.user?.id&&n.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${esc(n.id)}">${icon(`send`,13)}</button>`:``}
                            ${n.id===e.data?.user?.id?``:`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${esc(n.id)}">${icon(`trash`,13)}</button>`}
                          `}
                        </div>
                      </td>
                    `:``}
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </section>
    `}if(e.settingsSection===`roles`&&(r||can(`manage_roles`))&&(s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t(`roles`)}</h2>
            <p>${choose(`إدارة الأدوار وصلاحيات الوصول للنظام.`,`Manage roles and access permissions across the system.`)}</p>
          </div>
          ${r||can(`manage_roles`)?`<button class="btn btn-primary btn-sm" data-action="new-role">${icon(`plus`,14)} ${t(`addRole`)}</button>`:``}
        </div>
        <div class="role-list">
          ${(e.data?.roles||[]).map(e=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${esc(choose(e.nameAr,e.nameEn))}</strong>
                  ${e.builtIn?`<span class="role-system-badge">${icon(`shield`,11)} ${t(`builtIn`)}</span>`:``}
                </div>
                <p class="role-desc">${esc(choose(e.descriptionAr,e.descriptionEn))}</p>
                <div class="role-meta">${e.permissions.includes(`*`)?choose(`صلاحية كاملة`,`Full access`):`${e.permissions.length} ${t(`permissionCount`)}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${esc(e.id)}">${icon(`edit`,13)} ${t(`edit`)}</button>
                ${e.builtIn?``:`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${esc(e.id)}">${icon(`trash`,13)}</button>`}
              </div>
            </div>
          `).join(``)}
        </div>
      </section>
    `),e.settingsSection===`trash`){!e.trashLoaded&&!e._trashFetching&&(e._trashFetching=!0,D(async()=>{let{api:e}=await import(`./api-BW_3cm3S.js`).then(e=>e.r);return{api:e}},__vite__mapDeps([0,1,2,3,4])).then(({api:e})=>e(`/api/trash`)).then(n=>{e.trash=Array.isArray(n)?n:n.trash||[...(n.projects||[]).map(e=>({...e,type:`project`})),...(n.tasks||[]).map(e=>({...e,type:`task`})),...(n.documents||[]).map(e=>({...e,type:`document`}))],e.trashLoaded=!0,e._trashFetching=!1,D(()=>Promise.resolve().then(()=>Et).then(e=>e.renderView()),void 0)}).catch(n=>{e._trashFetching=!1,console.error(`[Trash fetch error]`,n)}));let i=e.trash||[],a=e.trashFilter||`all`,o=(e.trashQuery||``).trim().toLowerCase(),c=i.filter(e=>{if(a!==`all`&&e.type!==a)return!1;if(!o)return!0;let n=(choose(e.nameAr||e.titleAr,e.nameEn||e.titleEn)||e.name||e.title||e.originalName||``).toLowerCase(),r=(e.code||e.projectCode||``).toLowerCase(),i=(e.projectNameAr||e.projectNameEn||``).toLowerCase();return n.includes(o)||r.includes(o)||i.includes(o)}),l=i.filter(e=>e.type===`project`).length,u=i.filter(e=>e.type===`task`).length,d=i.filter(e=>e.type===`document`).length,f=i.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${icon(`info`,16)}</div>
        <div class="trash-notice-text">
          <strong>${choose(`سلة المحذوفات المركزية المحمية`,`Central Protected Trash Bin`)}</strong>
          <p>${choose(`تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.`,`Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.`)}</p>
        </div>
      </div>

      <div class="trash-filter-bar" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm ${a===`all`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="all">
            ${choose(`الكل`,`All`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${i.length}</span>
          </button>
          <button class="btn btn-sm ${a===`project`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="project">
            ${icon(`building`,12)} ${choose(`المشاريع`,`Projects`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${l}</span>
          </button>
          <button class="btn btn-sm ${a===`task`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="task">
            ${icon(`checklist`,12)} ${choose(`المهام`,`Tasks`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${u}</span>
          </button>
          <button class="btn btn-sm ${a===`document`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="document">
            ${icon(`document`,12)} ${choose(`المستندات`,`Documents`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${d}</span>
          </button>
        </div>
        <div style="min-width:220px;max-width:320px;flex:1;">
          <input type="search" class="input input-sm" placeholder="${choose(`بحث في المحذوفات...`,`Search deleted items...`)}" value="${esc(e.trashQuery||``)}" data-action="search-trash-input" style="width:100%;padding:6px 12px;font-size:12px;" />
        </div>
      </div>

      ${c.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${choose(`الاسم / العنوان`,`Name / Title`)}</th>
                <th>${choose(`النوع`,`Type`)}</th>
                <th>${choose(`المشروع التابع له`,`Project`)}</th>
                <th>${choose(`الحالة السابقة`,`Prior Status`)}</th>
                <th>${choose(`تاريخ الحذف`,`Deleted At`)}</th>
                <th style="text-align:${e.lang===`ar`?`left`:`right`}">${choose(`الإجراءات`,`Actions`)}</th>
              </tr>
            </thead>
            <tbody>
              ${c.map(i=>{let a=i.type===`project`,o=i.type===`task`,s=i.type===`document`,c=choose(i.nameAr||i.titleAr,i.nameEn||i.titleEn)||i.name||i.title||i.originalName||i.code||choose(`عنصر محذوف`,`Deleted item`),l=!a&&i.projectId?(e.data?.projects||[]).find(e=>e.id===i.projectId):null,u=i.projectNameAr||i.projectNameEn||(l?choose(l.nameAr,l.nameEn||l.nameAr):null),d=i.projectCode||l?.code,f=s&&i.size?i.size>1048576?(i.size/1048576).toFixed(1)+` MB`:Math.round(i.size/1024)+` KB`:``,p=r||can(`manage_trash`)||i.uploaderId===n;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${a?`is-project`:o?`is-task`:`is-doc`}">
                          ${icon(a?`building`:o?`checklist`:`document`,14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${esc(c)}</strong>
                          ${i.code||a?`<span class="trash-item-code">${esc(i.code||i.id)}</span>`:``}
                          ${s&&f?`<span class="trash-item-code" style="color:var(--muted);">${f}</span>`:``}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${a?`type-project`:o?`type-task`:`type-doc`}">
                        ${icon(a?`building`:o?`checklist`:`document`,11)}
                        ${a?choose(`مشروع`,`Project`):o?choose(`مهمة`,`Task`):choose(`مستند`,`Document`)}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${a?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${choose(`مشروع رئيسي`,`Primary Project`)}</span>`:u?`${icon(`building`,11)} <span>${esc(u)}${d?` (${esc(d)})`:``}</span>${s&&i.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${esc(i.taskTitleAr)}</span>`:``}`:`<span style="color:var(--muted)">—</span>`}
                      </span>
                    </td>
                    <td>
                      ${i.status?`<span class="status-badge ${esc(i.status)}">${esc(statusText(i.status))}</span>`:`<span style="color:var(--muted)">—</span>`}
                    </td>
                    <td>
                      <span class="trash-date" title="${esc(i.deletedAt||``)}">
                        ${dateLabel(i.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${e.lang===`ar`?`left`:`right`}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${esc(i.type)}" data-id="${esc(i.id)}" title="${choose(`استعادة العنصر وإعادته للعمل`,`Restore item to active`)}">
                          ${icon(e.lang===`ar`?`arrow`:`arrowLeft`,12)} ${choose(`استعادة`,`Restore`)}
                        </button>
                        ${p?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${esc(i.type)}" data-id="${esc(i.id)}" title="${choose(`حذف العنصر نهائياً`,`Permanently delete item`)}">
                            ${icon(`trash`,12)} ${choose(`حذف نهائي`,`Purge`)}
                          </button>
                        `:``}
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      `:`
        <div class="empty">
          ${icon(`search`,22)}
          <span>${choose(`لا توجد نتائج تطابق بحثك في سلة المهملات.`,`No items match your search in trash.`)}</span>
        </div>
      `}
    `:`
      <div class="empty">
        ${icon(`trash`,24)}
        <span>${choose(`سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.`,`Trash is empty, no deleted items found.`)}</span>
      </div>
    `;s=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${choose(`سلة المهملات`,`Recycle Bin`)}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${i.length} ${choose(`عناصر`,`items`)}
              </span>
            </div>
            <p>${choose(`استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.`,`Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.`)}</p>
          </div>
          ${(r||can(`manage_trash`))&&i.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${choose(`حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات`,`Permanently erase all deleted items`)}">
                ${icon(`trash`,13)} ${choose(`إفراغ سلة المهملات`,`Empty Trash`)}
              </button>
            </div>
          `:``}
        </div>
        ${f}
      </section>
    `}if(e.settingsSection===`audit`&&(r||can(`view_audit_logs`))){let n=[...e.data?.auditLogs||[]].sort((e,n)=>new Date(n.createdAt).getTime()-new Date(e.createdAt).getTime());s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t(`audit`)}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${n.length} ${choose(`عملية مسجلة`,`events recorded`)}
              </span>
            </div>
            <p>${choose(`سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.`,`Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.`)}</p>
          </div>
        </div>

        ${n.length?`
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${choose(`المستخدم / المنفذ`,`User / Actor`)}</th>
                  <th style="padding:12px 14px;">${choose(`نوع النشاط والعملية`,`Action & Target`)}</th>
                  <th style="padding:12px 14px;">${choose(`التفاصيل والتغيير`,`Details / Context`)}</th>
                  <th style="padding:12px 14px;text-align:${e.lang===`ar`?`left`:`right`};">${choose(`التاريخ والوقت الدقيق`,`Exact Date & Time`)}</th>
                </tr>
              </thead>
              <tbody>
                ${n.map(n=>{let r=n.user||(n.userId?(e.data?.users||[]).find(e=>e.id===n.userId):null),i=r?choose(r.name,r.nameEn||r.name):choose(`النظام`,`System`),a=r?roleName(r):choose(`تلقائي`,`Automated`),o=vt(n.createdAt),{badgeClass:s,actionLabel:c,entityLabel:l,detailHtml:u}=yt(n);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${avatar(r)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${esc(i)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${esc(a)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${s}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${esc(c)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${esc(l)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${u}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${e.lang===`ar`?`left`:`right`};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${esc(o.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${icon(`clock`,11)}
                          <span>${esc(o.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join(``)}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${icon(`checklist`,24)}
            <span>${choose(`لا توجد عمليات مسجلة حتى الآن.`,`No audit logs recorded yet.`)}</span>
          </div>
        `}
      </section>
    `}return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${r?choose(`تحكم مركزي`,`CENTRAL CONTROL`):choose(`الملف الشخصي`,`USER PROFILE`)}</p>
        <h1>${r?t(`settings`):choose(`الملف الشخصي والأمان`,`Profile & Security`)}</h1>
        <p>${r?choose(`إدارة إعدادات الشركة والحسابات والأدوار والنظام.`,`Manage workspace, accounts, roles, and settings.`):choose(`إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.`,`Manage your account info, password, and personal avatar.`)}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${icon(r?`shield`:`user`,13)} ${esc(roleName(o))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${a.map(([n,r])=>`<button class="${e.settingsSection===n?`active`:``}" data-action="settings-section" data-section="${n}">${r}</button>`).join(``)}
      </aside>
      <div class="settings-content">${s}</div>
    </div>
  `}var xt=[{id:`view_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`عرض المشاريع`,nameEn:`View Projects`},{id:`create_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`إنشاء مشاريع جديدة`,nameEn:`Create Projects`},{id:`edit_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`تعديل بيانات ومراحل المشاريع`,nameEn:`Edit Projects`},{id:`delete_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`حذف المشاريع`,nameEn:`Delete Projects`},{id:`manage_project_members`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`إدارة وتعيين أعضاء المشروع`,nameEn:`Manage Project Members`},{id:`create_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إنشاء المهام والمخرجات`,nameEn:`Create Tasks`},{id:`edit_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`تعديل تفاصيل وحالة المهام`,nameEn:`Edit Tasks`},{id:`delete_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`حذف المهام`,nameEn:`Delete Tasks`},{id:`assign_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إسناد وتوزيع المهام للمنفذين`,nameEn:`Assign Tasks`},{id:`review_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`مراجعة المخرجات الهندسية`,nameEn:`Review Deliverables`},{id:`approve_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`اعتماد وتوقيع المخرجات الهندسية`,nameEn:`Approve Deliverables`},{id:`manage_reminders`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إدارة التذكيرات والمتابعات`,nameEn:`Manage Reminders`},{id:`upload_documents`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`رفع وإدارة المخططات والمستندات`,nameEn:`Upload Documents`},{id:`delete_documents`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`حذف المخططات والمستندات`,nameEn:`Delete Documents`},{id:`manage_templates`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`إدارة مكتبة القوالب والمخرجات القياسية`,nameEn:`Manage Templates Library`},{id:`view_dashboard`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`عرض لوحة التحكم والمؤشرات`,nameEn:`View Dashboard`},{id:`view_reports`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`عرض صفحة التقارير والمؤشرات`,nameEn:`View Reports`},{id:`export_reports`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`تصدير التقارير (Excel)`,nameEn:`Export Reports (Excel)`},{id:`manage_users`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة ودعوة وتفعيل حسابات المستخدمين`,nameEn:`Manage Users`},{id:`manage_existing_account_permissions`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`تعديل أدوار وصلاحيات الحسابات الموجودة`,nameEn:`Manage Existing Account Permissions`},{id:`view_user_activity`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`متابعة أوقات دخول ونشاط المستخدمين`,nameEn:`View User Logins & Activity Timestamps`},{id:`manage_roles`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إنشاء وتعديل الأدوار والصلاحيات`,nameEn:`Manage Roles & Permissions`},{id:`manage_settings`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة إعدادات النظام والشركة ومساحة العمل`,nameEn:`Manage Company & Settings`},{id:`manage_trash`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة واستعادة سلة المهملات`,nameEn:`Manage Trash`},{id:`view_audit_logs`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`استعراض سجل الرقابة والعمليات الأمنية`,nameEn:`View Audit Logs`}];function St(n=null){let r=e.data?.permissionsCatalog&&e.data.permissionsCatalog.length>=10?e.data.permissionsCatalog:xt,i=new Map;r.forEach(e=>{let n=e.category||`general`,r=choose(e.categoryAr||n,e.categoryEn||n);i.has(n)||i.set(n,{name:r,items:[]}),i.get(n).items.push(e)});let a=n?.id===`admin`||n?.permissions&&n.permissions.includes(`*`),o=Array.from(i.entries()).map(([e,r])=>{let i=r.items.map(e=>{let r=e.id||e.key,i=choose(e.nameAr||e.ar,e.nameEn||e.en||r),o=a||n?.permissions&&(n.permissions.includes(r)||typeof PERMISSION_ALIASES<`u`&&PERMISSION_ALIASES[r]&&n.permissions.includes(PERMISSION_ALIASES[r])),s=a?`disabled`:``;return`
        <label class="permission-option" style="cursor:${a?`default`:`pointer`};">
          <input type="checkbox" name="permissions" value="${esc(r)}" ${o?`checked`:``} ${s} />
          <span style="font-weight:500;">${esc(i)}</span>
        </label>
      `}).join(``);return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${esc(r.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${r.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${i}
        </div>
      </div>
    `}).join(``),s=a?``:`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${t(`permissions`)} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${r.length} ${choose(`صلاحية متاحة`,`available permissions`)})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${choose(`تحديد الكل`,`Select All`)}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${choose(`إلغاء التحديد`,`Deselect All`)}</button>
      </div>
    </div>
  `,c=`
    <form id="role-form" data-role-id="${esc(n?.id||``)}">
      <div class="form-grid">
        <div class="field">
          <label>${t(`nameAr`)} *</label>
          <input name="nameAr" value="${esc(n?.nameAr||``)}" required />
        </div>
        <div class="field">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(n?.nameEn||``)}" />
        </div>
        <div class="field full">
          <label>${t(`roleDescription`)}</label>
          <textarea name="descriptionAr" rows="2">${esc(n?.descriptionAr||``)}</textarea>
        </div>
      </div>
      ${a?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${choose(`مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.`,`The system administrator always keeps full root privileges [*] across all aspects of the system.`)}
        </div>
      `:`
        ${s}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${o}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${n?t(`save`):t(`create`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(n?choose(`تعديل الدور والصلاحيات`,`Edit role & permissions`):t(`addRole`),choose(`تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.`,`Define granular permissions and workspace access levels for this role.`),c,`role`,`modal-lg`);let l=document.getElementById(`modal-root`);if(l){let e=l.querySelector(`#btn-perm-select-all`),n=l.querySelector(`#btn-perm-deselect-all`);e&&e.addEventListener(`click`,()=>{l.querySelectorAll(`input[name="permissions"]:not(:disabled)`).forEach(e=>e.checked=!0)}),n&&n.addEventListener(`click`,()=>{l.querySelectorAll(`input[name="permissions"]:not(:disabled)`).forEach(e=>e.checked=!1)})}}function Ct(n=null){if(n?.id===`usr_ahmad`&&e.data?.user?.id!==`usr_ahmad`)return showToast(choose(`لا يمكن تعديل حساب مدير ومطور النظام.`,`System Developer account is protected.`),!0);if(!n&&!isAdmin())return showToast(t(`adminOnly`),!0);let r=!isAdmin(),i=r?`disabled`:``,a=(e.data?.roles||[]).filter(e=>isAdmin()||e.id!==`admin`),o=`<form id="user-form" data-user-id="${esc(n?.id||``)}" data-permission-only="${r}"><div class="form-grid"><div class="field full"><label>${t(`nameAr`)}</label><input name="name" value="${esc(n?.name||``)}" ${i} required /></div><div class="field"><label>${t(`nameEn`)}</label><input name="nameEn" value="${esc(n?.nameEn||``)}" ${i} /></div><div class="field"><label>${t(`jobTitle`)}</label><input name="jobTitleAr" value="${esc(n?.jobTitleAr||``)}" ${i} /></div><div class="field"><label>${t(`email`)}</label><input name="email" type="email" value="${esc(n?.email||``)}" placeholder="name@darc.com" ${i} /></div><div class="field"><label>${t(`role`)}</label><select name="roleId">${a.map(e=>`<option value="${esc(e.id)}" ${n?.roleId===e.id?`selected`:``}>${esc(choose(e.nameAr,e.nameEn))}</option>`).join(``)}</select></div></div><div class="field-hint">${r?choose(`يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.`,`Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator.`):choose(`إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.`,`If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.`)}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button><button type="submit" class="btn btn-primary">${icon(`check`,14)} ${n?r?choose(`حفظ الصلاحية`,`Save permission`):t(`save`):t(`create`)}</button></div></form>`;document.getElementById(`modal-root`).innerHTML=modalShell(n?r?choose(`تعديل صلاحية الحساب`,`Change account permission`):choose(`تعديل حساب العضو`,`Edit member account`):t(`addMember`),choose(`الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.`,`The role defines what this member can see and change across projects.`),o,`user`)}var wt=i({showNotifications:()=>Tt});function Tt(){let n=e.data?.notifications||[],i=`${n.filter(e=>!e.read&&!e.readAt).length>0?`
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 10px;">
        ${_(`check`,13)} ${E(`تحديد الكل كمقروء`,`Mark all as read`)}
      </button>
    </div>
  `:``}${n.length?`<div class="attention-list">${n.slice(0,20).map(e=>{let n=e.type===`overdue`||e.type===`escalation`?`red`:e.type===`due_soon`?`amber`:`blue`,r=!!(e.readAt||e.read),i=E(e.titleAr||e.titleEn||e.content||``,e.titleEn||e.titleAr||e.content||``),a=E(e.messageAr||e.bodyAr||e.content||``,e.messageEn||e.bodyEn||e.content||``);return`<button class="attention-item" data-action="read-notification" data-notification-id="${w(e.id)}" style="border:0;text-align:inherit;width:100%;opacity:${r?`.65`:`1`}"><span class="attention-icon ${n}">${_(e.type===`overdue`||e.type===`escalation`?`alert`:e.type===`assignment`?`user`:`bell`,14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${w(i)}</strong><span>${w(a)} · ${m(e.createdAt)}</span></span></button>`}).join(``)}</div>`:`<div class="empty">${_(`bell`,18)}<span>${p(`noAttention`)}</span></div>`}`;document.getElementById(`modal-root`).innerHTML=r(p(`notifications`),E(`تنبيهاتك داخل مساحة العمل والبريد.`,`Your workspace and email notifications.`),i,`notifications`)}var Et=i({canAccessView:()=>I,getFirstAllowedView:()=>L,loadData:()=>Ot,navItem:()=>R,refreshView:()=>H,renderApp:()=>z,renderSyncIndicator:()=>Dt,renderView:()=>B,switchView:()=>V});function I(n){return e.data?n===`dashboard`?C(`view_dashboard`):n===`projects`||n===`project-detail`?C(`view_projects`):n===`tasks`?C(`create_tasks`)||C(`edit_tasks`)||C(`delete_tasks`)||C(`assign_tasks`)||C(`review_tasks`)||C(`approve_tasks`)||C(`manage_reminders`)||C(`view_projects`)||T():n===`documents`?C(`upload_documents`)||C(`delete_documents`)||T():n===`templates`?C(`manage_templates`)||T():n===`team`?T()||C(`manage_users`):n===`reports`?C(`view_reports`)||T():n===`settings`:!0}function L(){for(let e of[`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`])if(I(e))return e;return`dashboard`}function Dt(){let e=s().length;return u()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${E(`انقر للمزامنة الفورية مع السيرفر`,`Click to sync now with server`)}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${E(`مزامنة معلقة`,`Pending Sync`)}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:``:`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${E(`وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً`,`Offline Mode — all actions stored locally and will auto-sync`)}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${E(`أوفلاين`,`Offline`)}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:``}
    </button>`}if(typeof window<`u`&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;let e=()=>{let e=document.getElementById(`sync-status-indicator`);e&&(e.innerHTML=Dt())};window.addEventListener(`darc:queue-change`,e),window.addEventListener(`online`,e),window.addEventListener(`offline`,e)}function R(n,r,i){return`<button class="nav-item ${e.view===n||n===`projects`&&e.view===`project-detail`?`active`:``}" data-view="${n}">${_(i,17)}<span>${r}</span></button>`}function z(){if(I(e.view)||(e.view=L()),typeof window<`u`){let n=window.location.hash.replace(/^#/,``);if(!n||n===`login`||n===`forgot`){let n=e.view;e.view===`project-detail`&&e.activeProjectId&&(n=`project-detail?id=${encodeURIComponent(e.activeProjectId)}${e.projectTab?`&tab=${encodeURIComponent(e.projectTab)}`:``}`),window._isInternalNav=!0,window.history&&window.history.replaceState?window.history.replaceState(null,``,`#${n}`):window.location.hash=`#${n}`}}document.body.classList.add(`in-app`),document.body.classList.toggle(`is-ltr`,e.lang===`en`),document.documentElement.lang=e.lang,document.documentElement.dir=e.lang===`ar`?`rtl`:`ltr`;let n=(e.data?.notifications||[]).filter(e=>!e.read).length,r=e.data?.user||{},i=T()||C(`manage_settings`)||C(`manage_roles`)||C(`manage_users`)||C(`manage_trash`)||C(`view_audit_logs`);document.getElementById(`app`).innerHTML=`
    <div class="app-shell ${e.lang===`en`?`is-ltr`:``}">
      <aside class="sidebar ${e.sidebarOpen?`open`:``}">
        <div class="sidebar-brand">
          ${e.data?.company?.logoUrl?`<img src="${w(e.data.company.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${_(`building`,20)}</span>`:`<span class="brand-mark">${_(`building`,20)}</span>`}
          <div>
            <div class="brand-name">${w(E(e.data?.company?.nameAr||e.data?.company?.name||`DARC Design Team`,e.data?.company?.nameEn||e.data?.company?.name||`DARC Design Team`))}</div>
            <div class="brand-subtitle">${p(`workspace`)}</div>
          </div>
        </div>
        <div class="nav-title">${E(`مساحة العمل`,`WORKSPACE`)}</div>
        <nav class="nav-list">
          ${I(`dashboard`)?R(`dashboard`,p(`dashboard`),`grid`):``}
          ${I(`projects`)?R(`projects`,p(`projects`),`building`):``}
          ${I(`tasks`)?R(`tasks`,p(`myTasks`),`checklist`):``}
          ${I(`documents`)?R(`documents`,p(`documents`),`document`):``}
          ${I(`templates`)?R(`templates`,p(`templates`),`layers`):``}
          ${I(`team`)?R(`team`,p(`team`),`users`):``}
          ${I(`reports`)?R(`reports`,p(`reports`),`chart`):``}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${i?E(`إدارة النظام`,`ADMIN`):E(`حسابي`,`MY ACCOUNT`)}</div>
        <nav class="nav-list">${R(`settings`,i?p(`settings`):E(`الملف الشخصي والأمان`,`Profile & Security`),`settings`)}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${te(r)}<div class="admin-info"><strong>${w(E(r.name,r.nameEn||r.name))}</strong><span>${w(y(r))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${E(`نسخة عمل`,`Workspace build`)}</span><button data-action="logout" title="${p(`signOut`)}">${_(`logout`,15)}</button></div>
        </div>
      </aside>
      <section class="workspace">
        <header class="topbar">
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${_(`menu`,18)}</button><div><div class="topbar-kicker">DARC / ${p(`workspace`)}</div><div class="topbar-title">${w(b())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${Dt()}</span>
            <button class="topbar-search-trigger" data-action="open-omnisearch" title="${E(`بحث شامل وسريع`,`Omnisearch`)}">
              ${_(`search`,14)}
              <span>${E(`بحث شامل...`,`Search...`)}</span>
              <kbd class="shortcut-kbd">${typeof navigator<`u`&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?`⌘K`:`Ctrl+K`}</kbd>
            </button>
            <button class="icon-button" data-action="open-cheatsheet" title="${E(`دليل اختصارات لوحة المفاتيح (?)`,`Keyboard shortcuts guide (?)`)}" style="color:var(--ink-soft);" aria-label="Shortcuts">
              <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
            </button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-theme">${e.theme===`dark`?`☀️`:`🌙`}</button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-lang">${e.lang===`ar`?`EN`:`عربي`} ${_(`globe`,14)}</button>
            <button class="icon-button" data-action="show-notifications" aria-label="${p(`notifications`)}">${_(`bell`,17)}${n?`<span class="notification-dot"></span>`:``}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${te(r)}<div class="profile-chip-text"><strong>${w(E(r.name,r.nameEn||r.name))}</strong><span>${w(y(r))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,B()}function B(){let n=document.getElementById(`main-content`);if(!n)return;I(e.view)||(e.view=L());let r=``;e.view===`dashboard`&&(r=renderDashboard()),e.view===`projects`&&(r=renderProjects()),e.view===`tasks`&&(r=renderTasks()),e.view===`documents`&&(r=renderDocuments()),e.view===`templates`&&(r=renderTemplates()),e.view===`team`&&(r=renderTeam()),e.view===`reports`&&(r=renderReports()),e.view===`settings`&&(r=renderSettings()),e.view===`project-detail`&&(r=renderProjectDetail()),n.innerHTML=r,e.view===`project-detail`&&e.projectTab===`timeline`&&setTimeout(drawTimelineArrows,0)}function V(n,r=void 0){I(n)||(n=L()),e.view=n,r!==void 0&&(e.activeProjectId=r),e.sidebarOpen=!1,document.querySelector(`.sidebar`)?.classList.remove(`open`),document.querySelectorAll(`.nav-item`).forEach(e=>{let r=e.dataset.view,i=r===n||r===`projects`&&n===`project-detail`;e.classList.toggle(`active`,i)});let i=document.querySelector(`.topbar-title`);i&&(i.textContent=b());try{let r=n;n===`project-detail`&&e.activeProjectId&&(r=`project-detail?id=${encodeURIComponent(e.activeProjectId)}${e.projectTab?`&tab=${encodeURIComponent(e.projectTab)}`:``}`),typeof window<`u`&&window.location.hash.replace(/^#/,``)!==r&&(window._isInternalNav=!0,window.location.hash=r),typeof sessionStorage<`u`&&sessionStorage.setItem(`darc_last_route`,JSON.stringify({view:e.view,activeProjectId:e.activeProjectId,projectTab:e.projectTab}))}catch{}requestAnimationFrame(()=>{B();let e=document.getElementById(`main-content`);e&&(e.scrollTop=0,e.scrollLeft=0),typeof window<`u`&&window.scrollTo(0,0)})}async function H(e=!1){try{await Ot(e)}catch(e){showToast(e.message,!0)}}async function Ot(n=!1){try{let r=await O(`/api/bootstrap`,{silent:n});if(r===null){if(e.data)return;let n=await l();if(r=n&&n.user?n:await O(`/api/bootstrap`,{silent:!1,headers:{"Cache-Control":`no-cache, no-store`}}),!r)return}if(c(r),e.isOffline=!1,e.data?.tasks&&r?.tasks){let n=Date.now(),i=new Set(r.tasks.map(e=>e.id));for(let a of e.data.tasks)i.has(a.id)||n-(a.createdAt?new Date(a.createdAt).getTime():n)<12e4&&(r.tasks.unshift(a),i.add(a.id))}if(e.data?.projects&&r?.projects){let n=Date.now(),i=new Set(r.projects.map(e=>e.id));for(let a of e.data.projects)i.has(a.id)||n-(a.createdAt?new Date(a.createdAt).getTime():n)<12e4&&(r.projects.unshift(a),i.add(a.id))}let i=!1;if(e.data&&r){if(e.data.updatedAt!==r.updatedAt)i=!0;else if(e.data.tasks?.length!==r.tasks?.length||e.data.projects?.length!==r.projects?.length)i=!0;else{let n=e.data.tasks||[],a=r.tasks||[];for(let e=0;e<a.length;e++){let r=a[e],o=n[e];if(!o||o.id!==r.id||o.status!==r.status||(o.sortOrder||o.sort_order)!==(r.sortOrder||r.sort_order)||o.progress!==r.progress){i=!0;break}}if(!i){let n=e.data.projects||[],a=r.projects||[];for(let e=0;e<a.length;e++){let r=a[e],o=n[e];if(!o||o.id!==r.id||o.lifecycle!==r.lifecycle||o.health!==r.health||o.progress!==r.progress){i=!0;break}}}}}if(!e.data||i||e.data.comments?.length!==r.comments?.length||e.data.documents?.length!==r.documents?.length||e.data.users?.length!==r.users?.length||e.data.auditLogs?.length!==r.auditLogs?.length||e.data.notifications?.length!==r.notifications?.length){e.data=r,I(e.view)||(e.view=L());let i=!!document.getElementById(`modal-root`)?.children?.length,a=!!(document.querySelector(`.is-dragging`)||document.querySelector(`.touch-dragging`)||document.querySelector(`.drag-placeholder`)),o=!!(document.activeElement&&[`INPUT`,`TEXTAREA`].includes(document.activeElement.tagName)&&document.getElementById(`main-content`)?.contains(document.activeElement));if(n&&(a||o))return;requestAnimationFrame(!n&&!i?()=>z():()=>B())}else e.data=r,I(e.view)||(e.view=L(),requestAnimationFrame(()=>B()))}catch(r){if(r&&(r.status===401||r.status===403))throw r;let i=await l();if(i){e.data=i,I(e.view)||(e.view=L()),e.isOffline=!0;let r=!!document.getElementById(`modal-root`)?.children?.length;!n&&!r?z():B();return}throw r}}var kt=typeof navigator<`u`&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?`⌘K`:`Ctrl+K`,U=0,W=[];function At(){let e=document.getElementById(`omnisearch-modal`);e&&e.remove(),document.body.style.overflow=`hidden`;let n=E(`ابحث في المشاريع، المهام، والأعضاء... (${kt})`,`Search projects, tasks, team... (${kt})`),r=`
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${_(`search`,18)}</span>
          <input 
            id="omnisearch-input" 
            type="text" 
            autocomplete="off" 
            placeholder="${w(n)}" 
            onfocus="this.placeholder=''" 
            onblur="if(!this.value) this.placeholder='${w(n)}'"
          />
          <button class="btn btn-ghost btn-sm" data-action="close-omnisearch" style="padding:4px 8px;">
            <kbd class="shortcut-kbd">ESC</kbd>
          </button>
        </div>
        <div id="omnisearch-results-container" class="omnisearch-results">
          ${Pt(``)}
        </div>
        <div class="omnisearch-foot">
          <div class="omni-shortcuts-hint">
            <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd> ${E(`للتنقل`,`to navigate`)}</span>
            <span><kbd class="shortcut-kbd">↵</kbd> ${E(`للاختيار`,`to select`)}</span>
            <span><kbd class="shortcut-kbd">ESC</kbd> ${E(`للإغلاق`,`to close`)}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="open-cheatsheet" style="font-size:11px;padding:2px 6px;">
            ${_(`sparkles`,12)} ${E(`دليل الاختصارات (?)`,`Shortcuts (?)`)}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,r);let i=document.getElementById(`omnisearch-modal`);i&&i.addEventListener(`click`,e=>{e.target===i&&G()});let a=document.getElementById(`omnisearch-input`);a&&(a.focus(),a.addEventListener(`input`,e=>{U=0;let n=document.getElementById(`omnisearch-results-container`);n&&(n.innerHTML=Pt(e.target.value))}),a.addEventListener(`keydown`,jt))}function G(){let e=document.getElementById(`omnisearch-modal`);e&&e.remove(),document.querySelector(`.modal-backdrop`)||(document.body.style.overflow=``)}function jt(e){e.key===`ArrowDown`?(e.preventDefault(),W.length>0&&(U=(U+1)%W.length,Mt())):e.key===`ArrowUp`?(e.preventDefault(),W.length>0&&(U=(U-1+W.length)%W.length,Mt())):e.key===`Enter`?(e.preventDefault(),W[U]&&Nt(W[U])):e.key===`Escape`&&G()}function Mt(){document.querySelectorAll(`.omni-item`).forEach((e,n)=>{e.classList.toggle(`selected`,n===U),n===U&&e.scrollIntoView({block:`nearest`})})}function Nt(n){if(G(),n.type===`action`){if(n.id===`new-task`){let r=(e.data?.projects||[]).find(n=>n.id===(e.activeProjectId||e.lastActiveProjectId))||(e.data?.projects||[])[0];ze(null,null,n.targetProjectId||r?.id)}else n.id===`new-project`?rt():n.id===`cheatsheet`&&Ft()}else if(n.type===`project`)e.projectTab=`tasks`,e.lastActiveProjectId=n.id,V(`project-detail`,n.id);else if(n.type===`task`){let r=e.data?.tasks?.find(e=>e.id===n.id);r&&ze(r)}else if(n.type===`user`){let r=e.data?.users?.find(e=>e.id===n.id);r&&typeof window.openUserModal==`function`&&window.openUserModal(r)}}function Pt(n){let r=n.trim().toLowerCase(),i=[],a=(e.data?.projects||[]).find(n=>n.id===(e.activeProjectId||e.lastActiveProjectId))||(e.data?.projects||[])[0],o=a?E(a.nameAr,a.nameEn):``,s=[];if((C(`create_tasks`)||T())&&s.push({type:`action`,id:`new-task`,targetProjectId:a?.id,title:E(`إضافة مهمة جديدة`,`Create new task`),sub:a?E(`في مشروع: ${o}`,`In project: ${o}`):E(`إجراء سريع`,`Quick action`),icon:`plus`,keywords:`new task مهمة إضافة عمل جديد`}),(C(`create_projects`)||T())&&s.push({type:`action`,id:`new-project`,title:E(`إنشاء مشروع جديد`,`Create new project`),sub:E(`إجراء سريع`,`Quick action`),icon:`building`,keywords:`new project مشروع إنشاء جديد`}),s.push({type:`action`,id:`cheatsheet`,title:E(`عرض دليل اختصارات لوحة المفاتيح`,`View keyboard shortcuts guide`),sub:E(`مساعدة`,`Help`),icon:`sparkles`,keywords:`shortcuts اختصارات كيبورد مساعدة`}),s.forEach(e=>{(!r||e.keywords.includes(r)||e.title.toLowerCase().includes(r))&&i.push(e)}),(C(`view_projects`)||T())&&(e.data?.projects||[]).forEach(e=>{(!r||`${e.nameAr} ${e.nameEn} ${e.code} ${e.clientAr} ${e.clientEn}`.toLowerCase().includes(r))&&i.push({type:`project`,id:e.id,title:E(e.nameAr,e.nameEn),sub:`${e.code} · ${E(e.clientAr,e.clientEn)||``}`,badge:`${e.progress}%`,icon:`building`})}),I(`tasks`)&&(e.data?.tasks||[]).forEach(e=>{(!r||`${e.titleAr} ${e.titleEn} ${e.categoryAr} ${e.categoryEn}`.toLowerCase().includes(r))&&i.push({type:`task`,id:e.id,title:E(e.titleAr,e.titleEn),sub:e.dueDate?`📅 ${m(e.dueDate)}`:E(e.categoryAr,e.categoryEn)||``,badge:`${e.progress}%`,icon:`checklist`})}),(T()||C(`manage_users`))&&(e.data?.users||[]).forEach(e=>{(!r||`${e.name} ${e.nameEn} ${e.email} ${e.jobTitleAr}`.toLowerCase().includes(r))&&i.push({type:`user`,id:e.id,title:E(e.name,e.nameEn||e.name),sub:e.email||``,badge:y(e),icon:`user`})}),W=i.slice(0,15),!W.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${_(`search`,24)}</span>
        <strong style="color:var(--ink);">${E(`لا توجد نتائج مطابقة`,`No matching results`)}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${E(`جرب البحث بكلمات أخرى أو رمز المشروع.`,`Try different keywords or project code.`)}</p>
      </div>
    `;let c=``;return W.map((e,n)=>{let r=``,i=e.type===`action`?E(`إجراءات سريعة`,`Quick Actions`):e.type===`project`?E(`المشاريع`,`Projects`):e.type===`task`?E(`المهام والمخرجات`,`Tasks & Deliverables`):E(`فريق العمل`,`Team`);return i!==c&&(c=i,r=`<div class="omni-group-title">${i}</div>`),`
      ${r}
      <div class="omni-item ${n===U?`selected`:``}" data-omni-index="${n}" onclick="window.__selectOmniItem(${n})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${_(e.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${w(e.title)}</strong>
            ${e.sub?`<span style="font-size:11px;color:var(--muted);">${w(e.sub)}</span>`:``}
          </div>
        </div>
        ${e.badge?`<span class="omni-badge">${w(e.badge)}</span>`:``}
      </div>
    `}).join(``)}window.__selectOmniItem=e=>{W[e]&&Nt(W[e])};function Ft(){G();let e=`
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${E(`استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:`,`Use these shortcuts to navigate the workspace at full speed without a mouse:`)}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${E(`البحث الشامل والأوامر السريعة`,`Omnisearch & Quick Commands`)}</span>
          <kbd class="shortcut-kbd">${kt}</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${E(`إضافة مهمة سريعة في المشروع`,`Add new task in project`)}</span>
          <kbd class="shortcut-kbd">N</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${E(`إنشاء مشروع جديد`,`Create new project`)}</span>
          <kbd class="shortcut-kbd">P</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${E(`فتح دليل الاختصارات هذا`,`Open this shortcuts guide`)}</span>
          <kbd class="shortcut-kbd">? / ؟</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${E(`إغلاق أي نافذة منبثقة أو بحث`,`Close modal or search`)}</span>
          <kbd class="shortcut-kbd">ESC</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${E(`التنقل بين نتائج البحث`,`Navigate search results`)}</span>
          <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd></span>
        </div>
        <div class="cheatsheet-row">
          <span>${E(`تأكيد واختيار النتيجة`,`Select search result`)}</span>
          <kbd class="shortcut-kbd">↵ Enter</kbd>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:24px;">
        <button type="button" class="btn btn-primary" data-action="close-modal">${E(`فهمت ذلك`,`Got it`)}</button>
      </div>
    </div>
  `;document.getElementById(`modal-root`).innerHTML=r(E(`دليل اختصارات لوحة المفاتيح`,`Keyboard Shortcuts Guide`),E(`طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية`,`Work faster with productivity hotkeys`),e,`cheatsheet`)}function It(){window.addEventListener(`keydown`,n=>{let r=document.activeElement,i=r&&(r.tagName===`INPUT`||r.tagName===`TEXTAREA`||r.tagName===`SELECT`||r.isContentEditable),a=n.code===`KeyK`||n.key?.toLowerCase()===`k`||n.key===`ن`;(n.metaKey||n.ctrlKey)&&a?(n.preventDefault(),document.getElementById(`omnisearch-modal`)?G():At()):(n.key===`?`||n.key===`؟`||n.code===`Slash`&&n.shiftKey)&&!i?(n.preventDefault(),Ft()):(n.code===`KeyN`||n.key?.toLowerCase()===`n`||n.key===`ى`)&&!i&&!n.metaKey&&!n.ctrlKey&&!n.altKey?(n.preventDefault(),ze(null,null,e.view===`project-detail`&&e.activeProjectId?e.activeProjectId:e.data?.projects?.[0]?.id)):(n.code===`KeyP`||n.key?.toLowerCase()===`p`||n.key===`ح`)&&!i&&!n.metaKey&&!n.ctrlKey&&!n.altKey?(n.preventDefault(),rt()):n.key===`Escape`&&document.getElementById(`omnisearch-modal`)&&(n.preventDefault(),G())})}var Lt=i({getOrCreateFloatingUploadWidget:()=>qt,handleChange:()=>Ht,handleClick:()=>zt,handleInput:()=>Vt,handleSubmit:()=>Rt,init:()=>Xt,updateFloatingUploadWidget:()=>K,uploadDirectFiles:()=>Yt,uploadTaskFiles:()=>Jt});async function Rt(n){let r=n.target;if(![`project-form`,`task-form`,`user-form`,`role-form`,`activation-form`,`task-comment-form`,`template-form`,`force-password-form`].includes(r.id)&&!r.dataset.action)return;n.preventDefault();let i=Object.fromEntries(new FormData(r).entries()),a=r.querySelector(`button[type="submit"]`);a&&(a.disabled=!0,a.classList.add(`is-loading`));try{if(r.id===`activation-form`){if(i.password!==i.passwordConfirm)throw Error(choose(`كلمتا المرور غير متطابقتين.`,`Passwords do not match.`));delete i.passwordConfirm,await O(`/api/auth/activate`,{method:`POST`,body:JSON.stringify(i)}),window.history.replaceState({},``,window.location.pathname),await loadData();return}if(r.id===`project-form`){i.startDate||=null,i.dueDate||=null,i.managerId||=null;let n=[];try{i.memberIds&&(n=JSON.parse(i.memberIds))}catch{}i.managerId&&!n.includes(i.managerId)&&n.push(i.managerId),i.memberIds=n;let a=!!r.dataset.projectId,o=await O(a?`/api/projects/${r.dataset.projectId}`:`/api/projects`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.project){if(e.data.projects||(e.data.projects=[]),a){let n=e.data.projects.findIndex(e=>e.id===o.project.id);n!==-1&&(e.data.projects[n]={...e.data.projects[n],...o.project})}else e.data.projects.unshift(o.project)}closeModal(),B(),showToast(choose(`تم حفظ المشروع.`,`Project saved.`));return}if(r.id===`task-form`){let n=r.dataset.taskId;i.remindAt,delete i.remindAt,i.templateId=i.templateId||null,i.typeAr=i.typeAr||(i.templateId?`مخطط`:null),i.typeEn=i.typeEn||(i.templateId?`Drawing`:null),i.startDate||=null,i.dueDate||=null,i.assigneeId||=null,i.reviewerId||=null;let a=[];try{a=JSON.parse(i.additionalAssignees||`[]`)}catch{a=[...r.querySelectorAll(`select[name="additionalAssignees"] option:checked`)].map(e=>e.value)}let o=[];try{o=JSON.parse(i.externalAssignees||`[]`)}catch{let e=String(i.externalAssignees||``).trim();o=e?e.split(/[,،]+/).map(e=>e.trim()).filter(Boolean):[]}let s=[];try{s=JSON.parse(i.remindersJson||`[]`)}catch{s=[]}delete i.additionalAssignees,delete i.externalAssignees,delete i.remindersJson,delete i.dependencies,delete i.weight,delete i.progress,i.customFields={additional_assignees:a,external_assignees:o,reminders:s},i.projectId||=e.activeProjectId||e.data.projects?.[0]?.id;let c=!!n,l=await O(c?`/api/tasks/${n}`:`/api/tasks`,{method:c?`PATCH`:`POST`,body:JSON.stringify(i)});if(l.task){if(e.data.tasks||(e.data.tasks=[]),c){let n=e.data.tasks.findIndex(e=>e.id===l.task.id);n!==-1&&(e.data.tasks[n]={...e.data.tasks[n],...l.task})}else e.data.tasks.unshift(l.task),e.view===`tasks`&&(e.taskProjectFilter!==`all`&&e.taskProjectFilter!==l.task.projectId&&(e.taskProjectFilter=l.task.projectId),e.taskFilter===`mine`&&l.task.assigneeId!==e.data.user?.id&&(e.taskFilter=`all`));if(Array.isArray(s)&&s.length>0)for(let e of s)(!e.id||e.id.startsWith(`rem_temp_`))&&O(`/api/reminders`,{method:`POST`,body:JSON.stringify({taskId:l.task.id,remindAt:new Date(e.remindAt).toISOString(),noteAr:e.noteAr||i.titleAr||`تذكير لمتابعة المهمة`})}).catch(e=>console.warn(`[Reminder dispatch note]`,e))}closeModal(),B(),showToast(choose(`تم حفظ المهمة بنجاح.`,`Task saved successfully.`));return}if(r.id===`task-comment-form`){let n=r.dataset.taskId,o=await O(`/api/tasks/${n}/comments`,{method:`POST`,body:JSON.stringify(i)});r.reset(),o.comment&&(e.data.comments||(e.data.comments=[]),e.data.comments.push(o.comment));let s=e.data.tasks.find(e=>e.id===n),c=document.getElementById(`task-comments-list`);c&&(c.innerHTML=renderTaskComments(s),c.scrollTop=c.scrollHeight),a&&(a.disabled=!1);return}if(r.id===`force-password-form`){let n=r.dataset.userId,o=r.dataset.isPending===`true`;await O(`/api/users/${n}/force-password`,{method:`POST`,body:JSON.stringify(i)});let s=e.data.users.find(e=>e.id===n);s&&(s.status=`active`),closeModal(),B(),showToast(o?choose(`تم تفعيل الحساب بنجاح.`,`Account activated successfully.`):choose(`تم تغيير كلمة المرور وطرد المستخدم بنجاح.`,`Password changed and user kicked successfully.`)),a&&(a.disabled=!1);return}if(r.id===`user-form`){let n=r.dataset.userId,a=!!n,o=await O(a?`/api/users/${n}`:`/api/users`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.user){if(e.data.users||(e.data.users=[]),a){let n=e.data.users.findIndex(e=>e.id===o.user.id);n!==-1&&(e.data.users[n]={...e.data.users[n],...o.user})}else e.data.users.unshift(o.user)}closeModal(),B(),showToast(choose(`تم حفظ حساب العضو.`,`Member account saved.`));return}if(r.id===`role-form`){let n=r.dataset.roleId,a=[...r.querySelectorAll(`input[name="permissions"]:checked`)].map(e=>e.value),o=!!n,s=await O(o?`/api/roles/${n}`:`/api/roles`,{method:o?`PATCH`:`POST`,body:JSON.stringify({...i,permissions:a})});if(s.role){if(e.data.roles||(e.data.roles=[]),o){let n=e.data.roles.findIndex(e=>e.id===s.role.id);n!==-1&&(e.data.roles[n]={...e.data.roles[n],...s.role})}else e.data.roles.push(s.role)}closeModal(),B(),showToast(choose(`تم حفظ الدور بنجاح.`,`Role saved.`));return}if(r.id===`template-form`){let n=r.dataset.templateId,a=!!n,o=await O(a?`/api/templates/${n}`:`/api/templates`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.template){if(e.data.templates||(e.data.templates=[]),a){let n=e.data.templates.findIndex(e=>e.id===o.template.id);n!==-1&&(e.data.templates[n]={...e.data.templates[n],...o.template})}else e.data.templates.push(o.template)}closeModal(),B(),showToast(choose(`تم حفظ القالب بنجاح.`,`Template saved.`));return}if(r.dataset.action===`update-profile`){if(i.calendarSystem){e.calendarSystem=i.calendarSystem;try{localStorage.setItem(`darc_calendar_system`,i.calendarSystem)}catch{}}let n=await O(`/api/users/me`,{method:`PATCH`,body:JSON.stringify(i)});if(n.user){e.data.user={...e.data.user,...n.user};let r=(e.data.users||[]).findIndex(n=>n.id===e.data.user.id);r!==-1&&(e.data.users[r]={...e.data.users[r],...n.user})}B(),showToast(choose(`تم حفظ وتحديث الملف الشخصي بنجاح.`,`Profile updated successfully.`)),a&&(a.disabled=!1);return}if(r.dataset.action===`update-company`){let n=await O(`/api/company`,{method:`PATCH`,body:JSON.stringify(i)});n.company&&(e.data.company={...e.data.company,...n.company}),B(),showToast(choose(`تم تحديث بيانات الشركة.`,`Company data updated.`)),a&&(a.disabled=!1);return}if(r.dataset.action===`change-password`){if(i.newPassword.length<10)throw Error(choose(`كلمة المرور يجب أن تكون 10 أحرف على الأقل.`,`Password must be at least 10 characters.`));await O(`/api/auth/change-password`,{method:`POST`,body:JSON.stringify(i)}),r.reset(),showToast(choose(`تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.`,`Password changed successfully. Signed out of other devices.`)),a&&(a.disabled=!1);return}}catch(e){r.id===`activation-form`?renderActivation(i.token,e.message):showToast(e.message,!0)}finally{a&&(a.disabled=!1,a.classList.remove(`is-loading`))}}async function zt(n){let r=document.getElementById(`mention-dropdown`),i=document.getElementById(`project-menu`);if(r&&!n.target.closest(`#mention-dropdown`)&&!n.target.closest(`input[name="content"]`)&&(r.style.display=`none`),i&&!n.target.closest(`#project-menu`)&&!n.target.closest(`[data-action="toggle-project-menu"]`)&&(i.style.display=`none`),n.target.classList.contains(`modal-backdrop`)){closeModal();return}if(n.target.closest(`#task-dropzone`)&&n.target.id!==`task-upload-input`){let e=document.getElementById(`upload-progress-container`);if(!e||e.style.display===`none`){let e=document.getElementById(`task-upload-input`);e&&e.click()}return}let a=n.target.closest(`[data-action], [data-view]`);if(!a)return;let o=a.dataset.action;if(a.classList.contains(`menu-item`)){let e=a.closest(`.dropdown-menu`);e&&(e.style.display=`none`)}if(a.dataset.view)V(a.dataset.view,a.dataset.projectId||void 0);else if(o===`trigger-avatar-upload`){let e=document.getElementById(`user-avatar-file-input`);e&&e.click()}else if(o===`trigger-company-logo-upload`){let e=document.getElementById(`company-logo-file-input`);e&&e.click()}else if(o===`toggle-theme`){e.theme=e.theme===`dark`?`light`:`dark`,window.localStorage.setItem(`darc-theme`,e.theme),document.documentElement.dataset.theme=e.theme;let n=document.querySelector(`[data-action="toggle-theme"]`);n&&(n.textContent=e.theme===`dark`?`☀️`:`🌙`)}else if(o===`toggle-lang`){if(e.lang=e.lang===`ar`?`en`:`ar`,window.localStorage.setItem(`darc-locale`,e.lang),document.documentElement.lang=e.lang,document.documentElement.dir=e.lang===`ar`?`rtl`:`ltr`,document.body.classList.toggle(`is-ltr`,e.lang===`en`),e.data)z();else{let e=new URLSearchParams(window.location.hash.replace(/^#/,``));e.get(`activate`)?renderActivation(e.get(`activate`)):e.get(`reset`)?renderResetPassword(e.get(`reset`)):renderLogin(``,document.getElementById(`forgot-form`)?`forgot`:`login`)}}else if(o===`quick-fill-login`){let e=a.closest(`[data-action="quick-fill-login"]`),n=document.getElementById(`login-email`),r=document.getElementById(`login-password`);n&&e?.dataset?.email&&(n.value=e.dataset.email),r&&e?.dataset?.pass&&(r.value=e.dataset.pass)}else if(o===`goto-forgot`)n.preventDefault(),typeof history<`u`&&history.replaceState&&history.replaceState(null,``,`#forgot`),renderLogin(``,`forgot`);else if(o===`goto-login`)n.preventDefault(),typeof history<`u`&&history.replaceState&&history.replaceState(null,``,`#login`),renderLogin();else if(o===`toggle-sidebar`)e.sidebarOpen=!e.sidebarOpen,document.querySelector(`.sidebar`)?.classList.toggle(`open`,e.sidebarOpen);else if(o===`logout`){await O(`/api/auth/logout`,{method:`POST`}).catch(()=>{});try{typeof localStorage<`u`&&localStorage.removeItem(`darc_token`);let e=await D(()=>import(`./offline-B2e_-E_H.js`).then(e=>e.s),__vite__mapDeps([2,1]));e&&typeof e.clearOfflineBootstrap==`function`&&await e.clearOfflineBootstrap()}catch{try{localStorage.removeItem(`darc_token`),localStorage.removeItem(`darc_offline_bootstrap`),localStorage.removeItem(`darc_offline_queue`)}catch{}}ie(),e.data=null,e.view=`login`,typeof history<`u`&&history.replaceState?history.replaceState(null,``,`#login`):typeof window<`u`&&(window.location.hash=`#login`),renderLogin()}else if(o===`logout-all`){await O(`/api/auth/logout-all`,{method:`POST`}).catch(()=>{});try{typeof localStorage<`u`&&localStorage.removeItem(`darc_token`);let e=await D(()=>import(`./offline-B2e_-E_H.js`).then(e=>e.s),__vite__mapDeps([2,1]));e&&typeof e.clearOfflineBootstrap==`function`&&await e.clearOfflineBootstrap()}catch{try{localStorage.removeItem(`darc_token`),localStorage.removeItem(`darc_offline_bootstrap`),localStorage.removeItem(`darc_offline_queue`)}catch{}}ie(),e.data=null,e.view=`login`,typeof history<`u`&&history.replaceState?history.replaceState(null,``,`#login`):typeof window<`u`&&(window.location.hash=`#login`),renderLogin()}else if(o===`open-omnisearch`)At();else if(o===`close-omnisearch`)G();else if(o===`open-cheatsheet`)Ft();else if(o===`close-modal`)closeModal();else if(o===`show-notifications`)showNotifications();else if(o===`read-notification`){let n=a.dataset.notificationId,r=(e.data?.notifications||[]).find(e=>e.id===n);try{if(await O(`/api/notifications/${n}`,{method:`PATCH`,body:JSON.stringify({})}),r&&(r.read=!0),closeModal(),r?.taskId){let n=(e.data?.tasks||[]).find(e=>e.id===r.taskId);if(n){openTaskModal(n);return}}if(r?.projectId){V(`project-detail`,r.projectId);return}await H()}catch(e){showToast(e.message,!0)}}else if(o===`mark-all-notifications-read`)try{await O(`/api/notifications/read-all`,{method:`POST`}),(e.data?.notifications||[]).forEach(e=>{e.read=!0,e.readAt=new Date().toISOString()}),showNotifications(),z(),showToast(choose(`تم تحديد كافة التنبيهات كمقروءة.`,`All notifications marked as read.`))}catch(e){showToast(e.message,!0)}else if(o===`toggle-project-menu`)i&&(i.style.display=i.style.display===`none`?`block`:`none`);else if(o===`preview-doc`){let e=a.dataset.docId||a.closest(`[data-doc-id]`)?.dataset.docId;e&&He(e)}else if(o===`copy-doc-link`){let n=a.dataset.docId||a.closest(`[data-doc-id]`)?.dataset.docId,r=e.data?.documents?.find(e=>e.id===n);if(r){let e=r.viewLink||r.downloadLink||(r.driveFileId?`https://drive.google.com/file/d/${r.driveFileId}/view`:``);if((!e||e.startsWith(`file://`)||e.startsWith(`/`))&&(e=`${window.location.origin}/api/documents/${r.id}`),e)try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(e);else{let n=document.createElement(`textarea`);n.value=e,document.body.appendChild(n),n.select(),document.execCommand(`copy`),n.remove()}showToast(choose(`تم نسخ رابط الملف إلى الحافظة بنجاح.`,`Document link copied to clipboard.`))}catch{window.prompt(choose(`انسخ رابط الملف من هنا:`,`Copy document link:`),e)}else showToast(choose(`لا يوجد رابط متاح لهذا الملف.`,`No link available for this document.`),!0)}}else if(o===`trigger-upload`){let e=document.getElementById(`upload-progress-container`);if(!e||e.style.display===`none`){let e=document.getElementById(`task-upload-input`);e&&e.click()}}else if(o===`open-upload-drawing-modal`)typeof openUploadDrawingModal==`function`?openUploadDrawingModal(a.dataset.projectId||null):(await D(()=>Promise.resolve().then(()=>dt),void 0)).openUploadDrawingModal(a.dataset.projectId||null);else if(o===`new-project`)openProjectModal();else if(o===`edit-project`){let n=e.data.projects.find(e=>e.id===a.dataset.projectId);n&&openProjectModal(n)}else if(o===`clone-project`){let n=e.data.projects.find(e=>e.id===a.dataset.projectId);n&&openCloneModal(n)}else if(o===`rename-doc`){let n=a.dataset.docId,r=e.data?.documents?.find(e=>e.id===n);if(!r)return;let i=window.prompt(choose(`أدخل الاسم الجديد:`,`Enter new name:`),r.originalName);if(!i||i===r.originalName)return;try{await O(`/api/documents/${n}`,{method:`PATCH`,body:JSON.stringify({originalName:i})}),r.originalName=i,await H(!0);let a=e.data?.tasks?.find(e=>e.id===r.taskId);if(a){let e=document.getElementById(`task-documents-list`);e&&(e.innerHTML=N(a))}}catch(e){showToast(e.message,!0)}}else if(o===`go-to-trash`)e.settingsSection=`trash`,e.trashLoaded=!1,V(`settings`);else if(o===`delete-doc`){if(!window.confirm(choose(`هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.`,`Are you sure you want to move this document to trash? You can restore it within 30 days.`)))return;let n=a.dataset.docId,r=e.data?.documents?.find(e=>e.id===n)?.taskId;try{if(await O(`/api/documents/${n}`,{method:`DELETE`}),e.data?.documents&&(e.data.documents=e.data.documents.filter(e=>e.id!==n)),e.trashLoaded=!1,await H(!0),showToast(choose(`تم نقل المستند إلى سلة المهملات بنجاح.`,`Document moved to trash successfully.`)),r){let n=e.data?.tasks?.find(e=>e.id===r);if(n){let e=document.getElementById(`task-documents-list`);e&&(e.innerHTML=N(n))}}}catch(e){showToast(e.message,!0)}}else if(o===`delete-project`){if(!window.confirm(choose(`هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.`,`Are you sure you want to delete this project? It will be archived.`)))return;let n=[...e.data.projects||[]];e.data.projects=e.data.projects.filter(e=>e.id!==a.dataset.projectId),closeModal(),V(`projects`),showToast(choose(`جاري حذف المشروع...`,`Deleting project...`));try{await O(`/api/projects/${a.dataset.projectId}`,{method:`DELETE`}),e.trashLoaded=!1,typeof navigator<`u`&&navigator.onLine&&await H(!0),showToast(choose(`تم حذف المشروع بنجاح.`,`Project deleted successfully.`))}catch(r){e.data.projects=n,B(),showToast(r.message,!0)}}else if(o===`delete-task`){if(!window.confirm(choose(`هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.`,`Are you sure you want to delete this task? It will be moved to trash.`)))return;let n=a.dataset.taskId,r=[...e.data.tasks||[]];e.data.tasks=e.data.tasks.filter(e=>e.id!==n),closeModal(),B(),showToast(choose(`جاري حذف المهمة...`,`Deleting task...`));try{await O(`/api/tasks/${n}`,{method:`DELETE`}),e.trashLoaded=!1,typeof navigator<`u`&&navigator.onLine&&await H(!0),showToast(choose(`تم حذف المهمة بنجاح.`,`Task deleted successfully.`))}catch(n){e.data.tasks=r,B(),showToast(n.message,!0)}}else if(o===`edit-task-comment`){let n=a.dataset.commentId,r=a.dataset.taskId,i=(e.data.comments||[]).find(e=>e.id===n);if(!i)return;let o=window.prompt(choose(`تعديل التعليق:`,`Edit comment:`),i.content);if(o===null)return;let s=o.trim();if(!s){showToast(choose(`لا يمكن ترك التعليق فارغاً.`,`Comment cannot be empty.`),!0);return}if(s===i.content)return;try{let i=await O(`/api/tasks/${r}/comments/${n}`,{method:`PATCH`,body:JSON.stringify({content:s})});if(i.comment){let a=(e.data.comments||[]).findIndex(e=>e.id===n);a!==-1&&(e.data.comments[a]=i.comment);let o=(e.data.tasks||[]).find(e=>e.id===r),s=document.getElementById(`task-comments-list`);s&&o&&(s.innerHTML=renderTaskComments(o)),showToast(choose(`تم تعديل التعليق بنجاح.`,`Comment updated successfully.`))}}catch(e){showToast(e.message,!0)}}else if(o===`delete-task-comment`){let n=a.dataset.commentId,r=a.dataset.taskId;if(!window.confirm(choose(`هل أنت متأكد من حذف هذا التعليق؟`,`Are you sure you want to delete this comment?`)))return;try{await O(`/api/tasks/${r}/comments/${n}`,{method:`DELETE`}),e.data.comments&&(e.data.comments=e.data.comments.filter(e=>e.id!==n));let i=(e.data.tasks||[]).find(e=>e.id===r),a=document.getElementById(`task-comments-list`);a&&i&&(a.innerHTML=renderTaskComments(i)),showToast(choose(`تم حذف التعليق بنجاح.`,`Comment deleted successfully.`))}catch(e){showToast(e.message,!0)}}else if(o===`manual-sync`){if(typeof navigator<`u`&&!navigator.onLine){showToast(choose(`أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡`,`You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡`),!1);return}let e=s();if(!e.length){showToast(choose(`جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️`,`All data is completely synchronized with cloud server ✔️`),!1);return}showToast(choose(`جاري مزامنة ${e.length} عمليات معلقة مع السيرفر...`,`Syncing ${e.length} pending actions with server...`),!1);let n=await f(O);n.synced>0?(showToast(choose(`تمت مزامنة ${n.synced} عمليات بنجاح! 🚀`,`Successfully synced ${n.synced} actions! 🚀`),!1),await loadData()):n.failed>0&&showToast(choose(`فشلت مزامنة ${n.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${n.failed} actions, please try again.`),!0)}else if(o===`new-task`)openTaskModal(null,null,a.dataset.projectId);else if(o===`new-user`)openUserModal();else if(o===`new-role`)openRoleModal();else if(o===`new-template`)openTemplateModal();else if(o===`edit-template`){let n=e.data.templates.find(e=>e.id===a.dataset.templateId);n&&openTemplateModal(n)}else if(o===`delete-template`){if(!window.confirm(choose(`هل أنت متأكد من حذف هذا القالب؟`,`Are you sure you want to delete this template?`)))return;let n=[...e.data.templates||[]];e.data.templates=e.data.templates.filter(e=>e.id!==a.dataset.templateId),B(),closeModal();try{await O(`/api/templates/${a.dataset.templateId}`,{method:`DELETE`}),await H(!0),showToast(choose(`تم حذف القالب.`,`Template deleted.`))}catch(r){e.data.templates=n,B(),showToast(r.message,!0)}}else if(o===`open-project`)e.projectTab=`tasks`,e.projectMemberFilter=null,V(`project-detail`,a.dataset.projectId);else if(o===`filter-by-member`){let n=a.dataset.memberId;e.projectMemberFilter=e.projectMemberFilter===n?null:n,e.projectTab=`tasks`,requestAnimationFrame(()=>B())}else if(o===`clear-member-filter`)e.projectMemberFilter=null,requestAnimationFrame(()=>B());else if(o===`back-to-projects`)e.projectMemberFilter=null,V(`projects`,null);else if(o===`project-tab`){e.projectTab=a.dataset.tab,a.closest(`.detail-tabs`)?.querySelectorAll(`.detail-tab`).forEach(e=>e.classList.toggle(`active`,e===a));let n=document.getElementById(`main-content`);n&&(n.scrollTop=0),requestAnimationFrame(()=>B())}else if(o===`toggle-timeline-view`)e.timelineView=a.dataset.viewMode||`gantt`,requestAnimationFrame(()=>B());else if(o===`prev-calendar-month`){let n=e.calendarDate?new Date(e.calendarDate):new Date;n.setMonth(n.getMonth()-1),e.calendarDate=n,requestAnimationFrame(()=>B())}else if(o===`next-calendar-month`){let n=e.calendarDate?new Date(e.calendarDate):new Date;n.setMonth(n.getMonth()+1),e.calendarDate=n,requestAnimationFrame(()=>B())}else if(o===`today-calendar-month`)e.calendarDate=new Date,requestAnimationFrame(()=>B());else if(o===`open-task`){if(window._justDroppedAt&&Date.now()-window._justDroppedAt<250)return;let n=e.data.tasks.find(e=>e.id===a.dataset.taskId);n&&openTaskModal(n)}else if(o===`task-filter`)e.taskFilter=a.dataset.filter,a.closest(`.view-toolbar-start`)?.querySelectorAll(`.filter-tab`).forEach(e=>e.classList.toggle(`active`,e===a)),requestAnimationFrame(()=>B());else if(o===`template-category`)e.templateCategory=a.dataset.category,requestAnimationFrame(()=>B());else if(o===`use-template`){if(!e.data.projects.length)return showToast(t(`noProjects`),!0);openTaskModal(null,a.dataset.templateId,e.activeProjectId)}else if(o===`open-user`){let n=e.data.users.find(e=>e.id===a.dataset.userId);n&&openUserModal(n)}else if(o===`impersonate-user`){if(!window.confirm(`هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً.`))return;try{let e=await O(`/api/users/${a.dataset.userId}/impersonate`,{method:`POST`});e&&e.token&&typeof localStorage<`u`&&localStorage.setItem(`darc_token`,e.token),window.location.reload()}catch(e){showToast(e.message,!0)}}else if(o===`force-password-user`){let n=e.data.users.find(e=>e.id===a.dataset.userId);n&&openForcePasswordModal(n)}else if(o===`invite-user`)try{let e=await O(`/api/users/${a.dataset.userId}/invite`,{method:`POST`});await H(),showToast(e.emailConfigured?choose(`تم إرسال الدعوة.`,`Invitation sent.`):choose(`تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.`,`Invite prepared, but the email provider is not configured.`))}catch(e){showToast(e.message,!0)}else if(o===`deactivate-user`){if(!window.confirm(t(`confirmDeactivate`)))return;let n=a.dataset.userId,r=e.data.users.find(e=>e.id===n),i=r?r.status:null;r&&(r.status=`inactive`),B(),closeModal();try{await O(`/api/users/${n}`,{method:`DELETE`}),await H(!0),showToast(choose(`تم تعطيل الحساب.`,`Account deactivated.`))}catch(e){r&&(r.status=i),B(),showToast(e.message,!0)}}else if(o===`settings-section`)e.settingsSection=a.dataset.section,a.closest(`.settings-nav`)?.querySelectorAll(`.settings-nav-item`).forEach(e=>e.classList.toggle(`active`,e===a)),e.settingsSection===`trash`&&!e.trashLoaded&&O(`/api/trash`).then(n=>{e.trash=Array.isArray(n)?n:n.trash||[...(n.projects||[]).map(e=>({...e,type:`project`})),...(n.tasks||[]).map(e=>({...e,type:`task`})),...(n.documents||[]).map(e=>({...e,type:`document`}))],e.trashLoaded=!0,B()}).catch(e=>console.error(e)),requestAnimationFrame(()=>B());else if(o===`restore-item`)try{await O(`/api/restore/${a.dataset.type}/${a.dataset.id}`,{method:`POST`});let n=await O(`/api/trash`);e.trash=Array.isArray(n)?n:n.trash||[...(n.projects||[]).map(e=>({...e,type:`project`})),...(n.tasks||[]).map(e=>({...e,type:`task`})),...(n.documents||[]).map(e=>({...e,type:`document`}))],await H(),showToast(choose(`تمت الاستعادة بنجاح.`,`Restored successfully.`))}catch(e){showToast(e.message,!0)}else if(o===`filter-trash`)e.trashFilter=a.dataset.filter,requestAnimationFrame(()=>B());else if(o===`purge-trash-item`){let n=a.dataset.type,r=a.dataset.id;if(!window.confirm(choose(`هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.`,`Are you sure you want to permanently delete this item? This action cannot be undone.`)))return;try{await O(`/api/trash/${n}/${r}`,{method:`DELETE`});let i=await O(`/api/trash`);e.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(e=>({...e,type:`project`})),...(i.tasks||[]).map(e=>({...e,type:`task`})),...(i.documents||[]).map(e=>({...e,type:`document`}))],B(),showToast(choose(`تم حذف العنصر نهائياً بنجاح.`,`Item permanently deleted.`))}catch(e){showToast(e.message,!0)}}else if(o===`empty-trash`){if(!window.confirm(choose(`هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.`,`Are you sure you want to empty the entire recycle bin? All items will be permanently erased.`)))return;try{await O(`/api/trash/empty`,{method:`DELETE`}),e.trash=[],B(),showToast(choose(`تم إفراغ سلة المهملات بالكامل بنجاح.`,`Trash bin emptied successfully.`))}catch(e){showToast(e.message,!0)}}else if(o===`open-role`){let n=e.data.roles.find(e=>e.id===a.dataset.roleId);n&&openRoleModal(n)}else if(o===`delete-role`){if(!window.confirm(t(`confirmDeleteRole`)))return;let n=a.dataset.roleId,r=[...e.data.roles||[]];e.data.roles=e.data.roles.filter(e=>e.id!==n),B(),closeModal();try{await O(`/api/roles/${n}`,{method:`DELETE`}),await H(!0),showToast(choose(`تم حذف الدور.`,`Role deleted.`))}catch(n){e.data.roles=r,B(),showToast(n.message,!0)}}else if(o===`export-csv`){if(!can(`export_reports`)&&!isAdmin()){showToast(choose(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}exportPortfolioXLS()}else if(o===`export-project`){if(!can(`export_reports`)&&!isAdmin()){showToast(choose(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}exportProjectXLS(a.dataset.projectId)}}var Bt=null;function Vt(n){if(n.target.name===`content`&&n.target.closest(`#task-comment-form`)){let r=n.target.value,i=r.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),a=document.getElementById(`mention-dropdown`);if(i){let o=i[1].toLowerCase(),s=(e.data?.users||[]).filter(e=>e.status!==`inactive`).filter(e=>`${e.name||``} ${e.nameEn||``} ${e.email||``}`.toLowerCase().includes(o));s.length?(a.innerHTML=s.map(e=>{let n=(e.name||e.nameEn||e.email||`user`).trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${esc(n)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${avatar(e,`avatar-sm`)}
              <span style="font-size:12px;">${esc(choose(e.name,e.nameEn||e.name))}</span>
            </div>
          `}).join(``),a.style.display=`block`,a.querySelectorAll(`.mention-option`).forEach(e=>{e.onclick=()=>{let i=e.dataset.username;n.target.value=r.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${i} `),a.style.display=`none`,n.target.focus()}})):a.style.display=`none`}else a.style.display=`none`}if(n.target.dataset.action===`search-trash-input`){e.trashQuery=n.target.value;let r=n.target.selectionStart;clearTimeout(Bt),Bt=setTimeout(()=>{B();let e=document.querySelector(`[data-action="search-trash-input"]`);e&&(e.focus(),e.setSelectionRange(r,r))},120);return}let r=n.target.dataset.search||(n.target.dataset.action===`search-documents`?`documents`:null);if(!r)return;e.searches[r]=n.target.value;let i=n.target.selectionStart;clearTimeout(Bt),Bt=setTimeout(()=>{B();let e=document.querySelector(`[data-search="${r}"], [data-action="search-documents"]`);e&&(e.focus(),e.setSelectionRange(i,i))},120)}async function Ht(n){if(n.target.dataset.action===`change-doc-status`){let r=n.target.dataset.docId,i=n.target.value,a=e.data?.documents?.find(e=>e.id===r);if(!a)return;try{await O(`/api/documents/${r}`,{method:`PATCH`,body:JSON.stringify({status:i})}),a.status=i,showToast(choose(`تم تحديث حالة المخطط بنجاح ✅`,`Drawing status updated ✅`)),await H(!0)}catch(e){showToast(e.message,!0)}}else if(n.target.dataset.action===`doc-project-filter`)e.docProjectFilter=n.target.value,B();else if(n.target.dataset.action===`filter-project-docs-task`)e.docTaskFilter=n.target.value,B();else if(n.target.dataset.action===`sort-project-tasks`||n.target.dataset.action===`sort-my-tasks`)De(n.target.value),B();else if(n.target.name===`templateId`&&n.target.form?.id===`task-form`){let r=n.target.form,i=n.target.value,a=e.data.templates?.find(e=>e.id===i),o=r.querySelector(`input[name="titleAr"]`),s=r.querySelector(`input[name="titleEn"]`),c=r.querySelector(`#task-type-ar`),l=r.querySelector(`#task-type-en`),u=r.querySelector(`textarea[name="descriptionAr"]`);a?(o&&(!o.value||r.dataset.templateSelected===`true`)&&(o.value=a.nameAr),s&&(!s.value||r.dataset.templateSelected===`true`)&&(s.value=a.nameEn||``),c&&(c.value=a.typeAr||`مخطط`),l&&(l.value=a.typeEn||`Drawing`),u&&(!u.value||r.dataset.templateSelected===`true`)&&(u.value=a.descriptionAr||``),r.dataset.templateSelected=`true`):(c&&(c.value=``),l&&(l.value=``),delete r.dataset.templateSelected)}else if(n.target.name===`status`&&n.target.form?.id===`task-form`){let e=n.target.form.querySelector(`#task-auto-progress-badge`);if(e){let r={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.target.value];e.textContent=r===void 0?``:`(${r}%)`}}else if(n.target.dataset.action===`task-project-filter`)e.taskProjectFilter=n.target.value,B();else if(n.target.dataset.action===`task-priority-filter`)e.taskPriorityFilter=n.target.value,B();else if(n.target.id===`sort-projects`||n.target.dataset?.action===`sort-projects`)e.projectSort=n.target.value,B();else if(n.target.id===`task-upload-input`){let e=n.target.files;if(!e.length)return;let r=n.target.dataset.taskId;Jt(e,r)}else if(n.target.classList.contains(`doc-status-select`)){let e=n.target.dataset.docId,r=n.target.value;O(`/api/documents/${e}`,{method:`PATCH`,body:JSON.stringify({status:r})}).then(()=>{H(!0).then(()=>showToast(choose(`تم تحديث حالة المخطط.`,`Document status updated.`)))}).catch(e=>showToast(e.message,!0))}else if(n.target.id===`user-avatar-file-input`){let r=n.target.files?.[0];if(!r)return;if(r.size>2621440){showToast(choose(`حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.`,`Image is too large. Maximum allowed size is 2MB.`),!0),n.target.value=``;return}if(!r.type.startsWith(`image/`)){showToast(choose(`يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).`,`Please select a valid image file (JPG, PNG, WebP).`),!0),n.target.value=``;return}try{showToast(choose(`جاري معالجة ورفع صورتك الشخصية...`,`Processing & uploading avatar...`));let i=await Ut(r,256,256),a=await O(`/api/users/me`,{method:`PATCH`,body:JSON.stringify({avatarUrl:i})});if(a.user){e.data.user={...e.data.user,...a.user};let n=(e.data.users||[]).findIndex(n=>n.id===e.data.user.id);n!==-1&&(e.data.users[n]={...e.data.users[n],...a.user})}n.target.value=``,z(),S(),showToast(choose(`تم تحديث صورتك الشخصية وتثبيتها بنجاح!`,`Avatar updated successfully!`))}catch(e){n.target.value=``,showToast(e.message,!0)}}else if(n.target.id===`company-logo-file-input`){let r=n.target.files?.[0];if(!r)return;if(r.size>3145728){showToast(choose(`حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.`,`Logo is too large. Maximum allowed size is 3MB.`),!0),n.target.value=``;return}if(!r.type.startsWith(`image/`)){showToast(choose(`يرجى اختيار ملف صورة أو شعار صالح.`,`Please select a valid logo image file.`),!0),n.target.value=``;return}try{showToast(choose(`جاري معالجة ورفع شعار الشركة...`,`Uploading company logo...`));let i=await Ut(r,400,400),a=await O(`/api/company`,{method:`PATCH`,body:JSON.stringify({logoUrl:i})});a.company&&(e.data.company={...e.data.company,...a.company}),n.target.value=``,z(),S(),showToast(choose(`تم تحديث وتثبيت شعار مساحة العمل بنجاح!`,`Company logo updated successfully!`))}catch(e){n.target.value=``,showToast(e.message,!0)}}}function Ut(e,n=300,r=300){return new Promise((i,a)=>{let o=new FileReader;o.onerror=a,o.onload=()=>{let a=new Image;a.onerror=()=>i(o.result),a.onload=()=>{try{let{width:o,height:s}=a;if(o>n||s>r){let e=Math.min(n/o,r/s);o=Math.round(o*e),s=Math.round(s*e)}let c=document.createElement(`canvas`);c.width=o,c.height=s,c.getContext(`2d`).drawImage(a,0,0,o,s),i(c.toDataURL(e.type===`image/png`?`image/png`:`image/jpeg`,.88))}catch{i(o.result)}},a.src=o.result},o.readAsDataURL(e)})}function Wt({url:e,chunk:n,contentRange:r,headers:i={},onProgress:a}){return new Promise((o,s)=>{let c=new XMLHttpRequest;c.open(`PUT`,e,!0);for(let[e,n]of Object.entries(i))c.setRequestHeader(e,n);r&&c.setRequestHeader(`Content-Range`,r),c.upload&&a&&(c.upload.onprogress=e=>{e.lengthComputable&&a(e.loaded)}),c.onload=()=>{o({status:c.status,ok:c.status>=200&&c.status<300,headers:{get:e=>c.getResponseHeader(e)},responseText:c.responseText,json:()=>{try{return JSON.parse(c.responseText)}catch{return{}}}})},c.onerror=()=>s(Error(`Network connection error`)),c.ontimeout=()=>s(Error(`Upload chunk timeout`)),c.timeout=18e4,c.send(n)})}async function Gt(e,n){try{let r=await Wt({url:e,chunk:new Blob([]),contentRange:`bytes */${n}`});if(r.status===308){let e=r.headers.get(`Range`);if(e){let n=e.match(/bytes=0-(\d+)/);if(n&&n[1])return parseInt(n[1],10)+1}return 0}if(r.ok)return{completed:!0,data:r.json()}}catch{}return null}var Kt=null;function qt({projectName:n,taskName:r,totalFiles:i}){Kt&&=(clearTimeout(Kt),null);let a=document.getElementById(`floating-upload-manager`);if(a){a.style.opacity=`1`,a.style.transform=`none`;let e=a.querySelector(`#fum-proj-text`),i=a.querySelector(`#fum-task-text`);e&&n&&(e.textContent=n),i&&r&&(i.textContent=r)}else{a=document.createElement(`div`),a.id=`floating-upload-manager`,a.setAttribute(`dir`,e.lang===`ar`?`rtl`:`ltr`),a.style.cssText=`
      position: fixed;
      bottom: 24px;
      inset-inline-start: 24px;
      z-index: 99999;
      width: 360px;
      max-width: calc(100vw - 48px);
      background: var(--surface);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--line);
      border-radius: var(--radius-md, 14px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22), 0 0 0 1px var(--line);
      color: var(--ink);
      font-family: inherit;
      overflow: hidden;
      transition: transform 0.25s ease, opacity 0.25s ease;
    `,a.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--surface-soft);border-bottom:1px solid var(--line);">
        <div style="display:flex;align-items:center;gap:8px;">
          <span id="fum-indicator" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);"></span>
          <strong id="fum-header-title" style="font-size:12.5px;color:var(--ink);">${choose(`رفع الملفات في الخلفية`,`Background File Upload`)}</strong>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <button id="fum-minimize-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:13px;line-height:1;border-radius:4px;" title="${choose(`تصغير / توسيع`,`Minimize / Expand`)}">—</button>
          <button id="fum-close-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:15px;line-height:1;border-radius:4px;display:none;" title="${choose(`إغلاق`,`Close`)}">✕</button>
        </div>
      </div>
      <div id="fum-body" style="padding:12px 14px;display:flex;flex-direction:column;gap:9px;">
        <div style="display:flex;flex-direction:column;gap:3px;font-size:11.5px;color:var(--ink-soft);">
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${choose(`المشروع:`,`Project:`)}</span>
            <span id="fum-proj-text" style="color:var(--ink);font-weight:600;">${esc(n||`—`)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${choose(`المهمة:`,`Task:`)}</span>
            <span id="fum-task-text" style="color:var(--ink-soft);">${esc(r||`—`)}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;">
          <span id="fum-file-text" style="color:var(--ink);font-weight:600;max-width:230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">...</span>
          <span id="fum-count-text" style="color:var(--muted);font-size:11px;">(1/${i})</span>
        </div>
        <div style="width:100%;height:6px;background:var(--line);border-radius:999px;overflow:hidden;">
          <div id="fum-progress-fill" style="width:0%;height:100%;background:var(--teal);border-radius:999px;transition:width 0.15s ease;"></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--ink-soft);">
          <span id="fum-pct-text" style="font-weight:700;color:var(--teal);">0%</span>
          <span id="fum-speed-text">0 MB / 0 MB</span>
          <span id="fum-eta-text" style="color:var(--muted);">—</span>
        </div>
        <div id="fum-status-badge" style="display:none;font-size:11px;padding:4px 8px;border-radius:6px;"></div>
      </div>
    `,document.body.appendChild(a);let o=a.querySelector(`#fum-minimize-btn`),s=a.querySelector(`#fum-body`);o.addEventListener(`click`,()=>{let e=s.style.display===`none`;s.style.display=e?`flex`:`none`,o.textContent=e?`—`:`+`}),a.querySelector(`#fum-close-btn`).addEventListener(`click`,()=>{a.remove()})}return a}function K({fileName:e,fileIndex:n,totalFiles:r,pct:i,loadedMB:a,fileSizeMB:o,speedMBs:s,etaText:c,statusNote:l,isError:u,isDone:d}){let f=document.getElementById(`floating-upload-manager`);if(!f)return;let p=f.querySelector(`#fum-file-text`),m=f.querySelector(`#fum-count-text`),h=f.querySelector(`#fum-progress-fill`),g=f.querySelector(`#fum-pct-text`),_=f.querySelector(`#fum-speed-text`),v=f.querySelector(`#fum-eta-text`),y=f.querySelector(`#fum-status-badge`),b=f.querySelector(`#fum-indicator`),x=f.querySelector(`#fum-header-title`),S=f.querySelector(`#fum-close-btn`);e&&p&&(p.textContent=e),m&&n&&r&&(m.textContent=`(${n}/${r})`),h&&typeof i==`number`&&(h.style.width=`${i}%`),g&&typeof i==`number`&&(g.textContent=`${i}%`),_&&a!==void 0&&o!==void 0&&(_.textContent=`${a} / ${o} MB • ${s||`0.0`} MB/s`),v&&c&&(v.textContent=`${choose(`متبقي:`,`ETA:`)} ${c}`),l&&y?(y.style.display=`block`,y.textContent=l,y.style.background=u?`var(--red-soft)`:`var(--amber-soft)`,y.style.color=u?`var(--red)`:`var(--amber)`,y.style.border=u?`1px solid var(--red)`:`1px solid var(--amber)`):!u&&!d&&y&&(y.style.display=`none`),d&&(b&&(b.style.background=`var(--mint-strong)`,b.style.boxShadow=`0 0 10px var(--mint-strong)`),x&&(x.textContent=choose(`اكتمل الرفع بنجاح! ✓`,`Upload Complete! ✓`)),g&&(g.textContent=`100%`),h&&(h.style.width=`100%`),S&&(S.style.display=`inline-block`),y&&(y.style.display=`block`,y.style.background=`var(--mint)`,y.style.color=`var(--teal-dark)`,y.style.border=`1px solid var(--mint-strong)`,y.textContent=choose(`تم التوثيق والرفع إلى الخادم بنجاح.`,`Document saved & uploaded to server.`)),Kt=setTimeout(()=>{f&&f.parentNode&&(f.style.opacity=`0`,f.style.transform=`translateY(12px)`,setTimeout(()=>f.remove(),300))},4500)),u&&(b&&(b.style.background=`var(--red)`,b.style.boxShadow=`0 0 10px var(--red)`),x&&(x.textContent=choose(`فشل في الرفع ✕`,`Upload Failed ✕`)),S&&(S.style.display=`inline-block`))}async function Jt(n,r){if(!n||!n.length||!r)return;let i=e.data?.tasks?.find(e=>e.id===r);return Yt({files:n,taskId:r,projectId:i?.projectId,status:`draft`,isTaskModal:!0})}async function Yt({files:n,projectId:r=null,taskId:i=null,discipline:a=`عام`,status:o=`draft`,isTaskModal:s=!1}){if(!n||!n.length)return;if(typeof navigator<`u`&&!navigator.onLine){showToast(choose(`لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.`,`Cannot upload drawings or files while offline. Please connect to the internet first.`),!0);return}let c=i?e.data?.tasks?.find(e=>e.id===i):null,l=r||c?.projectId,u=l?e.data?.projects?.find(e=>e.id===l):null,d=e.data?.documents?e.data.documents.filter(e=>!e.deletedAt&&(i?e.taskId===i:e.projectId===l)):[],f=u?u.nameAr:`Project`,p=c?c.titleAr:a||`General`,m={},h=e=>{if(m[e])return m[e];let n=0;return d.forEach(r=>{if(r.originalName&&r.originalName.toLowerCase().endsWith(e)){let e=r.originalName.match(/_v(\d+)\./);e&&parseInt(e[1])>n&&(n=parseInt(e[1]))}}),m[e]=n+1,n+1},g=document.getElementById(`upload-progress-container`);document.getElementById(`upload-progress-bar`),document.getElementById(`upload-progress-percent`),document.getElementById(`upload-progress-text`);let _=document.getElementById(`task-dropzone`);s&&g&&(g.style.display=`block`),s&&_&&(_.style.pointerEvents=`none`),qt({projectName:f,taskName:p,totalFiles:n.length});let v=null,y=e=>(e.preventDefault(),e.returnValue=choose(`جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.`,`Uploading large engineering files. Leaving will abort upload.`),e.returnValue);if(typeof window<`u`&&(window.addEventListener(`beforeunload`,y),`wakeLock`in navigator))try{navigator.wakeLock.request(`screen`).then(e=>{v=e}).catch(()=>{})}catch{}try{for(let e=0;e<n.length;e++){let r=n[e];if(!r.size||r.size===0){showToast(choose(`الملف "${r.name}" فارغ لا يحتوي على بيانات.`,`File "${r.name}" is empty.`),!0);continue}if(r.size>107374182400){showToast(choose(`حجم الملف "${r.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${r.name}" exceeds 100GB limit.`),!0);continue}let a=r.name.split(`.`).pop()?.toLowerCase()||``;if([`exe`,`bat`,`cmd`,`sh`,`bash`,`ps1`,`vbs`,`js`,`mjs`,`cjs`,`py`,`php`,`phtml`,`html`,`htm`,`jar`,`msi`,`dll`,`com`,`scr`,`hta`,`svg`,`apk`].includes(a)||r.type===`image/svg+xml`){showToast(choose(`صيغة الملف "${r.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${r.name}" is not permitted for security reasons.`),!0);continue}let c=r.name.lastIndexOf(`.`),u=c===-1?``:r.name.substring(c).toLowerCase(),d=`${f}_${p}_${c===-1?r.name:r.name.substring(0,c)}_v${h(u)}${u}`,m=r.size>=1073741824?`${(r.size/1073741824).toFixed(2)} GB`:`${(r.size/1048576).toFixed(1)} MB`;K({fileName:r.name,fileIndex:e+1,totalFiles:n.length,pct:0,loadedMB:`0.0`,fileSizeMB:m,speedMBs:`0.0`,etaText:`...`,statusNote:choose(`بدء جلسة الرفع المستأنف...`,`Starting resumable session...`)});let g=await fetch(`${ae}/api/documents/session`,{method:`POST`,credentials:`include`,headers:{"Content-Type":`application/json`},body:JSON.stringify({compiledName:d,mimeType:r.type||`application/octet-stream`,projectId:l,taskId:i,size:r.size})}),_=await g.json();if(!g.ok)throw Error(_.error||`Failed to start upload session`);let v=_.sessionUrl,y=8388608;y=r.size<=10485760?r.size:r.size<=104857600?8388608:r.size<=524288e3?16777216:r.size<=2147483648?33554432:67108864;let b=Date.now(),x=0,S=i=>{let a=Math.min(r.size,x+i),o=Math.min(100,Math.round(a/r.size*100)),c=a>=1073741824?`${(a/1073741824).toFixed(2)} GB`:`${(a/1048576).toFixed(1)} MB`;if(s){let i=document.getElementById(`upload-progress-bar`),s=document.getElementById(`upload-progress-percent`),l=document.getElementById(`upload-progress-text`),u=document.getElementById(`upload-progress-container`);u&&(u.style.display=`block`),i&&(i.style.width=`${o}%`),s&&(s.textContent=`${o}%`);let d=(Date.now()-b)/1e3,f=a/Math.max(d,.2),p=(f/1048576).toFixed(1),h=Math.max(0,r.size-a),g=Math.round(h/Math.max(f,1)),_=g<60?`${g} ${choose(`ثانية`,`s`)}`:`${Math.floor(g/60)}:${String(g%60).padStart(2,`0`)} ${choose(`دقيقة`,`min`)}`;l&&(l.textContent=`${choose(`رفع إلى الخادم`,`Uploading to server`)} (${e+1}/${n.length}): ${r.name} — ${c} / ${m} (${o}%) • ${p} MB/s • ${choose(`متبقي:`,`ETA:`)} ${_}`)}let l=(Date.now()-b)/1e3,u=a/Math.max(l,.2),d=(u/1048576).toFixed(1),f=Math.max(0,r.size-a),p=Math.round(f/Math.max(u,1)),h=p<60?`${p} s`:`${Math.floor(p/60)}m`;K({fileName:r.name,fileIndex:e+1,totalFiles:n.length,pct:o,loadedMB:c,fileSizeMB:m,speedMBs:d,etaText:h})};S(0);let C=0,w=null,T=!1;for(;C<r.size;){let a=Math.min(C+y,r.size),s=r.slice(C,a),c=`bytes ${C}-${a-1}/${r.size}`,u=0,f=!1;for(;!f&&u<5;)try{let e;if(!T)try{e=await Wt({url:v,chunk:s,contentRange:c,headers:{},onProgress:e=>S(e)})}catch(e){console.warn(`[Upload] Direct GDrive upload failed, trying backend proxy:`,e.message),T=!0}if(T){let n={projectId:l,taskId:i,compiledName:d,mimeType:r.type,size:r.size,status:o};e=await Wt({url:`${ae}/api/documents/chunk`,chunk:s,contentRange:c,headers:{"x-session-url":v,"x-doc-meta":encodeURIComponent(JSON.stringify(n))},onProgress:e=>S(e)})}if(e.status===308){let n=e.headers.get(`Range`);if(n){let e=n.match(/bytes=0-(\d+)/);C=e&&e[1]?parseInt(e[1],10)+1:a}else C=a;x=C,S(0),f=!0}else if(e.ok){let n=e.json();w=n.id||n.document?.id,x=r.size,S(0),C=r.size,f=!0;break}else throw Error(`Upload returned status ${e.status}`)}catch(i){if(u++,K({fileName:r.name,fileIndex:e+1,totalFiles:n.length,statusNote:`${choose(`إعادة المحاولة`,`Retrying`)} (${u}/5)...`}),u>=5)throw Error(`${choose(`فشل الرفع بعد محاولات متعددة`,`Upload failed after multiple retries`)}: ${i.message}`);await new Promise(e=>setTimeout(e,1e3*2**(u-1)));let a=await Gt(v,r.size);if(typeof a==`number`&&a>C){C=a,x=C;break}if(a&&a.completed){w=a.data?.id,C=r.size,f=!0;break}}}w&&!w.startsWith(`doc_`)&&await O(`/api/documents/finalize`,{method:`POST`,body:JSON.stringify({driveFileId:w,projectId:l,taskId:i,compiledName:d,mimeType:r.type,size:r.size,status:o})})}if(await H(!0),s&&i){let n=e.data?.tasks?.find(e=>e.id===i),r=document.getElementById(`task-documents-list`);r&&n&&(r.innerHTML=N(n))}S(),K({fileIndex:n.length,totalFiles:n.length,pct:100,isDone:!0}),showToast(choose(`تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅`,`Drawing uploaded & registered successfully ✅`))}catch(e){K({isError:!0,statusNote:e.message}),showToast(e.message,!0)}finally{if(typeof window<`u`&&window.removeEventListener(`beforeunload`,y),v){try{v.release()}catch{}v=null}if(s){let e=document.getElementById(`upload-progress-container`),n=document.getElementById(`upload-progress-bar`),r=document.getElementById(`task-dropzone`);e&&(e.style.display=`none`),n&&(n.style.width=`0%`),r&&(r.style.pointerEvents=`auto`);let i=document.getElementById(`task-upload-input`);i&&(i.value=``)}}}typeof window<`u`&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener(`dragover`,e=>{let n=e.target.closest(`#task-dropzone`);n&&(e.preventDefault(),n.style.borderColor=`var(--brand-teal)`,n.style.background=`var(--teal-soft)`)}),document.addEventListener(`dragleave`,e=>{let n=e.target.closest(`#task-dropzone`);n&&(n.style.borderColor=`var(--border)`,n.style.background=`var(--surface-soft)`)}),document.addEventListener(`drop`,e=>{let n=e.target.closest(`#task-dropzone`);if(n){e.preventDefault(),n.style.borderColor=`var(--border)`,n.style.background=`var(--surface-soft)`;let r=n.dataset.taskId,i=e.dataTransfer?.files;i&&i.length&&Jt(i,r)}}));async function Xt(){let n=typeof window<`u`?window.location.hash.replace(/^#/,``):``,r=new URLSearchParams(n.includes(`?`)?n.split(`?`)[1]:n.includes(`=`)?n:``),i=r.get(`activate`);if(i)return renderActivation(i);let a=r.get(`reset`);if(a)return renderResetPassword(a);if(n===`forgot`)return renderLogin(``,`forgot`);if(n===`login`)return renderLogin();let o=d();o&&o.user?(e.data=o,I(e.view)||(e.view=L()),z()):renderLoading();try{if(n){let[r,i]=n.split(`?`);if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(r)&&(e.view=r,i)){let n=new URLSearchParams(i);n.get(`id`)&&(e.activeProjectId=n.get(`id`)),n.get(`tab`)&&(e.projectTab=n.get(`tab`))}}else if(typeof sessionStorage<`u`){let n=sessionStorage.getItem(`darc_last_route`);if(n){let r=JSON.parse(n);r.view&&(e.view=r.view),r.activeProjectId&&(e.activeProjectId=r.activeProjectId),r.projectTab&&(e.projectTab=r.projectTab)}}}catch{}try{if(typeof navigator<`u`&&navigator.onLine&&s().length>0&&await f(O),await loadData(),!window._darcPollingActive){window._darcPollingActive=!0;let n=null,r=0,i=!1,a=Date.now(),o=0,s=()=>{let e=Date.now()-a>45e3;a=Date.now(),e&&Date.now()-o>4e3&&!i&&l()};if(typeof window<`u`){let e=0,n=()=>{let n=Date.now();n-e>5e3&&(e=n,s())};window.addEventListener(`click`,n,{passive:!0}),window.addEventListener(`keydown`,n,{passive:!0}),window.addEventListener(`touchstart`,n,{passive:!0}),window.addEventListener(`mousemove`,n,{passive:!0})}let c=()=>{n&&clearTimeout(n);let e=Date.now()-a>45e3?15e3:4e3,i=r>0?Math.min(25e3,e*2**r):e;n=setTimeout(l,i)},l=async()=>{if(typeof document<`u`&&document.hidden)c();else if(!e.data?.user||!e.view||e.view===`login`)c();else if(i)c();else{i=!0,o=Date.now();try{await loadData(!0),r=0}catch{r++}finally{i=!1,c()}}};c(),typeof document<`u`&&document.addEventListener(`visibilitychange`,()=>{!document.hidden&&e.data?.user&&e.view&&e.view!==`login`&&(s(),l())})}}catch{typeof window<`u`&&(window.history&&window.history.replaceState?window.history.replaceState(null,``,`#login`):window.location.hash=`#login`),renderLogin()}}if(typeof window<`u`&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener(`hashchange`,()=>{if(window._isInternalNav){window._isInternalNav=!1;return}let n=window.location.hash.replace(/^#/,``);if(!n)return;let[r,i]=n.split(`?`);if(r===`login`){e.data?.user&&(e.data.user=null),renderLogin();return}if(r===`forgot`){renderLogin(``,`forgot`);return}let a=new URLSearchParams(i||(n.includes(`=`)?n:``));if(a.get(`activate`))renderActivation(a.get(`activate`));else if(a.get(`reset`))renderResetPassword(a.get(`reset`));else if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(r)){if(e.data&&!I(r)){V(L());return}let n=e.activeProjectId;if(i){let r=new URLSearchParams(i);r.get(`id`)&&(n=r.get(`id`)),r.get(`tab`)&&(e.projectTab=r.get(`tab`))}(e.view!==r||e.activeProjectId!==n)&&V(r,n)}})),typeof window<`u`&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener(`scroll`,n=>{n.target&&n.target.classList&&(n.target.classList.contains(`timeline-scroll`)||n.target.classList.contains(`gantt-scroll`)||n.target.classList.contains(`timeline-board`))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows==`function`&&drawTimelineArrows(),e=!1})))},!0)}var q=null,J=null;function Zt(){return q||(q=document.createElement(`div`),q.className=`drag-placeholder`,q.style.cssText=`
      border: 2px dashed var(--teal, #0d9488);
      background: rgba(13, 148, 136, 0.08);
      border-radius: 10px;
      height: 52px;
      margin: 6px 0;
      transition: none;
      pointer-events: none;
      box-shadow: inset 0 0 10px rgba(13, 148, 136, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--teal, #0d9488);
      font-size: 11px;
      font-weight: 600;
    `,q.innerHTML=`<span>↓ ${E(`الموقع الجديد للمهمة`,`Drop position`)}</span>`),q}function Y(){q&&q.parentNode&&q.parentNode.removeChild(q)}function Qt(e,n){let r=Array.from(e.querySelectorAll(`.task-card:not(.is-dragging)`));for(let e of r){let r=e.getBoundingClientRect();if(n<r.top+r.height/2)return e}return null}document.addEventListener(`dragstart`,n=>{let r=n.target.closest(`.task-card`);if(r){let i=(e.data?.tasks||[]).find(e=>e.id===r.dataset.taskId);if(!(T()||C(`edit_tasks`)||i&&i.assigneeId===e.data?.user?.id)){n.preventDefault();return}window._isDraggingTask=!0,J=r.dataset.taskId,n.dataTransfer.effectAllowed=`move`;try{n.dataTransfer.setData(`text/plain`,J)}catch{}r.classList.add(`is-dragging`)}}),document.addEventListener(`dragend`,e=>{let n=e.target.closest(`.task-card`);n&&n.classList.remove(`is-dragging`),window._isDraggingTask=!1,window._justDroppedTaskId=J,window._justDroppedAt=Date.now(),J=null,document.querySelectorAll(`.board-column`).forEach(e=>e.classList.remove(`drag-over`)),Y()}),document.addEventListener(`dragover`,e=>{let n=e.target.closest(`.board-column`);if(n){e.preventDefault(),e.dataTransfer.dropEffect=`move`,n.classList.add(`drag-over`);let r=document.querySelector(`.board, .board-columns, .tasks-board, [data-board]`);r&&(e.clientX<50?r.scrollLeft-=14:e.clientX>window.innerWidth-50&&(r.scrollLeft+=14));let i=n.querySelector(`.board-cards`);if(i){let n=Zt(),r=Qt(i,e.clientY);r?n.nextSibling!==r&&i.insertBefore(n,r):(!i.contains(n)||i.lastElementChild!==n)&&i.appendChild(n)}}}),document.addEventListener(`dragenter`,e=>{e.target.closest(`.board-column`)&&e.preventDefault()}),document.addEventListener(`dragleave`,e=>{let n=e.target.closest(`.board-column`);if(n){if(e.relatedTarget&&n.contains(e.relatedTarget))return;let r=n.getBoundingClientRect(),i=e.clientX,a=e.clientY;(i<=r.left||i>=r.right||a<=r.top||a>=r.bottom)&&(n.classList.remove(`drag-over`),Y())}});async function $t(n,r,i=null){if(!n){Y();return}n.classList.remove(`drag-over`);let o=n.querySelector(`.board-cards`),s=null;if(q&&q.parentNode===o){let e=q.nextElementSibling;e&&e.classList.contains(`task-card`)&&e.dataset.taskId!==(i||J)&&(s=e.dataset.taskId)}else if(o){let e=Qt(o,r);e&&e.dataset.taskId!==(i||J)&&(s=e.dataset.taskId)}Y();let c=i||J;J=null;let l=n.dataset.status;if(!c||!l)return;let u=(e.data?.tasks||[]).find(e=>e.id===c);if(!u)return;if(!(u.status===l||l===`review`&&[`review`,`approval`,`blocked`].includes(u.status))&&l===`done`&&u.dependencies&&u.dependencies.length&&u.dependencies.filter(n=>{let r=e.data.tasks.find(e=>e.id===n);return r&&r.status!==`done`}).length)return a(E(`لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.`,`Cannot complete task before its dependencies.`),!0);e.projectTaskSort=`custom`,e.myTaskSort=`custom`,localStorage.setItem(`darc_task_sort_pref`,`custom`);let d=l===`review`?[`review`,`approval`,`blocked`]:[l],f=(e.data.tasks||[]).filter(e=>e.projectId===u.projectId&&(d.includes(e.status)||e.id===c)),p=f.findIndex(e=>e.id===c);p!==-1&&f.splice(p,1),f.sort((e,n)=>j(e)-j(n)),u.status=l;let m=f.length;if(s){let e=f.findIndex(e=>e.id===s);if(e===-1&&q&&q.parentNode){let n=q.nextElementSibling;for(;n;){if(n.classList?.contains(`task-card`)&&n.dataset.taskId){let r=f.findIndex(e=>e.id===n.dataset.taskId);if(r!==-1){e=r;break}}n=n.nextElementSibling}}e!==-1&&(m=e)}f.splice(m,0,u),f.forEach((e,n)=>{let r=(n+1)*100;e.sortOrder=r,e.sort_order=r,e.customFields={...e.customFields||{},sortOrder:r,sort_order:r},e.custom_fields={...e.custom_fields||{},sortOrder:r,sort_order:r}}),B();let h=document.querySelector(`.task-card[data-task-id="${c}"]`);h&&(h.classList.add(`just-dropped`),setTimeout(()=>h.classList.remove(`just-dropped`),400)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,f.forEach(e=>{window._pendingReorderBatch.set(e.id,{id:e.id,status:e.status,sortOrder:e.sortOrder,customFields:e.customFields})}),window._reorderSyncTimer=setTimeout(()=>{let e=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),O(`/api/tasks/reorder`,{method:`PATCH`,body:JSON.stringify({items:e})}).catch(e=>{console.warn(`Reorder sync error:`,e),a(E(`فشل حفظ الترتيب الجديد في الخادم.`,`Failed to save task order to server.`),!0)})},150)}document.addEventListener(`drop`,async e=>{let n=e.target.closest(`.board-column`);e.preventDefault();let r=J||(e.dataTransfer?e.dataTransfer.getData(`text/plain`):null);await $t(n,e.clientY,r)});var X=null,Z=null,en=0,tn=0,nn=0,rn=0,Q=null,$=!1;function an(){Q&&=(clearTimeout(Q),null),Z&&Z.parentNode&&Z.parentNode.removeChild(Z),Z=null,X&&(X.style.opacity=``,X.style.pointerEvents=``,X.classList.remove(`is-dragging`)),document.querySelectorAll(`.board-column`).forEach(e=>e.classList.remove(`drag-over`)),Y(),X=null,$=!1,J=null}document.addEventListener(`touchstart`,n=>{if(n.touches.length!==1)return;let r=n.target.closest(`.task-card`);if(!r||n.target.closest(`button, a, input, select, textarea, .btn`))return;let i=(e.data?.tasks||[]).find(e=>e.id===r.dataset.taskId);if(!(T()||C(`edit_tasks`)||i&&i.assigneeId===e.data?.user?.id))return;X=r;let a=n.touches[0];en=a.clientX,tn=a.clientY,$=!1,Q=setTimeout(()=>{if(!X)return;if($=!0,J=X.dataset.taskId,typeof navigator<`u`&&navigator.vibrate)try{navigator.vibrate(40)}catch{}let e=X.getBoundingClientRect();nn=a.clientX-e.left,rn=a.clientY-e.top,Z=X.cloneNode(!0),Z.id=`touch-drag-ghost`,Z.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: ${e.width}px;
      pointer-events: none;
      z-index: 10000;
      opacity: 0.95;
      transform: translate3d(${e.left}px, ${e.top}px, 0) scale(1.03) rotate(1.5deg);
      box-shadow: 0 16px 36px rgba(0,0,0,0.25);
      transition: transform 0.05s linear;
      border: 1px solid var(--teal, #0d9488);
      background: var(--surface, #ffffff);
      border-radius: 12px;
    `,document.body.appendChild(Z),X.classList.add(`is-dragging`),X.style.opacity=`0.25`,X.style.pointerEvents=`none`;let n=X.closest(`.board-column`);if(n){n.classList.add(`drag-over`);let e=n.querySelector(`.board-cards`);if(e){let n=Zt(),r=Qt(e,a.clientY);r&&n.nextSibling!==r?e.insertBefore(n,r):e.contains(n)||e.appendChild(n)}}},220)},{passive:!0}),document.addEventListener(`touchmove`,e=>{if(!X)return;let n=e.touches[0],r=Math.abs(n.clientX-en),i=Math.abs(n.clientY-tn);if(!$){(r>8||i>8)&&(Q&&=(clearTimeout(Q),null),X=null);return}if(e.cancelable&&e.preventDefault(),Z){let e=n.clientX-nn,r=n.clientY-rn;Z.style.transform=`translate3d(${e}px, ${r}px, 0) scale(1.03) rotate(1.5deg)`}let a=document.querySelector(`.board, .board-columns, .tasks-board, [data-board]`);a&&(n.clientX<45?a.scrollLeft-=12:n.clientX>window.innerWidth-45&&(a.scrollLeft+=12));let o=document.elementFromPoint(n.clientX,n.clientY)?.closest(`.board-column`);if(document.querySelectorAll(`.board-column`).forEach(e=>e.classList.toggle(`drag-over`,e===o)),o){let e=o.querySelector(`.board-cards`);if(e){let r=Zt(),i=Qt(e,n.clientY);i?r.nextSibling!==i&&e.insertBefore(r,i):(!e.contains(r)||e.lastElementChild!==r)&&e.appendChild(r)}}},{passive:!1}),document.addEventListener(`touchend`,async e=>{if(Q&&=(clearTimeout(Q),null),X){if($){let n=e.changedTouches[0],r=document.elementFromPoint(n.clientX,n.clientY)?.closest(`.board-column`)||q&&q.closest(`.board-column`),i=J;Z&&Z.parentNode&&Z.parentNode.removeChild(Z),Z=null,r&&i&&await $t(r,n.clientY,i),an()}else an()}}),document.addEventListener(`touchcancel`,()=>{an()});var on=i({initRealtimeConnection:()=>un,notifyStateMutation:()=>dn,triggerImmediateSync:()=>ln}),sn=null,cn=!1;function ln(n=`realtime`){sn&&clearTimeout(sn),sn=setTimeout(async()=>{if(!(typeof document<`u`&&document.hidden)&&e.data&&e.view)try{await Ot(!0)}catch(e){console.warn(`[Realtime] Sync error:`,e.message)}},250)}function un(){if(!cn){if(cn=!0,typeof BroadcastChannel<`u`){let e=new BroadcastChannel(`darc_state_sync`);e.onmessage=e=>{e.data?.type===`STATE_MUTATION`&&ln(`broadcast_channel`)},window._darcBroadcastChannel=e}window.addEventListener(`online`,async()=>{e.isOffline=!1;let{syncPendingMutations:n}=await D(async()=>{let{syncPendingMutations:e}=await import(`./offline-B2e_-E_H.js`).then(e=>e.s);return{syncPendingMutations:e}},__vite__mapDeps([2,1])),{api:r}=await D(async()=>{let{api:e}=await import(`./api-BW_3cm3S.js`).then(e=>e.r);return{api:e}},__vite__mapDeps([0,1,2,3,4])),{choose:i}=await D(async()=>{let{choose:e}=await import(`./utils-uec05tg3.js`).then(e=>e.v);return{choose:e}},__vite__mapDeps([3,1])),{showToast:a}=await D(async()=>{let{showToast:e}=await import(`./ui-ClLs5DIV.js`).then(e=>e.i);return{showToast:e}},[]),o=await n(r);o&&o.synced>0?a(i(`تمت استعادة الاتصال ومزامنة ${o.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${o.synced} pending actions successfully! 🚀`),!1):a(i(`تمت استعادة الاتصال بالإنترنت`,`Internet connection restored`),!1),ln(`online`)}),window.addEventListener(`offline`,async()=>{e.isOffline=!0;let{choose:n}=await D(async()=>{let{choose:e}=await import(`./utils-uec05tg3.js`).then(e=>e.v);return{choose:e}},__vite__mapDeps([3,1])),{showToast:r}=await D(async()=>{let{showToast:e}=await import(`./ui-ClLs5DIV.js`).then(e=>e.i);return{showToast:e}},[]),{renderApp:i}=await D(async()=>{let{renderApp:e}=await Promise.resolve().then(()=>Et);return{renderApp:e}},void 0);i(),r(n(`أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت`,`Offline Mode — you can continue working, changes will auto-sync on reconnect`),!0)})}}function dn(){if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:`STATE_MUTATION`,timestamp:Date.now()})}catch{}}document.documentElement.dataset.theme=e.theme,document.documentElement.lang=e.lang,document.documentElement.dir=e.lang===`ar`?`rtl`:`ltr`,e.lang===`en`?document.body.classList.add(`is-ltr`):document.body.classList.remove(`is-ltr`),Object.assign(window,n),Object.assign(window,oe),Object.assign(window,he),Object.assign(window,Ge),Object.assign(window,Ce),Object.assign(window,ct),Object.assign(window,dt),Object.assign(window,mt),Object.assign(window,wt),Object.assign(window,Et),Object.assign(window,Lt),Object.assign(window,re),It(),document.addEventListener(`click`,e=>{handleClick(e).catch(e=>showToast(e.message,!0))}),document.addEventListener(`submit`,e=>{handleSubmit(e).catch(e=>showToast(e.message,!0))}),document.addEventListener(`input`,handleInput),document.addEventListener(`change`,handleChange),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&closeModal()});var fn=null;window.addEventListener(`resize`,()=>{e.view===`project-detail`&&e.projectTab===`timeline`&&(fn||=requestAnimationFrame(()=>{fn=null,drawTimelineArrows()}))}),window.addEventListener(`error`,e=>{console.error(`Runtime Error:`,e.error),typeof showToast==`function`&&showToast(`خطأ برمجي: ${e.message}`,!0)}),`serviceWorker`in navigator&&window.location.protocol.startsWith(`http`)&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).catch(e=>{console.warn(`[PWA] ServiceWorker registration skipped:`,e.message)})}),un(),init();export{on as t};