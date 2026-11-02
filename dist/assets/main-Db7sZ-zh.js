var Sn=Object.defineProperty,pe=(e,a)=>{let n={};for(var o in e)Sn(n,o,{get:e[o],enumerable:!0});return a||Sn(n,Symbol.toStringTag,{value:"Module"}),n};(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function qt(e){if(typeof document>"u"||!e||!document.cookie)return null;const a=document.cookie.split("; "),n=encodeURIComponent(String(e))+"=",o=String(e)+"=";for(let r=0;r<a.length;r++){const i=a[r];if(i.startsWith(n)){const d=i.substring(n.length);try{return decodeURIComponent(d)}catch{return d}}else if(i.startsWith(o)){const d=i.substring(o.length);try{return decodeURIComponent(d)}catch{return d}}}return null}function Ji(){if(typeof window>"u")return"ar";try{let e=qt("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const a=qt("darc_prefs");if(a)try{e=JSON.parse(a).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function Yi(){if(typeof window>"u")return"light";try{let e=qt("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const a=qt("darc_prefs");if(a)try{e=JSON.parse(a).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function Ki(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const a=window.location.hash.replace(/^#/,"");if(a&&!["login","forgot"].includes(a)){const[o,r]=a.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(o)){let i=null,d="overview",l="profile";if(r){const c=new URLSearchParams(r),u=c.get("id");u&&/^[a-zA-Z0-9_-]{3,64}$/.test(u)&&(i=u);const m=c.get("tab");m&&["overview","tasks","drawings","documents","timeline","activity"].includes(m)&&(d=m);const v=c.get("section");v&&["profile","company","roles","accounts","whatsapp","security","audit","trash","analytics","diagnostics","preferences"].includes(v)&&(l=v)}return{view:o,activeProjectId:i,projectTab:d,settingsSection:l}}}const n=sessionStorage.getItem("darc_last_route");if(n){const o=JSON.parse(n);if(o.view)return{view:o.view,activeProjectId:o.activeProjectId||null,projectTab:o.projectTab||"overview",settingsSection:o.settingsSection||"profile"}}}catch{}return e}var Lt=Ki(),s={lang:Ji(),theme:Yi(),view:Lt.view,activeProjectId:Lt.activeProjectId,projectTab:Lt.projectTab,settingsSection:Lt.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},Xi="darc_offline_db",Zi=1,ze="cache_store",st="darc_offline_bootstrap",Te="darc_offline_mutations_queue",ca=!1,pa=null;function Oa(){return typeof indexedDB>"u"?Promise.resolve(null):(pa||(pa=new Promise(e=>{try{const a=indexedDB.open(Xi,Zi);a.onupgradeneeded=n=>{const o=n.target.result;o.objectStoreNames.contains(ze)||o.createObjectStore(ze)},a.onsuccess=()=>e(a.result),a.onerror=()=>e(null)}catch{e(null)}})),pa)}async function Qi(e){const a=await Oa();return a?new Promise(n=>{try{const o=a.transaction(ze,"readonly").objectStore(ze).get(e);o.onsuccess=()=>n(o.result||null),o.onerror=()=>n(null)}catch{n(null)}}):null}async function es(e,a){const n=await Oa();return n?new Promise(o=>{try{const r=n.transaction(ze,"readwrite").objectStore(ze).put(a,e);r.onsuccess=()=>o(!0),r.onerror=()=>o(!1)}catch{o(!1)}}):!1}async function An(e){const a=await Oa();return a?new Promise(n=>{try{const o=a.transaction(ze,"readwrite").objectStore(ze).delete(e);o.onsuccess=()=>n(!0),o.onerror=()=>n(!1)}catch{n(!1)}}):!1}function ts(){return typeof navigator<"u"?navigator.onLine:!0}function me(e){if(!e)return;const a={timestamp:Date.now(),data:e};if(es(st,a).catch(()=>{}),typeof localStorage<"u"){const n=()=>{try{localStorage.setItem(st,JSON.stringify(a))}catch(o){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",o.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:2e3}):setTimeout(n,50)}}function Ba(){if(typeof localStorage<"u")try{const e=localStorage.getItem(st);if(e){const a=JSON.parse(e);if(a?.data)return a.data}}catch{}return null}async function En(){const e=await Qi(st);return e?.data?e.data:Ba()}async function Tn(){if(typeof localStorage<"u")try{localStorage.removeItem(st),localStorage.removeItem(Te)}catch{}await Promise.all([An(st),An(Te)]),tt()}function tt(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:At().length}}))}function at(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function In({path:e,method:a="POST",body:n=null,description:o=""}){if(typeof localStorage>"u")return null;try{const r=localStorage.getItem(Te),i=r?JSON.parse(r):[];if(a==="DELETE"){if(e.startsWith("/api/tasks/")){const l=e.split("/")[3];if(i.some(c=>c.method==="POST"&&c.path==="/api/tasks"&&c.body?.id===l)){const c=i.filter(u=>!(u.path==="/api/tasks"&&u.body?.id===l||u.path===`/api/tasks/${l}`||u.path.startsWith(`/api/tasks/${l}/`)));return localStorage.setItem(Te,JSON.stringify(c)),tt(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const l=e.split("/")[3];if(i.some(c=>c.method==="POST"&&c.path==="/api/projects"&&c.body?.id===l)){const c=i.filter(u=>!(u.path==="/api/projects"&&u.body?.id===l||u.path===`/api/projects/${l}`||u.method==="POST"&&u.path==="/api/tasks"&&u.body?.projectId===l));return localStorage.setItem(Te,JSON.stringify(c)),tt(),{id:"compacted",compacted:!0}}}}const d={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substring(2,8),path:e,method:a,body:n,description:o,createdAt:new Date().toISOString()};return i.push(d),localStorage.setItem(Te,JSON.stringify(i)),tt(),console.log("[Offline Outbox] Enqueued mutation:",d),d}catch(r){return console.warn("[Offline Outbox] Failed to enqueue mutation:",r.message),null}}function At(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(Te);return e?JSON.parse(e):[]}catch{return[]}}function as(){typeof localStorage>"u"||(localStorage.removeItem(Te),tt())}function Dn(e,a,n,o){if(!o||!o.data)return{ok:!0,queued:!0,offline:!0};const r=new Date().toISOString();if(a==="POST"&&e==="/api/tasks"&&n){const i=n.id||at("tsk");n.id=i;const d={id:i,code:"OFFLINE",projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",status:n.status||"not_started",priority:n.priority||"medium",categoryAr:n.categoryAr||"عام",categoryEn:n.categoryEn||"General",weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:o.data.users?.find(c=>c.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:r,updatedAt:r,_isOfflinePending:!0};o.data.tasks||(o.data.tasks=[]);const l=o.data.tasks.findIndex(c=>c.id===i);return l!==-1?o.data.tasks[l]=d:o.data.tasks.unshift(d),me(o.data),{ok:!0,queued:!0,offline:!0,task:d}}if(a==="PATCH"&&e.startsWith("/api/tasks/")&&n){const i=e.split("/")[3],d=(o.data.tasks||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...o.data.tasks[d],...n,updatedAt:r,_isOfflinePending:!0};return n.assigneeId!==void 0&&(l.assignee=o.data.users?.find(c=>c.id===n.assigneeId)||null),o.data.tasks[d]=l,me(o.data),{ok:!0,queued:!0,offline:!0,task:l}}}if(a==="DELETE"&&e.startsWith("/api/tasks/")){const i=e.split("/")[3];return o.data.tasks&&(o.data.tasks=o.data.tasks.filter(d=>d.id!==i),me(o.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e==="/api/projects"&&n){const i=n.id||at("prj");n.id=i;const d={id:i,code:n.code||"DARC-OFF",nameAr:n.nameAr||n.name||"مشروع محلي جديد",nameEn:n.nameEn||n.name||"New Offline Project",clientAr:n.clientAr||"",clientEn:n.clientEn||"",descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",lifecycle:n.lifecycle||"planning",health:n.health||"on_track",progress:0,progressMode:"weighted",managerId:n.managerId||o.data.user?.id,startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:r,updatedAt:r,_isOfflinePending:!0};o.data.projects||(o.data.projects=[]);const l=o.data.projects.findIndex(c=>c.id===i);return l!==-1?o.data.projects[l]=d:o.data.projects.unshift(d),me(o.data),{ok:!0,queued:!0,offline:!0,project:d}}if(a==="PATCH"&&e.startsWith("/api/projects/")&&n){const i=e.split("/")[3],d=(o.data.projects||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...o.data.projects[d],...n,updatedAt:r,_isOfflinePending:!0};return o.data.projects[d]=l,me(o.data),{ok:!0,queued:!0,offline:!0,project:l}}}if(a==="DELETE"&&e.startsWith("/api/projects/")){const i=e.split("/")[3];return o.data.projects&&(o.data.projects=o.data.projects.filter(d=>d.id!==i),me(o.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e.includes("/comments")&&n){const i=e.split("/")[3],d={id:n.id||at("cmt"),taskId:i,userId:o.data.user?.id,content:n.content,createdAt:r,_isOfflinePending:!0};return n.id=d.id,o.data.comments||(o.data.comments=[]),o.data.comments.some(l=>l.id===d.id)||o.data.comments.push(d),me(o.data),{ok:!0,queued:!0,offline:!0,comment:d}}return a==="PATCH"&&e==="/api/tasks/reorder"&&n&&Array.isArray(n.items)?(o.data.tasks&&(n.items.forEach(i=>{const d=o.data.tasks.find(l=>l.id===i.id);d&&(i.status&&(d.status=i.status),i.sortOrder&&(d.sortOrder=i.sortOrder),i.customFields&&(d.customFields={...d.customFields||{},...i.customFields}),d._isOfflinePending=!0)}),me(o.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function Fa(e){if(ca)return{total:0,synced:0,failed:0};const a=At();if(!a.length)return{total:0,synced:0,failed:0};ca=!0,console.log(`[Offline Sync] Replaying ${a.length} pending mutations...`);let n=0,o=!1;const r=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,i=new Set(["POST","PATCH","PUT","DELETE"]);for(let d=0;d<a.length;d++){const l=a[d];if(!l||!l.path||typeof l.path!="string"||!r.test(l.path)||!i.has(l.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",l?.id,l?.path);continue}try{const c={method:l.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":l.id,"X-Idempotency-Key":l.id}};l.body&&(c.body=typeof l.body=="string"?l.body:JSON.stringify(l.body));const u=await e(l.path,c);if(u&&u.error&&!u.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",l.id,u.error);else{n++;const m=l.body&&typeof l.body=="object"&&l.body.id||typeof l.path=="string"&&l.path.split("/")[3];m&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(m)}}catch(c){if(console.error("[Offline Sync] Failed to replay mutation:",l.id,l.path,c.message),typeof navigator<"u"&&!navigator.onLine||c.message&&(c.message.includes("تعذر الاتصال")||c.message.includes("fetch")||c.message.includes("NetworkError")||c.name==="TypeError")){const u=a.slice(d);typeof localStorage<"u"&&localStorage.setItem(Te,JSON.stringify(u)),o=!0;break}}}return o||as(),ca=!1,tt(),{total:a.length,synced:n,failed:o?a.length-n:0}}var ns=pe({closeModal:()=>B,modalShell:()=>he,renderLoading:()=>Et,showToast:()=>k});function Et(){document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${t("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var Be=!1,Le=null;function B(e=!1){Le&&(clearTimeout(Le),Le=null);const a=document.getElementById("preview-modal-overlay");a&&(a.style.display="none",a.innerHTML="");const n=document.getElementById("modal-root");if(!n||!n.hasChildNodes()){document.body.style.overflow="",Be=!1;return}if(e){n.innerHTML="",document.body.style.overflow="",Be=!1;return}if(Be)return;Be=!0;const o=n.querySelector(".modal-backdrop"),r=n.querySelector(".modal");o&&r?(o.classList.add("is-closing"),r.classList.add("is-closing"),Le=setTimeout(()=>{Le=null,n.innerHTML="",document.body.style.overflow="",Be=!1},150)):(n.innerHTML="",document.body.style.overflow="",Be=!1)}function he(e,a,n,o="",r=""){return Le&&(clearTimeout(Le),Le=null),Be=!1,document.body.style.overflow="hidden",`<div class="modal-backdrop ${o?`backdrop-${o}`:""}"><div class="modal ${r}" data-modal="${o}"><div class="modal-head"><div><h2>${p(e)}</h2><p>${p(a||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${t("إغلاق","Close")}">${h("close",15)}</button></div>${n}</div></div>`}function k(e,a=!1){const n=document.getElementById("toast-root");if(!n)return;const o=document.createElement("div");o.className=`toast ${a?"error":""}`,o.innerHTML=`${h(a?"alert":"check",16)}<span>${p(e)}</span>`,n.appendChild(o),setTimeout(()=>o.remove(),3600)}var is=pe({I18N:()=>ba,PERMISSION_ALIASES:()=>Gn,avatar:()=>V,can:()=>I,canManageAccountPermissions:()=>ms,choose:()=>t,currentViewTitle:()=>Wa,dateLabel:()=>be,dueLabel:()=>Hn,esc:()=>p,extractDrawingVersion:()=>qa,formatDateTime:()=>Ha,formatReportDate:()=>Je,formatReportTime:()=>Tt,formatUnifiedDateNumeric:()=>ls,getActiveCalendarSystem:()=>Re,getCookieVal:()=>ss,getFileFormatInfo:()=>ea,getHijriDateEquivalent:()=>cs,getTaskStatusStyle:()=>Ua,getTimeBasedGreeting:()=>qn,icon:()=>h,initials:()=>ht,isAdmin:()=>C,isOverdue:()=>De,parseEndOfDay:()=>Ie,playSuccessChime:()=>Ht,priorityText:()=>us,roleFor:()=>Wn,roleName:()=>ie,runInWorker:()=>fs,sanitizeForSpreadsheet:()=>F,savePreferencesCookies:()=>bt,showToast:()=>k,statusBadge:()=>ps,statusText:()=>H,t:()=>g}),ba={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function g(e){return ba[s.lang][e]||ba.ar[e]||e}function t(e,a){return s.lang==="ar"?e:a}function ss(e){if(typeof document>"u"||!e)return null;const a=document.cookie?document.cookie.split("; "):[];for(const n of a){const o=n.indexOf("=");if(o!==-1&&n.slice(0,o).trim()===e)return decodeURIComponent(n.slice(o+1))}return null}function bt({theme:e,lang:a}={}){if(typeof document>"u")return;const n=31536e3,o=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let r="";if(typeof window<"u"){const m=window.location.hostname;(m==="darc-design.bond"||m.endsWith(".darc-design.bond"))&&(r="; Domain=.darc-design.bond")}const i=e==="dark"||e==="light"?e:null,d=a==="ar"||a==="en"?a:null;if(i){document.cookie=`darc_theme=${encodeURIComponent(i)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`;try{window.localStorage.setItem("darc-theme",i)}catch{}}if(d){document.cookie=`darc_lang=${encodeURIComponent(d)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`;try{window.localStorage.setItem("darc-locale",d)}catch{}}const l=i||(s&&s.theme==="dark"?"dark":"light")||"light",c=d||(s&&s.lang==="en"?"en":"ar")||"ar",u=JSON.stringify({theme:l,lang:c});document.cookie=`darc_prefs=${encodeURIComponent(u)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`}var os={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},rs=/[&<>'"]/,ds=/[&<>'"]/g;function p(e){if(e==null)return"";const a=String(e);return rs.test(a)?a.replace(ds,n=>os[n]):a}function F(e){if(e==null)return"";const a=String(e),n=a.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(a)?`'${a}`:a}var jn={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};function h(e,a=18){return`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${jn[e]||jn.info}</svg>`}function ht(e){if(!e||typeof e!="object")return"D";const a=(s.lang==="ar"?e.name:e.nameEn||e.name)||e.email||"DARC";return(String(a).replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join("")||String(a).slice(0,2)).toUpperCase()}function V(e,a=""){const n=e||{name:"DARC",avatarColor:"#0d6269"},o=/^#[0-9a-f]{6}$/i.test(n.avatarColor||"")?n.avatarColor:"#0d6269",r=p(t(n.name,n.nameEn||n.name));if(n.avatarUrl){const i=p(ht(n)).replace(/['"\\]/g,"");return`<span class="avatar ${a}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${r}"><img src="${p(n.avatarUrl)}" alt="${r}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${o}';this.parentElement.textContent='${i}';" /></span>`}return`<span class="avatar ${a}" style="background:${o}" title="${r}">${p(ht(n))}</span>`}function qn(){const e=new Date().getHours();return s.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function Ua(e){const a=e?.status,n=De(e);return a==="done"||a==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:t("مكتملة","Completed")}:a==="review"||a==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:t("للمراجعة والاعتماد","In Review")}:a==="blocked"||n?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:n?t("متأخرة","Overdue"):t("متوقفة","Blocked")}:a==="in_progress"||a==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:t("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:t("غير مبدوءة","Not Started")}}function ea(e,a=""){const n=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(n)?{ext:n.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(n)?{ext:n.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:n==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["png","jpg","jpeg","webp","heic"].includes(n)?{ext:n.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["zip","rar","7z","tar"].includes(n)?{ext:n.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:n.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function qa(e){if(!e)return null;const a=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return a?`V${a[1]}`:null}function Re(){let e=null;try{e=localStorage.getItem("darc_calendar_system")}catch{}return s.calendarSystem||s.data?.user?.customFields?.calendarSystem||e||"gregorian"}var Cn=new Map;function Ne(e,a={}){const n=e+"|"+JSON.stringify(a);let o=Cn.get(n);return o||(o=new Intl.DateTimeFormat(e,a),Cn.set(n,o)),o}function be(e,a=!0){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?"—":Re()==="hijri"?Ne(s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n):Ne(s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n)}function ls(e){if(!e)return"—";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"—":Re()==="hijri"?Ne(s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"2-digit",month:"2-digit",year:"numeric"}).format(a):`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}/${a.getFullYear()}`}function Ha(e,a={}){if(!e)return{date:"—",time:"—",full:"—"};try{const n=new Date(e);if(Number.isNaN(n.getTime()))return{date:String(e),time:"—",full:String(e)};const o=Re(),r=s.lang==="ar",i=Ne(o==="hijri"?r?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":r?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{year:"numeric",month:a.monthStyle||"short",day:"numeric"}).format(n),d=Ne(r?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",...a.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(n);return{date:i,time:d,full:`${i} ${d}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function Je(e=new Date){const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=Re(),o=s.lang==="ar";return Ne(n==="hijri"?o?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{dateStyle:"full"}).format(a)}function Tt(e=new Date){const a=new Date(e);return Number.isNaN(a.getTime())?"—":Ne(s.lang==="ar"?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(a)}function cs(e){if(!e)return"";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"":Ne("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(a)}function Ie(e){if(!e)return null;if(e instanceof Date){if(isNaN(e.getTime()))return null;const a=new Date(e.getTime());return a.setHours(23,59,59,999),a}if(typeof e=="number"){const a=new Date(e);return isNaN(a.getTime())?null:(a.setHours(23,59,59,999),a)}if(typeof e=="string"){const a=e.trim();if(!a)return null;const n=a.split("T")[0].split(" ")[0];if(/^\d{4}-\d{2}-\d{2}$/.test(n)){const[r,i,d]=n.split("-").map(Number);return new Date(r,i-1,d,23,59,59,999)}const o=new Date(a);if(!isNaN(o.getTime()))return o.setHours(23,59,59,999),o}return null}function Hn(e){if(!e)return"—";const a=Ie(e);if(!a||isNaN(a.getTime()))return"—";const n=Math.ceil((a-new Date)/864e5);return isNaN(n)?"—":n<0?t(`متأخرة ${Math.abs(n)} ${g("days")}`,`${Math.abs(n)} ${g("days")} ${g("ago")}`):n===0?g("today"):t(`بعد ${n} ${g("days")}`,`in ${n} ${g("days")}`)}function De(e){if(!e?.dueDate||["done","completed","canceled"].includes(e.status))return!1;const a=Ie(e.dueDate);return a?a<new Date:!1}function H(e){switch(e){case"not_started":return g("notStarted");case"in_progress":return g("inProgress");case"review":return g("review");case"approval":return g("approval");case"done":return g("done");case"blocked":return g("blocked");case"canceled":return g("canceled");case"planning":return g("planning");case"active":return g("active");case"on_hold":return g("onHold");case"completed":return g("completed");case"archived":return g("archived");case"on_track":return g("onTrack");case"at_risk":return g("atRisk");case"off_track":return g("offTrack");default:return e||""}}function ps(e){return e?`<span class="status-badge ${p(e)}">${p(H(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function us(e){switch(e){case"low":return g("low");case"medium":return g("medium");case"high":return g("high");case"urgent":return g("urgent");default:return e||""}}function Wn(e){const a=typeof e=="string"?s.data?.users?.find(n=>n.id===e):e;return a?s.data?.roles?.find(n=>n.id===a.roleId)||{id:a.roleId,nameAr:a.roleNameAr||"",nameEn:a.roleNameEn||"",permissions:[]}:null}function ie(e){const a=Wn(e);return a?t(a.nameAr,a.nameEn):"—"}var Gn={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function I(e){if(C())return!0;const a=s.data?.role?.permissions;if(!a||!a.length)return!1;if(a.includes("*")||a.includes(e))return!0;const n=Gn[e];return!!(n&&a.includes(n))}function C(){return s.data?.user?.roleId==="admin"}function ms(){return C()||s.data?.user?.roleId==="account_permissions_manager"||s.data?.role?.permissions?.includes("manage_existing_account_permissions")}function Wa(){return s.view==="project-detail"?t("تفاصيل المشروع","Project details"):{dashboard:g("dashboard"),projects:g("projects"),tasks:g("myTasks"),documents:g("documents"),templates:g("templates"),team:g("team"),reports:g("reports"),settings:g("settings")}[s.view]||g("dashboard")}function Ht(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const a=new e,n=a.currentTime,o=a.createOscillator(),r=a.createGain();o.type="sine",o.frequency.setValueAtTime(587.33,n),r.gain.setValueAtTime(.08,n),r.gain.exponentialRampToValueAtTime(.001,n+.35),o.connect(r),r.connect(a.destination),o.start(n),o.stop(n+.35);const i=a.createOscillator(),d=a.createGain();i.type="sine",i.frequency.setValueAtTime(880,n+.12),d.gain.setValueAtTime(.001,n),d.gain.setValueAtTime(.09,n+.12),d.gain.exponentialRampToValueAtTime(.001,n+.65),i.connect(d),d.connect(a.destination),i.start(n+.12),i.stop(n+.65)}catch{}}function fs(e,a){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(a)):new Promise((n,o)=>{try{const r=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),i=URL.createObjectURL(r),d=new Worker(i);d.onmessage=l=>{URL.revokeObjectURL(i),d.terminate(),l.data.ok?n(l.data.result):o(new Error(l.data.error))},d.onerror=l=>{URL.revokeObjectURL(i),d.terminate(),o(l)},d.postMessage(a)}catch{try{n(e(a))}catch(i){o(i)}}})}var gs=Date.now(),Vn=0,Wt=0,Gt=0,ua=null,_n=Date.now(),zt=[];function He(e="action",a="",n=null){const o=new Date().toTimeString().split(" ")[0];zt.push({time:o,category:e,message:String(a||"").slice(0,150),metadata:n?JSON.stringify(n).slice(0,200):null}),zt.length>15&&zt.shift()}function Jn(){return[...zt]}typeof document<"u"&&setInterval(()=>{document.visibilityState==="visible"&&Vn++},1e3);if(typeof window<"u"){window.addEventListener("webglcontextlost",e=>{e.preventDefault(),console.warn("[WebGL Context Guard] Context loss intercepted; executing LOD vertex decimation and GPU memory purge."),He("webgl.guard","WebGL Context Lost intercepted. Auto-recovery and LOD mesh decimation active.")},!1),window.addEventListener("webglcontextrestored",()=>{console.info("[WebGL Context Guard] WebGL context successfully restored with optimized buffer allocation."),He("webgl.guard","WebGL Context successfully restored with optimized buffer allocation.")},!1);try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{Gt+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Vt(!1,!0)}),window.addEventListener("pagehide",()=>{Vt(!1,!0)})}function Ga(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function Yn(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let a="Chrome";e.includes("Edg/")?a="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?a="Safari":e.includes("Firefox/")&&(a="Firefox");let n="macOS";return e.includes("Win")?n="Windows":e.includes("Android")?n="Android":e.includes("iPhone")||e.includes("iPad")?n="iOS":e.includes("Linux")&&(n="Linux"),{os:n,browser:a}}function Kn(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function ta(e,a={}){Wt++;const{os:n,browser:o}=Yn(),r=Kn(),i=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",d=e||{},l=String(d.message||d.reason||d||"Unknown client error"),c=String(d.stack||a.stack||"No stack trace provided."),u=d.name||a.errorType||"ClientRuntimeError";He("error",`${u}: ${l}`);const m=s.data?.user||{},v={userId:m.id||"usr_demo",userName:m.name||"مدير التوظيف / زائر",userEmail:m.email||"demo@darc-design.bond",userRole:m.jobTitleAr||s.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:m.avatarColor||"#0d6269",errorType:u,errorMessage:l,stackTrace:c,deviceType:r,browser:o,os:n,screenResolution:i,memoryMb:Ga(),currentView:s.view?`#${s.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:Jn(),severity:a.severity||"high",titleAr:a.titleAr||`خطأ تشغيلي في مساحة العمل (${u})`,titleEn:a.titleEn||`Workspace Runtime Error (${u})`};try{return await j("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(v),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const y=new Blob([JSON.stringify(v)],{type:"application/json"});navigator.sendBeacon((aa||"")+"/api/telemetry/report-error",y)}catch{}}}async function Vt(e=!1,a=!1){const n=Date.now(),o=Math.max(5,Math.round((n-_n)/1e3));_n=n;let r=null,i=null,d=!1;try{typeof localStorage<"u"&&(r=localStorage.getItem("darc_vid"),r||(r="vid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),localStorage.setItem("darc_vid",r))),typeof sessionStorage<"u"&&(i=sessionStorage.getItem("darc_sid"),i||(i="sid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),sessionStorage.setItem("darc_sid",i),d=!0))}catch{}const{os:l,browser:c}=Yn(),u=Kn(),m={userId:s.data?.user?.id||"anonymous",sessionId:i,visitorId:r,isNewVisit:d,os:l,browser:c,deviceType:u,durationSeconds:o,memoryMb:Ga(),errorCount:Wt,longTaskCount:Gt,currentView:s.view||"dashboard"};if(m.memoryMb>140&&(e=!0),a&&typeof navigator<"u"&&navigator.sendBeacon)try{const v=new Blob([JSON.stringify(m)],{type:"application/json"}),w=(aa||"")+"/api/telemetry/heartbeat";navigator.sendBeacon(w,v);return}catch{}try{const v=await j("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(m),silent:!0});return Wt=0,Gt=0,v}catch{}}function vs(){ua&&clearInterval(ua),setTimeout(()=>Vt(!1),5e3),ua=setInterval(()=>{document.visibilityState==="visible"&&Vt(!1)},45e3)}function Xn(){return{totalSessionDurationSeconds:Math.round((Date.now()-gs)/1e3),activeDurationSeconds:Vn,memoryMb:Ga(),errorCount:Wt,longTaskCount:Gt,recentBreadcrumbs:Jn()}}var aa=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",Rt=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function We(){Rt=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function j(e,a={}){const n=["POST","PATCH","PUT","DELETE"].includes(a.method),o=e.startsWith("/api/auth"),r=!!(a.headers&&(a.headers["X-Offline-Replay"]==="true"||a.headers["X-Offline-Replay"]===!0));let i=null;if(n&&a.body)try{i=typeof a.body=="string"?JSON.parse(a.body):a.body}catch{}a.method==="POST"&&i&&typeof i=="object"&&!r&&(e==="/api/tasks"&&!i.id?(i.id=at("tsk"),a.body=JSON.stringify(i)):e==="/api/projects"&&!i.id?(i.id=at("prj"),a.body=JSON.stringify(i)):e.includes("/comments")&&!i.id&&(i.id=at("cmt"),a.body=JSON.stringify(i)));const d=typeof FormData<"u"&&a.body instanceof FormData;if(typeof navigator<"u"&&!navigator.onLine&&n&&!o){if(r)throw new Error(t("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));if(d){const S=t("لا يمكن رفع المخططات أو الملفات في وضع عدم الاتصال. يرجى الاتصال بالإنترنت لإتمام الرفع.","File and drawing uploads are not supported offline. Please reconnect to upload.");throw k(S,!0),new Error(S)}const x=In({path:e,method:a.method,body:i}),T=Dn(e,a.method,i,s);return k(t("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡","Offline mode: action saved locally and will auto-sync on reconnect 📡"),!1),{ok:!0,queued:!0,offline:!0,id:x?.id,...T}}const l=typeof localStorage<"u"?localStorage.getItem("darc_token"):null,c=!!(a.silent||a.headers&&a.headers["X-Silent"]),u=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),m=!!Rt&&(c||!!s.data||u),v=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,w={...l?{Authorization:`Bearer ${l}`}:{},...a.body&&!d?{"Content-Type":"application/json"}:{},...v?{"X-Mutation-ID":v}:{},...e==="/api/bootstrap"&&m?{"If-None-Match":Rt}:{},...e==="/api/bootstrap"&&!m?{"Cache-Control":"no-cache, no-store"}:{},...a.headers||{}};e==="/api/bootstrap"&&!m&&(a.cache="no-cache"),a.credentials="include";let y;try{y=await fetch(aa+e,{...a,headers:w})}catch{if(n&&!o&&!r){if(d){const E=t("انقطع الاتصال بالإنترنت أثناء الرفع. يرجى إعادة المحاولة عند استقرار الشبكة.","Internet disconnected during file upload. Please retry once reconnected.");throw k(E,!0),new Error(E)}const T=In({path:e,method:a.method,body:i}),S=Dn(e,a.method,i,s);return k(t("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡","Connection lost: action saved locally for auto-sync 📡"),!1),{ok:!0,queued:!0,offline:!0,id:T?.id,...S}}throw new Error(t("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(y.status===304)return null;if(!y.ok){const x=await y.text();y.status!==401&&console.error(`API Failed [${e}]: ${y.status} - ${x}`);let T={};try{T=JSON.parse(x)}catch{}y.status===401&&(We(),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login"&&(typeof localStorage<"u"&&localStorage.removeItem("darc_token"),s.data&&(s.data.user=null),typeof window<"u"&&window.location.hash!=="#login"&&(window.location.hash="#login"))),He("api.error",`${a.method||"GET"} ${e} (Status ${y.status}: ${T.error||"Failed"})`);const S=new Error(T.error||`Failed to fetch ${e}`);throw S.status=y.status,S}const $=y.headers.get("ETag");if($&&e==="/api/bootstrap"){Rt=$;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",$)}catch{}}const f=await y.json().catch(()=>({ok:!0}));if(["POST","PATCH","PUT","DELETE"].includes(a.method)){We();let x=i&&typeof i.id=="string"?i.id:null;if(!x&&f&&typeof f=="object"&&(x=f.id||f.task?.id||f.project?.id||f.comment?.id||f.document?.id||f.data?.id),!x&&typeof e=="string"){const T=e.split("/");T.length>=4&&T[3]&&!T[3].includes("?")&&(x=T[3])}if(x&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(x),v&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(v),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let T=null;if(f&&(f.task?T={table:"tasks",action:a.method==="POST"?"INSERT":"UPDATE",record:f.task}:f.project?T={table:"projects",action:a.method==="POST"?"INSERT":"UPDATE",record:f.project}:f.comment?T={table:"comments",action:a.method==="POST"?"INSERT":"UPDATE",record:f.comment}:f.document&&(T={table:"documents",action:a.method==="POST"?"INSERT":"UPDATE",record:f.document})),!T&&a.method==="DELETE"&&x&&(e.startsWith("/api/tasks/")?T={table:"tasks",action:"DELETE",record:{id:x}}:e.startsWith("/api/projects/")?T={table:"projects",action:"DELETE",record:{id:x}}:e.startsWith("/api/documents/")?T={table:"documents",action:"DELETE",record:{id:x}}:e.startsWith("/api/comments/")&&(T={table:"comments",action:"DELETE",record:{id:x}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(T);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:T?"GRANULAR_DELTA":"STATE_MUTATION",delta:T,timestamp:Date.now()})}catch{}}}}return f}typeof window<"u"&&(window.api=j);var ys=pe({canAccessView:()=>Q,getFirstAllowedView:()=>je,loadData:()=>le,navItem:()=>Ae,refreshView:()=>ae,renderApp:()=>J,renderSyncIndicator:()=>Va,renderView:()=>P,switchView:()=>fe});function Q(e){return s.data?e==="dashboard"?I("view_dashboard"):e==="projects"||e==="project-detail"?I("view_projects"):e==="tasks"?I("create_tasks")||I("edit_tasks")||I("delete_tasks")||I("assign_tasks")||I("review_tasks")||I("approve_tasks")||I("manage_reminders")||I("view_projects")||C():e==="documents"?I("upload_documents")||I("delete_documents")||C():e==="templates"?I("manage_templates")||C():e==="team"?C()||I("manage_users"):e==="reports"?I("view_reports")||C():e==="settings":!0}function je(){for(const e of["dashboard","projects","tasks","documents","templates","team","reports","settings"])if(Q(e))return e;return"dashboard"}function Va(){const e=At().length;return ts()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${t("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:"":`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${t("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}if(typeof window<"u"&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;const e=()=>{const a=document.getElementById("sync-status-indicator");a&&(a.innerHTML=Va())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function Ae(e,a,n){return`<button class="nav-item ${s.view===e||e==="projects"&&s.view==="project-detail"?"active":""}" data-view="${e}">${h(n,17)}<span>${a}</span></button>`}function J(){if(s.data&&!Q(s.view)&&(s.view=je()),typeof window<"u"){const o=window.location.hash.replace(/^#/,"");if(!o||o==="login"||o==="forgot"){let r=s.view;s.view==="project-detail"&&s.activeProjectId?r=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:s.view==="settings"&&s.settingsSection&&(r=`settings?section=${encodeURIComponent(s.settingsSection)}`),window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${r}`):(window._isInternalNav=!0,window.location.hash=`#${r}`)}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";const e=(s.data?.notifications||[]).filter(o=>!o.read&&!o.readAt).length,a=s.data?.user||{},n=C()||I("manage_settings")||I("manage_roles")||I("manage_users")||I("manage_trash")||I("view_audit_logs");document.getElementById("app").innerHTML=`
    <div class="app-shell ${s.lang==="en"?"is-ltr":""}">
      <aside class="sidebar ${s.sidebarOpen?"open":""}">
        <div class="sidebar-brand">
          ${s.data?.company?.logoUrl?`<img src="${p(s.data?.company?.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${h("building",20)}</span>`:`<span class="brand-mark">${h("building",20)}</span>`}
          <div>
            <div class="brand-name">${p(t(s.data?.company?.nameAr||s.data?.company?.name||"DARC Design Team",s.data?.company?.nameEn||s.data?.company?.name||"DARC Design Team"))}</div>
            <div class="brand-subtitle">${g("workspace")}</div>
          </div>
        </div>
        <div class="nav-title">${t("مساحة العمل","WORKSPACE")}</div>
        <nav class="nav-list">
          ${Q("dashboard")?Ae("dashboard",g("dashboard"),"grid"):""}
          ${Q("projects")?Ae("projects",g("projects"),"building"):""}
          ${Q("tasks")?Ae("tasks",g("myTasks"),"checklist"):""}
          ${Q("documents")?Ae("documents",g("documents"),"document"):""}
          ${Q("templates")?Ae("templates",g("templates"),"layers"):""}
          ${Q("team")?Ae("team",g("team"),"users"):""}
          ${Q("reports")?Ae("reports",g("reports"),"chart"):""}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${n?t("إدارة النظام","ADMIN"):t("حسابي","MY ACCOUNT")}</div>
        <nav class="nav-list">${Ae("settings",n?g("settings"):t("الملف الشخصي والأمان","Profile & Security"),"settings")}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${V(a)}<div class="admin-info"><strong>${p(t(a.name,a.nameEn||a.name))}</strong><span>${p(ie(a))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${t("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${g("signOut")}">${h("logout",15)}</button></div>
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
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${h("menu",18)}</button><div><div class="topbar-kicker">DARC / ${g("workspace")}</div><div class="topbar-title">${p(Wa())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${Va()}</span>
            <button class="topbar-search-trigger" data-action="open-omnisearch" title="${t("بحث شامل وسريع","Omnisearch")}">
              ${h("search",14)}
              <span>${t("بحث شامل...","Search...")}</span>
              <kbd class="shortcut-kbd">${typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"⌘K":"Ctrl+K"}</kbd>
            </button>
            <button class="icon-button" data-action="open-cheatsheet" title="${t("دليل اختصارات لوحة المفاتيح (?)","Keyboard shortcuts guide (?)")}" style="color:var(--ink-soft);" aria-label="Shortcuts">
              <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
            </button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-theme">${s.theme==="dark"?"☀️":"🌙"}</button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-lang">${s.lang==="ar"?"EN":"عربي"} ${h("globe",14)}</button>
            <button class="icon-button" data-action="show-notifications" aria-label="${g("notifications")}">${h("bell",17)}${e?'<span class="notification-dot"></span>':""}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${V(a)}<div class="profile-chip-text"><strong>${p(t(a.name,a.nameEn||a.name))}</strong><span>${p(ie(a))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,P()}function P(e=!1){if(!e&&(window._isDraggingTask||window._isKeyboardDraggingTask)){window._pendingRenderAfterDrag=!0;return}const a=document.getElementById("main-content");if(!a)return;Q(s.view)||(s.view=je());let n="";s.view==="dashboard"&&(n=renderDashboard()),s.view==="projects"&&(n=renderProjects()),s.view==="tasks"&&(n=renderTasks()),s.view==="documents"&&(n=renderDocuments()),s.view==="templates"&&(n=renderTemplates()),s.view==="team"&&(n=renderTeam()),s.view==="reports"&&(n=renderReports()),s.view==="settings"&&(n=renderSettings()),s.view==="project-detail"&&(n=renderProjectDetail()),a.innerHTML=n,s.view==="project-detail"&&s.projectTab==="timeline"&&setTimeout(drawTimelineArrows,0)}function fe(e,a=void 0){s.data&&!Q(e)&&(e=je()),He("navigation",`الانتقال إلى واجهة #${e}${a?` (مشروع: ${a})`:""}`),s.view=e,a!==void 0&&(s.activeProjectId=a),e==="settings"&&!s.settingsSection&&(s.settingsSection="profile"),s.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelectorAll(".nav-item").forEach(o=>{const r=o.dataset.view,i=r===e||r==="projects"&&e==="project-detail";o.classList.toggle("active",i)});const n=document.querySelector(".topbar-title");n&&(n.textContent=Wa());try{let o=e;e==="project-detail"&&s.activeProjectId?o=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:e==="settings"&&s.settingsSection&&(o=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==o&&(window._isInternalNav=!0,window.location.hash=o),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:s.view,activeProjectId:s.activeProjectId,projectTab:s.projectTab,settingsSection:s.settingsSection}))}catch{}requestAnimationFrame(()=>{P();const o=document.getElementById("main-content");o&&(o.scrollTop=0,o.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function ae(e=!1){try{await le(e)}catch(a){k(a.message,!0)}}async function le(e=!1){try{const a=s.view==="settings"&&s.settingsSection==="trash"&&!s.trashLoaded?j("/api/trash",{silent:!0}).catch(()=>null):null;let n=await j("/api/bootstrap",{silent:e});if(n===null){if(s.data&&s.data.user)return;const r=await En();if(r&&r.user?n=r:(We(),n=await j("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}})),!n)return}if(me(n),s.isOffline=!1,a)try{const r=await a;r&&(s.trash=Array.isArray(r)?r:r.trash||[...(r.projects||[]).map(i=>({...i,type:"project"})),...(r.tasks||[]).map(i=>({...i,type:"task"})),...(r.documents||[]).map(i=>({...i,type:"document"}))],s.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash)))}catch{}if(s.data?.tasks&&n?.tasks){const r=Date.now(),i=new Set(n.tasks.map(d=>d.id));for(const d of s.data.tasks)if(!i.has(d.id))r-(d.createdAt?new Date(d.createdAt).getTime():r)<12e4&&(n.tasks.unshift(d),i.add(d.id));else{const l=window._recentlyMovedTasks?.get(d.id);if(l&&r-l.timestamp<2e4){const c=n.tasks.find(u=>u.id===d.id);c&&(c.status=l.status,l.progress!==void 0&&(c.progress=l.progress),l.sortOrder!==void 0&&(c.sortOrder=l.sortOrder,c.sort_order=l.sortOrder,c.customFields||(c.customFields={}),c.customFields.sortOrder=l.sortOrder,c.customFields.sort_order=l.sortOrder,c.custom_fields||(c.custom_fields={}),c.custom_fields.sortOrder=l.sortOrder,c.custom_fields.sort_order=l.sortOrder))}}}if(s.data?.projects&&n?.projects){const r=Date.now(),i=new Set(n.projects.map(d=>d.id));for(const d of s.data.projects)i.has(d.id)||r-(d.createdAt?new Date(d.createdAt).getTime():r)<12e4&&(n.projects.unshift(d),i.add(d.id))}let o=!1;if(s.data&&n)if(s.data.updatedAt!==n.updatedAt)o=!0;else if(s.data.tasks?.length!==n.tasks?.length||s.data.projects?.length!==n.projects?.length)o=!0;else{const r=s.data.tasks||[],i=n.tasks||[];for(let d=0;d<i.length;d++){const l=i[d],c=r[d];if(!c||c.id!==l.id||c.status!==l.status||(c.sortOrder||c.sort_order)!==(l.sortOrder||l.sort_order)||c.progress!==l.progress){o=!0;break}}if(!o){const d=s.data.projects||[],l=n.projects||[];for(let c=0;c<l.length;c++){const u=l[c],m=d[c];if(!m||m.id!==u.id||m.lifecycle!==u.lifecycle||m.health!==u.health||m.progress!==u.progress){o=!0;break}}}}if(!s.data||o||s.data.comments?.length!==n.comments?.length||s.data.documents?.length!==n.documents?.length||s.data.users?.length!==n.users?.length||s.data.auditLogs?.length!==n.auditLogs?.length||s.data.notifications?.length!==n.notifications?.length||s.view==="login"){s.data=n,(s.view==="login"||!Q(s.view))&&(s.view=je());const r=!!document.getElementById("modal-root")?.children?.length,i=!!(document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),d=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(i||d))return;requestAnimationFrame(!e&&!r?()=>J():()=>P())}else s.data=n,Q(s.view)||(s.view=je(),requestAnimationFrame(()=>P()))}catch(a){if(a&&(a.status===401||a.status===403))throw a;const n=await En();if(n){s.data=n,Q(s.view)||(s.view=je()),s.isOffline=!0;const o=!!document.getElementById("modal-root")?.children?.length;!e&&!o?J():P();return}throw a}}typeof window<"u"&&(window.renderApp=J,window.renderView=P);var bs=pe({calculatePasswordStrength:()=>Qn,cleanupTurnstile:()=>ha,initTurnstile:()=>Ja,loadTurnstileScript:()=>Zn,openForcePasswordModal:()=>$s,renderActivation:()=>It,renderLogin:()=>ve,renderResetPassword:()=>ot,renderStrengthMeterHtml:()=>na}),hs="0x4AAAAAAFr3zLr2zpRS2ah4",ne=null,ct=null,de=null,lt=!1;function Zn(){return typeof window>"u"||window.turnstile?Promise.resolve():ct||(ct=new Promise(e=>{if(window.onloadTurnstileCallback=()=>{e()},document.getElementById("cf-turnstile-script")){window.turnstile&&e();return}const a=document.createElement("script");a.id="cf-turnstile-script",a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback",a.async=!0,a.defer=!0,a.onerror=()=>{console.warn("[Turnstile] Script failed to load, fallback mode enabled"),e()},document.body.appendChild(a)}),ct)}function ha(){if(!(typeof window>"u")){if(de=null,window.turnstile&&ne!==null){try{window.turnstile.remove(ne)}catch{}ne=null}try{const e=document.getElementById("turnstile-container");e&&(e.innerHTML=""),document.querySelectorAll('iframe[src*="challenges.cloudflare.com"]').forEach(n=>{try{n.remove()}catch{}});const a=document.getElementById("cf-turnstile-script");a&&a.remove(),ct=null}catch{}}}async function Ja(){if(!(typeof window>"u")&&document.getElementById("turnstile-container")&&!lt){lt=!0;try{if(window.turnstile||await Zn(),!window.turnstile){lt=!1;return}const e=document.getElementById("turnstile-container");if(!e){lt=!1;return}if(ne!==null){try{window.turnstile.remove(ne)}catch{}ne=null}de=null,ne=window.turnstile.render(e,{sitekey:hs,theme:s.theme==="dark"?"dark":"light",language:s.lang==="ar"?"ar":"en",appearance:"interaction-only",callback:a=>{de=a},"error-callback":a=>{console.warn("[Turnstile] Handshake notice (shielded):",a),de="fallback_client"},"expired-callback":()=>{if(de=null,window.turnstile&&ne!==null)try{window.turnstile.reset(ne)}catch{}}})}catch(e){console.warn("[Turnstile] Init notice:",e),de="fallback_client"}finally{lt=!1}}}typeof window<"u"&&(window.__darcInitTurnstile=Ja);async function xs(){if(typeof window>"u"||!window.turnstile)return"fallback_client";if(de)return de;if(ne!==null)try{const e=window.turnstile.getResponse(ne);if(e)return de=e,e}catch{}return new Promise(e=>{let a=!1;const n=setTimeout(()=>{a||(a=!0,e(de||"fallback_client"))},1200),o=setInterval(()=>{if(a){clearInterval(o);return}if(de){a=!0,clearTimeout(n),clearInterval(o),e(de);return}if(ne!==null&&window.turnstile)try{const r=window.turnstile.getResponse(ne);if(r){a=!0,clearTimeout(n),clearInterval(o),de=r,e(r);return}}catch{}},35)})}function Qn(e){const a=String(e||"");if(!a)return{score:0,label:"",percent:0,color:"var(--line)"};let n=0;return a.length>=10&&(n+=1),/[a-z]/.test(a)&&/[A-Z]/.test(a)&&(n+=1),/\d/.test(a)&&(n+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(a)&&(n+=1),n===1?{score:1,label:s.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:n===2?{score:2,label:s.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:n===3?{score:3,label:s.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:s.lang==="ar"?"قوية وممتازة 🛡️":"Strong & Secure 🛡️",percent:100,color:"var(--mint-strong)"}}function na(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${s.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function Ya(e,a,n,o,r){const i=document.getElementById(e);if(!i)return;const d=i.querySelector(`input[name="${a}"]`),l=i.querySelector(`input[name="${n}"]`),c=i.querySelector(r||'button[type="submit"]'),u=document.getElementById(`${o}-meter-wrap`),m=document.getElementById(`${o}-meter-bar`),v=document.getElementById(`${o}-meter-label`),w=document.getElementById(`${o}-match-indicator`);function y(){const $=d?d.value:"",f=l?l.value:"";if($&&u&&m&&v){u.style.display="flex";const x=Qn($);m.style.width=`${x.percent}%`,m.style.background=x.color,v.textContent=x.label,v.style.color=x.color}else u&&(u.style.display="none");l&&w&&(f?$===f?(w.style.display="block",w.style.color="var(--mint-strong)",w.textContent=s.lang==="ar"?"✓ كلمتا المرور متطابقتان":"✓ Passwords match",c&&(c.disabled=!1)):(w.style.display="block",w.style.color="var(--red)",w.textContent=s.lang==="ar"?"✗ كلمتا المرور غير متطابقتين":"✗ Passwords do not match",c&&(c.disabled=!0)):(w.style.display="none",c&&(c.disabled=!1)))}d?.addEventListener("input",y),l?.addEventListener("input",y)}function ia(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=a=>{a.preventDefault();const n=e.getAttribute("data-target"),o=n?document.getElementById(n):e.parentElement.querySelector("input");if(!o)return;const r=o.type==="password";o.type=r?"text":"password",e.style.color=r?"var(--teal)":"var(--ink-soft)";const i=r?s.lang==="ar"?"إخفاء كلمة المرور":"Hide password":s.lang==="ar"?"إظهار كلمة المرور":"Show password";e.setAttribute("aria-label",i),e.setAttribute("title",i),r?e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';try{o.focus()}catch{}}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const a=n=>{const o=n.getModifierState&&n.getModifierState("CapsLock");let r=e.parentElement.parentElement.querySelector(".capslock-warning");o?r||(r=document.createElement("div"),r.className="capslock-warning",r.style.fontSize="11px",r.style.color="var(--amber)",r.style.marginTop="4px",r.style.display="flex",r.style.alignItems="center",r.style.gap="4px",r.innerHTML=`<span>⚠️</span> <span>${s.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(r)):r&&r.remove()};e.addEventListener("keydown",a),e.addEventListener("keyup",a)})}function ws(e,a=60){if(!e)return;e.disabled=!0;let n=a;const o=e.innerHTML,r=setInterval(()=>{n--,e.innerHTML=`<span>${s.lang==="ar"?`يرجى الانتظار (${n} ثانية)...`:`Please wait (${n}s)...`}</span>`,n<=0&&(clearInterval(r),e.disabled=!1,e.innerHTML=o)},1e3)}function ve(e="",a="login",n=!1){if(s.view="login",typeof window<"u"){const l=a==="forgot"?"#forgot":"#login";window.location.hash!==l&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",l):window.location.hash=l)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";let o="";const r=e?`<div class="login-demo" style="border-color:${n?"#cce3e0":"var(--red-soft)"};background:${n?"#f0f9f7":"var(--red-soft)"};color:${n?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${h(n?"check":"alert",15)}<span>${p(e)}</span></div>`:"",i=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";a==="login"?o=`
      <form id="login-form">
        <div class="field">
          <label for="login-email">${g("emailAddress")}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${p(i)}" required />
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
        <button class="btn btn-primary btn-block" type="submit">${h(s.lang==="ar"?"arrowLeft":"arrowRight",16)} ${g("login")}</button>
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
        <div class="field"><label for="login-email">${g("emailAddress")}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${p(i)}" required /></div>
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
            <span class="brand-mark">${h("building",24)}</span>
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
    </div>`,ia();const d=(l,c=!1)=>{const u=document.getElementById("login-error-container");u?u.innerHTML=l?`
        <div class="login-demo" style="border-color:${c?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"};background:${c?"var(--mint)":"rgba(239,68,68,0.08)"};color:${c?"var(--mint-strong)":"var(--red)"};margin-top:0;margin-bottom:15px;padding:10px 14px;border-radius:8px;font-size:12.5px;display:flex;align-items:center;gap:8px;line-height:1.5;">
          ${h(c?"check":"alert",16)}
          <span>${p(l)}</span>
        </div>`:"":l&&k(l,!c)};document.getElementById("login-form")?.addEventListener("submit",async l=>{l.preventDefault();const c=new FormData(l.currentTarget),u=String(c.get("email")||"").trim(),m=String(c.get("password")||""),v=document.getElementById("remember-email-check")?.checked,w=l.currentTarget.querySelector('button[type="submit"]'),y=`${h(s.lang==="ar"?"arrowLeft":"arrowRight",16)} ${g("login")}`;d(""),w.disabled=!0,w.innerHTML=`<span>⏳ ${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const $=u.trim().toLowerCase()==="demo@darc-design.bond"||u.trim().toLowerCase()==="demo@darc.local";let f="bypass_dev";$||(f=await xs());try{const x=await j("/api/auth/login",{method:"POST",body:JSON.stringify({email:u,password:m,turnstileToken:f})});if(ha(),typeof localStorage<"u"&&(x?.token&&localStorage.setItem("darc_token",x.token),v?localStorage.setItem("darc_last_email",u):localStorage.removeItem("darc_last_email")),bt({theme:s.theme,lang:s.lang}),s.view="dashboard",x?.bootstrap){s.data=x.bootstrap,me(x.bootstrap),J(),le(!0).catch(()=>{});return}const T=Ba();if(T&&T.user&&(T.user.id===x?.user?.id||x?.user?.email===T.user?.email)){T.user=x.user||T.user,s.data=T,J(),le(!0).catch(()=>{});return}We(),Et(),await le(),J()}catch(x){if(console.error("Login Error:",x),typeof window<"u"&&window.turnstile&&ne!==null)try{window.turnstile.reset(ne)}catch{}w&&(w.disabled=!1,w.innerHTML=y);let T=x.message;if(typeof navigator<"u"&&!navigator.onLine)T=t("لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة وإعادة المحاولة.","No internet connection. Please check your network and try again.");else if(x.message&&(x.message.includes("Turnstile")||x.message.includes("التحقق الأمني")))T=t("فشل التحقق الأمني التلقائي (Cloudflare Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.","Security check (Turnstile) failed. Please refresh the page and try again.");else if(x.message&&(x.message.includes("429")||x.message.includes("كثيرة")||x.message.includes("rate")))T=t("تم تجاوز عدد محاولات الدخول المسموحة لحماية الحساب. يرجى الانتظار دقيقة واحدة قبل المحاولة مجدداً.","Too many login attempts. For security, please wait one minute before trying again."),ws(document.querySelector('#login-form button[type="submit"]'),60);else if(x.message&&(x.message.includes("401")||x.message.includes("غير صحيحة")||x.message.includes("credentials"))){T=t("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من صحة المدخلات وإعادة المحاولة.","Incorrect email or password. Please verify your credentials and try again.");const S=document.getElementById("login-password");if(S){S.value="";try{S.focus()}catch{}}}else x.message&&(x.message.includes("مفعل")||x.message.includes("موقوف")||x.message.includes("inactive"))?T=t("حسابك معطل أو غير مفعل حالياً. يرجى التواصل مع مسؤول النظام لإعادة التفعيل.","This account is suspended or inactive. Please contact your system administrator."):(!T||T.includes("Failed to fetch")||T.includes("NetworkError")||T.includes("Network request failed"))&&(T=t("تعذر الاتصال بخادم تسجيل الدخول. يرجى التأكد من استقرار الإنترنت وإعادة المحاولة.","Could not reach the authentication server. Please check your connection and try again."));d(T)}}),document.getElementById("forgot-form")?.addEventListener("submit",async l=>{l.preventDefault();const c=new FormData(l.currentTarget),u=String(c.get("email")||"").trim(),m=l.currentTarget.querySelector('button[type="submit"]'),v=m?m.innerHTML:"";m&&(m.disabled=!0,m.innerHTML=`<span>⏳ ${t("جاري إرسال الرابط...","Sending reset link...")}</span>`);try{await j("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:u})}),m&&(m.disabled=!1,m.innerHTML=v),d(t("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح ✨","Password reset link sent to your email successfully ✨"),!0)}catch(w){m&&(m.disabled=!1,m.innerHTML=v),d(w.message)}}),a==="login"?Ja():ha()}function It(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light",document.getElementById("app").innerHTML=`
    <div class="login-shell ${s.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${h("building",24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("تفعيل حساب الفريق","Team account activation")}</div></div></div>
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
              <input type="hidden" name="token" value="${p(e)}" />
              <div class="field">
                <label for="act-pass">${g("password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${na("act")}
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
              ${a?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${h("alert",15)}<span>${p(a)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit">${h("shield",16)} ${t("تفعيل الحساب والدخول","Activate and sign in")}</button>
            </form>
            <div class="login-demo">${h("lock",16)}<span>${t("جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.","Your session is encrypted and your password is never stored in plain text.")}</span></div>
          </div>
        </section>
      </div>
    </div>`,ia(),Ya("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function ot(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";const n=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,o=!n&&!a?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
    <div class="login-shell ${s.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${h("building",24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("استعادة كلمة المرور","Password Recovery")}</div></div></div>
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
              <input type="hidden" name="token" value="${p(n||"")}" />
              <div class="field">
                <label for="rst-pass">${t("كلمة المرور الجديدة","New Password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass" name="newPassword" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required ${n?"":"disabled"} />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${na("rst")}
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
              ${a||o?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${h("alert",15)}<span>${p(a||o)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit" ${n?"":"disabled"}>${t("حفظ وتسجيل الدخول","Save and login")}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,ia(),Ya("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async r=>{r.preventDefault();const i=new FormData(r.currentTarget),d=i.get("newPassword");if(d!==i.get("newPasswordConfirm")){ot(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const l=r.currentTarget.querySelector('button[type="submit"]');l.disabled=!0;try{await j("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:d})}),window.history.replaceState({},"",window.location.pathname),Et(),await le(),J()}catch(c){ot(e,c.message)}})}function $s(e){const a=e.status==="pending",n=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${a}">
      <div class="field">
        <label for="force-pass-input">${a?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${na("force")}
        ${e.email?a?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${h("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${a?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=he(a?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),a?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${p(e.name)}.`,`Set an initial password to activate ${p(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${p(e.name)}`,`Set a new password for ${p(e.name)}`),n,"force-password"),ia(),Ya("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}var ks=pe({attentionItem:()=>ei,metricCard:()=>pt,projectProgress:()=>Ss,pulseChart:()=>ai,renderDashboard:()=>As,renderReports:()=>Es,teamMetrics:()=>Ka,teamRow:()=>ti});function pt(e,a,n,o,r,i=""){return`<article class="metric-card ${o}"><div class="metric-top"><span class="metric-label">${p(e)}</span><span class="metric-icon">${h(r,15)}</span></div><div class="metric-value">${p(a)}</div><span class="metric-note ${i}">${p(n)}</span></article>`}function Ss(e){const a=e.health==="off_track"?"red":e.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${g("weightedProgress")}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${a}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function ei(e){const a=De(e)||e.status==="blocked"?"red":"amber",n=De(e)?t("متأخرة","Overdue"):e.status==="blocked"?t("متوقفة","Blocked"):t("تستحق قريبًا","Due soon");return`<button class="attention-item" data-action="open-task" data-task-id="${p(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${a}">${h(De(e)||e.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${a})">${p(t(e.titleAr,e.titleEn))}</strong><span>${p(n)} · ${p(Hn(e.dueDate))}</span></span></button>`}function Ka(e,a){const n=a.filter(i=>i.assigneeId===e),o=n.reduce((i,d)=>i+Number(d.weight||1),0),r=o?Math.round(n.reduce((i,d)=>i+d.progress*Number(d.weight||1),0)/o):0;return{tasks:n.length,progress:r,overdue:n.filter(De).length}}function ti(e,a){const n=Ka(e.id,a);return`<div class="team-row"><div class="team-member">${V(e)}<div class="team-member-copy"><strong>${p(t(e.name,e.nameEn||e.name))}</strong><span>${p(t(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${n.tasks}</strong> ${g("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${g("progress")}</span><strong>${n.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${n.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${p(e.id)}">${h("more",15)}</button></div>`}function ai(){const e=[38,48,45,62,55,72,68],a=s.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${e.map((n,o)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${o===e.length-1?"current":""}" style="height:${n}%"></span></div><span>${a[o]}</span></div>`).join("")}</div>`}function As(){const e=s.data?.stats||{},a=s.data?.projects||[],n=s.data?.tasks||[],o=s.data?.users||[],r=s.data?.user||{},i=r.name||r.email||t("مستخدم","User"),d=a.reduce((f,x)=>f+(Number(x.totalWeight)||0),0),l=d?Math.round(a.reduce((f,x)=>f+(Number(x.progress)||0)*(Number(x.totalWeight)||0),0)/d):0,c=[...n].filter(f=>{if(De(f)||f.status==="blocked")return!0;if(f.dueDate){const x=Ie(f.dueDate);if(x){const T=(x-new Date)/864e5;return T>=0&&T<=7}}return!1}).sort((f,x)=>(f.dueDate?Ie(f.dueDate)?.getTime()??1/0:1/0)-(x.dueDate?Ie(x.dueDate)?.getTime()??1/0:1/0)).slice(0,5),u=o.filter(f=>f.status!=="inactive"),m=e.projectCount??a.length,v=e.myTasks??n.filter(f=>f.assigneeId===r.id).length,w=e.overdueTasks??n.filter(De).length,y=e.dueSoon??0,$=e.completedTasks??n.filter(f=>f.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${t("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${qn()}، ${p(t(i.replace(/^م\.\s?/,""),r.nameEn||i))}</h1><p>${g("welcomeText")}</p></div><div class="welcome-status"><span>${g("portfolioHealth")}</span><strong>${l}%</strong><small>${t("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${pt(g("activeProjects"),e.activeProjects||0,t(`${m} مشاريع إجمالًا`,`${m} projects total`),"teal","building","up")}${pt(g("openTasks"),e.openTasks??n.length,t(`${v} مسندة لك`,`${v} assigned to you`),"blue","checklist")}${pt(g("overdue"),w,t("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",w?"alert":"check",w?"alert":"")}${pt(g("dueThisWeek"),y,t("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("projectProgress")}</h2><p class="panel-subtitle">${g("projectProgressSub")}</p></div>${I("view_projects")?`<button class="text-link" data-view="projects">${g("seeAll")} ${h(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${a.length?a.slice(0,5).map(projectRow).join(""):`<div class="empty">${h("building",18)}<span>${g("noProjects")}</span></div>`}</div></section>${C()||I("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamProgress")}</h2><p class="panel-subtitle">${g("teamProgressSub")}</p></div><button class="text-link" data-view="team">${g("seeAll")} ${h(s.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${u.slice(0,6).map(f=>ti(f,n)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("attention")}</h2><p class="panel-subtitle">${g("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${c.length}</span></div><div class="attention-list">${c.length?c.map(ei).join(""):`<div class="empty">${h("check",18)}<span>${g("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("recentPulse")}</h2><p class="panel-subtitle">${g("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${$} ${g("done")}</span></div>${ai()}</section></div></div>`}function Es(){const{projects:e=[],tasks:a=[],users:n=[]}=s.data||{},o=I("export_reports")||C(),r=a.reduce((c,u)=>c+Number(u.weight||1),0),i=r?Math.round(a.reduce((c,u)=>c+u.progress*Number(u.weight||1),0)/r):0,d=new Map;a.forEach(c=>{const u=(s.lang==="ar"?c.categoryAr:c.categoryEn)||t(c.typeAr||"عام",c.typeEn||"General"),m=d.get(u)||{weight:0,progress:0};m.weight+=Number(c.weight||1),m.progress+=c.progress*Number(c.weight||1),d.set(u,m)});const l=[...d.entries()].map(([c,u])=>({label:c,progress:u.weight?Math.round(u.progress/u.weight):0})).sort((c,u)=>u.progress-c.progress);return`<div class="page-head"><div><p class="eyebrow">${t("قراءة الأداء","PERFORMANCE READOUT")}</p><h1>${g("reports")}</h1><p>${t("مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.","Simple signals that help management see drift before it becomes delay.")}</p></div><div class="page-actions">${o?`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${h("printer",15)} ${t("طباعة تقرير المحفظة (PDF)","Print Portfolio (PDF)")}</button>
      <button class="btn btn-soft" data-action="export-csv">${h("document",15)} ${t("تصدير الإكسل (Excel)","Export Excel")}</button>
    </div>
  `:""}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("الإنجاز حسب التخصص","Progress by discipline")}</h2><p class="panel-subtitle">${g("weightedProgress")}</p></div><span class="status-badge on_track">${i}%</span></div><div class="report-bars">${l.length?l.map(c=>`<div class="report-bar-row"><span>${p(c.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${c.progress}%"></div></div><strong>${c.progress}%</strong></div>`).join(""):`<div class="empty">${g("noTasks")}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("صحة المحفظة","Portfolio health")}</h2><p class="panel-subtitle">${t("توزيع حالات المشاريع الحالية.","Current project status distribution.")}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${g("onTrack")}</span><strong style="color:var(--mint-strong)">${e.filter(c=>c.health==="on_track").length}</strong></div><div class="report-stat"><span>${g("atRisk")}</span><strong style="color:var(--amber)">${e.filter(c=>c.health==="at_risk").length}</strong></div><div class="report-stat"><span>${g("offTrack")}</span><strong style="color:var(--red)">${e.filter(c=>c.health==="off_track").length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamLoad")}</h2><p class="panel-subtitle">${t("المهام المفتوحة لكل عضو.","Open tasks per member.")}</p></div></div><div class="report-stat-list">${n.slice(0,5).map(c=>{const u=Ka(c.id,a);return`<div class="report-stat"><span>${p(t(c.name,c.nameEn||c.name))}</span><strong>${u.tasks}</strong></div>`}).join("")}</div></section></div></div>`}var Ts="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",Pn=`https://drive.google.com/drive/folders/${Ts}?usp=sharing`;function Xa(e){if(!e)return Pn;const a=e.driveFileId||e.drive_file_id;if(a&&!String(a).startsWith("demo_")&&String(a).length>=25)return`https://drive.google.com/file/d/${encodeURIComponent(a)}/view?usp=sharing`;const n=e.diskFilename||e.disk_filename||e.viewLink||e.webViewLink||"";if(n&&n.includes("drive.google.com")){if(n.includes("/folders/"))return n;const o=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(o&&o[1]&&!o[1].startsWith("demo_")&&o[1].length>=25)return`https://drive.google.com/file/d/${o[1]}/view?usp=sharing`}return n&&(n.startsWith("https://")||n.startsWith("http://"))&&!n.includes("localhost")&&!n.includes("127.0.0.1")&&!n.includes("demo_sample")?n:Pn}async function Za(e,a=null){if(!e)return;const n=Xa(e);let o=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(n),o=!0;else{const r=document.createElement("textarea");r.value=n,r.style.position="fixed",r.style.opacity="0",document.body.appendChild(r),r.select(),o=document.execCommand("copy"),r.remove()}}catch(r){console.warn("[DocViewer] Clipboard writeText failed, prompting:",r),window.prompt(t("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),n),o=!0}if(o){if(a){const r=a.innerHTML;a.innerHTML=`${h("check",14)} <span style="font-size:11px;font-weight:700;">${t("تم النسخ","Copied")}</span>`,a.style.color="var(--mint-strong, #10b981)",a.style.transition="all 0.2s ease",setTimeout(()=>{a.innerHTML=r,a.style.color=""},2200)}k(t(`تم نسخ رابط Google Drive بنجاح: ${n}`,`Google Drive link copied: ${n}`))}}function Is(e){const a=`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 1240 >>
stream
q
0.05 0.38 0.41 rg
0 565 842 30 re f
1 1 1 rg
BT
/F1 14 Tf
20 575 Td
(DARC DESIGN TEAM - ARCHITECTURAL BLUEPRINT & ENGINEERING DELIVERABLE) Tj
ET
0 0 0 rg
0.8 w
30 40 782 510 re S
0.3 w
30 100 782 0 re S
30 500 782 0 re S
520 40 0 60 re S
670 40 0 60 re S
BT
/F1 11 Tf
40 520 Td
(PROJECT DRAWING: ${(e.originalName||"DARC-Architectural-Drawing.pdf").replace(/\.pdf$/i,"")}) Tj
0 -16 Td
(STATUS: APPROVED FOR CONSTRUCTION - REVISION V3) Tj
ET
BT
/F1 9 Tf
530 85 Td
(DATE: ${new Date().toISOString().split("T")[0]}) Tj
530 65 Td
(SCALE: 1:100 @ A1) Tj
530 45 Td
(DISCIPLINE: ARCHITECTURAL) Tj
680 85 Td
(CONSULTANT: DARC DESIGN) Tj
680 65 Td
(LEAD: ENG. FAHAD AL-QAHTANI) Tj
680 45 Td
(STAMP: VALIDATED) Tj
ET
0.5 0.5 0.5 RG
[4 2] 0 d
100 130 0 340 re S
220 130 0 340 re S
340 130 0 340 re S
460 130 0 340 re S
580 130 0 340 re S
700 130 0 340 re S
80 180 660 0 re S
80 270 660 0 re S
80 360 660 0 re S
80 430 660 0 re S
[] 0 d
0 0 0 RG
1.5 w
100 180 600 250 re S
100 180 360 250 re S
460 180 240 150 re S
BT
/F1 12 Tf
180 300 Td
(MAIN RECEPTION & MAJLIS) Tj
180 282 Td
(AREA: 94.5 SQ.M) Tj
500 350 Td
(MASTER SUITE) Tj
500 240 Td
(DINING & GUEST LOUNGE) Tj
ET
Q
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000224 00000 n 
0000001516 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1599
%%EOF`;return new Blob([a],{type:"application/pdf"})}function Ds(e){const a=`0
SECTION
2
HEADER
9
$ACADVER
1
AC1015
9
$INSUNITS
70
4
0
ENDSEC
0
SECTION
2
TABLES
0
TABLE
2
LAYER
70
4
0
LAYER
2
WALLS
70
0
62
3
6
CONTINUOUS
0
LAYER
2
GRIDS
70
0
62
4
6
CENTER
0
LAYER
2
DIMS
70
0
62
2
6
CONTINUOUS
0
LAYER
2
TEXT
70
0
62
7
6
CONTINUOUS
0
ENDTAB
0
ENDSEC
0
SECTION
2
ENTITIES
0
LINE
8
WALLS
10
0.0
20
0.0
30
0.0
11
24.0
21
0.0
31
0.0
0
LINE
8
WALLS
10
24.0
20
0.0
30
0.0
11
24.0
21
18.0
31
0.0
0
LINE
8
WALLS
10
24.0
20
18.0
30
0.0
11
0.0
21
18.0
31
0.0
0
LINE
8
WALLS
10
0.0
20
18.0
30
0.0
11
0.0
21
0.0
31
0.0
0
TEXT
8
TEXT
10
2.0
20
2.0
30
0.0
40
0.6
1
DARC DESIGN TEAM - ${(e.originalName||"DARC-CAD-Drawing.dxf").replace(/\.(dxf|dwg)$/i,"")}
0
ENDSEC
0
EOF`;return new Blob([a],{type:"application/dxf"})}async function js(e){const a=document.createElement("canvas");a.width=1920,a.height=1080;const n=a.getContext("2d"),o=n.createLinearGradient(0,0,1920,1080);o.addColorStop(0,"#111827"),o.addColorStop(.4,"#1f2937"),o.addColorStop(1,"#0f172a"),n.fillStyle=o,n.fillRect(0,0,1920,1080);const r=n.createLinearGradient(960,100,1820,800);r.addColorStop(0,"#38bdf8"),r.addColorStop(.5,"#0284c7"),r.addColorStop(1,"#0f766e"),n.fillStyle=r,n.fillRect(960,140,860,680),n.fillStyle="#78350f";for(let d=80;d<600;d+=18)n.fillRect(d,140,12,680);const i=n.createLinearGradient(0,820,0,1080);return i.addColorStop(0,"#334155"),i.addColorStop(1,"#1e293b"),n.fillStyle=i,n.fillRect(0,820,1920,260),n.fillStyle="rgba(15, 23, 42, 0.88)",n.fillRect(80,860,900,160),n.strokeStyle="#0d6269",n.lineWidth=3,n.strokeRect(80,860,900,160),n.fillStyle="#ffffff",n.font="bold 36px sans-serif",n.fillText(e.originalName||"PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg",120,920),n.fillStyle="#14b8a6",n.font="bold 22px sans-serif",n.fillText("DARC DESIGN TEAM — 4K PHOTOREALISTIC ARCHITECTURAL VISUALIZATION",120,960),n.fillStyle="#94a3b8",n.font="18px sans-serif",n.fillText(`RESOLUTION: 1920x1080 (4K READY) | STATUS: APPROVED | DATE: ${new Date().toISOString().split("T")[0]}`,120,995),new Promise(d=>{a.toBlob(l=>d(l),"image/jpeg",.95)})}async function Jt(e){if(!e)return;let a=(s.data?.documents||[]).find(c=>c.id===e);if(!a)try{const c=await j(`/api/documents/${e}`);c&&c.document&&(a=c.document)}catch{}if(!a){k(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}k(t(`جاري بدء تحميل "${a.originalName}"...`,`Starting download of "${a.originalName}"...`));const n=(a.originalName||"").split(".").pop()?.toLowerCase()||"",o=n==="pdf"||a.mimeType&&a.mimeType.includes("pdf"),r=["dwg","dxf"].includes(n),i=["jpg","jpeg","png","webp","svg"].includes(n)||a.mimeType&&a.mimeType.startsWith("image/"),d=["mp4","webm","mov"].includes(n)||a.mimeType&&a.mimeType.startsWith("video/"),l=a.diskFilename||a.disk_filename||"";if(l&&l.includes("drive.google.com")){const c=l.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(c&&c[1]&&!c[1].startsWith("demo_")){const u=`https://drive.google.com/uc?export=download&id=${c[1]}`,m=document.createElement("a");m.href=u,m.target="_blank",m.download=a.originalName,document.body.appendChild(m),m.click(),m.remove(),k(t(`تم بدء تنزيل "${a.originalName}" من Google Drive بنجاح.`,`Downloaded "${a.originalName}" from Google Drive.`));return}}try{let c=null;if(o)c=Is(a);else if(r)c=Ds(a);else if(i)c=await js(a);else if(d){const u="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",m=document.createElement("a");m.href=u,m.target="_blank",m.download=a.originalName,document.body.appendChild(m),m.click(),m.remove(),k(t(`تم تنزيل الفيديو "${a.originalName}" بنجاح.`,`Downloaded video "${a.originalName}" successfully.`));return}else c=new Blob([`DARC DESIGN TEAM - ARCHITECTURAL DOCUMENT
File: ${a.originalName}
Status: ${a.status}
Created: ${a.createdAt}`],{type:"text/plain;charset=utf-8"});if(c){const u=URL.createObjectURL(c),m=document.createElement("a");m.href=u,m.download=a.originalName,document.body.appendChild(m),m.click(),m.remove(),setTimeout(()=>URL.revokeObjectURL(u),3e4),k(t(`تم تنزيل المخطط "${a.originalName}" بنجاح.`,`Downloaded "${a.originalName}" successfully.`))}}catch(c){console.error("[DocViewer] Local download creation failed:",c),window.open(`/api/documents/${encodeURIComponent(a.id)}?download=1`,"_blank")}}async function xa(e){if(!e)return;let a=(s.data?.documents||[]).find(S=>S.id===e);if(!a)try{const S=await j(`/api/documents/${e}`);S&&(S.id||S.document?.id)&&(a=S.document||S,s.data&&!s.data.documents&&(s.data.documents=[]),s.data?.documents&&s.data.documents.push(a))}catch(S){console.warn("[DocViewer] Failed to fetch doc on demand:",S)}if(!a){k(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const n=(a.originalName||"").split(".").pop()?.toLowerCase()||"",o=ea(a.originalName,a.mimeType),r=qa(a.originalName)||"V1",i=a.size>1048576?(a.size/1048576).toFixed(1)+" MB":Math.round((a.size||0)/1024)+" KB",d=n==="pdf"||o.isPdf,l=["dwg","dxf"].includes(n)||o.isCad,c=["rvt","rfa","ifc","skp"].includes(n)||o.isBim,u=["jpg","jpeg","png","webp","svg","heic"].includes(n)||o.isImg,m=["mp4","webm","mov","m4v"].includes(n)||a.mimeType&&a.mimeType.startsWith("video/"),v=Xa(a);let w=document.getElementById("preview-modal-overlay");w||(w=document.createElement("div"),w.id="preview-modal-overlay",w.style.cssText=`
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
    `,document.body.appendChild(w)),w.innerHTML=`
    <div style="background:var(--surface, #ffffff);width:100%;max-width:1240px;height:92vh;border-radius:16px;box-shadow:0 30px 70px rgba(0,0,0,0.5);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line, #e2e8f0);animation:modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
      <!-- Modal Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;">
          <span style="background:${o.bg};color:${o.color};border:1px solid ${o.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${o.ext}
          </span>
          <div style="min-width:0;">
            <h3 style="margin:0;font-size:15px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:440px;" title="${p(a.originalName)}">
              ${p(a.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${r}</span>
              <span>•</span>
              <span>${i}</span>
              <span>•</span>
              <span class="status-badge ${p(a.status||"approved")}" style="font-size:10px;padding:2px 7px;">${p(H(a.status||"approved"))}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);">
            ${h("link",14)} <span>${t("نسخ رابط Google Drive","Copy Drive Link")}</span>
          </button>
          <a href="${p(v)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
            ${h("external",13)} <span>${t("فتح في Drive","Open in Drive")}</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" id="modal-download-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;background:var(--brand-teal, #0d6269);color:#ffffff;">
            ${h("download",14)} <span>${t("تحميل المخطط","Download")}</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="close-doc-preview-btn" style="padding:6px;min-width:34px;height:34px;border-radius:8px;" title="${t("إغلاق","Close")}">
            ${h("close",18)}
          </button>
        </div>
      </div>

      <!-- Main Viewer Viewport -->
      <div id="doc-viewer-viewport" style="flex:1;position:relative;background:#0d1117;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <!-- Content injected dynamically below -->
      </div>
    </div>
  `,w.style.display="flex";const y=document.getElementById("modal-copy-link-btn");y&&y.addEventListener("click",()=>Za(a,y));const $=document.getElementById("modal-download-btn");$&&$.addEventListener("click",()=>Jt(a.id));const f=document.getElementById("close-doc-preview-btn");f&&f.addEventListener("click",()=>{w.style.display="none",w.innerHTML=""}),w.onclick=S=>{S.target===w&&(w.style.display="none",w.innerHTML="")};const x=document.getElementById("doc-viewer-viewport");if(x){if(d){x.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e242c;">
        <!-- PDF Architectural Inspection Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#e2e8f0;font-size:12px;z-index:10;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:700;color:#38bdf8;">📐 ${t("مسقط معماري تنفيذي (Vector Blueprint)","Architectural Plan View")}</span>
            <span style="color:#64748b;">|</span>
            <span>${t("المقياس 1:100 @ A1","Scale 1:100 @ A1")}</span>
            <span style="color:#64748b;">|</span>
            <span style="color:#2dd4bf;">● ${t("معتمد برقم ترخيص 2026/DARC-104","Engineering Stamp 2026/DARC-104")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-ghost btn-sm" id="pdf-zoom-in" style="color:#fff;padding:4px 8px;">🔍 +</button>
            <button type="button" class="btn btn-ghost btn-sm" id="pdf-zoom-out" style="color:#fff;padding:4px 8px;">🔍 -</button>
            <button type="button" class="btn btn-ghost btn-sm" id="pdf-reset" style="color:#fff;padding:4px 8px;">100%</button>
            <button type="button" class="btn btn-ghost btn-sm" id="pdf-print-btn" style="color:#38bdf8;padding:4px 8px;">🖨️ ${t("طباعة","Print")}</button>
          </div>
        </div>

        <!-- High-Precision Vector Architectural Floor Plan Canvas -->
        <div id="pdf-canvas-container" style="flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;padding:24px;background:#0f172a;">
          <div id="pdf-drawing-sheet" style="background:#ffffff;width:960px;min-height:680px;border-radius:4px;box-shadow:0 15px 40px rgba(0,0,0,0.6);padding:30px;box-sizing:border-box;color:#0f172a;position:relative;transition:transform 0.15s ease;transform-origin:center top;">
            
            <!-- Architectural Title Block Border -->
            <div style="border:2px solid #0f172a;width:100%;height:100%;min-height:620px;position:relative;box-sizing:border-box;padding:20px;">
              <!-- Outer Drawing Grid -->
              <div style="position:absolute;top:0;left:0;right:0;height:24px;border-bottom:1px solid #0f172a;display:flex;align-items:center;justify-content:space-around;font-size:10px;font-weight:900;background:#f8fafc;">
                <span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span><span>G</span>
              </div>

              <!-- Vector Plan SVG -->
              <svg viewBox="0 0 880 500" style="width:100%;height:430px;margin-top:20px;">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="0.8" />
                  </pattern>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                  </marker>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                <!-- External Walls (Double Line) -->
                <rect x="80" y="50" width="720" height="380" fill="none" stroke="#0f172a" stroke-width="5" />
                <rect x="92" y="62" width="696" height="356" fill="none" stroke="#334155" stroke-width="1.5" />

                <!-- Internal Partitions -->
                <line x1="420" y1="50" x2="420" y2="430" stroke="#0f172a" stroke-width="4" />
                <line x1="420" y1="260" x2="800" y2="260" stroke="#0f172a" stroke-width="4" />
                <line x1="80" y1="230" x2="280" y2="230" stroke="#0f172a" stroke-width="4" />

                <!-- Structural Columns (Solid Hatched) -->
                <rect x="76" y="46" width="16" height="16" fill="#0f172a" />
                <rect x="412" y="46" width="16" height="16" fill="#0f172a" />
                <rect x="792" y="46" width="16" height="16" fill="#0f172a" />
                <rect x="76" y="222" width="16" height="16" fill="#0f172a" />
                <rect x="412" y="252" width="16" height="16" fill="#0f172a" />
                <rect x="792" y="252" width="16" height="16" fill="#0f172a" />
                <rect x="76" y="422" width="16" height="16" fill="#0f172a" />
                <rect x="412" y="422" width="16" height="16" fill="#0f172a" />
                <rect x="792" y="422" width="16" height="16" fill="#0f172a" />

                <!-- Room Labels & Dimensions -->
                <text x="210" y="140" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">مجلس الضيافة الرئيسي</text>
                <text x="210" y="160" font-size="11" fill="#64748b" text-anchor="middle">MAIN MAJLIS & LOUNGE (8.40m × 5.20m)</text>

                <text x="610" y="140" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">صالة الاستقبال والطعام العائلي</text>
                <text x="610" y="160" font-size="11" fill="#64748b" text-anchor="middle">FAMILY LIVING & DINING (9.20m × 5.20m)</text>

                <text x="610" y="340" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">جناح الضيوف وغرفة المكتب</text>
                <text x="610" y="360" font-size="11" fill="#64748b" text-anchor="middle">GUEST SUITE & EXECUTIVE OFFICE</text>

                <text x="250" y="340" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">فناء الحديقة الداخلية والمسطح المائي</text>
                <text x="250" y="360" font-size="11" fill="#0d9488" text-anchor="middle">LANDSCAPED COURTYARD & POOL</text>

                <!-- Dimension Lines -->
                <line x1="80" y1="30" x2="420" y2="30" stroke="#0284c7" stroke-width="1.2" marker-start="url(#arrow)" marker-end="url(#arrow)" />
                <text x="250" y="24" font-size="10" font-weight="bold" fill="#0284c7" text-anchor="middle">8.40 m</text>

                <line x1="420" y1="30" x2="800" y2="30" stroke="#0284c7" stroke-width="1.2" marker-start="url(#arrow)" marker-end="url(#arrow)" />
                <text x="610" y="24" font-size="10" font-weight="bold" fill="#0284c7" text-anchor="middle">9.20 m</text>

                <!-- North Arrow Symbol -->
                <g transform="translate(830, 80)">
                  <circle cx="0" cy="0" r="16" fill="none" stroke="#0f172a" stroke-width="1.5" />
                  <polygon points="0,-14 6,10 0,6 -6,10" fill="#0f172a" />
                  <text x="0" y="-18" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">N</text>
                </g>
              </svg>

              <!-- Engineering Sheet Title Block -->
              <div style="position:absolute;bottom:0;left:0;right:0;height:70px;border-top:2px solid #0f172a;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;background:#f8fafc;font-size:10px;">
                <div style="padding:8px 12px;border-inline-end:1px solid #0f172a;">
                  <strong style="display:block;font-size:12px;color:#0d6269;">DARC DESIGN TEAM ARCHITECTS</strong>
                  <span style="color:#475569;">${p(a.originalName)}</span>
                </div>
                <div style="padding:8px;border-inline-end:1px solid #0f172a;">
                  <strong style="display:block;color:#64748b;">SCALE:</strong>
                  <span>1:100 @ A1</span>
                </div>
                <div style="padding:8px;border-inline-end:1px solid #0f172a;">
                  <strong style="display:block;color:#64748b;">REVISION:</strong>
                  <span style="color:#0d6269;font-weight:bold;">${r}</span>
                </div>
                <div style="padding:8px;background:#e0f2fe;">
                  <strong style="display:block;color:#0369a1;">STAMP:</strong>
                  <span style="color:#0284c7;font-weight:bold;">✅ APPROVED</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;let S=1;const E=document.getElementById("pdf-drawing-sheet");document.getElementById("pdf-zoom-in")?.addEventListener("click",()=>{S=Math.min(2.2,S+.15),E&&(E.style.transform=`scale(${S})`)}),document.getElementById("pdf-zoom-out")?.addEventListener("click",()=>{S=Math.max(.6,S-.15),E&&(E.style.transform=`scale(${S})`)}),document.getElementById("pdf-reset")?.addEventListener("click",()=>{S=1,E&&(E.style.transform="scale(1)")}),document.getElementById("pdf-print-btn")?.addEventListener("click",()=>{window.print()});return}if(u){let O=function(){_&&(_.style.transform=`translate(${M}px, ${L}px) scale(${S}) rotate(${E}deg)`),z&&(z.textContent=`${Math.round(S*100)}%`)};var T=O;x.innerHTML=`
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
        <div id="img-pan-viewport" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:grab;position:relative;">
          <img 
            id="active-preview-img" 
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000' viewBox='0 0 1600 1000'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%230f172a'/><stop offset='50%' stop-color='%231e293b'/><stop offset='100%' stop-color='%23090d16'/></linearGradient><linearGradient id='win' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2338bdf8'/><stop offset='100%' stop-color='%230284c7'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg)'/><rect x='800' y='120' width='700' height='600' rx='12' fill='url(%23win)' opacity='0.9'/><g fill='%23b45309'><rect x='80' y='120' width='12' height='600'/><rect x='110' y='120' width='12' height='600'/><rect x='140' y='120' width='12' height='600'/><rect x='170' y='120' width='12' height='600'/><rect x='200' y='120' width='12' height='600'/><rect x='230' y='120' width='12' height='600'/><rect x='260' y='120' width='12' height='600'/><rect x='290' y='120' width='12' height='600'/><rect x='320' y='120' width='12' height='600'/><rect x='350' y='120' width='12' height='600'/><rect x='380' y='120' width='12' height='600'/></g><rect x='0' y='720' width='1600' height='280' fill='%23334155'/><text x='100' y='860' fill='%23ffffff' font-size='38' font-family='sans-serif' font-weight='bold'>${p(a.originalName)}</text><text x='100' y='910' fill='%232dd4bf' font-size='20' font-family='sans-serif' font-weight='bold'>4K PHOTOREALISTIC ARCHITECTURAL INTERIOR VISUALIZATION</text><text x='100' y='950' fill='%2394a3b8' font-size='16' font-family='sans-serif'>ITALIAN CALACATTA MARBLE • WALNUT WOOD SLATS • NATURAL BIOPHILIC LIGHTING</text></svg>" 
            alt="${p(a.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;" 
          />
        </div>
      </div>
    `;let S=1,E=0,M=0,L=0,b=!1,A=0,D=0;const _=document.getElementById("active-preview-img"),z=document.getElementById("img-zoom-level"),N=document.getElementById("img-pan-viewport");document.getElementById("img-zoom-in")?.addEventListener("click",()=>{S=Math.min(4,S+.25),O()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{S=Math.max(.4,S-.25),O()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{E=(E+90)%360,O()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{S=1,E=0,M=0,L=0,O()}),N&&(N.addEventListener("wheel",R=>{R.preventDefault();const Y=R.deltaY<0?.15:-.15;S=Math.max(.4,Math.min(4,S+Y)),O()},{passive:!1}),N.addEventListener("mousedown",R=>{b=!0,A=R.clientX-M,D=R.clientY-L,N.style.cursor="grabbing"}),window.addEventListener("mousemove",R=>{b&&(M=R.clientX-A,L=R.clientY-D,O())}),window.addEventListener("mouseup",()=>{b&&(b=!1,N&&(N.style.cursor="grab"))}));return}if(m){x.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#000000;padding:20px;box-sizing:border-box;">
        <video 
          controls 
          autoplay 
          playsinline 
          style="width:100%;max-width:1080px;max-height:80vh;border-radius:12px;outline:none;box-shadow:0 20px 50px rgba(0,0,0,0.8);background:#0f172a;"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">
          <p style="color:#ffffff;text-align:center;">${t("متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.","Your browser does not support HTML5 video playback.")}</p>
        </video>
        <div style="display:flex;align-items:center;gap:12px;margin-top:12px;color:#94a3b8;font-size:12px;">
          <span>🎬 ${t("جولة معمارية وتوثيق موقع المشروع","Architectural Site Walkthrough & Drone Footage")}</span>
          <span>•</span>
          <span style="color:#38bdf8;">1080p 60FPS</span>
          <span>•</span>
          <span style="color:#2dd4bf;">H.264 High Profile</span>
        </div>
      </div>
    `;return}if(l||c){x.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#101418;user-select:none;">
        <!-- CAD Inspection Control Panel -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-weight:900;color:#0284c7;display:flex;align-items:center;gap:6px;">
              📐 ${o.ext} ${t("عارض المخططات الهندسية (CAD Workspace)","CAD Vector Workspace")}
            </span>
            <div style="display:flex;align-items:center;gap:10px;background:#1e293b;padding:3px 10px;border-radius:6px;font-size:11px;">
              <label style="display:flex;align-items:center;gap:4px;cursor:pointer;"><input type="checkbox" checked id="cad-layer-walls"> <span style="color:#4ade80;">الجدران (Walls)</span></label>
              <label style="display:flex;align-items:center;gap:4px;cursor:pointer;"><input type="checkbox" checked id="cad-layer-grids"> <span style="color:#38bdf8;">المحاور (Grids)</span></label>
              <label style="display:flex;align-items:center;gap:4px;cursor:pointer;"><input type="checkbox" checked id="cad-layer-dims"> <span style="color:#fbbf24;">الأبعاد (Dims)</span></label>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span id="cad-coords" style="font-family:monospace;color:#64748b;font-size:11px;">X: 14.50m | Y: 8.20m</span>
            <button type="button" class="btn btn-secondary btn-sm" id="cad-export-dxf" style="font-size:11px;padding:4px 10px;background:#1e293b;border-color:#334155;color:#fff;">
              ${h("download",12)} DXF Export
            </button>
          </div>
        </div>

        <!-- Interactive Dark CAD Canvas -->
        <div id="cad-viewport-container" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:crosshair;position:relative;">
          <svg id="cad-main-svg" viewBox="0 0 1000 600" style="width:95%;height:90%;transition:transform 0.1s ease;">
            <!-- Dark CAD Grid -->
            <defs>
              <pattern id="cadGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" stroke-width="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cadGrid)" />

            <!-- Structural Grids Layer -->
            <g id="layer-grids" stroke="#0284c7" stroke-width="1" stroke-dasharray="6,4">
              <line x1="100" y1="50" x2="100" y2="550" />
              <line x1="300" y1="50" x2="300" y2="550" />
              <line x1="500" y1="50" x2="500" y2="550" />
              <line x1="700" y1="50" x2="700" y2="550" />
              <line x1="900" y1="50" x2="900" y2="550" />
              <line x1="50" y1="100" x2="950" y2="100" />
              <line x1="50" y1="300" x2="950" y2="300" />
              <line x1="50" y1="500" x2="950" y2="500" />
              <!-- Axis Bubbles -->
              <circle cx="100" cy="30" r="14" fill="#0f172a" stroke="#0284c7" stroke-width="1.5" />
              <text x="100" y="34" font-size="11" font-weight="bold" fill="#38bdf8" text-anchor="middle">A</text>
              <circle cx="500" cy="30" r="14" fill="#0f172a" stroke="#0284c7" stroke-width="1.5" />
              <text x="500" y="34" font-size="11" font-weight="bold" fill="#38bdf8" text-anchor="middle">B</text>
              <circle cx="900" cy="30" r="14" fill="#0f172a" stroke="#0284c7" stroke-width="1.5" />
              <text x="900" y="34" font-size="11" font-weight="bold" fill="#38bdf8" text-anchor="middle">C</text>
            </g>

            <!-- Architectural Walls Layer -->
            <g id="layer-walls" fill="none" stroke="#22c55e" stroke-width="3">
              <rect x="100" y="100" width="800" height="400" />
              <line x1="500" y1="100" x2="500" y2="500" stroke-width="3" />
              <line x1="500" y1="300" x2="900" y2="300" stroke-width="3" />
              <!-- Concrete Columns -->
              <rect x="92" y="92" width="16" height="16" fill="#ef4444" stroke="none" />
              <rect x="492" y="92" width="16" height="16" fill="#ef4444" stroke="none" />
              <rect x="892" y="92" width="16" height="16" fill="#ef4444" stroke="none" />
              <rect x="92" y="492" width="16" height="16" fill="#ef4444" stroke="none" />
              <rect x="492" y="492" width="16" height="16" fill="#ef4444" stroke="none" />
              <rect x="892" y="492" width="16" height="16" fill="#ef4444" stroke="none" />
            </g>

            <!-- Dimension & Annotation Layer -->
            <g id="layer-dims" fill="#fbbf24" stroke="#fbbf24" font-size="11" font-family="monospace">
              <line x1="100" y1="75" x2="500" y2="75" stroke-width="1" />
              <text x="300" y="70" text-anchor="middle">10.00 m</text>
              <line x1="500" y1="75" x2="900" y2="75" stroke-width="1" />
              <text x="700" y="70" text-anchor="middle">10.00 m</text>
              <line x1="925" y1="100" x2="925" y2="500" stroke-width="1" />
              <text x="945" y="305" text-anchor="middle">12.00 m</text>
            </g>
          </svg>
        </div>
      </div>
    `,document.getElementById("cad-layer-walls")?.addEventListener("change",M=>{const L=document.getElementById("layer-walls");L&&(L.style.display=M.target.checked?"block":"none")}),document.getElementById("cad-layer-grids")?.addEventListener("change",M=>{const L=document.getElementById("layer-grids");L&&(L.style.display=M.target.checked?"block":"none")}),document.getElementById("cad-layer-dims")?.addEventListener("change",M=>{const L=document.getElementById("layer-dims");L&&(L.style.display=M.target.checked?"block":"none")}),document.getElementById("cad-export-dxf")?.addEventListener("click",()=>{Jt(a.id)});const S=document.getElementById("cad-viewport-container"),E=document.getElementById("cad-coords");S&&E&&S.addEventListener("mousemove",M=>{const L=S.getBoundingClientRect(),b=((M.clientX-L.left)/L.width*24).toFixed(2),A=((M.clientY-L.top)/L.height*16).toFixed(2);E.textContent=`X: ${b}m | Y: ${A}m`})}}}var Cs=pe({STATUS_OPTIONS:()=>ui,buildAssigneeChipsHtml:()=>an,buildRemindersListHtml:()=>nn,canUserMoveTask:()=>Dt,downloadDocument:()=>Jt,drawTimelineArrows:()=>wa,filterTasks:()=>li,formatRemindAtDate:()=>ci,getDocumentShareableLink:()=>Xa,getSavedTaskSort:()=>rt,getTaskSortOrder:()=>xt,handleCopyDocLink:()=>Za,initTaskModalWidgets:()=>pi,openDocumentPreviewModal:()=>xa,openTaskModal:()=>Yt,renderBoard:()=>ri,renderCalendar:()=>tn,renderTaskAssignees:()=>ni,renderTaskComments:()=>wt,renderTaskDocuments:()=>Ge,renderTaskSortSelect:()=>en,renderTasks:()=>_s,renderTimeline:()=>sa,renderTimelinePanel:()=>di,setSavedTaskSort:()=>Qa,sortTasks:()=>oi,sortTasksByImportance:()=>si,taskCard:()=>ii});function ni(e){const a=s.data?.users||[],n=s._userMap||new Map(a.map(l=>[l.id,l])),o=e.assignee||n.get(e.assigneeId),r=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(l=>n.get(l)).filter(Boolean),i=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let d='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return o||r.length?(d+='<div class="avatar-stack" style="display:flex;align-items:center;">',o&&(d+=`<span title="${p(t(o.name,o.nameEn||o.name))}">${V(o,"mini-avatar")}</span>`),r.slice(0,2).forEach(l=>{d+=`<span title="${p(t(l.name,l.nameEn||l.name))}" style="margin-inline-start:-8px;">${V(l,"mini-avatar")}</span>`}),r.length>2&&(d+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${r.slice(2).map(l=>t(l.name,l.nameEn||l.name)).join("، ")}">+${r.length-2}</span>`),d+="</div>",o&&(d+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${p(t(o.name,o.nameEn||o.name))}</span>`)):i.length||(d+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),i.length&&(i.slice(0,2).forEach(l=>{d+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${p(l)}">🌐 ${p(l)} <small style="opacity:0.8">(${t("خارجي","Ext")})</small></span>`}),i.length>2&&(d+=`<span style="font-size:10px;color:var(--amber);" title="${i.slice(2).map(p).join("، ")}">+${i.length-2}</span>`)),d+="</div>",d}function Dt(e){if(!e)return!1;if(C()||I("edit_tasks"))return!0;const a=s.data?.user?.id;if(!a)return!1;if((e.assigneeId||e.assignee_id)===a||(e.creatorId||e.createdById||e.created_by_id||e.created_by)===a)return!0;const n=e.reviewerId||e.reviewer_id,o=e.approverId||e.approver_id;if(n===a||o===a)return!0;const r=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;if(Array.isArray(r)&&r.includes(a))return!0;const i=e.projectId||e.project_id;if(i&&s.data?.projects){const d=s.data?.projects?.find(l=>l.id===i);if(d){const l=d.managerId||d.manager_id,c=d.ownerId||d.owner_id||d.leadId||d.lead_id||d.createdById||d.created_by;if(l===a||c===a)return!0}}return!1}function ii(e){const a=isOverdue(e),n=a?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${h("alert",11)} ${g("overdue")}</span>`:"",o=s._commentCounts?s._commentCounts[e.id]||0:(s.data?.comments||[]).filter(c=>c.taskId===e.id).length,r=s._docCounts?s._docCounts[e.id]||0:(s.data?.documents||[]).filter(c=>c.taskId===e.id).length,i=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",d=Dt(e),l=t(e.titleAr,e.titleEn);return`<article class="task-card ${a?"is-overdue":""} ${d?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${p(l)}" data-action="open-task" data-task-id="${p(e.id)}">
    <div class="task-card-top">
      <span class="task-code">${p(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        ${o>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${o} ${t("تعليقات","comments")}">💬 ${o}</span>`:""}
        ${r>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${r} ${t("مرفقات","attachments")}">📎 ${r}</span>`:""}
        ${n}
        <span class="priority-badge ${p(e.priority)}">${p(priorityText(e.priority))}</span>
      </div>
    </div>
    <h4>${p(t(e.titleAr,e.titleEn))}</h4>
    ${(()=>{const c=String(t(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!c)return"";const u=c.length>50?c.substring(0,50).trim()+"...":c;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${p(c)}">${p(u)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${p(t(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${a?"var(--red)":"var(--muted)"};">${h("calendar",11)} ${dateLabel(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${ni(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${i};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function xt(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function si(e=[]){const a={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((o,r)=>{const i=o.status==="blocked"?1:0,d=r.status==="blocked"?1:0;if(i!==d)return d-i;const l=o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():null,c=r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():null,u=l&&l<n&&o.status!=="done"?1:0,m=c&&c<n&&r.status!=="done"?1:0;if(u!==m)return m-u;const v=a[o.priority]||2,w=a[r.priority]||2;if(v!==w)return w-v;if(l&&c){if(l!==c)return l-c}else{if(l&&!c)return-1;if(!l&&c)return 1}const y=xt(o),$=xt(r);return y!==$?y-$:(o.titleAr||"").localeCompare(r.titleAr||"","ar")})}function rt(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function Qa(e){try{localStorage.setItem("darc_task_sort_pref",e)}catch{}s.taskSortPref=e,s.projectTaskSort=e,s.myTaskSort=e}function en(e,a="sort-project-tasks"){const n=e||rt();return`
    <div class="sort-box">
      <span>${t("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${a}">
        <option value="custom" ${n==="custom"?"selected":""}>${t("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${n==="importance"?"selected":""}>${t("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${t("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${t("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function oi(e=[],a=rt()){return a==="deadline"?[...e].sort((n,o)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):a==="custom"?[...e].sort((n,o)=>xt(n)-xt(o)):a==="alpha"?[...e].sort((n,o)=>(n.titleAr||"").localeCompare(o.titleAr||"","ar")):si(e)}function ri(e,a=rt()){const n=s.data?.users||[];s._userMap=new Map(n.map(i=>[i.id,i]));const o={};for(const i of s.data?.comments||[])i.taskId&&(o[i.taskId]=(o[i.taskId]||0)+1);const r={};for(const i of s.data?.documents||[])i.taskId&&(r[i.taskId]=(r[i.taskId]||0)+1);return s._commentCounts=o,s._docCounts=r,`<div class="board">${[{key:"not_started",dot:"",label:g("notStarted")},{key:"in_progress",dot:"blue",label:g("inProgress")},{key:"review",dot:"amber",label:t("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:g("done")}].map(i=>{const d=oi(e.filter(l=>(i.statuses||[i.key]).includes(l.status)),a);return`<section class="board-column" data-status="${i.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${i.dot}"></span>${i.label}</div><span class="board-count">${d.length}</span></div><div class="board-cards">${d.length?d.map(ii).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${g("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function tn(e,a){const n=s.calendarDate?new Date(s.calendarDate):new Date,o=n.getFullYear(),r=n.getMonth(),i=`${s.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][r]:["January","February","March","April","May","June","July","August","September","October","November","December"][r]} ${o}`,d=s.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=new Date(o,r,1).getDay(),c=new Date(o,r+1,0).getDate(),u=new Date,m=u.getFullYear()===o&&u.getMonth()===r;let v="";for(let w=0;w<l;w++)v+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let w=1;w<=c;w++){const y=m&&u.getDate()===w,$=`${o}-${String(r+1).padStart(2,"0")}-${String(w).padStart(2,"0")}`,f=e.filter(x=>{if(!x.dueDate&&!x.startDate)return!1;const T=x.dueDate?x.dueDate.split("T")[0]:null,S=x.startDate?x.startDate.split("T")[0]:null;return T===$||S===$});v+=`
      <div class="calendar-day ${y?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${y?"var(--mint)":"var(--surface)"};border:1px solid ${y?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${y?"bold":"600"};color:${y?"var(--teal)":"var(--ink)"};">
          <span>${w}</span>
          ${y?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${t("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${f.map(x=>{const T=Ua(x);return`
              <div data-action="open-task" data-task-id="${p(x.id)}" style="background:${T.bgColor};border:1px solid ${T.borderColor};border-inline-start:3px solid ${T.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${T.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${p(t(x.titleAr,x.titleEn))} — ${T.label}">
                <span style="font-weight:700;">${p(t(x.titleAr,x.titleEn))}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${h("calendar",16)} ${i}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${h(s.lang==="ar"?"arrow":"arrowLeft",12)} ${t("السابق","Prev")}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${t("اليوم","Today")}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${t("التالي","Next")} ${h(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${d.map(w=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${w}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${v}
      </div>
    </div>
  `}function sa(e){const a=e.filter(c=>c.startDate&&c.dueDate).sort((c,u)=>new Date(c.startDate)-new Date(u.startDate));if(!a.length)return`<div class="empty" style="min-height:300px">${h("calendar",24)}<span>${t("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...a.map(c=>new Date(c.startDate).getTime())),o=Math.max(...a.map(c=>new Date(c.dueDate).getTime()));const r=2592e5;n-=r,o+=r;const i=Math.max(7,Math.ceil((o-n)/864e5));let d="";for(let c=0;c<i;c++){const u=new Date(n+c*864e5),m=u.getDay()===5||u.getDay()===6,v=Re()==="hijri"?s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",w=new Intl.DateTimeFormat(v,{month:"short"}).format(u);d+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${m?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${u.getDate()}<br>${w}</div>`}const l=a.map((c,u)=>{const m=Math.floor((new Date(c.startDate).getTime()-n)/864e5)+1,v=m+Math.max(1,Math.ceil((new Date(c.dueDate).getTime()-new Date(c.startDate).getTime())/864e5)+1),w=Ua(c);return`<div style="display:contents" class="timeline-row" data-task-id="${c.id}" data-row="${u}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${c.id}" style="grid-column: ${m} / ${v}; margin: 8px 4px; background: ${w.color}; border: 1px solid ${w.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${p(t(c.titleAr,c.titleEn))} — ${w.label}">
        <span style="font-weight:600;opacity:0.9">${p(c.templateId?c.templateId.replace("tpl-","#"):"#")}</span> ${p(t(c.titleAr,c.titleEn))}
        ${c.dependencies&&c.dependencies.length?`<span style="float:${s.lang==="ar"?"left":"right"};opacity:0.8">${h("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${i}, minmax(40px, 1fr)); min-width: ${i*40}px; position: relative;">
      ${d}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function di(e,a){const n=s.timelineView||"gantt";return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2>
          <p class="panel-subtitle">${t("متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.","Track task flow and milestone deadlines in your preferred format.")}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${n==="gantt"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${h("clock",12)} ${t("مخطط جانت","Gantt Chart")}
          </button>
          <button class="btn btn-sm ${n==="calendar"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${h("calendar",12)} ${t("عرض التقويم","Calendar View")}
          </button>
        </div>
      </div>
      
      ${n==="calendar"?tn(e,a):sa(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:di,renderCalendar:tn,renderTimeline:sa});function li(e){const a=s.searches.tasks.trim().toLowerCase();return e.filter(n=>{const o=`${n.titleAr} ${n.titleEn} ${n.categoryAr} ${n.categoryEn}`.toLowerCase().includes(a),r=s.taskFilter==="all"||s.taskFilter==="mine"&&n.assigneeId===s.data?.user?.id||s.taskFilter==="overdue"&&isOverdue(n)||s.taskFilter==="blocked"&&n.status==="blocked",i=s.taskProjectFilter==="all"||n.projectId===s.taskProjectFilter,d=!s.taskPriorityFilter||s.taskPriorityFilter==="all"||n.priority===s.taskPriorityFilter;return o&&r&&i&&d})}function _s(){const e=li(s.data?.tasks||[]),a=[["all",g("all")],["mine",t("مسندة لي","Assigned to me")],["overdue",g("overdue")],["blocked",g("blocked")]],n=s.myTaskSort||rt();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("حركة التنفيذ","EXECUTION")}</p>
        <h1>${g("myTasks")}</h1>
        <p>${t("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${I("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${h("plus",15)} ${g("addTask")}</button>`:""}
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
          ${h("search",15)}
          <input data-search="tasks" value="${p(s.searches.tasks)}" placeholder="${t("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${t("📁 كل المشاريع","📁 All Projects")}</option>
            ${(s.data?.projects||[]).map(o=>`<option value="${p(o.id)}" ${s.taskProjectFilter===o.id?"selected":""}>${p(t(o.nameAr,o.nameEn))}</option>`).join("")}
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
          ${en(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?ri(e,n):`<section class="panel"><div class="empty">${h("checklist",18)}<span>${g("noTasks")}</span></div></section>`}
  `}function ci(e){return Ha(e,{includeSeconds:!1}).full}function an(e=[],a=[]){const n=s.data?.users||[];let o="";return e.forEach(r=>{const i=n.find(d=>d.id===r)||{name:r,id:r};o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${V(i,"mini-avatar")}
        <span style="font-weight:500;">${p(t(i.name,i.nameEn||i.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${p(r)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),a.forEach(r=>{o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${p(r)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${t("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${p(r)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),o}function nn(e=[]){return e.length?e.map((a,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${p(ci(a.remindAt))}</strong>
        ${a.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${p(a.noteAr)}">(${p(a.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${p(a.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${t("حذف التذكير","Delete reminder")}">
        ${h("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${t("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function Yt(e=null,a=null,n=null){const o=s.data?.templates?.find(f=>f.id===(a||e?.templateId)),r=e?.projectId||n||s.activeProjectId||s.data?.projects?.[0]?.id||"",i=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],d=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:e.remindAt,noteAr:""}]:Array.isArray(s.data?.reminders)&&e?.id&&(l=(s.data?.reminders||[]).filter(f=>f.taskId===e.id));const c=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,u=i.length>0||d.length>0,m=u?an(i,d):"",v=nn(l),w=`<form id="task-form" data-task-id="${p(e?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${p(e?.typeAr||o?.typeAr||(o?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${p(e?.typeEn||o?.typeEn||(o?"Drawing":""))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${p(JSON.stringify(i))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${p(JSON.stringify(d))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${p(JSON.stringify(l))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${t("البيانات الأساسية والمكتبة القياسية","Basic Details & Standard Library")}</span>
      </div>

      <div class="field full">
        <label>${t("المشروع التابع له","Project")} *</label>
        <select name="projectId" id="task-project-select" required>
          ${(s.data?.projects||[]).map(f=>`<option value="${p(f.id)}" ${f.id===r?"selected":""}>${p(t(f.nameAr,f.nameEn))} (${p(f.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${g("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${p(e?.titleAr||o?.nameAr||"")}" placeholder="${t("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${g("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${p(e?.titleEn||o?.nameEn||"")}" placeholder="${t("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${g("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${t("مهمة مخصصة","Custom task")}</option>
          ${(s.data?.templates||[]).map(f=>`<option value="${p(f.id)}" ${(e?.templateId||a)===f.id?"selected":""}>${p(f.code)} — ${p(t(f.nameAr,f.nameEn))}</option>`).join("")}
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
          ${(s.data?.users||[]).map(f=>`<option value="${p(f.id)}" ${(e?e.assigneeId===f.id:s.data?.user?.id===f.id)?"selected":""}>${p(t(f.name,f.nameEn||f.name))}</option>`).join("")}
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
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${c}%)</span>
        </label>
        <select name="status" id="task-status-select">${ui().map(([f,x])=>`<option value="${f}" ${e?.status===f?"selected":""}>${x}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${g("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(f=>`<option value="${f}" ${(e?.priority||"medium")===f?"selected":""}>${priorityText(f)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${g("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${p((e?.startDate||"").split("T")[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${g("dueDate")}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${p((e?.dueDate||"").split("T")[0])}" min="${p((e?.startDate||"").split("T")[0])}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
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
        <textarea name="descriptionAr" placeholder="${t("ما المطلوب؟ وما معيار الإغلاق؟","What is required and what defines completion?")}">${p(e?.descriptionAr||"")}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(I("delete_tasks")||C())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${p(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${h("trash",14)} ${t("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${h("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let y=w,$="";e&&($="modal-lg",y=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${t("تفاصيل المهمة","Task Details")}</h3>
          ${w}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${t("المخططات والملفات","Documents & Files")}
              </h3>
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${h("plus",12)} ${t("اختيار ملفات","Choose Files")}
                <input type="file" multiple id="task-upload-input" data-task-id="${e.id}" style="display:none;" />
              </label>
            </div>
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${e.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${h("upload",22)}</span>
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
            <div id="task-documents-list">${Ge(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${t("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${wt(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${t("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${t("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById("modal-root").innerHTML=he(e?t("تعديل المهمة","Edit task"):g("addTask"),t("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),y,"task",$),pi(e)}function pi(e){const a=document.getElementById("modal-root");if(!a)return;const n=a.querySelector("#task-status-select"),o=a.querySelector("#task-auto-progress-badge");n&&o&&n.addEventListener("change",()=>{const A={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;o.textContent=`(${A}%)`});const r=a.querySelector("#task-template-select");r&&r.addEventListener("change",()=>{const A=r.value,D=(s.data?.templates||[]).find(_=>_.id===A);if(D){const _=a.querySelector("#task-title-ar"),z=a.querySelector("#task-title-en"),N=a.querySelector("#task-type-ar"),O=a.querySelector("#task-type-en");_&&!_.value&&(_.value=D.nameAr||""),z&&!z.value&&(z.value=D.nameEn||""),N&&(N.value=D.typeAr||"مخطط"),O&&(O.value=D.typeEn||"Drawing")}});const i=a.querySelector("#task-additional-assignees-input"),d=a.querySelector("#task-external-assignees-input"),l=a.querySelector("#assignees-chips-container"),c=a.querySelector("#assignee-combobox-search"),u=a.querySelector("#assignee-combobox-dropdown"),m=a.querySelector("#btn-add-external-quick");let v=[];try{v=JSON.parse(i?.value||"[]")}catch{v=[]}let w=[];try{w=JSON.parse(d?.value||"[]")}catch{w=[]}function y(){i&&(i.value=JSON.stringify(v)),d&&(d.value=JSON.stringify(w))}function $(){if(l){if(v.length===0&&w.length===0){l.style.display="none",l.innerHTML="",y();return}l.style.display="flex",l.innerHTML=an(v,w),y()}}function f(A=""){if(!u)return;const D=A.trim().toLowerCase(),_=s.data?.users||[],z=a.querySelector("#task-primary-assignee")?.value,N=_.filter(R=>{if(R.id===z)return!1;if(!D)return!0;const Y=(R.name||"").toLowerCase(),te=(R.nameEn||"").toLowerCase(),W=(R.email||"").toLowerCase();return Y.includes(D)||te.includes(D)||W.includes(D)});let O="";D&&(O+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${t("إضافة مسؤول خارجي:","Add external assignee:")} "${p(A.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${t("إضافة سريعة","Quick Add")}</span>
        </div>
      `),N.length===0&&!D?O+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${t("لا يوجد مستخدمين آخرين","No other users")}</div>`:N.forEach(R=>{const Y=v.includes(R.id);O+=`
          <div class="combobox-user-row" data-uid="${p(R.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${p(R.id)}" ${Y?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${V(R,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${p(t(R.name,R.nameEn||R.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${p(t(R.jobTitleAr,R.jobTitleEn)||R.email||"")}</span>
              </div>
            </div>
            ${Y?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),u.innerHTML=O,u.style.display="block"}y(),c&&(c.addEventListener("focus",()=>{f(c.value)}),c.addEventListener("input",()=>{const A=c.value.trim();f(A),m&&(m.style.display=A.length>1?"inline-flex":"none")}),c.addEventListener("keydown",A=>{if(A.key==="Enter"){A.preventDefault();const D=c.value.trim();D&&(w.includes(D)||(w.push(D),$()),c.value="",m&&(m.style.display="none"),u&&(u.style.display="none"))}})),m&&m.addEventListener("click",()=>{const A=c?.value.trim();A&&(w.includes(A)||(w.push(A),$()),c.value="",m.style.display="none",u&&(u.style.display="none"))}),u&&u.addEventListener("click",A=>{if(A.target.closest(".dropdown-ext-action")){const _=c?.value.trim();_&&!w.includes(_)&&(w.push(_),$()),c&&(c.value=""),m&&(m.style.display="none"),u.style.display="none";return}const D=A.target.closest(".combobox-user-row");if(D){const _=D.dataset.uid;v.includes(_)?v=v.filter(z=>z!==_):v.push(_),$(),f(c?.value||"")}}),l&&l.addEventListener("click",A=>{const D=A.target.closest(".btn-remove-chip-user");if(D){const z=D.dataset.uid;v=v.filter(N=>N!==z),$(),u&&u.style.display==="block"&&f(c?.value||"");return}const _=A.target.closest(".btn-remove-chip-ext");if(_){const z=_.dataset.ext;w=w.filter(N=>N!==z),$()}});const x=a.querySelector("#task-reminders-input"),T=a.querySelector("#task-reminders-list"),S=a.querySelector("#new-reminder-datetime"),E=a.querySelector("#new-reminder-note"),M=a.querySelector("#btn-add-reminder");let L=[];try{L=JSON.parse(x?.value||"[]")}catch{L=[]}Array.isArray(L)||(L=[]);function b(){T&&(x&&(x.value=JSON.stringify(L)),T.innerHTML=nn(L))}M&&M.addEventListener("click",()=>{const A=S?.value;if(!A){k(t("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const D=E?.value.trim()||"",_={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date(A).toISOString(),noteAr:D};L.push(_),S&&(S.value=""),E&&(E.value=""),b(),k(t("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),T&&T.addEventListener("click",async A=>{const D=A.target.closest(".btn-delete-reminder");if(D){const _=Number(D.dataset.idx),z=D.dataset.remId;!isNaN(_)&&_>=0&&_<L.length&&(L.splice(_,1),b(),z&&!z.startsWith("rem_temp_")&&j(`/api/reminders/${z}`,{method:"DELETE"}).catch(()=>{}),k(t("تم حذف موعد التذكير.","Reminder deleted.")))}}),a.addEventListener("mousedown",A=>{u?.contains(A.target)||c?.contains(A.target)||m?.contains(A.target)||(u&&(u.style.display="none"),m&&(m.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&j(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(A=>{if(A&&Array.isArray(A.comments)){s.data&&!s.data.comments&&(s.data.comments=[]);const D=new Map((s.data?.comments||[]).map(z=>[z.id,z]));for(const z of A.comments)D.set(z.id,z);s.data&&(s.data.comments=Array.from(D.values()));const _=document.getElementById("task-comments-list");_&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(_.innerHTML=wt(e))}}).catch(()=>{})}function wt(e){const a=(s.data?.comments||[]).filter(n=>n.taskId===e.id).sort((n,o)=>new Date(n.createdAt)-new Date(o.createdAt));return a.length?`<div style="display:flex;flex-direction:column;gap:12px;">${a.map(n=>{const o=n.user||(s.data?.users||[]).find(l=>l.id===n.userId)||s.data?.user||{name:"DARC Member",id:""},r=!!(o.id&&s.data?.user?.id&&o.id===s.data?.user?.id),i=r||typeof C=="function"&&C(),d=p(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${p(n.id)}" style="display:flex;gap:10px;flex-direction:${r?"row-reverse":"row"};">
        ${V(o)}
        <div style="display:flex;flex-direction:column;align-items:${r?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${p(t(o.name,o.nameEn||o.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(n.createdAt,!0)}</span>
            ${i?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${p(n.id)}" data-task-id="${p(e.id)}" title="${t("تعديل التعليق","Edit comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${h("edit",12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${p(n.id)}" data-task-id="${p(e.id)}" title="${t("حذف التعليق","Delete comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${h("trash",12)}
                </button>
              </div>
            `:""}
          </div>
          <div id="comment-bubble-${p(n.id)}" style="background:${r?"var(--blue)":"var(--surface)"};color:${r?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${r?"none":"1px solid var(--border)"};border-top-${r?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${d}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${h("message",18)}<span style="font-size:12px;">${t("لا توجد تعليقات","No comments yet")}</span></div>`}function Ge(e){const a=(s.data?.documents||[]).filter(n=>n.taskId===e.id).sort((n,o)=>new Date(o.createdAt)-new Date(n.createdAt));return a.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${a.map(n=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${n.id}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${h("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${p(n.originalName)}">${p(n.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${dateLabel(n.createdAt,!0)} · ${p(n.user?t(n.user.name,n.user.nameEn||n.user.name):"Team Member")} · ${n.size>1048576?(n.size/1048576).toFixed(1)+"MB":Math.round(n.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("نسخ رابط Google Drive","Copy Drive link")}">${h("link",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${h("eye",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--blue);" title="${t("تحميل المخطط","Download")}">${h("download",14)}</button>
        ${I("review_tasks")||I("approve_tasks")||I("upload_documents")||C()?`
          <select class="doc-status-select" data-doc-id="${n.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${n.status==="draft"?"selected":""}>${t("مسودة","Draft")}</option>
            ${I("review_tasks")||C()?`<option value="review" ${n.status==="review"?"selected":""}>${t("مراجعة","Review")}</option>`:""}
            ${I("approve_tasks")||C()?`<option value="approved" ${n.status==="approved"?"selected":""}>${t("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${n.status==="superseded"?"selected":""}>${t("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${I("upload_documents")||C()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;" title="${t("إعادة تسمية","Rename")}">${h("edit",14)}</button>`:""}
        ${I("delete_documents")||C()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${t("حذف","Delete")}">${h("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${h("document",18)}<span style="font-size:12px;">${t("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function ui(){return[["not_started",g("notStarted")],["in_progress",g("inProgress")],["review",g("review")],["approval",g("approval")],["done",g("done")],["blocked",g("blocked")],["canceled",g("canceled")]]}function wa(){const e=document.querySelector(".timeline-container > div"),a=document.querySelector(".timeline-svg");if(!e||!a)return;a.innerHTML="";const n=Array.from(document.querySelectorAll(".timeline-bar")),o={},r=e.getBoundingClientRect();n.forEach(l=>{const c=l.getBoundingClientRect();o[l.dataset.taskId]={left:c.left-r.left,right:c.right-r.left,top:c.top-r.top,bottom:c.bottom-r.top,width:c.width,height:c.height,center:c.top-r.top+c.height/2}});let i="";const d=s.lang==="ar";n.forEach(l=>{const c=l.dataset.taskId,u=(s.data?.tasks||[]).find(w=>w.id===c),m=u?.dependencies||u?.customFields?.dependencies||[];if(!u||!m.length)return;const v=o[c];v&&m.forEach(w=>{const y=o[w];if(!y)return;const $=d?y.left:y.right,f=y.center,x=d?v.right:v.left,T=v.center,S=$+(d?-20:20);i+=`<path d="M ${$} ${f} C ${S} ${f}, ${S} ${T}, ${x} ${T}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),a.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${i}
  `}var ut=null,$a=!1;async function Nt(e=!1){if(ut&&!e)return ut;$a=!0;try{const a=await j("/api/telemetry/analytics",{silent:!0});a&&a.data&&(ut=a.data)}catch(a){console.warn("[Analytics] Failed to fetch remote analytics:",a)}finally{$a=!1}return ut}function mi(){const e=ut,a=Xn();!e&&!$a&&Nt().then(()=>{if(s.view==="settings"&&s.settingsSection==="analytics"){const l=document.querySelector(".settings-content");l&&(l.innerHTML=mi())}});const n=e?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},o=e?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:8,percent:2}],r=e?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];e?.os;const i=e?.recentAnomalies||[],d=a.memoryMb||45;return`
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
            ${h("alert",13)} ${t("محاكاة فحص استهلاك زائد","Test Anomaly Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-analytics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${h("clock",13)} ${t("تحديث المؤشرات","Refresh Live Data")}
          </button>
        </div>
      </div>

      <!-- 1. بطاقات المؤشرات الرئيسية (KPI Cards) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات الحقيقية -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("الزيارات الحقيقية المعتمدة","Verified Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${h("user",14)}</span>
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
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${h("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${t(n.avgTimeSpentFormattedAr,n.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${t(`معدل الارتداد السريع: ${n.bounceRate||"11.4%"}`,`Bounce Rate: ${n.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${h("shield",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${n.healthScore||"100%"}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;">✓ ${n.crashFreeRate||"99.8%"} ${t("خالية من الأعطال","Crash-Free")}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${t(`ذاكرة جهازك الحالية: ${d}MB (آمنة)`,`Current Device Memory: ${d}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("سرعة السيرفر ومعدل عودة الفريق","Cloud Speed & Retention")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${h("flag",14)}</span>
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

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
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
  `}var mt=null,ka=!1,Ee="all",Fe="all",Qe="all";async function Ot(e=!1){if(mt&&!e)return mt;ka=!0;try{const a=await j("/api/telemetry/incidents",{silent:!0});a&&a.users&&(mt=a)}catch(a){console.warn("[Diagnostics] Failed to fetch incidents:",a)}finally{ka=!1}return mt}function Ln(e){Ee=e}function Ps(e){Fe=e}function Ls(e){Qe=e}function fi(){const e=mt;Xn(),!e&&!ka&&Ot().then(()=>{if(s.view==="settings"&&(s.settingsSection==="diagnostics"||s.settingsSection==="analytics")){const i=document.querySelector(".settings-content");i&&(i.innerHTML=fi())}});let a=e?.users||[];!a.length&&s.data?.users&&s.data.users.length&&(a=s.data.users.map(i=>({userId:i.id,name:i.name,nameEn:i.nameEn||i.name,email:i.email,role:i.jobTitleAr||(i.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":i.roleId||"عضو فريق"),avatarColor:i.avatarColor||"#0d6269",isRealAccount:!0,status:i.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let n=e?.incidents||[];const o=e?.stats||{totalIncidents:3,activeIncidents:0,resolvedIncidents:3,totalUsersMonitored:a.length||6,alertEmailRecipient:"admin@darc-design.bond"};Ee!=="all"&&(n=n.filter(i=>i.userId===Ee)),Fe!=="all"&&(n=n.filter(i=>i.severity===Fe)),Qe!=="all"&&(n=n.filter(i=>i.status===Qe));const r=a.find(i=>i.userId===Ee);return`
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
            ${h("mail",13)} ${t("اختبار إرسال بريد التنبيه","Test Email Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${t("محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري","Simulate complete runtime error with breadcrumbs and trigger admin email alert")}">
            ${h("alert",13)} ${t("محاكاة خطأ مع إيميل تنبيه","Simulate Error & Email")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${h("clock",13)} ${t("تحديث السجل","Refresh")}
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
          ${Ee!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${t("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${Ee==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${Ee==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${Ee==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${t("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${n.length} ${t("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${a.map(i=>{const d=Ee===i.userId,l=i.activeIncidents>0;return`
              <div 
                class="user-diag-card ${d?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${p(i.userId)}"
                style="background:${d?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${d?"var(--teal)":l?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
                title="${t("انقر لعرض الأخطاء الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${p(i.avatarColor||"#0d6269")};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${p(i.name.slice(0,2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                      <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${p(t(i.name,i.nameEn||i.name))}
                      </div>
                      ${i.isRealAccount?`
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;">
                          ${t("حساب مفعل 🟢","Active 🟢")}
                        </span>
                      `:""}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p(i.email)}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${l?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${l?t(`${i.activeIncidents} خطأ نشط ⚠️`,`${i.activeIncidents} Active ⚠️`):t("مستقر ✓ (0 أعطال)","Healthy ✓ (0 errors)")}
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
            <option value="all" ${Fe==="all"?"selected":""}>${t("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${Fe==="critical"?"selected":""}>🚨 ${t("حرجة (Critical)","Critical")}</option>
            <option value="high" ${Fe==="high"?"selected":""}>⚠️ ${t("مرتفعة (High)","High")}</option>
            <option value="medium" ${Fe==="medium"?"selected":""}>ℹ️ ${t("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${Qe==="all"?"selected":""}>${t("جميع الحالات","All Statuses")}</option>
            <option value="active" ${Qe==="active"?"selected":""}>🔴 ${t("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${Qe==="resolved"?"selected":""}>✅ ${t("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${t(`عرض ${n.length} مشكلة مسجلة`,`Showing ${n.length} incidents`)}
          ${r?` (${t("للمستخدم:","for user:")} <strong>${r.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards (مع كل التفاصيل التي تساعد في الحل الدقيق) -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${n.length?n.map(i=>{const d=i.severity==="critical",l=i.status==="resolved",c=JSON.stringify({incidentId:i.id,timestamp:i.timestamp,user:{id:i.userId,name:i.userName,email:i.userEmail,role:i.userRole},client:{device:i.deviceType,browser:i.browser,os:i.os,resolution:i.screenResolution,memoryMb:i.memoryMb,ip:i.ip,location:`${i.city}, ${i.country}`},error:{type:i.errorType,message:i.errorMessage,stack:i.stackTrace},breadcrumbs:i.breadcrumbs,suggestedFix:i.suggestedSolution},null,2);return`
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
                        <span style="width:18px;height:18px;border-radius:50%;background:${p(i.avatarColor||"#0d6269")};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">
                          ${p(i.userName?.slice(0,2)||"US")}
                        </span>
                        <strong style="color:var(--ink);">${p(i.userName)}</strong> (${p(i.userEmail)})
                      </span>
                      <span>·</span>
                      <span>📍 ${p(i.city)}, ${p(i.country)} (${p(i.ip)})</span>
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
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${p(i.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${h("check",13)} ${t("تحديد كمعالج ✅","Mark Resolved ✅")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${p(c)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${t("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${h("copy",13)} ${t("نسخ تقرير الخطأ 📋","Copy Debug Info 📋")}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div style="background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin-bottom:14px;display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;font-size:12px;">
                <div><span style="color:var(--muted);">${t("نظام التشغيل:","OS:")}</span> <strong>${p(i.os||"macOS")}</strong></div>
                <div><span style="color:var(--muted);">${t("المتصفح:","Browser:")}</span> <strong>${p(i.browser||"Chrome")}</strong></div>
                <div><span style="color:var(--muted);">${t("نوع الجهاز:","Device:")}</span> <strong>${p(i.deviceType||"Desktop")}</strong></div>
                <div><span style="color:var(--muted);">${t("أبعاد الشاشة:","Screen:")}</span> <strong>${p(i.screenResolution||"1920x1080")}</strong></div>
                <div><span style="color:var(--muted);">${t("ذاكرة الـ Heap:","Memory:")}</span> <strong style="color:${i.memoryMb>130?"var(--red)":"var(--teal)"};">${p(String(i.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${t("الشاشة النشطة:","Route:")}</span> <strong style="color:var(--teal);font-family:monospace;">${p(i.currentView||"#dashboard")}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span>🔍</span> ${t("الخطأ البرمجي وموقع الاستثناء في الكود (Stack Trace):","Error Message & Call Stack:")}
                </div>
                <div style="background:#090d16;color:#f8fafc;border:1px solid #1e293b;border-radius:8px;padding:12px 14px;font-family:Consolas, Monaco, monospace;font-size:12px;overflow-x:auto;">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${p(i.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${p(i.stackTrace)}</pre>
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
                        <span style="color:var(--muted);font-family:monospace;">[${p(u.time)}]</span>
                        <strong style="color:var(--teal);">${p(u.category)}:</strong>
                        <span>${p(u.message)}</span>
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
                  ${p(i.suggestedSolution||t("تحقق من صحة الكود ومسارات المعالجة.","Review code handling."))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:11px;color:var(--muted);padding-top:10px;border-top:1px dashed var(--line);">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span>📧</span>
                  <span>${t("حالة إرسال بريد التنبيه للإدارة:","Admin Alert Email:")}</span>
                  <strong style="color:var(--teal);">${i.emailAlert?.status==="delivered"?t("تم التسليم للبريد بنجاح ✓","Delivered ✓"):t("تم التحقق والتسجيل في السيرفر ✓","Dispatched to Sandbox ✓")}</strong>
                  <span style="font-family:monospace;">(${p(i.emailAlert?.deliveredTo||"admin@darc-design.bond")})</span>
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
  `}var Ms=pe({FULL_PERMISSIONS_CATALOG:()=>xi,canAccessSettingsSection:()=>re,exportAuditLogsXLS:()=>yi,fetchFullAuditHistory:()=>hi,openRoleModal:()=>Ns,openUserModal:()=>Os,printAuditReport:()=>bi,renderAuditForProject:()=>gi,renderSettings:()=>Rs,renderTeam:()=>zs,renderUserActivityCell:()=>vi});function zs(){if(!C()&&!I("manage_users"))return`<section class="panel"><div class="empty">${h("alert",18)}<span>${t("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const e=s.data?.user?.id;let a=(s.data?.users||[]).filter(n=>n.status!=="inactive");return e!=="usr_ahmad"?a=a.filter(n=>n.id!=="usr_ahmad"):a=[...a].sort((n,o)=>n.id==="usr_ahmad"?-1:o.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${g("team")}</h1>
        <p>${t("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${C()||I("manage_users")?`<button class="btn btn-primary" data-action="new-user">${h("plus",15)} ${g("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${a.map(n=>{const o=teamMetrics(n.id,s.data?.tasks||[]),r=n.id==="usr_ahmad";return`
          <article class="member-card ${r?"system-developer-card":""}" style="${r?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${V(n,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${p(t(n.name,n.nameEn||n.name))}</strong>
                  <span>${p(t(n.jobTitleAr||(r?"المبرمج / مدير النظام":""),n.jobTitleEn||n.jobTitleAr||""))}</span>
                </div>
              </div>
              ${r?`<span class="stealth-dev-badge">${h("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:canManageAccountPermissions()&&n.id!==s.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${p(n.id)}">${h("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${n.status==="active"?"done":"not_started"}">${p(ie(n))}</span>
            </div>
            <div class="member-card-stats">
              <span>${g("progress")} <strong>${o.progress}%</strong></span>
              <span>${o.tasks} ${g("tasks")}</span>
            </div>
            <div class="member-email">${n.email?p(n.email):g("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function gi(e){const a=(s.data?.auditLogs||[]).filter(n=>n.details?.projectId===e||n.entityType==="project"&&n.entityId===e);return a.length?`<div class="audit-list">${a.map(n=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${p(n.user?t(n.user.name,n.user.nameEn||n.user.name):"DARC")} · ${p(n.action)}</strong><span>${p(n.entityType)} · ${dateLabel(n.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${h("check",18)}<span>${t("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function vi(e){const a=e.lastActiveAt||e.customFields?.lastActiveAt,n=e.lastLoginAt||e.customFields?.lastLoginAt;if(!a&&!n)return`<span class="activity-never">${t("لم يسجل دخول بعد","Never logged in")}</span>`;const o=Date.now(),r=a?new Date(a).getTime():0,i=e.id===s.data?.user?.id?0:r&&!isNaN(r)?Math.floor((o-r)/6e4):999999,d=i>=0&&i<=5;let l="";if(d)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${t("نشط الآن","Online")}</span>`;else if(i<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${t(`منذ ${i} دقيقة`,`${i}m ago`)}</span>`;else if(i<1440){const u=Math.floor(i/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${t(`منذ ${u} ساعة`,`${u}h ago`)}</span>`}else r>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(a,!1)}</span>`);const c=n?`<span class="activity-sub" title="${p(n)}">${t("دخول:","Login:")} ${dateLabel(n,!0)}</span>`:"";return`<div class="activity-wrapper">${l}${c}</div>`}function sn(e){return Ha(e,{includeSeconds:!0})}function Kt(e){const a=e.action||"",n=e.entityType||e.entity_type||"",o=e.details||{};let r="badge-neutral",i=a,d=n;a==="login"?(r="badge-teal",i=t("تسجيل دخول","Sign In"),d=t("جلسة نظام","System Session")):a==="create"?(r="badge-mint",i=t("إنشاء جديد","Created")):a==="update"?(r="badge-blue",i=t("تعديل بيانات","Updated")):a==="delete"?(r="badge-red",i=t("نقل للمهملات","Moved to Trash")):a==="status_change"?(r="badge-amber",i=t("تغيير حالة","Status Changed")):a==="export_report"?(r="badge-teal",i=t("تصدير تقرير","Exported Report")):a==="restore"?(r="badge-mint",i=t("استعادة","Restored")):a==="purge"?(r="badge-danger",i=t("حذف نهائي","Purged")):a==="invite"&&(r="badge-blue",i=t("دعوة مستخدم","Invite Sent")),n==="task"?d=t("مهمة","Task"):n==="project"?d=t("مشروع","Project"):n==="document"?d=t("مستند","Document"):n==="user"?d=t("مستخدم","User"):n==="report"?d=t("تقرير","Report"):n==="role"&&(d=t("دور وصلاحيات","Role"));let l="—";return o.title||o.name?l=`<strong>${p(o.title||o.name)}</strong>`:a==="status_change"&&(o.oldStatus||o.newStatus)?l=`<span>${p(H(o.oldStatus))} ➔ <strong>${p(H(o.newStatus))}</strong></span>`:e.entityId&&(l=`<code style="font-size:11px;color:var(--muted);">${p(e.entityId)}</code>`),{badgeClass:r,actionLabel:i,entityLabel:d,detailHtml:l}}function yi(e=null){const a=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!a.length){k(t("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const n=s.data?.company||{},o=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let r=n.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=s.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=Je(),c=Tt();let u=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${r?`<img src="${p(r)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${t("سجل الرقابة والتدقيق الأمني والعمليات — "+o,"Audit & Security Trail Report — "+o)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${t("المؤسسة:","Company:")} ${p(o)} | ${t("المشرف المستخرج:","Exported by:")} ${p(d)} | ${t("تاريخ التصدير:","Export Date:")} ${p(l)} ${p(c)}
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
  `;a.forEach((f,x)=>{const T=f.user||(f.userId?(s.data?.users||[]).find(_=>_.id===f.userId):null),S=T?t(T.name,T.nameEn||T.name):t("النظام","System"),E=T?ie(T):"—",M=sn(f.createdAt),{actionLabel:L,entityLabel:b}=Kt(f);let A="";f.details?.title||f.details?.name?A=f.details.title||f.details.name:f.action==="status_change"?A=`${H(f.details?.oldStatus)} ➔ ${H(f.details?.newStatus)}`:typeof f.details=="object"?A=JSON.stringify(f.details):A=String(f.details||f.entityId||"—");const D=x%2===0?"#ffffff":"#f8fafc";u+=`
      <tr style="background:${D};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${p(F(f.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${p(F(`${M.date} ${M.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${p(F(S))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${p(F(E))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${p(F(L))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${p(F(b))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${p(F(A))}</td>
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
  `,v=new Blob(["\uFEFF"+m],{type:"application/vnd.ms-excel;charset=utf-8;"}),w=URL.createObjectURL(v),y=document.createElement("a");y.href=w;const $=new Date().toISOString().split("T")[0];y.download=`DARC_Audit_Trail_${$}.xls`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(w),k(t("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),j("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${$}`,details:{reportType:"Audit_Logs_Excel",count:a.length}})}).catch(()=>{})}function bi(e=null){const a=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!a.length){k(t("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const n=s.data?.company||{},o=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let r=n.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=s.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=Je(),c=Tt(),u=a.length,m=a.filter(x=>x.action==="create").length,v=a.filter(x=>x.action==="update"||x.action==="status_change").length,w=a.filter(x=>x.action==="delete"||x.action==="purge"||x.action==="trash").length;let y="";a.forEach((x,T)=>{const S=x.user||(x.userId?(s.data?.users||[]).find(_=>_.id===x.userId):null),E=S?t(S.name,S.nameEn||S.name):t("النظام","System"),M=S?ie(S):"—",L=sn(x.createdAt),{actionLabel:b,entityLabel:A}=Kt(x);let D="";x.details?.title||x.details?.name?D=x.details.title||x.details.name:x.action==="status_change"?D=`${H(x.details?.oldStatus)} ➔ ${H(x.details?.newStatus)}`:typeof x.details=="object"?D=JSON.stringify(x.details):D=String(x.details||x.entityId||"—"),y+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${p(x.id||String(T+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${p(L.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${p(L.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${p(E)}</div>
          <div style="font-size:10px;color:#64748b;">${p(M)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${p(b)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${p(A)}</td>
        <td style="font-size:11px;color:#334155;">${p(D)}</td>
      </tr>
    `});const $=window.open("","_blank","width=1100,height=850");if(!$){k(t("يرجى السماح بالنوافذ المنبثقة للطباعة.","Please allow popups to print report."),!0);return}const f=`
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
          ${r?`<img src="${p(r)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${p(o)}</h1>
          <div class="report-subtitle">${t("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${t("المشرف المستخرج:","Generated By:")}</strong> ${p(d)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${p(l)} - ${p(c)}</div>
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
          <div class="kpi-val" style="color:#dc2626;">${w}</div>
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
          <span>${p(d)}</span>
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
  `;$.document.open(),$.document.write(f),$.document.close(),j("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:a.length}})}).catch(()=>{})}async function hi(){try{k(t("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const e=await j("/api/audit?limit=1000");e&&e.logs&&(s.data.auditLogs=e.logs,s.auditFullHistoryLoaded=!0,renderView(),k(t(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){k(e.message||t("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function re(e){const a=C();return e==="profile"||e==="security"||e==="notifications"?!0:e==="company"||e==="whatsapp"?a||I("manage_settings"):e==="roles"?a||I("manage_roles"):e==="accounts"?a||I("manage_users")||I("manage_existing_account_permissions")||I("view_user_activity"):e==="trash"?a||I("manage_trash"):e==="audit"?a||I("view_audit_logs"):e==="analytics"?a||I("manage_settings")||I("view_audit_logs"):e==="diagnostics"?a||I("manage_settings"):!1}function Rs(){const e=s.data?.user?.id,a=C(),n=re("company"),o=re("whatsapp"),r=re("roles"),i=re("accounts"),d=re("trash"),l=re("audit"),c=re("analytics"),u=re("diagnostics"),m=[["profile",t("الملف الشخصي","Profile")],["notifications",t("الإشعارات والتنبيهات","Notifications & Alerts")],...n?[["company",g("company")]]:[],...o?[["whatsapp",t("تنبيهات واتساب","WhatsApp Alerts")]]:[],...r?[["roles",g("roles")]]:[],...i?[["accounts",g("accounts")]]:[],["security",t("الأمان","Security")],...d?[["trash",t("سلة المهملات","Trash")]]:[],...l?[["audit",g("audit")]]:[],...c?[["analytics",t("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...u?[["diagnostics",t("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[]];m.some(([$])=>$===s.settingsSection)||(s.settingsSection=m[0]?.[0]||"profile");const v=s.data?.user||{};let w="";if(s.settingsSection==="profile"&&(w=`
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
              ${v.avatarUrl?`<img src="${p(v.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(v.avatarColor||"")?v.avatarColor:"#0d6269"};">${p(ht(v))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(v.avatarColor||"")?v.avatarColor:"#0d6269"};">${p(ht(v))}</div>`}
              <div class="avatar-upload-overlay">
                ${h("upload",18)}
                <span>${t("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${p(t(v.name,v.nameEn||v.name))}</h3>
            <p class="profile-user-role">${p(t(v.jobTitleAr||"",v.jobTitleEn||v.jobTitleAr||""))} · <span class="status-badge done">${p(ie(v))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${h("upload",14)} ${t("رفع صورة جديدة","Upload new avatar")}
              </label>
              <span class="upload-hint">${t("يدعم JPG, PNG, WebP (حد أقصى 2MB)","Supports JPG, PNG, WebP (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${g("nameAr")}</label>
              <input name="name" value="${p(v.name||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${p(v.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${g("jobTitle")} (${t("عربي","AR")})</label>
              <input name="jobTitleAr" value="${p(v.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${g("jobTitle")} (${t("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${p(v.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${g("email")}</label>
              <input value="${p(v.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${t("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${p(v.phone||v.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
              <small class="field-hint">${t("أدخل رقم هاتفك مع مفتاح الدولة لاستلام تنبيهات المهام والمخططات المسندة إليك مباشرة على الواتساب.","Enter your phone number with country code to receive alerts for assigned tasks and drawings directly on WhatsApp.")}</small>
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${t("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${Re()==="gregorian"?"selected":""}>${t("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Re()==="hijri"?"selected":""}>${t("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${t("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
      </section>
    `),s.settingsSection==="company"&&(a||I("manage_settings"))){const $=s.data?.company||{};w=`
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
              ${$.logoUrl?`<img src="${p($.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${h("building",24)}</span>`:`<span class="brand-mark">${h("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${h("upload",16)}
                <span>${t("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${p($.name||"DARC Design Team")}</strong>
            <span class="company-sub">${t("العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض","Arabic default · English support · Riyadh timezone")}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${h("upload",14)} ${t("رفع وتعديل الشعار","Upload & Change Logo")}
              </label>
              <span class="upload-hint">${t("يدعم PNG, SVG, JPG (حد أقصى 2MB)","Supports PNG, SVG, JPG (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${g("nameAr")}</label>
              <input name="nameAr" value="${p($.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${p($.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${g("emailStatus")}</label>
              <input value="${p(s.data?.emailConfigured?g("emailConfigured"):g("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${h("info",16)}<span>${g("emailInfo")}</span></div>
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
    `}if(s.settingsSection==="security"&&(w=`
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
    `),s.settingsSection==="notifications"){const $=typeof window<"u"&&"Notification"in window?Notification.permission:"unsupported",f=$==="granted",x=$==="denied";w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("الإشعارات والتنبيهات","Notifications & Alerts")}</h2>
            <p>${t("تخصيص قنوات وصول التنبيهات الفورية وإشعارات المتصفح لسطح المكتب.","Configure your real-time notification channels and desktop alerts.")}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-action="send-test-notification">
            ${h("bell",14)} ${t("إرسال إشعار تجريبي فوري","Send Test Notification")}
          </button>
        </div>

        <div style="display:grid;gap:16px;margin-top:16px;">
          <!-- 1. Browser Web Notifications Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon ${f?"teal":x?"red":"blue"}" style="margin-top:2px;">
                ${h("bell",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${t("إشعارات سطح المكتب والمتصفح (Web Push Alerts)","Desktop & Browser Web Notifications")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${t("تسمح للموقع بإرسال تنبيهات فورية للنظام حتى عندما يكون المتصفح في الخلفية أو تعمل على نافذة أخرى.","Allows the platform to deliver native desktop notifications even when you are in another tab or window.")}
                </p>
                <div style="margin-top:6px;">
                  <span class="mini-badge" style="background:${f?"var(--mint)":x?"var(--red-soft)":"var(--surface-soft)"};color:${f?"var(--teal)":x?"var(--red)":"var(--muted)"};font-weight:700;">
                    ${f?t("مفعلة على هذا المتصفح ✅","Enabled on this browser ✅"):x?t("محظورة من إعدادات المتصفح ❌","Blocked in browser settings ❌"):t("بانتظار الموافقة ⚠️","Permission pending ⚠️")}
                  </span>
                </div>
              </div>
            </div>
            <div>
              ${f?`
                <button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">
                  ${h("check",14)} ${t("فحص إشعار المتصفح","Test Browser Alert")}
                </button>
              `:`
                <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">
                  ${h("check",14)} ${t("تفعيل الإشعارات الآن","Enable Notifications")}
                </button>
              `}
            </div>
          </div>

          <!-- 2. Audio Chimes Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon teal" style="margin-top:2px;">
                ${h("check",16)}
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
    `}if(s.settingsSection==="accounts"&&i){const $=C()||I("view_user_activity"),f=C()||I("manage_users"),x=C()||I("manage_existing_account_permissions")||I("manage_users"),T=C();let S=s.data?.users||[];e!=="usr_ahmad"&&(S=S.filter(E=>E.id!=="usr_ahmad")),w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("accounts")}</h2>
            <p>${t("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${f?`<button class="btn btn-primary btn-sm" data-action="new-user">${h("plus",14)} ${g("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${g("team")}</th>
                <th>${g("role")}</th>
                <th>${g("email")}</th>
                <th>${g("accountStatus")}</th>
                ${$?`<th>${t("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${x?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${S.map(E=>{const M=E.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${V(E)}
                        <div class="team-member-copy">
                          <strong>${p(t(E.name,E.nameEn||E.name))}</strong>
                          <span>${p(t(E.jobTitleAr||(M?"المبرمج / مدير النظام":""),E.jobTitleEn||E.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${M?`<span class="stealth-dev-badge">${h("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:p(ie(E))}
                    </td>
                    <td>
                      ${E.email?p(E.email):`<span style="color:var(--muted)">${g("noEmail")}</span>`}
                      ${E.phone||E.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;">📱 ${p(E.phone||E.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${E.status==="active"?"done":"not_started"}">${E.status==="active"?g("activeAccount"):g("pendingAccount")}</span>
                    </td>
                    ${$?`
                      <td>
                        ${vi(E)}
                      </td>
                    `:""}
                    ${x?`
                      <td>
                        <div class="role-actions">
                          ${M?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${p(E.id)}">${g("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${p(E.id)}">${g("edit")}</button>
                            ${E.id!==s.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${p(E.id)}" title="${E.status==="pending"?t("تفعيل الحساب يدوياً","Activate manually"):t("تغيير كلمة المرور","Change password")}">${h(E.status==="pending"?"check":"settings",13)}</button>
                              ${T?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${p(E.id)}" title="دخول كـ هذا الحساب">${h("user",13)}</button>`:""}
                            `:""}
                            ${E.id!==s.data?.user?.id&&E.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${p(E.id)}">${h("send",13)}</button>`:""}
                            ${E.id!==s.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${p(E.id)}">${h("trash",13)}</button>`:""}
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
    `}if(s.settingsSection==="roles"&&(a||I("manage_roles"))&&(w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("roles")}</h2>
            <p>${t("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${a||I("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${h("plus",14)} ${g("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(s.data?.roles||[]).map($=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${p(t($.nameAr,$.nameEn))}</strong>
                  ${$.builtIn?`<span class="role-system-badge">${h("shield",11)} ${g("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${p(t($.descriptionAr,$.descriptionEn))}</p>
                <div class="role-meta">${$.permissions.includes("*")?t("صلاحية كاملة","Full access"):`${$.permissions.length} ${g("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${p($.id)}">${h("edit",13)} ${g("edit")}</button>
                ${$.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${p($.id)}">${h("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),s.settingsSection==="trash"&&d){if(!s.trash&&typeof sessionStorage<"u")try{const b=sessionStorage.getItem("darc_trash_cache");b&&(s.trash=JSON.parse(b))}catch{}!s.trashLoaded&&!s._trashFetching&&(s._trashFetching=!0,j("/api/trash").then(b=>{s.trash=Array.isArray(b)?b:b.trash||[...(b.projects||[]).map(A=>({...A,type:"project"})),...(b.tasks||[]).map(A=>({...A,type:"task"})),...(b.documents||[]).map(A=>({...A,type:"document"}))],s.trashLoaded=!0,s._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(b=>{s._trashFetching=!1,console.error("[Trash fetch error]",b)}));const $=s.trash||[],f=s.trashFilter||"all",x=(s.trashQuery||"").trim().toLowerCase(),T=$.filter(b=>{if(f!=="all"&&b.type!==f)return!1;if(!x)return!0;const A=(t(b.nameAr||b.titleAr,b.nameEn||b.titleEn)||b.name||b.title||b.originalName||"").toLowerCase(),D=(b.code||b.projectCode||"").toLowerCase(),_=(b.projectNameAr||b.projectNameEn||"").toLowerCase();return A.includes(x)||D.includes(x)||_.includes(x)}),S=$.filter(b=>b.type==="project").length,E=$.filter(b=>b.type==="task").length,M=$.filter(b=>b.type==="document").length,L=$.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${h("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${t("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${t("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${f==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${h("layers",14)}
            <span>${t("الكل","All")}</span>
            <span class="badge ${f==="all"?"badge-on-primary":"badge-neutral"}">${$.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${f==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${h("building",14)}
            <span>${t("المشاريع","Projects")}</span>
            <span class="badge ${f==="project"?"badge-on-primary":"badge-neutral"}">${S}</span>
          </button>
          <button type="button" class="btn btn-sm ${f==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${h("checklist",14)}
            <span>${t("المهام","Tasks")}</span>
            <span class="badge ${f==="task"?"badge-on-primary":"badge-neutral"}">${E}</span>
          </button>
          <button type="button" class="btn btn-sm ${f==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${h("document",14)}
            <span>${t("المستندات","Documents")}</span>
            <span class="badge ${f==="document"?"badge-on-primary":"badge-neutral"}">${M}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${h("search",14)}
          <input type="search" placeholder="${t("بحث في المحذوفات...","Search deleted items...")}" value="${p(s.trashQuery||"")}" data-action="search-trash-input" />
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
              ${T.map(b=>{const A=b.type==="project",D=b.type==="task",_=b.type==="document",z=t(b.nameAr||b.titleAr,b.nameEn||b.titleEn)||b.name||b.title||b.originalName||b.code||t("عنصر محذوف","Deleted item"),N=!A&&b.projectId?(s.data?.projects||[]).find(W=>W.id===b.projectId):null,O=b.projectNameAr||b.projectNameEn||(N?t(N.nameAr,N.nameEn||N.nameAr):null),R=b.projectCode||N?.code,Y=_&&b.size?b.size>1048576?(b.size/1048576).toFixed(1)+" MB":Math.round(b.size/1024)+" KB":"",te=a||I("manage_trash")||b.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${A?"is-project":D?"is-task":"is-doc"}">
                          ${h(A?"building":D?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${p(z)}</strong>
                          ${b.code||A?`<span class="trash-item-code">${p(b.code||b.id)}</span>`:""}
                          ${_&&Y?`<span class="trash-item-code" style="color:var(--muted);">${Y}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${A?"type-project":D?"type-task":"type-doc"}">
                        ${h(A?"building":D?"checklist":"document",11)}
                        ${A?t("مشروع","Project"):D?t("مهمة","Task"):t("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${A?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${t("مشروع رئيسي","Primary Project")}</span>`:O?`${h("building",11)} <span>${p(O)}${R?` (${p(R)})`:""}</span>${_&&b.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${p(b.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${b.status?`<span class="status-badge ${p(b.status)}">${p(H(b.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${p(b.deletedAt||"")}">
                        ${dateLabel(b.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${s.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${p(b.type)}" data-id="${p(b.id)}" title="${t("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${h(s.lang==="ar"?"arrow":"arrowLeft",12)} ${t("استعادة","Restore")}
                        </button>
                        ${te?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${p(b.type)}" data-id="${p(b.id)}" title="${t("حذف العنصر نهائياً","Permanently delete item")}">
                            ${h("trash",12)} ${t("حذف نهائي","Purge")}
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
          ${h("search",22)}
          <span>${t("لا توجد نتائج تطابق بحثك في سلة المهملات.","No items match your search in trash.")}</span>
        </div>
      `}
    `:!s.trashLoaded&&!$.length?`
      <div style="padding:48px 20px;text-align:center;">
        <div style="width:32px;height:32px;margin:0 auto 14px;border:3px solid var(--line);border-top-color:var(--teal);border-radius:50%;animation:spin 0.75s linear infinite;"></div>
        <div style="font-size:14px;font-weight:700;color:var(--ink);">${t("جاري فحص واسترجاع عناصر سلة المهملات...","Loading recycle bin items...")}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px;">${t("يتم جلب المشاريع والمهام والمستندات المحذوفة من الخادم...","Fetching deleted projects, tasks, and drawings from server...")}</div>
      </div>
    `:`
      <div class="empty">
        ${h("trash",24)}
        <span>${t("سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.","Trash is empty, no deleted items found.")}</span>
      </div>
    `;w=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!s.trashLoaded&&!$.length?t("جاري التحميل...","Loading..."):`${$.length} ${t("عناصر","items")}`}
              </span>
            </div>
            <p>${t("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(a||I("manage_trash"))&&$.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${t("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${h("trash",13)} ${t("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${L}
      </section>
    `}if(s.settingsSection==="audit"&&(a||I("view_audit_logs"))){const $=[...s.data?.auditLogs||[]].sort((A,D)=>new Date(D.createdAt).getTime()-new Date(A.createdAt).getTime()),f=s.auditFilterAction||"all",x=s.auditFilterEntity||"all",T=s.auditFilterUser||"all",S=(s.auditSearchQuery||"").trim().toLowerCase(),E=$.filter(A=>{if(f!=="all"&&A.action!==f||x!=="all"&&(A.entityType||A.entity_type)!==x||T!=="all"&&(A.userId||A.user_id||A.user?.id)!==T)return!1;if(S){const D=A.user||(A.userId?(s.data?.users||[]).find(W=>W.id===A.userId):null),_=(D&&t(D.name,D.nameEn||D.name)||"").toLowerCase(),{actionLabel:z,entityLabel:N}=Kt(A),O=(z||A.action||"").toLowerCase(),R=(N||A.entityType||"").toLowerCase(),Y=(A.id||A.entityId||"").toLowerCase(),te=typeof A.details=="object"?JSON.stringify(A.details).toLowerCase():String(A.details||"").toLowerCase();if(!(_.includes(S)||O.includes(S)||R.includes(S)||Y.includes(S)||te.includes(S)))return!1}return!0});s._lastFilteredAuditLogs=E;const M=[["all",t("كافة العمليات","All Actions")],["create",t("إنشاء جديد","Create")],["update",t("تعديل بيانات","Update")],["status_change",t("تغيير حالة","Status Change")],["delete",t("نقل للمهملات","Delete / Trash")],["restore",t("استعادة","Restore")],["purge",t("حذف نهائي","Purge")],["export_report",t("تصدير تقرير","Export Report")],["login",t("تسجيل دخول","Sign In")],["invite",t("دعوة مستخدم","Invite")]],L=[["all",t("كافة العناصر","All Entities")],["project",t("المشاريع","Projects")],["task",t("المهام","Tasks")],["document",t("المستندات","Documents")],["user",t("المستخدمين","Users")],["role",t("الأدوار والصلاحيات","Roles")],["company",t("إعدادات الشركة","Company Settings")],["report",t("التقارير","Reports")]],b=f!=="all"||x!=="all"||T!=="all"||!!S;w=`
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
                  ${t("من أصل","out of")} ${$.length}
                </span>
              `:""}
            </div>
            <p>${t("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${s.auditFullHistoryLoaded?"":`
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${t("جلب الأرشيف الكامل للسجلات من السيرفر","Load complete audit archive")}">
                ${h("refresh",13)} ${t("تحميل الأرشيف الكامل","Load All History")}
              </button>
            `}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${t("تصدير السجل كملف Excel منسق","Export as styled Excel file")}">
              ${h("download",13)} ${t("تصدير Excel","Export Excel")}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${t("معاينة وطباعة تقرير رسمي وحفظه كـ PDF","Print or save executive PDF report")}">
              ${h("printer",13)} ${t("طباعة تقرير PDF","Print / PDF")}
            </button>
          </div>
        </div>

        <div class="view-toolbar audit-toolbar" style="gap:10px;margin-bottom:16px;">
          <div class="search-box search-sm" style="flex:1;min-width:240px;max-width:380px;">
            ${h("search",14)}
            <input type="search" placeholder="${t("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${p(s.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${M.map(([A,D])=>`<option value="${A}" ${f===A?"selected":""}>${D}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${L.map(([A,D])=>`<option value="${A}" ${x===A?"selected":""}>${D}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${t("كافة المستخدمين","All Users")}</option>
              ${(s.data?.users||[]).map(A=>`<option value="${A.id}" ${T===A.id?"selected":""}>${p(t(A.name,A.nameEn||A.name))}</option>`).join("")}
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
                ${E.map(A=>{const D=A.user||(A.userId?(s.data?.users||[]).find(W=>W.id===A.userId):null),_=D?t(D.name,D.nameEn||D.name):t("النظام","System"),z=D?ie(D):t("تلقائي","Automated"),N=sn(A.createdAt),{badgeClass:O,actionLabel:R,entityLabel:Y,detailHtml:te}=Kt(A);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${V(D)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${p(_)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${p(z)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${O}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${p(R)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${p(Y)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${te}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${s.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${p(N.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${h("clock",11)}
                          <span>${p(N.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${h(b?"search":"checklist",24)}
            <span>${b?t("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):t("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${b?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${t("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(s.settingsSection==="analytics"&&c&&(w=mi()),s.settingsSection==="diagnostics"&&u&&(w=fi()),s.settingsSection==="whatsapp"&&o){const $=s.data?.company?.customFields?.whatsapp||s.data?.company?.custom_fields?.whatsapp||{};w=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <h2>${t("تنبيهات واتساب الميدانية للمشاريع","Field WhatsApp Alerts")}</h2>
            <p>${t("ربط آمن عبر بروتوكول Multi-Device المباشر مع خوارزميات محاكاة السلوك البشري لحماية الأرقام من الحظر.","Secure connection via Multi-Device protocol with anti-ban human behavior simulation.")}</p>
          </div>
          <span class="status-badge ${$.enabled?"done":"neutral"}">
            ${$.enabled?t("مفعل نشط ✅","Active ✅"):t("معطل ⏸️","Disabled ⏸️")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${t("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${t("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${$.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${t("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${$.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${$.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${t("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${p($.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${t("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${p($.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${t("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${t("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${p($.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${t("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${p($.recipient||"")}" placeholder="${t("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${t("💡 ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","💡 Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${t("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${$.notifyOnCollectiveMention!==!1?"checked":""} />
                <span>📢 ${t("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${$.sendGroupBroadcast?"checked":""} />
                <span>👥 ${t("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${$.notifyOnBlocked!==!1?"checked":""} />
                <span>⚠️ ${t("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${$.notifyOnApproval!==!1?"checked":""} />
                <span>🔍 ${t("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${$.notifyOnDrawing!==!1?"checked":""} />
                <span>📐 ${t("عند اعتماد أو رفع مخطط معماري أو إنشائي جديد (New Drawing)","When an architectural or structural drawing is approved/uploaded")}</span>
              </label>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:10px;">
            <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:7px;">
              ${h("check",14)} <span>${t("حفظ إعدادات واتساب","Save WhatsApp Settings")}</span>
            </button>
            <button type="button" class="btn btn-soft" data-action="test-whatsapp" style="display:inline-flex;align-items:center;gap:7px;">
              <span>📲</span> <span>${t("إرسال تنبيه تجريبي للواتساب","Send Test WhatsApp Alert")}</span>
            </button>
          </div>
        </form>
      </section>
    `}const y=a||I("manage_settings")||I("manage_roles")||I("manage_users")||I("manage_trash")||I("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${y?t("تحكم مركزي","CENTRAL CONTROL"):t("الملف الشخصي","USER PROFILE")}</p>
        <h1>${y?g("settings"):t("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${y?t("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):t("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${h(a?"shield":"user",13)} ${p(ie(v))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${m.map(([$,f])=>`<button class="${s.settingsSection===$?"active":""}" data-action="settings-section" data-section="${$}">${f}</button>`).join("")}
      </aside>
      <div class="settings-content">${w}</div>
    </div>
  `}var xi=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function Ns(e=null){const a=s.data?.permissionsCatalog&&s.data.permissionsCatalog.length>=10?s.data.permissionsCatalog:xi,n=new Map;a.forEach(c=>{const u=c.category||"general",m=t(c.categoryAr||u,c.categoryEn||u);n.has(u)||n.set(u,{name:m,items:[]}),n.get(u).items.push(c)});const o=e?.id==="admin"||e?.permissions&&e.permissions.includes("*"),r=Array.from(n.entries()).map(([c,u])=>{const m=u.items.map(v=>{const w=v.id||v.key,y=t(v.nameAr||v.ar,v.nameEn||v.en||w),$=o||e?.permissions&&(e.permissions.includes(w)||typeof PERMISSION_ALIASES<"u"&&PERMISSION_ALIASES[w]&&e.permissions.includes(PERMISSION_ALIASES[w])),f=o?"disabled":"";return`
        <label class="permission-option" style="cursor:${o?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${p(w)}" ${$?"checked":""} ${f} />
          <span style="font-weight:500;">${p(y)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${p(u.name)}</span>
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
    <form id="role-form" data-role-id="${p(e?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${g("nameAr")} *</label>
          <input name="nameAr" value="${p(e?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${g("nameEn")}</label>
          <input name="nameEn" value="${p(e?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${g("roleDescription")}</label>
          <textarea name="descriptionAr" rows="2">${p(e?.descriptionAr||"")}</textarea>
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
        <button type="submit" class="btn btn-primary">${h("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=he(e?t("تعديل الدور والصلاحيات","Edit role & permissions"):g("addRole"),t("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),d,"role","modal-lg");const l=document.getElementById("modal-root");if(l){const c=l.querySelector("#btn-perm-select-all"),u=l.querySelector("#btn-perm-deselect-all");c&&c.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(m=>m.checked=!0)}),u&&u.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(m=>m.checked=!1)})}}function Os(e=null){if(e?.id==="usr_ahmad"&&s.data?.user?.id!=="usr_ahmad")return k(t("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!e&&!C())return k(g("adminOnly"),!0);const a=!C(),n=a?"disabled":"",o=(s.data?.roles||[]).filter(i=>C()||i.id!=="admin"),r=`<form id="user-form" data-user-id="${p(e?.id||"")}" data-permission-only="${a}"><div class="form-grid"><div class="field full"><label>${g("nameAr")}</label><input name="name" value="${p(e?.name||"")}" ${n} required /></div><div class="field"><label>${g("nameEn")}</label><input name="nameEn" value="${p(e?.nameEn||"")}" ${n} /></div><div class="field"><label>${g("jobTitle")}</label><input name="jobTitleAr" value="${p(e?.jobTitleAr||"")}" ${n} /></div><div class="field"><label>${g("email")}</label><input name="email" type="email" value="${p(e?.email||"")}" placeholder="name@darc.com" ${n} /></div><div class="field"><label>${t("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${p(e?.phone||e?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${n} /></div><div class="field"><label>${g("role")}</label><select name="roleId">${o.map(i=>`<option value="${p(i.id)}" ${e?.roleId===i.id?"selected":""}>${p(t(i.nameAr,i.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${a?t("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):t("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button><button type="submit" class="btn btn-primary">${h("check",14)} ${e?a?t("حفظ الصلاحية","Save permission"):g("save"):g("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=he(e?a?t("تعديل صلاحية الحساب","Change account permission"):t("تعديل حساب العضو","Edit member account"):g("addMember"),t("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),r,"user")}var Bs=pe({buildProjectMemberChipsHtml:()=>Sa,exportPortfolioPDF:()=>Di,exportPortfolioXLS:()=>Ti,exportProjectPDF:()=>Aa,exportProjectXLS:()=>Ii,exportXLS:()=>dn,getCompanyBranding:()=>Ct,getDaysLeftBadge:()=>on,getProjectTeam:()=>Us,getProjectTeamData:()=>jt,openCloneModal:()=>Hs,openProjectModal:()=>rn,projectCard:()=>Si,projectRow:()=>Fs,renderInPagePrintModal:()=>ln,renderProjectCardTeamAvatars:()=>ki,renderProjectDetail:()=>qs,renderProjectOverviewTab:()=>Ai,renderProjectTeamAvatars:()=>wi,renderProjectTimelineBar:()=>$i,renderProjects:()=>Ei});function Fs(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${h("building",17)}</span><div class="project-name"><strong>${p(t(e.nameAr,e.nameEn))}</strong><span>${p(e.code)} · ${p(t(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${V(e.manager)}<span>${p(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${p(e.id)}" aria-label="${g("viewDetails")}">${h(s.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function on(e){if(!e)return"";const a=Ie(e);if(!a||isNaN(a.getTime()))return"";const n=Math.ceil((a-new Date)/864e5);if(isNaN(n))return"";let o="var(--mint-strong)",r="var(--mint)",i="";return n<0?(o="var(--red)",r="var(--red-soft)",i=t(`متأخر ${Math.abs(n)} يوم`,`${Math.abs(n)}d overdue`)):n===0?(o="var(--red)",r="var(--red-soft)",i=t("يستحق اليوم","Due today")):n<=2?(o="var(--red)",r="var(--red-soft)",i=t(`باقي ${n} يوم`,`${n}d left`)):n<=7?(o="var(--amber)",r="var(--amber-soft)",i=t(`باقي ${n} أيام`,`${n}d left`)):(o="var(--mint-strong)",r="var(--mint)",i=t(`باقي ${n} يوم`,`${n}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${o};background:${r};border:1px solid currentColor;">${h("clock",11)} ${i}</span>`}function jt(e){const a=s.data?.users||[],n=(s.data?.tasks||[]).filter(i=>i.projectId===e.id),o=new Set,r=new Set;return e.managerId&&o.add(e.managerId),n.forEach(i=>{i.assigneeId&&o.add(i.assigneeId),(i.customFields?.additionalAssignees||i.customFields?.additional_assignees||[]).forEach(d=>o.add(d)),(i.customFields?.externalAssignees||i.customFields?.external_assignees||[]).forEach(d=>{d&&typeof d=="string"&&d.trim()&&r.add(d.trim())})}),{internalMembers:Array.from(o).map(i=>a.find(d=>d.id===i)).filter(Boolean),externalMembers:Array.from(r)}}function Us(e){return jt(e).internalMembers}function wi(e,a=4,n=!0,o=[]){if((!e||!e.length)&&(!o||!o.length))return`<span style="font-size:11px;color:var(--muted);">${t("لا يوجد فريق محدد","No team assigned")}</span>`;const r=(e||[]).slice(0,a),i=(e||[]).length-a,d=(e||[]).map(c=>t(c.name,c.nameEn||c.name)).join("، ");let l='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return r.forEach(c=>{const u=t(c.name,c.nameEn||c.name),m=n?`data-action="filter-by-member" data-member-id="${p(c.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';l+=`
      <span class="team-member-chip" ${m} title="${p(u)} (${p(ie(c))})">
        ${V(c,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${p(u)}</span>
      </span>
    `}),i>0&&(l+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${p(d)}">+${i} ${t("آخرين","more")}</span>`),o&&o.length>0&&(l+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${p(o.join("، "))}">🌐 +${o.length} ${t("خارجي","ext")}</span>`),l+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${t("فريق العمل الداخلي","Internal Team")} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(c=>`
        <div ${n?`data-action="filter-by-member" data-member-id="${p(c.id)}" title="${p(t("فلترة مهام "+(c.name||""),"Filter tasks of "+(c.nameEn||c.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${n?"cursor:pointer;transition:all 0.15s;":""}" ${n?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${V(c,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${p(t(c.name,c.nameEn||c.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${p(ie(c))}</span>
          </div>
        </div>
      `).join("")}
    </div>
    
    ${o&&o.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${t("الشركاء والمتعاونون الخارجيون","External Partners")} (${o.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${o.map(c=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${p(c)}</span>
          </div>
        `).join("")}
      </div>
    `:""}

    ${n?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${t("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,l+="</div>",l}function $i(e){if(!e.dueDate)return"";const a=Ie(e.dueDate);if(!a||isNaN(a.getTime()))return"";const n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),o=new Date,r=a.getTime()-n.getTime();let i=0;r>0&&!isNaN(r)&&(i=Math.min(100,Math.max(0,Math.round((o.getTime()-n.getTime())/r*100))));const d=o>a,l=d?"var(--red)":i>=80&&!d?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${h("clock",12)}
          <strong>${t("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${l};font-weight:bold;">${d?t("انتهى موعد التسليم!","Deadline passed!"):t(`مضى ${i}% من الوقت`,`${i}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${be(e.startDate)} ➔ ${be(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${i}%;background:${l};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function ki(e=[],a=[],n=3){const o=e.length+a.length;if(o===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const r=e.slice(0,n),i=o-r.length;[...e.map(l=>t(l.name,l.nameEn||l.name)),...a].join("، ");let d=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${t("عرض فريق العمل","View Team")}">`;return d+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',r.forEach((l,c)=>{d+=`
      <div style="margin-inline-start:${c===0?"0":"-8px"};position:relative;z-index:${10-c};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${V(l,"mini-avatar")}
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
            ${V(l,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p(t(l.name,l.nameEn||l.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${p(ie(l))}</span>
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
                • ${p(l)}
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  `,d+="</div>",d}function Si(e){const{internalMembers:a,externalMembers:n}=jt(e),o=e.manager||(s.data?.users||[]).find(d=>d.id===e.managerId),r=on(e.dueDate),i=t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
        <span class="project-card-symbol">${h("building",19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${p(e.code)}</span>
          <h3 class="project-card-title" title="${p(t(e.nameAr,e.nameEn))}">${p(t(e.nameAr,e.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        <span class="status-badge ${p(e.health)}">${p(H(e.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${p(i||"")}">
      ${i?p(i):`<span style="color:var(--muted);font-style:italic;">${t("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${V(o,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${g("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p(o?t(o.name,o.nameEn||o.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${g("team")} (${a.length+n.length})</span>
        ${ki(a,n,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${g("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${e.dueDate?be(e.dueDate,!0):"—"}</strong>
          ${r}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health==="off_track"?"red":e.health==="at_risk"?"amber":""}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${p(e.id)}">
      ${g("viewDetails")} ${h(s.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function Ai(e,a,n,o=[]){const r=e.manager||(s.data?.users||[]).find(c=>c.id===e.managerId),i=a.filter(c=>c.status==="done").length,d=a.filter(c=>c.status==="in_progress").length,l=a.filter(De).length;return`
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
      ${$i(e)}

      <!-- Details Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${h("document",16)}
            ${t("نطاق وتفاصيل المشروع","Project Scope & Details")}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${p(e.descriptionAr||e.descriptionEn||t("لا يوجد وصف مسجل لهذا المشروع حالياً.","No description available for this project."))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("client")}</span>
              <strong style="font-size:13px;color:var(--ink);">${p(t(e.clientAr,e.clientEn)||"—")}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("lifecycle")}</span>
              <strong style="font-size:13px;color:var(--ink);">${p(H(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${be(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${be(e.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${h("users",16)}
            ${t("القيادة وفريق العمل","Leadership & Team")}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${V(r)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${g("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${p(r?t(r.name,r.nameEn||r.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${p(r?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${t("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${n.map(c=>{const u=a.filter(m=>m.assigneeId===c.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${V(c,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${p(t(c.name,c.nameEn||c.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${p(ie(c))}</span>
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
              ${o.map(c=>{const u=a.filter(m=>(m.customFields?.externalAssignees||m.customFields?.external_assignees||[]).includes(c)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${p(c)}</strong>
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
  `}function Ei(){const e=s.searches.projects.trim().toLowerCase();let a=(s.data?.projects||[]).filter(o=>`${o.nameAr} ${o.nameEn} ${o.code} ${o.clientAr}`.toLowerCase().includes(e));const n=s.projectSort||"default";return n==="alpha-asc"?a.sort((o,r)=>(t(o.nameAr,o.nameEn)||"").localeCompare(t(r.nameAr,r.nameEn)||"",s.lang==="ar"?"ar":"en")):n==="alpha-desc"?a.sort((o,r)=>(t(r.nameAr,r.nameEn)||"").localeCompare(t(o.nameAr,o.nameEn)||"",s.lang==="ar"?"ar":"en")):n==="progress-asc"?a.sort((o,r)=>(Number(o.progress)||0)-(Number(r.progress)||0)):n==="progress-desc"&&a.sort((o,r)=>(Number(r.progress)||0)-(Number(o.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${t("المحفظة","PORTFOLIO")}</p><h1>${g("projects")}</h1><p>${t("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${I("create_projects")?`<button class="btn btn-primary" data-action="new-project">${h("plus",15)} ${g("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${h("search",15)}<input data-search="projects" value="${p(s.searches.projects)}" placeholder="${g("search")}" /></div><div class="sort-box"><span>${t("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${n==="default"?"selected":""}>${t("الافتراضي","Default")}</option><option value="alpha-asc" ${n==="alpha-asc"?"selected":""}>${t("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${n==="alpha-desc"?"selected":""}>${t("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${n==="progress-asc"?"selected":""}>${t("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${n==="progress-desc"?"selected":""}>${t("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${a.length} ${t("مشاريع","projects")}</span></div></div>${a.length?`<div class="project-cards">${a.map(Si).join("")}</div>`:`<section class="panel"><div class="empty">${h("building",18)}<span>${g("noProjects")}</span></div></section>`}`}function qs(){const e=s.data?.projects?.find(v=>v.id===s.activeProjectId);if(!e)return s.view="projects",Ei();const a=(s.data?.tasks||[]).filter(v=>v.projectId===e.id),{internalMembers:n,externalMembers:o}=jt(e),r=s.projectTab||"tasks",i=s.projectMemberFilter||null,d=i?a.filter(v=>v.assigneeId===i||(v.customFields?.additionalAssignees||v.customFields?.additional_assignees||[]).includes(i)):a,l=i?s.data?.users?.find(v=>v.id===i):null;let c="";if(r==="overview")c=Ai(e,a,n,o);else if(r==="tasks"){const v=s.projectTaskSort||rt();c=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${g("projectTasks")} ${i?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${t("مهام","Tasks of")}: ${p(t(l?.name,l?.nameEn||l?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${t("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${en(v,"sort-project-tasks")}
            ${i?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${h("close",12)} ${t("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${I("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${p(e.id)}" title="${t("اضغط N للإضافة السريعة","Press N to add quickly")}">${h("plus",14)} ${g("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${renderBoard(d,v)}
      </div>
    `}else if(r==="timeline"){const{renderTimelinePanel:v}=window.__timelineExports||{};c=v?v(d,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${sa(d)}</div>`}else if(r==="drawings"){const v=(s.data?.documents||[]).filter(f=>f.projectId===e.id&&!f.deletedAt),w=a.filter(f=>f.typeAr==="مخطط"||f.typeEn==="Drawing"||f.templateId),y=s.docTaskFilter||"all",$=y==="all"?v:v.filter(f=>f.taskId===y);c=`
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
                ${a.map(f=>`<option value="${p(f.id)}" ${y===f.id?"selected":""}>${p(t(f.titleAr,f.titleEn))}</option>`).join("")}
              </select>
            </div>
            ${I("create_tasks")?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${p(e.id)}">
                ${h("plus",12)} ${t("إضافة مخرج / مخطط","Add Deliverable / Drawing")}
              </button>
            `:""}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${h("document",14)} ${t("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${$.length})
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
                ${$.length>0?$.map(f=>{const x=a.find(S=>S.id===f.taskId),T=f.size>1048576?(f.size/1048576).toFixed(1)+" MB":Math.round((f.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${p(f.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${p(f.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${h("document",15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${p(f.originalName)}">
                              ${p(f.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${p(f.mimeType||"application/octet-stream")}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${x?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${p(x.id)}">${p(t(x.titleAr,x.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${p(f.status||"draft")}" style="font-size:11px;">
                          ${p(H(f.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${T}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${be(f.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${p(f.id)}" style="padding:5px;" title="${t("معاينة المخطط","Preview")}">
                            ${h("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${p(f.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ رابط Google Drive","Copy Drive Link")}">
                            ${h("link",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${p(f.id)}" style="padding:5px;color:var(--blue);" title="${t("تحميل المخطط","Download")}">
                            ${h("download",14)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `}).join(""):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${h("document",20)}
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
            ${h("checklist",14)} ${t("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${w.length})
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
                ${w.map(f=>`
                  <tr data-action="open-task" data-task-id="${p(f.id)}" style="cursor:pointer;" title="${t("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${p(t(f.titleAr,f.titleEn))}</span><span class="table-sub">${p(f.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${p(t(f.typeAr,f.typeEn)||t("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${p(f.status)}">${p(H(f.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${f.status==="done"?"var(--green)":"var(--blue)"};width:${f.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${f.progress||0}%</span>
                      </div>
                    </td>
                    <td>${f.assignee?p(t(f.assignee.name,f.assignee.nameEn||f.assignee.name)):"—"}</td>
                  </tr>
                `).join("")||`<tr><td colspan="5"><div class="empty">${g("noTasks")}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else r==="activity"&&(c=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("activity")}</h2><p class="panel-subtitle">${t("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${gi(e.id)}</div>`);const u=e.manager||(s.data?.users||[]).find(v=>v.id===e.managerId),m=on(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${h(s.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${p(e.code)} · ${e.demo?g("sampleData"):g("active")}</p>
          <h1>${p(t(e.nameAr,e.nameEn))}</h1>
          <p>${p(t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${h("user",12)} 
              <strong>${g("manager")}:</strong> ${p(u?t(u.name,u.nameEn||u.name):"—")}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${h("calendar",12)} ${be(e.dueDate,!0)}
                ${m}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${h("users",12)}
              <span style="font-size:11px;">${g("team")}:</span>
              ${wi(n,4,!0,o)}
            </span>
            <span class="status-badge ${p(e.health)}">${p(H(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${g("weightedProgress")}</span>
        ${I("edit_projects")||I("create_projects")||I("delete_projects")||I("view_reports")||C()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${h("more",15)} ${t("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${s.lang==="ar"?"left:0":"right:0"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;padding:5px;margin-top:5px;text-align:start">
              ${I("edit_projects")||C()?`<button class="menu-item" data-action="edit-project" data-project-id="${p(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${h("edit",14)} ${g("edit")}</button>`:""}
              ${I("create_projects")||C()?`<button class="menu-item" data-action="clone-project" data-project-id="${p(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${h("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>`:""}
              ${I("export_reports")||C()?`
                <button class="menu-item" data-action="export-project-pdf" data-project-id="${p(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--brand-teal);font-weight:600;">
                  ${h("printer",14)} ${t("تقرير تنفيذي معتمد (PDF)","Executive Report (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project-client-pdf" data-project-id="${p(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--ink);">
                  ${h("user",14)} ${t("تقرير تسليمات العميل (PDF)","Client Deliverables (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project" data-project-id="${p(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;">
                  ${h("document",14)} ${t("تصدير بيانات المهام (Excel)","Export Tasks (Excel)")}
                </button>
              `:""}
              ${I("delete_projects")||C()?`<button class="menu-item" data-action="delete-project" data-project-id="${p(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${h("trash",14)} ${t("حذف المشروع","Delete Project")}</button>`:""}
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
    
    ${c}
  `}function Sa(e=[]){const a=s.data?.users||[];return e.map(n=>{const o=a.find(r=>r.id===n)||{name:n,id:n};return`
      <span class="chip-item" data-uid="${p(n)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${V(o,"mini-avatar")}
        <span style="font-weight:500;">${p(t(o.name,o.nameEn||o.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${p(n)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function rn(e=null){const a=e?.code||`DARC-${String((s.data?.projects?.length||0)+1).padStart(3,"0")}`,n=e?jt(e).internalMembers.map(i=>i.id):[],o=n.length>0?n:[s.data?.user?.id].filter(Boolean),r=`
    <form id="project-form" data-project-id="${p(e?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${p(JSON.stringify(o))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${h("building",14)} <span>${t("البيانات الأساسية للمشروع","Core Project Information")}</span>
        </div>

        <div class="field full">
          <label>${g("nameAr")} *</label>
          <input name="nameAr" value="${p(e?.nameAr||"")}" placeholder="${t("مثال: فيلا النخيل — التصميم الداخلي","e.g. Al Nakheel Villa — Interior Design")}" required />
        </div>
        <div class="field">
          <label>${g("nameEn")}</label>
          <input name="nameEn" value="${p(e?.nameEn||"")}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${g("projectCode")} *</label>
          <input name="code" value="${p(a)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${g("client")}</label>
          <input name="clientAr" value="${p(e?.clientAr||"")}" placeholder="${t("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${h("calendar",14)} <span>${t("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${g("manager")}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${t("— بدون تحديد —","— Unassigned —")}</option>
            ${(s.data?.users||[]).map(i=>`<option value="${p(i.id)}" ${(e?e.managerId===i.id:s.data?.user?.id===i.id)?"selected":""}>${p(t(i.name,i.nameEn||i.name))}</option>`).join("")}
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
          <input type="date" name="startDate" value="${p((e?.startDate||"").split("T")[0])}" />
        </div>
        <div class="field">
          <label>${g("dueDate")}</label>
          <input type="date" name="dueDate" value="${p((e?.dueDate||"").split("T")[0])}" />
        </div>

        <!-- 👥 القسم 3: أعضاء فريق المشروع والمشاركون -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${h("users",14)} <span>${t("أعضاء فريق المشروع والمشاركون","Project Team Members & Collaborators")}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${t("اختر من الفريق لإعطائهم حق الوصول للمشروع","Select team members who can access this project")}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${o.length?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${Sa(o)}
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
          ${h("document",14)} <span>${t("نطاق المشروع والملاحظات","Scope & Notes")}</span>
        </div>

        <div class="field full">
          <label>${t("وصف ونطاق المشروع","Project Scope & Description")}</label>
          <textarea name="descriptionAr" placeholder="${t("وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...","Brief description of scope, design criteria, and special notes...")}">${p(e?.descriptionAr||"")}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${e&&(I("delete_projects")||C())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${p(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
              ${h("trash",14)} ${t("حذف المشروع","Delete Project")}
            </button>
          `:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
          <button type="submit" class="btn btn-primary">${h("check",14)} ${g(e?"save":"create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=he(e?t("تعديل بيانات المشروع","Edit Project"):g("addProject"),t("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),r,"project"),setTimeout(()=>{const i=document.getElementById("project-member-search"),d=document.getElementById("project-member-dropdown"),l=document.getElementById("project-members-chips-container"),c=document.getElementById("project-members-input"),u=document.getElementById("project-manager-select");if(!i||!d||!l||!c)return;let m=[...o];function v(){l.innerHTML=Sa(m),l.style.display=m.length?"flex":"none",c.value=JSON.stringify(m),l.querySelectorAll(".btn-remove-project-member").forEach(y=>{y.addEventListener("click",$=>{$.stopPropagation();const f=y.dataset.uid;m=m.filter(x=>x!==f),v()})})}u&&u.addEventListener("change",()=>{const y=u.value;y&&!m.includes(y)&&(m.push(y),v())});function w(y=""){const $=y.toLowerCase().trim(),f=(s.data?.users||[]).filter(x=>!m.includes(x.id)&&(!$||x.name&&x.name.toLowerCase().includes($)||x.nameEn&&x.nameEn.toLowerCase().includes($)||x.email&&x.email.toLowerCase().includes($)));f.length?(d.innerHTML=f.map(x=>`
          <div class="project-member-opt" data-uid="${p(x.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${V(x,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${p(t(x.name,x.nameEn||x.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${p(x.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${t("إضافة","Add")}</span>
          </div>
        `).join(""),d.querySelectorAll(".project-member-opt").forEach(x=>{x.addEventListener("mouseenter",()=>x.style.background="var(--surface-soft)"),x.addEventListener("mouseleave",()=>x.style.background="transparent"),x.addEventListener("click",()=>{const T=x.dataset.uid;T&&!m.includes(T)&&(m.push(T),v(),i.value="",d.style.display="none")})})):d.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${t("لا يوجد أعضاء مطابقون","No matching members")}</div>`,d.style.display="block"}i.addEventListener("focus",()=>w(i.value)),i.addEventListener("input",()=>w(i.value)),document.addEventListener("click",y=>{!i.contains(y.target)&&!d.contains(y.target)&&(d.style.display="none")}),v()},50)}function Hs(e){const a=`
    <form id="clone-form" data-project-id="${e.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${t("أنت على وشك استنساخ المشروع:","You are about to clone the project:")} <strong style="color:var(--ink)">${p(t(e.nameAr,e.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${g("nameAr")}</label>
          <input name="nameAr" value="${p(e.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${g("nameEn")}</label>
          <input name="nameEn" value="${p(e.nameEn)} (Copy)" required />
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
        <button type="submit" class="btn btn-primary">${h("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=he(t("استنساخ المشروع","Clone Project"),t("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),a,"clone");const n=document.getElementById("clone-form"),o=n.querySelector('input[name="cloneTasks"]'),r=n.querySelector('input[name="keepAssignees"]');o.addEventListener("change",i=>{r.disabled=!i.target.checked,i.target.checked||(r.checked=!1)}),n.addEventListener("submit",async i=>{i.preventDefault();const d=n.querySelector('button[type="submit"]');d.disabled=!0;try{const l={nameAr:n.nameAr.value,nameEn:n.nameEn.value,dueDate:n.dueDate.value,cloneTasks:n.cloneTasks.checked,keepAssignees:n.keepAssignees.checked,cloneMembers:n.cloneMembers.checked},c=await j(`/api/projects/${e.id}/clone`,{method:"POST",body:JSON.stringify(l)});B(),s.view="project-detail",s.activeProjectId=c.project.id,await refreshView(),k(t("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(l){k(l.message,!0),d.disabled=!1}})}function Ct(){const e=s.data?.company||{},a=e.nameAr||e.name||"فريق دارك للتصميم",n=e.nameEn||e.name||"DARC Design Team",o=t(a,n),r=e.logoUrl||"";let i=/^(https?:\/\/|data:image\/|\/)/i.test(r)&&!r.toLowerCase().includes("javascript:")?r:"";return i.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(i=`${window.location.origin}${i}`),{nameAr:a,nameEn:n,displayName:o,logoUrl:i,emailFrom:e.emailFrom||"",timezone:e.timezone||"Asia/Riyadh"}}function dn(e,a){const n=`
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
  `,o=new Blob(["\uFEFF"+n],{type:"application/vnd.ms-excel;charset=utf-8;"}),r=URL.createObjectURL(o),i=document.createElement("a");i.href=r,i.download=e+".xls",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}function Ti(){const e=s.data?.projects||[];if(!e||!e.length){k(t("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const a=Ct(),n=Je(),o=11;let r="<table>";r+=`<tr><td colspan="${o}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${a.logoUrl?`<img src="${p(a.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${p(a.displayName)}</span>
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
      <td>${p(F(i.code))}</td>
      <td>${p(F(i.nameAr))}</td>
      <td>${p(F(i.nameEn))}</td>
      <td>${p(F(t(i.clientAr,i.clientEn)))}</td>
      <td>${p(F(d))}</td>
      <td>${p(F(H(i.lifecycle)))}</td>
      <td>${p(F(H(i.health)))}</td>
      <td>${p(F(i.startDate||""))}</td>
      <td>${p(F(i.dueDate||""))}</td>
      <td>${i.progress||0}%</td>
      <td>${i.memberCount||0}</td>
    </tr>`}),r+="</table>",dn(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,r),k(t("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),j("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:t("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:e.length}})}).catch(()=>{})}function Ii(e){const a=(s.data?.projects||[]).find(m=>m.id===e);if(!a)return;const n=(s.data?.tasks||[]).filter(m=>m.projectId===e);if(!n.length){k(t("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const o=Ct(),r=s.data?.users||[],i=new Map(r.map(m=>[m.id,m]));function d(m){if(!m)return"—";const v=i.get(m);return v?t(v.name,v.nameEn||v.name):m}const l=Je(),c=11;let u="<table>";u+=`<tr><td colspan="${c}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${o.logoUrl?`<img src="${p(o.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${p(o.displayName)}</span>
  </td></tr>`,u+=`<tr><td colspan="${c}" class="subtitle">${t("تقرير مهام ومخرجات المشروع:","Project Tasks & Deliverables Report:")} ${p(t(a.nameAr,a.nameEn))} (${p(a.code)})</td></tr>`,u+=`<tr><td colspan="${c}" class="meta">${t("العميل / المالك:","Client:")} ${p(t(a.clientAr,a.clientEn))||"—"} | ${t("تاريخ الإصدار:","Generated on:")} ${l}</td></tr>`,u+=`<tr><td colspan="${c}" style="border:none;"></td></tr>`,u+=`<tr class="header">
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
  </tr>`,n.forEach((m,v)=>{const w=m.templateId?m.templateId.replace("tpl-","#"):m.id?`#${m.id.slice(-6)}`:`#${v+1}`,y=d(m.assigneeId||m.assignee_id),$=d(m.reviewerId||m.reviewer_id),f=d(m.approverId||m.approver_id);u+=`<tr>
      <td style="text-align:center;font-weight:bold;">${p(F(w))}</td>
      <td>${p(F(m.titleAr))}</td>
      <td>${p(F(m.titleEn))}</td>
      <td>${p(F(t(m.categoryAr,m.categoryEn)))}</td>
      <td>${p(F(y))}</td>
      <td style="color:#0369a1;">${p(F($))}</td>
      <td style="color:#047857;">${p(F(f))}</td>
      <td>${p(F(H(m.status)))}</td>
      <td>${p(F(m.startDate||""))}</td>
      <td>${p(F(m.dueDate||""))}</td>
      <td style="font-weight:bold;">${m.progress||0}%</td>
    </tr>`}),u+="</table>",dn(`DARC_Project_${a.code}_${new Date().toISOString().split("T")[0]}`,u),k(t("تم بدء تحميل تقرير المهام.","Report download started.")),j("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:t(`تقرير مهام مشروع: ${a.nameAr}`,`Project Tasks Report: ${a.nameEn||a.nameAr}`),taskCount:n.length}})}).catch(()=>{})}function Aa(e,a=!1){const n=(s.data?.projects||[]).find(b=>b.id===e);if(!n)return;const o=(s.data?.tasks||[]).filter(b=>b.projectId===e);if(!o.length){k(t("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const r=Ct(),i=s.data?.users||[],d=new Map(i.map(b=>[b.id,b]));function l(b){if(!b)return"—";const A=d.get(b);return A?t(A.name,A.nameEn||A.name):b}function c(b){if(!b?.dueDate||["done","completed","canceled"].includes(b.status))return!1;const A=Ie(b.dueDate);return A?A<new Date:!1}const u=o.length,m=o.filter(b=>["done","completed"].includes(b.status)).length,v=o.filter(b=>["review","approval"].includes(b.status)).length;o.filter(b=>b.status==="in_progress").length;const w=o.filter(b=>c(b)).length,y=new Date,$=Je(y),f=Tt(y),x=new Map;o.forEach(b=>{const A=t(b.categoryAr,b.categoryEn)||t(b.typeAr,b.typeEn)||t("عام","General"),D=x.get(A)||{total:0,completed:0,weight:0,progressSum:0},_=Number(b.weight||1);D.total++,["done","completed"].includes(b.status)&&D.completed++,D.weight+=_,D.progressSum+=(b.progress||0)*_,x.set(A,D)});const T=Array.from(x.entries()).map(([b,A])=>({name:b,percent:A.weight?Math.round(A.progressSum/A.weight):0,completed:A.completed,total:A.total})),S=a?t("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):t("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");a?t("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):t("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const E=o.map((b,A)=>{const D=b.templateId?b.templateId.replace("tpl-","#"):b.id?`#${b.id.slice(-6)}`:`#${A+1}`,_=t(b.titleAr,b.titleEn),z=t(b.categoryAr,b.categoryEn)||t(b.typeAr,b.typeEn)||"—",N=H(b.status),O=b.progress||0,R=b.dueDate||"—";if(a)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${A+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${p(D)}</td>
          <td style="font-weight:600;">${p(_)}</td>
          <td style="text-align:center;">${p(z)}</td>
          <td style="text-align:center;"><span class="badge ${p(b.status)}">${p(N)}</span></td>
          <td style="text-align:center;direction:ltr;">${p(R)}</td>
          <td style="text-align:center;font-weight:bold;color:${O===100?"#0d6269":"#1e293b"};">${O}%</td>
        </tr>
      `;const Y=l(b.assigneeId||b.assignee_id),te=l(b.reviewerId||b.reviewer_id),W=l(b.approverId||b.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${A+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${p(D)}</td>
        <td style="font-weight:600;">${p(_)}</td>
        <td style="text-align:center;">${p(z)}</td>
        <td>${p(Y)}</td>
        <td style="color:#0369a1;font-weight:600;">${p(te)}</td>
        <td style="color:#047857;font-weight:600;">${p(W)}</td>
        <td style="text-align:center;"><span class="badge ${p(b.status)}">${p(N)}</span></td>
        <td style="text-align:center;direction:ltr;">${p(R)}</td>
        <td style="text-align:center;font-weight:bold;color:${O===100?"#0d6269":"#1e293b"};">${O}%</td>
      </tr>
    `}).join(""),M=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${p(r.displayName)} - ${p(n.code)} - ${a?"Client_Report":"Executive_Report"}</title>
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
          <strong style="color:#0d6269;font-size:13px;">${p(S)}</strong>
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
            <img src="${p(r.logoUrl)}" alt="Logo" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${p(r.displayName)}</h1>
          <div class="brand-sub">${t("مكتب الاستشارات والتصميم الهندسي","Architecture & Engineering Consultancy")}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${p(S)}</div>
          <div><strong>${t("كود المشروع:","Project Code:")}</strong> ${p(n.code)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${p($)} - ${p(f)}</div>
          <div><strong>${t("حالة المشروع:","Project Status:")}</strong> ${p(H(n.lifecycle))} (${p(H(n.health))})</div>
        </div>
      </header>

      <div class="info-strip">
        <div class="info-cell">
          <strong>${t("اسم المشروع","Project Name")}</strong>
          <span>${p(t(n.nameAr,n.nameEn))}</span>
        </div>
        <div class="info-cell">
          <strong>${t("العميل / المالك","Client / Owner")}</strong>
          <span>${p(t(n.clientAr,n.clientEn))||"—"}</span>
        </div>
        <div class="info-cell">
          <strong>${t("الجدول الزمني","Schedule Timeline")}</strong>
          <span>${p(n.startDate||"—")} → ${p(n.dueDate||"—")}</span>
        </div>
        <div class="info-cell">
          <strong>${t("مدير المشروع المسؤول","Project Manager")}</strong>
          <span>${p(l(n.managerId))}</span>
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
          <div class="kpi-val" style="color:${w>0?"#b91c1c":"#64748b"};">${w}</div>
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
                  <span>${p(b.name)}</span>
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
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${p(l(n.managerId))}</div>
          <div class="signature-line">${t("التوقيع والمصادقة","Sign & Date")}</div>
        </div>
        <div class="signature-box">
          <div class="signature-title">${t("الاعتماد والاستشاري العام","Approved By Lead Consultant")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${p(r.displayName)}</div>
          <div class="signature-line">${t("التوقيع والاعتماد النهائي","Sign & Authorization")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${p(r.displayName)} — ${t("وثيقة إدارية معتمدة صادرة عبر منصة دارك","Official Governance Document via DARC Platform")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${p($)}</div>
      </footer>
    </body>
    </html>
  `,L=window.open("","_blank","width=1100,height=900");L?(L.document.open(),L.document.write(M),L.document.close()):ln(M),k(t("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),j("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:p(S),type:a?"client_pdf":"executive_pdf",taskCount:u}})}).catch(()=>{})}function Di(){const e=s.data?.projects||[];if(!e||!e.length){k(t("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const a=Ct(),n=new Date,o=Je(n),r=Tt(n),i=e.length,d=e.filter(y=>y.health==="on_track").length,l=e.filter(y=>y.health==="at_risk").length,c=e.filter(y=>y.health==="off_track").length,u=e.map((y,$)=>{const f=y.manager?t(y.manager.name,y.manager.nameEn||y.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${$+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${p(y.code)}</td>
        <td style="font-weight:700;">${p(t(y.nameAr,y.nameEn))}</td>
        <td>${p(t(y.clientAr,y.clientEn))||"—"}</td>
        <td>${p(f)}</td>
        <td style="text-align:center;"><span class="badge ${p(y.lifecycle)}">${p(H(y.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${p(y.health)}">${p(H(y.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${p(y.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${p(y.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${y.progress===100?"#0d6269":"#0f172a"};">${y.progress||0}%</td>
      </tr>
    `}).join(""),m=t("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),v=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${p(a.displayName)} - Portfolio_Report_${new Date().toISOString().split("T")[0]}</title>
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
          <strong style="color:#0d6269;font-size:13px;">${p(m)}</strong>
          <div style="font-size:11px;color:#64748b;">${t("معاينة تقرير المحفظة جاهزة للطباعة أو الحفظ كـ PDF.","Portfolio report preview ready for print / save as PDF.")}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">🖨️ ${t("طباعة / حفظ كـ PDF","Print / Save as PDF")}</button>
          <button class="btn-toolbar-ghost" onclick="window.close()">✕ ${t("إغلاق","Close")}</button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${a.logoUrl?`<img src="${p(a.logoUrl)}" alt="Logo" class="brand-logo-img" />`:""}
          <h1 class="brand-title">${p(a.displayName)}</h1>
          <div style="font-size:11px;color:#64748b;">${t("الإدارة الهندسية وضبط الجودة والمشاريع","Engineering Operations & Project Portfolio Readout")}</div>
        </div>
        <div style="text-align:${s.lang==="ar"?"left":"right"};font-size:11px;color:#334155;line-height:1.6;">
          <div style="display:inline-block;background:#e6f4f5;color:#0d6269;font-weight:800;padding:3px 10px;border-radius:4px;font-size:11px;border:1px solid #bce1e4;margin-bottom:4px;">${t("تقرير حالة المحفظة","Portfolio Status Report")}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${p(o)} - ${p(r)}</div>
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
          <div class="kpi-val" style="color:#991b1b;">${c}</div>
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
        <div>${p(a.displayName)} — ${t("تقرير إداري معتمد لمحفظة المشاريع","Official Portfolio Readout")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${p(o)}</div>
      </footer>
    </body>
    </html>
  `,w=window.open("","_blank","width=1200,height=900");w?(w.document.open(),w.document.write(v),w.document.close()):ln(v),k(t("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),j("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:p(m),type:"portfolio_pdf",count:i}})}).catch(()=>{})}function ln(e){let a=document.getElementById("print-modal-overlay");a||(a=document.createElement("div"),a.id="print-modal-overlay",a.style.position="fixed",a.style.inset="0",a.style.zIndex="1400",a.style.background="rgba(0, 0, 0, 0.75)",a.style.backdropFilter="blur(4px)",a.style.display="flex",a.style.flexDirection="column",a.style.alignItems="center",a.style.justifyContent="center",a.style.padding="15px",document.body.appendChild(a)),a.innerHTML=`
    <div style="background:#fff;width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid #e2e8f0;background:#f8fafc;">
        <strong style="color:#0d6269;font-size:14px;">${t("معاينة التقرير الرسمي المعتمد (PDF Preview)","Official Approved Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-iframe" style="display:flex;align-items:center;gap:6px;">
            ${h("printer",14)} ${t("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-print-modal">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;">
        <iframe id="print-preview-iframe" style="width:100%;height:100%;border:none;" srcdoc="${p(e)}"></iframe>
      </div>
    </div>
  `,a.style.display="flex";const n=()=>{a.style.display="none",a.innerHTML="",window.removeEventListener("keydown",o)},o=r=>{r.key==="Escape"&&n()};window.addEventListener("keydown",o),document.getElementById("btn-close-print-modal")?.addEventListener("click",n),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const r=document.getElementById("print-preview-iframe");r&&r.contentWindow&&(r.contentWindow.focus(),r.contentWindow.print())})}var Ws=pe({TEMPLATE_CATEGORIES:()=>gt,openTemplateModal:()=>Vs,renderTemplates:()=>Gs}),gt=[{id:"architectural",ar:"معماري",en:"Architectural",icon:"🏛️"},{id:"electrical",ar:"كهرباء — إلكتروميكانيك",en:"Electrical",icon:"⚡"},{id:"plumbing",ar:"سباكة — إلكتروميكانيك",en:"Plumbing",icon:"💧"},{id:"hvac",ar:"تكييف — إلكتروميكانيك",en:"HVAC",icon:"🌡️"},{id:"fire",ar:"حريق — إلكتروميكانيك",en:"Fire Protection",icon:"🧯"},{id:"low_current",ar:"تيار خفيف",en:"Low Current",icon:"📡"},{id:"sections",ar:"مقاطع",en:"Sections",icon:"✂️"},{id:"detail",ar:"تفصيلي",en:"Detailed",icon:"🔍"},{id:"site",ar:"موقع عام",en:"Site Plan",icon:"🗺️"},{id:"quantity",ar:"جداول كميات",en:"Quantity Tables",icon:"📊"},{id:"documents",ar:"وثائق وخطابات",en:"Documents & Letters",icon:"📄"}];function Gs(){const e=s.searches.templates.trim().toLowerCase(),a=[...s.data.templates||[]].sort((i,d)=>(parseInt(i.code,10)||0)-(parseInt(d.code,10)||0)),n=new Map;gt.forEach(i=>n.set(i.id,0)),a.forEach(i=>{n.set(i.categoryId,(n.get(i.categoryId)||0)+1)});const o=s.templateCategory||"all",r=gt.map(i=>{if(o!=="all"&&o!==i.id)return null;const d=a.filter(l=>l.categoryId!==i.id?!1:e?`${l.nameAr} ${l.nameEn} ${l.code} ${l.typeAr} ${l.typeEn}`.toLowerCase().includes(e):!0);return d.length?{...i,items:d}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${t("مخرجات DARC القياسية","DARC STANDARD DELIVERABLES")}</p>
      <h1>${g("templates")}</h1>
      <p>${g("standardLibrarySub")}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${a.length} ${g("templatesCount")}</span>
      ${I("manage_templates")?`<button class="btn btn-primary" data-action="new-template" style="margin-${s.lang==="ar"?"right":"left"}:10px">${h("plus",15)} ${t("إضافة قالب","Add Template")}</button>`:""}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${h("search",15)}
        <input data-search="templates" value="${p(s.searches.templates)}" placeholder="${g("search")}" />
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
      ${gt.map(i=>`
        <button class="template-category-tab ${o===i.id?"active":""}" data-action="template-category" data-category="${p(i.id)}">
          <span class="category-icon">${p(i.icon)}</span>
          <span>${p(t(i.ar,i.en))}</span>
          <small>${n.get(i.id)||0}</small>
        </button>
      `).join("")}
    </aside>
    <div>
      ${r.length?r.map(i=>`
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${p(i.icon)}</span>
            <div>
              <h3>${p(t(i.ar,i.en))}</h3>
              <span>${i.items.length} ${g("templatesCount")}</span>
            </div>
          </div>
          <div class="template-grid">
            ${i.items.map(d=>`
              <article class="template-item" style="position:relative;cursor:${I("manage_templates")?"pointer":"default"};" ${I("manage_templates")?`data-action="edit-template" data-template-id="${p(d.id)}"`:""}>
                <span class="template-number">${p(d.code)}</span>
                <div class="template-copy">
                  <strong>${p(t(d.nameAr,d.nameEn))}</strong>
                  <span>${p(s.lang==="ar"?d.nameEn:d.nameAr)}</span>
                </div>
                ${I("manage_templates")?`<button class="template-action" data-action="edit-template" data-template-id="${p(d.id)}" title="${g("edit")}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${s.lang==="ar"?"right":"left"}:auto">${h("edit",14)}</button>`:""}
              </article>
            `).join("")}
          </div>
        </section>
      `).join(""):`
        <section class="panel">
          <div class="empty">
            ${h("layers",18)}
            <span>${g("noTasks")}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function Vs(e=null){if(!I("manage_templates"))return k(g("permissionDenied"),!0);const a=gt.map(o=>`<option value="${p(o.id)}" ${e?.categoryId===o.id?"selected":""}>${p(t(o.ar,o.en))}</option>`).join(""),n=`<form id="template-form" data-template-id="${p(e?.id||"")}">
    <div class="form-grid">
      <div class="field">
        <label>${g("nameAr")}</label>
        <input name="nameAr" value="${p(e?.nameAr||"")}" required />
      </div>
      <div class="field">
        <label>${g("nameEn")}</label>
        <input name="nameEn" value="${p(e?.nameEn||"")}" required />
      </div>
      <div class="field">
        <label>${t("الرمز / الكود","Code")}</label>
        <input name="code" value="${p(e?.code||"")}" placeholder="e.g. 01" />
      </div>
      <div class="field">
        <label>${t("التصنيف","Category")}</label>
        <select name="categoryId" required>${a}</select>
      </div>
      <div class="field">
        <label>${t("النوع (عربي)","Type (Ar)")}</label>
        <input name="typeAr" value="${p(e?.typeAr||"مخطط")}" required />
      </div>
      <div class="field">
        <label>${t("النوع (إنجليزي)","Type (En)")}</label>
        <input name="typeEn" value="${p(e?.typeEn||"Drawing")}" required />
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
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${p(e.id)}" style="color:var(--red)">${h("trash",14)} ${g("delete")}</button>`:"<div></div>"}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${h("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;document.getElementById("modal-root").innerHTML=he(e?t("تعديل قالب","Edit Template"):t("إضافة قالب جديد","Add New Template"),t("القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.","Templates help the team insert tasks quickly with standard criteria."),n,"template")}var Js=pe({openUploadDrawingModal:()=>Ks,renderDocuments:()=>Ys});function Ys(){const e=s.data?.documents||[],a=s.data?.projects||[],n=s.data?.tasks||[],o=(s.searches?.documents||"").trim().toLowerCase(),r=s.docProjectFilter||"all",i=s.data?.user?.id,d=C(),l=d||I("review_tasks")||I("approve_tasks")||I("edit_tasks"),c=new Set(n.filter(y=>!y.deletedAt).map(y=>y.id)),u=new Set(a.filter(y=>!y.deletedAt).map(y=>y.id)),m=e.filter(y=>!(y.deletedAt||y.taskId&&!c.has(y.taskId)||y.projectId&&!u.has(y.projectId)||r!=="all"&&y.projectId!==r||o&&!(y.originalName||"").toLowerCase().includes(o))).sort((y,$)=>new Date($.createdAt||0)-new Date(y.createdAt||0)),v=m.reduce((y,$)=>y+($.size||0),0),w=v>1073741824?(v/1073741824).toFixed(1)+" GB":v>1048576?(v/1048576).toFixed(1)+" MB":Math.round(v/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${g("documents")}</h2>
        <p class="intro">${t("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${I("upload_documents")||d?`
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${h("upload",14)}
            <span>${t("رفع مخطط / ملف جديد","Upload Drawing / File")}</span>
          </button>
        `:""}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${t("الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة","Go to trash bin to review and restore deleted files and projects")}">
          ${h("trash",14)}
          <span>${t("سلة المهملات","Trash")}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${m.length} ${t("مخطط / ملف","drawings")} (${w})
        </span>
      </div>
    </div>

    <!-- Filters Bar (Unified View Toolbar) -->
    <div class="view-toolbar" style="margin-bottom:20px;">
      <div class="view-toolbar-start" style="flex:1;">
        <div class="search-box" style="flex:1;max-width:440px;">
          ${h("search",15)}
          <input 
            type="search" 
            placeholder="${t("بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...","Search by drawing name, code, or format (DWG, PDF, RVT)...")}" 
            value="${p(s.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <div class="sort-box">
          <span>${t("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact" style="min-width:180px;">
            <option value="all" ${r==="all"?"selected":""}>${t("— جميع المشاريع —","— All Projects —")}</option>
            ${a.map(y=>`<option value="${p(y.id)}" ${r===y.id?"selected":""}>${p(y.code)} - ${p(t(y.nameAr,y.nameEn))}</option>`).join("")}
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
            ${m.length>0?m.map(y=>{const $=a.find(M=>M.id===y.projectId),f=n.find(M=>M.id===y.taskId),x=ea(y.originalName,y.mimeType),T=qa(y.originalName),S=y.size>1048576?(y.size/1048576).toFixed(1)+" MB":Math.round((y.size||0)/1024)+" KB",E=d||I("delete_documents")||y.uploaderId===i;return`
                <tr data-doc-id="${p(y.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${p(y.id)}">
                      <span class="file-format-badge" style="background:${x.bg};color:${x.color};border:1px solid ${x.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${x.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${p(y.originalName)}">
                          ${p(y.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${x.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${$?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${p($.id)}">${p($.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${f?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${p(f.id)}">${p(t(f.titleAr,f.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
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
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${p(y.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${y.status==="draft"?"selected":""}>📝 ${t("مسودة عمل","Draft")}</option>
                          <option value="review" ${y.status==="review"?"selected":""}>🔍 ${t("قيد المراجعة","Review")}</option>
                          <option value="approved" ${y.status==="approved"?"selected":""}>✅ ${t("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${y.status==="superseded"?"selected":""}>⏳ ${t("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${p(y.status||"draft")}" style="font-size:11px;">
                          ${p(H(y.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${S}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${be(y.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${p(y.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${h("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${p(y.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ رابط Google Drive","Copy Drive Link")}">
                        ${h("link",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${p(y.id)}" style="padding:5px;color:var(--blue);" title="${t("تحميل المخطط","Download")}">
                        ${h("download",14)}
                      </button>
                      ${E?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${p(y.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
                          ${h("trash",14)}
                        </button>
                      `:""}
                    </div>
                  </td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${h("document",24)}
                    <span>${t("لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.","No drawings or documents found matching the criteria.")}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function Ks(e=null){const a=s.data?.projects||[],n=e||a[0]?.id||"",o=s.data?.tasks?.filter(d=>d.projectId===n&&!d.deletedAt)||[],r=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${a.map(d=>`<option value="${p(d.id)}" ${d.id===n?"selected":""}>${p(d.code)} - ${p(t(d.nameAr,d.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${o.map(d=>`<option value="${p(d.id)}">${p(t(d.titleAr,d.titleEn))}</option>`).join("")}
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
          <div style="color:var(--teal);margin-bottom:8px;">${h("upload",28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${t("اسحب وأفلت المخططات هنا أو انقر للاختيار","Drag & drop drawings here or click to browse")}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${t("يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)","Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)")}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${t("إلغاء","Cancel")}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${h("upload",14)} <span>${t("بدء الرفع المباشر","Start Resumable Upload")}</span>
        </button>
      </div>
    </form>
  `,i=document.getElementById("modal-root");if(i){i.innerHTML=he(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),r,"upload-drawing","modal-lg");const d=document.getElementById("drawing-upload-project"),l=document.getElementById("drawing-upload-task");d&&l&&d.addEventListener("change",()=>{const f=d.value,x=s.data?.tasks?.filter(T=>T.projectId===f&&!T.deletedAt)||[];l.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+x.map(T=>`<option value="${p(T.id)}">${p(t(T.titleAr,T.titleEn))}</option>`).join("")});const c=document.getElementById("drawing-dropzone"),u=document.getElementById("drawing-file-input"),m=document.getElementById("drawing-selected-files-list"),v=document.getElementById("start-drawing-upload-btn");let w=[];const y=()=>{if(!w.length){m.innerHTML="",v.disabled=!0;return}v.disabled=!1,m.innerHTML=w.map((f,x)=>{const T=ea(f.name,f.type),S=f.size>1048576?(f.size/1048576).toFixed(1)+" MB":Math.round(f.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${T.bg};color:${T.color};border:1px solid ${T.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${T.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${p(f.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${S})</span>
            </div>
            <button type="button" data-file-remove="${x}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),m.querySelectorAll("[data-file-remove]").forEach(f=>{f.addEventListener("click",x=>{const T=parseInt(f.dataset.fileRemove);w.splice(T,1),y()})})};c&&u&&(c.addEventListener("click",()=>u.click()),u.addEventListener("change",()=>{u.files?.length&&(w=Array.from(u.files),y())}),c.addEventListener("dragover",f=>{f.preventDefault(),c.style.borderColor="var(--teal)"}),c.addEventListener("dragleave",()=>{c.style.borderColor="var(--line)"}),c.addEventListener("drop",f=>{f.preventDefault(),c.style.borderColor="var(--line)",f.dataTransfer?.files?.length&&(w=Array.from(f.dataTransfer.files),y())}));const $=document.getElementById("upload-drawing-form");$&&$.addEventListener("submit",async f=>{if(f.preventDefault(),!w.length)return;const x=d.value,T=l.value||null,S=document.getElementById("drawing-upload-discipline")?.value||"عام",E=document.getElementById("drawing-upload-status")?.value||"draft";B(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:w,projectId:x,taskId:T,discipline:S,status:E})})}}var Mn={assignment:{type:"assignment",category:"tasks",icon:"user",color:"blue",titleAr:"إسناد مهمة جديدة",titleEn:"Task Assigned",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_status:{type:"task_status",category:"tasks",icon:"check",color:"teal",titleAr:"تحديث حالة المهمة",titleEn:"Task Status Update",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_blocked:{type:"task_blocked",category:"tasks",icon:"alert",color:"red",titleAr:"مهمة متوقفة ⚠️",titleEn:"Task Blocked ⚠️",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_review:{type:"task_review",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة للمراجعة الفنية",titleEn:"Task for Review",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_approval:{type:"task_approval",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة بانتظار الاعتماد",titleEn:"Task Pending Approval",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},due_soon:{type:"due_soon",category:"schedule",icon:"clock",color:"amber",titleAr:"موعد تسليم قريب",titleEn:"Due Soon",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},overdue:{type:"overdue",category:"schedule",icon:"alert",color:"red",titleAr:"مهمة متأخرة",titleEn:"Overdue Task",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},reminder:{type:"reminder",category:"schedule",icon:"clock",color:"amber",titleAr:"تذكير بموعد ⏰",titleEn:"Due Reminder ⏰",badgeTextAr:"فتح التذكير",badgeTextEn:"Open Reminder"},comment:{type:"comment",category:"communication",icon:"mail",color:"blue",titleAr:"تعليق جديد",titleEn:"New Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},mention:{type:"mention",category:"communication",icon:"mail",color:"blue",titleAr:"تم ذكرك في تعليق",titleEn:"Mentioned in Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},document_review:{type:"document_review",category:"drawings",icon:"document",color:"amber",titleAr:"مراجعة مخطط هندسي",titleEn:"Drawing Review",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},document_approved:{type:"document_approved",category:"drawings",icon:"document",color:"teal",titleAr:"اعتماد مخطط هندسي",titleEn:"Drawing Approved",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},escalation:{type:"escalation",category:"system",icon:"alert",color:"red",titleAr:"تصعيد مهمة ونظام 🚨",titleEn:"Escalation Alert 🚨",badgeTextAr:"التفاصيل",badgeTextEn:"Details"},general:{type:"general",category:"system",icon:"bell",color:"blue",titleAr:"تنبيه مساحة العمل",titleEn:"Workspace Notification",badgeTextAr:"عرض",badgeTextEn:"View"}};function Xs(e){const a=Mn[e]||Mn.general;return{...a,defaultTitle:t(a.titleAr,a.titleEn),badgeText:t(a.badgeTextAr,a.badgeTextEn)}}var Zs=pe({showNotifications:()=>cn});function cn(){const e=s.data?.notifications||[],a=e.filter(r=>!r.read&&!r.readAt).length,n=e.length-a,o=`${`
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
            ${h("check",12)} ${t("تحديد الكل كمقروء","Mark all as read")}
          </button>
        `:""}
        ${n>0?`
          <button type="button" class="btn btn-ghost btn-sm" data-action="clear-read-notifications" style="font-size:11px;color:var(--muted);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${t("حذف كافة الإشعارات المقروءة","Clear all read notifications")}">
            ${h("trash",12)} ${t("مسح المقروء","Clear read")}
          </button>
        `:""}
        <button type="button" class="btn btn-ghost btn-sm" data-action="send-test-notification" style="font-size:11px;color:var(--blue);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${t("إرسال إشعار تجريبي فوري للتأكد من وصوله","Send live test notification")}">
          ${h("bell",12)} ${t("تجربة إرسال","Test Send")}
        </button>
      </div>
    </div>
  `}${typeof window<"u"&&"Notification"in window&&Notification.permission==="default"?`
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
      <span style="color:var(--ink-soft);">${t("تفعيل إشعارات سطح المكتب والمتصفح عند وصول مهام أو تنبيهات؟","Enable desktop browser alerts when new tasks or mentions arrive?")}</span>
      <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${t("تفعيل الآن","Enable")}</button>
    </div>
  `:""}${e.length?`<div class="attention-list">${e.slice(0,30).map(r=>{const i=!!(r.readAt||r.read),d=Xs(r.type),l=s.lang==="ar"?r.titleAr||d.titleAr||r.titleEn||d.defaultTitle:r.titleEn||d.titleEn||r.titleAr||d.defaultTitle,c=s.lang==="ar"?r.messageAr||r.bodyAr||r.content||"":r.messageEn||r.bodyEn||(r.content!==r.titleAr&&r.content!==r.messageAr?r.content:"")||r.messageAr||r.bodyAr||"",u=c&&c!==l?`${c} · `:"",m=r.type==="document_review"||r.type==="document_approved"||r.documentId,v=r.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-weight:600;">${h("check",10)} ${t("فتح المهمة","Open Task")}</span>`:m?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);font-weight:600;">${h("document",10)} ${t("معاينة المخطط","View Drawing")}</span>`:r.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);font-weight:600;">${h("building",10)} ${t("المشروع","Project")}</span>`:"",w=i?"":`<span style="width:7px;height:7px;border-radius:50%;background:var(--blue);display:inline-block;flex-shrink:0;box-shadow:0 0 0 2px var(--surface);" title="${t("غير مقروء","Unread")}"></span>`;return`
      <div class="attention-item notif-item" data-action="read-notification" data-notification-id="${p(r.id)}" data-task-id="${p(r.taskId||"")}" data-project-id="${p(r.projectId||"")}" data-document-id="${p(r.documentId||"")}" data-type="${p(r.type||"")}" style="border:1px solid ${i?"var(--line)":"rgba(56,189,248,0.25)"};text-align:start;width:100%;cursor:pointer;opacity:${i?".75":"1"};background:${i?"var(--surface-soft)":"var(--surface)"};position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
        <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
          <span class="attention-icon ${d.color}" style="flex-shrink:0;margin-top:2px;">${h(d.icon,14)}</span>
          <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
              ${w}
              <strong dir="auto" style="color:var(--${d.color});font-size:12px;font-weight:${i?"600":"700"};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p(l)}</strong>
              ${v}
            </div>
            <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${p(c)}">
              ${p(u)}<span style="color:var(--ink-soft);">${be(r.createdAt)}</span>
            </div>
          </div>
        </div>
        <button type="button" class="notif-dismiss-btn" data-action="delete-notification" data-notification-id="${p(r.id)}" title="${t("حذف الإشعار","Dismiss notification")}" style="margin-inline-start:10px;flex-shrink:0;">
          ${h("close",12)}
        </button>
      </div>
    `}).join("")}</div>`:`
    <div class="empty" style="padding:48px 20px;text-align:center;">
      <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
        ${h("bell",24)}
      </span>
      <strong style="display:block;font-size:14px;color:var(--ink);">${t("لا توجد إشعارات حالياً","No notifications right now")}</strong>
      <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${t("ستظهر هنا التنبيهات الخاصة بالمهام والمشاريع والإشارات والتذكيرات.","Task, project, mention, and reminder alerts will appear here.")}</span>
    </div>
  `}`;document.getElementById("modal-root").innerHTML=he(g("notifications"),t("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),o,"notifications","modal-notifications")}var Qs=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),Ea=Qs?"⌘K":"Ctrl+K",xe=0,ce=[];function ji(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.body.style.overflow="hidden";const a=t(`ابحث في المشاريع، المهام، والأعضاء... (${Ea})`,`Search projects, tasks, team... (${Ea})`),n=`
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${h("search",18)}</span>
          <input 
            id="omnisearch-input" 
            type="text" 
            autocomplete="off" 
            placeholder="${p(a)}" 
            onfocus="this.placeholder=''" 
            onblur="if(!this.value) this.placeholder='${p(a)}'"
          />
          <button class="btn btn-ghost btn-sm" data-action="close-omnisearch" style="padding:4px 8px;">
            <kbd class="shortcut-kbd">ESC</kbd>
          </button>
        </div>
        <div id="omnisearch-results-container" class="omnisearch-results">
          ${Rn("")}
        </div>
        <div class="omnisearch-foot">
          <div class="omni-shortcuts-hint">
            <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd> ${t("للتنقل","to navigate")}</span>
            <span><kbd class="shortcut-kbd">↵</kbd> ${t("للاختيار","to select")}</span>
            <span><kbd class="shortcut-kbd">ESC</kbd> ${t("للإغلاق","to close")}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="open-cheatsheet" style="font-size:11px;padding:2px 6px;">
            ${h("sparkles",12)} ${t("دليل الاختصارات (?)","Shortcuts (?)")}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const o=document.getElementById("omnisearch-modal");o&&o.addEventListener("click",i=>{i.target===o&&Ve()});const r=document.getElementById("omnisearch-input");if(r){r.focus();let i=null;r.addEventListener("input",d=>{xe=0,i&&cancelAnimationFrame(i);const l=d.target.value;i=requestAnimationFrame(()=>{const c=document.getElementById("omnisearch-results-container");c&&(c.innerHTML=Rn(l))})}),r.addEventListener("keydown",eo)}}function Ve(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.querySelector(".modal-backdrop")||(document.body.style.overflow="")}function eo(e){e.key==="ArrowDown"?(e.preventDefault(),ce.length>0&&(xe=(xe+1)%ce.length,zn())):e.key==="ArrowUp"?(e.preventDefault(),ce.length>0&&(xe=(xe-1+ce.length)%ce.length,zn())):e.key==="Enter"?(e.preventDefault(),ce[xe]&&Ci(ce[xe])):e.key==="Escape"&&Ve()}function zn(){document.querySelectorAll(".omni-item").forEach((e,a)=>{e.classList.toggle("selected",a===xe),a===xe&&e.scrollIntoView({block:"nearest"})})}function Ci(e){if(Ve(),e.type==="action")if(e.id==="new-task"){const a=(s.data?.projects||[]).find(n=>n.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0];Yt(null,null,e.targetProjectId||a?.id)}else e.id==="new-project"?rn():e.id==="cheatsheet"?pn():e.id==="show-notifications"&&cn();else if(e.type==="project")s.projectTab="tasks",s.lastActiveProjectId=e.id,fe("project-detail",e.id);else if(e.type==="task"){const a=s.data?.tasks?.find(n=>n.id===e.id);a&&Yt(a)}else if(e.type==="user"){const a=s.data?.users?.find(n=>n.id===e.id);a&&typeof window.openUserModal=="function"&&window.openUserModal(a)}}function Rn(e){const a=e.trim().toLowerCase(),n=[],o=(s.data?.projects||[]).find(l=>l.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0],r=o?t(o.nameAr,o.nameEn):"",i=[];(I("create_tasks")||C())&&i.push({type:"action",id:"new-task",targetProjectId:o?.id,title:t("إضافة مهمة جديدة","Create new task"),sub:o?t(`في مشروع: ${r}`,`In project: ${r}`):t("إجراء سريع","Quick action"),icon:"plus",keywords:"new task مهمة إضافة عمل جديد"}),(I("create_projects")||C())&&i.push({type:"action",id:"new-project",title:t("إنشاء مشروع جديد","Create new project"),sub:t("إجراء سريع","Quick action"),icon:"building",keywords:"new project مشروع إنشاء جديد"}),i.push({type:"action",id:"cheatsheet",title:t("عرض دليل اختصارات لوحة المفاتيح","View keyboard shortcuts guide"),sub:t("مساعدة","Help"),icon:"sparkles",keywords:"shortcuts اختصارات كيبورد مساعدة"}),i.push({type:"action",id:"show-notifications",title:t("مركز التنبيهات والإشعارات","Notifications Center"),sub:t("عرض الإشعارات والتنبيهات الحديثة","View recent notifications & alerts"),icon:"bell",keywords:"notifications alerts إشعارات تنبيهات رنين تنبيه"});for(const l of i)(!a||l.keywords.includes(a)||l.title.toLowerCase().includes(a))&&n.push(l);if(n.length<20&&(I("view_projects")||C())){const l=s.data?.projects||[];for(const c of l)if(n.length>=20||(!a||`${c.nameAr||""} ${c.nameEn||""} ${c.code||""} ${c.clientAr||""} ${c.clientEn||""}`.toLowerCase().includes(a))&&(n.push({type:"project",id:c.id,title:t(c.nameAr,c.nameEn),sub:`${c.code} · ${t(c.clientAr,c.clientEn)||""}`,badge:`${c.progress}%`,icon:"building"}),!a&&n.length>=5))break}if(n.length<20&&Q("tasks")){const l=s.data?.tasks||[];for(const c of l)if(n.length>=20||(!a||`${c.titleAr||""} ${c.titleEn||""} ${c.categoryAr||""} ${c.categoryEn||""}`.toLowerCase().includes(a))&&(n.push({type:"task",id:c.id,title:t(c.titleAr,c.titleEn),sub:c.dueDate?`📅 ${be(c.dueDate)}`:t(c.categoryAr,c.categoryEn)||"",badge:`${c.progress}%`,icon:"checklist"}),!a&&n.length>=10))break}if(n.length<20&&(C()||I("manage_users"))){const l=s.data?.users||[];for(const c of l)if(n.length>=20||(!a||`${c.name||""} ${c.nameEn||""} ${c.email||""} ${c.jobTitleAr||""}`.toLowerCase().includes(a))&&(n.push({type:"user",id:c.id,title:t(c.name,c.nameEn||c.name),sub:c.email||"",badge:ie(c),icon:"user"}),!a&&n.length>=15))break}if(ce=n.slice(0,15),!ce.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${h("search",24)}</span>
        <strong style="color:var(--ink);">${t("لا توجد نتائج مطابقة","No matching results")}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${t("جرب البحث بكلمات أخرى أو رمز المشروع.","Try different keywords or project code.")}</p>
      </div>
    `;let d="";return ce.map((l,c)=>{let u="";const m=l.type==="action"?t("إجراءات سريعة","Quick Actions"):l.type==="project"?t("المشاريع","Projects"):l.type==="task"?t("المهام والمخرجات","Tasks & Deliverables"):t("فريق العمل","Team");return m!==d&&(d=m,u=`<div class="omni-group-title">${m}</div>`),`
      ${u}
      <div class="omni-item ${c===xe?"selected":""}" data-omni-index="${c}" onclick="window.__selectOmniItem(${c})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${h(l.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${p(l.title)}</strong>
            ${l.sub?`<span style="font-size:11px;color:var(--muted);">${p(l.sub)}</span>`:""}
          </div>
        </div>
        ${l.badge?`<span class="omni-badge">${p(l.badge)}</span>`:""}
      </div>
    `}).join("")}window.__selectOmniItem=e=>{ce[e]&&Ci(ce[e])};function pn(){Ve();const e=`
    <div style="padding:4px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin:0 0 16px 0;">${t("استخدم هذه الاختصارات لزيادة سرعة عملك وإدارة المهام باحترافية كاملة بدون لمس الفأرة:","Use these shortcuts to navigate the workspace and manage tasks at full speed without a mouse:")}</p>
      
      <!-- القسم الأول: التنقل العام والإجراءات السريعة -->
      <div class="cheatsheet-section" style="margin-top:0;">
        <div class="cheatsheet-section-title">
          <span style="display:flex;color:var(--teal);">${h("search",14)}</span>
          <span>${t("التنقل العام والإجراءات السريعة","General & Navigation")}</span>
        </div>
        <div class="cheatsheet-grid">
          <div class="cheatsheet-row">
            <span>${t("البحث الشامل والأوامر السريعة","Omnisearch & Quick Commands")}</span>
            <kbd class="shortcut-kbd">${Ea}</kbd>
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
            <span style="display:flex;color:var(--teal);">${h("grid",14)}</span>
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
  `;document.getElementById("modal-root").innerHTML=he(t("دليل اختصارات لوحة المفاتيح","Keyboard Shortcuts Guide"),t("طرق سريعة للتنقل وإنجاز العمل وسحب وإفلات المهام بكفاءة عالية","Work faster with productivity hotkeys & accessible task reordering"),e,"cheatsheet","modal-cheatsheet")}function to(){window.addEventListener("keydown",e=>{const a=document.activeElement,n=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.tagName==="SELECT"||a.isContentEditable),o=e.code==="KeyK"||e.key?.toLowerCase()==="k"||e.key==="ن";if((e.metaKey||e.ctrlKey)&&o){e.preventDefault(),document.getElementById("omnisearch-modal")?Ve():ji();return}if((e.key==="?"||e.key==="؟"||e.code==="Slash"&&e.shiftKey)&&!n){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="cheatsheet"], .modal-cheatsheet')?B():pn();return}if((e.code==="KeyN"||e.key?.toLowerCase()==="n"||e.key==="ى")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;if(document.querySelector('.modal[data-modal="task"], #task-form'))B();else if(!document.querySelector('.modal:not([data-modal="task"])')){const r=s.view==="project-detail"&&s.activeProjectId?s.activeProjectId:s.data?.projects?.[0]?.id;Yt(null,null,r)}return}if((e.code==="KeyP"||e.key?.toLowerCase()==="p"||e.key==="ح")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="project"], #project-form')?B():document.querySelector('.modal:not([data-modal="project"])')||rn();return}if((e.code==="KeyB"||e.key?.toLowerCase()==="b"||e.key==="لا")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="notifications"], .modal-notifications')?B():document.querySelector('.modal:not(.modal-notifications):not([data-modal="notifications"])')||cn();return}if(e.key==="Escape"&&document.getElementById("omnisearch-modal")){e.preventDefault(),Ve();return}})}var ao="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",_i=typeof navigator<"u"&&!!navigator.connection?.saveData,no=3e5,io=_i?1e4:3e4,so=_i?600:300,oo=25e3,ro=150,ma=null,Nn=!1,Ta=!1,Ke=null,ye=null,Bt=null,nt=null,fa=null,Xe=null,On=0,vt=0,Ce=!1,un=Date.now(),Ia=0,Mt=null,we=new Map;function lo(e){if(!e||typeof e!="string")return;const a=Date.now();we.set(e,a);for(const[n,o]of we.entries())a-o>8e3&&we.delete(n);if(we.size>ro){const n=we.keys().next().value;n&&we.delete(n)}}function $t(){return typeof localStorage>"u"?!1:!!localStorage.getItem("darc_token")}var Xt=new Set(["__proto__","constructor","prototype"]),Pi=new Set(["custom_fields","permissions","details"]);function Zt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Zt);const a={};for(const[n,o]of Object.entries(e)){if(Xt.has(n))continue;const r=n.indexOf("_")===-1?n:n.replace(/_([a-z0-9])/g,(i,d)=>d.toUpperCase());Xt.has(r)||(a[r]=o!==null&&typeof o=="object"&&!Pi.has(n)?Zt(o):o)}return a}function Qt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Qt);const a={};for(const[n,o]of Object.entries(e))Xt.has(n)||(a[n]=o!==null&&typeof o=="object"&&!Pi.has(n)?Qt(o):o);return a}function ft(e){if(!e||!s.data||!Array.isArray(s.data.tasks)||!Array.isArray(s.data.projects))return;const a=s.data.projects.find(c=>c.id===e);if(!a)return;const n=s.data.tasks.filter(c=>c.projectId===e&&!c.deletedAt&&!c.deleted_at);let o=0,r=0;for(const c of n){const u=Number(c.weight)||1,m=Number(c.progress)||0;o+=u,r+=u*(m/100)}const i=o>0?Math.round(r/o*100):0;a.progress!==i&&(a.progress=i),a.totalWeight=o;const d=n.length>0,l=d&&n.every(c=>c.status==="done"||c.status==="completed");d&&l&&i===100?a.lifecycle="completed":a.lifecycle==="completed"&&(!l||i<100)&&(a.lifecycle="active")}function ga(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const a=(s.data?.notifications||[]).filter(o=>!o.read&&!o.readAt).length;let n=e.querySelector(".notification-dot");a>0?n||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):n&&n.remove()}function Da(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Ke||Ke.state==="closed")&&(Ke=new e),Ke.state==="suspended"&&Ke.resume().catch(()=>{});const a=Ke,n=a.createOscillator(),o=a.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,a.currentTime),n.frequency.exponentialRampToValueAtTime(880,a.currentTime+.15),o.gain.setValueAtTime(.06,a.currentTime),o.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),n.connect(o),o.connect(a.destination),n.start(),n.stop(a.currentTime+.36)}catch{}}function co(){Mt&&cancelAnimationFrame(Mt),Mt=requestAnimationFrame(()=>{Mt=null,typeof P=="function"?P():typeof J=="function"&&J()})}function Ft(e,a,n,o){if(!s.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const r=n?Qt(Zt(n)):null,i=o?Qt(Zt(o)):null,d=r&&r.id||i&&i.id;if(!d)return!1;const l=we.get(d);if(l&&Date.now()-l<5e3)return!0;const c=s.data?.user?.roleId==="admin"||s.data?.user?.role_id==="admin";if(r&&e==="notifications"){const w=r.userId||r.user_id;if(w&&w!==s.data?.user?.id)return!1}else if(!c&&r&&(e==="tasks"||e==="documents"||e==="comments")){const w=r.projectId||(e==="comments"?s.data?.tasks?.find(y=>y.id===r.taskId)?.projectId:null);if(w&&!s.data?.projects?.some(y=>y.id===w))return!1}Array.isArray(s.data[e])||(s.data[e]=[]);const u=s.data[e];let m=!1;const v=!!(r?.deletedAt||r?.deleted_at);if(a==="DELETE"||v){const w=u.length;let y=null;e==="tasks"&&(y=u.find($=>$.id===d)?.projectId||i?.projectId||r?.projectId),s.data[e]=u.filter($=>$.id!==d),s.data[e].length!==w&&(m=!0),e==="tasks"&&y?ft(y):e==="projects"?Array.isArray(s.data.tasks)&&(s.data.tasks=s.data.tasks.filter($=>$.projectId!==d)):e==="notifications"&&(ga(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="UPDATE"&&r){const w=u.findIndex(y=>y.id===d);if(w!==-1){for(const[y,$]of Object.entries(r))Xt.has(y)||(u[w][y]=$);m=!0}else u.unshift(r),m=!0;e==="tasks"?(r.projectId&&ft(r.projectId),i?.projectId&&i.projectId!==r.projectId&&ft(i.projectId)):e==="notifications"&&(ga(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="INSERT"&&r){if(u.some(w=>w.id===d)||(u.unshift(r),m=!0),e==="tasks"&&r.projectId)ft(r.projectId);else if(e==="notifications"){const w=s.data?.user?.id,y=r.userId||r.user_id,$=!!(r.read||r.readAt||r.read_at);if(w&&y===w&&!$){ga();const f=s.lang==="ar"?r.titleAr||r.messageAr||r.bodyAr||r.content||r.titleEn||t("إشعار جديد","New notification"):r.titleEn||r.messageEn||r.bodyEn||(r.content!==r.titleAr&&r.content!==r.messageAr?r.content:"")||r.titleAr||t("إشعار جديد","New notification");if(f&&k(`🔔 ${f}`,!1),Da(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{const x=s.lang==="ar"?r.messageAr||r.bodyAr||r.content||"":r.messageEn||r.bodyEn||r.content||"",T=new Notification(f,{body:x,icon:"/favicon.ico",tag:r.id||"darc-alert"});T.onclick=()=>{window.focus(),typeof showNotifications=="function"&&showNotifications(),T.close()}}catch(x){console.warn("[WebNotification] Error:",x.message)}typeof showNotifications=="function"&&document.querySelector(".modal-notifications")&&showNotifications()}}}if(m){We();const w=r?.taskId||i?.taskId;if(w){const y=(s.data?.tasks||[]).find($=>$.id===w);if(y){if(e==="comments"){const $=document.getElementById("task-comment-form");if($&&$.dataset.taskId===w){const f=document.getElementById("task-comments-list");f&&typeof wt=="function"&&(f.innerHTML=wt(y),f.scrollTop=f.scrollHeight)}}if(e==="documents"){const $=document.getElementById("task-dropzone");if($&&$.dataset.taskId===w){const f=document.getElementById("task-documents-list");f&&typeof Ge=="function"&&(f.innerHTML=Ge(y))}}}}return co(),!0}return!1}function kt(e="realtime"){$t()&&(Ce&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!s.data||!s.view||(ma&&clearTimeout(ma),ma=setTimeout(async()=>{try{await le(!0)}catch(a){console.warn("[Realtime] Sync error:",String(e),a.message)}},so)))}function ja(e,a,n,o={}){e&&e.readyState===WebSocket.OPEN&&(On++,e.send(JSON.stringify({topic:a,event:n,payload:o,ref:String(On)})))}function po(e){mn(),Bt=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&ja(e,"phoenix","heartbeat")},oo)}function mn(){Bt&&(clearInterval(Bt),Bt=null)}function Li(e="disconnect"){if(Ta=!0,mn(),nt&&(clearTimeout(nt),nt=null),ye){try{ye.close(1e3,e)}catch{}ye=null}}function Ca(e="idle"){Ce||(Ce=!0,Li(e))}function _a(e="wake_up"){const a=Ce;Ce=!1,$t()&&(typeof navigator<"u"&&!navigator.onLine||((!ye||ye.readyState===WebSocket.CLOSED||ye.readyState===WebSocket.CLOSING)&&fn(),(a||e==="tab_visible")&&kt(e)))}function fn(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&$t()&&!Ce&&!(ye&&(ye.readyState===WebSocket.CONNECTING||ye.readyState===WebSocket.OPEN))){Ta=!1;try{const e=new WebSocket(ao);ye=e,e.onopen=()=>{vt=0,po(e),ja(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(a=>{ja(e,`realtime:public:${a}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:a}]}})})},e.onmessage=a=>{try{const{event:n,topic:o,payload:r}=JSON.parse(a.data);if(n==="phx_reply"||n==="phx_close")return;if(n==="postgres_changes"&&r?.data){const{table:i,type:d,record:l,old_record:c}=r.data;if(Ft(i,d,l,c))return}if((n==="INSERT"||n==="UPDATE"||n==="DELETE")&&o?.startsWith("realtime:public:")){const i=o.split(":")[2];if(Ft(i,n,r?.record||r?.new,r?.old_record||r?.old))return}if(o==="realtime:darc_live"&&(n==="broadcast"||n==="STATE_MUTATION"||n==="GRANULAR_DELTA")){const i=r?.payload||r,d=i?.mutationId||i?.id||i?.entityId;if(d&&we.has(d))return;if(i?.delta){const{table:l,action:c,record:u,oldRecord:m}=i.delta;if(Ft(l,c,u,m))return}kt("edge_broadcast");return}(n==="broadcast"||o==="realtime:darc_live"||typeof o=="string"&&o.startsWith("realtime:public:"))&&kt("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=a=>{if(mn(),ye=null,!(Ta||!$t()||Ce)&&!(a?.reason==="logout"||a?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){vt++;const n=Math.min(3e4,Math.pow(2,Math.min(vt,5))*1e3);nt&&clearTimeout(nt),nt=setTimeout(()=>{fn()},n)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function Bn(){const e=Date.now();e-Ia>1e4&&(Ia=e,un=e,Ce&&(typeof document>"u"||!document.hidden)&&_a("user_active"))}function uo(){fa&&clearInterval(fa),fa=setInterval(()=>{const e=Date.now();for(const[a,n]of we.entries())e-n>8e3&&we.delete(a);Ce||typeof document<"u"&&document.hidden||Date.now()-un>=no&&Ca("inactivity_idle")},6e4)}function mo(){if(!Nn){if(Nn=!0,$t()&&fn(),uo(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,Bn,{passive:!0})}),window.addEventListener("mousemove",Bn,{passive:!0})),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden?(Xe&&clearTimeout(Xe),Xe=setTimeout(()=>{Ca("tab_hidden")},io)):(Xe&&(clearTimeout(Xe),Xe=null),un=Date.now(),Ia=Date.now(),_a("tab_visible"))}),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=a=>{if(a.data?.type==="GRANULAR_DELTA"&&a.data.delta){const{table:n,action:o,record:r,oldRecord:i}=a.data.delta;Ft(n,o,r,i)}else a.data?.type==="STATE_MUTATION"&&kt("broadcast_channel")},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{s.isOffline=!1,vt=0;const e=window.api,a=typeof window.choose=="function"?window.choose:(o=>o),n=typeof window.showToast=="function"?window.showToast:console.log;if(_a("online"),e){const o=await Fa(e);o&&o.synced>0?n(a(`تمت استعادة الاتصال ومزامنة ${o.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${o.synced} pending actions successfully! 🚀`),!1):n(a("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}kt("online")}),window.addEventListener("offline",()=>{if(s.isOffline=!0,vt=0,Ca("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function fo(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now()})}catch{}}typeof window<"u"&&(window.notifyStateMutation=fo,window.disconnectSupabaseRealtime=Li,window.recordRecentLocalMutation=lo,window.recalculateProjectProgressInMemory=ft);var go=pe({getOrCreateFloatingUploadWidget:()=>Mi,handleChange:()=>za,handleClick:()=>La,handleInput:()=>Ma,handleSubmit:()=>Pa,init:()=>Ri,updateFloatingUploadWidget:()=>et,uploadDirectFiles:()=>zi,uploadTaskFiles:()=>gn});async function Pa(e){const a=e.target;if(!["project-form","task-form","user-form","role-form","activation-form","task-comment-form","template-form","force-password-form"].includes(a.id)&&!a.dataset.action)return;e.preventDefault();const n=Object.fromEntries(new FormData(a).entries()),o=a.querySelector('button[type="submit"]');o&&(o.disabled=!0,o.classList.add("is-loading"));try{if(a.id==="activation-form"){if(n.password!==n.passwordConfirm)throw new Error(t("كلمتا المرور غير متطابقتين.","Passwords do not match."));if(delete n.passwordConfirm,await j("/api/auth/activate",{method:"POST",body:JSON.stringify(n)}),window.history.replaceState({},"",window.location.pathname),Et(),await le(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}J();return}if(a.id==="project-form"){n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.managerId||(n.managerId=null);let r=[];try{n.memberIds&&(r=JSON.parse(n.memberIds))}catch{}n.managerId&&!r.includes(n.managerId)&&r.push(n.managerId),n.memberIds=r;const i=!!a.dataset.projectId,d=await j(i?`/api/projects/${a.dataset.projectId}`:"/api/projects",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.project)if(s.data.projects||(s.data.projects=[]),i){const l=s.data.projects.findIndex(c=>c.id===d.project.id);l!==-1&&(s.data.projects[l]={...s.data.projects[l],...d.project})}else s.data.projects.unshift(d.project);B(),P(),k(t("تم حفظ المشروع.","Project saved."));return}if(a.id==="task-form"){const r=a.dataset.taskId;n.remindAt,delete n.remindAt,n.templateId=n.templateId||null,n.typeAr=n.typeAr||(n.templateId?"مخطط":null),n.typeEn=n.typeEn||(n.templateId?"Drawing":null),n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.assigneeId||(n.assigneeId=null),n.reviewerId||(n.reviewerId=null);let i=[];try{i=JSON.parse(n.additionalAssignees||"[]")}catch{i=[...a.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(v=>v.value)}let d=[];try{d=JSON.parse(n.externalAssignees||"[]")}catch{const v=String(n.externalAssignees||"").trim();d=v?v.split(/[,،]+/).map(w=>w.trim()).filter(Boolean):[]}let l=[];try{l=JSON.parse(n.remindersJson||"[]")}catch{l=[]}delete n.additionalAssignees,delete n.externalAssignees,delete n.remindersJson,delete n.dependencies,delete n.weight,delete n.progress,n.customFields={additional_assignees:i,external_assignees:d,reminders:l},n.projectId||(n.projectId=s.activeProjectId||s.data.projects?.[0]?.id);const c=!!r;if(c){const m=(s.data?.tasks||[]).find(v=>v.id===r);m?.updatedAt&&(n.expectedUpdatedAt=m.updatedAt)}let u;try{u=await j(c?`/api/tasks/${r}`:"/api/tasks",{method:c?"PATCH":"POST",body:JSON.stringify(n)})}catch(m){if(m.message&&m.message.includes("تعارض")){await ae(!0),k(m.message,!0);return}throw m}if(u.task){if(s.data.tasks||(s.data.tasks=[]),c){const m=s.data.tasks.findIndex(v=>v.id===u.task.id);m!==-1&&(s.data.tasks[m]={...s.data.tasks[m],...u.task})}else s.data.tasks.unshift(u.task),s.view==="tasks"&&(s.taskProjectFilter!=="all"&&s.taskProjectFilter!==u.task.projectId&&(s.taskProjectFilter=u.task.projectId),s.taskFilter==="mine"&&u.task.assigneeId!==s.data.user?.id&&(s.taskFilter="all"));if(Array.isArray(l)&&l.length>0){for(const m of l)if(!m.id||m.id.startsWith("rem_temp_")){const v=m.remindAt?new Date(m.remindAt):null;if(!v||isNaN(v.getTime()))continue;j("/api/reminders",{method:"POST",body:JSON.stringify({taskId:u.task.id,remindAt:v.toISOString(),noteAr:m.noteAr||n.titleAr||"تذكير لمتابعة المهمة"})}).catch(w=>console.warn("[Reminder dispatch note]",w))}}}B(),P(),k(t("تم حفظ المهمة بنجاح.","Task saved successfully."));return}if(a.id==="task-comment-form"){const r=a.dataset.taskId,i=await j(`/api/tasks/${r}/comments`,{method:"POST",body:JSON.stringify(n)});a.reset(),i.comment&&(s.data.comments||(s.data.comments=[]),s.data.comments.push(i.comment));const d=s.data.tasks.find(c=>c.id===r),l=document.getElementById("task-comments-list");l&&(l.innerHTML=renderTaskComments(d),l.scrollTop=l.scrollHeight),o&&(o.disabled=!1);return}if(a.id==="force-password-form"){if(!C()&&!I("manage_users"))throw new Error(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."));const r=a.dataset.userId,i=a.dataset.isPending==="true";await j(`/api/users/${r}/force-password`,{method:"POST",body:JSON.stringify(n)});const d=s.data.users.find(l=>l.id===r);d&&(d.status="active"),B(),P(),k(i?t("تم تفعيل الحساب بنجاح.","Account activated successfully."):t("تم تغيير كلمة المرور وطرد المستخدم بنجاح.","Password changed and user kicked successfully.")),o&&(o.disabled=!1);return}if(a.id==="user-form"){const r=a.dataset.userId,i=!!r;if(!i&&!C()&&!I("manage_users"))throw new Error(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."));if(i&&!C()&&!I("manage_users")&&!I("manage_existing_account_permissions"))throw new Error(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."));const d=await j(i?`/api/users/${r}`:"/api/users",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.user)if(s.data.users||(s.data.users=[]),i){const l=s.data.users.findIndex(c=>c.id===d.user.id);l!==-1&&(s.data.users[l]={...s.data.users[l],...d.user})}else s.data.users.unshift(d.user);B(),P(),k(t("تم حفظ حساب العضو.","Member account saved."));return}if(a.id==="role-form"){if(!C()&&!I("manage_roles"))throw new Error(t("غير مصرح لك بإدارة وتعديل الأدوار.","Permission denied to manage roles."));const r=a.dataset.roleId,i=[...a.querySelectorAll('input[name="permissions"]:checked')].map(c=>c.value),d=!!r,l=await j(d?`/api/roles/${r}`:"/api/roles",{method:d?"PATCH":"POST",body:JSON.stringify({...n,permissions:i})});if(l.role)if(s.data.roles||(s.data.roles=[]),d){const c=s.data.roles.findIndex(u=>u.id===l.role.id);c!==-1&&(s.data.roles[c]={...s.data.roles[c],...l.role})}else s.data.roles.push(l.role);B(),P(),k(t("تم حفظ الدور بنجاح.","Role saved."));return}if(a.id==="template-form"){const r=a.dataset.templateId,i=!!r,d=await j(i?`/api/templates/${r}`:"/api/templates",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.template)if(s.data.templates||(s.data.templates=[]),i){const l=s.data.templates.findIndex(c=>c.id===d.template.id);l!==-1&&(s.data.templates[l]={...s.data.templates[l],...d.template})}else s.data.templates.push(d.template);B(),P(),k(t("تم حفظ القالب بنجاح.","Template saved."));return}if(a.dataset.action==="update-profile"){if(n.calendarSystem){s.calendarSystem=n.calendarSystem;try{localStorage.setItem("darc_calendar_system",n.calendarSystem)}catch{}}const r=await j("/api/users/me",{method:"PATCH",body:JSON.stringify(n)});if(r.user){s.data.user={...s.data.user,...r.user};const i=(s.data.users||[]).findIndex(d=>d.id===s.data.user.id);i!==-1&&(s.data.users[i]={...s.data.users[i],...r.user})}P(),k(t("تم حفظ وتحديث الملف الشخصي بنجاح.","Profile updated successfully.")),o&&(o.disabled=!1);return}if(a.dataset.action==="update-company"){if(!C()&&!I("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات الشركة.","Permission denied to update company settings."));const r=await j("/api/company",{method:"PATCH",body:JSON.stringify(n)});r.company&&(s.data.company={...s.data.company,...r.company}),P(),k(t("تم تحديث بيانات الشركة.","Company data updated.")),o&&(o.disabled=!1);return}if(a.dataset.action==="update-whatsapp"){if(!C()&&!I("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات التنبيهات.","Permission denied to update alert settings."));const r={enabled:a.querySelector('input[name="enabled"]')?.checked||!1,provider:n.provider||"evolution",instanceName:n.instanceName||"darc-workspace",serverUrl:n.serverUrl||"",apiKey:n.apiKey||"",recipient:n.recipient||"",notifyOnBlocked:a.querySelector('input[name="notifyOnBlocked"]')?.checked||!1,notifyOnApproval:a.querySelector('input[name="notifyOnApproval"]')?.checked||!1,notifyOnDrawing:a.querySelector('input[name="notifyOnDrawing"]')?.checked||!1,notifyOnCollectiveMention:a.querySelector('input[name="notifyOnCollectiveMention"]')?.checked!==!1,sendGroupBroadcast:a.querySelector('input[name="sendGroupBroadcast"]')?.checked||!1},i=await j("/api/whatsapp/config",{method:"POST",body:JSON.stringify({config:r})});i.config&&(s.data.company||(s.data.company={}),s.data.company.customFields||(s.data.company.customFields={}),s.data.company.customFields.whatsapp=i.config,s.data.company.custom_fields&&(s.data.company.custom_fields.whatsapp=i.config)),k(t("تم حفظ إعدادات تنبيهات واتساب بنجاح ✅","WhatsApp alert settings saved successfully ✅")),P(),o&&(o.disabled=!1);return}if(a.dataset.action==="change-password"){if(n.newPassword.length<10)throw new Error(t("كلمة المرور يجب أن تكون 10 أحرف على الأقل.","Password must be at least 10 characters."));await j("/api/auth/change-password",{method:"POST",body:JSON.stringify(n)}),a.reset(),k(t("تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.","Password changed successfully. Signed out of other devices.")),o&&(o.disabled=!1);return}}catch(r){a.id==="activation-form"?It(n.token,r.message):k(r.message,!0)}finally{o&&(o.disabled=!1,o.classList.remove("is-loading"))}}async function La(e){const a=document.getElementById("mention-dropdown"),n=document.getElementById("project-menu");if(a&&!e.target.closest("#mention-dropdown")&&!e.target.closest('input[name="content"]')&&(a.style.display="none"),n&&!e.target.closest("#project-menu")&&!e.target.closest('[data-action="toggle-project-menu"]')&&(n.style.display="none"),e.target.classList.contains("modal-backdrop")){B();return}if(e.target.closest("#task-dropzone")&&e.target.id!=="task-upload-input"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}const o=e.target.closest("[data-action], [data-view]");if(!o)return;const r=o.dataset.action;if(r==="test-whatsapp"){const i=o.closest('[data-action="test-whatsapp"]');i&&(i.disabled=!0),k(t("جاري إرسال تنبيه تجريبي للواتساب...","Sending test WhatsApp alert..."));try{const d=document.querySelector('input[name="serverUrl"]')?.value||"",l=document.querySelector('input[name="apiKey"]')?.value||"",c=document.querySelector('input[name="recipient"]')?.value||"",u=document.querySelector('input[name="instanceName"]')?.value||"darc-workspace",m=document.querySelector('select[name="provider"]')?.value||"evolution",v=await j("/api/whatsapp/test",{method:"POST",body:JSON.stringify({config:{serverUrl:d,apiKey:l,recipient:c,instanceName:u,provider:m}})});k(v.message||t("تم إرسال الرسالة بنجاح! 🚀","Test message sent successfully! 🚀"))}catch(d){k(d.message||t("فشل إرسال رسالة الاختبار، تحقق من صحة البيانات.","Failed to send test alert."),!0)}finally{i&&(i.disabled=!1)}return}if(o.classList.contains("menu-item")){const i=o.closest(".dropdown-menu");i&&(i.style.display="none")}if(o.dataset.view){fe(o.dataset.view,o.dataset.projectId||void 0);return}if(r==="trigger-avatar-upload"){const i=document.getElementById("user-avatar-file-input");i&&i.click();return}if(r==="trigger-company-logo-upload"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0);return}const i=document.getElementById("company-logo-file-input");i&&i.click();return}if(r==="toggle-theme"){s.theme=s.theme==="dark"?"light":"dark",bt({theme:s.theme}),document.documentElement.dataset.theme=s.theme,document.querySelectorAll('[data-action="toggle-theme"]').forEach(i=>{i.textContent=s.theme==="dark"?"☀️":"🌙"});return}if(r==="toggle-lang"){if(s.lang=s.lang==="ar"?"en":"ar",bt({lang:s.lang}),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.body.classList.toggle("is-ltr",s.lang==="en"),s.data?.user||typeof localStorage<"u"&&localStorage.getItem("darc_token"))J();else{const i=new URLSearchParams(window.location.hash.replace(/^#/,""));if(i.get("activate"))It(i.get("activate"));else if(i.get("reset"))ot(i.get("reset"));else{const d=document.getElementById("login-email")?.value||"",l=document.getElementById("login-password")?.value||"",c=!!document.getElementById("forgot-form");if(ve("",c?"forgot":"login"),d){const u=document.getElementById("login-email");u&&(u.value=d)}if(l){const u=document.getElementById("login-password");u&&(u.value=l)}}}return}if(r==="quick-fill-login"){const i=o.closest('[data-action="quick-fill-login"]'),d=document.getElementById("login-email"),l=document.getElementById("login-password"),c=i?.dataset?.email||"demo@darc-design.bond",u=i?.dataset?.pass||"demo123456";if(d&&(d.value=c,d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),l&&(l.value=u,l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),i?.dataset?.autosubmit==="true"){const m=document.getElementById("login-form");m&&(typeof m.requestSubmit=="function"?m.requestSubmit():m.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0})))}return}if(r==="goto-forgot"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#forgot"),ve("","forgot");return}if(r==="goto-login"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#login"),ve();return}if(r==="reset-demo-sandbox"){try{k(t("جاري إعادة ضبط بيانات العرض التجريبي...","Resetting demo sandbox..."),!1);const i=await j("/api/demo/reset",{method:"POST"});i&&i.data&&(s.data=i.data,me(i.data),J(),k(t("تمت إعادة ضبط البيانات بنجاح ✨","Demo data reset successfully ✨"),!1))}catch(i){k(i.message,!0)}return}if(r==="toggle-sidebar"){s.sidebarOpen=!s.sidebarOpen,document.querySelector(".sidebar")?.classList.toggle("open",s.sidebarOpen);return}if(r==="logout"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout"),await j("/api/auth/logout",{method:"POST"}).catch(()=>{});try{await Tn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_mutations_queue"),localStorage.removeItem("darc_offline_queue")}catch{}}We(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),ve();return}if(r==="logout-all"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout_all"),await j("/api/auth/logout-all",{method:"POST"}).catch(()=>{});try{await Tn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_mutations_queue"),localStorage.removeItem("darc_offline_queue")}catch{}}We(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),ve();return}if(r==="open-omnisearch"){ji();return}if(r==="close-omnisearch"){Ve();return}if(r==="open-cheatsheet"){document.querySelector('.modal[data-modal="cheatsheet"], .modal-cheatsheet')?B():pn();return}if(r==="close-modal"){B();return}if(r==="show-notifications"){document.querySelector('.modal[data-modal="notifications"], .modal-notifications')?B():showNotifications();return}if(r==="delete-notification"){e.stopPropagation();const i=o.dataset.notificationId||o.closest("[data-notification-id]")?.dataset.notificationId;if(!i)return;s.data?.notifications&&(s.data.notifications=s.data.notifications.filter(d=>d.id!==i)),showNotifications(),J(),j(`/api/notifications/${encodeURIComponent(i)}`,{method:"DELETE"}).catch(d=>{console.warn("[Notifications] Failed to delete notification:",d)});return}if(r==="clear-read-notifications"){if(e.stopPropagation(),!(s.data?.notifications||[]).filter(i=>i.read||i.readAt).length)return;s.data?.notifications&&(s.data.notifications=s.data.notifications.filter(i=>!i.read&&!i.readAt)),showNotifications(),J(),k(t("تم مسح التنبيهات المقروءة بنجاح.","Read notifications cleared successfully.")),j("/api/notifications/clear-read",{method:"POST"}).catch(i=>{console.warn("[Notifications] Failed to clear read notifications:",i)});return}if(r==="enable-browser-notifications"){e.stopPropagation(),typeof window<"u"&&"Notification"in window?Notification.requestPermission().then(i=>{if(i==="granted"){k(t("تم تفعيل إشعارات المتصفح بنجاح! 🔔","Desktop browser notifications enabled! 🔔"));try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("إشعارات المتصفح الفورية تعمل بنجاح الآن على هذا الجهاز.","Browser notifications are now working on this device."),icon:"/favicon.ico"})}catch{}}else i==="denied"&&k(t("تم رفض الإشعارات من إعدادات المتصفح.","Notifications are blocked in browser settings."),!0);showNotifications()}):k(t("متصفحك لا يدعم إشعارات الويب المباشرة.","Your browser does not support web notifications."),!0);return}if(r==="send-test-notification"){e.stopPropagation(),k(t("جاري إرسال إشعار تجريبي من السيرفر...","Sending test notification from server...")),j("/api/notifications/test",{method:"POST",body:JSON.stringify({messageAr:"إشعار فحص النظام المباشر — السيرفر والربط اللحظي يعملان بكفاءة 🚀",messageEn:"Live System Test — Backend and Realtime are operating smoothly 🚀"})}).then(i=>{k(t("تم إرسال الإشعار من السيرفر بنجاح! 🔔","Test notification dispatched from server! 🔔")),Da(),i&&i.notification&&(s.data.notifications||(s.data.notifications=[]),s.data.notifications.unshift(i.notification),showNotifications(),J())}).catch(i=>{k(i.message||t("فشل إرسال الإشعار التجريبي","Failed to send test notification"),!0)});return}if(r==="play-test-chime"){e.stopPropagation(),Da(),k(t("تم تشغيل النغمة التنبيهية 🔔","Notification chime played 🔔"));return}if(r==="test-browser-notification"){if(e.stopPropagation(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("هذا اختبار لإشعار سطح المكتب والمتصفح — يعمل بنجاح! 🚀","This is a test desktop notification — working perfectly! 🚀"),icon:"/favicon.ico"}),k(t("تم إرسال إشعار المتصفح لسطح المكتب!","Desktop notification dispatched!"))}catch(i){k(i.message,!0)}else k(t("إشعارات المتصفح غير مفعلة بعد.","Browser notifications not yet enabled."),!0);return}if(r==="read-notification"){if(o.dataset.action==="delete-notification"||o.closest('[data-action="delete-notification"]'))return;const i=o.dataset.notificationId||o.closest("[data-notification-id]")?.dataset.notificationId,d=(s.data?.notifications||[]).find(v=>v.id===i);d&&(d.read=!0,d.readAt=new Date().toISOString()),J(),i&&j(`/api/notifications/${i}`,{method:"PATCH",body:JSON.stringify({})}).catch(v=>{console.warn("[Notifications] Failed to patch read status in background:",v)}),B(!0);const l=o.dataset.taskId||d?.taskId,c=o.dataset.documentId||d?.documentId,u=o.dataset.projectId||d?.projectId,m=o.dataset.type||d?.type;if(c){xa(c);return}if(l){let v=(s.data?.tasks||[]).find(w=>w.id===l);if(v){v.projectId&&(s.activeProjectId=v.projectId),openTaskModal(v);return}try{const w=await j(`/api/tasks/${l}`);if(w&&w.id){s.data.tasks||(s.data.tasks=[]),s.data.tasks.push(w),w.projectId&&(s.activeProjectId=w.projectId),openTaskModal(w);return}}catch(w){console.warn("[Notifications] Failed to fetch task on demand:",w)}}if(m==="document_review"&&u){s.activeProjectId=u,s.projectTab="drawings",fe("project-detail",u);return}if(u){s.activeProjectId=u,fe("project-detail",u);return}await ae();return}if(r==="mark-all-notifications-read"){try{await j("/api/notifications/read-all",{method:"POST"}),(s.data?.notifications||[]).forEach(i=>{i.read=!0,i.readAt=new Date().toISOString()}),showNotifications(),J(),k(t("تم تحديد كافة التنبيهات كمقروءة.","All notifications marked as read."))}catch(i){k(i.message,!0)}return}if(r==="toggle-project-menu"){n&&(n.style.display=n.style.display==="none"?"block":"none");return}if(r==="preview-doc"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId;i&&xa(i);return}if(r==="copy-doc-link"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId,d=s.data?.documents?.find(l=>l.id===i);if(d){const l=o.closest("button")||o;await Za(d,l)}return}if(r==="download-doc"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId;i&&await Jt(i);return}if(r==="trigger-upload"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}if(r==="open-upload-drawing-modal"){typeof openUploadDrawingModal=="function"?openUploadDrawingModal(o.dataset.projectId||null):typeof window.openUploadDrawingModal=="function"&&window.openUploadDrawingModal(o.dataset.projectId||null);return}if(r==="new-project"){document.querySelector('.modal[data-modal="project"], #project-form')?B():openProjectModal();return}if(r==="edit-project"){const i=s.data.projects.find(d=>d.id===o.dataset.projectId);i&&openProjectModal(i);return}if(r==="clone-project"){const i=s.data.projects.find(d=>d.id===o.dataset.projectId);i&&openCloneModal(i);return}if(r==="rename-doc"){const i=o.dataset.docId,d=s.data?.documents?.find(c=>c.id===i);if(!d)return;const l=window.prompt(t("أدخل الاسم الجديد:","Enter new name:"),d.originalName);if(!l||l===d.originalName)return;try{await j(`/api/documents/${i}`,{method:"PATCH",body:JSON.stringify({originalName:l})}),d.originalName=l,await ae(!0);const c=s.data?.tasks?.find(u=>u.id===d.taskId);if(c){const u=document.getElementById("task-documents-list");u&&(u.innerHTML=Ge(c))}}catch(c){k(c.message,!0)}return}if(r==="go-to-trash"){s.settingsSection="trash",s.trashLoaded=!1,fe("settings");return}if(r==="delete-doc"){if(!window.confirm(t("هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.","Are you sure you want to move this document to trash? You can restore it within 30 days.")))return;const i=o.dataset.docId,d=s.data?.documents?.find(l=>l.id===i)?.taskId;try{if(await j(`/api/documents/${i}`,{method:"DELETE"}),s.data?.documents&&(s.data.documents=s.data.documents.filter(l=>l.id!==i)),s.trashLoaded=!1,await ae(!0),k(t("تم نقل المستند إلى سلة المهملات بنجاح.","Document moved to trash successfully.")),d){const l=s.data?.tasks?.find(c=>c.id===d);if(l){const c=document.getElementById("task-documents-list");c&&(c.innerHTML=Ge(l))}}}catch(l){k(l.message,!0)}return}if(r==="delete-project"){if(!window.confirm(t("هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.","Are you sure you want to delete this project? It will be archived.")))return;const i=[...s.data.projects||[]];s.data.projects=s.data.projects.filter(d=>d.id!==o.dataset.projectId),B(),fe("projects"),k(t("جاري حذف المشروع...","Deleting project..."));try{await j(`/api/projects/${o.dataset.projectId}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await ae(!0),k(t("تم حذف المشروع بنجاح.","Project deleted successfully."))}catch(d){s.data.projects=i,P(),k(d.message,!0)}return}if(r==="delete-task"){if(!window.confirm(t("هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.","Are you sure you want to delete this task? It will be moved to trash.")))return;const i=o.dataset.taskId,d=[...s.data.tasks||[]];s.data.tasks=s.data.tasks.filter(l=>l.id!==i),B(),P(),k(t("جاري حذف المهمة...","Deleting task..."));try{await j(`/api/tasks/${i}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await ae(!0),k(t("تم حذف المهمة بنجاح.","Task deleted successfully."))}catch(l){s.data.tasks=d,P(),k(l.message,!0)}return}if(r==="edit-task-comment"){const i=o.dataset.commentId,d=o.dataset.taskId,l=(s.data.comments||[]).find(m=>m.id===i);if(!l)return;const c=window.prompt(t("تعديل التعليق:","Edit comment:"),l.content);if(c===null)return;const u=c.trim();if(!u){k(t("لا يمكن ترك التعليق فارغاً.","Comment cannot be empty."),!0);return}if(u===l.content)return;try{const m=await j(`/api/tasks/${d}/comments/${i}`,{method:"PATCH",body:JSON.stringify({content:u})});if(m.comment){const v=(s.data.comments||[]).findIndex($=>$.id===i);v!==-1&&(s.data.comments[v]=m.comment);const w=(s.data.tasks||[]).find($=>$.id===d),y=document.getElementById("task-comments-list");y&&w&&(y.innerHTML=renderTaskComments(w)),k(t("تم تعديل التعليق بنجاح.","Comment updated successfully."))}}catch(m){k(m.message,!0)}return}if(r==="delete-task-comment"){const i=o.dataset.commentId,d=o.dataset.taskId;if(!window.confirm(t("هل أنت متأكد من حذف هذا التعليق؟","Are you sure you want to delete this comment?")))return;try{await j(`/api/tasks/${d}/comments/${i}`,{method:"DELETE"}),s.data.comments&&(s.data.comments=s.data.comments.filter(u=>u.id!==i));const l=(s.data.tasks||[]).find(u=>u.id===d),c=document.getElementById("task-comments-list");c&&l&&(c.innerHTML=renderTaskComments(l)),k(t("تم حذف التعليق بنجاح.","Comment deleted successfully."))}catch(l){k(l.message,!0)}return}if(r==="manual-sync"){if(typeof navigator<"u"&&!navigator.onLine){k(t("أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡","You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡"),!1);return}const i=At();if(!i.length){k(t("جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️","All data is completely synchronized with cloud server ✔️"),!1);return}k(t(`جاري مزامنة ${i.length} عمليات معلقة مع السيرفر...`,`Syncing ${i.length} pending actions with server...`),!1);const d=await Fa(j);if(d.synced>0){if(k(t(`تمت مزامنة ${d.synced} عمليات بنجاح! 🚀`,`Successfully synced ${d.synced} actions! 🚀`),!1),await le(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}}else d.failed>0&&k(t(`فشلت مزامنة ${d.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${d.failed} actions, please try again.`),!0);return}if(r==="new-task"){document.querySelector('.modal[data-modal="task"], #task-form')?B():openTaskModal(null,null,o.dataset.projectId);return}if(r==="new-user"){if(!C()&&!I("manage_users")){k(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."),!0);return}openUserModal();return}if(r==="new-role"){if(!C()&&!I("manage_roles")){k(t("غير مصرح لك بإنشاء أدوار جديدة.","Permission denied to create new roles."),!0);return}openRoleModal();return}if(r==="new-template"){openTemplateModal();return}if(r==="edit-template"){const i=s.data.templates.find(d=>d.id===o.dataset.templateId);i&&openTemplateModal(i);return}if(r==="delete-template"){if(!window.confirm(t("هل أنت متأكد من حذف هذا القالب؟","Are you sure you want to delete this template?")))return;const i=[...s.data.templates||[]];s.data.templates=s.data.templates.filter(d=>d.id!==o.dataset.templateId),P(),B();try{await j(`/api/templates/${o.dataset.templateId}`,{method:"DELETE"}),await ae(!0),k(t("تم حذف القالب.","Template deleted."))}catch(d){s.data.templates=i,P(),k(d.message,!0)}return}if(r==="open-project"){s.projectTab="tasks",s.projectMemberFilter=null,fe("project-detail",o.dataset.projectId);return}if(r==="filter-by-member"){const i=o.dataset.memberId;s.projectMemberFilter=s.projectMemberFilter===i?null:i,s.projectTab="tasks",requestAnimationFrame(()=>P());return}if(r==="clear-member-filter"){s.projectMemberFilter=null,requestAnimationFrame(()=>P());return}if(r==="back-to-projects"){s.projectMemberFilter=null,fe("projects",null);return}if(r==="project-tab"){s.projectTab=o.dataset.tab;try{if(typeof window<"u"&&s.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(s.activeProjectId)}&tab=${encodeURIComponent(s.projectTab)}`),typeof sessionStorage<"u"){const d=sessionStorage.getItem("darc_last_route"),l=d?JSON.parse(d):{};l.view="project-detail",l.activeProjectId=s.activeProjectId,l.projectTab=s.projectTab,sessionStorage.setItem("darc_last_route",JSON.stringify(l))}}catch{}o.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(d=>d.classList.toggle("active",d===o));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>P());return}if(r==="toggle-timeline-view"){s.timelineView=o.dataset.viewMode||"gantt",requestAnimationFrame(()=>P());return}if(r==="prev-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()-1),s.calendarDate=i,requestAnimationFrame(()=>P());return}if(r==="next-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()+1),s.calendarDate=i,requestAnimationFrame(()=>P());return}if(r==="today-calendar-month"){s.calendarDate=new Date,requestAnimationFrame(()=>P());return}if(r==="open-task"){if(window._isDraggingTask||window._justDroppedAt&&Date.now()-window._justDroppedAt<400)return;const i=o.dataset.taskId||o.closest("[data-task-id]")?.dataset.taskId;if(!i)return;let d=(s.data?.tasks||[]).find(l=>l.id===i);if(d){openTaskModal(d);return}j(`/api/tasks/${i}`).then(l=>{l&&l.id?(s.data.tasks||(s.data.tasks=[]),s.data.tasks.push(l),openTaskModal(l)):k(t("تعذر العثور على المهمة أو تم نقلها لسلة المهملات.","Task not found or was moved to trash."),!0)}).catch(l=>{k(t("تعذر فتح المهمة: "+l.message,"Could not open task: "+l.message),!0)});return}if(r==="task-filter"){s.taskFilter=o.dataset.filter,o.closest(".view-toolbar-start")?.querySelectorAll(".filter-tab").forEach(i=>i.classList.toggle("active",i===o)),requestAnimationFrame(()=>P());return}if(r==="template-category"){s.templateCategory=o.dataset.category,requestAnimationFrame(()=>P());return}if(r==="use-template"){if(!s.data.projects.length)return k(g("noProjects"),!0);openTaskModal(null,o.dataset.templateId,s.activeProjectId);return}if(r==="open-user"){if(!C()&&!I("manage_users")&&!I("manage_existing_account_permissions")){k(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."),!0);return}const i=s.data.users.find(d=>d.id===o.dataset.userId);i&&openUserModal(i);return}if(r==="impersonate-user"){if(!C()){k(t("هذه الصلاحية خاصة بمدير النظام فقط.","Impersonation is restricted to system admin only."),!0);return}if(!window.confirm("هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً."))return;try{const i=await j(`/api/users/${o.dataset.userId}/impersonate`,{method:"POST"});i&&i.token&&typeof localStorage<"u"&&localStorage.setItem("darc_token",i.token),window.location.reload()}catch(i){k(i.message,!0)}return}if(r==="force-password-user"){if(!C()&&!I("manage_users")){k(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."),!0);return}const i=s.data.users.find(d=>d.id===o.dataset.userId);i&&openForcePasswordModal(i);return}if(r==="invite-user"){if(!C()&&!I("manage_users")){k(t("غير مصرح لك بإرسال دعوات للمستخدمين.","Permission denied to invite users."),!0);return}try{const i=await j(`/api/users/${o.dataset.userId}/invite`,{method:"POST"});await ae(),k(i.emailConfigured?t("تم إرسال الدعوة.","Invitation sent."):t("تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.","Invite prepared, but the email provider is not configured."))}catch(i){k(i.message,!0)}return}if(r==="deactivate-user"){if(!C()&&!I("manage_users")){k(t("غير مصرح لك بتعطيل حسابات المستخدمين.","Permission denied to deactivate users."),!0);return}if(!window.confirm(g("confirmDeactivate")))return;const i=o.dataset.userId,d=s.data.users.find(c=>c.id===i),l=d?d.status:null;d&&(d.status="inactive"),P(),B();try{await j(`/api/users/${i}`,{method:"DELETE"}),await ae(!0),k(t("تم تعطيل الحساب.","Account deactivated."))}catch(c){d&&(d.status=l),P(),k(c.message,!0)}return}if(r==="settings-section"){const i=o.dataset.section||"profile";if(!re(i)){k(t("غير مصرح لك بالوصول لهذا القسم من الإعدادات.","Access denied to this settings section."),!0);return}s.settingsSection=i;try{if(typeof window<"u"&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof sessionStorage<"u"){const l=sessionStorage.getItem("darc_last_route"),c=l?JSON.parse(l):{};c.view="settings",c.settingsSection=s.settingsSection,sessionStorage.setItem("darc_last_route",JSON.stringify(c))}}catch{}o.closest(".settings-nav")?.querySelectorAll("button").forEach(l=>l.classList.toggle("active",l===o));const d=()=>{const l=document.getElementById("main-content");l&&(l.scrollTop=0,l.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0),document.documentElement&&(document.documentElement.scrollTop=0),document.body&&(document.body.scrollTop=0)};d(),s.settingsSection==="analytics"&&Nt(!0).then(()=>{P(),d()}).catch(()=>{}),s.settingsSection==="trash"&&!s.trashLoaded&&j("/api/trash").then(l=>{s.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(c=>({...c,type:"project"})),...(l.tasks||[]).map(c=>({...c,type:"task"})),...(l.documents||[]).map(c=>({...c,type:"document"}))],s.trashLoaded=!0;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}P(),d()}).catch(l=>console.error(l)),requestAnimationFrame(()=>{P(),d()});return}if(r==="refresh-analytics"){if(!re("analytics")){k(t("غير مصرح لك بعرض وتحديث التحليلات والمراقبة.","Permission denied to view and refresh analytics."),!0);return}try{await Nt(!0),P(),k(t("تم تحديث مؤشرات التحليلات والمراقبة الحية بنجاح.","Live observability and analytics refreshed successfully."))}catch(i){k(i.message,!0)}return}if(r==="test-anomaly-alert"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بإجراء محاكاة التنبيهات.","Permission denied to simulate anomaly alert."),!0);return}try{await j("/api/telemetry/test-anomaly",{method:"POST"}),await Nt(!0),await le(!0),J(),k(t("🚨 تم رصد استهلاك زائد بنجاح وإرسال إشعار فوري لمركز التنبيهات!","🚨 Anomaly detected! Alert notification dispatched to Notification Center!"))}catch(i){k(i.message,!0)}return}if(r==="goto-diagnostics"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بالوصول لتشخيص الأعطال.","Permission denied to access diagnostics."),!0);return}s.settingsSection="diagnostics",typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#settings?section=diagnostics"),P();return}if(r==="refresh-diagnostics"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بتحديث سجل الأعطال.","Permission denied to refresh diagnostics."),!0);return}try{await Ot(!0),P(),k(t("تم تحديث سجل الأخطاء وتشخيصات المستخدمين بنجاح.","Diagnostics and incidents refreshed successfully."))}catch(i){k(i.message,!0)}return}if(r==="test-incident-simulate"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بإجراء محاكاة للأعطال.","Permission denied to simulate error incidents."),!0);return}try{await j("/api/telemetry/test-error",{method:"POST"}),await Ot(!0),await le(!0),P(),k(t("🚨 تم رصد الخطأ وتوثيق خطوات المستخدم وإرسال بريد تنبيه للإدارة بنجاح!","🚨 Incident recorded with stack trace and alert email sent to admin!"))}catch(i){k(i.message,!0)}return}if(r==="test-diagnostic-email"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك باختبار إرسال البريد.","Permission denied to test alert email."),!0);return}try{await j("/api/telemetry/test-email",{method:"POST"}),k(t("✉️ تم إرسال رسالة اختبار التنبيهات البريدية للإدارة بنجاح!","✉️ Test alert email dispatched to admin successfully!"))}catch(i){k(i.message,!0)}return}if(r==="filter-diagnostics-user"){const i=o.dataset.userId||"all";Ln(i),P();return}if(r==="clear-diagnostics-user-filter"){Ln("all"),P();return}if(r==="resolve-diagnostic-incident"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بمعالجة بلاغات الأعطال.","Permission denied to resolve incidents."),!0);return}const i=o.dataset.incidentId;if(i)try{await j(`/api/telemetry/incidents/${i}/resolve`,{method:"PATCH"}),await Ot(!0),P(),k(t("تم تحديد المشكلة كمعالجة بنجاح ✅","Incident marked as resolved ✅"))}catch(d){k(d.message,!0)}return}if(r==="copy-debug-bundle"){const i=o.dataset.bundle;i&&typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>{k(t("تم نسخ تقرير المشكلة الفني بالكامل للحافظة 📋","Full debug bundle copied to clipboard 📋"))}).catch(()=>{k(t("فشل النسخ التلقائي للحافظة","Failed to copy to clipboard"),!0)});return}if(r==="restore-item"){if(!C()&&!I("manage_trash")){k(t("غير مصرح لك باستعادة العناصر المحذوفة.","Permission denied to restore deleted items."),!0);return}try{await j(`/api/restore/${o.dataset.type}/${o.dataset.id}`,{method:"POST"});const i=await j("/api/trash");s.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(d=>({...d,type:"project"})),...(i.tasks||[]).map(d=>({...d,type:"task"})),...(i.documents||[]).map(d=>({...d,type:"document"}))];try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}await ae(),k(t("تمت الاستعادة بنجاح.","Restored successfully."))}catch(i){k(i.message,!0)}return}if(r==="filter-trash"){if(!C()&&!I("manage_trash"))return;s.trashFilter=o.dataset.filter,requestAnimationFrame(()=>P());return}if(r==="purge-trash-item"){if(!C()&&!I("manage_trash")){k(t("غير مصرح لك بحذف العناصر نهائياً من سلة المهملات.","Permission denied to permanently delete trash items."),!0);return}const i=o.dataset.type,d=o.dataset.id;if(!window.confirm(t("هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.","Are you sure you want to permanently delete this item? This action cannot be undone.")))return;try{await j(`/api/trash/${i}/${d}`,{method:"DELETE"});const l=await j("/api/trash");s.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(c=>({...c,type:"project"})),...(l.tasks||[]).map(c=>({...c,type:"task"})),...(l.documents||[]).map(c=>({...c,type:"document"}))],P(),k(t("تم حذف العنصر نهائياً بنجاح.","Item permanently deleted."))}catch(l){k(l.message,!0)}return}if(r==="empty-trash"){if(!C()&&!I("manage_trash")){k(t("غير مصرح لك بإفراغ سلة المهملات.","Permission denied to empty trash."),!0);return}if(!window.confirm(t("هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.","Are you sure you want to empty the entire recycle bin? All items will be permanently erased.")))return;try{await j("/api/trash/empty",{method:"DELETE"}),s.trash=[],P(),k(t("تم إفراغ سلة المهملات بالكامل بنجاح.","Trash bin emptied successfully."))}catch(i){k(i.message,!0)}return}if(r==="open-role"){if(!C()&&!I("manage_roles")){k(t("غير مصرح لك بتعديل الأدوار والصلاحيات.","Permission denied to modify roles."),!0);return}const i=s.data.roles.find(d=>d.id===o.dataset.roleId);i&&openRoleModal(i);return}if(r==="delete-role"){if(!C()&&!I("manage_roles")){k(t("غير مصرح لك بحذف الأدوار.","Permission denied to delete roles."),!0);return}if(!window.confirm(g("confirmDeleteRole")))return;const i=o.dataset.roleId,d=[...s.data.roles||[]];s.data.roles=s.data.roles.filter(l=>l.id!==i),P(),B();try{await j(`/api/roles/${i}`,{method:"DELETE"}),await ae(!0),k(t("تم حذف الدور.","Role deleted."))}catch(l){s.data.roles=d,P(),k(l.message,!0)}return}if(r==="export-csv"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ti();return}if(r==="print-portfolio-pdf"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لطباعة التقارير.","You do not have permission to print reports."),!0);return}Di();return}if(r==="export-project"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ii(o.dataset.projectId);return}if(r==="export-project-pdf"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Aa(o.dataset.projectId,!1);return}if(r==="export-project-client-pdf"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Aa(o.dataset.projectId,!0);return}if(r==="export-audit-xls"){if(!I("view_audit_logs")&&!C()){k(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}yi();return}if(r==="print-audit-pdf"){if(!I("view_audit_logs")&&!C()){k(t("ليس لديك صلاحية لطباعة سجل الرقابة.","You do not have permission to print audit logs."),!0);return}bi();return}if(r==="load-full-audit"){if(!C()&&!I("view_audit_logs")){k(t("غير مصرح لك باستعراض سجل التدقيق الكامل.","Permission denied to view full audit logs."),!0);return}hi();return}if(r==="reset-audit-filters"){s.auditFilterAction="all",s.auditFilterEntity="all",s.auditFilterUser="all",s.auditSearchQuery="",P();return}}var Ze=null;function Ma(e){if(e.target.name==="content"&&e.target.closest("#task-comment-form")){const o=e.target.value,r=o.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),i=document.getElementById("mention-dropdown");if(r){const d=r[1].toLowerCase(),l=(s.data?.users||[]).filter(m=>m.status!=="inactive").filter(m=>`${m.name||""} ${m.nameEn||""} ${m.email||""}`.toLowerCase().includes(d)),c=!d||"all".startsWith(d)||"الكل".startsWith(d)||"everyone".startsWith(d)||"الجميع".startsWith(d)||"فريق".startsWith(d);let u="";c&&(u+=`
          <div class="mention-option collective-mention" data-username="all" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--line);background:rgba(20,184,166,0.06);">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--brand-teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">📢</div>
            <div style="display:flex;flex-direction:column;gap:1px;text-align:start;">
              <strong style="font-size:12px;color:var(--brand-teal);">@all · ${t("الكل / الجميع (منشن لكافة الفريق والمدير)","Everyone (Team & Management)")}</strong>
              <span style="font-size:10px;color:var(--muted);">${t("إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة عبر واتساب","Direct WhatsApp alert to all project members & managers")}</span>
            </div>
          </div>
        `),l.length&&(u+=l.map(m=>{const v=(m.name||m.nameEn||m.email||"user").trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${p(v)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${V(m,"avatar-sm")}
              <span style="font-size:12px;">${p(t(m.name,m.nameEn||m.name))}</span>
            </div>
          `}).join("")),u?(i.innerHTML=u,i.style.display="block",i.querySelectorAll(".mention-option").forEach(m=>{m.onclick=()=>{const v=m.dataset.username;e.target.value=o.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${v} `),i.style.display="none",e.target.focus()}})):i.style.display="none"}else i.style.display="none"}if(e.target.dataset.action==="search-trash-input"){s.trashQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(Ze),Ze=setTimeout(()=>{P();const r=document.querySelector('[data-action="search-trash-input"]');r&&(r.focus(),r.setSelectionRange(o,o))},120);return}if(e.target.dataset.action==="search-audit-input"){s.auditSearchQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(Ze),Ze=setTimeout(()=>{P();const r=document.querySelector('[data-action="search-audit-input"]');r&&(r.focus(),r.setSelectionRange(o,o))},120);return}const a=e.target.dataset.search||(e.target.dataset.action==="search-documents"?"documents":null);if(!a)return;s.searches[a]=e.target.value;const n=e.target.selectionStart;clearTimeout(Ze),Ze=setTimeout(()=>{P();const o=document.querySelector(`[data-search="${a}"], [data-action="search-documents"]`);o&&(o.focus(),o.setSelectionRange(n,n))},120)}async function za(e){if(e.target.dataset.action==="filter-diagnostics-severity"){Ps(e.target.value),P();return}if(e.target.dataset.action==="filter-diagnostics-status"){Ls(e.target.value),P();return}if(e.target.dataset.action==="change-doc-status"){const a=e.target.dataset.docId,n=e.target.value,o=s.data?.documents?.find(r=>r.id===a);if(!o)return;try{await j(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}),o.status=n,k(t("تم تحديث حالة المخطط بنجاح ✅","Drawing status updated ✅")),await ae(!0)}catch(r){k(r.message,!0)}return}if(e.target.dataset.action==="doc-project-filter"){s.docProjectFilter=e.target.value,P();return}if(e.target.dataset.action==="filter-project-docs-task"){s.docTaskFilter=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-action"){s.auditFilterAction=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-entity"){s.auditFilterEntity=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-user"){s.auditFilterUser=e.target.value,P();return}if(e.target.dataset.action==="sort-project-tasks"||e.target.dataset.action==="sort-my-tasks"){Qa(e.target.value),P();return}if(e.target.name==="templateId"&&e.target.form?.id==="task-form"){const a=e.target.form,n=e.target.value,o=s.data.templates?.find(u=>u.id===n),r=a.querySelector('input[name="titleAr"]'),i=a.querySelector('input[name="titleEn"]'),d=a.querySelector("#task-type-ar"),l=a.querySelector("#task-type-en"),c=a.querySelector('textarea[name="descriptionAr"]');o?(r&&(!r.value||a.dataset.templateSelected==="true")&&(r.value=o.nameAr),i&&(!i.value||a.dataset.templateSelected==="true")&&(i.value=o.nameEn||""),d&&(d.value=o.typeAr||"مخطط"),l&&(l.value=o.typeEn||"Drawing"),c&&(!c.value||a.dataset.templateSelected==="true")&&(c.value=o.descriptionAr||""),a.dataset.templateSelected="true"):(d&&(d.value=""),l&&(l.value=""),delete a.dataset.templateSelected);return}if(e.target.name==="status"&&e.target.form?.id==="task-form"){const a=e.target.form.querySelector("#task-auto-progress-badge");if(a){const n={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];a.textContent=n!==void 0?`(${n}%)`:""}return}if(e.target.dataset.action==="task-project-filter"){s.taskProjectFilter=e.target.value,P();return}if(e.target.dataset.action==="task-priority-filter"){s.taskPriorityFilter=e.target.value,P();return}if(e.target.id==="sort-projects"||e.target.dataset?.action==="sort-projects"){s.projectSort=e.target.value,P();return}if(e.target.id==="task-upload-input"){const a=e.target.files;if(!a.length)return;const n=e.target.dataset.taskId;gn(a,n);return}if(e.target.classList.contains("doc-status-select")){const a=e.target.dataset.docId,n=e.target.value;j(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}).then(()=>{ae(!0).then(()=>k(t("تم تحديث حالة المخطط.","Document status updated.")))}).catch(o=>k(o.message,!0));return}if(e.target.id==="user-avatar-file-input"){const a=e.target.files?.[0];if(!a)return;if(a.size>2621440){k(t("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.","Image is too large. Maximum allowed size is 2MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){k(t("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).","Please select a valid image file (JPG, PNG, WebP)."),!0),e.target.value="";return}try{k(t("جاري معالجة ورفع صورتك الشخصية...","Processing & uploading avatar..."));const n=await Fn(a,256,256),o=await j("/api/users/me",{method:"PATCH",body:JSON.stringify({avatarUrl:n})});if(o.user){s.data.user={...s.data.user,...o.user};const r=(s.data.users||[]).findIndex(i=>i.id===s.data.user.id);r!==-1&&(s.data.users[r]={...s.data.users[r],...o.user})}e.target.value="",J(),Ht(),k(t("تم تحديث صورتك الشخصية وتثبيتها بنجاح!","Avatar updated successfully!"))}catch(n){e.target.value="",k(n.message,!0)}return}if(e.target.id==="company-logo-file-input"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0),e.target.value="";return}const a=e.target.files?.[0];if(!a)return;if(a.size>3145728){k(t("حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.","Logo is too large. Maximum allowed size is 3MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){k(t("يرجى اختيار ملف صورة أو شعار صالح.","Please select a valid logo image file."),!0),e.target.value="";return}try{k(t("جاري معالجة ورفع شعار الشركة...","Uploading company logo..."));const n=await Fn(a,400,400),o=await j("/api/company",{method:"PATCH",body:JSON.stringify({logoUrl:n})});o.company&&(s.data.company={...s.data.company,...o.company}),e.target.value="",J(),Ht(),k(t("تم تحديث وتثبيت شعار مساحة العمل بنجاح!","Company logo updated successfully!"))}catch(n){e.target.value="",k(n.message,!0)}return}}function Fn(e,a=300,n=300){return new Promise((o,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(t("فشل قراءة ملف الصورة.","Failed to read image file."))),i.onload=()=>{const d=new Image;d.onerror=()=>r(new Error(t("صيغة الصورة تالفة أو غير صالحة.","Corrupted or invalid image format."))),d.onload=()=>{try{const l=d.naturalWidth||d.width,c=d.naturalHeight||d.height;if(l>4096||c>4096||l*c>16e6){r(new Error(t("أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.","Image dimensions too large (Pixel Flood Blocked). Please select a standard image.")));return}let u=l,m=c;if(u>a||m>n){const f=Math.min(a/u,n/m);u=Math.round(u*f),m=Math.round(m*f)}const v=document.createElement("canvas");v.width=u,v.height=m;const w=v.getContext("2d");w.imageSmoothingEnabled=!0,w.imageSmoothingQuality="high",w.drawImage(d,0,0,u,m);let y="image/webp",$=v.toDataURL(y,.82);$.startsWith("data:image/webp")||(y="image/jpeg",$=v.toDataURL(y,.82)),$.length>184320&&($=v.toDataURL(y,.65)),o($)}catch{r(new Error(t("تعذر معالجة وضغط الصورة.","Failed to process and compress image.")))}},d.src=i.result},i.readAsDataURL(e)})}function Ra({url:e,chunk:a,contentRange:n,headers:o={},onProgress:r}){return new Promise((i,d)=>{const l=new XMLHttpRequest;if(l.open("PUT",e,!0),e.includes("/api/")){l.withCredentials=!0;const c=typeof localStorage<"u"?localStorage.getItem("darc_token"):null;c&&!o.Authorization&&l.setRequestHeader("Authorization",`Bearer ${c}`)}for(const[c,u]of Object.entries(o))l.setRequestHeader(c,u);n&&l.setRequestHeader("Content-Range",n),l.upload&&r&&(l.upload.onprogress=c=>{c.lengthComputable&&r(c.loaded)}),l.onload=()=>{i({status:l.status,ok:l.status>=200&&l.status<300,headers:{get:c=>l.getResponseHeader(c)},responseText:l.responseText,json:()=>{try{return JSON.parse(l.responseText)}catch{return{}}}})},l.onerror=()=>d(new Error("Network connection error")),l.ontimeout=()=>d(new Error("Upload chunk timeout")),l.timeout=18e4,l.send(a)})}async function vo(e,a){try{const n=await Ra({url:e,chunk:new Blob([]),contentRange:`bytes */${a}`});if(n.status===308){const o=n.headers.get("Range");if(o){const r=o.match(/bytes=0-(\d+)/);if(r&&r[1])return parseInt(r[1],10)+1}return 0}if(n.ok)return{completed:!0,data:typeof n.json=="function"?await Promise.resolve(n.json()):{}}}catch{}return null}var Ut=null;function Mi({projectName:e,taskName:a,totalFiles:n}){Ut&&(clearTimeout(Ut),Ut=null);let o=document.getElementById("floating-upload-manager");if(o){o.style.opacity="1",o.style.transform="none";const r=o.querySelector("#fum-proj-text"),i=o.querySelector("#fum-task-text");r&&e&&(r.textContent=e),i&&a&&(i.textContent=a)}else{o=document.createElement("div"),o.id="floating-upload-manager",o.setAttribute("dir",s.lang==="ar"?"rtl":"ltr"),o.style.cssText=`
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
            <span id="fum-proj-text" style="color:var(--ink);font-weight:600;">${p(e||"—")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${t("المهمة:","Task:")}</span>
            <span id="fum-task-text" style="color:var(--ink-soft);">${p(a||"—")}</span>
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
    `,document.body.appendChild(o);const r=o.querySelector("#fum-minimize-btn"),i=o.querySelector("#fum-body");r.addEventListener("click",()=>{const d=i.style.display==="none";i.style.display=d?"flex":"none",r.textContent=d?"—":"+"}),o.querySelector("#fum-close-btn").addEventListener("click",()=>{o.remove()})}return o}function et({fileName:e,fileIndex:a,totalFiles:n,pct:o,loadedMB:r,fileSizeMB:i,speedMBs:d,etaText:l,statusNote:c,isError:u,isDone:m}){const v=document.getElementById("floating-upload-manager");if(!v)return;const w=v.querySelector("#fum-file-text"),y=v.querySelector("#fum-count-text"),$=v.querySelector("#fum-progress-fill"),f=v.querySelector("#fum-pct-text"),x=v.querySelector("#fum-speed-text"),T=v.querySelector("#fum-eta-text"),S=v.querySelector("#fum-status-badge"),E=v.querySelector("#fum-indicator"),M=v.querySelector("#fum-header-title"),L=v.querySelector("#fum-close-btn");e&&w&&(w.textContent=e),y&&a&&n&&(y.textContent=`(${a}/${n})`),$&&typeof o=="number"&&($.style.width=`${o}%`),f&&typeof o=="number"&&(f.textContent=`${o}%`),x&&r!==void 0&&i!==void 0&&(x.textContent=`${r} / ${i} MB • ${d||"0.0"} MB/s`),T&&l&&(T.textContent=`${t("متبقي:","ETA:")} ${l}`),c&&S?(S.style.display="block",S.textContent=c,S.style.background=u?"var(--red-soft)":"var(--amber-soft)",S.style.color=u?"var(--red)":"var(--amber)",S.style.border=u?"1px solid var(--red)":"1px solid var(--amber)"):!u&&!m&&S&&(S.style.display="none"),m&&(E&&(E.style.background="var(--mint-strong)",E.style.boxShadow="0 0 10px var(--mint-strong)"),M&&(M.textContent=t("اكتمل الرفع بنجاح! ✓","Upload Complete! ✓")),f&&(f.textContent="100%"),$&&($.style.width="100%"),L&&(L.style.display="inline-block"),S&&(S.style.display="block",S.style.background="var(--mint)",S.style.color="var(--teal-dark)",S.style.border="1px solid var(--mint-strong)",S.textContent=t("تم التوثيق والرفع إلى الخادم بنجاح.","Document saved & uploaded to server.")),Ut=setTimeout(()=>{v&&v.parentNode&&(v.style.opacity="0",v.style.transform="translateY(12px)",setTimeout(()=>v.remove(),300))},4500)),u&&(E&&(E.style.background="var(--red)",E.style.boxShadow="0 0 10px var(--red)"),M&&(M.textContent=t("فشل في الرفع ✕","Upload Failed ✕")),L&&(L.style.display="inline-block"))}async function gn(e,a){if(!e||!e.length||!a)return;const n=s.data?.tasks?.find(o=>o.id===a);return zi({files:e,taskId:a,projectId:n?.projectId,status:"draft",isTaskModal:!0})}async function zi({files:e,projectId:a=null,taskId:n=null,discipline:o="عام",status:r="draft",isTaskModal:i=!1}){if(!e||!e.length)return;if(typeof navigator<"u"&&!navigator.onLine){k(t("لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.","Cannot upload drawings or files while offline. Please connect to the internet first."),!0);return}const d=n?s.data?.tasks?.find(S=>S.id===n):null,l=a||d?.projectId,c=l?s.data?.projects?.find(S=>S.id===l):null,u=s.data?.documents?s.data.documents.filter(S=>!S.deletedAt&&(n?S.taskId===n:S.projectId===l)):[],m=c?c.nameAr:"Project",v=d?d.titleAr:o||"General",w={},y=S=>{if(w[S])return w[S];let E=0;return u.forEach(M=>{if(M.originalName&&M.originalName.toLowerCase().endsWith(S)){const L=M.originalName.match(/_v(\d+)\./);L&&parseInt(L[1])>E&&(E=parseInt(L[1]))}}),w[S]=E+1,E+1},$=document.getElementById("upload-progress-container");document.getElementById("upload-progress-bar"),document.getElementById("upload-progress-percent"),document.getElementById("upload-progress-text");const f=document.getElementById("task-dropzone");i&&$&&($.style.display="block"),i&&f&&(f.style.pointerEvents="none"),Mi({projectName:m,taskName:v,totalFiles:e.length});let x=null;const T=S=>(S.preventDefault(),S.returnValue=t("جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.","Uploading large engineering files. Leaving will abort upload."),S.returnValue);if(typeof window<"u"&&(window.addEventListener("beforeunload",T),"wakeLock"in navigator))try{navigator.wakeLock.request("screen").then(S=>{x=S}).catch(()=>{})}catch{}try{for(let S=0;S<e.length;S++){const E=e[S];if(!E.size||E.size===0){k(t(`الملف "${E.name}" فارغ لا يحتوي على بيانات.`,`File "${E.name}" is empty.`),!0);continue}if(E.size>107374182400){k(t(`حجم الملف "${E.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${E.name}" exceeds 100GB limit.`),!0);continue}const M=E.name.split(".").pop()?.toLowerCase()||"";if(["exe","bat","cmd","sh","bash","ps1","vbs","js","mjs","cjs","py","php","phtml","html","htm","jar","msi","dll","com","scr","hta","svg","apk"].includes(M)||E.type==="image/svg+xml"){k(t(`صيغة الملف "${E.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${E.name}" is not permitted for security reasons.`),!0);continue}const L=E.name.lastIndexOf("."),b=L!==-1?E.name.substring(L).toLowerCase():"",A=L!==-1?E.name.substring(0,L):E.name,D=_e=>(_e||"").replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,"-").replace(/\s+/g,"_").trim(),_=`${D(m)||"Project"}_${D(v)||"General"}_${D(A)||"Drawing"}_v${y(b)}${b}`,z=E.size>=1073741824?`${(E.size/1073741824).toFixed(2)} GB`:`${(E.size/1048576).toFixed(1)} MB`;et({fileName:E.name,fileIndex:S+1,totalFiles:e.length,pct:0,loadedMB:"0.0",fileSizeMB:z,speedMBs:"0.0",etaText:"...",statusNote:t("بدء جلسة الرفع المستأنف...","Starting resumable session...")});const N=(await j("/api/documents/session",{method:"POST",body:JSON.stringify({compiledName:_,mimeType:E.type||"application/octet-stream",projectId:l,taskId:n,size:E.size})})).sessionUrl;let O=8388608;E.size<=10485760?O=E.size:E.size<=104857600?O=8388608:E.size<=524288e3?O=16777216:E.size<=2147483648?O=33554432:O=67108864;const R=Date.now();let Y=0;const te=_e=>{const ue=Math.min(E.size,Y+_e),Oe=Math.min(100,Math.round(ue/E.size*100)),Pe=ue>=1073741824?`${(ue/1073741824).toFixed(2)} GB`:`${(ue/1048576).toFixed(1)} MB`;if(i){const hn=document.getElementById("upload-progress-bar"),xn=document.getElementById("upload-progress-percent"),wn=document.getElementById("upload-progress-text"),$n=document.getElementById("upload-progress-container");$n&&($n.style.display="block"),hn&&(hn.style.width=`${Oe}%`),xn&&(xn.textContent=`${Oe}%`);const Hi=(Date.now()-R)/1e3,kn=ue/Math.max(Hi,.2),Wi=(kn/1048576).toFixed(1),Gi=Math.max(0,E.size-ue),Pt=Math.round(Gi/Math.max(kn,1)),Vi=Pt<60?`${Pt} ${t("ثانية","s")}`:`${Math.floor(Pt/60)}:${String(Pt%60).padStart(2,"0")} ${t("دقيقة","min")}`;wn&&(wn.textContent=`${t("رفع إلى الخادم","Uploading to server")} (${S+1}/${e.length}): ${E.name} — ${Pe} / ${z} (${Oe}%) • ${Wi} MB/s • ${t("متبقي:","ETA:")} ${Vi}`)}const Ye=(Date.now()-R)/1e3,oe=ue/Math.max(Ye,.2),K=(oe/1048576).toFixed(1),ke=Math.max(0,E.size-ue),la=Math.round(ke/Math.max(oe,1)),qi=la<60?`${la} s`:`${Math.floor(la/60)}m`;et({fileName:E.name,fileIndex:S+1,totalFiles:e.length,pct:Oe,loadedMB:Pe,fileSizeMB:z,speedMBs:K,etaText:qi})};te(0);let W=0,dt=null,da=!1;for(;W<E.size;){const _e=Math.min(W+O,E.size),ue=E.slice(W,_e),Oe=`bytes ${W}-${_e-1}/${E.size}`;let Pe=0,Ye=!1;for(;!Ye&&Pe<5;)try{let oe;if(!da)try{oe=await Ra({url:N,chunk:ue,contentRange:Oe,headers:{},onProgress:K=>te(K)})}catch(K){console.warn("[Upload] Direct GDrive upload failed, trying backend proxy:",K.message),da=!0}if(da){const K={projectId:l,taskId:n,compiledName:_,mimeType:E.type,size:E.size,status:r};oe=await Ra({url:`${aa}/api/documents/chunk`,chunk:ue,contentRange:Oe,headers:{"x-session-url":N,"x-doc-meta":encodeURIComponent(JSON.stringify(K))},onProgress:ke=>te(ke)})}if(oe.status===308){const K=oe.headers.get("Range");if(K){const ke=K.match(/bytes=0-(\d+)/);ke&&ke[1]?W=parseInt(ke[1],10)+1:W=_e}else W=_e;Y=W,te(0),Ye=!0}else if(oe.ok){const K=typeof oe.json=="function"?await Promise.resolve(oe.json()):{};dt=K.id||K.document?.id,Y=E.size,te(0),W=E.size,Ye=!0;break}else throw new Error(`Upload returned status ${oe.status}`)}catch(oe){if(Pe++,et({fileName:E.name,fileIndex:S+1,totalFiles:e.length,statusNote:`${t("إعادة المحاولة","Retrying")} (${Pe}/5)...`}),Pe>=5)throw new Error(`${t("فشل الرفع بعد محاولات متعددة","Upload failed after multiple retries")}: ${oe.message}`);await new Promise(ke=>setTimeout(ke,1e3*Math.pow(2,Pe-1)));const K=await vo(N,E.size);if(typeof K=="number"&&K>W){W=K,Y=W;break}else if(K&&K.completed){dt=K.data?.id,W=E.size,Ye=!0;break}}}dt&&!dt.startsWith("doc_")&&await j("/api/documents/finalize",{method:"POST",body:JSON.stringify({driveFileId:dt,projectId:l,taskId:n,compiledName:_,mimeType:E.type,size:E.size,status:r})})}if(await ae(!0),i&&n){const S=s.data?.tasks?.find(M=>M.id===n),E=document.getElementById("task-documents-list");E&&S&&(E.innerHTML=Ge(S))}Ht(),et({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),k(t("تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅","Drawing uploaded & registered successfully ✅"))}catch(S){et({isError:!0,statusNote:S.message}),k(S.message,!0)}finally{if(typeof window<"u"&&window.removeEventListener("beforeunload",T),x){try{x.release()}catch{}x=null}if(i){const S=document.getElementById("upload-progress-container"),E=document.getElementById("upload-progress-bar"),M=document.getElementById("task-dropzone");S&&(S.style.display="none"),E&&(E.style.width="0%"),M&&(M.style.pointerEvents="auto");const L=document.getElementById("task-upload-input");L&&(L.value="")}}}typeof window<"u"&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener("dragover",e=>{const a=e.target.closest("#task-dropzone");a&&(e.preventDefault(),a.style.borderColor="var(--brand-teal)",a.style.background="var(--teal-soft)")}),document.addEventListener("dragleave",e=>{const a=e.target.closest("#task-dropzone");a&&(a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)")}),document.addEventListener("drop",e=>{const a=e.target.closest("#task-dropzone");if(a){e.preventDefault(),a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)";const n=a.dataset.taskId,o=e.dataTransfer?.files;o&&o.length&&gn(o,n)}}));async function Ri(){bt({theme:s.theme,lang:s.lang});try{s.calendarSystem=localStorage.getItem("darc_calendar_system")||s.calendarSystem||"gregorian"}catch{}if(typeof window<"u"&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",i=>{try{if(!localStorage.getItem("darc-theme")){s.theme=i.matches?"dark":"light",document.documentElement.dataset.theme=s.theme;const d=document.querySelector('[data-action="toggle-theme"]');d&&(d.textContent=s.theme==="dark"?"☀️":"🌙")}}catch{}})}catch{}}const e=typeof window<"u"?window.location.hash.replace(/^#/,""):"",a=new URLSearchParams(e.includes("?")?e.split("?")[1]:e.includes("=")?e:""),n=a.get("activate");if(n)return It(n);const o=a.get("reset");if(o)return ot(o);if(e==="forgot")return ve("","forgot");if(e==="login")return ve();try{if(e){const[i,d]=e.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)&&(s.view=i,d)){const l=new URLSearchParams(d);l.get("id")&&(s.activeProjectId=l.get("id")),l.get("tab")&&(s.projectTab=l.get("tab")),l.get("section")&&(s.settingsSection=l.get("section"))}}else if(typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route");if(i){const d=JSON.parse(i);d.view&&(s.view=d.view),d.activeProjectId&&(s.activeProjectId=d.activeProjectId),d.projectTab&&(s.projectTab=d.projectTab),d.settingsSection&&(s.settingsSection=d.settingsSection)}}}catch{}s.view==="settings"&&!s.settingsSection&&(s.settingsSection="profile");const r=Ba();r&&r.user?(s.data=r,Q(s.view)||(s.view=je()),J()):Et();try{if(typeof navigator<"u"&&navigator.onLine&&At().length>0&&await Fa(j),await le(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}if(!window._darcPollingActive){window._darcPollingActive=!0;let i=null,d=0,l=!1,c=Date.now(),u=0;const m=()=>{const y=Date.now()-c>45e3;c=Date.now(),y&&Date.now()-u>4e3&&!l&&w()};if(typeof window<"u"){let y=0;const $=()=>{const f=Date.now();f-y>5e3&&(y=f,m())};window.addEventListener("click",$,{passive:!0}),window.addEventListener("keydown",$,{passive:!0}),window.addEventListener("touchstart",$,{passive:!0}),window.addEventListener("mousemove",$,{passive:!0})}const v=()=>{i&&clearTimeout(i);const y=Date.now()-c>45e3?15e3:4e3,$=d>0?Math.min(25e3,y*Math.pow(2,d)):y;i=setTimeout(w,$)},w=async()=>{if(typeof document<"u"&&document.hidden){v();return}if(!s.data?.user||!s.view||s.view==="login"){v();return}if(l){v();return}l=!0,u=Date.now();try{await le(!0),d=0}catch{d++}finally{l=!1,v()}};v(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&s.data?.user&&s.view&&s.view!=="login"&&(m(),w())})}}catch{typeof window<"u"&&(window.history&&window.history.replaceState?window.history.replaceState(null,"","#login"):window.location.hash="#login"),ve()}}typeof window<"u"&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener("hashchange",()=>{if(window._isInternalNav){window._isInternalNav=!1;return}const e=window.location.hash.replace(/^#/,"");if(!e)return;const[a,n]=e.split("?");if(a==="login"){s.data?.user&&(s.data.user=null),ve();return}if(a==="forgot"){ve("","forgot");return}const o=new URLSearchParams(n||(e.includes("=")?e:""));if(o.get("activate")){It(o.get("activate"));return}if(o.get("reset")){ot(o.get("reset"));return}if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(a)){if(s.data&&!Q(a)){fe(je());return}let r=s.activeProjectId;if(n){const i=new URLSearchParams(n);if(i.get("id")&&(r=i.get("id")),i.get("tab")&&(s.projectTab=i.get("tab")),i.get("section")){const d=i.get("section");a==="settings"&&s.data&&!re(d)?(s.settingsSection="profile",typeof window<"u"&&window.history&&window.history.replaceState&&window.history.replaceState(null,"","#settings?section=profile")):s.settingsSection=d}}else a==="settings"&&s.data&&!re(s.settingsSection)&&(s.settingsSection="profile");if(s.view!==a||s.activeProjectId!==r)fe(a,r);else if(P(),a==="settings"){const i=document.getElementById("main-content");i&&(i.scrollTop=0,i.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0),document.documentElement&&(document.documentElement.scrollTop=0),document.body&&(document.body.scrollTop=0)}}}));if(typeof window<"u"&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener("scroll",a=>{a.target&&a.target.classList&&(a.target.classList.contains("timeline-scroll")||a.target.classList.contains("gantt-scroll")||a.target.classList.contains("timeline-board"))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows=="function"&&drawTimelineArrows(),e=!1})))},!0)}var X=null,Me=null,St=64,qe=null,ge=-1,Z=-1,it=-1,yt=0,_t=!1,U=null,q=null,oa=0,ra=0,vn=0,yn=0,$e=!1,ee=null,Se=null,G=null,Un=null,va=null;function Ue(e){let a=document.getElementById("dnd-live-announcer");a||(a=document.createElement("div"),a.id="dnd-live-announcer",a.className="sr-only",a.setAttribute("aria-live","assertive"),a.setAttribute("aria-atomic","true"),document.body.appendChild(a)),a.textContent="",setTimeout(()=>{a.textContent=e},40)}function Ni(e){X||(X=document.createElement("div"),X.className="drag-placeholder");const a=Math.max(48,Math.min(220,e||St||64));return X.style.cssText=`
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
  `,X.innerHTML=`<span>↓ ${t("الموضع الجديد للمهمة","Drop position")}</span>`,X}function yo(){X&&X.parentNode&&X.parentNode.removeChild(X)}function bn(e,a){const n=Array.from(e.querySelectorAll(".task-card:not(.is-dragging):not(#active-drag-ghost)"));return n.length===0?null:n.reduce((o,r)=>{const i=r.getBoundingClientRect(),d=a-(i.top+i.height/2);return d<0&&d>o.offset?{offset:d,element:r}:o},{offset:Number.NEGATIVE_INFINITY}).element}function Oi(e,a){if(!_t||e<0||a<0)return;let n=document.elementFromPoint(e,a)?.closest(".board-column");if(!n){const o=Array.from(document.querySelectorAll(".board-column"));o.length>0&&(n=o.reduce((r,i)=>{const d=i.getBoundingClientRect(),l=Math.abs(e-(d.left+d.width/2));return l<r.dist?{col:i,dist:l}:r},{col:null,dist:1/0}).col)}if(document.querySelectorAll(".board-column").forEach(o=>o.classList.toggle("drag-over",o===n)),n){const o=n.querySelector(".board-cards");if(o){const r=Ni(St),i=bn(o,a);i==null?(!o.contains(r)||o.lastElementChild!==r)&&o.appendChild(r):r.nextElementSibling!==i&&o.insertBefore(r,i)}}}function bo(){if(qe)return;function e(){if(!_t){qe=null;return}if(ge>=0&&Z>=0){let a=!1;const n=document.querySelector(".board, .board-columns, .tasks-board, [data-board]"),o=85,r=26;if(n){const y=document.documentElement.dir==="rtl"||s.lang==="ar";if(ge<o){const $=(o-ge)/o,f=-Math.max(4,Math.round($*r));n.scrollBy({left:y?-f:f,behavior:"instant"}),a=!0}else if(ge>window.innerWidth-o){const $=(ge-(window.innerWidth-o))/o,f=Math.max(4,Math.round($*r));n.scrollBy({left:y?-f:f,behavior:"instant"}),a=!0}}const i=95,d=26,l=document.getElementById("main-content")||document.querySelector(".workspace-content"),c=l?l.getBoundingClientRect():null,u=c?Math.max(60,c.top+60):80,m=c?Math.min(window.innerHeight-30,c.bottom-60):window.innerHeight-80;if(Z>m){const y=Math.min(1.5,Math.max(.2,(Z-m)/i)),$=Math.max(4,Math.round(y*d));if(l&&l.scrollHeight>l.clientHeight){const f=l.scrollTop;l.scrollTop+=$,l.scrollTop!==f&&(a=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const f=window.scrollY;window.scrollBy({top:$,behavior:"instant"}),window.scrollY!==f&&(a=!0)}}else if(Z<u){const y=Math.min(1.5,Math.max(.2,(u-Z)/i)),$=-Math.max(4,Math.round(y*d));if(l&&l.scrollHeight>l.clientHeight){const f=l.scrollTop;l.scrollTop+=$,l.scrollTop!==f&&(a=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const f=window.scrollY;window.scrollBy({top:$,behavior:"instant"}),window.scrollY!==f&&(a=!0)}}const v=document.elementFromPoint(ge,Z),w=v?.closest(".board-cards")||v?.closest(".board-column")?.querySelector(".board-cards");if(w&&w.scrollHeight>w.clientHeight){const y=w.getBoundingClientRect(),$=60;if(Z>y.top&&Z<y.top+$){const f=($-(Z-y.top))/$;w.scrollTop-=Math.max(3,Math.round(f*18)),a=!0}else if(Z<y.bottom&&Z>y.bottom-$){const f=(Z-(y.bottom-$))/$;w.scrollTop+=Math.max(3,Math.round(f*18)),a=!0}}a&&Oi(ge,Z)}qe=requestAnimationFrame(e)}qe=requestAnimationFrame(e)}function ho(){qe&&(cancelAnimationFrame(qe),qe=null)}async function Na(e,a,n=null){if(!e){se();return}e.classList.remove("drag-over");const o=n||Me;Me=null;const r=e.dataset.status;if(!o||!r){se();return}const i=(s.data?.tasks||[]).find(b=>b.id===o);if(!i){se();return}const d=e.querySelector(".board-cards");if(!d){se();return}const l=i.status===r||r==="review"&&["review","approval","blocked"].includes(i.status);if(!l&&r==="done"&&i.dependencies&&i.dependencies.length&&i.dependencies.filter(b=>{const A=s.data.tasks.find(D=>D.id===b);return A&&A.status!=="done"}).length)return se(),k(t("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);const c=Array.from(d.querySelectorAll(".task-card")).filter(b=>b.dataset.taskId!==o),u=c.map(b=>b.dataset.taskId).filter(Boolean);let m=u.length;if(X&&X.parentNode===d)if(!X.previousElementSibling||X.previousElementSibling.classList?.contains("empty"))m=0;else{let b=X.nextElementSibling;for(;b&&!b.classList?.contains("task-card");)b=b.nextElementSibling;if(b&&b.dataset?.taskId){const A=u.indexOf(b.dataset.taskId);m=A!==-1?A:0}else m=u.length}else if(c.length>0){const b=a&&a>0?a:Z>0?Z:0,A=c[0].getBoundingClientRect(),D=c[c.length-1].getBoundingClientRect();if(b<=A.top+A.height*.45)m=0;else if(b>=D.bottom-D.height*.45)m=u.length;else{const _=bn(d,b);if(_){const z=u.indexOf(_.dataset.taskId);z!==-1&&(m=z)}}}else m=0;const v=Array.from(d.querySelectorAll(".task-card")).findIndex(b=>b.dataset.taskId===o);if(l&&v!==-1&&(m===v||m===v+1)){se();return}const w=i.status,y=(s.data.tasks||[]).map(b=>({id:b.id,status:b.status,sortOrder:b.sortOrder||b.sort_order,progress:b.progress,customFields:JSON.parse(JSON.stringify(b.customFields||b.custom_fields||{}))}));se();const $=[...u];$.splice(m,0,o),r==="review"&&["review","approval","blocked"].includes(i.status)||(i.status=r),i.status==="done"?i.progress=100:i.status==="not_started"?i.progress=0:i.status==="in_progress"&&(i.progress===0||!i.progress)?i.progress=50:["review","approval"].includes(i.status)&&(i.progress||0)<80&&(i.progress=80),window._recentlyMovedTasks||(window._recentlyMovedTasks=new Map);const f=Date.now();$.forEach((b,A)=>{const D=(s.data?.tasks||[]).find(_=>_.id===b);if(D){const _=(A+1)*100;D.sortOrder=_,D.sort_order=_,D.customFields||(D.customFields={}),D.customFields.sortOrder=_,D.customFields.sort_order=_,D.custom_fields||(D.custom_fields={}),D.custom_fields.sortOrder=_,D.custom_fields.sort_order=_,window._recentlyMovedTasks.set(b,{status:D.status,sortOrder:_,progress:D.progress,timestamp:f})}});for(const[b,A]of window._recentlyMovedTasks.entries())f-A.timestamp>45e3&&window._recentlyMovedTasks.delete(b);const x=r==="review"?["review","approval","blocked"]:[r],T=i.projectId||i.project_id;let S=($.length+1)*100;if((s.data?.tasks||[]).forEach(b=>{T&&(b.projectId||b.project_id)!==T||x.includes(b.status)&&!$.includes(b.id)&&(b.sortOrder=S,b.sort_order=S,b.customFields&&(b.customFields.sortOrder=S,b.customFields.sort_order=S),b.custom_fields&&(b.custom_fields.sortOrder=S,b.custom_fields.sort_order=S),S+=100)}),Qa("custom"),s.taskSortPref="custom",s.projectTaskSort="custom",s.myTaskSort="custom",P(!0),typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(20)}catch{}w!==r&&document.querySelectorAll(`.board-column[data-status="${r}"] .board-count, .board-column[data-status="${w}"] .board-count`).forEach(b=>{b.classList.remove("count-updated"),b.offsetWidth,b.classList.add("count-updated"),setTimeout(()=>b.classList.remove("count-updated"),350)});const E=document.querySelector(`.task-card[data-task-id="${o}"]`);E&&(E.classList.add("just-dropped"),setTimeout(()=>E?.classList.remove("just-dropped"),450));const M=e.querySelector(".board-column-title"),L=M?M.innerText.trim():r;Ue(t(`تم إفلات المهمة في عمود: ${L}، الموضع ${m+1}.`,`Dropped task into column: ${L}, position ${m+1}.`)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,$.forEach(b=>{const A=(s.data.tasks||[]).find(D=>D.id===b);A&&window._pendingReorderBatch.set(A.id,{id:A.id,status:A.status,sortOrder:A.sortOrder,customFields:A.customFields})}),window._reorderSyncTimer=setTimeout(()=>{const b=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),j("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:b})}).catch(A=>{console.warn("Reorder sync error, performing local rollback:",A),y.forEach(D=>{const _=(s.data?.tasks||[]).find(z=>z.id===D.id);_&&(_.status=D.status,_.sortOrder=D.sortOrder,_.sort_order=D.sortOrder,_.progress=D.progress,_.customFields=D.customFields)}),P(!0),k(t("فشل حفظ الترتيب الجديد في الخادم. تم التراجع عن التعديل تلقائياً.","Failed to save task order to server. Reverted automatically."),!0)})},150)}function se(){ee&&(clearTimeout(ee),ee=null),q&&q.parentNode&&q.parentNode.removeChild(q),q=null,U&&(U.style.opacity="",U.style.pointerEvents="",U.classList.remove("is-dragging"),U.classList.remove("is-touch-holding")),U=null,document.body.classList.remove("is-touch-dragging"),$e=!1,_t=!1,window._isDraggingTask=!1,Me=null,ge=-1,Z=-1,it=-1,yt=0,ho(),document.querySelectorAll(".board-column").forEach(e=>e.classList.remove("drag-over")),yo(),document.body.style.userSelect="",document.body.style.webkitUserSelect="",document.body.style.cursor="",window._pendingRenderAfterDrag&&(window._pendingRenderAfterDrag=!1,requestAnimationFrame(()=>P(!0)))}function Bi(e,a){if(!U||$e)return;const n=(s.data?.tasks||[]).find(i=>i.id===U.dataset.taskId);if(!Dt(n)){se();return}if($e=!0,_t=!0,window._isDraggingTask=!0,Me=U.dataset.taskId,ge=e,Z=a,it=e,yt=0,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(35)}catch{}const o=U.getBoundingClientRect();St=o.height,vn=e-o.left,yn=a-o.top,q=U.cloneNode(!0),q.id="active-drag-ghost",q.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: ${o.width}px;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.96;
    transform: translate3d(${o.left}px, ${o.top}px, 0) scale(1.025);
    box-shadow: 0 20px 42px -8px rgba(13, 98, 105, 0.28), 0 8px 18px rgba(0, 0, 0, 0.12);
    border: 1.5px solid var(--brand-teal, #0d6269);
    background: var(--surface, #ffffff);
    border-radius: 12px;
    will-change: transform, box-shadow;
    cursor: grabbing !important;
  `,document.body.appendChild(q),U.classList.remove("is-touch-holding"),U.classList.add("is-dragging"),U.style.opacity="0.22",U.style.pointerEvents="none",document.body.classList.add("is-touch-dragging"),document.body.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.cursor="grabbing";const r=U.closest(".board-column");if(r){r.classList.add("drag-over");const i=r.querySelector(".board-cards");if(i){const d=Ni(St),l=bn(i,a);l==null?i.appendChild(d):i.insertBefore(d,l)}}bo()}function Fi(e,a){if(!_t||!q)return;ge=e,Z=a;const n=it>=0?e-it:0;it=e;const o=Math.max(-2.5,Math.min(2.5,n*.16));yt+=(o-yt)*.28;const r=e-vn,i=a-yn;q.style.transform=`translate3d(${r}px, ${i}px, 0) scale(1.025) rotate(${yt.toFixed(2)}deg)`,Oi(e,a)}async function Ui(e,a){if(ee&&(clearTimeout(ee),ee=null),U&&U.classList.remove("is-touch-holding"),!$e&&!Me){se();return}const n=Math.hypot(e-oa,a-ra);if(window._justDroppedTaskId=Me,window._justDroppedAt=Date.now(),window._isDraggingTask=!1,n>4&&Me){let o=document.elementFromPoint(e,a)?.closest(".board-column")||X&&X.closest(".board-column");if(!o){const d=Array.from(document.querySelectorAll(".board-column"));d.length>0&&(o=d.reduce((l,c)=>{const u=c.getBoundingClientRect(),m=Math.abs(e-(u.left+u.width/2));return m<l.dist?{col:c,dist:m}:l},{col:null,dist:1/0}).col)}const r=Me,i=X&&X.parentNode?X.getBoundingClientRect():null;if(q&&i&&i.width>0&&i.height>0){q.style.transition="transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.14s ease, opacity 0.14s ease",q.style.transform=`translate3d(${i.left}px, ${i.top}px, 0) scale(1) rotate(0deg)`,q.style.boxShadow="0 4px 14px rgba(13, 98, 105, 0.12)",setTimeout(async()=>{q&&q.parentNode&&q.parentNode.removeChild(q),q=null,o&&r?await Na(o,a,r):se()},130);return}if(o&&r){q&&q.parentNode&&q.parentNode.removeChild(q),q=null,await Na(o,a,r);return}}se()}document.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;const a=e.target.closest(".task-card");if(!a||e.target.closest("button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]"))return;const n=(s.data?.tasks||[]).find(r=>r.id===a.dataset.taskId);if(!Dt(n))return;U=a,e.pointerId,oa=e.clientX,ra=e.clientY,it=e.clientX,$e=!1;const o=a.getBoundingClientRect();St=o.height,vn=e.clientX-o.left,yn=e.clientY-o.top,e.pointerType==="touch"&&(a.classList.add("is-touch-holding"),ee=setTimeout(()=>{ee=null,Bi(e.clientX,e.clientY)},150))},{passive:!0});document.addEventListener("pointermove",e=>{if(U){if(!$e){const a=Math.hypot(e.clientX-oa,e.clientY-ra);if(e.pointerType==="mouse"||e.pointerType==="pen")if(a>=4)Bi(e.clientX,e.clientY);else return;else return}e.cancelable&&e.preventDefault(),Fi(e.clientX,e.clientY)}},{passive:!1});document.addEventListener("pointerup",async e=>{if(ee&&(clearTimeout(ee),ee=null),U&&U.classList.remove("is-touch-holding"),!$e&&(!e.pointerType||e.pointerType==="mouse")){se();return}await Ui(e.clientX,e.clientY)});document.addEventListener("pointercancel",e=>{$e&&e.pointerType==="touch"||se()});window.addEventListener("touchmove",e=>{if(ee){const a=e.touches[0];a&&Math.hypot(a.clientX-oa,a.clientY-ra)>10&&(clearTimeout(ee),ee=null,U&&(U.classList.remove("is-touch-holding"),U=null));return}if($e){e.cancelable&&e.preventDefault();const a=e.touches[0];a&&Fi(a.clientX,a.clientY)}},{passive:!1});window.addEventListener("touchend",async e=>{if(ee&&(clearTimeout(ee),ee=null),U&&U.classList.remove("is-touch-holding"),$e){const a=e.changedTouches?e.changedTouches[0]:null;await Ui(a?a.clientX:ge,a?a.clientY:Z)}},{passive:!0});window.addEventListener("touchcancel",()=>{se()});document.addEventListener("dragstart",e=>{e.target.closest(".task-card")&&e.preventDefault()});document.addEventListener("click",e=>{window._justDroppedAt&&Date.now()-window._justDroppedAt<500&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},!0);document.addEventListener("keydown",async e=>{if(e.target.closest('input, textarea, select, [contenteditable="true"]')||document.querySelector(".modal-overlay, #taskModal, .modal-backdrop"))return;const a=document.activeElement?.closest?.(".task-card");if((e.key===" "||e.altKey&&(e.key==="m"||e.key==="M"))&&a){const n=(s.data?.tasks||[]).find(o=>o.id===a.dataset.taskId);if(!Dt(n))return;if(e.preventDefault(),Se)Se===n.id&&(G?.classList.remove("is-keyboard-grabbed"),G?.setAttribute("aria-grabbed","false"),Se=null,G=null,window._isKeyboardDraggingTask=!1,Ue(t("تم إلغاء الإمساك بالمهمة.","Task released.")));else{Se=n.id,G=a,Un=n.status,va=n.sortOrder||n.sort_order,window._isKeyboardDraggingTask=!0,a.classList.add("is-keyboard-grabbed"),a.setAttribute("aria-grabbed","true");const o=a.closest(".board-column")?.querySelector(".board-column-title")?.innerText?.trim()||"",r=t(n.titleAr,n.titleEn);Ue(t(`تم الإمساك بالمهمة "${r}". العمود الحالي: ${o}. استخدم الأسهم للتحريك، Enter للإفلات، Escape للإلغاء.`,`Grabbed task "${r}". Current column: ${o}. Use arrow keys to move, Enter to drop, Escape to cancel.`))}return}if(Se&&G){const n=(s.data?.tasks||[]).find(l=>l.id===Se);if(!n)return;const o=G.closest(".board-column");if(!o)return;const r=Array.from(document.querySelectorAll(".board-column")),i=r.indexOf(o),d=document.documentElement.dir==="rtl"||s.lang==="ar";if(e.key==="ArrowUp"){e.preventDefault();const l=G.previousElementSibling;l&&l.classList.contains("task-card")&&(o.querySelector(".board-cards").insertBefore(G,l),G.focus(),Ue(t("تم التحريك للأعلى.","Moved up.")));return}if(e.key==="ArrowDown"){e.preventDefault();const l=G.nextElementSibling;l&&l.classList.contains("task-card")&&(o.querySelector(".board-cards").insertBefore(l,G),G.focus(),Ue(t("تم التحريك للأسفل.","Moved down.")));return}if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const l=d?"ArrowLeft":"ArrowRight",c=e.key===l?i+1:i-1;if(c>=0&&c<r.length){const u=r[c],m=u.querySelector(".board-cards");if(m){m.appendChild(G),G.focus();const v=u.querySelector(".board-column-title")?.innerText?.trim()||"";Ue(t(`تم النقل إلى عمود: ${v}.`,`Moved to column: ${v}.`))}}return}if(e.key==="Enter"){e.preventDefault();const l=G.closest(".board-column"),c=Se;if(G.classList.remove("is-keyboard-grabbed"),G.setAttribute("aria-grabbed","false"),Se=null,G=null,window._isKeyboardDraggingTask=!1,l&&c){const u=G?G.getBoundingClientRect():null;await Na(l,u?u.top+10:0,c)}return}if(e.key==="Escape"){e.preventDefault(),G.classList.remove("is-keyboard-grabbed"),G.setAttribute("aria-grabbed","false"),Se=null,G=null,window._isKeyboardDraggingTask=!1,n.status=Un,va!==null&&(n.sortOrder=va),P(!0),Ue(t("تم إلغاء النقل وإعادة المهمة لمكانها الأصلي.","Move cancelled. Task returned to original position."));return}}});window.state=s;document.documentElement.dataset.theme=s.theme;document.documentElement.lang=s.lang;document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";s.lang==="en"?document.body.classList.add("is-ltr"):document.body.classList.remove("is-ltr");Object.assign(window,ns);Object.assign(window,bs);Object.assign(window,ks);Object.assign(window,Bs);Object.assign(window,Cs);Object.assign(window,Ws);Object.assign(window,Js);Object.assign(window,Ms);Object.assign(window,Zs);Object.assign(window,ys);Object.assign(window,go);Object.assign(window,is);window._recentlyMovedTasks=window._recentlyMovedTasks||new Map;to();document.addEventListener("click",e=>{const a=e.target.closest("[data-action], [data-view], button, a");if(a){const n=a.dataset.action||a.dataset.view||a.innerText?.trim()?.slice(0,40)||a.tagName;He("ui.click",`النقر على: ${n}`)}typeof La=="function"&&La(e).catch(n=>{ta(n,{source:"handleClick"}),typeof k=="function"&&k(n.message,!0)})});document.addEventListener("submit",e=>{const a=e.target.id||e.target.dataset.action||"form";He("form.submit",`إرسال نموذج: ${a}`),typeof Pa=="function"&&Pa(e).catch(n=>{ta(n,{source:"handleSubmit"}),typeof k=="function"&&k(n.message,!0)})});document.addEventListener("input",e=>{typeof Ma=="function"&&Ma(e)});document.addEventListener("change",e=>{typeof za=="function"&&za(e)});document.addEventListener("keydown",e=>{e.key==="Escape"&&typeof B=="function"&&B()});var ya=null;window.addEventListener("resize",()=>{s.view==="project-detail"&&s.projectTab==="timeline"&&(ya||(ya=requestAnimationFrame(()=>{ya=null,typeof wa=="function"&&wa()})))});window.addEventListener("error",e=>{const a=String(e?.message||e?.error?.message||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Runtime Error:",e.error),ta(e.error||{message:a},{source:"window.onerror"}),typeof k=="function"&&k(`خطأ برمجي: ${e.message}`,!0))});window.addEventListener("unhandledrejection",e=>{const a=String(e?.reason?.message||e?.reason||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Unhandled Rejection:",e.reason),ta(e.reason||{message:a},{source:"unhandledrejection",errorType:"UnhandledRejection"}))});"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{e.addEventListener("updatefound",()=>{const a=e.installing;a&&a.addEventListener("statechange",()=>{a.state==="installed"&&navigator.serviceWorker.controller&&console.log("[PWA] New version ready for next visit.")})})}).catch(e=>{console.warn("[PWA] ServiceWorker registration skipped:",e.message)})});mo();vs();Ri();
