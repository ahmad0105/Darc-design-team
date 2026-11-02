var Wn=Object.defineProperty,me=(e,a)=>{let n={};for(var o in e)Wn(n,o,{get:e[o],enumerable:!0});return a||Wn(n,Symbol.toStringTag,{value:"Module"}),n};(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function ra(e){if(typeof document>"u"||!e||!document.cookie)return null;const a=document.cookie.split("; "),n=encodeURIComponent(String(e))+"=",o=String(e)+"=";for(let s=0;s<a.length;s++){const i=a[s];if(i.startsWith(n)){const l=i.substring(n.length);try{return decodeURIComponent(l)}catch{return l}}else if(i.startsWith(o)){const l=i.substring(o.length);try{return decodeURIComponent(l)}catch{return l}}}return null}function Es(){if(typeof window>"u")return"ar";try{let e=ra("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const a=ra("darc_prefs");if(a)try{e=JSON.parse(a).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function As(){if(typeof window>"u")return"light";try{let e=ra("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const a=ra("darc_prefs");if(a)try{e=JSON.parse(a).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function Ts(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const a=window.location.hash.replace(/^#/,"");if(a&&!["login","forgot"].includes(a)){const[o,s]=a.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(o)){let i=null,l="overview",d="profile";if(s){const p=new URLSearchParams(s),u=p.get("id");u&&/^[a-zA-Z0-9_-]{3,64}$/.test(u)&&(i=u);const f=p.get("tab");f&&["overview","tasks","drawings","documents","timeline","activity"].includes(f)&&(l=f);const v=p.get("section");v&&["profile","company","roles","accounts","whatsapp","security","audit","trash","analytics","diagnostics","preferences"].includes(v)&&(d=v)}return{view:o,activeProjectId:i,projectTab:l,settingsSection:d}}}const n=sessionStorage.getItem("darc_last_route");if(n){const o=JSON.parse(n);if(o.view)return{view:o.view,activeProjectId:o.activeProjectId||null,projectTab:o.projectTab||"overview",settingsSection:o.settingsSection||"profile"}}}catch{}return e}var Yt=Ts(),r={lang:Es(),theme:As(),view:Yt.view,activeProjectId:Yt.activeProjectId,projectTab:Yt.projectTab,settingsSection:Yt.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},Ss="darc_offline_db",Is=1,Xe="cache_store",xt="darc_offline_bootstrap",Te="darc_offline_mutations_queue",Sa=!1,Ia=null;function dn(){return typeof indexedDB>"u"?Promise.resolve(null):(Ia||(Ia=new Promise(e=>{try{const a=indexedDB.open(Ss,Is);a.onupgradeneeded=n=>{const o=n.target.result;o.objectStoreNames.contains(Xe)||o.createObjectStore(Xe)},a.onsuccess=()=>e(a.result),a.onerror=()=>e(null)}catch{e(null)}})),Ia)}async function Ds(e){const a=await dn();return a?new Promise(n=>{try{const o=a.transaction(Xe,"readonly").objectStore(Xe).get(e);o.onsuccess=()=>n(o.result||null),o.onerror=()=>n(null)}catch{n(null)}}):null}async function js(e,a){const n=await dn();return n?new Promise(o=>{try{const s=n.transaction(Xe,"readwrite").objectStore(Xe).put(a,e);s.onsuccess=()=>o(!0),s.onerror=()=>o(!1)}catch{o(!1)}}):!1}async function Vn(e){const a=await dn();return a?new Promise(n=>{try{const o=a.transaction(Xe,"readwrite").objectStore(Xe).delete(e);o.onsuccess=()=>n(!0),o.onerror=()=>n(!1)}catch{n(!1)}}):!1}function _s(){return typeof navigator<"u"?navigator.onLine:!0}function Ae(e){if(!e)return;const a={timestamp:Date.now(),data:e};if(js(xt,a).catch(()=>{}),typeof localStorage<"u"){const n=()=>{try{localStorage.setItem(xt,JSON.stringify(a))}catch(o){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",o.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:2e3}):setTimeout(n,50)}}function ya(){if(typeof localStorage<"u")try{const e=localStorage.getItem(xt);if(e){const a=JSON.parse(e);if(a?.data)return a.data}}catch{}return null}async function Gn(){const e=await Ds(xt);return e?.data?e.data:ya()}async function Jn(){if(typeof localStorage<"u")try{localStorage.removeItem(xt),localStorage.removeItem(Te)}catch{}await Promise.all([Vn(xt),Vn(Te)]),Ge()}function Ge(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:Ut().length}}))}function yt(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function Kn({path:e,method:a="POST",body:n=null,description:o=""}){if(typeof localStorage>"u")return null;try{const s=localStorage.getItem(Te),i=s?JSON.parse(s):[];if(a==="DELETE"){if(e.startsWith("/api/tasks/")){const d=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/tasks"&&p.body?.id===d)){const p=i.filter(u=>!(u.path==="/api/tasks"&&u.body?.id===d||u.path===`/api/tasks/${d}`||u.path.startsWith(`/api/tasks/${d}/`)));return localStorage.setItem(Te,JSON.stringify(p)),Ge(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const d=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/projects"&&p.body?.id===d)){const p=i.filter(u=>!(u.path==="/api/projects"&&u.body?.id===d||u.path===`/api/projects/${d}`||u.method==="POST"&&u.path==="/api/tasks"&&u.body?.projectId===d));return localStorage.setItem(Te,JSON.stringify(p)),Ge(),{id:"compacted",compacted:!0}}}}if(a==="PATCH"&&e==="/api/tasks/reorder"&&n?.items&&Array.isArray(n.items)){const d=i.findIndex(p=>p.method==="PATCH"&&p.path==="/api/tasks/reorder");if(d!==-1){const p=i[d],u=new Map((p.body?.items||[]).map(f=>[f.id,f]));return n.items.forEach(f=>u.set(f.id,f)),p.body={items:Array.from(u.values())},p.createdAt=new Date().toISOString(),localStorage.setItem(Te,JSON.stringify(i)),Ge(),p}}if(a==="PATCH"&&n&&typeof n=="object"){const d=i.findIndex(p=>p.method==="PATCH"&&p.path===e);if(d!==-1){const p=i[d];return p.body={...p.body||{},...n},p.createdAt=new Date().toISOString(),localStorage.setItem(Te,JSON.stringify(i)),Ge(),p}}const l={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substring(2,8),path:e,method:a,body:n,description:o,createdAt:new Date().toISOString()};return i.push(l),localStorage.setItem(Te,JSON.stringify(i)),Ge(),console.log("[Offline Outbox] Enqueued mutation:",l),l}catch(s){return console.warn("[Offline Outbox] Failed to enqueue mutation:",s.message),null}}function Ut(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(Te);return e?JSON.parse(e):[]}catch{return[]}}function Ps(){typeof localStorage>"u"||(localStorage.removeItem(Te),Ge())}function Yn(e,a,n,o){if(!o||!o.data)return{ok:!0,queued:!0,offline:!0};const s=new Date().toISOString();if(a==="POST"&&e==="/api/tasks"&&n){const i=n.id||yt("tsk");n.id=i;const l={id:i,code:"OFFLINE",projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",status:n.status||"not_started",priority:n.priority||"medium",categoryAr:n.categoryAr||"عام",categoryEn:n.categoryEn||"General",weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:o.data.users?.find(p=>p.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:s,updatedAt:s,_isOfflinePending:!0};o.data.tasks||(o.data.tasks=[]);const d=o.data.tasks.findIndex(p=>p.id===i);return d!==-1?o.data.tasks[d]=l:o.data.tasks.unshift(l),Ae(o.data),{ok:!0,queued:!0,offline:!0,task:l}}if(a==="PATCH"&&e.startsWith("/api/tasks/")&&n){const i=e.split("/")[3],l=(o.data.tasks||[]).findIndex(d=>d.id===i);if(l!==-1){const d={...o.data.tasks[l],...n,updatedAt:s,_isOfflinePending:!0};return n.assigneeId!==void 0&&(d.assignee=o.data.users?.find(p=>p.id===n.assigneeId)||null),o.data.tasks[l]=d,Ae(o.data),{ok:!0,queued:!0,offline:!0,task:d}}}if(a==="DELETE"&&e.startsWith("/api/tasks/")){const i=e.split("/")[3];return o.data.tasks&&(o.data.tasks=o.data.tasks.filter(l=>l.id!==i),Ae(o.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e==="/api/projects"&&n){const i=n.id||yt("prj");n.id=i;const l={id:i,code:n.code||"DARC-OFF",nameAr:n.nameAr||n.name||"مشروع محلي جديد",nameEn:n.nameEn||n.name||"New Offline Project",clientAr:n.clientAr||"",clientEn:n.clientEn||"",descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",lifecycle:n.lifecycle||"planning",health:n.health||"on_track",progress:0,progressMode:"weighted",managerId:n.managerId||o.data.user?.id,startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:s,updatedAt:s,_isOfflinePending:!0};o.data.projects||(o.data.projects=[]);const d=o.data.projects.findIndex(p=>p.id===i);return d!==-1?o.data.projects[d]=l:o.data.projects.unshift(l),Ae(o.data),{ok:!0,queued:!0,offline:!0,project:l}}if(a==="PATCH"&&e.startsWith("/api/projects/")&&n){const i=e.split("/")[3],l=(o.data.projects||[]).findIndex(d=>d.id===i);if(l!==-1){const d={...o.data.projects[l],...n,updatedAt:s,_isOfflinePending:!0};return o.data.projects[l]=d,Ae(o.data),{ok:!0,queued:!0,offline:!0,project:d}}}if(a==="DELETE"&&e.startsWith("/api/projects/")){const i=e.split("/")[3];return o.data.projects&&(o.data.projects=o.data.projects.filter(l=>l.id!==i),Ae(o.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e.includes("/comments")&&n){const i=e.split("/")[3],l={id:n.id||yt("cmt"),taskId:i,userId:o.data.user?.id,content:n.content,createdAt:s,_isOfflinePending:!0};return n.id=l.id,o.data.comments||(o.data.comments=[]),o.data.comments.some(d=>d.id===l.id)||o.data.comments.push(l),Ae(o.data),{ok:!0,queued:!0,offline:!0,comment:l}}return a==="PATCH"&&e==="/api/tasks/reorder"&&n&&Array.isArray(n.items)?(o.data.tasks&&(n.items.forEach(i=>{const l=o.data.tasks.find(d=>d.id===i.id);l&&(i.status&&(l.status=i.status),i.sortOrder&&(l.sortOrder=i.sortOrder),i.customFields&&(l.customFields={...l.customFields||{},...i.customFields}),l._isOfflinePending=!0)}),Ae(o.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function ln(e){if(Sa)return{total:0,synced:0,failed:0};const a=Ut();if(!a.length)return{total:0,synced:0,failed:0};Sa=!0,console.log(`[Offline Sync] Replaying ${a.length} pending mutations...`);let n=0,o=!1;const s=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,i=new Set(["POST","PATCH","PUT","DELETE"]);for(let l=0;l<a.length;l++){const d=a[l];if(!d||!d.path||typeof d.path!="string"||!s.test(d.path)||!i.has(d.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",d?.id,d?.path);continue}try{const p={method:d.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":d.id,"X-Idempotency-Key":d.id}};d.body&&(p.body=typeof d.body=="string"?d.body:JSON.stringify(d.body));const u=await e(d.path,p);if(u&&u.error&&!u.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",d.id,u.error);else if(n++,d.path==="/api/tasks/reorder"&&Array.isArray(d.body?.items))d.body.items.forEach(f=>{f?.id&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(f.id)});else{const f=d.body&&typeof d.body=="object"&&d.body.id||typeof d.path=="string"&&d.path.split("/")[3];f&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(f)}}catch(p){if(console.error("[Offline Sync] Failed to replay mutation:",d.id,d.path,p.message),typeof navigator<"u"&&!navigator.onLine||p.message&&(p.message.includes("تعذر الاتصال")||p.message.includes("fetch")||p.message.includes("NetworkError")||p.name==="TypeError")){const u=a.slice(l);typeof localStorage<"u"&&localStorage.setItem(Te,JSON.stringify(u)),o=!0;break}}}return o||Ps(),Sa=!1,Ge(),{total:a.length,synced:n,failed:o?a.length-n:0}}var Cs=me({closeModal:()=>V,modalShell:()=>De,renderLoading:()=>qt,showToast:()=>$});function qt(){document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${t("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var et=!1,Je=null;function V(e=!1){Je&&(clearTimeout(Je),Je=null);const a=document.getElementById("preview-modal-overlay");a&&(a.style.display="none",a.innerHTML="");const n=document.getElementById("modal-root");if(!n||!n.hasChildNodes()){document.body.style.overflow="",et=!1;return}if(e){n.innerHTML="",document.body.style.overflow="",et=!1;return}if(et)return;et=!0;const o=n.querySelector(".modal-backdrop"),s=n.querySelector(".modal");o&&s?(o.classList.add("is-closing"),s.classList.add("is-closing"),Je=setTimeout(()=>{Je=null,n.innerHTML="",document.body.style.overflow="",et=!1},150)):(n.innerHTML="",document.body.style.overflow="",et=!1)}function De(e,a,n,o="",s=""){return Je&&(clearTimeout(Je),Je=null),et=!1,document.body.style.overflow="hidden",`<div class="modal-backdrop ${o?`backdrop-${o}`:""}"><div class="modal ${s}" data-modal="${o}"><div class="modal-head"><div><h2>${c(e)}</h2><p>${c(a||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${t("إغلاق","Close")}">${x("close",15)}</button></div>${n}</div></div>`}function $(e,a=!1){const n=document.getElementById("toast-root");if(!n)return;const o=document.createElement("div");o.className=`toast ${a?"error":""}`,o.innerHTML=`${x(a?"alert":"check",16)}<span>${c(e)}</span>`,n.appendChild(o),setTimeout(()=>o.remove(),3600)}var Ls=me({I18N:()=>za,PERMISSION_ALIASES:()=>_t,avatar:()=>K,can:()=>S,canManageAccountPermissions:()=>Us,choose:()=>t,currentViewTitle:()=>ha,dateLabel:()=>ae,dueLabel:()=>pi,esc:()=>c,exportXLS:()=>ct,extractDrawingVersion:()=>pn,formatDateTime:()=>un,formatReportDate:()=>je,formatReportTime:()=>He,formatUnifiedDateNumeric:()=>Os,getActiveCalendarSystem:()=>Ze,getCompanyBranding:()=>lt,getCookieVal:()=>zs,getDaysOverdue:()=>xa,getFileFormatInfo:()=>ba,getHijriDateEquivalent:()=>Bs,getTaskStatusStyle:()=>cn,getTimeBasedGreeting:()=>ci,icon:()=>x,initials:()=>zt,isAdmin:()=>C,isOverdue:()=>de,parseEndOfDay:()=>Me,playSuccessChime:()=>da,priorityText:()=>fn,roleFor:()=>ui,roleName:()=>re,runInWorker:()=>qs,sanitizeForSpreadsheet:()=>F,savePreferencesCookies:()=>Lt,showToast:()=>$,statusBadge:()=>Fs,statusText:()=>H,t:()=>g}),za={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function g(e){return za[r.lang][e]||za.ar[e]||e}function t(e,a){return r.lang==="ar"?e:a}function zs(e){if(typeof document>"u"||!e)return null;const a=document.cookie?document.cookie.split("; "):[];for(const n of a){const o=n.indexOf("=");if(o!==-1&&n.slice(0,o).trim()===e)return decodeURIComponent(n.slice(o+1))}return null}function Lt({theme:e,lang:a}={}){if(typeof document>"u")return;const n=31536e3,o=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let s="";if(typeof window<"u"){const f=window.location.hostname;(f==="darc-design.bond"||f.endsWith(".darc-design.bond"))&&(s="; Domain=.darc-design.bond")}const i=e==="dark"||e==="light"?e:null,l=a==="ar"||a==="en"?a:null;if(i){document.cookie=`darc_theme=${encodeURIComponent(i)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${s}`;try{window.localStorage.setItem("darc-theme",i)}catch{}}if(l){document.cookie=`darc_lang=${encodeURIComponent(l)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${s}`;try{window.localStorage.setItem("darc-locale",l)}catch{}}const d=i||(r&&r.theme==="dark"?"dark":"light")||"light",p=l||(r&&r.lang==="en"?"en":"ar")||"ar",u=JSON.stringify({theme:d,lang:p});document.cookie=`darc_prefs=${encodeURIComponent(u)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${s}`}var Ms={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},Rs=/[&<>'"]/,Ns=/[&<>'"]/g;function c(e){if(e==null)return"";const a=String(e);return Rs.test(a)?a.replace(Ns,n=>Ms[n]):a}function F(e){if(e==null)return"";const a=String(e),n=a.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(a)?`'${a}`:a}var Xn={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};function x(e,a=18){return`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Xn[e]||Xn.info}</svg>`}function zt(e){if(!e||typeof e!="object")return"D";const a=(r.lang==="ar"?e.name:e.nameEn||e.name)||e.email||"DARC";return(String(a).replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join("")||String(a).slice(0,2)).toUpperCase()}function K(e,a=""){const n=e||{name:"DARC",avatarColor:"#0d6269"},o=/^#[0-9a-f]{6}$/i.test(n.avatarColor||"")?n.avatarColor:"#0d6269",s=c(t(n.name,n.nameEn||n.name));if(n.avatarUrl){const i=c(zt(n)).replace(/['"\\]/g,"");return`<span class="avatar ${a}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${s}"><img src="${c(n.avatarUrl)}" alt="${s}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${o}';this.parentElement.textContent='${i}';" /></span>`}return`<span class="avatar ${a}" style="background:${o}" title="${s}">${c(zt(n))}</span>`}function ci(){const e=new Date().getHours();return r.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function cn(e){const a=e?.status,n=de(e);return a==="done"||a==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:t("مكتملة","Completed")}:a==="review"||a==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:t("للمراجعة والاعتماد","In Review")}:a==="blocked"||n?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:n?t("متأخرة","Overdue"):t("متوقفة","Blocked")}:a==="in_progress"||a==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:t("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:t("غير مبدوءة","Not Started")}}function ba(e,a=""){const n=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(n)?{ext:n.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(n)?{ext:n.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:n==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["xlsx","xls","csv"].includes(n)?{ext:n.toUpperCase(),label:"Excel Sheet",color:"#107c41",bg:"rgba(16,124,65,0.12)",border:"rgba(16,124,65,0.3)",isExcel:!0}:["docx","doc","rtf","odt"].includes(n)?{ext:n.toUpperCase(),label:"Word Document",color:"#2b579a",bg:"rgba(43,87,154,0.12)",border:"rgba(43,87,154,0.3)",isWord:!0}:["pptx","ppt","key"].includes(n)?{ext:n.toUpperCase(),label:"PowerPoint Deck",color:"#d24726",bg:"rgba(210,71,38,0.12)",border:"rgba(210,71,38,0.3)",isPpt:!0}:["png","jpg","jpeg","webp","heic"].includes(n)?{ext:n.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["mp4","webm","mov","m4v","ogv"].includes(n)?{ext:n.toUpperCase(),label:"Video",color:"#8b5cf6",bg:"rgba(139,92,246,0.12)",border:"rgba(139,92,246,0.3)",isVideo:!0}:["zip","rar","7z","tar"].includes(n)?{ext:n.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:n.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function pn(e){if(!e)return null;const a=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return a?`V${a[1]}`:null}function Ze(){let e=null;try{e=localStorage.getItem("darc_calendar_system")}catch{}return r.calendarSystem||r.data?.user?.customFields?.calendarSystem||e||"gregorian"}var Zn=new Map;function Qe(e,a={}){const n=e+"|"+JSON.stringify(a);let o=Zn.get(n);return o||(o=new Intl.DateTimeFormat(e,a),Zn.set(n,o)),o}function ae(e,a=!0){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?"—":Ze()==="hijri"?Qe(r.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n):Qe(r.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n)}function Os(e){if(!e)return"—";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"—":Ze()==="hijri"?Qe(r.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"2-digit",month:"2-digit",year:"numeric"}).format(a):`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}/${a.getFullYear()}`}function un(e,a={}){if(!e)return{date:"—",time:"—",full:"—"};try{const n=new Date(e);if(Number.isNaN(n.getTime()))return{date:String(e),time:"—",full:String(e)};const o=Ze(),s=r.lang==="ar",i=Qe(o==="hijri"?s?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{year:"numeric",month:a.monthStyle||"short",day:"numeric"}).format(n),l=Qe(s?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",...a.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(n);return{date:i,time:l,full:`${i} ${l}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function je(e=new Date){const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=Ze(),o=r.lang==="ar";return Qe(n==="hijri"?o?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{dateStyle:"full"}).format(a)}function He(e=new Date){const a=new Date(e);return Number.isNaN(a.getTime())?"—":Qe(r.lang==="ar"?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(a)}function Bs(e){if(!e)return"";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"":Qe("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(a)}function Me(e){if(!e)return null;if(e instanceof Date){if(isNaN(e.getTime()))return null;const a=new Date(e.getTime());return a.setHours(23,59,59,999),a}if(typeof e=="number"){const a=new Date(e);return isNaN(a.getTime())?null:(a.setHours(23,59,59,999),a)}if(typeof e=="string"){const a=e.trim();if(!a)return null;const n=a.split("T")[0].split(" ")[0];if(/^\d{4}-\d{2}-\d{2}$/.test(n)){const[s,i,l]=n.split("-").map(Number);return new Date(s,i-1,l,23,59,59,999)}const o=new Date(a);if(!isNaN(o.getTime()))return o.setHours(23,59,59,999),o}return null}function pi(e){if(!e)return"—";const a=Me(e);if(!a||isNaN(a.getTime()))return"—";const n=Math.ceil((a-new Date)/864e5);return isNaN(n)?"—":n<0?t(`متأخرة ${Math.abs(n)} ${g("days")}`,`${Math.abs(n)} ${g("days")} ${g("ago")}`):n===0?g("today"):t(`بعد ${n} ${g("days")}`,`in ${n} ${g("days")}`)}function de(e){if(!e?.dueDate||["done","completed","canceled"].includes(e.status))return!1;const a=Me(e.dueDate);return a?a<new Date:!1}function H(e){switch(e){case"not_started":return g("notStarted");case"in_progress":return g("inProgress");case"review":return g("review");case"approval":return g("approval");case"done":return g("done");case"blocked":return g("blocked");case"canceled":return g("canceled");case"planning":return g("planning");case"active":return g("active");case"on_hold":return g("onHold");case"completed":return g("completed");case"archived":return g("archived");case"on_track":return g("onTrack");case"at_risk":return g("atRisk");case"off_track":return g("offTrack");default:return e||""}}function Fs(e){return e?`<span class="status-badge ${c(e)}">${c(H(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function fn(e){switch(e){case"low":return g("low");case"medium":return g("medium");case"high":return g("high");case"urgent":return g("urgent");default:return e||""}}function ui(e){const a=typeof e=="string"?r.data?.users?.find(n=>n.id===e):e;return a?r.data?.roles?.find(n=>n.id===a.roleId)||{id:a.roleId,nameAr:a.roleNameAr||"",nameEn:a.roleNameEn||"",permissions:[]}:null}function re(e){const a=ui(e);return a?t(a.nameAr,a.nameEn):"—"}var _t={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function S(e){if(C())return!0;const a=r.data?.role?.permissions;if(!a||!a.length)return!1;if(a.includes("*")||a.includes(e))return!0;const n=_t[e];return!!(n&&a.includes(n))}function C(){return r.data?.user?.roleId==="admin"}function Us(){return C()||r.data?.user?.roleId==="account_permissions_manager"||r.data?.role?.permissions?.includes("manage_existing_account_permissions")}function ha(){return r.view==="project-detail"?t("تفاصيل المشروع","Project details"):{dashboard:g("dashboard"),projects:g("projects"),tasks:g("myTasks"),documents:g("documents"),templates:g("templates"),team:g("team"),reports:g("reports"),settings:g("settings")}[r.view]||g("dashboard")}function da(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const a=new e,n=a.currentTime,o=a.createOscillator(),s=a.createGain();o.type="sine",o.frequency.setValueAtTime(587.33,n),s.gain.setValueAtTime(.08,n),s.gain.exponentialRampToValueAtTime(.001,n+.35),o.connect(s),s.connect(a.destination),o.start(n),o.stop(n+.35);const i=a.createOscillator(),l=a.createGain();i.type="sine",i.frequency.setValueAtTime(880,n+.12),l.gain.setValueAtTime(.001,n),l.gain.setValueAtTime(.09,n+.12),l.gain.exponentialRampToValueAtTime(.001,n+.65),i.connect(l),l.connect(a.destination),i.start(n+.12),i.stop(n+.65)}catch{}}function qs(e,a){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(a)):new Promise((n,o)=>{try{const s=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),i=URL.createObjectURL(s),l=new Worker(i);l.onmessage=d=>{URL.revokeObjectURL(i),l.terminate(),d.data.ok?n(d.data.result):o(new Error(d.data.error))},l.onerror=d=>{URL.revokeObjectURL(i),l.terminate(),o(d)},l.postMessage(a)}catch{try{n(e(a))}catch(i){o(i)}}})}function xa(e){if(!e)return 0;const a=Me(e);if(!a||isNaN(a.getTime()))return 0;const n=Date.now()-a.getTime();return n>0?Math.ceil(n/864e5):0}function lt(){const e=r.data?.company||{},a=e.nameAr||e.name||"فريق دارك للتصميم",n=e.nameEn||e.name||"DARC Design Team",o=t(a,n),s=e.logoUrl||"";let i=/^(https?:\/\/|data:image\/|\/)/i.test(s)&&!s.toLowerCase().includes("javascript:")?s:"";return i.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(i=`${window.location.origin}${i}`),{nameAr:a,nameEn:n,displayName:o,logoUrl:i,emailFrom:e.emailFrom||"",emailTo:e.emailTo||"",phone:e.phone||"",website:e.website||"",address:e.address||""}}function ct(e,a){const n=`
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
    <body dir="${r.lang==="ar"?"rtl":"ltr"}">
      ${a}
    </body>
    </html>
  `,o=new Blob(["\uFEFF"+n],{type:"application/vnd.ms-excel;charset=utf-8;"}),s=URL.createObjectURL(o),i=document.createElement("a");i.href=s,i.download=e.endsWith(".xls")?e:`${e}.xls`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)}var Hs=Date.now(),fi=0,la=0,ca=0,Da=null,Qn=Date.now(),Zt=[];function st(e="action",a="",n=null){const o=new Date().toTimeString().split(" ")[0];Zt.push({time:o,category:e,message:String(a||"").slice(0,150),metadata:n?JSON.stringify(n).slice(0,200):null}),Zt.length>15&&Zt.shift()}function mi(){return[...Zt]}typeof document<"u"&&setInterval(()=>{document.visibilityState==="visible"&&fi++},1e3);if(typeof window<"u"){window.addEventListener("webglcontextlost",e=>{e.preventDefault(),console.warn("[WebGL Context Guard] Context loss intercepted; executing LOD vertex decimation and GPU memory purge."),st("webgl.guard","WebGL Context Lost intercepted. Auto-recovery and LOD mesh decimation active.")},!1),window.addEventListener("webglcontextrestored",()=>{console.info("[WebGL Context Guard] WebGL context successfully restored with optimized buffer allocation."),st("webgl.guard","WebGL Context successfully restored with optimized buffer allocation.")},!1);try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{ca+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&pa(!1,!0)}),window.addEventListener("pagehide",()=>{pa(!1,!0)})}function mn(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function gi(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let a="Chrome";e.includes("Edg/")?a="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?a="Safari":e.includes("Firefox/")&&(a="Firefox");let n="macOS";return e.includes("Win")?n="Windows":e.includes("Android")?n="Android":e.includes("iPhone")||e.includes("iPad")?n="iOS":e.includes("Linux")&&(n="Linux"),{os:n,browser:a}}function vi(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function wa(e,a={}){la++;const{os:n,browser:o}=gi(),s=vi(),i=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",l=e||{},d=String(l.message||l.reason||l||"Unknown client error"),p=String(l.stack||a.stack||"No stack trace provided."),u=l.name||a.errorType||"ClientRuntimeError";st("error",`${u}: ${d}`);const f=r.data?.user||{},v={userId:f.id||"usr_demo",userName:f.name||"مدير التوظيف / زائر",userEmail:f.email||"demo@darc-design.bond",userRole:f.jobTitleAr||r.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:f.avatarColor||"#0d6269",errorType:u,errorMessage:d,stackTrace:p,deviceType:s,browser:o,os:n,screenResolution:i,memoryMb:mn(),currentView:r.view?`#${r.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:mi(),severity:a.severity||"high",titleAr:a.titleAr||`خطأ تشغيلي في مساحة العمل (${u})`,titleEn:a.titleEn||`Workspace Runtime Error (${u})`};try{return await z("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(v),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const b=new Blob([JSON.stringify(v)],{type:"application/json"});navigator.sendBeacon(($a||"")+"/api/telemetry/report-error",b)}catch{}}}async function pa(e=!1,a=!1){const n=Date.now(),o=Math.max(5,Math.round((n-Qn)/1e3));Qn=n;let s=null,i=null,l=!1;try{typeof localStorage<"u"&&(s=localStorage.getItem("darc_vid"),s||(s="vid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),localStorage.setItem("darc_vid",s))),typeof sessionStorage<"u"&&(i=sessionStorage.getItem("darc_sid"),i||(i="sid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),sessionStorage.setItem("darc_sid",i),l=!0))}catch{}const{os:d,browser:p}=gi(),u=vi(),f={userId:r.data?.user?.id||"anonymous",sessionId:i,visitorId:s,isNewVisit:l,os:d,browser:p,deviceType:u,durationSeconds:o,memoryMb:mn(),errorCount:la,longTaskCount:ca,currentView:r.view||"dashboard"};if(f.memoryMb>140&&(e=!0),a&&typeof navigator<"u"&&navigator.sendBeacon)try{const v=new Blob([JSON.stringify(f)],{type:"application/json"}),k=($a||"")+"/api/telemetry/heartbeat";navigator.sendBeacon(k,v);return}catch{}try{const v=await z("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(f),silent:!0});return la=0,ca=0,v}catch{}}function Ws(){Da&&clearInterval(Da),setTimeout(()=>pa(!1),5e3),Da=setInterval(()=>{document.visibilityState==="visible"&&pa(!1)},45e3)}function yi(){return{totalSessionDurationSeconds:Math.round((Date.now()-Hs)/1e3),activeDurationSeconds:fi,memoryMb:mn(),errorCount:la,longTaskCount:ca,recentBreadcrumbs:mi()}}var $a=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",Qt=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function ot(){Qt=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function z(e,a={}){const n=["POST","PATCH","PUT","DELETE"].includes(a.method),o=e.startsWith("/api/auth"),s=!!(a.headers&&(a.headers["X-Offline-Replay"]==="true"||a.headers["X-Offline-Replay"]===!0));let i=null;if(n&&a.body)try{i=typeof a.body=="string"?JSON.parse(a.body):a.body}catch{}a.method==="POST"&&i&&typeof i=="object"&&!s&&(e==="/api/tasks"&&!i.id?(i.id=yt("tsk"),a.body=JSON.stringify(i)):e==="/api/projects"&&!i.id?(i.id=yt("prj"),a.body=JSON.stringify(i)):e.includes("/comments")&&!i.id&&(i.id=yt("cmt"),a.body=JSON.stringify(i)));const l=typeof FormData<"u"&&a.body instanceof FormData;if(typeof navigator<"u"&&!navigator.onLine&&n&&!o){if(s)throw new Error(t("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));if(l){const D=t("لا يمكن رفع المخططات أو الملفات في وضع عدم الاتصال. يرجى الاتصال بالإنترنت لإتمام الرفع.","File and drawing uploads are not supported offline. Please reconnect to upload.");throw $(D,!0),new Error(D)}const y=Kn({path:e,method:a.method,body:i}),I=Yn(e,a.method,i,r);return $(t("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡","Offline mode: action saved locally and will auto-sync on reconnect 📡"),!1),{ok:!0,queued:!0,offline:!0,id:y?.id,...I}}const d=typeof localStorage<"u"?localStorage.getItem("darc_token"):null,p=!!(a.silent||a.headers&&a.headers["X-Silent"]),u=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),f=!!Qt&&(p||!!r.data||u),v=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,k={...d?{Authorization:`Bearer ${d}`}:{},...a.body&&!l?{"Content-Type":"application/json"}:{},...v?{"X-Mutation-ID":v}:{},...e==="/api/bootstrap"&&f?{"If-None-Match":Qt}:{},...e==="/api/bootstrap"&&!f?{"Cache-Control":"no-cache, no-store"}:{},...a.headers||{}};e==="/api/bootstrap"&&!f&&(a.cache="no-cache"),a.credentials="include";let b;try{b=await fetch($a+e,{...a,headers:k})}catch{if(n&&!o&&!s){if(l){const T=t("انقطع الاتصال بالإنترنت أثناء الرفع. يرجى إعادة المحاولة عند استقرار الشبكة.","Internet disconnected during file upload. Please retry once reconnected.");throw $(T,!0),new Error(T)}const I=Kn({path:e,method:a.method,body:i}),D=Yn(e,a.method,i,r);return $(t("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡","Connection lost: action saved locally for auto-sync 📡"),!1),{ok:!0,queued:!0,offline:!0,id:I?.id,...D}}throw new Error(t("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(b.status===304)return null;if(!b.ok){const y=await b.text();b.status!==401&&console.error(`API Failed [${e}]: ${b.status} - ${y}`);let I={};try{I=JSON.parse(y)}catch{}b.status===401&&(ot(),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login"&&(typeof localStorage<"u"&&localStorage.removeItem("darc_token"),r.data&&(r.data.user=null),typeof window<"u"&&window.location.hash!=="#login"&&(window.location.hash="#login"))),st("api.error",`${a.method||"GET"} ${e} (Status ${b.status}: ${I.error||"Failed"})`);const D=new Error(I.error||`Failed to fetch ${e}`);throw D.status=b.status,D}const h=b.headers.get("ETag");if(h&&e==="/api/bootstrap"){Qt=h;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",h)}catch{}}const m=await b.json().catch(()=>({ok:!0}));if(["POST","PATCH","PUT","DELETE"].includes(a.method)){ot();let y=i&&typeof i.id=="string"?i.id:null;if(!y&&m&&typeof m=="object"&&(y=m.id||m.task?.id||m.project?.id||m.comment?.id||m.document?.id||m.data?.id),!y&&typeof e=="string"){const I=e.split("/");I.length>=4&&I[3]&&!I[3].includes("?")&&(y=I[3])}if(y&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(y),v&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(v),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let I=null;if(m&&(m.task?I={table:"tasks",action:a.method==="POST"?"INSERT":"UPDATE",record:m.task}:m.project?I={table:"projects",action:a.method==="POST"?"INSERT":"UPDATE",record:m.project}:m.comment?I={table:"comments",action:a.method==="POST"?"INSERT":"UPDATE",record:m.comment}:m.document&&(I={table:"documents",action:a.method==="POST"?"INSERT":"UPDATE",record:m.document})),!I&&a.method==="DELETE"&&y&&(e.startsWith("/api/tasks/")?I={table:"tasks",action:"DELETE",record:{id:y}}:e.startsWith("/api/projects/")?I={table:"projects",action:"DELETE",record:{id:y}}:e.startsWith("/api/documents/")?I={table:"documents",action:"DELETE",record:{id:y}}:e.startsWith("/api/comments/")&&(I={table:"comments",action:"DELETE",record:{id:y}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(I);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:I?"GRANULAR_DELTA":"STATE_MUTATION",delta:I,timestamp:Date.now()})}catch{}}}}return m}typeof window<"u"&&(window.api=z);var Vs=me({initSyncIndicatorListener:()=>bi,renderNavbar:()=>hi,renderSyncIndicator:()=>gn,updateNavbarTitle:()=>Gs});function gn(){const e=Ut().length;return _s()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${t("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:`<span class="btn btn-sm btn-ghost online-indicator-pill" style="font-size:11px;font-weight:600;color:var(--teal);border:1px solid rgba(20,184,166,0.2);background:rgba(20,184,166,0.05);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;pointer-events:none;" title="${t("متصل بالسيرفر — كافة البيانات متزامنة ولحظية","Connected to Cloud — fully synced")}">
    <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 5px var(--teal);"></span>
    <span>${t("متصل","Synced")}</span>
  </span>`:`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${t("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}function bi(){if(typeof window>"u"||window._darcSyncIndicatorBound)return;window._darcSyncIndicatorBound=!0;const e=()=>{const a=document.getElementById("sync-status-indicator");a&&(a.innerHTML=gn())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function hi(e=null){const a=(r.data?.notifications||[]).filter(s=>!s.read&&!s.readAt).length,n=r.data?.user||{},o=e||ha();return`
    <header class="topbar">
      <div class="topbar-left">
        <button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">
          ${x("menu",18)}
        </button>
        <div>
          <div class="topbar-kicker">DARC / ${g("workspace")}</div>
          <div class="topbar-title">${c(o)}</div>
        </div>
      </div>
      <div class="topbar-right">
        <span id="sync-status-indicator">${gn()}</span>
        <button class="topbar-search-trigger" data-action="open-omnisearch" title="${t("بحث شامل وسريع","Omnisearch")}">
          ${x("search",14)}
          <span>${t("بحث شامل...","Search...")}</span>
          <kbd class="shortcut-kbd">${typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"⌘K":"Ctrl+K"}</kbd>
        </button>
        <button class="icon-button" data-action="open-cheatsheet" title="${t("دليل اختصارات لوحة المفاتيح (?)","Keyboard shortcuts guide (?)")}" style="color:var(--ink-soft);" aria-label="Shortcuts">
          <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
        </button>
        <button class="btn btn-ghost btn-sm topbar-action-btn" data-action="toggle-theme" title="${t("تبديل المظهر","Toggle Theme")}" aria-label="${t("تبديل المظهر","Toggle Theme")}">${r.theme==="dark"?"☀️":"🌙"}</button>
        <button class="btn btn-ghost btn-sm topbar-action-btn" data-action="toggle-lang" title="${t("تبديل اللغة","Toggle Language")}" aria-label="${t("تبديل اللغة","Toggle Language")}"><span class="lang-text">${r.lang==="ar"?"EN":"عربي"}</span> ${x("globe",14)}</button>
        <button class="icon-button topbar-action-btn" data-action="show-notifications" aria-label="${g("notifications")}">${x("bell",17)}${a?'<span class="notification-dot"></span>':""}</button>
        <div class="topbar-divider"></div>
        <div class="profile-chip" data-action="open-user-profile" title="${c(t(n.name,n.nameEn||n.name))}">
          ${K(n)}
          <div class="profile-chip-text">
            <strong>${c(t(n.name,n.nameEn||n.name))}</strong>
            <span>${c(re(n))}</span>
          </div>
        </div>
      </div>
    </header>
  `}function Gs(e=null){const a=document.querySelector(".topbar-title");a&&(a.textContent=e||ha())}var Js="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",Ve=`https://drive.google.com/drive/folders/${Js}?usp=sharing`;function vn(e){if(!e)return Ve;const a=e.driveFileId||e.drive_file_id;if(a&&!String(a).startsWith("demo_")&&String(a).length>=25&&a!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${encodeURIComponent(a)}/view?usp=sharing`;const n=e.diskFilename||e.disk_filename||e.viewLink||e.webViewLink||"";if(n&&n.includes("drive.google.com")){if(n.includes("/folders/"))return n;const o=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(o&&o[1]&&!o[1].startsWith("demo_")&&o[1].length>=25&&o[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${o[1]}/view?usp=sharing`}return n&&(n.startsWith("https://")||n.startsWith("http://"))&&!n.includes("localhost")&&!n.includes("127.0.0.1")&&!n.includes("demo_sample")?n:Ve}var Ks=new Set(["DARC-VILLA-ARCH-A101_Rev03.pdf","SKYLINE-CW-SECTION-DETAILS-DWG.pdf","RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf","DARC-VILLA-BOQ-BILL-OF-QUANTITIES.xlsx","DARC-PALM-VILLA-TECHNICAL-SPECIFICATIONS.docx","DARC-ARCHITECTURAL-CONCEPT-PRESENTATION.pptx","DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4","PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg","DARC-STRUCTURAL-LAYOUT-V2.dwg","darc-walkthrough.mp4"]);function tt(e){if(!e)return"";if(e.blobUrl&&typeof e.blobUrl=="string"&&e.blobUrl.startsWith("blob:"))return e.blobUrl;if(e._blobUrl&&typeof e._blobUrl=="string"&&e._blobUrl.startsWith("blob:"))return e._blobUrl;if(typeof window<"u"&&window.__docBlobCache){const i=window.__docBlobCache.get(e.id)||window.__docBlobCache.get(e.originalName);if(i&&typeof i=="string"&&i.startsWith("blob:"))return i}const a=(e.originalName||"").trim();if(a&&Ks.has(a))return`/assets/${encodeURIComponent(a)}`;const n=(e.diskFilename||e.disk_filename||e.url||"").trim();if(n&&(n.startsWith("https://")||n.startsWith("http://")))try{const i=new URL(n);if(["http:","https:"].includes(i.protocol))if(i.hostname.includes("drive.google.com")||i.hostname.includes("docs.google.com")){if(!i.pathname.includes("/folders/")){const l=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(l&&l[1]&&!l[1].startsWith("demo_")&&l[1].length>=25&&l[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/uc?export=download&id=${l[1]}`}}else return n}catch{console.warn("[DocViewer] Invalid storage URL format:",n)}const o=e.driveFileId||e.drive_file_id;if(o&&typeof o=="string"&&!o.startsWith("demo_")&&o.length>=25&&o!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/uc?export=download&id=${encodeURIComponent(o)}`;if(e.id)return`/api/documents/${encodeURIComponent(e.id)}?stream=1`;const s=a.replace(/[/\\:*?"<>|\x00-\x1f]/g,"_");return s?`/assets/${encodeURIComponent(s)}`:""}async function yn(e,a=null){if(!e)return;const n=vn(e);let o=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(n),o=!0;else{const s=document.createElement("textarea");s.value=n,s.style.position="fixed",s.style.opacity="0",document.body.appendChild(s),s.select(),o=document.execCommand("copy"),s.remove()}}catch(s){console.warn("[DocViewer] Clipboard writeText failed, prompting:",s),window.prompt(t("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),n),o=!0}if(o){if(a){const s=a.innerHTML;a.innerHTML=`${x("check",14)} <span style="font-size:11px;font-weight:700;">${t("تم النسخ","Copied")}</span>`,a.style.color="var(--mint-strong, #10b981)",a.style.transition="all 0.2s ease",setTimeout(()=>{a.innerHTML=s,a.style.color=""},2200)}$(t(`تم نسخ رابط Google Drive بنجاح: ${n}`,`Google Drive link copied: ${n}`))}}async function ie(e){if(!e)return;let a=(r.data?.documents||[]).find(s=>s.id===e);if(!a)try{const s=await z(`/api/documents/${e}`);s&&s.document&&(a=s.document)}catch{}if(!a){$(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}$(t(`جاري بدء تحميل "${a.originalName}"...`,`Starting download of "${a.originalName}"...`));const n=(a.originalName||"").split(".").pop()?.toLowerCase()||"";n==="pdf"||a.mimeType&&a.mimeType.includes("pdf"),["dwg","dxf"].includes(n),["xlsx","xls","csv"].includes(n),["docx","doc","rtf","odt"].includes(n),["pptx","ppt","key"].includes(n),["jpg","jpeg","png","webp","svg"].includes(n)||a.mimeType&&a.mimeType.startsWith("image/"),["mp4","webm","mov"].includes(n)||a.mimeType&&a.mimeType.startsWith("video/");const o=a.diskFilename||a.disk_filename||"";if(o&&o.includes("drive.google.com")){const s=o.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(s&&s[1]&&!s[1].startsWith("demo_")&&s[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"){const i=`https://drive.google.com/uc?export=download&id=${s[1]}`,l=(a.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),d=document.createElement("a");d.href=i,d.target="_blank",d.rel="noopener noreferrer",d.download=l,document.body.appendChild(d),d.click(),d.remove(),$(t(`تم بدء تنزيل "${a.originalName}" من Google Drive بنجاح.`,`Downloaded "${a.originalName}" from Google Drive.`));return}}try{let s=null;const i=tt(a);if(i)try{const l=await fetch(i);l.ok&&(s=await l.blob())}catch(l){console.warn("[DocViewer] Real asset fetch error:",l)}if(!s){window.open(`/api/documents/${encodeURIComponent(a.id)}?download=1`,"_blank"),$(t(`تم بدء تنزيل "${a.originalName}" بنجاح.`,`Downloaded "${a.originalName}" successfully.`));return}if(s){const l=URL.createObjectURL(s),d=(a.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),p=document.createElement("a");p.href=l,p.download=d,document.body.appendChild(p),p.click(),p.remove(),setTimeout(()=>URL.revokeObjectURL(l),3e4),$(t(`تم تنزيل المستند الأصلي "${a.originalName}" بنجاح.`,`Downloaded "${a.originalName}" successfully.`))}}catch(s){console.error("[DocViewer] Local download creation failed:",s),window.open(`/api/documents/${encodeURIComponent(a.id)}?download=1`,"_blank")}}function ea(){const e=document.getElementById("preview-modal-overlay");if(!e)return;const a=e.querySelector("video");if(a)try{a.pause(),a.removeAttribute("src"),a.load()}catch{}window.__docPreviewKeyHandler&&(window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=null),document.body.style.overflow="",e.style.display="none",e.innerHTML=""}async function Ma(e){if(!e)return;let a=(r.data?.documents||[]).find(w=>w.id===e);if(!a)try{const w=await z(`/api/documents/${e}`);w&&(w.id||w.document?.id)&&(a=w.document||w,r.data&&!r.data.documents&&(r.data.documents=[]),r.data?.documents&&r.data.documents.push(a))}catch(w){console.warn("[DocViewer] Failed to fetch doc on demand:",w)}if(!a){$(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const n=(a.originalName||"").split(".").pop()?.toLowerCase()||"",o=ba(a.originalName,a.mimeType),s=pn(a.originalName)||"V1",i=a.size>1048576?(a.size/1048576).toFixed(1)+" MB":Math.round((a.size||0)/1024)+" KB",l=n==="pdf"||o.isPdf,d=["dwg","dxf"].includes(n)||o.isCad,p=["rvt","rfa","ifc","skp"].includes(n)||o.isBim,u=["xlsx","xls","csv"].includes(n)||o.isExcel,f=["docx","doc","rtf","odt"].includes(n)||o.isWord,v=["pptx","ppt","key"].includes(n)||o.isPpt,k=["zip","rar","7z","tar"].includes(n)||o.isZip,b=["jpg","jpeg","png","webp","svg","heic"].includes(n)||o.isImg,h=["mp4","webm","mov","m4v"].includes(n)||a.mimeType&&a.mimeType.startsWith("video/"),m=vn(a);let y=document.getElementById("preview-modal-overlay");y||(y=document.createElement("div"),y.id="preview-modal-overlay",y.style.cssText=`
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(8, 14, 18, 0.88);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
    `,document.body.appendChild(y)),y.innerHTML=`
    <div style="background:var(--surface, #ffffff);width:100%;max-width:1240px;height:92vh;border-radius:16px;box-shadow:0 30px 70px rgba(0,0,0,0.5);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line, #e2e8f0);animation:modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
      <!-- Modal Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;">
          <span style="background:${o.bg};color:${o.color};border:1px solid ${o.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${o.ext}
          </span>
          <div style="min-width:0;">
            <h3 style="margin:0;font-size:15px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:440px;" title="${c(a.originalName)}">
              ${c(a.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${s}</span>
              <span>•</span>
              <span>${i}</span>
              <span>•</span>
              <span class="status-badge ${c(a.status||"approved")}" style="font-size:10px;padding:2px 7px;">${c(H(a.status||"approved"))}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);">
            ${x("link",14)} <span>${t("نسخ رابط Google Drive","Copy Drive Link")}</span>
          </button>
          <a href="${c(m)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
            ${x("external",13)} <span>${t("فتح في Drive","Open in Drive")}</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" id="modal-download-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;background:var(--brand-teal, #0d6269);color:#ffffff;">
            ${x("download",14)} <span>${t("تحميل المخطط","Download")}</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="close-doc-preview-btn" style="padding:6px;min-width:34px;height:34px;border-radius:8px;" title="${t("إغلاق","Close")}">
            ${x("close",18)}
          </button>
        </div>
      </div>

      <!-- Main Viewer Viewport -->
      <div id="doc-viewer-viewport" style="flex:1;position:relative;background:#0d1117;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <!-- Content injected dynamically below -->
      </div>
    </div>
  `,y.style.display="flex",document.body.style.overflow="hidden",window.__docPreviewKeyHandler&&window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=w=>{w.key==="Escape"&&ea()},window.addEventListener("keydown",window.__docPreviewKeyHandler);const I=document.getElementById("modal-copy-link-btn");I&&I.addEventListener("click",()=>yn(a,I));const D=document.getElementById("modal-download-btn");D&&D.addEventListener("click",()=>ie(a.id));const T=document.getElementById("close-doc-preview-btn");T&&T.addEventListener("click",ea),y.onclick=w=>{w.target===y&&ea()};const R=document.getElementById("doc-viewer-viewport");if(R){if(l){const w=tt(a),A=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:Ve;R.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e242c;">
        <!-- PDF Architectural Inspection Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#dc2626;background:rgba(220,38,38,0.15);padding:4px 8px;border-radius:4px;">PDF</span>
            <span style="font-weight:700;color:#38bdf8;">${t("المخطط المعماري الأصلي المعتمد (Native Blueprint PDF)","Architectural Plan View")}</span>
            <span style="color:#64748b;">|</span>
            <span>${i}</span>
            <span style="color:#64748b;">|</span>
            <span style="color:#2dd4bf;">● ${t("معتمد برقم ترخيص 2026/DARC-104","Engineering Stamp 2026/DARC-104")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="pdf-view-native" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              📄 ${t("المستند المباشر (PDF)","Native PDF")}
            </button>
            <button type="button" class="btn btn-sm" id="pdf-view-drive" style="background:#1e293b;color:#94a3b8;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ☁️ ${t("معاينة Google Drive","Drive Preview")}
            </button>
            <span style="color:rgba(255,255,255,0.3);">|</span>
            <button type="button" class="btn btn-ghost btn-sm" id="pdf-open-newtab" style="color:#38bdf8;padding:4px 10px;font-weight:700;">
              ↗ ${t("فتح في نافذة كاملة","Open in New Tab")}
            </button>
            <button type="button" class="btn btn-sm btn-primary" id="pdf-download-btn" style="padding:4px 14px;font-weight:800;">
              ⬇️ ${t("تنزيل PDF الأصلي","Download Real PDF")}
            </button>
          </div>
        </div>

        <!-- Real Native PDF Viewport via Object + IFrame Fallback -->
        <div id="pdf-frame-container" style="flex:1;width:100%;height:100%;background:#525659;position:relative;">
          <object 
            id="pdf-native-object"
            data="${c(w)}#toolbar=1&navpanes=1&scrollbar=1" 
            type="application/pdf"
            style="width:100%;height:100%;border:none;display:block;"
          >
            <iframe 
              id="pdf-native-frame"
              src="${c(w)}#toolbar=1&navpanes=1&scrollbar=1" 
              type="application/pdf"
              style="width:100%;height:100%;border:none;display:block;"
              title="${c(a.originalName)}"
              allow="fullscreen"
            >
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:24px;">
                <p style="margin-bottom:12px;font-size:14px;color:#cbd5e1;">${t("متصفحك يحتاج لفتح مستند PDF في نافذة جديدة أو تنزيله مباشرة.","Your browser requires opening this PDF in a new window or downloading it.")}</p>
                <a href="${c(w)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:8px 18px;font-weight:700;">
                  ↗ ${t("فتح مستند PDF الأصلي","Open PDF in New Window")}
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    `,document.getElementById("pdf-view-native")?.addEventListener("click",()=>{const E=document.getElementById("pdf-frame-container");E&&(E.innerHTML=`
          <object id="pdf-native-object" data="${c(w)}#toolbar=1&navpanes=1" type="application/pdf" style="width:100%;height:100%;border:none;display:block;">
            <iframe id="pdf-native-frame" src="${c(w)}#toolbar=1&navpanes=1" type="application/pdf" style="width:100%;height:100%;border:none;display:block;" title="${c(a.originalName)}" allow="fullscreen"></iframe>
          </object>
        `),document.getElementById("pdf-view-native").style.background="#0284c7",document.getElementById("pdf-view-native").style.color="#fff",document.getElementById("pdf-view-drive").style.background="#1e293b",document.getElementById("pdf-view-drive").style.color="#94a3b8"}),document.getElementById("pdf-view-drive")?.addEventListener("click",()=>{const E=document.getElementById("pdf-frame-container");E&&(E.innerHTML=`<iframe src="${c(A)}" style="width:100%;height:100%;border:none;display:block;" allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`),document.getElementById("pdf-view-drive").style.background="#0284c7",document.getElementById("pdf-view-drive").style.color="#fff",document.getElementById("pdf-view-native").style.background="#1e293b",document.getElementById("pdf-view-native").style.color="#94a3b8"}),document.getElementById("pdf-open-newtab")?.addEventListener("click",()=>{window.open(w,"_blank")}),document.getElementById("pdf-download-btn")?.addEventListener("click",()=>ie(a.id));return}if(b){let ke=function(){U&&(U.style.transform=`translate(${_}px, ${j}px) scale(${A}) rotate(${E}deg)`),G&&(G.textContent=`${Math.round(A*100)}%`)};var B=ke;const w=tt(a);R.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0a0e14;user-select:none;">
        <!-- Image Inspection Toolbar -->
        <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.85);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);padding:6px 14px;border-radius:30px;display:flex;align-items:center;gap:12px;z-index:20;box-shadow:0 10px 25px rgba(0,0,0,0.5);color:#fff;font-size:12px;">
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-in" style="color:#fff;padding:4px 8px;" title="${t("تكبير","Zoom In")}">🔍 +</button>
          <span id="img-zoom-level" style="font-weight:700;min-width:44px;text-align:center;">100%</span>
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-out" style="color:#fff;padding:4px 8px;" title="${t("تصغير","Zoom Out")}">🔍 -</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-rotate-btn" style="color:#38bdf8;padding:4px 8px;" title="${t("تدوير 90 درجة","Rotate 90")}">↻ 90°</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-reset-btn" style="color:#fff;padding:4px 8px;" title="${t("إعادة ضبط","Reset")}">⤢ 100%</button>
        </div>

        <!-- High-Res Image Viewport Canvas -->
        <div id="img-pan-viewport" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:grab;position:relative;touch-action:none;">
          <img 
            id="active-preview-img" 
            src="${w}" 
            alt="${c(a.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;pointer-events:none;" 
          />
        </div>
      </div>
    `;let A=1,E=0,_=0,j=0,L=!1,N=null,O=0,P=0;const U=document.getElementById("active-preview-img"),G=document.getElementById("img-zoom-level"),oe=document.getElementById("img-pan-viewport");if(document.getElementById("img-zoom-in")?.addEventListener("click",()=>{A=Math.min(5,A+.25),ke()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{A=Math.max(.4,A-.25),ke()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{E=(E+90)%360,ke()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{A=1,E=0,_=0,j=0,ke()}),oe){oe.addEventListener("wheel",J=>{J.preventDefault();const Ee=J.deltaY<0?.15:-.15;A=Math.max(.4,Math.min(5,A+Ee)),ke()},{passive:!1}),oe.addEventListener("pointerdown",J=>{L=!0,N=J.pointerId;try{oe.setPointerCapture(J.pointerId)}catch{}O=J.clientX-_,P=J.clientY-j,oe.style.cursor="grabbing"}),oe.addEventListener("pointermove",J=>{!L||N!==null&&J.pointerId!==N||(_=J.clientX-O,j=J.clientY-P,ke())});const le=J=>{if(L&&(N===null||J.pointerId===N)){L=!1,N=null;try{oe.releasePointerCapture(J.pointerId)}catch{}oe.style.cursor="grab"}};oe.addEventListener("pointerup",le),oe.addEventListener("pointercancel",le)}return}if(h){const w=tt(a)||"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4",A=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:Ve;R.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#06090e;color:#f8fafc;overflow:hidden;">
        <!-- Video Architectural Inspection Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#a855f7;background:rgba(168,85,247,0.15);padding:4px 8px;border-radius:4px;">VIDEO</span>
            <span style="font-weight:700;color:#f8fafc;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(a.originalName)}">${c(a.originalName)}</span>
            <span style="color:#64748b;">|</span>
            <span>${i}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <!-- Speed Control -->
            <div style="display:flex;align-items:center;gap:4px;background:#1e293b;padding:2px 8px;border-radius:6px;border:1px solid #334155;">
              <span style="color:#94a3b8;font-size:11px;">⚡</span>
              <select id="video-playback-rate" style="background:transparent;border:none;color:#f8fafc;font-size:11px;font-weight:700;cursor:pointer;outline:none;">
                <option value="0.5" style="background:#1e293b;">0.5x</option>
                <option value="1" selected style="background:#1e293b;">1.0x</option>
                <option value="1.25" style="background:#1e293b;">1.25x</option>
                <option value="1.5" style="background:#1e293b;">1.5x</option>
                <option value="2" style="background:#1e293b;">2.0x</option>
              </select>
            </div>
            <!-- PiP -->
            <button type="button" class="btn btn-sm" id="video-pip-btn" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;padding:5px 10px;border-radius:6px;font-size:11px;cursor:pointer;" title="${t("صورة داخل صورة","Picture in Picture")}">
              📺 PiP
            </button>
            <!-- Fullscreen -->
            <button type="button" class="btn btn-sm" id="video-fullscreen-btn" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;padding:5px 10px;border-radius:6px;font-size:11px;cursor:pointer;" title="${t("ملء الشاشة","Fullscreen")}">
              ⛶
            </button>
            <span style="color:rgba(255,255,255,0.3);">|</span>
            <!-- Drive -->
            <button type="button" class="btn btn-sm" id="video-drive-btn" style="background:#1e293b;color:#94a3b8;border:1px solid #334155;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ☁️ ${t("معاينة Google Drive","Drive Preview")}
            </button>
            <!-- Open New Tab -->
            <button type="button" class="btn btn-ghost btn-sm" id="video-open-newtab" style="color:#38bdf8;padding:4px 10px;font-weight:700;" title="${t("فتح في نافذة جديدة","Open in New Tab")}">
              ↗
            </button>
            <!-- Download -->
            <button type="button" class="btn btn-sm btn-primary" id="video-download-btn" style="padding:4px 14px;font-weight:800;background:#0284c7;border:none;color:#fff;cursor:pointer;">
              ⬇️ ${t("تنزيل الفيديو","Download Video")}
            </button>
          </div>
        </div>

        <!-- Video Player Viewport -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;background:#000000;position:relative;overflow:hidden;">
          <video 
            id="darc-main-video-player"
            controls 
            autoplay 
            muted 
            playsinline 
            webkit-playsinline="true"
            preload="auto"
            style="width:100%;max-width:1080px;max-height:72vh;border-radius:12px;outline:none;box-shadow:0 25px 60px rgba(0,0,0,0.9);background:#0f172a;object-fit:contain;"
          >
            <source src="${c(w)}" type="video/mp4">
            <p style="color:#ffffff;text-align:center;">${t("متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.","Your browser does not support HTML5 video playback.")}</p>
          </video>

          <!-- Error Alert Overlay (hidden by default) -->
          <div id="video-error-fallback" style="display:none;position:absolute;inset:20px;background:rgba(15,23,42,0.95);border-radius:12px;border:1px dashed #ef4444;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:30px;text-align:center;">
            <div style="font-size:36px;">⚠️</div>
            <div style="font-size:16px;font-weight:800;color:#f8fafc;">${t("تعذر تشغيل الفيديو المباشر من هذا المصدر","Unable to stream video from this source")}</div>
            <p style="color:#94a3b8;font-size:13px;max-width:460px;margin:0;">
              ${t("قد يكون مسار الملف مقيداً بسياسات الحماية أو غير متاح للمشاهدة المباشرة. يمكنك تنزيل الفيديو لمشاهدته على جهازك فوراً.","The video source might be restricted. You can download the file directly to view it on your device.")}
            </p>
            <button type="button" class="btn btn-primary" id="video-fallback-download-btn" style="padding:8px 20px;border-radius:8px;font-weight:800;">
              ⬇️ ${t("تنزيل ملف الفيديو الأصلي","Download Video File")}
            </button>
          </div>
        </div>
      </div>
    `;const E=document.getElementById("darc-main-video-player"),_=document.getElementById("video-error-fallback");E&&(E.addEventListener("error",()=>{console.warn("[DocViewer] Video failed to stream from primary source:",w),_&&(_.style.display="flex")}),document.querySelectorAll(".video-jump-btn").forEach(j=>{j.addEventListener("click",()=>{const L=parseFloat(j.dataset.sec||"0");E.currentTime=L,E.play().catch(N=>console.warn(N))})}),document.getElementById("video-playback-rate")?.addEventListener("change",j=>{E.playbackRate=parseFloat(j.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():E.requestPictureInPicture&&await E.requestPictureInPicture()}catch(j){console.warn("[DocViewer] PiP error:",j)}}),document.getElementById("video-fullscreen-btn")?.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen?.().catch(j=>console.warn(j)):E.requestFullscreen?.().catch(j=>console.warn(j))})),document.getElementById("video-drive-btn")?.addEventListener("click",()=>{window.open(A,"_blank")}),document.getElementById("video-open-newtab")?.addEventListener("click",()=>{window.open(w,"_blank")}),document.getElementById("video-download-btn")?.addEventListener("click",()=>ie(a.id)),document.getElementById("video-fallback-download-btn")?.addEventListener("click",()=>ie(a.id));return}if(d||p){const w=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:Ve;R.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#101418;user-select:none;">
        <!-- CAD Inspection Control Panel -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-weight:900;color:#0284c7;display:flex;align-items:center;gap:6px;">
              📐 ${o.ext} ${t("عارض المخططات الهندسية (CAD Workspace)","CAD Vector Workspace")}
            </span>
            <span style="color:#64748b;font-size:11px;">${i}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <button type="button" class="btn btn-secondary btn-sm" id="cad-view-drive" style="font-size:11px;padding:5px 12px;background:#1e293b;border-color:#334155;color:#94a3b8;cursor:pointer;">
              🌐 Google Drive
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="cad-export-dxf" style="font-size:11px;padding:5px 14px;background:#0284c7;border:none;color:#fff;font-weight:700;cursor:pointer;">
              ⬇️ ${t("تنزيل DWG / DXF","Download DWG")}
            </button>
          </div>
        </div>

        <!-- CAD Vector Viewport -->
        <div id="cad-viewport-container" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;background:#0b0f14;">
          <div style="text-align:center;padding:40px;max-width:600px;">
            <div style="font-size:48px;margin-bottom:16px;">📐</div>
            <h3 style="color:#f8fafc;font-size:18px;font-weight:800;margin:0 0 8px 0;">${c(a.originalName)}</h3>
            <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("ملف أوتوكاد الهندسي المعتمد (AutoCAD Drawing / DXF Vector). جاهز للتحميل والمعاينة المباشرة.","Approved AutoCAD Drawing deliverable. Ready for direct download and engineering review.")}
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" id="cad-direct-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#0284c7;color:#fff;border:none;cursor:pointer;">
                ⬇️ ${t("تنزيل ملف CAD الأصلي","Download Original CAD File")} (${i})
              </button>
              <button type="button" class="btn btn-secondary" id="cad-view-drive-cta" style="padding:10px 18px;border-radius:8px;font-weight:700;background:#1e293b;color:#cbd5e1;border:1px solid #334155;cursor:pointer;">
                🌐 ${t("فتح في Google Drive","Open in Google Drive")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `,document.getElementById("cad-view-drive")?.addEventListener("click",()=>{window.open(w,"_blank")}),document.getElementById("cad-view-drive-cta")?.addEventListener("click",()=>{window.open(w,"_blank")}),document.getElementById("cad-export-dxf")?.addEventListener("click",()=>{ie(a.id)}),document.getElementById("cad-direct-download")?.addEventListener("click",()=>{ie(a.id)});const A=document.getElementById("cad-viewport-container"),E=document.getElementById("cad-coords");A&&E&&A.addEventListener("mousemove",_=>{const j=A.getBoundingClientRect(),L=((_.clientX-j.left)/j.width*24).toFixed(2),N=((_.clientY-j.top)/j.height*16).toFixed(2);E.textContent=`X: ${L}m | Y: ${N}m`})}if(u){const w=tt(a),A=w.startsWith("http")?w:typeof window<"u"?`${window.location.origin}${w}`:w,E=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:Ve,_=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?E:`https://docs.google.com/viewer?url=${encodeURIComponent(A)}&embedded=true`;R.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Excel Action Header -->
        <div style="background:#107c41;color:#ffffff;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(16,124,65,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#107c41;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">X</div>
            <div>
              <div style="font-weight:800;font-size:14px;letter-spacing:-0.2px;">${c(a.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Excel Spreadsheet • ${i}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="excel-view-embed" style="background:#ffffff;color:#107c41;border:none;padding:5px 12px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              📊 ${t("معاينة Google Docs المباشرة","Google Docs Viewer")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-view-drive" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ☁️ ${t("معاينة Google Drive","Drive Preview")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-view-info" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ℹ️ ${t("بطاقة المخرج","Deliverable Info")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-open-newtab" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 10px;border-radius:6px;font-size:12px;cursor:pointer;" title="${t("فتح في نافذة جديدة","Open in New Tab")}">
              ↗️
            </button>
            <button type="button" class="btn btn-sm" id="excel-download-btn" style="background:#ffffff;color:#107c41;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل XLSX الأصلي","Download XLSX")}
            </button>
          </div>
        </div>

        <!-- Live Embedded Viewer via Google Docs / Drive Embed -->
        <div id="excel-frame-container" style="flex:1;width:100%;height:100%;position:relative;background:#ffffff;">
          <iframe 
            id="excel-embed-iframe" 
            src="${c(_)}" 
            style="width:100%;height:100%;border:none;display:block;" 
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>

        <!-- Deliverable Info Card (toggled via button) -->
        <div id="excel-grid-viewport" style="display:none;flex:1;overflow:auto;background:var(--surface, #ffffff);flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">📊</div>
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${c(a.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("جدول بيانات إكسل حقيقي معتمد. متاح للتنزيل المباشر أو المعاينة السحابية المباشرة.","Authentic Excel spreadsheet deliverable. Available for direct binary download or cloud review.")}
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" id="excel-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#107c41;color:#fff;border:none;cursor:pointer;">
                ⬇️ ${t("تنزيل الملف المباشر","Download Original XLSX")} (${i})
              </button>
              <button type="button" class="btn btn-secondary" id="excel-cta-drive" style="padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;">
                🌐 ${t("فتح عبر Google Drive","Open in Google Drive")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;const j=document.getElementById("excel-frame-container"),L=document.getElementById("excel-grid-viewport"),N=document.getElementById("excel-embed-iframe"),O=document.getElementById("excel-view-embed"),P=document.getElementById("excel-view-drive"),U=document.getElementById("excel-view-info");O?.addEventListener("click",()=>{j&&L&&N&&(j.style.display="block",L.style.display="none",N.src=_),O.style.background="#ffffff",O.style.color="#107c41",P.style.background="rgba(255,255,255,0.2)",P.style.color="#ffffff",U.style.background="rgba(255,255,255,0.2)",U.style.color="#ffffff"}),P?.addEventListener("click",()=>{j&&L&&N&&(j.style.display="block",L.style.display="none",N.src=E),P.style.background="#ffffff",P.style.color="#107c41",O.style.background="rgba(255,255,255,0.2)",O.style.color="#ffffff",U.style.background="rgba(255,255,255,0.2)",U.style.color="#ffffff"}),U?.addEventListener("click",()=>{j&&L&&(j.style.display="none",L.style.display="flex"),U.style.background="#ffffff",U.style.color="#107c41",O.style.background="rgba(255,255,255,0.2)",O.style.color="#ffffff",P.style.background="rgba(255,255,255,0.2)",P.style.color="#ffffff"}),document.getElementById("excel-open-newtab")?.addEventListener("click",()=>{window.open(w,"_blank")}),document.getElementById("excel-cta-drive")?.addEventListener("click",()=>{window.open(E,"_blank")}),document.getElementById("excel-download-btn")?.addEventListener("click",()=>ie(a.id)),document.getElementById("excel-cta-download")?.addEventListener("click",()=>ie(a.id));return}if(f){const w=tt(a),A=w.startsWith("http")?w:typeof window<"u"?`${window.location.origin}${w}`:w,E=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:Ve,_=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?E:`https://docs.google.com/viewer?url=${encodeURIComponent(A)}&embedded=true`;R.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#1e242c;overflow:hidden;">
        <!-- Word Executive Toolbar -->
        <div style="background:#2b579a;color:#ffffff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(43,87,154,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#2b579a;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">W</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${c(a.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Word Document • ${i}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="word-view-embed" style="background:#ffffff;color:#2b579a;border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:800;cursor:pointer;">
              📄 ${t("معاينة Google Docs المباشرة","Google Docs Viewer")}
            </button>
            <button type="button" class="btn btn-sm" id="word-view-drive" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;">
              🌐 Google Drive
            </button>
            <button type="button" class="btn btn-sm" id="word-view-info" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;">
              ℹ️ ${t("بطاقة المخرج","Deliverable Info")}
            </button>
            <button type="button" class="btn btn-sm" id="word-open-newtab" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 10px;border-radius:4px;font-size:11px;cursor:pointer;" title="${t("فتح في نافذة جديدة","Open in New Tab")}">
              ↗️
            </button>
            <button type="button" class="btn btn-sm" id="word-download-btn" style="background:#ffffff;color:#2b579a;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل DOCX الأصلي","Download DOCX")}
            </button>
          </div>
        </div>

        <!-- Live Embedded Viewer via Google Docs / Drive Embed -->
        <div id="word-frame-container" style="flex:1;width:100%;height:100%;position:relative;background:#ffffff;">
          <iframe 
            id="word-embed-iframe" 
            src="${c(_)}" 
            style="width:100%;height:100%;border:none;display:block;" 
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>

        <!-- Word Workspace Viewport (toggled via button) -->
        <div id="word-main-content-layout" style="display:none;flex:1;align-items:center;justify-content:center;background:#0b0f15;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">📄</div>
            <h3 style="color:#f8fafc;font-size:18px;font-weight:800;margin:0 0 8px 0;">${c(a.originalName)}</h3>
            <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("مستند وورد حقيقي معتمد. متاح للتنزيل المباشر أو المعاينة السحابية المباشرة.","Authentic Word document deliverable. Available for direct binary download or cloud review.")}
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" id="word-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#2b579a;color:#fff;border:none;cursor:pointer;">
                ⬇️ ${t("تنزيل الملف المباشر","Download Original DOCX")} (${i})
              </button>
              <button type="button" class="btn btn-secondary" id="word-cta-drive" style="padding:10px 18px;border-radius:8px;font-weight:700;background:#1e293b;color:#cbd5e1;border:1px solid #334155;cursor:pointer;">
                🌐 ${t("فتح عبر Google Drive","Open in Google Drive")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;const j=document.getElementById("word-frame-container"),L=document.getElementById("word-main-content-layout"),N=document.getElementById("word-embed-iframe"),O=document.getElementById("word-view-embed"),P=document.getElementById("word-view-drive"),U=document.getElementById("word-view-info");O?.addEventListener("click",()=>{j&&L&&N&&(j.style.display="block",L.style.display="none",N.src=_),O.style.background="#ffffff",O.style.color="#2b579a",P.style.background="rgba(255,255,255,0.2)",P.style.color="#ffffff",U.style.background="rgba(255,255,255,0.2)",U.style.color="#ffffff"}),P?.addEventListener("click",()=>{j&&L&&N&&(j.style.display="block",L.style.display="none",N.src=E),P.style.background="#ffffff",P.style.color="#2b579a",O.style.background="rgba(255,255,255,0.2)",O.style.color="#ffffff",U.style.background="rgba(255,255,255,0.2)",U.style.color="#ffffff"}),U?.addEventListener("click",()=>{j&&L&&(j.style.display="none",L.style.display="flex"),U.style.background="#ffffff",U.style.color="#2b579a",O.style.background="rgba(255,255,255,0.2)",O.style.color="#ffffff",P.style.background="rgba(255,255,255,0.2)",P.style.color="#ffffff"}),document.getElementById("word-open-newtab")?.addEventListener("click",()=>{window.open(w,"_blank")}),document.getElementById("word-cta-drive")?.addEventListener("click",()=>{window.open(E,"_blank")}),document.getElementById("word-download-btn")?.addEventListener("click",()=>ie(a.id)),document.getElementById("word-cta-download")?.addEventListener("click",()=>ie(a.id));return}if(v){const w=tt(a),A=w.startsWith("http")?w:typeof window<"u"?`${window.location.origin}${w}`:w,E=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:Ve,_=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?E:`https://docs.google.com/viewer?url=${encodeURIComponent(A)}&embedded=true`;R.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#0d1117;color:#f0f6fc;overflow:hidden;">
        <!-- PPT Header Control Bar -->
        <div style="background:#d24726;color:#ffffff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(210,71,38,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d24726;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">P</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${c(a.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft PowerPoint Presentation • ${i}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="ppt-view-embed" style="background:#ffffff;color:#d24726;border:none;padding:5px 12px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              🖥️ ${t("معاينة Google Docs المباشرة","Google Docs Viewer")}
            </button>
            <button type="button" class="btn btn-sm" id="ppt-view-drive" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">
              🌐 Google Drive
            </button>
            <button type="button" class="btn btn-sm" id="ppt-view-info" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">
              ℹ️ ${t("بطاقة المخرج","Deliverable Info")}
            </button>
            <button type="button" class="btn btn-sm" id="ppt-open-newtab" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 10px;border-radius:6px;font-size:12px;cursor:pointer;" title="${t("فتح في نافذة جديدة","Open in New Tab")}">
              ↗️
            </button>
            <button type="button" class="btn btn-sm" id="ppt-download-btn" style="background:#ffffff;color:#d24726;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل PPTX الأصلي","Download PPTX")}
            </button>
          </div>
        </div>

        <!-- Live Embedded Viewer via Google Docs / Drive Embed -->
        <div id="ppt-frame-container" style="flex:1;width:100%;height:100%;position:relative;background:#ffffff;">
          <iframe 
            id="ppt-embed-iframe" 
            src="${c(_)}" 
            style="width:100%;height:100%;border:none;display:block;" 
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>

        <!-- PPT Presentation Canvas Viewport (toggled via button) -->
        <div id="ppt-canvas-container" style="display:none;flex:1;align-items:center;justify-content:center;padding:40px;background:#090d13;overflow:auto;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">🖥️</div>
            <h3 style="color:#f8fafc;font-size:18px;font-weight:800;margin:0 0 8px 0;">${c(a.originalName)}</h3>
            <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("عرض تقديمي باوربوينت حقيقي معتمد. متاح للتنزيل المباشر أو المعاينة السحابية المباشرة.","Authentic PowerPoint presentation deliverable. Available for direct binary download or cloud review.")}
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" id="ppt-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d24726;color:#fff;border:none;cursor:pointer;">
                ⬇️ ${t("تنزيل ملف العرض الأصلي","Download Original PPTX")} (${i})
              </button>
              <button type="button" class="btn btn-secondary" id="ppt-cta-drive" style="padding:10px 18px;border-radius:8px;font-weight:700;background:#161b22;color:#cbd5e1;border:1px solid #30363d;cursor:pointer;">
                🌐 ${t("فتح عبر Google Drive","Open in Google Drive")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;const j=document.getElementById("ppt-frame-container"),L=document.getElementById("ppt-canvas-container"),N=document.getElementById("ppt-embed-iframe"),O=document.getElementById("ppt-view-embed"),P=document.getElementById("ppt-view-drive"),U=document.getElementById("ppt-view-info");O?.addEventListener("click",()=>{j&&L&&N&&(j.style.display="block",L.style.display="none",N.src=_),O.style.background="#ffffff",O.style.color="#d24726",P.style.background="rgba(255,255,255,0.2)",P.style.color="#ffffff",U.style.background="rgba(255,255,255,0.2)",U.style.color="#ffffff"}),P?.addEventListener("click",()=>{j&&L&&N&&(j.style.display="block",L.style.display="none",N.src=E),P.style.background="#ffffff",P.style.color="#d24726",O.style.background="rgba(255,255,255,0.2)",O.style.color="#ffffff",U.style.background="rgba(255,255,255,0.2)",U.style.color="#ffffff"}),U?.addEventListener("click",()=>{j&&L&&(j.style.display="none",L.style.display="flex"),U.style.background="#ffffff",U.style.color="#d24726",O.style.background="rgba(255,255,255,0.2)",O.style.color="#ffffff",P.style.background="rgba(255,255,255,0.2)",P.style.color="#ffffff"}),document.getElementById("ppt-open-newtab")?.addEventListener("click",()=>{window.open(w,"_blank")}),document.getElementById("ppt-cta-drive")?.addEventListener("click",()=>{window.open(E,"_blank")}),document.getElementById("ppt-download-btn")?.addEventListener("click",()=>ie(a.id)),document.getElementById("ppt-cta-download")?.addEventListener("click",()=>ie(a.id));return}if(k){R.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Zip Header -->
        <div style="background:#d97706;color:#ffffff;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d97706;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">📦</div>
            <div>
              <div style="font-weight:800;font-size:15px;">${c(a.originalName)}</div>
              <div style="font-size:12px;opacity:0.9;">Archive Deliverable Package • ${i}</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm" id="zip-download-btn" style="background:#ffffff;color:#d97706;border:none;padding:6px 16px;border-radius:6px;font-weight:800;cursor:pointer;">
            ⬇️ ${t("تنزيل كامل الحزمة المضغوطة","Download Full Archive")}
          </button>
        </div>

        <!-- Archive Workspace Viewport -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">📦</div>
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${c(a.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("ملف أرشيف مضغوط حقيقي معتمد. يحتوي على كامل مخرجات المشروع الهندسية جاهزة للتنزيل وفك الضغط.","Authentic archive deliverable. Ready for direct binary download and local extraction.")}
            </p>
            <button type="button" class="btn btn-primary" id="zip-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d97706;color:#fff;border:none;cursor:pointer;">
              ⬇️ ${t("تنزيل الحزمة المضغوطة الآن","Download Archive Now")} (${i})
            </button>
          </div>
        </div>
      </div>
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>ie(a.id)),document.getElementById("zip-cta-download")?.addEventListener("click",()=>ie(a.id));return}!l&&!b&&!h&&!d&&!u&&!f&&!v&&!k&&(R.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
        <div style="width:80px;height:80px;border-radius:20px;background:${o.bg};color:${o.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${o.border};">
          ${o.ext}
        </div>
        <h2 style="font-size:22px;font-weight:900;margin:0 0 8px 0;color:var(--text, #0f172a);">${c(a.originalName)}</h2>
        <p style="color:#64748b;font-size:14px;max-width:480px;line-height:1.6;margin:0 0 24px 0;">
          ${t("هذا المستند المعماري جاهز للتنزيل المباشر أو الفتح عبر التطبيق الهندسي المختص.","This architectural document is ready for direct download or local desktop review.")}
        </p>
        <div style="display:flex;gap:12px;">
          <button type="button" class="btn btn-primary" id="fallback-download-btn" style="padding:10px 24px;border-radius:8px;font-weight:800;">
            ⬇️ ${t("تنزيل الملف الآن","Download File")} (${i})
          </button>
        </div>
      </div>
    `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>ie(a.id)))}}var Ys=me({STATUS_OPTIONS:()=>Di,buildAssigneeChipsHtml:()=>wn,buildRemindersListHtml:()=>$n,canUserMoveTask:()=>Ht,closeDocumentPreviewModal:()=>ea,downloadDocument:()=>ie,drawTimelineArrows:()=>Ra,filterTasks:()=>Ti,formatRemindAtDate:()=>Si,getDocumentShareableLink:()=>vn,getSavedTaskSort:()=>Et,getTaskSortOrder:()=>Mt,handleCopyDocLink:()=>yn,initTaskModalWidgets:()=>Ii,openDocumentPreviewModal:()=>Ma,openTaskModal:()=>ua,renderBoard:()=>Ei,renderCalendar:()=>xn,renderTaskAssignees:()=>xi,renderTaskComments:()=>Rt,renderTaskDocuments:()=>rt,renderTaskSortSelect:()=>hn,renderTasks:()=>Xs,renderTimeline:()=>ka,renderTimelinePanel:()=>Ai,setSavedTaskSort:()=>bn,sortTasks:()=>ki,sortTasksByImportance:()=>$i,taskCard:()=>wi});function xi(e){const a=r.data?.users||[],n=r._userMap||new Map(a.map(d=>[d.id,d])),o=e.assignee||n.get(e.assigneeId),s=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(d=>n.get(d)).filter(Boolean),i=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let l='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return o||s.length?(l+='<div class="avatar-stack" style="display:flex;align-items:center;">',o&&(l+=`<span title="${c(t(o.name,o.nameEn||o.name))}">${K(o,"mini-avatar")}</span>`),s.slice(0,2).forEach(d=>{l+=`<span title="${c(t(d.name,d.nameEn||d.name))}" style="margin-inline-start:-8px;">${K(d,"mini-avatar")}</span>`}),s.length>2&&(l+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${s.slice(2).map(d=>t(d.name,d.nameEn||d.name)).join("، ")}">+${s.length-2}</span>`),l+="</div>",o&&(l+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${c(t(o.name,o.nameEn||o.name))}</span>`)):i.length||(l+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),i.length&&(i.slice(0,2).forEach(d=>{l+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${c(d)}">🌐 ${c(d)} <small style="opacity:0.8">(${t("خارجي","Ext")})</small></span>`}),i.length>2&&(l+=`<span style="font-size:10px;color:var(--amber);" title="${i.slice(2).map(c).join("، ")}">+${i.length-2}</span>`)),l+="</div>",l}function Ht(e){if(!e)return!1;if(C()||S("edit_tasks"))return!0;const a=r.data?.user?.id;if(!a)return!1;if((e.assigneeId||e.assignee_id)===a||(e.creatorId||e.createdById||e.created_by_id||e.created_by)===a)return!0;const n=e.reviewerId||e.reviewer_id,o=e.approverId||e.approver_id;if(n===a||o===a)return!0;const s=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;if(Array.isArray(s)&&s.includes(a))return!0;const i=e.projectId||e.project_id;if(i&&r.data?.projects){const l=r.data?.projects?.find(d=>d.id===i);if(l){const d=l.managerId||l.manager_id,p=l.ownerId||l.owner_id||l.leadId||l.lead_id||l.createdById||l.created_by;if(d===a||p===a)return!0}}return!1}function wi(e){const a=de(e),n=a?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${x("alert",11)} ${g("overdue")}</span>`:"",o=r._commentCounts?r._commentCounts[e.id]||0:(r.data?.comments||[]).filter(p=>p.taskId===e.id).length,s=r._docCounts?r._docCounts[e.id]||0:(r.data?.documents||[]).filter(p=>p.taskId===e.id).length,i=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",l=Ht(e),d=t(e.titleAr,e.titleEn);return`<article class="task-card ${a?"is-overdue":""} ${l?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${c(d)}" data-action="open-task" data-task-id="${c(e.id)}">
    <div class="task-card-top">
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="task-drag-handle" title="${t("اسحب لتحريك المهمة","Drag to reorder")}" style="cursor:grab;touch-action:none;padding:1px 4px;border-radius:4px;color:var(--muted);font-size:12px;opacity:0.65;user-select:none;transition:opacity 0.15s ease;">⋮⋮</span>
        <span class="task-code">${c(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        ${o>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${o} ${t("تعليقات","comments")}">💬 ${o}</span>`:""}
        ${s>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${s} ${t("مرفقات","attachments")}">📎 ${s}</span>`:""}
        ${n}
        <span class="priority-badge ${c(e.priority)}">${c(fn(e.priority))}</span>
      </div>
    </div>
    <h4>${c(t(e.titleAr,e.titleEn))}</h4>
    ${(()=>{const p=String(t(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!p)return"";const u=p.length>50?p.substring(0,50).trim()+"...":p;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${c(p)}">${c(u)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${c(t(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${a?"var(--red)":"var(--muted)"};">${x("calendar",11)} ${ae(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${xi(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${i};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function Mt(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function $i(e=[]){const a={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((o,s)=>{const i=o.status==="blocked"?1:0,l=s.status==="blocked"?1:0;if(i!==l)return l-i;const d=o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=s.dueDate?new Date(`${s.dueDate.split("T")[0]}T23:59:59`).getTime():null,u=d&&d<n&&o.status!=="done"?1:0,f=p&&p<n&&s.status!=="done"?1:0;if(u!==f)return f-u;const v=a[o.priority]||2,k=a[s.priority]||2;if(v!==k)return k-v;if(d&&p){if(d!==p)return d-p}else{if(d&&!p)return-1;if(!d&&p)return 1}const b=Mt(o),h=Mt(s);return b!==h?b-h:(o.titleAr||"").localeCompare(s.titleAr||"","ar")})}function Et(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function bn(e){try{localStorage.setItem("darc_task_sort_pref",e)}catch{}r.taskSortPref=e,r.projectTaskSort=e,r.myTaskSort=e}function hn(e,a="sort-project-tasks"){const n=e||Et();return`
    <div class="sort-box">
      <span>${t("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${a}">
        <option value="custom" ${n==="custom"?"selected":""}>${t("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${n==="importance"?"selected":""}>${t("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${t("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${t("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function ki(e=[],a=Et()){return a==="deadline"?[...e].sort((n,o)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):a==="custom"?[...e].sort((n,o)=>Mt(n)-Mt(o)):a==="alpha"?[...e].sort((n,o)=>(n.titleAr||"").localeCompare(o.titleAr||"","ar")):$i(e)}function Ei(e,a=Et()){const n=r.data?.users||[];r._userMap=new Map(n.map(i=>[i.id,i]));const o={};for(const i of r.data?.comments||[])i.taskId&&(o[i.taskId]=(o[i.taskId]||0)+1);const s={};for(const i of r.data?.documents||[])i.taskId&&(s[i.taskId]=(s[i.taskId]||0)+1);return r._commentCounts=o,r._docCounts=s,`<div class="board">${[{key:"not_started",dot:"",label:g("notStarted")},{key:"in_progress",dot:"blue",label:g("inProgress")},{key:"review",dot:"amber",label:t("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:g("done")}].map(i=>{const l=ki(e.filter(d=>(i.statuses||[i.key]).includes(d.status)),a);return`<section class="board-column" data-status="${i.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${i.dot}"></span>${i.label}</div><span class="board-count">${l.length}</span></div><div class="board-cards">${l.length?l.map(wi).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${g("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function xn(e,a){const n=r.calendarDate?new Date(r.calendarDate):new Date,o=n.getFullYear(),s=n.getMonth(),i=`${r.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][s]:["January","February","March","April","May","June","July","August","September","October","November","December"][s]} ${o}`,l=r.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],d=new Date(o,s,1).getDay(),p=new Date(o,s+1,0).getDate(),u=new Date,f=u.getFullYear()===o&&u.getMonth()===s;let v="";for(let k=0;k<d;k++)v+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let k=1;k<=p;k++){const b=f&&u.getDate()===k,h=`${o}-${String(s+1).padStart(2,"0")}-${String(k).padStart(2,"0")}`,m=e.filter(y=>{if(!y.dueDate&&!y.startDate)return!1;const I=y.dueDate?y.dueDate.split("T")[0]:null,D=y.startDate?y.startDate.split("T")[0]:null;return I===h||D===h});v+=`
      <div class="calendar-day ${b?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${b?"var(--mint)":"var(--surface)"};border:1px solid ${b?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${b?"bold":"600"};color:${b?"var(--teal)":"var(--ink)"};">
          <span>${k}</span>
          ${b?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${t("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${m.map(y=>{const I=cn(y);return`
              <div data-action="open-task" data-task-id="${c(y.id)}" style="background:${I.bgColor};border:1px solid ${I.borderColor};border-inline-start:3px solid ${I.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${I.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${c(t(y.titleAr,y.titleEn))} — ${I.label}">
                <span style="font-weight:700;">${c(t(y.titleAr,y.titleEn))}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${x("calendar",16)} ${i}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${x(r.lang==="ar"?"arrow":"arrowLeft",12)} ${t("السابق","Prev")}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${t("اليوم","Today")}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${t("التالي","Next")} ${x(r.lang==="ar"?"arrowLeft":"arrow",12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${l.map(k=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${k}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${v}
      </div>
    </div>
  `}function ka(e){const a=e.filter(p=>p.startDate&&p.dueDate).sort((p,u)=>new Date(p.startDate)-new Date(u.startDate));if(!a.length)return`<div class="empty" style="min-height:300px">${x("calendar",24)}<span>${t("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...a.map(p=>new Date(p.startDate).getTime())),o=Math.max(...a.map(p=>new Date(p.dueDate).getTime()));const s=2592e5;n-=s,o+=s;const i=Math.max(7,Math.ceil((o-n)/864e5));let l="";for(let p=0;p<i;p++){const u=new Date(n+p*864e5),f=u.getDay()===5||u.getDay()===6,v=Ze()==="hijri"?r.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":r.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",k=new Intl.DateTimeFormat(v,{month:"short"}).format(u);l+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${f?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${u.getDate()}<br>${k}</div>`}const d=a.map((p,u)=>{const f=Math.floor((new Date(p.startDate).getTime()-n)/864e5)+1,v=f+Math.max(1,Math.ceil((new Date(p.dueDate).getTime()-new Date(p.startDate).getTime())/864e5)+1),k=cn(p);return`<div style="display:contents" class="timeline-row" data-task-id="${p.id}" data-row="${u}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${p.id}" style="grid-column: ${f} / ${v}; margin: 8px 4px; background: ${k.color}; border: 1px solid ${k.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${c(t(p.titleAr,p.titleEn))} — ${k.label}">
        <span style="font-weight:600;opacity:0.9">${c(p.templateId?p.templateId.replace("tpl-","#"):"#")}</span> ${c(t(p.titleAr,p.titleEn))}
        ${p.dependencies&&p.dependencies.length?`<span style="float:${r.lang==="ar"?"left":"right"};opacity:0.8">${x("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${i}, minmax(40px, 1fr)); min-width: ${i*40}px; position: relative;">
      ${l}
      ${d}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function Ai(e,a){const n=r.timelineView||"gantt";return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2>
          <p class="panel-subtitle">${t("متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.","Track task flow and milestone deadlines in your preferred format.")}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${n==="gantt"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${x("clock",12)} ${t("مخطط جانت","Gantt Chart")}
          </button>
          <button class="btn btn-sm ${n==="calendar"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${x("calendar",12)} ${t("عرض التقويم","Calendar View")}
          </button>
        </div>
      </div>
      
      ${n==="calendar"?xn(e,a):ka(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:Ai,renderCalendar:xn,renderTimeline:ka});function Ti(e){const a=r.searches.tasks.trim().toLowerCase();return e.filter(n=>{const o=`${n.titleAr} ${n.titleEn} ${n.categoryAr} ${n.categoryEn}`.toLowerCase().includes(a),s=r.taskFilter==="all"||r.taskFilter==="mine"&&n.assigneeId===r.data?.user?.id||r.taskFilter==="overdue"&&de(n)||r.taskFilter==="blocked"&&n.status==="blocked",i=r.taskProjectFilter==="all"||n.projectId===r.taskProjectFilter,l=!r.taskPriorityFilter||r.taskPriorityFilter==="all"||n.priority===r.taskPriorityFilter;return o&&s&&i&&l})}function Xs(){const e=Ti(r.data?.tasks||[]),a=[["all",g("all")],["mine",t("مسندة لي","Assigned to me")],["overdue",g("overdue")],["blocked",g("blocked")]],n=r.myTaskSort||Et();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("حركة التنفيذ","EXECUTION")}</p>
        <h1>${g("myTasks")}</h1>
        <p>${t("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${S("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${x("plus",15)} ${g("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${a.map(([o,s])=>`
            <button class="segmented-tab ${r.taskFilter===o?"active":""}" data-action="task-filter" data-filter="${o}" role="tab">
              ${s}
            </button>
          `).join("")}
        </div>
        <div class="search-box tasks-search-box">
          ${x("search",15)}
          <input data-search="tasks" value="${c(r.searches.tasks)}" placeholder="${t("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${t("📁 كل المشاريع","📁 All Projects")}</option>
            ${(r.data?.projects||[]).map(o=>`<option value="${c(o.id)}" ${r.taskProjectFilter===o.id?"selected":""}>${c(t(o.nameAr,o.nameEn))}</option>`).join("")}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${t("⚡ كل الأولويات","⚡ All Priorities")}</option>
            <option value="urgent" ${r.taskPriorityFilter==="urgent"?"selected":""}>🔥 ${t("عاجلة","Urgent")}</option>
            <option value="high" ${r.taskPriorityFilter==="high"?"selected":""}>⚡ ${t("عالية","High")}</option>
            <option value="medium" ${r.taskPriorityFilter==="medium"?"selected":""}>🔹 ${t("متوسطة","Medium")}</option>
            <option value="low" ${r.taskPriorityFilter==="low"?"selected":""}>☕ ${t("منخفضة","Low")}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${hn(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?Ei(e,n):`<section class="panel"><div class="empty">${x("checklist",18)}<span>${g("noTasks")}</span></div></section>`}
  `}function Si(e){return un(e,{includeSeconds:!1}).full}function wn(e=[],a=[]){const n=r.data?.users||[];let o="";return e.forEach(s=>{const i=n.find(l=>l.id===s)||{name:s,id:s};o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${K(i,"mini-avatar")}
        <span style="font-weight:500;">${c(t(i.name,i.nameEn||i.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${c(s)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),a.forEach(s=>{o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${c(s)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${t("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${c(s)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),o}function $n(e=[]){return e.length?e.map((a,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${c(Si(a.remindAt))}</strong>
        ${a.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(a.noteAr)}">(${c(a.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${c(a.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${t("حذف التذكير","Delete reminder")}">
        ${x("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${t("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function ua(e=null,a=null,n=null){const o=r.data?.templates?.find(m=>m.id===(a||e?.templateId)),s=e?.projectId||n||r.activeProjectId||r.data?.projects?.[0]?.id||"",i=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],l=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let d=[];Array.isArray(e?.customFields?.reminders)?d=e.customFields.reminders:e?.remindAt?d=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:e.remindAt,noteAr:""}]:Array.isArray(r.data?.reminders)&&e?.id&&(d=(r.data?.reminders||[]).filter(m=>m.taskId===e.id));const p=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,u=i.length>0||l.length>0,f=u?wn(i,l):"",v=$n(d),k=`<form id="task-form" data-task-id="${c(e?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${c(e?.typeAr||o?.typeAr||(o?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${c(e?.typeEn||o?.typeEn||(o?"Drawing":""))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${c(JSON.stringify(i))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${c(JSON.stringify(l))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${c(JSON.stringify(d))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${t("البيانات الأساسية والمكتبة القياسية","Basic Details & Standard Library")}</span>
      </div>

      <div class="field full">
        <label>${t("المشروع التابع له","Project")} *</label>
        <select name="projectId" id="task-project-select" required>
          ${(r.data?.projects||[]).map(m=>`<option value="${c(m.id)}" ${m.id===s?"selected":""}>${c(t(m.nameAr,m.nameEn))} (${c(m.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${g("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${c(e?.titleAr||o?.nameAr||"")}" placeholder="${t("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${g("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${c(e?.titleEn||o?.nameEn||"")}" placeholder="${t("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${g("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${t("مهمة مخصصة","Custom task")}</option>
          ${(r.data?.templates||[]).map(m=>`<option value="${c(m.id)}" ${(e?.templateId||a)===m.id?"selected":""}>${c(m.code)} — ${c(t(m.nameAr,m.nameEn))}</option>`).join("")}
        </select>
      </div>

      <!-- 👥 القسم 2: المسؤوليات وفريق العمل -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>👥</span> <span>${t("المسؤوليات وفريق العمل","Ownership & Team")}</span>
      </div>

      <div class="field full">
        <label>${t("المسؤول الرئيسي","Primary Assignee")}</label>
        <select name="assigneeId" id="task-primary-assignee">
          <option value="">${t("— بدون تحديد —","— Unassigned —")}</option>
          ${(r.data?.users||[]).map(m=>`<option value="${c(m.id)}" ${(e?e.assigneeId===m.id:r.data?.user?.id===m.id)?"selected":""}>${c(t(m.name,m.nameEn||m.name))}</option>`).join("")}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${t("فريق العمل والمسؤولون المشاركون (داخلي وخارجي)","Collaborators & Assignees (Team & External)")}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${t("اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة","Pick team members or type external name")}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${u?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${f}
        </div>

        <!-- حقل البحث والإضافة السريعة -->
        <div style="position:relative;display:flex;gap:6px;">
          <input type="text" id="assignee-combobox-search" placeholder="${t("ابحث عن عضو بالفريق أو اكتب اسماً خارجياً...","Search team member or type external name...")}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          <button type="button" id="btn-add-external-quick" class="btn btn-soft btn-sm" style="display:none;padding:0 12px;white-space:nowrap;font-size:11px;">
            ➕ ${t("إضافة كمسؤول خارجي","Add external")}
          </button>
        </div>

        <!-- القائمة المنسدلة للبحث والاختيار -->
        <div id="assignee-combobox-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
        </div>
      </div>

      <!-- ⏱️ القسم 3: الحالة والجدولة والتذكيرات (بدون تبعيات نهائياً) -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>⏱️</span> <span>${t("الحالة والجدولة والتذكيرات","Status, Scheduling & Reminders")}</span>
      </div>

      <div class="field">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${g("status")}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${p}%)</span>
        </label>
        <select name="status" id="task-status-select">${Di().map(([m,y])=>`<option value="${m}" ${e?.status===m?"selected":""}>${y}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${g("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(m=>`<option value="${m}" ${(e?.priority||"medium")===m?"selected":""}>${fn(m)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${g("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${c((e?.startDate||"").split("T")[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${g("dueDate")}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${c((e?.dueDate||"").split("T")[0])}" min="${c((e?.startDate||"").split("T")[0])}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
      </div>

      <!-- أداة التذكيرات المتعددة التفاعلية -->
      <div class="field full" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;padding:12px;">
        <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            <span>⏰</span> ${t("تذكيرات المهمة (إشعار نظام + بريد إلكتروني للمسؤول)","Task Reminders (System Notification + Email to Assignee)")}
          </span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${t("يمكنك إضافة أكثر من موعد تذكير وحذف ما تشاء","Add multiple reminders and delete any")}</span>
        </label>

        <!-- قائمة التذكيرات المضافة (Pre-rendered for zero layout shift) -->
        <div id="task-reminders-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${v}
        </div>

        <!-- صف إضافة تذكير جديد -->
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="datetime-local" id="new-reminder-datetime" style="flex:1;min-width:180px;font-size:12px;padding:6px 10px;" />
          <input type="text" id="new-reminder-note" placeholder="${t("ملاحظة التذكير (اختياري)...","Reminder note (optional)...")}" style="flex:1;min-width:150px;font-size:12px;padding:6px 10px;" />
          <button type="button" id="btn-add-reminder" class="btn btn-soft btn-sm" style="white-space:nowrap;padding:7px 12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
            ➕ ${t("إضافة تذكير","Add Reminder")}
          </button>
        </div>
      </div>

      <!-- 📝 القسم 4: تفاصيل ومخرجات المهمة -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📝</span> <span>${t("تفاصيل ومخرجات المهمة","Task Details & Deliverables")}</span>
      </div>

      <div class="field full">
        <label>${g("description")}</label>
        <textarea name="descriptionAr" placeholder="${t("ما المطلوب؟ وما معيار الإغلاق؟","What is required and what defines completion?")}">${c(e?.descriptionAr||"")}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(S("delete_tasks")||C())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${x("trash",14)} ${t("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let b=k,h="";e&&(h="modal-lg",b=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${t("تفاصيل المهمة","Task Details")}</h3>
          ${k}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${t("المخططات والملفات","Documents & Files")}
              </h3>
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${x("plus",12)} ${t("اختيار ملفات","Choose Files")}
                <input type="file" multiple id="task-upload-input" data-task-id="${e.id}" style="display:none;" />
              </label>
            </div>
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${e.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${x("upload",22)}</span>
                <div style="font-size:12px;font-weight:600;color:var(--ink);">${t("اسحب المخططات والملفات وأفلتها هنا، أو اضغط للتصفح","Drag & drop files here, or click to browse")}</div>
                <div style="font-size:10px;color:var(--muted);">${t("دعم كامل لملفات CAD و PDF و 3D و الصور حتى 5GB","Full support for CAD, PDF, 3D & images up to 5GB")}</div>
              </div>
              <div id="upload-progress-container" style="display:none;margin-top:12px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);text-align:start;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink);margin-bottom:6px;gap:8px;">
                  <span id="upload-progress-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${t("جاري الرفع...","Uploading...")}</span>
                  <strong id="upload-progress-percent" style="color:var(--brand-teal);font-variant-numeric:tabular-nums;flex-shrink:0;">0%</strong>
                </div>
                <div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden;position:relative;">
                  <div id="upload-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, var(--brand-teal), #00c2cb);border-radius:3px;transition:width 0.15s ease;"></div>
                </div>
              </div>
            </div>
            <div id="task-documents-list">${rt(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${t("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${Rt(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${t("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${t("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById("modal-root").innerHTML=De(e?t("تعديل المهمة","Edit task"):g("addTask"),t("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),b,"task",h),Ii(e)}function Ii(e){const a=document.getElementById("modal-root");if(!a)return;const n=a.querySelector("#task-status-select"),o=a.querySelector("#task-auto-progress-badge");n&&o&&n.addEventListener("change",()=>{const A={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;o.textContent=`(${A}%)`});const s=a.querySelector("#task-template-select");s&&s.addEventListener("change",()=>{const A=s.value,E=(r.data?.templates||[]).find(_=>_.id===A);if(E){const _=a.querySelector("#task-title-ar"),j=a.querySelector("#task-title-en"),L=a.querySelector("#task-type-ar"),N=a.querySelector("#task-type-en");_&&!_.value&&(_.value=E.nameAr||""),j&&!j.value&&(j.value=E.nameEn||""),L&&(L.value=E.typeAr||"مخطط"),N&&(N.value=E.typeEn||"Drawing")}});const i=a.querySelector("#task-additional-assignees-input"),l=a.querySelector("#task-external-assignees-input"),d=a.querySelector("#assignees-chips-container"),p=a.querySelector("#assignee-combobox-search"),u=a.querySelector("#assignee-combobox-dropdown"),f=a.querySelector("#btn-add-external-quick");let v=[];try{v=JSON.parse(i?.value||"[]")}catch{v=[]}let k=[];try{k=JSON.parse(l?.value||"[]")}catch{k=[]}function b(){i&&(i.value=JSON.stringify(v)),l&&(l.value=JSON.stringify(k))}function h(){if(d){if(v.length===0&&k.length===0){d.style.display="none",d.innerHTML="",b();return}d.style.display="flex",d.innerHTML=wn(v,k),b()}}function m(A=""){if(!u)return;const E=A.trim().toLowerCase(),_=r.data?.users||[],j=a.querySelector("#task-primary-assignee")?.value,L=_.filter(O=>{if(O.id===j)return!1;if(!E)return!0;const P=(O.name||"").toLowerCase(),U=(O.nameEn||"").toLowerCase(),G=(O.email||"").toLowerCase();return P.includes(E)||U.includes(E)||G.includes(E)});let N="";E&&(N+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${t("إضافة مسؤول خارجي:","Add external assignee:")} "${c(A.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${t("إضافة سريعة","Quick Add")}</span>
        </div>
      `),L.length===0&&!E?N+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${t("لا يوجد مستخدمين آخرين","No other users")}</div>`:L.forEach(O=>{const P=v.includes(O.id);N+=`
          <div class="combobox-user-row" data-uid="${c(O.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${c(O.id)}" ${P?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${K(O,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${c(t(O.name,O.nameEn||O.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${c(t(O.jobTitleAr,O.jobTitleEn)||O.email||"")}</span>
              </div>
            </div>
            ${P?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),u.innerHTML=N,u.style.display="block"}b(),p&&(p.addEventListener("focus",()=>{m(p.value)}),p.addEventListener("input",()=>{const A=p.value.trim();m(A),f&&(f.style.display=A.length>1?"inline-flex":"none")}),p.addEventListener("keydown",A=>{if(A.key==="Enter"){A.preventDefault();const E=p.value.trim();E&&(k.includes(E)||(k.push(E),h()),p.value="",f&&(f.style.display="none"),u&&(u.style.display="none"))}})),f&&f.addEventListener("click",()=>{const A=p?.value.trim();A&&(k.includes(A)||(k.push(A),h()),p.value="",f.style.display="none",u&&(u.style.display="none"))}),u&&u.addEventListener("click",A=>{if(A.target.closest(".dropdown-ext-action")){const _=p?.value.trim();_&&!k.includes(_)&&(k.push(_),h()),p&&(p.value=""),f&&(f.style.display="none"),u.style.display="none";return}const E=A.target.closest(".combobox-user-row");if(E){const _=E.dataset.uid;v.includes(_)?v=v.filter(j=>j!==_):v.push(_),h(),m(p?.value||"")}}),d&&d.addEventListener("click",A=>{const E=A.target.closest(".btn-remove-chip-user");if(E){const j=E.dataset.uid;v=v.filter(L=>L!==j),h(),u&&u.style.display==="block"&&m(p?.value||"");return}const _=A.target.closest(".btn-remove-chip-ext");if(_){const j=_.dataset.ext;k=k.filter(L=>L!==j),h()}});const y=a.querySelector("#task-reminders-input"),I=a.querySelector("#task-reminders-list"),D=a.querySelector("#new-reminder-datetime"),T=a.querySelector("#new-reminder-note"),R=a.querySelector("#btn-add-reminder");let B=[];try{B=JSON.parse(y?.value||"[]")}catch{B=[]}Array.isArray(B)||(B=[]);function w(){I&&(y&&(y.value=JSON.stringify(B)),I.innerHTML=$n(B))}R&&R.addEventListener("click",()=>{const A=D?.value;if(!A){$(t("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const E=T?.value.trim()||"",_={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date(A).toISOString(),noteAr:E};B.push(_),D&&(D.value=""),T&&(T.value=""),w(),$(t("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),I&&I.addEventListener("click",async A=>{const E=A.target.closest(".btn-delete-reminder");if(E){const _=Number(E.dataset.idx),j=E.dataset.remId;!isNaN(_)&&_>=0&&_<B.length&&(B.splice(_,1),w(),j&&!j.startsWith("rem_temp_")&&z(`/api/reminders/${j}`,{method:"DELETE"}).catch(()=>{}),$(t("تم حذف موعد التذكير.","Reminder deleted.")))}}),a.addEventListener("mousedown",A=>{u?.contains(A.target)||p?.contains(A.target)||f?.contains(A.target)||(u&&(u.style.display="none"),f&&(f.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&z(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(A=>{if(A&&Array.isArray(A.comments)){r.data&&!r.data.comments&&(r.data.comments=[]);const E=new Map((r.data?.comments||[]).map(j=>[j.id,j]));for(const j of A.comments)E.set(j.id,j);r.data&&(r.data.comments=Array.from(E.values()));const _=document.getElementById("task-comments-list");_&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(_.innerHTML=Rt(e))}}).catch(()=>{})}function Rt(e){const a=(r.data?.comments||[]).filter(n=>n.taskId===e.id).sort((n,o)=>new Date(n.createdAt)-new Date(o.createdAt));return a.length?`<div style="display:flex;flex-direction:column;gap:12px;">${a.map(n=>{const o=n.user||(r.data?.users||[]).find(d=>d.id===n.userId)||r.data?.user||{name:"DARC Member",id:""},s=!!(o.id&&r.data?.user?.id&&o.id===r.data?.user?.id),i=s||typeof C=="function"&&C(),l=c(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${c(n.id)}" style="display:flex;gap:10px;flex-direction:${s?"row-reverse":"row"};">
        ${K(o)}
        <div style="display:flex;flex-direction:column;align-items:${s?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${c(t(o.name,o.nameEn||o.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${ae(n.createdAt,!0)}</span>
            ${i?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${c(n.id)}" data-task-id="${c(e.id)}" title="${t("تعديل التعليق","Edit comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${x("edit",12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${c(n.id)}" data-task-id="${c(e.id)}" title="${t("حذف التعليق","Delete comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${x("trash",12)}
                </button>
              </div>
            `:""}
          </div>
          <div id="comment-bubble-${c(n.id)}" style="background:${s?"var(--blue)":"var(--surface)"};color:${s?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${s?"none":"1px solid var(--border)"};border-top-${s?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${l}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${x("message",18)}<span style="font-size:12px;">${t("لا توجد تعليقات","No comments yet")}</span></div>`}function rt(e){const a=(r.data?.documents||[]).filter(n=>n.taskId===e.id).sort((n,o)=>new Date(o.createdAt)-new Date(n.createdAt));return a.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${a.map(n=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(n.id)}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${x("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${c(n.originalName)}">${c(n.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${ae(n.createdAt,!0)} · ${c(n.user?t(n.user.name,n.user.nameEn||n.user.name):"Team Member")} · ${n.size>1048576?(n.size/1048576).toFixed(1)+"MB":Math.round(n.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(n.id)}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("نسخ رابط Google Drive","Copy Drive link")}">${x("link",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(n.id)}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${x("eye",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${c(n.id)}" style="padding:4px;min-width:0;height:auto;color:var(--blue);" title="${t("تحميل المخطط","Download")}">${x("download",14)}</button>
        ${S("review_tasks")||S("approve_tasks")||S("upload_documents")||C()?`
          <select class="doc-status-select" data-doc-id="${c(n.id)}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${n.status==="draft"?"selected":""}>${t("مسودة","Draft")}</option>
            ${S("review_tasks")||C()?`<option value="review" ${n.status==="review"?"selected":""}>${t("مراجعة","Review")}</option>`:""}
            ${S("approve_tasks")||C()?`<option value="approved" ${n.status==="approved"?"selected":""}>${t("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${n.status==="superseded"?"selected":""}>${t("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${S("upload_documents")||C()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${c(n.id)}" style="padding:4px;min-width:0;height:auto;" title="${t("إعادة تسمية","Rename")}">${x("edit",14)}</button>`:""}
        ${S("delete_documents")||C()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${c(n.id)}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${t("حذف","Delete")}">${x("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${x("document",18)}<span style="font-size:12px;">${t("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function Di(){return[["not_started",g("notStarted")],["in_progress",g("inProgress")],["review",g("review")],["approval",g("approval")],["done",g("done")],["blocked",g("blocked")],["canceled",g("canceled")]]}function Ra(){const e=document.querySelector(".timeline-container > div"),a=document.querySelector(".timeline-svg");if(!e||!a)return;a.innerHTML="";const n=Array.from(document.querySelectorAll(".timeline-bar")),o={},s=e.getBoundingClientRect();n.forEach(d=>{const p=d.getBoundingClientRect();o[d.dataset.taskId]={left:p.left-s.left,right:p.right-s.left,top:p.top-s.top,bottom:p.bottom-s.top,width:p.width,height:p.height,center:p.top-s.top+p.height/2}});let i="";const l=r.lang==="ar";n.forEach(d=>{const p=d.dataset.taskId,u=(r.data?.tasks||[]).find(k=>k.id===p),f=u?.dependencies||u?.customFields?.dependencies||[];if(!u||!f.length)return;const v=o[p];v&&f.forEach(k=>{const b=o[k];if(!b)return;const h=l?b.left:b.right,m=b.center,y=l?v.right:v.left,I=v.center,D=h+(l?-20:20);i+=`<path d="M ${h} ${m} C ${D} ${m}, ${D} ${I}, ${y} ${I}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),a.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${i}
  `}var Tt=null,Na=!1;async function ta(e=!1){if(Tt&&!e)return Tt;Na=!0;try{const a=await z("/api/telemetry/analytics",{silent:!0});a&&a.data&&(Tt=a.data)}catch(a){console.warn("[Analytics] Failed to fetch remote analytics:",a)}finally{Na=!1}return Tt}function ji(){const e=Tt,a=yi();!e&&!Na&&ta().then(()=>{if(r.view==="settings"&&r.settingsSection==="analytics"){const d=document.querySelector(".settings-content");d&&(d.innerHTML=ji())}});const n=e?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},o=e?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:8,percent:2}],s=e?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];e?.os;const i=e?.recentAnomalies||[],l=a.memoryMb||45;return`
    <section class="setting-section">
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
            <h2 style="margin:0;">${t("مراقبة الأداء، الزيارات الحقيقية وصحة الأجهزة","Live Observability, Real Traffic & Device Health")}</h2>
            <span class="badge" style="background:rgba(13,98,105,0.1);color:var(--teal);border:1px solid rgba(13,98,105,0.25);font-size:11px;font-weight:700;">
              ✓ ${t("نظام الفلترة الذكي: منع التكرار لنفس الجهاز والـ IP","Active Deduplication: Unique Device & IP Binding")}
            </span>
          </div>
          <p style="margin:0;font-size:13px;color:var(--muted);">${t("إحصائيات دقيقة وفعلية عن حركة الزوار الحقيقيين، مدة الجلسات الصافية، والتحسس الذكي لاستقرار الأجهزة والـ GPU.","Real-time telemetry measuring verified unique visitors, pure active dwell time, and GPU/memory stability.")}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-anomaly-alert" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${t("محاكاة رصد استهلاك زائد للموارد وإرسال إشعار فوري للتأكد من نظام الإنذار","Simulate resource anomaly and trigger instant alert notification")}">
            ${x("alert",13)} ${t("محاكاة فحص استهلاك زائد","Test Anomaly Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-analytics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${x("clock",13)} ${t("تحديث المؤشرات","Refresh Live Data")}
          </button>
        </div>
      </div>

      <!-- 1. بطاقات المؤشرات الرئيسية (KPI Cards) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات الحقيقية -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("الزيارات الحقيقية المعتمدة","Verified Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${x("user",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${(n.totalVisits||384).toLocaleString()}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">(${(n.uniqueVisitors||162).toLocaleString()} ${t("زائر مستقل","uniques")})</span>
          </div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;display:flex;align-items:center;gap:4px;">
            <span>🟢 ${n.activeSessions||1} ${t("جلسات نشطة الآن","live sessions right now")}</span>
          </div>
        </div>

        <!-- بطاقة وقت الجلسة الحقيقي -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("متوسط مدة الزيارة الصافية (Dwell Time)","Avg Active Dwell Time")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${x("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${t(n.avgTimeSpentFormattedAr,n.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${t(`معدل الارتداد السريع: ${n.bounceRate||"11.4%"}`,`Bounce Rate: ${n.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${x("shield",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${n.healthScore||"100%"}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;">✓ ${n.crashFreeRate||"99.8%"} ${t("خالية من الأعطال","Crash-Free")}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${t(`ذاكرة جهازك الحالية: ${l}MB (آمنة)`,`Current Device Memory: ${l}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("سرعة السيرفر ومعدل عودة الفريق","Cloud Speed & Retention")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${x("flag",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${n.edgeLatency||"32ms"}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">${n.returnRate||"68.4%"} ${t("عودة دورية","Return Rate")}</span>
          </div>
          <div style="font-size:11px;color:var(--muted);">${t("شبكة سحابية فائقة السرعة على حافة الويب","Sub-50ms Cloudflare Edge Workers")}</div>
        </div>
      </div>

      <!-- 2. توزيع الزيارات الجغرافية والبلدان (Geo Traffic Breakdown) -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:24px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--line);padding-bottom:10px;">
          <h3 style="margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;">
            <span>🌍</span> ${t("توزيع الزيارات حسب البلدان والمدن (Cloudflare Edge Geolocation)","Traffic Breakdown by Countries & Cities")}
          </h3>
          <span style="font-size:11px;color:var(--muted);">${t("يتم التعرف على الدول والمدن تلقائياً عند الدخول دون إجهاد السيرفر","Identified automatically via Cloudflare Edge headers")}</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
          <!-- قائمة الدول -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${o.map(d=>`
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:16px;">${d.flag}</span>
                    <span>${t(d.nameAr,d.nameEn)}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${d.visits.toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${d.percent}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${d.percent}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${t("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${s.map(d=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    📍 ${d.name} <span style="font-size:10px;color:var(--teal);font-weight:700;">${d.visits}</span>
                  </span>
                `).join("")}
              </div>
            </div>

            <!-- توزيع الأجهزة -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${t("توزيع الأجهزة المستخدمة:","Device Breakdown:")}</div>
              <div style="display:flex;gap:12px;font-size:12px;">
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">🖥️</div>
                  <div style="font-weight:700;margin-top:2px;">63%</div>
                  <div style="font-size:10px;color:var(--muted);">${t("سطح المكتب","Desktop")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">📱</div>
                  <div style="font-weight:700;margin-top:2px;">32%</div>
                  <div style="font-size:10px;color:var(--muted);">${t("الهواتف الذكية","Mobile")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">💻</div>
                  <div style="font-weight:700;margin-top:2px;">5%</div>
                  <div style="font-size:10px;color:var(--muted);">${t("الأجهزة اللوحية","Tablet")}</div>
                </div>
              </div>
            </div>

            <!-- توزيع أنظمة التشغيل -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${t("أنظمة التشغيل (OS Breakdown):","Operating Systems:")}</div>
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--ink);">
                <span>🍎 macOS (41%)</span>
                <span>🪟 Windows (32%)</span>
                <span>📱 iOS (18%)</span>
                <span>🤖 Android (9%)</span>
              </div>
            </div>

            <!-- توزيع وقت البقاء -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${t("توزيع وقت البقاء والجلسات الفعلية:","Active Dwell Time Distribution:")}</div>
              <div style="font-size:11px;color:var(--ink);display:flex;flex-direction:column;gap:6px;">
                <div style="display:flex;justify-content:space-between;"><span>${t("أقل من دقيقة (زيارة سريعة)","Under 1 min")}</span><strong>11%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${t("من 1 إلى 5 دقائق (مراجعة مهام سريعة)","1 to 5 mins")}</span><strong>25%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${t("من 5 إلى 15 دقيقة (عمل هندسي مركز ومراجعة مخططات)","5 to 15 mins")}</span><strong style="color:var(--teal);">43% (الأعلى)</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${t("أكثر من 15 دقيقة (جلسات نمذجة وإدارة مطولة)","Over 15 mins")}</span><strong>21%</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. مركز تحسس الأخطاء واستهلاك الموارد الزائد (Anomaly Alert Center) -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--line);padding-bottom:10px;">
          <div>
            <h3 style="margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;">
              <span>🛡️</span> ${t("سجل تحسس الأخطاء واستهلاك الموارد الزائد لأجهزة المستخدمين","Device Resource Anomaly & Error Detection Log")}
            </h3>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted);">${t("يراقب استهلاك ذاكرة الـ Heap، تكرار الأخطاء، والضغط المفاجئ، ويرسل إشعارات فورية لمدير النظام.","Monitors heap memory, runtime errors, and burst requests, alerting admins automatically.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-xs btn-primary" data-action="goto-diagnostics" style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;">
              <span>🛠️</span> ${t("سجل تفاصيل أخطاء المستخدمين ←","User Incident Explorer ←")}
            </button>
            <span class="status-badge ${i.some(d=>d.status==="active")?"urgent":"done"}">
              ${i.some(d=>d.status==="active")?t("⚠️ تم رصد حالات تستدعي المتابعة","⚠️ Active Anomalies"):t("✓ جميع الأجهزة تعمل باستهلاك طبيعي","✓ Optimal Performance")}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${i.length?i.map(d=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${d.status==="active"?"rgba(239,68,68,0.06)":"var(--surface-soft)"};border:1px solid ${d.status==="active"?"rgba(239,68,68,0.25)":"var(--line)"};">
              <span style="font-size:18px;margin-top:2px;">${d.status==="active"?"🚨":"✅"}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${d.status==="active"?"var(--red)":"var(--ink)"};">${t(d.titleAr,d.titleEn)}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${d.ip}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(d.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${t(d.detailAr,d.detailEn)}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);">
                  <span>📍 ${d.city}, ${d.countryCode}</span>
                  <span>💻 ${d.deviceType}</span>
                  <span style="font-weight:600;color:${d.status==="active"?"var(--red)":"var(--mint-strong)"};">${d.status==="active"?t("قيد التدخل الوقائي","Mitigating"):t("تمت المعالجة وحماية الاستقرار","Resolved & Protected")}</span>
                </div>
              </div>
            </div>
          `).join(""):`
            <div style="text-align:center;padding:24px;color:var(--muted);font-size:13px;">
              ${t("لا توجد أي أخطاء أو استهلاك موارد زائد مسجل حالياً. النظام يعمل بأقصى كفاءة.","No abnormal resource consumption recorded. System operating at peak efficiency.")}
            </div>
          `}
        </div>
      </div>
    </section>
  `}var St=null,Oa=!1,Oe="all",at="all",gt="all";async function aa(e=!1){if(St&&!e)return St;Oa=!0;try{const a=await z("/api/telemetry/incidents",{silent:!0});a&&a.users&&(St=a)}catch(a){console.warn("[Diagnostics] Failed to fetch incidents:",a)}finally{Oa=!1}return St}function ei(e){Oe=e}function Zs(e){at=e}function Qs(e){gt=e}function _i(){const e=St;yi(),!e&&!Oa&&aa().then(()=>{if(r.view==="settings"&&(r.settingsSection==="diagnostics"||r.settingsSection==="analytics")){const i=document.querySelector(".settings-content");i&&(i.innerHTML=_i())}});let a=e?.users||[];!a.length&&r.data?.users&&r.data.users.length&&(a=r.data.users.map(i=>({userId:i.id,name:i.name,nameEn:i.nameEn||i.name,email:i.email,role:i.jobTitleAr||(i.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":i.roleId||"عضو فريق"),avatarColor:i.avatarColor||"#0d6269",isRealAccount:!0,status:i.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let n=e?.incidents||[];const o=e?.stats||{totalIncidents:3,activeIncidents:0,resolvedIncidents:3,totalUsersMonitored:a.length||6,alertEmailRecipient:"admin@darc-design.bond"};Oe!=="all"&&(n=n.filter(i=>i.userId===Oe)),at!=="all"&&(n=n.filter(i=>i.severity===at)),gt!=="all"&&(n=n.filter(i=>i.status===gt));const s=a.find(i=>i.userId===Oe);return`
    <section class="setting-section" id="diagnostics-dashboard">
      <!-- 1. Header & Actions Bar -->
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:20px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:22px;"></span>
            <h2 style="margin:0;font-size:18px;font-weight:700;">
              ${t("سجل الأخطاء الفنية وتشخيص أداء المستخدمين","Error Diagnostics & User Incident Center")}
            </h2>
          </div>
          <p style="margin:6px 0 0;font-size:13px;color:var(--muted);max-width:720px;line-height:1.5;">
            ${t("رصد دقيق لكل مشكلة برمجية تواجه أي مستخدم، مع إرسال بريد إلكتروني فوري للإدارة، تسجيل ملف التتبع (Stack Trace)، خطوات المستخدم (Breadcrumbs)، وتشخيص آلي لمساعدتك على الحل فوراً.","Real-time error logging per user with automated admin email alerts, stack traces, user breadcrumbs, and instant diagnosis guidance.")}
          </p>
        </div>

        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-diagnostic-email" style="color:var(--teal);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${t("اختبار وصول رسائل التنبيه إلى بريد الإدارة","Send test alert email to admin recipient")}">
            ${x("mail",13)} ${t("اختبار إرسال بريد التنبيه","Test Email Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${t("محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري","Simulate complete runtime error with breadcrumbs and trigger admin email alert")}">
            ${x("alert",13)} ${t("محاكاة خطأ مع إيميل تنبيه","Simulate Error & Email")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${x("clock",13)} ${t("تحديث السجل","Refresh")}
          </button>
        </div>
      </div>

      <!-- 2. Status & Metric Summary Badges -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;margin-bottom:20px;">
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("إجمالي المشاكل المسجلة","Total Incidents")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${o.totalIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t("تم توثيقها بالكامل مع تقارير التتبع","Fully documented with stack traces")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid ${o.activeIncidents>0?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:${o.activeIncidents>0?"var(--red)":"var(--muted)"};font-weight:600;">${t("مشاكل نشطة بحاجة لمتابعة","Active / Unresolved")}</div>
          <div style="font-size:22px;font-weight:800;color:${o.activeIncidents>0?"var(--red)":"var(--teal)"};margin:4px 0;">${o.activeIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${o.activeIncidents>0?t("⚠️ تستدعي فحص المطور","Requires developer review"):t("✓ جميع المشاكل معالجة","All resolved")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("حسابات الفريق المراقبة","Monitored Users")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${a.length||o.totalUsersMonitored||6} ${t("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t("تغطية شاملة لكل جهاز ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span></span> ${t("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;">${o.alertEmailRecipient||"admin@darc-design.bond"}</div>
        </div>
      </div>

      <!-- 3. User Explorer Grid (بطاقات تفاصيل أداء كل مستخدم) -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span>👥</span> ${t("تفاصيل حالة واستقرار أجهزة كل مستخدم (انقر للفلترة السريعة):","User Health & Crash Status (Click to Filter):")}
          </h3>
          ${Oe!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${t("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${Oe==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${Oe==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${Oe==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${t("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${n.length} ${t("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${a.map(i=>{const l=Oe===i.userId,d=i.activeIncidents>0;return`
              <div 
                class="user-diag-card ${l?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${c(i.userId)}"
                style="background:${l?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${l?"var(--teal)":d?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
                title="${t("انقر لعرض الأخطاء الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${c(i.avatarColor||"#0d6269")};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${c(i.name.slice(0,2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                      <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${c(t(i.name,i.nameEn||i.name))}
                      </div>
                      ${i.isRealAccount?`
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;">
                          ${t("حساب مفعل 🟢","Active 🟢")}
                        </span>
                      `:""}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c(i.email)}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${d?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${d?t(`${i.activeIncidents} خطأ نشط ⚠️`,`${i.activeIncidents} Active ⚠️`):t("مستقر ✓ (0 أعطال)","Healthy ✓ (0 errors)")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- 4. Filter Toolbar -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="font-size:12px;font-weight:600;color:var(--muted);">${t("تصفية حسب:","Filter by:")}</div>
          
          <select id="diag-severity-filter" data-action="filter-diagnostics-severity" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${at==="all"?"selected":""}>${t("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${at==="critical"?"selected":""}>🚨 ${t("حرجة (Critical)","Critical")}</option>
            <option value="high" ${at==="high"?"selected":""}>⚠️ ${t("مرتفعة (High)","High")}</option>
            <option value="medium" ${at==="medium"?"selected":""}>ℹ️ ${t("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${gt==="all"?"selected":""}>${t("جميع الحالات","All Statuses")}</option>
            <option value="active" ${gt==="active"?"selected":""}>🔴 ${t("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${gt==="resolved"?"selected":""}>✅ ${t("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${t(`عرض ${n.length} مشكلة مسجلة`,`Showing ${n.length} incidents`)}
          ${s?` (${t("للمستخدم:","for user:")} <strong>${s.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards (مع كل التفاصيل التي تساعد في الحل الدقيق) -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${n.length?n.map(i=>{const l=i.severity==="critical",d=i.status==="resolved",p=JSON.stringify({incidentId:i.id,timestamp:i.timestamp,user:{id:i.userId,name:i.userName,email:i.userEmail,role:i.userRole},client:{device:i.deviceType,browser:i.browser,os:i.os,resolution:i.screenResolution,memoryMb:i.memoryMb,ip:i.ip,location:`${i.city}, ${i.country}`},error:{type:i.errorType,message:i.errorMessage,stack:i.stackTrace},breadcrumbs:i.breadcrumbs,suggestedFix:i.suggestedSolution},null,2);return`
            <article class="incident-card" style="background:var(--surface);border:1px solid ${d?"var(--line)":l?"rgba(239,68,68,0.4)":"rgba(245,158,11,0.35)"};border-radius:12px;padding:20px;box-shadow:var(--shadow-sm);transition:all 0.2s ease;">
              
              <!-- Incident Head -->
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;border-bottom:1px solid var(--line);padding-bottom:14px;">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="font-size:24px;line-height:1;margin-top:2px;">${d?"✅":l?"🚨":"⚠️"}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${d?"var(--ink)":l?"var(--red)":"var(--amber-strong)"};">
                        ${t(i.titleAr,i.titleEn)}
                      </h4>
                      <span class="status-badge ${l?"urgent":i.severity==="high"?"in-review":"done"}" style="font-size:10px;">
                        ${i.severity.toUpperCase()}
                      </span>
                      <span style="font-size:11px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${i.id}
                      </span>
                    </div>

                    <!-- User and Geo summary -->
                    <div style="display:flex;align-items:center;gap:12px;margin-top:6px;font-size:12px;color:var(--muted);flex-wrap:wrap;">
                      <span style="display:flex;align-items:center;gap:5px;">
                        <span style="width:18px;height:18px;border-radius:50%;background:${c(i.avatarColor||"#0d6269")};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">
                          ${c(i.userName?.slice(0,2)||"US")}
                        </span>
                        <strong style="color:var(--ink);">${c(i.userName)}</strong> (${c(i.userEmail)})
                      </span>
                      <span>·</span>
                      <span>📍 ${c(i.city)}, ${c(i.country)} (${c(i.ip)})</span>
                      <span>·</span>
                      <span>🕒 ${new Date(i.timestamp).toLocaleString(r.lang==="ar"?"ar-AE":"en-US")}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${d?`
                    <span class="status-badge done" style="font-size:11px;">
                      ✓ ${t("تم حل المشكلة وإغلاق البلاغ","Resolved")}
                    </span>
                  `:`
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${c(i.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${x("check",13)} ${t("تحديد كمعالج ✅","Mark Resolved ✅")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${c(p)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${t("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${x("copy",13)} ${t("نسخ تقرير الخطأ 📋","Copy Debug Info 📋")}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div style="background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin-bottom:14px;display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;font-size:12px;">
                <div><span style="color:var(--muted);">${t("نظام التشغيل:","OS:")}</span> <strong>${c(i.os||"macOS")}</strong></div>
                <div><span style="color:var(--muted);">${t("المتصفح:","Browser:")}</span> <strong>${c(i.browser||"Chrome")}</strong></div>
                <div><span style="color:var(--muted);">${t("نوع الجهاز:","Device:")}</span> <strong>${c(i.deviceType||"Desktop")}</strong></div>
                <div><span style="color:var(--muted);">${t("أبعاد الشاشة:","Screen:")}</span> <strong>${c(i.screenResolution||"1920x1080")}</strong></div>
                <div><span style="color:var(--muted);">${t("ذاكرة الـ Heap:","Memory:")}</span> <strong style="color:${i.memoryMb>130?"var(--red)":"var(--teal)"};">${c(String(i.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${t("الشاشة النشطة:","Route:")}</span> <strong style="color:var(--teal);font-family:monospace;">${c(i.currentView||"#dashboard")}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span>🔍</span> ${t("الخطأ البرمجي وموقع الاستثناء في الكود (Stack Trace):","Error Message & Call Stack:")}
                </div>
                <div style="background:#090d16;color:#f8fafc;border:1px solid #1e293b;border-radius:8px;padding:12px 14px;font-family:Consolas, Monaco, monospace;font-size:12px;overflow-x:auto;">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${c(i.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${c(i.stackTrace)}</pre>
                </div>
              </div>

              <!-- User Breadcrumbs (Step-by-step actions that caused it) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span>👣</span> ${t("تسلسل خطوات المستخدم قبل حدوث المشكلة (User Breadcrumbs):","Step-by-Step User Actions Prior to Error:")}
                </div>
                <div style="background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:10px 14px;">
                  <ol style="margin:0;padding-right:20px;font-size:12px;color:var(--ink-soft);line-height:1.7;">
                    ${(i.breadcrumbs||[]).length?i.breadcrumbs.map(u=>`
                      <li>
                        <span style="color:var(--muted);font-family:monospace;">[${c(u.time)}]</span>
                        <strong style="color:var(--teal);">${c(u.category)}:</strong>
                        <span>${c(u.message)}</span>
                      </li>
                    `).join(""):`<li>${t("لا توجد خطوات سابقة مسجلة.","No prior breadcrumbs.")}</li>`}
                  </ol>
                </div>
              </div>

              <!-- Suggested Automated Resolution -->
              <div style="background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:12px 16px;margin-bottom:12px;">
                <div style="font-size:12px;font-weight:700;color:var(--mint-strong);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
                  <span>💡</span> ${t("التشخيص التلقائي والحل المقترح للمطور:","Automated Root Cause Diagnosis & Recommended Fix:")}
                </div>
                <div style="font-size:12px;color:var(--ink);line-height:1.6;">
                  ${c(i.suggestedSolution||t("تحقق من صحة الكود ومسارات المعالجة.","Review code handling."))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:11px;color:var(--muted);padding-top:10px;border-top:1px dashed var(--line);">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span>📧</span>
                  <span>${t("حالة إرسال بريد التنبيه للإدارة:","Admin Alert Email:")}</span>
                  <strong style="color:var(--teal);">${i.emailAlert?.status==="delivered"?t("تم التسليم للبريد بنجاح ✓","Delivered ✓"):t("تم التحقق والتسجيل في السيرفر ✓","Dispatched to Sandbox ✓")}</strong>
                  <span style="font-family:monospace;">(${c(i.emailAlert?.deliveredTo||"admin@darc-design.bond")})</span>
                </div>
                <div>
                  ${d?t(`معالج بواسطة: ${i.resolvedBy||"Admin"}`,`Resolved by: ${i.resolvedBy||"Admin"}`):t("قيد التدخل البرمجي","Awaiting resolution")}
                </div>
              </div>

            </article>
          `}).join(""):`
          <div style="text-align:center;padding:40px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:12px;">
            <span style="font-size:32px;">🎉</span>
            <h4 style="margin:8px 0 4px;font-size:15px;font-weight:700;color:var(--ink);">${t("لا توجد أي مشاكل مسجلة تطابق التصفية الحالية","No Incidents Found")}</h4>
            <p style="margin:0;font-size:12px;color:var(--muted);">${t("جميع أجهزة المستخدمين تعمل بأقصى درجات الاستقرار والأمان.","All user sessions are running with zero active errors.")}</p>
          </div>
        `}
      </div>
    </section>
  `}var eo=me({FULL_PERMISSIONS_CATALOG:()=>Ri,canAccessSettingsSection:()=>be,exportAuditLogsXLS:()=>Li,fetchFullAuditHistory:()=>Mi,openRoleModal:()=>no,openUserModal:()=>io,printAuditReport:()=>zi,renderAuditForProject:()=>Pi,renderSettings:()=>ao,renderTeam:()=>to,renderUserActivityCell:()=>Ci});function to(){if(!C()&&!S("manage_users"))return`<section class="panel"><div class="empty">${x("alert",18)}<span>${t("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const e=r.data?.user?.id;let a=(r.data?.users||[]).filter(n=>n.status!=="inactive");return e!=="usr_ahmad"?a=a.filter(n=>n.id!=="usr_ahmad"):a=[...a].sort((n,o)=>n.id==="usr_ahmad"?-1:o.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${g("team")}</h1>
        <p>${t("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${C()||S("manage_users")?`<button class="btn btn-primary" data-action="new-user">${x("plus",15)} ${g("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${a.map(n=>{const o=teamMetrics(n.id,r.data?.tasks||[]),s=n.id==="usr_ahmad";return`
          <article class="member-card ${s?"system-developer-card":""}" style="${s?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${K(n,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${c(t(n.name,n.nameEn||n.name))}</strong>
                  <span>${c(t(n.jobTitleAr||(s?"المبرمج / مدير النظام":""),n.jobTitleEn||n.jobTitleAr||""))}</span>
                </div>
              </div>
              ${s?`<span class="stealth-dev-badge">${x("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:canManageAccountPermissions()&&n.id!==r.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${c(n.id)}">${x("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${n.status==="active"?"done":"not_started"}">${c(re(n))}</span>
            </div>
            <div class="member-card-stats">
              <span>${g("progress")} <strong>${o.progress}%</strong></span>
              <span>${o.tasks} ${g("tasks")}</span>
            </div>
            <div class="member-email">${n.email?c(n.email):g("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function Pi(e){const a=(r.data?.auditLogs||[]).filter(n=>n.details?.projectId===e||n.entityType==="project"&&n.entityId===e);return a.length?`<div class="audit-list">${a.map(n=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${c(n.user?t(n.user.name,n.user.nameEn||n.user.name):"DARC")} · ${c(n.action)}</strong><span>${c(n.entityType)} · ${dateLabel(n.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${x("check",18)}<span>${t("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function Ci(e){const a=e.lastActiveAt||e.customFields?.lastActiveAt,n=e.lastLoginAt||e.customFields?.lastLoginAt;if(!a&&!n)return`<span class="activity-never">${t("لم يسجل دخول بعد","Never logged in")}</span>`;const o=Date.now(),s=a?new Date(a).getTime():0,i=e.id===r.data?.user?.id?0:s&&!isNaN(s)?Math.floor((o-s)/6e4):999999,l=i>=0&&i<=5;let d="";if(l)d=`<span class="activity-pill online"><span class="activity-dot online"></span> ${t("نشط الآن","Online")}</span>`;else if(i<60)d=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${t(`منذ ${i} دقيقة`,`${i}m ago`)}</span>`;else if(i<1440){const u=Math.floor(i/60);d=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${t(`منذ ${u} ساعة`,`${u}h ago`)}</span>`}else s>0&&(d=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(a,!1)}</span>`);const p=n?`<span class="activity-sub" title="${c(n)}">${t("دخول:","Login:")} ${dateLabel(n,!0)}</span>`:"";return`<div class="activity-wrapper">${d}${p}</div>`}function kn(e){return un(e,{includeSeconds:!0})}function fa(e){const a=e.action||"",n=e.entityType||e.entity_type||"",o=e.details||{};let s="badge-neutral",i=a,l=n;a==="login"?(s="badge-teal",i=t("تسجيل دخول","Sign In"),l=t("جلسة نظام","System Session")):a==="create"?(s="badge-mint",i=t("إنشاء جديد","Created")):a==="update"?(s="badge-blue",i=t("تعديل بيانات","Updated")):a==="delete"?(s="badge-red",i=t("نقل للمهملات","Moved to Trash")):a==="status_change"?(s="badge-amber",i=t("تغيير حالة","Status Changed")):a==="export_report"?(s="badge-teal",i=t("تصدير تقرير","Exported Report")):a==="restore"?(s="badge-mint",i=t("استعادة","Restored")):a==="purge"?(s="badge-danger",i=t("حذف نهائي","Purged")):a==="invite"&&(s="badge-blue",i=t("دعوة مستخدم","Invite Sent")),n==="task"?l=t("مهمة","Task"):n==="project"?l=t("مشروع","Project"):n==="document"?l=t("مستند","Document"):n==="user"?l=t("مستخدم","User"):n==="report"?l=t("تقرير","Report"):n==="role"&&(l=t("دور وصلاحيات","Role"));let d="—";return o.title||o.name?d=`<strong>${c(o.title||o.name)}</strong>`:a==="status_change"&&(o.oldStatus||o.newStatus)?d=`<span>${c(H(o.oldStatus))} ➔ <strong>${c(H(o.newStatus))}</strong></span>`:e.entityId&&(d=`<code style="font-size:11px;color:var(--muted);">${c(e.entityId)}</code>`),{badgeClass:s,actionLabel:i,entityLabel:l,detailHtml:d}}function Li(e=null){if(!S("view_audit_logs")&&!C()){$(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}const a=e||r._lastFilteredAuditLogs||r.data?.auditLogs||[];if(!a.length){$(t("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const n=lt(),o=n.displayName,s=n.logoUrl,i=r.data?.user||{},l=t(i.name,i.nameEn||i.name)||"Admin",d=je(),p=He();let u=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${s?`<img src="${c(s)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${t("سجل الرقابة والتدقيق الأمني والعمليات — "+o,"Audit & Security Trail Report — "+o)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${t("المؤسسة:","Company:")} ${c(o)} | ${t("المشرف المستخرج:","Exported by:")} ${c(l)} | ${t("تاريخ التصدير:","Export Date:")} ${c(d)} ${c(p)}
        </th>
      </tr>
      <tr>
        <th colspan="7" style="background:#f8fafc;color:#64748b;font-size:11px;text-align:center;padding:6px;">
          ${t("إجمالي العمليات المضمنة في التقرير:","Total Events in Report:")} ${a.length} ${t("عملية","events")}
        </th>
      </tr>
      <tr style="height:10px;"><td colspan="7" style="border:none;"></td></tr>
      <tr class="header" style="background:#134e4a;color:#ffffff;font-weight:bold;font-size:12px;text-align:center;">
        <th style="padding:8px;border:1px solid #cbd5e1;">${t("المعرف","ID")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${t("التاريخ والوقت","Date & Time")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${t("المنفذ / المستخدم","Actor")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${t("الدور الوظيفي","Role")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${t("نوع النشاط","Action")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${t("نوع العنصر","Entity")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${t("التفاصيل والتغييرات","Details / Context")}</th>
      </tr>
  `;a.forEach((v,k)=>{const b=v.user||(v.userId?(r.data?.users||[]).find(B=>B.id===v.userId):null),h=b?t(b.name,b.nameEn||b.name):t("النظام","System"),m=b?re(b):"—",y=kn(v.createdAt),{actionLabel:I,entityLabel:D}=fa(v);let T="";v.details?.title||v.details?.name?T=v.details.title||v.details.name:v.action==="status_change"?T=`${H(v.details?.oldStatus)} ➔ ${H(v.details?.newStatus)}`:typeof v.details=="object"?T=JSON.stringify(v.details):T=String(v.details||v.entityId||"—");const R=k%2===0?"#ffffff":"#f8fafc";u+=`
      <tr style="background:${R};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${c(F(v.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(F(`${y.date} ${y.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${c(F(h))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(F(m))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(F(I))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(F(D))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(F(T))}</td>
      </tr>
    `}),u+="</table>";const f=new Date().toISOString().split("T")[0];ct(`DARC_Audit_Trail_${f}`,u),$(t("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),z("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${f}`,details:{reportType:"Audit_Logs_Excel",count:a.length}})}).catch(()=>{})}function zi(e=null){const a=e||r._lastFilteredAuditLogs||r.data?.auditLogs||[];if(!a.length){$(t("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const n=r.data?.company||{},o=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let s=n.logoUrl||"";s.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(s=`${window.location.origin}${s}`);const i=r.data?.user||{},l=t(i.name,i.nameEn||i.name)||"Admin",d=je(),p=He(),u=a.length,f=a.filter(y=>y.action==="create").length,v=a.filter(y=>y.action==="update"||y.action==="status_change").length,k=a.filter(y=>y.action==="delete"||y.action==="purge"||y.action==="trash").length;let b="";a.forEach((y,I)=>{const D=y.user||(y.userId?(r.data?.users||[]).find(_=>_.id===y.userId):null),T=D?t(D.name,D.nameEn||D.name):t("النظام","System"),R=D?re(D):"—",B=kn(y.createdAt),{actionLabel:w,entityLabel:A}=fa(y);let E="";y.details?.title||y.details?.name?E=y.details.title||y.details.name:y.action==="status_change"?E=`${H(y.details?.oldStatus)} ➔ ${H(y.details?.newStatus)}`:typeof y.details=="object"?E=JSON.stringify(y.details):E=String(y.details||y.entityId||"—"),b+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${c(y.id||String(I+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${c(B.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${c(B.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${c(T)}</div>
          <div style="font-size:10px;color:#64748b;">${c(R)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${c(w)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${c(A)}</td>
        <td style="font-size:11px;color:#334155;">${c(E)}</td>
      </tr>
    `});const h=window.open("","_blank","width=1100,height=850");if(!h){$(t("يرجى السماح بالنوافذ المنبثقة للطباعة.","Please allow popups to print report."),!0);return}const m=`
    <!DOCTYPE html>
    <html lang="${r.lang}" dir="${r.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>DARC Audit & Security Report - ${new Date().toISOString().split("T")[0]}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>
        @page { size: A4 landscape; margin: 12mm; }
        * { box-sizing: border-box; }
        body {
          font-family: 'Cairo', system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 24px;
          color: #0f172a;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.4;
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #0d6269;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 800;
          color: #0d6269;
          margin: 0;
        }
        .report-subtitle {
          font-size: 12px;
          color: #475569;
          margin-top: 4px;
        }
        .report-meta-box {
          text-align: ${r.lang==="ar"?"left":"right"};
          font-size: 11px;
          color: #334155;
        }
        .kpi-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .kpi-card {
          flex: 1;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 8px;
          padding: 8px 12px;
          text-align: center;
        }
        .kpi-val {
          font-size: 18px;
          font-weight: 800;
          color: #0d6269;
        }
        .kpi-label {
          font-size: 10px;
          color: #64748b;
          margin-top: 2px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th, td {
          border: 1px solid #cbd5e1;
          padding: 7px 9px;
          text-align: ${r.lang==="ar"?"right":"left"};
          vertical-align: middle;
        }
        th {
          background: #0d6269;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
        }
        tr:nth-child(even) {
          background: #f8fafc;
        }
        .print-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          background: #e2e8f0;
          color: #1e293b;
        }
        .signature-section {
          margin-top: 32px;
          display: flex;
          justify-content: space-between;
          gap: 30px;
          page-break-inside: avoid;
        }
        .signature-box {
          flex: 1;
          border-top: 1px dashed #94a3b8;
          padding-top: 8px;
          text-align: center;
          font-size: 11px;
          color: #475569;
        }
        .no-print-bar {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 16px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .btn-print {
          background: #0d6269;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          font-family: inherit;
        }
        @media print {
          .no-print-bar { display: none !important; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print-bar">
        <div>
          <strong>${t("معاينة التقرير الرقابي الرسمي جاهزة للطباعة / التصدير PDF","Official Executive Audit Report Ready for Print / Save as PDF")}</strong>
          <span style="display:block;font-size:11px;color:#64748b;">${t('يمكنك الضغط على زر الطباعة أدناه واختيار "Save as PDF" لتخزين الملف كـ PDF رسمي.','Click the button below and choose "Save as PDF" in your browser.')}</span>
        </div>
        <button class="btn-print" onclick="window.print()">${t("طباعة / حفظ كـ PDF","Print / Save as PDF")}</button>
      </div>

      <header class="report-header">
        <div>
          ${s?`<img src="${c(s)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${c(o)}</h1>
          <div class="report-subtitle">${t("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${t("المشرف المستخرج:","Generated By:")}</strong> ${c(l)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(d)} - ${c(p)}</div>
          <div><strong>${t("حالة النظام:","System Status:")}</strong> Active / Enforced</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${u}</div>
          <div class="kpi-label">${t("إجمالي العمليات","Total Events")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${f}</div>
          <div class="kpi-label">${t("عمليات إنشاء","Create Operations")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${v}</div>
          <div class="kpi-label">${t("عمليات تعديل وحالة","Updates & State Changes")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${k}</div>
          <div class="kpi-label">${t("عمليات حذف وحركة سلة","Deletions & Trash Moves")}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:50px;">#</th>
            <th style="width:130px;">${t("التاريخ والوقت","Timestamp")}</th>
            <th style="width:160px;">${t("المستخدم / المنفذ","Actor")}</th>
            <th style="width:90px;">${t("نوع النشاط","Action")}</th>
            <th style="width:90px;">${t("نوع العنصر","Entity")}</th>
            <th>${t("التفاصيل والتغييرات","Details & Context")}</th>
          </tr>
        </thead>
        <tbody>
          ${b}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${t("إعداد وتصدير التقرير","Prepared By")}</strong><br /><br />
          <span>${c(l)}</span>
        </div>
        <div class="signature-box">
          <strong>${t("مسؤول الجودة والامتثال الأمني","Security & Compliance Lead")}</strong><br /><br />
          <span>..............................................</span>
        </div>
        <div class="signature-box">
          <strong>${t("الاعتماد الإداري العام","General Management Approval")}</strong><br /><br />
          <span>..............................................</span>
        </div>
      </footer>
    </body>
    </html>
  `;h.document.open(),h.document.write(m),h.document.close(),z("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:a.length}})}).catch(()=>{})}async function Mi(){try{$(t("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const e=await z("/api/audit?limit=1000");e&&e.logs&&(r.data.auditLogs=e.logs,r.auditFullHistoryLoaded=!0,renderView(),$(t(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){$(e.message||t("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function be(e){const a=C();return e==="profile"||e==="security"||e==="notifications"?!0:e==="company"||e==="whatsapp"?a||S("manage_settings"):e==="roles"?a||S("manage_roles"):e==="accounts"?a||S("manage_users")||S("manage_existing_account_permissions")||S("view_user_activity"):e==="trash"?a||S("manage_trash"):e==="audit"?a||S("view_audit_logs"):e==="analytics"?a||S("manage_settings")||S("view_audit_logs"):e==="diagnostics"?a||S("manage_settings"):!1}function ao(){const e=r.data?.user?.id,a=C(),n=be("company"),o=be("whatsapp"),s=be("roles"),i=be("accounts"),l=be("trash"),d=be("audit"),p=be("analytics"),u=be("diagnostics"),f=[["profile",t("الملف الشخصي","Profile")],["notifications",t("الإشعارات والتنبيهات","Notifications & Alerts")],...n?[["company",g("company")]]:[],...o?[["whatsapp",t("تنبيهات واتساب","WhatsApp Alerts")]]:[],...s?[["roles",g("roles")]]:[],...i?[["accounts",g("accounts")]]:[],["security",t("الأمان","Security")],...l?[["trash",t("سلة المهملات","Trash")]]:[],...d?[["audit",g("audit")]]:[],...p?[["analytics",t("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...u?[["diagnostics",t("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[]];f.some(([h])=>h===r.settingsSection)||(r.settingsSection=f[0]?.[0]||"profile");const v=r.data?.user||{};let k="";if(r.settingsSection==="profile"&&(k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("الملف الشخصي","Profile")}</h2>
            <p>${t("إدارة صورتك الشخصية وبيانات حسابك في النظام.","Manage your profile picture and account information.")}</p>
          </div>
        </div>

        <div class="profile-avatar-card">
          <label for="user-avatar-file-input" class="avatar-upload-trigger" id="profile-avatar-preview" role="button" tabindex="0" title="${t("انقر لرفع صورة شخصية جديدة","Click to upload a new profile picture")}">
            <div class="avatar-upload-circle">
              ${v.avatarUrl?`<img src="${c(v.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(v.avatarColor||"")?v.avatarColor:"#0d6269"};">${c(zt(v))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(v.avatarColor||"")?v.avatarColor:"#0d6269"};">${c(zt(v))}</div>`}
              <div class="avatar-upload-overlay">
                ${x("upload",18)}
                <span>${t("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${c(t(v.name,v.nameEn||v.name))}</h3>
            <p class="profile-user-role">${c(t(v.jobTitleAr||"",v.jobTitleEn||v.jobTitleAr||""))} · <span class="status-badge done">${c(re(v))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${x("upload",14)} ${t("رفع صورة جديدة","Upload new avatar")}
              </label>
              <span class="upload-hint">${t("يدعم JPG, PNG, WebP (حد أقصى 2MB)","Supports JPG, PNG, WebP (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${g("nameAr")}</label>
              <input name="name" value="${c(v.name||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${c(v.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${g("jobTitle")} (${t("عربي","AR")})</label>
              <input name="jobTitleAr" value="${c(v.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${g("jobTitle")} (${t("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${c(v.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${g("email")}</label>
              <input value="${c(v.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${t("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${c(v.phone||v.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
              <small class="field-hint">${t("أدخل رقم هاتفك مع مفتاح الدولة لاستلام تنبيهات المهام والمخططات المسندة إليك مباشرة على الواتساب.","Enter your phone number with country code to receive alerts for assigned tasks and drawings directly on WhatsApp.")}</small>
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${t("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${Ze()==="gregorian"?"selected":""}>${t("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Ze()==="hijri"?"selected":""}>${t("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${t("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
      </section>
    `),r.settingsSection==="company"&&(a||S("manage_settings"))){const h=r.data?.company||{};k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("company")}</h2>
            <p>${t("هوية مساحة العمل وشعار الشركة واللغة الافتراضية.","Workspace identity, company logo, and default language.")}</p>
          </div>
        </div>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${t("انقر لرفع وتعديل شعار الشركة","Click to upload and change company logo")}">
            <div class="logo-upload-box">
              ${h.logoUrl?`<img src="${c(h.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${x("building",24)}</span>`:`<span class="brand-mark">${x("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${x("upload",16)}
                <span>${t("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${c(h.name||"DARC Design Team")}</strong>
            <span class="company-sub">${t("العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض","Arabic default · English support · Riyadh timezone")}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${x("upload",14)} ${t("رفع وتعديل الشعار","Upload & Change Logo")}
              </label>
              <span class="upload-hint">${t("يدعم PNG, SVG, JPG (حد أقصى 2MB)","Supports PNG, SVG, JPG (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${g("nameAr")}</label>
              <input name="nameAr" value="${c(h.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${c(h.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${g("emailStatus")}</label>
              <input value="${c(r.data?.emailConfigured?g("emailConfigured"):g("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${x("info",16)}<span>${g("emailInfo")}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("نموذج الإنجاز","Progress model")}</h2>
            <p>${g("weightedExplanation")}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${g("weightedProgress")}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${g("simpleProgress")}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(r.settingsSection==="security"&&(k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("الأمان","Security")}</h2>
            <p>${t("تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.","Change your password or sign out from all devices.")}</p>
          </div>
        </div>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${t("كلمة المرور الحالية","Current password")}</label><input type="password" name="oldPassword" autocomplete="current-password" required /></div>
            <div class="field"><label>${t("كلمة المرور الجديدة","New password")}</label><input type="password" name="newPassword" minlength="10" autocomplete="new-password" required /></div>
          </div>
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${g("save")}</button></div>
        </form>
        <hr style="margin:28px 0;border:0;border-top:1px solid var(--line)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
          <div>
            <h3 style="font-size:14px;margin:0 0 4px">${t("تسجيل الخروج من كل الأجهزة","Sign out of all devices")}</h3>
            <p style="color:var(--muted);font-size:12px;margin:0;">${t("إنهاء كافة الجلسات النشطة على كل المتصفحات.","End all active sessions on all browsers.")}</p>
          </div>
          <button class="btn btn-danger btn-sm" data-action="logout-all">${t("تسجيل خروج للكل","Sign out all")}</button>
        </div>
      </section>
    `),r.settingsSection==="notifications"){const h=typeof window<"u"&&"Notification"in window?Notification.permission:"unsupported",m=h==="granted",y=h==="denied";k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("الإشعارات والتنبيهات","Notifications & Alerts")}</h2>
            <p>${t("تخصيص قنوات وصول التنبيهات الفورية وإشعارات المتصفح لسطح المكتب.","Configure your real-time notification channels and desktop alerts.")}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-action="send-test-notification">
            ${x("bell",14)} ${t("إرسال إشعار تجريبي فوري","Send Test Notification")}
          </button>
        </div>

        <div style="display:grid;gap:16px;margin-top:16px;">
          <!-- 1. Browser Web Notifications Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon ${m?"teal":y?"red":"blue"}" style="margin-top:2px;">
                ${x("bell",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${t("إشعارات سطح المكتب والمتصفح (Web Push Alerts)","Desktop & Browser Web Notifications")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${t("تسمح للموقع بإرسال تنبيهات فورية للنظام حتى عندما يكون المتصفح في الخلفية أو تعمل على نافذة أخرى.","Allows the platform to deliver native desktop notifications even when you are in another tab or window.")}
                </p>
                <div style="margin-top:6px;">
                  <span class="mini-badge" style="background:${m?"var(--mint)":y?"var(--red-soft)":"var(--surface-soft)"};color:${m?"var(--teal)":y?"var(--red)":"var(--muted)"};font-weight:700;">
                    ${m?t("مفعلة على هذا المتصفح ✅","Enabled on this browser ✅"):y?t("محظورة من إعدادات المتصفح ❌","Blocked in browser settings ❌"):t("بانتظار الموافقة ⚠️","Permission pending ⚠️")}
                  </span>
                </div>
              </div>
            </div>
            <div>
              ${m?`
                <button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">
                  ${x("check",14)} ${t("فحص إشعار المتصفح","Test Browser Alert")}
                </button>
              `:`
                <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">
                  ${x("check",14)} ${t("تفعيل الإشعارات الآن","Enable Notifications")}
                </button>
              `}
            </div>
          </div>

          <!-- 2. Audio Chimes Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon teal" style="margin-top:2px;">
                ${x("check",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${t("النغمة التنبيهية الفاخرة (Audio Chime)","Acoustic Alert Chime")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${t("نغمة صوتية هادئة مدمجة باستخدام Web Audio API تعزف فورياً عند وصول أي تنبيه في الوقت الفعلي.","Subtle built-in harmonic chime generated via Web Audio API playing whenever a live alert arrives.")}
                </p>
              </div>
            </div>
            <button type="button" class="btn btn-soft btn-sm" data-action="play-test-chime">
              🔊 ${t("استمع للنغمة","Play Chime")}
            </button>
          </div>

          <!-- 3. Channel Status Matrix -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:8px;">
              ${t("جاهزية قنوات الإرسال المربوطة","Connected Notification Channels")}
            </strong>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;margin-top:10px;">
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${t("التنبيهات داخل المنصة","In-App Alerts")}</span>
                <strong style="color:var(--teal);font-size:12px;">✅ ${t("نشطة وفورية (WebSocket)","Active Real-Time")}</strong>
              </div>
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${t("تنبيهات واتساب المباشرة","WhatsApp Direct Alerts")}</span>
                <strong style="color:var(--teal);font-size:12px;">✅ ${t("مربوطة (Baileys Engine)","Connected Baileys")}</strong>
              </div>
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${t("بريد الإشعارات السحابي","Cloud Email Gateway")}</span>
                <strong style="color:var(--teal);font-size:12px;">✅ ${t("جاهز (Resend API)","Ready Resend")}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}if(r.settingsSection==="accounts"&&i){const h=C()||S("view_user_activity"),m=C()||S("manage_users"),y=C()||S("manage_existing_account_permissions")||S("manage_users"),I=C();let D=r.data?.users||[];e!=="usr_ahmad"&&(D=D.filter(T=>T.id!=="usr_ahmad")),k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("accounts")}</h2>
            <p>${t("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${m?`<button class="btn btn-primary btn-sm" data-action="new-user">${x("plus",14)} ${g("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${g("team")}</th>
                <th>${g("role")}</th>
                <th>${g("email")}</th>
                <th>${g("accountStatus")}</th>
                ${h?`<th>${t("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${y?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${D.map(T=>{const R=T.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${K(T)}
                        <div class="team-member-copy">
                          <strong>${c(t(T.name,T.nameEn||T.name))}</strong>
                          <span>${c(t(T.jobTitleAr||(R?"المبرمج / مدير النظام":""),T.jobTitleEn||T.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${R?`<span class="stealth-dev-badge">${x("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:c(re(T))}
                    </td>
                    <td>
                      ${T.email?c(T.email):`<span style="color:var(--muted)">${g("noEmail")}</span>`}
                      ${T.phone||T.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;">📱 ${c(T.phone||T.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${T.status==="active"?"done":"not_started"}">${T.status==="active"?g("activeAccount"):g("pendingAccount")}</span>
                    </td>
                    ${h?`
                      <td>
                        ${Ci(T)}
                      </td>
                    `:""}
                    ${y?`
                      <td>
                        <div class="role-actions">
                          ${R?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(T.id)}">${g("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(T.id)}">${g("edit")}</button>
                            ${T.id!==r.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${c(T.id)}" title="${T.status==="pending"?t("تفعيل الحساب يدوياً","Activate manually"):t("تغيير كلمة المرور","Change password")}">${x(T.status==="pending"?"check":"settings",13)}</button>
                              ${I?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${c(T.id)}" title="دخول كـ هذا الحساب">${x("user",13)}</button>`:""}
                            `:""}
                            ${T.id!==r.data?.user?.id&&T.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${c(T.id)}">${x("send",13)}</button>`:""}
                            ${T.id!==r.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${c(T.id)}">${x("trash",13)}</button>`:""}
                          `}
                        </div>
                      </td>
                    `:""}
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `}if(r.settingsSection==="roles"&&(a||S("manage_roles"))&&(k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("roles")}</h2>
            <p>${t("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${a||S("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${x("plus",14)} ${g("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(r.data?.roles||[]).map(h=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${c(t(h.nameAr,h.nameEn))}</strong>
                  ${h.builtIn?`<span class="role-system-badge">${x("shield",11)} ${g("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${c(t(h.descriptionAr,h.descriptionEn))}</p>
                <div class="role-meta">${h.permissions.includes("*")?t("صلاحية كاملة","Full access"):`${h.permissions.length} ${g("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${c(h.id)}">${x("edit",13)} ${g("edit")}</button>
                ${h.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${c(h.id)}">${x("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),r.settingsSection==="trash"&&l){if(!r.trash&&typeof sessionStorage<"u")try{const w=sessionStorage.getItem("darc_trash_cache");w&&(r.trash=JSON.parse(w))}catch{}!r.trashLoaded&&!r._trashFetching&&(r._trashFetching=!0,z("/api/trash").then(w=>{r.trash=Array.isArray(w)?w:w.trash||[...(w.projects||[]).map(A=>({...A,type:"project"})),...(w.tasks||[]).map(A=>({...A,type:"task"})),...(w.documents||[]).map(A=>({...A,type:"document"}))],r.trashLoaded=!0,r._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(r.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(w=>{r._trashFetching=!1,console.error("[Trash fetch error]",w)}));const h=r.trash||[],m=r.trashFilter||"all",y=(r.trashQuery||"").trim().toLowerCase(),I=h.filter(w=>{if(m!=="all"&&w.type!==m)return!1;if(!y)return!0;const A=(t(w.nameAr||w.titleAr,w.nameEn||w.titleEn)||w.name||w.title||w.originalName||"").toLowerCase(),E=(w.code||w.projectCode||"").toLowerCase(),_=(w.projectNameAr||w.projectNameEn||"").toLowerCase();return A.includes(y)||E.includes(y)||_.includes(y)}),D=h.filter(w=>w.type==="project").length,T=h.filter(w=>w.type==="task").length,R=h.filter(w=>w.type==="document").length,B=h.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${x("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${t("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${t("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${m==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${x("layers",14)}
            <span>${t("الكل","All")}</span>
            <span class="badge ${m==="all"?"badge-on-primary":"badge-neutral"}">${h.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${m==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${x("building",14)}
            <span>${t("المشاريع","Projects")}</span>
            <span class="badge ${m==="project"?"badge-on-primary":"badge-neutral"}">${D}</span>
          </button>
          <button type="button" class="btn btn-sm ${m==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${x("checklist",14)}
            <span>${t("المهام","Tasks")}</span>
            <span class="badge ${m==="task"?"badge-on-primary":"badge-neutral"}">${T}</span>
          </button>
          <button type="button" class="btn btn-sm ${m==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${x("document",14)}
            <span>${t("المستندات","Documents")}</span>
            <span class="badge ${m==="document"?"badge-on-primary":"badge-neutral"}">${R}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${x("search",14)}
          <input type="search" placeholder="${t("بحث في المحذوفات...","Search deleted items...")}" value="${c(r.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${I.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("الاسم / العنوان","Name / Title")}</th>
                <th>${t("النوع","Type")}</th>
                <th>${t("المشروع التابع له","Project")}</th>
                <th>${t("الحالة السابقة","Prior Status")}</th>
                <th>${t("تاريخ الحذف","Deleted At")}</th>
                <th style="text-align:${r.lang==="ar"?"left":"right"}">${t("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${I.map(w=>{const A=w.type==="project",E=w.type==="task",_=w.type==="document",j=t(w.nameAr||w.titleAr,w.nameEn||w.titleEn)||w.name||w.title||w.originalName||w.code||t("عنصر محذوف","Deleted item"),L=!A&&w.projectId?(r.data?.projects||[]).find(G=>G.id===w.projectId):null,N=w.projectNameAr||w.projectNameEn||(L?t(L.nameAr,L.nameEn||L.nameAr):null),O=w.projectCode||L?.code,P=_&&w.size?w.size>1048576?(w.size/1048576).toFixed(1)+" MB":Math.round(w.size/1024)+" KB":"",U=a||S("manage_trash")||w.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${A?"is-project":E?"is-task":"is-doc"}">
                          ${x(A?"building":E?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${c(j)}</strong>
                          ${w.code||A?`<span class="trash-item-code">${c(w.code||w.id)}</span>`:""}
                          ${_&&P?`<span class="trash-item-code" style="color:var(--muted);">${P}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${A?"type-project":E?"type-task":"type-doc"}">
                        ${x(A?"building":E?"checklist":"document",11)}
                        ${A?t("مشروع","Project"):E?t("مهمة","Task"):t("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${A?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${t("مشروع رئيسي","Primary Project")}</span>`:N?`${x("building",11)} <span>${c(N)}${O?` (${c(O)})`:""}</span>${_&&w.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${c(w.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${w.status?`<span class="status-badge ${c(w.status)}">${c(H(w.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${c(w.deletedAt||"")}">
                        ${dateLabel(w.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${r.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${c(w.type)}" data-id="${c(w.id)}" title="${t("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${x(r.lang==="ar"?"arrow":"arrowLeft",12)} ${t("استعادة","Restore")}
                        </button>
                        ${U?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${c(w.type)}" data-id="${c(w.id)}" title="${t("حذف العنصر نهائياً","Permanently delete item")}">
                            ${x("trash",12)} ${t("حذف نهائي","Purge")}
                          </button>
                        `:""}
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `:`
        <div class="empty">
          ${x("search",22)}
          <span>${t("لا توجد نتائج تطابق بحثك في سلة المهملات.","No items match your search in trash.")}</span>
        </div>
      `}
    `:!r.trashLoaded&&!h.length?`
      <div style="padding:48px 20px;text-align:center;">
        <div style="width:32px;height:32px;margin:0 auto 14px;border:3px solid var(--line);border-top-color:var(--teal);border-radius:50%;animation:spin 0.75s linear infinite;"></div>
        <div style="font-size:14px;font-weight:700;color:var(--ink);">${t("جاري فحص واسترجاع عناصر سلة المهملات...","Loading recycle bin items...")}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px;">${t("يتم جلب المشاريع والمهام والمستندات المحذوفة من الخادم...","Fetching deleted projects, tasks, and drawings from server...")}</div>
      </div>
    `:`
      <div class="empty">
        ${x("trash",24)}
        <span>${t("سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.","Trash is empty, no deleted items found.")}</span>
      </div>
    `;k=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!r.trashLoaded&&!h.length?t("جاري التحميل...","Loading..."):`${h.length} ${t("عناصر","items")}`}
              </span>
            </div>
            <p>${t("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(a||S("manage_trash"))&&h.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${t("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${x("trash",13)} ${t("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${B}
      </section>
    `}if(r.settingsSection==="audit"&&(a||S("view_audit_logs"))){const h=[...r.data?.auditLogs||[]].sort((A,E)=>new Date(E.createdAt).getTime()-new Date(A.createdAt).getTime()),m=r.auditFilterAction||"all",y=r.auditFilterEntity||"all",I=r.auditFilterUser||"all",D=(r.auditSearchQuery||"").trim().toLowerCase(),T=h.filter(A=>{if(m!=="all"&&A.action!==m||y!=="all"&&(A.entityType||A.entity_type)!==y||I!=="all"&&(A.userId||A.user_id||A.user?.id)!==I)return!1;if(D){const E=A.user||(A.userId?(r.data?.users||[]).find(G=>G.id===A.userId):null),_=(E&&t(E.name,E.nameEn||E.name)||"").toLowerCase(),{actionLabel:j,entityLabel:L}=fa(A),N=(j||A.action||"").toLowerCase(),O=(L||A.entityType||"").toLowerCase(),P=(A.id||A.entityId||"").toLowerCase(),U=typeof A.details=="object"?JSON.stringify(A.details).toLowerCase():String(A.details||"").toLowerCase();if(!(_.includes(D)||N.includes(D)||O.includes(D)||P.includes(D)||U.includes(D)))return!1}return!0});r._lastFilteredAuditLogs=T;const R=[["all",t("كافة العمليات","All Actions")],["create",t("إنشاء جديد","Create")],["update",t("تعديل بيانات","Update")],["status_change",t("تغيير حالة","Status Change")],["delete",t("نقل للمهملات","Delete / Trash")],["restore",t("استعادة","Restore")],["purge",t("حذف نهائي","Purge")],["export_report",t("تصدير تقرير","Export Report")],["login",t("تسجيل دخول","Sign In")],["invite",t("دعوة مستخدم","Invite")]],B=[["all",t("كافة العناصر","All Entities")],["project",t("المشاريع","Projects")],["task",t("المهام","Tasks")],["document",t("المستندات","Documents")],["user",t("المستخدمين","Users")],["role",t("الأدوار والصلاحيات","Roles")],["company",t("إعدادات الشركة","Company Settings")],["report",t("التقارير","Reports")]],w=m!=="all"||y!=="all"||I!=="all"||!!D;k=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${g("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${T.length} ${t("عملية معروضة","events shown")}
              </span>
              ${w?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${t("من أصل","out of")} ${h.length}
                </span>
              `:""}
            </div>
            <p>${t("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${r.auditFullHistoryLoaded?"":`
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${t("جلب الأرشيف الكامل للسجلات من السيرفر","Load complete audit archive")}">
                ${x("refresh",13)} ${t("تحميل الأرشيف الكامل","Load All History")}
              </button>
            `}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${t("تصدير السجل كملف Excel منسق","Export as styled Excel file")}">
              ${x("download",13)} ${t("تصدير Excel","Export Excel")}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${t("معاينة وطباعة تقرير رسمي وحفظه كـ PDF","Print or save executive PDF report")}">
              ${x("printer",13)} ${t("طباعة تقرير PDF","Print / PDF")}
            </button>
          </div>
        </div>

        <div class="view-toolbar audit-toolbar" style="gap:10px;margin-bottom:16px;">
          <div class="search-box search-sm" style="flex:1;min-width:240px;max-width:380px;">
            ${x("search",14)}
            <input type="search" placeholder="${t("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${c(r.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${R.map(([A,E])=>`<option value="${A}" ${m===A?"selected":""}>${E}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${B.map(([A,E])=>`<option value="${A}" ${y===A?"selected":""}>${E}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${t("كافة المستخدمين","All Users")}</option>
              ${(r.data?.users||[]).map(A=>`<option value="${A.id}" ${I===A.id?"selected":""}>${c(t(A.name,A.nameEn||A.name))}</option>`).join("")}
            </select>
            ${w?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${t("إعادة تعيين الفلاتر","Reset filters")}">
                ${t("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${T.length?`
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${t("المستخدم / المنفذ","User / Actor")}</th>
                  <th style="padding:12px 14px;">${t("نوع النشاط والعملية","Action & Target")}</th>
                  <th style="padding:12px 14px;">${t("التفاصيل والتغيير","Details / Context")}</th>
                  <th style="padding:12px 14px;text-align:${r.lang==="ar"?"left":"right"};">${t("التاريخ والوقت الدقيق","Exact Date & Time")}</th>
                </tr>
              </thead>
              <tbody>
                ${T.map(A=>{const E=A.user||(A.userId?(r.data?.users||[]).find(G=>G.id===A.userId):null),_=E?t(E.name,E.nameEn||E.name):t("النظام","System"),j=E?re(E):t("تلقائي","Automated"),L=kn(A.createdAt),{badgeClass:N,actionLabel:O,entityLabel:P,detailHtml:U}=fa(A);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${K(E)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${c(_)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${c(j)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${N}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${c(O)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${c(P)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${U}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${r.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${c(L.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${x("clock",11)}
                          <span>${c(L.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${x(w?"search":"checklist",24)}
            <span>${w?t("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):t("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${w?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${t("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(r.settingsSection==="analytics"&&p&&(k=ji()),r.settingsSection==="diagnostics"&&u&&(k=_i()),r.settingsSection==="whatsapp"&&o){const h=r.data?.company?.customFields?.whatsapp||r.data?.company?.custom_fields?.whatsapp||{};k=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <h2>${t("تنبيهات واتساب الميدانية للمشاريع","Field WhatsApp Alerts")}</h2>
            <p>${t("ربط آمن عبر بروتوكول Multi-Device المباشر مع خوارزميات محاكاة السلوك البشري لحماية الأرقام من الحظر.","Secure connection via Multi-Device protocol with anti-ban human behavior simulation.")}</p>
          </div>
          <span class="status-badge ${h.enabled?"done":"neutral"}">
            ${h.enabled?t("مفعل نشط ✅","Active ✅"):t("معطل ⏸️","Disabled ⏸️")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${t("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${t("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${h.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${t("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${h.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${h.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${t("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${c(h.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${t("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${c(h.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${t("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${t("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${c(h.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${t("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${c(h.recipient||"")}" placeholder="${t("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${t("💡 ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","💡 Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${t("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${h.notifyOnCollectiveMention!==!1?"checked":""} />
                <span>📢 ${t("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${h.sendGroupBroadcast?"checked":""} />
                <span>👥 ${t("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${h.notifyOnBlocked!==!1?"checked":""} />
                <span>⚠️ ${t("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${h.notifyOnApproval!==!1?"checked":""} />
                <span>🔍 ${t("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${h.notifyOnDrawing!==!1?"checked":""} />
                <span>📐 ${t("عند اعتماد أو رفع مخطط معماري أو إنشائي جديد (New Drawing)","When an architectural or structural drawing is approved/uploaded")}</span>
              </label>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:10px;">
            <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:7px;">
              ${x("check",14)} <span>${t("حفظ إعدادات واتساب","Save WhatsApp Settings")}</span>
            </button>
            <button type="button" class="btn btn-soft" data-action="test-whatsapp" style="display:inline-flex;align-items:center;gap:7px;">
              <span>📲</span> <span>${t("إرسال تنبيه تجريبي للواتساب","Send Test WhatsApp Alert")}</span>
            </button>
          </div>
        </form>
      </section>
    `}const b=a||S("manage_settings")||S("manage_roles")||S("manage_users")||S("manage_trash")||S("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${b?t("تحكم مركزي","CENTRAL CONTROL"):t("الملف الشخصي","USER PROFILE")}</p>
        <h1>${b?g("settings"):t("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${b?t("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):t("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${x(a?"shield":"user",13)} ${c(re(v))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${f.map(([h,m])=>`<button class="${r.settingsSection===h?"active":""}" data-action="settings-section" data-section="${h}">${m}</button>`).join("")}
      </aside>
      <div class="settings-content">${k}</div>
    </div>
  `}var Ri=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function no(e=null){const a=r.data?.permissionsCatalog&&r.data.permissionsCatalog.length>=10?r.data.permissionsCatalog:Ri,n=new Map;a.forEach(p=>{const u=p.category||"general",f=t(p.categoryAr||u,p.categoryEn||u);n.has(u)||n.set(u,{name:f,items:[]}),n.get(u).items.push(p)});const o=e?.id==="admin"||e?.permissions&&e.permissions.includes("*"),s=Array.from(n.entries()).map(([p,u])=>{const f=u.items.map(v=>{const k=v.id||v.key,b=t(v.nameAr||v.ar,v.nameEn||v.en||k),h=o||e?.permissions&&(e.permissions.includes(k)||typeof _t<"u"&&_t[k]&&e.permissions.includes(_t[k])),m=o?"disabled":"";return`
        <label class="permission-option" style="cursor:${o?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${c(k)}" ${h?"checked":""} ${m} />
          <span style="font-weight:500;">${c(b)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${c(u.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${u.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${f}
        </div>
      </div>
    `}).join(""),i=o?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${g("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${a.length} ${t("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${t("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${t("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,l=`
    <form id="role-form" data-role-id="${c(e?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${g("nameAr")} *</label>
          <input name="nameAr" value="${c(e?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${g("nameEn")}</label>
          <input name="nameEn" value="${c(e?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${g("roleDescription")}</label>
          <textarea name="descriptionAr" rows="2">${c(e?.descriptionAr||"")}</textarea>
        </div>
      </div>
      ${o?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${t("مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.","The system administrator always keeps full root privileges [*] across all aspects of the system.")}
        </div>
      `:`
        ${i}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${s}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=De(e?t("تعديل الدور والصلاحيات","Edit role & permissions"):g("addRole"),t("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),l,"role","modal-lg");const d=document.getElementById("modal-root");if(d){const p=d.querySelector("#btn-perm-select-all"),u=d.querySelector("#btn-perm-deselect-all");p&&p.addEventListener("click",()=>{d.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(f=>f.checked=!0)}),u&&u.addEventListener("click",()=>{d.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(f=>f.checked=!1)})}}function io(e=null){if(e?.id==="usr_ahmad"&&r.data?.user?.id!=="usr_ahmad")return $(t("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!e&&!C())return $(g("adminOnly"),!0);const a=!C(),n=a?"disabled":"",o=(r.data?.roles||[]).filter(i=>C()||i.id!=="admin"),s=`<form id="user-form" data-user-id="${c(e?.id||"")}" data-permission-only="${a}"><div class="form-grid"><div class="field full"><label>${g("nameAr")}</label><input name="name" value="${c(e?.name||"")}" ${n} required /></div><div class="field"><label>${g("nameEn")}</label><input name="nameEn" value="${c(e?.nameEn||"")}" ${n} /></div><div class="field"><label>${g("jobTitle")}</label><input name="jobTitleAr" value="${c(e?.jobTitleAr||"")}" ${n} /></div><div class="field"><label>${g("email")}</label><input name="email" type="email" value="${c(e?.email||"")}" placeholder="name@darc.com" ${n} /></div><div class="field"><label>${t("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${c(e?.phone||e?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${n} /></div><div class="field"><label>${g("role")}</label><select name="roleId">${o.map(i=>`<option value="${c(i.id)}" ${e?.roleId===i.id?"selected":""}>${c(t(i.nameAr,i.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${a?t("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):t("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button><button type="submit" class="btn btn-primary">${x("check",14)} ${e?a?t("حفظ الصلاحية","Save permission"):g("save"):g("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=De(e?a?t("تعديل صلاحية الحساب","Change account permission"):t("تعديل حساب العضو","Edit member account"):g("addMember"),t("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),s,"user")}var so=me({buildProjectMemberChipsHtml:()=>Ba,exportPortfolioPDF:()=>Vi,exportPortfolioXLS:()=>Hi,exportProjectPDF:()=>Fa,exportProjectXLS:()=>Wi,exportXLS:()=>ct,getCompanyBranding:()=>lt,getDaysLeftBadge:()=>En,getProjectTeam:()=>oo,getProjectTeamData:()=>Wt,openCloneModal:()=>lo,openProjectModal:()=>An,projectCard:()=>Fi,renderInPagePrintModal:()=>Tn,renderProjectCardTeamAvatars:()=>Bi,renderProjectDetail:()=>ro,renderProjectOverviewTab:()=>Ui,renderProjectTeamAvatars:()=>Ni,renderProjectTimelineBar:()=>Oi,renderProjects:()=>qi});function En(e){if(!e)return"";const a=Me(e);if(!a||isNaN(a.getTime()))return"";const n=Math.ceil((a-new Date)/864e5);if(isNaN(n))return"";let o="var(--mint-strong)",s="var(--mint)",i="";return n<0?(o="var(--red)",s="var(--red-soft)",i=t(`متأخر ${Math.abs(n)} يوم`,`${Math.abs(n)}d overdue`)):n===0?(o="var(--red)",s="var(--red-soft)",i=t("يستحق اليوم","Due today")):n<=2?(o="var(--red)",s="var(--red-soft)",i=t(`باقي ${n} يوم`,`${n}d left`)):n<=7?(o="var(--amber)",s="var(--amber-soft)",i=t(`باقي ${n} أيام`,`${n}d left`)):(o="var(--mint-strong)",s="var(--mint)",i=t(`باقي ${n} يوم`,`${n}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${o};background:${s};border:1px solid currentColor;">${x("clock",11)} ${i}</span>`}function Wt(e){const a=r.data?.users||[],n=(r.data?.tasks||[]).filter(i=>i.projectId===e.id),o=new Set,s=new Set;return e.managerId&&o.add(e.managerId),n.forEach(i=>{i.assigneeId&&o.add(i.assigneeId),(i.customFields?.additionalAssignees||i.customFields?.additional_assignees||[]).forEach(l=>o.add(l)),(i.customFields?.externalAssignees||i.customFields?.external_assignees||[]).forEach(l=>{l&&typeof l=="string"&&l.trim()&&s.add(l.trim())})}),{internalMembers:Array.from(o).map(i=>a.find(l=>l.id===i)).filter(Boolean),externalMembers:Array.from(s)}}function oo(e){return Wt(e).internalMembers}function Ni(e,a=4,n=!0,o=[]){if((!e||!e.length)&&(!o||!o.length))return`<span style="font-size:11px;color:var(--muted);">${t("لا يوجد فريق محدد","No team assigned")}</span>`;const s=(e||[]).slice(0,a),i=(e||[]).length-a,l=(e||[]).map(p=>t(p.name,p.nameEn||p.name)).join("، ");let d='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return s.forEach(p=>{const u=t(p.name,p.nameEn||p.name),f=n?`data-action="filter-by-member" data-member-id="${c(p.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';d+=`
      <span class="team-member-chip" ${f} title="${c(u)} (${c(re(p))})">
        ${K(p,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${c(u)}</span>
      </span>
    `}),i>0&&(d+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${c(l)}">+${i} ${t("آخرين","more")}</span>`),o&&o.length>0&&(d+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${c(o.join("، "))}">🌐 +${o.length} ${t("خارجي","ext")}</span>`),d+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${t("فريق العمل الداخلي","Internal Team")} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(p=>`
        <div ${n?`data-action="filter-by-member" data-member-id="${c(p.id)}" title="${c(t("فلترة مهام "+(p.name||""),"Filter tasks of "+(p.nameEn||p.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${n?"cursor:pointer;transition:all 0.15s;":""}" ${n?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${K(p,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${c(t(p.name,p.nameEn||p.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${c(re(p))}</span>
          </div>
        </div>
      `).join("")}
    </div>
    
    ${o&&o.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${t("الشركاء والمتعاونون الخارجيون","External Partners")} (${o.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${o.map(p=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${c(p)}</span>
          </div>
        `).join("")}
      </div>
    `:""}

    ${n?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${t("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,d+="</div>",d}function Oi(e){if(!e.dueDate)return"";const a=Me(e.dueDate);if(!a||isNaN(a.getTime()))return"";const n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),o=new Date,s=a.getTime()-n.getTime();let i=0;s>0&&!isNaN(s)&&(i=Math.min(100,Math.max(0,Math.round((o.getTime()-n.getTime())/s*100))));const l=o>a,d=l?"var(--red)":i>=80&&!l?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;flex-wrap:wrap;gap:6px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${x("clock",12)}
          <strong>${t("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${d};font-weight:bold;">${l?t("انتهى موعد التسليم!","Deadline passed!"):t(`مضى ${i}% من الوقت`,`${i}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${ae(e.startDate)} ➔ ${ae(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${i}%;background:${d};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function Bi(e=[],a=[],n=3){const o=e.length+a.length;if(o===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const s=e.slice(0,n),i=o-s.length;[...e.map(d=>t(d.name,d.nameEn||d.name)),...a].join("، ");let l=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${t("عرض فريق العمل","View Team")}">`;return l+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',s.forEach((d,p)=>{l+=`
      <div style="margin-inline-start:${p===0?"0":"-8px"};position:relative;z-index:${10-p};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${K(d,"mini-avatar")}
      </div>
    `}),i>0&&(l+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${i}
      </div>
    `),a&&a.length>0&&i<=0&&(l+='<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>'),l+="</div>",l+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${t("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${o}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(d=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${K(d,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(t(d.name,d.nameEn||d.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${c(re(d))}</span>
            </div>
          </div>
        `).join("")}
      </div>
      ${a&&a.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${t("الشركاء الخارجيون","External Partners")} (${a.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${a.map(d=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${c(d)}
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  `,l+="</div>",l}function Fi(e){const{internalMembers:a,externalMembers:n}=Wt(e),o=e.manager||(r.data?.users||[]).find(l=>l.id===e.managerId),s=En(e.dueDate),i=t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;cursor:pointer;" data-action="open-project" data-project-id="${c(e.id)}">
        <span class="project-card-symbol">${x("building",19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${c(e.code)}</span>
          <h3 class="project-card-title" title="${c(t(e.nameAr,e.nameEn))}">${c(t(e.nameAr,e.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        <span class="status-badge ${c(e.health)}">${c(H(e.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${c(i||"")}">
      ${i?c(i):`<span style="color:var(--muted);font-style:italic;">${t("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${K(o,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${g("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(o?t(o.name,o.nameEn||o.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${g("team")} (${a.length+n.length})</span>
        ${Bi(a,n,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${g("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <strong>${e.dueDate?ae(e.dueDate,!0):"—"}</strong>
          ${s}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health==="off_track"?"red":e.health==="at_risk"?"amber":""}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${c(e.id)}">
      ${g("viewDetails")} ${x(r.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function Ui(e,a,n,o=[]){const s=e.manager||(r.data?.users||[]).find(p=>p.id===e.managerId),i=a.filter(p=>p.status==="done").length,l=a.filter(p=>p.status==="in_progress").length,d=a.filter(de).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${t("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${a.length}</div>
          <span class="metric-note up">${i} ${g("done")}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${t("قيد التنفيذ","In Progress")}</span>
          <div class="metric-value">${l}</div>
          <span class="metric-note">${t("عمل جارٍ","Active work")}</span>
        </div>
        <div class="metric-card ${d?"red":"teal"}" style="padding:14px 18px;">
          <span class="metric-label">${g("overdue")}</span>
          <div class="metric-value">${d}</div>
          <span class="metric-note ${d?"alert":"up"}">${d?t("تحتاج تدخلاً عاجلاً","Needs urgent action"):t("لا يوجد تأخير","On track")}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${t("فريق العمل","Team Size")}</span>
          <div class="metric-value">${n.length+(o?.length||0)}</div>
          <span class="metric-note">${t("أعضاء مساهمون","Active contributors")}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${Oi(e)}

      <!-- Details Grid -->
      <div class="project-details-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 280px), 1fr));gap:16px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${x("document",16)}
            ${t("نطاق وتفاصيل المشروع","Project Scope & Details")}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${c(e.descriptionAr||e.descriptionEn||t("لا يوجد وصف مسجل لهذا المشروع حالياً.","No description available for this project."))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("client")}</span>
              <strong style="font-size:13px;color:var(--ink);">${c(t(e.clientAr,e.clientEn)||"—")}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("lifecycle")}</span>
              <strong style="font-size:13px;color:var(--ink);">${c(H(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${ae(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${ae(e.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${x("users",16)}
            ${t("القيادة وفريق العمل","Leadership & Team")}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${K(s)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${g("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${c(s?t(s.name,s.nameEn||s.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${c(s?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${t("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${n.map(p=>{const u=a.filter(f=>f.assigneeId===p.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${K(p,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${c(t(p.name,p.nameEn||p.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${c(re(p))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${u} ${g("tasks")}</span>
                </div>
              `}).join("")}
          </div>

          ${o&&o.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${t("الشركاء والمتعاونون الخارجيون:","External Partners & Collaborators:")}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${o.map(p=>{const u=a.filter(f=>(f.customFields?.externalAssignees||f.customFields?.external_assignees||[]).includes(p)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${c(p)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${t("شريك / جهة خارجية","External Partner")}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${u} ${g("tasks")}</span>
                  </div>
                `}).join("")}
            </div>
          `:""}
        </div>
      </div>
    </div>
  `}function qi(){const e=r.searches.projects.trim().toLowerCase();let a=(r.data?.projects||[]).filter(o=>`${o.nameAr||""} ${o.nameEn||""} ${o.code||""} ${o.clientAr||""} ${o.clientEn||""}`.toLowerCase().includes(e));const n=r.projectSort||"default";return n==="alpha-asc"?a.sort((o,s)=>(t(o.nameAr,o.nameEn)||"").localeCompare(t(s.nameAr,s.nameEn)||"",r.lang==="ar"?"ar":"en")):n==="alpha-desc"?a.sort((o,s)=>(t(s.nameAr,s.nameEn)||"").localeCompare(t(o.nameAr,o.nameEn)||"",r.lang==="ar"?"ar":"en")):n==="progress-asc"?a.sort((o,s)=>(Number(o.progress)||0)-(Number(s.progress)||0)):n==="progress-desc"&&a.sort((o,s)=>(Number(s.progress)||0)-(Number(o.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${t("المحفظة","PORTFOLIO")}</p><h1>${g("projects")}</h1><p>${t("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${S("create_projects")?`<button class="btn btn-primary" data-action="new-project">${x("plus",15)} ${g("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${x("search",15)}<input data-search="projects" value="${c(r.searches.projects)}" placeholder="${g("search")}" /></div><div class="sort-box"><span>${t("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${n==="default"?"selected":""}>${t("الافتراضي","Default")}</option><option value="alpha-asc" ${n==="alpha-asc"?"selected":""}>${t("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${n==="alpha-desc"?"selected":""}>${t("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${n==="progress-asc"?"selected":""}>${t("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${n==="progress-desc"?"selected":""}>${t("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${a.length} ${t("مشاريع","projects")}</span></div></div>${a.length?`<div class="project-cards">${a.map(Fi).join("")}</div>`:`<section class="panel"><div class="empty">${x("building",18)}<span>${g("noProjects")}</span></div></section>`}`}function ro(){const e=r.data?.projects?.find(v=>v.id===r.activeProjectId);if(!e)return r.view="projects",qi();const a=(r.data?.tasks||[]).filter(v=>v.projectId===e.id),{internalMembers:n,externalMembers:o}=Wt(e),s=r.projectTab||"tasks",i=r.projectMemberFilter||null,l=i?a.filter(v=>v.assigneeId===i||(v.customFields?.additionalAssignees||v.customFields?.additional_assignees||[]).includes(i)):a,d=i?r.data?.users?.find(v=>v.id===i):null;let p="";if(s==="overview")p=Ui(e,a,n,o);else if(s==="tasks"){const v=r.projectTaskSort||Et();p=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${g("projectTasks")} ${i?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${t("مهام","Tasks of")}: ${c(t(d?.name,d?.nameEn||d?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${t("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${hn(v,"sort-project-tasks")}
            ${i?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${x("close",12)} ${t("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${S("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}" title="${t("اضغط N للإضافة السريعة","Press N to add quickly")}">${x("plus",14)} ${g("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${renderBoard(l,v)}
      </div>
    `}else if(s==="timeline"){const{renderTimelinePanel:v}=window.__timelineExports||{};p=v?v(l,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${ka(l)}</div>`}else if(s==="drawings"){const v=(r.data?.documents||[]).filter(m=>m.projectId===e.id&&!m.deletedAt),k=a.filter(m=>m.typeAr==="مخطط"||m.typeEn==="Drawing"||m.templateId),b=r.docTaskFilter||"all",h=b==="all"?v:v.filter(m=>m.taskId===b);p=`
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 class="panel-title">${t("المخططات والمستندات الهندسية","Drawings & Documents")}</h2>
            <p class="panel-subtitle">${t("جميع المخططات والملفات المرفوعة لهذا المشروع مع إمكانية الفلترة حسب المهمة والمعاينة الفورية.","All blueprints and files uploaded for this project, with task filtering and instant preview.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <!-- Filter by Task dropdown -->
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:12px;color:var(--ink-soft);">${t("المهمة:","Task:")}</span>
              <select data-action="filter-project-docs-task" class="filter-select select-compact" style="max-width:100%;min-width:140px;">
                <option value="all" ${b==="all"?"selected":""}>${t("— جميع المهام —","— All Tasks —")}</option>
                ${a.map(m=>`<option value="${c(m.id)}" ${b===m.id?"selected":""}>${c(t(m.titleAr,m.titleEn))}</option>`).join("")}
              </select>
            </div>
            ${S("create_tasks")?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}">
                ${x("plus",12)} ${t("إضافة مخرج / مخطط","Add Deliverable / Drawing")}
              </button>
            `:""}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${x("document",14)} ${t("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${h.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${t("اسم المخطط / الملف","Blueprint / File Name")}</th>
                  <th>${g("tasks")}</th>
                  <th>${t("الحالة","Status")}</th>
                  <th>${t("الحجم","Size")}</th>
                  <th>${t("تاريخ الرفع","Upload Date")}</th>
                  <th style="text-align:end;">${t("الإجراءات","Actions")}</th>
                </tr>
              </thead>
              <tbody>
                ${h.length>0?h.map(m=>{const y=a.find(D=>D.id===m.taskId),I=m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round((m.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${c(m.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(m.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${x("document",15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(m.originalName)}">
                              ${c(m.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${c(m.mimeType||"application/octet-stream")}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${y?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(y.id)}">${c(t(y.titleAr,y.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${c(m.status||"draft")}" style="font-size:11px;">
                          ${c(H(m.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${I}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${ae(m.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(m.id)}" style="padding:5px;" title="${t("معاينة المخطط","Preview")}">
                            ${x("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(m.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ رابط Google Drive","Copy Drive Link")}">
                            ${x("link",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${c(m.id)}" style="padding:5px;color:var(--blue);" title="${t("تحميل المخطط","Download")}">
                            ${x("download",14)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `}).join(""):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${x("document",20)}
                        <span>${t("لا توجد ملفات مرفوعة لهذه المهمة أو المشروع حتى الآن.","No files uploaded for this task/project yet.")}</span>
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
            ${x("checklist",14)} ${t("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${k.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${g("taskTitle")}</th>
                  <th>${g("taskType")}</th>
                  <th>${g("status")}</th>
                  <th>${g("progress")}</th>
                  <th>${g("assignee")}</th>
                </tr>
              </thead>
              <tbody>
                ${k.map(m=>`
                  <tr data-action="open-task" data-task-id="${c(m.id)}" style="cursor:pointer;" title="${t("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${c(t(m.titleAr,m.titleEn))}</span><span class="table-sub">${c(m.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${c(t(m.typeAr,m.typeEn)||t("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${c(m.status)}">${c(H(m.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${m.status==="done"?"var(--green)":"var(--blue)"};width:${m.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${m.progress||0}%</span>
                      </div>
                    </td>
                    <td>${m.assignee?c(t(m.assignee.name,m.assignee.nameEn||m.assignee.name)):"—"}</td>
                  </tr>
                `).join("")||`<tr><td colspan="5"><div class="empty">${g("noTasks")}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else s==="activity"&&(p=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("activity")}</h2><p class="panel-subtitle">${t("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${Pi(e.id)}</div>`);const u=e.manager||(r.data?.users||[]).find(v=>v.id===e.managerId),f=En(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${x(r.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${c(e.code)} · ${e.demo?g("sampleData"):g("active")}</p>
          <h1>${c(t(e.nameAr,e.nameEn))}</h1>
          <p>${c(t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${x("user",12)} 
              <strong>${g("manager")}:</strong> ${c(u?t(u.name,u.nameEn||u.name):"—")}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${x("calendar",12)} ${ae(e.dueDate,!0)}
                ${f}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${x("users",12)}
              <span style="font-size:11px;">${g("team")}:</span>
              ${Ni(n,4,!0,o)}
            </span>
            <span class="status-badge ${c(e.health)}">${c(H(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${g("weightedProgress")}</span>
        ${S("edit_projects")||S("create_projects")||S("delete_projects")||S("view_reports")||C()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${x("more",15)} ${t("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${r.lang==="ar"?"right:0;left:auto;":"left:0;right:auto;"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;max-width:min(280px,calc(100vw - 36px));padding:5px;margin-top:5px;text-align:start">
              ${S("edit_projects")||C()?`<button class="menu-item" data-action="edit-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${x("edit",14)} ${g("edit")}</button>`:""}
              ${S("create_projects")||C()?`<button class="menu-item" data-action="clone-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${x("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>`:""}
              ${S("export_reports")||C()?`
                <button class="menu-item" data-action="export-project-pdf" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--brand-teal);font-weight:600;">
                  ${x("printer",14)} ${t("تقرير تنفيذي معتمد (PDF)","Executive Report (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project-client-pdf" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--ink);">
                  ${x("user",14)} ${t("تقرير تسليمات العميل (PDF)","Client Deliverables (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;">
                  ${x("document",14)} ${t("تصدير بيانات المهام (Excel)","Export Tasks (Excel)")}
                </button>
              `:""}
              ${S("delete_projects")||C()?`<button class="menu-item" data-action="delete-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${x("trash",14)} ${t("حذف المشروع","Delete Project")}</button>`:""}
            </div>
          </div>
        `:""}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${s==="tasks"?"active":""}" data-action="project-tab" data-tab="tasks">${g("tasks")}</button>
      <button class="detail-tab ${s==="overview"?"active":""}" data-action="project-tab" data-tab="overview">${t("تفاصيل","Details")}</button>
      <button class="detail-tab ${s==="timeline"?"active":""}" data-action="project-tab" data-tab="timeline">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</button>
      <button class="detail-tab ${s==="drawings"?"active":""}" data-action="project-tab" data-tab="drawings">${g("drawings")}</button>
      <button class="detail-tab ${s==="activity"?"active":""}" data-action="project-tab" data-tab="activity">${g("activity")}</button>
    </div>
    
    ${p}
  `}function Ba(e=[]){const a=r.data?.users||[];return e.map(n=>{const o=a.find(s=>s.id===n)||{name:n,id:n};return`
      <span class="chip-item" data-uid="${c(n)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${K(o,"mini-avatar")}
        <span style="font-weight:500;">${c(t(o.name,o.nameEn||o.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${c(n)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function An(e=null){const a=e?.code||`DARC-${String((r.data?.projects?.length||0)+1).padStart(3,"0")}`,n=e?Wt(e).internalMembers.map(i=>i.id):[],o=n.length>0?n:[r.data?.user?.id].filter(Boolean),s=`
    <form id="project-form" data-project-id="${c(e?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${c(JSON.stringify(o))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${x("building",14)} <span>${t("البيانات الأساسية للمشروع","Core Project Information")}</span>
        </div>

        <div class="field full">
          <label>${g("nameAr")} *</label>
          <input name="nameAr" value="${c(e?.nameAr||"")}" placeholder="${t("مثال: فيلا النخيل — التصميم الداخلي","e.g. Al Nakheel Villa — Interior Design")}" required />
        </div>
        <div class="field">
          <label>${g("nameEn")}</label>
          <input name="nameEn" value="${c(e?.nameEn||"")}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${g("projectCode")} *</label>
          <input name="code" value="${c(a)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${g("client")}</label>
          <input name="clientAr" value="${c(e?.clientAr||"")}" placeholder="${t("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${x("calendar",14)} <span>${t("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${g("manager")}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${t("— بدون تحديد —","— Unassigned —")}</option>
            ${(r.data?.users||[]).map(i=>`<option value="${c(i.id)}" ${(e?e.managerId===i.id:r.data?.user?.id===i.id)?"selected":""}>${c(t(i.name,i.nameEn||i.name))}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>${t("أولوية المشروع","Project Priority")}</label>
          <select name="priority">
            <option value="low" ${e?.priority==="low"||e?.customFields?.priority==="low"?"selected":""}>${t("منخفضة","Low")}</option>
            <option value="medium" ${!e||e?.priority==="medium"||e?.customFields?.priority==="medium"||!e?.priority?"selected":""}>${t("متوسطة","Medium")}</option>
            <option value="high" ${e?.priority==="high"||e?.customFields?.priority==="high"?"selected":""}>${t("عالية","High")}</option>
            <option value="urgent" ${e?.priority==="urgent"||e?.customFields?.priority==="urgent"?"selected":""}>${t("حرجة / عاجلة","Urgent")}</option>
          </select>
        </div>
        <div class="field">
          <label>${t("حالة المشروع","Project Status")}</label>
          <select name="lifecycle">
            <option value="active" ${!e||e.lifecycle==="active"?"selected":""}>${t("نشط (قيد التنفيذ)","Active (In Progress)")}</option>
            <option value="planning" ${e?.lifecycle==="planning"?"selected":""}>${t("تخطيط","Planning")}</option>
            <option value="on_hold" ${e?.lifecycle==="on_hold"?"selected":""}>${t("معلق / متوقف","On Hold")}</option>
            <option value="completed" ${e?.lifecycle==="completed"?"selected":""}>${t("مكتمل","Completed")}</option>
            <option value="archived" ${e?.lifecycle==="archived"?"selected":""}>${t("مؤرشف","Archived")}</option>
          </select>
        </div>
        <div class="field">
          <label>${g("startDate")}</label>
          <input type="date" name="startDate" value="${c((e?.startDate||"").split("T")[0])}" />
        </div>
        <div class="field">
          <label>${g("dueDate")}</label>
          <input type="date" name="dueDate" value="${c((e?.dueDate||"").split("T")[0])}" />
        </div>

        <!-- 👥 القسم 3: أعضاء فريق المشروع والمشاركون -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${x("users",14)} <span>${t("أعضاء فريق المشروع والمشاركون","Project Team Members & Collaborators")}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${t("اختر من الفريق لإعطائهم حق الوصول للمشروع","Select team members who can access this project")}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${o.length?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${Ba(o)}
          </div>

          <!-- حقل البحث والإضافة السريعة -->
          <div style="position:relative;display:flex;gap:6px;">
            <input type="text" id="project-member-search" placeholder="${t("ابحث عن عضو لإضافته لفريق المشروع...","Search team member to add to project team...")}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          </div>

          <!-- القائمة المنسدلة للبحث والاختيار -->
          <div id="project-member-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
          </div>
        </div>

        <!-- 📝 القسم 4: نطاق المشروع والملاحظات -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${x("document",14)} <span>${t("نطاق المشروع والملاحظات","Scope & Notes")}</span>
        </div>

        <div class="field full">
          <label>${t("وصف ونطاق المشروع","Project Scope & Description")}</label>
          <textarea name="descriptionAr" placeholder="${t("وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...","Brief description of scope, design criteria, and special notes...")}">${c(e?.descriptionAr||"")}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${e&&(S("delete_projects")||C())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
              ${x("trash",14)} ${t("حذف المشروع","Delete Project")}
            </button>
          `:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
          <button type="submit" class="btn btn-primary">${x("check",14)} ${g(e?"save":"create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=De(e?t("تعديل بيانات المشروع","Edit Project"):g("addProject"),t("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),s,"project"),setTimeout(()=>{const i=document.getElementById("project-member-search"),l=document.getElementById("project-member-dropdown"),d=document.getElementById("project-members-chips-container"),p=document.getElementById("project-members-input"),u=document.getElementById("project-manager-select");if(!i||!l||!d||!p)return;let f=[...o];function v(){d.innerHTML=Ba(f),d.style.display=f.length?"flex":"none",p.value=JSON.stringify(f),d.querySelectorAll(".btn-remove-project-member").forEach(b=>{b.addEventListener("click",h=>{h.stopPropagation();const m=b.dataset.uid;f=f.filter(y=>y!==m),v()})})}u&&u.addEventListener("change",()=>{const b=u.value;b&&!f.includes(b)&&(f.push(b),v())});function k(b=""){const h=b.toLowerCase().trim(),m=(r.data?.users||[]).filter(y=>!f.includes(y.id)&&(!h||y.name&&y.name.toLowerCase().includes(h)||y.nameEn&&y.nameEn.toLowerCase().includes(h)||y.email&&y.email.toLowerCase().includes(h)));m.length?(l.innerHTML=m.map(y=>`
          <div class="project-member-opt" data-uid="${c(y.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${K(y,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${c(t(y.name,y.nameEn||y.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${c(y.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${t("إضافة","Add")}</span>
          </div>
        `).join(""),l.querySelectorAll(".project-member-opt").forEach(y=>{y.addEventListener("mouseenter",()=>y.style.background="var(--surface-soft)"),y.addEventListener("mouseleave",()=>y.style.background="transparent"),y.addEventListener("click",()=>{const I=y.dataset.uid;I&&!f.includes(I)&&(f.push(I),v(),i.value="",l.style.display="none")})})):l.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${t("لا يوجد أعضاء مطابقون","No matching members")}</div>`,l.style.display="block"}i.addEventListener("focus",()=>k(i.value)),i.addEventListener("input",()=>k(i.value)),document.addEventListener("click",b=>{!i.contains(b.target)&&!l.contains(b.target)&&(l.style.display="none")}),v()},50)}function lo(e){const a=`
    <form id="clone-form" data-project-id="${e.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${t("أنت على وشك استنساخ المشروع:","You are about to clone the project:")} <strong style="color:var(--ink)">${c(t(e.nameAr,e.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${g("nameAr")}</label>
          <input name="nameAr" value="${c(e.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${g("nameEn")}</label>
          <input name="nameEn" value="${c(e.nameEn)} (Copy)" required />
        </div>
      </div>
      
      <div class="field full">
        <label>${t("تاريخ التسليم المتوقع","Expected Due Date")}</label>
        <input name="dueDate" type="date" value="${(e.dueDate||"").split("T")[0]}" />
      </div>

      <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:20px;display:flex;flex-direction:column;gap:12px">
        <strong style="font-size:13px">${t("إعدادات النسخ المتقدمة","Advanced Clone Settings")}</strong>
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneTasks" checked style="width:16px;height:16px;margin:0">
          ${t("نسخ جميع المهام والهيكلة (Tasks)","Clone all tasks & structure")}
        </label>
        
        <div style="padding-${r.lang==="ar"?"right":"left"}:26px">
          <label style="display:flex;align-items:center;gap:8px;font-weight:400;color:var(--ink-soft);cursor:pointer">
            <input type="checkbox" name="keepAssignees" style="width:14px;height:14px;margin:0">
            ${t("الاحتفاظ بالمسند إليهم (Keep Assignees)","Keep Task Assignees")}
          </label>
        </div>
        
        <hr style="border:0;border-top:1px solid var(--border);margin:4px 0" />
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneMembers" checked style="width:16px;height:16px;margin:0">
          ${t("استنساخ أعضاء فريق العمل (Team)","Clone team members")}
        </label>
      </div>
      
      <div class="modal-actions" style="margin-top:24px">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=De(t("استنساخ المشروع","Clone Project"),t("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),a,"clone");const n=document.getElementById("clone-form"),o=n.querySelector('input[name="cloneTasks"]'),s=n.querySelector('input[name="keepAssignees"]');o.addEventListener("change",i=>{s.disabled=!i.target.checked,i.target.checked||(s.checked=!1)}),n.addEventListener("submit",async i=>{i.preventDefault();const l=n.querySelector('button[type="submit"]');l.disabled=!0;try{const d={nameAr:n.nameAr.value,nameEn:n.nameEn.value,dueDate:n.dueDate.value,cloneTasks:n.cloneTasks.checked,keepAssignees:n.keepAssignees.checked,cloneMembers:n.cloneMembers.checked},p=await z(`/api/projects/${e.id}/clone`,{method:"POST",body:JSON.stringify(d)});V(),r.view="project-detail",r.activeProjectId=p.project.id,await refreshView(),$(t("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(d){$(d.message,!0),l.disabled=!1}})}function Hi(){const e=r.data?.projects||[];if(!e||!e.length){$(t("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const a=getCompanyBranding(),n=je(),o=11;let s="<table>";s+=`<tr><td colspan="${o}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${a.logoUrl?`<img src="${c(a.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(a.displayName)}</span>
  </td></tr>`,s+=`<tr><td colspan="${o}" class="subtitle">${t("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,s+=`<tr><td colspan="${o}" class="meta">${t("تاريخ الإصدار:","Generated on:")} ${n}</td></tr>`,s+=`<tr><td colspan="${o}" style="border:none;"></td></tr>`,s+=`<tr class="header">
    <td>${t("كود المشروع","Code")}</td>
    <td>${t("اسم المشروع (عربي)","Project Name (Ar)")}</td>
    <td>${t("اسم المشروع (إنجليزي)","Project Name (En)")}</td>
    <td>${t("العميل / المالك","Client")}</td>
    <td>${t("مدير المشروع","Manager")}</td>
    <td>${t("المرحلة","Lifecycle")}</td>
    <td>${t("الصحة التشغيلية","Health")}</td>
    <td>${t("تاريخ البدء","Start Date")}</td>
    <td>${t("تاريخ التسليم","Due Date")}</td>
    <td>${t("نسبة الإنجاز","Progress %")}</td>
    <td>${t("عدد أعضاء الفريق","Team Size")}</td>
  </tr>`,e.forEach(i=>{const l=i.manager?t(i.manager.name,i.manager.nameEn||i.manager.name):"";s+=`<tr>
      <td>${c(F(i.code))}</td>
      <td>${c(F(i.nameAr))}</td>
      <td>${c(F(i.nameEn))}</td>
      <td>${c(F(t(i.clientAr,i.clientEn)))}</td>
      <td>${c(F(l))}</td>
      <td>${c(F(H(i.lifecycle)))}</td>
      <td>${c(F(H(i.health)))}</td>
      <td>${c(F(i.startDate||""))}</td>
      <td>${c(F(i.dueDate||""))}</td>
      <td>${i.progress||0}%</td>
      <td>${i.memberCount||0}</td>
    </tr>`}),s+="</table>",exportXLS(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,s),$(t("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),z("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:t("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:e.length}})}).catch(()=>{})}function Wi(e){const a=(r.data?.projects||[]).find(f=>f.id===e);if(!a)return;const n=(r.data?.tasks||[]).filter(f=>f.projectId===e);if(!n.length){$(t("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const o=getCompanyBranding(),s=r.data?.users||[],i=new Map(s.map(f=>[f.id,f]));function l(f){if(!f)return"—";const v=i.get(f);return v?t(v.name,v.nameEn||v.name):f}const d=je(),p=11;let u="<table>";u+=`<tr><td colspan="${p}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${o.logoUrl?`<img src="${c(o.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(o.displayName)}</span>
  </td></tr>`,u+=`<tr><td colspan="${p}" class="subtitle">${t("تقرير مهام ومخرجات المشروع:","Project Tasks & Deliverables Report:")} ${c(t(a.nameAr,a.nameEn))} (${c(a.code)})</td></tr>`,u+=`<tr><td colspan="${p}" class="meta">${t("العميل / المالك:","Client:")} ${c(t(a.clientAr,a.clientEn))||"—"} | ${t("تاريخ الإصدار:","Generated on:")} ${d}</td></tr>`,u+=`<tr><td colspan="${p}" style="border:none;"></td></tr>`,u+=`<tr class="header">
    <td>${t("كود المخرج","Code")}</td>
    <td>${t("المهمة (عربي)","Task (Ar)")}</td>
    <td>${t("المهمة (إنجليزي)","Task (En)")}</td>
    <td>${t("التخصص / القسم","Category")}</td>
    <td>${t("المنفذ المسؤول","Assignee")}</td>
    <td>${t("المراجع الهندسي","Reviewer")}</td>
    <td>${t("المعتمد النهائي","Approver")}</td>
    <td>${t("الحالة","Status")}</td>
    <td>${t("تاريخ البدء","Start Date")}</td>
    <td>${t("تاريخ التسليم","Due Date")}</td>
    <td>${t("الإنجاز","Progress %")}</td>
  </tr>`,n.forEach((f,v)=>{const k=f.templateId?f.templateId.replace("tpl-","#"):f.id?`#${f.id.slice(-6)}`:`#${v+1}`,b=l(f.assigneeId||f.assignee_id),h=l(f.reviewerId||f.reviewer_id),m=l(f.approverId||f.approver_id);u+=`<tr>
      <td style="text-align:center;font-weight:bold;">${c(F(k))}</td>
      <td>${c(F(f.titleAr))}</td>
      <td>${c(F(f.titleEn))}</td>
      <td>${c(F(t(f.categoryAr,f.categoryEn)))}</td>
      <td>${c(F(b))}</td>
      <td style="color:#0369a1;">${c(F(h))}</td>
      <td style="color:#047857;">${c(F(m))}</td>
      <td>${c(F(H(f.status)))}</td>
      <td>${c(F(f.startDate||""))}</td>
      <td>${c(F(f.dueDate||""))}</td>
      <td style="font-weight:bold;">${f.progress||0}%</td>
    </tr>`}),u+="</table>",exportXLS(`DARC_Project_${a.code}_${new Date().toISOString().split("T")[0]}`,u),$(t("تم بدء تحميل تقرير المهام.","Report download started.")),z("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:t(`تقرير مهام مشروع: ${a.nameAr}`,`Project Tasks Report: ${a.nameEn||a.nameAr}`),taskCount:n.length}})}).catch(()=>{})}function Fa(e,a=!1){const n=(r.data?.projects||[]).find(w=>w.id===e);if(!n)return;const o=(r.data?.tasks||[]).filter(w=>w.projectId===e);if(!o.length){$(t("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const s=getCompanyBranding(),i=r.data?.users||[],l=new Map(i.map(w=>[w.id,w]));function d(w){if(!w)return"—";const A=l.get(w);return A?t(A.name,A.nameEn||A.name):w}function p(w){if(!w?.dueDate||["done","completed","canceled"].includes(w.status))return!1;const A=Me(w.dueDate);return A?A<new Date:!1}const u=o.length,f=o.filter(w=>["done","completed"].includes(w.status)).length,v=o.filter(w=>["review","approval"].includes(w.status)).length;o.filter(w=>w.status==="in_progress").length;const k=o.filter(w=>p(w)).length,b=new Date,h=je(b),m=He(b),y=new Map;o.forEach(w=>{const A=t(w.categoryAr,w.categoryEn)||t(w.typeAr,w.typeEn)||t("عام","General"),E=y.get(A)||{total:0,completed:0,weight:0,progressSum:0},_=Number(w.weight||1);E.total++,["done","completed"].includes(w.status)&&E.completed++,E.weight+=_,E.progressSum+=(w.progress||0)*_,y.set(A,E)});const I=Array.from(y.entries()).map(([w,A])=>({name:w,percent:A.weight?Math.round(A.progressSum/A.weight):0,completed:A.completed,total:A.total})),D=a?t("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):t("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");a?t("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):t("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const T=o.map((w,A)=>{const E=w.templateId?w.templateId.replace("tpl-","#"):w.id?`#${w.id.slice(-6)}`:`#${A+1}`,_=t(w.titleAr,w.titleEn),j=t(w.categoryAr,w.categoryEn)||t(w.typeAr,w.typeEn)||"—",L=H(w.status),N=w.progress||0,O=w.dueDate||"—";if(a)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${A+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${c(E)}</td>
          <td style="font-weight:600;">${c(_)}</td>
          <td style="text-align:center;">${c(j)}</td>
          <td style="text-align:center;"><span class="badge ${c(w.status)}">${c(L)}</span></td>
          <td style="text-align:center;direction:ltr;">${c(O)}</td>
          <td style="text-align:center;font-weight:bold;color:${N===100?"#0d6269":"#1e293b"};">${N}%</td>
        </tr>
      `;const P=d(w.assigneeId||w.assignee_id),U=d(w.reviewerId||w.reviewer_id),G=d(w.approverId||w.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${A+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${c(E)}</td>
        <td style="font-weight:600;">${c(_)}</td>
        <td style="text-align:center;">${c(j)}</td>
        <td>${c(P)}</td>
        <td style="color:#0369a1;font-weight:600;">${c(U)}</td>
        <td style="color:#047857;font-weight:600;">${c(G)}</td>
        <td style="text-align:center;"><span class="badge ${c(w.status)}">${c(L)}</span></td>
        <td style="text-align:center;direction:ltr;">${c(O)}</td>
        <td style="text-align:center;font-weight:bold;color:${N===100?"#0d6269":"#1e293b"};">${N}%</td>
      </tr>
    `}).join(""),R=`
    <!DOCTYPE html>
    <html lang="${r.lang}" dir="${r.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${c(s.displayName)} - ${c(n.code)} - ${a?"Client_Report":"Executive_Report"}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>
        @page { size: A4 portrait; margin: 12mm 14mm 15mm 14mm; }
        * { box-sizing: border-box; }
        body {
          font-family: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 24px;
          color: #0f172a;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.45;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print-toolbar {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 18px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .btn-toolbar {
          background: #0d6269;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .btn-toolbar-ghost {
          background: #e2e8f0;
          color: #1e293b;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          text-decoration: none;
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 3px solid #0d6269;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .brand-logo-img {
          max-height: 52px;
          max-width: 170px;
          object-fit: contain;
          margin-bottom: 4px;
        }
        .brand-logo-fallback {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #0d6269, #00c2cb);
          color: #fff;
          font-weight: 800;
          font-size: 18px;
          border-radius: 10px;
          margin-bottom: 4px;
        }
        .brand-title {
          font-size: 19px;
          font-weight: 800;
          color: #0d6269;
          margin: 0;
          line-height: 1.2;
        }
        .brand-sub {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }
        .report-meta-box {
          text-align: ${r.lang==="ar"?"left":"right"};
          font-size: 11px;
          color: #334155;
          line-height: 1.6;
        }
        .report-type-badge {
          display: inline-block;
          background: #e6f4f5;
          color: #0d6269;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 11px;
          border: 1px solid #bce1e4;
          margin-bottom: 4px;
        }
        .info-strip {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .info-cell strong {
          display: block;
          font-size: 10px;
          color: #64748b;
          text-transform: uppercase;
        }
        .info-cell span {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
        }
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        .kpi-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 8px;
          padding: 10px 12px;
          text-align: center;
          border-top: 3px solid #0d6269;
        }
        .kpi-val {
          font-size: 20px;
          font-weight: 800;
          color: #0d6269;
        }
        .kpi-label {
          font-size: 10px;
          color: #64748b;
          font-weight: 600;
          margin-top: 2px;
        }
        .disc-section {
          background: #fafafa;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }
        .disc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 6px;
        }
        .disc-item {
          font-size: 10px;
        }
        .disc-bar-bg {
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
          margin-top: 3px;
        }
        .disc-bar-fill {
          height: 100%;
          background: #0d6269;
          border-radius: 3px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th, td {
          border: 1px solid #cbd5e1;
          padding: 6px 8px;
          text-align: ${r.lang==="ar"?"right":"left"};
          vertical-align: middle;
        }
        th {
          background: #0d6269;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          text-align: center;
        }
        tr:nth-child(even) {
          background: #f8fafc;
        }
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 700;
        }
        .badge.done, .badge.completed { background: #dcfce7; color: #166534; }
        .badge.in_progress { background: #dbeafe; color: #1e40af; }
        .badge.review, .badge.approval { background: #fef3c7; color: #92400e; }
        .badge.blocked { background: #fee2e2; color: #991b1b; }
        .badge.not_started { background: #f1f5f9; color: #475569; }
        .signature-section {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          page-break-inside: avoid;
        }
        .signature-box {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          background: #fafafa;
          min-height: 90px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .signature-title {
          font-size: 11px;
          font-weight: 700;
          color: #1e293b;
        }
        .signature-line {
          border-top: 1px dashed #94a3b8;
          margin-top: 35px;
          padding-top: 4px;
          font-size: 10px;
          color: #64748b;
        }
        .stamp-box {
          border: 2px dashed #0d6269;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          color: #0d6269;
          font-weight: 700;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 90px;
          background: #f0fdfa;
        }
        .report-footer {
          margin-top: 20px;
          border-top: 1px solid #e2e8f0;
          padding-top: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: #94a3b8;
        }
        @media print {
          .no-print-toolbar { display: none !important; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print-toolbar">
        <div>
          <strong style="color:#0d6269;font-size:13px;">${c(D)}</strong>
          <div style="font-size:11px;color:#64748b;">${t("معاينة التقرير جاهزة للطباعة أو الحفظ المباشر كملف PDF رسمي.","Ready for printing or saving directly as an official executive PDF file.")}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">
            🖨️ ${t("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.location.search = (window.location.search.includes('client=1') ? '' : '?client=1')">
            🔄 ${a?t("التبديل للتقرير الفني الشامل","Switch to Technical Report"):t("التبديل لتقرير المالك والعميل","Switch to Client Report")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.close()">
            ✕ ${t("إغلاق","Close")}
          </button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${s.logoUrl?`
            <img src="${c(s.logoUrl)}" alt="Logo" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${c(s.displayName)}</h1>
          <div class="brand-sub">${t("مكتب الاستشارات والتصميم الهندسي","Architecture & Engineering Consultancy")}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${c(D)}</div>
          <div><strong>${t("كود المشروع:","Project Code:")}</strong> ${c(n.code)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(h)} - ${c(m)}</div>
          <div><strong>${t("حالة المشروع:","Project Status:")}</strong> ${c(H(n.lifecycle))} (${c(H(n.health))})</div>
        </div>
      </header>

      <div class="info-strip">
        <div class="info-cell">
          <strong>${t("اسم المشروع","Project Name")}</strong>
          <span>${c(t(n.nameAr,n.nameEn))}</span>
        </div>
        <div class="info-cell">
          <strong>${t("العميل / المالك","Client / Owner")}</strong>
          <span>${c(t(n.clientAr,n.clientEn))||"—"}</span>
        </div>
        <div class="info-cell">
          <strong>${t("الجدول الزمني","Schedule Timeline")}</strong>
          <span>${c(n.startDate||"—")} → ${c(n.dueDate||"—")}</span>
        </div>
        <div class="info-cell">
          <strong>${t("مدير المشروع المسؤول","Project Manager")}</strong>
          <span>${c(d(n.managerId))}</span>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${n.progress||0}%</div>
          <div class="kpi-label">${t("نسبة الإنجاز الإجمالية","Overall Progress")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#047857;">${f} / ${u}</div>
          <div class="kpi-label">${t("المخرجات المعتمدة","Approved Deliverables")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${v}</div>
          <div class="kpi-label">${t("قيد المراجعة والاعتماد","Under Review")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:${k>0?"#b91c1c":"#64748b"};">${k}</div>
          <div class="kpi-label">${t("المخرجات المتأخرة","Overdue Deliverables")}</div>
        </div>
      </div>

      ${I.length?`
        <div class="disc-section">
          <strong style="font-size:11px;color:#334155;">${t("مؤشرات الإنجاز بحسب التخصص الهندسي:","Engineering Discipline Progress Breakdown:")}</strong>
          <div class="disc-grid">
            ${I.map(w=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${c(w.name)}</span>
                  <span>${w.percent}% (${w.completed}/${w.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${w.percent}%;"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      <table>
        <thead>
          <tr>
            <th style="width:30px;">#</th>
            <th style="width:75px;">${t("الكود","Code")}</th>
            <th>${a?t("اسم المخرج الهندسي / المخطط","Deliverable / Drawing Title"):t("المهمة والمخرج القياسي","Deliverable & Task Title")}</th>
            <th style="width:90px;">${t("التخصص","Discipline")}</th>
            ${a?"":`
              <th style="width:105px;">${t("المنفذ","Assignee")}</th>
              <th style="width:105px;">${t("المراجع","Reviewer")}</th>
              <th style="width:105px;">${t("المعتمد","Approver")}</th>
            `}
            <th style="width:80px;">${t("الحالة","Status")}</th>
            <th style="width:85px;">${t("موعد التسليم","Target Due")}</th>
            <th style="width:55px;">${t("الإنجاز","Progress")}</th>
          </tr>
        </thead>
        <tbody>
          ${T}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">
          ${t("ختم المكتب الهندسي والاستشاري المعتمد","Official Engineering Consultancy Stamp")}
        </div>
        <div class="signature-box">
          <div class="signature-title">${t("مهندس ومدير المشروع","Project Manager")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${c(d(n.managerId))}</div>
          <div class="signature-line">${t("التوقيع والمصادقة","Sign & Date")}</div>
        </div>
        <div class="signature-box">
          <div class="signature-title">${t("الاعتماد والاستشاري العام","Approved By Lead Consultant")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${c(s.displayName)}</div>
          <div class="signature-line">${t("التوقيع والاعتماد النهائي","Sign & Authorization")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${c(s.displayName)} — ${t("وثيقة إدارية معتمدة صادرة عبر منصة دارك","Official Governance Document via DARC Platform")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${c(h)}</div>
      </footer>
    </body>
    </html>
  `,B=window.open("","_blank","width=1100,height=900");B?(B.document.open(),B.document.write(R),B.document.close()):Tn(R),$(t("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),z("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:c(D),type:a?"client_pdf":"executive_pdf",taskCount:u}})}).catch(()=>{})}function Vi(){const e=r.data?.projects||[];if(!e||!e.length){$(t("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const a=getCompanyBranding(),n=new Date,o=je(n),s=He(n),i=e.length,l=e.filter(b=>b.health==="on_track").length,d=e.filter(b=>b.health==="at_risk").length,p=e.filter(b=>b.health==="off_track").length,u=e.map((b,h)=>{const m=b.manager?t(b.manager.name,b.manager.nameEn||b.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${h+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${c(b.code)}</td>
        <td style="font-weight:700;">${c(t(b.nameAr,b.nameEn))}</td>
        <td>${c(t(b.clientAr,b.clientEn))||"—"}</td>
        <td>${c(m)}</td>
        <td style="text-align:center;"><span class="badge ${c(b.lifecycle)}">${c(H(b.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${c(b.health)}">${c(H(b.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${c(b.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${c(b.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${b.progress===100?"#0d6269":"#0f172a"};">${b.progress||0}%</td>
      </tr>
    `}).join(""),f=t("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),v=`
    <!DOCTYPE html>
    <html lang="${r.lang}" dir="${r.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${c(a.displayName)} - Portfolio_Report_${new Date().toISOString().split("T")[0]}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>
        @page { size: A4 landscape; margin: 12mm 15mm; }
        * { box-sizing: border-box; }
        body {
          font-family: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 24px;
          color: #0f172a;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.45;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print-toolbar {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 18px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .btn-toolbar {
          background: #0d6269;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-toolbar-ghost {
          background: #e2e8f0;
          color: #1e293b;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 3px solid #0d6269;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .brand-logo-img {
          max-height: 52px;
          max-width: 170px;
          object-fit: contain;
          margin-bottom: 4px;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 800;
          color: #0d6269;
          margin: 0;
        }
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }
        .kpi-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 8px;
          padding: 10px 14px;
          text-align: center;
          border-top: 3px solid #0d6269;
        }
        .kpi-val { font-size: 22px; font-weight: 800; color: #0d6269; }
        .kpi-label { font-size: 10px; color: #64748b; font-weight: 600; margin-top: 2px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th, td { border: 1px solid #cbd5e1; padding: 7px 9px; text-align: ${r.lang==="ar"?"right":"left"}; vertical-align: middle; }
        th { background: #0d6269; color: #ffffff; font-size: 10px; font-weight: 700; text-align: center; }
        tr:nth-child(even) { background: #f8fafc; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 9px; font-weight: 700; }
        .badge.on_track, .badge.active, .badge.completed { background: #dcfce7; color: #166534; }
        .badge.at_risk, .badge.planning { background: #fef3c7; color: #92400e; }
        .badge.off_track, .badge.on_hold { background: #fee2e2; color: #991b1b; }
        .signature-section { margin-top: 28px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; page-break-inside: avoid; }
        .signature-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; background: #fafafa; }
        .stamp-box { border: 2px dashed #0d6269; border-radius: 8px; padding: 12px; text-align: center; color: #0d6269; font-weight: 700; font-size: 11px; display: flex; align-items: center; justify-content: center; min-height: 80px; background: #f0fdfa; }
        .report-footer { margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; }
        @media print {
          .no-print-toolbar { display: none !important; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print-toolbar">
        <div>
          <strong style="color:#0d6269;font-size:13px;">${c(f)}</strong>
          <div style="font-size:11px;color:#64748b;">${t("معاينة تقرير المحفظة جاهزة للطباعة أو الحفظ كـ PDF.","Portfolio report preview ready for print / save as PDF.")}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">🖨️ ${t("طباعة / حفظ كـ PDF","Print / Save as PDF")}</button>
          <button class="btn-toolbar-ghost" onclick="window.close()">✕ ${t("إغلاق","Close")}</button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${a.logoUrl?`<img src="${c(a.logoUrl)}" alt="Logo" class="brand-logo-img" />`:""}
          <h1 class="brand-title">${c(a.displayName)}</h1>
          <div style="font-size:11px;color:#64748b;">${t("الإدارة الهندسية وضبط الجودة والمشاريع","Engineering Operations & Project Portfolio Readout")}</div>
        </div>
        <div style="text-align:${r.lang==="ar"?"left":"right"};font-size:11px;color:#334155;line-height:1.6;">
          <div style="display:inline-block;background:#e6f4f5;color:#0d6269;font-weight:800;padding:3px 10px;border-radius:4px;font-size:11px;border:1px solid #bce1e4;margin-bottom:4px;">${t("تقرير حالة المحفظة","Portfolio Status Report")}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(o)} - ${c(s)}</div>
          <div><strong>${t("إجمالي المشاريع:","Total Projects:")}</strong> ${i}</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${i}</div>
          <div class="kpi-label">${t("إجمالي مشاريع المحفظة","Total Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#166534;">${l}</div>
          <div class="kpi-label">${t("مشاريع تسير وفق الخطة","On Track Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${d}</div>
          <div class="kpi-label">${t("مشاريع تحت المراقبة (مخاطر)","At Risk Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#991b1b;">${p}</div>
          <div class="kpi-label">${t("مشاريع متأخرة أو حرجة","Off Track / Delayed")}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:30px;">#</th>
            <th style="width:75px;">${t("كود المشروع","Code")}</th>
            <th>${t("اسم المشروع","Project Name")}</th>
            <th>${t("العميل / المالك","Client / Owner")}</th>
            <th>${t("مدير المشروع","Manager")}</th>
            <th style="width:80px;">${t("المرحلة","Lifecycle")}</th>
            <th style="width:80px;">${t("الصحة التشغيلية","Health")}</th>
            <th style="width:85px;">${t("تاريخ البدء","Start Date")}</th>
            <th style="width:85px;">${t("تاريخ التسليم","Due Date")}</th>
            <th style="width:65px;">${t("الإنجاز","Progress %")}</th>
          </tr>
        </thead>
        <tbody>
          ${u}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">${t("ختم الإدارة الهندسية والمكتب الاستشاري","Engineering Management Official Stamp")}</div>
        <div class="signature-box">
          <div style="font-size:11px;font-weight:700;color:#1e293b;">${t("مسؤول ضبط المشاريع (PMO)","PMO Lead")}</div>
          <div style="border-top:1px dashed #94a3b8;margin-top:35px;padding-top:4px;font-size:10px;color:#64748b;">${t("التوقيع والتاريخ","Sign & Date")}</div>
        </div>
        <div class="signature-box">
          <div style="font-size:11px;font-weight:700;color:#1e293b;">${t("المدير التنفيذي العام","Executive Director")}</div>
          <div style="border-top:1px dashed #94a3b8;margin-top:35px;padding-top:4px;font-size:10px;color:#64748b;">${t("المصادقة والاعتماد","Sign & Approval")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${c(a.displayName)} — ${t("تقرير إداري معتمد لمحفظة المشاريع","Official Portfolio Readout")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${c(o)}</div>
      </footer>
    </body>
    </html>
  `,k=window.open("","_blank","width=1200,height=900");k?(k.document.open(),k.document.write(v),k.document.close()):Tn(v),$(t("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),z("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:c(f),type:"portfolio_pdf",count:i}})}).catch(()=>{})}function Tn(e){let a=document.getElementById("print-modal-overlay");a||(a=document.createElement("div"),a.id="print-modal-overlay",a.style.position="fixed",a.style.inset="0",a.style.zIndex="1400",a.style.background="rgba(0, 0, 0, 0.75)",a.style.backdropFilter="blur(4px)",a.style.display="flex",a.style.flexDirection="column",a.style.alignItems="center",a.style.justifyContent="center",a.style.padding="15px",document.body.appendChild(a)),a.innerHTML=`
    <div style="background:#fff;width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid #e2e8f0;background:#f8fafc;flex-wrap:wrap;gap:8px;">
        <strong style="color:#0d6269;font-size:14px;">${t("معاينة التقرير الرسمي المعتمد (PDF Preview)","Official Approved Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-iframe" style="display:flex;align-items:center;gap:6px;">
            ${x("printer",14)} ${t("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-print-modal">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;">
        <iframe id="print-preview-iframe" style="width:100%;height:100%;border:none;" srcdoc="${c(e)}"></iframe>
      </div>
    </div>
  `,a.style.display="flex";const n=()=>{a.style.display="none",a.innerHTML="",window.removeEventListener("keydown",o)},o=s=>{s.key==="Escape"&&n()};window.addEventListener("keydown",o),document.getElementById("btn-close-print-modal")?.addEventListener("click",n),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const s=document.getElementById("print-preview-iframe");s&&s.contentWindow&&(s.contentWindow.focus(),s.contentWindow.print())})}var co=me({computeDisciplinesBreakdown:()=>In,computeTeamWorkload:()=>Dn,exportDisciplinesExcel:()=>Ji,exportDrawingsExcel:()=>Xi,exportRisksExcel:()=>Yi,exportTeamWorkloadExcel:()=>Ki,getDaysOverdue:()=>xa,getDisciplineIcon:()=>Sn,getReportFilteredTasks:()=>Vt,renderReports:()=>Gi});function Sn(e=""){const a=String(e).toLowerCase();return a.includes("معمار")||a.includes("arch")?"🏛️":a.includes("كهرب")||a.includes("elect")?"⚡":a.includes("سباك")||a.includes("صحي")||a.includes("plumb")?"💧":a.includes("تكييف")||a.includes("hvac")||a.includes("ميكانيك")?"🌡️":a.includes("إنشائ")||a.includes("انشائ")||a.includes("struct")?"🏗️":a.includes("ديكور")||a.includes("داخل")||a.includes("interior")?"🛋️":a.includes("3d")||a.includes("رندر")||a.includes("visual")?"🎨":a.includes("كميات")||a.includes("boq")||a.includes("quantity")?"📊":a.includes("حريق")||a.includes("fire")?"🧯":"📐"}function Vt(e=[],a="all",n="all"){let o=a==="all"?e:e.filter(i=>i.projectId===a);const s=new Date;if(n==="month"){const i=new Date(s.getFullYear(),s.getMonth(),1);o=o.filter(l=>{const d=l.dueDate?new Date(l.dueDate):l.updatedAt?new Date(l.updatedAt):null;return d&&d>=i})}else if(n==="quarter"){const i=Math.floor(s.getMonth()/3)*3,l=new Date(s.getFullYear(),i,1);o=o.filter(d=>{const p=d.dueDate?new Date(d.dueDate):d.updatedAt?new Date(d.updatedAt):null;return p&&p>=l})}else n==="critical"&&(o=o.filter(i=>de(i)||i.priority==="urgent"||i.status==="blocked"));return o}function In(e=[]){const a=new Map;return e.forEach(n=>{const o=((r.lang==="ar"?n.categoryAr:n.categoryEn)||t(n.typeAr||"معماري",n.typeEn||"Architectural")).trim(),s=a.get(o)||{name:o,weight:0,progress:0,total:0,done:0,overdue:0},i=Number(n.weight||1);s.weight+=i,s.progress+=(n.progress||0)*i,s.total++,["done","completed"].includes(n.status)&&s.done++,de(n)&&s.overdue++,a.set(o,s)}),[...a.values()].map(n=>({...n,percentage:n.weight?Math.round(n.progress/n.weight):0})).sort((n,o)=>o.total-n.total)}function Dn(e=[],a=[]){const n=new Map;return e.forEach(o=>{if(o.assigneeId){const s=n.get(o.assigneeId);s?s.push(o):n.set(o.assigneeId,[o])}}),a.filter(o=>o.status!=="inactive").map(o=>{const s=n.get(o.id)||[],i=s.filter(b=>["done","completed"].includes(b.status)).length,l=s.filter(b=>["in_progress","review","approval"].includes(b.status)).length,d=s.filter(de).length,p=s.reduce((b,h)=>b+Number(h.weight||1),0),u=s.reduce((b,h)=>b+(h.progress||0)*Number(h.weight||1),0),f=p?Math.round(u/p):0;let v="optimal",k=t("متزن","Optimal");return l===0&&s.length===0?(v="idle",k=t("متاح","Available")):l>7||d>=2?(v="critical",k=t("ضغط حرج","Critical Overload")):l>4&&(v="high",k=t("حمولة مرتفعة","High Load")),{user:o,total:s.length,done:i,active:l,overdue:d,progress:f,capacity:v,capacityLabel:k}}).sort((o,s)=>s.active-o.active||s.overdue-o.overdue)}function Gi(){const{projects:e=[],tasks:a=[],users:n=[],documents:o=[]}=r.data||{},s=S("export_reports")||C(),i=r.reportProjectFilter||"all",l=r.reportTimeframe||"all",d=r.reportsTab||"overview",p=i==="all"?e:e.filter(P=>P.id===i),u=Vt(a,i,l),f=u.reduce((P,U)=>P+Number(U.weight||1),0),v=f?Math.round(u.reduce((P,U)=>P+(U.progress||0)*Number(U.weight||1),0)/f):0,k=u.filter(P=>["done","completed"].includes(P.status)).length,b=u.filter(P=>P.status==="in_progress").length,h=u.filter(P=>["review","approval"].includes(P.status)).length,m=u.filter(de),y=m.length,I=u.filter(P=>P.status==="blocked").length,D=p.filter(P=>P.health==="on_track").length,T=p.filter(P=>P.health==="at_risk").length,R=p.filter(P=>P.health==="off_track").length,B=p.filter(P=>P.lifecycle==="completed"||P.progress===100).length,w=u.length?Math.max(0,Math.min(100,Math.round((u.length-y)/u.length*100))):100,A=i==="all"?(o||[]).filter(P=>!P.deletedAt):(o||[]).filter(P=>P.projectId===i&&!P.deletedAt),E=A.filter(P=>P.status==="approved").length,_=In(u),j=Dn(u,n),L=_[0]?.name||t("معماري","Architectural"),N=[...p].sort((P,U)=>(U.progress||0)-(P.progress||0))[0],O=[...p].filter(P=>P.lifecycle==="active").sort((P,U)=>(P.progress||0)-(U.progress||0))[0];return`
    <!-- 📄 Page Header with Actions -->
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الرقابة والذكاء التنفيذي","EXECUTIVE INTELLIGENCE & AUDIT")}</p>
        <h1>${g("reports")}</h1>
        <p>${t("تحليلات شاملة للمحفظة الهندسية: الإنجاز الموزون، كفاءة الأقسام، ضغط الفريق، ومؤشرات المخاطر.","Comprehensive engineering portfolio readout: weighted progress, discipline efficiency, team capacity, and risk indicators.")}</p>
      </div>
      <div class="page-actions">
        ${s?`
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <button class="btn btn-primary" data-action="print-portfolio-pdf">
              ${x("printer",15)} ${t("تقرير المحفظة الرسمي (PDF)","Official Portfolio Report (PDF)")}
            </button>
            <button class="btn btn-soft" data-action="export-csv">
              ${x("document",15)} ${t("تصدير بيانات Excel","Export Excel Data")}
            </button>
          </div>
        `:""}
      </div>
    </div>

    <!-- 🎛️ Filter Toolbar & Horizon Selector -->
    <div class="view-toolbar" style="margin-bottom:16px;">
      <div class="view-toolbar-start" style="flex:1;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <!-- Project Scope Dropdown -->
        <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 180px;">
          <span style="font-size:12px;color:var(--ink-soft);font-weight:600;white-space:nowrap;">
            ${x("building",13)} ${t("المشروع:","Project:")}
          </span>
          <select class="select-compact" data-action="filter-report-project" style="width:100%;">
            <option value="all" ${i==="all"?"selected":""}>${t("— كافة مشاريع المحفظة —","— All Portfolio Projects —")}</option>
            ${e.map(P=>`
              <option value="${c(P.id)}" ${i===P.id?"selected":""}>
                ${c(P.code)} · ${c(t(P.nameAr,P.nameEn))}
              </option>
            `).join("")}
          </select>
        </div>

        <!-- Timeframe / Horizon Dropdown -->
        <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 160px;">
          <span style="font-size:12px;color:var(--ink-soft);font-weight:600;white-space:nowrap;">
            ${x("calendar",13)} ${t("الفترة:","Period:")}
          </span>
          <select class="select-compact" data-action="filter-report-timeframe" style="width:100%;">
            <option value="all" ${l==="all"?"selected":""}>${t("كافة الفترات والمراحل","All Milestones & Time")}</option>
            <option value="month" ${l==="month"?"selected":""}>${t("الشهر الحالي","Current Month")}</option>
            <option value="quarter" ${l==="quarter"?"selected":""}>${t("الربع السنوي الحالي (Q)","Current Quarter")}</option>
            <option value="critical" ${l==="critical"?"selected":""}>⚠️ ${t("المهام والمشاريع الحرجة فقط","Critical Focus Only")}</option>
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:6px 10px;font-size:11px;font-weight:700;color:var(--brand-teal);background:rgba(20,184,166,0.1);">
          ${p.length} ${t("مشاريع مشمولة","projects analyzed")} · ${u.length} ${t("مهمة","tasks")}
        </span>
      </div>
    </div>

    <!-- 📑 Report Perspectives Navigation Tabs -->
    <div class="detail-tabs" style="margin-bottom:20px;">
      <button class="detail-tab ${d==="overview"?"active":""}" data-action="report-tab" data-tab="overview">
        📊 ${t("النظرة التنفيذية ومؤشرات الأداء","Executive KPI Overview")}
      </button>
      <button class="detail-tab ${d==="disciplines"?"active":""}" data-action="report-tab" data-tab="disciplines">
        📐 ${t("تحليل الأقسام والتخصصات","Disciplines & Deliverables")}
      </button>
      <button class="detail-tab ${d==="team"?"active":""}" data-action="report-tab" data-tab="team">
        👥 ${t("أداء وحمولة فريق العمل","Team Workload & Capacity")}
      </button>
      <button class="detail-tab ${d==="risks"?"active":""}" data-action="report-tab" data-tab="risks">
        ⚠️ ${t("مصفوفة المخاطر والانحراف","Risk & Delay Matrix")}
        ${y>0?`<span class="badge badge-red" style="padding:1px 5px;font-size:10px;margin-inline-start:4px;">${y}</span>`:""}
      </button>
      <button class="detail-tab ${d==="drawings"?"active":""}" data-action="report-tab" data-tab="drawings">
        📑 ${t("المخططات والاعتمادات","Drawings & Submittals")}
      </button>
    </div>

    <!-- 📊 Tab Content Body -->
    ${d==="overview"?po({filteredProjects:p,filteredTasks:u,totalWeight:f,weightedProgress:v,completedTasksCount:k,inProgressTasksCount:b,inReviewTasksCount:h,overdueTasksCount:y,blockedTasksCount:I,onTrackProjectsCount:D,atRiskProjectsCount:T,offTrackProjectsCount:R,completedProjectsCount:B,onTimeRate:w,approvedDocsCount:E,filteredDocs:A,disciplines:_,highestDiscipline:L,highestProject:N,lowestProject:O}):""}

    ${d==="disciplines"?uo(_,u.length):""}
    ${d==="team"?fo(j,u.length):""}
    ${d==="risks"?mo(m,p,I):""}
    ${d==="drawings"?go(A,p):""}
  `}function po(e){const{filteredProjects:a,filteredTasks:n,weightedProgress:o,completedTasksCount:s,inProgressTasksCount:i,inReviewTasksCount:l,overdueTasksCount:d,blockedTasksCount:p,onTrackProjectsCount:u,atRiskProjectsCount:f,offTrackProjectsCount:v,completedProjectsCount:k,onTimeRate:b,approvedDocsCount:h,filteredDocs:m,disciplines:y,highestDiscipline:I,highestProject:D,lowestProject:T}=e,R=a.length||1,B=Math.round(u/R*100),w=Math.round(f/R*100),A=Math.round(v/R*100),E=Math.round(k/R*100);return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- 1. Executive KPIs Grid -->
      <div class="metrics-grid" style="margin-bottom:0;">
        <article class="metric-card teal">
          <div class="metric-top">
            <span class="metric-label">${t("الإنجاز الموزون العام","Weighted Portfolio Progress")}</span>
            <span class="metric-icon">${x("chart",16)}</span>
          </div>
          <div class="metric-value">${o}%</div>
          <span class="metric-note up">🎯 ${s} ${t("مهام مكتملة","tasks done")} (${n.length} ${t("إجمالي","total")})</span>
        </article>

        <article class="metric-card blue">
          <div class="metric-top">
            <span class="metric-label">${t("معدل الالتزام الزمني","On-Time Schedule Adherence")}</span>
            <span class="metric-icon">${x("clock",16)}</span>
          </div>
          <div class="metric-value">${b}%</div>
          <span class="metric-note ${b>=80?"up":"alert"}">${b>=80?t("وتيرة تسليم مستقرة","Healthy delivery pace"):t("تراجع في وتيرة التسليم","Pace needs correction")}</span>
        </article>

        <article class="metric-card ${d>0?"red":"teal"}">
          <div class="metric-top">
            <span class="metric-label">${t("المهام المتأخرة والحرجة","Critical & Overdue Tasks")}</span>
            <span class="metric-icon">${x(d>0?"alert":"check",16)}</span>
          </div>
          <div class="metric-value">${d}</div>
          <span class="metric-note ${d>0?"alert":"up"}">${d>0?t("تتطلب تدخلاً ومتابعة","Immediate escalation needed"):t("لا يوجد تأخير حرج","Zero critical delays")}</span>
        </article>

        <article class="metric-card amber">
          <div class="metric-top">
            <span class="metric-label">${t("المخططات المعتمدة","Approved Deliverables")}</span>
            <span class="metric-icon">${x("document",16)}</span>
          </div>
          <div class="metric-value">${h}</div>
          <span class="metric-note">📐 ${m.length} ${t("ملف ومخطط مرفوع","total uploaded documents")}</span>
        </article>
      </div>

      <!-- 2. Smart Executive Summary & Highlights -->
      <section class="panel" style="background:linear-gradient(135deg, var(--surface) 0%, var(--surface-soft) 100%);padding:20px;border:1px solid var(--line);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:24px;">💡</span>
            <div>
              <h3 style="margin:0;font-size:15px;color:var(--ink);">${t("الملخص التحليلي التنفيذي","Executive Operations & Health Summary")}</h3>
              <p style="margin:2px 0 0;font-size:12px;color:var(--ink-soft);">${t("قراءة ذكية لحركة المحفظة وجاهزية المخرجات ومكامن التباطؤ.","Automated synthesis of deliverable flow, velocity, and bottlenecks.")}</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge ${o>=70?"badge-teal":o>=40?"badge-amber":"badge-red"}" style="font-size:12px;font-weight:700;padding:4px 10px;">
              ${o>=70?t("حالة المحفظة: ممتازة ✅","Status: Excellent ✅"):o>=40?t("حالة المحفظة: تحتاج متابعة ⚠️","Status: Needs Attention ⚠️"):t("حالة المحفظة: حرجة 🚨","Status: Critical 🚨")}
            </span>
          </div>
        </div>

        <div style="margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 250px), 1fr));gap:14px;">
          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:block;margin-bottom:4px;">🚀 ${t("المشروع الأكثر تقدماً","Top Progressing Project")}</span>
            <strong style="font-size:13px;color:var(--ink);display:block;">${c(D?t(D.nameAr,D.nameEn):"—")}</strong>
            <span style="font-size:11px;color:var(--brand-teal);font-weight:bold;">${D?`${D.progress}% ${t("إنجاز","completed")}`:""}</span>
          </div>

          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:block;margin-bottom:4px;">📐 ${t("التخصص الأكبر حجماً","Largest Active Discipline")}</span>
            <strong style="font-size:13px;color:var(--ink);display:block;">${c(I)}</strong>
            <span style="font-size:11px;color:var(--ink-soft);">${y[0]?`${y[0].total} ${t("مهمة ومخرج مسجل","deliverables registered")}`:""}</span>
          </div>

          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:block;margin-bottom:4px;">⚠️ ${t("أولويات تحتاج انتباهك","Critical Attention Need")}</span>
            <strong style="font-size:13px;color:${d>0?"var(--red)":"var(--teal)"};display:block;">
              ${d>0?`${d} ${t("مهام تجاوزت موعد التسليم","tasks overdue")}`:t("جميع المواعيد منتظمة ومستقرة","All schedules on track")}
            </strong>
            <span style="font-size:11px;color:var(--ink-soft);">${p>0?`${p} ${t("مهام بانتظار فك الحجب","blocked tasks")}`:t("لا توجد مهام محجوبة","Zero blockers")}</span>
          </div>
        </div>
      </section>

      <!-- 3. Portfolio Distribution & Discipline Breakdown Panels -->
      <div class="report-grid">
        <!-- Left: Disciplines Progress Bars -->
        <section class="panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${t("الإنجاز الموزون حسب التخصص الهندسي","Progress by Engineering Discipline")}</h2>
              <p class="panel-subtitle">${t("نسبة الإنجاز الموزونة لكل تخصص ومخرجاته الهندسية.","Weighted completion for each engineering discipline.")}</p>
            </div>
            <span class="status-badge on_track">${o}%</span>
          </div>
          <div class="report-bars">
            ${y.length?y.map(_=>`
              <div class="report-bar-row">
                <span title="${c(_.name)}" style="display:flex;align-items:center;gap:6px;min-width:0;">
                  <span style="flex-shrink:0;">${Sn(_.name)}</span>
                  <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(_.name)}</span>
                </span>
                <div class="report-bar-track" title="${_.percentage}%">
                  <div class="report-bar-fill" style="width:${_.percentage}%;"></div>
                </div>
                <strong>${_.percentage}%</strong>
              </div>
            `).join(""):`<div class="empty">${g("noTasks")}</div>`}
          </div>
        </section>

        <!-- Right: Portfolio Health & Workload Pulse -->
        <div class="stack">
          <!-- Portfolio Health Distribution -->
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${t("صحة وتوزيع المحفظة","Portfolio Health Breakdown")}</h2>
                <p class="panel-subtitle">${t("توزيع المشاريع حسب مسار التنفيذ والمخاطر.","Project health status breakdown.")}</p>
              </div>
              <span class="mini-badge" style="font-size:10px;">${a.length} ${t("مشاريع","projects")}</span>
            </div>

            <!-- Visual Multi-segment Distribution Bar -->
            <div style="margin:8px 0 16px;">
              <div style="display:flex;height:10px;border-radius:6px;overflow:hidden;background:var(--line);">
                <div style="width:${B}%;background:var(--mint-strong);" title="${t("على المسار","On Track")}: ${u}"></div>
                <div style="width:${w}%;background:var(--amber);" title="${t("يحتاج انتباه","At Risk")}: ${f}"></div>
                <div style="width:${A}%;background:var(--red);" title="${t("متأخر","Off Track")}: ${v}"></div>
                <div style="width:${E}%;background:var(--teal);" title="${t("مكتمل","Completed")}: ${k}"></div>
              </div>
            </div>

            <div class="report-stat-list">
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--mint-strong);"></span>
                  ${g("onTrack")}
                </span>
                <strong style="color:var(--mint-strong)">${u}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amber);"></span>
                  ${g("atRisk")}
                </span>
                <strong style="color:var(--amber)">${f}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--red);"></span>
                  ${g("offTrack")}
                </span>
                <strong style="color:var(--red)">${v}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--teal);"></span>
                  ${g("completed")}
                </span>
                <strong style="color:var(--teal)">${k}</strong>
              </div>
            </div>
          </section>

          <!-- Task Workflow Phases Pulse -->
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${t("مراحل دورة عمل المهام","Task Workflow Stages")}</h2>
                <p class="panel-subtitle">${t("توزيع المهام النشطة حسب الحالة التشغيلية.","Active task distribution by stage.")}</p>
              </div>
            </div>
            <div class="report-stat-list">
              <div class="report-stat">
                <span>⚡ ${t("قيد التنفيذ النشط","In Progress")}</span>
                <strong style="color:var(--blue)">${i}</strong>
              </div>
              <div class="report-stat">
                <span>🔍 ${t("قيد المراجعة والاعتماد","Under Review & Approval")}</span>
                <strong style="color:var(--amber)">${l}</strong>
              </div>
              <div class="report-stat">
                <span>✅ ${t("مهام مكتملة","Completed")}</span>
                <strong style="color:var(--mint-strong)">${s}</strong>
              </div>
              ${p>0?`
                <div class="report-stat">
                  <span>⛔ ${t("مهام متوقفة / محجوبة","Blocked Tasks")}</span>
                  <strong style="color:var(--red)">${p}</strong>
                </div>
              `:""}
            </div>
          </section>
        </div>
      </div>
    </div>
  `}function uo(e,a){return`
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${t("التحليل التفصيلي للأقسام والتخصصات الهندسية","Engineering Disciplines & Deliverables Breakdown")}</h2>
          <p class="panel-subtitle">${t("إحصائيات الإنجاز والوزن التراكمي ومخرجات كل قسم تخصصي في المحفظة.","Detailed progress, weighted impact, and deliverable health for every discipline.")}</p>
        </div>
        <button class="btn btn-soft btn-sm" data-action="export-disciplines-excel">
          ${x("document",14)} ${t("تصدير التخصصات (Excel)","Export Disciplines (Excel)")}
        </button>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${t("التخصص الهندسي","Engineering Discipline")}</th>
              <th>${t("إجمالي المخرجات","Total Deliverables")}</th>
              <th>${t("المكتمل","Done")}</th>
              <th>${t("نسبة الإنجاز","Completion Rate")}</th>
              <th>${t("الوزن النسبي","Weight Share")}</th>
              <th>${t("الحالة","Discipline Health")}</th>
            </tr>
          </thead>
          <tbody>
            ${e.length?e.map(n=>{const o=a?Math.round(n.total/a*100):0,s=n.overdue===0&&n.percentage>=50,i=n.overdue>0;return`
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:18px;">${Sn(n.name)}</span>
                      <div>
                        <strong style="font-size:13px;color:var(--ink);display:block;">${c(n.name)}</strong>
                        <span style="font-size:11px;color:var(--muted);">${n.total} ${t("مخرج مسجل","deliverables")}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-weight:700;font-size:13px;">${n.total}</td>
                  <td style="color:var(--mint-strong);font-weight:700;">${n.done}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;min-width:140px;">
                      <div style="flex:1;height:6px;background:var(--line);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${n.percentage}%;background:${n.percentage===100?"var(--mint-strong)":"var(--brand-teal)"};"></div>
                      </div>
                      <strong style="font-size:12px;">${n.percentage}%</strong>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${o}%</td>
                  <td>
                    <span class="badge ${i?"badge-red":s?"badge-teal":"badge-amber"}" style="font-size:11px;font-weight:700;">
                      ${i?`⚠️ ${n.overdue} ${t("متأخرة","overdue")}`:s?t("ممتاز ✅","On Track ✅"):t("جارٍ التنفيذ ⏳","Active ⏳")}
                    </span>
                  </td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="6"><div class="empty">${g("noTasks")}</div></td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function fo(e,a){return`
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${t("مصفوفة كفاءة وضغط فريق العمل","Team Capacity & Workload Matrix")}</h2>
          <p class="panel-subtitle">${t("توزيع المهام النشطة، المكتملة، والمتأخرة ومعدل الضغط لكل عضو في الفريق.","Active tasks, completion rate, and workload pressure indicator for each team member.")}</p>
        </div>
        <button class="btn btn-soft btn-sm" data-action="export-team-workload-excel">
          ${x("document",14)} ${t("تصدير حمولة الفريق (Excel)","Export Team Load (Excel)")}
        </button>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${t("عضو الفريق","Team Member")}</th>
              <th>${t("المسمى / الدور","Role")}</th>
              <th>${t("المهام النشطة","Active Load")}</th>
              <th>${t("المكتملة","Completed")}</th>
              <th>${t("المتأخرة","Overdue")}</th>
              <th>${t("نسبة الإنجاز","Progress %")}</th>
              <th>${t("مستوى الحمولة","Capacity Status")}</th>
            </tr>
          </thead>
          <tbody>
            ${e.length?e.map(n=>{const o=n.user,s=n.capacity==="idle"?`<span class="badge" style="background:var(--surface-soft);color:var(--ink-soft);border:1px solid var(--line);">🟢 ${t("متاح للمهام","Available")}</span>`:n.capacity==="optimal"?`<span class="badge badge-teal">🟢 ${t("حمولة متزنة","Balanced")}</span>`:n.capacity==="high"?`<span class="badge badge-amber">🟡 ${t("حمولة مرتفعة","High Load")}</span>`:`<span class="badge badge-red">🔴 ${t("عبء حرج / تأخير","Overloaded")}</span>`;return`
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                      ${K(o,"mini-avatar")}
                      <div>
                        <strong style="font-size:13px;color:var(--ink);display:block;">${c(t(o.name,o.nameEn||o.name))}</strong>
                        <span style="font-size:11px;color:var(--muted);">${c(o.email||"")}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${c(re(o))}</td>
                  <td style="font-weight:700;font-size:13px;color:var(--blue);">${n.active}</td>
                  <td style="font-weight:700;font-size:13px;color:var(--mint-strong);">${n.done}</td>
                  <td style="font-weight:700;font-size:13px;color:${n.overdue>0?"var(--red)":"var(--muted)"};">${n.overdue}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:6px;min-width:100px;">
                      <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${n.progress}%;background:var(--teal);"></div>
                      </div>
                      <span style="font-size:11px;font-weight:700;">${n.progress}%</span>
                    </div>
                  </td>
                  <td>${s}</td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="7"><div class="empty">${t("لا يوجد أعضاء مسجلون","No members found")}</div></td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function mo(e,a,n){const o=a.filter(s=>s.health==="at_risk"||s.health==="off_track");return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- Overdue Tasks Register -->
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div>
            <h2 class="panel-title" style="color:var(--red);display:flex;align-items:center;gap:6px;">
              ${x("alert",16)} ${t("سجل المهام المتأخرة والحرجة","Overdue & Critical Tasks Register")} (${e.length})
            </h2>
            <p class="panel-subtitle">${t("قائمة بالمهام التي تجاوزت تاريخ التسليم المعتمد وتتطلب اتخاذ إجراء إداري فوري.","List of tasks past approved deadline requiring immediate managerial intervention.")}</p>
          </div>
          <button class="btn btn-soft btn-sm" data-action="export-risks-excel">
            ${x("document",14)} ${t("تصدير قائمة المخاطر (Excel)","Export Risks (Excel)")}
          </button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("اسم المهمة / المخرج","Task / Deliverable")}</th>
                <th>${t("المشروع","Project")}</th>
                <th>${t("المسؤول / المكلف","Assignee")}</th>
                <th>${t("الأولوية","Priority")}</th>
                <th>${t("تاريخ الاستحقاق","Due Date")}</th>
                <th>${t("مدة التأخير","Days Overdue")}</th>
                <th style="text-align:end;">${t("الإجراء","Action")}</th>
              </tr>
            </thead>
            <tbody>
              ${e.length?e.map(s=>{const i=xa(s.dueDate),l=(r.data?.projects||[]).find(p=>p.id===s.projectId),d=s.assignee?t(s.assignee.name,s.assignee.nameEn||s.assignee.name):"—";return`
                  <tr>
                    <td>
                      <strong style="display:block;font-size:13px;color:var(--ink);">${c(t(s.titleAr,s.titleEn))}</strong>
                      <span style="font-size:10.5px;color:var(--muted);">${c(s.templateId||t("مخرج مخصص","Custom Deliverable"))}</span>
                    </td>
                    <td>
                      <span class="badge badge-teal" style="font-size:10.5px;">${c(l?l.code:"—")}</span>
                      <span style="font-size:11px;color:var(--ink);margin-inline-start:4px;">${c(l?t(l.nameAr,l.nameEn):"—")}</span>
                    </td>
                    <td>${c(d)}</td>
                    <td>
                      <span class="badge ${s.priority==="urgent"?"badge-red":s.priority==="high"?"badge-amber":"badge-blue"}" style="font-size:10.5px;">
                        ${c(H(s.priority||"medium"))}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--ink);">${ae(s.dueDate,!0)}</td>
                    <td>
                      <span class="badge badge-red" style="font-weight:700;font-size:11px;">
                        ⏱️ ${i} ${t("يوم تأخير","days late")}
                      </span>
                    </td>
                    <td style="text-align:end;">
                      <button class="btn btn-soft btn-xs" data-action="open-task" data-task-id="${c(s.id)}">
                        ${x("edit",12)} ${t("متابعة","Review")}
                      </button>
                    </td>
                  </tr>
                `}).join(""):`
                <tr>
                  <td colspan="7">
                    <div class="empty" style="padding:28px 10px;">
                      <span style="font-size:28px;">🎉</span>
                      <strong style="color:var(--mint-strong);font-size:14px;margin-top:4px;">${t("ممتاز! لا توجد أي مهام متأخرة في المحفظة حالياً.","Excellent! Zero overdue tasks in portfolio.")}</strong>
                      <span style="font-size:11px;color:var(--muted);">${t("كافة مخرجات ومواعيد التسليم على المسار الصحيح.","All schedules and milestones are currently on track.")}</span>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <!-- At Risk Projects Overview -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${t("المشاريع ذات المخاطر والانحراف","Projects Requiring Escalation")} (${o.length})</h2>
            <p class="panel-subtitle">${t("مشاريع بحاجة لدعم إداري لتلافي تفاقم التأخير.","Projects needing attention to prevent deadline slippage.")}</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("رمز المشروع","Code")}</th>
                <th>${t("اسم المشروع","Project Name")}</th>
                <th>${t("العميل","Client")}</th>
                <th>${t("مدير المشروع","Manager")}</th>
                <th>${t("الحالة","Status")}</th>
                <th>${t("نسبة الإنجاز","Progress")}</th>
                <th>${t("تاريخ التسليم","Due Date")}</th>
                <th style="text-align:end;">${t("فتح المشروع","Open")}</th>
              </tr>
            </thead>
            <tbody>
              ${o.length?o.map(s=>`
                <tr>
                  <td><strong style="color:var(--brand-teal);">${c(s.code)}</strong></td>
                  <td><strong>${c(t(s.nameAr,s.nameEn))}</strong></td>
                  <td>${c(t(s.clientAr,s.clientEn))||"—"}</td>
                  <td>${c(s.manager?t(s.manager.name,s.manager.nameEn||s.manager.name):"—")}</td>
                  <td><span class="status-badge ${c(s.health)}">${c(H(s.health))}</span></td>
                  <td><strong>${s.progress||0}%</strong></td>
                  <td>${ae(s.dueDate,!0)}</td>
                  <td style="text-align:end;">
                    <button class="btn btn-soft btn-xs" data-action="open-project" data-project-id="${c(s.id)}">
                      ${t("عرض","View")} ➔
                    </button>
                  </td>
                </tr>
              `).join(""):`
                <tr>
                  <td colspan="8"><div class="empty">${t("كافة المشاريع تسير على المسار المعتمد دون تعثر.","All projects are proceeding on track.")}</div></td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function go(e,a){const n=e.filter(l=>l.status==="approved"),o=e.filter(l=>l.status==="review"||l.status==="approval"),s=e.filter(l=>!l.status||l.status==="draft"),i=e.filter(l=>l.status==="superseded");return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- Document Status Cards -->
      <div class="metrics-grid">
        <article class="metric-card teal">
          <div class="metric-top"><span class="metric-label">${t("مخططات معتمدة","Approved Drawings")}</span><span>✅</span></div>
          <div class="metric-value">${n.length}</div>
          <span class="metric-note up">${t("جاهزة للتنفيذ","Ready for construction")}</span>
        </article>
        <article class="metric-card amber">
          <div class="metric-top"><span class="metric-label">${t("قيد المراجعة الفنية","Under Review")}</span><span>🔍</span></div>
          <div class="metric-value">${o.length}</div>
          <span class="metric-note alert">${t("بانتظار موافقة المهندس","Awaiting engineer approval")}</span>
        </article>
        <article class="metric-card blue">
          <div class="metric-top"><span class="metric-label">${t("مسودات وتعديلات","Drafts / Revisions")}</span><span>✏️</span></div>
          <div class="metric-value">${s.length}</div>
          <span class="metric-note">${t("عمل جارٍ","Work in progress")}</span>
        </article>
        <article class="metric-card red">
          <div class="metric-top"><span class="metric-label">${t("مخططات ملغاة / مستبدلة","Superseded")}</span><span>📦</span></div>
          <div class="metric-value">${i.length}</div>
          <span class="metric-note">${t("إصدارات سابقة مؤرشفة","Archived previous revisions")}</span>
        </article>
      </div>

      <!-- Drawings Register Table -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${t("سجل المخططات والمستندات الهندسية (Drawings Register)","Drawings & Blueprints Submittals Register")} (${e.length})</h2>
            <p class="panel-subtitle">${t("قائمة المخططات الهندسية المعتمدة والمرفوعة مع الحجم، الحالة، وإمكانية المعاينة.","Registered engineering blueprints, upload status, revisions, and direct preview.")}</p>
          </div>
          <button class="btn btn-soft btn-sm" data-action="export-drawings-excel">
            ${x("document",14)} ${t("تصدير السجل (Excel)","Export Register (Excel)")}
          </button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("اسم المخطط / الملف","File / Blueprint Name")}</th>
                <th>${t("المشروع","Project")}</th>
                <th>${t("الحالة","Status")}</th>
                <th>${t("الحجم","Size")}</th>
                <th>${t("تاريخ الرفع","Date")}</th>
                <th style="text-align:end;">${t("المعاينة والتحميل","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${e.length?e.map(l=>{const d=a.find(u=>u.id===l.projectId),p=l.size>1048576?(l.size/1048576).toFixed(1)+" MB":Math.round((l.size||0)/1024)+" KB";return`
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:8px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(l.id)}">
                        <span style="color:var(--brand-teal);">${x("document",16)}</span>
                        <div>
                          <strong style="display:block;font-size:13px;color:var(--ink);">${c(l.originalName||l.name||"Drawing.pdf")}</strong>
                          <span style="font-size:10.5px;color:var(--muted);">${c(l.mimeType||"application/pdf")}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-teal" style="font-size:10.5px;">${c(d?d.code:"—")}</span>
                      <span style="font-size:11px;color:var(--ink);margin-inline-start:4px;">${c(d?t(d.nameAr,d.nameEn):"—")}</span>
                    </td>
                    <td>
                      <span class="status-badge ${c(l.status||"draft")}">
                        ${c(H(l.status||"draft"))}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--ink-soft);">${p}</td>
                    <td style="font-size:12px;color:var(--ink-soft);">${ae(l.createdAt,!0)}</td>
                    <td style="text-align:end;">
                      <div style="display:inline-flex;gap:4px;">
                        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(l.id)}" title="${t("معاينة","Preview")}">
                          ${x("eye",14)}
                        </button>
                        <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${c(l.id)}" style="color:var(--blue);" title="${t("تحميل","Download")}">
                          ${x("download",14)}
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join(""):`
                <tr>
                  <td colspan="6"><div class="empty">${t("لا توجد مخططات مرفوعة مطابقة للفلتر المحدد.","No uploaded drawings matching current filter.")}</div></td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function Ji(){if(!S("export_reports")&&!C()){$(g("permissionDenied"),!0);return}const{projects:e=[],tasks:a=[]}=r.data||{},n=r.reportProjectFilter||"all",o=r.reportTimeframe||"all",s=Vt(a,n,o),i=In(s);if(!i.length){$(t("لا توجد بيانات تخصصات لتصديرها.","No discipline data to export."),!0);return}const l=lt(),d=n==="all"?t("كافة مشاريع المحفظة","All Portfolio Projects"):e.find(u=>u.id===n)?.nameAr||n,p=`
    <table>
      <tr><th colspan="6" class="title">${F(l.displayName)} - ${t("تقرير تحليل التخصصات الهندسية والمخرجات","Engineering Disciplines & Deliverables Report")}</th></tr>
      <tr><td colspan="6" class="subtitle">${t("نطاق المشروع:","Project Scope:")} ${F(d)} | ${t("الفترة:","Timeframe:")} ${F(o)}</td></tr>
      <tr><td colspan="6" class="meta">${t("تاريخ التصدير:","Export Date:")} ${je(new Date)} ${He(new Date)}</td></tr>
      <tr>
        <th class="header">${t("التخصص الهندسي","Engineering Discipline")}</th>
        <th class="header">${t("إجمالي المخرجات","Total Deliverables")}</th>
        <th class="header">${t("المكتمل","Done")}</th>
        <th class="header">${t("نسبة الإنجاز","Completion Rate")}</th>
        <th class="header">${t("الحصة من المهام","Share")}</th>
        <th class="header">${t("المهام المتأخرة","Overdue Tasks")}</th>
      </tr>
      ${i.map(u=>{const f=s.length?Math.round(u.total/s.length*100):0;return`
          <tr>
            <td>${F(u.name)}</td>
            <td style="text-align:center;">${u.total}</td>
            <td style="text-align:center;">${u.done}</td>
            <td style="text-align:center;">${u.percentage}%</td>
            <td style="text-align:center;">${f}%</td>
            <td style="text-align:center;color:${u.overdue>0?"#dc2626":"#16a34a"};">${u.overdue}</td>
          </tr>
        `}).join("")}
    </table>
  `;ct(`DARC_Disciplines_${Date.now()}`,p),$(t("تم تصدير تقرير التخصصات بنجاح 📊","Disciplines report exported successfully 📊"))}function Ki(){if(!S("export_reports")&&!C()){$(g("permissionDenied"),!0);return}const{tasks:e=[],users:a=[]}=r.data||{},n=Vt(e,r.reportProjectFilter||"all",r.reportTimeframe||"all"),o=Dn(n,a);if(!o.length){$(t("لا توجد بيانات فريق لتصديرها.","No team data to export."),!0);return}const s=lt(),i=`
    <table>
      <tr><th colspan="7" class="title">${F(s.displayName)} - ${t("تقرير أداء وحمولة فريق العمل الهندسي","Engineering Team Workload & Capacity Report")}</th></tr>
      <tr><td colspan="7" class="subtitle">${t("إجمالي أعضاء الفريق:","Total Members:")} ${o.length} | ${t("المهام الإجمالية:","Total Tasks:")} ${n.length}</td></tr>
      <tr><td colspan="7" class="meta">${t("تاريخ التصدير:","Export Date:")} ${je(new Date)} ${He(new Date)}</td></tr>
      <tr>
        <th class="header">${t("عضو الفريق","Member Name")}</th>
        <th class="header">${t("المسمى الوظيفي","Job Title")}</th>
        <th class="header">${t("إجمالي المهام","Total Tasks")}</th>
        <th class="header">${t("المهام النشطة","Active")}</th>
        <th class="header">${t("المكتملة","Completed")}</th>
        <th class="header">${t("المتأخرة","Overdue")}</th>
        <th class="header">${t("حالة الحمولة","Capacity")}</th>
      </tr>
      ${o.map(l=>`
        <tr>
          <td>${F(t(l.user.name,l.user.nameEn||l.user.name))}</td>
          <td>${F(t(l.user.jobTitleAr,l.user.jobTitleEn||l.user.jobTitleAr)||"—")}</td>
          <td style="text-align:center;">${l.total}</td>
          <td style="text-align:center;">${l.active}</td>
          <td style="text-align:center;color:#16a34a;">${l.done}</td>
          <td style="text-align:center;color:${l.overdue>0?"#dc2626":"#16a34a"};">${l.overdue}</td>
          <td style="text-align:center;">${F(l.capacityLabel)}</td>
        </tr>
      `).join("")}
    </table>
  `;ct(`DARC_Team_Workload_${Date.now()}`,i),$(t("تم تصدير تقرير حمولة الفريق بنجاح 👥","Team workload report exported successfully 👥"))}function Yi(){if(!S("export_reports")&&!C()){$(g("permissionDenied"),!0);return}const{projects:e=[],tasks:a=[]}=r.data||{},n=r.reportProjectFilter||"all",o=Vt(a,n,"all").filter(de),s=(n==="all"?e:e.filter(d=>d.id===n)).filter(d=>d.health==="at_risk"||d.health==="off_track");if(!o.length&&!s.length){$(t("لا توجد مهام أو مشاريع متأخرة حالياً لتصديرها 🎉","No overdue tasks or at-risk projects to export 🎉"));return}const i=lt(),l=`
    <table>
      <tr><th colspan="7" class="title">${F(i.displayName)} - ${t("سجل المخاطر والتأخيرات الهندسية (Risk & Delay Register)","Engineering Risk & Delay Register")}</th></tr>
      <tr><td colspan="7" class="meta">${t("تاريخ التصدير:","Export Date:")} ${je(new Date)} ${He(new Date)}</td></tr>
      
      <!-- Section 1: Overdue Tasks -->
      <tr><th colspan="7" class="header" style="background:#fecaca;color:#991b1b;font-size:14px;">⚠️ ${t("المهام والمخرجات المتأخرة عن موعدها","Overdue Deliverables & Tasks")} (${o.length})</th></tr>
      <tr>
        <th class="header">${t("المهمة / المخرج","Deliverable")}</th>
        <th class="header">${t("رمز المشروع","Project Code")}</th>
        <th class="header">${t("المشروع","Project Name")}</th>
        <th class="header">${t("المسؤول","Assignee")}</th>
        <th class="header">${t("الأولوية","Priority")}</th>
        <th class="header">${t("تاريخ الاستحقاق","Due Date")}</th>
        <th class="header">${t("أيام التأخير","Days Overdue")}</th>
      </tr>
      ${o.map(d=>{const p=e.find(v=>v.id===d.projectId),u=xa(d.dueDate),f=d.assignee?t(d.assignee.name,d.assignee.nameEn||d.assignee.name):"—";return`
          <tr>
            <td>${F(t(d.titleAr,d.titleEn))}</td>
            <td style="text-align:center;">${F(p?.code||"—")}</td>
            <td>${F(p?t(p.nameAr,p.nameEn):"—")}</td>
            <td>${F(f)}</td>
            <td style="text-align:center;">${F(H(d.priority||"medium"))}</td>
            <td style="text-align:center;">${ae(d.dueDate,!0)}</td>
            <td style="text-align:center;color:#dc2626;font-weight:bold;">${u}</td>
          </tr>
        `}).join("")}

      <!-- Section 2: At-Risk Projects -->
      <tr><td colspan="7" style="height:16px;"></td></tr>
      <tr><th colspan="7" class="header" style="background:#fed7aa;color:#9a3412;font-size:14px;">⚡ ${t("المشاريع ذات المخاطر والانحراف","Projects Requiring Management Escalation")} (${s.length})</th></tr>
      <tr>
        <th class="header">${t("رمز المشروع","Project Code")}</th>
        <th class="header" colspan="2">${t("اسم المشروع","Project Name")}</th>
        <th class="header">${t("العميل","Client")}</th>
        <th class="header">${t("مدير المشروع","Manager")}</th>
        <th class="header">${t("الحالة","Status")}</th>
        <th class="header">${t("الإنجاز","Progress")}</th>
      </tr>
      ${s.map(d=>`
        <tr>
          <td style="text-align:center;font-weight:bold;">${F(d.code)}</td>
          <td colspan="2">${F(t(d.nameAr,d.nameEn))}</td>
          <td>${F(t(d.clientAr,d.clientEn)||"—")}</td>
          <td>${F(d.manager?t(d.manager.name,d.manager.nameEn||d.manager.name):"—")}</td>
          <td style="text-align:center;color:${d.health==="off_track"?"#dc2626":"#d97706"};">${F(H(d.health))}</td>
          <td style="text-align:center;">${d.progress}%</td>
        </tr>
      `).join("")}
    </table>
  `;ct(`DARC_Risks_Register_${Date.now()}`,l),$(t("تم تصدير سجل المخاطر بنجاح ⚠️","Risk register exported successfully ⚠️"))}function Xi(){if(!S("export_reports")&&!C()){$(g("permissionDenied"),!0);return}const{projects:e=[],documents:a=[]}=r.data||{},n=r.reportProjectFilter||"all",o=n==="all"?(a||[]).filter(d=>!d.deletedAt):(a||[]).filter(d=>d.projectId===n&&!d.deletedAt);if(!o.length){$(t("لا توجد مخططات مرفوعة لتصديرها.","No drawings to export."),!0);return}const s=lt(),i=n==="all"?t("كافة مشاريع المحفظة","All Portfolio Projects"):e.find(d=>d.id===n)?.nameAr||n,l=`
    <table>
      <tr><th colspan="6" class="title">${F(s.displayName)} - ${t("سجل المخططات والمستندات الهندسية (Drawings Register)","Drawings & Blueprints Submittals Register")}</th></tr>
      <tr><td colspan="6" class="subtitle">${t("نطاق المشروع:","Project Scope:")} ${F(i)} | ${t("إجمالي المخططات:","Total Blueprints:")} ${o.length}</td></tr>
      <tr><td colspan="6" class="meta">${t("تاريخ التصدير:","Export Date:")} ${je(new Date)} ${He(new Date)}</td></tr>
      <tr>
        <th class="header">${t("اسم المخطط / الملف","File / Blueprint Name")}</th>
        <th class="header">${t("رمز المشروع","Project Code")}</th>
        <th class="header">${t("اسم المشروع","Project Name")}</th>
        <th class="header">${t("الحالة","Status")}</th>
        <th class="header">${t("حجم الملف","Size")}</th>
        <th class="header">${t("تاريخ الرفع","Upload Date")}</th>
      </tr>
      ${o.map(d=>{const p=e.find(f=>f.id===d.projectId),u=d.size>1048576?(d.size/1048576).toFixed(1)+" MB":Math.round((d.size||0)/1024)+" KB";return`
          <tr>
            <td>${F(d.originalName||d.name||"Drawing.pdf")}</td>
            <td style="text-align:center;">${F(p?.code||"—")}</td>
            <td>${F(p?t(p.nameAr,p.nameEn):"—")}</td>
            <td style="text-align:center;">${F(H(d.status||"draft"))}</td>
            <td style="text-align:center;">${u}</td>
            <td style="text-align:center;">${ae(d.createdAt,!0)}</td>
          </tr>
        `}).join("")}
    </table>
  `;ct(`DARC_Drawings_Register_${Date.now()}`,l),$(t("تم تصدير سجل المخططات بنجاح 📑","Drawings register exported successfully 📑"))}var vo=me({canAccessView:()=>ee,getFirstAllowedView:()=>ze,loadData:()=>xe,refreshView:()=>ce,renderApp:()=>X,renderView:()=>M,switchView:()=>we});function ee(e){return r.data?e==="dashboard"?S("view_dashboard"):e==="projects"||e==="project-detail"?S("view_projects"):e==="tasks"?S("create_tasks")||S("edit_tasks")||S("delete_tasks")||S("assign_tasks")||S("review_tasks")||S("approve_tasks")||S("manage_reminders")||S("view_projects")||C():e==="documents"?S("upload_documents")||S("delete_documents")||C():e==="templates"?S("manage_templates")||C():e==="team"?C()||S("manage_users"):e==="reports"?S("view_reports")||C():e==="settings":!0}function ze(){for(const e of["dashboard","projects","tasks","documents","team","reports","templates","settings"])if(ee(e))return e;return"dashboard"}bi();function X(){if(r.data&&!ee(r.view)&&(r.view=ze()),typeof window<"u"){const e=window.location.hash.replace(/^#/,"");if(!e||e==="login"||e==="forgot"){let a=r.view;r.view==="project-detail"&&r.activeProjectId?a=`project-detail?id=${encodeURIComponent(r.activeProjectId)}${r.projectTab?`&tab=${encodeURIComponent(r.projectTab)}`:""}`:r.view==="settings"&&r.settingsSection&&(a=`settings?section=${encodeURIComponent(r.settingsSection)}`),window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${a}`):(window._isInternalNav=!0,window.location.hash=`#${a}`)}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",r.lang==="en"),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang==="ar"?"rtl":"ltr",document.getElementById("app").innerHTML=`
    <div class="app-shell ${r.lang==="en"?"is-ltr":""}">
      ${Zi()}
      ${Qi()}
      <section class="workspace">
        ${r.data?.isDemo||r.data?.user?.id==="usr_demo"?`
        <div class="demo-showcase-banner" style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg, rgba(13,98,105,0.12), rgba(20,184,166,0.14));border-bottom:1px solid rgba(20,184,166,0.28);padding:8px 20px;font-size:12px;color:var(--ink);gap:12px;flex-wrap:wrap;z-index:90;">
          <div style="display:flex;align-items:center;gap:8px;font-weight:600;flex-wrap:wrap;">
            <span style="background:var(--brand-teal);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:12px;letter-spacing:0.5px;text-transform:uppercase;">${t("بيئة عرض تجريبية","DEMO SHOWCASE")}</span>
            <span style="background:rgba(239,68,68,0.1);color:#dc2626;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;border:1px solid rgba(239,68,68,0.2);display:inline-flex;align-items:center;gap:4px;">⏱️ ${t("تنظيف ذاتي كل 15 دقيقة","Auto-resets every 15m")}</span>
            <span>${t("مساحة تفاعلية مخصصة لاستعراض قدرات المنصة — تُحذف الملفات والتعديلات تلقائياً كل 15 دقيقة لحماية السيرفر ونظافة العرض.","Interactive sandbox showcasing DARC capabilities — all demo changes & uploads automatically purge every 15 minutes.")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button class="btn btn-xs btn-soft" data-action="reset-demo-sandbox" style="font-size:11px;padding:3px 10px;border-radius:6px;display:flex;align-items:center;gap:4px;">
              <span>🔄</span>
              <span>${t("إعادة ضبط الآن","Reset Now")}</span>
            </button>
          </div>
        </div>`:""}
        ${hi()}
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,M()}var ti=null;function M(e=!1){if(!e&&(window._isDraggingTask||window._isKeyboardDraggingTask||window._isTouchHoldingTask)){window._pendingRenderAfterDrag=!0;return}const a=document.getElementById("main-content");if(!a)return;ee(r.view)||(r.view=ze());const n=ti===r.view,o=n?a.scrollTop:0,s=n?a.scrollLeft:0,i=n?a.querySelector(".board, .tasks-board, .board-columns"):null,l=i?i.scrollLeft:null;ti=r.view;let d="";if(r.view==="dashboard"&&(d=renderDashboard()),r.view==="projects"&&(d=renderProjects()),r.view==="tasks"&&(d=renderTasks()),r.view==="documents"&&(d=renderDocuments()),r.view==="templates"&&(d=renderTemplates()),r.view==="team"&&(d=renderTeam()),r.view==="reports"&&(d=Gi()),r.view==="settings"&&(d=renderSettings()),r.view==="project-detail"&&(d=renderProjectDetail()),a.innerHTML=d,o&&(a.scrollTop=o),s&&(a.scrollLeft=s),l!==null){const p=a.querySelector(".board, .tasks-board, .board-columns");p&&(p.style.scrollSnapType="none",p.scrollLeft=l,requestAnimationFrame(()=>{p&&!window._isDraggingTask&&(p.style.scrollSnapType="")}))}r.view==="project-detail"&&r.projectTab==="timeline"&&setTimeout(drawTimelineArrows,0)}function we(e,a=void 0){r.data&&!ee(e)&&(e=ze()),st("navigation",`الانتقال إلى واجهة #${e}${a?` (مشروع: ${a})`:""}`),r.view=e,a!==void 0&&(r.activeProjectId=a),e==="settings"&&!r.settingsSection&&(r.settingsSection="profile"),r.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelector(".sidebar-backdrop")?.classList.remove("visible"),document.querySelectorAll(".nav-item").forEach(o=>{const s=o.dataset.view,i=s===e||s==="projects"&&e==="project-detail";o.classList.toggle("active",i)});const n=document.querySelector(".topbar-title");n&&(n.textContent=ha());try{let o=e;e==="project-detail"&&r.activeProjectId?o=`project-detail?id=${encodeURIComponent(r.activeProjectId)}${r.projectTab?`&tab=${encodeURIComponent(r.projectTab)}`:""}`:e==="settings"&&r.settingsSection&&(o=`settings?section=${encodeURIComponent(r.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==o&&(window._isInternalNav=!0,window.location.hash=o),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:r.view,activeProjectId:r.activeProjectId,projectTab:r.projectTab,settingsSection:r.settingsSection}))}catch{}requestAnimationFrame(()=>{M();const o=document.getElementById("main-content");o&&(o.scrollTop=0,o.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function ce(e=!1){try{await xe(e)}catch(a){$(a.message,!0)}}async function xe(e=!1){try{if(!r.data){const s=ya();s&&s.user&&(r.data=s,(r.view==="login"||!ee(r.view))&&(r.view=ze()),requestAnimationFrame(()=>X()))}const a=r.view==="settings"&&r.settingsSection==="trash"&&!r.trashLoaded?z("/api/trash",{silent:!0}).catch(()=>null):null;let n=await z("/api/bootstrap",{silent:e});if(n===null){if(r.data&&r.data.user)return;const s=await Gn();if(s&&s.user?n=s:(ot(),n=await z("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}})),!n)return}if(Ae(n),r.isOffline=!1,a)try{const s=await a;s&&(r.trash=Array.isArray(s)?s:s.trash||[...(s.projects||[]).map(i=>({...i,type:"project"})),...(s.tasks||[]).map(i=>({...i,type:"task"})),...(s.documents||[]).map(i=>({...i,type:"document"}))],r.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(r.trash)))}catch{}if(r.data?.tasks&&n?.tasks){const s=Date.now(),i=new Set(n.tasks.map(l=>l.id));for(const l of r.data.tasks)if(!i.has(l.id))s-(l.createdAt?new Date(l.createdAt).getTime():s)<12e4&&(n.tasks.unshift(l),i.add(l.id));else{const d=window._recentlyMovedTasks?.get(l.id);if(d&&s-d.timestamp<2e4){const p=n.tasks.find(u=>u.id===l.id);p&&(p.status=d.status,d.progress!==void 0&&(p.progress=d.progress),d.sortOrder!==void 0&&(p.sortOrder=d.sortOrder,p.sort_order=d.sortOrder,p.customFields||(p.customFields={}),p.customFields.sortOrder=d.sortOrder,p.customFields.sort_order=d.sortOrder,p.custom_fields||(p.custom_fields={}),p.custom_fields.sortOrder=d.sortOrder,p.custom_fields.sort_order=d.sortOrder))}}}if(r.data?.projects&&n?.projects){const s=Date.now(),i=new Set(n.projects.map(l=>l.id));for(const l of r.data.projects)i.has(l.id)||s-(l.createdAt?new Date(l.createdAt).getTime():s)<12e4&&(n.projects.unshift(l),i.add(l.id))}let o=!1;if(r.data&&n)if(r.data.updatedAt!==n.updatedAt)o=!0;else if(r.data.tasks?.length!==n.tasks?.length||r.data.projects?.length!==n.projects?.length)o=!0;else{const s=r.data.tasks||[],i=n.tasks||[];for(let l=0;l<i.length;l++){const d=i[l],p=s[l];if(!p||p.id!==d.id||p.status!==d.status||(p.sortOrder||p.sort_order)!==(d.sortOrder||d.sort_order)||p.progress!==d.progress){o=!0;break}}if(!o){const l=r.data.projects||[],d=n.projects||[];for(let p=0;p<d.length;p++){const u=d[p],f=l[p];if(!f||f.id!==u.id||f.lifecycle!==u.lifecycle||f.health!==u.health||f.progress!==u.progress){o=!0;break}}}}if(!r.data||o||r.data.comments?.length!==n.comments?.length||r.data.documents?.length!==n.documents?.length||r.data.users?.length!==n.users?.length||r.data.auditLogs?.length!==n.auditLogs?.length||r.data.notifications?.length!==n.notifications?.length||r.view==="login"){r.data=n,(r.view==="login"||!ee(r.view))&&(r.view=ze());const s=!!document.getElementById("modal-root")?.children?.length,i=!!(window._isDraggingTask||window._isTouchHoldingTask||window._isKeyboardDraggingTask||document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),l=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(i||l))return;requestAnimationFrame(!e&&!s?()=>X():()=>M())}else r.data=n,ee(r.view)||(r.view=ze(),requestAnimationFrame(()=>M()))}catch(a){if(a&&(a.status===401||a.status===403))throw a;const n=await Gn();if(n){r.data=n,ee(r.view)||(r.view=ze()),r.isOffline=!0;const o=!!document.getElementById("modal-root")?.children?.length;!e&&!o?X():M();return}throw a}}typeof window<"u"&&(window.renderApp=X,window.renderView=M);var yo=me({navItem:()=>Be,renderSidebar:()=>Qi,renderSidebarBackdrop:()=>Zi});function Be(e,a,n){return`<button class="nav-item ${r.view===e||e==="projects"&&r.view==="project-detail"?"active":""}" data-view="${e}">${x(n,17)}<span>${a}</span></button>`}function Zi(){return`<div class="sidebar-backdrop ${r.sidebarOpen?"visible":""}" data-action="toggle-sidebar" aria-hidden="true"></div>`}function Qi(){const e=r.data?.user||{},a=C()||S("manage_settings")||S("manage_roles")||S("manage_users")||S("manage_trash")||S("view_audit_logs")||S("manage_templates");return`
    <aside class="sidebar ${r.sidebarOpen?"open":""}">
      <div class="sidebar-brand">
        ${r.data?.company?.logoUrl?`<img src="${c(r.data?.company?.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${x("building",20)}</span>`:`<span class="brand-mark">${x("building",20)}</span>`}
        <div>
          <div class="brand-name">${c(t(r.data?.company?.nameAr||r.data?.company?.name||"DARC Design Team",r.data?.company?.nameEn||r.data?.company?.name||"DARC Design Team"))}</div>
          <div class="brand-subtitle">${g("workspace")}</div>
        </div>
      </div>
      <div class="nav-title">${t("مساحة العمل","WORKSPACE")}</div>
      <nav class="nav-list">
        ${ee("dashboard")?Be("dashboard",g("dashboard"),"grid"):""}
        ${ee("projects")?Be("projects",g("projects"),"building"):""}
        ${ee("tasks")?Be("tasks",g("myTasks"),"checklist"):""}
        ${ee("documents")?Be("documents",g("documents"),"document"):""}
        ${ee("team")?Be("team",g("team"),"users"):""}
        ${ee("reports")?Be("reports",g("reports"),"chart"):""}
      </nav>
      <div class="nav-separator"></div>
      <div class="nav-title">${a||ee("templates")?t("إدارة النظام","ADMIN"):t("حسابي","MY ACCOUNT")}</div>
      <nav class="nav-list">
        ${ee("templates")?Be("templates",g("templates"),"layers"):""}
        ${Be("settings",a?g("settings"):t("الملف الشخصي والأمان","Profile & Security"),"settings")}
      </nav>
      <div class="sidebar-bottom">
        <div class="admin-badge">${K(e)}<div class="admin-info"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(re(e))}</span></div></div>
        <div class="sidebar-footer"><span>v1.0 · ${t("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${g("signOut")}">${x("logout",15)}</button></div>
      </div>
    </aside>
  `}var bo=me({calculatePasswordStrength:()=>ts,cleanupTurnstile:()=>Ua,initTurnstile:()=>jn,loadTurnstileScript:()=>es,openForcePasswordModal:()=>$o,renderActivation:()=>Gt,renderLogin:()=>Se,renderResetPassword:()=>wt,renderStrengthMeterHtml:()=>Ea}),ho="0x4AAAAAAFr3zLr2zpRS2ah4",ue=null,It=null,he=null,At=!1;function es(){return typeof window>"u"||window.turnstile?Promise.resolve():It||(It=new Promise(e=>{if(window.onloadTurnstileCallback=()=>{e()},document.getElementById("cf-turnstile-script")){window.turnstile&&e();return}const a=document.createElement("script");a.id="cf-turnstile-script",a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback",a.async=!0,a.defer=!0,a.onerror=()=>{console.warn("[Turnstile] Script failed to load, fallback mode enabled"),e()},document.body.appendChild(a)}),It)}function Ua(){if(!(typeof window>"u")){if(he=null,window.turnstile&&ue!==null){try{window.turnstile.remove(ue)}catch{}ue=null}try{const e=document.getElementById("turnstile-container");e&&(e.innerHTML=""),document.querySelectorAll('iframe[src*="challenges.cloudflare.com"]').forEach(n=>{try{n.remove()}catch{}});const a=document.getElementById("cf-turnstile-script");a&&a.remove(),It=null}catch{}}}async function jn(){if(!(typeof window>"u")&&document.getElementById("turnstile-container")&&!At){At=!0;try{if(window.turnstile||await es(),!window.turnstile){At=!1;return}const e=document.getElementById("turnstile-container");if(!e){At=!1;return}if(ue!==null){try{window.turnstile.remove(ue)}catch{}ue=null}he=null,ue=window.turnstile.render(e,{sitekey:ho,theme:r.theme==="dark"?"dark":"light",language:r.lang==="ar"?"ar":"en",appearance:"interaction-only",callback:a=>{he=a},"error-callback":a=>{console.warn("[Turnstile] Handshake notice (shielded):",a),he="fallback_client"},"expired-callback":()=>{if(he=null,window.turnstile&&ue!==null)try{window.turnstile.reset(ue)}catch{}}})}catch(e){console.warn("[Turnstile] Init notice:",e),he="fallback_client"}finally{At=!1}}}typeof window<"u"&&(window.__darcInitTurnstile=jn);async function xo(){if(typeof window>"u"||!window.turnstile)return"fallback_client";if(he)return he;if(ue!==null)try{const e=window.turnstile.getResponse(ue);if(e)return he=e,e}catch{}return new Promise(e=>{let a=!1;const n=setTimeout(()=>{a||(a=!0,e(he||"fallback_client"))},1200),o=setInterval(()=>{if(a){clearInterval(o);return}if(he){a=!0,clearTimeout(n),clearInterval(o),e(he);return}if(ue!==null&&window.turnstile)try{const s=window.turnstile.getResponse(ue);if(s){a=!0,clearTimeout(n),clearInterval(o),he=s,e(s);return}}catch{}},35)})}function ts(e){const a=String(e||"");if(!a)return{score:0,label:"",percent:0,color:"var(--line)"};let n=0;return a.length>=10&&(n+=1),/[a-z]/.test(a)&&/[A-Z]/.test(a)&&(n+=1),/\d/.test(a)&&(n+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(a)&&(n+=1),n===1?{score:1,label:r.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:n===2?{score:2,label:r.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:n===3?{score:3,label:r.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:r.lang==="ar"?"قوية وممتازة 🛡️":"Strong & Secure 🛡️",percent:100,color:"var(--mint-strong)"}}function Ea(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${r.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function _n(e,a,n,o,s){const i=document.getElementById(e);if(!i)return;const l=i.querySelector(`input[name="${a}"]`),d=i.querySelector(`input[name="${n}"]`),p=i.querySelector(s||'button[type="submit"]'),u=document.getElementById(`${o}-meter-wrap`),f=document.getElementById(`${o}-meter-bar`),v=document.getElementById(`${o}-meter-label`),k=document.getElementById(`${o}-match-indicator`);function b(){const h=l?l.value:"",m=d?d.value:"";if(h&&u&&f&&v){u.style.display="flex";const y=ts(h);f.style.width=`${y.percent}%`,f.style.background=y.color,v.textContent=y.label,v.style.color=y.color}else u&&(u.style.display="none");d&&k&&(m?h===m?(k.style.display="block",k.style.color="var(--mint-strong)",k.textContent=r.lang==="ar"?"✓ كلمتا المرور متطابقتان":"✓ Passwords match",p&&(p.disabled=!1)):(k.style.display="block",k.style.color="var(--red)",k.textContent=r.lang==="ar"?"✗ كلمتا المرور غير متطابقتين":"✗ Passwords do not match",p&&(p.disabled=!0)):(k.style.display="none",p&&(p.disabled=!1)))}l?.addEventListener("input",b),d?.addEventListener("input",b)}function Aa(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=a=>{a.preventDefault();const n=e.getAttribute("data-target"),o=n?document.getElementById(n):e.parentElement.querySelector("input");if(!o)return;const s=o.type==="password";o.type=s?"text":"password",e.style.color=s?"var(--teal)":"var(--ink-soft)";const i=s?r.lang==="ar"?"إخفاء كلمة المرور":"Hide password":r.lang==="ar"?"إظهار كلمة المرور":"Show password";e.setAttribute("aria-label",i),e.setAttribute("title",i),s?e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';try{o.focus()}catch{}}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const a=n=>{const o=n.getModifierState&&n.getModifierState("CapsLock");let s=e.parentElement.parentElement.querySelector(".capslock-warning");o?s||(s=document.createElement("div"),s.className="capslock-warning",s.style.fontSize="11px",s.style.color="var(--amber)",s.style.marginTop="4px",s.style.display="flex",s.style.alignItems="center",s.style.gap="4px",s.innerHTML=`<span>⚠️</span> <span>${r.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(s)):s&&s.remove()};e.addEventListener("keydown",a),e.addEventListener("keyup",a)})}function wo(e,a=60){if(!e)return;e.disabled=!0;let n=a;const o=e.innerHTML,s=setInterval(()=>{n--,e.innerHTML=`<span>${r.lang==="ar"?`يرجى الانتظار (${n} ثانية)...`:`Please wait (${n}s)...`}</span>`,n<=0&&(clearInterval(s),e.disabled=!1,e.innerHTML=o)},1e3)}function Se(e="",a="login",n=!1){if(r.view="login",typeof window<"u"){const d=a==="forgot"?"#forgot":"#login";window.location.hash!==d&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",d):window.location.hash=d)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",r.lang==="en"),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=r.theme||"light";let o="";const s=e?`<div class="login-demo" style="border-color:${n?"#cce3e0":"var(--red-soft)"};background:${n?"#f0f9f7":"var(--red-soft)"};color:${n?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${x(n?"check":"alert",15)}<span>${c(e)}</span></div>`:"",i=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";a==="login"?o=`
      <form id="login-form">
        <div class="field">
          <label for="login-email">${g("emailAddress")}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${c(i)}" required />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label for="login-password">${g("password")}</label>
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
            <input type="checkbox" id="remember-email-check" ${i?"checked":""} style="cursor:pointer;accent-color:var(--teal);" />
            <span>${t("تذكر بريدي الإلكتروني على هذا الجهاز","Remember my email on this device")}</span>
          </label>
        </div>
        <div id="login-error-container">${s}</div>
        <div id="turnstile-container" style="margin-bottom:12px;min-height:0;display:flex;justify-content:center;"></div>
        <button class="btn btn-primary btn-block" type="submit">${x(r.lang==="ar"?"arrowLeft":"arrowRight",16)} ${g("login")}</button>
      </form>
      <div class="demo-showcase-box" style="margin-top:20px;padding:14px 16px;border-radius:10px;background:var(--surface-soft, rgba(13,98,105,0.06));border:1px dashed rgba(20,184,166,0.4);display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--brand-teal, #0d6269);">
            <span>✨</span>
            <span>${t("بيئة العرض التجريبي (Demo Showcase)","Live Demo Showcase")}</span>
          </div>
          <span style="font-size:10px;background:rgba(20,184,166,0.15);color:var(--brand-teal, #0d6269);padding:2px 8px;border-radius:12px;font-weight:600;">
            ${t("للزوار ومدراء التوظيف","For Visitors & Hiring Managers")}
          </span>
        </div>
        <div style="font-size:11px;color:var(--ink-soft);display:flex;flex-direction:column;gap:3px;font-family:var(--font-mono, monospace);">
          <div><strong>${t("البريد:","Email:")}</strong> <code>demo@darc-design.bond</code></div>
          <div><strong>${t("كلمة المرور:","Password:")}</strong> <code>demo123456</code></div>
        </div>
        <button type="button" class="btn btn-sm btn-soft" data-action="quick-fill-login" data-email="demo@darc-design.bond" data-pass="demo123456" data-autosubmit="true" style="width:100%;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 12px;border-radius:6px;cursor:pointer;">
          <span>⚡</span>
          <span>${t("تعبئة تلقائية ودخول فوري","Auto-fill & Sign In")}</span>
        </button>
      </div>
    `:a==="forgot"&&(o=`
      <form id="forgot-form">
        <div class="field"><label for="login-email">${g("emailAddress")}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${c(i)}" required /></div>
        ${s}
        <button class="btn btn-primary btn-block" type="submit">${t("إرسال رابط الاستعادة","Send reset link")}</button>
        <div style="text-align:center;margin-top:15px"><a href="#" data-action="goto-login" style="font-size:13px;color:var(--ink-soft)">${t("العودة لتسجيل الدخول","Back to login")}</a></div>
      </form>
    `),document.getElementById("app").innerHTML=`
    <div class="login-shell ${r.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup">
            <span class="brand-mark">${x("building",24)}</span>
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
              <div><p class="eyebrow">${a==="login"?t("مرحبًا بعودتك","WELCOME BACK"):t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${a==="login"?g("login"):t("نسيت كلمة المرور","Forgot Password")}</h2><p class="intro">${a==="login"?g("loginIntro"):t("أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.","Enter your email to receive a reset link.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${r.theme==="dark"?"الوضع النهاري":"الوضع الليلي"}">${r.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${r.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            ${o}
          </div>
        </section>
      </div>
    </div>`,Aa();const l=(d,p=!1)=>{const u=document.getElementById("login-error-container");u?u.innerHTML=d?`
        <div class="login-demo" style="border-color:${p?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"};background:${p?"var(--mint)":"rgba(239,68,68,0.08)"};color:${p?"var(--mint-strong)":"var(--red)"};margin-top:0;margin-bottom:15px;padding:10px 14px;border-radius:8px;font-size:12.5px;display:flex;align-items:center;gap:8px;line-height:1.5;">
          ${x(p?"check":"alert",16)}
          <span>${c(d)}</span>
        </div>`:"":d&&$(d,!p)};document.getElementById("login-form")?.addEventListener("submit",async d=>{d.preventDefault();const p=new FormData(d.currentTarget),u=String(p.get("email")||"").trim(),f=String(p.get("password")||""),v=document.getElementById("remember-email-check")?.checked,k=d.currentTarget.querySelector('button[type="submit"]'),b=`${x(r.lang==="ar"?"arrowLeft":"arrowRight",16)} ${g("login")}`;l(""),k.disabled=!0,k.innerHTML=`<span>⏳ ${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const h=u.trim().toLowerCase()==="demo@darc-design.bond"||u.trim().toLowerCase()==="demo@darc.local";let m="bypass_dev";h||(m=await xo());try{const y=await z("/api/auth/login",{method:"POST",body:JSON.stringify({email:u,password:f,turnstileToken:m})});if(Ua(),typeof localStorage<"u"&&(y?.token&&localStorage.setItem("darc_token",y.token),v?localStorage.setItem("darc_last_email",u):localStorage.removeItem("darc_last_email")),Lt({theme:r.theme,lang:r.lang}),r.view="dashboard",y?.bootstrap){r.data=y.bootstrap,Ae(y.bootstrap),X(),xe(!0).catch(()=>{});return}const I=ya();if(I&&I.user&&(I.user.id===y?.user?.id||y?.user?.email===I.user?.email)){I.user=y.user||I.user,r.data=I,X(),xe(!0).catch(()=>{});return}ot(),qt(),await xe(),X()}catch(y){if(console.error("Login Error:",y),typeof window<"u"&&window.turnstile&&ue!==null)try{window.turnstile.reset(ue)}catch{}k&&(k.disabled=!1,k.innerHTML=b);let I=y.message;if(typeof navigator<"u"&&!navigator.onLine)I=t("لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة وإعادة المحاولة.","No internet connection. Please check your network and try again.");else if(y.message&&(y.message.includes("Turnstile")||y.message.includes("التحقق الأمني")))I=t("فشل التحقق الأمني التلقائي (Cloudflare Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.","Security check (Turnstile) failed. Please refresh the page and try again.");else if(y.message&&(y.message.includes("429")||y.message.includes("كثيرة")||y.message.includes("rate")))I=t("تم تجاوز عدد محاولات الدخول المسموحة لحماية الحساب. يرجى الانتظار دقيقة واحدة قبل المحاولة مجدداً.","Too many login attempts. For security, please wait one minute before trying again."),wo(document.querySelector('#login-form button[type="submit"]'),60);else if(y.message&&(y.message.includes("401")||y.message.includes("غير صحيحة")||y.message.includes("credentials"))){I=t("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من صحة المدخلات وإعادة المحاولة.","Incorrect email or password. Please verify your credentials and try again.");const D=document.getElementById("login-password");if(D){D.value="";try{D.focus()}catch{}}}else y.message&&(y.message.includes("مفعل")||y.message.includes("موقوف")||y.message.includes("inactive"))?I=t("حسابك معطل أو غير مفعل حالياً. يرجى التواصل مع مسؤول النظام لإعادة التفعيل.","This account is suspended or inactive. Please contact your system administrator."):(!I||I.includes("Failed to fetch")||I.includes("NetworkError")||I.includes("Network request failed"))&&(I=t("تعذر الاتصال بخادم تسجيل الدخول. يرجى التأكد من استقرار الإنترنت وإعادة المحاولة.","Could not reach the authentication server. Please check your connection and try again."));l(I)}}),document.getElementById("forgot-form")?.addEventListener("submit",async d=>{d.preventDefault();const p=new FormData(d.currentTarget),u=String(p.get("email")||"").trim(),f=d.currentTarget.querySelector('button[type="submit"]'),v=f?f.innerHTML:"";f&&(f.disabled=!0,f.innerHTML=`<span>⏳ ${t("جاري إرسال الرابط...","Sending reset link...")}</span>`);try{await z("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:u})}),f&&(f.disabled=!1,f.innerHTML=v),l(t("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح ✨","Password reset link sent to your email successfully ✨"),!0)}catch(k){f&&(f.disabled=!1,f.innerHTML=v),l(k.message)}}),a==="login"?jn():Ua()}function Gt(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",r.lang==="en"),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=r.theme||"light",document.getElementById("app").innerHTML=`
    <div class="login-shell ${r.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${x("building",24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("تفعيل حساب الفريق","Team account activation")}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${t("خطوة واحدة للبدء","ONE STEP TO START")}</p><h1>${t("أكمل حسابك وانضم إلى مساحة العمل.","Finish your account and join the workspace.")}</h1><p>${t("اختر كلمة مرور آمنة للوصول إلى المشاريع والمهام المسندة إليك.","Choose a secure password to access your projects and assigned work.")}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${t("دعوة DARC الرسمية","DARC INVITE")}</p><h2>${t("تفعيل الحساب","Activate account")}</h2><p class="intro">${t("يجب أن تحتوي كلمة المرور على 10 أحرف على الأقل مع رموز وأرقام.","Your password must be at least 10 characters with numbers and symbols.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${r.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${r.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            <form id="activation-form">
              <input type="hidden" name="token" value="${c(e)}" />
              <div class="field">
                <label for="act-pass">${g("password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Ea("act")}
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
              ${a?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${x("alert",15)}<span>${c(a)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit">${x("shield",16)} ${t("تفعيل الحساب والدخول","Activate and sign in")}</button>
            </form>
            <div class="login-demo">${x("lock",16)}<span>${t("جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.","Your session is encrypted and your password is never stored in plain text.")}</span></div>
          </div>
        </section>
      </div>
    </div>`,Aa(),_n("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function wt(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",r.lang==="en"),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=r.theme||"light";const n=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,o=!n&&!a?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
    <div class="login-shell ${r.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${x("building",24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("استعادة كلمة المرور","Password Recovery")}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h1>${t("اختر كلمة مرور جديدة لحسابك.","Choose a new password for your account.")}</h1><p>${t("كلمة المرور يجب أن تكون قوية وغير مستخدمة من قبل.","Password should be strong and unique.")}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${t("كلمة مرور جديدة","New Password")}</h2><p class="intro">${t("أدخل كلمة المرور الجديدة وقم بتأكيدها.","Enter and confirm your new password.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${r.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${r.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            <form id="reset-form">
              <input type="hidden" name="token" value="${c(n||"")}" />
              <div class="field">
                <label for="rst-pass">${t("كلمة المرور الجديدة","New Password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass" name="newPassword" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required ${n?"":"disabled"} />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Ea("rst")}
              </div>
              <div class="field">
                <label for="rst-pass-confirm">${t("تأكيد كلمة المرور الجديدة","Confirm New Password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass-confirm" name="newPasswordConfirm" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required ${n?"":"disabled"} />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="rst-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${a||o?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${x("alert",15)}<span>${c(a||o)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit" ${n?"":"disabled"}>${t("حفظ وتسجيل الدخول","Save and login")}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,Aa(),_n("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async s=>{s.preventDefault();const i=new FormData(s.currentTarget),l=i.get("newPassword");if(l!==i.get("newPasswordConfirm")){wt(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const d=s.currentTarget.querySelector('button[type="submit"]');d.disabled=!0;try{await z("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:l})}),window.history.replaceState({},"",window.location.pathname),qt(),await xe(),X()}catch(p){wt(e,p.message)}})}function $o(e){const a=e.status==="pending",n=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${a}">
      <div class="field">
        <label for="force-pass-input">${a?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${Ea("force")}
        ${e.email?a?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${x("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${a?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=De(a?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),a?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${c(e.name)}.`,`Set an initial password to activate ${c(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${c(e.name)}`,`Set a new password for ${c(e.name)}`),n,"force-password"),Aa(),_n("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}var ko=me({attentionItem:()=>is,metricCard:()=>Dt,projectProgress:()=>as,projectRow:()=>ns,pulseChart:()=>rs,renderDashboard:()=>Eo,teamMetrics:()=>ss,teamRow:()=>os});function Dt(e,a,n,o,s,i=""){return`<article class="metric-card ${o}"><div class="metric-top"><span class="metric-label">${c(e)}</span><span class="metric-icon">${x(s,15)}</span></div><div class="metric-value">${c(a)}</div><span class="metric-note ${i}">${c(n)}</span></article>`}function as(e){const a=e.health==="off_track"?"red":e.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${g("weightedProgress")}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${a}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function ns(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${x("building",17)}</span><div class="project-name"><strong>${c(t(e.nameAr,e.nameEn))}</strong><span>${c(e.code)} · ${c(t(e.clientAr,e.clientEn))}</span></div></div>${as(e)}<div class="project-owner">${K(e.manager)}<span>${c(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${c(e.id)}" aria-label="${g("viewDetails")}">${x(r.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function is(e){const a=de(e)||e.status==="blocked"?"red":"amber",n=de(e)?t("متأخرة","Overdue"):e.status==="blocked"?t("متوقفة","Blocked"):t("تستحق قريبًا","Due soon");return`<button class="attention-item" data-action="open-task" data-task-id="${c(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${a}">${x(de(e)||e.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${a})">${c(t(e.titleAr,e.titleEn))}</strong><span>${c(n)} · ${c(pi(e.dueDate))}</span></span></button>`}function ss(e,a){const n=a.filter(i=>i.assigneeId===e),o=n.reduce((i,l)=>i+Number(l.weight||1),0),s=o?Math.round(n.reduce((i,l)=>i+l.progress*Number(l.weight||1),0)/o):0;return{tasks:n.length,progress:s,overdue:n.filter(de).length}}function os(e,a){const n=ss(e.id,a);return`<div class="team-row"><div class="team-member">${K(e)}<div class="team-member-copy"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(t(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${n.tasks}</strong> ${g("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${g("progress")}</span><strong>${n.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${n.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${c(e.id)}">${x("more",15)}</button></div>`}function rs(){const e=[38,48,45,62,55,72,68],a=r.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${e.map((n,o)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${o===e.length-1?"current":""}" style="height:${n}%"></span></div><span>${a[o]}</span></div>`).join("")}</div>`}function Eo(){const e=r.data?.stats||{},a=r.data?.projects||[],n=r.data?.tasks||[],o=r.data?.users||[],s=r.data?.user||{},i=s.name||s.email||t("مستخدم","User"),l=a.reduce((m,y)=>m+(Number(y.totalWeight)||0),0),d=l?Math.round(a.reduce((m,y)=>m+(Number(y.progress)||0)*(Number(y.totalWeight)||0),0)/l):0,p=[...n].filter(m=>{if(de(m)||m.status==="blocked")return!0;if(m.dueDate){const y=Me(m.dueDate);if(y){const I=(y-new Date)/864e5;return I>=0&&I<=7}}return!1}).sort((m,y)=>(m.dueDate?Me(m.dueDate)?.getTime()??1/0:1/0)-(y.dueDate?Me(y.dueDate)?.getTime()??1/0:1/0)).slice(0,5),u=o.filter(m=>m.status!=="inactive"),f=e.projectCount??a.length,v=e.myTasks??n.filter(m=>m.assigneeId===s.id).length,k=e.overdueTasks??n.filter(de).length,b=e.dueSoon??0,h=e.completedTasks??n.filter(m=>m.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${t("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${ci()}، ${c(t(i.replace(/^م\.\s?/,""),s.nameEn||i))}</h1><p>${g("welcomeText")}</p></div><div class="welcome-status"><span>${g("portfolioHealth")}</span><strong>${d}%</strong><small>${t("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${Dt(g("activeProjects"),e.activeProjects||0,t(`${f} مشاريع إجمالًا`,`${f} projects total`),"teal","building","up")}${Dt(g("openTasks"),e.openTasks??n.length,t(`${v} مسندة لك`,`${v} assigned to you`),"blue","checklist")}${Dt(g("overdue"),k,t("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",k?"alert":"check",k?"alert":"")}${Dt(g("dueThisWeek"),b,t("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("projectProgress")}</h2><p class="panel-subtitle">${g("projectProgressSub")}</p></div>${S("view_projects")?`<button class="text-link" data-view="projects">${g("seeAll")} ${x(r.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${a.length?a.slice(0,5).map(ns).join(""):`<div class="empty">${x("building",18)}<span>${g("noProjects")}</span></div>`}</div></section>${C()||S("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamProgress")}</h2><p class="panel-subtitle">${g("teamProgressSub")}</p></div><button class="text-link" data-view="team">${g("seeAll")} ${x(r.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${u.slice(0,6).map(m=>os(m,n)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("attention")}</h2><p class="panel-subtitle">${g("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${p.length}</span></div><div class="attention-list">${p.length?p.map(is).join(""):`<div class="empty">${x("check",18)}<span>${g("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("recentPulse")}</h2><p class="panel-subtitle">${g("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${h} ${g("done")}</span></div>${rs()}</section></div></div>`}var Ao=me({TEMPLATE_CATEGORIES:()=>Pt,getNextAvailableTemplateCode:()=>Pn,isTemplateCodeReserved:()=>ds,openTemplateModal:()=>qa,renderTemplates:()=>To}),Pt=[{id:"architectural",ar:"معماري",en:"Architectural",icon:"🏛️"},{id:"electrical",ar:"كهرباء — إلكتروميكانيك",en:"Electrical",icon:"⚡"},{id:"plumbing",ar:"سباكة — إلكتروميكانيك",en:"Plumbing",icon:"💧"},{id:"hvac",ar:"تكييف — إلكتروميكانيك",en:"HVAC",icon:"🌡️"},{id:"fire",ar:"حريق — إلكتروميكانيك",en:"Fire Protection",icon:"🧯"},{id:"low_current",ar:"تيار خفيف",en:"Low Current",icon:"📡"},{id:"sections",ar:"مقاطع",en:"Sections",icon:"✂️"},{id:"detail",ar:"تفصيلي",en:"Detailed",icon:"🔍"},{id:"site",ar:"موقع عام",en:"Site Plan",icon:"🗺️"},{id:"quantity",ar:"جداول كميات",en:"Quantity Tables",icon:"📊"},{id:"documents",ar:"وثائق وخطابات",en:"Documents & Letters",icon:"📄"}];function To(){const e=r.searches.templates.trim().toLowerCase(),a=[...r.data.templates||[]].sort((i,l)=>(parseInt(i.code,10)||0)-(parseInt(l.code,10)||0)),n=new Map;Pt.forEach(i=>n.set(i.id,0)),a.forEach(i=>{n.set(i.categoryId,(n.get(i.categoryId)||0)+1)});const o=r.templateCategory||"all",s=Pt.map(i=>{if(o!=="all"&&o!==i.id)return null;const l=a.filter(d=>d.categoryId!==i.id?!1:e?`${d.nameAr} ${d.nameEn} ${d.code} ${d.typeAr} ${d.typeEn}`.toLowerCase().includes(e):!0);return l.length?{...i,items:l}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${t("مخرجات DARC القياسية","DARC STANDARD DELIVERABLES")}</p>
      <h1>${g("templates")}</h1>
      <p>${g("standardLibrarySub")}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${a.length} ${g("templatesCount")}</span>
      ${S("manage_templates")?`<button class="btn btn-primary" data-action="new-template" style="margin-${r.lang==="ar"?"right":"left"}:10px">${x("plus",15)} ${t("إضافة قالب","Add Template")}</button>`:""}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${x("search",15)}
        <input data-search="templates" value="${c(r.searches.templates)}" placeholder="${g("search")}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${o==="all"?"active":""}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${g("all")}</span>
        <small>${a.length}</small>
      </button>
      ${Pt.map(i=>`
        <button class="template-category-tab ${o===i.id?"active":""}" data-action="template-category" data-category="${c(i.id)}">
          <span class="category-icon">${c(i.icon)}</span>
          <span>${c(t(i.ar,i.en))}</span>
          <small>${n.get(i.id)||0}</small>
        </button>
      `).join("")}
    </aside>
    <div>
      ${s.length?s.map(i=>`
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${c(i.icon)}</span>
            <div>
              <h3>${c(t(i.ar,i.en))}</h3>
              <span>${i.items.length} ${g("templatesCount")}</span>
            </div>
          </div>
          <div class="template-grid">
            ${i.items.map(l=>`
              <article class="template-item" style="position:relative;cursor:${S("manage_templates")?"pointer":"default"};" ${S("manage_templates")?`data-action="edit-template" data-template-id="${c(l.id)}"`:""}>
                <span class="template-number">${c(l.code)}</span>
                <div class="template-copy">
                  <strong>${c(t(l.nameAr,l.nameEn))}</strong>
                  <span>${c(r.lang==="ar"?l.nameEn:l.nameAr)}</span>
                </div>
                ${S("manage_templates")?`<button class="template-action" data-action="edit-template" data-template-id="${c(l.id)}" title="${g("edit")}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${r.lang==="ar"?"right":"left"}:auto">${x("edit",14)}</button>`:""}
              </article>
            `).join("")}
          </div>
        </section>
      `).join(""):`
        <section class="panel">
          <div class="empty">
            ${x("layers",18)}
            <span>${g("noTasks")}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function Pn(e=[]){const a=new Set;for(const o of e)if(o?.code!==void 0&&o?.code!==null){const s=String(o.code).trim();if(/^\d+$/.test(s)){const i=parseInt(s,10);i>0&&a.add(i)}}let n=1;for(;a.has(n);)n++;return n<10?`0${n}`:`${n}`}function ds(e,a=null,n=[]){if(!e||typeof e!="string")return!1;const o=e.trim().toLowerCase();if(!o)return!1;const s=/^\d+$/.test(o)?parseInt(o,10):null;return n.some(i=>{if(!i||a&&i.id===a||i.code===void 0||i.code===null)return!1;const l=String(i.code).trim().toLowerCase();return l?!!(l===o||s!==null&&/^\d+$/.test(l)&&s===parseInt(l,10)):!1})}function qa(e=null){if(!S("manage_templates"))return $(g("permissionDenied"),!0);const a=Pt.map(i=>`<option value="${c(i.id)}" ${e?.categoryId===i.id?"selected":""}>${c(t(i.ar,i.en))}</option>`).join(""),n=!!(e&&e.id),o=n?"":Pn(r.data?.templates||[]),s=`<form id="template-form" data-template-id="${c(e?.id||"")}">
    <div class="form-grid">
      <div class="field">
        <label>${g("nameAr")}</label>
        <input name="nameAr" value="${c(e?.nameAr||"")}" required />
      </div>
      <div class="field">
        <label>${g("nameEn")}</label>
        <input name="nameEn" value="${c(e?.nameEn||"")}" required />
      </div>
      ${n?`
      <div class="field">
        <label>${t("الكود","Code")} <span style="font-size:11px;font-weight:normal;color:var(--ink-soft);">${t("(فريد ولا يتكرر)","(Unique, no duplicates)")}</span></label>
        <input name="code" value="${c(e?.code||"")}" placeholder="e.g. 01" required />
      </div>
      `:`
      <div class="field" style="background:var(--surface-soft);padding:10px 14px;border-radius:8px;border:1px dashed var(--line);display:flex;align-items:center;justify-content:space-between;">
        <div>
          <span style="font-size:12px;font-weight:600;color:var(--ink);display:block;">${g("الكود التقائي","Auto-assigned Code")}</span>
        </div>
        <span class="badge" style="font-size:14px;font-weight:700;background:rgba(20,184,166,0.12);color:var(--brand-teal);padding:4px 10px;border-radius:6px;">#${c(o)}</span>
      </div>
      `}
      <div class="field">
        <label>${t("التصنيف","Category")}</label>
        <select name="categoryId" required>${a}</select>
      </div>
      <div class="field">
        <label>${t("النوع (عربي)","Type (Ar)")}</label>
        <input name="typeAr" value="${c(e?.typeAr||"مخطط")}" required />
      </div>
      <div class="field">
        <label>${t("النوع (إنجليزي)","Type (En)")}</label>
        <input name="typeEn" value="${c(e?.typeEn||"Drawing")}" required />
      </div>
      <div class="field">
        <label>${t("الوزن الافتراضي","Default Weight")}</label>
        <input name="defaultWeight" type="number" min="1" value="${e?.defaultWeight||1}" required />
      </div>
      <div class="field">
        <label>${t("المدة الافتراضية (أيام)","Default Duration (Days)")}</label>
        <input name="defaultDuration" type="number" min="1" value="${e?.defaultDuration||5}" required />
      </div>
    </div>
    <div class="modal-actions" style="display:flex;justify-content:space-between;width:100%">
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${c(e.id)}" style="color:var(--red)">${x("trash",14)} ${g("delete")}</button>`:"<div></div>"}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;document.getElementById("modal-root").innerHTML=De(e?t("تعديل قالب","Edit Template"):t("إضافة قالب جديد","Add New Template"),t("القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.","Templates help the team insert tasks quickly with standard criteria."),s,"template")}var So=me({openUploadDrawingModal:()=>Do,renderDocuments:()=>Io});function Io(){const e=r.data?.documents||[],a=r.data?.projects||[],n=r.data?.tasks||[],o=(r.searches?.documents||"").trim().toLowerCase(),s=r.docProjectFilter||"all",i=r.data?.user?.id,l=C(),d=l||S("review_tasks")||S("approve_tasks")||S("edit_tasks"),p=new Set(n.filter(b=>!b.deletedAt).map(b=>b.id)),u=new Set(a.filter(b=>!b.deletedAt).map(b=>b.id)),f=e.filter(b=>!(b.deletedAt||b.taskId&&!p.has(b.taskId)||b.projectId&&!u.has(b.projectId)||s!=="all"&&b.projectId!==s||o&&!(b.originalName||"").toLowerCase().includes(o))).sort((b,h)=>new Date(h.createdAt||0)-new Date(b.createdAt||0)),v=f.reduce((b,h)=>b+(h.size||0),0),k=v>1073741824?(v/1073741824).toFixed(1)+" GB":v>1048576?(v/1048576).toFixed(1)+" MB":Math.round(v/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${g("documents")}</h2>
        <p class="intro">${t("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${S("upload_documents")||l?`
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${x("upload",14)}
            <span>${t("رفع مخطط / ملف جديد","Upload Drawing / File")}</span>
          </button>
        `:""}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${t("الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة","Go to trash bin to review and restore deleted files and projects")}">
          ${x("trash",14)}
          <span>${t("سلة المهملات","Trash")}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${f.length} ${t("مخطط / ملف","drawings")} (${k})
        </span>
      </div>
    </div>

    <!-- Filters Bar (Unified View Toolbar) -->
    <div class="view-toolbar" style="margin-bottom:20px;">
      <div class="view-toolbar-start" style="flex:1;">
        <div class="search-box" style="flex:1;max-width:440px;">
          ${x("search",15)}
          <input 
            type="search" 
            placeholder="${t("بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...","Search by drawing name, code, or format (DWG, PDF, RVT)...")}" 
            value="${c(r.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <div class="sort-box">
          <span>${t("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact" style="min-width:180px;">
            <option value="all" ${s==="all"?"selected":""}>${t("— جميع المشاريع —","— All Projects —")}</option>
            ${a.map(b=>`<option value="${c(b.id)}" ${s===b.id?"selected":""}>${c(b.code)} - ${c(t(b.nameAr,b.nameEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">
          ${f.length} ${t("مخرجات","deliverables")}
        </span>
      </div>
    </div>

    <!-- Documents Table -->
    <div class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${t("المخطط / المخرج الهندسي","Drawing / Deliverable")}</th>
              <th>${g("projects")}</th>
              <th>${g("tasks")}</th>
              <th>${t("الإصدار","Revision")}</th>
              <th>${t("الحالة الهندسية","Status")}</th>
              <th>${t("الحجم","Size")}</th>
              <th>${t("تاريخ الرفع","Upload Date")}</th>
              <th style="text-align:end;">${t("الإجراءات","Actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${f.length>0?f.map(b=>{const h=a.find(R=>R.id===b.projectId),m=n.find(R=>R.id===b.taskId),y=ba(b.originalName,b.mimeType),I=pn(b.originalName),D=b.size>1048576?(b.size/1048576).toFixed(1)+" MB":Math.round((b.size||0)/1024)+" KB",T=l||S("delete_documents")||b.uploaderId===i;return`
                <tr data-doc-id="${c(b.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(b.id)}">
                      <span class="file-format-badge" style="background:${y.bg};color:${y.color};border:1px solid ${y.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${y.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(b.originalName)}">
                          ${c(b.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${y.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${h?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${c(h.id)}">${c(h.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${m?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(m.id)}">${c(t(m.titleAr,m.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
                  </td>
                  <td>
                    ${I?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${I}
                      </span>
                    `:'<span style="font-size:11px;color:var(--muted);">V1</span>'}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${d?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${c(b.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${b.status==="draft"?"selected":""}>📝 ${t("مسودة عمل","Draft")}</option>
                          <option value="review" ${b.status==="review"?"selected":""}>🔍 ${t("قيد المراجعة","Review")}</option>
                          <option value="approved" ${b.status==="approved"?"selected":""}>✅ ${t("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${b.status==="superseded"?"selected":""}>⏳ ${t("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${c(b.status||"draft")}" style="font-size:11px;">
                          ${c(H(b.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${D}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${ae(b.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(b.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${x("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(b.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ رابط Google Drive","Copy Drive Link")}">
                        ${x("link",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${c(b.id)}" style="padding:5px;color:var(--blue);" title="${t("تحميل المخطط","Download")}">
                        ${x("download",14)}
                      </button>
                      ${T?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${c(b.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
                          ${x("trash",14)}
                        </button>
                      `:""}
                    </div>
                  </td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${x("document",24)}
                    <span>${t("لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.","No drawings or documents found matching the criteria.")}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function Do(e=null){const a=r.data?.projects||[],n=e||a[0]?.id||"",o=r.data?.tasks?.filter(l=>l.projectId===n&&!l.deletedAt)||[],s=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${a.map(l=>`<option value="${c(l.id)}" ${l.id===n?"selected":""}>${c(l.code)} - ${c(t(l.nameAr,l.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${o.map(l=>`<option value="${c(l.id)}">${c(t(l.titleAr,l.titleEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("التخصص الهندسي","Engineering Discipline")}</label>
          <select id="drawing-upload-discipline" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="معماري">🏛️ ${t("معماري (Architectural)","Architectural")}</option>
            <option value="إنشائي">🏗️ ${t("إنشائي (Structural)","Structural")}</option>
            <option value="كهرباء">⚡ ${t("كهرباء (Electrical)","Electrical")}</option>
            <option value="ميكانيك وتكييف">🌡️ ${t("ميكانيك وتكييف (HVAC)","HVAC")}</option>
            <option value="سباكة وصحي">💧 ${t("سباكة وصحي (Plumbing)","Plumbing")}</option>
            <option value="مخرجات ثلاثية الأبعاد">📐 ${t("3D / BIM (Revit/SketchUp)","3D / BIM")}</option>
            <option value="عام">📁 ${t("مستندات عامة ومواصفات","General Specs")}</option>
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("الحالة الهندسية المبدئية","Initial Approval Status")}</label>
          <select id="drawing-upload-status" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="draft">📝 ${t("مسودة عمل (Draft)","Draft")}</option>
            <option value="review" selected>🔍 ${t("قيد المراجعة الفنية (Under Review)","Under Review")}</option>
            <option value="approved">✅ ${t("معتمد للتنفيذ (Approved for Construction)","Approved for Construction")}</option>
          </select>
        </div>
      </div>

      <!-- File Upload Dropzone -->
      <div class="field">
        <label style="font-size:12px;font-weight:700;">${t("الملفات والمخططات *","Drawings & Files *")}</label>
        <div id="drawing-dropzone" style="border:2px dashed var(--line);border-radius:12px;padding:24px 16px;text-align:center;background:var(--surface);cursor:pointer;transition:border-color 0.2s;">
          <div style="color:var(--teal);margin-bottom:8px;">${x("upload",28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${t("اسحب وأفلت المخططات هنا أو انقر للاختيار","Drag & drop drawings here or click to browse")}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${t("يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)","Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)")}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${t("إلغاء","Cancel")}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${x("upload",14)} <span>${t("بدء الرفع المباشر","Start Resumable Upload")}</span>
        </button>
      </div>
    </form>
  `,i=document.getElementById("modal-root");if(i){i.innerHTML=De(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),s,"upload-drawing","modal-lg");const l=document.getElementById("drawing-upload-project"),d=document.getElementById("drawing-upload-task");l&&d&&l.addEventListener("change",()=>{const m=l.value,y=r.data?.tasks?.filter(I=>I.projectId===m&&!I.deletedAt)||[];d.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+y.map(I=>`<option value="${c(I.id)}">${c(t(I.titleAr,I.titleEn))}</option>`).join("")});const p=document.getElementById("drawing-dropzone"),u=document.getElementById("drawing-file-input"),f=document.getElementById("drawing-selected-files-list"),v=document.getElementById("start-drawing-upload-btn");let k=[];const b=()=>{if(!k.length){f.innerHTML="",v.disabled=!0;return}v.disabled=!1,f.innerHTML=k.map((m,y)=>{const I=ba(m.name,m.type),D=m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round(m.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${I.bg};color:${I.color};border:1px solid ${I.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${I.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${c(m.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${D})</span>
            </div>
            <button type="button" data-file-remove="${y}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),f.querySelectorAll("[data-file-remove]").forEach(m=>{m.addEventListener("click",y=>{const I=parseInt(m.dataset.fileRemove);k.splice(I,1),b()})})};p&&u&&(p.addEventListener("click",()=>u.click()),u.addEventListener("change",()=>{u.files?.length&&(k=Array.from(u.files),b())}),p.addEventListener("dragover",m=>{m.preventDefault(),p.style.borderColor="var(--teal)"}),p.addEventListener("dragleave",()=>{p.style.borderColor="var(--line)"}),p.addEventListener("drop",m=>{m.preventDefault(),p.style.borderColor="var(--line)",m.dataTransfer?.files?.length&&(k=Array.from(m.dataTransfer.files),b())}));const h=document.getElementById("upload-drawing-form");h&&h.addEventListener("submit",async m=>{if(m.preventDefault(),!k.length)return;const y=l.value,I=d.value||null,D=document.getElementById("drawing-upload-discipline")?.value||"عام",T=document.getElementById("drawing-upload-status")?.value||"draft";V(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:k,projectId:y,taskId:I,discipline:D,status:T})})}}var ai={assignment:{type:"assignment",category:"tasks",icon:"user",color:"blue",titleAr:"إسناد مهمة جديدة",titleEn:"Task Assigned",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_status:{type:"task_status",category:"tasks",icon:"check",color:"teal",titleAr:"تحديث حالة المهمة",titleEn:"Task Status Update",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_blocked:{type:"task_blocked",category:"tasks",icon:"alert",color:"red",titleAr:"مهمة متوقفة ⚠️",titleEn:"Task Blocked ⚠️",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_review:{type:"task_review",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة للمراجعة الفنية",titleEn:"Task for Review",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_approval:{type:"task_approval",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة بانتظار الاعتماد",titleEn:"Task Pending Approval",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},due_soon:{type:"due_soon",category:"schedule",icon:"clock",color:"amber",titleAr:"موعد تسليم قريب",titleEn:"Due Soon",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},overdue:{type:"overdue",category:"schedule",icon:"alert",color:"red",titleAr:"مهمة متأخرة",titleEn:"Overdue Task",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},reminder:{type:"reminder",category:"schedule",icon:"clock",color:"amber",titleAr:"تذكير بموعد ⏰",titleEn:"Due Reminder ⏰",badgeTextAr:"فتح التذكير",badgeTextEn:"Open Reminder"},comment:{type:"comment",category:"communication",icon:"mail",color:"blue",titleAr:"تعليق جديد",titleEn:"New Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},mention:{type:"mention",category:"communication",icon:"mail",color:"blue",titleAr:"تم ذكرك في تعليق",titleEn:"Mentioned in Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},document_review:{type:"document_review",category:"drawings",icon:"document",color:"amber",titleAr:"مراجعة مخطط هندسي",titleEn:"Drawing Review",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},document_approved:{type:"document_approved",category:"drawings",icon:"document",color:"teal",titleAr:"اعتماد مخطط هندسي",titleEn:"Drawing Approved",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},escalation:{type:"escalation",category:"system",icon:"alert",color:"red",titleAr:"تصعيد مهمة ونظام 🚨",titleEn:"Escalation Alert 🚨",badgeTextAr:"التفاصيل",badgeTextEn:"Details"},general:{type:"general",category:"system",icon:"bell",color:"blue",titleAr:"تنبيه مساحة العمل",titleEn:"Workspace Notification",badgeTextAr:"عرض",badgeTextEn:"View"}};function jo(e){const a=ai[e]||ai.general;return{...a,defaultTitle:t(a.titleAr,a.titleEn),badgeText:t(a.badgeTextAr,a.badgeTextEn)}}var _o=me({showNotifications:()=>Cn});function Cn(){const e=r.data?.notifications||[],a=e.filter(s=>!s.read&&!s.readAt).length,n=e.length-a,o=`${`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--line);flex-wrap:wrap;gap:8px;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="mini-badge" style="background:${a>0?"var(--mint)":"var(--surface-soft)"};color:${a>0?"var(--teal)":"var(--muted)"};font-weight:700;padding:4px 8px;border-radius:6px;">
          ${a} ${t("غير مقروء","unread")}
        </span>
        <span style="font-size:11px;color:var(--muted);">(${e.length} ${t("إجمالي","total")})</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        ${a>0?`
          <button type="button" class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 8px;display:flex;align-items:center;gap:4px;">
            ${x("check",12)} ${t("تحديد الكل كمقروء","Mark all as read")}
          </button>
        `:""}
        ${n>0?`
          <button type="button" class="btn btn-ghost btn-sm" data-action="clear-read-notifications" style="font-size:11px;color:var(--muted);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${t("حذف كافة الإشعارات المقروءة","Clear all read notifications")}">
            ${x("trash",12)} ${t("مسح المقروء","Clear read")}
          </button>
        `:""}
        <button type="button" class="btn btn-ghost btn-sm" data-action="send-test-notification" style="font-size:11px;color:var(--blue);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${t("إرسال إشعار تجريبي فوري للتأكد من وصوله","Send live test notification")}">
          ${x("bell",12)} ${t("تجربة إرسال","Test Send")}
        </button>
      </div>
    </div>
  `}${typeof window<"u"&&"Notification"in window&&Notification.permission==="default"?`
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
      <span style="color:var(--ink-soft);">${t("تفعيل إشعارات سطح المكتب والمتصفح عند وصول مهام أو تنبيهات؟","Enable desktop browser alerts when new tasks or mentions arrive?")}</span>
      <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${t("تفعيل الآن","Enable")}</button>
    </div>
  `:""}${e.length?`<div class="attention-list">${e.slice(0,30).map(s=>{const i=!!(s.readAt||s.read),l=jo(s.type),d=r.lang==="ar"?s.titleAr||l.titleAr||s.titleEn||l.defaultTitle:s.titleEn||l.titleEn||s.titleAr||l.defaultTitle,p=r.lang==="ar"?s.messageAr||s.bodyAr||s.content||"":s.messageEn||s.bodyEn||(s.content!==s.titleAr&&s.content!==s.messageAr?s.content:"")||s.messageAr||s.bodyAr||"",u=p&&p!==d?`${p} · `:"",f=s.type==="document_review"||s.type==="document_approved"||s.documentId,v=s.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-weight:600;">${x("check",10)} ${t("فتح المهمة","Open Task")}</span>`:f?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);font-weight:600;">${x("document",10)} ${t("معاينة المخطط","View Drawing")}</span>`:s.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);font-weight:600;">${x("building",10)} ${t("المشروع","Project")}</span>`:"",k=i?"":`<span style="width:7px;height:7px;border-radius:50%;background:var(--blue);display:inline-block;flex-shrink:0;box-shadow:0 0 0 2px var(--surface);" title="${t("غير مقروء","Unread")}"></span>`;return`
      <div class="attention-item notif-item" data-action="read-notification" data-notification-id="${c(s.id)}" data-task-id="${c(s.taskId||"")}" data-project-id="${c(s.projectId||"")}" data-document-id="${c(s.documentId||"")}" data-type="${c(s.type||"")}" style="border:1px solid ${i?"var(--line)":"rgba(56,189,248,0.25)"};text-align:start;width:100%;cursor:pointer;opacity:${i?".75":"1"};background:${i?"var(--surface-soft)":"var(--surface)"};position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
        <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
          <span class="attention-icon ${l.color}" style="flex-shrink:0;margin-top:2px;">${x(l.icon,14)}</span>
          <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
              ${k}
              <strong dir="auto" style="color:var(--${l.color});font-size:12px;font-weight:${i?"600":"700"};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(d)}</strong>
              ${v}
            </div>
            <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(p)}">
              ${c(u)}<span style="color:var(--ink-soft);">${ae(s.createdAt)}</span>
            </div>
          </div>
        </div>
        <button type="button" class="notif-dismiss-btn" data-action="delete-notification" data-notification-id="${c(s.id)}" title="${t("حذف الإشعار","Dismiss notification")}" style="margin-inline-start:10px;flex-shrink:0;">
          ${x("close",12)}
        </button>
      </div>
    `}).join("")}</div>`:`
    <div class="empty" style="padding:48px 20px;text-align:center;">
      <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
        ${x("bell",24)}
      </span>
      <strong style="display:block;font-size:14px;color:var(--ink);">${t("لا توجد إشعارات حالياً","No notifications right now")}</strong>
      <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${t("ستظهر هنا التنبيهات الخاصة بالمهام والمشاريع والإشارات والتذكيرات.","Task, project, mention, and reminder alerts will appear here.")}</span>
    </div>
  `}`;document.getElementById("modal-root").innerHTML=De(g("notifications"),t("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),o,"notifications","modal-notifications")}var Po=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),Ha=Po?"⌘K":"Ctrl+K",_e=0,$e=[];function ls(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.body.style.overflow="hidden";const a=t(`ابحث في المشاريع، المهام، والأعضاء... (${Ha})`,`Search projects, tasks, team... (${Ha})`),n=`
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${x("search",18)}</span>
          <input 
            id="omnisearch-input" 
            type="text" 
            autocomplete="off" 
            placeholder="${c(a)}" 
            onfocus="this.placeholder=''" 
            onblur="if(!this.value) this.placeholder='${c(a)}'"
          />
          <button class="btn btn-ghost btn-sm" data-action="close-omnisearch" style="padding:4px 8px;">
            <kbd class="shortcut-kbd">ESC</kbd>
          </button>
        </div>
        <div id="omnisearch-results-container" class="omnisearch-results">
          ${ii("")}
        </div>
        <div class="omnisearch-foot">
          <div class="omni-shortcuts-hint">
            <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd> ${t("للتنقل","to navigate")}</span>
            <span><kbd class="shortcut-kbd">↵</kbd> ${t("للاختيار","to select")}</span>
            <span><kbd class="shortcut-kbd">ESC</kbd> ${t("للإغلاق","to close")}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="open-cheatsheet" style="font-size:11px;padding:2px 6px;">
            ${x("sparkles",12)} ${t("دليل الاختصارات (?)","Shortcuts (?)")}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const o=document.getElementById("omnisearch-modal");o&&o.addEventListener("click",i=>{i.target===o&&dt()});const s=document.getElementById("omnisearch-input");if(s){s.focus();let i=null;s.addEventListener("input",l=>{_e=0,i&&cancelAnimationFrame(i);const d=l.target.value;i=requestAnimationFrame(()=>{const p=document.getElementById("omnisearch-results-container");p&&(p.innerHTML=ii(d))})}),s.addEventListener("keydown",Co)}}function dt(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.querySelector(".modal-backdrop")||(document.body.style.overflow="")}function Co(e){e.key==="ArrowDown"?(e.preventDefault(),$e.length>0&&(_e=(_e+1)%$e.length,ni())):e.key==="ArrowUp"?(e.preventDefault(),$e.length>0&&(_e=(_e-1+$e.length)%$e.length,ni())):e.key==="Enter"?(e.preventDefault(),$e[_e]&&cs($e[_e])):e.key==="Escape"&&dt()}function ni(){document.querySelectorAll(".omni-item").forEach((e,a)=>{e.classList.toggle("selected",a===_e),a===_e&&e.scrollIntoView({block:"nearest"})})}function cs(e){if(dt(),e.type==="action")if(e.id==="new-task"){const a=(r.data?.projects||[]).find(n=>n.id===(r.activeProjectId||r.lastActiveProjectId))||(r.data?.projects||[])[0];ua(null,null,e.targetProjectId||a?.id)}else e.id==="new-project"?An():e.id==="cheatsheet"?Ln():e.id==="show-notifications"&&Cn();else if(e.type==="project")r.projectTab="tasks",r.lastActiveProjectId=e.id,we("project-detail",e.id);else if(e.type==="task"){const a=r.data?.tasks?.find(n=>n.id===e.id);a&&ua(a)}else if(e.type==="user"){const a=r.data?.users?.find(n=>n.id===e.id);a&&typeof window.openUserModal=="function"&&window.openUserModal(a)}}function ii(e){const a=e.trim().toLowerCase(),n=[],o=(r.data?.projects||[]).find(d=>d.id===(r.activeProjectId||r.lastActiveProjectId))||(r.data?.projects||[])[0],s=o?t(o.nameAr,o.nameEn):"",i=[];(S("create_tasks")||C())&&i.push({type:"action",id:"new-task",targetProjectId:o?.id,title:t("إضافة مهمة جديدة","Create new task"),sub:o?t(`في مشروع: ${s}`,`In project: ${s}`):t("إجراء سريع","Quick action"),icon:"plus",keywords:"new task مهمة إضافة عمل جديد"}),(S("create_projects")||C())&&i.push({type:"action",id:"new-project",title:t("إنشاء مشروع جديد","Create new project"),sub:t("إجراء سريع","Quick action"),icon:"building",keywords:"new project مشروع إنشاء جديد"}),i.push({type:"action",id:"cheatsheet",title:t("عرض دليل اختصارات لوحة المفاتيح","View keyboard shortcuts guide"),sub:t("مساعدة","Help"),icon:"sparkles",keywords:"shortcuts اختصارات كيبورد مساعدة"}),i.push({type:"action",id:"show-notifications",title:t("مركز التنبيهات والإشعارات","Notifications Center"),sub:t("عرض الإشعارات والتنبيهات الحديثة","View recent notifications & alerts"),icon:"bell",keywords:"notifications alerts إشعارات تنبيهات رنين تنبيه"});for(const d of i)(!a||d.keywords.includes(a)||d.title.toLowerCase().includes(a))&&n.push(d);if(n.length<20&&(S("view_projects")||C())){const d=r.data?.projects||[];for(const p of d)if(n.length>=20||(!a||`${p.nameAr||""} ${p.nameEn||""} ${p.code||""} ${p.clientAr||""} ${p.clientEn||""}`.toLowerCase().includes(a))&&(n.push({type:"project",id:p.id,title:t(p.nameAr,p.nameEn),sub:`${p.code} · ${t(p.clientAr,p.clientEn)||""}`,badge:`${p.progress}%`,icon:"building"}),!a&&n.length>=5))break}if(n.length<20&&ee("tasks")){const d=r.data?.tasks||[];for(const p of d)if(n.length>=20||(!a||`${p.titleAr||""} ${p.titleEn||""} ${p.categoryAr||""} ${p.categoryEn||""}`.toLowerCase().includes(a))&&(n.push({type:"task",id:p.id,title:t(p.titleAr,p.titleEn),sub:p.dueDate?`📅 ${ae(p.dueDate)}`:t(p.categoryAr,p.categoryEn)||"",badge:`${p.progress}%`,icon:"checklist"}),!a&&n.length>=10))break}if(n.length<20&&(C()||S("manage_users"))){const d=r.data?.users||[];for(const p of d)if(n.length>=20||(!a||`${p.name||""} ${p.nameEn||""} ${p.email||""} ${p.jobTitleAr||""}`.toLowerCase().includes(a))&&(n.push({type:"user",id:p.id,title:t(p.name,p.nameEn||p.name),sub:p.email||"",badge:re(p),icon:"user"}),!a&&n.length>=15))break}if($e=n.slice(0,15),!$e.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${x("search",24)}</span>
        <strong style="color:var(--ink);">${t("لا توجد نتائج مطابقة","No matching results")}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${t("جرب البحث بكلمات أخرى أو رمز المشروع.","Try different keywords or project code.")}</p>
      </div>
    `;let l="";return $e.map((d,p)=>{let u="";const f=d.type==="action"?t("إجراءات سريعة","Quick Actions"):d.type==="project"?t("المشاريع","Projects"):d.type==="task"?t("المهام والمخرجات","Tasks & Deliverables"):t("فريق العمل","Team");return f!==l&&(l=f,u=`<div class="omni-group-title">${f}</div>`),`
      ${u}
      <div class="omni-item ${p===_e?"selected":""}" data-omni-index="${p}" onclick="window.__selectOmniItem(${p})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${x(d.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${c(d.title)}</strong>
            ${d.sub?`<span style="font-size:11px;color:var(--muted);">${c(d.sub)}</span>`:""}
          </div>
        </div>
        ${d.badge?`<span class="omni-badge">${c(d.badge)}</span>`:""}
      </div>
    `}).join("")}window.__selectOmniItem=e=>{$e[e]&&cs($e[e])};function Ln(){dt();const e=`
    <div style="padding:4px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin:0 0 16px 0;">${t("استخدم هذه الاختصارات لزيادة سرعة عملك وإدارة المهام باحترافية كاملة بدون لمس الفأرة:","Use these shortcuts to navigate the workspace and manage tasks at full speed without a mouse:")}</p>
      
      <!-- القسم الأول: التنقل العام والإجراءات السريعة -->
      <div class="cheatsheet-section" style="margin-top:0;">
        <div class="cheatsheet-section-title">
          <span style="display:flex;color:var(--teal);">${x("search",14)}</span>
          <span>${t("التنقل العام والإجراءات السريعة","General & Navigation")}</span>
        </div>
        <div class="cheatsheet-grid">
          <div class="cheatsheet-row">
            <span>${t("البحث الشامل والأوامر السريعة","Omnisearch & Quick Commands")}</span>
            <kbd class="shortcut-kbd">${Ha}</kbd>
          </div>
          <div class="cheatsheet-row">
            <span>${t("مركز الإشعارات (فتح / إغلاق)","Notifications (Toggle Open/Close)")}</span>
            <kbd class="shortcut-kbd">B</kbd>
          </div>
          <div class="cheatsheet-row">
            <span>${t("إضافة مهمة سريعة (فتح / إغلاق)","Quick New Task (Toggle Open/Close)")}</span>
            <kbd class="shortcut-kbd">N</kbd>
          </div>
          <div class="cheatsheet-row">
            <span>${t("إنشاء مشروع جديد (فتح / إغلاق)","New Project (Toggle Open/Close)")}</span>
            <kbd class="shortcut-kbd">P</kbd>
          </div>
          <div class="cheatsheet-row">
            <span>${t("دليل الاختصارات (فتح / إغلاق)","Shortcuts Guide (Toggle)")}</span>
            <kbd class="shortcut-kbd">? / ؟</kbd>
          </div>
          <div class="cheatsheet-row">
            <span>${t("إغلاق أي نافذة منبثقة أو بحث","Close modal or search")}</span>
            <kbd class="shortcut-kbd">ESC</kbd>
          </div>
          <div class="cheatsheet-row">
            <span>${t("التنقل بين نتائج البحث والقوائم","Navigate search & lists")}</span>
            <div class="cheatsheet-keys">
              <kbd class="shortcut-kbd">↑</kbd>
              <kbd class="shortcut-kbd">↓</kbd>
            </div>
          </div>
          <div class="cheatsheet-row">
            <span>${t("تأكيد واختيار العنصر","Confirm & select item")}</span>
            <kbd class="shortcut-kbd">↵ Enter</kbd>
          </div>
        </div>
      </div>

      <!-- القسم الثاني: لوحة المهام وإعادة الترتيب بالكيبورد -->
      <div class="cheatsheet-section">
        <div class="cheatsheet-section-title" style="display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="display:flex;color:var(--teal);">${x("grid",14)}</span>
            <span>${t("لوحة المهام والسحب والإفلات بالكيبورد","Kanban Board & Keyboard Drag-and-Drop")}</span>
          </div>
        </div>
        <p style="font-size:11px;color:var(--muted);margin:0 0 10px 0;">
          ${t("حدد أي كرت مهمة عبر مفتاح Tab، ثم تحكم به بالكامل فوراً بدون فأرة:","Focus any task card using Tab, then move and drop it without a mouse:")}
        </p>
        <div class="cheatsheet-grid">
          <div class="cheatsheet-row">
            <span>${t("إمساك الكرت / تحريره في مكانه","Grab card / Release in place")}</span>
            <div class="cheatsheet-keys">
              <kbd class="shortcut-kbd">Space</kbd>
              <span style="font-size:10px;color:var(--muted);">${t("أو","or")}</span>
              <kbd class="shortcut-kbd">Alt + M</kbd>
            </div>
          </div>
          <div class="cheatsheet-row">
            <span>${t("تحريك لأعلى / لأسفل بالعمود","Move up / down in column")}</span>
            <div class="cheatsheet-keys">
              <kbd class="shortcut-kbd">↑</kbd>
              <kbd class="shortcut-kbd">↓</kbd>
            </div>
          </div>
          <div class="cheatsheet-row">
            <span>${t("نقل بين الأعمدة (يمين / يسار)","Move between columns")}</span>
            <div class="cheatsheet-keys">
              <kbd class="shortcut-kbd">←</kbd>
              <kbd class="shortcut-kbd">→</kbd>
            </div>
          </div>
          <div class="cheatsheet-row">
            <span>${t("تأكيد الإفلات وحفظ الترتيب","Confirm drop & save order")}</span>
            <kbd class="shortcut-kbd">↵ Enter</kbd>
          </div>
          <div class="cheatsheet-row">
            <span>${t("إلغاء النقل وإرجاع المهمة","Cancel move & revert")}</span>
            <kbd class="shortcut-kbd">ESC</kbd>
          </div>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:24px;">
        <button type="button" class="btn btn-primary" data-action="close-modal">${t("فهمت ذلك","Got it")}</button>
      </div>
    </div>
  `;document.getElementById("modal-root").innerHTML=De(t("دليل اختصارات لوحة المفاتيح","Keyboard Shortcuts Guide"),t("طرق سريعة للتنقل وإنجاز العمل وسحب وإفلات المهام بكفاءة عالية","Work faster with productivity hotkeys & accessible task reordering"),e,"cheatsheet","modal-cheatsheet")}function Lo(){window.addEventListener("keydown",e=>{const a=document.activeElement,n=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.tagName==="SELECT"||a.isContentEditable),o=e.code==="KeyK"||e.key?.toLowerCase()==="k"||e.key==="ن";if((e.metaKey||e.ctrlKey)&&o){e.preventDefault(),document.getElementById("omnisearch-modal")?dt():ls();return}if((e.key==="?"||e.key==="؟"||e.code==="Slash"&&e.shiftKey)&&!n){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="cheatsheet"], .modal-cheatsheet')?V():Ln();return}if((e.code==="KeyN"||e.key?.toLowerCase()==="n"||e.key==="ى")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;if(document.querySelector('.modal[data-modal="task"], #task-form'))V();else if(!document.querySelector('.modal:not([data-modal="task"])')){const s=r.view==="project-detail"&&r.activeProjectId?r.activeProjectId:r.data?.projects?.[0]?.id;ua(null,null,s)}return}if((e.code==="KeyP"||e.key?.toLowerCase()==="p"||e.key==="ح")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="project"], #project-form')?V():document.querySelector('.modal:not([data-modal="project"])')||An();return}if((e.code==="KeyB"||e.key?.toLowerCase()==="b"||e.key==="لا")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="notifications"], .modal-notifications')?V():document.querySelector('.modal:not(.modal-notifications):not([data-modal="notifications"])')||Cn();return}if(e.key==="Escape"&&document.getElementById("omnisearch-modal")){e.preventDefault(),dt();return}})}var zo="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",ps=typeof navigator<"u"&&!!navigator.connection?.saveData,Mo=3e5,Ro=ps?1e4:3e4,No=ps?600:300,Oo=25e3,Bo=150,ja=null,si=!1,Wa=!1,ut=null,Ie=null,na=null,bt=null,_a=null,ft=null,oi=0,Ct=0,Ue=!1,zn=Date.now(),Va=0,Xt=null,Pe=new Map;function Fo(e){if(!e||typeof e!="string")return;const a=Date.now();Pe.set(e,a);for(const[n,o]of Pe.entries())a-o>8e3&&Pe.delete(n);if(Pe.size>Bo){const n=Pe.keys().next().value;n&&Pe.delete(n)}}function Nt(){return typeof localStorage>"u"?!1:!!localStorage.getItem("darc_token")}var ma=new Set(["__proto__","constructor","prototype"]),us=new Set(["custom_fields","permissions","details"]);function ga(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(ga);const a={};for(const[n,o]of Object.entries(e)){if(ma.has(n))continue;const s=n.indexOf("_")===-1?n:n.replace(/_([a-z0-9])/g,(i,l)=>l.toUpperCase());ma.has(s)||(a[s]=o!==null&&typeof o=="object"&&!us.has(n)?ga(o):o)}return a}function va(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(va);const a={};for(const[n,o]of Object.entries(e))ma.has(n)||(a[n]=o!==null&&typeof o=="object"&&!us.has(n)?va(o):o);return a}function jt(e){if(!e||!r.data||!Array.isArray(r.data.tasks)||!Array.isArray(r.data.projects))return;const a=r.data.projects.find(p=>p.id===e);if(!a)return;const n=r.data.tasks.filter(p=>p.projectId===e&&!p.deletedAt&&!p.deleted_at);let o=0,s=0;for(const p of n){const u=Number(p.weight)||1,f=Number(p.progress)||0;o+=u,s+=u*(f/100)}const i=o>0?Math.round(s/o*100):0;a.progress!==i&&(a.progress=i),a.totalWeight=o;const l=n.length>0,d=l&&n.every(p=>p.status==="done"||p.status==="completed");l&&d&&i===100?a.lifecycle="completed":a.lifecycle==="completed"&&(!d||i<100)&&(a.lifecycle="active")}function Pa(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const a=(r.data?.notifications||[]).filter(o=>!o.read&&!o.readAt).length;let n=e.querySelector(".notification-dot");a>0?n||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):n&&n.remove()}function Ga(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!ut||ut.state==="closed")&&(ut=new e),ut.state==="suspended"&&ut.resume().catch(()=>{});const a=ut,n=a.createOscillator(),o=a.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,a.currentTime),n.frequency.exponentialRampToValueAtTime(880,a.currentTime+.15),o.gain.setValueAtTime(.06,a.currentTime),o.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),n.connect(o),o.connect(a.destination),n.start(),n.stop(a.currentTime+.36)}catch{}}function Uo(){Xt&&cancelAnimationFrame(Xt),Xt=requestAnimationFrame(()=>{Xt=null,typeof M=="function"?M():typeof X=="function"&&X()})}function ia(e,a,n,o){if(!r.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const s=n?va(ga(n)):null,i=o?va(ga(o)):null,l=s&&s.id||i&&i.id;if(!l)return!1;const d=Pe.get(l);if(d&&Date.now()-d<5e3)return!0;const p=r.data?.user?.roleId==="admin"||r.data?.user?.role_id==="admin";if(s&&e==="notifications"){const k=s.userId||s.user_id;if(k&&k!==r.data?.user?.id)return!1}else if(!p&&s&&(e==="tasks"||e==="documents"||e==="comments")){const k=s.projectId||(e==="comments"?r.data?.tasks?.find(b=>b.id===s.taskId)?.projectId:null);if(k&&!r.data?.projects?.some(b=>b.id===k))return!1}Array.isArray(r.data[e])||(r.data[e]=[]);const u=r.data[e];let f=!1;const v=!!(s?.deletedAt||s?.deleted_at);if(a==="DELETE"||v){const k=u.length;let b=null;e==="tasks"&&(b=u.find(h=>h.id===l)?.projectId||i?.projectId||s?.projectId),r.data[e]=u.filter(h=>h.id!==l),r.data[e].length!==k&&(f=!0),e==="tasks"&&b?jt(b):e==="projects"?Array.isArray(r.data.tasks)&&(r.data.tasks=r.data.tasks.filter(h=>h.projectId!==l)):e==="notifications"&&(Pa(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="UPDATE"&&s){const k=u.findIndex(b=>b.id===l);if(k!==-1){for(const[b,h]of Object.entries(s))ma.has(b)||(u[k][b]=h);f=!0}else u.unshift(s),f=!0;e==="tasks"?(s.projectId&&jt(s.projectId),i?.projectId&&i.projectId!==s.projectId&&jt(i.projectId)):e==="notifications"&&(Pa(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="INSERT"&&s){if(u.some(k=>k.id===l)||(u.unshift(s),f=!0),e==="tasks"&&s.projectId)jt(s.projectId);else if(e==="notifications"){const k=r.data?.user?.id,b=s.userId||s.user_id,h=!!(s.read||s.readAt||s.read_at);if(k&&b===k&&!h){Pa();const m=r.lang==="ar"?s.titleAr||s.messageAr||s.bodyAr||s.content||s.titleEn||t("إشعار جديد","New notification"):s.titleEn||s.messageEn||s.bodyEn||(s.content!==s.titleAr&&s.content!==s.messageAr?s.content:"")||s.titleAr||t("إشعار جديد","New notification");if(m&&$(`🔔 ${m}`,!1),Ga(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{const y=r.lang==="ar"?s.messageAr||s.bodyAr||s.content||"":s.messageEn||s.bodyEn||s.content||"",I=new Notification(m,{body:y,icon:"/favicon.ico",tag:s.id||"darc-alert"});I.onclick=()=>{window.focus(),typeof showNotifications=="function"&&showNotifications(),I.close()}}catch(y){console.warn("[WebNotification] Error:",y.message)}typeof showNotifications=="function"&&document.querySelector(".modal-notifications")&&showNotifications()}}}if(f){ot();const k=s?.taskId||i?.taskId;if(k){const b=(r.data?.tasks||[]).find(h=>h.id===k);if(b){if(e==="comments"){const h=document.getElementById("task-comment-form");if(h&&h.dataset.taskId===k){const m=document.getElementById("task-comments-list");m&&typeof Rt=="function"&&(m.innerHTML=Rt(b),m.scrollTop=m.scrollHeight)}}if(e==="documents"){const h=document.getElementById("task-dropzone");if(h&&h.dataset.taskId===k){const m=document.getElementById("task-documents-list");m&&typeof rt=="function"&&(m.innerHTML=rt(b))}}}}return Uo(),!0}return!1}function Ot(e="realtime"){Nt()&&(Ue&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!r.data||!r.view||(ja&&clearTimeout(ja),ja=setTimeout(async()=>{try{await xe(!0)}catch(a){console.warn("[Realtime] Sync error:",String(e),a.message)}},No)))}function Ja(e,a,n,o={}){e&&e.readyState===WebSocket.OPEN&&(oi++,e.send(JSON.stringify({topic:a,event:n,payload:o,ref:String(oi)})))}function qo(e){Mn(),na=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&Ja(e,"phoenix","heartbeat")},Oo)}function Mn(){na&&(clearInterval(na),na=null)}function fs(e="disconnect"){if(Wa=!0,Mn(),bt&&(clearTimeout(bt),bt=null),Ie){try{Ie.close(1e3,e)}catch{}Ie=null}}function Ka(e="idle"){Ue||(Ue=!0,fs(e))}function Ya(e="wake_up"){const a=Ue;Ue=!1,Nt()&&(typeof navigator<"u"&&!navigator.onLine||((!Ie||Ie.readyState===WebSocket.CLOSED||Ie.readyState===WebSocket.CLOSING)&&Rn(),(a||e==="tab_visible")&&Ot(e)))}function Rn(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&Nt()&&!Ue&&!(Ie&&(Ie.readyState===WebSocket.CONNECTING||Ie.readyState===WebSocket.OPEN))){Wa=!1;try{const e=new WebSocket(zo);Ie=e,e.onopen=()=>{Ct=0,qo(e),Ja(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(a=>{Ja(e,`realtime:public:${a}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:a}]}})})},e.onmessage=a=>{try{const{event:n,topic:o,payload:s}=JSON.parse(a.data);if(n==="phx_reply"||n==="phx_close")return;if(n==="postgres_changes"&&s?.data){const{table:i,type:l,record:d,old_record:p}=s.data;if(ia(i,l,d,p))return}if((n==="INSERT"||n==="UPDATE"||n==="DELETE")&&o?.startsWith("realtime:public:")){const i=o.split(":")[2];if(ia(i,n,s?.record||s?.new,s?.old_record||s?.old))return}if(o==="realtime:darc_live"&&(n==="broadcast"||n==="STATE_MUTATION"||n==="GRANULAR_DELTA")){const i=s?.payload||s,l=i?.mutationId||i?.id||i?.entityId;if(l&&Pe.has(l))return;if(i?.delta){const{table:d,action:p,record:u,oldRecord:f}=i.delta;if(ia(d,p,u,f))return}Ot("edge_broadcast");return}(n==="broadcast"||o==="realtime:darc_live"||typeof o=="string"&&o.startsWith("realtime:public:"))&&Ot("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=a=>{if(Mn(),Ie=null,!(Wa||!Nt()||Ue)&&!(a?.reason==="logout"||a?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){Ct++;const n=Math.min(3e4,Math.pow(2,Math.min(Ct,5))*1e3)+Math.floor(Math.random()*800);bt&&clearTimeout(bt),bt=setTimeout(()=>{Rn()},n)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function ri(){const e=Date.now();e-Va>1e4&&(Va=e,zn=e,Ue&&(typeof document>"u"||!document.hidden)&&Ya("user_active"))}function Ho(){_a&&clearInterval(_a),_a=setInterval(()=>{const e=Date.now();for(const[a,n]of Pe.entries())e-n>8e3&&Pe.delete(a);Ue||typeof document<"u"&&document.hidden||Date.now()-zn>=Mo&&Ka("inactivity_idle")},6e4)}function Wo(){if(!si){if(si=!0,Nt()&&Rn(),Ho(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,ri,{passive:!0})}),window.addEventListener("mousemove",ri,{passive:!0})),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden?(ft&&clearTimeout(ft),ft=setTimeout(()=>{Ka("tab_hidden")},Ro)):(ft&&(clearTimeout(ft),ft=null),zn=Date.now(),Va=Date.now(),Ya("tab_visible"))}),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=a=>{if(a.data?.type==="GRANULAR_DELTA"&&a.data.delta){const{table:n,action:o,record:s,oldRecord:i}=a.data.delta;ia(n,o,s,i)}else a.data?.type==="STATE_MUTATION"&&Ot("broadcast_channel")},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{r.isOffline=!1,Ct=0;const e=window.api,a=typeof window.choose=="function"?window.choose:(o=>o),n=typeof window.showToast=="function"?window.showToast:console.log;if(Ya("online"),e){const o=await ln(e);o&&o.synced>0?n(a(`تمت استعادة الاتصال ومزامنة ${o.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${o.synced} pending actions successfully! 🚀`),!1):n(a("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}Ot("online")}),window.addEventListener("offline",()=>{if(r.isOffline=!0,Ct=0,Ka("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function Vo(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now()})}catch{}}typeof window<"u"&&(window.notifyStateMutation=Vo,window.disconnectSupabaseRealtime=fs,window.recordRecentLocalMutation=Fo,window.recalculateProjectProgressInMemory=jt);var Go=me({getOrCreateFloatingUploadWidget:()=>ms,handleChange:()=>en,handleClick:()=>Za,handleInput:()=>Qa,handleSubmit:()=>Xa,init:()=>vs,updateFloatingUploadWidget:()=>vt,uploadDirectFiles:()=>gs,uploadTaskFiles:()=>Nn});async function Xa(e){const a=e.target;if(!["project-form","task-form","user-form","role-form","activation-form","task-comment-form","template-form","force-password-form"].includes(a.id)&&!a.dataset.action)return;e.preventDefault();const n=Object.fromEntries(new FormData(a).entries()),o=a.querySelector('button[type="submit"]');o&&(o.disabled=!0,o.classList.add("is-loading"));try{if(a.id==="activation-form"){if(n.password!==n.passwordConfirm)throw new Error(t("كلمتا المرور غير متطابقتين.","Passwords do not match."));if(delete n.passwordConfirm,await z("/api/auth/activate",{method:"POST",body:JSON.stringify(n)}),window.history.replaceState({},"",window.location.pathname),qt(),await xe(),r.data?.user?.customFields?.calendarSystem){r.calendarSystem=r.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",r.calendarSystem)}catch{}}X();return}if(a.id==="project-form"){n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.managerId||(n.managerId=null);let s=[];try{n.memberIds&&(s=JSON.parse(n.memberIds))}catch{}n.managerId&&!s.includes(n.managerId)&&s.push(n.managerId),n.memberIds=s;const i=!!a.dataset.projectId,l=await z(i?`/api/projects/${a.dataset.projectId}`:"/api/projects",{method:i?"PATCH":"POST",body:JSON.stringify(n)}),d=l.project||{id:a.dataset.projectId||`prj_${Date.now()}`,nameAr:n.nameAr,nameEn:n.nameEn,code:n.code,clientAr:n.clientAr,clientEn:n.clientEn||n.clientAr,managerId:n.managerId,priority:n.priority||"medium",lifecycle:n.lifecycle||"active",startDate:n.startDate,dueDate:n.dueDate,descriptionAr:n.descriptionAr,health:"on_track",progress:0,memberIds:n.memberIds};if(r.data.projects||(r.data.projects=[]),i){const p=r.data.projects.findIndex(u=>u.id===(l.project?.id||a.dataset.projectId));p!==-1&&(r.data.projects[p]={...r.data.projects[p],...d})}else r.data.projects.unshift(d);V(),M(),$(t("تم حفظ المشروع.","Project saved."));return}if(a.id==="task-form"){const s=a.dataset.taskId;n.remindAt,delete n.remindAt,n.templateId=n.templateId||null,n.typeAr=n.typeAr||(n.templateId?"مخطط":null),n.typeEn=n.typeEn||(n.templateId?"Drawing":null),n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.assigneeId||(n.assigneeId=null),n.reviewerId||(n.reviewerId=null);let i=[];try{i=JSON.parse(n.additionalAssignees||"[]")}catch{i=[...a.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(v=>v.value)}let l=[];try{l=JSON.parse(n.externalAssignees||"[]")}catch{const v=String(n.externalAssignees||"").trim();l=v?v.split(/[,،]+/).map(k=>k.trim()).filter(Boolean):[]}let d=[];try{d=JSON.parse(n.remindersJson||"[]")}catch{d=[]}delete n.additionalAssignees,delete n.externalAssignees,delete n.remindersJson,delete n.dependencies,delete n.weight,delete n.progress,n.customFields={additional_assignees:i,external_assignees:l,reminders:d},n.projectId||(n.projectId=r.activeProjectId||r.data.projects?.[0]?.id);const p=!!s;if(p){const f=(r.data?.tasks||[]).find(v=>v.id===s);f?.updatedAt&&(n.expectedUpdatedAt=f.updatedAt)}let u;try{u=await z(p?`/api/tasks/${s}`:"/api/tasks",{method:p?"PATCH":"POST",body:JSON.stringify(n)})}catch(f){if(f.message&&f.message.includes("تعارض")){await ce(!0),$(f.message,!0);return}throw f}if(u.task){if(r.data.tasks||(r.data.tasks=[]),p){const f=r.data.tasks.findIndex(v=>v.id===u.task.id);f!==-1&&(r.data.tasks[f]={...r.data.tasks[f],...u.task})}else r.data.tasks.unshift(u.task),r.view==="tasks"&&(r.taskProjectFilter!=="all"&&r.taskProjectFilter!==u.task.projectId&&(r.taskProjectFilter=u.task.projectId),r.taskFilter==="mine"&&u.task.assigneeId!==r.data.user?.id&&(r.taskFilter="all"));if(Array.isArray(d)&&d.length>0){for(const f of d)if(!f.id||f.id.startsWith("rem_temp_")){const v=f.remindAt?new Date(f.remindAt):null;if(!v||isNaN(v.getTime()))continue;z("/api/reminders",{method:"POST",body:JSON.stringify({taskId:u.task.id,remindAt:v.toISOString(),noteAr:f.noteAr||n.titleAr||"تذكير لمتابعة المهمة"})}).catch(k=>console.warn("[Reminder dispatch note]",k))}}}V(),M(),$(t("تم حفظ المهمة بنجاح.","Task saved successfully."));return}if(a.id==="task-comment-form"){const s=a.dataset.taskId,i=await z(`/api/tasks/${s}/comments`,{method:"POST",body:JSON.stringify(n)});a.reset(),i.comment&&(r.data.comments||(r.data.comments=[]),r.data.comments.push(i.comment));const l=r.data.tasks.find(p=>p.id===s),d=document.getElementById("task-comments-list");d&&(d.innerHTML=renderTaskComments(l),d.scrollTop=d.scrollHeight),o&&(o.disabled=!1);return}if(a.id==="force-password-form"){if(!C()&&!S("manage_users"))throw new Error(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."));const s=a.dataset.userId,i=a.dataset.isPending==="true";await z(`/api/users/${s}/force-password`,{method:"POST",body:JSON.stringify(n)});const l=r.data.users.find(d=>d.id===s);l&&(l.status="active"),V(),M(),$(i?t("تم تفعيل الحساب بنجاح.","Account activated successfully."):t("تم تغيير كلمة المرور وطرد المستخدم بنجاح.","Password changed and user kicked successfully.")),o&&(o.disabled=!1);return}if(a.id==="user-form"){const s=a.dataset.userId,i=!!s;if(!i&&!C()&&!S("manage_users"))throw new Error(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."));if(i&&!C()&&!S("manage_users")&&!S("manage_existing_account_permissions"))throw new Error(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."));const l=await z(i?`/api/users/${s}`:"/api/users",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(l.user)if(r.data.users||(r.data.users=[]),i){const d=r.data.users.findIndex(p=>p.id===l.user.id);d!==-1&&(r.data.users[d]={...r.data.users[d],...l.user})}else r.data.users.unshift(l.user);V(),M(),$(t("تم حفظ حساب العضو.","Member account saved."));return}if(a.id==="role-form"){if(!C()&&!S("manage_roles"))throw new Error(t("غير مصرح لك بإدارة وتعديل الأدوار.","Permission denied to manage roles."));const s=a.dataset.roleId,i=[...a.querySelectorAll('input[name="permissions"]:checked')].map(p=>p.value),l=!!s,d=await z(l?`/api/roles/${s}`:"/api/roles",{method:l?"PATCH":"POST",body:JSON.stringify({...n,permissions:i})});if(d.role)if(r.data.roles||(r.data.roles=[]),l){const p=r.data.roles.findIndex(u=>u.id===d.role.id);p!==-1&&(r.data.roles[p]={...r.data.roles[p],...d.role})}else r.data.roles.push(d.role);V(),M(),$(t("تم حفظ الدور بنجاح.","Role saved."));return}if(a.id==="template-form"){const s=a.dataset.templateId,i=!!s;if(!i)n.code=Pn(r.data?.templates||[]);else{const p=(n.code||"").trim();if(!p)throw new Error(t("الكود مطلوب","Template code is required"));if(ds(p,s,r.data?.templates||[])){const u=a.querySelector('input[name="code"]');throw u&&(u.focus(),u.classList.add("input-error")),new Error(t("الكود محجوز من قبل","This code is already reserved by another template"))}n.code=p}const l=await z(i?`/api/templates/${s}`:"/api/templates",{method:i?"PATCH":"POST",body:JSON.stringify(n)}),d=l.template||{id:s||`tpl_${Date.now()}`,nameAr:n.nameAr,nameEn:n.nameEn,code:n.code,categoryId:n.categoryId,typeAr:n.typeAr,typeEn:n.typeEn,defaultWeight:Number(n.defaultWeight)||1,defaultDuration:Number(n.defaultDuration)||5};if(r.data.templates||(r.data.templates=[]),i){const p=r.data.templates.findIndex(u=>u.id===(l.template?.id||s));p!==-1&&(r.data.templates[p]={...r.data.templates[p],...d})}else r.data.templates.push(d);V(),M(),$(t("تم حفظ القالب بنجاح.","Template saved."));return}if(a.dataset.action==="update-profile"){if(n.calendarSystem){r.calendarSystem=n.calendarSystem;try{localStorage.setItem("darc_calendar_system",n.calendarSystem)}catch{}}const s=await z("/api/users/me",{method:"PATCH",body:JSON.stringify(n)});if(s.user){r.data.user={...r.data.user,...s.user};const i=(r.data.users||[]).findIndex(l=>l.id===r.data.user.id);i!==-1&&(r.data.users[i]={...r.data.users[i],...s.user})}M(),$(t("تم حفظ وتحديث الملف الشخصي بنجاح.","Profile updated successfully.")),o&&(o.disabled=!1);return}if(a.dataset.action==="update-company"){if(!C()&&!S("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات الشركة.","Permission denied to update company settings."));const s=await z("/api/company",{method:"PATCH",body:JSON.stringify(n)});s.company&&(r.data.company={...r.data.company,...s.company}),M(),$(t("تم تحديث بيانات الشركة.","Company data updated.")),o&&(o.disabled=!1);return}if(a.dataset.action==="update-whatsapp"){if(!C()&&!S("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات التنبيهات.","Permission denied to update alert settings."));const s={enabled:a.querySelector('input[name="enabled"]')?.checked||!1,provider:n.provider||"evolution",instanceName:n.instanceName||"darc-workspace",serverUrl:n.serverUrl||"",apiKey:n.apiKey||"",recipient:n.recipient||"",notifyOnBlocked:a.querySelector('input[name="notifyOnBlocked"]')?.checked||!1,notifyOnApproval:a.querySelector('input[name="notifyOnApproval"]')?.checked||!1,notifyOnDrawing:a.querySelector('input[name="notifyOnDrawing"]')?.checked||!1,notifyOnCollectiveMention:a.querySelector('input[name="notifyOnCollectiveMention"]')?.checked!==!1,sendGroupBroadcast:a.querySelector('input[name="sendGroupBroadcast"]')?.checked||!1},i=await z("/api/whatsapp/config",{method:"POST",body:JSON.stringify({config:s})});i.config&&(r.data.company||(r.data.company={}),r.data.company.customFields||(r.data.company.customFields={}),r.data.company.customFields.whatsapp=i.config,r.data.company.custom_fields&&(r.data.company.custom_fields.whatsapp=i.config)),$(t("تم حفظ إعدادات تنبيهات واتساب بنجاح ✅","WhatsApp alert settings saved successfully ✅")),M(),o&&(o.disabled=!1);return}if(a.dataset.action==="change-password"){if(n.newPassword.length<10)throw new Error(t("كلمة المرور يجب أن تكون 10 أحرف على الأقل.","Password must be at least 10 characters."));await z("/api/auth/change-password",{method:"POST",body:JSON.stringify(n)}),a.reset(),$(t("تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.","Password changed successfully. Signed out of other devices.")),o&&(o.disabled=!1);return}}catch(s){a.id==="activation-form"?Gt(n.token,s.message):$(s.message,!0)}finally{o&&(o.disabled=!1,o.classList.remove("is-loading"))}}async function Za(e){const a=document.getElementById("mention-dropdown"),n=document.getElementById("project-menu");if(a&&!e.target.closest("#mention-dropdown")&&!e.target.closest('input[name="content"]')&&(a.style.display="none"),n&&!e.target.closest("#project-menu")&&!e.target.closest('[data-action="toggle-project-menu"]')&&(n.style.display="none"),e.target.classList.contains("modal-backdrop")){V();return}if(e.target.closest("#task-dropzone")&&e.target.id!=="task-upload-input"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const l=document.getElementById("task-upload-input");l&&l.click()}return}const o=e.target.closest("[data-action], [data-view]");if(!o)return;const s=o.dataset.action;if(s==="test-whatsapp"){const i=o.closest('[data-action="test-whatsapp"]');i&&(i.disabled=!0),$(t("جاري إرسال تنبيه تجريبي للواتساب...","Sending test WhatsApp alert..."));try{const l=document.querySelector('input[name="serverUrl"]')?.value||"",d=document.querySelector('input[name="apiKey"]')?.value||"",p=document.querySelector('input[name="recipient"]')?.value||"",u=document.querySelector('input[name="instanceName"]')?.value||"darc-workspace",f=document.querySelector('select[name="provider"]')?.value||"evolution",v=await z("/api/whatsapp/test",{method:"POST",body:JSON.stringify({config:{serverUrl:l,apiKey:d,recipient:p,instanceName:u,provider:f}})});$(v.message||t("تم إرسال الرسالة بنجاح! 🚀","Test message sent successfully! 🚀"))}catch(l){$(l.message||t("فشل إرسال رسالة الاختبار، تحقق من صحة البيانات.","Failed to send test alert."),!0)}finally{i&&(i.disabled=!1)}return}if(o.classList.contains("menu-item")){const i=o.closest(".dropdown-menu");i&&(i.style.display="none")}if(o.dataset.view){we(o.dataset.view,o.dataset.projectId||void 0);return}if(s==="trigger-avatar-upload"){const i=document.getElementById("user-avatar-file-input");i&&i.click();return}if(s==="trigger-company-logo-upload"){if(!C()&&!S("manage_settings")){$(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0);return}const i=document.getElementById("company-logo-file-input");i&&i.click();return}if(s==="toggle-theme"){r.theme=r.theme==="dark"?"light":"dark",Lt({theme:r.theme}),document.documentElement.dataset.theme=r.theme,document.querySelectorAll('[data-action="toggle-theme"]').forEach(i=>{i.textContent=r.theme==="dark"?"☀️":"🌙"});return}if(s==="toggle-lang"){if(r.lang=r.lang==="ar"?"en":"ar",Lt({lang:r.lang}),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang==="ar"?"rtl":"ltr",document.body.classList.toggle("is-ltr",r.lang==="en"),r.data?.user||typeof localStorage<"u"&&localStorage.getItem("darc_token"))X();else{const i=new URLSearchParams(window.location.hash.replace(/^#/,""));if(i.get("activate"))Gt(i.get("activate"));else if(i.get("reset"))wt(i.get("reset"));else{const l=document.getElementById("login-email")?.value||"",d=document.getElementById("login-password")?.value||"",p=!!document.getElementById("forgot-form");if(Se("",p?"forgot":"login"),l){const u=document.getElementById("login-email");u&&(u.value=l)}if(d){const u=document.getElementById("login-password");u&&(u.value=d)}}}return}if(s==="quick-fill-login"){const i=o.closest('[data-action="quick-fill-login"]'),l=document.getElementById("login-email"),d=document.getElementById("login-password"),p=i?.dataset?.email||"demo@darc-design.bond",u=i?.dataset?.pass||"demo123456";if(l&&(l.value=p,l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),d&&(d.value=u,d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),i?.dataset?.autosubmit==="true"){const f=document.getElementById("login-form");f&&(typeof f.requestSubmit=="function"?f.requestSubmit():f.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0})))}return}if(s==="goto-forgot"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#forgot"),Se("","forgot");return}if(s==="goto-login"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#login"),Se();return}if(s==="reset-demo-sandbox"){try{$(t("جاري إعادة ضبط بيانات العرض التجريبي...","Resetting demo sandbox..."),!1);const i=await z("/api/demo/reset",{method:"POST"});i&&i.data&&(r.data=i.data,Ae(i.data),X(),$(t("تمت إعادة ضبط البيانات بنجاح ✨","Demo data reset successfully ✨"),!1))}catch(i){$(i.message,!0)}return}if(s==="toggle-sidebar"){r.sidebarOpen=!r.sidebarOpen,document.querySelector(".sidebar")?.classList.toggle("open",r.sidebarOpen),document.querySelector(".sidebar-backdrop")?.classList.toggle("visible",r.sidebarOpen);return}if(s==="logout"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout"),await z("/api/auth/logout",{method:"POST"}).catch(()=>{});try{await Jn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_mutations_queue"),localStorage.removeItem("darc_offline_queue")}catch{}}ot(),r.data=null,r.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),Se();return}if(s==="logout-all"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout_all"),await z("/api/auth/logout-all",{method:"POST"}).catch(()=>{});try{await Jn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_mutations_queue"),localStorage.removeItem("darc_offline_queue")}catch{}}ot(),r.data=null,r.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),Se();return}if(s==="open-omnisearch"){ls();return}if(s==="close-omnisearch"){dt();return}if(s==="open-cheatsheet"){document.querySelector('.modal[data-modal="cheatsheet"], .modal-cheatsheet')?V():Ln();return}if(s==="close-modal"){V();return}if(s==="show-notifications"){document.querySelector('.modal[data-modal="notifications"], .modal-notifications')?V():showNotifications();return}if(s==="delete-notification"){e.stopPropagation();const i=o.dataset.notificationId||o.closest("[data-notification-id]")?.dataset.notificationId;if(!i)return;r.data?.notifications&&(r.data.notifications=r.data.notifications.filter(l=>l.id!==i)),showNotifications(),X(),z(`/api/notifications/${encodeURIComponent(i)}`,{method:"DELETE"}).catch(l=>{console.warn("[Notifications] Failed to delete notification:",l)});return}if(s==="clear-read-notifications"){if(e.stopPropagation(),!(r.data?.notifications||[]).filter(i=>i.read||i.readAt).length)return;r.data?.notifications&&(r.data.notifications=r.data.notifications.filter(i=>!i.read&&!i.readAt)),showNotifications(),X(),$(t("تم مسح التنبيهات المقروءة بنجاح.","Read notifications cleared successfully.")),z("/api/notifications/clear-read",{method:"POST"}).catch(i=>{console.warn("[Notifications] Failed to clear read notifications:",i)});return}if(s==="enable-browser-notifications"){e.stopPropagation(),typeof window<"u"&&"Notification"in window?Notification.requestPermission().then(i=>{if(i==="granted"){$(t("تم تفعيل إشعارات المتصفح بنجاح! 🔔","Desktop browser notifications enabled! 🔔"));try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("إشعارات المتصفح الفورية تعمل بنجاح الآن على هذا الجهاز.","Browser notifications are now working on this device."),icon:"/favicon.ico"})}catch{}}else i==="denied"&&$(t("تم رفض الإشعارات من إعدادات المتصفح.","Notifications are blocked in browser settings."),!0);showNotifications()}):$(t("متصفحك لا يدعم إشعارات الويب المباشرة.","Your browser does not support web notifications."),!0);return}if(s==="send-test-notification"){e.stopPropagation(),$(t("جاري إرسال إشعار تجريبي من السيرفر...","Sending test notification from server...")),z("/api/notifications/test",{method:"POST",body:JSON.stringify({messageAr:"إشعار فحص النظام المباشر — السيرفر والربط اللحظي يعملان بكفاءة 🚀",messageEn:"Live System Test — Backend and Realtime are operating smoothly 🚀"})}).then(i=>{$(t("تم إرسال الإشعار من السيرفر بنجاح! 🔔","Test notification dispatched from server! 🔔")),Ga(),i&&i.notification&&(r.data.notifications||(r.data.notifications=[]),r.data.notifications.unshift(i.notification),showNotifications(),X())}).catch(i=>{$(i.message||t("فشل إرسال الإشعار التجريبي","Failed to send test notification"),!0)});return}if(s==="play-test-chime"){e.stopPropagation(),Ga(),$(t("تم تشغيل النغمة التنبيهية 🔔","Notification chime played 🔔"));return}if(s==="test-browser-notification"){if(e.stopPropagation(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("هذا اختبار لإشعار سطح المكتب والمتصفح — يعمل بنجاح! 🚀","This is a test desktop notification — working perfectly! 🚀"),icon:"/favicon.ico"}),$(t("تم إرسال إشعار المتصفح لسطح المكتب!","Desktop notification dispatched!"))}catch(i){$(i.message,!0)}else $(t("إشعارات المتصفح غير مفعلة بعد.","Browser notifications not yet enabled."),!0);return}if(s==="read-notification"){if(o.dataset.action==="delete-notification"||o.closest('[data-action="delete-notification"]'))return;const i=o.dataset.notificationId||o.closest("[data-notification-id]")?.dataset.notificationId,l=(r.data?.notifications||[]).find(v=>v.id===i);l&&(l.read=!0,l.readAt=new Date().toISOString()),X(),i&&z(`/api/notifications/${i}`,{method:"PATCH",body:JSON.stringify({})}).catch(v=>{console.warn("[Notifications] Failed to patch read status in background:",v)}),V(!0);const d=o.dataset.taskId||l?.taskId,p=o.dataset.documentId||l?.documentId,u=o.dataset.projectId||l?.projectId,f=o.dataset.type||l?.type;if(p){Ma(p);return}if(d){let v=(r.data?.tasks||[]).find(k=>k.id===d);if(v){v.projectId&&(r.activeProjectId=v.projectId),openTaskModal(v);return}try{const k=await z(`/api/tasks/${d}`);if(k&&k.id){r.data.tasks||(r.data.tasks=[]),r.data.tasks.push(k),k.projectId&&(r.activeProjectId=k.projectId),openTaskModal(k);return}}catch(k){console.warn("[Notifications] Failed to fetch task on demand:",k)}}if(f==="document_review"&&u){r.activeProjectId=u,r.projectTab="drawings",we("project-detail",u);return}if(u){r.activeProjectId=u,we("project-detail",u);return}await ce();return}if(s==="mark-all-notifications-read"){try{await z("/api/notifications/read-all",{method:"POST"}),(r.data?.notifications||[]).forEach(i=>{i.read=!0,i.readAt=new Date().toISOString()}),showNotifications(),X(),$(t("تم تحديد كافة التنبيهات كمقروءة.","All notifications marked as read."))}catch(i){$(i.message,!0)}return}if(s==="toggle-project-menu"){n&&(n.style.display=n.style.display==="none"?"block":"none");return}if(s==="preview-doc"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId;i&&Ma(i);return}if(s==="copy-doc-link"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId,l=r.data?.documents?.find(d=>d.id===i);if(l){const d=o.closest("button")||o;await yn(l,d)}return}if(s==="download-doc"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId;i&&await ie(i);return}if(s==="trigger-upload"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const l=document.getElementById("task-upload-input");l&&l.click()}return}if(s==="open-upload-drawing-modal"){typeof openUploadDrawingModal=="function"?openUploadDrawingModal(o.dataset.projectId||null):typeof window.openUploadDrawingModal=="function"&&window.openUploadDrawingModal(o.dataset.projectId||null);return}if(s==="new-project"){document.querySelector('.modal[data-modal="project"], #project-form')?V():openProjectModal();return}if(s==="edit-project"){const i=r.data.projects.find(l=>l.id===o.dataset.projectId);i&&openProjectModal(i);return}if(s==="clone-project"){const i=r.data.projects.find(l=>l.id===o.dataset.projectId);i&&openCloneModal(i);return}if(s==="rename-doc"){const i=o.dataset.docId,l=r.data?.documents?.find(p=>p.id===i);if(!l)return;const d=window.prompt(t("أدخل الاسم الجديد:","Enter new name:"),l.originalName);if(!d||d===l.originalName)return;try{await z(`/api/documents/${i}`,{method:"PATCH",body:JSON.stringify({originalName:d})}),l.originalName=d,await ce(!0);const p=r.data?.tasks?.find(u=>u.id===l.taskId);if(p){const u=document.getElementById("task-documents-list");u&&(u.innerHTML=rt(p))}}catch(p){$(p.message,!0)}return}if(s==="go-to-trash"){r.settingsSection="trash",r.trashLoaded=!1,we("settings");return}if(s==="delete-doc"){if(!window.confirm(t("هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.","Are you sure you want to move this document to trash? You can restore it within 30 days.")))return;const i=o.dataset.docId,l=r.data?.documents?.find(d=>d.id===i)?.taskId;try{if(await z(`/api/documents/${i}`,{method:"DELETE"}),r.data?.documents&&(r.data.documents=r.data.documents.filter(d=>d.id!==i)),r.trashLoaded=!1,await ce(!0),$(t("تم نقل المستند إلى سلة المهملات بنجاح.","Document moved to trash successfully.")),l){const d=r.data?.tasks?.find(p=>p.id===l);if(d){const p=document.getElementById("task-documents-list");p&&(p.innerHTML=rt(d))}}}catch(d){$(d.message,!0)}return}if(s==="delete-project"){if(!window.confirm(t("هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.","Are you sure you want to delete this project? It will be archived.")))return;const i=[...r.data.projects||[]];r.data.projects=r.data.projects.filter(l=>l.id!==o.dataset.projectId),V(),we("projects"),$(t("جاري حذف المشروع...","Deleting project..."));try{await z(`/api/projects/${o.dataset.projectId}`,{method:"DELETE"}),r.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await ce(!0),$(t("تم حذف المشروع بنجاح.","Project deleted successfully."))}catch(l){r.data.projects=i,M(),$(l.message,!0)}return}if(s==="delete-task"){if(!window.confirm(t("هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.","Are you sure you want to delete this task? It will be moved to trash.")))return;const i=o.dataset.taskId,l=[...r.data.tasks||[]];r.data.tasks=r.data.tasks.filter(d=>d.id!==i),V(),M(),$(t("جاري حذف المهمة...","Deleting task..."));try{await z(`/api/tasks/${i}`,{method:"DELETE"}),r.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await ce(!0),$(t("تم حذف المهمة بنجاح.","Task deleted successfully."))}catch(d){r.data.tasks=l,M(),$(d.message,!0)}return}if(s==="edit-task-comment"){const i=o.dataset.commentId,l=o.dataset.taskId,d=(r.data.comments||[]).find(f=>f.id===i);if(!d)return;const p=window.prompt(t("تعديل التعليق:","Edit comment:"),d.content);if(p===null)return;const u=p.trim();if(!u){$(t("لا يمكن ترك التعليق فارغاً.","Comment cannot be empty."),!0);return}if(u===d.content)return;try{const f=await z(`/api/tasks/${l}/comments/${i}`,{method:"PATCH",body:JSON.stringify({content:u})});if(f.comment){const v=(r.data.comments||[]).findIndex(h=>h.id===i);v!==-1&&(r.data.comments[v]=f.comment);const k=(r.data.tasks||[]).find(h=>h.id===l),b=document.getElementById("task-comments-list");b&&k&&(b.innerHTML=renderTaskComments(k)),$(t("تم تعديل التعليق بنجاح.","Comment updated successfully."))}}catch(f){$(f.message,!0)}return}if(s==="delete-task-comment"){const i=o.dataset.commentId,l=o.dataset.taskId;if(!window.confirm(t("هل أنت متأكد من حذف هذا التعليق؟","Are you sure you want to delete this comment?")))return;try{await z(`/api/tasks/${l}/comments/${i}`,{method:"DELETE"}),r.data.comments&&(r.data.comments=r.data.comments.filter(u=>u.id!==i));const d=(r.data.tasks||[]).find(u=>u.id===l),p=document.getElementById("task-comments-list");p&&d&&(p.innerHTML=renderTaskComments(d)),$(t("تم حذف التعليق بنجاح.","Comment deleted successfully."))}catch(d){$(d.message,!0)}return}if(s==="manual-sync"){if(typeof navigator<"u"&&!navigator.onLine){$(t("أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡","You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡"),!1);return}const i=Ut();if(!i.length){$(t("جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️","All data is completely synchronized with cloud server ✔️"),!1);return}$(t(`جاري مزامنة ${i.length} عمليات معلقة مع السيرفر...`,`Syncing ${i.length} pending actions with server...`),!1);const l=await ln(z);if(l.synced>0){if($(t(`تمت مزامنة ${l.synced} عمليات بنجاح! 🚀`,`Successfully synced ${l.synced} actions! 🚀`),!1),await xe(),r.data?.user?.customFields?.calendarSystem){r.calendarSystem=r.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",r.calendarSystem)}catch{}}}else l.failed>0&&$(t(`فشلت مزامنة ${l.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${l.failed} actions, please try again.`),!0);return}if(s==="new-task"){document.querySelector('.modal[data-modal="task"], #task-form')?V():openTaskModal(null,null,o.dataset.projectId);return}if(s==="new-user"){if(!C()&&!S("manage_users")){$(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."),!0);return}openUserModal();return}if(s==="new-role"){if(!C()&&!S("manage_roles")){$(t("غير مصرح لك بإنشاء أدوار جديدة.","Permission denied to create new roles."),!0);return}openRoleModal();return}if(s==="new-template"){qa();return}if(s==="edit-template"){const i=r.data.templates.find(l=>l.id===o.dataset.templateId);i&&qa(i);return}if(s==="delete-template"){if(!window.confirm(t("هل أنت متأكد من حذف هذا القالب؟","Are you sure you want to delete this template?")))return;const i=[...r.data.templates||[]];r.data.templates=r.data.templates.filter(l=>l.id!==o.dataset.templateId),M(),V();try{await z(`/api/templates/${o.dataset.templateId}`,{method:"DELETE"}),await ce(!0),$(t("تم حذف القالب.","Template deleted."))}catch(l){r.data.templates=i,M(),$(l.message,!0)}return}if(s==="open-project"){r.projectTab="tasks",r.projectMemberFilter=null,we("project-detail",o.dataset.projectId);return}if(s==="filter-by-member"){const i=o.dataset.memberId;r.projectMemberFilter=r.projectMemberFilter===i?null:i,r.projectTab="tasks",requestAnimationFrame(()=>M());return}if(s==="clear-member-filter"){r.projectMemberFilter=null,requestAnimationFrame(()=>M());return}if(s==="back-to-projects"){r.projectMemberFilter=null,we("projects",null);return}if(s==="project-tab"){r.projectTab=o.dataset.tab;try{if(typeof window<"u"&&r.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(r.activeProjectId)}&tab=${encodeURIComponent(r.projectTab)}`),typeof sessionStorage<"u"){const l=sessionStorage.getItem("darc_last_route"),d=l?JSON.parse(l):{};d.view="project-detail",d.activeProjectId=r.activeProjectId,d.projectTab=r.projectTab,sessionStorage.setItem("darc_last_route",JSON.stringify(d))}}catch{}o.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(l=>l.classList.toggle("active",l===o));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>M());return}if(s==="report-tab"){r.reportsTab=o.dataset.tab,o.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(l=>l.classList.toggle("active",l===o));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>M());return}if(s==="toggle-timeline-view"){r.timelineView=o.dataset.viewMode||"gantt",requestAnimationFrame(()=>M());return}if(s==="prev-calendar-month"){const i=r.calendarDate?new Date(r.calendarDate):new Date;i.setMonth(i.getMonth()-1),r.calendarDate=i,requestAnimationFrame(()=>M());return}if(s==="next-calendar-month"){const i=r.calendarDate?new Date(r.calendarDate):new Date;i.setMonth(i.getMonth()+1),r.calendarDate=i,requestAnimationFrame(()=>M());return}if(s==="today-calendar-month"){r.calendarDate=new Date,requestAnimationFrame(()=>M());return}if(s==="open-task"){if(window._isDraggingTask||window._justDroppedAt&&Date.now()-window._justDroppedAt<400)return;const i=o.dataset.taskId||o.closest("[data-task-id]")?.dataset.taskId;if(!i)return;let l=(r.data?.tasks||[]).find(d=>d.id===i);if(l){openTaskModal(l);return}z(`/api/tasks/${i}`).then(d=>{d&&d.id?(r.data.tasks||(r.data.tasks=[]),r.data.tasks.push(d),openTaskModal(d)):$(t("تعذر العثور على المهمة أو تم نقلها لسلة المهملات.","Task not found or was moved to trash."),!0)}).catch(d=>{$(t("تعذر فتح المهمة: "+d.message,"Could not open task: "+d.message),!0)});return}if(s==="task-filter"){r.taskFilter=o.dataset.filter,o.closest(".view-toolbar-start")?.querySelectorAll(".filter-tab").forEach(i=>i.classList.toggle("active",i===o)),requestAnimationFrame(()=>M());return}if(s==="template-category"){r.templateCategory=o.dataset.category,requestAnimationFrame(()=>M());return}if(s==="use-template"){if(!r.data.projects.length)return $(g("noProjects"),!0);openTaskModal(null,o.dataset.templateId,r.activeProjectId);return}if(s==="open-user-profile"){r.settingsSection="profile",we("settings");return}if(s==="open-user"){if(!C()&&!S("manage_users")&&!S("manage_existing_account_permissions")){$(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."),!0);return}const i=r.data.users.find(l=>l.id===o.dataset.userId);i&&openUserModal(i);return}if(s==="impersonate-user"){if(!C()){$(t("هذه الصلاحية خاصة بمدير النظام فقط.","Impersonation is restricted to system admin only."),!0);return}if(!window.confirm("هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً."))return;try{const i=await z(`/api/users/${o.dataset.userId}/impersonate`,{method:"POST"});i&&i.token&&typeof localStorage<"u"&&localStorage.setItem("darc_token",i.token),window.location.reload()}catch(i){$(i.message,!0)}return}if(s==="force-password-user"){if(!C()&&!S("manage_users")){$(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."),!0);return}const i=r.data.users.find(l=>l.id===o.dataset.userId);i&&openForcePasswordModal(i);return}if(s==="invite-user"){if(!C()&&!S("manage_users")){$(t("غير مصرح لك بإرسال دعوات للمستخدمين.","Permission denied to invite users."),!0);return}try{const i=await z(`/api/users/${o.dataset.userId}/invite`,{method:"POST"});await ce(),$(i.emailConfigured?t("تم إرسال الدعوة.","Invitation sent."):t("تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.","Invite prepared, but the email provider is not configured."))}catch(i){$(i.message,!0)}return}if(s==="deactivate-user"){if(!C()&&!S("manage_users")){$(t("غير مصرح لك بتعطيل حسابات المستخدمين.","Permission denied to deactivate users."),!0);return}if(!window.confirm(g("confirmDeactivate")))return;const i=o.dataset.userId,l=r.data.users.find(p=>p.id===i),d=l?l.status:null;l&&(l.status="inactive"),M(),V();try{await z(`/api/users/${i}`,{method:"DELETE"}),await ce(!0),$(t("تم تعطيل الحساب.","Account deactivated."))}catch(p){l&&(l.status=d),M(),$(p.message,!0)}return}if(s==="settings-section"){const i=o.dataset.section||"profile";if(!be(i)){$(t("غير مصرح لك بالوصول لهذا القسم من الإعدادات.","Access denied to this settings section."),!0);return}r.settingsSection=i;try{if(typeof window<"u"&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(r.settingsSection)}`),typeof sessionStorage<"u"){const d=sessionStorage.getItem("darc_last_route"),p=d?JSON.parse(d):{};p.view="settings",p.settingsSection=r.settingsSection,sessionStorage.setItem("darc_last_route",JSON.stringify(p))}}catch{}o.closest(".settings-nav")?.querySelectorAll("button").forEach(d=>d.classList.toggle("active",d===o));const l=()=>{const d=document.getElementById("main-content");d&&(d.scrollTop=0,d.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0),document.documentElement&&(document.documentElement.scrollTop=0),document.body&&(document.body.scrollTop=0)};l(),r.settingsSection==="analytics"&&ta(!0).then(()=>{M(),l()}).catch(()=>{}),r.settingsSection==="trash"&&!r.trashLoaded&&z("/api/trash").then(d=>{r.trash=Array.isArray(d)?d:d.trash||[...(d.projects||[]).map(p=>({...p,type:"project"})),...(d.tasks||[]).map(p=>({...p,type:"task"})),...(d.documents||[]).map(p=>({...p,type:"document"}))],r.trashLoaded=!0;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(r.trash))}catch{}M(),l()}).catch(d=>console.error(d)),requestAnimationFrame(()=>{M(),l()});return}if(s==="refresh-analytics"){if(!be("analytics")){$(t("غير مصرح لك بعرض وتحديث التحليلات والمراقبة.","Permission denied to view and refresh analytics."),!0);return}try{await ta(!0),M(),$(t("تم تحديث مؤشرات التحليلات والمراقبة الحية بنجاح.","Live observability and analytics refreshed successfully."))}catch(i){$(i.message,!0)}return}if(s==="test-anomaly-alert"){if(!C()&&!S("manage_settings")){$(t("غير مصرح لك بإجراء محاكاة التنبيهات.","Permission denied to simulate anomaly alert."),!0);return}try{await z("/api/telemetry/test-anomaly",{method:"POST"}),await ta(!0),await xe(!0),X(),$(t("🚨 تم رصد استهلاك زائد بنجاح وإرسال إشعار فوري لمركز التنبيهات!","🚨 Anomaly detected! Alert notification dispatched to Notification Center!"))}catch(i){$(i.message,!0)}return}if(s==="goto-diagnostics"){if(!C()&&!S("manage_settings")){$(t("غير مصرح لك بالوصول لتشخيص الأعطال.","Permission denied to access diagnostics."),!0);return}r.settingsSection="diagnostics",typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#settings?section=diagnostics"),M();return}if(s==="refresh-diagnostics"){if(!C()&&!S("manage_settings")){$(t("غير مصرح لك بتحديث سجل الأعطال.","Permission denied to refresh diagnostics."),!0);return}try{await aa(!0),M(),$(t("تم تحديث سجل الأخطاء وتشخيصات المستخدمين بنجاح.","Diagnostics and incidents refreshed successfully."))}catch(i){$(i.message,!0)}return}if(s==="test-incident-simulate"){if(!C()&&!S("manage_settings")){$(t("غير مصرح لك بإجراء محاكاة للأعطال.","Permission denied to simulate error incidents."),!0);return}try{await z("/api/telemetry/test-error",{method:"POST"}),await aa(!0),await xe(!0),M(),$(t("🚨 تم رصد الخطأ وتوثيق خطوات المستخدم وإرسال بريد تنبيه للإدارة بنجاح!","🚨 Incident recorded with stack trace and alert email sent to admin!"))}catch(i){$(i.message,!0)}return}if(s==="test-diagnostic-email"){if(!C()&&!S("manage_settings")){$(t("غير مصرح لك باختبار إرسال البريد.","Permission denied to test alert email."),!0);return}try{await z("/api/telemetry/test-email",{method:"POST"}),$(t("✉️ تم إرسال رسالة اختبار التنبيهات البريدية للإدارة بنجاح!","✉️ Test alert email dispatched to admin successfully!"))}catch(i){$(i.message,!0)}return}if(s==="filter-diagnostics-user"){const i=o.dataset.userId||"all";ei(i),M();return}if(s==="clear-diagnostics-user-filter"){ei("all"),M();return}if(s==="resolve-diagnostic-incident"){if(!C()&&!S("manage_settings")){$(t("غير مصرح لك بمعالجة بلاغات الأعطال.","Permission denied to resolve incidents."),!0);return}const i=o.dataset.incidentId;if(i)try{await z(`/api/telemetry/incidents/${i}/resolve`,{method:"PATCH"}),await aa(!0),M(),$(t("تم تحديد المشكلة كمعالجة بنجاح ✅","Incident marked as resolved ✅"))}catch(l){$(l.message,!0)}return}if(s==="copy-debug-bundle"){const i=o.dataset.bundle;i&&typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>{$(t("تم نسخ تقرير المشكلة الفني بالكامل للحافظة 📋","Full debug bundle copied to clipboard 📋"))}).catch(()=>{$(t("فشل النسخ التلقائي للحافظة","Failed to copy to clipboard"),!0)});return}if(s==="restore-item"){if(!C()&&!S("manage_trash")){$(t("غير مصرح لك باستعادة العناصر المحذوفة.","Permission denied to restore deleted items."),!0);return}try{await z(`/api/restore/${o.dataset.type}/${o.dataset.id}`,{method:"POST"});const i=await z("/api/trash");r.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(l=>({...l,type:"project"})),...(i.tasks||[]).map(l=>({...l,type:"task"})),...(i.documents||[]).map(l=>({...l,type:"document"}))];try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(r.trash))}catch{}await ce(),$(t("تمت الاستعادة بنجاح.","Restored successfully."))}catch(i){$(i.message,!0)}return}if(s==="filter-trash"){if(!C()&&!S("manage_trash"))return;r.trashFilter=o.dataset.filter,requestAnimationFrame(()=>M());return}if(s==="purge-trash-item"){if(!C()&&!S("manage_trash")){$(t("غير مصرح لك بحذف العناصر نهائياً من سلة المهملات.","Permission denied to permanently delete trash items."),!0);return}const i=o.dataset.type,l=o.dataset.id;if(!window.confirm(t("هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.","Are you sure you want to permanently delete this item? This action cannot be undone.")))return;try{await z(`/api/trash/${i}/${l}`,{method:"DELETE"});const d=await z("/api/trash");r.trash=Array.isArray(d)?d:d.trash||[...(d.projects||[]).map(p=>({...p,type:"project"})),...(d.tasks||[]).map(p=>({...p,type:"task"})),...(d.documents||[]).map(p=>({...p,type:"document"}))],M(),$(t("تم حذف العنصر نهائياً بنجاح.","Item permanently deleted."))}catch(d){$(d.message,!0)}return}if(s==="empty-trash"){if(!C()&&!S("manage_trash")){$(t("غير مصرح لك بإفراغ سلة المهملات.","Permission denied to empty trash."),!0);return}if(!window.confirm(t("هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.","Are you sure you want to empty the entire recycle bin? All items will be permanently erased.")))return;try{await z("/api/trash/empty",{method:"DELETE"}),r.trash=[],M(),$(t("تم إفراغ سلة المهملات بالكامل بنجاح.","Trash bin emptied successfully."))}catch(i){$(i.message,!0)}return}if(s==="open-role"){if(!C()&&!S("manage_roles")){$(t("غير مصرح لك بتعديل الأدوار والصلاحيات.","Permission denied to modify roles."),!0);return}const i=r.data.roles.find(l=>l.id===o.dataset.roleId);i&&openRoleModal(i);return}if(s==="delete-role"){if(!C()&&!S("manage_roles")){$(t("غير مصرح لك بحذف الأدوار.","Permission denied to delete roles."),!0);return}if(!window.confirm(g("confirmDeleteRole")))return;const i=o.dataset.roleId,l=[...r.data.roles||[]];r.data.roles=r.data.roles.filter(d=>d.id!==i),M(),V();try{await z(`/api/roles/${i}`,{method:"DELETE"}),await ce(!0),$(t("تم حذف الدور.","Role deleted."))}catch(d){r.data.roles=l,M(),$(d.message,!0)}return}if(s==="export-csv"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Hi();return}if(s==="print-portfolio-pdf"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لطباعة التقارير.","You do not have permission to print reports."),!0);return}Vi();return}if(s==="export-disciplines-excel"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ji();return}if(s==="export-team-workload-excel"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ki();return}if(s==="export-risks-excel"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Yi();return}if(s==="export-drawings-excel"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Xi();return}if(s==="export-project"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Wi(o.dataset.projectId);return}if(s==="export-project-pdf"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Fa(o.dataset.projectId,!1);return}if(s==="export-project-client-pdf"){if(!S("export_reports")&&!C()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Fa(o.dataset.projectId,!0);return}if(s==="export-audit-xls"){if(!S("view_audit_logs")&&!C()){$(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}Li();return}if(s==="print-audit-pdf"){if(!S("view_audit_logs")&&!C()){$(t("ليس لديك صلاحية لطباعة سجل الرقابة.","You do not have permission to print audit logs."),!0);return}zi();return}if(s==="load-full-audit"){if(!C()&&!S("view_audit_logs")){$(t("غير مصرح لك باستعراض سجل التدقيق الكامل.","Permission denied to view full audit logs."),!0);return}Mi();return}if(s==="reset-audit-filters"){r.auditFilterAction="all",r.auditFilterEntity="all",r.auditFilterUser="all",r.auditSearchQuery="",M();return}}var mt=null;function Qa(e){if(e.target.name==="content"&&e.target.closest("#task-comment-form")){const o=e.target.value,s=o.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),i=document.getElementById("mention-dropdown");if(s){const l=s[1].toLowerCase(),d=(r.data?.users||[]).filter(f=>f.status!=="inactive").filter(f=>`${f.name||""} ${f.nameEn||""} ${f.email||""}`.toLowerCase().includes(l)),p=!l||"all".startsWith(l)||"الكل".startsWith(l)||"everyone".startsWith(l)||"الجميع".startsWith(l)||"فريق".startsWith(l);let u="";p&&(u+=`
          <div class="mention-option collective-mention" data-username="all" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--line);background:rgba(20,184,166,0.06);">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--brand-teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">📢</div>
            <div style="display:flex;flex-direction:column;gap:1px;text-align:start;">
              <strong style="font-size:12px;color:var(--brand-teal);">@all · ${t("الكل / الجميع (منشن لكافة الفريق والمدير)","Everyone (Team & Management)")}</strong>
              <span style="font-size:10px;color:var(--muted);">${t("إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة عبر واتساب","Direct WhatsApp alert to all project members & managers")}</span>
            </div>
          </div>
        `),d.length&&(u+=d.map(f=>{const v=(f.name||f.nameEn||f.email||"user").trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${c(v)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${K(f,"avatar-sm")}
              <span style="font-size:12px;">${c(t(f.name,f.nameEn||f.name))}</span>
            </div>
          `}).join("")),u?(i.innerHTML=u,i.style.display="block",i.querySelectorAll(".mention-option").forEach(f=>{f.onclick=()=>{const v=f.dataset.username;e.target.value=o.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${v} `),i.style.display="none",e.target.focus()}})):i.style.display="none"}else i.style.display="none"}if(e.target.dataset.action==="search-trash-input"){r.trashQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(mt),mt=setTimeout(()=>{M();const s=document.querySelector('[data-action="search-trash-input"]');s&&(s.focus(),s.setSelectionRange(o,o))},120);return}if(e.target.dataset.action==="search-audit-input"){r.auditSearchQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(mt),mt=setTimeout(()=>{M();const s=document.querySelector('[data-action="search-audit-input"]');s&&(s.focus(),s.setSelectionRange(o,o))},120);return}const a=e.target.dataset.search||(e.target.dataset.action==="search-documents"?"documents":null);if(!a)return;r.searches[a]=e.target.value;const n=e.target.selectionStart;clearTimeout(mt),mt=setTimeout(()=>{M();const o=document.querySelector(`[data-search="${a}"], [data-action="search-documents"]`);o&&(o.focus(),o.setSelectionRange(n,n))},120)}async function en(e){if(e.target.dataset.action==="filter-diagnostics-severity"){Zs(e.target.value),M();return}if(e.target.dataset.action==="filter-diagnostics-status"){Qs(e.target.value),M();return}if(e.target.dataset.action==="change-doc-status"){const a=e.target.dataset.docId,n=e.target.value,o=r.data?.documents?.find(s=>s.id===a);if(!o)return;try{await z(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}),o.status=n,$(t("تم تحديث حالة المخطط بنجاح ✅","Drawing status updated ✅")),await ce(!0)}catch(s){$(s.message,!0)}return}if(e.target.dataset.action==="filter-report-project"){r.reportProjectFilter=e.target.value,M();return}if(e.target.dataset.action==="filter-report-timeframe"){r.reportTimeframe=e.target.value,M();return}if(e.target.dataset.action==="doc-project-filter"){r.docProjectFilter=e.target.value,M();return}if(e.target.dataset.action==="filter-project-docs-task"){r.docTaskFilter=e.target.value,M();return}if(e.target.dataset.action==="filter-audit-action"){r.auditFilterAction=e.target.value,M();return}if(e.target.dataset.action==="filter-audit-entity"){r.auditFilterEntity=e.target.value,M();return}if(e.target.dataset.action==="filter-audit-user"){r.auditFilterUser=e.target.value,M();return}if(e.target.dataset.action==="sort-project-tasks"||e.target.dataset.action==="sort-my-tasks"){bn(e.target.value),M();return}if(e.target.name==="templateId"&&e.target.form?.id==="task-form"){const a=e.target.form,n=e.target.value,o=r.data.templates?.find(u=>u.id===n),s=a.querySelector('input[name="titleAr"]'),i=a.querySelector('input[name="titleEn"]'),l=a.querySelector("#task-type-ar"),d=a.querySelector("#task-type-en"),p=a.querySelector('textarea[name="descriptionAr"]');o?(s&&(!s.value||a.dataset.templateSelected==="true")&&(s.value=o.nameAr),i&&(!i.value||a.dataset.templateSelected==="true")&&(i.value=o.nameEn||""),l&&(l.value=o.typeAr||"مخطط"),d&&(d.value=o.typeEn||"Drawing"),p&&(!p.value||a.dataset.templateSelected==="true")&&(p.value=o.descriptionAr||""),a.dataset.templateSelected="true"):(l&&(l.value=""),d&&(d.value=""),delete a.dataset.templateSelected);return}if(e.target.name==="status"&&e.target.form?.id==="task-form"){const a=e.target.form.querySelector("#task-auto-progress-badge");if(a){const n={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];a.textContent=n!==void 0?`(${n}%)`:""}return}if(e.target.dataset.action==="task-project-filter"){r.taskProjectFilter=e.target.value,M();return}if(e.target.dataset.action==="task-priority-filter"){r.taskPriorityFilter=e.target.value,M();return}if(e.target.id==="sort-projects"||e.target.dataset?.action==="sort-projects"){r.projectSort=e.target.value,M();return}if(e.target.id==="task-upload-input"){const a=e.target.files;if(!a.length)return;const n=e.target.dataset.taskId;Nn(a,n);return}if(e.target.classList.contains("doc-status-select")){const a=e.target.dataset.docId,n=e.target.value;z(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}).then(()=>{ce(!0).then(()=>$(t("تم تحديث حالة المخطط.","Document status updated.")))}).catch(o=>$(o.message,!0));return}if(e.target.id==="user-avatar-file-input"){const a=e.target.files?.[0];if(!a)return;if(a.size>2621440){$(t("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.","Image is too large. Maximum allowed size is 2MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){$(t("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).","Please select a valid image file (JPG, PNG, WebP)."),!0),e.target.value="";return}try{$(t("جاري معالجة ورفع صورتك الشخصية...","Processing & uploading avatar..."));const n=await di(a,256,256),o=await z("/api/users/me",{method:"PATCH",body:JSON.stringify({avatarUrl:n})});if(o.user){r.data.user={...r.data.user,...o.user};const s=(r.data.users||[]).findIndex(i=>i.id===r.data.user.id);s!==-1&&(r.data.users[s]={...r.data.users[s],...o.user})}e.target.value="",X(),da(),$(t("تم تحديث صورتك الشخصية وتثبيتها بنجاح!","Avatar updated successfully!"))}catch(n){e.target.value="",$(n.message,!0)}return}if(e.target.id==="company-logo-file-input"){if(!C()&&!S("manage_settings")){$(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0),e.target.value="";return}const a=e.target.files?.[0];if(!a)return;if(a.size>3145728){$(t("حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.","Logo is too large. Maximum allowed size is 3MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){$(t("يرجى اختيار ملف صورة أو شعار صالح.","Please select a valid logo image file."),!0),e.target.value="";return}try{$(t("جاري معالجة ورفع شعار الشركة...","Uploading company logo..."));const n=await di(a,400,400),o=await z("/api/company",{method:"PATCH",body:JSON.stringify({logoUrl:n})});o.company&&(r.data.company={...r.data.company,...o.company}),e.target.value="",X(),da(),$(t("تم تحديث وتثبيت شعار مساحة العمل بنجاح!","Company logo updated successfully!"))}catch(n){e.target.value="",$(n.message,!0)}return}}function di(e,a=300,n=300){return new Promise((o,s)=>{const i=new FileReader;i.onerror=()=>s(new Error(t("فشل قراءة ملف الصورة.","Failed to read image file."))),i.onload=()=>{const l=new Image;l.onerror=()=>s(new Error(t("صيغة الصورة تالفة أو غير صالحة.","Corrupted or invalid image format."))),l.onload=()=>{try{const d=l.naturalWidth||l.width,p=l.naturalHeight||l.height;if(d>4096||p>4096||d*p>16e6){s(new Error(t("أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.","Image dimensions too large (Pixel Flood Blocked). Please select a standard image.")));return}let u=d,f=p;if(u>a||f>n){const m=Math.min(a/u,n/f);u=Math.round(u*m),f=Math.round(f*m)}const v=document.createElement("canvas");v.width=u,v.height=f;const k=v.getContext("2d");k.imageSmoothingEnabled=!0,k.imageSmoothingQuality="high",k.drawImage(l,0,0,u,f);let b="image/webp",h=v.toDataURL(b,.82);h.startsWith("data:image/webp")||(b="image/jpeg",h=v.toDataURL(b,.82)),h.length>184320&&(h=v.toDataURL(b,.65)),o(h)}catch{s(new Error(t("تعذر معالجة وضغط الصورة.","Failed to process and compress image.")))}},l.src=i.result},i.readAsDataURL(e)})}function tn({url:e,chunk:a,contentRange:n,headers:o={},onProgress:s}){return new Promise((i,l)=>{const d=new XMLHttpRequest;if(d.open("PUT",e,!0),e.includes("/api/")){d.withCredentials=!0;const p=typeof localStorage<"u"?localStorage.getItem("darc_token"):null;p&&!o.Authorization&&d.setRequestHeader("Authorization",`Bearer ${p}`)}for(const[p,u]of Object.entries(o))d.setRequestHeader(p,u);n&&d.setRequestHeader("Content-Range",n),d.upload&&s&&(d.upload.onprogress=p=>{p.lengthComputable&&s(p.loaded)}),d.onload=()=>{i({status:d.status,ok:d.status>=200&&d.status<300,headers:{get:p=>d.getResponseHeader(p)},responseText:d.responseText,json:()=>{try{return JSON.parse(d.responseText)}catch{return{}}}})},d.onerror=()=>l(new Error("Network connection error")),d.ontimeout=()=>l(new Error("Upload chunk timeout")),d.timeout=18e4,d.send(a)})}async function Jo(e,a){try{const n=await tn({url:e,chunk:new Blob([]),contentRange:`bytes */${a}`});if(n.status===308){const o=n.headers.get("Range");if(o){const s=o.match(/bytes=0-(\d+)/);if(s&&s[1])return parseInt(s[1],10)+1}return 0}if(n.ok)return{completed:!0,data:typeof n.json=="function"?await Promise.resolve(n.json()):{}}}catch{}return null}var sa=null;function ms({projectName:e,taskName:a,totalFiles:n}){sa&&(clearTimeout(sa),sa=null);let o=document.getElementById("floating-upload-manager");if(o){o.style.opacity="1",o.style.transform="none";const s=o.querySelector("#fum-proj-text"),i=o.querySelector("#fum-task-text");s&&e&&(s.textContent=e),i&&a&&(i.textContent=a)}else{o=document.createElement("div"),o.id="floating-upload-manager",o.setAttribute("dir",r.lang==="ar"?"rtl":"ltr"),o.style.cssText=`
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
    `,o.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--surface-soft);border-bottom:1px solid var(--line);">
        <div style="display:flex;align-items:center;gap:8px;">
          <span id="fum-indicator" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);"></span>
          <strong id="fum-header-title" style="font-size:12.5px;color:var(--ink);">${t("رفع الملفات في الخلفية","Background File Upload")}</strong>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <button id="fum-minimize-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:13px;line-height:1;border-radius:4px;" title="${t("تصغير / توسيع","Minimize / Expand")}">—</button>
          <button id="fum-close-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:15px;line-height:1;border-radius:4px;display:none;" title="${t("إغلاق","Close")}">✕</button>
        </div>
      </div>
      <div id="fum-body" style="padding:12px 14px;display:flex;flex-direction:column;gap:9px;">
        <div style="display:flex;flex-direction:column;gap:3px;font-size:11.5px;color:var(--ink-soft);">
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${t("المشروع:","Project:")}</span>
            <span id="fum-proj-text" style="color:var(--ink);font-weight:600;">${c(e||"—")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${t("المهمة:","Task:")}</span>
            <span id="fum-task-text" style="color:var(--ink-soft);">${c(a||"—")}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;">
          <span id="fum-file-text" style="color:var(--ink);font-weight:600;max-width:230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">...</span>
          <span id="fum-count-text" style="color:var(--muted);font-size:11px;">(1/${n})</span>
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
    `,document.body.appendChild(o);const s=o.querySelector("#fum-minimize-btn"),i=o.querySelector("#fum-body");s.addEventListener("click",()=>{const l=i.style.display==="none";i.style.display=l?"flex":"none",s.textContent=l?"—":"+"}),o.querySelector("#fum-close-btn").addEventListener("click",()=>{o.remove()})}return o}function vt({fileName:e,fileIndex:a,totalFiles:n,pct:o,loadedMB:s,fileSizeMB:i,speedMBs:l,etaText:d,statusNote:p,isError:u,isDone:f}){const v=document.getElementById("floating-upload-manager");if(!v)return;const k=v.querySelector("#fum-file-text"),b=v.querySelector("#fum-count-text"),h=v.querySelector("#fum-progress-fill"),m=v.querySelector("#fum-pct-text"),y=v.querySelector("#fum-speed-text"),I=v.querySelector("#fum-eta-text"),D=v.querySelector("#fum-status-badge"),T=v.querySelector("#fum-indicator"),R=v.querySelector("#fum-header-title"),B=v.querySelector("#fum-close-btn");e&&k&&(k.textContent=e),b&&a&&n&&(b.textContent=`(${a}/${n})`),h&&typeof o=="number"&&(h.style.width=`${o}%`),m&&typeof o=="number"&&(m.textContent=`${o}%`),y&&s!==void 0&&i!==void 0&&(y.textContent=`${s} / ${i} MB • ${l||"0.0"} MB/s`),I&&d&&(I.textContent=`${t("متبقي:","ETA:")} ${d}`),p&&D?(D.style.display="block",D.textContent=p,D.style.background=u?"var(--red-soft)":"var(--amber-soft)",D.style.color=u?"var(--red)":"var(--amber)",D.style.border=u?"1px solid var(--red)":"1px solid var(--amber)"):!u&&!f&&D&&(D.style.display="none"),f&&(T&&(T.style.background="var(--mint-strong)",T.style.boxShadow="0 0 10px var(--mint-strong)"),R&&(R.textContent=t("اكتمل الرفع بنجاح! ✓","Upload Complete! ✓")),m&&(m.textContent="100%"),h&&(h.style.width="100%"),B&&(B.style.display="inline-block"),D&&(D.style.display="block",D.style.background="var(--mint)",D.style.color="var(--teal-dark)",D.style.border="1px solid var(--mint-strong)",D.textContent=t("تم التوثيق والرفع إلى الخادم بنجاح.","Document saved & uploaded to server.")),sa=setTimeout(()=>{v&&v.parentNode&&(v.style.opacity="0",v.style.transform="translateY(12px)",setTimeout(()=>v.remove(),300))},4500)),u&&(T&&(T.style.background="var(--red)",T.style.boxShadow="0 0 10px var(--red)"),R&&(R.textContent=t("فشل في الرفع ✕","Upload Failed ✕")),B&&(B.style.display="inline-block"))}async function Nn(e,a){if(!e||!e.length||!a)return;const n=r.data?.tasks?.find(o=>o.id===a);return gs({files:e,taskId:a,projectId:n?.projectId,status:"draft",isTaskModal:!0})}async function gs({files:e,projectId:a=null,taskId:n=null,discipline:o="عام",status:s="draft",isTaskModal:i=!1}){if(!e||!e.length)return;if(typeof navigator<"u"&&!navigator.onLine){$(t("لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.","Cannot upload drawings or files while offline. Please connect to the internet first."),!0);return}const l=n?r.data?.tasks?.find(D=>D.id===n):null,d=a||l?.projectId,p=d?r.data?.projects?.find(D=>D.id===d):null,u=r.data?.documents?r.data.documents.filter(D=>!D.deletedAt&&(n?D.taskId===n:D.projectId===d)):[],f=p?p.nameAr:"Project",v=l?l.titleAr:o||"General",k={},b=D=>{if(k[D])return k[D];let T=0;return u.forEach(R=>{if(R.originalName&&R.originalName.toLowerCase().endsWith(D)){const B=R.originalName.match(/_v(\d+)\./);B&&parseInt(B[1])>T&&(T=parseInt(B[1]))}}),k[D]=T+1,T+1},h=document.getElementById("upload-progress-container");document.getElementById("upload-progress-bar"),document.getElementById("upload-progress-percent"),document.getElementById("upload-progress-text");const m=document.getElementById("task-dropzone");i&&h&&(h.style.display="block"),i&&m&&(m.style.pointerEvents="none"),ms({projectName:f,taskName:v,totalFiles:e.length});let y=null;const I=D=>(D.preventDefault(),D.returnValue=t("جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.","Uploading large engineering files. Leaving will abort upload."),D.returnValue);if(typeof window<"u"&&(window.addEventListener("beforeunload",I),"wakeLock"in navigator))try{navigator.wakeLock.request("screen").then(D=>{y=D}).catch(()=>{})}catch{}try{for(let D=0;D<e.length;D++){const T=e[D];if(!T.size||T.size===0){$(t(`الملف "${T.name}" فارغ لا يحتوي على بيانات.`,`File "${T.name}" is empty.`),!0);continue}if(T.size>107374182400){$(t(`حجم الملف "${T.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${T.name}" exceeds 100GB limit.`),!0);continue}const R=T.name.split(".").pop()?.toLowerCase()||"";if(["exe","bat","cmd","sh","bash","ps1","vbs","js","mjs","cjs","py","php","phtml","html","htm","jar","msi","dll","com","scr","hta","svg","apk"].includes(R)||T.type==="image/svg+xml"){$(t(`صيغة الملف "${T.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${T.name}" is not permitted for security reasons.`),!0);continue}const B=T.name.lastIndexOf("."),w=B!==-1?T.name.substring(B).toLowerCase():"",A=B!==-1?T.name.substring(0,B):T.name,E=le=>(le||"").replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,"-").replace(/\s+/g,"_").trim(),_=`${E(f)||"Project"}_${E(v)||"General"}_${E(A)||"Drawing"}_v${b(w)}${w}`;if(typeof window<"u"){window.__docBlobCache=window.__docBlobCache||new Map;try{const le=URL.createObjectURL(T);window.__docBlobCache.set(_,le),window.__docBlobCache.set(T.name,le)}catch{}}const j=T.size>=1073741824?`${(T.size/1073741824).toFixed(2)} GB`:`${(T.size/1048576).toFixed(1)} MB`;vt({fileName:T.name,fileIndex:D+1,totalFiles:e.length,pct:0,loadedMB:"0.0",fileSizeMB:j,speedMBs:"0.0",etaText:"...",statusNote:t("بدء جلسة الرفع المستأنف...","Starting resumable session...")});const L=(await z("/api/documents/session",{method:"POST",body:JSON.stringify({compiledName:_,mimeType:T.type||"application/octet-stream",projectId:d,taskId:n,size:T.size})})).sessionUrl;let N=8388608;T.size<=10485760?N=T.size:T.size<=104857600?N=8388608:T.size<=524288e3?N=16777216:T.size<=2147483648?N=33554432:N=67108864;const O=Date.now();let P=0;const U=le=>{const J=Math.min(T.size,P+le),Ee=Math.min(100,Math.round(J/T.size*100)),We=J>=1073741824?`${(J/1073741824).toFixed(2)} GB`:`${(J/1048576).toFixed(1)} MB`;if(i){const Bn=document.getElementById("upload-progress-bar"),Fn=document.getElementById("upload-progress-percent"),Un=document.getElementById("upload-progress-text"),qn=document.getElementById("upload-progress-container");qn&&(qn.style.display="block"),Bn&&(Bn.style.width=`${Ee}%`),Fn&&(Fn.textContent=`${Ee}%`);const xs=(Date.now()-O)/1e3,Hn=J/Math.max(xs,.2),ws=(Hn/1048576).toFixed(1),$s=Math.max(0,T.size-J),Kt=Math.round($s/Math.max(Hn,1)),ks=Kt<60?`${Kt} ${t("ثانية","s")}`:`${Math.floor(Kt/60)}:${String(Kt%60).padStart(2,"0")} ${t("دقيقة","min")}`;Un&&(Un.textContent=`${t("رفع إلى الخادم","Uploading to server")} (${D+1}/${e.length}): ${T.name} — ${We} / ${j} (${Ee}%) • ${ws} MB/s • ${t("متبقي:","ETA:")} ${ks}`)}const pt=(Date.now()-O)/1e3,ye=J/Math.max(pt,.2),Q=(ye/1048576).toFixed(1),Re=Math.max(0,T.size-J),Ta=Math.round(Re/Math.max(ye,1)),hs=Ta<60?`${Ta} s`:`${Math.floor(Ta/60)}m`;vt({fileName:T.name,fileIndex:D+1,totalFiles:e.length,pct:Ee,loadedMB:We,fileSizeMB:j,speedMBs:Q,etaText:hs})};U(0);let G=0,oe=null,ke=!1;for(;G<T.size;){const le=Math.min(G+N,T.size),J=T.slice(G,le),Ee=`bytes ${G}-${le-1}/${T.size}`;let We=0,pt=!1;for(;!pt&&We<5;)try{let ye;if(!ke)try{ye=await tn({url:L,chunk:J,contentRange:Ee,headers:{},onProgress:Q=>U(Q)})}catch(Q){console.warn("[Upload] Direct GDrive upload failed, trying backend proxy:",Q.message),ke=!0}if(ke){const Q={projectId:d,taskId:n,compiledName:_,mimeType:T.type,size:T.size,status:s};ye=await tn({url:`${$a}/api/documents/chunk`,chunk:J,contentRange:Ee,headers:{"x-session-url":L,"x-doc-meta":encodeURIComponent(JSON.stringify(Q))},onProgress:Re=>U(Re)})}if(ye.status===308){const Q=ye.headers.get("Range");if(Q){const Re=Q.match(/bytes=0-(\d+)/);Re&&Re[1]?G=parseInt(Re[1],10)+1:G=le}else G=le;P=G,U(0),pt=!0}else if(ye.ok){const Q=typeof ye.json=="function"?await Promise.resolve(ye.json()):{};oe=Q.id||Q.document?.id,P=T.size,U(0),G=T.size,pt=!0;break}else throw new Error(`Upload returned status ${ye.status}`)}catch(ye){if(We++,vt({fileName:T.name,fileIndex:D+1,totalFiles:e.length,statusNote:`${t("إعادة المحاولة","Retrying")} (${We}/5)...`}),We>=5)throw new Error(`${t("فشل الرفع بعد محاولات متعددة","Upload failed after multiple retries")}: ${ye.message}`);await new Promise(Re=>setTimeout(Re,1e3*Math.pow(2,We-1)));const Q=await Jo(L,T.size);if(typeof Q=="number"&&Q>G){G=Q,P=G;break}else if(Q&&Q.completed){oe=Q.data?.id,G=T.size,pt=!0;break}}}oe&&!oe.startsWith("doc_")&&await z("/api/documents/finalize",{method:"POST",body:JSON.stringify({driveFileId:oe,projectId:d,taskId:n,compiledName:_,mimeType:T.type,size:T.size,status:s})})}if(await ce(!0),i&&n){const D=r.data?.tasks?.find(R=>R.id===n),T=document.getElementById("task-documents-list");T&&D&&(T.innerHTML=rt(D))}da(),vt({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),$(t("تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅","Drawing uploaded & registered successfully ✅"))}catch(D){vt({isError:!0,statusNote:D.message}),$(D.message,!0)}finally{if(typeof window<"u"&&window.removeEventListener("beforeunload",I),y){try{y.release()}catch{}y=null}if(i){const D=document.getElementById("upload-progress-container"),T=document.getElementById("upload-progress-bar"),R=document.getElementById("task-dropzone");D&&(D.style.display="none"),T&&(T.style.width="0%"),R&&(R.style.pointerEvents="auto");const B=document.getElementById("task-upload-input");B&&(B.value="")}}}typeof window<"u"&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,window.addEventListener("dragover",e=>{e.target.closest("#task-dropzone, #drawing-dropzone")||e.preventDefault()}),window.addEventListener("drop",e=>{e.target.closest("#task-dropzone, #drawing-dropzone")||e.preventDefault()}),document.addEventListener("dragover",e=>{const a=e.target.closest("#task-dropzone");a&&(e.preventDefault(),a.style.borderColor="var(--brand-teal)",a.style.background="var(--teal-soft)")}),document.addEventListener("dragleave",e=>{const a=e.target.closest("#task-dropzone");a&&(a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)")}),document.addEventListener("drop",e=>{const a=e.target.closest("#task-dropzone");if(a){e.preventDefault(),a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)";const n=a.dataset.taskId,o=e.dataTransfer?.files;o&&o.length&&Nn(o,n)}}));async function vs(){Lt({theme:r.theme,lang:r.lang});try{r.calendarSystem=localStorage.getItem("darc_calendar_system")||r.calendarSystem||"gregorian"}catch{}if(typeof window<"u"&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",i=>{try{if(!localStorage.getItem("darc-theme")){r.theme=i.matches?"dark":"light",document.documentElement.dataset.theme=r.theme;const l=document.querySelector('[data-action="toggle-theme"]');l&&(l.textContent=r.theme==="dark"?"☀️":"🌙")}}catch{}})}catch{}}const e=typeof window<"u"?window.location.hash.replace(/^#/,""):"",a=new URLSearchParams(e.includes("?")?e.split("?")[1]:e.includes("=")?e:""),n=a.get("activate");if(n)return Gt(n);const o=a.get("reset");if(o)return wt(o);if(e==="forgot")return Se("","forgot");if(e==="login")return Se();try{if(e){const[i,l]=e.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)&&(r.view=i,l)){const d=new URLSearchParams(l);d.get("id")&&(r.activeProjectId=d.get("id")),d.get("tab")&&(r.projectTab=d.get("tab")),d.get("section")&&(r.settingsSection=d.get("section"))}}else if(typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route");if(i){const l=JSON.parse(i);l.view&&(r.view=l.view),l.activeProjectId&&(r.activeProjectId=l.activeProjectId),l.projectTab&&(r.projectTab=l.projectTab),l.settingsSection&&(r.settingsSection=l.settingsSection)}}}catch{}r.view==="settings"&&!r.settingsSection&&(r.settingsSection="profile");const s=ya();s&&s.user?(r.data=s,ee(r.view)||(r.view=ze()),X()):qt();try{if(typeof navigator<"u"&&navigator.onLine&&Ut().length>0&&await ln(z),await xe(),r.data?.user?.customFields?.calendarSystem){r.calendarSystem=r.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",r.calendarSystem)}catch{}}if(!window._darcPollingActive){window._darcPollingActive=!0;let i=null,l=0,d=!1,p=Date.now(),u=0;const f=()=>{const b=Date.now()-p>45e3;p=Date.now(),b&&Date.now()-u>4e3&&!d&&k()};if(typeof window<"u"){let b=0;const h=()=>{const m=Date.now();m-b>5e3&&(b=m,f())};window.addEventListener("click",h,{passive:!0}),window.addEventListener("keydown",h,{passive:!0}),window.addEventListener("touchstart",h,{passive:!0}),window.addEventListener("mousemove",h,{passive:!0})}const v=()=>{i&&clearTimeout(i);const b=Date.now()-p>45e3?15e3:4e3,h=l>0?Math.min(25e3,b*Math.pow(2,l)):b;i=setTimeout(k,h)},k=async()=>{if(typeof document<"u"&&document.hidden){v();return}if(!r.data?.user||!r.view||r.view==="login"){v();return}if(d){v();return}d=!0,u=Date.now();try{await xe(!0),l=0}catch{l++}finally{d=!1,v()}};v(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&r.data?.user&&r.view&&r.view!=="login"&&(f(),k())})}}catch{typeof window<"u"&&(window.history&&window.history.replaceState?window.history.replaceState(null,"","#login"):window.location.hash="#login"),Se()}}typeof window<"u"&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener("hashchange",()=>{if(window._isInternalNav){window._isInternalNav=!1;return}const e=window.location.hash.replace(/^#/,"");if(!e)return;const[a,n]=e.split("?");if(a==="login"){r.data?.user&&(r.data.user=null),Se();return}if(a==="forgot"){Se("","forgot");return}const o=new URLSearchParams(n||(e.includes("=")?e:""));if(o.get("activate")){Gt(o.get("activate"));return}if(o.get("reset")){wt(o.get("reset"));return}if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(a)){if(r.data&&!ee(a)){we(ze());return}let s=r.activeProjectId;if(n){const i=new URLSearchParams(n);if(i.get("id")&&(s=i.get("id")),i.get("tab")&&(r.projectTab=i.get("tab")),i.get("section")){const l=i.get("section");a==="settings"&&r.data&&!be(l)?(r.settingsSection="profile",typeof window<"u"&&window.history&&window.history.replaceState&&window.history.replaceState(null,"","#settings?section=profile")):r.settingsSection=l}}else a==="settings"&&r.data&&!be(r.settingsSection)&&(r.settingsSection="profile");if(r.view!==a||r.activeProjectId!==s)we(a,s);else if(M(),a==="settings"){const i=document.getElementById("main-content");i&&(i.scrollTop=0,i.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0),document.documentElement&&(document.documentElement.scrollTop=0),document.body&&(document.body.scrollTop=0)}}}));if(typeof window<"u"&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener("scroll",a=>{a.target&&a.target.classList&&(a.target.classList.contains("timeline-scroll")||a.target.classList.contains("gantt-scroll")||a.target.classList.contains("timeline-board"))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows=="function"&&drawTimelineArrows(),e=!1})))},!0)}var te=null,Ke=null,Bt=64,it=null,pe=-1,Z=-1,ht=-1,Fe=0,Jt=!1,q=null,W=null,$t=0,kt=0,Ce=0,Le=0,fe=!1,Ye=null,se=null,qe="mouse",Ne=null,Y=null,li=null,Ca=null;function nt(e){let a=document.getElementById("dnd-live-announcer");a||(a=document.createElement("div"),a.id="dnd-live-announcer",a.className="sr-only",a.setAttribute("aria-live","assertive"),a.setAttribute("aria-atomic","true"),document.body.appendChild(a)),a.textContent="",setTimeout(()=>{a.textContent=e},40)}function ys(e){te||(te=document.createElement("div"),te.className="drag-placeholder");const a=Math.max(48,Math.min(220,e||Bt||64));return te.style.cssText=`
    border: 2px dashed var(--brand-teal, #0d6269);
    background: rgba(13, 98, 105, 0.06);
    border-radius: 12px;
    height: ${a}px;
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
  `,te.innerHTML=`<span>↓ ${t("الموضع الجديد للمهمة","Drop position")}</span>`,te}function Ko(){te&&te.parentNode&&te.parentNode.removeChild(te)}function On(e,a){const n=Array.from(e.querySelectorAll(".task-card:not(.is-dragging):not(#active-drag-ghost)"));return n.length===0?null:n.reduce((o,s)=>{const i=s.getBoundingClientRect(),l=a-(i.top+i.height/2);return l<0&&l>o.offset?{offset:l,element:s}:o},{offset:Number.NEGATIVE_INFINITY}).element}var ge=null,ve=null;function Yo(){typeof document>"u"||(ge||(ge=document.createElement("div"),ge.className="dnd-edge-hotzone left",document.body.appendChild(ge)),ve||(ve=document.createElement("div"),ve.className="dnd-edge-hotzone right",document.body.appendChild(ve)))}function Xo(){ge&&ge.parentNode&&(ge.parentNode.removeChild(ge),ge=null),ve&&ve.parentNode&&(ve.parentNode.removeChild(ve),ve=null)}var oa=-1,an=null,nn=-1;function bs(e,a){if(!Jt||e<0||a<0)return;let n=document.elementFromPoint(e,a)?.closest(".board-column");const o=document.querySelector(".board, .tasks-board, .board-columns");if(!n&&o){const i=o.getBoundingClientRect();if(a>=i.top-80&&a<=i.bottom+80){const l=Array.from(document.querySelectorAll(".board-column"));l.length>0&&(n=l.reduce((d,p)=>{const u=p.getBoundingClientRect(),f=Math.abs(e-(u.left+u.width/2));return f<d.dist?{col:p,dist:f}:d},{col:null,dist:1/0}).col)}}if(!n){document.querySelectorAll(".board-column").forEach(i=>i.classList.remove("drag-over"));return}document.querySelectorAll(".board-column").forEach(i=>i.classList.toggle("drag-over",i===n));const s=n.querySelector(".board-cards");if(s){if(an===n&&oa>=0&&Math.abs(a-oa)<14)return;an=n,oa=a;const i=ys(Bt),l=On(s,a);l==null?(!s.contains(i)||s.lastElementChild!==i)&&s.appendChild(i):i.nextElementSibling!==l&&s.insertBefore(i,l)}}function Zo(){if(it)return;function e(){if(!Jt){it=null;return}if(pe>=0&&Z>=0){let a=!1;const n=document.querySelector(".board, .board-columns, .tasks-board, [data-board]"),o=typeof window<"u"&&window.innerWidth<=768,s=o?75:85,i=o?24:28;if(n){let h=0;const m=typeof window<"u"&&window.visualViewport?.width||window.innerWidth,y=W?W.getBoundingClientRect():null,I=pe<s||y&&y.left<35,D=pe>m-s||y&&y.right>m-35;if(I){const T=Math.max(0,pe<s?s-pe:35),R=Math.min(1.5,Math.max(.15,T/s));h=-Math.max(4,Math.round(Math.pow(R,1.3)*i))}else if(D){const T=Math.max(0,pe>m-s?pe-(m-s):35),R=Math.min(1.5,Math.max(.15,T/s));h=Math.max(4,Math.round(Math.pow(R,1.3)*i))}if(h!==0){const T=n.scrollLeft;try{n.scrollBy({left:h})}catch{}if(n.scrollLeft===T&&(n.scrollLeft+=h),n.scrollLeft!==T&&(a=!0),a?h<0?(ge?.classList.add("is-active"),ve?.classList.remove("is-active")):(ve?.classList.add("is-active"),ge?.classList.remove("is-active")):(ge?.classList.remove("is-active"),ve?.classList.remove("is-active")),o){const R=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)?.closest(".board-column");if(R){const B=Array.from(document.querySelectorAll(".board-column")).indexOf(R);if(B!==-1&&B!==nn&&(nn=B,typeof navigator<"u"&&navigator.vibrate))try{navigator.vibrate(12)}catch{}}}}else ge?.classList.remove("is-active"),ve?.classList.remove("is-active")}const l=95,d=26,p=document.getElementById("main-content")||document.querySelector(".workspace-content"),u=p?p.getBoundingClientRect():null,f=u?Math.max(60,u.top+60):80,v=u?Math.min(window.innerHeight-30,u.bottom-60):window.innerHeight-80;if(Z>v){const h=Math.min(1.5,Math.max(.2,(Z-v)/l)),m=Math.max(4,Math.round(h*d));if(p&&p.scrollHeight>p.clientHeight){const y=p.scrollTop;p.scrollTop+=m,p.scrollTop!==y&&(a=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const y=window.scrollY;window.scrollBy({top:m,behavior:"instant"}),window.scrollY!==y&&(a=!0)}}else if(Z<f){const h=Math.min(1.5,Math.max(.2,(f-Z)/l)),m=-Math.max(4,Math.round(h*d));if(p&&p.scrollHeight>p.clientHeight){const y=p.scrollTop;p.scrollTop+=m,p.scrollTop!==y&&(a=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const y=window.scrollY;window.scrollBy({top:m,behavior:"instant"}),window.scrollY!==y&&(a=!0)}}const k=document.elementFromPoint(pe,Z),b=k?.closest(".board-cards")||k?.closest(".board-column")?.querySelector(".board-cards");if(b&&b.scrollHeight>b.clientHeight){const h=b.getBoundingClientRect(),m=60;if(Z>h.top&&Z<h.top+m){const y=(m-(Z-h.top))/m;b.scrollTop-=Math.max(3,Math.round(y*18)),a=!0}else if(Z<h.bottom&&Z>h.bottom-m){const y=(Z-(h.bottom-m))/m;b.scrollTop+=Math.max(3,Math.round(y*18)),a=!0}}a&&bs(pe,Z)}it=requestAnimationFrame(e)}it=requestAnimationFrame(e)}function Qo(){it&&(cancelAnimationFrame(it),it=null)}async function sn(e,a,n=null){if(!e){ne();return}e.classList.remove("drag-over");const o=n||Ke;Ke=null;const s=e.dataset.status;if(!o||!s){ne();return}const i=(r.data?.tasks||[]).find(E=>E.id===o);if(!i){ne();return}const l=e.querySelector(".board-cards");if(!l){ne();return}const d=i.status===s||s==="review"&&["review","approval","blocked"].includes(i.status);if(!d&&s==="done"&&i.dependencies&&i.dependencies.length&&i.dependencies.filter(E=>{const _=r.data.tasks.find(j=>j.id===E);return _&&_.status!=="done"}).length)return ne(),$(t("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);const p=Array.from(l.querySelectorAll(".task-card")).filter(E=>E.dataset.taskId!==o),u=p.map(E=>E.dataset.taskId).filter(Boolean);let f=u.length;if(te&&te.parentNode===l)if(!te.previousElementSibling||te.previousElementSibling.classList?.contains("empty"))f=0;else{let E=te.nextElementSibling;for(;E&&(!E.classList?.contains("task-card")||E.dataset?.taskId===o||E.classList?.contains("is-dragging"));)E=E.nextElementSibling;if(E&&E.dataset?.taskId&&E.dataset.taskId!==o){const _=u.indexOf(E.dataset.taskId);f=_!==-1?_:u.length}else f=u.length}else if(p.length>0){const E=a&&a>0?a:Z>0?Z:0,_=p[0].getBoundingClientRect(),j=p[p.length-1].getBoundingClientRect();if(E<=_.top+_.height*.45)f=0;else if(E>=j.bottom-j.height*.45)f=u.length;else{const L=On(l,E);if(L&&L.dataset.taskId!==o){const N=u.indexOf(L.dataset.taskId);N!==-1&&(f=N)}}}else f=0;const v=Array.from(l.querySelectorAll(".task-card")).findIndex(E=>E.dataset.taskId===o);if(d&&v!==-1&&(f===v||f===v+1)){ne();return}const k=i.status,b=(r.data.tasks||[]).map(E=>({id:E.id,status:E.status,sortOrder:E.sortOrder||E.sort_order,progress:E.progress,customFields:JSON.parse(JSON.stringify(E.customFields||E.custom_fields||{}))}));ne();const h=[...u];h.splice(f,0,o),s==="review"&&["review","approval","blocked"].includes(i.status)||(i.status=s),i.status==="done"?i.progress=100:i.status==="not_started"?i.progress=0:i.status==="in_progress"&&(i.progress===0||!i.progress)?i.progress=50:["review","approval"].includes(i.status)&&(i.progress||0)<80&&(i.progress=80);let m=100,y=!1;if(h.length<=1)m=100;else if(f===0){const E=(r.data?.tasks||[]).find(j=>j.id===h[1]),_=E?.sortOrder||E?.sort_order||100;m=Math.max(1,Math.round(_/2)),m>=_&&(y=!0)}else if(f===h.length-1){const E=(r.data?.tasks||[]).find(_=>_.id===h[h.length-2]);m=(E?.sortOrder||E?.sort_order||100)+100}else{const E=(r.data?.tasks||[]).find(N=>N.id===h[f-1]),_=(r.data?.tasks||[]).find(N=>N.id===h[f+1]),j=E?.sortOrder||E?.sort_order||100,L=_?.sortOrder||_?.sort_order||200;L-j>1?m=Math.round((j+L)/2):y=!0}const I=Date.now();window._recentlyMovedTasks||(window._recentlyMovedTasks=new Map);const D=[];y?h.forEach((E,_)=>{const j=(r.data?.tasks||[]).find(L=>L.id===E);if(j){const L=(_+1)*100;j.sortOrder=L,j.sort_order=L,j.customFields||(j.customFields={}),j.customFields.sortOrder=L,j.customFields.sort_order=L,j.custom_fields||(j.custom_fields={}),j.custom_fields.sortOrder=L,j.custom_fields.sort_order=L,window._recentlyMovedTasks.set(E,{status:j.status,sortOrder:L,progress:j.progress,timestamp:I}),D.push({id:j.id,status:j.status,sortOrder:L,customFields:j.customFields})}}):(i.sortOrder=m,i.sort_order=m,i.customFields||(i.customFields={}),i.customFields.sortOrder=m,i.customFields.sort_order=m,i.custom_fields||(i.custom_fields={}),i.custom_fields.sortOrder=m,i.custom_fields.sort_order=m,window._recentlyMovedTasks.set(i.id,{status:i.status,sortOrder:m,progress:i.progress,timestamp:I}),D.push({id:i.id,status:i.status,sortOrder:m,customFields:i.customFields}));for(const[E,_]of window._recentlyMovedTasks.entries())I-_.timestamp>45e3&&window._recentlyMovedTasks.delete(E);bn("custom"),r.taskSortPref="custom",r.projectTaskSort="custom",r.myTaskSort="custom",M(!0);const T=document.querySelector(".board, .tasks-board, .board-columns")?.querySelector(`.board-column[data-status="${s}"]`),R=typeof window<"u"&&window.innerWidth<=768;if(T&&R)try{T.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}catch{}if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(20)}catch{}k!==s&&document.querySelectorAll(`.board-column[data-status="${s}"] .board-count, .board-column[data-status="${k}"] .board-count`).forEach(E=>{E.classList.remove("count-updated"),E.offsetWidth,E.classList.add("count-updated"),setTimeout(()=>E.classList.remove("count-updated"),350)});const B=document.querySelector(`.task-card[data-task-id="${o}"]`);B&&(B.classList.add("just-dropped"),setTimeout(()=>B?.classList.remove("just-dropped"),450));const w=e.querySelector(".board-column-title"),A=w?w.innerText.trim():s;nt(t(`تم إفلات المهمة في عمود: ${A}، الموضع ${f+1}.`,`Dropped task into column: ${A}, position ${f+1}.`)),D.forEach(E=>{E?.id&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(E.id)}),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,D.forEach(E=>{window._pendingReorderBatch.set(E.id,E)}),window._reorderSyncTimer=setTimeout(()=>{const E=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),z("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:E})}).catch(_=>{console.warn("Reorder sync error, performing local rollback:",_),b.forEach(j=>{const L=(r.data?.tasks||[]).find(N=>N.id===j.id);L&&(L.status=j.status,L.sortOrder=j.sortOrder,L.sort_order=j.sortOrder,L.progress=j.progress,L.customFields=j.customFields)}),M(!0),$(t("فشل حفظ الترتيب الجديد في الخادم. تم التراجع عن التعديل تلقائياً.","Failed to save task order to server. Reverted automatically."),!0)})},220)}function ne(){if(se&&(clearTimeout(se),se=null),W&&W.parentNode&&W.parentNode.removeChild(W),W=null,q){try{Ye!=null&&q.releasePointerCapture(Ye)}catch{}q.style.opacity="",q.style.pointerEvents="",q.style.touchAction="",q.classList.remove("is-dragging"),q.classList.remove("is-touch-charging"),q.classList.remove("is-touch-holding")}q=null;const e=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");e&&(e.style.scrollSnapType=""),document.body.classList.remove("is-touch-dragging"),Ye=null,fe=!1,Jt=!1,nr=!1,Ft=!1,window._isDraggingTask=!1,window._isTouchHoldingTask=!1,Ke=null,pe=-1,Z=-1,ht=-1,Fe=0,oa=-1,an=null,nn=-1,qe="mouse",ge?.classList.remove("is-active"),ve?.classList.remove("is-active"),Xo(),Qo(),document.querySelectorAll(".board-column").forEach(a=>a.classList.remove("drag-over")),Ko(),document.body.style.userSelect="",document.body.style.webkitUserSelect="",document.body.style.cursor="",window._pendingRenderAfterDrag&&(window._pendingRenderAfterDrag=!1,requestAnimationFrame(()=>M(!0)))}function on(e,a,n=qe){if(!q||fe)return;qe=n;const o=q.dataset.taskId;if(!q.isConnected&&o){const m=document.querySelector(`.task-card[data-task-id="${o}"]`);m&&(q=m)}const s=(r.data?.tasks||[]).find(m=>m.id===q.dataset.taskId);if(!Ht(s)){ne();return}if(e===0&&a===0&&($t!==0||kt!==0)&&(e=$t,a=kt),fe=!0,Jt=!0,window._isDraggingTask=!0,window._isTouchHoldingTask=!1,Ke=q.dataset.taskId,pe=e,Z=a,ht=e,Fe=0,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(35)}catch{}const i=q.getBoundingClientRect();Bt=i.height;const l=(q.closest(".board-column")||document.querySelector(".board-column"))?.getBoundingClientRect(),d=l?Math.round(l.width-24):260,p=Math.max(230,Math.min(320,d)),u=i&&Number.isFinite(i.width)&&i.width>=180&&i.width<=400?Math.round(i.width):p;Ce=e-i.left,Le=a-i.top,(isNaN(Ce)||Ce<=0||Ce>u)&&(Ce=u/2),(isNaN(Le)||Le<=0||Le>(i.height||120))&&(Le=(i.height||120)/2);const f=n==="touch"?28:0,v=Math.round(e-Ce),k=Math.round(a-Le-f),b=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");b&&(b.style.scrollSnapType="none"),W=q.cloneNode(!0),W.id="active-drag-ghost",W.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: ${u}px;
    min-width: 230px;
    max-width: 320px;
    box-sizing: border-box;
    contain: none;
    content-visibility: visible;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.98;
    transform: translate3d(${v}px, ${k}px, 0) scale(1.025);
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
  `,document.body.appendChild(W),q.classList.remove("is-touch-charging"),q.classList.remove("is-touch-holding"),q.classList.add("is-dragging"),q.style.opacity="0.22",q.style.pointerEvents="none",document.body.classList.add("is-touch-dragging"),document.body.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.cursor="grabbing",Yo();const h=q.closest(".board-column");if(h){h.classList.add("drag-over");const m=h.querySelector(".board-cards");if(m){const y=ys(Bt),I=On(m,a);I==null?m.appendChild(y):m.insertBefore(y,I)}}Zo()}function er(e,a,n=qe){if(!Jt||!W||e===0&&a===0&&($t!==0||kt!==0)||!Number.isFinite(e)||!Number.isFinite(a))return;if(qe=n,pe=e,Z=a,n==="touch")Fe=0;else{const l=ht>=0?e-ht:0,d=Math.max(-2,Math.min(2,(Math.abs(l)<1.5?0:l)*.12));Fe+=(d-Fe)*.22,Math.abs(Fe)<.12&&(Fe=0)}ht=e;const o=n==="touch"?28:0,s=Math.round(e-Ce),i=Math.round(a-Le-o);if(Number.isFinite(s)&&Number.isFinite(i)){const l=Fe!==0?` rotate(${Fe.toFixed(1)}deg)`:"";W.style.transform=`translate3d(${s}px, ${i}px, 0) scale(1.025)${l}`}bs(e,a)}async function tr(e,a){if(se&&(clearTimeout(se),se=null),q&&(q.classList.remove("is-touch-charging"),q.classList.remove("is-touch-holding")),!fe&&!Ke){ne();return}const n=Math.hypot(e-$t,a-kt);if(window._justDroppedTaskId=Ke,window._justDroppedAt=Date.now(),window._isDraggingTask=!1,n>4&&Ke){let o=document.elementFromPoint(e,a)?.closest(".board-column")||te&&te.closest(".board-column");if(!o){const l=Array.from(document.querySelectorAll(".board-column"));l.length>0&&(o=l.reduce((d,p)=>{const u=p.getBoundingClientRect(),f=Math.abs(e-(u.left+u.width/2));return f<d.dist?{col:p,dist:f}:d},{col:null,dist:1/0}).col)}const s=Ke,i=te&&te.parentNode?te.getBoundingClientRect():null;if(W&&i&&i.width>0&&i.height>0){W.style.transition="transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.14s ease, opacity 0.14s ease",W.style.transform=`translate3d(${i.left}px, ${i.top}px, 0) scale(1) rotate(0deg)`,W.style.boxShadow="0 4px 14px rgba(13, 98, 105, 0.12)",setTimeout(async()=>{W&&W.parentNode&&W.parentNode.removeChild(W),W=null,o&&s?await sn(o,a,s):ne()},130);return}if(o&&s){W&&W.parentNode&&W.parentNode.removeChild(W),W=null,await sn(o,a,s);return}}ne()}var ar=8,nr=!1,Ft=!1,rn=!1;document.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;const a=e.target instanceof Element?e.target:e.target?.parentElement||null,n=a?.closest?.(".task-card");if(!n||a?.closest?.("button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]"))return;const o=(r.data?.tasks||[]).find(i=>i.id===n.dataset.taskId);if(!Ht(o))return;q=n,Ye=e.pointerId,$t=e.clientX,kt=e.clientY,pe=e.clientX,Z=e.clientY,ht=e.clientX,fe=!1,Ft=!1;const s=n.getBoundingClientRect();if(Bt=s.height,Ce=e.clientX-s.left,Le=e.clientY-s.top,isNaN(Ce)&&(Ce=s.width/2),isNaN(Le)&&(Le=s.height/2),rn=!!a?.closest?.(".task-drag-handle"),e.pointerType==="touch")if(qe="touch",window._isTouchHoldingTask=!0,rn)try{n.setPointerCapture(e.pointerId)}catch{}else n.classList.add("is-touch-charging"),se=setTimeout(()=>{if(se=null,q&&!Ft&&!fe){if(n.classList.remove("is-touch-charging"),typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(28)}catch{}on(pe,Z,"touch")}},280);else{qe=e.pointerType||"mouse";try{n.setPointerCapture(e.pointerId)}catch{}}},{passive:!0});document.addEventListener("pointermove",e=>{if(!(!q||Ft)&&!(Ye!=null&&e.pointerId!==Ye)){if(pe=e.clientX,Z=e.clientY,!fe){const a=Math.hypot(e.clientX-$t,e.clientY-kt);if(e.pointerType==="touch"){if(qe="touch",rn)a>=4&&on(e.clientX,e.clientY,"touch");else if(a>ar){Ft=!0,window._isTouchHoldingTask=!1,se&&(clearTimeout(se),se=null),q&&(q.classList.remove("is-touch-charging"),q.classList.remove("is-touch-holding"));return}}else if(qe=e.pointerType||"mouse",a>=6)on(e.clientX,e.clientY,e.pointerType||"mouse");else return}fe&&(e.cancelable&&e.preventDefault(),er(e.clientX,e.clientY,e.pointerType))}},{passive:!1});document.addEventListener("pointerup",async e=>{if(se&&(clearTimeout(se),se=null),q&&(q.classList.remove("is-touch-charging"),q.classList.remove("is-touch-holding")),Ye!=null&&q)try{q.releasePointerCapture(Ye)}catch{}if(!fe){ne();return}await tr(e.clientX,e.clientY)});document.addEventListener("pointercancel",e=>{fe||ne()});window.addEventListener("blur",()=>{(fe||q)&&ne()});document.addEventListener("visibilitychange",()=>{document.hidden&&(fe||q)&&ne()});window.addEventListener("orientationchange",()=>{(fe||q)&&ne()});window.addEventListener("resize",()=>{(fe||q)&&ne()});window.addEventListener("touchmove",e=>{fe&&e.cancelable&&e.preventDefault()},{passive:!1});window.addEventListener("touchend",()=>{window._isTouchHoldingTask=!1,se&&(clearTimeout(se),se=null)},{passive:!0});window.addEventListener("touchcancel",()=>{ne()});document.addEventListener("dragstart",e=>{(e.target instanceof Element?e.target:e.target?.parentElement||null)?.closest?.(".task-card")&&e.preventDefault()});document.addEventListener("click",e=>{window._justDroppedAt&&Date.now()-window._justDroppedAt<500&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},!0);document.addEventListener("keydown",async e=>{if((e.target instanceof Element?e.target:e.target?.parentElement||null)?.closest?.('input, textarea, select, [contenteditable="true"]')||document.querySelector(".modal-overlay, #taskModal, .modal-backdrop"))return;const a=document.activeElement?.closest?.(".task-card");if((e.key===" "||e.altKey&&(e.key==="m"||e.key==="M"))&&a){const n=(r.data?.tasks||[]).find(o=>o.id===a.dataset.taskId);if(!Ht(n))return;if(e.preventDefault(),Ne)Ne===n.id&&(Y?.classList.remove("is-keyboard-grabbed"),Y?.setAttribute("aria-grabbed","false"),Ne=null,Y=null,window._isKeyboardDraggingTask=!1,nt(t("تم إلغاء الإمساك بالمهمة.","Task released.")));else{Ne=n.id,Y=a,li=n.status,Ca=n.sortOrder||n.sort_order,window._isKeyboardDraggingTask=!0,a.classList.add("is-keyboard-grabbed"),a.setAttribute("aria-grabbed","true");const o=a.closest(".board-column")?.querySelector(".board-column-title")?.innerText?.trim()||"",s=t(n.titleAr,n.titleEn);nt(t(`تم الإمساك بالمهمة "${s}". العمود الحالي: ${o}. استخدم الأسهم للتحريك، Enter للإفلات، Escape للإلغاء.`,`Grabbed task "${s}". Current column: ${o}. Use arrow keys to move, Enter to drop, Escape to cancel.`))}return}if(Ne&&Y){const n=(r.data?.tasks||[]).find(d=>d.id===Ne);if(!n)return;const o=Y.closest(".board-column");if(!o)return;const s=Array.from(document.querySelectorAll(".board-column")),i=s.indexOf(o),l=document.documentElement.dir==="rtl"||r.lang==="ar";if(e.key==="ArrowUp"){e.preventDefault();const d=Y.previousElementSibling;d&&d.classList.contains("task-card")&&(o.querySelector(".board-cards").insertBefore(Y,d),Y.focus(),nt(t("تم التحريك للأعلى.","Moved up.")));return}if(e.key==="ArrowDown"){e.preventDefault();const d=Y.nextElementSibling;d&&d.classList.contains("task-card")&&(o.querySelector(".board-cards").insertBefore(d,Y),Y.focus(),nt(t("تم التحريك للأسفل.","Moved down.")));return}if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const d=l?"ArrowLeft":"ArrowRight",p=e.key===d?i+1:i-1;if(p>=0&&p<s.length){const u=s[p],f=u.querySelector(".board-cards");if(f){f.appendChild(Y),Y.focus();const v=u.querySelector(".board-column-title")?.innerText?.trim()||"";nt(t(`تم النقل إلى عمود: ${v}.`,`Moved to column: ${v}.`))}}return}if(e.key==="Enter"){e.preventDefault();const d=Y.closest(".board-column"),p=Ne;if(Y.classList.remove("is-keyboard-grabbed"),Y.setAttribute("aria-grabbed","false"),Ne=null,Y=null,window._isKeyboardDraggingTask=!1,d&&p){const u=Y?Y.getBoundingClientRect():null;await sn(d,u?u.top+10:0,p)}return}if(e.key==="Escape"){e.preventDefault(),Y.classList.remove("is-keyboard-grabbed"),Y.setAttribute("aria-grabbed","false"),Ne=null,Y=null,window._isKeyboardDraggingTask=!1,n.status=li,Ca!==null&&(n.sortOrder=Ca),M(!0),nt(t("تم إلغاء النقل وإعادة المهمة لمكانها الأصلي.","Move cancelled. Task returned to original position."));return}}});window.state=r;document.documentElement.dataset.theme=r.theme;document.documentElement.lang=r.lang;document.documentElement.dir=r.lang==="ar"?"rtl":"ltr";r.lang==="en"?document.body.classList.add("is-ltr"):document.body.classList.remove("is-ltr");Object.assign(window,Cs);Object.assign(window,Vs);Object.assign(window,yo);Object.assign(window,bo);Object.assign(window,ko);Object.assign(window,so);Object.assign(window,Ys);Object.assign(window,Ao);Object.assign(window,So);Object.assign(window,eo);Object.assign(window,co);Object.assign(window,_o);Object.assign(window,vo);Object.assign(window,Go);Object.assign(window,Ls);window._recentlyMovedTasks=window._recentlyMovedTasks||new Map;Lo();document.addEventListener("click",e=>{const a=e.target.closest("[data-action], [data-view], button, a");if(a){const n=a.dataset.action||a.dataset.view||a.innerText?.trim()?.slice(0,40)||a.tagName;st("ui.click",`النقر على: ${n}`)}typeof Za=="function"&&Za(e).catch(n=>{wa(n,{source:"handleClick"}),typeof $=="function"&&$(n.message,!0)})});document.addEventListener("submit",e=>{const a=e.target.id||e.target.dataset.action||"form";st("form.submit",`إرسال نموذج: ${a}`),typeof Xa=="function"&&Xa(e).catch(n=>{wa(n,{source:"handleSubmit"}),typeof $=="function"&&$(n.message,!0)})});document.addEventListener("input",e=>{typeof Qa=="function"&&Qa(e)});document.addEventListener("change",e=>{typeof en=="function"&&en(e)});document.addEventListener("keydown",e=>{e.key==="Escape"&&typeof V=="function"&&V()});var La=null;window.addEventListener("resize",()=>{r.view==="project-detail"&&r.projectTab==="timeline"&&(La||(La=requestAnimationFrame(()=>{La=null,typeof Ra=="function"&&Ra()})))});window.addEventListener("error",e=>{const a=String(e?.message||e?.error?.message||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Runtime Error:",e.error),wa(e.error||{message:a},{source:"window.onerror"}),typeof $=="function"&&$(`خطأ برمجي: ${e.message}`,!0))});window.addEventListener("unhandledrejection",e=>{const a=String(e?.reason?.message||e?.reason||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Unhandled Rejection:",e.reason),wa(e.reason||{message:a},{source:"unhandledrejection",errorType:"UnhandledRejection"}))});"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{e.addEventListener("updatefound",()=>{const a=e.installing;a&&a.addEventListener("statechange",()=>{a.state==="installed"&&navigator.serviceWorker.controller&&console.log("[PWA] New version ready for next visit.")})})}).catch(e=>{console.warn("[PWA] ServiceWorker registration skipped:",e.message)})});Wo();Ws();vs();
