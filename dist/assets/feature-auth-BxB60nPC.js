import{t as N}from"./rolldown-runtime-BQ-_32WO.js";import{$ as w,Ct as O,L as C,Lt as F,Mt as Y,Nt as j,Ot as h,Pt as V,Tt as U,Vt as i,Y as t,ft as p,jt as R,n as B,r as W,z as I,zt as J}from"./core-dragdrop-Sc3qVl0H.js";var ae=N({calculatePasswordStrength:()=>q,cleanupTurnstile:()=>M,initTurnstile:()=>_,loadTurnstileScript:()=>z,openForcePasswordModal:()=>ee,renderActivation:()=>X,renderLogin:()=>Q,renderResetPassword:()=>H,renderStrengthMeterHtml:()=>P}),K="0x4AAAAAAFr3zLr2zpRS2ah4",g=null,E=null,v=null,T=!1;function z(){return typeof window>"u"||window.turnstile?Promise.resolve():E||(E=new Promise(e=>{if(window.onloadTurnstileCallback=()=>{e()},document.getElementById("cf-turnstile-script")){window.turnstile&&e();return}const n=document.createElement("script");n.id="cf-turnstile-script",n.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback",n.async=!0,n.defer=!0,n.onerror=()=>{console.warn("[Turnstile] Script failed to load, fallback mode enabled"),e()},document.body.appendChild(n)}),E)}function M(){if(!(typeof window>"u")){if(v=null,window.turnstile&&g!==null){try{window.turnstile.remove(g)}catch{}g=null}try{const e=document.getElementById("turnstile-container");e&&(e.innerHTML=""),document.querySelectorAll('iframe[src*="challenges.cloudflare.com"]').forEach(a=>{try{a.remove()}catch{}});const n=document.getElementById("cf-turnstile-script");n&&n.remove(),E=null}catch{}}}async function _(){if(!(typeof window>"u")&&document.getElementById("turnstile-container")&&!T){T=!0;try{if(window.turnstile||await z(),!window.turnstile){T=!1;return}const e=document.getElementById("turnstile-container");if(!e){T=!1;return}if(g!==null){try{window.turnstile.remove(g)}catch{}g=null}v=null,g=window.turnstile.render(e,{sitekey:K,theme:i.theme==="dark"?"dark":"light",language:i.lang==="ar"?"ar":"en",appearance:"interaction-only",callback:n=>{v=n},"error-callback":n=>{console.warn("[Turnstile] Handshake notice (shielded):",n),v="fallback_client"},"expired-callback":()=>{if(v=null,window.turnstile&&g!==null)try{window.turnstile.reset(g)}catch{}}})}catch(e){console.warn("[Turnstile] Init notice:",e),v="fallback_client"}finally{T=!1}}}typeof window<"u"&&(window.__darcInitTurnstile=_);async function Z(){if(typeof window>"u"||!window.turnstile)return"fallback_client";if(v)return v;if(g!==null)try{const e=window.turnstile.getResponse(g);if(e)return v=e,e}catch{}return new Promise(e=>{let n=!1;const a=setTimeout(()=>{n||(n=!0,e(v||"fallback_client"))},1200),r=setInterval(()=>{if(n){clearInterval(r);return}if(v){n=!0,clearTimeout(a),clearInterval(r),e(v);return}if(g!==null&&window.turnstile)try{const o=window.turnstile.getResponse(g);if(o){n=!0,clearTimeout(a),clearInterval(r),v=o,e(o);return}}catch{}},35)})}function q(e){const n=String(e||"");if(!n)return{score:0,label:"",percent:0,color:"var(--line)"};let a=0;return n.length>=10&&(a+=1),/[a-z]/.test(n)&&/[A-Z]/.test(n)&&(a+=1),/\d/.test(n)&&(a+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(n)&&(a+=1),a===1?{score:1,label:i.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:a===2?{score:2,label:i.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:a===3?{score:3,label:i.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:i.lang==="ar"?"قوية وممتازة":"Strong & Secure",percent:100,color:"var(--mint-strong)"}}function P(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${i.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function D(e,n,a,r,o){const f=document.getElementById(e);if(!f)return;const b=f.querySelector(`input[name="${n}"]`),l=f.querySelector(`input[name="${a}"]`),d=f.querySelector(o||'button[type="submit"]'),y=document.getElementById(`${r}-meter-wrap`),u=document.getElementById(`${r}-meter-bar`),x=document.getElementById(`${r}-meter-label`),m=document.getElementById(`${r}-match-indicator`);function S(){const k=b?b.value:"",$=l?l.value:"";if(k&&y&&u&&x){y.style.display="flex";const s=q(k);u.style.width=`${s.percent}%`,u.style.background=s.color,x.textContent=s.label,x.style.color=s.color}else y&&(y.style.display="none");l&&m&&($?k===$?(m.style.display="block",m.style.color="var(--mint-strong)",m.textContent=i.lang==="ar"?"كلمتا المرور متطابقتان":"Passwords match",d&&(d.disabled=!1)):(m.style.display="block",m.style.color="var(--red)",m.textContent=i.lang==="ar"?"كلمتا المرور غير متطابقتين":"Passwords do not match",d&&(d.disabled=!0)):(m.style.display="none",d&&(d.disabled=!1)))}b?.addEventListener("input",S),l?.addEventListener("input",S)}function A(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=n=>{n.preventDefault();const a=e.getAttribute("data-target"),r=a?document.getElementById(a):e.parentElement.querySelector("input");if(!r)return;const o=r.type==="password";r.type=o?"text":"password",e.style.color=o?"var(--teal)":"var(--ink-soft)";const f=o?i.lang==="ar"?"إخفاء كلمة المرور":"Hide password":i.lang==="ar"?"إظهار كلمة المرور":"Show password";e.setAttribute("aria-label",f),e.setAttribute("title",f),o?e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';try{r.focus()}catch{}}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const n=a=>{const r=a.getModifierState&&a.getModifierState("CapsLock");let o=e.parentElement.parentElement.querySelector(".capslock-warning");r?o||(o=document.createElement("div"),o.className="capslock-warning",o.style.fontSize="11px",o.style.color="var(--amber)",o.style.marginTop="4px",o.style.display="flex",o.style.alignItems="center",o.style.gap="4px",o.innerHTML=`<span class="ui-inline-icon icon-warning">${p("alert",13)}</span> <span>${i.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(o)):o&&o.remove()};e.addEventListener("keydown",n),e.addEventListener("keyup",n)})}function G(e,n=60){if(!e)return;e.disabled=!0;let a=n;const r=e.innerHTML,o=setInterval(()=>{if(!e.isConnected){clearInterval(o);return}a--,e.innerHTML=`<span>${i.lang==="ar"?`يرجى الانتظار (${a} ثانية)...`:`Please wait (${a}s)...`}</span>`,a<=0&&(clearInterval(o),e.disabled=!1,e.innerHTML=r)},1e3)}function Q(e="",n="login",a=!1){if(i.view="login",R(),typeof window<"u"){const l=n==="forgot"?"#forgot":"#login";window.location.hash!==l&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",l):window.location.hash=l)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",i.lang==="en"),document.documentElement.lang=i.lang,document.documentElement.dir=i.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=i.theme||"light";let r="";const o=e?`<div class="login-demo" style="border-color:${a?"#cce3e0":"var(--red-soft)"};background:${a?"#f0f9f7":"var(--red-soft)"};color:${a?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${p(a?"check":"alert",15)}<span>${w(e)}</span></div>`:"",f=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";n==="login"?r=`
      <form id="login-form">
        <div class="field">
          <label for="login-email">${h("emailAddress")}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${w(f)}" required />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label for="login-password">${h("password")}</label>
            <a href="#" data-action="goto-forgot" style="font-size:12px;color:var(--blue);text-decoration:none">${t("نسيت كلمة المرور؟","Forgot password?")}</a>
          </div>
          <div style="position:relative;display:flex;align-items:center;">
            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
            <button type="button" data-action="toggle-password-visibility" data-target="login-password" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin:4px 0 16px;font-size:12px;">
          <label style="display:flex;align-items:center;gap:7px;cursor:pointer;color:var(--ink-soft);user-select:none;">
            <input type="checkbox" id="remember-email-check" ${f?"checked":""} style="cursor:pointer;accent-color:var(--teal);" />
            <span>${t("تذكر بريدي الإلكتروني على هذا الجهاز","Remember my email on this device")}</span>
          </label>
        </div>
        <div id="login-error-container">${o}</div>
        <div id="turnstile-container" style="margin-bottom:12px;min-height:0;display:flex;justify-content:center;"></div>
        <button class="btn btn-primary btn-block" type="submit">${p(i.lang==="ar"?"arrowLeft":"arrowRight",16)} ${h("login")}</button>
      </form>
      <div class="demo-showcase-box" style="margin-top:20px;padding:14px 16px;border-radius:10px;background:var(--surface-soft, rgba(13,98,105,0.06));border:1px dashed rgba(20,184,166,0.4);display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--brand-teal, #0d6269);">
            <span>${p("sparkles",15)}</span>
            <span>${t("بيئة العرض التجريبي (Demo Showcase)","Live Demo Showcase")}</span>
          </div>
          <span style="font-size:10px;background:rgba(20,184,166,0.18);color:var(--teal, #0d6269);padding:2px 8px;border-radius:12px;font-weight:700;">
            ${t("حساب تجريبي Demo","Demo Account")}
          </span>
        </div>
        <div style="font-size:11px;color:var(--ink-soft);display:flex;flex-direction:column;gap:3px;font-family:var(--font-mono, monospace);">
          <div><strong>${t("البريد:","Email:")}</strong> <code>demo@darc-design.bond</code></div>
          <div><strong>${t("كلمة المرور:","Password:")}</strong> <code>demo123456</code></div>
        </div>
        <button type="button" class="btn btn-sm btn-soft" data-action="quick-fill-login" data-email="demo@darc-design.bond" data-pass="demo123456" data-autosubmit="true" style="width:100%;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 12px;border-radius:6px;cursor:pointer;">
          <span>${p("zap",14)}</span>
          <span>${t("تعبئة تلقائية ودخول فوري","Auto-fill & Sign In")}</span>
        </button>
      </div>
    `:n==="forgot"&&(r=`
      <form id="forgot-form">
        <div class="field"><label for="login-email">${h("emailAddress")}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${w(f)}" required /></div>
        ${o}
        <button class="btn btn-primary btn-block" type="submit">${t("إرسال رابط الاستعادة","Send reset link")}</button>
        <div style="text-align:center;margin-top:15px"><a href="#" data-action="goto-login" style="font-size:13px;color:var(--ink-soft)">${t("العودة لتسجيل الدخول","Back to login")}</a></div>
      </form>
    `),document.getElementById("app").innerHTML=`
    <div class="login-shell ${i.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup">
            <span class="brand-mark">${p("building",24)}</span>
            <div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("مساحة تشغيل المشاريع","Project operations workspace")}</div></div>
          </div>
          <div class="login-art-content">
            <p class="eyebrow">${t("وضوح · مسؤولية · إنجاز","CLARITY · OWNERSHIP · DELIVERY")}</p>
            <h1>${t("كل مشروع واضح. كل خطوة محسوبة.","Every project clear. Every move accounted for.")}</h1>
            <p>${t("لوحة هادئة لإدارة التصميم والتنفيذ، تجمع فريق DARC حول أحدث قرار وأهم موعد.","A calm operating layer for design and delivery, bringing the DARC team around the latest decision and the next important deadline.")}</p>
          </div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${n==="login"?t("مرحبًا بعودتك","WELCOME BACK"):t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${n==="login"?h("login"):t("نسيت كلمة المرور","Forgot Password")}</h2><p class="intro">${n==="login"?h("loginIntro"):t("أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.","Enter your email to receive a reset link.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${i.theme==="dark"?"الوضع النهاري":"الوضع الليلي"}">${p(i.theme==="dark"?"sun":"moon",16)}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${i.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            ${r}
          </div>
        </section>
      </div>
    </div>`,A();const b=(l,d=!1)=>{const y=document.getElementById("login-error-container");y?y.innerHTML=l?`
        <div class="login-demo" style="border-color:${d?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"};background:${d?"var(--mint)":"rgba(239,68,68,0.08)"};color:${d?"var(--mint-strong)":"var(--red)"};margin-top:0;margin-bottom:15px;padding:10px 14px;border-radius:8px;font-size:12.5px;display:flex;align-items:center;gap:8px;line-height:1.5;">
          ${p(d?"check":"alert",16)}
          <span>${w(l)}</span>
        </div>`:"":l&&V(l,!d)};document.getElementById("login-form")?.addEventListener("submit",async l=>{l.preventDefault();const d=new FormData(l.currentTarget),y=String(d.get("email")||"").trim(),u=String(d.get("password")||""),x=document.getElementById("remember-email-check")?.checked,m=l.currentTarget.querySelector('button[type="submit"]'),S=`${p(i.lang==="ar"?"arrowLeft":"arrowRight",16)} ${h("login")}`;b(""),m.disabled=!0,m.innerHTML=`<span>⏳ ${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const k=y.trim().toLowerCase()==="demo@darc-design.bond"||y.trim().toLowerCase()==="demo@darc.local";let $="bypass_dev";k||($=await Z());try{const s=await B("/api/auth/login",{method:"POST",body:JSON.stringify({email:y,password:u,turnstileToken:$})});if(M(),typeof localStorage<"u"&&(s?.token&&localStorage.setItem("darc_token",s.token),x?localStorage.setItem("darc_last_email",y):localStorage.removeItem("darc_last_email")),U(!0),O({theme:i.theme,lang:i.lang}),i.view="dashboard",s?.bootstrap){i.data=s.bootstrap,J(s.bootstrap),I(),typeof window._scheduleFeatureLoad=="function"&&window._scheduleFeatureLoad(),C(!0).catch(()=>{});return}const c=F();if(c&&c.user&&(c.user.id===s?.user?.id||s?.user?.email===c.user?.email)){c.user=s.user||c.user,i.data=c,I(),typeof window._scheduleFeatureLoad=="function"&&window._scheduleFeatureLoad(),C(!0).catch(()=>{});return}W(),j(),await C(),I(),typeof window._scheduleFeatureLoad=="function"&&window._scheduleFeatureLoad()}catch(s){if(console.error("Login Error:",s),typeof window<"u"&&window.turnstile&&g!==null)try{window.turnstile.reset(g)}catch{}m&&(m.disabled=!1,m.innerHTML=S);let c=s.message;if(typeof navigator<"u"&&!navigator.onLine)c=t("لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة وإعادة المحاولة.","No internet connection. Please check your network and try again.");else if(s.message&&(s.message.includes("Turnstile")||s.message.includes("التحقق الأمني")))c=t("فشل التحقق الأمني التلقائي (Cloudflare Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.","Security check (Turnstile) failed. Please refresh the page and try again.");else if(s.message&&(s.message.includes("429")||s.message.includes("كثيرة")||s.message.includes("rate")))c=t("تم تجاوز عدد محاولات الدخول المسموحة لحماية الحساب. يرجى الانتظار دقيقة واحدة قبل المحاولة مجدداً.","Too many login attempts. For security, please wait one minute before trying again."),G(document.querySelector('#login-form button[type="submit"]'),60);else if(s.message&&(s.message.includes("401")||s.message.includes("غير صحيحة")||s.message.includes("credentials"))){c=t("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من صحة المدخلات وإعادة المحاولة.","Incorrect email or password. Please verify your credentials and try again.");const L=document.getElementById("login-password");if(L){L.value="";try{L.focus()}catch{}}}else s.message&&(s.message.includes("مفعل")||s.message.includes("موقوف")||s.message.includes("inactive"))?c=t("حسابك معطل أو غير مفعل حالياً. يرجى التواصل مع مسؤول النظام لإعادة التفعيل.","This account is suspended or inactive. Please contact your system administrator."):(!c||c.includes("Failed to fetch")||c.includes("NetworkError")||c.includes("Network request failed"))&&(c=t("تعذر الاتصال بخادم تسجيل الدخول. يرجى التأكد من استقرار الإنترنت وإعادة المحاولة.","Could not reach the authentication server. Please check your connection and try again."));b(c)}}),document.getElementById("forgot-form")?.addEventListener("submit",async l=>{l.preventDefault();const d=new FormData(l.currentTarget),y=String(d.get("email")||"").trim(),u=l.currentTarget.querySelector('button[type="submit"]'),x=u?u.innerHTML:"";u&&(u.disabled=!0,u.innerHTML=`<span>${t("جاري إرسال الرابط...","Sending reset link...")}</span>`);try{await B("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:y})}),u&&(u.disabled=!1,u.innerHTML=x),b(t("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح","Password reset link sent to your email successfully"),!0)}catch(m){u&&(u.disabled=!1,u.innerHTML=x),b(m.message)}}),n==="login"?_():M()}function X(e,n=""){R(),document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",i.lang==="en"),document.documentElement.lang=i.lang,document.documentElement.dir=i.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=i.theme||"light",document.getElementById("app").innerHTML=`
    <div class="login-shell ${i.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${p("building",24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("تفعيل حساب الفريق","Team account activation")}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${t("خطوة واحدة للبدء","ONE STEP TO START")}</p><h1>${t("أكمل حسابك وانضم إلى مساحة العمل.","Finish your account and join the workspace.")}</h1><p>${t("اختر كلمة مرور آمنة للوصول إلى المشاريع والمهام المسندة إليك.","Choose a secure password to access your projects and assigned work.")}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${t("دعوة DARC الرسمية","DARC INVITE")}</p><h2>${t("تفعيل الحساب","Activate account")}</h2><p class="intro">${t("يجب أن تحتوي كلمة المرور على 10 أحرف على الأقل مع رموز وأرقام.","Your password must be at least 10 characters with numbers and symbols.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${p(i.theme==="dark"?"sun":"moon",16)}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${i.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            <form id="activation-form">
              <input type="hidden" name="token" value="${w(e)}" />
              <div class="field">
                <label for="act-pass">${h("password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${P("act")}
              </div>
              <div class="field">
                <label for="act-pass-confirm">${t("تأكيد كلمة المرور","Confirm password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass-confirm" name="passwordConfirm" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="act-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${n?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${p("alert",15)}<span>${w(n)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit">${p("shield",16)} ${t("تفعيل الحساب والدخول","Activate and sign in")}</button>
            </form>
            <div class="login-demo">${p("lock",16)}<span>${t("جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.","Your session is encrypted and your password is never stored in plain text.")}</span></div>
          </div>
        </section>
      </div>
    </div>`,A(),D("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function H(e,n=""){R(),document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",i.lang==="en"),document.documentElement.lang=i.lang,document.documentElement.dir=i.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=i.theme||"light";const a=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,r=!a&&!n?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
    <div class="login-shell ${i.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${p("building",24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("استعادة كلمة المرور","Password Recovery")}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h1>${t("اختر كلمة مرور جديدة لحسابك.","Choose a new password for your account.")}</h1><p>${t("كلمة المرور يجب أن تكون قوية وغير مستخدمة من قبل.","Password should be strong and unique.")}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${t("كلمة مرور جديدة","New Password")}</h2><p class="intro">${t("أدخل كلمة المرور الجديدة وقم بتأكيدها.","Enter and confirm your new password.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${p(i.theme==="dark"?"sun":"moon",16)}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${i.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            <form id="reset-form">
              <input type="hidden" name="token" value="${w(a||"")}" />
              <div class="field">
                <label for="rst-pass">${t("كلمة المرور الجديدة","New Password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass" name="newPassword" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required ${a?"":"disabled"} />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${P("rst")}
              </div>
              <div class="field">
                <label for="rst-pass-confirm">${t("تأكيد كلمة المرور الجديدة","Confirm New Password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass-confirm" name="newPasswordConfirm" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required ${a?"":"disabled"} />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="rst-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${n||r?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${p("alert",15)}<span>${w(n||r)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit" ${a?"":"disabled"}>${t("حفظ وتسجيل الدخول","Save and login")}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,A(),D("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async o=>{o.preventDefault();const f=new FormData(o.currentTarget),b=f.get("newPassword");if(b!==f.get("newPasswordConfirm")){H(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const l=o.currentTarget.querySelector('button[type="submit"]');l.disabled=!0;try{await B("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:b})}),window.history.replaceState({},"",window.location.pathname),j(),await C(),I()}catch(d){H(e,d.message)}})}function ee(e){const n=e.status==="pending",a=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${n}">
      <div class="field">
        <label for="force-pass-input">${n?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${P("force")}
        ${e.email?n?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${p("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${h("cancel")}</button>
        <button type="submit" class="btn btn-primary">${n?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Y(n?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),n?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${w(e.name)}.`,`Set an initial password to activate ${w(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${w(e.name)}`,`Set a new password for ${w(e.name)}`),a,"force-password"),A(),D("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}export{H as a,Q as i,ee as n,X as r,ae as t};
