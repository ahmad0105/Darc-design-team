import{t as Ge}from"./rolldown-runtime-BQ-_32WO.js";function Mt(e){if(typeof document>"u"||!e||!document.cookie)return null;const t=document.cookie.split("; "),n=encodeURIComponent(String(e))+"=",i=String(e)+"=";for(let o=0;o<t.length;o++){const r=t[o];if(r.startsWith(n)){const d=r.substring(n.length);try{return decodeURIComponent(d)}catch{return d}}else if(r.startsWith(i)){const d=r.substring(i.length);try{return decodeURIComponent(d)}catch{return d}}}return null}function Zi(){if(typeof window>"u")return"ar";try{let e=Mt("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const t=Mt("darc_prefs");if(t)try{e=JSON.parse(t).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function Qi(){if(typeof window>"u")return"light";try{let e=Mt("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const t=Mt("darc_prefs");if(t)try{e=JSON.parse(t).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function ea(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const t=window.location.hash.replace(/^#/,"");if(t&&!["login","forgot"].includes(t)){const[i,o]=t.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)){let r=null,d="overview",l="profile";if(o){const c=new URLSearchParams(o),p=c.get("id");p&&/^[a-zA-Z0-9_-]{3,64}$/.test(p)&&(r=p);const u=c.get("tab");u&&["overview","tasks","drawings","documents","timeline","activity"].includes(u)&&(d=u);const m=c.get("section");m&&["profile","company","roles","accounts","whatsapp","security","audit","trash","analytics","diagnostics","preferences"].includes(m)&&(l=m)}return{view:i,activeProjectId:r,projectTab:d,settingsSection:l}}}const n=sessionStorage.getItem("darc_last_route");if(n){const i=JSON.parse(n);if(i.view)return{view:i.view,activeProjectId:i.activeProjectId||null,projectTab:i.projectTab||"overview",settingsSection:i.settingsSection||"profile"}}}catch{}return e}var wt=ea(),s={lang:Zi(),theme:Qi(),view:wt.view,activeProjectId:wt.activeProjectId,projectTab:wt.projectTab,settingsSection:wt.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",docDisciplineFilter:"all",docStatusFilter:"all",docSortOrder:"newest",docViewMode:typeof localStorage<"u"&&localStorage.getItem("darc_doc_view_mode")||"grid",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},ta="darc_offline_db",na=1,Pe="cache_store",ot="darc_offline_bootstrap",ge="darc_offline_mutations_queue",Vt=!1,Gt=null;function ln(){return typeof indexedDB>"u"?Promise.resolve(null):(Gt||(Gt=new Promise(e=>{try{const t=indexedDB.open(ta,na);t.onupgradeneeded=n=>{const i=n.target.result;i.objectStoreNames.contains(Pe)||i.createObjectStore(Pe)},t.onsuccess=()=>e(t.result),t.onerror=()=>e(null)}catch{e(null)}})),Gt)}async function ia(e){const t=await ln();return t?new Promise(n=>{try{const i=t.transaction(Pe,"readonly").objectStore(Pe).get(e);i.onsuccess=()=>n(i.result||null),i.onerror=()=>n(null)}catch{n(null)}}):null}async function aa(e,t){const n=await ln();return n?new Promise(i=>{try{const o=n.transaction(Pe,"readwrite").objectStore(Pe).put(t,e);o.onsuccess=()=>i(!0),o.onerror=()=>i(!1)}catch{i(!1)}}):!1}async function Nn(e){const t=await ln();return t?new Promise(n=>{try{const i=t.transaction(Pe,"readwrite").objectStore(Pe).delete(e);i.onsuccess=()=>n(!0),i.onerror=()=>n(!1)}catch{n(!1)}}):!1}function oa(){return typeof navigator<"u"?navigator.onLine:!0}function Ae(e){if(!e||!e.user)return;const t={timestamp:Date.now(),data:e};if(aa(ot,t).catch(()=>{}),typeof localStorage<"u"){const n=()=>{try{localStorage.setItem(ot,JSON.stringify(t))}catch(i){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",i.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:2e3}):setTimeout(n,50)}}function Qn(){if(typeof localStorage<"u")try{const e=localStorage.getItem(ot);if(e){const t=JSON.parse(e);if(t?.data&&t.data.user)return t.data}}catch{}return null}async function zn(){const e=await ia(ot);return e?.data&&e.data.user?e.data:Qn()}async function en(){if(typeof localStorage<"u")try{localStorage.removeItem(ot),localStorage.removeItem(ge)}catch{}await Promise.all([Nn(ot),Nn(ge)]),Ie()}function Ie(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:cn().length}}))}function et(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function Bn({path:e,method:t="POST",body:n=null,description:i=""}){if(typeof localStorage>"u")return null;try{const o=localStorage.getItem(ge),r=o?JSON.parse(o):[];if(t==="DELETE"){if(e.startsWith("/api/tasks/")){const l=e.split("/")[3];if(r.some(c=>c.method==="POST"&&c.path==="/api/tasks"&&c.body?.id===l)){const c=r.filter(p=>!(p.path==="/api/tasks"&&p.body?.id===l||p.path===`/api/tasks/${l}`||p.path.startsWith(`/api/tasks/${l}/`)));return localStorage.setItem(ge,JSON.stringify(c)),Ie(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const l=e.split("/")[3];if(r.some(c=>c.method==="POST"&&c.path==="/api/projects"&&c.body?.id===l)){const c=r.filter(p=>!(p.path==="/api/projects"&&p.body?.id===l||p.path===`/api/projects/${l}`||p.method==="POST"&&p.path==="/api/tasks"&&p.body?.projectId===l));return localStorage.setItem(ge,JSON.stringify(c)),Ie(),{id:"compacted",compacted:!0}}}}if(t==="PATCH"&&e==="/api/tasks/reorder"&&n?.items&&Array.isArray(n.items)){const l=r.findIndex(c=>c.method==="PATCH"&&c.path==="/api/tasks/reorder");if(l!==-1){const c=r[l],p=new Map((c.body?.items||[]).map(u=>[u.id,u]));return n.items.forEach(u=>p.set(u.id,u)),c.body={items:Array.from(p.values())},c.createdAt=new Date().toISOString(),localStorage.setItem(ge,JSON.stringify(r)),Ie(),c}}if(t==="PATCH"&&n&&typeof n=="object"){const l=r.findIndex(c=>c.method==="PATCH"&&c.path===e);if(l!==-1){const c=r[l];if(e==="/api/tasks/reorder"&&Array.isArray(n.items)){const p=new Map((c.body?.items||[]).map(u=>[u.id,u]));n.items.forEach(u=>p.set(u.id,u)),c.body={items:Array.from(p.values())}}else c.body={...c.body||{},...n};return c.createdAt=new Date().toISOString(),localStorage.setItem(ge,JSON.stringify(r)),Ie(),c}}const d={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substring(2,8),path:e,method:t,body:n,description:i,createdAt:new Date().toISOString()};return r.push(d),localStorage.setItem(ge,JSON.stringify(r)),Ie(),console.log("[Offline Outbox] Enqueued mutation:",d),d}catch(o){return console.warn("[Offline Outbox] Failed to enqueue mutation:",o.message),null}}function cn(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(ge);return e?JSON.parse(e):[]}catch{return[]}}function ra(){typeof localStorage>"u"||(localStorage.removeItem(ge),Ie())}function Fn(e,t,n,i){if(!i||!i.data)return{ok:!0,queued:!0,offline:!0};const o=new Date().toISOString();if(t==="POST"&&e==="/api/tasks"&&n){const r=n.id||et("tsk");n.id=r;const d={id:r,code:"OFFLINE",projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",status:n.status||"not_started",priority:n.priority||"medium",categoryAr:n.categoryAr||"عام",categoryEn:n.categoryEn||"General",weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:i.data.users?.find(c=>c.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:o,updatedAt:o,_isOfflinePending:!0};i.data.tasks||(i.data.tasks=[]);const l=i.data.tasks.findIndex(c=>c.id===r);return l!==-1?i.data.tasks[l]=d:i.data.tasks.unshift(d),Ae(i.data),{ok:!0,queued:!0,offline:!0,task:d}}if(t==="PATCH"&&e.startsWith("/api/tasks/")&&n){const r=e.split("/")[3],d=(i.data.tasks||[]).findIndex(l=>l.id===r);if(d!==-1){const l={...i.data.tasks[d],...n,updatedAt:o,_isOfflinePending:!0};return n.assigneeId!==void 0&&(l.assignee=i.data.users?.find(c=>c.id===n.assigneeId)||null),i.data.tasks[d]=l,Ae(i.data),{ok:!0,queued:!0,offline:!0,task:l}}}if(t==="DELETE"&&e.startsWith("/api/tasks/")){const r=e.split("/")[3];return i.data.tasks&&(i.data.tasks=i.data.tasks.filter(d=>d.id!==r),Ae(i.data)),{ok:!0,queued:!0,offline:!0}}if(t==="POST"&&e==="/api/projects"&&n){const r=n.id||et("prj");n.id=r;const d={id:r,code:n.code||"DARC-OFF-"+Date.now().toString(36).slice(-4).toUpperCase(),nameAr:n.nameAr||n.name||"مشروع محلي جديد",nameEn:n.nameEn||n.name||"New Offline Project",clientAr:n.clientAr||"",clientEn:n.clientEn||"",descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",lifecycle:n.lifecycle||"planning",health:n.health||"on_track",progress:0,progressMode:"weighted",managerId:n.managerId||i.data.user?.id,memberIds:Array.isArray(n.memberIds)?n.memberIds:[],startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:o,updatedAt:o,_isOfflinePending:!0};i.data.projects||(i.data.projects=[]);const l=i.data.projects.findIndex(c=>c.id===r);return l!==-1?i.data.projects[l]=d:i.data.projects.unshift(d),Ae(i.data),{ok:!0,queued:!0,offline:!0,project:d}}if(t==="PATCH"&&e.startsWith("/api/projects/")&&n){const r=e.split("/")[3],d=(i.data.projects||[]).findIndex(l=>l.id===r);if(d!==-1){const l={...i.data.projects[d],...n,updatedAt:o,_isOfflinePending:!0};return i.data.projects[d]=l,Ae(i.data),{ok:!0,queued:!0,offline:!0,project:l}}}if(t==="DELETE"&&e.startsWith("/api/projects/")){const r=e.split("/")[3];return i.data.projects&&(i.data.projects=i.data.projects.filter(d=>d.id!==r),Ae(i.data)),{ok:!0,queued:!0,offline:!0}}if(t==="POST"&&e.includes("/comments")&&n){const r=e.split("/")[3],d={id:n.id||et("cmt"),taskId:r,userId:i.data.user?.id,content:n.content,createdAt:o,_isOfflinePending:!0};return n.id=d.id,i.data.comments||(i.data.comments=[]),i.data.comments.some(l=>l.id===d.id)||i.data.comments.push(d),Ae(i.data),{ok:!0,queued:!0,offline:!0,comment:d}}return t==="PATCH"&&e==="/api/tasks/reorder"&&n&&Array.isArray(n.items)?(i.data.tasks&&(n.items.forEach(r=>{const d=i.data.tasks.find(l=>l.id===r.id);d&&(r.status&&(d.status=r.status),r.sortOrder&&(d.sortOrder=r.sortOrder),r.customFields&&(d.customFields={...d.customFields||{},...r.customFields}),d._isOfflinePending=!0)}),Ae(i.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function sa(e){if(Vt)return{total:0,synced:0,failed:0};const t=cn();if(!t.length)return{total:0,synced:0,failed:0};Vt=!0,console.log(`[Offline Sync] Replaying ${t.length} pending mutations...`);let n=0,i=!1;const o=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,r=new Set(["POST","PATCH","PUT","DELETE"]);for(let d=0;d<t.length;d++){const l=t[d];if(!l||!l.path||typeof l.path!="string"||!o.test(l.path)||!r.has(l.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",l?.id,l?.path);continue}try{const c={method:l.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":l.id,"X-Idempotency-Key":l.id}};l.body&&(c.body=typeof l.body=="string"?l.body:JSON.stringify(l.body));const p=await e(l.path,c);if(p&&p.error&&!p.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",l.id,p.error);else if(n++,l.path==="/api/tasks/reorder"&&Array.isArray(l.body?.items))l.body.items.forEach(u=>{u?.id&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(u.id)});else{const u=l.body&&typeof l.body=="object"&&l.body.id||typeof l.path=="string"&&l.path.split("/")[3];u&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(u)}}catch(c){if(console.error("[Offline Sync] Failed to replay mutation:",l.id,l.path,c.message),typeof navigator<"u"&&!navigator.onLine||c.message&&(c.message.includes("تعذر الاتصال")||c.message.includes("fetch")||c.message.includes("NetworkError")||c.name==="TypeError")){const p=t.slice(d);typeof localStorage<"u"&&localStorage.setItem(ge,JSON.stringify(p)),i=!0;break}}}return i||(ra(),s.data?.tasks&&(s.data.tasks.forEach(d=>{d._isOfflinePending&&delete d._isOfflinePending}),typeof document<"u"&&document.querySelectorAll(".badge-offline-pending").forEach(d=>d.remove()))),Vt=!1,Ie(),{total:t.length,synced:n,failed:i?t.length-n:0}}var yo=Ge({closeModal:()=>la,hideSplashScreen:()=>pn,modalShell:()=>qt,renderLoading:()=>da,showToast:()=>G}),Hn=!1;function pn(){if(Hn)return;Hn=!0;const e=document.getElementById("darc-splash-screen");e&&(e.style.transition="opacity 0.18s ease",e.style.opacity="0",setTimeout(()=>{e.style.display="none"},190))}function da(){pn(),document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${a("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var He=!1,Ce=null;function la(e=!1){Ce&&(clearTimeout(Ce),Ce=null);const t=document.getElementById("preview-modal-overlay");t&&(t.style.display="none",t.innerHTML="");const n=document.getElementById("project-report-preview-modal");n&&(n.style.display="none",n.innerHTML="");const i=document.getElementById("audit-report-preview-modal");i&&(i.style.display="none",i.innerHTML="");const o=document.getElementById("omnisearch-modal");o&&o.remove();const r=document.getElementById("modal-root");if(!r||!r.hasChildNodes()){document.body.style.overflow="",He=!1;return}if(e){r.innerHTML="",document.body.style.overflow="",He=!1;return}if(He)return;He=!0;const d=r.querySelector(".modal-backdrop"),l=r.querySelector(".modal");d&&l?(d.classList.add("is-closing"),l.classList.add("is-closing"),Ce=setTimeout(()=>{Ce=null,r.innerHTML="",document.body.style.overflow="",He=!1},150)):(r.innerHTML="",document.body.style.overflow="",He=!1)}function qt(e,t,n,i="",o=""){return Ce&&(clearTimeout(Ce),Ce=null),He=!1,document.body.style.overflow="hidden",`<div class="modal-backdrop ${i?`backdrop-${i}`:""}"><div class="modal ${o}" data-modal="${i}"><div class="modal-head"><div><h2>${f(e)}</h2><p>${f(t||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${a("إغلاق","Close")}">${b("close",15)}</button></div>${n}</div></div>`}function G(e,t="success"){if(!e)return;let n=document.getElementById("toast-root");n||(n=document.createElement("div"),n.id="toast-root",n.className="toast-stack",n.setAttribute("role","region"),n.setAttribute("aria-label","Notifications"),document.body.appendChild(n));let i="success";if(typeof t=="boolean"?i=t?"error":"success":typeof t=="string"&&t&&(i=t.toLowerCase()),i==="success"||i==="info"){const u=String(e);/رفع|مخطط|تحميل|تنزيل|ملف|upload|file|document|dwg|pdf/i.test(u)?i="upload":/خطأ|فشل|تعذر|مرفوض|غير مصرح|blocked|error|fail|denied|حظر/i.test(u)?i="error":/تحذير|انتبه|تنبيه|أوفلاين|offline|warn/i.test(u)?i="warning":/إشعار|معلومة|رابط|نسخ|copied|info|bell/i.test(u)&&(i="info")}const o={success:"check",error:"alert",warning:"alert",info:"bell",upload:"upload"}[i]||"check",r=String(e).replace(/^[\s\uFEFF\xA0]*[✅🔔🚀⚠️✨✓✕❌📑📊👥🎉]+\s*/u,"").replace(/\s*[✅🔔🚀⚠️✨✓✕❌📑📊👥🎉]+[\s\uFEFF\xA0]*$/u,"").trim(),d=document.createElement("div");d.className=`toast toast-${i} ${i==="error"?"error":""}`,d.setAttribute("role","alert"),d.setAttribute("aria-live","polite"),d.innerHTML=`
    <span class="toast-icon-badge ${i}" aria-hidden="true">
      ${b(o,17)}
    </span>
    <div class="toast-content">
      <span class="toast-text" dir="auto">${f(r)}</span>
    </div>
    <button type="button" class="toast-close" aria-label="${a("إغلاق","Close")}" title="${a("إغلاق","Close")}">
      ${b("close",13)}
    </button>
  `;let l=null;const c=()=>{l&&clearTimeout(l),d.classList.add("toast-exit"),setTimeout(()=>{try{d.remove()}catch{}},220)},p=d.querySelector(".toast-close");p&&p.addEventListener("click",u=>{u.stopPropagation(),c()}),l=setTimeout(c,4200),d.addEventListener("mouseenter",()=>{l&&clearTimeout(l)}),d.addEventListener("mouseleave",()=>{l=setTimeout(c,2e3)}),n.appendChild(d)}var bo=Ge({I18N:()=>tn,PERMISSION_ALIASES:()=>li,avatar:()=>Re,can:()=>R,canManageAccountPermissions:()=>$a,canUserMoveTask:()=>Je,choose:()=>a,currentViewTitle:()=>Wt,dateLabel:()=>bt,detectDocumentDiscipline:()=>ai,docBlobManager:()=>pi,dueLabel:()=>wa,esc:()=>f,exportXLS:()=>_a,extractDrawingVersion:()=>ii,formatDateTime:()=>ri,formatReportDate:()=>ha,formatReportTime:()=>va,formatUnifiedDateNumeric:()=>ba,getActiveCalendarSystem:()=>st,getCompanyBranding:()=>Ea,getCookieVal:()=>ei,getDaysOverdue:()=>Aa,getDisciplineInfo:()=>oi,getFileFormatInfo:()=>ni,getHijriDateEquivalent:()=>xa,getTaskDueTier:()=>fn,getTaskStatusStyle:()=>un,getTimeBasedGreeting:()=>ya,hasSessionIndicator:()=>yt,icon:()=>b,initials:()=>nn,isAdmin:()=>Z,isDueSoon:()=>si,isNotificationRead:()=>Me,isOverdue:()=>Ut,isTaskAssignedToUser:()=>ci,parseEndOfDay:()=>ht,playSuccessChime:()=>Sa,priorityText:()=>gn,roleFor:()=>di,roleName:()=>yn,runInWorker:()=>Ta,sanitizeForSpreadsheet:()=>ma,savePreferencesCookies:()=>ca,setSavedTaskSort:()=>bn,setSessionIndicator:()=>ti,showToast:()=>G,statusBadge:()=>ka,statusDot:()=>ga,statusText:()=>mn,t:()=>S}),tn={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function S(e){return tn[s.lang][e]||tn.ar[e]||e}function a(e,t){return s.lang==="ar"?e:t}function ei(e){if(typeof document>"u"||!e)return null;const t=document.cookie?document.cookie.split("; "):[];for(const n of t){const i=n.indexOf("=");if(i!==-1&&n.slice(0,i).trim()===e)return decodeURIComponent(n.slice(i+1))}return null}function yt(){return typeof document>"u"?!1:ei("darc_logged_in")==="1"}function ti(e=!0){if(typeof document>"u")return;const t=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let n="";if(typeof window<"u"){const i=window.location.hostname;(i==="darc-design.bond"||i.endsWith(".darc-design.bond"))&&(n="; Domain=.darc-design.bond")}e?document.cookie=`darc_logged_in=1; Path=/; Max-Age=604800; SameSite=Lax${t}${n}`:(document.cookie=`darc_logged_in=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${t}`,n&&(document.cookie=`darc_logged_in=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${t}${n}`))}function ca({theme:e,lang:t}={}){if(typeof document>"u")return;const n=31536e3,i=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let o="";if(typeof window<"u"){const u=window.location.hostname;(u==="darc-design.bond"||u.endsWith(".darc-design.bond"))&&(o="; Domain=.darc-design.bond")}const r=e==="dark"||e==="light"?e:null,d=t==="ar"||t==="en"?t:null;if(r){document.cookie=`darc_theme=${encodeURIComponent(r)}; Path=/; Max-Age=${n}; SameSite=Lax${i}${o}`;try{window.localStorage.setItem("darc-theme",r)}catch{}}if(d){document.cookie=`darc_lang=${encodeURIComponent(d)}; Path=/; Max-Age=${n}; SameSite=Lax${i}${o}`;try{window.localStorage.setItem("darc-locale",d)}catch{}}const l=r||(s&&s.theme==="dark"?"dark":"light")||"light",c=d||(s&&s.lang==="en"?"en":"ar")||"ar",p=JSON.stringify({theme:l,lang:c});document.cookie=`darc_prefs=${encodeURIComponent(p)}; Path=/; Max-Age=${n}; SameSite=Lax${i}${o}`}var pa={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},ua=/[&<>'"]/,fa=/[&<>'"]/g;function f(e){if(e==null)return"";const t=String(e);return ua.test(t)?t.replace(fa,n=>pa[n]):t}function ma(e){if(e==null)return"";const t=String(e),n=t.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(t)?`'${t}`:t}var qn={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',droplet:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',thermometer:'<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',armchair:'<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v3M19 18v3"/>',palette:'<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',trendingUp:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',archive:'<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',compass:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',success:'<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>',error:'<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/>',warning:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',signal:'<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>',bug:'<rect width="8" height="14" x="8" y="6" rx="4"/><path d="m19 7-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M20 13h-4M4 13h4M10 4l1 2M14 4l-1 2"/>',flask:'<path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.5A1 1 0 0 0 5.6 22h12.8a1 1 0 0 0 .9-1.5L14.2 10.4a2 2 0 0 1-.2-.9V2M8.5 2h7M7 16h10"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',copy:'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',celebrate:'<path d="M5 21v-7"/><path d="m3 14 4-2"/><path d="m3 18 4-2"/><path d="M19 21v-7"/><path d="m17 14 4-2"/><path d="m17 18 4-2"/><path d="M12 3a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3z"/><path d="M6 10h12v11H6z"/>',chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',volume:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>',bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/>',megaphone:'<path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"/>',footprint:'<path d="M4 16v-2.38C4 11.5 7 11 7 11s3 .5 3 2.62V16M4 20h6M14 8V5.62C14 3.5 17 3 17 3s3 .5 3 2.62V8M14 12h6"/>',hourglass:'<path d="M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',thumbUp:'<path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3"/>',package:'<path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',construction:'<rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7M7 14v7M17 3v3M7 3v3M10 14 2.3 6.3M14 6l7.7 7.7M8 6l8 8"/>',list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',external:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'};function b(e,t=18,n=""){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${n?` class="${f(n)}"`:""}>${qn[e]||qn.info}</svg>`}function ga(e="active"){return`<span class="status-dot status-dot--${f(e)}" aria-hidden="true"></span>`}function nn(e){if(!e||typeof e!="object")return"D";const t=(s.lang==="ar"?e.name:e.nameEn||e.name)||e.email||"DARC";return(String(t).replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join("")||String(t).slice(0,2)).toUpperCase()}function Re(e,t=""){const n=e||{name:"DARC",avatarColor:"#0d6269"},i=/^#[0-9a-f]{6}$/i.test(n.avatarColor||"")?n.avatarColor:"#0d6269",o=f(a(n.name,n.nameEn||n.name));if(n.avatarUrl){const r=f(nn(n)).replace(/['"\\]/g,"");return`<span class="avatar ${t}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${o}"><img src="${f(n.avatarUrl)}" alt="${o}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${i}';this.parentElement.textContent='${r}';" /></span>`}return`<span class="avatar ${t}" style="background:${i}" title="${o}">${f(nn(n))}</span>`}function ya(){const e=new Date().getHours();return s.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function un(e){const t=e?.status,n=Ut(e);return t==="done"||t==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:a("مكتملة","Completed")}:t==="review"||t==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:a("للمراجعة والاعتماد","In Review")}:t==="blocked"||n?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:n?a("متأخرة","Overdue"):a("متوقفة","Blocked")}:t==="in_progress"||t==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:a("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:a("غير مبدوءة","Not Started")}}function ni(e,t=""){const n=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(n)?{ext:n.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(n)?{ext:n.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:n==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["xlsx","xls","csv"].includes(n)?{ext:n.toUpperCase(),label:"Excel Sheet",color:"#107c41",bg:"rgba(16,124,65,0.12)",border:"rgba(16,124,65,0.3)",isExcel:!0}:["docx","doc","rtf","odt"].includes(n)?{ext:n.toUpperCase(),label:"Word Document",color:"#2b579a",bg:"rgba(43,87,154,0.12)",border:"rgba(43,87,154,0.3)",isWord:!0}:["pptx","ppt","key"].includes(n)?{ext:n.toUpperCase(),label:"PowerPoint Deck",color:"#d24726",bg:"rgba(210,71,38,0.12)",border:"rgba(210,71,38,0.3)",isPpt:!0}:["png","jpg","jpeg","webp","heic"].includes(n)?{ext:n.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["mp4","webm","mov","m4v","ogv"].includes(n)?{ext:n.toUpperCase(),label:"Video",color:"#8b5cf6",bg:"rgba(139,92,246,0.12)",border:"rgba(139,92,246,0.3)",isVideo:!0}:["zip","rar","7z","tar"].includes(n)?{ext:n.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:n.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function ii(e){if(!e)return null;const t=e.match(/[_-\s](?:rev|r|v)(\d+)([_.\s]|$)/i)||e.match(/\b(?:rev|r|v)(\d+)\b/i);return t?`V${parseInt(t[1],10)}`:null}function ai(e){if(!e)return"architectural";if(e.discipline&&typeof e.discipline=="string"&&e.discipline!=="all")return e.discipline.toLowerCase();if(e.customFields?.discipline&&e.customFields.discipline!=="all")return String(e.customFields.discipline).toLowerCase();const t=String(e.originalName||e.name||"").toUpperCase(),n=(t.split(".").pop()||"").toLowerCase();return t.includes("STRUCT")||t.includes("-S-")||t.includes("STR-")||t.includes("CONCRETE")||t.includes("STEEL")||t.includes("FOUNDATION")||t.includes("REBAR")||t.includes("BEAM")||t.includes("COLUMN")||t.includes("CALCULATION")?"structural":t.includes("MEP")||t.includes("-M-")||t.includes("-E-")||t.includes("-P-")||t.includes("HVAC")||t.includes("ELECTRICAL")||t.includes("PLUMBING")||t.includes("DRAINAGE")||t.includes("LIGHTING")?"mep":t.includes("BOQ")||t.includes("QUANTIT")||t.includes("BILL")||t.includes("SPEC")||["xlsx","xls","csv"].includes(n)?"boq":t.includes("CONTRACT")||t.includes("PERMIT")||t.includes("LICENSE")||t.includes("AGREEMENT")||t.includes("APPROVAL")||t.includes("TENDER")?"contracts":"architectural"}function oi(e){const t={architectural:{key:"architectural",labelAr:"معماري",labelEn:"Architectural",color:"#0d6269",bg:"rgba(13, 98, 105, 0.12)",border:"rgba(13, 98, 105, 0.3)",icon:"building"},structural:{key:"structural",labelAr:"إنشائي",labelEn:"Structural",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)",border:"rgba(37, 99, 235, 0.3)",icon:"shield"},mep:{key:"mep",labelAr:"كهروميكانيكي",labelEn:"MEP Systems",color:"#d97706",bg:"rgba(217, 119, 6, 0.12)",border:"rgba(217, 119, 6, 0.3)",icon:"zap"},boq:{key:"boq",labelAr:"كميات ومواصفات",labelEn:"BOQ & Specs",color:"#059669",bg:"rgba(5, 150, 105, 0.12)",border:"rgba(5, 150, 105, 0.3)",icon:"document"},contracts:{key:"contracts",labelAr:"عقود وتراخيص",labelEn:"Contracts & Permits",color:"#7c3aed",bg:"rgba(124, 58, 237, 0.12)",border:"rgba(124, 58, 237, 0.3)",icon:"award"},general:{key:"general",labelAr:"عام / مخرجات",labelEn:"General",color:"#475569",bg:"rgba(71, 85, 105, 0.12)",border:"rgba(71, 85, 105, 0.3)",icon:"folder"}};return t[e]||t.architectural}function st(){let e=null;try{e=localStorage.getItem("darc_calendar_system")}catch{}return s.calendarSystem||s.data?.user?.customFields?.calendarSystem||e||"gregorian"}var Un=new Map;function je(e,t={}){const n=e+"|"+JSON.stringify(t);let i=Un.get(n);return i||(i=new Intl.DateTimeFormat(e,t),Un.set(n,i)),i}function bt(e,t=!0){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?"—":st()==="hijri"?je(s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"numeric",month:"short",...t?{year:"numeric"}:{}}).format(n):je(s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{day:"numeric",month:"short",...t?{year:"numeric"}:{}}).format(n)}function ba(e){if(!e)return"—";const t=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(t.getTime())?"—":st()==="hijri"?je(s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"2-digit",month:"2-digit",year:"numeric"}).format(t):`${String(t.getDate()).padStart(2,"0")}/${String(t.getMonth()+1).padStart(2,"0")}/${t.getFullYear()}`}function ri(e,t={}){if(!e)return{date:"—",time:"—",full:"—"};try{const n=new Date(e);if(Number.isNaN(n.getTime()))return{date:String(e),time:"—",full:String(e)};const i=st(),o=s.lang==="ar",r=je(i==="hijri"?o?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{year:"numeric",month:t.monthStyle||"short",day:"numeric"}).format(n),d=je(o?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",...t.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(n);return{date:r,time:d,full:`${r} ${d}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function ha(e=new Date){const t=new Date(e);if(Number.isNaN(t.getTime()))return"—";const n=st(),i=s.lang==="ar";return je(n==="hijri"?i?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":i?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{dateStyle:"full"}).format(t)}function va(e=new Date){const t=new Date(e);return Number.isNaN(t.getTime())?"—":je(s.lang==="ar"?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(t)}function xa(e){if(!e)return"";const t=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(t.getTime())?"":je("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(t)}function ht(e){if(!e)return null;if(e instanceof Date){if(isNaN(e.getTime()))return null;const t=new Date(e.getTime());return t.setHours(23,59,59,999),t}if(typeof e=="number"){const t=new Date(e);return isNaN(t.getTime())?null:(t.setHours(23,59,59,999),t)}if(typeof e=="string"){const t=e.trim();if(!t)return null;const n=t.split("T")[0].split(" ")[0];if(/^\d{4}-\d{2}-\d{2}$/.test(n)){const[o,r,d]=n.split("-").map(Number);return new Date(o,r-1,d,23,59,59,999)}const i=new Date(t);if(!isNaN(i.getTime()))return i.setHours(23,59,59,999),i}return null}function wa(e){if(!e)return"—";const t=ht(e);if(!t||isNaN(t.getTime()))return"—";const n=Math.ceil((t-new Date)/864e5);return isNaN(n)?"—":n<0?a(`متأخرة ${Math.abs(n)} ${S("days")}`,`${Math.abs(n)} ${S("days")} ${S("ago")}`):n===0?S("today"):a(`بعد ${n} ${S("days")}`,`in ${n} ${S("days")}`)}function Ut(e){if(!e?.dueDate||["done","completed","canceled"].includes(e.status))return!1;const t=ht(e.dueDate);return t?t<new Date:!1}function fn(e){if(!e?.dueDate||["done","completed","canceled"].includes(e.status))return null;const t=ht(e.dueDate);if(!t)return null;const n=new Date,i=(t.getTime()-n.getTime())/36e5;return i<0?"overdue":i<=24?"due_24h":i<=48?"due_48h":i<=72?"due_72h":null}function si(e,t=3){const n=fn(e);return n==="due_24h"||n==="due_48h"||n==="due_72h"}function mn(e){switch(e){case"not_started":return S("notStarted");case"in_progress":return S("inProgress");case"review":return S("review");case"approval":return S("approval");case"done":return S("done");case"blocked":return S("blocked");case"canceled":return S("canceled");case"planning":return S("planning");case"active":return S("active");case"on_hold":return S("onHold");case"completed":return S("completed");case"archived":return S("archived");case"on_track":return S("onTrack");case"at_risk":return S("atRisk");case"off_track":return S("offTrack");default:return e||""}}function ka(e){return e?`<span class="status-badge ${f(e)}">${f(mn(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function gn(e){switch(e){case"low":return S("low");case"medium":return S("medium");case"high":return S("high");case"urgent":return S("urgent");default:return e||""}}function Me(e){return e?e.read===!0?!0:e.read===!1?!1:!!(e.readAt||e.read_at):!1}function di(e){const t=typeof e=="string"?s.data?.users?.find(n=>n.id===e):e;return t?s.data?.roles?.find(n=>n.id===t.roleId)||{id:t.roleId,nameAr:t.roleNameAr||"",nameEn:t.roleNameEn||"",permissions:[]}:null}function yn(e){const t=di(e);return t?a(t.nameAr,t.nameEn):"—"}var li={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function R(e){if(Z())return!0;const t=s.data?.role?.permissions;if(!t||!t.length)return!1;if(t.includes("*")||t.includes(e))return!0;const n=li[e];return!!(n&&t.includes(n))}function Z(){return s.data?.user?.roleId==="admin"||s.data?.user?.role_id==="admin"}function ci(e,t){if(!e||!t)return!1;if((e.assigneeId||e.assignee_id)===t)return!0;const n=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;return!!(Array.isArray(n)&&n.includes(t))}function $a(){return Z()||s.data?.user?.roleId==="account_permissions_manager"||s.data?.role?.permissions?.includes("manage_existing_account_permissions")}function Wt(){return s.view==="project-detail"?a("تفاصيل المشروع","Project details"):{dashboard:S("dashboard"),projects:S("projects"),tasks:S("myTasks"),documents:S("documents"),templates:S("templates"),team:S("team"),reports:S("reports"),settings:S("settings")}[s.view]||S("dashboard")}var Ke=null;function Sa(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;!Ke||Ke.state==="closed"?Ke=new e:Ke.state==="suspended"&&Ke.resume().catch(()=>{});const t=Ke,n=t.currentTime,i=t.createOscillator(),o=t.createGain();i.type="sine",i.frequency.setValueAtTime(587.33,n),o.gain.setValueAtTime(.08,n),o.gain.exponentialRampToValueAtTime(.001,n+.35),i.connect(o),o.connect(t.destination),i.start(n),i.stop(n+.35);const r=t.createOscillator(),d=t.createGain();r.type="sine",r.frequency.setValueAtTime(880,n+.12),d.gain.setValueAtTime(.001,n),d.gain.setValueAtTime(.09,n+.12),d.gain.exponentialRampToValueAtTime(.001,n+.65),r.connect(d),d.connect(t.destination),r.start(n+.12),r.stop(n+.65)}catch{}}function Ta(e,t){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(t)):new Promise((n,i)=>{try{const o=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),r=URL.createObjectURL(o),d=new Worker(r);d.onmessage=l=>{URL.revokeObjectURL(r),d.terminate(),l.data.ok?n(l.data.result):i(new Error(l.data.error))},d.onerror=l=>{URL.revokeObjectURL(r),d.terminate(),i(l)},d.postMessage(t)}catch{try{n(e(t))}catch(r){i(r)}}})}function Aa(e){if(!e)return 0;const t=ht(e);if(!t||isNaN(t.getTime()))return 0;const n=Date.now()-t.getTime();return n>0?Math.ceil(n/864e5):0}function Ea(){const e=s.data?.company||{},t=e.nameAr||e.name||"فريق دارك للتصميم",n=e.nameEn||e.name||"DARC Design Team",i=a(t,n),o=e.logoUrl||"";let r=/^(https?:\/\/|data:image\/|\/)/i.test(o)&&!o.toLowerCase().includes("javascript:")?o:"";return r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`),{nameAr:t,nameEn:n,displayName:i,logoUrl:r,emailFrom:e.emailFrom||"",emailTo:e.emailTo||"",phone:e.phone||"",website:e.website||"",address:e.address||""}}function _a(e,t){const n=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        td, th { border: 1px solid #333; padding: 7px 10px; text-align: right; vertical-align: middle; }
        .title { font-size: 18px; font-weight: bold; background: #0d6269; color: #fff; text-align: center; }
        .subtitle { font-size: 14px; font-weight: bold; background: #eef2f2; text-align: center; }
        .meta { font-size: 12px; text-align: center; background: #f9fafa; color: #475569; }
        .header { font-weight: bold; background: #d4e0e0; text-align: center; }
      </style>
    </head>
    <body dir="${s.lang==="ar"?"rtl":"ltr"}">
      ${t}
    </body>
    </html>
  `,i=new Blob(["\uFEFF"+n],{type:"application/vnd.ms-excel;charset=utf-8;"}),o=URL.createObjectURL(i),r=document.createElement("a");r.href=o,r.download=e.endsWith(".xls")?e:`${e}.xls`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}function Je(e){if(!e)return!1;if(Z()||s.data?.isDemo||s.data?.user?.id==="usr_demo"||typeof localStorage<"u"&&localStorage.getItem("darc_user_id")==="usr_demo")return!0;if(!R("edit_tasks"))return!1;const t=s.data?.user?.id;if(!t)return!1;const n=s.data?.user?.roleId||s.data?.user?.role_id;if(n==="discipline_lead"||n==="admin"||(e.assigneeId||e.assignee_id)===t||(e.creatorId||e.createdById||e.created_by_id||e.created_by)===t)return!0;const i=e.reviewerId||e.reviewer_id,o=e.approverId||e.approver_id;if(i===t||o===t)return!0;const r=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;if(Array.isArray(r)&&r.includes(t))return!0;const d=e.projectId||e.project_id;if(d&&s.data?.projects){const l=s.data?.projects?.find(c=>c.id===d);if(l){const c=l.managerId||l.manager_id,p=l.ownerId||l.owner_id||l.leadId||l.lead_id||l.createdById||l.created_by;if(c===t||p===t||Array.isArray(l.members)&&l.members.some(u=>(u.userId||u.id||u.user_id||u)===t)||Array.isArray(l.memberIds)&&l.memberIds.includes(t))return!0}}return!1}function bn(e){try{localStorage.setItem("darc_task_sort_pref",e)}catch{}s.taskSortPref=e,s.projectTaskSort=e,s.myTaskSort=e}var Da=8,Ia=9e5,Ca=class{constructor(e=Da){this.maxSize=e,this.cache=new Map}set(e,t,n=0){if(!(!e||!t)){if(this.cache.has(e)){const i=this.cache.get(e);if(i?.url&&i.url!==t)try{URL.revokeObjectURL(i.url)}catch{}this.cache.delete(e)}for(;this.cache.size>=this.maxSize;){const i=this.cache.keys().next().value;if(!i)break;const o=this.cache.get(i);if(o?.url)try{URL.revokeObjectURL(o.url)}catch{}this.cache.delete(i)}this.cache.set(e,{url:t,size:n,timestamp:Date.now()})}}get(e){if(!e||!this.cache.has(e))return null;const t=this.cache.get(e);if(!t)return null;if(Date.now()-t.timestamp>Ia){if(t.url)try{URL.revokeObjectURL(t.url)}catch{}return this.cache.delete(e),null}return this.cache.delete(e),this.cache.set(e,t),t.url}has(e){return!!this.get(e)}revoke(e){if(!e||!this.cache.has(e))return;const t=this.cache.get(e);if(t?.url)try{URL.revokeObjectURL(t.url)}catch{}this.cache.delete(e)}clear(){for(const[,e]of this.cache.entries())if(e?.url)try{URL.revokeObjectURL(e.url)}catch{}this.cache.clear()}},pi=new Ca;typeof window<"u"&&(window.__docBlobCache=pi);var ho=Ge({initSyncIndicatorListener:()=>ui,renderNavbar:()=>fi,renderSyncIndicator:()=>hn,updateNavbarTitle:()=>Ma});function hn(){const e=cn().length;return oa()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${a("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-flex;align-items:center;">${b("refresh",13)}</span>
      <span>${a("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:`<span class="btn btn-sm btn-ghost online-indicator-pill" style="font-size:11px;font-weight:600;color:var(--teal);border:1px solid rgba(20,184,166,0.2);background:rgba(20,184,166,0.05);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;pointer-events:none;" title="${a("متصل بالسيرفر — كافة البيانات متزامنة ولحظية","Connected to Cloud — fully synced")}">
    <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 5px var(--teal);"></span>
    <span>${a("متصل","Synced")}</span>
  </span>`:`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${a("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${a("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}function ui(){if(typeof window>"u"||window._darcSyncIndicatorBound)return;window._darcSyncIndicatorBound=!0;const e=()=>{const t=document.getElementById("sync-status-indicator");t&&(t.innerHTML=hn())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function fi(e=null){const t=(s.data?.notifications||[]).filter(o=>!Me(o)).length,n=s.data?.user||{},i=e||Wt();return`
    <header class="topbar">
      <div class="topbar-left">
        <button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">
          ${b("menu",18)}
        </button>
        <div>
          <div class="topbar-kicker">DARC / ${S("workspace")}</div>
          <div class="topbar-title">${f(i)}</div>
        </div>
      </div>
      <div class="topbar-right">
        <span id="sync-status-indicator">${hn()}</span>
        <button class="topbar-search-trigger" data-action="open-omnisearch" title="${a("بحث شامل وسريع","Omnisearch")}">
          ${b("search",14)}
          <span>${a("بحث شامل...","Search...")}</span>
          <kbd class="shortcut-kbd">${typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"⌘K":"Ctrl+K"}</kbd>
        </button>
        <button class="icon-button" data-action="open-cheatsheet" title="${a("دليل اختصارات لوحة المفاتيح (?)","Keyboard shortcuts guide (?)")}" style="color:var(--ink-soft);" aria-label="Shortcuts">
          <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
        </button>
        <button class="btn btn-ghost btn-sm topbar-action-btn" data-action="toggle-theme" title="${a("تبديل المظهر","Toggle Theme")}" aria-label="${a("تبديل المظهر","Toggle Theme")}">${b(s.theme==="dark"?"sun":"moon",16)}</button>
        <button class="btn btn-ghost btn-sm topbar-action-btn" data-action="toggle-lang" title="${a("تبديل اللغة","Toggle Language")}" aria-label="${a("تبديل اللغة","Toggle Language")}"><span class="lang-text">${s.lang==="ar"?"EN":"عربي"}</span> ${b("globe",14)}</button>
        <button class="icon-button topbar-action-btn" data-action="show-notifications" aria-label="${S("notifications")}">${b("bell",17)}${t?'<span class="notification-dot"></span>':""}</button>
        <div class="topbar-divider"></div>
        <div class="profile-chip" data-action="open-user-profile" title="${f(a(n.name,n.nameEn||n.name))}">
          ${Re(n)}
          <div class="profile-chip-text">
            <strong>${f(a(n.name,n.nameEn||n.name))}</strong>
            <span>${f(yn(n))}</span>
          </div>
        </div>
      </div>
    </header>
  `}function Ma(e=null){const t=document.querySelector(".topbar-title");t&&(t.textContent=e||Wt())}var vo=Ge({navItem:()=>Ee,renderSidebar:()=>gi,renderSidebarBackdrop:()=>mi});function Ee(e,t,n){return`<button class="nav-item ${s.view===e||e==="projects"&&s.view==="project-detail"?"active":""}" data-view="${e}">${b(n,17)}<span>${t}</span></button>`}function mi(){return`<div class="sidebar-backdrop ${s.sidebarOpen?"visible":""}" data-action="toggle-sidebar" aria-hidden="true"></div>`}function gi(){const e=s.data?.user||{},t=Z()||R("manage_settings")||R("manage_roles")||R("manage_users")||R("manage_trash")||R("view_audit_logs")||R("manage_templates");return`
    <aside class="sidebar ${s.sidebarOpen?"open":""}">
      <div class="sidebar-brand">
        ${s.data?.company?.logoUrl?`<img src="${f(s.data?.company?.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${b("building",20)}</span>`:`<span class="brand-mark">${b("building",20)}</span>`}
        <div>
          <div class="brand-name">${f(a(s.data?.company?.nameAr||s.data?.company?.name||"DARC Design Team",s.data?.company?.nameEn||s.data?.company?.name||"DARC Design Team"))}</div>
          <div class="brand-subtitle">${S("workspace")}</div>
        </div>
      </div>
      <div class="nav-title">${a("مساحة العمل","WORKSPACE")}</div>
      <nav class="nav-list">
        ${ne("dashboard")?Ee("dashboard",S("dashboard"),"grid"):""}
        ${ne("projects")?Ee("projects",S("projects"),"building"):""}
        ${ne("tasks")?Ee("tasks",S("myTasks"),"checklist"):""}
        ${ne("documents")?Ee("documents",S("documents"),"document"):""}
        ${ne("team")?Ee("team",S("team"),"users"):""}
        ${ne("reports")?Ee("reports",S("reports"),"chart"):""}
      </nav>
      <div class="nav-separator"></div>
      <div class="nav-title">${t||ne("templates")?a("إدارة النظام","ADMIN"):a("حسابي","MY ACCOUNT")}</div>
      <nav class="nav-list">
        ${ne("templates")?Ee("templates",S("templates"),"layers"):""}
        ${Ee("settings",t?S("settings"):a("الملف الشخصي والأمان","Profile & Security"),"settings")}
      </nav>
      <div class="sidebar-bottom">
        <div class="admin-badge">${Re(e)}<div class="admin-info"><strong>${f(a(e.name,e.nameEn||e.name))}</strong><span>${f(yn(e))}</span></div></div>
        <div class="sidebar-footer"><span>v1.0 · ${a("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${S("signOut")}">${b("logout",15)}</button></div>
      </div>
    </aside>
  `}var xo=Ge({canAccessView:()=>ne,getFirstAllowedView:()=>Le,loadData:()=>vn,refreshView:()=>Pa,renderApp:()=>De,renderView:()=>re,switchView:()=>La});function ne(e){return s.data?e==="dashboard"?R("view_dashboard"):e==="projects"||e==="project-detail"?R("view_projects"):e==="tasks"?R("create_tasks")||R("edit_tasks")||R("delete_tasks")||R("assign_tasks")||R("review_tasks")||R("approve_tasks")||R("manage_reminders")||R("view_projects")||Z():e==="documents"?R("upload_documents")||R("delete_documents")||Z():e==="templates"?R("manage_templates")||Z():e==="team"?Z()||R("manage_users"):e==="reports"?R("view_reports")||Z():e==="settings":!0}function Le(){for(const e of["dashboard","projects","tasks","documents","team","reports","templates","settings"])if(ne(e))return e;return"dashboard"}ui();function De(){if(s.data&&!ne(s.view)&&(s.view=Le()),typeof window<"u"){const e=window.location.hash.replace(/^#/,"");if(!e||e==="login"||e==="forgot"){let t=s.view;s.view==="project-detail"&&s.activeProjectId?t=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:s.view==="settings"&&s.settingsSection&&(t=`settings?section=${encodeURIComponent(s.settingsSection)}`),window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${t}`):(window._isInternalNav=!0,window.location.hash=`#${t}`)}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",pn(),document.getElementById("app").innerHTML=`
    <div class="app-shell ${s.lang==="en"?"is-ltr":""}">
      ${mi()}
      ${gi()}
      <section class="workspace">
        ${s.data?.isDemo||s.data?.user?.id==="usr_demo"?`
        <div class="demo-showcase-banner">
          <div class="demo-showcase-content">
            <span class="demo-showcase-badge">${a("بيئة عرض تجريبية","DEMO SHOWCASE")}</span>
            <span class="demo-showcase-timer" style="display:inline-flex;align-items:center;gap:4px;">${b("clock",12)} ${a("تنظيف ذاتي كل 15 دقيقة","Auto-resets every 15m")}</span>
            <span class="demo-showcase-desc">${a("مساحة تفاعلية مخصصة لاستعراض قدرات المنصة — تُحذف الملفات والتعديلات تلقائياً كل 15 دقيقة لحماية السيرفر ونظافة العرض.","Interactive sandbox showcasing DARC capabilities — all demo changes & uploads automatically purge every 15 minutes.")}</span>
          </div>
          <div class="demo-showcase-actions">
            <button class="btn btn-xs demo-showcase-btn" data-action="reset-demo-sandbox" style="display:inline-flex;align-items:center;gap:5px;">
              <span>${b("refresh",12)}</span>
              <span>${a("إعادة ضبط الآن","Reset Now")}</span>
            </button>
          </div>
        </div>`:""}
        ${fi()}
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,re()}var Wn=null;function re(e=!1){if(!e&&(window._isDraggingTask||window._isKeyboardDraggingTask||window._isTouchHoldingTask)){window._pendingRenderAfterDrag=!0;return}const t=document.getElementById("main-content");if(!t)return;ne(s.view)||(s.view=Le());const n=Wn===s.view,i=n?t.scrollTop:0,o=n?t.scrollLeft:0,r=n?t.querySelector(".board, .tasks-board, .board-columns"):null,d=r?r.scrollLeft:null;Wn=s.view;let l="";if(s.view==="dashboard"&&typeof window.renderDashboard=="function"&&(l=window.renderDashboard()),s.view==="projects"&&typeof window.renderProjects=="function"&&(l=window.renderProjects()),s.view==="tasks"&&typeof window.renderTasks=="function"&&(l=window.renderTasks()),s.view==="documents"&&typeof window.renderDocuments=="function"&&(l=window.renderDocuments()),s.view==="templates"&&typeof window.renderTemplates=="function"&&(l=window.renderTemplates()),s.view==="team"&&typeof window.renderTeam=="function"&&(l=window.renderTeam()),s.view==="reports"&&typeof window.renderReports=="function"&&(l=window.renderReports()),s.view==="settings"&&typeof window.renderSettings=="function"&&(l=window.renderSettings()),s.view==="project-detail"&&typeof window.renderProjectDetail=="function"&&(l=window.renderProjectDetail()),t.innerHTML=l,i&&(t.scrollTop=i),o&&(t.scrollLeft=o),d!==null){const c=t.querySelector(".board, .tasks-board, .board-columns");c&&(c.style.scrollSnapType="none",c.scrollLeft=d,requestAnimationFrame(()=>{c&&!window._isDraggingTask&&(c.style.scrollSnapType="")}))}(s.view==="tasks"||s.view==="project-detail")&&requestAnimationFrame(()=>{typeof window.verifyBoardSymmetry=="function"&&window.verifyBoardSymmetry()}),s.view==="project-detail"&&s.projectTab==="timeline"&&setTimeout(()=>{typeof window.drawTimelineArrows=="function"&&window.drawTimelineArrows()},0)}function La(e,t=void 0){s.data&&!ne(e)&&(e=Le()),ft("navigation",`الانتقال إلى واجهة #${e}${t?` (مشروع: ${t})`:""}`),s.view=e,t!==void 0&&(s.activeProjectId=t),e==="settings"&&!s.settingsSection&&(s.settingsSection="profile"),s.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelector(".sidebar-backdrop")?.classList.remove("visible"),document.querySelectorAll(".nav-item").forEach(i=>{const o=i.dataset.view,r=o===e||o==="projects"&&e==="project-detail";i.classList.toggle("active",r)});const n=document.querySelector(".topbar-title");n&&(n.textContent=Wt());try{let i=e;e==="project-detail"&&s.activeProjectId?i=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:e==="settings"&&s.settingsSection&&(i=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==i&&(window._isInternalNav=!0,window.location.hash=i),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:s.view,activeProjectId:s.activeProjectId,projectTab:s.projectTab,settingsSection:s.settingsSection}))}catch{}requestAnimationFrame(()=>{re();const i=document.getElementById("main-content");i&&(i.scrollTop=0,i.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function Pa(e=!1){try{await vn(e)}catch(t){G(t.message,!0)}}async function vn(e=!1){try{if(!yt()){typeof localStorage<"u"&&(localStorage.removeItem("darc_token"),localStorage.removeItem("darc_user_id"));try{en()}catch{}s.data=null,s.view="login";const o=new Error("No session");throw o.status=401,o}if(!s.data){const o=Qn();o&&o.user&&(s.data=o,(s.view==="login"||!ne(s.view))&&(s.view=Le()),requestAnimationFrame(()=>De()))}const t=s.view==="settings"&&s.settingsSection==="trash"&&!s.trashLoaded?he("/api/trash",{silent:!0}).catch(()=>null):null;let n=await he("/api/bootstrap",{silent:e});if(n===null){if(s.data&&s.data.user)return;const o=await zn();if(o&&o.user?n=o:(ct(),n=await he("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}})),!n||!n.user)return}if(Ae(n),s.isOffline=!1,t)try{const o=await t;o&&(s.trash=Array.isArray(o)?o:o.trash||[...(o.projects||[]).map(r=>({...r,type:"project"})),...(o.tasks||[]).map(r=>({...r,type:"task"})),...(o.documents||[]).map(r=>({...r,type:"document"}))],s.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash)))}catch{}if(s.data?.tasks&&n?.tasks){const o=Date.now(),r=new Set(n.tasks.map(d=>d.id));for(const d of s.data.tasks)if(!r.has(d.id))o-(d.createdAt?new Date(d.createdAt).getTime():o)<12e4&&(n.tasks.unshift(d),r.add(d.id));else{const l=window._recentlyMovedTasks?.get(d.id);if(l&&o-l.timestamp<2e4){const c=n.tasks.find(p=>p.id===d.id);c&&(c.status=l.status,l.progress!==void 0&&(c.progress=l.progress),l.sortOrder!==void 0&&(c.sortOrder=l.sortOrder,c.sort_order=l.sortOrder,c.customFields||(c.customFields={}),c.customFields.sortOrder=l.sortOrder,c.customFields.sort_order=l.sortOrder,c.custom_fields||(c.custom_fields={}),c.custom_fields.sortOrder=l.sortOrder,c.custom_fields.sort_order=l.sortOrder))}}}if(s.data?.projects&&n?.projects){const o=Date.now(),r=new Set(n.projects.map(d=>d.id));for(const d of s.data.projects)r.has(d.id)||o-(d.createdAt?new Date(d.createdAt).getTime():o)<12e4&&(n.projects.unshift(d),r.add(d.id))}let i=!1;if(s.data&&n)if(s.data.updatedAt!==n.updatedAt)i=!0;else if(s.data.tasks?.length!==n.tasks?.length||s.data.projects?.length!==n.projects?.length)i=!0;else{const o=s.data.tasks||[],r=n.tasks||[];for(let d=0;d<r.length;d++){const l=r[d],c=o[d];if(!c||c.id!==l.id||c.status!==l.status||(c.sortOrder||c.sort_order)!==(l.sortOrder||l.sort_order)||c.progress!==l.progress){i=!0;break}}if(!i){const d=s.data.projects||[],l=n.projects||[];for(let c=0;c<l.length;c++){const p=l[c],u=d[c];if(!u||u.id!==p.id||u.lifecycle!==p.lifecycle||u.health!==p.health||u.progress!==p.progress){i=!0;break}}}}if(!s.data||i||s.data.comments?.length!==n.comments?.length||s.data.documents?.length!==n.documents?.length||s.data.users?.length!==n.users?.length||s.data.auditLogs?.length!==n.auditLogs?.length||s.data.notifications?.length!==n.notifications?.length||s.view==="login"){n&&n.user&&(s.data=n),(s.view==="login"||!ne(s.view))&&(s.view=Le());const o=!!document.getElementById("modal-root")?.children?.length,r=!!(window._isDraggingTask||window._isTouchHoldingTask||window._isKeyboardDraggingTask||document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),d=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(r||d))return;requestAnimationFrame(!e&&!o?()=>De():()=>re())}else n&&n.user&&(s.data=n),ne(s.view)||(s.view=Le(),requestAnimationFrame(()=>re()))}catch(t){if(t&&(t.status===401||t.status===403))throw t;const n=await zn();if(n){s.data=n,ne(s.view)||(s.view=Le()),s.isOffline=!0;const i=!!document.getElementById("modal-root")?.children?.length;!e&&!i?De():re();return}throw t}}typeof window<"u"&&(window.renderApp=De,window.renderView=re);var Vn={assignment:{type:"assignment",category:"tasks",icon:"user",color:"blue",titleAr:"إسناد مهمة جديدة",titleEn:"Task Assigned",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_status:{type:"task_status",category:"tasks",icon:"check",color:"teal",titleAr:"تحديث حالة المهمة",titleEn:"Task Status Update",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_blocked:{type:"task_blocked",category:"tasks",icon:"alert",color:"red",titleAr:"مهمة متوقفة",titleEn:"Task Blocked",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_review:{type:"task_review",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة للمراجعة الفنية",titleEn:"Task for Review",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_approval:{type:"task_approval",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة بانتظار الاعتماد",titleEn:"Task Pending Approval",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},due_soon:{type:"due_soon",category:"schedule",icon:"clock",color:"amber",titleAr:"موعد تسليم قريب",titleEn:"Due Soon",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},overdue:{type:"overdue",category:"schedule",icon:"alert",color:"red",titleAr:"مهمة متأخرة",titleEn:"Overdue Task",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},reminder:{type:"reminder",category:"schedule",icon:"clock",color:"amber",titleAr:"تذكير بموعد ⏰",titleEn:"Due Reminder ⏰",badgeTextAr:"فتح التذكير",badgeTextEn:"Open Reminder"},comment:{type:"comment",category:"communication",icon:"mail",color:"blue",titleAr:"تعليق جديد",titleEn:"New Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},mention:{type:"mention",category:"communication",icon:"mail",color:"blue",titleAr:"تم ذكرك في تعليق",titleEn:"Mentioned in Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},document_review:{type:"document_review",category:"drawings",icon:"document",color:"amber",titleAr:"مراجعة مخطط هندسي",titleEn:"Drawing Review",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},document_approved:{type:"document_approved",category:"drawings",icon:"document",color:"teal",titleAr:"اعتماد مخطط هندسي",titleEn:"Drawing Approved",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},escalation:{type:"escalation",category:"system",icon:"alert",color:"red",titleAr:"تصعيد مهمة ونظام",titleEn:"Escalation Alert",badgeTextAr:"التفاصيل",badgeTextEn:"Details"},general:{type:"general",category:"system",icon:"bell",color:"blue",titleAr:"تنبيه مساحة العمل",titleEn:"Workspace Notification",badgeTextAr:"عرض",badgeTextEn:"View"}};function Ra(e){const t=Vn[e]||Vn.general;return{...t,defaultTitle:a(t.titleAr,t.titleEn),badgeText:a(t.badgeTextAr,t.badgeTextEn)}}function xn(){return typeof navigator>"u"?!1:/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function wn(){return typeof window>"u"?!1:!!(typeof window.matchMedia=="function"&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0||window.navigator?.standalone===!0)}function yi(){return typeof window>"u"?"default":"Notification"in window&&window.Notification?window.Notification.permission:xn()&&!wn()?"ios_safari_tab":"default"}async function wo(){if(typeof window>"u")return{status:"denied"};if(xn()&&!wn())return Oa(),{status:"ios_guide_shown"};if("Notification"in window&&window.Notification&&typeof window.Notification.requestPermission=="function")try{return{status:await window.Notification.requestPermission()}}catch(e){console.warn("[Notifications] window.Notification.requestPermission failed:",e)}if(typeof navigator<"u"&&"serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(e&&"pushManager"in e)return{status:"granted"}}catch{}return{status:"unsupported"}}async function ja({title:e="DARC Design Team",body:t="",icon:n="/favicon.ico",badge:i="/favicon.ico",url:o=null,tag:r=null,data:d={}}={}){try{Qa()}catch{}if(typeof navigator<"u"&&typeof navigator.vibrate=="function")try{navigator.vibrate([100,60,100])}catch{}let l=!1;const c=o||(typeof window<"u"?window.location.href:"/"),p=r||`darc_notif_${Date.now()}`;if(typeof navigator<"u"&&"serviceWorker"in navigator)try{const u=await navigator.serviceWorker.ready;if(u&&typeof u.showNotification=="function"&&yi()==="granted")return await u.showNotification(e,{body:t,icon:n,badge:i,tag:p,vibrate:[100,60,100],data:{url:c,...d},renotify:!0}),l=!0,{success:!0,channel:"service_worker"}}catch(u){console.warn("[Notifications] ServiceWorker showNotification failed:",u)}if(!l&&typeof window<"u"&&"Notification"in window&&window.Notification&&window.Notification.permission==="granted")try{const u=new window.Notification(e,{body:t,icon:n,badge:i,tag:p,renotify:!0});return u.onclick=()=>{window.focus(),u.close(),c&&(window.location.href=c)},l=!0,{success:!0,channel:"notification_api"}}catch(u){console.warn("[Notifications] window.Notification constructor failed:",u)}return G(`${e}: ${t}`,!1),{success:!0,channel:"in_app"}}function Oa(){const e=`
    <div style="padding:10px 4px;text-align:center;">
      <div style="width:56px;height:56px;border-radius:18px;background:var(--mint);color:var(--teal);display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px;box-shadow:0 4px 12px rgba(13,98,105,0.15);">
        ${b("bell",28)}
      </div>

      <h3 style="font-size:16px;font-weight:700;color:var(--ink);margin:0 0 8px;">
        ${a("تفعيل الإشعارات الفورية على iPhone و iPad","Enable Push Notifications on iPhone & iPad")}
      </h3>
      
      <p style="font-size:12px;color:var(--muted);line-height:1.6;margin:0 0 20px;">
        ${a("للحصول على إشعارات النظام الفورية عند وصول مهام ومخططات وتنبيهات حتى عندما يكون الهاتف مغلقاً، يتطلب نظام iOS إضافة الموقع إلى الشاشة الرئيسية.","To receive native iOS system alerts even when your phone is locked, Apple iOS requires adding the platform to your Home Screen.")}
      </p>

      <div style="display:flex;flex-direction:column;gap:12px;text-align:start;background:var(--surface-soft);padding:14px;border-radius:12px;border:1px solid var(--line);margin-bottom:20px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">1</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${a("اضغط على زر المشاركة (Share) في متصفح Safari","Tap the Share button in Safari")}</strong>
            <span style="font-size:11px;color:var(--muted);">${a("الأيقونة المربعة مع السهم المتجه للأعلى [⎋] أسفل شاشة الهاتف.","The square icon with an upward arrow [⎋] at the bottom of the screen.")}</span>
          </div>
        </div>

        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">2</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${a('اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)','Select "Add to Home Screen"')}</strong>
            <span style="font-size:11px;color:var(--muted);">${a("ستجد أيقونة دارك الهندسية [+] ضمن قائمة الخيارات.","Look for the DARC icon [+] in the share sheet menu.")}</span>
          </div>
        </div>

        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">3</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${a("افتح التطبيق من الشاشة الرئيسية واستمتع بالإشعارات","Open DARC from Home Screen")}</strong>
            <span style="font-size:11px;color:var(--muted);">${a("ستظهر لك نافذة السماح بالإشعارات الفورية لنظام iOS مباشرة!","An iOS prompt will appear allowing push notifications seamlessly!")}</span>
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
        <button type="button" class="btn btn-primary btn-sm" data-action="close-modal" style="padding:8px 20px;">
          ${a("فهمت ذلك","Got it")}
        </button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="test-in-app-notification" style="color:var(--teal);display:inline-flex;align-items:center;gap:5px;">
          ${b("volume",14)} <span>${a("تجربة التنبيه الصوتي الآن","Test Sound Alert")}</span>
        </button>
      </div>
    </div>
  `;document.getElementById("modal-root").innerHTML=qt(a("إشعارات أجهزة iPhone & iPad","iPhone & iPad Notifications"),a("دليل التفعيل السريع لإشعارات نظام Apple","Quick setup guide for Apple push alerts"),e,"ios-notif-guide","modal-ios-notif-guide")}var ko=Ge({showNotifications:()=>qe});function qe(){const e=s.data?.notifications||[],t=s.notificationTab||"all",n=e.filter(m=>!Me(m)).length,i=e.length-n;let o=e;t==="unread"?o=e.filter(m=>!Me(m)):t==="read"&&(o=e.filter(m=>Me(m)));const r=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line);flex-wrap:wrap;gap:10px;">
      <!-- Navigation filter tabs -->
      <div class="notif-tabs" style="display:inline-flex;align-items:center;background:var(--surface-soft);padding:3px;border-radius:10px;border:1px solid var(--line);gap:3px;">
        <button type="button" class="btn btn-sm ${t==="all"?"btn-primary":"btn-ghost"}" data-action="filter-notifications" data-tab="all" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${a("الكل","All")}</span>
          <span style="font-size:10px;opacity:0.85;background:rgba(0,0,0,0.12);padding:1px 5px;border-radius:10px;">${e.length}</span>
        </button>
        <button type="button" class="btn btn-sm ${t==="unread"?"btn-primary":"btn-ghost"}" data-action="filter-notifications" data-tab="unread" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${a("غير مقروء","Unread")}</span>
          ${n>0?`<span style="font-size:10px;background:var(--amber-strong);color:#fff;padding:1px 5px;border-radius:10px;font-weight:700;">${n}</span>`:'<span style="font-size:10px;opacity:0.85;padding:1px 5px;">0</span>'}
        </button>
        <button type="button" class="btn btn-sm ${t==="read"?"btn-primary":"btn-ghost"}" data-action="filter-notifications" data-tab="read" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${a("مقروء","Read")}</span>
          <span style="font-size:10px;opacity:0.85;padding:1px 5px;border-radius:10px;">${i}</span>
        </button>
      </div>

      <!-- Action buttons -->
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
        ${n>0?`
          <button type="button" class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${a("تحديد كافة التنبيهات كمقروءة","Mark all notifications as read")}">
            ${b("check",12)} ${a("تحديد الكل كمقروء","Mark all read")}
          </button>
        `:""}
        ${i>0?`
          <button type="button" class="btn btn-ghost btn-sm" data-action="clear-read-notifications" style="font-size:11px;color:var(--muted);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${a("حذف كافة الإشعارات المقروءة","Clear all read notifications")}">
            ${b("trash",12)} ${a("مسح المقروء","Clear read")}
          </button>
        `:""}
        <button type="button" class="btn btn-ghost btn-sm" data-action="send-test-notification" style="font-size:11px;color:var(--blue);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${a("إرسال إشعار تجريبي فوري للتأكد من وصوله","Send live test notification")}">
          ${b("bell",12)} ${a("تجربة إرسال","Test Send")}
        </button>
      </div>
    </div>
  `,d=yi(),l=xn()&&!wn();let c="";l?c=`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
        <span style="color:var(--ink-soft);display:inline-flex;align-items:center;gap:5px;">${b("phone",13)} ${a("تفعيل إشعارات نظام iOS الفورية على iPhone و iPad","Enable native iOS push alerts on iPhone & iPad")}</span>
        <button type="button" class="btn btn-primary btn-sm" data-action="show-ios-notification-guide" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${a("عرض الطريقة","View Setup")}</button>
      </div>
    `:d==="default"&&(c=`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
        <span style="color:var(--ink-soft);">${a("تفعيل إشعارات سطح المكتب والجوال عند وصول مهام أو تنبيهات؟","Enable desktop & mobile alerts when new tasks or mentions arrive?")}</span>
        <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${a("تفعيل الآن","Enable")}</button>
      </div>
    `);let p="";o.length?p=`<div class="attention-list" style="display:flex;flex-direction:column;gap:8px;">${o.slice(0,40).map(m=>{const y=Me(m),w=Ra(m.type),v=s.lang==="ar"?m.titleAr||w.titleAr||m.titleEn||w.defaultTitle:m.titleEn||w.titleEn||m.titleAr||w.defaultTitle,g=s.lang==="ar"?m.messageAr||m.bodyAr||m.content||"":m.messageEn||m.bodyEn||(m.content!==m.titleAr&&m.content!==m.messageAr?m.content:"")||m.messageAr||m.bodyAr||"",$=g&&g!==v?`${g} · `:"",A=m.type==="document_review"||m.type==="document_approved"||m.documentId,D=m.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-weight:600;">${b("check",10)} ${a("فتح المهمة","Open Task")}</span>`:A?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);font-weight:600;">${b("document",10)} ${a("معاينة المخطط","View Drawing")}</span>`:m.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);font-weight:600;">${b("building",10)} ${a("المشروع","Project")}</span>`:"",j=y?"":`<span style="width:7px;height:7px;border-radius:50%;background:var(--blue);display:inline-block;flex-shrink:0;box-shadow:0 0 0 2px var(--surface);" title="${a("غير مقروء","Unread")}"></span>`,H=y?`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;color:var(--muted);">${b("check",10)} <span style="font-size:9px;">${a("مقروء","Read")}</span></span>`:"",z=y?"border:1px solid var(--line);border-inline-start:3px solid transparent;":"border:1px solid rgba(56,189,248,0.35);border-inline-start:3px solid var(--blue);",q=y?"background:var(--surface-soft);":"background:var(--surface);",M=y?"opacity:0.85;":"opacity:1;";return`
        <div class="attention-item notif-item ${y?"notif-read":"notif-unread"}" 
             data-action="read-notification" 
             data-notification-id="${f(m.id)}" 
             data-task-id="${f(m.taskId||"")}" 
             data-project-id="${f(m.projectId||"")}" 
             data-document-id="${f(m.documentId||"")}" 
             data-type="${f(m.type||"")}" 
             style="${z}${q}${M}text-align:start;width:100%;cursor:pointer;position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
          
          <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
            <span class="attention-icon ${w.color}" style="flex-shrink:0;margin-top:2px;">${b(w.icon,14)}</span>
            <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
                ${j}
                <strong dir="auto" style="color:var(--${w.color});font-size:12px;font-weight:${y?"600":"700"};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${f(v)}</strong>
                ${H}
                ${D}
              </div>
              <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${f(g)}">
                ${f($)}<span style="color:var(--ink-soft);">${bt(m.createdAt)}</span>
              </div>
            </div>
          </div>

          <!-- Quick actions: Toggle read/unread & delete -->
          <div style="display:flex;align-items:center;gap:4px;margin-inline-start:10px;flex-shrink:0;">
            <button type="button" class="btn btn-ghost btn-sm notif-toggle-btn" 
                    data-action="toggle-notification-read" 
                    data-notification-id="${f(m.id)}" 
                    title="${y?a("تحديد كغير مقروء","Mark as unread"):a("تحديد كمقروء","Mark as read")}" 
                    style="padding:4px 6px;height:26px;color:${y?"var(--muted)":"var(--blue)"};border-radius:6px;">
              ${b(y?"bell":"check",12)}
            </button>
            <button type="button" class="notif-dismiss-btn" 
                    data-action="delete-notification" 
                    data-notification-id="${f(m.id)}" 
                    title="${a("حذف الإشعار","Dismiss notification")}" 
                    style="margin:0;">
              ${b("close",12)}
            </button>
          </div>
        </div>
      `}).join("")}</div>`:t==="unread"?p=`
        <div class="empty" style="padding:40px 20px;text-align:center;">
          <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${b("check",24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${a("رائع! لقد اطلعت على كافة التنبيهات","All caught up! No unread notifications")}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${a("لا توجد إشعارات غير مقروءة في صندوق الوارد حالياً.","You have no unread notifications in your inbox right now.")}</span>
        </div>
      `:t==="read"?p=`
        <div class="empty" style="padding:40px 20px;text-align:center;">
          <span style="color:var(--muted);background:var(--surface-soft);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${b("bell",24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${a("لا توجد إشعارات مقروءة حالياً","No read notifications")}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${a("الإشعارات التي تفتحها أو تحددها كمقروءة ستظهر هنا.","Notifications you read or mark as read will appear here.")}</span>
        </div>
      `:p=`
        <div class="empty" style="padding:48px 20px;text-align:center;">
          <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${b("bell",24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${a("لا توجد إشعارات حالياً","No notifications right now")}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${a("ستظهر هنا التنبيهات الخاصة بالمهام والمشاريع والإشارات والتذكيرات.","Task, project, mention, and reminder alerts will appear here.")}</span>
        </div>
      `;const u=`${r}${c}${p}`;document.getElementById("modal-root").innerHTML=qt(S("notifications"),a("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),u,"notifications","modal-notifications")}var Na="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",Jt=`https://drive.google.com/drive/folders/${Na}?usp=sharing`;function kn(e){if($e()||e&&(String(e.id).startsWith("doc_demo")||e.isDemo||String(e.driveFileId||"").startsWith("demo_"))){const i=e?.originalName;return i&&bi.has(i)?`/assets/${encodeURIComponent(i)}`:e?.diskFilename&&!e.diskFilename.includes("drive.google.com")?e.diskFilename:"/assets/DARC-VILLA-ARCH-A101_Rev03.pdf"}if(!e)return Jt;const t=e.driveFileId||e.drive_file_id;if(t&&!String(t).startsWith("demo_")&&String(t).length>=25&&t!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${encodeURIComponent(t)}/view?usp=sharing`;const n=e.diskFilename||e.disk_filename||e.viewLink||e.webViewLink||"";if(n&&n.includes("drive.google.com")){if(n.includes("1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"))return Jt;if(n.includes("/folders/"))return n;const i=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(i&&i[1]&&!i[1].startsWith("demo_")&&i[1].length>=25&&i[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${i[1]}/view?usp=sharing`}return n&&(n.startsWith("https://")||n.startsWith("http://"))&&!n.includes("localhost")&&!n.includes("127.0.0.1")&&!n.includes("demo_sample")?n:Jt}var bi=new Set(["DARC-VILLA-ARCH-A101_Rev03.pdf","SKYLINE-CW-SECTION-DETAILS-DWG.pdf","RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf","DARC-VILLA-BOQ-BILL-OF-QUANTITIES.xlsx","DARC-PALM-VILLA-TECHNICAL-SPECIFICATIONS.docx","DARC-ARCHITECTURAL-CONCEPT-PRESENTATION.pptx","DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4","PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg","DARC-STRUCTURAL-LAYOUT-V2.dwg"]);function $t(e){if(!e)return"";if(e.blobUrl&&typeof e.blobUrl=="string"&&e.blobUrl.startsWith("blob:"))return e.blobUrl;if(e._blobUrl&&typeof e._blobUrl=="string"&&e._blobUrl.startsWith("blob:"))return e._blobUrl;if(typeof window<"u"&&window.__docBlobCache){const r=window.__docBlobCache.get(e.id)||window.__docBlobCache.get(e.originalName);if(r&&typeof r=="string"&&r.startsWith("blob:"))return r}const t=!!(e.id?.startsWith("doc_demo_")||e.projectId?.startsWith("prj_demo_")||$e()),n=(e.originalName||"").trim();if(t){if(n==="darc-walkthrough.mp4")return"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4";if(n&&bi.has(n))return`/assets/${encodeURIComponent(n)}`}const i=(e.diskFilename||e.disk_filename||e.url||"").trim();if(i&&(i.startsWith("https://")||i.startsWith("http://")))try{const r=new URL(i);if(["http:","https:"].includes(r.protocol)&&!r.hostname.includes("drive.google.com")&&!r.hostname.includes("docs.google.com"))return i}catch{}if(e.id)return`/api/documents/${encodeURIComponent(e.id)}?stream=1`;const o=n.replace(/[/\\:*?"<>|\x00-\x1f]/g,"_");return o?`/assets/${encodeURIComponent(o)}`:""}async function hi(e,t=null){if(!e)return;const n=kn(e);let i=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(n),i=!0;else{const o=document.createElement("textarea");o.value=n,o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),i=document.execCommand("copy"),o.remove()}}catch(o){console.warn("[DocViewer] Clipboard writeText failed:",o),window.prompt(a("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),n),i=!0}if(i){if(t){const r=t.innerHTML;t.innerHTML=`${b("check",14)} <span style="font-size:11px;font-weight:700;">${a("تم النسخ","Copied")}</span>`,t.style.color="var(--mint-strong, #10b981)",t.style.transition="all 0.2s ease",setTimeout(()=>{t.innerHTML=r,t.style.color=""},2200)}const o=$e()||e&&(String(e.id).startsWith("doc_demo")||e.isDemo||String(e.driveFileId||"").startsWith("demo_"));G(a(o?"تم نسخ رابط المستند بنجاح":"تم نسخ رابط المخرج الهندسي في Google Drive بنجاح",o?"Document link copied successfully":"Google Drive deliverable link copied"))}}async function ue(e){if(!e)return;let t=(s.data?.documents||[]).find(i=>i.id===e);if(!t)try{const i=await he(`/api/documents/${e}`);i&&i.document&&(t=i.document)}catch{}if(!t){G(a("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}G(a(`جاري بدء تحميل "${t.originalName}"...`,`Starting download of "${t.originalName}"...`));const n=t.diskFilename||t.disk_filename||"";if(n&&n.includes("drive.google.com")){const i=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(i&&i[1]&&!i[1].startsWith("demo_")&&i[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"){const o=`https://drive.google.com/uc?export=download&id=${i[1]}`,r=(t.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),d=document.createElement("a");d.href=o,d.target="_blank",d.rel="noopener noreferrer",d.download=r,document.body.appendChild(d),d.click(),d.remove(),G(a(`تم بدء تنزيل "${t.originalName}" من Google Drive بنجاح.`,`Downloaded "${t.originalName}" from Google Drive.`));return}}try{let i=null;const o=$t(t);if(o&&!o.startsWith("http://drive.google.com")&&!o.startsWith("https://drive.google.com"))try{const r=await fetch(o);r.ok&&(i=await r.blob())}catch(r){console.warn("[DocViewer] Real asset fetch error:",r)}if(i){const r=URL.createObjectURL(i),d=(t.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),l=document.createElement("a");l.href=r,l.download=d,document.body.appendChild(l),l.click(),l.remove(),setTimeout(()=>URL.revokeObjectURL(r),3e4),G(a(`تم تنزيل المستند الأصلي "${t.originalName}" بنجاح`,`Downloaded "${t.originalName}" successfully`));return}window.open(`/api/documents/${encodeURIComponent(t.id)}?download=1`,"_blank"),G(a(`تم بدء تنزيل "${t.originalName}" بنجاح.`,`Downloaded "${t.originalName}" successfully.`))}catch(i){console.error("[DocViewer] Local download creation failed:",i),window.open(`/api/documents/${encodeURIComponent(t.id)}?download=1`,"_blank")}}function St(){const e=document.getElementById("preview-modal-overlay");if(!e)return;const t=e.querySelector("video");if(t)try{t.pause(),t.removeAttribute("src"),t.load()}catch{}e.querySelectorAll("canvas").forEach(n=>{try{n.width=0,n.height=0}catch{}}),e.querySelectorAll("iframe, object").forEach(n=>{try{n.src="about:blank",n.data="about:blank"}catch{}}),window.__docPreviewKeyHandler&&(window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=null),Array.isArray(window.__docPreviewCleanups)&&(window.__docPreviewCleanups.forEach(n=>{try{n()}catch{}}),window.__docPreviewCleanups=[]),document.body.style.overflow="",e.style.display="none",e.innerHTML=""}function za(){if(document.getElementById("darc-doc-viewer-responsive-styles"))return;const e=document.createElement("style");e.id="darc-doc-viewer-responsive-styles",e.textContent=`
    #preview-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(8, 14, 18, 0.92);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(0px, 1.5vw, 16px);
      box-sizing: border-box;
      animation: docModalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes docModalFadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    .doc-modal-container {
      background: var(--surface, #ffffff);
      width: 100%;
      max-width: 1280px;
      height: 94vh;
      border-radius: 16px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--line, #e2e8f0);
    }
    @media (max-width: 768px) {
      #preview-modal-overlay {
        padding: 0 !important;
      }
      .doc-modal-container {
        height: 100vh !important;
        height: 100dvh !important;
        max-width: 100vw !important;
        border-radius: 0 !important;
        border: none !important;
      }
      .doc-modal-header {
        padding: 10px 14px !important;
      }
      .doc-modal-header-actions .btn span.btn-label {
        display: none !important;
      }
      .doc-modal-header-actions .btn {
        padding: 6px 10px !important;
        min-height: 38px !important;
      }
    }
    /* Touch momentum scrolling */
    .touch-scroll {
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
    }
    /* Custom clean scrollbars */
    .doc-custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .doc-custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
    }
    .doc-custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(13, 98, 105, 0.35);
      border-radius: 3px;
    }
    .doc-custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(13, 98, 105, 0.6);
    }
  `,document.head.appendChild(e)}async function Ba(e){if(!e)return;za();let t=(s.data?.documents||[]).find(k=>k.id===e);if(!t)try{const k=await he(`/api/documents/${e}`);k&&(k.id||k.document?.id)&&(t=k.document||k,s.data&&!s.data.documents&&(s.data.documents=[]),s.data?.documents&&s.data.documents.push(t))}catch(k){console.warn("[DocViewer] Failed to fetch doc on demand:",k)}if(!t){G(a("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const n=(t.originalName||"").split(".").pop()?.toLowerCase()||"",i=ni(t.originalName,t.mimeType),o=ii(t.originalName)||"V1",r=ai(t),d=oi(r),l=t.size>1048576?(t.size/1048576).toFixed(1)+" MB":Math.round((t.size||0)/1024)+" KB",c=n==="pdf"||i.isPdf,p=["dwg","dxf"].includes(n)||i.isCad,u=["rvt","rfa","ifc","skp"].includes(n)||i.isBim,m=["xlsx","xls","csv"].includes(n)||i.isExcel,y=["docx","doc","rtf","odt"].includes(n)||i.isWord,w=["pptx","ppt","key"].includes(n)||i.isPpt,v=["zip","rar","7z","tar"].includes(n)||i.isZip,g=["jpg","jpeg","png","webp","svg","heic"].includes(n)||i.isImg,$=["mp4","webm","mov","m4v"].includes(n)||t.mimeType&&t.mimeType.startsWith("video/"),A=$e()||t&&(String(t.id).startsWith("doc_demo")||t.isDemo),D=kn(t),j=t.driveFileId||t.drive_file_id;let H=null;if(j&&!String(j).startsWith("demo_")&&String(j).length>=20&&j!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")H=`https://drive.google.com/file/d/${encodeURIComponent(j)}/preview`;else{const k=(t.diskFilename||t.disk_filename||t.viewLink||t.webViewLink||t.url||"").match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);k&&k[1]&&!k[1].startsWith("demo_")&&k[1].length>=20&&k[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"&&(H=`https://drive.google.com/file/d/${k[1]}/preview`)}let z=document.getElementById("preview-modal-overlay");z||(z=document.createElement("div"),z.id="preview-modal-overlay",document.body.appendChild(z)),z.innerHTML=`
    <div class="doc-modal-container">
      <!-- Universal Responsive Modal Header -->
      <div class="doc-modal-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;z-index:20;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1;">
          <span style="background:${i.bg};color:${i.color};border:1px solid ${i.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${i.ext}
          </span>
          <div style="min-width:0;flex:1;">
            <h3 style="margin:0;font-size:14px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:clamp(220px, 45vw, 550px);" title="${f(t.originalName)}">
              ${f(t.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);flex-wrap:wrap;">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${o}</span>
              <span>•</span>
              <span style="background:${d.bg};color:${d.color};border:1px solid ${d.border};padding:1px 6px;border-radius:4px;font-weight:800;">${a(d.labelAr,d.labelEn)}</span>
              <span>•</span>
              <span>${l}</span>
              <span>•</span>
              <span class="status-badge ${f(t.status||"approved")}" style="font-size:10px;padding:2px 7px;">${f(mn(t.status||"approved"))}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons (Responsive on Mobile) -->
        <div class="doc-modal-header-actions" style="display:flex;align-items:center;gap:8px;flex-shrink:0;flex-wrap:wrap;">
          <!-- Dual Engine Switcher -->
          <div class="doc-viewer-engine-switch" style="display:inline-flex;align-items:center;background:var(--surface-soft, #f1f5f9);border:1px solid var(--line, #e2e8f0);border-radius:8px;padding:2px;gap:2px;">
            <button type="button" class="btn btn-sm" id="btn-engine-native" style="padding:4px 9px;font-size:11px;font-weight:700;border-radius:6px;border:none;cursor:pointer;background:var(--brand-teal, #0d6269);color:#ffffff;transition:all 0.15s;" title="${a("عرض بالمستعرض المدمج فائق الدقة","View in Native High-Fidelity Viewer")}">
              ${a("المستعرض المدمج","Native")}
            </button>
            <button type="button" class="btn btn-sm" id="btn-engine-drive" style="padding:4px 9px;font-size:11px;font-weight:700;border-radius:6px;border:none;cursor:pointer;background:transparent;color:var(--ink-soft, #475569);transition:all 0.15s;" title="${a("عرض بتضمين Google Drive","View in Google Drive Viewer")}">
              Google Drive
            </button>
          </div>

          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);" title="${a(A?"نسخ رابط المستند":"نسخ رابط Google Drive",A?"Copy Document Link":"Copy Drive Link")}">
            ${b("link",14)} <span class="btn-label">${a("نسخ الرابط","Copy Link")}</span>
          </button>
          <a href="${f(D)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;" title="${a(A?"فتح المستند":"فتح في Google Drive",A?"Open Document":"Open in Drive")}">
            ${b("external",13)} <span class="btn-label">${A?a("فتح الملف","Open File"):"Google Drive"}</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" id="modal-download-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;background:var(--brand-teal, #0d6269);color:#ffffff;" title="${a("تحميل المخطط","Download")}">
            ${b("download",14)} <span class="btn-label">${a("تنزيل الملف","Download")}</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="close-doc-preview-btn" style="padding:6px;min-width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;" title="${a("إغلاق (Esc)","Close (Esc)")}">
            ${b("close",18)}
          </button>
        </div>
      </div>

      <!-- Main Viewer Viewport -->
      <div id="doc-viewer-viewport" class="touch-scroll" style="flex:1;position:relative;background:#0d1117;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <!-- Injected format viewer below -->
      </div>
    </div>
  `,z.style.display="flex",document.body.style.overflow="hidden",window.__docPreviewKeyHandler&&window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=k=>{k.key==="Escape"&&St()},window.addEventListener("keydown",window.__docPreviewKeyHandler),document.getElementById("modal-copy-link-btn")?.addEventListener("click",k=>{hi(t,k.currentTarget)}),document.getElementById("modal-download-btn")?.addEventListener("click",()=>{ue(t.id)}),document.getElementById("close-doc-preview-btn")?.addEventListener("click",St),z.onclick=k=>{k.target===z&&St()};const q=document.getElementById("doc-viewer-viewport");if(!q)return;function M(){const k=q.querySelector("video");if(k)try{k.pause(),k.removeAttribute("src"),k.load()}catch{}Array.isArray(window.__docPreviewCleanups)&&(window.__docPreviewCleanups.forEach(T=>{try{T()}catch{}}),window.__docPreviewCleanups=[])}function x(k){const T=document.getElementById("btn-engine-native"),L=document.getElementById("btn-engine-drive");T&&L&&(k==="native"?(T.style.background="var(--brand-teal, #0d6269)",T.style.color="#ffffff",L.style.background="transparent",L.style.color="var(--ink-soft, #475569)"):(L.style.background="var(--brand-teal, #0d6269)",L.style.color="#ffffff",T.style.background="transparent",T.style.color="var(--ink-soft, #475569)")),M(),q.innerHTML="",k==="drive"?_():E()}function _(){H?q.innerHTML=`
        <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e293b;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#94a3b8;font-size:12px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;"></span>
              <span style="font-weight:700;color:#f8fafc;">${a("مستعرض Google Drive السحابي الرسمي","Official Google Drive Cloud Viewer")}</span>
            </div>
            <a href="${f(D)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="color:#38bdf8;background:transparent;border:none;cursor:pointer;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
              ${b("external",12)} ${a("فتح في علامة تبويب جديدة","Open in New Tab")}
            </a>
          </div>
          <iframe 
            src="${f(H)}" 
            style="flex:1;width:100%;height:100%;border:none;background:#ffffff;" 
            allow="autoplay; encrypted-media; fullscreen"
            title="Google Drive Preview"
          ></iframe>
        </div>
      `:(q.innerHTML=`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:30px;box-sizing:border-box;">
          <div style="background:rgba(15,23,42,0.85);border:1px solid #334155;border-radius:14px;padding:32px 24px;max-width:480px;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
            <div style="color:var(--teal, #0d6269);margin-bottom:14px;display:flex;justify-content:center;">${b("external",36)}</div>
            <h4 style="margin:0 0 8px;font-size:16px;font-weight:800;color:#f8fafc;">${a("معاينة Google Drive السحابية","Google Drive Cloud Preview")}</h4>
            <p style="margin:0 0 18px;font-size:13px;color:#94a3b8;line-height:1.6;">
              ${a("هذا الملف مخزن في بيئة العمل المحلية أو كعينة هندسية، ولا يتوفر له رابط تضمين مباشر من Drive. نوصي باستخدام المستعرض المدمج فائق الدقة.","This file is hosted locally or as a demo showcase asset and does not have an active Google Drive embed link. We recommend using the high-fidelity native viewer.")}
            </p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary btn-sm" id="btn-revert-native" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
                ${b("eye",13)} <span>${a("العودة للمستعرض المدمج","Back to Native Viewer")}</span>
              </button>
              <a href="${f(D)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
                ${b("external",13)} <span>${a("مجلد Google Drive","Google Drive Folder")}</span>
              </a>
            </div>
          </div>
        </div>
      `,document.getElementById("btn-revert-native")?.addEventListener("click",()=>x("native")))}function E(){if(c){const k=$t(t);q.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e242c;">
        <!-- Inspection Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:900;color:#dc2626;background:rgba(220,38,38,0.15);padding:3px 8px;border-radius:4px;">PDF</span>
            <span style="font-weight:700;color:#38bdf8;">${a("المخطط المعماري المعتمد للتنفيذ","Architectural Blueprint")}</span>
            <span style="color:#64748b;display:none;sm:inline;">•</span>
            <span style="color:#2dd4bf;font-size:11px;">● ${a("معتمد برقم ترخيص 2026/DARC-104","Stamp 2026/DARC-104")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="pdf-open-newtab" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ↗ ${a("نافذة كاملة مستقلة","Full Window")}
            </button>
            <button type="button" class="btn btn-sm" id="pdf-download-btn" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${b("download",12)} ${a("تنزيل PDF","Download PDF")}
            </button>
          </div>
        </div>

        <!-- Native PDF Object + Mobile Fallback Container -->
        <div id="pdf-frame-container" style="flex:1;width:100%;height:100%;background:#525659;position:relative;overflow:hidden;">
          <object 
            id="pdf-native-object"
            data="${f(k)}#toolbar=1&navpanes=1&scrollbar=1" 
            type="application/pdf"
            style="width:100%;height:100%;border:none;display:block;"
          >
            <iframe 
              id="pdf-native-frame"
              src="${f(k)}#toolbar=1&navpanes=1&scrollbar=1" 
              type="application/pdf"
              style="width:100%;height:100%;border:none;display:block;"
              title="${f(t.originalName)}"
              allow="fullscreen"
            >
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:24px;">
                <p style="margin-bottom:12px;font-size:14px;color:#cbd5e1;">${a("متصفحك يحتاج لفتح مستند PDF في نافذة جديدة أو تنزيله مباشرة.","Your browser requires opening this PDF in a new window or downloading it.")}</p>
                <a href="${f(k)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:8px 18px;font-weight:700;">
                  ↗ ${a("فتح مستند PDF الأصلي","Open PDF in New Window")}
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    `,document.getElementById("pdf-open-newtab")?.addEventListener("click",()=>{window.open(k,"_blank")}),document.getElementById("pdf-download-btn")?.addEventListener("click",()=>{ue(t.id)});return}if(g){let B=function(){ae&&(ae.style.transform=`translate(${h}px, ${I}px) scale(${T}) rotate(${L}deg)`),se&&(se.textContent=`${Math.round(T*100)}%`)};const k=$t(t);q.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0a0e14;user-select:none;">
        <!-- Inspection Toolbar -->
        <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);padding:6px 14px;border-radius:30px;display:flex;align-items:center;gap:10px;z-index:20;box-shadow:0 10px 25px rgba(0,0,0,0.5);color:#fff;font-size:12px;">
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-in" style="color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;" title="${a("تكبير","Zoom In")}">${b("plus",14)}</button>
          <span id="img-zoom-level" style="font-weight:700;min-width:44px;text-align:center;">100%</span>
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-out" style="color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;" title="${a("تصغير","Zoom Out")}">${b("minus",14)}</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-rotate-btn" style="color:#38bdf8;padding:4px 8px;font-weight:700;" title="${a("تدوير 90 درجة","Rotate 90")}">↻ 90°</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-reset-btn" style="color:#fff;padding:4px 8px;font-weight:700;" title="${a("إعادة ضبط","Reset")}">⤢ 100%</button>
        </div>

        <!-- High-Res Image Viewport Canvas -->
        <div id="img-pan-viewport" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:grab;position:relative;touch-action:none;">
          <img 
            id="active-preview-img" 
            src="${k}" 
            alt="${f(t.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;pointer-events:none;" 
          />
        </div>
      </div>
    `;let T=1,L=0,h=0,I=0,N=!1,Q=0,K=0;const ae=document.getElementById("active-preview-img"),se=document.getElementById("img-zoom-level"),J=document.getElementById("img-pan-viewport");if(document.getElementById("img-zoom-in")?.addEventListener("click",()=>{T=Math.min(5,T+.25),B()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{T=Math.max(.4,T-.25),B()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{L=(L+90)%360,B()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{T=1,L=0,h=0,I=0,B()}),J){J.addEventListener("wheel",pe=>{pe.preventDefault();const Xe=pe.deltaY<0?.15:-.15;T=Math.max(.4,Math.min(5,T+Xe)),B()},{passive:!1}),J.addEventListener("pointerdown",pe=>{N=!0;try{J.setPointerCapture(pe.pointerId)}catch{}Q=pe.clientX-h,K=pe.clientY-I,J.style.cursor="grabbing"}),J.addEventListener("pointermove",pe=>{N&&(h=pe.clientX-Q,I=pe.clientY-K,B())});const ce=()=>{N=!1,J.style.cursor="grab"};J.addEventListener("pointerup",ce),J.addEventListener("pointercancel",ce),J.addEventListener("dblclick",()=>{T=T===1?2:1,h=0,I=0,B()})}return}if($){const k=$t(t);q.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#06090e;">
        <!-- Video Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:900;color:#8b5cf6;background:rgba(139,92,246,0.15);padding:3px 8px;border-radius:4px;">MP4 / 4K</span>
            <span style="font-weight:700;color:#e2e8f0;">${a("جولة الموقع ونسبة الإنجاز (Site Progress)","Walkthrough Video")}</span>
            <span style="color:#64748b;">•</span>
            <span style="color:#94a3b8;">${l}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <select id="video-playback-rate" style="background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">
              <option value="0.75">0.75x</option>
              <option value="1" selected>1.0x ${a("عادي","Normal")}</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
            <button type="button" class="btn btn-sm" id="video-pip-btn" style="background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
              ${b("eye",13)} <span>PiP</span>
            </button>
            <button type="button" class="btn btn-sm btn-primary" id="video-download-btn" style="padding:4px 12px;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
              ${b("download",13)} <span>${a("تنزيل الفيديو","Download Video")}</span>
            </button>
          </div>
        </div>

        <!-- Video Player Viewport -->
        <div style="flex:1;position:relative;display:flex;align-items:center;justify-content:center;background:#000;overflow:hidden;">
          <video 
            id="darc-main-video-player" 
            controls 
            autoplay 
            playsinline 
            webkit-playsinline
            preload="metadata"
            style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;outline:none;"
            src="${f(k)}"
          >
            <source src="${f(k)}" type="video/mp4" />
          </video>
        </div>

        <!-- Keyframe Jump Chips -->
        <div style="padding:8px 16px;background:rgba(15,23,42,0.95);border-top:1px solid #1e293b;display:flex;align-items:center;gap:8px;overflow-x:auto;" class="touch-scroll">
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;font-weight:700;display:inline-flex;align-items:center;gap:4px;">${b("pin",12)} <span>${a("محطات الجولة:","Keyframes:")}</span></span>
          <button type="button" class="video-jump-btn" data-sec="0" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:00 ${a("المدخل والمجلس","Majlis & Entry")}
          </button>
          <button type="button" class="video-jump-btn" data-sec="4" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:04 ${a("الصالة الرئيسية والبهو","Main Hall")}
          </button>
          <button type="button" class="video-jump-btn" data-sec="8" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:08 ${a("المسبح والحديقة الخلفية","Courtyard & Pool")}
          </button>
        </div>
      </div>
    `;const T=document.getElementById("darc-main-video-player");T&&(document.querySelectorAll(".video-jump-btn").forEach(L=>{L.addEventListener("click",()=>{const h=parseFloat(L.dataset.sec||"0");T.currentTime=h,T.play().catch(()=>{})})}),document.getElementById("video-playback-rate")?.addEventListener("change",L=>{T.playbackRate=parseFloat(L.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():T.requestPictureInPicture&&await T.requestPictureInPicture()}catch{}})),document.getElementById("video-download-btn")?.addEventListener("click",()=>ue(t.id));return}if(p||u){q.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0c1015;user-select:none;">
        <!-- CAD Inspection Top Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#0284c7;background:rgba(2,132,199,0.15);padding:3px 8px;border-radius:4px;display:inline-flex;align-items:center;gap:4px;">
              ${b("compass",13)} <span>CAD 2D</span>
            </span>
            <span style="font-weight:700;color:#f8fafc;">${f(t.originalName)}</span>
            <span style="color:#64748b;">•</span>
            <span id="cad-coords" style="font-family:monospace;color:#38bdf8;font-size:11px;">X: 0.00m | Y: 0.00m</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="cad-zoom-in" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;">${b("plus",14)}</button>
            <button type="button" class="btn btn-sm" id="cad-zoom-out" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;">${b("minus",14)}</button>
            <button type="button" class="btn btn-sm" id="cad-reset" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;">⤢ 100%</button>
            <button type="button" class="btn btn-sm" id="cad-download-btn" style="background:#0284c7;border:none;color:#fff;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
              ${b("download",13)} <span>${a("تنزيل DWG / DXF","Download CAD")}</span>
            </button>
          </div>
        </div>

        <!-- Layer Toggles Bar -->
        <div style="padding:6px 16px;background:rgba(12,16,21,0.9);border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:12px;font-size:11px;color:#94a3b8;overflow-x:auto;" class="touch-scroll">
          <span style="font-weight:700;color:#cbd5e1;">${a("الطبقات:","Layers:")}</span>
          <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#38bdf8;">
            <input type="checkbox" id="layer-axes" checked style="cursor:pointer;" /> ${a("المحاور (Axes)","Axes")}
          </label>
          <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#4ade80;">
            <input type="checkbox" id="layer-columns" checked style="cursor:pointer;" /> ${a("الأعمدة (Columns)","Columns")}
          </label>
          <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#facc15;">
            <input type="checkbox" id="layer-walls" checked style="cursor:pointer;" /> ${a("الجدران والكمرات (Walls)","Walls")}
          </label>
          <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#f472b6;">
            <input type="checkbox" id="layer-dims" checked style="cursor:pointer;" /> ${a("الأبعاد (Dimensions)","Dimensions")}
          </label>
        </div>

        <!-- Interactive 2D Vector CAD Canvas -->
        <div id="cad-canvas-box" style="flex:1;width:100%;height:100%;position:relative;overflow:hidden;cursor:crosshair;touch-action:none;">
          <canvas id="cad-canvas" style="display:block;width:100%;height:100%;"></canvas>
        </div>
      </div>
    `;const k=document.getElementById("cad-canvas"),T=document.getElementById("cad-canvas-box"),L=document.getElementById("cad-coords");if(k&&T){let Xe=function(){const W=Math.min(window.devicePixelRatio||1,2);k.width=T.clientWidth*W,k.height=T.clientHeight*W,ze()},ze=function(){if(!h)return;const W=Math.min(window.devicePixelRatio||1,2),fe=k.width/W,dt=k.height/W;h.save(),h.scale(W,W),h.clearRect(0,0,fe,dt),h.fillStyle="#0b1016",h.fillRect(0,0,fe,dt),h.translate(fe/2+N,dt/2+Q),h.scale(I,I),h.lineWidth=1/I,h.strokeStyle="rgba(255, 255, 255, 0.04)";for(let C=-400;C<=400;C+=20)h.beginPath(),h.moveTo(C,-300),h.lineTo(C,300),h.stroke();for(let C=-300;C<=300;C+=20)h.beginPath(),h.moveTo(-400,C),h.lineTo(400,C),h.stroke();h.strokeStyle="rgba(2, 132, 199, 0.12)";for(let C=-400;C<=400;C+=100)h.beginPath(),h.moveTo(C,-300),h.lineTo(C,300),h.stroke();for(let C=-300;C<=300;C+=100)h.beginPath(),h.moveTo(-400,C),h.lineTo(400,C),h.stroke();const Be=[{label:"1",x:-240},{label:"2",x:-120},{label:"3",x:0},{label:"4",x:120},{label:"5",x:240}],jn=[{label:"A",y:-160},{label:"B",y:-60},{label:"C",y:60},{label:"D",y:160}];if(J?.checked&&(h.strokeStyle="rgba(56, 189, 248, 0.55)",h.setLineDash([8/I,4/I,2/I,4/I]),h.lineWidth=1.2/I,Be.forEach(C=>{h.beginPath(),h.moveTo(C.x,-210),h.lineTo(C.x,210),h.stroke(),h.setLineDash([]),h.fillStyle="#0284c7",h.beginPath(),h.arc(C.x,-225,12,0,Math.PI*2),h.arc(C.x,225,12,0,Math.PI*2),h.fill(),h.fillStyle="#ffffff",h.font="bold 11px sans-serif",h.textAlign="center",h.textBaseline="middle",h.fillText(C.label,C.x,-225),h.fillText(C.label,C.x,225),h.setLineDash([8/I,4/I,2/I,4/I])}),jn.forEach(C=>{h.beginPath(),h.moveTo(-290,C.y),h.lineTo(290,C.y),h.stroke(),h.setLineDash([]),h.fillStyle="#0284c7",h.beginPath(),h.arc(-305,C.y,12,0,Math.PI*2),h.arc(305,C.y,12,0,Math.PI*2),h.fill(),h.fillStyle="#ffffff",h.font="bold 11px sans-serif",h.textAlign="center",h.textBaseline="middle",h.fillText(C.label,-305,C.y),h.fillText(C.label,305,C.y),h.setLineDash([8/I,4/I,2/I,4/I])}),h.setLineDash([])),ce?.checked&&(h.strokeStyle="#facc15",h.lineWidth=2.5/I,h.strokeRect(-240,-160,480,320),h.strokeRect(-120,-160,240,100),h.strokeRect(-240,60,240,100),h.strokeStyle="#38bdf8",h.strokeRect(120,60,140,100)),B?.checked&&(h.fillStyle="#4ade80",h.strokeStyle="#ffffff",h.lineWidth=1/I,Be.forEach(C=>{jn.forEach(Fe=>{h.fillRect(C.x-9,Fe.y-9,18,18),h.strokeRect(C.x-9,Fe.y-9,18,18),h.beginPath(),h.moveTo(C.x-9,Fe.y-9),h.lineTo(C.x+9,Fe.y+9),h.stroke()})})),pe?.checked){h.strokeStyle="#f472b6",h.fillStyle="#f472b6",h.lineWidth=1.2/I,h.font="bold 10px monospace",h.textAlign="center";for(let C=0;C<Be.length-1;C++){const Fe=Be[C].x,On=Be[C+1].x,Yi=(Fe+On)/2;h.beginPath(),h.moveTo(Fe,-190),h.lineTo(On,-190),h.stroke(),h.fillText("6.00m",Yi,-196)}}h.restore()};const h=k.getContext("2d");let I=1,N=0,Q=0,K=!1,ae=0,se=0;const J=document.getElementById("layer-axes"),B=document.getElementById("layer-columns"),ce=document.getElementById("layer-walls"),pe=document.getElementById("layer-dims");window.addEventListener("resize",Xe),window.__docPreviewCleanups=window.__docPreviewCleanups||[],window.__docPreviewCleanups.push(()=>window.removeEventListener("resize",Xe)),setTimeout(Xe,50),[J,B,ce,pe].forEach(W=>{W?.addEventListener("change",ze)}),document.getElementById("cad-zoom-in")?.addEventListener("click",()=>{I=Math.min(4,I*1.25),ze()}),document.getElementById("cad-zoom-out")?.addEventListener("click",()=>{I=Math.max(.3,I*.8),ze()}),document.getElementById("cad-reset")?.addEventListener("click",()=>{I=1,N=0,Q=0,ze()}),T.addEventListener("wheel",W=>{W.preventDefault();const fe=W.deltaY<0?1.15:.87;I=Math.max(.3,Math.min(4,I*fe)),ze()},{passive:!1}),T.addEventListener("pointerdown",W=>{K=!0;try{T.setPointerCapture(W.pointerId)}catch{}ae=W.clientX-N,se=W.clientY-Q,T.style.cursor="grabbing"}),T.addEventListener("pointermove",W=>{const fe=T.getBoundingClientRect(),dt=((W.clientX-fe.left-fe.width/2-N)/I/20).toFixed(2),Be=((W.clientY-fe.top-fe.height/2-Q)/I/20).toFixed(2);L&&(L.textContent=`X: ${dt}m | Y: ${Be}m`),K&&(N=W.clientX-ae,Q=W.clientY-se,ze())});const Rn=()=>{K=!1,T.style.cursor="crosshair"};T.addEventListener("pointerup",Rn),T.addEventListener("pointercancel",Rn)}document.getElementById("cad-download-btn")?.addEventListener("click",()=>ue(t.id));return}if(m){let h=function(){const I=k[T],N=L.toLowerCase().trim(),Q=I.rows.filter(B=>N?B.code.toLowerCase().includes(N)||B.desc.toLowerCase().includes(N)||B.unit.toLowerCase().includes(N):!0),K=Q.reduce((B,ce)=>B+ce.total,0),ae=document.getElementById("excel-interactive-table-body"),se=document.getElementById("excel-sheet-subtotal"),J=document.getElementById("excel-filtered-count");J&&(J.textContent=`${Q.length} ${a("بند","items")}`),se&&(se.textContent=`${K.toLocaleString()} ${a("ر.س","SAR")}`),ae&&(ae.innerHTML=Q.map(B=>`
          <tr style="border-bottom:1px solid var(--line, #e2e8f0);transition:background 0.15s ease;">
            <td style="padding:10px 14px;font-weight:800;font-family:monospace;color:var(--brand-teal, #0d6269);white-space:nowrap;">${f(B.code)}</td>
            <td style="padding:10px 14px;color:var(--ink, #0f172a);font-weight:600;min-width:240px;line-height:1.5;">${f(B.desc)}</td>
            <td style="padding:10px 14px;text-align:center;color:var(--ink-soft, #475569);font-weight:700;">${f(B.unit)}</td>
            <td style="padding:10px 14px;text-align:center;font-weight:800;font-variant-numeric:tabular-nums;">${B.qty.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:700;font-variant-numeric:tabular-nums;">${B.rate.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:900;color:#107c41;font-variant-numeric:tabular-nums;">${B.total.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:center;">
              <span class="status-badge approved" style="font-size:10px;padding:2px 8px;font-weight:800;display:inline-flex;align-items:center;gap:4px;">${b("check",11)} ${a("معتمد","Approved")}</span>
            </td>
          </tr>
        `).join(""))};const k=[{id:"structural",title:a("أعمال الهيكل الإنشائي والعظم","Structural & Concrete Works"),rows:[{code:"01.01",desc:a("حفر وتجهيز الموقع وترحيل المخلفات لعمق التأسيس","Excavation & site prep to foundation depth"),unit:"م3",qty:1200,rate:45,total:54e3,status:"approved"},{code:"01.02",desc:a("خرسانة عادية للنظافة C20 سمك 10سم أسفل القواعد","Plain blinding concrete C20 (100mm) under footings"),unit:"م3",qty:180,rate:280,total:50400,status:"approved"},{code:"01.03",desc:a("خرسانة مسلحة للقواعد والرقاب C35 مقاوم للأملاح والكلوريدات","Reinforced concrete C35 SRC for footings and column necks"),unit:"م3",qty:420,rate:390,total:163800,status:"approved"},{code:"01.04",desc:a("حديد تسليح عالي المقاومة مشوه Grade 60 (ASTM A615)","Deformed high-strength rebar Grade 60 (ASTM A615)"),unit:"طن",qty:48,rate:3250,total:156e3,status:"approved"},{code:"01.05",desc:a("خرسانة مسلحة للأعمدة والجدران الاستنادية C40","Reinforced concrete C40 for columns and retaining walls"),unit:"م3",qty:260,rate:420,total:109200,status:"approved"},{code:"01.06",desc:a("عوازل مائية للقواعد ورقاب الأعمدة دهان بيتوميني وممبرين 4مم","Waterproofing bituminous primer + 4mm modified bitumen membrane"),unit:"م2",qty:850,rate:65,total:55250,status:"approved"},{code:"01.07",desc:a("أسقف خرسانية هوردي ولاكمرية Flat Slab مع كمرات ساقطة","Hollow-block and flat slab concrete with drop beams"),unit:"م3",qty:520,rate:410,total:213200,status:"approved"}]},{id:"finishes",title:a("التشطيبات المعمارية الفاخرة","Architectural Finishes"),rows:[{code:"02.01",desc:a("تكسيات حجر ترافنتينو إيطالي نخب أول للواجهات الخارجية","Italian Travertine stone cladding for exterior facades"),unit:"م2",qty:640,rate:480,total:307200,status:"approved"},{code:"02.02",desc:a("واجهات زجاجية مزدوجة معزولة حرارياً كيرتن وول قطاع Schüco","Double-glazed thermally broken curtain walls (Schüco profile)"),unit:"م2",qty:220,rate:1150,total:253e3,status:"approved"},{code:"02.03",desc:a("أرضيات رخام ستاتوريو إيطالي للمجالس والصالات الرئيسية","Statuario Italian marble flooring for main majlis & halls"),unit:"م2",qty:380,rate:620,total:235600,status:"approved"},{code:"02.04",desc:a("أسقف معلقة جبسية مقاومة للرطوبة مع مسارات إنارة مغناطيسية","Moisture-resistant gypsum ceilings with magnetic track lighting"),unit:"م2",qty:580,rate:195,total:113100,status:"approved"},{code:"02.05",desc:a("أبواب خشب جوز طبيعي بارتفاع 3.20م مع أقفال ذكية وكوالين خفية","Natural walnut flush doors (3.2m height) with concealed hinges"),unit:"عدد",qty:18,rate:4800,total:86400,status:"approved"},{code:"02.06",desc:a("دهانات داخلية ميكرو سمنت ديكوري فاخر للممرات والصالات","Luxury decorative microcement internal wall finishes"),unit:"م2",qty:1200,rate:85,total:102e3,status:"approved"}]},{id:"mep",title:a("الأنظمة الكهروميكانيكية والتكييف","MEP & HVAC Systems"),rows:[{code:"03.01",desc:a("نظام تكييف مركزي مخفي VRF إنفرتر مع تحكم ذكي غرفي","Inverter VRF central concealed AC system with smart zone thermostats"),unit:"نظام",qty:1,rate:28e4,total:28e4,status:"approved"},{code:"03.02",desc:a("شبكة التغذية والصرف الصحي أنابيب بولي بروبلين ألماني عازل للصوت","Acoustic PPR plumbing & drainage networks with booster pumps"),unit:"مقطوعية",qty:1,rate:95e3,total:95e3,status:"approved"},{code:"03.03",desc:a("نظام سمارت هوم للتحكم بالإنارة والتكييف والستائر بروتوكول KNX","KNX Smart Home automation for lighting, climate and shading"),unit:"نظام",qty:1,rate:145e3,total:145e3,status:"approved"},{code:"03.04",desc:a("لوحات التوزيع الكهربائية والقواطع الذكية شنايدر إلكتريك","Schneider Electric main electrical distribution boards & RCBOs"),unit:"لوحة",qty:6,rate:14e3,total:84e3,status:"approved"},{code:"03.05",desc:a("أنظمة إنذار ومكافحة الحريق وكواشف الدخان المتطورة","Advanced addressable fire alarm, smoke detectors & clean agent extinguishers"),unit:"نظام",qty:1,rate:48e3,total:48e3,status:"approved"}]}];let T=0,L="";q.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);overflow:hidden;">
        <!-- Excel Green Header -->
        <div style="background:#107c41;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(16,124,65,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#107c41;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">X</div>
            <div>
              <div style="font-weight:800;font-size:14px;letter-spacing:-0.2px;">${f(t.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Excel Spreadsheet • ${a("جداول حساب الكميات والمقايسة المعتمدة","Approved Bill of Quantities")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="excel-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${b("printer",13)} ${a("طباعة المقايسة","Print BOQ")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-direct-download" style="background:#ffffff;color:#107c41;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${b("download",13)} ${a("تنزيل ملف XLSX الأصلي","Download XLSX")}
            </button>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:var(--surface-soft, #f8fafc);border-bottom:1px solid var(--line, #e2e8f0);flex-wrap:wrap;gap:10px;">
          <!-- Sheet Tabs -->
          <div style="display:flex;align-items:center;gap:6px;overflow-x:auto;" class="touch-scroll">
            ${k.map((I,N)=>`
              <button type="button" class="excel-sheet-tab-btn" data-sheet-idx="${N}" style="padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid ${N===0?"#107c41":"var(--line, #e2e8f0)"};background:${N===0?"#107c41":"var(--surface, #ffffff)"};color:${N===0?"#ffffff":"var(--ink, #0f172a)"};white-space:nowrap;transition:all 0.15s ease;">
                ${f(I.title)}
              </button>
            `).join("")}
          </div>

          <!-- Live Search Input -->
          <div style="position:relative;min-width:240px;flex:1;max-width:360px;">
            <input 
              type="search" 
              id="excel-live-search" 
              placeholder="${a("بحث في بنود جدول الكميات...","Search BOQ items...")}" 
              style="width:100%;padding:7px 12px;font-size:12px;border:1px solid var(--line, #e2e8f0);border-radius:8px;background:var(--surface, #ffffff);color:var(--ink, #0f172a);outline:none;box-sizing:border-box;"
            />
          </div>
        </div>

        <!-- Spreadsheet Grid Container -->
        <div style="flex:1;overflow:auto;position:relative;" class="touch-scroll doc-custom-scrollbar">
          <table style="width:100%;border-collapse:collapse;font-size:12px;text-align:start;">
            <thead style="position:sticky;top:0;background:var(--surface-soft, #f1f5f9);z-index:5;border-bottom:2px solid var(--line, #cbd5e1);color:var(--ink, #0f172a);font-weight:800;">
              <tr>
                <th style="padding:10px 14px;text-align:start;white-space:nowrap;">${a("رقم البند","Item #")}</th>
                <th style="padding:10px 14px;text-align:start;">${a("التوصيف والمواصفات الهندسية","Description & Engineering Specs")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${a("الوحدة","Unit")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${a("الكمية","Qty")}</th>
                <th style="padding:10px 14px;text-align:end;white-space:nowrap;">${a("السعر الفردي (ر.س)","Rate (SAR)")}</th>
                <th style="padding:10px 14px;text-align:end;white-space:nowrap;">${a("الإجمالي (ر.س)","Total (SAR)")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${a("الحالة","Status")}</th>
              </tr>
            </thead>
            <tbody id="excel-interactive-table-body">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>

        <!-- Spreadsheet Footer Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:var(--surface-soft, #f8fafc);border-top:1px solid var(--line, #e2e8f0);flex-wrap:wrap;gap:10px;font-size:12px;">
          <div style="display:flex;align-items:center;gap:10px;color:var(--ink-soft, #475569);font-weight:700;">
            <span id="excel-filtered-count">0 بند</span>
            <span>•</span>
            <span>${a("العملة: ريال سعودي (SAR)","Currency: Saudi Riyal (SAR)")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-weight:700;color:var(--ink-soft, #475569);">${a("إجمالي القسم المحدد:","Subtotal:")}</span>
            <span id="excel-sheet-subtotal" style="font-size:15px;font-weight:900;color:#107c41;font-family:monospace;">0 ر.س</span>
          </div>
        </div>
      </div>
    `,h(),document.querySelectorAll(".excel-sheet-tab-btn").forEach(I=>{I.addEventListener("click",()=>{T=parseInt(I.dataset.sheetIdx,10)||0,document.querySelectorAll(".excel-sheet-tab-btn").forEach((N,Q)=>{Q===T?(N.style.background="#107c41",N.style.borderColor="#107c41",N.style.color="#ffffff"):(N.style.background="var(--surface, #ffffff)",N.style.borderColor="var(--line, #e2e8f0)",N.style.color="var(--ink, #0f172a)")}),h()})}),document.getElementById("excel-live-search")?.addEventListener("input",I=>{L=I.target.value||"",h()}),document.getElementById("excel-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("excel-direct-download")?.addEventListener("click",()=>ue(t.id));return}if(y){q.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#1e242c;overflow:hidden;">
        <!-- Word Header -->
        <div style="background:#2b579a;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(43,87,154,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#2b579a;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">W</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${f(t.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Word Document • ${a("دفاتر الشروط والمواصفات الفنية المعتمدة","Approved Technical Specifications Document")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="word-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${b("printer",13)} ${a("طباعة الوثيقة","Print Specs")}
            </button>
            <button type="button" class="btn btn-sm" id="word-download-btn" style="background:#ffffff;color:#2b579a;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${b("download",13)} ${a("تنزيل DOCX الأصلي","Download DOCX")}
            </button>
          </div>
        </div>

        <!-- Section Navigation Chips -->
        <div style="padding:8px 18px;background:rgba(15,23,42,0.9);border-bottom:1px solid #334155;display:flex;align-items:center;gap:8px;overflow-x:auto;" class="touch-scroll">
          <span style="font-size:11px;color:#94a3b8;font-weight:700;white-space:nowrap;">${a("فهرس البنود:","Index:")}</span>
          <a href="#spec-sec-1" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">1. ${a("الاشتراطات العامة","General")}</a>
          <a href="#spec-sec-2" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">2. ${a("الخرسانة والحديد","Structural")}</a>
          <a href="#spec-sec-3" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">3. ${a("العوازل والواجهات","Insulation & Facades")}</a>
          <a href="#spec-sec-4" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">4. ${a("كود البناء SBC","SBC Codes")}</a>
        </div>

        <!-- Executive Document Body (A4 styled layout) -->
        <div style="flex:1;overflow-y:auto;padding:24px 16px;display:flex;justify-content:center;background:#0d1117;" class="touch-scroll doc-custom-scrollbar">
          <div style="width:100%;max-width:880px;background:#ffffff;color:#0f172a;border-radius:12px;box-shadow:0 15px 40px rgba(0,0,0,0.5);padding:clamp(20px, 4vw, 48px);box-sizing:border-box;font-family:system-ui, -apple-system, sans-serif;line-height:1.7;">
            
            <!-- Document Formal Letterhead -->
            <div style="border-bottom:2px solid #2b579a;padding-bottom:18px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
              <div>
                <h1 style="margin:0 0 6px;font-size:22px;color:#2b579a;font-weight:900;">DARC DESIGN TEAM</h1>
                <p style="margin:0;font-size:13px;color:#64748b;font-weight:700;">${a("قسم إدارة الجودة والمواصفات الهندسية التنفيذية","Engineering Quality & Technical Specifications Division")}</p>
              </div>
              <div style="text-align:end;font-size:11px;color:#64748b;">
                <div><strong>${a("رقم الوثيقة:","Doc Code:")}</strong> SPEC-2026-VILLA-01-REV03</div>
                <div><strong>${a("تاريخ الاعتماد:","Date:")}</strong> 2026-11-01</div>
                <div><span class="status-badge approved" style="font-size:10px;display:inline-flex;align-items:center;gap:4px;margin-top:4px;">${b("check",11)} معتمد للتنفيذ (Approved for Construction)</span></div>
              </div>
            </div>

            <!-- Title -->
            <div style="background:#f1f5f9;border-right:4px solid #2b579a;padding:14px 18px;margin-bottom:30px;border-radius:4px;">
              <h2 style="margin:0 0 4px;font-size:17px;font-weight:900;color:#0f172a;">${a("دفتر المواصفات الفنية العامة والخاصة لمشروع فيلا النخيل السكنية","General & Particular Technical Specifications for Palm Villa Project")}</h2>
              <p style="margin:0;font-size:12px;color:#475569;">${a("مطابقة للمخططات المعمارية والإنشائية المعتمدة وكود البناء السعودي (SBC)","Compliant with Approved Drawings and the Saudi Building Code (SBC)")}</p>
            </div>

            <!-- Section 1 -->
            <section id="spec-sec-1" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">1. ${a("الاشتراطات العامة وضبط الجودة بالموقع","1. General Requirements & Site Quality Control")}</h3>
              <p style="font-size:13px;color:#334155;margin:0 0 10px;">
                ${a("يلتزم المقاول المنفذ بالتقيد التام بجميع المخططات المعتمدة الصادرة عن استشاري المشروع (DARC Design Team). لا يُسمح بإجراء أي تعديل أو استبدال في المواد أو الأبعاد دون الحصول على اعتماد خطي مسبق (RFI / Material Approval Request).","The contractor shall strictly adhere to all approved drawings issued by the consultant (DARC Design Team). No modifications or substitutions shall be executed without prior written approval.")}
              </p>
              <ul style="font-size:13px;color:#334155;padding-right:20px;margin:0;">
                <li>${a("تقديم عينات المواد والتشطيبات للاستشاري قبل التوريد بمدة لا تقل عن 15 يوماً.","Submit material samples at least 15 days prior to site delivery.")}</li>
                <li>${a("توثيق جميع مراحل الصب والتأسيس بتقرير مصور واختبارات مختبر معتمد.","Document all concrete pours with certified third-party lab testing.")}</li>
              </ul>
            </section>

            <!-- Section 2 -->
            <section id="spec-sec-2" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">2. ${a("مواصفات الأعمال الخرسانية وحديد التسليح","2. Concrete & Structural Steel Specifications")}</h3>
              <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:14px;border:1px solid #cbd5e1;">
                <thead>
                  <tr style="background:#f8fafc;color:#0f172a;">
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:start;">${a("العنصر الإنشائي","Structural Element")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${a("رتبة الخرسانة (f’c)","Concrete Grade")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${a("نوع الإسمنت","Cement Type")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${a("هبوط الخرسانة (Slump)","Slump Test")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;font-weight:700;">${a("القواعد والرقاب والميد","Footings & Grade Beams")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;font-weight:800;color:#2b579a;">C35 (35 MPa)</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${a("مقاوم للأملاح Type V","Sulfate Resistant")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">120 ± 25 mm</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;font-weight:700;">${a("الأعمدة والأسقف والكمرات","Columns & Slabs")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;font-weight:800;color:#2b579a;">C40 (40 MPa)</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${a("بورتلاندي عادي Type I","Ordinary Portland")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">140 ± 25 mm</td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:12px;color:#475569;margin:0;">
                ${a("حديد التسليح: مطابق للمواصفة ASTM A615 Grade 60 بحد خضوع لا يقل عن 420 ميجاباسكال، مع حماية أطراف التشريك والربط بسلك مجلفن نمرة 18.","Reinforcing steel: Conforming to ASTM A615 Grade 60 with yield strength not less than 420 MPa.")}
              </p>
            </section>

            <!-- Section 3 -->
            <section id="spec-sec-3" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">3. ${a("أنظمة العزل والكسوات المعمارية والواجهات","3. Insulation, Facades & Cladding")}</h3>
              <p style="font-size:13px;color:#334155;margin:0 0 10px;">
                ${a("تُنفذ العوازل المائية للأسطح بنظام الممبرين المزدوج (Dual Layer 4mm SBS Membrane) مع ضمان لا يقل عن 10 سنوات، وتُعزل الجدران الخارجية بألواح بوليسترين مبثوق XPS سمك 75مم لتحقيق معامل انتقال حراري U-value مطابق لمعايير المركز السعودي لكفاءة الطاقة (SEEC).","Waterproofing for roof slabs shall be executed with dual 4mm SBS modified membrane carrying a 10-year warranty. External walls insulated with 75mm XPS.")}
              </p>
            </section>

            <!-- Section 4 -->
            <section id="spec-sec-4">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">4. ${a("الالتزام بكود البناء السعودي (SBC)","4. Compliance with Saudi Building Code")}</h3>
              <p style="font-size:13px;color:#334155;margin:0;">
                ${a("تمت صياغة واعتماد هذه المواصفات لتتوافق بشكل كامل مع اشتراطات SBC 201 (المعماري)، SBC 304 (الخرساني)، SBC 601 (كفاءة الطاقة)، و SBC 801 (الحماية من الحريق).","These specifications comply fully with SBC 201 (Architectural), SBC 304 (Structural Concrete), SBC 601 (Energy), and SBC 801 (Fire Protection).")}
              </p>
            </section>
          </div>
        </div>
      </div>
    `,document.getElementById("word-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("word-download-btn")?.addEventListener("click",()=>ue(t.id));return}if(w){let L=function(){const K=k[T],ae=document.getElementById("ppt-slide-canvas-viewport"),se=document.getElementById("ppt-slide-counter"),J=document.getElementById("ppt-slide-dots-container");se&&(se.textContent=`${a("شريحة","Slide")} ${T+1} / ${k.length}`),J&&(J.innerHTML=k.map((B,ce)=>`
          <button type="button" class="ppt-dot" data-dot-idx="${ce}" style="width:${ce===T?"24px":"8px"};height:8px;border-radius:4px;border:none;background:${ce===T?"#d24726":"rgba(255,255,255,0.3)"};cursor:pointer;transition:all 0.2s ease;padding:0;" title="${a("انتقال للشريحة","Go to slide")} ${ce+1}"></button>
        `).join(""),J.querySelectorAll(".ppt-dot").forEach(B=>{B.addEventListener("click",()=>{T=parseInt(B.dataset.dotIdx,10)||0,L()})})),ae&&(ae.style.backgroundColor=K.theme,ae.innerHTML=K.html,document.getElementById("ppt-slide-download-btn")?.addEventListener("click",()=>ue(t.id)))};const k=[{number:1,title:a("فلسفة التصميم والمفهوم المعماري","Design Philosophy & Architectural Concept"),subtitle:a("فيلا النخيل الفاخرة — مخرجات مرحلة المفهوم الأولي Concept Phase","Palm Villa Luxury Residence — Concept Deliverables"),theme:"#090d13",accent:"#d24726",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:clamp(16px, 4vw, 40px);box-sizing:border-box;">
            <span style="font-size:12px;font-weight:900;color:#d24726;background:rgba(210,71,38,0.18);padding:4px 14px;border-radius:20px;letter-spacing:1px;margin-bottom:16px;">
              DARC ARCHITECTURAL PORTFOLIO 2026
            </span>
            <h1 style="font-size:clamp(22px, 4vw, 38px);font-weight:900;color:#ffffff;margin:0 0 12px;line-height:1.2;">
              PALM VILLA LUXURY CONCEPT
            </h1>
            <p style="font-size:clamp(13px, 1.8vw, 16px);color:#94a3b8;max-width:620px;line-height:1.6;margin:0 0 24px;">
              ${a("دمج العمارة النجدية المعاصرة بالخطوط الهندسية الحديثة، مع تعزيز الانفتاح البصري والخصوصية العائلية المطلقة.","Seamless blend of contemporary regional architecture and modern minimalism, maximizing indoor-outdoor spatial harmony.")}
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;font-size:12px;color:#cbd5e1;">
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${b("pin",12)} ${a("الرياض / نخلة جميرا","Riyadh / Palm Jumeirah")}</span>
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${b("compass",12)} ${a("المساحة المبنية: 1,450 م2","BUA: 1,450 sqm")}</span>
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${b("building",12)} ${a("الإصدار: Rev 03","Revision: Rev 03")}</span>
            </div>
          </div>
        `},{number:2,title:a("دراسة الكتلة والتوجيه البيئي","Massing & Solar Shading Analysis"),subtitle:a("تحليل مسار الشمس وحركة الرياح لتخفيض الأحمال الحرارية بنسبة 35%","Solar path & wind direction study yielding 35% thermal load reduction"),theme:"#0d1117",accent:"#0284c7",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#0284c7;font-weight:800;font-size:12px;text-transform:uppercase;">Analysis & Simulation</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${a("دراسة التوجيه ومسار الإشعاع الشمسي","Microclimate & Solar Shading Analysis")}</h2>
              <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin:0 0 16px;">
                ${a("تم توجيه الفتحات الزجاجية الكبرى نحو الشمال والشمال الشرقي، مع استخدام كواسر شمسية عمودية (Vertical Louvers) في الواجهات الغربية والجنوبية لتجنب وهج الشمس المباشر.","Primary fenestrations oriented towards North and Northeast, complemented by motorized architectural louvers on the West elevation to mitigate solar heat gain.")}
              </p>
              <div style="display:grid;gap:8px;font-size:12px;">
                <div style="background:rgba(2,132,199,0.1);border-left:3px solid #0284c7;padding:8px 12px;color:#e2e8f0;display:flex;align-items:center;gap:6px;"><span class="ui-inline-icon icon-info">${b("zap",14)}</span> ${a("توفير سنوي مقدر بنسبة 32% في استهلاك طاقة التكييف.","32% estimated annual HVAC cooling load reduction.")}</div>
                <div style="background:rgba(16,185,129,0.1);border-left:3px solid #10b981;padding:8px 12px;color:#e2e8f0;display:flex;align-items:center;gap:6px;"><span class="ui-inline-icon icon-success">${b("leaf",14)}</span> ${a("استغلال الإضاءة الطبيعية لتقليل الاعتماد على الإنارة الاصطناعية النهارية.","Optimal daylight autonomy across all active family spaces.")}</div>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px dashed #334155;border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#f59e0b;display:flex;justify-content:center;">${b("sun",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">${a("توزيع الإشعاع الشمسي المباشر","Direct Radiation Spectrum")}</h4>
              <p style="color:#64748b;font-size:11px;margin:0;">SBC 601 Certified Passive Thermal Envelope</p>
            </div>
          </div>
        `},{number:3,title:a("المخطط التوجيهي والفصل الحركي","Zoning & Circulation Flow"),subtitle:a("التدرج من الفضاءات العامة إلى غرف النوم العائلية الخاصة","Public hospitality zones to private family living quarters"),theme:"#090d13",accent:"#10b981",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#10b981;font-weight:800;font-size:12px;">Spatial Hierarchy</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${a("التوزيع الفضائي والتدرج الوظيفي","Spatial Flow & Privacy Gradients")}</h2>
              <ul style="color:#cbd5e1;font-size:13px;line-height:1.8;padding-right:20px;margin:0;">
                <li><strong>${a("الجناح الرسمي (Ground Floor Majlis):","Formal Majlis:")}</strong> ${a("مدخل مستقل، بهو استقبال واسع، دورات مياه وصالة طعام فاخرة.","Dedicated guest entrance, expansive atrium, and luxury formal dining.")}</li>
                <li><strong>${a("قلب الفيلا (Central Family Living):","Family Heart:")}</strong> ${a("صالة عائلية بارتفاع مزدوج (Double Height) مطلة على الحديقة والمسبح.","Double-height living space with panoramic glazed connection to pool.")}</li>
                <li><strong>${a("الجناح الخاص (First Floor Suites):","Private Suites:")}</strong> ${a("4 أجنحة نوم ماستر مع تراسات معلقة وغرفة معيشة خاصة.","4 Master bedroom suites with cantilevered balconies.")}</li>
              </ul>
            </div>
            <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#10b981;display:flex;justify-content:center;">${b("building",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">${a("مخطط الحركة والخصوصية التامة","Circulation & Privacy Blueprint")}</h4>
              <p style="color:#94a3b8;font-size:12px;margin:0;">${a("فصل تام لحركة الضيوف عن خصوصية أهل المنزل.","Zero visual overlap between guest circulation and family quarters.")}</p>
            </div>
          </div>
        `},{number:4,title:a("لوحة المواد والكسوات المعمارية","Materiality & Texture Palette"),subtitle:a("حجر ترافنتينو، خشب تيرموود معالج، زجاج عاكس وألمنيوم برونزي","Travertine stone, thermo-treated oak, bronze anodized aluminum"),theme:"#0c1015",accent:"#f59e0b",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:0 0 20px;font-weight:900;">${a("لوحة المواد والتشطيبات الفاخرة المعتمدة","Curated Architectural Material Board")}</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;">
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#e2d9cc;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${a("حجر ترافنتينو بيج روماني","Roman Travertine")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${a("ملمس طبيعي معالج للواجهات الخارجية وممرات المدخل.","Honed unfilled finish for primary exterior facades.")}</p>
              </div>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#654321;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${a("خشب تيرموود معالج بالحرارة","Thermo-Wood Slats")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${a("مقاوم للعوامل الجوية والحرارة العالية مع كواسر شمسية.","Weather-resistant acoustic external louvers.")}</p>
              </div>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#38bdf8;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${a("زجاج Low-E مزدوج العزل","Low-E Performance Glass")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${a("عزل صوتي 42dB مع نفاذية ضوء ممتازة وعزل حراري.","U-value: 1.1 W/m²K, 42dB acoustic isolation.")}</p>
              </div>
            </div>
          </div>
        `},{number:5,title:a("الابتكار الإنشائي والحلول الهندسية","Structural Innovation & Cantilevers"),subtitle:a("أطراف معلقة (Cantilevers) بطول 4.20م مع بلاطات لاكمرية مسبقة الإجهاد","Post-tensioned 4.2m cantilevers creating column-free covered terraces"),theme:"#090d13",accent:"#8b5cf6",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#8b5cf6;font-weight:800;font-size:12px;">Structural Feasibility</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${a("الحلول الإنشائية للأسقف الطائرة","Post-Tensioned Cantilevered Structure")}</h2>
              <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin:0 0 16px;">
                ${a("استخدام كمرات مدفونة بنظام الكابلات مسبقة الإجهاد (Post-Tension) لإلغاء أي أعمدة في منطقة المسبح والجلسة الخارجية المفتوحة، مما يمنح إطلالة بانورامية كاملة بدون عوائق بصرية.","Integration of post-tensioned embedded transfer girders enables a 4.2m column-free overhang across the poolside terrace for uninterrupted panoramic outdoor living.")}
              </p>
            </div>
            <div style="background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.25);border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#8b5cf6;display:flex;justify-content:center;">${b("construction",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">4.20m Column-Free Overhang</h4>
              <p style="color:#94a3b8;font-size:12px;margin:0;">SBC 304 Reinforced Concrete Engineering Verification</p>
            </div>
          </div>
        `},{number:6,title:a("السيناريوهات الليلية وتصميم الإنارة","Nightscape & Lighting Symphony"),subtitle:a("درجات حرارة لونية دافئة (2700K - 3000K) مع إنارة جدارية مخفية","Warm 2700K-3000K indirect wash lighting emphasizing facade depth"),theme:"#070a0f",accent:"#f43f5e",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:clamp(16px, 4vw, 40px);box-sizing:border-box;">
            <span style="color:#f43f5e;font-weight:800;font-size:12px;margin-bottom:12px;">Illumination Design</span>
            <h2 style="color:#ffffff;font-size:clamp(20px, 3vw, 30px);font-weight:900;margin:0 0 16px;">${a("الرؤية الليلية وتوزيع الإنارة المعمارية","Architectural Nightscape & Facade Lighting")}</h2>
            <p style="color:#94a3b8;font-size:14px;max-width:620px;line-height:1.7;margin:0 0 24px;">
              ${a("تم تصميم الإنارة المعمارية لتعزيز بروز كتل الحجر والخشب ليلاً بدون أي تلوث ضوئي، مع تخصيص مسارات إنارة أرضية خفية حول المسبح والحدائق العلوية.","Indirect warm linear wash illumination elevates natural textures, while shielded low-glare ground fixtures define evening circulation.")}
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
              <button type="button" class="btn btn-primary" id="ppt-slide-download-btn" style="background:#d24726;border:none;padding:10px 22px;border-radius:8px;font-weight:800;display:inline-flex;align-items:center;gap:6px;">
                ${b("download",14)} ${a("تنزيل العرض التقديمي الكامل (PPTX)","Download Complete Presentation (PPTX)")}
              </button>
            </div>
          </div>
        `}];let T=0;q.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#090d13;color:#f0f6fc;overflow:hidden;user-select:none;">
        <!-- PPT Header -->
        <div style="background:#d24726;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(210,71,38,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d24726;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">P</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${f(t.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft PowerPoint Presentation • ${a("عرض المفهوم المعماري الأولي","Concept Design Presentation Deck")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span id="ppt-slide-counter" style="font-size:12px;font-weight:800;background:rgba(0,0,0,0.25);padding:4px 10px;border-radius:12px;">شريحة 1 / 6</span>
            <button type="button" class="btn btn-sm" id="ppt-download-btn" style="background:#ffffff;color:#d24726;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${b("download",13)} ${a("تنزيل PPTX الأصلي","Download PPTX")}
            </button>
          </div>
        </div>

        <!-- Slide Display Viewport with Touch Navigation -->
        <div style="flex:1;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;" id="ppt-touch-wrapper">
          <!-- Slide Canvas -->
          <div id="ppt-slide-canvas-viewport" style="width:100%;height:100%;overflow:hidden;transition:background-color 0.3s ease;">
            <!-- Slide Injected Here -->
          </div>

          <!-- Prev/Next Overlay Buttons (Apple HIG touch friendly >= 48px) -->
          <button type="button" id="ppt-prev-btn" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;box-shadow:0 8px 24px rgba(0,0,0,0.5);transition:all 0.15s ease;" title="${a("الشريحة السابقة","Previous Slide")}">
            ‹
          </button>
          <button type="button" id="ppt-next-btn" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;box-shadow:0 8px 24px rgba(0,0,0,0.5);transition:all 0.15s ease;" title="${a("الشريحة التالية","Next Slide")}">
            ›
          </button>
        </div>

        <!-- Bottom Controls & Dots Indicator -->
        <div style="padding:10px 18px;background:rgba(10,14,20,0.95);border-top:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div id="ppt-slide-dots-container" style="display:flex;align-items:center;gap:6px;">
            <!-- Dots injected dynamically -->
          </div>
          <div style="font-size:11px;color:#94a3b8;">
            ${a("استخدم الأسهم ‹ › أو اسحب الشاشة للتنقل بين الشرائح","Use ‹ › arrows or touch swipe to navigate slides")}
          </div>
        </div>
      </div>
    `,L();const h=()=>{T=(T+1)%k.length,L()},I=()=>{T=(T-1+k.length)%k.length,L()};document.getElementById("ppt-next-btn")?.addEventListener("click",h),document.getElementById("ppt-prev-btn")?.addEventListener("click",I);const N=K=>{(K.key==="ArrowRight"||K.key==="ArrowDown")&&h(),(K.key==="ArrowLeft"||K.key==="ArrowUp")&&I()};window.addEventListener("keydown",N),window.__docPreviewCleanups=window.__docPreviewCleanups||[],window.__docPreviewCleanups.push(()=>window.removeEventListener("keydown",N));const Q=document.getElementById("ppt-touch-wrapper");if(Q){let K=0;Q.addEventListener("touchstart",ae=>{K=ae.changedTouches[0].screenX},{passive:!0}),Q.addEventListener("touchend",ae=>{const se=ae.changedTouches[0].screenX-K;Math.abs(se)>40&&(se<0?h():I())},{passive:!0})}document.getElementById("ppt-download-btn")?.addEventListener("click",()=>ue(t.id));return}if(v){q.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Zip Header -->
        <div style="background:#d97706;color:#ffffff;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d97706;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">${b("package",18)}</div>
            <div>
              <div style="font-weight:800;font-size:15px;">${f(t.originalName)}</div>
              <div style="font-size:12px;opacity:0.9;">Archive Deliverable Package • ${l}</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm" id="zip-download-btn" style="background:#ffffff;color:#d97706;border:none;padding:6px 16px;border-radius:6px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            ${b("download",13)} ${a("تنزيل كامل الحزمة المضغوطة","Download Full Archive")}
          </button>
        </div>

        <!-- Archive Workspace Viewport -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="margin-bottom:16px;color:#d97706;display:flex;justify-content:center;">${b("package",48)}</div>
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${f(t.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${a("ملف أرشيف مضغوط حقيقي معتمد. يحتوي على كامل مخرجات المشروع الهندسية جاهزة للتنزيل وفك الضغط.","Authentic archive deliverable. Ready for direct binary download and local extraction.")}
            </p>
            <button type="button" class="btn btn-primary" id="zip-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d97706;color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              ${b("download",14)} ${a("تنزيل الحزمة المضغوطة الآن","Download Archive Now")} (${l})
            </button>
          </div>
        </div>
      </div>
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>ue(t.id)),document.getElementById("zip-cta-download")?.addEventListener("click",()=>ue(t.id));return}q.innerHTML=`
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
      <div style="width:80px;height:80px;border-radius:20px;background:${i.bg};color:${i.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${i.border};">
        ${i.ext}
      </div>
      <h2 style="font-size:22px;font-weight:900;margin:0 0 8px 0;color:var(--text, #0f172a);">${f(t.originalName)}</h2>
      <p style="color:#64748b;font-size:14px;max-width:480px;line-height:1.6;margin:0 0 24px 0;">
        ${a("هذا المستند المعماري جاهز للتنزيل المباشر أو الفتح عبر التطبيق الهندسي المختص.","This architectural document is ready for direct download or local desktop review.")}
      </p>
      <div style="display:flex;gap:12px;">
        <button type="button" class="btn btn-primary" id="fallback-download-btn" style="padding:10px 24px;border-radius:8px;font-weight:800;display:inline-flex;align-items:center;gap:6px;">
          ${b("download",14)} ${a("تنزيل الملف الآن","Download File")} (${l})
        </button>
      </div>
    </div>
  `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>ue(t.id))}document.getElementById("btn-engine-native")?.addEventListener("click",()=>x("native")),document.getElementById("btn-engine-drive")?.addEventListener("click",()=>x("drive")),x("native")}var $o=Ge({STATUS_OPTIONS:()=>Mi,buildAssigneeChipsHtml:()=>En,buildRemindersListHtml:()=>_n,canUserMoveTask:()=>Je,canUserUploadToTask:()=>xi,closeDocumentPreviewModal:()=>St,downloadDocument:()=>ue,drawTimelineArrows:()=>qa,filterTasks:()=>_i,formatRemindAtDate:()=>Di,getDocumentShareableLink:()=>kn,getSavedTaskSort:()=>vt,getTaskSortOrder:()=>pt,handleCopyDocLink:()=>hi,initTaskModalWidgets:()=>Ii,openDocumentPreviewModal:()=>Ba,openTaskModal:()=>Ha,renderBoard:()=>Ai,renderCalendar:()=>Tn,renderTaskAssignees:()=>vi,renderTaskBadgesRow:()=>ki,renderTaskComments:()=>Dn,renderTaskDocuments:()=>Ci,renderTaskMetaRow:()=>wi,renderTaskSortSelect:()=>Si,renderTasks:()=>Fa,renderTimeline:()=>An,renderTimelinePanel:()=>Ei,setSavedTaskSort:()=>bn,sortTasks:()=>Ti,sortTasksByImportance:()=>$i,taskCard:()=>$n,verifyBoardSymmetry:()=>Sn});function vi(e){const t=s.data?.users||[],n=s._userMap||new Map(t.map(l=>[l.id,l])),i=e.assignee||n.get(e.assigneeId),o=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(l=>n.get(l)).filter(Boolean),r=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let d='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return i||o.length?(d+='<div class="avatar-stack" style="display:flex;align-items:center;">',i&&(d+=`<span title="${f(a(i.name,i.nameEn||i.name))}">${Re(i,"mini-avatar")}</span>`),o.slice(0,2).forEach(l=>{d+=`<span title="${f(a(l.name,l.nameEn||l.name))}" style="margin-inline-start:-8px;">${Re(l,"mini-avatar")}</span>`}),o.length>2&&(d+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${o.slice(2).map(l=>a(l.name,l.nameEn||l.name)).join("، ")}">+${o.length-2}</span>`),d+="</div>",i&&(d+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${f(a(i.name,i.nameEn||i.name))}</span>`)):r.length||(d+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),r.length&&(r.slice(0,2).forEach(l=>{d+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${f(l)}">${b("globe",11)} ${f(l)} <small style="opacity:0.8">(${a("خارجي","Ext")})</small></span>`}),r.length>2&&(d+=`<span style="font-size:10px;color:var(--amber);" title="${r.slice(2).map(f).join("، ")}">+${r.length-2}</span>`)),d+="</div>",d}function xi(e){if(!e)return!1;if(Z())return!0;if(!R("upload_documents")&&!R("edit_tasks"))return!1;const t=s.data?.user?.id;if(!t)return!1;if(Je(e))return!0;const n=e.projectId||e.project_id;if(n&&Array.isArray(s.data?.projects)){const i=s.data.projects.find(o=>o.id===n);if(i){const o=i.managerId||i.manager_id,r=i.ownerId||i.owner_id||i.leadId||i.lead_id||i.createdById||i.created_by;if(o===t||r===t||Array.isArray(i.members)&&i.members.some(d=>(d.userId||d.id||d)===t)||Array.isArray(i.memberIds)&&i.memberIds.includes(t))return!0}}return!1}function wi(e){const t=!!e._isOfflinePending,n=f(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM");return`
    <div class="task-card-meta-line">
      <div class="task-card-code-wrap">
        <span class="task-drag-handle" title="${a("اسحب لتحريك المهمة","Drag to reorder")}" aria-label="${a("مقبض السحب","Drag handle")}" role="button" tabindex="0"><span class="drag-handle-dots" aria-hidden="true">⋮⋮</span></span>
        <span class="task-code">${n}</span>
      </div>
      ${t?`<span class="badge badge-amber badge-offline-pending" style="font-size:9px;padding:1px 5px;display:inline-flex;align-items:center;gap:3px;border-radius:4px;white-space:nowrap;line-height:1.2;" title="${a("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">${b("hourglass",10)} <span>${a("معلقة","Pending")}</span></span>`:""}
    </div>
  `}function ki(e,t=0,n=0,i=""){const o=e.priority?`<span class="priority-badge ${f(e.priority)}">${f(gn(e.priority))}</span>`:"",r=t>0||n>0?`
    <div class="task-card-counters" style="display:inline-flex;align-items:center;gap:4px;margin-inline-start:auto;">
      ${t>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${t} ${a("تعليقات","comments")}">${b("chat",11)} ${t}</span>`:""}
      ${n>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${n} ${a("مرفقات","attachments")}">${b("link",11)} ${n}</span>`:""}
    </div>
  `:"";return`
    <div class="task-card-badges-line">
      ${o}
      ${i||""}
      ${r}
    </div>
  `}function $n(e){const t=fn(e),n=t==="overdue"||Ut(e);let i="",o="";t==="overdue"?(o="is-overdue",i=`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;white-space:nowrap;">${b("alert",11)} ${a("متأخرة","Overdue")}</span>`):t==="due_24h"?(o="is-due-24h",i=`<span class="due-tag-24h" style="display:inline-flex;align-items:center;gap:3px;white-space:nowrap;" title="${a("متبقي أقل من 24 ساعة على موعد التسليم","Due in less than 24 hours")}">${b("clock",11)} ${a("خلال 24 ساعة","Due in 24h")}</span>`):t==="due_48h"?(o="is-due-48h",i=`<span class="due-tag-48h" style="display:inline-flex;align-items:center;gap:3px;white-space:nowrap;" title="${a("متبقي أقل من 48 ساعة على موعد التسليم","Due within 48 hours")}">${b("clock",11)} ${a("خلال 48 ساعة","Due in 48h")}</span>`):t==="due_72h"&&(o="is-due-72h",i=`<span class="due-tag-72h" style="display:inline-flex;align-items:center;gap:3px;white-space:nowrap;" title="${a("متبقي أقل من 72 ساعة على موعد التسليم","Due within 72 hours")}">${b("clock",11)} ${a("خلال 72 ساعة","Due in 72h")}</span>`);const r=n?"var(--red)":t==="due_24h"?"#ea580c":t==="due_48h"?"#d97706":t==="due_72h"?"#0284c7":"var(--muted)",d=s._commentCounts?s._commentCounts[e.id]||0:(s.data?.comments||[]).filter(m=>m.taskId===e.id).length,l=s._docCounts?s._docCounts[e.id]||0:(s.data?.documents||[]).filter(m=>m.taskId===e.id).length,c=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",p=Je(e),u=a(e.titleAr,e.titleEn);return`<article class="task-card ${o} ${p?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${f(u)}" data-action="open-task" data-task-id="${f(e.id)}">
    <header class="task-card-header">
      ${wi(e)}
      ${ki(e,d,l,i)}
    </header>
    <h4>${f(a(e.titleAr,e.titleEn))}</h4>
    ${(()=>{const m=String(a(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!m)return"";const y=m.length>50?m.substring(0,50).trim()+"...":m;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${f(m)}">${f(y)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${f(a(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span class="task-due-date" style="display:inline-flex;align-items:center;gap:3px;color:${r};font-weight:${n||t?"700":"500"};">${b("calendar",11)} ${bt(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${vi(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${c};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function pt(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function $i(e=[]){const t={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((i,o)=>{const r=i.status==="blocked"?1:0,d=o.status==="blocked"?1:0;if(r!==d)return d-r;const l=i.dueDate?new Date(`${i.dueDate.split("T")[0]}T23:59:59`).getTime():null,c=o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=l&&l<n&&i.status!=="done"?1:0,u=c&&c<n&&o.status!=="done"?1:0;if(p!==u)return u-p;const m=t[i.priority]||2,y=t[o.priority]||2;if(m!==y)return y-m;if(l&&c){if(l!==c)return l-c}else{if(l&&!c)return-1;if(!l&&c)return 1}const w=pt(i),v=pt(o);return w!==v?w-v:(i.titleAr||"").localeCompare(o.titleAr||"","ar")})}function vt(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function Si(e,t="sort-project-tasks"){const n=e||vt();return`
    <div class="sort-box">
      <span>${a("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${t}">
        <option value="custom" ${n==="custom"?"selected":""}>${a("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${n==="importance"?"selected":""}>${a("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${a("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${a("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function Ti(e=[],t=vt()){return t==="deadline"?[...e].sort((n,i)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(i.dueDate?new Date(`${i.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):t==="custom"?[...e].sort((n,i)=>pt(n)-pt(i)):t==="alpha"?[...e].sort((n,i)=>(n.titleAr||"").localeCompare(i.titleAr||"","ar")):$i(e)}function Ai(e,t=vt()){const n=s.data?.users||[];s._userMap=new Map(n.map(d=>[d.id,d]));const i={};for(const d of s.data?.comments||[])d.taskId&&(i[d.taskId]=(i[d.taskId]||0)+1);const o={};for(const d of s.data?.documents||[])d.taskId&&(o[d.taskId]=(o[d.taskId]||0)+1);s._commentCounts=i,s._docCounts=o;const r=[{key:"not_started",dot:"",label:S("notStarted")},{key:"in_progress",dot:"blue",label:S("inProgress")},{key:"review",dot:"amber",label:a("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:S("done")}];return typeof requestAnimationFrame=="function"&&requestAnimationFrame(()=>{Sn()}),`<div class="board">${r.map(d=>{const l=Ti(e.filter(c=>(d.statuses||[d.key]).includes(c.status)),t);return`<section class="board-column" data-status="${d.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${d.dot}"></span>${d.label}</div><span class="board-count">${l.length}</span></div><div class="board-cards">${l.length?l.map($n).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${S("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function Sn(){if(typeof document>"u")return;const e=document.querySelector(".board, .tasks-board");if(!e)return;const t=Array.from(e.querySelectorAll(".board-column"));if(t.length<2)return;const n=t.map(o=>Math.round(o.getBoundingClientRect().width*10)/10),i=Math.min(...n);Math.max(...n)-i>2.5&&(e.style.display="grid",e.style.gridTemplateColumns=`repeat(${t.length}, minmax(0, 1fr))`,e.style.gridAutoColumns="1fr",t.forEach(o=>{o.style.width="100%",o.style.minWidth="0",o.style.maxWidth="100%",o.style.flex="1 1 0px"}))}typeof window<"u"&&(window.verifyBoardSymmetry=Sn);function Tn(e,t){const n=s.calendarDate?new Date(s.calendarDate):new Date,i=n.getFullYear(),o=n.getMonth(),r=`${s.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][o]:["January","February","March","April","May","June","July","August","September","October","November","December"][o]} ${i}`,d=s.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=new Date(i,o,1).getDay(),c=new Date(i,o+1,0).getDate(),p=new Date,u=p.getFullYear()===i&&p.getMonth()===o;let m="";for(let y=0;y<l;y++)m+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let y=1;y<=c;y++){const w=u&&p.getDate()===y,v=`${i}-${String(o+1).padStart(2,"0")}-${String(y).padStart(2,"0")}`,g=e.filter($=>{if(!$.dueDate&&!$.startDate)return!1;const A=$.dueDate?$.dueDate.split("T")[0]:null,D=$.startDate?$.startDate.split("T")[0]:null;return A===v||D===v});m+=`
      <div class="calendar-day ${w?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${w?"var(--mint)":"var(--surface)"};border:1px solid ${w?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${w?"bold":"600"};color:${w?"var(--teal)":"var(--ink)"};">
          <span>${y}</span>
          ${w?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${a("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${g.map($=>{const A=un($);return`
              <div data-action="open-task" data-task-id="${f($.id)}" style="background:${A.bgColor};border:1px solid ${A.borderColor};border-inline-start:3px solid ${A.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${A.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${f(a($.titleAr,$.titleEn))} — ${A.label}">
                <span style="font-weight:700;">${f(a($.titleAr,$.titleEn))}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${b("calendar",16)} ${r}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${b(s.lang==="ar"?"arrow":"arrowLeft",12)} ${a("السابق","Prev")}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${a("اليوم","Today")}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${a("التالي","Next")} ${b(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${d.map(y=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${y}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${m}
      </div>
    </div>
  `}function An(e){const t=e.filter(c=>c.startDate&&c.dueDate).sort((c,p)=>new Date(c.startDate)-new Date(p.startDate));if(!t.length)return`<div class="empty" style="min-height:300px">${b("calendar",24)}<span>${a("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...t.map(c=>new Date(c.startDate).getTime())),i=Math.max(...t.map(c=>new Date(c.dueDate).getTime()));const o=2592e5;n-=o,i+=o;const r=Math.max(7,Math.ceil((i-n)/864e5));let d="";for(let c=0;c<r;c++){const p=new Date(n+c*864e5),u=p.getDay()===5||p.getDay()===6,m=st()==="hijri"?s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",y=new Intl.DateTimeFormat(m,{month:"short"}).format(p);d+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${u?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${p.getDate()}<br>${y}</div>`}const l=t.map((c,p)=>{const u=Math.floor((new Date(c.startDate).getTime()-n)/864e5)+1,m=u+Math.max(1,Math.ceil((new Date(c.dueDate).getTime()-new Date(c.startDate).getTime())/864e5)+1),y=un(c);return`<div style="display:contents" class="timeline-row" data-task-id="${c.id}" data-row="${p}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${c.id}" style="grid-column: ${u} / ${m}; margin: 8px 4px; background: ${y.color}; border: 1px solid ${y.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${f(a(c.titleAr,c.titleEn))} — ${y.label}">
        <span style="font-weight:600;opacity:0.9">${f(c.templateId?c.templateId.replace("tpl-","#"):"#")}</span> ${f(a(c.titleAr,c.titleEn))}
        ${c.dependencies&&c.dependencies.length?`<span style="float:${s.lang==="ar"?"left":"right"};opacity:0.8">${b("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${r}, minmax(40px, 1fr)); min-width: ${r*40}px; position: relative;">
      ${d}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function Ei(e,t){const n=s.timelineView||"gantt";return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${a("المخطط الزمني والتقويم","Timeline & Calendar")}</h2>
          <p class="panel-subtitle">${a("متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.","Track task flow and milestone deadlines in your preferred format.")}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${n==="gantt"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${b("clock",12)} ${a("مخطط جانت","Gantt Chart")}
          </button>
          <button class="btn btn-sm ${n==="calendar"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${b("calendar",12)} ${a("عرض التقويم","Calendar View")}
          </button>
        </div>
      </div>
      
      ${n==="calendar"?Tn(e,t):An(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:Ei,renderCalendar:Tn,renderTimeline:An});function _i(e){const t=(s.searches?.tasks||"").trim().toLowerCase();return e.filter(n=>{const i=!t||`${n.titleAr||""} ${n.titleEn||""} ${n.categoryAr||""} ${n.categoryEn||""}`.toLowerCase().includes(t),o=s.taskFilter==="all"||s.taskFilter==="mine"&&ci(n,s.data?.user?.id)||s.taskFilter==="due_soon"&&si(n)||s.taskFilter==="overdue"&&Ut(n)||s.taskFilter==="blocked"&&n.status==="blocked",r=s.taskProjectFilter==="all"||n.projectId===s.taskProjectFilter,d=!s.taskPriorityFilter||s.taskPriorityFilter==="all"||n.priority===s.taskPriorityFilter;return i&&o&&r&&d})}function Fa(){const e=_i(s.data?.tasks||[]),t=[["all",S("all")],["mine",a("مسندة لي","Assigned to me")],["due_soon",a("تستحق قريباً","Due soon")],["overdue",S("overdue")],["blocked",S("blocked")]],n=s.myTaskSort||vt();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${a("حركة التنفيذ","EXECUTION")}</p>
        <h1>${S("myTasks")}</h1>
        <p>${a("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${R("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${b("plus",15)} ${S("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${t.map(([i,o])=>`
            <button class="segmented-tab ${s.taskFilter===i?"active":""}" data-action="task-filter" data-filter="${i}" role="tab">
              ${o}
            </button>
          `).join("")}
        </div>
        <div class="search-box tasks-search-box">
          ${b("search",15)}
          <input data-search="tasks" value="${f(s.searches.tasks)}" placeholder="${a("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${a("كل المشاريع","All Projects")}</option>
            ${(s.data?.projects||[]).map(i=>`<option value="${f(i.id)}" ${s.taskProjectFilter===i.id?"selected":""}>${f(a(i.nameAr,i.nameEn))}</option>`).join("")}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${a("كل الأولويات","All Priorities")}</option>
            <option value="urgent" ${s.taskPriorityFilter==="urgent"?"selected":""}>${a("عاجلة","Urgent")}</option>
            <option value="high" ${s.taskPriorityFilter==="high"?"selected":""}>${a("عالية","High")}</option>
            <option value="medium" ${s.taskPriorityFilter==="medium"?"selected":""}>${a("متوسطة","Medium")}</option>
            <option value="low" ${s.taskPriorityFilter==="low"?"selected":""}>${a("منخفضة","Low")}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${Si(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?Ai(e,n):`<section class="panel"><div class="empty">${b("checklist",18)}<span>${S("noTasks")}</span></div></section>`}
  `}function Di(e){return ri(e,{includeSeconds:!1}).full}function En(e=[],t=[]){const n=s.data?.users||[];let i="";return e.forEach(o=>{const r=n.find(d=>d.id===o)||{name:o,id:o};i+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${Re(r,"mini-avatar")}
        <span style="font-weight:500;">${f(a(r.name,r.nameEn||r.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${f(o)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${a("إزالة","Remove")}">×</button>
      </span>
    `}),t.forEach(o=>{i+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span style="display:inline-flex;align-items:center;">${b("globe",11)}</span>
        <span style="font-weight:600;">${f(o)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${a("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${f(o)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${a("إزالة","Remove")}">×</button>
      </span>
    `}),i}function _n(e=[]){return e.length?e.map((t,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${f(Di(t.remindAt))}</strong>
        ${t.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${f(t.noteAr)}">(${f(t.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${f(t.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${a("حذف التذكير","Delete reminder")}">
        ${b("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${a("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function Ha(e=null,t=null,n=null){const i=s.data?.templates?.find(g=>g.id===(t||e?.templateId)),o=e?.projectId||n||s.activeProjectId||s.data?.projects?.[0]?.id||"",r=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],d=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:e.remindAt,noteAr:""}]:Array.isArray(s.data?.reminders)&&e?.id&&(l=(s.data?.reminders||[]).filter(g=>g.taskId===e.id));const c=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,p=r.length>0||d.length>0,u=p?En(r,d):"",m=_n(l),y=`<form id="task-form" data-task-id="${f(e?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${f(e?.typeAr||i?.typeAr||(i?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${f(e?.typeEn||i?.typeEn||(i?"Drawing":""))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${f(JSON.stringify(r))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${f(JSON.stringify(d))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${f(JSON.stringify(l))}" />

    <div class="form-grid">
      <!-- Section 1: Basic Details & Standard Library -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        ${b("checklist",14)} <span>${a("البيانات الأساسية والمكتبة القياسية","Basic Details & Standard Library")}</span>
      </div>

      <div class="field full">
        <label>${a("المشروع التابع له","Project")} *</label>
        <select name="projectId" id="task-project-select" required>
          ${(s.data?.projects||[]).map(g=>`<option value="${f(g.id)}" ${g.id===o?"selected":""}>${f(a(g.nameAr,g.nameEn))} (${f(g.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${S("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${f(e?.titleAr||i?.nameAr||"")}" placeholder="${a("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${S("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${f(e?.titleEn||i?.nameEn||"")}" placeholder="${a("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${S("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${a("مهمة مخصصة","Custom task")}</option>
          ${(s.data?.templates||[]).map(g=>`<option value="${f(g.id)}" ${(e?.templateId||t)===g.id?"selected":""}>${f(g.code)} — ${f(a(g.nameAr,g.nameEn))}</option>`).join("")}
        </select>
      </div>

      <!-- Section 2: Ownership & Team -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        ${b("users",14)} <span>${a("المسؤوليات وفريق العمل","Ownership & Team")}</span>
      </div>

      <div class="field full">
        <label>${a("المسؤول الرئيسي","Primary Assignee")}</label>
        <select name="assigneeId" id="task-primary-assignee">
          <option value="">${a("— بدون تحديد —","— Unassigned —")}</option>
          ${(s.data?.users||[]).map(g=>`<option value="${f(g.id)}" ${(e?e.assigneeId===g.id:s.data?.user?.id===g.id)?"selected":""}>${f(a(g.name,g.nameEn||g.name))}</option>`).join("")}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${a("فريق العمل والمسؤولون المشاركون (داخلي وخارجي)","Collaborators & Assignees (Team & External)")}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${a("اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة","Pick team members or type external name")}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${p?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${u}
        </div>

        <!-- حقل البحث والإضافة السريعة -->
        <div style="position:relative;display:flex;gap:6px;">
          <input type="text" id="assignee-combobox-search" placeholder="${a("ابحث عن عضو بالفريق أو اكتب اسماً خارجياً...","Search team member or type external name...")}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          <button type="button" id="btn-add-external-quick" class="btn btn-soft btn-sm" style="display:none;padding:0 12px;white-space:nowrap;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
            ${b("plus",11)} <span>${a("إضافة كمسؤول خارجي","Add external")}</span>
          </button>
        </div>

        <!-- القائمة المنسدلة للبحث والاختيار -->
        <div id="assignee-combobox-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
        </div>
      </div>

      <!-- Section 3: Status, Scheduling & Reminders -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        ${b("clock",14)} <span>${a("الحالة والجدولة والتذكيرات","Status, Scheduling & Reminders")}</span>
      </div>

      <div class="field">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${S("status")}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${c}%)</span>
        </label>
        <select name="status" id="task-status-select">${Mi().map(([g,$])=>`<option value="${g}" ${e?.status===g?"selected":""}>${$}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${S("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(g=>`<option value="${g}" ${(e?.priority||"medium")===g?"selected":""}>${gn(g)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${S("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${f((e?.startDate||"").split("T")[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${S("dueDate")}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${f((e?.dueDate||"").split("T")[0])}" min="${f((e?.startDate||"").split("T")[0])}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
      </div>

      <!-- أداة التذكيرات المتعددة التفاعلية -->
      <div class="field full" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;padding:12px;">
        <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            ${b("bell",13)} ${a("تذكيرات المهمة (إشعار نظام + بريد إلكتروني للمسؤول)","Task Reminders (System Notification + Email to Assignee)")}
          </span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${a("يمكنك إضافة أكثر من موعد تذكير وحذف ما تشاء","Add multiple reminders and delete any")}</span>
        </label>

        <!-- قائمة التذكيرات المضافة (Pre-rendered for zero layout shift) -->
        <div id="task-reminders-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${m}
        </div>

        <!-- صف إضافة تذكير جديد -->
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="datetime-local" id="new-reminder-datetime" style="flex:1;min-width:180px;font-size:12px;padding:6px 10px;" />
          <input type="text" id="new-reminder-note" placeholder="${a("ملاحظة التذكير (اختياري)...","Reminder note (optional)...")}" style="flex:1;min-width:150px;font-size:12px;padding:6px 10px;" />
          <button type="button" id="btn-add-reminder" class="btn btn-soft btn-sm" style="white-space:nowrap;padding:7px 12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
            ${b("plus",11)} <span>${a("إضافة تذكير","Add Reminder")}</span>
          </button>
        </div>
      </div>

      <!-- Section 4: Details & Deliverables -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        ${b("edit",14)} <span>${a("تفاصيل ومخرجات المهمة","Task Details & Deliverables")}</span>
      </div>

      <div class="field full">
        <label>${S("description")}</label>
        <textarea name="descriptionAr" placeholder="${a("ما المطلوب؟ وما معيار الإغلاق؟","What is required and what defines completion?")}">${f(e?.descriptionAr||"")}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(R("delete_tasks")||Z())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${f(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${a("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${b("trash",14)} ${a("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${S("cancel")}</button>
        <button type="submit" class="btn btn-primary">${b("check",14)} ${S(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let w=y,v="";if(e){v="modal-lg";const g=xi(e);w=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${a("تفاصيل المهمة","Task Details")}</h3>
          ${y}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${a("المخططات والملفات","Documents & Files")}
              </h3>
              ${g?`
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${b("plus",12)} ${a("اختيار ملفات","Choose Files")}
                <input type="file" multiple id="task-upload-input" data-task-id="${e.id}" style="display:none;" />
              </label>
              `:""}
            </div>
            ${g?`
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${e.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${b("upload",22)}</span>
                <div style="font-size:12px;font-weight:600;color:var(--ink);">${a("اسحب المخططات والملفات وأفلتها هنا، أو اضغط للتصفح","Drag & drop files here, or click to browse")}</div>
                <div style="font-size:10px;color:var(--muted);">${a("دعم كامل لملفات CAD و PDF و 3D و الصور حتى 5GB","Full support for CAD, PDF, 3D & images up to 5GB")}</div>
              </div>
              <div id="upload-progress-container" style="display:none;margin-top:12px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);text-align:start;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink);margin-bottom:6px;gap:8px;">
                  <span id="upload-progress-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${a("جاري الرفع...","Uploading...")}</span>
                  <strong id="upload-progress-percent" style="color:var(--brand-teal);font-variant-numeric:tabular-nums;flex-shrink:0;">0%</strong>
                </div>
                <div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden;position:relative;">
                  <div id="upload-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, var(--brand-teal), #00c2cb);border-radius:3px;transition:width 0.15s ease;"></div>
                </div>
              </div>
            </div>
            `:`
            <div style="padding:10px 12px;margin-bottom:12px;background:var(--surface-soft);border:1px dashed var(--line);border-radius:8px;font-size:11px;color:var(--muted);text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
              ${b("lock",13)} <span>${a("إرفاق ورفع الملفات متاح لمدير المشروع والمسند إليهم المهمة فقط.","File attachments restricted to project managers and task assignees.")}</span>
            </div>
            `}
            <div id="task-documents-list">${Ci(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${a("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${Dn(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${a("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${a("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `}document.getElementById("modal-root").innerHTML=qt(e?a("تعديل المهمة","Edit task"):S("addTask"),a("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),w,"task",v),Ii(e)}function Ii(e){const t=document.getElementById("modal-root");if(!t)return;const n=t.querySelector("#task-status-select"),i=t.querySelector("#task-auto-progress-badge");n&&i&&n.addEventListener("change",()=>{const M={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;i.textContent=`(${M}%)`});const o=t.querySelector("#task-template-select");o&&o.addEventListener("change",()=>{const M=o.value,x=(s.data?.templates||[]).find(_=>_.id===M);if(x){const _=t.querySelector("#task-title-ar"),E=t.querySelector("#task-title-en"),k=t.querySelector("#task-type-ar"),T=t.querySelector("#task-type-en");_&&!_.value&&(_.value=x.nameAr||""),E&&!E.value&&(E.value=x.nameEn||""),k&&(k.value=x.typeAr||"مخطط"),T&&(T.value=x.typeEn||"Drawing")}});const r=t.querySelector("#task-additional-assignees-input"),d=t.querySelector("#task-external-assignees-input"),l=t.querySelector("#assignees-chips-container"),c=t.querySelector("#assignee-combobox-search"),p=t.querySelector("#assignee-combobox-dropdown"),u=t.querySelector("#btn-add-external-quick");let m=[];try{m=JSON.parse(r?.value||"[]")}catch{m=[]}let y=[];try{y=JSON.parse(d?.value||"[]")}catch{y=[]}function w(){r&&(r.value=JSON.stringify(m)),d&&(d.value=JSON.stringify(y))}function v(){if(l){if(m.length===0&&y.length===0){l.style.display="none",l.innerHTML="",w();return}l.style.display="flex",l.innerHTML=En(m,y),w()}}function g(M=""){if(!p)return;const x=M.trim().toLowerCase(),_=s.data?.users||[],E=t.querySelector("#task-primary-assignee")?.value,k=_.filter(L=>{if(L.id===E)return!1;if(!x)return!0;const h=(L.name||"").toLowerCase(),I=(L.nameEn||"").toLowerCase(),N=(L.email||"").toLowerCase();return h.includes(x)||I.includes(x)||N.includes(x)});let T="";x&&(T+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span style="display:flex;align-items:center;gap:4px;">${b("plus",11)} <span>${a("إضافة مسؤول خارجي:","Add external assignee:")} "${f(M.trim())}"</span></span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${a("إضافة سريعة","Quick Add")}</span>
        </div>
      `),k.length===0&&!x?T+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${a("لا يوجد مستخدمين آخرين","No other users")}</div>`:k.forEach(L=>{const h=m.includes(L.id);T+=`
          <div class="combobox-user-row" data-uid="${f(L.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${f(L.id)}" ${h?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${Re(L,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${f(a(L.name,L.nameEn||L.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${f(a(L.jobTitleAr,L.jobTitleEn)||L.email||"")}</span>
              </div>
            </div>
            ${h?`<span style="display:inline-flex;align-items:center;color:var(--teal);">${b("check",13)}</span>`:""}
          </div>
        `}),p.innerHTML=T,p.style.display="block"}w(),c&&(c.addEventListener("focus",()=>{g(c.value)}),c.addEventListener("input",()=>{const M=c.value.trim();g(M),u&&(u.style.display=M.length>1?"inline-flex":"none")}),c.addEventListener("keydown",M=>{if(M.key==="Enter"){M.preventDefault();const x=c.value.trim();x&&(y.includes(x)||(y.push(x),v()),c.value="",u&&(u.style.display="none"),p&&(p.style.display="none"))}})),u&&u.addEventListener("click",()=>{const M=c?.value.trim();M&&(y.includes(M)||(y.push(M),v()),c.value="",u.style.display="none",p&&(p.style.display="none"))}),p&&p.addEventListener("click",M=>{if(M.target.closest(".dropdown-ext-action")){const _=c?.value.trim();_&&!y.includes(_)&&(y.push(_),v()),c&&(c.value=""),u&&(u.style.display="none"),p.style.display="none";return}const x=M.target.closest(".combobox-user-row");if(x){const _=x.dataset.uid;m.includes(_)?m=m.filter(E=>E!==_):m.push(_),v(),g(c?.value||"")}}),l&&l.addEventListener("click",M=>{const x=M.target.closest(".btn-remove-chip-user");if(x){const E=x.dataset.uid;m=m.filter(k=>k!==E),v(),p&&p.style.display==="block"&&g(c?.value||"");return}const _=M.target.closest(".btn-remove-chip-ext");if(_){const E=_.dataset.ext;y=y.filter(k=>k!==E),v()}});const $=t.querySelector("#task-reminders-input"),A=t.querySelector("#task-reminders-list"),D=t.querySelector("#new-reminder-datetime"),j=t.querySelector("#new-reminder-note"),H=t.querySelector("#btn-add-reminder");let z=[];try{z=JSON.parse($?.value||"[]")}catch{z=[]}Array.isArray(z)||(z=[]);function q(){A&&($&&($.value=JSON.stringify(z)),A.innerHTML=_n(z))}H&&H.addEventListener("click",()=>{const M=D?.value;if(!M){G(a("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const x=j?.value.trim()||"",_={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date(M).toISOString(),noteAr:x};z.push(_),D&&(D.value=""),j&&(j.value=""),q(),G(a("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),A&&A.addEventListener("click",async M=>{const x=M.target.closest(".btn-delete-reminder");if(x){const _=Number(x.dataset.idx),E=x.dataset.remId;!isNaN(_)&&_>=0&&_<z.length&&(z.splice(_,1),q(),E&&!E.startsWith("rem_temp_")&&he(`/api/reminders/${E}`,{method:"DELETE"}).catch(()=>{}),G(a("تم حذف موعد التذكير.","Reminder deleted.")))}}),t.addEventListener("mousedown",M=>{p?.contains(M.target)||c?.contains(M.target)||u?.contains(M.target)||(p&&(p.style.display="none"),u&&(u.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&he(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(M=>{if(M&&Array.isArray(M.comments)){s.data&&!s.data.comments&&(s.data.comments=[]);const x=new Map((s.data?.comments||[]).map(E=>[E.id,E]));for(const E of M.comments)x.set(E.id,E);s.data&&(s.data.comments=Array.from(x.values()));const _=document.getElementById("task-comments-list");_&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(_.innerHTML=Dn(e))}}).catch(()=>{})}function Dn(e){const t=(s.data?.comments||[]).filter(n=>n.taskId===e.id).sort((n,i)=>new Date(n.createdAt)-new Date(i.createdAt));return t.length?`<div style="display:flex;flex-direction:column;gap:12px;">${t.map(n=>{const i=n.user||(s.data?.users||[]).find(l=>l.id===n.userId)||s.data?.user||{name:"DARC Member",id:""},o=!!(i.id&&s.data?.user?.id&&i.id===s.data?.user?.id),r=o||typeof Z=="function"&&Z(),d=f(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${f(n.id)}" style="display:flex;gap:10px;flex-direction:${o?"row-reverse":"row"};">
        ${Re(i)}
        <div style="display:flex;flex-direction:column;align-items:${o?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${f(a(i.name,i.nameEn||i.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${bt(n.createdAt,!0)}</span>
            ${r?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${f(n.id)}" data-task-id="${f(e.id)}" title="${a("تعديل التعليق","Edit comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${b("edit",12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${f(n.id)}" data-task-id="${f(e.id)}" title="${a("حذف التعليق","Delete comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${b("trash",12)}
                </button>
              </div>
            `:""}
          </div>
          <div id="comment-bubble-${f(n.id)}" style="background:${o?"var(--blue)":"var(--surface)"};color:${o?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${o?"none":"1px solid var(--border)"};border-top-${o?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${d}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${b("message",18)}<span style="font-size:12px;">${a("لا توجد تعليقات","No comments yet")}</span></div>`}function Ci(e){const t=(s.data?.documents||[]).filter(n=>n.taskId===e.id&&!n.deletedAt).sort((n,i)=>new Date(i.createdAt)-new Date(n.createdAt));return t.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${t.map(n=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;transition:background 0.15s ease;flex-wrap:wrap;gap:8px;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;min-width:200px;cursor:pointer;" data-action="preview-doc" data-doc-id="${f(n.id)}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;flex-shrink:0;">${b("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;min-width:0;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${f(n.originalName)}">${f(n.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${bt(n.createdAt,!0)} · ${f(n.user?a(n.user.name,n.user.nameEn||n.user.name):"Team Member")} · ${n.size>1048576?(n.size/1048576).toFixed(1)+"MB":Math.round(n.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
        <button type="button" class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${f(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--brand-teal);display:inline-flex;align-items:center;justify-content:center;" title="${a("نسخ رابط Google Drive","Copy Drive link")}">${b("link",14)}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${f(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--brand-teal);display:inline-flex;align-items:center;justify-content:center;" title="${a("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${b("eye",14)}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${f(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--blue);display:inline-flex;align-items:center;justify-content:center;" title="${a("تحميل المخطط","Download")}">${b("download",14)}</button>
        ${R("review_tasks")||R("approve_tasks")||R("upload_documents")||Z()?`
          <select class="doc-status-select" data-doc-id="${f(n.id)}" style="font-size:11px;padding:3px 6px;border-radius:6px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;min-height:30px;">
            <option value="draft" ${n.status==="draft"?"selected":""}>${a("مسودة","Draft")}</option>
            ${R("review_tasks")||Z()?`<option value="review" ${n.status==="review"?"selected":""}>${a("مراجعة","Review")}</option>`:""}
            ${R("approve_tasks")||Z()?`<option value="approved" ${n.status==="approved"?"selected":""}>${a("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${n.status==="superseded"?"selected":""}>${a("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${R("upload_documents")||Z()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${f(n.id)}" style="padding:4px;min-width:0;height:auto;" title="${a("إعادة تسمية","Rename")}">${b("edit",14)}</button>`:""}
        ${R("delete_documents")||Z()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${f(n.id)}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${a("حذف","Delete")}">${b("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${b("document",18)}<span style="font-size:12px;">${a("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function Mi(){return[["not_started",S("notStarted")],["in_progress",S("inProgress")],["review",S("review")],["approval",S("approval")],["done",S("done")],["blocked",S("blocked")],["canceled",S("canceled")]]}var Gn="";function qa(){const e=document.querySelector(".timeline-container > div"),t=document.querySelector(".timeline-svg");if(!e||!t)return;const n=Array.from(document.querySelectorAll(".timeline-bar")),i=e.getBoundingClientRect(),o=`${Math.round(i.width)}_${n.length}_${s.lang}_${(s.data?.tasks||[]).length}`;if(o===Gn&&t.hasChildNodes())return;Gn=o,t.innerHTML="";const r={};n.forEach(c=>{const p=c.getBoundingClientRect();r[c.dataset.taskId]={left:p.left-i.left,right:p.right-i.left,top:p.top-i.top,bottom:p.bottom-i.top,width:p.width,height:p.height,center:p.top-i.top+p.height/2}});let d="";const l=s.lang==="ar";n.forEach(c=>{const p=c.dataset.taskId,u=(s.data?.tasks||[]).find(w=>w.id===p),m=u?.dependencies||u?.customFields?.dependencies||[];if(!u||!m.length)return;const y=r[p];y&&m.forEach(w=>{const v=r[w];if(!v)return;const g=l?v.left:v.right,$=v.center,A=l?y.right:y.left,D=y.center,j=g+(l?-20:20);d+=`<path d="M ${g} ${$} C ${j} ${$}, ${j} ${D}, ${A} ${D}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),t.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${d}
  `}var Ua="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",Li=typeof navigator<"u"&&!!navigator.connection?.saveData,Wa=3e5,Va=Li?1e4:3e4,Ga=Li?500:250,Ja=25e3,Xa=45e3,Ka=50,Xt=null,Jn=!1,Tt=!1,Ye=null,V=null,At=null,tt=null,we=null,Kt=null,Ze=null,Xn=0,nt=0,be=!1,rt=Date.now(),an=0,kt=null,Lt=0,Pi=null,Ri=0,ji=0;function Oi(){return!!(V&&V.readyState===1)}function Ya(){return{connected:Oi(),hibernating:be,reconnectAttempts:nt,latencyMs:Pi,carrierDrops:Ri,messagesReceived:ji,lastActivity:rt,socketReadyState:V?V.readyState:3}}typeof window<"u"&&(window.getRealtimeDiagnostics=Ya);var ye=new Map;function Za(e){if(!e||typeof e!="string")return;const t=Date.now();ye.set(e,t);for(const[n,i]of ye.entries())t-i>4e3&&ye.delete(n);if(ye.size>Ka){const n=ye.keys().next().value;n&&ye.delete(n)}}function ut(){return typeof localStorage>"u"?!1:yt()&&!!localStorage.getItem("darc_token")}function $e(){return typeof window>"u"||!yt()?!1:!!(s.data?.isDemo||s.currentUser?.isDemo||s.data?.user&&(s.data.user.id==="usr_demo"||s.data.user.isDemo)||s.currentUser&&(s.currentUser.id==="usr_demo"||s.currentUser.isDemo)||typeof localStorage<"u"&&localStorage.getItem("darc_user_id")==="usr_demo")}var Pt=new Set(["__proto__","constructor","prototype"]),Ni=new Set(["custom_fields","permissions","details"]);function Rt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Rt);const t={};for(const[n,i]of Object.entries(e)){if(Pt.has(n))continue;const o=n.indexOf("_")===-1?n:n.replace(/_([a-z0-9])/g,(r,d)=>d.toUpperCase());Pt.has(o)||(t[o]=i!==null&&typeof i=="object"&&!Ni.has(n)?Rt(i):i)}return t}function jt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(jt);const t={};for(const[n,i]of Object.entries(e))Pt.has(n)||(t[n]=i!==null&&typeof i=="object"&&!Ni.has(n)?jt(i):i);return t}function Qe(e){if(!e||!s.data||!Array.isArray(s.data.tasks)||!Array.isArray(s.data.projects))return;const t=s.data.projects.find(c=>c.id===e);if(!t)return;const n=s.data.tasks.filter(c=>c.projectId===e&&!c.deletedAt&&!c.deleted_at);let i=0,o=0;for(const c of n){const p=Number(c.weight)||1,u=Number(c.progress)||0;i+=p,o+=p*(u/100)}const r=i>0?Math.round(o/i*100):0;t.progress!==r&&(t.progress=r),t.totalWeight=i;const d=n.length>0,l=d&&n.every(c=>c.status==="done"||c.status==="completed");d&&l&&r===100?t.lifecycle="completed":t.lifecycle==="completed"&&(!l||r<100)&&(t.lifecycle="active")}function Yt(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const t=(s.data?.notifications||[]).filter(i=>!Me(i)).length;let n=e.querySelector(".notification-dot");t>0?n||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):n&&n.remove()}function Qa(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Ye||Ye.state==="closed")&&(Ye=new e),Ye.state==="suspended"&&Ye.resume().catch(()=>{});const t=Ye,n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,t.currentTime),n.frequency.exponentialRampToValueAtTime(880,t.currentTime+.15),i.gain.setValueAtTime(.06,t.currentTime),i.gain.exponentialRampToValueAtTime(.001,t.currentTime+.35),n.connect(i),i.connect(t.destination),n.start(),n.stop(t.currentTime+.36)}catch{}}function zi(e,t,n){if(typeof document>"u"||!e)return!1;const i=document.querySelector(`.task-card[data-task-id="${e}"]`);if(!i)return!1;if(n==="DELETE"||t?.deletedAt||t?.deleted_at){const u=i.closest(".board-column");if(i.remove(),u){const m=u.querySelector(".board-count");if(m){const y=Math.max(0,(parseInt(m.textContent,10)||1)-1);if(m.textContent=String(y),y===0&&!u.querySelector(".task-card")){const w=u.querySelector(".board-cards");w&&!w.querySelector(".empty")&&(w.innerHTML='<div class="empty"><span>'+(window.t?window.t("noTasks"):"No tasks")+"</span></div>")}}}return!0}if(window._isDraggingTask&&window._activeDraggedTaskId===e)return!0;const o=(s.data?.tasks||[]).find(u=>u.id===e);if(!o)return!1;const r=document.createElement("div");r.innerHTML=$n(o);const d=r.firstElementChild;if(!d)return!1;const l=i.closest(".board-column"),c=l?.dataset.status,p=o.status;if(l&&c&&p&&c!==p){const u=document.querySelector(`.board-column[data-status="${p}"]`);if(u){const m=u.querySelector(".board-cards");if(m){m.querySelector(".empty")?.remove(),m.prepend(d),i.remove();const y=l.querySelector(".board-count");if(y){const v=Math.max(0,(parseInt(y.textContent,10)||1)-1);if(y.textContent=String(v),v===0&&!l.querySelector(".task-card")){const g=typeof window.t=="function"?window.t("noTasks"):"لا توجد مهام";l.querySelector(".board-cards")?.insertAdjacentHTML("beforeend",`<div class="empty" style="min-height:150px;pointer-events:none;">${g}</div>`)}}const w=u.querySelector(".board-count");if(w){const v=(parseInt(w.textContent,10)||0)+1;w.textContent=String(v)}}else i.replaceWith(d)}else i.replaceWith(d)}else i.replaceWith(d);return d.style.transition="box-shadow 0.3s ease",d.style.boxShadow="0 0 0 2px var(--teal)",setTimeout(()=>{d&&(d.style.boxShadow="")},800),!0}function eo(e){if(typeof document>"u"||!Array.isArray(e))return!1;let t=!1;const n=new Set;for(const i of e)if(i.id){const o=document.querySelector(`.task-card[data-task-id="${i.id}"]`);if(o){const r=o.closest(".board-column");r&&n.add(r)}zi(i.id,i)&&(t=!0)}if(s.data?.tasks&&n.size>0){const i=new Map(s.data.tasks.map(o=>[o.id,o]));n.forEach(o=>{const r=o.querySelector(".board-cards");if(!r)return;const d=Array.from(r.querySelectorAll(".task-card"));d.length<=1||(d.sort((l,c)=>{const p=i.get(l.dataset.taskId),u=i.get(c.dataset.taskId);return(p&&typeof p.sortOrder=="number"?p.sortOrder:p&&typeof p.sort_order=="number"?p.sort_order:0)-(u&&typeof u.sortOrder=="number"?u.sortOrder:u&&typeof u.sort_order=="number"?u.sort_order:0)}),d.forEach(l=>r.appendChild(l)))})}return t}function to(){if(!(typeof window>"u"||typeof document>"u")){if(typeof requestAnimationFrame>"u"){typeof re=="function"?re():typeof De=="function"&&De();return}kt&&cancelAnimationFrame(kt),kt=requestAnimationFrame(()=>{kt=null,typeof re=="function"?re():typeof De=="function"&&De()})}}function Et(e,t,n,i){if(!s.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const o=n?jt(Rt(n)):null,r=i?jt(Rt(i)):null,d=o&&o.id||r&&r.id;if(!d&&t!=="BATCH_REORDER")return!1;const l=o?._clientMutationId||o?.clientMutationId||r?._clientMutationId;if(l&&ye.has(l))return!0;if(d&&ye.has(d)){const y=(s.data[e]||[]).find(w=>w.id===d);if(y&&o&&o.updatedAt&&y.updatedAt){const w=new Date(o.updatedAt).getTime(),v=new Date(y.updatedAt).getTime();if(!isNaN(w)&&!isNaN(v)&&w<v)return!0}}const c=s.data?.user?.roleId==="admin"||s.data?.user?.role_id==="admin";if(o&&e==="notifications"){const y=o.userId||o.user_id;if(y&&y!==s.data?.user?.id)return!1}else if(!c&&o&&(e==="tasks"||e==="documents"||e==="comments")){const y=o.projectId||(e==="comments"?s.data?.tasks?.find(w=>w.id===o.taskId)?.projectId:null);if(y&&!s.data?.projects?.some(w=>w.id===y))return Ve("missing_project_dependency"),!1}Array.isArray(s.data[e])||(s.data[e]=[]);const p=s.data[e];let u=!1;const m=!!(o?.deletedAt||o?.deleted_at);if(t==="BATCH_REORDER"&&Array.isArray(o?.items)){const y=new Set;for(const w of o.items){if(!w?.id)continue;const v=p.find(g=>g.id===w.id);if(v){w.status&&v.status!==w.status&&(v.status=w.status,u=!0);const g=typeof w.sortOrder=="number"?w.sortOrder:typeof w.sort_order=="number"?w.sort_order:null;g!==null&&v.sortOrder!==g&&(v.sortOrder=g,u=!0),typeof w.progress=="number"&&v.progress!==w.progress&&(v.progress=w.progress,u=!0),v.projectId&&y.add(v.projectId)}}u&&e==="tasks"&&y.forEach(w=>Qe(w))}else if(t==="DELETE"||m){const y=p.length;let w=null;e==="tasks"&&(w=p.find(v=>v.id===d)?.projectId||r?.projectId||o?.projectId),s.data[e]=p.filter(v=>v.id!==d),s.data[e].length!==y&&(u=!0),e==="tasks"&&w?Qe(w):e==="projects"?Array.isArray(s.data.tasks)&&(s.data.tasks=s.data.tasks.filter(v=>v.projectId!==d)):e==="notifications"&&(Yt(),typeof qe=="function"&&document.querySelector(".modal-shell.notifications")&&qe())}else if(t==="UPDATE"&&o){const y=p.findIndex(w=>w.id===d);if(y!==-1){const w=p[y],v=w.updatedAt||w.updated_at||w.createdAt||w.created_at,g=o.updatedAt||o.updated_at||o.createdAt||o.created_at;if(v&&g){const $=new Date(v).getTime(),A=new Date(g).getTime();if(!isNaN($)&&!isNaN(A)&&A<$)return!0}for(const[$,A]of Object.entries(o))Pt.has($)||(p[y][$]=A);u=!0}else p.unshift(o),u=!0;e==="tasks"?(o.projectId&&Qe(o.projectId),r?.projectId&&r.projectId!==o.projectId&&Qe(r.projectId)):e==="notifications"&&(Yt(),typeof qe=="function"&&document.querySelector(".modal-shell.notifications")&&qe())}else if(t==="INSERT"&&o){if(p.some(y=>y.id===d)||(p.unshift(o),u=!0),e==="tasks"&&o.projectId)Qe(o.projectId);else if(e==="notifications"){const y=s.data?.user?.id,w=o.userId||o.user_id,v=Me(o);if(y&&w===y&&!v){Yt();const g=s.lang==="ar"?o.titleAr||o.messageAr||o.bodyAr||o.content||o.titleEn||a("إشعار جديد","New notification"):o.titleEn||o.messageEn||o.bodyEn||(o.content!==o.titleAr&&o.content!==o.messageAr?o.content:"")||o.titleAr||a("إشعار جديد","New notification");g&&G(g,!1);const $=s.lang==="ar"?o.messageAr||o.bodyAr||o.content||"":o.messageEn||o.bodyEn||o.content||"";ja({title:g,body:$,icon:"/favicon.ico",tag:o.id||"darc-alert",url:o.taskId?`${window.location.origin}/#workspace?task=${o.taskId}`:o.projectId?`${window.location.origin}/#project-detail?id=${o.projectId}`:window.location.href}).catch(()=>{}),typeof qe=="function"&&document.querySelector(".modal-notifications")&&qe()}}}if(u){ct();let y=!1;e==="tasks"&&((t==="UPDATE"||t==="DELETE"||m)&&(o||d)?y=zi(d,o,m?"DELETE":t):t==="BATCH_REORDER"&&Array.isArray(o?.items)&&(y=eo(o.items)));const w=o?.taskId||r?.taskId;if(w){const v=(s.data?.tasks||[]).find(g=>g.id===w);if(v){if(e==="comments"){const g=document.getElementById("task-comment-form");if(g&&g.dataset.taskId===w){const $=document.getElementById("task-comments-list");$&&typeof window.renderTaskComments=="function"&&($.innerHTML=window.renderTaskComments(v),$.scrollTop=$.scrollHeight)}}if(e==="documents"){const g=document.getElementById("task-dropzone");if(g&&g.dataset.taskId===w){const $=document.getElementById("task-documents-list");$&&typeof window.renderTaskDocuments=="function"&&($.innerHTML=window.renderTaskDocuments(v))}}}}return y||to(),!0}return!1}function Ve(e="realtime",t=!1){if(!ut()||be&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!s.data||!s.view)return;Xt&&clearTimeout(Xt);const n=async()=>{try{await vn(!0)}catch(i){console.warn("[Realtime] Sync error:",String(e),i.message)}};t?n():Xt=setTimeout(n,Ga)}function Ot(e,t,n,i={}){e&&e.readyState===WebSocket.OPEN&&(Xn++,e.send(JSON.stringify({topic:t,event:n,payload:i,ref:String(Xn)})))}function no(){return Date.now()-rt>12e4?Xa:Ja}function Bi(e){In();const t=()=>{const n=no();At=setTimeout(()=>{e&&e.readyState===WebSocket.OPEN&&(Lt=Date.now(),Ot(e,"phoenix","heartbeat"),t())},n)};t()}function In(){At&&(clearTimeout(At),At=null)}function Cn(e="disconnect"){if(Tt=!0,In(),we&&(clearTimeout(we),we=null),tt&&(clearTimeout(tt),tt=null),V){try{V.close(1e3,e)}catch{}V=null}}function on(e="idle"){be||(be=!0,Cn(e))}function lt(e="wake_up"){const t=be;be=!1,ut()&&(typeof navigator<"u"&&!navigator.onLine||(V&&V.readyState===WebSocket.OPEN?(we&&clearTimeout(we),we=setTimeout(()=>{console.warn("[Realtime] Socket health probe timed out (zombie connection detected). Reconnecting cleanly..."),we=null,Cn("zombie_probe_timeout"),Nt(),Ve("zombie_recovery",!0)},1200),Lt=Date.now(),Ot(V,"phoenix","heartbeat")):(!V||V.readyState===WebSocket.CLOSED||V.readyState===WebSocket.CLOSING)&&Nt(),(t||e==="tab_visible"||e==="pageshow"||e==="focus"||e==="online")&&Ve(e,!0)))}function Nt(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&ut()&&!be&&!$e()&&!(V&&(V.readyState===WebSocket.CONNECTING||V.readyState===WebSocket.OPEN))){Tt=!1;try{const e=new WebSocket(Ua);V=e,e.onopen=()=>{nt=0,Bi(e),Ot(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(t=>{Ot(e,`realtime:public:${t}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:t}]}})})},e.onmessage=t=>{try{we&&(clearTimeout(we),we=null),ji++;const{event:n,topic:i,payload:o}=JSON.parse(t.data);if(n==="phx_reply"){Lt&&(Pi=Math.max(1,Date.now()-Lt));return}if(n==="phx_close"||$e())return;if(n==="postgres_changes"&&o?.data){const{table:r,type:d,record:l,old_record:c}=o.data;if(Et(r,d,l,c))return}if((n==="INSERT"||n==="UPDATE"||n==="DELETE")&&i?.startsWith("realtime:public:")){const r=i.split(":")[2];if(Et(r,n,o?.record||o?.new,o?.old_record||o?.old))return}if(i==="realtime:darc_live"&&(n==="broadcast"||n==="STATE_MUTATION"||n==="GRANULAR_DELTA")){const r=o?.payload||o,d=r?.mutationId||r?.id||r?.entityId;if(d&&ye.has(d))return;if(r?.delta){const{table:l,action:c,record:p,oldRecord:u}=r.delta;if(Et(l,c,p,u))return}Ve("edge_broadcast");return}(n==="broadcast"||i==="realtime:darc_live"||typeof i=="string"&&i.startsWith("realtime:public:"))&&Ve("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=t=>{if(In(),V=null,!Tt&&!be&&t?.reason!=="logout"&&t?.reason!=="unauthorized_401"&&Ri++,!(Tt||!ut()||be)&&!(t?.reason==="logout"||t?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){nt++;const n=Math.min(3e4,Math.pow(2,Math.min(nt,5))*1e3)+Math.floor(Math.random()*800);tt&&clearTimeout(tt),tt=setTimeout(()=>{Nt()},n)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function Kn(){const e=Date.now();if(e-an>1e4){const t=e-rt>12e4;an=e,rt=e,t&&V&&V.readyState===WebSocket.OPEN&&Bi(V),be&&(typeof document>"u"||!document.hidden)&&lt("user_active")}}function io(){Kt&&clearInterval(Kt),Kt=setInterval(()=>{const e=Date.now();for(const[t,n]of ye.entries())e-n>8e3&&ye.delete(t);be||typeof document<"u"&&document.hidden||Date.now()-rt>=Wa&&on("inactivity_idle")},6e4)}function So(){if(!Jn){if(Jn=!0,ut()&&Nt(),io(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,Kn,{passive:!0})}),window.addEventListener("mousemove",Kn,{passive:!0})),typeof document<"u"&&(document.addEventListener("visibilitychange",()=>{document.hidden?(Ze&&clearTimeout(Ze),Ze=setTimeout(()=>{on("tab_hidden")},Va)):(Ze&&(clearTimeout(Ze),Ze=null),rt=Date.now(),an=Date.now(),lt("tab_visible"))}),typeof window<"u"&&(window.addEventListener("pageshow",()=>lt("pageshow"),{passive:!0}),window.addEventListener("focus",()=>lt("focus"),{passive:!0}))),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=t=>{if(!!t.data?.isDemo===$e())if(t.data?.type==="GRANULAR_DELTA"&&t.data.delta){const{table:n,action:i,record:o,oldRecord:r}=t.data.delta;Et(n,i,o,r)}else t.data?.type==="STATE_MUTATION"&&Ve("broadcast_channel",!0)},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{s.isOffline=!1,nt=0;const e=window.api,t=typeof window.choose=="function"?window.choose:(i=>i),n=typeof window.showToast=="function"?window.showToast:console.log;if(lt("online"),e){const i=await sa(e);i&&i.synced>0?n(t(`تمت استعادة الاتصال ومزامنة ${i.synced} عمليات معلقة بنجاح!`,`Internet restored! Synced ${i.synced} pending actions successfully!`),!1):n(t("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}Ve("online")}),window.addEventListener("offline",()=>{if(s.isOffline=!0,nt=0,on("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function ao(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now(),isDemo:$e()})}catch{}}typeof window<"u"&&(window.isRealtimeConnected=Oi,window.notifyStateMutation=ao,window.disconnectSupabaseRealtime=Cn,window.recordRecentLocalMutation=Za,window.recalculateProjectProgressInMemory=Qe);var oo=Date.now(),Fi=0,zt=0,Bt=0,Zt=null,Yn=Date.now(),_t=[];function ft(e="action",t="",n=null){const i=new Date().toTimeString().split(" ")[0];_t.push({time:i,category:e,message:String(t||"").slice(0,150),metadata:n?JSON.stringify(n).slice(0,200):null}),_t.length>15&&_t.shift()}function Hi(){return[..._t]}typeof document<"u"&&setInterval(()=>{document.visibilityState==="visible"&&Fi++},1e3);if(typeof window<"u"){window.addEventListener("webglcontextlost",e=>{e.preventDefault(),console.warn("[WebGL Context Guard] Context loss intercepted; executing LOD vertex decimation and GPU memory purge."),ft("webgl.guard","WebGL Context Lost intercepted. Auto-recovery and LOD mesh decimation active.")},!1),window.addEventListener("webglcontextrestored",()=>{console.info("[WebGL Context Guard] WebGL context successfully restored with optimized buffer allocation."),ft("webgl.guard","WebGL Context successfully restored with optimized buffer allocation.")},!1);try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{Bt+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ft(!1,!0)}),window.addEventListener("pagehide",()=>{Ft(!1,!0)})}function Mn(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function qi(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let t="Chrome";e.includes("Edg/")?t="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?t="Safari":e.includes("Firefox/")&&(t="Firefox");let n="macOS";return e.includes("Win")?n="Windows":e.includes("Android")?n="Android":e.includes("iPhone")||e.includes("iPad")?n="iOS":e.includes("Linux")&&(n="Linux"),{os:n,browser:t}}function Ui(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function To(e,t={}){zt++;const{os:n,browser:i}=qi(),o=Ui(),r=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",d=e||{},l=String(d.message||d.reason||d||"Unknown client error"),c=String(d.stack||t.stack||"No stack trace provided."),p=d.name||t.errorType||"ClientRuntimeError";ft("error",`${p}: ${l}`);const u=s.data?.user||{},m=$e(),y={userId:u.id||"usr_demo",isDemo:m,userName:u.name||"Demo",userEmail:u.email||"demo@darc-design.bond",userRole:u.jobTitleAr||s.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:u.avatarColor||"#0d6269",errorType:p,errorMessage:l,stackTrace:c,deviceType:o,browser:i,os:n,screenResolution:r,memoryMb:Mn(),currentView:s.view?`#${s.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:Hi(),severity:t.severity||"high",titleAr:t.titleAr||`خطأ تشغيلي في مساحة العمل (${p})`,titleEn:t.titleEn||`Workspace Runtime Error (${p})`};try{return await he("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(y),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const v=new Blob([JSON.stringify(y)],{type:"application/json"});navigator.sendBeacon((Ln||"")+"/api/telemetry/report-error",v)}catch{}}}async function Ft(e=!1,t=!1){const n=Date.now(),i=Math.max(5,Math.round((n-Yn)/1e3));Yn=n;let o=null,r=null,d=!1;try{typeof localStorage<"u"&&(o=localStorage.getItem("darc_vid"),o||(o="vid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),localStorage.setItem("darc_vid",o))),typeof sessionStorage<"u"&&(r=sessionStorage.getItem("darc_sid"),r||(r="sid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),sessionStorage.setItem("darc_sid",r),d=!0))}catch{}const{os:l,browser:c}=qi(),p=Ui(),u=$e(),m={userId:s.data?.user?.id||"anonymous",isDemo:u,sessionId:r,visitorId:o,isNewVisit:d,os:l,browser:c,deviceType:p,durationSeconds:i,memoryMb:Mn(),errorCount:zt,longTaskCount:Bt,currentView:s.view||"dashboard"};if(m.memoryMb>140&&(e=!0),t&&typeof navigator<"u"&&navigator.sendBeacon)try{const y=new Blob([JSON.stringify(m)],{type:"application/json"}),w=(Ln||"")+"/api/telemetry/heartbeat";navigator.sendBeacon(w,y);return}catch{}try{const y=await he("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(m),silent:!0});return zt=0,Bt=0,y}catch{}}var Wi=Date.now();if(typeof window<"u"){const e=()=>{Wi=Date.now()};["pointerdown","keydown","touchstart"].forEach(t=>{window.addEventListener(t,e,{passive:!0})})}function Ao(){Zt&&clearInterval(Zt);const e=typeof navigator<"u"&&navigator.connection?.saveData?9e4:45e3;setTimeout(()=>Ft(!1),5e3),Zt=setInterval(()=>{typeof document<"u"&&document.visibilityState==="visible"&&(Date.now()-Wi>12e4||Ft(!1))},e)}function Eo(){return{totalSessionDurationSeconds:Math.round((Date.now()-oo)/1e3),activeDurationSeconds:Fi,memoryMb:Mn(),errorCount:zt,longTaskCount:Bt,recentBreadcrumbs:Hi()}}var Ln=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",Dt=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function ct(){Dt=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function he(e,t={}){const n=["POST","PATCH","PUT","DELETE"].includes(t.method),i=e.startsWith("/api/auth")||e.startsWith("/api/telemetry")||e==="/api/health",o=!!(t.headers&&(t.headers["X-Offline-Replay"]==="true"||t.headers["X-Offline-Replay"]===!0));let r=null;if(n&&t.body)try{r=typeof t.body=="string"?JSON.parse(t.body):t.body}catch{}t.method==="POST"&&r&&typeof r=="object"&&!o&&(e==="/api/tasks"&&!r.id?(r.id=et("tsk"),t.body=JSON.stringify(r)):e==="/api/projects"&&!r.id?(r.id=et("prj"),t.body=JSON.stringify(r)):e.includes("/comments")&&!r.id&&(r.id=et("cmt"),t.body=JSON.stringify(r)));const d=typeof FormData<"u"&&t.body instanceof FormData;if(typeof navigator<"u"&&!navigator.onLine&&n&&!i){if(o)throw new Error(a("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));if(d){const j=a("لا يمكن رفع المخططات أو الملفات في وضع عدم الاتصال. يرجى الاتصال بالإنترنت لإتمام الرفع.","File and drawing uploads are not supported offline. Please reconnect to upload.");throw G(j,!0),new Error(j)}const A=Bn({path:e,method:t.method,body:r}),D=Fn(e,t.method,r,s);return G(a("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة الاتصال","Offline mode: action saved locally and will auto-sync on reconnect"),!1),{ok:!0,queued:!0,offline:!0,id:A?.id,...D}}const l=yt();if(!i&&!l){ct(),typeof localStorage<"u"&&(localStorage.removeItem("darc_token"),localStorage.removeItem("darc_user_id")),en(),s.data=null,s.view="login",typeof window<"u"&&(typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("cookie_deleted"),window.location.hash!=="#login"&&(window.location.hash="#login"),typeof window.renderLogin=="function"&&window.renderLogin());const A=new Error(a("تم إنهاء الجلسة أو حذف ملفات تعريف الارتباط.","Session ended or cookies cleared."));throw A.status=401,A}const c=l&&typeof localStorage<"u"?localStorage.getItem("darc_token"):null,p=!!(t.silent||t.headers&&t.headers["X-Silent"]),u=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),m=!!Dt&&(p||!!s.data||u),y=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,w={...c?{Authorization:`Bearer ${c}`}:{},...t.body&&!d?{"Content-Type":"application/json"}:{},...y?{"X-Mutation-ID":y}:{},...e==="/api/bootstrap"&&m?{"If-None-Match":Dt}:{},...e==="/api/bootstrap"&&!m?{"Cache-Control":"no-cache, no-store"}:{},...t.headers||{}};e==="/api/bootstrap"&&!m&&(t.cache="no-cache"),t.credentials="include";let v;try{v=await fetch(Ln+e,{...t,headers:w})}catch{if(n&&!i&&!o){if(d){const H=a("انقطع الاتصال بالإنترنت أثناء الرفع. يرجى إعادة المحاولة عند استقرار الشبكة.","Internet disconnected during file upload. Please retry once reconnected.");throw G(H,!0),new Error(H)}const D=Bn({path:e,method:t.method,body:r}),j=Fn(e,t.method,r,s);return G(a("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية","Connection lost: action saved locally for auto-sync"),!1),{ok:!0,queued:!0,offline:!0,id:D?.id,...j}}throw new Error(a("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(v.status===304)return null;if(!v.ok){const A=await v.text();v.status!==401&&console.error(`API Failed [${e}]: ${v.status} - ${A}`);let D={};try{D=JSON.parse(A)}catch{}if(v.status===401&&(ct(),ti(!1),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login")){typeof localStorage<"u"&&(localStorage.removeItem("darc_token"),localStorage.removeItem("darc_user_id"));try{en()}catch{}s.data=null,s.view="login",typeof window<"u"&&(window.location.hash!=="#login"&&(window.location.hash="#login"),typeof window.renderLogin=="function"&&window.renderLogin())}ft("api.error",`${t.method||"GET"} ${e} (Status ${v.status}: ${D.error||"Failed"})`);const j=new Error(D.error||`Failed to fetch ${e}`);throw j.status=v.status,j}const g=v.headers.get("ETag");if(g&&e==="/api/bootstrap"){Dt=g;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",g)}catch{}}let $;try{const A=await v.text();$=A?JSON.parse(A):{ok:!0}}catch(A){if(e.startsWith("/api/bootstrap")||!n&&!i)throw console.error("[API] JSON parse failed on path:",e,A.message),new Error(a("فشل استلام بيانات النظام بشكل صحيح من الخادم.","Failed to parse workspace data from server."));$={ok:!0}}if(["POST","PATCH","PUT","DELETE"].includes(t.method)){ct();let A=r&&typeof r.id=="string"?r.id:null;if(!A&&$&&typeof $=="object"&&(A=$.id||$.task?.id||$.project?.id||$.comment?.id||$.document?.id||$.data?.id),!A&&typeof e=="string"){const D=e.split("/");D.length>=4&&D[3]&&!D[3].includes("?")&&(A=D[3])}if(A&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(A),y&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(y),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let D=null;if($&&($.task?D={table:"tasks",action:t.method==="POST"?"INSERT":"UPDATE",record:$.task}:$.project?D={table:"projects",action:t.method==="POST"?"INSERT":"UPDATE",record:$.project}:$.comment?D={table:"comments",action:t.method==="POST"?"INSERT":"UPDATE",record:$.comment}:$.document?D={table:"documents",action:t.method==="POST"?"INSERT":"UPDATE",record:$.document}:e==="/api/tasks/reorder"&&(Array.isArray($.items)||r&&Array.isArray(r.items))&&(D={table:"tasks",action:"BATCH_REORDER",record:{items:$.items||r.items}})),!D&&t.method==="DELETE"&&A&&(e.startsWith("/api/tasks/")?D={table:"tasks",action:"DELETE",record:{id:A}}:e.startsWith("/api/projects/")?D={table:"projects",action:"DELETE",record:{id:A}}:e.startsWith("/api/documents/")?D={table:"documents",action:"DELETE",record:{id:A}}:e.startsWith("/api/comments/")&&(D={table:"comments",action:"DELETE",record:{id:A}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(D);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:D?"GRANULAR_DELTA":"STATE_MUTATION",delta:D,timestamp:Date.now()})}catch{}}}}return $}typeof window<"u"&&(window.api=he);var X=null,me=null,mt=64,We=null,Y=-1,F=-1,it=-1,_e=0,xt=!1,P=null,O=null,Oe=0,Ne=0,ve=0,xe=0,oe=!1,ke=null,ie=null,Se="mouse",Te=null,U=null,Zn=null,Qt=null;function Ue(e){let t=document.getElementById("dnd-live-announcer");t||(t=document.createElement("div"),t.id="dnd-live-announcer",t.className="sr-only",t.setAttribute("aria-live","assertive"),t.setAttribute("aria-atomic","true"),document.body.appendChild(t)),t.textContent="",setTimeout(()=>{t.textContent=e},40)}function Vi(e){X||(X=document.createElement("div"),X.className="drag-placeholder");const t=Math.max(48,Math.min(220,e||mt||64));return X.style.cssText=`
    border: 2px dashed var(--brand-teal, #0d6269);
    background: rgba(13, 98, 105, 0.06);
    border-radius: 12px;
    height: ${t}px;
    margin: 8px 0;
    transition: height 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    box-shadow: inset 0 0 16px rgba(13, 98, 105, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-teal, #0d6269);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3px;
  `,X.innerHTML=`<span>↓ ${a("الموضع الجديد للمهمة","Drop position")}</span>`,X}function ro(){X&&X.parentNode&&X.parentNode.removeChild(X)}function Pn(e,t){const n=Array.from(e.querySelectorAll(".task-card:not(.is-dragging):not(#active-drag-ghost)"));return n.length===0?null:n.reduce((i,o)=>{const r=o.getBoundingClientRect(),d=t-(r.top+r.height/2);return d<0&&d>i.offset?{offset:d,element:o}:i},{offset:Number.NEGATIVE_INFINITY}).element}var de=null,le=null,te=null,at=null;function so(){if(typeof document>"u"||!(window.innerWidth<=860||Se==="touch")||te&&te.parentNode)return;const e=Array.from(document.querySelectorAll(".board-column"));if(!e.length)return;te=document.createElement("div"),te.id="dnd-column-dock",te.className="dnd-column-dock",te.setAttribute("role","toolbar"),te.setAttribute("aria-label",a("التنقل السريع بين الأعمدة","Quick column navigator"));let t="";e.forEach(n=>{const i=n.dataset.status,o=n.querySelector(".board-column-title"),r=n.querySelector(".column-dot"),d=r?r.className:"column-dot",l=n.querySelector(".board-count"),c=o?o.innerText.trim():i,p=l?l.innerText.trim():"0";t+=`
      <div class="dock-column-pill" data-dock-status="${i}">
        <span class="${d}" style="width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;"></span>
        <span class="dock-pill-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85px;">${c}</span>
        <span class="dock-pill-count" style="font-size:10px;font-weight:700;opacity:0.85;padding:1px 5px;border-radius:10px;background:rgba(0,0,0,0.06);">${p}</span>
      </div>
    `}),te.innerHTML=t,document.body.appendChild(te),requestAnimationFrame(()=>{te?.classList.add("is-visible")})}function Gi(){if(at=null,te){te.classList.remove("is-visible");const e=te;te=null,setTimeout(()=>{e&&e.parentNode&&e.parentNode.removeChild(e)},220)}}function lo(){typeof document>"u"||(de||(de=document.createElement("div"),de.className="dnd-edge-hotzone left",document.body.appendChild(de)),le||(le=document.createElement("div"),le.className="dnd-edge-hotzone right",document.body.appendChild(le)))}function co(){de&&de.parentNode&&(de.parentNode.removeChild(de),de=null),le&&le.parentNode&&(le.parentNode.removeChild(le),le=null)}var It=-1,rn=null,sn=-1;function Ji(e,t){if(!xt||e<0||t<0)return;let n=document.elementFromPoint(e,t)?.closest(".board-column");const i=document.querySelector(".board, .tasks-board, .board-columns");if(!n&&i){const r=i.getBoundingClientRect();if(t>=r.top-80&&t<=r.bottom+80){const d=Array.from(document.querySelectorAll(".board-column"));d.length>0&&(n=d.reduce((l,c)=>{const p=c.getBoundingClientRect(),u=Math.abs(e-(p.left+p.width/2));return u<l.dist?{col:c,dist:u}:l},{col:null,dist:1/0}).col)}}if(!n){document.querySelectorAll(".board-column").forEach(r=>r.classList.remove("drag-over"));return}document.querySelectorAll(".board-column").forEach(r=>r.classList.toggle("drag-over",r===n));const o=n.querySelector(".board-cards");if(o){if(rn===n&&It>=0&&Math.abs(t-It)<14)return;rn=n,It=t;const r=Vi(mt),d=Pn(o,t);d==null?(!o.contains(r)||o.lastElementChild!==r)&&o.appendChild(r):r.nextElementSibling!==d&&o.insertBefore(r,d)}}function po(){if(We)return;function e(){if(!xt){We=null;return}if(Y>=0&&F>=0){let t=!1;const n=document.querySelector(".board, .board-columns, .tasks-board, [data-board]"),i=typeof window<"u"&&window.innerWidth<=768,o=i?75:85,r=i?24:28;if(n){let v=0;const g=typeof window<"u"&&window.visualViewport?.width||window.innerWidth,$=O?O.getBoundingClientRect():null,A=Y<o||$&&$.left<35,D=Y>g-o||$&&$.right>g-35;if(A){const j=Math.max(0,Y<o?o-Y:35),H=Math.min(1.5,Math.max(.15,j/o));v=-Math.max(4,Math.round(Math.pow(H,1.3)*r))}else if(D){const j=Math.max(0,Y>g-o?Y-(g-o):35),H=Math.min(1.5,Math.max(.15,j/o));v=Math.max(4,Math.round(Math.pow(H,1.3)*r))}if(v!==0){const j=n.scrollLeft;try{n.scrollBy({left:v})}catch{}if(n.scrollLeft===j&&(n.scrollLeft+=v),n.scrollLeft!==j&&(t=!0),t?v<0?(de?.classList.add("is-active"),le?.classList.remove("is-active")):(le?.classList.add("is-active"),de?.classList.remove("is-active")):(de?.classList.remove("is-active"),le?.classList.remove("is-active")),i){const H=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)?.closest(".board-column");if(H){const z=Array.from(document.querySelectorAll(".board-column")).indexOf(H);if(z!==-1&&z!==sn&&(sn=z,typeof navigator<"u"&&navigator.vibrate))try{navigator.vibrate(12)}catch{}}}}else de?.classList.remove("is-active"),le?.classList.remove("is-active")}const d=95,l=26,c=document.getElementById("main-content")||document.querySelector(".workspace-content"),p=c?c.getBoundingClientRect():null,u=p?Math.max(60,p.top+60):80,m=p?Math.min(window.innerHeight-30,p.bottom-60):window.innerHeight-80;if(F>m){const v=Math.min(1.5,Math.max(.2,(F-m)/d)),g=Math.max(4,Math.round(v*l));if(c&&c.scrollHeight>c.clientHeight){const $=c.scrollTop;c.scrollTop+=g,c.scrollTop!==$&&(t=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const $=window.scrollY;window.scrollBy({top:g,behavior:"instant"}),window.scrollY!==$&&(t=!0)}}else if(F<u){const v=Math.min(1.5,Math.max(.2,(u-F)/d)),g=-Math.max(4,Math.round(v*l));if(c&&c.scrollHeight>c.clientHeight){const $=c.scrollTop;c.scrollTop+=g,c.scrollTop!==$&&(t=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const $=window.scrollY;window.scrollBy({top:g,behavior:"instant"}),window.scrollY!==$&&(t=!0)}}const y=document.elementFromPoint(Y,F),w=y?.closest(".board-cards")||y?.closest(".board-column")?.querySelector(".board-cards");if(w&&w.scrollHeight>w.clientHeight){const v=w.getBoundingClientRect(),g=60;if(F>v.top&&F<v.top+g){const $=(g-(F-v.top))/g;w.scrollTop-=Math.max(3,Math.round($*18)),t=!0}else if(F<v.bottom&&F>v.bottom-g){const $=(F-(v.bottom-g))/g;w.scrollTop+=Math.max(3,Math.round($*18)),t=!0}}t&&Ji(Y,F)}We=requestAnimationFrame(e)}We=requestAnimationFrame(e)}function uo(){We&&(cancelAnimationFrame(We),We=null)}async function Ct(e,t,n=null){if(!e){ee();return}e.classList.remove("drag-over");const i=n||me;me=null;const o=e.dataset.status;if(!i||!o){ee();return}const r=(s.data?.tasks||[]).find(x=>x.id===i);if(!r){ee();return}const d=e.querySelector(".board-cards");if(!d){ee();return}const l=r.status===o||o==="review"&&["review","approval","blocked"].includes(r.status);if(!l&&o==="done"&&r.dependencies&&r.dependencies.length&&r.dependencies.filter(x=>{const _=s.data.tasks.find(E=>E.id===x);return _&&_.status!=="done"}).length)return ee(),G(a("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);const c=Array.from(d.querySelectorAll(".task-card")).filter(x=>x.dataset.taskId!==i),p=c.map(x=>x.dataset.taskId).filter(Boolean);let u=p.length;if(X&&X.parentNode===d)if(!X.previousElementSibling||X.previousElementSibling.classList?.contains("empty"))u=0;else{let x=X.nextElementSibling;for(;x&&(!x.classList?.contains("task-card")||x.dataset?.taskId===i||x.classList?.contains("is-dragging"));)x=x.nextElementSibling;if(x&&x.dataset?.taskId&&x.dataset.taskId!==i){const _=p.indexOf(x.dataset.taskId);u=_!==-1?_:p.length}else u=p.length}else if(c.length>0){const x=t&&t>0?t:F>0?F:0,_=c[0].getBoundingClientRect(),E=c[c.length-1].getBoundingClientRect();if(x<=_.top+_.height*.45)u=0;else if(x>=E.bottom-E.height*.45)u=p.length;else{const k=Pn(d,x);if(k&&k.dataset.taskId!==i){const T=p.indexOf(k.dataset.taskId);T!==-1&&(u=T)}}}else u=0;const m=Array.from(d.querySelectorAll(".task-card")).findIndex(x=>x.dataset.taskId===i);if(l&&m!==-1&&(u===m||u===m+1)){ee();return}const y=r.status,w=(s.data.tasks||[]).map(x=>({id:x.id,status:x.status,sortOrder:x.sortOrder||x.sort_order,progress:x.progress,customFields:JSON.parse(JSON.stringify(x.customFields||x.custom_fields||{}))}));ee();const v=[...p];v.splice(u,0,i),o==="review"&&["review","approval","blocked"].includes(r.status)||(r.status=o),r.status==="done"?r.progress=100:r.status==="not_started"?r.progress=0:r.status==="in_progress"&&(r.progress===0||!r.progress)?r.progress=50:["review","approval"].includes(r.status)&&(r.progress||0)<80&&(r.progress=80);let g=100,$=!1;if(v.length<=1)g=100;else if(u===0){const x=(s.data?.tasks||[]).find(E=>E.id===v[1]),_=x?.sortOrder||x?.sort_order||100;g=Math.max(1,Math.round(_/2)),g>=_&&($=!0)}else if(u===v.length-1){const x=(s.data?.tasks||[]).find(_=>_.id===v[v.length-2]);g=(x?.sortOrder||x?.sort_order||100)+100}else{const x=(s.data?.tasks||[]).find(T=>T.id===v[u-1]),_=(s.data?.tasks||[]).find(T=>T.id===v[u+1]),E=x?.sortOrder||x?.sort_order||100,k=_?.sortOrder||_?.sort_order||200;k-E>1?g=Math.round((E+k)/2):$=!0}const A=Date.now();window._recentlyMovedTasks||(window._recentlyMovedTasks=new Map);const D=[];$?v.forEach((x,_)=>{const E=(s.data?.tasks||[]).find(k=>k.id===x);if(E){const k=(_+1)*100;E.sortOrder=k,E.sort_order=k,E.customFields||(E.customFields={}),E.customFields.sortOrder=k,E.customFields.sort_order=k,E.custom_fields||(E.custom_fields={}),E.custom_fields.sortOrder=k,E.custom_fields.sort_order=k,window._recentlyMovedTasks.set(x,{status:E.status,sortOrder:k,progress:E.progress,timestamp:A}),D.push({id:E.id,status:E.status,sortOrder:k,customFields:E.customFields})}}):(r.sortOrder=g,r.sort_order=g,r.customFields||(r.customFields={}),r.customFields.sortOrder=g,r.customFields.sort_order=g,r.custom_fields||(r.custom_fields={}),r.custom_fields.sortOrder=g,r.custom_fields.sort_order=g,window._recentlyMovedTasks.set(r.id,{status:r.status,sortOrder:g,progress:r.progress,timestamp:A}),D.push({id:r.id,status:r.status,sortOrder:g,customFields:r.customFields}));for(const[x,_]of window._recentlyMovedTasks.entries())A-_.timestamp>45e3&&window._recentlyMovedTasks.delete(x);bn("custom"),s.taskSortPref="custom",s.projectTaskSort="custom",s.myTaskSort="custom",re(!0);const j=document.querySelector(".board, .tasks-board, .board-columns")?.querySelector(`.board-column[data-status="${o}"]`),H=typeof window<"u"&&window.innerWidth<=768;if(j&&H)try{j.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}catch{}if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(20)}catch{}y!==o&&document.querySelectorAll(`.board-column[data-status="${o}"] .board-count, .board-column[data-status="${y}"] .board-count`).forEach(x=>{x.classList.remove("count-updated"),x.offsetWidth,x.classList.add("count-updated"),setTimeout(()=>x.classList.remove("count-updated"),350)});const z=document.querySelector(`.task-card[data-task-id="${i}"]`);z&&(z.classList.add("just-dropped"),setTimeout(()=>z?.classList.remove("just-dropped"),450));const q=e.querySelector(".board-column-title"),M=q?q.innerText.trim():o;Ue(a(`تم إفلات المهمة في عمود: ${M}، الموضع ${u+1}.`,`Dropped task into column: ${M}, position ${u+1}.`)),D.forEach(x=>{x?.id&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(x.id)}),typeof window<"u"&&typeof window.notifyStateMutation=="function"&&window.notifyStateMutation({table:"tasks",action:"BATCH_REORDER",record:{items:D}}),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,D.forEach(x=>{window._pendingReorderBatch.set(x.id,x)}),window._reorderSyncTimer=setTimeout(()=>{const x=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),he("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:x})}).catch(_=>{console.warn("Reorder sync error, performing local rollback:",_),w.forEach(E=>{const k=(s.data?.tasks||[]).find(T=>T.id===E.id);k&&(k.status=E.status,k.sortOrder=E.sortOrder,k.sort_order=E.sortOrder,k.progress=E.progress,k.customFields=E.customFields)}),re(!0),G(a("فشل حفظ الترتيب الجديد في الخادم. تم التراجع عن التعديل تلقائياً.","Failed to save task order to server. Reverted automatically."),!0)})},10)}function ee(){if(ie&&(clearTimeout(ie),ie=null),O&&O.parentNode&&O.parentNode.removeChild(O),O=null,P){try{ke!=null&&P.releasePointerCapture(ke)}catch{}P.style.opacity="",P.style.pointerEvents="",P.style.touchAction="",P.classList.remove("is-dragging"),P.classList.remove("is-touch-charging"),P.classList.remove("is-touch-holding")}P=null;const e=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");e&&(e.style.scrollSnapType=""),document.body.classList.remove("is-touch-dragging"),ke=null,oe=!1,xt=!1,mo=!1,gt=!1,window._isDraggingTask=!1,window._isTouchHoldingTask=!1,me=null,Y=-1,F=-1,it=-1,_e=0,It=-1,rn=null,sn=-1,Se="mouse",de?.classList.remove("is-active"),le?.classList.remove("is-active"),Gi(),co(),uo(),document.querySelectorAll(".board-column").forEach(t=>t.classList.remove("drag-over")),ro(),document.body.style.userSelect="",document.body.style.webkitUserSelect="",document.body.style.cursor="",window._pendingRenderAfterDrag&&(window._pendingRenderAfterDrag=!1,requestAnimationFrame(()=>re(!0)))}function Ht(e,t,n=Se){if(!P||oe)return;Se=n;const i=P.dataset.taskId;if(!P.isConnected&&i){const g=document.querySelector(`.task-card[data-task-id="${i}"]`);g&&(P=g)}const o=(s.data?.tasks||[]).find(g=>g.id===P.dataset.taskId);if(!Je(o)){ee();return}if(e===0&&t===0&&(Oe!==0||Ne!==0)&&(e=Oe,t=Ne),oe=!0,xt=!0,window._isDraggingTask=!0,window._isTouchHoldingTask=!1,me=P.dataset.taskId,Y=e,F=t,it=e,_e=0,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(35)}catch{}const r=P.getBoundingClientRect();mt=r.height;const d=(P.closest(".board-column")||document.querySelector(".board-column"))?.getBoundingClientRect(),l=d?Math.round(d.width-24):260,c=Math.max(230,Math.min(320,l)),p=r&&Number.isFinite(r.width)&&r.width>=180&&r.width<=400?Math.round(r.width):c;ve=e-r.left,xe=t-r.top,(isNaN(ve)||ve<=0||ve>p)&&(ve=p/2),(isNaN(xe)||xe<=0||xe>(r.height||120))&&(xe=(r.height||120)/2);const u=n==="touch"?32:0,m=Math.round(e-ve),y=Math.round(t-xe-u),w=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");if(w&&(w.style.scrollSnapType="none"),O=P.cloneNode(!0),O.id="active-drag-ghost",O.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: ${p}px;
    min-width: 230px;
    max-width: 320px;
    box-sizing: border-box;
    contain: none;
    content-visibility: visible;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.98;
    transform: translate3d(${m}px, ${y}px, 0) scale(1.025);
    box-shadow: 0 20px 42px -8px rgba(13, 98, 105, 0.28), 0 8px 18px rgba(0, 0, 0, 0.12);
    border: 1.5px solid var(--brand-teal, #0d6269);
    background: var(--surface, #ffffff);
    border-radius: 12px;
    will-change: transform;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: none !important;
    cursor: grabbing !important;
  `,document.body.appendChild(O),ke!=null&&P)try{P.releasePointerCapture(ke)}catch{}P.classList.remove("is-touch-charging"),P.classList.remove("is-touch-holding"),P.classList.add("is-dragging"),P.style.opacity="0.22",P.style.pointerEvents="none",document.body.classList.add("is-touch-dragging"),document.body.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.cursor="grabbing",lo(),so();const v=P.closest(".board-column");if(v){v.classList.add("drag-over");const g=v.querySelector(".board-cards");if(g){const $=Vi(mt),A=Pn(g,t);A==null?g.appendChild($):g.insertBefore($,A)}}po()}function Xi(e,t,n=Se){if(!xt||!O||e===0&&t===0&&(Oe!==0||Ne!==0)||!Number.isFinite(e)||!Number.isFinite(t))return;if(Se=n,Y=e,F=t,n==="touch")_e=0;else{const d=it>=0?e-it:0,l=Math.max(-2,Math.min(2,(Math.abs(d)<1.5?0:d)*.12));_e+=(l-_e)*.22,Math.abs(_e)<.12&&(_e=0)}it=e;const i=n==="touch"?32:0,o=Math.round(e-ve),r=Math.round(t-xe-i);if(Number.isFinite(o)&&Number.isFinite(r)){const d=_e!==0?` rotate(${_e.toFixed(1)}deg)`:"";O.style.transform=`translate3d(${o}px, ${r}px, 0) scale(1.025)${d}`}if(te){const d=te.getBoundingClientRect(),l=t>=d.top-15&&t<=d.bottom+18&&e>=d.left-10&&e<=d.right+10,c=te.querySelectorAll(".dock-column-pill");let p=null;if(l?c.forEach(u=>{const m=u.getBoundingClientRect(),y=e>=m.left&&e<=m.right&&t>=m.top-15&&t<=m.bottom+15;u.classList.toggle("is-hovered",y),y&&(p=u.dataset.dockStatus)}):c.forEach(u=>u.classList.remove("is-hovered")),p&&p!==at){if(at=p,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(14)}catch{}}else p||(at=null)}Ji(e,t)}async function Ki(e,t){if(ie&&(clearTimeout(ie),ie=null),P&&(P.classList.remove("is-touch-charging"),P.classList.remove("is-touch-holding")),!oe&&!me){ee();return}if(at&&me){const i=document.querySelector(`.board-column[data-status="${at}"]`),o=me;if(me=null,O&&O.parentNode&&O.parentNode.removeChild(O),O=null,Gi(),i&&o){await Ct(i,0,o);return}}const n=Math.hypot(e-Oe,t-Ne);if(window._justDroppedTaskId=me,window._justDroppedAt=Date.now(),window._isDraggingTask=!1,n>4&&me){let i=document.elementFromPoint(e,t)?.closest(".board-column")||X&&X.closest(".board-column");if(!i){const d=Array.from(document.querySelectorAll(".board-column"));d.length>0&&(i=d.reduce((l,c)=>{const p=c.getBoundingClientRect(),u=Math.abs(e-(p.left+p.width/2));return u<l.dist?{col:c,dist:u}:l},{col:null,dist:1/0}).col)}const o=me,r=X&&X.parentNode?X.getBoundingClientRect():null;if(O&&r&&r.width>0&&r.height>0){O.style.transition="transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.14s ease, opacity 0.14s ease",O.style.transform=`translate3d(${r.left}px, ${r.top}px, 0) scale(1) rotate(0deg)`,O.style.boxShadow="0 4px 14px rgba(13, 98, 105, 0.12)",setTimeout(async()=>{O&&O.parentNode&&O.parentNode.removeChild(O),O=null,i&&o?await Ct(i,t,o):ee()},130);return}if(i&&o){O&&O.parentNode&&O.parentNode.removeChild(O),O=null,await Ct(i,t,o);return}}ee()}var fo=14,mo=!1,gt=!1,dn=!1;document.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;const t=e.target instanceof Element?e.target:e.target?.parentElement||null,n=t?.closest?.(".task-card");if(!n||t?.closest?.("button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]"))return;const i=(s.data?.tasks||[]).find(r=>r.id===n.dataset.taskId);if(!Je(i))return;P=n,ke=e.pointerId,Oe=e.clientX,Ne=e.clientY,Y=e.clientX,F=e.clientY,it=e.clientX,oe=!1,gt=!1;const o=n.getBoundingClientRect();if(mt=o.height,ve=e.clientX-o.left,xe=e.clientY-o.top,isNaN(ve)&&(ve=o.width/2),isNaN(xe)&&(xe=o.height/2),dn=!!t?.closest?.(".task-drag-handle"),e.pointerType==="touch")Se="touch",window._isTouchHoldingTask=!0,dn?Ht(e.clientX,e.clientY,"touch"):(n.classList.add("is-touch-charging"),ie=setTimeout(()=>{if(ie=null,P&&!gt&&!oe){if(n.classList.remove("is-touch-charging"),typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(28)}catch{}Ht(Y>=0?Y:Oe,F>=0?F:Ne,"touch")}},260));else{Se=e.pointerType||"mouse";try{n.setPointerCapture(e.pointerId)}catch{}}},{passive:!0});document.addEventListener("pointermove",e=>{if(!(!P||gt)&&!(ke!=null&&e.pointerId!==ke)){if(Y=e.clientX,F=e.clientY,!oe){const t=Math.hypot(e.clientX-Oe,e.clientY-Ne);if(e.pointerType==="touch"){if(Se="touch",dn)t>=4&&Ht(e.clientX,e.clientY,"touch");else if(t>fo){gt=!0,window._isTouchHoldingTask=!1,ie&&(clearTimeout(ie),ie=null),P&&(P.classList.remove("is-touch-charging"),P.classList.remove("is-touch-holding"));return}}else if(Se=e.pointerType||"mouse",t>=6)Ht(e.clientX,e.clientY,e.pointerType||"mouse");else return}oe&&(e.cancelable&&e.preventDefault(),Xi(e.clientX,e.clientY,e.pointerType))}},{passive:!1});document.addEventListener("pointerup",async e=>{if(ie&&(clearTimeout(ie),ie=null),P&&(P.classList.remove("is-touch-charging"),P.classList.remove("is-touch-holding")),ke!=null&&P)try{P.releasePointerCapture(ke)}catch{}if(!oe){ee();return}await Ki(e.clientX,e.clientY)});document.addEventListener("pointercancel",e=>{oe||ee()});window.addEventListener("blur",()=>{(oe||P)&&ee()});document.addEventListener("visibilitychange",()=>{document.hidden&&(oe||P)&&ee()});window.addEventListener("orientationchange",()=>{(oe||P)&&ee()});window.addEventListener("resize",()=>{(oe||P)&&ee()});window.addEventListener("touchmove",e=>{if(oe&&(e.cancelable&&e.preventDefault(),e.touches&&e.touches.length>0)){const t=e.touches[0];t&&t.clientX>0&&t.clientY>0&&(Y=t.clientX,F=t.clientY,Xi(t.clientX,t.clientY,"touch"))}},{passive:!1});window.addEventListener("touchend",async e=>{if(window._isTouchHoldingTask=!1,ie&&(clearTimeout(ie),ie=null),oe){const t=e.changedTouches&&e.changedTouches[0]?e.changedTouches[0]:null;await Ki(t?t.clientX:Y>=0?Y:Oe,t?t.clientY:F>=0?F:Ne)}},{passive:!0});window.addEventListener("touchcancel",()=>{ee()});document.addEventListener("dragstart",e=>{(e.target instanceof Element?e.target:e.target?.parentElement||null)?.closest?.(".task-card")&&e.preventDefault()});document.addEventListener("click",e=>{window._justDroppedAt&&Date.now()-window._justDroppedAt<500&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},!0);document.addEventListener("keydown",async e=>{if((e.target instanceof Element?e.target:e.target?.parentElement||null)?.closest?.('input, textarea, select, [contenteditable="true"]')||document.querySelector(".modal-overlay, #taskModal, .modal-backdrop"))return;const t=document.activeElement?.closest?.(".task-card");if((e.key===" "||e.altKey&&(e.key==="m"||e.key==="M"))&&t){const n=(s.data?.tasks||[]).find(i=>i.id===t.dataset.taskId);if(!Je(n))return;if(e.preventDefault(),Te)Te===n.id&&(U?.classList.remove("is-keyboard-grabbed"),U?.setAttribute("aria-grabbed","false"),Te=null,U=null,window._isKeyboardDraggingTask=!1,Ue(a("تم إلغاء الإمساك بالمهمة.","Task released.")));else{Te=n.id,U=t,Zn=n.status,Qt=n.sortOrder||n.sort_order,window._isKeyboardDraggingTask=!0,t.classList.add("is-keyboard-grabbed"),t.setAttribute("aria-grabbed","true");const i=t.closest(".board-column")?.querySelector(".board-column-title")?.innerText?.trim()||"",o=a(n.titleAr,n.titleEn);Ue(a(`تم الإمساك بالمهمة "${o}". العمود الحالي: ${i}. استخدم الأسهم للتحريك، Enter للإفلات، Escape للإلغاء.`,`Grabbed task "${o}". Current column: ${i}. Use arrow keys to move, Enter to drop, Escape to cancel.`))}return}if(Te&&U){const n=(s.data?.tasks||[]).find(l=>l.id===Te);if(!n)return;const i=U.closest(".board-column");if(!i)return;const o=Array.from(document.querySelectorAll(".board-column")),r=o.indexOf(i),d=document.documentElement.dir==="rtl"||s.lang==="ar";if(e.key==="ArrowUp"){e.preventDefault();const l=U.previousElementSibling;l&&l.classList.contains("task-card")&&(i.querySelector(".board-cards").insertBefore(U,l),U.focus(),Ue(a("تم التحريك للأعلى.","Moved up.")));return}if(e.key==="ArrowDown"){e.preventDefault();const l=U.nextElementSibling;l&&l.classList.contains("task-card")&&(i.querySelector(".board-cards").insertBefore(l,U),U.focus(),Ue(a("تم التحريك للأسفل.","Moved down.")));return}if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const l=d?"ArrowLeft":"ArrowRight",c=e.key===l?r+1:r-1;if(c>=0&&c<o.length){const p=o[c],u=p.querySelector(".board-cards");if(u){u.appendChild(U),U.focus();const m=p.querySelector(".board-column-title")?.innerText?.trim()||"";Ue(a(`تم النقل إلى عمود: ${m}.`,`Moved to column: ${m}.`))}}return}if(e.key==="Enter"){e.preventDefault();const l=U.closest(".board-column"),c=Te;if(U.classList.remove("is-keyboard-grabbed"),U.setAttribute("aria-grabbed","false"),Te=null,U=null,window._isKeyboardDraggingTask=!1,l&&c){const p=U?U.getBoundingClientRect():null;await Ct(l,p?p.top+10:0,c)}return}if(e.key==="Escape"){e.preventDefault(),U.classList.remove("is-keyboard-grabbed"),U.setAttribute("aria-grabbed","false"),Te=null,U=null,window._isKeyboardDraggingTask=!1,n.status=Zn,Qt!==null&&(n.sortOrder=Qt),re(!0),Ue(a("تم إلغاء النقل وإعادة المهمة لمكانها الأصلي.","Move cancelled. Task returned to original position."));return}}});export{f as $,yi as A,pn as At,re as B,s as Bt,kn as C,bn as Ct,ko as D,S as Dt,Ba as E,mn as Et,ne as F,en as Ft,li as G,La as H,Le as I,Qn as It,$a as J,Re as K,vn as L,cn as Lt,wn as M,da as Mt,wo as N,G as Nt,qe as O,bo as Ot,Oa as P,yo as Pt,wa as Q,Pa as R,Ae as Rt,ue as S,ca as St,hi as T,ga as Tt,vo as U,xo as V,ho as W,bt as X,a as Y,ai as Z,Dn as _,ci as _t,Ao as a,st as at,An as b,yn as bt,Ya as c,oi as ct,Qa as d,yt as dt,_a as et,xi as f,b as ft,Ai as g,Ut as gt,Ha as h,Me as ht,Eo as i,va as it,xn as j,qt as jt,ja as k,la as kt,So as l,ni as lt,vt as m,Z as mt,he as n,ri as nt,ft as o,Ea as ot,qa as p,nn as pt,R as q,ct as r,ha as rt,To as s,Aa as st,Ln as t,ii as tt,$e as u,ya as ut,Ci as v,ht as vt,$t as w,ti as wt,$o as x,ma as xt,Si as y,Sa as yt,De as z,sa as zt};
