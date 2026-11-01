var bn=Object.defineProperty,ce=(e,a)=>{let n={};for(var o in e)bn(n,o,{get:e[o],enumerable:!0});return a||bn(n,Symbol.toStringTag,{value:"Module"}),n};(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function Ft(e){if(typeof document>"u"||!e||!document.cookie)return null;const a=document.cookie.split("; "),n=encodeURIComponent(String(e))+"=",o=String(e)+"=";for(let r=0;r<a.length;r++){const i=a[r];if(i.startsWith(n)){const d=i.substring(n.length);try{return decodeURIComponent(d)}catch{return d}}else if(i.startsWith(o)){const d=i.substring(o.length);try{return decodeURIComponent(d)}catch{return d}}}return null}function zi(){if(typeof window>"u")return"ar";try{let e=Ft("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const a=Ft("darc_prefs");if(a)try{e=JSON.parse(a).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function Li(){if(typeof window>"u")return"light";try{let e=Ft("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const a=Ft("darc_prefs");if(a)try{e=JSON.parse(a).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function Oi(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const a=window.location.hash.replace(/^#/,"");if(a&&!["login","forgot"].includes(a)){const[o,r]=a.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(o)){let i=null,d="overview",l="profile";if(r){const p=new URLSearchParams(r),u=p.get("id");u&&/^[a-zA-Z0-9_-]{3,64}$/.test(u)&&(i=u);const m=p.get("tab");m&&["overview","tasks","drawings","documents","timeline","activity"].includes(m)&&(d=m);const v=p.get("section");v&&["profile","company","roles","accounts","whatsapp","security","audit","trash","analytics","diagnostics","preferences"].includes(v)&&(l=v)}return{view:o,activeProjectId:i,projectTab:d,settingsSection:l}}}const n=sessionStorage.getItem("darc_last_route");if(n){const o=JSON.parse(n);if(o.view)return{view:o.view,activeProjectId:o.activeProjectId||null,projectTab:o.projectTab||"overview",settingsSection:o.settingsSection||"profile"}}}catch{}return e}var Pt=Oi(),s={lang:zi(),theme:Li(),view:Pt.view,activeProjectId:Pt.activeProjectId,projectTab:Pt.projectTab,settingsSection:Pt.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},Ri="darc_offline_db",Ni=1,Ce="cache_store",et="darc_offline_bootstrap",Se="darc_offline_mutations_queue",na=!1,ia=null;function Pa(){return typeof indexedDB>"u"?Promise.resolve(null):(ia||(ia=new Promise(e=>{try{const a=indexedDB.open(Ri,Ni);a.onupgradeneeded=n=>{const o=n.target.result;o.objectStoreNames.contains(Ce)||o.createObjectStore(Ce)},a.onsuccess=()=>e(a.result),a.onerror=()=>e(null)}catch{e(null)}})),ia)}async function Fi(e){const a=await Pa();return a?new Promise(n=>{try{const o=a.transaction(Ce,"readonly").objectStore(Ce).get(e);o.onsuccess=()=>n(o.result||null),o.onerror=()=>n(null)}catch{n(null)}}):null}async function Bi(e,a){const n=await Pa();return n?new Promise(o=>{try{const r=n.transaction(Ce,"readwrite").objectStore(Ce).put(a,e);r.onsuccess=()=>o(!0),r.onerror=()=>o(!1)}catch{o(!1)}}):!1}async function hn(e){const a=await Pa();return a?new Promise(n=>{try{const o=a.transaction(Ce,"readwrite").objectStore(Ce).delete(e);o.onsuccess=()=>n(!0),o.onerror=()=>n(!1)}catch{n(!1)}}):!1}function Ui(){return typeof navigator<"u"?navigator.onLine:!0}function ue(e){if(!e)return;const a={timestamp:Date.now(),data:e};if(Bi(et,a).catch(()=>{}),typeof localStorage<"u"){const n=()=>{try{localStorage.setItem(et,JSON.stringify(a))}catch(o){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",o.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:2e3}):setTimeout(n,50)}}function Ca(){if(typeof localStorage<"u")try{const e=localStorage.getItem(et);if(e){const a=JSON.parse(e);if(a?.data)return a.data}}catch{}return null}async function xn(){const e=await Fi(et);return e?.data?e.data:Ca()}async function wn(){if(typeof localStorage<"u")try{localStorage.removeItem(et),localStorage.removeItem(Se)}catch{}await Promise.all([hn(et),hn(Se)]),Ye()}function Ye(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:kt().length}}))}function Xe(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function $n({path:e,method:a="POST",body:n=null,description:o=""}){if(typeof localStorage>"u")return null;try{const r=localStorage.getItem(Se),i=r?JSON.parse(r):[];if(a==="DELETE"){if(e.startsWith("/api/tasks/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/tasks"&&p.body?.id===l)){const p=i.filter(u=>!(u.path==="/api/tasks"&&u.body?.id===l||u.path===`/api/tasks/${l}`||u.path.startsWith(`/api/tasks/${l}/`)));return localStorage.setItem(Se,JSON.stringify(p)),Ye(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/projects"&&p.body?.id===l)){const p=i.filter(u=>!(u.path==="/api/projects"&&u.body?.id===l||u.path===`/api/projects/${l}`||u.method==="POST"&&u.path==="/api/tasks"&&u.body?.projectId===l));return localStorage.setItem(Se,JSON.stringify(p)),Ye(),{id:"compacted",compacted:!0}}}}const d={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substring(2,8),path:e,method:a,body:n,description:o,createdAt:new Date().toISOString()};return i.push(d),localStorage.setItem(Se,JSON.stringify(i)),Ye(),console.log("[Offline Outbox] Enqueued mutation:",d),d}catch(r){return console.warn("[Offline Outbox] Failed to enqueue mutation:",r.message),null}}function kt(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(Se);return e?JSON.parse(e):[]}catch{return[]}}function qi(){typeof localStorage>"u"||(localStorage.removeItem(Se),Ye())}function kn(e,a,n,o){if(!o||!o.data)return{ok:!0,queued:!0,offline:!0};const r=new Date().toISOString();if(a==="POST"&&e==="/api/tasks"&&n){const i=n.id||Xe("tsk");n.id=i;const d={id:i,code:"OFFLINE",projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",status:n.status||"not_started",priority:n.priority||"medium",categoryAr:n.categoryAr||"عام",categoryEn:n.categoryEn||"General",weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:o.data.users?.find(p=>p.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:r,updatedAt:r,_isOfflinePending:!0};o.data.tasks||(o.data.tasks=[]);const l=o.data.tasks.findIndex(p=>p.id===i);return l!==-1?o.data.tasks[l]=d:o.data.tasks.unshift(d),ue(o.data),{ok:!0,queued:!0,offline:!0,task:d}}if(a==="PATCH"&&e.startsWith("/api/tasks/")&&n){const i=e.split("/")[3],d=(o.data.tasks||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...o.data.tasks[d],...n,updatedAt:r,_isOfflinePending:!0};return n.assigneeId!==void 0&&(l.assignee=o.data.users?.find(p=>p.id===n.assigneeId)||null),o.data.tasks[d]=l,ue(o.data),{ok:!0,queued:!0,offline:!0,task:l}}}if(a==="DELETE"&&e.startsWith("/api/tasks/")){const i=e.split("/")[3];return o.data.tasks&&(o.data.tasks=o.data.tasks.filter(d=>d.id!==i),ue(o.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e==="/api/projects"&&n){const i=n.id||Xe("prj");n.id=i;const d={id:i,code:n.code||"DARC-OFF",nameAr:n.nameAr||n.name||"مشروع محلي جديد",nameEn:n.nameEn||n.name||"New Offline Project",clientAr:n.clientAr||"",clientEn:n.clientEn||"",descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",lifecycle:n.lifecycle||"planning",health:n.health||"on_track",progress:0,progressMode:"weighted",managerId:n.managerId||o.data.user?.id,startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:r,updatedAt:r,_isOfflinePending:!0};o.data.projects||(o.data.projects=[]);const l=o.data.projects.findIndex(p=>p.id===i);return l!==-1?o.data.projects[l]=d:o.data.projects.unshift(d),ue(o.data),{ok:!0,queued:!0,offline:!0,project:d}}if(a==="PATCH"&&e.startsWith("/api/projects/")&&n){const i=e.split("/")[3],d=(o.data.projects||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...o.data.projects[d],...n,updatedAt:r,_isOfflinePending:!0};return o.data.projects[d]=l,ue(o.data),{ok:!0,queued:!0,offline:!0,project:l}}}if(a==="DELETE"&&e.startsWith("/api/projects/")){const i=e.split("/")[3];return o.data.projects&&(o.data.projects=o.data.projects.filter(d=>d.id!==i),ue(o.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e.includes("/comments")&&n){const i=e.split("/")[3],d={id:n.id||Xe("cmt"),taskId:i,userId:o.data.user?.id,content:n.content,createdAt:r,_isOfflinePending:!0};return n.id=d.id,o.data.comments||(o.data.comments=[]),o.data.comments.some(l=>l.id===d.id)||o.data.comments.push(d),ue(o.data),{ok:!0,queued:!0,offline:!0,comment:d}}return a==="PATCH"&&e==="/api/tasks/reorder"&&n&&Array.isArray(n.items)?(o.data.tasks&&(n.items.forEach(i=>{const d=o.data.tasks.find(l=>l.id===i.id);d&&(i.status&&(d.status=i.status),i.sortOrder&&(d.sortOrder=i.sortOrder),i.customFields&&(d.customFields={...d.customFields||{},...i.customFields}),d._isOfflinePending=!0)}),ue(o.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function Ma(e){if(na)return{total:0,synced:0,failed:0};const a=kt();if(!a.length)return{total:0,synced:0,failed:0};na=!0,console.log(`[Offline Sync] Replaying ${a.length} pending mutations...`);let n=0,o=!1;const r=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,i=new Set(["POST","PATCH","PUT","DELETE"]);for(let d=0;d<a.length;d++){const l=a[d];if(!l||!l.path||typeof l.path!="string"||!r.test(l.path)||!i.has(l.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",l?.id,l?.path);continue}try{const p={method:l.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":l.id,"X-Idempotency-Key":l.id}};l.body&&(p.body=typeof l.body=="string"?l.body:JSON.stringify(l.body));const u=await e(l.path,p);if(u&&u.error&&!u.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",l.id,u.error);else{n++;const m=l.body&&typeof l.body=="object"&&l.body.id||typeof l.path=="string"&&l.path.split("/")[3];m&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(m)}}catch(p){if(console.error("[Offline Sync] Failed to replay mutation:",l.id,l.path,p.message),typeof navigator<"u"&&!navigator.onLine||p.message&&(p.message.includes("تعذر الاتصال")||p.message.includes("fetch")||p.message.includes("NetworkError")||p.name==="TypeError")){const u=a.slice(d);typeof localStorage<"u"&&localStorage.setItem(Se,JSON.stringify(u)),o=!0;break}}}return o||qi(),na=!1,Ye(),{total:a.length,synced:n,failed:o?a.length-n:0}}var Hi=ce({closeModal:()=>K,modalShell:()=>ye,renderLoading:()=>At,showToast:()=>k});function At(){document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${t("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var Le=!1,Pe=null;function K(e=!1){Pe&&(clearTimeout(Pe),Pe=null);const a=document.getElementById("preview-modal-overlay");a&&(a.style.display="none",a.innerHTML="");const n=document.getElementById("modal-root");if(!n||!n.hasChildNodes()){document.body.style.overflow="",Le=!1;return}if(e){n.innerHTML="",document.body.style.overflow="",Le=!1;return}if(Le)return;Le=!0;const o=n.querySelector(".modal-backdrop"),r=n.querySelector(".modal");o&&r?(o.classList.add("is-closing"),r.classList.add("is-closing"),Pe=setTimeout(()=>{Pe=null,n.innerHTML="",document.body.style.overflow="",Le=!1},150)):(n.innerHTML="",document.body.style.overflow="",Le=!1)}function ye(e,a,n,o="",r=""){return Pe&&(clearTimeout(Pe),Pe=null),Le=!1,document.body.style.overflow="hidden",`<div class="modal-backdrop ${o?`backdrop-${o}`:""}"><div class="modal ${r}" data-modal="${o}"><div class="modal-head"><div><h2>${c(e)}</h2><p>${c(a||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${t("إغلاق","Close")}">${x("close",15)}</button></div>${n}</div></div>`}function k(e,a=!1){const n=document.getElementById("toast-root");if(!n)return;const o=document.createElement("div");o.className=`toast ${a?"error":""}`,o.innerHTML=`${x(a?"alert":"check",16)}<span>${c(e)}</span>`,n.appendChild(o),setTimeout(()=>o.remove(),3600)}var Wi=ce({I18N:()=>pa,PERMISSION_ALIASES:()=>Rn,avatar:()=>W,can:()=>S,canManageAccountPermissions:()=>Xi,choose:()=>t,currentViewTitle:()=>Ra,dateLabel:()=>ve,dueLabel:()=>Ln,esc:()=>c,extractDrawingVersion:()=>zn,formatDateTime:()=>Oa,formatReportDate:()=>qe,formatReportTime:()=>St,formatUnifiedDateNumeric:()=>Ji,getActiveCalendarSystem:()=>Me,getCookieVal:()=>Gi,getFileFormatInfo:()=>La,getHijriDateEquivalent:()=>Vi,getTaskStatusStyle:()=>za,getTimeBasedGreeting:()=>Mn,icon:()=>x,initials:()=>yt,isAdmin:()=>_,isOverdue:()=>Ee,playSuccessChime:()=>Bt,priorityText:()=>Yi,roleFor:()=>On,roleName:()=>ae,runInWorker:()=>Zi,sanitizeForSpreadsheet:()=>N,savePreferencesCookies:()=>vt,showToast:()=>k,statusBadge:()=>Ki,statusText:()=>H,t:()=>g}),pa={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function g(e){return pa[s.lang][e]||pa.ar[e]||e}function t(e,a){return s.lang==="ar"?e:a}function Gi(e){if(typeof document>"u"||!e)return null;const a=document.cookie?document.cookie.split("; "):[];for(const n of a){const o=n.indexOf("=");if(o!==-1&&n.slice(0,o).trim()===e)return decodeURIComponent(n.slice(o+1))}return null}function vt({theme:e,lang:a}={}){if(typeof document>"u")return;const n=31536e3,o=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let r="";if(typeof window<"u"){const m=window.location.hostname;(m==="darc-design.bond"||m.endsWith(".darc-design.bond"))&&(r="; Domain=.darc-design.bond")}const i=e==="dark"||e==="light"?e:null,d=a==="ar"||a==="en"?a:null;if(i){document.cookie=`darc_theme=${encodeURIComponent(i)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`;try{window.localStorage.setItem("darc-theme",i)}catch{}}if(d){document.cookie=`darc_lang=${encodeURIComponent(d)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`;try{window.localStorage.setItem("darc-locale",d)}catch{}}const l=i||(s&&s.theme==="dark"?"dark":"light")||"light",p=d||(s&&s.lang==="en"?"en":"ar")||"ar",u=JSON.stringify({theme:l,lang:p});document.cookie=`darc_prefs=${encodeURIComponent(u)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`}function c(e){return String(e??"").replace(/[&<>'"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[a])}function N(e){if(e==null)return"";const a=String(e),n=a.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(a)?`'${a}`:a}function x(e,a=18){const n={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};return`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n[e]||n.info}</svg>`}function yt(e){if(!e)return"D";const a=s.lang==="ar"?e.name:e.nameEn||e.name;return(a.replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join("")||a.slice(0,2)).toUpperCase()}function W(e,a=""){const n=e||{name:"DARC",avatarColor:"#0d6269"},o=/^#[0-9a-f]{6}$/i.test(n.avatarColor||"")?n.avatarColor:"#0d6269",r=c(t(n.name,n.nameEn||n.name));if(n.avatarUrl){const i=c(yt(n)).replace(/['"\\]/g,"");return`<span class="avatar ${a}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${r}"><img src="${c(n.avatarUrl)}" alt="${r}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${o}';this.parentElement.textContent='${i}';" /></span>`}return`<span class="avatar ${a}" style="background:${o}" title="${r}">${c(yt(n))}</span>`}function Mn(){const e=new Date().getHours();return s.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function za(e){const a=e?.status,n=Ee(e);return a==="done"||a==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:t("مكتملة","Completed")}:a==="review"||a==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:t("للمراجعة والاعتماد","In Review")}:a==="blocked"||n?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:n?t("متأخرة","Overdue"):t("متوقفة","Blocked")}:a==="in_progress"||a==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:t("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:t("غير مبدوءة","Not Started")}}function La(e,a=""){const n=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(n)?{ext:n.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(n)?{ext:n.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:n==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["png","jpg","jpeg","webp","heic"].includes(n)?{ext:n.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["zip","rar","7z","tar"].includes(n)?{ext:n.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:n.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function zn(e){if(!e)return null;const a=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return a?`V${a[1]}`:null}function Me(){let e=null;try{e=localStorage.getItem("darc_calendar_system")}catch{}return s.calendarSystem||s.data?.user?.customFields?.calendarSystem||e||"gregorian"}function ve(e,a=!0){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(n.getTime()))return"—";if(Me()==="hijri"){const r=s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura";return new Intl.DateTimeFormat(r,{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n)}const o=s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory";return new Intl.DateTimeFormat(o,{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n)}function Ji(e){if(!e)return"—";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(a.getTime()))return"—";if(Me()==="hijri"){const n=s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura";return new Intl.DateTimeFormat(n,{day:"2-digit",month:"2-digit",year:"numeric"}).format(a)}return`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}/${a.getFullYear()}`}function Oa(e,a={}){if(!e)return{date:"—",time:"—",full:"—"};try{const n=new Date(e);if(Number.isNaN(n.getTime()))return{date:String(e),time:"—",full:String(e)};const o=Me(),r=s.lang==="ar",i=o==="hijri"?r?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":r?"ar-u-ca-gregory":"en-GB-u-ca-gregory",d=new Intl.DateTimeFormat(i,{year:"numeric",month:a.monthStyle||"short",day:"numeric"}).format(n),l=r?"ar-SA":"en-US",p=new Intl.DateTimeFormat(l,{hour:"2-digit",minute:"2-digit",...a.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(n);return{date:d,time:p,full:`${d} ${p}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function qe(e=new Date){const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=Me(),o=s.lang==="ar",r=n==="hijri"?o?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o?"ar-u-ca-gregory":"en-GB-u-ca-gregory";return new Intl.DateTimeFormat(r,{dateStyle:"full"}).format(a)}function St(e=new Date){const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=s.lang==="ar";return new Intl.DateTimeFormat(n?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(a)}function Vi(e){if(!e)return"";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"":new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(a)}function Ln(e){if(!e)return"—";const a=new Date(`${e}T23:59:59`),n=Math.ceil((a-new Date)/864e5);return n<0?t(`متأخرة ${Math.abs(n)} ${g("days")}`,`${Math.abs(n)} ${g("days")} ${g("ago")}`):n===0?g("today"):t(`بعد ${n} ${g("days")}`,`in ${n} ${g("days")}`)}function Ee(e){return e?.dueDate&&!["done","completed","canceled"].includes(e.status)&&new Date(`${e.dueDate}T23:59:59`)<new Date}function H(e){return{not_started:g("notStarted"),in_progress:g("inProgress"),review:g("review"),approval:g("approval"),done:g("done"),blocked:g("blocked"),canceled:g("canceled"),planning:g("planning"),active:g("active"),on_hold:g("onHold"),completed:g("completed"),archived:g("archived"),on_track:g("onTrack"),at_risk:g("atRisk"),off_track:g("offTrack")}[e]||e}function Ki(e){return e?`<span class="status-badge ${c(e)}">${c(H(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function Yi(e){return{low:g("low"),medium:g("medium"),high:g("high"),urgent:g("urgent")}[e]||e}function On(e){const a=typeof e=="string"?s.data?.users?.find(n=>n.id===e):e;return a?s.data?.roles?.find(n=>n.id===a.roleId)||{id:a.roleId,nameAr:a.roleNameAr||"",nameEn:a.roleNameEn||"",permissions:[]}:null}function ae(e){const a=On(e);return a?t(a.nameAr,a.nameEn):"—"}var Rn={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function S(e){const a=s.data?.role?.permissions||[];if(a.includes("*")||a.includes(e))return!0;const n=Rn[e];return!!(n&&a.includes(n))}function _(){return s.data?.user?.roleId==="admin"}function Xi(){return _()||s.data?.user?.roleId==="account_permissions_manager"||s.data?.role?.permissions?.includes("manage_existing_account_permissions")}function Ra(){return s.view==="project-detail"?t("تفاصيل المشروع","Project details"):{dashboard:g("dashboard"),projects:g("projects"),tasks:g("myTasks"),documents:g("documents"),templates:g("templates"),team:g("team"),reports:g("reports"),settings:g("settings")}[s.view]||g("dashboard")}function Bt(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const a=new e,n=a.currentTime,o=a.createOscillator(),r=a.createGain();o.type="sine",o.frequency.setValueAtTime(587.33,n),r.gain.setValueAtTime(.08,n),r.gain.exponentialRampToValueAtTime(.001,n+.35),o.connect(r),r.connect(a.destination),o.start(n),o.stop(n+.35);const i=a.createOscillator(),d=a.createGain();i.type="sine",i.frequency.setValueAtTime(880,n+.12),d.gain.setValueAtTime(.001,n),d.gain.setValueAtTime(.09,n+.12),d.gain.exponentialRampToValueAtTime(.001,n+.65),i.connect(d),d.connect(a.destination),i.start(n+.12),i.stop(n+.65)}catch{}}function Zi(e,a){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(a)):new Promise((n,o)=>{try{const r=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),i=URL.createObjectURL(r),d=new Worker(i);d.onmessage=l=>{URL.revokeObjectURL(i),d.terminate(),l.data.ok?n(l.data.result):o(new Error(l.data.error))},d.onerror=l=>{URL.revokeObjectURL(i),d.terminate(),o(l)},d.postMessage(a)}catch{try{n(e(a))}catch(i){o(i)}}})}var Qi=Date.now(),Nn=0,Ut=0,qt=0,sa=null,An=Date.now(),Mt=[];function Et(e="action",a="",n=null){const o=new Date().toTimeString().split(" ")[0];Mt.push({time:o,category:e,message:String(a||"").slice(0,150),metadata:n?JSON.stringify(n).slice(0,200):null}),Mt.length>15&&Mt.shift()}function Fn(){return[...Mt]}typeof document<"u"&&setInterval(()=>{document.visibilityState==="visible"&&Nn++},1e3);if(typeof window<"u"){try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{qt+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ht(!1,!0)}),window.addEventListener("pagehide",()=>{Ht(!1,!0)})}function Na(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function es(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let a="Chrome";e.includes("Edg/")?a="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?a="Safari":e.includes("Firefox/")&&(a="Firefox");let n="macOS";return e.includes("Win")?n="Windows":e.includes("Android")?n="Android":e.includes("iPhone")||e.includes("iPad")?n="iOS":e.includes("Linux")&&(n="Linux"),{os:n,browser:a}}function ts(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function Yt(e,a={}){Ut++;const{os:n,browser:o}=es(),r=ts(),i=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",d=e||{},l=String(d.message||d.reason||d||"Unknown client error"),p=String(d.stack||a.stack||"No stack trace provided."),u=d.name||a.errorType||"ClientRuntimeError";Et("error",`${u}: ${l}`);const m=s.data?.user||{},v={userId:m.id||"usr_demo",userName:m.name||"مدير التوظيف / زائر",userEmail:m.email||"demo@darc-design.bond",userRole:m.jobTitleAr||s.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:m.avatarColor||"#0d6269",errorType:u,errorMessage:l,stackTrace:p,deviceType:r,browser:o,os:n,screenResolution:i,memoryMb:Na(),currentView:s.view?`#${s.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:Fn(),severity:a.severity||"high",titleAr:a.titleAr||`خطأ تشغيلي في مساحة العمل (${u})`,titleEn:a.titleEn||`Workspace Runtime Error (${u})`};try{return await D("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(v),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const y=new Blob([JSON.stringify(v)],{type:"application/json"});navigator.sendBeacon((Xt||"")+"/api/telemetry/report-error",y)}catch{}}}async function Ht(e=!1,a=!1){const n=Date.now(),o=Math.max(5,Math.round((n-An)/1e3));An=n;const r={userId:s.data?.user?.id||"anonymous",durationSeconds:o,memoryMb:Na(),errorCount:Ut,longTaskCount:qt,currentView:s.view||"dashboard"};if(r.memoryMb>140&&(e=!0),a&&typeof navigator<"u"&&navigator.sendBeacon)try{const i=new Blob([JSON.stringify(r)],{type:"application/json"}),d=(Xt||"")+"/api/telemetry/heartbeat";navigator.sendBeacon(d,i);return}catch{}try{const i=await D("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(r),silent:!0});return Ut=0,qt=0,i}catch{}}function as(){sa&&clearInterval(sa),setTimeout(()=>Ht(!1),5e3),sa=setInterval(()=>{document.visibilityState==="visible"&&Ht(!1)},45e3)}function Bn(){return{totalSessionDurationSeconds:Math.round((Date.now()-Qi)/1e3),activeDurationSeconds:Nn,memoryMb:Na(),errorCount:Ut,longTaskCount:qt,recentBreadcrumbs:Fn()}}var Xt=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",rt=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function tt(){rt=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function D(e,a={}){const n=["POST","PATCH","PUT","DELETE"].includes(a.method),o=e.startsWith("/api/auth"),r=!!(a.headers&&(a.headers["X-Offline-Replay"]==="true"||a.headers["X-Offline-Replay"]===!0));let i=null;if(n&&a.body)try{i=typeof a.body=="string"?JSON.parse(a.body):a.body}catch{}if(a.method==="POST"&&i&&typeof i=="object"&&!r&&(e==="/api/tasks"&&!i.id?(i.id=Xe("tsk"),a.body=JSON.stringify(i)):e==="/api/projects"&&!i.id?(i.id=Xe("prj"),a.body=JSON.stringify(i)):e.includes("/comments")&&!i.id&&(i.id=Xe("cmt"),a.body=JSON.stringify(i))),typeof navigator<"u"&&!navigator.onLine&&n&&!o){if(r)throw new Error(t("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));const w=$n({path:e,method:a.method,body:i}),T=kn(e,a.method,i,s);return k(t("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡","Offline mode: action saved locally and will auto-sync on reconnect 📡"),!1),{ok:!0,queued:!0,offline:!0,id:w?.id,...T}}const d=typeof localStorage<"u"?localStorage.getItem("darc_token"):null,l=!!(a.silent||a.headers&&a.headers["X-Silent"]),p=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),u=!!rt&&(l||!!s.data||p),m=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,v=typeof FormData<"u"&&a.body instanceof FormData,$={...d?{Authorization:`Bearer ${d}`}:{},...a.body&&!v?{"Content-Type":"application/json"}:{},...m?{"X-Mutation-ID":m}:{},...e==="/api/bootstrap"&&u?{"If-None-Match":rt}:{},...e==="/api/bootstrap"&&!u?{"Cache-Control":"no-cache, no-store"}:{},...a.headers||{}};e==="/api/bootstrap"&&!u&&(a.cache="no-cache"),a.credentials="include";let y;try{y=await fetch(Xt+e,{...a,headers:$})}catch{if(n&&!o&&!r){const T=$n({path:e,method:a.method,body:i}),I=kn(e,a.method,i,s);return k(t("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡","Connection lost: action saved locally for auto-sync 📡"),!1),{ok:!0,queued:!0,offline:!0,id:T?.id,...I}}throw new Error(t("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(y.status===304)return null;if(!y.ok){const w=await y.text();y.status!==401&&console.error(`API Failed [${e}]: ${y.status} - ${w}`);let T={};try{T=JSON.parse(w)}catch{}y.status===401&&(rt=null,typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login"&&(typeof localStorage<"u"&&localStorage.removeItem("darc_token"),s.data&&(s.data.user=null),typeof window<"u"&&window.location.hash!=="#login"&&(window.location.hash="#login"))),Et("api.error",`${a.method||"GET"} ${e} (Status ${y.status}: ${T.error||"Failed"})`);const I=new Error(T.error||`Failed to fetch ${e}`);throw I.status=y.status,I}const h=y.headers.get("ETag");if(h&&e==="/api/bootstrap"){rt=h;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",h)}catch{}}const f=await y.json().catch(()=>({ok:!0}));if(["POST","PATCH","PUT","DELETE"].includes(a.method)){tt();let w=i&&typeof i.id=="string"?i.id:null;if(!w&&f&&typeof f=="object"&&(w=f.id||f.task?.id||f.project?.id||f.comment?.id||f.document?.id||f.data?.id),!w&&typeof e=="string"){const T=e.split("/");T.length>=4&&T[3]&&!T[3].includes("?")&&(w=T[3])}if(w&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(w),m&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(m),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let T=null;if(f&&(f.task?T={table:"tasks",action:a.method==="POST"?"INSERT":"UPDATE",record:f.task}:f.project?T={table:"projects",action:a.method==="POST"?"INSERT":"UPDATE",record:f.project}:f.comment?T={table:"comments",action:a.method==="POST"?"INSERT":"UPDATE",record:f.comment}:f.document&&(T={table:"documents",action:a.method==="POST"?"INSERT":"UPDATE",record:f.document})),!T&&a.method==="DELETE"&&w&&(e.startsWith("/api/tasks/")?T={table:"tasks",action:"DELETE",record:{id:w}}:e.startsWith("/api/projects/")?T={table:"projects",action:"DELETE",record:{id:w}}:e.startsWith("/api/documents/")?T={table:"documents",action:"DELETE",record:{id:w}}:e.startsWith("/api/comments/")&&(T={table:"comments",action:"DELETE",record:{id:w}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(T);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:T?"GRANULAR_DELTA":"STATE_MUTATION",delta:T,timestamp:Date.now()})}catch{}}}}return f}typeof window<"u"&&(window.api=D);var ns=ce({canAccessView:()=>Z,getFirstAllowedView:()=>Te,loadData:()=>oe,navItem:()=>ke,refreshView:()=>ee,renderApp:()=>G,renderSyncIndicator:()=>Fa,renderView:()=>C,switchView:()=>me});function Z(e){return s.data?e==="dashboard"?S("view_dashboard"):e==="projects"||e==="project-detail"?S("view_projects"):e==="tasks"?S("create_tasks")||S("edit_tasks")||S("delete_tasks")||S("assign_tasks")||S("review_tasks")||S("approve_tasks")||S("manage_reminders")||S("view_projects")||_():e==="documents"?S("upload_documents")||S("delete_documents")||_():e==="templates"?S("manage_templates")||_():e==="team"?_()||S("manage_users"):e==="reports"?S("view_reports")||_():e==="settings":!0}function Te(){for(const e of["dashboard","projects","tasks","documents","templates","team","reports","settings"])if(Z(e))return e;return"dashboard"}function Fa(){const e=kt().length;return Ui()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${t("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:"":`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${t("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}if(typeof window<"u"&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;const e=()=>{const a=document.getElementById("sync-status-indicator");a&&(a.innerHTML=Fa())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function ke(e,a,n){return`<button class="nav-item ${s.view===e||e==="projects"&&s.view==="project-detail"?"active":""}" data-view="${e}">${x(n,17)}<span>${a}</span></button>`}function G(){if(s.data&&!Z(s.view)&&(s.view=Te()),typeof window<"u"){const o=window.location.hash.replace(/^#/,"");if(!o||o==="login"||o==="forgot"){let r=s.view;s.view==="project-detail"&&s.activeProjectId?r=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:s.view==="settings"&&s.settingsSection&&(r=`settings?section=${encodeURIComponent(s.settingsSection)}`),window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${r}`):(window._isInternalNav=!0,window.location.hash=`#${r}`)}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";const e=(s.data?.notifications||[]).filter(o=>!o.read&&!o.readAt).length,a=s.data?.user||{},n=_()||S("manage_settings")||S("manage_roles")||S("manage_users")||S("manage_trash")||S("view_audit_logs");document.getElementById("app").innerHTML=`
    <div class="app-shell ${s.lang==="en"?"is-ltr":""}">
      <aside class="sidebar ${s.sidebarOpen?"open":""}">
        <div class="sidebar-brand">
          ${s.data?.company?.logoUrl?`<img src="${c(s.data?.company?.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${x("building",20)}</span>`:`<span class="brand-mark">${x("building",20)}</span>`}
          <div>
            <div class="brand-name">${c(t(s.data?.company?.nameAr||s.data?.company?.name||"DARC Design Team",s.data?.company?.nameEn||s.data?.company?.name||"DARC Design Team"))}</div>
            <div class="brand-subtitle">${g("workspace")}</div>
          </div>
        </div>
        <div class="nav-title">${t("مساحة العمل","WORKSPACE")}</div>
        <nav class="nav-list">
          ${Z("dashboard")?ke("dashboard",g("dashboard"),"grid"):""}
          ${Z("projects")?ke("projects",g("projects"),"building"):""}
          ${Z("tasks")?ke("tasks",g("myTasks"),"checklist"):""}
          ${Z("documents")?ke("documents",g("documents"),"document"):""}
          ${Z("templates")?ke("templates",g("templates"),"layers"):""}
          ${Z("team")?ke("team",g("team"),"users"):""}
          ${Z("reports")?ke("reports",g("reports"),"chart"):""}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${n?t("إدارة النظام","ADMIN"):t("حسابي","MY ACCOUNT")}</div>
        <nav class="nav-list">${ke("settings",n?g("settings"):t("الملف الشخصي والأمان","Profile & Security"),"settings")}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${W(a)}<div class="admin-info"><strong>${c(t(a.name,a.nameEn||a.name))}</strong><span>${c(ae(a))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${t("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${g("signOut")}">${x("logout",15)}</button></div>
        </div>
      </aside>
      <section class="workspace">
        ${s.data?.isDemo||s.data?.user?.id==="usr_demo"?`
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
        <header class="topbar">
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${x("menu",18)}</button><div><div class="topbar-kicker">DARC / ${g("workspace")}</div><div class="topbar-title">${c(Ra())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${Fa()}</span>
            <button class="topbar-search-trigger" data-action="open-omnisearch" title="${t("بحث شامل وسريع","Omnisearch")}">
              ${x("search",14)}
              <span>${t("بحث شامل...","Search...")}</span>
              <kbd class="shortcut-kbd">${typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"⌘K":"Ctrl+K"}</kbd>
            </button>
            <button class="icon-button" data-action="open-cheatsheet" title="${t("دليل اختصارات لوحة المفاتيح (?)","Keyboard shortcuts guide (?)")}" style="color:var(--ink-soft);" aria-label="Shortcuts">
              <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
            </button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-theme">${s.theme==="dark"?"☀️":"🌙"}</button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-lang">${s.lang==="ar"?"EN":"عربي"} ${x("globe",14)}</button>
            <button class="icon-button" data-action="show-notifications" aria-label="${g("notifications")}">${x("bell",17)}${e?'<span class="notification-dot"></span>':""}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${W(a)}<div class="profile-chip-text"><strong>${c(t(a.name,a.nameEn||a.name))}</strong><span>${c(ae(a))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,C()}function C(e=!1){if(!e&&(window._isDraggingTask||window._isKeyboardDraggingTask)){window._pendingRenderAfterDrag=!0;return}const a=document.getElementById("main-content");if(!a)return;Z(s.view)||(s.view=Te());let n="";s.view==="dashboard"&&(n=renderDashboard()),s.view==="projects"&&(n=renderProjects()),s.view==="tasks"&&(n=renderTasks()),s.view==="documents"&&(n=renderDocuments()),s.view==="templates"&&(n=renderTemplates()),s.view==="team"&&(n=renderTeam()),s.view==="reports"&&(n=renderReports()),s.view==="settings"&&(n=renderSettings()),s.view==="project-detail"&&(n=renderProjectDetail()),a.innerHTML=n,s.view==="project-detail"&&s.projectTab==="timeline"&&setTimeout(drawTimelineArrows,0)}function me(e,a=void 0){s.data&&!Z(e)&&(e=Te()),Et("navigation",`الانتقال إلى واجهة #${e}${a?` (مشروع: ${a})`:""}`),s.view=e,a!==void 0&&(s.activeProjectId=a),e==="settings"&&!s.settingsSection&&(s.settingsSection="profile"),s.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelectorAll(".nav-item").forEach(o=>{const r=o.dataset.view,i=r===e||r==="projects"&&e==="project-detail";o.classList.toggle("active",i)});const n=document.querySelector(".topbar-title");n&&(n.textContent=Ra());try{let o=e;e==="project-detail"&&s.activeProjectId?o=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:e==="settings"&&s.settingsSection&&(o=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==o&&(window._isInternalNav=!0,window.location.hash=o),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:s.view,activeProjectId:s.activeProjectId,projectTab:s.projectTab,settingsSection:s.settingsSection}))}catch{}requestAnimationFrame(()=>{C();const o=document.getElementById("main-content");o&&(o.scrollTop=0,o.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function ee(e=!1){try{await oe(e)}catch(a){k(a.message,!0)}}async function oe(e=!1){try{const a=s.view==="settings"&&s.settingsSection==="trash"&&!s.trashLoaded?D("/api/trash",{silent:!0}).catch(()=>null):null;let n=await D("/api/bootstrap",{silent:e});if(n===null){if(s.data&&s.data.user)return;const r=await xn();if(r&&r.user?n=r:(tt(),n=await D("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}})),!n)return}if(ue(n),s.isOffline=!1,a)try{const r=await a;r&&(s.trash=Array.isArray(r)?r:r.trash||[...(r.projects||[]).map(i=>({...i,type:"project"})),...(r.tasks||[]).map(i=>({...i,type:"task"})),...(r.documents||[]).map(i=>({...i,type:"document"}))],s.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash)))}catch{}if(s.data?.tasks&&n?.tasks){const r=Date.now(),i=new Set(n.tasks.map(d=>d.id));for(const d of s.data.tasks)if(!i.has(d.id))r-(d.createdAt?new Date(d.createdAt).getTime():r)<12e4&&(n.tasks.unshift(d),i.add(d.id));else{const l=window._recentlyMovedTasks?.get(d.id);if(l&&r-l.timestamp<2e4){const p=n.tasks.find(u=>u.id===d.id);p&&(p.status=l.status,l.progress!==void 0&&(p.progress=l.progress),l.sortOrder!==void 0&&(p.sortOrder=l.sortOrder,p.sort_order=l.sortOrder,p.customFields||(p.customFields={}),p.customFields.sortOrder=l.sortOrder,p.customFields.sort_order=l.sortOrder,p.custom_fields||(p.custom_fields={}),p.custom_fields.sortOrder=l.sortOrder,p.custom_fields.sort_order=l.sortOrder))}}}if(s.data?.projects&&n?.projects){const r=Date.now(),i=new Set(n.projects.map(d=>d.id));for(const d of s.data.projects)i.has(d.id)||r-(d.createdAt?new Date(d.createdAt).getTime():r)<12e4&&(n.projects.unshift(d),i.add(d.id))}let o=!1;if(s.data&&n)if(s.data.updatedAt!==n.updatedAt)o=!0;else if(s.data.tasks?.length!==n.tasks?.length||s.data.projects?.length!==n.projects?.length)o=!0;else{const r=s.data.tasks||[],i=n.tasks||[];for(let d=0;d<i.length;d++){const l=i[d],p=r[d];if(!p||p.id!==l.id||p.status!==l.status||(p.sortOrder||p.sort_order)!==(l.sortOrder||l.sort_order)||p.progress!==l.progress){o=!0;break}}if(!o){const d=s.data.projects||[],l=n.projects||[];for(let p=0;p<l.length;p++){const u=l[p],m=d[p];if(!m||m.id!==u.id||m.lifecycle!==u.lifecycle||m.health!==u.health||m.progress!==u.progress){o=!0;break}}}}if(!s.data||o||s.data.comments?.length!==n.comments?.length||s.data.documents?.length!==n.documents?.length||s.data.users?.length!==n.users?.length||s.data.auditLogs?.length!==n.auditLogs?.length||s.data.notifications?.length!==n.notifications?.length||s.view==="login"){s.data=n,(s.view==="login"||!Z(s.view))&&(s.view=Te());const r=!!document.getElementById("modal-root")?.children?.length,i=!!(document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),d=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(i||d))return;requestAnimationFrame(!e&&!r?()=>G():()=>C())}else s.data=n,Z(s.view)||(s.view=Te(),requestAnimationFrame(()=>C()))}catch(a){if(a&&(a.status===401||a.status===403))throw a;const n=await xn();if(n){s.data=n,Z(s.view)||(s.view=Te()),s.isOffline=!0;const o=!!document.getElementById("modal-root")?.children?.length;!e&&!o?G():C();return}throw a}}typeof window<"u"&&(window.renderApp=G,window.renderView=C);var is=ce({calculatePasswordStrength:()=>qn,cleanupTurnstile:()=>ua,initTurnstile:()=>Ba,loadTurnstileScript:()=>Un,openForcePasswordModal:()=>ds,renderActivation:()=>Tt,renderLogin:()=>fe,renderResetPassword:()=>at,renderStrengthMeterHtml:()=>Zt}),ss="0x4AAAAAAFr3zLr2zpRS2ah4",te=null,dt=null,se=null,ot=!1;function Un(){return typeof window>"u"||window.turnstile?Promise.resolve():dt||(dt=new Promise(e=>{if(window.onloadTurnstileCallback=()=>{e()},document.getElementById("cf-turnstile-script")){window.turnstile&&e();return}const a=document.createElement("script");a.id="cf-turnstile-script",a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback",a.async=!0,a.defer=!0,a.onerror=()=>{console.warn("[Turnstile] Script failed to load, fallback mode enabled"),e()},document.body.appendChild(a)}),dt)}function ua(){if(!(typeof window>"u")){if(se=null,window.turnstile&&te!==null){try{window.turnstile.remove(te)}catch{}te=null}try{const e=document.getElementById("turnstile-container");e&&(e.innerHTML=""),document.querySelectorAll('iframe[src*="challenges.cloudflare.com"]').forEach(n=>{try{n.remove()}catch{}});const a=document.getElementById("cf-turnstile-script");a&&a.remove(),dt=null}catch{}}}async function Ba(){if(!(typeof window>"u")&&document.getElementById("turnstile-container")&&!ot){ot=!0;try{if(window.turnstile||await Un(),!window.turnstile){ot=!1;return}const e=document.getElementById("turnstile-container");if(!e){ot=!1;return}if(te!==null){try{window.turnstile.remove(te)}catch{}te=null}se=null,te=window.turnstile.render(e,{sitekey:ss,theme:s.theme==="dark"?"dark":"light",language:s.lang==="ar"?"ar":"en",appearance:"interaction-only",callback:a=>{se=a},"error-callback":a=>{console.warn("[Turnstile] Handshake notice (shielded):",a),se="fallback_client"},"expired-callback":()=>{if(se=null,window.turnstile&&te!==null)try{window.turnstile.reset(te)}catch{}}})}catch(e){console.warn("[Turnstile] Init notice:",e),se="fallback_client"}finally{ot=!1}}}typeof window<"u"&&(window.__darcInitTurnstile=Ba);async function os(){if(typeof window>"u"||!window.turnstile)return"fallback_client";if(se)return se;if(te!==null)try{const e=window.turnstile.getResponse(te);if(e)return se=e,e}catch{}return new Promise(e=>{let a=!1;const n=setTimeout(()=>{a||(a=!0,e(se||"fallback_client"))},1200),o=setInterval(()=>{if(a){clearInterval(o);return}if(se){a=!0,clearTimeout(n),clearInterval(o),e(se);return}if(te!==null&&window.turnstile)try{const r=window.turnstile.getResponse(te);if(r){a=!0,clearTimeout(n),clearInterval(o),se=r,e(r);return}}catch{}},35)})}function qn(e){const a=String(e||"");if(!a)return{score:0,label:"",percent:0,color:"var(--line)"};let n=0;return a.length>=10&&(n+=1),/[a-z]/.test(a)&&/[A-Z]/.test(a)&&(n+=1),/\d/.test(a)&&(n+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(a)&&(n+=1),n===1?{score:1,label:s.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:n===2?{score:2,label:s.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:n===3?{score:3,label:s.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:s.lang==="ar"?"قوية وممتازة 🛡️":"Strong & Secure 🛡️",percent:100,color:"var(--mint-strong)"}}function Zt(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${s.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function Ua(e,a,n,o,r){const i=document.getElementById(e);if(!i)return;const d=i.querySelector(`input[name="${a}"]`),l=i.querySelector(`input[name="${n}"]`),p=i.querySelector(r||'button[type="submit"]'),u=document.getElementById(`${o}-meter-wrap`),m=document.getElementById(`${o}-meter-bar`),v=document.getElementById(`${o}-meter-label`),$=document.getElementById(`${o}-match-indicator`);function y(){const h=d?d.value:"",f=l?l.value:"";if(h&&u&&m&&v){u.style.display="flex";const w=qn(h);m.style.width=`${w.percent}%`,m.style.background=w.color,v.textContent=w.label,v.style.color=w.color}else u&&(u.style.display="none");l&&$&&(f?h===f?($.style.display="block",$.style.color="var(--mint-strong)",$.textContent=s.lang==="ar"?"✓ كلمتا المرور متطابقتان":"✓ Passwords match",p&&(p.disabled=!1)):($.style.display="block",$.style.color="var(--red)",$.textContent=s.lang==="ar"?"✗ كلمتا المرور غير متطابقتين":"✗ Passwords do not match",p&&(p.disabled=!0)):($.style.display="none",p&&(p.disabled=!1)))}d?.addEventListener("input",y),l?.addEventListener("input",y)}function Qt(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=a=>{a.preventDefault();const n=e.getAttribute("data-target"),o=n?document.getElementById(n):e.parentElement.querySelector("input");if(!o)return;const r=o.type==="password";o.type=r?"text":"password",e.style.color=r?"var(--teal)":"var(--ink-soft)";const i=r?s.lang==="ar"?"إخفاء كلمة المرور":"Hide password":s.lang==="ar"?"إظهار كلمة المرور":"Show password";e.setAttribute("aria-label",i),e.setAttribute("title",i),r?e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';try{o.focus()}catch{}}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const a=n=>{const o=n.getModifierState&&n.getModifierState("CapsLock");let r=e.parentElement.parentElement.querySelector(".capslock-warning");o?r||(r=document.createElement("div"),r.className="capslock-warning",r.style.fontSize="11px",r.style.color="var(--amber)",r.style.marginTop="4px",r.style.display="flex",r.style.alignItems="center",r.style.gap="4px",r.innerHTML=`<span>⚠️</span> <span>${s.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(r)):r&&r.remove()};e.addEventListener("keydown",a),e.addEventListener("keyup",a)})}function rs(e,a=60){if(!e)return;e.disabled=!0;let n=a;const o=e.innerHTML,r=setInterval(()=>{n--,e.innerHTML=`<span>${s.lang==="ar"?`يرجى الانتظار (${n} ثانية)...`:`Please wait (${n}s)...`}</span>`,n<=0&&(clearInterval(r),e.disabled=!1,e.innerHTML=o)},1e3)}function fe(e="",a="login",n=!1){if(s.view="login",typeof window<"u"){const l=a==="forgot"?"#forgot":"#login";window.location.hash!==l&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",l):window.location.hash=l)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";let o="";const r=e?`<div class="login-demo" style="border-color:${n?"#cce3e0":"var(--red-soft)"};background:${n?"#f0f9f7":"var(--red-soft)"};color:${n?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${x(n?"check":"alert",15)}<span>${c(e)}</span></div>`:"",i=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";a==="login"?o=`
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
        <div id="login-error-container">${r}</div>
        <div id="turnstile-container" style="margin-bottom:12px;min-height:0;display:flex;justify-content:center;"></div>
        <button class="btn btn-primary btn-block" type="submit">${x(s.lang==="ar"?"arrowLeft":"arrowRight",16)} ${g("login")}</button>
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
        ${r}
        <button class="btn btn-primary btn-block" type="submit">${t("إرسال رابط الاستعادة","Send reset link")}</button>
        <div style="text-align:center;margin-top:15px"><a href="#" data-action="goto-login" style="font-size:13px;color:var(--ink-soft)">${t("العودة لتسجيل الدخول","Back to login")}</a></div>
      </form>
    `),document.getElementById("app").innerHTML=`
    <div class="login-shell ${s.lang==="en"?"is-ltr":""}">
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
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${s.theme==="dark"?"الوضع النهاري":"الوضع الليلي"}">${s.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            ${o}
          </div>
        </section>
      </div>
    </div>`,Qt();const d=(l,p=!1)=>{const u=document.getElementById("login-error-container");u?u.innerHTML=l?`
        <div class="login-demo" style="border-color:${p?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"};background:${p?"var(--mint)":"rgba(239,68,68,0.08)"};color:${p?"var(--mint-strong)":"var(--red)"};margin-top:0;margin-bottom:15px;padding:10px 14px;border-radius:8px;font-size:12.5px;display:flex;align-items:center;gap:8px;line-height:1.5;">
          ${x(p?"check":"alert",16)}
          <span>${c(l)}</span>
        </div>`:"":l&&k(l,!p)};document.getElementById("login-form")?.addEventListener("submit",async l=>{l.preventDefault();const p=new FormData(l.currentTarget),u=String(p.get("email")||"").trim(),m=String(p.get("password")||""),v=document.getElementById("remember-email-check")?.checked,$=l.currentTarget.querySelector('button[type="submit"]'),y=`${x(s.lang==="ar"?"arrowLeft":"arrowRight",16)} ${g("login")}`;d(""),$.disabled=!0,$.innerHTML=`<span>⏳ ${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const h=u.trim().toLowerCase()==="demo@darc-design.bond"||u.trim().toLowerCase()==="demo@darc.local";let f="bypass_dev";h||(f=await os());try{const w=await D("/api/auth/login",{method:"POST",body:JSON.stringify({email:u,password:m,turnstileToken:f})});if(ua(),typeof localStorage<"u"&&(w?.token&&localStorage.setItem("darc_token",w.token),v?localStorage.setItem("darc_last_email",u):localStorage.removeItem("darc_last_email")),vt({theme:s.theme,lang:s.lang}),s.view="dashboard",w?.bootstrap){s.data=w.bootstrap,ue(w.bootstrap),G(),oe(!0).catch(()=>{});return}const T=Ca();if(T&&T.user&&(T.user.id===w?.user?.id||w?.user?.email===T.user?.email)){T.user=w.user||T.user,s.data=T,G(),oe(!0).catch(()=>{});return}tt(),At(),await oe(),G()}catch(w){if(console.error("Login Error:",w),typeof window<"u"&&window.turnstile&&te!==null)try{window.turnstile.reset(te)}catch{}$&&($.disabled=!1,$.innerHTML=y);let T=w.message;if(typeof navigator<"u"&&!navigator.onLine)T=t("لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة وإعادة المحاولة.","No internet connection. Please check your network and try again.");else if(w.message&&(w.message.includes("Turnstile")||w.message.includes("التحقق الأمني")))T=t("فشل التحقق الأمني التلقائي (Cloudflare Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.","Security check (Turnstile) failed. Please refresh the page and try again.");else if(w.message&&(w.message.includes("429")||w.message.includes("كثيرة")||w.message.includes("rate")))T=t("تم تجاوز عدد محاولات الدخول المسموحة لحماية الحساب. يرجى الانتظار دقيقة واحدة قبل المحاولة مجدداً.","Too many login attempts. For security, please wait one minute before trying again."),rs(document.querySelector('#login-form button[type="submit"]'),60);else if(w.message&&(w.message.includes("401")||w.message.includes("غير صحيحة")||w.message.includes("credentials"))){T=t("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من صحة المدخلات وإعادة المحاولة.","Incorrect email or password. Please verify your credentials and try again.");const I=document.getElementById("login-password");if(I){I.value="";try{I.focus()}catch{}}}else w.message&&(w.message.includes("مفعل")||w.message.includes("موقوف")||w.message.includes("inactive"))?T=t("حسابك معطل أو غير مفعل حالياً. يرجى التواصل مع مسؤول النظام لإعادة التفعيل.","This account is suspended or inactive. Please contact your system administrator."):(!T||T.includes("Failed to fetch")||T.includes("NetworkError")||T.includes("Network request failed"))&&(T=t("تعذر الاتصال بخادم تسجيل الدخول. يرجى التأكد من استقرار الإنترنت وإعادة المحاولة.","Could not reach the authentication server. Please check your connection and try again."));d(T)}}),document.getElementById("forgot-form")?.addEventListener("submit",async l=>{l.preventDefault();const p=new FormData(l.currentTarget),u=String(p.get("email")||"").trim(),m=l.currentTarget.querySelector('button[type="submit"]'),v=m?m.innerHTML:"";m&&(m.disabled=!0,m.innerHTML=`<span>⏳ ${t("جاري إرسال الرابط...","Sending reset link...")}</span>`);try{await D("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:u})}),m&&(m.disabled=!1,m.innerHTML=v),d(t("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح ✨","Password reset link sent to your email successfully ✨"),!0)}catch($){m&&(m.disabled=!1,m.innerHTML=v),d($.message)}}),a==="login"?Ba():ua()}function Tt(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light",document.getElementById("app").innerHTML=`
    <div class="login-shell ${s.lang==="en"?"is-ltr":""}">
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
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${s.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang==="ar"?"EN":"عربي"}</button>
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
                ${Zt("act")}
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
    </div>`,Qt(),Ua("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function at(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";const n=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,o=!n&&!a?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
    <div class="login-shell ${s.lang==="en"?"is-ltr":""}">
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
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${s.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang==="ar"?"EN":"عربي"}</button>
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
                ${Zt("rst")}
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
    </div>`,Qt(),Ua("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async r=>{r.preventDefault();const i=new FormData(r.currentTarget),d=i.get("newPassword");if(d!==i.get("newPasswordConfirm")){at(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const l=r.currentTarget.querySelector('button[type="submit"]');l.disabled=!0;try{await D("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:d})}),window.history.replaceState({},"",window.location.pathname),At(),await oe(),G()}catch(p){at(e,p.message)}})}function ds(e){const a=e.status==="pending",n=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${a}">
      <div class="field">
        <label for="force-pass-input">${a?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${Zt("force")}
        ${e.email?a?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${x("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${a?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ye(a?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),a?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${c(e.name)}.`,`Set an initial password to activate ${c(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${c(e.name)}`,`Set a new password for ${c(e.name)}`),n,"force-password"),Qt(),Ua("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}var ls=ce({attentionItem:()=>Hn,metricCard:()=>lt,projectProgress:()=>cs,pulseChart:()=>Gn,renderDashboard:()=>ps,renderReports:()=>us,teamMetrics:()=>qa,teamRow:()=>Wn});function lt(e,a,n,o,r,i=""){return`<article class="metric-card ${o}"><div class="metric-top"><span class="metric-label">${c(e)}</span><span class="metric-icon">${x(r,15)}</span></div><div class="metric-value">${c(a)}</div><span class="metric-note ${i}">${c(n)}</span></article>`}function cs(e){const a=e.health==="off_track"?"red":e.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${g("weightedProgress")}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${a}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function Hn(e){const a=Ee(e)||e.status==="blocked"?"red":"amber",n=Ee(e)?t("متأخرة","Overdue"):e.status==="blocked"?t("متوقفة","Blocked"):t("تستحق قريبًا","Due soon");return`<button class="attention-item" data-action="open-task" data-task-id="${c(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${a}">${x(Ee(e)||e.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${a})">${c(t(e.titleAr,e.titleEn))}</strong><span>${c(n)} · ${c(Ln(e.dueDate))}</span></span></button>`}function qa(e,a){const n=a.filter(i=>i.assigneeId===e),o=n.reduce((i,d)=>i+Number(d.weight||1),0),r=o?Math.round(n.reduce((i,d)=>i+d.progress*Number(d.weight||1),0)/o):0;return{tasks:n.length,progress:r,overdue:n.filter(Ee).length}}function Wn(e,a){const n=qa(e.id,a);return`<div class="team-row"><div class="team-member">${W(e)}<div class="team-member-copy"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(t(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${n.tasks}</strong> ${g("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${g("progress")}</span><strong>${n.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${n.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${c(e.id)}">${x("more",15)}</button></div>`}function Gn(){const e=[38,48,45,62,55,72,68],a=s.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${e.map((n,o)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${o===e.length-1?"current":""}" style="height:${n}%"></span></div><span>${a[o]}</span></div>`).join("")}</div>`}function ps(){const e=s.data?.stats||{},a=s.data?.projects||[],n=s.data?.tasks||[],o=s.data?.users||[],r=s.data?.user||{},i=r.name||r.email||t("مستخدم","User"),d=a.reduce((f,w)=>f+(Number(w.totalWeight)||0),0),l=d?Math.round(a.reduce((f,w)=>f+(Number(w.progress)||0)*(Number(w.totalWeight)||0),0)/d):0,p=[...n].filter(f=>Ee(f)||f.status==="blocked"||f.dueDate&&(new Date(`${f.dueDate}T23:59:59`)-new Date)/864e5<=7).sort((f,w)=>new Date(f.dueDate||"9999-12-31")-new Date(w.dueDate||"9999-12-31")).slice(0,5),u=o.filter(f=>f.status!=="inactive"),m=e.projectCount??a.length,v=e.myTasks??n.filter(f=>f.assigneeId===r.id).length,$=e.overdueTasks??n.filter(Ee).length,y=e.dueSoon??0,h=e.completedTasks??n.filter(f=>f.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${t("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${Mn()}، ${c(t(i.replace(/^م\.\s?/,""),r.nameEn||i))}</h1><p>${g("welcomeText")}</p></div><div class="welcome-status"><span>${g("portfolioHealth")}</span><strong>${l}%</strong><small>${t("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${lt(g("activeProjects"),e.activeProjects||0,t(`${m} مشاريع إجمالًا`,`${m} projects total`),"teal","building","up")}${lt(g("openTasks"),e.openTasks??n.length,t(`${v} مسندة لك`,`${v} assigned to you`),"blue","checklist")}${lt(g("overdue"),$,t("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",$?"alert":"check",$?"alert":"")}${lt(g("dueThisWeek"),y,t("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("projectProgress")}</h2><p class="panel-subtitle">${g("projectProgressSub")}</p></div>${S("view_projects")?`<button class="text-link" data-view="projects">${g("seeAll")} ${x(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${a.length?a.slice(0,5).map(projectRow).join(""):`<div class="empty">${x("building",18)}<span>${g("noProjects")}</span></div>`}</div></section>${_()||S("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamProgress")}</h2><p class="panel-subtitle">${g("teamProgressSub")}</p></div><button class="text-link" data-view="team">${g("seeAll")} ${x(s.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${u.slice(0,6).map(f=>Wn(f,n)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("attention")}</h2><p class="panel-subtitle">${g("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${p.length}</span></div><div class="attention-list">${p.length?p.map(Hn).join(""):`<div class="empty">${x("check",18)}<span>${g("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("recentPulse")}</h2><p class="panel-subtitle">${g("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${h} ${g("done")}</span></div>${Gn()}</section></div></div>`}function us(){const{projects:e=[],tasks:a=[],users:n=[]}=s.data||{},o=S("export_reports")||_(),r=a.reduce((p,u)=>p+Number(u.weight||1),0),i=r?Math.round(a.reduce((p,u)=>p+u.progress*Number(u.weight||1),0)/r):0,d=new Map;a.forEach(p=>{const u=(s.lang==="ar"?p.categoryAr:p.categoryEn)||t(p.typeAr||"عام",p.typeEn||"General"),m=d.get(u)||{weight:0,progress:0};m.weight+=Number(p.weight||1),m.progress+=p.progress*Number(p.weight||1),d.set(u,m)});const l=[...d.entries()].map(([p,u])=>({label:p,progress:u.weight?Math.round(u.progress/u.weight):0})).sort((p,u)=>u.progress-p.progress);return`<div class="page-head"><div><p class="eyebrow">${t("قراءة الأداء","PERFORMANCE READOUT")}</p><h1>${g("reports")}</h1><p>${t("مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.","Simple signals that help management see drift before it becomes delay.")}</p></div><div class="page-actions">${o?`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${x("printer",15)} ${t("طباعة تقرير المحفظة (PDF)","Print Portfolio (PDF)")}</button>
      <button class="btn btn-soft" data-action="export-csv">${x("document",15)} ${t("تصدير الإكسل (Excel)","Export Excel")}</button>
    </div>
  `:""}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("الإنجاز حسب التخصص","Progress by discipline")}</h2><p class="panel-subtitle">${g("weightedProgress")}</p></div><span class="status-badge on_track">${i}%</span></div><div class="report-bars">${l.length?l.map(p=>`<div class="report-bar-row"><span>${c(p.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${p.progress}%"></div></div><strong>${p.progress}%</strong></div>`).join(""):`<div class="empty">${g("noTasks")}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("صحة المحفظة","Portfolio health")}</h2><p class="panel-subtitle">${t("توزيع حالات المشاريع الحالية.","Current project status distribution.")}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${g("onTrack")}</span><strong style="color:var(--mint-strong)">${e.filter(p=>p.health==="on_track").length}</strong></div><div class="report-stat"><span>${g("atRisk")}</span><strong style="color:var(--amber)">${e.filter(p=>p.health==="at_risk").length}</strong></div><div class="report-stat"><span>${g("offTrack")}</span><strong style="color:var(--red)">${e.filter(p=>p.health==="off_track").length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamLoad")}</h2><p class="panel-subtitle">${t("المهام المفتوحة لكل عضو.","Open tasks per member.")}</p></div></div><div class="report-stat-list">${n.slice(0,5).map(p=>{const u=qa(p.id,a);return`<div class="report-stat"><span>${c(t(p.name,p.nameEn||p.name))}</span><strong>${u.tasks}</strong></div>`}).join("")}</div></section></div></div>`}var ms=ce({STATUS_OPTIONS:()=>ai,buildAssigneeChipsHtml:()=>Ja,buildRemindersListHtml:()=>Va,canUserMoveTask:()=>It,drawTimelineArrows:()=>fa,filterTasks:()=>Qn,formatRemindAtDate:()=>ei,getSavedTaskSort:()=>it,getTaskSortOrder:()=>bt,initTaskModalWidgets:()=>ti,openDocumentPreviewModal:()=>ma,openTaskModal:()=>Wt,renderBoard:()=>Xn,renderCalendar:()=>Ga,renderTaskAssignees:()=>Jn,renderTaskComments:()=>ht,renderTaskDocuments:()=>Be,renderTaskSortSelect:()=>Wa,renderTasks:()=>fs,renderTimeline:()=>ea,renderTimelinePanel:()=>Zn,setSavedTaskSort:()=>Ha,sortTasks:()=>Yn,sortTasksByImportance:()=>Kn,taskCard:()=>Vn});function Jn(e){const a=s.data?.users||[],n=s._userMap||new Map(a.map(l=>[l.id,l])),o=e.assignee||n.get(e.assigneeId),r=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(l=>n.get(l)).filter(Boolean),i=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let d='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return o||r.length?(d+='<div class="avatar-stack" style="display:flex;align-items:center;">',o&&(d+=`<span title="${c(t(o.name,o.nameEn||o.name))}">${W(o,"mini-avatar")}</span>`),r.slice(0,2).forEach(l=>{d+=`<span title="${c(t(l.name,l.nameEn||l.name))}" style="margin-inline-start:-8px;">${W(l,"mini-avatar")}</span>`}),r.length>2&&(d+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${r.slice(2).map(l=>t(l.name,l.nameEn||l.name)).join("، ")}">+${r.length-2}</span>`),d+="</div>",o&&(d+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${c(t(o.name,o.nameEn||o.name))}</span>`)):i.length||(d+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),i.length&&(i.slice(0,2).forEach(l=>{d+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${c(l)}">🌐 ${c(l)} <small style="opacity:0.8">(${t("خارجي","Ext")})</small></span>`}),i.length>2&&(d+=`<span style="font-size:10px;color:var(--amber);" title="${i.slice(2).map(c).join("، ")}">+${i.length-2}</span>`)),d+="</div>",d}function It(e){if(!e)return!1;if(_()||S("edit_tasks"))return!0;const a=s.data?.user?.id;if(!a)return!1;if((e.assigneeId||e.assignee_id)===a||(e.creatorId||e.createdById||e.created_by_id||e.created_by)===a)return!0;const n=e.reviewerId||e.reviewer_id,o=e.approverId||e.approver_id;if(n===a||o===a)return!0;const r=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;if(Array.isArray(r)&&r.includes(a))return!0;const i=e.projectId||e.project_id;if(i&&s.data?.projects){const d=s.data?.projects?.find(l=>l.id===i);if(d){const l=d.managerId||d.manager_id,p=d.ownerId||d.owner_id||d.leadId||d.lead_id||d.createdById||d.created_by;if(l===a||p===a)return!0}}return!1}function Vn(e){const a=isOverdue(e),n=a?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${x("alert",11)} ${g("overdue")}</span>`:"",o=s._commentCounts?s._commentCounts[e.id]||0:(s.data?.comments||[]).filter(p=>p.taskId===e.id).length,r=s._docCounts?s._docCounts[e.id]||0:(s.data?.documents||[]).filter(p=>p.taskId===e.id).length,i=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",d=It(e),l=t(e.titleAr,e.titleEn);return`<article class="task-card ${a?"is-overdue":""} ${d?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${c(l)}" data-action="open-task" data-task-id="${c(e.id)}">
    <div class="task-card-top">
      <span class="task-code">${c(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        ${o>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${o} ${t("تعليقات","comments")}">💬 ${o}</span>`:""}
        ${r>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${r} ${t("مرفقات","attachments")}">📎 ${r}</span>`:""}
        ${n}
        <span class="priority-badge ${c(e.priority)}">${c(priorityText(e.priority))}</span>
      </div>
    </div>
    <h4>${c(t(e.titleAr,e.titleEn))}</h4>
    ${(()=>{const p=String(t(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!p)return"";const u=p.length>50?p.substring(0,50).trim()+"...":p;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${c(p)}">${c(u)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${c(t(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${a?"var(--red)":"var(--muted)"};">${x("calendar",11)} ${dateLabel(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${Jn(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${i};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function bt(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function Kn(e=[]){const a={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((o,r)=>{const i=o.status==="blocked"?1:0,d=r.status==="blocked"?1:0;if(i!==d)return d-i;const l=o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():null,u=l&&l<n&&o.status!=="done"?1:0,m=p&&p<n&&r.status!=="done"?1:0;if(u!==m)return m-u;const v=a[o.priority]||2,$=a[r.priority]||2;if(v!==$)return $-v;if(l&&p){if(l!==p)return l-p}else{if(l&&!p)return-1;if(!l&&p)return 1}const y=bt(o),h=bt(r);return y!==h?y-h:(o.titleAr||"").localeCompare(r.titleAr||"","ar")})}function it(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function Ha(e){try{localStorage.setItem("darc_task_sort_pref",e)}catch{}s.taskSortPref=e,s.projectTaskSort=e,s.myTaskSort=e}function Wa(e,a="sort-project-tasks"){const n=e||it();return`
    <div class="sort-box">
      <span>${t("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${a}">
        <option value="custom" ${n==="custom"?"selected":""}>${t("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${n==="importance"?"selected":""}>${t("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${t("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${t("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function Yn(e=[],a=it()){return a==="deadline"?[...e].sort((n,o)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):a==="custom"?[...e].sort((n,o)=>bt(n)-bt(o)):a==="alpha"?[...e].sort((n,o)=>(n.titleAr||"").localeCompare(o.titleAr||"","ar")):Kn(e)}function Xn(e,a=it()){const n=s.data?.users||[];s._userMap=new Map(n.map(i=>[i.id,i]));const o={};for(const i of s.data?.comments||[])i.taskId&&(o[i.taskId]=(o[i.taskId]||0)+1);const r={};for(const i of s.data?.documents||[])i.taskId&&(r[i.taskId]=(r[i.taskId]||0)+1);return s._commentCounts=o,s._docCounts=r,`<div class="board">${[{key:"not_started",dot:"",label:g("notStarted")},{key:"in_progress",dot:"blue",label:g("inProgress")},{key:"review",dot:"amber",label:t("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:g("done")}].map(i=>{const d=Yn(e.filter(l=>(i.statuses||[i.key]).includes(l.status)),a);return`<section class="board-column" data-status="${i.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${i.dot}"></span>${i.label}</div><span class="board-count">${d.length}</span></div><div class="board-cards">${d.length?d.map(Vn).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${g("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function Ga(e,a){const n=s.calendarDate?new Date(s.calendarDate):new Date,o=n.getFullYear(),r=n.getMonth(),i=`${s.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][r]:["January","February","March","April","May","June","July","August","September","October","November","December"][r]} ${o}`,d=s.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=new Date(o,r,1).getDay(),p=new Date(o,r+1,0).getDate(),u=new Date,m=u.getFullYear()===o&&u.getMonth()===r;let v="";for(let $=0;$<l;$++)v+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let $=1;$<=p;$++){const y=m&&u.getDate()===$,h=`${o}-${String(r+1).padStart(2,"0")}-${String($).padStart(2,"0")}`,f=e.filter(w=>{if(!w.dueDate&&!w.startDate)return!1;const T=w.dueDate?w.dueDate.split("T")[0]:null,I=w.startDate?w.startDate.split("T")[0]:null;return T===h||I===h});v+=`
      <div class="calendar-day ${y?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${y?"var(--mint)":"var(--surface)"};border:1px solid ${y?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${y?"bold":"600"};color:${y?"var(--teal)":"var(--ink)"};">
          <span>${$}</span>
          ${y?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${t("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${f.map(w=>{const T=za(w);return`
              <div data-action="open-task" data-task-id="${c(w.id)}" style="background:${T.bgColor};border:1px solid ${T.borderColor};border-inline-start:3px solid ${T.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${T.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${c(t(w.titleAr,w.titleEn))} — ${T.label}">
                <span style="font-weight:700;">${c(t(w.titleAr,w.titleEn))}</span>
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
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${x(s.lang==="ar"?"arrow":"arrowLeft",12)} ${t("السابق","Prev")}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${t("اليوم","Today")}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${t("التالي","Next")} ${x(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${d.map($=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${$}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${v}
      </div>
    </div>
  `}function ea(e){const a=e.filter(p=>p.startDate&&p.dueDate).sort((p,u)=>new Date(p.startDate)-new Date(u.startDate));if(!a.length)return`<div class="empty" style="min-height:300px">${x("calendar",24)}<span>${t("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...a.map(p=>new Date(p.startDate).getTime())),o=Math.max(...a.map(p=>new Date(p.dueDate).getTime()));const r=2592e5;n-=r,o+=r;const i=Math.max(7,Math.ceil((o-n)/864e5));let d="";for(let p=0;p<i;p++){const u=new Date(n+p*864e5),m=u.getDay()===5||u.getDay()===6,v=Me()==="hijri"?s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",$=new Intl.DateTimeFormat(v,{month:"short"}).format(u);d+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${m?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${u.getDate()}<br>${$}</div>`}const l=a.map((p,u)=>{const m=Math.floor((new Date(p.startDate).getTime()-n)/864e5)+1,v=m+Math.max(1,Math.ceil((new Date(p.dueDate).getTime()-new Date(p.startDate).getTime())/864e5)+1),$=za(p);return`<div style="display:contents" class="timeline-row" data-task-id="${p.id}" data-row="${u}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${p.id}" style="grid-column: ${m} / ${v}; margin: 8px 4px; background: ${$.color}; border: 1px solid ${$.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${c(t(p.titleAr,p.titleEn))} — ${$.label}">
        <span style="font-weight:600;opacity:0.9">${c(p.templateId?p.templateId.replace("tpl-","#"):"#")}</span> ${c(t(p.titleAr,p.titleEn))}
        ${p.dependencies&&p.dependencies.length?`<span style="float:${s.lang==="ar"?"left":"right"};opacity:0.8">${x("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${i}, minmax(40px, 1fr)); min-width: ${i*40}px; position: relative;">
      ${d}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function Zn(e,a){const n=s.timelineView||"gantt";return`
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
      
      ${n==="calendar"?Ga(e,a):ea(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:Zn,renderCalendar:Ga,renderTimeline:ea});function Qn(e){const a=s.searches.tasks.trim().toLowerCase();return e.filter(n=>{const o=`${n.titleAr} ${n.titleEn} ${n.categoryAr} ${n.categoryEn}`.toLowerCase().includes(a),r=s.taskFilter==="all"||s.taskFilter==="mine"&&n.assigneeId===s.data?.user?.id||s.taskFilter==="overdue"&&isOverdue(n)||s.taskFilter==="blocked"&&n.status==="blocked",i=s.taskProjectFilter==="all"||n.projectId===s.taskProjectFilter,d=!s.taskPriorityFilter||s.taskPriorityFilter==="all"||n.priority===s.taskPriorityFilter;return o&&r&&i&&d})}function fs(){const e=Qn(s.data?.tasks||[]),a=[["all",g("all")],["mine",t("مسندة لي","Assigned to me")],["overdue",g("overdue")],["blocked",g("blocked")]],n=s.myTaskSort||it();return`
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
          ${a.map(([o,r])=>`
            <button class="segmented-tab ${s.taskFilter===o?"active":""}" data-action="task-filter" data-filter="${o}" role="tab">
              ${r}
            </button>
          `).join("")}
        </div>
        <div class="search-box tasks-search-box">
          ${x("search",15)}
          <input data-search="tasks" value="${c(s.searches.tasks)}" placeholder="${t("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${t("📁 كل المشاريع","📁 All Projects")}</option>
            ${(s.data?.projects||[]).map(o=>`<option value="${c(o.id)}" ${s.taskProjectFilter===o.id?"selected":""}>${c(t(o.nameAr,o.nameEn))}</option>`).join("")}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${t("⚡ كل الأولويات","⚡ All Priorities")}</option>
            <option value="urgent" ${s.taskPriorityFilter==="urgent"?"selected":""}>🔥 ${t("عاجلة","Urgent")}</option>
            <option value="high" ${s.taskPriorityFilter==="high"?"selected":""}>⚡ ${t("عالية","High")}</option>
            <option value="medium" ${s.taskPriorityFilter==="medium"?"selected":""}>🔹 ${t("متوسطة","Medium")}</option>
            <option value="low" ${s.taskPriorityFilter==="low"?"selected":""}>☕ ${t("منخفضة","Low")}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${Wa(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?Xn(e,n):`<section class="panel"><div class="empty">${x("checklist",18)}<span>${g("noTasks")}</span></div></section>`}
  `}function ei(e){return Oa(e,{includeSeconds:!1}).full}function Ja(e=[],a=[]){const n=s.data?.users||[];let o="";return e.forEach(r=>{const i=n.find(d=>d.id===r)||{name:r,id:r};o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${W(i,"mini-avatar")}
        <span style="font-weight:500;">${c(t(i.name,i.nameEn||i.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${c(r)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),a.forEach(r=>{o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${c(r)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${t("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${c(r)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),o}function Va(e=[]){return e.length?e.map((a,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${c(ei(a.remindAt))}</strong>
        ${a.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(a.noteAr)}">(${c(a.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${c(a.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${t("حذف التذكير","Delete reminder")}">
        ${x("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${t("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function Wt(e=null,a=null,n=null){const o=s.data?.templates?.find(f=>f.id===(a||e?.templateId)),r=e?.projectId||n||s.activeProjectId||s.data?.projects?.[0]?.id||"",i=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],d=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:e.remindAt,noteAr:""}]:Array.isArray(s.data?.reminders)&&e?.id&&(l=(s.data?.reminders||[]).filter(f=>f.taskId===e.id));const p=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,u=i.length>0||d.length>0,m=u?Ja(i,d):"",v=Va(l),$=`<form id="task-form" data-task-id="${c(e?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${c(e?.typeAr||o?.typeAr||(o?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${c(e?.typeEn||o?.typeEn||(o?"Drawing":""))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${c(JSON.stringify(i))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${c(JSON.stringify(d))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${c(JSON.stringify(l))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${t("البيانات الأساسية والمكتبة القياسية","Basic Details & Standard Library")}</span>
      </div>

      <div class="field full">
        <label>${t("المشروع التابع له","Project")} *</label>
        <select name="projectId" id="task-project-select" required>
          ${(s.data?.projects||[]).map(f=>`<option value="${c(f.id)}" ${f.id===r?"selected":""}>${c(t(f.nameAr,f.nameEn))} (${c(f.code)})</option>`).join("")}
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
          ${(s.data?.templates||[]).map(f=>`<option value="${c(f.id)}" ${(e?.templateId||a)===f.id?"selected":""}>${c(f.code)} — ${c(t(f.nameAr,f.nameEn))}</option>`).join("")}
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
          ${(s.data?.users||[]).map(f=>`<option value="${c(f.id)}" ${(e?e.assigneeId===f.id:s.data?.user?.id===f.id)?"selected":""}>${c(t(f.name,f.nameEn||f.name))}</option>`).join("")}
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
          ${m}
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
        <select name="status" id="task-status-select">${ai().map(([f,w])=>`<option value="${f}" ${e?.status===f?"selected":""}>${w}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${g("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(f=>`<option value="${f}" ${(e?.priority||"medium")===f?"selected":""}>${priorityText(f)}</option>`).join("")}</select>
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
        ${e&&(S("delete_tasks")||_())?`
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
  </form>`;let y=$,h="";e&&(h="modal-lg",y=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${t("تفاصيل المهمة","Task Details")}</h3>
          ${$}
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
            <div id="task-documents-list">${Be(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${t("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${ht(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${t("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${t("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById("modal-root").innerHTML=ye(e?t("تعديل المهمة","Edit task"):g("addTask"),t("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),y,"task",h),ti(e)}function ti(e){const a=document.getElementById("modal-root");if(!a)return;const n=a.querySelector("#task-status-select"),o=a.querySelector("#task-auto-progress-badge");n&&o&&n.addEventListener("change",()=>{const A={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;o.textContent=`(${A}%)`});const r=a.querySelector("#task-template-select");r&&r.addEventListener("change",()=>{const A=r.value,j=(s.data?.templates||[]).find(P=>P.id===A);if(j){const P=a.querySelector("#task-title-ar"),L=a.querySelector("#task-title-en"),R=a.querySelector("#task-type-ar"),F=a.querySelector("#task-type-en");P&&!P.value&&(P.value=j.nameAr||""),L&&!L.value&&(L.value=j.nameEn||""),R&&(R.value=j.typeAr||"مخطط"),F&&(F.value=j.typeEn||"Drawing")}});const i=a.querySelector("#task-additional-assignees-input"),d=a.querySelector("#task-external-assignees-input"),l=a.querySelector("#assignees-chips-container"),p=a.querySelector("#assignee-combobox-search"),u=a.querySelector("#assignee-combobox-dropdown"),m=a.querySelector("#btn-add-external-quick");let v=[];try{v=JSON.parse(i?.value||"[]")}catch{v=[]}let $=[];try{$=JSON.parse(d?.value||"[]")}catch{$=[]}function y(){i&&(i.value=JSON.stringify(v)),d&&(d.value=JSON.stringify($))}function h(){if(l){if(v.length===0&&$.length===0){l.style.display="none",l.innerHTML="",y();return}l.style.display="flex",l.innerHTML=Ja(v,$),y()}}function f(A=""){if(!u)return;const j=A.trim().toLowerCase(),P=s.data?.users||[],L=a.querySelector("#task-primary-assignee")?.value,R=P.filter(O=>{if(O.id===L)return!1;if(!j)return!0;const Y=(O.name||"").toLowerCase(),Q=(O.nameEn||"").toLowerCase(),U=(O.email||"").toLowerCase();return Y.includes(j)||Q.includes(j)||U.includes(j)});let F="";j&&(F+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${t("إضافة مسؤول خارجي:","Add external assignee:")} "${c(A.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${t("إضافة سريعة","Quick Add")}</span>
        </div>
      `),R.length===0&&!j?F+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${t("لا يوجد مستخدمين آخرين","No other users")}</div>`:R.forEach(O=>{const Y=v.includes(O.id);F+=`
          <div class="combobox-user-row" data-uid="${c(O.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${c(O.id)}" ${Y?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${W(O,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${c(t(O.name,O.nameEn||O.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${c(t(O.jobTitleAr,O.jobTitleEn)||O.email||"")}</span>
              </div>
            </div>
            ${Y?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),u.innerHTML=F,u.style.display="block"}y(),p&&(p.addEventListener("focus",()=>{f(p.value)}),p.addEventListener("input",()=>{const A=p.value.trim();f(A),m&&(m.style.display=A.length>1?"inline-flex":"none")}),p.addEventListener("keydown",A=>{if(A.key==="Enter"){A.preventDefault();const j=p.value.trim();j&&($.includes(j)||($.push(j),h()),p.value="",m&&(m.style.display="none"),u&&(u.style.display="none"))}})),m&&m.addEventListener("click",()=>{const A=p?.value.trim();A&&($.includes(A)||($.push(A),h()),p.value="",m.style.display="none",u&&(u.style.display="none"))}),u&&u.addEventListener("click",A=>{if(A.target.closest(".dropdown-ext-action")){const P=p?.value.trim();P&&!$.includes(P)&&($.push(P),h()),p&&(p.value=""),m&&(m.style.display="none"),u.style.display="none";return}const j=A.target.closest(".combobox-user-row");if(j){const P=j.dataset.uid;v.includes(P)?v=v.filter(L=>L!==P):v.push(P),h(),f(p?.value||"")}}),l&&l.addEventListener("click",A=>{const j=A.target.closest(".btn-remove-chip-user");if(j){const L=j.dataset.uid;v=v.filter(R=>R!==L),h(),u&&u.style.display==="block"&&f(p?.value||"");return}const P=A.target.closest(".btn-remove-chip-ext");if(P){const L=P.dataset.ext;$=$.filter(R=>R!==L),h()}});const w=a.querySelector("#task-reminders-input"),T=a.querySelector("#task-reminders-list"),I=a.querySelector("#new-reminder-datetime"),E=a.querySelector("#new-reminder-note"),z=a.querySelector("#btn-add-reminder");let M=[];try{M=JSON.parse(w?.value||"[]")}catch{M=[]}Array.isArray(M)||(M=[]);function b(){T&&(w&&(w.value=JSON.stringify(M)),T.innerHTML=Va(M))}z&&z.addEventListener("click",()=>{const A=I?.value;if(!A){k(t("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const j=E?.value.trim()||"",P={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date(A).toISOString(),noteAr:j};M.push(P),I&&(I.value=""),E&&(E.value=""),b(),k(t("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),T&&T.addEventListener("click",async A=>{const j=A.target.closest(".btn-delete-reminder");if(j){const P=Number(j.dataset.idx),L=j.dataset.remId;!isNaN(P)&&P>=0&&P<M.length&&(M.splice(P,1),b(),L&&!L.startsWith("rem_temp_")&&D(`/api/reminders/${L}`,{method:"DELETE"}).catch(()=>{}),k(t("تم حذف موعد التذكير.","Reminder deleted.")))}}),a.addEventListener("mousedown",A=>{u?.contains(A.target)||p?.contains(A.target)||m?.contains(A.target)||(u&&(u.style.display="none"),m&&(m.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&D(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(A=>{if(A&&Array.isArray(A.comments)){s.data&&!s.data.comments&&(s.data.comments=[]);const j=new Map((s.data?.comments||[]).map(L=>[L.id,L]));for(const L of A.comments)j.set(L.id,L);s.data&&(s.data.comments=Array.from(j.values()));const P=document.getElementById("task-comments-list");P&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(P.innerHTML=ht(e))}}).catch(()=>{})}function ht(e){const a=(s.data?.comments||[]).filter(n=>n.taskId===e.id).sort((n,o)=>new Date(n.createdAt)-new Date(o.createdAt));return a.length?`<div style="display:flex;flex-direction:column;gap:12px;">${a.map(n=>{const o=n.user||(s.data?.users||[]).find(l=>l.id===n.userId)||s.data?.user||{name:"DARC Member",id:""},r=!!(o.id&&s.data?.user?.id&&o.id===s.data?.user?.id),i=r||typeof _=="function"&&_(),d=c(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${c(n.id)}" style="display:flex;gap:10px;flex-direction:${r?"row-reverse":"row"};">
        ${W(o)}
        <div style="display:flex;flex-direction:column;align-items:${r?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${c(t(o.name,o.nameEn||o.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(n.createdAt,!0)}</span>
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
          <div id="comment-bubble-${c(n.id)}" style="background:${r?"var(--blue)":"var(--surface)"};color:${r?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${r?"none":"1px solid var(--border)"};border-top-${r?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${d}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${x("message",18)}<span style="font-size:12px;">${t("لا توجد تعليقات","No comments yet")}</span></div>`}function Be(e){const a=(s.data?.documents||[]).filter(n=>n.taskId===e.id).sort((n,o)=>new Date(o.createdAt)-new Date(n.createdAt));return a.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${a.map(n=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${n.id}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${x("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${c(n.originalName)}">${c(n.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${dateLabel(n.createdAt,!0)} · ${c(n.user?t(n.user.name,n.user.nameEn||n.user.name):"Team Member")} · ${n.size>1048576?(n.size/1048576).toFixed(1)+"MB":Math.round(n.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("نسخ رابط المشاركة","Copy share link")}">${x("link",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${x("eye",14)}</button>
        ${S("review_tasks")||S("approve_tasks")||S("upload_documents")||_()?`
          <select class="doc-status-select" data-doc-id="${n.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${n.status==="draft"?"selected":""}>${t("مسودة","Draft")}</option>
            ${S("review_tasks")||_()?`<option value="review" ${n.status==="review"?"selected":""}>${t("مراجعة","Review")}</option>`:""}
            ${S("approve_tasks")||_()?`<option value="approved" ${n.status==="approved"?"selected":""}>${t("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${n.status==="superseded"?"selected":""}>${t("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${S("upload_documents")||_()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;" title="${t("إعادة تسمية","Rename")}">${x("edit",14)}</button>`:""}
        ${S("delete_documents")||_()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${t("حذف","Delete")}">${x("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${x("document",18)}<span style="font-size:12px;">${t("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}async function ma(e){if(!e)return;let a=(s.data?.documents||[]).find(f=>f.id===e);if(!a)try{const f=await D(`/api/documents/${e}`);f&&f.id&&(a=f,s.data&&!s.data.documents&&(s.data.documents=[]),s.data?.documents&&s.data.documents.push(a))}catch(f){console.warn("[Documents] Failed to fetch doc preview on demand:",f)}if(!a){k(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found or moved to trash."),!0);return}let n=a.diskFilename||`/api/documents/${a.id}`;(n.startsWith("file://")||n.startsWith("/")||!n.startsWith("http"))&&(n=`/api/documents/${a.id}`);let o="";if(n.includes("drive.google.com")){const f=n.match(/\/d\/([a-zA-Z0-9_-]+)/);f&&f[1]&&(o=f[1])}const r=o?`https://drive.google.com/file/d/${encodeURIComponent(o)}/preview`:n,i=/^(https?:\/\/|\/)/i.test(r)?r:"about:blank",d=o?`https://drive.google.com/file/d/${encodeURIComponent(o)}/view?usp=drivesdk`:n.startsWith("http")?n:`${window.location.origin}${n}`,l=/^(https?:\/\/|\/)/i.test(d)?d:"#",p=`/api/documents/${encodeURIComponent(a.id)}`,u=/\.(jpe?g|png|gif|webp|svg|heic)$/i.test(a.originalName)||a.mimeType&&a.mimeType.startsWith("image/"),m=/\.(mp4|webm|mov|m4v|ogv|ogg)$/i.test(a.originalName)||a.mimeType&&a.mimeType.startsWith("video/"),v=/\.(mp3|wav|m4a|aac|ogg)$/i.test(a.originalName)||a.mimeType&&a.mimeType.startsWith("audio/"),$=a.size>1048576?(a.size/1048576).toFixed(1)+" MB":Math.round((a.size||0)/1024)+" KB",y=a.id&&String(a.id).includes("demo")||o&&o.startsWith("demo_sample_")||!!s.data?.isDemo;let h=document.getElementById("preview-modal-overlay");h||(h=document.createElement("div"),h.id="preview-modal-overlay",h.style.position="fixed",h.style.inset="0",h.style.zIndex="1300",h.style.background="rgba(0, 0, 0, 0.75)",h.style.backdropFilter="blur(4px)",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.padding="20px",document.body.appendChild(h)),h.innerHTML=`
    <div style="background:var(--surface);width:95%;max-width:1100px;height:88vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--line);background:var(--surface);">
        <div style="display:flex;align-items:center;gap:10px;overflow:hidden;">
          <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${x("document",16)}</span>
          <div style="overflow:hidden;">
            <h2 style="margin:0;font-size:15px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(a.originalName)}">${c(a.originalName)}</h2>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" data-action="copy-doc-link" data-doc-id="${c(a.id)}" style="display:flex;align-items:center;gap:6px;" title="${t("نسخ رابط المشاركة","Copy share link")}">
            ${x("link",13)} <span class="hide-mobile">${t("نسخ الرابط","Copy Link")}</span>
          </button>
          ${y?"":`
          <a href="${c(l)}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${t("فتح في Google Drive","Open in Google Drive")}">
            ${x("globe",13)} <span class="hide-mobile">${t("فتح في Drive","Open in Drive")}</span>
          </a>
          <a href="${c(p)}" target="_blank" rel="noopener noreferrer" download class="btn btn-primary btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${t("تحميل المخطط","Download")}">
            ${x("download",13)} <span class="hide-mobile">${t("تحميل","Download")}</span>
          </a>
          `}
          <button type="button" class="btn btn-ghost btn-sm" id="close-preview-modal-btn" data-action="close-modal" style="padding:6px;min-width:0;margin-inline-start:4px;" title="${t("إغلاق","Close")}">${x("close",18)}</button>
        </div>
      </div>
      <div style="flex:1;position:relative;background:#1a1a1a;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        ${y?`
          <div style="width:100%;height:100%;background:#0f172a;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#e2e8f0;padding:24px;text-align:center;">
            <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(20,184,166,0.15) 1px, transparent 1px);background-size:24px 24px;opacity:0.6;pointer-events:none;"></div>
            <div style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(20,184,166,0.3);border-radius:12px;padding:32px 40px;max-width:540px;box-shadow:0 20px 40px rgba(0,0,0,0.5);z-index:2;">
              <div style="font-size:48px;margin-bottom:16px;">📐</div>
              <h3 style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px 0;">${c(a.originalName)}</h3>
              <p style="font-size:13px;color:#94a3b8;margin:0 0 20px 0;line-height:1.6;">
                ${t("مخطط معماري هندسي تفصيلي (بيئة عرض تجريبية). عند العمل على مشروع حقيقي يمكنك رفع ملفات PDF ومخططات DWG بدقة كاملة.","Detailed architectural CAD drawing (Demo showcase). In production projects, uploaded PDF and DWG drawings render directly here.")}
              </p>
              <div style="display:flex;justify-content:center;gap:12px;font-size:12px;color:#38bdf8;">
                <span style="background:rgba(56,189,248,0.1);padding:4px 10px;border-radius:6px;border:1px solid rgba(56,189,248,0.2);">${t("الحجم المقدر","Size")}: ${$}</span>
                <span style="background:rgba(20,184,166,0.1);padding:4px 10px;border-radius:6px;border:1px solid rgba(20,184,166,0.2);color:#2dd4bf;">${t("مخطط معتمد","Approved Drawing")}</span>
              </div>
            </div>
          </div>
        `:m?`
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:15px;background:#000;">
            <video controls autoplay playsinline style="max-width:100%;max-height:100%;border-radius:6px;outline:none;box-shadow:0 8px 30px rgba(0,0,0,0.5);">
              ${o?`<source src="https://drive.google.com/uc?export=download&id=${c(o)}" type="${c(a.mimeType||"video/mp4")}">`:""}
              <source src="${c(p)}" type="${c(a.mimeType||"video/mp4")}">
              <source src="${c(i)}">
              <p style="color:#fff;text-align:center;">${t("متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.","Your browser does not support the video tag.")}</p>
            </video>
          </div>
        `:v?`
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:24px;background:#0f172a;">
            <audio controls style="width:80%;max-width:500px;">
              ${o?`<source src="https://drive.google.com/uc?export=download&id=${c(o)}" type="${c(a.mimeType||"audio/mpeg")}">`:""}
              <source src="${c(p)}" type="${c(a.mimeType||"audio/mpeg")}">
              <source src="${c(i)}">
            </audio>
          </div>
        `:!o&&u?`
          <div style="width:100%;height:100%;overflow:auto;display:flex;align-items:center;justify-content:center;padding:15px;">
            <img src="${c(i)}" alt="${c(a.originalName)}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='${c(p)}';" />
          </div>
        `:`
          <iframe 
            src="${c(i)}" 
            style="width:100%;height:100%;border:none;background:#fff;" 
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture" 
            allowfullscreen 
            loading="lazy">
          </iframe>
        `}
      </div>
    </div>
  `,h.style.display="flex",document.getElementById("close-preview-modal-btn")?.addEventListener("click",()=>{h.style.display="none",h.innerHTML=""}),h.onclick=f=>{f.target===h&&(h.style.display="none",h.innerHTML="")}}function ai(){return[["not_started",g("notStarted")],["in_progress",g("inProgress")],["review",g("review")],["approval",g("approval")],["done",g("done")],["blocked",g("blocked")],["canceled",g("canceled")]]}function fa(){const e=document.querySelector(".timeline-container > div"),a=document.querySelector(".timeline-svg");if(!e||!a)return;a.innerHTML="";const n=Array.from(document.querySelectorAll(".timeline-bar")),o={},r=e.getBoundingClientRect();n.forEach(l=>{const p=l.getBoundingClientRect();o[l.dataset.taskId]={left:p.left-r.left,right:p.right-r.left,top:p.top-r.top,bottom:p.bottom-r.top,width:p.width,height:p.height,center:p.top-r.top+p.height/2}});let i="";const d=s.lang==="ar";n.forEach(l=>{const p=l.dataset.taskId,u=(s.data?.tasks||[]).find($=>$.id===p),m=u?.dependencies||u?.customFields?.dependencies||[];if(!u||!m.length)return;const v=o[p];v&&m.forEach($=>{const y=o[$];if(!y)return;const h=d?y.left:y.right,f=y.center,w=d?v.right:v.left,T=v.center,I=h+(d?-20:20);i+=`<path d="M ${h} ${f} C ${I} ${f}, ${I} ${T}, ${w} ${T}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),a.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${i}
  `}var ct=null,ga=!1;async function zt(e=!1){if(ct&&!e)return ct;ga=!0;try{const a=await D("/api/telemetry/analytics",{silent:!0});a&&a.data&&(ct=a.data)}catch(a){console.warn("[Analytics] Failed to fetch remote analytics:",a)}finally{ga=!1}return ct}function ni(){const e=ct,a=Bn();!e&&!ga&&zt().then(()=>{if(s.view==="settings"&&s.settingsSection==="analytics"){const l=document.querySelector(".settings-content");l&&(l.innerHTML=ni())}});const n=e?.stats||{totalVisits:1482,uniqueVisitors:622,activeSessions:14,avgTimeSpentFormattedAr:"8 دقائق و 44 ثانية",avgTimeSpentFormattedEn:"8m 44s",healthScore:"98.7%",activeAnomaliesCount:0,totalAnomaliesLogged:2},o=e?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:642,percent:43.3},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:395,percent:26.6},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:184,percent:12.4},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:96,percent:6.5},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:68,percent:4.6},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:38,percent:2.6},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:27,percent:1.8},{code:"US",nameAr:"الولايات المتحدة",nameEn:"United States",flag:"🇺🇸",visits:19,percent:1.3}],r=e?.cities||[{name:"Dubai",visits:410},{name:"Riyadh",visits:275},{name:"Abu Dhabi",visits:232},{name:"Cairo",visits:184},{name:"Jeddah",visits:120},{name:"Doha",visits:96}],i=e?.recentAnomalies||[],d=a.memoryMb||45;return`
    <section class="setting-section">
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <h2>${t("مراقبة الأداء، الزيارات الجغرافية ورصد استهلاك الموارد","Observability, Geo Traffic & Anomaly Monitoring")}</h2>
          <p>${t("إحصائيات دقيقة وفورية عن حركة الزوار، البلدان، متوسط الوقت المقضي، وتحسس آلي لأي استهلاك غير معتاد للموارد.","Live analytics on visitor traffic, geolocation, dwell time, and automated resource anomaly detection.")}</p>
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
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("إجمالي الزيارات","Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${x("user",14)}</span>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--ink);">${n.totalVisits.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;">↑ 12.4% ${t("نشاط مستمر عبر السحابة","active multi-cloud traffic")}</div>
        </div>

        <!-- بطاقة وقت الجلسة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("متوسط الوقت المقضي (Dwell Time)","Avg Time Spent")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${x("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${t(n.avgTimeSpentFormattedAr,n.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${t("جلسات عمل نشطة في المنصة","active dwell work sessions")}</div>
        </div>

        <!-- بطاقة الدول والمدن -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("تغطية البلدان المسجلة","Registered Countries")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${x("flag",14)}</span>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--ink);">${o.length} ${t("بلدان","countries")}</div>
          <div style="font-size:11px;color:var(--muted);">${t("أعلى نسبة: الإمارات والسعودية","Top: UAE & Saudi Arabia")}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("مؤشر استقرار الأجهزة","Resource Health Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${x("shield",14)}</span>
          </div>
          <div style="font-size:24px;font-weight:800;color:#2e7d32;">${n.healthScore}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t(`استهلاك جهازك الحالي: ${d}MB`,`Current Device Memory: ${d}MB`)}</div>
        </div>
      </div>

      <!-- 2. توزيع الزيارات الجغرافية والبلدان (Geo Traffic Breakdown) -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:24px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--line);padding-bottom:10px;">
          <h3 style="margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;">
            <span>🌍</span> ${t("توزيع الزيارات حسب البلدان والمدن (Cloudflare Edge Geolocation)","Traffic Breakdown by Countries & Cities")}
          </h3>
          <span style="font-size:11px;color:var(--muted);">${t("يتم التعرف على الدول والمدن تلقائياً عند الدخول","Identified automatically via Cloudflare Edge headers")}</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
          <!-- قائمة الدول -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${o.map(l=>`
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:16px;">${l.flag}</span>
                    <span>${t(l.nameAr,l.nameEn)}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${l.visits.toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${l.percent}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${l.percent}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${t("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${r.map(l=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    📍 ${l.name} <span style="font-size:10px;color:var(--teal);font-weight:700;">${l.visits}</span>
                  </span>
                `).join("")}
              </div>
            </div>

            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${t("توزيع الأجهزة المستخدمة:","Device Breakdown:")}</div>
              <div style="display:flex;gap:12px;font-size:12px;">
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">🖥️</div>
                  <div style="font-weight:700;margin-top:2px;">58%</div>
                  <div style="font-size:10px;color:var(--muted);">${t("سطح المكتب","Desktop")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">📱</div>
                  <div style="font-weight:700;margin-top:2px;">37%</div>
                  <div style="font-size:10px;color:var(--muted);">${t("الهواتف الذكية","Mobile")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">💻</div>
                  <div style="font-weight:700;margin-top:2px;">5%</div>
                  <div style="font-size:10px;color:var(--muted);">${t("الأجهزة اللوحية","Tablet")}</div>
                </div>
              </div>
            </div>

            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${t("توزيع وقت البقاء والجلسات:","Dwell Time Distribution:")}</div>
              <div style="font-size:11px;color:var(--ink);display:flex;flex-direction:column;gap:6px;">
                <div style="display:flex;justify-content:space-between;"><span>${t("أقل من دقيقة (زيارة سريعة)","Under 1 min")}</span><strong>12%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${t("من 1 إلى 5 دقائق (مراجعة مهام)","1 to 5 mins")}</span><strong>28%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${t("من 5 إلى 15 دقيقة (عمل هندسي مركز)","5 to 15 mins")}</span><strong style="color:var(--teal);">42% (الأعلى)</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${t("أكثر من 15 دقيقة (جلسات مطولة ومخططات)","Over 15 mins")}</span><strong>18%</strong></div>
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
            <span class="status-badge ${i.some(l=>l.status==="active")?"urgent":"done"}">
              ${i.some(l=>l.status==="active")?t("⚠️ تم رصد حالات تستدعي المتابعة","⚠️ Active Anomalies"):t("✓ جميع الأجهزة تعمل باستهلاك طبيعي","✓ Optimal Performance")}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${i.length?i.map(l=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${l.status==="active"?"rgba(239,68,68,0.06)":"var(--surface-soft)"};border:1px solid ${l.status==="active"?"rgba(239,68,68,0.25)":"var(--line)"};">
              <span style="font-size:18px;margin-top:2px;">${l.status==="active"?"🚨":"✅"}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${l.status==="active"?"var(--red)":"var(--ink)"};">${t(l.titleAr,l.titleEn)}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${l.ip}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(l.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${t(l.detailAr,l.detailEn)}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);">
                  <span>📍 ${l.city}, ${l.countryCode}</span>
                  <span>💻 ${l.deviceType}</span>
                  <span style="font-weight:600;color:${l.status==="active"?"var(--red)":"var(--mint-strong)"};">${l.status==="active"?t("قيد التدخل الوقائي","Mitigating"):t("تمت المعالجة وحماية الاستقرار","Resolved & Protected")}</span>
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
  `}var pt=null,va=!1,Ae="all",Oe="all",Ve="all";async function Lt(e=!1){if(pt&&!e)return pt;va=!0;try{const a=await D("/api/telemetry/incidents",{silent:!0});a&&a.users&&(pt=a)}catch(a){console.warn("[Diagnostics] Failed to fetch incidents:",a)}finally{va=!1}return pt}function Sn(e){Ae=e}function gs(e){Oe=e}function vs(e){Ve=e}function ii(){const e=pt;Bn(),!e&&!va&&Lt().then(()=>{if(s.view==="settings"&&(s.settingsSection==="diagnostics"||s.settingsSection==="analytics")){const i=document.querySelector(".settings-content");i&&(i.innerHTML=ii())}});const a=e?.users||[];let n=e?.incidents||[];const o=e?.stats||{totalIncidents:3,activeIncidents:1,resolvedIncidents:2,totalUsersMonitored:6,alertEmailRecipient:"admin@darc-design.bond"};Ae!=="all"&&(n=n.filter(i=>i.userId===Ae)),Oe!=="all"&&(n=n.filter(i=>i.severity===Oe)),Ve!=="all"&&(n=n.filter(i=>i.status===Ve));const r=a.find(i=>i.userId===Ae);return`
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
          ${Ae!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${t("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${Ae==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${Ae==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${Ae==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${t("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${n.length} ${t("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${a.map(i=>{const d=Ae===i.userId,l=i.activeIncidents>0;return`
              <div 
                class="user-diag-card ${d?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${c(i.userId)}"
                style="background:${d?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${d?"var(--teal)":l?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
                title="${t("انقر لعرض الأخطاء الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${c(i.avatarColor||"#0d6269")};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${c(i.name.slice(0,2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c(t(i.name,i.nameEn||i.name))}</div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c(i.email)}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${l?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${l?t(`${i.activeIncidents} خطأ نشط ⚠️`,`${i.activeIncidents} Active ⚠️`):t("مستقر ✓","Healthy ✓")}
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
            <option value="all" ${Oe==="all"?"selected":""}>${t("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${Oe==="critical"?"selected":""}>🚨 ${t("حرجة (Critical)","Critical")}</option>
            <option value="high" ${Oe==="high"?"selected":""}>⚠️ ${t("مرتفعة (High)","High")}</option>
            <option value="medium" ${Oe==="medium"?"selected":""}>ℹ️ ${t("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${Ve==="all"?"selected":""}>${t("جميع الحالات","All Statuses")}</option>
            <option value="active" ${Ve==="active"?"selected":""}>🔴 ${t("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${Ve==="resolved"?"selected":""}>✅ ${t("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${t(`عرض ${n.length} مشكلة مسجلة`,`Showing ${n.length} incidents`)}
          ${r?` (${t("للمستخدم:","for user:")} <strong>${r.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards (مع كل التفاصيل التي تساعد في الحل الدقيق) -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${n.length?n.map(i=>{const d=i.severity==="critical",l=i.status==="resolved",p=JSON.stringify({incidentId:i.id,timestamp:i.timestamp,user:{id:i.userId,name:i.userName,email:i.userEmail,role:i.userRole},client:{device:i.deviceType,browser:i.browser,os:i.os,resolution:i.screenResolution,memoryMb:i.memoryMb,ip:i.ip,location:`${i.city}, ${i.country}`},error:{type:i.errorType,message:i.errorMessage,stack:i.stackTrace},breadcrumbs:i.breadcrumbs,suggestedFix:i.suggestedSolution},null,2);return`
            <article class="incident-card" style="background:var(--surface);border:1px solid ${l?"var(--line)":d?"rgba(239,68,68,0.4)":"rgba(245,158,11,0.35)"};border-radius:12px;padding:20px;box-shadow:var(--shadow-sm);transition:all 0.2s ease;">
              
              <!-- Incident Head -->
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;border-bottom:1px solid var(--line);padding-bottom:14px;">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="font-size:24px;line-height:1;margin-top:2px;">${l?"✅":d?"🚨":"⚠️"}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${l?"var(--ink)":d?"var(--red)":"var(--amber-strong)"};">
                        ${t(i.titleAr,i.titleEn)}
                      </h4>
                      <span class="status-badge ${d?"urgent":i.severity==="high"?"in-review":"done"}" style="font-size:10px;">
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
                      <span>🕒 ${new Date(i.timestamp).toLocaleString(s.lang==="ar"?"ar-AE":"en-US")}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${l?`
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
                  ${l?t(`معالج بواسطة: ${i.resolvedBy||"Admin"}`,`Resolved by: ${i.resolvedBy||"Admin"}`):t("قيد التدخل البرمجي","Awaiting resolution")}
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
  `}var ys=ce({FULL_PERMISSIONS_CATALOG:()=>ci,canAccessSettingsSection:()=>ie,exportAuditLogsXLS:()=>ri,fetchFullAuditHistory:()=>li,openRoleModal:()=>xs,openUserModal:()=>ws,printAuditReport:()=>di,renderAuditForProject:()=>si,renderSettings:()=>hs,renderTeam:()=>bs,renderUserActivityCell:()=>oi});function bs(){if(!_()&&!S("manage_users"))return`<section class="panel"><div class="empty">${x("alert",18)}<span>${t("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const e=s.data?.user?.id;let a=(s.data?.users||[]).filter(n=>n.status!=="inactive");return e!=="usr_ahmad"?a=a.filter(n=>n.id!=="usr_ahmad"):a=[...a].sort((n,o)=>n.id==="usr_ahmad"?-1:o.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${g("team")}</h1>
        <p>${t("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${_()||S("manage_users")?`<button class="btn btn-primary" data-action="new-user">${x("plus",15)} ${g("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${a.map(n=>{const o=teamMetrics(n.id,s.data?.tasks||[]),r=n.id==="usr_ahmad";return`
          <article class="member-card ${r?"system-developer-card":""}" style="${r?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${W(n,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${c(t(n.name,n.nameEn||n.name))}</strong>
                  <span>${c(t(n.jobTitleAr||(r?"المبرمج / مدير النظام":""),n.jobTitleEn||n.jobTitleAr||""))}</span>
                </div>
              </div>
              ${r?`<span class="stealth-dev-badge">${x("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:canManageAccountPermissions()&&n.id!==s.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${c(n.id)}">${x("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${n.status==="active"?"done":"not_started"}">${c(ae(n))}</span>
            </div>
            <div class="member-card-stats">
              <span>${g("progress")} <strong>${o.progress}%</strong></span>
              <span>${o.tasks} ${g("tasks")}</span>
            </div>
            <div class="member-email">${n.email?c(n.email):g("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function si(e){const a=(s.data?.auditLogs||[]).filter(n=>n.details?.projectId===e||n.entityType==="project"&&n.entityId===e);return a.length?`<div class="audit-list">${a.map(n=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${c(n.user?t(n.user.name,n.user.nameEn||n.user.name):"DARC")} · ${c(n.action)}</strong><span>${c(n.entityType)} · ${dateLabel(n.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${x("check",18)}<span>${t("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function oi(e){const a=e.lastActiveAt||e.customFields?.lastActiveAt,n=e.lastLoginAt||e.customFields?.lastLoginAt;if(!a&&!n)return`<span class="activity-never">${t("لم يسجل دخول بعد","Never logged in")}</span>`;const o=Date.now(),r=a?new Date(a).getTime():0,i=e.id===s.data?.user?.id?0:r&&!isNaN(r)?Math.floor((o-r)/6e4):999999,d=i>=0&&i<=5;let l="";if(d)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${t("نشط الآن","Online")}</span>`;else if(i<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${t(`منذ ${i} دقيقة`,`${i}m ago`)}</span>`;else if(i<1440){const u=Math.floor(i/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${t(`منذ ${u} ساعة`,`${u}h ago`)}</span>`}else r>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(a,!1)}</span>`);const p=n?`<span class="activity-sub" title="${c(n)}">${t("دخول:","Login:")} ${dateLabel(n,!0)}</span>`:"";return`<div class="activity-wrapper">${l}${p}</div>`}function Ka(e){return Oa(e,{includeSeconds:!0})}function Gt(e){const a=e.action||"",n=e.entityType||e.entity_type||"",o=e.details||{};let r="badge-neutral",i=a,d=n;a==="login"?(r="badge-teal",i=t("تسجيل دخول","Sign In"),d=t("جلسة نظام","System Session")):a==="create"?(r="badge-mint",i=t("إنشاء جديد","Created")):a==="update"?(r="badge-blue",i=t("تعديل بيانات","Updated")):a==="delete"?(r="badge-red",i=t("نقل للمهملات","Moved to Trash")):a==="status_change"?(r="badge-amber",i=t("تغيير حالة","Status Changed")):a==="export_report"?(r="badge-teal",i=t("تصدير تقرير","Exported Report")):a==="restore"?(r="badge-mint",i=t("استعادة","Restored")):a==="purge"?(r="badge-danger",i=t("حذف نهائي","Purged")):a==="invite"&&(r="badge-blue",i=t("دعوة مستخدم","Invite Sent")),n==="task"?d=t("مهمة","Task"):n==="project"?d=t("مشروع","Project"):n==="document"?d=t("مستند","Document"):n==="user"?d=t("مستخدم","User"):n==="report"?d=t("تقرير","Report"):n==="role"&&(d=t("دور وصلاحيات","Role"));let l="—";return o.title||o.name?l=`<strong>${c(o.title||o.name)}</strong>`:a==="status_change"&&(o.oldStatus||o.newStatus)?l=`<span>${c(H(o.oldStatus))} ➔ <strong>${c(H(o.newStatus))}</strong></span>`:e.entityId&&(l=`<code style="font-size:11px;color:var(--muted);">${c(e.entityId)}</code>`),{badgeClass:r,actionLabel:i,entityLabel:d,detailHtml:l}}function ri(e=null){const a=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!a.length){k(t("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const n=s.data?.company||{},o=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let r=n.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=s.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=qe(),p=St();let u=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${r?`<img src="${c(r)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${t("سجل الرقابة والتدقيق الأمني والعمليات — "+o,"Audit & Security Trail Report — "+o)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${t("المؤسسة:","Company:")} ${c(o)} | ${t("المشرف المستخرج:","Exported by:")} ${c(d)} | ${t("تاريخ التصدير:","Export Date:")} ${c(l)} ${c(p)}
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
  `;a.forEach((f,w)=>{const T=f.user||(f.userId?(s.data?.users||[]).find(P=>P.id===f.userId):null),I=T?t(T.name,T.nameEn||T.name):t("النظام","System"),E=T?ae(T):"—",z=Ka(f.createdAt),{actionLabel:M,entityLabel:b}=Gt(f);let A="";f.details?.title||f.details?.name?A=f.details.title||f.details.name:f.action==="status_change"?A=`${H(f.details?.oldStatus)} ➔ ${H(f.details?.newStatus)}`:typeof f.details=="object"?A=JSON.stringify(f.details):A=String(f.details||f.entityId||"—");const j=w%2===0?"#ffffff":"#f8fafc";u+=`
      <tr style="background:${j};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${c(N(f.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(N(`${z.date} ${z.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${c(N(I))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(N(E))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(N(M))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(N(b))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(N(A))}</td>
      </tr>
    `}),u+="</table>";const m=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        th, td { border: 1px solid #cbd5e1; }
      </style>
    </head>
    <body dir="${s.lang==="ar"?"rtl":"ltr"}">
      ${u}
    </body>
    </html>
  `,v=new Blob(["\uFEFF"+m],{type:"application/vnd.ms-excel;charset=utf-8;"}),$=URL.createObjectURL(v),y=document.createElement("a");y.href=$;const h=new Date().toISOString().split("T")[0];y.download=`DARC_Audit_Trail_${h}.xls`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL($),k(t("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),D("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${h}`,details:{reportType:"Audit_Logs_Excel",count:a.length}})}).catch(()=>{})}function di(e=null){const a=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!a.length){k(t("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const n=s.data?.company||{},o=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let r=n.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=s.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=qe(),p=St(),u=a.length,m=a.filter(w=>w.action==="create").length,v=a.filter(w=>w.action==="update"||w.action==="status_change").length,$=a.filter(w=>w.action==="delete"||w.action==="purge"||w.action==="trash").length;let y="";a.forEach((w,T)=>{const I=w.user||(w.userId?(s.data?.users||[]).find(P=>P.id===w.userId):null),E=I?t(I.name,I.nameEn||I.name):t("النظام","System"),z=I?ae(I):"—",M=Ka(w.createdAt),{actionLabel:b,entityLabel:A}=Gt(w);let j="";w.details?.title||w.details?.name?j=w.details.title||w.details.name:w.action==="status_change"?j=`${H(w.details?.oldStatus)} ➔ ${H(w.details?.newStatus)}`:typeof w.details=="object"?j=JSON.stringify(w.details):j=String(w.details||w.entityId||"—"),y+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${c(w.id||String(T+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${c(M.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${c(M.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${c(E)}</div>
          <div style="font-size:10px;color:#64748b;">${c(z)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${c(b)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${c(A)}</td>
        <td style="font-size:11px;color:#334155;">${c(j)}</td>
      </tr>
    `});const h=window.open("","_blank","width=1100,height=850");if(!h){k(t("يرجى السماح بالنوافذ المنبثقة للطباعة.","Please allow popups to print report."),!0);return}const f=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang==="ar"?"rtl":"ltr"}">
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
          text-align: ${s.lang==="ar"?"left":"right"};
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
          text-align: ${s.lang==="ar"?"right":"left"};
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
          ${r?`<img src="${c(r)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${c(o)}</h1>
          <div class="report-subtitle">${t("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${t("المشرف المستخرج:","Generated By:")}</strong> ${c(d)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(l)} - ${c(p)}</div>
          <div><strong>${t("حالة النظام:","System Status:")}</strong> Active / Enforced</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${u}</div>
          <div class="kpi-label">${t("إجمالي العمليات","Total Events")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${m}</div>
          <div class="kpi-label">${t("عمليات إنشاء","Create Operations")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${v}</div>
          <div class="kpi-label">${t("عمليات تعديل وحالة","Updates & State Changes")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${$}</div>
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
          ${y}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${t("إعداد وتصدير التقرير","Prepared By")}</strong><br /><br />
          <span>${c(d)}</span>
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
  `;h.document.open(),h.document.write(f),h.document.close(),D("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:a.length}})}).catch(()=>{})}async function li(){try{k(t("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const e=await D("/api/audit?limit=1000");e&&e.logs&&(s.data.auditLogs=e.logs,s.auditFullHistoryLoaded=!0,renderView(),k(t(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){k(e.message||t("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function ie(e){const a=_();return e==="profile"||e==="security"||e==="notifications"?!0:e==="company"||e==="whatsapp"?a||S("manage_settings"):e==="roles"?a||S("manage_roles"):e==="accounts"?a||S("manage_users")||S("manage_existing_account_permissions")||S("view_user_activity"):e==="trash"?a||S("manage_trash"):e==="audit"?a||S("view_audit_logs"):e==="analytics"?a||S("manage_settings")||S("view_audit_logs"):e==="diagnostics"?a||S("manage_settings"):!1}function hs(){const e=s.data?.user?.id,a=_(),n=ie("company"),o=ie("whatsapp"),r=ie("roles"),i=ie("accounts"),d=ie("trash"),l=ie("audit"),p=ie("analytics"),u=ie("diagnostics"),m=[["profile",t("الملف الشخصي","Profile")],["notifications",t("الإشعارات والتنبيهات","Notifications & Alerts")],...n?[["company",g("company")]]:[],...o?[["whatsapp",t("تنبيهات واتساب","WhatsApp Alerts")]]:[],...r?[["roles",g("roles")]]:[],...i?[["accounts",g("accounts")]]:[],["security",t("الأمان","Security")],...d?[["trash",t("سلة المهملات","Trash")]]:[],...l?[["audit",g("audit")]]:[],...p?[["analytics",t("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...u?[["diagnostics",t("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[]];m.some(([h])=>h===s.settingsSection)||(s.settingsSection=m[0]?.[0]||"profile");const v=s.data?.user||{};let $="";if(s.settingsSection==="profile"&&($=`
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
              ${v.avatarUrl?`<img src="${c(v.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(v.avatarColor||"")?v.avatarColor:"#0d6269"};">${c(yt(v))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(v.avatarColor||"")?v.avatarColor:"#0d6269"};">${c(yt(v))}</div>`}
              <div class="avatar-upload-overlay">
                ${x("upload",18)}
                <span>${t("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${c(t(v.name,v.nameEn||v.name))}</h3>
            <p class="profile-user-role">${c(t(v.jobTitleAr||"",v.jobTitleEn||v.jobTitleAr||""))} · <span class="status-badge done">${c(ae(v))}</span></p>
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
                <option value="gregorian" ${Me()==="gregorian"?"selected":""}>${t("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Me()==="hijri"?"selected":""}>${t("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${t("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
      </section>
    `),s.settingsSection==="company"&&(a||S("manage_settings"))){const h=s.data?.company||{};$=`
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
              <input value="${c(s.data?.emailConfigured?g("emailConfigured"):g("emailNotConfigured"))}" disabled />
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
    `}if(s.settingsSection==="security"&&($=`
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
    `),s.settingsSection==="notifications"){const h=typeof window<"u"&&"Notification"in window?Notification.permission:"unsupported",f=h==="granted",w=h==="denied";$=`
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
              <span class="attention-icon ${f?"teal":w?"red":"blue"}" style="margin-top:2px;">
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
                  <span class="mini-badge" style="background:${f?"var(--mint)":w?"var(--red-soft)":"var(--surface-soft)"};color:${f?"var(--teal)":w?"var(--red)":"var(--muted)"};font-weight:700;">
                    ${f?t("مفعلة على هذا المتصفح ✅","Enabled on this browser ✅"):w?t("محظورة من إعدادات المتصفح ❌","Blocked in browser settings ❌"):t("بانتظار الموافقة ⚠️","Permission pending ⚠️")}
                  </span>
                </div>
              </div>
            </div>
            <div>
              ${f?`
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
    `}if(s.settingsSection==="accounts"&&i){const h=_()||S("view_user_activity"),f=_()||S("manage_users"),w=_()||S("manage_existing_account_permissions")||S("manage_users"),T=_();let I=s.data?.users||[];e!=="usr_ahmad"&&(I=I.filter(E=>E.id!=="usr_ahmad")),$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("accounts")}</h2>
            <p>${t("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${f?`<button class="btn btn-primary btn-sm" data-action="new-user">${x("plus",14)} ${g("addMember")}</button>`:""}
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
                ${w?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${I.map(E=>{const z=E.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${W(E)}
                        <div class="team-member-copy">
                          <strong>${c(t(E.name,E.nameEn||E.name))}</strong>
                          <span>${c(t(E.jobTitleAr||(z?"المبرمج / مدير النظام":""),E.jobTitleEn||E.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${z?`<span class="stealth-dev-badge">${x("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:c(ae(E))}
                    </td>
                    <td>
                      ${E.email?c(E.email):`<span style="color:var(--muted)">${g("noEmail")}</span>`}
                      ${E.phone||E.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;">📱 ${c(E.phone||E.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${E.status==="active"?"done":"not_started"}">${E.status==="active"?g("activeAccount"):g("pendingAccount")}</span>
                    </td>
                    ${h?`
                      <td>
                        ${oi(E)}
                      </td>
                    `:""}
                    ${w?`
                      <td>
                        <div class="role-actions">
                          ${z?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(E.id)}">${g("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(E.id)}">${g("edit")}</button>
                            ${E.id!==s.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${c(E.id)}" title="${E.status==="pending"?t("تفعيل الحساب يدوياً","Activate manually"):t("تغيير كلمة المرور","Change password")}">${x(E.status==="pending"?"check":"settings",13)}</button>
                              ${T?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${c(E.id)}" title="دخول كـ هذا الحساب">${x("user",13)}</button>`:""}
                            `:""}
                            ${E.id!==s.data?.user?.id&&E.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${c(E.id)}">${x("send",13)}</button>`:""}
                            ${E.id!==s.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${c(E.id)}">${x("trash",13)}</button>`:""}
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
    `}if(s.settingsSection==="roles"&&(a||S("manage_roles"))&&($=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("roles")}</h2>
            <p>${t("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${a||S("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${x("plus",14)} ${g("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(s.data?.roles||[]).map(h=>`
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
    `),s.settingsSection==="trash"&&d){if(!s.trash&&typeof sessionStorage<"u")try{const b=sessionStorage.getItem("darc_trash_cache");b&&(s.trash=JSON.parse(b))}catch{}!s.trashLoaded&&!s._trashFetching&&(s._trashFetching=!0,D("/api/trash").then(b=>{s.trash=Array.isArray(b)?b:b.trash||[...(b.projects||[]).map(A=>({...A,type:"project"})),...(b.tasks||[]).map(A=>({...A,type:"task"})),...(b.documents||[]).map(A=>({...A,type:"document"}))],s.trashLoaded=!0,s._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(b=>{s._trashFetching=!1,console.error("[Trash fetch error]",b)}));const h=s.trash||[],f=s.trashFilter||"all",w=(s.trashQuery||"").trim().toLowerCase(),T=h.filter(b=>{if(f!=="all"&&b.type!==f)return!1;if(!w)return!0;const A=(t(b.nameAr||b.titleAr,b.nameEn||b.titleEn)||b.name||b.title||b.originalName||"").toLowerCase(),j=(b.code||b.projectCode||"").toLowerCase(),P=(b.projectNameAr||b.projectNameEn||"").toLowerCase();return A.includes(w)||j.includes(w)||P.includes(w)}),I=h.filter(b=>b.type==="project").length,E=h.filter(b=>b.type==="task").length,z=h.filter(b=>b.type==="document").length,M=h.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${x("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${t("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${t("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar" style="gap:12px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm ${f==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${t("الكل","All")} <span class="badge ${f==="all"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${h.length}</span>
          </button>
          <button class="btn btn-sm ${f==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${x("building",12)} ${t("المشاريع","Projects")} <span class="badge ${f==="project"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${I}</span>
          </button>
          <button class="btn btn-sm ${f==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${x("checklist",12)} ${t("المهام","Tasks")} <span class="badge ${f==="task"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${E}</span>
          </button>
          <button class="btn btn-sm ${f==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${x("document",12)} ${t("المستندات","Documents")} <span class="badge ${f==="document"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${z}</span>
          </button>
        </div>
        <div class="search-box search-sm" style="min-width:220px;max-width:320px;flex:1;">
          ${x("search",14)}
          <input type="search" placeholder="${t("بحث في المحذوفات...","Search deleted items...")}" value="${c(s.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${T.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("الاسم / العنوان","Name / Title")}</th>
                <th>${t("النوع","Type")}</th>
                <th>${t("المشروع التابع له","Project")}</th>
                <th>${t("الحالة السابقة","Prior Status")}</th>
                <th>${t("تاريخ الحذف","Deleted At")}</th>
                <th style="text-align:${s.lang==="ar"?"left":"right"}">${t("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${T.map(b=>{const A=b.type==="project",j=b.type==="task",P=b.type==="document",L=t(b.nameAr||b.titleAr,b.nameEn||b.titleEn)||b.name||b.title||b.originalName||b.code||t("عنصر محذوف","Deleted item"),R=!A&&b.projectId?(s.data?.projects||[]).find(U=>U.id===b.projectId):null,F=b.projectNameAr||b.projectNameEn||(R?t(R.nameAr,R.nameEn||R.nameAr):null),O=b.projectCode||R?.code,Y=P&&b.size?b.size>1048576?(b.size/1048576).toFixed(1)+" MB":Math.round(b.size/1024)+" KB":"",Q=a||S("manage_trash")||b.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${A?"is-project":j?"is-task":"is-doc"}">
                          ${x(A?"building":j?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${c(L)}</strong>
                          ${b.code||A?`<span class="trash-item-code">${c(b.code||b.id)}</span>`:""}
                          ${P&&Y?`<span class="trash-item-code" style="color:var(--muted);">${Y}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${A?"type-project":j?"type-task":"type-doc"}">
                        ${x(A?"building":j?"checklist":"document",11)}
                        ${A?t("مشروع","Project"):j?t("مهمة","Task"):t("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${A?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${t("مشروع رئيسي","Primary Project")}</span>`:F?`${x("building",11)} <span>${c(F)}${O?` (${c(O)})`:""}</span>${P&&b.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${c(b.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${b.status?`<span class="status-badge ${c(b.status)}">${c(H(b.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${c(b.deletedAt||"")}">
                        ${dateLabel(b.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${s.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${c(b.type)}" data-id="${c(b.id)}" title="${t("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${x(s.lang==="ar"?"arrow":"arrowLeft",12)} ${t("استعادة","Restore")}
                        </button>
                        ${Q?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${c(b.type)}" data-id="${c(b.id)}" title="${t("حذف العنصر نهائياً","Permanently delete item")}">
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
    `:!s.trashLoaded&&!h.length?`
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
    `;$=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!s.trashLoaded&&!h.length?t("جاري التحميل...","Loading..."):`${h.length} ${t("عناصر","items")}`}
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
        ${M}
      </section>
    `}if(s.settingsSection==="audit"&&(a||S("view_audit_logs"))){const h=[...s.data?.auditLogs||[]].sort((A,j)=>new Date(j.createdAt).getTime()-new Date(A.createdAt).getTime()),f=s.auditFilterAction||"all",w=s.auditFilterEntity||"all",T=s.auditFilterUser||"all",I=(s.auditSearchQuery||"").trim().toLowerCase(),E=h.filter(A=>{if(f!=="all"&&A.action!==f||w!=="all"&&(A.entityType||A.entity_type)!==w||T!=="all"&&(A.userId||A.user_id||A.user?.id)!==T)return!1;if(I){const j=A.user||(A.userId?(s.data?.users||[]).find(U=>U.id===A.userId):null),P=(j&&t(j.name,j.nameEn||j.name)||"").toLowerCase(),{actionLabel:L,entityLabel:R}=Gt(A),F=(L||A.action||"").toLowerCase(),O=(R||A.entityType||"").toLowerCase(),Y=(A.id||A.entityId||"").toLowerCase(),Q=typeof A.details=="object"?JSON.stringify(A.details).toLowerCase():String(A.details||"").toLowerCase();if(!(P.includes(I)||F.includes(I)||O.includes(I)||Y.includes(I)||Q.includes(I)))return!1}return!0});s._lastFilteredAuditLogs=E;const z=[["all",t("كافة العمليات","All Actions")],["create",t("إنشاء جديد","Create")],["update",t("تعديل بيانات","Update")],["status_change",t("تغيير حالة","Status Change")],["delete",t("نقل للمهملات","Delete / Trash")],["restore",t("استعادة","Restore")],["purge",t("حذف نهائي","Purge")],["export_report",t("تصدير تقرير","Export Report")],["login",t("تسجيل دخول","Sign In")],["invite",t("دعوة مستخدم","Invite")]],M=[["all",t("كافة العناصر","All Entities")],["project",t("المشاريع","Projects")],["task",t("المهام","Tasks")],["document",t("المستندات","Documents")],["user",t("المستخدمين","Users")],["role",t("الأدوار والصلاحيات","Roles")],["company",t("إعدادات الشركة","Company Settings")],["report",t("التقارير","Reports")]],b=f!=="all"||w!=="all"||T!=="all"||!!I;$=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${g("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${E.length} ${t("عملية معروضة","events shown")}
              </span>
              ${b?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${t("من أصل","out of")} ${h.length}
                </span>
              `:""}
            </div>
            <p>${t("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${s.auditFullHistoryLoaded?"":`
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
            <input type="search" placeholder="${t("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${c(s.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${z.map(([A,j])=>`<option value="${A}" ${f===A?"selected":""}>${j}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${M.map(([A,j])=>`<option value="${A}" ${w===A?"selected":""}>${j}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${t("كافة المستخدمين","All Users")}</option>
              ${(s.data?.users||[]).map(A=>`<option value="${A.id}" ${T===A.id?"selected":""}>${c(t(A.name,A.nameEn||A.name))}</option>`).join("")}
            </select>
            ${b?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${t("إعادة تعيين الفلاتر","Reset filters")}">
                ${t("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${E.length?`
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${t("المستخدم / المنفذ","User / Actor")}</th>
                  <th style="padding:12px 14px;">${t("نوع النشاط والعملية","Action & Target")}</th>
                  <th style="padding:12px 14px;">${t("التفاصيل والتغيير","Details / Context")}</th>
                  <th style="padding:12px 14px;text-align:${s.lang==="ar"?"left":"right"};">${t("التاريخ والوقت الدقيق","Exact Date & Time")}</th>
                </tr>
              </thead>
              <tbody>
                ${E.map(A=>{const j=A.user||(A.userId?(s.data?.users||[]).find(U=>U.id===A.userId):null),P=j?t(j.name,j.nameEn||j.name):t("النظام","System"),L=j?ae(j):t("تلقائي","Automated"),R=Ka(A.createdAt),{badgeClass:F,actionLabel:O,entityLabel:Y,detailHtml:Q}=Gt(A);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${W(j)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${c(P)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${c(L)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${F}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${c(O)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${c(Y)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${Q}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${s.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${c(R.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${x("clock",11)}
                          <span>${c(R.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${x(b?"search":"checklist",24)}
            <span>${b?t("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):t("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${b?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${t("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(s.settingsSection==="analytics"&&p&&($=ni()),s.settingsSection==="diagnostics"&&u&&($=ii()),s.settingsSection==="whatsapp"&&o){const h=s.data?.company?.customFields?.whatsapp||s.data?.company?.custom_fields?.whatsapp||{};$=`
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
    `}const y=a||S("manage_settings")||S("manage_roles")||S("manage_users")||S("manage_trash")||S("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${y?t("تحكم مركزي","CENTRAL CONTROL"):t("الملف الشخصي","USER PROFILE")}</p>
        <h1>${y?g("settings"):t("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${y?t("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):t("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${x(a?"shield":"user",13)} ${c(ae(v))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${m.map(([h,f])=>`<button class="${s.settingsSection===h?"active":""}" data-action="settings-section" data-section="${h}">${f}</button>`).join("")}
      </aside>
      <div class="settings-content">${$}</div>
    </div>
  `}var ci=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function xs(e=null){const a=s.data?.permissionsCatalog&&s.data.permissionsCatalog.length>=10?s.data.permissionsCatalog:ci,n=new Map;a.forEach(p=>{const u=p.category||"general",m=t(p.categoryAr||u,p.categoryEn||u);n.has(u)||n.set(u,{name:m,items:[]}),n.get(u).items.push(p)});const o=e?.id==="admin"||e?.permissions&&e.permissions.includes("*"),r=Array.from(n.entries()).map(([p,u])=>{const m=u.items.map(v=>{const $=v.id||v.key,y=t(v.nameAr||v.ar,v.nameEn||v.en||$),h=o||e?.permissions&&(e.permissions.includes($)||typeof PERMISSION_ALIASES<"u"&&PERMISSION_ALIASES[$]&&e.permissions.includes(PERMISSION_ALIASES[$])),f=o?"disabled":"";return`
        <label class="permission-option" style="cursor:${o?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${c($)}" ${h?"checked":""} ${f} />
          <span style="font-weight:500;">${c(y)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${c(u.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${u.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${m}
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
  `,d=`
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
          ${r}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ye(e?t("تعديل الدور والصلاحيات","Edit role & permissions"):g("addRole"),t("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),d,"role","modal-lg");const l=document.getElementById("modal-root");if(l){const p=l.querySelector("#btn-perm-select-all"),u=l.querySelector("#btn-perm-deselect-all");p&&p.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(m=>m.checked=!0)}),u&&u.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(m=>m.checked=!1)})}}function ws(e=null){if(e?.id==="usr_ahmad"&&s.data?.user?.id!=="usr_ahmad")return k(t("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!e&&!_())return k(g("adminOnly"),!0);const a=!_(),n=a?"disabled":"",o=(s.data?.roles||[]).filter(i=>_()||i.id!=="admin"),r=`<form id="user-form" data-user-id="${c(e?.id||"")}" data-permission-only="${a}"><div class="form-grid"><div class="field full"><label>${g("nameAr")}</label><input name="name" value="${c(e?.name||"")}" ${n} required /></div><div class="field"><label>${g("nameEn")}</label><input name="nameEn" value="${c(e?.nameEn||"")}" ${n} /></div><div class="field"><label>${g("jobTitle")}</label><input name="jobTitleAr" value="${c(e?.jobTitleAr||"")}" ${n} /></div><div class="field"><label>${g("email")}</label><input name="email" type="email" value="${c(e?.email||"")}" placeholder="name@darc.com" ${n} /></div><div class="field"><label>${t("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${c(e?.phone||e?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${n} /></div><div class="field"><label>${g("role")}</label><select name="roleId">${o.map(i=>`<option value="${c(i.id)}" ${e?.roleId===i.id?"selected":""}>${c(t(i.nameAr,i.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${a?t("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):t("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button><button type="submit" class="btn btn-primary">${x("check",14)} ${e?a?t("حفظ الصلاحية","Save permission"):g("save"):g("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=ye(e?a?t("تعديل صلاحية الحساب","Change account permission"):t("تعديل حساب العضو","Edit member account"):g("addMember"),t("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),r,"user")}var $s=ce({buildProjectMemberChipsHtml:()=>ya,exportPortfolioPDF:()=>hi,exportPortfolioXLS:()=>yi,exportProjectPDF:()=>ba,exportProjectXLS:()=>bi,exportXLS:()=>Za,getCompanyBranding:()=>Dt,getDaysLeftBadge:()=>Ya,getProjectTeam:()=>As,getProjectTeamData:()=>jt,openCloneModal:()=>Es,openProjectModal:()=>Xa,projectCard:()=>fi,projectRow:()=>ks,renderInPagePrintModal:()=>Qa,renderProjectCardTeamAvatars:()=>mi,renderProjectDetail:()=>Ss,renderProjectOverviewTab:()=>gi,renderProjectTeamAvatars:()=>pi,renderProjectTimelineBar:()=>ui,renderProjects:()=>vi});function ks(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${x("building",17)}</span><div class="project-name"><strong>${c(t(e.nameAr,e.nameEn))}</strong><span>${c(e.code)} · ${c(t(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${W(e.manager)}<span>${c(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${c(e.id)}" aria-label="${g("viewDetails")}">${x(s.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function Ya(e){if(!e)return"";const a=new Date(`${e}T23:59:59`),n=Math.ceil((a-new Date)/864e5);let o="var(--mint-strong)",r="var(--mint)",i="";return n<0?(o="var(--red)",r="var(--red-soft)",i=t(`متأخر ${Math.abs(n)} يوم`,`${Math.abs(n)}d overdue`)):n===0?(o="var(--red)",r="var(--red-soft)",i=t("يستحق اليوم","Due today")):n<=2?(o="var(--red)",r="var(--red-soft)",i=t(`باقي ${n} يوم`,`${n}d left`)):n<=7?(o="var(--amber)",r="var(--amber-soft)",i=t(`باقي ${n} أيام`,`${n}d left`)):(o="var(--mint-strong)",r="var(--mint)",i=t(`باقي ${n} يوم`,`${n}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${o};background:${r};border:1px solid currentColor;">${x("clock",11)} ${i}</span>`}function jt(e){const a=s.data?.users||[],n=(s.data?.tasks||[]).filter(i=>i.projectId===e.id),o=new Set,r=new Set;return e.managerId&&o.add(e.managerId),n.forEach(i=>{i.assigneeId&&o.add(i.assigneeId),(i.customFields?.additionalAssignees||i.customFields?.additional_assignees||[]).forEach(d=>o.add(d)),(i.customFields?.externalAssignees||i.customFields?.external_assignees||[]).forEach(d=>{d&&typeof d=="string"&&d.trim()&&r.add(d.trim())})}),{internalMembers:Array.from(o).map(i=>a.find(d=>d.id===i)).filter(Boolean),externalMembers:Array.from(r)}}function As(e){return jt(e).internalMembers}function pi(e,a=4,n=!0,o=[]){if((!e||!e.length)&&(!o||!o.length))return`<span style="font-size:11px;color:var(--muted);">${t("لا يوجد فريق محدد","No team assigned")}</span>`;const r=(e||[]).slice(0,a),i=(e||[]).length-a,d=(e||[]).map(p=>t(p.name,p.nameEn||p.name)).join("، ");let l='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return r.forEach(p=>{const u=t(p.name,p.nameEn||p.name),m=n?`data-action="filter-by-member" data-member-id="${c(p.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';l+=`
      <span class="team-member-chip" ${m} title="${c(u)} (${c(ae(p))})">
        ${W(p,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${c(u)}</span>
      </span>
    `}),i>0&&(l+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${c(d)}">+${i} ${t("آخرين","more")}</span>`),o&&o.length>0&&(l+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${c(o.join("، "))}">🌐 +${o.length} ${t("خارجي","ext")}</span>`),l+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${t("فريق العمل الداخلي","Internal Team")} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(p=>`
        <div ${n?`data-action="filter-by-member" data-member-id="${c(p.id)}" title="${c(t("فلترة مهام "+(p.name||""),"Filter tasks of "+(p.nameEn||p.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${n?"cursor:pointer;transition:all 0.15s;":""}" ${n?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${W(p,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${c(t(p.name,p.nameEn||p.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${c(ae(p))}</span>
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
  </div>`,l+="</div>",l}function ui(e){if(!e.dueDate)return"";const a=new Date(e.startDate||e.createdAt||Date.now()-2592e6),n=new Date(`${e.dueDate}T23:59:59`),o=new Date,r=n.getTime()-a.getTime();let i=0;r>0&&(i=Math.min(100,Math.max(0,Math.round((o.getTime()-a.getTime())/r*100))));const d=o>n,l=d?"var(--red)":i>=80&&!d?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${x("clock",12)}
          <strong>${t("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${l};font-weight:bold;">${d?t("انتهى موعد التسليم!","Deadline passed!"):t(`مضى ${i}% من الوقت`,`${i}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${ve(e.startDate)} ➔ ${ve(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${i}%;background:${l};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function mi(e=[],a=[],n=3){const o=e.length+a.length;if(o===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const r=e.slice(0,n),i=o-r.length;[...e.map(l=>t(l.name,l.nameEn||l.name)),...a].join("، ");let d=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${t("عرض فريق العمل","View Team")}">`;return d+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',r.forEach((l,p)=>{d+=`
      <div style="margin-inline-start:${p===0?"0":"-8px"};position:relative;z-index:${10-p};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${W(l,"mini-avatar")}
      </div>
    `}),i>0&&(d+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${i}
      </div>
    `),a&&a.length>0&&i<=0&&(d+='<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>'),d+="</div>",d+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${t("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${o}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(l=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${W(l,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(t(l.name,l.nameEn||l.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${c(ae(l))}</span>
            </div>
          </div>
        `).join("")}
      </div>
      ${a&&a.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${t("الشركاء الخارجيون","External Partners")} (${a.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${a.map(l=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${c(l)}
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  `,d+="</div>",d}function fi(e){const{internalMembers:a,externalMembers:n}=jt(e),o=e.manager||(s.data?.users||[]).find(d=>d.id===e.managerId),r=Ya(e.dueDate),i=t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
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
        ${W(o,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${g("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(o?t(o.name,o.nameEn||o.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${g("team")} (${a.length+n.length})</span>
        ${mi(a,n,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${g("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${e.dueDate?ve(e.dueDate,!0):"—"}</strong>
          ${r}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health==="off_track"?"red":e.health==="at_risk"?"amber":""}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${c(e.id)}">
      ${g("viewDetails")} ${x(s.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function gi(e,a,n,o=[]){const r=e.manager||(s.data?.users||[]).find(p=>p.id===e.managerId),i=a.filter(p=>p.status==="done").length,d=a.filter(p=>p.status==="in_progress").length,l=a.filter(Ee).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${t("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${a.length}</div>
          <span class="metric-note up">${i} ${g("done")}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${t("قيد التنفيذ","In Progress")}</span>
          <div class="metric-value">${d}</div>
          <span class="metric-note">${t("عمل جارٍ","Active work")}</span>
        </div>
        <div class="metric-card ${l?"red":"teal"}" style="padding:14px 18px;">
          <span class="metric-label">${g("overdue")}</span>
          <div class="metric-value">${l}</div>
          <span class="metric-note ${l?"alert":"up"}">${l?t("تحتاج تدخلاً عاجلاً","Needs urgent action"):t("لا يوجد تأخير","On track")}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${t("فريق العمل","Team Size")}</span>
          <div class="metric-value">${n.length+(o?.length||0)}</div>
          <span class="metric-note">${t("أعضاء مساهمون","Active contributors")}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${ui(e)}

      <!-- Details Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
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
              <strong style="font-size:12px;color:var(--ink);">${ve(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${ve(e.dueDate,!0)}</strong>
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
            ${W(r)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${g("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${c(r?t(r.name,r.nameEn||r.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${c(r?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${t("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${n.map(p=>{const u=a.filter(m=>m.assigneeId===p.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${W(p,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${c(t(p.name,p.nameEn||p.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${c(ae(p))}</span>
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
              ${o.map(p=>{const u=a.filter(m=>(m.customFields?.externalAssignees||m.customFields?.external_assignees||[]).includes(p)).length;return`
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
  `}function vi(){const e=s.searches.projects.trim().toLowerCase();let a=(s.data?.projects||[]).filter(o=>`${o.nameAr} ${o.nameEn} ${o.code} ${o.clientAr}`.toLowerCase().includes(e));const n=s.projectSort||"default";return n==="alpha-asc"?a.sort((o,r)=>(t(o.nameAr,o.nameEn)||"").localeCompare(t(r.nameAr,r.nameEn)||"",s.lang==="ar"?"ar":"en")):n==="alpha-desc"?a.sort((o,r)=>(t(r.nameAr,r.nameEn)||"").localeCompare(t(o.nameAr,o.nameEn)||"",s.lang==="ar"?"ar":"en")):n==="progress-asc"?a.sort((o,r)=>(Number(o.progress)||0)-(Number(r.progress)||0)):n==="progress-desc"&&a.sort((o,r)=>(Number(r.progress)||0)-(Number(o.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${t("المحفظة","PORTFOLIO")}</p><h1>${g("projects")}</h1><p>${t("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${S("create_projects")?`<button class="btn btn-primary" data-action="new-project">${x("plus",15)} ${g("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${x("search",15)}<input data-search="projects" value="${c(s.searches.projects)}" placeholder="${g("search")}" /></div><div class="sort-box"><span>${t("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${n==="default"?"selected":""}>${t("الافتراضي","Default")}</option><option value="alpha-asc" ${n==="alpha-asc"?"selected":""}>${t("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${n==="alpha-desc"?"selected":""}>${t("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${n==="progress-asc"?"selected":""}>${t("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${n==="progress-desc"?"selected":""}>${t("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${a.length} ${t("مشاريع","projects")}</span></div></div>${a.length?`<div class="project-cards">${a.map(fi).join("")}</div>`:`<section class="panel"><div class="empty">${x("building",18)}<span>${g("noProjects")}</span></div></section>`}`}function Ss(){const e=s.data?.projects?.find(v=>v.id===s.activeProjectId);if(!e)return s.view="projects",vi();const a=(s.data?.tasks||[]).filter(v=>v.projectId===e.id),{internalMembers:n,externalMembers:o}=jt(e),r=s.projectTab||"tasks",i=s.projectMemberFilter||null,d=i?a.filter(v=>v.assigneeId===i||(v.customFields?.additionalAssignees||v.customFields?.additional_assignees||[]).includes(i)):a,l=i?s.data?.users?.find(v=>v.id===i):null;let p="";if(r==="overview")p=gi(e,a,n,o);else if(r==="tasks"){const v=s.projectTaskSort||it();p=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${g("projectTasks")} ${i?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${t("مهام","Tasks of")}: ${c(t(l?.name,l?.nameEn||l?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${t("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${Wa(v,"sort-project-tasks")}
            ${i?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${x("close",12)} ${t("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${S("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}" title="${t("اضغط N للإضافة السريعة","Press N to add quickly")}">${x("plus",14)} ${g("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${renderBoard(d,v)}
      </div>
    `}else if(r==="timeline"){const{renderTimelinePanel:v}=window.__timelineExports||{};p=v?v(d,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${ea(d)}</div>`}else if(r==="drawings"){const v=(s.data?.documents||[]).filter(f=>f.projectId===e.id&&!f.deletedAt),$=a.filter(f=>f.typeAr==="مخطط"||f.typeEn==="Drawing"||f.templateId),y=s.docTaskFilter||"all",h=y==="all"?v:v.filter(f=>f.taskId===y);p=`
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
              <select data-action="filter-project-docs-task" class="filter-select select-compact" style="max-width:200px;">
                <option value="all" ${y==="all"?"selected":""}>${t("— جميع المهام —","— All Tasks —")}</option>
                ${a.map(f=>`<option value="${c(f.id)}" ${y===f.id?"selected":""}>${c(t(f.titleAr,f.titleEn))}</option>`).join("")}
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
                ${h.length>0?h.map(f=>{const w=a.find(I=>I.id===f.taskId),T=f.size>1048576?(f.size/1048576).toFixed(1)+" MB":Math.round((f.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${c(f.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(f.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${x("document",15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(f.originalName)}">
                              ${c(f.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${c(f.mimeType||"application/octet-stream")}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${w?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(w.id)}">${c(t(w.titleAr,w.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${c(f.status||"draft")}" style="font-size:11px;">
                          ${c(H(f.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${T}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${ve(f.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(f.id)}" style="padding:5px;" title="${t("معاينة المخطط","Preview")}">
                            ${x("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(f.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ الرابط","Copy Link")}">
                            ${x("link",14)}
                          </button>
                          <a href="/api/documents/${c(f.id)}" target="_blank" rel="noopener noreferrer" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${t("تحميل","Download")}">
                            ${x("download",14)}
                          </a>
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
            ${x("checklist",14)} ${t("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${$.length})
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
                ${$.map(f=>`
                  <tr data-action="open-task" data-task-id="${c(f.id)}" style="cursor:pointer;" title="${t("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${c(t(f.titleAr,f.titleEn))}</span><span class="table-sub">${c(f.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${c(t(f.typeAr,f.typeEn)||t("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${c(f.status)}">${c(H(f.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${f.status==="done"?"var(--green)":"var(--blue)"};width:${f.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${f.progress||0}%</span>
                      </div>
                    </td>
                    <td>${f.assignee?c(t(f.assignee.name,f.assignee.nameEn||f.assignee.name)):"—"}</td>
                  </tr>
                `).join("")||`<tr><td colspan="5"><div class="empty">${g("noTasks")}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else r==="activity"&&(p=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("activity")}</h2><p class="panel-subtitle">${t("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${si(e.id)}</div>`);const u=e.manager||(s.data?.users||[]).find(v=>v.id===e.managerId),m=Ya(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${x(s.lang==="ar"?"arrow":"arrowLeft",15)}</button>
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
                ${x("calendar",12)} ${ve(e.dueDate,!0)}
                ${m}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${x("users",12)}
              <span style="font-size:11px;">${g("team")}:</span>
              ${pi(n,4,!0,o)}
            </span>
            <span class="status-badge ${c(e.health)}">${c(H(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${g("weightedProgress")}</span>
        ${S("edit_projects")||S("create_projects")||S("delete_projects")||S("view_reports")||_()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${x("more",15)} ${t("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${s.lang==="ar"?"left:0":"right:0"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;padding:5px;margin-top:5px;text-align:start">
              ${S("edit_projects")||_()?`<button class="menu-item" data-action="edit-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${x("edit",14)} ${g("edit")}</button>`:""}
              ${S("create_projects")||_()?`<button class="menu-item" data-action="clone-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${x("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>`:""}
              ${S("export_reports")||_()?`
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
              ${S("delete_projects")||_()?`<button class="menu-item" data-action="delete-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${x("trash",14)} ${t("حذف المشروع","Delete Project")}</button>`:""}
            </div>
          </div>
        `:""}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${r==="tasks"?"active":""}" data-action="project-tab" data-tab="tasks">${g("tasks")}</button>
      <button class="detail-tab ${r==="overview"?"active":""}" data-action="project-tab" data-tab="overview">${t("تفاصيل","Details")}</button>
      <button class="detail-tab ${r==="timeline"?"active":""}" data-action="project-tab" data-tab="timeline">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</button>
      <button class="detail-tab ${r==="drawings"?"active":""}" data-action="project-tab" data-tab="drawings">${g("drawings")}</button>
      <button class="detail-tab ${r==="activity"?"active":""}" data-action="project-tab" data-tab="activity">${g("activity")}</button>
    </div>
    
    ${p}
  `}function ya(e=[]){const a=s.data?.users||[];return e.map(n=>{const o=a.find(r=>r.id===n)||{name:n,id:n};return`
      <span class="chip-item" data-uid="${c(n)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${W(o,"mini-avatar")}
        <span style="font-weight:500;">${c(t(o.name,o.nameEn||o.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${c(n)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function Xa(e=null){const a=e?.code||`DARC-${String((s.data?.projects?.length||0)+1).padStart(3,"0")}`,n=e?jt(e).internalMembers.map(i=>i.id):[],o=n.length>0?n:[s.data?.user?.id].filter(Boolean),r=`
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
            ${(s.data?.users||[]).map(i=>`<option value="${c(i.id)}" ${(e?e.managerId===i.id:s.data?.user?.id===i.id)?"selected":""}>${c(t(i.name,i.nameEn||i.name))}</option>`).join("")}
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
            ${ya(o)}
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
          ${e&&(S("delete_projects")||_())?`
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
  `;document.getElementById("modal-root").innerHTML=ye(e?t("تعديل بيانات المشروع","Edit Project"):g("addProject"),t("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),r,"project"),setTimeout(()=>{const i=document.getElementById("project-member-search"),d=document.getElementById("project-member-dropdown"),l=document.getElementById("project-members-chips-container"),p=document.getElementById("project-members-input"),u=document.getElementById("project-manager-select");if(!i||!d||!l||!p)return;let m=[...o];function v(){l.innerHTML=ya(m),l.style.display=m.length?"flex":"none",p.value=JSON.stringify(m),l.querySelectorAll(".btn-remove-project-member").forEach(y=>{y.addEventListener("click",h=>{h.stopPropagation();const f=y.dataset.uid;m=m.filter(w=>w!==f),v()})})}u&&u.addEventListener("change",()=>{const y=u.value;y&&!m.includes(y)&&(m.push(y),v())});function $(y=""){const h=y.toLowerCase().trim(),f=(s.data?.users||[]).filter(w=>!m.includes(w.id)&&(!h||w.name&&w.name.toLowerCase().includes(h)||w.nameEn&&w.nameEn.toLowerCase().includes(h)||w.email&&w.email.toLowerCase().includes(h)));f.length?(d.innerHTML=f.map(w=>`
          <div class="project-member-opt" data-uid="${c(w.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${W(w,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${c(t(w.name,w.nameEn||w.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${c(w.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${t("إضافة","Add")}</span>
          </div>
        `).join(""),d.querySelectorAll(".project-member-opt").forEach(w=>{w.addEventListener("mouseenter",()=>w.style.background="var(--surface-soft)"),w.addEventListener("mouseleave",()=>w.style.background="transparent"),w.addEventListener("click",()=>{const T=w.dataset.uid;T&&!m.includes(T)&&(m.push(T),v(),i.value="",d.style.display="none")})})):d.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${t("لا يوجد أعضاء مطابقون","No matching members")}</div>`,d.style.display="block"}i.addEventListener("focus",()=>$(i.value)),i.addEventListener("input",()=>$(i.value)),document.addEventListener("click",y=>{!i.contains(y.target)&&!d.contains(y.target)&&(d.style.display="none")}),v()},50)}function Es(e){const a=`
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
        
        <div style="padding-${s.lang==="ar"?"right":"left"}:26px">
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
  `;document.getElementById("modal-root").innerHTML=ye(t("استنساخ المشروع","Clone Project"),t("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),a,"clone");const n=document.getElementById("clone-form"),o=n.querySelector('input[name="cloneTasks"]'),r=n.querySelector('input[name="keepAssignees"]');o.addEventListener("change",i=>{r.disabled=!i.target.checked,i.target.checked||(r.checked=!1)}),n.addEventListener("submit",async i=>{i.preventDefault();const d=n.querySelector('button[type="submit"]');d.disabled=!0;try{const l={nameAr:n.nameAr.value,nameEn:n.nameEn.value,dueDate:n.dueDate.value,cloneTasks:n.cloneTasks.checked,keepAssignees:n.keepAssignees.checked,cloneMembers:n.cloneMembers.checked},p=await D(`/api/projects/${e.id}/clone`,{method:"POST",body:JSON.stringify(l)});K(),s.view="project-detail",s.activeProjectId=p.project.id,await refreshView(),k(t("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(l){k(l.message,!0),d.disabled=!1}})}function Dt(){const e=s.data?.company||{},a=e.nameAr||e.name||"فريق دارك للتصميم",n=e.nameEn||e.name||"DARC Design Team",o=t(a,n),r=e.logoUrl||"";let i=/^(https?:\/\/|data:image\/|\/)/i.test(r)&&!r.toLowerCase().includes("javascript:")?r:"";return i.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(i=`${window.location.origin}${i}`),{nameAr:a,nameEn:n,displayName:o,logoUrl:i,emailFrom:e.emailFrom||"",timezone:e.timezone||"Asia/Riyadh"}}function Za(e,a){const n=`
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
      ${a}
    </body>
    </html>
  `,o=new Blob(["\uFEFF"+n],{type:"application/vnd.ms-excel;charset=utf-8;"}),r=URL.createObjectURL(o),i=document.createElement("a");i.href=r,i.download=e+".xls",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}function yi(){const e=s.data?.projects||[];if(!e||!e.length){k(t("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const a=Dt(),n=qe(),o=11;let r="<table>";r+=`<tr><td colspan="${o}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${a.logoUrl?`<img src="${c(a.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(a.displayName)}</span>
  </td></tr>`,r+=`<tr><td colspan="${o}" class="subtitle">${t("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,r+=`<tr><td colspan="${o}" class="meta">${t("تاريخ الإصدار:","Generated on:")} ${n}</td></tr>`,r+=`<tr><td colspan="${o}" style="border:none;"></td></tr>`,r+=`<tr class="header">
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
  </tr>`,e.forEach(i=>{const d=i.manager?t(i.manager.name,i.manager.nameEn||i.manager.name):"";r+=`<tr>
      <td>${c(N(i.code))}</td>
      <td>${c(N(i.nameAr))}</td>
      <td>${c(N(i.nameEn))}</td>
      <td>${c(N(t(i.clientAr,i.clientEn)))}</td>
      <td>${c(N(d))}</td>
      <td>${c(N(H(i.lifecycle)))}</td>
      <td>${c(N(H(i.health)))}</td>
      <td>${c(N(i.startDate||""))}</td>
      <td>${c(N(i.dueDate||""))}</td>
      <td>${i.progress||0}%</td>
      <td>${i.memberCount||0}</td>
    </tr>`}),r+="</table>",Za(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,r),k(t("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),D("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:t("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:e.length}})}).catch(()=>{})}function bi(e){const a=(s.data?.projects||[]).find(m=>m.id===e);if(!a)return;const n=(s.data?.tasks||[]).filter(m=>m.projectId===e);if(!n.length){k(t("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const o=Dt(),r=s.data?.users||[],i=new Map(r.map(m=>[m.id,m]));function d(m){if(!m)return"—";const v=i.get(m);return v?t(v.name,v.nameEn||v.name):m}const l=qe(),p=11;let u="<table>";u+=`<tr><td colspan="${p}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${o.logoUrl?`<img src="${c(o.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(o.displayName)}</span>
  </td></tr>`,u+=`<tr><td colspan="${p}" class="subtitle">${t("تقرير مهام ومخرجات المشروع:","Project Tasks & Deliverables Report:")} ${c(t(a.nameAr,a.nameEn))} (${c(a.code)})</td></tr>`,u+=`<tr><td colspan="${p}" class="meta">${t("العميل / المالك:","Client:")} ${c(t(a.clientAr,a.clientEn))||"—"} | ${t("تاريخ الإصدار:","Generated on:")} ${l}</td></tr>`,u+=`<tr><td colspan="${p}" style="border:none;"></td></tr>`,u+=`<tr class="header">
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
  </tr>`,n.forEach((m,v)=>{const $=m.templateId?m.templateId.replace("tpl-","#"):m.id?`#${m.id.slice(-6)}`:`#${v+1}`,y=d(m.assigneeId||m.assignee_id),h=d(m.reviewerId||m.reviewer_id),f=d(m.approverId||m.approver_id);u+=`<tr>
      <td style="text-align:center;font-weight:bold;">${c(N($))}</td>
      <td>${c(N(m.titleAr))}</td>
      <td>${c(N(m.titleEn))}</td>
      <td>${c(N(t(m.categoryAr,m.categoryEn)))}</td>
      <td>${c(N(y))}</td>
      <td style="color:#0369a1;">${c(N(h))}</td>
      <td style="color:#047857;">${c(N(f))}</td>
      <td>${c(N(H(m.status)))}</td>
      <td>${c(N(m.startDate||""))}</td>
      <td>${c(N(m.dueDate||""))}</td>
      <td style="font-weight:bold;">${m.progress||0}%</td>
    </tr>`}),u+="</table>",Za(`DARC_Project_${a.code}_${new Date().toISOString().split("T")[0]}`,u),k(t("تم بدء تحميل تقرير المهام.","Report download started.")),D("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:t(`تقرير مهام مشروع: ${a.nameAr}`,`Project Tasks Report: ${a.nameEn||a.nameAr}`),taskCount:n.length}})}).catch(()=>{})}function ba(e,a=!1){const n=(s.data?.projects||[]).find(b=>b.id===e);if(!n)return;const o=(s.data?.tasks||[]).filter(b=>b.projectId===e);if(!o.length){k(t("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const r=Dt(),i=s.data?.users||[],d=new Map(i.map(b=>[b.id,b]));function l(b){if(!b)return"—";const A=d.get(b);return A?t(A.name,A.nameEn||A.name):b}function p(b){return b?.dueDate&&!["done","completed","canceled"].includes(b.status)&&new Date(`${b.dueDate}T23:59:59`)<new Date}const u=o.length,m=o.filter(b=>["done","completed"].includes(b.status)).length,v=o.filter(b=>["review","approval"].includes(b.status)).length;o.filter(b=>b.status==="in_progress").length;const $=o.filter(b=>p(b)).length,y=new Date,h=qe(y),f=St(y),w=new Map;o.forEach(b=>{const A=t(b.categoryAr,b.categoryEn)||t(b.typeAr,b.typeEn)||t("عام","General"),j=w.get(A)||{total:0,completed:0,weight:0,progressSum:0},P=Number(b.weight||1);j.total++,["done","completed"].includes(b.status)&&j.completed++,j.weight+=P,j.progressSum+=(b.progress||0)*P,w.set(A,j)});const T=Array.from(w.entries()).map(([b,A])=>({name:b,percent:A.weight?Math.round(A.progressSum/A.weight):0,completed:A.completed,total:A.total})),I=a?t("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):t("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");a?t("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):t("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const E=o.map((b,A)=>{const j=b.templateId?b.templateId.replace("tpl-","#"):b.id?`#${b.id.slice(-6)}`:`#${A+1}`,P=t(b.titleAr,b.titleEn),L=t(b.categoryAr,b.categoryEn)||t(b.typeAr,b.typeEn)||"—",R=H(b.status),F=b.progress||0,O=b.dueDate||"—";if(a)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${A+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${c(j)}</td>
          <td style="font-weight:600;">${c(P)}</td>
          <td style="text-align:center;">${c(L)}</td>
          <td style="text-align:center;"><span class="badge ${c(b.status)}">${c(R)}</span></td>
          <td style="text-align:center;direction:ltr;">${c(O)}</td>
          <td style="text-align:center;font-weight:bold;color:${F===100?"#0d6269":"#1e293b"};">${F}%</td>
        </tr>
      `;const Y=l(b.assigneeId||b.assignee_id),Q=l(b.reviewerId||b.reviewer_id),U=l(b.approverId||b.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${A+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${c(j)}</td>
        <td style="font-weight:600;">${c(P)}</td>
        <td style="text-align:center;">${c(L)}</td>
        <td>${c(Y)}</td>
        <td style="color:#0369a1;font-weight:600;">${c(Q)}</td>
        <td style="color:#047857;font-weight:600;">${c(U)}</td>
        <td style="text-align:center;"><span class="badge ${c(b.status)}">${c(R)}</span></td>
        <td style="text-align:center;direction:ltr;">${c(O)}</td>
        <td style="text-align:center;font-weight:bold;color:${F===100?"#0d6269":"#1e293b"};">${F}%</td>
      </tr>
    `}).join(""),z=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${c(r.displayName)} - ${c(n.code)} - ${a?"Client_Report":"Executive_Report"}</title>
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
          text-align: ${s.lang==="ar"?"left":"right"};
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
          text-align: ${s.lang==="ar"?"right":"left"};
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
          <strong style="color:#0d6269;font-size:13px;">${c(I)}</strong>
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
          ${r.logoUrl?`
            <img src="${c(r.logoUrl)}" alt="Logo" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${c(r.displayName)}</h1>
          <div class="brand-sub">${t("مكتب الاستشارات والتصميم الهندسي","Architecture & Engineering Consultancy")}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${c(I)}</div>
          <div><strong>${t("كود المشروع:","Project Code:")}</strong> ${c(n.code)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(h)} - ${c(f)}</div>
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
          <span>${c(l(n.managerId))}</span>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${n.progress||0}%</div>
          <div class="kpi-label">${t("نسبة الإنجاز الإجمالية","Overall Progress")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#047857;">${m} / ${u}</div>
          <div class="kpi-label">${t("المخرجات المعتمدة","Approved Deliverables")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${v}</div>
          <div class="kpi-label">${t("قيد المراجعة والاعتماد","Under Review")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:${$>0?"#b91c1c":"#64748b"};">${$}</div>
          <div class="kpi-label">${t("المخرجات المتأخرة","Overdue Deliverables")}</div>
        </div>
      </div>

      ${T.length?`
        <div class="disc-section">
          <strong style="font-size:11px;color:#334155;">${t("مؤشرات الإنجاز بحسب التخصص الهندسي:","Engineering Discipline Progress Breakdown:")}</strong>
          <div class="disc-grid">
            ${T.map(b=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${c(b.name)}</span>
                  <span>${b.percent}% (${b.completed}/${b.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${b.percent}%;"></div>
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
          ${E}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">
          ${t("ختم المكتب الهندسي والاستشاري المعتمد","Official Engineering Consultancy Stamp")}
        </div>
        <div class="signature-box">
          <div class="signature-title">${t("مهندس ومدير المشروع","Project Manager")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${c(l(n.managerId))}</div>
          <div class="signature-line">${t("التوقيع والمصادقة","Sign & Date")}</div>
        </div>
        <div class="signature-box">
          <div class="signature-title">${t("الاعتماد والاستشاري العام","Approved By Lead Consultant")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${c(r.displayName)}</div>
          <div class="signature-line">${t("التوقيع والاعتماد النهائي","Sign & Authorization")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${c(r.displayName)} — ${t("وثيقة إدارية معتمدة صادرة عبر منصة دارك","Official Governance Document via DARC Platform")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${c(h)}</div>
      </footer>
    </body>
    </html>
  `,M=window.open("","_blank","width=1100,height=900");M?(M.document.open(),M.document.write(z),M.document.close()):Qa(z),k(t("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),D("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:c(I),type:a?"client_pdf":"executive_pdf",taskCount:u}})}).catch(()=>{})}function hi(){const e=s.data?.projects||[];if(!e||!e.length){k(t("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const a=Dt(),n=new Date,o=qe(n),r=St(n),i=e.length,d=e.filter(y=>y.health==="on_track").length,l=e.filter(y=>y.health==="at_risk").length,p=e.filter(y=>y.health==="off_track").length,u=e.map((y,h)=>{const f=y.manager?t(y.manager.name,y.manager.nameEn||y.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${h+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${c(y.code)}</td>
        <td style="font-weight:700;">${c(t(y.nameAr,y.nameEn))}</td>
        <td>${c(t(y.clientAr,y.clientEn))||"—"}</td>
        <td>${c(f)}</td>
        <td style="text-align:center;"><span class="badge ${c(y.lifecycle)}">${c(H(y.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${c(y.health)}">${c(H(y.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${c(y.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${c(y.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${y.progress===100?"#0d6269":"#0f172a"};">${y.progress||0}%</td>
      </tr>
    `}).join(""),m=t("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),v=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang==="ar"?"rtl":"ltr"}">
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
        th, td { border: 1px solid #cbd5e1; padding: 7px 9px; text-align: ${s.lang==="ar"?"right":"left"}; vertical-align: middle; }
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
          <strong style="color:#0d6269;font-size:13px;">${c(m)}</strong>
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
        <div style="text-align:${s.lang==="ar"?"left":"right"};font-size:11px;color:#334155;line-height:1.6;">
          <div style="display:inline-block;background:#e6f4f5;color:#0d6269;font-weight:800;padding:3px 10px;border-radius:4px;font-size:11px;border:1px solid #bce1e4;margin-bottom:4px;">${t("تقرير حالة المحفظة","Portfolio Status Report")}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(o)} - ${c(r)}</div>
          <div><strong>${t("إجمالي المشاريع:","Total Projects:")}</strong> ${i}</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${i}</div>
          <div class="kpi-label">${t("إجمالي مشاريع المحفظة","Total Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#166534;">${d}</div>
          <div class="kpi-label">${t("مشاريع تسير وفق الخطة","On Track Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${l}</div>
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
  `,$=window.open("","_blank","width=1200,height=900");$?($.document.open(),$.document.write(v),$.document.close()):Qa(v),k(t("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),D("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:c(m),type:"portfolio_pdf",count:i}})}).catch(()=>{})}function Qa(e){let a=document.getElementById("print-modal-overlay");a||(a=document.createElement("div"),a.id="print-modal-overlay",a.style.position="fixed",a.style.inset="0",a.style.zIndex="1400",a.style.background="rgba(0, 0, 0, 0.75)",a.style.backdropFilter="blur(4px)",a.style.display="flex",a.style.flexDirection="column",a.style.alignItems="center",a.style.justifyContent="center",a.style.padding="15px",document.body.appendChild(a)),a.innerHTML=`
    <div style="background:#fff;width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid #e2e8f0;background:#f8fafc;">
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
  `,a.style.display="flex";const n=()=>{a.style.display="none",a.innerHTML="",window.removeEventListener("keydown",o)},o=r=>{r.key==="Escape"&&n()};window.addEventListener("keydown",o),document.getElementById("btn-close-print-modal")?.addEventListener("click",n),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const r=document.getElementById("print-preview-iframe");r&&r.contentWindow&&(r.contentWindow.focus(),r.contentWindow.print())})}var Ts=ce({TEMPLATE_CATEGORIES:()=>mt,openTemplateModal:()=>js,renderTemplates:()=>Is}),mt=[{id:"architectural",ar:"معماري",en:"Architectural",icon:"🏛️"},{id:"electrical",ar:"كهرباء — إلكتروميكانيك",en:"Electrical",icon:"⚡"},{id:"plumbing",ar:"سباكة — إلكتروميكانيك",en:"Plumbing",icon:"💧"},{id:"hvac",ar:"تكييف — إلكتروميكانيك",en:"HVAC",icon:"🌡️"},{id:"fire",ar:"حريق — إلكتروميكانيك",en:"Fire Protection",icon:"🧯"},{id:"low_current",ar:"تيار خفيف",en:"Low Current",icon:"📡"},{id:"sections",ar:"مقاطع",en:"Sections",icon:"✂️"},{id:"detail",ar:"تفصيلي",en:"Detailed",icon:"🔍"},{id:"site",ar:"موقع عام",en:"Site Plan",icon:"🗺️"},{id:"quantity",ar:"جداول كميات",en:"Quantity Tables",icon:"📊"},{id:"documents",ar:"وثائق وخطابات",en:"Documents & Letters",icon:"📄"}];function Is(){const e=s.searches.templates.trim().toLowerCase(),a=[...s.data.templates||[]].sort((i,d)=>(parseInt(i.code,10)||0)-(parseInt(d.code,10)||0)),n=new Map;mt.forEach(i=>n.set(i.id,0)),a.forEach(i=>{n.set(i.categoryId,(n.get(i.categoryId)||0)+1)});const o=s.templateCategory||"all",r=mt.map(i=>{if(o!=="all"&&o!==i.id)return null;const d=a.filter(l=>l.categoryId!==i.id?!1:e?`${l.nameAr} ${l.nameEn} ${l.code} ${l.typeAr} ${l.typeEn}`.toLowerCase().includes(e):!0);return d.length?{...i,items:d}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${t("مخرجات DARC القياسية","DARC STANDARD DELIVERABLES")}</p>
      <h1>${g("templates")}</h1>
      <p>${g("standardLibrarySub")}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${a.length} ${g("templatesCount")}</span>
      ${S("manage_templates")?`<button class="btn btn-primary" data-action="new-template" style="margin-${s.lang==="ar"?"right":"left"}:10px">${x("plus",15)} ${t("إضافة قالب","Add Template")}</button>`:""}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${x("search",15)}
        <input data-search="templates" value="${c(s.searches.templates)}" placeholder="${g("search")}" />
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
      ${mt.map(i=>`
        <button class="template-category-tab ${o===i.id?"active":""}" data-action="template-category" data-category="${c(i.id)}">
          <span class="category-icon">${c(i.icon)}</span>
          <span>${c(t(i.ar,i.en))}</span>
          <small>${n.get(i.id)||0}</small>
        </button>
      `).join("")}
    </aside>
    <div>
      ${r.length?r.map(i=>`
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${c(i.icon)}</span>
            <div>
              <h3>${c(t(i.ar,i.en))}</h3>
              <span>${i.items.length} ${g("templatesCount")}</span>
            </div>
          </div>
          <div class="template-grid">
            ${i.items.map(d=>`
              <article class="template-item" style="position:relative;cursor:${S("manage_templates")?"pointer":"default"};" ${S("manage_templates")?`data-action="edit-template" data-template-id="${c(d.id)}"`:""}>
                <span class="template-number">${c(d.code)}</span>
                <div class="template-copy">
                  <strong>${c(t(d.nameAr,d.nameEn))}</strong>
                  <span>${c(s.lang==="ar"?d.nameEn:d.nameAr)}</span>
                </div>
                ${S("manage_templates")?`<button class="template-action" data-action="edit-template" data-template-id="${c(d.id)}" title="${g("edit")}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${s.lang==="ar"?"right":"left"}:auto">${x("edit",14)}</button>`:""}
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
  </div>`}function js(e=null){if(!S("manage_templates"))return k(g("permissionDenied"),!0);const a=mt.map(o=>`<option value="${c(o.id)}" ${e?.categoryId===o.id?"selected":""}>${c(t(o.ar,o.en))}</option>`).join(""),n=`<form id="template-form" data-template-id="${c(e?.id||"")}">
    <div class="form-grid">
      <div class="field">
        <label>${g("nameAr")}</label>
        <input name="nameAr" value="${c(e?.nameAr||"")}" required />
      </div>
      <div class="field">
        <label>${g("nameEn")}</label>
        <input name="nameEn" value="${c(e?.nameEn||"")}" required />
      </div>
      <div class="field">
        <label>${t("الرمز / الكود","Code")}</label>
        <input name="code" value="${c(e?.code||"")}" placeholder="e.g. 01" />
      </div>
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
  </form>`;document.getElementById("modal-root").innerHTML=ye(e?t("تعديل قالب","Edit Template"):t("إضافة قالب جديد","Add New Template"),t("القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.","Templates help the team insert tasks quickly with standard criteria."),n,"template")}var Ds=ce({openUploadDrawingModal:()=>Ps,renderDocuments:()=>_s});function _s(){const e=s.data?.documents||[],a=s.data?.projects||[],n=s.data?.tasks||[],o=(s.searches?.documents||"").trim().toLowerCase(),r=s.docProjectFilter||"all",i=s.data?.user?.id,d=_(),l=d||S("review_tasks")||S("approve_tasks")||S("edit_tasks"),p=new Set(n.filter(y=>!y.deletedAt).map(y=>y.id)),u=new Set(a.filter(y=>!y.deletedAt).map(y=>y.id)),m=e.filter(y=>!(y.deletedAt||y.taskId&&!p.has(y.taskId)||y.projectId&&!u.has(y.projectId)||r!=="all"&&y.projectId!==r||o&&!(y.originalName||"").toLowerCase().includes(o))).sort((y,h)=>new Date(h.createdAt||0)-new Date(y.createdAt||0)),v=m.reduce((y,h)=>y+(h.size||0),0),$=v>1073741824?(v/1073741824).toFixed(1)+" GB":v>1048576?(v/1048576).toFixed(1)+" MB":Math.round(v/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${g("documents")}</h2>
        <p class="intro">${t("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${S("upload_documents")||d?`
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
          ${m.length} ${t("مخطط / ملف","drawings")} (${$})
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
            value="${c(s.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <div class="sort-box">
          <span>${t("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact" style="min-width:180px;">
            <option value="all" ${r==="all"?"selected":""}>${t("— جميع المشاريع —","— All Projects —")}</option>
            ${a.map(y=>`<option value="${c(y.id)}" ${r===y.id?"selected":""}>${c(y.code)} - ${c(t(y.nameAr,y.nameEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">
          ${m.length} ${t("مخرجات","deliverables")}
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
            ${m.length>0?m.map(y=>{const h=a.find(z=>z.id===y.projectId),f=n.find(z=>z.id===y.taskId),w=La(y.originalName,y.mimeType),T=zn(y.originalName),I=y.size>1048576?(y.size/1048576).toFixed(1)+" MB":Math.round((y.size||0)/1024)+" KB",E=d||S("delete_documents")||y.uploaderId===i;return`
                <tr data-doc-id="${c(y.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(y.id)}">
                      <span class="file-format-badge" style="background:${w.bg};color:${w.color};border:1px solid ${w.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${w.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(y.originalName)}">
                          ${c(y.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${w.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${h?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${c(h.id)}">${c(h.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${f?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(f.id)}">${c(t(f.titleAr,f.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
                  </td>
                  <td>
                    ${T?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${T}
                      </span>
                    `:'<span style="font-size:11px;color:var(--muted);">V1</span>'}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${l?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${c(y.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${y.status==="draft"?"selected":""}>📝 ${t("مسودة عمل","Draft")}</option>
                          <option value="review" ${y.status==="review"?"selected":""}>🔍 ${t("قيد المراجعة","Review")}</option>
                          <option value="approved" ${y.status==="approved"?"selected":""}>✅ ${t("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${y.status==="superseded"?"selected":""}>⏳ ${t("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${c(y.status||"draft")}" style="font-size:11px;">
                          ${c(H(y.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${I}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${ve(y.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(y.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${x("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(y.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ الرابط","Copy Link")}">
                        ${x("link",14)}
                      </button>
                      <a href="/api/documents/${c(y.id)}" target="_blank" rel="noopener noreferrer" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${t("تحميل","Download")}">
                        ${x("download",14)}
                      </a>
                      ${E?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${c(y.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
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
  `}function Ps(e=null){const a=s.data?.projects||[],n=e||a[0]?.id||"",o=s.data?.tasks?.filter(d=>d.projectId===n&&!d.deletedAt)||[],r=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${a.map(d=>`<option value="${c(d.id)}" ${d.id===n?"selected":""}>${c(d.code)} - ${c(t(d.nameAr,d.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${o.map(d=>`<option value="${c(d.id)}">${c(t(d.titleAr,d.titleEn))}</option>`).join("")}
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
  `,i=document.getElementById("modal-root");if(i){i.innerHTML=ye(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),r,"upload-drawing","modal-lg");const d=document.getElementById("drawing-upload-project"),l=document.getElementById("drawing-upload-task");d&&l&&d.addEventListener("change",()=>{const f=d.value,w=s.data?.tasks?.filter(T=>T.projectId===f&&!T.deletedAt)||[];l.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+w.map(T=>`<option value="${c(T.id)}">${c(t(T.titleAr,T.titleEn))}</option>`).join("")});const p=document.getElementById("drawing-dropzone"),u=document.getElementById("drawing-file-input"),m=document.getElementById("drawing-selected-files-list"),v=document.getElementById("start-drawing-upload-btn");let $=[];const y=()=>{if(!$.length){m.innerHTML="",v.disabled=!0;return}v.disabled=!1,m.innerHTML=$.map((f,w)=>{const T=La(f.name,f.type),I=f.size>1048576?(f.size/1048576).toFixed(1)+" MB":Math.round(f.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${T.bg};color:${T.color};border:1px solid ${T.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${T.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${c(f.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${I})</span>
            </div>
            <button type="button" data-file-remove="${w}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),m.querySelectorAll("[data-file-remove]").forEach(f=>{f.addEventListener("click",w=>{const T=parseInt(f.dataset.fileRemove);$.splice(T,1),y()})})};p&&u&&(p.addEventListener("click",()=>u.click()),u.addEventListener("change",()=>{u.files?.length&&($=Array.from(u.files),y())}),p.addEventListener("dragover",f=>{f.preventDefault(),p.style.borderColor="var(--teal)"}),p.addEventListener("dragleave",()=>{p.style.borderColor="var(--line)"}),p.addEventListener("drop",f=>{f.preventDefault(),p.style.borderColor="var(--line)",f.dataTransfer?.files?.length&&($=Array.from(f.dataTransfer.files),y())}));const h=document.getElementById("upload-drawing-form");h&&h.addEventListener("submit",async f=>{if(f.preventDefault(),!$.length)return;const w=d.value,T=l.value||null,I=document.getElementById("drawing-upload-discipline")?.value||"عام",E=document.getElementById("drawing-upload-status")?.value||"draft";K(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:$,projectId:w,taskId:T,discipline:I,status:E})})}}var En={assignment:{type:"assignment",category:"tasks",icon:"user",color:"blue",titleAr:"إسناد مهمة جديدة",titleEn:"Task Assigned",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_status:{type:"task_status",category:"tasks",icon:"check",color:"teal",titleAr:"تحديث حالة المهمة",titleEn:"Task Status Update",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_blocked:{type:"task_blocked",category:"tasks",icon:"alert",color:"red",titleAr:"مهمة متوقفة ⚠️",titleEn:"Task Blocked ⚠️",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_review:{type:"task_review",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة للمراجعة الفنية",titleEn:"Task for Review",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_approval:{type:"task_approval",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة بانتظار الاعتماد",titleEn:"Task Pending Approval",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},due_soon:{type:"due_soon",category:"schedule",icon:"clock",color:"amber",titleAr:"موعد تسليم قريب",titleEn:"Due Soon",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},overdue:{type:"overdue",category:"schedule",icon:"alert",color:"red",titleAr:"مهمة متأخرة",titleEn:"Overdue Task",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},reminder:{type:"reminder",category:"schedule",icon:"clock",color:"amber",titleAr:"تذكير بموعد ⏰",titleEn:"Due Reminder ⏰",badgeTextAr:"فتح التذكير",badgeTextEn:"Open Reminder"},comment:{type:"comment",category:"communication",icon:"mail",color:"blue",titleAr:"تعليق جديد",titleEn:"New Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},mention:{type:"mention",category:"communication",icon:"mail",color:"blue",titleAr:"تم ذكرك في تعليق",titleEn:"Mentioned in Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},document_review:{type:"document_review",category:"drawings",icon:"document",color:"amber",titleAr:"مراجعة مخطط هندسي",titleEn:"Drawing Review",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},document_approved:{type:"document_approved",category:"drawings",icon:"document",color:"teal",titleAr:"اعتماد مخطط هندسي",titleEn:"Drawing Approved",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},escalation:{type:"escalation",category:"system",icon:"alert",color:"red",titleAr:"تصعيد مهمة ونظام 🚨",titleEn:"Escalation Alert 🚨",badgeTextAr:"التفاصيل",badgeTextEn:"Details"},general:{type:"general",category:"system",icon:"bell",color:"blue",titleAr:"تنبيه مساحة العمل",titleEn:"Workspace Notification",badgeTextAr:"عرض",badgeTextEn:"View"}};function Cs(e){const a=En[e]||En.general;return{...a,defaultTitle:t(a.titleAr,a.titleEn),badgeText:t(a.badgeTextAr,a.badgeTextEn)}}var Ms=ce({showNotifications:()=>en});function en(){const e=s.data?.notifications||[],a=e.filter(r=>!r.read&&!r.readAt).length,n=e.length-a,o=`${`
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
  `:""}${e.length?`<div class="attention-list">${e.slice(0,30).map(r=>{const i=!!(r.readAt||r.read),d=Cs(r.type),l=s.lang==="ar"?r.titleAr||d.titleAr||r.titleEn||d.defaultTitle:r.titleEn||d.titleEn||r.titleAr||d.defaultTitle,p=s.lang==="ar"?r.messageAr||r.bodyAr||r.content||"":r.messageEn||r.bodyEn||(r.content!==r.titleAr&&r.content!==r.messageAr?r.content:"")||r.messageAr||r.bodyAr||"",u=p&&p!==l?`${p} · `:"",m=r.type==="document_review"||r.type==="document_approved"||r.documentId,v=r.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-weight:600;">${x("check",10)} ${t("فتح المهمة","Open Task")}</span>`:m?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);font-weight:600;">${x("document",10)} ${t("معاينة المخطط","View Drawing")}</span>`:r.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);font-weight:600;">${x("building",10)} ${t("المشروع","Project")}</span>`:"",$=i?"":`<span style="width:7px;height:7px;border-radius:50%;background:var(--blue);display:inline-block;flex-shrink:0;box-shadow:0 0 0 2px var(--surface);" title="${t("غير مقروء","Unread")}"></span>`;return`
      <div class="attention-item notif-item" data-action="read-notification" data-notification-id="${c(r.id)}" data-task-id="${c(r.taskId||"")}" data-project-id="${c(r.projectId||"")}" data-document-id="${c(r.documentId||"")}" data-type="${c(r.type||"")}" style="border:1px solid ${i?"var(--line)":"rgba(56,189,248,0.25)"};text-align:start;width:100%;cursor:pointer;opacity:${i?".75":"1"};background:${i?"var(--surface-soft)":"var(--surface)"};position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
        <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
          <span class="attention-icon ${d.color}" style="flex-shrink:0;margin-top:2px;">${x(d.icon,14)}</span>
          <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
              ${$}
              <strong dir="auto" style="color:var(--${d.color});font-size:12px;font-weight:${i?"600":"700"};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(l)}</strong>
              ${v}
            </div>
            <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(p)}">
              ${c(u)}<span style="color:var(--ink-soft);">${ve(r.createdAt)}</span>
            </div>
          </div>
        </div>
        <button type="button" class="notif-dismiss-btn" data-action="delete-notification" data-notification-id="${c(r.id)}" title="${t("حذف الإشعار","Dismiss notification")}" style="margin-inline-start:10px;flex-shrink:0;">
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
  `}`;document.getElementById("modal-root").innerHTML=ye(g("notifications"),t("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),o,"notifications","modal-notifications")}var zs=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),ha=zs?"⌘K":"Ctrl+K",be=0,de=[];function xi(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.body.style.overflow="hidden";const a=t(`ابحث في المشاريع، المهام، والأعضاء... (${ha})`,`Search projects, tasks, team... (${ha})`),n=`
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
          ${In("")}
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
  `;document.body.insertAdjacentHTML("beforeend",n);const o=document.getElementById("omnisearch-modal");o&&o.addEventListener("click",i=>{i.target===o&&Ue()});const r=document.getElementById("omnisearch-input");r&&(r.focus(),r.addEventListener("input",i=>{be=0;const d=document.getElementById("omnisearch-results-container");d&&(d.innerHTML=In(i.target.value))}),r.addEventListener("keydown",Ls))}function Ue(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.querySelector(".modal-backdrop")||(document.body.style.overflow="")}function Ls(e){e.key==="ArrowDown"?(e.preventDefault(),de.length>0&&(be=(be+1)%de.length,Tn())):e.key==="ArrowUp"?(e.preventDefault(),de.length>0&&(be=(be-1+de.length)%de.length,Tn())):e.key==="Enter"?(e.preventDefault(),de[be]&&wi(de[be])):e.key==="Escape"&&Ue()}function Tn(){document.querySelectorAll(".omni-item").forEach((e,a)=>{e.classList.toggle("selected",a===be),a===be&&e.scrollIntoView({block:"nearest"})})}function wi(e){if(Ue(),e.type==="action")if(e.id==="new-task"){const a=(s.data?.projects||[]).find(n=>n.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0];Wt(null,null,e.targetProjectId||a?.id)}else e.id==="new-project"?Xa():e.id==="cheatsheet"?tn():e.id==="show-notifications"&&en();else if(e.type==="project")s.projectTab="tasks",s.lastActiveProjectId=e.id,me("project-detail",e.id);else if(e.type==="task"){const a=s.data?.tasks?.find(n=>n.id===e.id);a&&Wt(a)}else if(e.type==="user"){const a=s.data?.users?.find(n=>n.id===e.id);a&&typeof window.openUserModal=="function"&&window.openUserModal(a)}}function In(e){const a=e.trim().toLowerCase(),n=[],o=(s.data?.projects||[]).find(l=>l.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0],r=o?t(o.nameAr,o.nameEn):"",i=[];if((S("create_tasks")||_())&&i.push({type:"action",id:"new-task",targetProjectId:o?.id,title:t("إضافة مهمة جديدة","Create new task"),sub:o?t(`في مشروع: ${r}`,`In project: ${r}`):t("إجراء سريع","Quick action"),icon:"plus",keywords:"new task مهمة إضافة عمل جديد"}),(S("create_projects")||_())&&i.push({type:"action",id:"new-project",title:t("إنشاء مشروع جديد","Create new project"),sub:t("إجراء سريع","Quick action"),icon:"building",keywords:"new project مشروع إنشاء جديد"}),i.push({type:"action",id:"cheatsheet",title:t("عرض دليل اختصارات لوحة المفاتيح","View keyboard shortcuts guide"),sub:t("مساعدة","Help"),icon:"sparkles",keywords:"shortcuts اختصارات كيبورد مساعدة"}),i.push({type:"action",id:"show-notifications",title:t("مركز التنبيهات والإشعارات","Notifications Center"),sub:t("عرض الإشعارات والتنبيهات الحديثة","View recent notifications & alerts"),icon:"bell",keywords:"notifications alerts إشعارات تنبيهات رنين تنبيه"}),i.forEach(l=>{(!a||l.keywords.includes(a)||l.title.toLowerCase().includes(a))&&n.push(l)}),(S("view_projects")||_())&&(s.data?.projects||[]).forEach(l=>{(!a||`${l.nameAr} ${l.nameEn} ${l.code} ${l.clientAr} ${l.clientEn}`.toLowerCase().includes(a))&&n.push({type:"project",id:l.id,title:t(l.nameAr,l.nameEn),sub:`${l.code} · ${t(l.clientAr,l.clientEn)||""}`,badge:`${l.progress}%`,icon:"building"})}),Z("tasks")&&(s.data?.tasks||[]).forEach(l=>{(!a||`${l.titleAr} ${l.titleEn} ${l.categoryAr} ${l.categoryEn}`.toLowerCase().includes(a))&&n.push({type:"task",id:l.id,title:t(l.titleAr,l.titleEn),sub:l.dueDate?`📅 ${ve(l.dueDate)}`:t(l.categoryAr,l.categoryEn)||"",badge:`${l.progress}%`,icon:"checklist"})}),(_()||S("manage_users"))&&(s.data?.users||[]).forEach(l=>{(!a||`${l.name} ${l.nameEn} ${l.email} ${l.jobTitleAr}`.toLowerCase().includes(a))&&n.push({type:"user",id:l.id,title:t(l.name,l.nameEn||l.name),sub:l.email||"",badge:ae(l),icon:"user"})}),de=n.slice(0,15),!de.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${x("search",24)}</span>
        <strong style="color:var(--ink);">${t("لا توجد نتائج مطابقة","No matching results")}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${t("جرب البحث بكلمات أخرى أو رمز المشروع.","Try different keywords or project code.")}</p>
      </div>
    `;let d="";return de.map((l,p)=>{let u="";const m=l.type==="action"?t("إجراءات سريعة","Quick Actions"):l.type==="project"?t("المشاريع","Projects"):l.type==="task"?t("المهام والمخرجات","Tasks & Deliverables"):t("فريق العمل","Team");return m!==d&&(d=m,u=`<div class="omni-group-title">${m}</div>`),`
      ${u}
      <div class="omni-item ${p===be?"selected":""}" data-omni-index="${p}" onclick="window.__selectOmniItem(${p})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${x(l.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${c(l.title)}</strong>
            ${l.sub?`<span style="font-size:11px;color:var(--muted);">${c(l.sub)}</span>`:""}
          </div>
        </div>
        ${l.badge?`<span class="omni-badge">${c(l.badge)}</span>`:""}
      </div>
    `}).join("")}window.__selectOmniItem=e=>{de[e]&&wi(de[e])};function tn(){Ue();const e=`
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${t("استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:","Use these shortcuts to navigate the workspace at full speed without a mouse:")}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${t("البحث الشامل والأوامر السريعة","Omnisearch & Quick Commands")}</span>
          <kbd class="shortcut-kbd">${ha}</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${t("إضافة مهمة سريعة في المشروع","Add new task in project")}</span>
          <kbd class="shortcut-kbd">N</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${t("إنشاء مشروع جديد","Create new project")}</span>
          <kbd class="shortcut-kbd">P</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${t("مركز التنبيهات والإشعارات","Notifications Center")}</span>
          <kbd class="shortcut-kbd">B</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${t("فتح دليل الاختصارات هذا","Open this shortcuts guide")}</span>
          <kbd class="shortcut-kbd">? / ؟</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${t("إغلاق أي نافذة منبثقة أو بحث","Close modal or search")}</span>
          <kbd class="shortcut-kbd">ESC</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${t("التنقل بين نتائج البحث","Navigate search results")}</span>
          <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd></span>
        </div>
        <div class="cheatsheet-row">
          <span>${t("تأكيد واختيار النتيجة","Select search result")}</span>
          <kbd class="shortcut-kbd">↵ Enter</kbd>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:24px;">
        <button type="button" class="btn btn-primary" data-action="close-modal">${t("فهمت ذلك","Got it")}</button>
      </div>
    </div>
  `;document.getElementById("modal-root").innerHTML=ye(t("دليل اختصارات لوحة المفاتيح","Keyboard Shortcuts Guide"),t("طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية","Work faster with productivity hotkeys"),e,"cheatsheet")}function Os(){window.addEventListener("keydown",e=>{const a=document.activeElement,n=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.tagName==="SELECT"||a.isContentEditable),o=e.code==="KeyK"||e.key?.toLowerCase()==="k"||e.key==="ن";if((e.metaKey||e.ctrlKey)&&o){e.preventDefault(),document.getElementById("omnisearch-modal")?Ue():xi();return}if((e.key==="?"||e.key==="؟"||e.code==="Slash"&&e.shiftKey)&&!n){e.preventDefault(),tn();return}if((e.code==="KeyN"||e.key?.toLowerCase()==="n"||e.key==="ى")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();const r=s.view==="project-detail"&&s.activeProjectId?s.activeProjectId:s.data?.projects?.[0]?.id;Wt(null,null,r);return}if((e.code==="KeyP"||e.key?.toLowerCase()==="p"||e.key==="ح")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault(),Xa();return}if((e.code==="KeyB"||e.key?.toLowerCase()==="b"||e.key==="لا")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault(),en();return}if(e.key==="Escape"&&document.getElementById("omnisearch-modal")){e.preventDefault(),Ue();return}})}var Rs="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",$i=typeof navigator<"u"&&!!navigator.connection?.saveData,Ns=3e5,Fs=$i?1e4:3e4,Bs=$i?600:300,Us=25e3,qs=150,oa=null,jn=!1,xa=!1,We=null,ge=null,Ot=null,Ze=null,ra=null,Ge=null,Dn=0,ft=0,Ie=!1,an=Date.now(),wa=0,Ct=null,he=new Map;function Hs(e){if(!e||typeof e!="string")return;const a=Date.now();he.set(e,a);for(const[n,o]of he.entries())a-o>8e3&&he.delete(n);if(he.size>qs){const n=he.keys().next().value;n&&he.delete(n)}}function xt(){return typeof localStorage>"u"?!1:!!localStorage.getItem("darc_token")}var Jt=new Set(["__proto__","constructor","prototype"]),ki=new Set(["custom_fields","permissions","details"]);function Vt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Vt);const a={};for(const[n,o]of Object.entries(e)){if(Jt.has(n))continue;const r=n.indexOf("_")===-1?n:n.replace(/_([a-z0-9])/g,(i,d)=>d.toUpperCase());Jt.has(r)||(a[r]=o!==null&&typeof o=="object"&&!ki.has(n)?Vt(o):o)}return a}function Kt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Kt);const a={};for(const[n,o]of Object.entries(e))Jt.has(n)||(a[n]=o!==null&&typeof o=="object"&&!ki.has(n)?Kt(o):o);return a}function ut(e){if(!e||!s.data||!Array.isArray(s.data.tasks)||!Array.isArray(s.data.projects))return;const a=s.data.projects.find(p=>p.id===e);if(!a)return;const n=s.data.tasks.filter(p=>p.projectId===e&&!p.deletedAt&&!p.deleted_at);let o=0,r=0;for(const p of n){const u=Number(p.weight)||1,m=Number(p.progress)||0;o+=u,r+=u*(m/100)}const i=o>0?Math.round(r/o*100):0;a.progress!==i&&(a.progress=i),a.totalWeight=o;const d=n.length>0,l=d&&n.every(p=>p.status==="done"||p.status==="completed");d&&l&&i===100?a.lifecycle="completed":a.lifecycle==="completed"&&(!l||i<100)&&(a.lifecycle="active")}function da(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const a=(s.data?.notifications||[]).filter(o=>!o.read&&!o.readAt).length;let n=e.querySelector(".notification-dot");a>0?n||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):n&&n.remove()}function $a(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!We||We.state==="closed")&&(We=new e),We.state==="suspended"&&We.resume().catch(()=>{});const a=We,n=a.createOscillator(),o=a.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,a.currentTime),n.frequency.exponentialRampToValueAtTime(880,a.currentTime+.15),o.gain.setValueAtTime(.06,a.currentTime),o.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),n.connect(o),o.connect(a.destination),n.start(),n.stop(a.currentTime+.36)}catch{}}function Ws(){Ct&&cancelAnimationFrame(Ct),Ct=requestAnimationFrame(()=>{Ct=null,typeof C=="function"?C():typeof G=="function"&&G()})}function Rt(e,a,n,o){if(!s.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const r=n?Kt(Vt(n)):null,i=o?Kt(Vt(o)):null,d=r&&r.id||i&&i.id;if(!d)return!1;const l=he.get(d);if(l&&Date.now()-l<5e3)return!0;const p=s.data?.user?.roleId==="admin"||s.data?.user?.role_id==="admin";if(r&&e==="notifications"){const $=r.userId||r.user_id;if($&&$!==s.data?.user?.id)return!1}else if(!p&&r&&(e==="tasks"||e==="documents"||e==="comments")){const $=r.projectId||(e==="comments"?s.data?.tasks?.find(y=>y.id===r.taskId)?.projectId:null);if($&&!s.data?.projects?.some(y=>y.id===$))return!1}Array.isArray(s.data[e])||(s.data[e]=[]);const u=s.data[e];let m=!1;const v=!!(r?.deletedAt||r?.deleted_at);if(a==="DELETE"||v){const $=u.length;let y=null;e==="tasks"&&(y=u.find(h=>h.id===d)?.projectId||i?.projectId||r?.projectId),s.data[e]=u.filter(h=>h.id!==d),s.data[e].length!==$&&(m=!0),e==="tasks"&&y?ut(y):e==="projects"?Array.isArray(s.data.tasks)&&(s.data.tasks=s.data.tasks.filter(h=>h.projectId!==d)):e==="notifications"&&(da(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="UPDATE"&&r){const $=u.findIndex(y=>y.id===d);if($!==-1){for(const[y,h]of Object.entries(r))Jt.has(y)||(u[$][y]=h);m=!0}else u.unshift(r),m=!0;e==="tasks"?(r.projectId&&ut(r.projectId),i?.projectId&&i.projectId!==r.projectId&&ut(i.projectId)):e==="notifications"&&(da(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="INSERT"&&r){if(u.some($=>$.id===d)||(u.unshift(r),m=!0),e==="tasks"&&r.projectId)ut(r.projectId);else if(e==="notifications"){const $=s.data?.user?.id,y=r.userId||r.user_id,h=!!(r.read||r.readAt||r.read_at);if($&&y===$&&!h){da();const f=s.lang==="ar"?r.titleAr||r.messageAr||r.bodyAr||r.content||r.titleEn||t("إشعار جديد","New notification"):r.titleEn||r.messageEn||r.bodyEn||(r.content!==r.titleAr&&r.content!==r.messageAr?r.content:"")||r.titleAr||t("إشعار جديد","New notification");if(f&&k(`🔔 ${f}`,!1),$a(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{const w=s.lang==="ar"?r.messageAr||r.bodyAr||r.content||"":r.messageEn||r.bodyEn||r.content||"",T=new Notification(f,{body:w,icon:"/favicon.ico",tag:r.id||"darc-alert"});T.onclick=()=>{window.focus(),typeof showNotifications=="function"&&showNotifications(),T.close()}}catch(w){console.warn("[WebNotification] Error:",w.message)}typeof showNotifications=="function"&&document.querySelector(".modal-notifications")&&showNotifications()}}}if(m){tt();const $=r?.taskId||i?.taskId;if($){const y=(s.data?.tasks||[]).find(h=>h.id===$);if(y){if(e==="comments"){const h=document.getElementById("task-comment-form");if(h&&h.dataset.taskId===$){const f=document.getElementById("task-comments-list");f&&typeof ht=="function"&&(f.innerHTML=ht(y),f.scrollTop=f.scrollHeight)}}if(e==="documents"){const h=document.getElementById("task-dropzone");if(h&&h.dataset.taskId===$){const f=document.getElementById("task-documents-list");f&&typeof Be=="function"&&(f.innerHTML=Be(y))}}}}return Ws(),!0}return!1}function wt(e="realtime"){xt()&&(Ie&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!s.data||!s.view||(oa&&clearTimeout(oa),oa=setTimeout(async()=>{try{await oe(!0)}catch(a){console.warn("[Realtime] Sync error:",String(e),a.message)}},Bs)))}function ka(e,a,n,o={}){e&&e.readyState===WebSocket.OPEN&&(Dn++,e.send(JSON.stringify({topic:a,event:n,payload:o,ref:String(Dn)})))}function Gs(e){nn(),Ot=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&ka(e,"phoenix","heartbeat")},Us)}function nn(){Ot&&(clearInterval(Ot),Ot=null)}function Ai(e="disconnect"){if(xa=!0,nn(),Ze&&(clearTimeout(Ze),Ze=null),ge){try{ge.close(1e3,e)}catch{}ge=null}}function Aa(e="idle"){Ie||(Ie=!0,Ai(e))}function Sa(e="wake_up"){const a=Ie;Ie=!1,xt()&&(typeof navigator<"u"&&!navigator.onLine||((!ge||ge.readyState===WebSocket.CLOSED||ge.readyState===WebSocket.CLOSING)&&sn(),(a||e==="tab_visible")&&wt(e)))}function sn(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&xt()&&!Ie&&!(ge&&(ge.readyState===WebSocket.CONNECTING||ge.readyState===WebSocket.OPEN))){xa=!1;try{const e=new WebSocket(Rs);ge=e,e.onopen=()=>{ft=0,Gs(e),ka(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(a=>{ka(e,`realtime:public:${a}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:a}]}})})},e.onmessage=a=>{try{const{event:n,topic:o,payload:r}=JSON.parse(a.data);if(n==="phx_reply"||n==="phx_close")return;if(n==="postgres_changes"&&r?.data){const{table:i,type:d,record:l,old_record:p}=r.data;if(Rt(i,d,l,p))return}if((n==="INSERT"||n==="UPDATE"||n==="DELETE")&&o?.startsWith("realtime:public:")){const i=o.split(":")[2];if(Rt(i,n,r?.record||r?.new,r?.old_record||r?.old))return}if(o==="realtime:darc_live"&&(n==="broadcast"||n==="STATE_MUTATION"||n==="GRANULAR_DELTA")){const i=r?.payload||r,d=i?.mutationId||i?.id||i?.entityId;if(d&&he.has(d))return;if(i?.delta){const{table:l,action:p,record:u,oldRecord:m}=i.delta;if(Rt(l,p,u,m))return}wt("edge_broadcast");return}(n==="broadcast"||o==="realtime:darc_live"||typeof o=="string"&&o.startsWith("realtime:public:"))&&wt("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=a=>{if(nn(),ge=null,!(xa||!xt()||Ie)&&!(a?.reason==="logout"||a?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){ft++;const n=Math.min(3e4,Math.pow(2,Math.min(ft,5))*1e3);Ze&&clearTimeout(Ze),Ze=setTimeout(()=>{sn()},n)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function _n(){const e=Date.now();e-wa>1e4&&(wa=e,an=e,Ie&&(typeof document>"u"||!document.hidden)&&Sa("user_active"))}function Js(){ra&&clearInterval(ra),ra=setInterval(()=>{const e=Date.now();for(const[a,n]of he.entries())e-n>8e3&&he.delete(a);Ie||typeof document<"u"&&document.hidden||Date.now()-an>=Ns&&Aa("inactivity_idle")},6e4)}function Vs(){if(!jn){if(jn=!0,xt()&&sn(),Js(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,_n,{passive:!0})}),window.addEventListener("mousemove",_n,{passive:!0})),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden?(Ge&&clearTimeout(Ge),Ge=setTimeout(()=>{Aa("tab_hidden")},Fs)):(Ge&&(clearTimeout(Ge),Ge=null),an=Date.now(),wa=Date.now(),Sa("tab_visible"))}),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=a=>{if(a.data?.type==="GRANULAR_DELTA"&&a.data.delta){const{table:n,action:o,record:r,oldRecord:i}=a.data.delta;Rt(n,o,r,i)}else a.data?.type==="STATE_MUTATION"&&wt("broadcast_channel")},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{s.isOffline=!1,ft=0;const e=window.api,a=typeof window.choose=="function"?window.choose:(o=>o),n=typeof window.showToast=="function"?window.showToast:console.log;if(Sa("online"),e){const o=await Ma(e);o&&o.synced>0?n(a(`تمت استعادة الاتصال ومزامنة ${o.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${o.synced} pending actions successfully! 🚀`),!1):n(a("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}wt("online")}),window.addEventListener("offline",()=>{if(s.isOffline=!0,ft=0,Aa("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function Ks(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now()})}catch{}}typeof window<"u"&&(window.notifyStateMutation=Ks,window.disconnectSupabaseRealtime=Ai,window.recordRecentLocalMutation=Hs,window.recalculateProjectProgressInMemory=ut);var Ys=ce({getOrCreateFloatingUploadWidget:()=>Si,handleChange:()=>ja,handleClick:()=>Ta,handleInput:()=>Ia,handleSubmit:()=>Ea,init:()=>Ti,updateFloatingUploadWidget:()=>Ke,uploadDirectFiles:()=>Ei,uploadTaskFiles:()=>on});async function Ea(e){const a=e.target;if(!["project-form","task-form","user-form","role-form","activation-form","task-comment-form","template-form","force-password-form"].includes(a.id)&&!a.dataset.action)return;e.preventDefault();const n=Object.fromEntries(new FormData(a).entries()),o=a.querySelector('button[type="submit"]');o&&(o.disabled=!0,o.classList.add("is-loading"));try{if(a.id==="activation-form"){if(n.password!==n.passwordConfirm)throw new Error(t("كلمتا المرور غير متطابقتين.","Passwords do not match."));if(delete n.passwordConfirm,await D("/api/auth/activate",{method:"POST",body:JSON.stringify(n)}),window.history.replaceState({},"",window.location.pathname),At(),await oe(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}G();return}if(a.id==="project-form"){n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.managerId||(n.managerId=null);let r=[];try{n.memberIds&&(r=JSON.parse(n.memberIds))}catch{}n.managerId&&!r.includes(n.managerId)&&r.push(n.managerId),n.memberIds=r;const i=!!a.dataset.projectId,d=await D(i?`/api/projects/${a.dataset.projectId}`:"/api/projects",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.project)if(s.data.projects||(s.data.projects=[]),i){const l=s.data.projects.findIndex(p=>p.id===d.project.id);l!==-1&&(s.data.projects[l]={...s.data.projects[l],...d.project})}else s.data.projects.unshift(d.project);K(),C(),k(t("تم حفظ المشروع.","Project saved."));return}if(a.id==="task-form"){const r=a.dataset.taskId;n.remindAt,delete n.remindAt,n.templateId=n.templateId||null,n.typeAr=n.typeAr||(n.templateId?"مخطط":null),n.typeEn=n.typeEn||(n.templateId?"Drawing":null),n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.assigneeId||(n.assigneeId=null),n.reviewerId||(n.reviewerId=null);let i=[];try{i=JSON.parse(n.additionalAssignees||"[]")}catch{i=[...a.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(v=>v.value)}let d=[];try{d=JSON.parse(n.externalAssignees||"[]")}catch{const v=String(n.externalAssignees||"").trim();d=v?v.split(/[,،]+/).map($=>$.trim()).filter(Boolean):[]}let l=[];try{l=JSON.parse(n.remindersJson||"[]")}catch{l=[]}delete n.additionalAssignees,delete n.externalAssignees,delete n.remindersJson,delete n.dependencies,delete n.weight,delete n.progress,n.customFields={additional_assignees:i,external_assignees:d,reminders:l},n.projectId||(n.projectId=s.activeProjectId||s.data.projects?.[0]?.id);const p=!!r;if(p){const m=(s.data?.tasks||[]).find(v=>v.id===r);m?.updatedAt&&(n.expectedUpdatedAt=m.updatedAt)}let u;try{u=await D(p?`/api/tasks/${r}`:"/api/tasks",{method:p?"PATCH":"POST",body:JSON.stringify(n)})}catch(m){if(m.message&&m.message.includes("تعارض")){await ee(!0),k(m.message,!0);return}throw m}if(u.task){if(s.data.tasks||(s.data.tasks=[]),p){const m=s.data.tasks.findIndex(v=>v.id===u.task.id);m!==-1&&(s.data.tasks[m]={...s.data.tasks[m],...u.task})}else s.data.tasks.unshift(u.task),s.view==="tasks"&&(s.taskProjectFilter!=="all"&&s.taskProjectFilter!==u.task.projectId&&(s.taskProjectFilter=u.task.projectId),s.taskFilter==="mine"&&u.task.assigneeId!==s.data.user?.id&&(s.taskFilter="all"));if(Array.isArray(l)&&l.length>0){for(const m of l)if(!m.id||m.id.startsWith("rem_temp_")){const v=m.remindAt?new Date(m.remindAt):null;if(!v||isNaN(v.getTime()))continue;D("/api/reminders",{method:"POST",body:JSON.stringify({taskId:u.task.id,remindAt:v.toISOString(),noteAr:m.noteAr||n.titleAr||"تذكير لمتابعة المهمة"})}).catch($=>console.warn("[Reminder dispatch note]",$))}}}K(),C(),k(t("تم حفظ المهمة بنجاح.","Task saved successfully."));return}if(a.id==="task-comment-form"){const r=a.dataset.taskId,i=await D(`/api/tasks/${r}/comments`,{method:"POST",body:JSON.stringify(n)});a.reset(),i.comment&&(s.data.comments||(s.data.comments=[]),s.data.comments.push(i.comment));const d=s.data.tasks.find(p=>p.id===r),l=document.getElementById("task-comments-list");l&&(l.innerHTML=renderTaskComments(d),l.scrollTop=l.scrollHeight),o&&(o.disabled=!1);return}if(a.id==="force-password-form"){if(!_()&&!S("manage_users"))throw new Error(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."));const r=a.dataset.userId,i=a.dataset.isPending==="true";await D(`/api/users/${r}/force-password`,{method:"POST",body:JSON.stringify(n)});const d=s.data.users.find(l=>l.id===r);d&&(d.status="active"),K(),C(),k(i?t("تم تفعيل الحساب بنجاح.","Account activated successfully."):t("تم تغيير كلمة المرور وطرد المستخدم بنجاح.","Password changed and user kicked successfully.")),o&&(o.disabled=!1);return}if(a.id==="user-form"){const r=a.dataset.userId,i=!!r;if(!i&&!_()&&!S("manage_users"))throw new Error(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."));if(i&&!_()&&!S("manage_users")&&!S("manage_existing_account_permissions"))throw new Error(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."));const d=await D(i?`/api/users/${r}`:"/api/users",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.user)if(s.data.users||(s.data.users=[]),i){const l=s.data.users.findIndex(p=>p.id===d.user.id);l!==-1&&(s.data.users[l]={...s.data.users[l],...d.user})}else s.data.users.unshift(d.user);K(),C(),k(t("تم حفظ حساب العضو.","Member account saved."));return}if(a.id==="role-form"){if(!_()&&!S("manage_roles"))throw new Error(t("غير مصرح لك بإدارة وتعديل الأدوار.","Permission denied to manage roles."));const r=a.dataset.roleId,i=[...a.querySelectorAll('input[name="permissions"]:checked')].map(p=>p.value),d=!!r,l=await D(d?`/api/roles/${r}`:"/api/roles",{method:d?"PATCH":"POST",body:JSON.stringify({...n,permissions:i})});if(l.role)if(s.data.roles||(s.data.roles=[]),d){const p=s.data.roles.findIndex(u=>u.id===l.role.id);p!==-1&&(s.data.roles[p]={...s.data.roles[p],...l.role})}else s.data.roles.push(l.role);K(),C(),k(t("تم حفظ الدور بنجاح.","Role saved."));return}if(a.id==="template-form"){const r=a.dataset.templateId,i=!!r,d=await D(i?`/api/templates/${r}`:"/api/templates",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.template)if(s.data.templates||(s.data.templates=[]),i){const l=s.data.templates.findIndex(p=>p.id===d.template.id);l!==-1&&(s.data.templates[l]={...s.data.templates[l],...d.template})}else s.data.templates.push(d.template);K(),C(),k(t("تم حفظ القالب بنجاح.","Template saved."));return}if(a.dataset.action==="update-profile"){if(n.calendarSystem){s.calendarSystem=n.calendarSystem;try{localStorage.setItem("darc_calendar_system",n.calendarSystem)}catch{}}const r=await D("/api/users/me",{method:"PATCH",body:JSON.stringify(n)});if(r.user){s.data.user={...s.data.user,...r.user};const i=(s.data.users||[]).findIndex(d=>d.id===s.data.user.id);i!==-1&&(s.data.users[i]={...s.data.users[i],...r.user})}C(),k(t("تم حفظ وتحديث الملف الشخصي بنجاح.","Profile updated successfully.")),o&&(o.disabled=!1);return}if(a.dataset.action==="update-company"){if(!_()&&!S("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات الشركة.","Permission denied to update company settings."));const r=await D("/api/company",{method:"PATCH",body:JSON.stringify(n)});r.company&&(s.data.company={...s.data.company,...r.company}),C(),k(t("تم تحديث بيانات الشركة.","Company data updated.")),o&&(o.disabled=!1);return}if(a.dataset.action==="update-whatsapp"){if(!_()&&!S("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات التنبيهات.","Permission denied to update alert settings."));const r={enabled:a.querySelector('input[name="enabled"]')?.checked||!1,provider:n.provider||"evolution",instanceName:n.instanceName||"darc-workspace",serverUrl:n.serverUrl||"",apiKey:n.apiKey||"",recipient:n.recipient||"",notifyOnBlocked:a.querySelector('input[name="notifyOnBlocked"]')?.checked||!1,notifyOnApproval:a.querySelector('input[name="notifyOnApproval"]')?.checked||!1,notifyOnDrawing:a.querySelector('input[name="notifyOnDrawing"]')?.checked||!1,notifyOnCollectiveMention:a.querySelector('input[name="notifyOnCollectiveMention"]')?.checked!==!1,sendGroupBroadcast:a.querySelector('input[name="sendGroupBroadcast"]')?.checked||!1},i=await D("/api/whatsapp/config",{method:"POST",body:JSON.stringify({config:r})});i.config&&(s.data.company||(s.data.company={}),s.data.company.customFields||(s.data.company.customFields={}),s.data.company.customFields.whatsapp=i.config,s.data.company.custom_fields&&(s.data.company.custom_fields.whatsapp=i.config)),k(t("تم حفظ إعدادات تنبيهات واتساب بنجاح ✅","WhatsApp alert settings saved successfully ✅")),C(),o&&(o.disabled=!1);return}if(a.dataset.action==="change-password"){if(n.newPassword.length<10)throw new Error(t("كلمة المرور يجب أن تكون 10 أحرف على الأقل.","Password must be at least 10 characters."));await D("/api/auth/change-password",{method:"POST",body:JSON.stringify(n)}),a.reset(),k(t("تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.","Password changed successfully. Signed out of other devices.")),o&&(o.disabled=!1);return}}catch(r){a.id==="activation-form"?Tt(n.token,r.message):k(r.message,!0)}finally{o&&(o.disabled=!1,o.classList.remove("is-loading"))}}async function Ta(e){const a=document.getElementById("mention-dropdown"),n=document.getElementById("project-menu");if(a&&!e.target.closest("#mention-dropdown")&&!e.target.closest('input[name="content"]')&&(a.style.display="none"),n&&!e.target.closest("#project-menu")&&!e.target.closest('[data-action="toggle-project-menu"]')&&(n.style.display="none"),e.target.classList.contains("modal-backdrop")){K();return}if(e.target.closest("#task-dropzone")&&e.target.id!=="task-upload-input"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}const o=e.target.closest("[data-action], [data-view]");if(!o)return;const r=o.dataset.action;if(r==="test-whatsapp"){const i=o.closest('[data-action="test-whatsapp"]');i&&(i.disabled=!0),k(t("جاري إرسال تنبيه تجريبي للواتساب...","Sending test WhatsApp alert..."));try{const d=document.querySelector('input[name="serverUrl"]')?.value||"",l=document.querySelector('input[name="apiKey"]')?.value||"",p=document.querySelector('input[name="recipient"]')?.value||"",u=document.querySelector('input[name="instanceName"]')?.value||"darc-workspace",m=document.querySelector('select[name="provider"]')?.value||"evolution",v=await D("/api/whatsapp/test",{method:"POST",body:JSON.stringify({config:{serverUrl:d,apiKey:l,recipient:p,instanceName:u,provider:m}})});k(v.message||t("تم إرسال الرسالة بنجاح! 🚀","Test message sent successfully! 🚀"))}catch(d){k(d.message||t("فشل إرسال رسالة الاختبار، تحقق من صحة البيانات.","Failed to send test alert."),!0)}finally{i&&(i.disabled=!1)}return}if(o.classList.contains("menu-item")){const i=o.closest(".dropdown-menu");i&&(i.style.display="none")}if(o.dataset.view){me(o.dataset.view,o.dataset.projectId||void 0);return}if(r==="trigger-avatar-upload"){const i=document.getElementById("user-avatar-file-input");i&&i.click();return}if(r==="trigger-company-logo-upload"){if(!_()&&!S("manage_settings")){k(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0);return}const i=document.getElementById("company-logo-file-input");i&&i.click();return}if(r==="toggle-theme"){s.theme=s.theme==="dark"?"light":"dark",vt({theme:s.theme}),document.documentElement.dataset.theme=s.theme,document.querySelectorAll('[data-action="toggle-theme"]').forEach(i=>{i.textContent=s.theme==="dark"?"☀️":"🌙"});return}if(r==="toggle-lang"){if(s.lang=s.lang==="ar"?"en":"ar",vt({lang:s.lang}),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.body.classList.toggle("is-ltr",s.lang==="en"),s.data?.user||typeof localStorage<"u"&&localStorage.getItem("darc_token"))G();else{const i=new URLSearchParams(window.location.hash.replace(/^#/,""));if(i.get("activate"))Tt(i.get("activate"));else if(i.get("reset"))at(i.get("reset"));else{const d=document.getElementById("login-email")?.value||"",l=document.getElementById("login-password")?.value||"",p=!!document.getElementById("forgot-form");if(fe("",p?"forgot":"login"),d){const u=document.getElementById("login-email");u&&(u.value=d)}if(l){const u=document.getElementById("login-password");u&&(u.value=l)}}}return}if(r==="quick-fill-login"){const i=o.closest('[data-action="quick-fill-login"]'),d=document.getElementById("login-email"),l=document.getElementById("login-password"),p=i?.dataset?.email||"demo@darc-design.bond",u=i?.dataset?.pass||"demo123456";if(d&&(d.value=p,d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),l&&(l.value=u,l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),i?.dataset?.autosubmit==="true"){const m=document.getElementById("login-form");m&&(typeof m.requestSubmit=="function"?m.requestSubmit():m.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0})))}return}if(r==="goto-forgot"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#forgot"),fe("","forgot");return}if(r==="goto-login"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#login"),fe();return}if(r==="reset-demo-sandbox"){try{k(t("جاري إعادة ضبط بيانات العرض التجريبي...","Resetting demo sandbox..."),!1);const i=await D("/api/demo/reset",{method:"POST"});i&&i.data&&(s.data=i.data,ue(i.data),G(),k(t("تمت إعادة ضبط البيانات بنجاح ✨","Demo data reset successfully ✨"),!1))}catch(i){k(i.message,!0)}return}if(r==="toggle-sidebar"){s.sidebarOpen=!s.sidebarOpen,document.querySelector(".sidebar")?.classList.toggle("open",s.sidebarOpen);return}if(r==="logout"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout"),await D("/api/auth/logout",{method:"POST"}).catch(()=>{});try{await wn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_queue")}catch{}}tt(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),fe();return}if(r==="logout-all"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout_all"),await D("/api/auth/logout-all",{method:"POST"}).catch(()=>{});try{await wn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_queue")}catch{}}tt(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),fe();return}if(r==="open-omnisearch"){xi();return}if(r==="close-omnisearch"){Ue();return}if(r==="open-cheatsheet"){tn();return}if(r==="close-modal"){K();return}if(r==="show-notifications"){showNotifications();return}if(r==="delete-notification"){e.stopPropagation();const i=o.dataset.notificationId||o.closest("[data-notification-id]")?.dataset.notificationId;if(!i)return;s.data?.notifications&&(s.data.notifications=s.data.notifications.filter(d=>d.id!==i)),showNotifications(),G(),D(`/api/notifications/${encodeURIComponent(i)}`,{method:"DELETE"}).catch(d=>{console.warn("[Notifications] Failed to delete notification:",d)});return}if(r==="clear-read-notifications"){if(e.stopPropagation(),!(s.data?.notifications||[]).filter(i=>i.read||i.readAt).length)return;s.data?.notifications&&(s.data.notifications=s.data.notifications.filter(i=>!i.read&&!i.readAt)),showNotifications(),G(),k(t("تم مسح التنبيهات المقروءة بنجاح.","Read notifications cleared successfully.")),D("/api/notifications/clear-read",{method:"POST"}).catch(i=>{console.warn("[Notifications] Failed to clear read notifications:",i)});return}if(r==="enable-browser-notifications"){e.stopPropagation(),typeof window<"u"&&"Notification"in window?Notification.requestPermission().then(i=>{if(i==="granted"){k(t("تم تفعيل إشعارات المتصفح بنجاح! 🔔","Desktop browser notifications enabled! 🔔"));try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("إشعارات المتصفح الفورية تعمل بنجاح الآن على هذا الجهاز.","Browser notifications are now working on this device."),icon:"/favicon.ico"})}catch{}}else i==="denied"&&k(t("تم رفض الإشعارات من إعدادات المتصفح.","Notifications are blocked in browser settings."),!0);showNotifications()}):k(t("متصفحك لا يدعم إشعارات الويب المباشرة.","Your browser does not support web notifications."),!0);return}if(r==="send-test-notification"){e.stopPropagation(),k(t("جاري إرسال إشعار تجريبي من السيرفر...","Sending test notification from server...")),D("/api/notifications/test",{method:"POST",body:JSON.stringify({messageAr:"إشعار فحص النظام المباشر — السيرفر والربط اللحظي يعملان بكفاءة 🚀",messageEn:"Live System Test — Backend and Realtime are operating smoothly 🚀"})}).then(i=>{k(t("تم إرسال الإشعار من السيرفر بنجاح! 🔔","Test notification dispatched from server! 🔔")),$a(),i&&i.notification&&(s.data.notifications||(s.data.notifications=[]),s.data.notifications.unshift(i.notification),showNotifications(),G())}).catch(i=>{k(i.message||t("فشل إرسال الإشعار التجريبي","Failed to send test notification"),!0)});return}if(r==="play-test-chime"){e.stopPropagation(),$a(),k(t("تم تشغيل النغمة التنبيهية 🔔","Notification chime played 🔔"));return}if(r==="test-browser-notification"){if(e.stopPropagation(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("هذا اختبار لإشعار سطح المكتب والمتصفح — يعمل بنجاح! 🚀","This is a test desktop notification — working perfectly! 🚀"),icon:"/favicon.ico"}),k(t("تم إرسال إشعار المتصفح لسطح المكتب!","Desktop notification dispatched!"))}catch(i){k(i.message,!0)}else k(t("إشعارات المتصفح غير مفعلة بعد.","Browser notifications not yet enabled."),!0);return}if(r==="read-notification"){if(o.dataset.action==="delete-notification"||o.closest('[data-action="delete-notification"]'))return;const i=o.dataset.notificationId||o.closest("[data-notification-id]")?.dataset.notificationId,d=(s.data?.notifications||[]).find(v=>v.id===i);d&&(d.read=!0,d.readAt=new Date().toISOString()),G(),i&&D(`/api/notifications/${i}`,{method:"PATCH",body:JSON.stringify({})}).catch(v=>{console.warn("[Notifications] Failed to patch read status in background:",v)}),K(!0);const l=o.dataset.taskId||d?.taskId,p=o.dataset.documentId||d?.documentId,u=o.dataset.projectId||d?.projectId,m=o.dataset.type||d?.type;if(p){ma(p);return}if(l){let v=(s.data?.tasks||[]).find($=>$.id===l);if(v){v.projectId&&(s.activeProjectId=v.projectId),openTaskModal(v);return}try{const $=await D(`/api/tasks/${l}`);if($&&$.id){s.data.tasks||(s.data.tasks=[]),s.data.tasks.push($),$.projectId&&(s.activeProjectId=$.projectId),openTaskModal($);return}}catch($){console.warn("[Notifications] Failed to fetch task on demand:",$)}}if(m==="document_review"&&u){s.activeProjectId=u,s.projectTab="drawings",me("project-detail",u);return}if(u){s.activeProjectId=u,me("project-detail",u);return}await ee();return}if(r==="mark-all-notifications-read"){try{await D("/api/notifications/read-all",{method:"POST"}),(s.data?.notifications||[]).forEach(i=>{i.read=!0,i.readAt=new Date().toISOString()}),showNotifications(),G(),k(t("تم تحديد كافة التنبيهات كمقروءة.","All notifications marked as read."))}catch(i){k(i.message,!0)}return}if(r==="toggle-project-menu"){n&&(n.style.display=n.style.display==="none"?"block":"none");return}if(r==="preview-doc"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId;i&&ma(i);return}if(r==="copy-doc-link"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId,d=s.data?.documents?.find(l=>l.id===i);if(d){let l=d.viewLink||d.downloadLink||(d.driveFileId?`https://drive.google.com/file/d/${d.driveFileId}/view`:"");if((!l||l.startsWith("file://")||l.startsWith("/"))&&(l=`${window.location.origin}/api/documents/${d.id}`),l)try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(l);else{const p=document.createElement("textarea");p.value=l,document.body.appendChild(p),p.select(),document.execCommand("copy"),p.remove()}k(t("تم نسخ رابط الملف إلى الحافظة بنجاح.","Document link copied to clipboard."))}catch{window.prompt(t("انسخ رابط الملف من هنا:","Copy document link:"),l)}else k(t("لا يوجد رابط متاح لهذا الملف.","No link available for this document."),!0)}return}if(r==="trigger-upload"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}if(r==="open-upload-drawing-modal"){typeof openUploadDrawingModal=="function"?openUploadDrawingModal(o.dataset.projectId||null):typeof window.openUploadDrawingModal=="function"&&window.openUploadDrawingModal(o.dataset.projectId||null);return}if(r==="new-project"){openProjectModal();return}if(r==="edit-project"){const i=s.data.projects.find(d=>d.id===o.dataset.projectId);i&&openProjectModal(i);return}if(r==="clone-project"){const i=s.data.projects.find(d=>d.id===o.dataset.projectId);i&&openCloneModal(i);return}if(r==="rename-doc"){const i=o.dataset.docId,d=s.data?.documents?.find(p=>p.id===i);if(!d)return;const l=window.prompt(t("أدخل الاسم الجديد:","Enter new name:"),d.originalName);if(!l||l===d.originalName)return;try{await D(`/api/documents/${i}`,{method:"PATCH",body:JSON.stringify({originalName:l})}),d.originalName=l,await ee(!0);const p=s.data?.tasks?.find(u=>u.id===d.taskId);if(p){const u=document.getElementById("task-documents-list");u&&(u.innerHTML=Be(p))}}catch(p){k(p.message,!0)}return}if(r==="go-to-trash"){s.settingsSection="trash",s.trashLoaded=!1,me("settings");return}if(r==="delete-doc"){if(!window.confirm(t("هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.","Are you sure you want to move this document to trash? You can restore it within 30 days.")))return;const i=o.dataset.docId,d=s.data?.documents?.find(l=>l.id===i)?.taskId;try{if(await D(`/api/documents/${i}`,{method:"DELETE"}),s.data?.documents&&(s.data.documents=s.data.documents.filter(l=>l.id!==i)),s.trashLoaded=!1,await ee(!0),k(t("تم نقل المستند إلى سلة المهملات بنجاح.","Document moved to trash successfully.")),d){const l=s.data?.tasks?.find(p=>p.id===d);if(l){const p=document.getElementById("task-documents-list");p&&(p.innerHTML=Be(l))}}}catch(l){k(l.message,!0)}return}if(r==="delete-project"){if(!window.confirm(t("هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.","Are you sure you want to delete this project? It will be archived.")))return;const i=[...s.data.projects||[]];s.data.projects=s.data.projects.filter(d=>d.id!==o.dataset.projectId),K(),me("projects"),k(t("جاري حذف المشروع...","Deleting project..."));try{await D(`/api/projects/${o.dataset.projectId}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await ee(!0),k(t("تم حذف المشروع بنجاح.","Project deleted successfully."))}catch(d){s.data.projects=i,C(),k(d.message,!0)}return}if(r==="delete-task"){if(!window.confirm(t("هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.","Are you sure you want to delete this task? It will be moved to trash.")))return;const i=o.dataset.taskId,d=[...s.data.tasks||[]];s.data.tasks=s.data.tasks.filter(l=>l.id!==i),K(),C(),k(t("جاري حذف المهمة...","Deleting task..."));try{await D(`/api/tasks/${i}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await ee(!0),k(t("تم حذف المهمة بنجاح.","Task deleted successfully."))}catch(l){s.data.tasks=d,C(),k(l.message,!0)}return}if(r==="edit-task-comment"){const i=o.dataset.commentId,d=o.dataset.taskId,l=(s.data.comments||[]).find(m=>m.id===i);if(!l)return;const p=window.prompt(t("تعديل التعليق:","Edit comment:"),l.content);if(p===null)return;const u=p.trim();if(!u){k(t("لا يمكن ترك التعليق فارغاً.","Comment cannot be empty."),!0);return}if(u===l.content)return;try{const m=await D(`/api/tasks/${d}/comments/${i}`,{method:"PATCH",body:JSON.stringify({content:u})});if(m.comment){const v=(s.data.comments||[]).findIndex(h=>h.id===i);v!==-1&&(s.data.comments[v]=m.comment);const $=(s.data.tasks||[]).find(h=>h.id===d),y=document.getElementById("task-comments-list");y&&$&&(y.innerHTML=renderTaskComments($)),k(t("تم تعديل التعليق بنجاح.","Comment updated successfully."))}}catch(m){k(m.message,!0)}return}if(r==="delete-task-comment"){const i=o.dataset.commentId,d=o.dataset.taskId;if(!window.confirm(t("هل أنت متأكد من حذف هذا التعليق؟","Are you sure you want to delete this comment?")))return;try{await D(`/api/tasks/${d}/comments/${i}`,{method:"DELETE"}),s.data.comments&&(s.data.comments=s.data.comments.filter(u=>u.id!==i));const l=(s.data.tasks||[]).find(u=>u.id===d),p=document.getElementById("task-comments-list");p&&l&&(p.innerHTML=renderTaskComments(l)),k(t("تم حذف التعليق بنجاح.","Comment deleted successfully."))}catch(l){k(l.message,!0)}return}if(r==="manual-sync"){if(typeof navigator<"u"&&!navigator.onLine){k(t("أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡","You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡"),!1);return}const i=kt();if(!i.length){k(t("جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️","All data is completely synchronized with cloud server ✔️"),!1);return}k(t(`جاري مزامنة ${i.length} عمليات معلقة مع السيرفر...`,`Syncing ${i.length} pending actions with server...`),!1);const d=await Ma(D);if(d.synced>0){if(k(t(`تمت مزامنة ${d.synced} عمليات بنجاح! 🚀`,`Successfully synced ${d.synced} actions! 🚀`),!1),await oe(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}}else d.failed>0&&k(t(`فشلت مزامنة ${d.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${d.failed} actions, please try again.`),!0);return}if(r==="new-task"){openTaskModal(null,null,o.dataset.projectId);return}if(r==="new-user"){if(!_()&&!S("manage_users")){k(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."),!0);return}openUserModal();return}if(r==="new-role"){if(!_()&&!S("manage_roles")){k(t("غير مصرح لك بإنشاء أدوار جديدة.","Permission denied to create new roles."),!0);return}openRoleModal();return}if(r==="new-template"){openTemplateModal();return}if(r==="edit-template"){const i=s.data.templates.find(d=>d.id===o.dataset.templateId);i&&openTemplateModal(i);return}if(r==="delete-template"){if(!window.confirm(t("هل أنت متأكد من حذف هذا القالب؟","Are you sure you want to delete this template?")))return;const i=[...s.data.templates||[]];s.data.templates=s.data.templates.filter(d=>d.id!==o.dataset.templateId),C(),K();try{await D(`/api/templates/${o.dataset.templateId}`,{method:"DELETE"}),await ee(!0),k(t("تم حذف القالب.","Template deleted."))}catch(d){s.data.templates=i,C(),k(d.message,!0)}return}if(r==="open-project"){s.projectTab="tasks",s.projectMemberFilter=null,me("project-detail",o.dataset.projectId);return}if(r==="filter-by-member"){const i=o.dataset.memberId;s.projectMemberFilter=s.projectMemberFilter===i?null:i,s.projectTab="tasks",requestAnimationFrame(()=>C());return}if(r==="clear-member-filter"){s.projectMemberFilter=null,requestAnimationFrame(()=>C());return}if(r==="back-to-projects"){s.projectMemberFilter=null,me("projects",null);return}if(r==="project-tab"){s.projectTab=o.dataset.tab;try{if(typeof window<"u"&&s.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(s.activeProjectId)}&tab=${encodeURIComponent(s.projectTab)}`),typeof sessionStorage<"u"){const d=sessionStorage.getItem("darc_last_route"),l=d?JSON.parse(d):{};l.view="project-detail",l.activeProjectId=s.activeProjectId,l.projectTab=s.projectTab,sessionStorage.setItem("darc_last_route",JSON.stringify(l))}}catch{}o.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(d=>d.classList.toggle("active",d===o));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>C());return}if(r==="toggle-timeline-view"){s.timelineView=o.dataset.viewMode||"gantt",requestAnimationFrame(()=>C());return}if(r==="prev-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()-1),s.calendarDate=i,requestAnimationFrame(()=>C());return}if(r==="next-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()+1),s.calendarDate=i,requestAnimationFrame(()=>C());return}if(r==="today-calendar-month"){s.calendarDate=new Date,requestAnimationFrame(()=>C());return}if(r==="open-task"){if(window._isDraggingTask||window._justDroppedAt&&Date.now()-window._justDroppedAt<400)return;const i=o.dataset.taskId||o.closest("[data-task-id]")?.dataset.taskId;if(!i)return;let d=(s.data?.tasks||[]).find(l=>l.id===i);if(d){openTaskModal(d);return}D(`/api/tasks/${i}`).then(l=>{l&&l.id?(s.data.tasks||(s.data.tasks=[]),s.data.tasks.push(l),openTaskModal(l)):k(t("تعذر العثور على المهمة أو تم نقلها لسلة المهملات.","Task not found or was moved to trash."),!0)}).catch(l=>{k(t("تعذر فتح المهمة: "+l.message,"Could not open task: "+l.message),!0)});return}if(r==="task-filter"){s.taskFilter=o.dataset.filter,o.closest(".view-toolbar-start")?.querySelectorAll(".filter-tab").forEach(i=>i.classList.toggle("active",i===o)),requestAnimationFrame(()=>C());return}if(r==="template-category"){s.templateCategory=o.dataset.category,requestAnimationFrame(()=>C());return}if(r==="use-template"){if(!s.data.projects.length)return k(g("noProjects"),!0);openTaskModal(null,o.dataset.templateId,s.activeProjectId);return}if(r==="open-user"){if(!_()&&!S("manage_users")&&!S("manage_existing_account_permissions")){k(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."),!0);return}const i=s.data.users.find(d=>d.id===o.dataset.userId);i&&openUserModal(i);return}if(r==="impersonate-user"){if(!_()){k(t("هذه الصلاحية خاصة بمدير النظام فقط.","Impersonation is restricted to system admin only."),!0);return}if(!window.confirm("هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً."))return;try{const i=await D(`/api/users/${o.dataset.userId}/impersonate`,{method:"POST"});i&&i.token&&typeof localStorage<"u"&&localStorage.setItem("darc_token",i.token),window.location.reload()}catch(i){k(i.message,!0)}return}if(r==="force-password-user"){if(!_()&&!S("manage_users")){k(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."),!0);return}const i=s.data.users.find(d=>d.id===o.dataset.userId);i&&openForcePasswordModal(i);return}if(r==="invite-user"){if(!_()&&!S("manage_users")){k(t("غير مصرح لك بإرسال دعوات للمستخدمين.","Permission denied to invite users."),!0);return}try{const i=await D(`/api/users/${o.dataset.userId}/invite`,{method:"POST"});await ee(),k(i.emailConfigured?t("تم إرسال الدعوة.","Invitation sent."):t("تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.","Invite prepared, but the email provider is not configured."))}catch(i){k(i.message,!0)}return}if(r==="deactivate-user"){if(!_()&&!S("manage_users")){k(t("غير مصرح لك بتعطيل حسابات المستخدمين.","Permission denied to deactivate users."),!0);return}if(!window.confirm(g("confirmDeactivate")))return;const i=o.dataset.userId,d=s.data.users.find(p=>p.id===i),l=d?d.status:null;d&&(d.status="inactive"),C(),K();try{await D(`/api/users/${i}`,{method:"DELETE"}),await ee(!0),k(t("تم تعطيل الحساب.","Account deactivated."))}catch(p){d&&(d.status=l),C(),k(p.message,!0)}return}if(r==="settings-section"){const i=o.dataset.section||"profile";if(!ie(i)){k(t("غير مصرح لك بالوصول لهذا القسم من الإعدادات.","Access denied to this settings section."),!0);return}s.settingsSection=i;try{if(typeof window<"u"&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof sessionStorage<"u"){const d=sessionStorage.getItem("darc_last_route"),l=d?JSON.parse(d):{};l.view="settings",l.settingsSection=s.settingsSection,sessionStorage.setItem("darc_last_route",JSON.stringify(l))}}catch{}o.closest(".settings-nav")?.querySelectorAll(".settings-nav-item").forEach(d=>d.classList.toggle("active",d===o)),s.settingsSection==="analytics"&&zt(!0).then(()=>C()).catch(()=>{}),s.settingsSection==="trash"&&!s.trashLoaded&&D("/api/trash").then(d=>{s.trash=Array.isArray(d)?d:d.trash||[...(d.projects||[]).map(l=>({...l,type:"project"})),...(d.tasks||[]).map(l=>({...l,type:"task"})),...(d.documents||[]).map(l=>({...l,type:"document"}))],s.trashLoaded=!0;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}C()}).catch(d=>console.error(d)),requestAnimationFrame(()=>C());return}if(r==="refresh-analytics"){if(!ie("analytics")){k(t("غير مصرح لك بعرض وتحديث التحليلات والمراقبة.","Permission denied to view and refresh analytics."),!0);return}try{await zt(!0),C(),k(t("تم تحديث مؤشرات التحليلات والمراقبة الحية بنجاح.","Live observability and analytics refreshed successfully."))}catch(i){k(i.message,!0)}return}if(r==="test-anomaly-alert"){if(!_()&&!S("manage_settings")){k(t("غير مصرح لك بإجراء محاكاة التنبيهات.","Permission denied to simulate anomaly alert."),!0);return}try{await D("/api/telemetry/test-anomaly",{method:"POST"}),await zt(!0),await oe(!0),G(),k(t("🚨 تم رصد استهلاك زائد بنجاح وإرسال إشعار فوري لمركز التنبيهات!","🚨 Anomaly detected! Alert notification dispatched to Notification Center!"))}catch(i){k(i.message,!0)}return}if(r==="goto-diagnostics"){if(!_()&&!S("manage_settings")){k(t("غير مصرح لك بالوصول لتشخيص الأعطال.","Permission denied to access diagnostics."),!0);return}s.settingsSection="diagnostics",typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#settings?section=diagnostics"),C();return}if(r==="refresh-diagnostics"){if(!_()&&!S("manage_settings")){k(t("غير مصرح لك بتحديث سجل الأعطال.","Permission denied to refresh diagnostics."),!0);return}try{await Lt(!0),C(),k(t("تم تحديث سجل الأخطاء وتشخيصات المستخدمين بنجاح.","Diagnostics and incidents refreshed successfully."))}catch(i){k(i.message,!0)}return}if(r==="test-incident-simulate"){if(!_()&&!S("manage_settings")){k(t("غير مصرح لك بإجراء محاكاة للأعطال.","Permission denied to simulate error incidents."),!0);return}try{await D("/api/telemetry/test-error",{method:"POST"}),await Lt(!0),await oe(!0),C(),k(t("🚨 تم رصد الخطأ وتوثيق خطوات المستخدم وإرسال بريد تنبيه للإدارة بنجاح!","🚨 Incident recorded with stack trace and alert email sent to admin!"))}catch(i){k(i.message,!0)}return}if(r==="test-diagnostic-email"){if(!_()&&!S("manage_settings")){k(t("غير مصرح لك باختبار إرسال البريد.","Permission denied to test alert email."),!0);return}try{await D("/api/telemetry/test-email",{method:"POST"}),k(t("✉️ تم إرسال رسالة اختبار التنبيهات البريدية للإدارة بنجاح!","✉️ Test alert email dispatched to admin successfully!"))}catch(i){k(i.message,!0)}return}if(r==="filter-diagnostics-user"){const i=o.dataset.userId||"all";Sn(i),C();return}if(r==="clear-diagnostics-user-filter"){Sn("all"),C();return}if(r==="resolve-diagnostic-incident"){if(!_()&&!S("manage_settings")){k(t("غير مصرح لك بمعالجة بلاغات الأعطال.","Permission denied to resolve incidents."),!0);return}const i=o.dataset.incidentId;if(i)try{await D(`/api/telemetry/incidents/${i}/resolve`,{method:"PATCH"}),await Lt(!0),C(),k(t("تم تحديد المشكلة كمعالجة بنجاح ✅","Incident marked as resolved ✅"))}catch(d){k(d.message,!0)}return}if(r==="copy-debug-bundle"){const i=o.dataset.bundle;i&&typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>{k(t("تم نسخ تقرير المشكلة الفني بالكامل للحافظة 📋","Full debug bundle copied to clipboard 📋"))}).catch(()=>{k(t("فشل النسخ التلقائي للحافظة","Failed to copy to clipboard"),!0)});return}if(r==="restore-item"){if(!_()&&!S("manage_trash")){k(t("غير مصرح لك باستعادة العناصر المحذوفة.","Permission denied to restore deleted items."),!0);return}try{await D(`/api/restore/${o.dataset.type}/${o.dataset.id}`,{method:"POST"});const i=await D("/api/trash");s.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(d=>({...d,type:"project"})),...(i.tasks||[]).map(d=>({...d,type:"task"})),...(i.documents||[]).map(d=>({...d,type:"document"}))];try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}await ee(),k(t("تمت الاستعادة بنجاح.","Restored successfully."))}catch(i){k(i.message,!0)}return}if(r==="filter-trash"){if(!_()&&!S("manage_trash"))return;s.trashFilter=o.dataset.filter,requestAnimationFrame(()=>C());return}if(r==="purge-trash-item"){if(!_()&&!S("manage_trash")){k(t("غير مصرح لك بحذف العناصر نهائياً من سلة المهملات.","Permission denied to permanently delete trash items."),!0);return}const i=o.dataset.type,d=o.dataset.id;if(!window.confirm(t("هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.","Are you sure you want to permanently delete this item? This action cannot be undone.")))return;try{await D(`/api/trash/${i}/${d}`,{method:"DELETE"});const l=await D("/api/trash");s.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(p=>({...p,type:"project"})),...(l.tasks||[]).map(p=>({...p,type:"task"})),...(l.documents||[]).map(p=>({...p,type:"document"}))],C(),k(t("تم حذف العنصر نهائياً بنجاح.","Item permanently deleted."))}catch(l){k(l.message,!0)}return}if(r==="empty-trash"){if(!_()&&!S("manage_trash")){k(t("غير مصرح لك بإفراغ سلة المهملات.","Permission denied to empty trash."),!0);return}if(!window.confirm(t("هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.","Are you sure you want to empty the entire recycle bin? All items will be permanently erased.")))return;try{await D("/api/trash/empty",{method:"DELETE"}),s.trash=[],C(),k(t("تم إفراغ سلة المهملات بالكامل بنجاح.","Trash bin emptied successfully."))}catch(i){k(i.message,!0)}return}if(r==="open-role"){if(!_()&&!S("manage_roles")){k(t("غير مصرح لك بتعديل الأدوار والصلاحيات.","Permission denied to modify roles."),!0);return}const i=s.data.roles.find(d=>d.id===o.dataset.roleId);i&&openRoleModal(i);return}if(r==="delete-role"){if(!_()&&!S("manage_roles")){k(t("غير مصرح لك بحذف الأدوار.","Permission denied to delete roles."),!0);return}if(!window.confirm(g("confirmDeleteRole")))return;const i=o.dataset.roleId,d=[...s.data.roles||[]];s.data.roles=s.data.roles.filter(l=>l.id!==i),C(),K();try{await D(`/api/roles/${i}`,{method:"DELETE"}),await ee(!0),k(t("تم حذف الدور.","Role deleted."))}catch(l){s.data.roles=d,C(),k(l.message,!0)}return}if(r==="export-csv"){if(!S("export_reports")&&!_()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}yi();return}if(r==="print-portfolio-pdf"){if(!S("export_reports")&&!_()){k(t("ليس لديك صلاحية لطباعة التقارير.","You do not have permission to print reports."),!0);return}hi();return}if(r==="export-project"){if(!S("export_reports")&&!_()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}bi(o.dataset.projectId);return}if(r==="export-project-pdf"){if(!S("export_reports")&&!_()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}ba(o.dataset.projectId,!1);return}if(r==="export-project-client-pdf"){if(!S("export_reports")&&!_()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}ba(o.dataset.projectId,!0);return}if(r==="export-audit-xls"){if(!S("view_audit_logs")&&!_()){k(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}ri();return}if(r==="print-audit-pdf"){if(!S("view_audit_logs")&&!_()){k(t("ليس لديك صلاحية لطباعة سجل الرقابة.","You do not have permission to print audit logs."),!0);return}di();return}if(r==="load-full-audit"){if(!_()&&!S("view_audit_logs")){k(t("غير مصرح لك باستعراض سجل التدقيق الكامل.","Permission denied to view full audit logs."),!0);return}li();return}if(r==="reset-audit-filters"){s.auditFilterAction="all",s.auditFilterEntity="all",s.auditFilterUser="all",s.auditSearchQuery="",C();return}}var Je=null;function Ia(e){if(e.target.name==="content"&&e.target.closest("#task-comment-form")){const o=e.target.value,r=o.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),i=document.getElementById("mention-dropdown");if(r){const d=r[1].toLowerCase(),l=(s.data?.users||[]).filter(m=>m.status!=="inactive").filter(m=>`${m.name||""} ${m.nameEn||""} ${m.email||""}`.toLowerCase().includes(d)),p=!d||"all".startsWith(d)||"الكل".startsWith(d)||"everyone".startsWith(d)||"الجميع".startsWith(d)||"فريق".startsWith(d);let u="";p&&(u+=`
          <div class="mention-option collective-mention" data-username="all" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--line);background:rgba(20,184,166,0.06);">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--brand-teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">📢</div>
            <div style="display:flex;flex-direction:column;gap:1px;text-align:start;">
              <strong style="font-size:12px;color:var(--brand-teal);">@all · ${t("الكل / الجميع (منشن لكافة الفريق والمدير)","Everyone (Team & Management)")}</strong>
              <span style="font-size:10px;color:var(--muted);">${t("إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة عبر واتساب","Direct WhatsApp alert to all project members & managers")}</span>
            </div>
          </div>
        `),l.length&&(u+=l.map(m=>{const v=(m.name||m.nameEn||m.email||"user").trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${c(v)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${W(m,"avatar-sm")}
              <span style="font-size:12px;">${c(t(m.name,m.nameEn||m.name))}</span>
            </div>
          `}).join("")),u?(i.innerHTML=u,i.style.display="block",i.querySelectorAll(".mention-option").forEach(m=>{m.onclick=()=>{const v=m.dataset.username;e.target.value=o.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${v} `),i.style.display="none",e.target.focus()}})):i.style.display="none"}else i.style.display="none"}if(e.target.dataset.action==="search-trash-input"){s.trashQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(Je),Je=setTimeout(()=>{C();const r=document.querySelector('[data-action="search-trash-input"]');r&&(r.focus(),r.setSelectionRange(o,o))},120);return}if(e.target.dataset.action==="search-audit-input"){s.auditSearchQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(Je),Je=setTimeout(()=>{C();const r=document.querySelector('[data-action="search-audit-input"]');r&&(r.focus(),r.setSelectionRange(o,o))},120);return}const a=e.target.dataset.search||(e.target.dataset.action==="search-documents"?"documents":null);if(!a)return;s.searches[a]=e.target.value;const n=e.target.selectionStart;clearTimeout(Je),Je=setTimeout(()=>{C();const o=document.querySelector(`[data-search="${a}"], [data-action="search-documents"]`);o&&(o.focus(),o.setSelectionRange(n,n))},120)}async function ja(e){if(e.target.dataset.action==="filter-diagnostics-severity"){gs(e.target.value),C();return}if(e.target.dataset.action==="filter-diagnostics-status"){vs(e.target.value),C();return}if(e.target.dataset.action==="change-doc-status"){const a=e.target.dataset.docId,n=e.target.value,o=s.data?.documents?.find(r=>r.id===a);if(!o)return;try{await D(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}),o.status=n,k(t("تم تحديث حالة المخطط بنجاح ✅","Drawing status updated ✅")),await ee(!0)}catch(r){k(r.message,!0)}return}if(e.target.dataset.action==="doc-project-filter"){s.docProjectFilter=e.target.value,C();return}if(e.target.dataset.action==="filter-project-docs-task"){s.docTaskFilter=e.target.value,C();return}if(e.target.dataset.action==="filter-audit-action"){s.auditFilterAction=e.target.value,C();return}if(e.target.dataset.action==="filter-audit-entity"){s.auditFilterEntity=e.target.value,C();return}if(e.target.dataset.action==="filter-audit-user"){s.auditFilterUser=e.target.value,C();return}if(e.target.dataset.action==="sort-project-tasks"||e.target.dataset.action==="sort-my-tasks"){Ha(e.target.value),C();return}if(e.target.name==="templateId"&&e.target.form?.id==="task-form"){const a=e.target.form,n=e.target.value,o=s.data.templates?.find(u=>u.id===n),r=a.querySelector('input[name="titleAr"]'),i=a.querySelector('input[name="titleEn"]'),d=a.querySelector("#task-type-ar"),l=a.querySelector("#task-type-en"),p=a.querySelector('textarea[name="descriptionAr"]');o?(r&&(!r.value||a.dataset.templateSelected==="true")&&(r.value=o.nameAr),i&&(!i.value||a.dataset.templateSelected==="true")&&(i.value=o.nameEn||""),d&&(d.value=o.typeAr||"مخطط"),l&&(l.value=o.typeEn||"Drawing"),p&&(!p.value||a.dataset.templateSelected==="true")&&(p.value=o.descriptionAr||""),a.dataset.templateSelected="true"):(d&&(d.value=""),l&&(l.value=""),delete a.dataset.templateSelected);return}if(e.target.name==="status"&&e.target.form?.id==="task-form"){const a=e.target.form.querySelector("#task-auto-progress-badge");if(a){const n={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];a.textContent=n!==void 0?`(${n}%)`:""}return}if(e.target.dataset.action==="task-project-filter"){s.taskProjectFilter=e.target.value,C();return}if(e.target.dataset.action==="task-priority-filter"){s.taskPriorityFilter=e.target.value,C();return}if(e.target.id==="sort-projects"||e.target.dataset?.action==="sort-projects"){s.projectSort=e.target.value,C();return}if(e.target.id==="task-upload-input"){const a=e.target.files;if(!a.length)return;const n=e.target.dataset.taskId;on(a,n);return}if(e.target.classList.contains("doc-status-select")){const a=e.target.dataset.docId,n=e.target.value;D(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}).then(()=>{ee(!0).then(()=>k(t("تم تحديث حالة المخطط.","Document status updated.")))}).catch(o=>k(o.message,!0));return}if(e.target.id==="user-avatar-file-input"){const a=e.target.files?.[0];if(!a)return;if(a.size>2621440){k(t("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.","Image is too large. Maximum allowed size is 2MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){k(t("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).","Please select a valid image file (JPG, PNG, WebP)."),!0),e.target.value="";return}try{k(t("جاري معالجة ورفع صورتك الشخصية...","Processing & uploading avatar..."));const n=await Pn(a,256,256),o=await D("/api/users/me",{method:"PATCH",body:JSON.stringify({avatarUrl:n})});if(o.user){s.data.user={...s.data.user,...o.user};const r=(s.data.users||[]).findIndex(i=>i.id===s.data.user.id);r!==-1&&(s.data.users[r]={...s.data.users[r],...o.user})}e.target.value="",G(),Bt(),k(t("تم تحديث صورتك الشخصية وتثبيتها بنجاح!","Avatar updated successfully!"))}catch(n){e.target.value="",k(n.message,!0)}return}if(e.target.id==="company-logo-file-input"){if(!_()&&!S("manage_settings")){k(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0),e.target.value="";return}const a=e.target.files?.[0];if(!a)return;if(a.size>3145728){k(t("حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.","Logo is too large. Maximum allowed size is 3MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){k(t("يرجى اختيار ملف صورة أو شعار صالح.","Please select a valid logo image file."),!0),e.target.value="";return}try{k(t("جاري معالجة ورفع شعار الشركة...","Uploading company logo..."));const n=await Pn(a,400,400),o=await D("/api/company",{method:"PATCH",body:JSON.stringify({logoUrl:n})});o.company&&(s.data.company={...s.data.company,...o.company}),e.target.value="",G(),Bt(),k(t("تم تحديث وتثبيت شعار مساحة العمل بنجاح!","Company logo updated successfully!"))}catch(n){e.target.value="",k(n.message,!0)}return}}function Pn(e,a=300,n=300){return new Promise((o,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(t("فشل قراءة ملف الصورة.","Failed to read image file."))),i.onload=()=>{const d=new Image;d.onerror=()=>r(new Error(t("صيغة الصورة تالفة أو غير صالحة.","Corrupted or invalid image format."))),d.onload=()=>{try{const l=d.naturalWidth||d.width,p=d.naturalHeight||d.height;if(l>4096||p>4096||l*p>16e6){r(new Error(t("أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.","Image dimensions too large (Pixel Flood Blocked). Please select a standard image.")));return}let u=l,m=p;if(u>a||m>n){const f=Math.min(a/u,n/m);u=Math.round(u*f),m=Math.round(m*f)}const v=document.createElement("canvas");v.width=u,v.height=m;const $=v.getContext("2d");$.imageSmoothingEnabled=!0,$.imageSmoothingQuality="high",$.drawImage(d,0,0,u,m);let y="image/webp",h=v.toDataURL(y,.82);h.startsWith("data:image/webp")||(y="image/jpeg",h=v.toDataURL(y,.82)),h.length>184320&&(h=v.toDataURL(y,.65)),o(h)}catch{r(new Error(t("تعذر معالجة وضغط الصورة.","Failed to process and compress image.")))}},d.src=i.result},i.readAsDataURL(e)})}function Da({url:e,chunk:a,contentRange:n,headers:o={},onProgress:r}){return new Promise((i,d)=>{const l=new XMLHttpRequest;if(l.open("PUT",e,!0),e.includes("/api/")){l.withCredentials=!0;const p=typeof localStorage<"u"?localStorage.getItem("darc_token"):null;p&&!o.Authorization&&l.setRequestHeader("Authorization",`Bearer ${p}`)}for(const[p,u]of Object.entries(o))l.setRequestHeader(p,u);n&&l.setRequestHeader("Content-Range",n),l.upload&&r&&(l.upload.onprogress=p=>{p.lengthComputable&&r(p.loaded)}),l.onload=()=>{i({status:l.status,ok:l.status>=200&&l.status<300,headers:{get:p=>l.getResponseHeader(p)},responseText:l.responseText,json:()=>{try{return JSON.parse(l.responseText)}catch{return{}}}})},l.onerror=()=>d(new Error("Network connection error")),l.ontimeout=()=>d(new Error("Upload chunk timeout")),l.timeout=18e4,l.send(a)})}async function Xs(e,a){try{const n=await Da({url:e,chunk:new Blob([]),contentRange:`bytes */${a}`});if(n.status===308){const o=n.headers.get("Range");if(o){const r=o.match(/bytes=0-(\d+)/);if(r&&r[1])return parseInt(r[1],10)+1}return 0}if(n.ok)return{completed:!0,data:typeof n.json=="function"?await Promise.resolve(n.json()):{}}}catch{}return null}var Nt=null;function Si({projectName:e,taskName:a,totalFiles:n}){Nt&&(clearTimeout(Nt),Nt=null);let o=document.getElementById("floating-upload-manager");if(o){o.style.opacity="1",o.style.transform="none";const r=o.querySelector("#fum-proj-text"),i=o.querySelector("#fum-task-text");r&&e&&(r.textContent=e),i&&a&&(i.textContent=a)}else{o=document.createElement("div"),o.id="floating-upload-manager",o.setAttribute("dir",s.lang==="ar"?"rtl":"ltr"),o.style.cssText=`
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
    `,document.body.appendChild(o);const r=o.querySelector("#fum-minimize-btn"),i=o.querySelector("#fum-body");r.addEventListener("click",()=>{const d=i.style.display==="none";i.style.display=d?"flex":"none",r.textContent=d?"—":"+"}),o.querySelector("#fum-close-btn").addEventListener("click",()=>{o.remove()})}return o}function Ke({fileName:e,fileIndex:a,totalFiles:n,pct:o,loadedMB:r,fileSizeMB:i,speedMBs:d,etaText:l,statusNote:p,isError:u,isDone:m}){const v=document.getElementById("floating-upload-manager");if(!v)return;const $=v.querySelector("#fum-file-text"),y=v.querySelector("#fum-count-text"),h=v.querySelector("#fum-progress-fill"),f=v.querySelector("#fum-pct-text"),w=v.querySelector("#fum-speed-text"),T=v.querySelector("#fum-eta-text"),I=v.querySelector("#fum-status-badge"),E=v.querySelector("#fum-indicator"),z=v.querySelector("#fum-header-title"),M=v.querySelector("#fum-close-btn");e&&$&&($.textContent=e),y&&a&&n&&(y.textContent=`(${a}/${n})`),h&&typeof o=="number"&&(h.style.width=`${o}%`),f&&typeof o=="number"&&(f.textContent=`${o}%`),w&&r!==void 0&&i!==void 0&&(w.textContent=`${r} / ${i} MB • ${d||"0.0"} MB/s`),T&&l&&(T.textContent=`${t("متبقي:","ETA:")} ${l}`),p&&I?(I.style.display="block",I.textContent=p,I.style.background=u?"var(--red-soft)":"var(--amber-soft)",I.style.color=u?"var(--red)":"var(--amber)",I.style.border=u?"1px solid var(--red)":"1px solid var(--amber)"):!u&&!m&&I&&(I.style.display="none"),m&&(E&&(E.style.background="var(--mint-strong)",E.style.boxShadow="0 0 10px var(--mint-strong)"),z&&(z.textContent=t("اكتمل الرفع بنجاح! ✓","Upload Complete! ✓")),f&&(f.textContent="100%"),h&&(h.style.width="100%"),M&&(M.style.display="inline-block"),I&&(I.style.display="block",I.style.background="var(--mint)",I.style.color="var(--teal-dark)",I.style.border="1px solid var(--mint-strong)",I.textContent=t("تم التوثيق والرفع إلى الخادم بنجاح.","Document saved & uploaded to server.")),Nt=setTimeout(()=>{v&&v.parentNode&&(v.style.opacity="0",v.style.transform="translateY(12px)",setTimeout(()=>v.remove(),300))},4500)),u&&(E&&(E.style.background="var(--red)",E.style.boxShadow="0 0 10px var(--red)"),z&&(z.textContent=t("فشل في الرفع ✕","Upload Failed ✕")),M&&(M.style.display="inline-block"))}async function on(e,a){if(!e||!e.length||!a)return;const n=s.data?.tasks?.find(o=>o.id===a);return Ei({files:e,taskId:a,projectId:n?.projectId,status:"draft",isTaskModal:!0})}async function Ei({files:e,projectId:a=null,taskId:n=null,discipline:o="عام",status:r="draft",isTaskModal:i=!1}){if(!e||!e.length)return;if(typeof navigator<"u"&&!navigator.onLine){k(t("لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.","Cannot upload drawings or files while offline. Please connect to the internet first."),!0);return}const d=n?s.data?.tasks?.find(I=>I.id===n):null,l=a||d?.projectId,p=l?s.data?.projects?.find(I=>I.id===l):null,u=s.data?.documents?s.data.documents.filter(I=>!I.deletedAt&&(n?I.taskId===n:I.projectId===l)):[],m=p?p.nameAr:"Project",v=d?d.titleAr:o||"General",$={},y=I=>{if($[I])return $[I];let E=0;return u.forEach(z=>{if(z.originalName&&z.originalName.toLowerCase().endsWith(I)){const M=z.originalName.match(/_v(\d+)\./);M&&parseInt(M[1])>E&&(E=parseInt(M[1]))}}),$[I]=E+1,E+1},h=document.getElementById("upload-progress-container");document.getElementById("upload-progress-bar"),document.getElementById("upload-progress-percent"),document.getElementById("upload-progress-text");const f=document.getElementById("task-dropzone");i&&h&&(h.style.display="block"),i&&f&&(f.style.pointerEvents="none"),Si({projectName:m,taskName:v,totalFiles:e.length});let w=null;const T=I=>(I.preventDefault(),I.returnValue=t("جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.","Uploading large engineering files. Leaving will abort upload."),I.returnValue);if(typeof window<"u"&&(window.addEventListener("beforeunload",T),"wakeLock"in navigator))try{navigator.wakeLock.request("screen").then(I=>{w=I}).catch(()=>{})}catch{}try{for(let I=0;I<e.length;I++){const E=e[I];if(!E.size||E.size===0){k(t(`الملف "${E.name}" فارغ لا يحتوي على بيانات.`,`File "${E.name}" is empty.`),!0);continue}if(E.size>107374182400){k(t(`حجم الملف "${E.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${E.name}" exceeds 100GB limit.`),!0);continue}const z=E.name.split(".").pop()?.toLowerCase()||"";if(["exe","bat","cmd","sh","bash","ps1","vbs","js","mjs","cjs","py","php","phtml","html","htm","jar","msi","dll","com","scr","hta","svg","apk"].includes(z)||E.type==="image/svg+xml"){k(t(`صيغة الملف "${E.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${E.name}" is not permitted for security reasons.`),!0);continue}const M=E.name.lastIndexOf("."),b=M!==-1?E.name.substring(M).toLowerCase():"",A=M!==-1?E.name.substring(0,M):E.name,j=je=>(je||"").replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,"-").replace(/\s+/g,"_").trim(),P=`${j(m)||"Project"}_${j(v)||"General"}_${j(A)||"Drawing"}_v${y(b)}${b}`,L=E.size>=1073741824?`${(E.size/1073741824).toFixed(2)} GB`:`${(E.size/1048576).toFixed(1)} MB`;Ke({fileName:E.name,fileIndex:I+1,totalFiles:e.length,pct:0,loadedMB:"0.0",fileSizeMB:L,speedMBs:"0.0",etaText:"...",statusNote:t("بدء جلسة الرفع المستأنف...","Starting resumable session...")});const R=(await D("/api/documents/session",{method:"POST",body:JSON.stringify({compiledName:P,mimeType:E.type||"application/octet-stream",projectId:l,taskId:n,size:E.size})})).sessionUrl;let F=8388608;E.size<=10485760?F=E.size:E.size<=104857600?F=8388608:E.size<=524288e3?F=16777216:E.size<=2147483648?F=33554432:F=67108864;const O=Date.now();let Y=0;const Q=je=>{const pe=Math.min(E.size,Y+je),ze=Math.min(100,Math.round(pe/E.size*100)),De=pe>=1073741824?`${(pe/1073741824).toFixed(2)} GB`:`${(pe/1048576).toFixed(1)} MB`;if(i){const mn=document.getElementById("upload-progress-bar"),fn=document.getElementById("upload-progress-percent"),gn=document.getElementById("upload-progress-text"),vn=document.getElementById("upload-progress-container");vn&&(vn.style.display="block"),mn&&(mn.style.width=`${ze}%`),fn&&(fn.textContent=`${ze}%`);const _i=(Date.now()-O)/1e3,yn=pe/Math.max(_i,.2),Pi=(yn/1048576).toFixed(1),Ci=Math.max(0,E.size-pe),_t=Math.round(Ci/Math.max(yn,1)),Mi=_t<60?`${_t} ${t("ثانية","s")}`:`${Math.floor(_t/60)}:${String(_t%60).padStart(2,"0")} ${t("دقيقة","min")}`;gn&&(gn.textContent=`${t("رفع إلى الخادم","Uploading to server")} (${I+1}/${e.length}): ${E.name} — ${De} / ${L} (${ze}%) • ${Pi} MB/s • ${t("متبقي:","ETA:")} ${Mi}`)}const He=(Date.now()-O)/1e3,ne=pe/Math.max(He,.2),J=(ne/1048576).toFixed(1),we=Math.max(0,E.size-pe),aa=Math.round(we/Math.max(ne,1)),Di=aa<60?`${aa} s`:`${Math.floor(aa/60)}m`;Ke({fileName:E.name,fileIndex:I+1,totalFiles:e.length,pct:ze,loadedMB:De,fileSizeMB:L,speedMBs:J,etaText:Di})};Q(0);let U=0,st=null,ta=!1;for(;U<E.size;){const je=Math.min(U+F,E.size),pe=E.slice(U,je),ze=`bytes ${U}-${je-1}/${E.size}`;let De=0,He=!1;for(;!He&&De<5;)try{let ne;if(!ta)try{ne=await Da({url:R,chunk:pe,contentRange:ze,headers:{},onProgress:J=>Q(J)})}catch(J){console.warn("[Upload] Direct GDrive upload failed, trying backend proxy:",J.message),ta=!0}if(ta){const J={projectId:l,taskId:n,compiledName:P,mimeType:E.type,size:E.size,status:r};ne=await Da({url:`${Xt}/api/documents/chunk`,chunk:pe,contentRange:ze,headers:{"x-session-url":R,"x-doc-meta":encodeURIComponent(JSON.stringify(J))},onProgress:we=>Q(we)})}if(ne.status===308){const J=ne.headers.get("Range");if(J){const we=J.match(/bytes=0-(\d+)/);we&&we[1]?U=parseInt(we[1],10)+1:U=je}else U=je;Y=U,Q(0),He=!0}else if(ne.ok){const J=typeof ne.json=="function"?await Promise.resolve(ne.json()):{};st=J.id||J.document?.id,Y=E.size,Q(0),U=E.size,He=!0;break}else throw new Error(`Upload returned status ${ne.status}`)}catch(ne){if(De++,Ke({fileName:E.name,fileIndex:I+1,totalFiles:e.length,statusNote:`${t("إعادة المحاولة","Retrying")} (${De}/5)...`}),De>=5)throw new Error(`${t("فشل الرفع بعد محاولات متعددة","Upload failed after multiple retries")}: ${ne.message}`);await new Promise(we=>setTimeout(we,1e3*Math.pow(2,De-1)));const J=await Xs(R,E.size);if(typeof J=="number"&&J>U){U=J,Y=U;break}else if(J&&J.completed){st=J.data?.id,U=E.size,He=!0;break}}}st&&!st.startsWith("doc_")&&await D("/api/documents/finalize",{method:"POST",body:JSON.stringify({driveFileId:st,projectId:l,taskId:n,compiledName:P,mimeType:E.type,size:E.size,status:r})})}if(await ee(!0),i&&n){const I=s.data?.tasks?.find(z=>z.id===n),E=document.getElementById("task-documents-list");E&&I&&(E.innerHTML=Be(I))}Bt(),Ke({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),k(t("تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅","Drawing uploaded & registered successfully ✅"))}catch(I){Ke({isError:!0,statusNote:I.message}),k(I.message,!0)}finally{if(typeof window<"u"&&window.removeEventListener("beforeunload",T),w){try{w.release()}catch{}w=null}if(i){const I=document.getElementById("upload-progress-container"),E=document.getElementById("upload-progress-bar"),z=document.getElementById("task-dropzone");I&&(I.style.display="none"),E&&(E.style.width="0%"),z&&(z.style.pointerEvents="auto");const M=document.getElementById("task-upload-input");M&&(M.value="")}}}typeof window<"u"&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener("dragover",e=>{const a=e.target.closest("#task-dropzone");a&&(e.preventDefault(),a.style.borderColor="var(--brand-teal)",a.style.background="var(--teal-soft)")}),document.addEventListener("dragleave",e=>{const a=e.target.closest("#task-dropzone");a&&(a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)")}),document.addEventListener("drop",e=>{const a=e.target.closest("#task-dropzone");if(a){e.preventDefault(),a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)";const n=a.dataset.taskId,o=e.dataTransfer?.files;o&&o.length&&on(o,n)}}));async function Ti(){vt({theme:s.theme,lang:s.lang});try{s.calendarSystem=localStorage.getItem("darc_calendar_system")||s.calendarSystem||"gregorian"}catch{}if(typeof window<"u"&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",i=>{try{if(!localStorage.getItem("darc-theme")){s.theme=i.matches?"dark":"light",document.documentElement.dataset.theme=s.theme;const d=document.querySelector('[data-action="toggle-theme"]');d&&(d.textContent=s.theme==="dark"?"☀️":"🌙")}}catch{}})}catch{}}const e=typeof window<"u"?window.location.hash.replace(/^#/,""):"",a=new URLSearchParams(e.includes("?")?e.split("?")[1]:e.includes("=")?e:""),n=a.get("activate");if(n)return Tt(n);const o=a.get("reset");if(o)return at(o);if(e==="forgot")return fe("","forgot");if(e==="login")return fe();try{if(e){const[i,d]=e.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)&&(s.view=i,d)){const l=new URLSearchParams(d);l.get("id")&&(s.activeProjectId=l.get("id")),l.get("tab")&&(s.projectTab=l.get("tab")),l.get("section")&&(s.settingsSection=l.get("section"))}}else if(typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route");if(i){const d=JSON.parse(i);d.view&&(s.view=d.view),d.activeProjectId&&(s.activeProjectId=d.activeProjectId),d.projectTab&&(s.projectTab=d.projectTab),d.settingsSection&&(s.settingsSection=d.settingsSection)}}}catch{}s.view==="settings"&&!s.settingsSection&&(s.settingsSection="profile");const r=Ca();r&&r.user?(s.data=r,Z(s.view)||(s.view=Te()),G()):At();try{if(typeof navigator<"u"&&navigator.onLine&&kt().length>0&&await Ma(D),await oe(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}if(!window._darcPollingActive){window._darcPollingActive=!0;let i=null,d=0,l=!1,p=Date.now(),u=0;const m=()=>{const y=Date.now()-p>45e3;p=Date.now(),y&&Date.now()-u>4e3&&!l&&$()};if(typeof window<"u"){let y=0;const h=()=>{const f=Date.now();f-y>5e3&&(y=f,m())};window.addEventListener("click",h,{passive:!0}),window.addEventListener("keydown",h,{passive:!0}),window.addEventListener("touchstart",h,{passive:!0}),window.addEventListener("mousemove",h,{passive:!0})}const v=()=>{i&&clearTimeout(i);const y=Date.now()-p>45e3?15e3:4e3,h=d>0?Math.min(25e3,y*Math.pow(2,d)):y;i=setTimeout($,h)},$=async()=>{if(typeof document<"u"&&document.hidden){v();return}if(!s.data?.user||!s.view||s.view==="login"){v();return}if(l){v();return}l=!0,u=Date.now();try{await oe(!0),d=0}catch{d++}finally{l=!1,v()}};v(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&s.data?.user&&s.view&&s.view!=="login"&&(m(),$())})}}catch{typeof window<"u"&&(window.history&&window.history.replaceState?window.history.replaceState(null,"","#login"):window.location.hash="#login"),fe()}}typeof window<"u"&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener("hashchange",()=>{if(window._isInternalNav){window._isInternalNav=!1;return}const e=window.location.hash.replace(/^#/,"");if(!e)return;const[a,n]=e.split("?");if(a==="login"){s.data?.user&&(s.data.user=null),fe();return}if(a==="forgot"){fe("","forgot");return}const o=new URLSearchParams(n||(e.includes("=")?e:""));if(o.get("activate")){Tt(o.get("activate"));return}if(o.get("reset")){at(o.get("reset"));return}if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(a)){if(s.data&&!Z(a)){me(Te());return}let r=s.activeProjectId;if(n){const i=new URLSearchParams(n);if(i.get("id")&&(r=i.get("id")),i.get("tab")&&(s.projectTab=i.get("tab")),i.get("section")){const d=i.get("section");a==="settings"&&s.data&&!ie(d)?(s.settingsSection="profile",typeof window<"u"&&window.history&&window.history.replaceState&&window.history.replaceState(null,"","#settings?section=profile")):s.settingsSection=d}}else a==="settings"&&s.data&&!ie(s.settingsSection)&&(s.settingsSection="profile");s.view!==a||s.activeProjectId!==r?me(a,r):C()}}));if(typeof window<"u"&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener("scroll",a=>{a.target&&a.target.classList&&(a.target.classList.contains("timeline-scroll")||a.target.classList.contains("gantt-scroll")||a.target.classList.contains("timeline-board"))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows=="function"&&drawTimelineArrows(),e=!1})))},!0)}var V=null,Fe=null,$t=64,Ne=null,_e=-1,re=-1,Qe=-1,gt=0,rn=!1,X=null,B=null,dn=0,ln=0,cn=0,pn=0,nt=!1,xe=null,$e=null,q=null,Cn=null,la=null;function Re(e){let a=document.getElementById("dnd-live-announcer");a||(a=document.createElement("div"),a.id="dnd-live-announcer",a.className="sr-only",a.setAttribute("aria-live","assertive"),a.setAttribute("aria-atomic","true"),document.body.appendChild(a)),a.textContent="",setTimeout(()=>{a.textContent=e},40)}function Ii(e){V||(V=document.createElement("div"),V.className="drag-placeholder");const a=Math.max(48,Math.min(220,e||$t||64));return V.style.cssText=`
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
  `,V.innerHTML=`<span>↓ ${t("الموضع الجديد للمهمة","Drop position")}</span>`,V}function Zs(){V&&V.parentNode&&V.parentNode.removeChild(V)}function un(e,a){const n=Array.from(e.querySelectorAll(".task-card:not(.is-dragging):not(#active-drag-ghost)"));return n.length===0?null:n.reduce((o,r)=>{const i=r.getBoundingClientRect(),d=a-(i.top+i.height/2);return d<0&&d>o.offset?{offset:d,element:r}:o},{offset:Number.NEGATIVE_INFINITY}).element}function Qs(){if(Ne)return;function e(){if(!rn){Ne=null;return}if(_e>=0&&re>=0){const a=document.querySelector(".board, .board-columns, .tasks-board, [data-board]"),n=85,o=26;if(a){const r=document.documentElement.dir==="rtl"||s.lang==="ar";if(_e<n){const l=(n-_e)/n,p=-Math.max(4,Math.round(l*o));a.scrollBy({left:r?-p:p,behavior:"instant"})}else if(_e>window.innerWidth-n){const l=(_e-(window.innerWidth-n))/n,p=Math.max(4,Math.round(l*o));a.scrollBy({left:r?-p:p,behavior:"instant"})}const i=document.elementFromPoint(_e,re),d=i?.closest(".board-cards")||i?.closest(".board-column")?.querySelector(".board-cards");if(d&&d.scrollHeight>d.clientHeight){const l=d.getBoundingClientRect(),p=60;if(re>l.top&&re<l.top+p){const u=(p-(re-l.top))/p;d.scrollTop-=Math.max(3,Math.round(u*18))}else if(re<l.bottom&&re>l.bottom-p){const u=(re-(l.bottom-p))/p;d.scrollTop+=Math.max(3,Math.round(u*18))}}}}Ne=requestAnimationFrame(e)}Ne=requestAnimationFrame(e)}function eo(){Ne&&(cancelAnimationFrame(Ne),Ne=null)}async function _a(e,a,n=null){if(!e){le();return}e.classList.remove("drag-over");const o=n||Fe;Fe=null;const r=e.dataset.status;if(!o||!r){le();return}const i=(s.data?.tasks||[]).find(b=>b.id===o);if(!i){le();return}const d=e.querySelector(".board-cards");if(!d){le();return}const l=i.status===r||r==="review"&&["review","approval","blocked"].includes(i.status);if(!l&&r==="done"&&i.dependencies&&i.dependencies.length&&i.dependencies.filter(b=>{const A=s.data.tasks.find(j=>j.id===b);return A&&A.status!=="done"}).length)return le(),k(t("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);const p=Array.from(d.querySelectorAll(".task-card")).filter(b=>b.dataset.taskId!==o),u=p.map(b=>b.dataset.taskId).filter(Boolean);let m=u.length;if(V&&V.parentNode===d)if(!V.previousElementSibling||V.previousElementSibling.classList?.contains("empty"))m=0;else{let b=V.nextElementSibling;for(;b&&!b.classList?.contains("task-card");)b=b.nextElementSibling;if(b&&b.dataset?.taskId){const A=u.indexOf(b.dataset.taskId);m=A!==-1?A:0}else m=u.length}else if(p.length>0){const b=a&&a>0?a:re>0?re:0,A=p[0].getBoundingClientRect(),j=p[p.length-1].getBoundingClientRect();if(b<=A.top+A.height*.45)m=0;else if(b>=j.bottom-j.height*.45)m=u.length;else{const P=un(d,b);if(P){const L=u.indexOf(P.dataset.taskId);L!==-1&&(m=L)}}}else m=0;const v=Array.from(d.querySelectorAll(".task-card")).findIndex(b=>b.dataset.taskId===o);if(l&&v!==-1&&(m===v||m===v+1)){le();return}const $=i.status,y=(s.data.tasks||[]).map(b=>({id:b.id,status:b.status,sortOrder:b.sortOrder||b.sort_order,progress:b.progress,customFields:JSON.parse(JSON.stringify(b.customFields||b.custom_fields||{}))}));le();const h=[...u];h.splice(m,0,o),r==="review"&&["review","approval","blocked"].includes(i.status)||(i.status=r),i.status==="done"?i.progress=100:i.status==="not_started"?i.progress=0:i.status==="in_progress"&&(i.progress===0||!i.progress)?i.progress=50:["review","approval"].includes(i.status)&&(i.progress||0)<80&&(i.progress=80),window._recentlyMovedTasks||(window._recentlyMovedTasks=new Map);const f=Date.now();h.forEach((b,A)=>{const j=(s.data?.tasks||[]).find(P=>P.id===b);if(j){const P=(A+1)*100;j.sortOrder=P,j.sort_order=P,j.customFields||(j.customFields={}),j.customFields.sortOrder=P,j.customFields.sort_order=P,j.custom_fields||(j.custom_fields={}),j.custom_fields.sortOrder=P,j.custom_fields.sort_order=P,window._recentlyMovedTasks.set(b,{status:j.status,sortOrder:P,progress:j.progress,timestamp:f})}});for(const[b,A]of window._recentlyMovedTasks.entries())f-A.timestamp>45e3&&window._recentlyMovedTasks.delete(b);const w=r==="review"?["review","approval","blocked"]:[r],T=i.projectId||i.project_id;let I=(h.length+1)*100;if((s.data?.tasks||[]).forEach(b=>{T&&(b.projectId||b.project_id)!==T||w.includes(b.status)&&!h.includes(b.id)&&(b.sortOrder=I,b.sort_order=I,b.customFields&&(b.customFields.sortOrder=I,b.customFields.sort_order=I),b.custom_fields&&(b.custom_fields.sortOrder=I,b.custom_fields.sort_order=I),I+=100)}),Ha("custom"),s.taskSortPref="custom",s.projectTaskSort="custom",s.myTaskSort="custom",C(!0),typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(20)}catch{}$!==r&&document.querySelectorAll(`.board-column[data-status="${r}"] .board-count, .board-column[data-status="${$}"] .board-count`).forEach(b=>{b.classList.remove("count-updated"),b.offsetWidth,b.classList.add("count-updated"),setTimeout(()=>b.classList.remove("count-updated"),350)});const E=document.querySelector(`.task-card[data-task-id="${o}"]`);E&&(E.classList.add("just-dropped"),setTimeout(()=>E?.classList.remove("just-dropped"),450));const z=e.querySelector(".board-column-title"),M=z?z.innerText.trim():r;Re(t(`تم إفلات المهمة في عمود: ${M}، الموضع ${m+1}.`,`Dropped task into column: ${M}, position ${m+1}.`)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,h.forEach(b=>{const A=(s.data.tasks||[]).find(j=>j.id===b);A&&window._pendingReorderBatch.set(A.id,{id:A.id,status:A.status,sortOrder:A.sortOrder,customFields:A.customFields})}),window._reorderSyncTimer=setTimeout(()=>{const b=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),D("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:b})}).catch(A=>{console.warn("Reorder sync error, performing local rollback:",A),y.forEach(j=>{const P=(s.data?.tasks||[]).find(L=>L.id===j.id);P&&(P.status=j.status,P.sortOrder=j.sortOrder,P.sort_order=j.sortOrder,P.progress=j.progress,P.customFields=j.customFields)}),C(!0),k(t("فشل حفظ الترتيب الجديد في الخادم. تم التراجع عن التعديل تلقائياً.","Failed to save task order to server. Reverted automatically."),!0)})},150)}function le(){xe&&(clearTimeout(xe),xe=null),B&&B.parentNode&&B.parentNode.removeChild(B),B=null,X&&(X.style.opacity="",X.style.pointerEvents="",X.classList.remove("is-dragging")),X=null,nt=!1,rn=!1,window._isDraggingTask=!1,Fe=null,_e=-1,re=-1,Qe=-1,gt=0,eo(),document.querySelectorAll(".board-column").forEach(e=>e.classList.remove("drag-over")),Zs(),document.body.style.userSelect="",document.body.style.webkitUserSelect="",document.body.style.cursor="",window._pendingRenderAfterDrag&&(window._pendingRenderAfterDrag=!1,requestAnimationFrame(()=>C(!0)))}function ji(e,a){if(!X||nt)return;const n=(s.data?.tasks||[]).find(i=>i.id===X.dataset.taskId);if(!It(n)){le();return}if(nt=!0,rn=!0,window._isDraggingTask=!0,Fe=X.dataset.taskId,Qe=e,gt=0,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(30)}catch{}const o=X.getBoundingClientRect();$t=o.height,cn=e-o.left,pn=a-o.top,B=X.cloneNode(!0),B.id="active-drag-ghost",B.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: ${o.width}px;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.96;
    transform: translate3d(${o.left}px, ${o.top}px, 0) scale(1.025);
    box-shadow: 0 20px 42px -8px rgba(13, 98, 105, 0.24), 0 8px 18px rgba(0, 0, 0, 0.1);
    border: 1.5px solid var(--brand-teal, #0d6269);
    background: var(--surface, #ffffff);
    border-radius: 12px;
    will-change: transform, box-shadow;
    cursor: grabbing !important;
  `,document.body.appendChild(B),X.classList.add("is-dragging"),X.style.opacity="0.22",X.style.pointerEvents="none",document.body.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.cursor="grabbing";const r=X.closest(".board-column");if(r){r.classList.add("drag-over");const i=r.querySelector(".board-cards");if(i){const d=Ii($t),l=un(i,a);l==null?i.appendChild(d):i.insertBefore(d,l)}}Qs()}document.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;const a=e.target.closest(".task-card");if(!a||e.target.closest("button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]"))return;const n=(s.data?.tasks||[]).find(r=>r.id===a.dataset.taskId);if(!It(n))return;X=a,e.pointerId,dn=e.clientX,ln=e.clientY,Qe=e.clientX,nt=!1;const o=a.getBoundingClientRect();$t=o.height,cn=e.clientX-o.left,pn=e.clientY-o.top,e.pointerType==="touch"&&(xe=setTimeout(()=>{ji(e.clientX,e.clientY)},110))},{passive:!0});document.addEventListener("pointermove",e=>{if(!X)return;if(!nt){const r=Math.abs(e.clientX-dn),i=Math.abs(e.clientY-ln),d=Math.hypot(r,i);if(e.pointerType==="touch"){d>12&&(xe&&(clearTimeout(xe),xe=null),X=null);return}else if(d>=4)ji(e.clientX,e.clientY);else return}e.cancelable&&e.preventDefault(),_e=e.clientX,re=e.clientY;const a=Qe>=0?e.clientX-Qe:0;Qe=e.clientX;const n=Math.max(-2.5,Math.min(2.5,a*.16));if(gt+=(n-gt)*.28,B){const r=e.clientX-cn,i=e.clientY-pn;B.style.transform=`translate3d(${r}px, ${i}px, 0) scale(1.025) rotate(${gt.toFixed(2)}deg)`}let o=document.elementFromPoint(e.clientX,e.clientY)?.closest(".board-column");if(!o){const r=Array.from(document.querySelectorAll(".board-column"));r.length>0&&(o=r.reduce((i,d)=>{const l=d.getBoundingClientRect(),p=Math.abs(e.clientX-(l.left+l.width/2));return p<i.dist?{col:d,dist:p}:i},{col:null,dist:1/0}).col)}if(document.querySelectorAll(".board-column").forEach(r=>r.classList.toggle("drag-over",r===o)),o){const r=o.querySelector(".board-cards");if(r){const i=Ii($t),d=un(r,e.clientY);d==null?(!r.contains(i)||r.lastElementChild!==i)&&r.appendChild(i):i.nextElementSibling!==d&&r.insertBefore(i,d)}}},{passive:!1});document.addEventListener("pointerup",async e=>{if(xe&&(clearTimeout(xe),xe=null),!!X)if(nt){const a=Math.hypot(e.clientX-dn,e.clientY-ln);if(window._justDroppedTaskId=Fe,window._justDroppedAt=Date.now(),window._isDraggingTask=!1,a>4&&Fe){let n=document.elementFromPoint(e.clientX,e.clientY)?.closest(".board-column")||V&&V.closest(".board-column");if(!n){const i=Array.from(document.querySelectorAll(".board-column"));i.length>0&&(n=i.reduce((d,l)=>{const p=l.getBoundingClientRect(),u=Math.abs(e.clientX-(p.left+p.width/2));return u<d.dist?{col:l,dist:u}:d},{col:null,dist:1/0}).col)}const o=Fe,r=V&&V.parentNode?V.getBoundingClientRect():null;if(B&&r&&r.width>0&&r.height>0){B.style.transition="transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.14s ease, opacity 0.14s ease",B.style.transform=`translate3d(${r.left}px, ${r.top}px, 0) scale(1) rotate(0deg)`,B.style.boxShadow="0 4px 14px rgba(13, 98, 105, 0.12)",setTimeout(async()=>{B&&B.parentNode&&B.parentNode.removeChild(B),B=null,n&&o?await _a(n,e.clientY,o):le()},130);return}n&&o&&(B&&B.parentNode&&B.parentNode.removeChild(B),B=null,await _a(n,e.clientY,o))}le()}else le()});document.addEventListener("pointercancel",()=>{le()});document.addEventListener("dragstart",e=>{e.target.closest(".task-card")&&e.preventDefault()});document.addEventListener("click",e=>{window._justDroppedAt&&Date.now()-window._justDroppedAt<400&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},!0);document.addEventListener("keydown",async e=>{if(e.target.closest('input, textarea, select, [contenteditable="true"]')||document.querySelector(".modal-overlay, #taskModal, .modal-backdrop"))return;const a=document.activeElement?.closest?.(".task-card");if((e.key===" "||e.altKey&&(e.key==="m"||e.key==="M"))&&a){const n=(s.data?.tasks||[]).find(o=>o.id===a.dataset.taskId);if(!It(n))return;if(e.preventDefault(),$e)$e===n.id&&(q?.classList.remove("is-keyboard-grabbed"),q?.setAttribute("aria-grabbed","false"),$e=null,q=null,window._isKeyboardDraggingTask=!1,Re(t("تم إلغاء الإمساك بالمهمة.","Task released.")));else{$e=n.id,q=a,Cn=n.status,la=n.sortOrder||n.sort_order,window._isKeyboardDraggingTask=!0,a.classList.add("is-keyboard-grabbed"),a.setAttribute("aria-grabbed","true");const o=a.closest(".board-column")?.querySelector(".board-column-title")?.innerText?.trim()||"",r=t(n.titleAr,n.titleEn);Re(t(`تم الإمساك بالمهمة "${r}". العمود الحالي: ${o}. استخدم الأسهم للتحريك، Enter للإفلات، Escape للإلغاء.`,`Grabbed task "${r}". Current column: ${o}. Use arrow keys to move, Enter to drop, Escape to cancel.`))}return}if($e&&q){const n=(s.data?.tasks||[]).find(l=>l.id===$e);if(!n)return;const o=q.closest(".board-column");if(!o)return;const r=Array.from(document.querySelectorAll(".board-column")),i=r.indexOf(o),d=document.documentElement.dir==="rtl"||s.lang==="ar";if(e.key==="ArrowUp"){e.preventDefault();const l=q.previousElementSibling;l&&l.classList.contains("task-card")&&(o.querySelector(".board-cards").insertBefore(q,l),q.focus(),Re(t("تم التحريك للأعلى.","Moved up.")));return}if(e.key==="ArrowDown"){e.preventDefault();const l=q.nextElementSibling;l&&l.classList.contains("task-card")&&(o.querySelector(".board-cards").insertBefore(l,q),q.focus(),Re(t("تم التحريك للأسفل.","Moved down.")));return}if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const l=d?"ArrowLeft":"ArrowRight",p=e.key===l?i+1:i-1;if(p>=0&&p<r.length){const u=r[p],m=u.querySelector(".board-cards");if(m){m.appendChild(q),q.focus();const v=u.querySelector(".board-column-title")?.innerText?.trim()||"";Re(t(`تم النقل إلى عمود: ${v}.`,`Moved to column: ${v}.`))}}return}if(e.key==="Enter"){e.preventDefault();const l=q.closest(".board-column"),p=$e;if(q.classList.remove("is-keyboard-grabbed"),q.setAttribute("aria-grabbed","false"),$e=null,q=null,window._isKeyboardDraggingTask=!1,l&&p){const u=q?q.getBoundingClientRect():null;await _a(l,u?u.top+10:0,p)}return}if(e.key==="Escape"){e.preventDefault(),q.classList.remove("is-keyboard-grabbed"),q.setAttribute("aria-grabbed","false"),$e=null,q=null,window._isKeyboardDraggingTask=!1,n.status=Cn,la!==null&&(n.sortOrder=la),C(!0),Re(t("تم إلغاء النقل وإعادة المهمة لمكانها الأصلي.","Move cancelled. Task returned to original position."));return}}});document.documentElement.dataset.theme=s.theme;document.documentElement.lang=s.lang;document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";s.lang==="en"?document.body.classList.add("is-ltr"):document.body.classList.remove("is-ltr");Object.assign(window,Hi);Object.assign(window,is);Object.assign(window,ls);Object.assign(window,$s);Object.assign(window,ms);Object.assign(window,Ts);Object.assign(window,Ds);Object.assign(window,ys);Object.assign(window,Ms);Object.assign(window,ns);Object.assign(window,Ys);Object.assign(window,Wi);window._recentlyMovedTasks=window._recentlyMovedTasks||new Map;Os();document.addEventListener("click",e=>{const a=e.target.closest("[data-action], [data-view], button, a");if(a){const n=a.dataset.action||a.dataset.view||a.innerText?.trim()?.slice(0,40)||a.tagName;Et("ui.click",`النقر على: ${n}`)}typeof Ta=="function"&&Ta(e).catch(n=>{Yt(n,{source:"handleClick"}),typeof k=="function"&&k(n.message,!0)})});document.addEventListener("submit",e=>{const a=e.target.id||e.target.dataset.action||"form";Et("form.submit",`إرسال نموذج: ${a}`),typeof Ea=="function"&&Ea(e).catch(n=>{Yt(n,{source:"handleSubmit"}),typeof k=="function"&&k(n.message,!0)})});document.addEventListener("input",e=>{typeof Ia=="function"&&Ia(e)});document.addEventListener("change",e=>{typeof ja=="function"&&ja(e)});document.addEventListener("keydown",e=>{e.key==="Escape"&&typeof K=="function"&&K()});var ca=null;window.addEventListener("resize",()=>{s.view==="project-detail"&&s.projectTab==="timeline"&&(ca||(ca=requestAnimationFrame(()=>{ca=null,typeof fa=="function"&&fa()})))});window.addEventListener("error",e=>{const a=String(e?.message||e?.error?.message||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Runtime Error:",e.error),Yt(e.error||{message:a},{source:"window.onerror"}),typeof k=="function"&&k(`خطأ برمجي: ${e.message}`,!0))});window.addEventListener("unhandledrejection",e=>{const a=String(e?.reason?.message||e?.reason||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Unhandled Rejection:",e.reason),Yt(e.reason||{message:a},{source:"unhandledrejection",errorType:"UnhandledRejection"}))});"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(e=>{console.warn("[PWA] ServiceWorker registration skipped:",e.message)})});Vs();as();Ti();
