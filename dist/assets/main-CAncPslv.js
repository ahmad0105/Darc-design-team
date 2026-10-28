var ha=Object.defineProperty,ne=(e,a)=>{let n={};for(var o in e)ha(n,o,{get:e[o],enumerable:!0});return a||ha(n,Symbol.toStringTag,{value:"Module"}),n};(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function ut(e){if(typeof document>"u"||!e||!document.cookie)return null;const a=document.cookie.split("; "),n=encodeURIComponent(String(e))+"=",o=String(e)+"=";for(let r=0;r<a.length;r++){const i=a[r];if(i.startsWith(n)){const d=i.substring(n.length);try{return decodeURIComponent(d)}catch{return d}}else if(i.startsWith(o)){const d=i.substring(o.length);try{return decodeURIComponent(d)}catch{return d}}}return null}function Cn(){if(typeof window>"u")return"ar";try{let e=ut("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const a=ut("darc_prefs");if(a)try{e=JSON.parse(a).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function Ln(){if(typeof window>"u")return"light";try{let e=ut("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const a=ut("darc_prefs");if(a)try{e=JSON.parse(a).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function Mn(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const a=window.location.hash.replace(/^#/,"");if(a&&!["login","forgot"].includes(a)){const[o,r]=a.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(o)){let i=null,d="overview",l="profile";if(r){const p=new URLSearchParams(r),m=p.get("id");m&&/^[a-zA-Z0-9_-]{3,64}$/.test(m)&&(i=m);const g=p.get("tab");g&&["overview","tasks","drawings","documents","timeline","activity"].includes(g)&&(d=g);const y=p.get("section");y&&["profile","company","roles","accounts","audit","trash","preferences"].includes(y)&&(l=y)}return{view:o,activeProjectId:i,projectTab:d,settingsSection:l}}}const n=sessionStorage.getItem("darc_last_route");if(n){const o=JSON.parse(n);if(o.view)return{view:o.view,activeProjectId:o.activeProjectId||null,projectTab:o.projectTab||"overview",settingsSection:o.settingsSection||"profile"}}}catch{}return e}var rt=Mn(),s={lang:Cn(),theme:Ln(),view:rt.view,activeProjectId:rt.activeProjectId,projectTab:rt.projectTab,settingsSection:rt.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},zn="darc_offline_db",Rn=1,ke="cache_store",Oe="darc_offline_bootstrap",ve="darc_offline_mutations_queue",At=!1,Tt=null;function qt(){return typeof indexedDB>"u"?Promise.resolve(null):(Tt||(Tt=new Promise(e=>{try{const a=indexedDB.open(zn,Rn);a.onupgradeneeded=n=>{const o=n.target.result;o.objectStoreNames.contains(ke)||o.createObjectStore(ke)},a.onsuccess=()=>e(a.result),a.onerror=()=>e(null)}catch{e(null)}})),Tt)}async function On(e){const a=await qt();return a?new Promise(n=>{try{const o=a.transaction(ke,"readonly").objectStore(ke).get(e);o.onsuccess=()=>n(o.result||null),o.onerror=()=>n(null)}catch{n(null)}}):null}async function Nn(e,a){const n=await qt();return n?new Promise(o=>{try{const r=n.transaction(ke,"readwrite").objectStore(ke).put(a,e);r.onsuccess=()=>o(!0),r.onerror=()=>o(!1)}catch{o(!1)}}):!1}async function xa(e){const a=await qt();return a?new Promise(n=>{try{const o=a.transaction(ke,"readwrite").objectStore(ke).delete(e);o.onsuccess=()=>n(!0),o.onerror=()=>n(!1)}catch{n(!1)}}):!1}function Fn(){return typeof navigator<"u"?navigator.onLine:!0}function de(e){if(!e)return;const a={timestamp:Date.now(),data:e};if(Nn(Oe,a).catch(()=>{}),typeof localStorage<"u"){const n=()=>{try{localStorage.setItem(Oe,JSON.stringify(a))}catch(o){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",o.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:2e3}):setTimeout(n,50)}}function Pa(){if(typeof localStorage<"u")try{const e=localStorage.getItem(Oe);if(e){const a=JSON.parse(e);if(a?.data)return a.data}}catch{}return null}async function wa(){const e=await On(Oe);return e?.data?e.data:Pa()}async function $a(){if(typeof localStorage<"u")try{localStorage.removeItem(Oe),localStorage.removeItem(ve)}catch{}await Promise.all([xa(Oe),xa(ve)]),Me()}function Me(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:tt().length}}))}function ze(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function ka({path:e,method:a="POST",body:n=null,description:o=""}){if(typeof localStorage>"u")return null;try{const r=localStorage.getItem(ve),i=r?JSON.parse(r):[];if(a==="DELETE"){if(e.startsWith("/api/tasks/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/tasks"&&p.body?.id===l)){const p=i.filter(m=>!(m.path==="/api/tasks"&&m.body?.id===l||m.path===`/api/tasks/${l}`||m.path.startsWith(`/api/tasks/${l}/`)));return localStorage.setItem(ve,JSON.stringify(p)),Me(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/projects"&&p.body?.id===l)){const p=i.filter(m=>!(m.path==="/api/projects"&&m.body?.id===l||m.path===`/api/projects/${l}`||m.method==="POST"&&m.path==="/api/tasks"&&m.body?.projectId===l));return localStorage.setItem(ve,JSON.stringify(p)),Me(),{id:"compacted",compacted:!0}}}}const d={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substr(2,6),path:e,method:a,body:n,description:o,createdAt:new Date().toISOString()};return i.push(d),localStorage.setItem(ve,JSON.stringify(i)),Me(),console.log("[Offline Outbox] Enqueued mutation:",d),d}catch(r){return console.warn("[Offline Outbox] Failed to enqueue mutation:",r.message),null}}function tt(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(ve);return e?JSON.parse(e):[]}catch{return[]}}function Bn(){typeof localStorage>"u"||(localStorage.removeItem(ve),Me())}function Ea(e,a,n,o){if(!o||!o.data)return{ok:!0,queued:!0,offline:!0};const r=new Date().toISOString();if(a==="POST"&&e==="/api/tasks"&&n){const i=n.id||ze("tsk");n.id=i;const d={id:i,code:"OFFLINE",projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",status:n.status||"not_started",priority:n.priority||"medium",categoryAr:n.categoryAr||"عام",categoryEn:n.categoryEn||"General",weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:o.data.users?.find(p=>p.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:r,updatedAt:r,_isOfflinePending:!0};o.data.tasks||(o.data.tasks=[]);const l=o.data.tasks.findIndex(p=>p.id===i);return l!==-1?o.data.tasks[l]=d:o.data.tasks.unshift(d),de(o.data),{ok:!0,queued:!0,offline:!0,task:d}}if(a==="PATCH"&&e.startsWith("/api/tasks/")&&n){const i=e.split("/")[3],d=(o.data.tasks||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...o.data.tasks[d],...n,updatedAt:r,_isOfflinePending:!0};return n.assigneeId!==void 0&&(l.assignee=o.data.users?.find(p=>p.id===n.assigneeId)||null),o.data.tasks[d]=l,de(o.data),{ok:!0,queued:!0,offline:!0,task:l}}}if(a==="DELETE"&&e.startsWith("/api/tasks/")){const i=e.split("/")[3];return o.data.tasks&&(o.data.tasks=o.data.tasks.filter(d=>d.id!==i),de(o.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e==="/api/projects"&&n){const i=n.id||ze("prj");n.id=i;const d={id:i,code:n.code||"DARC-OFF",nameAr:n.nameAr||n.name||"مشروع محلي جديد",nameEn:n.nameEn||n.name||"New Offline Project",clientAr:n.clientAr||"",clientEn:n.clientEn||"",descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",lifecycle:n.lifecycle||"planning",health:n.health||"on_track",progress:0,progressMode:"weighted",managerId:n.managerId||o.data.user?.id,startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:r,updatedAt:r,_isOfflinePending:!0};o.data.projects||(o.data.projects=[]);const l=o.data.projects.findIndex(p=>p.id===i);return l!==-1?o.data.projects[l]=d:o.data.projects.unshift(d),de(o.data),{ok:!0,queued:!0,offline:!0,project:d}}if(a==="PATCH"&&e.startsWith("/api/projects/")&&n){const i=e.split("/")[3],d=(o.data.projects||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...o.data.projects[d],...n,updatedAt:r,_isOfflinePending:!0};return o.data.projects[d]=l,de(o.data),{ok:!0,queued:!0,offline:!0,project:l}}}if(a==="DELETE"&&e.startsWith("/api/projects/")){const i=e.split("/")[3];return o.data.projects&&(o.data.projects=o.data.projects.filter(d=>d.id!==i),de(o.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e.includes("/comments")&&n){const i=e.split("/")[3],d={id:n.id||ze("cmt"),taskId:i,userId:o.data.user?.id,content:n.content,createdAt:r,_isOfflinePending:!0};return n.id=d.id,o.data.comments||(o.data.comments=[]),o.data.comments.some(l=>l.id===d.id)||o.data.comments.push(d),de(o.data),{ok:!0,queued:!0,offline:!0,comment:d}}return a==="PATCH"&&e==="/api/tasks/reorder"&&n&&Array.isArray(n.items)?(o.data.tasks&&(n.items.forEach(i=>{const d=o.data.tasks.find(l=>l.id===i.id);d&&(i.status&&(d.status=i.status),i.sortOrder&&(d.sortOrder=i.sortOrder),i.customFields&&(d.customFields={...d.customFields||{},...i.customFields}),d._isOfflinePending=!0)}),de(o.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function Ht(e){if(At)return{total:0,synced:0,failed:0};const a=tt();if(!a.length)return{total:0,synced:0,failed:0};At=!0,console.log(`[Offline Sync] Replaying ${a.length} pending mutations...`);let n=0,o=!1;const r=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,i=new Set(["POST","PATCH","PUT","DELETE"]);for(let d=0;d<a.length;d++){const l=a[d];if(!l||!l.path||typeof l.path!="string"||!r.test(l.path)||!i.has(l.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",l?.id,l?.path);continue}try{const p={method:l.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":l.id,"X-Idempotency-Key":l.id}};l.body&&(p.body=typeof l.body=="string"?l.body:JSON.stringify(l.body));const m=await e(l.path,p);if(m&&m.error&&!m.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",l.id,m.error);else{n++;const g=l.body&&typeof l.body=="object"&&l.body.id||typeof l.path=="string"&&l.path.split("/")[3];g&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(g)}}catch(p){if(console.error("[Offline Sync] Failed to replay mutation:",l.id,l.path,p.message),typeof navigator<"u"&&!navigator.onLine||p.message&&(p.message.includes("تعذر الاتصال")||p.message.includes("fetch")||p.message.includes("NetworkError")||p.name==="TypeError")){const m=a.slice(d);typeof localStorage<"u"&&localStorage.setItem(ve,JSON.stringify(m)),o=!0;break}}}return o||Bn(),At=!1,Me(),{total:a.length,synced:n,failed:o?a.length-n:0}}var Un=ne({closeModal:()=>J,modalShell:()=>re,renderLoading:()=>_a,showToast:()=>$});function _a(){document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${t("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var Ue=!1;function J(e=!1){const a=document.getElementById("preview-modal-overlay");a&&(a.style.display="none",a.innerHTML="");const n=document.getElementById("modal-root");if(!n||!n.hasChildNodes()){document.body.style.overflow="";return}if(e){n.innerHTML="",document.body.style.overflow="",Ue=!1;return}if(Ue)return;Ue=!0;const o=n.querySelector(".modal-backdrop"),r=n.querySelector(".modal");o&&r?(o.classList.add("is-closing"),r.classList.add("is-closing"),setTimeout(()=>{n.innerHTML="",document.body.style.overflow="",Ue=!1},150)):(n.innerHTML="",document.body.style.overflow="",Ue=!1)}function re(e,a,n,o="",r=""){return document.body.style.overflow="hidden",`<div class="modal-backdrop"><div class="modal ${r}" data-modal="${o}"><div class="modal-head"><div><h2>${c(e)}</h2><p>${c(a||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${t("إغلاق","Close")}">${x("close",15)}</button></div>${n}</div></div>`}function $(e,a=!1){const n=document.getElementById("toast-root");if(!n)return;const o=document.createElement("div");o.className=`toast ${a?"error":""}`,o.innerHTML=`${x(a?"alert":"check",16)}<span>${c(e)}</span>`,n.appendChild(o),setTimeout(()=>o.remove(),3600)}var qn=ne({I18N:()=>_t,PERMISSION_ALIASES:()=>Ra,avatar:()=>N,can:()=>S,canManageAccountPermissions:()=>Yn,choose:()=>t,currentViewTitle:()=>Gt,dateLabel:()=>xt,dueLabel:()=>Ma,esc:()=>c,extractDrawingVersion:()=>La,formatDateTime:()=>Jt,formatReportDate:()=>Ie,formatReportTime:()=>at,formatUnifiedDateNumeric:()=>Wn,getActiveCalendarSystem:()=>Ee,getCookieVal:()=>Hn,getFileFormatInfo:()=>Vt,getHijriDateEquivalent:()=>Vn,getTaskStatusStyle:()=>Wt,getTimeBasedGreeting:()=>Ca,icon:()=>x,initials:()=>Ye,isAdmin:()=>_,isOverdue:()=>$e,playSuccessChime:()=>mt,priorityText:()=>Gn,roleFor:()=>za,roleName:()=>Z,runInWorker:()=>Kn,sanitizeForSpreadsheet:()=>R,savePreferencesCookies:()=>Ge,showToast:()=>$,statusBadge:()=>Jn,statusText:()=>O,t:()=>f}),_t={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function f(e){return _t[s.lang][e]||_t.ar[e]||e}function t(e,a){return s.lang==="ar"?e:a}function Hn(e){if(typeof document>"u"||!e)return null;const a=document.cookie?document.cookie.split("; "):[];for(const n of a){const o=n.indexOf("=");if(o!==-1&&n.slice(0,o).trim()===e)return decodeURIComponent(n.slice(o+1))}return null}function Ge({theme:e,lang:a}={}){if(typeof document>"u")return;const n=31536e3,o=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let r="";if(typeof window<"u"){const g=window.location.hostname;(g==="darc-design.bond"||g.endsWith(".darc-design.bond"))&&(r="; Domain=.darc-design.bond")}const i=e==="dark"||e==="light"?e:null,d=a==="ar"||a==="en"?a:null;if(i){document.cookie=`darc_theme=${encodeURIComponent(i)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`;try{window.localStorage.setItem("darc-theme",i)}catch{}}if(d){document.cookie=`darc_lang=${encodeURIComponent(d)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`;try{window.localStorage.setItem("darc-locale",d)}catch{}}const l=i||(s&&s.theme==="dark"?"dark":"light")||"light",p=d||(s&&s.lang==="en"?"en":"ar")||"ar",m=JSON.stringify({theme:l,lang:p});document.cookie=`darc_prefs=${encodeURIComponent(m)}; Path=/; Max-Age=${n}; SameSite=Lax${o}${r}`}function c(e){return String(e??"").replace(/[&<>'"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[a])}function R(e){if(e==null)return"";const a=String(e),n=a.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(a)?`'${a}`:a}function x(e,a=18){const n={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};return`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n[e]||n.info}</svg>`}function Ye(e){if(!e)return"D";const a=s.lang==="ar"?e.name:e.nameEn||e.name;return(a.replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join("")||a.slice(0,2)).toUpperCase()}function N(e,a=""){const n=e||{name:"DARC",avatarColor:"#0d6269"},o=/^#[0-9a-f]{6}$/i.test(n.avatarColor||"")?n.avatarColor:"#0d6269",r=c(t(n.name,n.nameEn||n.name));if(n.avatarUrl){const i=c(Ye(n)).replace(/['"\\]/g,"");return`<span class="avatar ${a}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${r}"><img src="${c(n.avatarUrl)}" alt="${r}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${o}';this.parentElement.textContent='${i}';" /></span>`}return`<span class="avatar ${a}" style="background:${o}" title="${r}">${c(Ye(n))}</span>`}function Ca(){const e=new Date().getHours();return s.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function Wt(e){const a=e?.status,n=$e(e);return a==="done"||a==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:t("مكتملة","Completed")}:a==="review"||a==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:t("للمراجعة والاعتماد","In Review")}:a==="blocked"||n?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:n?t("متأخرة","Overdue"):t("متوقفة","Blocked")}:a==="in_progress"||a==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:t("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:t("غير مبدوءة","Not Started")}}function Vt(e,a=""){const n=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(n)?{ext:n.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(n)?{ext:n.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:n==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["png","jpg","jpeg","webp","heic"].includes(n)?{ext:n.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["zip","rar","7z","tar"].includes(n)?{ext:n.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:n.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function La(e){if(!e)return null;const a=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return a?`V${a[1]}`:null}function Ee(){return s.calendarSystem||s.data?.user?.customFields?.calendarSystem||localStorage.getItem("darc_calendar_system")||"gregorian"}function xt(e,a=!0){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(n.getTime()))return"—";if(Ee()==="hijri"){const r=s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura";return new Intl.DateTimeFormat(r,{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n)}const o=s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory";return new Intl.DateTimeFormat(o,{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n)}function Wn(e){if(!e)return"—";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(a.getTime()))return"—";if(Ee()==="hijri"){const n=s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura";return new Intl.DateTimeFormat(n,{day:"2-digit",month:"2-digit",year:"numeric"}).format(a)}return`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}/${a.getFullYear()}`}function Jt(e,a={}){if(!e)return{date:"—",time:"—",full:"—"};try{const n=new Date(e);if(Number.isNaN(n.getTime()))return{date:String(e),time:"—",full:String(e)};const o=Ee(),r=s.lang==="ar",i=o==="hijri"?r?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":r?"ar-u-ca-gregory":"en-GB-u-ca-gregory",d=new Intl.DateTimeFormat(i,{year:"numeric",month:a.monthStyle||"short",day:"numeric"}).format(n),l=r?"ar-SA":"en-US",p=new Intl.DateTimeFormat(l,{hour:"2-digit",minute:"2-digit",...a.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(n);return{date:d,time:p,full:`${d} ${p}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function Ie(e=new Date){const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=Ee(),o=s.lang==="ar",r=n==="hijri"?o?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o?"ar-u-ca-gregory":"en-GB-u-ca-gregory";return new Intl.DateTimeFormat(r,{dateStyle:"full"}).format(a)}function at(e=new Date){const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=s.lang==="ar";return new Intl.DateTimeFormat(n?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(a)}function Vn(e){if(!e)return"";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"":new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(a)}function Ma(e){if(!e)return"—";const a=new Date(`${e}T23:59:59`),n=Math.ceil((a-new Date)/864e5);return n<0?t(`متأخرة ${Math.abs(n)} ${f("days")}`,`${Math.abs(n)} ${f("days")} ${f("ago")}`):n===0?f("today"):t(`بعد ${n} ${f("days")}`,`in ${n} ${f("days")}`)}function $e(e){return e?.dueDate&&!["done","completed","canceled"].includes(e.status)&&new Date(`${e.dueDate}T23:59:59`)<new Date}function O(e){return{not_started:f("notStarted"),in_progress:f("inProgress"),review:f("review"),approval:f("approval"),done:f("done"),blocked:f("blocked"),canceled:f("canceled"),planning:f("planning"),active:f("active"),on_hold:f("onHold"),completed:f("completed"),archived:f("archived"),on_track:f("onTrack"),at_risk:f("atRisk"),off_track:f("offTrack")}[e]||e}function Jn(e){return e?`<span class="status-badge ${c(e)}">${c(O(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function Gn(e){return{low:f("low"),medium:f("medium"),high:f("high"),urgent:f("urgent")}[e]||e}function za(e){const a=typeof e=="string"?s.data?.users.find(n=>n.id===e):e;return a?s.data?.roles.find(n=>n.id===a.roleId)||{id:a.roleId,nameAr:a.roleNameAr||"",nameEn:a.roleNameEn||"",permissions:[]}:null}function Z(e){const a=za(e);return a?t(a.nameAr,a.nameEn):"—"}var Ra={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function S(e){const a=s.data?.role?.permissions||[];if(a.includes("*")||a.includes(e))return!0;const n=Ra[e];return!!(n&&a.includes(n))}function _(){return s.data?.user?.roleId==="admin"}function Yn(){return _()||s.data?.user?.roleId==="account_permissions_manager"||s.data?.role?.permissions?.includes("manage_existing_account_permissions")}function Gt(){return s.view==="project-detail"?t("تفاصيل المشروع","Project details"):{dashboard:f("dashboard"),projects:f("projects"),tasks:f("myTasks"),documents:f("documents"),templates:f("templates"),team:f("team"),reports:f("reports"),settings:f("settings")}[s.view]||f("dashboard")}function mt(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const a=new e,n=a.currentTime,o=a.createOscillator(),r=a.createGain();o.type="sine",o.frequency.setValueAtTime(587.33,n),r.gain.setValueAtTime(.08,n),r.gain.exponentialRampToValueAtTime(.001,n+.35),o.connect(r),r.connect(a.destination),o.start(n),o.stop(n+.35);const i=a.createOscillator(),d=a.createGain();i.type="sine",i.frequency.setValueAtTime(880,n+.12),d.gain.setValueAtTime(.001,n),d.gain.setValueAtTime(.09,n+.12),d.gain.exponentialRampToValueAtTime(.001,n+.65),i.connect(d),d.connect(a.destination),i.start(n+.12),i.stop(n+.65)}catch{}}function Kn(e,a){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(a)):new Promise((n,o)=>{try{const r=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),i=URL.createObjectURL(r),d=new Worker(i);d.onmessage=l=>{URL.revokeObjectURL(i),d.terminate(),l.data.ok?n(l.data.result):o(new Error(l.data.error))},d.onerror=l=>{URL.revokeObjectURL(i),d.terminate(),o(l)},d.postMessage(a)}catch{try{n(e(a))}catch(i){o(i)}}})}var Oa=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",qe=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function ft(){qe=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function I(e,a={}){const n=["POST","PATCH","PUT","DELETE"].includes(a.method),o=e.startsWith("/api/auth"),r=!!(a.headers&&(a.headers["X-Offline-Replay"]==="true"||a.headers["X-Offline-Replay"]===!0));let i=null;if(n&&a.body)try{i=typeof a.body=="string"?JSON.parse(a.body):a.body}catch{}if(a.method==="POST"&&i&&typeof i=="object"&&!r&&(e==="/api/tasks"&&!i.id?(i.id=ze("tsk"),a.body=JSON.stringify(i)):e==="/api/projects"&&!i.id?(i.id=ze("prj"),a.body=JSON.stringify(i)):e.includes("/comments")&&!i.id&&(i.id=ze("cmt"),a.body=JSON.stringify(i))),typeof navigator<"u"&&!navigator.onLine&&n&&!o){if(r)throw new Error(t("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));const u=ka({path:e,method:a.method,body:i}),h=Ea(e,a.method,i,s);return $(t("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡","Offline mode: action saved locally and will auto-sync on reconnect 📡"),!1),{ok:!0,queued:!0,offline:!0,id:u?.id,...h}}const d=typeof localStorage<"u"?localStorage.getItem("darc_token"):null,l=!!(a.silent||a.headers&&a.headers["X-Silent"]),p=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),m=!!qe&&(l||!!s.data||p),g=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,y={...d?{Authorization:`Bearer ${d}`}:{},...a.body?{"Content-Type":"application/json"}:{},...g?{"X-Mutation-ID":g}:{},...e==="/api/bootstrap"&&m?{"If-None-Match":qe}:{},...e==="/api/bootstrap"&&!m?{"Cache-Control":"no-cache, no-store"}:{},...a.headers||{}};e==="/api/bootstrap"&&!m&&(a.cache="no-cache"),a.credentials="include";let w;try{w=await fetch(Oa+e,{...a,headers:y})}catch{if(n&&!o&&!r){const h=ka({path:e,method:a.method,body:i}),T=Ea(e,a.method,i,s);return $(t("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡","Connection lost: action saved locally for auto-sync 📡"),!1),{ok:!0,queued:!0,offline:!0,id:h?.id,...T}}throw new Error(t("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(w.status===304)return null;if(!w.ok){const u=await w.text();w.status!==401&&console.error(`API Failed [${e}]: ${w.status} - ${u}`);let h={};try{h=JSON.parse(u)}catch{}w.status===401&&(qe=null,typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login"&&(typeof localStorage<"u"&&localStorage.removeItem("darc_token"),s.data&&(s.data.user=null),typeof window<"u"&&window.location.hash!=="#login"&&(window.location.hash="#login")));const T=new Error(h.error||`Failed to fetch ${e}`);throw T.status=w.status,T}const v=w.headers.get("ETag");if(v&&e==="/api/bootstrap"){qe=v;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",v)}catch{}}const b=await w.json();if(["POST","PATCH","PUT","DELETE"].includes(a.method)){ft();let u=i&&typeof i.id=="string"?i.id:null;if(!u&&b&&typeof b=="object"&&(u=b.id||b.task?.id||b.project?.id||b.comment?.id||b.document?.id||b.data?.id),!u&&typeof e=="string"){const h=e.split("/");h.length>=4&&h[3]&&!h[3].includes("?")&&(u=h[3])}if(u&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(u),g&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(g),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let h=null;if(b&&(b.task?h={table:"tasks",action:a.method==="POST"?"INSERT":"UPDATE",record:b.task}:b.project?h={table:"projects",action:a.method==="POST"?"INSERT":"UPDATE",record:b.project}:b.comment?h={table:"comments",action:a.method==="POST"?"INSERT":"UPDATE",record:b.comment}:b.document&&(h={table:"documents",action:a.method==="POST"?"INSERT":"UPDATE",record:b.document})),!h&&a.method==="DELETE"&&u&&(e.startsWith("/api/tasks/")?h={table:"tasks",action:"DELETE",record:{id:u}}:e.startsWith("/api/projects/")?h={table:"projects",action:"DELETE",record:{id:u}}:e.startsWith("/api/documents/")?h={table:"documents",action:"DELETE",record:{id:u}}:e.startsWith("/api/comments/")&&(h={table:"comments",action:"DELETE",record:{id:u}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(h);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:h?"GRANULAR_DELTA":"STATE_MUTATION",delta:h,timestamp:Date.now()})}catch{}}}}return b}typeof window<"u"&&(window.api=I);var Xn=ne({canAccessView:()=>q,getFirstAllowedView:()=>ye,loadData:()=>be,navItem:()=>ge,refreshView:()=>K,renderApp:()=>ae,renderSyncIndicator:()=>Yt,renderView:()=>P,switchView:()=>le});function q(e){return s.data?e==="dashboard"?S("view_dashboard"):e==="projects"||e==="project-detail"?S("view_projects"):e==="tasks"?S("create_tasks")||S("edit_tasks")||S("delete_tasks")||S("assign_tasks")||S("review_tasks")||S("approve_tasks")||S("manage_reminders")||S("view_projects")||_():e==="documents"?S("upload_documents")||S("delete_documents")||_():e==="templates"?S("manage_templates")||_():e==="team"?_()||S("manage_users"):e==="reports"?S("view_reports")||_():e==="settings":!0}function ye(){for(const e of["dashboard","projects","tasks","documents","templates","team","reports","settings"])if(q(e))return e;return"dashboard"}function Yt(){const e=tt().length;return Fn()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${t("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:"":`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${t("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}if(typeof window<"u"&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;const e=()=>{const a=document.getElementById("sync-status-indicator");a&&(a.innerHTML=Yt())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function ge(e,a,n){return`<button class="nav-item ${s.view===e||e==="projects"&&s.view==="project-detail"?"active":""}" data-view="${e}">${x(n,17)}<span>${a}</span></button>`}function ae(){if(s.data&&!q(s.view)&&(s.view=ye()),typeof window<"u"){const o=window.location.hash.replace(/^#/,"");if(!o||o==="login"||o==="forgot"){let r=s.view;s.view==="project-detail"&&s.activeProjectId?r=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:s.view==="settings"&&s.settingsSection&&(r=`settings?section=${encodeURIComponent(s.settingsSection)}`),window._isInternalNav=!0,window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${r}`):window.location.hash=`#${r}`}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";const e=(s.data?.notifications||[]).filter(o=>!o.read).length,a=s.data?.user||{},n=_()||S("manage_settings")||S("manage_roles")||S("manage_users")||S("manage_trash")||S("view_audit_logs");document.getElementById("app").innerHTML=`
    <div class="app-shell ${s.lang==="en"?"is-ltr":""}">
      <aside class="sidebar ${s.sidebarOpen?"open":""}">
        <div class="sidebar-brand">
          ${s.data?.company?.logoUrl?`<img src="${c(s.data.company.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${x("building",20)}</span>`:`<span class="brand-mark">${x("building",20)}</span>`}
          <div>
            <div class="brand-name">${c(t(s.data?.company?.nameAr||s.data?.company?.name||"DARC Design Team",s.data?.company?.nameEn||s.data?.company?.name||"DARC Design Team"))}</div>
            <div class="brand-subtitle">${f("workspace")}</div>
          </div>
        </div>
        <div class="nav-title">${t("مساحة العمل","WORKSPACE")}</div>
        <nav class="nav-list">
          ${q("dashboard")?ge("dashboard",f("dashboard"),"grid"):""}
          ${q("projects")?ge("projects",f("projects"),"building"):""}
          ${q("tasks")?ge("tasks",f("myTasks"),"checklist"):""}
          ${q("documents")?ge("documents",f("documents"),"document"):""}
          ${q("templates")?ge("templates",f("templates"),"layers"):""}
          ${q("team")?ge("team",f("team"),"users"):""}
          ${q("reports")?ge("reports",f("reports"),"chart"):""}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${n?t("إدارة النظام","ADMIN"):t("حسابي","MY ACCOUNT")}</div>
        <nav class="nav-list">${ge("settings",n?f("settings"):t("الملف الشخصي والأمان","Profile & Security"),"settings")}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${N(a)}<div class="admin-info"><strong>${c(t(a.name,a.nameEn||a.name))}</strong><span>${c(Z(a))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${t("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${f("signOut")}">${x("logout",15)}</button></div>
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
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${x("menu",18)}</button><div><div class="topbar-kicker">DARC / ${f("workspace")}</div><div class="topbar-title">${c(Gt())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${Yt()}</span>
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
            <button class="icon-button" data-action="show-notifications" aria-label="${f("notifications")}">${x("bell",17)}${e?'<span class="notification-dot"></span>':""}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${N(a)}<div class="profile-chip-text"><strong>${c(t(a.name,a.nameEn||a.name))}</strong><span>${c(Z(a))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,P()}function P(){const e=document.getElementById("main-content");if(!e)return;q(s.view)||(s.view=ye());let a="";s.view==="dashboard"&&(a=renderDashboard()),s.view==="projects"&&(a=renderProjects()),s.view==="tasks"&&(a=renderTasks()),s.view==="documents"&&(a=renderDocuments()),s.view==="templates"&&(a=renderTemplates()),s.view==="team"&&(a=renderTeam()),s.view==="reports"&&(a=renderReports()),s.view==="settings"&&(a=renderSettings()),s.view==="project-detail"&&(a=renderProjectDetail()),e.innerHTML=a,s.view==="project-detail"&&s.projectTab==="timeline"&&setTimeout(drawTimelineArrows,0)}function le(e,a=void 0){s.data&&!q(e)&&(e=ye()),s.view=e,a!==void 0&&(s.activeProjectId=a),e==="settings"&&!s.settingsSection&&(s.settingsSection="profile"),s.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelectorAll(".nav-item").forEach(o=>{const r=o.dataset.view,i=r===e||r==="projects"&&e==="project-detail";o.classList.toggle("active",i)});const n=document.querySelector(".topbar-title");n&&(n.textContent=Gt());try{let o=e;e==="project-detail"&&s.activeProjectId?o=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:e==="settings"&&s.settingsSection&&(o=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==o&&(window._isInternalNav=!0,window.location.hash=o),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:s.view,activeProjectId:s.activeProjectId,projectTab:s.projectTab,settingsSection:s.settingsSection}))}catch{}requestAnimationFrame(()=>{P();const o=document.getElementById("main-content");o&&(o.scrollTop=0,o.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function K(e=!1){try{await be(e)}catch(a){$(a.message,!0)}}async function be(e=!1){try{let a=await I("/api/bootstrap",{silent:e});if(a===null){if(s.data)return;const o=await wa();if(o&&o.user?a=o:a=await I("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}}),!a)return}if(de(a),s.isOffline=!1,s.data?.tasks&&a?.tasks){const o=Date.now(),r=new Set(a.tasks.map(i=>i.id));for(const i of s.data.tasks)r.has(i.id)||o-(i.createdAt?new Date(i.createdAt).getTime():o)<12e4&&(a.tasks.unshift(i),r.add(i.id))}if(s.data?.projects&&a?.projects){const o=Date.now(),r=new Set(a.projects.map(i=>i.id));for(const i of s.data.projects)r.has(i.id)||o-(i.createdAt?new Date(i.createdAt).getTime():o)<12e4&&(a.projects.unshift(i),r.add(i.id))}let n=!1;if(s.data&&a)if(s.data.updatedAt!==a.updatedAt)n=!0;else if(s.data.tasks?.length!==a.tasks?.length||s.data.projects?.length!==a.projects?.length)n=!0;else{const o=s.data.tasks||[],r=a.tasks||[];for(let i=0;i<r.length;i++){const d=r[i],l=o[i];if(!l||l.id!==d.id||l.status!==d.status||(l.sortOrder||l.sort_order)!==(d.sortOrder||d.sort_order)||l.progress!==d.progress){n=!0;break}}if(!n){const i=s.data.projects||[],d=a.projects||[];for(let l=0;l<d.length;l++){const p=d[l],m=i[l];if(!m||m.id!==p.id||m.lifecycle!==p.lifecycle||m.health!==p.health||m.progress!==p.progress){n=!0;break}}}}if(!s.data||n||s.data.comments?.length!==a.comments?.length||s.data.documents?.length!==a.documents?.length||s.data.users?.length!==a.users?.length||s.data.auditLogs?.length!==a.auditLogs?.length||s.data.notifications?.length!==a.notifications?.length){s.data=a,q(s.view)||(s.view=ye());const o=!!document.getElementById("modal-root")?.children?.length,r=!!(document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),i=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(r||i))return;requestAnimationFrame(!e&&!o?()=>ae():()=>P())}else s.data=a,q(s.view)||(s.view=ye(),requestAnimationFrame(()=>P()))}catch(a){if(a&&(a.status===401||a.status===403))throw a;const n=await wa();if(n){s.data=n,q(s.view)||(s.view=ye()),s.isOffline=!0;const o=!!document.getElementById("modal-root")?.children?.length;!e&&!o?ae():P();return}throw a}}typeof window<"u"&&(window.renderApp=ae,window.renderView=P);var Zn=ne({calculatePasswordStrength:()=>Na,openForcePasswordModal:()=>ei,renderActivation:()=>nt,renderLogin:()=>X,renderResetPassword:()=>Ne,renderStrengthMeterHtml:()=>wt});function Na(e){const a=String(e||"");if(!a)return{score:0,label:"",percent:0,color:"var(--line)"};let n=0;return a.length>=10&&(n+=1),/[a-z]/.test(a)&&/[A-Z]/.test(a)&&(n+=1),/\d/.test(a)&&(n+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(a)&&(n+=1),n===1?{score:1,label:s.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:n===2?{score:2,label:s.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:n===3?{score:3,label:s.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:s.lang==="ar"?"قوية وممتازة 🛡️":"Strong & Secure 🛡️",percent:100,color:"var(--mint-strong)"}}function wt(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${s.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function Kt(e,a,n,o,r){const i=document.getElementById(e);if(!i)return;const d=i.querySelector(`input[name="${a}"]`),l=i.querySelector(`input[name="${n}"]`),p=i.querySelector(r||'button[type="submit"]'),m=document.getElementById(`${o}-meter-wrap`),g=document.getElementById(`${o}-meter-bar`),y=document.getElementById(`${o}-meter-label`),w=document.getElementById(`${o}-match-indicator`);function v(){const b=d?d.value:"",u=l?l.value:"";if(b&&m&&g&&y){m.style.display="flex";const h=Na(b);g.style.width=`${h.percent}%`,g.style.background=h.color,y.textContent=h.label,y.style.color=h.color}else m&&(m.style.display="none");l&&w&&(u?b===u?(w.style.display="block",w.style.color="var(--mint-strong)",w.textContent=s.lang==="ar"?"✓ كلمتا المرور متطابقتان":"✓ Passwords match",p&&(p.disabled=!1)):(w.style.display="block",w.style.color="var(--red)",w.textContent=s.lang==="ar"?"✗ كلمتا المرور غير متطابقتين":"✗ Passwords do not match",p&&(p.disabled=!0)):(w.style.display="none",p&&(p.disabled=!1)))}d?.addEventListener("input",v),l?.addEventListener("input",v)}function $t(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=a=>{a.preventDefault();const n=e.getAttribute("data-target"),o=n?document.getElementById(n):e.parentElement.querySelector("input");if(!o)return;const r=o.type==="password";o.type=r?"text":"password",e.style.color=r?"var(--teal)":"var(--ink-soft)",e.setAttribute("aria-label",r?s.lang==="ar"?"إخفاء كلمة المرور":"Hide password":s.lang==="ar"?"إظهار كلمة المرور":"Show password")}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const a=n=>{const o=n.getModifierState&&n.getModifierState("CapsLock");let r=e.parentElement.parentElement.querySelector(".capslock-warning");o?r||(r=document.createElement("div"),r.className="capslock-warning",r.style.fontSize="11px",r.style.color="var(--amber)",r.style.marginTop="4px",r.style.display="flex",r.style.alignItems="center",r.style.gap="4px",r.innerHTML=`<span>⚠️</span> <span>${s.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(r)):r&&r.remove()};e.addEventListener("keydown",a),e.addEventListener("keyup",a)})}function Qn(e,a=60){if(!e)return;e.disabled=!0;let n=a;const o=e.innerHTML,r=setInterval(()=>{n--,e.innerHTML=`<span>${s.lang==="ar"?`يرجى الانتظار (${n} ثانية)...`:`Please wait (${n}s)...`}</span>`,n<=0&&(clearInterval(r),e.disabled=!1,e.innerHTML=o)},1e3)}function X(e="",a="login",n=!1){if(s.view="login",typeof window<"u"){const p=a==="forgot"?"#forgot":"#login";window.location.hash!==p&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",p):window.location.hash=p)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";let o="";const r=e?`<div class="login-demo" style="border-color:${n?"#cce3e0":"var(--red-soft)"};background:${n?"#f0f9f7":"var(--red-soft)"};color:${n?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${x(n?"check":"alert",15)}<span>${c(e)}</span></div>`:"",i=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";a==="login"?o=`
      <form id="login-form">
        <div class="field">
          <label for="login-email">${f("emailAddress")}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${c(i)}" required />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label for="login-password">${f("password")}</label>
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
        <button class="btn btn-primary btn-block" type="submit">${x(s.lang==="ar"?"arrowLeft":"arrowRight",16)} ${f("login")}</button>
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
        <div class="field"><label for="login-email">${f("emailAddress")}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${c(i)}" required /></div>
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
              <div><p class="eyebrow">${a==="login"?t("مرحبًا بعودتك","WELCOME BACK"):t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${a==="login"?f("login"):t("نسيت كلمة المرور","Forgot Password")}</h2><p class="intro">${a==="login"?f("loginIntro"):t("أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.","Enter your email to receive a reset link.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${s.theme==="dark"?"الوضع النهاري":"الوضع الليلي"}">${s.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            ${o}
          </div>
        </section>
      </div>
    </div>`,$t();const d="0x4AAAAAAFkv_qFdOceTRDC2",l=()=>{const p=document.getElementById("turnstile-widget-container");if(p)if(typeof window<"u"&&window.turnstile)try{p.innerHTML="",window._turnstileWidgetId=window.turnstile.render("#turnstile-widget-container",{sitekey:d,theme:s.theme==="dark"?"dark":"light",language:s.lang==="ar"?"ar":"en"})}catch(m){console.warn("[Turnstile] Render warning:",m)}else setTimeout(l,250)};l(),document.getElementById("login-form")?.addEventListener("submit",async p=>{p.preventDefault();const m=new FormData(p.currentTarget),g=String(m.get("email")||"").trim(),y=String(m.get("password")||""),w=document.getElementById("remember-email-check")?.checked,v=p.currentTarget.querySelector('button[type="submit"]');v.disabled=!0,v.innerHTML=`<span>${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const b=typeof window<"u"&&window.turnstile&&window._turnstileWidgetId!==void 0?window.turnstile.getResponse(window._turnstileWidgetId):m.get("cf-turnstile-response")||"";try{const u=await I("/api/auth/login",{method:"POST",body:JSON.stringify({email:g,password:y,turnstileToken:b})});typeof localStorage<"u"&&(u?.token&&localStorage.setItem("darc_token",u.token),w?localStorage.setItem("darc_last_email",g):localStorage.removeItem("darc_last_email")),Ge({theme:s.theme,lang:s.lang}),await be()}catch(u){if(console.error("Login Error:",u),typeof window<"u"&&window.turnstile&&window._turnstileWidgetId!==void 0)try{window.turnstile.reset(window._turnstileWidgetId)}catch{}u.message&&(u.message.includes("429")||u.message.includes("كثيرة")||u.message.includes("rate"))?(X(u.message,"login"),Qn(document.querySelector('#login-form button[type="submit"]'),60)):X(u.message,"login")}}),document.getElementById("forgot-form")?.addEventListener("submit",async p=>{p.preventDefault();const m=new FormData(p.currentTarget),g=p.currentTarget.querySelector('button[type="submit"]');g.disabled=!0;try{await I("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:m.get("email")})}),X(t("تم إرسال رابط الاستعادة إذا كان البريد مسجلاً.","Reset link sent if email is registered."),"forgot",!0)}catch(y){X(y.message,"forgot")}})}function nt(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light",document.getElementById("app").innerHTML=`
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
                <label for="act-pass">${f("password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${wt("act")}
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
    </div>`,$t(),Kt("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function Ne(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";const n=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,o=!n&&!a?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
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
                ${wt("rst")}
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
    </div>`,$t(),Kt("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async r=>{r.preventDefault();const i=new FormData(r.currentTarget),d=i.get("newPassword");if(d!==i.get("newPasswordConfirm")){Ne(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const l=r.currentTarget.querySelector('button[type="submit"]');l.disabled=!0;try{await I("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:d})}),window.history.replaceState({},"",window.location.pathname),await be()}catch(p){Ne(e,p.message)}})}function ei(e){const a=e.status==="pending",n=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${a}">
      <div class="field">
        <label for="force-pass-input">${a?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${wt("force")}
        ${e.email?a?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${x("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${a?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=re(a?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),a?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${c(e.name)}.`,`Set an initial password to activate ${c(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${c(e.name)}`,`Set a new password for ${c(e.name)}`),n,"force-password"),$t(),Kt("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}var ti=ne({attentionItem:()=>Fa,metricCard:()=>He,projectProgress:()=>ai,pulseChart:()=>Ua,renderDashboard:()=>ni,renderReports:()=>ii,teamMetrics:()=>Xt,teamRow:()=>Ba});function He(e,a,n,o,r,i=""){return`<article class="metric-card ${o}"><div class="metric-top"><span class="metric-label">${c(e)}</span><span class="metric-icon">${x(r,15)}</span></div><div class="metric-value">${c(a)}</div><span class="metric-note ${i}">${c(n)}</span></article>`}function ai(e){const a=e.health==="off_track"?"red":e.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${f("weightedProgress")}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${a}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function Fa(e){const a=$e(e)||e.status==="blocked"?"red":"amber",n=$e(e)?t("متأخرة","Overdue"):e.status==="blocked"?t("متوقفة","Blocked"):t("تستحق قريبًا","Due soon");return`<button class="attention-item" data-action="open-task" data-task-id="${c(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${a}">${x($e(e)||e.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${a})">${c(t(e.titleAr,e.titleEn))}</strong><span>${c(n)} · ${c(Ma(e.dueDate))}</span></span></button>`}function Xt(e,a){const n=a.filter(i=>i.assigneeId===e),o=n.reduce((i,d)=>i+Number(d.weight||1),0),r=o?Math.round(n.reduce((i,d)=>i+d.progress*Number(d.weight||1),0)/o):0;return{tasks:n.length,progress:r,overdue:n.filter($e).length}}function Ba(e,a){const n=Xt(e.id,a);return`<div class="team-row"><div class="team-member">${N(e)}<div class="team-member-copy"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(t(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${n.tasks}</strong> ${f("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${f("progress")}</span><strong>${n.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${n.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${c(e.id)}">${x("more",15)}</button></div>`}function Ua(){const e=[38,48,45,62,55,72,68],a=s.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${e.map((n,o)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${o===e.length-1?"current":""}" style="height:${n}%"></span></div><span>${a[o]}</span></div>`).join("")}</div>`}function ni(){const e=s.data?.stats||{},a=s.data?.projects||[],n=s.data?.tasks||[],o=s.data?.users||[],r=s.data?.user||{},i=r.name||r.email||t("مستخدم","User"),d=a.reduce((u,h)=>u+(Number(h.totalWeight)||0),0),l=d?Math.round(a.reduce((u,h)=>u+(Number(h.progress)||0)*(Number(h.totalWeight)||0),0)/d):0,p=[...n].filter(u=>$e(u)||u.status==="blocked"||u.dueDate&&(new Date(`${u.dueDate}T23:59:59`)-new Date)/864e5<=7).sort((u,h)=>new Date(u.dueDate||"9999-12-31")-new Date(h.dueDate||"9999-12-31")).slice(0,5),m=o.filter(u=>u.status!=="inactive"),g=e.projectCount??a.length,y=e.myTasks??n.filter(u=>u.assigneeId===r.id).length,w=e.overdueTasks??n.filter($e).length,v=e.dueSoon??0,b=e.completedTasks??n.filter(u=>u.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${t("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${Ca()}، ${c(t(i.replace(/^م\.\s?/,""),r.nameEn||i))}</h1><p>${f("welcomeText")}</p></div><div class="welcome-status"><span>${f("portfolioHealth")}</span><strong>${l}%</strong><small>${t("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${He(f("activeProjects"),e.activeProjects||0,t(`${g} مشاريع إجمالًا`,`${g} projects total`),"teal","building","up")}${He(f("openTasks"),e.openTasks??n.length,t(`${y} مسندة لك`,`${y} assigned to you`),"blue","checklist")}${He(f("overdue"),w,t("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",w?"alert":"check",w?"alert":"")}${He(f("dueThisWeek"),v,t("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("projectProgress")}</h2><p class="panel-subtitle">${f("projectProgressSub")}</p></div>${S("view_projects")?`<button class="text-link" data-view="projects">${f("seeAll")} ${x(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${a.length?a.slice(0,5).map(projectRow).join(""):`<div class="empty">${x("building",18)}<span>${f("noProjects")}</span></div>`}</div></section>${_()||S("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("teamProgress")}</h2><p class="panel-subtitle">${f("teamProgressSub")}</p></div><button class="text-link" data-view="team">${f("seeAll")} ${x(s.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${m.slice(0,6).map(u=>Ba(u,n)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("attention")}</h2><p class="panel-subtitle">${f("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${p.length}</span></div><div class="attention-list">${p.length?p.map(Fa).join(""):`<div class="empty">${x("check",18)}<span>${f("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("recentPulse")}</h2><p class="panel-subtitle">${f("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${b} ${f("done")}</span></div>${Ua()}</section></div></div>`}function ii(){const{projects:e,tasks:a,users:n}=s.data,o=S("export_reports")||_(),r=a.reduce((p,m)=>p+Number(m.weight||1),0),i=r?Math.round(a.reduce((p,m)=>p+m.progress*Number(m.weight||1),0)/r):0,d=new Map;a.forEach(p=>{const m=(s.lang==="ar"?p.categoryAr:p.categoryEn)||t(p.typeAr||"عام",p.typeEn||"General"),g=d.get(m)||{weight:0,progress:0};g.weight+=Number(p.weight||1),g.progress+=p.progress*Number(p.weight||1),d.set(m,g)});const l=[...d.entries()].map(([p,m])=>({label:p,progress:m.weight?Math.round(m.progress/m.weight):0})).sort((p,m)=>m.progress-p.progress);return`<div class="page-head"><div><p class="eyebrow">${t("قراءة الأداء","PERFORMANCE READOUT")}</p><h1>${f("reports")}</h1><p>${t("مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.","Simple signals that help management see drift before it becomes delay.")}</p></div><div class="page-actions">${o?`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${x("printer",15)} ${t("طباعة تقرير المحفظة (PDF)","Print Portfolio (PDF)")}</button>
      <button class="btn btn-soft" data-action="export-csv">${x("document",15)} ${t("تصدير الإكسل (Excel)","Export Excel")}</button>
    </div>
  `:""}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("الإنجاز حسب التخصص","Progress by discipline")}</h2><p class="panel-subtitle">${f("weightedProgress")}</p></div><span class="status-badge on_track">${i}%</span></div><div class="report-bars">${l.length?l.map(p=>`<div class="report-bar-row"><span>${c(p.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${p.progress}%"></div></div><strong>${p.progress}%</strong></div>`).join(""):`<div class="empty">${f("noTasks")}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("صحة المحفظة","Portfolio health")}</h2><p class="panel-subtitle">${t("توزيع حالات المشاريع الحالية.","Current project status distribution.")}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${f("onTrack")}</span><strong style="color:var(--mint-strong)">${e.filter(p=>p.health==="on_track").length}</strong></div><div class="report-stat"><span>${f("atRisk")}</span><strong style="color:var(--amber)">${e.filter(p=>p.health==="at_risk").length}</strong></div><div class="report-stat"><span>${f("offTrack")}</span><strong style="color:var(--red)">${e.filter(p=>p.health==="off_track").length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("teamLoad")}</h2><p class="panel-subtitle">${t("المهام المفتوحة لكل عضو.","Open tasks per member.")}</p></div></div><div class="report-stat-list">${n.slice(0,5).map(p=>{const m=Xt(p.id,a);return`<div class="report-stat"><span>${c(t(p.name,p.nameEn||p.name))}</span><strong>${m.tasks}</strong></div>`}).join("")}</div></section></div></div>`}var si=ne({STATUS_OPTIONS:()=>en,buildAssigneeChipsHtml:()=>ta,buildRemindersListHtml:()=>aa,drawTimelineArrows:()=>ri,filterTasks:()=>Ka,formatRemindAtDate:()=>Xa,getSavedTaskSort:()=>Fe,getTaskSortOrder:()=>Ae,initTaskModalWidgets:()=>Za,openDocumentPreviewModal:()=>Qa,openTaskModal:()=>gt,renderBoard:()=>Ga,renderCalendar:()=>Qt,renderTaskAssignees:()=>qa,renderTaskComments:()=>Ke,renderTaskDocuments:()=>Te,renderTaskSortSelect:()=>Zt,renderTasks:()=>oi,renderTimeline:()=>ea,renderTimelinePanel:()=>Ya,setSavedTaskSort:()=>Va,sortTasks:()=>Ja,sortTasksByImportance:()=>Wa,taskCard:()=>Ha});function qa(e){const a=s.data?.users||[],n=s._userMap||new Map(a.map(l=>[l.id,l])),o=e.assignee||n.get(e.assigneeId),r=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(l=>n.get(l)).filter(Boolean),i=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let d='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return o||r.length?(d+='<div class="avatar-stack" style="display:flex;align-items:center;">',o&&(d+=`<span title="${c(t(o.name,o.nameEn||o.name))}">${N(o,"mini-avatar")}</span>`),r.slice(0,2).forEach(l=>{d+=`<span title="${c(t(l.name,l.nameEn||l.name))}" style="margin-inline-start:-8px;">${N(l,"mini-avatar")}</span>`}),r.length>2&&(d+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${r.slice(2).map(l=>t(l.name,l.nameEn||l.name)).join("، ")}">+${r.length-2}</span>`),d+="</div>",o&&(d+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${c(t(o.name,o.nameEn||o.name))}</span>`)):i.length||(d+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),i.length&&(i.slice(0,2).forEach(l=>{d+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${c(l)}">🌐 ${c(l)} <small style="opacity:0.8">(${t("خارجي","Ext")})</small></span>`}),i.length>2&&(d+=`<span style="font-size:10px;color:var(--amber);" title="${i.slice(2).map(c).join("، ")}">+${i.length-2}</span>`)),d+="</div>",d}function Ha(e){const a=isOverdue(e),n=a?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${x("alert",11)} ${f("overdue")}</span>`:"",o=s._commentCounts?s._commentCounts[e.id]||0:(s.data?.comments||[]).filter(l=>l.taskId===e.id).length,r=s._docCounts?s._docCounts[e.id]||0:(s.data?.documents||[]).filter(l=>l.taskId===e.id).length,i=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",d=_()||S("edit_tasks")||e.assigneeId===s.data?.user?.id;return`<article class="task-card ${a?"is-overdue":""} ${d?"":"not-draggable"}" draggable="${d?"true":"false"}" data-action="open-task" data-task-id="${c(e.id)}">
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
    ${(()=>{const l=String(t(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!l)return"";const p=l.length>50?l.substring(0,50).trim()+"...":l;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${c(l)}">${c(p)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${c(t(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${a?"var(--red)":"var(--muted)"};">${x("calendar",11)} ${dateLabel(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${qa(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${i};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function Ae(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function Wa(e=[]){const a={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((o,r)=>{const i=o.status==="blocked"?1:0,d=r.status==="blocked"?1:0;if(i!==d)return d-i;const l=o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():null,m=l&&l<n&&o.status!=="done"?1:0,g=p&&p<n&&r.status!=="done"?1:0;if(m!==g)return g-m;const y=a[o.priority]||2,w=a[r.priority]||2;if(y!==w)return w-y;if(l&&p){if(l!==p)return l-p}else{if(l&&!p)return-1;if(!l&&p)return 1}const v=Ae(o),b=Ae(r);return v!==b?v-b:(o.titleAr||"").localeCompare(r.titleAr||"","ar")})}function Fe(){return localStorage.getItem("darc_task_sort_pref")||"importance"}function Va(e){localStorage.setItem("darc_task_sort_pref",e),s.taskSortPref=e,s.projectTaskSort=e,s.myTaskSort=e}function Zt(e,a="sort-project-tasks"){const n=e||Fe();return`
    <div class="sort-box">
      <span>${t("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${a}">
        <option value="importance" ${n==="importance"?"selected":""}>${t("حسب الأهمية والأولوية (افتراضي)","By Importance & Priority (Default)")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${t("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="custom" ${n==="custom"?"selected":""}>${t("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${t("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function Ja(e=[],a=Fe()){return a==="deadline"?[...e].sort((n,o)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):a==="custom"?[...e].sort((n,o)=>Ae(n)-Ae(o)):a==="alpha"?[...e].sort((n,o)=>(n.titleAr||"").localeCompare(o.titleAr||"","ar")):Wa(e)}function Ga(e,a=Fe()){const n=s.data?.users||[];s._userMap=new Map(n.map(i=>[i.id,i]));const o={};for(const i of s.data?.comments||[])i.taskId&&(o[i.taskId]=(o[i.taskId]||0)+1);const r={};for(const i of s.data?.documents||[])i.taskId&&(r[i.taskId]=(r[i.taskId]||0)+1);return s._commentCounts=o,s._docCounts=r,`<div class="board">${[{key:"not_started",dot:"",label:f("notStarted")},{key:"in_progress",dot:"blue",label:f("inProgress")},{key:"review",dot:"amber",label:t("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:f("done")}].map(i=>{const d=Ja(e.filter(l=>(i.statuses||[i.key]).includes(l.status)),a);return`<section class="board-column" data-status="${i.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${i.dot}"></span>${i.label}</div><span class="board-count">${d.length}</span></div><div class="board-cards">${d.length?d.map(Ha).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${f("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function Qt(e,a){const n=s.calendarDate?new Date(s.calendarDate):new Date,o=n.getFullYear(),r=n.getMonth(),i=`${s.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][r]:["January","February","March","April","May","June","July","August","September","October","November","December"][r]} ${o}`,d=s.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=new Date(o,r,1).getDay(),p=new Date(o,r+1,0).getDate(),m=new Date,g=m.getFullYear()===o&&m.getMonth()===r;let y="";for(let w=0;w<l;w++)y+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let w=1;w<=p;w++){const v=g&&m.getDate()===w,b=`${o}-${String(r+1).padStart(2,"0")}-${String(w).padStart(2,"0")}`,u=e.filter(h=>{if(!h.dueDate&&!h.startDate)return!1;const T=h.dueDate?h.dueDate.split("T")[0]:null,k=h.startDate?h.startDate.split("T")[0]:null;return T===b||k===b});y+=`
      <div class="calendar-day ${v?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${v?"var(--mint)":"var(--surface)"};border:1px solid ${v?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${v?"bold":"600"};color:${v?"var(--teal)":"var(--ink)"};">
          <span>${w}</span>
          ${v?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${t("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${u.map(h=>{const T=Wt(h);return`
              <div data-action="open-task" data-task-id="${c(h.id)}" style="background:${T.bgColor};border:1px solid ${T.borderColor};border-inline-start:3px solid ${T.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${T.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${c(t(h.titleAr,h.titleEn))} — ${T.label}">
                <span style="font-weight:700;">${c(t(h.titleAr,h.titleEn))}</span>
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
        ${d.map(w=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${w}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${y}
      </div>
    </div>
  `}function ea(e){const a=e.filter(p=>p.startDate&&p.dueDate).sort((p,m)=>new Date(p.startDate)-new Date(m.startDate));if(!a.length)return`<div class="empty" style="min-height:300px">${x("calendar",24)}<span>${t("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...a.map(p=>new Date(p.startDate).getTime())),o=Math.max(...a.map(p=>new Date(p.dueDate).getTime()));const r=2592e5;n-=r,o+=r;const i=Math.max(7,Math.ceil((o-n)/864e5));let d="";for(let p=0;p<i;p++){const m=new Date(n+p*864e5),g=m.getDay()===5||m.getDay()===6,y=Ee()==="hijri"?s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",w=new Intl.DateTimeFormat(y,{month:"short"}).format(m);d+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${g?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${m.getDate()}<br>${w}</div>`}const l=a.map((p,m)=>{const g=Math.floor((new Date(p.startDate).getTime()-n)/864e5)+1,y=g+Math.max(1,Math.ceil((new Date(p.dueDate).getTime()-new Date(p.startDate).getTime())/864e5)+1),w=Wt(p);return`<div style="display:contents" class="timeline-row" data-task-id="${p.id}" data-row="${m}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${p.id}" style="grid-column: ${g} / ${y}; margin: 8px 4px; background: ${w.color}; border: 1px solid ${w.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${c(t(p.titleAr,p.titleEn))} — ${w.label}">
        <span style="font-weight:600;opacity:0.9">${c(p.templateId?p.templateId.replace("tpl-","#"):"#")}</span> ${c(t(p.titleAr,p.titleEn))}
        ${p.dependencies&&p.dependencies.length?`<span style="float:${s.lang==="ar"?"left":"right"};opacity:0.8">${x("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${i}, minmax(40px, 1fr)); min-width: ${i*40}px; position: relative;">
      ${d}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function Ya(e,a){const n=s.timelineView||"gantt";return`
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
      
      ${n==="calendar"?Qt(e,a):ea(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:Ya,renderCalendar:Qt,renderTimeline:ea});function Ka(e){const a=s.searches.tasks.trim().toLowerCase();return e.filter(n=>{const o=`${n.titleAr} ${n.titleEn} ${n.categoryAr} ${n.categoryEn}`.toLowerCase().includes(a),r=s.taskFilter==="all"||s.taskFilter==="mine"&&n.assigneeId===s.data.user.id||s.taskFilter==="overdue"&&isOverdue(n)||s.taskFilter==="blocked"&&n.status==="blocked",i=s.taskProjectFilter==="all"||n.projectId===s.taskProjectFilter,d=!s.taskPriorityFilter||s.taskPriorityFilter==="all"||n.priority===s.taskPriorityFilter;return o&&r&&i&&d})}function oi(){const e=Ka(s.data.tasks),a=[["all",f("all")],["mine",t("مسندة لي","Assigned to me")],["overdue",f("overdue")],["blocked",f("blocked")]],n=s.myTaskSort||Fe();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("حركة التنفيذ","EXECUTION")}</p>
        <h1>${f("myTasks")}</h1>
        <p>${t("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${S("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${x("plus",15)} ${f("addTask")}</button>`:""}
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
          ${Zt(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?Ga(e,n):`<section class="panel"><div class="empty">${x("checklist",18)}<span>${f("noTasks")}</span></div></section>`}
  `}function Xa(e){return Jt(e,{includeSeconds:!1}).full}function ta(e=[],a=[]){const n=s.data?.users||[];let o="";return e.forEach(r=>{const i=n.find(d=>d.id===r)||{name:r,id:r};o+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${N(i,"mini-avatar")}
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
    `}),o}function aa(e=[]){return e.length?e.map((a,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${c(Xa(a.remindAt))}</strong>
        ${a.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(a.noteAr)}">(${c(a.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${c(a.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${t("حذف التذكير","Delete reminder")}">
        ${x("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${t("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function gt(e=null,a=null,n=null){const o=s.data.templates.find(u=>u.id===(a||e?.templateId)),r=e?.projectId||n||s.activeProjectId||s.data.projects[0]?.id||"",i=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],d=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:"rem_"+Math.random().toString(36).substr(2,9),remindAt:e.remindAt,noteAr:""}]:Array.isArray(s.data?.reminders)&&e?.id&&(l=s.data.reminders.filter(u=>u.taskId===e.id));const p=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,m=i.length>0||d.length>0,g=m?ta(i,d):"",y=aa(l),w=`<form id="task-form" data-task-id="${c(e?.id||"")}">
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
          ${s.data.projects.map(u=>`<option value="${c(u.id)}" ${u.id===r?"selected":""}>${c(t(u.nameAr,u.nameEn))} (${c(u.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${f("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${c(e?.titleAr||o?.nameAr||"")}" placeholder="${t("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${f("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${c(e?.titleEn||o?.nameEn||"")}" placeholder="${t("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${f("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${t("مهمة مخصصة","Custom task")}</option>
          ${s.data.templates.map(u=>`<option value="${c(u.id)}" ${(e?.templateId||a)===u.id?"selected":""}>${c(u.code)} — ${c(t(u.nameAr,u.nameEn))}</option>`).join("")}
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
          ${s.data.users.map(u=>`<option value="${c(u.id)}" ${(e?e.assigneeId===u.id:s.data.user.id===u.id)?"selected":""}>${c(t(u.name,u.nameEn||u.name))}</option>`).join("")}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${t("فريق العمل والمسؤولون المشاركون (داخلي وخارجي)","Collaborators & Assignees (Team & External)")}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${t("اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة","Pick team members or type external name")}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${m?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${g}
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
          <span>${f("status")}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${p}%)</span>
        </label>
        <select name="status" id="task-status-select">${en().map(([u,h])=>`<option value="${u}" ${e?.status===u?"selected":""}>${h}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${f("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(u=>`<option value="${u}" ${(e?.priority||"medium")===u?"selected":""}>${priorityText(u)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${f("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${c(e?.startDate||"")}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${f("dueDate")}</label>
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
          ${y}
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
        <label>${f("description")}</label>
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
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("check",14)} ${f(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let v=w,b="";e&&(b="modal-lg",v=`
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
            <div id="task-documents-list">${Te(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${t("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${Ke(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${t("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${t("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById("modal-root").innerHTML=re(e?t("تعديل المهمة","Edit task"):f("addTask"),t("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),v,"task",b),Za(e)}function Za(e){const a=document.getElementById("modal-root");if(!a)return;const n=a.querySelector("#task-status-select"),o=a.querySelector("#task-auto-progress-badge");n&&o&&n.addEventListener("change",()=>{const j={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;o.textContent=`(${j}%)`});const r=a.querySelector("#task-template-select");r&&r.addEventListener("change",()=>{const j=r.value,D=(s.data?.templates||[]).find(L=>L.id===j);if(D){const L=a.querySelector("#task-title-ar"),z=a.querySelector("#task-title-en"),G=a.querySelector("#task-type-ar"),U=a.querySelector("#task-type-en");L&&!L.value&&(L.value=D.nameAr||""),z&&!z.value&&(z.value=D.nameEn||""),G&&(G.value=D.typeAr||"مخطط"),U&&(U.value=D.typeEn||"Drawing")}});const i=a.querySelector("#task-additional-assignees-input"),d=a.querySelector("#task-external-assignees-input"),l=a.querySelector("#assignees-chips-container"),p=a.querySelector("#assignee-combobox-search"),m=a.querySelector("#assignee-combobox-dropdown"),g=a.querySelector("#btn-add-external-quick");let y=[];try{y=JSON.parse(i?.value||"[]")}catch{y=[]}let w=[];try{w=JSON.parse(d?.value||"[]")}catch{w=[]}function v(){i&&(i.value=JSON.stringify(y)),d&&(d.value=JSON.stringify(w))}function b(){if(l){if(y.length===0&&w.length===0){l.style.display="none",l.innerHTML="",v();return}l.style.display="flex",l.innerHTML=ta(y,w),v()}}function u(j=""){if(!m)return;const D=j.trim().toLowerCase(),L=s.data?.users||[],z=a.querySelector("#task-primary-assignee")?.value,G=L.filter(F=>{if(F.id===z)return!1;if(!D)return!0;const ie=(F.name||"").toLowerCase(),me=(F.nameEn||"").toLowerCase(),W=(F.email||"").toLowerCase();return ie.includes(D)||me.includes(D)||W.includes(D)});let U="";D&&(U+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${t("إضافة مسؤول خارجي:","Add external assignee:")} "${c(j.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${t("إضافة سريعة","Quick Add")}</span>
        </div>
      `),G.length===0&&!D?U+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${t("لا يوجد مستخدمين آخرين","No other users")}</div>`:G.forEach(F=>{const ie=y.includes(F.id);U+=`
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
        `}),m.innerHTML=U,m.style.display="block"}v(),p&&(p.addEventListener("focus",()=>{u(p.value)}),p.addEventListener("input",()=>{const j=p.value.trim();u(j),g&&(g.style.display=j.length>1?"inline-flex":"none")}),p.addEventListener("keydown",j=>{if(j.key==="Enter"){j.preventDefault();const D=p.value.trim();D&&(w.includes(D)||(w.push(D),b()),p.value="",g&&(g.style.display="none"),m&&(m.style.display="none"))}})),g&&g.addEventListener("click",()=>{const j=p?.value.trim();j&&(w.includes(j)||(w.push(j),b()),p.value="",g.style.display="none",m&&(m.style.display="none"))}),m&&m.addEventListener("click",j=>{if(j.target.closest(".dropdown-ext-action")){const L=p?.value.trim();L&&!w.includes(L)&&(w.push(L),b()),p&&(p.value=""),g&&(g.style.display="none"),m.style.display="none";return}const D=j.target.closest(".combobox-user-row");if(D){const L=D.dataset.uid;y.includes(L)?y=y.filter(z=>z!==L):y.push(L),b(),u(p?.value||"")}}),l&&l.addEventListener("click",j=>{const D=j.target.closest(".btn-remove-chip-user");if(D){const z=D.dataset.uid;y=y.filter(G=>G!==z),b(),m&&m.style.display==="block"&&u(p?.value||"");return}const L=j.target.closest(".btn-remove-chip-ext");if(L){const z=L.dataset.ext;w=w.filter(G=>G!==z),b()}});const h=a.querySelector("#task-reminders-input"),T=a.querySelector("#task-reminders-list"),k=a.querySelector("#new-reminder-datetime"),E=a.querySelector("#new-reminder-note"),M=a.querySelector("#btn-add-reminder");let C=[];try{C=JSON.parse(h?.value||"[]")}catch{C=[]}Array.isArray(C)||(C=[]);function A(){T&&(h&&(h.value=JSON.stringify(C)),T.innerHTML=aa(C))}M&&M.addEventListener("click",()=>{const j=k?.value;if(!j){$(t("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const D=E?.value.trim()||"",L={id:"rem_temp_"+Math.random().toString(36).substr(2,9),remindAt:new Date(j).toISOString(),noteAr:D};C.push(L),k&&(k.value=""),E&&(E.value=""),A(),$(t("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),T&&T.addEventListener("click",async j=>{const D=j.target.closest(".btn-delete-reminder");if(D){const L=Number(D.dataset.idx),z=D.dataset.remId;!isNaN(L)&&L>=0&&L<C.length&&(C.splice(L,1),A(),z&&!z.startsWith("rem_temp_")&&I(`/api/reminders/${z}`,{method:"DELETE"}).catch(()=>{}),$(t("تم حذف موعد التذكير.","Reminder deleted.")))}}),a.addEventListener("mousedown",j=>{m?.contains(j.target)||p?.contains(j.target)||g?.contains(j.target)||(m&&(m.style.display="none"),g&&(g.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&I(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(j=>{if(j&&Array.isArray(j.comments)){s.data.comments||(s.data.comments=[]);const D=new Map(s.data.comments.map(z=>[z.id,z]));for(const z of j.comments)D.set(z.id,z);s.data.comments=Array.from(D.values());const L=document.getElementById("task-comments-list");L&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(L.innerHTML=Ke(e))}}).catch(()=>{})}function Ke(e){const a=(s.data.comments||[]).filter(n=>n.taskId===e.id).sort((n,o)=>new Date(n.createdAt)-new Date(o.createdAt));return a.length?`<div style="display:flex;flex-direction:column;gap:12px;">${a.map(n=>{const o=n.user||(s.data?.users||[]).find(l=>l.id===n.userId)||s.data?.user||{name:"DARC Member",id:""},r=!!(o.id&&s.data?.user?.id&&o.id===s.data.user.id),i=r||typeof _=="function"&&_(),d=c(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${c(n.id)}" style="display:flex;gap:10px;flex-direction:${r?"row-reverse":"row"};">
        ${N(o)}
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
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${x("message",18)}<span style="font-size:12px;">${t("لا توجد تعليقات","No comments yet")}</span></div>`}function Te(e){const a=s.data.documents.filter(n=>n.taskId===e.id).sort((n,o)=>new Date(o.createdAt)-new Date(n.createdAt));return a.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${a.map(n=>`
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
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${x("document",18)}<span style="font-size:12px;">${t("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function Qa(e){const a=(s.data?.documents||[]).find(y=>y.id===e);if(!a)return;let n=a.diskFilename||`/api/documents/${a.id}`;(n.startsWith("file://")||n.startsWith("/")||!n.startsWith("http"))&&(n=`/api/documents/${a.id}`);let o="";if(n.includes("drive.google.com")){const y=n.match(/\/d\/([a-zA-Z0-9_-]+)/);y&&y[1]&&(o=y[1])}const r=o?`https://drive.google.com/file/d/${encodeURIComponent(o)}/preview`:n,i=/^(https?:\/\/|\/)/i.test(r)?r:"about:blank",d=o?`https://drive.google.com/file/d/${encodeURIComponent(o)}/view?usp=drivesdk`:n.startsWith("http")?n:`${window.location.origin}${n}`,l=/^(https?:\/\/|\/)/i.test(d)?d:"#",p=`/api/documents/${encodeURIComponent(a.id)}`,m=/\.(jpe?g|png|gif|webp|svg|heic)$/i.test(a.originalName)||a.mimeType&&a.mimeType.startsWith("image/");a.size>1048576?(a.size/1048576).toFixed(1)+"":Math.round((a.size||0)/1024)+"";let g=document.getElementById("preview-modal-overlay");g||(g=document.createElement("div"),g.id="preview-modal-overlay",g.style.position="fixed",g.style.inset="0",g.style.zIndex="1300",g.style.background="rgba(0, 0, 0, 0.75)",g.style.backdropFilter="blur(4px)",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.padding="20px",document.body.appendChild(g)),g.innerHTML=`
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
          <a href="${c(l)}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${t("فتح في Google Drive","Open in Google Drive")}">
            ${x("globe",13)} <span class="hide-mobile">${t("فتح في Drive","Open in Drive")}</span>
          </a>
          <a href="${c(p)}" target="_blank" rel="noopener noreferrer" download class="btn btn-primary btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${t("تحميل المخطط","Download")}">
            ${x("download",13)} <span class="hide-mobile">${t("تحميل","Download")}</span>
          </a>
          <button type="button" class="btn btn-ghost btn-sm" id="close-preview-modal-btn" style="padding:6px;min-width:0;margin-inline-start:4px;" title="${t("إغلاق","Close")}">${x("close",18)}</button>
        </div>
      </div>
      <div style="flex:1;position:relative;background:#1a1a1a;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        ${!o&&m?`
          <div style="width:100%;height:100%;overflow:auto;display:flex;align-items:center;justify-content:center;padding:15px;">
            <img src="${c(i)}" alt="${c(a.originalName)}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='${c(p)}';" />
          </div>
        `:`
          <iframe src="${c(i)}" sandbox="allow-scripts allow-same-origin allow-popups" style="width:100%;height:100%;border:none;background:#fff;" allow="autoplay" loading="lazy"></iframe>
        `}
      </div>
    </div>
  `,g.style.display="flex",document.getElementById("close-preview-modal-btn")?.addEventListener("click",()=>{g.style.display="none",g.innerHTML=""}),g.onclick=y=>{y.target===g&&(g.style.display="none",g.innerHTML="")}}function en(){return[["not_started",f("notStarted")],["in_progress",f("inProgress")],["review",f("review")],["approval",f("approval")],["done",f("done")],["blocked",f("blocked")],["canceled",f("canceled")]]}function ri(){const e=document.querySelector(".timeline-container > div"),a=document.querySelector(".timeline-svg");if(!e||!a)return;a.innerHTML="";const n=Array.from(document.querySelectorAll(".timeline-bar")),o={},r=e.getBoundingClientRect();n.forEach(l=>{const p=l.getBoundingClientRect();o[l.dataset.taskId]={left:p.left-r.left,right:p.right-r.left,top:p.top-r.top,bottom:p.bottom-r.top,width:p.width,height:p.height,center:p.top-r.top+p.height/2}});let i="";const d=s.lang==="ar";n.forEach(l=>{const p=l.dataset.taskId,m=(s.data?.tasks||[]).find(w=>w.id===p),g=m?.dependencies||m?.customFields?.dependencies||[];if(!m||!g.length)return;const y=o[p];y&&g.forEach(w=>{const v=o[w];if(!v)return;const b=d?v.left:v.right,u=v.center,h=d?y.right:y.left,T=y.center,k=b+(d?-20:20);i+=`<path d="M ${b} ${u} C ${k} ${u}, ${k} ${T}, ${h} ${T}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),a.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${i}
  `}var di=ne({buildProjectMemberChipsHtml:()=>Ct,exportPortfolioPDF:()=>cn,exportPortfolioXLS:()=>dn,exportProjectPDF:()=>Lt,exportProjectXLS:()=>ln,exportXLS:()=>sa,getCompanyBranding:()=>st,getDaysLeftBadge:()=>na,getProjectTeam:()=>ci,getProjectTeamData:()=>it,openCloneModal:()=>ui,openProjectModal:()=>ia,projectCard:()=>sn,projectRow:()=>li,renderInPagePrintModal:()=>oa,renderProjectCardTeamAvatars:()=>nn,renderProjectDetail:()=>pi,renderProjectOverviewTab:()=>on,renderProjectTeamAvatars:()=>tn,renderProjectTimelineBar:()=>an,renderProjects:()=>rn});function li(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${x("building",17)}</span><div class="project-name"><strong>${c(t(e.nameAr,e.nameEn))}</strong><span>${c(e.code)} · ${c(t(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${N(e.manager)}<span>${c(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${c(e.id)}" aria-label="${f("viewDetails")}">${x(s.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function na(e){if(!e)return"";const a=new Date(`${e}T23:59:59`),n=Math.ceil((a-new Date)/864e5);let o="var(--mint-strong)",r="var(--mint)",i="";return n<0?(o="var(--red)",r="var(--red-soft)",i=t(`متأخر ${Math.abs(n)} يوم`,`${Math.abs(n)}d overdue`)):n===0?(o="var(--red)",r="var(--red-soft)",i=t("يستحق اليوم","Due today")):n<=2?(o="var(--red)",r="var(--red-soft)",i=t(`باقي ${n} يوم`,`${n}d left`)):n<=7?(o="var(--amber)",r="var(--amber-soft)",i=t(`باقي ${n} أيام`,`${n}d left`)):(o="var(--mint-strong)",r="var(--mint)",i=t(`باقي ${n} يوم`,`${n}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${o};background:${r};border:1px solid currentColor;">${x("clock",11)} ${i}</span>`}function it(e){const a=s.data?.users||[],n=(s.data?.tasks||[]).filter(i=>i.projectId===e.id),o=new Set,r=new Set;return e.managerId&&o.add(e.managerId),n.forEach(i=>{i.assigneeId&&o.add(i.assigneeId),(i.customFields?.additionalAssignees||i.customFields?.additional_assignees||[]).forEach(d=>o.add(d)),(i.customFields?.externalAssignees||i.customFields?.external_assignees||[]).forEach(d=>{d&&typeof d=="string"&&d.trim()&&r.add(d.trim())})}),{internalMembers:Array.from(o).map(i=>a.find(d=>d.id===i)).filter(Boolean),externalMembers:Array.from(r)}}function ci(e){return it(e).internalMembers}function tn(e,a=4,n=!0,o=[]){if((!e||!e.length)&&(!o||!o.length))return`<span style="font-size:11px;color:var(--muted);">${t("لا يوجد فريق محدد","No team assigned")}</span>`;const r=(e||[]).slice(0,a),i=(e||[]).length-a,d=(e||[]).map(p=>t(p.name,p.nameEn||p.name)).join("، ");let l='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return r.forEach(p=>{const m=t(p.name,p.nameEn||p.name),g=n?`data-action="filter-by-member" data-member-id="${c(p.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';l+=`
      <span class="team-member-chip" ${g} title="${c(m)} (${c(Z(p))})">
        ${N(p,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${c(m)}</span>
      </span>
    `}),i>0&&(l+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${c(d)}">+${i} ${t("آخرين","more")}</span>`),o&&o.length>0&&(l+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${c(o.join("، "))}">🌐 +${o.length} ${t("خارجي","ext")}</span>`),l+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${t("فريق العمل الداخلي","Internal Team")} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(p=>`
        <div ${n?`data-action="filter-by-member" data-member-id="${c(p.id)}" title="${c(t("فلترة مهام "+(p.name||""),"Filter tasks of "+(p.nameEn||p.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${n?"cursor:pointer;transition:all 0.15s;":""}" ${n?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
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

    ${n?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${t("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,l+="</div>",l}function an(e){if(!e.dueDate)return"";const a=new Date(e.startDate||e.createdAt||Date.now()-2592e6),n=new Date(`${e.dueDate}T23:59:59`),o=new Date,r=n.getTime()-a.getTime();let i=0;r>0&&(i=Math.min(100,Math.max(0,Math.round((o.getTime()-a.getTime())/r*100))));const d=o>n,l=d?"var(--red)":i>=80&&!d?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${x("clock",12)}
          <strong>${t("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${l};font-weight:bold;">${d?t("انتهى موعد التسليم!","Deadline passed!"):t(`مضى ${i}% من الوقت`,`${i}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${dateLabel(e.startDate)} ➔ ${dateLabel(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${i}%;background:${l};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function nn(e=[],a=[],n=3){const o=e.length+a.length;if(o===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const r=e.slice(0,n),i=o-r.length;[...e.map(l=>t(l.name,l.nameEn||l.name)),...a].join("، ");let d=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${t("عرض فريق العمل","View Team")}">`;return d+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',r.forEach((l,p)=>{d+=`
      <div style="margin-inline-start:${p===0?"0":"-8px"};position:relative;z-index:${10-p};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${N(l,"mini-avatar")}
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
            ${N(l,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(t(l.name,l.nameEn||l.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${c(Z(l))}</span>
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
  `,d+="</div>",d}function sn(e){const{internalMembers:a,externalMembers:n}=it(e),o=e.manager||(s.data?.users||[]).find(d=>d.id===e.managerId),r=na(e.dueDate),i=t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
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
          <span style="font-size:9px;color:var(--muted);">${f("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(o?t(o.name,o.nameEn||o.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${f("team")} (${a.length+n.length})</span>
        ${nn(a,n,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${f("deadline")}</span>
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
      ${f("viewDetails")} ${x(s.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function on(e,a,n,o=[]){const r=e.manager||(s.data?.users||[]).find(p=>p.id===e.managerId),i=a.filter(p=>p.status==="done").length,d=a.filter(p=>p.status==="in_progress").length,l=a.filter(isOverdue).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${t("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${a.length}</div>
          <span class="metric-note up">${i} ${f("done")}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${t("قيد التنفيذ","In Progress")}</span>
          <div class="metric-value">${d}</div>
          <span class="metric-note">${t("عمل جارٍ","Active work")}</span>
        </div>
        <div class="metric-card ${l?"red":"teal"}" style="padding:14px 18px;">
          <span class="metric-label">${f("overdue")}</span>
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
      ${an(e)}

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
              <span style="font-size:10px;color:var(--muted);display:block;">${f("client")}</span>
              <strong style="font-size:13px;color:var(--ink);">${c(t(e.clientAr,e.clientEn)||"—")}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${f("lifecycle")}</span>
              <strong style="font-size:13px;color:var(--ink);">${c(O(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${f("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${f("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.dueDate,!0)}</strong>
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
            ${N(r)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${f("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${c(r?t(r.name,r.nameEn||r.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${c(r?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${t("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${n.map(p=>{const m=a.filter(g=>g.assigneeId===p.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${N(p,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${c(t(p.name,p.nameEn||p.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${c(Z(p))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${m} ${f("tasks")}</span>
                </div>
              `}).join("")}
          </div>

          ${o&&o.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${t("الشركاء والمتعاونون الخارجيون:","External Partners & Collaborators:")}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${o.map(p=>{const m=a.filter(g=>(g.customFields?.externalAssignees||g.customFields?.external_assignees||[]).includes(p)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${c(p)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${t("شريك / جهة خارجية","External Partner")}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${m} ${f("tasks")}</span>
                  </div>
                `}).join("")}
            </div>
          `:""}
        </div>
      </div>
    </div>
  `}function rn(){const e=s.searches.projects.trim().toLowerCase();let a=s.data.projects.filter(o=>`${o.nameAr} ${o.nameEn} ${o.code} ${o.clientAr}`.toLowerCase().includes(e));const n=s.projectSort||"default";return n==="alpha-asc"?a.sort((o,r)=>(t(o.nameAr,o.nameEn)||"").localeCompare(t(r.nameAr,r.nameEn)||"",s.lang==="ar"?"ar":"en")):n==="alpha-desc"?a.sort((o,r)=>(t(r.nameAr,r.nameEn)||"").localeCompare(t(o.nameAr,o.nameEn)||"",s.lang==="ar"?"ar":"en")):n==="progress-asc"?a.sort((o,r)=>(Number(o.progress)||0)-(Number(r.progress)||0)):n==="progress-desc"&&a.sort((o,r)=>(Number(r.progress)||0)-(Number(o.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${t("المحفظة","PORTFOLIO")}</p><h1>${f("projects")}</h1><p>${t("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${S("create_projects")?`<button class="btn btn-primary" data-action="new-project">${x("plus",15)} ${f("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${x("search",15)}<input data-search="projects" value="${c(s.searches.projects)}" placeholder="${f("search")}" /></div><div class="sort-box"><span>${t("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${n==="default"?"selected":""}>${t("الافتراضي","Default")}</option><option value="alpha-asc" ${n==="alpha-asc"?"selected":""}>${t("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${n==="alpha-desc"?"selected":""}>${t("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${n==="progress-asc"?"selected":""}>${t("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${n==="progress-desc"?"selected":""}>${t("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${a.length} ${t("مشاريع","projects")}</span></div></div>${a.length?`<div class="project-cards">${a.map(sn).join("")}</div>`:`<section class="panel"><div class="empty">${x("building",18)}<span>${f("noProjects")}</span></div></section>`}`}function pi(){const e=s.data.projects.find(y=>y.id===s.activeProjectId);if(!e)return s.view="projects",rn();const a=s.data.tasks.filter(y=>y.projectId===e.id),{internalMembers:n,externalMembers:o}=it(e),r=s.projectTab||"tasks",i=s.projectMemberFilter||null,d=i?a.filter(y=>y.assigneeId===i||(y.customFields?.additionalAssignees||y.customFields?.additional_assignees||[]).includes(i)):a,l=i?s.data.users.find(y=>y.id===i):null;let p="";if(r==="overview")p=on(e,a,n,o);else if(r==="tasks"){const y=s.projectTaskSort||Fe();p=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${f("projectTasks")} ${i?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${t("مهام","Tasks of")}: ${c(t(l?.name,l?.nameEn||l?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${t("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${Zt(y,"sort-project-tasks")}
            ${i?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${x("close",12)} ${t("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${S("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}" title="${t("اضغط N للإضافة السريعة","Press N to add quickly")}">${x("plus",14)} ${f("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${renderBoard(d,y)}
      </div>
    `}else if(r==="timeline"){const{renderTimelinePanel:y}=window.__timelineExports||{};p=y?y(d,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${renderTimeline(d)}</div>`}else if(r==="drawings"){const y=(s.data.documents||[]).filter(u=>u.projectId===e.id&&!u.deletedAt),w=a.filter(u=>u.typeAr==="مخطط"||u.typeEn==="Drawing"||u.templateId),v=s.docTaskFilter||"all",b=v==="all"?y:y.filter(u=>u.taskId===v);p=`
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
                <option value="all" ${v==="all"?"selected":""}>${t("— جميع المهام —","— All Tasks —")}</option>
                ${a.map(u=>`<option value="${c(u.id)}" ${v===u.id?"selected":""}>${c(t(u.titleAr,u.titleEn))}</option>`).join("")}
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
            ${x("document",14)} ${t("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${b.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${t("اسم المخطط / الملف","Blueprint / File Name")}</th>
                  <th>${f("tasks")}</th>
                  <th>${t("الحالة","Status")}</th>
                  <th>${t("الحجم","Size")}</th>
                  <th>${t("تاريخ الرفع","Upload Date")}</th>
                  <th style="text-align:end;">${t("الإجراءات","Actions")}</th>
                </tr>
              </thead>
              <tbody>
                ${b.length>0?b.map(u=>{const h=a.find(k=>k.id===u.taskId),T=u.size>1048576?(u.size/1048576).toFixed(1)+" MB":Math.round((u.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${c(u.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(u.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${x("document",15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(u.originalName)}">
                              ${c(u.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${c(u.mimeType||"application/octet-stream")}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${h?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(h.id)}">${c(t(h.titleAr,h.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${c(u.status||"draft")}" style="font-size:11px;">
                          ${c(O(u.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${T}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(u.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(u.id)}" style="padding:5px;" title="${t("معاينة المخطط","Preview")}">
                            ${x("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(u.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ الرابط","Copy Link")}">
                            ${x("link",14)}
                          </button>
                          <a href="/api/documents/${c(u.id)}" target="_blank" rel="noopener noreferrer" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${t("تحميل","Download")}">
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
            ${x("checklist",14)} ${t("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${w.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${f("taskTitle")}</th>
                  <th>${f("taskType")}</th>
                  <th>${f("status")}</th>
                  <th>${f("progress")}</th>
                  <th>${f("assignee")}</th>
                </tr>
              </thead>
              <tbody>
                ${w.map(u=>`
                  <tr data-action="open-task" data-task-id="${c(u.id)}" style="cursor:pointer;" title="${t("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${c(t(u.titleAr,u.titleEn))}</span><span class="table-sub">${c(u.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${c(t(u.typeAr,u.typeEn)||t("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${c(u.status)}">${c(O(u.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${u.status==="done"?"var(--green)":"var(--blue)"};width:${u.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${u.progress||0}%</span>
                      </div>
                    </td>
                    <td>${u.assignee?c(t(u.assignee.name,u.assignee.nameEn||u.assignee.name)):"—"}</td>
                  </tr>
                `).join("")||`<tr><td colspan="5"><div class="empty">${f("noTasks")}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else r==="activity"&&(p=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("activity")}</h2><p class="panel-subtitle">${t("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${renderAuditForProject(e.id)}</div>`);const m=e.manager||(s.data.users||[]).find(y=>y.id===e.managerId),g=na(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${x(s.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${c(e.code)} · ${e.demo?f("sampleData"):f("active")}</p>
          <h1>${c(t(e.nameAr,e.nameEn))}</h1>
          <p>${c(t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${x("user",12)} 
              <strong>${f("manager")}:</strong> ${c(m?t(m.name,m.nameEn||m.name):"—")}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${x("calendar",12)} ${dateLabel(e.dueDate,!0)}
                ${g}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${x("users",12)}
              <span style="font-size:11px;">${f("team")}:</span>
              ${tn(n,4,!0,o)}
            </span>
            <span class="status-badge ${c(e.health)}">${c(O(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${f("weightedProgress")}</span>
        ${S("edit_projects")||S("create_projects")||S("delete_projects")||S("view_reports")||_()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${x("more",15)} ${t("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${s.lang==="ar"?"left:0":"right:0"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;padding:5px;margin-top:5px;text-align:start">
              ${S("edit_projects")||_()?`<button class="menu-item" data-action="edit-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${x("edit",14)} ${f("edit")}</button>`:""}
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
      <button class="detail-tab ${r==="tasks"?"active":""}" data-action="project-tab" data-tab="tasks">${f("tasks")}</button>
      <button class="detail-tab ${r==="overview"?"active":""}" data-action="project-tab" data-tab="overview">${t("تفاصيل","Details")}</button>
      <button class="detail-tab ${r==="timeline"?"active":""}" data-action="project-tab" data-tab="timeline">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</button>
      <button class="detail-tab ${r==="drawings"?"active":""}" data-action="project-tab" data-tab="drawings">${f("drawings")}</button>
      <button class="detail-tab ${r==="activity"?"active":""}" data-action="project-tab" data-tab="activity">${f("activity")}</button>
    </div>
    
    ${p}
  `}function Ct(e=[]){const a=s.data?.users||[];return e.map(n=>{const o=a.find(r=>r.id===n)||{name:n,id:n};return`
      <span class="chip-item" data-uid="${c(n)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${N(o,"mini-avatar")}
        <span style="font-weight:500;">${c(t(o.name,o.nameEn||o.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${c(n)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function ia(e=null){const a=e?.code||`DARC-${String((s.data?.projects?.length||0)+1).padStart(3,"0")}`,n=e?it(e).internalMembers.map(i=>i.id):[],o=n.length>0?n:[s.data?.user?.id].filter(Boolean),r=`
    <form id="project-form" data-project-id="${c(e?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${c(JSON.stringify(o))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${x("building",14)} <span>${t("البيانات الأساسية للمشروع","Core Project Information")}</span>
        </div>

        <div class="field full">
          <label>${f("nameAr")} *</label>
          <input name="nameAr" value="${c(e?.nameAr||"")}" placeholder="${t("مثال: فيلا النخيل — التصميم الداخلي","e.g. Al Nakheel Villa — Interior Design")}" required />
        </div>
        <div class="field">
          <label>${f("nameEn")}</label>
          <input name="nameEn" value="${c(e?.nameEn||"")}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${f("projectCode")} *</label>
          <input name="code" value="${c(a)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${f("client")}</label>
          <input name="clientAr" value="${c(e?.clientAr||"")}" placeholder="${t("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${x("calendar",14)} <span>${t("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${f("manager")}</label>
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
          <label>${f("startDate")}</label>
          <input type="date" name="startDate" value="${c(e?.startDate||"")}" />
        </div>
        <div class="field">
          <label>${f("dueDate")}</label>
          <input type="date" name="dueDate" value="${c(e?.dueDate||"")}" />
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
            ${Ct(o)}
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
          <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
          <button type="submit" class="btn btn-primary">${x("check",14)} ${f(e?"save":"create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=re(e?t("تعديل بيانات المشروع","Edit Project"):f("addProject"),t("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),r,"project"),setTimeout(()=>{const i=document.getElementById("project-member-search"),d=document.getElementById("project-member-dropdown"),l=document.getElementById("project-members-chips-container"),p=document.getElementById("project-members-input"),m=document.getElementById("project-manager-select");if(!i||!d||!l||!p)return;let g=[...o];function y(){l.innerHTML=Ct(g),l.style.display=g.length?"flex":"none",p.value=JSON.stringify(g),l.querySelectorAll(".btn-remove-project-member").forEach(v=>{v.addEventListener("click",b=>{b.stopPropagation();const u=v.dataset.uid;g=g.filter(h=>h!==u),y()})})}m&&m.addEventListener("change",()=>{const v=m.value;v&&!g.includes(v)&&(g.push(v),y())});function w(v=""){const b=v.toLowerCase().trim(),u=(s.data?.users||[]).filter(h=>!g.includes(h.id)&&(!b||h.name&&h.name.toLowerCase().includes(b)||h.nameEn&&h.nameEn.toLowerCase().includes(b)||h.email&&h.email.toLowerCase().includes(b)));u.length?(d.innerHTML=u.map(h=>`
          <div class="project-member-opt" data-uid="${c(h.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${N(h,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${c(t(h.name,h.nameEn||h.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${c(h.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${t("إضافة","Add")}</span>
          </div>
        `).join(""),d.querySelectorAll(".project-member-opt").forEach(h=>{h.addEventListener("mouseenter",()=>h.style.background="var(--surface-soft)"),h.addEventListener("mouseleave",()=>h.style.background="transparent"),h.addEventListener("click",()=>{const T=h.dataset.uid;T&&!g.includes(T)&&(g.push(T),y(),i.value="",d.style.display="none")})})):d.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${t("لا يوجد أعضاء مطابقون","No matching members")}</div>`,d.style.display="block"}i.addEventListener("focus",()=>w(i.value)),i.addEventListener("input",()=>w(i.value)),document.addEventListener("click",v=>{!i.contains(v.target)&&!d.contains(v.target)&&(d.style.display="none")}),y()},50)}function ui(e){const a=`
    <form id="clone-form" data-project-id="${e.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${t("أنت على وشك استنساخ المشروع:","You are about to clone the project:")} <strong style="color:var(--ink)">${c(t(e.nameAr,e.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${f("nameAr")}</label>
          <input name="nameAr" value="${c(e.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${f("nameEn")}</label>
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
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=re(t("استنساخ المشروع","Clone Project"),t("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),a,"clone");const n=document.getElementById("clone-form"),o=n.querySelector('input[name="cloneTasks"]'),r=n.querySelector('input[name="keepAssignees"]');o.addEventListener("change",i=>{r.disabled=!i.target.checked,i.target.checked||(r.checked=!1)}),n.addEventListener("submit",async i=>{i.preventDefault();const d=n.querySelector('button[type="submit"]');d.disabled=!0;try{const l={nameAr:n.nameAr.value,nameEn:n.nameEn.value,dueDate:n.dueDate.value,cloneTasks:n.cloneTasks.checked,keepAssignees:n.keepAssignees.checked,cloneMembers:n.cloneMembers.checked},p=await I(`/api/projects/${e.id}/clone`,{method:"POST",body:JSON.stringify(l)});J(),s.view="project-detail",s.activeProjectId=p.project.id,await refreshView(),$(t("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(l){$(l.message,!0),d.disabled=!1}})}function st(){const e=s.data?.company||{},a=e.nameAr||e.name||"فريق دارك للتصميم",n=e.nameEn||e.name||"DARC Design Team",o=t(a,n),r=e.logoUrl||"";let i=/^(https?:\/\/|data:image\/|\/)/i.test(r)&&!r.toLowerCase().includes("javascript:")?r:"";return i.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(i=`${window.location.origin}${i}`),{nameAr:a,nameEn:n,displayName:o,logoUrl:i,emailFrom:e.emailFrom||"",timezone:e.timezone||"Asia/Riyadh"}}function sa(e,a){const n=`
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
  `,o=new Blob(["\uFEFF"+n],{type:"application/vnd.ms-excel;charset=utf-8;"}),r=URL.createObjectURL(o),i=document.createElement("a");i.href=r,i.download=e+".xls",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}function dn(){const e=s.data?.projects||[];if(!e||!e.length){$(t("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const a=st(),n=Ie(),o=11;let r="<table>";r+=`<tr><td colspan="${o}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
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
    </tr>`}),r+="</table>",sa(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,r),$(t("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:t("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:e.length}})}).catch(()=>{})}function ln(e){const a=(s.data?.projects||[]).find(g=>g.id===e);if(!a)return;const n=(s.data?.tasks||[]).filter(g=>g.projectId===e);if(!n.length){$(t("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const o=st(),r=s.data?.users||[],i=new Map(r.map(g=>[g.id,g]));function d(g){if(!g)return"—";const y=i.get(g);return y?t(y.name,y.nameEn||y.name):g}const l=Ie(),p=11;let m="<table>";m+=`<tr><td colspan="${p}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${o.logoUrl?`<img src="${c(o.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(o.displayName)}</span>
  </td></tr>`,m+=`<tr><td colspan="${p}" class="subtitle">${t("تقرير مهام ومخرجات المشروع:","Project Tasks & Deliverables Report:")} ${c(t(a.nameAr,a.nameEn))} (${c(a.code)})</td></tr>`,m+=`<tr><td colspan="${p}" class="meta">${t("العميل / المالك:","Client:")} ${c(t(a.clientAr,a.clientEn))||"—"} | ${t("تاريخ الإصدار:","Generated on:")} ${l}</td></tr>`,m+=`<tr><td colspan="${p}" style="border:none;"></td></tr>`,m+=`<tr class="header">
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
  </tr>`,n.forEach((g,y)=>{const w=g.templateId?g.templateId.replace("tpl-","#"):g.id?`#${g.id.slice(-6)}`:`#${y+1}`,v=d(g.assigneeId||g.assignee_id),b=d(g.reviewerId||g.reviewer_id),u=d(g.approverId||g.approver_id);m+=`<tr>
      <td style="text-align:center;font-weight:bold;">${c(R(w))}</td>
      <td>${c(R(g.titleAr))}</td>
      <td>${c(R(g.titleEn))}</td>
      <td>${c(R(t(g.categoryAr,g.categoryEn)))}</td>
      <td>${c(R(v))}</td>
      <td style="color:#0369a1;">${c(R(b))}</td>
      <td style="color:#047857;">${c(R(u))}</td>
      <td>${c(R(O(g.status)))}</td>
      <td>${c(R(g.startDate||""))}</td>
      <td>${c(R(g.dueDate||""))}</td>
      <td style="font-weight:bold;">${g.progress||0}%</td>
    </tr>`}),m+="</table>",sa(`DARC_Project_${a.code}_${new Date().toISOString().split("T")[0]}`,m),$(t("تم بدء تحميل تقرير المهام.","Report download started.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:t(`تقرير مهام مشروع: ${a.nameAr}`,`Project Tasks Report: ${a.nameEn||a.nameAr}`),taskCount:n.length}})}).catch(()=>{})}function Lt(e,a=!1){const n=(s.data?.projects||[]).find(A=>A.id===e);if(!n)return;const o=(s.data?.tasks||[]).filter(A=>A.projectId===e);if(!o.length){$(t("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const r=st(),i=s.data?.users||[],d=new Map(i.map(A=>[A.id,A]));function l(A){if(!A)return"—";const j=d.get(A);return j?t(j.name,j.nameEn||j.name):A}function p(A){return A?.dueDate&&!["done","completed","canceled"].includes(A.status)&&new Date(`${A.dueDate}T23:59:59`)<new Date}const m=o.length,g=o.filter(A=>["done","completed"].includes(A.status)).length,y=o.filter(A=>["review","approval"].includes(A.status)).length;o.filter(A=>A.status==="in_progress").length;const w=o.filter(A=>p(A)).length,v=new Date,b=Ie(v),u=at(v),h=new Map;o.forEach(A=>{const j=t(A.categoryAr,A.categoryEn)||t(A.typeAr,A.typeEn)||t("عام","General"),D=h.get(j)||{total:0,completed:0,weight:0,progressSum:0},L=Number(A.weight||1);D.total++,["done","completed"].includes(A.status)&&D.completed++,D.weight+=L,D.progressSum+=(A.progress||0)*L,h.set(j,D)});const T=Array.from(h.entries()).map(([A,j])=>({name:A,percent:j.weight?Math.round(j.progressSum/j.weight):0,completed:j.completed,total:j.total})),k=a?t("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):t("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");a?t("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):t("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const E=o.map((A,j)=>{const D=A.templateId?A.templateId.replace("tpl-","#"):A.id?`#${A.id.slice(-6)}`:`#${j+1}`,L=t(A.titleAr,A.titleEn),z=t(A.categoryAr,A.categoryEn)||t(A.typeAr,A.typeEn)||"—",G=O(A.status),U=A.progress||0,F=A.dueDate||"—";if(a)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${j+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${c(D)}</td>
          <td style="font-weight:600;">${c(L)}</td>
          <td style="text-align:center;">${c(z)}</td>
          <td style="text-align:center;"><span class="badge ${c(A.status)}">${c(G)}</span></td>
          <td style="text-align:center;direction:ltr;">${c(F)}</td>
          <td style="text-align:center;font-weight:bold;color:${U===100?"#0d6269":"#1e293b"};">${U}%</td>
        </tr>
      `;const ie=l(A.assigneeId||A.assignee_id),me=l(A.reviewerId||A.reviewer_id),W=l(A.approverId||A.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${j+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${c(D)}</td>
        <td style="font-weight:600;">${c(L)}</td>
        <td style="text-align:center;">${c(z)}</td>
        <td>${c(ie)}</td>
        <td style="color:#0369a1;font-weight:600;">${c(me)}</td>
        <td style="color:#047857;font-weight:600;">${c(W)}</td>
        <td style="text-align:center;"><span class="badge ${c(A.status)}">${c(G)}</span></td>
        <td style="text-align:center;direction:ltr;">${c(F)}</td>
        <td style="text-align:center;font-weight:bold;color:${U===100?"#0d6269":"#1e293b"};">${U}%</td>
      </tr>
    `}).join(""),M=`
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
          <strong style="color:#0d6269;font-size:13px;">${c(k)}</strong>
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
          <div class="report-type-badge">${c(k)}</div>
          <div><strong>${t("كود المشروع:","Project Code:")}</strong> ${c(n.code)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(b)} - ${c(u)}</div>
          <div><strong>${t("حالة المشروع:","Project Status:")}</strong> ${c(O(n.lifecycle))} (${c(O(n.health))})</div>
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
          <div class="kpi-val" style="color:#047857;">${g} / ${m}</div>
          <div class="kpi-label">${t("المخرجات المعتمدة","Approved Deliverables")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${y}</div>
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
            ${T.map(A=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${c(A.name)}</span>
                  <span>${A.percent}% (${A.completed}/${A.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${A.percent}%;"></div>
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
        <div>${c(b)}</div>
      </footer>
    </body>
    </html>
  `,C=window.open("","_blank","width=1100,height=900");C?(C.document.open(),C.document.write(M),C.document.close()):oa(M),$(t("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:c(k),type:a?"client_pdf":"executive_pdf",taskCount:m}})}).catch(()=>{})}function cn(){const e=s.data?.projects||[];if(!e||!e.length){$(t("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const a=st(),n=new Date,o=Ie(n),r=at(n),i=e.length,d=e.filter(v=>v.health==="on_track").length,l=e.filter(v=>v.health==="at_risk").length,p=e.filter(v=>v.health==="off_track").length,m=e.map((v,b)=>{const u=v.manager?t(v.manager.name,v.manager.nameEn||v.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${b+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${c(v.code)}</td>
        <td style="font-weight:700;">${c(t(v.nameAr,v.nameEn))}</td>
        <td>${c(t(v.clientAr,v.clientEn))||"—"}</td>
        <td>${c(u)}</td>
        <td style="text-align:center;"><span class="badge ${c(v.lifecycle)}">${c(O(v.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${c(v.health)}">${c(O(v.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${c(v.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${c(v.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${v.progress===100?"#0d6269":"#0f172a"};">${v.progress||0}%</td>
      </tr>
    `}).join(""),g=t("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),y=`
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
          <strong style="color:#0d6269;font-size:13px;">${c(g)}</strong>
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
          ${m}
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
  `,w=window.open("","_blank","width=1200,height=900");w?(w.document.open(),w.document.write(y),w.document.close()):oa(y),$(t("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:c(g),type:"portfolio_pdf",count:i}})}).catch(()=>{})}function oa(e){let a=document.getElementById("print-modal-overlay");a||(a=document.createElement("div"),a.id="print-modal-overlay",a.style.position="fixed",a.style.inset="0",a.style.zIndex="1400",a.style.background="rgba(0, 0, 0, 0.75)",a.style.backdropFilter="blur(4px)",a.style.display="flex",a.style.flexDirection="column",a.style.alignItems="center",a.style.justifyContent="center",a.style.padding="15px",document.body.appendChild(a)),a.innerHTML=`
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
  `,a.style.display="flex";const n=()=>{a.style.display="none",a.innerHTML="",window.removeEventListener("keydown",o)},o=r=>{r.key==="Escape"&&n()};window.addEventListener("keydown",o),document.getElementById("btn-close-print-modal")?.addEventListener("click",n),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const r=document.getElementById("print-preview-iframe");r&&r.contentWindow&&(r.contentWindow.focus(),r.contentWindow.print())})}var mi=ne({TEMPLATE_CATEGORIES:()=>Ve,openTemplateModal:()=>gi,renderTemplates:()=>fi}),Ve=[{id:"architectural",ar:"معماري",en:"Architectural",icon:"🏛️"},{id:"electrical",ar:"كهرباء — إلكتروميكانيك",en:"Electrical",icon:"⚡"},{id:"plumbing",ar:"سباكة — إلكتروميكانيك",en:"Plumbing",icon:"💧"},{id:"hvac",ar:"تكييف — إلكتروميكانيك",en:"HVAC",icon:"🌡️"},{id:"fire",ar:"حريق — إلكتروميكانيك",en:"Fire Protection",icon:"🧯"},{id:"low_current",ar:"تيار خفيف",en:"Low Current",icon:"📡"},{id:"sections",ar:"مقاطع",en:"Sections",icon:"✂️"},{id:"detail",ar:"تفصيلي",en:"Detailed",icon:"🔍"},{id:"site",ar:"موقع عام",en:"Site Plan",icon:"🗺️"},{id:"quantity",ar:"جداول كميات",en:"Quantity Tables",icon:"📊"},{id:"documents",ar:"وثائق وخطابات",en:"Documents & Letters",icon:"📄"}];function fi(){const e=s.searches.templates.trim().toLowerCase(),a=[...s.data.templates||[]].sort((i,d)=>(parseInt(i.code,10)||0)-(parseInt(d.code,10)||0)),n=new Map;Ve.forEach(i=>n.set(i.id,0)),a.forEach(i=>{n.set(i.categoryId,(n.get(i.categoryId)||0)+1)});const o=s.templateCategory||"all",r=Ve.map(i=>{if(o!=="all"&&o!==i.id)return null;const d=a.filter(l=>l.categoryId!==i.id?!1:e?`${l.nameAr} ${l.nameEn} ${l.code} ${l.typeAr} ${l.typeEn}`.toLowerCase().includes(e):!0);return d.length?{...i,items:d}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${t("مخرجات DARC القياسية","DARC STANDARD DELIVERABLES")}</p>
      <h1>${f("templates")}</h1>
      <p>${f("standardLibrarySub")}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${a.length} ${f("templatesCount")}</span>
      ${S("manage_templates")?`<button class="btn btn-primary" data-action="new-template" style="margin-${s.lang==="ar"?"right":"left"}:10px">${x("plus",15)} ${t("إضافة قالب","Add Template")}</button>`:""}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${x("search",15)}
        <input data-search="templates" value="${c(s.searches.templates)}" placeholder="${f("search")}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${o==="all"?"active":""}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${f("all")}</span>
        <small>${a.length}</small>
      </button>
      ${Ve.map(i=>`
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
              <span>${i.items.length} ${f("templatesCount")}</span>
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
                ${S("manage_templates")?`<button class="template-action" data-action="edit-template" data-template-id="${c(d.id)}" title="${f("edit")}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${s.lang==="ar"?"right":"left"}:auto">${x("edit",14)}</button>`:""}
              </article>
            `).join("")}
          </div>
        </section>
      `).join(""):`
        <section class="panel">
          <div class="empty">
            ${x("layers",18)}
            <span>${f("noTasks")}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function gi(e=null){if(!S("manage_templates"))return $(f("permissionDenied"),!0);const a=Ve.map(o=>`<option value="${c(o.id)}" ${e?.categoryId===o.id?"selected":""}>${c(t(o.ar,o.en))}</option>`).join(""),n=`<form id="template-form" data-template-id="${c(e?.id||"")}">
    <div class="form-grid">
      <div class="field">
        <label>${f("nameAr")}</label>
        <input name="nameAr" value="${c(e?.nameAr||"")}" required />
      </div>
      <div class="field">
        <label>${f("nameEn")}</label>
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
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${c(e.id)}" style="color:var(--red)">${x("trash",14)} ${f("delete")}</button>`:"<div></div>"}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("check",14)} ${f(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;document.getElementById("modal-root").innerHTML=re(e?t("تعديل قالب","Edit Template"):t("إضافة قالب جديد","Add New Template"),t("القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.","Templates help the team insert tasks quickly with standard criteria."),n,"template")}var vi=ne({openUploadDrawingModal:()=>bi,renderDocuments:()=>yi});function yi(){const e=s.data?.documents||[],a=s.data?.projects||[],n=s.data?.tasks||[],o=(s.searches?.documents||"").trim().toLowerCase(),r=s.docProjectFilter||"all",i=s.data?.user?.id,d=_(),l=d||S("review_tasks")||S("approve_tasks")||S("edit_tasks"),p=new Set(n.filter(v=>!v.deletedAt).map(v=>v.id)),m=new Set(a.filter(v=>!v.deletedAt).map(v=>v.id)),g=e.filter(v=>!(v.deletedAt||v.taskId&&!p.has(v.taskId)||v.projectId&&!m.has(v.projectId)||r!=="all"&&v.projectId!==r||o&&!(v.originalName||"").toLowerCase().includes(o))).sort((v,b)=>new Date(b.createdAt||0)-new Date(v.createdAt||0)),y=g.reduce((v,b)=>v+(b.size||0),0),w=y>1073741824?(y/1073741824).toFixed(1)+" GB":y>1048576?(y/1048576).toFixed(1)+" MB":Math.round(y/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${f("documents")}</h2>
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
          ${g.length} ${t("مخطط / ملف","drawings")} (${w})
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
            ${a.map(v=>`<option value="${c(v.id)}" ${r===v.id?"selected":""}>${c(v.code)} - ${c(t(v.nameAr,v.nameEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">
          ${g.length} ${t("مخرجات","deliverables")}
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
              <th>${f("projects")}</th>
              <th>${f("tasks")}</th>
              <th>${t("الإصدار","Revision")}</th>
              <th>${t("الحالة الهندسية","Status")}</th>
              <th>${t("الحجم","Size")}</th>
              <th>${t("تاريخ الرفع","Upload Date")}</th>
              <th style="text-align:end;">${t("الإجراءات","Actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${g.length>0?g.map(v=>{const b=a.find(M=>M.id===v.projectId),u=n.find(M=>M.id===v.taskId),h=Vt(v.originalName,v.mimeType),T=La(v.originalName),k=v.size>1048576?(v.size/1048576).toFixed(1)+" MB":Math.round((v.size||0)/1024)+" KB",E=d||S("delete_documents")||v.uploaderId===i;return`
                <tr data-doc-id="${c(v.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(v.id)}">
                      <span class="file-format-badge" style="background:${h.bg};color:${h.color};border:1px solid ${h.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${h.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(v.originalName)}">
                          ${c(v.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${h.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${b?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${c(b.id)}">${c(b.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${u?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(u.id)}">${c(t(u.titleAr,u.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
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
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${c(v.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${v.status==="draft"?"selected":""}>📝 ${t("مسودة عمل","Draft")}</option>
                          <option value="review" ${v.status==="review"?"selected":""}>🔍 ${t("قيد المراجعة","Review")}</option>
                          <option value="approved" ${v.status==="approved"?"selected":""}>✅ ${t("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${v.status==="superseded"?"selected":""}>⏳ ${t("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${c(v.status||"draft")}" style="font-size:11px;">
                          ${c(O(v.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${k}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${xt(v.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(v.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${x("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(v.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ الرابط","Copy Link")}">
                        ${x("link",14)}
                      </button>
                      <a href="/api/documents/${c(v.id)}" target="_blank" rel="noopener noreferrer" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${t("تحميل","Download")}">
                        ${x("download",14)}
                      </a>
                      ${E?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${c(v.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
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
  `}function bi(e=null){const a=s.data?.projects||[],n=e||a[0]?.id||"",o=s.data?.tasks?.filter(d=>d.projectId===n&&!d.deletedAt)||[],r=`
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
  `,i=document.getElementById("modal-root");if(i){i.innerHTML=re(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),r,"upload-drawing","modal-lg");const d=document.getElementById("drawing-upload-project"),l=document.getElementById("drawing-upload-task");d&&l&&d.addEventListener("change",()=>{const u=d.value,h=s.data?.tasks?.filter(T=>T.projectId===u&&!T.deletedAt)||[];l.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+h.map(T=>`<option value="${c(T.id)}">${c(t(T.titleAr,T.titleEn))}</option>`).join("")});const p=document.getElementById("drawing-dropzone"),m=document.getElementById("drawing-file-input"),g=document.getElementById("drawing-selected-files-list"),y=document.getElementById("start-drawing-upload-btn");let w=[];const v=()=>{if(!w.length){g.innerHTML="",y.disabled=!0;return}y.disabled=!1,g.innerHTML=w.map((u,h)=>{const T=Vt(u.name,u.type),k=u.size>1048576?(u.size/1048576).toFixed(1)+" MB":Math.round(u.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${T.bg};color:${T.color};border:1px solid ${T.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${T.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${c(u.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${k})</span>
            </div>
            <button type="button" data-file-remove="${h}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),g.querySelectorAll("[data-file-remove]").forEach(u=>{u.addEventListener("click",h=>{const T=parseInt(u.dataset.fileRemove);w.splice(T,1),v()})})};p&&m&&(p.addEventListener("click",()=>m.click()),m.addEventListener("change",()=>{m.files?.length&&(w=Array.from(m.files),v())}),p.addEventListener("dragover",u=>{u.preventDefault(),p.style.borderColor="var(--teal)"}),p.addEventListener("dragleave",()=>{p.style.borderColor="var(--line)"}),p.addEventListener("drop",u=>{u.preventDefault(),p.style.borderColor="var(--line)",u.dataTransfer?.files?.length&&(w=Array.from(u.dataTransfer.files),v())}));const b=document.getElementById("upload-drawing-form");b&&b.addEventListener("submit",async u=>{if(u.preventDefault(),!w.length)return;const h=d.value,T=l.value||null,k=document.getElementById("drawing-upload-discipline")?.value||"عام",E=document.getElementById("drawing-upload-status")?.value||"draft";J(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:w,projectId:h,taskId:T,discipline:k,status:E})})}}var hi=ne({FULL_PERMISSIONS_CATALOG:()=>gn,exportAuditLogsXLS:()=>un,fetchFullAuditHistory:()=>fn,openRoleModal:()=>ki,openUserModal:()=>Ei,printAuditReport:()=>mn,renderAuditForProject:()=>wi,renderSettings:()=>$i,renderTeam:()=>xi,renderUserActivityCell:()=>pn});function xi(){if(!_()&&!S("manage_users"))return`<section class="panel"><div class="empty">${x("alert",18)}<span>${t("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const e=s.data?.user?.id;let a=(s.data?.users||[]).filter(n=>n.status!=="inactive");return e!=="usr_ahmad"?a=a.filter(n=>n.id!=="usr_ahmad"):a=[...a].sort((n,o)=>n.id==="usr_ahmad"?-1:o.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${f("team")}</h1>
        <p>${t("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${_()||S("manage_users")?`<button class="btn btn-primary" data-action="new-user">${x("plus",15)} ${f("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${a.map(n=>{const o=teamMetrics(n.id,s.data?.tasks||[]),r=n.id==="usr_ahmad";return`
          <article class="member-card ${r?"system-developer-card":""}" style="${r?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${N(n,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${c(t(n.name,n.nameEn||n.name))}</strong>
                  <span>${c(t(n.jobTitleAr||(r?"المبرمج / مدير النظام":""),n.jobTitleEn||n.jobTitleAr||""))}</span>
                </div>
              </div>
              ${r?`<span class="stealth-dev-badge">${x("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:canManageAccountPermissions()&&n.id!==s.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${c(n.id)}">${x("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${n.status==="active"?"done":"not_started"}">${c(Z(n))}</span>
            </div>
            <div class="member-card-stats">
              <span>${f("progress")} <strong>${o.progress}%</strong></span>
              <span>${o.tasks} ${f("tasks")}</span>
            </div>
            <div class="member-email">${n.email?c(n.email):f("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function wi(e){const a=(s.data?.auditLogs||[]).filter(n=>n.details?.projectId===e||n.entityType==="project"&&n.entityId===e);return a.length?`<div class="audit-list">${a.map(n=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${c(n.user?t(n.user.name,n.user.nameEn||n.user.name):"DARC")} · ${c(n.action)}</strong><span>${c(n.entityType)} · ${dateLabel(n.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${x("check",18)}<span>${t("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function pn(e){const a=e.lastActiveAt||e.customFields?.lastActiveAt,n=e.lastLoginAt||e.customFields?.lastLoginAt;if(!a&&!n)return`<span class="activity-never">${t("لم يسجل دخول بعد","Never logged in")}</span>`;const o=Date.now(),r=a?new Date(a).getTime():0,i=e.id===s.data?.user?.id?0:r&&!isNaN(r)?Math.floor((o-r)/6e4):999999,d=i>=0&&i<=5;let l="";if(d)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${t("نشط الآن","Online")}</span>`;else if(i<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${t(`منذ ${i} دقيقة`,`${i}m ago`)}</span>`;else if(i<1440){const m=Math.floor(i/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${t(`منذ ${m} ساعة`,`${m}h ago`)}</span>`}else r>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(a,!1)}</span>`);const p=n?`<span class="activity-sub" title="${c(n)}">${t("دخول:","Login:")} ${dateLabel(n,!0)}</span>`:"";return`<div class="activity-wrapper">${l}${p}</div>`}function ra(e){return Jt(e,{includeSeconds:!0})}function vt(e){const a=e.action||"",n=e.entityType||e.entity_type||"",o=e.details||{};let r="badge-neutral",i=a,d=n;a==="login"?(r="badge-teal",i=t("تسجيل دخول","Sign In"),d=t("جلسة نظام","System Session")):a==="create"?(r="badge-mint",i=t("إنشاء جديد","Created")):a==="update"?(r="badge-blue",i=t("تعديل بيانات","Updated")):a==="delete"?(r="badge-red",i=t("نقل للمهملات","Moved to Trash")):a==="status_change"?(r="badge-amber",i=t("تغيير حالة","Status Changed")):a==="export_report"?(r="badge-teal",i=t("تصدير تقرير","Exported Report")):a==="restore"?(r="badge-mint",i=t("استعادة","Restored")):a==="purge"?(r="badge-danger",i=t("حذف نهائي","Purged")):a==="invite"&&(r="badge-blue",i=t("دعوة مستخدم","Invite Sent")),n==="task"?d=t("مهمة","Task"):n==="project"?d=t("مشروع","Project"):n==="document"?d=t("مستند","Document"):n==="user"?d=t("مستخدم","User"):n==="report"?d=t("تقرير","Report"):n==="role"&&(d=t("دور وصلاحيات","Role"));let l="—";return o.title||o.name?l=`<strong>${c(o.title||o.name)}</strong>`:a==="status_change"&&(o.oldStatus||o.newStatus)?l=`<span>${c(O(o.oldStatus))} ➔ <strong>${c(O(o.newStatus))}</strong></span>`:e.entityId&&(l=`<code style="font-size:11px;color:var(--muted);">${c(e.entityId)}</code>`),{badgeClass:r,actionLabel:i,entityLabel:d,detailHtml:l}}function un(e=null){const a=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!a.length){$(t("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const n=s.data?.company||{},o=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let r=n.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=s.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=Ie(),p=at();let m=`
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
  `;a.forEach((u,h)=>{const T=u.user||(u.userId?(s.data?.users||[]).find(L=>L.id===u.userId):null),k=T?t(T.name,T.nameEn||T.name):t("النظام","System"),E=T?Z(T):"—",M=ra(u.createdAt),{actionLabel:C,entityLabel:A}=vt(u);let j="";u.details?.title||u.details?.name?j=u.details.title||u.details.name:u.action==="status_change"?j=`${O(u.details?.oldStatus)} ➔ ${O(u.details?.newStatus)}`:typeof u.details=="object"?j=JSON.stringify(u.details):j=String(u.details||u.entityId||"—");const D=h%2===0?"#ffffff":"#f8fafc";m+=`
      <tr style="background:${D};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${c(R(u.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(R(`${M.date} ${M.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${c(R(k))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(R(E))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(R(C))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(R(A))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(R(j))}</td>
      </tr>
    `}),m+="</table>";const g=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        th, td { border: 1px solid #cbd5e1; }
      </style>
    </head>
    <body dir="${s.lang==="ar"?"rtl":"ltr"}">
      ${m}
    </body>
    </html>
  `,y=new Blob(["\uFEFF"+g],{type:"application/vnd.ms-excel;charset=utf-8;"}),w=URL.createObjectURL(y),v=document.createElement("a");v.href=w;const b=new Date().toISOString().split("T")[0];v.download=`DARC_Audit_Trail_${b}.xls`,document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(w),$(t("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${b}`,details:{reportType:"Audit_Logs_Excel",count:a.length}})}).catch(()=>{})}function mn(e=null){const a=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!a.length){$(t("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const n=s.data?.company||{},o=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let r=n.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=s.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=Ie(),p=at(),m=a.length,g=a.filter(h=>h.action==="create").length,y=a.filter(h=>h.action==="update"||h.action==="status_change").length,w=a.filter(h=>h.action==="delete"||h.action==="purge"||h.action==="trash").length;let v="";a.forEach((h,T)=>{const k=h.user||(h.userId?(s.data?.users||[]).find(L=>L.id===h.userId):null),E=k?t(k.name,k.nameEn||k.name):t("النظام","System"),M=k?Z(k):"—",C=ra(h.createdAt),{actionLabel:A,entityLabel:j}=vt(h);let D="";h.details?.title||h.details?.name?D=h.details.title||h.details.name:h.action==="status_change"?D=`${O(h.details?.oldStatus)} ➔ ${O(h.details?.newStatus)}`:typeof h.details=="object"?D=JSON.stringify(h.details):D=String(h.details||h.entityId||"—"),v+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${c(h.id||String(T+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${c(C.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${c(C.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${c(E)}</div>
          <div style="font-size:10px;color:#64748b;">${c(M)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${c(A)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${c(j)}</td>
        <td style="font-size:11px;color:#334155;">${c(D)}</td>
      </tr>
    `});const b=window.open("","_blank","width=1100,height=850");if(!b){$(t("يرجى السماح بالنوافذ المنبثقة للطباعة.","Please allow popups to print report."),!0);return}const u=`
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
          <div class="kpi-val">${m}</div>
          <div class="kpi-label">${t("إجمالي العمليات","Total Events")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${g}</div>
          <div class="kpi-label">${t("عمليات إنشاء","Create Operations")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${y}</div>
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
          ${v}
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
  `;b.document.open(),b.document.write(u),b.document.close(),I("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:a.length}})}).catch(()=>{})}async function fn(){try{$(t("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const e=await I("/api/audit?limit=1000");e&&e.logs&&(s.data.auditLogs=e.logs,s.auditFullHistoryLoaded=!0,renderView(),$(t(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){$(e.message||t("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function $i(){const e=s.data?.user?.id,a=_(),n=a||S("manage_users")||S("view_user_activity"),o=[["profile",t("الملف الشخصي","Profile")],...a||S("manage_settings")?[["company",f("company")]]:[],...a||S("manage_roles")?[["roles",f("roles")]]:[],...n?[["accounts",f("accounts")]]:[],["security",t("الأمان","Security")],["trash",t("سلة المهملات","Trash")],...a||S("view_audit_logs")?[["audit",f("audit")]]:[]];o.some(([d])=>d===s.settingsSection)||(s.settingsSection="profile");const r=s.data?.user||{};let i="";if(s.settingsSection==="profile"&&(i=`
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
              ${r.avatarUrl?`<img src="${c(r.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(r.avatarColor||"")?r.avatarColor:"#0d6269"};">${c(Ye(r))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(r.avatarColor||"")?r.avatarColor:"#0d6269"};">${c(Ye(r))}</div>`}
              <div class="avatar-upload-overlay">
                ${x("upload",18)}
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
                ${x("upload",14)} ${t("رفع صورة جديدة","Upload new avatar")}
              </label>
              <span class="upload-hint">${t("يدعم JPG, PNG, WebP (حد أقصى 2MB)","Supports JPG, PNG, WebP (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${f("nameAr")}</label>
              <input name="name" value="${c(r.name||"")}" required />
            </div>
            <div class="field">
              <label>${f("nameEn")}</label>
              <input name="nameEn" value="${c(r.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${f("jobTitle")} (${t("عربي","AR")})</label>
              <input name="jobTitleAr" value="${c(r.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${f("jobTitle")} (${t("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${c(r.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${f("email")}</label>
              <input value="${c(r.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${t("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${Ee()==="gregorian"?"selected":""}>${t("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Ee()==="hijri"?"selected":""}>${t("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${t("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${f("save")}</button>
          </div>
        </form>
      </section>
    `),s.settingsSection==="company"&&(a||S("manage_settings"))){const d=s.data?.company||{};i=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${f("company")}</h2>
            <p>${t("هوية مساحة العمل وشعار الشركة واللغة الافتراضية.","Workspace identity, company logo, and default language.")}</p>
          </div>
        </div>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${t("انقر لرفع وتعديل شعار الشركة","Click to upload and change company logo")}">
            <div class="logo-upload-box">
              ${d.logoUrl?`<img src="${c(d.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${x("building",24)}</span>`:`<span class="brand-mark">${x("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${x("upload",16)}
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
                ${x("upload",14)} ${t("رفع وتعديل الشعار","Upload & Change Logo")}
              </label>
              <span class="upload-hint">${t("يدعم PNG, SVG, JPG (حد أقصى 2MB)","Supports PNG, SVG, JPG (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${f("nameAr")}</label>
              <input name="nameAr" value="${c(d.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${f("nameEn")}</label>
              <input name="nameEn" value="${c(d.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${f("emailStatus")}</label>
              <input value="${c(s.data?.emailConfigured?f("emailConfigured"):f("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${f("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${x("info",16)}<span>${f("emailInfo")}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("نموذج الإنجاز","Progress model")}</h2>
            <p>${f("weightedExplanation")}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${f("weightedProgress")}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${f("simpleProgress")}</span><strong style="color:var(--ink-soft)">—</strong></div>
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
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${f("save")}</button></div>
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
    `),s.settingsSection==="accounts"&&n){const d=_()||S("view_user_activity"),l=_()||S("manage_users"),p=_()||S("manage_existing_account_permissions")||S("manage_users"),m=_();let g=s.data?.users||[];e!=="usr_ahmad"&&(g=g.filter(y=>y.id!=="usr_ahmad")),i=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${f("accounts")}</h2>
            <p>${t("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${l?`<button class="btn btn-primary btn-sm" data-action="new-user">${x("plus",14)} ${f("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${f("team")}</th>
                <th>${f("role")}</th>
                <th>${f("email")}</th>
                <th>${f("accountStatus")}</th>
                ${d?`<th>${t("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${p?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${g.map(y=>{const w=y.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${N(y)}
                        <div class="team-member-copy">
                          <strong>${c(t(y.name,y.nameEn||y.name))}</strong>
                          <span>${c(t(y.jobTitleAr||(w?"المبرمج / مدير النظام":""),y.jobTitleEn||y.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${w?`<span class="stealth-dev-badge">${x("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:c(Z(y))}
                    </td>
                    <td>${y.email?c(y.email):`<span style="color:var(--muted)">${f("noEmail")}</span>`}</td>
                    <td>
                      <span class="status-badge ${y.status==="active"?"done":"not_started"}">${y.status==="active"?f("activeAccount"):f("pendingAccount")}</span>
                    </td>
                    ${d?`
                      <td>
                        ${pn(y)}
                      </td>
                    `:""}
                    ${p?`
                      <td>
                        <div class="role-actions">
                          ${w?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(y.id)}">${f("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(y.id)}">${f("edit")}</button>
                            ${y.id!==s.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${c(y.id)}" title="${y.status==="pending"?t("تفعيل الحساب يدوياً","Activate manually"):t("تغيير كلمة المرور","Change password")}">${x(y.status==="pending"?"check":"settings",13)}</button>
                              ${m?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${c(y.id)}" title="دخول كـ هذا الحساب">${x("user",13)}</button>`:""}
                            `:""}
                            ${y.id!==s.data?.user?.id&&y.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${c(y.id)}">${x("send",13)}</button>`:""}
                            ${y.id!==s.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${c(y.id)}">${x("trash",13)}</button>`:""}
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
    `}if(s.settingsSection==="roles"&&(a||S("manage_roles"))&&(i=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${f("roles")}</h2>
            <p>${t("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${a||S("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${x("plus",14)} ${f("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(s.data?.roles||[]).map(d=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${c(t(d.nameAr,d.nameEn))}</strong>
                  ${d.builtIn?`<span class="role-system-badge">${x("shield",11)} ${f("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${c(t(d.descriptionAr,d.descriptionEn))}</p>
                <div class="role-meta">${d.permissions.includes("*")?t("صلاحية كاملة","Full access"):`${d.permissions.length} ${f("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${c(d.id)}">${x("edit",13)} ${f("edit")}</button>
                ${d.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${c(d.id)}">${x("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),s.settingsSection==="trash"){!s.trashLoaded&&!s._trashFetching&&(s._trashFetching=!0,I("/api/trash").then(b=>{s.trash=Array.isArray(b)?b:b.trash||[...(b.projects||[]).map(u=>({...u,type:"project"})),...(b.tasks||[]).map(u=>({...u,type:"task"})),...(b.documents||[]).map(u=>({...u,type:"document"}))],s.trashLoaded=!0,s._trashFetching=!1,typeof window.renderView=="function"&&window.renderView()}).catch(b=>{s._trashFetching=!1,console.error("[Trash fetch error]",b)}));const d=s.trash||[],l=s.trashFilter||"all",p=(s.trashQuery||"").trim().toLowerCase(),m=d.filter(b=>{if(l!=="all"&&b.type!==l)return!1;if(!p)return!0;const u=(t(b.nameAr||b.titleAr,b.nameEn||b.titleEn)||b.name||b.title||b.originalName||"").toLowerCase(),h=(b.code||b.projectCode||"").toLowerCase(),T=(b.projectNameAr||b.projectNameEn||"").toLowerCase();return u.includes(p)||h.includes(p)||T.includes(p)}),g=d.filter(b=>b.type==="project").length,y=d.filter(b=>b.type==="task").length,w=d.filter(b=>b.type==="document").length,v=d.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${x("info",16)}</div>
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
            ${x("building",12)} ${t("المشاريع","Projects")} <span class="badge ${l==="project"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${g}</span>
          </button>
          <button class="btn btn-sm ${l==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${x("checklist",12)} ${t("المهام","Tasks")} <span class="badge ${l==="task"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${y}</span>
          </button>
          <button class="btn btn-sm ${l==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${x("document",12)} ${t("المستندات","Documents")} <span class="badge ${l==="document"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${w}</span>
          </button>
        </div>
        <div class="search-box search-sm" style="min-width:220px;max-width:320px;flex:1;">
          ${x("search",14)}
          <input type="search" placeholder="${t("بحث في المحذوفات...","Search deleted items...")}" value="${c(s.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${m.length?`
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
              ${m.map(b=>{const u=b.type==="project",h=b.type==="task",T=b.type==="document",k=t(b.nameAr||b.titleAr,b.nameEn||b.titleEn)||b.name||b.title||b.originalName||b.code||t("عنصر محذوف","Deleted item"),E=!u&&b.projectId?(s.data?.projects||[]).find(D=>D.id===b.projectId):null,M=b.projectNameAr||b.projectNameEn||(E?t(E.nameAr,E.nameEn||E.nameAr):null),C=b.projectCode||E?.code,A=T&&b.size?b.size>1048576?(b.size/1048576).toFixed(1)+" MB":Math.round(b.size/1024)+" KB":"",j=a||S("manage_trash")||b.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${u?"is-project":h?"is-task":"is-doc"}">
                          ${x(u?"building":h?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${c(k)}</strong>
                          ${b.code||u?`<span class="trash-item-code">${c(b.code||b.id)}</span>`:""}
                          ${T&&A?`<span class="trash-item-code" style="color:var(--muted);">${A}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${u?"type-project":h?"type-task":"type-doc"}">
                        ${x(u?"building":h?"checklist":"document",11)}
                        ${u?t("مشروع","Project"):h?t("مهمة","Task"):t("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${u?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${t("مشروع رئيسي","Primary Project")}</span>`:M?`${x("building",11)} <span>${c(M)}${C?` (${c(C)})`:""}</span>${T&&b.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${c(b.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
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
                          ${x(s.lang==="ar"?"arrow":"arrowLeft",12)} ${t("استعادة","Restore")}
                        </button>
                        ${j?`
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
    `:`
      <div class="empty">
        ${x("trash",24)}
        <span>${t("سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.","Trash is empty, no deleted items found.")}</span>
      </div>
    `;i=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${d.length} ${t("عناصر","items")}
              </span>
            </div>
            <p>${t("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(a||S("manage_trash"))&&d.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${t("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${x("trash",13)} ${t("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${v}
      </section>
    `}if(s.settingsSection==="audit"&&(a||S("view_audit_logs"))){const d=[...s.data?.auditLogs||[]].sort((u,h)=>new Date(h.createdAt).getTime()-new Date(u.createdAt).getTime()),l=s.auditFilterAction||"all",p=s.auditFilterEntity||"all",m=s.auditFilterUser||"all",g=(s.auditSearchQuery||"").trim().toLowerCase(),y=d.filter(u=>{if(l!=="all"&&u.action!==l||p!=="all"&&(u.entityType||u.entity_type)!==p||m!=="all"&&(u.userId||u.user_id||u.user?.id)!==m)return!1;if(g){const h=u.user||(u.userId?(s.data?.users||[]).find(D=>D.id===u.userId):null),T=(h&&t(h.name,h.nameEn||h.name)||"").toLowerCase(),{actionLabel:k,entityLabel:E}=vt(u),M=(k||u.action||"").toLowerCase(),C=(E||u.entityType||"").toLowerCase(),A=(u.id||u.entityId||"").toLowerCase(),j=typeof u.details=="object"?JSON.stringify(u.details).toLowerCase():String(u.details||"").toLowerCase();if(!(T.includes(g)||M.includes(g)||C.includes(g)||A.includes(g)||j.includes(g)))return!1}return!0});s._lastFilteredAuditLogs=y;const w=[["all",t("كافة العمليات","All Actions")],["create",t("إنشاء جديد","Create")],["update",t("تعديل بيانات","Update")],["status_change",t("تغيير حالة","Status Change")],["delete",t("نقل للمهملات","Delete / Trash")],["restore",t("استعادة","Restore")],["purge",t("حذف نهائي","Purge")],["export_report",t("تصدير تقرير","Export Report")],["login",t("تسجيل دخول","Sign In")],["invite",t("دعوة مستخدم","Invite")]],v=[["all",t("كافة العناصر","All Entities")],["project",t("المشاريع","Projects")],["task",t("المهام","Tasks")],["document",t("المستندات","Documents")],["user",t("المستخدمين","Users")],["role",t("الأدوار والصلاحيات","Roles")],["company",t("إعدادات الشركة","Company Settings")],["report",t("التقارير","Reports")]],b=l!=="all"||p!=="all"||m!=="all"||!!g;i=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${f("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${y.length} ${t("عملية معروضة","events shown")}
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
              ${w.map(([u,h])=>`<option value="${u}" ${l===u?"selected":""}>${h}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${v.map(([u,h])=>`<option value="${u}" ${p===u?"selected":""}>${h}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${t("كافة المستخدمين","All Users")}</option>
              ${(s.data?.users||[]).map(u=>`<option value="${u.id}" ${m===u.id?"selected":""}>${c(t(u.name,u.nameEn||u.name))}</option>`).join("")}
            </select>
            ${b?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${t("إعادة تعيين الفلاتر","Reset filters")}">
                ${t("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${y.length?`
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
                ${y.map(u=>{const h=u.user||(u.userId?(s.data?.users||[]).find(D=>D.id===u.userId):null),T=h?t(h.name,h.nameEn||h.name):t("النظام","System"),k=h?Z(h):t("تلقائي","Automated"),E=ra(u.createdAt),{badgeClass:M,actionLabel:C,entityLabel:A,detailHtml:j}=vt(u);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${N(h)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${c(T)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${c(k)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${M}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${c(C)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${c(A)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${j}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${s.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${c(E.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${x("clock",11)}
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
    `}return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${a?t("تحكم مركزي","CENTRAL CONTROL"):t("الملف الشخصي","USER PROFILE")}</p>
        <h1>${a?f("settings"):t("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${a?t("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):t("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${x(a?"shield":"user",13)} ${c(Z(r))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${o.map(([d,l])=>`<button class="${s.settingsSection===d?"active":""}" data-action="settings-section" data-section="${d}">${l}</button>`).join("")}
      </aside>
      <div class="settings-content">${i}</div>
    </div>
  `}var gn=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function ki(e=null){const a=s.data?.permissionsCatalog&&s.data.permissionsCatalog.length>=10?s.data.permissionsCatalog:gn,n=new Map;a.forEach(p=>{const m=p.category||"general",g=t(p.categoryAr||m,p.categoryEn||m);n.has(m)||n.set(m,{name:g,items:[]}),n.get(m).items.push(p)});const o=e?.id==="admin"||e?.permissions&&e.permissions.includes("*"),r=Array.from(n.entries()).map(([p,m])=>{const g=m.items.map(y=>{const w=y.id||y.key,v=t(y.nameAr||y.ar,y.nameEn||y.en||w),b=o||e?.permissions&&(e.permissions.includes(w)||typeof PERMISSION_ALIASES<"u"&&PERMISSION_ALIASES[w]&&e.permissions.includes(PERMISSION_ALIASES[w])),u=o?"disabled":"";return`
        <label class="permission-option" style="cursor:${o?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${c(w)}" ${b?"checked":""} ${u} />
          <span style="font-weight:500;">${c(v)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${c(m.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${m.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${g}
        </div>
      </div>
    `}).join(""),i=o?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${f("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${a.length} ${t("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${t("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${t("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,d=`
    <form id="role-form" data-role-id="${c(e?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${f("nameAr")} *</label>
          <input name="nameAr" value="${c(e?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${f("nameEn")}</label>
          <input name="nameEn" value="${c(e?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${f("roleDescription")}</label>
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
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("check",14)} ${f(e?"save":"create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=re(e?t("تعديل الدور والصلاحيات","Edit role & permissions"):f("addRole"),t("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),d,"role","modal-lg");const l=document.getElementById("modal-root");if(l){const p=l.querySelector("#btn-perm-select-all"),m=l.querySelector("#btn-perm-deselect-all");p&&p.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(g=>g.checked=!0)}),m&&m.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(g=>g.checked=!1)})}}function Ei(e=null){if(e?.id==="usr_ahmad"&&s.data?.user?.id!=="usr_ahmad")return $(t("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!e&&!_())return $(f("adminOnly"),!0);const a=!_(),n=a?"disabled":"",o=(s.data?.roles||[]).filter(i=>_()||i.id!=="admin"),r=`<form id="user-form" data-user-id="${c(e?.id||"")}" data-permission-only="${a}"><div class="form-grid"><div class="field full"><label>${f("nameAr")}</label><input name="name" value="${c(e?.name||"")}" ${n} required /></div><div class="field"><label>${f("nameEn")}</label><input name="nameEn" value="${c(e?.nameEn||"")}" ${n} /></div><div class="field"><label>${f("jobTitle")}</label><input name="jobTitleAr" value="${c(e?.jobTitleAr||"")}" ${n} /></div><div class="field"><label>${f("email")}</label><input name="email" type="email" value="${c(e?.email||"")}" placeholder="name@darc.com" ${n} /></div><div class="field"><label>${f("role")}</label><select name="roleId">${o.map(i=>`<option value="${c(i.id)}" ${e?.roleId===i.id?"selected":""}>${c(t(i.nameAr,i.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${a?t("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):t("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button><button type="submit" class="btn btn-primary">${x("check",14)} ${e?a?t("حفظ الصلاحية","Save permission"):f("save"):f("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=re(e?a?t("تعديل صلاحية الحساب","Change account permission"):t("تعديل حساب العضو","Edit member account"):f("addMember"),t("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),r,"user")}var Si=ne({showNotifications:()=>Ai});function Ai(){const e=s.data?.notifications||[],a=`${e.filter(n=>!n.read&&!n.readAt).length>0?`
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 10px;">
        ${x("check",13)} ${t("تحديد الكل كمقروء","Mark all as read")}
      </button>
    </div>
  `:""}${e.length?`<div class="attention-list">${e.slice(0,20).map(n=>{const o=n.type==="overdue"||n.type==="escalation"?"red":n.type==="due_soon"||n.type==="document_review"?"amber":"blue",r=!!(n.readAt||n.read),i=n.type==="overdue"?t("مهمة متأخرة","Overdue Task"):n.type==="escalation"?t("تصعيد مهمة","Task Escalation"):n.type==="due_soon"?t("موعد تسليم قريب","Due Soon"):n.type==="document_review"?t("مراجعة مستند","Document Review"):n.type==="assignment"?t("إسناد مهمة جديدة","Task Assigned"):t("تنبيه مساحة العمل","Workspace Notification"),d=t(n.titleAr||n.titleEn||i,n.titleEn||n.titleAr||i),l=t(n.messageAr||n.bodyAr||n.content||"",n.messageEn||n.bodyEn||n.content||""),p=l&&l!==d?`${l} · `:"",m=n.type==="overdue"||n.type==="escalation"?"alert":n.type==="document_review"?"document":n.type==="assignment"?"user":"bell";return`<button class="attention-item" data-action="read-notification" data-notification-id="${c(n.id)}" style="border:0;text-align:inherit;width:100%;opacity:${r?".65":"1"}"><span class="attention-icon ${o}">${x(m,14)}</span><span class="attention-copy"><strong style="color:var(--${o})">${c(d)}</strong><span>${c(p)}${xt(n.createdAt)}</span></span></button>`}).join("")}</div>`:`<div class="empty">${x("bell",18)}<span>${f("noAttention")}</span></div>`}`;document.getElementById("modal-root").innerHTML=re(f("notifications"),t("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),a,"notifications")}var Ti=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),Mt=Ti?"⌘K":"Ctrl+K",ce=0,ee=[];function vn(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.body.style.overflow="hidden";const a=t(`ابحث في المشاريع، المهام، والأعضاء... (${Mt})`,`Search projects, tasks, team... (${Mt})`),n=`
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
          ${Aa("")}
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
  `;document.body.insertAdjacentHTML("beforeend",n);const o=document.getElementById("omnisearch-modal");o&&o.addEventListener("click",i=>{i.target===o&&je()});const r=document.getElementById("omnisearch-input");r&&(r.focus(),r.addEventListener("input",i=>{ce=0;const d=document.getElementById("omnisearch-results-container");d&&(d.innerHTML=Aa(i.target.value))}),r.addEventListener("keydown",ji))}function je(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.querySelector(".modal-backdrop")||(document.body.style.overflow="")}function ji(e){e.key==="ArrowDown"?(e.preventDefault(),ee.length>0&&(ce=(ce+1)%ee.length,Sa())):e.key==="ArrowUp"?(e.preventDefault(),ee.length>0&&(ce=(ce-1+ee.length)%ee.length,Sa())):e.key==="Enter"?(e.preventDefault(),ee[ce]&&yn(ee[ce])):e.key==="Escape"&&je()}function Sa(){document.querySelectorAll(".omni-item").forEach((e,a)=>{e.classList.toggle("selected",a===ce),a===ce&&e.scrollIntoView({block:"nearest"})})}function yn(e){if(je(),e.type==="action")if(e.id==="new-task"){const a=(s.data?.projects||[]).find(n=>n.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0];gt(null,null,e.targetProjectId||a?.id)}else e.id==="new-project"?ia():e.id==="cheatsheet"&&da();else if(e.type==="project")s.projectTab="tasks",s.lastActiveProjectId=e.id,le("project-detail",e.id);else if(e.type==="task"){const a=s.data?.tasks?.find(n=>n.id===e.id);a&&gt(a)}else if(e.type==="user"){const a=s.data?.users?.find(n=>n.id===e.id);a&&typeof window.openUserModal=="function"&&window.openUserModal(a)}}function Aa(e){const a=e.trim().toLowerCase(),n=[],o=(s.data?.projects||[]).find(l=>l.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0],r=o?t(o.nameAr,o.nameEn):"",i=[];if((S("create_tasks")||_())&&i.push({type:"action",id:"new-task",targetProjectId:o?.id,title:t("إضافة مهمة جديدة","Create new task"),sub:o?t(`في مشروع: ${r}`,`In project: ${r}`):t("إجراء سريع","Quick action"),icon:"plus",keywords:"new task مهمة إضافة عمل جديد"}),(S("create_projects")||_())&&i.push({type:"action",id:"new-project",title:t("إنشاء مشروع جديد","Create new project"),sub:t("إجراء سريع","Quick action"),icon:"building",keywords:"new project مشروع إنشاء جديد"}),i.push({type:"action",id:"cheatsheet",title:t("عرض دليل اختصارات لوحة المفاتيح","View keyboard shortcuts guide"),sub:t("مساعدة","Help"),icon:"sparkles",keywords:"shortcuts اختصارات كيبورد مساعدة"}),i.forEach(l=>{(!a||l.keywords.includes(a)||l.title.toLowerCase().includes(a))&&n.push(l)}),(S("view_projects")||_())&&(s.data?.projects||[]).forEach(l=>{(!a||`${l.nameAr} ${l.nameEn} ${l.code} ${l.clientAr} ${l.clientEn}`.toLowerCase().includes(a))&&n.push({type:"project",id:l.id,title:t(l.nameAr,l.nameEn),sub:`${l.code} · ${t(l.clientAr,l.clientEn)||""}`,badge:`${l.progress}%`,icon:"building"})}),q("tasks")&&(s.data?.tasks||[]).forEach(l=>{(!a||`${l.titleAr} ${l.titleEn} ${l.categoryAr} ${l.categoryEn}`.toLowerCase().includes(a))&&n.push({type:"task",id:l.id,title:t(l.titleAr,l.titleEn),sub:l.dueDate?`📅 ${xt(l.dueDate)}`:t(l.categoryAr,l.categoryEn)||"",badge:`${l.progress}%`,icon:"checklist"})}),(_()||S("manage_users"))&&(s.data?.users||[]).forEach(l=>{(!a||`${l.name} ${l.nameEn} ${l.email} ${l.jobTitleAr}`.toLowerCase().includes(a))&&n.push({type:"user",id:l.id,title:t(l.name,l.nameEn||l.name),sub:l.email||"",badge:Z(l),icon:"user"})}),ee=n.slice(0,15),!ee.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${x("search",24)}</span>
        <strong style="color:var(--ink);">${t("لا توجد نتائج مطابقة","No matching results")}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${t("جرب البحث بكلمات أخرى أو رمز المشروع.","Try different keywords or project code.")}</p>
      </div>
    `;let d="";return ee.map((l,p)=>{let m="";const g=l.type==="action"?t("إجراءات سريعة","Quick Actions"):l.type==="project"?t("المشاريع","Projects"):l.type==="task"?t("المهام والمخرجات","Tasks & Deliverables"):t("فريق العمل","Team");return g!==d&&(d=g,m=`<div class="omni-group-title">${g}</div>`),`
      ${m}
      <div class="omni-item ${p===ce?"selected":""}" data-omni-index="${p}" onclick="window.__selectOmniItem(${p})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${x(l.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${c(l.title)}</strong>
            ${l.sub?`<span style="font-size:11px;color:var(--muted);">${c(l.sub)}</span>`:""}
          </div>
        </div>
        ${l.badge?`<span class="omni-badge">${c(l.badge)}</span>`:""}
      </div>
    `}).join("")}window.__selectOmniItem=e=>{ee[e]&&yn(ee[e])};function da(){je();const e=`
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${t("استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:","Use these shortcuts to navigate the workspace at full speed without a mouse:")}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${t("البحث الشامل والأوامر السريعة","Omnisearch & Quick Commands")}</span>
          <kbd class="shortcut-kbd">${Mt}</kbd>
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
  `;document.getElementById("modal-root").innerHTML=re(t("دليل اختصارات لوحة المفاتيح","Keyboard Shortcuts Guide"),t("طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية","Work faster with productivity hotkeys"),e,"cheatsheet")}function Ii(){window.addEventListener("keydown",e=>{const a=document.activeElement,n=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.tagName==="SELECT"||a.isContentEditable),o=e.code==="KeyK"||e.key?.toLowerCase()==="k"||e.key==="ن";if((e.metaKey||e.ctrlKey)&&o){e.preventDefault(),document.getElementById("omnisearch-modal")?je():vn();return}if((e.key==="?"||e.key==="؟"||e.code==="Slash"&&e.shiftKey)&&!n){e.preventDefault(),da();return}if((e.code==="KeyN"||e.key?.toLowerCase()==="n"||e.key==="ى")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();const r=s.view==="project-detail"&&s.activeProjectId?s.activeProjectId:s.data?.projects?.[0]?.id;gt(null,null,r);return}if((e.code==="KeyP"||e.key?.toLowerCase()==="p"||e.key==="ح")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault(),ia();return}if(e.key==="Escape"&&document.getElementById("omnisearch-modal")){e.preventDefault(),je();return}})}var Di=ne({getOrCreateFloatingUploadWidget:()=>bn,handleChange:()=>Li,handleClick:()=>_i,handleInput:()=>Ci,handleSubmit:()=>Pi,init:()=>zi,updateFloatingUploadWidget:()=>Le,uploadDirectFiles:()=>hn,uploadTaskFiles:()=>la});async function Pi(e){const a=e.target;if(!["project-form","task-form","user-form","role-form","activation-form","task-comment-form","template-form","force-password-form"].includes(a.id)&&!a.dataset.action)return;e.preventDefault();const n=Object.fromEntries(new FormData(a).entries()),o=a.querySelector('button[type="submit"]');o&&(o.disabled=!0,o.classList.add("is-loading"));try{if(a.id==="activation-form"){if(n.password!==n.passwordConfirm)throw new Error(t("كلمتا المرور غير متطابقتين.","Passwords do not match."));if(delete n.passwordConfirm,await I("/api/auth/activate",{method:"POST",body:JSON.stringify(n)}),window.history.replaceState({},"",window.location.pathname),await be(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}return}if(a.id==="project-form"){n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.managerId||(n.managerId=null);let r=[];try{n.memberIds&&(r=JSON.parse(n.memberIds))}catch{}n.managerId&&!r.includes(n.managerId)&&r.push(n.managerId),n.memberIds=r;const i=!!a.dataset.projectId,d=await I(i?`/api/projects/${a.dataset.projectId}`:"/api/projects",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.project)if(s.data.projects||(s.data.projects=[]),i){const l=s.data.projects.findIndex(p=>p.id===d.project.id);l!==-1&&(s.data.projects[l]={...s.data.projects[l],...d.project})}else s.data.projects.unshift(d.project);J(),P(),$(t("تم حفظ المشروع.","Project saved."));return}if(a.id==="task-form"){const r=a.dataset.taskId;n.remindAt,delete n.remindAt,n.templateId=n.templateId||null,n.typeAr=n.typeAr||(n.templateId?"مخطط":null),n.typeEn=n.typeEn||(n.templateId?"Drawing":null),n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.assigneeId||(n.assigneeId=null),n.reviewerId||(n.reviewerId=null);let i=[];try{i=JSON.parse(n.additionalAssignees||"[]")}catch{i=[...a.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(y=>y.value)}let d=[];try{d=JSON.parse(n.externalAssignees||"[]")}catch{const y=String(n.externalAssignees||"").trim();d=y?y.split(/[,،]+/).map(w=>w.trim()).filter(Boolean):[]}let l=[];try{l=JSON.parse(n.remindersJson||"[]")}catch{l=[]}delete n.additionalAssignees,delete n.externalAssignees,delete n.remindersJson,delete n.dependencies,delete n.weight,delete n.progress,n.customFields={additional_assignees:i,external_assignees:d,reminders:l},n.projectId||(n.projectId=s.activeProjectId||s.data.projects?.[0]?.id);const p=!!r;if(p){const g=(s.data?.tasks||[]).find(y=>y.id===r);g?.updatedAt&&(n.expectedUpdatedAt=g.updatedAt)}let m;try{m=await I(p?`/api/tasks/${r}`:"/api/tasks",{method:p?"PATCH":"POST",body:JSON.stringify(n)})}catch(g){if(g.message&&g.message.includes("تعارض")){await K(!0),$(g.message,!0);return}throw g}if(m.task){if(s.data.tasks||(s.data.tasks=[]),p){const g=s.data.tasks.findIndex(y=>y.id===m.task.id);g!==-1&&(s.data.tasks[g]={...s.data.tasks[g],...m.task})}else s.data.tasks.unshift(m.task),s.view==="tasks"&&(s.taskProjectFilter!=="all"&&s.taskProjectFilter!==m.task.projectId&&(s.taskProjectFilter=m.task.projectId),s.taskFilter==="mine"&&m.task.assigneeId!==s.data.user?.id&&(s.taskFilter="all"));if(Array.isArray(l)&&l.length>0){for(const g of l)if(!g.id||g.id.startsWith("rem_temp_")){const y=g.remindAt?new Date(g.remindAt):null;if(!y||isNaN(y.getTime()))continue;I("/api/reminders",{method:"POST",body:JSON.stringify({taskId:m.task.id,remindAt:y.toISOString(),noteAr:g.noteAr||n.titleAr||"تذكير لمتابعة المهمة"})}).catch(w=>console.warn("[Reminder dispatch note]",w))}}}J(),P(),$(t("تم حفظ المهمة بنجاح.","Task saved successfully."));return}if(a.id==="task-comment-form"){const r=a.dataset.taskId,i=await I(`/api/tasks/${r}/comments`,{method:"POST",body:JSON.stringify(n)});a.reset(),i.comment&&(s.data.comments||(s.data.comments=[]),s.data.comments.push(i.comment));const d=s.data.tasks.find(p=>p.id===r),l=document.getElementById("task-comments-list");l&&(l.innerHTML=renderTaskComments(d),l.scrollTop=l.scrollHeight),o&&(o.disabled=!1);return}if(a.id==="force-password-form"){const r=a.dataset.userId,i=a.dataset.isPending==="true";await I(`/api/users/${r}/force-password`,{method:"POST",body:JSON.stringify(n)});const d=s.data.users.find(l=>l.id===r);d&&(d.status="active"),J(),P(),$(i?t("تم تفعيل الحساب بنجاح.","Account activated successfully."):t("تم تغيير كلمة المرور وطرد المستخدم بنجاح.","Password changed and user kicked successfully.")),o&&(o.disabled=!1);return}if(a.id==="user-form"){const r=a.dataset.userId,i=!!r,d=await I(i?`/api/users/${r}`:"/api/users",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.user)if(s.data.users||(s.data.users=[]),i){const l=s.data.users.findIndex(p=>p.id===d.user.id);l!==-1&&(s.data.users[l]={...s.data.users[l],...d.user})}else s.data.users.unshift(d.user);J(),P(),$(t("تم حفظ حساب العضو.","Member account saved."));return}if(a.id==="role-form"){const r=a.dataset.roleId,i=[...a.querySelectorAll('input[name="permissions"]:checked')].map(p=>p.value),d=!!r,l=await I(d?`/api/roles/${r}`:"/api/roles",{method:d?"PATCH":"POST",body:JSON.stringify({...n,permissions:i})});if(l.role)if(s.data.roles||(s.data.roles=[]),d){const p=s.data.roles.findIndex(m=>m.id===l.role.id);p!==-1&&(s.data.roles[p]={...s.data.roles[p],...l.role})}else s.data.roles.push(l.role);J(),P(),$(t("تم حفظ الدور بنجاح.","Role saved."));return}if(a.id==="template-form"){const r=a.dataset.templateId,i=!!r,d=await I(i?`/api/templates/${r}`:"/api/templates",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.template)if(s.data.templates||(s.data.templates=[]),i){const l=s.data.templates.findIndex(p=>p.id===d.template.id);l!==-1&&(s.data.templates[l]={...s.data.templates[l],...d.template})}else s.data.templates.push(d.template);J(),P(),$(t("تم حفظ القالب بنجاح.","Template saved."));return}if(a.dataset.action==="update-profile"){if(n.calendarSystem){s.calendarSystem=n.calendarSystem;try{localStorage.setItem("darc_calendar_system",n.calendarSystem)}catch{}}const r=await I("/api/users/me",{method:"PATCH",body:JSON.stringify(n)});if(r.user){s.data.user={...s.data.user,...r.user};const i=(s.data.users||[]).findIndex(d=>d.id===s.data.user.id);i!==-1&&(s.data.users[i]={...s.data.users[i],...r.user})}P(),$(t("تم حفظ وتحديث الملف الشخصي بنجاح.","Profile updated successfully.")),o&&(o.disabled=!1);return}if(a.dataset.action==="update-company"){const r=await I("/api/company",{method:"PATCH",body:JSON.stringify(n)});r.company&&(s.data.company={...s.data.company,...r.company}),P(),$(t("تم تحديث بيانات الشركة.","Company data updated.")),o&&(o.disabled=!1);return}if(a.dataset.action==="change-password"){if(n.newPassword.length<10)throw new Error(t("كلمة المرور يجب أن تكون 10 أحرف على الأقل.","Password must be at least 10 characters."));await I("/api/auth/change-password",{method:"POST",body:JSON.stringify(n)}),a.reset(),$(t("تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.","Password changed successfully. Signed out of other devices.")),o&&(o.disabled=!1);return}}catch(r){a.id==="activation-form"?nt(n.token,r.message):$(r.message,!0)}finally{o&&(o.disabled=!1,o.classList.remove("is-loading"))}}async function _i(e){const a=document.getElementById("mention-dropdown"),n=document.getElementById("project-menu");if(a&&!e.target.closest("#mention-dropdown")&&!e.target.closest('input[name="content"]')&&(a.style.display="none"),n&&!e.target.closest("#project-menu")&&!e.target.closest('[data-action="toggle-project-menu"]')&&(n.style.display="none"),e.target.classList.contains("modal-backdrop")){J();return}if(e.target.closest("#task-dropzone")&&e.target.id!=="task-upload-input"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}const o=e.target.closest("[data-action], [data-view]");if(!o)return;const r=o.dataset.action;if(o.classList.contains("menu-item")){const i=o.closest(".dropdown-menu");i&&(i.style.display="none")}if(o.dataset.view){le(o.dataset.view,o.dataset.projectId||void 0);return}if(r==="trigger-avatar-upload"){const i=document.getElementById("user-avatar-file-input");i&&i.click();return}if(r==="trigger-company-logo-upload"){const i=document.getElementById("company-logo-file-input");i&&i.click();return}if(r==="toggle-theme"){s.theme=s.theme==="dark"?"light":"dark",Ge({theme:s.theme}),document.documentElement.dataset.theme=s.theme,document.querySelectorAll('[data-action="toggle-theme"]').forEach(i=>{i.textContent=s.theme==="dark"?"☀️":"🌙"});return}if(r==="toggle-lang"){if(s.lang=s.lang==="ar"?"en":"ar",Ge({lang:s.lang}),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.body.classList.toggle("is-ltr",s.lang==="en"),s.data)ae();else{const i=new URLSearchParams(window.location.hash.replace(/^#/,""));i.get("activate")?nt(i.get("activate")):i.get("reset")?Ne(i.get("reset")):X("",document.getElementById("forgot-form")?"forgot":"login")}return}if(r==="quick-fill-login"){const i=o.closest('[data-action="quick-fill-login"]'),d=document.getElementById("login-email"),l=document.getElementById("login-password");if(d&&i?.dataset?.email&&(d.value=i.dataset.email),l&&i?.dataset?.pass&&(l.value=i.dataset.pass),i?.dataset?.autosubmit==="true"){const p=document.getElementById("login-form");if(p){const m=()=>typeof window<"u"&&window.turnstile&&window._turnstileWidgetId!==void 0?window.turnstile.getResponse(window._turnstileWidgetId):null,g=()=>{typeof p.requestSubmit=="function"?p.requestSubmit():p.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))};if(!m()&&typeof window<"u"&&window.turnstile){i.disabled=!0;const y=i.innerHTML;i.innerHTML=`<span>⏳ ${t("جاري التحقق من أمان المتصفح...","Verifying browser security...")}</span>`;let w=0;const v=setInterval(()=>{w++,(m()||w>20)&&(clearInterval(v),i.disabled=!1,i.innerHTML=y,g())},100);return}g()}}return}if(r==="goto-forgot"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#forgot"),X("","forgot");return}if(r==="goto-login"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#login"),X();return}if(r==="reset-demo-sandbox"){try{$(t("جاري إعادة ضبط بيانات العرض التجريبي...","Resetting demo sandbox..."),!1);const i=await I("/api/demo/reset",{method:"POST"});i&&i.data&&(s.data=i.data,de(i.data),ae(),$(t("تمت إعادة ضبط البيانات بنجاح ✨","Demo data reset successfully ✨"),!1))}catch(i){$(i.message,!0)}return}if(r==="toggle-sidebar"){s.sidebarOpen=!s.sidebarOpen,document.querySelector(".sidebar")?.classList.toggle("open",s.sidebarOpen);return}if(r==="logout"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout"),await I("/api/auth/logout",{method:"POST"}).catch(()=>{});try{await $a()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_queue")}catch{}}ft(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),X();return}if(r==="logout-all"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout_all"),await I("/api/auth/logout-all",{method:"POST"}).catch(()=>{});try{await $a()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_queue")}catch{}}ft(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),X();return}if(r==="open-omnisearch"){vn();return}if(r==="close-omnisearch"){je();return}if(r==="open-cheatsheet"){da();return}if(r==="close-modal"){J();return}if(r==="show-notifications"){showNotifications();return}if(r==="read-notification"){const i=o.dataset.notificationId,d=(s.data?.notifications||[]).find(l=>l.id===i);try{if(await I(`/api/notifications/${i}`,{method:"PATCH",body:JSON.stringify({})}),d&&(d.read=!0),J(),d?.taskId){const l=(s.data?.tasks||[]).find(p=>p.id===d.taskId);if(l){openTaskModal(l);return}}if(d?.projectId){le("project-detail",d.projectId);return}await K()}catch(l){$(l.message,!0)}return}if(r==="mark-all-notifications-read"){try{await I("/api/notifications/read-all",{method:"POST"}),(s.data?.notifications||[]).forEach(i=>{i.read=!0,i.readAt=new Date().toISOString()}),showNotifications(),ae(),$(t("تم تحديد كافة التنبيهات كمقروءة.","All notifications marked as read."))}catch(i){$(i.message,!0)}return}if(r==="toggle-project-menu"){n&&(n.style.display=n.style.display==="none"?"block":"none");return}if(r==="preview-doc"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId;i&&Qa(i);return}if(r==="copy-doc-link"){const i=o.dataset.docId||o.closest("[data-doc-id]")?.dataset.docId,d=s.data?.documents?.find(l=>l.id===i);if(d){let l=d.viewLink||d.downloadLink||(d.driveFileId?`https://drive.google.com/file/d/${d.driveFileId}/view`:"");if((!l||l.startsWith("file://")||l.startsWith("/"))&&(l=`${window.location.origin}/api/documents/${d.id}`),l)try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(l);else{const p=document.createElement("textarea");p.value=l,document.body.appendChild(p),p.select(),document.execCommand("copy"),p.remove()}$(t("تم نسخ رابط الملف إلى الحافظة بنجاح.","Document link copied to clipboard."))}catch{window.prompt(t("انسخ رابط الملف من هنا:","Copy document link:"),l)}else $(t("لا يوجد رابط متاح لهذا الملف.","No link available for this document."),!0)}return}if(r==="trigger-upload"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}if(r==="open-upload-drawing-modal"){typeof openUploadDrawingModal=="function"?openUploadDrawingModal(o.dataset.projectId||null):typeof window.openUploadDrawingModal=="function"&&window.openUploadDrawingModal(o.dataset.projectId||null);return}if(r==="new-project"){openProjectModal();return}if(r==="edit-project"){const i=s.data.projects.find(d=>d.id===o.dataset.projectId);i&&openProjectModal(i);return}if(r==="clone-project"){const i=s.data.projects.find(d=>d.id===o.dataset.projectId);i&&openCloneModal(i);return}if(r==="rename-doc"){const i=o.dataset.docId,d=s.data?.documents?.find(p=>p.id===i);if(!d)return;const l=window.prompt(t("أدخل الاسم الجديد:","Enter new name:"),d.originalName);if(!l||l===d.originalName)return;try{await I(`/api/documents/${i}`,{method:"PATCH",body:JSON.stringify({originalName:l})}),d.originalName=l,await K(!0);const p=s.data?.tasks?.find(m=>m.id===d.taskId);if(p){const m=document.getElementById("task-documents-list");m&&(m.innerHTML=Te(p))}}catch(p){$(p.message,!0)}return}if(r==="go-to-trash"){s.settingsSection="trash",s.trashLoaded=!1,le("settings");return}if(r==="delete-doc"){if(!window.confirm(t("هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.","Are you sure you want to move this document to trash? You can restore it within 30 days.")))return;const i=o.dataset.docId,d=s.data?.documents?.find(l=>l.id===i)?.taskId;try{if(await I(`/api/documents/${i}`,{method:"DELETE"}),s.data?.documents&&(s.data.documents=s.data.documents.filter(l=>l.id!==i)),s.trashLoaded=!1,await K(!0),$(t("تم نقل المستند إلى سلة المهملات بنجاح.","Document moved to trash successfully.")),d){const l=s.data?.tasks?.find(p=>p.id===d);if(l){const p=document.getElementById("task-documents-list");p&&(p.innerHTML=Te(l))}}}catch(l){$(l.message,!0)}return}if(r==="delete-project"){if(!window.confirm(t("هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.","Are you sure you want to delete this project? It will be archived.")))return;const i=[...s.data.projects||[]];s.data.projects=s.data.projects.filter(d=>d.id!==o.dataset.projectId),J(),le("projects"),$(t("جاري حذف المشروع...","Deleting project..."));try{await I(`/api/projects/${o.dataset.projectId}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await K(!0),$(t("تم حذف المشروع بنجاح.","Project deleted successfully."))}catch(d){s.data.projects=i,P(),$(d.message,!0)}return}if(r==="delete-task"){if(!window.confirm(t("هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.","Are you sure you want to delete this task? It will be moved to trash.")))return;const i=o.dataset.taskId,d=[...s.data.tasks||[]];s.data.tasks=s.data.tasks.filter(l=>l.id!==i),J(),P(),$(t("جاري حذف المهمة...","Deleting task..."));try{await I(`/api/tasks/${i}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await K(!0),$(t("تم حذف المهمة بنجاح.","Task deleted successfully."))}catch(l){s.data.tasks=d,P(),$(l.message,!0)}return}if(r==="edit-task-comment"){const i=o.dataset.commentId,d=o.dataset.taskId,l=(s.data.comments||[]).find(g=>g.id===i);if(!l)return;const p=window.prompt(t("تعديل التعليق:","Edit comment:"),l.content);if(p===null)return;const m=p.trim();if(!m){$(t("لا يمكن ترك التعليق فارغاً.","Comment cannot be empty."),!0);return}if(m===l.content)return;try{const g=await I(`/api/tasks/${d}/comments/${i}`,{method:"PATCH",body:JSON.stringify({content:m})});if(g.comment){const y=(s.data.comments||[]).findIndex(b=>b.id===i);y!==-1&&(s.data.comments[y]=g.comment);const w=(s.data.tasks||[]).find(b=>b.id===d),v=document.getElementById("task-comments-list");v&&w&&(v.innerHTML=renderTaskComments(w)),$(t("تم تعديل التعليق بنجاح.","Comment updated successfully."))}}catch(g){$(g.message,!0)}return}if(r==="delete-task-comment"){const i=o.dataset.commentId,d=o.dataset.taskId;if(!window.confirm(t("هل أنت متأكد من حذف هذا التعليق؟","Are you sure you want to delete this comment?")))return;try{await I(`/api/tasks/${d}/comments/${i}`,{method:"DELETE"}),s.data.comments&&(s.data.comments=s.data.comments.filter(m=>m.id!==i));const l=(s.data.tasks||[]).find(m=>m.id===d),p=document.getElementById("task-comments-list");p&&l&&(p.innerHTML=renderTaskComments(l)),$(t("تم حذف التعليق بنجاح.","Comment deleted successfully."))}catch(l){$(l.message,!0)}return}if(r==="manual-sync"){if(typeof navigator<"u"&&!navigator.onLine){$(t("أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡","You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡"),!1);return}const i=tt();if(!i.length){$(t("جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️","All data is completely synchronized with cloud server ✔️"),!1);return}$(t(`جاري مزامنة ${i.length} عمليات معلقة مع السيرفر...`,`Syncing ${i.length} pending actions with server...`),!1);const d=await Ht(I);if(d.synced>0){if($(t(`تمت مزامنة ${d.synced} عمليات بنجاح! 🚀`,`Successfully synced ${d.synced} actions! 🚀`),!1),await be(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}}else d.failed>0&&$(t(`فشلت مزامنة ${d.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${d.failed} actions, please try again.`),!0);return}if(r==="new-task"){openTaskModal(null,null,o.dataset.projectId);return}if(r==="new-user"){openUserModal();return}if(r==="new-role"){openRoleModal();return}if(r==="new-template"){openTemplateModal();return}if(r==="edit-template"){const i=s.data.templates.find(d=>d.id===o.dataset.templateId);i&&openTemplateModal(i);return}if(r==="delete-template"){if(!window.confirm(t("هل أنت متأكد من حذف هذا القالب؟","Are you sure you want to delete this template?")))return;const i=[...s.data.templates||[]];s.data.templates=s.data.templates.filter(d=>d.id!==o.dataset.templateId),P(),J();try{await I(`/api/templates/${o.dataset.templateId}`,{method:"DELETE"}),await K(!0),$(t("تم حذف القالب.","Template deleted."))}catch(d){s.data.templates=i,P(),$(d.message,!0)}return}if(r==="open-project"){s.projectTab="tasks",s.projectMemberFilter=null,le("project-detail",o.dataset.projectId);return}if(r==="filter-by-member"){const i=o.dataset.memberId;s.projectMemberFilter=s.projectMemberFilter===i?null:i,s.projectTab="tasks",requestAnimationFrame(()=>P());return}if(r==="clear-member-filter"){s.projectMemberFilter=null,requestAnimationFrame(()=>P());return}if(r==="back-to-projects"){s.projectMemberFilter=null,le("projects",null);return}if(r==="project-tab"){s.projectTab=o.dataset.tab;try{if(typeof window<"u"&&s.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(s.activeProjectId)}&tab=${encodeURIComponent(s.projectTab)}`),typeof sessionStorage<"u"){const d=sessionStorage.getItem("darc_last_route"),l=d?JSON.parse(d):{};l.view="project-detail",l.activeProjectId=s.activeProjectId,l.projectTab=s.projectTab,sessionStorage.setItem("darc_last_route",JSON.stringify(l))}}catch{}o.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(d=>d.classList.toggle("active",d===o));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>P());return}if(r==="toggle-timeline-view"){s.timelineView=o.dataset.viewMode||"gantt",requestAnimationFrame(()=>P());return}if(r==="prev-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()-1),s.calendarDate=i,requestAnimationFrame(()=>P());return}if(r==="next-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()+1),s.calendarDate=i,requestAnimationFrame(()=>P());return}if(r==="today-calendar-month"){s.calendarDate=new Date,requestAnimationFrame(()=>P());return}if(r==="open-task"){if(window._justDroppedAt&&Date.now()-window._justDroppedAt<250)return;const i=s.data.tasks.find(d=>d.id===o.dataset.taskId);i&&openTaskModal(i);return}if(r==="task-filter"){s.taskFilter=o.dataset.filter,o.closest(".view-toolbar-start")?.querySelectorAll(".filter-tab").forEach(i=>i.classList.toggle("active",i===o)),requestAnimationFrame(()=>P());return}if(r==="template-category"){s.templateCategory=o.dataset.category,requestAnimationFrame(()=>P());return}if(r==="use-template"){if(!s.data.projects.length)return $(f("noProjects"),!0);openTaskModal(null,o.dataset.templateId,s.activeProjectId);return}if(r==="open-user"){const i=s.data.users.find(d=>d.id===o.dataset.userId);i&&openUserModal(i);return}if(r==="impersonate-user"){if(!window.confirm("هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً."))return;try{const i=await I(`/api/users/${o.dataset.userId}/impersonate`,{method:"POST"});i&&i.token&&typeof localStorage<"u"&&localStorage.setItem("darc_token",i.token),window.location.reload()}catch(i){$(i.message,!0)}return}if(r==="force-password-user"){const i=s.data.users.find(d=>d.id===o.dataset.userId);i&&openForcePasswordModal(i);return}if(r==="invite-user"){try{const i=await I(`/api/users/${o.dataset.userId}/invite`,{method:"POST"});await K(),$(i.emailConfigured?t("تم إرسال الدعوة.","Invitation sent."):t("تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.","Invite prepared, but the email provider is not configured."))}catch(i){$(i.message,!0)}return}if(r==="deactivate-user"){if(!window.confirm(f("confirmDeactivate")))return;const i=o.dataset.userId,d=s.data.users.find(p=>p.id===i),l=d?d.status:null;d&&(d.status="inactive"),P(),J();try{await I(`/api/users/${i}`,{method:"DELETE"}),await K(!0),$(t("تم تعطيل الحساب.","Account deactivated."))}catch(p){d&&(d.status=l),P(),$(p.message,!0)}return}if(r==="settings-section"){s.settingsSection=o.dataset.section||"profile";try{if(typeof window<"u"&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route"),d=i?JSON.parse(i):{};d.view="settings",d.settingsSection=s.settingsSection,sessionStorage.setItem("darc_last_route",JSON.stringify(d))}}catch{}o.closest(".settings-nav")?.querySelectorAll(".settings-nav-item").forEach(i=>i.classList.toggle("active",i===o)),s.settingsSection==="trash"&&!s.trashLoaded&&I("/api/trash").then(i=>{s.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(d=>({...d,type:"project"})),...(i.tasks||[]).map(d=>({...d,type:"task"})),...(i.documents||[]).map(d=>({...d,type:"document"}))],s.trashLoaded=!0,P()}).catch(i=>console.error(i)),requestAnimationFrame(()=>P());return}if(r==="restore-item"){try{await I(`/api/restore/${o.dataset.type}/${o.dataset.id}`,{method:"POST"});const i=await I("/api/trash");s.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(d=>({...d,type:"project"})),...(i.tasks||[]).map(d=>({...d,type:"task"})),...(i.documents||[]).map(d=>({...d,type:"document"}))],await K(),$(t("تمت الاستعادة بنجاح.","Restored successfully."))}catch(i){$(i.message,!0)}return}if(r==="filter-trash"){s.trashFilter=o.dataset.filter,requestAnimationFrame(()=>P());return}if(r==="purge-trash-item"){const i=o.dataset.type,d=o.dataset.id;if(!window.confirm(t("هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.","Are you sure you want to permanently delete this item? This action cannot be undone.")))return;try{await I(`/api/trash/${i}/${d}`,{method:"DELETE"});const l=await I("/api/trash");s.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(p=>({...p,type:"project"})),...(l.tasks||[]).map(p=>({...p,type:"task"})),...(l.documents||[]).map(p=>({...p,type:"document"}))],P(),$(t("تم حذف العنصر نهائياً بنجاح.","Item permanently deleted."))}catch(l){$(l.message,!0)}return}if(r==="empty-trash"){if(!window.confirm(t("هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.","Are you sure you want to empty the entire recycle bin? All items will be permanently erased.")))return;try{await I("/api/trash/empty",{method:"DELETE"}),s.trash=[],P(),$(t("تم إفراغ سلة المهملات بالكامل بنجاح.","Trash bin emptied successfully."))}catch(i){$(i.message,!0)}return}if(r==="open-role"){const i=s.data.roles.find(d=>d.id===o.dataset.roleId);i&&openRoleModal(i);return}if(r==="delete-role"){if(!window.confirm(f("confirmDeleteRole")))return;const i=o.dataset.roleId,d=[...s.data.roles||[]];s.data.roles=s.data.roles.filter(l=>l.id!==i),P(),J();try{await I(`/api/roles/${i}`,{method:"DELETE"}),await K(!0),$(t("تم حذف الدور.","Role deleted."))}catch(l){s.data.roles=d,P(),$(l.message,!0)}return}if(r==="export-csv"){if(!S("export_reports")&&!_()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}dn();return}if(r==="print-portfolio-pdf"){if(!S("export_reports")&&!_()){$(t("ليس لديك صلاحية لطباعة التقارير.","You do not have permission to print reports."),!0);return}cn();return}if(r==="export-project"){if(!S("export_reports")&&!_()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}ln(o.dataset.projectId);return}if(r==="export-project-pdf"){if(!S("export_reports")&&!_()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Lt(o.dataset.projectId,!1);return}if(r==="export-project-client-pdf"){if(!S("export_reports")&&!_()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Lt(o.dataset.projectId,!0);return}if(r==="export-audit-xls"){if(!S("view_audit_logs")&&!_()){$(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}un();return}if(r==="print-audit-pdf"){if(!S("view_audit_logs")&&!_()){$(t("ليس لديك صلاحية لطباعة سجل الرقابة.","You do not have permission to print audit logs."),!0);return}mn();return}if(r==="load-full-audit"){fn();return}if(r==="reset-audit-filters"){s.auditFilterAction="all",s.auditFilterEntity="all",s.auditFilterUser="all",s.auditSearchQuery="",P();return}}var Pe=null;function Ci(e){if(e.target.name==="content"&&e.target.closest("#task-comment-form")){const o=e.target.value,r=o.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),i=document.getElementById("mention-dropdown");if(r){const d=r[1].toLowerCase(),l=(s.data?.users||[]).filter(p=>p.status!=="inactive").filter(p=>`${p.name||""} ${p.nameEn||""} ${p.email||""}`.toLowerCase().includes(d));l.length?(i.innerHTML=l.map(p=>{const m=(p.name||p.nameEn||p.email||"user").trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${c(m)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${N(p,"avatar-sm")}
              <span style="font-size:12px;">${c(t(p.name,p.nameEn||p.name))}</span>
            </div>
          `}).join(""),i.style.display="block",i.querySelectorAll(".mention-option").forEach(p=>{p.onclick=()=>{const m=p.dataset.username;e.target.value=o.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${m} `),i.style.display="none",e.target.focus()}})):i.style.display="none"}else i.style.display="none"}if(e.target.dataset.action==="search-trash-input"){s.trashQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(Pe),Pe=setTimeout(()=>{P();const r=document.querySelector('[data-action="search-trash-input"]');r&&(r.focus(),r.setSelectionRange(o,o))},120);return}if(e.target.dataset.action==="search-audit-input"){s.auditSearchQuery=e.target.value;const o=e.target.selectionStart;clearTimeout(Pe),Pe=setTimeout(()=>{P();const r=document.querySelector('[data-action="search-audit-input"]');r&&(r.focus(),r.setSelectionRange(o,o))},120);return}const a=e.target.dataset.search||(e.target.dataset.action==="search-documents"?"documents":null);if(!a)return;s.searches[a]=e.target.value;const n=e.target.selectionStart;clearTimeout(Pe),Pe=setTimeout(()=>{P();const o=document.querySelector(`[data-search="${a}"], [data-action="search-documents"]`);o&&(o.focus(),o.setSelectionRange(n,n))},120)}async function Li(e){if(e.target.dataset.action==="change-doc-status"){const a=e.target.dataset.docId,n=e.target.value,o=s.data?.documents?.find(r=>r.id===a);if(!o)return;try{await I(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}),o.status=n,$(t("تم تحديث حالة المخطط بنجاح ✅","Drawing status updated ✅")),await K(!0)}catch(r){$(r.message,!0)}return}if(e.target.dataset.action==="doc-project-filter"){s.docProjectFilter=e.target.value,P();return}if(e.target.dataset.action==="filter-project-docs-task"){s.docTaskFilter=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-action"){s.auditFilterAction=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-entity"){s.auditFilterEntity=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-user"){s.auditFilterUser=e.target.value,P();return}if(e.target.dataset.action==="sort-project-tasks"||e.target.dataset.action==="sort-my-tasks"){Va(e.target.value),P();return}if(e.target.name==="templateId"&&e.target.form?.id==="task-form"){const a=e.target.form,n=e.target.value,o=s.data.templates?.find(m=>m.id===n),r=a.querySelector('input[name="titleAr"]'),i=a.querySelector('input[name="titleEn"]'),d=a.querySelector("#task-type-ar"),l=a.querySelector("#task-type-en"),p=a.querySelector('textarea[name="descriptionAr"]');o?(r&&(!r.value||a.dataset.templateSelected==="true")&&(r.value=o.nameAr),i&&(!i.value||a.dataset.templateSelected==="true")&&(i.value=o.nameEn||""),d&&(d.value=o.typeAr||"مخطط"),l&&(l.value=o.typeEn||"Drawing"),p&&(!p.value||a.dataset.templateSelected==="true")&&(p.value=o.descriptionAr||""),a.dataset.templateSelected="true"):(d&&(d.value=""),l&&(l.value=""),delete a.dataset.templateSelected);return}if(e.target.name==="status"&&e.target.form?.id==="task-form"){const a=e.target.form.querySelector("#task-auto-progress-badge");if(a){const n={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];a.textContent=n!==void 0?`(${n}%)`:""}return}if(e.target.dataset.action==="task-project-filter"){s.taskProjectFilter=e.target.value,P();return}if(e.target.dataset.action==="task-priority-filter"){s.taskPriorityFilter=e.target.value,P();return}if(e.target.id==="sort-projects"||e.target.dataset?.action==="sort-projects"){s.projectSort=e.target.value,P();return}if(e.target.id==="task-upload-input"){const a=e.target.files;if(!a.length)return;const n=e.target.dataset.taskId;la(a,n);return}if(e.target.classList.contains("doc-status-select")){const a=e.target.dataset.docId,n=e.target.value;I(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}).then(()=>{K(!0).then(()=>$(t("تم تحديث حالة المخطط.","Document status updated.")))}).catch(o=>$(o.message,!0));return}if(e.target.id==="user-avatar-file-input"){const a=e.target.files?.[0];if(!a)return;if(a.size>2621440){$(t("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.","Image is too large. Maximum allowed size is 2MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){$(t("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).","Please select a valid image file (JPG, PNG, WebP)."),!0),e.target.value="";return}try{$(t("جاري معالجة ورفع صورتك الشخصية...","Processing & uploading avatar..."));const n=await Ta(a,256,256),o=await I("/api/users/me",{method:"PATCH",body:JSON.stringify({avatarUrl:n})});if(o.user){s.data.user={...s.data.user,...o.user};const r=(s.data.users||[]).findIndex(i=>i.id===s.data.user.id);r!==-1&&(s.data.users[r]={...s.data.users[r],...o.user})}e.target.value="",ae(),mt(),$(t("تم تحديث صورتك الشخصية وتثبيتها بنجاح!","Avatar updated successfully!"))}catch(n){e.target.value="",$(n.message,!0)}return}if(e.target.id==="company-logo-file-input"){const a=e.target.files?.[0];if(!a)return;if(a.size>3145728){$(t("حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.","Logo is too large. Maximum allowed size is 3MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){$(t("يرجى اختيار ملف صورة أو شعار صالح.","Please select a valid logo image file."),!0),e.target.value="";return}try{$(t("جاري معالجة ورفع شعار الشركة...","Uploading company logo..."));const n=await Ta(a,400,400),o=await I("/api/company",{method:"PATCH",body:JSON.stringify({logoUrl:n})});o.company&&(s.data.company={...s.data.company,...o.company}),e.target.value="",ae(),mt(),$(t("تم تحديث وتثبيت شعار مساحة العمل بنجاح!","Company logo updated successfully!"))}catch(n){e.target.value="",$(n.message,!0)}return}}function Ta(e,a=300,n=300){return new Promise((o,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(t("فشل قراءة ملف الصورة.","Failed to read image file."))),i.onload=()=>{const d=new Image;d.onerror=()=>r(new Error(t("صيغة الصورة تالفة أو غير صالحة.","Corrupted or invalid image format."))),d.onload=()=>{try{const l=d.naturalWidth||d.width,p=d.naturalHeight||d.height;if(l>4096||p>4096||l*p>16e6){r(new Error(t("أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.","Image dimensions too large (Pixel Flood Blocked). Please select a standard image.")));return}let m=l,g=p;if(m>a||g>n){const u=Math.min(a/m,n/g);m=Math.round(m*u),g=Math.round(g*u)}const y=document.createElement("canvas");y.width=m,y.height=g;const w=y.getContext("2d");w.imageSmoothingEnabled=!0,w.imageSmoothingQuality="high",w.drawImage(d,0,0,m,g);let v="image/webp",b=y.toDataURL(v,.82);b.startsWith("data:image/webp")||(v="image/jpeg",b=y.toDataURL(v,.82)),b.length>184320&&(b=y.toDataURL(v,.65)),o(b)}catch{r(new Error(t("تعذر معالجة وضغط الصورة.","Failed to process and compress image.")))}},d.src=i.result},i.readAsDataURL(e)})}function zt({url:e,chunk:a,contentRange:n,headers:o={},onProgress:r}){return new Promise((i,d)=>{const l=new XMLHttpRequest;if(l.open("PUT",e,!0),e.includes("/api/")){l.withCredentials=!0;const p=typeof localStorage<"u"?localStorage.getItem("darc_token"):null;p&&!o.Authorization&&l.setRequestHeader("Authorization",`Bearer ${p}`)}for(const[p,m]of Object.entries(o))l.setRequestHeader(p,m);n&&l.setRequestHeader("Content-Range",n),l.upload&&r&&(l.upload.onprogress=p=>{p.lengthComputable&&r(p.loaded)}),l.onload=()=>{i({status:l.status,ok:l.status>=200&&l.status<300,headers:{get:p=>l.getResponseHeader(p)},responseText:l.responseText,json:()=>{try{return JSON.parse(l.responseText)}catch{return{}}}})},l.onerror=()=>d(new Error("Network connection error")),l.ontimeout=()=>d(new Error("Upload chunk timeout")),l.timeout=18e4,l.send(a)})}async function Mi(e,a){try{const n=await zt({url:e,chunk:new Blob([]),contentRange:`bytes */${a}`});if(n.status===308){const o=n.headers.get("Range");if(o){const r=o.match(/bytes=0-(\d+)/);if(r&&r[1])return parseInt(r[1],10)+1}return 0}if(n.ok)return{completed:!0,data:n.json()}}catch{}return null}var lt=null;function bn({projectName:e,taskName:a,totalFiles:n}){lt&&(clearTimeout(lt),lt=null);let o=document.getElementById("floating-upload-manager");if(o){o.style.opacity="1",o.style.transform="none";const r=o.querySelector("#fum-proj-text"),i=o.querySelector("#fum-task-text");r&&e&&(r.textContent=e),i&&a&&(i.textContent=a)}else{o=document.createElement("div"),o.id="floating-upload-manager",o.setAttribute("dir",s.lang==="ar"?"rtl":"ltr"),o.style.cssText=`
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
    `,document.body.appendChild(o);const r=o.querySelector("#fum-minimize-btn"),i=o.querySelector("#fum-body");r.addEventListener("click",()=>{const d=i.style.display==="none";i.style.display=d?"flex":"none",r.textContent=d?"—":"+"}),o.querySelector("#fum-close-btn").addEventListener("click",()=>{o.remove()})}return o}function Le({fileName:e,fileIndex:a,totalFiles:n,pct:o,loadedMB:r,fileSizeMB:i,speedMBs:d,etaText:l,statusNote:p,isError:m,isDone:g}){const y=document.getElementById("floating-upload-manager");if(!y)return;const w=y.querySelector("#fum-file-text"),v=y.querySelector("#fum-count-text"),b=y.querySelector("#fum-progress-fill"),u=y.querySelector("#fum-pct-text"),h=y.querySelector("#fum-speed-text"),T=y.querySelector("#fum-eta-text"),k=y.querySelector("#fum-status-badge"),E=y.querySelector("#fum-indicator"),M=y.querySelector("#fum-header-title"),C=y.querySelector("#fum-close-btn");e&&w&&(w.textContent=e),v&&a&&n&&(v.textContent=`(${a}/${n})`),b&&typeof o=="number"&&(b.style.width=`${o}%`),u&&typeof o=="number"&&(u.textContent=`${o}%`),h&&r!==void 0&&i!==void 0&&(h.textContent=`${r} / ${i} MB • ${d||"0.0"} MB/s`),T&&l&&(T.textContent=`${t("متبقي:","ETA:")} ${l}`),p&&k?(k.style.display="block",k.textContent=p,k.style.background=m?"var(--red-soft)":"var(--amber-soft)",k.style.color=m?"var(--red)":"var(--amber)",k.style.border=m?"1px solid var(--red)":"1px solid var(--amber)"):!m&&!g&&k&&(k.style.display="none"),g&&(E&&(E.style.background="var(--mint-strong)",E.style.boxShadow="0 0 10px var(--mint-strong)"),M&&(M.textContent=t("اكتمل الرفع بنجاح! ✓","Upload Complete! ✓")),u&&(u.textContent="100%"),b&&(b.style.width="100%"),C&&(C.style.display="inline-block"),k&&(k.style.display="block",k.style.background="var(--mint)",k.style.color="var(--teal-dark)",k.style.border="1px solid var(--mint-strong)",k.textContent=t("تم التوثيق والرفع إلى الخادم بنجاح.","Document saved & uploaded to server.")),lt=setTimeout(()=>{y&&y.parentNode&&(y.style.opacity="0",y.style.transform="translateY(12px)",setTimeout(()=>y.remove(),300))},4500)),m&&(E&&(E.style.background="var(--red)",E.style.boxShadow="0 0 10px var(--red)"),M&&(M.textContent=t("فشل في الرفع ✕","Upload Failed ✕")),C&&(C.style.display="inline-block"))}async function la(e,a){if(!e||!e.length||!a)return;const n=s.data?.tasks?.find(o=>o.id===a);return hn({files:e,taskId:a,projectId:n?.projectId,status:"draft",isTaskModal:!0})}async function hn({files:e,projectId:a=null,taskId:n=null,discipline:o="عام",status:r="draft",isTaskModal:i=!1}){if(!e||!e.length)return;if(typeof navigator<"u"&&!navigator.onLine){$(t("لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.","Cannot upload drawings or files while offline. Please connect to the internet first."),!0);return}const d=n?s.data?.tasks?.find(k=>k.id===n):null,l=a||d?.projectId,p=l?s.data?.projects?.find(k=>k.id===l):null,m=s.data?.documents?s.data.documents.filter(k=>!k.deletedAt&&(n?k.taskId===n:k.projectId===l)):[],g=p?p.nameAr:"Project",y=d?d.titleAr:o||"General",w={},v=k=>{if(w[k])return w[k];let E=0;return m.forEach(M=>{if(M.originalName&&M.originalName.toLowerCase().endsWith(k)){const C=M.originalName.match(/_v(\d+)\./);C&&parseInt(C[1])>E&&(E=parseInt(C[1]))}}),w[k]=E+1,E+1},b=document.getElementById("upload-progress-container");document.getElementById("upload-progress-bar"),document.getElementById("upload-progress-percent"),document.getElementById("upload-progress-text");const u=document.getElementById("task-dropzone");i&&b&&(b.style.display="block"),i&&u&&(u.style.pointerEvents="none"),bn({projectName:g,taskName:y,totalFiles:e.length});let h=null;const T=k=>(k.preventDefault(),k.returnValue=t("جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.","Uploading large engineering files. Leaving will abort upload."),k.returnValue);if(typeof window<"u"&&(window.addEventListener("beforeunload",T),"wakeLock"in navigator))try{navigator.wakeLock.request("screen").then(k=>{h=k}).catch(()=>{})}catch{}try{for(let k=0;k<e.length;k++){const E=e[k];if(!E.size||E.size===0){$(t(`الملف "${E.name}" فارغ لا يحتوي على بيانات.`,`File "${E.name}" is empty.`),!0);continue}if(E.size>107374182400){$(t(`حجم الملف "${E.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${E.name}" exceeds 100GB limit.`),!0);continue}const M=E.name.split(".").pop()?.toLowerCase()||"";if(["exe","bat","cmd","sh","bash","ps1","vbs","js","mjs","cjs","py","php","phtml","html","htm","jar","msi","dll","com","scr","hta","svg","apk"].includes(M)||E.type==="image/svg+xml"){$(t(`صيغة الملف "${E.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${E.name}" is not permitted for security reasons.`),!0);continue}const C=E.name.lastIndexOf("."),A=C!==-1?E.name.substring(C).toLowerCase():"",j=C!==-1?E.name.substring(0,C):E.name,D=xe=>(xe||"").replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,"-").replace(/\s+/g,"_").trim(),L=`${D(g)||"Project"}_${D(y)||"General"}_${D(j)||"Drawing"}_v${v(A)}${A}`,z=E.size>=1073741824?`${(E.size/1073741824).toFixed(2)} GB`:`${(E.size/1048576).toFixed(1)} MB`;Le({fileName:E.name,fileIndex:k+1,totalFiles:e.length,pct:0,loadedMB:"0.0",fileSizeMB:z,speedMBs:"0.0",etaText:"...",statusNote:t("بدء جلسة الرفع المستأنف...","Starting resumable session...")});const G=(await I("/api/documents/session",{method:"POST",body:JSON.stringify({compiledName:L,mimeType:E.type||"application/octet-stream",projectId:l,taskId:n,size:E.size})})).sessionUrl;let U=8388608;E.size<=10485760?U=E.size:E.size<=104857600?U=8388608:E.size<=524288e3?U=16777216:E.size<=2147483648?U=33554432:U=67108864;const F=Date.now();let ie=0;const me=xe=>{const se=Math.min(E.size,ie+xe),Se=Math.min(100,Math.round(se/E.size*100)),we=se>=1073741824?`${(se/1073741824).toFixed(2)} GB`:`${(se/1048576).toFixed(1)} MB`;if(i){const fa=document.getElementById("upload-progress-bar"),ga=document.getElementById("upload-progress-percent"),va=document.getElementById("upload-progress-text"),ya=document.getElementById("upload-progress-container");ya&&(ya.style.display="block"),fa&&(fa.style.width=`${Se}%`),ga&&(ga.textContent=`${Se}%`);const In=(Date.now()-F)/1e3,ba=se/Math.max(In,.2),Dn=(ba/1048576).toFixed(1),Pn=Math.max(0,E.size-se),ot=Math.round(Pn/Math.max(ba,1)),_n=ot<60?`${ot} ${t("ثانية","s")}`:`${Math.floor(ot/60)}:${String(ot%60).padStart(2,"0")} ${t("دقيقة","min")}`;va&&(va.textContent=`${t("رفع إلى الخادم","Uploading to server")} (${k+1}/${e.length}): ${E.name} — ${we} / ${z} (${Se}%) • ${Dn} MB/s • ${t("متبقي:","ETA:")} ${_n}`)}const De=(Date.now()-F)/1e3,Q=se/Math.max(De,.2),B=(Q/1048576).toFixed(1),fe=Math.max(0,E.size-se),St=Math.round(fe/Math.max(Q,1)),jn=St<60?`${St} s`:`${Math.floor(St/60)}m`;Le({fileName:E.name,fileIndex:k+1,totalFiles:e.length,pct:Se,loadedMB:we,fileSizeMB:z,speedMBs:B,etaText:jn})};me(0);let W=0,Be=null,Et=!1;for(;W<E.size;){const xe=Math.min(W+U,E.size),se=E.slice(W,xe),Se=`bytes ${W}-${xe-1}/${E.size}`;let we=0,De=!1;for(;!De&&we<5;)try{let Q;if(!Et)try{Q=await zt({url:G,chunk:se,contentRange:Se,headers:{},onProgress:B=>me(B)})}catch(B){console.warn("[Upload] Direct GDrive upload failed, trying backend proxy:",B.message),Et=!0}if(Et){const B={projectId:l,taskId:n,compiledName:L,mimeType:E.type,size:E.size,status:r};Q=await zt({url:`${Oa}/api/documents/chunk`,chunk:se,contentRange:Se,headers:{"x-session-url":G,"x-doc-meta":encodeURIComponent(JSON.stringify(B))},onProgress:fe=>me(fe)})}if(Q.status===308){const B=Q.headers.get("Range");if(B){const fe=B.match(/bytes=0-(\d+)/);fe&&fe[1]?W=parseInt(fe[1],10)+1:W=xe}else W=xe;ie=W,me(0),De=!0}else if(Q.ok){const B=Q.json();Be=B.id||B.document?.id,ie=E.size,me(0),W=E.size,De=!0;break}else throw new Error(`Upload returned status ${Q.status}`)}catch(Q){if(we++,Le({fileName:E.name,fileIndex:k+1,totalFiles:e.length,statusNote:`${t("إعادة المحاولة","Retrying")} (${we}/5)...`}),we>=5)throw new Error(`${t("فشل الرفع بعد محاولات متعددة","Upload failed after multiple retries")}: ${Q.message}`);await new Promise(fe=>setTimeout(fe,1e3*Math.pow(2,we-1)));const B=await Mi(G,E.size);if(typeof B=="number"&&B>W){W=B,ie=W;break}else if(B&&B.completed){Be=B.data?.id,W=E.size,De=!0;break}}}Be&&!Be.startsWith("doc_")&&await I("/api/documents/finalize",{method:"POST",body:JSON.stringify({driveFileId:Be,projectId:l,taskId:n,compiledName:L,mimeType:E.type,size:E.size,status:r})})}if(await K(!0),i&&n){const k=s.data?.tasks?.find(M=>M.id===n),E=document.getElementById("task-documents-list");E&&k&&(E.innerHTML=Te(k))}mt(),Le({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),$(t("تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅","Drawing uploaded & registered successfully ✅"))}catch(k){Le({isError:!0,statusNote:k.message}),$(k.message,!0)}finally{if(typeof window<"u"&&window.removeEventListener("beforeunload",T),h){try{h.release()}catch{}h=null}if(i){const k=document.getElementById("upload-progress-container"),E=document.getElementById("upload-progress-bar"),M=document.getElementById("task-dropzone");k&&(k.style.display="none"),E&&(E.style.width="0%"),M&&(M.style.pointerEvents="auto");const C=document.getElementById("task-upload-input");C&&(C.value="")}}}typeof window<"u"&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener("dragover",e=>{const a=e.target.closest("#task-dropzone");a&&(e.preventDefault(),a.style.borderColor="var(--brand-teal)",a.style.background="var(--teal-soft)")}),document.addEventListener("dragleave",e=>{const a=e.target.closest("#task-dropzone");a&&(a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)")}),document.addEventListener("drop",e=>{const a=e.target.closest("#task-dropzone");if(a){e.preventDefault(),a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)";const n=a.dataset.taskId,o=e.dataTransfer?.files;o&&o.length&&la(o,n)}}));async function zi(){Ge({theme:s.theme,lang:s.lang});try{s.calendarSystem=localStorage.getItem("darc_calendar_system")||s.calendarSystem||"gregorian"}catch{}if(typeof window<"u"&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",i=>{try{if(!localStorage.getItem("darc-theme")){s.theme=i.matches?"dark":"light",document.documentElement.dataset.theme=s.theme;const d=document.querySelector('[data-action="toggle-theme"]');d&&(d.textContent=s.theme==="dark"?"☀️":"🌙")}}catch{}})}catch{}}const e=typeof window<"u"?window.location.hash.replace(/^#/,""):"",a=new URLSearchParams(e.includes("?")?e.split("?")[1]:e.includes("=")?e:""),n=a.get("activate");if(n)return nt(n);const o=a.get("reset");if(o)return Ne(o);if(e==="forgot")return X("","forgot");if(e==="login")return X();try{if(e){const[i,d]=e.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)&&(s.view=i,d)){const l=new URLSearchParams(d);l.get("id")&&(s.activeProjectId=l.get("id")),l.get("tab")&&(s.projectTab=l.get("tab")),l.get("section")&&(s.settingsSection=l.get("section"))}}else if(typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route");if(i){const d=JSON.parse(i);d.view&&(s.view=d.view),d.activeProjectId&&(s.activeProjectId=d.activeProjectId),d.projectTab&&(s.projectTab=d.projectTab),d.settingsSection&&(s.settingsSection=d.settingsSection)}}}catch{}s.view==="settings"&&!s.settingsSection&&(s.settingsSection="profile");const r=Pa();r&&r.user?(s.data=r,q(s.view)||(s.view=ye()),ae()):_a();try{if(typeof navigator<"u"&&navigator.onLine&&tt().length>0&&await Ht(I),await be(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}if(!window._darcPollingActive){window._darcPollingActive=!0;let i=null,d=0,l=!1,p=Date.now(),m=0;const g=()=>{const v=Date.now()-p>45e3;p=Date.now(),v&&Date.now()-m>4e3&&!l&&w()};if(typeof window<"u"){let v=0;const b=()=>{const u=Date.now();u-v>5e3&&(v=u,g())};window.addEventListener("click",b,{passive:!0}),window.addEventListener("keydown",b,{passive:!0}),window.addEventListener("touchstart",b,{passive:!0}),window.addEventListener("mousemove",b,{passive:!0})}const y=()=>{i&&clearTimeout(i);const v=Date.now()-p>45e3?15e3:4e3,b=d>0?Math.min(25e3,v*Math.pow(2,d)):v;i=setTimeout(w,b)},w=async()=>{if(typeof document<"u"&&document.hidden){y();return}if(!s.data?.user||!s.view||s.view==="login"){y();return}if(l){y();return}l=!0,m=Date.now();try{await be(!0),d=0}catch{d++}finally{l=!1,y()}};y(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&s.data?.user&&s.view&&s.view!=="login"&&(g(),w())})}}catch{typeof window<"u"&&(window.history&&window.history.replaceState?window.history.replaceState(null,"","#login"):window.location.hash="#login"),X()}}typeof window<"u"&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener("hashchange",()=>{if(window._isInternalNav){window._isInternalNav=!1;return}const e=window.location.hash.replace(/^#/,"");if(!e)return;const[a,n]=e.split("?");if(a==="login"){s.data?.user&&(s.data.user=null),X();return}if(a==="forgot"){X("","forgot");return}const o=new URLSearchParams(n||(e.includes("=")?e:""));if(o.get("activate")){nt(o.get("activate"));return}if(o.get("reset")){Ne(o.get("reset"));return}if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(a)){if(s.data&&!q(a)){le(ye());return}let r=s.activeProjectId;if(n){const i=new URLSearchParams(n);i.get("id")&&(r=i.get("id")),i.get("tab")&&(s.projectTab=i.get("tab")),i.get("section")&&(s.settingsSection=i.get("section"))}s.view!==a||s.activeProjectId!==r?le(a,r):P()}}));if(typeof window<"u"&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener("scroll",a=>{a.target&&a.target.classList&&(a.target.classList.contains("timeline-scroll")||a.target.classList.contains("gantt-scroll")||a.target.classList.contains("timeline-board"))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows=="function"&&drawTimelineArrows(),e=!1})))},!0)}var H=null,te=null;function ca(){return H||(H=document.createElement("div"),H.className="drag-placeholder",H.style.cssText=`
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
    `,H.innerHTML=`<span>↓ ${t("الموقع الجديد للمهمة","Drop position")}</span>`),H}function Xe(){H&&H.parentNode&&H.parentNode.removeChild(H)}function kt(e,a){const n=Array.from(e.querySelectorAll(".task-card:not(.is-dragging)"));for(const o of n){const r=o.getBoundingClientRect();if(a<r.top+r.height/2)return o}return null}document.addEventListener("dragstart",e=>{const a=e.target.closest(".task-card");if(a){const n=(s.data?.tasks||[]).find(o=>o.id===a.dataset.taskId);if(!(_()||S("edit_tasks")||n&&n.assigneeId===s.data?.user?.id)){e.preventDefault();return}window._isDraggingTask=!0,te=a.dataset.taskId,e.dataTransfer.effectAllowed="move";try{e.dataTransfer.setData("text/plain",te)}catch{}a.classList.add("is-dragging")}});document.addEventListener("dragend",e=>{const a=e.target.closest(".task-card");a&&a.classList.remove("is-dragging"),window._isDraggingTask=!1,window._justDroppedTaskId=te,window._justDroppedAt=Date.now(),te=null,document.querySelectorAll(".board-column").forEach(n=>n.classList.remove("drag-over")),Xe()});document.addEventListener("dragover",e=>{const a=e.target.closest(".board-column");if(a){e.preventDefault(),e.dataTransfer.dropEffect="move",a.classList.add("drag-over");const n=50,o=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");o&&(e.clientX<n?o.scrollLeft-=14:e.clientX>window.innerWidth-n&&(o.scrollLeft+=14));const r=a.querySelector(".board-cards");if(r){const i=ca(),d=kt(r,e.clientY);d?i.nextSibling!==d&&r.insertBefore(i,d):(!r.contains(i)||r.lastElementChild!==i)&&r.appendChild(i)}}});document.addEventListener("dragenter",e=>{e.target.closest(".board-column")&&e.preventDefault()});document.addEventListener("dragleave",e=>{const a=e.target.closest(".board-column");if(a){if(e.relatedTarget&&a.contains(e.relatedTarget))return;const n=a.getBoundingClientRect(),o=e.clientX,r=e.clientY;(o<=n.left||o>=n.right||r<=n.top||r>=n.bottom)&&(a.classList.remove("drag-over"),Xe())}});async function xn(e,a,n=null){if(!e){Xe();return}e.classList.remove("drag-over");const o=e.querySelector(".board-cards");let r=null;if(H&&H.parentNode===o){const v=H.nextElementSibling;v&&v.classList.contains("task-card")&&v.dataset.taskId!==(n||te)&&(r=v.dataset.taskId)}else if(o){const v=kt(o,a);v&&v.dataset.taskId!==(n||te)&&(r=v.dataset.taskId)}Xe();const i=n||te;te=null;const d=e.dataset.status;if(!i||!d)return;const l=(s.data?.tasks||[]).find(v=>v.id===i);if(!l)return;if(!(l.status===d||d==="review"&&["review","approval","blocked"].includes(l.status))&&d==="done"&&l.dependencies&&l.dependencies.length&&l.dependencies.filter(v=>{const b=s.data.tasks.find(u=>u.id===v);return b&&b.status!=="done"}).length)return $(t("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);s.projectTaskSort="custom",s.myTaskSort="custom",localStorage.setItem("darc_task_sort_pref","custom");const p=d==="review"?["review","approval","blocked"]:[d];let m=(s.data.tasks||[]).filter(v=>v.projectId===l.projectId&&(p.includes(v.status)||v.id===i));const g=m.findIndex(v=>v.id===i);g!==-1&&m.splice(g,1),m.sort((v,b)=>Ae(v)-Ae(b)),l.status=d;let y=m.length;if(r){let v=m.findIndex(b=>b.id===r);if(v===-1&&H&&H.parentNode){let b=H.nextElementSibling;for(;b;){if(b.classList?.contains("task-card")&&b.dataset.taskId){const u=m.findIndex(h=>h.id===b.dataset.taskId);if(u!==-1){v=u;break}}b=b.nextElementSibling}}v!==-1&&(y=v)}m.splice(y,0,l),m.forEach((v,b)=>{const u=(b+1)*100;v.sortOrder=u,v.sort_order=u,v.customFields={...v.customFields||{},sortOrder:u,sort_order:u},v.custom_fields={...v.custom_fields||{},sortOrder:u,sort_order:u}}),P();const w=document.querySelector(`.task-card[data-task-id="${i}"]`);w&&(w.classList.add("just-dropped"),setTimeout(()=>w.classList.remove("just-dropped"),400)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,m.forEach(v=>{window._pendingReorderBatch.set(v.id,{id:v.id,status:v.status,sortOrder:v.sortOrder,customFields:v.customFields})}),window._reorderSyncTimer=setTimeout(()=>{const v=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),I("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:v})}).catch(b=>{console.warn("Reorder sync error:",b),$(t("فشل حفظ الترتيب الجديد في الخادم.","Failed to save task order to server."),!0)})},150)}document.addEventListener("drop",async e=>{const a=e.target.closest(".board-column");e.preventDefault();const n=te||(e.dataTransfer?e.dataTransfer.getData("text/plain"):null);await xn(a,e.clientY,n)});var V=null,Y=null,wn=0,$n=0,kn=0,En=0,ue=null,Ze=!1;function Rt(){ue&&(clearTimeout(ue),ue=null),Y&&Y.parentNode&&Y.parentNode.removeChild(Y),Y=null,V&&(V.style.opacity="",V.style.pointerEvents="",V.classList.remove("is-dragging")),document.querySelectorAll(".board-column").forEach(e=>e.classList.remove("drag-over")),Xe(),V=null,Ze=!1,te=null}document.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;const a=e.target.closest(".task-card");if(!a||e.target.closest("button, a, input, select, textarea, .btn"))return;const n=(s.data?.tasks||[]).find(r=>r.id===a.dataset.taskId);if(!(_()||S("edit_tasks")||n&&n.assigneeId===s.data?.user?.id))return;V=a;const o=e.touches[0];wn=o.clientX,$n=o.clientY,Ze=!1,ue=setTimeout(()=>{if(!V)return;if(Ze=!0,te=V.dataset.taskId,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(40)}catch{}const r=V.getBoundingClientRect();kn=o.clientX-r.left,En=o.clientY-r.top,Y=V.cloneNode(!0),Y.id="touch-drag-ghost",Y.style.cssText=`
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
    `,document.body.appendChild(Y),V.classList.add("is-dragging"),V.style.opacity="0.25",V.style.pointerEvents="none";const i=V.closest(".board-column");if(i){i.classList.add("drag-over");const d=i.querySelector(".board-cards");if(d){const l=ca(),p=kt(d,o.clientY);p&&l.nextSibling!==p?d.insertBefore(l,p):d.contains(l)||d.appendChild(l)}}},220)},{passive:!0});document.addEventListener("touchmove",e=>{if(!V)return;const a=e.touches[0],n=Math.abs(a.clientX-wn),o=Math.abs(a.clientY-$n);if(!Ze){(n>8||o>8)&&(ue&&(clearTimeout(ue),ue=null),V=null);return}if(e.cancelable&&e.preventDefault(),Y){const l=a.clientX-kn,p=a.clientY-En;Y.style.transform=`translate3d(${l}px, ${p}px, 0) scale(1.03) rotate(1.5deg)`}const r=45,i=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");i&&(a.clientX<r?i.scrollLeft-=12:a.clientX>window.innerWidth-r&&(i.scrollLeft+=12));const d=document.elementFromPoint(a.clientX,a.clientY)?.closest(".board-column");if(document.querySelectorAll(".board-column").forEach(l=>l.classList.toggle("drag-over",l===d)),d){const l=d.querySelector(".board-cards");if(l){const p=ca(),m=kt(l,a.clientY);m?p.nextSibling!==m&&l.insertBefore(p,m):(!l.contains(p)||l.lastElementChild!==p)&&l.appendChild(p)}}},{passive:!1});document.addEventListener("touchend",async e=>{if(ue&&(clearTimeout(ue),ue=null),!!V)if(Ze){const a=e.changedTouches[0],n=document.elementFromPoint(a.clientX,a.clientY)?.closest(".board-column")||H&&H.closest(".board-column"),o=te;Y&&Y.parentNode&&Y.parentNode.removeChild(Y),Y=null,n&&o&&await xn(n,a.clientY,o),Rt()}else Rt()});document.addEventListener("touchcancel",()=>{Rt()});var Ri="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",Sn=typeof navigator<"u"&&!!navigator.connection?.saveData,Oi=3e5,Ni=Sn?1e4:3e4,Fi=Sn?600:300,Bi=25e3,Ui=150,jt=null,ja=!1,Ot=!1,_e=null,oe=null,ct=null,Re=null,It=null,Ce=null,Ia=0,Je=0,he=!1,pa=Date.now(),Nt=0,dt=null,pe=new Map;function qi(e){if(!e||typeof e!="string")return;const a=Date.now();pe.set(e,a);for(const[n,o]of pe.entries())a-o>8e3&&pe.delete(n);if(pe.size>Ui){const n=pe.keys().next().value;n&&pe.delete(n)}}function Qe(){return typeof localStorage>"u"?!1:!!localStorage.getItem("darc_token")}var yt=new Set(["__proto__","constructor","prototype"]),An=new Set(["custom_fields","permissions","details"]);function bt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(bt);const a={};for(const[n,o]of Object.entries(e)){if(yt.has(n))continue;const r=n.indexOf("_")===-1?n:n.replace(/_([a-z0-9])/g,(i,d)=>d.toUpperCase());yt.has(r)||(a[r]=o!==null&&typeof o=="object"&&!An.has(n)?bt(o):o)}return a}function ht(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(ht);const a={};for(const[n,o]of Object.entries(e))yt.has(n)||(a[n]=o!==null&&typeof o=="object"&&!An.has(n)?ht(o):o);return a}function We(e){if(!e||!s.data||!Array.isArray(s.data.tasks)||!Array.isArray(s.data.projects))return;const a=s.data.projects.find(p=>p.id===e);if(!a)return;const n=s.data.tasks.filter(p=>p.projectId===e&&!p.deletedAt&&!p.deleted_at);let o=0,r=0;for(const p of n){const m=Number(p.weight)||1,g=Number(p.progress)||0;o+=m,r+=m*(g/100)}const i=o>0?Math.round(r/o*100):0;a.progress!==i&&(a.progress=i),a.totalWeight=o;const d=n.length>0,l=d&&n.every(p=>p.status==="done"||p.status==="completed");d&&l&&i===100?a.lifecycle="completed":a.lifecycle==="completed"&&(!l||i<100)&&(a.lifecycle="active")}function Dt(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const a=(s.data?.notifications||[]).filter(o=>!o.read&&!o.readAt).length;let n=e.querySelector(".notification-dot");a>0?n||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):n&&n.remove()}function Hi(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!_e||_e.state==="closed")&&(_e=new e),_e.state==="suspended"&&_e.resume().catch(()=>{});const a=_e,n=a.createOscillator(),o=a.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,a.currentTime),n.frequency.exponentialRampToValueAtTime(880,a.currentTime+.15),o.gain.setValueAtTime(.06,a.currentTime),o.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),n.connect(o),o.connect(a.destination),n.start(),n.stop(a.currentTime+.36)}catch{}}function Wi(){dt&&cancelAnimationFrame(dt),dt=requestAnimationFrame(()=>{dt=null,typeof P=="function"?P():typeof ae=="function"&&ae()})}function pt(e,a,n,o){if(!s.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const r=n?ht(bt(n)):null,i=o?ht(bt(o)):null,d=r&&r.id||i&&i.id;if(!d)return!1;const l=pe.get(d);if(l&&Date.now()-l<5e3)return!0;if(s.data?.user?.role_id!=="admin"&&r){if(e==="notifications"){if(r.userId&&r.userId!==s.data?.user?.id)return!1}else if(e==="tasks"||e==="documents"||e==="comments"){const y=r.projectId||(e==="comments"?s.data?.tasks?.find(w=>w.id===r.taskId)?.projectId:null);if(y&&!s.data?.projects?.some(w=>w.id===y))return!1}}Array.isArray(s.data[e])||(s.data[e]=[]);const p=s.data[e];let m=!1;const g=!!(r?.deletedAt||r?.deleted_at);if(a==="DELETE"||g){const y=p.length;let w=null;e==="tasks"&&(w=p.find(v=>v.id===d)?.projectId||i?.projectId||r?.projectId),s.data[e]=p.filter(v=>v.id!==d),s.data[e].length!==y&&(m=!0),e==="tasks"&&w?We(w):e==="projects"?Array.isArray(s.data.tasks)&&(s.data.tasks=s.data.tasks.filter(v=>v.projectId!==d)):e==="notifications"&&Dt()}else if(a==="UPDATE"&&r){const y=p.findIndex(w=>w.id===d);if(y!==-1){for(const[w,v]of Object.entries(r))yt.has(w)||(p[y][w]=v);m=!0}else p.unshift(r),m=!0;e==="tasks"?(r.projectId&&We(r.projectId),i?.projectId&&i.projectId!==r.projectId&&We(i.projectId)):e==="notifications"&&Dt()}else if(a==="INSERT"&&r){if(p.some(y=>y.id===d)||(p.unshift(r),m=!0),e==="tasks"&&r.projectId)We(r.projectId);else if(e==="notifications"){const y=s.data?.user?.id;if(y&&r.userId===y&&!r.read){Dt();const w=r.content||(s.lang==="ar"?r.titleAr||r.title:r.titleEn||r.title||r.titleAr)||t("إشعار جديد","New notification");w&&$(`🔔 ${w}`,!1),Hi()}}}if(m){ft();const y=r?.taskId||i?.taskId;if(y){const w=(s.data?.tasks||[]).find(v=>v.id===y);if(w){if(e==="comments"){const v=document.getElementById("task-comment-form");if(v&&v.dataset.taskId===y){const b=document.getElementById("task-comments-list");b&&typeof Ke=="function"&&(b.innerHTML=Ke(w),b.scrollTop=b.scrollHeight)}}if(e==="documents"){const v=document.getElementById("task-dropzone");if(v&&v.dataset.taskId===y){const b=document.getElementById("task-documents-list");b&&typeof Te=="function"&&(b.innerHTML=Te(w))}}}}return Wi(),!0}return!1}function et(e="realtime"){Qe()&&(he&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!s.data||!s.view||(jt&&clearTimeout(jt),jt=setTimeout(async()=>{try{await be(!0)}catch(a){console.warn("[Realtime] Sync error:",String(e),a.message)}},Fi)))}function Ft(e,a,n,o={}){e&&e.readyState===WebSocket.OPEN&&(Ia++,e.send(JSON.stringify({topic:a,event:n,payload:o,ref:String(Ia)})))}function Vi(e){ua(),ct=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&Ft(e,"phoenix","heartbeat")},Bi)}function ua(){ct&&(clearInterval(ct),ct=null)}function Tn(e="disconnect"){if(Ot=!0,ua(),Re&&(clearTimeout(Re),Re=null),oe){try{oe.close(1e3,e)}catch{}oe=null}}function Bt(e="idle"){he||(he=!0,Tn(e))}function Ut(e="wake_up"){const a=he;he=!1,Qe()&&(typeof navigator<"u"&&!navigator.onLine||((!oe||oe.readyState===WebSocket.CLOSED||oe.readyState===WebSocket.CLOSING)&&ma(),(a||e==="tab_visible")&&et(e)))}function ma(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&Qe()&&!he&&!(oe&&(oe.readyState===WebSocket.CONNECTING||oe.readyState===WebSocket.OPEN))){Ot=!1;try{const e=new WebSocket(Ri);oe=e,e.onopen=()=>{Je=0,Vi(e),Ft(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(a=>{Ft(e,`realtime:public:${a}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:a}]}})})},e.onmessage=a=>{try{const{event:n,topic:o,payload:r}=JSON.parse(a.data);if(n==="phx_reply"||n==="phx_close")return;if(n==="postgres_changes"&&r?.data){const{table:i,type:d,record:l,old_record:p}=r.data;if(pt(i,d,l,p))return}if((n==="INSERT"||n==="UPDATE"||n==="DELETE")&&o?.startsWith("realtime:public:")){const i=o.split(":")[2];if(pt(i,n,r?.record||r?.new,r?.old_record||r?.old))return}if(o==="realtime:darc_live"&&(n==="broadcast"||n==="STATE_MUTATION"||n==="GRANULAR_DELTA")){const i=r?.payload||r,d=i?.mutationId||i?.id||i?.entityId;if(d&&pe.has(d))return;if(i?.delta){const{table:l,action:p,record:m,oldRecord:g}=i.delta;if(pt(l,p,m,g))return}et("edge_broadcast");return}(n==="broadcast"||o==="realtime:darc_live"||typeof o=="string"&&o.startsWith("realtime:public:"))&&et("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=a=>{if(ua(),oe=null,!(Ot||!Qe()||he)&&!(a?.reason==="logout"||a?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){Je++;const n=Math.min(3e4,Math.pow(2,Math.min(Je,5))*1e3);Re&&clearTimeout(Re),Re=setTimeout(()=>{ma()},n)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function Da(){const e=Date.now();e-Nt>1e4&&(Nt=e,pa=e,he&&(typeof document>"u"||!document.hidden)&&Ut("user_active"))}function Ji(){It&&clearInterval(It),It=setInterval(()=>{const e=Date.now();for(const[a,n]of pe.entries())e-n>8e3&&pe.delete(a);he||typeof document<"u"&&document.hidden||Date.now()-pa>=Oi&&Bt("inactivity_idle")},6e4)}function Gi(){if(!ja){if(ja=!0,Qe()&&ma(),Ji(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,Da,{passive:!0})}),window.addEventListener("mousemove",Da,{passive:!0})),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden?(Ce&&clearTimeout(Ce),Ce=setTimeout(()=>{Bt("tab_hidden")},Ni)):(Ce&&(clearTimeout(Ce),Ce=null),pa=Date.now(),Nt=Date.now(),Ut("tab_visible"))}),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=a=>{if(a.data?.type==="GRANULAR_DELTA"&&a.data.delta){const{table:n,action:o,record:r,oldRecord:i}=a.data.delta;pt(n,o,r,i)}else a.data?.type==="STATE_MUTATION"&&et("broadcast_channel")},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{s.isOffline=!1,Je=0;const e=window.api,a=typeof window.choose=="function"?window.choose:(o=>o),n=typeof window.showToast=="function"?window.showToast:console.log;if(Ut("online"),e){const o=await Ht(e);o&&o.synced>0?n(a(`تمت استعادة الاتصال ومزامنة ${o.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${o.synced} pending actions successfully! 🚀`),!1):n(a("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}et("online")}),window.addEventListener("offline",()=>{if(s.isOffline=!0,Je=0,Bt("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function Yi(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now()})}catch{}}typeof window<"u"&&(window.notifyStateMutation=Yi,window.disconnectSupabaseRealtime=Tn,window.recordRecentLocalMutation=qi,window.recalculateProjectProgressInMemory=We);document.documentElement.dataset.theme=s.theme;document.documentElement.lang=s.lang;document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";s.lang==="en"?document.body.classList.add("is-ltr"):document.body.classList.remove("is-ltr");Object.assign(window,Un);Object.assign(window,Zn);Object.assign(window,ti);Object.assign(window,di);Object.assign(window,si);Object.assign(window,mi);Object.assign(window,vi);Object.assign(window,hi);Object.assign(window,Si);Object.assign(window,Xn);Object.assign(window,Di);Object.assign(window,qn);Ii();document.addEventListener("click",e=>{handleClick(e).catch(a=>showToast(a.message,!0))});document.addEventListener("submit",e=>{handleSubmit(e).catch(a=>showToast(a.message,!0))});document.addEventListener("input",handleInput);document.addEventListener("change",handleChange);document.addEventListener("keydown",e=>{e.key==="Escape"&&closeModal()});var Pt=null;window.addEventListener("resize",()=>{s.view==="project-detail"&&s.projectTab==="timeline"&&(Pt||(Pt=requestAnimationFrame(()=>{Pt=null,drawTimelineArrows()})))});window.addEventListener("error",e=>{console.error("Runtime Error:",e.error),typeof showToast=="function"&&showToast(`خطأ برمجي: ${e.message}`,!0)});"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(e=>{console.warn("[PWA] ServiceWorker registration skipped:",e.message)})});Gi();init();
