var Ha=Object.defineProperty,re=(e,n)=>{let a={};for(var r in e)Ha(a,r,{get:e[r],enumerable:!0});return n||Ha(a,Symbol.toStringTag,{value:"Module"}),a};(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=a(o);fetch(o.href,i)}})();function At(e){if(typeof document>"u"||!e||!document.cookie)return null;const n=document.cookie.split("; "),a=encodeURIComponent(String(e))+"=",r=String(e)+"=";for(let o=0;o<n.length;o++){const i=n[o];if(i.startsWith(a)){const l=i.substring(a.length);try{return decodeURIComponent(l)}catch{return l}}else if(i.startsWith(r)){const l=i.substring(r.length);try{return decodeURIComponent(l)}catch{return l}}}return null}function ci(){if(typeof window>"u")return"ar";try{let e=At("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const n=At("darc_prefs");if(n)try{e=JSON.parse(n).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function pi(){if(typeof window>"u")return"light";try{let e=At("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const n=At("darc_prefs");if(n)try{e=JSON.parse(n).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function ui(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const n=window.location.hash.replace(/^#/,"");if(n&&!["login","forgot"].includes(n)){const[r,o]=n.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(r)){let i=null,l="overview",d="profile";if(o){const p=new URLSearchParams(o),m=p.get("id");m&&/^[a-zA-Z0-9_-]{3,64}$/.test(m)&&(i=m);const g=p.get("tab");g&&["overview","tasks","drawings","documents","timeline","activity"].includes(g)&&(l=g);const y=p.get("section");y&&["profile","company","roles","accounts","audit","trash","preferences"].includes(y)&&(d=y)}return{view:r,activeProjectId:i,projectTab:l,settingsSection:d}}}const a=sessionStorage.getItem("darc_last_route");if(a){const r=JSON.parse(a);if(r.view)return{view:r.view,activeProjectId:r.activeProjectId||null,projectTab:r.projectTab||"overview",settingsSection:r.settingsSection||"profile"}}}catch{}return e}var bt=ui(),s={lang:ci(),theme:pi(),view:bt.view,activeProjectId:bt.activeProjectId,projectTab:bt.projectTab,settingsSection:bt.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},mi="darc_offline_db",fi=1,Te="cache_store",We="darc_offline_bootstrap",xe="darc_offline_mutations_queue",Ht=!1,Wt=null;function ua(){return typeof indexedDB>"u"?Promise.resolve(null):(Wt||(Wt=new Promise(e=>{try{const n=indexedDB.open(mi,fi);n.onupgradeneeded=a=>{const r=a.target.result;r.objectStoreNames.contains(Te)||r.createObjectStore(Te)},n.onsuccess=()=>e(n.result),n.onerror=()=>e(null)}catch{e(null)}})),Wt)}async function gi(e){const n=await ua();return n?new Promise(a=>{try{const r=n.transaction(Te,"readonly").objectStore(Te).get(e);r.onsuccess=()=>a(r.result||null),r.onerror=()=>a(null)}catch{a(null)}}):null}async function vi(e,n){const a=await ua();return a?new Promise(r=>{try{const o=a.transaction(Te,"readwrite").objectStore(Te).put(n,e);o.onsuccess=()=>r(!0),o.onerror=()=>r(!1)}catch{r(!1)}}):!1}async function Wa(e){const n=await ua();return n?new Promise(a=>{try{const r=n.transaction(Te,"readwrite").objectStore(Te).delete(e);r.onsuccess=()=>a(!0),r.onerror=()=>a(!1)}catch{a(!1)}}):!1}function yi(){return typeof navigator<"u"?navigator.onLine:!0}function me(e){if(!e)return;const n={timestamp:Date.now(),data:e};if(vi(We,n).catch(()=>{}),typeof localStorage<"u"){const a=()=>{try{localStorage.setItem(We,JSON.stringify(n))}catch(r){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",r.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(a,{timeout:2e3}):setTimeout(a,50)}}function sn(){if(typeof localStorage<"u")try{const e=localStorage.getItem(We);if(e){const n=JSON.parse(e);if(n?.data)return n.data}}catch{}return null}async function Ja(){const e=await gi(We);return e?.data?e.data:sn()}async function Va(){if(typeof localStorage<"u")try{localStorage.removeItem(We),localStorage.removeItem(xe)}catch{}await Promise.all([Wa(We),Wa(xe)]),Ue()}function Ue(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:pt().length}}))}function qe(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function Ga({path:e,method:n="POST",body:a=null,description:r=""}){if(typeof localStorage>"u")return null;try{const o=localStorage.getItem(xe),i=o?JSON.parse(o):[];if(n==="DELETE"){if(e.startsWith("/api/tasks/")){const d=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/tasks"&&p.body?.id===d)){const p=i.filter(m=>!(m.path==="/api/tasks"&&m.body?.id===d||m.path===`/api/tasks/${d}`||m.path.startsWith(`/api/tasks/${d}/`)));return localStorage.setItem(xe,JSON.stringify(p)),Ue(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const d=e.split("/")[3];if(i.some(p=>p.method==="POST"&&p.path==="/api/projects"&&p.body?.id===d)){const p=i.filter(m=>!(m.path==="/api/projects"&&m.body?.id===d||m.path===`/api/projects/${d}`||m.method==="POST"&&m.path==="/api/tasks"&&m.body?.projectId===d));return localStorage.setItem(xe,JSON.stringify(p)),Ue(),{id:"compacted",compacted:!0}}}}const l={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substr(2,6),path:e,method:n,body:a,description:r,createdAt:new Date().toISOString()};return i.push(l),localStorage.setItem(xe,JSON.stringify(i)),Ue(),console.log("[Offline Outbox] Enqueued mutation:",l),l}catch(o){return console.warn("[Offline Outbox] Failed to enqueue mutation:",o.message),null}}function pt(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(xe);return e?JSON.parse(e):[]}catch{return[]}}function bi(){typeof localStorage>"u"||(localStorage.removeItem(xe),Ue())}function Ya(e,n,a,r){if(!r||!r.data)return{ok:!0,queued:!0,offline:!0};const o=new Date().toISOString();if(n==="POST"&&e==="/api/tasks"&&a){const i=a.id||qe("tsk");a.id=i;const l={id:i,code:"OFFLINE",projectId:a.projectId,titleAr:a.titleAr,titleEn:a.titleEn||a.titleAr,descriptionAr:a.descriptionAr||"",descriptionEn:a.descriptionEn||"",status:a.status||"not_started",priority:a.priority||"medium",categoryAr:a.categoryAr||"عام",categoryEn:a.categoryEn||"General",weight:Number(a.weight||1),progress:Number(a.progress||0),assigneeId:a.assigneeId||null,assignee:r.data.users?.find(p=>p.id===a.assigneeId)||null,reviewerId:a.reviewerId||null,startDate:a.startDate||null,dueDate:a.dueDate||null,customFields:a.customFields||{},createdAt:o,updatedAt:o,_isOfflinePending:!0};r.data.tasks||(r.data.tasks=[]);const d=r.data.tasks.findIndex(p=>p.id===i);return d!==-1?r.data.tasks[d]=l:r.data.tasks.unshift(l),me(r.data),{ok:!0,queued:!0,offline:!0,task:l}}if(n==="PATCH"&&e.startsWith("/api/tasks/")&&a){const i=e.split("/")[3],l=(r.data.tasks||[]).findIndex(d=>d.id===i);if(l!==-1){const d={...r.data.tasks[l],...a,updatedAt:o,_isOfflinePending:!0};return a.assigneeId!==void 0&&(d.assignee=r.data.users?.find(p=>p.id===a.assigneeId)||null),r.data.tasks[l]=d,me(r.data),{ok:!0,queued:!0,offline:!0,task:d}}}if(n==="DELETE"&&e.startsWith("/api/tasks/")){const i=e.split("/")[3];return r.data.tasks&&(r.data.tasks=r.data.tasks.filter(l=>l.id!==i),me(r.data)),{ok:!0,queued:!0,offline:!0}}if(n==="POST"&&e==="/api/projects"&&a){const i=a.id||qe("prj");a.id=i;const l={id:i,code:a.code||"DARC-OFF",nameAr:a.nameAr||a.name||"مشروع محلي جديد",nameEn:a.nameEn||a.name||"New Offline Project",clientAr:a.clientAr||"",clientEn:a.clientEn||"",descriptionAr:a.descriptionAr||"",descriptionEn:a.descriptionEn||"",lifecycle:a.lifecycle||"planning",health:a.health||"on_track",progress:0,progressMode:"weighted",managerId:a.managerId||r.data.user?.id,startDate:a.startDate||null,dueDate:a.dueDate||null,createdAt:o,updatedAt:o,_isOfflinePending:!0};r.data.projects||(r.data.projects=[]);const d=r.data.projects.findIndex(p=>p.id===i);return d!==-1?r.data.projects[d]=l:r.data.projects.unshift(l),me(r.data),{ok:!0,queued:!0,offline:!0,project:l}}if(n==="PATCH"&&e.startsWith("/api/projects/")&&a){const i=e.split("/")[3],l=(r.data.projects||[]).findIndex(d=>d.id===i);if(l!==-1){const d={...r.data.projects[l],...a,updatedAt:o,_isOfflinePending:!0};return r.data.projects[l]=d,me(r.data),{ok:!0,queued:!0,offline:!0,project:d}}}if(n==="DELETE"&&e.startsWith("/api/projects/")){const i=e.split("/")[3];return r.data.projects&&(r.data.projects=r.data.projects.filter(l=>l.id!==i),me(r.data)),{ok:!0,queued:!0,offline:!0}}if(n==="POST"&&e.includes("/comments")&&a){const i=e.split("/")[3],l={id:a.id||qe("cmt"),taskId:i,userId:r.data.user?.id,content:a.content,createdAt:o,_isOfflinePending:!0};return a.id=l.id,r.data.comments||(r.data.comments=[]),r.data.comments.some(d=>d.id===l.id)||r.data.comments.push(l),me(r.data),{ok:!0,queued:!0,offline:!0,comment:l}}return n==="PATCH"&&e==="/api/tasks/reorder"&&a&&Array.isArray(a.items)?(r.data.tasks&&(a.items.forEach(i=>{const l=r.data.tasks.find(d=>d.id===i.id);l&&(i.status&&(l.status=i.status),i.sortOrder&&(l.sortOrder=i.sortOrder),i.customFields&&(l.customFields={...l.customFields||{},...i.customFields}),l._isOfflinePending=!0)}),me(r.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function ma(e){if(Ht)return{total:0,synced:0,failed:0};const n=pt();if(!n.length)return{total:0,synced:0,failed:0};Ht=!0,console.log(`[Offline Sync] Replaying ${n.length} pending mutations...`);let a=0,r=!1;const o=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,i=new Set(["POST","PATCH","PUT","DELETE"]);for(let l=0;l<n.length;l++){const d=n[l];if(!d||!d.path||typeof d.path!="string"||!o.test(d.path)||!i.has(d.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",d?.id,d?.path);continue}try{const p={method:d.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":d.id,"X-Idempotency-Key":d.id}};d.body&&(p.body=typeof d.body=="string"?d.body:JSON.stringify(d.body));const m=await e(d.path,p);if(m&&m.error&&!m.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",d.id,m.error);else{a++;const g=d.body&&typeof d.body=="object"&&d.body.id||typeof d.path=="string"&&d.path.split("/")[3];g&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(g)}}catch(p){if(console.error("[Offline Sync] Failed to replay mutation:",d.id,d.path,p.message),typeof navigator<"u"&&!navigator.onLine||p.message&&(p.message.includes("تعذر الاتصال")||p.message.includes("fetch")||p.message.includes("NetworkError")||p.name==="TypeError")){const m=n.slice(l);typeof localStorage<"u"&&localStorage.setItem(xe,JSON.stringify(m)),r=!0;break}}}return r||bi(),Ht=!1,Ue(),{total:n.length,synced:a,failed:r?n.length-a:0}}var hi=re({closeModal:()=>Y,modalShell:()=>ue,renderLoading:()=>rn,showToast:()=>$});function rn(){document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${t("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var De=!1,Ee=null;function Y(e=!1){Ee&&(clearTimeout(Ee),Ee=null);const n=document.getElementById("preview-modal-overlay");n&&(n.style.display="none",n.innerHTML="");const a=document.getElementById("modal-root");if(!a||!a.hasChildNodes()){document.body.style.overflow="",De=!1;return}if(e){a.innerHTML="",document.body.style.overflow="",De=!1;return}if(De)return;De=!0;const r=a.querySelector(".modal-backdrop"),o=a.querySelector(".modal");r&&o?(r.classList.add("is-closing"),o.classList.add("is-closing"),Ee=setTimeout(()=>{Ee=null,a.innerHTML="",document.body.style.overflow="",De=!1},150)):(a.innerHTML="",document.body.style.overflow="",De=!1)}function ue(e,n,a,r="",o=""){return Ee&&(clearTimeout(Ee),Ee=null),De=!1,document.body.style.overflow="hidden",`<div class="modal-backdrop"><div class="modal ${o}" data-modal="${r}"><div class="modal-head"><div><h2>${c(e)}</h2><p>${c(n||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${t("إغلاق","Close")}">${h("close",15)}</button></div>${a}</div></div>`}function $(e,n=!1){const a=document.getElementById("toast-root");if(!a)return;const r=document.createElement("div");r.className=`toast ${n?"error":""}`,r.innerHTML=`${h(n?"alert":"check",16)}<span>${c(e)}</span>`,a.appendChild(r),setTimeout(()=>r.remove(),3600)}var xi=re({I18N:()=>Xt,PERMISSION_ALIASES:()=>pn,avatar:()=>U,can:()=>S,canManageAccountPermissions:()=>Ai,choose:()=>t,currentViewTitle:()=>ya,dateLabel:()=>Mt,dueLabel:()=>ln,esc:()=>c,extractDrawingVersion:()=>dn,formatDateTime:()=>va,formatReportDate:()=>ze,formatReportTime:()=>ut,formatUnifiedDateNumeric:()=>$i,getActiveCalendarSystem:()=>je,getCookieVal:()=>wi,getFileFormatInfo:()=>ga,getHijriDateEquivalent:()=>ki,getTaskStatusStyle:()=>fa,getTimeBasedGreeting:()=>on,icon:()=>h,initials:()=>st,isAdmin:()=>D,isOverdue:()=>Ae,playSuccessChime:()=>Tt,priorityText:()=>Ei,roleFor:()=>cn,roleName:()=>ee,runInWorker:()=>Ti,sanitizeForSpreadsheet:()=>O,savePreferencesCookies:()=>it,showToast:()=>$,statusBadge:()=>Si,statusText:()=>B,t:()=>f}),Xt={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function f(e){return Xt[s.lang][e]||Xt.ar[e]||e}function t(e,n){return s.lang==="ar"?e:n}function wi(e){if(typeof document>"u"||!e)return null;const n=document.cookie?document.cookie.split("; "):[];for(const a of n){const r=a.indexOf("=");if(r!==-1&&a.slice(0,r).trim()===e)return decodeURIComponent(a.slice(r+1))}return null}function it({theme:e,lang:n}={}){if(typeof document>"u")return;const a=31536e3,r=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let o="";if(typeof window<"u"){const g=window.location.hostname;(g==="darc-design.bond"||g.endsWith(".darc-design.bond"))&&(o="; Domain=.darc-design.bond")}const i=e==="dark"||e==="light"?e:null,l=n==="ar"||n==="en"?n:null;if(i){document.cookie=`darc_theme=${encodeURIComponent(i)}; Path=/; Max-Age=${a}; SameSite=Lax${r}${o}`;try{window.localStorage.setItem("darc-theme",i)}catch{}}if(l){document.cookie=`darc_lang=${encodeURIComponent(l)}; Path=/; Max-Age=${a}; SameSite=Lax${r}${o}`;try{window.localStorage.setItem("darc-locale",l)}catch{}}const d=i||(s&&s.theme==="dark"?"dark":"light")||"light",p=l||(s&&s.lang==="en"?"en":"ar")||"ar",m=JSON.stringify({theme:d,lang:p});document.cookie=`darc_prefs=${encodeURIComponent(m)}; Path=/; Max-Age=${a}; SameSite=Lax${r}${o}`}function c(e){return String(e??"").replace(/[&<>'"]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[n])}function O(e){if(e==null)return"";const n=String(e),a=n.trimStart();return/^[=+@\-]/.test(a)||/^[\t\r]/.test(n)?`'${n}`:n}function h(e,n=18){const a={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};return`<svg width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a[e]||a.info}</svg>`}function st(e){if(!e)return"D";const n=s.lang==="ar"?e.name:e.nameEn||e.name;return(n.replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(a=>a[0]).join("")||n.slice(0,2)).toUpperCase()}function U(e,n=""){const a=e||{name:"DARC",avatarColor:"#0d6269"},r=/^#[0-9a-f]{6}$/i.test(a.avatarColor||"")?a.avatarColor:"#0d6269",o=c(t(a.name,a.nameEn||a.name));if(a.avatarUrl){const i=c(st(a)).replace(/['"\\]/g,"");return`<span class="avatar ${n}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${o}"><img src="${c(a.avatarUrl)}" alt="${o}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${r}';this.parentElement.textContent='${i}';" /></span>`}return`<span class="avatar ${n}" style="background:${r}" title="${o}">${c(st(a))}</span>`}function on(){const e=new Date().getHours();return s.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function fa(e){const n=e?.status,a=Ae(e);return n==="done"||n==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:t("مكتملة","Completed")}:n==="review"||n==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:t("للمراجعة والاعتماد","In Review")}:n==="blocked"||a?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:a?t("متأخرة","Overdue"):t("متوقفة","Blocked")}:n==="in_progress"||n==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:t("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:t("غير مبدوءة","Not Started")}}function ga(e,n=""){const a=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(a)?{ext:a.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(a)?{ext:a.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:a==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["png","jpg","jpeg","webp","heic"].includes(a)?{ext:a.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["zip","rar","7z","tar"].includes(a)?{ext:a.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:a.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function dn(e){if(!e)return null;const n=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return n?`V${n[1]}`:null}function je(){return s.calendarSystem||s.data?.user?.customFields?.calendarSystem||localStorage.getItem("darc_calendar_system")||"gregorian"}function Mt(e,n=!0){if(!e)return"—";const a=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(a.getTime()))return"—";if(je()==="hijri"){const o=s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura";return new Intl.DateTimeFormat(o,{day:"numeric",month:"short",...n?{year:"numeric"}:{}}).format(a)}const r=s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory";return new Intl.DateTimeFormat(r,{day:"numeric",month:"short",...n?{year:"numeric"}:{}}).format(a)}function $i(e){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(n.getTime()))return"—";if(je()==="hijri"){const a=s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura";return new Intl.DateTimeFormat(a,{day:"2-digit",month:"2-digit",year:"numeric"}).format(n)}return`${String(n.getDate()).padStart(2,"0")}/${String(n.getMonth()+1).padStart(2,"0")}/${n.getFullYear()}`}function va(e,n={}){if(!e)return{date:"—",time:"—",full:"—"};try{const a=new Date(e);if(Number.isNaN(a.getTime()))return{date:String(e),time:"—",full:String(e)};const r=je(),o=s.lang==="ar",i=r==="hijri"?o?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":o?"ar-u-ca-gregory":"en-GB-u-ca-gregory",l=new Intl.DateTimeFormat(i,{year:"numeric",month:n.monthStyle||"short",day:"numeric"}).format(a),d=o?"ar-SA":"en-US",p=new Intl.DateTimeFormat(d,{hour:"2-digit",minute:"2-digit",...n.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(a);return{date:l,time:p,full:`${l} ${p}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function ze(e=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"—";const a=je(),r=s.lang==="ar",o=a==="hijri"?r?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":r?"ar-u-ca-gregory":"en-GB-u-ca-gregory";return new Intl.DateTimeFormat(o,{dateStyle:"full"}).format(n)}function ut(e=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"—";const a=s.lang==="ar";return new Intl.DateTimeFormat(a?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(n)}function ki(e){if(!e)return"";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?"":new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(n)}function ln(e){if(!e)return"—";const n=new Date(`${e}T23:59:59`),a=Math.ceil((n-new Date)/864e5);return a<0?t(`متأخرة ${Math.abs(a)} ${f("days")}`,`${Math.abs(a)} ${f("days")} ${f("ago")}`):a===0?f("today"):t(`بعد ${a} ${f("days")}`,`in ${a} ${f("days")}`)}function Ae(e){return e?.dueDate&&!["done","completed","canceled"].includes(e.status)&&new Date(`${e.dueDate}T23:59:59`)<new Date}function B(e){return{not_started:f("notStarted"),in_progress:f("inProgress"),review:f("review"),approval:f("approval"),done:f("done"),blocked:f("blocked"),canceled:f("canceled"),planning:f("planning"),active:f("active"),on_hold:f("onHold"),completed:f("completed"),archived:f("archived"),on_track:f("onTrack"),at_risk:f("atRisk"),off_track:f("offTrack")}[e]||e}function Si(e){return e?`<span class="status-badge ${c(e)}">${c(B(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function Ei(e){return{low:f("low"),medium:f("medium"),high:f("high"),urgent:f("urgent")}[e]||e}function cn(e){const n=typeof e=="string"?s.data?.users.find(a=>a.id===e):e;return n?s.data?.roles.find(a=>a.id===n.roleId)||{id:n.roleId,nameAr:n.roleNameAr||"",nameEn:n.roleNameEn||"",permissions:[]}:null}function ee(e){const n=cn(e);return n?t(n.nameAr,n.nameEn):"—"}var pn={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function S(e){const n=s.data?.role?.permissions||[];if(n.includes("*")||n.includes(e))return!0;const a=pn[e];return!!(a&&n.includes(a))}function D(){return s.data?.user?.roleId==="admin"}function Ai(){return D()||s.data?.user?.roleId==="account_permissions_manager"||s.data?.role?.permissions?.includes("manage_existing_account_permissions")}function ya(){return s.view==="project-detail"?t("تفاصيل المشروع","Project details"):{dashboard:f("dashboard"),projects:f("projects"),tasks:f("myTasks"),documents:f("documents"),templates:f("templates"),team:f("team"),reports:f("reports"),settings:f("settings")}[s.view]||f("dashboard")}function Tt(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const n=new e,a=n.currentTime,r=n.createOscillator(),o=n.createGain();r.type="sine",r.frequency.setValueAtTime(587.33,a),o.gain.setValueAtTime(.08,a),o.gain.exponentialRampToValueAtTime(.001,a+.35),r.connect(o),o.connect(n.destination),r.start(a),r.stop(a+.35);const i=n.createOscillator(),l=n.createGain();i.type="sine",i.frequency.setValueAtTime(880,a+.12),l.gain.setValueAtTime(.001,a),l.gain.setValueAtTime(.09,a+.12),l.gain.exponentialRampToValueAtTime(.001,a+.65),i.connect(l),l.connect(n.destination),i.start(a+.12),i.stop(a+.65)}catch{}}function Ti(e,n){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(n)):new Promise((a,r)=>{try{const o=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),i=URL.createObjectURL(o),l=new Worker(i);l.onmessage=d=>{URL.revokeObjectURL(i),l.terminate(),d.data.ok?a(d.data.result):r(new Error(d.data.error))},l.onerror=d=>{URL.revokeObjectURL(i),l.terminate(),r(d)},l.postMessage(n)}catch{try{a(e(n))}catch(i){r(i)}}})}var ji=Date.now(),un=0,jt=0,It=0,Jt=null,Ka=Date.now(),xt=[];function mt(e="action",n="",a=null){const r=new Date().toTimeString().split(" ")[0];xt.push({time:r,category:e,message:String(n||"").slice(0,150),metadata:a?JSON.stringify(a).slice(0,200):null}),xt.length>15&&xt.shift()}function mn(){return[...xt]}typeof document<"u"&&setInterval(()=>{document.visibilityState==="visible"&&un++},1e3);if(typeof window<"u"){try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{It+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Dt(!1,!0)}),window.addEventListener("pagehide",()=>{Dt(!1,!0)})}function ba(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function Ii(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let n="Chrome";e.includes("Edg/")?n="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?n="Safari":e.includes("Firefox/")&&(n="Firefox");let a="macOS";return e.includes("Win")?a="Windows":e.includes("Android")?a="Android":e.includes("iPhone")||e.includes("iPad")?a="iOS":e.includes("Linux")&&(a="Linux"),{os:a,browser:n}}function Di(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function Rt(e,n={}){jt++;const{os:a,browser:r}=Ii(),o=Di(),i=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",l=e||{},d=String(l.message||l.reason||l||"Unknown client error"),p=String(l.stack||n.stack||"No stack trace provided."),m=l.name||n.errorType||"ClientRuntimeError";mt("error",`${m}: ${d}`);const g=s.data?.user||{},y={userId:g.id||"usr_demo",userName:g.name||"مدير التوظيف / زائر",userEmail:g.email||"demo@darc-design.bond",userRole:g.jobTitleAr||s.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:g.avatarColor||"#0d6269",errorType:m,errorMessage:d,stackTrace:p,deviceType:o,browser:r,os:a,screenResolution:i,memoryMb:ba(),currentView:s.view?`#${s.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:mn(),severity:n.severity||"high",titleAr:n.titleAr||`خطأ تشغيلي في مساحة العمل (${m})`,titleEn:n.titleEn||`Workspace Runtime Error (${m})`};try{return await _("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(y),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const u=new Blob([JSON.stringify(y)],{type:"application/json"});navigator.sendBeacon((Ot||"")+"/api/telemetry/report-error",u)}catch{}}}async function Dt(e=!1,n=!1){const a=Date.now(),r=Math.max(5,Math.round((a-Ka)/1e3));Ka=a;const o={userId:s.data?.user?.id||"anonymous",durationSeconds:r,memoryMb:ba(),errorCount:jt,longTaskCount:It,currentView:s.view||"dashboard"};if(o.memoryMb>140&&(e=!0),n&&typeof navigator<"u"&&navigator.sendBeacon)try{const i=new Blob([JSON.stringify(o)],{type:"application/json"}),l=(Ot||"")+"/api/telemetry/heartbeat";navigator.sendBeacon(l,i);return}catch{}try{const i=await _("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(o),silent:!0});return jt=0,It=0,i}catch{}}function _i(){Jt&&clearInterval(Jt),setTimeout(()=>Dt(!1),5e3),Jt=setInterval(()=>{document.visibilityState==="visible"&&Dt(!1)},45e3)}function fn(){return{totalSessionDurationSeconds:Math.round((Date.now()-ji)/1e3),activeDurationSeconds:un,memoryMb:ba(),errorCount:jt,longTaskCount:It,recentBreadcrumbs:mn()}}var Ot=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",Ke=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function Je(){Ke=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function _(e,n={}){const a=["POST","PATCH","PUT","DELETE"].includes(n.method),r=e.startsWith("/api/auth"),o=!!(n.headers&&(n.headers["X-Offline-Replay"]==="true"||n.headers["X-Offline-Replay"]===!0));let i=null;if(a&&n.body)try{i=typeof n.body=="string"?JSON.parse(n.body):n.body}catch{}if(n.method==="POST"&&i&&typeof i=="object"&&!o&&(e==="/api/tasks"&&!i.id?(i.id=qe("tsk"),n.body=JSON.stringify(i)):e==="/api/projects"&&!i.id?(i.id=qe("prj"),n.body=JSON.stringify(i)):e.includes("/comments")&&!i.id&&(i.id=qe("cmt"),n.body=JSON.stringify(i))),typeof navigator<"u"&&!navigator.onLine&&a&&!r){if(o)throw new Error(t("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));const v=Ga({path:e,method:n.method,body:i}),x=Ya(e,n.method,i,s);return $(t("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡","Offline mode: action saved locally and will auto-sync on reconnect 📡"),!1),{ok:!0,queued:!0,offline:!0,id:v?.id,...x}}const l=typeof localStorage<"u"?localStorage.getItem("darc_token"):null,d=!!(n.silent||n.headers&&n.headers["X-Silent"]),p=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),m=!!Ke&&(d||!!s.data||p),g=a?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,y={...l?{Authorization:`Bearer ${l}`}:{},...n.body?{"Content-Type":"application/json"}:{},...g?{"X-Mutation-ID":g}:{},...e==="/api/bootstrap"&&m?{"If-None-Match":Ke}:{},...e==="/api/bootstrap"&&!m?{"Cache-Control":"no-cache, no-store"}:{},...n.headers||{}};e==="/api/bootstrap"&&!m&&(n.cache="no-cache"),n.credentials="include";let b;try{b=await fetch(Ot+e,{...n,headers:y})}catch{if(a&&!r&&!o){const x=Ga({path:e,method:n.method,body:i}),j=Ya(e,n.method,i,s);return $(t("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡","Connection lost: action saved locally for auto-sync 📡"),!1),{ok:!0,queued:!0,offline:!0,id:x?.id,...j}}throw new Error(t("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(b.status===304)return null;if(!b.ok){const v=await b.text();b.status!==401&&console.error(`API Failed [${e}]: ${b.status} - ${v}`);let x={};try{x=JSON.parse(v)}catch{}b.status===401&&(Ke=null,typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login"&&(typeof localStorage<"u"&&localStorage.removeItem("darc_token"),s.data&&(s.data.user=null),typeof window<"u"&&window.location.hash!=="#login"&&(window.location.hash="#login"))),mt("api.error",`${n.method||"GET"} ${e} (Status ${b.status}: ${x.error||"Failed"})`);const j=new Error(x.error||`Failed to fetch ${e}`);throw j.status=b.status,j}const u=b.headers.get("ETag");if(u&&e==="/api/bootstrap"){Ke=u;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",u)}catch{}}const w=await b.json();if(["POST","PATCH","PUT","DELETE"].includes(n.method)){Je();let v=i&&typeof i.id=="string"?i.id:null;if(!v&&w&&typeof w=="object"&&(v=w.id||w.task?.id||w.project?.id||w.comment?.id||w.document?.id||w.data?.id),!v&&typeof e=="string"){const x=e.split("/");x.length>=4&&x[3]&&!x[3].includes("?")&&(v=x[3])}if(v&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(v),g&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(g),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let x=null;if(w&&(w.task?x={table:"tasks",action:n.method==="POST"?"INSERT":"UPDATE",record:w.task}:w.project?x={table:"projects",action:n.method==="POST"?"INSERT":"UPDATE",record:w.project}:w.comment?x={table:"comments",action:n.method==="POST"?"INSERT":"UPDATE",record:w.comment}:w.document&&(x={table:"documents",action:n.method==="POST"?"INSERT":"UPDATE",record:w.document})),!x&&n.method==="DELETE"&&v&&(e.startsWith("/api/tasks/")?x={table:"tasks",action:"DELETE",record:{id:v}}:e.startsWith("/api/projects/")?x={table:"projects",action:"DELETE",record:{id:v}}:e.startsWith("/api/documents/")?x={table:"documents",action:"DELETE",record:{id:v}}:e.startsWith("/api/comments/")&&(x={table:"comments",action:"DELETE",record:{id:v}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(x);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:x?"GRANULAR_DELTA":"STATE_MUTATION",delta:x,timestamp:Date.now()})}catch{}}}}return w}typeof window<"u"&&(window.api=_);var Pi=re({canAccessView:()=>H,getFirstAllowedView:()=>we,loadData:()=>pe,navItem:()=>be,refreshView:()=>Z,renderApp:()=>Q,renderSyncIndicator:()=>ha,renderView:()=>P,switchView:()=>de});function H(e){return s.data?e==="dashboard"?S("view_dashboard"):e==="projects"||e==="project-detail"?S("view_projects"):e==="tasks"?S("create_tasks")||S("edit_tasks")||S("delete_tasks")||S("assign_tasks")||S("review_tasks")||S("approve_tasks")||S("manage_reminders")||S("view_projects")||D():e==="documents"?S("upload_documents")||S("delete_documents")||D():e==="templates"?S("manage_templates")||D():e==="team"?D()||S("manage_users"):e==="reports"?S("view_reports")||D():e==="settings":!0}function we(){for(const e of["dashboard","projects","tasks","documents","templates","team","reports","settings"])if(H(e))return e;return"dashboard"}function ha(){const e=pt().length;return yi()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${t("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:"":`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${t("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${t("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}if(typeof window<"u"&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;const e=()=>{const n=document.getElementById("sync-status-indicator");n&&(n.innerHTML=ha())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function be(e,n,a){return`<button class="nav-item ${s.view===e||e==="projects"&&s.view==="project-detail"?"active":""}" data-view="${e}">${h(a,17)}<span>${n}</span></button>`}function Q(){if(s.data&&!H(s.view)&&(s.view=we()),typeof window<"u"){const r=window.location.hash.replace(/^#/,"");if(!r||r==="login"||r==="forgot"){let o=s.view;s.view==="project-detail"&&s.activeProjectId?o=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:s.view==="settings"&&s.settingsSection&&(o=`settings?section=${encodeURIComponent(s.settingsSection)}`),window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${o}`):(window._isInternalNav=!0,window.location.hash=`#${o}`)}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";const e=(s.data?.notifications||[]).filter(r=>!r.read).length,n=s.data?.user||{},a=D()||S("manage_settings")||S("manage_roles")||S("manage_users")||S("manage_trash")||S("view_audit_logs");document.getElementById("app").innerHTML=`
    <div class="app-shell ${s.lang==="en"?"is-ltr":""}">
      <aside class="sidebar ${s.sidebarOpen?"open":""}">
        <div class="sidebar-brand">
          ${s.data?.company?.logoUrl?`<img src="${c(s.data.company.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${h("building",20)}</span>`:`<span class="brand-mark">${h("building",20)}</span>`}
          <div>
            <div class="brand-name">${c(t(s.data?.company?.nameAr||s.data?.company?.name||"DARC Design Team",s.data?.company?.nameEn||s.data?.company?.name||"DARC Design Team"))}</div>
            <div class="brand-subtitle">${f("workspace")}</div>
          </div>
        </div>
        <div class="nav-title">${t("مساحة العمل","WORKSPACE")}</div>
        <nav class="nav-list">
          ${H("dashboard")?be("dashboard",f("dashboard"),"grid"):""}
          ${H("projects")?be("projects",f("projects"),"building"):""}
          ${H("tasks")?be("tasks",f("myTasks"),"checklist"):""}
          ${H("documents")?be("documents",f("documents"),"document"):""}
          ${H("templates")?be("templates",f("templates"),"layers"):""}
          ${H("team")?be("team",f("team"),"users"):""}
          ${H("reports")?be("reports",f("reports"),"chart"):""}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${a?t("إدارة النظام","ADMIN"):t("حسابي","MY ACCOUNT")}</div>
        <nav class="nav-list">${be("settings",a?f("settings"):t("الملف الشخصي والأمان","Profile & Security"),"settings")}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${U(n)}<div class="admin-info"><strong>${c(t(n.name,n.nameEn||n.name))}</strong><span>${c(ee(n))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${t("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${f("signOut")}">${h("logout",15)}</button></div>
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
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${h("menu",18)}</button><div><div class="topbar-kicker">DARC / ${f("workspace")}</div><div class="topbar-title">${c(ya())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${ha()}</span>
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
            <button class="icon-button" data-action="show-notifications" aria-label="${f("notifications")}">${h("bell",17)}${e?'<span class="notification-dot"></span>':""}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${U(n)}<div class="profile-chip-text"><strong>${c(t(n.name,n.nameEn||n.name))}</strong><span>${c(ee(n))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,P()}function P(){const e=document.getElementById("main-content");if(!e)return;H(s.view)||(s.view=we());let n="";s.view==="dashboard"&&(n=renderDashboard()),s.view==="projects"&&(n=renderProjects()),s.view==="tasks"&&(n=renderTasks()),s.view==="documents"&&(n=renderDocuments()),s.view==="templates"&&(n=renderTemplates()),s.view==="team"&&(n=renderTeam()),s.view==="reports"&&(n=renderReports()),s.view==="settings"&&(n=renderSettings()),s.view==="project-detail"&&(n=renderProjectDetail()),e.innerHTML=n,s.view==="project-detail"&&s.projectTab==="timeline"&&setTimeout(drawTimelineArrows,0)}function de(e,n=void 0){s.data&&!H(e)&&(e=we()),mt("navigation",`الانتقال إلى واجهة #${e}${n?` (مشروع: ${n})`:""}`),s.view=e,n!==void 0&&(s.activeProjectId=n),e==="settings"&&!s.settingsSection&&(s.settingsSection="profile"),s.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelectorAll(".nav-item").forEach(r=>{const o=r.dataset.view,i=o===e||o==="projects"&&e==="project-detail";r.classList.toggle("active",i)});const a=document.querySelector(".topbar-title");a&&(a.textContent=ya());try{let r=e;e==="project-detail"&&s.activeProjectId?r=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:e==="settings"&&s.settingsSection&&(r=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==r&&(window._isInternalNav=!0,window.location.hash=r),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:s.view,activeProjectId:s.activeProjectId,projectTab:s.projectTab,settingsSection:s.settingsSection}))}catch{}requestAnimationFrame(()=>{P();const r=document.getElementById("main-content");r&&(r.scrollTop=0,r.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function Z(e=!1){try{await pe(e)}catch(n){$(n.message,!0)}}async function pe(e=!1){try{const n=s.view==="settings"&&s.settingsSection==="trash"&&!s.trashLoaded?_("/api/trash",{silent:!0}).catch(()=>null):null;let a=await _("/api/bootstrap",{silent:e});if(a===null){if(s.data&&s.data.user)return;const o=await Ja();if(o&&o.user?a=o:(Je(),a=await _("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}})),!a)return}if(me(a),s.isOffline=!1,n)try{const o=await n;o&&(s.trash=Array.isArray(o)?o:o.trash||[...(o.projects||[]).map(i=>({...i,type:"project"})),...(o.tasks||[]).map(i=>({...i,type:"task"})),...(o.documents||[]).map(i=>({...i,type:"document"}))],s.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash)))}catch{}if(s.data?.tasks&&a?.tasks){const o=Date.now(),i=new Set(a.tasks.map(l=>l.id));for(const l of s.data.tasks)i.has(l.id)||o-(l.createdAt?new Date(l.createdAt).getTime():o)<12e4&&(a.tasks.unshift(l),i.add(l.id))}if(s.data?.projects&&a?.projects){const o=Date.now(),i=new Set(a.projects.map(l=>l.id));for(const l of s.data.projects)i.has(l.id)||o-(l.createdAt?new Date(l.createdAt).getTime():o)<12e4&&(a.projects.unshift(l),i.add(l.id))}let r=!1;if(s.data&&a)if(s.data.updatedAt!==a.updatedAt)r=!0;else if(s.data.tasks?.length!==a.tasks?.length||s.data.projects?.length!==a.projects?.length)r=!0;else{const o=s.data.tasks||[],i=a.tasks||[];for(let l=0;l<i.length;l++){const d=i[l],p=o[l];if(!p||p.id!==d.id||p.status!==d.status||(p.sortOrder||p.sort_order)!==(d.sortOrder||d.sort_order)||p.progress!==d.progress){r=!0;break}}if(!r){const l=s.data.projects||[],d=a.projects||[];for(let p=0;p<d.length;p++){const m=d[p],g=l[p];if(!g||g.id!==m.id||g.lifecycle!==m.lifecycle||g.health!==m.health||g.progress!==m.progress){r=!0;break}}}}if(!s.data||r||s.data.comments?.length!==a.comments?.length||s.data.documents?.length!==a.documents?.length||s.data.users?.length!==a.users?.length||s.data.auditLogs?.length!==a.auditLogs?.length||s.data.notifications?.length!==a.notifications?.length||s.view==="login"){s.data=a,(s.view==="login"||!H(s.view))&&(s.view=we());const o=!!document.getElementById("modal-root")?.children?.length,i=!!(document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),l=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(i||l))return;requestAnimationFrame(!e&&!o?()=>Q():()=>P())}else s.data=a,H(s.view)||(s.view=we(),requestAnimationFrame(()=>P()))}catch(n){if(n&&(n.status===401||n.status===403))throw n;const a=await Ja();if(a){s.data=a,H(s.view)||(s.view=we()),s.isOffline=!0;const r=!!document.getElementById("modal-root")?.children?.length;!e&&!r?Q():P();return}throw n}}typeof window<"u"&&(window.renderApp=Q,window.renderView=P);var Ci=re({calculatePasswordStrength:()=>vn,cleanupTurnstile:()=>Zt,initTurnstile:()=>xa,loadTurnstileScript:()=>gn,openForcePasswordModal:()=>Ri,renderActivation:()=>ft,renderLogin:()=>te,renderResetPassword:()=>Ve,renderStrengthMeterHtml:()=>Nt}),Li="0x4AAAAAAFr3zLr2zpRS2ah4",ce=null,Xe=null;function gn(){return typeof window>"u"||window.turnstile?Promise.resolve():Xe||(Xe=new Promise(e=>{if(window.onloadTurnstileCallback=()=>{e(),typeof window.__darcInitTurnstile=="function"&&window.__darcInitTurnstile()},document.getElementById("cf-turnstile-script")){window.turnstile&&e();return}const n=document.createElement("script");n.id="cf-turnstile-script",n.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback",n.async=!0,n.defer=!0,n.onerror=()=>{console.warn("[Turnstile] Script failed to load, fallback mode enabled"),e()},document.body.appendChild(n)}),Xe)}function Zt(){if(!(typeof window>"u")){if(window.turnstile&&ce!==null){try{window.turnstile.remove(ce)}catch{}ce=null}try{const e=document.getElementById("turnstile-container");e&&(e.innerHTML=""),document.querySelectorAll('iframe[src*="challenges.cloudflare.com"]').forEach(a=>{try{a.remove()}catch{}});const n=document.getElementById("cf-turnstile-script");n&&n.remove(),Xe=null}catch{}}}async function xa(){if(typeof window>"u")return;const e=document.getElementById("turnstile-container");if(e&&(window.turnstile||await gn(),!!window.turnstile)){if(ce!==null){try{window.turnstile.remove(ce)}catch{}ce=null}try{ce=window.turnstile.render(e,{sitekey:Li,theme:s.theme==="dark"?"dark":"light",language:s.lang==="ar"?"ar":"en",execution:"execute",appearance:"interaction-only",retry:"never","refresh-expired":"auto"})}catch(n){console.warn("[Turnstile] Render notice:",n)}}}typeof window<"u"&&(window.__darcInitTurnstile=xa);async function zi(){return typeof window>"u"||!window.turnstile||ce===null?"fallback_client":new Promise(e=>{let n=!1;const a=setTimeout(()=>{n||(n=!0,console.warn("[Turnstile] Token fetch timed out, fallback applied"),e("fallback_client"))},3500);try{window.turnstile.execute(ce,{callback:r=>{n||(n=!0,clearTimeout(a),e(r))},"error-callback":r=>{n||(n=!0,clearTimeout(a),console.warn("[Turnstile] Challenge execution error:",r),e("fallback_client"))},"expired-callback":()=>{n||(n=!0,clearTimeout(a),e("fallback_client"))}})}catch(r){n||(n=!0,clearTimeout(a),console.warn("[Turnstile] Execute threw:",r),e("fallback_client"))}})}function vn(e){const n=String(e||"");if(!n)return{score:0,label:"",percent:0,color:"var(--line)"};let a=0;return n.length>=10&&(a+=1),/[a-z]/.test(n)&&/[A-Z]/.test(n)&&(a+=1),/\d/.test(n)&&(a+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(n)&&(a+=1),a===1?{score:1,label:s.lang==="ar"?"ضعيفة جداً":"Very weak",percent:25,color:"var(--red)"}:a===2?{score:2,label:s.lang==="ar"?"متوسطة":"Fair",percent:50,color:"var(--amber)"}:a===3?{score:3,label:s.lang==="ar"?"جيدة":"Good",percent:75,color:"var(--blue)"}:{score:4,label:s.lang==="ar"?"قوية وممتازة 🛡️":"Strong & Secure 🛡️",percent:100,color:"var(--mint-strong)"}}function Nt(e="strength"){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${s.lang==="ar"?"10 أحرف + أرقام ورموز":"10+ chars, mixed, digits & symbols"}</span>
      </div>
    </div>
  `}function wa(e,n,a,r,o){const i=document.getElementById(e);if(!i)return;const l=i.querySelector(`input[name="${n}"]`),d=i.querySelector(`input[name="${a}"]`),p=i.querySelector(o||'button[type="submit"]'),m=document.getElementById(`${r}-meter-wrap`),g=document.getElementById(`${r}-meter-bar`),y=document.getElementById(`${r}-meter-label`),b=document.getElementById(`${r}-match-indicator`);function u(){const w=l?l.value:"",v=d?d.value:"";if(w&&m&&g&&y){m.style.display="flex";const x=vn(w);g.style.width=`${x.percent}%`,g.style.background=x.color,y.textContent=x.label,y.style.color=x.color}else m&&(m.style.display="none");d&&b&&(v?w===v?(b.style.display="block",b.style.color="var(--mint-strong)",b.textContent=s.lang==="ar"?"✓ كلمتا المرور متطابقتان":"✓ Passwords match",p&&(p.disabled=!1)):(b.style.display="block",b.style.color="var(--red)",b.textContent=s.lang==="ar"?"✗ كلمتا المرور غير متطابقتين":"✗ Passwords do not match",p&&(p.disabled=!0)):(b.style.display="none",p&&(p.disabled=!1)))}l?.addEventListener("input",u),d?.addEventListener("input",u)}function Ft(){document.querySelectorAll('[data-action="toggle-password-visibility"]').forEach(e=>{e.onclick=n=>{n.preventDefault();const a=e.getAttribute("data-target"),r=a?document.getElementById(a):e.parentElement.querySelector("input");if(!r)return;const o=r.type==="password";r.type=o?"text":"password",e.style.color=o?"var(--teal)":"var(--ink-soft)",e.setAttribute("aria-label",o?s.lang==="ar"?"إخفاء كلمة المرور":"Hide password":s.lang==="ar"?"إظهار كلمة المرور":"Show password")}}),document.querySelectorAll('input[type="password"]').forEach(e=>{const n=a=>{const r=a.getModifierState&&a.getModifierState("CapsLock");let o=e.parentElement.parentElement.querySelector(".capslock-warning");r?o||(o=document.createElement("div"),o.className="capslock-warning",o.style.fontSize="11px",o.style.color="var(--amber)",o.style.marginTop="4px",o.style.display="flex",o.style.alignItems="center",o.style.gap="4px",o.innerHTML=`<span>⚠️</span> <span>${s.lang==="ar"?"زر الحروف الكبيرة (Caps Lock) مفعّل":"Caps Lock is active"}</span>`,e.parentElement.parentElement.appendChild(o)):o&&o.remove()};e.addEventListener("keydown",n),e.addEventListener("keyup",n)})}function Mi(e,n=60){if(!e)return;e.disabled=!0;let a=n;const r=e.innerHTML,o=setInterval(()=>{a--,e.innerHTML=`<span>${s.lang==="ar"?`يرجى الانتظار (${a} ثانية)...`:`Please wait (${a}s)...`}</span>`,a<=0&&(clearInterval(o),e.disabled=!1,e.innerHTML=r)},1e3)}function te(e="",n="login",a=!1){if(s.view="login",typeof window<"u"){const d=n==="forgot"?"#forgot":"#login";window.location.hash!==d&&(window.history&&window.history.replaceState?window.history.replaceState(null,"",d):window.location.hash=d)}document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";let r="";const o=e?`<div class="login-demo" style="border-color:${a?"#cce3e0":"var(--red-soft)"};background:${a?"#f0f9f7":"var(--red-soft)"};color:${a?"var(--teal)":"var(--red)"};margin-top:0;margin-bottom:15px">${h(a?"check":"alert",15)}<span>${c(e)}</span></div>`:"",i=(typeof localStorage<"u"?localStorage.getItem("darc_last_email"):"")||"";n==="login"?r=`
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
        <div id="login-error-container">${o}</div>
        <div id="turnstile-container" style="margin-bottom:12px;min-height:0;display:flex;justify-content:center;"></div>
        <button class="btn btn-primary btn-block" type="submit">${h(s.lang==="ar"?"arrowLeft":"arrowRight",16)} ${f("login")}</button>
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
    `:n==="forgot"&&(r=`
      <form id="forgot-form">
        <div class="field"><label for="login-email">${f("emailAddress")}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${c(i)}" required /></div>
        ${o}
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
              <div><p class="eyebrow">${n==="login"?t("مرحبًا بعودتك","WELCOME BACK"):t("استعادة الحساب","ACCOUNT RECOVERY")}</p><h2>${n==="login"?f("login"):t("نسيت كلمة المرور","Forgot Password")}</h2><p class="intro">${n==="login"?f("loginIntro"):t("أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.","Enter your email to receive a reset link.")}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${s.theme==="dark"?"الوضع النهاري":"الوضع الليلي"}">${s.theme==="dark"?"☀️":"🌙"}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang==="ar"?"EN":"عربي"}</button>
              </div>
            </div>
            ${r}
          </div>
        </section>
      </div>
    </div>`,Ft();const l=d=>{const p=document.getElementById("login-error-container");p?p.innerHTML=d?`
        <div class="login-demo" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.08);color:var(--red);margin-top:0;margin-bottom:15px;padding:10px 14px;border-radius:8px;font-size:12.5px;display:flex;align-items:center;gap:8px;line-height:1.5;">
          ${h("alert",16)}
          <span>${c(d)}</span>
        </div>`:"":te(d,"login")};document.getElementById("login-form")?.addEventListener("submit",async d=>{d.preventDefault();const p=new FormData(d.currentTarget),m=String(p.get("email")||"").trim(),g=String(p.get("password")||""),y=document.getElementById("remember-email-check")?.checked,b=d.currentTarget.querySelector('button[type="submit"]'),u=`${h(s.lang==="ar"?"arrowLeft":"arrowRight",16)} ${f("login")}`;l(""),b.disabled=!0,b.innerHTML=`<span>⏳ ${t("جاري التحقق وتسجيل الدخول...","Verifying & signing in...")}</span>`;const w=m.trim().toLowerCase()==="demo@darc-design.bond"||m.trim().toLowerCase()==="demo@darc.local";let v="bypass_dev";w||(v=await zi());try{const x=await _("/api/auth/login",{method:"POST",body:JSON.stringify({email:m,password:g,turnstileToken:v})});Zt(),typeof localStorage<"u"&&(x?.token&&localStorage.setItem("darc_token",x.token),y?localStorage.setItem("darc_last_email",m):localStorage.removeItem("darc_last_email")),it({theme:s.theme,lang:s.lang}),Je(),s.view="dashboard",await pe(),Q()}catch(x){if(console.error("Login Error:",x),typeof window<"u"&&window.turnstile&&ce!==null)try{window.turnstile.reset(ce)}catch{}b&&(b.disabled=!1,b.innerHTML=u);let j=x.message;typeof navigator<"u"&&!navigator.onLine?j=t("لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة وإعادة المحاولة.","No internet connection. Please check your network and try again."):x.message&&(x.message.includes("Turnstile")||x.message.includes("التحقق الأمني"))?j=t("فشل التحقق الأمني التلقائي (Cloudflare Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.","Security check (Turnstile) failed. Please refresh the page and try again."):x.message&&(x.message.includes("429")||x.message.includes("كثيرة")||x.message.includes("rate"))?(j=t("تم تجاوز عدد محاولات الدخول المسموحة لحماية الحساب. يرجى الانتظار دقيقة واحدة قبل المحاولة مجدداً.","Too many login attempts. For security, please wait one minute before trying again."),Mi(document.querySelector('#login-form button[type="submit"]'),60)):x.message&&(x.message.includes("401")||x.message.includes("غير صحيحة")||x.message.includes("credentials"))?j=t("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من صحة المدخلات وإعادة المحاولة.","Incorrect email or password. Please verify your credentials and try again."):x.message&&(x.message.includes("مفعل")||x.message.includes("موقوف")||x.message.includes("inactive"))?j=t("حسابك معطل أو غير مفعل حالياً. يرجى التواصل مع مسؤول النظام لإعادة التفعيل.","This account is suspended or inactive. Please contact your system administrator."):(!j||j.includes("Failed to fetch")||j.includes("NetworkError")||j.includes("Network request failed"))&&(j=t("تعذر الاتصال بخادم تسجيل الدخول. يرجى التأكد من استقرار الإنترنت وإعادة المحاولة.","Could not reach the authentication server. Please check your connection and try again.")),l(j)}}),document.getElementById("forgot-form")?.addEventListener("submit",async d=>{d.preventDefault();const p=new FormData(d.currentTarget),m=d.currentTarget.querySelector('button[type="submit"]');m.disabled=!0;try{await _("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:p.get("email")})}),te(t("تم إرسال رابط الاستعادة إذا كان البريد مسجلاً.","Reset link sent if email is registered."),"forgot",!0)}catch(g){te(g.message,"forgot")}}),n==="login"?xa():Zt()}function ft(e,n=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light",document.getElementById("app").innerHTML=`
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
                <label for="act-pass">${f("password")}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Nt("act")}
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
    </div>`,Ft(),wa("activation-form","password","passwordConfirm","act",'#activation-form button[type="submit"]')}function Ve(e,n=""){document.body.classList.remove("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.documentElement.dataset.theme=s.theme||"light";const a=typeof e=="string"&&/^[a-zA-Z0-9_-]{24,128}$/.test(e.trim())?e.trim():null,r=!a&&!n?t("رابط إعادة تعيين كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.","Invalid or missing password reset link. Please request a new link."):"";document.getElementById("app").innerHTML=`
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
                ${Nt("rst")}
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
              ${n||r?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${h("alert",15)}<span>${c(n||r)}</span></div>`:""}
              <button class="btn btn-primary btn-block" type="submit" ${a?"":"disabled"}>${t("حفظ وتسجيل الدخول","Save and login")}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,Ft(),wa("reset-form","newPassword","newPasswordConfirm","rst",'#reset-form button[type="submit"]'),document.getElementById("reset-form")?.addEventListener("submit",async o=>{o.preventDefault();const i=new FormData(o.currentTarget),l=i.get("newPassword");if(l!==i.get("newPasswordConfirm")){Ve(e,t("كلمتا المرور غير متطابقتين.","Passwords do not match."));return}const d=o.currentTarget.querySelector('button[type="submit"]');d.disabled=!0;try{await _("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:e,newPassword:l})}),window.history.replaceState({},"",window.location.pathname),await pe()}catch(p){Ve(e,p.message)}})}function Ri(e){const n=e.status==="pending",a=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${n}">
      <div class="field">
        <label for="force-pass-input">${n?t("كلمة المرور للبدء","Initial password"):t("كلمة المرور الجديدة","New password")}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${t("إظهار/إخفاء كلمة المرور","Show/Hide password")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${Nt("force")}
        ${e.email?n?"":`<small class="field-hint" style="margin-top:6px;display:block;">${t("سيتم طرد المستخدم من جميع أجهزته فوراً.","The user will be signed out of all devices immediately.")}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${h("alert",12)} ${t("تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.","Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.")}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${n?t("تفعيل الحساب","Activate account"):t("حفظ وتغيير","Save and change")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ue(n?t("تفعيل الحساب يدوياً","Activate account manually"):t("تغيير كلمة المرور إجبارياً","Force change password"),n?t(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${c(e.name)}.`,`Set an initial password to activate ${c(e.name)}'s account.`):t(`تعيين كلمة مرور جديدة لحساب ${c(e.name)}`,`Set a new password for ${c(e.name)}`),a,"force-password"),Ft(),wa("force-password-form","newPassword",null,"force",'#force-password-form button[type="submit"]')}var Oi=re({attentionItem:()=>yn,metricCard:()=>Ze,projectProgress:()=>Ni,pulseChart:()=>hn,renderDashboard:()=>Fi,renderReports:()=>Bi,teamMetrics:()=>$a,teamRow:()=>bn});function Ze(e,n,a,r,o,i=""){return`<article class="metric-card ${r}"><div class="metric-top"><span class="metric-label">${c(e)}</span><span class="metric-icon">${h(o,15)}</span></div><div class="metric-value">${c(n)}</div><span class="metric-note ${i}">${c(a)}</span></article>`}function Ni(e){const n=e.health==="off_track"?"red":e.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${f("weightedProgress")}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${n}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function yn(e){const n=Ae(e)||e.status==="blocked"?"red":"amber",a=Ae(e)?t("متأخرة","Overdue"):e.status==="blocked"?t("متوقفة","Blocked"):t("تستحق قريبًا","Due soon");return`<button class="attention-item" data-action="open-task" data-task-id="${c(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${n}">${h(Ae(e)||e.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${c(t(e.titleAr,e.titleEn))}</strong><span>${c(a)} · ${c(ln(e.dueDate))}</span></span></button>`}function $a(e,n){const a=n.filter(i=>i.assigneeId===e),r=a.reduce((i,l)=>i+Number(l.weight||1),0),o=r?Math.round(a.reduce((i,l)=>i+l.progress*Number(l.weight||1),0)/r):0;return{tasks:a.length,progress:o,overdue:a.filter(Ae).length}}function bn(e,n){const a=$a(e.id,n);return`<div class="team-row"><div class="team-member">${U(e)}<div class="team-member-copy"><strong>${c(t(e.name,e.nameEn||e.name))}</strong><span>${c(t(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${a.tasks}</strong> ${f("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${f("progress")}</span><strong>${a.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${a.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${c(e.id)}">${h("more",15)}</button></div>`}function hn(){const e=[38,48,45,62,55,72,68],n=s.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${e.map((a,r)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,a-22)}%"></span><span class="pulse-bar ${r===e.length-1?"current":""}" style="height:${a}%"></span></div><span>${n[r]}</span></div>`).join("")}</div>`}function Fi(){const e=s.data?.stats||{},n=s.data?.projects||[],a=s.data?.tasks||[],r=s.data?.users||[],o=s.data?.user||{},i=o.name||o.email||t("مستخدم","User"),l=n.reduce((v,x)=>v+(Number(x.totalWeight)||0),0),d=l?Math.round(n.reduce((v,x)=>v+(Number(x.progress)||0)*(Number(x.totalWeight)||0),0)/l):0,p=[...a].filter(v=>Ae(v)||v.status==="blocked"||v.dueDate&&(new Date(`${v.dueDate}T23:59:59`)-new Date)/864e5<=7).sort((v,x)=>new Date(v.dueDate||"9999-12-31")-new Date(x.dueDate||"9999-12-31")).slice(0,5),m=r.filter(v=>v.status!=="inactive"),g=e.projectCount??n.length,y=e.myTasks??a.filter(v=>v.assigneeId===o.id).length,b=e.overdueTasks??a.filter(Ae).length,u=e.dueSoon??0,w=e.completedTasks??a.filter(v=>v.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${t("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${on()}، ${c(t(i.replace(/^م\.\s?/,""),o.nameEn||i))}</h1><p>${f("welcomeText")}</p></div><div class="welcome-status"><span>${f("portfolioHealth")}</span><strong>${d}%</strong><small>${t("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${Ze(f("activeProjects"),e.activeProjects||0,t(`${g} مشاريع إجمالًا`,`${g} projects total`),"teal","building","up")}${Ze(f("openTasks"),e.openTasks??a.length,t(`${y} مسندة لك`,`${y} assigned to you`),"blue","checklist")}${Ze(f("overdue"),b,t("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",b?"alert":"check",b?"alert":"")}${Ze(f("dueThisWeek"),u,t("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("projectProgress")}</h2><p class="panel-subtitle">${f("projectProgressSub")}</p></div>${S("view_projects")?`<button class="text-link" data-view="projects">${f("seeAll")} ${h(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${n.length?n.slice(0,5).map(projectRow).join(""):`<div class="empty">${h("building",18)}<span>${f("noProjects")}</span></div>`}</div></section>${D()||S("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("teamProgress")}</h2><p class="panel-subtitle">${f("teamProgressSub")}</p></div><button class="text-link" data-view="team">${f("seeAll")} ${h(s.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${m.slice(0,6).map(v=>bn(v,a)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("attention")}</h2><p class="panel-subtitle">${f("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${p.length}</span></div><div class="attention-list">${p.length?p.map(yn).join(""):`<div class="empty">${h("check",18)}<span>${f("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("recentPulse")}</h2><p class="panel-subtitle">${f("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${w} ${f("done")}</span></div>${hn()}</section></div></div>`}function Bi(){const{projects:e,tasks:n,users:a}=s.data,r=S("export_reports")||D(),o=n.reduce((p,m)=>p+Number(m.weight||1),0),i=o?Math.round(n.reduce((p,m)=>p+m.progress*Number(m.weight||1),0)/o):0,l=new Map;n.forEach(p=>{const m=(s.lang==="ar"?p.categoryAr:p.categoryEn)||t(p.typeAr||"عام",p.typeEn||"General"),g=l.get(m)||{weight:0,progress:0};g.weight+=Number(p.weight||1),g.progress+=p.progress*Number(p.weight||1),l.set(m,g)});const d=[...l.entries()].map(([p,m])=>({label:p,progress:m.weight?Math.round(m.progress/m.weight):0})).sort((p,m)=>m.progress-p.progress);return`<div class="page-head"><div><p class="eyebrow">${t("قراءة الأداء","PERFORMANCE READOUT")}</p><h1>${f("reports")}</h1><p>${t("مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.","Simple signals that help management see drift before it becomes delay.")}</p></div><div class="page-actions">${r?`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${h("printer",15)} ${t("طباعة تقرير المحفظة (PDF)","Print Portfolio (PDF)")}</button>
      <button class="btn btn-soft" data-action="export-csv">${h("document",15)} ${t("تصدير الإكسل (Excel)","Export Excel")}</button>
    </div>
  `:""}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("الإنجاز حسب التخصص","Progress by discipline")}</h2><p class="panel-subtitle">${f("weightedProgress")}</p></div><span class="status-badge on_track">${i}%</span></div><div class="report-bars">${d.length?d.map(p=>`<div class="report-bar-row"><span>${c(p.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${p.progress}%"></div></div><strong>${p.progress}%</strong></div>`).join(""):`<div class="empty">${f("noTasks")}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("صحة المحفظة","Portfolio health")}</h2><p class="panel-subtitle">${t("توزيع حالات المشاريع الحالية.","Current project status distribution.")}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${f("onTrack")}</span><strong style="color:var(--mint-strong)">${e.filter(p=>p.health==="on_track").length}</strong></div><div class="report-stat"><span>${f("atRisk")}</span><strong style="color:var(--amber)">${e.filter(p=>p.health==="at_risk").length}</strong></div><div class="report-stat"><span>${f("offTrack")}</span><strong style="color:var(--red)">${e.filter(p=>p.health==="off_track").length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("teamLoad")}</h2><p class="panel-subtitle">${t("المهام المفتوحة لكل عضو.","Open tasks per member.")}</p></div></div><div class="report-stat-list">${a.slice(0,5).map(p=>{const m=$a(p.id,n);return`<div class="report-stat"><span>${c(t(p.name,p.nameEn||p.name))}</span><strong>${m.tasks}</strong></div>`}).join("")}</div></section></div></div>`}var Ui=re({STATUS_OPTIONS:()=>Dn,buildAssigneeChipsHtml:()=>Aa,buildRemindersListHtml:()=>Ta,drawTimelineArrows:()=>Hi,filterTasks:()=>Tn,formatRemindAtDate:()=>jn,getSavedTaskSort:()=>Ge,getTaskSortOrder:()=>Pe,initTaskModalWidgets:()=>In,openDocumentPreviewModal:()=>Qt,openTaskModal:()=>_t,renderBoard:()=>En,renderCalendar:()=>Sa,renderTaskAssignees:()=>xn,renderTaskComments:()=>rt,renderTaskDocuments:()=>Ce,renderTaskSortSelect:()=>ka,renderTasks:()=>qi,renderTimeline:()=>Ea,renderTimelinePanel:()=>An,setSavedTaskSort:()=>kn,sortTasks:()=>Sn,sortTasksByImportance:()=>$n,taskCard:()=>wn});function xn(e){const n=s.data?.users||[],a=s._userMap||new Map(n.map(d=>[d.id,d])),r=e.assignee||a.get(e.assigneeId),o=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(d=>a.get(d)).filter(Boolean),i=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let l='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return r||o.length?(l+='<div class="avatar-stack" style="display:flex;align-items:center;">',r&&(l+=`<span title="${c(t(r.name,r.nameEn||r.name))}">${U(r,"mini-avatar")}</span>`),o.slice(0,2).forEach(d=>{l+=`<span title="${c(t(d.name,d.nameEn||d.name))}" style="margin-inline-start:-8px;">${U(d,"mini-avatar")}</span>`}),o.length>2&&(l+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${o.slice(2).map(d=>t(d.name,d.nameEn||d.name)).join("، ")}">+${o.length-2}</span>`),l+="</div>",r&&(l+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${c(t(r.name,r.nameEn||r.name))}</span>`)):i.length||(l+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),i.length&&(i.slice(0,2).forEach(d=>{l+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${c(d)}">🌐 ${c(d)} <small style="opacity:0.8">(${t("خارجي","Ext")})</small></span>`}),i.length>2&&(l+=`<span style="font-size:10px;color:var(--amber);" title="${i.slice(2).map(c).join("، ")}">+${i.length-2}</span>`)),l+="</div>",l}function wn(e){const n=isOverdue(e),a=n?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${h("alert",11)} ${f("overdue")}</span>`:"",r=s._commentCounts?s._commentCounts[e.id]||0:(s.data?.comments||[]).filter(d=>d.taskId===e.id).length,o=s._docCounts?s._docCounts[e.id]||0:(s.data?.documents||[]).filter(d=>d.taskId===e.id).length,i=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",l=D()||S("edit_tasks")||e.assigneeId===s.data?.user?.id;return`<article class="task-card ${n?"is-overdue":""} ${l?"":"not-draggable"}" draggable="${l?"true":"false"}" data-action="open-task" data-task-id="${c(e.id)}">
    <div class="task-card-top">
      <span class="task-code">${c(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${t("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${t("معلقة","Pending")}</span>`:""}
        ${r>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${r} ${t("تعليقات","comments")}">💬 ${r}</span>`:""}
        ${o>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${o} ${t("مرفقات","attachments")}">📎 ${o}</span>`:""}
        ${a}
        <span class="priority-badge ${c(e.priority)}">${c(priorityText(e.priority))}</span>
      </div>
    </div>
    <h4>${c(t(e.titleAr,e.titleEn))}</h4>
    ${(()=>{const d=String(t(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!d)return"";const p=d.length>50?d.substring(0,50).trim()+"...":d;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${c(d)}">${c(p)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${c(t(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${n?"var(--red)":"var(--muted)"};">${h("calendar",11)} ${dateLabel(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${xn(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${i};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function Pe(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function $n(e=[]){const n={urgent:4,high:3,medium:2,low:1},a=Date.now();return[...e].sort((r,o)=>{const i=r.status==="blocked"?1:0,l=o.status==="blocked"?1:0;if(i!==l)return l-i;const d=r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():null,m=d&&d<a&&r.status!=="done"?1:0,g=p&&p<a&&o.status!=="done"?1:0;if(m!==g)return g-m;const y=n[r.priority]||2,b=n[o.priority]||2;if(y!==b)return b-y;if(d&&p){if(d!==p)return d-p}else{if(d&&!p)return-1;if(!d&&p)return 1}const u=Pe(r),w=Pe(o);return u!==w?u-w:(r.titleAr||"").localeCompare(o.titleAr||"","ar")})}function Ge(){return localStorage.getItem("darc_task_sort_pref")||"importance"}function kn(e){localStorage.setItem("darc_task_sort_pref",e),s.taskSortPref=e,s.projectTaskSort=e,s.myTaskSort=e}function ka(e,n="sort-project-tasks"){const a=e||Ge();return`
    <div class="sort-box">
      <span>${t("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${n}">
        <option value="importance" ${a==="importance"?"selected":""}>${t("حسب الأهمية والأولوية (افتراضي)","By Importance & Priority (Default)")}</option>
        <option value="deadline" ${a==="deadline"?"selected":""}>${t("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="custom" ${a==="custom"?"selected":""}>${t("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="alpha" ${a==="alpha"?"selected":""}>${t("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function Sn(e=[],n=Ge()){return n==="deadline"?[...e].sort((a,r)=>(a.dueDate?new Date(`${a.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):n==="custom"?[...e].sort((a,r)=>Pe(a)-Pe(r)):n==="alpha"?[...e].sort((a,r)=>(a.titleAr||"").localeCompare(r.titleAr||"","ar")):$n(e)}function En(e,n=Ge()){const a=s.data?.users||[];s._userMap=new Map(a.map(i=>[i.id,i]));const r={};for(const i of s.data?.comments||[])i.taskId&&(r[i.taskId]=(r[i.taskId]||0)+1);const o={};for(const i of s.data?.documents||[])i.taskId&&(o[i.taskId]=(o[i.taskId]||0)+1);return s._commentCounts=r,s._docCounts=o,`<div class="board">${[{key:"not_started",dot:"",label:f("notStarted")},{key:"in_progress",dot:"blue",label:f("inProgress")},{key:"review",dot:"amber",label:t("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:f("done")}].map(i=>{const l=Sn(e.filter(d=>(i.statuses||[i.key]).includes(d.status)),n);return`<section class="board-column" data-status="${i.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${i.dot}"></span>${i.label}</div><span class="board-count">${l.length}</span></div><div class="board-cards">${l.length?l.map(wn).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${f("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function Sa(e,n){const a=s.calendarDate?new Date(s.calendarDate):new Date,r=a.getFullYear(),o=a.getMonth(),i=`${s.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][o]:["January","February","March","April","May","June","July","August","September","October","November","December"][o]} ${r}`,l=s.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],d=new Date(r,o,1).getDay(),p=new Date(r,o+1,0).getDate(),m=new Date,g=m.getFullYear()===r&&m.getMonth()===o;let y="";for(let b=0;b<d;b++)y+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let b=1;b<=p;b++){const u=g&&m.getDate()===b,w=`${r}-${String(o+1).padStart(2,"0")}-${String(b).padStart(2,"0")}`,v=e.filter(x=>{if(!x.dueDate&&!x.startDate)return!1;const j=x.dueDate?x.dueDate.split("T")[0]:null,E=x.startDate?x.startDate.split("T")[0]:null;return j===w||E===w});y+=`
      <div class="calendar-day ${u?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${u?"var(--mint)":"var(--surface)"};border:1px solid ${u?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${u?"bold":"600"};color:${u?"var(--teal)":"var(--ink)"};">
          <span>${b}</span>
          ${u?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${t("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${v.map(x=>{const j=fa(x);return`
              <div data-action="open-task" data-task-id="${c(x.id)}" style="background:${j.bgColor};border:1px solid ${j.borderColor};border-inline-start:3px solid ${j.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${j.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${c(t(x.titleAr,x.titleEn))} — ${j.label}">
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
        ${l.map(b=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${b}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${y}
      </div>
    </div>
  `}function Ea(e){const n=e.filter(p=>p.startDate&&p.dueDate).sort((p,m)=>new Date(p.startDate)-new Date(m.startDate));if(!n.length)return`<div class="empty" style="min-height:300px">${h("calendar",24)}<span>${t("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let a=Math.min(...n.map(p=>new Date(p.startDate).getTime())),r=Math.max(...n.map(p=>new Date(p.dueDate).getTime()));const o=2592e5;a-=o,r+=o;const i=Math.max(7,Math.ceil((r-a)/864e5));let l="";for(let p=0;p<i;p++){const m=new Date(a+p*864e5),g=m.getDay()===5||m.getDay()===6,y=je()==="hijri"?s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",b=new Intl.DateTimeFormat(y,{month:"short"}).format(m);l+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${g?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${m.getDate()}<br>${b}</div>`}const d=n.map((p,m)=>{const g=Math.floor((new Date(p.startDate).getTime()-a)/864e5)+1,y=g+Math.max(1,Math.ceil((new Date(p.dueDate).getTime()-new Date(p.startDate).getTime())/864e5)+1),b=fa(p);return`<div style="display:contents" class="timeline-row" data-task-id="${p.id}" data-row="${m}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${p.id}" style="grid-column: ${g} / ${y}; margin: 8px 4px; background: ${b.color}; border: 1px solid ${b.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${c(t(p.titleAr,p.titleEn))} — ${b.label}">
        <span style="font-weight:600;opacity:0.9">${c(p.templateId?p.templateId.replace("tpl-","#"):"#")}</span> ${c(t(p.titleAr,p.titleEn))}
        ${p.dependencies&&p.dependencies.length?`<span style="float:${s.lang==="ar"?"left":"right"};opacity:0.8">${h("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${i}, minmax(40px, 1fr)); min-width: ${i*40}px; position: relative;">
      ${l}
      ${d}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function An(e,n){const a=s.timelineView||"gantt";return`
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
      
      ${a==="calendar"?Sa(e,n):Ea(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:An,renderCalendar:Sa,renderTimeline:Ea});function Tn(e){const n=s.searches.tasks.trim().toLowerCase();return e.filter(a=>{const r=`${a.titleAr} ${a.titleEn} ${a.categoryAr} ${a.categoryEn}`.toLowerCase().includes(n),o=s.taskFilter==="all"||s.taskFilter==="mine"&&a.assigneeId===s.data.user.id||s.taskFilter==="overdue"&&isOverdue(a)||s.taskFilter==="blocked"&&a.status==="blocked",i=s.taskProjectFilter==="all"||a.projectId===s.taskProjectFilter,l=!s.taskPriorityFilter||s.taskPriorityFilter==="all"||a.priority===s.taskPriorityFilter;return r&&o&&i&&l})}function qi(){const e=Tn(s.data.tasks),n=[["all",f("all")],["mine",t("مسندة لي","Assigned to me")],["overdue",f("overdue")],["blocked",f("blocked")]],a=s.myTaskSort||Ge();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("حركة التنفيذ","EXECUTION")}</p>
        <h1>${f("myTasks")}</h1>
        <p>${t("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${S("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${h("plus",15)} ${f("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${n.map(([r,o])=>`
            <button class="segmented-tab ${s.taskFilter===r?"active":""}" data-action="task-filter" data-filter="${r}" role="tab">
              ${o}
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
            ${s.data.projects.map(r=>`<option value="${c(r.id)}" ${s.taskProjectFilter===r.id?"selected":""}>${c(t(r.nameAr,r.nameEn))}</option>`).join("")}
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
          ${ka(a,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?En(e,a):`<section class="panel"><div class="empty">${h("checklist",18)}<span>${f("noTasks")}</span></div></section>`}
  `}function jn(e){return va(e,{includeSeconds:!1}).full}function Aa(e=[],n=[]){const a=s.data?.users||[];let r="";return e.forEach(o=>{const i=a.find(l=>l.id===o)||{name:o,id:o};r+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${U(i,"mini-avatar")}
        <span style="font-weight:500;">${c(t(i.name,i.nameEn||i.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${c(o)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),n.forEach(o=>{r+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${c(o)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${t("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${c(o)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}),r}function Ta(e=[]){return e.length?e.map((n,a)=>`
    <div class="reminder-card-row" data-idx="${a}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${c(jn(n.remindAt))}</strong>
        ${n.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c(n.noteAr)}">(${c(n.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${a}" data-rem-id="${c(n.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${t("حذف التذكير","Delete reminder")}">
        ${h("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${t("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function _t(e=null,n=null,a=null){const r=s.data.templates.find(v=>v.id===(n||e?.templateId)),o=e?.projectId||a||s.activeProjectId||s.data.projects[0]?.id||"",i=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],l=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let d=[];Array.isArray(e?.customFields?.reminders)?d=e.customFields.reminders:e?.remindAt?d=[{id:"rem_"+Math.random().toString(36).substr(2,9),remindAt:e.remindAt,noteAr:""}]:Array.isArray(s.data?.reminders)&&e?.id&&(d=s.data.reminders.filter(v=>v.taskId===e.id));const p=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,m=i.length>0||l.length>0,g=m?Aa(i,l):"",y=Ta(d),b=`<form id="task-form" data-task-id="${c(e?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${c(e?.typeAr||r?.typeAr||(r?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${c(e?.typeEn||r?.typeEn||(r?"Drawing":""))}" />
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
          ${s.data.projects.map(v=>`<option value="${c(v.id)}" ${v.id===o?"selected":""}>${c(t(v.nameAr,v.nameEn))} (${c(v.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${f("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${c(e?.titleAr||r?.nameAr||"")}" placeholder="${t("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${f("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${c(e?.titleEn||r?.nameEn||"")}" placeholder="${t("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${f("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${t("مهمة مخصصة","Custom task")}</option>
          ${s.data.templates.map(v=>`<option value="${c(v.id)}" ${(e?.templateId||n)===v.id?"selected":""}>${c(v.code)} — ${c(t(v.nameAr,v.nameEn))}</option>`).join("")}
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
          ${s.data.users.map(v=>`<option value="${c(v.id)}" ${(e?e.assigneeId===v.id:s.data.user.id===v.id)?"selected":""}>${c(t(v.name,v.nameEn||v.name))}</option>`).join("")}
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
        <select name="status" id="task-status-select">${Dn().map(([v,x])=>`<option value="${v}" ${e?.status===v?"selected":""}>${x}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${f("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(v=>`<option value="${v}" ${(e?.priority||"medium")===v?"selected":""}>${priorityText(v)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${f("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${c((e?.startDate||"").split("T")[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${f("dueDate")}</label>
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
        <label>${f("description")}</label>
        <textarea name="descriptionAr" placeholder="${t("ما المطلوب؟ وما معيار الإغلاق؟","What is required and what defines completion?")}">${c(e?.descriptionAr||"")}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(S("delete_tasks")||D())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${h("trash",14)} ${t("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${h("check",14)} ${f(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let u=b,w="";e&&(w="modal-lg",u=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${t("تفاصيل المهمة","Task Details")}</h3>
          ${b}
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
            <div id="task-documents-list">${Ce(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${t("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${rt(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${t("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${t("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById("modal-root").innerHTML=ue(e?t("تعديل المهمة","Edit task"):f("addTask"),t("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),u,"task",w),In(e)}function In(e){const n=document.getElementById("modal-root");if(!n)return;const a=n.querySelector("#task-status-select"),r=n.querySelector("#task-auto-progress-badge");a&&r&&a.addEventListener("change",()=>{const T={not_started:0,in_progress:50,review:80,approval:80,done:100}[a.value]??0;r.textContent=`(${T}%)`});const o=n.querySelector("#task-template-select");o&&o.addEventListener("change",()=>{const T=o.value,C=(s.data?.templates||[]).find(L=>L.id===T);if(C){const L=n.querySelector("#task-title-ar"),z=n.querySelector("#task-title-en"),F=n.querySelector("#task-type-ar"),N=n.querySelector("#task-type-en");L&&!L.value&&(L.value=C.nameAr||""),z&&!z.value&&(z.value=C.nameEn||""),F&&(F.value=C.typeAr||"مخطط"),N&&(N.value=C.typeEn||"Drawing")}});const i=n.querySelector("#task-additional-assignees-input"),l=n.querySelector("#task-external-assignees-input"),d=n.querySelector("#assignees-chips-container"),p=n.querySelector("#assignee-combobox-search"),m=n.querySelector("#assignee-combobox-dropdown"),g=n.querySelector("#btn-add-external-quick");let y=[];try{y=JSON.parse(i?.value||"[]")}catch{y=[]}let b=[];try{b=JSON.parse(l?.value||"[]")}catch{b=[]}function u(){i&&(i.value=JSON.stringify(y)),l&&(l.value=JSON.stringify(b))}function w(){if(d){if(y.length===0&&b.length===0){d.style.display="none",d.innerHTML="",u();return}d.style.display="flex",d.innerHTML=Aa(y,b),u()}}function v(T=""){if(!m)return;const C=T.trim().toLowerCase(),L=s.data?.users||[],z=n.querySelector("#task-primary-assignee")?.value,F=L.filter(R=>{if(R.id===z)return!1;if(!C)return!0;const J=(R.name||"").toLowerCase(),X=(R.nameEn||"").toLowerCase(),V=(R.email||"").toLowerCase();return J.includes(C)||X.includes(C)||V.includes(C)});let N="";C&&(N+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${t("إضافة مسؤول خارجي:","Add external assignee:")} "${c(T.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${t("إضافة سريعة","Quick Add")}</span>
        </div>
      `),F.length===0&&!C?N+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${t("لا يوجد مستخدمين آخرين","No other users")}</div>`:F.forEach(R=>{const J=y.includes(R.id);N+=`
          <div class="combobox-user-row" data-uid="${c(R.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${c(R.id)}" ${J?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${U(R,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${c(t(R.name,R.nameEn||R.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${c(t(R.jobTitleAr,R.jobTitleEn)||R.email||"")}</span>
              </div>
            </div>
            ${J?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),m.innerHTML=N,m.style.display="block"}u(),p&&(p.addEventListener("focus",()=>{v(p.value)}),p.addEventListener("input",()=>{const T=p.value.trim();v(T),g&&(g.style.display=T.length>1?"inline-flex":"none")}),p.addEventListener("keydown",T=>{if(T.key==="Enter"){T.preventDefault();const C=p.value.trim();C&&(b.includes(C)||(b.push(C),w()),p.value="",g&&(g.style.display="none"),m&&(m.style.display="none"))}})),g&&g.addEventListener("click",()=>{const T=p?.value.trim();T&&(b.includes(T)||(b.push(T),w()),p.value="",g.style.display="none",m&&(m.style.display="none"))}),m&&m.addEventListener("click",T=>{if(T.target.closest(".dropdown-ext-action")){const L=p?.value.trim();L&&!b.includes(L)&&(b.push(L),w()),p&&(p.value=""),g&&(g.style.display="none"),m.style.display="none";return}const C=T.target.closest(".combobox-user-row");if(C){const L=C.dataset.uid;y.includes(L)?y=y.filter(z=>z!==L):y.push(L),w(),v(p?.value||"")}}),d&&d.addEventListener("click",T=>{const C=T.target.closest(".btn-remove-chip-user");if(C){const z=C.dataset.uid;y=y.filter(F=>F!==z),w(),m&&m.style.display==="block"&&v(p?.value||"");return}const L=T.target.closest(".btn-remove-chip-ext");if(L){const z=L.dataset.ext;b=b.filter(F=>F!==z),w()}});const x=n.querySelector("#task-reminders-input"),j=n.querySelector("#task-reminders-list"),E=n.querySelector("#new-reminder-datetime"),I=n.querySelector("#new-reminder-note"),M=n.querySelector("#btn-add-reminder");let A=[];try{A=JSON.parse(x?.value||"[]")}catch{A=[]}Array.isArray(A)||(A=[]);function k(){j&&(x&&(x.value=JSON.stringify(A)),j.innerHTML=Ta(A))}M&&M.addEventListener("click",()=>{const T=E?.value;if(!T){$(t("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const C=I?.value.trim()||"",L={id:"rem_temp_"+Math.random().toString(36).substr(2,9),remindAt:new Date(T).toISOString(),noteAr:C};A.push(L),E&&(E.value=""),I&&(I.value=""),k(),$(t("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),j&&j.addEventListener("click",async T=>{const C=T.target.closest(".btn-delete-reminder");if(C){const L=Number(C.dataset.idx),z=C.dataset.remId;!isNaN(L)&&L>=0&&L<A.length&&(A.splice(L,1),k(),z&&!z.startsWith("rem_temp_")&&_(`/api/reminders/${z}`,{method:"DELETE"}).catch(()=>{}),$(t("تم حذف موعد التذكير.","Reminder deleted.")))}}),n.addEventListener("mousedown",T=>{m?.contains(T.target)||p?.contains(T.target)||g?.contains(T.target)||(m&&(m.style.display="none"),g&&(g.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&_(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(T=>{if(T&&Array.isArray(T.comments)){s.data.comments||(s.data.comments=[]);const C=new Map(s.data.comments.map(z=>[z.id,z]));for(const z of T.comments)C.set(z.id,z);s.data.comments=Array.from(C.values());const L=document.getElementById("task-comments-list");L&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(L.innerHTML=rt(e))}}).catch(()=>{})}function rt(e){const n=(s.data.comments||[]).filter(a=>a.taskId===e.id).sort((a,r)=>new Date(a.createdAt)-new Date(r.createdAt));return n.length?`<div style="display:flex;flex-direction:column;gap:12px;">${n.map(a=>{const r=a.user||(s.data?.users||[]).find(d=>d.id===a.userId)||s.data?.user||{name:"DARC Member",id:""},o=!!(r.id&&s.data?.user?.id&&r.id===s.data.user.id),i=o||typeof D=="function"&&D(),l=c(a.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${c(a.id)}" style="display:flex;gap:10px;flex-direction:${o?"row-reverse":"row"};">
        ${U(r)}
        <div style="display:flex;flex-direction:column;align-items:${o?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${c(t(r.name,r.nameEn||r.name))}</strong>
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
          <div id="comment-bubble-${c(a.id)}" style="background:${o?"var(--blue)":"var(--surface)"};color:${o?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${o?"none":"1px solid var(--border)"};border-top-${o?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${l}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${h("message",18)}<span style="font-size:12px;">${t("لا توجد تعليقات","No comments yet")}</span></div>`}function Ce(e){const n=s.data.documents.filter(a=>a.taskId===e.id).sort((a,r)=>new Date(r.createdAt)-new Date(a.createdAt));return n.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${n.map(a=>`
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
        ${S("review_tasks")||S("approve_tasks")||S("upload_documents")||D()?`
          <select class="doc-status-select" data-doc-id="${a.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${a.status==="draft"?"selected":""}>${t("مسودة","Draft")}</option>
            ${S("review_tasks")||D()?`<option value="review" ${a.status==="review"?"selected":""}>${t("مراجعة","Review")}</option>`:""}
            ${S("approve_tasks")||D()?`<option value="approved" ${a.status==="approved"?"selected":""}>${t("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${a.status==="superseded"?"selected":""}>${t("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${S("upload_documents")||D()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${a.id}" style="padding:4px;min-width:0;height:auto;" title="${t("إعادة تسمية","Rename")}">${h("edit",14)}</button>`:""}
        ${S("delete_documents")||D()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${a.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${t("حذف","Delete")}">${h("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${h("document",18)}<span style="font-size:12px;">${t("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}async function Qt(e){if(!e)return;let n=(s.data?.documents||[]).find(u=>u.id===e);if(!n)try{const u=await _(`/api/documents/${e}`);u&&u.id&&(n=u,s.data.documents||(s.data.documents=[]),s.data.documents.push(n))}catch(u){console.warn("[Documents] Failed to fetch doc preview on demand:",u)}if(!n){$(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found or moved to trash."),!0);return}let a=n.diskFilename||`/api/documents/${n.id}`;(a.startsWith("file://")||a.startsWith("/")||!a.startsWith("http"))&&(a=`/api/documents/${n.id}`);let r="";if(a.includes("drive.google.com")){const u=a.match(/\/d\/([a-zA-Z0-9_-]+)/);u&&u[1]&&(r=u[1])}const o=r?`https://drive.google.com/file/d/${encodeURIComponent(r)}/preview`:a,i=/^(https?:\/\/|\/)/i.test(o)?o:"about:blank",l=r?`https://drive.google.com/file/d/${encodeURIComponent(r)}/view?usp=drivesdk`:a.startsWith("http")?a:`${window.location.origin}${a}`,d=/^(https?:\/\/|\/)/i.test(l)?l:"#",p=`/api/documents/${encodeURIComponent(n.id)}`,m=/\.(jpe?g|png|gif|webp|svg|heic)$/i.test(n.originalName)||n.mimeType&&n.mimeType.startsWith("image/"),g=n.size>1048576?(n.size/1048576).toFixed(1)+" MB":Math.round((n.size||0)/1024)+" KB",y=n.id&&String(n.id).includes("demo")||r&&r.startsWith("demo_sample_")||!!s.data?.isDemo;let b=document.getElementById("preview-modal-overlay");b||(b=document.createElement("div"),b.id="preview-modal-overlay",b.style.position="fixed",b.style.inset="0",b.style.zIndex="1300",b.style.background="rgba(0, 0, 0, 0.75)",b.style.backdropFilter="blur(4px)",b.style.display="flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.padding="20px",document.body.appendChild(b)),b.innerHTML=`
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
          ${y?"":`
          <a href="${c(d)}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${t("فتح في Google Drive","Open in Google Drive")}">
            ${h("globe",13)} <span class="hide-mobile">${t("فتح في Drive","Open in Drive")}</span>
          </a>
          <a href="${c(p)}" target="_blank" rel="noopener noreferrer" download class="btn btn-primary btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${t("تحميل المخطط","Download")}">
            ${h("download",13)} <span class="hide-mobile">${t("تحميل","Download")}</span>
          </a>
          `}
          <button type="button" class="btn btn-ghost btn-sm" id="close-preview-modal-btn" data-action="close-modal" style="padding:6px;min-width:0;margin-inline-start:4px;" title="${t("إغلاق","Close")}">${h("close",18)}</button>
        </div>
      </div>
      <div style="flex:1;position:relative;background:#1a1a1a;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        ${y?`
          <div style="width:100%;height:100%;background:#0f172a;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#e2e8f0;padding:24px;text-align:center;">
            <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(20,184,166,0.15) 1px, transparent 1px);background-size:24px 24px;opacity:0.6;pointer-events:none;"></div>
            <div style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(20,184,166,0.3);border-radius:12px;padding:32px 40px;max-width:540px;box-shadow:0 20px 40px rgba(0,0,0,0.5);z-index:2;">
              <div style="font-size:48px;margin-bottom:16px;">📐</div>
              <h3 style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px 0;">${c(n.originalName)}</h3>
              <p style="font-size:13px;color:#94a3b8;margin:0 0 20px 0;line-height:1.6;">
                ${t("مخطط معماري هندسي تفصيلي (بيئة عرض تجريبية). عند العمل على مشروع حقيقي يمكنك رفع ملفات PDF ومخططات DWG بدقة كاملة.","Detailed architectural CAD drawing (Demo showcase). In production projects, uploaded PDF and DWG drawings render directly here.")}
              </p>
              <div style="display:flex;justify-content:center;gap:12px;font-size:12px;color:#38bdf8;">
                <span style="background:rgba(56,189,248,0.1);padding:4px 10px;border-radius:6px;border:1px solid rgba(56,189,248,0.2);">${t("الحجم المقدر","Size")}: ${g}</span>
                <span style="background:rgba(20,184,166,0.1);padding:4px 10px;border-radius:6px;border:1px solid rgba(20,184,166,0.2);color:#2dd4bf;">${t("مخطط معتمد","Approved Drawing")}</span>
              </div>
            </div>
          </div>
        `:!r&&m?`
          <div style="width:100%;height:100%;overflow:auto;display:flex;align-items:center;justify-content:center;padding:15px;">
            <img src="${c(i)}" alt="${c(n.originalName)}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='${c(p)}';" />
          </div>
        `:`
          <iframe src="${c(i)}" sandbox="allow-scripts allow-same-origin allow-popups" style="width:100%;height:100%;border:none;background:#fff;" allow="autoplay" loading="lazy"></iframe>
        `}
      </div>
    </div>
  `,b.style.display="flex",document.getElementById("close-preview-modal-btn")?.addEventListener("click",()=>{b.style.display="none",b.innerHTML=""}),b.onclick=u=>{u.target===b&&(b.style.display="none",b.innerHTML="")}}function Dn(){return[["not_started",f("notStarted")],["in_progress",f("inProgress")],["review",f("review")],["approval",f("approval")],["done",f("done")],["blocked",f("blocked")],["canceled",f("canceled")]]}function Hi(){const e=document.querySelector(".timeline-container > div"),n=document.querySelector(".timeline-svg");if(!e||!n)return;n.innerHTML="";const a=Array.from(document.querySelectorAll(".timeline-bar")),r={},o=e.getBoundingClientRect();a.forEach(d=>{const p=d.getBoundingClientRect();r[d.dataset.taskId]={left:p.left-o.left,right:p.right-o.left,top:p.top-o.top,bottom:p.bottom-o.top,width:p.width,height:p.height,center:p.top-o.top+p.height/2}});let i="";const l=s.lang==="ar";a.forEach(d=>{const p=d.dataset.taskId,m=(s.data?.tasks||[]).find(b=>b.id===p),g=m?.dependencies||m?.customFields?.dependencies||[];if(!m||!g.length)return;const y=r[p];y&&g.forEach(b=>{const u=r[b];if(!u)return;const w=l?u.left:u.right,v=u.center,x=l?y.right:y.left,j=y.center,E=w+(l?-20:20);i+=`<path d="M ${w} ${v} C ${E} ${v}, ${E} ${j}, ${x} ${j}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),n.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${i}
  `}var Wi=re({buildProjectMemberChipsHtml:()=>ea,exportPortfolioPDF:()=>Nn,exportPortfolioXLS:()=>Rn,exportProjectPDF:()=>ta,exportProjectXLS:()=>On,exportXLS:()=>Da,getCompanyBranding:()=>vt,getDaysLeftBadge:()=>ja,getProjectTeam:()=>Vi,getProjectTeamData:()=>gt,openCloneModal:()=>Yi,openProjectModal:()=>Ia,projectCard:()=>Ln,projectRow:()=>Ji,renderInPagePrintModal:()=>_a,renderProjectCardTeamAvatars:()=>Cn,renderProjectDetail:()=>Gi,renderProjectOverviewTab:()=>zn,renderProjectTeamAvatars:()=>_n,renderProjectTimelineBar:()=>Pn,renderProjects:()=>Mn});function Ji(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${h("building",17)}</span><div class="project-name"><strong>${c(t(e.nameAr,e.nameEn))}</strong><span>${c(e.code)} · ${c(t(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${U(e.manager)}<span>${c(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${c(e.id)}" aria-label="${f("viewDetails")}">${h(s.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function ja(e){if(!e)return"";const n=new Date(`${e}T23:59:59`),a=Math.ceil((n-new Date)/864e5);let r="var(--mint-strong)",o="var(--mint)",i="";return a<0?(r="var(--red)",o="var(--red-soft)",i=t(`متأخر ${Math.abs(a)} يوم`,`${Math.abs(a)}d overdue`)):a===0?(r="var(--red)",o="var(--red-soft)",i=t("يستحق اليوم","Due today")):a<=2?(r="var(--red)",o="var(--red-soft)",i=t(`باقي ${a} يوم`,`${a}d left`)):a<=7?(r="var(--amber)",o="var(--amber-soft)",i=t(`باقي ${a} أيام`,`${a}d left`)):(r="var(--mint-strong)",o="var(--mint)",i=t(`باقي ${a} يوم`,`${a}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${r};background:${o};border:1px solid currentColor;">${h("clock",11)} ${i}</span>`}function gt(e){const n=s.data?.users||[],a=(s.data?.tasks||[]).filter(i=>i.projectId===e.id),r=new Set,o=new Set;return e.managerId&&r.add(e.managerId),a.forEach(i=>{i.assigneeId&&r.add(i.assigneeId),(i.customFields?.additionalAssignees||i.customFields?.additional_assignees||[]).forEach(l=>r.add(l)),(i.customFields?.externalAssignees||i.customFields?.external_assignees||[]).forEach(l=>{l&&typeof l=="string"&&l.trim()&&o.add(l.trim())})}),{internalMembers:Array.from(r).map(i=>n.find(l=>l.id===i)).filter(Boolean),externalMembers:Array.from(o)}}function Vi(e){return gt(e).internalMembers}function _n(e,n=4,a=!0,r=[]){if((!e||!e.length)&&(!r||!r.length))return`<span style="font-size:11px;color:var(--muted);">${t("لا يوجد فريق محدد","No team assigned")}</span>`;const o=(e||[]).slice(0,n),i=(e||[]).length-n,l=(e||[]).map(p=>t(p.name,p.nameEn||p.name)).join("، ");let d='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return o.forEach(p=>{const m=t(p.name,p.nameEn||p.name),g=a?`data-action="filter-by-member" data-member-id="${c(p.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';d+=`
      <span class="team-member-chip" ${g} title="${c(m)} (${c(ee(p))})">
        ${U(p,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${c(m)}</span>
      </span>
    `}),i>0&&(d+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${c(l)}">+${i} ${t("آخرين","more")}</span>`),r&&r.length>0&&(d+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${c(r.join("، "))}">🌐 +${r.length} ${t("خارجي","ext")}</span>`),d+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${t("فريق العمل الداخلي","Internal Team")} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(p=>`
        <div ${a?`data-action="filter-by-member" data-member-id="${c(p.id)}" title="${c(t("فلترة مهام "+(p.name||""),"Filter tasks of "+(p.nameEn||p.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${a?"cursor:pointer;transition:all 0.15s;":""}" ${a?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${U(p,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${c(t(p.name,p.nameEn||p.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${c(ee(p))}</span>
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

    ${a?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${t("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,d+="</div>",d}function Pn(e){if(!e.dueDate)return"";const n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),a=new Date(`${e.dueDate}T23:59:59`),r=new Date,o=a.getTime()-n.getTime();let i=0;o>0&&(i=Math.min(100,Math.max(0,Math.round((r.getTime()-n.getTime())/o*100))));const l=r>a,d=l?"var(--red)":i>=80&&!l?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${h("clock",12)}
          <strong>${t("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${d};font-weight:bold;">${l?t("انتهى موعد التسليم!","Deadline passed!"):t(`مضى ${i}% من الوقت`,`${i}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${dateLabel(e.startDate)} ➔ ${dateLabel(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${i}%;background:${d};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function Cn(e=[],n=[],a=3){const r=e.length+n.length;if(r===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const o=e.slice(0,a),i=r-o.length;[...e.map(d=>t(d.name,d.nameEn||d.name)),...n].join("، ");let l=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${t("عرض فريق العمل","View Team")}">`;return l+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',o.forEach((d,p)=>{l+=`
      <div style="margin-inline-start:${p===0?"0":"-8px"};position:relative;z-index:${10-p};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${U(d,"mini-avatar")}
      </div>
    `}),i>0&&(l+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${i}
      </div>
    `),n&&n.length>0&&i<=0&&(l+='<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>'),l+="</div>",l+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${t("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${r}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(d=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${U(d,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(t(d.name,d.nameEn||d.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${c(ee(d))}</span>
            </div>
          </div>
        `).join("")}
      </div>
      ${n&&n.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${t("الشركاء الخارجيون","External Partners")} (${n.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${n.map(d=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${c(d)}
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  `,l+="</div>",l}function Ln(e){const{internalMembers:n,externalMembers:a}=gt(e),r=e.manager||(s.data?.users||[]).find(l=>l.id===e.managerId),o=ja(e.dueDate),i=t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
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
        <span class="status-badge ${c(e.health)}">${c(B(e.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${c(i||"")}">
      ${i?c(i):`<span style="color:var(--muted);font-style:italic;">${t("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${U(r,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${f("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c(r?t(r.name,r.nameEn||r.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${f("team")} (${n.length+a.length})</span>
        ${Cn(n,a,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${f("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${e.dueDate?dateLabel(e.dueDate,!0):"—"}</strong>
          ${o}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health==="off_track"?"red":e.health==="at_risk"?"amber":""}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${c(e.id)}">
      ${f("viewDetails")} ${h(s.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function zn(e,n,a,r=[]){const o=e.manager||(s.data?.users||[]).find(p=>p.id===e.managerId),i=n.filter(p=>p.status==="done").length,l=n.filter(p=>p.status==="in_progress").length,d=n.filter(isOverdue).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${t("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${n.length}</div>
          <span class="metric-note up">${i} ${f("done")}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${t("قيد التنفيذ","In Progress")}</span>
          <div class="metric-value">${l}</div>
          <span class="metric-note">${t("عمل جارٍ","Active work")}</span>
        </div>
        <div class="metric-card ${d?"red":"teal"}" style="padding:14px 18px;">
          <span class="metric-label">${f("overdue")}</span>
          <div class="metric-value">${d}</div>
          <span class="metric-note ${d?"alert":"up"}">${d?t("تحتاج تدخلاً عاجلاً","Needs urgent action"):t("لا يوجد تأخير","On track")}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${t("فريق العمل","Team Size")}</span>
          <div class="metric-value">${a.length+(r?.length||0)}</div>
          <span class="metric-note">${t("أعضاء مساهمون","Active contributors")}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${Pn(e)}

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
              <span style="font-size:10px;color:var(--muted);display:block;">${f("client")}</span>
              <strong style="font-size:13px;color:var(--ink);">${c(t(e.clientAr,e.clientEn)||"—")}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${f("lifecycle")}</span>
              <strong style="font-size:13px;color:var(--ink);">${c(B(e.lifecycle))}</strong>
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
            ${h("users",16)}
            ${t("القيادة وفريق العمل","Leadership & Team")}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${U(o)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${f("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${c(o?t(o.name,o.nameEn||o.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${c(o?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${t("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${a.map(p=>{const m=n.filter(g=>g.assigneeId===p.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${U(p,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${c(t(p.name,p.nameEn||p.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${c(ee(p))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${m} ${f("tasks")}</span>
                </div>
              `}).join("")}
          </div>

          ${r&&r.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${t("الشركاء والمتعاونون الخارجيون:","External Partners & Collaborators:")}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${r.map(p=>{const m=n.filter(g=>(g.customFields?.externalAssignees||g.customFields?.external_assignees||[]).includes(p)).length;return`
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
  `}function Mn(){const e=s.searches.projects.trim().toLowerCase();let n=s.data.projects.filter(r=>`${r.nameAr} ${r.nameEn} ${r.code} ${r.clientAr}`.toLowerCase().includes(e));const a=s.projectSort||"default";return a==="alpha-asc"?n.sort((r,o)=>(t(r.nameAr,r.nameEn)||"").localeCompare(t(o.nameAr,o.nameEn)||"",s.lang==="ar"?"ar":"en")):a==="alpha-desc"?n.sort((r,o)=>(t(o.nameAr,o.nameEn)||"").localeCompare(t(r.nameAr,r.nameEn)||"",s.lang==="ar"?"ar":"en")):a==="progress-asc"?n.sort((r,o)=>(Number(r.progress)||0)-(Number(o.progress)||0)):a==="progress-desc"&&n.sort((r,o)=>(Number(o.progress)||0)-(Number(r.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${t("المحفظة","PORTFOLIO")}</p><h1>${f("projects")}</h1><p>${t("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${S("create_projects")?`<button class="btn btn-primary" data-action="new-project">${h("plus",15)} ${f("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${h("search",15)}<input data-search="projects" value="${c(s.searches.projects)}" placeholder="${f("search")}" /></div><div class="sort-box"><span>${t("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${a==="default"?"selected":""}>${t("الافتراضي","Default")}</option><option value="alpha-asc" ${a==="alpha-asc"?"selected":""}>${t("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${a==="alpha-desc"?"selected":""}>${t("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${a==="progress-asc"?"selected":""}>${t("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${a==="progress-desc"?"selected":""}>${t("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${n.length} ${t("مشاريع","projects")}</span></div></div>${n.length?`<div class="project-cards">${n.map(Ln).join("")}</div>`:`<section class="panel"><div class="empty">${h("building",18)}<span>${f("noProjects")}</span></div></section>`}`}function Gi(){const e=s.data.projects.find(y=>y.id===s.activeProjectId);if(!e)return s.view="projects",Mn();const n=s.data.tasks.filter(y=>y.projectId===e.id),{internalMembers:a,externalMembers:r}=gt(e),o=s.projectTab||"tasks",i=s.projectMemberFilter||null,l=i?n.filter(y=>y.assigneeId===i||(y.customFields?.additionalAssignees||y.customFields?.additional_assignees||[]).includes(i)):n,d=i?s.data.users.find(y=>y.id===i):null;let p="";if(o==="overview")p=zn(e,n,a,r);else if(o==="tasks"){const y=s.projectTaskSort||Ge();p=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${f("projectTasks")} ${i?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${t("مهام","Tasks of")}: ${c(t(d?.name,d?.nameEn||d?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${t("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${ka(y,"sort-project-tasks")}
            ${i?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${h("close",12)} ${t("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${S("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}" title="${t("اضغط N للإضافة السريعة","Press N to add quickly")}">${h("plus",14)} ${f("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${renderBoard(l,y)}
      </div>
    `}else if(o==="timeline"){const{renderTimelinePanel:y}=window.__timelineExports||{};p=y?y(l,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${renderTimeline(l)}</div>`}else if(o==="drawings"){const y=(s.data.documents||[]).filter(v=>v.projectId===e.id&&!v.deletedAt),b=n.filter(v=>v.typeAr==="مخطط"||v.typeEn==="Drawing"||v.templateId),u=s.docTaskFilter||"all",w=u==="all"?y:y.filter(v=>v.taskId===u);p=`
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
                <option value="all" ${u==="all"?"selected":""}>${t("— جميع المهام —","— All Tasks —")}</option>
                ${n.map(v=>`<option value="${c(v.id)}" ${u===v.id?"selected":""}>${c(t(v.titleAr,v.titleEn))}</option>`).join("")}
              </select>
            </div>
            ${S("create_tasks")?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${c(e.id)}">
                ${h("plus",12)} ${t("إضافة مخرج / مخطط","Add Deliverable / Drawing")}
              </button>
            `:""}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${h("document",14)} ${t("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${w.length})
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
                ${w.length>0?w.map(v=>{const x=n.find(E=>E.id===v.taskId),j=v.size>1048576?(v.size/1048576).toFixed(1)+" MB":Math.round((v.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${c(v.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(v.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${h("document",15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(v.originalName)}">
                              ${c(v.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${c(v.mimeType||"application/octet-stream")}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${x?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(x.id)}">${c(t(x.titleAr,x.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${c(v.status||"draft")}" style="font-size:11px;">
                          ${c(B(v.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${j}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(v.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(v.id)}" style="padding:5px;" title="${t("معاينة المخطط","Preview")}">
                            ${h("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(v.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ الرابط","Copy Link")}">
                            ${h("link",14)}
                          </button>
                          <a href="/api/documents/${c(v.id)}" target="_blank" rel="noopener noreferrer" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${t("تحميل","Download")}">
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
            ${h("checklist",14)} ${t("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${b.length})
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
                ${b.map(v=>`
                  <tr data-action="open-task" data-task-id="${c(v.id)}" style="cursor:pointer;" title="${t("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${c(t(v.titleAr,v.titleEn))}</span><span class="table-sub">${c(v.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${c(t(v.typeAr,v.typeEn)||t("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${c(v.status)}">${c(B(v.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${v.status==="done"?"var(--green)":"var(--blue)"};width:${v.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${v.progress||0}%</span>
                      </div>
                    </td>
                    <td>${v.assignee?c(t(v.assignee.name,v.assignee.nameEn||v.assignee.name)):"—"}</td>
                  </tr>
                `).join("")||`<tr><td colspan="5"><div class="empty">${f("noTasks")}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else o==="activity"&&(p=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${f("activity")}</h2><p class="panel-subtitle">${t("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${renderAuditForProject(e.id)}</div>`);const m=e.manager||(s.data.users||[]).find(y=>y.id===e.managerId),g=ja(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${h(s.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${c(e.code)} · ${e.demo?f("sampleData"):f("active")}</p>
          <h1>${c(t(e.nameAr,e.nameEn))}</h1>
          <p>${c(t(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${h("user",12)} 
              <strong>${f("manager")}:</strong> ${c(m?t(m.name,m.nameEn||m.name):"—")}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${h("calendar",12)} ${dateLabel(e.dueDate,!0)}
                ${g}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${h("users",12)}
              <span style="font-size:11px;">${f("team")}:</span>
              ${_n(a,4,!0,r)}
            </span>
            <span class="status-badge ${c(e.health)}">${c(B(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${f("weightedProgress")}</span>
        ${S("edit_projects")||S("create_projects")||S("delete_projects")||S("view_reports")||D()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${h("more",15)} ${t("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${s.lang==="ar"?"left:0":"right:0"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;padding:5px;margin-top:5px;text-align:start">
              ${S("edit_projects")||D()?`<button class="menu-item" data-action="edit-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${h("edit",14)} ${f("edit")}</button>`:""}
              ${S("create_projects")||D()?`<button class="menu-item" data-action="clone-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${h("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>`:""}
              ${S("export_reports")||D()?`
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
              ${S("delete_projects")||D()?`<button class="menu-item" data-action="delete-project" data-project-id="${c(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${h("trash",14)} ${t("حذف المشروع","Delete Project")}</button>`:""}
            </div>
          </div>
        `:""}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${o==="tasks"?"active":""}" data-action="project-tab" data-tab="tasks">${f("tasks")}</button>
      <button class="detail-tab ${o==="overview"?"active":""}" data-action="project-tab" data-tab="overview">${t("تفاصيل","Details")}</button>
      <button class="detail-tab ${o==="timeline"?"active":""}" data-action="project-tab" data-tab="timeline">${t("المخطط الزمني والتقويم","Timeline & Calendar")}</button>
      <button class="detail-tab ${o==="drawings"?"active":""}" data-action="project-tab" data-tab="drawings">${f("drawings")}</button>
      <button class="detail-tab ${o==="activity"?"active":""}" data-action="project-tab" data-tab="activity">${f("activity")}</button>
    </div>
    
    ${p}
  `}function ea(e=[]){const n=s.data?.users||[];return e.map(a=>{const r=n.find(o=>o.id===a)||{name:a,id:a};return`
      <span class="chip-item" data-uid="${c(a)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${U(r,"mini-avatar")}
        <span style="font-weight:500;">${c(t(r.name,r.nameEn||r.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${c(a)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${t("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function Ia(e=null){const n=e?.code||`DARC-${String((s.data?.projects?.length||0)+1).padStart(3,"0")}`,a=e?gt(e).internalMembers.map(i=>i.id):[],r=a.length>0?a:[s.data?.user?.id].filter(Boolean),o=`
    <form id="project-form" data-project-id="${c(e?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${c(JSON.stringify(r))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${h("building",14)} <span>${t("البيانات الأساسية للمشروع","Core Project Information")}</span>
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
          <input name="code" value="${c(n)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${f("client")}</label>
          <input name="clientAr" value="${c(e?.clientAr||"")}" placeholder="${t("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${h("calendar",14)} <span>${t("الجدولة والإدارة","Management & Schedule")}</span>
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
          <input type="date" name="startDate" value="${c((e?.startDate||"").split("T")[0])}" />
        </div>
        <div class="field">
          <label>${f("dueDate")}</label>
          <input type="date" name="dueDate" value="${c((e?.dueDate||"").split("T")[0])}" />
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
          <div id="project-members-chips-container" style="display:${r.length?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${ea(r)}
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
          ${e&&(S("delete_projects")||D())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${c(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${t("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
              ${h("trash",14)} ${t("حذف المشروع","Delete Project")}
            </button>
          `:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
          <button type="submit" class="btn btn-primary">${h("check",14)} ${f(e?"save":"create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ue(e?t("تعديل بيانات المشروع","Edit Project"):f("addProject"),t("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),o,"project"),setTimeout(()=>{const i=document.getElementById("project-member-search"),l=document.getElementById("project-member-dropdown"),d=document.getElementById("project-members-chips-container"),p=document.getElementById("project-members-input"),m=document.getElementById("project-manager-select");if(!i||!l||!d||!p)return;let g=[...r];function y(){d.innerHTML=ea(g),d.style.display=g.length?"flex":"none",p.value=JSON.stringify(g),d.querySelectorAll(".btn-remove-project-member").forEach(u=>{u.addEventListener("click",w=>{w.stopPropagation();const v=u.dataset.uid;g=g.filter(x=>x!==v),y()})})}m&&m.addEventListener("change",()=>{const u=m.value;u&&!g.includes(u)&&(g.push(u),y())});function b(u=""){const w=u.toLowerCase().trim(),v=(s.data?.users||[]).filter(x=>!g.includes(x.id)&&(!w||x.name&&x.name.toLowerCase().includes(w)||x.nameEn&&x.nameEn.toLowerCase().includes(w)||x.email&&x.email.toLowerCase().includes(w)));v.length?(l.innerHTML=v.map(x=>`
          <div class="project-member-opt" data-uid="${c(x.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${U(x,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${c(t(x.name,x.nameEn||x.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${c(x.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${t("إضافة","Add")}</span>
          </div>
        `).join(""),l.querySelectorAll(".project-member-opt").forEach(x=>{x.addEventListener("mouseenter",()=>x.style.background="var(--surface-soft)"),x.addEventListener("mouseleave",()=>x.style.background="transparent"),x.addEventListener("click",()=>{const j=x.dataset.uid;j&&!g.includes(j)&&(g.push(j),y(),i.value="",l.style.display="none")})})):l.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${t("لا يوجد أعضاء مطابقون","No matching members")}</div>`,l.style.display="block"}i.addEventListener("focus",()=>b(i.value)),i.addEventListener("input",()=>b(i.value)),document.addEventListener("click",u=>{!i.contains(u.target)&&!l.contains(u.target)&&(l.style.display="none")}),y()},50)}function Yi(e){const n=`
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
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${h("document",14)} ${t("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ue(t("استنساخ المشروع","Clone Project"),t("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),n,"clone");const a=document.getElementById("clone-form"),r=a.querySelector('input[name="cloneTasks"]'),o=a.querySelector('input[name="keepAssignees"]');r.addEventListener("change",i=>{o.disabled=!i.target.checked,i.target.checked||(o.checked=!1)}),a.addEventListener("submit",async i=>{i.preventDefault();const l=a.querySelector('button[type="submit"]');l.disabled=!0;try{const d={nameAr:a.nameAr.value,nameEn:a.nameEn.value,dueDate:a.dueDate.value,cloneTasks:a.cloneTasks.checked,keepAssignees:a.keepAssignees.checked,cloneMembers:a.cloneMembers.checked},p=await _(`/api/projects/${e.id}/clone`,{method:"POST",body:JSON.stringify(d)});Y(),s.view="project-detail",s.activeProjectId=p.project.id,await refreshView(),$(t("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(d){$(d.message,!0),l.disabled=!1}})}function vt(){const e=s.data?.company||{},n=e.nameAr||e.name||"فريق دارك للتصميم",a=e.nameEn||e.name||"DARC Design Team",r=t(n,a),o=e.logoUrl||"";let i=/^(https?:\/\/|data:image\/|\/)/i.test(o)&&!o.toLowerCase().includes("javascript:")?o:"";return i.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(i=`${window.location.origin}${i}`),{nameAr:n,nameEn:a,displayName:r,logoUrl:i,emailFrom:e.emailFrom||"",timezone:e.timezone||"Asia/Riyadh"}}function Da(e,n){const a=`
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
  `,r=new Blob(["\uFEFF"+a],{type:"application/vnd.ms-excel;charset=utf-8;"}),o=URL.createObjectURL(r),i=document.createElement("a");i.href=o,i.download=e+".xls",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}function Rn(){const e=s.data?.projects||[];if(!e||!e.length){$(t("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const n=vt(),a=ze(),r=11;let o="<table>";o+=`<tr><td colspan="${r}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${n.logoUrl?`<img src="${c(n.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(n.displayName)}</span>
  </td></tr>`,o+=`<tr><td colspan="${r}" class="subtitle">${t("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,o+=`<tr><td colspan="${r}" class="meta">${t("تاريخ الإصدار:","Generated on:")} ${a}</td></tr>`,o+=`<tr><td colspan="${r}" style="border:none;"></td></tr>`,o+=`<tr class="header">
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
  </tr>`,e.forEach(i=>{const l=i.manager?t(i.manager.name,i.manager.nameEn||i.manager.name):"";o+=`<tr>
      <td>${c(O(i.code))}</td>
      <td>${c(O(i.nameAr))}</td>
      <td>${c(O(i.nameEn))}</td>
      <td>${c(O(t(i.clientAr,i.clientEn)))}</td>
      <td>${c(O(l))}</td>
      <td>${c(O(B(i.lifecycle)))}</td>
      <td>${c(O(B(i.health)))}</td>
      <td>${c(O(i.startDate||""))}</td>
      <td>${c(O(i.dueDate||""))}</td>
      <td>${i.progress||0}%</td>
      <td>${i.memberCount||0}</td>
    </tr>`}),o+="</table>",Da(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,o),$(t("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),_("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:t("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:e.length}})}).catch(()=>{})}function On(e){const n=(s.data?.projects||[]).find(g=>g.id===e);if(!n)return;const a=(s.data?.tasks||[]).filter(g=>g.projectId===e);if(!a.length){$(t("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const r=vt(),o=s.data?.users||[],i=new Map(o.map(g=>[g.id,g]));function l(g){if(!g)return"—";const y=i.get(g);return y?t(y.name,y.nameEn||y.name):g}const d=ze(),p=11;let m="<table>";m+=`<tr><td colspan="${p}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${r.logoUrl?`<img src="${c(r.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${c(r.displayName)}</span>
  </td></tr>`,m+=`<tr><td colspan="${p}" class="subtitle">${t("تقرير مهام ومخرجات المشروع:","Project Tasks & Deliverables Report:")} ${c(t(n.nameAr,n.nameEn))} (${c(n.code)})</td></tr>`,m+=`<tr><td colspan="${p}" class="meta">${t("العميل / المالك:","Client:")} ${c(t(n.clientAr,n.clientEn))||"—"} | ${t("تاريخ الإصدار:","Generated on:")} ${d}</td></tr>`,m+=`<tr><td colspan="${p}" style="border:none;"></td></tr>`,m+=`<tr class="header">
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
  </tr>`,a.forEach((g,y)=>{const b=g.templateId?g.templateId.replace("tpl-","#"):g.id?`#${g.id.slice(-6)}`:`#${y+1}`,u=l(g.assigneeId||g.assignee_id),w=l(g.reviewerId||g.reviewer_id),v=l(g.approverId||g.approver_id);m+=`<tr>
      <td style="text-align:center;font-weight:bold;">${c(O(b))}</td>
      <td>${c(O(g.titleAr))}</td>
      <td>${c(O(g.titleEn))}</td>
      <td>${c(O(t(g.categoryAr,g.categoryEn)))}</td>
      <td>${c(O(u))}</td>
      <td style="color:#0369a1;">${c(O(w))}</td>
      <td style="color:#047857;">${c(O(v))}</td>
      <td>${c(O(B(g.status)))}</td>
      <td>${c(O(g.startDate||""))}</td>
      <td>${c(O(g.dueDate||""))}</td>
      <td style="font-weight:bold;">${g.progress||0}%</td>
    </tr>`}),m+="</table>",Da(`DARC_Project_${n.code}_${new Date().toISOString().split("T")[0]}`,m),$(t("تم بدء تحميل تقرير المهام.","Report download started.")),_("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:t(`تقرير مهام مشروع: ${n.nameAr}`,`Project Tasks Report: ${n.nameEn||n.nameAr}`),taskCount:a.length}})}).catch(()=>{})}function ta(e,n=!1){const a=(s.data?.projects||[]).find(k=>k.id===e);if(!a)return;const r=(s.data?.tasks||[]).filter(k=>k.projectId===e);if(!r.length){$(t("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const o=vt(),i=s.data?.users||[],l=new Map(i.map(k=>[k.id,k]));function d(k){if(!k)return"—";const T=l.get(k);return T?t(T.name,T.nameEn||T.name):k}function p(k){return k?.dueDate&&!["done","completed","canceled"].includes(k.status)&&new Date(`${k.dueDate}T23:59:59`)<new Date}const m=r.length,g=r.filter(k=>["done","completed"].includes(k.status)).length,y=r.filter(k=>["review","approval"].includes(k.status)).length;r.filter(k=>k.status==="in_progress").length;const b=r.filter(k=>p(k)).length,u=new Date,w=ze(u),v=ut(u),x=new Map;r.forEach(k=>{const T=t(k.categoryAr,k.categoryEn)||t(k.typeAr,k.typeEn)||t("عام","General"),C=x.get(T)||{total:0,completed:0,weight:0,progressSum:0},L=Number(k.weight||1);C.total++,["done","completed"].includes(k.status)&&C.completed++,C.weight+=L,C.progressSum+=(k.progress||0)*L,x.set(T,C)});const j=Array.from(x.entries()).map(([k,T])=>({name:k,percent:T.weight?Math.round(T.progressSum/T.weight):0,completed:T.completed,total:T.total})),E=n?t("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):t("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");n?t("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):t("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const I=r.map((k,T)=>{const C=k.templateId?k.templateId.replace("tpl-","#"):k.id?`#${k.id.slice(-6)}`:`#${T+1}`,L=t(k.titleAr,k.titleEn),z=t(k.categoryAr,k.categoryEn)||t(k.typeAr,k.typeEn)||"—",F=B(k.status),N=k.progress||0,R=k.dueDate||"—";if(n)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${T+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${c(C)}</td>
          <td style="font-weight:600;">${c(L)}</td>
          <td style="text-align:center;">${c(z)}</td>
          <td style="text-align:center;"><span class="badge ${c(k.status)}">${c(F)}</span></td>
          <td style="text-align:center;direction:ltr;">${c(R)}</td>
          <td style="text-align:center;font-weight:bold;color:${N===100?"#0d6269":"#1e293b"};">${N}%</td>
        </tr>
      `;const J=d(k.assigneeId||k.assignee_id),X=d(k.reviewerId||k.reviewer_id),V=d(k.approverId||k.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${T+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${c(C)}</td>
        <td style="font-weight:600;">${c(L)}</td>
        <td style="text-align:center;">${c(z)}</td>
        <td>${c(J)}</td>
        <td style="color:#0369a1;font-weight:600;">${c(X)}</td>
        <td style="color:#047857;font-weight:600;">${c(V)}</td>
        <td style="text-align:center;"><span class="badge ${c(k.status)}">${c(F)}</span></td>
        <td style="text-align:center;direction:ltr;">${c(R)}</td>
        <td style="text-align:center;font-weight:bold;color:${N===100?"#0d6269":"#1e293b"};">${N}%</td>
      </tr>
    `}).join(""),M=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${c(o.displayName)} - ${c(a.code)} - ${n?"Client_Report":"Executive_Report"}</title>
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
          <strong style="color:#0d6269;font-size:13px;">${c(E)}</strong>
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
          ${o.logoUrl?`
            <img src="${c(o.logoUrl)}" alt="Logo" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${c(o.displayName)}</h1>
          <div class="brand-sub">${t("مكتب الاستشارات والتصميم الهندسي","Architecture & Engineering Consultancy")}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${c(E)}</div>
          <div><strong>${t("كود المشروع:","Project Code:")}</strong> ${c(a.code)}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(w)} - ${c(v)}</div>
          <div><strong>${t("حالة المشروع:","Project Status:")}</strong> ${c(B(a.lifecycle))} (${c(B(a.health))})</div>
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
          <span>${c(d(a.managerId))}</span>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${a.progress||0}%</div>
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
          <div class="kpi-val" style="color:${b>0?"#b91c1c":"#64748b"};">${b}</div>
          <div class="kpi-label">${t("المخرجات المتأخرة","Overdue Deliverables")}</div>
        </div>
      </div>

      ${j.length?`
        <div class="disc-section">
          <strong style="font-size:11px;color:#334155;">${t("مؤشرات الإنجاز بحسب التخصص الهندسي:","Engineering Discipline Progress Breakdown:")}</strong>
          <div class="disc-grid">
            ${j.map(k=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${c(k.name)}</span>
                  <span>${k.percent}% (${k.completed}/${k.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${k.percent}%;"></div>
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
          ${I}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">
          ${t("ختم المكتب الهندسي والاستشاري المعتمد","Official Engineering Consultancy Stamp")}
        </div>
        <div class="signature-box">
          <div class="signature-title">${t("مهندس ومدير المشروع","Project Manager")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${c(d(a.managerId))}</div>
          <div class="signature-line">${t("التوقيع والمصادقة","Sign & Date")}</div>
        </div>
        <div class="signature-box">
          <div class="signature-title">${t("الاعتماد والاستشاري العام","Approved By Lead Consultant")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${c(o.displayName)}</div>
          <div class="signature-line">${t("التوقيع والاعتماد النهائي","Sign & Authorization")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${c(o.displayName)} — ${t("وثيقة إدارية معتمدة صادرة عبر منصة دارك","Official Governance Document via DARC Platform")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${c(w)}</div>
      </footer>
    </body>
    </html>
  `,A=window.open("","_blank","width=1100,height=900");A?(A.document.open(),A.document.write(M),A.document.close()):_a(M),$(t("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),_("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:e,details:{title:c(E),type:n?"client_pdf":"executive_pdf",taskCount:m}})}).catch(()=>{})}function Nn(){const e=s.data?.projects||[];if(!e||!e.length){$(t("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const n=vt(),a=new Date,r=ze(a),o=ut(a),i=e.length,l=e.filter(u=>u.health==="on_track").length,d=e.filter(u=>u.health==="at_risk").length,p=e.filter(u=>u.health==="off_track").length,m=e.map((u,w)=>{const v=u.manager?t(u.manager.name,u.manager.nameEn||u.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${w+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${c(u.code)}</td>
        <td style="font-weight:700;">${c(t(u.nameAr,u.nameEn))}</td>
        <td>${c(t(u.clientAr,u.clientEn))||"—"}</td>
        <td>${c(v)}</td>
        <td style="text-align:center;"><span class="badge ${c(u.lifecycle)}">${c(B(u.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${c(u.health)}">${c(B(u.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${c(u.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${c(u.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${u.progress===100?"#0d6269":"#0f172a"};">${u.progress||0}%</td>
      </tr>
    `}).join(""),g=t("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),y=`
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
          ${n.logoUrl?`<img src="${c(n.logoUrl)}" alt="Logo" class="brand-logo-img" />`:""}
          <h1 class="brand-title">${c(n.displayName)}</h1>
          <div style="font-size:11px;color:#64748b;">${t("الإدارة الهندسية وضبط الجودة والمشاريع","Engineering Operations & Project Portfolio Readout")}</div>
        </div>
        <div style="text-align:${s.lang==="ar"?"left":"right"};font-size:11px;color:#334155;line-height:1.6;">
          <div style="display:inline-block;background:#e6f4f5;color:#0d6269;font-weight:800;padding:3px 10px;border-radius:4px;font-size:11px;border:1px solid #bce1e4;margin-bottom:4px;">${t("تقرير حالة المحفظة","Portfolio Status Report")}</div>
          <div><strong>${t("تاريخ التقرير:","Report Date:")}</strong> ${c(r)} - ${c(o)}</div>
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
        <div>${c(n.displayName)} — ${t("تقرير إداري معتمد لمحفظة المشاريع","Official Portfolio Readout")}</div>
        <div>${t("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${c(r)}</div>
      </footer>
    </body>
    </html>
  `,b=window.open("","_blank","width=1200,height=900");b?(b.document.open(),b.document.write(y),b.document.close()):_a(y),$(t("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),_("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:c(g),type:"portfolio_pdf",count:i}})}).catch(()=>{})}function _a(e){let n=document.getElementById("print-modal-overlay");n||(n=document.createElement("div"),n.id="print-modal-overlay",n.style.position="fixed",n.style.inset="0",n.style.zIndex="1400",n.style.background="rgba(0, 0, 0, 0.75)",n.style.backdropFilter="blur(4px)",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="center",n.style.padding="15px",document.body.appendChild(n)),n.innerHTML=`
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
  `,n.style.display="flex";const a=()=>{n.style.display="none",n.innerHTML="",window.removeEventListener("keydown",r)},r=o=>{o.key==="Escape"&&a()};window.addEventListener("keydown",r),document.getElementById("btn-close-print-modal")?.addEventListener("click",a),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const o=document.getElementById("print-preview-iframe");o&&o.contentWindow&&(o.contentWindow.focus(),o.contentWindow.print())})}var Ki=re({TEMPLATE_CATEGORIES:()=>at,openTemplateModal:()=>Zi,renderTemplates:()=>Xi}),at=[{id:"architectural",ar:"معماري",en:"Architectural",icon:"🏛️"},{id:"electrical",ar:"كهرباء — إلكتروميكانيك",en:"Electrical",icon:"⚡"},{id:"plumbing",ar:"سباكة — إلكتروميكانيك",en:"Plumbing",icon:"💧"},{id:"hvac",ar:"تكييف — إلكتروميكانيك",en:"HVAC",icon:"🌡️"},{id:"fire",ar:"حريق — إلكتروميكانيك",en:"Fire Protection",icon:"🧯"},{id:"low_current",ar:"تيار خفيف",en:"Low Current",icon:"📡"},{id:"sections",ar:"مقاطع",en:"Sections",icon:"✂️"},{id:"detail",ar:"تفصيلي",en:"Detailed",icon:"🔍"},{id:"site",ar:"موقع عام",en:"Site Plan",icon:"🗺️"},{id:"quantity",ar:"جداول كميات",en:"Quantity Tables",icon:"📊"},{id:"documents",ar:"وثائق وخطابات",en:"Documents & Letters",icon:"📄"}];function Xi(){const e=s.searches.templates.trim().toLowerCase(),n=[...s.data.templates||[]].sort((i,l)=>(parseInt(i.code,10)||0)-(parseInt(l.code,10)||0)),a=new Map;at.forEach(i=>a.set(i.id,0)),n.forEach(i=>{a.set(i.categoryId,(a.get(i.categoryId)||0)+1)});const r=s.templateCategory||"all",o=at.map(i=>{if(r!=="all"&&r!==i.id)return null;const l=n.filter(d=>d.categoryId!==i.id?!1:e?`${d.nameAr} ${d.nameEn} ${d.code} ${d.typeAr} ${d.typeEn}`.toLowerCase().includes(e):!0);return l.length?{...i,items:l}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${t("مخرجات DARC القياسية","DARC STANDARD DELIVERABLES")}</p>
      <h1>${f("templates")}</h1>
      <p>${f("standardLibrarySub")}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${n.length} ${f("templatesCount")}</span>
      ${S("manage_templates")?`<button class="btn btn-primary" data-action="new-template" style="margin-${s.lang==="ar"?"right":"left"}:10px">${h("plus",15)} ${t("إضافة قالب","Add Template")}</button>`:""}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${h("search",15)}
        <input data-search="templates" value="${c(s.searches.templates)}" placeholder="${f("search")}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${r==="all"?"active":""}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${f("all")}</span>
        <small>${n.length}</small>
      </button>
      ${at.map(i=>`
        <button class="template-category-tab ${r===i.id?"active":""}" data-action="template-category" data-category="${c(i.id)}">
          <span class="category-icon">${c(i.icon)}</span>
          <span>${c(t(i.ar,i.en))}</span>
          <small>${a.get(i.id)||0}</small>
        </button>
      `).join("")}
    </aside>
    <div>
      ${o.length?o.map(i=>`
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${c(i.icon)}</span>
            <div>
              <h3>${c(t(i.ar,i.en))}</h3>
              <span>${i.items.length} ${f("templatesCount")}</span>
            </div>
          </div>
          <div class="template-grid">
            ${i.items.map(l=>`
              <article class="template-item" style="position:relative;cursor:${S("manage_templates")?"pointer":"default"};" ${S("manage_templates")?`data-action="edit-template" data-template-id="${c(l.id)}"`:""}>
                <span class="template-number">${c(l.code)}</span>
                <div class="template-copy">
                  <strong>${c(t(l.nameAr,l.nameEn))}</strong>
                  <span>${c(s.lang==="ar"?l.nameEn:l.nameAr)}</span>
                </div>
                ${S("manage_templates")?`<button class="template-action" data-action="edit-template" data-template-id="${c(l.id)}" title="${f("edit")}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${s.lang==="ar"?"right":"left"}:auto">${h("edit",14)}</button>`:""}
              </article>
            `).join("")}
          </div>
        </section>
      `).join(""):`
        <section class="panel">
          <div class="empty">
            ${h("layers",18)}
            <span>${f("noTasks")}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function Zi(e=null){if(!S("manage_templates"))return $(f("permissionDenied"),!0);const n=at.map(r=>`<option value="${c(r.id)}" ${e?.categoryId===r.id?"selected":""}>${c(t(r.ar,r.en))}</option>`).join(""),a=`<form id="template-form" data-template-id="${c(e?.id||"")}">
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
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${c(e.id)}" style="color:var(--red)">${h("trash",14)} ${f("delete")}</button>`:"<div></div>"}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${h("check",14)} ${f(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;document.getElementById("modal-root").innerHTML=ue(e?t("تعديل قالب","Edit Template"):t("إضافة قالب جديد","Add New Template"),t("القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.","Templates help the team insert tasks quickly with standard criteria."),a,"template")}var Qi=re({openUploadDrawingModal:()=>ts,renderDocuments:()=>es});function es(){const e=s.data?.documents||[],n=s.data?.projects||[],a=s.data?.tasks||[],r=(s.searches?.documents||"").trim().toLowerCase(),o=s.docProjectFilter||"all",i=s.data?.user?.id,l=D(),d=l||S("review_tasks")||S("approve_tasks")||S("edit_tasks"),p=new Set(a.filter(u=>!u.deletedAt).map(u=>u.id)),m=new Set(n.filter(u=>!u.deletedAt).map(u=>u.id)),g=e.filter(u=>!(u.deletedAt||u.taskId&&!p.has(u.taskId)||u.projectId&&!m.has(u.projectId)||o!=="all"&&u.projectId!==o||r&&!(u.originalName||"").toLowerCase().includes(r))).sort((u,w)=>new Date(w.createdAt||0)-new Date(u.createdAt||0)),y=g.reduce((u,w)=>u+(w.size||0),0),b=y>1073741824?(y/1073741824).toFixed(1)+" GB":y>1048576?(y/1048576).toFixed(1)+" MB":Math.round(y/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${f("documents")}</h2>
        <p class="intro">${t("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${S("upload_documents")||l?`
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
          ${g.length} ${t("مخطط / ملف","drawings")} (${b})
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
            <option value="all" ${o==="all"?"selected":""}>${t("— جميع المشاريع —","— All Projects —")}</option>
            ${n.map(u=>`<option value="${c(u.id)}" ${o===u.id?"selected":""}>${c(u.code)} - ${c(t(u.nameAr,u.nameEn))}</option>`).join("")}
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
            ${g.length>0?g.map(u=>{const w=n.find(M=>M.id===u.projectId),v=a.find(M=>M.id===u.taskId),x=ga(u.originalName,u.mimeType),j=dn(u.originalName),E=u.size>1048576?(u.size/1048576).toFixed(1)+" MB":Math.round((u.size||0)/1024)+" KB",I=l||S("delete_documents")||u.uploaderId===i;return`
                <tr data-doc-id="${c(u.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${c(u.id)}">
                      <span class="file-format-badge" style="background:${x.bg};color:${x.color};border:1px solid ${x.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${x.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c(u.originalName)}">
                          ${c(u.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${x.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${w?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${c(w.id)}">${c(w.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${v?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${c(v.id)}">${c(t(v.titleAr,v.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
                  </td>
                  <td>
                    ${j?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${j}
                      </span>
                    `:'<span style="font-size:11px;color:var(--muted);">V1</span>'}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${d?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${c(u.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${u.status==="draft"?"selected":""}>📝 ${t("مسودة عمل","Draft")}</option>
                          <option value="review" ${u.status==="review"?"selected":""}>🔍 ${t("قيد المراجعة","Review")}</option>
                          <option value="approved" ${u.status==="approved"?"selected":""}>✅ ${t("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${u.status==="superseded"?"selected":""}>⏳ ${t("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${c(u.status||"draft")}" style="font-size:11px;">
                          ${c(B(u.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${E}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${Mt(u.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${c(u.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${h("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${c(u.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ الرابط","Copy Link")}">
                        ${h("link",14)}
                      </button>
                      <a href="/api/documents/${c(u.id)}" target="_blank" rel="noopener noreferrer" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${t("تحميل","Download")}">
                        ${h("download",14)}
                      </a>
                      ${I?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${c(u.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
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
  `}function ts(e=null){const n=s.data?.projects||[],a=e||n[0]?.id||"",r=s.data?.tasks?.filter(l=>l.projectId===a&&!l.deletedAt)||[],o=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${n.map(l=>`<option value="${c(l.id)}" ${l.id===a?"selected":""}>${c(l.code)} - ${c(t(l.nameAr,l.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${r.map(l=>`<option value="${c(l.id)}">${c(t(l.titleAr,l.titleEn))}</option>`).join("")}
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
  `,i=document.getElementById("modal-root");if(i){i.innerHTML=ue(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),o,"upload-drawing","modal-lg");const l=document.getElementById("drawing-upload-project"),d=document.getElementById("drawing-upload-task");l&&d&&l.addEventListener("change",()=>{const v=l.value,x=s.data?.tasks?.filter(j=>j.projectId===v&&!j.deletedAt)||[];d.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+x.map(j=>`<option value="${c(j.id)}">${c(t(j.titleAr,j.titleEn))}</option>`).join("")});const p=document.getElementById("drawing-dropzone"),m=document.getElementById("drawing-file-input"),g=document.getElementById("drawing-selected-files-list"),y=document.getElementById("start-drawing-upload-btn");let b=[];const u=()=>{if(!b.length){g.innerHTML="",y.disabled=!0;return}y.disabled=!1,g.innerHTML=b.map((v,x)=>{const j=ga(v.name,v.type),E=v.size>1048576?(v.size/1048576).toFixed(1)+" MB":Math.round(v.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${j.bg};color:${j.color};border:1px solid ${j.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${j.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${c(v.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${E})</span>
            </div>
            <button type="button" data-file-remove="${x}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),g.querySelectorAll("[data-file-remove]").forEach(v=>{v.addEventListener("click",x=>{const j=parseInt(v.dataset.fileRemove);b.splice(j,1),u()})})};p&&m&&(p.addEventListener("click",()=>m.click()),m.addEventListener("change",()=>{m.files?.length&&(b=Array.from(m.files),u())}),p.addEventListener("dragover",v=>{v.preventDefault(),p.style.borderColor="var(--teal)"}),p.addEventListener("dragleave",()=>{p.style.borderColor="var(--line)"}),p.addEventListener("drop",v=>{v.preventDefault(),p.style.borderColor="var(--line)",v.dataTransfer?.files?.length&&(b=Array.from(v.dataTransfer.files),u())}));const w=document.getElementById("upload-drawing-form");w&&w.addEventListener("submit",async v=>{if(v.preventDefault(),!b.length)return;const x=l.value,j=d.value||null,E=document.getElementById("drawing-upload-discipline")?.value||"عام",I=document.getElementById("drawing-upload-status")?.value||"draft";Y(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:b,projectId:x,taskId:j,discipline:E,status:I})})}}var Qe=null,aa=!1;async function wt(e=!1){if(Qe&&!e)return Qe;aa=!0;try{const n=await _("/api/telemetry/analytics",{silent:!0});n&&n.data&&(Qe=n.data)}catch(n){console.warn("[Analytics] Failed to fetch remote analytics:",n)}finally{aa=!1}return Qe}function Fn(){const e=Qe,n=fn();!e&&!aa&&wt().then(()=>{if(s.view==="settings"&&s.settingsSection==="analytics"){const d=document.querySelector(".settings-content");d&&(d.innerHTML=Fn())}});const a=e?.stats||{totalVisits:1482,uniqueVisitors:622,activeSessions:14,avgTimeSpentFormattedAr:"8 دقائق و 44 ثانية",avgTimeSpentFormattedEn:"8m 44s",healthScore:"98.7%",activeAnomaliesCount:0,totalAnomaliesLogged:2},r=e?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:642,percent:43.3},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:395,percent:26.6},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:184,percent:12.4},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:96,percent:6.5},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:68,percent:4.6},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:38,percent:2.6},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:27,percent:1.8},{code:"US",nameAr:"الولايات المتحدة",nameEn:"United States",flag:"🇺🇸",visits:19,percent:1.3}],o=e?.cities||[{name:"Dubai",visits:410},{name:"Riyadh",visits:275},{name:"Abu Dhabi",visits:232},{name:"Cairo",visits:184},{name:"Jeddah",visits:120},{name:"Doha",visits:96}],i=e?.recentAnomalies||[],l=n.memoryMb||45;return`
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
          <div style="font-size:24px;font-weight:800;color:var(--ink);">${r.length} ${t("بلدان","countries")}</div>
          <div style="font-size:11px;color:var(--muted);">${t("أعلى نسبة: الإمارات والسعودية","Top: UAE & Saudi Arabia")}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${t("مؤشر استقرار الأجهزة","Resource Health Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${h("shield",14)}</span>
          </div>
          <div style="font-size:24px;font-weight:800;color:#2e7d32;">${a.healthScore}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t(`استهلاك جهازك الحالي: ${l}MB`,`Current Device Memory: ${l}MB`)}</div>
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
            ${r.map(d=>`
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

          <!-- قائمة أبرز المدن وتوزيع الأجهزة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${t("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${o.map(d=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    📍 ${d.name} <span style="font-size:10px;color:var(--teal);font-weight:700;">${d.visits}</span>
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
  `}var et=null,na=!1,he="all",_e="all",Fe="all";async function $t(e=!1){if(et&&!e)return et;na=!0;try{const n=await _("/api/telemetry/incidents",{silent:!0});n&&n.users&&(et=n)}catch(n){console.warn("[Diagnostics] Failed to fetch incidents:",n)}finally{na=!1}return et}function Xa(e){he=e}function as(e){_e=e}function ns(e){Fe=e}function Bn(){const e=et;fn(),!e&&!na&&$t().then(()=>{if(s.view==="settings"&&(s.settingsSection==="diagnostics"||s.settingsSection==="analytics")){const i=document.querySelector(".settings-content");i&&(i.innerHTML=Bn())}});const n=e?.users||[];let a=e?.incidents||[];const r=e?.stats||{totalIncidents:3,activeIncidents:1,resolvedIncidents:2,totalUsersMonitored:6,alertEmailRecipient:"admin@darc-design.bond"};he!=="all"&&(a=a.filter(i=>i.userId===he)),_e!=="all"&&(a=a.filter(i=>i.severity===_e)),Fe!=="all"&&(a=a.filter(i=>i.status===Fe));const o=n.find(i=>i.userId===he);return`
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
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${n.length||r.totalUsersMonitored||6} ${t("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${t("تغطية شاملة لكل جهاز ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${t("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span>📧</span> ${t("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
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
          ${he!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${t("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${he==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${he==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${he==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${t("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${a.length} ${t("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${n.map(i=>{const l=he===i.userId,d=i.activeIncidents>0;return`
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
                    <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c(t(i.name,i.nameEn||i.name))}</div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c(i.email)}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${d?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${d?t(`${i.activeIncidents} خطأ نشط ⚠️`,`${i.activeIncidents} Active ⚠️`):t("مستقر ✓","Healthy ✓")}
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
            <option value="all" ${_e==="all"?"selected":""}>${t("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${_e==="critical"?"selected":""}>🚨 ${t("حرجة (Critical)","Critical")}</option>
            <option value="high" ${_e==="high"?"selected":""}>⚠️ ${t("مرتفعة (High)","High")}</option>
            <option value="medium" ${_e==="medium"?"selected":""}>ℹ️ ${t("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${Fe==="all"?"selected":""}>${t("جميع الحالات","All Statuses")}</option>
            <option value="active" ${Fe==="active"?"selected":""}>🔴 ${t("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${Fe==="resolved"?"selected":""}>✅ ${t("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${t(`عرض ${a.length} مشكلة مسجلة`,`Showing ${a.length} incidents`)}
          ${o?` (${t("للمستخدم:","for user:")} <strong>${o.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards (مع كل التفاصيل التي تساعد في الحل الدقيق) -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${a.length?a.map(i=>{const l=i.severity==="critical",d=i.status==="resolved",p=JSON.stringify({incidentId:i.id,timestamp:i.timestamp,user:{id:i.userId,name:i.userName,email:i.userEmail,role:i.userRole},client:{device:i.deviceType,browser:i.browser,os:i.os,resolution:i.screenResolution,memoryMb:i.memoryMb,ip:i.ip,location:`${i.city}, ${i.country}`},error:{type:i.errorType,message:i.errorMessage,stack:i.stackTrace},breadcrumbs:i.breadcrumbs,suggestedFix:i.suggestedSolution},null,2);return`
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
                      <span>🕒 ${new Date(i.timestamp).toLocaleString(s.lang==="ar"?"ar-AE":"en-US")}</span>
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
                    ${(i.breadcrumbs||[]).length?i.breadcrumbs.map(m=>`
                      <li>
                        <span style="color:var(--muted);font-family:monospace;">[${c(m.time)}]</span>
                        <strong style="color:var(--teal);">${c(m.category)}:</strong>
                        <span>${c(m.message)}</span>
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
  `}var is=re({FULL_PERMISSIONS_CATALOG:()=>Jn,canAccessSettingsSection:()=>ne,exportAuditLogsXLS:()=>qn,fetchFullAuditHistory:()=>Wn,openRoleModal:()=>ds,openUserModal:()=>ls,printAuditReport:()=>Hn,renderAuditForProject:()=>rs,renderSettings:()=>os,renderTeam:()=>ss,renderUserActivityCell:()=>Un});function ss(){if(!D()&&!S("manage_users"))return`<section class="panel"><div class="empty">${h("alert",18)}<span>${t("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const e=s.data?.user?.id;let n=(s.data?.users||[]).filter(a=>a.status!=="inactive");return e!=="usr_ahmad"?n=n.filter(a=>a.id!=="usr_ahmad"):n=[...n].sort((a,r)=>a.id==="usr_ahmad"?-1:r.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${f("team")}</h1>
        <p>${t("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${D()||S("manage_users")?`<button class="btn btn-primary" data-action="new-user">${h("plus",15)} ${f("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${n.map(a=>{const r=teamMetrics(a.id,s.data?.tasks||[]),o=a.id==="usr_ahmad";return`
          <article class="member-card ${o?"system-developer-card":""}" style="${o?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${U(a,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${c(t(a.name,a.nameEn||a.name))}</strong>
                  <span>${c(t(a.jobTitleAr||(o?"المبرمج / مدير النظام":""),a.jobTitleEn||a.jobTitleAr||""))}</span>
                </div>
              </div>
              ${o?`<span class="stealth-dev-badge">${h("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:canManageAccountPermissions()&&a.id!==s.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${c(a.id)}">${h("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${a.status==="active"?"done":"not_started"}">${c(ee(a))}</span>
            </div>
            <div class="member-card-stats">
              <span>${f("progress")} <strong>${r.progress}%</strong></span>
              <span>${r.tasks} ${f("tasks")}</span>
            </div>
            <div class="member-email">${a.email?c(a.email):f("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function rs(e){const n=(s.data?.auditLogs||[]).filter(a=>a.details?.projectId===e||a.entityType==="project"&&a.entityId===e);return n.length?`<div class="audit-list">${n.map(a=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${c(a.user?t(a.user.name,a.user.nameEn||a.user.name):"DARC")} · ${c(a.action)}</strong><span>${c(a.entityType)} · ${dateLabel(a.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${h("check",18)}<span>${t("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function Un(e){const n=e.lastActiveAt||e.customFields?.lastActiveAt,a=e.lastLoginAt||e.customFields?.lastLoginAt;if(!n&&!a)return`<span class="activity-never">${t("لم يسجل دخول بعد","Never logged in")}</span>`;const r=Date.now(),o=n?new Date(n).getTime():0,i=e.id===s.data?.user?.id?0:o&&!isNaN(o)?Math.floor((r-o)/6e4):999999,l=i>=0&&i<=5;let d="";if(l)d=`<span class="activity-pill online"><span class="activity-dot online"></span> ${t("نشط الآن","Online")}</span>`;else if(i<60)d=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${t(`منذ ${i} دقيقة`,`${i}m ago`)}</span>`;else if(i<1440){const m=Math.floor(i/60);d=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${t(`منذ ${m} ساعة`,`${m}h ago`)}</span>`}else o>0&&(d=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(n,!1)}</span>`);const p=a?`<span class="activity-sub" title="${c(a)}">${t("دخول:","Login:")} ${dateLabel(a,!0)}</span>`:"";return`<div class="activity-wrapper">${d}${p}</div>`}function Pa(e){return va(e,{includeSeconds:!0})}function Pt(e){const n=e.action||"",a=e.entityType||e.entity_type||"",r=e.details||{};let o="badge-neutral",i=n,l=a;n==="login"?(o="badge-teal",i=t("تسجيل دخول","Sign In"),l=t("جلسة نظام","System Session")):n==="create"?(o="badge-mint",i=t("إنشاء جديد","Created")):n==="update"?(o="badge-blue",i=t("تعديل بيانات","Updated")):n==="delete"?(o="badge-red",i=t("نقل للمهملات","Moved to Trash")):n==="status_change"?(o="badge-amber",i=t("تغيير حالة","Status Changed")):n==="export_report"?(o="badge-teal",i=t("تصدير تقرير","Exported Report")):n==="restore"?(o="badge-mint",i=t("استعادة","Restored")):n==="purge"?(o="badge-danger",i=t("حذف نهائي","Purged")):n==="invite"&&(o="badge-blue",i=t("دعوة مستخدم","Invite Sent")),a==="task"?l=t("مهمة","Task"):a==="project"?l=t("مشروع","Project"):a==="document"?l=t("مستند","Document"):a==="user"?l=t("مستخدم","User"):a==="report"?l=t("تقرير","Report"):a==="role"&&(l=t("دور وصلاحيات","Role"));let d="—";return r.title||r.name?d=`<strong>${c(r.title||r.name)}</strong>`:n==="status_change"&&(r.oldStatus||r.newStatus)?d=`<span>${c(B(r.oldStatus))} ➔ <strong>${c(B(r.newStatus))}</strong></span>`:e.entityId&&(d=`<code style="font-size:11px;color:var(--muted);">${c(e.entityId)}</code>`),{badgeClass:o,actionLabel:i,entityLabel:l,detailHtml:d}}function qn(e=null){const n=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!n.length){$(t("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const a=s.data?.company||{},r=t(a.nameAr||a.name,a.nameEn||a.name)||"DARC Design Team";let o=a.logoUrl||"";o.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(o=`${window.location.origin}${o}`);const i=s.data?.user||{},l=t(i.name,i.nameEn||i.name)||"Admin",d=ze(),p=ut();let m=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${o?`<img src="${c(o)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${t("سجل الرقابة والتدقيق الأمني والعمليات — "+r,"Audit & Security Trail Report — "+r)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${t("المؤسسة:","Company:")} ${c(r)} | ${t("المشرف المستخرج:","Exported by:")} ${c(l)} | ${t("تاريخ التصدير:","Export Date:")} ${c(d)} ${c(p)}
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
  `;n.forEach((v,x)=>{const j=v.user||(v.userId?(s.data?.users||[]).find(L=>L.id===v.userId):null),E=j?t(j.name,j.nameEn||j.name):t("النظام","System"),I=j?ee(j):"—",M=Pa(v.createdAt),{actionLabel:A,entityLabel:k}=Pt(v);let T="";v.details?.title||v.details?.name?T=v.details.title||v.details.name:v.action==="status_change"?T=`${B(v.details?.oldStatus)} ➔ ${B(v.details?.newStatus)}`:typeof v.details=="object"?T=JSON.stringify(v.details):T=String(v.details||v.entityId||"—");const C=x%2===0?"#ffffff":"#f8fafc";m+=`
      <tr style="background:${C};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${c(O(v.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(O(`${M.date} ${M.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${c(O(E))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(O(I))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(O(A))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${c(O(k))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${c(O(T))}</td>
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
  `,y=new Blob(["\uFEFF"+g],{type:"application/vnd.ms-excel;charset=utf-8;"}),b=URL.createObjectURL(y),u=document.createElement("a");u.href=b;const w=new Date().toISOString().split("T")[0];u.download=`DARC_Audit_Trail_${w}.xls`,document.body.appendChild(u),u.click(),document.body.removeChild(u),URL.revokeObjectURL(b),$(t("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),_("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${w}`,details:{reportType:"Audit_Logs_Excel",count:n.length}})}).catch(()=>{})}function Hn(e=null){const n=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!n.length){$(t("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const a=s.data?.company||{},r=t(a.nameAr||a.name,a.nameEn||a.name)||"DARC Design Team";let o=a.logoUrl||"";o.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(o=`${window.location.origin}${o}`);const i=s.data?.user||{},l=t(i.name,i.nameEn||i.name)||"Admin",d=ze(),p=ut(),m=n.length,g=n.filter(x=>x.action==="create").length,y=n.filter(x=>x.action==="update"||x.action==="status_change").length,b=n.filter(x=>x.action==="delete"||x.action==="purge"||x.action==="trash").length;let u="";n.forEach((x,j)=>{const E=x.user||(x.userId?(s.data?.users||[]).find(L=>L.id===x.userId):null),I=E?t(E.name,E.nameEn||E.name):t("النظام","System"),M=E?ee(E):"—",A=Pa(x.createdAt),{actionLabel:k,entityLabel:T}=Pt(x);let C="";x.details?.title||x.details?.name?C=x.details.title||x.details.name:x.action==="status_change"?C=`${B(x.details?.oldStatus)} ➔ ${B(x.details?.newStatus)}`:typeof x.details=="object"?C=JSON.stringify(x.details):C=String(x.details||x.entityId||"—"),u+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${c(x.id||String(j+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${c(A.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${c(A.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${c(I)}</div>
          <div style="font-size:10px;color:#64748b;">${c(M)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${c(k)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${c(T)}</td>
        <td style="font-size:11px;color:#334155;">${c(C)}</td>
      </tr>
    `});const w=window.open("","_blank","width=1100,height=850");if(!w){$(t("يرجى السماح بالنوافذ المنبثقة للطباعة.","Please allow popups to print report."),!0);return}const v=`
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
          ${o?`<img src="${c(o)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${c(r)}</h1>
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
          <div class="kpi-val" style="color:#dc2626;">${b}</div>
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
          ${u}
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
  `;w.document.open(),w.document.write(v),w.document.close(),_("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:n.length}})}).catch(()=>{})}async function Wn(){try{$(t("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const e=await _("/api/audit?limit=1000");e&&e.logs&&(s.data.auditLogs=e.logs,s.auditFullHistoryLoaded=!0,renderView(),$(t(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){$(e.message||t("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function ne(e){const n=D();return e==="profile"||e==="security"?!0:e==="company"?n||S("manage_settings"):e==="roles"?n||S("manage_roles"):e==="accounts"?n||S("manage_users")||S("manage_existing_account_permissions")||S("view_user_activity"):e==="trash"?n||S("manage_trash"):e==="audit"?n||S("view_audit_logs"):e==="analytics"?n||S("manage_settings")||S("view_audit_logs"):e==="diagnostics"?n||S("manage_settings"):!1}function os(){const e=s.data?.user?.id,n=D(),a=ne("company"),r=ne("roles"),o=ne("accounts"),i=ne("trash"),l=ne("audit"),d=ne("analytics"),p=ne("diagnostics"),m=[["profile",t("الملف الشخصي","Profile")],...a?[["company",f("company")]]:[],...r?[["roles",f("roles")]]:[],...o?[["accounts",f("accounts")]]:[],["security",t("الأمان","Security")],...i?[["trash",t("سلة المهملات","Trash")]]:[],...l?[["audit",f("audit")]]:[],...d?[["analytics",t("المراقبة والزيارات والأداء 📈","Observability & Analytics 📈")]]:[],...p?[["diagnostics",t("تشخيص الأعطال والمستخدمين 🛠️","Error Logs & User Diagnostics 🛠️")]]:[]];m.some(([u])=>u===s.settingsSection)||(s.settingsSection=m[0]?.[0]||"profile");const g=s.data?.user||{};let y="";if(s.settingsSection==="profile"&&(y=`
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
              ${g.avatarUrl?`<img src="${c(g.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(g.avatarColor||"")?g.avatarColor:"#0d6269"};">${c(st(g))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(g.avatarColor||"")?g.avatarColor:"#0d6269"};">${c(st(g))}</div>`}
              <div class="avatar-upload-overlay">
                ${h("upload",18)}
                <span>${t("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${c(t(g.name,g.nameEn||g.name))}</h3>
            <p class="profile-user-role">${c(t(g.jobTitleAr||"",g.jobTitleEn||g.jobTitleAr||""))} · <span class="status-badge done">${c(ee(g))}</span></p>
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
              <label>${f("nameAr")}</label>
              <input name="name" value="${c(g.name||"")}" required />
            </div>
            <div class="field">
              <label>${f("nameEn")}</label>
              <input name="nameEn" value="${c(g.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${f("jobTitle")} (${t("عربي","AR")})</label>
              <input name="jobTitleAr" value="${c(g.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${f("jobTitle")} (${t("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${c(g.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${f("email")}</label>
              <input value="${c(g.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${t("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${je()==="gregorian"?"selected":""}>${t("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${je()==="hijri"?"selected":""}>${t("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${t("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${f("save")}</button>
          </div>
        </form>
      </section>
    `),s.settingsSection==="company"&&(n||S("manage_settings"))){const u=s.data?.company||{};y=`
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
              ${u.logoUrl?`<img src="${c(u.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${h("building",24)}</span>`:`<span class="brand-mark">${h("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${h("upload",16)}
                <span>${t("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${c(u.name||"DARC Design Team")}</strong>
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
              <label>${f("nameAr")}</label>
              <input name="nameAr" value="${c(u.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${f("nameEn")}</label>
              <input name="nameEn" value="${c(u.nameEn||"")}" />
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
        <div class="login-demo" style="margin-top:16px;">${h("info",16)}<span>${f("emailInfo")}</span></div>
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
    `}if(s.settingsSection==="security"&&(y=`
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
    `),s.settingsSection==="accounts"&&o){const u=D()||S("view_user_activity"),w=D()||S("manage_users"),v=D()||S("manage_existing_account_permissions")||S("manage_users"),x=D();let j=s.data?.users||[];e!=="usr_ahmad"&&(j=j.filter(E=>E.id!=="usr_ahmad")),y=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${f("accounts")}</h2>
            <p>${t("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${w?`<button class="btn btn-primary btn-sm" data-action="new-user">${h("plus",14)} ${f("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${f("team")}</th>
                <th>${f("role")}</th>
                <th>${f("email")}</th>
                <th>${f("accountStatus")}</th>
                ${u?`<th>${t("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${v?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${j.map(E=>{const I=E.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${U(E)}
                        <div class="team-member-copy">
                          <strong>${c(t(E.name,E.nameEn||E.name))}</strong>
                          <span>${c(t(E.jobTitleAr||(I?"المبرمج / مدير النظام":""),E.jobTitleEn||E.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${I?`<span class="stealth-dev-badge">${h("shield",12)} ${t("مدير ومطور النظام","Super Admin & Dev")}</span>`:c(ee(E))}
                    </td>
                    <td>${E.email?c(E.email):`<span style="color:var(--muted)">${f("noEmail")}</span>`}</td>
                    <td>
                      <span class="status-badge ${E.status==="active"?"done":"not_started"}">${E.status==="active"?f("activeAccount"):f("pendingAccount")}</span>
                    </td>
                    ${u?`
                      <td>
                        ${Un(E)}
                      </td>
                    `:""}
                    ${v?`
                      <td>
                        <div class="role-actions">
                          ${I?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(E.id)}">${f("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${c(E.id)}">${f("edit")}</button>
                            ${E.id!==s.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${c(E.id)}" title="${E.status==="pending"?t("تفعيل الحساب يدوياً","Activate manually"):t("تغيير كلمة المرور","Change password")}">${h(E.status==="pending"?"check":"settings",13)}</button>
                              ${x?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${c(E.id)}" title="دخول كـ هذا الحساب">${h("user",13)}</button>`:""}
                            `:""}
                            ${E.id!==s.data?.user?.id&&E.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${c(E.id)}">${h("send",13)}</button>`:""}
                            ${E.id!==s.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${c(E.id)}">${h("trash",13)}</button>`:""}
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
    `}if(s.settingsSection==="roles"&&(n||S("manage_roles"))&&(y=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${f("roles")}</h2>
            <p>${t("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${n||S("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${h("plus",14)} ${f("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(s.data?.roles||[]).map(u=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${c(t(u.nameAr,u.nameEn))}</strong>
                  ${u.builtIn?`<span class="role-system-badge">${h("shield",11)} ${f("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${c(t(u.descriptionAr,u.descriptionEn))}</p>
                <div class="role-meta">${u.permissions.includes("*")?t("صلاحية كاملة","Full access"):`${u.permissions.length} ${f("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${c(u.id)}">${h("edit",13)} ${f("edit")}</button>
                ${u.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${c(u.id)}">${h("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),s.settingsSection==="trash"&&i){if(!s.trash&&typeof sessionStorage<"u")try{const A=sessionStorage.getItem("darc_trash_cache");A&&(s.trash=JSON.parse(A))}catch{}!s.trashLoaded&&!s._trashFetching&&(s._trashFetching=!0,_("/api/trash").then(A=>{s.trash=Array.isArray(A)?A:A.trash||[...(A.projects||[]).map(k=>({...k,type:"project"})),...(A.tasks||[]).map(k=>({...k,type:"task"})),...(A.documents||[]).map(k=>({...k,type:"document"}))],s.trashLoaded=!0,s._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(A=>{s._trashFetching=!1,console.error("[Trash fetch error]",A)}));const u=s.trash||[],w=s.trashFilter||"all",v=(s.trashQuery||"").trim().toLowerCase(),x=u.filter(A=>{if(w!=="all"&&A.type!==w)return!1;if(!v)return!0;const k=(t(A.nameAr||A.titleAr,A.nameEn||A.titleEn)||A.name||A.title||A.originalName||"").toLowerCase(),T=(A.code||A.projectCode||"").toLowerCase(),C=(A.projectNameAr||A.projectNameEn||"").toLowerCase();return k.includes(v)||T.includes(v)||C.includes(v)}),j=u.filter(A=>A.type==="project").length,E=u.filter(A=>A.type==="task").length,I=u.filter(A=>A.type==="document").length,M=u.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${h("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${t("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${t("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar" style="gap:12px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm ${w==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${t("الكل","All")} <span class="badge ${w==="all"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${u.length}</span>
          </button>
          <button class="btn btn-sm ${w==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${h("building",12)} ${t("المشاريع","Projects")} <span class="badge ${w==="project"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${j}</span>
          </button>
          <button class="btn btn-sm ${w==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${h("checklist",12)} ${t("المهام","Tasks")} <span class="badge ${w==="task"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${E}</span>
          </button>
          <button class="btn btn-sm ${w==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${h("document",12)} ${t("المستندات","Documents")} <span class="badge ${w==="document"?"badge-on-primary":"badge-neutral"}" style="margin-inline-start:4px;font-size:10px;">${I}</span>
          </button>
        </div>
        <div class="search-box search-sm" style="min-width:220px;max-width:320px;flex:1;">
          ${h("search",14)}
          <input type="search" placeholder="${t("بحث في المحذوفات...","Search deleted items...")}" value="${c(s.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${x.length?`
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
              ${x.map(A=>{const k=A.type==="project",T=A.type==="task",C=A.type==="document",L=t(A.nameAr||A.titleAr,A.nameEn||A.titleEn)||A.name||A.title||A.originalName||A.code||t("عنصر محذوف","Deleted item"),z=!k&&A.projectId?(s.data?.projects||[]).find(X=>X.id===A.projectId):null,F=A.projectNameAr||A.projectNameEn||(z?t(z.nameAr,z.nameEn||z.nameAr):null),N=A.projectCode||z?.code,R=C&&A.size?A.size>1048576?(A.size/1048576).toFixed(1)+" MB":Math.round(A.size/1024)+" KB":"",J=n||S("manage_trash")||A.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${k?"is-project":T?"is-task":"is-doc"}">
                          ${h(k?"building":T?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${c(L)}</strong>
                          ${A.code||k?`<span class="trash-item-code">${c(A.code||A.id)}</span>`:""}
                          ${C&&R?`<span class="trash-item-code" style="color:var(--muted);">${R}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${k?"type-project":T?"type-task":"type-doc"}">
                        ${h(k?"building":T?"checklist":"document",11)}
                        ${k?t("مشروع","Project"):T?t("مهمة","Task"):t("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${k?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${t("مشروع رئيسي","Primary Project")}</span>`:F?`${h("building",11)} <span>${c(F)}${N?` (${c(N)})`:""}</span>${C&&A.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${c(A.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${A.status?`<span class="status-badge ${c(A.status)}">${c(B(A.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${c(A.deletedAt||"")}">
                        ${dateLabel(A.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${s.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${c(A.type)}" data-id="${c(A.id)}" title="${t("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${h(s.lang==="ar"?"arrow":"arrowLeft",12)} ${t("استعادة","Restore")}
                        </button>
                        ${J?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${c(A.type)}" data-id="${c(A.id)}" title="${t("حذف العنصر نهائياً","Permanently delete item")}">
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
    `:!s.trashLoaded&&!u.length?`
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
    `;y=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!s.trashLoaded&&!u.length?t("جاري التحميل...","Loading..."):`${u.length} ${t("عناصر","items")}`}
              </span>
            </div>
            <p>${t("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(n||S("manage_trash"))&&u.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${t("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${h("trash",13)} ${t("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${M}
      </section>
    `}if(s.settingsSection==="audit"&&(n||S("view_audit_logs"))){const u=[...s.data?.auditLogs||[]].sort((k,T)=>new Date(T.createdAt).getTime()-new Date(k.createdAt).getTime()),w=s.auditFilterAction||"all",v=s.auditFilterEntity||"all",x=s.auditFilterUser||"all",j=(s.auditSearchQuery||"").trim().toLowerCase(),E=u.filter(k=>{if(w!=="all"&&k.action!==w||v!=="all"&&(k.entityType||k.entity_type)!==v||x!=="all"&&(k.userId||k.user_id||k.user?.id)!==x)return!1;if(j){const T=k.user||(k.userId?(s.data?.users||[]).find(X=>X.id===k.userId):null),C=(T&&t(T.name,T.nameEn||T.name)||"").toLowerCase(),{actionLabel:L,entityLabel:z}=Pt(k),F=(L||k.action||"").toLowerCase(),N=(z||k.entityType||"").toLowerCase(),R=(k.id||k.entityId||"").toLowerCase(),J=typeof k.details=="object"?JSON.stringify(k.details).toLowerCase():String(k.details||"").toLowerCase();if(!(C.includes(j)||F.includes(j)||N.includes(j)||R.includes(j)||J.includes(j)))return!1}return!0});s._lastFilteredAuditLogs=E;const I=[["all",t("كافة العمليات","All Actions")],["create",t("إنشاء جديد","Create")],["update",t("تعديل بيانات","Update")],["status_change",t("تغيير حالة","Status Change")],["delete",t("نقل للمهملات","Delete / Trash")],["restore",t("استعادة","Restore")],["purge",t("حذف نهائي","Purge")],["export_report",t("تصدير تقرير","Export Report")],["login",t("تسجيل دخول","Sign In")],["invite",t("دعوة مستخدم","Invite")]],M=[["all",t("كافة العناصر","All Entities")],["project",t("المشاريع","Projects")],["task",t("المهام","Tasks")],["document",t("المستندات","Documents")],["user",t("المستخدمين","Users")],["role",t("الأدوار والصلاحيات","Roles")],["company",t("إعدادات الشركة","Company Settings")],["report",t("التقارير","Reports")]],A=w!=="all"||v!=="all"||x!=="all"||!!j;y=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${f("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${E.length} ${t("عملية معروضة","events shown")}
              </span>
              ${A?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${t("من أصل","out of")} ${u.length}
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
              ${I.map(([k,T])=>`<option value="${k}" ${w===k?"selected":""}>${T}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${M.map(([k,T])=>`<option value="${k}" ${v===k?"selected":""}>${T}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${t("كافة المستخدمين","All Users")}</option>
              ${(s.data?.users||[]).map(k=>`<option value="${k.id}" ${x===k.id?"selected":""}>${c(t(k.name,k.nameEn||k.name))}</option>`).join("")}
            </select>
            ${A?`
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
                ${E.map(k=>{const T=k.user||(k.userId?(s.data?.users||[]).find(X=>X.id===k.userId):null),C=T?t(T.name,T.nameEn||T.name):t("النظام","System"),L=T?ee(T):t("تلقائي","Automated"),z=Pa(k.createdAt),{badgeClass:F,actionLabel:N,entityLabel:R,detailHtml:J}=Pt(k);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${U(T)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${c(C)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${c(L)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${F}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${c(N)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${c(R)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${J}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${s.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${c(z.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${h("clock",11)}
                          <span>${c(z.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${h(A?"search":"checklist",24)}
            <span>${A?t("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):t("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${A?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${t("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}s.settingsSection==="analytics"&&d&&(y=Fn()),s.settingsSection==="diagnostics"&&p&&(y=Bn());const b=n||S("manage_settings")||S("manage_roles")||S("manage_users")||S("manage_trash")||S("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${b?t("تحكم مركزي","CENTRAL CONTROL"):t("الملف الشخصي","USER PROFILE")}</p>
        <h1>${b?f("settings"):t("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${b?t("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):t("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${h(n?"shield":"user",13)} ${c(ee(g))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${m.map(([u,w])=>`<button class="${s.settingsSection===u?"active":""}" data-action="settings-section" data-section="${u}">${w}</button>`).join("")}
      </aside>
      <div class="settings-content">${y}</div>
    </div>
  `}var Jn=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function ds(e=null){const n=s.data?.permissionsCatalog&&s.data.permissionsCatalog.length>=10?s.data.permissionsCatalog:Jn,a=new Map;n.forEach(p=>{const m=p.category||"general",g=t(p.categoryAr||m,p.categoryEn||m);a.has(m)||a.set(m,{name:g,items:[]}),a.get(m).items.push(p)});const r=e?.id==="admin"||e?.permissions&&e.permissions.includes("*"),o=Array.from(a.entries()).map(([p,m])=>{const g=m.items.map(y=>{const b=y.id||y.key,u=t(y.nameAr||y.ar,y.nameEn||y.en||b),w=r||e?.permissions&&(e.permissions.includes(b)||typeof PERMISSION_ALIASES<"u"&&PERMISSION_ALIASES[b]&&e.permissions.includes(PERMISSION_ALIASES[b])),v=r?"disabled":"";return`
        <label class="permission-option" style="cursor:${r?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${c(b)}" ${w?"checked":""} ${v} />
          <span style="font-weight:500;">${c(u)}</span>
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
    `}).join(""),i=r?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${f("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${n.length} ${t("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${t("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${t("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,l=`
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
      ${r?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${t("مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.","The system administrator always keeps full root privileges [*] across all aspects of the system.")}
        </div>
      `:`
        ${i}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${o}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button>
        <button type="submit" class="btn btn-primary">${h("check",14)} ${f(e?"save":"create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ue(e?t("تعديل الدور والصلاحيات","Edit role & permissions"):f("addRole"),t("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),l,"role","modal-lg");const d=document.getElementById("modal-root");if(d){const p=d.querySelector("#btn-perm-select-all"),m=d.querySelector("#btn-perm-deselect-all");p&&p.addEventListener("click",()=>{d.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(g=>g.checked=!0)}),m&&m.addEventListener("click",()=>{d.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(g=>g.checked=!1)})}}function ls(e=null){if(e?.id==="usr_ahmad"&&s.data?.user?.id!=="usr_ahmad")return $(t("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!e&&!D())return $(f("adminOnly"),!0);const n=!D(),a=n?"disabled":"",r=(s.data?.roles||[]).filter(i=>D()||i.id!=="admin"),o=`<form id="user-form" data-user-id="${c(e?.id||"")}" data-permission-only="${n}"><div class="form-grid"><div class="field full"><label>${f("nameAr")}</label><input name="name" value="${c(e?.name||"")}" ${a} required /></div><div class="field"><label>${f("nameEn")}</label><input name="nameEn" value="${c(e?.nameEn||"")}" ${a} /></div><div class="field"><label>${f("jobTitle")}</label><input name="jobTitleAr" value="${c(e?.jobTitleAr||"")}" ${a} /></div><div class="field"><label>${f("email")}</label><input name="email" type="email" value="${c(e?.email||"")}" placeholder="name@darc.com" ${a} /></div><div class="field"><label>${f("role")}</label><select name="roleId">${r.map(i=>`<option value="${c(i.id)}" ${e?.roleId===i.id?"selected":""}>${c(t(i.nameAr,i.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${n?t("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):t("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${f("cancel")}</button><button type="submit" class="btn btn-primary">${h("check",14)} ${e?n?t("حفظ الصلاحية","Save permission"):f("save"):f("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=ue(e?n?t("تعديل صلاحية الحساب","Change account permission"):t("تعديل حساب العضو","Edit member account"):f("addMember"),t("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),o,"user")}var cs=re({showNotifications:()=>ps});function ps(){const e=s.data?.notifications||[],n=`${e.filter(a=>!a.read&&!a.readAt).length>0?`
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 10px;">
        ${h("check",13)} ${t("تحديد الكل كمقروء","Mark all as read")}
      </button>
    </div>
  `:""}${e.length?`<div class="attention-list">${e.slice(0,20).map(a=>{const r=a.type==="overdue"||a.type==="escalation"?"red":a.type==="due_soon"||a.type==="document_review"?"amber":"blue",o=!!(a.readAt||a.read),i=a.type==="overdue"?t("مهمة متأخرة","Overdue Task"):a.type==="escalation"?t("تصعيد مهمة","Task Escalation"):a.type==="due_soon"?t("موعد تسليم قريب","Due Soon"):a.type==="document_review"?t("مراجعة مستند","Document Review"):a.type==="assignment"?t("إسناد مهمة جديدة","Task Assigned"):t("تنبيه مساحة العمل","Workspace Notification"),l=t(a.titleAr||a.titleEn||i,a.titleEn||a.titleAr||i),d=t(a.messageAr||a.bodyAr||a.content||"",a.messageEn||a.bodyEn||a.content||""),p=d&&d!==l?`${d} · `:"",m=a.type==="overdue"||a.type==="escalation"?"alert":a.type==="document_review"?"document":a.type==="assignment"?"user":"bell",g=a.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${h("check",10)} ${t("فتح المهمة","Open Task")}</span>`:a.documentId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${h("document",10)} ${t("معاينة المخطط","View Drawing")}</span>`:a.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${h("project",10)} ${t("المشروع","Project")}</span>`:"";return`<button class="attention-item" data-action="read-notification" data-notification-id="${c(a.id)}" data-task-id="${c(a.taskId||"")}" data-project-id="${c(a.projectId||"")}" data-document-id="${c(a.documentId||"")}" data-type="${c(a.type||"")}" style="border:0;text-align:inherit;width:100%;cursor:pointer;opacity:${o?".65":"1"}"><span class="attention-icon ${r}">${h(m,14)}</span><span class="attention-copy"><strong style="color:var(--${r});display:flex;align-items:center;justify-content:space-between;"><span>${c(l)}</span>${g}</strong><span>${c(p)}${Mt(a.createdAt)}</span></span></button>`}).join("")}</div>`:`<div class="empty">${h("bell",18)}<span>${f("noAttention")}</span></div>`}`;document.getElementById("modal-root").innerHTML=ue(f("notifications"),t("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),n,"notifications")}var us=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),ia=us?"⌘K":"Ctrl+K",fe=0,ie=[];function Vn(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.body.style.overflow="hidden";const n=t(`ابحث في المشاريع، المهام، والأعضاء... (${ia})`,`Search projects, tasks, team... (${ia})`),a=`
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
          ${Qa("")}
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
  `;document.body.insertAdjacentHTML("beforeend",a);const r=document.getElementById("omnisearch-modal");r&&r.addEventListener("click",i=>{i.target===r&&Le()});const o=document.getElementById("omnisearch-input");o&&(o.focus(),o.addEventListener("input",i=>{fe=0;const l=document.getElementById("omnisearch-results-container");l&&(l.innerHTML=Qa(i.target.value))}),o.addEventListener("keydown",ms))}function Le(){const e=document.getElementById("omnisearch-modal");e&&e.remove(),document.querySelector(".modal-backdrop")||(document.body.style.overflow="")}function ms(e){e.key==="ArrowDown"?(e.preventDefault(),ie.length>0&&(fe=(fe+1)%ie.length,Za())):e.key==="ArrowUp"?(e.preventDefault(),ie.length>0&&(fe=(fe-1+ie.length)%ie.length,Za())):e.key==="Enter"?(e.preventDefault(),ie[fe]&&Gn(ie[fe])):e.key==="Escape"&&Le()}function Za(){document.querySelectorAll(".omni-item").forEach((e,n)=>{e.classList.toggle("selected",n===fe),n===fe&&e.scrollIntoView({block:"nearest"})})}function Gn(e){if(Le(),e.type==="action")if(e.id==="new-task"){const n=(s.data?.projects||[]).find(a=>a.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0];_t(null,null,e.targetProjectId||n?.id)}else e.id==="new-project"?Ia():e.id==="cheatsheet"&&Ca();else if(e.type==="project")s.projectTab="tasks",s.lastActiveProjectId=e.id,de("project-detail",e.id);else if(e.type==="task"){const n=s.data?.tasks?.find(a=>a.id===e.id);n&&_t(n)}else if(e.type==="user"){const n=s.data?.users?.find(a=>a.id===e.id);n&&typeof window.openUserModal=="function"&&window.openUserModal(n)}}function Qa(e){const n=e.trim().toLowerCase(),a=[],r=(s.data?.projects||[]).find(d=>d.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0],o=r?t(r.nameAr,r.nameEn):"",i=[];if((S("create_tasks")||D())&&i.push({type:"action",id:"new-task",targetProjectId:r?.id,title:t("إضافة مهمة جديدة","Create new task"),sub:r?t(`في مشروع: ${o}`,`In project: ${o}`):t("إجراء سريع","Quick action"),icon:"plus",keywords:"new task مهمة إضافة عمل جديد"}),(S("create_projects")||D())&&i.push({type:"action",id:"new-project",title:t("إنشاء مشروع جديد","Create new project"),sub:t("إجراء سريع","Quick action"),icon:"building",keywords:"new project مشروع إنشاء جديد"}),i.push({type:"action",id:"cheatsheet",title:t("عرض دليل اختصارات لوحة المفاتيح","View keyboard shortcuts guide"),sub:t("مساعدة","Help"),icon:"sparkles",keywords:"shortcuts اختصارات كيبورد مساعدة"}),i.forEach(d=>{(!n||d.keywords.includes(n)||d.title.toLowerCase().includes(n))&&a.push(d)}),(S("view_projects")||D())&&(s.data?.projects||[]).forEach(d=>{(!n||`${d.nameAr} ${d.nameEn} ${d.code} ${d.clientAr} ${d.clientEn}`.toLowerCase().includes(n))&&a.push({type:"project",id:d.id,title:t(d.nameAr,d.nameEn),sub:`${d.code} · ${t(d.clientAr,d.clientEn)||""}`,badge:`${d.progress}%`,icon:"building"})}),H("tasks")&&(s.data?.tasks||[]).forEach(d=>{(!n||`${d.titleAr} ${d.titleEn} ${d.categoryAr} ${d.categoryEn}`.toLowerCase().includes(n))&&a.push({type:"task",id:d.id,title:t(d.titleAr,d.titleEn),sub:d.dueDate?`📅 ${Mt(d.dueDate)}`:t(d.categoryAr,d.categoryEn)||"",badge:`${d.progress}%`,icon:"checklist"})}),(D()||S("manage_users"))&&(s.data?.users||[]).forEach(d=>{(!n||`${d.name} ${d.nameEn} ${d.email} ${d.jobTitleAr}`.toLowerCase().includes(n))&&a.push({type:"user",id:d.id,title:t(d.name,d.nameEn||d.name),sub:d.email||"",badge:ee(d),icon:"user"})}),ie=a.slice(0,15),!ie.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${h("search",24)}</span>
        <strong style="color:var(--ink);">${t("لا توجد نتائج مطابقة","No matching results")}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${t("جرب البحث بكلمات أخرى أو رمز المشروع.","Try different keywords or project code.")}</p>
      </div>
    `;let l="";return ie.map((d,p)=>{let m="";const g=d.type==="action"?t("إجراءات سريعة","Quick Actions"):d.type==="project"?t("المشاريع","Projects"):d.type==="task"?t("المهام والمخرجات","Tasks & Deliverables"):t("فريق العمل","Team");return g!==l&&(l=g,m=`<div class="omni-group-title">${g}</div>`),`
      ${m}
      <div class="omni-item ${p===fe?"selected":""}" data-omni-index="${p}" onclick="window.__selectOmniItem(${p})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${h(d.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${c(d.title)}</strong>
            ${d.sub?`<span style="font-size:11px;color:var(--muted);">${c(d.sub)}</span>`:""}
          </div>
        </div>
        ${d.badge?`<span class="omni-badge">${c(d.badge)}</span>`:""}
      </div>
    `}).join("")}window.__selectOmniItem=e=>{ie[e]&&Gn(ie[e])};function Ca(){Le();const e=`
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${t("استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:","Use these shortcuts to navigate the workspace at full speed without a mouse:")}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${t("البحث الشامل والأوامر السريعة","Omnisearch & Quick Commands")}</span>
          <kbd class="shortcut-kbd">${ia}</kbd>
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
  `;document.getElementById("modal-root").innerHTML=ue(t("دليل اختصارات لوحة المفاتيح","Keyboard Shortcuts Guide"),t("طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية","Work faster with productivity hotkeys"),e,"cheatsheet")}function fs(){window.addEventListener("keydown",e=>{const n=document.activeElement,a=n&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT"||n.isContentEditable),r=e.code==="KeyK"||e.key?.toLowerCase()==="k"||e.key==="ن";if((e.metaKey||e.ctrlKey)&&r){e.preventDefault(),document.getElementById("omnisearch-modal")?Le():Vn();return}if((e.key==="?"||e.key==="؟"||e.code==="Slash"&&e.shiftKey)&&!a){e.preventDefault(),Ca();return}if((e.code==="KeyN"||e.key?.toLowerCase()==="n"||e.key==="ى")&&!a&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();const o=s.view==="project-detail"&&s.activeProjectId?s.activeProjectId:s.data?.projects?.[0]?.id;_t(null,null,o);return}if((e.code==="KeyP"||e.key?.toLowerCase()==="p"||e.key==="ح")&&!a&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault(),Ia();return}if(e.key==="Escape"&&document.getElementById("omnisearch-modal")){e.preventDefault(),Le();return}})}var gs=re({getOrCreateFloatingUploadWidget:()=>Yn,handleChange:()=>hs,handleClick:()=>ys,handleInput:()=>bs,handleSubmit:()=>vs,init:()=>ws,updateFloatingUploadWidget:()=>Be,uploadDirectFiles:()=>Kn,uploadTaskFiles:()=>La});async function vs(e){const n=e.target;if(!["project-form","task-form","user-form","role-form","activation-form","task-comment-form","template-form","force-password-form"].includes(n.id)&&!n.dataset.action)return;e.preventDefault();const a=Object.fromEntries(new FormData(n).entries()),r=n.querySelector('button[type="submit"]');r&&(r.disabled=!0,r.classList.add("is-loading"));try{if(n.id==="activation-form"){if(a.password!==a.passwordConfirm)throw new Error(t("كلمتا المرور غير متطابقتين.","Passwords do not match."));if(delete a.passwordConfirm,await _("/api/auth/activate",{method:"POST",body:JSON.stringify(a)}),window.history.replaceState({},"",window.location.pathname),await pe(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}return}if(n.id==="project-form"){a.startDate||(a.startDate=null),a.dueDate||(a.dueDate=null),a.managerId||(a.managerId=null);let o=[];try{a.memberIds&&(o=JSON.parse(a.memberIds))}catch{}a.managerId&&!o.includes(a.managerId)&&o.push(a.managerId),a.memberIds=o;const i=!!n.dataset.projectId,l=await _(i?`/api/projects/${n.dataset.projectId}`:"/api/projects",{method:i?"PATCH":"POST",body:JSON.stringify(a)});if(l.project)if(s.data.projects||(s.data.projects=[]),i){const d=s.data.projects.findIndex(p=>p.id===l.project.id);d!==-1&&(s.data.projects[d]={...s.data.projects[d],...l.project})}else s.data.projects.unshift(l.project);Y(),P(),$(t("تم حفظ المشروع.","Project saved."));return}if(n.id==="task-form"){const o=n.dataset.taskId;a.remindAt,delete a.remindAt,a.templateId=a.templateId||null,a.typeAr=a.typeAr||(a.templateId?"مخطط":null),a.typeEn=a.typeEn||(a.templateId?"Drawing":null),a.startDate||(a.startDate=null),a.dueDate||(a.dueDate=null),a.assigneeId||(a.assigneeId=null),a.reviewerId||(a.reviewerId=null);let i=[];try{i=JSON.parse(a.additionalAssignees||"[]")}catch{i=[...n.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(y=>y.value)}let l=[];try{l=JSON.parse(a.externalAssignees||"[]")}catch{const y=String(a.externalAssignees||"").trim();l=y?y.split(/[,،]+/).map(b=>b.trim()).filter(Boolean):[]}let d=[];try{d=JSON.parse(a.remindersJson||"[]")}catch{d=[]}delete a.additionalAssignees,delete a.externalAssignees,delete a.remindersJson,delete a.dependencies,delete a.weight,delete a.progress,a.customFields={additional_assignees:i,external_assignees:l,reminders:d},a.projectId||(a.projectId=s.activeProjectId||s.data.projects?.[0]?.id);const p=!!o;if(p){const g=(s.data?.tasks||[]).find(y=>y.id===o);g?.updatedAt&&(a.expectedUpdatedAt=g.updatedAt)}let m;try{m=await _(p?`/api/tasks/${o}`:"/api/tasks",{method:p?"PATCH":"POST",body:JSON.stringify(a)})}catch(g){if(g.message&&g.message.includes("تعارض")){await Z(!0),$(g.message,!0);return}throw g}if(m.task){if(s.data.tasks||(s.data.tasks=[]),p){const g=s.data.tasks.findIndex(y=>y.id===m.task.id);g!==-1&&(s.data.tasks[g]={...s.data.tasks[g],...m.task})}else s.data.tasks.unshift(m.task),s.view==="tasks"&&(s.taskProjectFilter!=="all"&&s.taskProjectFilter!==m.task.projectId&&(s.taskProjectFilter=m.task.projectId),s.taskFilter==="mine"&&m.task.assigneeId!==s.data.user?.id&&(s.taskFilter="all"));if(Array.isArray(d)&&d.length>0){for(const g of d)if(!g.id||g.id.startsWith("rem_temp_")){const y=g.remindAt?new Date(g.remindAt):null;if(!y||isNaN(y.getTime()))continue;_("/api/reminders",{method:"POST",body:JSON.stringify({taskId:m.task.id,remindAt:y.toISOString(),noteAr:g.noteAr||a.titleAr||"تذكير لمتابعة المهمة"})}).catch(b=>console.warn("[Reminder dispatch note]",b))}}}Y(),P(),$(t("تم حفظ المهمة بنجاح.","Task saved successfully."));return}if(n.id==="task-comment-form"){const o=n.dataset.taskId,i=await _(`/api/tasks/${o}/comments`,{method:"POST",body:JSON.stringify(a)});n.reset(),i.comment&&(s.data.comments||(s.data.comments=[]),s.data.comments.push(i.comment));const l=s.data.tasks.find(p=>p.id===o),d=document.getElementById("task-comments-list");d&&(d.innerHTML=renderTaskComments(l),d.scrollTop=d.scrollHeight),r&&(r.disabled=!1);return}if(n.id==="force-password-form"){if(!D()&&!S("manage_users"))throw new Error(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."));const o=n.dataset.userId,i=n.dataset.isPending==="true";await _(`/api/users/${o}/force-password`,{method:"POST",body:JSON.stringify(a)});const l=s.data.users.find(d=>d.id===o);l&&(l.status="active"),Y(),P(),$(i?t("تم تفعيل الحساب بنجاح.","Account activated successfully."):t("تم تغيير كلمة المرور وطرد المستخدم بنجاح.","Password changed and user kicked successfully.")),r&&(r.disabled=!1);return}if(n.id==="user-form"){const o=n.dataset.userId,i=!!o;if(!i&&!D()&&!S("manage_users"))throw new Error(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."));if(i&&!D()&&!S("manage_users")&&!S("manage_existing_account_permissions"))throw new Error(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."));const l=await _(i?`/api/users/${o}`:"/api/users",{method:i?"PATCH":"POST",body:JSON.stringify(a)});if(l.user)if(s.data.users||(s.data.users=[]),i){const d=s.data.users.findIndex(p=>p.id===l.user.id);d!==-1&&(s.data.users[d]={...s.data.users[d],...l.user})}else s.data.users.unshift(l.user);Y(),P(),$(t("تم حفظ حساب العضو.","Member account saved."));return}if(n.id==="role-form"){if(!D()&&!S("manage_roles"))throw new Error(t("غير مصرح لك بإدارة وتعديل الأدوار.","Permission denied to manage roles."));const o=n.dataset.roleId,i=[...n.querySelectorAll('input[name="permissions"]:checked')].map(p=>p.value),l=!!o,d=await _(l?`/api/roles/${o}`:"/api/roles",{method:l?"PATCH":"POST",body:JSON.stringify({...a,permissions:i})});if(d.role)if(s.data.roles||(s.data.roles=[]),l){const p=s.data.roles.findIndex(m=>m.id===d.role.id);p!==-1&&(s.data.roles[p]={...s.data.roles[p],...d.role})}else s.data.roles.push(d.role);Y(),P(),$(t("تم حفظ الدور بنجاح.","Role saved."));return}if(n.id==="template-form"){const o=n.dataset.templateId,i=!!o,l=await _(i?`/api/templates/${o}`:"/api/templates",{method:i?"PATCH":"POST",body:JSON.stringify(a)});if(l.template)if(s.data.templates||(s.data.templates=[]),i){const d=s.data.templates.findIndex(p=>p.id===l.template.id);d!==-1&&(s.data.templates[d]={...s.data.templates[d],...l.template})}else s.data.templates.push(l.template);Y(),P(),$(t("تم حفظ القالب بنجاح.","Template saved."));return}if(n.dataset.action==="update-profile"){if(a.calendarSystem){s.calendarSystem=a.calendarSystem;try{localStorage.setItem("darc_calendar_system",a.calendarSystem)}catch{}}const o=await _("/api/users/me",{method:"PATCH",body:JSON.stringify(a)});if(o.user){s.data.user={...s.data.user,...o.user};const i=(s.data.users||[]).findIndex(l=>l.id===s.data.user.id);i!==-1&&(s.data.users[i]={...s.data.users[i],...o.user})}P(),$(t("تم حفظ وتحديث الملف الشخصي بنجاح.","Profile updated successfully.")),r&&(r.disabled=!1);return}if(n.dataset.action==="update-company"){if(!D()&&!S("manage_settings"))throw new Error(t("غير مصرح لك بتحديث إعدادات الشركة.","Permission denied to update company settings."));const o=await _("/api/company",{method:"PATCH",body:JSON.stringify(a)});o.company&&(s.data.company={...s.data.company,...o.company}),P(),$(t("تم تحديث بيانات الشركة.","Company data updated.")),r&&(r.disabled=!1);return}if(n.dataset.action==="change-password"){if(a.newPassword.length<10)throw new Error(t("كلمة المرور يجب أن تكون 10 أحرف على الأقل.","Password must be at least 10 characters."));await _("/api/auth/change-password",{method:"POST",body:JSON.stringify(a)}),n.reset(),$(t("تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.","Password changed successfully. Signed out of other devices.")),r&&(r.disabled=!1);return}}catch(o){n.id==="activation-form"?ft(a.token,o.message):$(o.message,!0)}finally{r&&(r.disabled=!1,r.classList.remove("is-loading"))}}async function ys(e){const n=document.getElementById("mention-dropdown"),a=document.getElementById("project-menu");if(n&&!e.target.closest("#mention-dropdown")&&!e.target.closest('input[name="content"]')&&(n.style.display="none"),a&&!e.target.closest("#project-menu")&&!e.target.closest('[data-action="toggle-project-menu"]')&&(a.style.display="none"),e.target.classList.contains("modal-backdrop")){Y();return}if(e.target.closest("#task-dropzone")&&e.target.id!=="task-upload-input"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const l=document.getElementById("task-upload-input");l&&l.click()}return}const r=e.target.closest("[data-action], [data-view]");if(!r)return;const o=r.dataset.action;if(r.classList.contains("menu-item")){const i=r.closest(".dropdown-menu");i&&(i.style.display="none")}if(r.dataset.view){de(r.dataset.view,r.dataset.projectId||void 0);return}if(o==="trigger-avatar-upload"){const i=document.getElementById("user-avatar-file-input");i&&i.click();return}if(o==="trigger-company-logo-upload"){if(!D()&&!S("manage_settings")){$(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0);return}const i=document.getElementById("company-logo-file-input");i&&i.click();return}if(o==="toggle-theme"){s.theme=s.theme==="dark"?"light":"dark",it({theme:s.theme}),document.documentElement.dataset.theme=s.theme,document.querySelectorAll('[data-action="toggle-theme"]').forEach(i=>{i.textContent=s.theme==="dark"?"☀️":"🌙"});return}if(o==="toggle-lang"){if(s.lang=s.lang==="ar"?"en":"ar",it({lang:s.lang}),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",document.body.classList.toggle("is-ltr",s.lang==="en"),s.data?.user||typeof localStorage<"u"&&localStorage.getItem("darc_token"))Q();else{const i=new URLSearchParams(window.location.hash.replace(/^#/,""));i.get("activate")?ft(i.get("activate")):i.get("reset")?Ve(i.get("reset")):te("",document.getElementById("forgot-form")?"forgot":"login")}return}if(o==="quick-fill-login"){const i=r.closest('[data-action="quick-fill-login"]'),l=document.getElementById("login-email"),d=document.getElementById("login-password"),p=i?.dataset?.email||"demo@darc-design.bond",m=i?.dataset?.pass||"demo123456";if(l&&(l.value=p,l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),d&&(d.value=m,d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),i?.dataset?.autosubmit==="true"){const g=document.getElementById("login-form");g&&(typeof g.requestSubmit=="function"?g.requestSubmit():g.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0})))}return}if(o==="goto-forgot"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#forgot"),te("","forgot");return}if(o==="goto-login"){e.preventDefault(),typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#login"),te();return}if(o==="reset-demo-sandbox"){try{$(t("جاري إعادة ضبط بيانات العرض التجريبي...","Resetting demo sandbox..."),!1);const i=await _("/api/demo/reset",{method:"POST"});i&&i.data&&(s.data=i.data,me(i.data),Q(),$(t("تمت إعادة ضبط البيانات بنجاح ✨","Demo data reset successfully ✨"),!1))}catch(i){$(i.message,!0)}return}if(o==="toggle-sidebar"){s.sidebarOpen=!s.sidebarOpen,document.querySelector(".sidebar")?.classList.toggle("open",s.sidebarOpen);return}if(o==="logout"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout"),await _("/api/auth/logout",{method:"POST"}).catch(()=>{});try{await Va()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_queue")}catch{}}Je(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),te();return}if(o==="logout-all"){typeof localStorage<"u"&&localStorage.removeItem("darc_token"),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("logout_all"),await _("/api/auth/logout-all",{method:"POST"}).catch(()=>{});try{await Va()}catch{try{localStorage.removeItem("darc_offline_bootstrap"),localStorage.removeItem("darc_offline_queue")}catch{}}Je(),s.data=null,s.view="login",typeof history<"u"&&history.replaceState?history.replaceState(null,"","#login"):typeof window<"u"&&(window.location.hash="#login"),te();return}if(o==="open-omnisearch"){Vn();return}if(o==="close-omnisearch"){Le();return}if(o==="open-cheatsheet"){Ca();return}if(o==="close-modal"){Y();return}if(o==="show-notifications"){showNotifications();return}if(o==="read-notification"){const i=r.dataset.notificationId||r.closest("[data-notification-id]")?.dataset.notificationId,l=(s.data?.notifications||[]).find(y=>y.id===i);l&&(l.read=!0,l.readAt=new Date().toISOString()),Q(),i&&_(`/api/notifications/${i}`,{method:"PATCH",body:JSON.stringify({})}).catch(y=>{console.warn("[Notifications] Failed to patch read status in background:",y)}),Y(!0);const d=r.dataset.taskId||l?.taskId,p=r.dataset.documentId||l?.documentId,m=r.dataset.projectId||l?.projectId,g=r.dataset.type||l?.type;if(p){Qt(p);return}if(d){let y=(s.data?.tasks||[]).find(b=>b.id===d);if(y){y.projectId&&(s.activeProjectId=y.projectId),openTaskModal(y);return}try{const b=await _(`/api/tasks/${d}`);if(b&&b.id){s.data.tasks||(s.data.tasks=[]),s.data.tasks.push(b),b.projectId&&(s.activeProjectId=b.projectId),openTaskModal(b);return}}catch(b){console.warn("[Notifications] Failed to fetch task on demand:",b)}}if(g==="document_review"&&m){s.activeProjectId=m,s.projectTab="documents",de("project-detail",m);return}if(m){s.activeProjectId=m,de("project-detail",m);return}await Z();return}if(o==="mark-all-notifications-read"){try{await _("/api/notifications/read-all",{method:"POST"}),(s.data?.notifications||[]).forEach(i=>{i.read=!0,i.readAt=new Date().toISOString()}),showNotifications(),Q(),$(t("تم تحديد كافة التنبيهات كمقروءة.","All notifications marked as read."))}catch(i){$(i.message,!0)}return}if(o==="toggle-project-menu"){a&&(a.style.display=a.style.display==="none"?"block":"none");return}if(o==="preview-doc"){const i=r.dataset.docId||r.closest("[data-doc-id]")?.dataset.docId;i&&Qt(i);return}if(o==="copy-doc-link"){const i=r.dataset.docId||r.closest("[data-doc-id]")?.dataset.docId,l=s.data?.documents?.find(d=>d.id===i);if(l){let d=l.viewLink||l.downloadLink||(l.driveFileId?`https://drive.google.com/file/d/${l.driveFileId}/view`:"");if((!d||d.startsWith("file://")||d.startsWith("/"))&&(d=`${window.location.origin}/api/documents/${l.id}`),d)try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(d);else{const p=document.createElement("textarea");p.value=d,document.body.appendChild(p),p.select(),document.execCommand("copy"),p.remove()}$(t("تم نسخ رابط الملف إلى الحافظة بنجاح.","Document link copied to clipboard."))}catch{window.prompt(t("انسخ رابط الملف من هنا:","Copy document link:"),d)}else $(t("لا يوجد رابط متاح لهذا الملف.","No link available for this document."),!0)}return}if(o==="trigger-upload"){const i=document.getElementById("upload-progress-container");if(!i||i.style.display==="none"){const l=document.getElementById("task-upload-input");l&&l.click()}return}if(o==="open-upload-drawing-modal"){typeof openUploadDrawingModal=="function"?openUploadDrawingModal(r.dataset.projectId||null):typeof window.openUploadDrawingModal=="function"&&window.openUploadDrawingModal(r.dataset.projectId||null);return}if(o==="new-project"){openProjectModal();return}if(o==="edit-project"){const i=s.data.projects.find(l=>l.id===r.dataset.projectId);i&&openProjectModal(i);return}if(o==="clone-project"){const i=s.data.projects.find(l=>l.id===r.dataset.projectId);i&&openCloneModal(i);return}if(o==="rename-doc"){const i=r.dataset.docId,l=s.data?.documents?.find(p=>p.id===i);if(!l)return;const d=window.prompt(t("أدخل الاسم الجديد:","Enter new name:"),l.originalName);if(!d||d===l.originalName)return;try{await _(`/api/documents/${i}`,{method:"PATCH",body:JSON.stringify({originalName:d})}),l.originalName=d,await Z(!0);const p=s.data?.tasks?.find(m=>m.id===l.taskId);if(p){const m=document.getElementById("task-documents-list");m&&(m.innerHTML=Ce(p))}}catch(p){$(p.message,!0)}return}if(o==="go-to-trash"){s.settingsSection="trash",s.trashLoaded=!1,de("settings");return}if(o==="delete-doc"){if(!window.confirm(t("هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.","Are you sure you want to move this document to trash? You can restore it within 30 days.")))return;const i=r.dataset.docId,l=s.data?.documents?.find(d=>d.id===i)?.taskId;try{if(await _(`/api/documents/${i}`,{method:"DELETE"}),s.data?.documents&&(s.data.documents=s.data.documents.filter(d=>d.id!==i)),s.trashLoaded=!1,await Z(!0),$(t("تم نقل المستند إلى سلة المهملات بنجاح.","Document moved to trash successfully.")),l){const d=s.data?.tasks?.find(p=>p.id===l);if(d){const p=document.getElementById("task-documents-list");p&&(p.innerHTML=Ce(d))}}}catch(d){$(d.message,!0)}return}if(o==="delete-project"){if(!window.confirm(t("هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.","Are you sure you want to delete this project? It will be archived.")))return;const i=[...s.data.projects||[]];s.data.projects=s.data.projects.filter(l=>l.id!==r.dataset.projectId),Y(),de("projects"),$(t("جاري حذف المشروع...","Deleting project..."));try{await _(`/api/projects/${r.dataset.projectId}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await Z(!0),$(t("تم حذف المشروع بنجاح.","Project deleted successfully."))}catch(l){s.data.projects=i,P(),$(l.message,!0)}return}if(o==="delete-task"){if(!window.confirm(t("هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.","Are you sure you want to delete this task? It will be moved to trash.")))return;const i=r.dataset.taskId,l=[...s.data.tasks||[]];s.data.tasks=s.data.tasks.filter(d=>d.id!==i),Y(),P(),$(t("جاري حذف المهمة...","Deleting task..."));try{await _(`/api/tasks/${i}`,{method:"DELETE"}),s.trashLoaded=!1,typeof navigator<"u"&&navigator.onLine&&await Z(!0),$(t("تم حذف المهمة بنجاح.","Task deleted successfully."))}catch(d){s.data.tasks=l,P(),$(d.message,!0)}return}if(o==="edit-task-comment"){const i=r.dataset.commentId,l=r.dataset.taskId,d=(s.data.comments||[]).find(g=>g.id===i);if(!d)return;const p=window.prompt(t("تعديل التعليق:","Edit comment:"),d.content);if(p===null)return;const m=p.trim();if(!m){$(t("لا يمكن ترك التعليق فارغاً.","Comment cannot be empty."),!0);return}if(m===d.content)return;try{const g=await _(`/api/tasks/${l}/comments/${i}`,{method:"PATCH",body:JSON.stringify({content:m})});if(g.comment){const y=(s.data.comments||[]).findIndex(w=>w.id===i);y!==-1&&(s.data.comments[y]=g.comment);const b=(s.data.tasks||[]).find(w=>w.id===l),u=document.getElementById("task-comments-list");u&&b&&(u.innerHTML=renderTaskComments(b)),$(t("تم تعديل التعليق بنجاح.","Comment updated successfully."))}}catch(g){$(g.message,!0)}return}if(o==="delete-task-comment"){const i=r.dataset.commentId,l=r.dataset.taskId;if(!window.confirm(t("هل أنت متأكد من حذف هذا التعليق؟","Are you sure you want to delete this comment?")))return;try{await _(`/api/tasks/${l}/comments/${i}`,{method:"DELETE"}),s.data.comments&&(s.data.comments=s.data.comments.filter(m=>m.id!==i));const d=(s.data.tasks||[]).find(m=>m.id===l),p=document.getElementById("task-comments-list");p&&d&&(p.innerHTML=renderTaskComments(d)),$(t("تم حذف التعليق بنجاح.","Comment deleted successfully."))}catch(d){$(d.message,!0)}return}if(o==="manual-sync"){if(typeof navigator<"u"&&!navigator.onLine){$(t("أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡","You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡"),!1);return}const i=pt();if(!i.length){$(t("جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️","All data is completely synchronized with cloud server ✔️"),!1);return}$(t(`جاري مزامنة ${i.length} عمليات معلقة مع السيرفر...`,`Syncing ${i.length} pending actions with server...`),!1);const l=await ma(_);if(l.synced>0){if($(t(`تمت مزامنة ${l.synced} عمليات بنجاح! 🚀`,`Successfully synced ${l.synced} actions! 🚀`),!1),await pe(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}}else l.failed>0&&$(t(`فشلت مزامنة ${l.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${l.failed} actions, please try again.`),!0);return}if(o==="new-task"){openTaskModal(null,null,r.dataset.projectId);return}if(o==="new-user"){if(!D()&&!S("manage_users")){$(t("غير مصرح لك بإضافة مستخدمين جدد.","Permission denied to create new users."),!0);return}openUserModal();return}if(o==="new-role"){if(!D()&&!S("manage_roles")){$(t("غير مصرح لك بإنشاء أدوار جديدة.","Permission denied to create new roles."),!0);return}openRoleModal();return}if(o==="new-template"){openTemplateModal();return}if(o==="edit-template"){const i=s.data.templates.find(l=>l.id===r.dataset.templateId);i&&openTemplateModal(i);return}if(o==="delete-template"){if(!window.confirm(t("هل أنت متأكد من حذف هذا القالب؟","Are you sure you want to delete this template?")))return;const i=[...s.data.templates||[]];s.data.templates=s.data.templates.filter(l=>l.id!==r.dataset.templateId),P(),Y();try{await _(`/api/templates/${r.dataset.templateId}`,{method:"DELETE"}),await Z(!0),$(t("تم حذف القالب.","Template deleted."))}catch(l){s.data.templates=i,P(),$(l.message,!0)}return}if(o==="open-project"){s.projectTab="tasks",s.projectMemberFilter=null,de("project-detail",r.dataset.projectId);return}if(o==="filter-by-member"){const i=r.dataset.memberId;s.projectMemberFilter=s.projectMemberFilter===i?null:i,s.projectTab="tasks",requestAnimationFrame(()=>P());return}if(o==="clear-member-filter"){s.projectMemberFilter=null,requestAnimationFrame(()=>P());return}if(o==="back-to-projects"){s.projectMemberFilter=null,de("projects",null);return}if(o==="project-tab"){s.projectTab=r.dataset.tab;try{if(typeof window<"u"&&s.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(s.activeProjectId)}&tab=${encodeURIComponent(s.projectTab)}`),typeof sessionStorage<"u"){const l=sessionStorage.getItem("darc_last_route"),d=l?JSON.parse(l):{};d.view="project-detail",d.activeProjectId=s.activeProjectId,d.projectTab=s.projectTab,sessionStorage.setItem("darc_last_route",JSON.stringify(d))}}catch{}r.closest(".detail-tabs")?.querySelectorAll(".detail-tab").forEach(l=>l.classList.toggle("active",l===r));const i=document.getElementById("main-content");i&&(i.scrollTop=0),requestAnimationFrame(()=>P());return}if(o==="toggle-timeline-view"){s.timelineView=r.dataset.viewMode||"gantt",requestAnimationFrame(()=>P());return}if(o==="prev-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()-1),s.calendarDate=i,requestAnimationFrame(()=>P());return}if(o==="next-calendar-month"){const i=s.calendarDate?new Date(s.calendarDate):new Date;i.setMonth(i.getMonth()+1),s.calendarDate=i,requestAnimationFrame(()=>P());return}if(o==="today-calendar-month"){s.calendarDate=new Date,requestAnimationFrame(()=>P());return}if(o==="open-task"){if(window._justDroppedAt&&Date.now()-window._justDroppedAt<250)return;const i=r.dataset.taskId||r.closest("[data-task-id]")?.dataset.taskId;if(!i)return;let l=(s.data?.tasks||[]).find(d=>d.id===i);if(l){openTaskModal(l);return}_(`/api/tasks/${i}`).then(d=>{d&&d.id?(s.data.tasks||(s.data.tasks=[]),s.data.tasks.push(d),openTaskModal(d)):$(t("تعذر العثور على المهمة أو تم نقلها لسلة المهملات.","Task not found or was moved to trash."),!0)}).catch(d=>{$(t("تعذر فتح المهمة: "+d.message,"Could not open task: "+d.message),!0)});return}if(o==="task-filter"){s.taskFilter=r.dataset.filter,r.closest(".view-toolbar-start")?.querySelectorAll(".filter-tab").forEach(i=>i.classList.toggle("active",i===r)),requestAnimationFrame(()=>P());return}if(o==="template-category"){s.templateCategory=r.dataset.category,requestAnimationFrame(()=>P());return}if(o==="use-template"){if(!s.data.projects.length)return $(f("noProjects"),!0);openTaskModal(null,r.dataset.templateId,s.activeProjectId);return}if(o==="open-user"){if(!D()&&!S("manage_users")&&!S("manage_existing_account_permissions")){$(t("غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.","Permission denied to edit user accounts or permissions."),!0);return}const i=s.data.users.find(l=>l.id===r.dataset.userId);i&&openUserModal(i);return}if(o==="impersonate-user"){if(!D()){$(t("هذه الصلاحية خاصة بمدير النظام فقط.","Impersonation is restricted to system admin only."),!0);return}if(!window.confirm("هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً."))return;try{const i=await _(`/api/users/${r.dataset.userId}/impersonate`,{method:"POST"});i&&i.token&&typeof localStorage<"u"&&localStorage.setItem("darc_token",i.token),window.location.reload()}catch(i){$(i.message,!0)}return}if(o==="force-password-user"){if(!D()&&!S("manage_users")){$(t("غير مصرح لك بتعيين كلمة مرور للمستخدمين.","Permission denied to set user password."),!0);return}const i=s.data.users.find(l=>l.id===r.dataset.userId);i&&openForcePasswordModal(i);return}if(o==="invite-user"){if(!D()&&!S("manage_users")){$(t("غير مصرح لك بإرسال دعوات للمستخدمين.","Permission denied to invite users."),!0);return}try{const i=await _(`/api/users/${r.dataset.userId}/invite`,{method:"POST"});await Z(),$(i.emailConfigured?t("تم إرسال الدعوة.","Invitation sent."):t("تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.","Invite prepared, but the email provider is not configured."))}catch(i){$(i.message,!0)}return}if(o==="deactivate-user"){if(!D()&&!S("manage_users")){$(t("غير مصرح لك بتعطيل حسابات المستخدمين.","Permission denied to deactivate users."),!0);return}if(!window.confirm(f("confirmDeactivate")))return;const i=r.dataset.userId,l=s.data.users.find(p=>p.id===i),d=l?l.status:null;l&&(l.status="inactive"),P(),Y();try{await _(`/api/users/${i}`,{method:"DELETE"}),await Z(!0),$(t("تم تعطيل الحساب.","Account deactivated."))}catch(p){l&&(l.status=d),P(),$(p.message,!0)}return}if(o==="settings-section"){const i=r.dataset.section||"profile";if(!ne(i)){$(t("غير مصرح لك بالوصول لهذا القسم من الإعدادات.","Access denied to this settings section."),!0);return}s.settingsSection=i;try{if(typeof window<"u"&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof sessionStorage<"u"){const l=sessionStorage.getItem("darc_last_route"),d=l?JSON.parse(l):{};d.view="settings",d.settingsSection=s.settingsSection,sessionStorage.setItem("darc_last_route",JSON.stringify(d))}}catch{}r.closest(".settings-nav")?.querySelectorAll(".settings-nav-item").forEach(l=>l.classList.toggle("active",l===r)),s.settingsSection==="analytics"&&wt(!0).then(()=>P()).catch(()=>{}),s.settingsSection==="trash"&&!s.trashLoaded&&_("/api/trash").then(l=>{s.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(d=>({...d,type:"project"})),...(l.tasks||[]).map(d=>({...d,type:"task"})),...(l.documents||[]).map(d=>({...d,type:"document"}))],s.trashLoaded=!0;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}P()}).catch(l=>console.error(l)),requestAnimationFrame(()=>P());return}if(o==="refresh-analytics"){if(!ne("analytics")){$(t("غير مصرح لك بعرض وتحديث التحليلات والمراقبة.","Permission denied to view and refresh analytics."),!0);return}try{await wt(!0),P(),$(t("تم تحديث مؤشرات التحليلات والمراقبة الحية بنجاح.","Live observability and analytics refreshed successfully."))}catch(i){$(i.message,!0)}return}if(o==="test-anomaly-alert"){if(!D()&&!S("manage_settings")){$(t("غير مصرح لك بإجراء محاكاة التنبيهات.","Permission denied to simulate anomaly alert."),!0);return}try{await _("/api/telemetry/test-anomaly",{method:"POST"}),await wt(!0),await pe(!0),Q(),$(t("🚨 تم رصد استهلاك زائد بنجاح وإرسال إشعار فوري لمركز التنبيهات!","🚨 Anomaly detected! Alert notification dispatched to Notification Center!"))}catch(i){$(i.message,!0)}return}if(o==="goto-diagnostics"){if(!D()&&!S("manage_settings")){$(t("غير مصرح لك بالوصول لتشخيص الأعطال.","Permission denied to access diagnostics."),!0);return}s.settingsSection="diagnostics",typeof history<"u"&&history.replaceState&&history.replaceState(null,"","#settings?section=diagnostics"),P();return}if(o==="refresh-diagnostics"){if(!D()&&!S("manage_settings")){$(t("غير مصرح لك بتحديث سجل الأعطال.","Permission denied to refresh diagnostics."),!0);return}try{await $t(!0),P(),$(t("تم تحديث سجل الأخطاء وتشخيصات المستخدمين بنجاح.","Diagnostics and incidents refreshed successfully."))}catch(i){$(i.message,!0)}return}if(o==="test-incident-simulate"){if(!D()&&!S("manage_settings")){$(t("غير مصرح لك بإجراء محاكاة للأعطال.","Permission denied to simulate error incidents."),!0);return}try{await _("/api/telemetry/test-error",{method:"POST"}),await $t(!0),await pe(!0),P(),$(t("🚨 تم رصد الخطأ وتوثيق خطوات المستخدم وإرسال بريد تنبيه للإدارة بنجاح!","🚨 Incident recorded with stack trace and alert email sent to admin!"))}catch(i){$(i.message,!0)}return}if(o==="test-diagnostic-email"){if(!D()&&!S("manage_settings")){$(t("غير مصرح لك باختبار إرسال البريد.","Permission denied to test alert email."),!0);return}try{await _("/api/telemetry/test-email",{method:"POST"}),$(t("✉️ تم إرسال رسالة اختبار التنبيهات البريدية للإدارة بنجاح!","✉️ Test alert email dispatched to admin successfully!"))}catch(i){$(i.message,!0)}return}if(o==="filter-diagnostics-user"){const i=r.dataset.userId||"all";Xa(i),P();return}if(o==="clear-diagnostics-user-filter"){Xa("all"),P();return}if(o==="resolve-diagnostic-incident"){if(!D()&&!S("manage_settings")){$(t("غير مصرح لك بمعالجة بلاغات الأعطال.","Permission denied to resolve incidents."),!0);return}const i=r.dataset.incidentId;if(i)try{await _(`/api/telemetry/incidents/${i}/resolve`,{method:"PATCH"}),await $t(!0),P(),$(t("تم تحديد المشكلة كمعالجة بنجاح ✅","Incident marked as resolved ✅"))}catch(l){$(l.message,!0)}return}if(o==="copy-debug-bundle"){const i=r.dataset.bundle;i&&typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>{$(t("تم نسخ تقرير المشكلة الفني بالكامل للحافظة 📋","Full debug bundle copied to clipboard 📋"))}).catch(()=>{$(t("فشل النسخ التلقائي للحافظة","Failed to copy to clipboard"),!0)});return}if(o==="restore-item"){if(!D()&&!S("manage_trash")){$(t("غير مصرح لك باستعادة العناصر المحذوفة.","Permission denied to restore deleted items."),!0);return}try{await _(`/api/restore/${r.dataset.type}/${r.dataset.id}`,{method:"POST"});const i=await _("/api/trash");s.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(l=>({...l,type:"project"})),...(i.tasks||[]).map(l=>({...l,type:"task"})),...(i.documents||[]).map(l=>({...l,type:"document"}))];try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash))}catch{}await Z(),$(t("تمت الاستعادة بنجاح.","Restored successfully."))}catch(i){$(i.message,!0)}return}if(o==="filter-trash"){if(!D()&&!S("manage_trash"))return;s.trashFilter=r.dataset.filter,requestAnimationFrame(()=>P());return}if(o==="purge-trash-item"){if(!D()&&!S("manage_trash")){$(t("غير مصرح لك بحذف العناصر نهائياً من سلة المهملات.","Permission denied to permanently delete trash items."),!0);return}const i=r.dataset.type,l=r.dataset.id;if(!window.confirm(t("هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.","Are you sure you want to permanently delete this item? This action cannot be undone.")))return;try{await _(`/api/trash/${i}/${l}`,{method:"DELETE"});const d=await _("/api/trash");s.trash=Array.isArray(d)?d:d.trash||[...(d.projects||[]).map(p=>({...p,type:"project"})),...(d.tasks||[]).map(p=>({...p,type:"task"})),...(d.documents||[]).map(p=>({...p,type:"document"}))],P(),$(t("تم حذف العنصر نهائياً بنجاح.","Item permanently deleted."))}catch(d){$(d.message,!0)}return}if(o==="empty-trash"){if(!D()&&!S("manage_trash")){$(t("غير مصرح لك بإفراغ سلة المهملات.","Permission denied to empty trash."),!0);return}if(!window.confirm(t("هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.","Are you sure you want to empty the entire recycle bin? All items will be permanently erased.")))return;try{await _("/api/trash/empty",{method:"DELETE"}),s.trash=[],P(),$(t("تم إفراغ سلة المهملات بالكامل بنجاح.","Trash bin emptied successfully."))}catch(i){$(i.message,!0)}return}if(o==="open-role"){if(!D()&&!S("manage_roles")){$(t("غير مصرح لك بتعديل الأدوار والصلاحيات.","Permission denied to modify roles."),!0);return}const i=s.data.roles.find(l=>l.id===r.dataset.roleId);i&&openRoleModal(i);return}if(o==="delete-role"){if(!D()&&!S("manage_roles")){$(t("غير مصرح لك بحذف الأدوار.","Permission denied to delete roles."),!0);return}if(!window.confirm(f("confirmDeleteRole")))return;const i=r.dataset.roleId,l=[...s.data.roles||[]];s.data.roles=s.data.roles.filter(d=>d.id!==i),P(),Y();try{await _(`/api/roles/${i}`,{method:"DELETE"}),await Z(!0),$(t("تم حذف الدور.","Role deleted."))}catch(d){s.data.roles=l,P(),$(d.message,!0)}return}if(o==="export-csv"){if(!S("export_reports")&&!D()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}Rn();return}if(o==="print-portfolio-pdf"){if(!S("export_reports")&&!D()){$(t("ليس لديك صلاحية لطباعة التقارير.","You do not have permission to print reports."),!0);return}Nn();return}if(o==="export-project"){if(!S("export_reports")&&!D()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}On(r.dataset.projectId);return}if(o==="export-project-pdf"){if(!S("export_reports")&&!D()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}ta(r.dataset.projectId,!1);return}if(o==="export-project-client-pdf"){if(!S("export_reports")&&!D()){$(t("ليس لديك صلاحية لتصدير التقارير.","You do not have permission to export reports."),!0);return}ta(r.dataset.projectId,!0);return}if(o==="export-audit-xls"){if(!S("view_audit_logs")&&!D()){$(t("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}qn();return}if(o==="print-audit-pdf"){if(!S("view_audit_logs")&&!D()){$(t("ليس لديك صلاحية لطباعة سجل الرقابة.","You do not have permission to print audit logs."),!0);return}Hn();return}if(o==="load-full-audit"){if(!D()&&!S("view_audit_logs")){$(t("غير مصرح لك باستعراض سجل التدقيق الكامل.","Permission denied to view full audit logs."),!0);return}Wn();return}if(o==="reset-audit-filters"){s.auditFilterAction="all",s.auditFilterEntity="all",s.auditFilterUser="all",s.auditSearchQuery="",P();return}}var Re=null;function bs(e){if(e.target.name==="content"&&e.target.closest("#task-comment-form")){const r=e.target.value,o=r.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),i=document.getElementById("mention-dropdown");if(o){const l=o[1].toLowerCase(),d=(s.data?.users||[]).filter(p=>p.status!=="inactive").filter(p=>`${p.name||""} ${p.nameEn||""} ${p.email||""}`.toLowerCase().includes(l));d.length?(i.innerHTML=d.map(p=>{const m=(p.name||p.nameEn||p.email||"user").trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${c(m)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${U(p,"avatar-sm")}
              <span style="font-size:12px;">${c(t(p.name,p.nameEn||p.name))}</span>
            </div>
          `}).join(""),i.style.display="block",i.querySelectorAll(".mention-option").forEach(p=>{p.onclick=()=>{const m=p.dataset.username;e.target.value=r.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${m} `),i.style.display="none",e.target.focus()}})):i.style.display="none"}else i.style.display="none"}if(e.target.dataset.action==="search-trash-input"){s.trashQuery=e.target.value;const r=e.target.selectionStart;clearTimeout(Re),Re=setTimeout(()=>{P();const o=document.querySelector('[data-action="search-trash-input"]');o&&(o.focus(),o.setSelectionRange(r,r))},120);return}if(e.target.dataset.action==="search-audit-input"){s.auditSearchQuery=e.target.value;const r=e.target.selectionStart;clearTimeout(Re),Re=setTimeout(()=>{P();const o=document.querySelector('[data-action="search-audit-input"]');o&&(o.focus(),o.setSelectionRange(r,r))},120);return}const n=e.target.dataset.search||(e.target.dataset.action==="search-documents"?"documents":null);if(!n)return;s.searches[n]=e.target.value;const a=e.target.selectionStart;clearTimeout(Re),Re=setTimeout(()=>{P();const r=document.querySelector(`[data-search="${n}"], [data-action="search-documents"]`);r&&(r.focus(),r.setSelectionRange(a,a))},120)}async function hs(e){if(e.target.dataset.action==="filter-diagnostics-severity"){as(e.target.value),P();return}if(e.target.dataset.action==="filter-diagnostics-status"){ns(e.target.value),P();return}if(e.target.dataset.action==="change-doc-status"){const n=e.target.dataset.docId,a=e.target.value,r=s.data?.documents?.find(o=>o.id===n);if(!r)return;try{await _(`/api/documents/${n}`,{method:"PATCH",body:JSON.stringify({status:a})}),r.status=a,$(t("تم تحديث حالة المخطط بنجاح ✅","Drawing status updated ✅")),await Z(!0)}catch(o){$(o.message,!0)}return}if(e.target.dataset.action==="doc-project-filter"){s.docProjectFilter=e.target.value,P();return}if(e.target.dataset.action==="filter-project-docs-task"){s.docTaskFilter=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-action"){s.auditFilterAction=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-entity"){s.auditFilterEntity=e.target.value,P();return}if(e.target.dataset.action==="filter-audit-user"){s.auditFilterUser=e.target.value,P();return}if(e.target.dataset.action==="sort-project-tasks"||e.target.dataset.action==="sort-my-tasks"){kn(e.target.value),P();return}if(e.target.name==="templateId"&&e.target.form?.id==="task-form"){const n=e.target.form,a=e.target.value,r=s.data.templates?.find(m=>m.id===a),o=n.querySelector('input[name="titleAr"]'),i=n.querySelector('input[name="titleEn"]'),l=n.querySelector("#task-type-ar"),d=n.querySelector("#task-type-en"),p=n.querySelector('textarea[name="descriptionAr"]');r?(o&&(!o.value||n.dataset.templateSelected==="true")&&(o.value=r.nameAr),i&&(!i.value||n.dataset.templateSelected==="true")&&(i.value=r.nameEn||""),l&&(l.value=r.typeAr||"مخطط"),d&&(d.value=r.typeEn||"Drawing"),p&&(!p.value||n.dataset.templateSelected==="true")&&(p.value=r.descriptionAr||""),n.dataset.templateSelected="true"):(l&&(l.value=""),d&&(d.value=""),delete n.dataset.templateSelected);return}if(e.target.name==="status"&&e.target.form?.id==="task-form"){const n=e.target.form.querySelector("#task-auto-progress-badge");if(n){const a={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];n.textContent=a!==void 0?`(${a}%)`:""}return}if(e.target.dataset.action==="task-project-filter"){s.taskProjectFilter=e.target.value,P();return}if(e.target.dataset.action==="task-priority-filter"){s.taskPriorityFilter=e.target.value,P();return}if(e.target.id==="sort-projects"||e.target.dataset?.action==="sort-projects"){s.projectSort=e.target.value,P();return}if(e.target.id==="task-upload-input"){const n=e.target.files;if(!n.length)return;const a=e.target.dataset.taskId;La(n,a);return}if(e.target.classList.contains("doc-status-select")){const n=e.target.dataset.docId,a=e.target.value;_(`/api/documents/${n}`,{method:"PATCH",body:JSON.stringify({status:a})}).then(()=>{Z(!0).then(()=>$(t("تم تحديث حالة المخطط.","Document status updated.")))}).catch(r=>$(r.message,!0));return}if(e.target.id==="user-avatar-file-input"){const n=e.target.files?.[0];if(!n)return;if(n.size>2621440){$(t("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.","Image is too large. Maximum allowed size is 2MB."),!0),e.target.value="";return}if(!n.type.startsWith("image/")){$(t("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).","Please select a valid image file (JPG, PNG, WebP)."),!0),e.target.value="";return}try{$(t("جاري معالجة ورفع صورتك الشخصية...","Processing & uploading avatar..."));const a=await en(n,256,256),r=await _("/api/users/me",{method:"PATCH",body:JSON.stringify({avatarUrl:a})});if(r.user){s.data.user={...s.data.user,...r.user};const o=(s.data.users||[]).findIndex(i=>i.id===s.data.user.id);o!==-1&&(s.data.users[o]={...s.data.users[o],...r.user})}e.target.value="",Q(),Tt(),$(t("تم تحديث صورتك الشخصية وتثبيتها بنجاح!","Avatar updated successfully!"))}catch(a){e.target.value="",$(a.message,!0)}return}if(e.target.id==="company-logo-file-input"){if(!D()&&!S("manage_settings")){$(t("غير مصرح لك بتغيير شعار الشركة.","Permission denied to change company logo."),!0),e.target.value="";return}const n=e.target.files?.[0];if(!n)return;if(n.size>3145728){$(t("حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.","Logo is too large. Maximum allowed size is 3MB."),!0),e.target.value="";return}if(!n.type.startsWith("image/")){$(t("يرجى اختيار ملف صورة أو شعار صالح.","Please select a valid logo image file."),!0),e.target.value="";return}try{$(t("جاري معالجة ورفع شعار الشركة...","Uploading company logo..."));const a=await en(n,400,400),r=await _("/api/company",{method:"PATCH",body:JSON.stringify({logoUrl:a})});r.company&&(s.data.company={...s.data.company,...r.company}),e.target.value="",Q(),Tt(),$(t("تم تحديث وتثبيت شعار مساحة العمل بنجاح!","Company logo updated successfully!"))}catch(a){e.target.value="",$(a.message,!0)}return}}function en(e,n=300,a=300){return new Promise((r,o)=>{const i=new FileReader;i.onerror=()=>o(new Error(t("فشل قراءة ملف الصورة.","Failed to read image file."))),i.onload=()=>{const l=new Image;l.onerror=()=>o(new Error(t("صيغة الصورة تالفة أو غير صالحة.","Corrupted or invalid image format."))),l.onload=()=>{try{const d=l.naturalWidth||l.width,p=l.naturalHeight||l.height;if(d>4096||p>4096||d*p>16e6){o(new Error(t("أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.","Image dimensions too large (Pixel Flood Blocked). Please select a standard image.")));return}let m=d,g=p;if(m>n||g>a){const v=Math.min(n/m,a/g);m=Math.round(m*v),g=Math.round(g*v)}const y=document.createElement("canvas");y.width=m,y.height=g;const b=y.getContext("2d");b.imageSmoothingEnabled=!0,b.imageSmoothingQuality="high",b.drawImage(l,0,0,m,g);let u="image/webp",w=y.toDataURL(u,.82);w.startsWith("data:image/webp")||(u="image/jpeg",w=y.toDataURL(u,.82)),w.length>184320&&(w=y.toDataURL(u,.65)),r(w)}catch{o(new Error(t("تعذر معالجة وضغط الصورة.","Failed to process and compress image.")))}},l.src=i.result},i.readAsDataURL(e)})}function sa({url:e,chunk:n,contentRange:a,headers:r={},onProgress:o}){return new Promise((i,l)=>{const d=new XMLHttpRequest;if(d.open("PUT",e,!0),e.includes("/api/")){d.withCredentials=!0;const p=typeof localStorage<"u"?localStorage.getItem("darc_token"):null;p&&!r.Authorization&&d.setRequestHeader("Authorization",`Bearer ${p}`)}for(const[p,m]of Object.entries(r))d.setRequestHeader(p,m);a&&d.setRequestHeader("Content-Range",a),d.upload&&o&&(d.upload.onprogress=p=>{p.lengthComputable&&o(p.loaded)}),d.onload=()=>{i({status:d.status,ok:d.status>=200&&d.status<300,headers:{get:p=>d.getResponseHeader(p)},responseText:d.responseText,json:()=>{try{return JSON.parse(d.responseText)}catch{return{}}}})},d.onerror=()=>l(new Error("Network connection error")),d.ontimeout=()=>l(new Error("Upload chunk timeout")),d.timeout=18e4,d.send(n)})}async function xs(e,n){try{const a=await sa({url:e,chunk:new Blob([]),contentRange:`bytes */${n}`});if(a.status===308){const r=a.headers.get("Range");if(r){const o=r.match(/bytes=0-(\d+)/);if(o&&o[1])return parseInt(o[1],10)+1}return 0}if(a.ok)return{completed:!0,data:a.json()}}catch{}return null}var kt=null;function Yn({projectName:e,taskName:n,totalFiles:a}){kt&&(clearTimeout(kt),kt=null);let r=document.getElementById("floating-upload-manager");if(r){r.style.opacity="1",r.style.transform="none";const o=r.querySelector("#fum-proj-text"),i=r.querySelector("#fum-task-text");o&&e&&(o.textContent=e),i&&n&&(i.textContent=n)}else{r=document.createElement("div"),r.id="floating-upload-manager",r.setAttribute("dir",s.lang==="ar"?"rtl":"ltr"),r.style.cssText=`
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
    `,document.body.appendChild(r);const o=r.querySelector("#fum-minimize-btn"),i=r.querySelector("#fum-body");o.addEventListener("click",()=>{const l=i.style.display==="none";i.style.display=l?"flex":"none",o.textContent=l?"—":"+"}),r.querySelector("#fum-close-btn").addEventListener("click",()=>{r.remove()})}return r}function Be({fileName:e,fileIndex:n,totalFiles:a,pct:r,loadedMB:o,fileSizeMB:i,speedMBs:l,etaText:d,statusNote:p,isError:m,isDone:g}){const y=document.getElementById("floating-upload-manager");if(!y)return;const b=y.querySelector("#fum-file-text"),u=y.querySelector("#fum-count-text"),w=y.querySelector("#fum-progress-fill"),v=y.querySelector("#fum-pct-text"),x=y.querySelector("#fum-speed-text"),j=y.querySelector("#fum-eta-text"),E=y.querySelector("#fum-status-badge"),I=y.querySelector("#fum-indicator"),M=y.querySelector("#fum-header-title"),A=y.querySelector("#fum-close-btn");e&&b&&(b.textContent=e),u&&n&&a&&(u.textContent=`(${n}/${a})`),w&&typeof r=="number"&&(w.style.width=`${r}%`),v&&typeof r=="number"&&(v.textContent=`${r}%`),x&&o!==void 0&&i!==void 0&&(x.textContent=`${o} / ${i} MB • ${l||"0.0"} MB/s`),j&&d&&(j.textContent=`${t("متبقي:","ETA:")} ${d}`),p&&E?(E.style.display="block",E.textContent=p,E.style.background=m?"var(--red-soft)":"var(--amber-soft)",E.style.color=m?"var(--red)":"var(--amber)",E.style.border=m?"1px solid var(--red)":"1px solid var(--amber)"):!m&&!g&&E&&(E.style.display="none"),g&&(I&&(I.style.background="var(--mint-strong)",I.style.boxShadow="0 0 10px var(--mint-strong)"),M&&(M.textContent=t("اكتمل الرفع بنجاح! ✓","Upload Complete! ✓")),v&&(v.textContent="100%"),w&&(w.style.width="100%"),A&&(A.style.display="inline-block"),E&&(E.style.display="block",E.style.background="var(--mint)",E.style.color="var(--teal-dark)",E.style.border="1px solid var(--mint-strong)",E.textContent=t("تم التوثيق والرفع إلى الخادم بنجاح.","Document saved & uploaded to server.")),kt=setTimeout(()=>{y&&y.parentNode&&(y.style.opacity="0",y.style.transform="translateY(12px)",setTimeout(()=>y.remove(),300))},4500)),m&&(I&&(I.style.background="var(--red)",I.style.boxShadow="0 0 10px var(--red)"),M&&(M.textContent=t("فشل في الرفع ✕","Upload Failed ✕")),A&&(A.style.display="inline-block"))}async function La(e,n){if(!e||!e.length||!n)return;const a=s.data?.tasks?.find(r=>r.id===n);return Kn({files:e,taskId:n,projectId:a?.projectId,status:"draft",isTaskModal:!0})}async function Kn({files:e,projectId:n=null,taskId:a=null,discipline:r="عام",status:o="draft",isTaskModal:i=!1}){if(!e||!e.length)return;if(typeof navigator<"u"&&!navigator.onLine){$(t("لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.","Cannot upload drawings or files while offline. Please connect to the internet first."),!0);return}const l=a?s.data?.tasks?.find(E=>E.id===a):null,d=n||l?.projectId,p=d?s.data?.projects?.find(E=>E.id===d):null,m=s.data?.documents?s.data.documents.filter(E=>!E.deletedAt&&(a?E.taskId===a:E.projectId===d)):[],g=p?p.nameAr:"Project",y=l?l.titleAr:r||"General",b={},u=E=>{if(b[E])return b[E];let I=0;return m.forEach(M=>{if(M.originalName&&M.originalName.toLowerCase().endsWith(E)){const A=M.originalName.match(/_v(\d+)\./);A&&parseInt(A[1])>I&&(I=parseInt(A[1]))}}),b[E]=I+1,I+1},w=document.getElementById("upload-progress-container");document.getElementById("upload-progress-bar"),document.getElementById("upload-progress-percent"),document.getElementById("upload-progress-text");const v=document.getElementById("task-dropzone");i&&w&&(w.style.display="block"),i&&v&&(v.style.pointerEvents="none"),Yn({projectName:g,taskName:y,totalFiles:e.length});let x=null;const j=E=>(E.preventDefault(),E.returnValue=t("جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.","Uploading large engineering files. Leaving will abort upload."),E.returnValue);if(typeof window<"u"&&(window.addEventListener("beforeunload",j),"wakeLock"in navigator))try{navigator.wakeLock.request("screen").then(E=>{x=E}).catch(()=>{})}catch{}try{for(let E=0;E<e.length;E++){const I=e[E];if(!I.size||I.size===0){$(t(`الملف "${I.name}" فارغ لا يحتوي على بيانات.`,`File "${I.name}" is empty.`),!0);continue}if(I.size>107374182400){$(t(`حجم الملف "${I.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${I.name}" exceeds 100GB limit.`),!0);continue}const M=I.name.split(".").pop()?.toLowerCase()||"";if(["exe","bat","cmd","sh","bash","ps1","vbs","js","mjs","cjs","py","php","phtml","html","htm","jar","msi","dll","com","scr","hta","svg","apk"].includes(M)||I.type==="image/svg+xml"){$(t(`صيغة الملف "${I.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${I.name}" is not permitted for security reasons.`),!0);continue}const A=I.name.lastIndexOf("."),k=A!==-1?I.name.substring(A).toLowerCase():"",T=A!==-1?I.name.substring(0,A):I.name,C=ke=>(ke||"").replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,"-").replace(/\s+/g,"_").trim(),L=`${C(g)||"Project"}_${C(y)||"General"}_${C(T)||"Drawing"}_v${u(k)}${k}`,z=I.size>=1073741824?`${(I.size/1073741824).toFixed(2)} GB`:`${(I.size/1048576).toFixed(1)} MB`;Be({fileName:I.name,fileIndex:E+1,totalFiles:e.length,pct:0,loadedMB:"0.0",fileSizeMB:z,speedMBs:"0.0",etaText:"...",statusNote:t("بدء جلسة الرفع المستأنف...","Starting resumable session...")});const F=(await _("/api/documents/session",{method:"POST",body:JSON.stringify({compiledName:L,mimeType:I.type||"application/octet-stream",projectId:d,taskId:a,size:I.size})})).sessionUrl;let N=8388608;I.size<=10485760?N=I.size:I.size<=104857600?N=8388608:I.size<=524288e3?N=16777216:I.size<=2147483648?N=33554432:N=67108864;const R=Date.now();let J=0;const X=ke=>{const oe=Math.min(I.size,J+ke),Ie=Math.min(100,Math.round(oe/I.size*100)),Se=oe>=1073741824?`${(oe/1073741824).toFixed(2)} GB`:`${(oe/1048576).toFixed(1)} MB`;if(i){const Na=document.getElementById("upload-progress-bar"),Fa=document.getElementById("upload-progress-percent"),Ba=document.getElementById("upload-progress-text"),Ua=document.getElementById("upload-progress-container");Ua&&(Ua.style.display="block"),Na&&(Na.style.width=`${Ie}%`),Fa&&(Fa.textContent=`${Ie}%`);const ri=(Date.now()-R)/1e3,qa=oe/Math.max(ri,.2),oi=(qa/1048576).toFixed(1),di=Math.max(0,I.size-oe),yt=Math.round(di/Math.max(qa,1)),li=yt<60?`${yt} ${t("ثانية","s")}`:`${Math.floor(yt/60)}:${String(yt%60).padStart(2,"0")} ${t("دقيقة","min")}`;Ba&&(Ba.textContent=`${t("رفع إلى الخادم","Uploading to server")} (${E+1}/${e.length}): ${I.name} — ${Se} / ${z} (${Ie}%) • ${oi} MB/s • ${t("متبقي:","ETA:")} ${li}`)}const Me=(Date.now()-R)/1e3,ae=oe/Math.max(Me,.2),q=(ae/1048576).toFixed(1),ye=Math.max(0,I.size-oe),qt=Math.round(ye/Math.max(ae,1)),si=qt<60?`${qt} s`:`${Math.floor(qt/60)}m`;Be({fileName:I.name,fileIndex:E+1,totalFiles:e.length,pct:Ie,loadedMB:Se,fileSizeMB:z,speedMBs:q,etaText:si})};X(0);let V=0,Ye=null,Ut=!1;for(;V<I.size;){const ke=Math.min(V+N,I.size),oe=I.slice(V,ke),Ie=`bytes ${V}-${ke-1}/${I.size}`;let Se=0,Me=!1;for(;!Me&&Se<5;)try{let ae;if(!Ut)try{ae=await sa({url:F,chunk:oe,contentRange:Ie,headers:{},onProgress:q=>X(q)})}catch(q){console.warn("[Upload] Direct GDrive upload failed, trying backend proxy:",q.message),Ut=!0}if(Ut){const q={projectId:d,taskId:a,compiledName:L,mimeType:I.type,size:I.size,status:o};ae=await sa({url:`${Ot}/api/documents/chunk`,chunk:oe,contentRange:Ie,headers:{"x-session-url":F,"x-doc-meta":encodeURIComponent(JSON.stringify(q))},onProgress:ye=>X(ye)})}if(ae.status===308){const q=ae.headers.get("Range");if(q){const ye=q.match(/bytes=0-(\d+)/);ye&&ye[1]?V=parseInt(ye[1],10)+1:V=ke}else V=ke;J=V,X(0),Me=!0}else if(ae.ok){const q=ae.json();Ye=q.id||q.document?.id,J=I.size,X(0),V=I.size,Me=!0;break}else throw new Error(`Upload returned status ${ae.status}`)}catch(ae){if(Se++,Be({fileName:I.name,fileIndex:E+1,totalFiles:e.length,statusNote:`${t("إعادة المحاولة","Retrying")} (${Se}/5)...`}),Se>=5)throw new Error(`${t("فشل الرفع بعد محاولات متعددة","Upload failed after multiple retries")}: ${ae.message}`);await new Promise(ye=>setTimeout(ye,1e3*Math.pow(2,Se-1)));const q=await xs(F,I.size);if(typeof q=="number"&&q>V){V=q,J=V;break}else if(q&&q.completed){Ye=q.data?.id,V=I.size,Me=!0;break}}}Ye&&!Ye.startsWith("doc_")&&await _("/api/documents/finalize",{method:"POST",body:JSON.stringify({driveFileId:Ye,projectId:d,taskId:a,compiledName:L,mimeType:I.type,size:I.size,status:o})})}if(await Z(!0),i&&a){const E=s.data?.tasks?.find(M=>M.id===a),I=document.getElementById("task-documents-list");I&&E&&(I.innerHTML=Ce(E))}Tt(),Be({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),$(t("تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅","Drawing uploaded & registered successfully ✅"))}catch(E){Be({isError:!0,statusNote:E.message}),$(E.message,!0)}finally{if(typeof window<"u"&&window.removeEventListener("beforeunload",j),x){try{x.release()}catch{}x=null}if(i){const E=document.getElementById("upload-progress-container"),I=document.getElementById("upload-progress-bar"),M=document.getElementById("task-dropzone");E&&(E.style.display="none"),I&&(I.style.width="0%"),M&&(M.style.pointerEvents="auto");const A=document.getElementById("task-upload-input");A&&(A.value="")}}}typeof window<"u"&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener("dragover",e=>{const n=e.target.closest("#task-dropzone");n&&(e.preventDefault(),n.style.borderColor="var(--brand-teal)",n.style.background="var(--teal-soft)")}),document.addEventListener("dragleave",e=>{const n=e.target.closest("#task-dropzone");n&&(n.style.borderColor="var(--border)",n.style.background="var(--surface-soft)")}),document.addEventListener("drop",e=>{const n=e.target.closest("#task-dropzone");if(n){e.preventDefault(),n.style.borderColor="var(--border)",n.style.background="var(--surface-soft)";const a=n.dataset.taskId,r=e.dataTransfer?.files;r&&r.length&&La(r,a)}}));async function ws(){it({theme:s.theme,lang:s.lang});try{s.calendarSystem=localStorage.getItem("darc_calendar_system")||s.calendarSystem||"gregorian"}catch{}if(typeof window<"u"&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",i=>{try{if(!localStorage.getItem("darc-theme")){s.theme=i.matches?"dark":"light",document.documentElement.dataset.theme=s.theme;const l=document.querySelector('[data-action="toggle-theme"]');l&&(l.textContent=s.theme==="dark"?"☀️":"🌙")}}catch{}})}catch{}}const e=typeof window<"u"?window.location.hash.replace(/^#/,""):"",n=new URLSearchParams(e.includes("?")?e.split("?")[1]:e.includes("=")?e:""),a=n.get("activate");if(a)return ft(a);const r=n.get("reset");if(r)return Ve(r);if(e==="forgot")return te("","forgot");if(e==="login")return te();try{if(e){const[i,l]=e.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)&&(s.view=i,l)){const d=new URLSearchParams(l);d.get("id")&&(s.activeProjectId=d.get("id")),d.get("tab")&&(s.projectTab=d.get("tab")),d.get("section")&&(s.settingsSection=d.get("section"))}}else if(typeof sessionStorage<"u"){const i=sessionStorage.getItem("darc_last_route");if(i){const l=JSON.parse(i);l.view&&(s.view=l.view),l.activeProjectId&&(s.activeProjectId=l.activeProjectId),l.projectTab&&(s.projectTab=l.projectTab),l.settingsSection&&(s.settingsSection=l.settingsSection)}}}catch{}s.view==="settings"&&!s.settingsSection&&(s.settingsSection="profile");const o=sn();o&&o.user?(s.data=o,H(s.view)||(s.view=we()),Q()):rn();try{if(typeof navigator<"u"&&navigator.onLine&&pt().length>0&&await ma(_),await pe(),s.data?.user?.customFields?.calendarSystem){s.calendarSystem=s.data.user.customFields.calendarSystem;try{localStorage.setItem("darc_calendar_system",s.calendarSystem)}catch{}}if(!window._darcPollingActive){window._darcPollingActive=!0;let i=null,l=0,d=!1,p=Date.now(),m=0;const g=()=>{const u=Date.now()-p>45e3;p=Date.now(),u&&Date.now()-m>4e3&&!d&&b()};if(typeof window<"u"){let u=0;const w=()=>{const v=Date.now();v-u>5e3&&(u=v,g())};window.addEventListener("click",w,{passive:!0}),window.addEventListener("keydown",w,{passive:!0}),window.addEventListener("touchstart",w,{passive:!0}),window.addEventListener("mousemove",w,{passive:!0})}const y=()=>{i&&clearTimeout(i);const u=Date.now()-p>45e3?15e3:4e3,w=l>0?Math.min(25e3,u*Math.pow(2,l)):u;i=setTimeout(b,w)},b=async()=>{if(typeof document<"u"&&document.hidden){y();return}if(!s.data?.user||!s.view||s.view==="login"){y();return}if(d){y();return}d=!0,m=Date.now();try{await pe(!0),l=0}catch{l++}finally{d=!1,y()}};y(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&s.data?.user&&s.view&&s.view!=="login"&&(g(),b())})}}catch{typeof window<"u"&&(window.history&&window.history.replaceState?window.history.replaceState(null,"","#login"):window.location.hash="#login"),te()}}typeof window<"u"&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener("hashchange",()=>{if(window._isInternalNav){window._isInternalNav=!1;return}const e=window.location.hash.replace(/^#/,"");if(!e)return;const[n,a]=e.split("?");if(n==="login"){s.data?.user&&(s.data.user=null),te();return}if(n==="forgot"){te("","forgot");return}const r=new URLSearchParams(a||(e.includes("=")?e:""));if(r.get("activate")){ft(r.get("activate"));return}if(r.get("reset")){Ve(r.get("reset"));return}if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(n)){if(s.data&&!H(n)){de(we());return}let o=s.activeProjectId;if(a){const i=new URLSearchParams(a);if(i.get("id")&&(o=i.get("id")),i.get("tab")&&(s.projectTab=i.get("tab")),i.get("section")){const l=i.get("section");n==="settings"&&s.data&&!ne(l)?(s.settingsSection="profile",typeof window<"u"&&window.history&&window.history.replaceState&&window.history.replaceState(null,"","#settings?section=profile")):s.settingsSection=l}}else n==="settings"&&s.data&&!ne(s.settingsSection)&&(s.settingsSection="profile");s.view!==n||s.activeProjectId!==o?de(n,o):P()}}));if(typeof window<"u"&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener("scroll",n=>{n.target&&n.target.classList&&(n.target.classList.contains("timeline-scroll")||n.target.classList.contains("gantt-scroll")||n.target.classList.contains("timeline-board"))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows=="function"&&drawTimelineArrows(),e=!1})))},!0)}var W=null,se=null;function za(){return W||(W=document.createElement("div"),W.className="drag-placeholder",W.style.cssText=`
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
    `,W.innerHTML=`<span>↓ ${t("الموقع الجديد للمهمة","Drop position")}</span>`),W}function ot(){W&&W.parentNode&&W.parentNode.removeChild(W)}function Bt(e,n){const a=Array.from(e.querySelectorAll(".task-card:not(.is-dragging)"));for(const r of a){const o=r.getBoundingClientRect();if(n<o.top+o.height/2)return r}return null}document.addEventListener("dragstart",e=>{const n=e.target.closest(".task-card");if(n){const a=(s.data?.tasks||[]).find(r=>r.id===n.dataset.taskId);if(!(D()||S("edit_tasks")||a&&a.assigneeId===s.data?.user?.id)){e.preventDefault();return}window._isDraggingTask=!0,se=n.dataset.taskId,e.dataTransfer.effectAllowed="move";try{e.dataTransfer.setData("text/plain",se)}catch{}n.classList.add("is-dragging")}});document.addEventListener("dragend",e=>{const n=e.target.closest(".task-card");n&&n.classList.remove("is-dragging"),window._isDraggingTask=!1,window._justDroppedTaskId=se,window._justDroppedAt=Date.now(),se=null,document.querySelectorAll(".board-column").forEach(a=>a.classList.remove("drag-over")),ot()});document.addEventListener("dragover",e=>{const n=e.target.closest(".board-column");if(n){e.preventDefault(),e.dataTransfer.dropEffect="move",n.classList.add("drag-over");const a=50,r=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");r&&(e.clientX<a?r.scrollLeft-=14:e.clientX>window.innerWidth-a&&(r.scrollLeft+=14));const o=n.querySelector(".board-cards");if(o){const i=za(),l=Bt(o,e.clientY);l?i.nextSibling!==l&&o.insertBefore(i,l):(!o.contains(i)||o.lastElementChild!==i)&&o.appendChild(i)}}});document.addEventListener("dragenter",e=>{e.target.closest(".board-column")&&e.preventDefault()});document.addEventListener("dragleave",e=>{const n=e.target.closest(".board-column");if(n){if(e.relatedTarget&&n.contains(e.relatedTarget))return;const a=n.getBoundingClientRect(),r=e.clientX,o=e.clientY;(r<=a.left||r>=a.right||o<=a.top||o>=a.bottom)&&(n.classList.remove("drag-over"),ot())}});async function Xn(e,n,a=null){if(!e){ot();return}e.classList.remove("drag-over");const r=e.querySelector(".board-cards");let o=null;if(W&&W.parentNode===r){const u=W.nextElementSibling;u&&u.classList.contains("task-card")&&u.dataset.taskId!==(a||se)&&(o=u.dataset.taskId)}else if(r){const u=Bt(r,n);u&&u.dataset.taskId!==(a||se)&&(o=u.dataset.taskId)}ot();const i=a||se;se=null;const l=e.dataset.status;if(!i||!l)return;const d=(s.data?.tasks||[]).find(u=>u.id===i);if(!d)return;if(!(d.status===l||l==="review"&&["review","approval","blocked"].includes(d.status))&&l==="done"&&d.dependencies&&d.dependencies.length&&d.dependencies.filter(u=>{const w=s.data.tasks.find(v=>v.id===u);return w&&w.status!=="done"}).length)return $(t("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);s.projectTaskSort="custom",s.myTaskSort="custom",localStorage.setItem("darc_task_sort_pref","custom");const p=l==="review"?["review","approval","blocked"]:[l];let m=(s.data.tasks||[]).filter(u=>u.projectId===d.projectId&&(p.includes(u.status)||u.id===i));const g=m.findIndex(u=>u.id===i);g!==-1&&m.splice(g,1),m.sort((u,w)=>Pe(u)-Pe(w)),d.status=l;let y=m.length;if(o){let u=m.findIndex(w=>w.id===o);if(u===-1&&W&&W.parentNode){let w=W.nextElementSibling;for(;w;){if(w.classList?.contains("task-card")&&w.dataset.taskId){const v=m.findIndex(x=>x.id===w.dataset.taskId);if(v!==-1){u=v;break}}w=w.nextElementSibling}}u!==-1&&(y=u)}m.splice(y,0,d),m.forEach((u,w)=>{const v=(w+1)*100;u.sortOrder=v,u.sort_order=v,u.customFields={...u.customFields||{},sortOrder:v,sort_order:v},u.custom_fields={...u.custom_fields||{},sortOrder:v,sort_order:v}}),P();const b=document.querySelector(`.task-card[data-task-id="${i}"]`);b&&(b.classList.add("just-dropped"),setTimeout(()=>b.classList.remove("just-dropped"),400)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,m.forEach(u=>{window._pendingReorderBatch.set(u.id,{id:u.id,status:u.status,sortOrder:u.sortOrder,customFields:u.customFields})}),window._reorderSyncTimer=setTimeout(()=>{const u=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),_("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:u})}).catch(w=>{console.warn("Reorder sync error:",w),$(t("فشل حفظ الترتيب الجديد في الخادم.","Failed to save task order to server."),!0)})},150)}document.addEventListener("drop",async e=>{const n=e.target.closest(".board-column");e.preventDefault();const a=se||(e.dataTransfer?e.dataTransfer.getData("text/plain"):null);await Xn(n,e.clientY,a)});var G=null,K=null,Zn=0,Qn=0,ei=0,ti=0,ve=null,dt=!1;function ra(){ve&&(clearTimeout(ve),ve=null),K&&K.parentNode&&K.parentNode.removeChild(K),K=null,G&&(G.style.opacity="",G.style.pointerEvents="",G.classList.remove("is-dragging")),document.querySelectorAll(".board-column").forEach(e=>e.classList.remove("drag-over")),ot(),G=null,dt=!1,se=null}document.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;const n=e.target.closest(".task-card");if(!n||e.target.closest("button, a, input, select, textarea, .btn"))return;const a=(s.data?.tasks||[]).find(o=>o.id===n.dataset.taskId);if(!(D()||S("edit_tasks")||a&&a.assigneeId===s.data?.user?.id))return;G=n;const r=e.touches[0];Zn=r.clientX,Qn=r.clientY,dt=!1,ve=setTimeout(()=>{if(!G)return;if(dt=!0,se=G.dataset.taskId,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(40)}catch{}const o=G.getBoundingClientRect();ei=r.clientX-o.left,ti=r.clientY-o.top,K=G.cloneNode(!0),K.id="touch-drag-ghost",K.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: ${o.width}px;
      pointer-events: none;
      z-index: 10000;
      opacity: 0.95;
      transform: translate3d(${o.left}px, ${o.top}px, 0) scale(1.03) rotate(1.5deg);
      box-shadow: 0 16px 36px rgba(0,0,0,0.25);
      transition: transform 0.05s linear;
      border: 1px solid var(--teal, #0d9488);
      background: var(--surface, #ffffff);
      border-radius: 12px;
    `,document.body.appendChild(K),G.classList.add("is-dragging"),G.style.opacity="0.25",G.style.pointerEvents="none";const i=G.closest(".board-column");if(i){i.classList.add("drag-over");const l=i.querySelector(".board-cards");if(l){const d=za(),p=Bt(l,r.clientY);p&&d.nextSibling!==p?l.insertBefore(d,p):l.contains(d)||l.appendChild(d)}}},220)},{passive:!0});document.addEventListener("touchmove",e=>{if(!G)return;const n=e.touches[0],a=Math.abs(n.clientX-Zn),r=Math.abs(n.clientY-Qn);if(!dt){(a>8||r>8)&&(ve&&(clearTimeout(ve),ve=null),G=null);return}if(e.cancelable&&e.preventDefault(),K){const d=n.clientX-ei,p=n.clientY-ti;K.style.transform=`translate3d(${d}px, ${p}px, 0) scale(1.03) rotate(1.5deg)`}const o=45,i=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");i&&(n.clientX<o?i.scrollLeft-=12:n.clientX>window.innerWidth-o&&(i.scrollLeft+=12));const l=document.elementFromPoint(n.clientX,n.clientY)?.closest(".board-column");if(document.querySelectorAll(".board-column").forEach(d=>d.classList.toggle("drag-over",d===l)),l){const d=l.querySelector(".board-cards");if(d){const p=za(),m=Bt(d,n.clientY);m?p.nextSibling!==m&&d.insertBefore(p,m):(!d.contains(p)||d.lastElementChild!==p)&&d.appendChild(p)}}},{passive:!1});document.addEventListener("touchend",async e=>{if(ve&&(clearTimeout(ve),ve=null),!!G)if(dt){const n=e.changedTouches[0],a=document.elementFromPoint(n.clientX,n.clientY)?.closest(".board-column")||W&&W.closest(".board-column"),r=se;K&&K.parentNode&&K.parentNode.removeChild(K),K=null,a&&r&&await Xn(a,n.clientY,r),ra()}else ra()});document.addEventListener("touchcancel",()=>{ra()});var $s="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",ai=typeof navigator<"u"&&!!navigator.connection?.saveData,ks=3e5,Ss=ai?1e4:3e4,Es=ai?600:300,As=25e3,Ts=150,Vt=null,tn=!1,oa=!1,Oe=null,le=null,St=null,He=null,Gt=null,Ne=null,an=0,nt=0,$e=!1,Ma=Date.now(),da=0,ht=null,ge=new Map;function js(e){if(!e||typeof e!="string")return;const n=Date.now();ge.set(e,n);for(const[a,r]of ge.entries())n-r>8e3&&ge.delete(a);if(ge.size>Ts){const a=ge.keys().next().value;a&&ge.delete(a)}}function lt(){return typeof localStorage>"u"?!1:!!localStorage.getItem("darc_token")}var Ct=new Set(["__proto__","constructor","prototype"]),ni=new Set(["custom_fields","permissions","details"]);function Lt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Lt);const n={};for(const[a,r]of Object.entries(e)){if(Ct.has(a))continue;const o=a.indexOf("_")===-1?a:a.replace(/_([a-z0-9])/g,(i,l)=>l.toUpperCase());Ct.has(o)||(n[o]=r!==null&&typeof r=="object"&&!ni.has(a)?Lt(r):r)}return n}function zt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(zt);const n={};for(const[a,r]of Object.entries(e))Ct.has(a)||(n[a]=r!==null&&typeof r=="object"&&!ni.has(a)?zt(r):r);return n}function tt(e){if(!e||!s.data||!Array.isArray(s.data.tasks)||!Array.isArray(s.data.projects))return;const n=s.data.projects.find(p=>p.id===e);if(!n)return;const a=s.data.tasks.filter(p=>p.projectId===e&&!p.deletedAt&&!p.deleted_at);let r=0,o=0;for(const p of a){const m=Number(p.weight)||1,g=Number(p.progress)||0;r+=m,o+=m*(g/100)}const i=r>0?Math.round(o/r*100):0;n.progress!==i&&(n.progress=i),n.totalWeight=r;const l=a.length>0,d=l&&a.every(p=>p.status==="done"||p.status==="completed");l&&d&&i===100?n.lifecycle="completed":n.lifecycle==="completed"&&(!d||i<100)&&(n.lifecycle="active")}function Yt(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const n=(s.data?.notifications||[]).filter(r=>!r.read&&!r.readAt).length;let a=e.querySelector(".notification-dot");n>0?a||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):a&&a.remove()}function Is(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Oe||Oe.state==="closed")&&(Oe=new e),Oe.state==="suspended"&&Oe.resume().catch(()=>{});const n=Oe,a=n.createOscillator(),r=n.createGain();a.type="sine",a.frequency.setValueAtTime(587.33,n.currentTime),a.frequency.exponentialRampToValueAtTime(880,n.currentTime+.15),r.gain.setValueAtTime(.06,n.currentTime),r.gain.exponentialRampToValueAtTime(.001,n.currentTime+.35),a.connect(r),r.connect(n.destination),a.start(),a.stop(n.currentTime+.36)}catch{}}function Ds(){ht&&cancelAnimationFrame(ht),ht=requestAnimationFrame(()=>{ht=null,typeof P=="function"?P():typeof Q=="function"&&Q()})}function Et(e,n,a,r){if(!s.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const o=a?zt(Lt(a)):null,i=r?zt(Lt(r)):null,l=o&&o.id||i&&i.id;if(!l)return!1;const d=ge.get(l);if(d&&Date.now()-d<5e3)return!0;if(s.data?.user?.role_id!=="admin"&&o){if(e==="notifications"){if(o.userId&&o.userId!==s.data?.user?.id)return!1}else if(e==="tasks"||e==="documents"||e==="comments"){const y=o.projectId||(e==="comments"?s.data?.tasks?.find(b=>b.id===o.taskId)?.projectId:null);if(y&&!s.data?.projects?.some(b=>b.id===y))return!1}}Array.isArray(s.data[e])||(s.data[e]=[]);const p=s.data[e];let m=!1;const g=!!(o?.deletedAt||o?.deleted_at);if(n==="DELETE"||g){const y=p.length;let b=null;e==="tasks"&&(b=p.find(u=>u.id===l)?.projectId||i?.projectId||o?.projectId),s.data[e]=p.filter(u=>u.id!==l),s.data[e].length!==y&&(m=!0),e==="tasks"&&b?tt(b):e==="projects"?Array.isArray(s.data.tasks)&&(s.data.tasks=s.data.tasks.filter(u=>u.projectId!==l)):e==="notifications"&&Yt()}else if(n==="UPDATE"&&o){const y=p.findIndex(b=>b.id===l);if(y!==-1){for(const[b,u]of Object.entries(o))Ct.has(b)||(p[y][b]=u);m=!0}else p.unshift(o),m=!0;e==="tasks"?(o.projectId&&tt(o.projectId),i?.projectId&&i.projectId!==o.projectId&&tt(i.projectId)):e==="notifications"&&Yt()}else if(n==="INSERT"&&o){if(p.some(y=>y.id===l)||(p.unshift(o),m=!0),e==="tasks"&&o.projectId)tt(o.projectId);else if(e==="notifications"){const y=s.data?.user?.id;if(y&&o.userId===y&&!o.read){Yt();const b=o.content||(s.lang==="ar"?o.titleAr||o.title:o.titleEn||o.title||o.titleAr)||t("إشعار جديد","New notification");b&&$(`🔔 ${b}`,!1),Is()}}}if(m){Je();const y=o?.taskId||i?.taskId;if(y){const b=(s.data?.tasks||[]).find(u=>u.id===y);if(b){if(e==="comments"){const u=document.getElementById("task-comment-form");if(u&&u.dataset.taskId===y){const w=document.getElementById("task-comments-list");w&&typeof rt=="function"&&(w.innerHTML=rt(b),w.scrollTop=w.scrollHeight)}}if(e==="documents"){const u=document.getElementById("task-dropzone");if(u&&u.dataset.taskId===y){const w=document.getElementById("task-documents-list");w&&typeof Ce=="function"&&(w.innerHTML=Ce(b))}}}}return Ds(),!0}return!1}function ct(e="realtime"){lt()&&($e&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!s.data||!s.view||(Vt&&clearTimeout(Vt),Vt=setTimeout(async()=>{try{await pe(!0)}catch(n){console.warn("[Realtime] Sync error:",String(e),n.message)}},Es)))}function la(e,n,a,r={}){e&&e.readyState===WebSocket.OPEN&&(an++,e.send(JSON.stringify({topic:n,event:a,payload:r,ref:String(an)})))}function _s(e){Ra(),St=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&la(e,"phoenix","heartbeat")},As)}function Ra(){St&&(clearInterval(St),St=null)}function ii(e="disconnect"){if(oa=!0,Ra(),He&&(clearTimeout(He),He=null),le){try{le.close(1e3,e)}catch{}le=null}}function ca(e="idle"){$e||($e=!0,ii(e))}function pa(e="wake_up"){const n=$e;$e=!1,lt()&&(typeof navigator<"u"&&!navigator.onLine||((!le||le.readyState===WebSocket.CLOSED||le.readyState===WebSocket.CLOSING)&&Oa(),(n||e==="tab_visible")&&ct(e)))}function Oa(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&lt()&&!$e&&!(le&&(le.readyState===WebSocket.CONNECTING||le.readyState===WebSocket.OPEN))){oa=!1;try{const e=new WebSocket($s);le=e,e.onopen=()=>{nt=0,_s(e),la(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(n=>{la(e,`realtime:public:${n}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:n}]}})})},e.onmessage=n=>{try{const{event:a,topic:r,payload:o}=JSON.parse(n.data);if(a==="phx_reply"||a==="phx_close")return;if(a==="postgres_changes"&&o?.data){const{table:i,type:l,record:d,old_record:p}=o.data;if(Et(i,l,d,p))return}if((a==="INSERT"||a==="UPDATE"||a==="DELETE")&&r?.startsWith("realtime:public:")){const i=r.split(":")[2];if(Et(i,a,o?.record||o?.new,o?.old_record||o?.old))return}if(r==="realtime:darc_live"&&(a==="broadcast"||a==="STATE_MUTATION"||a==="GRANULAR_DELTA")){const i=o?.payload||o,l=i?.mutationId||i?.id||i?.entityId;if(l&&ge.has(l))return;if(i?.delta){const{table:d,action:p,record:m,oldRecord:g}=i.delta;if(Et(d,p,m,g))return}ct("edge_broadcast");return}(a==="broadcast"||r==="realtime:darc_live"||typeof r=="string"&&r.startsWith("realtime:public:"))&&ct("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=n=>{if(Ra(),le=null,!(oa||!lt()||$e)&&!(n?.reason==="logout"||n?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){nt++;const a=Math.min(3e4,Math.pow(2,Math.min(nt,5))*1e3);He&&clearTimeout(He),He=setTimeout(()=>{Oa()},a)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function nn(){const e=Date.now();e-da>1e4&&(da=e,Ma=e,$e&&(typeof document>"u"||!document.hidden)&&pa("user_active"))}function Ps(){Gt&&clearInterval(Gt),Gt=setInterval(()=>{const e=Date.now();for(const[n,a]of ge.entries())e-a>8e3&&ge.delete(n);$e||typeof document<"u"&&document.hidden||Date.now()-Ma>=ks&&ca("inactivity_idle")},6e4)}function Cs(){if(!tn){if(tn=!0,lt()&&Oa(),Ps(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,nn,{passive:!0})}),window.addEventListener("mousemove",nn,{passive:!0})),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden?(Ne&&clearTimeout(Ne),Ne=setTimeout(()=>{ca("tab_hidden")},Ss)):(Ne&&(clearTimeout(Ne),Ne=null),Ma=Date.now(),da=Date.now(),pa("tab_visible"))}),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=n=>{if(n.data?.type==="GRANULAR_DELTA"&&n.data.delta){const{table:a,action:r,record:o,oldRecord:i}=n.data.delta;Et(a,r,o,i)}else n.data?.type==="STATE_MUTATION"&&ct("broadcast_channel")},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{s.isOffline=!1,nt=0;const e=window.api,n=typeof window.choose=="function"?window.choose:(r=>r),a=typeof window.showToast=="function"?window.showToast:console.log;if(pa("online"),e){const r=await ma(e);r&&r.synced>0?a(n(`تمت استعادة الاتصال ومزامنة ${r.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${r.synced} pending actions successfully! 🚀`),!1):a(n("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}ct("online")}),window.addEventListener("offline",()=>{if(s.isOffline=!0,nt=0,ca("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function Ls(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now()})}catch{}}typeof window<"u"&&(window.notifyStateMutation=Ls,window.disconnectSupabaseRealtime=ii,window.recordRecentLocalMutation=js,window.recalculateProjectProgressInMemory=tt);document.documentElement.dataset.theme=s.theme;document.documentElement.lang=s.lang;document.documentElement.dir=s.lang==="ar"?"rtl":"ltr";s.lang==="en"?document.body.classList.add("is-ltr"):document.body.classList.remove("is-ltr");Object.assign(window,hi);Object.assign(window,Ci);Object.assign(window,Oi);Object.assign(window,Wi);Object.assign(window,Ui);Object.assign(window,Ki);Object.assign(window,Qi);Object.assign(window,is);Object.assign(window,cs);Object.assign(window,Pi);Object.assign(window,gs);Object.assign(window,xi);fs();document.addEventListener("click",e=>{const n=e.target.closest("[data-action], [data-view], button, a");if(n){const a=n.dataset.action||n.dataset.view||n.innerText?.trim()?.slice(0,40)||n.tagName;mt("ui.click",`النقر على: ${a}`)}handleClick(e).catch(a=>{Rt(a,{source:"handleClick"}),showToast(a.message,!0)})});document.addEventListener("submit",e=>{const n=e.target.id||e.target.dataset.action||"form";mt("form.submit",`إرسال نموذج: ${n}`),handleSubmit(e).catch(a=>{Rt(a,{source:"handleSubmit"}),showToast(a.message,!0)})});document.addEventListener("input",handleInput);document.addEventListener("change",handleChange);document.addEventListener("keydown",e=>{e.key==="Escape"&&closeModal()});var Kt=null;window.addEventListener("resize",()=>{s.view==="project-detail"&&s.projectTab==="timeline"&&(Kt||(Kt=requestAnimationFrame(()=>{Kt=null,drawTimelineArrows()})))});window.addEventListener("error",e=>{const n=String(e?.message||e?.error?.message||"");n.includes("Turnstile")||n.includes("turnstile")||n.includes("Script error")||(console.error("Runtime Error:",e.error),Rt(e.error||{message:n},{source:"window.onerror"}),typeof showToast=="function"&&showToast(`خطأ برمجي: ${e.message}`,!0))});window.addEventListener("unhandledrejection",e=>{const n=String(e?.reason?.message||e?.reason||"");n.includes("Turnstile")||n.includes("turnstile")||n.includes("Script error")||(console.error("Unhandled Rejection:",e.reason),Rt(e.reason||{message:n},{source:"unhandledrejection",errorType:"UnhandledRejection"}))});"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(e=>{console.warn("[PWA] ServiceWorker registration skipped:",e.message)})});Cs();_i();init();
