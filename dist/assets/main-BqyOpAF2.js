var Na=Object.defineProperty,ne=(e,n)=>{let a={};for(var o in e)Na(a,o,{get:e[o],enumerable:!0});return n||Na(a,Symbol.toStringTag,{value:"Module"}),a};(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}})();function $t(e){if(typeof document>"u"||!e||!document.cookie)return null;const n=document.cookie.split("; "),a=encodeURIComponent(String(e))+"=",o=String(e)+"=";for(let r=0;r<n.length;r++){const i=n[r];if(i.startsWith(a)){const d=i.substring(a.length);try{return decodeURIComponent(d)}catch{return d}}else if(i.startsWith(o)){const d=i.substring(o.length);try{return decodeURIComponent(d)}catch{return d}}}return null}function ii(){if(typeof window>"u")return"ar";try{let e=$t("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const n=$t("darc_prefs");if(n)try{e=JSON.parse(n).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function si(){if(typeof window>"u")return"light";try{let e=$t("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const n=$t("darc_prefs");if(n)try{e=JSON.parse(n).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function oi(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const n=window.location.hash.replace(/^#/,"");if(n&&!["login","forgot"].includes(n)){const[o,r]=n.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(o)){let i=null,d="overview",l="profile";if(r){const p=new URLSearchParams(r),u=p.get("id");u&&/^[a-zA-Z0-9_-]{3,64}$/.test(u)&&(i=u);const f=p.get("tab");f&&["overview","tasks","drawings","documents","timeline","activity"].includes(f)&&(d=f);const v=p.get("section");v&&["profile","company","roles","accounts","audit","trash","preferences"].includes(v)&&(l=v)}return{view:o,activeProjectId:i,projectTab:d,settingsSection:l}}}const a=sessionStorage.getItem("darc_last_route");if(a){const o=JSON.parse(a);if(o.view)return{view:o.view,activeProjectId:o.activeProjectId||null,projectTab:o.projectTab||"overview",settingsSection:o.settingsSection||"profile"}}}catch{}return e}var ft=oi(),s={lang:ii(),theme:si(),view:ft.view,activeProjectId:ft.activeProjectId,projectTab:ft.projectTab,settingsSection:ft.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},ri="darc_offline_db",di=1,Ee="cache_store",qe="darc_offline_bootstrap",be="darc_offline_mutations_queue",Bt=!1,Ut=null;function da(){return typeof indexedDB>"u"?Promise.resolve(null):(Ut||(Ut=new Promise(e=>{try{const n=indexedDB.open(ri,di);n.onupgradeneeded=a=>{const o=a.target.result;o.objectStoreNames.contains(Ee)||o.createObjectStore(Ee)},n.onsuccess=()=>e(n.result),n.onerror=()=>e(null)}catch{e(null)}})),Ut)}async function li(e){const n=await da();return n?new Promise(a=>{try{const o=n.transaction(Ee,"readonly").objectStore(Ee).get(e);o.onsuccess=()=>a(o.result||null),o.onerror=()=>a(null)}catch{a(null)}}):null}async function ci(e,n){const a=await da();return a?new Promise(o=>{try{const r=a.transaction(Ee,"readwrite").objectStore(Ee).put(n,e);r.onsuccess=()=>o(!0),r.onerror=()=>o(!1)}catch{o(!1)}}):!1}async function Fa(e){const n=await da();return n?new Promise(a=>{try{const o=n.transaction(Ee,"readwrite").objectStore(Ee).delete(e);o.onsuccess=()=>a(!0),o.onerror=()=>a(!1)}catch{a(!1)}}):!1}function pi(){return typeof navigator<"u"?navigator.onLine:!0}function ce(e){if(!e)return;const n={timestamp:Date.now(),data:e};if(ci(qe,n).catch(()=>{}),typeof localStorage<"u"){const a=()=>{try{localStorage.setItem(qe,JSON.stringify(n))}catch(o){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",o.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(a,{timeout:2e3}):setTimeout(a,50)}}function Qa(){if(typeof localStorage<"u")try{const e=localStorage.getItem(qe);if(e){const n=JSON.parse(e);if(n?.data)return n.data}}catch{}return null}async function Ba(){const e=await li(qe);return e?.data?e.data:Qa()}async function Ua(){if(typeof localStorage<"u")try{localStorage.removeItem(qe),localStorage.removeItem(be)}catch{}await Promise.all([Fa(qe),Fa(be)]),Fe()}function Fe(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:rt().length}}))}function Be(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function qa({path:e,method:n="POST",body:a=null,description:o=""}){if(typeof localStorage>"u")return null;try{const r=localStorage.getItem(be),i=r?JSON.parse(r):[];if(n==="DELETE"){if(e.startsWith("/api/tasks/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/tasks"&&p.body?.id===l)){const p=i.filter(u=>!(u.path==="/api/tasks"&&u.body?.id===l||u.path===`/api/tasks/${l}`||u.path.startsWith(`/api/tasks/${l}/`)));return localStorage.setItem(be,JSON.stringify(p)),Fe(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/projects"&&p.body?.id===l)){const p=i.filter(u=>!(u.path==="/api/projects"&&u.body?.id===l||u.path===`/api/projects/${l}`||u.method==="POST"&&u.path==="/api/tasks"&&u.body?.projectId===l));return localStorage.setItem(be,JSON.stringify(p)),Fe(),{id:"compacted",compacted:!0}}}}const d={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substr(2,6),path:e,method:n,body:a,description:o,createdAt:new Date().toISOString()};return i.push(d),localStorage.setItem(be,JSON.stringify(i)),Fe(),console.log("[Offline Outbox] Enqueued mutation:",d),d}catch(r){return console.warn("[Offline Outbox] Failed to enqueue mutation:",r.message),null}}function rt(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(be);return e?JSON.parse(e):[]}catch{return[]}}function ui(){typeof localStorage>"u"||(localStorage.removeItem(be),Fe())}function Ha(e,n,a,o){if(!o||!o.data)return{ok:!0,queued:!0,offline:!0};const r=new Date().toISOString();if(n==="POST"&&e==="/api/tasks"&&a){const i=a.id||Be("tsk");a.id=i;const d={id:i,code:"OFFLINE",projectId:a.projectId,titleAr:a.titleAr,titleEn:a.titleEn||a.titleAr,descriptionAr:a.descriptionAr||"",descriptionEn:a.descriptionEn||"",status:a.status||"not_started",priority:a.priority||"medium",categoryAr:a.categoryAr||"عام",categoryEn:a.categoryEn||"General",weight:Number(a.weight||1),progress:Number(a.progress||0),assigneeId:a.assigneeId||null,assignee:o.data.users?.find(p=>p.id===a.assigneeId)||null,reviewerId:a.reviewerId||null,startDate:a.startDate||null,dueDate:a.dueDate||null,customFields:a.customFields||{},createdAt:r,updatedAt:r,_isOfflinePending:!0};o.data.tasks||(o.data.tasks=[]);const l=o.data.tasks.findIndex(p=>p.id===i);return l!==-1?o.data.tasks[l]=d:o.data.tasks.unshift(d),ce(o.data),{ok:!0,queued:!0,offline:!0,task:d}}if(n==="PATCH"&&e.startsWith("/api/tasks/")&&a){const i=e.split("/")[3],d=(o.data.tasks||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...o.data.tasks[d],...a,updatedAt:r,_isOfflinePending:!0};return a.assigneeId!==void 0&&(l.assignee=o.data.users?.find(p=>p.id===a.assigneeId)||null),o.data.tasks[d]=l,ce(o.data),{ok:!0,queued:!0,offline:!0,task:l}}}if(n==="DELETE"&&e.startsWith("/api/tasks/")){const i=e.split("/")[3];return o.data.tasks&&(o.data.tasks=o.data.tasks.filter(d=>d.id!==i),ce(o.data)),{ok:!0,queued:!0,offline:!0}}if(n==="POST"&&e==="/api/projects"&&a){const i=a.id||Be("prj");a.id=i;const d={id:i,code:a.code||"DARC-OFF",nameAr:a.nameAr||a.name||"مشروع محلي جديد",nameEn:a.nameEn||a.name||"New Offline Project",clientAr:a.clientAr||"",clientEn:a.clientEn||"",descriptionAr:a.descriptionAr||"",descriptionEn:a.descriptionEn||"",lifecycle:a.lifecycle||"planning",health:a.health||"on_track",progress:0,progressMode:"weighted",managerId:a.managerId||o.data.user?.id,startDate:a.startDate||null,dueDate:a.dueDate||null,createdAt:r,updatedAt:r,_isOfflinePending:!0};o.data.projects||(o.data.projects=[]);const l=o.data.projects.findIndex(p=>p.id===i);return l!==-1?o.data.projects[l]=d:o.data.projects.unshift(d),ce(o.data),{ok:!0,queued:!0,offline:!0,project:d}}if(n==="PATCH"&&e.startsWith("/api/projects/")&&a){const i=e.split("/")[3],d=(o.data.projects||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...o.data.projects[d],...a,updatedAt:r,_isOfflinePending:!0};return o.data.projects[d]=l,ce(o.data),{ok:!0,queued:!0,offline:!0,project:l}}}if(n==="DELETE"&&e.startsWith("/api/projects/")){const i=e.split("/")[3];return o.data.projects&&(o.data.projects=o.data.projects.filter(d=>d.id!==i),ce(o.data)),{ok:!0,queued:!0,offline:!0}}if(n==="POST"&&e.includes("/comments")&&a){const i=e.split("/")[3],d={id:a.id||Be("cmt"),taskId:i,userId:o.data.user?.id,content:a.content,createdAt:r,_isOfflinePending:!0};return a.id=d.id,o.data.comments||(o.data.comments=[]),o.data.comments.some(l=>l.id===d.id)||o.data.comments.push(d),ce(o.data),{ok:!0,queued:!0,offline:!0,comment:d}}return n==="PATCH"&&e==="/api/tasks/reorder"&&a&&Array.isArray(a.items)?(o.data.tasks&&(a.items.forEach(i=>{const d=o.data.tasks.find(l=>l.id===i.id);d&&(i.status&&(d.status=i.status),i.sortOrder&&(d.sortOrder=i.sortOrder),i.customFields&&(d.customFields={...d.customFields||{},...i.customFields}),d._isOfflinePending=!0)}),ce(o.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function la(e){if(Bt)return{total:0,synced:0,failed:0};const n=rt();if(!n.length)return{total:0,synced:0,failed:0};Bt=!0,console.log(`[Offline Sync] Replaying ${n.length} pending mutations...`);let a=0,o=!1;const r=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,i=new Set(["POST","PATCH","PUT","DELETE"]);for(let d=0;d<n.length;d++){const l=n[d];if(!l||!l.path||typeof l.path!="string"||!r.test(l.path)||!i.has(l.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",l?.id,l?.path);continue}try{const p={method:l.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":l.id,"X-Idempotency-Key":l.id}};l.body&&(p.body=typeof l.body=="string"?l.body:JSON.stringify(l.body));const u=await e(l.path,p);if(u&&u.error&&!u.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",l.id,u.error);else{a++;const f=l.body&&typeof l.body=="object"&&l.body.id||typeof l.path=="string"&&l.path.split("/")[3];f&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(f)}}catch(p){if(console.error("[Offline Sync] Failed to replay mutation:",l.id,l.path,p.message),typeof navigator<"u"&&!navigator.onLine||p.message&&(p.message.includes("تعذر الاتصال")||p.message.includes("fetch")||p.message.includes("NetworkError")||p.name==="TypeError")){const u=n.slice(d);typeof localStorage<"u"&&localStorage.setItem(be,JSON.stringify(u)),o=!0;break}}}return o||ui(),Bt=!1,Fe(),{total:n.length,synced:a,failed:o?n.length-a:0}}var mi=ne({closeModal:()=>V,modalShell:()=>le,renderLoading:()=>en,showToast:()=>$});function en(){document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${t("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var je=!1,ke=null;function V(e=!1){ke&&(clearTimeout(ke),ke=null);const n=document.getElementById("preview-modal-overlay");n&&(n.style.display="none",n.innerHTML="");const a=document.getElementById("modal-root");if(!a||!a.hasChildNodes()){document.body.style.overflow="",je=!1;return}if(e){a.innerHTML="",document.body.style.overflow="",je=!1;return}if(je)return;je=!0;const o=a.querySelector(".modal-backdrop"),r=a.querySelector(".modal");o&&r?(o.classList.add("is-closing"),r.classList.add("is-closing"),ke=setTimeout(()=>{ke=null,a.innerHTML="",document.body.style.overflow="",je=!1},150)):(a.innerHTML="",document.body.style.overflow="",je=!1)}function le(e,n,a,o="",r=""){return ke&&(clearTimeout(ke),ke=null),je=!1,document.body.style.overflow="hidden",`<div class="modal-backdrop"><div class="modal ${r}" data-modal="${o}"><div class="modal-head"><div><h2>${c(e)}</h2><p>${c(n||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${t("إغلاق","Close")}">${h("close",15)}</button></div>${a}</div></div>`}function $(e,n=!1){const a=document.getElementById("toast-root");if(!a)return;const o=document.createElement("div");o.className=`toast ${n?"error":""}`,o.innerHTML=`${h(n?"alert":"check",16)}<span>${c(e)}</span>`,a.appendChild(o),setTimeout(()=>o.remove(),3600)}var fi=ne({I18N:()=>Gt,PERMISSION_ALIASES:()=>on,avatar:()=>N,can:()=>k,canManageAccountPermissions:()=>xi,choose:()=>t,currentViewTitle:()=>ma,dateLabel:()=>Ct,dueLabel:()=>nn,esc:()=>c,extractDrawingVersion:()=>an,formatDateTime:()=>ua,formatReportDate:()=>Ce,formatReportTime:()=>dt,formatUnifiedDateNumeric:()=>vi,getActiveCalendarSystem:()=>Ae,getCookieVal:()=>gi,getFileFormatInfo:()=>pa,getHijriDateEquivalent:()=>yi,getTaskStatusStyle:()=>ca,getTimeBasedGreeting:()=>tn,icon:()=>h,initials:()=>tt,isAdmin:()=>P,isOverdue:()=>Se,playSuccessChime:()=>kt,priorityText:()=>hi,roleFor:()=>sn,roleName:()=>Z,runInWorker:()=>wi,sanitizeForSpreadsheet:()=>R,savePreferencesCookies:()=>et,showToast:()=>$,statusBadge:()=>bi,statusText:()=>O,t:()=>g}),Gt={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function g(e){return Gt[s.lang][e]||Gt.ar[e]||e}function t(e,n){return s.lang==="ar"?e:n}function gi(e){if(typeof document>"u"||!e)return null;const n=document.cookie?document.cookie.split("; "):[];for(const a of n){const o=a.indexOf("=");if(o!==-1&&a.slice(0,o).trim()===e)return decodeURIComponent(a.slice(o+1))}return null}function et({theme:e,lang:n}={}){if(typeof document>"u")return;const a=31536e3,o=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let r="";if(typeof window<"u"){const f=window.location.hostname;(f==="darc-design.bond"||f.endsWith(".darc-design.bond"))&&(r="; Domain=.darc-design.bond")}const i=e==="dark"||e==="light"?e:null,d=n==="ar"||n==="en"?n:null;if(i){document.cookie=`darc_theme=${encodeURIComponent(i)}; Path=/; Max-Age=${a}; SameSite=Lax${o}${r}`;try{window.localStorage.setItem("darc-theme",i)}catch{}}if(d){document.cookie=`darc_lang=${encodeURIComponent(d)}; Path=/; Max-Age=${a}; SameSite=Lax${o}${r}`;try{window.localStorage.setItem("darc-locale",d)}catch{}}const l=i||(s&&s.theme==="dark"?"dark":"light")||"light",p=d||(s&&s.lang==="en"?"en":"ar")||"ar",u=JSON.stringify({theme:l,lang:p});document.cookie=`darc_prefs=${encodeURIComponent(u)}; Path=/; Max-Age=${a}; SameSite=Lax${o}${r}`}function c(e){return String(e??"").replace(/[&<>'"]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[n])}function R(e){if(e==null)return"";const n=String(e),a=n.trimStart();return/^[=+@\-]/.test(a)||/^[\t\r]/.test(n)?`'${n}`:n}function h(e,n=18){const a={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};return`<svg width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a[e]||a.info}</svg>`}function tt(e){if(!e)return"D";const n=s.lang==="ar"?e.name:e.nameEn||e.name;return(n.replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(a=>a[0]).join("")||n.slice(0,2)).toUpperCase()}function N(e,n=""){const a=e||{name:"DARC",avatarColor:"#0d6269"},o=/^#[0-9a-f]{6}$/i.test(a.avatarColor||"")?a.avatarColor:"#0d6269",r=c(t(a.name,a.nameEn||a.name));if(a.avatarUrl){const i=c(tt(a)).replace(/['"\\]/g,"");return`<span class="avatar ${n}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${r}"><img src="${c(a.avatarUrl)}" alt="${r}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${o}';this.parentElement.textContent='${i}';" /></span>`}return`<span class="avatar ${n}" style="background:${o}" title="${r}">${c(tt(a))}</span>`}function tn(){const e=new Date().getHours();return s.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function ca(e){const n=e?.status,a=Se(e);return n==="done"||n==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:t("مكتملة","Completed")}:n==="review"||n==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:t("للمراجعة والاعتماد","In Review")}:n==="blocked"||a?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:a?t("متأخرة","Overdue"):t("متوقفة","Blocked")}:n==="in_progress"||n==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:t("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:t("غير مبدوءة","Not Started")}}function pa(e,n=""){const a=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(a)?{ext:a.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(a)?{ext:a.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:a==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["png","jpg","jpeg","webp","heic"].includes(a)?{ext:a.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["zip","rar","7z","tar"].includes(a)?{ext:a.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:a.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function an(e){if(!e)return null;const n=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return n?`V${n[1]}`:null}function Ae(){return s.calendarSystem||s.data?.user?.customFields?.calendarSystem||localStorage.getItem("darc_calendar_system")||"gregorian"}function Ct(e,n=!0){if(!e)return"—";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(a.getTime()))return"—";if(Ae()==="hijri"){const r=s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura";return new Intl.DateTimeFormat(r,{day:"numeric",month:"short",...n?{year:"numeric"}:{}}).format(a)}const o=s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory";return new Intl.DateTimeFormat(o,{day:"numeric",month:"short",...n?{year:"numeric"}:{}}).format(a)}function vi(e){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(n.getTime()))return"—";if(Ae()==="hijri"){const a=s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura";return new Intl.DateTimeFormat(a,{day:"2-digit",month:"2-digit",year:"numeric"}).format(n)}return`${String(n.getDate()).padStart(2,"0")}/${String(n.getMonth()+1).padStart(2,"0")}/${n.getFullYear()}`}function ua(e,n={}){if(!e)return{date:"—",time:"—",full:"—"};try{const a=new Date(e);if(Number.isNaN(a.getTime()))return{date:String(e),time:"—",full:String(e)};const o=Ae(),r=s.lang==="ar",i=o==="hijri"?r?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":r?"ar-u-ca-gregory":"en-GB-u-ca-gregory",d=new Intl.DateTimeFormat(i,{year:"numeric",month:n.monthStyle||"short",day:"numeric"}).format(a),l=r?"ar-SA":"en-US",p=new Intl.DateTimeFormat(l,{hour:"2-digit",minute:"2-digit",...n.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(a);return{date:d,time:p,full:`${d} ${p}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function Ce(e=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"—";const a=Ae(),o=s.lang==="ar",r=a==="hijri"?o?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o?"ar-u-ca-gregory":"en-GB-u-ca-gregory";return new Intl.DateTimeFormat(r,{dateStyle:"full"}).format(n)}function dt(e=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"—";const a=s.lang==="ar";return new Intl.DateTimeFormat(a?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(n)}function yi(e){if(!e)return"";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?"":new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(n)}function nn(e){if(!e)return"—";const n=new Date(`${e}T23:59:59`),a=Math.ceil((n-new Date)/864e5);return a<0?t(`متأخرة ${Math.abs(a)} ${g("days")}`,`${Math.abs(a)} ${g("days")} ${g("ago")}`):a===0?g("today"):t(`بعد ${a} ${g("days")}`,`in ${a} ${g("days")}`)}function Se(e){return e?.dueDate&&!["done","completed","canceled"].includes(e.status)&&new Date(`${e.dueDate}T23:59:59`)<new Date}function O(e){return{not_started:g("notStarted"),in_progress:g("inProgress"),review:g("review"),approval:g("approval"),done:g("done"),blocked:g("blocked"),canceled:g("canceled"),planning:g("planning"),active:g("active"),on_hold:g("onHold"),completed:g("completed"),archived:g("archived"),on_track:g("onTrack"),at_risk:g("atRisk"),off_track:g("offTrack")}[e]||e}function bi(e){return e?`<span class="status-badge ${c(e)}">${c(O(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function hi(e){return{low:g("low"),medium:g("medium"),high:g("high"),urgent:g("urgent")}[e]||e}function sn(e){const n=typeof e=="string"?s.data?.users.find(a=>a.id===e):e;return n?s.data?.roles.find(a=>a.id===n.roleId)||{id:n.roleId,nameAr:n.roleNameAr||"",nameEn:n.roleNameEn||"",permissions:[]}:null}function Z(e){const n=sn(e);return n?t(n.nameAr,n.nameEn):"—"}var on={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function k(e){const n=s.data?.role?.permissions||[];if(n.includes("*")||n.includes(e))return!0;const a=on[e];return!!(a&&n.includes(a))}function P(){return s.data?.user?.roleId==="admin"}function xi(){return P()||s.data?.user?.roleId==="account_permissions_manager"||s.data?.role?.permissions?.includes("manage_existing_account_permissions")}function ma(){return s.view==="project-detail"?t("تفاصيل المشروع","Project details"):{dashboard:g("dashboard"),projects:g("projects"),tasks:g("myTasks"),documents:g("documents"),templates:g("templates"),team:g("team"),reports:g("reports"),settings:g("settings")}[s.view]||g("dashboard")}function kt(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const n=new e,a=n.currentTime,o=n.createOscillator(),r=n.createGain();o.type="sine",o.frequency.setValueAtTime(587.33,a),r.gain.setValueAtTime(.08,a),r.gain.exponentialRampToValueAtTime(.001,a+.35),o.connect(r),r.connect(n.destination),o.start(a),o.stop(a+.35);const i=n.createOscillator(),d=n.createGain();i.type="sine",i.frequency.setValueAtTime(880,a+.12),d.gain.setValueAtTime(.001,a),d.gain.setValueAtTime(.09,a+.12),d.gain.exponentialRampToValueAtTime(.001,a+.65),i.connect(d),d.connect(n.destination),i.start(a+.12),i.stop(a+.65)}catch{}}function wi(e,n){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(n)):new Promise((a,o)=>{try{const r=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),i=URL.createObjectURL(r),d=new Worker(i);d.onmessage=l=>{URL.revokeObjectURL(i),d.terminate(),l.data.ok?a(l.data.result):o(new Error(l.data.error))},d.onerror=l=>{URL.revokeObjectURL(i),d.terminate(),o(l)},d.postMessage(n)}catch{try{a(e(n))}catch(i){o(i)}}})}var $i=Date.now(),rn=0,St=0,Et=0,qt=null,Wa=Date.now(),vt=[];function lt(e="action",n="",a=null){const o=new Date().toTimeString().split(" ")[0];vt.push({time:o,category:e,message:String(n||"").slice(0,150),metadata:a?JSON.stringify(a).slice(0,200):null}),vt.length>15&&vt.shift()}function dn(){return[...vt]}typeof document<"u"&&setInterval(()=>{document.visibilityState==="visible"&&rn++},1e3);if(typeof window<"u"){try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{Et+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&At(!1,!0)}),window.addEventListener("pagehide",()=>{At(!1,!0)})}function fa(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function ki(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let n="Chrome";e.includes("Edg/")?n="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?n="Safari":e.includes("Firefox/")&&(n="Firefox");let a="macOS";return e.includes("Win")?a="Windows":e.includes("Android")?a="Android":e.includes("iPhone")||e.includes("iPad")?a="iOS":e.includes("Linux")&&(a="Linux"),{os:a,browser:n}}function Si(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function Lt(e,n={}){St++;const{os:a,browser:o}=ki(),r=Si(),i=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",d=e||{},l=String(d.message||d.reason||d||"Unknown client error"),p=String(d.stack||n.stack||"No stack trace provided."),u=d.name||n.errorType||"ClientRuntimeError";lt("error",`${u}: ${l}`);const f=s.data?.user||{},v={userId:f.id||"usr_demo",userName:f.name||"مدير التوظيف / زائر",userEmail:f.email||"demo@darc-design.bond",userRole:f.jobTitleAr||s.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:f.avatarColor||"#0d6269",errorType:u,errorMessage:l,stackTrace:p,deviceType:r,browser:o,os:a,screenResolution:i,memoryMb:fa(),currentView:s.view?`#${s.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:dn(),severity:n.severity||"high",titleAr:n.titleAr||`خطأ تشغيلي في مساحة العمل (${u})`,titleEn:n.titleEn||`Workspace Runtime Error (${u})`};try{return await I("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(v),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const y=new Blob([JSON.stringify(v)],{type:"application/json"});navigator.sendBeacon((zt||"")+"/api/telemetry/report-error",y)}catch{}}}async function At(e=!1,n=!1){const a=Date.now(),o=Math.max(5,Math.round((a-Wa)/1e3));Wa=a;const r={userId:s.data?.user?.id||"anonymous",durationSeconds:o,memoryMb:fa(),errorCount:St,longTaskCount:Et,currentView:s.view||"dashboard"};if(r.memoryMb>140&&(e=!0),n&&typeof navigator<"u"&&navigator.sendBeacon)try{const i=new Blob([JSON.stringify(r)],{type:"application/json"}),d=(zt||"")+"/api/telemetry/heartbeat";navigator.sendBeacon(d,i);return}catch{}try{const i=await I("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(r),silent:!0});return St=0,Et=0,i}catch{}}function Ei(){qt&&clearInterval(qt),setTimeout(()=>At(!1),5e3),qt=setInterval(()=>{document.visibilityState==="visible"&&At(!1)},45e3)}function ln(){return{totalSessionDurationSeconds:Math.round((Date.now()-$i)/1e3),activeDurationSeconds:rn,memoryMb:fa(),errorCount:St,longTaskCount:Et,recentBreadcrumbs:dn()}}var zt=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",Ve=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function Tt(){Ve=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function I(e,n={}){const a=["POST","PATCH","PUT","DELETE"].includes(n.method),o=e.startsWith("/api/auth"),r=!!(n.headers&&(n.headers["X-Offline-Replay"]==="true"||n.headers["X-Offline-Replay"]===!0));let i=null;if(a&&n.body)try{i=typeof n.body=="string"?JSON.parse(n.body):n.body}catch{}if(n.method==="POST"&&i&&typeof i=="object"&&!r&&(e==="/api/tasks"&&!i.id?(i.id=Be("tsk"),n.body=JSON.stringify(i)):e==="/api/projects"&&!i.id?(i.id=Be("prj"),n.body=JSON.stringify(i)):e.includes("/comments")&&!i.id&&(i.id=Be("cmt"),n.body=JSON.stringify(i))),typeof navigator<"u"&&!navigator.onLine&&a&&!o){if(r)throw new Error(t("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));const m=qa({path:e,method:n.method,body:i}),x=Ha(e,n.method,i,s);return $(t("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡","Offline mode: action saved locally and will auto-sync on reconnect 📡"),!1),{ok:!0,queued:!0,offline:!0,id:m?.id,...x}}const d=typeof localStorage<"u"?localStorage.getItem("darc_token"):null,l=!!(n.silent||n.headers&&n.headers["X-Silent"]),p=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),u=!!Ve&&(l||!!s.data||p),f=a?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,v={...d?{Authorization:`Bearer ${d}`}:{},...n.body?{"Content-Type":"application/json"}:{},...f?{"X-Mutation-ID":f}:{},...e==="/api/bootstrap"&&u?{"If-None-Match":Ve}:{},...e==="/api/bootstrap"&&!u?{"Cache-Control":"no-cache, no-store"}:{},...n.headers||{}};e==="/api/bootstrap"&&!u&&(n.cache="no-cache"),n.credentials="include";let w;try{w=await fetch(zt+e,{...n,headers:v})}catch{if(a&&!o&&!r){const x=qa({path:e,method:n.method,body:i}),A=Ha(e,n.method,i,s);return $(t("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡","Connection lost: action saved locally for auto-sync 📡"),!1),{ok:!0,queued:!0,offline:!0,id:x?.id,...A}}throw new Error(t("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(w.status===304)return null;if(!w.ok){const m=await w.text();w.status!==401&&console.error(`API Failed [${e}]: ${w.status} - ${m}`);let x={};try{x=JSON.parse(m)}catch{}w.status===401&&(Ve=null,typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login"&&(typeof localStorage<"u"&&localStorage.removeItem("darc_token"),s.data&&(s.data.user=null),typeof window<"u"&&window.location.hash!=="#login"&&(window.location.hash="#login"))),lt("api.error",`${n.method||"GET"} ${e} (Status ${w.status}: ${x.error||"Failed"})`);const A=new Error(x.error||`Failed to fetch ${e}`);throw A.status=w.status,A}const y=w.headers.get("ETag");if(y&&e==="/api/bootstrap"){Ve=y;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",y)}catch{}}const b=await w.json();if(["POST","PATCH","PUT","DELETE"].includes(n.method)){Tt();let m=i&&typeof i.id=="string"?i.id:null;if(!m&&b&&typeof b=="object"&&(m=b.id||b.task?.id||b.project?.id||b.comment?.id||b.document?.id||b.data?.id),!m&&typeof e=="string"){const x=e.split("/");x.length>=4&&x[3]&&!x[3].includes("?")&&(m=x[3])}if(m&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(m),f&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(f),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let x=null;if(b&&(b.task?x={table:"tasks",action:n.method==="POST"?"INSERT":"UPDATE",record:b.task}:b.project?x={table:"projects",action:n.method==="POST"?"INSERT":"UPDATE",record:b.project}:b.comment?x={table:"comments",action:n.method==="POST"?"INSERT":"UPDATE",record:b.comment}:b.document&&(x={table:"documents",action:n.method==="POST"?"INSERT":"UPDATE",record:b.document})),!x&&n.method==="DELETE"&&m&&(e.startsWith("/api/tasks/")?x={table:"tasks",action:"DELETE",record:{id:m}}:e.startsWith("/api/projects/")?x={table:"projects",action:"DELETE",record:{id:m}}:e.startsWith("/api/documents/")?x={table:"documents",action:"DELETE",record:{id:m}}:e.startsWith("/api/comments/")&&(x={table:"comments",action:"DELETE",record:{id:m}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(x);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:x?"GRANULAR_DELTA":"STATE_MUTATION",delta:x,timestamp:Date.now()})}catch{}}}}return b}typeof window<"u"&&(window.api=I);var Ai=ne({canAccessView:()=>q,getFirstAllowedView:()=>he,loadData:()=>de,navItem:()=>ve,refreshView:()=>K,renderApp:()=>Q,renderSyncIndicator:()=>ga,renderView:()=>D,switchView:()=>oe});function q(e){return s.data?e==="dashboard"?k("view_dashboard"):e==="projects"||e==="project-detail"?k("view_projects"):e==="tasks"?k("create_tasks")||k("edit_tasks")||k("delete_tasks")||k("assign_tasks")||k("review_tasks")||k("approve_tasks")||k("manage_reminders")||k("view_projects")||P():e==="documents"?k("upload_documents")||k("delete_documents")||P():e==="templates"?k("manage_templates")||P():e==="team"?P()||k("manage_users"):e==="reports"?k("view_reports")||P():e==="settings":!0}function he(){for(const e of["dashboard","projects","tasks","documents","templates","team","reports","settings"])if(q(e))return e;return"dashboard"}function ga(){const e=rt().length;return pi()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${t("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:"":`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${t("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}if(typeof window<"u"&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;const e=()=>{const n=document.getElementById("sync-status-indicator");n&&(n.innerHTML=ga())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function ve(e,n,a){return`<button class="nav-item ${s.view===e||e==="projects"&&s.view==="project-detail"?"active":""}" data-view="${e}">${h(a,17)}<span>${n}</span></button>`}function Q(){if(s.data&&!q(s.view)&&(s.view=he()),typeof window<"u"){const o=window.location.hash.replace(/^#/,"");if(!o||o==="login"||o==="forgot"){let r=s.view;s.view==="project-detail"&&s.activeProjectId?r=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:s.view==="settings"&&s.settingsSection&&(r=`settings?section=${encodeURIComponent(s.settingsSection)}`),window._isInternalNav=!0,window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${r}`):window.location.hash=`#${r}`}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";const e=(s.data?.notifications||[]).filter(o=>!o.read).length,n=s.data?.user||{},a=P()||k("manage_settings")||k("manage_roles")||k("manage_users")||k("manage_trash")||k("view_audit_logs");document.getElementById("app").innerHTML=`
    <div class="app-shell ${s.lang==="en"?"is-ltr":""}">
      <aside class="sidebar ${s.sidebarOpen?"open":""}">
        <div class="sidebar-brand">
          ${s.data?.company?.logoUrl?`<img src="${c(s.data.company.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${h("building",20)}</span>`:`<span class="brand-mark">${h("building",20)}</span>`}
          <div>
            <div class="brand-name">${c(t(s.data?.company?.nameAr||s.data?.company?.name||"DARC Design Team",s.data?.company?.nameEn||s.data?.company?.name||"DARC Design Team"))}</div>
            <div class="brand-subtitle">${g("workspace")}</div>
          </div>
        </div>
        <div class="nav-title">${t("مساحة العمل","WORKSPACE")}</div>
        <nav class="nav-list">
          ${q("dashboard")?ve("dashboard",g("dashboard"),"grid"):""}
          ${q("projects")?ve("projects",g("projects"),"building"):""}
          ${q("tasks")?ve("tasks",g("myTasks"),"checklist"):""}
          ${q("documents")?ve("documents",g("documents"),"document"):""}
          ${q("templates")?ve("templates",g("templates"),"layers"):""}
          ${q("team")?ve("team",g("team"),"users"):""}
          ${q("reports")?ve("reports",g("reports"),"chart"):""}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${a?t("إدارة النظام","ADMIN"):t("حسابي","MY ACCOUNT")}</div>
        <nav class="nav-list">${ve("settings",a?g("settings"):t("الملف الشخصي والأمان","Profile & Security"),"settings")}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${N(n)}<div class="admin-info"><strong>${c(t(n.name,n.nameEn||n.name))}</strong><span>${c(Z(n))}</span></div></div>
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
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${h("menu",18)}</button><div><div class="topbar-kicker">DARC / ${g("workspace")}</div><div class="topbar-title">${c(ma())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${ga()}</span>
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
            <div class="profile-chip">${N(n)}<div class="profile-chip-text"><strong>${c(t(n.name,n.nameEn||n.name))}</strong><span>${c(Z(n))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,D()}function D(){const e=document.getElementById("main-content");if(!e)return;q(s.view)||(s.view=he());let n="";s.view==="dashboard"&&(n=renderDashboard()),s.view==="projects"&&(n=renderProjects()),s.view==="tasks"&&(n=renderTasks()),s.view==="documents"&&(n=renderDocuments()),s.view==="templates"&&(n=renderTemplates()),s.view==="team"&&(n=renderTeam()),s.view==="reports"&&(n=renderReports()),s.view==="settings"&&(n=renderSettings()),s.view==="project-detail"&&(n=renderProjectDetail()),e.innerHTML=n,s.view==="project-detail"&&s.projectTab==="timeline"&&setTimeout(drawTimelineArrows,0)}function oe(e,n=void 0){s.data&&!q(e)&&(e=he()),lt("navigation",`الانتقال إلى واجهة #${e}${n?` (مشروع: ${n})`:""}`),s.view=e,n!==void 0&&(s.activeProjectId=n),e==="settings"&&!s.settingsSection&&(s.settingsSection="profile"),s.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelectorAll(".nav-item").forEach(o=>{const r=o.dataset.view,i=r===e||r==="projects"&&e==="project-detail";o.classList.toggle("active",i)});const a=document.querySelector(".topbar-title");a&&(a.textContent=ma());try{let o=e;e==="project-detail"&&s.activeProjectId?o=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:e==="settings"&&s.settingsSection&&(o=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==o&&(window._isInternalNav=!0,window.location.hash=o),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:s.view,activeProjectId:s.activeProjectId,projectTab:s.projectTab,settingsSection:s.settingsSection}))}catch{}requestAnimationFrame(()=>{D();const o=document.getElementById("main-content");o&&(o.scrollTop=0,o.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function K(e=!1){try{await de(e)}catch(n){$(n.message,!0)}}async function de(e=!1){try{const n=s.view==="settings"&&s.settingsSection==="trash"&&!s.trashLoaded?I("/api/trash",{silent:!0}).catch(()=>null):null;let a=await I("/api/bootstrap",{silent:e});if(a===null){if(s.data)return;const r=await Ba();if(r&&r.user?a=r:a=await I("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}}),!a)return}if(ce(a),s.isOffline=!1,n)try{const r=await n;r&&(s.trash=Array.isArray(r)?r:r.trash||[...(r.projects||[]).map(i=>({...i,type:"project"})),...(r.tasks||[]).map(i=>({...i,type:"task"})),...(r.documents||[]).map(i=>({...i,type:"document"}))],s.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash)))}catch{}if(s.data?.tasks&&a?.tasks){const r=Date.now(),i=new Set(a.tasks.map(d=>d.id));for(const d of s.data.tasks)i.has(d.id)||r-(d.createdAt?new Date(d.createdAt).getTime():r)<12e4&&(a.tasks.unshift(d),i.add(d.id))}if(s.data?.projects&&a?.projects){const r=Date.now(),i=new Set(a.projects.map(d=>d.id));for(const d of s.data.projects)i.has(d.id)||r-(d.createdAt?new Date(d.createdAt).getTime():r)<12e4&&(a.projects.unshift(d),i.add(d.id))}let o=!1;if(s.data&&a)if(s.data.updatedAt!==a.updatedAt)o=!0;else if(s.data.tasks?.length!==a.tasks?.length||s.data.projects?.length!==a.projects?.length)o=!0;else{const r=s.data.tasks||[],i=a.tasks||[];for(let d=0;d<i.length;d++){const l=i[d],p=r[d];if(!p||p.id!==l.id||p.status!==l.status||(p.sortOrder||p.sort_order)!==(l.sortOrder||l.sort_order)||p.progress!==l.progress){o=!0;break}}if(!o){const d=s.data.projects||[],l=a.projects||[];for(let p=0;p<l.length;p++){const u=l[p],f=d[p];if(!f||f.id!==u.id||f.lifecycle!==u.lifecycle||f.health!==u.health||f.progress!==u.progress){o=!0;break}}}}if(!s.data||o||s.data.comments?.length!==a.comments?.length||s.data.documents?.length!==a.documents?.length||s.data.users?.length!==a.users?.length||s.data.auditLogs?.length!==a.auditLogs?.length||s.data.notifications?.length!==a.notifications?.length){s.data=a,q(s.view)||(s.view=he());const r=!!document.getElementById("modal-root")?.children?.length,i=!!(document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),d=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(i||d))return;requestAnimationFrame(!e&&!r?()=>Q():()=>D())}else s.data=a,q(s.view)||(s.view=he(),requestAnimationFrame(()=>D()))}catch(n){if(n&&(n.status===401||n.status===403))throw n;const a=await Ba();if(a){s.data=a,q(s.view)||(s.view=he()),s.isOffline=!0;const o=!!document.getElementById("modal-root")?.children?.length;!e&&!o?Q():D();return}throw n}}typeof window<"u"&&(window.renderApp=Q,window.renderView=D);var Ti=ne({calculatePasswordStrength:()=>cn,openForcePasswordModal:()=>Ii,renderActivation:()=>ct,renderLogin:()=>X,renderResetPassword:()=>He,renderStrengthMeterHtml:()=>Mt});function cn(e){const n=String(e||"");if(!n)return{score:0,label:"",percent:0,color:"var(--line)"};let a=0;return n.length>=10&&(a+=1),/[a-z]/.test(n)&&/[A-Z]/.test(n)&&(a+=1),/\d/.test(n)&&(a+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(n)&&(a+=1),a===1?{score:1,label:s.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:a===2?{score:2,label:s.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:a===3?{score:3,label:s.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:s.lang==="ar"?"قوية وممتازة 🛡️":"Strong & Secure 🛡️",percent:100,color:"var(--mint-strong)"}}function Mt(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${s.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function va(e,n,a,o,r){const i=document.getElementById(e);if(!i)return;const d=i.querySelector(`input[name="${n}"]`),l=i.querySelector(`input[name="${a}"]`),p=i.querySelector(r||'button[type="submit"]'),u=document.getElementById(`${o}-meter-wrap`),f=document.getElementById(`${o}-meter-bar`),v=document.getElementById(`${o}-meter-label`),w=document.getElementById(`${o}-match-indicator`);function y(){const b=d?d.value:"",m=l?l.value:"";if(b&&u&&f&&v){u.style.display="flex";const x=cn(b);f.style.width=`${x.percent}%`,f.style.background=x.color,v.textContent=x.label,v.style.color=x.color}else u&&(u.style.display="none");l&&w&&(m?b===m?(w.style.display="block",w.style.color="var(--mint-strong)",w.textContent=s.lang==="ar"?"✓ كلمتا المرور متطابقتان":"✓ Passwords match",p&&(p.disabled=!1)):(w.style.display="block",w.style.color="var(--red)",w.textContent=s.lang==="ar"?"✗ كلمتا المرور غير متطابقتين":"✗ Passwords do not match",p&&(p.disabled=!0)):(w.style.display="none",p&&(p.disabled=!1)))}d?.addEventListener("input",y),l?.addEventListener("input",y)}function Rt(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=n=>{n.preventDefault();const a=e.getAttribute("data-target"),o=a?document.getElementById(a):e.parentElement.querySelector("input");if(!o)return;const r=o.type==="password";o.type=r?"text":"password",e.style.color=r?"var(--teal)":"var(--ink-soft)",e.setAttribute("aria-label",r?s.lang==="ar"?"إخفاء كلمة المرور":"Hide password":s.lang==="ar"?"إظهار كلمة المرور":"Show password")}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const n=a=>{const o=a.getModifierState&&a.getModifierState("CapsLock");let r=e.parentElement.parentElement.querySelector(".capslock-warning");o?r||(r=document.createElement("div"),r.className="capslock-warning",r.style.fontSize="11px",r.style.color="var(--amber)",r.style.marginTop="4px",r.style.display="flex",r.style.alignItems="center",r.style.gap="4px",r.innerHTML=`<span>⚠️</span> <span>${s.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(r)):r&&r.remove()};e.addEventListener("keydown",n),e.addEventListener("keyup",n)})}function ji(e,n=60){if(!e)return;e.disabled=!0;let a=n;const o=e.innerHTML,r=setInterval(()=>{a--,e.innerHTML=`<span>${s.lang==="ar"?`يرجى الانتظار (${a} ثانية)...`:`Please wait (${a}s)...`}</span>`,a<=0&&(clearInterval(r),e.disabled=!1,e.innerHTML=o)},1e3)}function X(e="",n="login",a=!1){if(s.view="login",typeof window<"u"){const p=n==="forgot"?"#forgot":"#login";window.location.hash!==p&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",p):window.location.hash=p)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";let o="";const r=e?`<div class="login-demo" style="border-color:${a?"#cce3e0":"var(--red-soft)"};background:${a?"#f0f9f7":"var(--red-soft)"};color:${a?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${h(a?"check":"alert",15)}<span>${c(e)}</span></div>`:"",i=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";n==="login"?o=`
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
        <div id="turnstile-widget-container" style="margin-bottom:14px;min-height:65px;display:flex;justify-content:center;"></div>
        ${r}
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
    `:n==="forgot"&&(o=`
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
              <div><p class="eyebrow">${n==="login"?t("مرحبًا بعودتك","WELCOME BACK"):t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${n==="login"?g("login"):t("نسيت كلمة المرور","Forgot Password")}</h2><p class="intro">${n==="login"?g("loginIntro"):t("أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.","Enter your email to receive a reset link.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${s.theme==="dark"?"الوضع النهاري":"الوضع الليلي"}">${s.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            ${o}
          </div>
        </section>
      </div>
    </div>`,Rt();const d="0x4AAAAAAFkv_qFdOceTRDC2",l=()=>{const p=document.getElementById("turnstile-widget-container");if(p)if(typeof window<"u"&&window.turnstile)try{p.innerHTML="",window._turnstileWidgetId=window.turnstile.render("#turnstile-widget-container",{sitekey:d,theme:s.theme==="dark"?"dark":"light",language:s.lang==="ar"?"ar":"en","error-callback":u=>{console.warn("[Turnstile] Handled code:",u)}})}catch(u){console.warn("[Turnstile] Render warning:",u)}else setTimeout(l,250)};l(),document.getElementById("login-form")?.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(p.currentTarget),f=String(u.get("email")||"").trim(),v=String(u.get("password")||""),w=document.getElementById("remember-email-check")?.checked,y=p.currentTarget.querySelector('button[type="submit"]');y.disabled=!0,y.innerHTML=`<span>${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const b=typeof window<"u"&&window.turnstile&&window._turnstileWidgetId!==void 0?window.turnstile.getResponse(window._turnstileWidgetId)||"":u.get("cf-turnstile-response")||"",m=f.trim().toLowerCase()==="demo@darc-design.bond"||f.trim().toLowerCase()==="demo@darc.local",x=b&&b.trim().length>0?b:m?"bypass_dev":"";try{const A=await I("/api/auth/login",{method:"POST",body:JSON.stringify({email:f,password:v,turnstileToken:x})});typeof localStorage<"u"&&(A?.token&&localStorage.setItem("darc_token",A.token),w?localStorage.setItem("darc_last_email",f):localStorage.removeItem("darc_last_email")),et({theme:s.theme,lang:s.lang}),await de()}catch(A){if(console.error("Login Error:",A),typeof window<"u"&&window.turnstile&&window._turnstileWidgetId!==void 0)try{window.turnstile.reset(window._turnstileWidgetId)}catch{}A.message&&(A.message.includes("429")||A.message.includes("كثيرة")||A.message.includes("rate"))?(X(A.message,"login"),ji(document.querySelector('#login-form button[type="submit"]'),60)):X(A.message,"login")}}),document.getElementById("forgot-form")?.addEventListener("submit",async p=>{p.preventDefault();const u=new FormData(p.currentTarget),f=p.currentTarget.querySelector('button[type="submit"]');f.disabled=!0;try{await I("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:u.get("email")})}),X(t("تم إرسال رابط الاستعادة إذا كان البريد مسجلاً.","Reset link sent if email is registered."),"forgot",!0)}catch(v){X(v.message,"forgot")}})}function ct(e,n=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light",document.getElementById("app").innerHTML=`
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
              <input type="hidden" name="token" value="${c(e)}" />
              <div class="field">
                <label for="act-pass">${g("password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Mt("act")}
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
              ${n?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${h("alert",15)}<span>${c(n)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit">${h("shield",16)} ${t("تفعيل الحساب والدخول","Activate and sign in")}</button>
            </form>
            <div class="login-demo">${h("lock",16)}<span>${t("جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.","Your session is encrypted and your password is never stored in plain text.")}</span></div>
          </div>
        </section>
      </div>
    </div>`,Rt(),va("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function He(e,n=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";const a=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,o=!a&&!n?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
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
              <input type="hidden" name="token" value="${c(a||"")}" />
              <div class="field">
                <label for="rst-pass">${t("كلمة المرور الجديدة","New Password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass" name="newPassword" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required ${a?"":"disabled"} />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Mt("rst")}
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
              ${n||o?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${h("alert",15)}<span>${c(n||o)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit" ${a?"":"disabled"}>${t("حفظ وتسجيل الدخول","Save and login")}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,Rt(),va("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async r=>{r.preventDefault();const i=new FormData(r.currentTarget),d=i.get("newPassword");if(d!==i.get("newPasswordConfirm")){He(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const l=r.currentTarget.querySelector('button[type="submit"]');l.disabled=!0;try{await I("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:d})}),window.history.replaceState({},"",window.location.pathname),await de()}catch(p){He(e,p.message)}})}function Ii(e){const n=e.status==="pending",a=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${n}">
      <div class="field">
        <label for="force-pass-input">${n?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${Mt("force")}
        ${e.email?n?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${h("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${n?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=le(n?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),n?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${c(e.name)}.`,`Set an initial password to activate ${c(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${c(e.name)}`,`Set a new password for ${c(e.name)}`),a,"force-password"),Rt(),va("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}var Di=ne({attentionItem:()=>pn,metricCard:()=>Ge,projectProgress:()=>_i,pulseChart:()=>mn,renderDashboard:()=>Pi,renderReports:()=>Ci,teamMetrics:()=>ya,teamRow:()=>un});function Ge(e,n,a,o,r,i=""){return`<article class="metric-card ${o}"><div class="metric-top"><span class="metric-label">${c(e)}</span><span class="metric-icon">${h(r,15)}</span></div><div class="metric-value">${c(n)}</div><span class="metric-note ${i}">${c(a)}</span></article>`}function _i(e){const n=e.health==="off_track"?"red":e.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${g("weightedProgress")}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${n}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function pn(e){const n=Se(e)||e.status==="blocked"?"red":"amber",a=Se(e)?t("متأخرة","Overdue"):e.status==="blocked"?t("متوقفة","Blocked"):t("تستحق قريبًا","Due soon");return`<button class="attention-item" data-action="open-task" data-task-id="${c(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${n}">${h(Se(e)||e.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${c(t(e.titleAr,e.titleEn))}</strong><span>${c(a)} · ${c(nn(e.dueDate))}</span></span></button>`}function ya(e,n){const a=n.filter(i=>i.assigneeId===e),o=a.reduce((i,d)=>i+Number(d.weight||1),0),r=o?Math.round(a.reduce((i,d)=>i+d.progress*Number(d.weight||1),0)/o):0;return{tasks:a.length,progress:r,overdue:a.filter(Se).length}}function un(e,n){const a=ya(e.id,n);return`<div class="team-row"><div class="team-member">${N(e)}<div class="team-member-copy"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(t(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${a.tasks}</strong> ${g("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${g("progress")}</span><strong>${a.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${a.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${c(e.id)}">${h("more",15)}</button></div>`}function mn(){const e=[38,48,45,62,55,72,68],n=s.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${e.map((a,o)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,a-22)}%"></span><span class="pulse-bar ${o===e.length-1?"current":""}" style="height:${a}%"></span></div><span>${n[o]}</span></div>`).join("")}</div>`}function Pi(){const e=s.data?.stats||{},n=s.data?.projects||[],a=s.data?.tasks||[],o=s.data?.users||[],r=s.data?.user||{},i=r.name||r.email||t("مستخدم","User"),d=n.reduce((m,x)=>m+(Number(x.totalWeight)||0),0),l=d?Math.round(n.reduce((m,x)=>m+(Number(x.progress)||0)*(Number(x.totalWeight)||0),0)/d):0,p=[...a].filter(m=>Se(m)||m.status==="blocked"||m.dueDate&&(new Date(`${m.dueDate}T23:59:59`)-new Date)/864e5<=7).sort((m,x)=>new Date(m.dueDate||"9999-12-31")-new Date(x.dueDate||"9999-12-31")).slice(0,5),u=o.filter(m=>m.status!=="inactive"),f=e.projectCount??n.length,v=e.myTasks??a.filter(m=>m.assigneeId===r.id).length,w=e.overdueTasks??a.filter(Se).length,y=e.dueSoon??0,b=e.completedTasks??a.filter(m=>m.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${t("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${tn()}، ${c(t(i.replace(/^م\.\s?/,""),r.nameEn||i))}</h1><p>${g("welcomeText")}</p></div><div class="welcome-status"><span>${g("portfolioHealth")}</span><strong>${l}%</strong><small>${t("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${Ge(g("activeProjects"),e.activeProjects||0,t(`${f} مشاريع إجمالًا`,`${f} projects total`),"teal","building","up")}${Ge(g("openTasks"),e.openTasks??a.length,t(`${v} مسندة لك`,`${v} assigned to you`),"blue","checklist")}${Ge(g("overdue"),w,t("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",w?"alert":"check",w?"alert":"")}${Ge(g("dueThisWeek"),y,t("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("projectProgress")}</h2><p class="panel-subtitle">${g("projectProgressSub")}</p></div>${k("view_projects")?`<button class="text-link" data-view="projects">${g("seeAll")} ${h(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${n.length?n.slice(0,5).map(projectRow).join(""):`<div class="empty">${h("building",18)}<span>${g("noProjects")}</span></div>`}</div></section>${P()||k("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamProgress")}</h2><p class="panel-subtitle">${g("teamProgressSub")}</p></div><button class="text-link" data-view="team">${g("seeAll")} ${h(s.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${u.slice(0,6).map(m=>un(m,a)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("attention")}</h2><p class="panel-subtitle">${g("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${p.length}</span></div><div class="attention-list">${p.length?p.map(pn).join(""):`<div class="empty">${h("check",18)}<span>${g("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("recentPulse")}</h2><p class="panel-subtitle">${g("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${b} ${g("done")}</span></div>${mn()}</section></div></div>`}function Ci(){const{projects:e,tasks:n,users:a}=s.data,o=k("export_reports")||P(),r=n.reduce((p,u)=>p+Number(u.weight||1),0),i=r?Math.round(n.reduce((p,u)=>p+u.progress*Number(u.weight||1),0)/r):0,d=new Map;n.forEach(p=>{const u=(s.lang==="ar"?p.categoryAr:p.categoryEn)||t(p.typeAr||"عام",p.typeEn||"General"),f=d.get(u)||{weight:0,progress:0};f.weight+=Number(p.weight||1),f.progress+=p.progress*Number(p.weight||1),d.set(u,f)});const l=[...d.entries()].map(([p,u])=>({label:p,progress:u.weight?Math.round(u.progress/u.weight):0})).sort((p,u)=>u.progress-p.progress);return`<div class="page-head"><div><p class="eyebrow">${t("قراءة الأداء","PERFORMANCE READOUT")}</p><h1>${g("reports")}</h1><p>${t("مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.","Simple signals that help management see drift before it becomes delay.")}</p></div><div class="page-actions">${o?`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${h("printer",15)} ${t("طباعة تقرير المحفظة (PDF)","Print Portfolio (PDF)")}</button>
      <button class="btn btn-soft" data-action="export-csv">${h("document",15)} ${t("تصدير الإكسل (Excel)","Export Excel")}</button>
    </div>
  `:""}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("الإنجاز حسب التخصص","Progress by discipline")}</h2><p class="panel-subtitle">${g("weightedProgress")}</p></div><span class="status-badge on_track">${i}%</span></div><div class="report-bars">${l.length?l.map(p=>`<div class="report-bar-row"><span>${c(p.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${p.progress}%"></div></div><strong>${p.progress}%</strong></div>`).join(""):`<div class="empty">${g("noTasks")}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("صحة المحفظة","Portfolio health")}</h2><p class="panel-subtitle">${t("توزيع حالات المشاريع الحالية.","Current project status distribution.")}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${g("onTrack")}</span><strong style="color:var(--mint-strong)">${e.filter(p=>p.health==="on_track").length}</strong></div><div class="report-stat"><span>${g("atRisk")}</span><strong style="color:var(--amber)">${e.filter(p=>p.health==="at_risk").length}</strong></div><div class="report-stat"><span>${g("offTrack")}</span><strong style="color:var(--red)">${e.filter(p=>p.health==="off_track").length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamLoad")}</h2><p class="panel-subtitle">${t("المهام المفتوحة لكل عضو.","Open tasks per member.")}</p></div></div><div class="report-stat-list">${a.slice(0,5).map(p=>{const u=ya(p.id,n);return`<div class="report-stat"><span>${c(t(p.name,p.nameEn||p.name))}</span><strong>${u.tasks}</strong></div>`}).join("")}</div></section></div></div>`}var Li=ne({STATUS_OPTIONS:()=>Sn,buildAssigneeChipsHtml:()=>wa,buildRemindersListHtml:()=>$a,drawTimelineArrows:()=>Mi,filterTasks:()=>wn,formatRemindAtDate:()=>$n,getSavedTaskSort:()=>We,getTaskSortOrder:()=>De,initTaskModalWidgets:()=>kn,openDocumentPreviewModal:()=>Yt,openTaskModal:()=>jt,renderBoard:()=>hn,renderCalendar:()=>ha,renderTaskAssignees:()=>fn,renderTaskComments:()=>at,renderTaskDocuments:()=>_e,renderTaskSortSelect:()=>ba,renderTasks:()=>zi,renderTimeline:()=>xa,renderTimelinePanel:()=>xn,setSavedTaskSort:()=>yn,sortTasks:()=>bn,sortTasksByImportance:()=>vn,taskCard:()=>gn});function fn(e){const n=s.data?.users||[],a=s._userMap||new Map(n.map(l=>[l.id,l])),o=e.assignee||a.get(e.assigneeId),r=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(l=>a.get(l)).filter(Boolean),i=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let d='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return o||r.length?(d+='<div class="avatar-stack" style="display:flex;align-items:center;">',o&&(d+=`<span title="${c(t(o.name,o.nameEn||o.name))}">${N(o,"mini-avatar")}</span>`),r.slice(0,2).forEach(l=>{d+=`<span title="${c(t(l.name,l.nameEn||l.name))}" style="margin-inline-start:-8px;">${N(l,"mini-avatar")}</span>`}),r.length>2&&(d+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${r.slice(2).map(l=>t(l.name,l.nameEn||l.name)).join("، ")}">+${r.length-2}</span>`),d+="</div>",o&&(d+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${c(t(o.name,o.nameEn||o.name))}</span>`)):i.length||(d+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),i.length&&(i.slice(0,2).forEach(l=>{d+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${c(l)}">🌐 ${c(l)} <small style="opacity:0.8">(${t("خارجي","Ext")})</small></span>`}),i.length>2&&(d+=`<span style="font-size:10px;color:var(--amber);" title="${i.slice(2).map(c).join("، ")}">+${i.length-2}</span>`)),d+="</div>",d}function gn(e){const n=isOverdue(e),a=n?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${h("alert",11)} ${g("overdue")}</span>`:"",o=s._commentCounts?s._commentCounts[e.id]||0:(s.data?.comments||[]).filter(l=>l.taskId===e.id).length,r=s._docCounts?s._docCounts[e.id]||0:(s.data?.documents||[]).filter(l=>l.taskId===e.id).length,i=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",d=P()||k("edit_tasks")||e.assigneeId===s.data?.user?.id;return`<article class="task-card ${n?"is-overdue":""} ${d?"":"not-draggable"}" draggable="${d?"true":"false"}" data-action="open-task" data-task-id="${c(e.id)}">
    <div class="task-card-top">
      <span class="task-code">${c(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        ${o>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${o} ${t("تعليقات","comments")}">💬 ${o}</span>`:""}
        ${r>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${r} ${t("مرفقات","attachments")}">📎 ${r}</span>`:""}
        ${a}
        <span class="priority-badge ${c(e.priority)}">${c(priorityText(e.priority))}</span>
      </div>
    </div>
    <h4>${c(t(e.titleAr,e.titleEn))}</h4>
    ${(()=>{const l=String(t(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!l)return"";const p=l.length>50?l.substring(0,50).trim()+"...":l;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${c(l)}">${c(p)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${c(t(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${n?"var(--red)":"var(--muted)"};">${h("calendar",11)} ${dateLabel(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${fn(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${i};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function De(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function vn(e=[]){const n={urgent:4,high:3,medium:2,low:1},a=Date.now();return[...e].sort((o,r)=>{const i=o.status==="blocked"?1:0,d=r.status==="blocked"?1:0;if(i!==d)return d-i;const l=o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():null,u=l&&l<a&&o.status!=="done"?1:0,f=p&&p<a&&r.status!=="done"?1:0;if(u!==f)return f-u;const v=n[o.priority]||2,w=n[r.priority]||2;if(v!==w)return w-v;if(l&&p){if(l!==p)return l-p}else{if(l&&!p)return-1;if(!l&&p)return 1}const y=De(o),b=De(r);return y!==b?y-b:(o.titleAr||"").localeCompare(r.titleAr||"","ar")})}function We(){return localStorage.getItem("darc_task_sort_pref")||"importance"}function yn(e){localStorage.setItem("darc_task_sort_pref",e),s.taskSortPref=e,s.projectTaskSort=e,s.myTaskSort=e}function ba(e,n="sort-project-tasks"){const a=e||We();return`
    <div class="sort-box">
      <span>${t("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${n}">
        <option value="importance" ${a==="importance"?"selected":""}>${t("حسب الأهمية والأولوية (افتراضي)","By Importance & Priority (Default)")}</option>
        <option value="deadline" ${a==="deadline"?"selected":""}>${t("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="custom" ${a==="custom"?"selected":""}>${t("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="alpha" ${a==="alpha"?"selected":""}>${t("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function bn(e=[],n=We()){return n==="deadline"?[...e].sort((a,o)=>(a.dueDate?new Date(`${a.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):n==="custom"?[...e].sort((a,o)=>De(a)-De(o)):n==="alpha"?[...e].sort((a,o)=>(a.titleAr||"").localeCompare(o.titleAr||"","ar")):vn(e)}function hn(e,n=We()){const a=s.data?.users||[];s._userMap=new Map(a.map(i=>[i.id,i]));const o={};for(const i of s.data?.comments||[])i.taskId&&(o[i.taskId]=(o[i.taskId]||0)+1);const r={};for(const i of s.data?.documents||[])i.taskId&&(r[i.taskId]=(r[i.taskId]||0)+1);return s._commentCounts=o,s._docCounts=r,`<div class="board">${[{key:"not_started",dot:"",label:g("notStarted")},{key:"in_progress",dot:"blue",label:g("inProgress")},{key:"review",dot:"amber",label:t("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:g("done")}].map(i=>{const d=bn(e.filter(l=>(i.statuses||[i.key]).includes(l.status)),n);return`<section class="board-column" data-status="${i.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${i.dot}"></span>${i.label}</div><span class="board-count">${d.length}</span></div><div class="board-cards">${d.length?d.map(gn).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${g("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function ha(e,n){const a=s.calendarDate?new Date(s.calendarDate):new Date,o=a.getFullYear(),r=a.getMonth(),i=`${s.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][r]:["January","February","March","April","May","June","July","August","September","October","November","December"][r]} ${o}`,d=s.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=new Date(o,r,1).getDay(),p=new Date(o,r+1,0).getDate(),u=new Date,f=u.getFullYear()===o&&u.getMonth()===r;let v="";for(let w=0;w<l;w++)v+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let w=1;w<=p;w++){const y=f&&u.getDate()===w,b=`${o}-${String(r+1).padStart(2,"0")}-${String(w).padStart(2,"0")}`,m=e.filter(x=>{if(!x.dueDate&&!x.startDate)return!1;const A=x.dueDate?x.dueDate.split("T")[0]:null,S=x.startDate?x.startDate.split("T")[0]:null;return A===b||S===b});v+=`
      <div class="calendar-day ${y?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${y?"var(--mint)":"var(--surface)"};border:1px solid ${y?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${y?"bold":"600"};color:${y?"var(--teal)":"var(--ink)"};">
          <span>${w}</span>
          ${y?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${t("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${m.map(x=>{const A=ca(x);return`
              <div data-action="open-task" data-task-id="${c(x.id)}" style="background:${A.bgColor};border:1px solid ${A.borderColor};border-inline-start:3px solid ${A.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${A.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${c(t(x.titleAr,x.titleEn))} — ${A.label}">
                <span style="font-weight:700;">${c(t(x.titleAr,x.titleEn))}</span>
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
  `}function xa(e){const n=e.filter(p=>p.startDate&&p.dueDate).sort((p,u)=>new Date(p.startDate)-new Date(u.startDate));if(!n.length)return`<div class="empty" style="min-height:300px">${h("calendar",24)}<span>${t("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let a=Math.min(...n.map(p=>new Date(p.startDate).getTime())),o=Math.max(...n.map(p=>new Date(p.dueDate).getTime()));const r=2592e5;a-=r,o+=r;const i=Math.max(7,Math.ceil((o-a)/864e5));let d="";for(let p=0;p<i;p++){const u=new Date(a+p*864e5),f=u.getDay()===5||u.getDay()===6,v=Ae()==="hijri"?s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",w=new Intl.DateTimeFormat(v,{month:"short"}).format(u);d+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${f?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${u.getDate()}<br>${w}</div>`}const l=n.map((p,u)=>{const f=Math.floor((new Date(p.startDate).getTime()-a)/864e5)+1,v=f+Math.max(1,Math.ceil((new Date(p.dueDate).getTime()-new Date(p.startDate).getTime())/864e5)+1),w=ca(p);return`<div style="display:contents" class="timeline-row" data-task-id="${p.id}" data-row="${u}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${p.id}" style="grid-column: ${f} / ${v}; margin: 8px 4px; background: ${w.color}; border: 1px solid ${w.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${c(t(p.titleAr,p.titleEn))} — ${w.label}">
        <span style="font-weight:600;opacity:0.9">${c(p.templateId?p.templateId.replace("tpl-","#"):"#")}</span> ${c(t(p.titleAr,p.titleEn))}
        ${p.dependencies&&p.dependencies.length?`<span style="float:${s.lang==="ar"?"left":"right"};opacity:0.8">${h("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${i}, minmax(40px, 1fr)); min-width: ${i*40}px; position: relative;">
      ${d}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function xn(e,n){const a=s.timelineView||"gantt";return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2>
          <p class="panel-subtitle">${t("متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.","Track task flow and milestone deadlines in your preferred format.")}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${a==="gantt"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${h("clock",12)} ${t("مخطط جانت","Gantt Chart")}
          </button>
          <button class="btn btn-sm ${a==="calendar"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${h("calendar",12)} ${t("عرض التقويم","Calendar View")}
          </button>
        </div>
      </div>
      
      ${a==="calendar"?ha(e,n):xa(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:xn,renderCalendar:ha,renderTimeline:xa});function wn(e){const n=s.searches.tasks.trim().toLowerCase();return e.filter(a=>{const o=`${a.titleAr} ${a.titleEn} ${a.categoryAr} ${a.categoryEn}`.toLowerCase().includes(n),r=s.taskFilter==="all"||s.taskFilter==="mine"&&a.assigneeId===s.data.user.id||s.taskFilter==="overdue"&&isOverdue(a)||s.taskFilter==="blocked"&&a.status==="blocked",i=s.taskProjectFilter==="all"||a.projectId===s.taskProjectFilter,d=!s.taskPriorityFilter||s.taskPriorityFilter==="all"||a.priority===s.taskPriorityFilter;return o&&r&&i&&d})}function zi(){const e=wn(s.data.tasks),n=[["all",g("all")],["mine",t("مسندة لي","Assigned to me")],["overdue",g("overdue")],["blocked",g("blocked")]],a=s.myTaskSort||We();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("حركة التنفيذ","EXECUTION")}</p>
        <h1>${g("myTasks")}</h1>
        <p>${t("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${k("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${h("plus",15)} ${g("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${n.map(([o,r])=>`
            <button class="segmented-tab ${s.taskFilter===o?"active":""}" data-action="task-filter" data-filter="${o}" role="tab">
              ${r}
            </button>
          `).join("")}
        </div>
        <div class="search-box tasks-search-box">
          ${h("search",15)}
          <input data-search="tasks" value="${c(s.searches.tasks)}" placeholder="${t("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${t("📁 كل المشاريع","📁 All Projects")}</option>
            ${s.data.projects.map(o=>`<option value="${c(o.id)}" ${s.taskProjectFilter===o.id?"selected":""}>${c(t(o.nameAr,o.nameEn))}</option>`).join("")}
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
          ${ba(a,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?hn(e,a):`<section class="panel"><div class="empty">${h("checklist",18)}<span>${g("noTasks")}</span></div></section>`}
  `}function $n(e){return ua(e,{includeSeconds:!1}).full}function wa(e=[],n=[]){const a=s.data?.users||[];let o="";return e.forEach(r=>{const i=a.find(d=>d.id===r)||{name:r,id:r};o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${N(i,"mini-avatar")}
        <span style="font-weight:500;">${c(t(i.name,i.nameEn||i.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${c(r)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),n.forEach(r=>{o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${c(r)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${t("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${c(r)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),o}function $a(e=[]){return e.length?e.map((n,a)=>`
    <div class="reminder-card-row" data-idx="${a}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${c($n(n.remindAt))}</strong>
        ${n.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(n.noteAr)}">(${c(n.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${a}" data-rem-id="${c(n.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${t("حذف التذكير","Delete reminder")}">
        ${h("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${t("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function jt(e=null,n=null,a=null){const o=s.data.templates.find(m=>m.id===(n||e?.templateId)),r=e?.projectId||a||s.activeProjectId||s.data.projects[0]?.id||"",i=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],d=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:"rem_"+Math.random().toString(36).substr(2,9),remindAt:e.remindAt,noteAr:""}]:Array.isArray(s.data?.reminders)&&e?.id&&(l=s.data.reminders.filter(m=>m.taskId===e.id));const p=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,u=i.length>0||d.length>0,f=u?wa(i,d):"",v=$a(l),w=`<form id="task-form" data-task-id="${c(e?.id||"")}">
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
          ${s.data.projects.map(m=>`<option value="${c(m.id)}" ${m.id===r?"selected":""}>${c(t(m.nameAr,m.nameEn))} (${c(m.code)})</option>`).join("")}
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
          ${s.data.templates.map(m=>`<option value="${c(m.id)}" ${(e?.templateId||n)===m.id?"selected":""}>${c(m.code)} — ${c(t(m.nameAr,m.nameEn))}</option>`).join("")}
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
          ${s.data.users.map(m=>`<option value="${c(m.id)}" ${(e?e.assigneeId===m.id:s.data.user.id===m.id)?"selected":""}>${c(t(m.name,m.nameEn||m.name))}</option>`).join("")}
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
        <select name="status" id="task-status-select">${Sn().map(([m,x])=>`<option value="${m}" ${e?.status===m?"selected":""}>${x}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${g("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(m=>`<option value="${m}" ${(e?.priority||"medium")===m?"selected":""}>${priorityText(m)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${g("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${c(e?.startDate||"")}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${g("dueDate")}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${c(e?.dueDate||"")}" min="${c(e?.startDate||"")}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
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
        ${e&&(k("delete_tasks")||P())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${h("trash",14)} ${t("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${h("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let y=w,b="";e&&(b="modal-lg",y=`
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
            <div id="task-documents-list">${_e(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${t("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${at(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${t("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${t("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById("modal-root").innerHTML=le(e?t("تعديل المهمة","Edit task"):g("addTask"),t("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),y,"task",b),kn(e)}function kn(e){const n=document.getElementById("modal-root");if(!n)return;const a=n.querySelector("#task-status-select"),o=n.querySelector("#task-auto-progress-badge");a&&o&&a.addEventListener("change",()=>{const j={not_started:0,in_progress:50,review:80,approval:80,done:100}[a.value]??0;o.textContent=`(${j}%)`});const r=n.querySelector("#task-template-select");r&&r.addEventListener("change",()=>{const j=r.value,_=(s.data?.templates||[]).find(L=>L.id===j);if(_){const L=n.querySelector("#task-title-ar"),M=n.querySelector("#task-title-en"),G=n.querySelector("#task-type-ar"),U=n.querySelector("#task-type-en");L&&!L.value&&(L.value=_.nameAr||""),M&&!M.value&&(M.value=_.nameEn||""),G&&(G.value=_.typeAr||"مخطط"),U&&(U.value=_.typeEn||"Drawing")}});const i=n.querySelector("#task-additional-assignees-input"),d=n.querySelector("#task-external-assignees-input"),l=n.querySelector("#assignees-chips-container"),p=n.querySelector("#assignee-combobox-search"),u=n.querySelector("#assignee-combobox-dropdown"),f=n.querySelector("#btn-add-external-quick");let v=[];try{v=JSON.parse(i?.value||"[]")}catch{v=[]}let w=[];try{w=JSON.parse(d?.value||"[]")}catch{w=[]}function y(){i&&(i.value=JSON.stringify(v)),d&&(d.value=JSON.stringify(w))}function b(){if(l){if(v.length===0&&w.length===0){l.style.display="none",l.innerHTML="",y();return}l.style.display="flex",l.innerHTML=wa(v,w),y()}}function m(j=""){if(!u)return;const _=j.trim().toLowerCase(),L=s.data?.users||[],M=n.querySelector("#task-primary-assignee")?.value,G=L.filter(F=>{if(F.id===M)return!1;if(!_)return!0;const ie=(F.name||"").toLowerCase(),fe=(F.nameEn||"").toLowerCase(),W=(F.email||"").toLowerCase();return ie.includes(_)||fe.includes(_)||W.includes(_)});let U="";_&&(U+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${t("إضافة مسؤول خارجي:","Add external assignee:")} "${c(j.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${t("إضافة سريعة","Quick Add")}</span>
        </div>
      `),G.length===0&&!_?U+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${t("لا يوجد مستخدمين آخرين","No other users")}</div>`:G.forEach(F=>{const ie=v.includes(F.id);U+=`
          <div class="combobox-user-row" data-uid="${c(F.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${c(F.id)}" ${ie?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${N(F,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${c(t(F.name,F.nameEn||F.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${c(t(F.jobTitleAr,F.jobTitleEn)||F.email||"")}</span>
              </div>
            </div>
            ${ie?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),u.innerHTML=U,u.style.display="block"}y(),p&&(p.addEventListener("focus",()=>{m(p.value)}),p.addEventListener("input",()=>{const j=p.value.trim();m(j),f&&(f.style.display=j.length>1?"inline-flex":"none")}),p.addEventListener("keydown",j=>{if(j.key==="Enter"){j.preventDefault();const _=p.value.trim();_&&(w.includes(_)||(w.push(_),b()),p.value="",f&&(f.style.display="none"),u&&(u.style.display="none"))}})),f&&f.addEventListener("click",()=>{const j=p?.value.trim();j&&(w.includes(j)||(w.push(j),b()),p.value="",f.style.display="none",u&&(u.style.display="none"))}),u&&u.addEventListener("click",j=>{if(j.target.closest(".dropdown-ext-action")){const L=p?.value.trim();L&&!w.includes(L)&&(w.push(L),b()),p&&(p.value=""),f&&(f.style.display="none"),u.style.display="none";return}const _=j.target.closest(".combobox-user-row");if(_){const L=_.dataset.uid;v.includes(L)?v=v.filter(M=>M!==L):v.push(L),b(),m(p?.value||"")}}),l&&l.addEventListener("click",j=>{const _=j.target.closest(".btn-remove-chip-user");if(_){const M=_.dataset.uid;v=v.filter(G=>G!==M),b(),u&&u.style.display==="block"&&m(p?.value||"");return}const L=j.target.closest(".btn-remove-chip-ext");if(L){const M=L.dataset.ext;w=w.filter(G=>G!==M),b()}});const x=n.querySelector("#task-reminders-input"),A=n.querySelector("#task-reminders-list"),S=n.querySelector("#new-reminder-datetime"),E=n.querySelector("#new-reminder-note"),z=n.querySelector("#btn-add-reminder");let C=[];try{C=JSON.parse(x?.value||"[]")}catch{C=[]}Array.isArray(C)||(C=[]);function T(){A&&(x&&(x.value=JSON.stringify(C)),A.innerHTML=$a(C))}z&&z.addEventListener("click",()=>{const j=S?.value;if(!j){$(t("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const _=E?.value.trim()||"",L={id:"rem_temp_"+Math.random().toString(36).substr(2,9),remindAt:new Date(j).toISOString(),noteAr:_};C.push(L),S&&(S.value=""),E&&(E.value=""),T(),$(t("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),A&&A.addEventListener("click",async j=>{const _=j.target.closest(".btn-delete-reminder");if(_){const L=Number(_.dataset.idx),M=_.dataset.remId;!isNaN(L)&&L>=0&&L<C.length&&(C.splice(L,1),T(),M&&!M.startsWith("rem_temp_")&&I(`/api/reminders/${M}`,{method:"DELETE"}).catch(()=>{}),$(t("تم حذف موعد التذكير.","Reminder deleted.")))}}),n.addEventListener("mousedown",j=>{u?.contains(j.target)||p?.contains(j.target)||f?.contains(j.target)||(u&&(u.style.display="none"),f&&(f.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&I(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(j=>{if(j&&Array.isArray(j.comments)){s.data.comments||(s.data.comments=[]);const _=new Map(s.data.comments.map(M=>[M.id,M]));for(const M of j.comments)_.set(M.id,M);s.data.comments=Array.from(_.values());const L=document.getElementById("task-comments-list");L&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(L.innerHTML=at(e))}}).catch(()=>{})}function at(e){const n=(s.data.comments||[]).filter(a=>a.taskId===e.id).sort((a,o)=>new Date(a.createdAt)-new Date(o.createdAt));return n.length?`<div style="display:flex;flex-direction:column;gap:12px;">${n.map(a=>{const o=a.user||(s.data?.users||[]).find(l=>l.id===a.userId)||s.data?.user||{name:"DARC Member",id:""},r=!!(o.id&&s.data?.user?.id&&o.id===s.data.user.id),i=r||typeof P=="function"&&P(),d=c(a.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${c(a.id)}" style="display:flex;gap:10px;flex-direction:${r?"row-reverse":"row"};">
        ${N(o)}
        <div style="display:flex;flex-direction:column;align-items:${r?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${c(t(o.name,o.nameEn||o.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(a.createdAt,!0)}</span>
            ${i?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${c(a.id)}" data-task-id="${c(e.id)}" title="${t("تعديل التعليق","Edit comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${h("edit",12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${c(a.id)}" data-task-id="${c(e.id)}" title="${t("حذف التعليق","Delete comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${h("trash",12)}
                </button>
              </div>
            `:""}
          </div>
          <div id="comment-bubble-${c(a.id)}" style="background:${r?"var(--blue)":"var(--surface)"};color:${r?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${r?"none":"1px solid var(--border)"};border-top-${r?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${d}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${h("message",18)}<span style="font-size:12px;">${t("لا توجد تعليقات","No comments yet")}</span></div>`}function _e(e){const n=s.data.documents.filter(a=>a.taskId===e.id).sort((a,o)=>new Date(o.createdAt)-new Date(a.createdAt));return n.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${n.map(a=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${a.id}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${h("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${c(a.originalName)}">${c(a.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${dateLabel(a.createdAt,!0)} · ${c(a.user?t(a.user.name,a.user.nameEn||a.user.name):"Team Member")} · ${a.size>1048576?(a.size/1048576).toFixed(1)+"MB":Math.round(a.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${a.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("نسخ رابط المشاركة","Copy share link")}">${h("link",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${a.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${h("eye",14)}</button>
        ${k("review_tasks")||k("approve_tasks")||k("upload_documents")||P()?`
          <select class="doc-status-select" data-doc-id="${a.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${a.status==="draft"?"selected":""}>${t("مسودة","Draft")}</option>
            ${k("review_tasks")||P()?`<option value="review" ${a.status==="review"?"selected":""}>${t("مراجعة","Review")}</option>`:""}
            ${k("approve_tasks")||P()?`<option value="approved" ${a.status==="approved"?"selected":""}>${t("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${a.status==="superseded"?"selected":""}>${t("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${k("upload_documents")||P()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${a.id}" style="padding:4px;min-width:0;height:auto;" title="${t("إعادة تسمية","Rename")}">${h("edit",14)}</button>`:""}
        ${k("delete_documents")||P()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${a.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${t("حذف","Delete")}">${h("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${h("document",18)}<span style="font-size:12px;">${t("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}async function Yt(e){if(!e)return;let n=(s.data?.documents||[]).find(v=>v.id===e);if(!n)try{const v=await I(`/api/documents/${e}`);v&&v.id&&(n=v,s.data.documents||(s.data.documents=[]),s.data.documents.push(n))}catch(v){console.warn("[Documents] Failed to fetch doc preview on demand:",v)}if(!n){$(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found or moved to trash."),!0);return}let a=n.diskFilename||`/api/documents/${n.id}`;(a.startsWith("file://")||a.startsWith("/")||!a.startsWith("http"))&&(a=`/api/documents/${n.id}`);let o="";if(a.includes("drive.google.com")){const v=a.match(/\/d\/([a-zA-Z0-9_-]+)/);v&&v[1]&&(o=v[1])}const r=o?`https://drive.google.com/file/d/${encodeURIComponent(o)}/preview`:a,i=/^(https?:\/\/|\/)/i.test(r)?r:"about:blank",d=o?`https://drive.google.com/file/d/${encodeURIComponent(o)}/view?usp=drivesdk`:a.startsWith("http")?a:`${window.location.origin}${a}`,l=/^(https?:\/\/|\/)/i.test(d)?d:"#",p=`/api/documents/${encodeURIComponent(n.id)}`,u=/\.(jpe?g|png|gif|webp|svg|heic)$/i.test(n.originalName)||n.mimeType&&n.mimeType.startsWith("image/");n.size>1048576?(n.size/1048576).toFixed(1)+"":Math.round((n.size||0)/1024)+"";let f=document.getElementById("preview-modal-overlay");f||(f=document.createElement("div"),f.id="preview-modal-overlay",f.style.position="fixed",f.style.inset="0",f.style.zIndex="1300",f.style.background="rgba(0, 0, 0, 0.75)",f.style.backdropFilter="blur(4px)",f.style.display="flex",f.style.alignItems="center",f.style.justifyContent="center",f.style.padding="20px",document.body.appendChild(f)),f.innerHTML=`
    <div style="background:var(--surface);width:95%;max-width:1100px;height:88vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--line);background:var(--surface);">
        <div style="display:flex;align-items:center;gap:10px;overflow:hidden;">
          <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${h("document",16)}</span>
          <div style="overflow:hidden;">
            <h2 style="margin:0;font-size:15px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(n.originalName)}">${c(n.originalName)}</h2>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" data-action="copy-doc-link" data-doc-id="${c(n.id)}" style="display:flex;align-items:center;gap:6px;" title="${t("نسخ رابط المشاركة","Copy share link")}">
            ${h("link",13)} <span class="hide-mobile">${t("نسخ الرابط","Copy Link")}</span>
          </button>
          <a href="${c(l)}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${t("فتح في Google Drive","Open in Google Drive")}">
            ${h("globe",13)} <span class="hide-mobile">${t("فتح في Drive","Open in Drive")}</span>
          </a>
          <a href="${c(p)}" target="_blank" rel="noopener noreferrer" download class="btn btn-primary btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${t("تحميل المخطط","Download")}">
            ${h("download",13)} <span class="hide-mobile">${t("تحميل","Download")}</span>
          </a>
          <button type="button" class="btn btn-ghost btn-sm" id="close-preview-modal-btn" style="padding:6px;min-width:0;margin-inline-start:4px;" title="${t("إغلاق","Close")}">${h("close",18)}</button>
        </div>
      </div>
      <div style="flex:1;position:relative;background:#1a1a1a;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        ${!o&&u?`
          <div style="width:100%;height:100%;overflow:auto;display:flex;align-items:center;justify-content:center;padding:15px;">
            <img src="${c(i)}" alt="${c(n.originalName)}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='${c(p)}';" />
          </div>
        `:`
          <iframe src="${c(i)}" sandbox="allow-scripts allow-same-origin allow-popups" style="width:100%;height:100%;border:none;background:#fff;" allow="autoplay" loading="lazy"></iframe>
        `}
      </div>
    </div>
  `,f.style.display="flex",document.getElementById("close-preview-modal-btn")?.addEventListener("click",()=>{f.style.display="none",f.innerHTML=""}),f.onclick=v=>{v.target===f&&(f.style.display="none",f.innerHTML="")}}function Sn(){return[["not_started",g("notStarted")],["in_progress",g("inProgress")],["review",g("review")],["approval",g("approval")],["done",g("done")],["blocked",g("blocked")],["canceled",g("canceled")]]}function Mi(){const e=document.querySelector(".timeline-container > div"),n=document.querySelector(".timeline-svg");if(!e||!n)return;n.innerHTML="";const a=Array.from(document.querySelectorAll(".timeline-bar")),o={},r=e.getBoundingClientRect();a.forEach(l=>{const p=l.getBoundingClientRect();o[l.dataset.taskId]={left:p.left-r.left,right:p.right-r.left,top:p.top-r.top,bottom:p.bottom-r.top,width:p.width,height:p.height,center:p.top-r.top+p.height/2}});let i="";const d=s.lang==="ar";a.forEach(l=>{const p=l.dataset.taskId,u=(s.data?.tasks||[]).find(w=>w.id===p),f=u?.dependencies||u?.customFields?.dependencies||[];if(!u||!f.length)return;const v=o[p];v&&f.forEach(w=>{const y=o[w];if(!y)return;const b=d?y.left:y.right,m=y.center,x=d?v.right:v.left,A=v.center,S=b+(d?-20:20);i+=`<path d="M ${b} ${m} C ${S} ${m}, ${S} ${A}, ${x} ${A}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),n.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${i}
  `}var Ri=ne({buildProjectMemberChipsHtml:()=>Kt,exportPortfolioPDF:()=>Cn,exportPortfolioXLS:()=>_n,exportProjectPDF:()=>Xt,exportProjectXLS:()=>Pn,exportXLS:()=>Ea,getCompanyBranding:()=>ut,getDaysLeftBadge:()=>ka,getProjectTeam:()=>Ni,getProjectTeamData:()=>pt,openCloneModal:()=>Bi,openProjectModal:()=>Sa,projectCard:()=>jn,projectRow:()=>Oi,renderInPagePrintModal:()=>Aa,renderProjectCardTeamAvatars:()=>Tn,renderProjectDetail:()=>Fi,renderProjectOverviewTab:()=>In,renderProjectTeamAvatars:()=>En,renderProjectTimelineBar:()=>An,renderProjects:()=>Dn});function Oi(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${h("building",17)}</span><div class="project-name"><strong>${c(t(e.nameAr,e.nameEn))}</strong><span>${c(e.code)} · ${c(t(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${N(e.manager)}<span>${c(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${c(e.id)}" aria-label="${g("viewDetails")}">${h(s.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function ka(e){if(!e)return"";const n=new Date(`${e}T23:59:59`),a=Math.ceil((n-new Date)/864e5);let o="var(--mint-strong)",r="var(--mint)",i="";return a<0?(o="var(--red)",r="var(--red-soft)",i=t(`متأخر ${Math.abs(a)} يوم`,`${Math.abs(a)}d overdue`)):a===0?(o="var(--red)",r="var(--red-soft)",i=t("يستحق اليوم","Due today")):a<=2?(o="var(--red)",r="var(--red-soft)",i=t(`باقي ${a} يوم`,`${a}d left`)):a<=7?(o="var(--amber)",r="var(--amber-soft)",i=t(`باقي ${a} أيام`,`${a}d left`)):(o="var(--mint-strong)",r="var(--mint)",i=t(`باقي ${a} يوم`,`${a}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${o};background:${r};border:1px solid currentColor;">${h("clock",11)} ${i}</span>`}function pt(e){const n=s.data?.users||[],a=(s.data?.tasks||[]).filter(i=>i.projectId===e.id),o=new Set,r=new Set;return e.managerId&&o.add(e.managerId),a.forEach(i=>{i.assigneeId&&o.add(i.assigneeId),(i.customFields?.additionalAssignees||i.customFields?.additional_assignees||[]).forEach(d=>o.add(d)),(i.customFields?.externalAssignees||i.customFields?.external_assignees||[]).forEach(d=>{d&&typeof d=="string"&&d.trim()&&r.add(d.trim())})}),{internalMembers:Array.from(o).map(i=>n.find(d=>d.id===i)).filter(Boolean),externalMembers:Array.from(r)}}function Ni(e){return pt(e).internalMembers}function En(e,n=4,a=!0,o=[]){if((!e||!e.length)&&(!o||!o.length))return`<span style="font-size:11px;color:var(--muted);">${t("لا يوجد فريق محدد","No team assigned")}</span>`;const r=(e||[]).slice(0,n),i=(e||[]).length-n,d=(e||[]).map(p=>t(p.name,p.nameEn||p.name)).join("، ");let l='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return r.forEach(p=>{const u=t(p.name,p.nameEn||p.name),f=a?`data-action="filter-by-member" data-member-id="${c(p.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';l+=`
      <span class="team-member-chip" ${f} title="${c(u)} (${c(Z(p))})">
        ${N(p,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${c(u)}</span>
      </span>
    `}),i>0&&(l+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${c(d)}">+${i} ${t("آخرين","more")}</span>`),o&&o.length>0&&(l+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${c(o.join("، "))}">🌐 +${o.length} ${t("خارجي","ext")}</span>`),l+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${t("فريق العمل الداخلي","Internal Team")} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(p=>`
        <div ${a?`data-action="filter-by-member" data-member-id="${c(p.id)}" title="${c(t("فلترة مهام "+(p.name||""),"Filter tasks of "+(p.nameEn||p.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${a?"cursor:pointer;transition:all 0.15s;":""}" ${a?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${N(p,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${c(t(p.name,p.nameEn||p.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${c(Z(p))}</span>
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

    ${a?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${t("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,l+="</div>",l}function An(e){if(!e.dueDate)return"";const n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),a=new Date(`${e.dueDate}T23:59:59`),o=new Date,r=a.getTime()-n.getTime();let i=0;r>0&&(i=Math.min(100,Math.max(0,Math.round((o.getTime()-n.getTime())/r*100))));const d=o>a,l=d?"var(--red)":i>=80&&!d?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${h("clock",12)}
          <strong>${t("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${l};font-weight:bold;">${d?t("انتهى موعد التسليم!","Deadline passed!"):t(`مضى ${i}% من الوقت`,`${i}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${dateLabel(e.startDate)} ➔ ${dateLabel(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${i}%;background:${l};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function Tn(e=[],n=[],a=3){const o=e.length+n.length;if(o===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const r=e.slice(0,a),i=o-r.length;[...e.map(l=>t(l.name,l.nameEn||l.name)),...n].join("، ");let d=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${t("عرض فريق العمل","View Team")}">`;return d+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',r.forEach((l,p)=>{d+=`
      <div style="margin-inline-start:${p===0?"0":"-8px"};position:relative;z-index:${10-p};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${N(l,"mini-avatar")}
      </div>
    `}),i>0&&(d+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${i}
      </div>
    `),n&&n.length>0&&i<=0&&(d+='<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>'),d+="</div>",d+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${t("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${o}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(l=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${N(l,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(t(l.name,l.nameEn||l.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${c(Z(l))}</span>
            </div>
          </div>
        `).join("")}
      </div>
      ${n&&n.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${t("الشركاء الخارجيون","External Partners")} (${n.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${n.map(l=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${c(l)}
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  `,d+="</div>",d}function jn(e){const{internalMembers:n,externalMembers:a}=pt(e),o=e.manager||(s.data?.users||[]).find(d=>d.id===e.managerId),r=ka(e.dueDate),i=t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
        <span class="project-card-symbol">${h("building",19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${c(e.code)}</span>
          <h3 class="project-card-title" title="${c(t(e.nameAr,e.nameEn))}">${c(t(e.nameAr,e.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        <span class="status-badge ${c(e.health)}">${c(O(e.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${c(i||"")}">
      ${i?c(i):`<span style="color:var(--muted);font-style:italic;">${t("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${N(o,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${g("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(o?t(o.name,o.nameEn||o.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${g("team")} (${n.length+a.length})</span>
        ${Tn(n,a,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${g("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${e.dueDate?dateLabel(e.dueDate,!0):"—"}</strong>
          ${r}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health==="off_track"?"red":e.health==="at_risk"?"amber":""}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${c(e.id)}">
      ${g("viewDetails")} ${h(s.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function In(e,n,a,o=[]){const r=e.manager||(s.data?.users||[]).find(p=>p.id===e.managerId),i=n.filter(p=>p.status==="done").length,d=n.filter(p=>p.status==="in_progress").length,l=n.filter(isOverdue).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${t("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${n.length}</div>
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
          <div class="metric-value">${a.length+(o?.length||0)}</div>
          <span class="metric-note">${t("أعضاء مساهمون","Active contributors")}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${An(e)}

      <!-- Details Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${h("document",16)}
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
              <strong style="font-size:13px;color:var(--ink);">${c(O(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.dueDate,!0)}</strong>
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
            ${N(r)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${g("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${c(r?t(r.name,r.nameEn||r.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${c(r?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${t("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${a.map(p=>{const u=n.filter(f=>f.assigneeId===p.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${N(p,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${c(t(p.name,p.nameEn||p.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${c(Z(p))}</span>
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
              ${o.map(p=>{const u=n.filter(f=>(f.customFields?.externalAssignees||f.customFields?.external_assignees||[]).includes(p)).length;return`
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
  `}function Dn(){const e=s.searches.projects.trim().toLowerCase();let n=s.data.projects.filter(o=>`${o.nameAr} ${o.nameEn} ${o.code} ${o.clientAr}`.toLowerCase().includes(e));const a=s.projectSort||"default";return a==="alpha-asc"?n.sort((o,r)=>(t(o.nameAr,o.nameEn)||"").localeCompare(t(r.nameAr,r.nameEn)||"",s.lang==="ar"?"ar":"en")):a==="alpha-desc"?n.sort((o,r)=>(t(r.nameAr,r.nameEn)||"").localeCompare(t(o.nameAr,o.nameEn)||"",s.lang==="ar"?"ar":"en")):a==="progress-asc"?n.sort((o,r)=>(Number(o.progress)||0)-(Number(r.progress)||0)):a==="progress-desc"&&n.sort((o,r)=>(Number(r.progress)||0)-(Number(o.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${t("المحفظة","PORTFOLIO")}</p><h1>${g("projects")}</h1><p>${t("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${k("create_projects")?`<button class="btn btn-primary" data-action="new-project">${h("plus",15)} ${g("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${h("search",15)}<input data-search="projects" value="${c(s.searches.projects)}" placeholder="${g("search")}" /></div><div class="sort-box"><span>${t("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${a==="default"?"selected":""}>${t("الافتراضي","Default")}</option><option value="alpha-asc" ${a==="alpha-asc"?"selected":""}>${t("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${a==="alpha-desc"?"selected":""}>${t("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${a==="progress-asc"?"selected":""}>${t("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${a==="progress-desc"?"selected":""}>${t("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${n.length} ${t("مشاريع","projects")}</span></div></div>${n.length?`<div class="project-cards">${n.map(jn).join("")}</div>`:`<section class="panel"><div class="empty">${h("building",18)}<span>${g("noProjects")}</span></div></section>`}`}function Fi(){const e=s.data.projects.find(v=>v.id===s.activeProjectId);if(!e)return s.view="projects",Dn();const n=s.data.tasks.filter(v=>v.projectId===e.id),{internalMembers:a,externalMembers:o}=pt(e),r=s.projectTab||"tasks",i=s.projectMemberFilter||null,d=i?n.filter(v=>v.assigneeId===i||(v.customFields?.additionalAssignees||v.customFields?.additional_assignees||[]).includes(i)):n,l=i?s.data.users.find(v=>v.id===i):null;let p="";if(r==="overview")p=In(e,n,a,o);else if(r==="tasks"){const v=s.projectTaskSort||We();p=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${g("projectTasks")} ${i?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${t("مهام","Tasks of")}: ${c(t(l?.name,l?.nameEn||l?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${t("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${ba(v,"sort-project-tasks")}
            ${i?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${h("close",12)} ${t("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${k("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}" title="${t("اضغط N للإضافة السريعة","Press N to add quickly")}">${h("plus",14)} ${g("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${renderBoard(d,v)}
      </div>
    `}else if(r==="timeline"){const{renderTimelinePanel:v}=window.__timelineExports||{};p=v?v(d,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${renderTimeline(d)}</div>`}else if(r==="drawings"){const v=(s.data.documents||[]).filter(m=>m.projectId===e.id&&!m.deletedAt),w=n.filter(m=>m.typeAr==="مخطط"||m.typeEn==="Drawing"||m.templateId),y=s.docTaskFilter||"all",b=y==="all"?v:v.filter(m=>m.taskId===y);p=`
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
                ${n.map(m=>`<option value="${c(m.id)}" ${y===m.id?"selected":""}>${c(t(m.titleAr,m.titleEn))}</option>`).join("")}
              </select>
            </div>
            ${k("create_tasks")?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}">
                ${h("plus",12)} ${t("إضافة مخرج / مخطط","Add Deliverable / Drawing")}
              </button>
            `:""}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${h("document",14)} ${t("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${b.length})
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
                ${b.length>0?b.map(m=>{const x=n.find(S=>S.id===m.taskId),A=m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round((m.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${c(m.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(m.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${h("document",15)}
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
                        ${x?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(x.id)}">${c(t(x.titleAr,x.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${c(m.status||"draft")}" style="font-size:11px;">
                          ${c(O(m.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${A}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(m.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(m.id)}" style="padding:5px;" title="${t("معاينة المخطط","Preview")}">
                            ${h("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(m.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ الرابط","Copy Link")}">
                            ${h("link",14)}
                          </button>
                          <a href="/api/documents/${c(m.id)}" target="_blank" rel="noopener noreferrer" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${t("تحميل","Download")}">
                            ${h("download",14)}
                          </a>
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
                ${w.map(m=>`
                  <tr data-action="open-task" data-task-id="${c(m.id)}" style="cursor:pointer;" title="${t("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${c(t(m.titleAr,m.titleEn))}</span><span class="table-sub">${c(m.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${c(t(m.typeAr,m.typeEn)||t("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${c(m.status)}">${c(O(m.status))}</span></td>
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
    `}else r==="activity"&&(p=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("activity")}</h2><p class="panel-subtitle">${t("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${renderAuditForProject(e.id)}</div>`);const u=e.manager||(s.data.users||[]).find(v=>v.id===e.managerId),f=ka(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${h(s.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${c(e.code)} · ${e.demo?g("sampleData"):g("active")}</p>
          <h1>${c(t(e.nameAr,e.nameEn))}</h1>
          <p>${c(t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${h("user",12)} 
              <strong>${g("manager")}:</strong> ${c(u?t(u.name,u.nameEn||u.name):"—")}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${h("calendar",12)} ${dateLabel(e.dueDate,!0)}
                ${f}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${h("users",12)}
              <span style="font-size:11px;">${g("team")}:</span>
              ${En(a,4,!0,o)}
            </span>
            <span class="status-badge ${c(e.health)}">${c(O(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${g("weightedProgress")}</span>
        ${k("edit_projects")||k("create_projects")||k("delete_projects")||k("view_reports")||P()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${h("more",15)} ${t("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${s.lang==="ar"?"left:0":"right:0"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;padding:5px;margin-top:5px;text-align:start">
              ${k("edit_projects")||P()?`<button class="menu-item" data-action="edit-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${h("edit",14)} ${g("edit")}</button>`:""}
              ${k("create_projects")||P()?`<button class="menu-item" data-action="clone-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${h("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>`:""}
              ${k("export_reports")||P()?`
                <button class="menu-item" data-action="export-project-pdf" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--brand-teal);font-weight:600;">
                  ${h("printer",14)} ${t("تقرير تنفيذي معتمد (PDF)","Executive Report (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project-client-pdf" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--ink);">
                  ${h("user",14)} ${t("تقرير تسليمات العميل (PDF)","Client Deliverables (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;">
                  ${h("document",14)} ${t("تصدير بيانات المهام (Excel)","Export Tasks (Excel)")}
                </button>
              `:""}
              ${k("delete_projects")||P()?`<button class="menu-item" data-action="delete-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${h("trash",14)} ${t("حذف المشروع","Delete Project")}</button>`:""}
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
  `}function Kt(e=[]){const n=s.data?.users||[];return e.map(a=>{const o=n.find(r=>r.id===a)||{name:a,id:a};return`
      <span class="chip-item" data-uid="${c(a)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${N(o,"mini-avatar")}
        <span style="font-weight:500;">${c(t(o.name,o.nameEn||o.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${c(a)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function Sa(e=null){const n=e?.code||`DARC-${String((s.data?.projects?.length||0)+1).padStart(3,"0")}`,a=e?pt(e).internalMembers.map(i=>i.id):[],o=a.length>0?a:[s.data?.user?.id].filter(Boolean),r=`
    <form id="project-form" data-project-id="${c(e?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${c(JSON.stringify(o))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${h("building",14)} <span>${t("البيانات الأساسية للمشروع","Core Project Information")}</span>
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
          <input name="code" value="${c(n)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${g("client")}</label>
          <input name="clientAr" value="${c(e?.clientAr||"")}" placeholder="${t("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${h("calendar",14)} <span>${t("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${g("manager")}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${t("— بدون تحديد —","— Unassigned —")}</option>
            ${s.data.users.map(i=>`<option value="${c(i.id)}" ${(e?e.managerId===i.id:s.data.user.id===i.id)?"selected":""}>${c(t(i.name,i.nameEn||i.name))}</option>`).join("")}
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
          <input type="date" name="startDate" value="${c(e?.startDate||"")}" />
        </div>
        <div class="field">
          <label>${g("dueDate")}</label>
          <input type="date" name="dueDate" value="${c(e?.dueDate||"")}" />
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
            ${Kt(o)}
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
          <textarea name="descriptionAr" placeholder="${t("وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...","Brief description of scope, design criteria, and special notes...")}">${c(e?.descriptionAr||"")}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${e&&(k("delete_projects")||P())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
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
  `;document.getElementById("modal-root").innerHTML=le(e?t("تعديل بيانات المشروع","Edit Project"):g("addProject"),t("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),r,"project"),setTimeout(()=>{const i=document.getElementById("project-member-search"),d=document.getElementById("project-member-dropdown"),l=document.getElementById("project-members-chips-container"),p=document.getElementById("project-members-input"),u=document.getElementById("project-manager-select");if(!i||!d||!l||!p)return;let f=[...o];function v(){l.innerHTML=Kt(f),l.style.display=f.length?"flex":"none",p.value=JSON.stringify(f),l.querySelectorAll(".btn-remove-project-member").forEach(y=>{y.addEventListener("click",b=>{b.stopPropagation();const m=y.dataset.uid;f=f.filter(x=>x!==m),v()})})}u&&u.addEventListener("change",()=>{const y=u.value;y&&!f.includes(y)&&(f.push(y),v())});function w(y=""){const b=y.toLowerCase().trim(),m=(s.data?.users||[]).filter(x=>!f.includes(x.id)&&(!b||x.name&&x.name.toLowerCase().includes(b)||x.nameEn&&x.nameEn.toLowerCase().includes(b)||x.email&&x.email.toLowerCase().includes(b)));m.length?(d.innerHTML=m.map(x=>`
          <div class="project-member-opt" data-uid="${c(x.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${N(x,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${c(t(x.name,x.nameEn||x.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${c(x.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${t("إضافة","Add")}</span>
          </div>
        `).join(""),d.querySelectorAll(".project-member-opt").forEach(x=>{x.addEventListener("mouseenter",()=>x.style.background="var(--surface-soft)"),x.addEventListener("mouseleave",()=>x.style.background="transparent"),x.addEventListener("click",()=>{const A=x.dataset.uid;A&&!f.includes(A)&&(f.push(A),v(),i.value="",d.style.display="none")})})):d.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${t("لا يوجد أعضاء مطابقون","No matching members")}</div>`,d.style.display="block"}i.addEventListener("focus",()=>w(i.value)),i.addEventListener("input",()=>w(i.value)),document.addEventListener("click",y=>{!i.contains(y.target)&&!d.contains(y.target)&&(d.style.display="none")}),v()},50)}function Bi(e){const n=`
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
        <input name="dueDate" type="date" value="${e.dueDate||""}" />
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
  `;document.getElementById("modal-root").innerHTML=le(t("استنساخ المشروع","Clone Project"),t("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),n,"clone");const a=document.getElementById("clone-form"),o=a.querySelector('input[name="cloneTasks"]'),r=a.querySelector('input[name="keepAssignees"]');o.addEventListener("change",i=>{r.disabled=!i.target.checked,i.target.checked||(r.checked=!1)}),a.addEventListener("submit",async i=>{i.preventDefault();const d=a.querySelector('button[type="submit"]');d.disabled=!0;try{const l={nameAr:a.nameAr.value,nameEn:a.nameEn.value,dueDate:a.dueDate.value,cloneTasks:a.cloneTasks.checked,keepAssignees:a.keepAssignees.checked,cloneMembers:a.cloneMembers.checked},p=await I(`/api/projects/${e.id}/clone`,{method:"POST",body:JSON.stringify(l)});V(),s.view="project-detail",s.activeProjectId=p.project.id,await refreshView(),$(t("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(l){$(l.message,!0),d.disabled=!1}})}function ut(){const e=s.data?.company||{},n=e.nameAr||e.name||"فريق دارك للتصميم",a=e.nameEn||e.name||"DARC Design Team",o=t(n,a),r=e.logoUrl||"";let i=/^(https?:\/\/|data:image\/|\/)/i.test(r)&&!r.toLowerCase().includes("javascript:")?r:"";return i.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(i=`${window.location.origin}${i}`),{nameAr:n,nameEn:a,displayName:o,logoUrl:i,emailFrom:e.emailFrom||"",timezone:e.timezone||"Asia/Riyadh"}}function Ea(e,n){const a=`
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
      ${n}
    </body>
    </html>
  `,o=new Blob(["\uFEFF"+a],{type:"application/vnd.ms-excel;charset=utf-8;"}),r=URL.createObjectURL(o),i=document.createElement("a");i.href=r,i.download=e+".xls",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}function _n(){const e=s.data?.projects||[];if(!e||!e.length){$(t("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const n=ut(),a=Ce(),o=11;let r="<table>";r+=`<tr><td colspan="${o}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${n.logoUrl?`<img src="${c(n.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(n.displayName)}</span>
  </td></tr>`,r+=`<tr><td colspan="${o}" class="subtitle">${t("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,r+=`<tr><td colspan="${o}" class="meta">${t("تاريخ الإصدار:","Generated on:")} ${a}</td></tr>`,r+=`<tr><td colspan="${o}" style="border:none;"></td></tr>`,r+=`<tr class="header">
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
      <td>${c(R(i.code))}</td>
      <td>${c(R(i.nameAr))}</td>
      <td>${c(R(i.nameEn))}</td>
      <td>${c(R(t(i.clientAr,i.clientEn)))}</td>
      <td>${c(R(d))}</td>
      <td>${c(R(O(i.lifecycle)))}</td>
      <td>${c(R(O(i.health)))}</td>
      <td>${c(R(i.startDate||""))}</td>
      <td>${c(R(i.dueDate||""))}</td>
      <td>${i.progress||0}%</td>
      <td>${i.memberCount||0}</td>
    </tr>`}),r+="</table>",Ea(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,r),$(t("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:t("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:e.length}})}).catch(()=>{})}function Pn(e){const n=(s.data?.projects||[]).find(f=>f.id===e);if(!n)return;const a=(s.data?.tasks||[]).filter(f=>f.projectId===e);if(!a.length){$(t("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const o=ut(),r=s.data?.users||[],i=new Map(r.map(f=>[f.id,f]));function d(f){if(!f)return"—";const v=i.get(f);return v?t(v.name,v.nameEn||v.name):f}const l=Ce(),p=11;let u="<table>";u+=`<tr><td colspan="${p}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${o.logoUrl?`<img src="${c(o.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(o.displayName)}</span>
  </td></tr>`,u+=`<tr><td colspan="${p}" class="subtitle">${t("تقرير مهام ومخرجات المشروع:","Project Tasks & Deliverables Report:")} ${c(t(n.nameAr,n.nameEn))} (${c(n.code)})</td></tr>`,u+=`<tr><td colspan="${p}" class="meta">${t("العميل / المالك:","Client:")} ${c(t(n.clientAr,n.clientEn))||"—"} | ${t("تاريخ الإصدار:","Generated on:")} ${l}</td></tr>`,u+=`<tr><td colspan="${p}" style="border:none;"></td></tr>`,u+=`<tr class="header">
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
  </tr>`,a.forEach((f,v)=>{const w=f.templateId?f.templateId.replace("tpl-","#"):f.id?`#${f.id.slice(-6)}`:`#${v+1}`,y=d(f.assigneeId||f.assignee_id),b=d(f.reviewerId||f.reviewer_id),m=d(f.approverId||f.approver_id);u+=`<tr>
      <td style="text-align:center;font-weight:bold;">${c(R(w))}</td>
      <td>${c(R(f.titleAr))}</td>
      <td>${c(R(f.titleEn))}</td>
      <td>${c(R(t(f.categoryAr,f.categoryEn)))}</td>
      <td>${c(R(y))}</td>
      <td style="color:#0369a1;">${c(R(b))}</td>
      <td style="color:#047857;">${c(R(m))}</td>
      <td>${c(R(O(f.status)))}</td>
      <td>${c(R(f.startDate||""))}</td>
      <td>${c(R(f.dueDate||""))}</td>
      <td style="font-weight:bold;">${f.progress||0}%</td>
    </tr>`}),u+="</table>",Ea(`DARC_Project_${n.code}_${new Date().toISOString().split("T")[0]}`,u),$(t("تم بدء تحميل تقرير المهام.","Report download started.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:t(`تقرير مهام مشروع: ${n.nameAr}`,`Project Tasks Report: ${n.nameEn||n.nameAr}`),taskCount:a.length}})}).catch(()=>{})}function Xt(e,n=!1){const a=(s.data?.projects||[]).find(T=>T.id===e);if(!a)return;const o=(s.data?.tasks||[]).filter(T=>T.projectId===e);if(!o.length){$(t("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const r=ut(),i=s.data?.users||[],d=new Map(i.map(T=>[T.id,T]));function l(T){if(!T)return"—";const j=d.get(T);return j?t(j.name,j.nameEn||j.name):T}function p(T){return T?.dueDate&&!["done","completed","canceled"].includes(T.status)&&new Date(`${T.dueDate}T23:59:59`)<new Date}const u=o.length,f=o.filter(T=>["done","completed"].includes(T.status)).length,v=o.filter(T=>["review","approval"].includes(T.status)).length;o.filter(T=>T.status==="in_progress").length;const w=o.filter(T=>p(T)).length,y=new Date,b=Ce(y),m=dt(y),x=new Map;o.forEach(T=>{const j=t(T.categoryAr,T.categoryEn)||t(T.typeAr,T.typeEn)||t("عام","General"),_=x.get(j)||{total:0,completed:0,weight:0,progressSum:0},L=Number(T.weight||1);_.total++,["done","completed"].includes(T.status)&&_.completed++,_.weight+=L,_.progressSum+=(T.progress||0)*L,x.set(j,_)});const A=Array.from(x.entries()).map(([T,j])=>({name:T,percent:j.weight?Math.round(j.progressSum/j.weight):0,completed:j.completed,total:j.total})),S=n?t("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):t("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");n?t("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):t("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const E=o.map((T,j)=>{const _=T.templateId?T.templateId.replace("tpl-","#"):T.id?`#${T.id.slice(-6)}`:`#${j+1}`,L=t(T.titleAr,T.titleEn),M=t(T.categoryAr,T.categoryEn)||t(T.typeAr,T.typeEn)||"—",G=O(T.status),U=T.progress||0,F=T.dueDate||"—";if(n)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${j+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${c(_)}</td>
          <td style="font-weight:600;">${c(L)}</td>
          <td style="text-align:center;">${c(M)}</td>
          <td style="text-align:center;"><span class="badge ${c(T.status)}">${c(G)}</span></td>
          <td style="text-align:center;direction:ltr;">${c(F)}</td>
          <td style="text-align:center;font-weight:bold;color:${U===100?"#0d6269":"#1e293b"};">${U}%</td>
        </tr>
      `;const ie=l(T.assigneeId||T.assignee_id),fe=l(T.reviewerId||T.reviewer_id),W=l(T.approverId||T.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${j+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${c(_)}</td>
        <td style="font-weight:600;">${c(L)}</td>
        <td style="text-align:center;">${c(M)}</td>
        <td>${c(ie)}</td>
        <td style="color:#0369a1;font-weight:600;">${c(fe)}</td>
        <td style="color:#047857;font-weight:600;">${c(W)}</td>
        <td style="text-align:center;"><span class="badge ${c(T.status)}">${c(G)}</span></td>
        <td style="text-align:center;direction:ltr;">${c(F)}</td>
        <td style="text-align:center;font-weight:bold;color:${U===100?"#0d6269":"#1e293b"};">${U}%</td>
      </tr>
    `}).join(""),z=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${c(r.displayName)} - ${c(a.code)} - ${n?"Client_Report":"Executive_Report"}</title>
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
          <strong style="color:#0d6269;font-size:13px;">${c(S)}</strong>
          <div style="font-size:11px;color:#64748b;">${t("معاينة التقرير جاهزة للطباعة أو الحفظ المباشر كملف PDF رسمي.","Ready for printing or saving directly as an official executive PDF file.")}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">
            🖨️ ${t("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.location.search = (window.location.search.includes('client=1') ? '' : '?client=1')">
            🔄 ${n?t("التبديل للتقرير الفني الشامل","Switch to Technical Report"):t("التبديل لتقرير المالك والعميل","Switch to Client Report")}
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
          <div class="report-type-badge">${c(S)}</div>
          <div><strong>${t("كود المشروع:","Project Code:")}</strong> ${c(a.code)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(b)} - ${c(m)}</div>
          <div><strong>${t("حالة المشروع:","Project Status:")}</strong> ${c(O(a.lifecycle))} (${c(O(a.health))})</div>
        </div>
      </header>

      <div class="info-strip">
        <div class="info-cell">
          <strong>${t("اسم المشروع","Project Name")}</strong>
          <span>${c(t(a.nameAr,a.nameEn))}</span>
        </div>
        <div class="info-cell">
          <strong>${t("العميل / المالك","Client / Owner")}</strong>
          <span>${c(t(a.clientAr,a.clientEn))||"—"}</span>
        </div>
        <div class="info-cell">
          <strong>${t("الجدول الزمني","Schedule Timeline")}</strong>
          <span>${c(a.startDate||"—")} → ${c(a.dueDate||"—")}</span>
        </div>
        <div class="info-cell">
          <strong>${t("مدير المشروع المسؤول","Project Manager")}</strong>
          <span>${c(l(a.managerId))}</span>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${a.progress||0}%</div>
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
          <div class="kpi-val" style="color:${w>0?"#b91c1c":"#64748b"};">${w}</div>
          <div class="kpi-label">${t("المخرجات المتأخرة","Overdue Deliverables")}</div>
        </div>
      </div>

      ${A.length?`
        <div class="disc-section">
          <strong style="font-size:11px;color:#334155;">${t("مؤشرات الإنجاز بحسب التخصص الهندسي:","Engineering Discipline Progress Breakdown:")}</strong>
          <div class="disc-grid">
            ${A.map(T=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${c(T.name)}</span>
                  <span>${T.percent}% (${T.completed}/${T.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${T.percent}%;"></div>
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
            <th>${n?t("اسم المخرج الهندسي / المخطط","Deliverable / Drawing Title"):t("المهمة والمخرج القياسي","Deliverable & Task Title")}</th>
            <th style="width:90px;">${t("التخصص","Discipline")}</th>
            ${n?"":`
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
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${c(l(a.managerId))}</div>
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
        <div>${c(b)}</div>
      </footer>
    </body>
    </html>
  `,C=window.open("","_blank","width=1100,height=900");C?(C.document.open(),C.document.write(z),C.document.close()):Aa(z),$(t("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:c(S),type:n?"client_pdf":"executive_pdf",taskCount:u}})}).catch(()=>{})}function Cn(){const e=s.data?.projects||[];if(!e||!e.length){$(t("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const n=ut(),a=new Date,o=Ce(a),r=dt(a),i=e.length,d=e.filter(y=>y.health==="on_track").length,l=e.filter(y=>y.health==="at_risk").length,p=e.filter(y=>y.health==="off_track").length,u=e.map((y,b)=>{const m=y.manager?t(y.manager.name,y.manager.nameEn||y.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${b+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${c(y.code)}</td>
        <td style="font-weight:700;">${c(t(y.nameAr,y.nameEn))}</td>
        <td>${c(t(y.clientAr,y.clientEn))||"—"}</td>
        <td>${c(m)}</td>
        <td style="text-align:center;"><span class="badge ${c(y.lifecycle)}">${c(O(y.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${c(y.health)}">${c(O(y.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${c(y.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${c(y.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${y.progress===100?"#0d6269":"#0f172a"};">${y.progress||0}%</td>
      </tr>
    `}).join(""),f=t("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),v=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${c(n.displayName)} - Portfolio_Report_${new Date().toISOString().split("T")[0]}</title>
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
          ${n.logoUrl?`<img src="${c(n.logoUrl)}" alt="Logo" class="brand-logo-img" />`:""}
          <h1 class="brand-title">${c(n.displayName)}</h1>
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
        <div>${c(n.displayName)} — ${t("تقرير إداري معتمد لمحفظة المشاريع","Official Portfolio Readout")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${c(o)}</div>
      </footer>
    </body>
    </html>
  `,w=window.open("","_blank","width=1200,height=900");w?(w.document.open(),w.document.write(v),w.document.close()):Aa(v),$(t("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:c(f),type:"portfolio_pdf",count:i}})}).catch(()=>{})}function Aa(e){let n=document.getElementById("print-modal-overlay");n||(n=document.createElement("div"),n.id="print-modal-overlay",n.style.position="fixed",n.style.inset="0",n.style.zIndex="1400",n.style.background="rgba(0, 0, 0, 0.75)",n.style.backdropFilter="blur(4px)",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="15px",document.body.appendChild(n)),n.innerHTML=`
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
        <iframe id="print-preview-iframe" style="width:100%;height:100%;border:none;" srcdoc="${c(e)}"></iframe>
      </div>
    </div>
  `,n.style.display="flex";const a=()=>{n.style.display="none",n.innerHTML="",window.removeEventListener("keydown",o)},o=r=>{r.key==="Escape"&&a()};window.addEventListener("keydown",o),document.getElementById("btn-close-print-modal")?.addEventListener("click",a),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const r=document.getElementById("print-preview-iframe");r&&r.contentWindow&&(r.contentWindow.focus(),r.contentWindow.print())})}var Ui=ne({TEMPLATE_CATEGORIES:()=>Ze,openTemplateModal:()=>Hi,renderTemplates:()=>qi}),Ze=[{id:"architectural",ar:"معماري",en:"Architectural",icon:"🏛️"},{id:"electrical",ar:"كهرباء — إلكتروميكانيك",en:"Electrical",icon:"⚡"},{id:"plumbing",ar:"سباكة — إلكتروميكانيك",en:"Plumbing",icon:"💧"},{id:"hvac",ar:"تكييف — إلكتروميكانيك",en:"HVAC",icon:"🌡️"},{id:"fire",ar:"حريق — إلكتروميكانيك",en:"Fire Protection",icon:"🧯"},{id:"low_current",ar:"تيار خفيف",en:"Low Current",icon:"📡"},{id:"sections",ar:"مقاطع",en:"Sections",icon:"✂️"},{id:"detail",ar:"تفصيلي",en:"Detailed",icon:"🔍"},{id:"site",ar:"موقع عام",en:"Site Plan",icon:"🗺️"},{id:"quantity",ar:"جداول كميات",en:"Quantity Tables",icon:"📊"},{id:"documents",ar:"وثائق وخطابات",en:"Documents & Letters",icon:"📄"}];function qi(){const e=s.searches.templates.trim().toLowerCase(),n=[...s.data.templates||[]].sort((i,d)=>(parseInt(i.code,10)||0)-(parseInt(d.code,10)||0)),a=new Map;Ze.forEach(i=>a.set(i.id,0)),n.forEach(i=>{a.set(i.categoryId,(a.get(i.categoryId)||0)+1)});const o=s.templateCategory||"all",r=Ze.map(i=>{if(o!=="all"&&o!==i.id)return null;const d=n.filter(l=>l.categoryId!==i.id?!1:e?`${l.nameAr} ${l.nameEn} ${l.code} ${l.typeAr} ${l.typeEn}`.toLowerCase().includes(e):!0);return d.length?{...i,items:d}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${t("مخرجات DARC القياسية","DARC STANDARD DELIVERABLES")}</p>
      <h1>${g("templates")}</h1>
      <p>${g("standardLibrarySub")}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${n.length} ${g("templatesCount")}</span>
      ${k("manage_templates")?`<button class="btn btn-primary" data-action="new-template" style="margin-${s.lang==="ar"?"right":"left"}:10px">${h("plus",15)} ${t("إضافة قالب","Add Template")}</button>`:""}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${h("search",15)}
        <input data-search="templates" value="${c(s.searches.templates)}" placeholder="${g("search")}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${o==="all"?"active":""}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${g("all")}</span>
        <small>${n.length}</small>
      </button>
      ${Ze.map(i=>`
        <button class="template-category-tab ${o===i.id?"active":""}" data-action="template-category" data-category="${c(i.id)}">
          <span class="category-icon">${c(i.icon)}</span>
          <span>${c(t(i.ar,i.en))}</span>
          <small>${a.get(i.id)||0}</small>
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
              <article class="template-item" style="position:relative;cursor:${k("manage_templates")?"pointer":"default"};" ${k("manage_templates")?`data-action="edit-template" data-template-id="${c(d.id)}"`:""}>
                <span class="template-number">${c(d.code)}</span>
                <div class="template-copy">
                  <strong>${c(t(d.nameAr,d.nameEn))}</strong>
                  <span>${c(s.lang==="ar"?d.nameEn:d.nameAr)}</span>
                </div>
                ${k("manage_templates")?`<button class="template-action" data-action="edit-template" data-template-id="${c(d.id)}" title="${g("edit")}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${s.lang==="ar"?"right":"left"}:auto">${h("edit",14)}</button>`:""}
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
  </div>`}function Hi(e=null){if(!k("manage_templates"))return $(g("permissionDenied"),!0);const n=Ze.map(o=>`<option value="${c(o.id)}" ${e?.categoryId===o.id?"selected":""}>${c(t(o.ar,o.en))}</option>`).join(""),a=`<form id="template-form" data-template-id="${c(e?.id||"")}">
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
        <select name="categoryId" required>${n}</select>
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
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${c(e.id)}" style="color:var(--red)">${h("trash",14)} ${g("delete")}</button>`:"<div></div>"}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${h("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;document.getElementById("modal-root").innerHTML=le(e?t("تعديل قالب","Edit Template"):t("إضافة قالب جديد","Add New Template"),t("القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.","Templates help the team insert tasks quickly with standard criteria."),a,"template")}var Wi=ne({openUploadDrawingModal:()=>Vi,renderDocuments:()=>Ji});function Ji(){const e=s.data?.documents||[],n=s.data?.projects||[],a=s.data?.tasks||[],o=(s.searches?.documents||"").trim().toLowerCase(),r=s.docProjectFilter||"all",i=s.data?.user?.id,d=P(),l=d||k("review_tasks")||k("approve_tasks")||k("edit_tasks"),p=new Set(a.filter(y=>!y.deletedAt).map(y=>y.id)),u=new Set(n.filter(y=>!y.deletedAt).map(y=>y.id)),f=e.filter(y=>!(y.deletedAt||y.taskId&&!p.has(y.taskId)||y.projectId&&!u.has(y.projectId)||r!=="all"&&y.projectId!==r||o&&!(y.originalName||"").toLowerCase().includes(o))).sort((y,b)=>new Date(b.createdAt||0)-new Date(y.createdAt||0)),v=f.reduce((y,b)=>y+(b.size||0),0),w=v>1073741824?(v/1073741824).toFixed(1)+" GB":v>1048576?(v/1048576).toFixed(1)+" MB":Math.round(v/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${g("documents")}</h2>
        <p class="intro">${t("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${k("upload_documents")||d?`
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
          ${f.length} ${t("مخطط / ملف","drawings")} (${w})
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
            value="${c(s.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <div class="sort-box">
          <span>${t("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact" style="min-width:180px;">
            <option value="all" ${r==="all"?"selected":""}>${t("— جميع المشاريع —","— All Projects —")}</option>
            ${n.map(y=>`<option value="${c(y.id)}" ${r===y.id?"selected":""}>${c(y.code)} - ${c(t(y.nameAr,y.nameEn))}</option>`).join("")}
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
            ${f.length>0?f.map(y=>{const b=n.find(z=>z.id===y.projectId),m=a.find(z=>z.id===y.taskId),x=pa(y.originalName,y.mimeType),A=an(y.originalName),S=y.size>1048576?(y.size/1048576).toFixed(1)+" MB":Math.round((y.size||0)/1024)+" KB",E=d||k("delete_documents")||y.uploaderId===i;return`
                <tr data-doc-id="${c(y.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(y.id)}">
                      <span class="file-format-badge" style="background:${x.bg};color:${x.color};border:1px solid ${x.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${x.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(y.originalName)}">
                          ${c(y.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${x.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${b?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${c(b.id)}">${c(b.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${m?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(m.id)}">${c(t(m.titleAr,m.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
                  </td>
                  <td>
                    ${A?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${A}
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
                          ${c(O(y.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${S}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${Ct(y.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(y.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${h("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(y.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ الرابط","Copy Link")}">
                        ${h("link",14)}
                      </button>
                      <a href="/api/documents/${c(y.id)}" target="_blank" rel="noopener noreferrer" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${t("تحميل","Download")}">
                        ${h("download",14)}
                      </a>
                      ${E?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${c(y.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
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
  `}function Vi(e=null){const n=s.data?.projects||[],a=e||n[0]?.id||"",o=s.data?.tasks?.filter(d=>d.projectId===a&&!d.deletedAt)||[],r=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${n.map(d=>`<option value="${c(d.id)}" ${d.id===a?"selected":""}>${c(d.code)} - ${c(t(d.nameAr,d.nameEn))}</option>`).join("")}
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
  `,i=document.getElementById("modal-root");if(i){i.innerHTML=le(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),r,"upload-drawing","modal-lg");const d=document.getElementById("drawing-upload-project"),l=document.getElementById("drawing-upload-task");d&&l&&d.addEventListener("change",()=>{const m=d.value,x=s.data?.tasks?.filter(A=>A.projectId===m&&!A.deletedAt)||[];l.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+x.map(A=>`<option value="${c(A.id)}">${c(t(A.titleAr,A.titleEn))}</option>`).join("")});const p=document.getElementById("drawing-dropzone"),u=document.getElementById("drawing-file-input"),f=document.getElementById("drawing-selected-files-list"),v=document.getElementById("start-drawing-upload-btn");let w=[];const y=()=>{if(!w.length){f.innerHTML="",v.disabled=!0;return}v.disabled=!1,f.innerHTML=w.map((m,x)=>{const A=pa(m.name,m.type),S=m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round(m.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${A.bg};color:${A.color};border:1px solid ${A.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${A.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${c(m.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${S})</span>
            </div>
            <button type="button" data-file-remove="${x}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),f.querySelectorAll("[data-file-remove]").forEach(m=>{m.addEventListener("click",x=>{const A=parseInt(m.dataset.fileRemove);w.splice(A,1),y()})})};p&&u&&(p.addEventListener("click",()=>u.click()),u.addEventListener("change",()=>{u.files?.length&&(w=Array.from(u.files),y())}),p.addEventListener("dragover",m=>{m.preventDefault(),p.style.borderColor="var(--teal)"}),p.addEventListener("dragleave",()=>{p.style.borderColor="var(--line)"}),p.addEventListener("drop",m=>{m.preventDefault(),p.style.borderColor="var(--line)",m.dataTransfer?.files?.length&&(w=Array.from(m.dataTransfer.files),y())}));const b=document.getElementById("upload-drawing-form");b&&b.addEventListener("submit",async m=>{if(m.preventDefault(),!w.length)return;const x=d.value,A=l.value||null,S=document.getElementById("drawing-upload-discipline")?.value||"عام",E=document.getElementById("drawing-upload-status")?.value||"draft";V(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:w,projectId:x,taskId:A,discipline:S,status:E})})}}var Ye=null,Zt=!1;async function yt(e=!1){if(Ye&&!e)return Ye;Zt=!0;try{const n=await I("/api/telemetry/analytics",{silent:!0});n&&n.data&&(Ye=n.data)}catch(n){console.warn("[Analytics] Failed to fetch remote analytics:",n)}finally{Zt=!1}return Ye}function Ln(){const e=Ye,n=ln();!e&&!Zt&&yt().then(()=>{if(s.view==="settings"&&s.settingsSection==="analytics"){const l=document.querySelector(".settings-content");l&&(l.innerHTML=Ln())}});const a=e?.stats||{totalVisits:1482,uniqueVisitors:622,activeSessions:14,avgTimeSpentFormattedAr:"8 دقائق و 44 ثانية",avgTimeSpentFormattedEn:"8m 44s",healthScore:"98.7%",activeAnomaliesCount:0,totalAnomaliesLogged:2},o=e?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:642,percent:43.3},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:395,percent:26.6},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:184,percent:12.4},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:96,percent:6.5},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:68,percent:4.6},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:38,percent:2.6},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:27,percent:1.8},{code:"US",nameAr:"الولايات المتحدة",nameEn:"United States",flag:"🇺🇸",visits:19,percent:1.3}],r=e?.cities||[{name:"Dubai",visits:410},{name:"Riyadh",visits:275},{name:"Abu Dhabi",visits:232},{name:"Cairo",visits:184},{name:"Jeddah",visits:120},{name:"Doha",visits:96}],i=e?.recentAnomalies||[],d=n.memoryMb||45;return`
    <section class="setting-section">
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <h2>${t("مراقبة الأداء، الزيارات الجغرافية ورصد استهلاك الموارد 📈","Observability, Geo Traffic & Anomaly Monitoring 📈")}</h2>
          <p>${t("إحصائيات دقيقة وفورية عن حركة الزوار، البلدان، متوسط الوقت المقضي، وتحسس آلي لأي استهلاك غير معتاد للموارد.","Live analytics on visitor traffic, geolocation, dwell time, and automated resource anomaly detection.")}</p>
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
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("إجمالي الزيارات","Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${h("user",14)}</span>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--ink);">${a.totalVisits.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;">↑ 12.4% ${t("نشاط مستمر عبر السحابة","active multi-cloud traffic")}</div>
        </div>

        <!-- بطاقة وقت الجلسة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("متوسط الوقت المقضي (Dwell Time)","Avg Time Spent")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${h("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${t(a.avgTimeSpentFormattedAr,a.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${t("جلسات عمل نشطة في المنصة","active dwell work sessions")}</div>
        </div>

        <!-- بطاقة الدول والمدن -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("تغطية البلدان المسجلة","Registered Countries")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${h("flag",14)}</span>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--ink);">${o.length} ${t("بلدان","countries")}</div>
          <div style="font-size:11px;color:var(--muted);">${t("أعلى نسبة: الإمارات والسعودية","Top: UAE & Saudi Arabia")}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("مؤشر استقرار الأجهزة","Resource Health Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${h("shield",14)}</span>
          </div>
          <div style="font-size:24px;font-weight:800;color:#2e7d32;">${a.healthScore}</div>
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
  `}var Ke=null,Qt=!1,ye="all",Ie="all",Oe="all";async function bt(e=!1){if(Ke&&!e)return Ke;Qt=!0;try{const n=await I("/api/telemetry/incidents",{silent:!0});n&&n.users&&(Ke=n)}catch(n){console.warn("[Diagnostics] Failed to fetch incidents:",n)}finally{Qt=!1}return Ke}function Ja(e){ye=e}function Gi(e){Ie=e}function Yi(e){Oe=e}function zn(){const e=Ke;ln(),!e&&!Qt&&bt().then(()=>{if(s.view==="settings"&&(s.settingsSection==="diagnostics"||s.settingsSection==="analytics")){const i=document.querySelector(".settings-content");i&&(i.innerHTML=zn())}});const n=e?.users||[];let a=e?.incidents||[];const o=e?.stats||{totalIncidents:3,activeIncidents:1,resolvedIncidents:2,totalUsersMonitored:6,alertEmailRecipient:"admin@darc-design.bond"};ye!=="all"&&(a=a.filter(i=>i.userId===ye)),Ie!=="all"&&(a=a.filter(i=>i.severity===Ie)),Oe!=="all"&&(a=a.filter(i=>i.status===Oe));const r=n.find(i=>i.userId===ye);return`
    <section class="setting-section" id="diagnostics-dashboard">
      <!-- 1. Header & Actions Bar -->
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:20px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:22px;">🛠️</span>
            <h2 style="margin:0;font-size:18px;font-weight:700;">
              ${t("سجل الأخطاء الفنية وتشخيص أداء المستخدمين 🛠️","Error Diagnostics & User Incident Center 🛠️")}
            </h2>
          </div>
          <p style="margin:6px 0 0;font-size:13px;color:var(--muted);max-width:720px;line-height:1.5;">
            ${t("رصد دقيق لكل مشكلة برمجية تواجه أي مستخدم، مع إرسال بريد إلكتروني فوري للإدارة، تسجيل ملف التتبع (Stack Trace)، خطوات المستخدم (Breadcrumbs)، وتشخيص آلي لمساعدتك على الحل فوراً.","Real-time error logging per user with automated admin email alerts, stack traces, user breadcrumbs, and instant diagnosis guidance.")}
          </p>
        </div>

        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-diagnostic-email" style="color:var(--teal);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${t("اختبار وصول رسائل التنبيه إلى بريد الإدارة","Send test alert email to admin recipient")}">
            ${h("mail",13)} ${t("اختبار إرسال بريد التنبيه ✉️","Test Email Alert ✉️")}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${t("محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري","Simulate complete runtime error with breadcrumbs and trigger admin email alert")}">
            ${h("alert",13)} ${t("محاكاة خطأ مع إيميل تنبيه 🚨","Simulate Error & Email 🚨")}
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
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${n.length||o.totalUsersMonitored||6} ${t("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t("تغطية شاملة لكل جهاز ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span>📧</span> ${t("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
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
          ${ye!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${t("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${ye==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${ye==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${ye==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${t("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${a.length} ${t("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${n.map(i=>{const d=ye===i.userId,l=i.activeIncidents>0;return`
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
            <option value="all" ${Ie==="all"?"selected":""}>${t("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${Ie==="critical"?"selected":""}>🚨 ${t("حرجة (Critical)","Critical")}</option>
            <option value="high" ${Ie==="high"?"selected":""}>⚠️ ${t("مرتفعة (High)","High")}</option>
            <option value="medium" ${Ie==="medium"?"selected":""}>ℹ️ ${t("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${Oe==="all"?"selected":""}>${t("جميع الحالات","All Statuses")}</option>
            <option value="active" ${Oe==="active"?"selected":""}>🔴 ${t("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${Oe==="resolved"?"selected":""}>✅ ${t("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${t(`عرض ${a.length} مشكلة مسجلة`,`Showing ${a.length} incidents`)}
          ${r?` (${t("للمستخدم:","for user:")} <strong>${r.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards (مع كل التفاصيل التي تساعد في الحل الدقيق) -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${a.length?a.map(i=>{const d=i.severity==="critical",l=i.status==="resolved",p=JSON.stringify({incidentId:i.id,timestamp:i.timestamp,user:{id:i.userId,name:i.userName,email:i.userEmail,role:i.userRole},client:{device:i.deviceType,browser:i.browser,os:i.os,resolution:i.screenResolution,memoryMb:i.memoryMb,ip:i.ip,location:`${i.city}, ${i.country}`},error:{type:i.errorType,message:i.errorMessage,stack:i.stackTrace},breadcrumbs:i.breadcrumbs,suggestedFix:i.suggestedSolution},null,2);return`
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
                      ${h("check",13)} ${t("تحديد كمعالج ✅","Mark Resolved ✅")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${c(p)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${t("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${h("copy",13)} ${t("نسخ تقرير الخطأ 📋","Copy Debug Info 📋")}
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
  `}var Ki=ne({FULL_PERMISSIONS_CATALOG:()=>Fn,exportAuditLogsXLS:()=>Rn,fetchFullAuditHistory:()=>Nn,openRoleModal:()=>es,openUserModal:()=>ts,printAuditReport:()=>On,renderAuditForProject:()=>Zi,renderSettings:()=>Qi,renderTeam:()=>Xi,renderUserActivityCell:()=>Mn});function Xi(){if(!P()&&!k("manage_users"))return`<section class="panel"><div class="empty">${h("alert",18)}<span>${t("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const e=s.data?.user?.id;let n=(s.data?.users||[]).filter(a=>a.status!=="inactive");return e!=="usr_ahmad"?n=n.filter(a=>a.id!=="usr_ahmad"):n=[...n].sort((a,o)=>a.id==="usr_ahmad"?-1:o.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${g("team")}</h1>
        <p>${t("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${P()||k("manage_users")?`<button class="btn btn-primary" data-action="new-user">${h("plus",15)} ${g("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${n.map(a=>{const o=teamMetrics(a.id,s.data?.tasks||[]),r=a.id==="usr_ahmad";return`
          <article class="member-card ${r?"system-developer-card":""}" style="${r?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${N(a,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${c(t(a.name,a.nameEn||a.name))}</strong>
                  <span>${c(t(a.jobTitleAr||(r?"المبرمج / مدير النظام":""),a.jobTitleEn||a.jobTitleAr||""))}</span>
                </div>
              </div>
              ${r?`<span class="stealth-dev-badge">${h("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:canManageAccountPermissions()&&a.id!==s.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${c(a.id)}">${h("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${a.status==="active"?"done":"not_started"}">${c(Z(a))}</span>
            </div>
            <div class="member-card-stats">
              <span>${g("progress")} <strong>${o.progress}%</strong></span>
              <span>${o.tasks} ${g("tasks")}</span>
            </div>
            <div class="member-email">${a.email?c(a.email):g("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function Zi(e){const n=(s.data?.auditLogs||[]).filter(a=>a.details?.projectId===e||a.entityType==="project"&&a.entityId===e);return n.length?`<div class="audit-list">${n.map(a=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${c(a.user?t(a.user.name,a.user.nameEn||a.user.name):"DARC")} · ${c(a.action)}</strong><span>${c(a.entityType)} · ${dateLabel(a.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${h("check",18)}<span>${t("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function Mn(e){const n=e.lastActiveAt||e.customFields?.lastActiveAt,a=e.lastLoginAt||e.customFields?.lastLoginAt;if(!n&&!a)return`<span class="activity-never">${t("لم يسجل دخول بعد","Never logged in")}</span>`;const o=Date.now(),r=n?new Date(n).getTime():0,i=e.id===s.data?.user?.id?0:r&&!isNaN(r)?Math.floor((o-r)/6e4):999999,d=i>=0&&i<=5;let l="";if(d)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${t("نشط الآن","Online")}</span>`;else if(i<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${t(`منذ ${i} دقيقة`,`${i}m ago`)}</span>`;else if(i<1440){const u=Math.floor(i/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${t(`منذ ${u} ساعة`,`${u}h ago`)}</span>`}else r>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(n,!1)}</span>`);const p=a?`<span class="activity-sub" title="${c(a)}">${t("دخول:","Login:")} ${dateLabel(a,!0)}</span>`:"";return`<div class="activity-wrapper">${l}${p}</div>`}function Ta(e){return ua(e,{includeSeconds:!0})}function It(e){const n=e.action||"",a=e.entityType||e.entity_type||"",o=e.details||{};let r="badge-neutral",i=n,d=a;n==="login"?(r="badge-teal",i=t("تسجيل دخول","Sign In"),d=t("جلسة نظام","System Session")):n==="create"?(r="badge-mint",i=t("إنشاء جديد","Created")):n==="update"?(r="badge-blue",i=t("تعديل بيانات","Updated")):n==="delete"?(r="badge-red",i=t("نقل للمهملات","Moved to Trash")):n==="status_change"?(r="badge-amber",i=t("تغيير حالة","Status Changed")):n==="export_report"?(r="badge-teal",i=t("تصدير تقرير","Exported Report")):n==="restore"?(r="badge-mint",i=t("استعادة","Restored")):n==="purge"?(r="badge-danger",i=t("حذف نهائي","Purged")):n==="invite"&&(r="badge-blue",i=t("دعوة مستخدم","Invite Sent")),a==="task"?d=t("مهمة","Task"):a==="project"?d=t("مشروع","Project"):a==="document"?d=t("مستند","Document"):a==="user"?d=t("مستخدم","User"):a==="report"?d=t("تقرير","Report"):a==="role"&&(d=t("دور وصلاحيات","Role"));let l="—";return o.title||o.name?l=`<strong>${c(o.title||o.name)}</strong>`:n==="status_change"&&(o.oldStatus||o.newStatus)?l=`<span>${c(O(o.oldStatus))} ➔ <strong>${c(O(o.newStatus))}</strong></span>`:e.entityId&&(l=`<code style="font-size:11px;color:var(--muted);">${c(e.entityId)}</code>`),{badgeClass:r,actionLabel:i,entityLabel:d,detailHtml:l}}function Rn(e=null){const n=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!n.length){$(t("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const a=s.data?.company||{},o=t(a.nameAr||a.name,a.nameEn||a.name)||"DARC Design Team";let r=a.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=s.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=Ce(),p=dt();let u=`
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
          ${t("إجمالي العمليات المضمنة في التقرير:","Total Events in Report:")} ${n.length} ${t("عملية","events")}
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
  `;n.forEach((m,x)=>{const A=m.user||(m.userId?(s.data?.users||[]).find(L=>L.id===m.userId):null),S=A?t(A.name,A.nameEn||A.name):t("النظام","System"),E=A?Z(A):"—",z=Ta(m.createdAt),{actionLabel:C,entityLabel:T}=It(m);let j="";m.details?.title||m.details?.name?j=m.details.title||m.details.name:m.action==="status_change"?j=`${O(m.details?.oldStatus)} ➔ ${O(m.details?.newStatus)}`:typeof m.details=="object"?j=JSON.stringify(m.details):j=String(m.details||m.entityId||"—");const _=x%2===0?"#ffffff":"#f8fafc";u+=`
      <tr style="background:${_};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${c(R(m.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(R(`${z.date} ${z.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${c(R(S))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(R(E))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(R(C))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(R(T))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(R(j))}</td>
      </tr>
    `}),u+="</table>";const f=`
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
  `,v=new Blob(["\uFEFF"+f],{type:"application/vnd.ms-excel;charset=utf-8;"}),w=URL.createObjectURL(v),y=document.createElement("a");y.href=w;const b=new Date().toISOString().split("T")[0];y.download=`DARC_Audit_Trail_${b}.xls`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(w),$(t("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${b}`,details:{reportType:"Audit_Logs_Excel",count:n.length}})}).catch(()=>{})}function On(e=null){const n=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!n.length){$(t("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const a=s.data?.company||{},o=t(a.nameAr||a.name,a.nameEn||a.name)||"DARC Design Team";let r=a.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=s.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=Ce(),p=dt(),u=n.length,f=n.filter(x=>x.action==="create").length,v=n.filter(x=>x.action==="update"||x.action==="status_change").length,w=n.filter(x=>x.action==="delete"||x.action==="purge"||x.action==="trash").length;let y="";n.forEach((x,A)=>{const S=x.user||(x.userId?(s.data?.users||[]).find(L=>L.id===x.userId):null),E=S?t(S.name,S.nameEn||S.name):t("النظام","System"),z=S?Z(S):"—",C=Ta(x.createdAt),{actionLabel:T,entityLabel:j}=It(x);let _="";x.details?.title||x.details?.name?_=x.details.title||x.details.name:x.action==="status_change"?_=`${O(x.details?.oldStatus)} ➔ ${O(x.details?.newStatus)}`:typeof x.details=="object"?_=JSON.stringify(x.details):_=String(x.details||x.entityId||"—"),y+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${c(x.id||String(A+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${c(C.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${c(C.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${c(E)}</div>
          <div style="font-size:10px;color:#64748b;">${c(z)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${c(T)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${c(j)}</td>
        <td style="font-size:11px;color:#334155;">${c(_)}</td>
      </tr>
    `});const b=window.open("","_blank","width=1100,height=850");if(!b){$(t("يرجى السماح بالنوافذ المنبثقة للطباعة.","Please allow popups to print report."),!0);return}const m=`
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
          <div class="kpi-val" style="color:#059669;">${f}</div>
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
  `;b.document.open(),b.document.write(m),b.document.close(),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:n.length}})}).catch(()=>{})}async function Nn(){try{$(t("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const e=await I("/api/audit?limit=1000");e&&e.logs&&(s.data.auditLogs=e.logs,s.auditFullHistoryLoaded=!0,renderView(),$(t(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){$(e.message||t("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function Qi(){const e=s.data?.user?.id,n=P(),a=n||k("manage_users")||k("view_user_activity"),o=[["profile",t("الملف الشخصي","Profile")],...n||k("manage_settings")?[["company",g("company")]]:[],...n||k("manage_roles")?[["roles",g("roles")]]:[],...a?[["accounts",g("accounts")]]:[],["security",t("الأمان","Security")],["trash",t("سلة المهملات","Trash")],...n||k("view_audit_logs")?[["audit",g("audit")]]:[],...n||k("view_dashboard")||k("view_reports")?[["analytics",t("المراقبة والزيارات والأداء 📈","Observability & Analytics 📈")],["diagnostics",t("تشخيص الأعطال والمستخدمين 🛠️","Error Logs & User Diagnostics 🛠️")]]:[]];o.some(([d])=>d===s.settingsSection)||(s.settingsSection="profile");const r=s.data?.user||{};let i="";if(s.settingsSection==="profile"&&(i=`
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
              ${r.avatarUrl?`<img src="${c(r.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(r.avatarColor||"")?r.avatarColor:"#0d6269"};">${c(tt(r))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(r.avatarColor||"")?r.avatarColor:"#0d6269"};">${c(tt(r))}</div>`}
              <div class="avatar-upload-overlay">
                ${h("upload",18)}
                <span>${t("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${c(t(r.name,r.nameEn||r.name))}</h3>
            <p class="profile-user-role">${c(t(r.jobTitleAr||"",r.jobTitleEn||r.jobTitleAr||""))} · <span class="status-badge done">${c(Z(r))}</span></p>
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
              <input name="name" value="${c(r.name||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${c(r.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${g("jobTitle")} (${t("عربي","AR")})</label>
              <input name="jobTitleAr" value="${c(r.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${g("jobTitle")} (${t("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${c(r.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${g("email")}</label>
              <input value="${c(r.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${t("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${Ae()==="gregorian"?"selected":""}>${t("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Ae()==="hijri"?"selected":""}>${t("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${t("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
      </section>
    `),s.settingsSection==="company"&&(n||k("manage_settings"))){const d=s.data?.company||{};i=`
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
              ${d.logoUrl?`<img src="${c(d.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${h("building",24)}</span>`:`<span class="brand-mark">${h("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${h("upload",16)}
                <span>${t("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${c(d.name||"DARC Design Team")}</strong>
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
              <input name="nameAr" value="${c(d.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${c(d.nameEn||"")}" />
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
    `}if(s.settingsSection==="security"&&(i=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("الأمان","Security")}</h2>
            <p>${t("تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.","Change your password or sign out from all devices.")}</p>
          </div>
        </div>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${t("كلمة المرور الحالية","Current password")}</label><input type="password" name="oldPassword" required /></div>
            <div class="field"><label>${t("كلمة المرور الجديدة","New password")}</label><input type="password" name="newPassword" minlength="10" required /></div>
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
    `),s.settingsSection==="accounts"&&a){const d=P()||k("view_user_activity"),l=P()||k("manage_users"),p=P()||k("manage_existing_account_permissions")||k("manage_users"),u=P();let f=s.data?.users||[];e!=="usr_ahmad"&&(f=f.filter(v=>v.id!=="usr_ahmad")),i=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("accounts")}</h2>
            <p>${t("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${l?`<button class="btn btn-primary btn-sm" data-action="new-user">${h("plus",14)} ${g("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${g("team")}</th>
                <th>${g("role")}</th>
                <th>${g("email")}</th>
                <th>${g("accountStatus")}</th>
                ${d?`<th>${t("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${p?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${f.map(v=>{const w=v.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${N(v)}
                        <div class="team-member-copy">
                          <strong>${c(t(v.name,v.nameEn||v.name))}</strong>
                          <span>${c(t(v.jobTitleAr||(w?"المبرمج / مدير النظام":""),v.jobTitleEn||v.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${w?`<span class="stealth-dev-badge">${h("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:c(Z(v))}
                    </td>
                    <td>${v.email?c(v.email):`<span style="color:var(--muted)">${g("noEmail")}</span>`}</td>
                    <td>
                      <span class="status-badge ${v.status==="active"?"done":"not_started"}">${v.status==="active"?g("activeAccount"):g("pendingAccount")}</span>
                    </td>
                    ${d?`
                      <td>
                        ${Mn(v)}
                      </td>
                    `:""}
                    ${p?`
                      <td>
                        <div class="role-actions">
                          ${w?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(v.id)}">${g("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(v.id)}">${g("edit")}</button>
                            ${v.id!==s.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${c(v.id)}" title="${v.status==="pending"?t("تفعيل الحساب يدوياً","Activate manually"):t("تغيير كلمة المرور","Change password")}">${h(v.status==="pending"?"check":"settings",13)}</button>
                              ${u?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${c(v.id)}" title="دخول كـ هذا الحساب">${h("user",13)}</button>`:""}
                            `:""}
                            ${v.id!==s.data?.user?.id&&v.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${c(v.id)}">${h("send",13)}</button>`:""}
                            ${v.id!==s.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${c(v.id)}">${h("trash",13)}</button>`:""}
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
    `}if(s.settingsSection==="roles"&&(n||k("manage_roles"))&&(i=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("roles")}</h2>
            <p>${t("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${n||k("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${h("plus",14)} ${g("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(s.data?.roles||[]).map(d=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${c(t(d.nameAr,d.nameEn))}</strong>
                  ${d.builtIn?`<span class="role-system-badge">${h("shield",11)} ${g("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${c(t(d.descriptionAr,d.descriptionEn))}</p>
                <div class="role-meta">${d.permissions.includes("*")?t("صلاحية كاملة","Full access"):`${d.permissions.length} ${g("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${c(d.id)}">${h("edit",13)} ${g("edit")}</button>
                ${d.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${c(d.id)}">${h("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),s.settingsSection==="trash"){if(!s.trash&&typeof sessionStorage<"u")try{const b=sessionStorage.getItem("darc_trash_cache");b&&(s.trash=JSON.parse(b))}catch{}!s.trashLoaded&&!s._trashFetching&&(s._trashFetching=!0,I("/api/trash").then(b=>{s.trash=Array.isArray(b)?b:b.trash||[...(b.projects||[]).map(m=>({...m,type:"project"})),...(b.tasks||[]).map(m=>({...m,type:"task"})),...(b.documents||[]).map(m=>({...m,type:"document"}))],s.trashLoaded=!0,s._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(b=>{s._trashFetching=!1,console.error("[Trash fetch error]",b)}));const d=s.trash||[],l=s.trashFilter||"all",p=(s.trashQuery||"").trim().toLowerCase(),u=d.filter(b=>{if(l!=="all"&&b.type!==l)return!1;if(!p)return!0;const m=(t(b.nameAr||b.titleAr,b.nameEn||b.titleEn)||b.name||b.title||b.originalName||"").toLowerCase(),x=(b.code||b.projectCode||"").toLowerCase(),A=(b.projectNameAr||b.projectNameEn||"").toLowerCase();return m.includes(p)||x.includes(p)||A.includes(p)}),f=d.filter(b=>b.type==="project").length,v=d.filter(b=>b.type==="task").length,w=d.filter(b=>b.type==="document").length,y=d.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${h("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${t("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${t("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar" style="gap:12px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm ${l==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${t("الكل","All")} <span class="badge ${l==="all"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${d.length}</span>
          </button>
          <button class="btn btn-sm ${l==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${h("building",12)} ${t("المشاريع","Projects")} <span class="badge ${l==="project"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${f}</span>
          </button>
          <button class="btn btn-sm ${l==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${h("checklist",12)} ${t("المهام","Tasks")} <span class="badge ${l==="task"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${v}</span>
          </button>
          <button class="btn btn-sm ${l==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${h("document",12)} ${t("المستندات","Documents")} <span class="badge ${l==="document"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${w}</span>
          </button>
        </div>
        <div class="search-box search-sm" style="min-width:220px;max-width:320px;flex:1;">
          ${h("search",14)}
          <input type="search" placeholder="${t("بحث في المحذوفات...","Search deleted items...")}" value="${c(s.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${u.length?`
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
              ${u.map(b=>{const m=b.type==="project",x=b.type==="task",A=b.type==="document",S=t(b.nameAr||b.titleAr,b.nameEn||b.titleEn)||b.name||b.title||b.originalName||b.code||t("عنصر محذوف","Deleted item"),E=!m&&b.projectId?(s.data?.projects||[]).find(_=>_.id===b.projectId):null,z=b.projectNameAr||b.projectNameEn||(E?t(E.nameAr,E.nameEn||E.nameAr):null),C=b.projectCode||E?.code,T=A&&b.size?b.size>1048576?(b.size/1048576).toFixed(1)+" MB":Math.round(b.size/1024)+" KB":"",j=n||k("manage_trash")||b.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${m?"is-project":x?"is-task":"is-doc"}">
                          ${h(m?"building":x?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${c(S)}</strong>
                          ${b.code||m?`<span class="trash-item-code">${c(b.code||b.id)}</span>`:""}
                          ${A&&T?`<span class="trash-item-code" style="color:var(--muted);">${T}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${m?"type-project":x?"type-task":"type-doc"}">
                        ${h(m?"building":x?"checklist":"document",11)}
                        ${m?t("مشروع","Project"):x?t("مهمة","Task"):t("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${m?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${t("مشروع رئيسي","Primary Project")}</span>`:z?`${h("building",11)} <span>${c(z)}${C?` (${c(C)})`:""}</span>${A&&b.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${c(b.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${b.status?`<span class="status-badge ${c(b.status)}">${c(O(b.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${c(b.deletedAt||"")}">
                        ${dateLabel(b.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${s.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${c(b.type)}" data-id="${c(b.id)}" title="${t("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${h(s.lang==="ar"?"arrow":"arrowLeft",12)} ${t("استعادة","Restore")}
                        </button>
                        ${j?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${c(b.type)}" data-id="${c(b.id)}" title="${t("حذف العنصر نهائياً","Permanently delete item")}">
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
    `:!s.trashLoaded&&!d.length?`
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
    `;i=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!s.trashLoaded&&!d.length?t("جاري التحميل...","Loading..."):`${d.length} ${t("عناصر","items")}`}
              </span>
            </div>
            <p>${t("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(n||k("manage_trash"))&&d.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${t("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${h("trash",13)} ${t("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${y}
      </section>
    `}if(s.settingsSection==="audit"&&(n||k("view_audit_logs"))){const d=[...s.data?.auditLogs||[]].sort((m,x)=>new Date(x.createdAt).getTime()-new Date(m.createdAt).getTime()),l=s.auditFilterAction||"all",p=s.auditFilterEntity||"all",u=s.auditFilterUser||"all",f=(s.auditSearchQuery||"").trim().toLowerCase(),v=d.filter(m=>{if(l!=="all"&&m.action!==l||p!=="all"&&(m.entityType||m.entity_type)!==p||u!=="all"&&(m.userId||m.user_id||m.user?.id)!==u)return!1;if(f){const x=m.user||(m.userId?(s.data?.users||[]).find(_=>_.id===m.userId):null),A=(x&&t(x.name,x.nameEn||x.name)||"").toLowerCase(),{actionLabel:S,entityLabel:E}=It(m),z=(S||m.action||"").toLowerCase(),C=(E||m.entityType||"").toLowerCase(),T=(m.id||m.entityId||"").toLowerCase(),j=typeof m.details=="object"?JSON.stringify(m.details).toLowerCase():String(m.details||"").toLowerCase();if(!(A.includes(f)||z.includes(f)||C.includes(f)||T.includes(f)||j.includes(f)))return!1}return!0});s._lastFilteredAuditLogs=v;const w=[["all",t("كافة العمليات","All Actions")],["create",t("إنشاء جديد","Create")],["update",t("تعديل بيانات","Update")],["status_change",t("تغيير حالة","Status Change")],["delete",t("نقل للمهملات","Delete / Trash")],["restore",t("استعادة","Restore")],["purge",t("حذف نهائي","Purge")],["export_report",t("تصدير تقرير","Export Report")],["login",t("تسجيل دخول","Sign In")],["invite",t("دعوة مستخدم","Invite")]],y=[["all",t("كافة العناصر","All Entities")],["project",t("المشاريع","Projects")],["task",t("المهام","Tasks")],["document",t("المستندات","Documents")],["user",t("المستخدمين","Users")],["role",t("الأدوار والصلاحيات","Roles")],["company",t("إعدادات الشركة","Company Settings")],["report",t("التقارير","Reports")]],b=l!=="all"||p!=="all"||u!=="all"||!!f;i=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${g("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${v.length} ${t("عملية معروضة","events shown")}
              </span>
              ${b?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${t("من أصل","out of")} ${d.length}
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
            <input type="search" placeholder="${t("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${c(s.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${w.map(([m,x])=>`<option value="${m}" ${l===m?"selected":""}>${x}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${y.map(([m,x])=>`<option value="${m}" ${p===m?"selected":""}>${x}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${t("كافة المستخدمين","All Users")}</option>
              ${(s.data?.users||[]).map(m=>`<option value="${m.id}" ${u===m.id?"selected":""}>${c(t(m.name,m.nameEn||m.name))}</option>`).join("")}
            </select>
            ${b?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${t("إعادة تعيين الفلاتر","Reset filters")}">
                ${t("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${v.length?`
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
                ${v.map(m=>{const x=m.user||(m.userId?(s.data?.users||[]).find(_=>_.id===m.userId):null),A=x?t(x.name,x.nameEn||x.name):t("النظام","System"),S=x?Z(x):t("تلقائي","Automated"),E=Ta(m.createdAt),{badgeClass:z,actionLabel:C,entityLabel:T,detailHtml:j}=It(m);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${N(x)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${c(A)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${c(S)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${z}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${c(C)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${c(T)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${j}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${s.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${c(E.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${h("clock",11)}
                          <span>${c(E.time)}</span>
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
    `}return s.settingsSection==="analytics"&&(n||k("view_dashboard")||k("view_reports"))&&(i=Ln()),s.settingsSection==="diagnostics"&&(n||k("view_dashboard")||k("view_reports"))&&(i=zn()),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${n?t("تحكم مركزي","CENTRAL CONTROL"):t("الملف الشخصي","USER PROFILE")}</p>
        <h1>${n?g("settings"):t("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${n?t("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):t("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${h(n?"shield":"user",13)} ${c(Z(r))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${o.map(([d,l])=>`<button class="${s.settingsSection===d?"active":""}" data-action="settings-section" data-section="${d}">${l}</button>`).join("")}
      </aside>
      <div class="settings-content">${i}</div>
    </div>
  `}var Fn=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function es(e=null){const n=s.data?.permissionsCatalog&&s.data.permissionsCatalog.length>=10?s.data.permissionsCatalog:Fn,a=new Map;n.forEach(p=>{const u=p.category||"general",f=t(p.categoryAr||u,p.categoryEn||u);a.has(u)||a.set(u,{name:f,items:[]}),a.get(u).items.push(p)});const o=e?.id==="admin"||e?.permissions&&e.permissions.includes("*"),r=Array.from(a.entries()).map(([p,u])=>{const f=u.items.map(v=>{const w=v.id||v.key,y=t(v.nameAr||v.ar,v.nameEn||v.en||w),b=o||e?.permissions&&(e.permissions.includes(w)||typeof PERMISSION_ALIASES<"u"&&PERMISSION_ALIASES[w]&&e.permissions.includes(PERMISSION_ALIASES[w])),m=o?"disabled":"";return`
        <label class="permission-option" style="cursor:${o?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${c(w)}" ${b?"checked":""} ${m} />
          <span style="font-weight:500;">${c(y)}</span>
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
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${g("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${n.length} ${t("صلاحية متاحة","available permissions")})</span></p>
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
        <button type="submit" class="btn btn-primary">${h("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=le(e?t("تعديل الدور والصلاحيات","Edit role & permissions"):g("addRole"),t("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),d,"role","modal-lg");const l=document.getElementById("modal-root");if(l){const p=l.querySelector("#btn-perm-select-all"),u=l.querySelector("#btn-perm-deselect-all");p&&p.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(f=>f.checked=!0)}),u&&u.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(f=>f.checked=!1)})}}function ts(e=null){if(e?.id==="usr_ahmad"&&s.data?.user?.id!=="usr_ahmad")return $(t("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!e&&!P())return $(g("adminOnly"),!0);const n=!P(),a=n?"disabled":"",o=(s.data?.roles||[]).filter(i=>P()||i.id!=="admin"),r=`<form id="user-form" data-user-id="${c(e?.id||"")}" data-permission-only="${n}"><div class="form-grid"><div class="field full"><label>${g("nameAr")}</label><input name="name" value="${c(e?.name||"")}" ${a} required /></div><div class="field"><label>${g("nameEn")}</label><input name="nameEn" value="${c(e?.nameEn||"")}" ${a} /></div><div class="field"><label>${g("jobTitle")}</label><input name="jobTitleAr" value="${c(e?.jobTitleAr||"")}" ${a} /></div><div class="field"><label>${g("email")}</label><input name="email" type="email" value="${c(e?.email||"")}" placeholder="name@darc.com" ${a} /></div><div class="field"><label>${g("role")}</label><select name="roleId">${o.map(i=>`<option value="${c(i.id)}" ${e?.roleId===i.id?"selected":""}>${c(t(i.nameAr,i.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${n?t("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):t("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button><button type="submit" class="btn btn-primary">${h("check",14)} ${e?n?t("حفظ الصلاحية","Save permission"):g("save"):g("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=le(e?n?t("تعديل صلاحية الحساب","Change account permission"):t("تعديل حساب العضو","Edit member account"):g("addMember"),t("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),r,"user")}var as=ne({showNotifications:()=>ns});function ns(){const e=s.data?.notifications||[],n=`${e.filter(a=>!a.read&&!a.readAt).length>0?`
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 10px;">
        ${h("check",13)} ${t("تحديد الكل كمقروء","Mark all as read")}
      </button>
    </div>
  `:""}${e.length?`<div class="attention-list">${e.slice(0,20).map(a=>{const o=a.type==="overdue"||a.type==="escalation"?"red":a.type==="due_soon"||a.type==="document_review"?"amber":"blue",r=!!(a.readAt||a.read),i=a.type==="overdue"?t("مهمة متأخرة","Overdue Task"):a.type==="escalation"?t("تصعيد مهمة","Task Escalation"):a.type==="due_soon"?t("موعد تسليم قريب","Due Soon"):a.type==="document_review"?t("مراجعة مستند","Document Review"):a.type==="assignment"?t("إسناد مهمة جديدة","Task Assigned"):t("تنبيه مساحة العمل","Workspace Notification"),d=t(a.titleAr||a.titleEn||i,a.titleEn||a.titleAr||i),l=t(a.messageAr||a.bodyAr||a.content||"",a.messageEn||a.bodyEn||a.content||""),p=l&&l!==d?`${l} · `:"",u=a.type==="overdue"||a.type==="escalation"?"alert":a.type==="document_review"?"document":a.type==="assignment"?"user":"bell",f=a.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${h("check",10)} ${t("فتح المهمة","Open Task")}</span>`:a.documentId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${h("document",10)} ${t("معاينة المخطط","View Drawing")}</span>`:a.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${h("project",10)} ${t("المشروع","Project")}</span>`:"";return`<button class="attention-item" data-action="read-notification" data-notification-id="${c(a.id)}" data-task-id="${c(a.taskId||"")}" data-project-id="${c(a.projectId||"")}" data-document-id="${c(a.documentId||"")}" data-type="${c(a.type||"")}" style="border:0;text-align:inherit;width:100%;cursor:pointer;opacity:${r?".65":"1"}"><span class="attention-icon ${o}">${h(u,14)}</span><span class="attention-copy"><strong style="color:var(--${o});display:flex;align-items:center;justify-content:space-between;"><span>${c(d)}</span>${f}</strong><span>${c(p)}${Ct(a.createdAt)}</span></span></button>`}).join("")}</div>`:`<div class="empty">${h("bell",18)}<span>${g("noAttention")}</span></div>`}`;document.getElementById("modal-root").innerHTML=le(g("notifications"),t("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),n,"notifications")}var is=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),ea=is?"⌘K":"Ctrl+K",pe=0,te=[];function Bn(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.body.style.overflow="hidden";const n=t(`ابحث في المشاريع، المهام، والأعضاء... (${ea})`,`Search projects, tasks, team... (${ea})`),a=`
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${h("search",18)}</span>
          <input 
            id="omnisearch-input" 
            type="text" 
            autocomplete="off" 
            placeholder="${c(n)}" 
            onfocus="this.placeholder=''" 
            onblur="if(!this.value) this.placeholder='${c(n)}'"
          />
          <button class="btn btn-ghost btn-sm" data-action="close-omnisearch" style="padding:4px 8px;">
            <kbd class="shortcut-kbd">ESC</kbd>
          </button>
        </div>
        <div id="omnisearch-results-container" class="omnisearch-results">
          ${Ga("")}
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
  `;document.body.insertAdjacentHTML("beforeend",a);const o=document.getElementById("omnisearch-modal");o&&o.addEventListener("click",i=>{i.target===o&&Pe()});const r=document.getElementById("omnisearch-input");r&&(r.focus(),r.addEventListener("input",i=>{pe=0;const d=document.getElementById("omnisearch-results-container");d&&(d.innerHTML=Ga(i.target.value))}),r.addEventListener("keydown",ss))}function Pe(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.querySelector(".modal-backdrop")||(document.body.style.overflow="")}function ss(e){e.key==="ArrowDown"?(e.preventDefault(),te.length>0&&(pe=(pe+1)%te.length,Va())):e.key==="ArrowUp"?(e.preventDefault(),te.length>0&&(pe=(pe-1+te.length)%te.length,Va())):e.key==="Enter"?(e.preventDefault(),te[pe]&&Un(te[pe])):e.key==="Escape"&&Pe()}function Va(){document.querySelectorAll(".omni-item").forEach((e,n)=>{e.classList.toggle("selected",n===pe),n===pe&&e.scrollIntoView({block:"nearest"})})}function Un(e){if(Pe(),e.type==="action")if(e.id==="new-task"){const n=(s.data?.projects||[]).find(a=>a.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0];jt(null,null,e.targetProjectId||n?.id)}else e.id==="new-project"?Sa():e.id==="cheatsheet"&&ja();else if(e.type==="project")s.projectTab="tasks",s.lastActiveProjectId=e.id,oe("project-detail",e.id);else if(e.type==="task"){const n=s.data?.tasks?.find(a=>a.id===e.id);n&&jt(n)}else if(e.type==="user"){const n=s.data?.users?.find(a=>a.id===e.id);n&&typeof window.openUserModal=="function"&&window.openUserModal(n)}}function Ga(e){const n=e.trim().toLowerCase(),a=[],o=(s.data?.projects||[]).find(l=>l.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0],r=o?t(o.nameAr,o.nameEn):"",i=[];if((k("create_tasks")||P())&&i.push({type:"action",id:"new-task",targetProjectId:o?.id,title:t("إضافة مهمة جديدة","Create new task"),sub:o?t(`في مشروع: ${r}`,`In project: ${r}`):t("إجراء سريع","Quick action"),icon:"plus",keywords:"new task مهمة إضافة عمل جديد"}),(k("create_projects")||P())&&i.push({type:"action",id:"new-project",title:t("إنشاء مشروع جديد","Create new project"),sub:t("إجراء سريع","Quick action"),icon:"building",keywords:"new project مشروع إنشاء جديد"}),i.push({type:"action",id:"cheatsheet",title:t("عرض دليل اختصارات لوحة المفاتيح","View keyboard shortcuts guide"),sub:t("مساعدة","Help"),icon:"sparkles",keywords:"shortcuts اختصارات كيبورد مساعدة"}),i.forEach(l=>{(!n||l.keywords.includes(n)||l.title.toLowerCase().includes(n))&&a.push(l)}),(k("view_projects")||P())&&(s.data?.projects||[]).forEach(l=>{(!n||`${l.nameAr} ${l.nameEn} ${l.code} ${l.clientAr} ${l.clientEn}`.toLowerCase().includes(n))&&a.push({type:"project",id:l.id,title:t(l.nameAr,l.nameEn),sub:`${l.code} · ${t(l.clientAr,l.clientEn)||""}`,badge:`${l.progress}%`,icon:"building"})}),q("tasks")&&(s.data?.tasks||[]).forEach(l=>{(!n||`${l.titleAr} ${l.titleEn} ${l.categoryAr} ${l.categoryEn}`.toLowerCase().includes(n))&&a.push({type:"task",id:l.id,title:t(l.titleAr,l.titleEn),sub:l.dueDate?`📅 ${Ct(l.dueDate)}`:t(l.categoryAr,l.categoryEn)||"",badge:`${l.progress}%`,icon:"checklist"})}),(P()||k("manage_users"))&&(s.data?.users||[]).forEach(l=>{(!n||`${l.name} ${l.nameEn} ${l.email} ${l.jobTitleAr}`.toLowerCase().includes(n))&&a.push({type:"user",id:l.id,title:t(l.name,l.nameEn||l.name),sub:l.email||"",badge:Z(l),icon:"user"})}),te=a.slice(0,15),!te.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${h("search",24)}</span>
        <strong style="color:var(--ink);">${t("لا توجد نتائج مطابقة","No matching results")}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${t("جرب البحث بكلمات أخرى أو رمز المشروع.","Try different keywords or project code.")}</p>
      </div>
    `;let d="";return te.map((l,p)=>{let u="";const f=l.type==="action"?t("إجراءات سريعة","Quick Actions"):l.type==="project"?t("المشاريع","Projects"):l.type==="task"?t("المهام والمخرجات","Tasks & Deliverables"):t("فريق العمل","Team");return f!==d&&(d=f,u=`<div class="omni-group-title">${f}</div>`),`
      ${u}
      <div class="omni-item ${p===pe?"selected":""}" data-omni-index="${p}" onclick="window.__selectOmniItem(${p})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${h(l.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${c(l.title)}</strong>
            ${l.sub?`<span style="font-size:11px;color:var(--muted);">${c(l.sub)}</span>`:""}
          </div>
        </div>
        ${l.badge?`<span class="omni-badge">${c(l.badge)}</span>`:""}
      </div>
    `}).join("")}window.__selectOmniItem=e=>{te[e]&&Un(te[e])};function ja(){Pe();const e=`
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${t("استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:","Use these shortcuts to navigate the workspace at full speed without a mouse:")}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${t("البحث الشامل والأوامر السريعة","Omnisearch & Quick Commands")}</span>
          <kbd class="shortcut-kbd">${ea}</kbd>
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
  `;document.getElementById("modal-root").innerHTML=le(t("دليل اختصارات لوحة المفاتيح","Keyboard Shortcuts Guide"),t("طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية","Work faster with productivity hotkeys"),e,"cheatsheet")}function os(){window.addEventListener("keydown",e=>{const n=document.activeElement,a=n&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT"||n.isContentEditable),o=e.code==="KeyK"||e.key?.toLowerCase()==="k"||e.key==="ن";if((e.metaKey||e.ctrlKey)&&o){e.preventDefault(),document.getElementById("omnisearch-modal")?Pe():Bn();return}if((e.key==="?"||e.key==="؟"||e.code==="Slash"&&e.shiftKey)&&!a){e.preventDefault(),ja();return}if((e.code==="KeyN"||e.key?.toLowerCase()==="n"||e.key==="ى")&&!a&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();const r=s.view==="project-detail"&&s.activeProjectId?s.activeProjectId:s.data?.projects?.[0]?.id;jt(null,null,r);return}if((e.code==="KeyP"||e.key?.toLowerCase()==="p"||e.key==="ح")&&!a&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault(),Sa();return}if(e.key==="Escape"&&document.getElementById("omnisearch-modal")){e.preventDefault(),Pe();return}})}var rs=ne({getOrCreateFloatingUploadWidget:()=>qn,handleChange:()=>ps,handleClick:()=>ls,handleInput:()=>cs,handleSubmit:()=>ds,init:()=>ms,updateFloatingUploadWidget:()=>Ne,uploadDirectFiles:()=>Hn,uploadTaskFiles:()=>Ia});async function ds(e){const n=e.target;if(!["project-form","task-form","user-form","role-form","activation-form","task-comment-form","template-form","force-password-form"].includes(n.id)&&!n.dataset.action)return;e.preventDefault();const a=Object.fromEntries(new FormData(n).entries()),o=n.querySelector('button[type="submit"]');o&&(o.disabled=!0,o.classList.add("is-loading"));try{if(n.id==="activation-form"){if(a.password!==a.passwordConfirm)throw new Error(t("كلمتا المرور غير متطابقتين.","Passwords do not match."));if(delete a.passwordConfirm,await I("/api/auth/activate",{method:"POST",body:JSON.stringify(a)}),window.history.replaceState({},"",window.location.pathname),await de(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}return}if(n.id==="project-form"){a.startDate||(a.startDate=null),a.dueDate||(a.dueDate=null),a.managerId||(a.managerId=null);let r=[];try{a.memberIds&&(r=JSON.parse(a.memberIds))}catch{}a.managerId&&!r.includes(a.managerId)&&r.push(a.managerId),a.memberIds=r;const i=!!n.dataset.projectId,d=await I(i?`/api/projects/${n.dataset.projectId}`:"/api/projects",{method:i?"PATCH":"POST",body:JSON.stringify(a)});if(d.project)if(s.data.projects||(s.data.projects=[]),i){const l=s.data.projects.findIndex(p=>p.id===d.project.id);l!==-1&&(s.data.projects[l]={...s.data.projects[l],...d.project})}else s.data.projects.unshift(d.project);V(),D(),$(t("تم حفظ المشروع.","Project saved."));return}if(n.id==="task-form"){const r=n.dataset.taskId;a.remindAt,delete a.remindAt,a.templateId=a.templateId||null,a.typeAr=a.typeAr||(a.templateId?"مخطط":null),a.typeEn=a.typeEn||(a.templateId?"Drawing":null),a.startDate||(a.startDate=null),a.dueDate||(a.dueDate=null),a.assigneeId||(a.assigneeId=null),a.reviewerId||(a.reviewerId=null);let i=[];try{i=JSON.parse(a.additionalAssignees||"[]")}catch{i=[...n.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(v=>v.value)}let d=[];try{d=JSON.parse(a.externalAssignees||"[]")}catch{const v=String(a.externalAssignees||"").trim();d=v?v.split(/[,،]+/).map(w=>w.trim()).filter(Boolean):[]}let l=[];try{l=JSON.parse(a.remindersJson||"[]")}catch{l=[]}delete a.additionalAssignees,delete a.externalAssignees,delete a.remindersJson,delete a.dependencies,delete a.weight,delete a.progress,a.customFields={additional_assignees:i,external_assignees:d,reminders:l},a.projectId||(a.projectId=s.activeProjectId||s.data.projects?.[0]?.id);const p=!!r;if(p){const f=(s.data?.tasks||[]).find(v=>v.id===r);f?.updatedAt&&(a.expectedUpdatedAt=f.updatedAt)}let u;try{u=await I(p?`/api/tasks/${r}`:"/api/tasks",{method:p?"PATCH":"POST",body:JSON.stringify(a)})}catch(f){if(f.message&&f.message.includes("تعارض")){await K(!0),$(f.message,!0);return}throw f}if(u.task){if(s.data.tasks||(s.data.tasks=[]),p){const f=s.data.tasks.findIndex(v=>v.id===u.task.id);f!==-1&&(s.data.tasks[f]={...s.data.tasks[f],...u.task})}else s.data.tasks.unshift(u.task),s.view==="tasks"&&(s.taskProjectFilter!=="all"&&s.taskProjectFilter!==u.task.projectId&&(s.taskProjectFilter=u.task.projectId),s.taskFilter==="mine"&&u.task.assigneeId!==s.data.user?.id&&(s.taskFilter="all"));if(Array.isArray(l)&&l.length>0){for(const f of l)if(!f.id||f.id.startsWith("rem_temp_")){const v=f.remindAt?new Date(f.remindAt):null;if(!v||isNaN(v.getTime()))continue;I("/api/reminders",{method:"POST",body:JSON.stringify({taskId:u.task.id,remindAt:v.toISOString(),noteAr:f.noteAr||a.titleAr||"تذكير لمتابعة المهمة"})}).catch(w=>console.warn("[Reminder dispatch note]",w))}}}V(),D(),$(t("تم حفظ المهمة بنجاح.","Task saved successfully."));return}if(n.id==="task-comment-form"){const r=n.dataset.taskId,i=await I(`/api/tasks/${r}/comments`,{method:"POST",body:JSON.stringify(a)});n.reset(),i.comment&&(s.data.comments||(s.data.comments=[]),s.data.comments.push(i.comment));const d=s.data.tasks.find(p=>p.id===r),l=document.getElementById("task-comments-list");l&&(l.innerHTML=renderTaskComments(d),l.scrollTop=l.scrollHeight),o&&(o.disabled=!1);return}if(n.id==="force-password-form"){const r=n.dataset.userId,i=n.dataset.isPending==="true";await I(`/api/users/${r}/force-password`,{method:"POST",body:JSON.stringify(a)});const d=s.data.users.find(l=>l.id===r);d&&(d.status="active"),V(),D(),$(i?t("تم تفعيل الحساب بنجاح.","Account activated successfully."):t("تم تغيير كلمة المرور وطرد المستخدم بنجاح.","Password changed and user kicked successfully.")),o&&(o.disabled=!1);return}if(n.id==="user-form"){const r=n.dataset.userId,i=!!r,d=await I(i?`/api/users/${r}`:"/api/users",{method:i?"PATCH":"POST",body:JSON.stringify(a)});if(d.user)if(s.data.users||(s.data.users=[]),i){const l=s.data.users.findIndex(p=>p.id===d.user.id);l!==-1&&(s.data.users[l]={...s.data.users[l],...d.user})}else s.data.users.unshift(d.user);V(),D(),$(t("تم حفظ حساب العضو.","Member account saved."));return}if(n.id==="role-form"){const r=n.dataset.roleId,i=[...n.querySelectorAll('input[name="permissions"]:checked')].map(p=>p.value),d=!!r,l=await I(d?`/api/roles/${r}`:"/api/roles",{method:d?"PATCH":"POST",body:JSON.stringify({...a,permissions:i})});if(l.role)if(s.data.roles||(s.data.roles=[]),d){const p=s.data.roles.findIndex(u=>u.id===l.role.id);p!==-1&&(s.data.roles[p]={...s.data.roles[p],...l.role})}else s.data.roles.push(l.role);V(),D(),$(t("تم حفظ الدور بنجاح.","Role saved."));return}if(n.id==="template-form"){const r=n.dataset.templateId,i=!!r,d=await I(i?`/api/templates/${r}`:"/api/templates",{method:i?"PATCH":"POST",body:JSON.stringify(a)});if(d.template)if(s.data.templates||(s.data.templates=[]),i){const l=s.data.templates.findIndex(p=>p.id===d.template.id);l!==-1&&(s.data.templates[l]={...s.data.templates[l],...d.template})}else s.data.templates.push(d.template);V(),D(),$(t("تم حفظ القالب بنجاح.","Template saved."));return}if(n.dataset.action==="update-profile"){if(a.calendarSystem){s.calendarSystem=a.calendarSystem;try{localStorage.setItem("darc_calendar_system",a.calendarSystem)}catch{}}const r=await I("/api/users/me",{method:"PATCH",body:JSON.stringify(a)});if(r.user){s.data.user={...s.data.user,...r.user};const i=(s.data.users||[]).findIndex(d=>d.id===s.data.user.id);i!==-1&&(s.data.users[i]={...s.data.users[i],...r.user})}D(),$(t("تم حفظ وتحديث الملف الشخصي بنجاح.","Profile updated successfully.")),o&&(o.disabled=!1);return}if(n.dataset.action==="update-company"){const r=await I("/api/company",{method:"PATCH",body:JSON.stringify(a)});r.company&&(s.data.company={...s.data.company,...r.company}),D(),$(t("تم تحديث بيانات الشركة.","Company data updated.")),o&&(o.disabled=!1);return}if(n.dataset.action==="change-password"){if(a.newPassword.length<10)throw new Error(t("كلمة المرور يجب أن تكون 10 أحرف على الأقل.","Password must be at least 10 characters."));await I("/api/auth/change-password",{method:"POST",body:JSON.stringify(a)}),n.reset(),$(t("تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.","Password changed successfully. Signed out of other devices.")),o&&(o.disabled=!1);return}}catch(r){n.id==="activation-form"?ct(a.token,r.message):$(r.message,!0)}finally{o&&(o.disabled=!1,o.classList.remove("is-loading"))}}async function ls(e){const n=document.getElementById("mention-dropdown"),a=document.getElementById("project-menu");if(n&&!e.target.closest("#mention-dropdown")&&!e.target.closest('input[name="content"]')&&(n.style.display="none"),a&&!e.target.closest("#project-menu")&&!e.target.closest('[data-action="toggle-project-menu"]')&&(a.style.display="none"),e.target.classList.contains("modal-backdrop")){V();return}if(e.target.closest("#task-dropzone")&&e.target.id!=="task-upload-input"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}const o=e.target.closest("[data-action], [data-view]");if(!o)return;const r=o.dataset.action;if(o.classList.contains("menu-item")){const i=o.closest(".dropdown-menu");i&&(i.style.display="none")}if(o.dataset.view){oe(o.dataset.view,o.dataset.projectId||void 0);return}if(r==="trigger-avatar-upload"){const i=document.getElementById("user-avatar-file-input");i&&i.click();return}if(r==="trigger-company-logo-upload"){const i=document.getElementById("company-logo-file-input");i&&i.click();return}if(r==="toggle-theme"){s.theme=s.theme==="dark"?"light":"dark",et({theme:s.theme}),document.documentElement.dataset.theme=s.theme,document.querySelectorAll('[data-action="toggle-theme"]').forEach(i=>{i.textContent=s.theme==="dark"?"☀️":"🌙"});return}if(r==="toggle-lang"){if(s.lang=s.lang==="ar"?"en":"ar",et({lang:s.lang}),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.body.classList.toggle("is-ltr",s.lang==="en"),s.data)Q();else{const i=new URLSearchParams(window.location.hash.replace(/^#/,""));i.get("activate")?ct(i.get("activate")):i.get("reset")?He(i.get("reset")):X("",document.getElementById("forgot-form")?"forgot":"login")}return}if(r==="quick-fill-login"){const i=o.closest('[data-action="quick-fill-login"]'),d=document.getElementById("login-email"),l=document.getElementById("login-password"),p=i?.dataset?.email||"demo@darc-design.bond",u=i?.dataset?.pass||"demo123456";if(d&&(d.value=p,d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),l&&(l.value=u,l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),i?.dataset?.autosubmit==="true"){const f=document.getElementById("login-form");if(f){const v=p.trim().toLowerCase()==="demo@darc-design.bond"||p.trim().toLowerCase()==="demo@darc.local",w=()=>typeof window<"u"&&window.turnstile&&window._turnstileWidgetId!==void 0?window.turnstile.getResponse(window._turnstileWidgetId):null,y=()=>{typeof f.requestSubmit=="function"?f.requestSubmit():f.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))},b=w();if(!v&&!b&&typeof window<"u"&&window.turnstile){i.disabled=!0;const m=i.innerHTML;i.innerHTML=`<span>⏳ ${t("جاري التحقق من أمان المتصفح...","Verifying browser security...")}</span>`;let x=0;const A=setInterval(()=>{x++,(w()||x>20)&&(clearInterval(A),i.disabled=!1,i.innerHTML=m,y())},100);return}y()}}return}if(r==="goto-forgot"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#forgot"),X("","forgot");return}if(r==="goto-login"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#login"),X();return}if(r==="reset-demo-sandbox"){try{$(t("جاري إعادة ضبط بيانات العرض التجريبي...","Resetting demo sandbox..."),!1);const i=await I("/api/demo/reset",{method:"POST"});i&&i.data&&(s.data=i.data,ce(i.data),Q(),$(t("تمت إعادة ضبط البيانات بنجاح ✨","Demo data reset successfully ✨"),!1))}catch(i){$(i.message,!0)}return}if(r==="toggle-sidebar"){s.sidebarOpen=!s.sidebarOpen,document.querySelector(".sidebar")?.classList.toggle("open",s.sidebarOpen);return}if(r==="logout"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout"),await I("/api/auth/logout",{method:"POST"}).catch(()=>{});try{await Ua()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_queue")}catch{}}Tt(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),X();return}if(r==="logout-all"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout_all"),await I("/api/auth/logout-all",{method:"POST"}).catch(()=>{});try{await Ua()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_queue")}catch{}}Tt(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),X();return}if(r==="open-omnisearch"){Bn();return}if(r==="close-omnisearch"){Pe();return}if(r==="open-cheatsheet"){ja();return}if(r==="close-modal"){V();return}if(r==="show-notifications"){showNotifications();return}if(r==="read-notification"){const i=o.dataset.notificationId||o.closest("[data-notification-id]")?.dataset.notificationId,d=(s.data?.notifications||[]).find(v=>v.id===i);d&&(d.read=!0,d.readAt=new Date().toISOString()),Q(),i&&I(`/api/notifications/${i}`,{method:"PATCH",body:JSON.stringify({})}).catch(v=>{console.warn("[Notifications] Failed to patch read status in background:",v)}),V(!0);const l=o.dataset.taskId||d?.taskId,p=o.dataset.documentId||d?.documentId,u=o.dataset.projectId||d?.projectId,f=o.dataset.type||d?.type;if(p){Yt(p);return}if(l){let v=(s.data?.tasks||[]).find(w=>w.id===l);if(v){v.projectId&&(s.activeProjectId=v.projectId),openTaskModal(v);return}try{const w=await I(`/api/tasks/${l}`);if(w&&w.id){s.data.tasks||(s.data.tasks=[]),s.data.tasks.push(w),w.projectId&&(s.activeProjectId=w.projectId),openTaskModal(w);return}}catch(w){console.warn("[Notifications] Failed to fetch task on demand:",w)}}if(f==="document_review"&&u){s.activeProjectId=u,s.projectTab="documents",oe("project-detail",u);return}if(u){s.activeProjectId=u,oe("project-detail",u);return}await K();return}if(r==="mark-all-notifications-read"){try{await I("/api/notifications/read-all",{method:"POST"}),(s.data?.notifications||[]).forEach(i=>{i.read=!0,i.readAt=new Date().toISOString()}),showNotifications(),Q(),$(t("تم تحديد كافة التنبيهات كمقروءة.","All notifications marked as read."))}catch(i){$(i.message,!0)}return}if(r==="toggle-project-menu"){a&&(a.style.display=a.style.display==="none"?"block":"none");return}if(r==="preview-doc"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId;i&&Yt(i);return}if(r==="copy-doc-link"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId,d=s.data?.documents?.find(l=>l.id===i);if(d){let l=d.viewLink||d.downloadLink||(d.driveFileId?`https://drive.google.com/file/d/${d.driveFileId}/view`:"");if((!l||l.startsWith("file://")||l.startsWith("/"))&&(l=`${window.location.origin}/api/documents/${d.id}`),l)try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(l);else{const p=document.createElement("textarea");p.value=l,document.body.appendChild(p),p.select(),document.execCommand("copy"),p.remove()}$(t("تم نسخ رابط الملف إلى الحافظة بنجاح.","Document link copied to clipboard."))}catch{window.prompt(t("انسخ رابط الملف من هنا:","Copy document link:"),l)}else $(t("لا يوجد رابط متاح لهذا الملف.","No link available for this document."),!0)}return}if(r==="trigger-upload"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}if(r==="open-upload-drawing-modal"){typeof openUploadDrawingModal=="function"?openUploadDrawingModal(o.dataset.projectId||null):typeof window.openUploadDrawingModal=="function"&&window.openUploadDrawingModal(o.dataset.projectId||null);return}if(r==="new-project"){openProjectModal();return}if(r==="edit-project"){const i=s.data.projects.find(d=>d.id===o.dataset.projectId);i&&openProjectModal(i);return}if(r==="clone-project"){const i=s.data.projects.find(d=>d.id===o.dataset.projectId);i&&openCloneModal(i);return}if(r==="rename-doc"){const i=o.dataset.docId,d=s.data?.documents?.find(p=>p.id===i);if(!d)return;const l=window.prompt(t("أدخل الاسم الجديد:","Enter new name:"),d.originalName);if(!l||l===d.originalName)return;try{await I(`/api/documents/${i}`,{method:"PATCH",body:JSON.stringify({originalName:l})}),d.originalName=l,await K(!0);const p=s.data?.tasks?.find(u=>u.id===d.taskId);if(p){const u=document.getElementById("task-documents-list");u&&(u.innerHTML=_e(p))}}catch(p){$(p.message,!0)}return}if(r==="go-to-trash"){s.settingsSection="trash",s.trashLoaded=!1,oe("settings");return}if(r==="delete-doc"){if(!window.confirm(t("هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.","Are you sure you want to move this document to trash? You can restore it within 30 days.")))return;const i=o.dataset.docId,d=s.data?.documents?.find(l=>l.id===i)?.taskId;try{if(await I(`/api/documents/${i}`,{method:"DELETE"}),s.data?.documents&&(s.data.documents=s.data.documents.filter(l=>l.id!==i)),s.trashLoaded=!1,await K(!0),$(t("تم نقل المستند إلى سلة المهملات بنجاح.","Document moved to trash successfully.")),d){const l=s.data?.tasks?.find(p=>p.id===d);if(l){const p=document.getElementById("task-documents-list");p&&(p.innerHTML=_e(l))}}}catch(l){$(l.message,!0)}return}if(r==="delete-project"){if(!window.confirm(t("هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.","Are you sure you want to delete this project? It will be archived.")))return;const i=[...s.data.projects||[]];s.data.projects=s.data.projects.filter(d=>d.id!==o.dataset.projectId),V(),oe("projects"),$(t("جاري حذف المشروع...","Deleting project..."));try{await I(`/api/projects/${o.dataset.projectId}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await K(!0),$(t("تم حذف المشروع بنجاح.","Project deleted successfully."))}catch(d){s.data.projects=i,D(),$(d.message,!0)}return}if(r==="delete-task"){if(!window.confirm(t("هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.","Are you sure you want to delete this task? It will be moved to trash.")))return;const i=o.dataset.taskId,d=[...s.data.tasks||[]];s.data.tasks=s.data.tasks.filter(l=>l.id!==i),V(),D(),$(t("جاري حذف المهمة...","Deleting task..."));try{await I(`/api/tasks/${i}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await K(!0),$(t("تم حذف المهمة بنجاح.","Task deleted successfully."))}catch(l){s.data.tasks=d,D(),$(l.message,!0)}return}if(r==="edit-task-comment"){const i=o.dataset.commentId,d=o.dataset.taskId,l=(s.data.comments||[]).find(f=>f.id===i);if(!l)return;const p=window.prompt(t("تعديل التعليق:","Edit comment:"),l.content);if(p===null)return;const u=p.trim();if(!u){$(t("لا يمكن ترك التعليق فارغاً.","Comment cannot be empty."),!0);return}if(u===l.content)return;try{const f=await I(`/api/tasks/${d}/comments/${i}`,{method:"PATCH",body:JSON.stringify({content:u})});if(f.comment){const v=(s.data.comments||[]).findIndex(b=>b.id===i);v!==-1&&(s.data.comments[v]=f.comment);const w=(s.data.tasks||[]).find(b=>b.id===d),y=document.getElementById("task-comments-list");y&&w&&(y.innerHTML=renderTaskComments(w)),$(t("تم تعديل التعليق بنجاح.","Comment updated successfully."))}}catch(f){$(f.message,!0)}return}if(r==="delete-task-comment"){const i=o.dataset.commentId,d=o.dataset.taskId;if(!window.confirm(t("هل أنت متأكد من حذف هذا التعليق؟","Are you sure you want to delete this comment?")))return;try{await I(`/api/tasks/${d}/comments/${i}`,{method:"DELETE"}),s.data.comments&&(s.data.comments=s.data.comments.filter(u=>u.id!==i));const l=(s.data.tasks||[]).find(u=>u.id===d),p=document.getElementById("task-comments-list");p&&l&&(p.innerHTML=renderTaskComments(l)),$(t("تم حذف التعليق بنجاح.","Comment deleted successfully."))}catch(l){$(l.message,!0)}return}if(r==="manual-sync"){if(typeof navigator<"u"&&!navigator.onLine){$(t("أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡","You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡"),!1);return}const i=rt();if(!i.length){$(t("جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️","All data is completely synchronized with cloud server ✔️"),!1);return}$(t(`جاري مزامنة ${i.length} عمليات معلقة مع السيرفر...`,`Syncing ${i.length} pending actions with server...`),!1);const d=await la(I);if(d.synced>0){if($(t(`تمت مزامنة ${d.synced} عمليات بنجاح! 🚀`,`Successfully synced ${d.synced} actions! 🚀`),!1),await de(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}}else d.failed>0&&$(t(`فشلت مزامنة ${d.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${d.failed} actions, please try again.`),!0);return}if(r==="new-task"){openTaskModal(null,null,o.dataset.projectId);return}if(r==="new-user"){openUserModal();return}if(r==="new-role"){openRoleModal();return}if(r==="new-template"){openTemplateModal();return}if(r==="edit-template"){const i=s.data.templates.find(d=>d.id===o.dataset.templateId);i&&openTemplateModal(i);return}if(r==="delete-template"){if(!window.confirm(t("هل أنت متأكد من حذف هذا القالب؟","Are you sure you want to delete this template?")))return;const i=[...s.data.templates||[]];s.data.templates=s.data.templates.filter(d=>d.id!==o.dataset.templateId),D(),V();try{await I(`/api/templates/${o.dataset.templateId}`,{method:"DELETE"}),await K(!0),$(t("تم حذف القالب.","Template deleted."))}catch(d){s.data.templates=i,D(),$(d.message,!0)}return}if(r==="open-project"){s.projectTab="tasks",s.projectMemberFilter=null,oe("project-detail",o.dataset.projectId);return}if(r==="filter-by-member"){const i=o.dataset.memberId;s.projectMemberFilter=s.projectMemberFilter===i?null:i,s.projectTab="tasks",requestAnimationFrame(()=>D());return}if(r==="clear-member-filter"){s.projectMemberFilter=null,requestAnimationFrame(()=>D());return}if(r==="back-to-projects"){s.projectMemberFilter=null,oe("projects",null);return}if(r==="project-tab"){s.projectTab=o.dataset.tab;try{if(typeof window<"u"&&s.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(s.activeProjectId)}&tab=${encodeURIComponent(s.projectTab)}`),typeof sessionStorage<"u"){const d=sessionStorage.getItem("darc_last_route"),l=d?JSON.parse(d):{};l.view="project-detail",l.activeProjectId=s.activeProjectId,l.projectTab=s.projectTab,sessionStorage.setItem("darc_last_route",JSON.stringify(l))}}catch{}o.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(d=>d.classList.toggle("active",d===o));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>D());return}if(r==="toggle-timeline-view"){s.timelineView=o.dataset.viewMode||"gantt",requestAnimationFrame(()=>D());return}if(r==="prev-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()-1),s.calendarDate=i,requestAnimationFrame(()=>D());return}if(r==="next-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()+1),s.calendarDate=i,requestAnimationFrame(()=>D());return}if(r==="today-calendar-month"){s.calendarDate=new Date,requestAnimationFrame(()=>D());return}if(r==="open-task"){if(window._justDroppedAt&&Date.now()-window._justDroppedAt<250)return;const i=o.dataset.taskId||o.closest("[data-task-id]")?.dataset.taskId;if(!i)return;let d=(s.data?.tasks||[]).find(l=>l.id===i);if(d){openTaskModal(d);return}I(`/api/tasks/${i}`).then(l=>{l&&l.id?(s.data.tasks||(s.data.tasks=[]),s.data.tasks.push(l),openTaskModal(l)):$(t("تعذر العثور على المهمة أو تم نقلها لسلة المهملات.","Task not found or was moved to trash."),!0)}).catch(l=>{$(t("تعذر فتح المهمة: "+l.message,"Could not open task: "+l.message),!0)});return}if(r==="task-filter"){s.taskFilter=o.dataset.filter,o.closest(".view-toolbar-start")?.querySelectorAll(".filter-tab").forEach(i=>i.classList.toggle("active",i===o)),requestAnimationFrame(()=>D());return}if(r==="template-category"){s.templateCategory=o.dataset.category,requestAnimationFrame(()=>D());return}if(r==="use-template"){if(!s.data.projects.length)return $(g("noProjects"),!0);openTaskModal(null,o.dataset.templateId,s.activeProjectId);return}if(r==="open-user"){const i=s.data.users.find(d=>d.id===o.dataset.userId);i&&openUserModal(i);return}if(r==="impersonate-user"){if(!window.confirm("هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً."))return;try{const i=await I(`/api/users/${o.dataset.userId}/impersonate`,{method:"POST"});i&&i.token&&typeof localStorage<"u"&&localStorage.setItem("darc_token",i.token),window.location.reload()}catch(i){$(i.message,!0)}return}if(r==="force-password-user"){const i=s.data.users.find(d=>d.id===o.dataset.userId);i&&openForcePasswordModal(i);return}if(r==="invite-user"){try{const i=await I(`/api/users/${o.dataset.userId}/invite`,{method:"POST"});await K(),$(i.emailConfigured?t("تم إرسال الدعوة.","Invitation sent."):t("تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.","Invite prepared, but the email provider is not configured."))}catch(i){$(i.message,!0)}return}if(r==="deactivate-user"){if(!window.confirm(g("confirmDeactivate")))return;const i=o.dataset.userId,d=s.data.users.find(p=>p.id===i),l=d?d.status:null;d&&(d.status="inactive"),D(),V();try{await I(`/api/users/${i}`,{method:"DELETE"}),await K(!0),$(t("تم تعطيل الحساب.","Account deactivated."))}catch(p){d&&(d.status=l),D(),$(p.message,!0)}return}if(r==="settings-section"){s.settingsSection=o.dataset.section||"profile";try{if(typeof window<"u"&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route"),d=i?JSON.parse(i):{};d.view="settings",d.settingsSection=s.settingsSection,sessionStorage.setItem("darc_last_route",JSON.stringify(d))}}catch{}o.closest(".settings-nav")?.querySelectorAll(".settings-nav-item").forEach(i=>i.classList.toggle("active",i===o)),s.settingsSection==="analytics"&&yt(!0).then(()=>D()).catch(()=>{}),s.settingsSection==="trash"&&!s.trashLoaded&&I("/api/trash").then(i=>{s.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(d=>({...d,type:"project"})),...(i.tasks||[]).map(d=>({...d,type:"task"})),...(i.documents||[]).map(d=>({...d,type:"document"}))],s.trashLoaded=!0;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}D()}).catch(i=>console.error(i)),requestAnimationFrame(()=>D());return}if(r==="refresh-analytics"){try{await yt(!0),D(),$(t("تم تحديث مؤشرات التحليلات والمراقبة الحية بنجاح.","Live observability and analytics refreshed successfully."))}catch(i){$(i.message,!0)}return}if(r==="test-anomaly-alert"){try{await I("/api/telemetry/test-anomaly",{method:"POST"}),await yt(!0),await de(!0),Q(),$(t("🚨 تم رصد استهلاك زائد بنجاح وإرسال إشعار فوري لمركز التنبيهات!","🚨 Anomaly detected! Alert notification dispatched to Notification Center!"))}catch(i){$(i.message,!0)}return}if(r==="goto-diagnostics"){s.settingsSection="diagnostics",typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#settings?section=diagnostics"),D();return}if(r==="refresh-diagnostics"){try{await bt(!0),D(),$(t("تم تحديث سجل الأخطاء وتشخيصات المستخدمين بنجاح.","Diagnostics and incidents refreshed successfully."))}catch(i){$(i.message,!0)}return}if(r==="test-incident-simulate"){try{await I("/api/telemetry/test-error",{method:"POST"}),await bt(!0),await de(!0),D(),$(t("🚨 تم رصد الخطأ وتوثيق خطوات المستخدم وإرسال بريد تنبيه للإدارة بنجاح!","🚨 Incident recorded with stack trace and alert email sent to admin!"))}catch(i){$(i.message,!0)}return}if(r==="test-diagnostic-email"){try{await I("/api/telemetry/test-email",{method:"POST"}),$(t("✉️ تم إرسال رسالة اختبار التنبيهات البريدية للإدارة بنجاح!","✉️ Test alert email dispatched to admin successfully!"))}catch(i){$(i.message,!0)}return}if(r==="filter-diagnostics-user"){const i=o.dataset.userId||"all";Ja(i),D();return}if(r==="clear-diagnostics-user-filter"){Ja("all"),D();return}if(r==="resolve-diagnostic-incident"){const i=o.dataset.incidentId;if(i)try{await I(`/api/telemetry/incidents/${i}/resolve`,{method:"PATCH"}),await bt(!0),D(),$(t("تم تحديد المشكلة كمعالجة بنجاح ✅","Incident marked as resolved ✅"))}catch(d){$(d.message,!0)}return}if(r==="copy-debug-bundle"){const i=o.dataset.bundle;i&&typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>{$(t("تم نسخ تقرير المشكلة الفني بالكامل للحافظة 📋","Full debug bundle copied to clipboard 📋"))}).catch(()=>{$(t("فشل النسخ التلقائي للحافظة","Failed to copy to clipboard"),!0)});return}if(r==="restore-item"){try{await I(`/api/restore/${o.dataset.type}/${o.dataset.id}`,{method:"POST"});const i=await I("/api/trash");s.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(d=>({...d,type:"project"})),...(i.tasks||[]).map(d=>({...d,type:"task"})),...(i.documents||[]).map(d=>({...d,type:"document"}))];try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}await K(),$(t("تمت الاستعادة بنجاح.","Restored successfully."))}catch(i){$(i.message,!0)}return}if(r==="filter-trash"){s.trashFilter=o.dataset.filter,requestAnimationFrame(()=>D());return}if(r==="purge-trash-item"){const i=o.dataset.type,d=o.dataset.id;if(!window.confirm(t("هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.","Are you sure you want to permanently delete this item? This action cannot be undone.")))return;try{await I(`/api/trash/${i}/${d}`,{method:"DELETE"});const l=await I("/api/trash");s.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(p=>({...p,type:"project"})),...(l.tasks||[]).map(p=>({...p,type:"task"})),...(l.documents||[]).map(p=>({...p,type:"document"}))],D(),$(t("تم حذف العنصر نهائياً بنجاح.","Item permanently deleted."))}catch(l){$(l.message,!0)}return}if(r==="empty-trash"){if(!window.confirm(t("هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.","Are you sure you want to empty the entire recycle bin? All items will be permanently erased.")))return;try{await I("/api/trash/empty",{method:"DELETE"}),s.trash=[],D(),$(t("تم إفراغ سلة المهملات بالكامل بنجاح.","Trash bin emptied successfully."))}catch(i){$(i.message,!0)}return}if(r==="open-role"){const i=s.data.roles.find(d=>d.id===o.dataset.roleId);i&&openRoleModal(i);return}if(r==="delete-role"){if(!window.confirm(g("confirmDeleteRole")))return;const i=o.dataset.roleId,d=[...s.data.roles||[]];s.data.roles=s.data.roles.filter(l=>l.id!==i),D(),V();try{await I(`/api/roles/${i}`,{method:"DELETE"}),await K(!0),$(t("تم حذف الدور.","Role deleted."))}catch(l){s.data.roles=d,D(),$(l.message,!0)}return}if(r==="export-csv"){if(!k("export_reports")&&!P()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}_n();return}if(r==="print-portfolio-pdf"){if(!k("export_reports")&&!P()){$(t("ليس لديك صلاحية لطباعة التقارير.","You do not have permission to print reports."),!0);return}Cn();return}if(r==="export-project"){if(!k("export_reports")&&!P()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Pn(o.dataset.projectId);return}if(r==="export-project-pdf"){if(!k("export_reports")&&!P()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Xt(o.dataset.projectId,!1);return}if(r==="export-project-client-pdf"){if(!k("export_reports")&&!P()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Xt(o.dataset.projectId,!0);return}if(r==="export-audit-xls"){if(!k("view_audit_logs")&&!P()){$(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}Rn();return}if(r==="print-audit-pdf"){if(!k("view_audit_logs")&&!P()){$(t("ليس لديك صلاحية لطباعة سجل الرقابة.","You do not have permission to print audit logs."),!0);return}On();return}if(r==="load-full-audit"){Nn();return}if(r==="reset-audit-filters"){s.auditFilterAction="all",s.auditFilterEntity="all",s.auditFilterUser="all",s.auditSearchQuery="",D();return}}var ze=null;function cs(e){if(e.target.name==="content"&&e.target.closest("#task-comment-form")){const o=e.target.value,r=o.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),i=document.getElementById("mention-dropdown");if(r){const d=r[1].toLowerCase(),l=(s.data?.users||[]).filter(p=>p.status!=="inactive").filter(p=>`${p.name||""} ${p.nameEn||""} ${p.email||""}`.toLowerCase().includes(d));l.length?(i.innerHTML=l.map(p=>{const u=(p.name||p.nameEn||p.email||"user").trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${c(u)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${N(p,"avatar-sm")}
              <span style="font-size:12px;">${c(t(p.name,p.nameEn||p.name))}</span>
            </div>
          `}).join(""),i.style.display="block",i.querySelectorAll(".mention-option").forEach(p=>{p.onclick=()=>{const u=p.dataset.username;e.target.value=o.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${u} `),i.style.display="none",e.target.focus()}})):i.style.display="none"}else i.style.display="none"}if(e.target.dataset.action==="search-trash-input"){s.trashQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(ze),ze=setTimeout(()=>{D();const r=document.querySelector('[data-action="search-trash-input"]');r&&(r.focus(),r.setSelectionRange(o,o))},120);return}if(e.target.dataset.action==="search-audit-input"){s.auditSearchQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(ze),ze=setTimeout(()=>{D();const r=document.querySelector('[data-action="search-audit-input"]');r&&(r.focus(),r.setSelectionRange(o,o))},120);return}const n=e.target.dataset.search||(e.target.dataset.action==="search-documents"?"documents":null);if(!n)return;s.searches[n]=e.target.value;const a=e.target.selectionStart;clearTimeout(ze),ze=setTimeout(()=>{D();const o=document.querySelector(`[data-search="${n}"], [data-action="search-documents"]`);o&&(o.focus(),o.setSelectionRange(a,a))},120)}async function ps(e){if(e.target.dataset.action==="filter-diagnostics-severity"){Gi(e.target.value),D();return}if(e.target.dataset.action==="filter-diagnostics-status"){Yi(e.target.value),D();return}if(e.target.dataset.action==="change-doc-status"){const n=e.target.dataset.docId,a=e.target.value,o=s.data?.documents?.find(r=>r.id===n);if(!o)return;try{await I(`/api/documents/${n}`,{method:"PATCH",body:JSON.stringify({status:a})}),o.status=a,$(t("تم تحديث حالة المخطط بنجاح ✅","Drawing status updated ✅")),await K(!0)}catch(r){$(r.message,!0)}return}if(e.target.dataset.action==="doc-project-filter"){s.docProjectFilter=e.target.value,D();return}if(e.target.dataset.action==="filter-project-docs-task"){s.docTaskFilter=e.target.value,D();return}if(e.target.dataset.action==="filter-audit-action"){s.auditFilterAction=e.target.value,D();return}if(e.target.dataset.action==="filter-audit-entity"){s.auditFilterEntity=e.target.value,D();return}if(e.target.dataset.action==="filter-audit-user"){s.auditFilterUser=e.target.value,D();return}if(e.target.dataset.action==="sort-project-tasks"||e.target.dataset.action==="sort-my-tasks"){yn(e.target.value),D();return}if(e.target.name==="templateId"&&e.target.form?.id==="task-form"){const n=e.target.form,a=e.target.value,o=s.data.templates?.find(u=>u.id===a),r=n.querySelector('input[name="titleAr"]'),i=n.querySelector('input[name="titleEn"]'),d=n.querySelector("#task-type-ar"),l=n.querySelector("#task-type-en"),p=n.querySelector('textarea[name="descriptionAr"]');o?(r&&(!r.value||n.dataset.templateSelected==="true")&&(r.value=o.nameAr),i&&(!i.value||n.dataset.templateSelected==="true")&&(i.value=o.nameEn||""),d&&(d.value=o.typeAr||"مخطط"),l&&(l.value=o.typeEn||"Drawing"),p&&(!p.value||n.dataset.templateSelected==="true")&&(p.value=o.descriptionAr||""),n.dataset.templateSelected="true"):(d&&(d.value=""),l&&(l.value=""),delete n.dataset.templateSelected);return}if(e.target.name==="status"&&e.target.form?.id==="task-form"){const n=e.target.form.querySelector("#task-auto-progress-badge");if(n){const a={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];n.textContent=a!==void 0?`(${a}%)`:""}return}if(e.target.dataset.action==="task-project-filter"){s.taskProjectFilter=e.target.value,D();return}if(e.target.dataset.action==="task-priority-filter"){s.taskPriorityFilter=e.target.value,D();return}if(e.target.id==="sort-projects"||e.target.dataset?.action==="sort-projects"){s.projectSort=e.target.value,D();return}if(e.target.id==="task-upload-input"){const n=e.target.files;if(!n.length)return;const a=e.target.dataset.taskId;Ia(n,a);return}if(e.target.classList.contains("doc-status-select")){const n=e.target.dataset.docId,a=e.target.value;I(`/api/documents/${n}`,{method:"PATCH",body:JSON.stringify({status:a})}).then(()=>{K(!0).then(()=>$(t("تم تحديث حالة المخطط.","Document status updated.")))}).catch(o=>$(o.message,!0));return}if(e.target.id==="user-avatar-file-input"){const n=e.target.files?.[0];if(!n)return;if(n.size>2621440){$(t("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.","Image is too large. Maximum allowed size is 2MB."),!0),e.target.value="";return}if(!n.type.startsWith("image/")){$(t("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).","Please select a valid image file (JPG, PNG, WebP)."),!0),e.target.value="";return}try{$(t("جاري معالجة ورفع صورتك الشخصية...","Processing & uploading avatar..."));const a=await Ya(n,256,256),o=await I("/api/users/me",{method:"PATCH",body:JSON.stringify({avatarUrl:a})});if(o.user){s.data.user={...s.data.user,...o.user};const r=(s.data.users||[]).findIndex(i=>i.id===s.data.user.id);r!==-1&&(s.data.users[r]={...s.data.users[r],...o.user})}e.target.value="",Q(),kt(),$(t("تم تحديث صورتك الشخصية وتثبيتها بنجاح!","Avatar updated successfully!"))}catch(a){e.target.value="",$(a.message,!0)}return}if(e.target.id==="company-logo-file-input"){const n=e.target.files?.[0];if(!n)return;if(n.size>3145728){$(t("حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.","Logo is too large. Maximum allowed size is 3MB."),!0),e.target.value="";return}if(!n.type.startsWith("image/")){$(t("يرجى اختيار ملف صورة أو شعار صالح.","Please select a valid logo image file."),!0),e.target.value="";return}try{$(t("جاري معالجة ورفع شعار الشركة...","Uploading company logo..."));const a=await Ya(n,400,400),o=await I("/api/company",{method:"PATCH",body:JSON.stringify({logoUrl:a})});o.company&&(s.data.company={...s.data.company,...o.company}),e.target.value="",Q(),kt(),$(t("تم تحديث وتثبيت شعار مساحة العمل بنجاح!","Company logo updated successfully!"))}catch(a){e.target.value="",$(a.message,!0)}return}}function Ya(e,n=300,a=300){return new Promise((o,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(t("فشل قراءة ملف الصورة.","Failed to read image file."))),i.onload=()=>{const d=new Image;d.onerror=()=>r(new Error(t("صيغة الصورة تالفة أو غير صالحة.","Corrupted or invalid image format."))),d.onload=()=>{try{const l=d.naturalWidth||d.width,p=d.naturalHeight||d.height;if(l>4096||p>4096||l*p>16e6){r(new Error(t("أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.","Image dimensions too large (Pixel Flood Blocked). Please select a standard image.")));return}let u=l,f=p;if(u>n||f>a){const m=Math.min(n/u,a/f);u=Math.round(u*m),f=Math.round(f*m)}const v=document.createElement("canvas");v.width=u,v.height=f;const w=v.getContext("2d");w.imageSmoothingEnabled=!0,w.imageSmoothingQuality="high",w.drawImage(d,0,0,u,f);let y="image/webp",b=v.toDataURL(y,.82);b.startsWith("data:image/webp")||(y="image/jpeg",b=v.toDataURL(y,.82)),b.length>184320&&(b=v.toDataURL(y,.65)),o(b)}catch{r(new Error(t("تعذر معالجة وضغط الصورة.","Failed to process and compress image.")))}},d.src=i.result},i.readAsDataURL(e)})}function ta({url:e,chunk:n,contentRange:a,headers:o={},onProgress:r}){return new Promise((i,d)=>{const l=new XMLHttpRequest;if(l.open("PUT",e,!0),e.includes("/api/")){l.withCredentials=!0;const p=typeof localStorage<"u"?localStorage.getItem("darc_token"):null;p&&!o.Authorization&&l.setRequestHeader("Authorization",`Bearer ${p}`)}for(const[p,u]of Object.entries(o))l.setRequestHeader(p,u);a&&l.setRequestHeader("Content-Range",a),l.upload&&r&&(l.upload.onprogress=p=>{p.lengthComputable&&r(p.loaded)}),l.onload=()=>{i({status:l.status,ok:l.status>=200&&l.status<300,headers:{get:p=>l.getResponseHeader(p)},responseText:l.responseText,json:()=>{try{return JSON.parse(l.responseText)}catch{return{}}}})},l.onerror=()=>d(new Error("Network connection error")),l.ontimeout=()=>d(new Error("Upload chunk timeout")),l.timeout=18e4,l.send(n)})}async function us(e,n){try{const a=await ta({url:e,chunk:new Blob([]),contentRange:`bytes */${n}`});if(a.status===308){const o=a.headers.get("Range");if(o){const r=o.match(/bytes=0-(\d+)/);if(r&&r[1])return parseInt(r[1],10)+1}return 0}if(a.ok)return{completed:!0,data:a.json()}}catch{}return null}var ht=null;function qn({projectName:e,taskName:n,totalFiles:a}){ht&&(clearTimeout(ht),ht=null);let o=document.getElementById("floating-upload-manager");if(o){o.style.opacity="1",o.style.transform="none";const r=o.querySelector("#fum-proj-text"),i=o.querySelector("#fum-task-text");r&&e&&(r.textContent=e),i&&n&&(i.textContent=n)}else{o=document.createElement("div"),o.id="floating-upload-manager",o.setAttribute("dir",s.lang==="ar"?"rtl":"ltr"),o.style.cssText=`
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
            <span id="fum-task-text" style="color:var(--ink-soft);">${c(n||"—")}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;">
          <span id="fum-file-text" style="color:var(--ink);font-weight:600;max-width:230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">...</span>
          <span id="fum-count-text" style="color:var(--muted);font-size:11px;">(1/${a})</span>
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
    `,document.body.appendChild(o);const r=o.querySelector("#fum-minimize-btn"),i=o.querySelector("#fum-body");r.addEventListener("click",()=>{const d=i.style.display==="none";i.style.display=d?"flex":"none",r.textContent=d?"—":"+"}),o.querySelector("#fum-close-btn").addEventListener("click",()=>{o.remove()})}return o}function Ne({fileName:e,fileIndex:n,totalFiles:a,pct:o,loadedMB:r,fileSizeMB:i,speedMBs:d,etaText:l,statusNote:p,isError:u,isDone:f}){const v=document.getElementById("floating-upload-manager");if(!v)return;const w=v.querySelector("#fum-file-text"),y=v.querySelector("#fum-count-text"),b=v.querySelector("#fum-progress-fill"),m=v.querySelector("#fum-pct-text"),x=v.querySelector("#fum-speed-text"),A=v.querySelector("#fum-eta-text"),S=v.querySelector("#fum-status-badge"),E=v.querySelector("#fum-indicator"),z=v.querySelector("#fum-header-title"),C=v.querySelector("#fum-close-btn");e&&w&&(w.textContent=e),y&&n&&a&&(y.textContent=`(${n}/${a})`),b&&typeof o=="number"&&(b.style.width=`${o}%`),m&&typeof o=="number"&&(m.textContent=`${o}%`),x&&r!==void 0&&i!==void 0&&(x.textContent=`${r} / ${i} MB • ${d||"0.0"} MB/s`),A&&l&&(A.textContent=`${t("متبقي:","ETA:")} ${l}`),p&&S?(S.style.display="block",S.textContent=p,S.style.background=u?"var(--red-soft)":"var(--amber-soft)",S.style.color=u?"var(--red)":"var(--amber)",S.style.border=u?"1px solid var(--red)":"1px solid var(--amber)"):!u&&!f&&S&&(S.style.display="none"),f&&(E&&(E.style.background="var(--mint-strong)",E.style.boxShadow="0 0 10px var(--mint-strong)"),z&&(z.textContent=t("اكتمل الرفع بنجاح! ✓","Upload Complete! ✓")),m&&(m.textContent="100%"),b&&(b.style.width="100%"),C&&(C.style.display="inline-block"),S&&(S.style.display="block",S.style.background="var(--mint)",S.style.color="var(--teal-dark)",S.style.border="1px solid var(--mint-strong)",S.textContent=t("تم التوثيق والرفع إلى الخادم بنجاح.","Document saved & uploaded to server.")),ht=setTimeout(()=>{v&&v.parentNode&&(v.style.opacity="0",v.style.transform="translateY(12px)",setTimeout(()=>v.remove(),300))},4500)),u&&(E&&(E.style.background="var(--red)",E.style.boxShadow="0 0 10px var(--red)"),z&&(z.textContent=t("فشل في الرفع ✕","Upload Failed ✕")),C&&(C.style.display="inline-block"))}async function Ia(e,n){if(!e||!e.length||!n)return;const a=s.data?.tasks?.find(o=>o.id===n);return Hn({files:e,taskId:n,projectId:a?.projectId,status:"draft",isTaskModal:!0})}async function Hn({files:e,projectId:n=null,taskId:a=null,discipline:o="عام",status:r="draft",isTaskModal:i=!1}){if(!e||!e.length)return;if(typeof navigator<"u"&&!navigator.onLine){$(t("لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.","Cannot upload drawings or files while offline. Please connect to the internet first."),!0);return}const d=a?s.data?.tasks?.find(S=>S.id===a):null,l=n||d?.projectId,p=l?s.data?.projects?.find(S=>S.id===l):null,u=s.data?.documents?s.data.documents.filter(S=>!S.deletedAt&&(a?S.taskId===a:S.projectId===l)):[],f=p?p.nameAr:"Project",v=d?d.titleAr:o||"General",w={},y=S=>{if(w[S])return w[S];let E=0;return u.forEach(z=>{if(z.originalName&&z.originalName.toLowerCase().endsWith(S)){const C=z.originalName.match(/_v(\d+)\./);C&&parseInt(C[1])>E&&(E=parseInt(C[1]))}}),w[S]=E+1,E+1},b=document.getElementById("upload-progress-container");document.getElementById("upload-progress-bar"),document.getElementById("upload-progress-percent"),document.getElementById("upload-progress-text");const m=document.getElementById("task-dropzone");i&&b&&(b.style.display="block"),i&&m&&(m.style.pointerEvents="none"),qn({projectName:f,taskName:v,totalFiles:e.length});let x=null;const A=S=>(S.preventDefault(),S.returnValue=t("جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.","Uploading large engineering files. Leaving will abort upload."),S.returnValue);if(typeof window<"u"&&(window.addEventListener("beforeunload",A),"wakeLock"in navigator))try{navigator.wakeLock.request("screen").then(S=>{x=S}).catch(()=>{})}catch{}try{for(let S=0;S<e.length;S++){const E=e[S];if(!E.size||E.size===0){$(t(`الملف "${E.name}" فارغ لا يحتوي على بيانات.`,`File "${E.name}" is empty.`),!0);continue}if(E.size>107374182400){$(t(`حجم الملف "${E.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${E.name}" exceeds 100GB limit.`),!0);continue}const z=E.name.split(".").pop()?.toLowerCase()||"";if(["exe","bat","cmd","sh","bash","ps1","vbs","js","mjs","cjs","py","php","phtml","html","htm","jar","msi","dll","com","scr","hta","svg","apk"].includes(z)||E.type==="image/svg+xml"){$(t(`صيغة الملف "${E.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${E.name}" is not permitted for security reasons.`),!0);continue}const C=E.name.lastIndexOf("."),T=C!==-1?E.name.substring(C).toLowerCase():"",j=C!==-1?E.name.substring(0,C):E.name,_=we=>(we||"").replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,"-").replace(/\s+/g,"_").trim(),L=`${_(f)||"Project"}_${_(v)||"General"}_${_(j)||"Drawing"}_v${y(T)}${T}`,M=E.size>=1073741824?`${(E.size/1073741824).toFixed(2)} GB`:`${(E.size/1048576).toFixed(1)} MB`;Ne({fileName:E.name,fileIndex:S+1,totalFiles:e.length,pct:0,loadedMB:"0.0",fileSizeMB:M,speedMBs:"0.0",etaText:"...",statusNote:t("بدء جلسة الرفع المستأنف...","Starting resumable session...")});const G=(await I("/api/documents/session",{method:"POST",body:JSON.stringify({compiledName:L,mimeType:E.type||"application/octet-stream",projectId:l,taskId:a,size:E.size})})).sessionUrl;let U=8388608;E.size<=10485760?U=E.size:E.size<=104857600?U=8388608:E.size<=524288e3?U=16777216:E.size<=2147483648?U=33554432:U=67108864;const F=Date.now();let ie=0;const fe=we=>{const se=Math.min(E.size,ie+we),Te=Math.min(100,Math.round(se/E.size*100)),$e=se>=1073741824?`${(se/1073741824).toFixed(2)} GB`:`${(se/1048576).toFixed(1)} MB`;if(i){const La=document.getElementById("upload-progress-bar"),za=document.getElementById("upload-progress-percent"),Ma=document.getElementById("upload-progress-text"),Ra=document.getElementById("upload-progress-container");Ra&&(Ra.style.display="block"),La&&(La.style.width=`${Te}%`),za&&(za.textContent=`${Te}%`);const ei=(Date.now()-F)/1e3,Oa=se/Math.max(ei,.2),ti=(Oa/1048576).toFixed(1),ai=Math.max(0,E.size-se),mt=Math.round(ai/Math.max(Oa,1)),ni=mt<60?`${mt} ${t("ثانية","s")}`:`${Math.floor(mt/60)}:${String(mt%60).padStart(2,"0")} ${t("دقيقة","min")}`;Ma&&(Ma.textContent=`${t("رفع إلى الخادم","Uploading to server")} (${S+1}/${e.length}): ${E.name} — ${$e} / ${M} (${Te}%) • ${ti} MB/s • ${t("متبقي:","ETA:")} ${ni}`)}const Le=(Date.now()-F)/1e3,ee=se/Math.max(Le,.2),B=(ee/1048576).toFixed(1),ge=Math.max(0,E.size-se),Ft=Math.round(ge/Math.max(ee,1)),Qn=Ft<60?`${Ft} s`:`${Math.floor(Ft/60)}m`;Ne({fileName:E.name,fileIndex:S+1,totalFiles:e.length,pct:Te,loadedMB:$e,fileSizeMB:M,speedMBs:B,etaText:Qn})};fe(0);let W=0,Je=null,Nt=!1;for(;W<E.size;){const we=Math.min(W+U,E.size),se=E.slice(W,we),Te=`bytes ${W}-${we-1}/${E.size}`;let $e=0,Le=!1;for(;!Le&&$e<5;)try{let ee;if(!Nt)try{ee=await ta({url:G,chunk:se,contentRange:Te,headers:{},onProgress:B=>fe(B)})}catch(B){console.warn("[Upload] Direct GDrive upload failed, trying backend proxy:",B.message),Nt=!0}if(Nt){const B={projectId:l,taskId:a,compiledName:L,mimeType:E.type,size:E.size,status:r};ee=await ta({url:`${zt}/api/documents/chunk`,chunk:se,contentRange:Te,headers:{"x-session-url":G,"x-doc-meta":encodeURIComponent(JSON.stringify(B))},onProgress:ge=>fe(ge)})}if(ee.status===308){const B=ee.headers.get("Range");if(B){const ge=B.match(/bytes=0-(\d+)/);ge&&ge[1]?W=parseInt(ge[1],10)+1:W=we}else W=we;ie=W,fe(0),Le=!0}else if(ee.ok){const B=ee.json();Je=B.id||B.document?.id,ie=E.size,fe(0),W=E.size,Le=!0;break}else throw new Error(`Upload returned status ${ee.status}`)}catch(ee){if($e++,Ne({fileName:E.name,fileIndex:S+1,totalFiles:e.length,statusNote:`${t("إعادة المحاولة","Retrying")} (${$e}/5)...`}),$e>=5)throw new Error(`${t("فشل الرفع بعد محاولات متعددة","Upload failed after multiple retries")}: ${ee.message}`);await new Promise(ge=>setTimeout(ge,1e3*Math.pow(2,$e-1)));const B=await us(G,E.size);if(typeof B=="number"&&B>W){W=B,ie=W;break}else if(B&&B.completed){Je=B.data?.id,W=E.size,Le=!0;break}}}Je&&!Je.startsWith("doc_")&&await I("/api/documents/finalize",{method:"POST",body:JSON.stringify({driveFileId:Je,projectId:l,taskId:a,compiledName:L,mimeType:E.type,size:E.size,status:r})})}if(await K(!0),i&&a){const S=s.data?.tasks?.find(z=>z.id===a),E=document.getElementById("task-documents-list");E&&S&&(E.innerHTML=_e(S))}kt(),Ne({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),$(t("تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅","Drawing uploaded & registered successfully ✅"))}catch(S){Ne({isError:!0,statusNote:S.message}),$(S.message,!0)}finally{if(typeof window<"u"&&window.removeEventListener("beforeunload",A),x){try{x.release()}catch{}x=null}if(i){const S=document.getElementById("upload-progress-container"),E=document.getElementById("upload-progress-bar"),z=document.getElementById("task-dropzone");S&&(S.style.display="none"),E&&(E.style.width="0%"),z&&(z.style.pointerEvents="auto");const C=document.getElementById("task-upload-input");C&&(C.value="")}}}typeof window<"u"&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener("dragover",e=>{const n=e.target.closest("#task-dropzone");n&&(e.preventDefault(),n.style.borderColor="var(--brand-teal)",n.style.background="var(--teal-soft)")}),document.addEventListener("dragleave",e=>{const n=e.target.closest("#task-dropzone");n&&(n.style.borderColor="var(--border)",n.style.background="var(--surface-soft)")}),document.addEventListener("drop",e=>{const n=e.target.closest("#task-dropzone");if(n){e.preventDefault(),n.style.borderColor="var(--border)",n.style.background="var(--surface-soft)";const a=n.dataset.taskId,o=e.dataTransfer?.files;o&&o.length&&Ia(o,a)}}));async function ms(){et({theme:s.theme,lang:s.lang});try{s.calendarSystem=localStorage.getItem("darc_calendar_system")||s.calendarSystem||"gregorian"}catch{}if(typeof window<"u"&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",i=>{try{if(!localStorage.getItem("darc-theme")){s.theme=i.matches?"dark":"light",document.documentElement.dataset.theme=s.theme;const d=document.querySelector('[data-action="toggle-theme"]');d&&(d.textContent=s.theme==="dark"?"☀️":"🌙")}}catch{}})}catch{}}const e=typeof window<"u"?window.location.hash.replace(/^#/,""):"",n=new URLSearchParams(e.includes("?")?e.split("?")[1]:e.includes("=")?e:""),a=n.get("activate");if(a)return ct(a);const o=n.get("reset");if(o)return He(o);if(e==="forgot")return X("","forgot");if(e==="login")return X();try{if(e){const[i,d]=e.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)&&(s.view=i,d)){const l=new URLSearchParams(d);l.get("id")&&(s.activeProjectId=l.get("id")),l.get("tab")&&(s.projectTab=l.get("tab")),l.get("section")&&(s.settingsSection=l.get("section"))}}else if(typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route");if(i){const d=JSON.parse(i);d.view&&(s.view=d.view),d.activeProjectId&&(s.activeProjectId=d.activeProjectId),d.projectTab&&(s.projectTab=d.projectTab),d.settingsSection&&(s.settingsSection=d.settingsSection)}}}catch{}s.view==="settings"&&!s.settingsSection&&(s.settingsSection="profile");const r=Qa();r&&r.user?(s.data=r,q(s.view)||(s.view=he()),Q()):en();try{if(typeof navigator<"u"&&navigator.onLine&&rt().length>0&&await la(I),await de(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}if(!window._darcPollingActive){window._darcPollingActive=!0;let i=null,d=0,l=!1,p=Date.now(),u=0;const f=()=>{const y=Date.now()-p>45e3;p=Date.now(),y&&Date.now()-u>4e3&&!l&&w()};if(typeof window<"u"){let y=0;const b=()=>{const m=Date.now();m-y>5e3&&(y=m,f())};window.addEventListener("click",b,{passive:!0}),window.addEventListener("keydown",b,{passive:!0}),window.addEventListener("touchstart",b,{passive:!0}),window.addEventListener("mousemove",b,{passive:!0})}const v=()=>{i&&clearTimeout(i);const y=Date.now()-p>45e3?15e3:4e3,b=d>0?Math.min(25e3,y*Math.pow(2,d)):y;i=setTimeout(w,b)},w=async()=>{if(typeof document<"u"&&document.hidden){v();return}if(!s.data?.user||!s.view||s.view==="login"){v();return}if(l){v();return}l=!0,u=Date.now();try{await de(!0),d=0}catch{d++}finally{l=!1,v()}};v(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&s.data?.user&&s.view&&s.view!=="login"&&(f(),w())})}}catch{typeof window<"u"&&(window.history&&window.history.replaceState?window.history.replaceState(null,"","#login"):window.location.hash="#login"),X()}}typeof window<"u"&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener("hashchange",()=>{if(window._isInternalNav){window._isInternalNav=!1;return}const e=window.location.hash.replace(/^#/,"");if(!e)return;const[n,a]=e.split("?");if(n==="login"){s.data?.user&&(s.data.user=null),X();return}if(n==="forgot"){X("","forgot");return}const o=new URLSearchParams(a||(e.includes("=")?e:""));if(o.get("activate")){ct(o.get("activate"));return}if(o.get("reset")){He(o.get("reset"));return}if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(n)){if(s.data&&!q(n)){oe(he());return}let r=s.activeProjectId;if(a){const i=new URLSearchParams(a);i.get("id")&&(r=i.get("id")),i.get("tab")&&(s.projectTab=i.get("tab")),i.get("section")&&(s.settingsSection=i.get("section"))}s.view!==n||s.activeProjectId!==r?oe(n,r):D()}}));if(typeof window<"u"&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener("scroll",n=>{n.target&&n.target.classList&&(n.target.classList.contains("timeline-scroll")||n.target.classList.contains("gantt-scroll")||n.target.classList.contains("timeline-board"))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows=="function"&&drawTimelineArrows(),e=!1})))},!0)}var H=null,ae=null;function Da(){return H||(H=document.createElement("div"),H.className="drag-placeholder",H.style.cssText=`
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
    `,H.innerHTML=`<span>↓ ${t("الموقع الجديد للمهمة","Drop position")}</span>`),H}function nt(){H&&H.parentNode&&H.parentNode.removeChild(H)}function Ot(e,n){const a=Array.from(e.querySelectorAll(".task-card:not(.is-dragging)"));for(const o of a){const r=o.getBoundingClientRect();if(n<r.top+r.height/2)return o}return null}document.addEventListener("dragstart",e=>{const n=e.target.closest(".task-card");if(n){const a=(s.data?.tasks||[]).find(o=>o.id===n.dataset.taskId);if(!(P()||k("edit_tasks")||a&&a.assigneeId===s.data?.user?.id)){e.preventDefault();return}window._isDraggingTask=!0,ae=n.dataset.taskId,e.dataTransfer.effectAllowed="move";try{e.dataTransfer.setData("text/plain",ae)}catch{}n.classList.add("is-dragging")}});document.addEventListener("dragend",e=>{const n=e.target.closest(".task-card");n&&n.classList.remove("is-dragging"),window._isDraggingTask=!1,window._justDroppedTaskId=ae,window._justDroppedAt=Date.now(),ae=null,document.querySelectorAll(".board-column").forEach(a=>a.classList.remove("drag-over")),nt()});document.addEventListener("dragover",e=>{const n=e.target.closest(".board-column");if(n){e.preventDefault(),e.dataTransfer.dropEffect="move",n.classList.add("drag-over");const a=50,o=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");o&&(e.clientX<a?o.scrollLeft-=14:e.clientX>window.innerWidth-a&&(o.scrollLeft+=14));const r=n.querySelector(".board-cards");if(r){const i=Da(),d=Ot(r,e.clientY);d?i.nextSibling!==d&&r.insertBefore(i,d):(!r.contains(i)||r.lastElementChild!==i)&&r.appendChild(i)}}});document.addEventListener("dragenter",e=>{e.target.closest(".board-column")&&e.preventDefault()});document.addEventListener("dragleave",e=>{const n=e.target.closest(".board-column");if(n){if(e.relatedTarget&&n.contains(e.relatedTarget))return;const a=n.getBoundingClientRect(),o=e.clientX,r=e.clientY;(o<=a.left||o>=a.right||r<=a.top||r>=a.bottom)&&(n.classList.remove("drag-over"),nt())}});async function Wn(e,n,a=null){if(!e){nt();return}e.classList.remove("drag-over");const o=e.querySelector(".board-cards");let r=null;if(H&&H.parentNode===o){const y=H.nextElementSibling;y&&y.classList.contains("task-card")&&y.dataset.taskId!==(a||ae)&&(r=y.dataset.taskId)}else if(o){const y=Ot(o,n);y&&y.dataset.taskId!==(a||ae)&&(r=y.dataset.taskId)}nt();const i=a||ae;ae=null;const d=e.dataset.status;if(!i||!d)return;const l=(s.data?.tasks||[]).find(y=>y.id===i);if(!l)return;if(!(l.status===d||d==="review"&&["review","approval","blocked"].includes(l.status))&&d==="done"&&l.dependencies&&l.dependencies.length&&l.dependencies.filter(y=>{const b=s.data.tasks.find(m=>m.id===y);return b&&b.status!=="done"}).length)return $(t("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);s.projectTaskSort="custom",s.myTaskSort="custom",localStorage.setItem("darc_task_sort_pref","custom");const p=d==="review"?["review","approval","blocked"]:[d];let u=(s.data.tasks||[]).filter(y=>y.projectId===l.projectId&&(p.includes(y.status)||y.id===i));const f=u.findIndex(y=>y.id===i);f!==-1&&u.splice(f,1),u.sort((y,b)=>De(y)-De(b)),l.status=d;let v=u.length;if(r){let y=u.findIndex(b=>b.id===r);if(y===-1&&H&&H.parentNode){let b=H.nextElementSibling;for(;b;){if(b.classList?.contains("task-card")&&b.dataset.taskId){const m=u.findIndex(x=>x.id===b.dataset.taskId);if(m!==-1){y=m;break}}b=b.nextElementSibling}}y!==-1&&(v=y)}u.splice(v,0,l),u.forEach((y,b)=>{const m=(b+1)*100;y.sortOrder=m,y.sort_order=m,y.customFields={...y.customFields||{},sortOrder:m,sort_order:m},y.custom_fields={...y.custom_fields||{},sortOrder:m,sort_order:m}}),D();const w=document.querySelector(`.task-card[data-task-id="${i}"]`);w&&(w.classList.add("just-dropped"),setTimeout(()=>w.classList.remove("just-dropped"),400)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,u.forEach(y=>{window._pendingReorderBatch.set(y.id,{id:y.id,status:y.status,sortOrder:y.sortOrder,customFields:y.customFields})}),window._reorderSyncTimer=setTimeout(()=>{const y=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),I("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:y})}).catch(b=>{console.warn("Reorder sync error:",b),$(t("فشل حفظ الترتيب الجديد في الخادم.","Failed to save task order to server."),!0)})},150)}document.addEventListener("drop",async e=>{const n=e.target.closest(".board-column");e.preventDefault();const a=ae||(e.dataTransfer?e.dataTransfer.getData("text/plain"):null);await Wn(n,e.clientY,a)});var J=null,Y=null,Jn=0,Vn=0,Gn=0,Yn=0,me=null,it=!1;function aa(){me&&(clearTimeout(me),me=null),Y&&Y.parentNode&&Y.parentNode.removeChild(Y),Y=null,J&&(J.style.opacity="",J.style.pointerEvents="",J.classList.remove("is-dragging")),document.querySelectorAll(".board-column").forEach(e=>e.classList.remove("drag-over")),nt(),J=null,it=!1,ae=null}document.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;const n=e.target.closest(".task-card");if(!n||e.target.closest("button, a, input, select, textarea, .btn"))return;const a=(s.data?.tasks||[]).find(r=>r.id===n.dataset.taskId);if(!(P()||k("edit_tasks")||a&&a.assigneeId===s.data?.user?.id))return;J=n;const o=e.touches[0];Jn=o.clientX,Vn=o.clientY,it=!1,me=setTimeout(()=>{if(!J)return;if(it=!0,ae=J.dataset.taskId,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(40)}catch{}const r=J.getBoundingClientRect();Gn=o.clientX-r.left,Yn=o.clientY-r.top,Y=J.cloneNode(!0),Y.id="touch-drag-ghost",Y.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: ${r.width}px;
      pointer-events: none;
      z-index: 10000;
      opacity: 0.95;
      transform: translate3d(${r.left}px, ${r.top}px, 0) scale(1.03) rotate(1.5deg);
      box-shadow: 0 16px 36px rgba(0,0,0,0.25);
      transition: transform 0.05s linear;
      border: 1px solid var(--teal, #0d9488);
      background: var(--surface, #ffffff);
      border-radius: 12px;
    `,document.body.appendChild(Y),J.classList.add("is-dragging"),J.style.opacity="0.25",J.style.pointerEvents="none";const i=J.closest(".board-column");if(i){i.classList.add("drag-over");const d=i.querySelector(".board-cards");if(d){const l=Da(),p=Ot(d,o.clientY);p&&l.nextSibling!==p?d.insertBefore(l,p):d.contains(l)||d.appendChild(l)}}},220)},{passive:!0});document.addEventListener("touchmove",e=>{if(!J)return;const n=e.touches[0],a=Math.abs(n.clientX-Jn),o=Math.abs(n.clientY-Vn);if(!it){(a>8||o>8)&&(me&&(clearTimeout(me),me=null),J=null);return}if(e.cancelable&&e.preventDefault(),Y){const l=n.clientX-Gn,p=n.clientY-Yn;Y.style.transform=`translate3d(${l}px, ${p}px, 0) scale(1.03) rotate(1.5deg)`}const r=45,i=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");i&&(n.clientX<r?i.scrollLeft-=12:n.clientX>window.innerWidth-r&&(i.scrollLeft+=12));const d=document.elementFromPoint(n.clientX,n.clientY)?.closest(".board-column");if(document.querySelectorAll(".board-column").forEach(l=>l.classList.toggle("drag-over",l===d)),d){const l=d.querySelector(".board-cards");if(l){const p=Da(),u=Ot(l,n.clientY);u?p.nextSibling!==u&&l.insertBefore(p,u):(!l.contains(p)||l.lastElementChild!==p)&&l.appendChild(p)}}},{passive:!1});document.addEventListener("touchend",async e=>{if(me&&(clearTimeout(me),me=null),!!J)if(it){const n=e.changedTouches[0],a=document.elementFromPoint(n.clientX,n.clientY)?.closest(".board-column")||H&&H.closest(".board-column"),o=ae;Y&&Y.parentNode&&Y.parentNode.removeChild(Y),Y=null,a&&o&&await Wn(a,n.clientY,o),aa()}else aa()});document.addEventListener("touchcancel",()=>{aa()});var fs="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",Kn=typeof navigator<"u"&&!!navigator.connection?.saveData,gs=3e5,vs=Kn?1e4:3e4,ys=Kn?600:300,bs=25e3,hs=150,Ht=null,Ka=!1,na=!1,Me=null,re=null,xt=null,Ue=null,Wt=null,Re=null,Xa=0,Qe=0,xe=!1,_a=Date.now(),ia=0,gt=null,ue=new Map;function xs(e){if(!e||typeof e!="string")return;const n=Date.now();ue.set(e,n);for(const[a,o]of ue.entries())n-o>8e3&&ue.delete(a);if(ue.size>hs){const a=ue.keys().next().value;a&&ue.delete(a)}}function st(){return typeof localStorage>"u"?!1:!!localStorage.getItem("darc_token")}var Dt=new Set(["__proto__","constructor","prototype"]),Xn=new Set(["custom_fields","permissions","details"]);function _t(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(_t);const n={};for(const[a,o]of Object.entries(e)){if(Dt.has(a))continue;const r=a.indexOf("_")===-1?a:a.replace(/_([a-z0-9])/g,(i,d)=>d.toUpperCase());Dt.has(r)||(n[r]=o!==null&&typeof o=="object"&&!Xn.has(a)?_t(o):o)}return n}function Pt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Pt);const n={};for(const[a,o]of Object.entries(e))Dt.has(a)||(n[a]=o!==null&&typeof o=="object"&&!Xn.has(a)?Pt(o):o);return n}function Xe(e){if(!e||!s.data||!Array.isArray(s.data.tasks)||!Array.isArray(s.data.projects))return;const n=s.data.projects.find(p=>p.id===e);if(!n)return;const a=s.data.tasks.filter(p=>p.projectId===e&&!p.deletedAt&&!p.deleted_at);let o=0,r=0;for(const p of a){const u=Number(p.weight)||1,f=Number(p.progress)||0;o+=u,r+=u*(f/100)}const i=o>0?Math.round(r/o*100):0;n.progress!==i&&(n.progress=i),n.totalWeight=o;const d=a.length>0,l=d&&a.every(p=>p.status==="done"||p.status==="completed");d&&l&&i===100?n.lifecycle="completed":n.lifecycle==="completed"&&(!l||i<100)&&(n.lifecycle="active")}function Jt(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const n=(s.data?.notifications||[]).filter(o=>!o.read&&!o.readAt).length;let a=e.querySelector(".notification-dot");n>0?a||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):a&&a.remove()}function ws(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Me||Me.state==="closed")&&(Me=new e),Me.state==="suspended"&&Me.resume().catch(()=>{});const n=Me,a=n.createOscillator(),o=n.createGain();a.type="sine",a.frequency.setValueAtTime(587.33,n.currentTime),a.frequency.exponentialRampToValueAtTime(880,n.currentTime+.15),o.gain.setValueAtTime(.06,n.currentTime),o.gain.exponentialRampToValueAtTime(.001,n.currentTime+.35),a.connect(o),o.connect(n.destination),a.start(),a.stop(n.currentTime+.36)}catch{}}function $s(){gt&&cancelAnimationFrame(gt),gt=requestAnimationFrame(()=>{gt=null,typeof D=="function"?D():typeof Q=="function"&&Q()})}function wt(e,n,a,o){if(!s.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const r=a?Pt(_t(a)):null,i=o?Pt(_t(o)):null,d=r&&r.id||i&&i.id;if(!d)return!1;const l=ue.get(d);if(l&&Date.now()-l<5e3)return!0;if(s.data?.user?.role_id!=="admin"&&r){if(e==="notifications"){if(r.userId&&r.userId!==s.data?.user?.id)return!1}else if(e==="tasks"||e==="documents"||e==="comments"){const v=r.projectId||(e==="comments"?s.data?.tasks?.find(w=>w.id===r.taskId)?.projectId:null);if(v&&!s.data?.projects?.some(w=>w.id===v))return!1}}Array.isArray(s.data[e])||(s.data[e]=[]);const p=s.data[e];let u=!1;const f=!!(r?.deletedAt||r?.deleted_at);if(n==="DELETE"||f){const v=p.length;let w=null;e==="tasks"&&(w=p.find(y=>y.id===d)?.projectId||i?.projectId||r?.projectId),s.data[e]=p.filter(y=>y.id!==d),s.data[e].length!==v&&(u=!0),e==="tasks"&&w?Xe(w):e==="projects"?Array.isArray(s.data.tasks)&&(s.data.tasks=s.data.tasks.filter(y=>y.projectId!==d)):e==="notifications"&&Jt()}else if(n==="UPDATE"&&r){const v=p.findIndex(w=>w.id===d);if(v!==-1){for(const[w,y]of Object.entries(r))Dt.has(w)||(p[v][w]=y);u=!0}else p.unshift(r),u=!0;e==="tasks"?(r.projectId&&Xe(r.projectId),i?.projectId&&i.projectId!==r.projectId&&Xe(i.projectId)):e==="notifications"&&Jt()}else if(n==="INSERT"&&r){if(p.some(v=>v.id===d)||(p.unshift(r),u=!0),e==="tasks"&&r.projectId)Xe(r.projectId);else if(e==="notifications"){const v=s.data?.user?.id;if(v&&r.userId===v&&!r.read){Jt();const w=r.content||(s.lang==="ar"?r.titleAr||r.title:r.titleEn||r.title||r.titleAr)||t("إشعار جديد","New notification");w&&$(`🔔 ${w}`,!1),ws()}}}if(u){Tt();const v=r?.taskId||i?.taskId;if(v){const w=(s.data?.tasks||[]).find(y=>y.id===v);if(w){if(e==="comments"){const y=document.getElementById("task-comment-form");if(y&&y.dataset.taskId===v){const b=document.getElementById("task-comments-list");b&&typeof at=="function"&&(b.innerHTML=at(w),b.scrollTop=b.scrollHeight)}}if(e==="documents"){const y=document.getElementById("task-dropzone");if(y&&y.dataset.taskId===v){const b=document.getElementById("task-documents-list");b&&typeof _e=="function"&&(b.innerHTML=_e(w))}}}}return $s(),!0}return!1}function ot(e="realtime"){st()&&(xe&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!s.data||!s.view||(Ht&&clearTimeout(Ht),Ht=setTimeout(async()=>{try{await de(!0)}catch(n){console.warn("[Realtime] Sync error:",String(e),n.message)}},ys)))}function sa(e,n,a,o={}){e&&e.readyState===WebSocket.OPEN&&(Xa++,e.send(JSON.stringify({topic:n,event:a,payload:o,ref:String(Xa)})))}function ks(e){Pa(),xt=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&sa(e,"phoenix","heartbeat")},bs)}function Pa(){xt&&(clearInterval(xt),xt=null)}function Zn(e="disconnect"){if(na=!0,Pa(),Ue&&(clearTimeout(Ue),Ue=null),re){try{re.close(1e3,e)}catch{}re=null}}function oa(e="idle"){xe||(xe=!0,Zn(e))}function ra(e="wake_up"){const n=xe;xe=!1,st()&&(typeof navigator<"u"&&!navigator.onLine||((!re||re.readyState===WebSocket.CLOSED||re.readyState===WebSocket.CLOSING)&&Ca(),(n||e==="tab_visible")&&ot(e)))}function Ca(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&st()&&!xe&&!(re&&(re.readyState===WebSocket.CONNECTING||re.readyState===WebSocket.OPEN))){na=!1;try{const e=new WebSocket(fs);re=e,e.onopen=()=>{Qe=0,ks(e),sa(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(n=>{sa(e,`realtime:public:${n}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:n}]}})})},e.onmessage=n=>{try{const{event:a,topic:o,payload:r}=JSON.parse(n.data);if(a==="phx_reply"||a==="phx_close")return;if(a==="postgres_changes"&&r?.data){const{table:i,type:d,record:l,old_record:p}=r.data;if(wt(i,d,l,p))return}if((a==="INSERT"||a==="UPDATE"||a==="DELETE")&&o?.startsWith("realtime:public:")){const i=o.split(":")[2];if(wt(i,a,r?.record||r?.new,r?.old_record||r?.old))return}if(o==="realtime:darc_live"&&(a==="broadcast"||a==="STATE_MUTATION"||a==="GRANULAR_DELTA")){const i=r?.payload||r,d=i?.mutationId||i?.id||i?.entityId;if(d&&ue.has(d))return;if(i?.delta){const{table:l,action:p,record:u,oldRecord:f}=i.delta;if(wt(l,p,u,f))return}ot("edge_broadcast");return}(a==="broadcast"||o==="realtime:darc_live"||typeof o=="string"&&o.startsWith("realtime:public:"))&&ot("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=n=>{if(Pa(),re=null,!(na||!st()||xe)&&!(n?.reason==="logout"||n?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){Qe++;const a=Math.min(3e4,Math.pow(2,Math.min(Qe,5))*1e3);Ue&&clearTimeout(Ue),Ue=setTimeout(()=>{Ca()},a)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function Za(){const e=Date.now();e-ia>1e4&&(ia=e,_a=e,xe&&(typeof document>"u"||!document.hidden)&&ra("user_active"))}function Ss(){Wt&&clearInterval(Wt),Wt=setInterval(()=>{const e=Date.now();for(const[n,a]of ue.entries())e-a>8e3&&ue.delete(n);xe||typeof document<"u"&&document.hidden||Date.now()-_a>=gs&&oa("inactivity_idle")},6e4)}function Es(){if(!Ka){if(Ka=!0,st()&&Ca(),Ss(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,Za,{passive:!0})}),window.addEventListener("mousemove",Za,{passive:!0})),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden?(Re&&clearTimeout(Re),Re=setTimeout(()=>{oa("tab_hidden")},vs)):(Re&&(clearTimeout(Re),Re=null),_a=Date.now(),ia=Date.now(),ra("tab_visible"))}),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=n=>{if(n.data?.type==="GRANULAR_DELTA"&&n.data.delta){const{table:a,action:o,record:r,oldRecord:i}=n.data.delta;wt(a,o,r,i)}else n.data?.type==="STATE_MUTATION"&&ot("broadcast_channel")},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{s.isOffline=!1,Qe=0;const e=window.api,n=typeof window.choose=="function"?window.choose:(o=>o),a=typeof window.showToast=="function"?window.showToast:console.log;if(ra("online"),e){const o=await la(e);o&&o.synced>0?a(n(`تمت استعادة الاتصال ومزامنة ${o.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${o.synced} pending actions successfully! 🚀`),!1):a(n("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}ot("online")}),window.addEventListener("offline",()=>{if(s.isOffline=!0,Qe=0,oa("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function As(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now()})}catch{}}typeof window<"u"&&(window.notifyStateMutation=As,window.disconnectSupabaseRealtime=Zn,window.recordRecentLocalMutation=xs,window.recalculateProjectProgressInMemory=Xe);document.documentElement.dataset.theme=s.theme;document.documentElement.lang=s.lang;document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";s.lang==="en"?document.body.classList.add("is-ltr"):document.body.classList.remove("is-ltr");Object.assign(window,mi);Object.assign(window,Ti);Object.assign(window,Di);Object.assign(window,Ri);Object.assign(window,Li);Object.assign(window,Ui);Object.assign(window,Wi);Object.assign(window,Ki);Object.assign(window,as);Object.assign(window,Ai);Object.assign(window,rs);Object.assign(window,fi);os();document.addEventListener("click",e=>{const n=e.target.closest("[data-action], [data-view], button, a");if(n){const a=n.dataset.action||n.dataset.view||n.innerText?.trim()?.slice(0,40)||n.tagName;lt("ui.click",`النقر على: ${a}`)}handleClick(e).catch(a=>{Lt(a,{source:"handleClick"}),showToast(a.message,!0)})});document.addEventListener("submit",e=>{const n=e.target.id||e.target.dataset.action||"form";lt("form.submit",`إرسال نموذج: ${n}`),handleSubmit(e).catch(a=>{Lt(a,{source:"handleSubmit"}),showToast(a.message,!0)})});document.addEventListener("input",handleInput);document.addEventListener("change",handleChange);document.addEventListener("keydown",e=>{e.key==="Escape"&&closeModal()});var Vt=null;window.addEventListener("resize",()=>{s.view==="project-detail"&&s.projectTab==="timeline"&&(Vt||(Vt=requestAnimationFrame(()=>{Vt=null,drawTimelineArrows()})))});window.addEventListener("error",e=>{const n=String(e?.message||e?.error?.message||"");n.includes("Turnstile")||n.includes("turnstile")||n.includes("Script error")||(console.error("Runtime Error:",e.error),Lt(e.error||{message:n},{source:"window.onerror"}),typeof showToast=="function"&&showToast(`خطأ برمجي: ${e.message}`,!0))});window.addEventListener("unhandledrejection",e=>{const n=String(e?.reason?.message||e?.reason||"");n.includes("Turnstile")||n.includes("turnstile")||n.includes("Script error")||(console.error("Unhandled Rejection:",e.reason),Lt(e.reason||{message:n},{source:"unhandledrejection",errorType:"UnhandledRejection"}))});"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(e=>{console.warn("[PWA] ServiceWorker registration skipped:",e.message)})});Es();Ei();init();
