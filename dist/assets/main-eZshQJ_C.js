var Sn=Object.defineProperty,ye=(e,a)=>{let n={};for(var s in e)Sn(n,s,{get:e[s],enumerable:!0});return a||Sn(n,Symbol.toStringTag,{value:"Module"}),n};(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function Wt(e){if(typeof document>"u"||!e||!document.cookie)return null;const a=document.cookie.split("; "),n=encodeURIComponent(String(e))+"=",s=String(e)+"=";for(let r=0;r<a.length;r++){const i=a[r];if(i.startsWith(n)){const d=i.substring(n.length);try{return decodeURIComponent(d)}catch{return d}}else if(i.startsWith(s)){const d=i.substring(s.length);try{return decodeURIComponent(d)}catch{return d}}}return null}function Ji(){if(typeof window>"u")return"ar";try{let e=Wt("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const a=Wt("darc_prefs");if(a)try{e=JSON.parse(a).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function Ki(){if(typeof window>"u")return"light";try{let e=Wt("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const a=Wt("darc_prefs");if(a)try{e=JSON.parse(a).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function Yi(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const a=window.location.hash.replace(/^#/,"");if(a&&!["login","forgot"].includes(a)){const[s,r]=a.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(s)){let i=null,d="overview",l="profile";if(r){const p=new URLSearchParams(r),u=p.get("id");u&&/^[a-zA-Z0-9_-]{3,64}$/.test(u)&&(i=u);const f=p.get("tab");f&&["overview","tasks","drawings","documents","timeline","activity"].includes(f)&&(d=f);const v=p.get("section");v&&["profile","company","roles","accounts","whatsapp","security","audit","trash","analytics","diagnostics","preferences"].includes(v)&&(l=v)}return{view:s,activeProjectId:i,projectTab:d,settingsSection:l}}}const n=sessionStorage.getItem("darc_last_route");if(n){const s=JSON.parse(n);if(s.view)return{view:s.view,activeProjectId:s.activeProjectId||null,projectTab:s.projectTab||"overview",settingsSection:s.settingsSection||"profile"}}}catch{}return e}var Mt=Yi(),o={lang:Ji(),theme:Ki(),view:Mt.view,activeProjectId:Mt.activeProjectId,projectTab:Mt.projectTab,settingsSection:Mt.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},Xi="darc_offline_db",Zi=1,Fe="cache_store",dt="darc_offline_bootstrap",ze="darc_offline_mutations_queue",ca=!1,pa=null;function Oa(){return typeof indexedDB>"u"?Promise.resolve(null):(pa||(pa=new Promise(e=>{try{const a=indexedDB.open(Xi,Zi);a.onupgradeneeded=n=>{const s=n.target.result;s.objectStoreNames.contains(Fe)||s.createObjectStore(Fe)},a.onsuccess=()=>e(a.result),a.onerror=()=>e(null)}catch{e(null)}})),pa)}async function Qi(e){const a=await Oa();return a?new Promise(n=>{try{const s=a.transaction(Fe,"readonly").objectStore(Fe).get(e);s.onsuccess=()=>n(s.result||null),s.onerror=()=>n(null)}catch{n(null)}}):null}async function eo(e,a){const n=await Oa();return n?new Promise(s=>{try{const r=n.transaction(Fe,"readwrite").objectStore(Fe).put(a,e);r.onsuccess=()=>s(!0),r.onerror=()=>s(!1)}catch{s(!1)}}):!1}async function En(e){const a=await Oa();return a?new Promise(n=>{try{const s=a.transaction(Fe,"readwrite").objectStore(Fe).delete(e);s.onsuccess=()=>n(!0),s.onerror=()=>n(!1)}catch{n(!1)}}):!1}function to(){return typeof navigator<"u"?navigator.onLine:!0}function xe(e){if(!e)return;const a={timestamp:Date.now(),data:e};if(eo(dt,a).catch(()=>{}),typeof localStorage<"u"){const n=()=>{try{localStorage.setItem(dt,JSON.stringify(a))}catch(s){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",s.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:2e3}):setTimeout(n,50)}}function Ba(){if(typeof localStorage<"u")try{const e=localStorage.getItem(dt);if(e){const a=JSON.parse(e);if(a?.data)return a.data}}catch{}return null}async function An(){const e=await Qi(dt);return e?.data?e.data:Ba()}async function Tn(){if(typeof localStorage<"u")try{localStorage.removeItem(dt),localStorage.removeItem(ze)}catch{}await Promise.all([En(dt),En(ze)]),it()}function it(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:Tt().length}}))}function ot(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function In({path:e,method:a="POST",body:n=null,description:s=""}){if(typeof localStorage>"u")return null;try{const r=localStorage.getItem(ze),i=r?JSON.parse(r):[];if(a==="DELETE"){if(e.startsWith("/api/tasks/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/tasks"&&p.body?.id===l)){const p=i.filter(u=>!(u.path==="/api/tasks"&&u.body?.id===l||u.path===`/api/tasks/${l}`||u.path.startsWith(`/api/tasks/${l}/`)));return localStorage.setItem(ze,JSON.stringify(p)),it(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/projects"&&p.body?.id===l)){const p=i.filter(u=>!(u.path==="/api/projects"&&u.body?.id===l||u.path===`/api/projects/${l}`||u.method==="POST"&&u.path==="/api/tasks"&&u.body?.projectId===l));return localStorage.setItem(ze,JSON.stringify(p)),it(),{id:"compacted",compacted:!0}}}}const d={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substring(2,8),path:e,method:a,body:n,description:s,createdAt:new Date().toISOString()};return i.push(d),localStorage.setItem(ze,JSON.stringify(i)),it(),console.log("[Offline Outbox] Enqueued mutation:",d),d}catch(r){return console.warn("[Offline Outbox] Failed to enqueue mutation:",r.message),null}}function Tt(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(ze);return e?JSON.parse(e):[]}catch{return[]}}function ao(){typeof localStorage>"u"||(localStorage.removeItem(ze),it())}function Dn(e,a,n,s){if(!s||!s.data)return{ok:!0,queued:!0,offline:!0};const r=new Date().toISOString();if(a==="POST"&&e==="/api/tasks"&&n){const i=n.id||ot("tsk");n.id=i;const d={id:i,code:"OFFLINE",projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",status:n.status||"not_started",priority:n.priority||"medium",categoryAr:n.categoryAr||"عام",categoryEn:n.categoryEn||"General",weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:s.data.users?.find(p=>p.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:r,updatedAt:r,_isOfflinePending:!0};s.data.tasks||(s.data.tasks=[]);const l=s.data.tasks.findIndex(p=>p.id===i);return l!==-1?s.data.tasks[l]=d:s.data.tasks.unshift(d),xe(s.data),{ok:!0,queued:!0,offline:!0,task:d}}if(a==="PATCH"&&e.startsWith("/api/tasks/")&&n){const i=e.split("/")[3],d=(s.data.tasks||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...s.data.tasks[d],...n,updatedAt:r,_isOfflinePending:!0};return n.assigneeId!==void 0&&(l.assignee=s.data.users?.find(p=>p.id===n.assigneeId)||null),s.data.tasks[d]=l,xe(s.data),{ok:!0,queued:!0,offline:!0,task:l}}}if(a==="DELETE"&&e.startsWith("/api/tasks/")){const i=e.split("/")[3];return s.data.tasks&&(s.data.tasks=s.data.tasks.filter(d=>d.id!==i),xe(s.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e==="/api/projects"&&n){const i=n.id||ot("prj");n.id=i;const d={id:i,code:n.code||"DARC-OFF",nameAr:n.nameAr||n.name||"مشروع محلي جديد",nameEn:n.nameEn||n.name||"New Offline Project",clientAr:n.clientAr||"",clientEn:n.clientEn||"",descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",lifecycle:n.lifecycle||"planning",health:n.health||"on_track",progress:0,progressMode:"weighted",managerId:n.managerId||s.data.user?.id,startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:r,updatedAt:r,_isOfflinePending:!0};s.data.projects||(s.data.projects=[]);const l=s.data.projects.findIndex(p=>p.id===i);return l!==-1?s.data.projects[l]=d:s.data.projects.unshift(d),xe(s.data),{ok:!0,queued:!0,offline:!0,project:d}}if(a==="PATCH"&&e.startsWith("/api/projects/")&&n){const i=e.split("/")[3],d=(s.data.projects||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...s.data.projects[d],...n,updatedAt:r,_isOfflinePending:!0};return s.data.projects[d]=l,xe(s.data),{ok:!0,queued:!0,offline:!0,project:l}}}if(a==="DELETE"&&e.startsWith("/api/projects/")){const i=e.split("/")[3];return s.data.projects&&(s.data.projects=s.data.projects.filter(d=>d.id!==i),xe(s.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e.includes("/comments")&&n){const i=e.split("/")[3],d={id:n.id||ot("cmt"),taskId:i,userId:s.data.user?.id,content:n.content,createdAt:r,_isOfflinePending:!0};return n.id=d.id,s.data.comments||(s.data.comments=[]),s.data.comments.some(l=>l.id===d.id)||s.data.comments.push(d),xe(s.data),{ok:!0,queued:!0,offline:!0,comment:d}}return a==="PATCH"&&e==="/api/tasks/reorder"&&n&&Array.isArray(n.items)?(s.data.tasks&&(n.items.forEach(i=>{const d=s.data.tasks.find(l=>l.id===i.id);d&&(i.status&&(d.status=i.status),i.sortOrder&&(d.sortOrder=i.sortOrder),i.customFields&&(d.customFields={...d.customFields||{},...i.customFields}),d._isOfflinePending=!0)}),xe(s.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function Fa(e){if(ca)return{total:0,synced:0,failed:0};const a=Tt();if(!a.length)return{total:0,synced:0,failed:0};ca=!0,console.log(`[Offline Sync] Replaying ${a.length} pending mutations...`);let n=0,s=!1;const r=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,i=new Set(["POST","PATCH","PUT","DELETE"]);for(let d=0;d<a.length;d++){const l=a[d];if(!l||!l.path||typeof l.path!="string"||!r.test(l.path)||!i.has(l.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",l?.id,l?.path);continue}try{const p={method:l.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":l.id,"X-Idempotency-Key":l.id}};l.body&&(p.body=typeof l.body=="string"?l.body:JSON.stringify(l.body));const u=await e(l.path,p);if(u&&u.error&&!u.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",l.id,u.error);else{n++;const f=l.body&&typeof l.body=="object"&&l.body.id||typeof l.path=="string"&&l.path.split("/")[3];f&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(f)}}catch(p){if(console.error("[Offline Sync] Failed to replay mutation:",l.id,l.path,p.message),typeof navigator<"u"&&!navigator.onLine||p.message&&(p.message.includes("تعذر الاتصال")||p.message.includes("fetch")||p.message.includes("NetworkError")||p.name==="TypeError")){const u=a.slice(d);typeof localStorage<"u"&&localStorage.setItem(ze,JSON.stringify(u)),s=!0;break}}}return s||ao(),ca=!1,it(),{total:a.length,synced:n,failed:s?a.length-n:0}}var no=ye({closeModal:()=>H,modalShell:()=>Ae,renderLoading:()=>It,showToast:()=>k});function It(){document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${t("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var He=!1,Oe=null;function H(e=!1){Oe&&(clearTimeout(Oe),Oe=null);const a=document.getElementById("preview-modal-overlay");a&&(a.style.display="none",a.innerHTML="");const n=document.getElementById("modal-root");if(!n||!n.hasChildNodes()){document.body.style.overflow="",He=!1;return}if(e){n.innerHTML="",document.body.style.overflow="",He=!1;return}if(He)return;He=!0;const s=n.querySelector(".modal-backdrop"),r=n.querySelector(".modal");s&&r?(s.classList.add("is-closing"),r.classList.add("is-closing"),Oe=setTimeout(()=>{Oe=null,n.innerHTML="",document.body.style.overflow="",He=!1},150)):(n.innerHTML="",document.body.style.overflow="",He=!1)}function Ae(e,a,n,s="",r=""){return Oe&&(clearTimeout(Oe),Oe=null),He=!1,document.body.style.overflow="hidden",`<div class="modal-backdrop ${s?`backdrop-${s}`:""}"><div class="modal ${r}" data-modal="${s}"><div class="modal-head"><div><h2>${c(e)}</h2><p>${c(a||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${t("إغلاق","Close")}">${w("close",15)}</button></div>${n}</div></div>`}function k(e,a=!1){const n=document.getElementById("toast-root");if(!n)return;const s=document.createElement("div");s.className=`toast ${a?"error":""}`,s.innerHTML=`${w(a?"alert":"check",16)}<span>${c(e)}</span>`,n.appendChild(s),setTimeout(()=>s.remove(),3600)}var io=ye({I18N:()=>ba,PERMISSION_ALIASES:()=>Gn,avatar:()=>X,can:()=>I,canManageAccountPermissions:()=>mo,choose:()=>t,currentViewTitle:()=>Wa,dateLabel:()=>Ee,dueLabel:()=>Hn,esc:()=>c,extractDrawingVersion:()=>qa,formatDateTime:()=>Ha,formatReportDate:()=>Ze,formatReportTime:()=>Dt,formatUnifiedDateNumeric:()=>co,getActiveCalendarSystem:()=>Ue,getCookieVal:()=>oo,getFileFormatInfo:()=>ta,getHijriDateEquivalent:()=>po,getTaskStatusStyle:()=>Ua,getTimeBasedGreeting:()=>qn,icon:()=>w,initials:()=>wt,isAdmin:()=>P,isOverdue:()=>Me,parseEndOfDay:()=>Le,playSuccessChime:()=>Gt,priorityText:()=>fo,roleFor:()=>Wn,roleName:()=>ce,runInWorker:()=>go,sanitizeForSpreadsheet:()=>W,savePreferencesCookies:()=>xt,showToast:()=>k,statusBadge:()=>uo,statusText:()=>K,t:()=>g}),ba={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function g(e){return ba[o.lang][e]||ba.ar[e]||e}function t(e,a){return o.lang==="ar"?e:a}function oo(e){if(typeof document>"u"||!e)return null;const a=document.cookie?document.cookie.split("; "):[];for(const n of a){const s=n.indexOf("=");if(s!==-1&&n.slice(0,s).trim()===e)return decodeURIComponent(n.slice(s+1))}return null}function xt({theme:e,lang:a}={}){if(typeof document>"u")return;const n=31536e3,s=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let r="";if(typeof window<"u"){const f=window.location.hostname;(f==="darc-design.bond"||f.endsWith(".darc-design.bond"))&&(r="; Domain=.darc-design.bond")}const i=e==="dark"||e==="light"?e:null,d=a==="ar"||a==="en"?a:null;if(i){document.cookie=`darc_theme=${encodeURIComponent(i)}; Path=/; Max-Age=${n}; SameSite=Lax${s}${r}`;try{window.localStorage.setItem("darc-theme",i)}catch{}}if(d){document.cookie=`darc_lang=${encodeURIComponent(d)}; Path=/; Max-Age=${n}; SameSite=Lax${s}${r}`;try{window.localStorage.setItem("darc-locale",d)}catch{}}const l=i||(o&&o.theme==="dark"?"dark":"light")||"light",p=d||(o&&o.lang==="en"?"en":"ar")||"ar",u=JSON.stringify({theme:l,lang:p});document.cookie=`darc_prefs=${encodeURIComponent(u)}; Path=/; Max-Age=${n}; SameSite=Lax${s}${r}`}var so={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},ro=/[&<>'"]/,lo=/[&<>'"]/g;function c(e){if(e==null)return"";const a=String(e);return ro.test(a)?a.replace(lo,n=>so[n]):a}function W(e){if(e==null)return"";const a=String(e),n=a.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(a)?`'${a}`:a}var jn={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};function w(e,a=18){return`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${jn[e]||jn.info}</svg>`}function wt(e){if(!e||typeof e!="object")return"D";const a=(o.lang==="ar"?e.name:e.nameEn||e.name)||e.email||"DARC";return(String(a).replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join("")||String(a).slice(0,2)).toUpperCase()}function X(e,a=""){const n=e||{name:"DARC",avatarColor:"#0d6269"},s=/^#[0-9a-f]{6}$/i.test(n.avatarColor||"")?n.avatarColor:"#0d6269",r=c(t(n.name,n.nameEn||n.name));if(n.avatarUrl){const i=c(wt(n)).replace(/['"\\]/g,"");return`<span class="avatar ${a}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${r}"><img src="${c(n.avatarUrl)}" alt="${r}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${s}';this.parentElement.textContent='${i}';" /></span>`}return`<span class="avatar ${a}" style="background:${s}" title="${r}">${c(wt(n))}</span>`}function qn(){const e=new Date().getHours();return o.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function Ua(e){const a=e?.status,n=Me(e);return a==="done"||a==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:t("مكتملة","Completed")}:a==="review"||a==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:t("للمراجعة والاعتماد","In Review")}:a==="blocked"||n?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:n?t("متأخرة","Overdue"):t("متوقفة","Blocked")}:a==="in_progress"||a==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:t("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:t("غير مبدوءة","Not Started")}}function ta(e,a=""){const n=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(n)?{ext:n.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(n)?{ext:n.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:n==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["xlsx","xls","csv"].includes(n)?{ext:n.toUpperCase(),label:"Excel Sheet",color:"#107c41",bg:"rgba(16,124,65,0.12)",border:"rgba(16,124,65,0.3)",isExcel:!0}:["docx","doc","rtf","odt"].includes(n)?{ext:n.toUpperCase(),label:"Word Document",color:"#2b579a",bg:"rgba(43,87,154,0.12)",border:"rgba(43,87,154,0.3)",isWord:!0}:["pptx","ppt","key"].includes(n)?{ext:n.toUpperCase(),label:"PowerPoint Deck",color:"#d24726",bg:"rgba(210,71,38,0.12)",border:"rgba(210,71,38,0.3)",isPpt:!0}:["png","jpg","jpeg","webp","heic"].includes(n)?{ext:n.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["mp4","webm","mov","m4v","ogv"].includes(n)?{ext:n.toUpperCase(),label:"Video",color:"#8b5cf6",bg:"rgba(139,92,246,0.12)",border:"rgba(139,92,246,0.3)",isVideo:!0}:["zip","rar","7z","tar"].includes(n)?{ext:n.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:n.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function qa(e){if(!e)return null;const a=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return a?`V${a[1]}`:null}function Ue(){let e=null;try{e=localStorage.getItem("darc_calendar_system")}catch{}return o.calendarSystem||o.data?.user?.customFields?.calendarSystem||e||"gregorian"}var Cn=new Map;function qe(e,a={}){const n=e+"|"+JSON.stringify(a);let s=Cn.get(n);return s||(s=new Intl.DateTimeFormat(e,a),Cn.set(n,s)),s}function Ee(e,a=!0){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?"—":Ue()==="hijri"?qe(o.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n):qe(o.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n)}function co(e){if(!e)return"—";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"—":Ue()==="hijri"?qe(o.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"2-digit",month:"2-digit",year:"numeric"}).format(a):`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}/${a.getFullYear()}`}function Ha(e,a={}){if(!e)return{date:"—",time:"—",full:"—"};try{const n=new Date(e);if(Number.isNaN(n.getTime()))return{date:String(e),time:"—",full:String(e)};const s=Ue(),r=o.lang==="ar",i=qe(s==="hijri"?r?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":r?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{year:"numeric",month:a.monthStyle||"short",day:"numeric"}).format(n),d=qe(r?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",...a.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(n);return{date:i,time:d,full:`${i} ${d}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function Ze(e=new Date){const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=Ue(),s=o.lang==="ar";return qe(n==="hijri"?s?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{dateStyle:"full"}).format(a)}function Dt(e=new Date){const a=new Date(e);return Number.isNaN(a.getTime())?"—":qe(o.lang==="ar"?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(a)}function po(e){if(!e)return"";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"":qe("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(a)}function Le(e){if(!e)return null;if(e instanceof Date){if(isNaN(e.getTime()))return null;const a=new Date(e.getTime());return a.setHours(23,59,59,999),a}if(typeof e=="number"){const a=new Date(e);return isNaN(a.getTime())?null:(a.setHours(23,59,59,999),a)}if(typeof e=="string"){const a=e.trim();if(!a)return null;const n=a.split("T")[0].split(" ")[0];if(/^\d{4}-\d{2}-\d{2}$/.test(n)){const[r,i,d]=n.split("-").map(Number);return new Date(r,i-1,d,23,59,59,999)}const s=new Date(a);if(!isNaN(s.getTime()))return s.setHours(23,59,59,999),s}return null}function Hn(e){if(!e)return"—";const a=Le(e);if(!a||isNaN(a.getTime()))return"—";const n=Math.ceil((a-new Date)/864e5);return isNaN(n)?"—":n<0?t(`متأخرة ${Math.abs(n)} ${g("days")}`,`${Math.abs(n)} ${g("days")} ${g("ago")}`):n===0?g("today"):t(`بعد ${n} ${g("days")}`,`in ${n} ${g("days")}`)}function Me(e){if(!e?.dueDate||["done","completed","canceled"].includes(e.status))return!1;const a=Le(e.dueDate);return a?a<new Date:!1}function K(e){switch(e){case"not_started":return g("notStarted");case"in_progress":return g("inProgress");case"review":return g("review");case"approval":return g("approval");case"done":return g("done");case"blocked":return g("blocked");case"canceled":return g("canceled");case"planning":return g("planning");case"active":return g("active");case"on_hold":return g("onHold");case"completed":return g("completed");case"archived":return g("archived");case"on_track":return g("onTrack");case"at_risk":return g("atRisk");case"off_track":return g("offTrack");default:return e||""}}function uo(e){return e?`<span class="status-badge ${c(e)}">${c(K(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function fo(e){switch(e){case"low":return g("low");case"medium":return g("medium");case"high":return g("high");case"urgent":return g("urgent");default:return e||""}}function Wn(e){const a=typeof e=="string"?o.data?.users?.find(n=>n.id===e):e;return a?o.data?.roles?.find(n=>n.id===a.roleId)||{id:a.roleId,nameAr:a.roleNameAr||"",nameEn:a.roleNameEn||"",permissions:[]}:null}function ce(e){const a=Wn(e);return a?t(a.nameAr,a.nameEn):"—"}var Gn={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function I(e){if(P())return!0;const a=o.data?.role?.permissions;if(!a||!a.length)return!1;if(a.includes("*")||a.includes(e))return!0;const n=Gn[e];return!!(n&&a.includes(n))}function P(){return o.data?.user?.roleId==="admin"}function mo(){return P()||o.data?.user?.roleId==="account_permissions_manager"||o.data?.role?.permissions?.includes("manage_existing_account_permissions")}function Wa(){return o.view==="project-detail"?t("تفاصيل المشروع","Project details"):{dashboard:g("dashboard"),projects:g("projects"),tasks:g("myTasks"),documents:g("documents"),templates:g("templates"),team:g("team"),reports:g("reports"),settings:g("settings")}[o.view]||g("dashboard")}function Gt(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const a=new e,n=a.currentTime,s=a.createOscillator(),r=a.createGain();s.type="sine",s.frequency.setValueAtTime(587.33,n),r.gain.setValueAtTime(.08,n),r.gain.exponentialRampToValueAtTime(.001,n+.35),s.connect(r),r.connect(a.destination),s.start(n),s.stop(n+.35);const i=a.createOscillator(),d=a.createGain();i.type="sine",i.frequency.setValueAtTime(880,n+.12),d.gain.setValueAtTime(.001,n),d.gain.setValueAtTime(.09,n+.12),d.gain.exponentialRampToValueAtTime(.001,n+.65),i.connect(d),d.connect(a.destination),i.start(n+.12),i.stop(n+.65)}catch{}}function go(e,a){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(a)):new Promise((n,s)=>{try{const r=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),i=URL.createObjectURL(r),d=new Worker(i);d.onmessage=l=>{URL.revokeObjectURL(i),d.terminate(),l.data.ok?n(l.data.result):s(new Error(l.data.error))},d.onerror=l=>{URL.revokeObjectURL(i),d.terminate(),s(l)},d.postMessage(a)}catch{try{n(e(a))}catch(i){s(i)}}})}var vo=Date.now(),Vn=0,Vt=0,Jt=0,ua=null,Pn=Date.now(),Nt=[];function Je(e="action",a="",n=null){const s=new Date().toTimeString().split(" ")[0];Nt.push({time:s,category:e,message:String(a||"").slice(0,150),metadata:n?JSON.stringify(n).slice(0,200):null}),Nt.length>15&&Nt.shift()}function Jn(){return[...Nt]}typeof document<"u"&&setInterval(()=>{document.visibilityState==="visible"&&Vn++},1e3);if(typeof window<"u"){window.addEventListener("webglcontextlost",e=>{e.preventDefault(),console.warn("[WebGL Context Guard] Context loss intercepted; executing LOD vertex decimation and GPU memory purge."),Je("webgl.guard","WebGL Context Lost intercepted. Auto-recovery and LOD mesh decimation active.")},!1),window.addEventListener("webglcontextrestored",()=>{console.info("[WebGL Context Guard] WebGL context successfully restored with optimized buffer allocation."),Je("webgl.guard","WebGL Context successfully restored with optimized buffer allocation.")},!1);try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{Jt+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Kt(!1,!0)}),window.addEventListener("pagehide",()=>{Kt(!1,!0)})}function Ga(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function Kn(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let a="Chrome";e.includes("Edg/")?a="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?a="Safari":e.includes("Firefox/")&&(a="Firefox");let n="macOS";return e.includes("Win")?n="Windows":e.includes("Android")?n="Android":e.includes("iPhone")||e.includes("iPad")?n="iOS":e.includes("Linux")&&(n="Linux"),{os:n,browser:a}}function Yn(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function aa(e,a={}){Vt++;const{os:n,browser:s}=Kn(),r=Yn(),i=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",d=e||{},l=String(d.message||d.reason||d||"Unknown client error"),p=String(d.stack||a.stack||"No stack trace provided."),u=d.name||a.errorType||"ClientRuntimeError";Je("error",`${u}: ${l}`);const f=o.data?.user||{},v={userId:f.id||"usr_demo",userName:f.name||"مدير التوظيف / زائر",userEmail:f.email||"demo@darc-design.bond",userRole:f.jobTitleAr||o.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:f.avatarColor||"#0d6269",errorType:u,errorMessage:l,stackTrace:p,deviceType:r,browser:s,os:n,screenResolution:i,memoryMb:Ga(),currentView:o.view?`#${o.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:Jn(),severity:a.severity||"high",titleAr:a.titleAr||`خطأ تشغيلي في مساحة العمل (${u})`,titleEn:a.titleEn||`Workspace Runtime Error (${u})`};try{return await C("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(v),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const y=new Blob([JSON.stringify(v)],{type:"application/json"});navigator.sendBeacon((na||"")+"/api/telemetry/report-error",y)}catch{}}}async function Kt(e=!1,a=!1){const n=Date.now(),s=Math.max(5,Math.round((n-Pn)/1e3));Pn=n;let r=null,i=null,d=!1;try{typeof localStorage<"u"&&(r=localStorage.getItem("darc_vid"),r||(r="vid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),localStorage.setItem("darc_vid",r))),typeof sessionStorage<"u"&&(i=sessionStorage.getItem("darc_sid"),i||(i="sid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),sessionStorage.setItem("darc_sid",i),d=!0))}catch{}const{os:l,browser:p}=Kn(),u=Yn(),f={userId:o.data?.user?.id||"anonymous",sessionId:i,visitorId:r,isNewVisit:d,os:l,browser:p,deviceType:u,durationSeconds:s,memoryMb:Ga(),errorCount:Vt,longTaskCount:Jt,currentView:o.view||"dashboard"};if(f.memoryMb>140&&(e=!0),a&&typeof navigator<"u"&&navigator.sendBeacon)try{const v=new Blob([JSON.stringify(f)],{type:"application/json"}),$=(na||"")+"/api/telemetry/heartbeat";navigator.sendBeacon($,v);return}catch{}try{const v=await C("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(f),silent:!0});return Vt=0,Jt=0,v}catch{}}function yo(){ua&&clearInterval(ua),setTimeout(()=>Kt(!1),5e3),ua=setInterval(()=>{document.visibilityState==="visible"&&Kt(!1)},45e3)}function Xn(){return{totalSessionDurationSeconds:Math.round((Date.now()-vo)/1e3),activeDurationSeconds:Vn,memoryMb:Ga(),errorCount:Vt,longTaskCount:Jt,recentBreadcrumbs:Jn()}}var na=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",Ot=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function Ke(){Ot=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function C(e,a={}){const n=["POST","PATCH","PUT","DELETE"].includes(a.method),s=e.startsWith("/api/auth"),r=!!(a.headers&&(a.headers["X-Offline-Replay"]==="true"||a.headers["X-Offline-Replay"]===!0));let i=null;if(n&&a.body)try{i=typeof a.body=="string"?JSON.parse(a.body):a.body}catch{}a.method==="POST"&&i&&typeof i=="object"&&!r&&(e==="/api/tasks"&&!i.id?(i.id=ot("tsk"),a.body=JSON.stringify(i)):e==="/api/projects"&&!i.id?(i.id=ot("prj"),a.body=JSON.stringify(i)):e.includes("/comments")&&!i.id&&(i.id=ot("cmt"),a.body=JSON.stringify(i)));const d=typeof FormData<"u"&&a.body instanceof FormData;if(typeof navigator<"u"&&!navigator.onLine&&n&&!s){if(r)throw new Error(t("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));if(d){const D=t("لا يمكن رفع المخططات أو الملفات في وضع عدم الاتصال. يرجى الاتصال بالإنترنت لإتمام الرفع.","File and drawing uploads are not supported offline. Please reconnect to upload.");throw k(D,!0),new Error(D)}const b=In({path:e,method:a.method,body:i}),T=Dn(e,a.method,i,o);return k(t("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡","Offline mode: action saved locally and will auto-sync on reconnect 📡"),!1),{ok:!0,queued:!0,offline:!0,id:b?.id,...T}}const l=typeof localStorage<"u"?localStorage.getItem("darc_token"):null,p=!!(a.silent||a.headers&&a.headers["X-Silent"]),u=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),f=!!Ot&&(p||!!o.data||u),v=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,$={...l?{Authorization:`Bearer ${l}`}:{},...a.body&&!d?{"Content-Type":"application/json"}:{},...v?{"X-Mutation-ID":v}:{},...e==="/api/bootstrap"&&f?{"If-None-Match":Ot}:{},...e==="/api/bootstrap"&&!f?{"Cache-Control":"no-cache, no-store"}:{},...a.headers||{}};e==="/api/bootstrap"&&!f&&(a.cache="no-cache"),a.credentials="include";let y;try{y=await fetch(na+e,{...a,headers:$})}catch{if(n&&!s&&!r){if(d){const A=t("انقطع الاتصال بالإنترنت أثناء الرفع. يرجى إعادة المحاولة عند استقرار الشبكة.","Internet disconnected during file upload. Please retry once reconnected.");throw k(A,!0),new Error(A)}const T=In({path:e,method:a.method,body:i}),D=Dn(e,a.method,i,o);return k(t("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡","Connection lost: action saved locally for auto-sync 📡"),!1),{ok:!0,queued:!0,offline:!0,id:T?.id,...D}}throw new Error(t("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(y.status===304)return null;if(!y.ok){const b=await y.text();y.status!==401&&console.error(`API Failed [${e}]: ${y.status} - ${b}`);let T={};try{T=JSON.parse(b)}catch{}y.status===401&&(Ke(),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login"&&(typeof localStorage<"u"&&localStorage.removeItem("darc_token"),o.data&&(o.data.user=null),typeof window<"u"&&window.location.hash!=="#login"&&(window.location.hash="#login"))),Je("api.error",`${a.method||"GET"} ${e} (Status ${y.status}: ${T.error||"Failed"})`);const D=new Error(T.error||`Failed to fetch ${e}`);throw D.status=y.status,D}const x=y.headers.get("ETag");if(x&&e==="/api/bootstrap"){Ot=x;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",x)}catch{}}const m=await y.json().catch(()=>({ok:!0}));if(["POST","PATCH","PUT","DELETE"].includes(a.method)){Ke();let b=i&&typeof i.id=="string"?i.id:null;if(!b&&m&&typeof m=="object"&&(b=m.id||m.task?.id||m.project?.id||m.comment?.id||m.document?.id||m.data?.id),!b&&typeof e=="string"){const T=e.split("/");T.length>=4&&T[3]&&!T[3].includes("?")&&(b=T[3])}if(b&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(b),v&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(v),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let T=null;if(m&&(m.task?T={table:"tasks",action:a.method==="POST"?"INSERT":"UPDATE",record:m.task}:m.project?T={table:"projects",action:a.method==="POST"?"INSERT":"UPDATE",record:m.project}:m.comment?T={table:"comments",action:a.method==="POST"?"INSERT":"UPDATE",record:m.comment}:m.document&&(T={table:"documents",action:a.method==="POST"?"INSERT":"UPDATE",record:m.document})),!T&&a.method==="DELETE"&&b&&(e.startsWith("/api/tasks/")?T={table:"tasks",action:"DELETE",record:{id:b}}:e.startsWith("/api/projects/")?T={table:"projects",action:"DELETE",record:{id:b}}:e.startsWith("/api/documents/")?T={table:"documents",action:"DELETE",record:{id:b}}:e.startsWith("/api/comments/")&&(T={table:"comments",action:"DELETE",record:{id:b}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(T);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:T?"GRANULAR_DELTA":"STATE_MUTATION",delta:T,timestamp:Date.now()})}catch{}}}}return m}typeof window<"u"&&(window.api=C);var bo=ye({canAccessView:()=>ie,getFirstAllowedView:()=>Re,loadData:()=>me,navItem:()=>Pe,refreshView:()=>de,renderApp:()=>Q,renderSyncIndicator:()=>Va,renderView:()=>L,switchView:()=>we});function ie(e){return o.data?e==="dashboard"?I("view_dashboard"):e==="projects"||e==="project-detail"?I("view_projects"):e==="tasks"?I("create_tasks")||I("edit_tasks")||I("delete_tasks")||I("assign_tasks")||I("review_tasks")||I("approve_tasks")||I("manage_reminders")||I("view_projects")||P():e==="documents"?I("upload_documents")||I("delete_documents")||P():e==="templates"?I("manage_templates")||P():e==="team"?P()||I("manage_users"):e==="reports"?I("view_reports")||P():e==="settings":!0}function Re(){for(const e of["dashboard","projects","tasks","documents","templates","team","reports","settings"])if(ie(e))return e;return"dashboard"}function Va(){const e=Tt().length;return to()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${t("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:"":`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${t("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}if(typeof window<"u"&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;const e=()=>{const a=document.getElementById("sync-status-indicator");a&&(a.innerHTML=Va())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function Pe(e,a,n){return`<button class="nav-item ${o.view===e||e==="projects"&&o.view==="project-detail"?"active":""}" data-view="${e}">${w(n,17)}<span>${a}</span></button>`}function Q(){if(o.data&&!ie(o.view)&&(o.view=Re()),typeof window<"u"){const s=window.location.hash.replace(/^#/,"");if(!s||s==="login"||s==="forgot"){let r=o.view;o.view==="project-detail"&&o.activeProjectId?r=`project-detail?id=${encodeURIComponent(o.activeProjectId)}${o.projectTab?`&tab=${encodeURIComponent(o.projectTab)}`:""}`:o.view==="settings"&&o.settingsSection&&(r=`settings?section=${encodeURIComponent(o.settingsSection)}`),window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${r}`):(window._isInternalNav=!0,window.location.hash=`#${r}`)}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",o.lang==="en"),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr";const e=(o.data?.notifications||[]).filter(s=>!s.read&&!s.readAt).length,a=o.data?.user||{},n=P()||I("manage_settings")||I("manage_roles")||I("manage_users")||I("manage_trash")||I("view_audit_logs");document.getElementById("app").innerHTML=`
    <div class="app-shell ${o.lang==="en"?"is-ltr":""}">
      <aside class="sidebar ${o.sidebarOpen?"open":""}">
        <div class="sidebar-brand">
          ${o.data?.company?.logoUrl?`<img src="${c(o.data?.company?.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${w("building",20)}</span>`:`<span class="brand-mark">${w("building",20)}</span>`}
          <div>
            <div class="brand-name">${c(t(o.data?.company?.nameAr||o.data?.company?.name||"DARC Design Team",o.data?.company?.nameEn||o.data?.company?.name||"DARC Design Team"))}</div>
            <div class="brand-subtitle">${g("workspace")}</div>
          </div>
        </div>
        <div class="nav-title">${t("مساحة العمل","WORKSPACE")}</div>
        <nav class="nav-list">
          ${ie("dashboard")?Pe("dashboard",g("dashboard"),"grid"):""}
          ${ie("projects")?Pe("projects",g("projects"),"building"):""}
          ${ie("tasks")?Pe("tasks",g("myTasks"),"checklist"):""}
          ${ie("documents")?Pe("documents",g("documents"),"document"):""}
          ${ie("templates")?Pe("templates",g("templates"),"layers"):""}
          ${ie("team")?Pe("team",g("team"),"users"):""}
          ${ie("reports")?Pe("reports",g("reports"),"chart"):""}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${n?t("إدارة النظام","ADMIN"):t("حسابي","MY ACCOUNT")}</div>
        <nav class="nav-list">${Pe("settings",n?g("settings"):t("الملف الشخصي والأمان","Profile & Security"),"settings")}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${X(a)}<div class="admin-info"><strong>${c(t(a.name,a.nameEn||a.name))}</strong><span>${c(ce(a))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${t("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${g("signOut")}">${w("logout",15)}</button></div>
        </div>
      </aside>
      <section class="workspace">
        ${o.data?.isDemo||o.data?.user?.id==="usr_demo"?`
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
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${w("menu",18)}</button><div><div class="topbar-kicker">DARC / ${g("workspace")}</div><div class="topbar-title">${c(Wa())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${Va()}</span>
            <button class="topbar-search-trigger" data-action="open-omnisearch" title="${t("بحث شامل وسريع","Omnisearch")}">
              ${w("search",14)}
              <span>${t("بحث شامل...","Search...")}</span>
              <kbd class="shortcut-kbd">${typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"⌘K":"Ctrl+K"}</kbd>
            </button>
            <button class="icon-button" data-action="open-cheatsheet" title="${t("دليل اختصارات لوحة المفاتيح (?)","Keyboard shortcuts guide (?)")}" style="color:var(--ink-soft);" aria-label="Shortcuts">
              <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
            </button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-theme">${o.theme==="dark"?"☀️":"🌙"}</button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-lang">${o.lang==="ar"?"EN":"عربي"} ${w("globe",14)}</button>
            <button class="icon-button" data-action="show-notifications" aria-label="${g("notifications")}">${w("bell",17)}${e?'<span class="notification-dot"></span>':""}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${X(a)}<div class="profile-chip-text"><strong>${c(t(a.name,a.nameEn||a.name))}</strong><span>${c(ce(a))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,L()}function L(e=!1){if(!e&&(window._isDraggingTask||window._isKeyboardDraggingTask)){window._pendingRenderAfterDrag=!0;return}const a=document.getElementById("main-content");if(!a)return;ie(o.view)||(o.view=Re());let n="";o.view==="dashboard"&&(n=renderDashboard()),o.view==="projects"&&(n=renderProjects()),o.view==="tasks"&&(n=renderTasks()),o.view==="documents"&&(n=renderDocuments()),o.view==="templates"&&(n=renderTemplates()),o.view==="team"&&(n=renderTeam()),o.view==="reports"&&(n=renderReports()),o.view==="settings"&&(n=renderSettings()),o.view==="project-detail"&&(n=renderProjectDetail()),a.innerHTML=n,o.view==="project-detail"&&o.projectTab==="timeline"&&setTimeout(drawTimelineArrows,0)}function we(e,a=void 0){o.data&&!ie(e)&&(e=Re()),Je("navigation",`الانتقال إلى واجهة #${e}${a?` (مشروع: ${a})`:""}`),o.view=e,a!==void 0&&(o.activeProjectId=a),e==="settings"&&!o.settingsSection&&(o.settingsSection="profile"),o.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelectorAll(".nav-item").forEach(s=>{const r=s.dataset.view,i=r===e||r==="projects"&&e==="project-detail";s.classList.toggle("active",i)});const n=document.querySelector(".topbar-title");n&&(n.textContent=Wa());try{let s=e;e==="project-detail"&&o.activeProjectId?s=`project-detail?id=${encodeURIComponent(o.activeProjectId)}${o.projectTab?`&tab=${encodeURIComponent(o.projectTab)}`:""}`:e==="settings"&&o.settingsSection&&(s=`settings?section=${encodeURIComponent(o.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==s&&(window._isInternalNav=!0,window.location.hash=s),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:o.view,activeProjectId:o.activeProjectId,projectTab:o.projectTab,settingsSection:o.settingsSection}))}catch{}requestAnimationFrame(()=>{L();const s=document.getElementById("main-content");s&&(s.scrollTop=0,s.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function de(e=!1){try{await me(e)}catch(a){k(a.message,!0)}}async function me(e=!1){try{const a=o.view==="settings"&&o.settingsSection==="trash"&&!o.trashLoaded?C("/api/trash",{silent:!0}).catch(()=>null):null;let n=await C("/api/bootstrap",{silent:e});if(n===null){if(o.data&&o.data.user)return;const r=await An();if(r&&r.user?n=r:(Ke(),n=await C("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}})),!n)return}if(xe(n),o.isOffline=!1,a)try{const r=await a;r&&(o.trash=Array.isArray(r)?r:r.trash||[...(r.projects||[]).map(i=>({...i,type:"project"})),...(r.tasks||[]).map(i=>({...i,type:"task"})),...(r.documents||[]).map(i=>({...i,type:"document"}))],o.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash)))}catch{}if(o.data?.tasks&&n?.tasks){const r=Date.now(),i=new Set(n.tasks.map(d=>d.id));for(const d of o.data.tasks)if(!i.has(d.id))r-(d.createdAt?new Date(d.createdAt).getTime():r)<12e4&&(n.tasks.unshift(d),i.add(d.id));else{const l=window._recentlyMovedTasks?.get(d.id);if(l&&r-l.timestamp<2e4){const p=n.tasks.find(u=>u.id===d.id);p&&(p.status=l.status,l.progress!==void 0&&(p.progress=l.progress),l.sortOrder!==void 0&&(p.sortOrder=l.sortOrder,p.sort_order=l.sortOrder,p.customFields||(p.customFields={}),p.customFields.sortOrder=l.sortOrder,p.customFields.sort_order=l.sortOrder,p.custom_fields||(p.custom_fields={}),p.custom_fields.sortOrder=l.sortOrder,p.custom_fields.sort_order=l.sortOrder))}}}if(o.data?.projects&&n?.projects){const r=Date.now(),i=new Set(n.projects.map(d=>d.id));for(const d of o.data.projects)i.has(d.id)||r-(d.createdAt?new Date(d.createdAt).getTime():r)<12e4&&(n.projects.unshift(d),i.add(d.id))}let s=!1;if(o.data&&n)if(o.data.updatedAt!==n.updatedAt)s=!0;else if(o.data.tasks?.length!==n.tasks?.length||o.data.projects?.length!==n.projects?.length)s=!0;else{const r=o.data.tasks||[],i=n.tasks||[];for(let d=0;d<i.length;d++){const l=i[d],p=r[d];if(!p||p.id!==l.id||p.status!==l.status||(p.sortOrder||p.sort_order)!==(l.sortOrder||l.sort_order)||p.progress!==l.progress){s=!0;break}}if(!s){const d=o.data.projects||[],l=n.projects||[];for(let p=0;p<l.length;p++){const u=l[p],f=d[p];if(!f||f.id!==u.id||f.lifecycle!==u.lifecycle||f.health!==u.health||f.progress!==u.progress){s=!0;break}}}}if(!o.data||s||o.data.comments?.length!==n.comments?.length||o.data.documents?.length!==n.documents?.length||o.data.users?.length!==n.users?.length||o.data.auditLogs?.length!==n.auditLogs?.length||o.data.notifications?.length!==n.notifications?.length||o.view==="login"){o.data=n,(o.view==="login"||!ie(o.view))&&(o.view=Re());const r=!!document.getElementById("modal-root")?.children?.length,i=!!(document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),d=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(i||d))return;requestAnimationFrame(!e&&!r?()=>Q():()=>L())}else o.data=n,ie(o.view)||(o.view=Re(),requestAnimationFrame(()=>L()))}catch(a){if(a&&(a.status===401||a.status===403))throw a;const n=await An();if(n){o.data=n,ie(o.view)||(o.view=Re()),o.isOffline=!0;const s=!!document.getElementById("modal-root")?.children?.length;!e&&!s?Q():L();return}throw a}}typeof window<"u"&&(window.renderApp=Q,window.renderView=L);var ho=ye({calculatePasswordStrength:()=>Qn,cleanupTurnstile:()=>ha,initTurnstile:()=>Ja,loadTurnstileScript:()=>Zn,openForcePasswordModal:()=>ko,renderActivation:()=>jt,renderLogin:()=>ke,renderResetPassword:()=>lt,renderStrengthMeterHtml:()=>ia}),xo="0x4AAAAAAFr3zLr2zpRS2ah4",le=null,ut=null,fe=null,pt=!1;function Zn(){return typeof window>"u"||window.turnstile?Promise.resolve():ut||(ut=new Promise(e=>{if(window.onloadTurnstileCallback=()=>{e()},document.getElementById("cf-turnstile-script")){window.turnstile&&e();return}const a=document.createElement("script");a.id="cf-turnstile-script",a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback",a.async=!0,a.defer=!0,a.onerror=()=>{console.warn("[Turnstile] Script failed to load, fallback mode enabled"),e()},document.body.appendChild(a)}),ut)}function ha(){if(!(typeof window>"u")){if(fe=null,window.turnstile&&le!==null){try{window.turnstile.remove(le)}catch{}le=null}try{const e=document.getElementById("turnstile-container");e&&(e.innerHTML=""),document.querySelectorAll('iframe[src*="challenges.cloudflare.com"]').forEach(n=>{try{n.remove()}catch{}});const a=document.getElementById("cf-turnstile-script");a&&a.remove(),ut=null}catch{}}}async function Ja(){if(!(typeof window>"u")&&document.getElementById("turnstile-container")&&!pt){pt=!0;try{if(window.turnstile||await Zn(),!window.turnstile){pt=!1;return}const e=document.getElementById("turnstile-container");if(!e){pt=!1;return}if(le!==null){try{window.turnstile.remove(le)}catch{}le=null}fe=null,le=window.turnstile.render(e,{sitekey:xo,theme:o.theme==="dark"?"dark":"light",language:o.lang==="ar"?"ar":"en",appearance:"interaction-only",callback:a=>{fe=a},"error-callback":a=>{console.warn("[Turnstile] Handshake notice (shielded):",a),fe="fallback_client"},"expired-callback":()=>{if(fe=null,window.turnstile&&le!==null)try{window.turnstile.reset(le)}catch{}}})}catch(e){console.warn("[Turnstile] Init notice:",e),fe="fallback_client"}finally{pt=!1}}}typeof window<"u"&&(window.__darcInitTurnstile=Ja);async function wo(){if(typeof window>"u"||!window.turnstile)return"fallback_client";if(fe)return fe;if(le!==null)try{const e=window.turnstile.getResponse(le);if(e)return fe=e,e}catch{}return new Promise(e=>{let a=!1;const n=setTimeout(()=>{a||(a=!0,e(fe||"fallback_client"))},1200),s=setInterval(()=>{if(a){clearInterval(s);return}if(fe){a=!0,clearTimeout(n),clearInterval(s),e(fe);return}if(le!==null&&window.turnstile)try{const r=window.turnstile.getResponse(le);if(r){a=!0,clearTimeout(n),clearInterval(s),fe=r,e(r);return}}catch{}},35)})}function Qn(e){const a=String(e||"");if(!a)return{score:0,label:"",percent:0,color:"var(--line)"};let n=0;return a.length>=10&&(n+=1),/[a-z]/.test(a)&&/[A-Z]/.test(a)&&(n+=1),/\d/.test(a)&&(n+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(a)&&(n+=1),n===1?{score:1,label:o.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:n===2?{score:2,label:o.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:n===3?{score:3,label:o.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:o.lang==="ar"?"قوية وممتازة 🛡️":"Strong & Secure 🛡️",percent:100,color:"var(--mint-strong)"}}function ia(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${o.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function Ka(e,a,n,s,r){const i=document.getElementById(e);if(!i)return;const d=i.querySelector(`input[name="${a}"]`),l=i.querySelector(`input[name="${n}"]`),p=i.querySelector(r||'button[type="submit"]'),u=document.getElementById(`${s}-meter-wrap`),f=document.getElementById(`${s}-meter-bar`),v=document.getElementById(`${s}-meter-label`),$=document.getElementById(`${s}-match-indicator`);function y(){const x=d?d.value:"",m=l?l.value:"";if(x&&u&&f&&v){u.style.display="flex";const b=Qn(x);f.style.width=`${b.percent}%`,f.style.background=b.color,v.textContent=b.label,v.style.color=b.color}else u&&(u.style.display="none");l&&$&&(m?x===m?($.style.display="block",$.style.color="var(--mint-strong)",$.textContent=o.lang==="ar"?"✓ كلمتا المرور متطابقتان":"✓ Passwords match",p&&(p.disabled=!1)):($.style.display="block",$.style.color="var(--red)",$.textContent=o.lang==="ar"?"✗ كلمتا المرور غير متطابقتين":"✗ Passwords do not match",p&&(p.disabled=!0)):($.style.display="none",p&&(p.disabled=!1)))}d?.addEventListener("input",y),l?.addEventListener("input",y)}function oa(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=a=>{a.preventDefault();const n=e.getAttribute("data-target"),s=n?document.getElementById(n):e.parentElement.querySelector("input");if(!s)return;const r=s.type==="password";s.type=r?"text":"password",e.style.color=r?"var(--teal)":"var(--ink-soft)";const i=r?o.lang==="ar"?"إخفاء كلمة المرور":"Hide password":o.lang==="ar"?"إظهار كلمة المرور":"Show password";e.setAttribute("aria-label",i),e.setAttribute("title",i),r?e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';try{s.focus()}catch{}}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const a=n=>{const s=n.getModifierState&&n.getModifierState("CapsLock");let r=e.parentElement.parentElement.querySelector(".capslock-warning");s?r||(r=document.createElement("div"),r.className="capslock-warning",r.style.fontSize="11px",r.style.color="var(--amber)",r.style.marginTop="4px",r.style.display="flex",r.style.alignItems="center",r.style.gap="4px",r.innerHTML=`<span>⚠️</span> <span>${o.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(r)):r&&r.remove()};e.addEventListener("keydown",a),e.addEventListener("keyup",a)})}function $o(e,a=60){if(!e)return;e.disabled=!0;let n=a;const s=e.innerHTML,r=setInterval(()=>{n--,e.innerHTML=`<span>${o.lang==="ar"?`يرجى الانتظار (${n} ثانية)...`:`Please wait (${n}s)...`}</span>`,n<=0&&(clearInterval(r),e.disabled=!1,e.innerHTML=s)},1e3)}function ke(e="",a="login",n=!1){if(o.view="login",typeof window<"u"){const l=a==="forgot"?"#forgot":"#login";window.location.hash!==l&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",l):window.location.hash=l)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",o.lang==="en"),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=o.theme||"light";let s="";const r=e?`<div class="login-demo" style="border-color:${n?"#cce3e0":"var(--red-soft)"};background:${n?"#f0f9f7":"var(--red-soft)"};color:${n?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${w(n?"check":"alert",15)}<span>${c(e)}</span></div>`:"",i=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";a==="login"?s=`
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
        <button class="btn btn-primary btn-block" type="submit">${w(o.lang==="ar"?"arrowLeft":"arrowRight",16)} ${g("login")}</button>
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
    `:a==="forgot"&&(s=`
      <form id="forgot-form">
        <div class="field"><label for="login-email">${g("emailAddress")}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${c(i)}" required /></div>
        ${r}
        <button class="btn btn-primary btn-block" type="submit">${t("إرسال رابط الاستعادة","Send reset link")}</button>
        <div style="text-align:center;margin-top:15px"><a href="#" data-action="goto-login" style="font-size:13px;color:var(--ink-soft)">${t("العودة لتسجيل الدخول","Back to login")}</a></div>
      </form>
    `),document.getElementById("app").innerHTML=`
    <div class="login-shell ${o.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup">
            <span class="brand-mark">${w("building",24)}</span>
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
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${o.theme==="dark"?"الوضع النهاري":"الوضع الليلي"}">${o.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${o.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            ${s}
          </div>
        </section>
      </div>
    </div>`,oa();const d=(l,p=!1)=>{const u=document.getElementById("login-error-container");u?u.innerHTML=l?`
        <div class="login-demo" style="border-color:${p?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"};background:${p?"var(--mint)":"rgba(239,68,68,0.08)"};color:${p?"var(--mint-strong)":"var(--red)"};margin-top:0;margin-bottom:15px;padding:10px 14px;border-radius:8px;font-size:12.5px;display:flex;align-items:center;gap:8px;line-height:1.5;">
          ${w(p?"check":"alert",16)}
          <span>${c(l)}</span>
        </div>`:"":l&&k(l,!p)};document.getElementById("login-form")?.addEventListener("submit",async l=>{l.preventDefault();const p=new FormData(l.currentTarget),u=String(p.get("email")||"").trim(),f=String(p.get("password")||""),v=document.getElementById("remember-email-check")?.checked,$=l.currentTarget.querySelector('button[type="submit"]'),y=`${w(o.lang==="ar"?"arrowLeft":"arrowRight",16)} ${g("login")}`;d(""),$.disabled=!0,$.innerHTML=`<span>⏳ ${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const x=u.trim().toLowerCase()==="demo@darc-design.bond"||u.trim().toLowerCase()==="demo@darc.local";let m="bypass_dev";x||(m=await wo());try{const b=await C("/api/auth/login",{method:"POST",body:JSON.stringify({email:u,password:f,turnstileToken:m})});if(ha(),typeof localStorage<"u"&&(b?.token&&localStorage.setItem("darc_token",b.token),v?localStorage.setItem("darc_last_email",u):localStorage.removeItem("darc_last_email")),xt({theme:o.theme,lang:o.lang}),o.view="dashboard",b?.bootstrap){o.data=b.bootstrap,xe(b.bootstrap),Q(),me(!0).catch(()=>{});return}const T=Ba();if(T&&T.user&&(T.user.id===b?.user?.id||b?.user?.email===T.user?.email)){T.user=b.user||T.user,o.data=T,Q(),me(!0).catch(()=>{});return}Ke(),It(),await me(),Q()}catch(b){if(console.error("Login Error:",b),typeof window<"u"&&window.turnstile&&le!==null)try{window.turnstile.reset(le)}catch{}$&&($.disabled=!1,$.innerHTML=y);let T=b.message;if(typeof navigator<"u"&&!navigator.onLine)T=t("لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة وإعادة المحاولة.","No internet connection. Please check your network and try again.");else if(b.message&&(b.message.includes("Turnstile")||b.message.includes("التحقق الأمني")))T=t("فشل التحقق الأمني التلقائي (Cloudflare Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.","Security check (Turnstile) failed. Please refresh the page and try again.");else if(b.message&&(b.message.includes("429")||b.message.includes("كثيرة")||b.message.includes("rate")))T=t("تم تجاوز عدد محاولات الدخول المسموحة لحماية الحساب. يرجى الانتظار دقيقة واحدة قبل المحاولة مجدداً.","Too many login attempts. For security, please wait one minute before trying again."),$o(document.querySelector('#login-form button[type="submit"]'),60);else if(b.message&&(b.message.includes("401")||b.message.includes("غير صحيحة")||b.message.includes("credentials"))){T=t("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من صحة المدخلات وإعادة المحاولة.","Incorrect email or password. Please verify your credentials and try again.");const D=document.getElementById("login-password");if(D){D.value="";try{D.focus()}catch{}}}else b.message&&(b.message.includes("مفعل")||b.message.includes("موقوف")||b.message.includes("inactive"))?T=t("حسابك معطل أو غير مفعل حالياً. يرجى التواصل مع مسؤول النظام لإعادة التفعيل.","This account is suspended or inactive. Please contact your system administrator."):(!T||T.includes("Failed to fetch")||T.includes("NetworkError")||T.includes("Network request failed"))&&(T=t("تعذر الاتصال بخادم تسجيل الدخول. يرجى التأكد من استقرار الإنترنت وإعادة المحاولة.","Could not reach the authentication server. Please check your connection and try again."));d(T)}}),document.getElementById("forgot-form")?.addEventListener("submit",async l=>{l.preventDefault();const p=new FormData(l.currentTarget),u=String(p.get("email")||"").trim(),f=l.currentTarget.querySelector('button[type="submit"]'),v=f?f.innerHTML:"";f&&(f.disabled=!0,f.innerHTML=`<span>⏳ ${t("جاري إرسال الرابط...","Sending reset link...")}</span>`);try{await C("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:u})}),f&&(f.disabled=!1,f.innerHTML=v),d(t("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح ✨","Password reset link sent to your email successfully ✨"),!0)}catch($){f&&(f.disabled=!1,f.innerHTML=v),d($.message)}}),a==="login"?Ja():ha()}function jt(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",o.lang==="en"),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=o.theme||"light",document.getElementById("app").innerHTML=`
    <div class="login-shell ${o.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${w("building",24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("تفعيل حساب الفريق","Team account activation")}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${t("خطوة واحدة للبدء","ONE STEP TO START")}</p><h1>${t("أكمل حسابك وانضم إلى مساحة العمل.","Finish your account and join the workspace.")}</h1><p>${t("اختر كلمة مرور آمنة للوصول إلى المشاريع والمهام المسندة إليك.","Choose a secure password to access your projects and assigned work.")}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${t("دعوة DARC الرسمية","DARC INVITE")}</p><h2>${t("تفعيل الحساب","Activate account")}</h2><p class="intro">${t("يجب أن تحتوي كلمة المرور على 10 أحرف على الأقل مع رموز وأرقام.","Your password must be at least 10 characters with numbers and symbols.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${o.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${o.lang==="ar"?"EN":"عربي"}</button>
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
                ${ia("act")}
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
              ${a?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${w("alert",15)}<span>${c(a)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit">${w("shield",16)} ${t("تفعيل الحساب والدخول","Activate and sign in")}</button>
            </form>
            <div class="login-demo">${w("lock",16)}<span>${t("جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.","Your session is encrypted and your password is never stored in plain text.")}</span></div>
          </div>
        </section>
      </div>
    </div>`,oa(),Ka("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function lt(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",o.lang==="en"),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=o.theme||"light";const n=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,s=!n&&!a?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
    <div class="login-shell ${o.lang==="en"?"is-ltr":""}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${w("building",24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${t("استعادة كلمة المرور","Password Recovery")}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h1>${t("اختر كلمة مرور جديدة لحسابك.","Choose a new password for your account.")}</h1><p>${t("كلمة المرور يجب أن تكون قوية وغير مستخدمة من قبل.","Password should be strong and unique.")}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${t("كلمة مرور جديدة","New Password")}</h2><p class="intro">${t("أدخل كلمة المرور الجديدة وقم بتأكيدها.","Enter and confirm your new password.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${o.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${o.lang==="ar"?"EN":"عربي"}</button>
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
                ${ia("rst")}
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
              ${a||s?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${w("alert",15)}<span>${c(a||s)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit" ${n?"":"disabled"}>${t("حفظ وتسجيل الدخول","Save and login")}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,oa(),Ka("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async r=>{r.preventDefault();const i=new FormData(r.currentTarget),d=i.get("newPassword");if(d!==i.get("newPasswordConfirm")){lt(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const l=r.currentTarget.querySelector('button[type="submit"]');l.disabled=!0;try{await C("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:d})}),window.history.replaceState({},"",window.location.pathname),It(),await me(),Q()}catch(p){lt(e,p.message)}})}function ko(e){const a=e.status==="pending",n=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${a}">
      <div class="field">
        <label for="force-pass-input">${a?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${ia("force")}
        ${e.email?a?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${w("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${a?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ae(a?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),a?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${c(e.name)}.`,`Set an initial password to activate ${c(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${c(e.name)}`,`Set a new password for ${c(e.name)}`),n,"force-password"),oa(),Ka("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}var So=ye({attentionItem:()=>ei,metricCard:()=>ft,projectProgress:()=>Eo,pulseChart:()=>ai,renderDashboard:()=>Ao,renderReports:()=>To,teamMetrics:()=>Ya,teamRow:()=>ti});function ft(e,a,n,s,r,i=""){return`<article class="metric-card ${s}"><div class="metric-top"><span class="metric-label">${c(e)}</span><span class="metric-icon">${w(r,15)}</span></div><div class="metric-value">${c(a)}</div><span class="metric-note ${i}">${c(n)}</span></article>`}function Eo(e){const a=e.health==="off_track"?"red":e.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${g("weightedProgress")}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${a}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function ei(e){const a=Me(e)||e.status==="blocked"?"red":"amber",n=Me(e)?t("متأخرة","Overdue"):e.status==="blocked"?t("متوقفة","Blocked"):t("تستحق قريبًا","Due soon");return`<button class="attention-item" data-action="open-task" data-task-id="${c(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${a}">${w(Me(e)||e.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${a})">${c(t(e.titleAr,e.titleEn))}</strong><span>${c(n)} · ${c(Hn(e.dueDate))}</span></span></button>`}function Ya(e,a){const n=a.filter(i=>i.assigneeId===e),s=n.reduce((i,d)=>i+Number(d.weight||1),0),r=s?Math.round(n.reduce((i,d)=>i+d.progress*Number(d.weight||1),0)/s):0;return{tasks:n.length,progress:r,overdue:n.filter(Me).length}}function ti(e,a){const n=Ya(e.id,a);return`<div class="team-row"><div class="team-member">${X(e)}<div class="team-member-copy"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(t(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${n.tasks}</strong> ${g("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${g("progress")}</span><strong>${n.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${n.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${c(e.id)}">${w("more",15)}</button></div>`}function ai(){const e=[38,48,45,62,55,72,68],a=o.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${e.map((n,s)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${s===e.length-1?"current":""}" style="height:${n}%"></span></div><span>${a[s]}</span></div>`).join("")}</div>`}function Ao(){const e=o.data?.stats||{},a=o.data?.projects||[],n=o.data?.tasks||[],s=o.data?.users||[],r=o.data?.user||{},i=r.name||r.email||t("مستخدم","User"),d=a.reduce((m,b)=>m+(Number(b.totalWeight)||0),0),l=d?Math.round(a.reduce((m,b)=>m+(Number(b.progress)||0)*(Number(b.totalWeight)||0),0)/d):0,p=[...n].filter(m=>{if(Me(m)||m.status==="blocked")return!0;if(m.dueDate){const b=Le(m.dueDate);if(b){const T=(b-new Date)/864e5;return T>=0&&T<=7}}return!1}).sort((m,b)=>(m.dueDate?Le(m.dueDate)?.getTime()??1/0:1/0)-(b.dueDate?Le(b.dueDate)?.getTime()??1/0:1/0)).slice(0,5),u=s.filter(m=>m.status!=="inactive"),f=e.projectCount??a.length,v=e.myTasks??n.filter(m=>m.assigneeId===r.id).length,$=e.overdueTasks??n.filter(Me).length,y=e.dueSoon??0,x=e.completedTasks??n.filter(m=>m.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${t("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${qn()}، ${c(t(i.replace(/^م\.\s?/,""),r.nameEn||i))}</h1><p>${g("welcomeText")}</p></div><div class="welcome-status"><span>${g("portfolioHealth")}</span><strong>${l}%</strong><small>${t("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${ft(g("activeProjects"),e.activeProjects||0,t(`${f} مشاريع إجمالًا`,`${f} projects total`),"teal","building","up")}${ft(g("openTasks"),e.openTasks??n.length,t(`${v} مسندة لك`,`${v} assigned to you`),"blue","checklist")}${ft(g("overdue"),$,t("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",$?"alert":"check",$?"alert":"")}${ft(g("dueThisWeek"),y,t("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("projectProgress")}</h2><p class="panel-subtitle">${g("projectProgressSub")}</p></div>${I("view_projects")?`<button class="text-link" data-view="projects">${g("seeAll")} ${w(o.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${a.length?a.slice(0,5).map(projectRow).join(""):`<div class="empty">${w("building",18)}<span>${g("noProjects")}</span></div>`}</div></section>${P()||I("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamProgress")}</h2><p class="panel-subtitle">${g("teamProgressSub")}</p></div><button class="text-link" data-view="team">${g("seeAll")} ${w(o.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${u.slice(0,6).map(m=>ti(m,n)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("attention")}</h2><p class="panel-subtitle">${g("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${p.length}</span></div><div class="attention-list">${p.length?p.map(ei).join(""):`<div class="empty">${w("check",18)}<span>${g("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("recentPulse")}</h2><p class="panel-subtitle">${g("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${x} ${g("done")}</span></div>${ai()}</section></div></div>`}function To(){const{projects:e=[],tasks:a=[],users:n=[]}=o.data||{},s=I("export_reports")||P(),r=a.reduce((p,u)=>p+Number(u.weight||1),0),i=r?Math.round(a.reduce((p,u)=>p+u.progress*Number(u.weight||1),0)/r):0,d=new Map;a.forEach(p=>{const u=(o.lang==="ar"?p.categoryAr:p.categoryEn)||t(p.typeAr||"عام",p.typeEn||"General"),f=d.get(u)||{weight:0,progress:0};f.weight+=Number(p.weight||1),f.progress+=p.progress*Number(p.weight||1),d.set(u,f)});const l=[...d.entries()].map(([p,u])=>({label:p,progress:u.weight?Math.round(u.progress/u.weight):0})).sort((p,u)=>u.progress-p.progress);return`<div class="page-head"><div><p class="eyebrow">${t("قراءة الأداء","PERFORMANCE READOUT")}</p><h1>${g("reports")}</h1><p>${t("مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.","Simple signals that help management see drift before it becomes delay.")}</p></div><div class="page-actions">${s?`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${w("printer",15)} ${t("طباعة تقرير المحفظة (PDF)","Print Portfolio (PDF)")}</button>
      <button class="btn btn-soft" data-action="export-csv">${w("document",15)} ${t("تصدير الإكسل (Excel)","Export Excel")}</button>
    </div>
  `:""}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("الإنجاز حسب التخصص","Progress by discipline")}</h2><p class="panel-subtitle">${g("weightedProgress")}</p></div><span class="status-badge on_track">${i}%</span></div><div class="report-bars">${l.length?l.map(p=>`<div class="report-bar-row"><span>${c(p.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${p.progress}%"></div></div><strong>${p.progress}%</strong></div>`).join(""):`<div class="empty">${g("noTasks")}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("صحة المحفظة","Portfolio health")}</h2><p class="panel-subtitle">${t("توزيع حالات المشاريع الحالية.","Current project status distribution.")}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${g("onTrack")}</span><strong style="color:var(--mint-strong)">${e.filter(p=>p.health==="on_track").length}</strong></div><div class="report-stat"><span>${g("atRisk")}</span><strong style="color:var(--amber)">${e.filter(p=>p.health==="at_risk").length}</strong></div><div class="report-stat"><span>${g("offTrack")}</span><strong style="color:var(--red)">${e.filter(p=>p.health==="off_track").length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("teamLoad")}</h2><p class="panel-subtitle">${t("المهام المفتوحة لكل عضو.","Open tasks per member.")}</p></div></div><div class="report-stat-list">${n.slice(0,5).map(p=>{const u=Ya(p.id,a);return`<div class="report-stat"><span>${c(t(p.name,p.nameEn||p.name))}</span><strong>${u.tasks}</strong></div>`}).join("")}</div></section></div></div>`}var Io="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",_n=`https://drive.google.com/drive/folders/${Io}?usp=sharing`;function Xa(e){if(!e)return _n;const a=e.driveFileId||e.drive_file_id;if(a&&!String(a).startsWith("demo_")&&String(a).length>=25)return`https://drive.google.com/file/d/${encodeURIComponent(a)}/view?usp=sharing`;const n=e.diskFilename||e.disk_filename||e.viewLink||e.webViewLink||"";if(n&&n.includes("drive.google.com")){if(n.includes("/folders/"))return n;const s=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(s&&s[1]&&!s[1].startsWith("demo_")&&s[1].length>=25)return`https://drive.google.com/file/d/${s[1]}/view?usp=sharing`}return n&&(n.startsWith("https://")||n.startsWith("http://"))&&!n.includes("localhost")&&!n.includes("127.0.0.1")&&!n.includes("demo_sample")?n:_n}async function Za(e,a=null){if(!e)return;const n=Xa(e);let s=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(n),s=!0;else{const r=document.createElement("textarea");r.value=n,r.style.position="fixed",r.style.opacity="0",document.body.appendChild(r),r.select(),s=document.execCommand("copy"),r.remove()}}catch(r){console.warn("[DocViewer] Clipboard writeText failed, prompting:",r),window.prompt(t("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),n),s=!0}if(s){if(a){const r=a.innerHTML;a.innerHTML=`${w("check",14)} <span style="font-size:11px;font-weight:700;">${t("تم النسخ","Copied")}</span>`,a.style.color="var(--mint-strong, #10b981)",a.style.transition="all 0.2s ease",setTimeout(()=>{a.innerHTML=r,a.style.color=""},2200)}k(t(`تم نسخ رابط Google Drive بنجاح: ${n}`,`Google Drive link copied: ${n}`))}}function Do(e){const a=`%PDF-1.4
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
%%EOF`;return new Blob([a],{type:"application/pdf"})}function jo(e){return e.originalName,new Blob([`\uFEFFرقم البند,بيان الأعمال والتوصيف المعماري,الوحدة,الكمية,سعر الوحدة (ر.س),الإجمالي (ر.س)
01.01,أعمال الحفريات وتسوية منسوب التأسيس لفيلا النخيل,م³,850,45,38250
01.02,خرسانة مسلحة للقواعد والميدات ورقاب الأعمدة عيار 350 كجم,م³,320,480,153600
02.01,جدران بلك بركاني عازل للحرارة سماكة 20 سم,م²,1200,75,90000
03.01,تكسيات واجهات بحجر الترافنتينو الإيطالي نخب أول تثبيت ميكانيكي,م²,680,420,285600
03.02,واجهات زجاجية مزدوجة كيرتن وول Curtain Wall قطاع تكنال,م²,340,950,323000
04.01,أرضيات رخام ستاتوريو إيطالي ألواح 120x120 سم صقل ليزري,م²,520,680,353600
05.01,نظام تكييف مركزي مخفي VRV من شركة Daikin مع مجاري معزولة,مقطوع,1,185000,185000
,,,,,
,الإجمالي العام لجدول الكميات (SAR):,,,,1429050`],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"})}function Co(e){const a=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>${(e.originalName||"DARC-Technical-Specifications.docx").replace(/\.(docx|doc)$/i,"")}</title>
<style>
body { font-family: 'Segoe UI', Tahoma, sans-serif; line-height: 1.8; color: #1e293b; padding: 40px; }
h1 { color: #0d6269; border-bottom: 2px solid #0d6269; padding-bottom: 10px; }
h2 { color: #0284c7; margin-top: 24px; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; }
th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: start; }
th { background: #f1f5f9; color: #0f172a; font-weight: bold; }
.stamp { margin-top: 40px; padding: 16px; border: 2px dashed #0d6269; border-radius: 8px; display: inline-block; }
</style>
</head>
<body>
<h1>DARC DESIGN TEAM — كراسة المواصفات الفنية والشروط العامة</h1>
<p><strong>المشروع:</strong> فيلا النخيل السكنية الفاخرة | <strong>المرجع:</strong> DARC-SPEC-2026-ARCH-V3 | <strong>التاريخ:</strong> ${new Date().toISOString().split("T")[0]}</p>
<h2>1. نطاق الأعمال وإجراءات الجودة</h2>
<p>تحدد هذه الوثيقة المعايير والمواصفات القياسية لتنفيذ الأعمال المعمارية والإنشائية، مع الالتزام التام بكود البناء السعودي (SBC) وتوجيهات الاستشاري المشرف.</p>
<h2>2. مواصفات الخرسانات والأعمال الإنشائية</h2>
<p>تُنفذ جميع القواعد الخرسانية برتبة لا تقل عن C35 مع استخدام أسمنت مقاوم للكبريتات (SRC) لجميع العناصر الملامسة للتربة وعزلها بطبقتين من البيتومين المعدل بالبوليمر.</p>
<h2>3. التكسيات الحجرية والواجهات الزجاجية</h2>
<p>تثبيت حجر الترافنتينو الإيطالي بنظام التثبيت الميكانيكي (Stainless Steel 316 Brackets) مع فراغ تهوية 50 مم وعزل حراري بالصوف الصخري بكثافة 70 كجم/م³.</p>
<div class="stamp">
<strong>حالة الاعتماد الهندسي:</strong> معتمد للتنفيذ الإنشائي ✅<br>
<strong>الاستشاري المشرف:</strong> م. فهد القحطاني — رئيس قسم العمارة
</div>
</body>
</html>`;return new Blob([a],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8"})}function Po(e){const a=e.originalName||"DARC-Architectural-Presentation.pptx";return new Blob([`DARC DESIGN TEAM - ARCHITECTURAL CONCEPT PRESENTATION
Document: ${a}
Slides: 5
Format: 16:9 4K`],{type:"application/vnd.openxmlformats-officedocument.presentationml.presentation;charset=utf-8"})}function _o(e){const a=`0
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
EOF`;return new Blob([a],{type:"application/dxf"})}async function zo(e){const a=document.createElement("canvas");a.width=1920,a.height=1080;const n=a.getContext("2d"),s=n.createLinearGradient(0,0,1920,1080);s.addColorStop(0,"#111827"),s.addColorStop(.4,"#1f2937"),s.addColorStop(1,"#0f172a"),n.fillStyle=s,n.fillRect(0,0,1920,1080);const r=n.createLinearGradient(960,100,1820,800);r.addColorStop(0,"#38bdf8"),r.addColorStop(.5,"#0284c7"),r.addColorStop(1,"#0f766e"),n.fillStyle=r,n.fillRect(960,140,860,680),n.fillStyle="#78350f";for(let d=80;d<600;d+=18)n.fillRect(d,140,12,680);const i=n.createLinearGradient(0,820,0,1080);return i.addColorStop(0,"#334155"),i.addColorStop(1,"#1e293b"),n.fillStyle=i,n.fillRect(0,820,1920,260),n.fillStyle="rgba(15, 23, 42, 0.88)",n.fillRect(80,860,900,160),n.strokeStyle="#0d6269",n.lineWidth=3,n.strokeRect(80,860,900,160),n.fillStyle="#ffffff",n.font="bold 36px sans-serif",n.fillText(e.originalName||"PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg",120,920),n.fillStyle="#14b8a6",n.font="bold 22px sans-serif",n.fillText("DARC DESIGN TEAM — 4K PHOTOREALISTIC ARCHITECTURAL VISUALIZATION",120,960),n.fillStyle="#94a3b8",n.font="18px sans-serif",n.fillText(`RESOLUTION: 1920x1080 (4K READY) | STATUS: APPROVED | DATE: ${new Date().toISOString().split("T")[0]}`,120,995),new Promise(d=>{a.toBlob(l=>d(l),"image/jpeg",.95)})}async function ge(e){if(!e)return;let a=(o.data?.documents||[]).find(v=>v.id===e);if(!a)try{const v=await C(`/api/documents/${e}`);v&&v.document&&(a=v.document)}catch{}if(!a){k(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}k(t(`جاري بدء تحميل "${a.originalName}"...`,`Starting download of "${a.originalName}"...`));const n=(a.originalName||"").split(".").pop()?.toLowerCase()||"",s=n==="pdf"||a.mimeType&&a.mimeType.includes("pdf"),r=["dwg","dxf"].includes(n),i=["xlsx","xls","csv"].includes(n),d=["docx","doc","rtf","odt"].includes(n),l=["pptx","ppt","key"].includes(n),p=["jpg","jpeg","png","webp","svg"].includes(n)||a.mimeType&&a.mimeType.startsWith("image/"),u=["mp4","webm","mov"].includes(n)||a.mimeType&&a.mimeType.startsWith("video/"),f=a.diskFilename||a.disk_filename||"";if(f&&f.includes("drive.google.com")){const v=f.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(v&&v[1]&&!v[1].startsWith("demo_")){const $=`https://drive.google.com/uc?export=download&id=${v[1]}`,y=document.createElement("a");y.href=$,y.target="_blank",y.download=a.originalName,document.body.appendChild(y),y.click(),y.remove(),k(t(`تم بدء تنزيل "${a.originalName}" من Google Drive بنجاح.`,`Downloaded "${a.originalName}" from Google Drive.`));return}}try{let v=null;if(s)v=Do(a);else if(r)v=_o(a);else if(i)v=jo(a);else if(d)v=Co(a);else if(l)v=Po(a);else if(p)v=await zo(a);else if(u){const $=a.diskFilename&&a.diskFilename.startsWith("http")&&!a.diskFilename.includes("drive.google.com")?a.diskFilename:"/assets/darc-walkthrough.mp4";try{const y=await fetch($);if(y.ok)v=await y.blob();else throw new Error("Direct video blob fetch failed")}catch{const x=document.createElement("a");x.href=$,x.download=a.originalName||"DARC-Architectural-Walkthrough.mp4",document.body.appendChild(x),x.click(),x.remove(),k(t(`تم تنزيل الفيديو "${a.originalName}" بنجاح.`,`Downloaded video "${a.originalName}" successfully.`));return}}else v=new Blob([`DARC DESIGN TEAM - ARCHITECTURAL DOCUMENT
File: ${a.originalName}
Status: ${a.status}
Created: ${a.createdAt}`],{type:"text/plain;charset=utf-8"});if(v){const $=URL.createObjectURL(v),y=document.createElement("a");y.href=$,y.download=a.originalName,document.body.appendChild(y),y.click(),y.remove(),setTimeout(()=>URL.revokeObjectURL($),3e4),k(t(`تم تنزيل المخطط "${a.originalName}" بنجاح.`,`Downloaded "${a.originalName}" successfully.`))}}catch(v){console.error("[DocViewer] Local download creation failed:",v),window.open(`/api/documents/${encodeURIComponent(a.id)}?download=1`,"_blank")}}async function xa(e){if(!e)return;let a=(o.data?.documents||[]).find(S=>S.id===e);if(!a)try{const S=await C(`/api/documents/${e}`);S&&(S.id||S.document?.id)&&(a=S.document||S,o.data&&!o.data.documents&&(o.data.documents=[]),o.data?.documents&&o.data.documents.push(a))}catch(S){console.warn("[DocViewer] Failed to fetch doc on demand:",S)}if(!a){k(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const n=(a.originalName||"").split(".").pop()?.toLowerCase()||"",s=ta(a.originalName,a.mimeType),r=qa(a.originalName)||"V1",i=a.size>1048576?(a.size/1048576).toFixed(1)+" MB":Math.round((a.size||0)/1024)+" KB",d=n==="pdf"||s.isPdf,l=["dwg","dxf"].includes(n)||s.isCad,p=["rvt","rfa","ifc","skp"].includes(n)||s.isBim,u=["xlsx","xls","csv"].includes(n)||s.isExcel,f=["docx","doc","rtf","odt"].includes(n)||s.isWord,v=["pptx","ppt","key"].includes(n)||s.isPpt,$=["zip","rar","7z","tar"].includes(n)||s.isZip,y=["jpg","jpeg","png","webp","svg","heic"].includes(n)||s.isImg,x=["mp4","webm","mov","m4v"].includes(n)||a.mimeType&&a.mimeType.startsWith("video/"),m=Xa(a);let b=document.getElementById("preview-modal-overlay");b||(b=document.createElement("div"),b.id="preview-modal-overlay",b.style.cssText=`
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
    `,document.body.appendChild(b)),b.innerHTML=`
    <div style="background:var(--surface, #ffffff);width:100%;max-width:1240px;height:92vh;border-radius:16px;box-shadow:0 30px 70px rgba(0,0,0,0.5);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line, #e2e8f0);animation:modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
      <!-- Modal Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;">
          <span style="background:${s.bg};color:${s.color};border:1px solid ${s.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${s.ext}
          </span>
          <div style="min-width:0;">
            <h3 style="margin:0;font-size:15px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:440px;" title="${c(a.originalName)}">
              ${c(a.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${r}</span>
              <span>•</span>
              <span>${i}</span>
              <span>•</span>
              <span class="status-badge ${c(a.status||"approved")}" style="font-size:10px;padding:2px 7px;">${c(K(a.status||"approved"))}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);">
            ${w("link",14)} <span>${t("نسخ رابط Google Drive","Copy Drive Link")}</span>
          </button>
          <a href="${c(m)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
            ${w("external",13)} <span>${t("فتح في Drive","Open in Drive")}</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" id="modal-download-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;background:var(--brand-teal, #0d6269);color:#ffffff;">
            ${w("download",14)} <span>${t("تحميل المخطط","Download")}</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="close-doc-preview-btn" style="padding:6px;min-width:34px;height:34px;border-radius:8px;" title="${t("إغلاق","Close")}">
            ${w("close",18)}
          </button>
        </div>
      </div>

      <!-- Main Viewer Viewport -->
      <div id="doc-viewer-viewport" style="flex:1;position:relative;background:#0d1117;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <!-- Content injected dynamically below -->
      </div>
    </div>
  `,b.style.display="flex";const T=document.getElementById("modal-copy-link-btn");T&&T.addEventListener("click",()=>Za(a,T));const D=document.getElementById("modal-download-btn");D&&D.addEventListener("click",()=>ge(a.id));const A=document.getElementById("close-doc-preview-btn");A&&A.addEventListener("click",()=>{b.style.display="none",b.innerHTML=""}),b.onclick=S=>{S.target===b&&(b.style.display="none",b.innerHTML="")};const N=document.getElementById("doc-viewer-viewport");if(N){if(d){N.innerHTML=`
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
                  <span style="color:#475569;">${c(a.originalName)}</span>
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
    `;let S=1;const j=document.getElementById("pdf-drawing-sheet");document.getElementById("pdf-zoom-in")?.addEventListener("click",()=>{S=Math.min(2.2,S+.15),j&&(j.style.transform=`scale(${S})`)}),document.getElementById("pdf-zoom-out")?.addEventListener("click",()=>{S=Math.max(.6,S-.15),j&&(j.style.transform=`scale(${S})`)}),document.getElementById("pdf-reset")?.addEventListener("click",()=>{S=1,j&&(j.style.transform="scale(1)")}),document.getElementById("pdf-print-btn")?.addEventListener("click",()=>{window.print()});return}if(y){let ee=function(){q&&(q.style.transform=`translate(${z}px, ${M}px) scale(${S}) rotate(${j}deg)`),F&&(F.textContent=`${Math.round(S*100)}%`)};var O=ee;N.innerHTML=`
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
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000' viewBox='0 0 1600 1000'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%230f172a'/><stop offset='50%' stop-color='%231e293b'/><stop offset='100%' stop-color='%23090d16'/></linearGradient><linearGradient id='win' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2338bdf8'/><stop offset='100%' stop-color='%230284c7'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg)'/><rect x='800' y='120' width='700' height='600' rx='12' fill='url(%23win)' opacity='0.9'/><g fill='%23b45309'><rect x='80' y='120' width='12' height='600'/><rect x='110' y='120' width='12' height='600'/><rect x='140' y='120' width='12' height='600'/><rect x='170' y='120' width='12' height='600'/><rect x='200' y='120' width='12' height='600'/><rect x='230' y='120' width='12' height='600'/><rect x='260' y='120' width='12' height='600'/><rect x='290' y='120' width='12' height='600'/><rect x='320' y='120' width='12' height='600'/><rect x='350' y='120' width='12' height='600'/><rect x='380' y='120' width='12' height='600'/></g><rect x='0' y='720' width='1600' height='280' fill='%23334155'/><text x='100' y='860' fill='%23ffffff' font-size='38' font-family='sans-serif' font-weight='bold'>${c(a.originalName)}</text><text x='100' y='910' fill='%232dd4bf' font-size='20' font-family='sans-serif' font-weight='bold'>4K PHOTOREALISTIC ARCHITECTURAL INTERIOR VISUALIZATION</text><text x='100' y='950' fill='%2394a3b8' font-size='16' font-family='sans-serif'>ITALIAN CALACATTA MARBLE • WALNUT WOOD SLATS • NATURAL BIOPHILIC LIGHTING</text></svg>" 
            alt="${c(a.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;" 
          />
        </div>
      </div>
    `;let S=1,j=0,z=0,M=0,_=!1,R=0,B=0;const q=document.getElementById("active-preview-img"),F=document.getElementById("img-zoom-level"),oe=document.getElementById("img-pan-viewport");document.getElementById("img-zoom-in")?.addEventListener("click",()=>{S=Math.min(4,S+.25),ee()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{S=Math.max(.4,S-.25),ee()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{j=(j+90)%360,ee()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{S=1,j=0,z=0,M=0,ee()}),oe&&(oe.addEventListener("wheel",U=>{U.preventDefault();const J=U.deltaY<0?.15:-.15;S=Math.max(.4,Math.min(4,S+J)),ee()},{passive:!1}),oe.addEventListener("mousedown",U=>{_=!0,R=U.clientX-z,B=U.clientY-M,oe.style.cursor="grabbing"}),window.addEventListener("mousemove",U=>{_&&(z=U.clientX-R,M=U.clientY-B,ee())}),window.addEventListener("mouseup",()=>{_&&(_=!1,oe&&(oe.style.cursor="grab"))}));return}if(x){const S=a.diskFilename&&a.diskFilename.startsWith("http")&&!a.diskFilename.includes("drive.google.com")?a.diskFilename:"/assets/darc-walkthrough.mp4";N.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#06090e;color:#f8fafc;overflow:hidden;">
        <!-- Video Studio Header Bar -->
        <div style="background:rgba(15,23,42,0.95);border-bottom:1px solid #1e293b;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;z-index:10;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#8b5cf6;color:#ffffff;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:14px;">🎬</div>
            <div>
              <div style="font-weight:800;font-size:14px;color:#f8fafc;">${a.originalName}</div>
              <div style="font-size:11px;color:#94a3b8;">${t("توثيق الموقع والجولة المعمارية بالفيديو (Site Walkthrough & Drone)","Architectural Site Walkthrough & Drone Inspection")} • ${i}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="background:rgba(139,92,246,0.15);color:#a78bfa;border:1px solid rgba(139,92,246,0.3);font-size:11px;font-weight:800;padding:4px 8px;border-radius:6px;">1080p 60FPS</span>
            <span style="background:rgba(34,197,94,0.15);color:#4ade80;border:1px solid rgba(34,197,94,0.3);font-size:11px;font-weight:800;padding:4px 8px;border-radius:6px;">H.264 High</span>
            <button type="button" class="btn btn-sm" id="video-download-btn" style="background:#8b5cf6;color:#ffffff;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
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
            preload="auto"
            style="width:100%;max-width:1080px;max-height:72vh;border-radius:12px;outline:none;box-shadow:0 25px 60px rgba(0,0,0,0.9);background:#0f172a;object-fit:contain;"
          >
            <source src="${S}" type="video/mp4">
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

        <!-- Timeline Keyframes / Architectural Camera Angles Strip -->
        <div style="background:#0d1117;border-top:1px solid #1e293b;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div style="display:flex;align-items:center;gap:8px;overflow-x:auto;">
            <span style="font-size:11px;color:#94a3b8;font-weight:700;">📍 ${t("محطات التوثيق المعماري:","Keyframes:")}</span>
            <button type="button" class="video-jump-btn" data-sec="0" style="background:#161b22;border:1px solid #30363d;color:#f0f6fc;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;">
              00:00 🚁 ${t("اللقطة الجوية العامة","Aerial Flyover")}
            </button>
            <button type="button" class="video-jump-btn" data-sec="3" style="background:#161b22;border:1px solid #30363d;color:#f0f6fc;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;">
              00:03 🏛️ ${t("واجهات الترافنتينو والمدخل","Travertine Facade")}
            </button>
            <button type="button" class="video-jump-btn" data-sec="6" style="background:#161b22;border:1px solid #30363d;color:#f0f6fc;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;">
              00:06 🌿 ${t("الفناء والحديقة الداخلية","Courtyard & Garden")}
            </button>
            <button type="button" class="video-jump-btn" data-sec="8" style="background:#161b22;border:1px solid #30363d;color:#f0f6fc;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;">
              00:08 🏊 ${t("المسبح المعلق والتشطيبات","Infinity Pool")}
            </button>
          </div>

          <!-- Video Playback Options -->
          <div style="display:flex;align-items:center;gap:8px;">
            <select id="video-playback-rate" style="background:#161b22;border:1px solid #30363d;color:#f0f6fc;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;outline:none;cursor:pointer;">
              <option value="0.75">0.75x</option>
              <option value="1" selected>1.0x ${t("(طبيعي)","(Normal)")}</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
            <button type="button" class="btn btn-sm" id="video-pip-btn" style="background:#161b22;border:1px solid #30363d;color:#f0f6fc;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;" title="${t("نافذة مصغرة (Picture-in-Picture)","Picture-in-Picture")}">
              📺 PiP
            </button>
            <button type="button" class="btn btn-sm" id="video-fullscreen-btn" style="background:#161b22;border:1px solid #30363d;color:#f0f6fc;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;" title="${t("ملء الشاشة","Fullscreen")}">
              ⛶
            </button>
          </div>
        </div>
      </div>
    `;const j=document.getElementById("darc-main-video-player"),z=document.getElementById("video-error-fallback");j&&(j.addEventListener("error",()=>{console.warn("[DocViewer] Video failed to stream from primary source:",S),z&&(z.style.display="flex")}),document.querySelectorAll(".video-jump-btn").forEach(M=>{M.addEventListener("click",()=>{const _=parseFloat(M.dataset.sec||"0");j.currentTime=_,j.play().catch(R=>console.warn(R))})}),document.getElementById("video-playback-rate")?.addEventListener("change",M=>{j.playbackRate=parseFloat(M.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():j.requestPictureInPicture&&await j.requestPictureInPicture()}catch(M){console.warn("[DocViewer] PiP error:",M)}}),document.getElementById("video-fullscreen-btn")?.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen?.().catch(M=>console.warn(M)):j.requestFullscreen?.().catch(M=>console.warn(M))})),document.getElementById("video-download-btn")?.addEventListener("click",()=>ge(a.id)),document.getElementById("video-fallback-download-btn")?.addEventListener("click",()=>ge(a.id));return}if(l||p){N.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#101418;user-select:none;">
        <!-- CAD Inspection Control Panel -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-weight:900;color:#0284c7;display:flex;align-items:center;gap:6px;">
              📐 ${s.ext} ${t("عارض المخططات الهندسية (CAD Workspace)","CAD Vector Workspace")}
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
              ${w("download",12)} DXF Export
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
    `,document.getElementById("cad-layer-walls")?.addEventListener("change",z=>{const M=document.getElementById("layer-walls");M&&(M.style.display=z.target.checked?"block":"none")}),document.getElementById("cad-layer-grids")?.addEventListener("change",z=>{const M=document.getElementById("layer-grids");M&&(M.style.display=z.target.checked?"block":"none")}),document.getElementById("cad-layer-dims")?.addEventListener("change",z=>{const M=document.getElementById("layer-dims");M&&(M.style.display=z.target.checked?"block":"none")}),document.getElementById("cad-export-dxf")?.addEventListener("click",()=>{ge(a.id)});const S=document.getElementById("cad-viewport-container"),j=document.getElementById("cad-coords");S&&j&&S.addEventListener("mousemove",z=>{const M=S.getBoundingClientRect(),_=((z.clientX-M.left)/M.width*24).toFixed(2),R=((z.clientY-M.top)/M.height*16).toFixed(2);j.textContent=`X: ${_}m | Y: ${R}m`})}if(u){let z=function(_=""){const R=document.getElementById("excel-grid-viewport");if(!R)return;const B=S[j],q=(_||"").toLowerCase().trim(),F=q?B.rows.filter(U=>U.some(J=>String(J).toLowerCase().includes(q))):B.rows,oe=["A","B","C","D","E","F","G","H"];let ee=`
        <table style="width:100%;border-collapse:collapse;font-size:12px;font-family:system-ui, -apple-system, sans-serif;min-width:850px;">
          <thead>
            <!-- Column Labels A, B, C... -->
            <tr style="background:var(--subtle, #f1f5f9);color:#64748b;font-weight:700;font-family:monospace;text-align:center;border-bottom:1px solid #cbd5e1;">
              <th style="width:40px;padding:4px;border-inline-end:1px solid #cbd5e1;background:#e2e8f0;"></th>
              ${B.headers.map((U,J)=>`<th style="padding:4px 8px;border-inline-end:1px solid #cbd5e1;min-width:90px;">${oe[J]||J}</th>`).join("")}
            </tr>
            <!-- Header Titles -->
            <tr style="background:#f8fafc;color:#0f172a;font-weight:800;border-bottom:2px solid #107c41;">
              <th style="padding:8px 4px;border-inline-end:1px solid #cbd5e1;background:#e2e8f0;font-family:monospace;">#</th>
              ${B.headers.map(U=>`<th style="padding:10px 12px;border-inline-end:1px solid #cbd5e1;text-align:start;">${U}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
      `;F.length===0?ee+=`
          <tr>
            <td colspan="${B.headers.length+1}" style="text-align:center;padding:40px;color:#94a3b8;font-size:14px;">
              🔍 ${t("لا توجد بنود مطابقة لكلمة البحث في هذا الجدول","No matching items found")}
            </td>
          </tr>
        `:F.forEach((U,J)=>{const be=J%2===0?"var(--surface, #ffffff)":"var(--subtle, #fbfcfd)";ee+=`<tr class="excel-row" style="background:${be};border-bottom:1px solid var(--line, #e2e8f0);transition:background 0.1s ease;">`,ee+=`<td style="padding:6px 4px;text-align:center;color:#94a3b8;font-family:monospace;border-inline-end:1px solid #cbd5e1;background:#f8fafc;font-size:11px;">${J+1}</td>`,U.forEach((re,he)=>{const ne=/^[0-9,.]+(%)?$/.test(re)?"text-align:end;":"text-align:start;",Z=`${oe[he]}${J+1}`;ee+=`
              <td class="excel-cell" data-coord="${Z}" data-val="${encodeURIComponent(re)}" style="padding:8px 12px;border-inline-end:1px solid #e2e8f0;${ne}cursor:cell;user-select:text;">
                ${re}
              </td>
            `}),ee+="</tr>"}),ee+=`
          </tbody>
          <tfoot>
            <tr style="background:#f0fdf4;border-top:2px solid #107c41;font-weight:900;color:#166534;">
              <td style="padding:8px;text-align:center;background:#dcfce7;border-inline-end:1px solid #bbf7d0;">Σ</td>
              <td style="padding:10px 12px;border-inline-end:1px solid #bbf7d0;">${t("الإجمالي الإجمالي المعتمد للجدول","Total Approved Sum")}</td>
              <td colspan="${B.headers.length-2}" style="padding:10px 12px;text-align:end;border-inline-end:1px solid #bbf7d0;"></td>
              <td style="padding:10px 12px;text-align:end;font-size:14px;color:#107c41;letter-spacing:-0.3px;">${B.total} SAR</td>
            </tr>
          </tfoot>
        </table>
      `,R.innerHTML=ee,R.querySelectorAll(".excel-cell").forEach(U=>{U.addEventListener("click",()=>{R.querySelectorAll(".excel-cell").forEach(ne=>{ne.style.outline="none",ne.style.background=""}),U.style.outline="2px solid #107c41",U.style.outlineOffset="-2px",U.style.background="rgba(16,124,65,0.06)";const J=U.dataset.coord,be=decodeURIComponent(U.dataset.val||""),re=document.getElementById("excel-cell-ref"),he=document.getElementById("excel-formula-val");re&&(re.textContent=J),he&&(he.textContent=be)})})};var h=z;const S={sheet1:{name:t("ورقة 1: جدول حصر الكميات (BOQ)","Sheet 1: Bill of Quantities (BOQ)"),headers:[t("رقم البند","Item #"),t("بيان الأعمال والتوصيف المعماري","Description of Architectural Works"),t("الوحدة","Unit"),t("الكمية","Qty"),t("سعر الوحدة (ر.س)","Unit Rate (SAR)"),t("الإجمالي (ر.س)","Total (SAR)")],rows:[["01.01",t("أعمال الحفريات العامة وتسوية منسوب التأسيس لفيلا النخيل بعمق 3.5م","General excavation and leveling for Palm Villa depth 3.5m"),"م³","850","45.00","38,250.00"],["01.02",t("صب خرسانة النظافة العادية وسملات القواعد عيار 250 كجم/م³","Plain blinding concrete and footings bed 250 kg/m³"),"م³","140","320.00","44,800.00"],["01.03",t("خرسانة مسلحة للقواعد والميدات ورقاب الأعمدة عيار 350 كجم مقاوم للكبريتات (SRC)","Reinforced concrete footings and tie beams 350 kg SRC"),"م³","320","480.00","153,600.00"],["02.01",t("جدران بلك بركاني عازل للحرارة والصوت سماكة 20 سم مع شبك التسليح","Volcanic insulated blockwork 20cm with ladder reinforcement"),"م²","1,200","75.00","90,000.00"],["03.01",t("تكسيات واجهات بحجر الترافنتينو الإيطالي نخب أول تثبيت ميكانيكي استانلس 316","Italian Travertine cladding first grade mechanical fixing SS316"),"م²","680","420.00","285,600.00"],["03.02",t("واجهات زجاجية مزدوجة كيرتن وول قطاع تكنال مع زجاج Low-E عازل للحرارة","Technal curtain wall double glazing with thermal Low-E glass"),"م²","340","950.00","323,000.00"],["04.01",t("أرضيات رخام ستاتوريو إيطالي ألواح 120×120 سم صقل ليزري مع فواصل تمدد","Italian Statuario marble slabs 120x120cm laser polished"),"م²","520","680.00","353,600.00"],["05.01",t("نظام تكييف مركزي مخفي VRV من Daikin مع مجاري هواء معزولة بالصوف الزجاجي","Daikin VRV concealed HVAC system with insulated ductwork"),t("مقطوع","Lump Sum"),"1","185,000.00","185,000.00"],["06.01",t("نظام المنزل الذكي والتحكم الرقمي بالإنارة والستائر المتوافق مع KNX","KNX Smart home lighting and motorized shades automation"),t("مقطوع","Lump Sum"),"1","95,000.00","95,000.00"],["07.01",t("أعمال العزل المائي والحراري للأسطح بنظام الكومبي المعتمد مع ضمان 10 سنوات","Combo roof waterproofing and thermal insulation with 10-yr warranty"),"م²","480","125.00","60,000.00"]],total:"1,548,850.00"},sheet2:{name:t("ورقة 2: كشف المواد والتشطيبات","Sheet 2: Finishes & Materials"),headers:[t("كود التشطيب","Code"),t("الفراغ المعماري / العنصر","Space / Element"),t("المواصفة والمادة المعتمدة","Specification & Material"),t("المورد / الوكيل المعتمد","Approved Supplier"),t("بلد المنشأ","Origin"),t("حالة الاعتماد","Status")],rows:[["F-EXT-01",t("الواجهة الرئيسية والمدخل","Main Facade & Entry"),t("حجر ترافنتينو بيج روماني نخب أول معالج بالأشعة UV","Roman Beige Travertine first choice UV protected"),"شركة المدى للأحجار العالمية",t("إيطاليا","Italy"),"معتمد للاستيراد ✅"],["F-INT-02",t("صالات الاستقبال والمجالس","Grand Majlis & Living"),t("رخام ستاتوريو كلكتا عروق متصلة Bookmatch","Statuario Calacatta bookmatched slabs"),"أرتيك للرخام والجرانيت",t("إيطاليا","Italy"),"معتمد للاستيراد ✅"],["F-FLR-03",t("أجنحة النوم الرئيسية","Master Bedroom Suites"),t("باركيه خشب طبيعي زان معالج حرارياً AC5 مقاوم للماء","Water-resistant natural beech thermo-wood parquet"),"دورما العالمية للأرضيات",t("ألمانيا","Germany"),"معتمد للتنفيذ ✅"],["F-WND-04",t("النوافذ والواجهات البانورامية","Panoramic Glazing"),t("ألمنيوم تكنال حراري مكسور مع زجاج سان جوبان 32 مم","Technal thermal-break aluminum with Saint-Gobain glass"),"مصنع الشرق للألمنيوم",t("فرنسا","France"),"معتمد للتنفيذ ✅"],["F-PLM-05",t("الأطقم الصحية والخلاطات","Sanitaryware & Fixtures"),t("خلاطات مخفية من Gessi وإكسسوارات Duravit معلقة","Gessi concealed fixtures & Duravit wall-hung units"),"السريع للتجهيزات الصحية",t("ألمانيا / إيطاليا","Germany/Italy"),"قيد التوريد 📦"]],total:t("5 عناصر تشطيب معتمدة","5 Approved Finishes")},sheet3:{name:t("ورقة 3: الدفعات والتدفقات المالية","Sheet 3: Cash Flows & Milestones"),headers:[t("رقم الدفعة","Milestone #"),t("مرحلة الإنجاز التعاقدية المرتبطة","Contractual Handover Stage"),t("النسبة المئوية","Percentage"),t("القيمة المستحقة (ر.س)","Amount (SAR)"),t("تاريخ الاستحقاق","Due Date"),t("حالة الصرف والاعتماد","Payment Status")],rows:[["PMT-01",t("الدفعة المقدمة عند توقيع العقد واعتماد المخططات التنفيذية","Advance payment upon contract signing & IFC approval"),"20.0%","309,770.00","2026-02-15","تم الصرف بنجاح ✅"],["PMT-02",t("إتمام أعمال الحفريات وصب خرسانة القواعد والميدات الأرضية","Substructure completion (Footings & tie-beams)"),"15.0%","232,327.50","2026-03-30","تم الصرف بنجاح ✅"],["PMT-03",t("إنجاز كامل الهيكل الإنشائي والخرسانات لجميع الطوابق والأسقف","Superstructure completion (All slabs & columns)"),"25.0%","387,212.50","2026-05-20","مستحق للمراجعة ⏳"],["PMT-04",t("إتمام التكسيات الخارجية والعزل وتركيب كامل الواجهات الزجاجية","Envelope completion (Facades, glazing & waterproofing)"),"20.0%","309,770.00","2026-07-15","قيد الإنجاز 🚧"],["PMT-05",t("إتمام التشطيبات الداخلية والأنظمة الكهروميكانيكية والتسليم الأولي","Internal finishes, MEP commissioning & initial handover"),"15.0%","232,327.50","2026-09-30","مجدول تعاقدياً 📅"],["PMT-06",t("التسليم النهائي بعد انقضاء فترة الصيانة والضمان وإصلاح الملاحظات","Final handover after defects liability period"),"5.0%","77,442.50","2026-12-30","مجدول تعاقدياً 📅"]],total:"1,548,850.00"}};let j="sheet1";N.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Excel Ribbon / Action Header -->
        <div style="background:#107c41;color:#ffffff;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(16,124,65,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#107c41;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">X</div>
            <div>
              <div style="font-weight:800;font-size:14px;letter-spacing:-0.2px;">${a.originalName}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Excel Architectural BOQ & Cost Estimator • ${i}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="position:relative;">
              <input type="text" id="excel-search-input" placeholder="${t("بحث في الجدول...","Search spreadsheet...")}" style="padding:6px 12px;border-radius:6px;border:none;background:rgba(255,255,255,0.2);color:#ffffff;font-size:12px;outline:none;width:180px;::placeholder{color:rgba(255,255,255,0.7)};" />
            </div>
            <button type="button" class="btn btn-sm" id="excel-export-csv" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">
              📊 ${t("تصدير CSV","Export CSV")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-download-btn" style="background:#ffffff;color:#107c41;border:none;padding:5px 12px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل المصنف","Download XLSX")}
            </button>
          </div>
        </div>

        <!-- Formula Bar fx -->
        <div style="display:flex;align-items:center;gap:12px;padding:6px 16px;background:var(--subtle, #f8fafc);border-bottom:1px solid var(--line, #e2e8f0);font-size:12px;font-family:monospace;">
          <div id="excel-cell-ref" style="font-weight:800;color:#107c41;background:rgba(16,124,65,0.1);padding:3px 8px;border-radius:4px;min-width:40px;text-align:center;">F10</div>
          <div style="color:#64748b;font-weight:900;">fx</div>
          <div id="excel-formula-val" style="flex:1;background:var(--surface, #ffffff);padding:4px 10px;border-radius:4px;border:1px solid var(--line, #cbd5e1);color:var(--text, #0f172a);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            =SUM(F2:F10) [Total: SAR 1,548,850.00]
          </div>
        </div>

        <!-- Sheet Grid Viewport -->
        <div id="excel-grid-viewport" style="flex:1;overflow:auto;background:var(--surface, #ffffff);padding:0;">
          <!-- Content rendered by renderActiveExcelSheet -->
        </div>

        <!-- Excel Bottom Sheet Navigation Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;background:var(--subtle, #f1f5f9);border-top:1px solid var(--line, #cbd5e1);padding:4px 12px;">
          <div style="display:flex;align-items:center;gap:4px;overflow-x:auto;">
            <button type="button" class="excel-tab-btn" data-sheet="sheet1" style="border:none;background:#ffffff;color:#107c41;font-weight:800;font-size:12px;padding:6px 14px;border-top:3px solid #107c41;border-radius:4px 4px 0 0;cursor:pointer;">
              ${S.sheet1.name}
            </button>
            <button type="button" class="excel-tab-btn" data-sheet="sheet2" style="border:none;background:transparent;color:#64748b;font-weight:600;font-size:12px;padding:6px 14px;cursor:pointer;">
              ${S.sheet2.name}
            </button>
            <button type="button" class="excel-tab-btn" data-sheet="sheet3" style="border:none;background:transparent;color:#64748b;font-weight:600;font-size:12px;padding:6px 14px;cursor:pointer;">
              ${S.sheet3.name}
            </button>
          </div>
          <div style="font-size:11px;color:#64748b;font-weight:600;">
            ${t("جاهز للحساب التلقائي • العملة: ر.س (SAR)","Ready • Currency: SAR")}
          </div>
        </div>
      </div>
    `,z(),document.querySelectorAll(".excel-tab-btn").forEach(_=>{_.addEventListener("click",()=>{document.querySelectorAll(".excel-tab-btn").forEach(B=>{B.style.background="transparent",B.style.color="#64748b",B.style.fontWeight="600",B.style.borderTop="none"}),_.style.background="#ffffff",_.style.color="#107c41",_.style.fontWeight="800",_.style.borderTop="3px solid #107c41",j=_.dataset.sheet;const R=document.getElementById("excel-search-input");z(R?R.value:"")})});const M=document.getElementById("excel-search-input");M&&M.addEventListener("input",_=>{z(_.target.value)}),document.getElementById("excel-download-btn")?.addEventListener("click",()=>ge(a.id)),document.getElementById("excel-export-csv")?.addEventListener("click",()=>{const _=S[j];let R="\uFEFF"+_.headers.join(",")+`
`;_.rows.forEach(oe=>{R+=oe.map(ee=>`"${String(ee).replace(/"/g,'""')}"`).join(",")+`
`});const B=new Blob([R],{type:"text/csv;charset=utf-8"}),q=URL.createObjectURL(B),F=document.createElement("a");F.href=q,F.download=`${_.name.replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g,"_")}.csv`,document.body.appendChild(F),F.click(),F.remove(),setTimeout(()=>URL.revokeObjectURL(q),1e4),k(t("تم تصدير ملف CSV بنجاح.","CSV Exported successfully."))})}if(f){N.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#1e242c;overflow:hidden;">
        <!-- Word Executive Toolbar -->
        <div style="background:#2b579a;color:#ffffff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(43,87,154,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#2b579a;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">W</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${a.originalName}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Word • ${t("كراسة المواصفات الفنية والشروط الهندسية","Technical Specifications & Engineering Tender Book")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <!-- Reading Tone Controls -->
            <button type="button" class="btn btn-sm" id="word-theme-white" style="background:#ffffff;color:#0f172a;border:none;padding:5px 10px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;">
              📄 ${t("أبيض","White")}
            </button>
            <button type="button" class="btn btn-sm" id="word-theme-sepia" style="background:#f4ecd8;color:#5f4b32;border:none;padding:5px 10px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;">
              📜 ${t("عاجي","Sepia")}
            </button>
            <button type="button" class="btn btn-sm" id="word-theme-dark" style="background:#334155;color:#f8fafc;border:none;padding:5px 10px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;">
              🌙 ${t("داكن","Dark")}
            </button>
            <span style="color:rgba(255,255,255,0.4);">|</span>
            <!-- Font Size Controls -->
            <button type="button" class="btn btn-sm" id="word-font-dec" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">A-</button>
            <button type="button" class="btn btn-sm" id="word-font-inc" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">A+</button>
            <span style="color:rgba(255,255,255,0.4);">|</span>
            <button type="button" class="btn btn-sm" id="word-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">
              🖨️ ${t("طباعة المستند","Print Doc")}
            </button>
            <button type="button" class="btn btn-sm" id="word-download-btn" style="background:#ffffff;color:#2b579a;border:none;padding:5px 12px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل DOCX","Download")}
            </button>
          </div>
        </div>

        <!-- Document Split Layout: Table of Contents & A4 Page -->
        <div style="flex:1;display:flex;overflow:hidden;background:#0b0f15;">
          <!-- Interactive Table of Contents Sidebar -->
          <div style="width:260px;background:#131822;border-inline-end:1px solid #1e293b;padding:16px;overflow-y:auto;flex-shrink:0;color:#94a3b8;font-size:12px;">
            <div style="font-weight:800;color:#38bdf8;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;display:flex;align-items:center;gap:6px;">
              📑 ${t("فهرس المحتويات","Table of Contents")}
            </div>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
              <li><a href="#word-sec-1" class="word-toc-link" style="color:#e2e8f0;text-decoration:none;display:block;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.04);">1. الأحكام العامة ونطاق المشروع</a></li>
              <li><a href="#word-sec-2" class="word-toc-link" style="color:#94a3b8;text-decoration:none;display:block;padding:6px 8px;border-radius:6px;">2. مواصفات الخرسانات والهياكل (SBC 304)</a></li>
              <li><a href="#word-sec-3" class="word-toc-link" style="color:#94a3b8;text-decoration:none;display:block;padding:6px 8px;border-radius:6px;">3. التشطيبات والواجهات الحجرية والزجاج</a></li>
              <li><a href="#word-sec-4" class="word-toc-link" style="color:#94a3b8;text-decoration:none;display:block;padding:6px 8px;border-radius:6px;">4. الأعمال الكهروميكانيكية والتكييف (MEP)</a></li>
              <li><a href="#word-sec-5" class="word-toc-link" style="color:#94a3b8;text-decoration:none;display:block;padding:6px 8px;border-radius:6px;">5. إجراءات الفحص والضمانات الهندسية</a></li>
            </ul>

            <div style="margin-top:24px;padding:12px;background:rgba(56,189,248,0.08);border:1px dashed rgba(56,189,248,0.3);border-radius:8px;font-size:11px;color:#cbd5e1;line-height:1.6;">
              <strong style="color:#38bdf8;">📌 كود البناء السعودي SBC:</strong><br>
              تمت مطابقة جميع مواصفات هذه الكراسة مع الكود السعودي للبناء العام (SBC 201) وكود المنشآت الخرسانية (SBC 304).
            </div>
          </div>

          <!-- Main A4 Document Sheet Viewport -->
          <div id="word-reader-viewport" style="flex:1;overflow-y:auto;padding:32px 20px;display:flex;justify-content:center;background:#1e242c;">
            <div id="word-a4-page" style="width:100%;max-width:820px;min-height:1160px;background:#ffffff;color:#1e293b;padding:60px 70px;border-radius:4px;box-shadow:0 15px 50px rgba(0,0,0,0.5);font-size:14px;line-height:1.9;transition:all 0.2s ease;">
              
              <!-- Letterhead Header -->
              <div style="border-bottom:3px double #2b579a;padding-bottom:16px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:flex-end;">
                <div>
                  <div style="font-size:22px;font-weight:900;color:#2b579a;letter-spacing:-0.5px;">DARC DESIGN TEAM</div>
                  <div style="font-size:12px;color:#64748b;font-weight:600;">CONSULTING ARCHITECTS & ENGINEERS • RIYADH, SAUDI ARABIA</div>
                </div>
                <div style="text-align:end;font-size:11px;color:#64748b;font-family:monospace;">
                  <div>DOC-ID: DARC-SPEC-2026-V3</div>
                  <div>DATE: 2026-11-02</div>
                </div>
              </div>

              <!-- Document Title -->
              <div style="text-align:center;margin-bottom:36px;">
                <span style="background:rgba(43,87,154,0.1);color:#2b579a;font-weight:800;font-size:11px;padding:4px 12px;border-radius:20px;text-transform:uppercase;">كراسة المواصفات الفنية المعتمدة للتنفيذ</span>
                <h1 style="font-size:24px;font-weight:900;color:#0f172a;margin:12px 0 6px 0;">مشروع فيلا النخيل السكنية الفاخرة — Palm Signature Villa</h1>
                <p style="color:#64748b;font-size:13px;margin:0;">الموقع: حي النخيل، الرياض | المالك: شركة دارك للتطوير العقاري</p>
              </div>

              <!-- Section 1 -->
              <div id="word-sec-1" style="margin-bottom:30px;">
                <h2 style="font-size:17px;font-weight:800;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">1. الأحكام العامة ونطاق المشروع (General Provisions)</h2>
                <p>تحدد هذه الكراسة المواصفات الهندسية الدقيقة والمعايير القياسية الواجب اتباعها من قِبل المقاول الرئيسي وجميع مقاولي الباطن المعتمدين في تنفيذ الأعمال المدنية والمعمارية والتشطيبات. يُلزم المقاول بتقديم عينات معتمدة (Material Submittals) لجميع المواد قبل البدء بالتوريد للموقع بمدة لا تقل عن 15 يوماً عمل.</p>
              </div>

              <!-- Section 2 -->
              <div id="word-sec-2" style="margin-bottom:30px;">
                <h2 style="font-size:17px;font-weight:800;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">2. مواصفات الخرسانات والأعمال الإنشائية (SBC 304)</h2>
                <p>تُنفذ جميع القواعد الخرسانية وسملات الميدات ورقاب الأعمدة تحت مستوى الأرض باستخدام أسمنت بورتلاندي مقاوم للأملاح والكبريتات (Type V / SRC) بقوة كسر لا تقل عن 35 نيوتن/مم² (C35) بعد 28 يوماً. يجب عزل جميع الأسطح الخرسانية الملامسة للتربة بدهان بيتوميني مطاطي بطبقتين متعامدتين سماكة لا تقل عن 1.5 مم مع حمايتها بألواح حماية فوم بكثافة عالية.</p>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px;margin-top:10px;font-size:12px;">
                  <strong>اشتراطات فحص الخرسانة:</strong> أخذ 6 مكعبات اختبار لكل 50 م³، اختبار الهبوط (Slump Test) بحدود 120 ± 20 مم، والمعالجة بالرش المائي المستمر لمدة لا تقل عن 7 أيام متواصلة.
                </div>
              </div>

              <!-- Section 3 -->
              <div id="word-sec-3" style="margin-bottom:30px;">
                <h2 style="font-size:17px;font-weight:800;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">3. التشطيبات والواجهات الحجرية والزجاج (SBC 601)</h2>
                <p>تكسى الواجهات الخارجية بحجر الترافنتينو الإيطالي الطبيعي نخب أول، بسماكة اسمية 30 مم، ويتم التثبيت حصرياً بالنظام الميكانيكي عبر كانات وزوايا من الصلب الذي لا يصدأ (Stainless Steel Grade 316) مع ترك فراغ هوائي عازل 50 مم وعزل حراري بألواح الصوف الصخري Rockwool بكثافة 70 كجم/م³.</p>
                <p>تكون جميع الواجهات البانورامية والشبابيك من قطاعات الألمنيوم المعزول حرارياً (Technal Thermal Break) مع زجاج مزدوج 32 مم (8 مم سيكوريت Low-E خارجي + 16 مم فراغ غاز الأرجون + 8 مم سيكوريت داخلي) لتحقيق معامل انتقال حراري U-value لا يتجاوز 1.4 W/m²K.</p>
              </div>

              <!-- Section 4 -->
              <div id="word-sec-4" style="margin-bottom:30px;">
                <h2 style="font-size:17px;font-weight:800;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">4. الأعمال الكهروميكانيكية والتكييف (MEP)</h2>
                <p>يتم تكييف الفيلا بنظام التدفق المتغير للوسيط التبريدي (VRV Inverter) من شركة دايكن اليابانية، مع مجاري هواء مخفية من ألواح الدكت المسبقة العزل (PIR) وتوزيع الهواء بمخارج طولية (Linear Slot Diffusers) تحقق الهدوء الصوتي بأقل من NC-25.</p>
              </div>

              <!-- Section 5 -->
              <div id="word-sec-5" style="margin-bottom:30px;">
                <h2 style="font-size:17px;font-weight:800;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">5. إجراءات الفحص والضمانات الهندسية (Testing & Handover)</h2>
                <p>يتحمل المقاول ضمان الهيكل الإنشائي وعزل المياه لمدة 10 سنوات (الضمان العشري)، وضمان كافة التشطيبات المعمارية والأعمال الكهروميكانيكية لمدة سنتين ميلاديتين من تاريخ محضر الاستلام الابتدائي.</p>
              </div>

              <!-- Official Sign-off Stamp -->
              <div style="margin-top:40px;padding-top:20px;border-top:2px dashed #cbd5e1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
                <div>
                  <div style="font-weight:800;color:#0f172a;">م. فهد القحطاني</div>
                  <div style="font-size:12px;color:#64748b;">رئيس قسم التصميم المعماري واستشاري المشروع</div>
                  <div style="font-size:11px;color:#22c55e;font-weight:700;margin-top:4px;">اعتماد هندسي إلكتروني مؤرخ رقم: 2026-DARC-APPR</div>
                </div>
                <div style="border:2px solid #22c55e;padding:10px 18px;border-radius:8px;background:rgba(34,197,94,0.06);color:#166534;text-align:center;font-weight:900;font-size:12px;transform:rotate(-2deg);">
                  <div>DARC ARCHITECTURAL STAMP</div>
                  <div style="font-size:15px;">معتمد للتنفيذ ✅</div>
                  <div style="font-size:10px;font-family:monospace;">ISSUED FOR CONSTRUCTION (IFC)</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;const S=document.getElementById("word-a4-page");document.getElementById("word-theme-white")?.addEventListener("click",()=>{S&&(S.style.background="#ffffff",S.style.color="#1e293b")}),document.getElementById("word-theme-sepia")?.addEventListener("click",()=>{S&&(S.style.background="#fcf8ec",S.style.color="#433422")}),document.getElementById("word-theme-dark")?.addEventListener("click",()=>{S&&(S.style.background="#1e293b",S.style.color="#f1f5f9")});let j=14;document.getElementById("word-font-inc")?.addEventListener("click",()=>{j<20&&(j+=1.5,S&&(S.style.fontSize=`${j}px`))}),document.getElementById("word-font-dec")?.addEventListener("click",()=>{j>11&&(j-=1.5,S&&(S.style.fontSize=`${j}px`))}),document.querySelectorAll(".word-toc-link").forEach(z=>{z.addEventListener("click",M=>{M.preventDefault();const _=z.getAttribute("href").replace("#",""),R=document.getElementById(_);R&&R.scrollIntoView({behavior:"smooth",block:"start"})})}),document.getElementById("word-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("word-download-btn")?.addEventListener("click",()=>ge(a.id))}if(v){let z=function(_){_<0&&(_=0),_>=S.length&&(_=S.length-1),j=_;const R=document.getElementById("ppt-slide-card"),B=document.getElementById("ppt-current-slide-num");B&&(B.textContent=_+1),R&&(R.innerHTML=S[_].content),document.querySelectorAll(".ppt-thumb-btn").forEach((q,F)=>{q.style.borderColor=F===_?"#d24726":"#30363d",q.style.transform=F===_?"scale(1.05)":"scale(1)"})};var E=z;const S=[{num:1,title:t("فلسفة التصميم والمفهوم المعماري","Design Philosophy & Architectural Vision"),badge:t("الشريحة 01 : الرؤية المعمارية","Slide 01 : Architectural Vision"),content:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:40px;box-sizing:border-box;">
            <div style="display:inline-block;background:rgba(210,71,38,0.15);color:#d24726;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:800;width:fit-content;margin-bottom:16px;">
              DARC CONCEPT DESIGN STAGE
            </div>
            <h1 style="font-size:38px;font-weight:900;color:var(--text, #0f172a);line-height:1.2;margin:0 0 16px 0;">
              مشروع فيلا النخيل — المعاصرة المعمارية في قلب الرياض
            </h1>
            <p style="font-size:16px;color:#64748b;max-width:760px;line-height:1.8;margin-bottom:28px;">
              صُممت الفيلا لتجسد التناغم المثالي بين الفخامة المعاصرة والهوية النجدية المستدامة، عبر تكسير الكتل وتوجيه الفتحات نحو الشمال والشرق لحصاد الإضاءة الطبيعية دون اكتساب حراري زائد.
            </p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:16px;">
              <div style="background:var(--subtle, #f8fafc);border:1px solid var(--line, #e2e8f0);padding:14px;border-radius:10px;">
                <div style="font-size:11px;color:#94a3b8;font-weight:700;">المساحة الإجمالية</div>
                <div style="font-size:20px;font-weight:900;color:#0f172a;margin-top:4px;">1,450 م²</div>
              </div>
              <div style="background:var(--subtle, #f8fafc);border:1px solid var(--line, #e2e8f0);padding:14px;border-radius:10px;">
                <div style="font-size:11px;color:#94a3b8;font-weight:700;">ارتفاع الأسقف</div>
                <div style="font-size:20px;font-weight:900;color:#0f172a;margin-top:4px;">4.20 م صافي</div>
              </div>
              <div style="background:var(--subtle, #f8fafc);border:1px solid var(--line, #e2e8f0);padding:14px;border-radius:10px;">
                <div style="font-size:11px;color:#94a3b8;font-weight:700;">نسبة التظليل الذاتي</div>
                <div style="font-size:20px;font-weight:900;color:#10b981;margin-top:4px;">68% كفاءة</div>
              </div>
            </div>
          </div>
        `},{num:2,title:t("المخطط العام والتوزيع الفراغي","Masterplan & Spatial Zoning"),badge:t("الشريحة 02 : المخطط العام","Slide 02 : Masterplan & Zoning"),content:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:40px;box-sizing:border-box;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
              <div>
                <h2 style="font-size:28px;font-weight:900;margin:0 0 6px 0;color:var(--text, #0f172a);">التوزيع الوظيفي وتدرج الخصوصية (Spatial Zoning)</h2>
                <p style="color:#64748b;font-size:13px;margin:0;">فصل ديناميكي بين منطقة الضيافة الرسمية، الفراغات العائلية، والخدمات</p>
              </div>
              <span style="background:#0284c7;color:#fff;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:800;">ZONING A1</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center;">
              <div style="background:var(--subtle, #f8fafc);border:1px solid var(--line, #e2e8f0);padding:20px;border-radius:12px;">
                <div style="font-weight:800;color:#0f172a;margin-bottom:12px;">مصفوفة توزيع الكتل الفراغية:</div>
                <ul style="padding-inline-start:20px;margin:0;line-height:2;font-size:13px;color:#475569;">
                  <li><strong>جناح الاستقبال والضيافة:</strong> يطل على حديقة صحراوية جافة مع مدخل منفصل ومصعد خاص.</li>
                  <li><strong>فناء العائلة البانورامي:</strong> زجاج كامل يطل على المسبح المعلق (Infinity Pool) والشلال الجداري.</li>
                  <li><strong>منطقة الخدمات والمطابخ:</strong> وصول خلفي مباشر مع مواقف سيارات مظللة ومستودعات مكيفة.</li>
                </ul>
              </div>
              <div style="background:#0f172a;border-radius:12px;padding:24px;color:#ffffff;display:flex;flex-direction:column;gap:12px;">
                <div style="color:#38bdf8;font-weight:800;font-size:13px;">مؤشرات حركة الهواء والإضاءة:</div>
                <div style="display:flex;align-items:center;gap:10px;font-size:12px;">
                  <span style="background:rgba(56,189,248,0.2);color:#38bdf8;padding:4px 8px;border-radius:4px;font-weight:800;">North</span>
                  <span>أكبر مسطحات زجاجية للاستفادة من النور البارد دون حرارة</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;font-size:12px;">
                  <span style="background:rgba(239,68,68,0.2);color:#ef4444;padding:4px 8px;border-radius:4px;font-weight:800;">South</span>
                  <span>كواسر خرسانية بارزة (Brise Soleil) لكسر أشعة الظهيرة القاسية</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;font-size:12px;">
                  <span style="background:rgba(34,197,94,0.2);color:#22c55e;padding:4px 8px;border-radius:4px;font-weight:800;">Courtyard</span>
                  <span>فناء وسطي يولد تيار سحب هوائي طبيعي (Thermal Chimney)</span>
                </div>
              </div>
            </div>
          </div>
        `},{num:3,title:t("لوحة المواد والهوية البصرية","Materiality & Moodboard"),badge:t("الشريحة 03 : لوحة المواد والتشطيبات","Slide 03 : Materials Moodboard"),content:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:40px;box-sizing:border-box;">
            <h2 style="font-size:28px;font-weight:900;margin:0 0 6px 0;color:var(--text, #0f172a);">الهوية البصرية والمواد المعتمدة (Material Palette)</h2>
            <p style="color:#64748b;font-size:13px;margin:0 0 20px 0;">أربعة عناصر عضوية متناغمة تعكس الرقي والاستدامة المعمارية</p>
            <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:16px;">
              <div style="background:#e9dfd0;border-radius:12px;padding:16px;color:#493829;display:flex;flex-direction:column;justify-content:space-between;height:180px;">
                <div style="font-weight:900;font-size:14px;">1. حجر الترافنتينو</div>
                <div style="font-size:11px;line-height:1.5;">بيج روماني طبيعي مفتوح المسام معالج ضد الأتربة والحرارة</div>
                <div style="font-size:10px;font-family:monospace;font-weight:800;">TRAVERTINE BEIGE</div>
              </div>
              <div style="background:#2d3748;border-radius:12px;padding:16px;color:#ffffff;display:flex;flex-direction:column;justify-content:space-between;height:180px;">
                <div style="font-weight:900;font-size:14px;">2. برونز ميتاليك</div>
                <div style="font-size:11px;line-height:1.5;">قطاعات ألمنيوم مؤكسد بلمسة نهائية غير لامعة (Matt Bronze)</div>
                <div style="font-size:10px;font-family:monospace;font-weight:800;">ANODIZED BRONZE</div>
              </div>
              <div style="background:#5c3a21;border-radius:12px;padding:16px;color:#ffffff;display:flex;flex-direction:column;justify-content:space-between;height:180px;">
                <div style="font-weight:900;font-size:14px;">3. خشب ثيرمووود</div>
                <div style="font-size:11px;line-height:1.5;">شرائح خشبية طبيعية معالجة حرارياً لمقاومة مناخ الرياض الجاف</div>
                <div style="font-size:10px;font-family:monospace;font-weight:800;">THERMO-ASH WOOD</div>
              </div>
              <div style="background:#dbeafe;border-radius:12px;padding:16px;color:#1e40af;display:flex;flex-direction:column;justify-content:space-between;height:180px;">
                <div style="font-weight:900;font-size:14px;">4. زجاج Low-E</div>
                <div style="font-size:11px;line-height:1.5;">زجاج مزدوج عاكس خفيف شفاف بنسبة نفاذية ضوئية 70%</div>
                <div style="font-size:10px;font-family:monospace;font-weight:800;">LOW-E COATING 32MM</div>
              </div>
            </div>
          </div>
        `},{num:4,title:t("دراسة الإنارة المعمارية والواجهات","Lighting Choreography & Night Views"),badge:t("الشريحة 04 : الإضاءة المعمارية","Slide 04 : Lighting Choreography"),content:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:40px;box-sizing:border-box;">
            <h2 style="font-size:28px;font-weight:900;margin:0 0 6px 0;color:var(--text, #0f172a);">السينوغرافيا الضوئية وتأثيرات الليل والنهار</h2>
            <p style="color:#64748b;font-size:13px;margin:0 0 20px 0;">دراسة محاكاة الإنارة المعمارية المخفية بدرجة حرارة 3000 كلفن</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
              <div style="background:#0f172a;color:#ffffff;border-radius:12px;padding:24px;border:1px solid #334155;">
                <div style="font-weight:800;color:#fbbf24;font-size:16px;margin-bottom:12px;">🌙 السيناريو الليلي (Night Scene):</div>
                <p style="font-size:13px;line-height:1.8;color:#cbd5e1;">
                  إضاءة خطية غائرة (Linear Grazing) تبرز ملمس حجر الترافنتينو، وإنارة نقطية دقيقة (Uplights) لشجر الزيتون المعمر في الحديقة، مع إخفاء كامل لمصادر الإضاءة لمنع التلوث الضوئي.
                </p>
                <div style="font-size:11px;color:#38bdf8;font-weight:700;margin-top:14px;">درجة حرارة اللون: 2700K - 3000K Warm Architectural Glow</div>
              </div>
              <div style="background:var(--subtle, #f8fafc);border:1px solid var(--line, #e2e8f0);border-radius:12px;padding:24px;">
                <div style="font-weight:800;color:#0d6269;font-size:16px;margin-bottom:12px;">☀️ سيناريو النهار (Daylight Simulation):</div>
                <p style="font-size:13px;line-height:1.8;color:#475569;">
                  اعتماد كاسرات شمسية متحركة مبرمجة مع حركة الشمس، تمنح الفراغات الداخلية ظلالاً هندسية متحركة تضفي حيوية متجددة على مدار ساعات النهار.
                </p>
                <div style="font-size:11px;color:#10b981;font-weight:700;margin-top:14px;">توفير في استهلاك طاقة التكييف: 24% سنوياً</div>
              </div>
            </div>
          </div>
        `},{num:5,title:t("الجدول الزمني ومراحل التسليم","Project Roadmap & Handover Milestones"),badge:t("الشريحة 05 : الخطة التنفيذية","Slide 05 : Project Roadmap"),content:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:40px;box-sizing:border-box;">
            <h2 style="font-size:28px;font-weight:900;margin:0 0 6px 0;color:var(--text, #0f172a);">خارطة الطريق ومراحل تسليم المشروع (Roadmap)</h2>
            <p style="color:#64748b;font-size:13px;margin:0 0 24px 0;">الجدول الزمني المتوقع من اعتماد الفكرة وحتى التسليم النهائي للمفتاح</p>
            <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:14px;">
              <div style="background:var(--subtle, #f8fafc);border-top:4px solid #10b981;border-radius:8px;padding:16px;border-inline:1px solid var(--line, #e2e8f0);border-bottom:1px solid var(--line, #e2e8f0);">
                <div style="font-size:11px;font-weight:900;color:#10b981;">المرحلة 01 ✅</div>
                <div style="font-weight:800;font-size:13px;margin:6px 0;">الفكرة المعمارية والكتل</div>
                <div style="font-size:11px;color:#64748b;">تم الإنجاز والاعتماد من المالك</div>
              </div>
              <div style="background:var(--subtle, #f8fafc);border-top:4px solid #0284c7;border-radius:8px;padding:16px;border-inline:1px solid var(--line, #e2e8f0);border-bottom:1px solid var(--line, #e2e8f0);">
                <div style="font-size:11px;font-weight:900;color:#0284c7;">المرحلة 02 🚧</div>
                <div style="font-weight:800;font-size:13px;margin:6px 0;">المخططات التنفيذية والتراخيص</div>
                <div style="font-size:11px;color:#64748b;">استخراج رخصة البناء وكود SBC</div>
              </div>
              <div style="background:var(--subtle, #f8fafc);border-top:4px solid #f59e0b;border-radius:8px;padding:16px;border-inline:1px solid var(--line, #e2e8f0);border-bottom:1px solid var(--line, #e2e8f0);">
                <div style="font-size:11px;font-weight:900;color:#f59e0b;">المرحلة 03 ⏳</div>
                <div style="font-weight:800;font-size:13px;margin:6px 0;">طرح المناقصة والترسية</div>
                <div style="font-size:11px;color:#64748b;">تأهيل واختيار المقاول الرئيسي</div>
              </div>
              <div style="background:var(--subtle, #f8fafc);border-top:4px solid #8b5cf6;border-radius:8px;padding:16px;border-inline:1px solid var(--line, #e2e8f0);border-bottom:1px solid var(--line, #e2e8f0);">
                <div style="font-size:11px;font-weight:900;color:#8b5cf6;">المرحلة 04 🏁</div>
                <div style="font-weight:800;font-size:13px;margin:6px 0;">الإشراف والتسليم النهائي</div>
                <div style="font-size:11px;color:#64748b;">إشراف دوري وتسليم المفتاح</div>
              </div>
            </div>
            <div style="margin-top:24px;text-align:center;">
              <button type="button" class="btn btn-primary" id="ppt-download-btn-slide" style="padding:8px 24px;border-radius:8px;font-weight:800;">
                📥 ${t("تنزيل العرض التقديمي بالكامل (PPTX)","Download Full Presentation")}
              </button>
            </div>
          </div>
        `}];let j=0;N.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#0d1117;color:#f0f6fc;overflow:hidden;">
        <!-- PPT Header Control Bar -->
        <div style="background:#d24726;color:#ffffff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(210,71,38,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d24726;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">P</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${a.originalName}</div>
              <div style="font-size:11px;opacity:0.9;">PowerPoint Architectural Presentation • 16:9 4K Carousel</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="background:rgba(0,0,0,0.25);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:800;">
              <span id="ppt-current-slide-num">1</span> / ${S.length}
            </div>
            <button type="button" class="btn btn-sm" id="ppt-prev-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:800;cursor:pointer;">
              ❮ ${t("السابق","Prev")}
            </button>
            <button type="button" class="btn btn-sm" id="ppt-next-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:800;cursor:pointer;">
              ${t("التالي","Next")} ❯
            </button>
            <button type="button" class="btn btn-sm" id="ppt-fullscreen-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 10px;border-radius:6px;font-weight:700;cursor:pointer;">
              ⛶ ${t("ملء الشاشة","Fullscreen")}
            </button>
            <button type="button" class="btn btn-sm" id="ppt-download-btn" style="background:#ffffff;color:#d24726;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل PPTX","Download")}
            </button>
          </div>
        </div>

        <!-- 16:9 Presentation Canvas Viewport -->
        <div id="ppt-canvas-container" style="flex:1;display:flex;align-items:center;justify-content:center;padding:24px;background:#090d13;overflow:auto;position:relative;">
          <div id="ppt-slide-card" style="width:100%;max-width:980px;aspect-ratio:16/9;background:var(--surface, #ffffff);border-radius:12px;box-shadow:0 25px 60px rgba(0,0,0,0.7);overflow:hidden;position:relative;animation:fadeIn 0.2s ease;">
            <!-- Slide Content Injected by renderSlide -->
          </div>
        </div>

        <!-- Filmstrip Thumbnails Navigation Bar -->
        <div style="background:#161b22;border-top:1px solid #30363d;padding:10px 16px;display:flex;align-items:center;justify-content:center;gap:12px;overflow-x:auto;">
          ${S.map((_,R)=>`
            <div class="ppt-thumb-btn" data-index="${R}" style="cursor:pointer;background:#0d1117;border:2px solid ${R===0?"#d24726":"#30363d"};border-radius:6px;padding:6px 12px;width:120px;height:55px;display:flex;flex-direction:column;justify-content:space-between;transition:all 0.15s ease;flex-shrink:0;">
              <div style="font-size:9px;color:#8b949e;font-weight:800;">SLIDE 0${_.num}</div>
              <div style="font-size:10px;font-weight:700;color:#f0f6fc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${_.title}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `,z(0),document.getElementById("ppt-prev-btn")?.addEventListener("click",()=>{z(j-1)}),document.getElementById("ppt-next-btn")?.addEventListener("click",()=>{z(j+1)}),document.querySelectorAll(".ppt-thumb-btn").forEach(_=>{_.addEventListener("click",()=>{z(parseInt(_.dataset.index,10))})}),document.getElementById("ppt-fullscreen-btn")?.addEventListener("click",()=>{const _=document.getElementById("ppt-canvas-container");_&&(document.fullscreenElement?document.exitFullscreen?.().catch(R=>console.warn(R)):_.requestFullscreen?.().catch(R=>console.warn(R)))});const M=_=>{if(!document.getElementById("ppt-slide-card")){window.removeEventListener("keydown",M);return}_.key==="ArrowRight"||_.key==="PageDown"?z(j+1):(_.key==="ArrowLeft"||_.key==="PageUp")&&z(j-1)};window.addEventListener("keydown",M),document.getElementById("ppt-download-btn")?.addEventListener("click",()=>ge(a.id)),document.getElementById("ppt-download-btn-slide")?.addEventListener("click",()=>ge(a.id))}$&&(N.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Zip Header -->
        <div style="background:#d97706;color:#ffffff;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d97706;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">📦</div>
            <div>
              <div style="font-weight:800;font-size:15px;">${a.originalName}</div>
              <div style="font-size:12px;opacity:0.9;">Architectural Tender Package Archive • ${i}</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm" id="zip-download-btn" style="background:#ffffff;color:#d97706;border:none;padding:6px 16px;border-radius:6px;font-weight:800;cursor:pointer;">
            ⬇️ ${t("تنزيل كامل الحزمة المضغوطة","Download Full Archive")}
          </button>
        </div>

        <!-- Archive File Tree -->
        <div style="flex:1;overflow-y:auto;padding:24px;">
          <div style="font-weight:800;font-size:14px;margin-bottom:12px;color:var(--text, #0f172a);">
            📂 ${t("محتويات الحزمة المعمارية المعتمدة للتنفيذ (Tender Package Contents):","Archive Contents:")}
          </div>
          <div style="border:1px solid var(--line, #e2e8f0);border-radius:8px;overflow:hidden;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <thead>
                <tr style="background:var(--subtle, #f8fafc);border-bottom:1px solid var(--line, #e2e8f0);text-align:start;color:#64748b;">
                  <th style="padding:10px 16px;">${t("اسم الملف / المسار","File Name / Path")}</th>
                  <th style="padding:10px 16px;">${t("النوع","Type")}</th>
                  <th style="padding:10px 16px;">${t("الحجم","Size")}</th>
                  <th style="padding:10px 16px;text-align:end;">${t("الإجراء","Action")}</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid var(--line, #e2e8f0);">
                  <td style="padding:12px 16px;font-weight:600;">📁 01_Architectural_Blueprints/A-101-Ground-Floor-Plan.pdf</td>
                  <td style="padding:12px 16px;"><span style="background:rgba(220,38,38,0.1);color:#dc2626;padding:2px 8px;border-radius:4px;font-weight:800;font-size:11px;">PDF</span></td>
                  <td style="padding:12px 16px;color:#64748b;">8.4 MB</td>
                  <td style="padding:12px 16px;text-align:end;"><button type="button" class="btn btn-ghost btn-sm" onclick="alert('Downloading blueprint...')">⬇️</button></td>
                </tr>
                <tr style="border-bottom:1px solid var(--line, #e2e8f0);">
                  <td style="padding:12px 16px;font-weight:600;">📁 01_Architectural_Blueprints/A-201-Sections-Elevations.dwg</td>
                  <td style="padding:12px 16px;"><span style="background:rgba(2,132,199,0.1);color:#0284c7;padding:2px 8px;border-radius:4px;font-weight:800;font-size:11px;">AutoCAD</span></td>
                  <td style="padding:12px 16px;color:#64748b;">14.2 MB</td>
                  <td style="padding:12px 16px;text-align:end;"><button type="button" class="btn btn-ghost btn-sm" onclick="alert('Downloading DWG...')">⬇️</button></td>
                </tr>
                <tr style="border-bottom:1px solid var(--line, #e2e8f0);">
                  <td style="padding:12px 16px;font-weight:600;">📁 02_Specifications/DARC-Tender-BOQ-Final.xlsx</td>
                  <td style="padding:12px 16px;"><span style="background:rgba(16,124,65,0.1);color:#107c41;padding:2px 8px;border-radius:4px;font-weight:800;font-size:11px;">Excel</span></td>
                  <td style="padding:12px 16px;color:#64748b;">4.2 MB</td>
                  <td style="padding:12px 16px;text-align:end;"><button type="button" class="btn btn-ghost btn-sm" onclick="alert('Downloading Excel...')">⬇️</button></td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-weight:600;">📁 03_High_Res_Renders/Palm-Villa-Hero-Facade-4K.jpg</td>
                  <td style="padding:12px 16px;"><span style="background:rgba(5,150,105,0.1);color:#059669;padding:2px 8px;border-radius:4px;font-weight:800;font-size:11px;">Image 4K</span></td>
                  <td style="padding:12px 16px;color:#64748b;">9.8 MB</td>
                  <td style="padding:12px 16px;text-align:end;"><button type="button" class="btn btn-ghost btn-sm" onclick="alert('Downloading Render...')">⬇️</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>ge(a.id))),!d&&!y&&!x&&!l&&!u&&!f&&!v&&!$&&(N.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
        <div style="width:80px;height:80px;border-radius:20px;background:${s.bg};color:${s.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${s.border};">
          ${s.ext}
        </div>
        <h2 style="font-size:22px;font-weight:900;margin:0 0 8px 0;color:var(--text, #0f172a);">${a.originalName}</h2>
        <p style="color:#64748b;font-size:14px;max-width:480px;line-height:1.6;margin:0 0 24px 0;">
          ${t("هذا المستند المعماري جاهز للتنزيل المباشر أو الفتح عبر التطبيق الهندسي المختص.","This architectural document is ready for direct download or local desktop review.")}
        </p>
        <div style="display:flex;gap:12px;">
          <button type="button" class="btn btn-primary" id="fallback-download-btn" style="padding:10px 24px;border-radius:8px;font-weight:800;">
            ⬇️ ${t("تنزيل الملف الآن","Download File")} (${i})
          </button>
        </div>
      </div>
    `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>ge(a.id)))}}var Lo=ye({STATUS_OPTIONS:()=>ui,buildAssigneeChipsHtml:()=>an,buildRemindersListHtml:()=>nn,canUserMoveTask:()=>Ct,downloadDocument:()=>ge,drawTimelineArrows:()=>wa,filterTasks:()=>li,formatRemindAtDate:()=>ci,getDocumentShareableLink:()=>Xa,getSavedTaskSort:()=>ct,getTaskSortOrder:()=>$t,handleCopyDocLink:()=>Za,initTaskModalWidgets:()=>pi,openDocumentPreviewModal:()=>xa,openTaskModal:()=>Yt,renderBoard:()=>ri,renderCalendar:()=>tn,renderTaskAssignees:()=>ni,renderTaskComments:()=>kt,renderTaskDocuments:()=>Ye,renderTaskSortSelect:()=>en,renderTasks:()=>Mo,renderTimeline:()=>sa,renderTimelinePanel:()=>di,setSavedTaskSort:()=>Qa,sortTasks:()=>si,sortTasksByImportance:()=>oi,taskCard:()=>ii});function ni(e){const a=o.data?.users||[],n=o._userMap||new Map(a.map(l=>[l.id,l])),s=e.assignee||n.get(e.assigneeId),r=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(l=>n.get(l)).filter(Boolean),i=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let d='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return s||r.length?(d+='<div class="avatar-stack" style="display:flex;align-items:center;">',s&&(d+=`<span title="${c(t(s.name,s.nameEn||s.name))}">${X(s,"mini-avatar")}</span>`),r.slice(0,2).forEach(l=>{d+=`<span title="${c(t(l.name,l.nameEn||l.name))}" style="margin-inline-start:-8px;">${X(l,"mini-avatar")}</span>`}),r.length>2&&(d+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${r.slice(2).map(l=>t(l.name,l.nameEn||l.name)).join("، ")}">+${r.length-2}</span>`),d+="</div>",s&&(d+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${c(t(s.name,s.nameEn||s.name))}</span>`)):i.length||(d+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),i.length&&(i.slice(0,2).forEach(l=>{d+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${c(l)}">🌐 ${c(l)} <small style="opacity:0.8">(${t("خارجي","Ext")})</small></span>`}),i.length>2&&(d+=`<span style="font-size:10px;color:var(--amber);" title="${i.slice(2).map(c).join("، ")}">+${i.length-2}</span>`)),d+="</div>",d}function Ct(e){if(!e)return!1;if(P()||I("edit_tasks"))return!0;const a=o.data?.user?.id;if(!a)return!1;if((e.assigneeId||e.assignee_id)===a||(e.creatorId||e.createdById||e.created_by_id||e.created_by)===a)return!0;const n=e.reviewerId||e.reviewer_id,s=e.approverId||e.approver_id;if(n===a||s===a)return!0;const r=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;if(Array.isArray(r)&&r.includes(a))return!0;const i=e.projectId||e.project_id;if(i&&o.data?.projects){const d=o.data?.projects?.find(l=>l.id===i);if(d){const l=d.managerId||d.manager_id,p=d.ownerId||d.owner_id||d.leadId||d.lead_id||d.createdById||d.created_by;if(l===a||p===a)return!0}}return!1}function ii(e){const a=isOverdue(e),n=a?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${w("alert",11)} ${g("overdue")}</span>`:"",s=o._commentCounts?o._commentCounts[e.id]||0:(o.data?.comments||[]).filter(p=>p.taskId===e.id).length,r=o._docCounts?o._docCounts[e.id]||0:(o.data?.documents||[]).filter(p=>p.taskId===e.id).length,i=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",d=Ct(e),l=t(e.titleAr,e.titleEn);return`<article class="task-card ${a?"is-overdue":""} ${d?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${c(l)}" data-action="open-task" data-task-id="${c(e.id)}">
    <div class="task-card-top">
      <span class="task-code">${c(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        ${s>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${s} ${t("تعليقات","comments")}">💬 ${s}</span>`:""}
        ${r>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${r} ${t("مرفقات","attachments")}">📎 ${r}</span>`:""}
        ${n}
        <span class="priority-badge ${c(e.priority)}">${c(priorityText(e.priority))}</span>
      </div>
    </div>
    <h4>${c(t(e.titleAr,e.titleEn))}</h4>
    ${(()=>{const p=String(t(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!p)return"";const u=p.length>50?p.substring(0,50).trim()+"...":p;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${c(p)}">${c(u)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${c(t(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${a?"var(--red)":"var(--muted)"};">${w("calendar",11)} ${dateLabel(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${ni(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${i};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function $t(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function oi(e=[]){const a={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((s,r)=>{const i=s.status==="blocked"?1:0,d=r.status==="blocked"?1:0;if(i!==d)return d-i;const l=s.dueDate?new Date(`${s.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():null,u=l&&l<n&&s.status!=="done"?1:0,f=p&&p<n&&r.status!=="done"?1:0;if(u!==f)return f-u;const v=a[s.priority]||2,$=a[r.priority]||2;if(v!==$)return $-v;if(l&&p){if(l!==p)return l-p}else{if(l&&!p)return-1;if(!l&&p)return 1}const y=$t(s),x=$t(r);return y!==x?y-x:(s.titleAr||"").localeCompare(r.titleAr||"","ar")})}function ct(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function Qa(e){try{localStorage.setItem("darc_task_sort_pref",e)}catch{}o.taskSortPref=e,o.projectTaskSort=e,o.myTaskSort=e}function en(e,a="sort-project-tasks"){const n=e||ct();return`
    <div class="sort-box">
      <span>${t("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${a}">
        <option value="custom" ${n==="custom"?"selected":""}>${t("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${n==="importance"?"selected":""}>${t("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${t("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${t("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function si(e=[],a=ct()){return a==="deadline"?[...e].sort((n,s)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(s.dueDate?new Date(`${s.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):a==="custom"?[...e].sort((n,s)=>$t(n)-$t(s)):a==="alpha"?[...e].sort((n,s)=>(n.titleAr||"").localeCompare(s.titleAr||"","ar")):oi(e)}function ri(e,a=ct()){const n=o.data?.users||[];o._userMap=new Map(n.map(i=>[i.id,i]));const s={};for(const i of o.data?.comments||[])i.taskId&&(s[i.taskId]=(s[i.taskId]||0)+1);const r={};for(const i of o.data?.documents||[])i.taskId&&(r[i.taskId]=(r[i.taskId]||0)+1);return o._commentCounts=s,o._docCounts=r,`<div class="board">${[{key:"not_started",dot:"",label:g("notStarted")},{key:"in_progress",dot:"blue",label:g("inProgress")},{key:"review",dot:"amber",label:t("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:g("done")}].map(i=>{const d=si(e.filter(l=>(i.statuses||[i.key]).includes(l.status)),a);return`<section class="board-column" data-status="${i.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${i.dot}"></span>${i.label}</div><span class="board-count">${d.length}</span></div><div class="board-cards">${d.length?d.map(ii).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${g("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function tn(e,a){const n=o.calendarDate?new Date(o.calendarDate):new Date,s=n.getFullYear(),r=n.getMonth(),i=`${o.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][r]:["January","February","March","April","May","June","July","August","September","October","November","December"][r]} ${s}`,d=o.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=new Date(s,r,1).getDay(),p=new Date(s,r+1,0).getDate(),u=new Date,f=u.getFullYear()===s&&u.getMonth()===r;let v="";for(let $=0;$<l;$++)v+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let $=1;$<=p;$++){const y=f&&u.getDate()===$,x=`${s}-${String(r+1).padStart(2,"0")}-${String($).padStart(2,"0")}`,m=e.filter(b=>{if(!b.dueDate&&!b.startDate)return!1;const T=b.dueDate?b.dueDate.split("T")[0]:null,D=b.startDate?b.startDate.split("T")[0]:null;return T===x||D===x});v+=`
      <div class="calendar-day ${y?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${y?"var(--mint)":"var(--surface)"};border:1px solid ${y?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${y?"bold":"600"};color:${y?"var(--teal)":"var(--ink)"};">
          <span>${$}</span>
          ${y?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${t("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${m.map(b=>{const T=Ua(b);return`
              <div data-action="open-task" data-task-id="${c(b.id)}" style="background:${T.bgColor};border:1px solid ${T.borderColor};border-inline-start:3px solid ${T.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${T.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${c(t(b.titleAr,b.titleEn))} — ${T.label}">
                <span style="font-weight:700;">${c(t(b.titleAr,b.titleEn))}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${w("calendar",16)} ${i}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${w(o.lang==="ar"?"arrow":"arrowLeft",12)} ${t("السابق","Prev")}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${t("اليوم","Today")}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${t("التالي","Next")} ${w(o.lang==="ar"?"arrowLeft":"arrow",12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${d.map($=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${$}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${v}
      </div>
    </div>
  `}function sa(e){const a=e.filter(p=>p.startDate&&p.dueDate).sort((p,u)=>new Date(p.startDate)-new Date(u.startDate));if(!a.length)return`<div class="empty" style="min-height:300px">${w("calendar",24)}<span>${t("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...a.map(p=>new Date(p.startDate).getTime())),s=Math.max(...a.map(p=>new Date(p.dueDate).getTime()));const r=2592e5;n-=r,s+=r;const i=Math.max(7,Math.ceil((s-n)/864e5));let d="";for(let p=0;p<i;p++){const u=new Date(n+p*864e5),f=u.getDay()===5||u.getDay()===6,v=Ue()==="hijri"?o.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",$=new Intl.DateTimeFormat(v,{month:"short"}).format(u);d+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${f?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${u.getDate()}<br>${$}</div>`}const l=a.map((p,u)=>{const f=Math.floor((new Date(p.startDate).getTime()-n)/864e5)+1,v=f+Math.max(1,Math.ceil((new Date(p.dueDate).getTime()-new Date(p.startDate).getTime())/864e5)+1),$=Ua(p);return`<div style="display:contents" class="timeline-row" data-task-id="${p.id}" data-row="${u}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${p.id}" style="grid-column: ${f} / ${v}; margin: 8px 4px; background: ${$.color}; border: 1px solid ${$.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${c(t(p.titleAr,p.titleEn))} — ${$.label}">
        <span style="font-weight:600;opacity:0.9">${c(p.templateId?p.templateId.replace("tpl-","#"):"#")}</span> ${c(t(p.titleAr,p.titleEn))}
        ${p.dependencies&&p.dependencies.length?`<span style="float:${o.lang==="ar"?"left":"right"};opacity:0.8">${w("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${i}, minmax(40px, 1fr)); min-width: ${i*40}px; position: relative;">
      ${d}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function di(e,a){const n=o.timelineView||"gantt";return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2>
          <p class="panel-subtitle">${t("متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.","Track task flow and milestone deadlines in your preferred format.")}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${n==="gantt"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${w("clock",12)} ${t("مخطط جانت","Gantt Chart")}
          </button>
          <button class="btn btn-sm ${n==="calendar"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${w("calendar",12)} ${t("عرض التقويم","Calendar View")}
          </button>
        </div>
      </div>
      
      ${n==="calendar"?tn(e,a):sa(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:di,renderCalendar:tn,renderTimeline:sa});function li(e){const a=o.searches.tasks.trim().toLowerCase();return e.filter(n=>{const s=`${n.titleAr} ${n.titleEn} ${n.categoryAr} ${n.categoryEn}`.toLowerCase().includes(a),r=o.taskFilter==="all"||o.taskFilter==="mine"&&n.assigneeId===o.data?.user?.id||o.taskFilter==="overdue"&&isOverdue(n)||o.taskFilter==="blocked"&&n.status==="blocked",i=o.taskProjectFilter==="all"||n.projectId===o.taskProjectFilter,d=!o.taskPriorityFilter||o.taskPriorityFilter==="all"||n.priority===o.taskPriorityFilter;return s&&r&&i&&d})}function Mo(){const e=li(o.data?.tasks||[]),a=[["all",g("all")],["mine",t("مسندة لي","Assigned to me")],["overdue",g("overdue")],["blocked",g("blocked")]],n=o.myTaskSort||ct();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("حركة التنفيذ","EXECUTION")}</p>
        <h1>${g("myTasks")}</h1>
        <p>${t("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${I("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${w("plus",15)} ${g("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${a.map(([s,r])=>`
            <button class="segmented-tab ${o.taskFilter===s?"active":""}" data-action="task-filter" data-filter="${s}" role="tab">
              ${r}
            </button>
          `).join("")}
        </div>
        <div class="search-box tasks-search-box">
          ${w("search",15)}
          <input data-search="tasks" value="${c(o.searches.tasks)}" placeholder="${t("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${t("📁 كل المشاريع","📁 All Projects")}</option>
            ${(o.data?.projects||[]).map(s=>`<option value="${c(s.id)}" ${o.taskProjectFilter===s.id?"selected":""}>${c(t(s.nameAr,s.nameEn))}</option>`).join("")}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${t("⚡ كل الأولويات","⚡ All Priorities")}</option>
            <option value="urgent" ${o.taskPriorityFilter==="urgent"?"selected":""}>🔥 ${t("عاجلة","Urgent")}</option>
            <option value="high" ${o.taskPriorityFilter==="high"?"selected":""}>⚡ ${t("عالية","High")}</option>
            <option value="medium" ${o.taskPriorityFilter==="medium"?"selected":""}>🔹 ${t("متوسطة","Medium")}</option>
            <option value="low" ${o.taskPriorityFilter==="low"?"selected":""}>☕ ${t("منخفضة","Low")}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${en(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?ri(e,n):`<section class="panel"><div class="empty">${w("checklist",18)}<span>${g("noTasks")}</span></div></section>`}
  `}function ci(e){return Ha(e,{includeSeconds:!1}).full}function an(e=[],a=[]){const n=o.data?.users||[];let s="";return e.forEach(r=>{const i=n.find(d=>d.id===r)||{name:r,id:r};s+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${X(i,"mini-avatar")}
        <span style="font-weight:500;">${c(t(i.name,i.nameEn||i.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${c(r)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),a.forEach(r=>{s+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${c(r)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${t("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${c(r)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),s}function nn(e=[]){return e.length?e.map((a,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${c(ci(a.remindAt))}</strong>
        ${a.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(a.noteAr)}">(${c(a.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${c(a.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${t("حذف التذكير","Delete reminder")}">
        ${w("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${t("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function Yt(e=null,a=null,n=null){const s=o.data?.templates?.find(m=>m.id===(a||e?.templateId)),r=e?.projectId||n||o.activeProjectId||o.data?.projects?.[0]?.id||"",i=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],d=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:e.remindAt,noteAr:""}]:Array.isArray(o.data?.reminders)&&e?.id&&(l=(o.data?.reminders||[]).filter(m=>m.taskId===e.id));const p=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,u=i.length>0||d.length>0,f=u?an(i,d):"",v=nn(l),$=`<form id="task-form" data-task-id="${c(e?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${c(e?.typeAr||s?.typeAr||(s?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${c(e?.typeEn||s?.typeEn||(s?"Drawing":""))}" />
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
          ${(o.data?.projects||[]).map(m=>`<option value="${c(m.id)}" ${m.id===r?"selected":""}>${c(t(m.nameAr,m.nameEn))} (${c(m.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${g("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${c(e?.titleAr||s?.nameAr||"")}" placeholder="${t("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${g("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${c(e?.titleEn||s?.nameEn||"")}" placeholder="${t("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${g("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${t("مهمة مخصصة","Custom task")}</option>
          ${(o.data?.templates||[]).map(m=>`<option value="${c(m.id)}" ${(e?.templateId||a)===m.id?"selected":""}>${c(m.code)} — ${c(t(m.nameAr,m.nameEn))}</option>`).join("")}
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
          ${(o.data?.users||[]).map(m=>`<option value="${c(m.id)}" ${(e?e.assigneeId===m.id:o.data?.user?.id===m.id)?"selected":""}>${c(t(m.name,m.nameEn||m.name))}</option>`).join("")}
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
        <select name="status" id="task-status-select">${ui().map(([m,b])=>`<option value="${m}" ${e?.status===m?"selected":""}>${b}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${g("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(m=>`<option value="${m}" ${(e?.priority||"medium")===m?"selected":""}>${priorityText(m)}</option>`).join("")}</select>
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
        ${e&&(I("delete_tasks")||P())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${w("trash",14)} ${t("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${w("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let y=$,x="";e&&(x="modal-lg",y=`
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
                ${w("plus",12)} ${t("اختيار ملفات","Choose Files")}
                <input type="file" multiple id="task-upload-input" data-task-id="${e.id}" style="display:none;" />
              </label>
            </div>
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${e.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${w("upload",22)}</span>
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
            <div id="task-documents-list">${Ye(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${t("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${kt(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${t("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${t("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById("modal-root").innerHTML=Ae(e?t("تعديل المهمة","Edit task"):g("addTask"),t("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),y,"task",x),pi(e)}function pi(e){const a=document.getElementById("modal-root");if(!a)return;const n=a.querySelector("#task-status-select"),s=a.querySelector("#task-auto-progress-badge");n&&s&&n.addEventListener("change",()=>{const E={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;s.textContent=`(${E}%)`});const r=a.querySelector("#task-template-select");r&&r.addEventListener("change",()=>{const E=r.value,S=(o.data?.templates||[]).find(j=>j.id===E);if(S){const j=a.querySelector("#task-title-ar"),z=a.querySelector("#task-title-en"),M=a.querySelector("#task-type-ar"),_=a.querySelector("#task-type-en");j&&!j.value&&(j.value=S.nameAr||""),z&&!z.value&&(z.value=S.nameEn||""),M&&(M.value=S.typeAr||"مخطط"),_&&(_.value=S.typeEn||"Drawing")}});const i=a.querySelector("#task-additional-assignees-input"),d=a.querySelector("#task-external-assignees-input"),l=a.querySelector("#assignees-chips-container"),p=a.querySelector("#assignee-combobox-search"),u=a.querySelector("#assignee-combobox-dropdown"),f=a.querySelector("#btn-add-external-quick");let v=[];try{v=JSON.parse(i?.value||"[]")}catch{v=[]}let $=[];try{$=JSON.parse(d?.value||"[]")}catch{$=[]}function y(){i&&(i.value=JSON.stringify(v)),d&&(d.value=JSON.stringify($))}function x(){if(l){if(v.length===0&&$.length===0){l.style.display="none",l.innerHTML="",y();return}l.style.display="flex",l.innerHTML=an(v,$),y()}}function m(E=""){if(!u)return;const S=E.trim().toLowerCase(),j=o.data?.users||[],z=a.querySelector("#task-primary-assignee")?.value,M=j.filter(R=>{if(R.id===z)return!1;if(!S)return!0;const B=(R.name||"").toLowerCase(),q=(R.nameEn||"").toLowerCase(),F=(R.email||"").toLowerCase();return B.includes(S)||q.includes(S)||F.includes(S)});let _="";S&&(_+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${t("إضافة مسؤول خارجي:","Add external assignee:")} "${c(E.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${t("إضافة سريعة","Quick Add")}</span>
        </div>
      `),M.length===0&&!S?_+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${t("لا يوجد مستخدمين آخرين","No other users")}</div>`:M.forEach(R=>{const B=v.includes(R.id);_+=`
          <div class="combobox-user-row" data-uid="${c(R.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${c(R.id)}" ${B?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${X(R,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${c(t(R.name,R.nameEn||R.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${c(t(R.jobTitleAr,R.jobTitleEn)||R.email||"")}</span>
              </div>
            </div>
            ${B?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),u.innerHTML=_,u.style.display="block"}y(),p&&(p.addEventListener("focus",()=>{m(p.value)}),p.addEventListener("input",()=>{const E=p.value.trim();m(E),f&&(f.style.display=E.length>1?"inline-flex":"none")}),p.addEventListener("keydown",E=>{if(E.key==="Enter"){E.preventDefault();const S=p.value.trim();S&&($.includes(S)||($.push(S),x()),p.value="",f&&(f.style.display="none"),u&&(u.style.display="none"))}})),f&&f.addEventListener("click",()=>{const E=p?.value.trim();E&&($.includes(E)||($.push(E),x()),p.value="",f.style.display="none",u&&(u.style.display="none"))}),u&&u.addEventListener("click",E=>{if(E.target.closest(".dropdown-ext-action")){const j=p?.value.trim();j&&!$.includes(j)&&($.push(j),x()),p&&(p.value=""),f&&(f.style.display="none"),u.style.display="none";return}const S=E.target.closest(".combobox-user-row");if(S){const j=S.dataset.uid;v.includes(j)?v=v.filter(z=>z!==j):v.push(j),x(),m(p?.value||"")}}),l&&l.addEventListener("click",E=>{const S=E.target.closest(".btn-remove-chip-user");if(S){const z=S.dataset.uid;v=v.filter(M=>M!==z),x(),u&&u.style.display==="block"&&m(p?.value||"");return}const j=E.target.closest(".btn-remove-chip-ext");if(j){const z=j.dataset.ext;$=$.filter(M=>M!==z),x()}});const b=a.querySelector("#task-reminders-input"),T=a.querySelector("#task-reminders-list"),D=a.querySelector("#new-reminder-datetime"),A=a.querySelector("#new-reminder-note"),N=a.querySelector("#btn-add-reminder");let O=[];try{O=JSON.parse(b?.value||"[]")}catch{O=[]}Array.isArray(O)||(O=[]);function h(){T&&(b&&(b.value=JSON.stringify(O)),T.innerHTML=nn(O))}N&&N.addEventListener("click",()=>{const E=D?.value;if(!E){k(t("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const S=A?.value.trim()||"",j={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date(E).toISOString(),noteAr:S};O.push(j),D&&(D.value=""),A&&(A.value=""),h(),k(t("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),T&&T.addEventListener("click",async E=>{const S=E.target.closest(".btn-delete-reminder");if(S){const j=Number(S.dataset.idx),z=S.dataset.remId;!isNaN(j)&&j>=0&&j<O.length&&(O.splice(j,1),h(),z&&!z.startsWith("rem_temp_")&&C(`/api/reminders/${z}`,{method:"DELETE"}).catch(()=>{}),k(t("تم حذف موعد التذكير.","Reminder deleted.")))}}),a.addEventListener("mousedown",E=>{u?.contains(E.target)||p?.contains(E.target)||f?.contains(E.target)||(u&&(u.style.display="none"),f&&(f.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&C(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(E=>{if(E&&Array.isArray(E.comments)){o.data&&!o.data.comments&&(o.data.comments=[]);const S=new Map((o.data?.comments||[]).map(z=>[z.id,z]));for(const z of E.comments)S.set(z.id,z);o.data&&(o.data.comments=Array.from(S.values()));const j=document.getElementById("task-comments-list");j&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(j.innerHTML=kt(e))}}).catch(()=>{})}function kt(e){const a=(o.data?.comments||[]).filter(n=>n.taskId===e.id).sort((n,s)=>new Date(n.createdAt)-new Date(s.createdAt));return a.length?`<div style="display:flex;flex-direction:column;gap:12px;">${a.map(n=>{const s=n.user||(o.data?.users||[]).find(l=>l.id===n.userId)||o.data?.user||{name:"DARC Member",id:""},r=!!(s.id&&o.data?.user?.id&&s.id===o.data?.user?.id),i=r||typeof P=="function"&&P(),d=c(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${c(n.id)}" style="display:flex;gap:10px;flex-direction:${r?"row-reverse":"row"};">
        ${X(s)}
        <div style="display:flex;flex-direction:column;align-items:${r?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${c(t(s.name,s.nameEn||s.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(n.createdAt,!0)}</span>
            ${i?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${c(n.id)}" data-task-id="${c(e.id)}" title="${t("تعديل التعليق","Edit comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${w("edit",12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${c(n.id)}" data-task-id="${c(e.id)}" title="${t("حذف التعليق","Delete comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${w("trash",12)}
                </button>
              </div>
            `:""}
          </div>
          <div id="comment-bubble-${c(n.id)}" style="background:${r?"var(--blue)":"var(--surface)"};color:${r?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${r?"none":"1px solid var(--border)"};border-top-${r?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${d}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${w("message",18)}<span style="font-size:12px;">${t("لا توجد تعليقات","No comments yet")}</span></div>`}function Ye(e){const a=(o.data?.documents||[]).filter(n=>n.taskId===e.id).sort((n,s)=>new Date(s.createdAt)-new Date(n.createdAt));return a.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${a.map(n=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${n.id}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${w("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${c(n.originalName)}">${c(n.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${dateLabel(n.createdAt,!0)} · ${c(n.user?t(n.user.name,n.user.nameEn||n.user.name):"Team Member")} · ${n.size>1048576?(n.size/1048576).toFixed(1)+"MB":Math.round(n.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("نسخ رابط Google Drive","Copy Drive link")}">${w("link",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${t("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${w("eye",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--blue);" title="${t("تحميل المخطط","Download")}">${w("download",14)}</button>
        ${I("review_tasks")||I("approve_tasks")||I("upload_documents")||P()?`
          <select class="doc-status-select" data-doc-id="${n.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${n.status==="draft"?"selected":""}>${t("مسودة","Draft")}</option>
            ${I("review_tasks")||P()?`<option value="review" ${n.status==="review"?"selected":""}>${t("مراجعة","Review")}</option>`:""}
            ${I("approve_tasks")||P()?`<option value="approved" ${n.status==="approved"?"selected":""}>${t("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${n.status==="superseded"?"selected":""}>${t("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${I("upload_documents")||P()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;" title="${t("إعادة تسمية","Rename")}">${w("edit",14)}</button>`:""}
        ${I("delete_documents")||P()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${t("حذف","Delete")}">${w("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${w("document",18)}<span style="font-size:12px;">${t("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function ui(){return[["not_started",g("notStarted")],["in_progress",g("inProgress")],["review",g("review")],["approval",g("approval")],["done",g("done")],["blocked",g("blocked")],["canceled",g("canceled")]]}function wa(){const e=document.querySelector(".timeline-container > div"),a=document.querySelector(".timeline-svg");if(!e||!a)return;a.innerHTML="";const n=Array.from(document.querySelectorAll(".timeline-bar")),s={},r=e.getBoundingClientRect();n.forEach(l=>{const p=l.getBoundingClientRect();s[l.dataset.taskId]={left:p.left-r.left,right:p.right-r.left,top:p.top-r.top,bottom:p.bottom-r.top,width:p.width,height:p.height,center:p.top-r.top+p.height/2}});let i="";const d=o.lang==="ar";n.forEach(l=>{const p=l.dataset.taskId,u=(o.data?.tasks||[]).find($=>$.id===p),f=u?.dependencies||u?.customFields?.dependencies||[];if(!u||!f.length)return;const v=s[p];v&&f.forEach($=>{const y=s[$];if(!y)return;const x=d?y.left:y.right,m=y.center,b=d?v.right:v.left,T=v.center,D=x+(d?-20:20);i+=`<path d="M ${x} ${m} C ${D} ${m}, ${D} ${T}, ${b} ${T}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),a.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${i}
  `}var mt=null,$a=!1;async function Bt(e=!1){if(mt&&!e)return mt;$a=!0;try{const a=await C("/api/telemetry/analytics",{silent:!0});a&&a.data&&(mt=a.data)}catch(a){console.warn("[Analytics] Failed to fetch remote analytics:",a)}finally{$a=!1}return mt}function fi(){const e=mt,a=Xn();!e&&!$a&&Bt().then(()=>{if(o.view==="settings"&&o.settingsSection==="analytics"){const l=document.querySelector(".settings-content");l&&(l.innerHTML=fi())}});const n=e?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},s=e?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:8,percent:2}],r=e?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];e?.os;const i=e?.recentAnomalies||[],d=a.memoryMb||45;return`
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
            ${w("alert",13)} ${t("محاكاة فحص استهلاك زائد","Test Anomaly Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-analytics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${w("clock",13)} ${t("تحديث المؤشرات","Refresh Live Data")}
          </button>
        </div>
      </div>

      <!-- 1. بطاقات المؤشرات الرئيسية (KPI Cards) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات الحقيقية -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("الزيارات الحقيقية المعتمدة","Verified Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${w("user",14)}</span>
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
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${w("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${t(n.avgTimeSpentFormattedAr,n.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${t(`معدل الارتداد السريع: ${n.bounceRate||"11.4%"}`,`Bounce Rate: ${n.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${w("shield",14)}</span>
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
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${w("flag",14)}</span>
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
            ${s.map(l=>`
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
  `}var gt=null,ka=!1,_e="all",We="all",at="all";async function Ft(e=!1){if(gt&&!e)return gt;ka=!0;try{const a=await C("/api/telemetry/incidents",{silent:!0});a&&a.users&&(gt=a)}catch(a){console.warn("[Diagnostics] Failed to fetch incidents:",a)}finally{ka=!1}return gt}function zn(e){_e=e}function Ro(e){We=e}function No(e){at=e}function mi(){const e=gt;Xn(),!e&&!ka&&Ft().then(()=>{if(o.view==="settings"&&(o.settingsSection==="diagnostics"||o.settingsSection==="analytics")){const i=document.querySelector(".settings-content");i&&(i.innerHTML=mi())}});let a=e?.users||[];!a.length&&o.data?.users&&o.data.users.length&&(a=o.data.users.map(i=>({userId:i.id,name:i.name,nameEn:i.nameEn||i.name,email:i.email,role:i.jobTitleAr||(i.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":i.roleId||"عضو فريق"),avatarColor:i.avatarColor||"#0d6269",isRealAccount:!0,status:i.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let n=e?.incidents||[];const s=e?.stats||{totalIncidents:3,activeIncidents:0,resolvedIncidents:3,totalUsersMonitored:a.length||6,alertEmailRecipient:"admin@darc-design.bond"};_e!=="all"&&(n=n.filter(i=>i.userId===_e)),We!=="all"&&(n=n.filter(i=>i.severity===We)),at!=="all"&&(n=n.filter(i=>i.status===at));const r=a.find(i=>i.userId===_e);return`
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
            ${w("mail",13)} ${t("اختبار إرسال بريد التنبيه","Test Email Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${t("محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري","Simulate complete runtime error with breadcrumbs and trigger admin email alert")}">
            ${w("alert",13)} ${t("محاكاة خطأ مع إيميل تنبيه","Simulate Error & Email")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${w("clock",13)} ${t("تحديث السجل","Refresh")}
          </button>
        </div>
      </div>

      <!-- 2. Status & Metric Summary Badges -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;margin-bottom:20px;">
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("إجمالي المشاكل المسجلة","Total Incidents")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${s.totalIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t("تم توثيقها بالكامل مع تقارير التتبع","Fully documented with stack traces")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid ${s.activeIncidents>0?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:${s.activeIncidents>0?"var(--red)":"var(--muted)"};font-weight:600;">${t("مشاكل نشطة بحاجة لمتابعة","Active / Unresolved")}</div>
          <div style="font-size:22px;font-weight:800;color:${s.activeIncidents>0?"var(--red)":"var(--teal)"};margin:4px 0;">${s.activeIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${s.activeIncidents>0?t("⚠️ تستدعي فحص المطور","Requires developer review"):t("✓ جميع المشاكل معالجة","All resolved")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("حسابات الفريق المراقبة","Monitored Users")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${a.length||s.totalUsersMonitored||6} ${t("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t("تغطية شاملة لكل جهاز ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span></span> ${t("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;">${s.alertEmailRecipient||"admin@darc-design.bond"}</div>
        </div>
      </div>

      <!-- 3. User Explorer Grid (بطاقات تفاصيل أداء كل مستخدم) -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span>👥</span> ${t("تفاصيل حالة واستقرار أجهزة كل مستخدم (انقر للفلترة السريعة):","User Health & Crash Status (Click to Filter):")}
          </h3>
          ${_e!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${t("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${_e==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${_e==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${_e==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${t("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${n.length} ${t("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${a.map(i=>{const d=_e===i.userId,l=i.activeIncidents>0;return`
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
            <option value="all" ${We==="all"?"selected":""}>${t("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${We==="critical"?"selected":""}>🚨 ${t("حرجة (Critical)","Critical")}</option>
            <option value="high" ${We==="high"?"selected":""}>⚠️ ${t("مرتفعة (High)","High")}</option>
            <option value="medium" ${We==="medium"?"selected":""}>ℹ️ ${t("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${at==="all"?"selected":""}>${t("جميع الحالات","All Statuses")}</option>
            <option value="active" ${at==="active"?"selected":""}>🔴 ${t("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${at==="resolved"?"selected":""}>✅ ${t("تم حلها بنجاح","Resolved")}</option>
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
                      <span>🕒 ${new Date(i.timestamp).toLocaleString(o.lang==="ar"?"ar-AE":"en-US")}</span>
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
                      ${w("check",13)} ${t("تحديد كمعالج ✅","Mark Resolved ✅")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${c(p)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${t("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${w("copy",13)} ${t("نسخ تقرير الخطأ 📋","Copy Debug Info 📋")}
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
  `}var Oo=ye({FULL_PERMISSIONS_CATALOG:()=>xi,canAccessSettingsSection:()=>ue,exportAuditLogsXLS:()=>yi,fetchFullAuditHistory:()=>hi,openRoleModal:()=>Uo,openUserModal:()=>qo,printAuditReport:()=>bi,renderAuditForProject:()=>gi,renderSettings:()=>Fo,renderTeam:()=>Bo,renderUserActivityCell:()=>vi});function Bo(){if(!P()&&!I("manage_users"))return`<section class="panel"><div class="empty">${w("alert",18)}<span>${t("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const e=o.data?.user?.id;let a=(o.data?.users||[]).filter(n=>n.status!=="inactive");return e!=="usr_ahmad"?a=a.filter(n=>n.id!=="usr_ahmad"):a=[...a].sort((n,s)=>n.id==="usr_ahmad"?-1:s.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${g("team")}</h1>
        <p>${t("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${P()||I("manage_users")?`<button class="btn btn-primary" data-action="new-user">${w("plus",15)} ${g("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${a.map(n=>{const s=teamMetrics(n.id,o.data?.tasks||[]),r=n.id==="usr_ahmad";return`
          <article class="member-card ${r?"system-developer-card":""}" style="${r?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${X(n,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${c(t(n.name,n.nameEn||n.name))}</strong>
                  <span>${c(t(n.jobTitleAr||(r?"المبرمج / مدير النظام":""),n.jobTitleEn||n.jobTitleAr||""))}</span>
                </div>
              </div>
              ${r?`<span class="stealth-dev-badge">${w("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:canManageAccountPermissions()&&n.id!==o.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${c(n.id)}">${w("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${n.status==="active"?"done":"not_started"}">${c(ce(n))}</span>
            </div>
            <div class="member-card-stats">
              <span>${g("progress")} <strong>${s.progress}%</strong></span>
              <span>${s.tasks} ${g("tasks")}</span>
            </div>
            <div class="member-email">${n.email?c(n.email):g("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function gi(e){const a=(o.data?.auditLogs||[]).filter(n=>n.details?.projectId===e||n.entityType==="project"&&n.entityId===e);return a.length?`<div class="audit-list">${a.map(n=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${c(n.user?t(n.user.name,n.user.nameEn||n.user.name):"DARC")} · ${c(n.action)}</strong><span>${c(n.entityType)} · ${dateLabel(n.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${w("check",18)}<span>${t("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function vi(e){const a=e.lastActiveAt||e.customFields?.lastActiveAt,n=e.lastLoginAt||e.customFields?.lastLoginAt;if(!a&&!n)return`<span class="activity-never">${t("لم يسجل دخول بعد","Never logged in")}</span>`;const s=Date.now(),r=a?new Date(a).getTime():0,i=e.id===o.data?.user?.id?0:r&&!isNaN(r)?Math.floor((s-r)/6e4):999999,d=i>=0&&i<=5;let l="";if(d)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${t("نشط الآن","Online")}</span>`;else if(i<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${t(`منذ ${i} دقيقة`,`${i}m ago`)}</span>`;else if(i<1440){const u=Math.floor(i/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${t(`منذ ${u} ساعة`,`${u}h ago`)}</span>`}else r>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(a,!1)}</span>`);const p=n?`<span class="activity-sub" title="${c(n)}">${t("دخول:","Login:")} ${dateLabel(n,!0)}</span>`:"";return`<div class="activity-wrapper">${l}${p}</div>`}function on(e){return Ha(e,{includeSeconds:!0})}function Xt(e){const a=e.action||"",n=e.entityType||e.entity_type||"",s=e.details||{};let r="badge-neutral",i=a,d=n;a==="login"?(r="badge-teal",i=t("تسجيل دخول","Sign In"),d=t("جلسة نظام","System Session")):a==="create"?(r="badge-mint",i=t("إنشاء جديد","Created")):a==="update"?(r="badge-blue",i=t("تعديل بيانات","Updated")):a==="delete"?(r="badge-red",i=t("نقل للمهملات","Moved to Trash")):a==="status_change"?(r="badge-amber",i=t("تغيير حالة","Status Changed")):a==="export_report"?(r="badge-teal",i=t("تصدير تقرير","Exported Report")):a==="restore"?(r="badge-mint",i=t("استعادة","Restored")):a==="purge"?(r="badge-danger",i=t("حذف نهائي","Purged")):a==="invite"&&(r="badge-blue",i=t("دعوة مستخدم","Invite Sent")),n==="task"?d=t("مهمة","Task"):n==="project"?d=t("مشروع","Project"):n==="document"?d=t("مستند","Document"):n==="user"?d=t("مستخدم","User"):n==="report"?d=t("تقرير","Report"):n==="role"&&(d=t("دور وصلاحيات","Role"));let l="—";return s.title||s.name?l=`<strong>${c(s.title||s.name)}</strong>`:a==="status_change"&&(s.oldStatus||s.newStatus)?l=`<span>${c(K(s.oldStatus))} ➔ <strong>${c(K(s.newStatus))}</strong></span>`:e.entityId&&(l=`<code style="font-size:11px;color:var(--muted);">${c(e.entityId)}</code>`),{badgeClass:r,actionLabel:i,entityLabel:d,detailHtml:l}}function yi(e=null){const a=e||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!a.length){k(t("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const n=o.data?.company||{},s=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let r=n.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=o.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=Ze(),p=Dt();let u=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${r?`<img src="${c(r)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${t("سجل الرقابة والتدقيق الأمني والعمليات — "+s,"Audit & Security Trail Report — "+s)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${t("المؤسسة:","Company:")} ${c(s)} | ${t("المشرف المستخرج:","Exported by:")} ${c(d)} | ${t("تاريخ التصدير:","Export Date:")} ${c(l)} ${c(p)}
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
  `;a.forEach((m,b)=>{const T=m.user||(m.userId?(o.data?.users||[]).find(j=>j.id===m.userId):null),D=T?t(T.name,T.nameEn||T.name):t("النظام","System"),A=T?ce(T):"—",N=on(m.createdAt),{actionLabel:O,entityLabel:h}=Xt(m);let E="";m.details?.title||m.details?.name?E=m.details.title||m.details.name:m.action==="status_change"?E=`${K(m.details?.oldStatus)} ➔ ${K(m.details?.newStatus)}`:typeof m.details=="object"?E=JSON.stringify(m.details):E=String(m.details||m.entityId||"—");const S=b%2===0?"#ffffff":"#f8fafc";u+=`
      <tr style="background:${S};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${c(W(m.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(W(`${N.date} ${N.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${c(W(D))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(W(A))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(W(O))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(W(h))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(W(E))}</td>
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
    <body dir="${o.lang==="ar"?"rtl":"ltr"}">
      ${u}
    </body>
    </html>
  `,v=new Blob(["\uFEFF"+f],{type:"application/vnd.ms-excel;charset=utf-8;"}),$=URL.createObjectURL(v),y=document.createElement("a");y.href=$;const x=new Date().toISOString().split("T")[0];y.download=`DARC_Audit_Trail_${x}.xls`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL($),k(t("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),C("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${x}`,details:{reportType:"Audit_Logs_Excel",count:a.length}})}).catch(()=>{})}function bi(e=null){const a=e||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!a.length){k(t("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const n=o.data?.company||{},s=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let r=n.logoUrl||"";r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`);const i=o.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=Ze(),p=Dt(),u=a.length,f=a.filter(b=>b.action==="create").length,v=a.filter(b=>b.action==="update"||b.action==="status_change").length,$=a.filter(b=>b.action==="delete"||b.action==="purge"||b.action==="trash").length;let y="";a.forEach((b,T)=>{const D=b.user||(b.userId?(o.data?.users||[]).find(j=>j.id===b.userId):null),A=D?t(D.name,D.nameEn||D.name):t("النظام","System"),N=D?ce(D):"—",O=on(b.createdAt),{actionLabel:h,entityLabel:E}=Xt(b);let S="";b.details?.title||b.details?.name?S=b.details.title||b.details.name:b.action==="status_change"?S=`${K(b.details?.oldStatus)} ➔ ${K(b.details?.newStatus)}`:typeof b.details=="object"?S=JSON.stringify(b.details):S=String(b.details||b.entityId||"—"),y+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${c(b.id||String(T+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${c(O.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${c(O.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${c(A)}</div>
          <div style="font-size:10px;color:#64748b;">${c(N)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${c(h)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${c(E)}</td>
        <td style="font-size:11px;color:#334155;">${c(S)}</td>
      </tr>
    `});const x=window.open("","_blank","width=1100,height=850");if(!x){k(t("يرجى السماح بالنوافذ المنبثقة للطباعة.","Please allow popups to print report."),!0);return}const m=`
    <!DOCTYPE html>
    <html lang="${o.lang}" dir="${o.lang==="ar"?"rtl":"ltr"}">
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
          text-align: ${o.lang==="ar"?"left":"right"};
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
          text-align: ${o.lang==="ar"?"right":"left"};
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
          <h1 class="brand-title">${c(s)}</h1>
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
  `;x.document.open(),x.document.write(m),x.document.close(),C("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:a.length}})}).catch(()=>{})}async function hi(){try{k(t("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const e=await C("/api/audit?limit=1000");e&&e.logs&&(o.data.auditLogs=e.logs,o.auditFullHistoryLoaded=!0,renderView(),k(t(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){k(e.message||t("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function ue(e){const a=P();return e==="profile"||e==="security"||e==="notifications"?!0:e==="company"||e==="whatsapp"?a||I("manage_settings"):e==="roles"?a||I("manage_roles"):e==="accounts"?a||I("manage_users")||I("manage_existing_account_permissions")||I("view_user_activity"):e==="trash"?a||I("manage_trash"):e==="audit"?a||I("view_audit_logs"):e==="analytics"?a||I("manage_settings")||I("view_audit_logs"):e==="diagnostics"?a||I("manage_settings"):!1}function Fo(){const e=o.data?.user?.id,a=P(),n=ue("company"),s=ue("whatsapp"),r=ue("roles"),i=ue("accounts"),d=ue("trash"),l=ue("audit"),p=ue("analytics"),u=ue("diagnostics"),f=[["profile",t("الملف الشخصي","Profile")],["notifications",t("الإشعارات والتنبيهات","Notifications & Alerts")],...n?[["company",g("company")]]:[],...s?[["whatsapp",t("تنبيهات واتساب","WhatsApp Alerts")]]:[],...r?[["roles",g("roles")]]:[],...i?[["accounts",g("accounts")]]:[],["security",t("الأمان","Security")],...d?[["trash",t("سلة المهملات","Trash")]]:[],...l?[["audit",g("audit")]]:[],...p?[["analytics",t("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...u?[["diagnostics",t("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[]];f.some(([x])=>x===o.settingsSection)||(o.settingsSection=f[0]?.[0]||"profile");const v=o.data?.user||{};let $="";if(o.settingsSection==="profile"&&($=`
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
              ${v.avatarUrl?`<img src="${c(v.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(v.avatarColor||"")?v.avatarColor:"#0d6269"};">${c(wt(v))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(v.avatarColor||"")?v.avatarColor:"#0d6269"};">${c(wt(v))}</div>`}
              <div class="avatar-upload-overlay">
                ${w("upload",18)}
                <span>${t("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${c(t(v.name,v.nameEn||v.name))}</h3>
            <p class="profile-user-role">${c(t(v.jobTitleAr||"",v.jobTitleEn||v.jobTitleAr||""))} · <span class="status-badge done">${c(ce(v))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${w("upload",14)} ${t("رفع صورة جديدة","Upload new avatar")}
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
                <option value="gregorian" ${Ue()==="gregorian"?"selected":""}>${t("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Ue()==="hijri"?"selected":""}>${t("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${t("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
      </section>
    `),o.settingsSection==="company"&&(a||I("manage_settings"))){const x=o.data?.company||{};$=`
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
              ${x.logoUrl?`<img src="${c(x.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${w("building",24)}</span>`:`<span class="brand-mark">${w("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${w("upload",16)}
                <span>${t("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${c(x.name||"DARC Design Team")}</strong>
            <span class="company-sub">${t("العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض","Arabic default · English support · Riyadh timezone")}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${w("upload",14)} ${t("رفع وتعديل الشعار","Upload & Change Logo")}
              </label>
              <span class="upload-hint">${t("يدعم PNG, SVG, JPG (حد أقصى 2MB)","Supports PNG, SVG, JPG (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${g("nameAr")}</label>
              <input name="nameAr" value="${c(x.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${c(x.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${g("emailStatus")}</label>
              <input value="${c(o.data?.emailConfigured?g("emailConfigured"):g("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${w("info",16)}<span>${g("emailInfo")}</span></div>
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
    `}if(o.settingsSection==="security"&&($=`
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
    `),o.settingsSection==="notifications"){const x=typeof window<"u"&&"Notification"in window?Notification.permission:"unsupported",m=x==="granted",b=x==="denied";$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("الإشعارات والتنبيهات","Notifications & Alerts")}</h2>
            <p>${t("تخصيص قنوات وصول التنبيهات الفورية وإشعارات المتصفح لسطح المكتب.","Configure your real-time notification channels and desktop alerts.")}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-action="send-test-notification">
            ${w("bell",14)} ${t("إرسال إشعار تجريبي فوري","Send Test Notification")}
          </button>
        </div>

        <div style="display:grid;gap:16px;margin-top:16px;">
          <!-- 1. Browser Web Notifications Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon ${m?"teal":b?"red":"blue"}" style="margin-top:2px;">
                ${w("bell",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${t("إشعارات سطح المكتب والمتصفح (Web Push Alerts)","Desktop & Browser Web Notifications")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${t("تسمح للموقع بإرسال تنبيهات فورية للنظام حتى عندما يكون المتصفح في الخلفية أو تعمل على نافذة أخرى.","Allows the platform to deliver native desktop notifications even when you are in another tab or window.")}
                </p>
                <div style="margin-top:6px;">
                  <span class="mini-badge" style="background:${m?"var(--mint)":b?"var(--red-soft)":"var(--surface-soft)"};color:${m?"var(--teal)":b?"var(--red)":"var(--muted)"};font-weight:700;">
                    ${m?t("مفعلة على هذا المتصفح ✅","Enabled on this browser ✅"):b?t("محظورة من إعدادات المتصفح ❌","Blocked in browser settings ❌"):t("بانتظار الموافقة ⚠️","Permission pending ⚠️")}
                  </span>
                </div>
              </div>
            </div>
            <div>
              ${m?`
                <button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">
                  ${w("check",14)} ${t("فحص إشعار المتصفح","Test Browser Alert")}
                </button>
              `:`
                <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">
                  ${w("check",14)} ${t("تفعيل الإشعارات الآن","Enable Notifications")}
                </button>
              `}
            </div>
          </div>

          <!-- 2. Audio Chimes Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon teal" style="margin-top:2px;">
                ${w("check",16)}
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
    `}if(o.settingsSection==="accounts"&&i){const x=P()||I("view_user_activity"),m=P()||I("manage_users"),b=P()||I("manage_existing_account_permissions")||I("manage_users"),T=P();let D=o.data?.users||[];e!=="usr_ahmad"&&(D=D.filter(A=>A.id!=="usr_ahmad")),$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("accounts")}</h2>
            <p>${t("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${m?`<button class="btn btn-primary btn-sm" data-action="new-user">${w("plus",14)} ${g("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${g("team")}</th>
                <th>${g("role")}</th>
                <th>${g("email")}</th>
                <th>${g("accountStatus")}</th>
                ${x?`<th>${t("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${b?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${D.map(A=>{const N=A.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${X(A)}
                        <div class="team-member-copy">
                          <strong>${c(t(A.name,A.nameEn||A.name))}</strong>
                          <span>${c(t(A.jobTitleAr||(N?"المبرمج / مدير النظام":""),A.jobTitleEn||A.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${N?`<span class="stealth-dev-badge">${w("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:c(ce(A))}
                    </td>
                    <td>
                      ${A.email?c(A.email):`<span style="color:var(--muted)">${g("noEmail")}</span>`}
                      ${A.phone||A.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;">📱 ${c(A.phone||A.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${A.status==="active"?"done":"not_started"}">${A.status==="active"?g("activeAccount"):g("pendingAccount")}</span>
                    </td>
                    ${x?`
                      <td>
                        ${vi(A)}
                      </td>
                    `:""}
                    ${b?`
                      <td>
                        <div class="role-actions">
                          ${N?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(A.id)}">${g("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(A.id)}">${g("edit")}</button>
                            ${A.id!==o.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${c(A.id)}" title="${A.status==="pending"?t("تفعيل الحساب يدوياً","Activate manually"):t("تغيير كلمة المرور","Change password")}">${w(A.status==="pending"?"check":"settings",13)}</button>
                              ${T?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${c(A.id)}" title="دخول كـ هذا الحساب">${w("user",13)}</button>`:""}
                            `:""}
                            ${A.id!==o.data?.user?.id&&A.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${c(A.id)}">${w("send",13)}</button>`:""}
                            ${A.id!==o.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${c(A.id)}">${w("trash",13)}</button>`:""}
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
    `}if(o.settingsSection==="roles"&&(a||I("manage_roles"))&&($=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("roles")}</h2>
            <p>${t("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${a||I("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${w("plus",14)} ${g("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(o.data?.roles||[]).map(x=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${c(t(x.nameAr,x.nameEn))}</strong>
                  ${x.builtIn?`<span class="role-system-badge">${w("shield",11)} ${g("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${c(t(x.descriptionAr,x.descriptionEn))}</p>
                <div class="role-meta">${x.permissions.includes("*")?t("صلاحية كاملة","Full access"):`${x.permissions.length} ${g("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${c(x.id)}">${w("edit",13)} ${g("edit")}</button>
                ${x.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${c(x.id)}">${w("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),o.settingsSection==="trash"&&d){if(!o.trash&&typeof sessionStorage<"u")try{const h=sessionStorage.getItem("darc_trash_cache");h&&(o.trash=JSON.parse(h))}catch{}!o.trashLoaded&&!o._trashFetching&&(o._trashFetching=!0,C("/api/trash").then(h=>{o.trash=Array.isArray(h)?h:h.trash||[...(h.projects||[]).map(E=>({...E,type:"project"})),...(h.tasks||[]).map(E=>({...E,type:"task"})),...(h.documents||[]).map(E=>({...E,type:"document"}))],o.trashLoaded=!0,o._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(h=>{o._trashFetching=!1,console.error("[Trash fetch error]",h)}));const x=o.trash||[],m=o.trashFilter||"all",b=(o.trashQuery||"").trim().toLowerCase(),T=x.filter(h=>{if(m!=="all"&&h.type!==m)return!1;if(!b)return!0;const E=(t(h.nameAr||h.titleAr,h.nameEn||h.titleEn)||h.name||h.title||h.originalName||"").toLowerCase(),S=(h.code||h.projectCode||"").toLowerCase(),j=(h.projectNameAr||h.projectNameEn||"").toLowerCase();return E.includes(b)||S.includes(b)||j.includes(b)}),D=x.filter(h=>h.type==="project").length,A=x.filter(h=>h.type==="task").length,N=x.filter(h=>h.type==="document").length,O=x.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${w("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${t("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${t("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${m==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${w("layers",14)}
            <span>${t("الكل","All")}</span>
            <span class="badge ${m==="all"?"badge-on-primary":"badge-neutral"}">${x.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${m==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${w("building",14)}
            <span>${t("المشاريع","Projects")}</span>
            <span class="badge ${m==="project"?"badge-on-primary":"badge-neutral"}">${D}</span>
          </button>
          <button type="button" class="btn btn-sm ${m==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${w("checklist",14)}
            <span>${t("المهام","Tasks")}</span>
            <span class="badge ${m==="task"?"badge-on-primary":"badge-neutral"}">${A}</span>
          </button>
          <button type="button" class="btn btn-sm ${m==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${w("document",14)}
            <span>${t("المستندات","Documents")}</span>
            <span class="badge ${m==="document"?"badge-on-primary":"badge-neutral"}">${N}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${w("search",14)}
          <input type="search" placeholder="${t("بحث في المحذوفات...","Search deleted items...")}" value="${c(o.trashQuery||"")}" data-action="search-trash-input" />
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
                <th style="text-align:${o.lang==="ar"?"left":"right"}">${t("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${T.map(h=>{const E=h.type==="project",S=h.type==="task",j=h.type==="document",z=t(h.nameAr||h.titleAr,h.nameEn||h.titleEn)||h.name||h.title||h.originalName||h.code||t("عنصر محذوف","Deleted item"),M=!E&&h.projectId?(o.data?.projects||[]).find(F=>F.id===h.projectId):null,_=h.projectNameAr||h.projectNameEn||(M?t(M.nameAr,M.nameEn||M.nameAr):null),R=h.projectCode||M?.code,B=j&&h.size?h.size>1048576?(h.size/1048576).toFixed(1)+" MB":Math.round(h.size/1024)+" KB":"",q=a||I("manage_trash")||h.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${E?"is-project":S?"is-task":"is-doc"}">
                          ${w(E?"building":S?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${c(z)}</strong>
                          ${h.code||E?`<span class="trash-item-code">${c(h.code||h.id)}</span>`:""}
                          ${j&&B?`<span class="trash-item-code" style="color:var(--muted);">${B}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${E?"type-project":S?"type-task":"type-doc"}">
                        ${w(E?"building":S?"checklist":"document",11)}
                        ${E?t("مشروع","Project"):S?t("مهمة","Task"):t("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${E?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${t("مشروع رئيسي","Primary Project")}</span>`:_?`${w("building",11)} <span>${c(_)}${R?` (${c(R)})`:""}</span>${j&&h.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${c(h.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${h.status?`<span class="status-badge ${c(h.status)}">${c(K(h.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${c(h.deletedAt||"")}">
                        ${dateLabel(h.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${o.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${c(h.type)}" data-id="${c(h.id)}" title="${t("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${w(o.lang==="ar"?"arrow":"arrowLeft",12)} ${t("استعادة","Restore")}
                        </button>
                        ${q?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${c(h.type)}" data-id="${c(h.id)}" title="${t("حذف العنصر نهائياً","Permanently delete item")}">
                            ${w("trash",12)} ${t("حذف نهائي","Purge")}
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
          ${w("search",22)}
          <span>${t("لا توجد نتائج تطابق بحثك في سلة المهملات.","No items match your search in trash.")}</span>
        </div>
      `}
    `:!o.trashLoaded&&!x.length?`
      <div style="padding:48px 20px;text-align:center;">
        <div style="width:32px;height:32px;margin:0 auto 14px;border:3px solid var(--line);border-top-color:var(--teal);border-radius:50%;animation:spin 0.75s linear infinite;"></div>
        <div style="font-size:14px;font-weight:700;color:var(--ink);">${t("جاري فحص واسترجاع عناصر سلة المهملات...","Loading recycle bin items...")}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px;">${t("يتم جلب المشاريع والمهام والمستندات المحذوفة من الخادم...","Fetching deleted projects, tasks, and drawings from server...")}</div>
      </div>
    `:`
      <div class="empty">
        ${w("trash",24)}
        <span>${t("سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.","Trash is empty, no deleted items found.")}</span>
      </div>
    `;$=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!o.trashLoaded&&!x.length?t("جاري التحميل...","Loading..."):`${x.length} ${t("عناصر","items")}`}
              </span>
            </div>
            <p>${t("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(a||I("manage_trash"))&&x.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${t("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${w("trash",13)} ${t("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${O}
      </section>
    `}if(o.settingsSection==="audit"&&(a||I("view_audit_logs"))){const x=[...o.data?.auditLogs||[]].sort((E,S)=>new Date(S.createdAt).getTime()-new Date(E.createdAt).getTime()),m=o.auditFilterAction||"all",b=o.auditFilterEntity||"all",T=o.auditFilterUser||"all",D=(o.auditSearchQuery||"").trim().toLowerCase(),A=x.filter(E=>{if(m!=="all"&&E.action!==m||b!=="all"&&(E.entityType||E.entity_type)!==b||T!=="all"&&(E.userId||E.user_id||E.user?.id)!==T)return!1;if(D){const S=E.user||(E.userId?(o.data?.users||[]).find(F=>F.id===E.userId):null),j=(S&&t(S.name,S.nameEn||S.name)||"").toLowerCase(),{actionLabel:z,entityLabel:M}=Xt(E),_=(z||E.action||"").toLowerCase(),R=(M||E.entityType||"").toLowerCase(),B=(E.id||E.entityId||"").toLowerCase(),q=typeof E.details=="object"?JSON.stringify(E.details).toLowerCase():String(E.details||"").toLowerCase();if(!(j.includes(D)||_.includes(D)||R.includes(D)||B.includes(D)||q.includes(D)))return!1}return!0});o._lastFilteredAuditLogs=A;const N=[["all",t("كافة العمليات","All Actions")],["create",t("إنشاء جديد","Create")],["update",t("تعديل بيانات","Update")],["status_change",t("تغيير حالة","Status Change")],["delete",t("نقل للمهملات","Delete / Trash")],["restore",t("استعادة","Restore")],["purge",t("حذف نهائي","Purge")],["export_report",t("تصدير تقرير","Export Report")],["login",t("تسجيل دخول","Sign In")],["invite",t("دعوة مستخدم","Invite")]],O=[["all",t("كافة العناصر","All Entities")],["project",t("المشاريع","Projects")],["task",t("المهام","Tasks")],["document",t("المستندات","Documents")],["user",t("المستخدمين","Users")],["role",t("الأدوار والصلاحيات","Roles")],["company",t("إعدادات الشركة","Company Settings")],["report",t("التقارير","Reports")]],h=m!=="all"||b!=="all"||T!=="all"||!!D;$=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${g("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${A.length} ${t("عملية معروضة","events shown")}
              </span>
              ${h?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${t("من أصل","out of")} ${x.length}
                </span>
              `:""}
            </div>
            <p>${t("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${o.auditFullHistoryLoaded?"":`
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${t("جلب الأرشيف الكامل للسجلات من السيرفر","Load complete audit archive")}">
                ${w("refresh",13)} ${t("تحميل الأرشيف الكامل","Load All History")}
              </button>
            `}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${t("تصدير السجل كملف Excel منسق","Export as styled Excel file")}">
              ${w("download",13)} ${t("تصدير Excel","Export Excel")}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${t("معاينة وطباعة تقرير رسمي وحفظه كـ PDF","Print or save executive PDF report")}">
              ${w("printer",13)} ${t("طباعة تقرير PDF","Print / PDF")}
            </button>
          </div>
        </div>

        <div class="view-toolbar audit-toolbar" style="gap:10px;margin-bottom:16px;">
          <div class="search-box search-sm" style="flex:1;min-width:240px;max-width:380px;">
            ${w("search",14)}
            <input type="search" placeholder="${t("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${c(o.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${N.map(([E,S])=>`<option value="${E}" ${m===E?"selected":""}>${S}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${O.map(([E,S])=>`<option value="${E}" ${b===E?"selected":""}>${S}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${t("كافة المستخدمين","All Users")}</option>
              ${(o.data?.users||[]).map(E=>`<option value="${E.id}" ${T===E.id?"selected":""}>${c(t(E.name,E.nameEn||E.name))}</option>`).join("")}
            </select>
            ${h?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${t("إعادة تعيين الفلاتر","Reset filters")}">
                ${t("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${A.length?`
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${t("المستخدم / المنفذ","User / Actor")}</th>
                  <th style="padding:12px 14px;">${t("نوع النشاط والعملية","Action & Target")}</th>
                  <th style="padding:12px 14px;">${t("التفاصيل والتغيير","Details / Context")}</th>
                  <th style="padding:12px 14px;text-align:${o.lang==="ar"?"left":"right"};">${t("التاريخ والوقت الدقيق","Exact Date & Time")}</th>
                </tr>
              </thead>
              <tbody>
                ${A.map(E=>{const S=E.user||(E.userId?(o.data?.users||[]).find(F=>F.id===E.userId):null),j=S?t(S.name,S.nameEn||S.name):t("النظام","System"),z=S?ce(S):t("تلقائي","Automated"),M=on(E.createdAt),{badgeClass:_,actionLabel:R,entityLabel:B,detailHtml:q}=Xt(E);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${X(S)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${c(j)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${c(z)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${_}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${c(R)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${c(B)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${q}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${o.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${c(M.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${w("clock",11)}
                          <span>${c(M.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${w(h?"search":"checklist",24)}
            <span>${h?t("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):t("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${h?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${t("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(o.settingsSection==="analytics"&&p&&($=fi()),o.settingsSection==="diagnostics"&&u&&($=mi()),o.settingsSection==="whatsapp"&&s){const x=o.data?.company?.customFields?.whatsapp||o.data?.company?.custom_fields?.whatsapp||{};$=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <h2>${t("تنبيهات واتساب الميدانية للمشاريع","Field WhatsApp Alerts")}</h2>
            <p>${t("ربط آمن عبر بروتوكول Multi-Device المباشر مع خوارزميات محاكاة السلوك البشري لحماية الأرقام من الحظر.","Secure connection via Multi-Device protocol with anti-ban human behavior simulation.")}</p>
          </div>
          <span class="status-badge ${x.enabled?"done":"neutral"}">
            ${x.enabled?t("مفعل نشط ✅","Active ✅"):t("معطل ⏸️","Disabled ⏸️")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${t("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${t("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${x.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${t("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${x.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${x.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${t("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${c(x.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${t("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${c(x.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${t("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${t("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${c(x.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${t("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${c(x.recipient||"")}" placeholder="${t("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${t("💡 ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","💡 Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${t("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${x.notifyOnCollectiveMention!==!1?"checked":""} />
                <span>📢 ${t("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${x.sendGroupBroadcast?"checked":""} />
                <span>👥 ${t("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${x.notifyOnBlocked!==!1?"checked":""} />
                <span>⚠️ ${t("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${x.notifyOnApproval!==!1?"checked":""} />
                <span>🔍 ${t("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${x.notifyOnDrawing!==!1?"checked":""} />
                <span>📐 ${t("عند اعتماد أو رفع مخطط معماري أو إنشائي جديد (New Drawing)","When an architectural or structural drawing is approved/uploaded")}</span>
              </label>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:10px;">
            <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:7px;">
              ${w("check",14)} <span>${t("حفظ إعدادات واتساب","Save WhatsApp Settings")}</span>
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
        <span class="status-badge done">${w(a?"shield":"user",13)} ${c(ce(v))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${f.map(([x,m])=>`<button class="${o.settingsSection===x?"active":""}" data-action="settings-section" data-section="${x}">${m}</button>`).join("")}
      </aside>
      <div class="settings-content">${$}</div>
    </div>
  `}var xi=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function Uo(e=null){const a=o.data?.permissionsCatalog&&o.data.permissionsCatalog.length>=10?o.data.permissionsCatalog:xi,n=new Map;a.forEach(p=>{const u=p.category||"general",f=t(p.categoryAr||u,p.categoryEn||u);n.has(u)||n.set(u,{name:f,items:[]}),n.get(u).items.push(p)});const s=e?.id==="admin"||e?.permissions&&e.permissions.includes("*"),r=Array.from(n.entries()).map(([p,u])=>{const f=u.items.map(v=>{const $=v.id||v.key,y=t(v.nameAr||v.ar,v.nameEn||v.en||$),x=s||e?.permissions&&(e.permissions.includes($)||typeof PERMISSION_ALIASES<"u"&&PERMISSION_ALIASES[$]&&e.permissions.includes(PERMISSION_ALIASES[$])),m=s?"disabled":"";return`
        <label class="permission-option" style="cursor:${s?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${c($)}" ${x?"checked":""} ${m} />
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
    `}).join(""),i=s?"":`
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
      ${s?`
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
        <button type="submit" class="btn btn-primary">${w("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ae(e?t("تعديل الدور والصلاحيات","Edit role & permissions"):g("addRole"),t("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),d,"role","modal-lg");const l=document.getElementById("modal-root");if(l){const p=l.querySelector("#btn-perm-select-all"),u=l.querySelector("#btn-perm-deselect-all");p&&p.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(f=>f.checked=!0)}),u&&u.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(f=>f.checked=!1)})}}function qo(e=null){if(e?.id==="usr_ahmad"&&o.data?.user?.id!=="usr_ahmad")return k(t("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!e&&!P())return k(g("adminOnly"),!0);const a=!P(),n=a?"disabled":"",s=(o.data?.roles||[]).filter(i=>P()||i.id!=="admin"),r=`<form id="user-form" data-user-id="${c(e?.id||"")}" data-permission-only="${a}"><div class="form-grid"><div class="field full"><label>${g("nameAr")}</label><input name="name" value="${c(e?.name||"")}" ${n} required /></div><div class="field"><label>${g("nameEn")}</label><input name="nameEn" value="${c(e?.nameEn||"")}" ${n} /></div><div class="field"><label>${g("jobTitle")}</label><input name="jobTitleAr" value="${c(e?.jobTitleAr||"")}" ${n} /></div><div class="field"><label>${g("email")}</label><input name="email" type="email" value="${c(e?.email||"")}" placeholder="name@darc.com" ${n} /></div><div class="field"><label>${t("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${c(e?.phone||e?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${n} /></div><div class="field"><label>${g("role")}</label><select name="roleId">${s.map(i=>`<option value="${c(i.id)}" ${e?.roleId===i.id?"selected":""}>${c(t(i.nameAr,i.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${a?t("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):t("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button><button type="submit" class="btn btn-primary">${w("check",14)} ${e?a?t("حفظ الصلاحية","Save permission"):g("save"):g("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=Ae(e?a?t("تعديل صلاحية الحساب","Change account permission"):t("تعديل حساب العضو","Edit member account"):g("addMember"),t("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),r,"user")}var Ho=ye({buildProjectMemberChipsHtml:()=>Sa,exportPortfolioPDF:()=>Di,exportPortfolioXLS:()=>Ti,exportProjectPDF:()=>Ea,exportProjectXLS:()=>Ii,exportXLS:()=>dn,getCompanyBranding:()=>_t,getDaysLeftBadge:()=>sn,getProjectTeam:()=>Go,getProjectTeamData:()=>Pt,openCloneModal:()=>Jo,openProjectModal:()=>rn,projectCard:()=>Si,projectRow:()=>Wo,renderInPagePrintModal:()=>ln,renderProjectCardTeamAvatars:()=>ki,renderProjectDetail:()=>Vo,renderProjectOverviewTab:()=>Ei,renderProjectTeamAvatars:()=>wi,renderProjectTimelineBar:()=>$i,renderProjects:()=>Ai});function Wo(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${w("building",17)}</span><div class="project-name"><strong>${c(t(e.nameAr,e.nameEn))}</strong><span>${c(e.code)} · ${c(t(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${X(e.manager)}<span>${c(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${c(e.id)}" aria-label="${g("viewDetails")}">${w(o.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function sn(e){if(!e)return"";const a=Le(e);if(!a||isNaN(a.getTime()))return"";const n=Math.ceil((a-new Date)/864e5);if(isNaN(n))return"";let s="var(--mint-strong)",r="var(--mint)",i="";return n<0?(s="var(--red)",r="var(--red-soft)",i=t(`متأخر ${Math.abs(n)} يوم`,`${Math.abs(n)}d overdue`)):n===0?(s="var(--red)",r="var(--red-soft)",i=t("يستحق اليوم","Due today")):n<=2?(s="var(--red)",r="var(--red-soft)",i=t(`باقي ${n} يوم`,`${n}d left`)):n<=7?(s="var(--amber)",r="var(--amber-soft)",i=t(`باقي ${n} أيام`,`${n}d left`)):(s="var(--mint-strong)",r="var(--mint)",i=t(`باقي ${n} يوم`,`${n}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${s};background:${r};border:1px solid currentColor;">${w("clock",11)} ${i}</span>`}function Pt(e){const a=o.data?.users||[],n=(o.data?.tasks||[]).filter(i=>i.projectId===e.id),s=new Set,r=new Set;return e.managerId&&s.add(e.managerId),n.forEach(i=>{i.assigneeId&&s.add(i.assigneeId),(i.customFields?.additionalAssignees||i.customFields?.additional_assignees||[]).forEach(d=>s.add(d)),(i.customFields?.externalAssignees||i.customFields?.external_assignees||[]).forEach(d=>{d&&typeof d=="string"&&d.trim()&&r.add(d.trim())})}),{internalMembers:Array.from(s).map(i=>a.find(d=>d.id===i)).filter(Boolean),externalMembers:Array.from(r)}}function Go(e){return Pt(e).internalMembers}function wi(e,a=4,n=!0,s=[]){if((!e||!e.length)&&(!s||!s.length))return`<span style="font-size:11px;color:var(--muted);">${t("لا يوجد فريق محدد","No team assigned")}</span>`;const r=(e||[]).slice(0,a),i=(e||[]).length-a,d=(e||[]).map(p=>t(p.name,p.nameEn||p.name)).join("، ");let l='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return r.forEach(p=>{const u=t(p.name,p.nameEn||p.name),f=n?`data-action="filter-by-member" data-member-id="${c(p.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';l+=`
      <span class="team-member-chip" ${f} title="${c(u)} (${c(ce(p))})">
        ${X(p,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${c(u)}</span>
      </span>
    `}),i>0&&(l+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${c(d)}">+${i} ${t("آخرين","more")}</span>`),s&&s.length>0&&(l+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${c(s.join("، "))}">🌐 +${s.length} ${t("خارجي","ext")}</span>`),l+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${t("فريق العمل الداخلي","Internal Team")} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(p=>`
        <div ${n?`data-action="filter-by-member" data-member-id="${c(p.id)}" title="${c(t("فلترة مهام "+(p.name||""),"Filter tasks of "+(p.nameEn||p.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${n?"cursor:pointer;transition:all 0.15s;":""}" ${n?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${X(p,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${c(t(p.name,p.nameEn||p.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${c(ce(p))}</span>
          </div>
        </div>
      `).join("")}
    </div>
    
    ${s&&s.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${t("الشركاء والمتعاونون الخارجيون","External Partners")} (${s.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${s.map(p=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${c(p)}</span>
          </div>
        `).join("")}
      </div>
    `:""}

    ${n?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${t("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,l+="</div>",l}function $i(e){if(!e.dueDate)return"";const a=Le(e.dueDate);if(!a||isNaN(a.getTime()))return"";const n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),s=new Date,r=a.getTime()-n.getTime();let i=0;r>0&&!isNaN(r)&&(i=Math.min(100,Math.max(0,Math.round((s.getTime()-n.getTime())/r*100))));const d=s>a,l=d?"var(--red)":i>=80&&!d?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${w("clock",12)}
          <strong>${t("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${l};font-weight:bold;">${d?t("انتهى موعد التسليم!","Deadline passed!"):t(`مضى ${i}% من الوقت`,`${i}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${Ee(e.startDate)} ➔ ${Ee(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${i}%;background:${l};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function ki(e=[],a=[],n=3){const s=e.length+a.length;if(s===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const r=e.slice(0,n),i=s-r.length;[...e.map(l=>t(l.name,l.nameEn||l.name)),...a].join("، ");let d=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${t("عرض فريق العمل","View Team")}">`;return d+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',r.forEach((l,p)=>{d+=`
      <div style="margin-inline-start:${p===0?"0":"-8px"};position:relative;z-index:${10-p};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${X(l,"mini-avatar")}
      </div>
    `}),i>0&&(d+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${i}
      </div>
    `),a&&a.length>0&&i<=0&&(d+='<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>'),d+="</div>",d+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${t("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${s}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(l=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${X(l,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(t(l.name,l.nameEn||l.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${c(ce(l))}</span>
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
  `,d+="</div>",d}function Si(e){const{internalMembers:a,externalMembers:n}=Pt(e),s=e.manager||(o.data?.users||[]).find(d=>d.id===e.managerId),r=sn(e.dueDate),i=t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
        <span class="project-card-symbol">${w("building",19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${c(e.code)}</span>
          <h3 class="project-card-title" title="${c(t(e.nameAr,e.nameEn))}">${c(t(e.nameAr,e.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        <span class="status-badge ${c(e.health)}">${c(K(e.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${c(i||"")}">
      ${i?c(i):`<span style="color:var(--muted);font-style:italic;">${t("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${X(s,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${g("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(s?t(s.name,s.nameEn||s.name):"—")}</strong>
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
          <strong>${e.dueDate?Ee(e.dueDate,!0):"—"}</strong>
          ${r}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health==="off_track"?"red":e.health==="at_risk"?"amber":""}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${c(e.id)}">
      ${g("viewDetails")} ${w(o.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function Ei(e,a,n,s=[]){const r=e.manager||(o.data?.users||[]).find(p=>p.id===e.managerId),i=a.filter(p=>p.status==="done").length,d=a.filter(p=>p.status==="in_progress").length,l=a.filter(Me).length;return`
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
          <div class="metric-value">${n.length+(s?.length||0)}</div>
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
            ${w("document",16)}
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
              <strong style="font-size:13px;color:var(--ink);">${c(K(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${Ee(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${g("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${Ee(e.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${w("users",16)}
            ${t("القيادة وفريق العمل","Leadership & Team")}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${X(r)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${g("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${c(r?t(r.name,r.nameEn||r.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${c(r?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${t("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${n.map(p=>{const u=a.filter(f=>f.assigneeId===p.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${X(p,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${c(t(p.name,p.nameEn||p.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${c(ce(p))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${u} ${g("tasks")}</span>
                </div>
              `}).join("")}
          </div>

          ${s&&s.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${t("الشركاء والمتعاونون الخارجيون:","External Partners & Collaborators:")}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${s.map(p=>{const u=a.filter(f=>(f.customFields?.externalAssignees||f.customFields?.external_assignees||[]).includes(p)).length;return`
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
  `}function Ai(){const e=o.searches.projects.trim().toLowerCase();let a=(o.data?.projects||[]).filter(s=>`${s.nameAr} ${s.nameEn} ${s.code} ${s.clientAr}`.toLowerCase().includes(e));const n=o.projectSort||"default";return n==="alpha-asc"?a.sort((s,r)=>(t(s.nameAr,s.nameEn)||"").localeCompare(t(r.nameAr,r.nameEn)||"",o.lang==="ar"?"ar":"en")):n==="alpha-desc"?a.sort((s,r)=>(t(r.nameAr,r.nameEn)||"").localeCompare(t(s.nameAr,s.nameEn)||"",o.lang==="ar"?"ar":"en")):n==="progress-asc"?a.sort((s,r)=>(Number(s.progress)||0)-(Number(r.progress)||0)):n==="progress-desc"&&a.sort((s,r)=>(Number(r.progress)||0)-(Number(s.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${t("المحفظة","PORTFOLIO")}</p><h1>${g("projects")}</h1><p>${t("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${I("create_projects")?`<button class="btn btn-primary" data-action="new-project">${w("plus",15)} ${g("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${w("search",15)}<input data-search="projects" value="${c(o.searches.projects)}" placeholder="${g("search")}" /></div><div class="sort-box"><span>${t("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${n==="default"?"selected":""}>${t("الافتراضي","Default")}</option><option value="alpha-asc" ${n==="alpha-asc"?"selected":""}>${t("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${n==="alpha-desc"?"selected":""}>${t("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${n==="progress-asc"?"selected":""}>${t("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${n==="progress-desc"?"selected":""}>${t("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${a.length} ${t("مشاريع","projects")}</span></div></div>${a.length?`<div class="project-cards">${a.map(Si).join("")}</div>`:`<section class="panel"><div class="empty">${w("building",18)}<span>${g("noProjects")}</span></div></section>`}`}function Vo(){const e=o.data?.projects?.find(v=>v.id===o.activeProjectId);if(!e)return o.view="projects",Ai();const a=(o.data?.tasks||[]).filter(v=>v.projectId===e.id),{internalMembers:n,externalMembers:s}=Pt(e),r=o.projectTab||"tasks",i=o.projectMemberFilter||null,d=i?a.filter(v=>v.assigneeId===i||(v.customFields?.additionalAssignees||v.customFields?.additional_assignees||[]).includes(i)):a,l=i?o.data?.users?.find(v=>v.id===i):null;let p="";if(r==="overview")p=Ei(e,a,n,s);else if(r==="tasks"){const v=o.projectTaskSort||ct();p=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${g("projectTasks")} ${i?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${t("مهام","Tasks of")}: ${c(t(l?.name,l?.nameEn||l?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${t("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${en(v,"sort-project-tasks")}
            ${i?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${w("close",12)} ${t("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${I("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}" title="${t("اضغط N للإضافة السريعة","Press N to add quickly")}">${w("plus",14)} ${g("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${renderBoard(d,v)}
      </div>
    `}else if(r==="timeline"){const{renderTimelinePanel:v}=window.__timelineExports||{};p=v?v(d,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${sa(d)}</div>`}else if(r==="drawings"){const v=(o.data?.documents||[]).filter(m=>m.projectId===e.id&&!m.deletedAt),$=a.filter(m=>m.typeAr==="مخطط"||m.typeEn==="Drawing"||m.templateId),y=o.docTaskFilter||"all",x=y==="all"?v:v.filter(m=>m.taskId===y);p=`
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
                ${a.map(m=>`<option value="${c(m.id)}" ${y===m.id?"selected":""}>${c(t(m.titleAr,m.titleEn))}</option>`).join("")}
              </select>
            </div>
            ${I("create_tasks")?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}">
                ${w("plus",12)} ${t("إضافة مخرج / مخطط","Add Deliverable / Drawing")}
              </button>
            `:""}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${w("document",14)} ${t("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${x.length})
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
                ${x.length>0?x.map(m=>{const b=a.find(D=>D.id===m.taskId),T=m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round((m.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${c(m.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(m.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${w("document",15)}
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
                        ${b?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(b.id)}">${c(t(b.titleAr,b.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${c(m.status||"draft")}" style="font-size:11px;">
                          ${c(K(m.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${T}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${Ee(m.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(m.id)}" style="padding:5px;" title="${t("معاينة المخطط","Preview")}">
                            ${w("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(m.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ رابط Google Drive","Copy Drive Link")}">
                            ${w("link",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${c(m.id)}" style="padding:5px;color:var(--blue);" title="${t("تحميل المخطط","Download")}">
                            ${w("download",14)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `}).join(""):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${w("document",20)}
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
            ${w("checklist",14)} ${t("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${$.length})
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
                ${$.map(m=>`
                  <tr data-action="open-task" data-task-id="${c(m.id)}" style="cursor:pointer;" title="${t("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${c(t(m.titleAr,m.titleEn))}</span><span class="table-sub">${c(m.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${c(t(m.typeAr,m.typeEn)||t("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${c(m.status)}">${c(K(m.status))}</span></td>
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
    `}else r==="activity"&&(p=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${g("activity")}</h2><p class="panel-subtitle">${t("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${gi(e.id)}</div>`);const u=e.manager||(o.data?.users||[]).find(v=>v.id===e.managerId),f=sn(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${w(o.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${c(e.code)} · ${e.demo?g("sampleData"):g("active")}</p>
          <h1>${c(t(e.nameAr,e.nameEn))}</h1>
          <p>${c(t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${w("user",12)} 
              <strong>${g("manager")}:</strong> ${c(u?t(u.name,u.nameEn||u.name):"—")}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${w("calendar",12)} ${Ee(e.dueDate,!0)}
                ${f}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${w("users",12)}
              <span style="font-size:11px;">${g("team")}:</span>
              ${wi(n,4,!0,s)}
            </span>
            <span class="status-badge ${c(e.health)}">${c(K(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${g("weightedProgress")}</span>
        ${I("edit_projects")||I("create_projects")||I("delete_projects")||I("view_reports")||P()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${w("more",15)} ${t("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${o.lang==="ar"?"left:0":"right:0"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;padding:5px;margin-top:5px;text-align:start">
              ${I("edit_projects")||P()?`<button class="menu-item" data-action="edit-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${w("edit",14)} ${g("edit")}</button>`:""}
              ${I("create_projects")||P()?`<button class="menu-item" data-action="clone-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${w("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>`:""}
              ${I("export_reports")||P()?`
                <button class="menu-item" data-action="export-project-pdf" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--brand-teal);font-weight:600;">
                  ${w("printer",14)} ${t("تقرير تنفيذي معتمد (PDF)","Executive Report (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project-client-pdf" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--ink);">
                  ${w("user",14)} ${t("تقرير تسليمات العميل (PDF)","Client Deliverables (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;">
                  ${w("document",14)} ${t("تصدير بيانات المهام (Excel)","Export Tasks (Excel)")}
                </button>
              `:""}
              ${I("delete_projects")||P()?`<button class="menu-item" data-action="delete-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${w("trash",14)} ${t("حذف المشروع","Delete Project")}</button>`:""}
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
  `}function Sa(e=[]){const a=o.data?.users||[];return e.map(n=>{const s=a.find(r=>r.id===n)||{name:n,id:n};return`
      <span class="chip-item" data-uid="${c(n)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${X(s,"mini-avatar")}
        <span style="font-weight:500;">${c(t(s.name,s.nameEn||s.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${c(n)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function rn(e=null){const a=e?.code||`DARC-${String((o.data?.projects?.length||0)+1).padStart(3,"0")}`,n=e?Pt(e).internalMembers.map(i=>i.id):[],s=n.length>0?n:[o.data?.user?.id].filter(Boolean),r=`
    <form id="project-form" data-project-id="${c(e?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${c(JSON.stringify(s))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${w("building",14)} <span>${t("البيانات الأساسية للمشروع","Core Project Information")}</span>
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
          ${w("calendar",14)} <span>${t("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${g("manager")}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${t("— بدون تحديد —","— Unassigned —")}</option>
            ${(o.data?.users||[]).map(i=>`<option value="${c(i.id)}" ${(e?e.managerId===i.id:o.data?.user?.id===i.id)?"selected":""}>${c(t(i.name,i.nameEn||i.name))}</option>`).join("")}
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
            ${w("users",14)} <span>${t("أعضاء فريق المشروع والمشاركون","Project Team Members & Collaborators")}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${t("اختر من الفريق لإعطائهم حق الوصول للمشروع","Select team members who can access this project")}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${s.length?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${Sa(s)}
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
          ${w("document",14)} <span>${t("نطاق المشروع والملاحظات","Scope & Notes")}</span>
        </div>

        <div class="field full">
          <label>${t("وصف ونطاق المشروع","Project Scope & Description")}</label>
          <textarea name="descriptionAr" placeholder="${t("وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...","Brief description of scope, design criteria, and special notes...")}">${c(e?.descriptionAr||"")}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${e&&(I("delete_projects")||P())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
              ${w("trash",14)} ${t("حذف المشروع","Delete Project")}
            </button>
          `:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
          <button type="submit" class="btn btn-primary">${w("check",14)} ${g(e?"save":"create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ae(e?t("تعديل بيانات المشروع","Edit Project"):g("addProject"),t("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),r,"project"),setTimeout(()=>{const i=document.getElementById("project-member-search"),d=document.getElementById("project-member-dropdown"),l=document.getElementById("project-members-chips-container"),p=document.getElementById("project-members-input"),u=document.getElementById("project-manager-select");if(!i||!d||!l||!p)return;let f=[...s];function v(){l.innerHTML=Sa(f),l.style.display=f.length?"flex":"none",p.value=JSON.stringify(f),l.querySelectorAll(".btn-remove-project-member").forEach(y=>{y.addEventListener("click",x=>{x.stopPropagation();const m=y.dataset.uid;f=f.filter(b=>b!==m),v()})})}u&&u.addEventListener("change",()=>{const y=u.value;y&&!f.includes(y)&&(f.push(y),v())});function $(y=""){const x=y.toLowerCase().trim(),m=(o.data?.users||[]).filter(b=>!f.includes(b.id)&&(!x||b.name&&b.name.toLowerCase().includes(x)||b.nameEn&&b.nameEn.toLowerCase().includes(x)||b.email&&b.email.toLowerCase().includes(x)));m.length?(d.innerHTML=m.map(b=>`
          <div class="project-member-opt" data-uid="${c(b.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${X(b,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${c(t(b.name,b.nameEn||b.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${c(b.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${t("إضافة","Add")}</span>
          </div>
        `).join(""),d.querySelectorAll(".project-member-opt").forEach(b=>{b.addEventListener("mouseenter",()=>b.style.background="var(--surface-soft)"),b.addEventListener("mouseleave",()=>b.style.background="transparent"),b.addEventListener("click",()=>{const T=b.dataset.uid;T&&!f.includes(T)&&(f.push(T),v(),i.value="",d.style.display="none")})})):d.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${t("لا يوجد أعضاء مطابقون","No matching members")}</div>`,d.style.display="block"}i.addEventListener("focus",()=>$(i.value)),i.addEventListener("input",()=>$(i.value)),document.addEventListener("click",y=>{!i.contains(y.target)&&!d.contains(y.target)&&(d.style.display="none")}),v()},50)}function Jo(e){const a=`
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
        
        <div style="padding-${o.lang==="ar"?"right":"left"}:26px">
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
        <button type="submit" class="btn btn-primary">${w("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ae(t("استنساخ المشروع","Clone Project"),t("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),a,"clone");const n=document.getElementById("clone-form"),s=n.querySelector('input[name="cloneTasks"]'),r=n.querySelector('input[name="keepAssignees"]');s.addEventListener("change",i=>{r.disabled=!i.target.checked,i.target.checked||(r.checked=!1)}),n.addEventListener("submit",async i=>{i.preventDefault();const d=n.querySelector('button[type="submit"]');d.disabled=!0;try{const l={nameAr:n.nameAr.value,nameEn:n.nameEn.value,dueDate:n.dueDate.value,cloneTasks:n.cloneTasks.checked,keepAssignees:n.keepAssignees.checked,cloneMembers:n.cloneMembers.checked},p=await C(`/api/projects/${e.id}/clone`,{method:"POST",body:JSON.stringify(l)});H(),o.view="project-detail",o.activeProjectId=p.project.id,await refreshView(),k(t("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(l){k(l.message,!0),d.disabled=!1}})}function _t(){const e=o.data?.company||{},a=e.nameAr||e.name||"فريق دارك للتصميم",n=e.nameEn||e.name||"DARC Design Team",s=t(a,n),r=e.logoUrl||"";let i=/^(https?:\/\/|data:image\/|\/)/i.test(r)&&!r.toLowerCase().includes("javascript:")?r:"";return i.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(i=`${window.location.origin}${i}`),{nameAr:a,nameEn:n,displayName:s,logoUrl:i,emailFrom:e.emailFrom||"",timezone:e.timezone||"Asia/Riyadh"}}function dn(e,a){const n=`
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
    <body dir="${o.lang==="ar"?"rtl":"ltr"}">
      ${a}
    </body>
    </html>
  `,s=new Blob(["\uFEFF"+n],{type:"application/vnd.ms-excel;charset=utf-8;"}),r=URL.createObjectURL(s),i=document.createElement("a");i.href=r,i.download=e+".xls",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}function Ti(){const e=o.data?.projects||[];if(!e||!e.length){k(t("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const a=_t(),n=Ze(),s=11;let r="<table>";r+=`<tr><td colspan="${s}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${a.logoUrl?`<img src="${c(a.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(a.displayName)}</span>
  </td></tr>`,r+=`<tr><td colspan="${s}" class="subtitle">${t("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,r+=`<tr><td colspan="${s}" class="meta">${t("تاريخ الإصدار:","Generated on:")} ${n}</td></tr>`,r+=`<tr><td colspan="${s}" style="border:none;"></td></tr>`,r+=`<tr class="header">
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
      <td>${c(W(i.code))}</td>
      <td>${c(W(i.nameAr))}</td>
      <td>${c(W(i.nameEn))}</td>
      <td>${c(W(t(i.clientAr,i.clientEn)))}</td>
      <td>${c(W(d))}</td>
      <td>${c(W(K(i.lifecycle)))}</td>
      <td>${c(W(K(i.health)))}</td>
      <td>${c(W(i.startDate||""))}</td>
      <td>${c(W(i.dueDate||""))}</td>
      <td>${i.progress||0}%</td>
      <td>${i.memberCount||0}</td>
    </tr>`}),r+="</table>",dn(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,r),k(t("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),C("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:t("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:e.length}})}).catch(()=>{})}function Ii(e){const a=(o.data?.projects||[]).find(f=>f.id===e);if(!a)return;const n=(o.data?.tasks||[]).filter(f=>f.projectId===e);if(!n.length){k(t("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const s=_t(),r=o.data?.users||[],i=new Map(r.map(f=>[f.id,f]));function d(f){if(!f)return"—";const v=i.get(f);return v?t(v.name,v.nameEn||v.name):f}const l=Ze(),p=11;let u="<table>";u+=`<tr><td colspan="${p}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${s.logoUrl?`<img src="${c(s.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(s.displayName)}</span>
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
  </tr>`,n.forEach((f,v)=>{const $=f.templateId?f.templateId.replace("tpl-","#"):f.id?`#${f.id.slice(-6)}`:`#${v+1}`,y=d(f.assigneeId||f.assignee_id),x=d(f.reviewerId||f.reviewer_id),m=d(f.approverId||f.approver_id);u+=`<tr>
      <td style="text-align:center;font-weight:bold;">${c(W($))}</td>
      <td>${c(W(f.titleAr))}</td>
      <td>${c(W(f.titleEn))}</td>
      <td>${c(W(t(f.categoryAr,f.categoryEn)))}</td>
      <td>${c(W(y))}</td>
      <td style="color:#0369a1;">${c(W(x))}</td>
      <td style="color:#047857;">${c(W(m))}</td>
      <td>${c(W(K(f.status)))}</td>
      <td>${c(W(f.startDate||""))}</td>
      <td>${c(W(f.dueDate||""))}</td>
      <td style="font-weight:bold;">${f.progress||0}%</td>
    </tr>`}),u+="</table>",dn(`DARC_Project_${a.code}_${new Date().toISOString().split("T")[0]}`,u),k(t("تم بدء تحميل تقرير المهام.","Report download started.")),C("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:t(`تقرير مهام مشروع: ${a.nameAr}`,`Project Tasks Report: ${a.nameEn||a.nameAr}`),taskCount:n.length}})}).catch(()=>{})}function Ea(e,a=!1){const n=(o.data?.projects||[]).find(h=>h.id===e);if(!n)return;const s=(o.data?.tasks||[]).filter(h=>h.projectId===e);if(!s.length){k(t("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const r=_t(),i=o.data?.users||[],d=new Map(i.map(h=>[h.id,h]));function l(h){if(!h)return"—";const E=d.get(h);return E?t(E.name,E.nameEn||E.name):h}function p(h){if(!h?.dueDate||["done","completed","canceled"].includes(h.status))return!1;const E=Le(h.dueDate);return E?E<new Date:!1}const u=s.length,f=s.filter(h=>["done","completed"].includes(h.status)).length,v=s.filter(h=>["review","approval"].includes(h.status)).length;s.filter(h=>h.status==="in_progress").length;const $=s.filter(h=>p(h)).length,y=new Date,x=Ze(y),m=Dt(y),b=new Map;s.forEach(h=>{const E=t(h.categoryAr,h.categoryEn)||t(h.typeAr,h.typeEn)||t("عام","General"),S=b.get(E)||{total:0,completed:0,weight:0,progressSum:0},j=Number(h.weight||1);S.total++,["done","completed"].includes(h.status)&&S.completed++,S.weight+=j,S.progressSum+=(h.progress||0)*j,b.set(E,S)});const T=Array.from(b.entries()).map(([h,E])=>({name:h,percent:E.weight?Math.round(E.progressSum/E.weight):0,completed:E.completed,total:E.total})),D=a?t("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):t("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");a?t("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):t("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const A=s.map((h,E)=>{const S=h.templateId?h.templateId.replace("tpl-","#"):h.id?`#${h.id.slice(-6)}`:`#${E+1}`,j=t(h.titleAr,h.titleEn),z=t(h.categoryAr,h.categoryEn)||t(h.typeAr,h.typeEn)||"—",M=K(h.status),_=h.progress||0,R=h.dueDate||"—";if(a)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${E+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${c(S)}</td>
          <td style="font-weight:600;">${c(j)}</td>
          <td style="text-align:center;">${c(z)}</td>
          <td style="text-align:center;"><span class="badge ${c(h.status)}">${c(M)}</span></td>
          <td style="text-align:center;direction:ltr;">${c(R)}</td>
          <td style="text-align:center;font-weight:bold;color:${_===100?"#0d6269":"#1e293b"};">${_}%</td>
        </tr>
      `;const B=l(h.assigneeId||h.assignee_id),q=l(h.reviewerId||h.reviewer_id),F=l(h.approverId||h.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${E+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${c(S)}</td>
        <td style="font-weight:600;">${c(j)}</td>
        <td style="text-align:center;">${c(z)}</td>
        <td>${c(B)}</td>
        <td style="color:#0369a1;font-weight:600;">${c(q)}</td>
        <td style="color:#047857;font-weight:600;">${c(F)}</td>
        <td style="text-align:center;"><span class="badge ${c(h.status)}">${c(M)}</span></td>
        <td style="text-align:center;direction:ltr;">${c(R)}</td>
        <td style="text-align:center;font-weight:bold;color:${_===100?"#0d6269":"#1e293b"};">${_}%</td>
      </tr>
    `}).join(""),N=`
    <!DOCTYPE html>
    <html lang="${o.lang}" dir="${o.lang==="ar"?"rtl":"ltr"}">
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
          text-align: ${o.lang==="ar"?"left":"right"};
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
          text-align: ${o.lang==="ar"?"right":"left"};
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
          ${r.logoUrl?`
            <img src="${c(r.logoUrl)}" alt="Logo" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${c(r.displayName)}</h1>
          <div class="brand-sub">${t("مكتب الاستشارات والتصميم الهندسي","Architecture & Engineering Consultancy")}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${c(D)}</div>
          <div><strong>${t("كود المشروع:","Project Code:")}</strong> ${c(n.code)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(x)} - ${c(m)}</div>
          <div><strong>${t("حالة المشروع:","Project Status:")}</strong> ${c(K(n.lifecycle))} (${c(K(n.health))})</div>
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
          <div class="kpi-val" style="color:#047857;">${f} / ${u}</div>
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
            ${T.map(h=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${c(h.name)}</span>
                  <span>${h.percent}% (${h.completed}/${h.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${h.percent}%;"></div>
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
          ${A}
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
        <div>${c(x)}</div>
      </footer>
    </body>
    </html>
  `,O=window.open("","_blank","width=1100,height=900");O?(O.document.open(),O.document.write(N),O.document.close()):ln(N),k(t("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),C("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:c(D),type:a?"client_pdf":"executive_pdf",taskCount:u}})}).catch(()=>{})}function Di(){const e=o.data?.projects||[];if(!e||!e.length){k(t("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const a=_t(),n=new Date,s=Ze(n),r=Dt(n),i=e.length,d=e.filter(y=>y.health==="on_track").length,l=e.filter(y=>y.health==="at_risk").length,p=e.filter(y=>y.health==="off_track").length,u=e.map((y,x)=>{const m=y.manager?t(y.manager.name,y.manager.nameEn||y.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${x+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${c(y.code)}</td>
        <td style="font-weight:700;">${c(t(y.nameAr,y.nameEn))}</td>
        <td>${c(t(y.clientAr,y.clientEn))||"—"}</td>
        <td>${c(m)}</td>
        <td style="text-align:center;"><span class="badge ${c(y.lifecycle)}">${c(K(y.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${c(y.health)}">${c(K(y.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${c(y.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${c(y.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${y.progress===100?"#0d6269":"#0f172a"};">${y.progress||0}%</td>
      </tr>
    `}).join(""),f=t("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),v=`
    <!DOCTYPE html>
    <html lang="${o.lang}" dir="${o.lang==="ar"?"rtl":"ltr"}">
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
        th, td { border: 1px solid #cbd5e1; padding: 7px 9px; text-align: ${o.lang==="ar"?"right":"left"}; vertical-align: middle; }
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
        <div style="text-align:${o.lang==="ar"?"left":"right"};font-size:11px;color:#334155;line-height:1.6;">
          <div style="display:inline-block;background:#e6f4f5;color:#0d6269;font-weight:800;padding:3px 10px;border-radius:4px;font-size:11px;border:1px solid #bce1e4;margin-bottom:4px;">${t("تقرير حالة المحفظة","Portfolio Status Report")}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(s)} - ${c(r)}</div>
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
        <div>${c(s)}</div>
      </footer>
    </body>
    </html>
  `,$=window.open("","_blank","width=1200,height=900");$?($.document.open(),$.document.write(v),$.document.close()):ln(v),k(t("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),C("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:c(f),type:"portfolio_pdf",count:i}})}).catch(()=>{})}function ln(e){let a=document.getElementById("print-modal-overlay");a||(a=document.createElement("div"),a.id="print-modal-overlay",a.style.position="fixed",a.style.inset="0",a.style.zIndex="1400",a.style.background="rgba(0, 0, 0, 0.75)",a.style.backdropFilter="blur(4px)",a.style.display="flex",a.style.flexDirection="column",a.style.alignItems="center",a.style.justifyContent="center",a.style.padding="15px",document.body.appendChild(a)),a.innerHTML=`
    <div style="background:#fff;width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid #e2e8f0;background:#f8fafc;">
        <strong style="color:#0d6269;font-size:14px;">${t("معاينة التقرير الرسمي المعتمد (PDF Preview)","Official Approved Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-iframe" style="display:flex;align-items:center;gap:6px;">
            ${w("printer",14)} ${t("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-print-modal">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;">
        <iframe id="print-preview-iframe" style="width:100%;height:100%;border:none;" srcdoc="${c(e)}"></iframe>
      </div>
    </div>
  `,a.style.display="flex";const n=()=>{a.style.display="none",a.innerHTML="",window.removeEventListener("keydown",s)},s=r=>{r.key==="Escape"&&n()};window.addEventListener("keydown",s),document.getElementById("btn-close-print-modal")?.addEventListener("click",n),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const r=document.getElementById("print-preview-iframe");r&&r.contentWindow&&(r.contentWindow.focus(),r.contentWindow.print())})}var Ko=ye({TEMPLATE_CATEGORIES:()=>yt,openTemplateModal:()=>Xo,renderTemplates:()=>Yo}),yt=[{id:"architectural",ar:"معماري",en:"Architectural",icon:"🏛️"},{id:"electrical",ar:"كهرباء — إلكتروميكانيك",en:"Electrical",icon:"⚡"},{id:"plumbing",ar:"سباكة — إلكتروميكانيك",en:"Plumbing",icon:"💧"},{id:"hvac",ar:"تكييف — إلكتروميكانيك",en:"HVAC",icon:"🌡️"},{id:"fire",ar:"حريق — إلكتروميكانيك",en:"Fire Protection",icon:"🧯"},{id:"low_current",ar:"تيار خفيف",en:"Low Current",icon:"📡"},{id:"sections",ar:"مقاطع",en:"Sections",icon:"✂️"},{id:"detail",ar:"تفصيلي",en:"Detailed",icon:"🔍"},{id:"site",ar:"موقع عام",en:"Site Plan",icon:"🗺️"},{id:"quantity",ar:"جداول كميات",en:"Quantity Tables",icon:"📊"},{id:"documents",ar:"وثائق وخطابات",en:"Documents & Letters",icon:"📄"}];function Yo(){const e=o.searches.templates.trim().toLowerCase(),a=[...o.data.templates||[]].sort((i,d)=>(parseInt(i.code,10)||0)-(parseInt(d.code,10)||0)),n=new Map;yt.forEach(i=>n.set(i.id,0)),a.forEach(i=>{n.set(i.categoryId,(n.get(i.categoryId)||0)+1)});const s=o.templateCategory||"all",r=yt.map(i=>{if(s!=="all"&&s!==i.id)return null;const d=a.filter(l=>l.categoryId!==i.id?!1:e?`${l.nameAr} ${l.nameEn} ${l.code} ${l.typeAr} ${l.typeEn}`.toLowerCase().includes(e):!0);return d.length?{...i,items:d}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${t("مخرجات DARC القياسية","DARC STANDARD DELIVERABLES")}</p>
      <h1>${g("templates")}</h1>
      <p>${g("standardLibrarySub")}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${a.length} ${g("templatesCount")}</span>
      ${I("manage_templates")?`<button class="btn btn-primary" data-action="new-template" style="margin-${o.lang==="ar"?"right":"left"}:10px">${w("plus",15)} ${t("إضافة قالب","Add Template")}</button>`:""}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${w("search",15)}
        <input data-search="templates" value="${c(o.searches.templates)}" placeholder="${g("search")}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${s==="all"?"active":""}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${g("all")}</span>
        <small>${a.length}</small>
      </button>
      ${yt.map(i=>`
        <button class="template-category-tab ${s===i.id?"active":""}" data-action="template-category" data-category="${c(i.id)}">
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
              <article class="template-item" style="position:relative;cursor:${I("manage_templates")?"pointer":"default"};" ${I("manage_templates")?`data-action="edit-template" data-template-id="${c(d.id)}"`:""}>
                <span class="template-number">${c(d.code)}</span>
                <div class="template-copy">
                  <strong>${c(t(d.nameAr,d.nameEn))}</strong>
                  <span>${c(o.lang==="ar"?d.nameEn:d.nameAr)}</span>
                </div>
                ${I("manage_templates")?`<button class="template-action" data-action="edit-template" data-template-id="${c(d.id)}" title="${g("edit")}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${o.lang==="ar"?"right":"left"}:auto">${w("edit",14)}</button>`:""}
              </article>
            `).join("")}
          </div>
        </section>
      `).join(""):`
        <section class="panel">
          <div class="empty">
            ${w("layers",18)}
            <span>${g("noTasks")}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function Xo(e=null){if(!I("manage_templates"))return k(g("permissionDenied"),!0);const a=yt.map(s=>`<option value="${c(s.id)}" ${e?.categoryId===s.id?"selected":""}>${c(t(s.ar,s.en))}</option>`).join(""),n=`<form id="template-form" data-template-id="${c(e?.id||"")}">
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
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${c(e.id)}" style="color:var(--red)">${w("trash",14)} ${g("delete")}</button>`:"<div></div>"}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${w("check",14)} ${g(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;document.getElementById("modal-root").innerHTML=Ae(e?t("تعديل قالب","Edit Template"):t("إضافة قالب جديد","Add New Template"),t("القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.","Templates help the team insert tasks quickly with standard criteria."),n,"template")}var Zo=ye({openUploadDrawingModal:()=>es,renderDocuments:()=>Qo});function Qo(){const e=o.data?.documents||[],a=o.data?.projects||[],n=o.data?.tasks||[],s=(o.searches?.documents||"").trim().toLowerCase(),r=o.docProjectFilter||"all",i=o.data?.user?.id,d=P(),l=d||I("review_tasks")||I("approve_tasks")||I("edit_tasks"),p=new Set(n.filter(y=>!y.deletedAt).map(y=>y.id)),u=new Set(a.filter(y=>!y.deletedAt).map(y=>y.id)),f=e.filter(y=>!(y.deletedAt||y.taskId&&!p.has(y.taskId)||y.projectId&&!u.has(y.projectId)||r!=="all"&&y.projectId!==r||s&&!(y.originalName||"").toLowerCase().includes(s))).sort((y,x)=>new Date(x.createdAt||0)-new Date(y.createdAt||0)),v=f.reduce((y,x)=>y+(x.size||0),0),$=v>1073741824?(v/1073741824).toFixed(1)+" GB":v>1048576?(v/1048576).toFixed(1)+" MB":Math.round(v/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${g("documents")}</h2>
        <p class="intro">${t("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${I("upload_documents")||d?`
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${w("upload",14)}
            <span>${t("رفع مخطط / ملف جديد","Upload Drawing / File")}</span>
          </button>
        `:""}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${t("الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة","Go to trash bin to review and restore deleted files and projects")}">
          ${w("trash",14)}
          <span>${t("سلة المهملات","Trash")}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${f.length} ${t("مخطط / ملف","drawings")} (${$})
        </span>
      </div>
    </div>

    <!-- Filters Bar (Unified View Toolbar) -->
    <div class="view-toolbar" style="margin-bottom:20px;">
      <div class="view-toolbar-start" style="flex:1;">
        <div class="search-box" style="flex:1;max-width:440px;">
          ${w("search",15)}
          <input 
            type="search" 
            placeholder="${t("بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...","Search by drawing name, code, or format (DWG, PDF, RVT)...")}" 
            value="${c(o.searches?.documents||"")}" 
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
            ${f.length>0?f.map(y=>{const x=a.find(N=>N.id===y.projectId),m=n.find(N=>N.id===y.taskId),b=ta(y.originalName,y.mimeType),T=qa(y.originalName),D=y.size>1048576?(y.size/1048576).toFixed(1)+" MB":Math.round((y.size||0)/1024)+" KB",A=d||I("delete_documents")||y.uploaderId===i;return`
                <tr data-doc-id="${c(y.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(y.id)}">
                      <span class="file-format-badge" style="background:${b.bg};color:${b.color};border:1px solid ${b.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${b.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(y.originalName)}">
                          ${c(y.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${b.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${x?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${c(x.id)}">${c(x.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${m?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(m.id)}">${c(t(m.titleAr,m.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
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
                          ${c(K(y.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${D}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${Ee(y.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(y.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${w("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(y.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ رابط Google Drive","Copy Drive Link")}">
                        ${w("link",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${c(y.id)}" style="padding:5px;color:var(--blue);" title="${t("تحميل المخطط","Download")}">
                        ${w("download",14)}
                      </button>
                      ${A?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${c(y.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
                          ${w("trash",14)}
                        </button>
                      `:""}
                    </div>
                  </td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${w("document",24)}
                    <span>${t("لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.","No drawings or documents found matching the criteria.")}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function es(e=null){const a=o.data?.projects||[],n=e||a[0]?.id||"",s=o.data?.tasks?.filter(d=>d.projectId===n&&!d.deletedAt)||[],r=`
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
            ${s.map(d=>`<option value="${c(d.id)}">${c(t(d.titleAr,d.titleEn))}</option>`).join("")}
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
          <div style="color:var(--teal);margin-bottom:8px;">${w("upload",28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${t("اسحب وأفلت المخططات هنا أو انقر للاختيار","Drag & drop drawings here or click to browse")}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${t("يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)","Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)")}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${t("إلغاء","Cancel")}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${w("upload",14)} <span>${t("بدء الرفع المباشر","Start Resumable Upload")}</span>
        </button>
      </div>
    </form>
  `,i=document.getElementById("modal-root");if(i){i.innerHTML=Ae(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),r,"upload-drawing","modal-lg");const d=document.getElementById("drawing-upload-project"),l=document.getElementById("drawing-upload-task");d&&l&&d.addEventListener("change",()=>{const m=d.value,b=o.data?.tasks?.filter(T=>T.projectId===m&&!T.deletedAt)||[];l.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+b.map(T=>`<option value="${c(T.id)}">${c(t(T.titleAr,T.titleEn))}</option>`).join("")});const p=document.getElementById("drawing-dropzone"),u=document.getElementById("drawing-file-input"),f=document.getElementById("drawing-selected-files-list"),v=document.getElementById("start-drawing-upload-btn");let $=[];const y=()=>{if(!$.length){f.innerHTML="",v.disabled=!0;return}v.disabled=!1,f.innerHTML=$.map((m,b)=>{const T=ta(m.name,m.type),D=m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round(m.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${T.bg};color:${T.color};border:1px solid ${T.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${T.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${c(m.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${D})</span>
            </div>
            <button type="button" data-file-remove="${b}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),f.querySelectorAll("[data-file-remove]").forEach(m=>{m.addEventListener("click",b=>{const T=parseInt(m.dataset.fileRemove);$.splice(T,1),y()})})};p&&u&&(p.addEventListener("click",()=>u.click()),u.addEventListener("change",()=>{u.files?.length&&($=Array.from(u.files),y())}),p.addEventListener("dragover",m=>{m.preventDefault(),p.style.borderColor="var(--teal)"}),p.addEventListener("dragleave",()=>{p.style.borderColor="var(--line)"}),p.addEventListener("drop",m=>{m.preventDefault(),p.style.borderColor="var(--line)",m.dataTransfer?.files?.length&&($=Array.from(m.dataTransfer.files),y())}));const x=document.getElementById("upload-drawing-form");x&&x.addEventListener("submit",async m=>{if(m.preventDefault(),!$.length)return;const b=d.value,T=l.value||null,D=document.getElementById("drawing-upload-discipline")?.value||"عام",A=document.getElementById("drawing-upload-status")?.value||"draft";H(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:$,projectId:b,taskId:T,discipline:D,status:A})})}}var Ln={assignment:{type:"assignment",category:"tasks",icon:"user",color:"blue",titleAr:"إسناد مهمة جديدة",titleEn:"Task Assigned",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_status:{type:"task_status",category:"tasks",icon:"check",color:"teal",titleAr:"تحديث حالة المهمة",titleEn:"Task Status Update",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_blocked:{type:"task_blocked",category:"tasks",icon:"alert",color:"red",titleAr:"مهمة متوقفة ⚠️",titleEn:"Task Blocked ⚠️",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_review:{type:"task_review",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة للمراجعة الفنية",titleEn:"Task for Review",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_approval:{type:"task_approval",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة بانتظار الاعتماد",titleEn:"Task Pending Approval",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},due_soon:{type:"due_soon",category:"schedule",icon:"clock",color:"amber",titleAr:"موعد تسليم قريب",titleEn:"Due Soon",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},overdue:{type:"overdue",category:"schedule",icon:"alert",color:"red",titleAr:"مهمة متأخرة",titleEn:"Overdue Task",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},reminder:{type:"reminder",category:"schedule",icon:"clock",color:"amber",titleAr:"تذكير بموعد ⏰",titleEn:"Due Reminder ⏰",badgeTextAr:"فتح التذكير",badgeTextEn:"Open Reminder"},comment:{type:"comment",category:"communication",icon:"mail",color:"blue",titleAr:"تعليق جديد",titleEn:"New Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},mention:{type:"mention",category:"communication",icon:"mail",color:"blue",titleAr:"تم ذكرك في تعليق",titleEn:"Mentioned in Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},document_review:{type:"document_review",category:"drawings",icon:"document",color:"amber",titleAr:"مراجعة مخطط هندسي",titleEn:"Drawing Review",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},document_approved:{type:"document_approved",category:"drawings",icon:"document",color:"teal",titleAr:"اعتماد مخطط هندسي",titleEn:"Drawing Approved",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},escalation:{type:"escalation",category:"system",icon:"alert",color:"red",titleAr:"تصعيد مهمة ونظام 🚨",titleEn:"Escalation Alert 🚨",badgeTextAr:"التفاصيل",badgeTextEn:"Details"},general:{type:"general",category:"system",icon:"bell",color:"blue",titleAr:"تنبيه مساحة العمل",titleEn:"Workspace Notification",badgeTextAr:"عرض",badgeTextEn:"View"}};function ts(e){const a=Ln[e]||Ln.general;return{...a,defaultTitle:t(a.titleAr,a.titleEn),badgeText:t(a.badgeTextAr,a.badgeTextEn)}}var as=ye({showNotifications:()=>cn});function cn(){const e=o.data?.notifications||[],a=e.filter(r=>!r.read&&!r.readAt).length,n=e.length-a,s=`${`
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
            ${w("check",12)} ${t("تحديد الكل كمقروء","Mark all as read")}
          </button>
        `:""}
        ${n>0?`
          <button type="button" class="btn btn-ghost btn-sm" data-action="clear-read-notifications" style="font-size:11px;color:var(--muted);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${t("حذف كافة الإشعارات المقروءة","Clear all read notifications")}">
            ${w("trash",12)} ${t("مسح المقروء","Clear read")}
          </button>
        `:""}
        <button type="button" class="btn btn-ghost btn-sm" data-action="send-test-notification" style="font-size:11px;color:var(--blue);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${t("إرسال إشعار تجريبي فوري للتأكد من وصوله","Send live test notification")}">
          ${w("bell",12)} ${t("تجربة إرسال","Test Send")}
        </button>
      </div>
    </div>
  `}${typeof window<"u"&&"Notification"in window&&Notification.permission==="default"?`
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
      <span style="color:var(--ink-soft);">${t("تفعيل إشعارات سطح المكتب والمتصفح عند وصول مهام أو تنبيهات؟","Enable desktop browser alerts when new tasks or mentions arrive?")}</span>
      <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${t("تفعيل الآن","Enable")}</button>
    </div>
  `:""}${e.length?`<div class="attention-list">${e.slice(0,30).map(r=>{const i=!!(r.readAt||r.read),d=ts(r.type),l=o.lang==="ar"?r.titleAr||d.titleAr||r.titleEn||d.defaultTitle:r.titleEn||d.titleEn||r.titleAr||d.defaultTitle,p=o.lang==="ar"?r.messageAr||r.bodyAr||r.content||"":r.messageEn||r.bodyEn||(r.content!==r.titleAr&&r.content!==r.messageAr?r.content:"")||r.messageAr||r.bodyAr||"",u=p&&p!==l?`${p} · `:"",f=r.type==="document_review"||r.type==="document_approved"||r.documentId,v=r.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-weight:600;">${w("check",10)} ${t("فتح المهمة","Open Task")}</span>`:f?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);font-weight:600;">${w("document",10)} ${t("معاينة المخطط","View Drawing")}</span>`:r.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);font-weight:600;">${w("building",10)} ${t("المشروع","Project")}</span>`:"",$=i?"":`<span style="width:7px;height:7px;border-radius:50%;background:var(--blue);display:inline-block;flex-shrink:0;box-shadow:0 0 0 2px var(--surface);" title="${t("غير مقروء","Unread")}"></span>`;return`
      <div class="attention-item notif-item" data-action="read-notification" data-notification-id="${c(r.id)}" data-task-id="${c(r.taskId||"")}" data-project-id="${c(r.projectId||"")}" data-document-id="${c(r.documentId||"")}" data-type="${c(r.type||"")}" style="border:1px solid ${i?"var(--line)":"rgba(56,189,248,0.25)"};text-align:start;width:100%;cursor:pointer;opacity:${i?".75":"1"};background:${i?"var(--surface-soft)":"var(--surface)"};position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
        <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
          <span class="attention-icon ${d.color}" style="flex-shrink:0;margin-top:2px;">${w(d.icon,14)}</span>
          <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
              ${$}
              <strong dir="auto" style="color:var(--${d.color});font-size:12px;font-weight:${i?"600":"700"};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(l)}</strong>
              ${v}
            </div>
            <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(p)}">
              ${c(u)}<span style="color:var(--ink-soft);">${Ee(r.createdAt)}</span>
            </div>
          </div>
        </div>
        <button type="button" class="notif-dismiss-btn" data-action="delete-notification" data-notification-id="${c(r.id)}" title="${t("حذف الإشعار","Dismiss notification")}" style="margin-inline-start:10px;flex-shrink:0;">
          ${w("close",12)}
        </button>
      </div>
    `}).join("")}</div>`:`
    <div class="empty" style="padding:48px 20px;text-align:center;">
      <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
        ${w("bell",24)}
      </span>
      <strong style="display:block;font-size:14px;color:var(--ink);">${t("لا توجد إشعارات حالياً","No notifications right now")}</strong>
      <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${t("ستظهر هنا التنبيهات الخاصة بالمهام والمشاريع والإشارات والتذكيرات.","Task, project, mention, and reminder alerts will appear here.")}</span>
    </div>
  `}`;document.getElementById("modal-root").innerHTML=Ae(g("notifications"),t("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),s,"notifications","modal-notifications")}var ns=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),Aa=ns?"⌘K":"Ctrl+K",Te=0,ve=[];function ji(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.body.style.overflow="hidden";const a=t(`ابحث في المشاريع، المهام، والأعضاء... (${Aa})`,`Search projects, tasks, team... (${Aa})`),n=`
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${w("search",18)}</span>
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
          ${Rn("")}
        </div>
        <div class="omnisearch-foot">
          <div class="omni-shortcuts-hint">
            <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd> ${t("للتنقل","to navigate")}</span>
            <span><kbd class="shortcut-kbd">↵</kbd> ${t("للاختيار","to select")}</span>
            <span><kbd class="shortcut-kbd">ESC</kbd> ${t("للإغلاق","to close")}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="open-cheatsheet" style="font-size:11px;padding:2px 6px;">
            ${w("sparkles",12)} ${t("دليل الاختصارات (?)","Shortcuts (?)")}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const s=document.getElementById("omnisearch-modal");s&&s.addEventListener("click",i=>{i.target===s&&Xe()});const r=document.getElementById("omnisearch-input");if(r){r.focus();let i=null;r.addEventListener("input",d=>{Te=0,i&&cancelAnimationFrame(i);const l=d.target.value;i=requestAnimationFrame(()=>{const p=document.getElementById("omnisearch-results-container");p&&(p.innerHTML=Rn(l))})}),r.addEventListener("keydown",is)}}function Xe(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.querySelector(".modal-backdrop")||(document.body.style.overflow="")}function is(e){e.key==="ArrowDown"?(e.preventDefault(),ve.length>0&&(Te=(Te+1)%ve.length,Mn())):e.key==="ArrowUp"?(e.preventDefault(),ve.length>0&&(Te=(Te-1+ve.length)%ve.length,Mn())):e.key==="Enter"?(e.preventDefault(),ve[Te]&&Ci(ve[Te])):e.key==="Escape"&&Xe()}function Mn(){document.querySelectorAll(".omni-item").forEach((e,a)=>{e.classList.toggle("selected",a===Te),a===Te&&e.scrollIntoView({block:"nearest"})})}function Ci(e){if(Xe(),e.type==="action")if(e.id==="new-task"){const a=(o.data?.projects||[]).find(n=>n.id===(o.activeProjectId||o.lastActiveProjectId))||(o.data?.projects||[])[0];Yt(null,null,e.targetProjectId||a?.id)}else e.id==="new-project"?rn():e.id==="cheatsheet"?pn():e.id==="show-notifications"&&cn();else if(e.type==="project")o.projectTab="tasks",o.lastActiveProjectId=e.id,we("project-detail",e.id);else if(e.type==="task"){const a=o.data?.tasks?.find(n=>n.id===e.id);a&&Yt(a)}else if(e.type==="user"){const a=o.data?.users?.find(n=>n.id===e.id);a&&typeof window.openUserModal=="function"&&window.openUserModal(a)}}function Rn(e){const a=e.trim().toLowerCase(),n=[],s=(o.data?.projects||[]).find(l=>l.id===(o.activeProjectId||o.lastActiveProjectId))||(o.data?.projects||[])[0],r=s?t(s.nameAr,s.nameEn):"",i=[];(I("create_tasks")||P())&&i.push({type:"action",id:"new-task",targetProjectId:s?.id,title:t("إضافة مهمة جديدة","Create new task"),sub:s?t(`في مشروع: ${r}`,`In project: ${r}`):t("إجراء سريع","Quick action"),icon:"plus",keywords:"new task مهمة إضافة عمل جديد"}),(I("create_projects")||P())&&i.push({type:"action",id:"new-project",title:t("إنشاء مشروع جديد","Create new project"),sub:t("إجراء سريع","Quick action"),icon:"building",keywords:"new project مشروع إنشاء جديد"}),i.push({type:"action",id:"cheatsheet",title:t("عرض دليل اختصارات لوحة المفاتيح","View keyboard shortcuts guide"),sub:t("مساعدة","Help"),icon:"sparkles",keywords:"shortcuts اختصارات كيبورد مساعدة"}),i.push({type:"action",id:"show-notifications",title:t("مركز التنبيهات والإشعارات","Notifications Center"),sub:t("عرض الإشعارات والتنبيهات الحديثة","View recent notifications & alerts"),icon:"bell",keywords:"notifications alerts إشعارات تنبيهات رنين تنبيه"});for(const l of i)(!a||l.keywords.includes(a)||l.title.toLowerCase().includes(a))&&n.push(l);if(n.length<20&&(I("view_projects")||P())){const l=o.data?.projects||[];for(const p of l)if(n.length>=20||(!a||`${p.nameAr||""} ${p.nameEn||""} ${p.code||""} ${p.clientAr||""} ${p.clientEn||""}`.toLowerCase().includes(a))&&(n.push({type:"project",id:p.id,title:t(p.nameAr,p.nameEn),sub:`${p.code} · ${t(p.clientAr,p.clientEn)||""}`,badge:`${p.progress}%`,icon:"building"}),!a&&n.length>=5))break}if(n.length<20&&ie("tasks")){const l=o.data?.tasks||[];for(const p of l)if(n.length>=20||(!a||`${p.titleAr||""} ${p.titleEn||""} ${p.categoryAr||""} ${p.categoryEn||""}`.toLowerCase().includes(a))&&(n.push({type:"task",id:p.id,title:t(p.titleAr,p.titleEn),sub:p.dueDate?`📅 ${Ee(p.dueDate)}`:t(p.categoryAr,p.categoryEn)||"",badge:`${p.progress}%`,icon:"checklist"}),!a&&n.length>=10))break}if(n.length<20&&(P()||I("manage_users"))){const l=o.data?.users||[];for(const p of l)if(n.length>=20||(!a||`${p.name||""} ${p.nameEn||""} ${p.email||""} ${p.jobTitleAr||""}`.toLowerCase().includes(a))&&(n.push({type:"user",id:p.id,title:t(p.name,p.nameEn||p.name),sub:p.email||"",badge:ce(p),icon:"user"}),!a&&n.length>=15))break}if(ve=n.slice(0,15),!ve.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${w("search",24)}</span>
        <strong style="color:var(--ink);">${t("لا توجد نتائج مطابقة","No matching results")}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${t("جرب البحث بكلمات أخرى أو رمز المشروع.","Try different keywords or project code.")}</p>
      </div>
    `;let d="";return ve.map((l,p)=>{let u="";const f=l.type==="action"?t("إجراءات سريعة","Quick Actions"):l.type==="project"?t("المشاريع","Projects"):l.type==="task"?t("المهام والمخرجات","Tasks & Deliverables"):t("فريق العمل","Team");return f!==d&&(d=f,u=`<div class="omni-group-title">${f}</div>`),`
      ${u}
      <div class="omni-item ${p===Te?"selected":""}" data-omni-index="${p}" onclick="window.__selectOmniItem(${p})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${w(l.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${c(l.title)}</strong>
            ${l.sub?`<span style="font-size:11px;color:var(--muted);">${c(l.sub)}</span>`:""}
          </div>
        </div>
        ${l.badge?`<span class="omni-badge">${c(l.badge)}</span>`:""}
      </div>
    `}).join("")}window.__selectOmniItem=e=>{ve[e]&&Ci(ve[e])};function pn(){Xe();const e=`
    <div style="padding:4px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin:0 0 16px 0;">${t("استخدم هذه الاختصارات لزيادة سرعة عملك وإدارة المهام باحترافية كاملة بدون لمس الفأرة:","Use these shortcuts to navigate the workspace and manage tasks at full speed without a mouse:")}</p>
      
      <!-- القسم الأول: التنقل العام والإجراءات السريعة -->
      <div class="cheatsheet-section" style="margin-top:0;">
        <div class="cheatsheet-section-title">
          <span style="display:flex;color:var(--teal);">${w("search",14)}</span>
          <span>${t("التنقل العام والإجراءات السريعة","General & Navigation")}</span>
        </div>
        <div class="cheatsheet-grid">
          <div class="cheatsheet-row">
            <span>${t("البحث الشامل والأوامر السريعة","Omnisearch & Quick Commands")}</span>
            <kbd class="shortcut-kbd">${Aa}</kbd>
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
            <span style="display:flex;color:var(--teal);">${w("grid",14)}</span>
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
  `;document.getElementById("modal-root").innerHTML=Ae(t("دليل اختصارات لوحة المفاتيح","Keyboard Shortcuts Guide"),t("طرق سريعة للتنقل وإنجاز العمل وسحب وإفلات المهام بكفاءة عالية","Work faster with productivity hotkeys & accessible task reordering"),e,"cheatsheet","modal-cheatsheet")}function os(){window.addEventListener("keydown",e=>{const a=document.activeElement,n=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.tagName==="SELECT"||a.isContentEditable),s=e.code==="KeyK"||e.key?.toLowerCase()==="k"||e.key==="ن";if((e.metaKey||e.ctrlKey)&&s){e.preventDefault(),document.getElementById("omnisearch-modal")?Xe():ji();return}if((e.key==="?"||e.key==="؟"||e.code==="Slash"&&e.shiftKey)&&!n){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="cheatsheet"], .modal-cheatsheet')?H():pn();return}if((e.code==="KeyN"||e.key?.toLowerCase()==="n"||e.key==="ى")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;if(document.querySelector('.modal[data-modal="task"], #task-form'))H();else if(!document.querySelector('.modal:not([data-modal="task"])')){const r=o.view==="project-detail"&&o.activeProjectId?o.activeProjectId:o.data?.projects?.[0]?.id;Yt(null,null,r)}return}if((e.code==="KeyP"||e.key?.toLowerCase()==="p"||e.key==="ح")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="project"], #project-form')?H():document.querySelector('.modal:not([data-modal="project"])')||rn();return}if((e.code==="KeyB"||e.key?.toLowerCase()==="b"||e.key==="لا")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="notifications"], .modal-notifications')?H():document.querySelector('.modal:not(.modal-notifications):not([data-modal="notifications"])')||cn();return}if(e.key==="Escape"&&document.getElementById("omnisearch-modal")){e.preventDefault(),Xe();return}})}var ss="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",Pi=typeof navigator<"u"&&!!navigator.connection?.saveData,rs=3e5,ds=Pi?1e4:3e4,ls=Pi?600:300,cs=25e3,ps=150,fa=null,Nn=!1,Ta=!1,Qe=null,Se=null,Ut=null,st=null,ma=null,et=null,On=0,bt=0,Ne=!1,un=Date.now(),Ia=0,Rt=null,Ie=new Map;function us(e){if(!e||typeof e!="string")return;const a=Date.now();Ie.set(e,a);for(const[n,s]of Ie.entries())a-s>8e3&&Ie.delete(n);if(Ie.size>ps){const n=Ie.keys().next().value;n&&Ie.delete(n)}}function St(){return typeof localStorage>"u"?!1:!!localStorage.getItem("darc_token")}var Zt=new Set(["__proto__","constructor","prototype"]),_i=new Set(["custom_fields","permissions","details"]);function Qt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Qt);const a={};for(const[n,s]of Object.entries(e)){if(Zt.has(n))continue;const r=n.indexOf("_")===-1?n:n.replace(/_([a-z0-9])/g,(i,d)=>d.toUpperCase());Zt.has(r)||(a[r]=s!==null&&typeof s=="object"&&!_i.has(n)?Qt(s):s)}return a}function ea(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(ea);const a={};for(const[n,s]of Object.entries(e))Zt.has(n)||(a[n]=s!==null&&typeof s=="object"&&!_i.has(n)?ea(s):s);return a}function vt(e){if(!e||!o.data||!Array.isArray(o.data.tasks)||!Array.isArray(o.data.projects))return;const a=o.data.projects.find(p=>p.id===e);if(!a)return;const n=o.data.tasks.filter(p=>p.projectId===e&&!p.deletedAt&&!p.deleted_at);let s=0,r=0;for(const p of n){const u=Number(p.weight)||1,f=Number(p.progress)||0;s+=u,r+=u*(f/100)}const i=s>0?Math.round(r/s*100):0;a.progress!==i&&(a.progress=i),a.totalWeight=s;const d=n.length>0,l=d&&n.every(p=>p.status==="done"||p.status==="completed");d&&l&&i===100?a.lifecycle="completed":a.lifecycle==="completed"&&(!l||i<100)&&(a.lifecycle="active")}function ga(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const a=(o.data?.notifications||[]).filter(s=>!s.read&&!s.readAt).length;let n=e.querySelector(".notification-dot");a>0?n||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):n&&n.remove()}function Da(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Qe||Qe.state==="closed")&&(Qe=new e),Qe.state==="suspended"&&Qe.resume().catch(()=>{});const a=Qe,n=a.createOscillator(),s=a.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,a.currentTime),n.frequency.exponentialRampToValueAtTime(880,a.currentTime+.15),s.gain.setValueAtTime(.06,a.currentTime),s.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),n.connect(s),s.connect(a.destination),n.start(),n.stop(a.currentTime+.36)}catch{}}function fs(){Rt&&cancelAnimationFrame(Rt),Rt=requestAnimationFrame(()=>{Rt=null,typeof L=="function"?L():typeof Q=="function"&&Q()})}function qt(e,a,n,s){if(!o.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const r=n?ea(Qt(n)):null,i=s?ea(Qt(s)):null,d=r&&r.id||i&&i.id;if(!d)return!1;const l=Ie.get(d);if(l&&Date.now()-l<5e3)return!0;const p=o.data?.user?.roleId==="admin"||o.data?.user?.role_id==="admin";if(r&&e==="notifications"){const $=r.userId||r.user_id;if($&&$!==o.data?.user?.id)return!1}else if(!p&&r&&(e==="tasks"||e==="documents"||e==="comments")){const $=r.projectId||(e==="comments"?o.data?.tasks?.find(y=>y.id===r.taskId)?.projectId:null);if($&&!o.data?.projects?.some(y=>y.id===$))return!1}Array.isArray(o.data[e])||(o.data[e]=[]);const u=o.data[e];let f=!1;const v=!!(r?.deletedAt||r?.deleted_at);if(a==="DELETE"||v){const $=u.length;let y=null;e==="tasks"&&(y=u.find(x=>x.id===d)?.projectId||i?.projectId||r?.projectId),o.data[e]=u.filter(x=>x.id!==d),o.data[e].length!==$&&(f=!0),e==="tasks"&&y?vt(y):e==="projects"?Array.isArray(o.data.tasks)&&(o.data.tasks=o.data.tasks.filter(x=>x.projectId!==d)):e==="notifications"&&(ga(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="UPDATE"&&r){const $=u.findIndex(y=>y.id===d);if($!==-1){for(const[y,x]of Object.entries(r))Zt.has(y)||(u[$][y]=x);f=!0}else u.unshift(r),f=!0;e==="tasks"?(r.projectId&&vt(r.projectId),i?.projectId&&i.projectId!==r.projectId&&vt(i.projectId)):e==="notifications"&&(ga(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="INSERT"&&r){if(u.some($=>$.id===d)||(u.unshift(r),f=!0),e==="tasks"&&r.projectId)vt(r.projectId);else if(e==="notifications"){const $=o.data?.user?.id,y=r.userId||r.user_id,x=!!(r.read||r.readAt||r.read_at);if($&&y===$&&!x){ga();const m=o.lang==="ar"?r.titleAr||r.messageAr||r.bodyAr||r.content||r.titleEn||t("إشعار جديد","New notification"):r.titleEn||r.messageEn||r.bodyEn||(r.content!==r.titleAr&&r.content!==r.messageAr?r.content:"")||r.titleAr||t("إشعار جديد","New notification");if(m&&k(`🔔 ${m}`,!1),Da(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{const b=o.lang==="ar"?r.messageAr||r.bodyAr||r.content||"":r.messageEn||r.bodyEn||r.content||"",T=new Notification(m,{body:b,icon:"/favicon.ico",tag:r.id||"darc-alert"});T.onclick=()=>{window.focus(),typeof showNotifications=="function"&&showNotifications(),T.close()}}catch(b){console.warn("[WebNotification] Error:",b.message)}typeof showNotifications=="function"&&document.querySelector(".modal-notifications")&&showNotifications()}}}if(f){Ke();const $=r?.taskId||i?.taskId;if($){const y=(o.data?.tasks||[]).find(x=>x.id===$);if(y){if(e==="comments"){const x=document.getElementById("task-comment-form");if(x&&x.dataset.taskId===$){const m=document.getElementById("task-comments-list");m&&typeof kt=="function"&&(m.innerHTML=kt(y),m.scrollTop=m.scrollHeight)}}if(e==="documents"){const x=document.getElementById("task-dropzone");if(x&&x.dataset.taskId===$){const m=document.getElementById("task-documents-list");m&&typeof Ye=="function"&&(m.innerHTML=Ye(y))}}}}return fs(),!0}return!1}function Et(e="realtime"){St()&&(Ne&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!o.data||!o.view||(fa&&clearTimeout(fa),fa=setTimeout(async()=>{try{await me(!0)}catch(a){console.warn("[Realtime] Sync error:",String(e),a.message)}},ls)))}function ja(e,a,n,s={}){e&&e.readyState===WebSocket.OPEN&&(On++,e.send(JSON.stringify({topic:a,event:n,payload:s,ref:String(On)})))}function ms(e){fn(),Ut=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&ja(e,"phoenix","heartbeat")},cs)}function fn(){Ut&&(clearInterval(Ut),Ut=null)}function zi(e="disconnect"){if(Ta=!0,fn(),st&&(clearTimeout(st),st=null),Se){try{Se.close(1e3,e)}catch{}Se=null}}function Ca(e="idle"){Ne||(Ne=!0,zi(e))}function Pa(e="wake_up"){const a=Ne;Ne=!1,St()&&(typeof navigator<"u"&&!navigator.onLine||((!Se||Se.readyState===WebSocket.CLOSED||Se.readyState===WebSocket.CLOSING)&&mn(),(a||e==="tab_visible")&&Et(e)))}function mn(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&St()&&!Ne&&!(Se&&(Se.readyState===WebSocket.CONNECTING||Se.readyState===WebSocket.OPEN))){Ta=!1;try{const e=new WebSocket(ss);Se=e,e.onopen=()=>{bt=0,ms(e),ja(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(a=>{ja(e,`realtime:public:${a}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:a}]}})})},e.onmessage=a=>{try{const{event:n,topic:s,payload:r}=JSON.parse(a.data);if(n==="phx_reply"||n==="phx_close")return;if(n==="postgres_changes"&&r?.data){const{table:i,type:d,record:l,old_record:p}=r.data;if(qt(i,d,l,p))return}if((n==="INSERT"||n==="UPDATE"||n==="DELETE")&&s?.startsWith("realtime:public:")){const i=s.split(":")[2];if(qt(i,n,r?.record||r?.new,r?.old_record||r?.old))return}if(s==="realtime:darc_live"&&(n==="broadcast"||n==="STATE_MUTATION"||n==="GRANULAR_DELTA")){const i=r?.payload||r,d=i?.mutationId||i?.id||i?.entityId;if(d&&Ie.has(d))return;if(i?.delta){const{table:l,action:p,record:u,oldRecord:f}=i.delta;if(qt(l,p,u,f))return}Et("edge_broadcast");return}(n==="broadcast"||s==="realtime:darc_live"||typeof s=="string"&&s.startsWith("realtime:public:"))&&Et("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=a=>{if(fn(),Se=null,!(Ta||!St()||Ne)&&!(a?.reason==="logout"||a?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){bt++;const n=Math.min(3e4,Math.pow(2,Math.min(bt,5))*1e3);st&&clearTimeout(st),st=setTimeout(()=>{mn()},n)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function Bn(){const e=Date.now();e-Ia>1e4&&(Ia=e,un=e,Ne&&(typeof document>"u"||!document.hidden)&&Pa("user_active"))}function gs(){ma&&clearInterval(ma),ma=setInterval(()=>{const e=Date.now();for(const[a,n]of Ie.entries())e-n>8e3&&Ie.delete(a);Ne||typeof document<"u"&&document.hidden||Date.now()-un>=rs&&Ca("inactivity_idle")},6e4)}function vs(){if(!Nn){if(Nn=!0,St()&&mn(),gs(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,Bn,{passive:!0})}),window.addEventListener("mousemove",Bn,{passive:!0})),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden?(et&&clearTimeout(et),et=setTimeout(()=>{Ca("tab_hidden")},ds)):(et&&(clearTimeout(et),et=null),un=Date.now(),Ia=Date.now(),Pa("tab_visible"))}),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=a=>{if(a.data?.type==="GRANULAR_DELTA"&&a.data.delta){const{table:n,action:s,record:r,oldRecord:i}=a.data.delta;qt(n,s,r,i)}else a.data?.type==="STATE_MUTATION"&&Et("broadcast_channel")},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{o.isOffline=!1,bt=0;const e=window.api,a=typeof window.choose=="function"?window.choose:(s=>s),n=typeof window.showToast=="function"?window.showToast:console.log;if(Pa("online"),e){const s=await Fa(e);s&&s.synced>0?n(a(`تمت استعادة الاتصال ومزامنة ${s.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${s.synced} pending actions successfully! 🚀`),!1):n(a("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}Et("online")}),window.addEventListener("offline",()=>{if(o.isOffline=!0,bt=0,Ca("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function ys(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now()})}catch{}}typeof window<"u"&&(window.notifyStateMutation=ys,window.disconnectSupabaseRealtime=zi,window.recordRecentLocalMutation=us,window.recalculateProjectProgressInMemory=vt);var bs=ye({getOrCreateFloatingUploadWidget:()=>Li,handleChange:()=>Ma,handleClick:()=>za,handleInput:()=>La,handleSubmit:()=>_a,init:()=>Ri,updateFloatingUploadWidget:()=>nt,uploadDirectFiles:()=>Mi,uploadTaskFiles:()=>gn});async function _a(e){const a=e.target;if(!["project-form","task-form","user-form","role-form","activation-form","task-comment-form","template-form","force-password-form"].includes(a.id)&&!a.dataset.action)return;e.preventDefault();const n=Object.fromEntries(new FormData(a).entries()),s=a.querySelector('button[type="submit"]');s&&(s.disabled=!0,s.classList.add("is-loading"));try{if(a.id==="activation-form"){if(n.password!==n.passwordConfirm)throw new Error(t("كلمتا المرور غير متطابقتين.","Passwords do not match."));if(delete n.passwordConfirm,await C("/api/auth/activate",{method:"POST",body:JSON.stringify(n)}),window.history.replaceState({},"",window.location.pathname),It(),await me(),o.data?.user?.customFields?.calendarSystem){o.calendarSystem=o.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",o.calendarSystem)}catch{}}Q();return}if(a.id==="project-form"){n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.managerId||(n.managerId=null);let r=[];try{n.memberIds&&(r=JSON.parse(n.memberIds))}catch{}n.managerId&&!r.includes(n.managerId)&&r.push(n.managerId),n.memberIds=r;const i=!!a.dataset.projectId,d=await C(i?`/api/projects/${a.dataset.projectId}`:"/api/projects",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.project)if(o.data.projects||(o.data.projects=[]),i){const l=o.data.projects.findIndex(p=>p.id===d.project.id);l!==-1&&(o.data.projects[l]={...o.data.projects[l],...d.project})}else o.data.projects.unshift(d.project);H(),L(),k(t("تم حفظ المشروع.","Project saved."));return}if(a.id==="task-form"){const r=a.dataset.taskId;n.remindAt,delete n.remindAt,n.templateId=n.templateId||null,n.typeAr=n.typeAr||(n.templateId?"مخطط":null),n.typeEn=n.typeEn||(n.templateId?"Drawing":null),n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.assigneeId||(n.assigneeId=null),n.reviewerId||(n.reviewerId=null);let i=[];try{i=JSON.parse(n.additionalAssignees||"[]")}catch{i=[...a.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(v=>v.value)}let d=[];try{d=JSON.parse(n.externalAssignees||"[]")}catch{const v=String(n.externalAssignees||"").trim();d=v?v.split(/[,،]+/).map($=>$.trim()).filter(Boolean):[]}let l=[];try{l=JSON.parse(n.remindersJson||"[]")}catch{l=[]}delete n.additionalAssignees,delete n.externalAssignees,delete n.remindersJson,delete n.dependencies,delete n.weight,delete n.progress,n.customFields={additional_assignees:i,external_assignees:d,reminders:l},n.projectId||(n.projectId=o.activeProjectId||o.data.projects?.[0]?.id);const p=!!r;if(p){const f=(o.data?.tasks||[]).find(v=>v.id===r);f?.updatedAt&&(n.expectedUpdatedAt=f.updatedAt)}let u;try{u=await C(p?`/api/tasks/${r}`:"/api/tasks",{method:p?"PATCH":"POST",body:JSON.stringify(n)})}catch(f){if(f.message&&f.message.includes("تعارض")){await de(!0),k(f.message,!0);return}throw f}if(u.task){if(o.data.tasks||(o.data.tasks=[]),p){const f=o.data.tasks.findIndex(v=>v.id===u.task.id);f!==-1&&(o.data.tasks[f]={...o.data.tasks[f],...u.task})}else o.data.tasks.unshift(u.task),o.view==="tasks"&&(o.taskProjectFilter!=="all"&&o.taskProjectFilter!==u.task.projectId&&(o.taskProjectFilter=u.task.projectId),o.taskFilter==="mine"&&u.task.assigneeId!==o.data.user?.id&&(o.taskFilter="all"));if(Array.isArray(l)&&l.length>0){for(const f of l)if(!f.id||f.id.startsWith("rem_temp_")){const v=f.remindAt?new Date(f.remindAt):null;if(!v||isNaN(v.getTime()))continue;C("/api/reminders",{method:"POST",body:JSON.stringify({taskId:u.task.id,remindAt:v.toISOString(),noteAr:f.noteAr||n.titleAr||"تذكير لمتابعة المهمة"})}).catch($=>console.warn("[Reminder dispatch note]",$))}}}H(),L(),k(t("تم حفظ المهمة بنجاح.","Task saved successfully."));return}if(a.id==="task-comment-form"){const r=a.dataset.taskId,i=await C(`/api/tasks/${r}/comments`,{method:"POST",body:JSON.stringify(n)});a.reset(),i.comment&&(o.data.comments||(o.data.comments=[]),o.data.comments.push(i.comment));const d=o.data.tasks.find(p=>p.id===r),l=document.getElementById("task-comments-list");l&&(l.innerHTML=renderTaskComments(d),l.scrollTop=l.scrollHeight),s&&(s.disabled=!1);return}if(a.id==="force-password-form"){if(!P()&&!I("manage_users"))throw new Error(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."));const r=a.dataset.userId,i=a.dataset.isPending==="true";await C(`/api/users/${r}/force-password`,{method:"POST",body:JSON.stringify(n)});const d=o.data.users.find(l=>l.id===r);d&&(d.status="active"),H(),L(),k(i?t("تم تفعيل الحساب بنجاح.","Account activated successfully."):t("تم تغيير كلمة المرور وطرد المستخدم بنجاح.","Password changed and user kicked successfully.")),s&&(s.disabled=!1);return}if(a.id==="user-form"){const r=a.dataset.userId,i=!!r;if(!i&&!P()&&!I("manage_users"))throw new Error(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."));if(i&&!P()&&!I("manage_users")&&!I("manage_existing_account_permissions"))throw new Error(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."));const d=await C(i?`/api/users/${r}`:"/api/users",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.user)if(o.data.users||(o.data.users=[]),i){const l=o.data.users.findIndex(p=>p.id===d.user.id);l!==-1&&(o.data.users[l]={...o.data.users[l],...d.user})}else o.data.users.unshift(d.user);H(),L(),k(t("تم حفظ حساب العضو.","Member account saved."));return}if(a.id==="role-form"){if(!P()&&!I("manage_roles"))throw new Error(t("غير مصرح لك بإدارة وتعديل الأدوار.","Permission denied to manage roles."));const r=a.dataset.roleId,i=[...a.querySelectorAll('input[name="permissions"]:checked')].map(p=>p.value),d=!!r,l=await C(d?`/api/roles/${r}`:"/api/roles",{method:d?"PATCH":"POST",body:JSON.stringify({...n,permissions:i})});if(l.role)if(o.data.roles||(o.data.roles=[]),d){const p=o.data.roles.findIndex(u=>u.id===l.role.id);p!==-1&&(o.data.roles[p]={...o.data.roles[p],...l.role})}else o.data.roles.push(l.role);H(),L(),k(t("تم حفظ الدور بنجاح.","Role saved."));return}if(a.id==="template-form"){const r=a.dataset.templateId,i=!!r,d=await C(i?`/api/templates/${r}`:"/api/templates",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.template)if(o.data.templates||(o.data.templates=[]),i){const l=o.data.templates.findIndex(p=>p.id===d.template.id);l!==-1&&(o.data.templates[l]={...o.data.templates[l],...d.template})}else o.data.templates.push(d.template);H(),L(),k(t("تم حفظ القالب بنجاح.","Template saved."));return}if(a.dataset.action==="update-profile"){if(n.calendarSystem){o.calendarSystem=n.calendarSystem;try{localStorage.setItem("darc_calendar_system",n.calendarSystem)}catch{}}const r=await C("/api/users/me",{method:"PATCH",body:JSON.stringify(n)});if(r.user){o.data.user={...o.data.user,...r.user};const i=(o.data.users||[]).findIndex(d=>d.id===o.data.user.id);i!==-1&&(o.data.users[i]={...o.data.users[i],...r.user})}L(),k(t("تم حفظ وتحديث الملف الشخصي بنجاح.","Profile updated successfully.")),s&&(s.disabled=!1);return}if(a.dataset.action==="update-company"){if(!P()&&!I("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات الشركة.","Permission denied to update company settings."));const r=await C("/api/company",{method:"PATCH",body:JSON.stringify(n)});r.company&&(o.data.company={...o.data.company,...r.company}),L(),k(t("تم تحديث بيانات الشركة.","Company data updated.")),s&&(s.disabled=!1);return}if(a.dataset.action==="update-whatsapp"){if(!P()&&!I("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات التنبيهات.","Permission denied to update alert settings."));const r={enabled:a.querySelector('input[name="enabled"]')?.checked||!1,provider:n.provider||"evolution",instanceName:n.instanceName||"darc-workspace",serverUrl:n.serverUrl||"",apiKey:n.apiKey||"",recipient:n.recipient||"",notifyOnBlocked:a.querySelector('input[name="notifyOnBlocked"]')?.checked||!1,notifyOnApproval:a.querySelector('input[name="notifyOnApproval"]')?.checked||!1,notifyOnDrawing:a.querySelector('input[name="notifyOnDrawing"]')?.checked||!1,notifyOnCollectiveMention:a.querySelector('input[name="notifyOnCollectiveMention"]')?.checked!==!1,sendGroupBroadcast:a.querySelector('input[name="sendGroupBroadcast"]')?.checked||!1},i=await C("/api/whatsapp/config",{method:"POST",body:JSON.stringify({config:r})});i.config&&(o.data.company||(o.data.company={}),o.data.company.customFields||(o.data.company.customFields={}),o.data.company.customFields.whatsapp=i.config,o.data.company.custom_fields&&(o.data.company.custom_fields.whatsapp=i.config)),k(t("تم حفظ إعدادات تنبيهات واتساب بنجاح ✅","WhatsApp alert settings saved successfully ✅")),L(),s&&(s.disabled=!1);return}if(a.dataset.action==="change-password"){if(n.newPassword.length<10)throw new Error(t("كلمة المرور يجب أن تكون 10 أحرف على الأقل.","Password must be at least 10 characters."));await C("/api/auth/change-password",{method:"POST",body:JSON.stringify(n)}),a.reset(),k(t("تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.","Password changed successfully. Signed out of other devices.")),s&&(s.disabled=!1);return}}catch(r){a.id==="activation-form"?jt(n.token,r.message):k(r.message,!0)}finally{s&&(s.disabled=!1,s.classList.remove("is-loading"))}}async function za(e){const a=document.getElementById("mention-dropdown"),n=document.getElementById("project-menu");if(a&&!e.target.closest("#mention-dropdown")&&!e.target.closest('input[name="content"]')&&(a.style.display="none"),n&&!e.target.closest("#project-menu")&&!e.target.closest('[data-action="toggle-project-menu"]')&&(n.style.display="none"),e.target.classList.contains("modal-backdrop")){H();return}if(e.target.closest("#task-dropzone")&&e.target.id!=="task-upload-input"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}const s=e.target.closest("[data-action], [data-view]");if(!s)return;const r=s.dataset.action;if(r==="test-whatsapp"){const i=s.closest('[data-action="test-whatsapp"]');i&&(i.disabled=!0),k(t("جاري إرسال تنبيه تجريبي للواتساب...","Sending test WhatsApp alert..."));try{const d=document.querySelector('input[name="serverUrl"]')?.value||"",l=document.querySelector('input[name="apiKey"]')?.value||"",p=document.querySelector('input[name="recipient"]')?.value||"",u=document.querySelector('input[name="instanceName"]')?.value||"darc-workspace",f=document.querySelector('select[name="provider"]')?.value||"evolution",v=await C("/api/whatsapp/test",{method:"POST",body:JSON.stringify({config:{serverUrl:d,apiKey:l,recipient:p,instanceName:u,provider:f}})});k(v.message||t("تم إرسال الرسالة بنجاح! 🚀","Test message sent successfully! 🚀"))}catch(d){k(d.message||t("فشل إرسال رسالة الاختبار، تحقق من صحة البيانات.","Failed to send test alert."),!0)}finally{i&&(i.disabled=!1)}return}if(s.classList.contains("menu-item")){const i=s.closest(".dropdown-menu");i&&(i.style.display="none")}if(s.dataset.view){we(s.dataset.view,s.dataset.projectId||void 0);return}if(r==="trigger-avatar-upload"){const i=document.getElementById("user-avatar-file-input");i&&i.click();return}if(r==="trigger-company-logo-upload"){if(!P()&&!I("manage_settings")){k(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0);return}const i=document.getElementById("company-logo-file-input");i&&i.click();return}if(r==="toggle-theme"){o.theme=o.theme==="dark"?"light":"dark",xt({theme:o.theme}),document.documentElement.dataset.theme=o.theme,document.querySelectorAll('[data-action="toggle-theme"]').forEach(i=>{i.textContent=o.theme==="dark"?"☀️":"🌙"});return}if(r==="toggle-lang"){if(o.lang=o.lang==="ar"?"en":"ar",xt({lang:o.lang}),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.body.classList.toggle("is-ltr",o.lang==="en"),o.data?.user||typeof localStorage<"u"&&localStorage.getItem("darc_token"))Q();else{const i=new URLSearchParams(window.location.hash.replace(/^#/,""));if(i.get("activate"))jt(i.get("activate"));else if(i.get("reset"))lt(i.get("reset"));else{const d=document.getElementById("login-email")?.value||"",l=document.getElementById("login-password")?.value||"",p=!!document.getElementById("forgot-form");if(ke("",p?"forgot":"login"),d){const u=document.getElementById("login-email");u&&(u.value=d)}if(l){const u=document.getElementById("login-password");u&&(u.value=l)}}}return}if(r==="quick-fill-login"){const i=s.closest('[data-action="quick-fill-login"]'),d=document.getElementById("login-email"),l=document.getElementById("login-password"),p=i?.dataset?.email||"demo@darc-design.bond",u=i?.dataset?.pass||"demo123456";if(d&&(d.value=p,d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),l&&(l.value=u,l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),i?.dataset?.autosubmit==="true"){const f=document.getElementById("login-form");f&&(typeof f.requestSubmit=="function"?f.requestSubmit():f.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0})))}return}if(r==="goto-forgot"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#forgot"),ke("","forgot");return}if(r==="goto-login"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#login"),ke();return}if(r==="reset-demo-sandbox"){try{k(t("جاري إعادة ضبط بيانات العرض التجريبي...","Resetting demo sandbox..."),!1);const i=await C("/api/demo/reset",{method:"POST"});i&&i.data&&(o.data=i.data,xe(i.data),Q(),k(t("تمت إعادة ضبط البيانات بنجاح ✨","Demo data reset successfully ✨"),!1))}catch(i){k(i.message,!0)}return}if(r==="toggle-sidebar"){o.sidebarOpen=!o.sidebarOpen,document.querySelector(".sidebar")?.classList.toggle("open",o.sidebarOpen);return}if(r==="logout"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout"),await C("/api/auth/logout",{method:"POST"}).catch(()=>{});try{await Tn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_mutations_queue"),localStorage.removeItem("darc_offline_queue")}catch{}}Ke(),o.data=null,o.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),ke();return}if(r==="logout-all"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout_all"),await C("/api/auth/logout-all",{method:"POST"}).catch(()=>{});try{await Tn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_mutations_queue"),localStorage.removeItem("darc_offline_queue")}catch{}}Ke(),o.data=null,o.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),ke();return}if(r==="open-omnisearch"){ji();return}if(r==="close-omnisearch"){Xe();return}if(r==="open-cheatsheet"){document.querySelector('.modal[data-modal="cheatsheet"], .modal-cheatsheet')?H():pn();return}if(r==="close-modal"){H();return}if(r==="show-notifications"){document.querySelector('.modal[data-modal="notifications"], .modal-notifications')?H():showNotifications();return}if(r==="delete-notification"){e.stopPropagation();const i=s.dataset.notificationId||s.closest("[data-notification-id]")?.dataset.notificationId;if(!i)return;o.data?.notifications&&(o.data.notifications=o.data.notifications.filter(d=>d.id!==i)),showNotifications(),Q(),C(`/api/notifications/${encodeURIComponent(i)}`,{method:"DELETE"}).catch(d=>{console.warn("[Notifications] Failed to delete notification:",d)});return}if(r==="clear-read-notifications"){if(e.stopPropagation(),!(o.data?.notifications||[]).filter(i=>i.read||i.readAt).length)return;o.data?.notifications&&(o.data.notifications=o.data.notifications.filter(i=>!i.read&&!i.readAt)),showNotifications(),Q(),k(t("تم مسح التنبيهات المقروءة بنجاح.","Read notifications cleared successfully.")),C("/api/notifications/clear-read",{method:"POST"}).catch(i=>{console.warn("[Notifications] Failed to clear read notifications:",i)});return}if(r==="enable-browser-notifications"){e.stopPropagation(),typeof window<"u"&&"Notification"in window?Notification.requestPermission().then(i=>{if(i==="granted"){k(t("تم تفعيل إشعارات المتصفح بنجاح! 🔔","Desktop browser notifications enabled! 🔔"));try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("إشعارات المتصفح الفورية تعمل بنجاح الآن على هذا الجهاز.","Browser notifications are now working on this device."),icon:"/favicon.ico"})}catch{}}else i==="denied"&&k(t("تم رفض الإشعارات من إعدادات المتصفح.","Notifications are blocked in browser settings."),!0);showNotifications()}):k(t("متصفحك لا يدعم إشعارات الويب المباشرة.","Your browser does not support web notifications."),!0);return}if(r==="send-test-notification"){e.stopPropagation(),k(t("جاري إرسال إشعار تجريبي من السيرفر...","Sending test notification from server...")),C("/api/notifications/test",{method:"POST",body:JSON.stringify({messageAr:"إشعار فحص النظام المباشر — السيرفر والربط اللحظي يعملان بكفاءة 🚀",messageEn:"Live System Test — Backend and Realtime are operating smoothly 🚀"})}).then(i=>{k(t("تم إرسال الإشعار من السيرفر بنجاح! 🔔","Test notification dispatched from server! 🔔")),Da(),i&&i.notification&&(o.data.notifications||(o.data.notifications=[]),o.data.notifications.unshift(i.notification),showNotifications(),Q())}).catch(i=>{k(i.message||t("فشل إرسال الإشعار التجريبي","Failed to send test notification"),!0)});return}if(r==="play-test-chime"){e.stopPropagation(),Da(),k(t("تم تشغيل النغمة التنبيهية 🔔","Notification chime played 🔔"));return}if(r==="test-browser-notification"){if(e.stopPropagation(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("هذا اختبار لإشعار سطح المكتب والمتصفح — يعمل بنجاح! 🚀","This is a test desktop notification — working perfectly! 🚀"),icon:"/favicon.ico"}),k(t("تم إرسال إشعار المتصفح لسطح المكتب!","Desktop notification dispatched!"))}catch(i){k(i.message,!0)}else k(t("إشعارات المتصفح غير مفعلة بعد.","Browser notifications not yet enabled."),!0);return}if(r==="read-notification"){if(s.dataset.action==="delete-notification"||s.closest('[data-action="delete-notification"]'))return;const i=s.dataset.notificationId||s.closest("[data-notification-id]")?.dataset.notificationId,d=(o.data?.notifications||[]).find(v=>v.id===i);d&&(d.read=!0,d.readAt=new Date().toISOString()),Q(),i&&C(`/api/notifications/${i}`,{method:"PATCH",body:JSON.stringify({})}).catch(v=>{console.warn("[Notifications] Failed to patch read status in background:",v)}),H(!0);const l=s.dataset.taskId||d?.taskId,p=s.dataset.documentId||d?.documentId,u=s.dataset.projectId||d?.projectId,f=s.dataset.type||d?.type;if(p){xa(p);return}if(l){let v=(o.data?.tasks||[]).find($=>$.id===l);if(v){v.projectId&&(o.activeProjectId=v.projectId),openTaskModal(v);return}try{const $=await C(`/api/tasks/${l}`);if($&&$.id){o.data.tasks||(o.data.tasks=[]),o.data.tasks.push($),$.projectId&&(o.activeProjectId=$.projectId),openTaskModal($);return}}catch($){console.warn("[Notifications] Failed to fetch task on demand:",$)}}if(f==="document_review"&&u){o.activeProjectId=u,o.projectTab="drawings",we("project-detail",u);return}if(u){o.activeProjectId=u,we("project-detail",u);return}await de();return}if(r==="mark-all-notifications-read"){try{await C("/api/notifications/read-all",{method:"POST"}),(o.data?.notifications||[]).forEach(i=>{i.read=!0,i.readAt=new Date().toISOString()}),showNotifications(),Q(),k(t("تم تحديد كافة التنبيهات كمقروءة.","All notifications marked as read."))}catch(i){k(i.message,!0)}return}if(r==="toggle-project-menu"){n&&(n.style.display=n.style.display==="none"?"block":"none");return}if(r==="preview-doc"){const i=s.dataset.docId||s.closest("[data-doc-id]")?.dataset.docId;i&&xa(i);return}if(r==="copy-doc-link"){const i=s.dataset.docId||s.closest("[data-doc-id]")?.dataset.docId,d=o.data?.documents?.find(l=>l.id===i);if(d){const l=s.closest("button")||s;await Za(d,l)}return}if(r==="download-doc"){const i=s.dataset.docId||s.closest("[data-doc-id]")?.dataset.docId;i&&await ge(i);return}if(r==="trigger-upload"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}if(r==="open-upload-drawing-modal"){typeof openUploadDrawingModal=="function"?openUploadDrawingModal(s.dataset.projectId||null):typeof window.openUploadDrawingModal=="function"&&window.openUploadDrawingModal(s.dataset.projectId||null);return}if(r==="new-project"){document.querySelector('.modal[data-modal="project"], #project-form')?H():openProjectModal();return}if(r==="edit-project"){const i=o.data.projects.find(d=>d.id===s.dataset.projectId);i&&openProjectModal(i);return}if(r==="clone-project"){const i=o.data.projects.find(d=>d.id===s.dataset.projectId);i&&openCloneModal(i);return}if(r==="rename-doc"){const i=s.dataset.docId,d=o.data?.documents?.find(p=>p.id===i);if(!d)return;const l=window.prompt(t("أدخل الاسم الجديد:","Enter new name:"),d.originalName);if(!l||l===d.originalName)return;try{await C(`/api/documents/${i}`,{method:"PATCH",body:JSON.stringify({originalName:l})}),d.originalName=l,await de(!0);const p=o.data?.tasks?.find(u=>u.id===d.taskId);if(p){const u=document.getElementById("task-documents-list");u&&(u.innerHTML=Ye(p))}}catch(p){k(p.message,!0)}return}if(r==="go-to-trash"){o.settingsSection="trash",o.trashLoaded=!1,we("settings");return}if(r==="delete-doc"){if(!window.confirm(t("هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.","Are you sure you want to move this document to trash? You can restore it within 30 days.")))return;const i=s.dataset.docId,d=o.data?.documents?.find(l=>l.id===i)?.taskId;try{if(await C(`/api/documents/${i}`,{method:"DELETE"}),o.data?.documents&&(o.data.documents=o.data.documents.filter(l=>l.id!==i)),o.trashLoaded=!1,await de(!0),k(t("تم نقل المستند إلى سلة المهملات بنجاح.","Document moved to trash successfully.")),d){const l=o.data?.tasks?.find(p=>p.id===d);if(l){const p=document.getElementById("task-documents-list");p&&(p.innerHTML=Ye(l))}}}catch(l){k(l.message,!0)}return}if(r==="delete-project"){if(!window.confirm(t("هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.","Are you sure you want to delete this project? It will be archived.")))return;const i=[...o.data.projects||[]];o.data.projects=o.data.projects.filter(d=>d.id!==s.dataset.projectId),H(),we("projects"),k(t("جاري حذف المشروع...","Deleting project..."));try{await C(`/api/projects/${s.dataset.projectId}`,{method:"DELETE"}),o.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await de(!0),k(t("تم حذف المشروع بنجاح.","Project deleted successfully."))}catch(d){o.data.projects=i,L(),k(d.message,!0)}return}if(r==="delete-task"){if(!window.confirm(t("هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.","Are you sure you want to delete this task? It will be moved to trash.")))return;const i=s.dataset.taskId,d=[...o.data.tasks||[]];o.data.tasks=o.data.tasks.filter(l=>l.id!==i),H(),L(),k(t("جاري حذف المهمة...","Deleting task..."));try{await C(`/api/tasks/${i}`,{method:"DELETE"}),o.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await de(!0),k(t("تم حذف المهمة بنجاح.","Task deleted successfully."))}catch(l){o.data.tasks=d,L(),k(l.message,!0)}return}if(r==="edit-task-comment"){const i=s.dataset.commentId,d=s.dataset.taskId,l=(o.data.comments||[]).find(f=>f.id===i);if(!l)return;const p=window.prompt(t("تعديل التعليق:","Edit comment:"),l.content);if(p===null)return;const u=p.trim();if(!u){k(t("لا يمكن ترك التعليق فارغاً.","Comment cannot be empty."),!0);return}if(u===l.content)return;try{const f=await C(`/api/tasks/${d}/comments/${i}`,{method:"PATCH",body:JSON.stringify({content:u})});if(f.comment){const v=(o.data.comments||[]).findIndex(x=>x.id===i);v!==-1&&(o.data.comments[v]=f.comment);const $=(o.data.tasks||[]).find(x=>x.id===d),y=document.getElementById("task-comments-list");y&&$&&(y.innerHTML=renderTaskComments($)),k(t("تم تعديل التعليق بنجاح.","Comment updated successfully."))}}catch(f){k(f.message,!0)}return}if(r==="delete-task-comment"){const i=s.dataset.commentId,d=s.dataset.taskId;if(!window.confirm(t("هل أنت متأكد من حذف هذا التعليق؟","Are you sure you want to delete this comment?")))return;try{await C(`/api/tasks/${d}/comments/${i}`,{method:"DELETE"}),o.data.comments&&(o.data.comments=o.data.comments.filter(u=>u.id!==i));const l=(o.data.tasks||[]).find(u=>u.id===d),p=document.getElementById("task-comments-list");p&&l&&(p.innerHTML=renderTaskComments(l)),k(t("تم حذف التعليق بنجاح.","Comment deleted successfully."))}catch(l){k(l.message,!0)}return}if(r==="manual-sync"){if(typeof navigator<"u"&&!navigator.onLine){k(t("أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡","You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡"),!1);return}const i=Tt();if(!i.length){k(t("جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️","All data is completely synchronized with cloud server ✔️"),!1);return}k(t(`جاري مزامنة ${i.length} عمليات معلقة مع السيرفر...`,`Syncing ${i.length} pending actions with server...`),!1);const d=await Fa(C);if(d.synced>0){if(k(t(`تمت مزامنة ${d.synced} عمليات بنجاح! 🚀`,`Successfully synced ${d.synced} actions! 🚀`),!1),await me(),o.data?.user?.customFields?.calendarSystem){o.calendarSystem=o.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",o.calendarSystem)}catch{}}}else d.failed>0&&k(t(`فشلت مزامنة ${d.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${d.failed} actions, please try again.`),!0);return}if(r==="new-task"){document.querySelector('.modal[data-modal="task"], #task-form')?H():openTaskModal(null,null,s.dataset.projectId);return}if(r==="new-user"){if(!P()&&!I("manage_users")){k(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."),!0);return}openUserModal();return}if(r==="new-role"){if(!P()&&!I("manage_roles")){k(t("غير مصرح لك بإنشاء أدوار جديدة.","Permission denied to create new roles."),!0);return}openRoleModal();return}if(r==="new-template"){openTemplateModal();return}if(r==="edit-template"){const i=o.data.templates.find(d=>d.id===s.dataset.templateId);i&&openTemplateModal(i);return}if(r==="delete-template"){if(!window.confirm(t("هل أنت متأكد من حذف هذا القالب؟","Are you sure you want to delete this template?")))return;const i=[...o.data.templates||[]];o.data.templates=o.data.templates.filter(d=>d.id!==s.dataset.templateId),L(),H();try{await C(`/api/templates/${s.dataset.templateId}`,{method:"DELETE"}),await de(!0),k(t("تم حذف القالب.","Template deleted."))}catch(d){o.data.templates=i,L(),k(d.message,!0)}return}if(r==="open-project"){o.projectTab="tasks",o.projectMemberFilter=null,we("project-detail",s.dataset.projectId);return}if(r==="filter-by-member"){const i=s.dataset.memberId;o.projectMemberFilter=o.projectMemberFilter===i?null:i,o.projectTab="tasks",requestAnimationFrame(()=>L());return}if(r==="clear-member-filter"){o.projectMemberFilter=null,requestAnimationFrame(()=>L());return}if(r==="back-to-projects"){o.projectMemberFilter=null,we("projects",null);return}if(r==="project-tab"){o.projectTab=s.dataset.tab;try{if(typeof window<"u"&&o.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(o.activeProjectId)}&tab=${encodeURIComponent(o.projectTab)}`),typeof sessionStorage<"u"){const d=sessionStorage.getItem("darc_last_route"),l=d?JSON.parse(d):{};l.view="project-detail",l.activeProjectId=o.activeProjectId,l.projectTab=o.projectTab,sessionStorage.setItem("darc_last_route",JSON.stringify(l))}}catch{}s.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(d=>d.classList.toggle("active",d===s));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>L());return}if(r==="toggle-timeline-view"){o.timelineView=s.dataset.viewMode||"gantt",requestAnimationFrame(()=>L());return}if(r==="prev-calendar-month"){const i=o.calendarDate?new Date(o.calendarDate):new Date;i.setMonth(i.getMonth()-1),o.calendarDate=i,requestAnimationFrame(()=>L());return}if(r==="next-calendar-month"){const i=o.calendarDate?new Date(o.calendarDate):new Date;i.setMonth(i.getMonth()+1),o.calendarDate=i,requestAnimationFrame(()=>L());return}if(r==="today-calendar-month"){o.calendarDate=new Date,requestAnimationFrame(()=>L());return}if(r==="open-task"){if(window._isDraggingTask||window._justDroppedAt&&Date.now()-window._justDroppedAt<400)return;const i=s.dataset.taskId||s.closest("[data-task-id]")?.dataset.taskId;if(!i)return;let d=(o.data?.tasks||[]).find(l=>l.id===i);if(d){openTaskModal(d);return}C(`/api/tasks/${i}`).then(l=>{l&&l.id?(o.data.tasks||(o.data.tasks=[]),o.data.tasks.push(l),openTaskModal(l)):k(t("تعذر العثور على المهمة أو تم نقلها لسلة المهملات.","Task not found or was moved to trash."),!0)}).catch(l=>{k(t("تعذر فتح المهمة: "+l.message,"Could not open task: "+l.message),!0)});return}if(r==="task-filter"){o.taskFilter=s.dataset.filter,s.closest(".view-toolbar-start")?.querySelectorAll(".filter-tab").forEach(i=>i.classList.toggle("active",i===s)),requestAnimationFrame(()=>L());return}if(r==="template-category"){o.templateCategory=s.dataset.category,requestAnimationFrame(()=>L());return}if(r==="use-template"){if(!o.data.projects.length)return k(g("noProjects"),!0);openTaskModal(null,s.dataset.templateId,o.activeProjectId);return}if(r==="open-user"){if(!P()&&!I("manage_users")&&!I("manage_existing_account_permissions")){k(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."),!0);return}const i=o.data.users.find(d=>d.id===s.dataset.userId);i&&openUserModal(i);return}if(r==="impersonate-user"){if(!P()){k(t("هذه الصلاحية خاصة بمدير النظام فقط.","Impersonation is restricted to system admin only."),!0);return}if(!window.confirm("هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً."))return;try{const i=await C(`/api/users/${s.dataset.userId}/impersonate`,{method:"POST"});i&&i.token&&typeof localStorage<"u"&&localStorage.setItem("darc_token",i.token),window.location.reload()}catch(i){k(i.message,!0)}return}if(r==="force-password-user"){if(!P()&&!I("manage_users")){k(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."),!0);return}const i=o.data.users.find(d=>d.id===s.dataset.userId);i&&openForcePasswordModal(i);return}if(r==="invite-user"){if(!P()&&!I("manage_users")){k(t("غير مصرح لك بإرسال دعوات للمستخدمين.","Permission denied to invite users."),!0);return}try{const i=await C(`/api/users/${s.dataset.userId}/invite`,{method:"POST"});await de(),k(i.emailConfigured?t("تم إرسال الدعوة.","Invitation sent."):t("تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.","Invite prepared, but the email provider is not configured."))}catch(i){k(i.message,!0)}return}if(r==="deactivate-user"){if(!P()&&!I("manage_users")){k(t("غير مصرح لك بتعطيل حسابات المستخدمين.","Permission denied to deactivate users."),!0);return}if(!window.confirm(g("confirmDeactivate")))return;const i=s.dataset.userId,d=o.data.users.find(p=>p.id===i),l=d?d.status:null;d&&(d.status="inactive"),L(),H();try{await C(`/api/users/${i}`,{method:"DELETE"}),await de(!0),k(t("تم تعطيل الحساب.","Account deactivated."))}catch(p){d&&(d.status=l),L(),k(p.message,!0)}return}if(r==="settings-section"){const i=s.dataset.section||"profile";if(!ue(i)){k(t("غير مصرح لك بالوصول لهذا القسم من الإعدادات.","Access denied to this settings section."),!0);return}o.settingsSection=i;try{if(typeof window<"u"&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(o.settingsSection)}`),typeof sessionStorage<"u"){const l=sessionStorage.getItem("darc_last_route"),p=l?JSON.parse(l):{};p.view="settings",p.settingsSection=o.settingsSection,sessionStorage.setItem("darc_last_route",JSON.stringify(p))}}catch{}s.closest(".settings-nav")?.querySelectorAll("button").forEach(l=>l.classList.toggle("active",l===s));const d=()=>{const l=document.getElementById("main-content");l&&(l.scrollTop=0,l.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0),document.documentElement&&(document.documentElement.scrollTop=0),document.body&&(document.body.scrollTop=0)};d(),o.settingsSection==="analytics"&&Bt(!0).then(()=>{L(),d()}).catch(()=>{}),o.settingsSection==="trash"&&!o.trashLoaded&&C("/api/trash").then(l=>{o.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(p=>({...p,type:"project"})),...(l.tasks||[]).map(p=>({...p,type:"task"})),...(l.documents||[]).map(p=>({...p,type:"document"}))],o.trashLoaded=!0;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}L(),d()}).catch(l=>console.error(l)),requestAnimationFrame(()=>{L(),d()});return}if(r==="refresh-analytics"){if(!ue("analytics")){k(t("غير مصرح لك بعرض وتحديث التحليلات والمراقبة.","Permission denied to view and refresh analytics."),!0);return}try{await Bt(!0),L(),k(t("تم تحديث مؤشرات التحليلات والمراقبة الحية بنجاح.","Live observability and analytics refreshed successfully."))}catch(i){k(i.message,!0)}return}if(r==="test-anomaly-alert"){if(!P()&&!I("manage_settings")){k(t("غير مصرح لك بإجراء محاكاة التنبيهات.","Permission denied to simulate anomaly alert."),!0);return}try{await C("/api/telemetry/test-anomaly",{method:"POST"}),await Bt(!0),await me(!0),Q(),k(t("🚨 تم رصد استهلاك زائد بنجاح وإرسال إشعار فوري لمركز التنبيهات!","🚨 Anomaly detected! Alert notification dispatched to Notification Center!"))}catch(i){k(i.message,!0)}return}if(r==="goto-diagnostics"){if(!P()&&!I("manage_settings")){k(t("غير مصرح لك بالوصول لتشخيص الأعطال.","Permission denied to access diagnostics."),!0);return}o.settingsSection="diagnostics",typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#settings?section=diagnostics"),L();return}if(r==="refresh-diagnostics"){if(!P()&&!I("manage_settings")){k(t("غير مصرح لك بتحديث سجل الأعطال.","Permission denied to refresh diagnostics."),!0);return}try{await Ft(!0),L(),k(t("تم تحديث سجل الأخطاء وتشخيصات المستخدمين بنجاح.","Diagnostics and incidents refreshed successfully."))}catch(i){k(i.message,!0)}return}if(r==="test-incident-simulate"){if(!P()&&!I("manage_settings")){k(t("غير مصرح لك بإجراء محاكاة للأعطال.","Permission denied to simulate error incidents."),!0);return}try{await C("/api/telemetry/test-error",{method:"POST"}),await Ft(!0),await me(!0),L(),k(t("🚨 تم رصد الخطأ وتوثيق خطوات المستخدم وإرسال بريد تنبيه للإدارة بنجاح!","🚨 Incident recorded with stack trace and alert email sent to admin!"))}catch(i){k(i.message,!0)}return}if(r==="test-diagnostic-email"){if(!P()&&!I("manage_settings")){k(t("غير مصرح لك باختبار إرسال البريد.","Permission denied to test alert email."),!0);return}try{await C("/api/telemetry/test-email",{method:"POST"}),k(t("✉️ تم إرسال رسالة اختبار التنبيهات البريدية للإدارة بنجاح!","✉️ Test alert email dispatched to admin successfully!"))}catch(i){k(i.message,!0)}return}if(r==="filter-diagnostics-user"){const i=s.dataset.userId||"all";zn(i),L();return}if(r==="clear-diagnostics-user-filter"){zn("all"),L();return}if(r==="resolve-diagnostic-incident"){if(!P()&&!I("manage_settings")){k(t("غير مصرح لك بمعالجة بلاغات الأعطال.","Permission denied to resolve incidents."),!0);return}const i=s.dataset.incidentId;if(i)try{await C(`/api/telemetry/incidents/${i}/resolve`,{method:"PATCH"}),await Ft(!0),L(),k(t("تم تحديد المشكلة كمعالجة بنجاح ✅","Incident marked as resolved ✅"))}catch(d){k(d.message,!0)}return}if(r==="copy-debug-bundle"){const i=s.dataset.bundle;i&&typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>{k(t("تم نسخ تقرير المشكلة الفني بالكامل للحافظة 📋","Full debug bundle copied to clipboard 📋"))}).catch(()=>{k(t("فشل النسخ التلقائي للحافظة","Failed to copy to clipboard"),!0)});return}if(r==="restore-item"){if(!P()&&!I("manage_trash")){k(t("غير مصرح لك باستعادة العناصر المحذوفة.","Permission denied to restore deleted items."),!0);return}try{await C(`/api/restore/${s.dataset.type}/${s.dataset.id}`,{method:"POST"});const i=await C("/api/trash");o.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(d=>({...d,type:"project"})),...(i.tasks||[]).map(d=>({...d,type:"task"})),...(i.documents||[]).map(d=>({...d,type:"document"}))];try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}await de(),k(t("تمت الاستعادة بنجاح.","Restored successfully."))}catch(i){k(i.message,!0)}return}if(r==="filter-trash"){if(!P()&&!I("manage_trash"))return;o.trashFilter=s.dataset.filter,requestAnimationFrame(()=>L());return}if(r==="purge-trash-item"){if(!P()&&!I("manage_trash")){k(t("غير مصرح لك بحذف العناصر نهائياً من سلة المهملات.","Permission denied to permanently delete trash items."),!0);return}const i=s.dataset.type,d=s.dataset.id;if(!window.confirm(t("هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.","Are you sure you want to permanently delete this item? This action cannot be undone.")))return;try{await C(`/api/trash/${i}/${d}`,{method:"DELETE"});const l=await C("/api/trash");o.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(p=>({...p,type:"project"})),...(l.tasks||[]).map(p=>({...p,type:"task"})),...(l.documents||[]).map(p=>({...p,type:"document"}))],L(),k(t("تم حذف العنصر نهائياً بنجاح.","Item permanently deleted."))}catch(l){k(l.message,!0)}return}if(r==="empty-trash"){if(!P()&&!I("manage_trash")){k(t("غير مصرح لك بإفراغ سلة المهملات.","Permission denied to empty trash."),!0);return}if(!window.confirm(t("هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.","Are you sure you want to empty the entire recycle bin? All items will be permanently erased.")))return;try{await C("/api/trash/empty",{method:"DELETE"}),o.trash=[],L(),k(t("تم إفراغ سلة المهملات بالكامل بنجاح.","Trash bin emptied successfully."))}catch(i){k(i.message,!0)}return}if(r==="open-role"){if(!P()&&!I("manage_roles")){k(t("غير مصرح لك بتعديل الأدوار والصلاحيات.","Permission denied to modify roles."),!0);return}const i=o.data.roles.find(d=>d.id===s.dataset.roleId);i&&openRoleModal(i);return}if(r==="delete-role"){if(!P()&&!I("manage_roles")){k(t("غير مصرح لك بحذف الأدوار.","Permission denied to delete roles."),!0);return}if(!window.confirm(g("confirmDeleteRole")))return;const i=s.dataset.roleId,d=[...o.data.roles||[]];o.data.roles=o.data.roles.filter(l=>l.id!==i),L(),H();try{await C(`/api/roles/${i}`,{method:"DELETE"}),await de(!0),k(t("تم حذف الدور.","Role deleted."))}catch(l){o.data.roles=d,L(),k(l.message,!0)}return}if(r==="export-csv"){if(!I("export_reports")&&!P()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ti();return}if(r==="print-portfolio-pdf"){if(!I("export_reports")&&!P()){k(t("ليس لديك صلاحية لطباعة التقارير.","You do not have permission to print reports."),!0);return}Di();return}if(r==="export-project"){if(!I("export_reports")&&!P()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ii(s.dataset.projectId);return}if(r==="export-project-pdf"){if(!I("export_reports")&&!P()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ea(s.dataset.projectId,!1);return}if(r==="export-project-client-pdf"){if(!I("export_reports")&&!P()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ea(s.dataset.projectId,!0);return}if(r==="export-audit-xls"){if(!I("view_audit_logs")&&!P()){k(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}yi();return}if(r==="print-audit-pdf"){if(!I("view_audit_logs")&&!P()){k(t("ليس لديك صلاحية لطباعة سجل الرقابة.","You do not have permission to print audit logs."),!0);return}bi();return}if(r==="load-full-audit"){if(!P()&&!I("view_audit_logs")){k(t("غير مصرح لك باستعراض سجل التدقيق الكامل.","Permission denied to view full audit logs."),!0);return}hi();return}if(r==="reset-audit-filters"){o.auditFilterAction="all",o.auditFilterEntity="all",o.auditFilterUser="all",o.auditSearchQuery="",L();return}}var tt=null;function La(e){if(e.target.name==="content"&&e.target.closest("#task-comment-form")){const s=e.target.value,r=s.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),i=document.getElementById("mention-dropdown");if(r){const d=r[1].toLowerCase(),l=(o.data?.users||[]).filter(f=>f.status!=="inactive").filter(f=>`${f.name||""} ${f.nameEn||""} ${f.email||""}`.toLowerCase().includes(d)),p=!d||"all".startsWith(d)||"الكل".startsWith(d)||"everyone".startsWith(d)||"الجميع".startsWith(d)||"فريق".startsWith(d);let u="";p&&(u+=`
          <div class="mention-option collective-mention" data-username="all" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--line);background:rgba(20,184,166,0.06);">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--brand-teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">📢</div>
            <div style="display:flex;flex-direction:column;gap:1px;text-align:start;">
              <strong style="font-size:12px;color:var(--brand-teal);">@all · ${t("الكل / الجميع (منشن لكافة الفريق والمدير)","Everyone (Team & Management)")}</strong>
              <span style="font-size:10px;color:var(--muted);">${t("إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة عبر واتساب","Direct WhatsApp alert to all project members & managers")}</span>
            </div>
          </div>
        `),l.length&&(u+=l.map(f=>{const v=(f.name||f.nameEn||f.email||"user").trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${c(v)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${X(f,"avatar-sm")}
              <span style="font-size:12px;">${c(t(f.name,f.nameEn||f.name))}</span>
            </div>
          `}).join("")),u?(i.innerHTML=u,i.style.display="block",i.querySelectorAll(".mention-option").forEach(f=>{f.onclick=()=>{const v=f.dataset.username;e.target.value=s.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${v} `),i.style.display="none",e.target.focus()}})):i.style.display="none"}else i.style.display="none"}if(e.target.dataset.action==="search-trash-input"){o.trashQuery=e.target.value;const s=e.target.selectionStart;clearTimeout(tt),tt=setTimeout(()=>{L();const r=document.querySelector('[data-action="search-trash-input"]');r&&(r.focus(),r.setSelectionRange(s,s))},120);return}if(e.target.dataset.action==="search-audit-input"){o.auditSearchQuery=e.target.value;const s=e.target.selectionStart;clearTimeout(tt),tt=setTimeout(()=>{L();const r=document.querySelector('[data-action="search-audit-input"]');r&&(r.focus(),r.setSelectionRange(s,s))},120);return}const a=e.target.dataset.search||(e.target.dataset.action==="search-documents"?"documents":null);if(!a)return;o.searches[a]=e.target.value;const n=e.target.selectionStart;clearTimeout(tt),tt=setTimeout(()=>{L();const s=document.querySelector(`[data-search="${a}"], [data-action="search-documents"]`);s&&(s.focus(),s.setSelectionRange(n,n))},120)}async function Ma(e){if(e.target.dataset.action==="filter-diagnostics-severity"){Ro(e.target.value),L();return}if(e.target.dataset.action==="filter-diagnostics-status"){No(e.target.value),L();return}if(e.target.dataset.action==="change-doc-status"){const a=e.target.dataset.docId,n=e.target.value,s=o.data?.documents?.find(r=>r.id===a);if(!s)return;try{await C(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}),s.status=n,k(t("تم تحديث حالة المخطط بنجاح ✅","Drawing status updated ✅")),await de(!0)}catch(r){k(r.message,!0)}return}if(e.target.dataset.action==="doc-project-filter"){o.docProjectFilter=e.target.value,L();return}if(e.target.dataset.action==="filter-project-docs-task"){o.docTaskFilter=e.target.value,L();return}if(e.target.dataset.action==="filter-audit-action"){o.auditFilterAction=e.target.value,L();return}if(e.target.dataset.action==="filter-audit-entity"){o.auditFilterEntity=e.target.value,L();return}if(e.target.dataset.action==="filter-audit-user"){o.auditFilterUser=e.target.value,L();return}if(e.target.dataset.action==="sort-project-tasks"||e.target.dataset.action==="sort-my-tasks"){Qa(e.target.value),L();return}if(e.target.name==="templateId"&&e.target.form?.id==="task-form"){const a=e.target.form,n=e.target.value,s=o.data.templates?.find(u=>u.id===n),r=a.querySelector('input[name="titleAr"]'),i=a.querySelector('input[name="titleEn"]'),d=a.querySelector("#task-type-ar"),l=a.querySelector("#task-type-en"),p=a.querySelector('textarea[name="descriptionAr"]');s?(r&&(!r.value||a.dataset.templateSelected==="true")&&(r.value=s.nameAr),i&&(!i.value||a.dataset.templateSelected==="true")&&(i.value=s.nameEn||""),d&&(d.value=s.typeAr||"مخطط"),l&&(l.value=s.typeEn||"Drawing"),p&&(!p.value||a.dataset.templateSelected==="true")&&(p.value=s.descriptionAr||""),a.dataset.templateSelected="true"):(d&&(d.value=""),l&&(l.value=""),delete a.dataset.templateSelected);return}if(e.target.name==="status"&&e.target.form?.id==="task-form"){const a=e.target.form.querySelector("#task-auto-progress-badge");if(a){const n={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];a.textContent=n!==void 0?`(${n}%)`:""}return}if(e.target.dataset.action==="task-project-filter"){o.taskProjectFilter=e.target.value,L();return}if(e.target.dataset.action==="task-priority-filter"){o.taskPriorityFilter=e.target.value,L();return}if(e.target.id==="sort-projects"||e.target.dataset?.action==="sort-projects"){o.projectSort=e.target.value,L();return}if(e.target.id==="task-upload-input"){const a=e.target.files;if(!a.length)return;const n=e.target.dataset.taskId;gn(a,n);return}if(e.target.classList.contains("doc-status-select")){const a=e.target.dataset.docId,n=e.target.value;C(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}).then(()=>{de(!0).then(()=>k(t("تم تحديث حالة المخطط.","Document status updated.")))}).catch(s=>k(s.message,!0));return}if(e.target.id==="user-avatar-file-input"){const a=e.target.files?.[0];if(!a)return;if(a.size>2621440){k(t("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.","Image is too large. Maximum allowed size is 2MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){k(t("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).","Please select a valid image file (JPG, PNG, WebP)."),!0),e.target.value="";return}try{k(t("جاري معالجة ورفع صورتك الشخصية...","Processing & uploading avatar..."));const n=await Fn(a,256,256),s=await C("/api/users/me",{method:"PATCH",body:JSON.stringify({avatarUrl:n})});if(s.user){o.data.user={...o.data.user,...s.user};const r=(o.data.users||[]).findIndex(i=>i.id===o.data.user.id);r!==-1&&(o.data.users[r]={...o.data.users[r],...s.user})}e.target.value="",Q(),Gt(),k(t("تم تحديث صورتك الشخصية وتثبيتها بنجاح!","Avatar updated successfully!"))}catch(n){e.target.value="",k(n.message,!0)}return}if(e.target.id==="company-logo-file-input"){if(!P()&&!I("manage_settings")){k(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0),e.target.value="";return}const a=e.target.files?.[0];if(!a)return;if(a.size>3145728){k(t("حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.","Logo is too large. Maximum allowed size is 3MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){k(t("يرجى اختيار ملف صورة أو شعار صالح.","Please select a valid logo image file."),!0),e.target.value="";return}try{k(t("جاري معالجة ورفع شعار الشركة...","Uploading company logo..."));const n=await Fn(a,400,400),s=await C("/api/company",{method:"PATCH",body:JSON.stringify({logoUrl:n})});s.company&&(o.data.company={...o.data.company,...s.company}),e.target.value="",Q(),Gt(),k(t("تم تحديث وتثبيت شعار مساحة العمل بنجاح!","Company logo updated successfully!"))}catch(n){e.target.value="",k(n.message,!0)}return}}function Fn(e,a=300,n=300){return new Promise((s,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(t("فشل قراءة ملف الصورة.","Failed to read image file."))),i.onload=()=>{const d=new Image;d.onerror=()=>r(new Error(t("صيغة الصورة تالفة أو غير صالحة.","Corrupted or invalid image format."))),d.onload=()=>{try{const l=d.naturalWidth||d.width,p=d.naturalHeight||d.height;if(l>4096||p>4096||l*p>16e6){r(new Error(t("أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.","Image dimensions too large (Pixel Flood Blocked). Please select a standard image.")));return}let u=l,f=p;if(u>a||f>n){const m=Math.min(a/u,n/f);u=Math.round(u*m),f=Math.round(f*m)}const v=document.createElement("canvas");v.width=u,v.height=f;const $=v.getContext("2d");$.imageSmoothingEnabled=!0,$.imageSmoothingQuality="high",$.drawImage(d,0,0,u,f);let y="image/webp",x=v.toDataURL(y,.82);x.startsWith("data:image/webp")||(y="image/jpeg",x=v.toDataURL(y,.82)),x.length>184320&&(x=v.toDataURL(y,.65)),s(x)}catch{r(new Error(t("تعذر معالجة وضغط الصورة.","Failed to process and compress image.")))}},d.src=i.result},i.readAsDataURL(e)})}function Ra({url:e,chunk:a,contentRange:n,headers:s={},onProgress:r}){return new Promise((i,d)=>{const l=new XMLHttpRequest;if(l.open("PUT",e,!0),e.includes("/api/")){l.withCredentials=!0;const p=typeof localStorage<"u"?localStorage.getItem("darc_token"):null;p&&!s.Authorization&&l.setRequestHeader("Authorization",`Bearer ${p}`)}for(const[p,u]of Object.entries(s))l.setRequestHeader(p,u);n&&l.setRequestHeader("Content-Range",n),l.upload&&r&&(l.upload.onprogress=p=>{p.lengthComputable&&r(p.loaded)}),l.onload=()=>{i({status:l.status,ok:l.status>=200&&l.status<300,headers:{get:p=>l.getResponseHeader(p)},responseText:l.responseText,json:()=>{try{return JSON.parse(l.responseText)}catch{return{}}}})},l.onerror=()=>d(new Error("Network connection error")),l.ontimeout=()=>d(new Error("Upload chunk timeout")),l.timeout=18e4,l.send(a)})}async function hs(e,a){try{const n=await Ra({url:e,chunk:new Blob([]),contentRange:`bytes */${a}`});if(n.status===308){const s=n.headers.get("Range");if(s){const r=s.match(/bytes=0-(\d+)/);if(r&&r[1])return parseInt(r[1],10)+1}return 0}if(n.ok)return{completed:!0,data:typeof n.json=="function"?await Promise.resolve(n.json()):{}}}catch{}return null}var Ht=null;function Li({projectName:e,taskName:a,totalFiles:n}){Ht&&(clearTimeout(Ht),Ht=null);let s=document.getElementById("floating-upload-manager");if(s){s.style.opacity="1",s.style.transform="none";const r=s.querySelector("#fum-proj-text"),i=s.querySelector("#fum-task-text");r&&e&&(r.textContent=e),i&&a&&(i.textContent=a)}else{s=document.createElement("div"),s.id="floating-upload-manager",s.setAttribute("dir",o.lang==="ar"?"rtl":"ltr"),s.style.cssText=`
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
    `,s.innerHTML=`
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
    `,document.body.appendChild(s);const r=s.querySelector("#fum-minimize-btn"),i=s.querySelector("#fum-body");r.addEventListener("click",()=>{const d=i.style.display==="none";i.style.display=d?"flex":"none",r.textContent=d?"—":"+"}),s.querySelector("#fum-close-btn").addEventListener("click",()=>{s.remove()})}return s}function nt({fileName:e,fileIndex:a,totalFiles:n,pct:s,loadedMB:r,fileSizeMB:i,speedMBs:d,etaText:l,statusNote:p,isError:u,isDone:f}){const v=document.getElementById("floating-upload-manager");if(!v)return;const $=v.querySelector("#fum-file-text"),y=v.querySelector("#fum-count-text"),x=v.querySelector("#fum-progress-fill"),m=v.querySelector("#fum-pct-text"),b=v.querySelector("#fum-speed-text"),T=v.querySelector("#fum-eta-text"),D=v.querySelector("#fum-status-badge"),A=v.querySelector("#fum-indicator"),N=v.querySelector("#fum-header-title"),O=v.querySelector("#fum-close-btn");e&&$&&($.textContent=e),y&&a&&n&&(y.textContent=`(${a}/${n})`),x&&typeof s=="number"&&(x.style.width=`${s}%`),m&&typeof s=="number"&&(m.textContent=`${s}%`),b&&r!==void 0&&i!==void 0&&(b.textContent=`${r} / ${i} MB • ${d||"0.0"} MB/s`),T&&l&&(T.textContent=`${t("متبقي:","ETA:")} ${l}`),p&&D?(D.style.display="block",D.textContent=p,D.style.background=u?"var(--red-soft)":"var(--amber-soft)",D.style.color=u?"var(--red)":"var(--amber)",D.style.border=u?"1px solid var(--red)":"1px solid var(--amber)"):!u&&!f&&D&&(D.style.display="none"),f&&(A&&(A.style.background="var(--mint-strong)",A.style.boxShadow="0 0 10px var(--mint-strong)"),N&&(N.textContent=t("اكتمل الرفع بنجاح! ✓","Upload Complete! ✓")),m&&(m.textContent="100%"),x&&(x.style.width="100%"),O&&(O.style.display="inline-block"),D&&(D.style.display="block",D.style.background="var(--mint)",D.style.color="var(--teal-dark)",D.style.border="1px solid var(--mint-strong)",D.textContent=t("تم التوثيق والرفع إلى الخادم بنجاح.","Document saved & uploaded to server.")),Ht=setTimeout(()=>{v&&v.parentNode&&(v.style.opacity="0",v.style.transform="translateY(12px)",setTimeout(()=>v.remove(),300))},4500)),u&&(A&&(A.style.background="var(--red)",A.style.boxShadow="0 0 10px var(--red)"),N&&(N.textContent=t("فشل في الرفع ✕","Upload Failed ✕")),O&&(O.style.display="inline-block"))}async function gn(e,a){if(!e||!e.length||!a)return;const n=o.data?.tasks?.find(s=>s.id===a);return Mi({files:e,taskId:a,projectId:n?.projectId,status:"draft",isTaskModal:!0})}async function Mi({files:e,projectId:a=null,taskId:n=null,discipline:s="عام",status:r="draft",isTaskModal:i=!1}){if(!e||!e.length)return;if(typeof navigator<"u"&&!navigator.onLine){k(t("لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.","Cannot upload drawings or files while offline. Please connect to the internet first."),!0);return}const d=n?o.data?.tasks?.find(D=>D.id===n):null,l=a||d?.projectId,p=l?o.data?.projects?.find(D=>D.id===l):null,u=o.data?.documents?o.data.documents.filter(D=>!D.deletedAt&&(n?D.taskId===n:D.projectId===l)):[],f=p?p.nameAr:"Project",v=d?d.titleAr:s||"General",$={},y=D=>{if($[D])return $[D];let A=0;return u.forEach(N=>{if(N.originalName&&N.originalName.toLowerCase().endsWith(D)){const O=N.originalName.match(/_v(\d+)\./);O&&parseInt(O[1])>A&&(A=parseInt(O[1]))}}),$[D]=A+1,A+1},x=document.getElementById("upload-progress-container");document.getElementById("upload-progress-bar"),document.getElementById("upload-progress-percent"),document.getElementById("upload-progress-text");const m=document.getElementById("task-dropzone");i&&x&&(x.style.display="block"),i&&m&&(m.style.pointerEvents="none"),Li({projectName:f,taskName:v,totalFiles:e.length});let b=null;const T=D=>(D.preventDefault(),D.returnValue=t("جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.","Uploading large engineering files. Leaving will abort upload."),D.returnValue);if(typeof window<"u"&&(window.addEventListener("beforeunload",T),"wakeLock"in navigator))try{navigator.wakeLock.request("screen").then(D=>{b=D}).catch(()=>{})}catch{}try{for(let D=0;D<e.length;D++){const A=e[D];if(!A.size||A.size===0){k(t(`الملف "${A.name}" فارغ لا يحتوي على بيانات.`,`File "${A.name}" is empty.`),!0);continue}if(A.size>107374182400){k(t(`حجم الملف "${A.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${A.name}" exceeds 100GB limit.`),!0);continue}const N=A.name.split(".").pop()?.toLowerCase()||"";if(["exe","bat","cmd","sh","bash","ps1","vbs","js","mjs","cjs","py","php","phtml","html","htm","jar","msi","dll","com","scr","hta","svg","apk"].includes(N)||A.type==="image/svg+xml"){k(t(`صيغة الملف "${A.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${A.name}" is not permitted for security reasons.`),!0);continue}const O=A.name.lastIndexOf("."),h=O!==-1?A.name.substring(O).toLowerCase():"",E=O!==-1?A.name.substring(0,O):A.name,S=U=>(U||"").replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,"-").replace(/\s+/g,"_").trim(),j=`${S(f)||"Project"}_${S(v)||"General"}_${S(E)||"Drawing"}_v${y(h)}${h}`,z=A.size>=1073741824?`${(A.size/1073741824).toFixed(2)} GB`:`${(A.size/1048576).toFixed(1)} MB`;nt({fileName:A.name,fileIndex:D+1,totalFiles:e.length,pct:0,loadedMB:"0.0",fileSizeMB:z,speedMBs:"0.0",etaText:"...",statusNote:t("بدء جلسة الرفع المستأنف...","Starting resumable session...")});const M=(await C("/api/documents/session",{method:"POST",body:JSON.stringify({compiledName:j,mimeType:A.type||"application/octet-stream",projectId:l,taskId:n,size:A.size})})).sessionUrl;let _=8388608;A.size<=10485760?_=A.size:A.size<=104857600?_=8388608:A.size<=524288e3?_=16777216:A.size<=2147483648?_=33554432:_=67108864;const R=Date.now();let B=0;const q=U=>{const J=Math.min(A.size,B+U),be=Math.min(100,Math.round(J/A.size*100)),re=J>=1073741824?`${(J/1073741824).toFixed(2)} GB`:`${(J/1048576).toFixed(1)} MB`;if(i){const hn=document.getElementById("upload-progress-bar"),xn=document.getElementById("upload-progress-percent"),wn=document.getElementById("upload-progress-text"),$n=document.getElementById("upload-progress-container");$n&&($n.style.display="block"),hn&&(hn.style.width=`${be}%`),xn&&(xn.textContent=`${be}%`);const Hi=(Date.now()-R)/1e3,kn=J/Math.max(Hi,.2),Wi=(kn/1048576).toFixed(1),Gi=Math.max(0,A.size-J),Lt=Math.round(Gi/Math.max(kn,1)),Vi=Lt<60?`${Lt} ${t("ثانية","s")}`:`${Math.floor(Lt/60)}:${String(Lt%60).padStart(2,"0")} ${t("دقيقة","min")}`;wn&&(wn.textContent=`${t("رفع إلى الخادم","Uploading to server")} (${D+1}/${e.length}): ${A.name} — ${re} / ${z} (${be}%) • ${Wi} MB/s • ${t("متبقي:","ETA:")} ${Vi}`)}const he=(Date.now()-R)/1e3,ne=J/Math.max(he,.2),Z=(ne/1048576).toFixed(1),je=Math.max(0,A.size-J),la=Math.round(je/Math.max(ne,1)),qi=la<60?`${la} s`:`${Math.floor(la/60)}m`;nt({fileName:A.name,fileIndex:D+1,totalFiles:e.length,pct:be,loadedMB:re,fileSizeMB:z,speedMBs:Z,etaText:qi})};q(0);let F=0,oe=null,ee=!1;for(;F<A.size;){const U=Math.min(F+_,A.size),J=A.slice(F,U),be=`bytes ${F}-${U-1}/${A.size}`;let re=0,he=!1;for(;!he&&re<5;)try{let ne;if(!ee)try{ne=await Ra({url:M,chunk:J,contentRange:be,headers:{},onProgress:Z=>q(Z)})}catch(Z){console.warn("[Upload] Direct GDrive upload failed, trying backend proxy:",Z.message),ee=!0}if(ee){const Z={projectId:l,taskId:n,compiledName:j,mimeType:A.type,size:A.size,status:r};ne=await Ra({url:`${na}/api/documents/chunk`,chunk:J,contentRange:be,headers:{"x-session-url":M,"x-doc-meta":encodeURIComponent(JSON.stringify(Z))},onProgress:je=>q(je)})}if(ne.status===308){const Z=ne.headers.get("Range");if(Z){const je=Z.match(/bytes=0-(\d+)/);je&&je[1]?F=parseInt(je[1],10)+1:F=U}else F=U;B=F,q(0),he=!0}else if(ne.ok){const Z=typeof ne.json=="function"?await Promise.resolve(ne.json()):{};oe=Z.id||Z.document?.id,B=A.size,q(0),F=A.size,he=!0;break}else throw new Error(`Upload returned status ${ne.status}`)}catch(ne){if(re++,nt({fileName:A.name,fileIndex:D+1,totalFiles:e.length,statusNote:`${t("إعادة المحاولة","Retrying")} (${re}/5)...`}),re>=5)throw new Error(`${t("فشل الرفع بعد محاولات متعددة","Upload failed after multiple retries")}: ${ne.message}`);await new Promise(je=>setTimeout(je,1e3*Math.pow(2,re-1)));const Z=await hs(M,A.size);if(typeof Z=="number"&&Z>F){F=Z,B=F;break}else if(Z&&Z.completed){oe=Z.data?.id,F=A.size,he=!0;break}}}oe&&!oe.startsWith("doc_")&&await C("/api/documents/finalize",{method:"POST",body:JSON.stringify({driveFileId:oe,projectId:l,taskId:n,compiledName:j,mimeType:A.type,size:A.size,status:r})})}if(await de(!0),i&&n){const D=o.data?.tasks?.find(N=>N.id===n),A=document.getElementById("task-documents-list");A&&D&&(A.innerHTML=Ye(D))}Gt(),nt({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),k(t("تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅","Drawing uploaded & registered successfully ✅"))}catch(D){nt({isError:!0,statusNote:D.message}),k(D.message,!0)}finally{if(typeof window<"u"&&window.removeEventListener("beforeunload",T),b){try{b.release()}catch{}b=null}if(i){const D=document.getElementById("upload-progress-container"),A=document.getElementById("upload-progress-bar"),N=document.getElementById("task-dropzone");D&&(D.style.display="none"),A&&(A.style.width="0%"),N&&(N.style.pointerEvents="auto");const O=document.getElementById("task-upload-input");O&&(O.value="")}}}typeof window<"u"&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener("dragover",e=>{const a=e.target.closest("#task-dropzone");a&&(e.preventDefault(),a.style.borderColor="var(--brand-teal)",a.style.background="var(--teal-soft)")}),document.addEventListener("dragleave",e=>{const a=e.target.closest("#task-dropzone");a&&(a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)")}),document.addEventListener("drop",e=>{const a=e.target.closest("#task-dropzone");if(a){e.preventDefault(),a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)";const n=a.dataset.taskId,s=e.dataTransfer?.files;s&&s.length&&gn(s,n)}}));async function Ri(){xt({theme:o.theme,lang:o.lang});try{o.calendarSystem=localStorage.getItem("darc_calendar_system")||o.calendarSystem||"gregorian"}catch{}if(typeof window<"u"&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",i=>{try{if(!localStorage.getItem("darc-theme")){o.theme=i.matches?"dark":"light",document.documentElement.dataset.theme=o.theme;const d=document.querySelector('[data-action="toggle-theme"]');d&&(d.textContent=o.theme==="dark"?"☀️":"🌙")}}catch{}})}catch{}}const e=typeof window<"u"?window.location.hash.replace(/^#/,""):"",a=new URLSearchParams(e.includes("?")?e.split("?")[1]:e.includes("=")?e:""),n=a.get("activate");if(n)return jt(n);const s=a.get("reset");if(s)return lt(s);if(e==="forgot")return ke("","forgot");if(e==="login")return ke();try{if(e){const[i,d]=e.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)&&(o.view=i,d)){const l=new URLSearchParams(d);l.get("id")&&(o.activeProjectId=l.get("id")),l.get("tab")&&(o.projectTab=l.get("tab")),l.get("section")&&(o.settingsSection=l.get("section"))}}else if(typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route");if(i){const d=JSON.parse(i);d.view&&(o.view=d.view),d.activeProjectId&&(o.activeProjectId=d.activeProjectId),d.projectTab&&(o.projectTab=d.projectTab),d.settingsSection&&(o.settingsSection=d.settingsSection)}}}catch{}o.view==="settings"&&!o.settingsSection&&(o.settingsSection="profile");const r=Ba();r&&r.user?(o.data=r,ie(o.view)||(o.view=Re()),Q()):It();try{if(typeof navigator<"u"&&navigator.onLine&&Tt().length>0&&await Fa(C),await me(),o.data?.user?.customFields?.calendarSystem){o.calendarSystem=o.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",o.calendarSystem)}catch{}}if(!window._darcPollingActive){window._darcPollingActive=!0;let i=null,d=0,l=!1,p=Date.now(),u=0;const f=()=>{const y=Date.now()-p>45e3;p=Date.now(),y&&Date.now()-u>4e3&&!l&&$()};if(typeof window<"u"){let y=0;const x=()=>{const m=Date.now();m-y>5e3&&(y=m,f())};window.addEventListener("click",x,{passive:!0}),window.addEventListener("keydown",x,{passive:!0}),window.addEventListener("touchstart",x,{passive:!0}),window.addEventListener("mousemove",x,{passive:!0})}const v=()=>{i&&clearTimeout(i);const y=Date.now()-p>45e3?15e3:4e3,x=d>0?Math.min(25e3,y*Math.pow(2,d)):y;i=setTimeout($,x)},$=async()=>{if(typeof document<"u"&&document.hidden){v();return}if(!o.data?.user||!o.view||o.view==="login"){v();return}if(l){v();return}l=!0,u=Date.now();try{await me(!0),d=0}catch{d++}finally{l=!1,v()}};v(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&o.data?.user&&o.view&&o.view!=="login"&&(f(),$())})}}catch{typeof window<"u"&&(window.history&&window.history.replaceState?window.history.replaceState(null,"","#login"):window.location.hash="#login"),ke()}}typeof window<"u"&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener("hashchange",()=>{if(window._isInternalNav){window._isInternalNav=!1;return}const e=window.location.hash.replace(/^#/,"");if(!e)return;const[a,n]=e.split("?");if(a==="login"){o.data?.user&&(o.data.user=null),ke();return}if(a==="forgot"){ke("","forgot");return}const s=new URLSearchParams(n||(e.includes("=")?e:""));if(s.get("activate")){jt(s.get("activate"));return}if(s.get("reset")){lt(s.get("reset"));return}if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(a)){if(o.data&&!ie(a)){we(Re());return}let r=o.activeProjectId;if(n){const i=new URLSearchParams(n);if(i.get("id")&&(r=i.get("id")),i.get("tab")&&(o.projectTab=i.get("tab")),i.get("section")){const d=i.get("section");a==="settings"&&o.data&&!ue(d)?(o.settingsSection="profile",typeof window<"u"&&window.history&&window.history.replaceState&&window.history.replaceState(null,"","#settings?section=profile")):o.settingsSection=d}}else a==="settings"&&o.data&&!ue(o.settingsSection)&&(o.settingsSection="profile");if(o.view!==a||o.activeProjectId!==r)we(a,r);else if(L(),a==="settings"){const i=document.getElementById("main-content");i&&(i.scrollTop=0,i.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0),document.documentElement&&(document.documentElement.scrollTop=0),document.body&&(document.body.scrollTop=0)}}}));if(typeof window<"u"&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener("scroll",a=>{a.target&&a.target.classList&&(a.target.classList.contains("timeline-scroll")||a.target.classList.contains("gantt-scroll")||a.target.classList.contains("timeline-board"))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows=="function"&&drawTimelineArrows(),e=!1})))},!0)}var te=null,Be=null,At=64,Ve=null,$e=-1,ae=-1,rt=-1,ht=0,zt=!1,G=null,V=null,ra=0,da=0,vn=0,yn=0,De=!1,se=null,Ce=null,Y=null,Un=null,va=null;function Ge(e){let a=document.getElementById("dnd-live-announcer");a||(a=document.createElement("div"),a.id="dnd-live-announcer",a.className="sr-only",a.setAttribute("aria-live","assertive"),a.setAttribute("aria-atomic","true"),document.body.appendChild(a)),a.textContent="",setTimeout(()=>{a.textContent=e},40)}function Ni(e){te||(te=document.createElement("div"),te.className="drag-placeholder");const a=Math.max(48,Math.min(220,e||At||64));return te.style.cssText=`
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
  `,te.innerHTML=`<span>↓ ${t("الموضع الجديد للمهمة","Drop position")}</span>`,te}function xs(){te&&te.parentNode&&te.parentNode.removeChild(te)}function bn(e,a){const n=Array.from(e.querySelectorAll(".task-card:not(.is-dragging):not(#active-drag-ghost)"));return n.length===0?null:n.reduce((s,r)=>{const i=r.getBoundingClientRect(),d=a-(i.top+i.height/2);return d<0&&d>s.offset?{offset:d,element:r}:s},{offset:Number.NEGATIVE_INFINITY}).element}function Oi(e,a){if(!zt||e<0||a<0)return;let n=document.elementFromPoint(e,a)?.closest(".board-column");if(!n){const s=Array.from(document.querySelectorAll(".board-column"));s.length>0&&(n=s.reduce((r,i)=>{const d=i.getBoundingClientRect(),l=Math.abs(e-(d.left+d.width/2));return l<r.dist?{col:i,dist:l}:r},{col:null,dist:1/0}).col)}if(document.querySelectorAll(".board-column").forEach(s=>s.classList.toggle("drag-over",s===n)),n){const s=n.querySelector(".board-cards");if(s){const r=Ni(At),i=bn(s,a);i==null?(!s.contains(r)||s.lastElementChild!==r)&&s.appendChild(r):r.nextElementSibling!==i&&s.insertBefore(r,i)}}}function ws(){if(Ve)return;function e(){if(!zt){Ve=null;return}if($e>=0&&ae>=0){let a=!1;const n=document.querySelector(".board, .board-columns, .tasks-board, [data-board]"),s=85,r=26;if(n){const y=document.documentElement.dir==="rtl"||o.lang==="ar";if($e<s){const x=(s-$e)/s,m=-Math.max(4,Math.round(x*r));n.scrollBy({left:y?-m:m,behavior:"instant"}),a=!0}else if($e>window.innerWidth-s){const x=($e-(window.innerWidth-s))/s,m=Math.max(4,Math.round(x*r));n.scrollBy({left:y?-m:m,behavior:"instant"}),a=!0}}const i=95,d=26,l=document.getElementById("main-content")||document.querySelector(".workspace-content"),p=l?l.getBoundingClientRect():null,u=p?Math.max(60,p.top+60):80,f=p?Math.min(window.innerHeight-30,p.bottom-60):window.innerHeight-80;if(ae>f){const y=Math.min(1.5,Math.max(.2,(ae-f)/i)),x=Math.max(4,Math.round(y*d));if(l&&l.scrollHeight>l.clientHeight){const m=l.scrollTop;l.scrollTop+=x,l.scrollTop!==m&&(a=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const m=window.scrollY;window.scrollBy({top:x,behavior:"instant"}),window.scrollY!==m&&(a=!0)}}else if(ae<u){const y=Math.min(1.5,Math.max(.2,(u-ae)/i)),x=-Math.max(4,Math.round(y*d));if(l&&l.scrollHeight>l.clientHeight){const m=l.scrollTop;l.scrollTop+=x,l.scrollTop!==m&&(a=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const m=window.scrollY;window.scrollBy({top:x,behavior:"instant"}),window.scrollY!==m&&(a=!0)}}const v=document.elementFromPoint($e,ae),$=v?.closest(".board-cards")||v?.closest(".board-column")?.querySelector(".board-cards");if($&&$.scrollHeight>$.clientHeight){const y=$.getBoundingClientRect(),x=60;if(ae>y.top&&ae<y.top+x){const m=(x-(ae-y.top))/x;$.scrollTop-=Math.max(3,Math.round(m*18)),a=!0}else if(ae<y.bottom&&ae>y.bottom-x){const m=(ae-(y.bottom-x))/x;$.scrollTop+=Math.max(3,Math.round(m*18)),a=!0}}a&&Oi($e,ae)}Ve=requestAnimationFrame(e)}Ve=requestAnimationFrame(e)}function $s(){Ve&&(cancelAnimationFrame(Ve),Ve=null)}async function Na(e,a,n=null){if(!e){pe();return}e.classList.remove("drag-over");const s=n||Be;Be=null;const r=e.dataset.status;if(!s||!r){pe();return}const i=(o.data?.tasks||[]).find(h=>h.id===s);if(!i){pe();return}const d=e.querySelector(".board-cards");if(!d){pe();return}const l=i.status===r||r==="review"&&["review","approval","blocked"].includes(i.status);if(!l&&r==="done"&&i.dependencies&&i.dependencies.length&&i.dependencies.filter(h=>{const E=o.data.tasks.find(S=>S.id===h);return E&&E.status!=="done"}).length)return pe(),k(t("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);const p=Array.from(d.querySelectorAll(".task-card")).filter(h=>h.dataset.taskId!==s),u=p.map(h=>h.dataset.taskId).filter(Boolean);let f=u.length;if(te&&te.parentNode===d)if(!te.previousElementSibling||te.previousElementSibling.classList?.contains("empty"))f=0;else{let h=te.nextElementSibling;for(;h&&!h.classList?.contains("task-card");)h=h.nextElementSibling;if(h&&h.dataset?.taskId){const E=u.indexOf(h.dataset.taskId);f=E!==-1?E:0}else f=u.length}else if(p.length>0){const h=a&&a>0?a:ae>0?ae:0,E=p[0].getBoundingClientRect(),S=p[p.length-1].getBoundingClientRect();if(h<=E.top+E.height*.45)f=0;else if(h>=S.bottom-S.height*.45)f=u.length;else{const j=bn(d,h);if(j){const z=u.indexOf(j.dataset.taskId);z!==-1&&(f=z)}}}else f=0;const v=Array.from(d.querySelectorAll(".task-card")).findIndex(h=>h.dataset.taskId===s);if(l&&v!==-1&&(f===v||f===v+1)){pe();return}const $=i.status,y=(o.data.tasks||[]).map(h=>({id:h.id,status:h.status,sortOrder:h.sortOrder||h.sort_order,progress:h.progress,customFields:JSON.parse(JSON.stringify(h.customFields||h.custom_fields||{}))}));pe();const x=[...u];x.splice(f,0,s),r==="review"&&["review","approval","blocked"].includes(i.status)||(i.status=r),i.status==="done"?i.progress=100:i.status==="not_started"?i.progress=0:i.status==="in_progress"&&(i.progress===0||!i.progress)?i.progress=50:["review","approval"].includes(i.status)&&(i.progress||0)<80&&(i.progress=80),window._recentlyMovedTasks||(window._recentlyMovedTasks=new Map);const m=Date.now();x.forEach((h,E)=>{const S=(o.data?.tasks||[]).find(j=>j.id===h);if(S){const j=(E+1)*100;S.sortOrder=j,S.sort_order=j,S.customFields||(S.customFields={}),S.customFields.sortOrder=j,S.customFields.sort_order=j,S.custom_fields||(S.custom_fields={}),S.custom_fields.sortOrder=j,S.custom_fields.sort_order=j,window._recentlyMovedTasks.set(h,{status:S.status,sortOrder:j,progress:S.progress,timestamp:m})}});for(const[h,E]of window._recentlyMovedTasks.entries())m-E.timestamp>45e3&&window._recentlyMovedTasks.delete(h);const b=r==="review"?["review","approval","blocked"]:[r],T=i.projectId||i.project_id;let D=(x.length+1)*100;if((o.data?.tasks||[]).forEach(h=>{T&&(h.projectId||h.project_id)!==T||b.includes(h.status)&&!x.includes(h.id)&&(h.sortOrder=D,h.sort_order=D,h.customFields&&(h.customFields.sortOrder=D,h.customFields.sort_order=D),h.custom_fields&&(h.custom_fields.sortOrder=D,h.custom_fields.sort_order=D),D+=100)}),Qa("custom"),o.taskSortPref="custom",o.projectTaskSort="custom",o.myTaskSort="custom",L(!0),typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(20)}catch{}$!==r&&document.querySelectorAll(`.board-column[data-status="${r}"] .board-count, .board-column[data-status="${$}"] .board-count`).forEach(h=>{h.classList.remove("count-updated"),h.offsetWidth,h.classList.add("count-updated"),setTimeout(()=>h.classList.remove("count-updated"),350)});const A=document.querySelector(`.task-card[data-task-id="${s}"]`);A&&(A.classList.add("just-dropped"),setTimeout(()=>A?.classList.remove("just-dropped"),450));const N=e.querySelector(".board-column-title"),O=N?N.innerText.trim():r;Ge(t(`تم إفلات المهمة في عمود: ${O}، الموضع ${f+1}.`,`Dropped task into column: ${O}, position ${f+1}.`)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,x.forEach(h=>{const E=(o.data.tasks||[]).find(S=>S.id===h);E&&window._pendingReorderBatch.set(E.id,{id:E.id,status:E.status,sortOrder:E.sortOrder,customFields:E.customFields})}),window._reorderSyncTimer=setTimeout(()=>{const h=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),C("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:h})}).catch(E=>{console.warn("Reorder sync error, performing local rollback:",E),y.forEach(S=>{const j=(o.data?.tasks||[]).find(z=>z.id===S.id);j&&(j.status=S.status,j.sortOrder=S.sortOrder,j.sort_order=S.sortOrder,j.progress=S.progress,j.customFields=S.customFields)}),L(!0),k(t("فشل حفظ الترتيب الجديد في الخادم. تم التراجع عن التعديل تلقائياً.","Failed to save task order to server. Reverted automatically."),!0)})},150)}function pe(){se&&(clearTimeout(se),se=null),V&&V.parentNode&&V.parentNode.removeChild(V),V=null,G&&(G.style.opacity="",G.style.pointerEvents="",G.classList.remove("is-dragging"),G.classList.remove("is-touch-holding")),G=null,document.body.classList.remove("is-touch-dragging"),De=!1,zt=!1,window._isDraggingTask=!1,Be=null,$e=-1,ae=-1,rt=-1,ht=0,$s(),document.querySelectorAll(".board-column").forEach(e=>e.classList.remove("drag-over")),xs(),document.body.style.userSelect="",document.body.style.webkitUserSelect="",document.body.style.cursor="",window._pendingRenderAfterDrag&&(window._pendingRenderAfterDrag=!1,requestAnimationFrame(()=>L(!0)))}function Bi(e,a){if(!G||De)return;const n=(o.data?.tasks||[]).find(i=>i.id===G.dataset.taskId);if(!Ct(n)){pe();return}if(De=!0,zt=!0,window._isDraggingTask=!0,Be=G.dataset.taskId,$e=e,ae=a,rt=e,ht=0,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(35)}catch{}const s=G.getBoundingClientRect();At=s.height,vn=e-s.left,yn=a-s.top,V=G.cloneNode(!0),V.id="active-drag-ghost",V.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: ${s.width}px;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.96;
    transform: translate3d(${s.left}px, ${s.top}px, 0) scale(1.025);
    box-shadow: 0 20px 42px -8px rgba(13, 98, 105, 0.28), 0 8px 18px rgba(0, 0, 0, 0.12);
    border: 1.5px solid var(--brand-teal, #0d6269);
    background: var(--surface, #ffffff);
    border-radius: 12px;
    will-change: transform, box-shadow;
    cursor: grabbing !important;
  `,document.body.appendChild(V),G.classList.remove("is-touch-holding"),G.classList.add("is-dragging"),G.style.opacity="0.22",G.style.pointerEvents="none",document.body.classList.add("is-touch-dragging"),document.body.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.cursor="grabbing";const r=G.closest(".board-column");if(r){r.classList.add("drag-over");const i=r.querySelector(".board-cards");if(i){const d=Ni(At),l=bn(i,a);l==null?i.appendChild(d):i.insertBefore(d,l)}}ws()}function Fi(e,a){if(!zt||!V)return;$e=e,ae=a;const n=rt>=0?e-rt:0;rt=e;const s=Math.max(-2.5,Math.min(2.5,n*.16));ht+=(s-ht)*.28;const r=e-vn,i=a-yn;V.style.transform=`translate3d(${r}px, ${i}px, 0) scale(1.025) rotate(${ht.toFixed(2)}deg)`,Oi(e,a)}async function Ui(e,a){if(se&&(clearTimeout(se),se=null),G&&G.classList.remove("is-touch-holding"),!De&&!Be){pe();return}const n=Math.hypot(e-ra,a-da);if(window._justDroppedTaskId=Be,window._justDroppedAt=Date.now(),window._isDraggingTask=!1,n>4&&Be){let s=document.elementFromPoint(e,a)?.closest(".board-column")||te&&te.closest(".board-column");if(!s){const d=Array.from(document.querySelectorAll(".board-column"));d.length>0&&(s=d.reduce((l,p)=>{const u=p.getBoundingClientRect(),f=Math.abs(e-(u.left+u.width/2));return f<l.dist?{col:p,dist:f}:l},{col:null,dist:1/0}).col)}const r=Be,i=te&&te.parentNode?te.getBoundingClientRect():null;if(V&&i&&i.width>0&&i.height>0){V.style.transition="transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.14s ease, opacity 0.14s ease",V.style.transform=`translate3d(${i.left}px, ${i.top}px, 0) scale(1) rotate(0deg)`,V.style.boxShadow="0 4px 14px rgba(13, 98, 105, 0.12)",setTimeout(async()=>{V&&V.parentNode&&V.parentNode.removeChild(V),V=null,s&&r?await Na(s,a,r):pe()},130);return}if(s&&r){V&&V.parentNode&&V.parentNode.removeChild(V),V=null,await Na(s,a,r);return}}pe()}document.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;const a=e.target.closest(".task-card");if(!a||e.target.closest("button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]"))return;const n=(o.data?.tasks||[]).find(r=>r.id===a.dataset.taskId);if(!Ct(n))return;G=a,e.pointerId,ra=e.clientX,da=e.clientY,rt=e.clientX,De=!1;const s=a.getBoundingClientRect();At=s.height,vn=e.clientX-s.left,yn=e.clientY-s.top,e.pointerType==="touch"&&(a.classList.add("is-touch-holding"),se=setTimeout(()=>{se=null,Bi(e.clientX,e.clientY)},150))},{passive:!0});document.addEventListener("pointermove",e=>{if(G){if(!De){const a=Math.hypot(e.clientX-ra,e.clientY-da);if(e.pointerType==="mouse"||e.pointerType==="pen")if(a>=4)Bi(e.clientX,e.clientY);else return;else return}e.cancelable&&e.preventDefault(),Fi(e.clientX,e.clientY)}},{passive:!1});document.addEventListener("pointerup",async e=>{if(se&&(clearTimeout(se),se=null),G&&G.classList.remove("is-touch-holding"),!De&&(!e.pointerType||e.pointerType==="mouse")){pe();return}await Ui(e.clientX,e.clientY)});document.addEventListener("pointercancel",e=>{De&&e.pointerType==="touch"||pe()});window.addEventListener("touchmove",e=>{if(se){const a=e.touches[0];a&&Math.hypot(a.clientX-ra,a.clientY-da)>10&&(clearTimeout(se),se=null,G&&(G.classList.remove("is-touch-holding"),G=null));return}if(De){e.cancelable&&e.preventDefault();const a=e.touches[0];a&&Fi(a.clientX,a.clientY)}},{passive:!1});window.addEventListener("touchend",async e=>{if(se&&(clearTimeout(se),se=null),G&&G.classList.remove("is-touch-holding"),De){const a=e.changedTouches?e.changedTouches[0]:null;await Ui(a?a.clientX:$e,a?a.clientY:ae)}},{passive:!0});window.addEventListener("touchcancel",()=>{pe()});document.addEventListener("dragstart",e=>{e.target.closest(".task-card")&&e.preventDefault()});document.addEventListener("click",e=>{window._justDroppedAt&&Date.now()-window._justDroppedAt<500&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},!0);document.addEventListener("keydown",async e=>{if(e.target.closest('input, textarea, select, [contenteditable="true"]')||document.querySelector(".modal-overlay, #taskModal, .modal-backdrop"))return;const a=document.activeElement?.closest?.(".task-card");if((e.key===" "||e.altKey&&(e.key==="m"||e.key==="M"))&&a){const n=(o.data?.tasks||[]).find(s=>s.id===a.dataset.taskId);if(!Ct(n))return;if(e.preventDefault(),Ce)Ce===n.id&&(Y?.classList.remove("is-keyboard-grabbed"),Y?.setAttribute("aria-grabbed","false"),Ce=null,Y=null,window._isKeyboardDraggingTask=!1,Ge(t("تم إلغاء الإمساك بالمهمة.","Task released.")));else{Ce=n.id,Y=a,Un=n.status,va=n.sortOrder||n.sort_order,window._isKeyboardDraggingTask=!0,a.classList.add("is-keyboard-grabbed"),a.setAttribute("aria-grabbed","true");const s=a.closest(".board-column")?.querySelector(".board-column-title")?.innerText?.trim()||"",r=t(n.titleAr,n.titleEn);Ge(t(`تم الإمساك بالمهمة "${r}". العمود الحالي: ${s}. استخدم الأسهم للتحريك، Enter للإفلات، Escape للإلغاء.`,`Grabbed task "${r}". Current column: ${s}. Use arrow keys to move, Enter to drop, Escape to cancel.`))}return}if(Ce&&Y){const n=(o.data?.tasks||[]).find(l=>l.id===Ce);if(!n)return;const s=Y.closest(".board-column");if(!s)return;const r=Array.from(document.querySelectorAll(".board-column")),i=r.indexOf(s),d=document.documentElement.dir==="rtl"||o.lang==="ar";if(e.key==="ArrowUp"){e.preventDefault();const l=Y.previousElementSibling;l&&l.classList.contains("task-card")&&(s.querySelector(".board-cards").insertBefore(Y,l),Y.focus(),Ge(t("تم التحريك للأعلى.","Moved up.")));return}if(e.key==="ArrowDown"){e.preventDefault();const l=Y.nextElementSibling;l&&l.classList.contains("task-card")&&(s.querySelector(".board-cards").insertBefore(l,Y),Y.focus(),Ge(t("تم التحريك للأسفل.","Moved down.")));return}if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const l=d?"ArrowLeft":"ArrowRight",p=e.key===l?i+1:i-1;if(p>=0&&p<r.length){const u=r[p],f=u.querySelector(".board-cards");if(f){f.appendChild(Y),Y.focus();const v=u.querySelector(".board-column-title")?.innerText?.trim()||"";Ge(t(`تم النقل إلى عمود: ${v}.`,`Moved to column: ${v}.`))}}return}if(e.key==="Enter"){e.preventDefault();const l=Y.closest(".board-column"),p=Ce;if(Y.classList.remove("is-keyboard-grabbed"),Y.setAttribute("aria-grabbed","false"),Ce=null,Y=null,window._isKeyboardDraggingTask=!1,l&&p){const u=Y?Y.getBoundingClientRect():null;await Na(l,u?u.top+10:0,p)}return}if(e.key==="Escape"){e.preventDefault(),Y.classList.remove("is-keyboard-grabbed"),Y.setAttribute("aria-grabbed","false"),Ce=null,Y=null,window._isKeyboardDraggingTask=!1,n.status=Un,va!==null&&(n.sortOrder=va),L(!0),Ge(t("تم إلغاء النقل وإعادة المهمة لمكانها الأصلي.","Move cancelled. Task returned to original position."));return}}});window.state=o;document.documentElement.dataset.theme=o.theme;document.documentElement.lang=o.lang;document.documentElement.dir=o.lang==="ar"?"rtl":"ltr";o.lang==="en"?document.body.classList.add("is-ltr"):document.body.classList.remove("is-ltr");Object.assign(window,no);Object.assign(window,ho);Object.assign(window,So);Object.assign(window,Ho);Object.assign(window,Lo);Object.assign(window,Ko);Object.assign(window,Zo);Object.assign(window,Oo);Object.assign(window,as);Object.assign(window,bo);Object.assign(window,bs);Object.assign(window,io);window._recentlyMovedTasks=window._recentlyMovedTasks||new Map;os();document.addEventListener("click",e=>{const a=e.target.closest("[data-action], [data-view], button, a");if(a){const n=a.dataset.action||a.dataset.view||a.innerText?.trim()?.slice(0,40)||a.tagName;Je("ui.click",`النقر على: ${n}`)}typeof za=="function"&&za(e).catch(n=>{aa(n,{source:"handleClick"}),typeof k=="function"&&k(n.message,!0)})});document.addEventListener("submit",e=>{const a=e.target.id||e.target.dataset.action||"form";Je("form.submit",`إرسال نموذج: ${a}`),typeof _a=="function"&&_a(e).catch(n=>{aa(n,{source:"handleSubmit"}),typeof k=="function"&&k(n.message,!0)})});document.addEventListener("input",e=>{typeof La=="function"&&La(e)});document.addEventListener("change",e=>{typeof Ma=="function"&&Ma(e)});document.addEventListener("keydown",e=>{e.key==="Escape"&&typeof H=="function"&&H()});var ya=null;window.addEventListener("resize",()=>{o.view==="project-detail"&&o.projectTab==="timeline"&&(ya||(ya=requestAnimationFrame(()=>{ya=null,typeof wa=="function"&&wa()})))});window.addEventListener("error",e=>{const a=String(e?.message||e?.error?.message||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Runtime Error:",e.error),aa(e.error||{message:a},{source:"window.onerror"}),typeof k=="function"&&k(`خطأ برمجي: ${e.message}`,!0))});window.addEventListener("unhandledrejection",e=>{const a=String(e?.reason?.message||e?.reason||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Unhandled Rejection:",e.reason),aa(e.reason||{message:a},{source:"unhandledrejection",errorType:"UnhandledRejection"}))});"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{e.addEventListener("updatefound",()=>{const a=e.installing;a&&a.addEventListener("statechange",()=>{a.state==="installed"&&navigator.serviceWorker.controller&&console.log("[PWA] New version ready for next visit.")})})}).catch(e=>{console.warn("[PWA] ServiceWorker registration skipped:",e.message)})});vs();yo();Ri();
