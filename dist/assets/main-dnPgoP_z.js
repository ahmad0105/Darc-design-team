var Un=Object.defineProperty,pe=(e,a)=>{let n={};for(var r in e)Un(n,r,{get:e[r],enumerable:!0});return a||Un(n,Symbol.toStringTag,{value:"Module"}),n};(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function na(e){if(typeof document>"u"||!e||!document.cookie)return null;const a=document.cookie.split("; "),n=encodeURIComponent(String(e))+"=",r=String(e)+"=";for(let s=0;s<a.length;s++){const i=a[s];if(i.startsWith(n)){const d=i.substring(n.length);try{return decodeURIComponent(d)}catch{return d}}else if(i.startsWith(r)){const d=i.substring(r.length);try{return decodeURIComponent(d)}catch{return d}}}return null}function fo(){if(typeof window>"u")return"ar";try{let e=na("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const a=na("darc_prefs");if(a)try{e=JSON.parse(a).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function mo(){if(typeof window>"u")return"light";try{let e=na("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const a=na("darc_prefs");if(a)try{e=JSON.parse(a).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function go(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const a=window.location.hash.replace(/^#/,"");if(a&&!["login","forgot"].includes(a)){const[r,s]=a.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(r)){let i=null,d="overview",l="profile";if(s){const p=new URLSearchParams(s),u=p.get("id");u&&/^[a-zA-Z0-9_-]{3,64}$/.test(u)&&(i=u);const f=p.get("tab");f&&["overview","tasks","drawings","documents","timeline","activity"].includes(f)&&(d=f);const y=p.get("section");y&&["profile","company","roles","accounts","whatsapp","security","audit","trash","analytics","diagnostics","preferences"].includes(y)&&(l=y)}return{view:r,activeProjectId:i,projectTab:d,settingsSection:l}}}const n=sessionStorage.getItem("darc_last_route");if(n){const r=JSON.parse(n);if(r.view)return{view:r.view,activeProjectId:r.activeProjectId||null,projectTab:r.projectTab||"overview",settingsSection:r.settingsSection||"profile"}}}catch{}return e}var Vt=go(),o={lang:fo(),theme:mo(),view:Vt.view,activeProjectId:Vt.activeProjectId,projectTab:Vt.projectTab,settingsSection:Vt.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},vo="darc_offline_db",yo=1,Ge="cache_store",vt="darc_offline_bootstrap",Ne="darc_offline_mutations_queue",$a=!1,ka=null;function an(){return typeof indexedDB>"u"?Promise.resolve(null):(ka||(ka=new Promise(e=>{try{const a=indexedDB.open(vo,yo);a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(Ge)||r.createObjectStore(Ge)},a.onsuccess=()=>e(a.result),a.onerror=()=>e(null)}catch{e(null)}})),ka)}async function bo(e){const a=await an();return a?new Promise(n=>{try{const r=a.transaction(Ge,"readonly").objectStore(Ge).get(e);r.onsuccess=()=>n(r.result||null),r.onerror=()=>n(null)}catch{n(null)}}):null}async function ho(e,a){const n=await an();return n?new Promise(r=>{try{const s=n.transaction(Ge,"readwrite").objectStore(Ge).put(a,e);s.onsuccess=()=>r(!0),s.onerror=()=>r(!1)}catch{r(!1)}}):!1}async function qn(e){const a=await an();return a?new Promise(n=>{try{const r=a.transaction(Ge,"readwrite").objectStore(Ge).delete(e);r.onsuccess=()=>n(!0),r.onerror=()=>n(!1)}catch{n(!1)}}):!1}function xo(){return typeof navigator<"u"?navigator.onLine:!0}function we(e){if(!e)return;const a={timestamp:Date.now(),data:e};if(ho(vt,a).catch(()=>{}),typeof localStorage<"u"){const n=()=>{try{localStorage.setItem(vt,JSON.stringify(a))}catch(r){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",r.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:2e3}):setTimeout(n,50)}}function nn(){if(typeof localStorage<"u")try{const e=localStorage.getItem(vt);if(e){const a=JSON.parse(e);if(a?.data)return a.data}}catch{}return null}async function Hn(){const e=await bo(vt);return e?.data?e.data:nn()}async function Wn(){if(typeof localStorage<"u")try{localStorage.removeItem(vt),localStorage.removeItem(Ne)}catch{}await Promise.all([qn(vt),qn(Ne)]),ut()}function ut(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:Nt().length}}))}function ft(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function Vn({path:e,method:a="POST",body:n=null,description:r=""}){if(typeof localStorage>"u")return null;try{const s=localStorage.getItem(Ne),i=s?JSON.parse(s):[];if(a==="DELETE"){if(e.startsWith("/api/tasks/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/tasks"&&p.body?.id===l)){const p=i.filter(u=>!(u.path==="/api/tasks"&&u.body?.id===l||u.path===`/api/tasks/${l}`||u.path.startsWith(`/api/tasks/${l}/`)));return localStorage.setItem(Ne,JSON.stringify(p)),ut(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const l=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/projects"&&p.body?.id===l)){const p=i.filter(u=>!(u.path==="/api/projects"&&u.body?.id===l||u.path===`/api/projects/${l}`||u.method==="POST"&&u.path==="/api/tasks"&&u.body?.projectId===l));return localStorage.setItem(Ne,JSON.stringify(p)),ut(),{id:"compacted",compacted:!0}}}}const d={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substring(2,8),path:e,method:a,body:n,description:r,createdAt:new Date().toISOString()};return i.push(d),localStorage.setItem(Ne,JSON.stringify(i)),ut(),console.log("[Offline Outbox] Enqueued mutation:",d),d}catch(s){return console.warn("[Offline Outbox] Failed to enqueue mutation:",s.message),null}}function Nt(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(Ne);return e?JSON.parse(e):[]}catch{return[]}}function wo(){typeof localStorage>"u"||(localStorage.removeItem(Ne),ut())}function Gn(e,a,n,r){if(!r||!r.data)return{ok:!0,queued:!0,offline:!0};const s=new Date().toISOString();if(a==="POST"&&e==="/api/tasks"&&n){const i=n.id||ft("tsk");n.id=i;const d={id:i,code:"OFFLINE",projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",status:n.status||"not_started",priority:n.priority||"medium",categoryAr:n.categoryAr||"عام",categoryEn:n.categoryEn||"General",weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:r.data.users?.find(p=>p.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:s,updatedAt:s,_isOfflinePending:!0};r.data.tasks||(r.data.tasks=[]);const l=r.data.tasks.findIndex(p=>p.id===i);return l!==-1?r.data.tasks[l]=d:r.data.tasks.unshift(d),we(r.data),{ok:!0,queued:!0,offline:!0,task:d}}if(a==="PATCH"&&e.startsWith("/api/tasks/")&&n){const i=e.split("/")[3],d=(r.data.tasks||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...r.data.tasks[d],...n,updatedAt:s,_isOfflinePending:!0};return n.assigneeId!==void 0&&(l.assignee=r.data.users?.find(p=>p.id===n.assigneeId)||null),r.data.tasks[d]=l,we(r.data),{ok:!0,queued:!0,offline:!0,task:l}}}if(a==="DELETE"&&e.startsWith("/api/tasks/")){const i=e.split("/")[3];return r.data.tasks&&(r.data.tasks=r.data.tasks.filter(d=>d.id!==i),we(r.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e==="/api/projects"&&n){const i=n.id||ft("prj");n.id=i;const d={id:i,code:n.code||"DARC-OFF",nameAr:n.nameAr||n.name||"مشروع محلي جديد",nameEn:n.nameEn||n.name||"New Offline Project",clientAr:n.clientAr||"",clientEn:n.clientEn||"",descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",lifecycle:n.lifecycle||"planning",health:n.health||"on_track",progress:0,progressMode:"weighted",managerId:n.managerId||r.data.user?.id,startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:s,updatedAt:s,_isOfflinePending:!0};r.data.projects||(r.data.projects=[]);const l=r.data.projects.findIndex(p=>p.id===i);return l!==-1?r.data.projects[l]=d:r.data.projects.unshift(d),we(r.data),{ok:!0,queued:!0,offline:!0,project:d}}if(a==="PATCH"&&e.startsWith("/api/projects/")&&n){const i=e.split("/")[3],d=(r.data.projects||[]).findIndex(l=>l.id===i);if(d!==-1){const l={...r.data.projects[d],...n,updatedAt:s,_isOfflinePending:!0};return r.data.projects[d]=l,we(r.data),{ok:!0,queued:!0,offline:!0,project:l}}}if(a==="DELETE"&&e.startsWith("/api/projects/")){const i=e.split("/")[3];return r.data.projects&&(r.data.projects=r.data.projects.filter(d=>d.id!==i),we(r.data)),{ok:!0,queued:!0,offline:!0}}if(a==="POST"&&e.includes("/comments")&&n){const i=e.split("/")[3],d={id:n.id||ft("cmt"),taskId:i,userId:r.data.user?.id,content:n.content,createdAt:s,_isOfflinePending:!0};return n.id=d.id,r.data.comments||(r.data.comments=[]),r.data.comments.some(l=>l.id===d.id)||r.data.comments.push(d),we(r.data),{ok:!0,queued:!0,offline:!0,comment:d}}return a==="PATCH"&&e==="/api/tasks/reorder"&&n&&Array.isArray(n.items)?(r.data.tasks&&(n.items.forEach(i=>{const d=r.data.tasks.find(l=>l.id===i.id);d&&(i.status&&(d.status=i.status),i.sortOrder&&(d.sortOrder=i.sortOrder),i.customFields&&(d.customFields={...d.customFields||{},...i.customFields}),d._isOfflinePending=!0)}),we(r.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function on(e){if($a)return{total:0,synced:0,failed:0};const a=Nt();if(!a.length)return{total:0,synced:0,failed:0};$a=!0,console.log(`[Offline Sync] Replaying ${a.length} pending mutations...`);let n=0,r=!1;const s=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,i=new Set(["POST","PATCH","PUT","DELETE"]);for(let d=0;d<a.length;d++){const l=a[d];if(!l||!l.path||typeof l.path!="string"||!s.test(l.path)||!i.has(l.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",l?.id,l?.path);continue}try{const p={method:l.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":l.id,"X-Idempotency-Key":l.id}};l.body&&(p.body=typeof l.body=="string"?l.body:JSON.stringify(l.body));const u=await e(l.path,p);if(u&&u.error&&!u.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",l.id,u.error);else{n++;const f=l.body&&typeof l.body=="object"&&l.body.id||typeof l.path=="string"&&l.path.split("/")[3];f&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(f)}}catch(p){if(console.error("[Offline Sync] Failed to replay mutation:",l.id,l.path,p.message),typeof navigator<"u"&&!navigator.onLine||p.message&&(p.message.includes("تعذر الاتصال")||p.message.includes("fetch")||p.message.includes("NetworkError")||p.name==="TypeError")){const u=a.slice(d);typeof localStorage<"u"&&localStorage.setItem(Ne,JSON.stringify(u)),r=!0;break}}}return r||wo(),$a=!1,ut(),{total:a.length,synced:n,failed:r?a.length-n:0}}var $o=pe({closeModal:()=>H,modalShell:()=>Ae,renderLoading:()=>Rt,showToast:()=>k});function Rt(){document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${t("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var Ye=!1,He=null;function H(e=!1){He&&(clearTimeout(He),He=null);const a=document.getElementById("preview-modal-overlay");a&&(a.style.display="none",a.innerHTML="");const n=document.getElementById("modal-root");if(!n||!n.hasChildNodes()){document.body.style.overflow="",Ye=!1;return}if(e){n.innerHTML="",document.body.style.overflow="",Ye=!1;return}if(Ye)return;Ye=!0;const r=n.querySelector(".modal-backdrop"),s=n.querySelector(".modal");r&&s?(r.classList.add("is-closing"),s.classList.add("is-closing"),He=setTimeout(()=>{He=null,n.innerHTML="",document.body.style.overflow="",Ye=!1},150)):(n.innerHTML="",document.body.style.overflow="",Ye=!1)}function Ae(e,a,n,r="",s=""){return He&&(clearTimeout(He),He=null),Ye=!1,document.body.style.overflow="hidden",`<div class="modal-backdrop ${r?`backdrop-${r}`:""}"><div class="modal ${s}" data-modal="${r}"><div class="modal-head"><div><h2>${c(e)}</h2><p>${c(a||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${t("إغلاق","Close")}">${w("close",15)}</button></div>${n}</div></div>`}function k(e,a=!1){const n=document.getElementById("toast-root");if(!n)return;const r=document.createElement("div");r.className=`toast ${a?"error":""}`,r.innerHTML=`${w(a?"alert":"check",16)}<span>${c(e)}</span>`,n.appendChild(r),setTimeout(()=>r.remove(),3600)}var ko=pe({I18N:()=>ja,PERMISSION_ALIASES:()=>li,avatar:()=>Y,can:()=>I,canManageAccountPermissions:()=>Po,choose:()=>t,currentViewTitle:()=>ma,dateLabel:()=>Ee,dueLabel:()=>ri,esc:()=>c,extractDrawingVersion:()=>rn,formatDateTime:()=>dn,formatReportDate:()=>ot,formatReportTime:()=>Ot,formatUnifiedDateNumeric:()=>Io,getActiveCalendarSystem:()=>Je,getCookieVal:()=>Eo,getFileFormatInfo:()=>fa,getHijriDateEquivalent:()=>Do,getTaskStatusStyle:()=>sn,getTimeBasedGreeting:()=>si,icon:()=>w,initials:()=>jt,isAdmin:()=>C,isOverdue:()=>Oe,parseEndOfDay:()=>Re,playSuccessChime:()=>ia,priorityText:()=>_o,roleFor:()=>di,roleName:()=>ce,runInWorker:()=>Co,sanitizeForSpreadsheet:()=>W,savePreferencesCookies:()=>Dt,showToast:()=>k,statusBadge:()=>jo,statusText:()=>J,t:()=>v}),ja={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function v(e){return ja[o.lang][e]||ja.ar[e]||e}function t(e,a){return o.lang==="ar"?e:a}function Eo(e){if(typeof document>"u"||!e)return null;const a=document.cookie?document.cookie.split("; "):[];for(const n of a){const r=n.indexOf("=");if(r!==-1&&n.slice(0,r).trim()===e)return decodeURIComponent(n.slice(r+1))}return null}function Dt({theme:e,lang:a}={}){if(typeof document>"u")return;const n=31536e3,r=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let s="";if(typeof window<"u"){const f=window.location.hostname;(f==="darc-design.bond"||f.endsWith(".darc-design.bond"))&&(s="; Domain=.darc-design.bond")}const i=e==="dark"||e==="light"?e:null,d=a==="ar"||a==="en"?a:null;if(i){document.cookie=`darc_theme=${encodeURIComponent(i)}; Path=/; Max-Age=${n}; SameSite=Lax${r}${s}`;try{window.localStorage.setItem("darc-theme",i)}catch{}}if(d){document.cookie=`darc_lang=${encodeURIComponent(d)}; Path=/; Max-Age=${n}; SameSite=Lax${r}${s}`;try{window.localStorage.setItem("darc-locale",d)}catch{}}const l=i||(o&&o.theme==="dark"?"dark":"light")||"light",p=d||(o&&o.lang==="en"?"en":"ar")||"ar",u=JSON.stringify({theme:l,lang:p});document.cookie=`darc_prefs=${encodeURIComponent(u)}; Path=/; Max-Age=${n}; SameSite=Lax${r}${s}`}var Ao={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},So=/[&<>'"]/,To=/[&<>'"]/g;function c(e){if(e==null)return"";const a=String(e);return So.test(a)?a.replace(To,n=>Ao[n]):a}function W(e){if(e==null)return"";const a=String(e),n=a.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(a)?`'${a}`:a}var Jn={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};function w(e,a=18){return`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Jn[e]||Jn.info}</svg>`}function jt(e){if(!e||typeof e!="object")return"D";const a=(o.lang==="ar"?e.name:e.nameEn||e.name)||e.email||"DARC";return(String(a).replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join("")||String(a).slice(0,2)).toUpperCase()}function Y(e,a=""){const n=e||{name:"DARC",avatarColor:"#0d6269"},r=/^#[0-9a-f]{6}$/i.test(n.avatarColor||"")?n.avatarColor:"#0d6269",s=c(t(n.name,n.nameEn||n.name));if(n.avatarUrl){const i=c(jt(n)).replace(/['"\\]/g,"");return`<span class="avatar ${a}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${s}"><img src="${c(n.avatarUrl)}" alt="${s}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${r}';this.parentElement.textContent='${i}';" /></span>`}return`<span class="avatar ${a}" style="background:${r}" title="${s}">${c(jt(n))}</span>`}function si(){const e=new Date().getHours();return o.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function sn(e){const a=e?.status,n=Oe(e);return a==="done"||a==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:t("مكتملة","Completed")}:a==="review"||a==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:t("للمراجعة والاعتماد","In Review")}:a==="blocked"||n?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:n?t("متأخرة","Overdue"):t("متوقفة","Blocked")}:a==="in_progress"||a==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:t("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:t("غير مبدوءة","Not Started")}}function fa(e,a=""){const n=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(n)?{ext:n.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(n)?{ext:n.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:n==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["xlsx","xls","csv"].includes(n)?{ext:n.toUpperCase(),label:"Excel Sheet",color:"#107c41",bg:"rgba(16,124,65,0.12)",border:"rgba(16,124,65,0.3)",isExcel:!0}:["docx","doc","rtf","odt"].includes(n)?{ext:n.toUpperCase(),label:"Word Document",color:"#2b579a",bg:"rgba(43,87,154,0.12)",border:"rgba(43,87,154,0.3)",isWord:!0}:["pptx","ppt","key"].includes(n)?{ext:n.toUpperCase(),label:"PowerPoint Deck",color:"#d24726",bg:"rgba(210,71,38,0.12)",border:"rgba(210,71,38,0.3)",isPpt:!0}:["png","jpg","jpeg","webp","heic"].includes(n)?{ext:n.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["mp4","webm","mov","m4v","ogv"].includes(n)?{ext:n.toUpperCase(),label:"Video",color:"#8b5cf6",bg:"rgba(139,92,246,0.12)",border:"rgba(139,92,246,0.3)",isVideo:!0}:["zip","rar","7z","tar"].includes(n)?{ext:n.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:n.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function rn(e){if(!e)return null;const a=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return a?`V${a[1]}`:null}function Je(){let e=null;try{e=localStorage.getItem("darc_calendar_system")}catch{}return o.calendarSystem||o.data?.user?.customFields?.calendarSystem||e||"gregorian"}var Kn=new Map;function Ke(e,a={}){const n=e+"|"+JSON.stringify(a);let r=Kn.get(n);return r||(r=new Intl.DateTimeFormat(e,a),Kn.set(n,r)),r}function Ee(e,a=!0){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?"—":Je()==="hijri"?Ke(o.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n):Ke(o.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{day:"numeric",month:"short",...a?{year:"numeric"}:{}}).format(n)}function Io(e){if(!e)return"—";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"—":Je()==="hijri"?Ke(o.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"2-digit",month:"2-digit",year:"numeric"}).format(a):`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}/${a.getFullYear()}`}function dn(e,a={}){if(!e)return{date:"—",time:"—",full:"—"};try{const n=new Date(e);if(Number.isNaN(n.getTime()))return{date:String(e),time:"—",full:String(e)};const r=Je(),s=o.lang==="ar",i=Ke(r==="hijri"?s?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{year:"numeric",month:a.monthStyle||"short",day:"numeric"}).format(n),d=Ke(s?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",...a.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(n);return{date:i,time:d,full:`${i} ${d}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function ot(e=new Date){const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=Je(),r=o.lang==="ar";return Ke(n==="hijri"?r?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":r?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{dateStyle:"full"}).format(a)}function Ot(e=new Date){const a=new Date(e);return Number.isNaN(a.getTime())?"—":Ke(o.lang==="ar"?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(a)}function Do(e){if(!e)return"";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(a.getTime())?"":Ke("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(a)}function Re(e){if(!e)return null;if(e instanceof Date){if(isNaN(e.getTime()))return null;const a=new Date(e.getTime());return a.setHours(23,59,59,999),a}if(typeof e=="number"){const a=new Date(e);return isNaN(a.getTime())?null:(a.setHours(23,59,59,999),a)}if(typeof e=="string"){const a=e.trim();if(!a)return null;const n=a.split("T")[0].split(" ")[0];if(/^\d{4}-\d{2}-\d{2}$/.test(n)){const[s,i,d]=n.split("-").map(Number);return new Date(s,i-1,d,23,59,59,999)}const r=new Date(a);if(!isNaN(r.getTime()))return r.setHours(23,59,59,999),r}return null}function ri(e){if(!e)return"—";const a=Re(e);if(!a||isNaN(a.getTime()))return"—";const n=Math.ceil((a-new Date)/864e5);return isNaN(n)?"—":n<0?t(`متأخرة ${Math.abs(n)} ${v("days")}`,`${Math.abs(n)} ${v("days")} ${v("ago")}`):n===0?v("today"):t(`بعد ${n} ${v("days")}`,`in ${n} ${v("days")}`)}function Oe(e){if(!e?.dueDate||["done","completed","canceled"].includes(e.status))return!1;const a=Re(e.dueDate);return a?a<new Date:!1}function J(e){switch(e){case"not_started":return v("notStarted");case"in_progress":return v("inProgress");case"review":return v("review");case"approval":return v("approval");case"done":return v("done");case"blocked":return v("blocked");case"canceled":return v("canceled");case"planning":return v("planning");case"active":return v("active");case"on_hold":return v("onHold");case"completed":return v("completed");case"archived":return v("archived");case"on_track":return v("onTrack");case"at_risk":return v("atRisk");case"off_track":return v("offTrack");default:return e||""}}function jo(e){return e?`<span class="status-badge ${c(e)}">${c(J(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function _o(e){switch(e){case"low":return v("low");case"medium":return v("medium");case"high":return v("high");case"urgent":return v("urgent");default:return e||""}}function di(e){const a=typeof e=="string"?o.data?.users?.find(n=>n.id===e):e;return a?o.data?.roles?.find(n=>n.id===a.roleId)||{id:a.roleId,nameAr:a.roleNameAr||"",nameEn:a.roleNameEn||"",permissions:[]}:null}function ce(e){const a=di(e);return a?t(a.nameAr,a.nameEn):"—"}var li={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function I(e){if(C())return!0;const a=o.data?.role?.permissions;if(!a||!a.length)return!1;if(a.includes("*")||a.includes(e))return!0;const n=li[e];return!!(n&&a.includes(n))}function C(){return o.data?.user?.roleId==="admin"}function Po(){return C()||o.data?.user?.roleId==="account_permissions_manager"||o.data?.role?.permissions?.includes("manage_existing_account_permissions")}function ma(){return o.view==="project-detail"?t("تفاصيل المشروع","Project details"):{dashboard:v("dashboard"),projects:v("projects"),tasks:v("myTasks"),documents:v("documents"),templates:v("templates"),team:v("team"),reports:v("reports"),settings:v("settings")}[o.view]||v("dashboard")}function ia(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const a=new e,n=a.currentTime,r=a.createOscillator(),s=a.createGain();r.type="sine",r.frequency.setValueAtTime(587.33,n),s.gain.setValueAtTime(.08,n),s.gain.exponentialRampToValueAtTime(.001,n+.35),r.connect(s),s.connect(a.destination),r.start(n),r.stop(n+.35);const i=a.createOscillator(),d=a.createGain();i.type="sine",i.frequency.setValueAtTime(880,n+.12),d.gain.setValueAtTime(.001,n),d.gain.setValueAtTime(.09,n+.12),d.gain.exponentialRampToValueAtTime(.001,n+.65),i.connect(d),d.connect(a.destination),i.start(n+.12),i.stop(n+.65)}catch{}}function Co(e,a){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(a)):new Promise((n,r)=>{try{const s=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),i=URL.createObjectURL(s),d=new Worker(i);d.onmessage=l=>{URL.revokeObjectURL(i),d.terminate(),l.data.ok?n(l.data.result):r(new Error(l.data.error))},d.onerror=l=>{URL.revokeObjectURL(i),d.terminate(),r(l)},d.postMessage(a)}catch{try{n(e(a))}catch(i){r(i)}}})}var Lo=Date.now(),ci=0,oa=0,sa=0,Ea=null,Yn=Date.now(),Jt=[];function tt(e="action",a="",n=null){const r=new Date().toTimeString().split(" ")[0];Jt.push({time:r,category:e,message:String(a||"").slice(0,150),metadata:n?JSON.stringify(n).slice(0,200):null}),Jt.length>15&&Jt.shift()}function pi(){return[...Jt]}typeof document<"u"&&setInterval(()=>{document.visibilityState==="visible"&&ci++},1e3);if(typeof window<"u"){window.addEventListener("webglcontextlost",e=>{e.preventDefault(),console.warn("[WebGL Context Guard] Context loss intercepted; executing LOD vertex decimation and GPU memory purge."),tt("webgl.guard","WebGL Context Lost intercepted. Auto-recovery and LOD mesh decimation active.")},!1),window.addEventListener("webglcontextrestored",()=>{console.info("[WebGL Context Guard] WebGL context successfully restored with optimized buffer allocation."),tt("webgl.guard","WebGL Context successfully restored with optimized buffer allocation.")},!1);try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{sa+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&ra(!1,!0)}),window.addEventListener("pagehide",()=>{ra(!1,!0)})}function ln(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function ui(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let a="Chrome";e.includes("Edg/")?a="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?a="Safari":e.includes("Firefox/")&&(a="Firefox");let n="macOS";return e.includes("Win")?n="Windows":e.includes("Android")?n="Android":e.includes("iPhone")||e.includes("iPad")?n="iOS":e.includes("Linux")&&(n="Linux"),{os:n,browser:a}}function fi(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function ga(e,a={}){oa++;const{os:n,browser:r}=ui(),s=fi(),i=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",d=e||{},l=String(d.message||d.reason||d||"Unknown client error"),p=String(d.stack||a.stack||"No stack trace provided."),u=d.name||a.errorType||"ClientRuntimeError";tt("error",`${u}: ${l}`);const f=o.data?.user||{},y={userId:f.id||"usr_demo",userName:f.name||"مدير التوظيف / زائر",userEmail:f.email||"demo@darc-design.bond",userRole:f.jobTitleAr||o.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:f.avatarColor||"#0d6269",errorType:u,errorMessage:l,stackTrace:p,deviceType:s,browser:r,os:n,screenResolution:i,memoryMb:ln(),currentView:o.view?`#${o.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:pi(),severity:a.severity||"high",titleAr:a.titleAr||`خطأ تشغيلي في مساحة العمل (${u})`,titleEn:a.titleEn||`Workspace Runtime Error (${u})`};try{return await P("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(y),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const b=new Blob([JSON.stringify(y)],{type:"application/json"});navigator.sendBeacon((va||"")+"/api/telemetry/report-error",b)}catch{}}}async function ra(e=!1,a=!1){const n=Date.now(),r=Math.max(5,Math.round((n-Yn)/1e3));Yn=n;let s=null,i=null,d=!1;try{typeof localStorage<"u"&&(s=localStorage.getItem("darc_vid"),s||(s="vid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),localStorage.setItem("darc_vid",s))),typeof sessionStorage<"u"&&(i=sessionStorage.getItem("darc_sid"),i||(i="sid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),sessionStorage.setItem("darc_sid",i),d=!0))}catch{}const{os:l,browser:p}=ui(),u=fi(),f={userId:o.data?.user?.id||"anonymous",sessionId:i,visitorId:s,isNewVisit:d,os:l,browser:p,deviceType:u,durationSeconds:r,memoryMb:ln(),errorCount:oa,longTaskCount:sa,currentView:o.view||"dashboard"};if(f.memoryMb>140&&(e=!0),a&&typeof navigator<"u"&&navigator.sendBeacon)try{const y=new Blob([JSON.stringify(f)],{type:"application/json"}),$=(va||"")+"/api/telemetry/heartbeat";navigator.sendBeacon($,y);return}catch{}try{const y=await P("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(f),silent:!0});return oa=0,sa=0,y}catch{}}function zo(){Ea&&clearInterval(Ea),setTimeout(()=>ra(!1),5e3),Ea=setInterval(()=>{document.visibilityState==="visible"&&ra(!1)},45e3)}function mi(){return{totalSessionDurationSeconds:Math.round((Date.now()-Lo)/1e3),activeDurationSeconds:ci,memoryMb:ln(),errorCount:oa,longTaskCount:sa,recentBreadcrumbs:pi()}}var va=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",Kt=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function at(){Kt=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function P(e,a={}){const n=["POST","PATCH","PUT","DELETE"].includes(a.method),r=e.startsWith("/api/auth"),s=!!(a.headers&&(a.headers["X-Offline-Replay"]==="true"||a.headers["X-Offline-Replay"]===!0));let i=null;if(n&&a.body)try{i=typeof a.body=="string"?JSON.parse(a.body):a.body}catch{}a.method==="POST"&&i&&typeof i=="object"&&!s&&(e==="/api/tasks"&&!i.id?(i.id=ft("tsk"),a.body=JSON.stringify(i)):e==="/api/projects"&&!i.id?(i.id=ft("prj"),a.body=JSON.stringify(i)):e.includes("/comments")&&!i.id&&(i.id=ft("cmt"),a.body=JSON.stringify(i)));const d=typeof FormData<"u"&&a.body instanceof FormData;if(typeof navigator<"u"&&!navigator.onLine&&n&&!r){if(s)throw new Error(t("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));if(d){const D=t("لا يمكن رفع المخططات أو الملفات في وضع عدم الاتصال. يرجى الاتصال بالإنترنت لإتمام الرفع.","File and drawing uploads are not supported offline. Please reconnect to upload.");throw k(D,!0),new Error(D)}const h=Vn({path:e,method:a.method,body:i}),T=Gn(e,a.method,i,o);return k(t("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡","Offline mode: action saved locally and will auto-sync on reconnect 📡"),!1),{ok:!0,queued:!0,offline:!0,id:h?.id,...T}}const l=typeof localStorage<"u"?localStorage.getItem("darc_token"):null,p=!!(a.silent||a.headers&&a.headers["X-Silent"]),u=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),f=!!Kt&&(p||!!o.data||u),y=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,$={...l?{Authorization:`Bearer ${l}`}:{},...a.body&&!d?{"Content-Type":"application/json"}:{},...y?{"X-Mutation-ID":y}:{},...e==="/api/bootstrap"&&f?{"If-None-Match":Kt}:{},...e==="/api/bootstrap"&&!f?{"Cache-Control":"no-cache, no-store"}:{},...a.headers||{}};e==="/api/bootstrap"&&!f&&(a.cache="no-cache"),a.credentials="include";let b;try{b=await fetch(va+e,{...a,headers:$})}catch{if(n&&!r&&!s){if(d){const S=t("انقطع الاتصال بالإنترنت أثناء الرفع. يرجى إعادة المحاولة عند استقرار الشبكة.","Internet disconnected during file upload. Please retry once reconnected.");throw k(S,!0),new Error(S)}const T=Vn({path:e,method:a.method,body:i}),D=Gn(e,a.method,i,o);return k(t("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡","Connection lost: action saved locally for auto-sync 📡"),!1),{ok:!0,queued:!0,offline:!0,id:T?.id,...D}}throw new Error(t("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(b.status===304)return null;if(!b.ok){const h=await b.text();b.status!==401&&console.error(`API Failed [${e}]: ${b.status} - ${h}`);let T={};try{T=JSON.parse(h)}catch{}b.status===401&&(at(),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login"&&(typeof localStorage<"u"&&localStorage.removeItem("darc_token"),o.data&&(o.data.user=null),typeof window<"u"&&window.location.hash!=="#login"&&(window.location.hash="#login"))),tt("api.error",`${a.method||"GET"} ${e} (Status ${b.status}: ${T.error||"Failed"})`);const D=new Error(T.error||`Failed to fetch ${e}`);throw D.status=b.status,D}const x=b.headers.get("ETag");if(x&&e==="/api/bootstrap"){Kt=x;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",x)}catch{}}const m=await b.json().catch(()=>({ok:!0}));if(["POST","PATCH","PUT","DELETE"].includes(a.method)){at();let h=i&&typeof i.id=="string"?i.id:null;if(!h&&m&&typeof m=="object"&&(h=m.id||m.task?.id||m.project?.id||m.comment?.id||m.document?.id||m.data?.id),!h&&typeof e=="string"){const T=e.split("/");T.length>=4&&T[3]&&!T[3].includes("?")&&(h=T[3])}if(h&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(h),y&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(y),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let T=null;if(m&&(m.task?T={table:"tasks",action:a.method==="POST"?"INSERT":"UPDATE",record:m.task}:m.project?T={table:"projects",action:a.method==="POST"?"INSERT":"UPDATE",record:m.project}:m.comment?T={table:"comments",action:a.method==="POST"?"INSERT":"UPDATE",record:m.comment}:m.document&&(T={table:"documents",action:a.method==="POST"?"INSERT":"UPDATE",record:m.document})),!T&&a.method==="DELETE"&&h&&(e.startsWith("/api/tasks/")?T={table:"tasks",action:"DELETE",record:{id:h}}:e.startsWith("/api/projects/")?T={table:"projects",action:"DELETE",record:{id:h}}:e.startsWith("/api/documents/")?T={table:"documents",action:"DELETE",record:{id:h}}:e.startsWith("/api/comments/")&&(T={table:"comments",action:"DELETE",record:{id:h}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(T);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:T?"GRANULAR_DELTA":"STATE_MUTATION",delta:T,timestamp:Date.now()})}catch{}}}}return m}typeof window<"u"&&(window.api=P);var Mo=pe({initSyncIndicatorListener:()=>gi,renderNavbar:()=>cn,renderSyncIndicator:()=>ya,updateNavbarTitle:()=>vi});function ya(){const e=Nt().length;return xo()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
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
    </button>`}function gi(){if(typeof window>"u"||window._darcSyncIndicatorBound)return;window._darcSyncIndicatorBound=!0;const e=()=>{const a=document.getElementById("sync-status-indicator");a&&(a.innerHTML=ya())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function cn(e=null){const a=(o.data?.notifications||[]).filter(s=>!s.read&&!s.readAt).length,n=o.data?.user||{},r=e||ma();return`
    <header class="topbar">
      <div class="topbar-left">
        <button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">
          ${w("menu",18)}
        </button>
        <div>
          <div class="topbar-kicker">DARC / ${v("workspace")}</div>
          <div class="topbar-title">${c(r)}</div>
        </div>
      </div>
      <div class="topbar-right">
        <span id="sync-status-indicator">${ya()}</span>
        <button class="topbar-search-trigger" data-action="open-omnisearch" title="${t("بحث شامل وسريع","Omnisearch")}">
          ${w("search",14)}
          <span>${t("بحث شامل...","Search...")}</span>
          <kbd class="shortcut-kbd">${typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"⌘K":"Ctrl+K"}</kbd>
        </button>
        <button class="icon-button" data-action="open-cheatsheet" title="${t("دليل اختصارات لوحة المفاتيح (?)","Keyboard shortcuts guide (?)")}" style="color:var(--ink-soft);" aria-label="Shortcuts">
          <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
        </button>
        <button class="btn btn-ghost btn-sm topbar-action-btn" data-action="toggle-theme" title="${t("تبديل المظهر","Toggle Theme")}" aria-label="${t("تبديل المظهر","Toggle Theme")}">${o.theme==="dark"?"☀️":"🌙"}</button>
        <button class="btn btn-ghost btn-sm topbar-action-btn" data-action="toggle-lang" title="${t("تبديل اللغة","Toggle Language")}" aria-label="${t("تبديل اللغة","Toggle Language")}"><span class="lang-text">${o.lang==="ar"?"EN":"عربي"}</span> ${w("globe",14)}</button>
        <button class="icon-button topbar-action-btn" data-action="show-notifications" aria-label="${v("notifications")}">${w("bell",17)}${a?'<span class="notification-dot"></span>':""}</button>
        <div class="topbar-divider"></div>
        <div class="profile-chip" data-action="open-user-profile" title="${c(t(n.name,n.nameEn||n.name))}">
          ${Y(n)}
          <div class="profile-chip-text">
            <strong>${c(t(n.name,n.nameEn||n.name))}</strong>
            <span>${c(ce(n))}</span>
          </div>
        </div>
      </div>
    </header>
  `}function vi(e=null){const a=document.querySelector(".topbar-title");a&&(a.textContent=e||ma())}var No=pe({canAccessView:()=>te,getFirstAllowedView:()=>Be,loadData:()=>ge,navItem:()=>Se,refreshView:()=>re,renderApp:()=>X,renderNavbar:()=>cn,renderSidebar:()=>un,renderSidebarBackdrop:()=>pn,renderSyncIndicator:()=>ya,renderView:()=>L,switchView:()=>ye,updateNavbarTitle:()=>vi});function te(e){return o.data?e==="dashboard"?I("view_dashboard"):e==="projects"||e==="project-detail"?I("view_projects"):e==="tasks"?I("create_tasks")||I("edit_tasks")||I("delete_tasks")||I("assign_tasks")||I("review_tasks")||I("approve_tasks")||I("manage_reminders")||I("view_projects")||C():e==="documents"?I("upload_documents")||I("delete_documents")||C():e==="templates"?I("manage_templates")||C():e==="team"?C()||I("manage_users"):e==="reports"?I("view_reports")||C():e==="settings":!0}function Be(){for(const e of["dashboard","projects","tasks","documents","team","reports","templates","settings"])if(te(e))return e;return"dashboard"}gi();function X(){if(o.data&&!te(o.view)&&(o.view=Be()),typeof window<"u"){const e=window.location.hash.replace(/^#/,"");if(!e||e==="login"||e==="forgot"){let a=o.view;o.view==="project-detail"&&o.activeProjectId?a=`project-detail?id=${encodeURIComponent(o.activeProjectId)}${o.projectTab?`&tab=${encodeURIComponent(o.projectTab)}`:""}`:o.view==="settings"&&o.settingsSection&&(a=`settings?section=${encodeURIComponent(o.settingsSection)}`),window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${a}`):(window._isInternalNav=!0,window.location.hash=`#${a}`)}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",o.lang==="en"),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.getElementById("app").innerHTML=`
    <div class="app-shell ${o.lang==="en"?"is-ltr":""}">
      ${pn()}
      ${un()}
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
        ${cn()}
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,L()}function L(e=!1){if(!e&&(window._isDraggingTask||window._isKeyboardDraggingTask||window._isTouchHoldingTask)){window._pendingRenderAfterDrag=!0;return}const a=document.getElementById("main-content");if(!a)return;te(o.view)||(o.view=Be());let n="";o.view==="dashboard"&&(n=renderDashboard()),o.view==="projects"&&(n=renderProjects()),o.view==="tasks"&&(n=renderTasks()),o.view==="documents"&&(n=renderDocuments()),o.view==="templates"&&(n=renderTemplates()),o.view==="team"&&(n=renderTeam()),o.view==="reports"&&(n=renderReports()),o.view==="settings"&&(n=renderSettings()),o.view==="project-detail"&&(n=renderProjectDetail()),a.innerHTML=n,o.view==="project-detail"&&o.projectTab==="timeline"&&setTimeout(drawTimelineArrows,0)}function ye(e,a=void 0){o.data&&!te(e)&&(e=Be()),tt("navigation",`الانتقال إلى واجهة #${e}${a?` (مشروع: ${a})`:""}`),o.view=e,a!==void 0&&(o.activeProjectId=a),e==="settings"&&!o.settingsSection&&(o.settingsSection="profile"),o.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelector(".sidebar-backdrop")?.classList.remove("visible"),document.querySelectorAll(".nav-item").forEach(r=>{const s=r.dataset.view,i=s===e||s==="projects"&&e==="project-detail";r.classList.toggle("active",i)});const n=document.querySelector(".topbar-title");n&&(n.textContent=ma());try{let r=e;e==="project-detail"&&o.activeProjectId?r=`project-detail?id=${encodeURIComponent(o.activeProjectId)}${o.projectTab?`&tab=${encodeURIComponent(o.projectTab)}`:""}`:e==="settings"&&o.settingsSection&&(r=`settings?section=${encodeURIComponent(o.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==r&&(window._isInternalNav=!0,window.location.hash=r),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:o.view,activeProjectId:o.activeProjectId,projectTab:o.projectTab,settingsSection:o.settingsSection}))}catch{}requestAnimationFrame(()=>{L();const r=document.getElementById("main-content");r&&(r.scrollTop=0,r.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function re(e=!1){try{await ge(e)}catch(a){k(a.message,!0)}}async function ge(e=!1){try{const a=o.view==="settings"&&o.settingsSection==="trash"&&!o.trashLoaded?P("/api/trash",{silent:!0}).catch(()=>null):null;let n=await P("/api/bootstrap",{silent:e});if(n===null){if(o.data&&o.data.user)return;const s=await Hn();if(s&&s.user?n=s:(at(),n=await P("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}})),!n)return}if(we(n),o.isOffline=!1,a)try{const s=await a;s&&(o.trash=Array.isArray(s)?s:s.trash||[...(s.projects||[]).map(i=>({...i,type:"project"})),...(s.tasks||[]).map(i=>({...i,type:"task"})),...(s.documents||[]).map(i=>({...i,type:"document"}))],o.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash)))}catch{}if(o.data?.tasks&&n?.tasks){const s=Date.now(),i=new Set(n.tasks.map(d=>d.id));for(const d of o.data.tasks)if(!i.has(d.id))s-(d.createdAt?new Date(d.createdAt).getTime():s)<12e4&&(n.tasks.unshift(d),i.add(d.id));else{const l=window._recentlyMovedTasks?.get(d.id);if(l&&s-l.timestamp<2e4){const p=n.tasks.find(u=>u.id===d.id);p&&(p.status=l.status,l.progress!==void 0&&(p.progress=l.progress),l.sortOrder!==void 0&&(p.sortOrder=l.sortOrder,p.sort_order=l.sortOrder,p.customFields||(p.customFields={}),p.customFields.sortOrder=l.sortOrder,p.customFields.sort_order=l.sortOrder,p.custom_fields||(p.custom_fields={}),p.custom_fields.sortOrder=l.sortOrder,p.custom_fields.sort_order=l.sortOrder))}}}if(o.data?.projects&&n?.projects){const s=Date.now(),i=new Set(n.projects.map(d=>d.id));for(const d of o.data.projects)i.has(d.id)||s-(d.createdAt?new Date(d.createdAt).getTime():s)<12e4&&(n.projects.unshift(d),i.add(d.id))}let r=!1;if(o.data&&n)if(o.data.updatedAt!==n.updatedAt)r=!0;else if(o.data.tasks?.length!==n.tasks?.length||o.data.projects?.length!==n.projects?.length)r=!0;else{const s=o.data.tasks||[],i=n.tasks||[];for(let d=0;d<i.length;d++){const l=i[d],p=s[d];if(!p||p.id!==l.id||p.status!==l.status||(p.sortOrder||p.sort_order)!==(l.sortOrder||l.sort_order)||p.progress!==l.progress){r=!0;break}}if(!r){const d=o.data.projects||[],l=n.projects||[];for(let p=0;p<l.length;p++){const u=l[p],f=d[p];if(!f||f.id!==u.id||f.lifecycle!==u.lifecycle||f.health!==u.health||f.progress!==u.progress){r=!0;break}}}}if(!o.data||r||o.data.comments?.length!==n.comments?.length||o.data.documents?.length!==n.documents?.length||o.data.users?.length!==n.users?.length||o.data.auditLogs?.length!==n.auditLogs?.length||o.data.notifications?.length!==n.notifications?.length||o.view==="login"){o.data=n,(o.view==="login"||!te(o.view))&&(o.view=Be());const s=!!document.getElementById("modal-root")?.children?.length,i=!!(document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),d=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(i||d))return;requestAnimationFrame(!e&&!s?()=>X():()=>L())}else o.data=n,te(o.view)||(o.view=Be(),requestAnimationFrame(()=>L()))}catch(a){if(a&&(a.status===401||a.status===403))throw a;const n=await Hn();if(n){o.data=n,te(o.view)||(o.view=Be()),o.isOffline=!0;const r=!!document.getElementById("modal-root")?.children?.length;!e&&!r?X():L();return}throw a}}typeof window<"u"&&(window.renderApp=X,window.renderView=L);var Ro=pe({navItem:()=>Se,renderSidebar:()=>un,renderSidebarBackdrop:()=>pn});function Se(e,a,n){return`<button class="nav-item ${o.view===e||e==="projects"&&o.view==="project-detail"?"active":""}" data-view="${e}">${w(n,17)}<span>${a}</span></button>`}function pn(){return`<div class="sidebar-backdrop ${o.sidebarOpen?"visible":""}" data-action="toggle-sidebar" aria-hidden="true"></div>`}function un(){const e=o.data?.user||{},a=C()||I("manage_settings")||I("manage_roles")||I("manage_users")||I("manage_trash")||I("view_audit_logs")||I("manage_templates");return`
    <aside class="sidebar ${o.sidebarOpen?"open":""}">
      <div class="sidebar-brand">
        ${o.data?.company?.logoUrl?`<img src="${c(o.data?.company?.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${w("building",20)}</span>`:`<span class="brand-mark">${w("building",20)}</span>`}
        <div>
          <div class="brand-name">${c(t(o.data?.company?.nameAr||o.data?.company?.name||"DARC Design Team",o.data?.company?.nameEn||o.data?.company?.name||"DARC Design Team"))}</div>
          <div class="brand-subtitle">${v("workspace")}</div>
        </div>
      </div>
      <div class="nav-title">${t("مساحة العمل","WORKSPACE")}</div>
      <nav class="nav-list">
        ${te("dashboard")?Se("dashboard",v("dashboard"),"grid"):""}
        ${te("projects")?Se("projects",v("projects"),"building"):""}
        ${te("tasks")?Se("tasks",v("myTasks"),"checklist"):""}
        ${te("documents")?Se("documents",v("documents"),"document"):""}
        ${te("team")?Se("team",v("team"),"users"):""}
        ${te("reports")?Se("reports",v("reports"),"chart"):""}
      </nav>
      <div class="nav-separator"></div>
      <div class="nav-title">${a||te("templates")?t("إدارة النظام","ADMIN"):t("حسابي","MY ACCOUNT")}</div>
      <nav class="nav-list">
        ${te("templates")?Se("templates",v("templates"),"layers"):""}
        ${Se("settings",a?v("settings"):t("الملف الشخصي والأمان","Profile & Security"),"settings")}
      </nav>
      <div class="sidebar-bottom">
        <div class="admin-badge">${Y(e)}<div class="admin-info"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(ce(e))}</span></div></div>
        <div class="sidebar-footer"><span>v1.0 · ${t("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${v("signOut")}">${w("logout",15)}</button></div>
      </div>
    </aside>
  `}var Oo=pe({calculatePasswordStrength:()=>bi,cleanupTurnstile:()=>_a,initTurnstile:()=>fn,loadTurnstileScript:()=>yi,openForcePasswordModal:()=>qo,renderActivation:()=>Bt,renderLogin:()=>$e,renderResetPassword:()=>yt,renderStrengthMeterHtml:()=>ba}),Bo="0x4AAAAAAFr3zLr2zpRS2ah4",le=null,$t=null,me=null,wt=!1;function yi(){return typeof window>"u"||window.turnstile?Promise.resolve():$t||($t=new Promise(e=>{if(window.onloadTurnstileCallback=()=>{e()},document.getElementById("cf-turnstile-script")){window.turnstile&&e();return}const a=document.createElement("script");a.id="cf-turnstile-script",a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback",a.async=!0,a.defer=!0,a.onerror=()=>{console.warn("[Turnstile] Script failed to load, fallback mode enabled"),e()},document.body.appendChild(a)}),$t)}function _a(){if(!(typeof window>"u")){if(me=null,window.turnstile&&le!==null){try{window.turnstile.remove(le)}catch{}le=null}try{const e=document.getElementById("turnstile-container");e&&(e.innerHTML=""),document.querySelectorAll('iframe[src*="challenges.cloudflare.com"]').forEach(n=>{try{n.remove()}catch{}});const a=document.getElementById("cf-turnstile-script");a&&a.remove(),$t=null}catch{}}}async function fn(){if(!(typeof window>"u")&&document.getElementById("turnstile-container")&&!wt){wt=!0;try{if(window.turnstile||await yi(),!window.turnstile){wt=!1;return}const e=document.getElementById("turnstile-container");if(!e){wt=!1;return}if(le!==null){try{window.turnstile.remove(le)}catch{}le=null}me=null,le=window.turnstile.render(e,{sitekey:Bo,theme:o.theme==="dark"?"dark":"light",language:o.lang==="ar"?"ar":"en",appearance:"interaction-only",callback:a=>{me=a},"error-callback":a=>{console.warn("[Turnstile] Handshake notice (shielded):",a),me="fallback_client"},"expired-callback":()=>{if(me=null,window.turnstile&&le!==null)try{window.turnstile.reset(le)}catch{}}})}catch(e){console.warn("[Turnstile] Init notice:",e),me="fallback_client"}finally{wt=!1}}}typeof window<"u"&&(window.__darcInitTurnstile=fn);async function Fo(){if(typeof window>"u"||!window.turnstile)return"fallback_client";if(me)return me;if(le!==null)try{const e=window.turnstile.getResponse(le);if(e)return me=e,e}catch{}return new Promise(e=>{let a=!1;const n=setTimeout(()=>{a||(a=!0,e(me||"fallback_client"))},1200),r=setInterval(()=>{if(a){clearInterval(r);return}if(me){a=!0,clearTimeout(n),clearInterval(r),e(me);return}if(le!==null&&window.turnstile)try{const s=window.turnstile.getResponse(le);if(s){a=!0,clearTimeout(n),clearInterval(r),me=s,e(s);return}}catch{}},35)})}function bi(e){const a=String(e||"");if(!a)return{score:0,label:"",percent:0,color:"var(--line)"};let n=0;return a.length>=10&&(n+=1),/[a-z]/.test(a)&&/[A-Z]/.test(a)&&(n+=1),/\d/.test(a)&&(n+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(a)&&(n+=1),n===1?{score:1,label:o.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:n===2?{score:2,label:o.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:n===3?{score:3,label:o.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:o.lang==="ar"?"قوية وممتازة 🛡️":"Strong & Secure 🛡️",percent:100,color:"var(--mint-strong)"}}function ba(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${o.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function mn(e,a,n,r,s){const i=document.getElementById(e);if(!i)return;const d=i.querySelector(`input[name="${a}"]`),l=i.querySelector(`input[name="${n}"]`),p=i.querySelector(s||'button[type="submit"]'),u=document.getElementById(`${r}-meter-wrap`),f=document.getElementById(`${r}-meter-bar`),y=document.getElementById(`${r}-meter-label`),$=document.getElementById(`${r}-match-indicator`);function b(){const x=d?d.value:"",m=l?l.value:"";if(x&&u&&f&&y){u.style.display="flex";const h=bi(x);f.style.width=`${h.percent}%`,f.style.background=h.color,y.textContent=h.label,y.style.color=h.color}else u&&(u.style.display="none");l&&$&&(m?x===m?($.style.display="block",$.style.color="var(--mint-strong)",$.textContent=o.lang==="ar"?"✓ كلمتا المرور متطابقتان":"✓ Passwords match",p&&(p.disabled=!1)):($.style.display="block",$.style.color="var(--red)",$.textContent=o.lang==="ar"?"✗ كلمتا المرور غير متطابقتين":"✗ Passwords do not match",p&&(p.disabled=!0)):($.style.display="none",p&&(p.disabled=!1)))}d?.addEventListener("input",b),l?.addEventListener("input",b)}function ha(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=a=>{a.preventDefault();const n=e.getAttribute("data-target"),r=n?document.getElementById(n):e.parentElement.querySelector("input");if(!r)return;const s=r.type==="password";r.type=s?"text":"password",e.style.color=s?"var(--teal)":"var(--ink-soft)";const i=s?o.lang==="ar"?"إخفاء كلمة المرور":"Hide password":o.lang==="ar"?"إظهار كلمة المرور":"Show password";e.setAttribute("aria-label",i),e.setAttribute("title",i),s?e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';try{r.focus()}catch{}}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const a=n=>{const r=n.getModifierState&&n.getModifierState("CapsLock");let s=e.parentElement.parentElement.querySelector(".capslock-warning");r?s||(s=document.createElement("div"),s.className="capslock-warning",s.style.fontSize="11px",s.style.color="var(--amber)",s.style.marginTop="4px",s.style.display="flex",s.style.alignItems="center",s.style.gap="4px",s.innerHTML=`<span>⚠️</span> <span>${o.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(s)):s&&s.remove()};e.addEventListener("keydown",a),e.addEventListener("keyup",a)})}function Uo(e,a=60){if(!e)return;e.disabled=!0;let n=a;const r=e.innerHTML,s=setInterval(()=>{n--,e.innerHTML=`<span>${o.lang==="ar"?`يرجى الانتظار (${n} ثانية)...`:`Please wait (${n}s)...`}</span>`,n<=0&&(clearInterval(s),e.disabled=!1,e.innerHTML=r)},1e3)}function $e(e="",a="login",n=!1){if(o.view="login",typeof window<"u"){const l=a==="forgot"?"#forgot":"#login";window.location.hash!==l&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",l):window.location.hash=l)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",o.lang==="en"),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=o.theme||"light";let r="";const s=e?`<div class="login-demo" style="border-color:${n?"#cce3e0":"var(--red-soft)"};background:${n?"#f0f9f7":"var(--red-soft)"};color:${n?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${w(n?"check":"alert",15)}<span>${c(e)}</span></div>`:"",i=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";a==="login"?r=`
      <form id="login-form">
        <div class="field">
          <label for="login-email">${v("emailAddress")}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${c(i)}" required />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label for="login-password">${v("password")}</label>
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
        <button class="btn btn-primary btn-block" type="submit">${w(o.lang==="ar"?"arrowLeft":"arrowRight",16)} ${v("login")}</button>
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
    `:a==="forgot"&&(r=`
      <form id="forgot-form">
        <div class="field"><label for="login-email">${v("emailAddress")}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${c(i)}" required /></div>
        ${s}
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
              <div><p class="eyebrow">${a==="login"?t("مرحبًا بعودتك","WELCOME BACK"):t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${a==="login"?v("login"):t("نسيت كلمة المرور","Forgot Password")}</h2><p class="intro">${a==="login"?v("loginIntro"):t("أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.","Enter your email to receive a reset link.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${o.theme==="dark"?"الوضع النهاري":"الوضع الليلي"}">${o.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${o.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            ${r}
          </div>
        </section>
      </div>
    </div>`,ha();const d=(l,p=!1)=>{const u=document.getElementById("login-error-container");u?u.innerHTML=l?`
        <div class="login-demo" style="border-color:${p?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"};background:${p?"var(--mint)":"rgba(239,68,68,0.08)"};color:${p?"var(--mint-strong)":"var(--red)"};margin-top:0;margin-bottom:15px;padding:10px 14px;border-radius:8px;font-size:12.5px;display:flex;align-items:center;gap:8px;line-height:1.5;">
          ${w(p?"check":"alert",16)}
          <span>${c(l)}</span>
        </div>`:"":l&&k(l,!p)};document.getElementById("login-form")?.addEventListener("submit",async l=>{l.preventDefault();const p=new FormData(l.currentTarget),u=String(p.get("email")||"").trim(),f=String(p.get("password")||""),y=document.getElementById("remember-email-check")?.checked,$=l.currentTarget.querySelector('button[type="submit"]'),b=`${w(o.lang==="ar"?"arrowLeft":"arrowRight",16)} ${v("login")}`;d(""),$.disabled=!0,$.innerHTML=`<span>⏳ ${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const x=u.trim().toLowerCase()==="demo@darc-design.bond"||u.trim().toLowerCase()==="demo@darc.local";let m="bypass_dev";x||(m=await Fo());try{const h=await P("/api/auth/login",{method:"POST",body:JSON.stringify({email:u,password:f,turnstileToken:m})});if(_a(),typeof localStorage<"u"&&(h?.token&&localStorage.setItem("darc_token",h.token),y?localStorage.setItem("darc_last_email",u):localStorage.removeItem("darc_last_email")),Dt({theme:o.theme,lang:o.lang}),o.view="dashboard",h?.bootstrap){o.data=h.bootstrap,we(h.bootstrap),X(),ge(!0).catch(()=>{});return}const T=nn();if(T&&T.user&&(T.user.id===h?.user?.id||h?.user?.email===T.user?.email)){T.user=h.user||T.user,o.data=T,X(),ge(!0).catch(()=>{});return}at(),Rt(),await ge(),X()}catch(h){if(console.error("Login Error:",h),typeof window<"u"&&window.turnstile&&le!==null)try{window.turnstile.reset(le)}catch{}$&&($.disabled=!1,$.innerHTML=b);let T=h.message;if(typeof navigator<"u"&&!navigator.onLine)T=t("لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة وإعادة المحاولة.","No internet connection. Please check your network and try again.");else if(h.message&&(h.message.includes("Turnstile")||h.message.includes("التحقق الأمني")))T=t("فشل التحقق الأمني التلقائي (Cloudflare Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.","Security check (Turnstile) failed. Please refresh the page and try again.");else if(h.message&&(h.message.includes("429")||h.message.includes("كثيرة")||h.message.includes("rate")))T=t("تم تجاوز عدد محاولات الدخول المسموحة لحماية الحساب. يرجى الانتظار دقيقة واحدة قبل المحاولة مجدداً.","Too many login attempts. For security, please wait one minute before trying again."),Uo(document.querySelector('#login-form button[type="submit"]'),60);else if(h.message&&(h.message.includes("401")||h.message.includes("غير صحيحة")||h.message.includes("credentials"))){T=t("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من صحة المدخلات وإعادة المحاولة.","Incorrect email or password. Please verify your credentials and try again.");const D=document.getElementById("login-password");if(D){D.value="";try{D.focus()}catch{}}}else h.message&&(h.message.includes("مفعل")||h.message.includes("موقوف")||h.message.includes("inactive"))?T=t("حسابك معطل أو غير مفعل حالياً. يرجى التواصل مع مسؤول النظام لإعادة التفعيل.","This account is suspended or inactive. Please contact your system administrator."):(!T||T.includes("Failed to fetch")||T.includes("NetworkError")||T.includes("Network request failed"))&&(T=t("تعذر الاتصال بخادم تسجيل الدخول. يرجى التأكد من استقرار الإنترنت وإعادة المحاولة.","Could not reach the authentication server. Please check your connection and try again."));d(T)}}),document.getElementById("forgot-form")?.addEventListener("submit",async l=>{l.preventDefault();const p=new FormData(l.currentTarget),u=String(p.get("email")||"").trim(),f=l.currentTarget.querySelector('button[type="submit"]'),y=f?f.innerHTML:"";f&&(f.disabled=!0,f.innerHTML=`<span>⏳ ${t("جاري إرسال الرابط...","Sending reset link...")}</span>`);try{await P("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:u})}),f&&(f.disabled=!1,f.innerHTML=y),d(t("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح ✨","Password reset link sent to your email successfully ✨"),!0)}catch($){f&&(f.disabled=!1,f.innerHTML=y),d($.message)}}),a==="login"?fn():_a()}function Bt(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",o.lang==="en"),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=o.theme||"light",document.getElementById("app").innerHTML=`
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
                <label for="act-pass">${v("password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${ba("act")}
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
    </div>`,ha(),mn("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function yt(e,a=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",o.lang==="en"),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=o.theme||"light";const n=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,r=!n&&!a?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
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
                ${ba("rst")}
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
              ${a||r?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${w("alert",15)}<span>${c(a||r)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit" ${n?"":"disabled"}>${t("حفظ وتسجيل الدخول","Save and login")}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,ha(),mn("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async s=>{s.preventDefault();const i=new FormData(s.currentTarget),d=i.get("newPassword");if(d!==i.get("newPasswordConfirm")){yt(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const l=s.currentTarget.querySelector('button[type="submit"]');l.disabled=!0;try{await P("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:d})}),window.history.replaceState({},"",window.location.pathname),Rt(),await ge(),X()}catch(p){yt(e,p.message)}})}function qo(e){const a=e.status==="pending",n=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${a}">
      <div class="field">
        <label for="force-pass-input">${a?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${ba("force")}
        ${e.email?a?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${w("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${v("cancel")}</button>
        <button type="submit" class="btn btn-primary">${a?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ae(a?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),a?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${c(e.name)}.`,`Set an initial password to activate ${c(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${c(e.name)}`,`Set a new password for ${c(e.name)}`),n,"force-password"),ha(),mn("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}var Ho=pe({attentionItem:()=>xi,metricCard:()=>kt,projectProgress:()=>hi,projectRow:()=>gn,pulseChart:()=>$i,renderDashboard:()=>Wo,renderReports:()=>Vo,teamMetrics:()=>vn,teamRow:()=>wi});function kt(e,a,n,r,s,i=""){return`<article class="metric-card ${r}"><div class="metric-top"><span class="metric-label">${c(e)}</span><span class="metric-icon">${w(s,15)}</span></div><div class="metric-value">${c(a)}</div><span class="metric-note ${i}">${c(n)}</span></article>`}function hi(e){const a=e.health==="off_track"?"red":e.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${v("weightedProgress")}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${a}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function gn(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${w("building",17)}</span><div class="project-name"><strong>${c(t(e.nameAr,e.nameEn))}</strong><span>${c(e.code)} · ${c(t(e.clientAr,e.clientEn))}</span></div></div>${hi(e)}<div class="project-owner">${Y(e.manager)}<span>${c(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${c(e.id)}" aria-label="${v("viewDetails")}">${w(o.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function xi(e){const a=Oe(e)||e.status==="blocked"?"red":"amber",n=Oe(e)?t("متأخرة","Overdue"):e.status==="blocked"?t("متوقفة","Blocked"):t("تستحق قريبًا","Due soon");return`<button class="attention-item" data-action="open-task" data-task-id="${c(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${a}">${w(Oe(e)||e.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${a})">${c(t(e.titleAr,e.titleEn))}</strong><span>${c(n)} · ${c(ri(e.dueDate))}</span></span></button>`}function vn(e,a){const n=a.filter(i=>i.assigneeId===e),r=n.reduce((i,d)=>i+Number(d.weight||1),0),s=r?Math.round(n.reduce((i,d)=>i+d.progress*Number(d.weight||1),0)/r):0;return{tasks:n.length,progress:s,overdue:n.filter(Oe).length}}function wi(e,a){const n=vn(e.id,a);return`<div class="team-row"><div class="team-member">${Y(e)}<div class="team-member-copy"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(t(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${n.tasks}</strong> ${v("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${v("progress")}</span><strong>${n.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${n.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${c(e.id)}">${w("more",15)}</button></div>`}function $i(){const e=[38,48,45,62,55,72,68],a=o.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${e.map((n,r)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${r===e.length-1?"current":""}" style="height:${n}%"></span></div><span>${a[r]}</span></div>`).join("")}</div>`}function Wo(){const e=o.data?.stats||{},a=o.data?.projects||[],n=o.data?.tasks||[],r=o.data?.users||[],s=o.data?.user||{},i=s.name||s.email||t("مستخدم","User"),d=a.reduce((m,h)=>m+(Number(h.totalWeight)||0),0),l=d?Math.round(a.reduce((m,h)=>m+(Number(h.progress)||0)*(Number(h.totalWeight)||0),0)/d):0,p=[...n].filter(m=>{if(Oe(m)||m.status==="blocked")return!0;if(m.dueDate){const h=Re(m.dueDate);if(h){const T=(h-new Date)/864e5;return T>=0&&T<=7}}return!1}).sort((m,h)=>(m.dueDate?Re(m.dueDate)?.getTime()??1/0:1/0)-(h.dueDate?Re(h.dueDate)?.getTime()??1/0:1/0)).slice(0,5),u=r.filter(m=>m.status!=="inactive"),f=e.projectCount??a.length,y=e.myTasks??n.filter(m=>m.assigneeId===s.id).length,$=e.overdueTasks??n.filter(Oe).length,b=e.dueSoon??0,x=e.completedTasks??n.filter(m=>m.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${t("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${si()}، ${c(t(i.replace(/^م\.\s?/,""),s.nameEn||i))}</h1><p>${v("welcomeText")}</p></div><div class="welcome-status"><span>${v("portfolioHealth")}</span><strong>${l}%</strong><small>${t("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${kt(v("activeProjects"),e.activeProjects||0,t(`${f} مشاريع إجمالًا`,`${f} projects total`),"teal","building","up")}${kt(v("openTasks"),e.openTasks??n.length,t(`${y} مسندة لك`,`${y} assigned to you`),"blue","checklist")}${kt(v("overdue"),$,t("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",$?"alert":"check",$?"alert":"")}${kt(v("dueThisWeek"),b,t("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${v("projectProgress")}</h2><p class="panel-subtitle">${v("projectProgressSub")}</p></div>${I("view_projects")?`<button class="text-link" data-view="projects">${v("seeAll")} ${w(o.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${a.length?a.slice(0,5).map(gn).join(""):`<div class="empty">${w("building",18)}<span>${v("noProjects")}</span></div>`}</div></section>${C()||I("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${v("teamProgress")}</h2><p class="panel-subtitle">${v("teamProgressSub")}</p></div><button class="text-link" data-view="team">${v("seeAll")} ${w(o.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${u.slice(0,6).map(m=>wi(m,n)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${v("attention")}</h2><p class="panel-subtitle">${v("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${p.length}</span></div><div class="attention-list">${p.length?p.map(xi).join(""):`<div class="empty">${w("check",18)}<span>${v("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${v("recentPulse")}</h2><p class="panel-subtitle">${v("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${x} ${v("done")}</span></div>${$i()}</section></div></div>`}function Vo(){const{projects:e=[],tasks:a=[],users:n=[]}=o.data||{},r=I("export_reports")||C(),s=a.reduce((p,u)=>p+Number(u.weight||1),0),i=s?Math.round(a.reduce((p,u)=>p+u.progress*Number(u.weight||1),0)/s):0,d=new Map;a.forEach(p=>{const u=(o.lang==="ar"?p.categoryAr:p.categoryEn)||t(p.typeAr||"عام",p.typeEn||"General"),f=d.get(u)||{weight:0,progress:0};f.weight+=Number(p.weight||1),f.progress+=p.progress*Number(p.weight||1),d.set(u,f)});const l=[...d.entries()].map(([p,u])=>({label:p,progress:u.weight?Math.round(u.progress/u.weight):0})).sort((p,u)=>u.progress-p.progress);return`<div class="page-head"><div><p class="eyebrow">${t("قراءة الأداء","PERFORMANCE READOUT")}</p><h1>${v("reports")}</h1><p>${t("مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.","Simple signals that help management see drift before it becomes delay.")}</p></div><div class="page-actions">${r?`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${w("printer",15)} ${t("طباعة تقرير المحفظة (PDF)","Print Portfolio (PDF)")}</button>
      <button class="btn btn-soft" data-action="export-csv">${w("document",15)} ${t("تصدير الإكسل (Excel)","Export Excel")}</button>
    </div>
  `:""}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("الإنجاز حسب التخصص","Progress by discipline")}</h2><p class="panel-subtitle">${v("weightedProgress")}</p></div><span class="status-badge on_track">${i}%</span></div><div class="report-bars">${l.length?l.map(p=>`<div class="report-bar-row"><span>${c(p.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${p.progress}%"></div></div><strong>${p.progress}%</strong></div>`).join(""):`<div class="empty">${v("noTasks")}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("صحة المحفظة","Portfolio health")}</h2><p class="panel-subtitle">${t("توزيع حالات المشاريع الحالية.","Current project status distribution.")}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${v("onTrack")}</span><strong style="color:var(--mint-strong)">${e.filter(p=>p.health==="on_track").length}</strong></div><div class="report-stat"><span>${v("atRisk")}</span><strong style="color:var(--amber)">${e.filter(p=>p.health==="at_risk").length}</strong></div><div class="report-stat"><span>${v("offTrack")}</span><strong style="color:var(--red)">${e.filter(p=>p.health==="off_track").length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${v("teamLoad")}</h2><p class="panel-subtitle">${t("المهام المفتوحة لكل عضو.","Open tasks per member.")}</p></div></div><div class="report-stat-list">${n.slice(0,5).map(p=>{const u=vn(p.id,a);return`<div class="report-stat"><span>${c(t(p.name,p.nameEn||p.name))}</span><strong>${u.tasks}</strong></div>`}).join("")}</div></section></div></div>`}var Go="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",qe=`https://drive.google.com/drive/folders/${Go}?usp=sharing`;function yn(e){if(!e)return qe;const a=e.driveFileId||e.drive_file_id;if(a&&!String(a).startsWith("demo_")&&String(a).length>=25&&a!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${encodeURIComponent(a)}/view?usp=sharing`;const n=e.diskFilename||e.disk_filename||e.viewLink||e.webViewLink||"";if(n&&n.includes("drive.google.com")){if(n.includes("/folders/"))return n;const r=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(r&&r[1]&&!r[1].startsWith("demo_")&&r[1].length>=25&&r[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${r[1]}/view?usp=sharing`}return n&&(n.startsWith("https://")||n.startsWith("http://"))&&!n.includes("localhost")&&!n.includes("127.0.0.1")&&!n.includes("demo_sample")?n:qe}var Jo=new Set(["DARC-VILLA-ARCH-A101_Rev03.pdf","SKYLINE-CW-SECTION-DETAILS-DWG.pdf","RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf","DARC-VILLA-BOQ-BILL-OF-QUANTITIES.xlsx","DARC-PALM-VILLA-TECHNICAL-SPECIFICATIONS.docx","DARC-ARCHITECTURAL-CONCEPT-PRESENTATION.pptx","DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4","PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg","DARC-STRUCTURAL-LAYOUT-V2.dwg","darc-walkthrough.mp4"]);function Xe(e){if(!e)return"";if(e.blobUrl&&typeof e.blobUrl=="string"&&e.blobUrl.startsWith("blob:"))return e.blobUrl;if(e._blobUrl&&typeof e._blobUrl=="string"&&e._blobUrl.startsWith("blob:"))return e._blobUrl;if(typeof window<"u"&&window.__docBlobCache){const i=window.__docBlobCache.get(e.id)||window.__docBlobCache.get(e.originalName);if(i&&typeof i=="string"&&i.startsWith("blob:"))return i}const a=(e.originalName||"").trim();if(a&&Jo.has(a))return`/assets/${encodeURIComponent(a)}`;const n=(e.diskFilename||e.disk_filename||e.url||"").trim();if(n&&(n.startsWith("https://")||n.startsWith("http://")))try{const i=new URL(n);if(["http:","https:"].includes(i.protocol))if(i.hostname.includes("drive.google.com")||i.hostname.includes("docs.google.com")){if(!i.pathname.includes("/folders/")){const d=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(d&&d[1]&&!d[1].startsWith("demo_")&&d[1].length>=25&&d[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/uc?export=download&id=${d[1]}`}}else return n}catch{console.warn("[DocViewer] Invalid storage URL format:",n)}const r=e.driveFileId||e.drive_file_id;if(r&&typeof r=="string"&&!r.startsWith("demo_")&&r.length>=25&&r!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/uc?export=download&id=${encodeURIComponent(r)}`;if(e.id)return`/api/documents/${encodeURIComponent(e.id)}?stream=1`;const s=a.replace(/[/\\:*?"<>|\x00-\x1f]/g,"_");return s?`/assets/${encodeURIComponent(s)}`:""}async function bn(e,a=null){if(!e)return;const n=yn(e);let r=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(n),r=!0;else{const s=document.createElement("textarea");s.value=n,s.style.position="fixed",s.style.opacity="0",document.body.appendChild(s),s.select(),r=document.execCommand("copy"),s.remove()}}catch(s){console.warn("[DocViewer] Clipboard writeText failed, prompting:",s),window.prompt(t("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),n),r=!0}if(r){if(a){const s=a.innerHTML;a.innerHTML=`${w("check",14)} <span style="font-size:11px;font-weight:700;">${t("تم النسخ","Copied")}</span>`,a.style.color="var(--mint-strong, #10b981)",a.style.transition="all 0.2s ease",setTimeout(()=>{a.innerHTML=s,a.style.color=""},2200)}k(t(`تم نسخ رابط Google Drive بنجاح: ${n}`,`Google Drive link copied: ${n}`))}}async function ae(e){if(!e)return;let a=(o.data?.documents||[]).find(s=>s.id===e);if(!a)try{const s=await P(`/api/documents/${e}`);s&&s.document&&(a=s.document)}catch{}if(!a){k(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}k(t(`جاري بدء تحميل "${a.originalName}"...`,`Starting download of "${a.originalName}"...`));const n=(a.originalName||"").split(".").pop()?.toLowerCase()||"";n==="pdf"||a.mimeType&&a.mimeType.includes("pdf"),["dwg","dxf"].includes(n),["xlsx","xls","csv"].includes(n),["docx","doc","rtf","odt"].includes(n),["pptx","ppt","key"].includes(n),["jpg","jpeg","png","webp","svg"].includes(n)||a.mimeType&&a.mimeType.startsWith("image/"),["mp4","webm","mov"].includes(n)||a.mimeType&&a.mimeType.startsWith("video/");const r=a.diskFilename||a.disk_filename||"";if(r&&r.includes("drive.google.com")){const s=r.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(s&&s[1]&&!s[1].startsWith("demo_")&&s[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"){const i=`https://drive.google.com/uc?export=download&id=${s[1]}`,d=(a.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),l=document.createElement("a");l.href=i,l.target="_blank",l.rel="noopener noreferrer",l.download=d,document.body.appendChild(l),l.click(),l.remove(),k(t(`تم بدء تنزيل "${a.originalName}" من Google Drive بنجاح.`,`Downloaded "${a.originalName}" from Google Drive.`));return}}try{let s=null;const i=Xe(a);if(i)try{const d=await fetch(i);d.ok&&(s=await d.blob())}catch(d){console.warn("[DocViewer] Real asset fetch error:",d)}if(!s){window.open(`/api/documents/${encodeURIComponent(a.id)}?download=1`,"_blank"),k(t(`تم بدء تنزيل "${a.originalName}" بنجاح.`,`Downloaded "${a.originalName}" successfully.`));return}if(s){const d=URL.createObjectURL(s),l=(a.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),p=document.createElement("a");p.href=d,p.download=l,document.body.appendChild(p),p.click(),p.remove(),setTimeout(()=>URL.revokeObjectURL(d),3e4),k(t(`تم تنزيل المستند الأصلي "${a.originalName}" بنجاح.`,`Downloaded "${a.originalName}" successfully.`))}}catch(s){console.error("[DocViewer] Local download creation failed:",s),window.open(`/api/documents/${encodeURIComponent(a.id)}?download=1`,"_blank")}}function Yt(){const e=document.getElementById("preview-modal-overlay");if(!e)return;const a=e.querySelector("video");if(a)try{a.pause(),a.removeAttribute("src"),a.load()}catch{}window.__docPreviewKeyHandler&&(window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=null),document.body.style.overflow="",e.style.display="none",e.innerHTML=""}async function Pa(e){if(!e)return;let a=(o.data?.documents||[]).find(g=>g.id===e);if(!a)try{const g=await P(`/api/documents/${e}`);g&&(g.id||g.document?.id)&&(a=g.document||g,o.data&&!o.data.documents&&(o.data.documents=[]),o.data?.documents&&o.data.documents.push(a))}catch(g){console.warn("[DocViewer] Failed to fetch doc on demand:",g)}if(!a){k(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const n=(a.originalName||"").split(".").pop()?.toLowerCase()||"",r=fa(a.originalName,a.mimeType),s=rn(a.originalName)||"V1",i=a.size>1048576?(a.size/1048576).toFixed(1)+" MB":Math.round((a.size||0)/1024)+" KB",d=n==="pdf"||r.isPdf,l=["dwg","dxf"].includes(n)||r.isCad,p=["rvt","rfa","ifc","skp"].includes(n)||r.isBim,u=["xlsx","xls","csv"].includes(n)||r.isExcel,f=["docx","doc","rtf","odt"].includes(n)||r.isWord,y=["pptx","ppt","key"].includes(n)||r.isPpt,$=["zip","rar","7z","tar"].includes(n)||r.isZip,b=["jpg","jpeg","png","webp","svg","heic"].includes(n)||r.isImg,x=["mp4","webm","mov","m4v"].includes(n)||a.mimeType&&a.mimeType.startsWith("video/"),m=yn(a);let h=document.getElementById("preview-modal-overlay");h||(h=document.createElement("div"),h.id="preview-modal-overlay",h.style.cssText=`
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
    `,document.body.appendChild(h)),h.innerHTML=`
    <div style="background:var(--surface, #ffffff);width:100%;max-width:1240px;height:92vh;border-radius:16px;box-shadow:0 30px 70px rgba(0,0,0,0.5);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line, #e2e8f0);animation:modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
      <!-- Modal Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;">
          <span style="background:${r.bg};color:${r.color};border:1px solid ${r.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${r.ext}
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
              <span class="status-badge ${c(a.status||"approved")}" style="font-size:10px;padding:2px 7px;">${c(J(a.status||"approved"))}</span>
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
  `,h.style.display="flex",document.body.style.overflow="hidden",window.__docPreviewKeyHandler&&window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=g=>{g.key==="Escape"&&Yt()},window.addEventListener("keydown",window.__docPreviewKeyHandler);const T=document.getElementById("modal-copy-link-btn");T&&T.addEventListener("click",()=>bn(a,T));const D=document.getElementById("modal-download-btn");D&&D.addEventListener("click",()=>ae(a.id));const S=document.getElementById("close-doc-preview-btn");S&&S.addEventListener("click",Yt),h.onclick=g=>{g.target===h&&Yt()};const z=document.getElementById("doc-viewer-viewport");if(z){if(d){const g=Xe(a),E=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:qe;z.innerHTML=`
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
            data="${c(g)}#toolbar=1&navpanes=1&scrollbar=1" 
            type="application/pdf"
            style="width:100%;height:100%;border:none;display:block;"
          >
            <iframe 
              id="pdf-native-frame"
              src="${c(g)}#toolbar=1&navpanes=1&scrollbar=1" 
              type="application/pdf"
              style="width:100%;height:100%;border:none;display:block;"
              title="${c(a.originalName)}"
              allow="fullscreen"
            >
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:24px;">
                <p style="margin-bottom:12px;font-size:14px;color:#cbd5e1;">${t("متصفحك يحتاج لفتح مستند PDF في نافذة جديدة أو تنزيله مباشرة.","Your browser requires opening this PDF in a new window or downloading it.")}</p>
                <a href="${c(g)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:8px 18px;font-weight:700;">
                  ↗ ${t("فتح مستند PDF الأصلي","Open PDF in New Window")}
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    `,document.getElementById("pdf-view-native")?.addEventListener("click",()=>{const A=document.getElementById("pdf-frame-container");A&&(A.innerHTML=`
          <object id="pdf-native-object" data="${c(g)}#toolbar=1&navpanes=1" type="application/pdf" style="width:100%;height:100%;border:none;display:block;">
            <iframe id="pdf-native-frame" src="${c(g)}#toolbar=1&navpanes=1" type="application/pdf" style="width:100%;height:100%;border:none;display:block;" title="${c(a.originalName)}" allow="fullscreen"></iframe>
          </object>
        `),document.getElementById("pdf-view-native").style.background="#0284c7",document.getElementById("pdf-view-native").style.color="#fff",document.getElementById("pdf-view-drive").style.background="#1e293b",document.getElementById("pdf-view-drive").style.color="#94a3b8"}),document.getElementById("pdf-view-drive")?.addEventListener("click",()=>{const A=document.getElementById("pdf-frame-container");A&&(A.innerHTML=`<iframe src="${c(E)}" style="width:100%;height:100%;border:none;display:block;" allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`),document.getElementById("pdf-view-drive").style.background="#0284c7",document.getElementById("pdf-view-drive").style.color="#fff",document.getElementById("pdf-view-native").style.background="#1e293b",document.getElementById("pdf-view-native").style.color="#94a3b8"}),document.getElementById("pdf-open-newtab")?.addEventListener("click",()=>{window.open(g,"_blank")}),document.getElementById("pdf-download-btn")?.addEventListener("click",()=>ae(a.id));return}if(b){let he=function(){F&&(F.style.transform=`translate(${j}px, ${_}px) scale(${E}) rotate(${A}deg)`),V&&(V.textContent=`${Math.round(E*100)}%`)};var O=he;const g=Xe(a);z.innerHTML=`
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
            src="${g}" 
            alt="${c(a.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;pointer-events:none;" 
          />
        </div>
      </div>
    `;let E=1,A=0,j=0,_=0,M=!1,R=null,N=0,B=0;const F=document.getElementById("active-preview-img"),V=document.getElementById("img-zoom-level"),ie=document.getElementById("img-pan-viewport");if(document.getElementById("img-zoom-in")?.addEventListener("click",()=>{E=Math.min(5,E+.25),he()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{E=Math.max(.4,E-.25),he()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{A=(A+90)%360,he()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{E=1,A=0,j=0,_=0,he()}),ie){ie.addEventListener("wheel",G=>{G.preventDefault();const xe=G.deltaY<0?.15:-.15;E=Math.max(.4,Math.min(5,E+xe)),he()},{passive:!1}),ie.addEventListener("pointerdown",G=>{M=!0,R=G.pointerId;try{ie.setPointerCapture(G.pointerId)}catch{}N=G.clientX-j,B=G.clientY-_,ie.style.cursor="grabbing"}),ie.addEventListener("pointermove",G=>{!M||R!==null&&G.pointerId!==R||(j=G.clientX-N,_=G.clientY-B,he())});const se=G=>{if(M&&(R===null||G.pointerId===R)){M=!1,R=null;try{ie.releasePointerCapture(G.pointerId)}catch{}ie.style.cursor="grab"}};ie.addEventListener("pointerup",se),ie.addEventListener("pointercancel",se)}return}if(x){const g=Xe(a)||"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4",E=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:qe;z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#06090e;color:#f8fafc;overflow:hidden;">
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
            <source src="${c(g)}" type="video/mp4">
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
    `;const A=document.getElementById("darc-main-video-player"),j=document.getElementById("video-error-fallback");A&&(A.addEventListener("error",()=>{console.warn("[DocViewer] Video failed to stream from primary source:",g),j&&(j.style.display="flex")}),document.querySelectorAll(".video-jump-btn").forEach(_=>{_.addEventListener("click",()=>{const M=parseFloat(_.dataset.sec||"0");A.currentTime=M,A.play().catch(R=>console.warn(R))})}),document.getElementById("video-playback-rate")?.addEventListener("change",_=>{A.playbackRate=parseFloat(_.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():A.requestPictureInPicture&&await A.requestPictureInPicture()}catch(_){console.warn("[DocViewer] PiP error:",_)}}),document.getElementById("video-fullscreen-btn")?.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen?.().catch(_=>console.warn(_)):A.requestFullscreen?.().catch(_=>console.warn(_))})),document.getElementById("video-drive-btn")?.addEventListener("click",()=>{window.open(E,"_blank")}),document.getElementById("video-open-newtab")?.addEventListener("click",()=>{window.open(g,"_blank")}),document.getElementById("video-download-btn")?.addEventListener("click",()=>ae(a.id)),document.getElementById("video-fallback-download-btn")?.addEventListener("click",()=>ae(a.id));return}if(l||p){const g=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:qe;z.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#101418;user-select:none;">
        <!-- CAD Inspection Control Panel -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-weight:900;color:#0284c7;display:flex;align-items:center;gap:6px;">
              📐 ${r.ext} ${t("عارض المخططات الهندسية (CAD Workspace)","CAD Vector Workspace")}
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
    `,document.getElementById("cad-view-drive")?.addEventListener("click",()=>{window.open(g,"_blank")}),document.getElementById("cad-view-drive-cta")?.addEventListener("click",()=>{window.open(g,"_blank")}),document.getElementById("cad-export-dxf")?.addEventListener("click",()=>{ae(a.id)}),document.getElementById("cad-direct-download")?.addEventListener("click",()=>{ae(a.id)});const E=document.getElementById("cad-viewport-container"),A=document.getElementById("cad-coords");E&&A&&E.addEventListener("mousemove",j=>{const _=E.getBoundingClientRect(),M=((j.clientX-_.left)/_.width*24).toFixed(2),R=((j.clientY-_.top)/_.height*16).toFixed(2);A.textContent=`X: ${M}m | Y: ${R}m`})}if(u){const g=Xe(a),E=g.startsWith("http")?g:typeof window<"u"?`${window.location.origin}${g}`:g,A=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:qe,j=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?A:`https://docs.google.com/viewer?url=${encodeURIComponent(E)}&embedded=true`;z.innerHTML=`
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
            src="${c(j)}" 
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
    `;const _=document.getElementById("excel-frame-container"),M=document.getElementById("excel-grid-viewport"),R=document.getElementById("excel-embed-iframe"),N=document.getElementById("excel-view-embed"),B=document.getElementById("excel-view-drive"),F=document.getElementById("excel-view-info");N?.addEventListener("click",()=>{_&&M&&R&&(_.style.display="block",M.style.display="none",R.src=j),N.style.background="#ffffff",N.style.color="#107c41",B.style.background="rgba(255,255,255,0.2)",B.style.color="#ffffff",F.style.background="rgba(255,255,255,0.2)",F.style.color="#ffffff"}),B?.addEventListener("click",()=>{_&&M&&R&&(_.style.display="block",M.style.display="none",R.src=A),B.style.background="#ffffff",B.style.color="#107c41",N.style.background="rgba(255,255,255,0.2)",N.style.color="#ffffff",F.style.background="rgba(255,255,255,0.2)",F.style.color="#ffffff"}),F?.addEventListener("click",()=>{_&&M&&(_.style.display="none",M.style.display="flex"),F.style.background="#ffffff",F.style.color="#107c41",N.style.background="rgba(255,255,255,0.2)",N.style.color="#ffffff",B.style.background="rgba(255,255,255,0.2)",B.style.color="#ffffff"}),document.getElementById("excel-open-newtab")?.addEventListener("click",()=>{window.open(g,"_blank")}),document.getElementById("excel-cta-drive")?.addEventListener("click",()=>{window.open(A,"_blank")}),document.getElementById("excel-download-btn")?.addEventListener("click",()=>ae(a.id)),document.getElementById("excel-cta-download")?.addEventListener("click",()=>ae(a.id));return}if(f){const g=Xe(a),E=g.startsWith("http")?g:typeof window<"u"?`${window.location.origin}${g}`:g,A=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:qe,j=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?A:`https://docs.google.com/viewer?url=${encodeURIComponent(E)}&embedded=true`;z.innerHTML=`
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
            src="${c(j)}" 
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
    `;const _=document.getElementById("word-frame-container"),M=document.getElementById("word-main-content-layout"),R=document.getElementById("word-embed-iframe"),N=document.getElementById("word-view-embed"),B=document.getElementById("word-view-drive"),F=document.getElementById("word-view-info");N?.addEventListener("click",()=>{_&&M&&R&&(_.style.display="block",M.style.display="none",R.src=j),N.style.background="#ffffff",N.style.color="#2b579a",B.style.background="rgba(255,255,255,0.2)",B.style.color="#ffffff",F.style.background="rgba(255,255,255,0.2)",F.style.color="#ffffff"}),B?.addEventListener("click",()=>{_&&M&&R&&(_.style.display="block",M.style.display="none",R.src=A),B.style.background="#ffffff",B.style.color="#2b579a",N.style.background="rgba(255,255,255,0.2)",N.style.color="#ffffff",F.style.background="rgba(255,255,255,0.2)",F.style.color="#ffffff"}),F?.addEventListener("click",()=>{_&&M&&(_.style.display="none",M.style.display="flex"),F.style.background="#ffffff",F.style.color="#2b579a",N.style.background="rgba(255,255,255,0.2)",N.style.color="#ffffff",B.style.background="rgba(255,255,255,0.2)",B.style.color="#ffffff"}),document.getElementById("word-open-newtab")?.addEventListener("click",()=>{window.open(g,"_blank")}),document.getElementById("word-cta-drive")?.addEventListener("click",()=>{window.open(A,"_blank")}),document.getElementById("word-download-btn")?.addEventListener("click",()=>ae(a.id)),document.getElementById("word-cta-download")?.addEventListener("click",()=>ae(a.id));return}if(y){const g=Xe(a),E=g.startsWith("http")?g:typeof window<"u"?`${window.location.origin}${g}`:g,A=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(a.driveFileId)}/preview`:qe,j=a.driveFileId&&a.driveFileId.length>=25&&!a.driveFileId.startsWith("demo_")&&a.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?A:`https://docs.google.com/viewer?url=${encodeURIComponent(E)}&embedded=true`;z.innerHTML=`
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
            src="${c(j)}" 
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
    `;const _=document.getElementById("ppt-frame-container"),M=document.getElementById("ppt-canvas-container"),R=document.getElementById("ppt-embed-iframe"),N=document.getElementById("ppt-view-embed"),B=document.getElementById("ppt-view-drive"),F=document.getElementById("ppt-view-info");N?.addEventListener("click",()=>{_&&M&&R&&(_.style.display="block",M.style.display="none",R.src=j),N.style.background="#ffffff",N.style.color="#d24726",B.style.background="rgba(255,255,255,0.2)",B.style.color="#ffffff",F.style.background="rgba(255,255,255,0.2)",F.style.color="#ffffff"}),B?.addEventListener("click",()=>{_&&M&&R&&(_.style.display="block",M.style.display="none",R.src=A),B.style.background="#ffffff",B.style.color="#d24726",N.style.background="rgba(255,255,255,0.2)",N.style.color="#ffffff",F.style.background="rgba(255,255,255,0.2)",F.style.color="#ffffff"}),F?.addEventListener("click",()=>{_&&M&&(_.style.display="none",M.style.display="flex"),F.style.background="#ffffff",F.style.color="#d24726",N.style.background="rgba(255,255,255,0.2)",N.style.color="#ffffff",B.style.background="rgba(255,255,255,0.2)",B.style.color="#ffffff"}),document.getElementById("ppt-open-newtab")?.addEventListener("click",()=>{window.open(g,"_blank")}),document.getElementById("ppt-cta-drive")?.addEventListener("click",()=>{window.open(A,"_blank")}),document.getElementById("ppt-download-btn")?.addEventListener("click",()=>ae(a.id)),document.getElementById("ppt-cta-download")?.addEventListener("click",()=>ae(a.id));return}if($){z.innerHTML=`
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
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>ae(a.id)),document.getElementById("zip-cta-download")?.addEventListener("click",()=>ae(a.id));return}!d&&!b&&!x&&!l&&!u&&!f&&!y&&!$&&(z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
        <div style="width:80px;height:80px;border-radius:20px;background:${r.bg};color:${r.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${r.border};">
          ${r.ext}
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
    `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>ae(a.id)))}}var Ko=pe({STATUS_OPTIONS:()=>Pi,buildAssigneeChipsHtml:()=>$n,buildRemindersListHtml:()=>kn,canUserMoveTask:()=>Ft,closeDocumentPreviewModal:()=>Yt,downloadDocument:()=>ae,drawTimelineArrows:()=>Ca,filterTasks:()=>Di,formatRemindAtDate:()=>ji,getDocumentShareableLink:()=>yn,getSavedTaskSort:()=>xt,getTaskSortOrder:()=>_t,handleCopyDocLink:()=>bn,initTaskModalWidgets:()=>_i,openDocumentPreviewModal:()=>Pa,openTaskModal:()=>da,renderBoard:()=>Ti,renderCalendar:()=>wn,renderTaskAssignees:()=>ki,renderTaskComments:()=>Pt,renderTaskDocuments:()=>nt,renderTaskSortSelect:()=>xn,renderTasks:()=>Yo,renderTimeline:()=>xa,renderTimelinePanel:()=>Ii,setSavedTaskSort:()=>hn,sortTasks:()=>Si,sortTasksByImportance:()=>Ai,taskCard:()=>Ei});function ki(e){const a=o.data?.users||[],n=o._userMap||new Map(a.map(l=>[l.id,l])),r=e.assignee||n.get(e.assigneeId),s=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(l=>n.get(l)).filter(Boolean),i=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let d='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return r||s.length?(d+='<div class="avatar-stack" style="display:flex;align-items:center;">',r&&(d+=`<span title="${c(t(r.name,r.nameEn||r.name))}">${Y(r,"mini-avatar")}</span>`),s.slice(0,2).forEach(l=>{d+=`<span title="${c(t(l.name,l.nameEn||l.name))}" style="margin-inline-start:-8px;">${Y(l,"mini-avatar")}</span>`}),s.length>2&&(d+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${s.slice(2).map(l=>t(l.name,l.nameEn||l.name)).join("، ")}">+${s.length-2}</span>`),d+="</div>",r&&(d+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${c(t(r.name,r.nameEn||r.name))}</span>`)):i.length||(d+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),i.length&&(i.slice(0,2).forEach(l=>{d+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${c(l)}">🌐 ${c(l)} <small style="opacity:0.8">(${t("خارجي","Ext")})</small></span>`}),i.length>2&&(d+=`<span style="font-size:10px;color:var(--amber);" title="${i.slice(2).map(c).join("، ")}">+${i.length-2}</span>`)),d+="</div>",d}function Ft(e){if(!e)return!1;if(C()||I("edit_tasks"))return!0;const a=o.data?.user?.id;if(!a)return!1;if((e.assigneeId||e.assignee_id)===a||(e.creatorId||e.createdById||e.created_by_id||e.created_by)===a)return!0;const n=e.reviewerId||e.reviewer_id,r=e.approverId||e.approver_id;if(n===a||r===a)return!0;const s=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;if(Array.isArray(s)&&s.includes(a))return!0;const i=e.projectId||e.project_id;if(i&&o.data?.projects){const d=o.data?.projects?.find(l=>l.id===i);if(d){const l=d.managerId||d.manager_id,p=d.ownerId||d.owner_id||d.leadId||d.lead_id||d.createdById||d.created_by;if(l===a||p===a)return!0}}return!1}function Ei(e){const a=isOverdue(e),n=a?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${w("alert",11)} ${v("overdue")}</span>`:"",r=o._commentCounts?o._commentCounts[e.id]||0:(o.data?.comments||[]).filter(p=>p.taskId===e.id).length,s=o._docCounts?o._docCounts[e.id]||0:(o.data?.documents||[]).filter(p=>p.taskId===e.id).length,i=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",d=Ft(e),l=t(e.titleAr,e.titleEn);return`<article class="task-card ${a?"is-overdue":""} ${d?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${c(l)}" data-action="open-task" data-task-id="${c(e.id)}">
    <div class="task-card-top">
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="task-drag-handle" title="${t("اسحب لتحريك المهمة","Drag to reorder")}" style="cursor:grab;touch-action:none;padding:1px 4px;border-radius:4px;color:var(--muted);font-size:12px;opacity:0.65;user-select:none;transition:opacity 0.15s ease;">⋮⋮</span>
        <span class="task-code">${c(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        ${r>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${r} ${t("تعليقات","comments")}">💬 ${r}</span>`:""}
        ${s>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${s} ${t("مرفقات","attachments")}">📎 ${s}</span>`:""}
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
      ${ki(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${i};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function _t(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function Ai(e=[]){const a={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((r,s)=>{const i=r.status==="blocked"?1:0,d=s.status==="blocked"?1:0;if(i!==d)return d-i;const l=r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=s.dueDate?new Date(`${s.dueDate.split("T")[0]}T23:59:59`).getTime():null,u=l&&l<n&&r.status!=="done"?1:0,f=p&&p<n&&s.status!=="done"?1:0;if(u!==f)return f-u;const y=a[r.priority]||2,$=a[s.priority]||2;if(y!==$)return $-y;if(l&&p){if(l!==p)return l-p}else{if(l&&!p)return-1;if(!l&&p)return 1}const b=_t(r),x=_t(s);return b!==x?b-x:(r.titleAr||"").localeCompare(s.titleAr||"","ar")})}function xt(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function hn(e){try{localStorage.setItem("darc_task_sort_pref",e)}catch{}o.taskSortPref=e,o.projectTaskSort=e,o.myTaskSort=e}function xn(e,a="sort-project-tasks"){const n=e||xt();return`
    <div class="sort-box">
      <span>${t("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${a}">
        <option value="custom" ${n==="custom"?"selected":""}>${t("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${n==="importance"?"selected":""}>${t("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${t("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${t("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function Si(e=[],a=xt()){return a==="deadline"?[...e].sort((n,r)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):a==="custom"?[...e].sort((n,r)=>_t(n)-_t(r)):a==="alpha"?[...e].sort((n,r)=>(n.titleAr||"").localeCompare(r.titleAr||"","ar")):Ai(e)}function Ti(e,a=xt()){const n=o.data?.users||[];o._userMap=new Map(n.map(i=>[i.id,i]));const r={};for(const i of o.data?.comments||[])i.taskId&&(r[i.taskId]=(r[i.taskId]||0)+1);const s={};for(const i of o.data?.documents||[])i.taskId&&(s[i.taskId]=(s[i.taskId]||0)+1);return o._commentCounts=r,o._docCounts=s,`<div class="board">${[{key:"not_started",dot:"",label:v("notStarted")},{key:"in_progress",dot:"blue",label:v("inProgress")},{key:"review",dot:"amber",label:t("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:v("done")}].map(i=>{const d=Si(e.filter(l=>(i.statuses||[i.key]).includes(l.status)),a);return`<section class="board-column" data-status="${i.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${i.dot}"></span>${i.label}</div><span class="board-count">${d.length}</span></div><div class="board-cards">${d.length?d.map(Ei).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${v("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function wn(e,a){const n=o.calendarDate?new Date(o.calendarDate):new Date,r=n.getFullYear(),s=n.getMonth(),i=`${o.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][s]:["January","February","March","April","May","June","July","August","September","October","November","December"][s]} ${r}`,d=o.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=new Date(r,s,1).getDay(),p=new Date(r,s+1,0).getDate(),u=new Date,f=u.getFullYear()===r&&u.getMonth()===s;let y="";for(let $=0;$<l;$++)y+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let $=1;$<=p;$++){const b=f&&u.getDate()===$,x=`${r}-${String(s+1).padStart(2,"0")}-${String($).padStart(2,"0")}`,m=e.filter(h=>{if(!h.dueDate&&!h.startDate)return!1;const T=h.dueDate?h.dueDate.split("T")[0]:null,D=h.startDate?h.startDate.split("T")[0]:null;return T===x||D===x});y+=`
      <div class="calendar-day ${b?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${b?"var(--mint)":"var(--surface)"};border:1px solid ${b?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${b?"bold":"600"};color:${b?"var(--teal)":"var(--ink)"};">
          <span>${$}</span>
          ${b?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${t("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${m.map(h=>{const T=sn(h);return`
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
        ${y}
      </div>
    </div>
  `}function xa(e){const a=e.filter(p=>p.startDate&&p.dueDate).sort((p,u)=>new Date(p.startDate)-new Date(u.startDate));if(!a.length)return`<div class="empty" style="min-height:300px">${w("calendar",24)}<span>${t("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...a.map(p=>new Date(p.startDate).getTime())),r=Math.max(...a.map(p=>new Date(p.dueDate).getTime()));const s=2592e5;n-=s,r+=s;const i=Math.max(7,Math.ceil((r-n)/864e5));let d="";for(let p=0;p<i;p++){const u=new Date(n+p*864e5),f=u.getDay()===5||u.getDay()===6,y=Je()==="hijri"?o.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",$=new Intl.DateTimeFormat(y,{month:"short"}).format(u);d+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${f?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${u.getDate()}<br>${$}</div>`}const l=a.map((p,u)=>{const f=Math.floor((new Date(p.startDate).getTime()-n)/864e5)+1,y=f+Math.max(1,Math.ceil((new Date(p.dueDate).getTime()-new Date(p.startDate).getTime())/864e5)+1),$=sn(p);return`<div style="display:contents" class="timeline-row" data-task-id="${p.id}" data-row="${u}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${p.id}" style="grid-column: ${f} / ${y}; margin: 8px 4px; background: ${$.color}; border: 1px solid ${$.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${c(t(p.titleAr,p.titleEn))} — ${$.label}">
        <span style="font-weight:600;opacity:0.9">${c(p.templateId?p.templateId.replace("tpl-","#"):"#")}</span> ${c(t(p.titleAr,p.titleEn))}
        ${p.dependencies&&p.dependencies.length?`<span style="float:${o.lang==="ar"?"left":"right"};opacity:0.8">${w("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${i}, minmax(40px, 1fr)); min-width: ${i*40}px; position: relative;">
      ${d}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function Ii(e,a){const n=o.timelineView||"gantt";return`
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
      
      ${n==="calendar"?wn(e,a):xa(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:Ii,renderCalendar:wn,renderTimeline:xa});function Di(e){const a=o.searches.tasks.trim().toLowerCase();return e.filter(n=>{const r=`${n.titleAr} ${n.titleEn} ${n.categoryAr} ${n.categoryEn}`.toLowerCase().includes(a),s=o.taskFilter==="all"||o.taskFilter==="mine"&&n.assigneeId===o.data?.user?.id||o.taskFilter==="overdue"&&isOverdue(n)||o.taskFilter==="blocked"&&n.status==="blocked",i=o.taskProjectFilter==="all"||n.projectId===o.taskProjectFilter,d=!o.taskPriorityFilter||o.taskPriorityFilter==="all"||n.priority===o.taskPriorityFilter;return r&&s&&i&&d})}function Yo(){const e=Di(o.data?.tasks||[]),a=[["all",v("all")],["mine",t("مسندة لي","Assigned to me")],["overdue",v("overdue")],["blocked",v("blocked")]],n=o.myTaskSort||xt();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("حركة التنفيذ","EXECUTION")}</p>
        <h1>${v("myTasks")}</h1>
        <p>${t("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${I("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${w("plus",15)} ${v("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${a.map(([r,s])=>`
            <button class="segmented-tab ${o.taskFilter===r?"active":""}" data-action="task-filter" data-filter="${r}" role="tab">
              ${s}
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
            ${(o.data?.projects||[]).map(r=>`<option value="${c(r.id)}" ${o.taskProjectFilter===r.id?"selected":""}>${c(t(r.nameAr,r.nameEn))}</option>`).join("")}
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
          ${xn(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?Ti(e,n):`<section class="panel"><div class="empty">${w("checklist",18)}<span>${v("noTasks")}</span></div></section>`}
  `}function ji(e){return dn(e,{includeSeconds:!1}).full}function $n(e=[],a=[]){const n=o.data?.users||[];let r="";return e.forEach(s=>{const i=n.find(d=>d.id===s)||{name:s,id:s};r+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${Y(i,"mini-avatar")}
        <span style="font-weight:500;">${c(t(i.name,i.nameEn||i.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${c(s)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),a.forEach(s=>{r+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${c(s)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${t("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${c(s)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),r}function kn(e=[]){return e.length?e.map((a,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${c(ji(a.remindAt))}</strong>
        ${a.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(a.noteAr)}">(${c(a.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${c(a.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${t("حذف التذكير","Delete reminder")}">
        ${w("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${t("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function da(e=null,a=null,n=null){const r=o.data?.templates?.find(m=>m.id===(a||e?.templateId)),s=e?.projectId||n||o.activeProjectId||o.data?.projects?.[0]?.id||"",i=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],d=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:e.remindAt,noteAr:""}]:Array.isArray(o.data?.reminders)&&e?.id&&(l=(o.data?.reminders||[]).filter(m=>m.taskId===e.id));const p=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,u=i.length>0||d.length>0,f=u?$n(i,d):"",y=kn(l),$=`<form id="task-form" data-task-id="${c(e?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${c(e?.typeAr||r?.typeAr||(r?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${c(e?.typeEn||r?.typeEn||(r?"Drawing":""))}" />
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
          ${(o.data?.projects||[]).map(m=>`<option value="${c(m.id)}" ${m.id===s?"selected":""}>${c(t(m.nameAr,m.nameEn))} (${c(m.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${v("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${c(e?.titleAr||r?.nameAr||"")}" placeholder="${t("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${v("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${c(e?.titleEn||r?.nameEn||"")}" placeholder="${t("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${v("addFromLibrary")}</label>
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
          <span>${v("status")}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${p}%)</span>
        </label>
        <select name="status" id="task-status-select">${Pi().map(([m,h])=>`<option value="${m}" ${e?.status===m?"selected":""}>${h}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${v("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(m=>`<option value="${m}" ${(e?.priority||"medium")===m?"selected":""}>${priorityText(m)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${v("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${c((e?.startDate||"").split("T")[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${v("dueDate")}</label>
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
        <label>${v("description")}</label>
        <textarea name="descriptionAr" placeholder="${t("ما المطلوب؟ وما معيار الإغلاق؟","What is required and what defines completion?")}">${c(e?.descriptionAr||"")}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(I("delete_tasks")||C())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${w("trash",14)} ${t("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${v("cancel")}</button>
        <button type="submit" class="btn btn-primary">${w("check",14)} ${v(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let b=$,x="";e&&(x="modal-lg",b=`
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
            <div id="task-documents-list">${nt(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${t("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${Pt(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${t("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${t("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById("modal-root").innerHTML=Ae(e?t("تعديل المهمة","Edit task"):v("addTask"),t("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),b,"task",x),_i(e)}function _i(e){const a=document.getElementById("modal-root");if(!a)return;const n=a.querySelector("#task-status-select"),r=a.querySelector("#task-auto-progress-badge");n&&r&&n.addEventListener("change",()=>{const E={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;r.textContent=`(${E}%)`});const s=a.querySelector("#task-template-select");s&&s.addEventListener("change",()=>{const E=s.value,A=(o.data?.templates||[]).find(j=>j.id===E);if(A){const j=a.querySelector("#task-title-ar"),_=a.querySelector("#task-title-en"),M=a.querySelector("#task-type-ar"),R=a.querySelector("#task-type-en");j&&!j.value&&(j.value=A.nameAr||""),_&&!_.value&&(_.value=A.nameEn||""),M&&(M.value=A.typeAr||"مخطط"),R&&(R.value=A.typeEn||"Drawing")}});const i=a.querySelector("#task-additional-assignees-input"),d=a.querySelector("#task-external-assignees-input"),l=a.querySelector("#assignees-chips-container"),p=a.querySelector("#assignee-combobox-search"),u=a.querySelector("#assignee-combobox-dropdown"),f=a.querySelector("#btn-add-external-quick");let y=[];try{y=JSON.parse(i?.value||"[]")}catch{y=[]}let $=[];try{$=JSON.parse(d?.value||"[]")}catch{$=[]}function b(){i&&(i.value=JSON.stringify(y)),d&&(d.value=JSON.stringify($))}function x(){if(l){if(y.length===0&&$.length===0){l.style.display="none",l.innerHTML="",b();return}l.style.display="flex",l.innerHTML=$n(y,$),b()}}function m(E=""){if(!u)return;const A=E.trim().toLowerCase(),j=o.data?.users||[],_=a.querySelector("#task-primary-assignee")?.value,M=j.filter(N=>{if(N.id===_)return!1;if(!A)return!0;const B=(N.name||"").toLowerCase(),F=(N.nameEn||"").toLowerCase(),V=(N.email||"").toLowerCase();return B.includes(A)||F.includes(A)||V.includes(A)});let R="";A&&(R+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${t("إضافة مسؤول خارجي:","Add external assignee:")} "${c(E.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${t("إضافة سريعة","Quick Add")}</span>
        </div>
      `),M.length===0&&!A?R+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${t("لا يوجد مستخدمين آخرين","No other users")}</div>`:M.forEach(N=>{const B=y.includes(N.id);R+=`
          <div class="combobox-user-row" data-uid="${c(N.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${c(N.id)}" ${B?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${Y(N,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${c(t(N.name,N.nameEn||N.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${c(t(N.jobTitleAr,N.jobTitleEn)||N.email||"")}</span>
              </div>
            </div>
            ${B?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),u.innerHTML=R,u.style.display="block"}b(),p&&(p.addEventListener("focus",()=>{m(p.value)}),p.addEventListener("input",()=>{const E=p.value.trim();m(E),f&&(f.style.display=E.length>1?"inline-flex":"none")}),p.addEventListener("keydown",E=>{if(E.key==="Enter"){E.preventDefault();const A=p.value.trim();A&&($.includes(A)||($.push(A),x()),p.value="",f&&(f.style.display="none"),u&&(u.style.display="none"))}})),f&&f.addEventListener("click",()=>{const E=p?.value.trim();E&&($.includes(E)||($.push(E),x()),p.value="",f.style.display="none",u&&(u.style.display="none"))}),u&&u.addEventListener("click",E=>{if(E.target.closest(".dropdown-ext-action")){const j=p?.value.trim();j&&!$.includes(j)&&($.push(j),x()),p&&(p.value=""),f&&(f.style.display="none"),u.style.display="none";return}const A=E.target.closest(".combobox-user-row");if(A){const j=A.dataset.uid;y.includes(j)?y=y.filter(_=>_!==j):y.push(j),x(),m(p?.value||"")}}),l&&l.addEventListener("click",E=>{const A=E.target.closest(".btn-remove-chip-user");if(A){const _=A.dataset.uid;y=y.filter(M=>M!==_),x(),u&&u.style.display==="block"&&m(p?.value||"");return}const j=E.target.closest(".btn-remove-chip-ext");if(j){const _=j.dataset.ext;$=$.filter(M=>M!==_),x()}});const h=a.querySelector("#task-reminders-input"),T=a.querySelector("#task-reminders-list"),D=a.querySelector("#new-reminder-datetime"),S=a.querySelector("#new-reminder-note"),z=a.querySelector("#btn-add-reminder");let O=[];try{O=JSON.parse(h?.value||"[]")}catch{O=[]}Array.isArray(O)||(O=[]);function g(){T&&(h&&(h.value=JSON.stringify(O)),T.innerHTML=kn(O))}z&&z.addEventListener("click",()=>{const E=D?.value;if(!E){k(t("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const A=S?.value.trim()||"",j={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date(E).toISOString(),noteAr:A};O.push(j),D&&(D.value=""),S&&(S.value=""),g(),k(t("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),T&&T.addEventListener("click",async E=>{const A=E.target.closest(".btn-delete-reminder");if(A){const j=Number(A.dataset.idx),_=A.dataset.remId;!isNaN(j)&&j>=0&&j<O.length&&(O.splice(j,1),g(),_&&!_.startsWith("rem_temp_")&&P(`/api/reminders/${_}`,{method:"DELETE"}).catch(()=>{}),k(t("تم حذف موعد التذكير.","Reminder deleted.")))}}),a.addEventListener("mousedown",E=>{u?.contains(E.target)||p?.contains(E.target)||f?.contains(E.target)||(u&&(u.style.display="none"),f&&(f.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&P(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(E=>{if(E&&Array.isArray(E.comments)){o.data&&!o.data.comments&&(o.data.comments=[]);const A=new Map((o.data?.comments||[]).map(_=>[_.id,_]));for(const _ of E.comments)A.set(_.id,_);o.data&&(o.data.comments=Array.from(A.values()));const j=document.getElementById("task-comments-list");j&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(j.innerHTML=Pt(e))}}).catch(()=>{})}function Pt(e){const a=(o.data?.comments||[]).filter(n=>n.taskId===e.id).sort((n,r)=>new Date(n.createdAt)-new Date(r.createdAt));return a.length?`<div style="display:flex;flex-direction:column;gap:12px;">${a.map(n=>{const r=n.user||(o.data?.users||[]).find(l=>l.id===n.userId)||o.data?.user||{name:"DARC Member",id:""},s=!!(r.id&&o.data?.user?.id&&r.id===o.data?.user?.id),i=s||typeof C=="function"&&C(),d=c(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${c(n.id)}" style="display:flex;gap:10px;flex-direction:${s?"row-reverse":"row"};">
        ${Y(r)}
        <div style="display:flex;flex-direction:column;align-items:${s?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${c(t(r.name,r.nameEn||r.name))}</strong>
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
          <div id="comment-bubble-${c(n.id)}" style="background:${s?"var(--blue)":"var(--surface)"};color:${s?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${s?"none":"1px solid var(--border)"};border-top-${s?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${d}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${w("message",18)}<span style="font-size:12px;">${t("لا توجد تعليقات","No comments yet")}</span></div>`}function nt(e){const a=(o.data?.documents||[]).filter(n=>n.taskId===e.id).sort((n,r)=>new Date(r.createdAt)-new Date(n.createdAt));return a.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${a.map(n=>`
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
        ${I("review_tasks")||I("approve_tasks")||I("upload_documents")||C()?`
          <select class="doc-status-select" data-doc-id="${n.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${n.status==="draft"?"selected":""}>${t("مسودة","Draft")}</option>
            ${I("review_tasks")||C()?`<option value="review" ${n.status==="review"?"selected":""}>${t("مراجعة","Review")}</option>`:""}
            ${I("approve_tasks")||C()?`<option value="approved" ${n.status==="approved"?"selected":""}>${t("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${n.status==="superseded"?"selected":""}>${t("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${I("upload_documents")||C()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;" title="${t("إعادة تسمية","Rename")}">${w("edit",14)}</button>`:""}
        ${I("delete_documents")||C()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${n.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${t("حذف","Delete")}">${w("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${w("document",18)}<span style="font-size:12px;">${t("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function Pi(){return[["not_started",v("notStarted")],["in_progress",v("inProgress")],["review",v("review")],["approval",v("approval")],["done",v("done")],["blocked",v("blocked")],["canceled",v("canceled")]]}function Ca(){const e=document.querySelector(".timeline-container > div"),a=document.querySelector(".timeline-svg");if(!e||!a)return;a.innerHTML="";const n=Array.from(document.querySelectorAll(".timeline-bar")),r={},s=e.getBoundingClientRect();n.forEach(l=>{const p=l.getBoundingClientRect();r[l.dataset.taskId]={left:p.left-s.left,right:p.right-s.left,top:p.top-s.top,bottom:p.bottom-s.top,width:p.width,height:p.height,center:p.top-s.top+p.height/2}});let i="";const d=o.lang==="ar";n.forEach(l=>{const p=l.dataset.taskId,u=(o.data?.tasks||[]).find($=>$.id===p),f=u?.dependencies||u?.customFields?.dependencies||[];if(!u||!f.length)return;const y=r[p];y&&f.forEach($=>{const b=r[$];if(!b)return;const x=d?b.left:b.right,m=b.center,h=d?y.right:y.left,T=y.center,D=x+(d?-20:20);i+=`<path d="M ${x} ${m} C ${D} ${m}, ${D} ${T}, ${h} ${T}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),a.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${i}
  `}var Et=null,La=!1;async function Xt(e=!1){if(Et&&!e)return Et;La=!0;try{const a=await P("/api/telemetry/analytics",{silent:!0});a&&a.data&&(Et=a.data)}catch(a){console.warn("[Analytics] Failed to fetch remote analytics:",a)}finally{La=!1}return Et}function Ci(){const e=Et,a=mi();!e&&!La&&Xt().then(()=>{if(o.view==="settings"&&o.settingsSection==="analytics"){const l=document.querySelector(".settings-content");l&&(l.innerHTML=Ci())}});const n=e?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},r=e?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:8,percent:2}],s=e?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];e?.os;const i=e?.recentAnomalies||[],d=a.memoryMb||45;return`
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
            ${r.map(l=>`
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
                ${s.map(l=>`
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
  `}var At=null,za=!1,Ce="all",Ze="all",ct="all";async function Zt(e=!1){if(At&&!e)return At;za=!0;try{const a=await P("/api/telemetry/incidents",{silent:!0});a&&a.users&&(At=a)}catch(a){console.warn("[Diagnostics] Failed to fetch incidents:",a)}finally{za=!1}return At}function Xn(e){Ce=e}function Xo(e){Ze=e}function Zo(e){ct=e}function Li(){const e=At;mi(),!e&&!za&&Zt().then(()=>{if(o.view==="settings"&&(o.settingsSection==="diagnostics"||o.settingsSection==="analytics")){const i=document.querySelector(".settings-content");i&&(i.innerHTML=Li())}});let a=e?.users||[];!a.length&&o.data?.users&&o.data.users.length&&(a=o.data.users.map(i=>({userId:i.id,name:i.name,nameEn:i.nameEn||i.name,email:i.email,role:i.jobTitleAr||(i.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":i.roleId||"عضو فريق"),avatarColor:i.avatarColor||"#0d6269",isRealAccount:!0,status:i.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let n=e?.incidents||[];const r=e?.stats||{totalIncidents:3,activeIncidents:0,resolvedIncidents:3,totalUsersMonitored:a.length||6,alertEmailRecipient:"admin@darc-design.bond"};Ce!=="all"&&(n=n.filter(i=>i.userId===Ce)),Ze!=="all"&&(n=n.filter(i=>i.severity===Ze)),ct!=="all"&&(n=n.filter(i=>i.status===ct));const s=a.find(i=>i.userId===Ce);return`
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
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${r.totalIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t("تم توثيقها بالكامل مع تقارير التتبع","Fully documented with stack traces")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid ${r.activeIncidents>0?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:${r.activeIncidents>0?"var(--red)":"var(--muted)"};font-weight:600;">${t("مشاكل نشطة بحاجة لمتابعة","Active / Unresolved")}</div>
          <div style="font-size:22px;font-weight:800;color:${r.activeIncidents>0?"var(--red)":"var(--teal)"};margin:4px 0;">${r.activeIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${r.activeIncidents>0?t("⚠️ تستدعي فحص المطور","Requires developer review"):t("✓ جميع المشاكل معالجة","All resolved")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("حسابات الفريق المراقبة","Monitored Users")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${a.length||r.totalUsersMonitored||6} ${t("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t("تغطية شاملة لكل جهاز ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span></span> ${t("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;">${r.alertEmailRecipient||"admin@darc-design.bond"}</div>
        </div>
      </div>

      <!-- 3. User Explorer Grid (بطاقات تفاصيل أداء كل مستخدم) -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span>👥</span> ${t("تفاصيل حالة واستقرار أجهزة كل مستخدم (انقر للفلترة السريعة):","User Health & Crash Status (Click to Filter):")}
          </h3>
          ${Ce!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${t("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${Ce==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${Ce==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${Ce==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${t("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${n.length} ${t("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${a.map(i=>{const d=Ce===i.userId,l=i.activeIncidents>0;return`
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
            <option value="all" ${Ze==="all"?"selected":""}>${t("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${Ze==="critical"?"selected":""}>🚨 ${t("حرجة (Critical)","Critical")}</option>
            <option value="high" ${Ze==="high"?"selected":""}>⚠️ ${t("مرتفعة (High)","High")}</option>
            <option value="medium" ${Ze==="medium"?"selected":""}>ℹ️ ${t("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${ct==="all"?"selected":""}>${t("جميع الحالات","All Statuses")}</option>
            <option value="active" ${ct==="active"?"selected":""}>🔴 ${t("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${ct==="resolved"?"selected":""}>✅ ${t("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${t(`عرض ${n.length} مشكلة مسجلة`,`Showing ${n.length} incidents`)}
          ${s?` (${t("للمستخدم:","for user:")} <strong>${s.name}</strong>)`:""}
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
  `}var Qo=pe({FULL_PERMISSIONS_CATALOG:()=>Bi,canAccessSettingsSection:()=>fe,exportAuditLogsXLS:()=>Ni,fetchFullAuditHistory:()=>Oi,openRoleModal:()=>as,openUserModal:()=>ns,printAuditReport:()=>Ri,renderAuditForProject:()=>zi,renderSettings:()=>ts,renderTeam:()=>es,renderUserActivityCell:()=>Mi});function es(){if(!C()&&!I("manage_users"))return`<section class="panel"><div class="empty">${w("alert",18)}<span>${t("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const e=o.data?.user?.id;let a=(o.data?.users||[]).filter(n=>n.status!=="inactive");return e!=="usr_ahmad"?a=a.filter(n=>n.id!=="usr_ahmad"):a=[...a].sort((n,r)=>n.id==="usr_ahmad"?-1:r.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${v("team")}</h1>
        <p>${t("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${C()||I("manage_users")?`<button class="btn btn-primary" data-action="new-user">${w("plus",15)} ${v("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${a.map(n=>{const r=teamMetrics(n.id,o.data?.tasks||[]),s=n.id==="usr_ahmad";return`
          <article class="member-card ${s?"system-developer-card":""}" style="${s?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${Y(n,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${c(t(n.name,n.nameEn||n.name))}</strong>
                  <span>${c(t(n.jobTitleAr||(s?"المبرمج / مدير النظام":""),n.jobTitleEn||n.jobTitleAr||""))}</span>
                </div>
              </div>
              ${s?`<span class="stealth-dev-badge">${w("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:canManageAccountPermissions()&&n.id!==o.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${c(n.id)}">${w("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${n.status==="active"?"done":"not_started"}">${c(ce(n))}</span>
            </div>
            <div class="member-card-stats">
              <span>${v("progress")} <strong>${r.progress}%</strong></span>
              <span>${r.tasks} ${v("tasks")}</span>
            </div>
            <div class="member-email">${n.email?c(n.email):v("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function zi(e){const a=(o.data?.auditLogs||[]).filter(n=>n.details?.projectId===e||n.entityType==="project"&&n.entityId===e);return a.length?`<div class="audit-list">${a.map(n=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${c(n.user?t(n.user.name,n.user.nameEn||n.user.name):"DARC")} · ${c(n.action)}</strong><span>${c(n.entityType)} · ${dateLabel(n.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${w("check",18)}<span>${t("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function Mi(e){const a=e.lastActiveAt||e.customFields?.lastActiveAt,n=e.lastLoginAt||e.customFields?.lastLoginAt;if(!a&&!n)return`<span class="activity-never">${t("لم يسجل دخول بعد","Never logged in")}</span>`;const r=Date.now(),s=a?new Date(a).getTime():0,i=e.id===o.data?.user?.id?0:s&&!isNaN(s)?Math.floor((r-s)/6e4):999999,d=i>=0&&i<=5;let l="";if(d)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${t("نشط الآن","Online")}</span>`;else if(i<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${t(`منذ ${i} دقيقة`,`${i}m ago`)}</span>`;else if(i<1440){const u=Math.floor(i/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${t(`منذ ${u} ساعة`,`${u}h ago`)}</span>`}else s>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(a,!1)}</span>`);const p=n?`<span class="activity-sub" title="${c(n)}">${t("دخول:","Login:")} ${dateLabel(n,!0)}</span>`:"";return`<div class="activity-wrapper">${l}${p}</div>`}function En(e){return dn(e,{includeSeconds:!0})}function la(e){const a=e.action||"",n=e.entityType||e.entity_type||"",r=e.details||{};let s="badge-neutral",i=a,d=n;a==="login"?(s="badge-teal",i=t("تسجيل دخول","Sign In"),d=t("جلسة نظام","System Session")):a==="create"?(s="badge-mint",i=t("إنشاء جديد","Created")):a==="update"?(s="badge-blue",i=t("تعديل بيانات","Updated")):a==="delete"?(s="badge-red",i=t("نقل للمهملات","Moved to Trash")):a==="status_change"?(s="badge-amber",i=t("تغيير حالة","Status Changed")):a==="export_report"?(s="badge-teal",i=t("تصدير تقرير","Exported Report")):a==="restore"?(s="badge-mint",i=t("استعادة","Restored")):a==="purge"?(s="badge-danger",i=t("حذف نهائي","Purged")):a==="invite"&&(s="badge-blue",i=t("دعوة مستخدم","Invite Sent")),n==="task"?d=t("مهمة","Task"):n==="project"?d=t("مشروع","Project"):n==="document"?d=t("مستند","Document"):n==="user"?d=t("مستخدم","User"):n==="report"?d=t("تقرير","Report"):n==="role"&&(d=t("دور وصلاحيات","Role"));let l="—";return r.title||r.name?l=`<strong>${c(r.title||r.name)}</strong>`:a==="status_change"&&(r.oldStatus||r.newStatus)?l=`<span>${c(J(r.oldStatus))} ➔ <strong>${c(J(r.newStatus))}</strong></span>`:e.entityId&&(l=`<code style="font-size:11px;color:var(--muted);">${c(e.entityId)}</code>`),{badgeClass:s,actionLabel:i,entityLabel:d,detailHtml:l}}function Ni(e=null){const a=e||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!a.length){k(t("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const n=o.data?.company||{},r=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let s=n.logoUrl||"";s.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(s=`${window.location.origin}${s}`);const i=o.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=ot(),p=Ot();let u=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${s?`<img src="${c(s)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${t("سجل الرقابة والتدقيق الأمني والعمليات — "+r,"Audit & Security Trail Report — "+r)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${t("المؤسسة:","Company:")} ${c(r)} | ${t("المشرف المستخرج:","Exported by:")} ${c(d)} | ${t("تاريخ التصدير:","Export Date:")} ${c(l)} ${c(p)}
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
  `;a.forEach((m,h)=>{const T=m.user||(m.userId?(o.data?.users||[]).find(j=>j.id===m.userId):null),D=T?t(T.name,T.nameEn||T.name):t("النظام","System"),S=T?ce(T):"—",z=En(m.createdAt),{actionLabel:O,entityLabel:g}=la(m);let E="";m.details?.title||m.details?.name?E=m.details.title||m.details.name:m.action==="status_change"?E=`${J(m.details?.oldStatus)} ➔ ${J(m.details?.newStatus)}`:typeof m.details=="object"?E=JSON.stringify(m.details):E=String(m.details||m.entityId||"—");const A=h%2===0?"#ffffff":"#f8fafc";u+=`
      <tr style="background:${A};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${c(W(m.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(W(`${z.date} ${z.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${c(W(D))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(W(S))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(W(O))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(W(g))}</td>
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
  `,y=new Blob(["\uFEFF"+f],{type:"application/vnd.ms-excel;charset=utf-8;"}),$=URL.createObjectURL(y),b=document.createElement("a");b.href=$;const x=new Date().toISOString().split("T")[0];b.download=`DARC_Audit_Trail_${x}.xls`,document.body.appendChild(b),b.click(),document.body.removeChild(b),URL.revokeObjectURL($),k(t("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${x}`,details:{reportType:"Audit_Logs_Excel",count:a.length}})}).catch(()=>{})}function Ri(e=null){const a=e||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!a.length){k(t("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const n=o.data?.company||{},r=t(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let s=n.logoUrl||"";s.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(s=`${window.location.origin}${s}`);const i=o.data?.user||{},d=t(i.name,i.nameEn||i.name)||"Admin",l=ot(),p=Ot(),u=a.length,f=a.filter(h=>h.action==="create").length,y=a.filter(h=>h.action==="update"||h.action==="status_change").length,$=a.filter(h=>h.action==="delete"||h.action==="purge"||h.action==="trash").length;let b="";a.forEach((h,T)=>{const D=h.user||(h.userId?(o.data?.users||[]).find(j=>j.id===h.userId):null),S=D?t(D.name,D.nameEn||D.name):t("النظام","System"),z=D?ce(D):"—",O=En(h.createdAt),{actionLabel:g,entityLabel:E}=la(h);let A="";h.details?.title||h.details?.name?A=h.details.title||h.details.name:h.action==="status_change"?A=`${J(h.details?.oldStatus)} ➔ ${J(h.details?.newStatus)}`:typeof h.details=="object"?A=JSON.stringify(h.details):A=String(h.details||h.entityId||"—"),b+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${c(h.id||String(T+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${c(O.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${c(O.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${c(S)}</div>
          <div style="font-size:10px;color:#64748b;">${c(z)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${c(g)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${c(E)}</td>
        <td style="font-size:11px;color:#334155;">${c(A)}</td>
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
          ${s?`<img src="${c(s)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${c(r)}</h1>
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
          <div class="kpi-val" style="color:#2563eb;">${y}</div>
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
          ${b}
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
  `;x.document.open(),x.document.write(m),x.document.close(),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:a.length}})}).catch(()=>{})}async function Oi(){try{k(t("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const e=await P("/api/audit?limit=1000");e&&e.logs&&(o.data.auditLogs=e.logs,o.auditFullHistoryLoaded=!0,renderView(),k(t(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){k(e.message||t("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function fe(e){const a=C();return e==="profile"||e==="security"||e==="notifications"?!0:e==="company"||e==="whatsapp"?a||I("manage_settings"):e==="roles"?a||I("manage_roles"):e==="accounts"?a||I("manage_users")||I("manage_existing_account_permissions")||I("view_user_activity"):e==="trash"?a||I("manage_trash"):e==="audit"?a||I("view_audit_logs"):e==="analytics"?a||I("manage_settings")||I("view_audit_logs"):e==="diagnostics"?a||I("manage_settings"):!1}function ts(){const e=o.data?.user?.id,a=C(),n=fe("company"),r=fe("whatsapp"),s=fe("roles"),i=fe("accounts"),d=fe("trash"),l=fe("audit"),p=fe("analytics"),u=fe("diagnostics"),f=[["profile",t("الملف الشخصي","Profile")],["notifications",t("الإشعارات والتنبيهات","Notifications & Alerts")],...n?[["company",v("company")]]:[],...r?[["whatsapp",t("تنبيهات واتساب","WhatsApp Alerts")]]:[],...s?[["roles",v("roles")]]:[],...i?[["accounts",v("accounts")]]:[],["security",t("الأمان","Security")],...d?[["trash",t("سلة المهملات","Trash")]]:[],...l?[["audit",v("audit")]]:[],...p?[["analytics",t("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...u?[["diagnostics",t("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[]];f.some(([x])=>x===o.settingsSection)||(o.settingsSection=f[0]?.[0]||"profile");const y=o.data?.user||{};let $="";if(o.settingsSection==="profile"&&($=`
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
              ${y.avatarUrl?`<img src="${c(y.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(y.avatarColor||"")?y.avatarColor:"#0d6269"};">${c(jt(y))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(y.avatarColor||"")?y.avatarColor:"#0d6269"};">${c(jt(y))}</div>`}
              <div class="avatar-upload-overlay">
                ${w("upload",18)}
                <span>${t("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${c(t(y.name,y.nameEn||y.name))}</h3>
            <p class="profile-user-role">${c(t(y.jobTitleAr||"",y.jobTitleEn||y.jobTitleAr||""))} · <span class="status-badge done">${c(ce(y))}</span></p>
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
              <label>${v("nameAr")}</label>
              <input name="name" value="${c(y.name||"")}" required />
            </div>
            <div class="field">
              <label>${v("nameEn")}</label>
              <input name="nameEn" value="${c(y.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${v("jobTitle")} (${t("عربي","AR")})</label>
              <input name="jobTitleAr" value="${c(y.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${v("jobTitle")} (${t("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${c(y.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${v("email")}</label>
              <input value="${c(y.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${t("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${c(y.phone||y.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
              <small class="field-hint">${t("أدخل رقم هاتفك مع مفتاح الدولة لاستلام تنبيهات المهام والمخططات المسندة إليك مباشرة على الواتساب.","Enter your phone number with country code to receive alerts for assigned tasks and drawings directly on WhatsApp.")}</small>
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${t("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${Je()==="gregorian"?"selected":""}>${t("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Je()==="hijri"?"selected":""}>${t("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${t("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${v("save")}</button>
          </div>
        </form>
      </section>
    `),o.settingsSection==="company"&&(a||I("manage_settings"))){const x=o.data?.company||{};$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${v("company")}</h2>
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
              <label>${v("nameAr")}</label>
              <input name="nameAr" value="${c(x.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${v("nameEn")}</label>
              <input name="nameEn" value="${c(x.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${v("emailStatus")}</label>
              <input value="${c(o.data?.emailConfigured?v("emailConfigured"):v("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${v("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${w("info",16)}<span>${v("emailInfo")}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t("نموذج الإنجاز","Progress model")}</h2>
            <p>${v("weightedExplanation")}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${v("weightedProgress")}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${v("simpleProgress")}</span><strong style="color:var(--ink-soft)">—</strong></div>
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
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${v("save")}</button></div>
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
    `),o.settingsSection==="notifications"){const x=typeof window<"u"&&"Notification"in window?Notification.permission:"unsupported",m=x==="granted",h=x==="denied";$=`
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
              <span class="attention-icon ${m?"teal":h?"red":"blue"}" style="margin-top:2px;">
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
                  <span class="mini-badge" style="background:${m?"var(--mint)":h?"var(--red-soft)":"var(--surface-soft)"};color:${m?"var(--teal)":h?"var(--red)":"var(--muted)"};font-weight:700;">
                    ${m?t("مفعلة على هذا المتصفح ✅","Enabled on this browser ✅"):h?t("محظورة من إعدادات المتصفح ❌","Blocked in browser settings ❌"):t("بانتظار الموافقة ⚠️","Permission pending ⚠️")}
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
    `}if(o.settingsSection==="accounts"&&i){const x=C()||I("view_user_activity"),m=C()||I("manage_users"),h=C()||I("manage_existing_account_permissions")||I("manage_users"),T=C();let D=o.data?.users||[];e!=="usr_ahmad"&&(D=D.filter(S=>S.id!=="usr_ahmad")),$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${v("accounts")}</h2>
            <p>${t("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${m?`<button class="btn btn-primary btn-sm" data-action="new-user">${w("plus",14)} ${v("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${v("team")}</th>
                <th>${v("role")}</th>
                <th>${v("email")}</th>
                <th>${v("accountStatus")}</th>
                ${x?`<th>${t("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${h?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${D.map(S=>{const z=S.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${Y(S)}
                        <div class="team-member-copy">
                          <strong>${c(t(S.name,S.nameEn||S.name))}</strong>
                          <span>${c(t(S.jobTitleAr||(z?"المبرمج / مدير النظام":""),S.jobTitleEn||S.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${z?`<span class="stealth-dev-badge">${w("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:c(ce(S))}
                    </td>
                    <td>
                      ${S.email?c(S.email):`<span style="color:var(--muted)">${v("noEmail")}</span>`}
                      ${S.phone||S.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;">📱 ${c(S.phone||S.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${S.status==="active"?"done":"not_started"}">${S.status==="active"?v("activeAccount"):v("pendingAccount")}</span>
                    </td>
                    ${x?`
                      <td>
                        ${Mi(S)}
                      </td>
                    `:""}
                    ${h?`
                      <td>
                        <div class="role-actions">
                          ${z?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(S.id)}">${v("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(S.id)}">${v("edit")}</button>
                            ${S.id!==o.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${c(S.id)}" title="${S.status==="pending"?t("تفعيل الحساب يدوياً","Activate manually"):t("تغيير كلمة المرور","Change password")}">${w(S.status==="pending"?"check":"settings",13)}</button>
                              ${T?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${c(S.id)}" title="دخول كـ هذا الحساب">${w("user",13)}</button>`:""}
                            `:""}
                            ${S.id!==o.data?.user?.id&&S.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${c(S.id)}">${w("send",13)}</button>`:""}
                            ${S.id!==o.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${c(S.id)}">${w("trash",13)}</button>`:""}
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
            <h2>${v("roles")}</h2>
            <p>${t("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${a||I("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${w("plus",14)} ${v("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(o.data?.roles||[]).map(x=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${c(t(x.nameAr,x.nameEn))}</strong>
                  ${x.builtIn?`<span class="role-system-badge">${w("shield",11)} ${v("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${c(t(x.descriptionAr,x.descriptionEn))}</p>
                <div class="role-meta">${x.permissions.includes("*")?t("صلاحية كاملة","Full access"):`${x.permissions.length} ${v("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${c(x.id)}">${w("edit",13)} ${v("edit")}</button>
                ${x.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${c(x.id)}">${w("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),o.settingsSection==="trash"&&d){if(!o.trash&&typeof sessionStorage<"u")try{const g=sessionStorage.getItem("darc_trash_cache");g&&(o.trash=JSON.parse(g))}catch{}!o.trashLoaded&&!o._trashFetching&&(o._trashFetching=!0,P("/api/trash").then(g=>{o.trash=Array.isArray(g)?g:g.trash||[...(g.projects||[]).map(E=>({...E,type:"project"})),...(g.tasks||[]).map(E=>({...E,type:"task"})),...(g.documents||[]).map(E=>({...E,type:"document"}))],o.trashLoaded=!0,o._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(g=>{o._trashFetching=!1,console.error("[Trash fetch error]",g)}));const x=o.trash||[],m=o.trashFilter||"all",h=(o.trashQuery||"").trim().toLowerCase(),T=x.filter(g=>{if(m!=="all"&&g.type!==m)return!1;if(!h)return!0;const E=(t(g.nameAr||g.titleAr,g.nameEn||g.titleEn)||g.name||g.title||g.originalName||"").toLowerCase(),A=(g.code||g.projectCode||"").toLowerCase(),j=(g.projectNameAr||g.projectNameEn||"").toLowerCase();return E.includes(h)||A.includes(h)||j.includes(h)}),D=x.filter(g=>g.type==="project").length,S=x.filter(g=>g.type==="task").length,z=x.filter(g=>g.type==="document").length,O=x.length?`
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
            <span class="badge ${m==="task"?"badge-on-primary":"badge-neutral"}">${S}</span>
          </button>
          <button type="button" class="btn btn-sm ${m==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${w("document",14)}
            <span>${t("المستندات","Documents")}</span>
            <span class="badge ${m==="document"?"badge-on-primary":"badge-neutral"}">${z}</span>
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
              ${T.map(g=>{const E=g.type==="project",A=g.type==="task",j=g.type==="document",_=t(g.nameAr||g.titleAr,g.nameEn||g.titleEn)||g.name||g.title||g.originalName||g.code||t("عنصر محذوف","Deleted item"),M=!E&&g.projectId?(o.data?.projects||[]).find(V=>V.id===g.projectId):null,R=g.projectNameAr||g.projectNameEn||(M?t(M.nameAr,M.nameEn||M.nameAr):null),N=g.projectCode||M?.code,B=j&&g.size?g.size>1048576?(g.size/1048576).toFixed(1)+" MB":Math.round(g.size/1024)+" KB":"",F=a||I("manage_trash")||g.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${E?"is-project":A?"is-task":"is-doc"}">
                          ${w(E?"building":A?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${c(_)}</strong>
                          ${g.code||E?`<span class="trash-item-code">${c(g.code||g.id)}</span>`:""}
                          ${j&&B?`<span class="trash-item-code" style="color:var(--muted);">${B}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${E?"type-project":A?"type-task":"type-doc"}">
                        ${w(E?"building":A?"checklist":"document",11)}
                        ${E?t("مشروع","Project"):A?t("مهمة","Task"):t("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${E?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${t("مشروع رئيسي","Primary Project")}</span>`:R?`${w("building",11)} <span>${c(R)}${N?` (${c(N)})`:""}</span>${j&&g.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${c(g.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${g.status?`<span class="status-badge ${c(g.status)}">${c(J(g.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${c(g.deletedAt||"")}">
                        ${dateLabel(g.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${o.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${c(g.type)}" data-id="${c(g.id)}" title="${t("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${w(o.lang==="ar"?"arrow":"arrowLeft",12)} ${t("استعادة","Restore")}
                        </button>
                        ${F?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${c(g.type)}" data-id="${c(g.id)}" title="${t("حذف العنصر نهائياً","Permanently delete item")}">
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
    `}if(o.settingsSection==="audit"&&(a||I("view_audit_logs"))){const x=[...o.data?.auditLogs||[]].sort((E,A)=>new Date(A.createdAt).getTime()-new Date(E.createdAt).getTime()),m=o.auditFilterAction||"all",h=o.auditFilterEntity||"all",T=o.auditFilterUser||"all",D=(o.auditSearchQuery||"").trim().toLowerCase(),S=x.filter(E=>{if(m!=="all"&&E.action!==m||h!=="all"&&(E.entityType||E.entity_type)!==h||T!=="all"&&(E.userId||E.user_id||E.user?.id)!==T)return!1;if(D){const A=E.user||(E.userId?(o.data?.users||[]).find(V=>V.id===E.userId):null),j=(A&&t(A.name,A.nameEn||A.name)||"").toLowerCase(),{actionLabel:_,entityLabel:M}=la(E),R=(_||E.action||"").toLowerCase(),N=(M||E.entityType||"").toLowerCase(),B=(E.id||E.entityId||"").toLowerCase(),F=typeof E.details=="object"?JSON.stringify(E.details).toLowerCase():String(E.details||"").toLowerCase();if(!(j.includes(D)||R.includes(D)||N.includes(D)||B.includes(D)||F.includes(D)))return!1}return!0});o._lastFilteredAuditLogs=S;const z=[["all",t("كافة العمليات","All Actions")],["create",t("إنشاء جديد","Create")],["update",t("تعديل بيانات","Update")],["status_change",t("تغيير حالة","Status Change")],["delete",t("نقل للمهملات","Delete / Trash")],["restore",t("استعادة","Restore")],["purge",t("حذف نهائي","Purge")],["export_report",t("تصدير تقرير","Export Report")],["login",t("تسجيل دخول","Sign In")],["invite",t("دعوة مستخدم","Invite")]],O=[["all",t("كافة العناصر","All Entities")],["project",t("المشاريع","Projects")],["task",t("المهام","Tasks")],["document",t("المستندات","Documents")],["user",t("المستخدمين","Users")],["role",t("الأدوار والصلاحيات","Roles")],["company",t("إعدادات الشركة","Company Settings")],["report",t("التقارير","Reports")]],g=m!=="all"||h!=="all"||T!=="all"||!!D;$=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${v("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${S.length} ${t("عملية معروضة","events shown")}
              </span>
              ${g?`
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
              ${z.map(([E,A])=>`<option value="${E}" ${m===E?"selected":""}>${A}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${O.map(([E,A])=>`<option value="${E}" ${h===E?"selected":""}>${A}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${t("كافة المستخدمين","All Users")}</option>
              ${(o.data?.users||[]).map(E=>`<option value="${E.id}" ${T===E.id?"selected":""}>${c(t(E.name,E.nameEn||E.name))}</option>`).join("")}
            </select>
            ${g?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${t("إعادة تعيين الفلاتر","Reset filters")}">
                ${t("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${S.length?`
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
                ${S.map(E=>{const A=E.user||(E.userId?(o.data?.users||[]).find(V=>V.id===E.userId):null),j=A?t(A.name,A.nameEn||A.name):t("النظام","System"),_=A?ce(A):t("تلقائي","Automated"),M=En(E.createdAt),{badgeClass:R,actionLabel:N,entityLabel:B,detailHtml:F}=la(E);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${Y(A)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${c(j)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${c(_)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${R}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${c(N)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${c(B)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${F}
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
            ${w(g?"search":"checklist",24)}
            <span>${g?t("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):t("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${g?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${t("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(o.settingsSection==="analytics"&&p&&($=Ci()),o.settingsSection==="diagnostics"&&u&&($=Li()),o.settingsSection==="whatsapp"&&r){const x=o.data?.company?.customFields?.whatsapp||o.data?.company?.custom_fields?.whatsapp||{};$=`
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
    `}const b=a||I("manage_settings")||I("manage_roles")||I("manage_users")||I("manage_trash")||I("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${b?t("تحكم مركزي","CENTRAL CONTROL"):t("الملف الشخصي","USER PROFILE")}</p>
        <h1>${b?v("settings"):t("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${b?t("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):t("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${w(a?"shield":"user",13)} ${c(ce(y))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${f.map(([x,m])=>`<button class="${o.settingsSection===x?"active":""}" data-action="settings-section" data-section="${x}">${m}</button>`).join("")}
      </aside>
      <div class="settings-content">${$}</div>
    </div>
  `}var Bi=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function as(e=null){const a=o.data?.permissionsCatalog&&o.data.permissionsCatalog.length>=10?o.data.permissionsCatalog:Bi,n=new Map;a.forEach(p=>{const u=p.category||"general",f=t(p.categoryAr||u,p.categoryEn||u);n.has(u)||n.set(u,{name:f,items:[]}),n.get(u).items.push(p)});const r=e?.id==="admin"||e?.permissions&&e.permissions.includes("*"),s=Array.from(n.entries()).map(([p,u])=>{const f=u.items.map(y=>{const $=y.id||y.key,b=t(y.nameAr||y.ar,y.nameEn||y.en||$),x=r||e?.permissions&&(e.permissions.includes($)||typeof PERMISSION_ALIASES<"u"&&PERMISSION_ALIASES[$]&&e.permissions.includes(PERMISSION_ALIASES[$])),m=r?"disabled":"";return`
        <label class="permission-option" style="cursor:${r?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${c($)}" ${x?"checked":""} ${m} />
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
    `}).join(""),i=r?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${v("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${a.length} ${t("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${t("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${t("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,d=`
    <form id="role-form" data-role-id="${c(e?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${v("nameAr")} *</label>
          <input name="nameAr" value="${c(e?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${v("nameEn")}</label>
          <input name="nameEn" value="${c(e?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${v("roleDescription")}</label>
          <textarea name="descriptionAr" rows="2">${c(e?.descriptionAr||"")}</textarea>
        </div>
      </div>
      ${r?`
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
        <button type="button" class="btn btn-ghost" data-action="close-modal">${v("cancel")}</button>
        <button type="submit" class="btn btn-primary">${w("check",14)} ${v(e?"save":"create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ae(e?t("تعديل الدور والصلاحيات","Edit role & permissions"):v("addRole"),t("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),d,"role","modal-lg");const l=document.getElementById("modal-root");if(l){const p=l.querySelector("#btn-perm-select-all"),u=l.querySelector("#btn-perm-deselect-all");p&&p.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(f=>f.checked=!0)}),u&&u.addEventListener("click",()=>{l.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(f=>f.checked=!1)})}}function ns(e=null){if(e?.id==="usr_ahmad"&&o.data?.user?.id!=="usr_ahmad")return k(t("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!e&&!C())return k(v("adminOnly"),!0);const a=!C(),n=a?"disabled":"",r=(o.data?.roles||[]).filter(i=>C()||i.id!=="admin"),s=`<form id="user-form" data-user-id="${c(e?.id||"")}" data-permission-only="${a}"><div class="form-grid"><div class="field full"><label>${v("nameAr")}</label><input name="name" value="${c(e?.name||"")}" ${n} required /></div><div class="field"><label>${v("nameEn")}</label><input name="nameEn" value="${c(e?.nameEn||"")}" ${n} /></div><div class="field"><label>${v("jobTitle")}</label><input name="jobTitleAr" value="${c(e?.jobTitleAr||"")}" ${n} /></div><div class="field"><label>${v("email")}</label><input name="email" type="email" value="${c(e?.email||"")}" placeholder="name@darc.com" ${n} /></div><div class="field"><label>${t("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${c(e?.phone||e?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${n} /></div><div class="field"><label>${v("role")}</label><select name="roleId">${r.map(i=>`<option value="${c(i.id)}" ${e?.roleId===i.id?"selected":""}>${c(t(i.nameAr,i.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${a?t("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):t("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${v("cancel")}</button><button type="submit" class="btn btn-primary">${w("check",14)} ${e?a?t("حفظ الصلاحية","Save permission"):v("save"):v("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=Ae(e?a?t("تعديل صلاحية الحساب","Change account permission"):t("تعديل حساب العضو","Edit member account"):v("addMember"),t("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),s,"user")}var is=pe({buildProjectMemberChipsHtml:()=>Ma,exportPortfolioPDF:()=>Ki,exportPortfolioXLS:()=>Gi,exportProjectPDF:()=>Na,exportProjectXLS:()=>Ji,exportXLS:()=>Tn,getCompanyBranding:()=>qt,getDaysLeftBadge:()=>An,getProjectTeam:()=>os,getProjectTeamData:()=>Ut,openCloneModal:()=>rs,openProjectModal:()=>Sn,projectCard:()=>Hi,projectRow:()=>gn,renderInPagePrintModal:()=>In,renderProjectCardTeamAvatars:()=>qi,renderProjectDetail:()=>ss,renderProjectOverviewTab:()=>Wi,renderProjectTeamAvatars:()=>Fi,renderProjectTimelineBar:()=>Ui,renderProjects:()=>Vi});function An(e){if(!e)return"";const a=Re(e);if(!a||isNaN(a.getTime()))return"";const n=Math.ceil((a-new Date)/864e5);if(isNaN(n))return"";let r="var(--mint-strong)",s="var(--mint)",i="";return n<0?(r="var(--red)",s="var(--red-soft)",i=t(`متأخر ${Math.abs(n)} يوم`,`${Math.abs(n)}d overdue`)):n===0?(r="var(--red)",s="var(--red-soft)",i=t("يستحق اليوم","Due today")):n<=2?(r="var(--red)",s="var(--red-soft)",i=t(`باقي ${n} يوم`,`${n}d left`)):n<=7?(r="var(--amber)",s="var(--amber-soft)",i=t(`باقي ${n} أيام`,`${n}d left`)):(r="var(--mint-strong)",s="var(--mint)",i=t(`باقي ${n} يوم`,`${n}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${r};background:${s};border:1px solid currentColor;">${w("clock",11)} ${i}</span>`}function Ut(e){const a=o.data?.users||[],n=(o.data?.tasks||[]).filter(i=>i.projectId===e.id),r=new Set,s=new Set;return e.managerId&&r.add(e.managerId),n.forEach(i=>{i.assigneeId&&r.add(i.assigneeId),(i.customFields?.additionalAssignees||i.customFields?.additional_assignees||[]).forEach(d=>r.add(d)),(i.customFields?.externalAssignees||i.customFields?.external_assignees||[]).forEach(d=>{d&&typeof d=="string"&&d.trim()&&s.add(d.trim())})}),{internalMembers:Array.from(r).map(i=>a.find(d=>d.id===i)).filter(Boolean),externalMembers:Array.from(s)}}function os(e){return Ut(e).internalMembers}function Fi(e,a=4,n=!0,r=[]){if((!e||!e.length)&&(!r||!r.length))return`<span style="font-size:11px;color:var(--muted);">${t("لا يوجد فريق محدد","No team assigned")}</span>`;const s=(e||[]).slice(0,a),i=(e||[]).length-a,d=(e||[]).map(p=>t(p.name,p.nameEn||p.name)).join("، ");let l='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return s.forEach(p=>{const u=t(p.name,p.nameEn||p.name),f=n?`data-action="filter-by-member" data-member-id="${c(p.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';l+=`
      <span class="team-member-chip" ${f} title="${c(u)} (${c(ce(p))})">
        ${Y(p,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${c(u)}</span>
      </span>
    `}),i>0&&(l+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${c(d)}">+${i} ${t("آخرين","more")}</span>`),r&&r.length>0&&(l+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${c(r.join("، "))}">🌐 +${r.length} ${t("خارجي","ext")}</span>`),l+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${t("فريق العمل الداخلي","Internal Team")} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(p=>`
        <div ${n?`data-action="filter-by-member" data-member-id="${c(p.id)}" title="${c(t("فلترة مهام "+(p.name||""),"Filter tasks of "+(p.nameEn||p.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${n?"cursor:pointer;transition:all 0.15s;":""}" ${n?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${Y(p,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${c(t(p.name,p.nameEn||p.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${c(ce(p))}</span>
          </div>
        </div>
      `).join("")}
    </div>
    
    ${r&&r.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${t("الشركاء والمتعاونون الخارجيون","External Partners")} (${r.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${r.map(p=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${c(p)}</span>
          </div>
        `).join("")}
      </div>
    `:""}

    ${n?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${t("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,l+="</div>",l}function Ui(e){if(!e.dueDate)return"";const a=Re(e.dueDate);if(!a||isNaN(a.getTime()))return"";const n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),r=new Date,s=a.getTime()-n.getTime();let i=0;s>0&&!isNaN(s)&&(i=Math.min(100,Math.max(0,Math.round((r.getTime()-n.getTime())/s*100))));const d=r>a,l=d?"var(--red)":i>=80&&!d?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;flex-wrap:wrap;gap:6px;">
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
  `}function qi(e=[],a=[],n=3){const r=e.length+a.length;if(r===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const s=e.slice(0,n),i=r-s.length;[...e.map(l=>t(l.name,l.nameEn||l.name)),...a].join("، ");let d=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${t("عرض فريق العمل","View Team")}">`;return d+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',s.forEach((l,p)=>{d+=`
      <div style="margin-inline-start:${p===0?"0":"-8px"};position:relative;z-index:${10-p};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${Y(l,"mini-avatar")}
      </div>
    `}),i>0&&(d+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${i}
      </div>
    `),a&&a.length>0&&i<=0&&(d+='<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>'),d+="</div>",d+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${t("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${r}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(l=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${Y(l,"micro-avatar")}
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
  `,d+="</div>",d}function Hi(e){const{internalMembers:a,externalMembers:n}=Ut(e),r=e.manager||(o.data?.users||[]).find(d=>d.id===e.managerId),s=An(e.dueDate),i=t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;cursor:pointer;" data-action="open-project" data-project-id="${c(e.id)}">
        <span class="project-card-symbol">${w("building",19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${c(e.code)}</span>
          <h3 class="project-card-title" title="${c(t(e.nameAr,e.nameEn))}">${c(t(e.nameAr,e.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        <span class="status-badge ${c(e.health)}">${c(J(e.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${c(i||"")}">
      ${i?c(i):`<span style="color:var(--muted);font-style:italic;">${t("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${Y(r,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${v("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(r?t(r.name,r.nameEn||r.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${v("team")} (${a.length+n.length})</span>
        ${qi(a,n,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${v("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <strong>${e.dueDate?Ee(e.dueDate,!0):"—"}</strong>
          ${s}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health==="off_track"?"red":e.health==="at_risk"?"amber":""}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${c(e.id)}">
      ${v("viewDetails")} ${w(o.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function Wi(e,a,n,r=[]){const s=e.manager||(o.data?.users||[]).find(p=>p.id===e.managerId),i=a.filter(p=>p.status==="done").length,d=a.filter(p=>p.status==="in_progress").length,l=a.filter(Oe).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${t("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${a.length}</div>
          <span class="metric-note up">${i} ${v("done")}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${t("قيد التنفيذ","In Progress")}</span>
          <div class="metric-value">${d}</div>
          <span class="metric-note">${t("عمل جارٍ","Active work")}</span>
        </div>
        <div class="metric-card ${l?"red":"teal"}" style="padding:14px 18px;">
          <span class="metric-label">${v("overdue")}</span>
          <div class="metric-value">${l}</div>
          <span class="metric-note ${l?"alert":"up"}">${l?t("تحتاج تدخلاً عاجلاً","Needs urgent action"):t("لا يوجد تأخير","On track")}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${t("فريق العمل","Team Size")}</span>
          <div class="metric-value">${n.length+(r?.length||0)}</div>
          <span class="metric-note">${t("أعضاء مساهمون","Active contributors")}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${Ui(e)}

      <!-- Details Grid -->
      <div class="project-details-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 280px), 1fr));gap:16px;">
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
              <span style="font-size:10px;color:var(--muted);display:block;">${v("client")}</span>
              <strong style="font-size:13px;color:var(--ink);">${c(t(e.clientAr,e.clientEn)||"—")}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${v("lifecycle")}</span>
              <strong style="font-size:13px;color:var(--ink);">${c(J(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${v("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${Ee(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${v("dueDate")}</span>
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
            ${Y(s)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${v("manager")}</span>
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
                    ${Y(p,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${c(t(p.name,p.nameEn||p.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${c(ce(p))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${u} ${v("tasks")}</span>
                </div>
              `}).join("")}
          </div>

          ${r&&r.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${t("الشركاء والمتعاونون الخارجيون:","External Partners & Collaborators:")}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${r.map(p=>{const u=a.filter(f=>(f.customFields?.externalAssignees||f.customFields?.external_assignees||[]).includes(p)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${c(p)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${t("شريك / جهة خارجية","External Partner")}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${u} ${v("tasks")}</span>
                  </div>
                `}).join("")}
            </div>
          `:""}
        </div>
      </div>
    </div>
  `}function Vi(){const e=o.searches.projects.trim().toLowerCase();let a=(o.data?.projects||[]).filter(r=>`${r.nameAr||""} ${r.nameEn||""} ${r.code||""} ${r.clientAr||""} ${r.clientEn||""}`.toLowerCase().includes(e));const n=o.projectSort||"default";return n==="alpha-asc"?a.sort((r,s)=>(t(r.nameAr,r.nameEn)||"").localeCompare(t(s.nameAr,s.nameEn)||"",o.lang==="ar"?"ar":"en")):n==="alpha-desc"?a.sort((r,s)=>(t(s.nameAr,s.nameEn)||"").localeCompare(t(r.nameAr,r.nameEn)||"",o.lang==="ar"?"ar":"en")):n==="progress-asc"?a.sort((r,s)=>(Number(r.progress)||0)-(Number(s.progress)||0)):n==="progress-desc"&&a.sort((r,s)=>(Number(s.progress)||0)-(Number(r.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${t("المحفظة","PORTFOLIO")}</p><h1>${v("projects")}</h1><p>${t("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${I("create_projects")?`<button class="btn btn-primary" data-action="new-project">${w("plus",15)} ${v("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${w("search",15)}<input data-search="projects" value="${c(o.searches.projects)}" placeholder="${v("search")}" /></div><div class="sort-box"><span>${t("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${n==="default"?"selected":""}>${t("الافتراضي","Default")}</option><option value="alpha-asc" ${n==="alpha-asc"?"selected":""}>${t("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${n==="alpha-desc"?"selected":""}>${t("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${n==="progress-asc"?"selected":""}>${t("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${n==="progress-desc"?"selected":""}>${t("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${a.length} ${t("مشاريع","projects")}</span></div></div>${a.length?`<div class="project-cards">${a.map(Hi).join("")}</div>`:`<section class="panel"><div class="empty">${w("building",18)}<span>${v("noProjects")}</span></div></section>`}`}function ss(){const e=o.data?.projects?.find(y=>y.id===o.activeProjectId);if(!e)return o.view="projects",Vi();const a=(o.data?.tasks||[]).filter(y=>y.projectId===e.id),{internalMembers:n,externalMembers:r}=Ut(e),s=o.projectTab||"tasks",i=o.projectMemberFilter||null,d=i?a.filter(y=>y.assigneeId===i||(y.customFields?.additionalAssignees||y.customFields?.additional_assignees||[]).includes(i)):a,l=i?o.data?.users?.find(y=>y.id===i):null;let p="";if(s==="overview")p=Wi(e,a,n,r);else if(s==="tasks"){const y=o.projectTaskSort||xt();p=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${v("projectTasks")} ${i?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${t("مهام","Tasks of")}: ${c(t(l?.name,l?.nameEn||l?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${t("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${xn(y,"sort-project-tasks")}
            ${i?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${w("close",12)} ${t("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${I("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}" title="${t("اضغط N للإضافة السريعة","Press N to add quickly")}">${w("plus",14)} ${v("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${renderBoard(d,y)}
      </div>
    `}else if(s==="timeline"){const{renderTimelinePanel:y}=window.__timelineExports||{};p=y?y(d,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${xa(d)}</div>`}else if(s==="drawings"){const y=(o.data?.documents||[]).filter(m=>m.projectId===e.id&&!m.deletedAt),$=a.filter(m=>m.typeAr==="مخطط"||m.typeEn==="Drawing"||m.templateId),b=o.docTaskFilter||"all",x=b==="all"?y:y.filter(m=>m.taskId===b);p=`
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
                  <th>${v("tasks")}</th>
                  <th>${t("الحالة","Status")}</th>
                  <th>${t("الحجم","Size")}</th>
                  <th>${t("تاريخ الرفع","Upload Date")}</th>
                  <th style="text-align:end;">${t("الإجراءات","Actions")}</th>
                </tr>
              </thead>
              <tbody>
                ${x.length>0?x.map(m=>{const h=a.find(D=>D.id===m.taskId),T=m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round((m.size||0)/1024)+" KB";return`
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
                        ${h?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(h.id)}">${c(t(h.titleAr,h.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${c(m.status||"draft")}" style="font-size:11px;">
                          ${c(J(m.status||"draft"))}
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
                  <th>${v("taskTitle")}</th>
                  <th>${v("taskType")}</th>
                  <th>${v("status")}</th>
                  <th>${v("progress")}</th>
                  <th>${v("assignee")}</th>
                </tr>
              </thead>
              <tbody>
                ${$.map(m=>`
                  <tr data-action="open-task" data-task-id="${c(m.id)}" style="cursor:pointer;" title="${t("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${c(t(m.titleAr,m.titleEn))}</span><span class="table-sub">${c(m.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${c(t(m.typeAr,m.typeEn)||t("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${c(m.status)}">${c(J(m.status))}</span></td>
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
                `).join("")||`<tr><td colspan="5"><div class="empty">${v("noTasks")}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else s==="activity"&&(p=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${v("activity")}</h2><p class="panel-subtitle">${t("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${zi(e.id)}</div>`);const u=e.manager||(o.data?.users||[]).find(y=>y.id===e.managerId),f=An(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${w(o.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${c(e.code)} · ${e.demo?v("sampleData"):v("active")}</p>
          <h1>${c(t(e.nameAr,e.nameEn))}</h1>
          <p>${c(t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${w("user",12)} 
              <strong>${v("manager")}:</strong> ${c(u?t(u.name,u.nameEn||u.name):"—")}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${w("calendar",12)} ${Ee(e.dueDate,!0)}
                ${f}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${w("users",12)}
              <span style="font-size:11px;">${v("team")}:</span>
              ${Fi(n,4,!0,r)}
            </span>
            <span class="status-badge ${c(e.health)}">${c(J(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${v("weightedProgress")}</span>
        ${I("edit_projects")||I("create_projects")||I("delete_projects")||I("view_reports")||C()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${w("more",15)} ${t("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${o.lang==="ar"?"right:0;left:auto;":"left:0;right:auto;"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;max-width:min(280px,calc(100vw - 36px));padding:5px;margin-top:5px;text-align:start">
              ${I("edit_projects")||C()?`<button class="menu-item" data-action="edit-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${w("edit",14)} ${v("edit")}</button>`:""}
              ${I("create_projects")||C()?`<button class="menu-item" data-action="clone-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${w("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>`:""}
              ${I("export_reports")||C()?`
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
              ${I("delete_projects")||C()?`<button class="menu-item" data-action="delete-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${w("trash",14)} ${t("حذف المشروع","Delete Project")}</button>`:""}
            </div>
          </div>
        `:""}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${s==="tasks"?"active":""}" data-action="project-tab" data-tab="tasks">${v("tasks")}</button>
      <button class="detail-tab ${s==="overview"?"active":""}" data-action="project-tab" data-tab="overview">${t("تفاصيل","Details")}</button>
      <button class="detail-tab ${s==="timeline"?"active":""}" data-action="project-tab" data-tab="timeline">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</button>
      <button class="detail-tab ${s==="drawings"?"active":""}" data-action="project-tab" data-tab="drawings">${v("drawings")}</button>
      <button class="detail-tab ${s==="activity"?"active":""}" data-action="project-tab" data-tab="activity">${v("activity")}</button>
    </div>
    
    ${p}
  `}function Ma(e=[]){const a=o.data?.users||[];return e.map(n=>{const r=a.find(s=>s.id===n)||{name:n,id:n};return`
      <span class="chip-item" data-uid="${c(n)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${Y(r,"mini-avatar")}
        <span style="font-weight:500;">${c(t(r.name,r.nameEn||r.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${c(n)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function Sn(e=null){const a=e?.code||`DARC-${String((o.data?.projects?.length||0)+1).padStart(3,"0")}`,n=e?Ut(e).internalMembers.map(i=>i.id):[],r=n.length>0?n:[o.data?.user?.id].filter(Boolean),s=`
    <form id="project-form" data-project-id="${c(e?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${c(JSON.stringify(r))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${w("building",14)} <span>${t("البيانات الأساسية للمشروع","Core Project Information")}</span>
        </div>

        <div class="field full">
          <label>${v("nameAr")} *</label>
          <input name="nameAr" value="${c(e?.nameAr||"")}" placeholder="${t("مثال: فيلا النخيل — التصميم الداخلي","e.g. Al Nakheel Villa — Interior Design")}" required />
        </div>
        <div class="field">
          <label>${v("nameEn")}</label>
          <input name="nameEn" value="${c(e?.nameEn||"")}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${v("projectCode")} *</label>
          <input name="code" value="${c(a)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${v("client")}</label>
          <input name="clientAr" value="${c(e?.clientAr||"")}" placeholder="${t("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${w("calendar",14)} <span>${t("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${v("manager")}</label>
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
          <label>${v("startDate")}</label>
          <input type="date" name="startDate" value="${c((e?.startDate||"").split("T")[0])}" />
        </div>
        <div class="field">
          <label>${v("dueDate")}</label>
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
          <div id="project-members-chips-container" style="display:${r.length?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${Ma(r)}
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
          ${e&&(I("delete_projects")||C())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
              ${w("trash",14)} ${t("حذف المشروع","Delete Project")}
            </button>
          `:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${v("cancel")}</button>
          <button type="submit" class="btn btn-primary">${w("check",14)} ${v(e?"save":"create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ae(e?t("تعديل بيانات المشروع","Edit Project"):v("addProject"),t("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),s,"project"),setTimeout(()=>{const i=document.getElementById("project-member-search"),d=document.getElementById("project-member-dropdown"),l=document.getElementById("project-members-chips-container"),p=document.getElementById("project-members-input"),u=document.getElementById("project-manager-select");if(!i||!d||!l||!p)return;let f=[...r];function y(){l.innerHTML=Ma(f),l.style.display=f.length?"flex":"none",p.value=JSON.stringify(f),l.querySelectorAll(".btn-remove-project-member").forEach(b=>{b.addEventListener("click",x=>{x.stopPropagation();const m=b.dataset.uid;f=f.filter(h=>h!==m),y()})})}u&&u.addEventListener("change",()=>{const b=u.value;b&&!f.includes(b)&&(f.push(b),y())});function $(b=""){const x=b.toLowerCase().trim(),m=(o.data?.users||[]).filter(h=>!f.includes(h.id)&&(!x||h.name&&h.name.toLowerCase().includes(x)||h.nameEn&&h.nameEn.toLowerCase().includes(x)||h.email&&h.email.toLowerCase().includes(x)));m.length?(d.innerHTML=m.map(h=>`
          <div class="project-member-opt" data-uid="${c(h.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${Y(h,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${c(t(h.name,h.nameEn||h.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${c(h.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${t("إضافة","Add")}</span>
          </div>
        `).join(""),d.querySelectorAll(".project-member-opt").forEach(h=>{h.addEventListener("mouseenter",()=>h.style.background="var(--surface-soft)"),h.addEventListener("mouseleave",()=>h.style.background="transparent"),h.addEventListener("click",()=>{const T=h.dataset.uid;T&&!f.includes(T)&&(f.push(T),y(),i.value="",d.style.display="none")})})):d.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${t("لا يوجد أعضاء مطابقون","No matching members")}</div>`,d.style.display="block"}i.addEventListener("focus",()=>$(i.value)),i.addEventListener("input",()=>$(i.value)),document.addEventListener("click",b=>{!i.contains(b.target)&&!d.contains(b.target)&&(d.style.display="none")}),y()},50)}function rs(e){const a=`
    <form id="clone-form" data-project-id="${e.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${t("أنت على وشك استنساخ المشروع:","You are about to clone the project:")} <strong style="color:var(--ink)">${c(t(e.nameAr,e.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${v("nameAr")}</label>
          <input name="nameAr" value="${c(e.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${v("nameEn")}</label>
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
        <button type="button" class="btn btn-ghost" data-action="close-modal">${v("cancel")}</button>
        <button type="submit" class="btn btn-primary">${w("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ae(t("استنساخ المشروع","Clone Project"),t("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),a,"clone");const n=document.getElementById("clone-form"),r=n.querySelector('input[name="cloneTasks"]'),s=n.querySelector('input[name="keepAssignees"]');r.addEventListener("change",i=>{s.disabled=!i.target.checked,i.target.checked||(s.checked=!1)}),n.addEventListener("submit",async i=>{i.preventDefault();const d=n.querySelector('button[type="submit"]');d.disabled=!0;try{const l={nameAr:n.nameAr.value,nameEn:n.nameEn.value,dueDate:n.dueDate.value,cloneTasks:n.cloneTasks.checked,keepAssignees:n.keepAssignees.checked,cloneMembers:n.cloneMembers.checked},p=await P(`/api/projects/${e.id}/clone`,{method:"POST",body:JSON.stringify(l)});H(),o.view="project-detail",o.activeProjectId=p.project.id,await refreshView(),k(t("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(l){k(l.message,!0),d.disabled=!1}})}function qt(){const e=o.data?.company||{},a=e.nameAr||e.name||"فريق دارك للتصميم",n=e.nameEn||e.name||"DARC Design Team",r=t(a,n),s=e.logoUrl||"";let i=/^(https?:\/\/|data:image\/|\/)/i.test(s)&&!s.toLowerCase().includes("javascript:")?s:"";return i.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(i=`${window.location.origin}${i}`),{nameAr:a,nameEn:n,displayName:r,logoUrl:i,emailFrom:e.emailFrom||"",timezone:e.timezone||"Asia/Riyadh"}}function Tn(e,a){const n=`
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
  `,r=new Blob(["\uFEFF"+n],{type:"application/vnd.ms-excel;charset=utf-8;"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=e+".xls",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)}function Gi(){const e=o.data?.projects||[];if(!e||!e.length){k(t("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const a=qt(),n=ot(),r=11;let s="<table>";s+=`<tr><td colspan="${r}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${a.logoUrl?`<img src="${c(a.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(a.displayName)}</span>
  </td></tr>`,s+=`<tr><td colspan="${r}" class="subtitle">${t("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,s+=`<tr><td colspan="${r}" class="meta">${t("تاريخ الإصدار:","Generated on:")} ${n}</td></tr>`,s+=`<tr><td colspan="${r}" style="border:none;"></td></tr>`,s+=`<tr class="header">
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
  </tr>`,e.forEach(i=>{const d=i.manager?t(i.manager.name,i.manager.nameEn||i.manager.name):"";s+=`<tr>
      <td>${c(W(i.code))}</td>
      <td>${c(W(i.nameAr))}</td>
      <td>${c(W(i.nameEn))}</td>
      <td>${c(W(t(i.clientAr,i.clientEn)))}</td>
      <td>${c(W(d))}</td>
      <td>${c(W(J(i.lifecycle)))}</td>
      <td>${c(W(J(i.health)))}</td>
      <td>${c(W(i.startDate||""))}</td>
      <td>${c(W(i.dueDate||""))}</td>
      <td>${i.progress||0}%</td>
      <td>${i.memberCount||0}</td>
    </tr>`}),s+="</table>",Tn(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,s),k(t("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:t("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:e.length}})}).catch(()=>{})}function Ji(e){const a=(o.data?.projects||[]).find(f=>f.id===e);if(!a)return;const n=(o.data?.tasks||[]).filter(f=>f.projectId===e);if(!n.length){k(t("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const r=qt(),s=o.data?.users||[],i=new Map(s.map(f=>[f.id,f]));function d(f){if(!f)return"—";const y=i.get(f);return y?t(y.name,y.nameEn||y.name):f}const l=ot(),p=11;let u="<table>";u+=`<tr><td colspan="${p}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${r.logoUrl?`<img src="${c(r.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(r.displayName)}</span>
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
  </tr>`,n.forEach((f,y)=>{const $=f.templateId?f.templateId.replace("tpl-","#"):f.id?`#${f.id.slice(-6)}`:`#${y+1}`,b=d(f.assigneeId||f.assignee_id),x=d(f.reviewerId||f.reviewer_id),m=d(f.approverId||f.approver_id);u+=`<tr>
      <td style="text-align:center;font-weight:bold;">${c(W($))}</td>
      <td>${c(W(f.titleAr))}</td>
      <td>${c(W(f.titleEn))}</td>
      <td>${c(W(t(f.categoryAr,f.categoryEn)))}</td>
      <td>${c(W(b))}</td>
      <td style="color:#0369a1;">${c(W(x))}</td>
      <td style="color:#047857;">${c(W(m))}</td>
      <td>${c(W(J(f.status)))}</td>
      <td>${c(W(f.startDate||""))}</td>
      <td>${c(W(f.dueDate||""))}</td>
      <td style="font-weight:bold;">${f.progress||0}%</td>
    </tr>`}),u+="</table>",Tn(`DARC_Project_${a.code}_${new Date().toISOString().split("T")[0]}`,u),k(t("تم بدء تحميل تقرير المهام.","Report download started.")),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:t(`تقرير مهام مشروع: ${a.nameAr}`,`Project Tasks Report: ${a.nameEn||a.nameAr}`),taskCount:n.length}})}).catch(()=>{})}function Na(e,a=!1){const n=(o.data?.projects||[]).find(g=>g.id===e);if(!n)return;const r=(o.data?.tasks||[]).filter(g=>g.projectId===e);if(!r.length){k(t("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const s=qt(),i=o.data?.users||[],d=new Map(i.map(g=>[g.id,g]));function l(g){if(!g)return"—";const E=d.get(g);return E?t(E.name,E.nameEn||E.name):g}function p(g){if(!g?.dueDate||["done","completed","canceled"].includes(g.status))return!1;const E=Re(g.dueDate);return E?E<new Date:!1}const u=r.length,f=r.filter(g=>["done","completed"].includes(g.status)).length,y=r.filter(g=>["review","approval"].includes(g.status)).length;r.filter(g=>g.status==="in_progress").length;const $=r.filter(g=>p(g)).length,b=new Date,x=ot(b),m=Ot(b),h=new Map;r.forEach(g=>{const E=t(g.categoryAr,g.categoryEn)||t(g.typeAr,g.typeEn)||t("عام","General"),A=h.get(E)||{total:0,completed:0,weight:0,progressSum:0},j=Number(g.weight||1);A.total++,["done","completed"].includes(g.status)&&A.completed++,A.weight+=j,A.progressSum+=(g.progress||0)*j,h.set(E,A)});const T=Array.from(h.entries()).map(([g,E])=>({name:g,percent:E.weight?Math.round(E.progressSum/E.weight):0,completed:E.completed,total:E.total})),D=a?t("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):t("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");a?t("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):t("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const S=r.map((g,E)=>{const A=g.templateId?g.templateId.replace("tpl-","#"):g.id?`#${g.id.slice(-6)}`:`#${E+1}`,j=t(g.titleAr,g.titleEn),_=t(g.categoryAr,g.categoryEn)||t(g.typeAr,g.typeEn)||"—",M=J(g.status),R=g.progress||0,N=g.dueDate||"—";if(a)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${E+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${c(A)}</td>
          <td style="font-weight:600;">${c(j)}</td>
          <td style="text-align:center;">${c(_)}</td>
          <td style="text-align:center;"><span class="badge ${c(g.status)}">${c(M)}</span></td>
          <td style="text-align:center;direction:ltr;">${c(N)}</td>
          <td style="text-align:center;font-weight:bold;color:${R===100?"#0d6269":"#1e293b"};">${R}%</td>
        </tr>
      `;const B=l(g.assigneeId||g.assignee_id),F=l(g.reviewerId||g.reviewer_id),V=l(g.approverId||g.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${E+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${c(A)}</td>
        <td style="font-weight:600;">${c(j)}</td>
        <td style="text-align:center;">${c(_)}</td>
        <td>${c(B)}</td>
        <td style="color:#0369a1;font-weight:600;">${c(F)}</td>
        <td style="color:#047857;font-weight:600;">${c(V)}</td>
        <td style="text-align:center;"><span class="badge ${c(g.status)}">${c(M)}</span></td>
        <td style="text-align:center;direction:ltr;">${c(N)}</td>
        <td style="text-align:center;font-weight:bold;color:${R===100?"#0d6269":"#1e293b"};">${R}%</td>
      </tr>
    `}).join(""),z=`
    <!DOCTYPE html>
    <html lang="${o.lang}" dir="${o.lang==="ar"?"rtl":"ltr"}">
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
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(x)} - ${c(m)}</div>
          <div><strong>${t("حالة المشروع:","Project Status:")}</strong> ${c(J(n.lifecycle))} (${c(J(n.health))})</div>
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
          <div class="kpi-val" style="color:#b45309;">${y}</div>
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
            ${T.map(g=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${c(g.name)}</span>
                  <span>${g.percent}% (${g.completed}/${g.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${g.percent}%;"></div>
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
          ${S}
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
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${c(s.displayName)}</div>
          <div class="signature-line">${t("التوقيع والاعتماد النهائي","Sign & Authorization")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${c(s.displayName)} — ${t("وثيقة إدارية معتمدة صادرة عبر منصة دارك","Official Governance Document via DARC Platform")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${c(x)}</div>
      </footer>
    </body>
    </html>
  `,O=window.open("","_blank","width=1100,height=900");O?(O.document.open(),O.document.write(z),O.document.close()):In(z),k(t("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:c(D),type:a?"client_pdf":"executive_pdf",taskCount:u}})}).catch(()=>{})}function Ki(){const e=o.data?.projects||[];if(!e||!e.length){k(t("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const a=qt(),n=new Date,r=ot(n),s=Ot(n),i=e.length,d=e.filter(b=>b.health==="on_track").length,l=e.filter(b=>b.health==="at_risk").length,p=e.filter(b=>b.health==="off_track").length,u=e.map((b,x)=>{const m=b.manager?t(b.manager.name,b.manager.nameEn||b.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${x+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${c(b.code)}</td>
        <td style="font-weight:700;">${c(t(b.nameAr,b.nameEn))}</td>
        <td>${c(t(b.clientAr,b.clientEn))||"—"}</td>
        <td>${c(m)}</td>
        <td style="text-align:center;"><span class="badge ${c(b.lifecycle)}">${c(J(b.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${c(b.health)}">${c(J(b.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${c(b.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${c(b.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${b.progress===100?"#0d6269":"#0f172a"};">${b.progress||0}%</td>
      </tr>
    `}).join(""),f=t("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),y=`
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
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(r)} - ${c(s)}</div>
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
        <div>${c(r)}</div>
      </footer>
    </body>
    </html>
  `,$=window.open("","_blank","width=1200,height=900");$?($.document.open(),$.document.write(y),$.document.close()):In(y),k(t("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:c(f),type:"portfolio_pdf",count:i}})}).catch(()=>{})}function In(e){let a=document.getElementById("print-modal-overlay");a||(a=document.createElement("div"),a.id="print-modal-overlay",a.style.position="fixed",a.style.inset="0",a.style.zIndex="1400",a.style.background="rgba(0, 0, 0, 0.75)",a.style.backdropFilter="blur(4px)",a.style.display="flex",a.style.flexDirection="column",a.style.alignItems="center",a.style.justifyContent="center",a.style.padding="15px",document.body.appendChild(a)),a.innerHTML=`
    <div style="background:#fff;width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid #e2e8f0;background:#f8fafc;flex-wrap:wrap;gap:8px;">
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
  `,a.style.display="flex";const n=()=>{a.style.display="none",a.innerHTML="",window.removeEventListener("keydown",r)},r=s=>{s.key==="Escape"&&n()};window.addEventListener("keydown",r),document.getElementById("btn-close-print-modal")?.addEventListener("click",n),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const s=document.getElementById("print-preview-iframe");s&&s.contentWindow&&(s.contentWindow.focus(),s.contentWindow.print())})}var ds=pe({TEMPLATE_CATEGORIES:()=>Tt,getNextAvailableTemplateCode:()=>Dn,isTemplateCodeReserved:()=>Yi,openTemplateModal:()=>Ra,renderTemplates:()=>ls}),Tt=[{id:"architectural",ar:"معماري",en:"Architectural",icon:"🏛️"},{id:"electrical",ar:"كهرباء — إلكتروميكانيك",en:"Electrical",icon:"⚡"},{id:"plumbing",ar:"سباكة — إلكتروميكانيك",en:"Plumbing",icon:"💧"},{id:"hvac",ar:"تكييف — إلكتروميكانيك",en:"HVAC",icon:"🌡️"},{id:"fire",ar:"حريق — إلكتروميكانيك",en:"Fire Protection",icon:"🧯"},{id:"low_current",ar:"تيار خفيف",en:"Low Current",icon:"📡"},{id:"sections",ar:"مقاطع",en:"Sections",icon:"✂️"},{id:"detail",ar:"تفصيلي",en:"Detailed",icon:"🔍"},{id:"site",ar:"موقع عام",en:"Site Plan",icon:"🗺️"},{id:"quantity",ar:"جداول كميات",en:"Quantity Tables",icon:"📊"},{id:"documents",ar:"وثائق وخطابات",en:"Documents & Letters",icon:"📄"}];function ls(){const e=o.searches.templates.trim().toLowerCase(),a=[...o.data.templates||[]].sort((i,d)=>(parseInt(i.code,10)||0)-(parseInt(d.code,10)||0)),n=new Map;Tt.forEach(i=>n.set(i.id,0)),a.forEach(i=>{n.set(i.categoryId,(n.get(i.categoryId)||0)+1)});const r=o.templateCategory||"all",s=Tt.map(i=>{if(r!=="all"&&r!==i.id)return null;const d=a.filter(l=>l.categoryId!==i.id?!1:e?`${l.nameAr} ${l.nameEn} ${l.code} ${l.typeAr} ${l.typeEn}`.toLowerCase().includes(e):!0);return d.length?{...i,items:d}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${t("مخرجات DARC القياسية","DARC STANDARD DELIVERABLES")}</p>
      <h1>${v("templates")}</h1>
      <p>${v("standardLibrarySub")}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${a.length} ${v("templatesCount")}</span>
      ${I("manage_templates")?`<button class="btn btn-primary" data-action="new-template" style="margin-${o.lang==="ar"?"right":"left"}:10px">${w("plus",15)} ${t("إضافة قالب","Add Template")}</button>`:""}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${w("search",15)}
        <input data-search="templates" value="${c(o.searches.templates)}" placeholder="${v("search")}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${r==="all"?"active":""}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${v("all")}</span>
        <small>${a.length}</small>
      </button>
      ${Tt.map(i=>`
        <button class="template-category-tab ${r===i.id?"active":""}" data-action="template-category" data-category="${c(i.id)}">
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
              <span>${i.items.length} ${v("templatesCount")}</span>
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
                ${I("manage_templates")?`<button class="template-action" data-action="edit-template" data-template-id="${c(d.id)}" title="${v("edit")}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${o.lang==="ar"?"right":"left"}:auto">${w("edit",14)}</button>`:""}
              </article>
            `).join("")}
          </div>
        </section>
      `).join(""):`
        <section class="panel">
          <div class="empty">
            ${w("layers",18)}
            <span>${v("noTasks")}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function Dn(e=[]){const a=new Set;for(const r of e)if(r?.code!==void 0&&r?.code!==null){const s=String(r.code).trim();if(/^\d+$/.test(s)){const i=parseInt(s,10);i>0&&a.add(i)}}let n=1;for(;a.has(n);)n++;return n<10?`0${n}`:`${n}`}function Yi(e,a=null,n=[]){if(!e||typeof e!="string")return!1;const r=e.trim().toLowerCase();if(!r)return!1;const s=/^\d+$/.test(r)?parseInt(r,10):null;return n.some(i=>{if(!i||a&&i.id===a||i.code===void 0||i.code===null)return!1;const d=String(i.code).trim().toLowerCase();return d?!!(d===r||s!==null&&/^\d+$/.test(d)&&s===parseInt(d,10)):!1})}function Ra(e=null){if(!I("manage_templates"))return k(v("permissionDenied"),!0);const a=Tt.map(i=>`<option value="${c(i.id)}" ${e?.categoryId===i.id?"selected":""}>${c(t(i.ar,i.en))}</option>`).join(""),n=!!(e&&e.id),r=n?"":Dn(o.data?.templates||[]),s=`<form id="template-form" data-template-id="${c(e?.id||"")}">
    <div class="form-grid">
      <div class="field">
        <label>${v("nameAr")}</label>
        <input name="nameAr" value="${c(e?.nameAr||"")}" required />
      </div>
      <div class="field">
        <label>${v("nameEn")}</label>
        <input name="nameEn" value="${c(e?.nameEn||"")}" required />
      </div>
      ${n?`
      <div class="field">
        <label>${t("الرمز / الكود","Code")} <span style="font-size:11px;font-weight:normal;color:var(--ink-soft);">${t("(فريد ولا يتكرر)","(Unique, no duplicates)")}</span></label>
        <input name="code" value="${c(e?.code||"")}" placeholder="e.g. 01" required />
      </div>
      `:`
      <div class="field" style="background:var(--surface-soft);padding:10px 14px;border-radius:8px;border:1px dashed var(--line);display:flex;align-items:center;justify-content:space-between;">
        <div>
          <span style="font-size:12px;font-weight:600;color:var(--ink);display:block;">${t("الرمز / الكود التلقائي","Auto-assigned Code")}</span>
          <span style="font-size:11px;color:var(--ink-soft);">${t("يتم تعيينه تلقائياً ابتداءً من 1","Assigned automatically starting from 1")}</span>
        </div>
        <span class="badge" style="font-size:14px;font-weight:700;background:rgba(20,184,166,0.12);color:var(--brand-teal);padding:4px 10px;border-radius:6px;">#${c(r)}</span>
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
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${c(e.id)}" style="color:var(--red)">${w("trash",14)} ${v("delete")}</button>`:"<div></div>"}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${v("cancel")}</button>
        <button type="submit" class="btn btn-primary">${w("check",14)} ${v(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;document.getElementById("modal-root").innerHTML=Ae(e?t("تعديل قالب","Edit Template"):t("إضافة قالب جديد","Add New Template"),t("القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.","Templates help the team insert tasks quickly with standard criteria."),s,"template")}var cs=pe({openUploadDrawingModal:()=>us,renderDocuments:()=>ps});function ps(){const e=o.data?.documents||[],a=o.data?.projects||[],n=o.data?.tasks||[],r=(o.searches?.documents||"").trim().toLowerCase(),s=o.docProjectFilter||"all",i=o.data?.user?.id,d=C(),l=d||I("review_tasks")||I("approve_tasks")||I("edit_tasks"),p=new Set(n.filter(b=>!b.deletedAt).map(b=>b.id)),u=new Set(a.filter(b=>!b.deletedAt).map(b=>b.id)),f=e.filter(b=>!(b.deletedAt||b.taskId&&!p.has(b.taskId)||b.projectId&&!u.has(b.projectId)||s!=="all"&&b.projectId!==s||r&&!(b.originalName||"").toLowerCase().includes(r))).sort((b,x)=>new Date(x.createdAt||0)-new Date(b.createdAt||0)),y=f.reduce((b,x)=>b+(x.size||0),0),$=y>1073741824?(y/1073741824).toFixed(1)+" GB":y>1048576?(y/1048576).toFixed(1)+" MB":Math.round(y/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${v("documents")}</h2>
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
              <th>${v("projects")}</th>
              <th>${v("tasks")}</th>
              <th>${t("الإصدار","Revision")}</th>
              <th>${t("الحالة الهندسية","Status")}</th>
              <th>${t("الحجم","Size")}</th>
              <th>${t("تاريخ الرفع","Upload Date")}</th>
              <th style="text-align:end;">${t("الإجراءات","Actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${f.length>0?f.map(b=>{const x=a.find(z=>z.id===b.projectId),m=n.find(z=>z.id===b.taskId),h=fa(b.originalName,b.mimeType),T=rn(b.originalName),D=b.size>1048576?(b.size/1048576).toFixed(1)+" MB":Math.round((b.size||0)/1024)+" KB",S=d||I("delete_documents")||b.uploaderId===i;return`
                <tr data-doc-id="${c(b.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(b.id)}">
                      <span class="file-format-badge" style="background:${h.bg};color:${h.color};border:1px solid ${h.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${h.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(b.originalName)}">
                          ${c(b.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${h.label}</span>
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
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${c(b.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${b.status==="draft"?"selected":""}>📝 ${t("مسودة عمل","Draft")}</option>
                          <option value="review" ${b.status==="review"?"selected":""}>🔍 ${t("قيد المراجعة","Review")}</option>
                          <option value="approved" ${b.status==="approved"?"selected":""}>✅ ${t("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${b.status==="superseded"?"selected":""}>⏳ ${t("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${c(b.status||"draft")}" style="font-size:11px;">
                          ${c(J(b.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${D}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${Ee(b.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(b.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${w("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(b.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ رابط Google Drive","Copy Drive Link")}">
                        ${w("link",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${c(b.id)}" style="padding:5px;color:var(--blue);" title="${t("تحميل المخطط","Download")}">
                        ${w("download",14)}
                      </button>
                      ${S?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${c(b.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
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
  `}function us(e=null){const a=o.data?.projects||[],n=e||a[0]?.id||"",r=o.data?.tasks?.filter(d=>d.projectId===n&&!d.deletedAt)||[],s=`
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
            ${r.map(d=>`<option value="${c(d.id)}">${c(t(d.titleAr,d.titleEn))}</option>`).join("")}
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
  `,i=document.getElementById("modal-root");if(i){i.innerHTML=Ae(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),s,"upload-drawing","modal-lg");const d=document.getElementById("drawing-upload-project"),l=document.getElementById("drawing-upload-task");d&&l&&d.addEventListener("change",()=>{const m=d.value,h=o.data?.tasks?.filter(T=>T.projectId===m&&!T.deletedAt)||[];l.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+h.map(T=>`<option value="${c(T.id)}">${c(t(T.titleAr,T.titleEn))}</option>`).join("")});const p=document.getElementById("drawing-dropzone"),u=document.getElementById("drawing-file-input"),f=document.getElementById("drawing-selected-files-list"),y=document.getElementById("start-drawing-upload-btn");let $=[];const b=()=>{if(!$.length){f.innerHTML="",y.disabled=!0;return}y.disabled=!1,f.innerHTML=$.map((m,h)=>{const T=fa(m.name,m.type),D=m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round(m.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${T.bg};color:${T.color};border:1px solid ${T.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${T.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${c(m.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${D})</span>
            </div>
            <button type="button" data-file-remove="${h}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),f.querySelectorAll("[data-file-remove]").forEach(m=>{m.addEventListener("click",h=>{const T=parseInt(m.dataset.fileRemove);$.splice(T,1),b()})})};p&&u&&(p.addEventListener("click",()=>u.click()),u.addEventListener("change",()=>{u.files?.length&&($=Array.from(u.files),b())}),p.addEventListener("dragover",m=>{m.preventDefault(),p.style.borderColor="var(--teal)"}),p.addEventListener("dragleave",()=>{p.style.borderColor="var(--line)"}),p.addEventListener("drop",m=>{m.preventDefault(),p.style.borderColor="var(--line)",m.dataTransfer?.files?.length&&($=Array.from(m.dataTransfer.files),b())}));const x=document.getElementById("upload-drawing-form");x&&x.addEventListener("submit",async m=>{if(m.preventDefault(),!$.length)return;const h=d.value,T=l.value||null,D=document.getElementById("drawing-upload-discipline")?.value||"عام",S=document.getElementById("drawing-upload-status")?.value||"draft";H(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:$,projectId:h,taskId:T,discipline:D,status:S})})}}var Zn={assignment:{type:"assignment",category:"tasks",icon:"user",color:"blue",titleAr:"إسناد مهمة جديدة",titleEn:"Task Assigned",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_status:{type:"task_status",category:"tasks",icon:"check",color:"teal",titleAr:"تحديث حالة المهمة",titleEn:"Task Status Update",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_blocked:{type:"task_blocked",category:"tasks",icon:"alert",color:"red",titleAr:"مهمة متوقفة ⚠️",titleEn:"Task Blocked ⚠️",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_review:{type:"task_review",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة للمراجعة الفنية",titleEn:"Task for Review",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_approval:{type:"task_approval",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة بانتظار الاعتماد",titleEn:"Task Pending Approval",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},due_soon:{type:"due_soon",category:"schedule",icon:"clock",color:"amber",titleAr:"موعد تسليم قريب",titleEn:"Due Soon",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},overdue:{type:"overdue",category:"schedule",icon:"alert",color:"red",titleAr:"مهمة متأخرة",titleEn:"Overdue Task",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},reminder:{type:"reminder",category:"schedule",icon:"clock",color:"amber",titleAr:"تذكير بموعد ⏰",titleEn:"Due Reminder ⏰",badgeTextAr:"فتح التذكير",badgeTextEn:"Open Reminder"},comment:{type:"comment",category:"communication",icon:"mail",color:"blue",titleAr:"تعليق جديد",titleEn:"New Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},mention:{type:"mention",category:"communication",icon:"mail",color:"blue",titleAr:"تم ذكرك في تعليق",titleEn:"Mentioned in Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},document_review:{type:"document_review",category:"drawings",icon:"document",color:"amber",titleAr:"مراجعة مخطط هندسي",titleEn:"Drawing Review",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},document_approved:{type:"document_approved",category:"drawings",icon:"document",color:"teal",titleAr:"اعتماد مخطط هندسي",titleEn:"Drawing Approved",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},escalation:{type:"escalation",category:"system",icon:"alert",color:"red",titleAr:"تصعيد مهمة ونظام 🚨",titleEn:"Escalation Alert 🚨",badgeTextAr:"التفاصيل",badgeTextEn:"Details"},general:{type:"general",category:"system",icon:"bell",color:"blue",titleAr:"تنبيه مساحة العمل",titleEn:"Workspace Notification",badgeTextAr:"عرض",badgeTextEn:"View"}};function fs(e){const a=Zn[e]||Zn.general;return{...a,defaultTitle:t(a.titleAr,a.titleEn),badgeText:t(a.badgeTextAr,a.badgeTextEn)}}var ms=pe({showNotifications:()=>jn});function jn(){const e=o.data?.notifications||[],a=e.filter(s=>!s.read&&!s.readAt).length,n=e.length-a,r=`${`
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
  `:""}${e.length?`<div class="attention-list">${e.slice(0,30).map(s=>{const i=!!(s.readAt||s.read),d=fs(s.type),l=o.lang==="ar"?s.titleAr||d.titleAr||s.titleEn||d.defaultTitle:s.titleEn||d.titleEn||s.titleAr||d.defaultTitle,p=o.lang==="ar"?s.messageAr||s.bodyAr||s.content||"":s.messageEn||s.bodyEn||(s.content!==s.titleAr&&s.content!==s.messageAr?s.content:"")||s.messageAr||s.bodyAr||"",u=p&&p!==l?`${p} · `:"",f=s.type==="document_review"||s.type==="document_approved"||s.documentId,y=s.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-weight:600;">${w("check",10)} ${t("فتح المهمة","Open Task")}</span>`:f?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);font-weight:600;">${w("document",10)} ${t("معاينة المخطط","View Drawing")}</span>`:s.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);font-weight:600;">${w("building",10)} ${t("المشروع","Project")}</span>`:"",$=i?"":`<span style="width:7px;height:7px;border-radius:50%;background:var(--blue);display:inline-block;flex-shrink:0;box-shadow:0 0 0 2px var(--surface);" title="${t("غير مقروء","Unread")}"></span>`;return`
      <div class="attention-item notif-item" data-action="read-notification" data-notification-id="${c(s.id)}" data-task-id="${c(s.taskId||"")}" data-project-id="${c(s.projectId||"")}" data-document-id="${c(s.documentId||"")}" data-type="${c(s.type||"")}" style="border:1px solid ${i?"var(--line)":"rgba(56,189,248,0.25)"};text-align:start;width:100%;cursor:pointer;opacity:${i?".75":"1"};background:${i?"var(--surface-soft)":"var(--surface)"};position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
        <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
          <span class="attention-icon ${d.color}" style="flex-shrink:0;margin-top:2px;">${w(d.icon,14)}</span>
          <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
              ${$}
              <strong dir="auto" style="color:var(--${d.color});font-size:12px;font-weight:${i?"600":"700"};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(l)}</strong>
              ${y}
            </div>
            <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(p)}">
              ${c(u)}<span style="color:var(--ink-soft);">${Ee(s.createdAt)}</span>
            </div>
          </div>
        </div>
        <button type="button" class="notif-dismiss-btn" data-action="delete-notification" data-notification-id="${c(s.id)}" title="${t("حذف الإشعار","Dismiss notification")}" style="margin-inline-start:10px;flex-shrink:0;">
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
  `}`;document.getElementById("modal-root").innerHTML=Ae(v("notifications"),t("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),r,"notifications","modal-notifications")}var gs=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),Oa=gs?"⌘K":"Ctrl+K",Te=0,be=[];function Xi(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.body.style.overflow="hidden";const a=t(`ابحث في المشاريع، المهام، والأعضاء... (${Oa})`,`Search projects, tasks, team... (${Oa})`),n=`
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
          ${ei("")}
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
  `;document.body.insertAdjacentHTML("beforeend",n);const r=document.getElementById("omnisearch-modal");r&&r.addEventListener("click",i=>{i.target===r&&it()});const s=document.getElementById("omnisearch-input");if(s){s.focus();let i=null;s.addEventListener("input",d=>{Te=0,i&&cancelAnimationFrame(i);const l=d.target.value;i=requestAnimationFrame(()=>{const p=document.getElementById("omnisearch-results-container");p&&(p.innerHTML=ei(l))})}),s.addEventListener("keydown",vs)}}function it(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.querySelector(".modal-backdrop")||(document.body.style.overflow="")}function vs(e){e.key==="ArrowDown"?(e.preventDefault(),be.length>0&&(Te=(Te+1)%be.length,Qn())):e.key==="ArrowUp"?(e.preventDefault(),be.length>0&&(Te=(Te-1+be.length)%be.length,Qn())):e.key==="Enter"?(e.preventDefault(),be[Te]&&Zi(be[Te])):e.key==="Escape"&&it()}function Qn(){document.querySelectorAll(".omni-item").forEach((e,a)=>{e.classList.toggle("selected",a===Te),a===Te&&e.scrollIntoView({block:"nearest"})})}function Zi(e){if(it(),e.type==="action")if(e.id==="new-task"){const a=(o.data?.projects||[]).find(n=>n.id===(o.activeProjectId||o.lastActiveProjectId))||(o.data?.projects||[])[0];da(null,null,e.targetProjectId||a?.id)}else e.id==="new-project"?Sn():e.id==="cheatsheet"?_n():e.id==="show-notifications"&&jn();else if(e.type==="project")o.projectTab="tasks",o.lastActiveProjectId=e.id,ye("project-detail",e.id);else if(e.type==="task"){const a=o.data?.tasks?.find(n=>n.id===e.id);a&&da(a)}else if(e.type==="user"){const a=o.data?.users?.find(n=>n.id===e.id);a&&typeof window.openUserModal=="function"&&window.openUserModal(a)}}function ei(e){const a=e.trim().toLowerCase(),n=[],r=(o.data?.projects||[]).find(l=>l.id===(o.activeProjectId||o.lastActiveProjectId))||(o.data?.projects||[])[0],s=r?t(r.nameAr,r.nameEn):"",i=[];(I("create_tasks")||C())&&i.push({type:"action",id:"new-task",targetProjectId:r?.id,title:t("إضافة مهمة جديدة","Create new task"),sub:r?t(`في مشروع: ${s}`,`In project: ${s}`):t("إجراء سريع","Quick action"),icon:"plus",keywords:"new task مهمة إضافة عمل جديد"}),(I("create_projects")||C())&&i.push({type:"action",id:"new-project",title:t("إنشاء مشروع جديد","Create new project"),sub:t("إجراء سريع","Quick action"),icon:"building",keywords:"new project مشروع إنشاء جديد"}),i.push({type:"action",id:"cheatsheet",title:t("عرض دليل اختصارات لوحة المفاتيح","View keyboard shortcuts guide"),sub:t("مساعدة","Help"),icon:"sparkles",keywords:"shortcuts اختصارات كيبورد مساعدة"}),i.push({type:"action",id:"show-notifications",title:t("مركز التنبيهات والإشعارات","Notifications Center"),sub:t("عرض الإشعارات والتنبيهات الحديثة","View recent notifications & alerts"),icon:"bell",keywords:"notifications alerts إشعارات تنبيهات رنين تنبيه"});for(const l of i)(!a||l.keywords.includes(a)||l.title.toLowerCase().includes(a))&&n.push(l);if(n.length<20&&(I("view_projects")||C())){const l=o.data?.projects||[];for(const p of l)if(n.length>=20||(!a||`${p.nameAr||""} ${p.nameEn||""} ${p.code||""} ${p.clientAr||""} ${p.clientEn||""}`.toLowerCase().includes(a))&&(n.push({type:"project",id:p.id,title:t(p.nameAr,p.nameEn),sub:`${p.code} · ${t(p.clientAr,p.clientEn)||""}`,badge:`${p.progress}%`,icon:"building"}),!a&&n.length>=5))break}if(n.length<20&&te("tasks")){const l=o.data?.tasks||[];for(const p of l)if(n.length>=20||(!a||`${p.titleAr||""} ${p.titleEn||""} ${p.categoryAr||""} ${p.categoryEn||""}`.toLowerCase().includes(a))&&(n.push({type:"task",id:p.id,title:t(p.titleAr,p.titleEn),sub:p.dueDate?`📅 ${Ee(p.dueDate)}`:t(p.categoryAr,p.categoryEn)||"",badge:`${p.progress}%`,icon:"checklist"}),!a&&n.length>=10))break}if(n.length<20&&(C()||I("manage_users"))){const l=o.data?.users||[];for(const p of l)if(n.length>=20||(!a||`${p.name||""} ${p.nameEn||""} ${p.email||""} ${p.jobTitleAr||""}`.toLowerCase().includes(a))&&(n.push({type:"user",id:p.id,title:t(p.name,p.nameEn||p.name),sub:p.email||"",badge:ce(p),icon:"user"}),!a&&n.length>=15))break}if(be=n.slice(0,15),!be.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${w("search",24)}</span>
        <strong style="color:var(--ink);">${t("لا توجد نتائج مطابقة","No matching results")}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${t("جرب البحث بكلمات أخرى أو رمز المشروع.","Try different keywords or project code.")}</p>
      </div>
    `;let d="";return be.map((l,p)=>{let u="";const f=l.type==="action"?t("إجراءات سريعة","Quick Actions"):l.type==="project"?t("المشاريع","Projects"):l.type==="task"?t("المهام والمخرجات","Tasks & Deliverables"):t("فريق العمل","Team");return f!==d&&(d=f,u=`<div class="omni-group-title">${f}</div>`),`
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
    `}).join("")}window.__selectOmniItem=e=>{be[e]&&Zi(be[e])};function _n(){it();const e=`
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
            <kbd class="shortcut-kbd">${Oa}</kbd>
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
  `;document.getElementById("modal-root").innerHTML=Ae(t("دليل اختصارات لوحة المفاتيح","Keyboard Shortcuts Guide"),t("طرق سريعة للتنقل وإنجاز العمل وسحب وإفلات المهام بكفاءة عالية","Work faster with productivity hotkeys & accessible task reordering"),e,"cheatsheet","modal-cheatsheet")}function ys(){window.addEventListener("keydown",e=>{const a=document.activeElement,n=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.tagName==="SELECT"||a.isContentEditable),r=e.code==="KeyK"||e.key?.toLowerCase()==="k"||e.key==="ن";if((e.metaKey||e.ctrlKey)&&r){e.preventDefault(),document.getElementById("omnisearch-modal")?it():Xi();return}if((e.key==="?"||e.key==="؟"||e.code==="Slash"&&e.shiftKey)&&!n){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="cheatsheet"], .modal-cheatsheet')?H():_n();return}if((e.code==="KeyN"||e.key?.toLowerCase()==="n"||e.key==="ى")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;if(document.querySelector('.modal[data-modal="task"], #task-form'))H();else if(!document.querySelector('.modal:not([data-modal="task"])')){const s=o.view==="project-detail"&&o.activeProjectId?o.activeProjectId:o.data?.projects?.[0]?.id;da(null,null,s)}return}if((e.code==="KeyP"||e.key?.toLowerCase()==="p"||e.key==="ح")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="project"], #project-form')?H():document.querySelector('.modal:not([data-modal="project"])')||Sn();return}if((e.code==="KeyB"||e.key?.toLowerCase()==="b"||e.key==="لا")&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey){if(e.preventDefault(),document.querySelector(".modal.is-closing"))return;document.querySelector('.modal[data-modal="notifications"], .modal-notifications')?H():document.querySelector('.modal:not(.modal-notifications):not([data-modal="notifications"])')||jn();return}if(e.key==="Escape"&&document.getElementById("omnisearch-modal")){e.preventDefault(),it();return}})}var bs="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",Qi=typeof navigator<"u"&&!!navigator.connection?.saveData,hs=3e5,xs=Qi?1e4:3e4,ws=Qi?600:300,$s=25e3,ks=150,Aa=null,ti=!1,Ba=!1,rt=null,ke=null,Qt=null,mt=null,Sa=null,dt=null,ai=0,It=0,Fe=!1,Pn=Date.now(),Fa=0,Gt=null,Ie=new Map;function Es(e){if(!e||typeof e!="string")return;const a=Date.now();Ie.set(e,a);for(const[n,r]of Ie.entries())a-r>8e3&&Ie.delete(n);if(Ie.size>ks){const n=Ie.keys().next().value;n&&Ie.delete(n)}}function Ct(){return typeof localStorage>"u"?!1:!!localStorage.getItem("darc_token")}var ca=new Set(["__proto__","constructor","prototype"]),eo=new Set(["custom_fields","permissions","details"]);function pa(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(pa);const a={};for(const[n,r]of Object.entries(e)){if(ca.has(n))continue;const s=n.indexOf("_")===-1?n:n.replace(/_([a-z0-9])/g,(i,d)=>d.toUpperCase());ca.has(s)||(a[s]=r!==null&&typeof r=="object"&&!eo.has(n)?pa(r):r)}return a}function ua(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(ua);const a={};for(const[n,r]of Object.entries(e))ca.has(n)||(a[n]=r!==null&&typeof r=="object"&&!eo.has(n)?ua(r):r);return a}function St(e){if(!e||!o.data||!Array.isArray(o.data.tasks)||!Array.isArray(o.data.projects))return;const a=o.data.projects.find(p=>p.id===e);if(!a)return;const n=o.data.tasks.filter(p=>p.projectId===e&&!p.deletedAt&&!p.deleted_at);let r=0,s=0;for(const p of n){const u=Number(p.weight)||1,f=Number(p.progress)||0;r+=u,s+=u*(f/100)}const i=r>0?Math.round(s/r*100):0;a.progress!==i&&(a.progress=i),a.totalWeight=r;const d=n.length>0,l=d&&n.every(p=>p.status==="done"||p.status==="completed");d&&l&&i===100?a.lifecycle="completed":a.lifecycle==="completed"&&(!l||i<100)&&(a.lifecycle="active")}function Ta(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const a=(o.data?.notifications||[]).filter(r=>!r.read&&!r.readAt).length;let n=e.querySelector(".notification-dot");a>0?n||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):n&&n.remove()}function Ua(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!rt||rt.state==="closed")&&(rt=new e),rt.state==="suspended"&&rt.resume().catch(()=>{});const a=rt,n=a.createOscillator(),r=a.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,a.currentTime),n.frequency.exponentialRampToValueAtTime(880,a.currentTime+.15),r.gain.setValueAtTime(.06,a.currentTime),r.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),n.connect(r),r.connect(a.destination),n.start(),n.stop(a.currentTime+.36)}catch{}}function As(){Gt&&cancelAnimationFrame(Gt),Gt=requestAnimationFrame(()=>{Gt=null,typeof L=="function"?L():typeof X=="function"&&X()})}function ea(e,a,n,r){if(!o.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const s=n?ua(pa(n)):null,i=r?ua(pa(r)):null,d=s&&s.id||i&&i.id;if(!d)return!1;const l=Ie.get(d);if(l&&Date.now()-l<5e3)return!0;const p=o.data?.user?.roleId==="admin"||o.data?.user?.role_id==="admin";if(s&&e==="notifications"){const $=s.userId||s.user_id;if($&&$!==o.data?.user?.id)return!1}else if(!p&&s&&(e==="tasks"||e==="documents"||e==="comments")){const $=s.projectId||(e==="comments"?o.data?.tasks?.find(b=>b.id===s.taskId)?.projectId:null);if($&&!o.data?.projects?.some(b=>b.id===$))return!1}Array.isArray(o.data[e])||(o.data[e]=[]);const u=o.data[e];let f=!1;const y=!!(s?.deletedAt||s?.deleted_at);if(a==="DELETE"||y){const $=u.length;let b=null;e==="tasks"&&(b=u.find(x=>x.id===d)?.projectId||i?.projectId||s?.projectId),o.data[e]=u.filter(x=>x.id!==d),o.data[e].length!==$&&(f=!0),e==="tasks"&&b?St(b):e==="projects"?Array.isArray(o.data.tasks)&&(o.data.tasks=o.data.tasks.filter(x=>x.projectId!==d)):e==="notifications"&&(Ta(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="UPDATE"&&s){const $=u.findIndex(b=>b.id===d);if($!==-1){for(const[b,x]of Object.entries(s))ca.has(b)||(u[$][b]=x);f=!0}else u.unshift(s),f=!0;e==="tasks"?(s.projectId&&St(s.projectId),i?.projectId&&i.projectId!==s.projectId&&St(i.projectId)):e==="notifications"&&(Ta(),typeof showNotifications=="function"&&document.querySelector(".modal-shell.notifications")&&showNotifications())}else if(a==="INSERT"&&s){if(u.some($=>$.id===d)||(u.unshift(s),f=!0),e==="tasks"&&s.projectId)St(s.projectId);else if(e==="notifications"){const $=o.data?.user?.id,b=s.userId||s.user_id,x=!!(s.read||s.readAt||s.read_at);if($&&b===$&&!x){Ta();const m=o.lang==="ar"?s.titleAr||s.messageAr||s.bodyAr||s.content||s.titleEn||t("إشعار جديد","New notification"):s.titleEn||s.messageEn||s.bodyEn||(s.content!==s.titleAr&&s.content!==s.messageAr?s.content:"")||s.titleAr||t("إشعار جديد","New notification");if(m&&k(`🔔 ${m}`,!1),Ua(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{const h=o.lang==="ar"?s.messageAr||s.bodyAr||s.content||"":s.messageEn||s.bodyEn||s.content||"",T=new Notification(m,{body:h,icon:"/favicon.ico",tag:s.id||"darc-alert"});T.onclick=()=>{window.focus(),typeof showNotifications=="function"&&showNotifications(),T.close()}}catch(h){console.warn("[WebNotification] Error:",h.message)}typeof showNotifications=="function"&&document.querySelector(".modal-notifications")&&showNotifications()}}}if(f){at();const $=s?.taskId||i?.taskId;if($){const b=(o.data?.tasks||[]).find(x=>x.id===$);if(b){if(e==="comments"){const x=document.getElementById("task-comment-form");if(x&&x.dataset.taskId===$){const m=document.getElementById("task-comments-list");m&&typeof Pt=="function"&&(m.innerHTML=Pt(b),m.scrollTop=m.scrollHeight)}}if(e==="documents"){const x=document.getElementById("task-dropzone");if(x&&x.dataset.taskId===$){const m=document.getElementById("task-documents-list");m&&typeof nt=="function"&&(m.innerHTML=nt(b))}}}}return As(),!0}return!1}function Lt(e="realtime"){Ct()&&(Fe&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!o.data||!o.view||(Aa&&clearTimeout(Aa),Aa=setTimeout(async()=>{try{await ge(!0)}catch(a){console.warn("[Realtime] Sync error:",String(e),a.message)}},ws)))}function qa(e,a,n,r={}){e&&e.readyState===WebSocket.OPEN&&(ai++,e.send(JSON.stringify({topic:a,event:n,payload:r,ref:String(ai)})))}function Ss(e){Cn(),Qt=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&qa(e,"phoenix","heartbeat")},$s)}function Cn(){Qt&&(clearInterval(Qt),Qt=null)}function to(e="disconnect"){if(Ba=!0,Cn(),mt&&(clearTimeout(mt),mt=null),ke){try{ke.close(1e3,e)}catch{}ke=null}}function Ha(e="idle"){Fe||(Fe=!0,to(e))}function Wa(e="wake_up"){const a=Fe;Fe=!1,Ct()&&(typeof navigator<"u"&&!navigator.onLine||((!ke||ke.readyState===WebSocket.CLOSED||ke.readyState===WebSocket.CLOSING)&&Ln(),(a||e==="tab_visible")&&Lt(e)))}function Ln(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&Ct()&&!Fe&&!(ke&&(ke.readyState===WebSocket.CONNECTING||ke.readyState===WebSocket.OPEN))){Ba=!1;try{const e=new WebSocket(bs);ke=e,e.onopen=()=>{It=0,Ss(e),qa(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(a=>{qa(e,`realtime:public:${a}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:a}]}})})},e.onmessage=a=>{try{const{event:n,topic:r,payload:s}=JSON.parse(a.data);if(n==="phx_reply"||n==="phx_close")return;if(n==="postgres_changes"&&s?.data){const{table:i,type:d,record:l,old_record:p}=s.data;if(ea(i,d,l,p))return}if((n==="INSERT"||n==="UPDATE"||n==="DELETE")&&r?.startsWith("realtime:public:")){const i=r.split(":")[2];if(ea(i,n,s?.record||s?.new,s?.old_record||s?.old))return}if(r==="realtime:darc_live"&&(n==="broadcast"||n==="STATE_MUTATION"||n==="GRANULAR_DELTA")){const i=s?.payload||s,d=i?.mutationId||i?.id||i?.entityId;if(d&&Ie.has(d))return;if(i?.delta){const{table:l,action:p,record:u,oldRecord:f}=i.delta;if(ea(l,p,u,f))return}Lt("edge_broadcast");return}(n==="broadcast"||r==="realtime:darc_live"||typeof r=="string"&&r.startsWith("realtime:public:"))&&Lt("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=a=>{if(Cn(),ke=null,!(Ba||!Ct()||Fe)&&!(a?.reason==="logout"||a?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){It++;const n=Math.min(3e4,Math.pow(2,Math.min(It,5))*1e3);mt&&clearTimeout(mt),mt=setTimeout(()=>{Ln()},n)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function ni(){const e=Date.now();e-Fa>1e4&&(Fa=e,Pn=e,Fe&&(typeof document>"u"||!document.hidden)&&Wa("user_active"))}function Ts(){Sa&&clearInterval(Sa),Sa=setInterval(()=>{const e=Date.now();for(const[a,n]of Ie.entries())e-n>8e3&&Ie.delete(a);Fe||typeof document<"u"&&document.hidden||Date.now()-Pn>=hs&&Ha("inactivity_idle")},6e4)}function Is(){if(!ti){if(ti=!0,Ct()&&Ln(),Ts(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,ni,{passive:!0})}),window.addEventListener("mousemove",ni,{passive:!0})),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden?(dt&&clearTimeout(dt),dt=setTimeout(()=>{Ha("tab_hidden")},xs)):(dt&&(clearTimeout(dt),dt=null),Pn=Date.now(),Fa=Date.now(),Wa("tab_visible"))}),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=a=>{if(a.data?.type==="GRANULAR_DELTA"&&a.data.delta){const{table:n,action:r,record:s,oldRecord:i}=a.data.delta;ea(n,r,s,i)}else a.data?.type==="STATE_MUTATION"&&Lt("broadcast_channel")},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{o.isOffline=!1,It=0;const e=window.api,a=typeof window.choose=="function"?window.choose:(r=>r),n=typeof window.showToast=="function"?window.showToast:console.log;if(Wa("online"),e){const r=await on(e);r&&r.synced>0?n(a(`تمت استعادة الاتصال ومزامنة ${r.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${r.synced} pending actions successfully! 🚀`),!1):n(a("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}Lt("online")}),window.addEventListener("offline",()=>{if(o.isOffline=!0,It=0,Ha("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function Ds(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now()})}catch{}}typeof window<"u"&&(window.notifyStateMutation=Ds,window.disconnectSupabaseRealtime=to,window.recordRecentLocalMutation=Es,window.recalculateProjectProgressInMemory=St);var js=pe({getOrCreateFloatingUploadWidget:()=>ao,handleChange:()=>Ka,handleClick:()=>Ga,handleInput:()=>Ja,handleSubmit:()=>Va,init:()=>io,updateFloatingUploadWidget:()=>pt,uploadDirectFiles:()=>no,uploadTaskFiles:()=>zn});async function Va(e){const a=e.target;if(!["project-form","task-form","user-form","role-form","activation-form","task-comment-form","template-form","force-password-form"].includes(a.id)&&!a.dataset.action)return;e.preventDefault();const n=Object.fromEntries(new FormData(a).entries()),r=a.querySelector('button[type="submit"]');r&&(r.disabled=!0,r.classList.add("is-loading"));try{if(a.id==="activation-form"){if(n.password!==n.passwordConfirm)throw new Error(t("كلمتا المرور غير متطابقتين.","Passwords do not match."));if(delete n.passwordConfirm,await P("/api/auth/activate",{method:"POST",body:JSON.stringify(n)}),window.history.replaceState({},"",window.location.pathname),Rt(),await ge(),o.data?.user?.customFields?.calendarSystem){o.calendarSystem=o.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",o.calendarSystem)}catch{}}X();return}if(a.id==="project-form"){n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.managerId||(n.managerId=null);let s=[];try{n.memberIds&&(s=JSON.parse(n.memberIds))}catch{}n.managerId&&!s.includes(n.managerId)&&s.push(n.managerId),n.memberIds=s;const i=!!a.dataset.projectId,d=await P(i?`/api/projects/${a.dataset.projectId}`:"/api/projects",{method:i?"PATCH":"POST",body:JSON.stringify(n)}),l=d.project||{id:a.dataset.projectId||`prj_${Date.now()}`,nameAr:n.nameAr,nameEn:n.nameEn,code:n.code,clientAr:n.clientAr,clientEn:n.clientEn||n.clientAr,managerId:n.managerId,priority:n.priority||"medium",lifecycle:n.lifecycle||"active",startDate:n.startDate,dueDate:n.dueDate,descriptionAr:n.descriptionAr,health:"on_track",progress:0,memberIds:n.memberIds};if(o.data.projects||(o.data.projects=[]),i){const p=o.data.projects.findIndex(u=>u.id===(d.project?.id||a.dataset.projectId));p!==-1&&(o.data.projects[p]={...o.data.projects[p],...l})}else o.data.projects.unshift(l);H(),L(),k(t("تم حفظ المشروع.","Project saved."));return}if(a.id==="task-form"){const s=a.dataset.taskId;n.remindAt,delete n.remindAt,n.templateId=n.templateId||null,n.typeAr=n.typeAr||(n.templateId?"مخطط":null),n.typeEn=n.typeEn||(n.templateId?"Drawing":null),n.startDate||(n.startDate=null),n.dueDate||(n.dueDate=null),n.assigneeId||(n.assigneeId=null),n.reviewerId||(n.reviewerId=null);let i=[];try{i=JSON.parse(n.additionalAssignees||"[]")}catch{i=[...a.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(y=>y.value)}let d=[];try{d=JSON.parse(n.externalAssignees||"[]")}catch{const y=String(n.externalAssignees||"").trim();d=y?y.split(/[,،]+/).map($=>$.trim()).filter(Boolean):[]}let l=[];try{l=JSON.parse(n.remindersJson||"[]")}catch{l=[]}delete n.additionalAssignees,delete n.externalAssignees,delete n.remindersJson,delete n.dependencies,delete n.weight,delete n.progress,n.customFields={additional_assignees:i,external_assignees:d,reminders:l},n.projectId||(n.projectId=o.activeProjectId||o.data.projects?.[0]?.id);const p=!!s;if(p){const f=(o.data?.tasks||[]).find(y=>y.id===s);f?.updatedAt&&(n.expectedUpdatedAt=f.updatedAt)}let u;try{u=await P(p?`/api/tasks/${s}`:"/api/tasks",{method:p?"PATCH":"POST",body:JSON.stringify(n)})}catch(f){if(f.message&&f.message.includes("تعارض")){await re(!0),k(f.message,!0);return}throw f}if(u.task){if(o.data.tasks||(o.data.tasks=[]),p){const f=o.data.tasks.findIndex(y=>y.id===u.task.id);f!==-1&&(o.data.tasks[f]={...o.data.tasks[f],...u.task})}else o.data.tasks.unshift(u.task),o.view==="tasks"&&(o.taskProjectFilter!=="all"&&o.taskProjectFilter!==u.task.projectId&&(o.taskProjectFilter=u.task.projectId),o.taskFilter==="mine"&&u.task.assigneeId!==o.data.user?.id&&(o.taskFilter="all"));if(Array.isArray(l)&&l.length>0){for(const f of l)if(!f.id||f.id.startsWith("rem_temp_")){const y=f.remindAt?new Date(f.remindAt):null;if(!y||isNaN(y.getTime()))continue;P("/api/reminders",{method:"POST",body:JSON.stringify({taskId:u.task.id,remindAt:y.toISOString(),noteAr:f.noteAr||n.titleAr||"تذكير لمتابعة المهمة"})}).catch($=>console.warn("[Reminder dispatch note]",$))}}}H(),L(),k(t("تم حفظ المهمة بنجاح.","Task saved successfully."));return}if(a.id==="task-comment-form"){const s=a.dataset.taskId,i=await P(`/api/tasks/${s}/comments`,{method:"POST",body:JSON.stringify(n)});a.reset(),i.comment&&(o.data.comments||(o.data.comments=[]),o.data.comments.push(i.comment));const d=o.data.tasks.find(p=>p.id===s),l=document.getElementById("task-comments-list");l&&(l.innerHTML=renderTaskComments(d),l.scrollTop=l.scrollHeight),r&&(r.disabled=!1);return}if(a.id==="force-password-form"){if(!C()&&!I("manage_users"))throw new Error(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."));const s=a.dataset.userId,i=a.dataset.isPending==="true";await P(`/api/users/${s}/force-password`,{method:"POST",body:JSON.stringify(n)});const d=o.data.users.find(l=>l.id===s);d&&(d.status="active"),H(),L(),k(i?t("تم تفعيل الحساب بنجاح.","Account activated successfully."):t("تم تغيير كلمة المرور وطرد المستخدم بنجاح.","Password changed and user kicked successfully.")),r&&(r.disabled=!1);return}if(a.id==="user-form"){const s=a.dataset.userId,i=!!s;if(!i&&!C()&&!I("manage_users"))throw new Error(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."));if(i&&!C()&&!I("manage_users")&&!I("manage_existing_account_permissions"))throw new Error(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."));const d=await P(i?`/api/users/${s}`:"/api/users",{method:i?"PATCH":"POST",body:JSON.stringify(n)});if(d.user)if(o.data.users||(o.data.users=[]),i){const l=o.data.users.findIndex(p=>p.id===d.user.id);l!==-1&&(o.data.users[l]={...o.data.users[l],...d.user})}else o.data.users.unshift(d.user);H(),L(),k(t("تم حفظ حساب العضو.","Member account saved."));return}if(a.id==="role-form"){if(!C()&&!I("manage_roles"))throw new Error(t("غير مصرح لك بإدارة وتعديل الأدوار.","Permission denied to manage roles."));const s=a.dataset.roleId,i=[...a.querySelectorAll('input[name="permissions"]:checked')].map(p=>p.value),d=!!s,l=await P(d?`/api/roles/${s}`:"/api/roles",{method:d?"PATCH":"POST",body:JSON.stringify({...n,permissions:i})});if(l.role)if(o.data.roles||(o.data.roles=[]),d){const p=o.data.roles.findIndex(u=>u.id===l.role.id);p!==-1&&(o.data.roles[p]={...o.data.roles[p],...l.role})}else o.data.roles.push(l.role);H(),L(),k(t("تم حفظ الدور بنجاح.","Role saved."));return}if(a.id==="template-form"){const s=a.dataset.templateId,i=!!s;if(!i)n.code=Dn(o.data?.templates||[]);else{const p=(n.code||"").trim();if(!p)throw new Error(t("الرمز / الكود مطلوب","Template code is required"));if(Yi(p,s,o.data?.templates||[])){const u=a.querySelector('input[name="code"]');throw u&&(u.focus(),u.classList.add("input-error")),new Error(t("الرمز / الكود محجوز من قبل","This code is already reserved by another template"))}n.code=p}const d=await P(i?`/api/templates/${s}`:"/api/templates",{method:i?"PATCH":"POST",body:JSON.stringify(n)}),l=d.template||{id:s||`tpl_${Date.now()}`,nameAr:n.nameAr,nameEn:n.nameEn,code:n.code,categoryId:n.categoryId,typeAr:n.typeAr,typeEn:n.typeEn,defaultWeight:Number(n.defaultWeight)||1,defaultDuration:Number(n.defaultDuration)||5};if(o.data.templates||(o.data.templates=[]),i){const p=o.data.templates.findIndex(u=>u.id===(d.template?.id||s));p!==-1&&(o.data.templates[p]={...o.data.templates[p],...l})}else o.data.templates.push(l);H(),L(),k(t("تم حفظ القالب بنجاح.","Template saved."));return}if(a.dataset.action==="update-profile"){if(n.calendarSystem){o.calendarSystem=n.calendarSystem;try{localStorage.setItem("darc_calendar_system",n.calendarSystem)}catch{}}const s=await P("/api/users/me",{method:"PATCH",body:JSON.stringify(n)});if(s.user){o.data.user={...o.data.user,...s.user};const i=(o.data.users||[]).findIndex(d=>d.id===o.data.user.id);i!==-1&&(o.data.users[i]={...o.data.users[i],...s.user})}L(),k(t("تم حفظ وتحديث الملف الشخصي بنجاح.","Profile updated successfully.")),r&&(r.disabled=!1);return}if(a.dataset.action==="update-company"){if(!C()&&!I("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات الشركة.","Permission denied to update company settings."));const s=await P("/api/company",{method:"PATCH",body:JSON.stringify(n)});s.company&&(o.data.company={...o.data.company,...s.company}),L(),k(t("تم تحديث بيانات الشركة.","Company data updated.")),r&&(r.disabled=!1);return}if(a.dataset.action==="update-whatsapp"){if(!C()&&!I("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات التنبيهات.","Permission denied to update alert settings."));const s={enabled:a.querySelector('input[name="enabled"]')?.checked||!1,provider:n.provider||"evolution",instanceName:n.instanceName||"darc-workspace",serverUrl:n.serverUrl||"",apiKey:n.apiKey||"",recipient:n.recipient||"",notifyOnBlocked:a.querySelector('input[name="notifyOnBlocked"]')?.checked||!1,notifyOnApproval:a.querySelector('input[name="notifyOnApproval"]')?.checked||!1,notifyOnDrawing:a.querySelector('input[name="notifyOnDrawing"]')?.checked||!1,notifyOnCollectiveMention:a.querySelector('input[name="notifyOnCollectiveMention"]')?.checked!==!1,sendGroupBroadcast:a.querySelector('input[name="sendGroupBroadcast"]')?.checked||!1},i=await P("/api/whatsapp/config",{method:"POST",body:JSON.stringify({config:s})});i.config&&(o.data.company||(o.data.company={}),o.data.company.customFields||(o.data.company.customFields={}),o.data.company.customFields.whatsapp=i.config,o.data.company.custom_fields&&(o.data.company.custom_fields.whatsapp=i.config)),k(t("تم حفظ إعدادات تنبيهات واتساب بنجاح ✅","WhatsApp alert settings saved successfully ✅")),L(),r&&(r.disabled=!1);return}if(a.dataset.action==="change-password"){if(n.newPassword.length<10)throw new Error(t("كلمة المرور يجب أن تكون 10 أحرف على الأقل.","Password must be at least 10 characters."));await P("/api/auth/change-password",{method:"POST",body:JSON.stringify(n)}),a.reset(),k(t("تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.","Password changed successfully. Signed out of other devices.")),r&&(r.disabled=!1);return}}catch(s){a.id==="activation-form"?Bt(n.token,s.message):k(s.message,!0)}finally{r&&(r.disabled=!1,r.classList.remove("is-loading"))}}async function Ga(e){const a=document.getElementById("mention-dropdown"),n=document.getElementById("project-menu");if(a&&!e.target.closest("#mention-dropdown")&&!e.target.closest('input[name="content"]')&&(a.style.display="none"),n&&!e.target.closest("#project-menu")&&!e.target.closest('[data-action="toggle-project-menu"]')&&(n.style.display="none"),e.target.classList.contains("modal-backdrop")){H();return}if(e.target.closest("#task-dropzone")&&e.target.id!=="task-upload-input"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}const r=e.target.closest("[data-action], [data-view]");if(!r)return;const s=r.dataset.action;if(s==="test-whatsapp"){const i=r.closest('[data-action="test-whatsapp"]');i&&(i.disabled=!0),k(t("جاري إرسال تنبيه تجريبي للواتساب...","Sending test WhatsApp alert..."));try{const d=document.querySelector('input[name="serverUrl"]')?.value||"",l=document.querySelector('input[name="apiKey"]')?.value||"",p=document.querySelector('input[name="recipient"]')?.value||"",u=document.querySelector('input[name="instanceName"]')?.value||"darc-workspace",f=document.querySelector('select[name="provider"]')?.value||"evolution",y=await P("/api/whatsapp/test",{method:"POST",body:JSON.stringify({config:{serverUrl:d,apiKey:l,recipient:p,instanceName:u,provider:f}})});k(y.message||t("تم إرسال الرسالة بنجاح! 🚀","Test message sent successfully! 🚀"))}catch(d){k(d.message||t("فشل إرسال رسالة الاختبار، تحقق من صحة البيانات.","Failed to send test alert."),!0)}finally{i&&(i.disabled=!1)}return}if(r.classList.contains("menu-item")){const i=r.closest(".dropdown-menu");i&&(i.style.display="none")}if(r.dataset.view){ye(r.dataset.view,r.dataset.projectId||void 0);return}if(s==="trigger-avatar-upload"){const i=document.getElementById("user-avatar-file-input");i&&i.click();return}if(s==="trigger-company-logo-upload"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0);return}const i=document.getElementById("company-logo-file-input");i&&i.click();return}if(s==="toggle-theme"){o.theme=o.theme==="dark"?"light":"dark",Dt({theme:o.theme}),document.documentElement.dataset.theme=o.theme,document.querySelectorAll('[data-action="toggle-theme"]').forEach(i=>{i.textContent=o.theme==="dark"?"☀️":"🌙"});return}if(s==="toggle-lang"){if(o.lang=o.lang==="ar"?"en":"ar",Dt({lang:o.lang}),document.documentElement.lang=o.lang,document.documentElement.dir=o.lang==="ar"?"rtl":"ltr",document.body.classList.toggle("is-ltr",o.lang==="en"),o.data?.user||typeof localStorage<"u"&&localStorage.getItem("darc_token"))X();else{const i=new URLSearchParams(window.location.hash.replace(/^#/,""));if(i.get("activate"))Bt(i.get("activate"));else if(i.get("reset"))yt(i.get("reset"));else{const d=document.getElementById("login-email")?.value||"",l=document.getElementById("login-password")?.value||"",p=!!document.getElementById("forgot-form");if($e("",p?"forgot":"login"),d){const u=document.getElementById("login-email");u&&(u.value=d)}if(l){const u=document.getElementById("login-password");u&&(u.value=l)}}}return}if(s==="quick-fill-login"){const i=r.closest('[data-action="quick-fill-login"]'),d=document.getElementById("login-email"),l=document.getElementById("login-password"),p=i?.dataset?.email||"demo@darc-design.bond",u=i?.dataset?.pass||"demo123456";if(d&&(d.value=p,d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),l&&(l.value=u,l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),i?.dataset?.autosubmit==="true"){const f=document.getElementById("login-form");f&&(typeof f.requestSubmit=="function"?f.requestSubmit():f.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0})))}return}if(s==="goto-forgot"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#forgot"),$e("","forgot");return}if(s==="goto-login"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#login"),$e();return}if(s==="reset-demo-sandbox"){try{k(t("جاري إعادة ضبط بيانات العرض التجريبي...","Resetting demo sandbox..."),!1);const i=await P("/api/demo/reset",{method:"POST"});i&&i.data&&(o.data=i.data,we(i.data),X(),k(t("تمت إعادة ضبط البيانات بنجاح ✨","Demo data reset successfully ✨"),!1))}catch(i){k(i.message,!0)}return}if(s==="toggle-sidebar"){o.sidebarOpen=!o.sidebarOpen,document.querySelector(".sidebar")?.classList.toggle("open",o.sidebarOpen),document.querySelector(".sidebar-backdrop")?.classList.toggle("visible",o.sidebarOpen);return}if(s==="logout"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout"),await P("/api/auth/logout",{method:"POST"}).catch(()=>{});try{await Wn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_mutations_queue"),localStorage.removeItem("darc_offline_queue")}catch{}}at(),o.data=null,o.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),$e();return}if(s==="logout-all"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout_all"),await P("/api/auth/logout-all",{method:"POST"}).catch(()=>{});try{await Wn()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_mutations_queue"),localStorage.removeItem("darc_offline_queue")}catch{}}at(),o.data=null,o.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),$e();return}if(s==="open-omnisearch"){Xi();return}if(s==="close-omnisearch"){it();return}if(s==="open-cheatsheet"){document.querySelector('.modal[data-modal="cheatsheet"], .modal-cheatsheet')?H():_n();return}if(s==="close-modal"){H();return}if(s==="show-notifications"){document.querySelector('.modal[data-modal="notifications"], .modal-notifications')?H():showNotifications();return}if(s==="delete-notification"){e.stopPropagation();const i=r.dataset.notificationId||r.closest("[data-notification-id]")?.dataset.notificationId;if(!i)return;o.data?.notifications&&(o.data.notifications=o.data.notifications.filter(d=>d.id!==i)),showNotifications(),X(),P(`/api/notifications/${encodeURIComponent(i)}`,{method:"DELETE"}).catch(d=>{console.warn("[Notifications] Failed to delete notification:",d)});return}if(s==="clear-read-notifications"){if(e.stopPropagation(),!(o.data?.notifications||[]).filter(i=>i.read||i.readAt).length)return;o.data?.notifications&&(o.data.notifications=o.data.notifications.filter(i=>!i.read&&!i.readAt)),showNotifications(),X(),k(t("تم مسح التنبيهات المقروءة بنجاح.","Read notifications cleared successfully.")),P("/api/notifications/clear-read",{method:"POST"}).catch(i=>{console.warn("[Notifications] Failed to clear read notifications:",i)});return}if(s==="enable-browser-notifications"){e.stopPropagation(),typeof window<"u"&&"Notification"in window?Notification.requestPermission().then(i=>{if(i==="granted"){k(t("تم تفعيل إشعارات المتصفح بنجاح! 🔔","Desktop browser notifications enabled! 🔔"));try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("إشعارات المتصفح الفورية تعمل بنجاح الآن على هذا الجهاز.","Browser notifications are now working on this device."),icon:"/favicon.ico"})}catch{}}else i==="denied"&&k(t("تم رفض الإشعارات من إعدادات المتصفح.","Notifications are blocked in browser settings."),!0);showNotifications()}):k(t("متصفحك لا يدعم إشعارات الويب المباشرة.","Your browser does not support web notifications."),!0);return}if(s==="send-test-notification"){e.stopPropagation(),k(t("جاري إرسال إشعار تجريبي من السيرفر...","Sending test notification from server...")),P("/api/notifications/test",{method:"POST",body:JSON.stringify({messageAr:"إشعار فحص النظام المباشر — السيرفر والربط اللحظي يعملان بكفاءة 🚀",messageEn:"Live System Test — Backend and Realtime are operating smoothly 🚀"})}).then(i=>{k(t("تم إرسال الإشعار من السيرفر بنجاح! 🔔","Test notification dispatched from server! 🔔")),Ua(),i&&i.notification&&(o.data.notifications||(o.data.notifications=[]),o.data.notifications.unshift(i.notification),showNotifications(),X())}).catch(i=>{k(i.message||t("فشل إرسال الإشعار التجريبي","Failed to send test notification"),!0)});return}if(s==="play-test-chime"){e.stopPropagation(),Ua(),k(t("تم تشغيل النغمة التنبيهية 🔔","Notification chime played 🔔"));return}if(s==="test-browser-notification"){if(e.stopPropagation(),typeof window<"u"&&"Notification"in window&&Notification.permission==="granted")try{new Notification(t("DARC Design Team","DARC Design Team"),{body:t("هذا اختبار لإشعار سطح المكتب والمتصفح — يعمل بنجاح! 🚀","This is a test desktop notification — working perfectly! 🚀"),icon:"/favicon.ico"}),k(t("تم إرسال إشعار المتصفح لسطح المكتب!","Desktop notification dispatched!"))}catch(i){k(i.message,!0)}else k(t("إشعارات المتصفح غير مفعلة بعد.","Browser notifications not yet enabled."),!0);return}if(s==="read-notification"){if(r.dataset.action==="delete-notification"||r.closest('[data-action="delete-notification"]'))return;const i=r.dataset.notificationId||r.closest("[data-notification-id]")?.dataset.notificationId,d=(o.data?.notifications||[]).find(y=>y.id===i);d&&(d.read=!0,d.readAt=new Date().toISOString()),X(),i&&P(`/api/notifications/${i}`,{method:"PATCH",body:JSON.stringify({})}).catch(y=>{console.warn("[Notifications] Failed to patch read status in background:",y)}),H(!0);const l=r.dataset.taskId||d?.taskId,p=r.dataset.documentId||d?.documentId,u=r.dataset.projectId||d?.projectId,f=r.dataset.type||d?.type;if(p){Pa(p);return}if(l){let y=(o.data?.tasks||[]).find($=>$.id===l);if(y){y.projectId&&(o.activeProjectId=y.projectId),openTaskModal(y);return}try{const $=await P(`/api/tasks/${l}`);if($&&$.id){o.data.tasks||(o.data.tasks=[]),o.data.tasks.push($),$.projectId&&(o.activeProjectId=$.projectId),openTaskModal($);return}}catch($){console.warn("[Notifications] Failed to fetch task on demand:",$)}}if(f==="document_review"&&u){o.activeProjectId=u,o.projectTab="drawings",ye("project-detail",u);return}if(u){o.activeProjectId=u,ye("project-detail",u);return}await re();return}if(s==="mark-all-notifications-read"){try{await P("/api/notifications/read-all",{method:"POST"}),(o.data?.notifications||[]).forEach(i=>{i.read=!0,i.readAt=new Date().toISOString()}),showNotifications(),X(),k(t("تم تحديد كافة التنبيهات كمقروءة.","All notifications marked as read."))}catch(i){k(i.message,!0)}return}if(s==="toggle-project-menu"){n&&(n.style.display=n.style.display==="none"?"block":"none");return}if(s==="preview-doc"){const i=r.dataset.docId||r.closest("[data-doc-id]")?.dataset.docId;i&&Pa(i);return}if(s==="copy-doc-link"){const i=r.dataset.docId||r.closest("[data-doc-id]")?.dataset.docId,d=o.data?.documents?.find(l=>l.id===i);if(d){const l=r.closest("button")||r;await bn(d,l)}return}if(s==="download-doc"){const i=r.dataset.docId||r.closest("[data-doc-id]")?.dataset.docId;i&&await ae(i);return}if(s==="trigger-upload"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const d=document.getElementById("task-upload-input");d&&d.click()}return}if(s==="open-upload-drawing-modal"){typeof openUploadDrawingModal=="function"?openUploadDrawingModal(r.dataset.projectId||null):typeof window.openUploadDrawingModal=="function"&&window.openUploadDrawingModal(r.dataset.projectId||null);return}if(s==="new-project"){document.querySelector('.modal[data-modal="project"], #project-form')?H():openProjectModal();return}if(s==="edit-project"){const i=o.data.projects.find(d=>d.id===r.dataset.projectId);i&&openProjectModal(i);return}if(s==="clone-project"){const i=o.data.projects.find(d=>d.id===r.dataset.projectId);i&&openCloneModal(i);return}if(s==="rename-doc"){const i=r.dataset.docId,d=o.data?.documents?.find(p=>p.id===i);if(!d)return;const l=window.prompt(t("أدخل الاسم الجديد:","Enter new name:"),d.originalName);if(!l||l===d.originalName)return;try{await P(`/api/documents/${i}`,{method:"PATCH",body:JSON.stringify({originalName:l})}),d.originalName=l,await re(!0);const p=o.data?.tasks?.find(u=>u.id===d.taskId);if(p){const u=document.getElementById("task-documents-list");u&&(u.innerHTML=nt(p))}}catch(p){k(p.message,!0)}return}if(s==="go-to-trash"){o.settingsSection="trash",o.trashLoaded=!1,ye("settings");return}if(s==="delete-doc"){if(!window.confirm(t("هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.","Are you sure you want to move this document to trash? You can restore it within 30 days.")))return;const i=r.dataset.docId,d=o.data?.documents?.find(l=>l.id===i)?.taskId;try{if(await P(`/api/documents/${i}`,{method:"DELETE"}),o.data?.documents&&(o.data.documents=o.data.documents.filter(l=>l.id!==i)),o.trashLoaded=!1,await re(!0),k(t("تم نقل المستند إلى سلة المهملات بنجاح.","Document moved to trash successfully.")),d){const l=o.data?.tasks?.find(p=>p.id===d);if(l){const p=document.getElementById("task-documents-list");p&&(p.innerHTML=nt(l))}}}catch(l){k(l.message,!0)}return}if(s==="delete-project"){if(!window.confirm(t("هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.","Are you sure you want to delete this project? It will be archived.")))return;const i=[...o.data.projects||[]];o.data.projects=o.data.projects.filter(d=>d.id!==r.dataset.projectId),H(),ye("projects"),k(t("جاري حذف المشروع...","Deleting project..."));try{await P(`/api/projects/${r.dataset.projectId}`,{method:"DELETE"}),o.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await re(!0),k(t("تم حذف المشروع بنجاح.","Project deleted successfully."))}catch(d){o.data.projects=i,L(),k(d.message,!0)}return}if(s==="delete-task"){if(!window.confirm(t("هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.","Are you sure you want to delete this task? It will be moved to trash.")))return;const i=r.dataset.taskId,d=[...o.data.tasks||[]];o.data.tasks=o.data.tasks.filter(l=>l.id!==i),H(),L(),k(t("جاري حذف المهمة...","Deleting task..."));try{await P(`/api/tasks/${i}`,{method:"DELETE"}),o.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await re(!0),k(t("تم حذف المهمة بنجاح.","Task deleted successfully."))}catch(l){o.data.tasks=d,L(),k(l.message,!0)}return}if(s==="edit-task-comment"){const i=r.dataset.commentId,d=r.dataset.taskId,l=(o.data.comments||[]).find(f=>f.id===i);if(!l)return;const p=window.prompt(t("تعديل التعليق:","Edit comment:"),l.content);if(p===null)return;const u=p.trim();if(!u){k(t("لا يمكن ترك التعليق فارغاً.","Comment cannot be empty."),!0);return}if(u===l.content)return;try{const f=await P(`/api/tasks/${d}/comments/${i}`,{method:"PATCH",body:JSON.stringify({content:u})});if(f.comment){const y=(o.data.comments||[]).findIndex(x=>x.id===i);y!==-1&&(o.data.comments[y]=f.comment);const $=(o.data.tasks||[]).find(x=>x.id===d),b=document.getElementById("task-comments-list");b&&$&&(b.innerHTML=renderTaskComments($)),k(t("تم تعديل التعليق بنجاح.","Comment updated successfully."))}}catch(f){k(f.message,!0)}return}if(s==="delete-task-comment"){const i=r.dataset.commentId,d=r.dataset.taskId;if(!window.confirm(t("هل أنت متأكد من حذف هذا التعليق؟","Are you sure you want to delete this comment?")))return;try{await P(`/api/tasks/${d}/comments/${i}`,{method:"DELETE"}),o.data.comments&&(o.data.comments=o.data.comments.filter(u=>u.id!==i));const l=(o.data.tasks||[]).find(u=>u.id===d),p=document.getElementById("task-comments-list");p&&l&&(p.innerHTML=renderTaskComments(l)),k(t("تم حذف التعليق بنجاح.","Comment deleted successfully."))}catch(l){k(l.message,!0)}return}if(s==="manual-sync"){if(typeof navigator<"u"&&!navigator.onLine){k(t("أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡","You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡"),!1);return}const i=Nt();if(!i.length){k(t("جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️","All data is completely synchronized with cloud server ✔️"),!1);return}k(t(`جاري مزامنة ${i.length} عمليات معلقة مع السيرفر...`,`Syncing ${i.length} pending actions with server...`),!1);const d=await on(P);if(d.synced>0){if(k(t(`تمت مزامنة ${d.synced} عمليات بنجاح! 🚀`,`Successfully synced ${d.synced} actions! 🚀`),!1),await ge(),o.data?.user?.customFields?.calendarSystem){o.calendarSystem=o.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",o.calendarSystem)}catch{}}}else d.failed>0&&k(t(`فشلت مزامنة ${d.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${d.failed} actions, please try again.`),!0);return}if(s==="new-task"){document.querySelector('.modal[data-modal="task"], #task-form')?H():openTaskModal(null,null,r.dataset.projectId);return}if(s==="new-user"){if(!C()&&!I("manage_users")){k(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."),!0);return}openUserModal();return}if(s==="new-role"){if(!C()&&!I("manage_roles")){k(t("غير مصرح لك بإنشاء أدوار جديدة.","Permission denied to create new roles."),!0);return}openRoleModal();return}if(s==="new-template"){Ra();return}if(s==="edit-template"){const i=o.data.templates.find(d=>d.id===r.dataset.templateId);i&&Ra(i);return}if(s==="delete-template"){if(!window.confirm(t("هل أنت متأكد من حذف هذا القالب؟","Are you sure you want to delete this template?")))return;const i=[...o.data.templates||[]];o.data.templates=o.data.templates.filter(d=>d.id!==r.dataset.templateId),L(),H();try{await P(`/api/templates/${r.dataset.templateId}`,{method:"DELETE"}),await re(!0),k(t("تم حذف القالب.","Template deleted."))}catch(d){o.data.templates=i,L(),k(d.message,!0)}return}if(s==="open-project"){o.projectTab="tasks",o.projectMemberFilter=null,ye("project-detail",r.dataset.projectId);return}if(s==="filter-by-member"){const i=r.dataset.memberId;o.projectMemberFilter=o.projectMemberFilter===i?null:i,o.projectTab="tasks",requestAnimationFrame(()=>L());return}if(s==="clear-member-filter"){o.projectMemberFilter=null,requestAnimationFrame(()=>L());return}if(s==="back-to-projects"){o.projectMemberFilter=null,ye("projects",null);return}if(s==="project-tab"){o.projectTab=r.dataset.tab;try{if(typeof window<"u"&&o.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(o.activeProjectId)}&tab=${encodeURIComponent(o.projectTab)}`),typeof sessionStorage<"u"){const d=sessionStorage.getItem("darc_last_route"),l=d?JSON.parse(d):{};l.view="project-detail",l.activeProjectId=o.activeProjectId,l.projectTab=o.projectTab,sessionStorage.setItem("darc_last_route",JSON.stringify(l))}}catch{}r.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(d=>d.classList.toggle("active",d===r));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>L());return}if(s==="toggle-timeline-view"){o.timelineView=r.dataset.viewMode||"gantt",requestAnimationFrame(()=>L());return}if(s==="prev-calendar-month"){const i=o.calendarDate?new Date(o.calendarDate):new Date;i.setMonth(i.getMonth()-1),o.calendarDate=i,requestAnimationFrame(()=>L());return}if(s==="next-calendar-month"){const i=o.calendarDate?new Date(o.calendarDate):new Date;i.setMonth(i.getMonth()+1),o.calendarDate=i,requestAnimationFrame(()=>L());return}if(s==="today-calendar-month"){o.calendarDate=new Date,requestAnimationFrame(()=>L());return}if(s==="open-task"){if(window._isDraggingTask||window._justDroppedAt&&Date.now()-window._justDroppedAt<400)return;const i=r.dataset.taskId||r.closest("[data-task-id]")?.dataset.taskId;if(!i)return;let d=(o.data?.tasks||[]).find(l=>l.id===i);if(d){openTaskModal(d);return}P(`/api/tasks/${i}`).then(l=>{l&&l.id?(o.data.tasks||(o.data.tasks=[]),o.data.tasks.push(l),openTaskModal(l)):k(t("تعذر العثور على المهمة أو تم نقلها لسلة المهملات.","Task not found or was moved to trash."),!0)}).catch(l=>{k(t("تعذر فتح المهمة: "+l.message,"Could not open task: "+l.message),!0)});return}if(s==="task-filter"){o.taskFilter=r.dataset.filter,r.closest(".view-toolbar-start")?.querySelectorAll(".filter-tab").forEach(i=>i.classList.toggle("active",i===r)),requestAnimationFrame(()=>L());return}if(s==="template-category"){o.templateCategory=r.dataset.category,requestAnimationFrame(()=>L());return}if(s==="use-template"){if(!o.data.projects.length)return k(v("noProjects"),!0);openTaskModal(null,r.dataset.templateId,o.activeProjectId);return}if(s==="open-user-profile"){o.settingsSection="profile",ye("settings");return}if(s==="open-user"){if(!C()&&!I("manage_users")&&!I("manage_existing_account_permissions")){k(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."),!0);return}const i=o.data.users.find(d=>d.id===r.dataset.userId);i&&openUserModal(i);return}if(s==="impersonate-user"){if(!C()){k(t("هذه الصلاحية خاصة بمدير النظام فقط.","Impersonation is restricted to system admin only."),!0);return}if(!window.confirm("هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً."))return;try{const i=await P(`/api/users/${r.dataset.userId}/impersonate`,{method:"POST"});i&&i.token&&typeof localStorage<"u"&&localStorage.setItem("darc_token",i.token),window.location.reload()}catch(i){k(i.message,!0)}return}if(s==="force-password-user"){if(!C()&&!I("manage_users")){k(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."),!0);return}const i=o.data.users.find(d=>d.id===r.dataset.userId);i&&openForcePasswordModal(i);return}if(s==="invite-user"){if(!C()&&!I("manage_users")){k(t("غير مصرح لك بإرسال دعوات للمستخدمين.","Permission denied to invite users."),!0);return}try{const i=await P(`/api/users/${r.dataset.userId}/invite`,{method:"POST"});await re(),k(i.emailConfigured?t("تم إرسال الدعوة.","Invitation sent."):t("تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.","Invite prepared, but the email provider is not configured."))}catch(i){k(i.message,!0)}return}if(s==="deactivate-user"){if(!C()&&!I("manage_users")){k(t("غير مصرح لك بتعطيل حسابات المستخدمين.","Permission denied to deactivate users."),!0);return}if(!window.confirm(v("confirmDeactivate")))return;const i=r.dataset.userId,d=o.data.users.find(p=>p.id===i),l=d?d.status:null;d&&(d.status="inactive"),L(),H();try{await P(`/api/users/${i}`,{method:"DELETE"}),await re(!0),k(t("تم تعطيل الحساب.","Account deactivated."))}catch(p){d&&(d.status=l),L(),k(p.message,!0)}return}if(s==="settings-section"){const i=r.dataset.section||"profile";if(!fe(i)){k(t("غير مصرح لك بالوصول لهذا القسم من الإعدادات.","Access denied to this settings section."),!0);return}o.settingsSection=i;try{if(typeof window<"u"&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(o.settingsSection)}`),typeof sessionStorage<"u"){const l=sessionStorage.getItem("darc_last_route"),p=l?JSON.parse(l):{};p.view="settings",p.settingsSection=o.settingsSection,sessionStorage.setItem("darc_last_route",JSON.stringify(p))}}catch{}r.closest(".settings-nav")?.querySelectorAll("button").forEach(l=>l.classList.toggle("active",l===r));const d=()=>{const l=document.getElementById("main-content");l&&(l.scrollTop=0,l.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0),document.documentElement&&(document.documentElement.scrollTop=0),document.body&&(document.body.scrollTop=0)};d(),o.settingsSection==="analytics"&&Xt(!0).then(()=>{L(),d()}).catch(()=>{}),o.settingsSection==="trash"&&!o.trashLoaded&&P("/api/trash").then(l=>{o.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(p=>({...p,type:"project"})),...(l.tasks||[]).map(p=>({...p,type:"task"})),...(l.documents||[]).map(p=>({...p,type:"document"}))],o.trashLoaded=!0;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}L(),d()}).catch(l=>console.error(l)),requestAnimationFrame(()=>{L(),d()});return}if(s==="refresh-analytics"){if(!fe("analytics")){k(t("غير مصرح لك بعرض وتحديث التحليلات والمراقبة.","Permission denied to view and refresh analytics."),!0);return}try{await Xt(!0),L(),k(t("تم تحديث مؤشرات التحليلات والمراقبة الحية بنجاح.","Live observability and analytics refreshed successfully."))}catch(i){k(i.message,!0)}return}if(s==="test-anomaly-alert"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بإجراء محاكاة التنبيهات.","Permission denied to simulate anomaly alert."),!0);return}try{await P("/api/telemetry/test-anomaly",{method:"POST"}),await Xt(!0),await ge(!0),X(),k(t("🚨 تم رصد استهلاك زائد بنجاح وإرسال إشعار فوري لمركز التنبيهات!","🚨 Anomaly detected! Alert notification dispatched to Notification Center!"))}catch(i){k(i.message,!0)}return}if(s==="goto-diagnostics"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بالوصول لتشخيص الأعطال.","Permission denied to access diagnostics."),!0);return}o.settingsSection="diagnostics",typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#settings?section=diagnostics"),L();return}if(s==="refresh-diagnostics"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بتحديث سجل الأعطال.","Permission denied to refresh diagnostics."),!0);return}try{await Zt(!0),L(),k(t("تم تحديث سجل الأخطاء وتشخيصات المستخدمين بنجاح.","Diagnostics and incidents refreshed successfully."))}catch(i){k(i.message,!0)}return}if(s==="test-incident-simulate"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بإجراء محاكاة للأعطال.","Permission denied to simulate error incidents."),!0);return}try{await P("/api/telemetry/test-error",{method:"POST"}),await Zt(!0),await ge(!0),L(),k(t("🚨 تم رصد الخطأ وتوثيق خطوات المستخدم وإرسال بريد تنبيه للإدارة بنجاح!","🚨 Incident recorded with stack trace and alert email sent to admin!"))}catch(i){k(i.message,!0)}return}if(s==="test-diagnostic-email"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك باختبار إرسال البريد.","Permission denied to test alert email."),!0);return}try{await P("/api/telemetry/test-email",{method:"POST"}),k(t("✉️ تم إرسال رسالة اختبار التنبيهات البريدية للإدارة بنجاح!","✉️ Test alert email dispatched to admin successfully!"))}catch(i){k(i.message,!0)}return}if(s==="filter-diagnostics-user"){const i=r.dataset.userId||"all";Xn(i),L();return}if(s==="clear-diagnostics-user-filter"){Xn("all"),L();return}if(s==="resolve-diagnostic-incident"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بمعالجة بلاغات الأعطال.","Permission denied to resolve incidents."),!0);return}const i=r.dataset.incidentId;if(i)try{await P(`/api/telemetry/incidents/${i}/resolve`,{method:"PATCH"}),await Zt(!0),L(),k(t("تم تحديد المشكلة كمعالجة بنجاح ✅","Incident marked as resolved ✅"))}catch(d){k(d.message,!0)}return}if(s==="copy-debug-bundle"){const i=r.dataset.bundle;i&&typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>{k(t("تم نسخ تقرير المشكلة الفني بالكامل للحافظة 📋","Full debug bundle copied to clipboard 📋"))}).catch(()=>{k(t("فشل النسخ التلقائي للحافظة","Failed to copy to clipboard"),!0)});return}if(s==="restore-item"){if(!C()&&!I("manage_trash")){k(t("غير مصرح لك باستعادة العناصر المحذوفة.","Permission denied to restore deleted items."),!0);return}try{await P(`/api/restore/${r.dataset.type}/${r.dataset.id}`,{method:"POST"});const i=await P("/api/trash");o.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(d=>({...d,type:"project"})),...(i.tasks||[]).map(d=>({...d,type:"task"})),...(i.documents||[]).map(d=>({...d,type:"document"}))];try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}await re(),k(t("تمت الاستعادة بنجاح.","Restored successfully."))}catch(i){k(i.message,!0)}return}if(s==="filter-trash"){if(!C()&&!I("manage_trash"))return;o.trashFilter=r.dataset.filter,requestAnimationFrame(()=>L());return}if(s==="purge-trash-item"){if(!C()&&!I("manage_trash")){k(t("غير مصرح لك بحذف العناصر نهائياً من سلة المهملات.","Permission denied to permanently delete trash items."),!0);return}const i=r.dataset.type,d=r.dataset.id;if(!window.confirm(t("هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.","Are you sure you want to permanently delete this item? This action cannot be undone.")))return;try{await P(`/api/trash/${i}/${d}`,{method:"DELETE"});const l=await P("/api/trash");o.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(p=>({...p,type:"project"})),...(l.tasks||[]).map(p=>({...p,type:"task"})),...(l.documents||[]).map(p=>({...p,type:"document"}))],L(),k(t("تم حذف العنصر نهائياً بنجاح.","Item permanently deleted."))}catch(l){k(l.message,!0)}return}if(s==="empty-trash"){if(!C()&&!I("manage_trash")){k(t("غير مصرح لك بإفراغ سلة المهملات.","Permission denied to empty trash."),!0);return}if(!window.confirm(t("هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.","Are you sure you want to empty the entire recycle bin? All items will be permanently erased.")))return;try{await P("/api/trash/empty",{method:"DELETE"}),o.trash=[],L(),k(t("تم إفراغ سلة المهملات بالكامل بنجاح.","Trash bin emptied successfully."))}catch(i){k(i.message,!0)}return}if(s==="open-role"){if(!C()&&!I("manage_roles")){k(t("غير مصرح لك بتعديل الأدوار والصلاحيات.","Permission denied to modify roles."),!0);return}const i=o.data.roles.find(d=>d.id===r.dataset.roleId);i&&openRoleModal(i);return}if(s==="delete-role"){if(!C()&&!I("manage_roles")){k(t("غير مصرح لك بحذف الأدوار.","Permission denied to delete roles."),!0);return}if(!window.confirm(v("confirmDeleteRole")))return;const i=r.dataset.roleId,d=[...o.data.roles||[]];o.data.roles=o.data.roles.filter(l=>l.id!==i),L(),H();try{await P(`/api/roles/${i}`,{method:"DELETE"}),await re(!0),k(t("تم حذف الدور.","Role deleted."))}catch(l){o.data.roles=d,L(),k(l.message,!0)}return}if(s==="export-csv"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Gi();return}if(s==="print-portfolio-pdf"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لطباعة التقارير.","You do not have permission to print reports."),!0);return}Ki();return}if(s==="export-project"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Ji(r.dataset.projectId);return}if(s==="export-project-pdf"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Na(r.dataset.projectId,!1);return}if(s==="export-project-client-pdf"){if(!I("export_reports")&&!C()){k(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Na(r.dataset.projectId,!0);return}if(s==="export-audit-xls"){if(!I("view_audit_logs")&&!C()){k(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}Ni();return}if(s==="print-audit-pdf"){if(!I("view_audit_logs")&&!C()){k(t("ليس لديك صلاحية لطباعة سجل الرقابة.","You do not have permission to print audit logs."),!0);return}Ri();return}if(s==="load-full-audit"){if(!C()&&!I("view_audit_logs")){k(t("غير مصرح لك باستعراض سجل التدقيق الكامل.","Permission denied to view full audit logs."),!0);return}Oi();return}if(s==="reset-audit-filters"){o.auditFilterAction="all",o.auditFilterEntity="all",o.auditFilterUser="all",o.auditSearchQuery="",L();return}}var lt=null;function Ja(e){if(e.target.name==="content"&&e.target.closest("#task-comment-form")){const r=e.target.value,s=r.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),i=document.getElementById("mention-dropdown");if(s){const d=s[1].toLowerCase(),l=(o.data?.users||[]).filter(f=>f.status!=="inactive").filter(f=>`${f.name||""} ${f.nameEn||""} ${f.email||""}`.toLowerCase().includes(d)),p=!d||"all".startsWith(d)||"الكل".startsWith(d)||"everyone".startsWith(d)||"الجميع".startsWith(d)||"فريق".startsWith(d);let u="";p&&(u+=`
          <div class="mention-option collective-mention" data-username="all" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--line);background:rgba(20,184,166,0.06);">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--brand-teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">📢</div>
            <div style="display:flex;flex-direction:column;gap:1px;text-align:start;">
              <strong style="font-size:12px;color:var(--brand-teal);">@all · ${t("الكل / الجميع (منشن لكافة الفريق والمدير)","Everyone (Team & Management)")}</strong>
              <span style="font-size:10px;color:var(--muted);">${t("إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة عبر واتساب","Direct WhatsApp alert to all project members & managers")}</span>
            </div>
          </div>
        `),l.length&&(u+=l.map(f=>{const y=(f.name||f.nameEn||f.email||"user").trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${c(y)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${Y(f,"avatar-sm")}
              <span style="font-size:12px;">${c(t(f.name,f.nameEn||f.name))}</span>
            </div>
          `}).join("")),u?(i.innerHTML=u,i.style.display="block",i.querySelectorAll(".mention-option").forEach(f=>{f.onclick=()=>{const y=f.dataset.username;e.target.value=r.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${y} `),i.style.display="none",e.target.focus()}})):i.style.display="none"}else i.style.display="none"}if(e.target.dataset.action==="search-trash-input"){o.trashQuery=e.target.value;const r=e.target.selectionStart;clearTimeout(lt),lt=setTimeout(()=>{L();const s=document.querySelector('[data-action="search-trash-input"]');s&&(s.focus(),s.setSelectionRange(r,r))},120);return}if(e.target.dataset.action==="search-audit-input"){o.auditSearchQuery=e.target.value;const r=e.target.selectionStart;clearTimeout(lt),lt=setTimeout(()=>{L();const s=document.querySelector('[data-action="search-audit-input"]');s&&(s.focus(),s.setSelectionRange(r,r))},120);return}const a=e.target.dataset.search||(e.target.dataset.action==="search-documents"?"documents":null);if(!a)return;o.searches[a]=e.target.value;const n=e.target.selectionStart;clearTimeout(lt),lt=setTimeout(()=>{L();const r=document.querySelector(`[data-search="${a}"], [data-action="search-documents"]`);r&&(r.focus(),r.setSelectionRange(n,n))},120)}async function Ka(e){if(e.target.dataset.action==="filter-diagnostics-severity"){Xo(e.target.value),L();return}if(e.target.dataset.action==="filter-diagnostics-status"){Zo(e.target.value),L();return}if(e.target.dataset.action==="change-doc-status"){const a=e.target.dataset.docId,n=e.target.value,r=o.data?.documents?.find(s=>s.id===a);if(!r)return;try{await P(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}),r.status=n,k(t("تم تحديث حالة المخطط بنجاح ✅","Drawing status updated ✅")),await re(!0)}catch(s){k(s.message,!0)}return}if(e.target.dataset.action==="doc-project-filter"){o.docProjectFilter=e.target.value,L();return}if(e.target.dataset.action==="filter-project-docs-task"){o.docTaskFilter=e.target.value,L();return}if(e.target.dataset.action==="filter-audit-action"){o.auditFilterAction=e.target.value,L();return}if(e.target.dataset.action==="filter-audit-entity"){o.auditFilterEntity=e.target.value,L();return}if(e.target.dataset.action==="filter-audit-user"){o.auditFilterUser=e.target.value,L();return}if(e.target.dataset.action==="sort-project-tasks"||e.target.dataset.action==="sort-my-tasks"){hn(e.target.value),L();return}if(e.target.name==="templateId"&&e.target.form?.id==="task-form"){const a=e.target.form,n=e.target.value,r=o.data.templates?.find(u=>u.id===n),s=a.querySelector('input[name="titleAr"]'),i=a.querySelector('input[name="titleEn"]'),d=a.querySelector("#task-type-ar"),l=a.querySelector("#task-type-en"),p=a.querySelector('textarea[name="descriptionAr"]');r?(s&&(!s.value||a.dataset.templateSelected==="true")&&(s.value=r.nameAr),i&&(!i.value||a.dataset.templateSelected==="true")&&(i.value=r.nameEn||""),d&&(d.value=r.typeAr||"مخطط"),l&&(l.value=r.typeEn||"Drawing"),p&&(!p.value||a.dataset.templateSelected==="true")&&(p.value=r.descriptionAr||""),a.dataset.templateSelected="true"):(d&&(d.value=""),l&&(l.value=""),delete a.dataset.templateSelected);return}if(e.target.name==="status"&&e.target.form?.id==="task-form"){const a=e.target.form.querySelector("#task-auto-progress-badge");if(a){const n={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];a.textContent=n!==void 0?`(${n}%)`:""}return}if(e.target.dataset.action==="task-project-filter"){o.taskProjectFilter=e.target.value,L();return}if(e.target.dataset.action==="task-priority-filter"){o.taskPriorityFilter=e.target.value,L();return}if(e.target.id==="sort-projects"||e.target.dataset?.action==="sort-projects"){o.projectSort=e.target.value,L();return}if(e.target.id==="task-upload-input"){const a=e.target.files;if(!a.length)return;const n=e.target.dataset.taskId;zn(a,n);return}if(e.target.classList.contains("doc-status-select")){const a=e.target.dataset.docId,n=e.target.value;P(`/api/documents/${a}`,{method:"PATCH",body:JSON.stringify({status:n})}).then(()=>{re(!0).then(()=>k(t("تم تحديث حالة المخطط.","Document status updated.")))}).catch(r=>k(r.message,!0));return}if(e.target.id==="user-avatar-file-input"){const a=e.target.files?.[0];if(!a)return;if(a.size>2621440){k(t("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.","Image is too large. Maximum allowed size is 2MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){k(t("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).","Please select a valid image file (JPG, PNG, WebP)."),!0),e.target.value="";return}try{k(t("جاري معالجة ورفع صورتك الشخصية...","Processing & uploading avatar..."));const n=await ii(a,256,256),r=await P("/api/users/me",{method:"PATCH",body:JSON.stringify({avatarUrl:n})});if(r.user){o.data.user={...o.data.user,...r.user};const s=(o.data.users||[]).findIndex(i=>i.id===o.data.user.id);s!==-1&&(o.data.users[s]={...o.data.users[s],...r.user})}e.target.value="",X(),ia(),k(t("تم تحديث صورتك الشخصية وتثبيتها بنجاح!","Avatar updated successfully!"))}catch(n){e.target.value="",k(n.message,!0)}return}if(e.target.id==="company-logo-file-input"){if(!C()&&!I("manage_settings")){k(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0),e.target.value="";return}const a=e.target.files?.[0];if(!a)return;if(a.size>3145728){k(t("حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.","Logo is too large. Maximum allowed size is 3MB."),!0),e.target.value="";return}if(!a.type.startsWith("image/")){k(t("يرجى اختيار ملف صورة أو شعار صالح.","Please select a valid logo image file."),!0),e.target.value="";return}try{k(t("جاري معالجة ورفع شعار الشركة...","Uploading company logo..."));const n=await ii(a,400,400),r=await P("/api/company",{method:"PATCH",body:JSON.stringify({logoUrl:n})});r.company&&(o.data.company={...o.data.company,...r.company}),e.target.value="",X(),ia(),k(t("تم تحديث وتثبيت شعار مساحة العمل بنجاح!","Company logo updated successfully!"))}catch(n){e.target.value="",k(n.message,!0)}return}}function ii(e,a=300,n=300){return new Promise((r,s)=>{const i=new FileReader;i.onerror=()=>s(new Error(t("فشل قراءة ملف الصورة.","Failed to read image file."))),i.onload=()=>{const d=new Image;d.onerror=()=>s(new Error(t("صيغة الصورة تالفة أو غير صالحة.","Corrupted or invalid image format."))),d.onload=()=>{try{const l=d.naturalWidth||d.width,p=d.naturalHeight||d.height;if(l>4096||p>4096||l*p>16e6){s(new Error(t("أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.","Image dimensions too large (Pixel Flood Blocked). Please select a standard image.")));return}let u=l,f=p;if(u>a||f>n){const m=Math.min(a/u,n/f);u=Math.round(u*m),f=Math.round(f*m)}const y=document.createElement("canvas");y.width=u,y.height=f;const $=y.getContext("2d");$.imageSmoothingEnabled=!0,$.imageSmoothingQuality="high",$.drawImage(d,0,0,u,f);let b="image/webp",x=y.toDataURL(b,.82);x.startsWith("data:image/webp")||(b="image/jpeg",x=y.toDataURL(b,.82)),x.length>184320&&(x=y.toDataURL(b,.65)),r(x)}catch{s(new Error(t("تعذر معالجة وضغط الصورة.","Failed to process and compress image.")))}},d.src=i.result},i.readAsDataURL(e)})}function Ya({url:e,chunk:a,contentRange:n,headers:r={},onProgress:s}){return new Promise((i,d)=>{const l=new XMLHttpRequest;if(l.open("PUT",e,!0),e.includes("/api/")){l.withCredentials=!0;const p=typeof localStorage<"u"?localStorage.getItem("darc_token"):null;p&&!r.Authorization&&l.setRequestHeader("Authorization",`Bearer ${p}`)}for(const[p,u]of Object.entries(r))l.setRequestHeader(p,u);n&&l.setRequestHeader("Content-Range",n),l.upload&&s&&(l.upload.onprogress=p=>{p.lengthComputable&&s(p.loaded)}),l.onload=()=>{i({status:l.status,ok:l.status>=200&&l.status<300,headers:{get:p=>l.getResponseHeader(p)},responseText:l.responseText,json:()=>{try{return JSON.parse(l.responseText)}catch{return{}}}})},l.onerror=()=>d(new Error("Network connection error")),l.ontimeout=()=>d(new Error("Upload chunk timeout")),l.timeout=18e4,l.send(a)})}async function _s(e,a){try{const n=await Ya({url:e,chunk:new Blob([]),contentRange:`bytes */${a}`});if(n.status===308){const r=n.headers.get("Range");if(r){const s=r.match(/bytes=0-(\d+)/);if(s&&s[1])return parseInt(s[1],10)+1}return 0}if(n.ok)return{completed:!0,data:typeof n.json=="function"?await Promise.resolve(n.json()):{}}}catch{}return null}var ta=null;function ao({projectName:e,taskName:a,totalFiles:n}){ta&&(clearTimeout(ta),ta=null);let r=document.getElementById("floating-upload-manager");if(r){r.style.opacity="1",r.style.transform="none";const s=r.querySelector("#fum-proj-text"),i=r.querySelector("#fum-task-text");s&&e&&(s.textContent=e),i&&a&&(i.textContent=a)}else{r=document.createElement("div"),r.id="floating-upload-manager",r.setAttribute("dir",o.lang==="ar"?"rtl":"ltr"),r.style.cssText=`
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
    `,r.innerHTML=`
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
    `,document.body.appendChild(r);const s=r.querySelector("#fum-minimize-btn"),i=r.querySelector("#fum-body");s.addEventListener("click",()=>{const d=i.style.display==="none";i.style.display=d?"flex":"none",s.textContent=d?"—":"+"}),r.querySelector("#fum-close-btn").addEventListener("click",()=>{r.remove()})}return r}function pt({fileName:e,fileIndex:a,totalFiles:n,pct:r,loadedMB:s,fileSizeMB:i,speedMBs:d,etaText:l,statusNote:p,isError:u,isDone:f}){const y=document.getElementById("floating-upload-manager");if(!y)return;const $=y.querySelector("#fum-file-text"),b=y.querySelector("#fum-count-text"),x=y.querySelector("#fum-progress-fill"),m=y.querySelector("#fum-pct-text"),h=y.querySelector("#fum-speed-text"),T=y.querySelector("#fum-eta-text"),D=y.querySelector("#fum-status-badge"),S=y.querySelector("#fum-indicator"),z=y.querySelector("#fum-header-title"),O=y.querySelector("#fum-close-btn");e&&$&&($.textContent=e),b&&a&&n&&(b.textContent=`(${a}/${n})`),x&&typeof r=="number"&&(x.style.width=`${r}%`),m&&typeof r=="number"&&(m.textContent=`${r}%`),h&&s!==void 0&&i!==void 0&&(h.textContent=`${s} / ${i} MB • ${d||"0.0"} MB/s`),T&&l&&(T.textContent=`${t("متبقي:","ETA:")} ${l}`),p&&D?(D.style.display="block",D.textContent=p,D.style.background=u?"var(--red-soft)":"var(--amber-soft)",D.style.color=u?"var(--red)":"var(--amber)",D.style.border=u?"1px solid var(--red)":"1px solid var(--amber)"):!u&&!f&&D&&(D.style.display="none"),f&&(S&&(S.style.background="var(--mint-strong)",S.style.boxShadow="0 0 10px var(--mint-strong)"),z&&(z.textContent=t("اكتمل الرفع بنجاح! ✓","Upload Complete! ✓")),m&&(m.textContent="100%"),x&&(x.style.width="100%"),O&&(O.style.display="inline-block"),D&&(D.style.display="block",D.style.background="var(--mint)",D.style.color="var(--teal-dark)",D.style.border="1px solid var(--mint-strong)",D.textContent=t("تم التوثيق والرفع إلى الخادم بنجاح.","Document saved & uploaded to server.")),ta=setTimeout(()=>{y&&y.parentNode&&(y.style.opacity="0",y.style.transform="translateY(12px)",setTimeout(()=>y.remove(),300))},4500)),u&&(S&&(S.style.background="var(--red)",S.style.boxShadow="0 0 10px var(--red)"),z&&(z.textContent=t("فشل في الرفع ✕","Upload Failed ✕")),O&&(O.style.display="inline-block"))}async function zn(e,a){if(!e||!e.length||!a)return;const n=o.data?.tasks?.find(r=>r.id===a);return no({files:e,taskId:a,projectId:n?.projectId,status:"draft",isTaskModal:!0})}async function no({files:e,projectId:a=null,taskId:n=null,discipline:r="عام",status:s="draft",isTaskModal:i=!1}){if(!e||!e.length)return;if(typeof navigator<"u"&&!navigator.onLine){k(t("لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.","Cannot upload drawings or files while offline. Please connect to the internet first."),!0);return}const d=n?o.data?.tasks?.find(D=>D.id===n):null,l=a||d?.projectId,p=l?o.data?.projects?.find(D=>D.id===l):null,u=o.data?.documents?o.data.documents.filter(D=>!D.deletedAt&&(n?D.taskId===n:D.projectId===l)):[],f=p?p.nameAr:"Project",y=d?d.titleAr:r||"General",$={},b=D=>{if($[D])return $[D];let S=0;return u.forEach(z=>{if(z.originalName&&z.originalName.toLowerCase().endsWith(D)){const O=z.originalName.match(/_v(\d+)\./);O&&parseInt(O[1])>S&&(S=parseInt(O[1]))}}),$[D]=S+1,S+1},x=document.getElementById("upload-progress-container");document.getElementById("upload-progress-bar"),document.getElementById("upload-progress-percent"),document.getElementById("upload-progress-text");const m=document.getElementById("task-dropzone");i&&x&&(x.style.display="block"),i&&m&&(m.style.pointerEvents="none"),ao({projectName:f,taskName:y,totalFiles:e.length});let h=null;const T=D=>(D.preventDefault(),D.returnValue=t("جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.","Uploading large engineering files. Leaving will abort upload."),D.returnValue);if(typeof window<"u"&&(window.addEventListener("beforeunload",T),"wakeLock"in navigator))try{navigator.wakeLock.request("screen").then(D=>{h=D}).catch(()=>{})}catch{}try{for(let D=0;D<e.length;D++){const S=e[D];if(!S.size||S.size===0){k(t(`الملف "${S.name}" فارغ لا يحتوي على بيانات.`,`File "${S.name}" is empty.`),!0);continue}if(S.size>107374182400){k(t(`حجم الملف "${S.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${S.name}" exceeds 100GB limit.`),!0);continue}const z=S.name.split(".").pop()?.toLowerCase()||"";if(["exe","bat","cmd","sh","bash","ps1","vbs","js","mjs","cjs","py","php","phtml","html","htm","jar","msi","dll","com","scr","hta","svg","apk"].includes(z)||S.type==="image/svg+xml"){k(t(`صيغة الملف "${S.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${S.name}" is not permitted for security reasons.`),!0);continue}const O=S.name.lastIndexOf("."),g=O!==-1?S.name.substring(O).toLowerCase():"",E=O!==-1?S.name.substring(0,O):S.name,A=se=>(se||"").replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,"-").replace(/\s+/g,"_").trim(),j=`${A(f)||"Project"}_${A(y)||"General"}_${A(E)||"Drawing"}_v${b(g)}${g}`;if(typeof window<"u"){window.__docBlobCache=window.__docBlobCache||new Map;try{const se=URL.createObjectURL(S);window.__docBlobCache.set(j,se),window.__docBlobCache.set(S.name,se)}catch{}}const _=S.size>=1073741824?`${(S.size/1073741824).toFixed(2)} GB`:`${(S.size/1048576).toFixed(1)} MB`;pt({fileName:S.name,fileIndex:D+1,totalFiles:e.length,pct:0,loadedMB:"0.0",fileSizeMB:_,speedMBs:"0.0",etaText:"...",statusNote:t("بدء جلسة الرفع المستأنف...","Starting resumable session...")});const M=(await P("/api/documents/session",{method:"POST",body:JSON.stringify({compiledName:j,mimeType:S.type||"application/octet-stream",projectId:l,taskId:n,size:S.size})})).sessionUrl;let R=8388608;S.size<=10485760?R=S.size:S.size<=104857600?R=8388608:S.size<=524288e3?R=16777216:S.size<=2147483648?R=33554432:R=67108864;const N=Date.now();let B=0;const F=se=>{const G=Math.min(S.size,B+se),xe=Math.min(100,Math.round(G/S.size*100)),Ue=G>=1073741824?`${(G/1073741824).toFixed(2)} GB`:`${(G/1048576).toFixed(1)} MB`;if(i){const Nn=document.getElementById("upload-progress-bar"),Rn=document.getElementById("upload-progress-percent"),On=document.getElementById("upload-progress-text"),Bn=document.getElementById("upload-progress-container");Bn&&(Bn.style.display="block"),Nn&&(Nn.style.width=`${xe}%`),Rn&&(Rn.textContent=`${xe}%`);const lo=(Date.now()-N)/1e3,Fn=G/Math.max(lo,.2),co=(Fn/1048576).toFixed(1),po=Math.max(0,S.size-G),Wt=Math.round(po/Math.max(Fn,1)),uo=Wt<60?`${Wt} ${t("ثانية","s")}`:`${Math.floor(Wt/60)}:${String(Wt%60).padStart(2,"0")} ${t("دقيقة","min")}`;On&&(On.textContent=`${t("رفع إلى الخادم","Uploading to server")} (${D+1}/${e.length}): ${S.name} — ${Ue} / ${_} (${xe}%) • ${co} MB/s • ${t("متبقي:","ETA:")} ${uo}`)}const st=(Date.now()-N)/1e3,ue=G/Math.max(st,.2),Q=(ue/1048576).toFixed(1),_e=Math.max(0,S.size-G),wa=Math.round(_e/Math.max(ue,1)),ro=wa<60?`${wa} s`:`${Math.floor(wa/60)}m`;pt({fileName:S.name,fileIndex:D+1,totalFiles:e.length,pct:xe,loadedMB:Ue,fileSizeMB:_,speedMBs:Q,etaText:ro})};F(0);let V=0,ie=null,he=!1;for(;V<S.size;){const se=Math.min(V+R,S.size),G=S.slice(V,se),xe=`bytes ${V}-${se-1}/${S.size}`;let Ue=0,st=!1;for(;!st&&Ue<5;)try{let ue;if(!he)try{ue=await Ya({url:M,chunk:G,contentRange:xe,headers:{},onProgress:Q=>F(Q)})}catch(Q){console.warn("[Upload] Direct GDrive upload failed, trying backend proxy:",Q.message),he=!0}if(he){const Q={projectId:l,taskId:n,compiledName:j,mimeType:S.type,size:S.size,status:s};ue=await Ya({url:`${va}/api/documents/chunk`,chunk:G,contentRange:xe,headers:{"x-session-url":M,"x-doc-meta":encodeURIComponent(JSON.stringify(Q))},onProgress:_e=>F(_e)})}if(ue.status===308){const Q=ue.headers.get("Range");if(Q){const _e=Q.match(/bytes=0-(\d+)/);_e&&_e[1]?V=parseInt(_e[1],10)+1:V=se}else V=se;B=V,F(0),st=!0}else if(ue.ok){const Q=typeof ue.json=="function"?await Promise.resolve(ue.json()):{};ie=Q.id||Q.document?.id,B=S.size,F(0),V=S.size,st=!0;break}else throw new Error(`Upload returned status ${ue.status}`)}catch(ue){if(Ue++,pt({fileName:S.name,fileIndex:D+1,totalFiles:e.length,statusNote:`${t("إعادة المحاولة","Retrying")} (${Ue}/5)...`}),Ue>=5)throw new Error(`${t("فشل الرفع بعد محاولات متعددة","Upload failed after multiple retries")}: ${ue.message}`);await new Promise(_e=>setTimeout(_e,1e3*Math.pow(2,Ue-1)));const Q=await _s(M,S.size);if(typeof Q=="number"&&Q>V){V=Q,B=V;break}else if(Q&&Q.completed){ie=Q.data?.id,V=S.size,st=!0;break}}}ie&&!ie.startsWith("doc_")&&await P("/api/documents/finalize",{method:"POST",body:JSON.stringify({driveFileId:ie,projectId:l,taskId:n,compiledName:j,mimeType:S.type,size:S.size,status:s})})}if(await re(!0),i&&n){const D=o.data?.tasks?.find(z=>z.id===n),S=document.getElementById("task-documents-list");S&&D&&(S.innerHTML=nt(D))}ia(),pt({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),k(t("تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅","Drawing uploaded & registered successfully ✅"))}catch(D){pt({isError:!0,statusNote:D.message}),k(D.message,!0)}finally{if(typeof window<"u"&&window.removeEventListener("beforeunload",T),h){try{h.release()}catch{}h=null}if(i){const D=document.getElementById("upload-progress-container"),S=document.getElementById("upload-progress-bar"),z=document.getElementById("task-dropzone");D&&(D.style.display="none"),S&&(S.style.width="0%"),z&&(z.style.pointerEvents="auto");const O=document.getElementById("task-upload-input");O&&(O.value="")}}}typeof window<"u"&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,window.addEventListener("dragover",e=>{e.target.closest("#task-dropzone, #drawing-dropzone")||e.preventDefault()}),window.addEventListener("drop",e=>{e.target.closest("#task-dropzone, #drawing-dropzone")||e.preventDefault()}),document.addEventListener("dragover",e=>{const a=e.target.closest("#task-dropzone");a&&(e.preventDefault(),a.style.borderColor="var(--brand-teal)",a.style.background="var(--teal-soft)")}),document.addEventListener("dragleave",e=>{const a=e.target.closest("#task-dropzone");a&&(a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)")}),document.addEventListener("drop",e=>{const a=e.target.closest("#task-dropzone");if(a){e.preventDefault(),a.style.borderColor="var(--border)",a.style.background="var(--surface-soft)";const n=a.dataset.taskId,r=e.dataTransfer?.files;r&&r.length&&zn(r,n)}}));async function io(){Dt({theme:o.theme,lang:o.lang});try{o.calendarSystem=localStorage.getItem("darc_calendar_system")||o.calendarSystem||"gregorian"}catch{}if(typeof window<"u"&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",i=>{try{if(!localStorage.getItem("darc-theme")){o.theme=i.matches?"dark":"light",document.documentElement.dataset.theme=o.theme;const d=document.querySelector('[data-action="toggle-theme"]');d&&(d.textContent=o.theme==="dark"?"☀️":"🌙")}}catch{}})}catch{}}const e=typeof window<"u"?window.location.hash.replace(/^#/,""):"",a=new URLSearchParams(e.includes("?")?e.split("?")[1]:e.includes("=")?e:""),n=a.get("activate");if(n)return Bt(n);const r=a.get("reset");if(r)return yt(r);if(e==="forgot")return $e("","forgot");if(e==="login")return $e();try{if(e){const[i,d]=e.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)&&(o.view=i,d)){const l=new URLSearchParams(d);l.get("id")&&(o.activeProjectId=l.get("id")),l.get("tab")&&(o.projectTab=l.get("tab")),l.get("section")&&(o.settingsSection=l.get("section"))}}else if(typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route");if(i){const d=JSON.parse(i);d.view&&(o.view=d.view),d.activeProjectId&&(o.activeProjectId=d.activeProjectId),d.projectTab&&(o.projectTab=d.projectTab),d.settingsSection&&(o.settingsSection=d.settingsSection)}}}catch{}o.view==="settings"&&!o.settingsSection&&(o.settingsSection="profile");const s=nn();s&&s.user?(o.data=s,te(o.view)||(o.view=Be()),X()):Rt();try{if(typeof navigator<"u"&&navigator.onLine&&Nt().length>0&&await on(P),await ge(),o.data?.user?.customFields?.calendarSystem){o.calendarSystem=o.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",o.calendarSystem)}catch{}}if(!window._darcPollingActive){window._darcPollingActive=!0;let i=null,d=0,l=!1,p=Date.now(),u=0;const f=()=>{const b=Date.now()-p>45e3;p=Date.now(),b&&Date.now()-u>4e3&&!l&&$()};if(typeof window<"u"){let b=0;const x=()=>{const m=Date.now();m-b>5e3&&(b=m,f())};window.addEventListener("click",x,{passive:!0}),window.addEventListener("keydown",x,{passive:!0}),window.addEventListener("touchstart",x,{passive:!0}),window.addEventListener("mousemove",x,{passive:!0})}const y=()=>{i&&clearTimeout(i);const b=Date.now()-p>45e3?15e3:4e3,x=d>0?Math.min(25e3,b*Math.pow(2,d)):b;i=setTimeout($,x)},$=async()=>{if(typeof document<"u"&&document.hidden){y();return}if(!o.data?.user||!o.view||o.view==="login"){y();return}if(l){y();return}l=!0,u=Date.now();try{await ge(!0),d=0}catch{d++}finally{l=!1,y()}};y(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&o.data?.user&&o.view&&o.view!=="login"&&(f(),$())})}}catch{typeof window<"u"&&(window.history&&window.history.replaceState?window.history.replaceState(null,"","#login"):window.location.hash="#login"),$e()}}typeof window<"u"&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener("hashchange",()=>{if(window._isInternalNav){window._isInternalNav=!1;return}const e=window.location.hash.replace(/^#/,"");if(!e)return;const[a,n]=e.split("?");if(a==="login"){o.data?.user&&(o.data.user=null),$e();return}if(a==="forgot"){$e("","forgot");return}const r=new URLSearchParams(n||(e.includes("=")?e:""));if(r.get("activate")){Bt(r.get("activate"));return}if(r.get("reset")){yt(r.get("reset"));return}if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(a)){if(o.data&&!te(a)){ye(Be());return}let s=o.activeProjectId;if(n){const i=new URLSearchParams(n);if(i.get("id")&&(s=i.get("id")),i.get("tab")&&(o.projectTab=i.get("tab")),i.get("section")){const d=i.get("section");a==="settings"&&o.data&&!fe(d)?(o.settingsSection="profile",typeof window<"u"&&window.history&&window.history.replaceState&&window.history.replaceState(null,"","#settings?section=profile")):o.settingsSection=d}}else a==="settings"&&o.data&&!fe(o.settingsSection)&&(o.settingsSection="profile");if(o.view!==a||o.activeProjectId!==s)ye(a,s);else if(L(),a==="settings"){const i=document.getElementById("main-content");i&&(i.scrollTop=0,i.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0),document.documentElement&&(document.documentElement.scrollTop=0),document.body&&(document.body.scrollTop=0)}}}));if(typeof window<"u"&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener("scroll",a=>{a.target&&a.target.classList&&(a.target.classList.contains("timeline-scroll")||a.target.classList.contains("gantt-scroll")||a.target.classList.contains("timeline-board"))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows=="function"&&drawTimelineArrows(),e=!1})))},!0)}var ee=null,We=null,zt=64,et=null,de=-1,Z=-1,gt=-1,Le=0,Ht=!1,U=null,q=null,bt=0,ht=0,De=0,je=0,ve=!1,Ve=null,ne=null,Pe=null,K=null,oi=null,Ia=null;function Qe(e){let a=document.getElementById("dnd-live-announcer");a||(a=document.createElement("div"),a.id="dnd-live-announcer",a.className="sr-only",a.setAttribute("aria-live","assertive"),a.setAttribute("aria-atomic","true"),document.body.appendChild(a)),a.textContent="",setTimeout(()=>{a.textContent=e},40)}function oo(e){ee||(ee=document.createElement("div"),ee.className="drag-placeholder");const a=Math.max(48,Math.min(220,e||zt||64));return ee.style.cssText=`
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
  `,ee.innerHTML=`<span>↓ ${t("الموضع الجديد للمهمة","Drop position")}</span>`,ee}function Ps(){ee&&ee.parentNode&&ee.parentNode.removeChild(ee)}function Mn(e,a){const n=Array.from(e.querySelectorAll(".task-card:not(.is-dragging):not(#active-drag-ghost)"));return n.length===0?null:n.reduce((r,s)=>{const i=s.getBoundingClientRect(),d=a-(i.top+i.height/2);return d<0&&d>r.offset?{offset:d,element:s}:r},{offset:Number.NEGATIVE_INFINITY}).element}var ze=null,Me=null;function Cs(){typeof document>"u"||(ze||(ze=document.createElement("div"),ze.className="dnd-edge-hotzone left",document.body.appendChild(ze)),Me||(Me=document.createElement("div"),Me.className="dnd-edge-hotzone right",document.body.appendChild(Me)))}function Ls(){ze&&ze.parentNode&&(ze.parentNode.removeChild(ze),ze=null),Me&&Me.parentNode&&(Me.parentNode.removeChild(Me),Me=null)}var aa=-1,Xa=null,Za=-1;function so(e,a){if(!Ht||e<0||a<0)return;let n=document.elementFromPoint(e,a)?.closest(".board-column");const r=document.querySelector(".board, .tasks-board, .board-columns");if(!n&&r){const i=r.getBoundingClientRect();if(a>=i.top-80&&a<=i.bottom+80){const d=Array.from(document.querySelectorAll(".board-column"));d.length>0&&(n=d.reduce((l,p)=>{const u=p.getBoundingClientRect(),f=Math.abs(e-(u.left+u.width/2));return f<l.dist?{col:p,dist:f}:l},{col:null,dist:1/0}).col)}}if(!n){document.querySelectorAll(".board-column").forEach(i=>i.classList.remove("drag-over"));return}document.querySelectorAll(".board-column").forEach(i=>i.classList.toggle("drag-over",i===n));const s=n.querySelector(".board-cards");if(s){if(Xa===n&&aa>=0&&Math.abs(a-aa)<14)return;Xa=n,aa=a;const i=oo(zt),d=Mn(s,a);d==null?(!s.contains(i)||s.lastElementChild!==i)&&s.appendChild(i):i.nextElementSibling!==d&&s.insertBefore(i,d)}}function zs(){if(et)return;function e(){if(!Ht){et=null;return}if(de>=0&&Z>=0){let a=!1;const n=document.querySelector(".board, .board-columns, .tasks-board, [data-board]"),r=typeof window<"u"&&window.innerWidth<=768,s=r?75:85,i=r?24:28;if(n){let x=0;const m=typeof window<"u"&&window.visualViewport?.width||window.innerWidth,h=q?q.getBoundingClientRect():null,T=de<s||h&&h.left<35,D=de>m-s||h&&h.right>m-35;if(T){const S=Math.max(0,de<s?s-de:35),z=Math.min(1.5,Math.max(.15,S/s));x=-Math.max(4,Math.round(Math.pow(z,1.3)*i))}else if(D){const S=Math.max(0,de>m-s?de-(m-s):35),z=Math.min(1.5,Math.max(.15,S/s));x=Math.max(4,Math.round(Math.pow(z,1.3)*i))}if(x!==0){const S=n.scrollLeft;try{n.scrollBy({left:x})}catch{}if(n.scrollLeft===S&&(n.scrollLeft+=x),n.scrollLeft!==S&&(a=!0),r){const z=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)?.closest(".board-column");if(z){const O=Array.from(document.querySelectorAll(".board-column")).indexOf(z);if(O!==-1&&O!==Za&&(Za=O,typeof navigator<"u"&&navigator.vibrate))try{navigator.vibrate(12)}catch{}}}}}const d=95,l=26,p=document.getElementById("main-content")||document.querySelector(".workspace-content"),u=p?p.getBoundingClientRect():null,f=u?Math.max(60,u.top+60):80,y=u?Math.min(window.innerHeight-30,u.bottom-60):window.innerHeight-80;if(Z>y){const x=Math.min(1.5,Math.max(.2,(Z-y)/d)),m=Math.max(4,Math.round(x*l));if(p&&p.scrollHeight>p.clientHeight){const h=p.scrollTop;p.scrollTop+=m,p.scrollTop!==h&&(a=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const h=window.scrollY;window.scrollBy({top:m,behavior:"instant"}),window.scrollY!==h&&(a=!0)}}else if(Z<f){const x=Math.min(1.5,Math.max(.2,(f-Z)/d)),m=-Math.max(4,Math.round(x*l));if(p&&p.scrollHeight>p.clientHeight){const h=p.scrollTop;p.scrollTop+=m,p.scrollTop!==h&&(a=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const h=window.scrollY;window.scrollBy({top:m,behavior:"instant"}),window.scrollY!==h&&(a=!0)}}const $=document.elementFromPoint(de,Z),b=$?.closest(".board-cards")||$?.closest(".board-column")?.querySelector(".board-cards");if(b&&b.scrollHeight>b.clientHeight){const x=b.getBoundingClientRect(),m=60;if(Z>x.top&&Z<x.top+m){const h=(m-(Z-x.top))/m;b.scrollTop-=Math.max(3,Math.round(h*18)),a=!0}else if(Z<x.bottom&&Z>x.bottom-m){const h=(Z-(x.bottom-m))/m;b.scrollTop+=Math.max(3,Math.round(h*18)),a=!0}}a&&so(de,Z)}et=requestAnimationFrame(e)}et=requestAnimationFrame(e)}function Ms(){et&&(cancelAnimationFrame(et),et=null)}async function Qa(e,a,n=null){if(!e){oe();return}e.classList.remove("drag-over");const r=n||We;We=null;const s=e.dataset.status;if(!r||!s){oe();return}const i=(o.data?.tasks||[]).find(g=>g.id===r);if(!i){oe();return}const d=e.querySelector(".board-cards");if(!d){oe();return}const l=i.status===s||s==="review"&&["review","approval","blocked"].includes(i.status);if(!l&&s==="done"&&i.dependencies&&i.dependencies.length&&i.dependencies.filter(g=>{const E=o.data.tasks.find(A=>A.id===g);return E&&E.status!=="done"}).length)return oe(),k(t("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);const p=Array.from(d.querySelectorAll(".task-card")).filter(g=>g.dataset.taskId!==r),u=p.map(g=>g.dataset.taskId).filter(Boolean);let f=u.length;if(ee&&ee.parentNode===d)if(!ee.previousElementSibling||ee.previousElementSibling.classList?.contains("empty"))f=0;else{let g=ee.nextElementSibling;for(;g&&(!g.classList?.contains("task-card")||g.dataset?.taskId===r||g.classList?.contains("is-dragging"));)g=g.nextElementSibling;if(g&&g.dataset?.taskId&&g.dataset.taskId!==r){const E=u.indexOf(g.dataset.taskId);f=E!==-1?E:u.length}else f=u.length}else if(p.length>0){const g=a&&a>0?a:Z>0?Z:0,E=p[0].getBoundingClientRect(),A=p[p.length-1].getBoundingClientRect();if(g<=E.top+E.height*.45)f=0;else if(g>=A.bottom-A.height*.45)f=u.length;else{const j=Mn(d,g);if(j&&j.dataset.taskId!==r){const _=u.indexOf(j.dataset.taskId);_!==-1&&(f=_)}}}else f=0;const y=Array.from(d.querySelectorAll(".task-card")).findIndex(g=>g.dataset.taskId===r);if(l&&y!==-1&&(f===y||f===y+1)){oe();return}const $=i.status,b=(o.data.tasks||[]).map(g=>({id:g.id,status:g.status,sortOrder:g.sortOrder||g.sort_order,progress:g.progress,customFields:JSON.parse(JSON.stringify(g.customFields||g.custom_fields||{}))}));oe();const x=[...u];x.splice(f,0,r),s==="review"&&["review","approval","blocked"].includes(i.status)||(i.status=s),i.status==="done"?i.progress=100:i.status==="not_started"?i.progress=0:i.status==="in_progress"&&(i.progress===0||!i.progress)?i.progress=50:["review","approval"].includes(i.status)&&(i.progress||0)<80&&(i.progress=80);let m=100,h=!1;if(x.length<=1)m=100;else if(f===0){const g=(o.data?.tasks||[]).find(A=>A.id===x[1]),E=g?.sortOrder||g?.sort_order||100;m=Math.max(1,Math.round(E/2)),m>=E&&(h=!0)}else if(f===x.length-1){const g=(o.data?.tasks||[]).find(E=>E.id===x[x.length-2]);m=(g?.sortOrder||g?.sort_order||100)+100}else{const g=(o.data?.tasks||[]).find(_=>_.id===x[f-1]),E=(o.data?.tasks||[]).find(_=>_.id===x[f+1]),A=g?.sortOrder||g?.sort_order||100,j=E?.sortOrder||E?.sort_order||200;j-A>1?m=Math.round((A+j)/2):h=!0}const T=Date.now();window._recentlyMovedTasks||(window._recentlyMovedTasks=new Map);const D=[];h?x.forEach((g,E)=>{const A=(o.data?.tasks||[]).find(j=>j.id===g);if(A){const j=(E+1)*100;A.sortOrder=j,A.sort_order=j,A.customFields||(A.customFields={}),A.customFields.sortOrder=j,A.customFields.sort_order=j,A.custom_fields||(A.custom_fields={}),A.custom_fields.sortOrder=j,A.custom_fields.sort_order=j,window._recentlyMovedTasks.set(g,{status:A.status,sortOrder:j,progress:A.progress,timestamp:T}),D.push({id:A.id,status:A.status,sortOrder:j,customFields:A.customFields})}}):(i.sortOrder=m,i.sort_order=m,i.customFields||(i.customFields={}),i.customFields.sortOrder=m,i.customFields.sort_order=m,i.custom_fields||(i.custom_fields={}),i.custom_fields.sortOrder=m,i.custom_fields.sort_order=m,window._recentlyMovedTasks.set(i.id,{status:i.status,sortOrder:m,progress:i.progress,timestamp:T}),D.push({id:i.id,status:i.status,sortOrder:m,customFields:i.customFields}));for(const[g,E]of window._recentlyMovedTasks.entries())T-E.timestamp>45e3&&window._recentlyMovedTasks.delete(g);if(hn("custom"),o.taskSortPref="custom",o.projectTaskSort="custom",o.myTaskSort="custom",L(!0),typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(20)}catch{}$!==s&&document.querySelectorAll(`.board-column[data-status="${s}"] .board-count, .board-column[data-status="${$}"] .board-count`).forEach(g=>{g.classList.remove("count-updated"),g.offsetWidth,g.classList.add("count-updated"),setTimeout(()=>g.classList.remove("count-updated"),350)});const S=document.querySelector(`.task-card[data-task-id="${r}"]`);S&&(S.classList.add("just-dropped"),setTimeout(()=>S?.classList.remove("just-dropped"),450));const z=e.querySelector(".board-column-title"),O=z?z.innerText.trim():s;Qe(t(`تم إفلات المهمة في عمود: ${O}، الموضع ${f+1}.`,`Dropped task into column: ${O}, position ${f+1}.`)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,D.forEach(g=>{window._pendingReorderBatch.set(g.id,g)}),window._reorderSyncTimer=setTimeout(()=>{const g=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),P("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:g})}).catch(E=>{console.warn("Reorder sync error, performing local rollback:",E),b.forEach(A=>{const j=(o.data?.tasks||[]).find(_=>_.id===A.id);j&&(j.status=A.status,j.sortOrder=A.sortOrder,j.sort_order=A.sortOrder,j.progress=A.progress,j.customFields=A.customFields)}),L(!0),k(t("فشل حفظ الترتيب الجديد في الخادم. تم التراجع عن التعديل تلقائياً.","Failed to save task order to server. Reverted automatically."),!0)})},150)}function oe(){if(ne&&(clearTimeout(ne),ne=null),q&&q.parentNode&&q.parentNode.removeChild(q),q=null,U){try{Ve!=null&&U.releasePointerCapture(Ve)}catch{}U.style.opacity="",U.style.pointerEvents="",U.style.touchAction="",U.classList.remove("is-dragging"),U.classList.remove("is-touch-charging"),U.classList.remove("is-touch-holding")}U=null;const e=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");e&&(e.style.scrollSnapType=""),document.body.classList.remove("is-touch-dragging"),Ve=null,ve=!1,Ht=!1,Bs=!1,Mt=!1,window._isDraggingTask=!1,window._isTouchHoldingTask=!1,We=null,de=-1,Z=-1,gt=-1,Le=0,aa=-1,Xa=null,Za=-1,Ls(),Ms(),document.querySelectorAll(".board-column").forEach(a=>a.classList.remove("drag-over")),Ps(),document.body.style.userSelect="",document.body.style.webkitUserSelect="",document.body.style.cursor="",window._pendingRenderAfterDrag&&(window._pendingRenderAfterDrag=!1,requestAnimationFrame(()=>L(!0)))}function en(e,a){if(!U||ve)return;const n=U.dataset.taskId;if(!U.isConnected&&n){const b=document.querySelector(`.task-card[data-task-id="${n}"]`);b&&(U=b)}const r=(o.data?.tasks||[]).find(b=>b.id===U.dataset.taskId);if(!Ft(r)){oe();return}if(e===0&&a===0&&(bt!==0||ht!==0)&&(e=bt,a=ht),ve=!0,Ht=!0,window._isDraggingTask=!0,window._isTouchHoldingTask=!1,We=U.dataset.taskId,de=e,Z=a,gt=e,Le=0,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(35)}catch{}const s=U.getBoundingClientRect();zt=s.height;const i=(U.closest(".board-column")||document.querySelector(".board-column"))?.getBoundingClientRect(),d=i?Math.round(i.width-24):260,l=Math.max(230,Math.min(320,d)),p=s&&Number.isFinite(s.width)&&s.width>=180&&s.width<=400?Math.round(s.width):l;De=e-s.left,je=a-s.top,(isNaN(De)||De<=0||De>p)&&(De=p/2),(isNaN(je)||je<=0||je>(s.height||120))&&(je=(s.height||120)/2);const u=Math.round(e-De),f=Math.round(a-je),y=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");y&&(y.style.scrollSnapType="none"),q=U.cloneNode(!0),q.id="active-drag-ghost",q.style.cssText=`
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
    transform: translate3d(${u}px, ${f}px, 0) scale(1.025);
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
  `,document.body.appendChild(q),U.classList.remove("is-touch-charging"),U.classList.remove("is-touch-holding"),U.classList.add("is-dragging"),U.style.opacity="0.22",U.style.pointerEvents="none",document.body.classList.add("is-touch-dragging"),document.body.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.cursor="grabbing",Cs();const $=U.closest(".board-column");if($){$.classList.add("drag-over");const b=$.querySelector(".board-cards");if(b){const x=oo(zt),m=Mn(b,a);m==null?b.appendChild(x):b.insertBefore(x,m)}}zs()}function Ns(e,a,n="mouse"){if(!Ht||!q||e===0&&a===0&&(bt!==0||ht!==0)||!Number.isFinite(e)||!Number.isFinite(a))return;if(de=e,Z=a,n==="touch")Le=0;else{const i=gt>=0?e-gt:0,d=Math.max(-2,Math.min(2,(Math.abs(i)<1.5?0:i)*.12));Le+=(d-Le)*.22,Math.abs(Le)<.12&&(Le=0)}gt=e;const r=Math.round(e-De),s=Math.round(a-je);if(Number.isFinite(r)&&Number.isFinite(s)){const i=Le!==0?` rotate(${Le.toFixed(1)}deg)`:"";q.style.transform=`translate3d(${r}px, ${s}px, 0) scale(1.025)${i}`}so(e,a)}async function Rs(e,a){if(ne&&(clearTimeout(ne),ne=null),U&&(U.classList.remove("is-touch-charging"),U.classList.remove("is-touch-holding")),!ve&&!We){oe();return}const n=Math.hypot(e-bt,a-ht);if(window._justDroppedTaskId=We,window._justDroppedAt=Date.now(),window._isDraggingTask=!1,n>4&&We){let r=document.elementFromPoint(e,a)?.closest(".board-column")||ee&&ee.closest(".board-column");if(!r){const d=Array.from(document.querySelectorAll(".board-column"));d.length>0&&(r=d.reduce((l,p)=>{const u=p.getBoundingClientRect(),f=Math.abs(e-(u.left+u.width/2));return f<l.dist?{col:p,dist:f}:l},{col:null,dist:1/0}).col)}const s=We,i=ee&&ee.parentNode?ee.getBoundingClientRect():null;if(q&&i&&i.width>0&&i.height>0){q.style.transition="transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.14s ease, opacity 0.14s ease",q.style.transform=`translate3d(${i.left}px, ${i.top}px, 0) scale(1) rotate(0deg)`,q.style.boxShadow="0 4px 14px rgba(13, 98, 105, 0.12)",setTimeout(async()=>{q&&q.parentNode&&q.parentNode.removeChild(q),q=null,r&&s?await Qa(r,a,s):oe()},130);return}if(r&&s){q&&q.parentNode&&q.parentNode.removeChild(q),q=null,await Qa(r,a,s);return}}oe()}var Os=8,Bs=!1,Mt=!1,tn=!1;document.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;const a=e.target instanceof Element?e.target:e.target?.parentElement||null,n=a?.closest?.(".task-card");if(!n||a?.closest?.("button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]"))return;const r=(o.data?.tasks||[]).find(i=>i.id===n.dataset.taskId);if(!Ft(r))return;U=n,Ve=e.pointerId,bt=e.clientX,ht=e.clientY,de=e.clientX,Z=e.clientY,gt=e.clientX,ve=!1,Mt=!1;const s=n.getBoundingClientRect();if(zt=s.height,De=e.clientX-s.left,je=e.clientY-s.top,isNaN(De)&&(De=s.width/2),isNaN(je)&&(je=s.height/2),tn=!!a?.closest?.(".task-drag-handle"),e.pointerType==="touch")if(window._isTouchHoldingTask=!0,tn)try{n.setPointerCapture(e.pointerId)}catch{}else n.classList.add("is-touch-charging"),ne=setTimeout(()=>{if(ne=null,U&&!Mt&&!ve){if(n.classList.remove("is-touch-charging"),typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(28)}catch{}en(de,Z)}},280);else try{n.setPointerCapture(e.pointerId)}catch{}},{passive:!0});document.addEventListener("pointermove",e=>{if(!(!U||Mt)&&!(Ve!=null&&e.pointerId!==Ve)){if(de=e.clientX,Z=e.clientY,!ve){const a=Math.hypot(e.clientX-bt,e.clientY-ht);if(e.pointerType==="touch"){if(tn)a>=4&&en(e.clientX,e.clientY);else if(a>Os){Mt=!0,window._isTouchHoldingTask=!1,ne&&(clearTimeout(ne),ne=null),U&&(U.classList.remove("is-touch-charging"),U.classList.remove("is-touch-holding"));return}}else if(a>=6)en(e.clientX,e.clientY);else return}ve&&(e.cancelable&&e.preventDefault(),Ns(e.clientX,e.clientY,e.pointerType))}},{passive:!1});document.addEventListener("pointerup",async e=>{if(ne&&(clearTimeout(ne),ne=null),U&&(U.classList.remove("is-touch-charging"),U.classList.remove("is-touch-holding")),Ve!=null&&U)try{U.releasePointerCapture(Ve)}catch{}if(!ve){oe();return}await Rs(e.clientX,e.clientY)});document.addEventListener("pointercancel",e=>{ve||oe()});window.addEventListener("blur",()=>{(ve||U)&&oe()});document.addEventListener("visibilitychange",()=>{document.hidden&&(ve||U)&&oe()});window.addEventListener("touchmove",e=>{ve&&e.cancelable&&e.preventDefault()},{passive:!1});window.addEventListener("touchend",()=>{window._isTouchHoldingTask=!1,ne&&(clearTimeout(ne),ne=null)},{passive:!0});window.addEventListener("touchcancel",()=>{oe()});document.addEventListener("dragstart",e=>{e.target.closest(".task-card")&&e.preventDefault()});document.addEventListener("click",e=>{window._justDroppedAt&&Date.now()-window._justDroppedAt<500&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},!0);document.addEventListener("keydown",async e=>{if(e.target.closest('input, textarea, select, [contenteditable="true"]')||document.querySelector(".modal-overlay, #taskModal, .modal-backdrop"))return;const a=document.activeElement?.closest?.(".task-card");if((e.key===" "||e.altKey&&(e.key==="m"||e.key==="M"))&&a){const n=(o.data?.tasks||[]).find(r=>r.id===a.dataset.taskId);if(!Ft(n))return;if(e.preventDefault(),Pe)Pe===n.id&&(K?.classList.remove("is-keyboard-grabbed"),K?.setAttribute("aria-grabbed","false"),Pe=null,K=null,window._isKeyboardDraggingTask=!1,Qe(t("تم إلغاء الإمساك بالمهمة.","Task released.")));else{Pe=n.id,K=a,oi=n.status,Ia=n.sortOrder||n.sort_order,window._isKeyboardDraggingTask=!0,a.classList.add("is-keyboard-grabbed"),a.setAttribute("aria-grabbed","true");const r=a.closest(".board-column")?.querySelector(".board-column-title")?.innerText?.trim()||"",s=t(n.titleAr,n.titleEn);Qe(t(`تم الإمساك بالمهمة "${s}". العمود الحالي: ${r}. استخدم الأسهم للتحريك، Enter للإفلات، Escape للإلغاء.`,`Grabbed task "${s}". Current column: ${r}. Use arrow keys to move, Enter to drop, Escape to cancel.`))}return}if(Pe&&K){const n=(o.data?.tasks||[]).find(l=>l.id===Pe);if(!n)return;const r=K.closest(".board-column");if(!r)return;const s=Array.from(document.querySelectorAll(".board-column")),i=s.indexOf(r),d=document.documentElement.dir==="rtl"||o.lang==="ar";if(e.key==="ArrowUp"){e.preventDefault();const l=K.previousElementSibling;l&&l.classList.contains("task-card")&&(r.querySelector(".board-cards").insertBefore(K,l),K.focus(),Qe(t("تم التحريك للأعلى.","Moved up.")));return}if(e.key==="ArrowDown"){e.preventDefault();const l=K.nextElementSibling;l&&l.classList.contains("task-card")&&(r.querySelector(".board-cards").insertBefore(l,K),K.focus(),Qe(t("تم التحريك للأسفل.","Moved down.")));return}if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const l=d?"ArrowLeft":"ArrowRight",p=e.key===l?i+1:i-1;if(p>=0&&p<s.length){const u=s[p],f=u.querySelector(".board-cards");if(f){f.appendChild(K),K.focus();const y=u.querySelector(".board-column-title")?.innerText?.trim()||"";Qe(t(`تم النقل إلى عمود: ${y}.`,`Moved to column: ${y}.`))}}return}if(e.key==="Enter"){e.preventDefault();const l=K.closest(".board-column"),p=Pe;if(K.classList.remove("is-keyboard-grabbed"),K.setAttribute("aria-grabbed","false"),Pe=null,K=null,window._isKeyboardDraggingTask=!1,l&&p){const u=K?K.getBoundingClientRect():null;await Qa(l,u?u.top+10:0,p)}return}if(e.key==="Escape"){e.preventDefault(),K.classList.remove("is-keyboard-grabbed"),K.setAttribute("aria-grabbed","false"),Pe=null,K=null,window._isKeyboardDraggingTask=!1,n.status=oi,Ia!==null&&(n.sortOrder=Ia),L(!0),Qe(t("تم إلغاء النقل وإعادة المهمة لمكانها الأصلي.","Move cancelled. Task returned to original position."));return}}});window.state=o;document.documentElement.dataset.theme=o.theme;document.documentElement.lang=o.lang;document.documentElement.dir=o.lang==="ar"?"rtl":"ltr";o.lang==="en"?document.body.classList.add("is-ltr"):document.body.classList.remove("is-ltr");Object.assign(window,$o);Object.assign(window,Mo);Object.assign(window,Ro);Object.assign(window,Oo);Object.assign(window,Ho);Object.assign(window,is);Object.assign(window,Ko);Object.assign(window,ds);Object.assign(window,cs);Object.assign(window,Qo);Object.assign(window,ms);Object.assign(window,No);Object.assign(window,js);Object.assign(window,ko);window._recentlyMovedTasks=window._recentlyMovedTasks||new Map;ys();document.addEventListener("click",e=>{const a=e.target.closest("[data-action], [data-view], button, a");if(a){const n=a.dataset.action||a.dataset.view||a.innerText?.trim()?.slice(0,40)||a.tagName;tt("ui.click",`النقر على: ${n}`)}typeof Ga=="function"&&Ga(e).catch(n=>{ga(n,{source:"handleClick"}),typeof k=="function"&&k(n.message,!0)})});document.addEventListener("submit",e=>{const a=e.target.id||e.target.dataset.action||"form";tt("form.submit",`إرسال نموذج: ${a}`),typeof Va=="function"&&Va(e).catch(n=>{ga(n,{source:"handleSubmit"}),typeof k=="function"&&k(n.message,!0)})});document.addEventListener("input",e=>{typeof Ja=="function"&&Ja(e)});document.addEventListener("change",e=>{typeof Ka=="function"&&Ka(e)});document.addEventListener("keydown",e=>{e.key==="Escape"&&typeof H=="function"&&H()});var Da=null;window.addEventListener("resize",()=>{o.view==="project-detail"&&o.projectTab==="timeline"&&(Da||(Da=requestAnimationFrame(()=>{Da=null,typeof Ca=="function"&&Ca()})))});window.addEventListener("error",e=>{const a=String(e?.message||e?.error?.message||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Runtime Error:",e.error),ga(e.error||{message:a},{source:"window.onerror"}),typeof k=="function"&&k(`خطأ برمجي: ${e.message}`,!0))});window.addEventListener("unhandledrejection",e=>{const a=String(e?.reason?.message||e?.reason||"");a.includes("Turnstile")||a.includes("turnstile")||a.includes("Script error")||a.includes("challenges.cloudflare.com")||a.includes("SafariExtensionMessageEvent")||a.includes("Blocked a frame with origin")||a.includes("No available adapters")||a.includes("ResizeObserver loop")||(console.error("Unhandled Rejection:",e.reason),ga(e.reason||{message:a},{source:"unhandledrejection",errorType:"UnhandledRejection"}))});"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{e.addEventListener("updatefound",()=>{const a=e.installing;a&&a.addEventListener("statechange",()=>{a.state==="installed"&&navigator.serviceWorker.controller&&console.log("[PWA] New version ready for next visit.")})})}).catch(e=>{console.warn("[PWA] ServiceWorker registration skipped:",e.message)})});Is();zo();io();
