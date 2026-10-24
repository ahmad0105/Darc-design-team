const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/api-2d5NGaC1.js","assets/ui-DYyyctAF.js","assets/offline-D3uOjEmC.js","assets/utils-BJC_1mrk.js"])))=>i.map(i=>d[i]);
import{a as e,i as n,n as r,r as i,t as a}from"./ui-DYyyctAF.js";import{a as o,i as s,l as c,r as l,s as u}from"./offline-D3uOjEmC.js";import{a as d,c as f,d as p,f as m,g as h,h as g,i as _,l as v,m as y,n as b,o as x,p as S,r as C,s as w,t as ee,u as T}from"./utils-BJC_1mrk.js";import{a as E,n as D,t as te}from"./api-2d5NGaC1.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))r(e);new MutationObserver(e=>{for(let n of e)if(n.type===`childList`)for(let e of n.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&r(e)}).observe(document,{childList:!0,subtree:!0});function n(e){let n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),n.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,n}function r(e){if(e.ep)return;e.ep=!0;let r=n(e);fetch(e.href,r)}})();var ne=e({calculatePasswordStrength:()=>re,openForcePasswordModal:()=>ue,renderActivation:()=>ce,renderLogin:()=>O,renderResetPassword:()=>le,renderStrengthMeterHtml:()=>ie});function re(e){let r=String(e||``);if(!r)return{score:0,label:``,percent:0,color:`var(--line)`};let i=0;return r.length>=10&&(i+=1),/[a-z]/.test(r)&&/[A-Z]/.test(r)&&(i+=1),/\d/.test(r)&&(i+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(r)&&(i+=1),i===1?{score:1,label:n.lang===`ar`?`ضعيفة جداً`:`Very weak`,percent:25,color:`var(--red)`}:i===2?{score:2,label:n.lang===`ar`?`متوسطة`:`Fair`,percent:50,color:`var(--amber)`}:i===3?{score:3,label:n.lang===`ar`?`جيدة`:`Good`,percent:75,color:`var(--blue)`}:{score:4,label:n.lang===`ar`?`قوية وممتازة 🛡️`:`Strong & Secure 🛡️`,percent:100,color:`var(--mint-strong)`}}function ie(e=`strength`){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${n.lang===`ar`?`10 أحرف + أرقام ورموز`:`10+ chars, mixed, digits & symbols`}</span>
      </div>
    </div>
  `}function ae(e,r,i,a,o){let s=document.getElementById(e);if(!s)return;let c=s.querySelector(`input[name="${r}"]`),l=s.querySelector(`input[name="${i}"]`),u=s.querySelector(o||`button[type="submit"]`),d=document.getElementById(`${a}-meter-wrap`),f=document.getElementById(`${a}-meter-bar`),p=document.getElementById(`${a}-meter-label`),m=document.getElementById(`${a}-match-indicator`);function h(){let e=c?c.value:``,r=l?l.value:``;if(e&&d&&f&&p){d.style.display=`flex`;let n=re(e);f.style.width=`${n.percent}%`,f.style.background=n.color,p.textContent=n.label,p.style.color=n.color}else d&&(d.style.display=`none`);l&&m&&(r?e===r?(m.style.display=`block`,m.style.color=`var(--mint-strong)`,m.textContent=n.lang===`ar`?`✓ كلمتا المرور متطابقتان`:`✓ Passwords match`,u&&(u.disabled=!1)):(m.style.display=`block`,m.style.color=`var(--red)`,m.textContent=n.lang===`ar`?`✗ كلمتا المرور غير متطابقتين`:`✗ Passwords do not match`,u&&(u.disabled=!0)):(m.style.display=`none`,u&&(u.disabled=!1)))}c?.addEventListener(`input`,h),l?.addEventListener(`input`,h)}function oe(){document.querySelectorAll(`[data-action="toggle-password-visibility"]`).forEach(e=>{e.onclick=r=>{r.preventDefault();let i=e.getAttribute(`data-target`),a=i?document.getElementById(i):e.parentElement.querySelector(`input`);if(!a)return;let o=a.type===`password`;a.type=o?`text`:`password`,e.style.color=o?`var(--teal)`:`var(--ink-soft)`,e.setAttribute(`aria-label`,o?n.lang===`ar`?`إخفاء كلمة المرور`:`Hide password`:n.lang===`ar`?`إظهار كلمة المرور`:`Show password`)}}),document.querySelectorAll(`input[type="password"]`).forEach(e=>{let r=r=>{let i=r.getModifierState&&r.getModifierState(`CapsLock`),a=e.parentElement.parentElement.querySelector(`.capslock-warning`);i?a||(a=document.createElement(`div`),a.className=`capslock-warning`,a.style.fontSize=`11px`,a.style.color=`var(--amber)`,a.style.marginTop=`4px`,a.style.display=`flex`,a.style.alignItems=`center`,a.style.gap=`4px`,a.innerHTML=`<span>⚠️</span> <span>${n.lang===`ar`?`زر الحروف الكبيرة (Caps Lock) مفعّل`:`Caps Lock is active`}</span>`,e.parentElement.parentElement.appendChild(a)):a&&a.remove()};e.addEventListener(`keydown`,r),e.addEventListener(`keyup`,r)})}function se(e,r=60){if(!e)return;e.disabled=!0;let i=r,a=e.innerHTML,o=setInterval(()=>{i--,e.innerHTML=`<span>${n.lang===`ar`?`يرجى الانتظار (${i} ثانية)...`:`Please wait (${i}s)...`}</span>`,i<=0&&(clearInterval(o),e.disabled=!1,e.innerHTML=a)},1e3)}function O(e=``,r=`login`,i=!1){if(n.view=`login`,typeof window<`u`){let e=r===`forgot`?`#forgot`:`#login`;window.location.hash!==e&&(window.history&&window.history.replaceState?window.history.replaceState(null,``,e):window.location.hash=e)}document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,n.lang===`en`),document.documentElement.lang=n.lang,document.documentElement.dir=n.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=n.theme||`light`;let a=``,o=e?`<div class="login-demo" style="border-color:${i?`#cce3e0`:`var(--red-soft)`};background:${i?`#f0f9f7`:`var(--red-soft)`};color:${i?`var(--teal)`:`var(--red)`};margin-top:0;margin-bottom:15px">${icon(i?`check`:`alert`,15)}<span>${esc(e)}</span></div>`:``,s=(typeof localStorage<`u`?localStorage.getItem(`darc_last_email`):``)||``;r===`login`?a=`
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
        <button class="btn btn-primary btn-block" type="submit">${icon(n.lang===`ar`?`arrowLeft`:`arrowRight`,16)} ${t(`login`)}</button>
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
    <div class="login-shell ${n.lang===`en`?`is-ltr`:``}">
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
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${n.theme===`dark`?`الوضع النهاري`:`الوضع الليلي`}">${n.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${n.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            ${a}
          </div>
        </section>
      </div>
    </div>`,oe(),document.getElementById(`login-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(e.currentTarget),r=String(n.get(`email`)||``).trim(),i=String(n.get(`password`)||``),a=document.getElementById(`remember-email-check`)?.checked,o=e.currentTarget.querySelector(`button[type="submit"]`);o.disabled=!0,o.innerHTML=`<span>${choose(`جاري التحقق وتسجيل الدخول...`,`Verifying & signing in...`)}</span>`;try{let e=await D(`/api/auth/login`,{method:`POST`,body:JSON.stringify({email:r,password:i})});typeof localStorage<`u`&&(e?.token&&localStorage.setItem(`darc_token`,e.token),a?localStorage.setItem(`darc_last_email`,r):localStorage.removeItem(`darc_last_email`)),await loadData()}catch(e){console.error(`Login Error:`,e),e.message&&(e.message.includes(`429`)||e.message.includes(`كثيرة`)||e.message.includes(`rate`))?(O(e.message,`login`),se(document.querySelector(`#login-form button[type="submit"]`),60)):O(e.message,`login`)}}),document.getElementById(`forgot-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(e.currentTarget),r=e.currentTarget.querySelector(`button[type="submit"]`);r.disabled=!0;try{await D(`/api/auth/forgot-password`,{method:`POST`,body:JSON.stringify({email:n.get(`email`)})}),O(choose(`تم إرسال رابط الاستعادة إذا كان البريد مسجلاً.`,`Reset link sent if email is registered.`),`forgot`,!0)}catch(e){O(e.message,`forgot`)}})}function ce(e,r=``){document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,n.lang===`en`),document.documentElement.lang=n.lang,document.documentElement.dir=n.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=n.theme||`light`,document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${n.lang===`en`?`is-ltr`:``}">
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
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${n.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${n.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            <form id="activation-form">
              <input type="hidden" name="token" value="${esc(e)}" />
              <div class="field">
                <label for="act-pass">${t(`password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${ie(`act`)}
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
    </div>`,oe(),ae(`activation-form`,`password`,`passwordConfirm`,`act`,`#activation-form button[type="submit"]`)}function le(e,r=``){document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,n.lang===`en`),document.documentElement.lang=n.lang,document.documentElement.dir=n.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=n.theme||`light`,document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${n.lang===`en`?`is-ltr`:``}">
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
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${n.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${n.lang===`ar`?`EN`:`عربي`}</button>
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
                ${ie(`rst`)}
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
    </div>`,oe(),ae(`reset-form`,`newPassword`,`newPasswordConfirm`,`rst`,`#reset-form button[type="submit"]`),document.getElementById(`reset-form`)?.addEventListener(`submit`,async n=>{n.preventDefault();let r=new FormData(n.currentTarget),i=r.get(`newPassword`);if(i!==r.get(`newPasswordConfirm`)){le(e,choose(`كلمتا المرور غير متطابقتين.`,`Passwords do not match.`));return}let a=n.currentTarget.querySelector(`button[type="submit"]`);a.disabled=!0;try{await D(`/api/auth/reset-password`,{method:`POST`,body:JSON.stringify({token:e,newPassword:i})}),window.history.replaceState({},``,window.location.pathname),await loadData()}catch(n){le(e,n.message)}})}function ue(e){let n=e.status===`pending`,r=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${n}">
      <div class="field">
        <label for="force-pass-input">${n?choose(`كلمة المرور للبدء`,`Initial password`):choose(`كلمة المرور الجديدة`,`New password`)}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${ie(`force`)}
        ${e.email?n?``:`<small class="field-hint" style="margin-top:6px;display:block;">${choose(`سيتم طرد المستخدم من جميع أجهزته فوراً.`,`The user will be signed out of all devices immediately.`)}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${icon(`alert`,12)} ${choose(`تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.`,`Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.`)}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${n?choose(`تفعيل الحساب`,`Activate account`):choose(`حفظ وتغيير`,`Save and change`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(n?choose(`تفعيل الحساب يدوياً`,`Activate account manually`):choose(`تغيير كلمة المرور إجبارياً`,`Force change password`),n?choose(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${esc(e.name)}.`,`Set an initial password to activate ${esc(e.name)}'s account.`):choose(`تعيين كلمة مرور جديدة لحساب ${esc(e.name)}`,`Set a new password for ${esc(e.name)}`),r,`force-password`),oe(),ae(`force-password-form`,`newPassword`,null,`force`,`#force-password-form button[type="submit"]`)}var de=e({attentionItem:()=>pe,metricCard:()=>k,projectProgress:()=>fe,pulseChart:()=>ge,renderDashboard:()=>_e,renderReports:()=>ve,teamMetrics:()=>me,teamRow:()=>he});function k(e,n,r,i,a,o=``){return`<article class="metric-card ${i}"><div class="metric-top"><span class="metric-label">${esc(e)}</span><span class="metric-icon">${icon(a,15)}</span></div><div class="metric-value">${esc(n)}</div><span class="metric-note ${o}">${esc(r)}</span></article>`}function fe(e){let n=e.health===`off_track`?`red`:e.health===`at_risk`?`amber`:``;return`<div class="progress-cell"><div class="progress-meta"><span>${t(`weightedProgress`)}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${n}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function pe(e){let n=isOverdue(e)||e.status===`blocked`?`red`:`amber`,r=isOverdue(e)?choose(`متأخرة`,`Overdue`):e.status===`blocked`?choose(`متوقفة`,`Blocked`):choose(`تستحق قريبًا`,`Due soon`);return`<button class="attention-item" data-action="open-task" data-task-id="${esc(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${n}">${icon(isOverdue(e)||e.status===`blocked`?`alert`:`clock`,14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${esc(choose(e.titleAr,e.titleEn))}</strong><span>${esc(r)} · ${esc(dueLabel(e.dueDate))}</span></span></button>`}function me(e,n){let r=n.filter(n=>n.assigneeId===e),i=r.reduce((e,n)=>e+Number(n.weight||1),0),a=i?Math.round(r.reduce((e,n)=>e+n.progress*Number(n.weight||1),0)/i):0;return{tasks:r.length,progress:a,overdue:r.filter(isOverdue).length}}function he(e,n){let r=me(e.id,n);return`<div class="team-row"><div class="team-member">${avatar(e)}<div class="team-member-copy"><strong>${esc(choose(e.name,e.nameEn||e.name))}</strong><span>${esc(choose(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${r.tasks}</strong> ${t(`tasks`)}</div><div class="team-progress"><div class="progress-meta"><span>${t(`progress`)}</span><strong>${r.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${r.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${esc(e.id)}">${icon(`more`,15)}</button></div>`}function ge(){let e=[38,48,45,62,55,72,68],r=n.lang===`ar`?[`أحد`,`اثن`,`ثلث`,`أربع`,`خمس`,`جمع`,`سبت`]:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];return`<div class="pulse">${e.map((n,i)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${i===e.length-1?`current`:``}" style="height:${n}%"></span></div><span>${r[i]}</span></div>`).join(``)}</div>`}function _e(){let e=n.data?.stats||{},r=n.data?.projects||[],i=n.data?.tasks||[],a=n.data?.users||[],o=n.data?.user||{},s=o.name||o.email||choose(`مستخدم`,`User`),c=r.reduce((e,n)=>e+(Number(n.totalWeight)||0),0),l=c?Math.round(r.reduce((e,n)=>e+(Number(n.progress)||0)*(Number(n.totalWeight)||0),0)/c):0,u=[...i].filter(e=>isOverdue(e)||e.status===`blocked`||e.dueDate&&(new Date(`${e.dueDate}T23:59:59`)-new Date)/864e5<=7).sort((e,n)=>new Date(e.dueDate||`9999-12-31`)-new Date(n.dueDate||`9999-12-31`)).slice(0,5),d=a.filter(e=>e.status!==`inactive`),f=e.projectCount??r.length,m=e.myTasks??i.filter(e=>e.assigneeId===o.id).length,h=e.overdueTasks??i.filter(isOverdue).length,g=e.dueSoon??0,_=e.completedTasks??i.filter(e=>e.status===`done`).length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${choose(`لوحة قيادة المشاريع`,`PROJECT COMMAND CENTER`)}</p><h1>${v()}، ${esc(choose(s.replace(/^م\.\s?/,``),o.nameEn||s))}</h1><p>${t(`welcomeText`)}</p></div><div class="welcome-status"><span>${t(`portfolioHealth`)}</span><strong>${l}%</strong><small>${choose(`إنجاز المحفظة الموزون`,`Weighted portfolio progress`)}</small></div></div>
    <div class="metrics-grid">${k(t(`activeProjects`),e.activeProjects||0,choose(`${f} مشاريع إجمالًا`,`${f} projects total`),`teal`,`building`,`up`)}${k(t(`openTasks`),e.openTasks??i.length,choose(`${m} مسندة لك`,`${m} assigned to you`),`blue`,`checklist`)}${k(t(`overdue`),h,choose(`تحتاج تصعيدًا ومتابعة`,`Needs escalation and follow-up`),`red`,h?`alert`:`check`,h?`alert`:``)}${k(t(`dueThisWeek`),g,choose(`موعد قريب`,`Near-term due dates`),`amber`,`clock`)}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`projectProgress`)}</h2><p class="panel-subtitle">${t(`projectProgressSub`)}</p></div>${b(`view_projects`)?`<button class="text-link" data-view="projects">${t(`seeAll`)} ${icon(n.lang===`ar`?`arrowLeft`:`arrow`,12)}</button>`:``}</div><div class="project-list">${r.length?r.slice(0,5).map(projectRow).join(``):`<div class="empty">${icon(`building`,18)}<span>${t(`noProjects`)}</span></div>`}</div></section>${p()||b(`manage_users`)?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`teamProgress`)}</h2><p class="panel-subtitle">${t(`teamProgressSub`)}</p></div><button class="text-link" data-view="team">${t(`seeAll`)} ${icon(n.lang===`ar`?`arrowLeft`:`arrow`,12)}</button></div><div class="team-table">${d.slice(0,6).map(e=>he(e,i)).join(``)}</div></section>`:``}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`attention`)}</h2><p class="panel-subtitle">${t(`attentionSub`)}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${u.length}</span></div><div class="attention-list">${u.length?u.map(pe).join(``):`<div class="empty">${icon(`check`,18)}<span>${t(`noAttention`)}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`recentPulse`)}</h2><p class="panel-subtitle">${t(`recentPulseSub`)}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${_} ${t(`done`)}</span></div>${ge()}</section></div></div>`}function ve(){let{projects:e,tasks:r,users:i}=n.data,a=b(`export_reports`)||p(),o=r.reduce((e,n)=>e+Number(n.weight||1),0),s=o?Math.round(r.reduce((e,n)=>e+n.progress*Number(n.weight||1),0)/o):0,c=new Map;r.forEach(e=>{let r=(n.lang===`ar`?e.categoryAr:e.categoryEn)||choose(e.typeAr||`عام`,e.typeEn||`General`),i=c.get(r)||{weight:0,progress:0};i.weight+=Number(e.weight||1),i.progress+=e.progress*Number(e.weight||1),c.set(r,i)});let l=[...c.entries()].map(([e,n])=>({label:e,progress:n.weight?Math.round(n.progress/n.weight):0})).sort((e,n)=>n.progress-e.progress);return`<div class="page-head"><div><p class="eyebrow">${choose(`قراءة الأداء`,`PERFORMANCE READOUT`)}</p><h1>${t(`reports`)}</h1><p>${choose(`مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.`,`Simple signals that help management see drift before it becomes delay.`)}</p></div><div class="page-actions">${a?`<button class="btn btn-soft" data-action="export-csv">${icon(`document`,15)} ${choose(`تصدير التقرير (Excel)`,`Export Report (Excel)`)}</button>`:``}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`الإنجاز حسب التخصص`,`Progress by discipline`)}</h2><p class="panel-subtitle">${t(`weightedProgress`)}</p></div><span class="status-badge on_track">${s}%</span></div><div class="report-bars">${l.length?l.map(e=>`<div class="report-bar-row"><span>${esc(e.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${e.progress}%"></div></div><strong>${e.progress}%</strong></div>`).join(``):`<div class="empty">${t(`noTasks`)}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`صحة المحفظة`,`Portfolio health`)}</h2><p class="panel-subtitle">${choose(`توزيع حالات المشاريع الحالية.`,`Current project status distribution.`)}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${t(`onTrack`)}</span><strong style="color:var(--mint-strong)">${e.filter(e=>e.health===`on_track`).length}</strong></div><div class="report-stat"><span>${t(`atRisk`)}</span><strong style="color:var(--amber)">${e.filter(e=>e.health===`at_risk`).length}</strong></div><div class="report-stat"><span>${t(`offTrack`)}</span><strong style="color:var(--red)">${e.filter(e=>e.health===`off_track`).length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`teamLoad`)}</h2><p class="panel-subtitle">${choose(`المهام المفتوحة لكل عضو.`,`Open tasks per member.`)}</p></div></div><div class="report-stat-list">${i.slice(0,5).map(e=>{let n=me(e.id,r);return`<div class="report-stat"><span>${esc(choose(e.name,e.nameEn||e.name))}</span><strong>${n.tasks}</strong></div>`}).join(``)}</div></section></div></div>`}var ye=e({STATUS_OPTIONS:()=>Re,buildAssigneeChipsHtml:()=>Ne,buildRemindersListHtml:()=>Pe,drawTimelineArrows:()=>ze,filterTasks:()=>Ae,formatRemindAtDate:()=>Me,getSavedTaskSort:()=>j,getTaskSortOrder:()=>A,initTaskModalWidgets:()=>Fe,openDocumentPreviewModal:()=>Le,openTaskModal:()=>M,renderBoard:()=>Ee,renderCalendar:()=>De,renderTaskAssignees:()=>be,renderTaskComments:()=>Ie,renderTaskDocuments:()=>N,renderTaskSortSelect:()=>we,renderTasks:()=>je,renderTimeline:()=>Oe,renderTimelinePanel:()=>ke,setSavedTaskSort:()=>Ce,sortTasks:()=>Te,sortTasksByImportance:()=>Se,taskCard:()=>xe});function be(e){let r=n.data?.users||[],i=n._userMap||new Map(r.map(e=>[e.id,e])),a=e.assignee||i.get(e.assigneeId),o=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(e=>i.get(e)).filter(Boolean),s=e.customFields?.externalAssignees||e.customFields?.external_assignees||[],c=`<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">`;return a||o.length?(c+=`<div class="avatar-stack" style="display:flex;align-items:center;">`,a&&(c+=`<span title="${esc(choose(a.name,a.nameEn||a.name))}">${avatar(a,`mini-avatar`)}</span>`),o.slice(0,2).forEach(e=>{c+=`<span title="${esc(choose(e.name,e.nameEn||e.name))}" style="margin-inline-start:-8px;">${avatar(e,`mini-avatar`)}</span>`}),o.length>2&&(c+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${o.slice(2).map(e=>choose(e.name,e.nameEn||e.name)).join(`، `)}">+${o.length-2}</span>`),c+=`</div>`,a&&(c+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${esc(choose(a.name,a.nameEn||a.name))}</span>`)):s.length||(c+=`<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>`),s.length&&(s.slice(0,2).forEach(e=>{c+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${esc(e)}">🌐 ${esc(e)} <small style="opacity:0.8">(${choose(`خارجي`,`Ext`)})</small></span>`}),s.length>2&&(c+=`<span style="font-size:10px;color:var(--amber);" title="${s.slice(2).map(esc).join(`، `)}">+${s.length-2}</span>`)),c+=`</div>`,c}function xe(e){let r=isOverdue(e),i=r?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${icon(`alert`,11)} ${t(`overdue`)}</span>`:``,a=n._commentCounts?n._commentCounts[e.id]||0:(n.data?.comments||[]).filter(n=>n.taskId===e.id).length,o=n._docCounts?n._docCounts[e.id]||0:(n.data?.documents||[]).filter(n=>n.taskId===e.id).length,s=e.progress===100?`var(--mint-strong)`:e.progress>=80?`var(--amber)`:e.progress>0?`var(--blue)`:`var(--line)`;return`<article class="task-card ${r?`is-overdue`:``}" draggable="true" data-action="open-task" data-task-id="${esc(e.id)}">
    <div class="task-card-top">
      <span class="task-code">${esc(e.templateId?e.templateId.replace(`tpl-`,`#`):`#CUSTOM`)}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${choose(`بانتظار المزامنة مع السيرفر`,`Pending cloud sync`)}">⏳ ${choose(`معلقة`,`Pending`)}</span>`:``}
        ${a>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${a} ${choose(`تعليقات`,`comments`)}">💬 ${a}</span>`:``}
        ${o>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${o} ${choose(`مرفقات`,`attachments`)}">📎 ${o}</span>`:``}
        ${i}
        <span class="priority-badge ${esc(e.priority)}">${esc(priorityText(e.priority))}</span>
      </div>
    </div>
    <h4>${esc(choose(e.titleAr,e.titleEn))}</h4>
    ${(()=>{let n=String(choose(e.descriptionAr||e.description,e.descriptionEn||e.description)||``).trim();if(!n)return``;let r=n.length>50?n.substring(0,50).trim()+`...`:n;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${esc(n)}">${esc(r)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${esc(choose(e.categoryAr,e.categoryEn)||``)}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${r?`var(--red)`:`var(--muted)`};">${icon(`calendar`,11)} ${dateLabel(e.dueDate)}</span>`:``}
    </div>
    <div class="task-card-foot">
      ${be(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?`var(--mint-strong)`:`var(--teal)`};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${s};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function A(e){if(!e)return 999999;if(typeof e.sortOrder==`number`)return e.sortOrder;if(typeof e.sort_order==`number`)return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder==`number`)return e.customFields.sortOrder;if(typeof e.customFields.sort_order==`number`)return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder==`number`)return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order==`number`)return e.custom_fields.sort_order}return 999999}function Se(e=[]){let n={urgent:4,high:3,medium:2,low:1},r=Date.now();return[...e].sort((e,i)=>{let a=+(e.status===`blocked`),o=+(i.status===`blocked`);if(a!==o)return o-a;let s=e.dueDate?new Date(`${e.dueDate.split(`T`)[0]}T23:59:59`).getTime():null,c=i.dueDate?new Date(`${i.dueDate.split(`T`)[0]}T23:59:59`).getTime():null,l=s&&s<r&&e.status!==`done`?1:0,u=c&&c<r&&i.status!==`done`?1:0;if(l!==u)return u-l;let d=n[e.priority]||2,f=n[i.priority]||2;if(d!==f)return f-d;if(s&&c){if(s!==c)return s-c}else if(s&&!c)return-1;else if(!s&&c)return 1;let p=A(e),m=A(i);return p===m?(e.titleAr||``).localeCompare(i.titleAr||``,`ar`):p-m})}function j(){return localStorage.getItem(`darc_task_sort_pref`)||`importance`}function Ce(e){localStorage.setItem(`darc_task_sort_pref`,e),n.taskSortPref=e,n.projectTaskSort=e,n.myTaskSort=e}function we(e,n=`sort-project-tasks`){let r=e||j();return`
    <div style="display:flex;align-items:center;gap:6px;">
      <span style="font-size:12px;color:var(--ink-soft);">${choose(`الترتيب:`,`Sort:`)}</span>
      <select data-action="${n}" style="padding:5px 9px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font-size:12px;">
        <option value="importance" ${r===`importance`?`selected`:``}>${choose(`حسب الأهمية والأولوية (افتراضي)`,`By Importance & Priority (Default)`)}</option>
        <option value="deadline" ${r===`deadline`?`selected`:``}>${choose(`الأقرب استحقاقاً`,`Earliest Deadline`)}</option>
        <option value="custom" ${r===`custom`?`selected`:``}>${choose(`ترتيب مخصص (السحب والإسقاط)`,`Custom (Drag & Drop)`)}</option>
        <option value="alpha" ${r===`alpha`?`selected`:``}>${choose(`أبجدياً`,`Alphabetical`)}</option>
      </select>
    </div>
  `}function Te(e=[],n=j()){return n===`deadline`?[...e].sort((e,n)=>(e.dueDate?new Date(`${e.dueDate.split(`T`)[0]}T23:59:59`).getTime():1/0)-(n.dueDate?new Date(`${n.dueDate.split(`T`)[0]}T23:59:59`).getTime():1/0)):n===`custom`?[...e].sort((e,n)=>A(e)-A(n)):n===`alpha`?[...e].sort((e,n)=>(e.titleAr||``).localeCompare(n.titleAr||``,`ar`)):Se(e)}function Ee(e,r=j()){let i=n.data?.users||[];n._userMap=new Map(i.map(e=>[e.id,e]));let a={};for(let e of n.data?.comments||[])e.taskId&&(a[e.taskId]=(a[e.taskId]||0)+1);let o={};for(let e of n.data?.documents||[])e.taskId&&(o[e.taskId]=(o[e.taskId]||0)+1);return n._commentCounts=a,n._docCounts=o,`<div class="board">${[{key:`not_started`,dot:``,label:t(`notStarted`)},{key:`in_progress`,dot:`blue`,label:t(`inProgress`)},{key:`review`,dot:`amber`,label:choose(`مراجعة / اعتماد`,`Review / approval`),statuses:[`review`,`approval`,`blocked`]},{key:`done`,dot:`green`,label:t(`done`)}].map(n=>{let i=Te(e.filter(e=>(n.statuses||[n.key]).includes(e.status)),r);return`<section class="board-column" data-status="${n.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${n.dot}"></span>${n.label}</div><span class="board-count">${i.length}</span></div><div class="board-cards">${i.length?i.map(xe).join(``):`<div class="empty" style="min-height:150px;pointer-events:none;">${t(`noTasks`)}</div>`}</div></section>`}).join(``)}</div>`}function De(e,r){let i=n.calendarDate?new Date(n.calendarDate):new Date,a=i.getFullYear(),o=i.getMonth(),s=`${n.lang===`ar`?[`يناير`,`فبراير`,`مارس`,`أبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`][o]:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`][o]} ${a}`,c=n.lang===`ar`?[`الأحد`,`الإثنين`,`الثلاثاء`,`الأربعاء`,`الخميس`,`الجمعة`,`السبت`]:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],l=new Date(a,o,1).getDay(),u=new Date(a,o+1,0).getDate(),d=new Date,p=d.getFullYear()===a&&d.getMonth()===o,m=``;for(let e=0;e<l;e++)m+=`<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>`;for(let n=1;n<=u;n++){let r=p&&d.getDate()===n,i=`${a}-${String(o+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,s=e.filter(e=>{if(!e.dueDate&&!e.startDate)return!1;let n=e.dueDate?e.dueDate.split(`T`)[0]:null,r=e.startDate?e.startDate.split(`T`)[0]:null;return n===i||r===i});m+=`
      <div class="calendar-day ${r?`is-today`:``}" style="min-height:95px;min-width:0;overflow:hidden;background:${r?`var(--mint)`:`var(--surface)`};border:1px solid ${r?`var(--teal)`:`var(--line)`};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${r?`bold`:`600`};color:${r?`var(--teal)`:`var(--ink)`};">
          <span>${n}</span>
          ${r?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${choose(`اليوم`,`Today`)}</span>`:``}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${s.map(e=>{let n=f(e);return`
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
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${icon(n.lang===`ar`?`arrow`:`arrowLeft`,12)} ${choose(`السابق`,`Prev`)}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${choose(`اليوم`,`Today`)}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${choose(`التالي`,`Next`)} ${icon(n.lang===`ar`?`arrowLeft`:`arrow`,12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${c.map(e=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e}</div>`).join(``)}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${m}
      </div>
    </div>
  `}function Oe(e){let r=e.filter(e=>e.startDate&&e.dueDate).sort((e,n)=>new Date(e.startDate)-new Date(n.startDate));if(!r.length)return`<div class="empty" style="min-height:300px">${icon(`calendar`,24)}<span>${choose(`لا توجد مهام مجدولة زمنياً في هذا المشروع.`,`No scheduled tasks in this project.`)}</span></div>`;let i=Math.min(...r.map(e=>new Date(e.startDate).getTime())),a=Math.max(...r.map(e=>new Date(e.dueDate).getTime())),o=2592e5;i-=o,a+=o;let s=Math.max(7,Math.ceil((a-i)/864e5)),c=``;for(let e=0;e<s;e++){let r=new Date(i+e*864e5),a=r.getDay()===5||r.getDay()===6;c+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${a?`var(--surface-soft)`:`transparent`};border-bottom:1px solid var(--line)">${r.getDate()}<br>${r.toLocaleDateString(n.lang===`ar`?`ar-SA`:`en-US`,{month:`short`})}</div>`}let l=r.map((e,r)=>{let a=Math.floor((new Date(e.startDate).getTime()-i)/864e5)+1,o=a+Math.max(1,Math.ceil((new Date(e.dueDate).getTime()-new Date(e.startDate).getTime())/864e5)+1),s=f(e);return`<div style="display:contents" class="timeline-row" data-task-id="${e.id}" data-row="${r}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${e.id}" style="grid-column: ${a} / ${o}; margin: 8px 4px; background: ${s.color}; border: 1px solid ${s.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${esc(choose(e.titleAr,e.titleEn))} — ${s.label}">
        <span style="font-weight:600;opacity:0.9">${esc(e.templateId?e.templateId.replace(`tpl-`,`#`):`#`)}</span> ${esc(choose(e.titleAr,e.titleEn))}
        ${e.dependencies&&e.dependencies.length?`<span style="float:${n.lang===`ar`?`left`:`right`};opacity:0.8">${icon(`link`,10)}</span>`:``}
      </div>
    </div>`}).join(``);return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${s}, minmax(40px, 1fr)); min-width: ${s*40}px; position: relative;">
      ${c}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function ke(e,r){let i=n.timelineView||`gantt`;return`
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
      
      ${i===`calendar`?De(e,r):Oe(e)}
    </div>
  `}window.__timelineExports={renderTimelinePanel:ke,renderCalendar:De,renderTimeline:Oe};function Ae(e){let r=n.searches.tasks.trim().toLowerCase();return e.filter(e=>{let i=`${e.titleAr} ${e.titleEn} ${e.categoryAr} ${e.categoryEn}`.toLowerCase().includes(r),a=n.taskFilter===`all`||n.taskFilter===`mine`&&e.assigneeId===n.data.user.id||n.taskFilter===`overdue`&&isOverdue(e)||n.taskFilter===`blocked`&&e.status===`blocked`,o=n.taskProjectFilter===`all`||e.projectId===n.taskProjectFilter,s=!n.taskPriorityFilter||n.taskPriorityFilter===`all`||e.priority===n.taskPriorityFilter;return i&&a&&o&&s})}function je(){let e=Ae(n.data.tasks),r=[[`all`,t(`all`)],[`mine`,choose(`مسندة لي`,`Assigned to me`)],[`overdue`,t(`overdue`)],[`blocked`,t(`blocked`)]],i=n.myTaskSort||j();return`<div class="page-head"><div><p class="eyebrow">${choose(`حركة التنفيذ`,`EXECUTION`)}</p><h1>${t(`myTasks`)}</h1><p>${choose(`نظّم العمل حسب الحالة، الموعد، والمسؤولية.`,`Organize work by status, deadline, and ownership.`)}</p></div><div class="page-actions">${can(`create_tasks`)?`<button class="btn btn-primary" data-action="new-task">${icon(`plus`,15)} ${t(`addTask`)}</button>`:``}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${icon(`search`,15)}<input data-search="tasks" value="${esc(n.searches.tasks)}" placeholder="${t(`search`)}" /></div>${r.map(([e,r])=>`<button class="filter-tab ${n.taskFilter===e?`active`:``}" data-action="task-filter" data-filter="${e}">${r}</button>`).join(``)}</div><div class="view-toolbar-end" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">${we(i,`sort-my-tasks`)}<select class="filter-select" data-action="task-priority-filter"><option value="all">${choose(`كل الأولويات`,`All Priorities`)}</option><option value="urgent" ${n.taskPriorityFilter===`urgent`?`selected`:``}>🔥 ${choose(`عاجلة`,`Urgent`)}</option><option value="high" ${n.taskPriorityFilter===`high`?`selected`:``}>⚡ ${choose(`عالية`,`High`)}</option><option value="medium" ${n.taskPriorityFilter===`medium`?`selected`:``}>🔹 ${choose(`متوسطة`,`Medium`)}</option><option value="low" ${n.taskPriorityFilter===`low`?`selected`:``}>☕ ${choose(`منخفضة`,`Low`)}</option></select><select class="filter-select" data-action="task-project-filter"><option value="all">${t(`all`)} ${t(`projects`)}</option>${n.data.projects.map(e=>`<option value="${esc(e.id)}" ${n.taskProjectFilter===e.id?`selected`:``}>${esc(choose(e.nameAr,e.nameEn))}</option>`).join(``)}</select></div></div>${e.length?Ee(e,i):`<section class="panel"><div class="empty">${icon(`checklist`,18)}<span>${t(`noTasks`)}</span></div></section>`}`}function Me(e){if(!e)return`—`;try{let r=new Date(e);return isNaN(r.getTime())?e:new Intl.DateTimeFormat(n.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(r)}catch{return e}}function Ne(e=[],r=[]){let i=n.data?.users||[],a=``;return e.forEach(e=>{let n=i.find(n=>n.id===e)||{name:e,id:e};a+=`
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
    `}),a}function Pe(e=[]){return e.length?e.map((e,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${esc(Me(e.remindAt))}</strong>
        ${e.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(e.noteAr)}">(${esc(e.noteAr)})</span>`:``}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${esc(e.id||``)}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${choose(`حذف التذكير`,`Delete reminder`)}">
        ${icon(`trash`,13)}
      </button>
    </div>
  `).join(``):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${choose(`لا توجد مواعيد تذكير مجدولة لهذه المهمة`,`No scheduled reminders for this task`)}</div>`}function M(e=null,r=null,i=null){let a=n.data.templates.find(n=>n.id===(r||e?.templateId)),o=e?.projectId||i||n.activeProjectId||n.data.projects[0]?.id||``,s=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],c=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[],l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:`rem_`+Math.random().toString(36).substr(2,9),remindAt:e.remindAt,noteAr:``}]:Array.isArray(n.data?.reminders)&&e?.id&&(l=n.data.reminders.filter(n=>n.taskId===e.id));let u=e?.progress===void 0?e?.status===`done`?100:e?.status===`review`||e?.status===`approval`?80:e?.status===`in_progress`?50:0:e.progress,d=s.length>0||c.length>0,f=d?Ne(s,c):``,p=Pe(l),m=`<form id="task-form" data-task-id="${esc(e?.id||``)}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${esc(e?.typeAr||a?.typeAr||(a?`مخطط`:``))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${esc(e?.typeEn||a?.typeEn||(a?`Drawing`:``))}" />
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
          ${n.data.projects.map(e=>`<option value="${esc(e.id)}" ${e.id===o?`selected`:``}>${esc(choose(e.nameAr,e.nameEn))} (${esc(e.code)})</option>`).join(``)}
        </select>
      </div>

      <div class="field full">
        <label>${t(`taskTitle`)} *</label>
        <input name="titleAr" id="task-title-ar" value="${esc(e?.titleAr||a?.nameAr||``)}" placeholder="${choose(`اسم المخرج أو المهمة`,`Deliverable or task name`)}" required />
      </div>
      <div class="field">
        <label>${t(`nameEn`)}</label>
        <input name="titleEn" id="task-title-en" value="${esc(e?.titleEn||a?.nameEn||``)}" placeholder="${choose(`Task / Deliverable Name (EN)`,`Task / Deliverable Name (EN)`)}" />
      </div>
      <div class="field">
        <label>${t(`addFromLibrary`)}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${choose(`مهمة مخصصة`,`Custom task`)}</option>
          ${n.data.templates.map(n=>`<option value="${esc(n.id)}" ${(e?.templateId||r)===n.id?`selected`:``}>${esc(n.code)} — ${esc(choose(n.nameAr,n.nameEn))}</option>`).join(``)}
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
          ${n.data.users.map(r=>`<option value="${esc(r.id)}" ${(e?e.assigneeId===r.id:n.data.user.id===r.id)?`selected`:``}>${esc(choose(r.name,r.nameEn||r.name))}</option>`).join(``)}
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
        <select name="status" id="task-status-select">${Re().map(([n,r])=>`<option value="${n}" ${e?.status===n?`selected`:``}>${r}</option>`).join(``)}</select>
      </div>
      <div class="field">
        <label>${t(`priority`)}</label>
        <select name="priority">${[`low`,`medium`,`high`,`urgent`].map(n=>`<option value="${n}" ${(e?.priority||`medium`)===n?`selected`:``}>${priorityText(n)}</option>`).join(``)}</select>
      </div>
      <div class="field">
        <label>${t(`startDate`)}</label>
        <input type="date" name="startDate" id="task-start-date" value="${esc(e?.startDate||``)}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${t(`dueDate`)}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${esc(e?.dueDate||``)}" min="${esc(e?.startDate||``)}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
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
        <textarea name="descriptionAr" placeholder="${choose(`ما المطلوب؟ وما معيار الإغلاق؟`,`What is required and what defines completion?`)}">${esc(e?.descriptionAr||``)}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(can(`delete_tasks`)||isAdmin())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${esc(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${choose(`حذف المهمة ونقلها لسلة المهملات`,`Delete task and move to trash`)}">
            ${icon(`trash`,14)} ${choose(`حذف المهمة`,`Delete Task`)}
          </button>
        `:``}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${e?t(`save`):t(`create`)}</button>
      </div>
    </div>
  </form>`,h=m,g=``;e&&(g=`modal-lg`,h=`
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
                <input type="file" multiple id="task-upload-input" data-task-id="${e.id}" style="display:none;" />
              </label>
            </div>
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${e.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
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
            <div id="task-documents-list">${N(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${choose(`النقاشات والتعليقات`,`Discussion & Comments`)}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${Ie(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${choose(`اكتب تعليقاً... (استخدم @ للإشارة)`,`Write a comment... (use @ to mention)`)}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${choose(`إرسال`,`Send`)}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById(`modal-root`).innerHTML=modalShell(e?choose(`تعديل المهمة`,`Edit task`):t(`addTask`),choose(`المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.`,`A task is the unit of execution; link a standard deliverable and add a reminder.`),h,`task`,g),Fe(e)}function Fe(e){let r=document.getElementById(`modal-root`);if(!r)return;let i=r.querySelector(`#task-status-select`),a=r.querySelector(`#task-auto-progress-badge`);i&&a&&i.addEventListener(`change`,()=>{let e={not_started:0,in_progress:50,review:80,approval:80,done:100}[i.value]??0;a.textContent=`(${e}%)`});let o=r.querySelector(`#task-template-select`);o&&o.addEventListener(`change`,()=>{let e=o.value,i=(n.data?.templates||[]).find(n=>n.id===e);if(i){let e=r.querySelector(`#task-title-ar`),n=r.querySelector(`#task-title-en`),a=r.querySelector(`#task-type-ar`),o=r.querySelector(`#task-type-en`);e&&!e.value&&(e.value=i.nameAr||``),n&&!n.value&&(n.value=i.nameEn||``),a&&(a.value=i.typeAr||`مخطط`),o&&(o.value=i.typeEn||`Drawing`)}});let s=r.querySelector(`#task-additional-assignees-input`),c=r.querySelector(`#task-external-assignees-input`),l=r.querySelector(`#assignees-chips-container`),u=r.querySelector(`#assignee-combobox-search`),d=r.querySelector(`#assignee-combobox-dropdown`),f=r.querySelector(`#btn-add-external-quick`),p=[];try{p=JSON.parse(s?.value||`[]`)}catch{p=[]}let m=[];try{m=JSON.parse(c?.value||`[]`)}catch{m=[]}function h(){s&&(s.value=JSON.stringify(p)),c&&(c.value=JSON.stringify(m))}function g(){l&&(p.length===0&&m.length===0?(l.style.display=`none`,l.innerHTML=``,h()):(l.style.display=`flex`,l.innerHTML=Ne(p,m),h()))}function _(e=``){if(!d)return;let i=e.trim().toLowerCase(),a=n.data?.users||[],o=r.querySelector(`#task-primary-assignee`)?.value,s=a.filter(e=>{if(e.id===o)return!1;if(!i)return!0;let n=(e.name||``).toLowerCase(),r=(e.nameEn||``).toLowerCase(),a=(e.email||``).toLowerCase();return n.includes(i)||r.includes(i)||a.includes(i)}),c=``;i&&(c+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${choose(`إضافة مسؤول خارجي:`,`Add external assignee:`)} "${esc(e.trim())}"</span>
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
        `}),d.innerHTML=c,d.style.display=`block`}h(),u&&(u.addEventListener(`focus`,()=>{_(u.value)}),u.addEventListener(`input`,()=>{let e=u.value.trim();_(e),f&&(f.style.display=e.length>1?`inline-flex`:`none`)}),u.addEventListener(`keydown`,e=>{if(e.key===`Enter`){e.preventDefault();let n=u.value.trim();n&&(m.includes(n)||(m.push(n),g()),u.value=``,f&&(f.style.display=`none`),d&&(d.style.display=`none`))}})),f&&f.addEventListener(`click`,()=>{let e=u?.value.trim();e&&(m.includes(e)||(m.push(e),g()),u.value=``,f.style.display=`none`,d&&(d.style.display=`none`))}),d&&d.addEventListener(`click`,e=>{if(e.target.closest(`.dropdown-ext-action`)){let e=u?.value.trim();e&&!m.includes(e)&&(m.push(e),g()),u&&(u.value=``),f&&(f.style.display=`none`),d.style.display=`none`;return}let n=e.target.closest(`.combobox-user-row`);if(n){let e=n.dataset.uid;p.includes(e)?p=p.filter(n=>n!==e):p.push(e),g(),_(u?.value||``)}}),l&&l.addEventListener(`click`,e=>{let n=e.target.closest(`.btn-remove-chip-user`);if(n){let e=n.dataset.uid;p=p.filter(n=>n!==e),g(),d&&d.style.display===`block`&&_(u?.value||``);return}let r=e.target.closest(`.btn-remove-chip-ext`);if(r){let e=r.dataset.ext;m=m.filter(n=>n!==e),g()}});let v=r.querySelector(`#task-reminders-input`),y=r.querySelector(`#task-reminders-list`),b=r.querySelector(`#new-reminder-datetime`),x=r.querySelector(`#new-reminder-note`),S=r.querySelector(`#btn-add-reminder`),C=[];try{C=JSON.parse(v?.value||`[]`)}catch{C=[]}Array.isArray(C)||(C=[]);function w(){y&&(v&&(v.value=JSON.stringify(C)),y.innerHTML=Pe(C))}S&&S.addEventListener(`click`,()=>{let e=b?.value;if(!e){showToast(choose(`يرجى اختيار تاريخ ووقت التذكير.`,`Please pick a reminder date & time.`),!0);return}let n=x?.value.trim()||``,r={id:`rem_temp_`+Math.random().toString(36).substr(2,9),remindAt:new Date(e).toISOString(),noteAr:n};C.push(r),b&&(b.value=``),x&&(x.value=``),w(),showToast(choose(`تمت إضافة موعد التذكير للقائمة.`,`Reminder added to list.`))}),y&&y.addEventListener(`click`,async e=>{let n=e.target.closest(`.btn-delete-reminder`);if(n){let e=Number(n.dataset.idx),r=n.dataset.remId;!isNaN(e)&&e>=0&&e<C.length&&(C.splice(e,1),w(),r&&!r.startsWith(`rem_temp_`)&&D(`/api/reminders/${r}`,{method:`DELETE`}).catch(()=>{}),showToast(choose(`تم حذف موعد التذكير.`,`Reminder deleted.`)))}}),r.addEventListener(`mousedown`,e=>{d?.contains(e.target)||u?.contains(e.target)||f?.contains(e.target)||(d&&(d.style.display=`none`),f&&(f.style.display=`none`))})}function Ie(e){let r=(n.data.comments||[]).filter(n=>n.taskId===e.id).sort((e,n)=>new Date(e.createdAt)-new Date(n.createdAt));return r.length?`<div style="display:flex;flex-direction:column;gap:12px;">${r.map(r=>{let i=r.user||(n.data?.users||[]).find(e=>e.id===r.userId)||n.data?.user||{name:`DARC Member`,id:``},a=!!(i.id&&n.data?.user?.id&&i.id===n.data.user.id),o=a||typeof isAdmin==`function`&&isAdmin(),s=esc(r.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,`<strong style="color:var(--blue)">@$1</strong>`);return`
      <div class="task-comment-item" data-comment-id="${esc(r.id)}" style="display:flex;gap:10px;flex-direction:${a?`row-reverse`:`row`};">
        ${avatar(i)}
        <div style="display:flex;flex-direction:column;align-items:${a?`flex-end`:`flex-start`};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${esc(choose(i.name,i.nameEn||i.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(r.createdAt,!0)}</span>
            ${o?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${esc(r.id)}" data-task-id="${esc(e.id)}" title="${choose(`تعديل التعليق`,`Edit comment`)}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${icon(`edit`,12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${esc(r.id)}" data-task-id="${esc(e.id)}" title="${choose(`حذف التعليق`,`Delete comment`)}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${icon(`trash`,12)}
                </button>
              </div>
            `:``}
          </div>
          <div id="comment-bubble-${esc(r.id)}" style="background:${a?`var(--blue)`:`var(--surface)`};color:${a?`#fff`:`var(--ink)`};padding:8px 12px;border-radius:12px;font-size:13px;border:${a?`none`:`1px solid var(--border)`};border-top-${a?`right`:`left`}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${s}</div>
        </div>
      </div>
    `}).join(``)}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${icon(`message`,18)}<span style="font-size:12px;">${choose(`لا توجد تعليقات`,`No comments yet`)}</span></div>`}function N(e){let r=n.data.documents.filter(n=>n.taskId===e.id).sort((e,n)=>new Date(n.createdAt)-new Date(e.createdAt));return r.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${r.map(e=>`
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
  `).join(``)}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${icon(`document`,18)}<span style="font-size:12px;">${choose(`لا توجد ملفات مرفوعة`,`No documents uploaded`)}</span></div>`}function Le(e){let r=(n.data?.documents||[]).find(n=>n.id===e);if(!r)return;let i=r.diskFilename||`/api/documents/${r.id}`;(i.startsWith(`file://`)||i.startsWith(`/`)||!i.startsWith(`http`))&&(i=`/api/documents/${r.id}`);let a=``;if(i.includes(`drive.google.com`)){let e=i.match(/\/d\/([a-zA-Z0-9_-]+)/);e&&e[1]&&(a=e[1])}let o=a?`https://drive.google.com/file/d/${encodeURIComponent(a)}/preview`:i,s=/^(https?:\/\/|\/)/i.test(o)?o:`about:blank`,c=a?`https://drive.google.com/file/d/${encodeURIComponent(a)}/view?usp=drivesdk`:i.startsWith(`http`)?i:`${window.location.origin}${i}`,l=/^(https?:\/\/|\/)/i.test(c)?c:`#`,u=`/api/documents/${encodeURIComponent(r.id)}`,d=/\.(jpe?g|png|gif|webp|svg|heic)$/i.test(r.originalName)||r.mimeType&&r.mimeType.startsWith(`image/`);r.size>1048576?(r.size/1048576).toFixed(1)+``:Math.round((r.size||0)/1024)+``;let f=document.getElementById(`preview-modal-overlay`);f||(f=document.createElement(`div`),f.id=`preview-modal-overlay`,f.style.position=`fixed`,f.style.inset=`0`,f.style.zIndex=`1300`,f.style.background=`rgba(0, 0, 0, 0.75)`,f.style.backdropFilter=`blur(4px)`,f.style.display=`flex`,f.style.alignItems=`center`,f.style.justifyContent=`center`,f.style.padding=`20px`,document.body.appendChild(f)),f.innerHTML=`
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
  `,f.style.display=`flex`,document.getElementById(`close-preview-modal-btn`)?.addEventListener(`click`,()=>{f.style.display=`none`,f.innerHTML=``}),f.onclick=e=>{e.target===f&&(f.style.display=`none`,f.innerHTML=``)}}function Re(){return[[`not_started`,t(`notStarted`)],[`in_progress`,t(`inProgress`)],[`review`,t(`review`)],[`approval`,t(`approval`)],[`done`,t(`done`)],[`blocked`,t(`blocked`)],[`canceled`,t(`canceled`)]]}function ze(){let e=document.querySelector(`.timeline-container > div`),r=document.querySelector(`.timeline-svg`);if(!e||!r)return;r.innerHTML=``;let i=Array.from(document.querySelectorAll(`.timeline-bar`)),a={},o=e.getBoundingClientRect();i.forEach(e=>{let n=e.getBoundingClientRect();a[e.dataset.taskId]={left:n.left-o.left,right:n.right-o.left,top:n.top-o.top,bottom:n.bottom-o.top,width:n.width,height:n.height,center:n.top-o.top+n.height/2}});let s=``,c=n.lang===`ar`;i.forEach(e=>{let r=e.dataset.taskId,i=(n.data?.tasks||[]).find(e=>e.id===r),o=i?.dependencies||i?.customFields?.dependencies||[];if(!i||!o.length)return;let l=a[r];l&&o.forEach(e=>{let n=a[e];if(!n)return;let r=c?n.left:n.right,i=n.center,o=c?l.right:l.left,u=l.center,d=r+(c?-20:20);s+=`<path d="M ${r} ${i} C ${d} ${i}, ${d} ${u}, ${o} ${u}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),r.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${s}
  `}var Be=e({buildProjectMemberChipsHtml:()=>Ze,exportPortfolioXLS:()=>tt,exportProjectXLS:()=>nt,exportXLS:()=>et,getDaysLeftBadge:()=>He,getProjectTeam:()=>Ue,getProjectTeamData:()=>P,openCloneModal:()=>$e,openProjectModal:()=>Qe,projectCard:()=>qe,projectRow:()=>Ve,renderProjectCardTeamAvatars:()=>Ke,renderProjectDetail:()=>Xe,renderProjectOverviewTab:()=>Je,renderProjectTeamAvatars:()=>We,renderProjectTimelineBar:()=>Ge,renderProjects:()=>Ye});function Ve(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${icon(`building`,17)}</span><div class="project-name"><strong>${esc(choose(e.nameAr,e.nameEn))}</strong><span>${esc(e.code)} · ${esc(choose(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${avatar(e.manager)}<span>${esc(e.manager?choose(e.manager.name,e.manager.nameEn||e.manager.name):`—`)}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${esc(e.id)}" aria-label="${t(`viewDetails`)}">${icon(n.lang===`ar`?`arrowLeft`:`arrow`,14)}</button></div>`}function He(e){if(!e)return``;let n=new Date(`${e}T23:59:59`),r=Math.ceil((n-new Date)/864e5),i=`var(--mint-strong)`,a=`var(--mint)`,o=``;return r<0?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`متأخر ${Math.abs(r)} يوم`,`${Math.abs(r)}d overdue`)):r===0?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`يستحق اليوم`,`Due today`)):r<=2?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`باقي ${r} يوم`,`${r}d left`)):r<=7?(i=`var(--amber)`,a=`var(--amber-soft)`,o=choose(`باقي ${r} أيام`,`${r}d left`)):(i=`var(--mint-strong)`,a=`var(--mint)`,o=choose(`باقي ${r} يوم`,`${r}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${i};background:${a};border:1px solid currentColor;">${icon(`clock`,11)} ${o}</span>`}function P(e){let r=n.data?.users||[],i=(n.data?.tasks||[]).filter(n=>n.projectId===e.id),a=new Set,o=new Set;return e.managerId&&a.add(e.managerId),i.forEach(e=>{e.assigneeId&&a.add(e.assigneeId),(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).forEach(e=>a.add(e)),(e.customFields?.externalAssignees||e.customFields?.external_assignees||[]).forEach(e=>{e&&typeof e==`string`&&e.trim()&&o.add(e.trim())})}),{internalMembers:Array.from(a).map(e=>r.find(n=>n.id===e)).filter(Boolean),externalMembers:Array.from(o)}}function Ue(e){return P(e).internalMembers}function We(e,n=4,r=!0,i=[]){if((!e||!e.length)&&(!i||!i.length))return`<span style="font-size:11px;color:var(--muted);">${choose(`لا يوجد فريق محدد`,`No team assigned`)}</span>`;let a=(e||[]).slice(0,n),o=(e||[]).length-n,s=(e||[]).map(e=>choose(e.name,e.nameEn||e.name)).join(`، `),c=`<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">`;return a.forEach(e=>{let n=choose(e.name,e.nameEn||e.name),i=r?`data-action="filter-by-member" data-member-id="${esc(e.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:`style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"`;c+=`
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
  </div>`,c+=`</div>`,c}function Ge(e){if(!e.dueDate)return``;let n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),r=new Date(`${e.dueDate}T23:59:59`),i=new Date,a=r.getTime()-n.getTime(),o=0;a>0&&(o=Math.min(100,Math.max(0,Math.round((i.getTime()-n.getTime())/a*100))));let s=i>r,c=s?`var(--red)`:o>=80&&!s?`var(--amber)`:`var(--blue)`;return`
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
  `}function Ke(e=[],n=[],r=3){let i=e.length+n.length;if(i===0)return`<span style="font-size:11px;color:var(--muted);">—</span>`;let a=e.slice(0,r),o=i-a.length;[...e.map(e=>choose(e.name,e.nameEn||e.name)),...n].join(`، `);let s=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${choose(`عرض فريق العمل`,`View Team`)}">`;return s+=`<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">`,a.forEach((e,n)=>{s+=`
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
  `,s+=`</div>`,s}function qe(e){let{internalMembers:r,externalMembers:i}=P(e),a=e.manager||(n.data?.users||[]).find(n=>n.id===e.managerId),o=He(e.dueDate),s=choose(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
        <span class="project-card-symbol">${icon(`building`,19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${esc(e.code)}</span>
          <h3 class="project-card-title" title="${esc(choose(e.nameAr,e.nameEn))}">${esc(choose(e.nameAr,e.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${choose(`بانتظار المزامنة مع السيرفر`,`Pending cloud sync`)}">⏳ ${choose(`معلقة`,`Pending`)}</span>`:``}
        <span class="status-badge ${esc(e.health)}">${esc(statusText(e.health))}</span>
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
        ${Ke(r,i,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${t(`deadline`)}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${e.dueDate?dateLabel(e.dueDate,!0):`—`}</strong>
          ${o}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health===`off_track`?`red`:e.health===`at_risk`?`amber`:``}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${esc(e.id)}">
      ${t(`viewDetails`)} ${icon(n.lang===`ar`?`arrowLeft`:`arrow`,13)}
    </button>
  </article>`}function Je(e,r,i,a=[]){let o=e.manager||(n.data?.users||[]).find(n=>n.id===e.managerId),s=r.filter(e=>e.status===`done`).length,c=r.filter(e=>e.status===`in_progress`).length,l=r.filter(isOverdue).length;return`
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
      ${Ge(e)}

      <!-- Details Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${icon(`document`,16)}
            ${choose(`نطاق وتفاصيل المشروع`,`Project Scope & Details`)}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${esc(e.descriptionAr||e.descriptionEn||choose(`لا يوجد وصف مسجل لهذا المشروع حالياً.`,`No description available for this project.`))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`client`)}</span>
              <strong style="font-size:13px;color:var(--ink);">${esc(choose(e.clientAr,e.clientEn)||`—`)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`lifecycle`)}</span>
              <strong style="font-size:13px;color:var(--ink);">${esc(statusText(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`startDate`)}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`dueDate`)}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.dueDate,!0)}</strong>
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
  `}function Ye(){let e=n.searches.projects.trim().toLowerCase(),r=n.data.projects.filter(n=>`${n.nameAr} ${n.nameEn} ${n.code} ${n.clientAr}`.toLowerCase().includes(e)),i=n.projectSort||`default`;return i===`alpha-asc`?r.sort((e,r)=>(choose(e.nameAr,e.nameEn)||``).localeCompare(choose(r.nameAr,r.nameEn)||``,n.lang===`ar`?`ar`:`en`)):i===`alpha-desc`?r.sort((e,r)=>(choose(r.nameAr,r.nameEn)||``).localeCompare(choose(e.nameAr,e.nameEn)||``,n.lang===`ar`?`ar`:`en`)):i===`progress-asc`?r.sort((e,n)=>(Number(e.progress)||0)-(Number(n.progress)||0)):i===`progress-desc`&&r.sort((e,n)=>(Number(n.progress)||0)-(Number(e.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${choose(`المحفظة`,`PORTFOLIO`)}</p><h1>${t(`projects`)}</h1><p>${choose(`كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.`,`One view for every project: health, progress, team, and next deadline.`)}</p></div><div class="page-actions">${can(`create_projects`)?`<button class="btn btn-primary" data-action="new-project">${icon(`plus`,15)} ${t(`addProject`)}</button>`:``}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${icon(`search`,15)}<input data-search="projects" value="${esc(n.searches.projects)}" placeholder="${t(`search`)}" /></div><div class="sort-box" style="display:flex;align-items:center;gap:6px;"><span style="font-size:11px;color:var(--muted);">${choose(`الترتيب:`,`Sort:`)}</span><select id="sort-projects" class="select-compact" data-action="sort-projects" style="font-size:11px;padding:6px 10px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;"><option value="default" ${i==="default"?`selected`:``}>${choose(`الافتراضي`,`Default`)}</option><option value="alpha-asc" ${i===`alpha-asc`?`selected`:``}>${choose(`أبجدياً (أ - ي)`,`Alphabetical (A - Z)`)}</option><option value="alpha-desc" ${i===`alpha-desc`?`selected`:``}>${choose(`أبجدياً (ي - أ)`,`Alphabetical (Z - A)`)}</option><option value="progress-asc" ${i===`progress-asc`?`selected`:``}>${choose(`نسبة الإنجاز (تصاعدي 0% ← 100%)`,`Progress (Low to High)`)}</option><option value="progress-desc" ${i===`progress-desc`?`selected`:``}>${choose(`نسبة الإنجاز (تنازلي 100% ← 0%)`,`Progress (High to Low)`)}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${r.length} ${choose(`مشاريع`,`projects`)}</span></div></div>${r.length?`<div class="project-cards">${r.map(qe).join(``)}</div>`:`<section class="panel"><div class="empty">${icon(`building`,18)}<span>${t(`noProjects`)}</span></div></section>`}`}function Xe(){let e=n.data.projects.find(e=>e.id===n.activeProjectId);if(!e)return n.view=`projects`,Ye();let r=n.data.tasks.filter(n=>n.projectId===e.id),{internalMembers:i,externalMembers:a}=P(e),o=n.projectTab||`tasks`,s=n.projectMemberFilter||null,c=s?r.filter(e=>e.assigneeId===s||(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).includes(s)):r,l=s?n.data.users.find(e=>e.id===s):null,u=``;if(o===`overview`)u=Je(e,r,i,a);else if(o===`tasks`){let r=n.projectTaskSort||j();u=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${t(`projectTasks`)} ${s?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${choose(`مهام`,`Tasks of`)}: ${esc(choose(l?.name,l?.nameEn||l?.name))})</span>`:``}</h2>
            <p class="panel-subtitle">${choose(`توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.`,`Tasks grouped by current workflow state, automatically sorted.`)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${we(r,`sort-project-tasks`)}
            ${s?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${icon(`close`,12)} ${choose(`إلغاء الفلترة`,`Clear filter`)}</button>`:``}
            ${can(`create_tasks`)?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${esc(e.id)}" title="${choose(`اضغط N للإضافة السريعة`,`Press N to add quickly`)}">${icon(`plus`,14)} ${t(`addTask`)} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:``}
          </div>
        </div>
        ${renderBoard(c,r)}
      </div>
    `}else if(o===`timeline`){let{renderTimelinePanel:n}=window.__timelineExports||{};u=n?n(c,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</h2></div></div>${renderTimeline(c)}</div>`}else if(o===`drawings`){let i=(n.data.documents||[]).filter(n=>n.projectId===e.id&&!n.deletedAt),a=r.filter(e=>e.typeAr===`مخطط`||e.typeEn===`Drawing`||e.templateId),o=n.docTaskFilter||`all`,s=o===`all`?i:i.filter(e=>e.taskId===o);u=`
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
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${esc(e.id)}">
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
    `}else o===`activity`&&(u=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`activity`)}</h2><p class="panel-subtitle">${choose(`كل تغيير مهم يبقى قابلًا للمراجعة.`,`Every important change remains reviewable.`)}</p></div></div>${renderAuditForProject(e.id)}</div>`);let d=e.manager||(n.data.users||[]).find(n=>n.id===e.managerId),f=He(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${icon(n.lang===`ar`?`arrow`:`arrowLeft`,15)}</button>
        <div>
          <p class="eyebrow">${esc(e.code)} · ${e.demo?t(`sampleData`):t(`active`)}</p>
          <h1>${esc(choose(e.nameAr,e.nameEn))}</h1>
          <p>${esc(choose(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${icon(`user`,12)} 
              <strong>${t(`manager`)}:</strong> ${esc(d?choose(d.name,d.nameEn||d.name):`—`)}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${icon(`calendar`,12)} ${dateLabel(e.dueDate,!0)}
                ${f}
              </span>
            `:``}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${icon(`users`,12)}
              <span style="font-size:11px;">${t(`team`)}:</span>
              ${We(i,4,!0,a)}
            </span>
            <span class="status-badge ${esc(e.health)}">${esc(statusText(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${t(`weightedProgress`)}</span>
        ${can(`edit_projects`)||can(`create_projects`)||can(`delete_projects`)||can(`view_reports`)||isAdmin()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${icon(`more`,15)} ${choose(`خيارات`,`Options`)}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${n.lang===`ar`?`left:0`:`right:0`};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:180px;padding:5px;margin-top:5px;text-align:start">
              ${can(`edit_projects`)||isAdmin()?`<button class="menu-item" data-action="edit-project" data-project-id="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`edit`,14)} ${t(`edit`)}</button>`:``}
              ${can(`create_projects`)||isAdmin()?`<button class="menu-item" data-action="clone-project" data-project-id="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`document`,14)} ${choose(`استنساخ المشروع`,`Clone Project`)}</button>`:``}
              ${can(`export_reports`)||isAdmin()?`<button class="menu-item" data-action="export-project" data-project-id="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`document`,14)} ${choose(`تصدير التقرير (Excel)`,`Export Report (Excel)`)}</button>`:``}
              ${can(`delete_projects`)||isAdmin()?`<button class="menu-item" data-action="delete-project" data-project-id="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${icon(`trash`,14)} ${choose(`حذف المشروع`,`Delete Project`)}</button>`:``}
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
  `}function Ze(e=[]){let r=n.data?.users||[];return e.map(e=>{let n=r.find(n=>n.id===e)||{name:e,id:e};return`
      <span class="chip-item" data-uid="${esc(e)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${avatar(n,`mini-avatar`)}
        <span style="font-weight:500;">${esc(choose(n.name,n.nameEn||n.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${esc(e)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${choose(`إزالة`,`Remove`)}">×</button>
      </span>
    `}).join(``)}function Qe(e=null){let r=e?.code||`DARC-${String((n.data?.projects?.length||0)+1).padStart(3,`0`)}`,i=e?P(e).internalMembers.map(e=>e.id):[],a=i.length>0?i:[n.data?.user?.id].filter(Boolean),o=`
    <form id="project-form" data-project-id="${esc(e?.id||``)}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${esc(JSON.stringify(a))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${icon(`building`,14)} <span>${choose(`البيانات الأساسية للمشروع`,`Core Project Information`)}</span>
        </div>

        <div class="field full">
          <label>${t(`nameAr`)} *</label>
          <input name="nameAr" value="${esc(e?.nameAr||``)}" placeholder="${choose(`مثال: فيلا النخيل — التصميم الداخلي`,`e.g. Al Nakheel Villa — Interior Design`)}" required />
        </div>
        <div class="field">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(e?.nameEn||``)}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${t(`projectCode`)} *</label>
          <input name="code" value="${esc(r)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${t(`client`)}</label>
          <input name="clientAr" value="${esc(e?.clientAr||``)}" placeholder="${choose(`اسم العميل أو الجهة المالكة`,`Client or owning entity`)}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${icon(`calendar`,14)} <span>${choose(`الجدولة والإدارة`,`Management & Schedule`)}</span>
        </div>

        <div class="field full">
          <label>${t(`manager`)}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${choose(`— بدون تحديد —`,`— Unassigned —`)}</option>
            ${n.data.users.map(r=>`<option value="${esc(r.id)}" ${(e?e.managerId===r.id:n.data.user.id===r.id)?`selected`:``}>${esc(choose(r.name,r.nameEn||r.name))}</option>`).join(``)}
          </select>
        </div>
        <div class="field">
          <label>${choose(`أولوية المشروع`,`Project Priority`)}</label>
          <select name="priority">
            <option value="low" ${e?.priority===`low`||e?.customFields?.priority===`low`?`selected`:``}>${choose(`منخفضة`,`Low`)}</option>
            <option value="medium" ${!e||e?.priority===`medium`||e?.customFields?.priority===`medium`||!e?.priority?`selected`:``}>${choose(`متوسطة`,`Medium`)}</option>
            <option value="high" ${e?.priority===`high`||e?.customFields?.priority===`high`?`selected`:``}>${choose(`عالية`,`High`)}</option>
            <option value="urgent" ${e?.priority===`urgent`||e?.customFields?.priority===`urgent`?`selected`:``}>${choose(`حرجة / عاجلة`,`Urgent`)}</option>
          </select>
        </div>
        <div class="field">
          <label>${choose(`حالة المشروع`,`Project Status`)}</label>
          <select name="lifecycle">
            <option value="active" ${!e||e.lifecycle===`active`?`selected`:``}>${choose(`نشط (قيد التنفيذ)`,`Active (In Progress)`)}</option>
            <option value="planning" ${e?.lifecycle===`planning`?`selected`:``}>${choose(`تخطيط`,`Planning`)}</option>
            <option value="on_hold" ${e?.lifecycle===`on_hold`?`selected`:``}>${choose(`معلق / متوقف`,`On Hold`)}</option>
            <option value="completed" ${e?.lifecycle===`completed`?`selected`:``}>${choose(`مكتمل`,`Completed`)}</option>
            <option value="archived" ${e?.lifecycle===`archived`?`selected`:``}>${choose(`مؤرشف`,`Archived`)}</option>
          </select>
        </div>
        <div class="field">
          <label>${t(`startDate`)}</label>
          <input type="date" name="startDate" value="${esc(e?.startDate||``)}" />
        </div>
        <div class="field">
          <label>${t(`dueDate`)}</label>
          <input type="date" name="dueDate" value="${esc(e?.dueDate||``)}" />
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
            ${Ze(a)}
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
          <textarea name="descriptionAr" placeholder="${choose(`وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...`,`Brief description of scope, design criteria, and special notes...`)}">${esc(e?.descriptionAr||``)}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${e&&(can(`delete_projects`)||isAdmin())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${esc(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${choose(`حذف المشروع ونقله لسلة المهملات`,`Delete project and move to trash`)}">
              ${icon(`trash`,14)} ${choose(`حذف المشروع`,`Delete Project`)}
            </button>
          `:``}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
          <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${e?t(`save`):t(`create`)}</button>
        </div>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(e?choose(`تعديل بيانات المشروع`,`Edit Project`):t(`addProject`),choose(`إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.`,`Manage project details, schedule, and workflow health.`),o,`project`),setTimeout(()=>{let e=document.getElementById(`project-member-search`),r=document.getElementById(`project-member-dropdown`),i=document.getElementById(`project-members-chips-container`),o=document.getElementById(`project-members-input`),s=document.getElementById(`project-manager-select`);if(!e||!r||!i||!o)return;let c=[...a];function l(){i.innerHTML=Ze(c),i.style.display=c.length?`flex`:`none`,o.value=JSON.stringify(c),i.querySelectorAll(`.btn-remove-project-member`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation();let r=e.dataset.uid;c=c.filter(e=>e!==r),l()})})}s&&s.addEventListener(`change`,()=>{let e=s.value;e&&!c.includes(e)&&(c.push(e),l())});function u(i=``){let a=i.toLowerCase().trim(),o=(n.data?.users||[]).filter(e=>!c.includes(e.id)&&(!a||e.name&&e.name.toLowerCase().includes(a)||e.nameEn&&e.nameEn.toLowerCase().includes(a)||e.email&&e.email.toLowerCase().includes(a)));o.length?(r.innerHTML=o.map(e=>`
          <div class="project-member-opt" data-uid="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${avatar(e,`mini-avatar`)}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${esc(choose(e.name,e.nameEn||e.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${esc(e.roleId||``)}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${choose(`إضافة`,`Add`)}</span>
          </div>
        `).join(``),r.querySelectorAll(`.project-member-opt`).forEach(n=>{n.addEventListener(`mouseenter`,()=>n.style.background=`var(--surface-soft)`),n.addEventListener(`mouseleave`,()=>n.style.background=`transparent`),n.addEventListener(`click`,()=>{let i=n.dataset.uid;i&&!c.includes(i)&&(c.push(i),l(),e.value=``,r.style.display=`none`)})})):r.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${choose(`لا يوجد أعضاء مطابقون`,`No matching members`)}</div>`,r.style.display=`block`}e.addEventListener(`focus`,()=>u(e.value)),e.addEventListener(`input`,()=>u(e.value)),document.addEventListener(`click`,n=>{!e.contains(n.target)&&!r.contains(n.target)&&(r.style.display=`none`)}),l()},50)}function $e(e){let r=`
    <form id="clone-form" data-project-id="${e.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${choose(`أنت على وشك استنساخ المشروع:`,`You are about to clone the project:`)} <strong style="color:var(--ink)">${esc(choose(e.nameAr,e.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${t(`nameAr`)}</label>
          <input name="nameAr" value="${esc(e.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(e.nameEn)} (Copy)" required />
        </div>
      </div>
      
      <div class="field full">
        <label>${choose(`تاريخ التسليم المتوقع`,`Expected Due Date`)}</label>
        <input name="dueDate" type="date" value="${e.dueDate||``}" />
      </div>

      <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:20px;display:flex;flex-direction:column;gap:12px">
        <strong style="font-size:13px">${choose(`إعدادات النسخ المتقدمة`,`Advanced Clone Settings`)}</strong>
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneTasks" checked style="width:16px;height:16px;margin:0">
          ${choose(`نسخ جميع المهام والهيكلة (Tasks)`,`Clone all tasks & structure`)}
        </label>
        
        <div style="padding-${n.lang===`ar`?`right`:`left`}:26px">
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
  `;document.getElementById(`modal-root`).innerHTML=modalShell(choose(`استنساخ المشروع`,`Clone Project`),choose(`أداة إنشاء قوالب المشاريع السريعة`,`Rapid project templating tool`),r,`clone`);let i=document.getElementById(`clone-form`),a=i.querySelector(`input[name="cloneTasks"]`),o=i.querySelector(`input[name="keepAssignees"]`);a.addEventListener(`change`,e=>{o.disabled=!e.target.checked,e.target.checked||(o.checked=!1)}),i.addEventListener(`submit`,async r=>{r.preventDefault();let a=i.querySelector(`button[type="submit"]`);a.disabled=!0;try{let r={nameAr:i.nameAr.value,nameEn:i.nameEn.value,dueDate:i.dueDate.value,cloneTasks:i.cloneTasks.checked,keepAssignees:i.keepAssignees.checked,cloneMembers:i.cloneMembers.checked},a=await D(`/api/projects/${e.id}/clone`,{method:`POST`,body:JSON.stringify(r)});closeModal(),n.view=`project-detail`,n.activeProjectId=a.project.id,await refreshView(),showToast(choose(`تم استنساخ المشروع بنجاح.`,`Project cloned successfully.`))}catch(e){showToast(e.message,!0),a.disabled=!1}})}function et(e,r){let i=`
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
    <body dir="${n.lang===`ar`?`rtl`:`ltr`}">
      ${r}
    </body>
    </html>
  `,a=new Blob([`﻿`+i],{type:`application/vnd.ms-excel;charset=utf-8;`}),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o,s.download=e+`.xls`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)}function tt(){let e=n.data?.projects||[];if(!e||!e.length){showToast(choose(`لا توجد بيانات لتصديرها.`,`No data to export.`),!0);return}let r=new Date().toLocaleDateString(n.lang===`ar`?`ar-SA`:`en-US`),i=`<table>`;i+=`<tr><td colspan="11" class="title">DARC Design Team</td></tr>`,i+=`<tr><td colspan="11" class="subtitle">${choose(`تقرير حالة مشاريع المحفظة`,`Portfolio Projects Report`)}</td></tr>`,i+=`<tr><td colspan="11" class="meta">${choose(`تاريخ الإصدار:`,`Generated on:`)} ${r}</td></tr>`,i+=`<tr><td colspan="11" style="border:none;"></td></tr>`,i+=`<tr class="header">
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
  </tr>`,e.forEach(e=>{let n=e.manager?choose(e.manager.name,e.manager.nameEn||e.manager.name):``;i+=`<tr>
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
    </tr>`}),i+=`</table>`,et(`DARC_Portfolio_Report_${new Date().toISOString().split(`T`)[0]}`,i),showToast(choose(`تم بدء تحميل التقرير.`,`Report download started.`))}function nt(e){let r=(n.data?.projects||[]).find(n=>n.id===e);if(!r)return;let i=(n.data?.tasks||[]).filter(n=>n.projectId===e);if(!i.length){showToast(choose(`لا توجد مهام لهذا المشروع لتصديرها.`,`No tasks to export.`),!0);return}let a=new Date().toLocaleDateString(n.lang===`ar`?`ar-SA`:`en-US`),o=`<table>`;o+=`<tr><td colspan="8" class="title">DARC Design Team</td></tr>`,o+=`<tr><td colspan="8" class="subtitle">${choose(`تقرير مهام المشروع:`,`Project Tasks Report:`)} ${esc(choose(r.nameAr,r.nameEn))}</td></tr>`,o+=`<tr><td colspan="8" class="meta">${choose(`تاريخ الإصدار:`,`Generated on:`)} ${a}</td></tr>`,o+=`<tr><td colspan="8" style="border:none;"></td></tr>`,o+=`<tr class="header">
    <td>${choose(`المهمة (عربي)`,`Task (Ar)`)}</td>
    <td>${choose(`المهمة (إنجليزي)`,`Task (En)`)}</td>
    <td>${choose(`القسم`,`Category`)}</td>
    <td>${choose(`المسؤول`,`Assignee`)}</td>
    <td>${choose(`الحالة`,`Status`)}</td>
    <td>${choose(`تاريخ البدء`,`Start Date`)}</td>
    <td>${choose(`تاريخ التسليم`,`Due Date`)}</td>
    <td>${choose(`الإنجاز`,`Progress %`)}</td>
  </tr>`,i.forEach(e=>{let r=(n.data?.users||[]).find(n=>n.id===(e.assigneeId||e.assignee_id)),i=e.assignee?choose(e.assignee.name,e.assignee.nameEn||e.assignee.name):r?choose(r.name,r.nameEn||r.name):``;o+=`<tr>
      <td>${esc(e.titleAr)}</td>
      <td>${esc(e.titleEn)}</td>
      <td>${esc(choose(e.categoryAr,e.categoryEn))}</td>
      <td>${esc(i)}</td>
      <td>${esc(statusText(e.status))}</td>
      <td>${esc(e.startDate||``)}</td>
      <td>${esc(e.dueDate||``)}</td>
      <td>${e.progress||0}%</td>
    </tr>`}),o+=`</table>`,et(`DARC_Project_${r.code}_${new Date().toISOString().split(`T`)[0]}`,o),showToast(choose(`تم بدء تحميل التقرير.`,`Report download started.`))}var rt=e({TEMPLATE_CATEGORIES:()=>F,openTemplateModal:()=>at,renderTemplates:()=>it}),F=[{id:`architectural`,ar:`معماري`,en:`Architectural`,icon:`🏛️`},{id:`electrical`,ar:`كهرباء — إلكتروميكانيك`,en:`Electrical`,icon:`⚡`},{id:`plumbing`,ar:`سباكة — إلكتروميكانيك`,en:`Plumbing`,icon:`💧`},{id:`hvac`,ar:`تكييف — إلكتروميكانيك`,en:`HVAC`,icon:`🌡️`},{id:`fire`,ar:`حريق — إلكتروميكانيك`,en:`Fire Protection`,icon:`🧯`},{id:`low_current`,ar:`تيار خفيف`,en:`Low Current`,icon:`📡`},{id:`sections`,ar:`مقاطع`,en:`Sections`,icon:`✂️`},{id:`detail`,ar:`تفصيلي`,en:`Detailed`,icon:`🔍`},{id:`site`,ar:`موقع عام`,en:`Site Plan`,icon:`🗺️`},{id:`quantity`,ar:`جداول كميات`,en:`Quantity Tables`,icon:`📊`},{id:`documents`,ar:`وثائق وخطابات`,en:`Documents & Letters`,icon:`📄`}];function it(){let e=n.searches.templates.trim().toLowerCase(),r=[...n.data.templates||[]].sort((e,n)=>(parseInt(e.code,10)||0)-(parseInt(n.code,10)||0)),i=new Map;F.forEach(e=>i.set(e.id,0)),r.forEach(e=>{i.set(e.categoryId,(i.get(e.categoryId)||0)+1)});let a=n.templateCategory||`all`,o=F.map(n=>{if(a!==`all`&&a!==n.id)return null;let i=r.filter(r=>r.categoryId===n.id?!e||`${r.nameAr} ${r.nameEn} ${r.code} ${r.typeAr} ${r.typeEn}`.toLowerCase().includes(e):!1);return i.length?{...n,items:i}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${C(`مخرجات DARC القياسية`,`DARC STANDARD DELIVERABLES`)}</p>
      <h1>${g(`templates`)}</h1>
      <p>${g(`standardLibrarySub`)}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${r.length} ${g(`templatesCount`)}</span>
      ${b(`manage_templates`)?`<button class="btn btn-primary" data-action="new-template" style="margin-${n.lang===`ar`?`right`:`left`}:10px">${T(`plus`,15)} ${C(`إضافة قالب`,`Add Template`)}</button>`:``}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${T(`search`,15)}
        <input data-search="templates" value="${x(n.searches.templates)}" placeholder="${g(`search`)}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${a===`all`?`active`:``}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${g(`all`)}</span>
        <small>${r.length}</small>
      </button>
      ${F.map(e=>`
        <button class="template-category-tab ${a===e.id?`active`:``}" data-action="template-category" data-category="${x(e.id)}">
          <span class="category-icon">${x(e.icon)}</span>
          <span>${x(C(e.ar,e.en))}</span>
          <small>${i.get(e.id)||0}</small>
        </button>
      `).join(``)}
    </aside>
    <div>
      ${o.length?o.map(e=>`
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${x(e.icon)}</span>
            <div>
              <h3>${x(C(e.ar,e.en))}</h3>
              <span>${e.items.length} ${g(`templatesCount`)}</span>
            </div>
          </div>
          <div class="template-grid">
            ${e.items.map(e=>`
              <article class="template-item" style="position:relative;cursor:${b(`manage_templates`)?`pointer`:`default`};" ${b(`manage_templates`)?`data-action="edit-template" data-template-id="${x(e.id)}"`:``}>
                <span class="template-number">${x(e.code)}</span>
                <div class="template-copy">
                  <strong>${x(C(e.nameAr,e.nameEn))}</strong>
                  <span>${x(n.lang===`ar`?e.nameEn:e.nameAr)}</span>
                </div>
                <span class="badge badge-teal" style="font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:6px;margin-inline-start:auto;">${x(e.typeAr||`مخطط`)}</span>
                <button class="btn btn-secondary btn-sm" data-action="use-template" data-template-id="${x(e.id)}" title="${g(`useTemplate`)}" style="padding:3px 8px;font-size:11px;margin-inline-start:6px;display:inline-flex;align-items:center;gap:4px;border-radius:6px;">
                  ${T(`plus`,12)}
                  <span>${g(`useTemplate`)}</span>
                </button>
                ${b(`manage_templates`)?`<button class="template-action" data-action="edit-template" data-template-id="${x(e.id)}" title="${g(`edit`)}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${n.lang===`ar`?`right`:`left`}:6px">${T(`edit`,14)}</button>`:``}
              </article>
            `).join(``)}
          </div>
        </section>
      `).join(``):`
        <section class="panel">
          <div class="empty">
            ${T(`layers`,18)}
            <span>${g(`noTasks`)}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function at(e=null){if(!b(`manage_templates`))return r(g(`permissionDenied`),!0);let n=F.map(n=>`<option value="${x(n.id)}" ${e?.categoryId===n.id?`selected`:``}>${x(C(n.ar,n.en))}</option>`).join(``),i=`<form id="template-form" data-template-id="${x(e?.id||``)}">
    <div class="form-grid">
      <div class="field">
        <label>${g(`nameAr`)}</label>
        <input name="nameAr" value="${x(e?.nameAr||``)}" required />
      </div>
      <div class="field">
        <label>${g(`nameEn`)}</label>
        <input name="nameEn" value="${x(e?.nameEn||``)}" required />
      </div>
      <div class="field">
        <label>${C(`الرمز / الكود`,`Code`)}</label>
        <input name="code" value="${x(e?.code||``)}" placeholder="e.g. 01" />
      </div>
      <div class="field">
        <label>${C(`التصنيف`,`Category`)}</label>
        <select name="categoryId" required>${n}</select>
      </div>
      <div class="field">
        <label>${C(`النوع (عربي)`,`Type (Ar)`)}</label>
        <input name="typeAr" value="${x(e?.typeAr||`مخطط`)}" required />
      </div>
      <div class="field">
        <label>${C(`النوع (إنجليزي)`,`Type (En)`)}</label>
        <input name="typeEn" value="${x(e?.typeEn||`Drawing`)}" required />
      </div>
      <div class="field">
        <label>${C(`الوزن الافتراضي`,`Default Weight`)}</label>
        <input name="defaultWeight" type="number" min="1" value="${e?.defaultWeight||1}" required />
      </div>
      <div class="field">
        <label>${C(`المدة الافتراضية (أيام)`,`Default Duration (Days)`)}</label>
        <input name="defaultDuration" type="number" min="1" value="${e?.defaultDuration||5}" required />
      </div>
    </div>
    <div class="modal-actions" style="display:flex;justify-content:space-between;width:100%">
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${x(e.id)}" style="color:var(--red)">${T(`trash`,14)} ${g(`delete`)}</button>`:`<div></div>`}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${T(`check`,14)} ${g(e?`save`:`create`)}</button>
      </div>
    </div>
  </form>`;document.getElementById(`modal-root`).innerHTML=a(e?C(`تعديل قالب`,`Edit Template`):C(`إضافة قالب جديد`,`Add New Template`),C(`القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.`,`Templates help the team insert tasks quickly with standard criteria.`),i,`template`)}var ot=e({renderDocuments:()=>st});function st(){let e=n.data?.documents||[],r=n.data?.projects||[],i=n.data?.tasks||[],a=(n.searches?.documents||``).trim().toLowerCase(),o=n.docProjectFilter||`all`,s=n.data?.user?.id,c=p(),l=new Set(i.filter(e=>!e.deletedAt).map(e=>e.id)),u=new Set(r.filter(e=>!e.deletedAt).map(e=>e.id)),f=e.filter(e=>!(e.deletedAt||e.taskId&&!l.has(e.taskId)||e.projectId&&!u.has(e.projectId)||o!==`all`&&e.projectId!==o||a&&!(e.originalName||``).toLowerCase().includes(a))).sort((e,n)=>new Date(n.createdAt||0)-new Date(e.createdAt||0)),m=f.reduce((e,n)=>e+(n.size||0),0),h=m>1073741824?(m/1073741824).toFixed(1)+` GB`:m>1048576?(m/1048576).toFixed(1)+` MB`:Math.round(m/1024)+` KB`;return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${C(`مركز المخرجات والمخططات`,`DELIVERABLES & BLUEPRINTS CENTER`)}</p>
        <h2>${g(`documents`)}</h2>
        <p class="intro">${C(`استعراض وتحميل ومعاينة كافة المخططات والمستندات المرفوعة في جميع المشاريع.`,`Browse, preview, and download all architectural blueprints and documents uploaded across projects.`)}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${C(`الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة`,`Go to trash bin to review and restore deleted files and projects`)}">
          ${T(`trash`,14)}
          <span>${C(`سلة المهملات`,`Trash`)}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${f.length} ${C(`ملف`,`files`)} (${h})
        </span>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="filters-bar" style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;align-items:center;">
      <div class="search-input" style="flex:1;min-width:240px;position:relative;">
        <input 
          type="search" 
          placeholder="${C(`بحث في أسماء الملفات والمخططات...`,`Search file and drawing names...`)}" 
          value="${x(n.searches?.documents||``)}" 
          data-action="search-documents" 
          style="width:100%;padding:9px 12px;padding-inline-start:34px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:13px;"
        />
        <span style="position:absolute;inset-inline-start:10px;top:50%;transform:translateY(-50%);color:var(--ink-soft);pointer-events:none;">
          ${T(`search`,15)}
        </span>
      </div>

      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:12px;color:var(--ink-soft);">${C(`المشروع:`,`Project:`)}</span>
        <select data-action="doc-project-filter" style="padding:8px 12px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font-size:12px;min-width:180px;">
          <option value="all" ${o===`all`?`selected`:``}>${C(`— جميع المشاريع —`,`— All Projects —`)}</option>
          ${r.map(e=>`<option value="${x(e.id)}" ${o===e.id?`selected`:``}>${x(e.code)} - ${x(C(e.nameAr,e.nameEn))}</option>`).join(``)}
        </select>
      </div>
    </div>

    <!-- Documents Table -->
    <div class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${C(`اسم المخطط / الملف`,`File / Blueprint Name`)}</th>
              <th>${g(`projects`)}</th>
              <th>${g(`tasks`)}</th>
              <th>${C(`الحالة`,`Status`)}</th>
              <th>${C(`الحجم`,`Size`)}</th>
              <th>${C(`تاريخ الرفع`,`Upload Date`)}</th>
              <th style="text-align:end;">${C(`الإجراءات`,`Actions`)}</th>
            </tr>
          </thead>
          <tbody>
            ${f.length>0?f.map(e=>{let n=r.find(n=>n.id===e.projectId),a=i.find(n=>n.id===e.taskId),o=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round((e.size||0)/1024)+` KB`,l=c||b(`delete_documents`)||e.uploaderId===s;return`
                <tr data-doc-id="${x(e.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${x(e.id)}">
                      <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                        ${T(`document`,15)}
                      </span>
                      <div>
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${x(e.originalName)}">
                          ${x(e.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${x(e.mimeType||`application/octet-stream`)}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${n?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${x(n.id)}">${x(n.code)}</span>`:`—`}
                  </td>
                  <td>
                    ${a?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${x(a.id)}">${x(C(a.titleAr,a.titleEn))}</span>`:`—`}
                  </td>
                  <td>
                    <span class="status-badge ${x(e.status||`draft`)}" style="font-size:11px;">
                      ${x(y(e.status||`draft`))}
                    </span>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${o}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${d(e.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${x(e.id)}" style="padding:5px;" title="${C(`معاينة`,`Preview`)}">
                        ${T(`eye`,14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${x(e.id)}" style="padding:5px;color:var(--teal);" title="${C(`نسخ الرابط`,`Copy Link`)}">
                        ${T(`link`,14)}
                      </button>
                      <a href="/api/documents/${x(e.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${C(`تحميل`,`Download`)}">
                        ${T(`download`,14)}
                      </a>
                      ${l?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${x(e.id)}" style="padding:5px;color:var(--red);" title="${C(`نقل لسلة المهملات (يمكن استعادته خلال 30 يوماً)`,`Move to trash (can be restored within 30 days)`)}">
                          ${T(`trash`,14)}
                        </button>
                      `:``}
                    </div>
                  </td>
                </tr>
              `}).join(``):`
              <tr>
                <td colspan="7">
                  <div class="empty" style="padding:40px 20px;">
                    ${T(`document`,24)}
                    <span>${C(`لا توجد ملفات مطابقة للبحث أو الفلترة المحددة.`,`No documents found matching the criteria.`)}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}var ct=e({FULL_PERMISSIONS_CATALOG:()=>pt,openRoleModal:()=>mt,openUserModal:()=>ht,renderAuditForProject:()=>ut,renderSettings:()=>ft,renderTeam:()=>lt,renderUserActivityCell:()=>dt});function lt(){if(!isAdmin()&&!can(`manage_users`))return`<section class="panel"><div class="empty">${icon(`alert`,18)}<span>${choose(`غير مصرح لك بعرض هذه الصفحة.`,`You are not authorized to view this page.`)}</span></div></section>`;let e=n.data?.user?.id,r=(n.data?.users||[]).filter(e=>e.status!==`inactive`);return r=e===`usr_ahmad`?[...r].sort((e,n)=>e.id===`usr_ahmad`?-1:+(n.id===`usr_ahmad`)):r.filter(e=>e.id!==`usr_ahmad`),`
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
      ${r.map(e=>{let r=teamMetrics(e.id,n.data?.tasks||[]),i=e.id===`usr_ahmad`;return`
          <article class="member-card ${i?`system-developer-card`:``}" style="${i?`border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);`:``}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${avatar(e,`avatar-lg`)}
                <div class="member-card-person-copy">
                  <strong>${esc(choose(e.name,e.nameEn||e.name))}</strong>
                  <span>${esc(choose(e.jobTitleAr||(i?`المبرمج / مدير النظام`:``),e.jobTitleEn||e.jobTitleAr||``))}</span>
                </div>
              </div>
              ${i?`<span class="stealth-dev-badge">${icon(`shield`,12)} ${choose(`مدير ومطور النظام`,`Super Admin & Dev`)}</span>`:canManageAccountPermissions()&&e.id!==n.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${esc(e.id)}">${icon(`more`,15)}</button>`:``}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${e.status===`active`?`done`:`not_started`}">${esc(roleName(e))}</span>
            </div>
            <div class="member-card-stats">
              <span>${t(`progress`)} <strong>${r.progress}%</strong></span>
              <span>${r.tasks} ${t(`tasks`)}</span>
            </div>
            <div class="member-email">${e.email?esc(e.email):t(`noEmail`)}</div>
          </article>
        `}).join(``)}
    </div>
  `}function ut(e){let r=(n.data?.auditLogs||[]).filter(n=>n.details?.projectId===e||n.entityType===`project`&&n.entityId===e);return r.length?`<div class="audit-list">${r.map(e=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${esc(e.user?choose(e.user.name,e.user.nameEn||e.user.name):`DARC`)} · ${esc(e.action)}</strong><span>${esc(e.entityType)} · ${dateLabel(e.createdAt,!0)}</span></div></div>`).join(``)}</div>`:`<div class="empty">${icon(`check`,18)}<span>${choose(`لا توجد تغييرات مسجلة بعد.`,`No changes recorded yet.`)}</span></div>`}function dt(e){let r=e.lastActiveAt||e.customFields?.lastActiveAt,i=e.lastLoginAt||e.customFields?.lastLoginAt;if(!r&&!i)return`<span class="activity-never">${choose(`لم يسجل دخول بعد`,`Never logged in`)}</span>`;let a=Date.now(),o=r?new Date(r).getTime():0,s=e.id===n.data?.user?.id?0:o&&!isNaN(o)?Math.floor((a-o)/6e4):999999,c=s>=0&&s<=5,l=``;if(c)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${choose(`نشط الآن`,`Online`)}</span>`;else if(s<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${choose(`منذ ${s} دقيقة`,`${s}m ago`)}</span>`;else if(s<1440){let e=Math.floor(s/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${choose(`منذ ${e} ساعة`,`${e}h ago`)}</span>`}else o>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(r,!1)}</span>`);let u=i?`<span class="activity-sub" title="${esc(i)}">${choose(`دخول:`,`Login:`)} ${dateLabel(i,!0)}</span>`:``;return`<div class="activity-wrapper">${l}${u}</div>`}function ft(){let e=n.data?.user?.id,r=isAdmin(),i=r||can(`manage_users`)||can(`view_user_activity`),a=[[`profile`,choose(`الملف الشخصي`,`Profile`)],...r||can(`manage_settings`)?[[`company`,t(`company`)]]:[],...r||can(`manage_roles`)?[[`roles`,t(`roles`)]]:[],...i?[[`accounts`,t(`accounts`)]]:[],[`security`,choose(`الأمان`,`Security`)],[`trash`,choose(`سلة المهملات`,`Trash`)],...r||can(`view_audit_logs`)?[[`audit`,t(`audit`)]]:[]];a.some(([e])=>e===n.settingsSection)||(n.settingsSection=`profile`);let o=n.data?.user||{},s=``;if(n.settingsSection===`profile`&&(s=`
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
                <option value="gregorian" ${w()===`gregorian`?`selected`:``}>${choose(`ميلادي — اليوم / الشهر / السنة (مثال: 07/09/2026)`,`Gregorian — Day / Month / Year (e.g. 07/09/2026)`)}</option>
                <option value="hijri" ${w()===`hijri`?`selected`:``}>${choose(`هجري أم القرى — اليوم / الشهر / السنة (مثال: 25/02/1448 هـ)`,`Hijri Umm al-Qura — Day / Month / Year (e.g. 25/02/1448 AH)`)}</option>
              </select>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${t(`save`)}</button>
          </div>
        </form>
      </section>
    `),n.settingsSection===`company`&&(r||can(`manage_settings`))){let e=n.data?.company||{};s=`
      <section class="setting-section">
        <h2>${t(`company`)}</h2>
        <p>${choose(`هوية مساحة العمل وشعار الشركة واللغة الافتراضية.`,`Workspace identity, company logo, and default language.`)}</p>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${choose(`انقر لرفع وتعديل شعار الشركة`,`Click to upload and change company logo`)}">
            <div class="logo-upload-box">
              ${e.logoUrl?`<img src="${esc(e.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${icon(`building`,24)}</span>`:`<span class="brand-mark">${icon(`building`,24)}</span>`}
              <div class="logo-upload-overlay">
                ${icon(`upload`,16)}
                <span>${choose(`تعديل`,`Edit`)}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${esc(e.name||`DARC Design Team`)}</strong>
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
              <input name="nameAr" value="${esc(e.nameAr||``)}" required />
            </div>
            <div class="field">
              <label>${t(`nameEn`)}</label>
              <input name="nameEn" value="${esc(e.nameEn||``)}" />
            </div>
            <div class="field full">
              <label>${t(`emailStatus`)}</label>
              <input value="${esc(n.data?.emailConfigured?t(`emailConfigured`):t(`emailNotConfigured`))}" disabled />
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
    `}if(n.settingsSection===`security`&&(s=`
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
    `),n.settingsSection===`accounts`&&i){let r=isAdmin()||can(`view_user_activity`),i=isAdmin()||can(`manage_users`),a=isAdmin()||can(`manage_existing_account_permissions`)||can(`manage_users`),o=isAdmin(),c=n.data?.users||[];e!==`usr_ahmad`&&(c=c.filter(e=>e.id!==`usr_ahmad`)),s=`
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
              ${c.map(e=>{let i=e.id===`usr_ahmad`;return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${avatar(e)}
                        <div class="team-member-copy">
                          <strong>${esc(choose(e.name,e.nameEn||e.name))}</strong>
                          <span>${esc(choose(e.jobTitleAr||(i?`المبرمج / مدير النظام`:``),e.jobTitleEn||e.jobTitleAr||``))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${i?`<span class="stealth-dev-badge">${icon(`shield`,12)} ${choose(`مدير ومطور النظام`,`Super Admin & Dev`)}</span>`:esc(roleName(e))}
                    </td>
                    <td>${e.email?esc(e.email):`<span style="color:var(--muted)">${t(`noEmail`)}</span>`}</td>
                    <td>
                      <span class="status-badge ${e.status===`active`?`done`:`not_started`}">${e.status===`active`?t(`activeAccount`):t(`pendingAccount`)}</span>
                    </td>
                    ${r?`
                      <td>
                        ${dt(e)}
                      </td>
                    `:``}
                    ${a?`
                      <td>
                        <div class="role-actions">
                          ${i?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(e.id)}">${t(`edit`)}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(e.id)}">${t(`edit`)}</button>
                            ${e.id===n.data?.user?.id?``:`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${esc(e.id)}" title="${e.status===`pending`?choose(`تفعيل الحساب يدوياً`,`Activate manually`):choose(`تغيير كلمة المرور`,`Change password`)}">${icon(e.status===`pending`?`check`:`settings`,13)}</button>
                              ${o?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${esc(e.id)}" title="دخول كـ هذا الحساب">${icon(`user`,13)}</button>`:``}
                            `}
                            ${e.id!==n.data?.user?.id&&e.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${esc(e.id)}">${icon(`send`,13)}</button>`:``}
                            ${e.id===n.data?.user?.id?``:`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${esc(e.id)}">${icon(`trash`,13)}</button>`}
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
    `}if(n.settingsSection===`roles`&&(r||can(`manage_roles`))&&(s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t(`roles`)}</h2>
            <p>${choose(`إدارة الأدوار وصلاحيات الوصول للنظام.`,`Manage roles and access permissions across the system.`)}</p>
          </div>
          ${r||can(`manage_roles`)?`<button class="btn btn-primary btn-sm" data-action="new-role">${icon(`plus`,14)} ${t(`addRole`)}</button>`:``}
        </div>
        <div class="role-list">
          ${(n.data?.roles||[]).map(e=>`
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
    `),n.settingsSection===`trash`){!n.trashLoaded&&!n._trashFetching&&(n._trashFetching=!0,E(async()=>{let{api:e}=await import(`./api-2d5NGaC1.js`).then(e=>e.r);return{api:e}},__vite__mapDeps([0,1,2,3])).then(({api:e})=>e(`/api/trash`)).then(e=>{n.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],n.trashLoaded=!0,n._trashFetching=!1,E(()=>Promise.resolve().then(()=>vt).then(e=>e.renderView()),void 0)}).catch(e=>{n._trashFetching=!1,console.error(`[Trash fetch error]`,e)}));let i=n.trash||[],a=n.trashFilter||`all`,o=(n.trashQuery||``).trim().toLowerCase(),c=i.filter(e=>{if(a!==`all`&&e.type!==a)return!1;if(!o)return!0;let n=(choose(e.nameAr||e.titleAr,e.nameEn||e.titleEn)||e.name||e.title||e.originalName||``).toLowerCase(),r=(e.code||e.projectCode||``).toLowerCase(),i=(e.projectNameAr||e.projectNameEn||``).toLowerCase();return n.includes(o)||r.includes(o)||i.includes(o)}),l=i.filter(e=>e.type===`project`).length,u=i.filter(e=>e.type===`task`).length,d=i.filter(e=>e.type===`document`).length,f=i.length?`
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
          <input type="search" class="input input-sm" placeholder="${choose(`بحث في المحذوفات...`,`Search deleted items...`)}" value="${esc(n.trashQuery||``)}" data-action="search-trash-input" style="width:100%;padding:6px 12px;font-size:12px;" />
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
                <th style="text-align:${n.lang===`ar`?`left`:`right`}">${choose(`الإجراءات`,`Actions`)}</th>
              </tr>
            </thead>
            <tbody>
              ${c.map(i=>{let a=i.type===`project`,o=i.type===`task`,s=i.type===`document`,c=choose(i.nameAr||i.titleAr,i.nameEn||i.titleEn)||i.name||i.title||i.originalName||i.code||choose(`عنصر محذوف`,`Deleted item`),l=!a&&i.projectId?(n.data?.projects||[]).find(e=>e.id===i.projectId):null,u=i.projectNameAr||i.projectNameEn||(l?choose(l.nameAr,l.nameEn||l.nameAr):null),d=i.projectCode||l?.code,f=s&&i.size?i.size>1048576?(i.size/1048576).toFixed(1)+` MB`:Math.round(i.size/1024)+` KB`:``,p=r||can(`manage_trash`)||i.uploaderId===e;return`
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
                    <td style="text-align:${n.lang===`ar`?`left`:`right`}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${esc(i.type)}" data-id="${esc(i.id)}" title="${choose(`استعادة العنصر وإعادته للعمل`,`Restore item to active`)}">
                          ${icon(n.lang===`ar`?`arrow`:`arrowLeft`,12)} ${choose(`استعادة`,`Restore`)}
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
    `}return n.settingsSection===`audit`&&(r||can(`view_audit_logs`))&&(s=`<section class="setting-section"><div class="panel-head"><div><h2>${t(`audit`)}</h2><p>${choose(`سجل غير قابل للتجاهل للعمليات الإدارية وتغييرات العمل.`,`A reviewable history of administrative and work changes.`)}</p></div></div>${n.data?.auditLogs?.length?`<div class="audit-list">${n.data.auditLogs.map(e=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${esc(e.user?choose(e.user.name,e.user.nameEn||e.user.name):`DARC`)} · ${esc(e.action)}</strong><span>${esc(e.entityType)} · ${dateLabel(e.createdAt,!0)}</span></div></div>`).join(``)}</div>`:`<div class="empty">${choose(`سيظهر سجل العمليات بعد أول تعديل.`,`The audit trail will appear after the first change.`)}</div>`}</section>`),`
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
        ${a.map(([e,r])=>`<button class="${n.settingsSection===e?`active`:``}" data-action="settings-section" data-section="${e}">${r}</button>`).join(``)}
      </aside>
      <div class="settings-content">${s}</div>
    </div>
  `}var pt=[{id:`view_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`عرض المشاريع`,nameEn:`View Projects`},{id:`create_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`إنشاء مشاريع جديدة`,nameEn:`Create Projects`},{id:`edit_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`تعديل بيانات ومراحل المشاريع`,nameEn:`Edit Projects`},{id:`delete_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`حذف المشاريع`,nameEn:`Delete Projects`},{id:`manage_project_members`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`إدارة وتعيين أعضاء المشروع`,nameEn:`Manage Project Members`},{id:`create_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إنشاء المهام والمخرجات`,nameEn:`Create Tasks`},{id:`edit_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`تعديل تفاصيل وحالة المهام`,nameEn:`Edit Tasks`},{id:`delete_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`حذف المهام`,nameEn:`Delete Tasks`},{id:`assign_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إسناد وتوزيع المهام للمنفذين`,nameEn:`Assign Tasks`},{id:`review_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`مراجعة المخرجات الهندسية`,nameEn:`Review Deliverables`},{id:`approve_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`اعتماد وتوقيع المخرجات الهندسية`,nameEn:`Approve Deliverables`},{id:`manage_reminders`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إدارة التذكيرات والمتابعات`,nameEn:`Manage Reminders`},{id:`upload_documents`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`رفع وإدارة المخططات والمستندات`,nameEn:`Upload Documents`},{id:`delete_documents`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`حذف المخططات والمستندات`,nameEn:`Delete Documents`},{id:`manage_templates`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`إدارة مكتبة القوالب والمخرجات القياسية`,nameEn:`Manage Templates Library`},{id:`view_dashboard`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`عرض لوحة التحكم والمؤشرات`,nameEn:`View Dashboard`},{id:`view_reports`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`عرض صفحة التقارير والمؤشرات`,nameEn:`View Reports`},{id:`export_reports`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`تصدير التقارير (Excel)`,nameEn:`Export Reports (Excel)`},{id:`manage_users`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة ودعوة وتفعيل حسابات المستخدمين`,nameEn:`Manage Users`},{id:`manage_existing_account_permissions`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`تعديل أدوار وصلاحيات الحسابات الموجودة`,nameEn:`Manage Existing Account Permissions`},{id:`view_user_activity`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`متابعة أوقات دخول ونشاط المستخدمين`,nameEn:`View User Logins & Activity Timestamps`},{id:`manage_roles`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إنشاء وتعديل الأدوار والصلاحيات`,nameEn:`Manage Roles & Permissions`},{id:`manage_settings`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة إعدادات النظام والشركة ومساحة العمل`,nameEn:`Manage Company & Settings`},{id:`manage_trash`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة واستعادة سلة المهملات`,nameEn:`Manage Trash`},{id:`view_audit_logs`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`استعراض سجل الرقابة والعمليات الأمنية`,nameEn:`View Audit Logs`}];function mt(e=null){let r=n.data?.permissionsCatalog&&n.data.permissionsCatalog.length>=10?n.data.permissionsCatalog:pt,i=new Map;r.forEach(e=>{let n=e.category||`general`,r=choose(e.categoryAr||n,e.categoryEn||n);i.has(n)||i.set(n,{name:r,items:[]}),i.get(n).items.push(e)});let a=e?.id===`admin`||e?.permissions&&e.permissions.includes(`*`),o=Array.from(i.entries()).map(([n,r])=>{let i=r.items.map(n=>{let r=n.id||n.key,i=choose(n.nameAr||n.ar,n.nameEn||n.en||r),o=a||e?.permissions&&(e.permissions.includes(r)||typeof PERMISSION_ALIASES<`u`&&PERMISSION_ALIASES[r]&&e.permissions.includes(PERMISSION_ALIASES[r])),s=a?`disabled`:``;return`
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
    <form id="role-form" data-role-id="${esc(e?.id||``)}">
      <div class="form-grid">
        <div class="field">
          <label>${t(`nameAr`)} *</label>
          <input name="nameAr" value="${esc(e?.nameAr||``)}" required />
        </div>
        <div class="field">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(e?.nameEn||``)}" />
        </div>
        <div class="field full">
          <label>${t(`roleDescription`)}</label>
          <textarea name="descriptionAr" rows="2">${esc(e?.descriptionAr||``)}</textarea>
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
        <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${e?t(`save`):t(`create`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(e?choose(`تعديل الدور والصلاحيات`,`Edit role & permissions`):t(`addRole`),choose(`تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.`,`Define granular permissions and workspace access levels for this role.`),c,`role`,`modal-lg`);let l=document.getElementById(`modal-root`);if(l){let e=l.querySelector(`#btn-perm-select-all`),n=l.querySelector(`#btn-perm-deselect-all`);e&&e.addEventListener(`click`,()=>{l.querySelectorAll(`input[name="permissions"]:not(:disabled)`).forEach(e=>e.checked=!0)}),n&&n.addEventListener(`click`,()=>{l.querySelectorAll(`input[name="permissions"]:not(:disabled)`).forEach(e=>e.checked=!1)})}}function ht(e=null){if(e?.id===`usr_ahmad`&&n.data?.user?.id!==`usr_ahmad`)return showToast(choose(`لا يمكن تعديل حساب مدير ومطور النظام.`,`System Developer account is protected.`),!0);if(!e&&!isAdmin())return showToast(t(`adminOnly`),!0);let r=!isAdmin(),i=r?`disabled`:``,a=(n.data?.roles||[]).filter(e=>isAdmin()||e.id!==`admin`),o=`<form id="user-form" data-user-id="${esc(e?.id||``)}" data-permission-only="${r}"><div class="form-grid"><div class="field full"><label>${t(`nameAr`)}</label><input name="name" value="${esc(e?.name||``)}" ${i} required /></div><div class="field"><label>${t(`nameEn`)}</label><input name="nameEn" value="${esc(e?.nameEn||``)}" ${i} /></div><div class="field"><label>${t(`jobTitle`)}</label><input name="jobTitleAr" value="${esc(e?.jobTitleAr||``)}" ${i} /></div><div class="field"><label>${t(`email`)}</label><input name="email" type="email" value="${esc(e?.email||``)}" placeholder="name@darc.com" ${i} /></div><div class="field"><label>${t(`role`)}</label><select name="roleId">${a.map(n=>`<option value="${esc(n.id)}" ${e?.roleId===n.id?`selected`:``}>${esc(choose(n.nameAr,n.nameEn))}</option>`).join(``)}</select></div></div><div class="field-hint">${r?choose(`يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.`,`Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator.`):choose(`إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.`,`If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.`)}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button><button type="submit" class="btn btn-primary">${icon(`check`,14)} ${e?r?choose(`حفظ الصلاحية`,`Save permission`):t(`save`):t(`create`)}</button></div></form>`;document.getElementById(`modal-root`).innerHTML=modalShell(e?r?choose(`تعديل صلاحية الحساب`,`Change account permission`):choose(`تعديل حساب العضو`,`Edit member account`):t(`addMember`),choose(`الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.`,`The role defines what this member can see and change across projects.`),o,`user`)}var gt=e({showNotifications:()=>_t});function _t(){let e=n.data?.notifications||[],r=`${e.filter(e=>!e.read&&!e.readAt).length>0?`
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 10px;">
        ${T(`check`,13)} ${C(`تحديد الكل كمقروء`,`Mark all as read`)}
      </button>
    </div>
  `:``}${e.length?`<div class="attention-list">${e.slice(0,20).map(e=>{let n=e.type===`overdue`||e.type===`escalation`?`red`:e.type===`due_soon`?`amber`:`blue`,r=!!(e.readAt||e.read),i=C(e.titleAr||e.titleEn||e.content||``,e.titleEn||e.titleAr||e.content||``),a=C(e.messageAr||e.bodyAr||e.content||``,e.messageEn||e.bodyEn||e.content||``);return`<button class="attention-item" data-action="read-notification" data-notification-id="${x(e.id)}" style="border:0;text-align:inherit;width:100%;opacity:${r?`.65`:`1`}"><span class="attention-icon ${n}">${T(e.type===`overdue`||e.type===`escalation`?`alert`:e.type===`assignment`?`user`:`bell`,14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${x(i)}</strong><span>${x(a)} · ${d(e.createdAt)}</span></span></button>`}).join(``)}</div>`:`<div class="empty">${T(`bell`,18)}<span>${g(`noAttention`)}</span></div>`}`;document.getElementById(`modal-root`).innerHTML=a(g(`notifications`),C(`تنبيهاتك داخل مساحة العمل والبريد.`,`Your workspace and email notifications.`),r,`notifications`)}var vt=e({canAccessView:()=>I,getFirstAllowedView:()=>L,loadData:()=>bt,navItem:()=>R,refreshView:()=>H,renderApp:()=>z,renderSyncIndicator:()=>yt,renderView:()=>B,switchView:()=>V});function I(e){return n.data?e===`dashboard`?b(`view_dashboard`):e===`projects`||e===`project-detail`?b(`view_projects`):e===`tasks`?b(`create_tasks`)||b(`edit_tasks`)||b(`delete_tasks`)||b(`assign_tasks`)||b(`review_tasks`)||b(`approve_tasks`)||b(`manage_reminders`)||p():e===`documents`?b(`upload_documents`)||b(`delete_documents`)||p():e===`templates`?b(`manage_templates`)||p():e===`team`?p()||b(`manage_users`):e===`reports`?b(`view_reports`)||p():e===`settings`:!0}function L(){for(let e of[`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`])if(I(e))return e;return`dashboard`}function yt(){let e=s().length;return o()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${C(`انقر للمزامنة الفورية مع السيرفر`,`Click to sync now with server`)}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${C(`مزامنة معلقة`,`Pending Sync`)}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:``:`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${C(`وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً`,`Offline Mode — all actions stored locally and will auto-sync`)}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${C(`أوفلاين`,`Offline`)}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:``}
    </button>`}if(typeof window<`u`&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;let e=()=>{let e=document.getElementById(`sync-status-indicator`);e&&(e.innerHTML=yt())};window.addEventListener(`darc:queue-change`,e),window.addEventListener(`online`,e),window.addEventListener(`offline`,e)}function R(e,r,i){return`<button class="nav-item ${n.view===e||e===`projects`&&n.view===`project-detail`?`active`:``}" data-view="${e}">${T(i,17)}<span>${r}</span></button>`}function z(){if(I(n.view)||(n.view=L()),typeof window<`u`){let e=window.location.hash.replace(/^#/,``);if(!e||e===`login`||e===`forgot`){let e=n.view;n.view===`project-detail`&&n.activeProjectId&&(e=`project-detail?id=${encodeURIComponent(n.activeProjectId)}${n.projectTab?`&tab=${encodeURIComponent(n.projectTab)}`:``}`),window._isInternalNav=!0,window.history&&window.history.replaceState?window.history.replaceState(null,``,`#${e}`):window.location.hash=`#${e}`}}document.body.classList.add(`in-app`),document.body.classList.toggle(`is-ltr`,n.lang===`en`),document.documentElement.lang=n.lang,document.documentElement.dir=n.lang===`ar`?`rtl`:`ltr`;let e=(n.data?.notifications||[]).filter(e=>!e.read).length,r=n.data?.user||{},i=p()||b(`manage_settings`)||b(`manage_roles`)||b(`manage_users`)||b(`manage_trash`)||b(`view_audit_logs`);document.getElementById(`app`).innerHTML=`
    <div class="app-shell ${n.lang===`en`?`is-ltr`:``}">
      <aside class="sidebar ${n.sidebarOpen?`open`:``}">
        <div class="sidebar-brand">
          ${n.data?.company?.logoUrl?`<img src="${x(n.data.company.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${T(`building`,20)}</span>`:`<span class="brand-mark">${T(`building`,20)}</span>`}
          <div>
            <div class="brand-name">${x(C(n.data?.company?.nameAr||n.data?.company?.name||`DARC Design Team`,n.data?.company?.nameEn||n.data?.company?.name||`DARC Design Team`))}</div>
            <div class="brand-subtitle">${g(`workspace`)}</div>
          </div>
        </div>
        <div class="nav-title">${C(`مساحة العمل`,`WORKSPACE`)}</div>
        <nav class="nav-list">
          ${I(`dashboard`)?R(`dashboard`,g(`dashboard`),`grid`):``}
          ${I(`projects`)?R(`projects`,g(`projects`),`building`):``}
          ${I(`tasks`)?R(`tasks`,g(`myTasks`),`checklist`):``}
          ${I(`documents`)?R(`documents`,g(`documents`),`document`):``}
          ${I(`templates`)?R(`templates`,g(`templates`),`layers`):``}
          ${I(`team`)?R(`team`,g(`team`),`users`):``}
          ${I(`reports`)?R(`reports`,g(`reports`),`chart`):``}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${i?C(`إدارة النظام`,`ADMIN`):C(`حسابي`,`MY ACCOUNT`)}</div>
        <nav class="nav-list">${R(`settings`,i?g(`settings`):C(`الملف الشخصي والأمان`,`Profile & Security`),`settings`)}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${ee(r)}<div class="admin-info"><strong>${x(C(r.name,r.nameEn||r.name))}</strong><span>${x(S(r))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${C(`نسخة عمل`,`Workspace build`)}</span><button data-action="logout" title="${g(`signOut`)}">${T(`logout`,15)}</button></div>
        </div>
      </aside>
      <section class="workspace">
        <header class="topbar">
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${T(`menu`,18)}</button><div><div class="topbar-kicker">DARC / ${g(`workspace`)}</div><div class="topbar-title">${x(_())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${yt()}</span>
            <button class="topbar-search-trigger" data-action="open-omnisearch" title="${C(`بحث شامل وسريع`,`Omnisearch`)}">
              ${T(`search`,14)}
              <span>${C(`بحث شامل...`,`Search...`)}</span>
              <kbd class="shortcut-kbd">${typeof navigator<`u`&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?`⌘K`:`Ctrl+K`}</kbd>
            </button>
            <button class="icon-button" data-action="open-cheatsheet" title="${C(`دليل اختصارات لوحة المفاتيح (?)`,`Keyboard shortcuts guide (?)`)}" style="color:var(--ink-soft);" aria-label="Shortcuts">
              <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
            </button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-theme">${n.theme===`dark`?`☀️`:`🌙`}</button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-lang">${n.lang===`ar`?`EN`:`عربي`} ${T(`globe`,14)}</button>
            <button class="icon-button" data-action="show-notifications" aria-label="${g(`notifications`)}">${T(`bell`,17)}${e?`<span class="notification-dot"></span>`:``}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${ee(r)}<div class="profile-chip-text"><strong>${x(C(r.name,r.nameEn||r.name))}</strong><span>${x(S(r))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,B()}function B(){let e=document.getElementById(`main-content`);if(!e)return;I(n.view)||(n.view=L());let r=``;n.view===`dashboard`&&(r=renderDashboard()),n.view===`projects`&&(r=renderProjects()),n.view===`tasks`&&(r=renderTasks()),n.view===`documents`&&(r=renderDocuments()),n.view===`templates`&&(r=renderTemplates()),n.view===`team`&&(r=renderTeam()),n.view===`reports`&&(r=renderReports()),n.view===`settings`&&(r=renderSettings()),n.view===`project-detail`&&(r=renderProjectDetail()),e.innerHTML=r,n.view===`project-detail`&&n.projectTab===`timeline`&&setTimeout(drawTimelineArrows,0)}function V(e,r=void 0){I(e)||(e=L()),n.view=e,r!==void 0&&(n.activeProjectId=r),n.sidebarOpen=!1,document.querySelector(`.sidebar`)?.classList.remove(`open`),document.querySelectorAll(`.nav-item`).forEach(n=>{let r=n.dataset.view,i=r===e||r===`projects`&&e===`project-detail`;n.classList.toggle(`active`,i)});let i=document.querySelector(`.topbar-title`);i&&(i.textContent=_());try{let r=e;e===`project-detail`&&n.activeProjectId&&(r=`project-detail?id=${encodeURIComponent(n.activeProjectId)}${n.projectTab?`&tab=${encodeURIComponent(n.projectTab)}`:``}`),typeof window<`u`&&window.location.hash.replace(/^#/,``)!==r&&(window._isInternalNav=!0,window.location.hash=r),typeof sessionStorage<`u`&&sessionStorage.setItem(`darc_last_route`,JSON.stringify({view:n.view,activeProjectId:n.activeProjectId,projectTab:n.projectTab}))}catch{}requestAnimationFrame(()=>{B()})}async function H(e=!1){try{await bt(e)}catch(e){showToast(e.message,!0)}}async function bt(e=!1){try{let r=await D(`/api/bootstrap`,{silent:e});if(r===null)return;if(u(r),n.isOffline=!1,n.data?.tasks&&r?.tasks){let e=Date.now(),i=new Set(r.tasks.map(e=>e.id));for(let a of n.data.tasks)i.has(a.id)||e-(a.createdAt?new Date(a.createdAt).getTime():e)<12e4&&(r.tasks.unshift(a),i.add(a.id))}if(n.data?.projects&&r?.projects){let e=Date.now(),i=new Set(r.projects.map(e=>e.id));for(let a of n.data.projects)i.has(a.id)||e-(a.createdAt?new Date(a.createdAt).getTime():e)<12e4&&(r.projects.unshift(a),i.add(a.id))}let i=!1;if(n.data&&r){if(n.data.updatedAt!==r.updatedAt)i=!0;else if(n.data.tasks?.length!==r.tasks?.length||n.data.projects?.length!==r.projects?.length)i=!0;else{let e=n.data.tasks||[],a=r.tasks||[];for(let n=0;n<a.length;n++){let r=a[n],o=e[n];if(!o||o.id!==r.id||o.status!==r.status||(o.sortOrder||o.sort_order)!==(r.sortOrder||r.sort_order)||o.progress!==r.progress){i=!0;break}}if(!i){let e=n.data.projects||[],a=r.projects||[];for(let n=0;n<a.length;n++){let r=a[n],o=e[n];if(!o||o.id!==r.id||o.lifecycle!==r.lifecycle||o.health!==r.health||o.progress!==r.progress){i=!0;break}}}}}if(!n.data||i||n.data.comments?.length!==r.comments?.length||n.data.documents?.length!==r.documents?.length||n.data.users?.length!==r.users?.length||n.data.auditLogs?.length!==r.auditLogs?.length||n.data.notifications?.length!==r.notifications?.length){n.data=r,I(n.view)||(n.view=L());let i=!!document.getElementById(`modal-root`)?.children?.length;requestAnimationFrame(!e&&!i?()=>z():()=>B())}else n.data=r,I(n.view)||(n.view=L(),requestAnimationFrame(()=>B()))}catch(r){if(r&&(r.status===401||r.status===403))throw r;let i=await l();if(i){n.data=i,I(n.view)||(n.view=L()),n.isOffline=!0;let r=!!document.getElementById(`modal-root`)?.children?.length;!e&&!r?z():B();return}throw r}}var xt=typeof navigator<`u`&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?`⌘K`:`Ctrl+K`,U=0,W=[];function St(){let e=document.getElementById(`omnisearch-modal`);e&&e.remove(),document.body.style.overflow=`hidden`;let n=C(`ابحث في المشاريع، المهام، والأعضاء... (${xt})`,`Search projects, tasks, team... (${xt})`),r=`
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${T(`search`,18)}</span>
          <input 
            id="omnisearch-input" 
            type="text" 
            autocomplete="off" 
            placeholder="${x(n)}" 
            onfocus="this.placeholder=''" 
            onblur="if(!this.value) this.placeholder='${x(n)}'"
          />
          <button class="btn btn-ghost btn-sm" data-action="close-omnisearch" style="padding:4px 8px;">
            <kbd class="shortcut-kbd">ESC</kbd>
          </button>
        </div>
        <div id="omnisearch-results-container" class="omnisearch-results">
          ${Et(``)}
        </div>
        <div class="omnisearch-foot">
          <div class="omni-shortcuts-hint">
            <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd> ${C(`للتنقل`,`to navigate`)}</span>
            <span><kbd class="shortcut-kbd">↵</kbd> ${C(`للاختيار`,`to select`)}</span>
            <span><kbd class="shortcut-kbd">ESC</kbd> ${C(`للإغلاق`,`to close`)}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="open-cheatsheet" style="font-size:11px;padding:2px 6px;">
            ${T(`sparkles`,12)} ${C(`دليل الاختصارات (?)`,`Shortcuts (?)`)}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,r);let i=document.getElementById(`omnisearch-modal`);i&&i.addEventListener(`click`,e=>{e.target===i&&G()});let a=document.getElementById(`omnisearch-input`);a&&(a.focus(),a.addEventListener(`input`,e=>{U=0;let n=document.getElementById(`omnisearch-results-container`);n&&(n.innerHTML=Et(e.target.value))}),a.addEventListener(`keydown`,Ct))}function G(){let e=document.getElementById(`omnisearch-modal`);e&&e.remove(),document.querySelector(`.modal-backdrop`)||(document.body.style.overflow=``)}function Ct(e){e.key===`ArrowDown`?(e.preventDefault(),W.length>0&&(U=(U+1)%W.length,wt())):e.key===`ArrowUp`?(e.preventDefault(),W.length>0&&(U=(U-1+W.length)%W.length,wt())):e.key===`Enter`?(e.preventDefault(),W[U]&&Tt(W[U])):e.key===`Escape`&&G()}function wt(){document.querySelectorAll(`.omni-item`).forEach((e,n)=>{e.classList.toggle(`selected`,n===U),n===U&&e.scrollIntoView({block:`nearest`})})}function Tt(e){if(G(),e.type===`action`){if(e.id===`new-task`){let r=(n.data?.projects||[]).find(e=>e.id===(n.activeProjectId||n.lastActiveProjectId))||(n.data?.projects||[])[0];M(null,null,e.targetProjectId||r?.id)}else e.id===`new-project`?Qe():e.id===`cheatsheet`&&Dt()}else if(e.type===`project`)n.projectTab=`tasks`,n.lastActiveProjectId=e.id,V(`project-detail`,e.id);else if(e.type===`task`){let r=n.data?.tasks?.find(n=>n.id===e.id);r&&M(r)}else if(e.type===`user`){let r=n.data?.users?.find(n=>n.id===e.id);r&&typeof window.openUserModal==`function`&&window.openUserModal(r)}}function Et(e){let r=e.trim().toLowerCase(),i=[],a=(n.data?.projects||[]).find(e=>e.id===(n.activeProjectId||n.lastActiveProjectId))||(n.data?.projects||[])[0],o=a?C(a.nameAr,a.nameEn):``,s=[];if((b(`create_tasks`)||p())&&s.push({type:`action`,id:`new-task`,targetProjectId:a?.id,title:C(`إضافة مهمة جديدة`,`Create new task`),sub:a?C(`في مشروع: ${o}`,`In project: ${o}`):C(`إجراء سريع`,`Quick action`),icon:`plus`,keywords:`new task مهمة إضافة عمل جديد`}),(b(`create_projects`)||p())&&s.push({type:`action`,id:`new-project`,title:C(`إنشاء مشروع جديد`,`Create new project`),sub:C(`إجراء سريع`,`Quick action`),icon:`building`,keywords:`new project مشروع إنشاء جديد`}),s.push({type:`action`,id:`cheatsheet`,title:C(`عرض دليل اختصارات لوحة المفاتيح`,`View keyboard shortcuts guide`),sub:C(`مساعدة`,`Help`),icon:`sparkles`,keywords:`shortcuts اختصارات كيبورد مساعدة`}),s.forEach(e=>{(!r||e.keywords.includes(r)||e.title.toLowerCase().includes(r))&&i.push(e)}),(b(`view_projects`)||p())&&(n.data?.projects||[]).forEach(e=>{(!r||`${e.nameAr} ${e.nameEn} ${e.code} ${e.clientAr} ${e.clientEn}`.toLowerCase().includes(r))&&i.push({type:`project`,id:e.id,title:C(e.nameAr,e.nameEn),sub:`${e.code} · ${C(e.clientAr,e.clientEn)||``}`,badge:`${e.progress}%`,icon:`building`})}),I(`tasks`)&&(n.data?.tasks||[]).forEach(e=>{(!r||`${e.titleAr} ${e.titleEn} ${e.categoryAr} ${e.categoryEn}`.toLowerCase().includes(r))&&i.push({type:`task`,id:e.id,title:C(e.titleAr,e.titleEn),sub:e.dueDate?`📅 ${d(e.dueDate)}`:C(e.categoryAr,e.categoryEn)||``,badge:`${e.progress}%`,icon:`checklist`})}),(p()||b(`manage_users`))&&(n.data?.users||[]).forEach(e=>{(!r||`${e.name} ${e.nameEn} ${e.email} ${e.jobTitleAr}`.toLowerCase().includes(r))&&i.push({type:`user`,id:e.id,title:C(e.name,e.nameEn||e.name),sub:e.email||``,badge:S(e),icon:`user`})}),W=i.slice(0,15),!W.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${T(`search`,24)}</span>
        <strong style="color:var(--ink);">${C(`لا توجد نتائج مطابقة`,`No matching results`)}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${C(`جرب البحث بكلمات أخرى أو رمز المشروع.`,`Try different keywords or project code.`)}</p>
      </div>
    `;let c=``;return W.map((e,n)=>{let r=``,i=e.type===`action`?C(`إجراءات سريعة`,`Quick Actions`):e.type===`project`?C(`المشاريع`,`Projects`):e.type===`task`?C(`المهام والمخرجات`,`Tasks & Deliverables`):C(`فريق العمل`,`Team`);return i!==c&&(c=i,r=`<div class="omni-group-title">${i}</div>`),`
      ${r}
      <div class="omni-item ${n===U?`selected`:``}" data-omni-index="${n}" onclick="window.__selectOmniItem(${n})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${T(e.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${x(e.title)}</strong>
            ${e.sub?`<span style="font-size:11px;color:var(--muted);">${x(e.sub)}</span>`:``}
          </div>
        </div>
        ${e.badge?`<span class="omni-badge">${x(e.badge)}</span>`:``}
      </div>
    `}).join(``)}window.__selectOmniItem=e=>{W[e]&&Tt(W[e])};function Dt(){G();let e=`
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${C(`استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:`,`Use these shortcuts to navigate the workspace at full speed without a mouse:`)}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${C(`البحث الشامل والأوامر السريعة`,`Omnisearch & Quick Commands`)}</span>
          <kbd class="shortcut-kbd">${xt}</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${C(`إضافة مهمة سريعة في المشروع`,`Add new task in project`)}</span>
          <kbd class="shortcut-kbd">N</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${C(`إنشاء مشروع جديد`,`Create new project`)}</span>
          <kbd class="shortcut-kbd">P</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${C(`فتح دليل الاختصارات هذا`,`Open this shortcuts guide`)}</span>
          <kbd class="shortcut-kbd">? / ؟</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${C(`إغلاق أي نافذة منبثقة أو بحث`,`Close modal or search`)}</span>
          <kbd class="shortcut-kbd">ESC</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${C(`التنقل بين نتائج البحث`,`Navigate search results`)}</span>
          <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd></span>
        </div>
        <div class="cheatsheet-row">
          <span>${C(`تأكيد واختيار النتيجة`,`Select search result`)}</span>
          <kbd class="shortcut-kbd">↵ Enter</kbd>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:24px;">
        <button type="button" class="btn btn-primary" data-action="close-modal">${C(`فهمت ذلك`,`Got it`)}</button>
      </div>
    </div>
  `;document.getElementById(`modal-root`).innerHTML=a(C(`دليل اختصارات لوحة المفاتيح`,`Keyboard Shortcuts Guide`),C(`طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية`,`Work faster with productivity hotkeys`),e,`cheatsheet`)}function Ot(){window.addEventListener(`keydown`,e=>{let r=document.activeElement,i=r&&(r.tagName===`INPUT`||r.tagName===`TEXTAREA`||r.tagName===`SELECT`||r.isContentEditable),a=e.code===`KeyK`||e.key?.toLowerCase()===`k`||e.key===`ن`;(e.metaKey||e.ctrlKey)&&a?(e.preventDefault(),document.getElementById(`omnisearch-modal`)?G():St()):(e.key===`?`||e.key===`؟`||e.code===`Slash`&&e.shiftKey)&&!i?(e.preventDefault(),Dt()):(e.code===`KeyN`||e.key?.toLowerCase()===`n`||e.key===`ى`)&&!i&&!e.metaKey&&!e.ctrlKey&&!e.altKey?(e.preventDefault(),M(null,null,n.view===`project-detail`&&n.activeProjectId?n.activeProjectId:n.data?.projects?.[0]?.id)):(e.code===`KeyP`||e.key?.toLowerCase()===`p`||e.key===`ح`)&&!i&&!e.metaKey&&!e.ctrlKey&&!e.altKey?(e.preventDefault(),Qe()):e.key===`Escape`&&document.getElementById(`omnisearch-modal`)&&(e.preventDefault(),G())})}var kt=e({getOrCreateFloatingUploadWidget:()=>zt,handleChange:()=>Pt,handleClick:()=>jt,handleInput:()=>Nt,handleSubmit:()=>At,init:()=>Vt,updateFloatingUploadWidget:()=>K,uploadTaskFiles:()=>Bt});async function At(e){let r=e.target;if(![`project-form`,`task-form`,`user-form`,`role-form`,`activation-form`,`task-comment-form`,`template-form`,`force-password-form`].includes(r.id)&&!r.dataset.action)return;e.preventDefault();let i=Object.fromEntries(new FormData(r).entries()),a=r.querySelector(`button[type="submit"]`);a&&(a.disabled=!0,a.classList.add(`is-loading`));try{if(r.id===`activation-form`){if(i.password!==i.passwordConfirm)throw Error(choose(`كلمتا المرور غير متطابقتين.`,`Passwords do not match.`));delete i.passwordConfirm,await D(`/api/auth/activate`,{method:`POST`,body:JSON.stringify(i)}),window.history.replaceState({},``,window.location.pathname),await loadData();return}if(r.id===`project-form`){i.startDate||=null,i.dueDate||=null,i.managerId||=null;let e=[];try{i.memberIds&&(e=JSON.parse(i.memberIds))}catch{}i.managerId&&!e.includes(i.managerId)&&e.push(i.managerId),i.memberIds=e;let a=!!r.dataset.projectId,o=await D(a?`/api/projects/${r.dataset.projectId}`:`/api/projects`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.project){if(n.data.projects||(n.data.projects=[]),a){let e=n.data.projects.findIndex(e=>e.id===o.project.id);e!==-1&&(n.data.projects[e]={...n.data.projects[e],...o.project})}else n.data.projects.unshift(o.project)}closeModal(),B(),showToast(choose(`تم حفظ المشروع.`,`Project saved.`));return}if(r.id===`task-form`){let e=r.dataset.taskId;i.remindAt,delete i.remindAt,i.templateId=i.templateId||null,i.typeAr=i.typeAr||(i.templateId?`مخطط`:null),i.typeEn=i.typeEn||(i.templateId?`Drawing`:null),i.startDate||=null,i.dueDate||=null,i.assigneeId||=null,i.reviewerId||=null;let a=[];try{a=JSON.parse(i.additionalAssignees||`[]`)}catch{a=[...r.querySelectorAll(`select[name="additionalAssignees"] option:checked`)].map(e=>e.value)}let o=[];try{o=JSON.parse(i.externalAssignees||`[]`)}catch{let e=String(i.externalAssignees||``).trim();o=e?e.split(/[,،]+/).map(e=>e.trim()).filter(Boolean):[]}let s=[];try{s=JSON.parse(i.remindersJson||`[]`)}catch{s=[]}delete i.additionalAssignees,delete i.externalAssignees,delete i.remindersJson,delete i.dependencies,delete i.weight,delete i.progress,i.customFields={additional_assignees:a,external_assignees:o,reminders:s},i.projectId||=n.activeProjectId||n.data.projects?.[0]?.id;let c=!!e,l=await D(c?`/api/tasks/${e}`:`/api/tasks`,{method:c?`PATCH`:`POST`,body:JSON.stringify(i)});if(l.task){if(n.data.tasks||(n.data.tasks=[]),c){let e=n.data.tasks.findIndex(e=>e.id===l.task.id);e!==-1&&(n.data.tasks[e]={...n.data.tasks[e],...l.task})}else n.data.tasks.unshift(l.task),n.view===`tasks`&&(n.taskProjectFilter!==`all`&&n.taskProjectFilter!==l.task.projectId&&(n.taskProjectFilter=l.task.projectId),n.taskFilter===`mine`&&l.task.assigneeId!==n.data.user?.id&&(n.taskFilter=`all`));if(Array.isArray(s)&&s.length>0)for(let e of s)(!e.id||e.id.startsWith(`rem_temp_`))&&D(`/api/reminders`,{method:`POST`,body:JSON.stringify({taskId:l.task.id,remindAt:new Date(e.remindAt).toISOString(),noteAr:e.noteAr||i.titleAr||`تذكير لمتابعة المهمة`})}).catch(e=>console.warn(`[Reminder dispatch note]`,e))}closeModal(),B(),showToast(choose(`تم حفظ المهمة بنجاح.`,`Task saved successfully.`));return}if(r.id===`task-comment-form`){let e=r.dataset.taskId,o=await D(`/api/tasks/${e}/comments`,{method:`POST`,body:JSON.stringify(i)});r.reset(),o.comment&&(n.data.comments||(n.data.comments=[]),n.data.comments.push(o.comment));let s=n.data.tasks.find(n=>n.id===e),c=document.getElementById(`task-comments-list`);c&&(c.innerHTML=renderTaskComments(s),c.scrollTop=c.scrollHeight),a&&(a.disabled=!1);return}if(r.id===`force-password-form`){let e=r.dataset.userId,o=r.dataset.isPending===`true`;await D(`/api/users/${e}/force-password`,{method:`POST`,body:JSON.stringify(i)});let s=n.data.users.find(n=>n.id===e);s&&(s.status=`active`),closeModal(),B(),showToast(o?choose(`تم تفعيل الحساب بنجاح.`,`Account activated successfully.`):choose(`تم تغيير كلمة المرور وطرد المستخدم بنجاح.`,`Password changed and user kicked successfully.`)),a&&(a.disabled=!1);return}if(r.id===`user-form`){let e=r.dataset.userId,a=!!e,o=await D(a?`/api/users/${e}`:`/api/users`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.user){if(n.data.users||(n.data.users=[]),a){let e=n.data.users.findIndex(e=>e.id===o.user.id);e!==-1&&(n.data.users[e]={...n.data.users[e],...o.user})}else n.data.users.unshift(o.user)}closeModal(),B(),showToast(choose(`تم حفظ حساب العضو.`,`Member account saved.`));return}if(r.id===`role-form`){let e=r.dataset.roleId,a=[...r.querySelectorAll(`input[name="permissions"]:checked`)].map(e=>e.value),o=!!e,s=await D(o?`/api/roles/${e}`:`/api/roles`,{method:o?`PATCH`:`POST`,body:JSON.stringify({...i,permissions:a})});if(s.role){if(n.data.roles||(n.data.roles=[]),o){let e=n.data.roles.findIndex(e=>e.id===s.role.id);e!==-1&&(n.data.roles[e]={...n.data.roles[e],...s.role})}else n.data.roles.push(s.role)}closeModal(),B(),showToast(choose(`تم حفظ الدور بنجاح.`,`Role saved.`));return}if(r.id===`template-form`){let e=r.dataset.templateId,a=!!e,o=await D(a?`/api/templates/${e}`:`/api/templates`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.template){if(n.data.templates||(n.data.templates=[]),a){let e=n.data.templates.findIndex(e=>e.id===o.template.id);e!==-1&&(n.data.templates[e]={...n.data.templates[e],...o.template})}else n.data.templates.push(o.template)}closeModal(),B(),showToast(choose(`تم حفظ القالب بنجاح.`,`Template saved.`));return}if(r.dataset.action===`update-profile`){if(i.calendarSystem){n.calendarSystem=i.calendarSystem;try{localStorage.setItem(`darc_calendar_system`,i.calendarSystem)}catch{}}let e=await D(`/api/users/me`,{method:`PATCH`,body:JSON.stringify(i)});if(e.user){n.data.user={...n.data.user,...e.user};let r=(n.data.users||[]).findIndex(e=>e.id===n.data.user.id);r!==-1&&(n.data.users[r]={...n.data.users[r],...e.user})}B(),showToast(choose(`تم حفظ وتحديث الملف الشخصي بنجاح.`,`Profile updated successfully.`)),a&&(a.disabled=!1);return}if(r.dataset.action===`update-company`){let e=await D(`/api/company`,{method:`PATCH`,body:JSON.stringify(i)});e.company&&(n.data.company={...n.data.company,...e.company}),B(),showToast(choose(`تم تحديث بيانات الشركة.`,`Company data updated.`)),a&&(a.disabled=!1);return}if(r.dataset.action===`change-password`){if(i.newPassword.length<10)throw Error(choose(`كلمة المرور يجب أن تكون 10 أحرف على الأقل.`,`Password must be at least 10 characters.`));await D(`/api/auth/change-password`,{method:`POST`,body:JSON.stringify(i)}),r.reset(),showToast(choose(`تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.`,`Password changed successfully. Signed out of other devices.`)),a&&(a.disabled=!1);return}}catch(e){r.id===`activation-form`?renderActivation(i.token,e.message):showToast(e.message,!0)}finally{a&&(a.disabled=!1,a.classList.remove(`is-loading`))}}async function jt(e){let r=document.getElementById(`mention-dropdown`),i=document.getElementById(`project-menu`);if(r&&!e.target.closest(`#mention-dropdown`)&&!e.target.closest(`input[name="content"]`)&&(r.style.display=`none`),i&&!e.target.closest(`#project-menu`)&&!e.target.closest(`[data-action="toggle-project-menu"]`)&&(i.style.display=`none`),e.target.classList.contains(`modal-backdrop`)){closeModal();return}if(e.target.closest(`#task-dropzone`)&&e.target.id!==`task-upload-input`){let e=document.getElementById(`upload-progress-container`);if(!e||e.style.display===`none`){let e=document.getElementById(`task-upload-input`);e&&e.click()}return}let a=e.target.closest(`[data-action], [data-view]`);if(!a)return;let o=a.dataset.action;if(a.classList.contains(`menu-item`)){let e=a.closest(`.dropdown-menu`);e&&(e.style.display=`none`)}if(a.dataset.view)V(a.dataset.view,a.dataset.projectId||void 0);else if(o===`trigger-avatar-upload`){let e=document.getElementById(`user-avatar-file-input`);e&&e.click()}else if(o===`trigger-company-logo-upload`){let e=document.getElementById(`company-logo-file-input`);e&&e.click()}else if(o===`toggle-theme`){n.theme=n.theme===`dark`?`light`:`dark`,window.localStorage.setItem(`darc-theme`,n.theme),document.documentElement.dataset.theme=n.theme;let e=document.querySelector(`[data-action="toggle-theme"]`);e&&(e.textContent=n.theme===`dark`?`☀️`:`🌙`)}else if(o===`toggle-lang`){if(n.lang=n.lang===`ar`?`en`:`ar`,window.localStorage.setItem(`darc-locale`,n.lang),document.documentElement.lang=n.lang,document.documentElement.dir=n.lang===`ar`?`rtl`:`ltr`,document.body.classList.toggle(`is-ltr`,n.lang===`en`),n.data)z();else{let e=new URLSearchParams(window.location.hash.replace(/^#/,``));e.get(`activate`)?renderActivation(e.get(`activate`)):e.get(`reset`)?renderResetPassword(e.get(`reset`)):renderLogin(``,document.getElementById(`forgot-form`)?`forgot`:`login`)}}else if(o===`quick-fill-login`){let e=a.closest(`[data-action="quick-fill-login"]`),n=document.getElementById(`login-email`),r=document.getElementById(`login-password`);n&&e?.dataset?.email&&(n.value=e.dataset.email),r&&e?.dataset?.pass&&(r.value=e.dataset.pass)}else if(o===`goto-forgot`)e.preventDefault(),typeof history<`u`&&history.replaceState&&history.replaceState(null,``,`#forgot`),renderLogin(``,`forgot`);else if(o===`goto-login`)e.preventDefault(),typeof history<`u`&&history.replaceState&&history.replaceState(null,``,`#login`),renderLogin();else if(o===`toggle-sidebar`)n.sidebarOpen=!n.sidebarOpen,document.querySelector(`.sidebar`)?.classList.toggle(`open`,n.sidebarOpen);else if(o===`logout`){await D(`/api/auth/logout`,{method:`POST`}).catch(()=>{});try{typeof localStorage<`u`&&localStorage.removeItem(`darc_token`);let e=await E(()=>import(`./offline-D3uOjEmC.js`).then(e=>e.o),__vite__mapDeps([2,1]));e&&typeof e.clearOfflineBootstrap==`function`&&await e.clearOfflineBootstrap()}catch{try{localStorage.removeItem(`darc_token`),localStorage.removeItem(`darc_offline_bootstrap`),localStorage.removeItem(`darc_offline_queue`)}catch{}}n.data=null,n.view=`login`,typeof history<`u`&&history.replaceState?history.replaceState(null,``,`#login`):typeof window<`u`&&(window.location.hash=`#login`),renderLogin()}else if(o===`logout-all`){await D(`/api/auth/logout-all`,{method:`POST`}).catch(()=>{});try{typeof localStorage<`u`&&localStorage.removeItem(`darc_token`);let e=await E(()=>import(`./offline-D3uOjEmC.js`).then(e=>e.o),__vite__mapDeps([2,1]));e&&typeof e.clearOfflineBootstrap==`function`&&await e.clearOfflineBootstrap()}catch{try{localStorage.removeItem(`darc_token`),localStorage.removeItem(`darc_offline_bootstrap`),localStorage.removeItem(`darc_offline_queue`)}catch{}}n.data=null,n.view=`login`,typeof history<`u`&&history.replaceState?history.replaceState(null,``,`#login`):typeof window<`u`&&(window.location.hash=`#login`),renderLogin()}else if(o===`open-omnisearch`)St();else if(o===`close-omnisearch`)G();else if(o===`open-cheatsheet`)Dt();else if(o===`close-modal`)closeModal();else if(o===`show-notifications`)showNotifications();else if(o===`read-notification`){let e=a.dataset.notificationId,r=(n.data?.notifications||[]).find(n=>n.id===e);try{if(await D(`/api/notifications/${e}`,{method:`PATCH`,body:JSON.stringify({})}),r&&(r.read=!0),closeModal(),r?.taskId){let e=(n.data?.tasks||[]).find(e=>e.id===r.taskId);if(e){openTaskModal(e);return}}if(r?.projectId){V(`project-detail`,r.projectId);return}await H()}catch(e){showToast(e.message,!0)}}else if(o===`mark-all-notifications-read`)try{await D(`/api/notifications/read-all`,{method:`POST`}),(n.data?.notifications||[]).forEach(e=>{e.read=!0,e.readAt=new Date().toISOString()}),showNotifications(),z(),showToast(choose(`تم تحديد كافة التنبيهات كمقروءة.`,`All notifications marked as read.`))}catch(e){showToast(e.message,!0)}else if(o===`toggle-project-menu`)i&&(i.style.display=i.style.display===`none`?`block`:`none`);else if(o===`preview-doc`){let e=a.dataset.docId||a.closest(`[data-doc-id]`)?.dataset.docId;e&&Le(e)}else if(o===`copy-doc-link`){let e=a.dataset.docId||a.closest(`[data-doc-id]`)?.dataset.docId,r=n.data?.documents?.find(n=>n.id===e);if(r){let e=r.viewLink||r.downloadLink||(r.driveFileId?`https://drive.google.com/file/d/${r.driveFileId}/view`:``);if((!e||e.startsWith(`file://`)||e.startsWith(`/`))&&(e=`${window.location.origin}/api/documents/${r.id}`),e)try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(e);else{let n=document.createElement(`textarea`);n.value=e,document.body.appendChild(n),n.select(),document.execCommand(`copy`),n.remove()}showToast(choose(`تم نسخ رابط الملف إلى الحافظة بنجاح.`,`Document link copied to clipboard.`))}catch{window.prompt(choose(`انسخ رابط الملف من هنا:`,`Copy document link:`),e)}else showToast(choose(`لا يوجد رابط متاح لهذا الملف.`,`No link available for this document.`),!0)}}else if(o===`trigger-upload`){let e=document.getElementById(`upload-progress-container`);if(!e||e.style.display===`none`){let e=document.getElementById(`task-upload-input`);e&&e.click()}}else if(o===`new-project`)openProjectModal();else if(o===`edit-project`){let e=n.data.projects.find(e=>e.id===a.dataset.projectId);e&&openProjectModal(e)}else if(o===`clone-project`){let e=n.data.projects.find(e=>e.id===a.dataset.projectId);e&&openCloneModal(e)}else if(o===`rename-doc`){let e=a.dataset.docId,r=n.data?.documents?.find(n=>n.id===e);if(!r)return;let i=window.prompt(choose(`أدخل الاسم الجديد:`,`Enter new name:`),r.originalName);if(!i||i===r.originalName)return;try{await D(`/api/documents/${e}`,{method:`PATCH`,body:JSON.stringify({originalName:i})}),r.originalName=i,await H(!0);let a=n.data?.tasks?.find(e=>e.id===r.taskId);if(a){let e=document.getElementById(`task-documents-list`);e&&(e.innerHTML=N(a))}}catch(e){showToast(e.message,!0)}}else if(o===`go-to-trash`)n.settingsSection=`trash`,n.trashLoaded=!1,V(`settings`);else if(o===`delete-doc`){if(!window.confirm(choose(`هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.`,`Are you sure you want to move this document to trash? You can restore it within 30 days.`)))return;let e=a.dataset.docId,r=n.data?.documents?.find(n=>n.id===e)?.taskId;try{if(await D(`/api/documents/${e}`,{method:`DELETE`}),n.data?.documents&&(n.data.documents=n.data.documents.filter(n=>n.id!==e)),n.trashLoaded=!1,await H(!0),showToast(choose(`تم نقل المستند إلى سلة المهملات بنجاح.`,`Document moved to trash successfully.`)),r){let e=n.data?.tasks?.find(e=>e.id===r);if(e){let n=document.getElementById(`task-documents-list`);n&&(n.innerHTML=N(e))}}}catch(e){showToast(e.message,!0)}}else if(o===`delete-project`){if(!window.confirm(choose(`هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.`,`Are you sure you want to delete this project? It will be archived.`)))return;let e=[...n.data.projects||[]];n.data.projects=n.data.projects.filter(e=>e.id!==a.dataset.projectId),closeModal(),V(`projects`),showToast(choose(`جاري حذف المشروع...`,`Deleting project...`));try{await D(`/api/projects/${a.dataset.projectId}`,{method:`DELETE`}),n.trashLoaded=!1,typeof navigator<`u`&&navigator.onLine&&await H(!0),showToast(choose(`تم حذف المشروع بنجاح.`,`Project deleted successfully.`))}catch(r){n.data.projects=e,B(),showToast(r.message,!0)}}else if(o===`delete-task`){if(!window.confirm(choose(`هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.`,`Are you sure you want to delete this task? It will be moved to trash.`)))return;let e=a.dataset.taskId,r=[...n.data.tasks||[]];n.data.tasks=n.data.tasks.filter(n=>n.id!==e),closeModal(),B(),showToast(choose(`جاري حذف المهمة...`,`Deleting task...`));try{await D(`/api/tasks/${e}`,{method:`DELETE`}),n.trashLoaded=!1,typeof navigator<`u`&&navigator.onLine&&await H(!0),showToast(choose(`تم حذف المهمة بنجاح.`,`Task deleted successfully.`))}catch(e){n.data.tasks=r,B(),showToast(e.message,!0)}}else if(o===`edit-task-comment`){let e=a.dataset.commentId,r=a.dataset.taskId,i=(n.data.comments||[]).find(n=>n.id===e);if(!i)return;let o=window.prompt(choose(`تعديل التعليق:`,`Edit comment:`),i.content);if(o===null)return;let s=o.trim();if(!s){showToast(choose(`لا يمكن ترك التعليق فارغاً.`,`Comment cannot be empty.`),!0);return}if(s===i.content)return;try{let i=await D(`/api/tasks/${r}/comments/${e}`,{method:`PATCH`,body:JSON.stringify({content:s})});if(i.comment){let a=(n.data.comments||[]).findIndex(n=>n.id===e);a!==-1&&(n.data.comments[a]=i.comment);let o=(n.data.tasks||[]).find(e=>e.id===r),s=document.getElementById(`task-comments-list`);s&&o&&(s.innerHTML=renderTaskComments(o)),showToast(choose(`تم تعديل التعليق بنجاح.`,`Comment updated successfully.`))}}catch(e){showToast(e.message,!0)}}else if(o===`delete-task-comment`){let e=a.dataset.commentId,r=a.dataset.taskId;if(!window.confirm(choose(`هل أنت متأكد من حذف هذا التعليق؟`,`Are you sure you want to delete this comment?`)))return;try{await D(`/api/tasks/${r}/comments/${e}`,{method:`DELETE`}),n.data.comments&&(n.data.comments=n.data.comments.filter(n=>n.id!==e));let i=(n.data.tasks||[]).find(e=>e.id===r),a=document.getElementById(`task-comments-list`);a&&i&&(a.innerHTML=renderTaskComments(i)),showToast(choose(`تم حذف التعليق بنجاح.`,`Comment deleted successfully.`))}catch(e){showToast(e.message,!0)}}else if(o===`manual-sync`){if(typeof navigator<`u`&&!navigator.onLine){showToast(choose(`أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡`,`You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡`),!1);return}let e=s();if(!e.length){showToast(choose(`جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️`,`All data is completely synchronized with cloud server ✔️`),!1);return}showToast(choose(`جاري مزامنة ${e.length} عمليات معلقة مع السيرفر...`,`Syncing ${e.length} pending actions with server...`),!1);let n=await c(D);n.synced>0?(showToast(choose(`تمت مزامنة ${n.synced} عمليات بنجاح! 🚀`,`Successfully synced ${n.synced} actions! 🚀`),!1),await loadData()):n.failed>0&&showToast(choose(`فشلت مزامنة ${n.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${n.failed} actions, please try again.`),!0)}else if(o===`new-task`)openTaskModal(null,null,a.dataset.projectId);else if(o===`new-user`)openUserModal();else if(o===`new-role`)openRoleModal();else if(o===`new-template`)openTemplateModal();else if(o===`edit-template`){let e=n.data.templates.find(e=>e.id===a.dataset.templateId);e&&openTemplateModal(e)}else if(o===`delete-template`){if(!window.confirm(choose(`هل أنت متأكد من حذف هذا القالب؟`,`Are you sure you want to delete this template?`)))return;let e=[...n.data.templates||[]];n.data.templates=n.data.templates.filter(e=>e.id!==a.dataset.templateId),B(),closeModal();try{await D(`/api/templates/${a.dataset.templateId}`,{method:`DELETE`}),await H(!0),showToast(choose(`تم حذف القالب.`,`Template deleted.`))}catch(r){n.data.templates=e,B(),showToast(r.message,!0)}}else if(o===`open-project`)n.projectTab=`tasks`,n.projectMemberFilter=null,V(`project-detail`,a.dataset.projectId);else if(o===`filter-by-member`){let e=a.dataset.memberId;n.projectMemberFilter=n.projectMemberFilter===e?null:e,n.projectTab=`tasks`,requestAnimationFrame(()=>B())}else if(o===`clear-member-filter`)n.projectMemberFilter=null,requestAnimationFrame(()=>B());else if(o===`back-to-projects`)n.projectMemberFilter=null,V(`projects`,null);else if(o===`project-tab`)n.projectTab=a.dataset.tab,a.closest(`.detail-tabs`)?.querySelectorAll(`.detail-tab`).forEach(e=>e.classList.toggle(`active`,e===a)),requestAnimationFrame(()=>B());else if(o===`toggle-timeline-view`)n.timelineView=a.dataset.viewMode||`gantt`,requestAnimationFrame(()=>B());else if(o===`prev-calendar-month`){let e=n.calendarDate?new Date(n.calendarDate):new Date;e.setMonth(e.getMonth()-1),n.calendarDate=e,requestAnimationFrame(()=>B())}else if(o===`next-calendar-month`){let e=n.calendarDate?new Date(n.calendarDate):new Date;e.setMonth(e.getMonth()+1),n.calendarDate=e,requestAnimationFrame(()=>B())}else if(o===`today-calendar-month`)n.calendarDate=new Date,requestAnimationFrame(()=>B());else if(o===`open-task`){if(window._justDroppedAt&&Date.now()-window._justDroppedAt<250)return;let e=n.data.tasks.find(e=>e.id===a.dataset.taskId);e&&openTaskModal(e)}else if(o===`task-filter`)n.taskFilter=a.dataset.filter,a.closest(`.view-toolbar-start`)?.querySelectorAll(`.filter-tab`).forEach(e=>e.classList.toggle(`active`,e===a)),requestAnimationFrame(()=>B());else if(o===`template-category`)n.templateCategory=a.dataset.category,requestAnimationFrame(()=>B());else if(o===`use-template`){if(!n.data.projects.length)return showToast(t(`noProjects`),!0);openTaskModal(null,a.dataset.templateId,n.activeProjectId)}else if(o===`open-user`){let e=n.data.users.find(e=>e.id===a.dataset.userId);e&&openUserModal(e)}else if(o===`impersonate-user`){if(!window.confirm(`هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً.`))return;try{let e=await D(`/api/users/${a.dataset.userId}/impersonate`,{method:`POST`});e&&e.token&&typeof localStorage<`u`&&localStorage.setItem(`darc_token`,e.token),window.location.reload()}catch(e){showToast(e.message,!0)}}else if(o===`force-password-user`){let e=n.data.users.find(e=>e.id===a.dataset.userId);e&&openForcePasswordModal(e)}else if(o===`invite-user`)try{let e=await D(`/api/users/${a.dataset.userId}/invite`,{method:`POST`});await H(),showToast(e.emailConfigured?choose(`تم إرسال الدعوة.`,`Invitation sent.`):choose(`تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.`,`Invite prepared, but the email provider is not configured.`))}catch(e){showToast(e.message,!0)}else if(o===`deactivate-user`){if(!window.confirm(t(`confirmDeactivate`)))return;let e=a.dataset.userId,r=n.data.users.find(n=>n.id===e),i=r?r.status:null;r&&(r.status=`inactive`),B(),closeModal();try{await D(`/api/users/${e}`,{method:`DELETE`}),await H(!0),showToast(choose(`تم تعطيل الحساب.`,`Account deactivated.`))}catch(e){r&&(r.status=i),B(),showToast(e.message,!0)}}else if(o===`settings-section`)n.settingsSection=a.dataset.section,a.closest(`.settings-nav`)?.querySelectorAll(`.settings-nav-item`).forEach(e=>e.classList.toggle(`active`,e===a)),n.settingsSection===`trash`&&!n.trashLoaded&&D(`/api/trash`).then(e=>{n.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],n.trashLoaded=!0,B()}).catch(e=>console.error(e)),requestAnimationFrame(()=>B());else if(o===`restore-item`)try{await D(`/api/restore/${a.dataset.type}/${a.dataset.id}`,{method:`POST`});let e=await D(`/api/trash`);n.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],await H(),showToast(choose(`تمت الاستعادة بنجاح.`,`Restored successfully.`))}catch(e){showToast(e.message,!0)}else if(o===`filter-trash`)n.trashFilter=a.dataset.filter,requestAnimationFrame(()=>B());else if(o===`purge-trash-item`){let e=a.dataset.type,r=a.dataset.id;if(!window.confirm(choose(`هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.`,`Are you sure you want to permanently delete this item? This action cannot be undone.`)))return;try{await D(`/api/trash/${e}/${r}`,{method:`DELETE`});let i=await D(`/api/trash`);n.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(e=>({...e,type:`project`})),...(i.tasks||[]).map(e=>({...e,type:`task`})),...(i.documents||[]).map(e=>({...e,type:`document`}))],B(),showToast(choose(`تم حذف العنصر نهائياً بنجاح.`,`Item permanently deleted.`))}catch(e){showToast(e.message,!0)}}else if(o===`empty-trash`){if(!window.confirm(choose(`هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.`,`Are you sure you want to empty the entire recycle bin? All items will be permanently erased.`)))return;try{await D(`/api/trash/empty`,{method:`DELETE`}),n.trash=[],B(),showToast(choose(`تم إفراغ سلة المهملات بالكامل بنجاح.`,`Trash bin emptied successfully.`))}catch(e){showToast(e.message,!0)}}else if(o===`open-role`){let e=n.data.roles.find(e=>e.id===a.dataset.roleId);e&&openRoleModal(e)}else if(o===`delete-role`){if(!window.confirm(t(`confirmDeleteRole`)))return;let e=a.dataset.roleId,r=[...n.data.roles||[]];n.data.roles=n.data.roles.filter(n=>n.id!==e),B(),closeModal();try{await D(`/api/roles/${e}`,{method:`DELETE`}),await H(!0),showToast(choose(`تم حذف الدور.`,`Role deleted.`))}catch(e){n.data.roles=r,B(),showToast(e.message,!0)}}else if(o===`export-csv`){if(!can(`export_reports`)&&!isAdmin()){showToast(choose(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}exportPortfolioXLS()}else if(o===`export-project`){if(!can(`export_reports`)&&!isAdmin()){showToast(choose(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}exportProjectXLS(a.dataset.projectId)}}var Mt=null;function Nt(e){if(e.target.name===`content`&&e.target.closest(`#task-comment-form`)){let r=e.target.value,i=r.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),a=document.getElementById(`mention-dropdown`);if(i){let o=i[1].toLowerCase(),s=(n.data?.users||[]).filter(e=>e.status!==`inactive`).filter(e=>`${e.name||``} ${e.nameEn||``} ${e.email||``}`.toLowerCase().includes(o));s.length?(a.innerHTML=s.map(e=>{let n=(e.name||e.nameEn||e.email||`user`).trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${esc(n)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${avatar(e,`avatar-sm`)}
              <span style="font-size:12px;">${esc(choose(e.name,e.nameEn||e.name))}</span>
            </div>
          `}).join(``),a.style.display=`block`,a.querySelectorAll(`.mention-option`).forEach(n=>{n.onclick=()=>{let i=n.dataset.username;e.target.value=r.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${i} `),a.style.display=`none`,e.target.focus()}})):a.style.display=`none`}else a.style.display=`none`}if(e.target.dataset.action===`search-trash-input`){n.trashQuery=e.target.value;let r=e.target.selectionStart;clearTimeout(Mt),Mt=setTimeout(()=>{B();let e=document.querySelector(`[data-action="search-trash-input"]`);e&&(e.focus(),e.setSelectionRange(r,r))},120);return}let r=e.target.dataset.search||(e.target.dataset.action===`search-documents`?`documents`:null);if(!r)return;n.searches[r]=e.target.value;let i=e.target.selectionStart;clearTimeout(Mt),Mt=setTimeout(()=>{B();let e=document.querySelector(`[data-search="${r}"], [data-action="search-documents"]`);e&&(e.focus(),e.setSelectionRange(i,i))},120)}async function Pt(e){if(e.target.dataset.action===`doc-project-filter`)n.docProjectFilter=e.target.value,B();else if(e.target.dataset.action===`filter-project-docs-task`)n.docTaskFilter=e.target.value,B();else if(e.target.dataset.action===`sort-project-tasks`||e.target.dataset.action===`sort-my-tasks`)Ce(e.target.value),B();else if(e.target.name===`templateId`&&e.target.form?.id===`task-form`){let r=e.target.form,i=e.target.value,a=n.data.templates?.find(e=>e.id===i),o=r.querySelector(`input[name="titleAr"]`),s=r.querySelector(`input[name="titleEn"]`),c=r.querySelector(`#task-type-ar`),l=r.querySelector(`#task-type-en`),u=r.querySelector(`textarea[name="descriptionAr"]`);a?(o&&(!o.value||r.dataset.templateSelected===`true`)&&(o.value=a.nameAr),s&&(!s.value||r.dataset.templateSelected===`true`)&&(s.value=a.nameEn||``),c&&(c.value=a.typeAr||`مخطط`),l&&(l.value=a.typeEn||`Drawing`),u&&(!u.value||r.dataset.templateSelected===`true`)&&(u.value=a.descriptionAr||``),r.dataset.templateSelected=`true`):(c&&(c.value=``),l&&(l.value=``),delete r.dataset.templateSelected)}else if(e.target.name===`status`&&e.target.form?.id===`task-form`){let n=e.target.form.querySelector(`#task-auto-progress-badge`);if(n){let r={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];n.textContent=r===void 0?``:`(${r}%)`}}else if(e.target.dataset.action===`task-project-filter`)n.taskProjectFilter=e.target.value,B();else if(e.target.dataset.action===`task-priority-filter`)n.taskPriorityFilter=e.target.value,B();else if(e.target.id===`sort-projects`||e.target.dataset?.action===`sort-projects`)n.projectSort=e.target.value,B();else if(e.target.id===`task-upload-input`){let n=e.target.files;if(!n.length)return;let r=e.target.dataset.taskId;Bt(n,r)}else if(e.target.classList.contains(`doc-status-select`)){let n=e.target.dataset.docId,r=e.target.value;D(`/api/documents/${n}`,{method:`PATCH`,body:JSON.stringify({status:r})}).then(()=>{H(!0).then(()=>showToast(choose(`تم تحديث حالة المخطط.`,`Document status updated.`)))}).catch(e=>showToast(e.message,!0))}else if(e.target.id===`user-avatar-file-input`){let r=e.target.files?.[0];if(!r)return;if(r.size>2621440){showToast(choose(`حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.`,`Image is too large. Maximum allowed size is 2MB.`),!0),e.target.value=``;return}if(!r.type.startsWith(`image/`)){showToast(choose(`يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).`,`Please select a valid image file (JPG, PNG, WebP).`),!0),e.target.value=``;return}try{showToast(choose(`جاري معالجة ورفع صورتك الشخصية...`,`Processing & uploading avatar...`));let i=await Ft(r,256,256),a=await D(`/api/users/me`,{method:`PATCH`,body:JSON.stringify({avatarUrl:i})});if(a.user){n.data.user={...n.data.user,...a.user};let e=(n.data.users||[]).findIndex(e=>e.id===n.data.user.id);e!==-1&&(n.data.users[e]={...n.data.users[e],...a.user})}e.target.value=``,z(),m(),showToast(choose(`تم تحديث صورتك الشخصية وتثبيتها بنجاح!`,`Avatar updated successfully!`))}catch(n){e.target.value=``,showToast(n.message,!0)}}else if(e.target.id===`company-logo-file-input`){let r=e.target.files?.[0];if(!r)return;if(r.size>3145728){showToast(choose(`حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.`,`Logo is too large. Maximum allowed size is 3MB.`),!0),e.target.value=``;return}if(!r.type.startsWith(`image/`)){showToast(choose(`يرجى اختيار ملف صورة أو شعار صالح.`,`Please select a valid logo image file.`),!0),e.target.value=``;return}try{showToast(choose(`جاري معالجة ورفع شعار الشركة...`,`Uploading company logo...`));let i=await Ft(r,400,400),a=await D(`/api/company`,{method:`PATCH`,body:JSON.stringify({logoUrl:i})});a.company&&(n.data.company={...n.data.company,...a.company}),e.target.value=``,z(),m(),showToast(choose(`تم تحديث وتثبيت شعار مساحة العمل بنجاح!`,`Company logo updated successfully!`))}catch(n){e.target.value=``,showToast(n.message,!0)}}}function Ft(e,n=300,r=300){return new Promise((i,a)=>{let o=new FileReader;o.onerror=a,o.onload=()=>{let a=new Image;a.onerror=()=>i(o.result),a.onload=()=>{try{let{width:o,height:s}=a;if(o>n||s>r){let e=Math.min(n/o,r/s);o=Math.round(o*e),s=Math.round(s*e)}let c=document.createElement(`canvas`);c.width=o,c.height=s,c.getContext(`2d`).drawImage(a,0,0,o,s),i(c.toDataURL(e.type===`image/png`?`image/png`:`image/jpeg`,.88))}catch{i(o.result)}},a.src=o.result},o.readAsDataURL(e)})}function It({url:e,chunk:n,contentRange:r,headers:i={},onProgress:a}){return new Promise((o,s)=>{let c=new XMLHttpRequest;c.open(`PUT`,e,!0);for(let[e,n]of Object.entries(i))c.setRequestHeader(e,n);r&&c.setRequestHeader(`Content-Range`,r),c.upload&&a&&(c.upload.onprogress=e=>{e.lengthComputable&&a(e.loaded)}),c.onload=()=>{o({status:c.status,ok:c.status>=200&&c.status<300,headers:{get:e=>c.getResponseHeader(e)},responseText:c.responseText,json:()=>{try{return JSON.parse(c.responseText)}catch{return{}}}})},c.onerror=()=>s(Error(`Network connection error`)),c.ontimeout=()=>s(Error(`Upload chunk timeout`)),c.timeout=18e4,c.send(n)})}async function Lt(e,n){try{let r=await It({url:e,chunk:new Blob([]),contentRange:`bytes */${n}`});if(r.status===308){let e=r.headers.get(`Range`);if(e){let n=e.match(/bytes=0-(\d+)/);if(n&&n[1])return parseInt(n[1],10)+1}return 0}if(r.ok)return{completed:!0,data:r.json()}}catch{}return null}var Rt=null;function zt({projectName:e,taskName:r,totalFiles:i}){Rt&&=(clearTimeout(Rt),null);let a=document.getElementById(`floating-upload-manager`);if(a){a.style.opacity=`1`,a.style.transform=`none`;let n=a.querySelector(`#fum-proj-text`),i=a.querySelector(`#fum-task-text`);n&&e&&(n.textContent=e),i&&r&&(i.textContent=r)}else{a=document.createElement(`div`),a.id=`floating-upload-manager`,a.setAttribute(`dir`,n.lang===`ar`?`rtl`:`ltr`),a.style.cssText=`
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
            <span id="fum-proj-text" style="color:var(--ink);font-weight:600;">${esc(e||`—`)}</span>
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
    `,document.body.appendChild(a);let o=a.querySelector(`#fum-minimize-btn`),s=a.querySelector(`#fum-body`);o.addEventListener(`click`,()=>{let e=s.style.display===`none`;s.style.display=e?`flex`:`none`,o.textContent=e?`—`:`+`}),a.querySelector(`#fum-close-btn`).addEventListener(`click`,()=>{a.remove()})}return a}function K({fileName:e,fileIndex:n,totalFiles:r,pct:i,loadedMB:a,fileSizeMB:o,speedMBs:s,etaText:c,statusNote:l,isError:u,isDone:d}){let f=document.getElementById(`floating-upload-manager`);if(!f)return;let p=f.querySelector(`#fum-file-text`),m=f.querySelector(`#fum-count-text`),h=f.querySelector(`#fum-progress-fill`),g=f.querySelector(`#fum-pct-text`),_=f.querySelector(`#fum-speed-text`),v=f.querySelector(`#fum-eta-text`),y=f.querySelector(`#fum-status-badge`),b=f.querySelector(`#fum-indicator`),x=f.querySelector(`#fum-header-title`),S=f.querySelector(`#fum-close-btn`);e&&p&&(p.textContent=e),m&&n&&r&&(m.textContent=`(${n}/${r})`),h&&typeof i==`number`&&(h.style.width=`${i}%`),g&&typeof i==`number`&&(g.textContent=`${i}%`),_&&a!==void 0&&o!==void 0&&(_.textContent=`${a} / ${o} MB • ${s||`0.0`} MB/s`),v&&c&&(v.textContent=`${choose(`متبقي:`,`ETA:`)} ${c}`),l&&y?(y.style.display=`block`,y.textContent=l,y.style.background=u?`var(--red-soft)`:`var(--amber-soft)`,y.style.color=u?`var(--red)`:`var(--amber)`,y.style.border=u?`1px solid var(--red)`:`1px solid var(--amber)`):!u&&!d&&y&&(y.style.display=`none`),d&&(b&&(b.style.background=`var(--mint-strong)`,b.style.boxShadow=`0 0 10px var(--mint-strong)`),x&&(x.textContent=choose(`اكتمل الرفع بنجاح! ✓`,`Upload Complete! ✓`)),g&&(g.textContent=`100%`),h&&(h.style.width=`100%`),S&&(S.style.display=`inline-block`),y&&(y.style.display=`block`,y.style.background=`var(--mint)`,y.style.color=`var(--teal-dark)`,y.style.border=`1px solid var(--mint-strong)`,y.textContent=choose(`تم التوثيق والرفع إلى الخادم بنجاح.`,`Document saved & uploaded to server.`)),Rt=setTimeout(()=>{f&&f.parentNode&&(f.style.opacity=`0`,f.style.transform=`translateY(12px)`,setTimeout(()=>f.remove(),300))},4500)),u&&(b&&(b.style.background=`var(--red)`,b.style.boxShadow=`0 0 10px var(--red)`),x&&(x.textContent=choose(`فشل في الرفع ✕`,`Upload Failed ✕`)),S&&(S.style.display=`inline-block`))}async function Bt(e,r){if(!e||!e.length||!r)return;if(typeof navigator<`u`&&!navigator.onLine){showToast(choose(`لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.`,`Cannot upload drawings or files while offline. Please connect to the internet first.`),!0);return}let i=n.data?.tasks?.find(e=>e.id===r),a=i?n.data?.projects?.find(e=>e.id===i.projectId):null,o=n.data?.documents?n.data.documents.filter(e=>e.taskId===r&&!e.deletedAt):[],s=a?a.nameAr:`Project`,c=i?i.titleAr:`Task`,l={},u=e=>{if(l[e])return l[e];let n=0;return o.forEach(r=>{if(r.originalName&&r.originalName.toLowerCase().endsWith(e)){let e=r.originalName.match(/_v(\d+)\./);e&&parseInt(e[1])>n&&(n=parseInt(e[1]))}}),l[e]=n+1,n+1},d=document.getElementById(`upload-progress-container`);document.getElementById(`upload-progress-bar`),document.getElementById(`upload-progress-percent`),document.getElementById(`upload-progress-text`);let f=document.getElementById(`task-dropzone`);d&&(d.style.display=`block`),f&&(f.style.pointerEvents=`none`),zt({projectName:s,taskName:c,totalFiles:e.length});try{for(let n=0;n<e.length;n++){let a=e[n];if(!a.size||a.size===0){showToast(choose(`الملف "${a.name}" فارغ لا يحتوي على بيانات.`,`File "${a.name}" is empty.`),!0);continue}if(a.size>2147483648){showToast(choose(`حجم الملف "${a.name}" يتجاوز الحد الأقصى (2GB).`,`File "${a.name}" exceeds 2GB limit.`),!0);continue}let o=a.name.split(`.`).pop()?.toLowerCase()||``;if([`exe`,`bat`,`cmd`,`sh`,`bash`,`ps1`,`vbs`,`js`,`mjs`,`cjs`,`py`,`php`,`phtml`,`html`,`htm`,`jar`,`msi`,`dll`,`com`,`scr`,`hta`,`svg`,`apk`].includes(o)||a.type===`image/svg+xml`){showToast(choose(`صيغة الملف "${a.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${a.name}" is not permitted for security reasons.`),!0);continue}let l=a.name.lastIndexOf(`.`),d=l===-1?``:a.name.substring(l).toLowerCase(),f=`${s}_${c}_${l===-1?a.name:a.name.substring(0,l)}_v${u(d)}${d}`,p=(a.size/1048576).toFixed(1);K({fileName:a.name,fileIndex:n+1,totalFiles:e.length,pct:0,loadedMB:`0.0`,fileSizeMB:p,speedMBs:`0.0`,etaText:`...`,statusNote:choose(`بدء جلسة الرفع المستأنف...`,`Starting resumable session...`)});let m=await fetch(`${te}/api/documents/session`,{method:`POST`,credentials:`include`,headers:{"Content-Type":`application/json`},body:JSON.stringify({compiledName:f,mimeType:a.type||`application/octet-stream`,projectId:i?.projectId,taskId:r,size:a.size})}),h=await m.json();if(!m.ok)throw Error(h.error||`Failed to start upload session`);let g=h.sessionUrl,_=8388608;_=a.size<=10485760?a.size:a.size<=104857600?8388608:a.size<=524288e3?16777216:33554432;let v=Date.now(),y=0,b=r=>{let i=Math.min(a.size,y+r),o=Math.min(100,Math.round(i/a.size*100)),s=document.getElementById(`upload-progress-bar`),c=document.getElementById(`upload-progress-percent`),l=document.getElementById(`upload-progress-text`),u=document.getElementById(`upload-progress-container`);u&&(u.style.display=`block`),s&&(s.style.width=`${o}%`),c&&(c.textContent=`${o}%`);let d=(Date.now()-v)/1e3,f=i/Math.max(d,.2),m=(f/1048576).toFixed(1),h=Math.max(0,a.size-i),g=Math.round(h/Math.max(f,1)),_=g<60?`${g} ${choose(`ثانية`,`s`)}`:`${Math.floor(g/60)}:${String(g%60).padStart(2,`0`)} ${choose(`دقيقة`,`min`)}`,b=(i/1048576).toFixed(1);l&&(l.textContent=`${choose(`رفع إلى الخادم`,`Uploading to server`)} (${n+1}/${e.length}): ${a.name} — ${b} / ${p} MB (${o}%) • ${m} MB/s • ${choose(`متبقي:`,`ETA:`)} ${_}`),K({fileName:a.name,fileIndex:n+1,totalFiles:e.length,pct:o,loadedMB:b,fileSizeMB:p,speedMBs:m,etaText:_})};b(0);let x=0,S=null,C=!1;for(;x<a.size;){let o=Math.min(x+_,a.size),s=a.slice(x,o),c=`bytes ${x}-${o-1}/${a.size}`,l=0,u=!1;for(;!u&&l<5;)try{let e;if(!C)try{e=await It({url:g,chunk:s,contentRange:c,headers:{},onProgress:e=>b(e)})}catch(e){console.warn(`[Upload] Direct GDrive upload failed, trying backend proxy:`,e.message),C=!0}if(C){let n={projectId:i?.projectId,taskId:r,compiledName:f,mimeType:a.type,size:a.size};e=await It({url:`${te}/api/documents/chunk`,chunk:s,contentRange:c,headers:{"x-session-url":g,"x-doc-meta":encodeURIComponent(JSON.stringify(n))},onProgress:e=>b(e)})}if(e.status===308){let n=e.headers.get(`Range`);if(n){let e=n.match(/bytes=0-(\d+)/);x=e&&e[1]?parseInt(e[1],10)+1:o}else x=o;y=x,b(0),u=!0}else if(e.ok){let n=e.json();S=n.id||n.document?.id,y=a.size,b(0),x=a.size,u=!0;break}else throw Error(`Upload returned status ${e.status}`)}catch(r){if(l++,K({fileName:a.name,fileIndex:n+1,totalFiles:e.length,statusNote:`${choose(`إعادة المحاولة`,`Retrying`)} (${l}/5)...`}),l>=5)throw Error(`${choose(`فشل الرفع بعد محاولات متعددة`,`Upload failed after multiple retries`)}: ${r.message}`);await new Promise(e=>setTimeout(e,1e3*2**(l-1)));let i=await Lt(g,a.size);if(typeof i==`number`&&i>x){x=i,y=x;break}if(i&&i.completed){S=i.data?.id,x=a.size,u=!0;break}}}S&&!S.startsWith(`doc_`)&&await D(`/api/documents/finalize`,{method:`POST`,body:JSON.stringify({driveFileId:S,projectId:i?.projectId,taskId:r,compiledName:f,mimeType:a.type,size:a.size})})}await H(!0);let a=n.data?.tasks?.find(e=>e.id===r),o=document.getElementById(`task-documents-list`);o&&a&&(o.innerHTML=N(a)),m(),K({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),showToast(choose(`تم رفع الملفات بنجاح إلى الخادم.`,`Files uploaded successfully to server.`))}catch(e){K({isError:!0,statusNote:e.message}),showToast(e.message,!0)}finally{let e=document.getElementById(`upload-progress-container`),n=document.getElementById(`upload-progress-bar`),r=document.getElementById(`task-dropzone`);e&&(e.style.display=`none`),n&&(n.style.width=`0%`),r&&(r.style.pointerEvents=`auto`);let i=document.getElementById(`task-upload-input`);i&&(i.value=``)}}typeof window<`u`&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener(`dragover`,e=>{let n=e.target.closest(`#task-dropzone`);n&&(e.preventDefault(),n.style.borderColor=`var(--brand-teal)`,n.style.background=`var(--teal-soft)`)}),document.addEventListener(`dragleave`,e=>{let n=e.target.closest(`#task-dropzone`);n&&(n.style.borderColor=`var(--border)`,n.style.background=`var(--surface-soft)`)}),document.addEventListener(`drop`,e=>{let n=e.target.closest(`#task-dropzone`);if(n){e.preventDefault(),n.style.borderColor=`var(--border)`,n.style.background=`var(--surface-soft)`;let r=n.dataset.taskId,i=e.dataTransfer?.files;i&&i.length&&Bt(i,r)}}));async function Vt(){renderLoading();let e=typeof window<`u`?window.location.hash.replace(/^#/,``):``,r=new URLSearchParams(e.includes(`?`)?e.split(`?`)[1]:e.includes(`=`)?e:``),i=r.get(`activate`);if(i)return renderActivation(i);let a=r.get(`reset`);if(a)return renderResetPassword(a);if(e===`forgot`)return renderLogin(``,`forgot`);if(e===`login`)return renderLogin();try{if(e){let[r,i]=e.split(`?`);if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(r)&&(n.view=r,i)){let e=new URLSearchParams(i);e.get(`id`)&&(n.activeProjectId=e.get(`id`)),e.get(`tab`)&&(n.projectTab=e.get(`tab`))}}else if(typeof sessionStorage<`u`){let e=sessionStorage.getItem(`darc_last_route`);if(e){let r=JSON.parse(e);r.view&&(n.view=r.view),r.activeProjectId&&(n.activeProjectId=r.activeProjectId),r.projectTab&&(n.projectTab=r.projectTab)}}}catch{}try{typeof navigator<`u`&&navigator.onLine&&s().length>0&&await c(D),await loadData(),window._darcPollingActive||(window._darcPollingActive=!0,setInterval(async()=>{if(!(typeof document<`u`&&document.hidden)&&n.data?.user&&n.view&&n.view!==`login`)try{await loadData(!0)}catch{}},3e3),typeof document<`u`&&document.addEventListener(`visibilitychange`,()=>{!document.hidden&&n.data?.user&&n.view&&n.view!==`login`&&loadData(!0).catch(()=>{})}))}catch{typeof window<`u`&&(window.history&&window.history.replaceState?window.history.replaceState(null,``,`#login`):window.location.hash=`#login`),renderLogin()}}if(typeof window<`u`&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener(`hashchange`,()=>{if(window._isInternalNav){window._isInternalNav=!1;return}let e=window.location.hash.replace(/^#/,``);if(!e)return;let[r,i]=e.split(`?`);if(r===`login`){n.data?.user&&(n.data.user=null),renderLogin();return}if(r===`forgot`){renderLogin(``,`forgot`);return}let a=new URLSearchParams(i||(e.includes(`=`)?e:``));if(a.get(`activate`))renderActivation(a.get(`activate`));else if(a.get(`reset`))renderResetPassword(a.get(`reset`));else if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(r)){if(n.data&&!I(r)){V(L());return}let e=n.activeProjectId;if(i){let r=new URLSearchParams(i);r.get(`id`)&&(e=r.get(`id`)),r.get(`tab`)&&(n.projectTab=r.get(`tab`))}(n.view!==r||n.activeProjectId!==e)&&V(r,e)}})),typeof window<`u`&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener(`scroll`,n=>{n.target&&n.target.classList&&(n.target.classList.contains(`timeline-scroll`)||n.target.classList.contains(`gantt-scroll`)||n.target.classList.contains(`timeline-board`))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows==`function`&&drawTimelineArrows(),e=!1})))},!0)}var q=null,J=null;function Ht(){return q||(q=document.createElement(`div`),q.className=`drag-placeholder`,q.style.cssText=`
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
    `,q.innerHTML=`<span>↓ ${C(`الموقع الجديد للمهمة`,`Drop position`)}</span>`),q}function Y(){q&&q.parentNode&&q.parentNode.removeChild(q)}function Ut(e,n){let r=Array.from(e.querySelectorAll(`.task-card:not(.is-dragging)`));for(let e of r){let r=e.getBoundingClientRect();if(n<r.top+r.height/2)return e}return null}document.addEventListener(`dragstart`,e=>{let n=e.target.closest(`.task-card`);if(n){window._isDraggingTask=!0,J=n.dataset.taskId,e.dataTransfer.effectAllowed=`move`;try{e.dataTransfer.setData(`text/plain`,J)}catch{}n.classList.add(`is-dragging`)}}),document.addEventListener(`dragend`,e=>{let n=e.target.closest(`.task-card`);n&&n.classList.remove(`is-dragging`),window._isDraggingTask=!1,window._justDroppedTaskId=J,window._justDroppedAt=Date.now(),J=null,document.querySelectorAll(`.board-column`).forEach(e=>e.classList.remove(`drag-over`)),Y()}),document.addEventListener(`dragover`,e=>{let n=e.target.closest(`.board-column`);if(n){e.preventDefault(),e.dataTransfer.dropEffect=`move`,n.classList.add(`drag-over`);let r=document.querySelector(`.board, .board-columns, .tasks-board, [data-board]`);r&&(e.clientX<50?r.scrollLeft-=14:e.clientX>window.innerWidth-50&&(r.scrollLeft+=14));let i=n.querySelector(`.board-cards`);if(i){let n=Ht(),r=Ut(i,e.clientY);r?n.nextSibling!==r&&i.insertBefore(n,r):(!i.contains(n)||i.lastElementChild!==n)&&i.appendChild(n)}}}),document.addEventListener(`dragenter`,e=>{e.target.closest(`.board-column`)&&e.preventDefault()}),document.addEventListener(`dragleave`,e=>{let n=e.target.closest(`.board-column`);if(n){if(e.relatedTarget&&n.contains(e.relatedTarget))return;let r=n.getBoundingClientRect(),i=e.clientX,a=e.clientY;(i<=r.left||i>=r.right||a<=r.top||a>=r.bottom)&&(n.classList.remove(`drag-over`),Y())}});async function Wt(e,i,a=null){if(!e){Y();return}e.classList.remove(`drag-over`);let o=e.querySelector(`.board-cards`),s=null;if(q&&q.parentNode===o){let e=q.nextElementSibling;e&&e.classList.contains(`task-card`)&&e.dataset.taskId!==(a||J)&&(s=e.dataset.taskId)}else if(o){let e=Ut(o,i);e&&e.dataset.taskId!==(a||J)&&(s=e.dataset.taskId)}Y();let c=a||J;J=null;let l=e.dataset.status;if(!c||!l)return;let u=(n.data?.tasks||[]).find(e=>e.id===c);if(!u)return;if(!(u.status===l||l===`review`&&[`review`,`approval`,`blocked`].includes(u.status))&&l===`done`&&u.dependencies&&u.dependencies.length&&u.dependencies.filter(e=>{let r=n.data.tasks.find(n=>n.id===e);return r&&r.status!==`done`}).length)return r(C(`لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.`,`Cannot complete task before its dependencies.`),!0);n.projectTaskSort=`custom`,n.myTaskSort=`custom`,localStorage.setItem(`darc_task_sort_pref`,`custom`);let d=l===`review`?[`review`,`approval`,`blocked`]:[l],f=(n.data.tasks||[]).filter(e=>e.projectId===u.projectId&&(d.includes(e.status)||e.id===c)),p=f.findIndex(e=>e.id===c);p!==-1&&f.splice(p,1),f.sort((e,n)=>A(e)-A(n)),u.status=l;let m=f.length;if(s){let e=f.findIndex(e=>e.id===s);if(e===-1&&q&&q.parentNode){let n=q.nextElementSibling;for(;n;){if(n.classList?.contains(`task-card`)&&n.dataset.taskId){let r=f.findIndex(e=>e.id===n.dataset.taskId);if(r!==-1){e=r;break}}n=n.nextElementSibling}}e!==-1&&(m=e)}f.splice(m,0,u),f.forEach((e,n)=>{let r=(n+1)*100;e.sortOrder=r,e.sort_order=r,e.customFields={...e.customFields||{},sortOrder:r,sort_order:r},e.custom_fields={...e.custom_fields||{},sortOrder:r,sort_order:r}}),B();let h=document.querySelector(`.task-card[data-task-id="${c}"]`);h&&(h.classList.add(`just-dropped`),setTimeout(()=>h.classList.remove(`just-dropped`),400)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,f.forEach(e=>{window._pendingReorderBatch.set(e.id,{id:e.id,status:e.status,sortOrder:e.sortOrder,customFields:e.customFields})}),window._reorderSyncTimer=setTimeout(()=>{let e=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),D(`/api/tasks/reorder`,{method:`PATCH`,body:JSON.stringify({items:e})}).catch(e=>{console.warn(`Reorder sync error:`,e),r(C(`فشل حفظ الترتيب الجديد في الخادم.`,`Failed to save task order to server.`),!0)})},150)}document.addEventListener(`drop`,async e=>{let n=e.target.closest(`.board-column`);e.preventDefault();let r=J||(e.dataTransfer?e.dataTransfer.getData(`text/plain`):null);await Wt(n,e.clientY,r)});var X=null,Z=null,Gt=0,Kt=0,qt=0,Jt=0,Q=null,$=!1;function Yt(){Q&&=(clearTimeout(Q),null),Z&&Z.parentNode&&Z.parentNode.removeChild(Z),Z=null,X&&(X.style.opacity=``,X.style.pointerEvents=``,X.classList.remove(`is-dragging`)),document.querySelectorAll(`.board-column`).forEach(e=>e.classList.remove(`drag-over`)),Y(),X=null,$=!1,J=null}document.addEventListener(`touchstart`,e=>{if(e.touches.length!==1)return;let n=e.target.closest(`.task-card`);if(!n||e.target.closest(`button, a, input, select, textarea, .btn`))return;X=n;let r=e.touches[0];Gt=r.clientX,Kt=r.clientY,$=!1,Q=setTimeout(()=>{if(!X)return;if($=!0,J=X.dataset.taskId,typeof navigator<`u`&&navigator.vibrate)try{navigator.vibrate(40)}catch{}let e=X.getBoundingClientRect();qt=r.clientX-e.left,Jt=r.clientY-e.top,Z=X.cloneNode(!0),Z.id=`touch-drag-ghost`,Z.style.cssText=`
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
    `,document.body.appendChild(Z),X.classList.add(`is-dragging`),X.style.opacity=`0.25`,X.style.pointerEvents=`none`;let n=X.closest(`.board-column`);if(n){n.classList.add(`drag-over`);let e=n.querySelector(`.board-cards`);if(e){let n=Ht(),i=Ut(e,r.clientY);i&&n.nextSibling!==i?e.insertBefore(n,i):e.contains(n)||e.appendChild(n)}}},220)},{passive:!0}),document.addEventListener(`touchmove`,e=>{if(!X)return;let n=e.touches[0],r=Math.abs(n.clientX-Gt),i=Math.abs(n.clientY-Kt);if(!$){(r>8||i>8)&&(Q&&=(clearTimeout(Q),null),X=null);return}if(e.cancelable&&e.preventDefault(),Z){let e=n.clientX-qt,r=n.clientY-Jt;Z.style.transform=`translate3d(${e}px, ${r}px, 0) scale(1.03) rotate(1.5deg)`}let a=document.querySelector(`.board, .board-columns, .tasks-board, [data-board]`);a&&(n.clientX<45?a.scrollLeft-=12:n.clientX>window.innerWidth-45&&(a.scrollLeft+=12));let o=document.elementFromPoint(n.clientX,n.clientY)?.closest(`.board-column`);if(document.querySelectorAll(`.board-column`).forEach(e=>e.classList.toggle(`drag-over`,e===o)),o){let e=o.querySelector(`.board-cards`);if(e){let r=Ht(),i=Ut(e,n.clientY);i?r.nextSibling!==i&&e.insertBefore(r,i):(!e.contains(r)||e.lastElementChild!==r)&&e.appendChild(r)}}},{passive:!1}),document.addEventListener(`touchend`,async e=>{if(Q&&=(clearTimeout(Q),null),X){if($){let n=e.changedTouches[0],r=document.elementFromPoint(n.clientX,n.clientY)?.closest(`.board-column`)||q&&q.closest(`.board-column`),i=J;Z&&Z.parentNode&&Z.parentNode.removeChild(Z),Z=null,r&&i&&await Wt(r,n.clientY,i),Yt()}else Yt()}}),document.addEventListener(`touchcancel`,()=>{Yt()});var Xt=e({initRealtimeConnection:()=>en,notifyStateMutation:()=>tn,triggerImmediateSync:()=>$t}),Zt=null,Qt=!1;function $t(e=`realtime`){Zt&&clearTimeout(Zt),Zt=setTimeout(async()=>{if(!(typeof document<`u`&&document.hidden)&&n.data&&n.view)try{await bt(!0)}catch(e){console.warn(`[Realtime] Sync error:`,e.message)}},250)}function en(){if(!Qt){if(Qt=!0,typeof BroadcastChannel<`u`){let e=new BroadcastChannel(`darc_state_sync`);e.onmessage=e=>{e.data?.type===`STATE_MUTATION`&&$t(`broadcast_channel`)},window._darcBroadcastChannel=e}window.addEventListener(`online`,async()=>{n.isOffline=!1;let{syncPendingMutations:e}=await E(async()=>{let{syncPendingMutations:e}=await import(`./offline-D3uOjEmC.js`).then(e=>e.o);return{syncPendingMutations:e}},__vite__mapDeps([2,1])),{api:r}=await E(async()=>{let{api:e}=await import(`./api-2d5NGaC1.js`).then(e=>e.r);return{api:e}},__vite__mapDeps([0,1,2,3])),{choose:i}=await E(async()=>{let{choose:e}=await import(`./utils-BJC_1mrk.js`).then(e=>e.g);return{choose:e}},__vite__mapDeps([3,1])),{showToast:a}=await E(async()=>{let{showToast:e}=await import(`./ui-DYyyctAF.js`).then(e=>e.r);return{showToast:e}},[]),o=await e(r);o&&o.synced>0?a(i(`تمت استعادة الاتصال ومزامنة ${o.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${o.synced} pending actions successfully! 🚀`),!1):a(i(`تمت استعادة الاتصال بالإنترنت`,`Internet connection restored`),!1),$t(`online`)}),window.addEventListener(`offline`,async()=>{n.isOffline=!0;let{choose:e}=await E(async()=>{let{choose:e}=await import(`./utils-BJC_1mrk.js`).then(e=>e.g);return{choose:e}},__vite__mapDeps([3,1])),{showToast:r}=await E(async()=>{let{showToast:e}=await import(`./ui-DYyyctAF.js`).then(e=>e.r);return{showToast:e}},[]),{renderApp:i}=await E(async()=>{let{renderApp:e}=await Promise.resolve().then(()=>vt);return{renderApp:e}},void 0);i(),r(e(`أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت`,`Offline Mode — you can continue working, changes will auto-sync on reconnect`),!0)})}}function tn(){if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:`STATE_MUTATION`,timestamp:Date.now()})}catch{}}document.documentElement.dataset.theme=n.theme,document.documentElement.lang=n.lang,document.documentElement.dir=n.lang===`ar`?`rtl`:`ltr`,n.lang===`en`?document.body.classList.add(`is-ltr`):document.body.classList.remove(`is-ltr`),Object.assign(window,i),Object.assign(window,ne),Object.assign(window,de),Object.assign(window,Be),Object.assign(window,ye),Object.assign(window,rt),Object.assign(window,ot),Object.assign(window,ct),Object.assign(window,gt),Object.assign(window,vt),Object.assign(window,kt),Object.assign(window,h),Ot(),document.addEventListener(`click`,e=>{handleClick(e).catch(e=>showToast(e.message,!0))}),document.addEventListener(`submit`,e=>{handleSubmit(e).catch(e=>showToast(e.message,!0))}),document.addEventListener(`input`,handleInput),document.addEventListener(`change`,handleChange),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&closeModal()});var nn=null;window.addEventListener(`resize`,()=>{n.view===`project-detail`&&n.projectTab===`timeline`&&(nn||=requestAnimationFrame(()=>{nn=null,drawTimelineArrows()}))}),window.addEventListener(`error`,e=>{console.error(`Runtime Error:`,e.error),typeof showToast==`function`&&showToast(`خطأ برمجي: ${e.message}`,!0)}),`serviceWorker`in navigator&&window.location.protocol.startsWith(`http`)&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).catch(e=>{console.warn(`[PWA] ServiceWorker registration skipped:`,e.message)})}),en(),init();export{Xt as t};